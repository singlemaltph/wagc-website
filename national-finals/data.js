/* ==========================================================================
   NATIONAL FINALS — PUBLISHED PLAYER ROSTER (PRODUCTION)
   --------------------------------------------------------------------------
   This is the REAL, current National Finals player roster, sourced from
   the "Players" tab of the private "2026 WAGC NF Scoring" Google Sheet
   (NOT the "Test Players" tab). It is a sanitized, PUBLIC-SAFE snapshot —
   only fields appropriate for public display are included below. This is
   the live, authorized public roster — loaded only when
   config.js's rosterPublished is true.

   Public-safe roster fields (approved for public display): Player Name,
   Division, Tournament Index / Low Index, Palmer Course HCP, and Marsh
   Course HCP. The roster shows each player's Tournament Index and base
   Course HCP for both courses only — a player's actual Course HCP for a
   given round is shown with that day's FLIGHT PAIRING instead (see
   flights.js's flight-player schema), not on the roster.

   Fields deliberately EXCLUDED (present in the private sheet, never to be
   committed here): Player ID, WHS ID, raw WHS Index, TEE, Notes,
   Source/Reference, ROSTER STATUS, "Probably Joining"/"Backed Out" notes,
   WHS friend-request info, internal scorer comments, or any other
   internal/administrative column. This repository is public — GitHub and
   this file are readable by anyone regardless of any publication flag, so
   nothing internal belongs here even if the UI never renders it.

   Field reference:
     name           - player full name, as entered in the Players tab
     division       - "A" | "B" | "C" | "D" | "E" | "PENDING"
                       ("PENDING" = division not yet assigned in the sheet;
                       never guessed/derived here — taken as-is from the
                       sheet's DIV column being blank)
     tournamentIndex - the sheet's "Low Index": the index used for
                       National Finals division placement. Labeled
                       "Tournament Index" in the UI. null when the sheet's
                       Low Index is itself blank/PENDING/Unknown — this is
                       never fabricated.
     palmerCourseHcp - the sheet's "Palmer Course HCP" (column G), taken
                       as-is — never recalculated or derived here. null
                       when blank in the sheet. The UI renders null as
                       "—". A real value of 0 or a negative number is
                       valid and renders as-is.
     marshCourseHcp  - the sheet's "Marsh Course HCP" (column H). Same
                       rules as palmerCourseHcp above.

   day1CourseHcp is intentionally NOT part of this roster schema — a
   player's actual Course HCP for a given round is published with that
   day's flight pairing (see flights.js's { name, division, courseHcp }
   schema), not on the roster.

   To refresh: re-pull the Players tab, re-run the same sanitization
   (drop every excluded column above, sort A→E→PENDING then alphabetical
   by name), and replace the array below in the SAME change that also
   updates national-finals/results-test/data.js from the same snapshot.
   Do not hand-edit scores or divisions here — the sheet is the source
   of truth.
   ========================================================================== */
window.NF_PLAYERS = [
  { name: "Gerardo De Chavez", division: "A", tournamentIndex: 5.1, palmerCourseHcp: 4, marshCourseHcp: 3 },
  { name: "Ian Davin Rosales", division: "A", tournamentIndex: 1.7, palmerCourseHcp: 0, marshCourseHcp: -1 },
  { name: "John Paul Gutierrez", division: "A", tournamentIndex: 4.9, palmerCourseHcp: 4, marshCourseHcp: 3 },
  { name: "Miguel Lucas Barretto", division: "A", tournamentIndex: 5.4, palmerCourseHcp: 4, marshCourseHcp: 3 },
  { name: "Randy Sulpico Someros", division: "A", tournamentIndex: 4.3, palmerCourseHcp: 3, marshCourseHcp: 2 },
  { name: "Raymund James Lachica", division: "A", tournamentIndex: 3.9, palmerCourseHcp: 2, marshCourseHcp: 2 },
  { name: "Richard (Ricky) Delos Santos", division: "A", tournamentIndex: 4.9, palmerCourseHcp: 4, marshCourseHcp: 3 },
  { name: "Aaron Arvin Sorbito", division: "B", tournamentIndex: 8.4, palmerCourseHcp: 8, marshCourseHcp: 7 },
  { name: "Clover Arangote", division: "B", tournamentIndex: 9.9, palmerCourseHcp: 9, marshCourseHcp: 8 },
  { name: "Elvin Panliboton", division: "B", tournamentIndex: 7.5, palmerCourseHcp: 7, marshCourseHcp: 6 },
  { name: "Eugene Unabia", division: "B", tournamentIndex: 7.4, palmerCourseHcp: 6, marshCourseHcp: 5 },
  { name: "Greg Reyes", division: "B", tournamentIndex: 9.4, palmerCourseHcp: 9, marshCourseHcp: 8 },
  { name: "Htein Lin Aung", division: "B", tournamentIndex: 9.3, palmerCourseHcp: 9, marshCourseHcp: 8 },
  { name: "Jaybee Pasayan", division: "B", tournamentIndex: 9.1, palmerCourseHcp: 8, marshCourseHcp: 7 },
  { name: "Kevin Andre Montealto", division: "B", tournamentIndex: 8.8, palmerCourseHcp: 8, marshCourseHcp: 7 },
  { name: "Leo Gerald De Castro", division: "B", tournamentIndex: 7.3, palmerCourseHcp: 6, marshCourseHcp: 5 },
  { name: "Lyndon Theodore D Pamintuan", division: "B", tournamentIndex: 5.5, palmerCourseHcp: 4, marshCourseHcp: 3 },
  { name: "Ma Victoria Herrera", division: "B", tournamentIndex: 7.9, palmerCourseHcp: 3, marshCourseHcp: 7 },
  { name: "Mark Stephen Villegas", division: "B", tournamentIndex: 9.1, palmerCourseHcp: 8, marshCourseHcp: 7 },
  { name: "Mohd Yussof B Ishak", division: "B", tournamentIndex: 8.1, palmerCourseHcp: 7, marshCourseHcp: 6 },
  { name: "Neil Ruelan", division: "B", tournamentIndex: 6.8, palmerCourseHcp: 6, marshCourseHcp: 5 },
  { name: "Paolo Obaniana", division: "B", tournamentIndex: 10.4, palmerCourseHcp: 10, marshCourseHcp: 9 },
  { name: "Raymond Monterde Lazaro", division: "B", tournamentIndex: 9, palmerCourseHcp: 8, marshCourseHcp: 7 },
  { name: "Richard Lao", division: "B", tournamentIndex: 8.7, palmerCourseHcp: 8, marshCourseHcp: 7 },
  { name: "Roberto A. Umali", division: "B", tournamentIndex: 10.3, palmerCourseHcp: 10, marshCourseHcp: 9 },
  { name: "Zhaorong 'Amos' Cai", division: "B", tournamentIndex: 10.1, palmerCourseHcp: 9, marshCourseHcp: 8 },
  { name: "Albert Lasac", division: "C", tournamentIndex: 14.3, palmerCourseHcp: 14, marshCourseHcp: 13 },
  { name: "Albert Teoxon", division: "C", tournamentIndex: 14.4, palmerCourseHcp: 14, marshCourseHcp: 13 },
  { name: "Alvie G. Barrios", division: "C", tournamentIndex: 12.8, palmerCourseHcp: 8, marshCourseHcp: 12 },
  { name: "Audi Noel Capellan", division: "C", tournamentIndex: 11.3, palmerCourseHcp: 11, marshCourseHcp: 10 },
  { name: "Aung Kyaw Oo", division: "C", tournamentIndex: 10.6, palmerCourseHcp: 10, marshCourseHcp: 9 },
  { name: "Aurelio Marasigan S.", division: "C", tournamentIndex: 10.7, palmerCourseHcp: 10, marshCourseHcp: 9 },
  { name: "Benjamin Diaz Jr", division: "C", tournamentIndex: 14.4, palmerCourseHcp: 14, marshCourseHcp: 13 },
  { name: "Duke Ng", division: "C", tournamentIndex: 14.5, palmerCourseHcp: 14, marshCourseHcp: 13 },
  { name: "Edmundo Barrios", division: "C", tournamentIndex: 12.8, palmerCourseHcp: 12, marshCourseHcp: 11 },
  { name: "Efren Ian Alvez", division: "C", tournamentIndex: 12.7, palmerCourseHcp: 12, marshCourseHcp: 11 },
  { name: "Eric Nicholis Goetz", division: "C", tournamentIndex: 14.9, palmerCourseHcp: 15, marshCourseHcp: 14 },
  { name: "Espie Espinosa", division: "C", tournamentIndex: 14.3, palmerCourseHcp: 14, marshCourseHcp: 13 },
  { name: "Evangeline Bradley", division: "C", tournamentIndex: 12.7, palmerCourseHcp: 8, marshCourseHcp: 12 },
  { name: "Exequiel P. Longares", division: "C", tournamentIndex: 12.7, palmerCourseHcp: 12, marshCourseHcp: 11 },
  { name: "Gen Bonnevie", division: "C", tournamentIndex: 12.1, palmerCourseHcp: 12, marshCourseHcp: 11 },
  { name: "Gunal Kanna Moorthy Kannan", division: "C", tournamentIndex: 14.7, palmerCourseHcp: 15, marshCourseHcp: 14 },
  { name: "Jefferson G Robles", division: "C", tournamentIndex: 12.6, palmerCourseHcp: 12, marshCourseHcp: 11 },
  { name: "Jeter Clerigo", division: "C", tournamentIndex: 12.6, palmerCourseHcp: 12, marshCourseHcp: 11 },
  { name: "Jing Barretto", division: "C", tournamentIndex: 13.5, palmerCourseHcp: 13, marshCourseHcp: 12 },
  { name: "Joel Respeto", division: "C", tournamentIndex: 10.7, palmerCourseHcp: 10, marshCourseHcp: 9 },
  { name: "John Vicar Valdez", division: "C", tournamentIndex: 11, palmerCourseHcp: 10, marshCourseHcp: 9 },
  { name: "Jose Panganiban, Jr", division: "C", tournamentIndex: 14.5, palmerCourseHcp: 14, marshCourseHcp: 13 },
  { name: "Joshua Reynes", division: "C", tournamentIndex: 13.3, palmerCourseHcp: 13, marshCourseHcp: 12 },
  { name: "Juan Francisco V. Estevez Jr", division: "C", tournamentIndex: 12.4, palmerCourseHcp: 12, marshCourseHcp: 11 },
  { name: "Kristian Herrera", division: "C", tournamentIndex: 12.1, palmerCourseHcp: 12, marshCourseHcp: 11 },
  { name: "Malvin James Ching", division: "C", tournamentIndex: 12.9, palmerCourseHcp: 13, marshCourseHcp: 12 },
  { name: "Marjorie Jalosjos", division: "C", tournamentIndex: 13, palmerCourseHcp: 8, marshCourseHcp: 12 },
  { name: "Natasha Martina Bantug", division: "C", tournamentIndex: 11.4, palmerCourseHcp: 6, marshCourseHcp: 11 },
  { name: "Raymond Dabao", division: "C", tournamentIndex: 11.1, palmerCourseHcp: 11, marshCourseHcp: 10 },
  { name: "Renan Vincent Gustilo", division: "C", tournamentIndex: 11.1, palmerCourseHcp: 11, marshCourseHcp: 10 },
  { name: "Rodel T. Paderayon", division: "C", tournamentIndex: 15.1, palmerCourseHcp: 15, marshCourseHcp: 14 },
  { name: "Rogelio Ramirez", division: "C", tournamentIndex: 11.9, palmerCourseHcp: 11, marshCourseHcp: 10 },
  { name: "Rosven Lasac", division: "C", tournamentIndex: 14.5, palmerCourseHcp: 14, marshCourseHcp: 13 },
  { name: "Shaminder Singh Rahil", division: "C", tournamentIndex: 14.7, palmerCourseHcp: 15, marshCourseHcp: 14 },
  { name: "Tomas L Olfato", division: "C", tournamentIndex: 13.8, palmerCourseHcp: 14, marshCourseHcp: 13 },
  { name: "Vic Roel Ferrer", division: "C", tournamentIndex: 13.2, palmerCourseHcp: 13, marshCourseHcp: 12 },
  { name: "Victor Vital", division: "C", tournamentIndex: 11.8, palmerCourseHcp: 11, marshCourseHcp: 10 },
  { name: "Victoria Faurens", division: "C", tournamentIndex: 14.9, palmerCourseHcp: 10, marshCourseHcp: 14 },
  { name: "Abbhi Akshaya", division: "D", tournamentIndex: 17.8, palmerCourseHcp: 18, marshCourseHcp: 17 },
  { name: "Alan Algodon", division: "D", tournamentIndex: 20.1, palmerCourseHcp: 21, marshCourseHcp: 20 },
  { name: "Amor Laguilles", division: "D", tournamentIndex: 15.8, palmerCourseHcp: 11, marshCourseHcp: 15 },
  { name: "Andrew Tan", division: "D", tournamentIndex: 15.5, palmerCourseHcp: 16, marshCourseHcp: 14 },
  { name: "Angela Mae 'Divino' Susi", division: "D", tournamentIndex: 18.6, palmerCourseHcp: 14, marshCourseHcp: 18 },
  { name: "Ariel Araja", division: "D", tournamentIndex: 16, palmerCourseHcp: 16, marshCourseHcp: 15 },
  { name: "Arnel Marasigan S.", division: "D", tournamentIndex: 16.5, palmerCourseHcp: 17, marshCourseHcp: 16 },
  { name: "Arnold John Mesias", division: "D", tournamentIndex: 18.5, palmerCourseHcp: 19, marshCourseHcp: 18 },
  { name: "Augusto Anthony Buendia Jr.", division: "D", tournamentIndex: 15.8, palmerCourseHcp: 16, marshCourseHcp: 15 },
  { name: "Domingo Mestiola", division: "D", tournamentIndex: 17.4, palmerCourseHcp: 18, marshCourseHcp: 17 },
  { name: "Generoso “Gene” Ponio", division: "D", tournamentIndex: 16.7, palmerCourseHcp: 17, marshCourseHcp: 16 },
  { name: "Glenda Aguto", division: "D", tournamentIndex: 16.1, palmerCourseHcp: 11, marshCourseHcp: 15 },
  { name: "Hannah Bella Lazaro", division: "D", tournamentIndex: 19.4, palmerCourseHcp: 15, marshCourseHcp: 19 },
  { name: "Hoang Minh Duc", division: "D", tournamentIndex: 17, palmerCourseHcp: 17, marshCourseHcp: 16 },
  { name: "Janiree Dacles", division: "D", tournamentIndex: 19.1, palmerCourseHcp: 20, marshCourseHcp: 18 },
  { name: "Jasmine Velu", division: "D", tournamentIndex: 19, palmerCourseHcp: 14, marshCourseHcp: 18 },
  { name: "Jay Dizon", division: "D", tournamentIndex: 20.3, palmerCourseHcp: 21, marshCourseHcp: 20 },
  { name: "Joan Arangote", division: "D", tournamentIndex: 18.6, palmerCourseHcp: 14, marshCourseHcp: 18 },
  { name: "Joseph Barnie (Bang) Gumalo", division: "D", tournamentIndex: 18, palmerCourseHcp: 18, marshCourseHcp: 17 },
  { name: "Justin Bilbao", division: "D", tournamentIndex: 17, palmerCourseHcp: 17, marshCourseHcp: 16 },
  { name: "Kimberly Duenas", division: "D", tournamentIndex: 17.5, palmerCourseHcp: 13, marshCourseHcp: 17 },
  { name: "Marilyn L. Del Rosario", division: "D", tournamentIndex: 18.3, palmerCourseHcp: 14, marshCourseHcp: 18 },
  { name: "Marlo Dela Peña", division: "D", tournamentIndex: 19.9, palmerCourseHcp: 20, marshCourseHcp: 19 },
  { name: "Mary Carlene Navarro", division: "D", tournamentIndex: 19.2, palmerCourseHcp: 15, marshCourseHcp: 19 },
  { name: "Meynard Gelindon", division: "D", tournamentIndex: 17, palmerCourseHcp: 17, marshCourseHcp: 16 },
  { name: "Michelle Dabao", division: "D", tournamentIndex: 17, palmerCourseHcp: 12, marshCourseHcp: 16 },
  { name: "Nelson Chan", division: "D", tournamentIndex: 16, palmerCourseHcp: 16, marshCourseHcp: 15 },
  { name: "Nicole Jennice Aguilar", division: "D", tournamentIndex: 17.4, palmerCourseHcp: 13, marshCourseHcp: 17 },
  { name: "Patricia Claire Botardo", division: "D", tournamentIndex: 19.7, palmerCourseHcp: 15, marshCourseHcp: 19 },
  { name: "Patricia Valencia", division: "D", tournamentIndex: 15.5, palmerCourseHcp: 11, marshCourseHcp: 15 },
  { name: "Peter Nacion", division: "D", tournamentIndex: 17.2, palmerCourseHcp: 17, marshCourseHcp: 16 },
  { name: "Rachell Ruth Capalungan", division: "D", tournamentIndex: 20.2, palmerCourseHcp: 16, marshCourseHcp: 20 },
  { name: "Raffy Tamayo", division: "D", tournamentIndex: 17, palmerCourseHcp: 17, marshCourseHcp: 16 },
  { name: "Rainier Sison", division: "D", tournamentIndex: 16.8, palmerCourseHcp: 17, marshCourseHcp: 16 },
  { name: "Richard Dalilis", division: "D", tournamentIndex: 16.2, palmerCourseHcp: 16, marshCourseHcp: 15 },
  { name: "Roy Amurao", division: "D", tournamentIndex: 17.8, palmerCourseHcp: 18, marshCourseHcp: 17 },
  { name: "Ruben Javier A.", division: "D", tournamentIndex: 20.2, palmerCourseHcp: 21, marshCourseHcp: 20 },
  { name: "Vanessa Grace Saring", division: "D", tournamentIndex: 20.1, palmerCourseHcp: 15, marshCourseHcp: 20 },
  { name: "Virgilio Cadang", division: "D", tournamentIndex: 18.1, palmerCourseHcp: 18, marshCourseHcp: 17 },
  { name: "Virgilio R. Villaescusa", division: "D", tournamentIndex: 17.4, palmerCourseHcp: 18, marshCourseHcp: 17 },
  { name: "Xavier Faurens", division: "D", tournamentIndex: 15.5, palmerCourseHcp: 16, marshCourseHcp: 14 },
  { name: "Yi Lwin", division: "D", tournamentIndex: 18, palmerCourseHcp: 18, marshCourseHcp: 17 },
  { name: "Agnes Priest", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25 },
  { name: "Allen Macaraig", division: "E", tournamentIndex: 22, palmerCourseHcp: 23, marshCourseHcp: 22 },
  { name: "Amado Concepcion Jr.", division: "E", tournamentIndex: 24, palmerCourseHcp: 25, marshCourseHcp: 24 },
  { name: "Amy Lauron", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26 },
  { name: "Bogki Min", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26 },
  { name: "Cedric Mark Urera", division: "E", tournamentIndex: 23.5, palmerCourseHcp: 25, marshCourseHcp: 23 },
  { name: "Charito Lauron", division: "E", tournamentIndex: 25.5, palmerCourseHcp: 27, marshCourseHcp: 26 },
  { name: "Dennis Chavez Atienza", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26 },
  { name: "Divina Lapasaran", division: "E", tournamentIndex: 22.6, palmerCourseHcp: 18, marshCourseHcp: 22 },
  { name: "Erica Esteves", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25 },
  { name: "Erisa Joyce D. Min", division: "E", tournamentIndex: 21.2, palmerCourseHcp: 17, marshCourseHcp: 21 },
  { name: "Jan Kero Batallones", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26 },
  { name: "Janelle Lim-Kanna", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25 },
  { name: "Jayrold E. Bautista", division: "E", tournamentIndex: 22.3, palmerCourseHcp: 23, marshCourseHcp: 22 },
  { name: "Jenny Vi M. Paderayon", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25 },
  { name: "Jennyson Macaraig", division: "E", tournamentIndex: 30.2, palmerCourseHcp: 26, marshCourseHcp: 30 },
  { name: "Jericho Fullante", division: "E", tournamentIndex: 23.5, palmerCourseHcp: 25, marshCourseHcp: 23 },
  { name: "Johan Wahlen Pangilinan", division: "E", tournamentIndex: 23.6, palmerCourseHcp: 25, marshCourseHcp: 24 },
  { name: "Joseph Reylan Reyes", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26 },
  { name: "Jt Trinidad", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26 },
  { name: "Lorenzo A Javier", division: "E", tournamentIndex: 22.2, palmerCourseHcp: 23, marshCourseHcp: 22 },
  { name: "Lwin Min Paing", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26 },
  { name: "Manolo Besa", division: "E", tournamentIndex: 23.1, palmerCourseHcp: 24, marshCourseHcp: 23 },
  { name: "Maria Barbara Kathleen L. Evangelista (Lynne)", division: "E", tournamentIndex: 24.5, palmerCourseHcp: 20, marshCourseHcp: 24 },
  { name: "Maritess Uy", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25 },
  { name: "Melvin Alit Gialolo", division: "E", tournamentIndex: 24.4, palmerCourseHcp: 26, marshCourseHcp: 24 },
  { name: "Miela Gian Marquez", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25 },
  { name: "Oliver Balita", division: "E", tournamentIndex: 21.1, palmerCourseHcp: 22, marshCourseHcp: 21 },
  { name: "Oliver James Matias", division: "E", tournamentIndex: 20.8, palmerCourseHcp: 21, marshCourseHcp: 20 },
  { name: "Owen Ajero Rosal", division: "E", tournamentIndex: 23.6, palmerCourseHcp: 25, marshCourseHcp: 24 },
  { name: "Pearl Grace Rodrigo Agdeppa", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25 },
  { name: "Philip Martin Esteban", division: "E", tournamentIndex: 21, palmerCourseHcp: 22, marshCourseHcp: 21 },
  { name: "Ricardo Carpio III", division: "E", tournamentIndex: 22.7, palmerCourseHcp: 24, marshCourseHcp: 23 },
  { name: "Roberto Cruz Lazaro", division: "E", tournamentIndex: 21.9, palmerCourseHcp: 23, marshCourseHcp: 22 },
  { name: "Ronald Rezani", division: "E", tournamentIndex: 21.5, palmerCourseHcp: 22, marshCourseHcp: 21 },
  { name: "Rosette Maureen C. Reyes", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25 },
  { name: "Rowena Victorino", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 21, marshCourseHcp: 25 },
  { name: "Rustico Ramirez", division: "E", tournamentIndex: 24, palmerCourseHcp: 25, marshCourseHcp: 24 },
  { name: "Sherwin Gregorio Uy", division: "E", tournamentIndex: 25.4, palmerCourseHcp: 27, marshCourseHcp: 26 },
  { name: "Shiela Teoxon", division: "E", tournamentIndex: 23.3, palmerCourseHcp: 19, marshCourseHcp: 23 },
  { name: "Toshiki Koyama", division: "E", tournamentIndex: 23.3, palmerCourseHcp: 24, marshCourseHcp: 23 },
  { name: "Ian Lopez", division: "PENDING", tournamentIndex: null, palmerCourseHcp: null, marshCourseHcp: null},
  { name: "Julius Michael Lachica", division: "PENDING", tournamentIndex: null, palmerCourseHcp: null, marshCourseHcp: null},
];
