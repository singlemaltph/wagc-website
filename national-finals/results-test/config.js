/* ==========================================================================
   NATIONAL FINALS — PUBLICATION CONFIG (INTERNAL TEST PAGE)
   --------------------------------------------------------------------------
   This copy lives at national-finals/results-test/ and is for internal
   stress-testing/review only. All three sections are intentionally
   published here, including Day 2/Final, using FAKE test data.

   IMPORTANT (production workflow) — the eventual production page
   (national-finals/results/) must move through these states, and real
   Day 2 scores must never be deployed into its data.js before the last one:

     BEFORE EVENT : rosterPublished=true,  day1Published=false, day2Published=false
     AFTER DAY 1  : rosterPublished=true,  day1Published=true,  day2Published=false
     DURING DAY 2 : day2Published stays false — final results are not deployed
     AFTER AWARDS : day2Published=true, real Day 2 data added at that moment

   Do NOT copy day2Published: true from this test config into the
   production page ahead of schedule.
   ========================================================================== */
window.NF_CONFIG = {
  rosterPublished: true,
  day1Published: true,
  day2Published: true,

  // This is a test page with simulated data — keep true until removed.
  isTestData: true
};
