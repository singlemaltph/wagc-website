/* ==========================================================================
   NATIONAL FINALS — DAY 1 FLIGHT SCHEDULE (TEST PAGE ONLY)
   --------------------------------------------------------------------------
   VERIFIED DAY 1 PAIRINGS — for internal review on the results-test page.
   Not published to production; see config.js's day1FlightsPublished flag
   and national-finals/config.js (production remains unpublished).

   Course rotation:
     DAY 1 — Divisions A/B/C: Arnold Palmer Course | Divisions D/E: Graham Marsh Course
     DAY 2 — Divisions A/B/C: Graham Marsh Course  | Divisions D/E: Arnold Palmer Course

   courseHcp below is the player's official Day 1 Course HCP (Players tab,
   column K) — taken as-is, never recalculated. null renders as "—"; a
   real 0 or negative value renders as-is.

   DAY 2 IS INTENTIONALLY EMPTY. The previous version of this file
   auto-generated a fake Day 2 by swapping courses on the Day 1 pairings.
   That approach must not be used with real Day 1 player data — a
   derived-from-real-players fake Day 2 schedule must not sit in the
   public repository. window.NF_FLIGHTS.day2 stays [] until the real Day 2
   pairing generator (ranking-based, championship-flight-last) is built and
   Day 1 has actually finished and been verified. See config.js's
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
    flight("AP", 1, "7:00 AM", [p("Alvie G. Barrios", "C", 8), p("Marjorie Jalosjos", "C", 8), p("Rosven Lasac", "C", 14), p("Joel Respeto", "C", 10)]),
    flight("AP", 2, "7:09 AM", [p("Natasha Martina Bantug", "C", 6), p("Evangeline Bradley", "C", 8), p("LEONIDES MARFA PARAGSA", "C", 12), p("Audi Noel Capellan", "C", 11)]),
    flight("AP", 3, "7:18 AM", [p("Victoria Faurens", "C", 10), p("Aung Kyaw Oo", "C", 10), p("Raymond Dabao", "C", 11), p("Gunal Kanna Moorthy Kannan", "C", 15)]),
    flight("AP", 4, "7:27 AM", [p("Rogelio Ramirez", "C", 11), p("Rwin Pagkalinawan", "C", 13), p("Oliver T. Asna", "C", 11), p("Raymond Palomares", "C", 11)]),
    flight("AP", 5, "7:36 AM", [p("Jing Barretto", "C", 13), p("Alvin Hipolito", "C", 14), p("Edilberto Esguerra", "C", 14), p("Juan Francisco V. Estevez Jr", "C", 12)]),
    flight("AP", 6, "7:45 AM", [p("Rodel T. Paderayon", "C", 15), p("Jose Panganiban, Jr", "C", 14), p("Aurelio Marasigan S.", "C", 10), p("Efren Ian Alvez", "C", 12)]),
    flight("AP", 7, "7:54 AM", [p("Malvin James Ching", "C", 13), p("Albert Teoxon", "C", 14), p("John Vicar Valdez", "C", 10), p("Jefferson G Robles", "C", 12)]),
    flight("AP", 8, "8:03 AM", [p("Duke Ng", "C", 14), p("Renan Vincent Gustilo", "C", 11), p("Vic Roel Ferrer", "C", 13), p("Shaminder Singh Rahil", "C", 15)]),
    flight("AP", 9, "8:12 AM", [p("Eric Nicholis Goetz", "C", 15), p("Joshua Reynes", "C", 13), p("Kristian Herrera", "C", 12), p("Edmundo Barrios", "C", 12)]),
    flight("AP", 10, "8:21 AM", [p("Espie Espinosa", "C", 14), p("Benjamin Diaz Jr", "C", 14), p("Tomas L Olfato", "C", 14), p("Jeter Clerigo", "C", 12)]),
    flight("AP", 11, "8:30 AM", [p("Marceliano V. Teofilo", "C", 13), p("Gen Bonnevie", "C", 12), p("Albert Lasac", "C", 14), p("Exequiel P. Longares", "C", 12)]),
    flight("AP", 12, "8:39 AM", [p("Ma Victoria Herrera", "B", 3), p("Milbert Oliveros", "B", 8), p("Elvin Panliboton", "B", 7), p("Clover Arangote", "B", 9)]),
    flight("AP", 13, "8:48 AM", [p("Htein Lin Aung", "B", 9), p("Victor Vital", "B", 10), p("Lyndon Theodore D Pamintuan", "B", 4), p("Raymond Monterde Lazaro", "B", 8)]),
    flight("AP", 14, "8:57 AM", [p("Neil Ruelan", "B", 6), p("Greg Reyes", "B", 9), p("Romeo Lopez", "B", 6), p("Wendell Lucido", "B", 7)]),
    flight("AP", 15, "9:06 AM", [p("Mark Stephen Villegas", "B", 8), p("Mohd Yussof B Ishak", "B", 7), p("Jaybee Pasayan", "B", 8), p("Richard Lao", "B", 8)]),
    flight("AP", 16, "9:15 AM", [p("Roberto A. Umali", "B", 10), p("Eugene Unabia", "B", 6), p("Aaron Arvin Sorbito", "B", 8), p("Leo Gerald De Castro", "B", 6)]),
    flight("AP", 17, "9:24 AM", [p("Paolo Obaniana", "B", 10), p("Andrew Tan", "B", 7), p("Ronald Andal", "B", 9), p("Kevin Andre Montealto", "B", 8)]),
    flight("AP", 18, "9:33 AM", [p("Raymund James Lachica", "A", 2), p("Miguel Lucas Barretto", "A", 4), p("Ian Davin Rosales", "A", 0), p("Richard (Ricky) Delos Santos", "A", 4)]),
    flight("AP", 19, "9:42 AM", [p("Gerardo De Chavez", "A", 4), p("Randy Sulpico Someros", "A", 3), p("John Paul Gutierrez", "A", 4), p("Philip Ouano", "A", 4)]),

    // ── GRAHAM MARSH COURSE ── Divisions D / E ──
    flight("GM", 1, "7:00 AM", [p("Divina Lapasaran", "E", 22), p("Maria Barbara Kathleen L. Evangelista (Lynne)", "E", 24), p("Jt Trinidad", "E", 26), p("Joseph Reylan Reyes", "E", 26)]),
    flight("GM", 2, "7:09 AM", [p("Agnes Priest", "E", 25), p("Janelle Lim-Kanna", "E", 25), p("Dennis Chavez Atienza", "E", 26), p("Amado Concepcion Jr.", "E", 24)]),
    flight("GM", 3, "7:18 AM", [p("Jenny Vi M. Paderayon", "E", 25), p("Erica Esteves", "E", 25), p("Bogki Min", "E", 26), p("Philip Martin Esteban", "E", 21)]),
    flight("GM", 4, "7:27 AM", [p("Maritess Uy", "E", 25), p("Rosette Maureen C. Reyes", "E", 25), p("Amy Lauron", "E", 26), p("Lorenzo A Javier", "E", 22)]),
    flight("GM", 5, "7:36 AM", [p("Ricardo Carpio III", "E", 23), p("Oliver Balita", "E", 21), p("Manolo Besa", "E", 23), p("Daniel De Gala", "E", 20)]),
    flight("GM", 6, "7:45 AM", [p("Pearl Grace Rodrigo Agdeppa", "E", 25), p("Miela Gian Marquez", "E", 25), p("Charito Lauron", "E", 26), p("Toshiki Koyama", "E", 23)]),
    flight("GM", 7, "7:54 AM", [p("Erisa Joyce D. Min", "E", 21), p("Rowena Victorino", "E", 25), p("Jericho Fullante", "E", 23), p("Jayrold E. Bautista", "E", 22)]),
    flight("GM", 8, "8:03 AM", [p("Jennyson Macaraig", "E", 25), p("Aiza Lipit", "E", 25), p("Jan Kero Batallones", "E", 26), p("Julius Michael Lachica", "E", 22)]),
    flight("GM", 9, "8:12 AM", [p("Lwin Min Paing", "E", 26), p("Melvin Alit Gialolo", "E", 24), p("Owen Ajero Rosal", "E", 24), p("Johan Wahlen Pangilinan", "E", 24)]),
    flight("GM", 10, "8:21 AM", [p("Roberto Cruz Lazaro", "E", 22), p("Ronald Rezani", "E", 21), p("Allen Macaraig", "E", 22), p("Sherwin Gregorio Uy", "E", 26)]),
    flight("GM", 11, "8:30 AM", [p("Rainier Sison", "D", 16), p("Dolly De Gala", "D", 16), p("Rustico Ramirez", "E", 24), p("Cedric Mark Urera", "E", 23)]),
    flight("GM", 12, "8:39 AM", [p("Kimberly Duenas", "D", 17), p("Hannah Bella Lazaro", "D", 19), p("Jay Dizon", "D", 20), p("Alan Algodon", "D", 20)]),
    flight("GM", 13, "8:48 AM", [p("Joan Arangote", "D", 18), p("Patricia Valencia", "D", 15), p("Marlo Dela Peña", "D", 19), p("Cesar Areza", "D", 17)]),
    flight("GM", 14, "8:57 AM", [p("Michelle Dabao", "D", 16), p("Ruth Castro", "D", 20), p("Justin Bilbao", "D", 16), p("Nelson Chan", "D", 15)]),
    flight("GM", 15, "9:06 AM", [p("Glenda Aguto", "D", 15), p("Jasmine Velu", "D", 18), p("Hoang Minh Duc", "D", 16), p("Richard Dalilis", "D", 15)]),
    flight("GM", 16, "9:15 AM", [p("Angela Mae 'Divino' Susi", "D", 18), p("Mary Carlene Navarro", "D", 19), p("Victor Frias", "D", 19), p("Domingo Mestiola", "D", 17)]),
    flight("GM", 17, "9:24 AM", [p("Janiree Dacles", "D", 19), p("Amor Laguilles", "D", 15), p("Jerome Chua", "D", 15), p("Arnold John Mesias", "D", 18)]),
    flight("GM", 18, "9:33 AM", [p("Vanessa Grace Saring", "D", 20), p("Patricia Claire Botardo", "D", 19), p("Virgilio Cadang", "D", 17), p("Generoso “Gene” Ponio", "D", 16)]),
    flight("GM", 19, "9:42 AM", [p("Nicole Jennice Aguilar", "D", 17), p("Marilyn L. Del Rosario", "D", 18), p("Augusto Anthony Buendia Jr.", "D", 15), p("Ruben Javier A.", "D", 20)]),
    flight("GM", 20, "9:51 AM", [p("Arnel Marasigan S.", "D", 16), p("Ariel Araja", "D", 15), p("Joseph Barnie (Bang) Gumalo", "D", 17), p("Peter Nacion", "D", 16)]),
    flight("GM", 21, "10:00 AM", [p("Raffy Tamayo", "D", 16), p("Neil Darrell Sanchez", "D", 18), p("Oliver James Matias", "D", 20), p("Roy Amurao", "D", 17)]),
    flight("GM", 22, "10:09 AM", [p("Virgilio R. Villaescusa", "D", 17), p("Xavier Faurens", "D", 14), p("Yi Lwin", "D", 17), p("Abbhi Akshaya", "D", 17)])
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
