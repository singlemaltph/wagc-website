(function () {
  "use strict";

  var config = window.NF_CONFIG || {};

  /* NAVIGATION DERIVATION
     The public nav is meant to derive from the publication flags in
     config.js, not be hand-toggled. Today every flag is false, so the
     page ships INFO ONLY (Event Schedule + Tournament Conditions link) —
     this page's HTML currently contains no Roster/Flights/Results tab or
     panel at all, by design: we do not add placeholder/hidden markup for
     unpublished sections, and we do not load their data files early.

     When a section is ready to publish: add its tab button + panel
     markup (mirroring national-finals/results-test/) and its sanitized
     public data script(s) to index.html, in the SAME change that flips
     the matching flag below to true. See config.js for the full rollout
     sequence and the security rule about not committing unreleased real
     data ahead of that flag. */
  var sectionsPublished = {
    roster: !!config.rosterPublished,
    flights: !!config.day1FlightsPublished || !!config.day2FlightsPublished,
    results: !!config.day1ResultsPublished || !!config.finalResultsPublished
  };

  var pendingWithoutMarkup = Object.keys(sectionsPublished).filter(function (key) {
    return sectionsPublished[key];
  });

  if (pendingWithoutMarkup.length && typeof console !== "undefined") {
    console.warn(
      "National Finals config publishes [" + pendingWithoutMarkup.join(", ") + "] " +
      "but this page has no matching tab/panel markup yet. Add it before relying on these flags."
    );
  }
})();
