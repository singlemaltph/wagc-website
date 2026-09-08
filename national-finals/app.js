(function () {
  "use strict";

  var config = window.NF_CONFIG || {};
  var DIVISIONS = ["A", "B", "C", "D", "E"];
  var ROSTER_DIVISIONS = DIVISIONS.concat(["PENDING"]);
  var roster = window.NF_PLAYERS || []; // real published roster (name/division/tournamentIndex/palmerCourseHcp/marshCourseHcp)

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

  /* Shared "Player Handicap Information" card — placed after the roster
     summary and before the division filters/search, on both production
     (including beneath the unpublished-roster notice, per explicit
     instruction — the copy itself is already approved for public
     display) and national-finals/results-test/. Approved copy; do not
     paraphrase. Paula's number is approved for public display as a
     clickable sms: link. */
  function handicapInfoHtml() {
    return '<div class="handicap-info">' +
      '<div class="handicap-info-title">Player Handicap Information</div>' +
      '<div class="handicap-info-section">' +
        "<h4>How Your Tournament Index Is Determined</h4>" +
        "<p>For the 2026 WAGC Philippines National Finals, your Tournament Index is based on your Low Handicap Index recorded in your WHS handicap record and verified by the Tournament Committee.</p>" +
        "<p>Under the World Handicap System (WHS), the Low Handicap Index is the lowest Handicap Index calculated for a player during the 365-day period preceding the most recent score in the player's scoring record.</p>" +
        "<p>This means your Tournament Index for the National Finals may be lower than your current Handicap Index. The Low Handicap Index is used as a reference to help ensure that a player's demonstrated playing ability over the previous year is properly reflected in the competition.</p>" +
      "</div>" +
      '<div class="handicap-info-section">' +
        "<h4>Handicap Verification In Progress</h4>" +
        "<p>The player roster, Tournament Index, division assignment, and Course Handicap information are still subject to change while the Tournament Committee completes final handicap verification.</p>" +
        "<p>If any updates are identified during the verification process, they will be reflected in the official player roster and tournament records.</p>" +
      "</div>" +
      '<div class="handicap-info-section">' +
        "<h4>Questions or Concerns?</h4>" +
        '<p>If you have any questions or concerns regarding your handicap, please message Paula at <a href="sms:+639176734653">0917 673 4653</a>.</p>' +
        "<p>Your concern will be brought to the Tournament Committee for review.</p>" +
      "</div>" +
    "</div>";
  }

  /* ---------------- ROSTER ----------------
     rosterPublished: false — the roster was briefly published and has
     been pulled back until WAGC explicitly re-authorizes release (see
     config.js's STEP 1 for the required re-publication process). No
     roster data file is loaded on this page while the flag is false —
     `roster` above resolves to [] since window.NF_PLAYERS is undefined
     (data.js and its <script> tag were removed from index.html), so
     nothing below can accidentally expose player data even if this
     function were called incorrectly.

     Once re-published, roster rendering mirrors the reference
     implementation at national-finals/results-test/app.js buildRoster().
     Public-safe roster fields: name/division/tournamentIndex/
     palmerCourseHcp/marshCourseHcp only. Palmer/Marsh Course HCP are
     taken as-is from the Players tab, never recalculated; null renders
     as "—" and a real 0 or negative HCP renders as-is. day1CourseHcp is
     intentionally NOT part of the roster — a player's actual Course HCP
     for a given round is published with that day's flight pairing
     instead (see buildFlights() below). */
  function buildRoster() {
    var wrap = document.getElementById("roster-panel");
    if (!wrap) return;
    if (!config.rosterPublished) {
      wrap.innerHTML = lockedPanel("PLAYER ROSTER", [
        "The official 2026 WAGC Philippines National Finals player roster is currently being finalized as the Tournament Committee completes handicap verification.",
        "Please check back for the official player roster."
      ]) + handicapInfoHtml();
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
      handicapInfoHtml() +
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
          "<th>Player</th><th>Tournament Index</th><th>Palmer HCP</th><th>Marsh HCP</th>" +
          "</tr></thead><tbody>";
        group.forEach(function (p) {
          html += "<tr><td class=\"player-name\">" + esc(p.name) + "</td><td>" + fmtIndex(p.tournamentIndex) + "</td><td>" + fmtHcp(p.palmerCourseHcp) + "</td><td>" + fmtHcp(p.marshCourseHcp) + "</td></tr>";
        });
        html += "</tbody></table>";

        html += '<div class="nf-cards nf-cards-mobile">';
        group.forEach(function (p) {
          html += '<div class="nf-card">' +
            '<div class="nf-card-top"><span class="player-name">' + esc(p.name) + "</span></div>" +
            '<div class="nf-card-stats">' +
              '<div class="stat"><span class="stat-label">Tournament Index</span><span class="stat-value">' + fmtIndex(p.tournamentIndex) + "</span></div>" +
              '<div class="stat"><span class="stat-label">Palmer HCP</span><span class="stat-value">' + fmtHcp(p.palmerCourseHcp) + "</span></div>" +
              '<div class="stat"><span class="stat-label">Marsh HCP</span><span class="stat-value">' + fmtHcp(p.marshCourseHcp) + "</span></div>" +
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

  /* ---------------- FLIGHTS ----------------
     day1FlightsPublished / day2FlightsPublished: both false — no flight
     data file exists on production yet, so this renderer is prepared but
     unused (window.NF_FLIGHTS/window.NF_COURSE_ROTATION are undefined
     and default to empty below). When Day 1 flights are ready, add the
     real pairing data file (mirroring the shape of
     national-finals/results-test/flights.js) in the SAME change that
     flips day1FlightsPublished — do not commit real pairing data ahead
     of that flag.

     Flight-player schema: { name, division, courseHcp }. courseHcp is
     the player's official Course HCP for THAT ROUND — taken as-is, never
     recalculated:
       Day 1 source: Players tab, "Day 1 Course HCP" (column K).
       Day 2 source: "Handicap Adjustment" tab, "R2 Course Handicap" —
         the player's official adjusted Course HCP for Round 2. Never use
         the original Palmer/Marsh HCP, "Day 2 Base Course HCP" alone, or
         a locally recomputed adjustment.
     null renders as "—"; a real 0 or negative Course HCP renders as-is.
     Column label is always "COURSE HCP" (not "Playing HCP"/"CH"/etc). Do
     NOT publish Day 2 flights before Day 1 is finalized and the R2
     Course Handicap is confirmed — see the championship-flight-last rule
     in national-finals/results-test/flights.js. */
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

    var flightsByDay = window.NF_FLIGHTS || { day1: [], day2: [] };
    var courseRotation = window.NF_COURSE_ROTATION || { day1: [], day2: [] };

    wrap.innerHTML =
      '<div class="day-select" id="flights-day-select">' +
        '<button type="button" class="pill active" data-day="day1">Day 1</button>' +
        '<button type="button" class="pill" data-day="day2">Day 2</button>' +
      "</div>" +
      '<div class="course-rotation-note" id="course-rotation-note"></div>' +
      '<div class="toolbar" id="flights-toolbar">' +
        '<div class="search-box">' +
          '<i class="fas fa-search"></i>' +
          '<input type="search" id="flight-search" placeholder="Find your flight — search your name..." aria-label="Search for a player to find their flight" />' +
        "</div>" +
      "</div>" +
      '<div id="flights-results"></div>';

    var searchInput = document.getElementById("flight-search");
    var toolbar = document.getElementById("flights-toolbar");
    var state = { day: "day1", query: "" };

    function renderRotationNote() {
      var rows = courseRotation[state.day] || [];
      var label = state.day === "day1" ? "Day 1" : "Day 2";
      var html = '<div class="course-rotation-title">' + label + " Course Rotation</div>";
      rows.forEach(function (r) {
        html += '<div class="course-rotation-row"><span>' + esc(r.divisions) + "</span><span>" + esc(r.course) + "</span></div>";
      });
      document.getElementById("course-rotation-note").innerHTML = html;
    }

    function fmtFlightHcp(n) {
      return n === null || n === undefined ? "—" : String(n);
    }

    function renderFlights() {
      if (state.day === "day1" && !config.day1FlightsPublished) {
        toolbar.hidden = true;
        document.getElementById("flights-results").innerHTML = lockedPanel("DAY 1 FLIGHT SCHEDULE", [
          "Day 1 flight pairings and tee times have not been published yet."
        ]);
        return;
      }
      if (state.day === "day2" && !config.day2FlightsPublished) {
        toolbar.hidden = true;
        document.getElementById("flights-results").innerHTML = lockedPanel("DAY 2 FLIGHT SCHEDULE", [
          "Day 2 flight pairings and tee times will be announced after the completion of Day 1.",
          "Please check back after Day 1 results have been finalized."
        ]);
        return;
      }
      toolbar.hidden = false;

      var q = state.query.trim().toLowerCase();
      var all = flightsByDay[state.day] || [];
      var list = all;

      if (q) {
        list = all.filter(function (f) {
          return f.players.some(function (pl) { return pl.name.toLowerCase().indexOf(q) !== -1; });
        });
      }

      if (!list.length) {
        document.getElementById("flights-results").innerHTML = '<p class="empty-state">No flight found for that player.</p>';
        return;
      }

      var html = '<div class="flight-grid">';
      list.forEach(function (f) {
        var flightNumber = all.indexOf(f) + 1;
        var hasMatch = q && f.players.some(function (pl) { return pl.name.toLowerCase().indexOf(q) !== -1; });
        html += '<div class="flight-card' + (hasMatch ? " flight-match" : "") + '">' +
          '<div class="flight-card-head">' +
            '<span class="flight-num">Flight ' + flightNumber + "</span>" +
            '<span class="flight-meta">' + esc(f.teeTime) + " · Hole " + f.startingHole + "</span>" +
          "</div>" +
          '<div class="flight-course">' + esc(f.course) + "</div>" +
          '<div class="flight-players">';
        f.players.forEach(function (pl) {
          var isMatch = q && pl.name.toLowerCase().indexOf(q) !== -1;
          html += '<div class="flight-player-row' + (isMatch ? " player-match" : "") + '">' +
            '<span class="fp-name">' + esc(pl.name) + "</span>" +
            '<span class="div-chip">' + esc(pl.division) + "</span>" +
            '<span class="fp-hcp">' + fmtFlightHcp(pl.courseHcp) + "</span>" +
          "</div>";
        });
        html += "</div></div>";
      });
      html += "</div>";

      document.getElementById("flights-results").innerHTML = html;
    }

    document.getElementById("flights-day-select").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-day]");
      if (!btn) return;
      state.day = btn.getAttribute("data-day");
      state.query = "";
      searchInput.value = "";
      document.querySelectorAll("#flights-day-select .pill").forEach(function (p) {
        p.classList.toggle("active", p === btn);
      });
      renderRotationNote();
      renderFlights();
    });

    searchInput.addEventListener("input", function () {
      state.query = searchInput.value;
      renderFlights();
    });

    renderRotationNote();
    renderFlights();
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
