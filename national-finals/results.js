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

// Publication timestamp for the "Last updated" label shown on the Day 1
// Results panel. Update this every time a new verified batch is published.
window.NF_DAY1_RESULTS_UPDATED_AT = "2026-09-11T17:10:00+08:00";

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
  { name: "Rogelio Ramirez", division: "C", day1Hcp: 11, day1Gross: 84, day1Net: 73 },
  { name: "Joshua Reynes", division: "C", day1Hcp: 13, day1Gross: 89, day1Net: 76 },
  { name: "Malvin James Ching", division: "C", day1Hcp: 13, day1Gross: 106, day1Net: 93 },
  { name: "Efren Ian Alvez", division: "C", day1Hcp: 12, day1Gross: 95, day1Net: 83 },
  { name: "Duke Ng", division: "C", day1Hcp: 14, day1Gross: 93, day1Net: 79 },
  { name: "Benjamin Diaz Jr", division: "C", day1Hcp: 14, day1Gross: 105, day1Net: 91 },
  { name: "Edmundo Barrios", division: "C", day1Hcp: 12, day1Gross: 94, day1Net: 82 },
  { name: "Raymond Palomares", division: "C", day1Hcp: 11, day1Gross: 87, day1Net: 76 },
  { name: "Jennyson Macaraig", division: "E", day1Hcp: 25, day1Gross: 96, day1Net: 71 },
  { name: "Shiela Teoxon", division: "E", day1Hcp: 23, day1Gross: 93, day1Net: 70 },
  { name: "Bogki Min", division: "E", day1Hcp: 26, day1Gross: 97, day1Net: 71 },
  { name: "Kristian Herrera", division: "C", day1Hcp: 12, day1Gross: 90, day1Net: 78 },
  { name: "Rosven Lasac", division: "C", day1Hcp: 14, day1Gross: 97, day1Net: 83 },
  { name: "Jeter Clerigo", division: "C", day1Hcp: 12, day1Gross: 97, day1Net: 85 },
  { name: "Sherwin Gregorio Uy", division: "E", day1Hcp: 26, day1Gross: 101, day1Net: 75 },
  { name: "Jayrold E. Bautista", division: "E", day1Hcp: 22, day1Gross: 104, day1Net: 82 },
  { name: "Pearl Grace Rodrigo Agdeppa", division: "E", day1Hcp: 25, day1Gross: 98, day1Net: 73 },
  { name: "Maritess Uy", division: "E", day1Hcp: 25, day1Gross: 109, day1Net: 84 },
  { name: "Rowena Victorino", division: "E", day1Hcp: 25, day1Gross: 113, day1Net: 88 },
  { name: "Miela Gian Marquez", division: "E", day1Hcp: 25, day1Gross: 111, day1Net: 86 },
  { name: "Jan Kero Batallones", division: "E", day1Hcp: 26, day1Gross: 94, day1Net: 68 },
  { name: "Philip Martin Esteban", division: "E", day1Hcp: 21, day1Gross: 94, day1Net: 73 },
  { name: "Melvin Alit Gialolo", division: "E", day1Hcp: 24, day1Gross: 99, day1Net: 75 },
  { name: "Lwin Min Paing", division: "E", day1Hcp: 26, day1Gross: 100, day1Net: 74 },
  { name: "Jericho Fullante", division: "E", day1Hcp: 23, day1Gross: 87, day1Net: 64 },
  { name: "Ma Victoria Herrera", division: "B", day1Hcp: 3, day1Gross: 79, day1Net: 76 },
  { name: "Lyndon Theodore D Pamintuan", division: "B", day1Hcp: 4, day1Gross: 84, day1Net: 80 },
  { name: "Espie Espinosa", division: "C", day1Hcp: 9, day1Gross: 112, day1Net: 103 },
  { name: "Htein Lin Aung", division: "B", day1Hcp: 9, day1Gross: 102, day1Net: 93 },
  { name: "Rosette Maureen C. Reyes", division: "E", day1Hcp: 25, day1Gross: 119, day1Net: 94 },
  { name: "Johan Wahlen Pangilinan", division: "E", day1Hcp: 24, day1Gross: 98, day1Net: 74 },
  { name: "Julius Michael Lachica", division: "E", day1Hcp: 22, day1Gross: 96, day1Net: 74 },
  { name: "Paolo Obaniana", division: "B", day1Hcp: 10, day1Gross: 88, day1Net: 78 },
  { name: "Lorenzo A Javier", division: "E", day1Hcp: 22, day1Gross: 89, day1Net: 67 },
  { name: "Andrew Tan", division: "B", day1Hcp: 7, day1Gross: 94, day1Net: 87 },
  { name: "Eugene Unabia", division: "B", day1Hcp: 6, day1Gross: 91, day1Net: 85 },
  { name: "Jaybee Pasayan", division: "B", day1Hcp: 8, day1Gross: 94, day1Net: 86 },
  { name: "Roberto Cruz Lazaro", division: "E", day1Hcp: 22, day1Gross: 88, day1Net: 66 },
  { name: "Amado Concepcion Jr.", division: "E", day1Hcp: 24, day1Gross: 126, day1Net: 102 },
  { name: "Ricardo Carpio III", division: "E", day1Hcp: 23, day1Gross: 101, day1Net: 78 },
  { name: "Rustico Ramirez", division: "E", day1Hcp: 24, day1Gross: 95, day1Net: 71 },
  { name: "Milbert Oliveros", division: "B", day1Hcp: 8, day1Gross: 89, day1Net: 81 },
  { name: "Neil Ruelan", division: "B", day1Hcp: 6, day1Gross: 84, day1Net: 78 },
  { name: "Clover Arangote", division: "B", day1Hcp: 9, day1Gross: 98, day1Net: 89 },
  { name: "Ronald Rezani", division: "E", day1Hcp: 21, day1Gross: 107, day1Net: 86 },
  { name: "Owen Ajero Rosal", division: "E", day1Hcp: 24, day1Gross: 101, day1Net: 77 },
  { name: "Toshiki Koyama", division: "E", day1Hcp: 23, day1Gross: 116, day1Net: 93 },
  { name: "Jay Dizon", division: "D", day1Hcp: 20, day1Gross: 93, day1Net: 73 },
  { name: "Glenda Aguto", division: "D", day1Hcp: 15, day1Gross: 96, day1Net: 81 },
  { name: "Hannah Bella Lazaro", division: "D", day1Hcp: 19, day1Gross: 85, day1Net: 66 },
  { name: "Xavier Faurens", division: "D", day1Hcp: 14, day1Gross: 94, day1Net: 80 },
  { name: "Leo Gerald De Castro", division: "B", day1Hcp: 6, day1Gross: 82, day1Net: 76 },
  { name: "Elvin Panliboton", division: "B", day1Hcp: 7, day1Gross: 95, day1Net: 88 },
  { name: "Kevin Andre Montealto", division: "B", day1Hcp: 8, day1Gross: 88, day1Net: 80 },
  { name: "Richard Lao", division: "B", day1Hcp: 8, day1Gross: 95, day1Net: 87 },
  { name: "Raymond Monterde Lazaro", division: "B", day1Hcp: 8, day1Gross: 92, day1Net: 84 },
  { name: "Wendell Lucido", division: "B", day1Hcp: 7, day1Gross: 89, day1Net: 82 },
  { name: "Aaron Arvin Sorbito", division: "B", day1Hcp: 8, day1Gross: 82, day1Net: 74 },
  { name: "Romeo Lopez", division: "B", day1Hcp: 6, day1Gross: 81, day1Net: 75 },
  { name: "Amor Laguilles", division: "D", day1Hcp: 15, day1Gross: 98, day1Net: 83 },
  { name: "Marlo Dela Peña", division: "D", day1Hcp: 19, day1Gross: 100, day1Net: 81 },
  { name: "Dolly De Gala", division: "D", day1Hcp: 16, day1Gross: 87, day1Net: 71 },
  { name: "Angela Mae 'Divino' Susi", division: "D", day1Hcp: 18, day1Gross: 90, day1Net: 72 },
  { name: "Ian Davin Rosales", division: "A", day1Hcp: 0, day1Gross: 81, day1Net: 81 },
  { name: "Richard (Ricky) Delos Santos", division: "A", day1Hcp: 4, day1Gross: 70, day1Net: 66 },
  { name: "Gerardo De Chavez", division: "A", day1Hcp: 4, day1Gross: 83, day1Net: 79 },
  { name: "Randy Sulpico Someros", division: "A", day1Hcp: 3, day1Gross: 75, day1Net: 72 },
  { name: "Victor Vital", division: "B", day1Hcp: 10, day1Gross: 97, day1Net: 87 },
  { name: "Ronald Andal", division: "A", day1Hcp: 4, day1Gross: 89, day1Net: 85 },
  { name: "Jonathan Simon", division: "B", day1Hcp: 8, day1Gross: 108, day1Net: 100 },
  { name: "Greg Reyes", division: "B", day1Hcp: 9, day1Gross: 85, day1Net: 76 },
  { name: "Roberto A. Umali", division: "B", day1Hcp: 10, day1Gross: 93, day1Net: 83 },
  { name: "Mark Stephen Villegas", division: "B", day1Hcp: 8, day1Gross: 95, day1Net: 87 },
  { name: "Ariel Araja", division: "D", day1Hcp: 15, day1Gross: 83, day1Net: 68 },
  { name: "Kimberly Duenas", division: "D", day1Hcp: 17, day1Gross: 94, day1Net: 77 },
  { name: "Janiree Dacles", division: "D", day1Hcp: 19, day1Gross: 93, day1Net: 74 },
  { name: "Arnel Marasigan S.", division: "D", day1Hcp: 16, day1Gross: 87, day1Net: 71 },
  { name: "Patricia Valencia", division: "D", day1Hcp: 15, day1Gross: 87, day1Net: 72 },
  { name: "Oliver James Matias", division: "D", day1Hcp: 20, day1Gross: 89, day1Net: 69 },
  { name: "Jasmine Velu", division: "D", day1Hcp: 18, day1Gross: 76, day1Net: 58 },
  { name: "Raffy Tamayo", division: "D", day1Hcp: 16, day1Gross: 83, day1Net: 67 },
  { name: "Nicole Jennice Aguilar", division: "D", day1Hcp: 17, day1Gross: 99, day1Net: 82 },
  { name: "Vanessa Grace Saring", division: "D", day1Hcp: 20, day1Gross: 85, day1Net: 65 },
  { name: "Miguel Lucas Barretto", division: "A", day1Hcp: 4, day1Gross: 93, day1Net: 89 },
  { name: "Philip Ouano", division: "A", day1Hcp: 4, day1Gross: 87, day1Net: 83 },
  { name: "Raymund James Lachica", division: "A", day1Hcp: 2, day1Gross: 85, day1Net: 83 },
  { name: "John Paul Gutierrez", division: "A", day1Hcp: 4, day1Gross: 84, day1Net: 80 },
  { name: "Jerome Chua", division: "D", day1Hcp: 15, day1Gross: 98, day1Net: 83 },
  { name: "Michelle Dabao", division: "D", day1Hcp: 16, day1Gross: 94, day1Net: 78 },
  { name: "Patricia Claire Botardo", division: "D", day1Hcp: 19, day1Gross: 114, day1Net: 95 },
  { name: "Alan Algodon", division: "D", day1Hcp: 20, day1Gross: 95, day1Net: 75 },
  { name: "Ruben Javier A.", division: "D", day1Hcp: 20, day1Gross: 93, day1Net: 73 },
  { name: "Mary Carlene Navarro", division: "D", day1Hcp: 19, day1Gross: 99, day1Net: 80 },
  { name: "Nelson Chan", division: "D", day1Hcp: 15, day1Gross: 88, day1Net: 73 },
  { name: "Marilyn L. Del Rosario", division: "D", day1Hcp: 18, day1Gross: 80, day1Net: 62 },
  { name: "Augusto Anthony Buendia Jr.", division: "D", day1Hcp: 15, day1Gross: 83, day1Net: 68 },
  { name: "Neil Darrell Sanchez", division: "D", day1Hcp: 18, day1Gross: 94, day1Net: 76 },
  { name: "Ruth Castro", division: "D", day1Hcp: 20, day1Gross: 89, day1Net: 69 },
  { name: "Joan Arangote", division: "D", day1Hcp: 18, day1Gross: 96, day1Net: 78 },
  { name: "Generoso “Gene” Ponio", division: "D", day1Hcp: 16, day1Gross: 84, day1Net: 68 },
  { name: "Justin Bilbao", division: "D", day1Hcp: 16, day1Gross: 93, day1Net: 77 },
  { name: "Hoang Minh Duc", division: "D", day1Hcp: 16, day1Gross: 88, day1Net: 72 },
  { name: "Domingo Mestiola", division: "D", day1Hcp: 17, day1Gross: 99, day1Net: 82 },
  { name: "Roy Amurao", division: "D", day1Hcp: 17, day1Gross: 86, day1Net: 69 },
  { name: "Arnold John Mesias", division: "D", day1Hcp: 18, day1Gross: 81, day1Net: 63 },
  { name: "Richard Dalilis", division: "D", day1Hcp: 15, day1Gross: 83, day1Net: 68 },
  { name: "Abbhi Akshaya", division: "D", day1Hcp: 17, day1Gross: 89, day1Net: 72 },
  { name: "Cesar Areza", division: "D", day1Hcp: 17, day1Gross: 92, day1Net: 75 },
  { name: "Joseph Barnie (Bang) Gumalo", division: "D", day1Hcp: 17, day1Gross: 96, day1Net: 79 },
  { name: "Virgilio Cadang", division: "D", day1Hcp: 17, day1Gross: 90, day1Net: 73 },
  { name: "Rainier Sison", division: "D", day1Hcp: 16, day1Gross: 90, day1Net: 74 },
  { name: "Jose Panganiban, Jr", division: "C", day1Hcp: 14, day1Gross: null, day1Net: null, status: "DNF" },
];
