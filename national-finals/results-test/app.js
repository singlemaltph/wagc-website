(function () {
  "use strict";

  var DIVISIONS = ["A", "B", "C", "D", "E"];
  var players = window.NF_PLAYERS || [];
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
     Ties share the same rank (competition ranking: 1,1,3). */
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

    var sorted = players.slice().sort(function (a, b) {
      if (a.division !== b.division) return a.division.localeCompare(b.division);
      return a.name.localeCompare(b.name);
    });

    wrap.innerHTML =
      '<div class="toolbar">' +
        '<div class="filter-pills" id="roster-filter" data-target="division"></div>' +
        '<div class="search-box">' +
          '<i class="fas fa-search"></i>' +
          '<input type="search" id="roster-search" placeholder="Search player name..." aria-label="Search player name" />' +
        "</div>" +
      "</div>" +
      '<div id="roster-results"></div>';

    buildFilterPills("roster-filter", "all");

    var searchInput = document.getElementById("roster-search");
    var state = { division: "all", query: "" };

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

      var divisionsToShow = state.division === "all" ? DIVISIONS : [state.division];
      var html = "";

      divisionsToShow.forEach(function (div) {
        var group = grouped[div] || [];
        if (!group.length) return;

        html += '<div class="division-block">';
        html += '<div class="division-heading"><span class="div-badge">' + div + "</span> Division " + div + '<span class="division-count">' + group.length + " player" + (group.length === 1 ? "" : "s") + "</span></div>";

        html += '<table class="nf-table nf-table-desktop"><thead><tr>' +
          "<th>Player</th><th>Handicap Index</th><th>Day 1 Course HCP</th>" +
          "</tr></thead><tbody>";
        group.forEach(function (p) {
          html += "<tr><td class=\"player-name\">" + esc(p.name) + "</td><td>" + p.index.toFixed(1) + "</td><td>" + p.day1Hcp + "</td></tr>";
        });
        html += "</tbody></table>";

        html += '<div class="nf-cards nf-cards-mobile">';
        group.forEach(function (p) {
          html += '<div class="nf-card">' +
            '<div class="nf-card-top"><span class="player-name">' + esc(p.name) + "</span></div>" +
            '<div class="nf-card-stats">' +
              '<div class="stat"><span class="stat-label">Index</span><span class="stat-value">' + p.index.toFixed(1) + "</span></div>" +
              '<div class="stat"><span class="stat-label">Day 1 HCP</span><span class="stat-value">' + p.day1Hcp + "</span></div>" +
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
    if (!config.day1Published) {
      wrap.innerHTML = lockedMessage("DAY 1 RESULTS", "Day 1 results have not been published yet.");
      return;
    }

    var ranked = rankByDivision(players, "day1Net");

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
        if (!group.length) return;

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

  function buildDay2() {
    var wrap = document.getElementById("day2-panel");

    if (!config.day2Published) {
      wrap.innerHTML =
        '<div class="locked-panel">' +
          '<i class="fas fa-trophy locked-icon"></i>' +
          "<h3>FINAL RESULTS</h3>" +
          "<p>Results will be published following the<br>2026 WAGC Philippines National Finals<br>Awards Ceremony.</p>" +
          '<p class="locked-highlight">The winners will be revealed during awarding.</p>' +
        "</div>";
      return;
    }

    var ranked = rankByDivision(players, "finalNet");

    wrap.innerHTML =
      '<div class="toolbar">' +
        '<div class="filter-pills" id="day2-filter" data-target="division"></div>' +
      "</div>" +
      '<div id="day2-results"></div>';

    buildFilterPills("day2-filter", "all");
    var state = { division: "all" };

    function renderDay2() {
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
      document.getElementById("day2-results").innerHTML = html;
    }

    document.getElementById("day2-filter").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-value]");
      if (!btn) return;
      state.division = btn.getAttribute("data-value");
      setActivePill("day2-filter", state.division);
      renderDay2();
    });

    renderDay2();
  }

  /* ---------------- SHARED UI HELPERS ---------------- */

  function lockedMessage(title, message) {
    return '<div class="locked-panel">' +
      '<i class="fas fa-lock locked-icon"></i>' +
      "<h3>" + esc(title) + "</h3>" +
      "<p>" + esc(message) + "</p>" +
    "</div>";
  }

  function buildFilterPills(containerId, active) {
    var container = document.getElementById(containerId);
    var options = ["all"].concat(DIVISIONS);
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

  /* ---------------- TABS ---------------- */

  function initTabs() {
    var tabs = document.querySelectorAll(".nf-tab");
    var panels = document.querySelectorAll(".nf-panel");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");
        tabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
        panels.forEach(function (p) { p.classList.toggle("active", p.id === target + "-panel-outer"); });
        window.scrollTo({ top: document.getElementById("nf-tabs").offsetTop - 78, behavior: "smooth" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTabs();
    buildRoster();
    buildDay1();
    buildDay2();
  });
})();
