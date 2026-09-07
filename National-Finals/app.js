(function () {
  "use strict";

  var config = window.NF_CONFIG || {};

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

  /* ---------------- ROSTER ---------------- */
  /* rosterPublished: false — no roster data file is loaded on this page at
     all. When the roster is ready to publish, add a sanitized public
     roster data script (name/division/tournament index/day1 course HCP
     only — mirroring national-finals/results-test/data.js) alongside the
     real render logic here, in the SAME change that flips the flag. */
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
    // Real roster rendering goes here once rosterPublished = true.
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
        window.scrollTo({ top: document.getElementById("nf-tabs").offsetTop - 68, behavior: "smooth" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTabs();
    initResultsSelect();
    buildRoster();
    buildFlights();
    buildResultsDay1();
    buildResultsFinal();
  });
})();
