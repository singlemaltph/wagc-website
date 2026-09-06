/* ==========================================================================
   NATIONAL FINALS — PUBLICATION CONFIG (INTERNAL TEST PAGE)
   --------------------------------------------------------------------------
   This copy lives at national-finals/results-test/ and is for internal
   stress-testing/review only. All three sections are intentionally
   published here, including Day 2/Final, using FAKE test data.

   IMPORTANT (production workflow):
   The eventual production page (national-finals/results/) must keep
   day2Published = false until AFTER the awards ceremony, and real Day 2
   scores must not be deployed into its data.js until the moment of
   publication. Do NOT copy day2Published: true from this test config
   into the production page.
   ========================================================================== */
window.NF_CONFIG = {
  rosterPublished: true,
  day1Published: true,
  day2Published: true,

  // This is a test page with simulated data — keep true until removed.
  isTestData: true
};
