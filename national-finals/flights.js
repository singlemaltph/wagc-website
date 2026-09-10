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

   DAY 2 IS INTENTIONALLY EMPTY until the real Day 2 pairing generator
   (ranking-based, championship-flight-last) is built and Day 1 has
   actually finished and been verified. See config.js's
   day2FlightsPublished flag, which must remain false until then.

   Real Day 2 pairing rule (for when that generator is built):
     - Pair players within their division according to Day 1 ranking.
     - The leading players tee off later — the championship flight
       (positions 1-4) MUST be the LAST flight for that division, so the
       division winner stays undecided until the final group finishes.
     - Per division, working backward from the last flight:
         LAST / CHAMPIONSHIP flight = Day 1 positions 1-4
         second-to-last             = positions 5-8
         third-to-last              = positions 9-12
         ...continue backward through the standings
     - NON-DIVISIBLE counts: protect the championship end of the sequence.
       Do NOT break apart positions 1-4 — let an earlier/lower-ranked
       flight carry fewer than 4 players instead.
     - This competitive-ranking rule takes PRIORITY over any pairing
       preference — never move a top-4 player out of the championship
       flight to satisfy another preference. Do not infer gender from
       player names.
   Do not guess or publish real Day 2 pairings before that generator is
   built and Day 1 has actually finished and been verified.
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
    flight("GM", 14, "8:57 AM", [p("Janiree Dacles", "D", 19), p("Kimberly Duenas", "D", 17), p("Ariel Araja", "D", 15), p("Oliver James Matias", "D", 20)]),
    flight("GM", 15, "9:06 AM", [p("Jasmine Velu", "D", 18), p("Patricia Valencia", "D", 15), p("Victor Frias", "D", 19), p("Arnel Marasigan S.", "D", 16)]),
    flight("GM", 16, "9:15 AM", [p("Joan Arangote", "D", 18), p("Ruth Castro", "D", 20), p("Augusto Anthony Buendia Jr.", "D", 15), p("Neil Darrell Sanchez", "D", 18)]),
    flight("GM", 17, "9:24 AM", [p("Marilyn L. Del Rosario", "D", 18), p("Mary Carlene Navarro", "D", 19), p("Nelson Chan", "D", 15), p("Ruben Javier A.", "D", 20)]),
    flight("GM", 18, "9:33 AM", [p("Michelle Dabao", "D", 16), p("Patricia Claire Botardo", "D", 19), p("Jerome Chua", "D", 15), p("Alan Algodon", "D", 20)]),
    flight("GM", 19, "9:42 AM", [p("Nicole Jennice Aguilar", "D", 17), p("Vanessa Grace Saring", "D", 20), p("Raffy Tamayo", "D", 16), p("Cesar Areza", "D", 17)]),
    flight("GM", 20, "9:51 AM", [p("Abbhi Akshaya", "D", 17), p("Generoso “Gene” Ponio", "D", 16), p("Arnold John Mesias", "D", 18), p("Richard Dalilis", "D", 15)]),
    flight("GM", 21, "10:00 AM", [p("Domingo Mestiola", "D", 17), p("Justin Bilbao", "D", 16), p("Roy Amurao", "D", 17), p("Hoang Minh Duc", "D", 16)]),
    flight("GM", 22, "10:09 AM", [p("Joseph Barnie (Bang) Gumalo", "D", 17), p("Rainier Sison", "D", 16), p("Virgilio Cadang", "D", 17)]),
    flight("GM", 23, "10:18 AM", [p("Virgilio R. Villaescusa", "D", 17), p("Yi Lwin", "D", 17), p("Peter Nacion", "D", 16)])
  ];

  window.NF_FLIGHTS = {
    day1: DAY1_FLIGHTS,
    day2: []
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
