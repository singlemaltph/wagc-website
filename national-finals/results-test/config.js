/* ==========================================================================
   NATIONAL FINALS — PUBLICATION CONFIG (INTERNAL TEST PAGE)
   --------------------------------------------------------------------------
   This copy lives at national-finals/results-test/ and is for internal
   stress-testing/review only.

   day2FlightsPublished and finalResultsPublished are separate flags on
   purpose — Day 2 flights and Final Results are released at different
   points in the tournament, so one flag controlling both would produce
   confusing behavior (e.g. Day 2 pairings appearing before they exist,
   or staying hidden after Day 1 just because awarding hasn't happened).

   IMPORTANT (production workflow) — the eventual production page
   (national-finals/results/) must move through these states, and real
   Day 2 / final data must never be deployed ahead of the matching flag:

     BEFORE / DURING DAY 1 : rosterPublished=true, day1Published=true (once ready),
                              day2FlightsPublished=false, finalResultsPublished=false
     AFTER DAY 1 COMPLETES : day2FlightsPublished=true once real Day 2 pairings
                              are generated and published (see app.js buildFlights
                              for the pairing rule to implement later)
     DURING DAY 2           : finalResultsPublished stays false
     AFTER AWARDS CEREMONY  : finalResultsPublished=true, real final data added
                              to data.js at that moment

   Do NOT copy day2FlightsPublished: true or finalResultsPublished: true
   from this test config into the production page ahead of schedule.
   ========================================================================== */
window.NF_CONFIG = {
  rosterPublished: true,
  day1Published: true,
  day2FlightsPublished: false,
  finalResultsPublished: false,

  // This is a test page with simulated data — keep true until removed.
  isTestData: true
};
