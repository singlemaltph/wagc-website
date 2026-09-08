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

   CURRENT STATE — roster released, pre-tournament otherwise:
     rosterPublished: true (data.js added — see that file's header for the
     sanitization rules), day1FlightsPublished: false,
     day2FlightsPublished: false, day1ResultsPublished: false,
     finalResultsPublished: false

   NAVIGATION MODEL: the primary tabs — INFO / ROSTER / FLIGHTS / RESULTS —
   are ALWAYS visible on this page, regardless of these flags. Flags gate
   the CONTENT inside a tab, never the tab's existence. Flights/Results
   still show a simple "not yet published, check back" placeholder (see
   app.js) and load no data files while their flags are false — there is
   nothing unpublished sitting in the DOM or in public JS to find.

   ROLLOUT SEQUENCE (update this page's markup + this file together,
   one step at a time, only once WAGC approves each step). The tabs stay
   the same throughout — only each panel's content changes:

     STEP 1 — rosterPublished: true — DONE
       Roster rendering (mirroring national-finals/results-test/) and the
       sanitized public roster data file (data.js) have been added.
       Public-safe roster fields: name, division, tournamentIndex,
       palmerCourseHcp, marshCourseHcp — taken as-is from the Players tab
       (columns B, C, E, G, H respectively), never recalculated. Still
       never IDs, WHS Index (raw), TEE, contact info, payment/status, or
       notes. Desktop table columns: PLAYER / TOURNAMENT INDEX / PALMER
       HCP / MARSH HCP. The roster deliberately does NOT publish Day 1
       Course HCP — a player's actual Course HCP for a given round is
       published with that day's flight pairing instead (see STEP 2/3
       below). To refresh the roster later, re-pull the Players tab and
       replace data.js's array in the SAME change that updates
       national-finals/results-test/data.js from the same snapshot.

     STEP 2 — day1FlightsPublished: true
       Add a real Day 1 flight-pairing data file (mirroring the shape of
       national-finals/results-test/flights.js) and flip the flag in the
       SAME change; buildFlights() in app.js is already prepared to
       render it. Flight-player schema: { name, division, courseHcp }.
       courseHcp source: Players tab → "Day 1 Course HCP" (column K),
       taken as-is, never recalculated. Column label is always
       "COURSE HCP". null renders as "—"; a real 0 or negative Course HCP
       renders as-is.

     STEP 3 — day1ResultsPublished: true
       Replace the Results > Day 1 placeholder with the real leaderboard;
       it publishes progressively as scores are received and verified
       (incomplete players show "Pending", never ranked).

     AFTER DAY 1 IS FINALIZED — day2FlightsPublished: true
       Add the real Day 2 pairings (championship flight = each division's
       Day 1 positions 1-4, teeing off last) to Flights > Day 2. Same
       { name, division, courseHcp } schema as Day 1, but courseHcp here
       must come from the "Handicap Adjustment" tab's official
       "R2 Course Handicap" — the player's adjusted Course HCP for Round
       2. Never use the original Palmer/Marsh HCP, "Day 2 Base Course
       HCP" alone, or a locally recomputed adjustment. Do not publish
       until Day 1 is finalized, official standings are set, and R2
       Course Handicap is confirmed.

     AFTER THE AWARDS CEREMONY — finalResultsPublished: true
       Replace the Results > Day 2 / Final placeholder with the real
       final leaderboard.

   Do NOT set any flag to true ahead of adding that section's real content
   in the same change.
   ========================================================================== */
window.NF_CONFIG = {
  rosterPublished: true,
  day1FlightsPublished: false,
  day2FlightsPublished: false,
  day1ResultsPublished: false,
  finalResultsPublished: false
};
