(function () {
  "use strict";

  var config = window.NF_CONFIG || {};
  var DIVISIONS = ["A", "B", "C", "D", "E"];
  var ROSTER_DIVISIONS = DIVISIONS.concat(["PENDING"]);
  var roster = window.NF_PLAYERS || []; // real published roster (name/division/tournamentIndex/palmerCourseHcp/marshCourseHcp/day1CourseHcp)

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function lockedPanel(title, lines) {
    return '<div class="locked-panel">' +
      '<i class="fas fa-lock locked-icon"></i>' +
      "<h3>" + esc(title) + "</h3>" +
      lines.map(function (l) { return "<p>" + esc(l) + "</p>"; }).join("") +
    "</div>";
  }

  function buildFilterPills(containerId, active, divisions) {
    var container = document.getElementById(containerId);
    var options = ["all"].concat(divisions || DIVISIONS);
    container.innerHTML = options.map(function (opt) {
      var label = opt === "all" ? "All" : opt;
      return '<button type="button" class="pill' + (opt === active ? " active" : "") + '" data-value="' + opt + '">' + label + "</button>";
    }).join("");
  }

  function setActivePill(containerId, value) {
    var container = document.getElementById(containerId);
    container.querySelectorAll(".pill").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-value") === value);
    });
  }

  /* ---------------- ROSTER ----------------
     rosterPublished: true — roster rendering ported from the reference
     implementation at national-finals/results-test/app.js buildRoster().
     Real, sanitized roster data lives in data.js as window.NF_PLAYERS
     (name/division/tournamentIndex/palmerCourseHcp/marshCourseHcp/
     day1CourseHcp only — see that file's header for the sanitization
     rules). Palmer/Marsh/Day1 Course HCP are taken as-is from the
     Players tab, never recalculated; null renders as "—" and a real 0
     or negative HCP renders as-is. */
  function buildRoster() {
    var wrap = document.getElementById("roster-panel");
    if (!wrap) return;
    if (!config.rosterPublished) {
      wrap.innerHTML = lockedPanel("PLAYER ROSTER", [
        "The official 2026 WAGC Philippines National Finals player roster will be published here once finalized.",
        "Please check back for updates."
      ]);
      return;
    }

    var totalCount = roster.length;
    var pendingCount = roster.filter(function (p) { return p.division === "PENDING"; }).length;

    /* Division order A→E→PENDING falls out of plain string comparison
       here since "PENDING" sorts after "E" alphabetically. */
    var sorted = roster.slice().sort(function (a, b) {
      if (a.division !== b.division) return a.division.localeCompare(b.division);
      return a.name.localeCompare(b.name);
    });

    wrap.innerHTML =
      '<div class="roster-clarify">' +
        '<div class="roster-clarify-title">Current National Finals Player Roster</div>' +
        "<p>Roster information reflects the current National Finals player list (" + totalCount + " players, " + (totalCount - pendingCount) + " assigned to a division, " + pendingCount + " pending division assignment).</p>" +
      "</div>" +
      '<div class="toolbar">' +
        '<div class="filter-pills" id="roster-filter" data-target="division"></div>' +
        '<div class="search-box">' +
          '<i class="fas fa-search"></i>' +
          '<input type="search" id="roster-search" placeholder="Search player name..." aria-label="Search player name" />' +
        "</div>" +
      "</div>" +
      '<div id="roster-results"></div>';

    buildFilterPills("roster-filter", "all", ROSTER_DIVISIONS);

    var searchInput = document.getElementById("roster-search");
    var state = { division: "all", query: "" };

    function fmtIndex(n) {
      return n === null || n === undefined ? "—" : n.toFixed(1);
    }
    function fmtHcp(n) {
      return n === null || n === undefined ? "—" : String(n);
    }

    function renderRoster() {
      var filtered = sorted.filter(function (p) {
        var matchesDivision = state.division === "all" || p.division === state.division;
        var matchesQuery = p.name.toLowerCase().indexOf(state.query) !== -1;
        return matchesDivision && matchesQuery;
      });

      var grouped = {};
      filtered.forEach(function (p) {
        grouped[p.division] = grouped[p.division] || [];
        grouped[p.division].push(p);
      });

      var divisionsToShow = state.division === "all" ? ROSTER_DIVISIONS : [state.division];
      var html = "";

      divisionsToShow.forEach(function (div) {
        var group = grouped[div] || [];
        if (!group.length) return;

        var isPending = div === "PENDING";
        var badge = isPending ? '<span class="pending-badge">Pending</span>' : '<span class="div-badge">' + div + "</span>";
        var heading = isPending ? "Division Pending" : "Division " + div;

        html += '<div class="division-block">';
        html += '<div class="division-heading">' + badge + " " + heading + '<span class="division-count">' + group.length + " player" + (group.length === 1 ? "" : "s") + "</span></div>";

        html += '<table class="nf-table nf-table-desktop nf-table-roster"><thead><tr>' +
          "<th>Player</th><th>Tournament Index</th><th>Palmer HCP</th><th>Marsh HCP</th><th>Day 1 HCP</th>" +
          "</tr></thead><tbody>";
        group.forEach(function (p) {
          html += "<tr><td class=\"player-name\">" + esc(p.name) + "</td><td>" + fmtIndex(p.tournamentIndex) + "</td><td>" + fmtHcp(p.palmerCourseHcp) + "</td><td>" + fmtHcp(p.marshCourseHcp) + "</td><td>" + fmtHcp(p.day1CourseHcp) + "</td></tr>";
        });
        html += "</tbody></table>";

        html += '<div class="nf-cards nf-cards-mobile">';
        group.forEach(function (p) {
          html += '<div class="nf-card">' +
            '<div class="nf-card-top"><span class="player-name">' + esc(p.name) + "</span></div>" +
            '<div class="nf-card-stats nf-card-stats-roster">' +
              '<div class="stat"><span class="stat-label">Tournament Index</span><span class="stat-value">' + fmtIndex(p.tournamentIndex) + "</span></div>" +
              '<div class="stat"><span class="stat-label">Palmer HCP</span><span class="stat-value">' + fmtHcp(p.palmerCourseHcp) + "</span></div>" +
              '<div class="stat"><span class="stat-label">Marsh HCP</span><span class="stat-value">' + fmtHcp(p.marshCourseHcp) + "</span></div>" +
              '<div class="stat"><span class="stat-label">Day 1 HCP</span><span class="stat-value">' + fmtHcp(p.day1CourseHcp) + "</span></div>" +
            "</div>" +
          "</div>";
        });
        html += "</div></div>";
      });

      if (!html) html = '<p class="empty-state">No players match your search.</p>';
      document.getElementById("roster-results").innerHTML = html;
    }

    document.getElementById("roster-filter").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-value]");
      if (!btn) return;
      state.division = btn.getAttribute("data-value");
      setActivePill("roster-filter", state.division);
      renderRoster();
    });
    searchInput.addEventListener("input", function () {
      state.query = searchInput.value.trim().toLowerCase();
      renderRoster();
    });

    renderRoster();
  }

  /* ---------------- FLIGHTS ---------------- */
  /* day1FlightsPublished / day2FlightsPublished: both false — no flight
     data file is loaded on this page. When Day 1 flights are ready, add
     the real pairing data + Day 1/Day 2 selector UI (mirroring
     national-finals/results-test/flights.js and app.js) in the same
     change that flips day1FlightsPublished. Day 2 flights must stay
     unpublished (and physically absent from this repo) until Day 1 is
     complete and verified — see the championship-flight-last rule in the
     test implementation. */
  function buildFlights() {
    var wrap = document.getElementById("flights-panel");
    if (!wrap) return;
    if (!config.day1FlightsPublished && !config.day2FlightsPublished) {
      wrap.innerHTML = lockedPanel("FLIGHT SCHEDULE", [
        "Official National Finals flight assignments and tee times will be published here once finalized.",
        "Please check back for updates."
      ]);
      return;
    }
    // Real flights rendering goes here once a flights flag is true.
  }

  /* ---------------- RESULTS ---------------- */
  /* day1ResultsPublished / finalResultsPublished: both false — no scoring
     data file is loaded on this page. Each flag gates its own panel
     independently; add the real, cleared-for-release data + render logic
     (mirroring national-finals/results-test/) in the same change that
     flips the matching flag. Real Final Results must stay absent from
     this repo until after the Awards Ceremony. */
  function buildResultsDay1() {
    var wrap = document.getElementById("day1-panel");
    if (!wrap) return;
    if (!config.day1ResultsPublished) {
      wrap.innerHTML = lockedPanel("DAY 1 RESULTS", [
        "Day 1 results will be published as scores are received and verified.",
        "Please check back during the tournament."
      ]);
      return;
    }
    // Real Day 1 leaderboard rendering goes here once day1ResultsPublished = true.
  }

  function buildResultsFinal() {
    var wrap = document.getElementById("final-panel");
    if (!wrap) return;
    if (!config.finalResultsPublished) {
      wrap.innerHTML = lockedPanel("FINAL RESULTS", [
        "Final results will be announced after the Awards Ceremony.",
        "Official results will be published here following the awarding."
      ]);
      return;
    }
    // Real final leaderboard rendering goes here once finalResultsPublished = true.
  }

  /* ---------------- INFO SECONDARY SELECTOR ----------------
     Schedule of Events is selected by default whenever the page loads or
     the primary INFO tab is (re)selected — see initTabs(). */

  function initInfoSubnav() {
    var container = document.getElementById("info-subnav");
    if (!container) return;
    var buttons = container.querySelectorAll("[data-info]");
    var panels = {
      schedule: document.getElementById("info-schedule-outer"),
      conditions: document.getElementById("info-conditions-outer")
    };

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-info");
        buttons.forEach(function (b) { b.classList.toggle("active", b === btn); });
        Object.keys(panels).forEach(function (key) {
          panels[key].classList.toggle("active", key === target);
        });
      });
    });
  }

  function resetInfoSubnavToSchedule() {
    var container = document.getElementById("info-subnav");
    if (!container) return;
    container.querySelectorAll("[data-info]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-info") === "schedule");
    });
    var scheduleOuter = document.getElementById("info-schedule-outer");
    var conditionsOuter = document.getElementById("info-conditions-outer");
    if (scheduleOuter) scheduleOuter.classList.add("active");
    if (conditionsOuter) conditionsOuter.classList.remove("active");
  }

  /* ---------------- RESULTS SECONDARY SELECTOR ---------------- */

  function initResultsSelect() {
    var container = document.getElementById("results-select");
    if (!container) return;
    var buttons = container.querySelectorAll("[data-result]");
    var panels = {
      day1: document.getElementById("results-day1-outer"),
      final: document.getElementById("results-final-outer")
    };

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-result");
        buttons.forEach(function (b) { b.classList.toggle("active", b === btn); });
        Object.keys(panels).forEach(function (key) {
          panels[key].classList.toggle("active", key === target);
        });
      });
    });
  }

  /* ---------------- PRIMARY TABS ----------------
     INFO / ROSTER / FLIGHTS / RESULTS are always visible — publication
     flags control the content inside each panel, never the tab itself. */

  function initTabs() {
    var tabs = document.querySelectorAll(".nf-tab");
    var panels = document.querySelectorAll(".nf-panel");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");
        tabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
        panels.forEach(function (p) { p.classList.toggle("active", p.id === target + "-panel-outer"); });
        if (target === "info") resetInfoSubnavToSchedule();
        window.scrollTo({ top: document.getElementById("nf-tabs").offsetTop - 68, behavior: "smooth" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTabs();
    initInfoSubnav();
    initResultsSelect();
    buildRoster();
    buildFlights();
    buildResultsDay1();
    buildResultsFinal();
  });
})();
