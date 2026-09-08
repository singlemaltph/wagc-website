/* ==========================================================================
   NATIONAL FINALS — CURRENT PLAYER ROSTER
   --------------------------------------------------------------------------
   This is the REAL, current National Finals player roster, sourced from
   the "Players" tab of the private "2026 WAGC NF Scoring" Google Sheet
   (NOT the "Test Players" tab). It is a sanitized, PUBLIC-SAFE snapshot —
   only fields appropriate for public display are included below.

   Public-safe roster fields (approved for public display): Player Name,
   Division, Tournament Index / Low Index, Palmer Course HCP, Marsh Course
   HCP, and Day 1 Course HCP when available.

   Fields deliberately EXCLUDED (present in the private sheet, never to be
   committed here): Player ID, WHS ID, raw WHS Index, TEE, Notes,
   Source/Reference, ROSTER STATUS, "Probably Joining"/"Backed Out" notes,
   WHS friend-request info, internal scorer comments, or any other
   internal/administrative column. This repository is public — GitHub and
   this file are readable by anyone regardless of any publication flag, so
   nothing internal belongs here even if the UI never renders it.

   This roster snapshot is separate from Day 1/Final SCORING data on
   purpose: scoring/results remain TEST DATA under the existing publishing
   workflow (see config.js + PUBLISHING_WORKFLOW.md) and live in
   test-scores.js as window.NF_TEST_SCORES, using a fictitious set of
   players. Do NOT merge real roster entries with fake scores.

   Field reference:
     name           - player full name, as entered in the Players tab
     division       - "A" | "B" | "C" | "D" | "E" | "PENDING"
                       ("PENDING" = division not yet assigned in the sheet;
                       never guessed/derived here — taken as-is from the
                       sheet's DIV column being blank)
     tournamentIndex - the sheet's "Low Index": the index used for
                       National Finals division placement. Labeled
                       "Tournament Index" in the UI. null when the sheet's
                       Low Index is itself blank/PENDING/Unknown (all such
                       cases are currently PENDING-division players) — this
                       is never fabricated.
     palmerCourseHcp - the sheet's "Palmer Course HCP" (column G), taken
                       as-is — never recalculated or derived here. null
                       when blank in the sheet, or when the existing
                       website player could not be uniquely matched to a
                       current Players-tab row by exact name (see the
                       unmatched-player list in the roster-refresh task
                       notes). The UI renders null as "—". A real value of
                       0 or a negative number is valid and renders as-is.
     marshCourseHcp  - the sheet's "Marsh Course HCP" (column H). Same
                       rules as palmerCourseHcp above.
     day1CourseHcp   - the sheet's "Day 1 Course HCP". null when not yet
                       finalized in the sheet (currently blank for every
                       player) — the UI renders this as "—", never a
                       made-up number.

   To refresh: re-pull the Players tab, re-run the same sanitization
   (drop every excluded column above, sort A→E→PENDING then alphabetical
   by name), match each existing website player to the current Players
   tab by exact name, and replace the array below. Do not hand-edit
   scores or divisions here — the sheet is the source of truth. Do not
   silently substitute a similarly-named player for one that can't be
   uniquely matched — leave palmerCourseHcp/marshCourseHcp null instead.
   ========================================================================== */
window.NF_PLAYERS = [
  { name: "Derek Ramsay Jr.", division: "A", tournamentIndex: 0.8, palmerCourseHcp: null, marshCourseHcp: null, day1CourseHcp: null },
  { name: "Gerardo De Chavez", division: "A", tournamentIndex: 5.1, palmerCourseHcp: 4, marshCourseHcp: 3, day1CourseHcp: null },
  { name: "Ian Davin Rosales", division: "A", tournamentIndex: 1.7, palmerCourseHcp: 0, marshCourseHcp: -1, day1CourseHcp: null },
  { name: "John Paul Gutierrez", division: "A", tournamentIndex: 4.9, palmerCourseHcp: 4, marshCourseHcp: 3, day1CourseHcp: null },
  { name: "Randy Sulpico Someros", division: "A", tournamentIndex: 4.3, palmerCourseHcp: 3, marshCourseHcp: 2, day1CourseHcp: null },
  { name: "Raymund James Lachica", division: "A", tournamentIndex: 3.9, palmerCourseHcp: 2, marshCourseHcp: 2, day1CourseHcp: null },
  { name: "Richard (Ricky) Delos Santos", division: "A", tournamentIndex: 4.9, palmerCourseHcp: 4, marshCourseHcp: 3, day1CourseHcp: null },
  { name: "Clover Arangote", division: "B", tournamentIndex: 9.9, palmerCourseHcp: 9, marshCourseHcp: 8, day1CourseHcp: null },
  { name: "Elvin Panliboton", division: "B", tournamentIndex: 7.5, palmerCourseHcp: 7, marshCourseHcp: 6, day1CourseHcp: null },
  { name: "Eugene Unabia", division: "B", tournamentIndex: 7.4, palmerCourseHcp: 6, marshCourseHcp: 5, day1CourseHcp: null },
  { name: "Htein Lin Aung", division: "B", tournamentIndex: 9.3, palmerCourseHcp: 9, marshCourseHcp: 8, day1CourseHcp: null },
  { name: "Jaybee Pasayan", division: "B", tournamentIndex: 9.1, palmerCourseHcp: 8, marshCourseHcp: 7, day1CourseHcp: null },
  { name: "Kevin Andre Montealto", division: "B", tournamentIndex: 8.8, palmerCourseHcp: 8, marshCourseHcp: 7, day1CourseHcp: null },
  { name: "Leo Gerald De Castro", division: "B", tournamentIndex: 7.3, palmerCourseHcp: 6, marshCourseHcp: 5, day1CourseHcp: null },
  { name: "Lyndon Theodore D Pamintuan", division: "B", tournamentIndex: 5.5, palmerCourseHcp: 4, marshCourseHcp: 3, day1CourseHcp: null },
  { name: "Ma Victoria Herrera", division: "B", tournamentIndex: 7.9, palmerCourseHcp: 3, marshCourseHcp: 7, day1CourseHcp: null },
  { name: "Mark Stephen Villegas", division: "B", tournamentIndex: 9.1, palmerCourseHcp: 8, marshCourseHcp: 7, day1CourseHcp: null },
  { name: "Mohd Yussof B Ishak", division: "B", tournamentIndex: 8.1, palmerCourseHcp: 7, marshCourseHcp: 6, day1CourseHcp: null },
  { name: "Neil Ruelan", division: "B", tournamentIndex: 6.8, palmerCourseHcp: 6, marshCourseHcp: 5, day1CourseHcp: null },
  { name: "Paolo Obaniana", division: "B", tournamentIndex: 10.4, palmerCourseHcp: 10, marshCourseHcp: 9, day1CourseHcp: null },
  { name: "Philip Ouano", division: "B", tournamentIndex: 5.8, palmerCourseHcp: null, marshCourseHcp: null, day1CourseHcp: null },
  { name: "Raymond Monterde Lazaro", division: "B", tournamentIndex: 9.0, palmerCourseHcp: 8, marshCourseHcp: 7, day1CourseHcp: null },
  { name: "Richard Lao", division: "B", tournamentIndex: 8.7, palmerCourseHcp: 8, marshCourseHcp: 7, day1CourseHcp: null },
  { name: "Roberto A. Umali", division: "B", tournamentIndex: 10.3, palmerCourseHcp: 10, marshCourseHcp: 9, day1CourseHcp: null },
  { name: "Wendell Lucido", division: "B", tournamentIndex: 7.6, palmerCourseHcp: null, marshCourseHcp: null, day1CourseHcp: null },
  { name: "Albert Lasac", division: "C", tournamentIndex: 14.3, palmerCourseHcp: 14, marshCourseHcp: 13, day1CourseHcp: null },
  { name: "Albert Teoxon", division: "C", tournamentIndex: 14.4, palmerCourseHcp: 14, marshCourseHcp: 13, day1CourseHcp: null },
  { name: "Alvie G. Barrios", division: "C", tournamentIndex: 12.8, palmerCourseHcp: 8, marshCourseHcp: 12, day1CourseHcp: null },
  { name: "Audi Noel Capellan", division: "C", tournamentIndex: 11.3, palmerCourseHcp: 11, marshCourseHcp: 10, day1CourseHcp: null },
  { name: "Aung Kyaw Oo", division: "C", tournamentIndex: 10.6, palmerCourseHcp: 10, marshCourseHcp: 9, day1CourseHcp: null },
  { name: "Aurelio Marasigan S.", division: "C", tournamentIndex: 10.7, palmerCourseHcp: 10, marshCourseHcp: 9, day1CourseHcp: null },
  { name: "Benjamin Diaz Jr", division: "C", tournamentIndex: 14.4, palmerCourseHcp: 14, marshCourseHcp: 13, day1CourseHcp: null },
  { name: "Edilberto Esguerra", division: "C", tournamentIndex: 14.2, palmerCourseHcp: null, marshCourseHcp: null, day1CourseHcp: null },
  { name: "Edmundo Barrios", division: "C", tournamentIndex: 12.8, palmerCourseHcp: 12, marshCourseHcp: 11, day1CourseHcp: null },
  { name: "Eric Nicholis Goetz", division: "C", tournamentIndex: 14.9, palmerCourseHcp: 15, marshCourseHcp: 14, day1CourseHcp: null },
  { name: "Espie Espinosa", division: "C", tournamentIndex: 14.3, palmerCourseHcp: 14, marshCourseHcp: 13, day1CourseHcp: null },
  { name: "Exequiel P. Longares", division: "C", tournamentIndex: 12.7, palmerCourseHcp: 12, marshCourseHcp: 11, day1CourseHcp: null },
  { name: "Gen Bonnevie", division: "C", tournamentIndex: 12.1, palmerCourseHcp: 12, marshCourseHcp: 11, day1CourseHcp: null },
  { name: "Gunal Kanna Moorthy Kannan", division: "C", tournamentIndex: 14.7, palmerCourseHcp: 15, marshCourseHcp: 14, day1CourseHcp: null },
  { name: "Jefferson G Robles", division: "C", tournamentIndex: 12.6, palmerCourseHcp: 12, marshCourseHcp: 11, day1CourseHcp: null },
  { name: "Jeter Clerigo", division: "C", tournamentIndex: 12.6, palmerCourseHcp: 12, marshCourseHcp: 11, day1CourseHcp: null },
  { name: "Jing Barretto", division: "C", tournamentIndex: 13.5, palmerCourseHcp: 13, marshCourseHcp: 12, day1CourseHcp: null },
  { name: "Joel Respeto", division: "C", tournamentIndex: 10.7, palmerCourseHcp: 10, marshCourseHcp: 9, day1CourseHcp: null },
  { name: "John Vicar Valdez", division: "C", tournamentIndex: 11.0, palmerCourseHcp: 10, marshCourseHcp: 9, day1CourseHcp: null },
  { name: "Jose Panganiban, Jr", division: "C", tournamentIndex: 14.5, palmerCourseHcp: 14, marshCourseHcp: 13, day1CourseHcp: null },
  { name: "Juan Francisco V. Estevez Jr", division: "C", tournamentIndex: 12.4, palmerCourseHcp: 12, marshCourseHcp: 11, day1CourseHcp: null },
  { name: "Kristian Herrera", division: "C", tournamentIndex: 12.1, palmerCourseHcp: 12, marshCourseHcp: 11, day1CourseHcp: null },
  { name: "Malvin James Ching", division: "C", tournamentIndex: 12.9, palmerCourseHcp: 13, marshCourseHcp: 12, day1CourseHcp: null },
  { name: "Marjorie Jalosjos", division: "C", tournamentIndex: 13.0, palmerCourseHcp: 8, marshCourseHcp: 12, day1CourseHcp: null },
  { name: "Natasha Martina Bantug", division: "C", tournamentIndex: 11.4, palmerCourseHcp: 6, marshCourseHcp: 11, day1CourseHcp: null },
  { name: "Oliver T. Asna", division: "C", tournamentIndex: 11.5, palmerCourseHcp: null, marshCourseHcp: null, day1CourseHcp: null },
  { name: "Raymond Dabao", division: "C", tournamentIndex: 11.1, palmerCourseHcp: 11, marshCourseHcp: 10, day1CourseHcp: null },
  { name: "Rodel T. Paderayon", division: "C", tournamentIndex: 15.1, palmerCourseHcp: 15, marshCourseHcp: 14, day1CourseHcp: null },
  { name: "Rogelio Ramirez", division: "C", tournamentIndex: 11.9, palmerCourseHcp: 11, marshCourseHcp: 10, day1CourseHcp: null },
  { name: "Rosven Lasac", division: "C", tournamentIndex: 14.5, palmerCourseHcp: 14, marshCourseHcp: 13, day1CourseHcp: null },
  { name: "Shaminder Singh Rahil", division: "C", tournamentIndex: 14.7, palmerCourseHcp: 15, marshCourseHcp: 14, day1CourseHcp: null },
  { name: "Tomas L Olfato", division: "C", tournamentIndex: 13.8, palmerCourseHcp: 14, marshCourseHcp: 13, day1CourseHcp: null },
  { name: "Vic Roel Ferrer", division: "C", tournamentIndex: 13.2, palmerCourseHcp: 13, marshCourseHcp: 12, day1CourseHcp: null },
  { name: "Victor Vital", division: "C", tournamentIndex: 11.8, palmerCourseHcp: 11, marshCourseHcp: 10, day1CourseHcp: null },
  { name: "Victoria Faurens", division: "C", tournamentIndex: 14.9, palmerCourseHcp: 10, marshCourseHcp: 14, day1CourseHcp: null },
  { name: "Abbhi Akshaya", division: "D", tournamentIndex: 17.8, palmerCourseHcp: 18, marshCourseHcp: 17, day1CourseHcp: null },
  { name: "Alan Algodon", division: "D", tournamentIndex: 20.1, palmerCourseHcp: 21, marshCourseHcp: 20, day1CourseHcp: null },
  { name: "Amor Laguilles", division: "D", tournamentIndex: 15.8, palmerCourseHcp: 11, marshCourseHcp: 15, day1CourseHcp: null },
  { name: "Andrew Tan", division: "D", tournamentIndex: 15.5, palmerCourseHcp: 16, marshCourseHcp: 14, day1CourseHcp: null },
  { name: "Ariel Araja", division: "D", tournamentIndex: 16.0, palmerCourseHcp: 16, marshCourseHcp: 15, day1CourseHcp: null },
  { name: "Arnel Marasigan S.", division: "D", tournamentIndex: 16.5, palmerCourseHcp: 17, marshCourseHcp: 16, day1CourseHcp: null },
  { name: "Arnold John Mesias", division: "D", tournamentIndex: 18.5, palmerCourseHcp: 19, marshCourseHcp: 18, day1CourseHcp: null },
  { name: "Augusto Anthony Buendia Jr.", division: "D", tournamentIndex: 15.8, palmerCourseHcp: 16, marshCourseHcp: 15, day1CourseHcp: null },
  { name: "Domingo Mestiola", division: "D", tournamentIndex: 17.4, palmerCourseHcp: 18, marshCourseHcp: 17, day1CourseHcp: null },
  { name: "Generoso “Gene” Ponio", division: "D", tournamentIndex: 16.7, palmerCourseHcp: 17, marshCourseHcp: 16, day1CourseHcp: null },
  { name: "Glenda Aguto", division: "D", tournamentIndex: 16.1, palmerCourseHcp: 11, marshCourseHcp: 15, day1CourseHcp: null },
  { name: "Hannah Bella Lazaro", division: "D", tournamentIndex: 19.4, palmerCourseHcp: 15, marshCourseHcp: 19, day1CourseHcp: null },
  { name: "Hoang Minh Duc", division: "D", tournamentIndex: 17.0, palmerCourseHcp: 17, marshCourseHcp: 16, day1CourseHcp: null },
  { name: "Janiree Dacles", division: "D", tournamentIndex: 19.1, palmerCourseHcp: 20, marshCourseHcp: 18, day1CourseHcp: null },
  { name: "Jasmine Velu", division: "D", tournamentIndex: 19.0, palmerCourseHcp: 14, marshCourseHcp: 18, day1CourseHcp: null },
  { name: "Jay Dizon", division: "D", tournamentIndex: 20.3, palmerCourseHcp: 21, marshCourseHcp: 20, day1CourseHcp: null },
  { name: "Joan Arangote", division: "D", tournamentIndex: 18.6, palmerCourseHcp: 14, marshCourseHcp: 18, day1CourseHcp: null },
  { name: "Joseph Barnie (Bang) Gumalo", division: "D", tournamentIndex: 18.0, palmerCourseHcp: 18, marshCourseHcp: 17, day1CourseHcp: null },
  { name: "Justin Bilbao", division: "D", tournamentIndex: 17.0, palmerCourseHcp: 17, marshCourseHcp: 16, day1CourseHcp: null },
  { name: "Kimberly Duenas", division: "D", tournamentIndex: 17.5, palmerCourseHcp: 13, marshCourseHcp: 17, day1CourseHcp: null },
  { name: "Marilyn L. Del Rosario", division: "D", tournamentIndex: 18.3, palmerCourseHcp: 14, marshCourseHcp: 18, day1CourseHcp: null },
  { name: "Marlo Dela Peña", division: "D", tournamentIndex: 19.9, palmerCourseHcp: 20, marshCourseHcp: 19, day1CourseHcp: null },
  { name: "Mary Carlene Navarro", division: "D", tournamentIndex: 19.2, palmerCourseHcp: 15, marshCourseHcp: 19, day1CourseHcp: null },
  { name: "Meynard Gelindon", division: "D", tournamentIndex: 17.0, palmerCourseHcp: 17, marshCourseHcp: 16, day1CourseHcp: null },
  { name: "Michelle Dabao", division: "D", tournamentIndex: 17.0, palmerCourseHcp: 12, marshCourseHcp: 16, day1CourseHcp: null },
  { name: "Nelson Chan", division: "D", tournamentIndex: 16.0, palmerCourseHcp: 16, marshCourseHcp: 15, day1CourseHcp: null },
  { name: "Nicole Jennice Aguilar", division: "D", tournamentIndex: 17.4, palmerCourseHcp: 13, marshCourseHcp: 17, day1CourseHcp: null },
  { name: "Patricia Claire Botardo", division: "D", tournamentIndex: 19.7, palmerCourseHcp: 15, marshCourseHcp: 19, day1CourseHcp: null },
  { name: "Patricia Valencia", division: "D", tournamentIndex: 15.5, palmerCourseHcp: 11, marshCourseHcp: 15, day1CourseHcp: null },
  { name: "Peter Nacion", division: "D", tournamentIndex: 17.2, palmerCourseHcp: 17, marshCourseHcp: 16, day1CourseHcp: null },
  { name: "Raffy Tamayo", division: "D", tournamentIndex: 17.0, palmerCourseHcp: 17, marshCourseHcp: 16, day1CourseHcp: null },
  { name: "Rainier Sison", division: "D", tournamentIndex: 16.8, palmerCourseHcp: 17, marshCourseHcp: 16, day1CourseHcp: null },
  { name: "Richard Dalilis", division: "D", tournamentIndex: 16.2, palmerCourseHcp: 16, marshCourseHcp: 15, day1CourseHcp: null },
  { name: "Roy Amurao", division: "D", tournamentIndex: 17.8, palmerCourseHcp: 18, marshCourseHcp: 17, day1CourseHcp: null },
  { name: "Ruben Javier A.", division: "D", tournamentIndex: 20.2, palmerCourseHcp: 21, marshCourseHcp: 20, day1CourseHcp: null },
  { name: "Vanessa Grace Saring", division: "D", tournamentIndex: 20.1, palmerCourseHcp: 15, marshCourseHcp: 20, day1CourseHcp: null },
  { name: "Virgilio Cadang", division: "D", tournamentIndex: 18.1, palmerCourseHcp: 18, marshCourseHcp: 17, day1CourseHcp: null },
  { name: "Virgilio R. Villaescusa", division: "D", tournamentIndex: 17.4, palmerCourseHcp: 18, marshCourseHcp: 17, day1CourseHcp: null },
  { name: "Xavier Faurens", division: "D", tournamentIndex: 15.5, palmerCourseHcp: 16, marshCourseHcp: 14, day1CourseHcp: null },
  { name: "Yi Lwin", division: "D", tournamentIndex: 18.0, palmerCourseHcp: 18, marshCourseHcp: 17, day1CourseHcp: null },
  { name: "Agnes Priest", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25, day1CourseHcp: null },
  { name: "Allen Macaraig", division: "E", tournamentIndex: 22.0, palmerCourseHcp: 23, marshCourseHcp: 22, day1CourseHcp: null },
  { name: "Amado Concepcion Jr.", division: "E", tournamentIndex: 24.0, palmerCourseHcp: 25, marshCourseHcp: 24, day1CourseHcp: null },
  { name: "Amy Lauron", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26, day1CourseHcp: null },
  { name: "Bogki Min", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26, day1CourseHcp: null },
  { name: "Cedric Mark Urera", division: "E", tournamentIndex: 23.5, palmerCourseHcp: 25, marshCourseHcp: 23, day1CourseHcp: null },
  { name: "Charito Lauron", division: "E", tournamentIndex: 25.5, palmerCourseHcp: 27, marshCourseHcp: 26, day1CourseHcp: null },
  { name: "Dennis Chavez Atienza", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26, day1CourseHcp: null },
  { name: "Divina Lapasaran", division: "E", tournamentIndex: 22.6, palmerCourseHcp: 18, marshCourseHcp: 22, day1CourseHcp: null },
  { name: "Erisa Joyce D. Min", division: "E", tournamentIndex: 21.2, palmerCourseHcp: 17, marshCourseHcp: 21, day1CourseHcp: null },
  { name: "Jan Kero Batallones", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26, day1CourseHcp: null },
  { name: "Janelle Lim-Kanna", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25, day1CourseHcp: null },
  { name: "Jayrold E. Bautista", division: "E", tournamentIndex: 22.3, palmerCourseHcp: 23, marshCourseHcp: 22, day1CourseHcp: null },
  { name: "Jenny Vi M. Paderayon", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25, day1CourseHcp: null },
  { name: "Jericho Fullante", division: "E", tournamentIndex: 23.5, palmerCourseHcp: 25, marshCourseHcp: 23, day1CourseHcp: null },
  { name: "Johan Wahlen Pangilinan", division: "E", tournamentIndex: 23.6, palmerCourseHcp: 25, marshCourseHcp: 24, day1CourseHcp: null },
  { name: "Joseph Reylan Reyes", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26, day1CourseHcp: null },
  { name: "Jt Trinidad", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26, day1CourseHcp: null },
  { name: "Lorenzo A Javier", division: "E", tournamentIndex: 22.2, palmerCourseHcp: 23, marshCourseHcp: 22, day1CourseHcp: null },
  { name: "Lwin Min Paing", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26, day1CourseHcp: null },
  { name: "Manolo Besa", division: "E", tournamentIndex: 23.1, palmerCourseHcp: 24, marshCourseHcp: 23, day1CourseHcp: null },
  { name: "Maria Barbara Kathleen L. Evangelista (Lynne)", division: "E", tournamentIndex: 24.5, palmerCourseHcp: 20, marshCourseHcp: 24, day1CourseHcp: null },
  { name: "Maritess Uy", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25, day1CourseHcp: null },
  { name: "Melvin Alit Gialolo", division: "E", tournamentIndex: 24.4, palmerCourseHcp: 26, marshCourseHcp: 24, day1CourseHcp: null },
  { name: "Oliver Dela Cruz", division: "E", tournamentIndex: 22.3, palmerCourseHcp: null, marshCourseHcp: null, day1CourseHcp: null },
  { name: "Oliver James Matias", division: "E", tournamentIndex: 20.8, palmerCourseHcp: 21, marshCourseHcp: 20, day1CourseHcp: null },
  { name: "Owen Ajero Rosal", division: "E", tournamentIndex: 23.6, palmerCourseHcp: 25, marshCourseHcp: 24, day1CourseHcp: null },
  { name: "Pearl Grace Rodrigo Agdeppa", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25, day1CourseHcp: null },
  { name: "Philip Martin Esteban", division: "E", tournamentIndex: 21.0, palmerCourseHcp: 22, marshCourseHcp: 21, day1CourseHcp: null },
  { name: "Ricardo Carpio III", division: "E", tournamentIndex: 22.7, palmerCourseHcp: 24, marshCourseHcp: 23, day1CourseHcp: null },
  { name: "Roberto Cruz Lazaro", division: "E", tournamentIndex: 21.9, palmerCourseHcp: 23, marshCourseHcp: 22, day1CourseHcp: null },
  { name: "Ronald Rezani", division: "E", tournamentIndex: 21.5, palmerCourseHcp: 22, marshCourseHcp: 21, day1CourseHcp: null },
  { name: "Rowena Victorino", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25, day1CourseHcp: null },
  { name: "Rustico Ramirez", division: "E", tournamentIndex: 24.0, palmerCourseHcp: 25, marshCourseHcp: 24, day1CourseHcp: null },
  { name: "Sherwin Gregorio Uy", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26, day1CourseHcp: null },
  { name: "Shiela Teoxon", division: "E", tournamentIndex: 23.3, palmerCourseHcp: 19, marshCourseHcp: 23, day1CourseHcp: null },
  { name: "Toshiki Koyama", division: "E", tournamentIndex: 23.3, palmerCourseHcp: 24, marshCourseHcp: 23, day1CourseHcp: null },
  { name: "Angela Mae Divino", division: "PENDING", tournamentIndex: null, palmerCourseHcp: null, marshCourseHcp: null, day1CourseHcp: null },
  { name: "Ian Lopez", division: "PENDING", tournamentIndex: null, palmerCourseHcp: null, marshCourseHcp: null, day1CourseHcp: null },
  { name: "Julius Michael Lachica", division: "PENDING", tournamentIndex: null, palmerCourseHcp: null, marshCourseHcp: null, day1CourseHcp: null },
  { name: "Ruth Castro", division: "PENDING", tournamentIndex: null, palmerCourseHcp: null, marshCourseHcp: null, day1CourseHcp: null },
];
