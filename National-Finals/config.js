/* ==========================================================================
   NATIONAL FINALS — PUBLIC PAGE PUBLICATION CONFIG
   --------------------------------------------------------------------------
   This is the PUBLIC production page at /National-Finals/. Unlike the
   internal test copy at national-finals/results-test/, everything
   committed here is live and world-readable — there is no test/staging
   boundary beyond this file's own flags.

   SOURCE OF TRUTH: the private "2026 WAGC NF Scoring" Google Sheet remains
   the authoritative dataset for roster, flights, and scoring. This public
   page only ever holds what has already been cleared for public release —
   see the CRITICAL note below before ever flipping a flag.

   Five independent flags — roster, Day 1 flights, Day 2 flights, Day 1
   results, and Final results are each released at a different point in
   the tournament. Do not collapse these into one flag.

   CRITICAL — these flags control UI VISIBILITY ONLY. They are NOT a
   security boundary. This repository is public: anything committed here
   can be read directly from GitHub regardless of these flags. Therefore:
     - Do NOT commit a real roster/flights/results data file to this
       directory until the matching section is actually ready to publish.
     - Never flip a flag to true without adding that section's real,
       already-cleared-for-release data/markup in the SAME change.
     - Real Day 2 pairings must not appear here before Day 1 is complete
       and verified; real Final results must not appear here before the
       Awards Ceremony — even if the flag is still false, because "flag is
       false" does not make committed data private.

   CURRENT STATE — pre-tournament release:
     rosterPublished: false, day1FlightsPublished: false,
     day2FlightsPublished: false, day1ResultsPublished: false,
     finalResultsPublished: false
   Public navigation today is INFO ONLY: Event Schedule + a link to the
   official Tournament Conditions. No Roster / Flights / Results tab
   exists in this page's markup — see app.js for how future tabs derive
   from these flags.

   ROLLOUT SEQUENCE (update this page's markup + this file together,
   one step at a time, only once WAGC approves each step):

     STEP 1 — rosterPublished: true
       Add a Roster tab + panel (mirroring national-finals/results-test/)
       and a sanitized public roster data file (name/division/tournament
       index/day1 course HCP only — never IDs, contact info, or notes).
       Public nav becomes: INFO | ROSTER

     STEP 2 — day1FlightsPublished: true
       Add a Flights tab + panel with the real, approved Day 1 pairings.
       Public nav becomes: INFO | ROSTER | FLIGHTS

     STEP 3 — day1ResultsPublished: true
       Add a Results tab + panel; Day 1 leaderboard publishes
       progressively as scores are received and verified (incomplete
       players show "Pending", never ranked).
       Public nav becomes: INFO | ROSTER | FLIGHTS | RESULTS

     AFTER DAY 1 IS FINALIZED — day2FlightsPublished: true
       Add the real Day 2 pairings (championship flight = each division's
       Day 1 positions 1-4, teeing off last) to Flights.

     AFTER THE AWARDS CEREMONY — finalResultsPublished: true
       Add the real final results to Results > Day 2 / Final.

   Do NOT set any flag to true ahead of adding that section's real content
   in the same change.
   ========================================================================== */
window.NF_CONFIG = {
  rosterPublished: false,
  day1FlightsPublished: false,
  day2FlightsPublished: false,
  day1ResultsPublished: false,
  finalResultsPublished: false
};
