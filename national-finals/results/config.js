/* ==========================================================================
   NATIONAL FINALS — PUBLICATION CONFIG
   --------------------------------------------------------------------------
   Flip these flags when each stage of the tournament is ready to go public.

   IMPORTANT (production workflow):
   day2Published must stay `false` until AFTER the awards ceremony.
   While it is `false`, the page will not render any Day 2 / final numbers
   even if they are technically present in data.js.

   However, visual hiding is NOT the real safeguard — the real safeguard is
   operational: do not deploy actual Day 2 scores into data.js at all until
   you are ready to publish. Keep real Day 2 results out of this repo /
   deployment entirely (e.g. leave the day2 fields blank/null in data.js)
   until the moment you intend to reveal them, then push both the data
   update AND day2Published = true together.
   ========================================================================== */
window.NF_CONFIG = {
  rosterPublished: true,
  day1Published: true,
  day2Published: false,

  // Remove this once the event is over and this is no longer a test page.
  isTestData: true
};
