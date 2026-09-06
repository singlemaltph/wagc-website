/* ==========================================================================
   NATIONAL FINALS — SAMPLE FLIGHT DATA (TEST PAGE ONLY)
   --------------------------------------------------------------------------
   SAMPLE FLIGHT DATA — FOR TESTING ONLY.

   The official flight schedule is not connected yet. These groupings are
   mock data built only from the existing test player roster in data.js, for
   reviewing the Flights tab UX (layout, player search, mobile cards).

   Do NOT treat this as a real pairing sheet. Replace this file with the
   actual flight schedule when it is available — the display logic in
   app.js reads from window.NF_FLIGHTS and does not need to change.

   Each flight: { flightNumber, teeTime, startingHole, players: [name, ...] }
   Player division is looked up from window.NF_PLAYERS at render time.
   ========================================================================== */
window.NF_FLIGHTS = [
  { flightNumber: 1, teeTime: "7:00 AM", startingHole: 1, players: ["RONALD ANDAL", "TAE UK KIM", "GREG REYES", "ERWIN PABKALINAWAN"] },
  { flightNumber: 2, teeTime: "7:10 AM", startingHole: 1, players: ["ROMMEL MARIANO", "ALVIN HIPOLITO", "RAYMOND PALOMARES", "EDGARDO BROCAL"] },
  { flightNumber: 3, teeTime: "7:20 AM", startingHole: 1, players: ["ED ESGUERRA", "JEROME CHUA", "MICHAELO PALANCA", "ANDRO SERVIENTO"] },
  { flightNumber: 4, teeTime: "7:30 AM", startingHole: 1, players: ["CESAR AREZA", "BENSON SO", "LEO JOAB DE CASTRO", "VICTOR FRIAS"] },
  { flightNumber: 5, teeTime: "7:40 AM", startingHole: 1, players: ["ROSSETTE REYES", "ROY JAVIER", "NICK REYES", "OLIVER BALITA"] },
  { flightNumber: 6, teeTime: "7:50 AM", startingHole: 1, players: ["JOHN RODOLF RABINO", "JENNISON MACARAIG", "MARK JASON VILLAMOR", "ARIS NATIVIDAD"] },
  { flightNumber: 7, teeTime: "8:00 AM", startingHole: 1, players: ["MARIA RICA BALTAZAR", "VICE MILBERT OLIVEROS", "VLADIMIR VIC FRIAS", "DENNIS BALTAZAR"] }
];
