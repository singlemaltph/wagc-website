/* ==========================================================================
   NATIONAL FINALS — TEST / MOCK PLAYER DATA
   --------------------------------------------------------------------------
   This file is intentionally separate from the page markup/logic so it can
   later be swapped out for a live feed generated from the NF Scoring
   Google Sheet without touching index.html or app.js.

   THIS IS TEST DATA — used to stress-test the page before the real
   tournament. Replace the contents of NF_PLAYERS with the live roster when
   ready, and see config.js for the publication flags that control what is
   shown to the public.

   Field reference:
     name         - player full name
     division     - "A" | "B" | "C" | "D" | "E"
     index        - WHS Handicap Index
     day1Complete - true once this player's Day 1 score has been received
                    AND verified. Players are only ranked on the public
                    Day 1 leaderboard when this is true (see app.js
                    buildDay1) — this is what lets the leaderboard fill in
                    progressively during Day 1 instead of an all-or-nothing
                    publish. All test rows below are true; flip one to
                    false locally to test the "Pending" state, but do not
                    commit that change.
     day1Hcp      - Day 1 Course Handicap
     day1Gross    - Day 1 gross score
     day1Net      - Day 1 net score (day1Gross - day1Hcp)
     adjustment   - handicap adjustment applied after Day 1
     day2Hcp      - Day 2 Course Handicap
     day2Gross    - Day 2 gross score
     day2Net      - Day 2 net score (day2Gross - day2Hcp)
     finalNet     - 2-day net total (day1Net + day2Net)

   Do NOT add WHS ID, player ID, email, phone, or internal notes here —
   this file is loaded directly by the public results page.

   TIE-BREAK NOTE: `position` shown on the public leaderboard is computed
   here client-side by ascending Day1Net/finalNet with an alphabetical
   fallback — that is a TEST-ONLY placeholder, NOT the official National
   Finals tie-break rule. See PUBLISHING_WORKFLOW.md for the official
   count-back sequence. In production, the private scoring workbook should
   apply that official tie-break and hand this file an already-resolved
   `position`/ranking rather than have the website recompute it — this
   avoids inconsistent results and avoids exposing hole-by-hole scorecards
   publicly.
   ========================================================================== */
window.NF_PLAYERS = [
  { name: "RONALD ANDAL",          division: "B", index: 10.0, day1Complete: true, day1Hcp: 9,  day1Gross: 83,  day1Net: 74, adjustment: 0,  day2Hcp: 8,  day2Gross: 86,  day2Net: 78, finalNet: 152 },
  { name: "TAE UK KIM",            division: "B", index: 10.0, day1Complete: true, day1Hcp: 9,  day1Gross: 87,  day1Net: 78, adjustment: 1,  day2Hcp: 9,  day2Gross: 77,  day2Net: 68, finalNet: 146 },
  { name: "GREG REYES",            division: "C", index: 11.6, day1Complete: true, day1Hcp: 11, day1Gross: 76,  day1Net: 65, adjustment: -3, day2Hcp: 7,  day2Gross: 80,  day2Net: 73, finalNet: 138 },
  { name: "ERWIN PABKALINAWAN",    division: "C", index: 13.0, day1Complete: true, day1Hcp: 13, day1Gross: 79,  day1Net: 66, adjustment: -3, day2Hcp: 9,  day2Gross: 78,  day2Net: 69, finalNet: 135 },
  { name: "ROMMEL MARIANO",        division: "C", index: 13.3, day1Complete: true, day1Hcp: 13, day1Gross: 83,  day1Net: 70, adjustment: -1, day2Hcp: 11, day2Gross: 80,  day2Net: 69, finalNet: 139 },
  { name: "ALVIN HIPOLITO",        division: "C", index: 14.6, day1Complete: true, day1Hcp: 15, day1Gross: 86,  day1Net: 71, adjustment: -1, day2Hcp: 12, day2Gross: 87,  day2Net: 75, finalNet: 146 },
  { name: "RAYMOND PALOMARES",     division: "C", index: 13.2, day1Complete: true, day1Hcp: 13, day1Gross: 91,  day1Net: 78, adjustment: 1,  day2Hcp: 13, day2Gross: 91,  day2Net: 78, finalNet: 156 },
  { name: "EDGARDO BROCAL",        division: "C", index: 15.3, day1Complete: true, day1Hcp: 15, day1Gross: 94,  day1Net: 79, adjustment: 1,  day2Hcp: 15, day2Gross: 96,  day2Net: 81, finalNet: 160 },
  { name: "ED ESGUERRA",           division: "D", index: 16.1, day1Complete: true, day1Hcp: 16, day1Gross: 74,  day1Net: 58, adjustment: -6, day2Hcp: 9,  day2Gross: 83,  day2Net: 74, finalNet: 132 },
  { name: "JEROME CHUA",           division: "D", index: 16.5, day1Complete: true, day1Hcp: 17, day1Gross: 88,  day1Net: 71, adjustment: -1, day2Hcp: 15, day2Gross: 87,  day2Net: 72, finalNet: 143 },
  { name: "MICHAELO PALANCA",      division: "D", index: 20.1, day1Complete: true, day1Hcp: 21, day1Gross: 95,  day1Net: 74, adjustment: 0,  day2Hcp: 20, day2Gross: 98,  day2Net: 78, finalNet: 152 },
  { name: "ANDRO SERVIENTO",       division: "D", index: 19.6, day1Complete: true, day1Hcp: 20, day1Gross: 95,  day1Net: 75, adjustment: 0,  day2Hcp: 19, day2Gross: 93,  day2Net: 74, finalNet: 149 },
  { name: "CESAR AREZA",           division: "D", index: 18.2, day1Complete: true, day1Hcp: 19, day1Gross: 94,  day1Net: 75, adjustment: 0,  day2Hcp: 17, day2Gross: 99,  day2Net: 82, finalNet: 157 },
  { name: "BENSON SO",             division: "D", index: 19.8, day1Complete: true, day1Hcp: 20, day1Gross: 98,  day1Net: 78, adjustment: 1,  day2Hcp: 20, day2Gross: 101, day2Net: 81, finalNet: 159 },
  { name: "LEO JOAB DE CASTRO",    division: "D", index: 16.3, day1Complete: true, day1Hcp: 16, day1Gross: 95,  day1Net: 79, adjustment: 1,  day2Hcp: 16, day2Gross: 87,  day2Net: 71, finalNet: 150 },
  { name: "VICTOR FRIAS",          division: "D", index: 19.2, day1Complete: true, day1Hcp: 20, day1Gross: 116, day1Net: 96, adjustment: 3,  day2Hcp: 22, day2Gross: 102, day2Net: 80, finalNet: 176 },
  { name: "ROSSETTE REYES",        division: "E", index: 27.4, day1Complete: true, day1Hcp: 29, day1Gross: 93,  day1Net: 64, adjustment: -4, day2Hcp: 24, day2Gross: 96,  day2Net: 72, finalNet: 136 },
  { name: "ROY JAVIER",            division: "E", index: 22.0, day1Complete: true, day1Hcp: 23, day1Gross: 91,  day1Net: 68, adjustment: -2, day2Hcp: 20, day2Gross: 87,  day2Net: 67, finalNet: 135 },
  { name: "NICK REYES",            division: "E", index: 24.0, day1Complete: true, day1Hcp: 25, day1Gross: 94,  day1Net: 69, adjustment: -2, day2Hcp: 22, day2Gross: 94,  day2Net: 72, finalNet: 141 },
  { name: "OLIVER BALITA",         division: "E", index: 22.3, day1Complete: true, day1Hcp: 23, day1Gross: 94,  day1Net: 71, adjustment: -1, day2Hcp: 21, day2Gross: 101, day2Net: 80, finalNet: 151 },
  { name: "JOHN RODOLF RABINO",    division: "E", index: 22.1, day1Complete: true, day1Hcp: 23, day1Gross: 99,  day1Net: 76, adjustment: 0,  day2Hcp: 22, day2Gross: 99,  day2Net: 77, finalNet: 153 },
  { name: "JENNISON MACARAIG",     division: "E", index: 30.6, day1Complete: true, day1Hcp: 32, day1Gross: 113, day1Net: 81, adjustment: 2,  day2Hcp: 33, day2Gross: 111, day2Net: 78, finalNet: 159 },
  { name: "MARK JASON VILLAMOR",   division: "E", index: 27.2, day1Complete: true, day1Hcp: 29, day1Gross: 111, day1Net: 82, adjustment: 2,  day2Hcp: 30, day2Gross: 108, day2Net: 78, finalNet: 160 },
  { name: "ARIS NATIVIDAD",        division: "E", index: 21.7, day1Complete: true, day1Hcp: 22, day1Gross: 106, day1Net: 84, adjustment: 2,  day2Hcp: 23, day2Gross: 98,  day2Net: 75, finalNet: 159 },
  { name: "MARIA RICA BALTAZAR",   division: "B", index: 9.4,  day1Complete: true, day1Hcp: 9,  day1Gross: 81,  day1Net: 72, adjustment: 0,  day2Hcp: 8,  day2Gross: 82,  day2Net: 74, finalNet: 146 },
  { name: "VICE MILBERT OLIVEROS", division: "C", index: 10.7, day1Complete: true, day1Hcp: 10, day1Gross: 85,  day1Net: 75, adjustment: 0,  day2Hcp: 9,  day2Gross: 88,  day2Net: 79, finalNet: 154 },
  { name: "VLADIMIR VIC FRIAS",    division: "D", index: 19.2, day1Complete: true, day1Hcp: 20, day1Gross: 89,  day1Net: 69, adjustment: -2, day2Hcp: 17, day2Gross: 88,  day2Net: 71, finalNet: 140 },
  { name: "DENNIS BALTAZAR",       division: "D", index: 18.4, day1Complete: true, day1Hcp: 19, day1Gross: 111, day1Net: 92, adjustment: 3,  day2Hcp: 21, day2Gross: 97,  day2Net: 76, finalNet: 168 }
];
