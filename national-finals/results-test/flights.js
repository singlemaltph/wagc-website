/* ==========================================================================
   NATIONAL FINALS — SAMPLE FLIGHT SCHEDULE (TEST PAGE ONLY)
   --------------------------------------------------------------------------
   SAMPLE FLIGHT DATA — FOR TESTING ONLY.

   Tee times and pairings shown here are simulated and are not official
   tournament assignments. This mirrors the test schedule drafted in the
   "2026 WAGC NF Scoring" Google Sheet ("Test Flight Pairings" tab), typed
   in here as static data — the site is not connected to that sheet.

   Course rotation:
     DAY 1 — Divisions A/B/C: Arnold Palmer Course | Divisions D/E: Graham Marsh Course
     DAY 2 — Divisions A/B/C: Graham Marsh Course  | Divisions D/E: Arnold Palmer Course

   Day 1 is the source of truth below. Day 2 reuses the exact same flights
   (same players, same order, same tee times) with only the course swapped
   per flight (Arnold Palmer <-> Graham Marsh) — generated programmatically
   at the bottom of this file so the pairing data is never duplicated.

   Replace DAY1_FLIGHTS with the real pairing sheet when it is ready; the
   Day 2 generation and the Flights tab rendering in app.js do not need to
   change.

   IMPORTANT — NOT IMPLEMENTED YET: real Day 2 pairing rule.
   The course-swap generation below (DAY2_FLIGHTS) is a TEST-ONLY stand-in
   used to exercise the UI. It is intentionally NOT shown publicly — see
   config.js's day2FlightsPublished flag and app.js's buildFlights(), which
   renders a "not yet announced" locked card for Day 2 until that flag is
   turned on.

   The real Day 2 schedule must instead be generated AFTER Day 1 is
   complete and verified, using official Day 1 standings, not a simple
   course swap of Day 1 pairings:

     - Pair players within their division according to Day 1 ranking.
     - The leading players tee off later — the championship flight
       (positions 1-4) MUST be the LAST flight for that division, so the
       division winner stays undecided until the final group finishes.
     - Per division, working backward from the last flight:
         LAST / CHAMPIONSHIP flight = Day 1 positions 1-4
         second-to-last             = positions 5-8
         third-to-last              = positions 9-12
         ...continue backward through the standings
       Example, 20 players in a division (flight order, earliest first):
         17-20, 13-16, 9-12, 5-8, then LAST/CHAMPIONSHIP = 1-4
     - NON-DIVISIBLE counts: protect the championship end of the sequence.
       Do NOT break apart positions 1-4 — let an earlier/lower-ranked
       flight carry fewer than 4 players instead.
       Example, 14 players in a division (flight order, earliest first):
         13-14 (2 players), 9-12, 5-8, then LAST/CHAMPIONSHIP = 1-4
     - This competitive-ranking rule takes PRIORITY over the Day 1
       ladies-pairing preference — never move a top-4 player out of the
       championship flight to satisfy a ladies-pairing preference. Do not
       infer gender from player names.

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

  function p(name, division) {
    return { name: name, division: division };
  }

  var DAY1_FLIGHTS = [
    // ── ARNOLD PALMER COURSE — Divisions A / B / C ──
    flight("AP", 1, "7:00 AM", [p("Randy Sulpico Someros", "A"), p("GERARDO DE CHAVEZ", "A"), p("Raymund James Lachica", "A"), p("Ian Davin Rosales", "A")]),
    flight("AP", 2, "7:10 AM", [p("Richard (Ricky) Delos Santos", "A"), p("John Paul Gutierrez", "A"), p("Htein Lin Aung", "B"), p("Mohd Yussof B Ishak", "B")]),
    flight("AP", 3, "7:20 AM", [p("Ma Victoria Herrera", "B"), p("Philip Ouano", "B"), p("Wendell Lucido", "B"), p("Lyndon Theodore D Pamintuan", "B")]),
    flight("AP", 4, "7:30 AM", [p("Mark Stephen Villegas", "B"), p("Eugene Unabia", "B"), p("Leo Gerald de Castro", "B"), p("Elvin Panliboton", "B")]),
    flight("AP", 5, "7:40 AM", [p("Clover Arangote", "B"), p("Neil Ruelan", "B"), p("Roberto A. Umali", "B"), p("Paolo Obaniana", "B")]),
    flight("AP", 6, "7:50 AM", [p("Richard Lao", "B"), p("Kevin Andre Montealto", "B"), p("Audi Noel Capellan", "C"), p("Aung Kyaw Oo", "C")]),
    flight("AP", 7, "8:00 AM", [p("Victoria Faurens", "C"), p("Alvie G. Barrios", "C"), p("Shaminder Singh Rahil", "C"), p("Gunal Kanna Moorthy Kannan", "C")]),
    flight("AP", 8, "8:10 AM", [p("Tomas L Olfato", "C"), p("Victor Vital", "C"), p("Rodel T. Paderayon", "C"), p("Malvin James Ching", "C")]),
    flight("AP", 9, "8:20 AM", [p("Albert Teoxon", "C"), p("Vic Roel Ferrer", "C"), p("Albert Lasac", "C"), p("Rosven Lasac", "C")]),
    flight("AP", 10, "8:30 AM", [p("Rogelio Ramirez", "C"), p("Jose Panganiban, Jr", "C"), p("JOHN VICAR VALDEZ", "C"), p("Edmundo Barrios", "C")]),
    flight("AP", 11, "8:40 AM", [p("Jeter Clerigo", "C"), p("EXEQUIEL P. LONGARES", "C"), p("Joel Respeto", "C"), p("Natasha Martina Bantug", "C")]),
    flight("AP", 12, "8:50 AM", [p("Juan Francisco V. Estevez Jr", "C"), p("Aurelio Marasigan S.", "C"), p("Eric Nicholis Goetz", "C")]),
    flight("AP", 13, "9:00 AM", [p("Gen Bonnevie", "C"), p("Jing Barretto", "C"), p("Benjamin Diaz Jr", "C")]),
    flight("AP", 14, "9:10 AM", [p("Espie Espinosa", "C"), p("Raymond Dabao", "C"), p("Kristian Herrera", "C")]),

    // ── GRAHAM MARSH COURSE — Divisions D / E ──
    flight("GM", 1, "7:00 AM", [p("Kimberly Duenas", "D"), p("Xavier Faurens", "D"), p("Abbhi Akshaya", "D"), p("Hoang Minh Duc", "D")]),
    flight("GM", 2, "7:10 AM", [p("Yi Lwin", "D"), p("Jay Dizon", "D"), p("NELSON CHAN", "D"), p("JOSEPH BARNIE (BANG) GUMALO", "D")]),
    flight("GM", 3, "7:20 AM", [p("Raffy Tamayo", "D"), p("Virgilio R. Villaescusa", "D"), p("Andrew Tan", "D"), p("Marilyn L. Del Rosario", "D")]),
    flight("GM", 4, "7:30 AM", [p("RICHARD DALILIS", "D"), p("Augusto Anthony Buendia Jr.", "D"), p("Peter Nacion", "D"), p("Mary Carlene Navarro", "D")]),
    flight("GM", 5, "7:40 AM", [p("Nicole Jennice Aguilar", "D"), p("Meynard Gelindon", "D"), p("Joan Arangote", "D"), p("Patricia Valencia", "D")]),
    flight("GM", 6, "7:50 AM", [p("Domingo Mestiola", "D"), p("VIRGILIO CADANG", "D"), p("Ruben Javier A.", "D"), p("Arnel Marasigan S.", "D")]),
    flight("GM", 7, "8:00 AM", [p("Janiree Dacles", "D"), p("Amor Laguilles", "D"), p("Roy Amurao", "D"), p("Rainier Sison", "D")]),
    flight("GM", 8, "8:10 AM", [p("Generoso “Gene” Ponio", "D"), p("Glenda Aguto", "D"), p("Jasmine Velu", "D"), p("Ariel Araja", "D")]),
    flight("GM", 9, "8:20 AM", [p("Janelle Lim-Kanna", "E"), p("Maritess Uy", "E"), p("Jayrold E. Bautista", "E"), p("Owen Ajero Rosal", "E")]),
    flight("GM", 10, "8:30 AM", [p("Pearl Grace Rodrigo Agdeppa", "E"), p("Rowena Victorino", "E"), p("Sherwin Gregorio Uy", "E"), p("Dennis Chavez Atienza", "E")]),
    flight("GM", 11, "8:40 AM", [p("Allen Macaraig", "E"), p("Rustico Ramirez", "E"), p("Joseph Reylan Reyes", "E"), p("Philip Martin Esteban", "E")]),
    flight("GM", 12, "8:50 AM", [p("Jan Kero Batallones", "E"), p("Jenny Vi M. Paderayon", "E"), p("Shiela Teoxon", "E"), p("Ricardo Carpio III", "E")]),
    flight("GM", 13, "9:00 AM", [p("Lorenzo A Javier", "E"), p("Ronald Rezani", "E"), p("Maria Barbara Kathleen L. Evangelista (Lynne)", "E"), p("Johan Wahlen Pangilinan", "E")]),
    flight("GM", 14, "9:10 AM", [p("CEDRIC MARK URERA", "E"), p("Jt Trinidad", "E"), p("Agnes Priest", "E"), p("Bogki Min", "E")]),
    flight("GM", 15, "9:20 AM", [p("Amy Lauron", "E"), p("Charito Lauron", "E"), p("Jericho Fullante", "E")]),
    flight("GM", 16, "9:30 AM", [p("Manolo Besa", "E"), p("Oliver Dela Cruz", "E"), p("Oliver James Matias", "E")])
  ];

  /* Day 2: same players, same order, same tee times — only the course
     swaps (Arnold Palmer <-> Graham Marsh) per the tournament's course
     rotation. Generated here so pairing data is never duplicated. */
  var SWAP_COURSE = { AP: "GM", GM: "AP" };

  var DAY2_FLIGHTS = DAY1_FLIGHTS.map(function (f) {
    var newCourseCode = SWAP_COURSE[f.courseCode];
    var seq = f.id.split("-")[2];
    return {
      id: "D2-" + newCourseCode + "-" + seq,
      course: COURSE[newCourseCode],
      courseCode: newCourseCode,
      teeTime: f.teeTime,
      startingHole: f.startingHole,
      players: f.players
    };
  });

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
