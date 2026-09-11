/* ==========================================================================
   NATIONAL FINALS — DAY 1 RESULTS (PRODUCTION, VERIFIED-ONLY)
   --------------------------------------------------------------------------
   This is a PROGRESSIVE, VERIFIED-ONLY Day 1 leaderboard, published live.
   A player appears in this file ONLY once their scorecard has already
   passed the official verification gate upstream — this file is never a
   place to guess, infer, or back-fill an unverified score. If a player's
   scorecard has not yet been verified, they are simply absent from this
   array; the website does not render them as "Pending" on this panel (see
   config.js's day1ResultsPublished flag and app.js's buildResultsDay1()).

   Public-safe fields only: name, division, day1Hcp, day1Gross, day1Net.

   Fields deliberately EXCLUDED (present in the private scoring workbook,
   never to be committed here): Player ID, hole-by-hole scores, AI Review
   Status, Scorer Status, Uncertain Holes, scorecard file name, processing
   timestamps, notes, WHS information, TEE, payment/status information, or
   any other internal/administrative column. This repository is public —
   GitHub and this file are readable by anyone regardless of any
   publication flag, so nothing internal belongs here even if the UI never
   renders it.

   Field reference:
     name       - player full name, matching the current NF_PLAYERS roster
     division   - "A" | "B" | "C" | "D" | "E" — the player's roster division
     day1Hcp    - the player's official Day 1 Course HCP, taken as-is from
                  the verified scorecard, never recalculated
     day1Gross  - the player's verified Day 1 gross score
     day1Net    - the player's verified Day 1 net score (day1Gross minus
                  day1Hcp); taken as-is from the verified scorecard, not
                  recomputed here

   Ranking on the website is standard competition ranking (1, T2, T2, 4)
   computed client-side from day1Net ascending — this is a provisional
   leaderboard, NOT the official countback tie-break. Positions will shift
   as more verified scorecards are added.

   To refresh: append newly verified players (or replace the array in
   full, if a fresh authoritative export is provided) and keep this file
   in sync with the verification gate — do not add a player here ahead of
   verification.
   ========================================================================== */
window.NF_DAY1_RESULTS = [
  { name: "Alvie G. Barrios", division: "C", day1Hcp: 8, day1Gross: 85, day1Net: 77 },
  { name: "Evangeline Bradley", division: "C", day1Hcp: 8, day1Gross: 85, day1Net: 77 },
  { name: "Joel Respeto", division: "C", day1Hcp: 10, day1Gross: 101, day1Net: 91 },
  { name: "Aung Kyaw Oo", division: "C", day1Hcp: 17, day1Gross: 105, day1Net: 88 },
  { name: "Natasha Martina Bantug", division: "C", day1Hcp: 6, day1Gross: 98, day1Net: 92 },
  { name: "Eric Nicholis Goetz", division: "C", day1Hcp: 15, day1Gross: 107, day1Net: 92 },
  { name: "Oliver T. Asna", division: "C", day1Hcp: 11, day1Gross: 90, day1Net: 79 },
  { name: "Victoria Terry", division: "C", day1Hcp: 10, day1Gross: 117, day1Net: 107 },
  { name: "Agnes Priest", division: "E", day1Hcp: 25, day1Gross: 99, day1Net: 74 },
  { name: "Divina Lapasaran", division: "E", day1Hcp: 22, day1Gross: 98, day1Net: 76 },
  { name: "Daniel De Gala", division: "E", day1Hcp: 20, day1Gross: 99, day1Net: 79 },
  { name: "Gunal Kanna Moorthy Kannan", division: "C", day1Hcp: 15, day1Gross: 99, day1Net: 84 },
  { name: "Albert Lasac", division: "C", day1Hcp: 14, day1Gross: 95, day1Net: 81 },
  { name: "Aurelio Marasigan S.", division: "C", day1Hcp: 10, day1Gross: 98, day1Net: 88 },
  { name: "Raymond Dabao", division: "C", day1Hcp: 11, day1Gross: 89, day1Net: 78 },
  { name: "Joseph Reylan Reyes", division: "E", day1Hcp: 26, day1Gross: 98, day1Net: 72 },
  { name: "Erisa Joyce D. Min", division: "E", day1Hcp: 21, day1Gross: 138, day1Net: 117 },
  { name: "Oliver Balita", division: "E", day1Hcp: 21, day1Gross: 84, day1Net: 63 },
  { name: "Aiza Lipit", division: "E", day1Hcp: 25, day1Gross: 96, day1Net: 71 },
  { name: "Dennis Chavez Atienza", division: "E", day1Hcp: 26, day1Gross: 95, day1Net: 69 },
  { name: "Erica Esteves", division: "E", day1Hcp: 25, day1Gross: 96, day1Net: 71 },
  { name: "Maria Barbara Kathleen L. Evangelista (Lynne)", division: "E", day1Hcp: 24, day1Gross: 94, day1Net: 70 },
  { name: "Amy Lauron", division: "E", day1Hcp: 26, day1Gross: 99, day1Net: 73 },
  { name: "Allen Macaraig", division: "E", day1Hcp: 22, day1Gross: 86, day1Net: 64 },
  { name: "Alvin Hipolito", division: "C", day1Hcp: 14, day1Gross: 90, day1Net: 76 },
  { name: "John Vicar Valdez", division: "C", day1Hcp: 10, day1Gross: 96, day1Net: 86 },
  { name: "Audi Noel Capellan", division: "C", day1Hcp: 11, day1Gross: 87, day1Net: 76 },
  { name: "Shaminder Singh Rahil", division: "C", day1Hcp: 15, day1Gross: 95, day1Net: 80 },
  { name: "Cedric Mark Urera", division: "E", day1Hcp: 23, day1Gross: 93, day1Net: 70 },
  { name: "Jt Trinidad", division: "E", day1Hcp: 26, day1Gross: 106, day1Net: 80 },
  { name: "Janelle Lim-Kanna", division: "E", day1Hcp: 25, day1Gross: 104, day1Net: 79 },
  { name: "Marjorie Jalosjos", division: "E", day1Hcp: 22, day1Gross: 107, day1Net: 85 },
  { name: "Exequiel P. Longares", division: "C", day1Hcp: 12, day1Gross: 109, day1Net: 97 },
  { name: "Edilberto Esguerra", division: "C", day1Hcp: 14, day1Gross: 89, day1Net: 75 },
  { name: "Jing Barretto", division: "C", day1Hcp: 13, day1Gross: 88, day1Net: 75 },
  { name: "Renan Vincent Gustilo", division: "C", day1Hcp: 11, day1Gross: 85, day1Net: 74 },
  { name: "Marceliano V. Teofilo", division: "C", day1Hcp: 13, day1Gross: 92, day1Net: 79 },
  { name: "Vic Roel Ferrer", division: "C", day1Hcp: 13, day1Gross: 91, day1Net: 78 },
  { name: "Gen Bonnevie", division: "C", day1Hcp: 12, day1Gross: 124, day1Net: 112 },
  { name: "LEONIDES MARFA PARAGSA", division: "C", day1Hcp: 12, day1Gross: 97, day1Net: 85 },
  { name: "Tomas L Olfato", division: "C", day1Hcp: 14, day1Gross: 96, day1Net: 82 },
  { name: "Rwin Pagkalinawan", division: "C", day1Hcp: 13, day1Gross: 87, day1Net: 74 },
  { name: "Jefferson G Robles", division: "C", day1Hcp: 12, day1Gross: 120, day1Net: 108 },
  { name: "Manolo Besa", division: "E", day1Hcp: 23, day1Gross: 83, day1Net: 60 },
];
