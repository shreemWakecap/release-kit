# [Advocacy brief] Connected Environment 1.0

> DRAFT. This is the would-be Linear issue body. It was NOT filed. Linear is an internal surface, so source tags stay in.
> Would-be fields: team TAN (default), label `field-proposal`. No project chosen. Not commercial: no prices, no phasing.
> Pitch stage: pilot. Primary audience: customer site safety and HSE leads and their managers. Secondary: WakeCap sales, field engineers, leadership.
> Pages: `index.html` (tagged), `index.clean.html` (customer). Live captures read-only, 4 Oct 2026, Saudi time.

## Summary

Connected Environment answers one question first: is it safe to work right now? One area per project, inside the portal, with Weather Station, Lightning, Reports and Settings. `[portal: 2026-10-04 live]`

The promise in three lines: Answer first. Never falsely safe. Every change audited. `[spec]`

## Problem

- A grid of readings makes the supervisor do the sums. The one question on site is whether work can continue. `[spec]`
- A dead or frozen sensor can read as calm. Old data that looks fine is worse than no data. `[spec]`

## What is live today (six surfaces, read-only)

- Weather Station: a Danger strip leads the page with data confidence and last update. Heat Index 50.4 °C in the band checked, with 30 min work, 10 min rest and one cup (250 ml) of water every 15 min. `[portal: 2026-10-04 live]`
- Station health: one of three stations offline, readiness Not ready, station named. `[portal: 2026-10-04 live]`
- Recommended steps drawer: pause outdoor work and move crews to shade or rest (Do first), then notify the site safety officer. `[portal: 2026-10-04 live]`
- Lightning: All Clear, Safe to work. Zone rings RED 13 km or less, YELLOW 13 to 20 km, ALL-CLEAR 30 min. Held for 114 h 52 m since 29 Sep 17:53 AST. Backup banner present. `[portal: 2026-10-04 live]`
- Reports: Maximum Values Report with a period picker. Last 30 days: max heat index 60.2 °C (9 Sep), max wind 32.0 km/h (7 Sep), daily breakdown, Export .xlsx. `[portal: 2026-10-04 live]`
- Settings: Connected Products Active or Inactive per product. Safety Policy with stop-work limits that show the last 30 days (Temperature 46 °C: 8 of 30 days, Wind 32 km/h: 1 of 30), five heat-index bands, calculation method NOAA, Change history tab. `[portal: 2026-10-04 live]`
- A second project shows the same layout: Danger at 43.3 °C, one station online, readiness Ready, readings behind the verdict listed. `[portal: 2026-10-04 live]`
- All times are Saudi time. Checked with the browser set to Los Angeles time. `[FE-observation]`

## Proof

### Targets
- One verdict leads the page, with what to do next. `[spec]`
- An offline, faulty, stale or unknown device never reads as safe. `[spec]`
- A safety policy that can face an auditor: in-force values with units, and a history of changes. `[spec]`

### Demo-observed
- On both Weather Station projects checked, the verdict strip led the page. Both showed Danger. `[FE-observation]`
- An offline station was flagged by name and the panel read Not ready. `[FE-observation]`
- Lightning alarm history and Change history were both empty on the projects checked, so no alarm rows or change entries were seen. `[FE-observation]`

### Pilot-observed
None. No pilot results exist and none are claimed.

## Owner contract ask

- Hypothesis: management mandates the policy and the verdict, so crews follow the site's own rules rather than a screen's opinion. `[inferred]`

## Recommended product changes

None identified.

## Rollout and next step

- Nothing to install. It opens inside the portal from the left rail. `[portal: 2026-10-04 live]`
- Hypothesis: a supervisor can read the strip and the steps without training. Training time has not been measured. `[inferred]`
- Suggested next step, for discussion: pick one project with a Weather Station and let the site HSE lead use it for working shifts. `[inferred]`

## Stakeholder map

Roles only, all hypotheses. Full table: `stakeholder-map.md`.

1. Site HSE lead (customer, primary): hypothesis, wants a defensible reason to stop work. Disarm: reframe as a backup. Engage first. `[inferred]`
2. Project or site manager (customer, primary): hypothesis, cares about the cost of stopped work. Disarm: show what a limit would have done before it changes. Engage second. `[inferred]`
3. Supervisors, foremen, crew leads (customer): hypothesis, may dispute rest cycles. Disarm: the cycles are the site's policy in force. `[inferred]`
4. Instrumentation or maintenance team (customer): hypothesis, passive. Offline devices are named on the page. `[inferred]`
5. WakeCap field engineers (internal): hypothesis, need no surprises from empty states. `[inferred]`
6. WakeCap sales (internal): hypothesis, may want to pitch what is not live. `[inferred]`
7. WakeCap leadership (internal): hypothesis, "never falsely safe" is a promise to keep. `[inferred]`

## Friction matrix

Full table: `friction-matrix.md`.

| Party | Threat (hypothesis) | Disarm |
|-------|---------------------|--------|
| Supervisors and crew leads | Danger brings work and rest cycles `[inferred]` | Reframe `[inferred]` |
| Anyone who judged heat by feel | A shared verdict replaces informal calls `[inferred]` | Contract `[inferred]` |
| Device owners | Offline devices are named `[inferred]` | Accept `[inferred]` |
| Production managers | A limit's cost becomes visible `[inferred]` | Reframe `[inferred]` |
| Whoever could change limits quietly | Changes are meant to be recorded. Not seen working: history empty `[inferred]` | Accept `[inferred]` |

## Evidence gaps (excluded from the pages)

Agent-composed dashboard and observation drawer (flag off, not visible). History charts (Trends shows Planned). Lightning wallboard and mobile glance (no link, not one of the six URLs). Red alarm flash and non-green Lightning states (only All Clear seen). Version-checked edits and the staged publish flow (not exercised, read-only). Share-image and Excel results (buttons seen, not clicked). `[FE-observation]`
