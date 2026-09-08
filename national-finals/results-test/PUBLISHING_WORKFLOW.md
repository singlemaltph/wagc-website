# National Finals — Publishing Workflow

Operational notes for the WAGC team and any future coding agent working on
`national-finals/results-test/` (test hub) and, eventually,
`national-finals/results/` (production page). Keep this concise and update
it if the workflow changes.

## Source of truth

The **private "2026 WAGC NF Scoring" Google Sheet** is the authoritative
dataset before, during, and immediately after the tournament: full player
roster, Low Index, Course HCP, internal IDs, Day 1 scores, handicap
adjustments, Day 2 HCP/scores, final totals, official rankings, and
tie-break calculations.

This **public GitHub website is not that source of truth**. It should only
ever contain the subset of information that has already been cleared for
public release, at the time it's released.

## This repository is public — hiding data with a flag is not security

`data.js`, `flights.js`, and every other file in this repo are plain text,
readable directly on GitHub or via DevTools/Network/Sources regardless of
any `*Published` flag in `config.js`. **Publication flags only control UI
visibility — they are not an access-control mechanism.**

Consequences:

- **Real Day 2 pairings must not be committed** to this repo before they
  are officially released (i.e. after Day 1 is complete and verified).
- **Real final-result data must not be committed** to this repo before the
  Awards Ceremony — not even with `finalResultsPublished: false`. If the
  data is physically present in the repo, it is already public.
- The correct workflow is: generate/approve the release data privately,
  then commit the real data **and** flip the matching flag to `true` **in
  the same change**. Never flip the flag ahead of the data.

The test page's `data.js` / `flights.js` are exempt from this because they
are explicitly labeled fake/simulated test data — that's fine to keep
committed indefinitely for stress-testing the UI.

## Publication flags (`config.js`)

Five separate flags, because each thing is released at a different time:

```js
rosterPublished: true,
day1FlightsPublished: true,
day1ResultsPublished: false,
day2FlightsPublished: false,
finalResultsPublished: false,
```

Do not collapse these into one flag — e.g. a single `day2Published`
controlling both Day 2 flights and Final Results causes real bugs (Day 2
pairings appearing before they exist, or Final staying locked for no
reason after Day 2 flights go out).

## State machine

| State | roster | day1Flights | day1Results | day2Flights | finalResults |
|---|---|---|---|---|---|
| A — Pre-event | true | true | false | false | false |
| B — Day 1 scoring underway | true | true | true | false | false |
| C — Day 1 complete, Day 2 flights released | true | true | true | true | false |
| D — Day 2 finished, before Awards | true | true | true | true | false |
| E — After Awards Ceremony | true | true | true | true | true |

The current test page default is **State A**.

## Day 1 progressive publishing

`day1ResultsPublished: true` does not mean every player must have a score
first. As scores are received and verified in the Sheet:

- A player's row is only included in the ranked leaderboard once their
  score is verified. In the test dataset this is the `day1Complete` field
  on each player in `data.js` (`true` = ranked, `false`/absent = pending).
- Unverified/incomplete players render as **"Pending"** with no
  leaderboard position — they are never ranked.
- This means the public Day 1 leaderboard is expected to **fill in
  gradually** throughout the day. That's intentional, not a bug.

## Day 2 flights — release timing and pairing rule

Day 2 flights stay locked (`day2FlightsPublished: false`) until Day 1 is
fully complete and verified. Until then the Flights → Day 2 view shows:

> **DAY 2 FLIGHT SCHEDULE**
> Day 2 flight pairings and tee times will be announced after the
> completion of Day 1.
> _Please check back after Day 1 results have been finalized._

**Pairing rule (to implement when Day 1 is final — not built yet):** Day 2
pairings are based on official Day 1 standings, built for competitive
suspense. Per division, working backward from the last flight:

- **LAST / championship flight = Day 1 positions 1–4** — the leaders tee
  off last, so the division win stays undecided until the final group
  finishes.
- Second-to-last flight = positions 5–8, third-to-last = 9–12, and so on
  backward through the standings.
- If a division's player count isn't divisible by 4, protect the
  championship end: let an earlier/lower-ranked flight carry fewer than 4
  players rather than splitting positions 1–4.
- This ranking rule takes **priority** over the Day 1 ladies-pairing
  preference — never pull a top-4 player out of the championship flight to
  pair ladies together. Never infer gender from names.

Full detail and worked examples are in the comment block at the top of
`flights.js`.

Course rotation (which course each division plays) **may** be shown
publicly before Day 2 pairings are released — it is not the same thing as
publishing the flight schedule itself. Keep those two concepts visually
separate in the UI (the course-rotation note is independent of the locked
flights card).

```
DAY 1: A/B/C → Arnold Palmer Course | D/E → Graham Marsh Course
DAY 2: A/B/C → Graham Marsh Course  | D/E → Arnold Palmer Course
```

## Final results embargo

Final results stay locked (`finalResultsPublished: false`) through all of
Day 2 and the gap before the Awards Ceremony — even though the internal
result may already be fully known. The Final tab shows:

> **FINAL RESULTS**
> Final results will be announced after the Awards Ceremony.
> _Official results will be published following the awarding._

Release sequence, after awarding:

1. Add the official public final-result dataset to `data.js` (or its
   production equivalent).
2. Set `finalResultsPublished = true`.
3. Push — the final leaderboard becomes public.

Steps 1 and 2 must happen in the same change. Never commit real final data
ahead of setting the flag.

## Public fields — what's allowed

**Roster publishes:** Player, Tournament Index, Palmer HCP, Marsh HCP.
**Roster does NOT publish Day 1 HCP** — a player's actual Course HCP for
a given round belongs with that day's flight pairing instead, not the
roster (see below). Palmer HCP / Marsh HCP are each player's base Course
HCP for the two courses, taken as-is from the Players tab (columns G/H);
never recalculated.

**Day 1 Flights publish:** Player, Division, Course HCP. Source for Course
HCP: Players tab → **Day 1 Course HCP** (column K), taken as-is, never
recalculated.

**Day 2 Flights publish:** Player, Division, Course HCP. Source for Course
HCP: Handicap Adjustment tab → **R2 Course Handicap** — the player's
official adjusted Course HCP for Round 2. Never use the original
Palmer/Marsh HCP, "Day 2 Base Course HCP" alone, or a locally recomputed
adjustment. Day 2 flights are generated only after Day 1 is finalized,
official standings are set, and R2 Course Handicap is confirmed — see
the pairing rule below.

The public flight-player column is always labeled **"COURSE HCP"** (not
"Playing HCP", "CH", "Adjusted HCP", "Handicap", or "Day HCP"). `null`
renders as "—"; a real `0` or a negative Course HCP is valid and renders
as-is — never treat those as missing.

**Day 1 Results:** Position, Player, Division, Gross, Day 1 HCP, Net,
Handicap Adjustment, Day 2 HCP.

**Final Results:** Position, Player, Division, Round 1 Net, Round 2 Gross,
Round 2 HCP, Round 2 Net, 2-Day Net Total.

**Never expose publicly:** Player ID, WHS ID, phone, email, payment
status, internal notes, Low Index (if distinct from public Handicap
Index).

## Official tie-break rule (2026 National Finals Tournament Conditions)

Applies whenever players are tied. Exact order:

1. Gross score, last 9 holes (holes 10–18)
2. If still tied: gross score, last 6 holes (holes 13–18)
3. If still tied: gross score, last 3 holes (holes 16–18)
4. If still tied: hole-by-hole count-back beginning at hole 18
5. If still tied: the #1-handicap hole on the **back nine** (holes 10–18)
6. Then the #2-handicap hole on the back nine
7. Continue by back-nine handicap-hole ranking until resolved

**For this 36-hole National Final, the count-back uses the Day 2 (final
round) scorecard.**

### Where this is computed

Prefer computing and confirming the official position/tie-break result in
the **private scoring workbook**, not on the public website. The site's
current `rankByDivision()` in `app.js` uses a simple ascending-value +
alphabetical-name sort — that is a **test-only placeholder**, not the
official tie-break, and does not have access to hole-by-hole scores.

In production, the site should receive an **already-approved `position`**
value per player rather than recomputing the official winner client-side.
This avoids: inconsistent tie-break results, exposing unnecessary
hole-by-hole data publicly, and duplicating official scoring logic that
the Tournament Committee / official scorer owns.
