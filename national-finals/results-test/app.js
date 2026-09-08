(function () {
  "use strict";

  var DIVISIONS = ["A", "B", "C", "D", "E"];
  var ROSTER_DIVISIONS = DIVISIONS.concat(["PENDING"]);
  var roster = window.NF_PLAYERS || [];       // real current roster (name/division/tournamentIndex/day1CourseHcp)
  var testScores = window.NF_TEST_SCORES || []; // fictitious players, Day 1/Final leaderboards only
  var flightsByDay = window.NF_FLIGHTS || { day1: [], day2: [] };
  var courseRotation = window.NF_COURSE_ROTATION || { day1: [], day2: [] };
  var config = window.NF_CONFIG || {};

  function formatSigned(n) {
    if (n > 0) return "+" + n;
    return String(n);
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Rank players within their division by ascending value of `key`.
     Ties share the same rank (competition ranking: 1,1,3).

     TEST-ONLY PLACEHOLDER: the alphabetical-name fallback below is NOT the
     official National Finals tie-break. The official sequence (from the
     Tournament Conditions, documented in PUBLISHING_WORKFLOW.md) is:
       1) gross score, holes 10-18   2) gross, holes 13-18
       3) gross, holes 16-18         4) hole-by-hole count-back from hole 18
       5-7) back-nine handicap-hole ranking (holes 10-18), #1 then #2 then
            onward, until resolved — using the Day 2 (final round) scorecard
            for this 36-hole event.
     That requires hole-by-hole scores this test dataset does not carry.
     In production, prefer receiving an already-tie-break-resolved
     `position` from the private scoring workbook rather than recomputing
     official ties here — see data.js's TIE-BREAK NOTE. */
  function rankByDivision(list, key) {
    var byDivision = {};
    list.forEach(function (p) {
      byDivision[p.division] = byDivision[p.division] || [];
      byDivision[p.division].push(p);
    });

    var ranked = [];
    Object.keys(byDivision).forEach(function (div) {
      var group = byDivision[div].slice().sort(function (a, b) {
        if (a[key] !== b[key]) return a[key] - b[key];
        return a.name.localeCompare(b.name);
      });
      var lastValue = null;
      var lastRank = 0;
      group.forEach(function (p, i) {
        if (p[key] !== lastValue) {
          lastRank = i + 1;
          lastValue = p[key];
        }
        ranked.push(Object.assign({}, p, { _rank: lastRank }));
      });
    });
    return ranked;
  }

  function isTied(list, div, rank) {
    return list.filter(function (p) { return p.division === div && p._rank === rank; }).length > 1;
  }

  function positionLabel(p, list) {
    var tied = isTied(list, p.division, p._rank);
    return (tied ? "T" : "") + p._rank;
  }

  /* ---------------- ROSTER ---------------- */

  function buildRoster() {
    var wrap = document.getElementById("roster-panel");
    if (!config.rosterPublished) {
      wrap.innerHTML = lockedMessage("PLAYER ROSTER", "The player roster has not been published yet.");
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
        "<p>Roster information reflects the current National Finals player list (" + totalCount + " players, " + (totalCount - pendingCount) + " assigned to a division, " + pendingCount + " pending division assignment). Tournament scoring shown elsewhere on this test page may still use test data.</p>" +
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

        html += '<table class="nf-table nf-table-desktop"><thead><tr>' +
          "<th>Player</th><th>Tournament Index</th><th>Day 1 Course HCP</th>" +
          "</tr></thead><tbody>";
        group.forEach(function (p) {
          html += "<tr><td class=\"player-name\">" + esc(p.name) + "</td><td>" + fmtIndex(p.tournamentIndex) + "</td><td>" + fmtHcp(p.day1CourseHcp) + "</td></tr>";
        });
        html += "</tbody></table>";

        html += '<div class="nf-cards nf-cards-mobile">';
        group.forEach(function (p) {
          html += '<div class="nf-card">' +
            '<div class="nf-card-top"><span class="player-name">' + esc(p.name) + "</span></div>" +
            '<div class="nf-card-stats">' +
              '<div class="stat"><span class="stat-label">Tournament Index</span><span class="stat-value">' + fmtIndex(p.tournamentIndex) + "</span></div>" +
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

  /* ---------------- DAY 1 RESULTS ---------------- */

  function buildDay1() {
    var wrap = document.getElementById("day1-panel");
    if (!config.day1ResultsPublished) {
      wrap.innerHTML = lockedMessage("DAY 1 RESULTS", "Day 1 results will be published as scores are received and verified.");
      return;
    }

    /* Progressive publishing: only players whose Day 1 score has been
       received AND verified (day1Complete !== false) get ranked. Everyone
       else shows as "Pending" with no leaderboard position — the public
       leaderboard is expected to fill in gradually during Day 1. */
    var completed = testScores.filter(function (p) { return p.day1Complete !== false; });
    var pending = testScores.filter(function (p) { return p.day1Complete === false; });
    var ranked = rankByDivision(completed, "day1Net");

    wrap.innerHTML =
      '<div class="toolbar">' +
        '<div class="filter-pills" id="day1-filter" data-target="division"></div>' +
      "</div>" +
      '<div id="day1-results"></div>';

    buildFilterPills("day1-filter", "all");
    var state = { division: "all" };

    function renderDay1() {
      var divisionsToShow = state.division === "all" ? DIVISIONS : [state.division];
      var html = "";

      divisionsToShow.forEach(function (div) {
        var group = ranked.filter(function (p) { return p.division === div; })
          .sort(function (a, b) { return a._rank - b._rank || a.name.localeCompare(b.name); });
        var pendingGroup = pending.filter(function (p) { return p.division === div; })
          .sort(function (a, b) { return a.name.localeCompare(b.name); });
        if (!group.length && !pendingGroup.length) return;

        html += '<div class="division-block">';
        html += '<div class="division-heading"><span class="div-badge">' + div + "</span> Division " + div + "</div>";

        html += '<table class="nf-table nf-table-desktop"><thead><tr>' +
          "<th>Pos</th><th>Player</th><th>Gross</th><th>Day 1 HCP</th><th>Net</th><th>Adj.</th><th>Day 2 HCP</th>" +
          "</tr></thead><tbody>";
        group.forEach(function (p) {
          var leader = p._rank === 1;
          html += "<tr class=\"" + (leader ? "leader-row" : "") + "\">" +
            "<td class=\"pos-cell\">" + positionLabel(p, ranked) + (leader ? ' <i class="fas fa-trophy leader-icon"></i>' : "") + "</td>" +
            "<td class=\"player-name\">" + esc(p.name) + "</td>" +
            "<td>" + p.day1Gross + "</td>" +
            "<td>" + p.day1Hcp + "</td>" +
            "<td class=\"net-cell\">" + p.day1Net + "</td>" +
            "<td class=\"" + adjClass(p.adjustment) + "\">" + formatSigned(p.adjustment) + "</td>" +
            "<td>" + p.day2Hcp + "</td>" +
          "</tr>";
        });
        pendingGroup.forEach(function (p) {
          html += '<tr class="pending-row">' +
            '<td class="pos-cell"><span class="pending-badge">Pending</span></td>' +
            "<td class=\"player-name\">" + esc(p.name) + "</td>" +
            '<td colspan="4">—</td>' +
            "<td>" + p.day2Hcp + "</td>" +
          "</tr>";
        });
        html += "</tbody></table>";

        html += '<div class="nf-cards nf-cards-mobile">';
        group.forEach(function (p) {
          var leader = p._rank === 1;
          html += '<div class="nf-card' + (leader ? " nf-card-leader" : "") + '">' +
            '<div class="nf-card-top">' +
              '<span class="pos-badge">' + positionLabel(p, ranked) + (leader ? ' <i class="fas fa-trophy"></i>' : "") + "</span>" +
              '<span class="player-name">' + esc(p.name) + "</span>" +
            "</div>" +
            '<div class="nf-card-stats">' +
              '<div class="stat"><span class="stat-label">Gross</span><span class="stat-value">' + p.day1Gross + "</span></div>" +
              '<div class="stat"><span class="stat-label">Day 1 HCP</span><span class="stat-value">' + p.day1Hcp + "</span></div>" +
              '<div class="stat stat-highlight"><span class="stat-label">Net</span><span class="stat-value">' + p.day1Net + "</span></div>" +
              '<div class="stat"><span class="stat-label">Adj.</span><span class="stat-value ' + adjClass(p.adjustment) + '">' + formatSigned(p.adjustment) + "</span></div>" +
              '<div class="stat"><span class="stat-label">Day 2 HCP</span><span class="stat-value">' + p.day2Hcp + "</span></div>" +
            "</div>" +
          "</div>";
        });
        pendingGroup.forEach(function (p) {
          html += '<div class="nf-card nf-card-pending">' +
            '<div class="nf-card-top">' +
              '<span class="pending-badge">Pending</span>' +
              '<span class="player-name">' + esc(p.name) + "</span>" +
            "</div>" +
          "</div>";
        });
        html += "</div></div>";
      });

      if (!html) html = '<p class="empty-state">No results for this division.</p>';
      document.getElementById("day1-results").innerHTML = html;
    }

    document.getElementById("day1-filter").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-value]");
      if (!btn) return;
      state.division = btn.getAttribute("data-value");
      setActivePill("day1-filter", state.division);
      renderDay1();
    });

    renderDay1();
  }

  function adjClass(n) {
    if (n > 0) return "adj-pos";
    if (n < 0) return "adj-neg";
    return "adj-zero";
  }

  /* ---------------- DAY 2 / FINAL RESULTS ---------------- */

  function buildFinal() {
    var wrap = document.getElementById("final-panel");

    if (!config.finalResultsPublished) {
      wrap.innerHTML =
        '<div class="locked-panel">' +
          '<i class="fas fa-trophy locked-icon"></i>' +
          "<h3>FINAL RESULTS</h3>" +
          "<p>Final results will be announced after the Awards Ceremony.</p>" +
          '<p class="locked-highlight">Official results will be published following the awarding.</p>' +
        "</div>";
      return;
    }

    var ranked = rankByDivision(testScores, "finalNet");

    wrap.innerHTML =
      (config.isTestData ? '<div class="sample-banner"><i class="fas fa-flask-vial"></i>SIMULATED FINAL RESULTS — TEST DATA</div>' : "") +
      '<div class="toolbar">' +
        '<div class="filter-pills" id="final-filter" data-target="division"></div>' +
      "</div>" +
      '<div id="final-results"></div>';

    buildFilterPills("final-filter", "all");
    var state = { division: "all" };

    function renderFinal() {
      var divisionsToShow = state.division === "all" ? DIVISIONS : [state.division];
      var html = "";

      divisionsToShow.forEach(function (div) {
        var group = ranked.filter(function (p) { return p.division === div; })
          .sort(function (a, b) { return a._rank - b._rank || a.name.localeCompare(b.name); });
        if (!group.length) return;

        html += '<div class="division-block">';
        html += '<div class="division-heading"><span class="div-badge">' + div + "</span> Division " + div + "</div>";

        html += '<table class="nf-table nf-table-desktop"><thead><tr>' +
          "<th>Pos</th><th>Player</th><th>R1 Net</th><th>R2 Gross</th><th>R2 HCP</th><th>R2 Net</th><th>2-Day Total</th>" +
          "</tr></thead><tbody>";
        group.forEach(function (p) {
          var leader = p._rank === 1;
          html += "<tr class=\"" + (leader ? "leader-row" : "") + "\">" +
            "<td class=\"pos-cell\">" + positionLabel(p, ranked) + (leader ? ' <i class="fas fa-trophy leader-icon"></i>' : "") + "</td>" +
            "<td class=\"player-name\">" + esc(p.name) + "</td>" +
            "<td>" + p.day1Net + "</td>" +
            "<td>" + p.day2Gross + "</td>" +
            "<td>" + p.day2Hcp + "</td>" +
            "<td>" + p.day2Net + "</td>" +
            "<td class=\"net-cell\">" + p.finalNet + "</td>" +
          "</tr>";
        });
        html += "</tbody></table>";

        html += '<div class="nf-cards nf-cards-mobile">';
        group.forEach(function (p) {
          var leader = p._rank === 1;
          html += '<div class="nf-card' + (leader ? " nf-card-leader" : "") + '">' +
            '<div class="nf-card-top">' +
              '<span class="pos-badge">' + positionLabel(p, ranked) + (leader ? ' <i class="fas fa-trophy"></i>' : "") + "</span>" +
              '<span class="player-name">' + esc(p.name) + "</span>" +
            "</div>" +
            '<div class="nf-card-stats">' +
              '<div class="stat"><span class="stat-label">R1 Net</span><span class="stat-value">' + p.day1Net + "</span></div>" +
              '<div class="stat"><span class="stat-label">R2 Gross</span><span class="stat-value">' + p.day2Gross + "</span></div>" +
              '<div class="stat"><span class="stat-label">R2 HCP</span><span class="stat-value">' + p.day2Hcp + "</span></div>" +
              '<div class="stat"><span class="stat-label">R2 Net</span><span class="stat-value">' + p.day2Net + "</span></div>" +
              '<div class="stat stat-highlight"><span class="stat-label">2-Day Total</span><span class="stat-value">' + p.finalNet + "</span></div>" +
            "</div>" +
          "</div>";
        });
        html += "</div></div>";
      });

      if (!html) html = '<p class="empty-state">No results for this division.</p>';
      document.getElementById("final-results").innerHTML = html;
    }

    document.getElementById("final-filter").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-value]");
      if (!btn) return;
      state.division = btn.getAttribute("data-value");
      setActivePill("final-filter", state.division);
      renderFinal();
    });

    renderFinal();
  }

  /* ---------------- FLIGHTS ---------------- */

  function buildFlights() {
    var wrap = document.getElementById("flights-panel");

    wrap.innerHTML =
      '<div class="sample-banner"><i class="fas fa-flask-vial"></i>SAMPLE FLIGHT DATA — FOR TESTING ONLY<br><span class="sample-banner-sub">Tee times and pairings shown here are simulated and are not official tournament assignments.</span></div>' +
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

    /* Day 2 flight pairings do not exist yet — they can only be built after
       Day 1 is complete, using Day 1 standings (see the pairing rule
       documented in flights.js). Nothing about actual Day 2 pairings or
       tee times may render here until config.day2FlightsPublished is true. */
    function renderFlights() {
      if (state.day === "day1" && !config.day1FlightsPublished) {
        toolbar.hidden = true;
        document.getElementById("flights-results").innerHTML =
          '<div class="locked-panel">' +
            '<i class="fas fa-lock locked-icon"></i>' +
            "<h3>DAY 1 FLIGHT SCHEDULE</h3>" +
            "<p>Day 1 flight pairings and tee times have not been published yet.</p>" +
          "</div>";
        return;
      }
      if (state.day === "day2" && !config.day2FlightsPublished) {
        toolbar.hidden = true;
        document.getElementById("flights-results").innerHTML =
          '<div class="locked-panel">' +
            '<i class="fas fa-lock locked-icon"></i>' +
            "<h3>DAY 2 FLIGHT SCHEDULE</h3>" +
            "<p>Day 2 flight pairings and tee times will be announced after the completion of Day 1.</p>" +
            '<p class="locked-highlight">Please check back after Day 1 results have been finalized.</p>' +
          "</div>";
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

  /* ---------------- SHARED UI HELPERS ---------------- */

  function lockedMessage(title, message) {
    return '<div class="locked-panel">' +
      '<i class="fas fa-lock locked-icon"></i>' +
      "<h3>" + esc(title) + "</h3>" +
      "<p>" + esc(message) + "</p>" +
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

  /* ---------------- INFO SECONDARY SELECTOR ----------------
     Ported from production (national-finals/app.js). Schedule of Events
     is selected by default whenever the page loads or the primary INFO
     tab is (re)selected — see initTabs(). */

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

  /* ---------------- RESULTS SUB-NAV (Day 1 / Day 2 & Final) ---------------- */

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

  /* ---------------- TABS ---------------- */

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
    buildDay1();
    buildFinal();
  });
})();
