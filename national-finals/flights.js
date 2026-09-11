/* ==========================================================================
   NATIONAL FINALS — DAY 1 FLIGHT SCHEDULE (PRODUCTION)
   --------------------------------------------------------------------------
   Official Day 1 flight pairings, published live. See config.js's
   day1FlightsPublished flag.

   Course rotation:
     DAY 1 — Divisions A/B/C: Arnold Palmer Course | Divisions D/E: Graham Marsh Course
     DAY 2 — Divisions A/B/C: Graham Marsh Course  | Divisions D/E: Arnold Palmer Course

   courseHcp below is the player's official Day 1 Course HCP (Players tab,
   column K) — taken as-is, never recalculated. null renders as "—"; a
   real 0 or negative value renders as-is.

   DAY 2 FLIGHT PAIRINGS — official, from the "2026 WAGC NF Scoring" sheet,
   "Day 2 Flight Pairings" tab. Championship flights (each division's Day 1
   positions 1-4) are the LAST flight for that division/course, so the
   division winner stays undecided until the final group finishes.

   Day 2 courseHcp is the player's official "R2 Course Handicap" from the
   Handicap Adjustment tab — taken as-is, never recalculated. null renders
   as "—". Jasmine Velu's R2 Course Handicap is unresolved upstream (her
   Day 1 Net of 58 falls below the published adjustment table's start of
   59-60); her courseHcp is left null/omitted here rather than guessed —
   do not invent or backfill it.
   ========================================================================== */
(function () {
  "use strict";

  var COURSE = {
    AP: "Arnold Palmer Course",
    GM: "Graham Marsh Course"
  };

  function flight(courseCode, num, teeTime, players) {
    return {
      id: "D1-" + courseCode + "-" + String(num).padStart(2, "0"),
      course: COURSE[courseCode],
      courseCode: courseCode,
      teeTime: teeTime,
      startingHole: 1,
      players: players
    };
  }

  function flight2(courseCode, num, teeTime, startingHole, players) {
    return {
      id: "D2-" + courseCode + "-" + String(num).padStart(2, "0"),
      course: COURSE[courseCode],
      courseCode: courseCode,
      teeTime: teeTime,
      startingHole: startingHole,
      players: players
    };
  }

  /* courseHcp is the player's official Day 1 Course HCP (Players tab,
     column K) — taken as-is, never recalculated. null (omitted) renders
     as "—" in the UI. */
  function p(name, division, courseHcp) {
    return { name: name, division: division, courseHcp: courseHcp === undefined ? null : courseHcp };
  }

  var DAY1_FLIGHTS = [
    // ── ARNOLD PALMER COURSE ── Divisions A / B / C ──
    flight("AP", 1, "7:00 AM", [p("Alvie G. Barrios", "C", 8), p("Evangeline Bradley", "C", 8), p("Aung Kyaw Oo", "C", 17), p("Joel Respeto", "C", 10)]),
    flight("AP", 2, "7:09 AM", [p("Natasha Martina Bantug", "C", 6), p("Victoria Terry", "C", 10), p("Eric Nicholis Goetz", "C", 15), p("Oliver T. Asna", "C", 11)]),
    flight("AP", 3, "7:18 AM", [p("Albert Lasac", "C", 14), p("Aurelio Marasigan S.", "C", 10), p("Gunal Kanna Moorthy Kannan", "C", 15), p("Raymond Dabao", "C", 11)]),
    flight("AP", 4, "7:27 AM", [p("Alvin Hipolito", "C", 14), p("Audi Noel Capellan", "C", 11), p("Shaminder Singh Rahil", "C", 15), p("John Vicar Valdez", "C", 10)]),
    flight("AP", 5, "7:36 AM", [p("Benjamin Diaz Jr", "C", 14), p("Edmundo Barrios", "C", 12), p("Malvin James Ching", "C", 13), p("Rogelio Ramirez", "C", 11)]),
    flight("AP", 6, "7:45 AM", [p("Duke Ng", "C", 14), p("Efren Ian Alvez", "C", 12), p("Joshua Reynes", "C", 13), p("Raymond Palomares", "C", 11)]),
    flight("AP", 7, "7:54 AM", [p("Edilberto Esguerra", "C", 14), p("Exequiel P. Longares", "C", 12), p("Jing Barretto", "C", 13), p("Renan Vincent Gustilo", "C", 11)]),
    flight("AP", 8, "8:03 AM", [p("Gen Bonnevie", "C", 12), p("Jose Panganiban, Jr", "C", 14), p("Marceliano V. Teofilo", "C", 13), p("Vic Roel Ferrer", "C", 13)]),
    flight("AP", 9, "8:12 AM", [p("Jefferson G Robles", "C", 12), p("Tomas L Olfato", "C", 14), p("Rwin Pagkalinawan", "C", 13), p("LEONIDES MARFA PARAGSA", "C", 12)]),
    flight("AP", 10, "8:21 AM", [p("Jeter Clerigo", "C", 12), p("Kristian Herrera", "C", 12), p("Rosven Lasac", "C", 14)]),
    flight("AP", 11, "8:30 AM", [p("Espie Espinosa", "C", 9), p("Ma Victoria Herrera", "B", 3), p("Htein Lin Aung", "B", 12), p("Lyndon Theodore D Pamintuan", "B", 4)]),
    flight("AP", 12, "8:39 AM", [p("Paolo Obaniana", "B", 10), p("Eugene Unabia", "B", 6), p("Jaybee Pasayan", "B", 8), p("Andrew Tan", "B", 7)]),
    flight("AP", 13, "8:48 AM", [p("Richard Lao", "B", 8), p("Leo Gerald De Castro", "B", 6), p("Kevin Andre Montealto", "B", 8), p("Elvin Panliboton", "B", 7)]),
    flight("AP", 14, "8:57 AM", [p("Clover Arangote", "B", 9), p("Neil Ruelan", "B", 6), p("Milbert Oliveros", "B", 8), p("Mohd Yussof B Ishak", "B", 7)]),
    flight("AP", 15, "9:06 AM", [p("Aaron Arvin Sorbito", "B", 8), p("Romeo Lopez", "B", 6), p("Raymond Monterde Lazaro", "B", 8), p("Wendell Lucido", "B", 7)]),
    flight("AP", 16, "9:15 AM", [p("Greg Reyes", "B", 9), p("Mark Stephen Villegas", "B", 8), p("Roberto A. Umali", "B", 10)]),
    flight("AP", 17, "9:24 AM", [p("Victor Vital", "B", 10), p("Jonathan Simon", "B", 8), p("Ronald Andal", "A", 4)]),
    flight("AP", 18, "9:33 AM", [p("Ian Davin Rosales", "A", 0), p("Gerardo De Chavez", "A", 4), p("Randy Sulpico Someros", "A", 3), p("Richard (Ricky) Delos Santos", "A", 4)]),
    flight("AP", 19, "9:42 AM", [p("Raymund James Lachica", "A", 2), p("John Paul Gutierrez", "A", 4), p("Miguel Lucas Barretto", "A", 4), p("Philip Ouano", "A", 4)]),

    // ── GRAHAM MARSH COURSE ── Divisions D / E ──
    flight("GM", 1, "7:00 AM", [p("Agnes Priest", "E", 25), p("Divina Lapasaran", "E", 22), p("Daniel De Gala", "E", 20), p("Dennis Chavez Atienza", "E", 26)]),
    flight("GM", 2, "7:09 AM", [p("Aiza Lipit", "E", 25), p("Erisa Joyce D. Min", "E", 21), p("Joseph Reylan Reyes", "E", 26), p("Oliver Balita", "E", 21)]),
    flight("GM", 3, "7:18 AM", [p("Erica Esteves", "E", 25), p("Maria Barbara Kathleen L. Evangelista (Lynne)", "E", 24), p("Amy Lauron", "E", 26), p("Allen Macaraig", "E", 22)]),
    flight("GM", 4, "7:27 AM", [p("Janelle Lim-Kanna", "E", 25), p("Marjorie Jalosjos", "E", 22), p("Jt Trinidad", "E", 26), p("Cedric Mark Urera", "E", 23)]),
    flight("GM", 5, "7:36 AM", [p("Jennyson Macaraig", "E", 25), p("Shiela Teoxon", "E", 23), p("Bogki Min", "E", 26), p("Manolo Besa", "E", 23)]),
    flight("GM", 6, "7:45 AM", [p("Maritess Uy", "E", 25), p("Pearl Grace Rodrigo Agdeppa", "E", 25), p("Jayrold E. Bautista", "E", 22), p("Sherwin Gregorio Uy", "E", 26)]),
    flight("GM", 7, "7:54 AM", [p("Miela Gian Marquez", "E", 25), p("Rowena Victorino", "E", 25), p("Jan Kero Batallones", "E", 26), p("Philip Martin Esteban", "E", 21)]),
    flight("GM", 8, "8:03 AM", [p("Rosette Maureen C. Reyes", "E", 25), p("Charito Lauron", "E", 26), p("Julius Michael Lachica", "E", 22), p("Johan Wahlen Pangilinan", "E", 24)]),
    flight("GM", 9, "8:12 AM", [p("Lwin Min Paing", "E", 26), p("Jericho Fullante", "E", 23), p("Lorenzo A Javier", "E", 22), p("Melvin Alit Gialolo", "E", 24)]),
    flight("GM", 10, "8:21 AM", [p("Amado Concepcion Jr.", "E", 24), p("Ricardo Carpio III", "E", 23), p("Roberto Cruz Lazaro", "E", 22), p("Rustico Ramirez", "E", 24)]),
    flight("GM", 11, "8:30 AM", [p("Owen Ajero Rosal", "E", 24), p("Ronald Rezani", "E", 21), p("Toshiki Koyama", "E", 23)]),
    flight("GM", 12, "8:39 AM", [p("Glenda Aguto", "D", 15), p("Hannah Bella Lazaro", "D", 19), p("Jay Dizon", "D", 20), p("Xavier Faurens", "D", 14)]),
    flight("GM", 13, "8:48 AM", [p("Dolly De Gala", "D", 16), p("Angela Mae 'Divino' Susi", "D", 18), p("Marlo Dela Peña", "D", 19), p("Amor Laguilles", "D", 15)]),
    flight("GM", 14, "8:57 AM", [p("Janiree Dacles", "D", 19), p("Kimberly Duenas", "D", 17), p("Ariel Araja", "D", 15), p("Arnel Marasigan S.", "D", 16)]),
    flight("GM", 15, "9:06 AM", [p("Jasmine Velu", "D", 18), p("Patricia Valencia", "D", 15), p("Victor Frias", "D", 19), p("Oliver James Matias", "D", 20)]),
    flight("GM", 16, "9:15 AM", [p("Joan Arangote", "D", 18), p("Ruth Castro", "D", 20), p("Augusto Anthony Buendia Jr.", "D", 15), p("Neil Darrell Sanchez", "D", 18)]),
    flight("GM", 17, "9:24 AM", [p("Marilyn L. Del Rosario", "D", 18), p("Mary Carlene Navarro", "D", 19), p("Nelson Chan", "D", 15), p("Ruben Javier A.", "D", 20)]),
    flight("GM", 18, "9:33 AM", [p("Michelle Dabao", "D", 16), p("Patricia Claire Botardo", "D", 19), p("Jerome Chua", "D", 15), p("Alan Algodon", "D", 20)]),
    flight("GM", 19, "9:42 AM", [p("Nicole Jennice Aguilar", "D", 17), p("Vanessa Grace Saring", "D", 20), p("Raffy Tamayo", "D", 16), p("Cesar Areza", "D", 17)]),
    flight("GM", 20, "9:51 AM", [p("Abbhi Akshaya", "D", 17), p("Generoso “Gene” Ponio", "D", 16), p("Arnold John Mesias", "D", 18), p("Richard Dalilis", "D", 15)]),
    flight("GM", 21, "10:00 AM", [p("Domingo Mestiola", "D", 17), p("Justin Bilbao", "D", 16), p("Roy Amurao", "D", 17), p("Hoang Minh Duc", "D", 16)]),
    flight("GM", 22, "10:09 AM", [p("Joseph Barnie (Bang) Gumalo", "D", 17), p("Rainier Sison", "D", 16), p("Virgilio Cadang", "D", 17)]),
    flight("GM", 23, "10:18 AM", [p("Virgilio R. Villaescusa", "D", 17), p("Yi Lwin", "D", 17), p("Peter Nacion", "D", 16)])
  ];

  var DAY2_FLIGHTS = [
    // ── GRAHAM MARSH COURSE ── Divisions A / B / C ──
    flight2("GM", 1, "7:00 AM", 1, [p("Alvie G. Barrios", "C", 13), p("Evangeline Bradley", "C", 13), p("Aung Kyaw Oo", "C", 19), p("Oliver T. Asna", "C", 11)]),
    flight2("GM", 2, "7:00 AM", 10, [p("Andrew Tan", "B", 9), p("Htein Lin Aung", "B", 11), p("Milbert Oliveros", "B", 9), p("Victor Vital", "B", 12)]),
    flight2("GM", 3, "7:09 AM", 1, [p("Natasha Martina Bantug", "C", 14), p("Albert Lasac", "C", 15), p("Duke Ng", "C", 14), p("John Vicar Valdez", "C", 12)]),
    flight2("GM", 4, "7:09 AM", 10, [p("Clover Arangote", "B", 11), p("Eugene Unabia", "B", 8), p("Mark Stephen Villegas", "B", 10), p("Roberto A. Umali", "B", 11)]),
    flight2("GM", 5, "7:18 AM", 1, [p("Albert Teoxon", "C", 13), p("Benjamin Diaz Jr", "C", 16), p("Eric Nicholis Goetz", "C", 17), p("Raymond Dabao", "C", 11)]),
    flight2("GM", 6, "7:18 AM", 10, [p("Elvin Panliboton", "B", 9), p("Jaybee Pasayan", "B", 10), p("Mohd Yussof B Ishak", "B", 6), p("Wendell Lucido", "B", 8)]),
    flight2("GM", 7, "7:27 AM", 1, [p("Alvin Hipolito", "C", 13), p("Edmundo Barrios", "C", 13), p("Exequiel P. Longares", "C", 14), p("LEONIDES MARFA PARAGSA", "C", 14)]),
    flight2("GM", 8, "7:27 AM", 10, [p("Kevin Andre Montealto", "B", 9), p("Raymond Monterde Lazaro", "B", 9), p("Richard Lao", "B", 10)]),
    flight2("GM", 9, "7:36 AM", 1, [p("Aurelio Marasigan S.", "C", 12), p("Efren Ian Alvez", "C", 13), p("Gen Bonnevie", "C", 14), p("Rosven Lasac", "C", 15)]),
    flight2("GM", 10, "7:36 AM", 10, [p("Espie Espinosa", "C", 17), p("Gunal Kanna Moorthy Kannan", "C", 16), p("Jeter Clerigo", "C", 14), p("Tomas L Olfato", "C", 15)]),
    flight2("GM", 11, "7:45 AM", 1, [p("Jefferson G Robles", "C", 14), p("Joel Respeto", "C", 12), p("Malvin James Ching", "C", 15), p("Vic Roel Ferrer", "C", 13)]),
    flight2("GM", 12, "7:45 AM", 10, [p("Jose Panganiban, Jr", "C", 13), p("Marceliano V. Teofilo", "C", 13), p("Miguel Lucas Barretto", "A", 6)]),
    flight2("GM", 13, "7:54 AM", 1, [p("Kristian Herrera", "C", 12), p("Rodel T. Paderayon", "C", 14), p("Shaminder Singh Rahil", "C", 16)]),
    // --- CHAMPIONSHIP BLOCK ---
    flight2("GM", 14, "8:03 AM", 1, [p("Edilberto Esguerra", "C", 13), p("Joshua Reynes", "C", 12), p("Raymond Palomares", "C", 10), p("Audi Noel Capellan", "C", 10)]),
    flight2("GM", 15, "8:12 AM", 1, [p("Rogelio Ramirez", "C", 10), p("Renan Vincent Gustilo", "C", 10), p("Rwin Pagkalinawan", "C", 12), p("Jing Barretto", "C", 12)]),
    flight2("GM", 16, "8:21 AM", 1, [p("Ma Victoria Herrera", "B", 7), p("Neil Ruelan", "B", 6), p("Paolo Obaniana", "B", 10), p("Lyndon Theodore D Pamintuan", "B", 5)]),
    flight2("GM", 17, "8:30 AM", 1, [p("Aaron Arvin Sorbito", "B", 7), p("Romeo Lopez", "B", 5), p("Greg Reyes", "B", 8), p("Leo Gerald De Castro", "B", 5)]),
    flight2("GM", 18, "8:39 AM", 1, [p("Ian Davin Rosales", "A", 1), p("Philip Ouano", "A", 5), p("Raymund James Lachica", "A", 4), p("Ronald Andal", "A", 6)]),
    flight2("GM", 19, "8:48 AM", 1, [p("Richard (Ricky) Delos Santos", "A", 0), p("Randy Sulpico Someros", "A", 2), p("Gerardo De Chavez", "A", 4), p("John Paul Gutierrez", "A", 5)]),

    // ── ARNOLD PALMER COURSE ── Divisions D / E ──
    flight2("AP", 1, "7:00 AM", 1, [p("Agnes Priest", "E", 21), p("Jenny Vi M. Paderayon", "E", 21), p("Amado Concepcion Jr.", "E", 28), p("Johan Wahlen Pangilinan", "E", 25)]),
    flight2("AP", 2, "7:00 AM", 10, [p("Angela Mae 'Divino' Susi", "D", 14), p("Michelle Dabao", "D", 13), p("Abbhi Akshaya", "D", 18), p("Roy Amurao", "D", 16)]),
    flight2("AP", 3, "7:09 AM", 1, [p("Aiza Lipit", "E", 20), p("Maria Barbara Kathleen L. Evangelista (Lynne)", "E", 19), p("Bogki Min", "E", 26), p("Joseph Reylan Reyes", "E", 27)]),
    flight2("AP", 4, "7:09 AM", 10, [p("Dolly De Gala", "D", 11), p("Nicole Jennice Aguilar", "D", 15), p("Alan Algodon", "D", 21), p("Joseph Barnie (Bang) Gumalo", "D", 19)]),
    flight2("AP", 5, "7:18 AM", 1, [p("Divina Lapasaran", "E", 18), p("Maritess Uy", "E", 23), p("Cedric Mark Urera", "E", 24), p("Lwin Min Paing", "E", 27)]),
    flight2("AP", 6, "7:18 AM", 10, [p("Glenda Aguto", "D", 13), p("Patricia Claire Botardo", "D", 18), p("Amor Laguilles", "D", 18), p("Oliver James Matias", "D", 19)]),
    flight2("AP", 7, "7:27 AM", 1, [p("Erica Esteves", "E", 20), p("Marjorie Jalosjos", "E", 21), p("Daniel De Gala", "E", 22), p("Melvin Alit Gialolo", "E", 26)]),
    flight2("AP", 8, "7:27 AM", 10, [p("Janiree Dacles", "D", 14), p("Patricia Valencia", "D", 11), p("Ariel Araja", "D", 15), p("Generoso “Gene” Ponio", "D", 15)]),
    flight2("AP", 9, "7:36 AM", 1, [p("Erisa Joyce D. Min", "E", 20), p("Miela Gian Marquez", "E", 24), p("Jayrold E. Bautista", "E", 25), p("Owen Ajero Rosal", "E", 26)]),
    flight2("AP", 10, "7:36 AM", 10, [p("Joan Arangote", "D", 15), p("Ruth Castro", "D", 14), p("Arnel Marasigan S.", "D", 16), p("Rainier Sison", "D", 17)]),
    flight2("AP", 11, "7:45 AM", 1, [p("Janelle Lim-Kanna", "E", 22), p("Pearl Grace Rodrigo Agdeppa", "E", 21), p("Jt Trinidad", "E", 29), p("Philip Martin Esteban", "E", 22)]),
    flight2("AP", 12, "7:45 AM", 10, [p("Kimberly Duenas", "D", 14), p("Mary Carlene Navarro", "D", 17), p("Cesar Areza", "D", 19), p("Peter Nacion", "D", 15)]),
    flight2("AP", 13, "7:54 AM", 1, [p("Jennyson Macaraig", "E", 20), p("Rosette Maureen C. Reyes", "E", 24), p("Charito Lauron", "E", 27), p("Ricardo Carpio III", "E", 25)]),
    flight2("AP", 14, "7:54 AM", 10, [p("Domingo Mestiola", "D", 20), p("Jerome Chua", "D", 18), p("Nelson Chan", "D", 16), p("Virgilio R. Villaescusa", "D", 16)]),
    flight2("AP", 15, "8:03 AM", 1, [p("Rowena Victorino", "E", 24), p("Shiela Teoxon", "E", 18), p("Amy Lauron", "E", 27), p("Ronald Rezani", "E", 25)]),
    flight2("AP", 16, "8:03 AM", 10, [p("Hoang Minh Duc", "D", 17), p("Marlo Dela Peña", "D", 22), p("Victor Frias", "D", 20)]),
    flight2("AP", 17, "8:12 AM", 1, [p("Julius Michael Lachica", "E", 24), p("Rustico Ramirez", "E", 24), p("Sherwin Gregorio Uy", "E", 27), p("Toshiki Koyama", "E", 27)]),
    flight2("AP", 18, "8:12 AM", 10, [p("Jay Dizon", "D", 21), p("Neil Darrell Sanchez", "D", 19), p("Yi Lwin", "D", 20)]),
    flight2("AP", 19, "8:21 AM", 1, [p("Justin Bilbao", "D", 18), p("Ruben Javier A.", "D", 21), p("Virgilio Cadang", "D", 18)]),
    // --- CHAMPIONSHIP BLOCK ---
    flight2("AP", 20, "8:30 AM", 1, [p("Roberto Cruz Lazaro", "E", 20), p("Lorenzo A Javier", "E", 21), p("Jan Kero Batallones", "E", 25), p("Dennis Chavez Atienza", "E", 25)]),
    flight2("AP", 21, "8:39 AM", 1, [p("Manolo Besa", "E", 18), p("Oliver Balita", "E", 18), p("Allen Macaraig", "E", 19), p("Jericho Fullante", "E", 21)]),
    flight2("AP", 22, "8:48 AM", 1, [p("Hannah Bella Lazaro", "D", 12), p("Raffy Tamayo", "D", 15), p("Richard Dalilis", "D", 14), p("Augusto Anthony Buendia Jr.", "D", 14)]),
    flight2("AP", 23, "8:57 AM", 1, [p("Jasmine Velu", "D"), p("Marilyn L. Del Rosario", "D", 9), p("Arnold John Mesias", "D", 15), p("Vanessa Grace Saring", "D", 12)])
  ];

  window.NF_FLIGHTS = {
    day1: DAY1_FLIGHTS,
    day2: DAY2_FLIGHTS
  };

  window.NF_COURSE_ROTATION = {
    day1: [
      { divisions: "A / B / C", course: COURSE.AP },
      { divisions: "D / E", course: COURSE.GM }
    ],
    day2: [
      { divisions: "A / B / C", course: COURSE.GM },
      { divisions: "D / E", course: COURSE.AP }
    ]
  };
})();
