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

   NAVIGATION MODEL: the primary tabs — INFO / ROSTER / FLIGHTS / RESULTS —
   are ALWAYS visible on this page, regardless of these flags. Flags gate
   the CONTENT inside a tab, never the tab's existence. With everything
   above false, Roster/Flights/Results each show a simple "not yet
   published, check back" placeholder (see app.js) and load no data files
   at all — there is nothing unpublished sitting in the DOM or in public
   JS to find.

   ROLLOUT SEQUENCE (update this page's markup + this file together,
   one step at a time, only once WAGC approves each step). The tabs stay
   the same throughout — only each panel's content changes:

     STEP 1 — rosterPublished: true
       Replace the Roster placeholder with real roster rendering
       (mirroring national-finals/results-test/) and add a sanitized
       public roster data file. Public-safe roster fields: name,
       division, tournamentIndex, palmerCourseHcp, marshCourseHcp,
       day1CourseHcp — taken as-is from the Players tab (columns B, C,
       E, G, H, K respectively), never recalculated. Still never IDs,
       WHS Index (raw), TEE, contact info, payment/status, or notes.
       Desktop table columns: PLAYER / TOURNAMENT INDEX / PALMER HCP /
       MARSH HCP / DAY 1 HCP (see national-finals/results-test/app.js
       buildRoster() for the reference implementation).

     STEP 2 — day1FlightsPublished: true
       Replace the Flights placeholder with the real, approved Day 1
       pairings + Day 1/Day 2 selector UI.

     STEP 3 — day1ResultsPublished: true
       Replace the Results > Day 1 placeholder with the real leaderboard;
       it publishes progressively as scores are received and verified
       (incomplete players show "Pending", never ranked).

     AFTER DAY 1 IS FINALIZED — day2FlightsPublished: true
       Add the real Day 2 pairings (championship flight = each division's
       Day 1 positions 1-4, teeing off last) to Flights > Day 2.

     AFTER THE AWARDS CEREMONY — finalResultsPublished: true
       Replace the Results > Day 2 / Final placeholder with the real
       final leaderboard.

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
