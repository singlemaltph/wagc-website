/* ==========================================================================
   NATIONAL FINALS — CURRENT PLAYER ROSTER
   --------------------------------------------------------------------------
   This is the REAL, current National Finals player roster, sourced from
   the "Players" tab of the private "2026 WAGC NF Scoring" Google Sheet
   (NOT the "Test Players" tab). It is a sanitized, PUBLIC-SAFE snapshot —
   only fields appropriate for public display are included below.

   Fields deliberately EXCLUDED (present in the private sheet, never to be
   committed here): Player ID, WHS ID, WHS Index (raw), TEE, Palmer/Marsh
   Course HCP, Notes, Source/Reference, ROSTER STATUS, or any other
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
     day1CourseHcp   - the sheet's "Day 1 Course HCP". null when not yet
                       finalized in the sheet (currently blank for every
                       player) — the UI renders this as "—", never a
                       made-up number.

   To refresh: re-pull the Players tab, re-run the same sanitization
   (drop every column above, sort A→E→PENDING then alphabetical by name),
   and replace the array below. Do not hand-edit scores or divisions here
   — the sheet is the source of truth.
   ========================================================================== */
window.NF_PLAYERS = [
  { name: "GERARDO DE CHAVEZ", division: "A", tournamentIndex: 5.1, day1CourseHcp: null },
  { name: "Ian Davin Rosales", division: "A", tournamentIndex: 1.7, day1CourseHcp: null },
  { name: "John Paul Gutierrez", division: "A", tournamentIndex: 4.9, day1CourseHcp: null },
  { name: "Randy Sulpico Someros", division: "A", tournamentIndex: 4.3, day1CourseHcp: null },
  { name: "Raymund James Lachica", division: "A", tournamentIndex: 3.9, day1CourseHcp: null },
  { name: "Richard (Ricky) Delos Santos", division: "A", tournamentIndex: 4.9, day1CourseHcp: null },
  { name: "Clover Arangote", division: "B", tournamentIndex: 9.9, day1CourseHcp: null },
  { name: "Elvin Panliboton", division: "B", tournamentIndex: 7.5, day1CourseHcp: null },
  { name: "Eugene Unabia", division: "B", tournamentIndex: 7.4, day1CourseHcp: null },
  { name: "Htein Lin Aung", division: "B", tournamentIndex: 9.3, day1CourseHcp: null },
  { name: "Kevin Andre Montealto", division: "B", tournamentIndex: 8.8, day1CourseHcp: null },
  { name: "Leo Gerald de Castro", division: "B", tournamentIndex: 7.3, day1CourseHcp: null },
  { name: "Lyndon Theodore D Pamintuan", division: "B", tournamentIndex: 5.5, day1CourseHcp: null },
  { name: "Ma Victoria Herrera", division: "B", tournamentIndex: 7.9, day1CourseHcp: null },
  { name: "Mark stephen villegas", division: "B", tournamentIndex: 9.1, day1CourseHcp: null },
  { name: "Mohd Yussof B Ishak", division: "B", tournamentIndex: 8.1, day1CourseHcp: null },
  { name: "Neil Ruelan", division: "B", tournamentIndex: 6.8, day1CourseHcp: null },
  { name: "Paolo Obaniana", division: "B", tournamentIndex: 10.4, day1CourseHcp: null },
  { name: "Philip Ouano", division: "B", tournamentIndex: 5.8, day1CourseHcp: null },
  { name: "Raymond Monterde Lazaro", division: "B", tournamentIndex: 9.0, day1CourseHcp: null },
  { name: "Richard Lao", division: "B", tournamentIndex: 8.7, day1CourseHcp: null },
  { name: "Roberto A.  Umali", division: "B", tournamentIndex: 10.3, day1CourseHcp: null },
  { name: "Wendell Lucido", division: "B", tournamentIndex: 7.6, day1CourseHcp: null },
  { name: "Albert Lasac", division: "C", tournamentIndex: 14.3, day1CourseHcp: null },
  { name: "Albert Teoxon", division: "C", tournamentIndex: 14.4, day1CourseHcp: null },
  { name: "Alvie G. Barrios", division: "C", tournamentIndex: 12.8, day1CourseHcp: null },
  { name: "Audi Noel Capellan", division: "C", tournamentIndex: 11.3, day1CourseHcp: null },
  { name: "Aung Kyaw Oo", division: "C", tournamentIndex: 10.6, day1CourseHcp: null },
  { name: "Aurelio Marasigan S.", division: "C", tournamentIndex: 10.7, day1CourseHcp: null },
  { name: "Benjamin Diaz Jr", division: "C", tournamentIndex: 14.4, day1CourseHcp: null },
  { name: "Edmundo Barrios", division: "C", tournamentIndex: 12.8, day1CourseHcp: null },
  { name: "Eric Nicholis Goetz", division: "C", tournamentIndex: 14.9, day1CourseHcp: null },
  { name: "Espie espinosa", division: "C", tournamentIndex: 14.3, day1CourseHcp: null },
  { name: "EXEQUIEL P. LONGARES", division: "C", tournamentIndex: 12.7, day1CourseHcp: null },
  { name: "Gen Bonnevie", division: "C", tournamentIndex: 12.1, day1CourseHcp: null },
  { name: "Gunal Kanna Moorthy Kannan", division: "C", tournamentIndex: 14.7, day1CourseHcp: null },
  { name: "Jeter Clerigo", division: "C", tournamentIndex: 12.6, day1CourseHcp: null },
  { name: "Jing Barretto", division: "C", tournamentIndex: 13.5, day1CourseHcp: null },
  { name: "Joel Respeto", division: "C", tournamentIndex: 10.7, day1CourseHcp: null },
  { name: "JOHN VICAR VALDEZ", division: "C", tournamentIndex: 11.0, day1CourseHcp: null },
  { name: "Jose Panganiban, Jr", division: "C", tournamentIndex: 14.5, day1CourseHcp: null },
  { name: "Juan Francisco V. Estevez Jr", division: "C", tournamentIndex: 12.4, day1CourseHcp: null },
  { name: "Kristian Herrera", division: "C", tournamentIndex: 12.1, day1CourseHcp: null },
  { name: "Malvin James Ching", division: "C", tournamentIndex: 12.9, day1CourseHcp: null },
  { name: "Natasha Martina Bantug", division: "C", tournamentIndex: 11.4, day1CourseHcp: null },
  { name: "Raymond dabao", division: "C", tournamentIndex: 11.1, day1CourseHcp: null },
  { name: "Rodel T. Paderayon", division: "C", tournamentIndex: 15.1, day1CourseHcp: null },
  { name: "Rogelio Ramirez", division: "C", tournamentIndex: 11.9, day1CourseHcp: null },
  { name: "Rosven Lasac", division: "C", tournamentIndex: 14.5, day1CourseHcp: null },
  { name: "Shaminder Singh Rahil", division: "C", tournamentIndex: 14.7, day1CourseHcp: null },
  { name: "Tomas L Olfato", division: "C", tournamentIndex: 13.8, day1CourseHcp: null },
  { name: "Vic Roel Ferrer", division: "C", tournamentIndex: 13.2, day1CourseHcp: null },
  { name: "Victor Vital", division: "C", tournamentIndex: 11.8, day1CourseHcp: null },
  { name: "Victoria Faurens", division: "C", tournamentIndex: 14.9, day1CourseHcp: null },
  { name: "Abbhi Akshaya", division: "D", tournamentIndex: 17.8, day1CourseHcp: null },
  { name: "Amor Laguilles", division: "D", tournamentIndex: 15.8, day1CourseHcp: null },
  { name: "Andrew Tan", division: "D", tournamentIndex: 15.5, day1CourseHcp: null },
  { name: "Ariel Araja", division: "D", tournamentIndex: 16.0, day1CourseHcp: null },
  { name: "Arnel Marasigan S.", division: "D", tournamentIndex: 16.5, day1CourseHcp: null },
  { name: "Augusto Anthony Buendia Jr.", division: "D", tournamentIndex: 15.8, day1CourseHcp: null },
  { name: "Domingo Mestiola", division: "D", tournamentIndex: 17.4, day1CourseHcp: null },
  { name: "generoso “gene” ponio", division: "D", tournamentIndex: 16.7, day1CourseHcp: null },
  { name: "Glenda aguto", division: "D", tournamentIndex: 16.1, day1CourseHcp: null },
  { name: "Hannah Bella Lazaro", division: "D", tournamentIndex: 19.4, day1CourseHcp: null },
  { name: "Hoang Minh Duc", division: "D", tournamentIndex: 17.0, day1CourseHcp: null },
  { name: "Janiree Dacles", division: "D", tournamentIndex: 19.1, day1CourseHcp: null },
  { name: "Jasmine Velu", division: "D", tournamentIndex: 19.0, day1CourseHcp: null },
  { name: "Jay Dizon", division: "D", tournamentIndex: 20.3, day1CourseHcp: null },
  { name: "Joan Arangote", division: "D", tournamentIndex: 18.6, day1CourseHcp: null },
  { name: "JOSEPH BARNIE (BANG) GUMALO", division: "D", tournamentIndex: 18.0, day1CourseHcp: null },
  { name: "Kimberly Duenas", division: "D", tournamentIndex: 17.5, day1CourseHcp: null },
  { name: "Marilyn L. Del Rosario", division: "D", tournamentIndex: 18.3, day1CourseHcp: null },
  { name: "Mary Carlene Navarro", division: "D", tournamentIndex: 19.2, day1CourseHcp: null },
  { name: "Meynard Gelindon", division: "D", tournamentIndex: 17.0, day1CourseHcp: null },
  { name: "NELSON CHAN", division: "D", tournamentIndex: 16.0, day1CourseHcp: null },
  { name: "Nicole Jennice Aguilar", division: "D", tournamentIndex: 17.4, day1CourseHcp: null },
  { name: "Patricia Valencia", division: "D", tournamentIndex: 15.5, day1CourseHcp: null },
  { name: "Peter Nacion", division: "D", tournamentIndex: 17.2, day1CourseHcp: null },
  { name: "Raffy Tamayo", division: "D", tournamentIndex: 17.0, day1CourseHcp: null },
  { name: "Rainier Sison", division: "D", tournamentIndex: 16.8, day1CourseHcp: null },
  { name: "RICHARD DALILIS", division: "D", tournamentIndex: 16.2, day1CourseHcp: null },
  { name: "Roy Amurao", division: "D", tournamentIndex: 17.8, day1CourseHcp: null },
  { name: "Ruben Javier A.", division: "D", tournamentIndex: 20.2, day1CourseHcp: null },
  { name: "VIRGILIO CADANG", division: "D", tournamentIndex: 18.1, day1CourseHcp: null },
  { name: "Virgilio R. Villaescusa", division: "D", tournamentIndex: 17.4, day1CourseHcp: null },
  { name: "Xavier Faurens", division: "D", tournamentIndex: 15.5, day1CourseHcp: null },
  { name: "Yi Lwin", division: "D", tournamentIndex: 18.0, day1CourseHcp: null },
  { name: "Agnes Priest", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Allen Macaraig", division: "E", tournamentIndex: 22.0, day1CourseHcp: null },
  { name: "Amy Lauron", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Bogki Min", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "CEDRIC MARK URERA", division: "E", tournamentIndex: 23.5, day1CourseHcp: null },
  { name: "Charito Lauron", division: "E", tournamentIndex: 25.5, day1CourseHcp: null },
  { name: "Dennis Chavez Atienza", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Jan Kero Batallones", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Janelle Lim-Kanna", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Jayrold E. Bautista", division: "E", tournamentIndex: 22.3, day1CourseHcp: null },
  { name: "Jenny Vi M.Paderayon", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Jericho Fullante", division: "E", tournamentIndex: 23.5, day1CourseHcp: null },
  { name: "Johan wahlen pangilinan", division: "E", tournamentIndex: 23.6, day1CourseHcp: null },
  { name: "Joseph Reylan Reyes", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Jt Trinidad", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Lorenzo A Javier", division: "E", tournamentIndex: 22.2, day1CourseHcp: null },
  { name: "Lwin Min Paing", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Manolo Besa", division: "E", tournamentIndex: 23.1, day1CourseHcp: null },
  { name: "Maria Barbara Kathleen L. Evangelista (Lynne)", division: "E", tournamentIndex: 24.5, day1CourseHcp: null },
  { name: "Maritess Uy", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Melvin Alit Gialolo", division: "E", tournamentIndex: 24.4, day1CourseHcp: null },
  { name: "Oliver Dela Cruz", division: "E", tournamentIndex: 22.3, day1CourseHcp: null },
  { name: "Oliver James Matias", division: "E", tournamentIndex: 20.8, day1CourseHcp: null },
  { name: "Owen Ajero Rosal", division: "E", tournamentIndex: 23.6, day1CourseHcp: null },
  { name: "Pearl Grace Rodrigo Agdeppa", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Philip Martin Esteban", division: "E", tournamentIndex: 21.0, day1CourseHcp: null },
  { name: "Ricardo Carpio III", division: "E", tournamentIndex: 22.7, day1CourseHcp: null },
  { name: "Roberto Cruz Lazaro", division: "E", tournamentIndex: 21.9, day1CourseHcp: null },
  { name: "Ronald Rezani", division: "E", tournamentIndex: 21.5, day1CourseHcp: null },
  { name: "Rowena Victorino", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Rustico Ramirez", division: "E", tournamentIndex: 24.0, day1CourseHcp: null },
  { name: "Sherwin Gregorio Uy", division: "E", tournamentIndex: 25.4, day1CourseHcp: null },
  { name: "Shiela Teoxon", division: "E", tournamentIndex: 23.3, day1CourseHcp: null },
  { name: "Alan Algodon", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "AMADO CONCEPCION JR.", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "Angela Mae Divino", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "Arnold John Mesias", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "Divina Lapasaran", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "Erisa Joyce D. Min", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "Ian Lopez", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "Jaybee Pasayan", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "Jefferson G Robles", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "Julius Michael Lachica", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "MARJORIE JALOSJOS", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "Marlo dela peña", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "Patricia Claire Botardo", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "TOSHIKI KOYAMA", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
  { name: "Vanessa grace Saring", division: "PENDING", tournamentIndex: null, day1CourseHcp: null },
];
