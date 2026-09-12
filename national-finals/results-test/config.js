/* ==========================================================================
   NATIONAL FINALS — PUBLICATION CONFIG (INTERNAL TEST PAGE)
   --------------------------------------------------------------------------
   This copy lives at national-finals/results-test/ and is for internal
   stress-testing/review only.

   SOURCE OF TRUTH: the private "2026 WAGC NF Scoring" Google Sheet is the
   authoritative dataset before, during, and immediately after the
   tournament (full roster, Low Index, Course HCP, internal IDs, Day 1/2
   scores, handicap adjustments, official positions and tie-break results).
   This public website is NOT that source of truth — it only ever holds
   what has already been cleared for public release. See
   PUBLISHING_WORKFLOW.md in this directory for the full policy.

   Five separate flags on purpose — roster, Day 1 flights, Day 1 results,
   Day 2 flights, and Final results are each released at a different point
   in the tournament. Collapsing any of these into one flag produces
   confusing or unsafe behavior (e.g. Day 2 pairings appearing before they
   exist, or Day 1 results stuck behind a flag meant for Final).

   CRITICAL — these flags control UI VISIBILITY ONLY. They are NOT a
   security boundary. This repository is public: anything committed into
   data.js, flights.js, or any other file here can be read directly from
   GitHub or from DevTools regardless of these flags. Therefore:
     - REAL Day 2 pairings must not be committed here before they are
       officially released (after Day 1 is complete and verified).
     - REAL final-result data must not be committed here before the
       Awards Ceremony, even if finalResultsPublished is false.
   Flip a flag to true only in the same change that adds the real,
   already-cleared-for-release data it gates.

   STATE MACHINE (production page: national-finals/results/):

     STATE A — Pre-event
       rosterPublished: true, day1FlightsPublished: true,
       day1ResultsPublished: false, day2FlightsPublished: false,
       finalResultsPublished: false

     STATE B — Day 1 scoring underway
       day1ResultsPublished: true (leaderboard fills progressively as
       scores are verified — see app.js buildDay1's completed/pending split)

     STATE C — Day 1 complete, Day 2 flights released
       day2FlightsPublished: true (only once the real Day 2 pairing data,
       generated from final Day 1 standings per the championship-flight-last
       rule documented in flights.js, has been committed)

     STATE D — Day 2 finished, before Awards Ceremony
       finalResultsPublished stays false — no exceptions, even though the
       internal/private result is already known

     STATE E — After Awards Ceremony
       finalResultsPublished: true, once real final data has been committed

   Do NOT copy day2FlightsPublished: true or finalResultsPublished: true
   into the production page ahead of the matching real data being added.
   ========================================================================== */
window.NF_CONFIG = {
  rosterPublished: true,
  day1FlightsPublished: true,
  day1ResultsPublished: false,
  day2FlightsPublished: false,
  finalResultsPublished: true,

  // This is a test page with simulated data — keep true until removed.
  isTestData: true
};
