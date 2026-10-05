# C1 Conversion history: how Weather Station became Connected Environment

Slice C1-conversion-history. Written 2026-10-05. Read-only research. This file is the only thing created under `/Users/admin/wc` (a few scratch scripts live in the session scratchpad, outside the workspace). No app, test, build, docker or network call was run. No secret file was opened. Nothing under `docs-archive/` was read.

## 0. Method, legend, shorthands

### Refs measured

- FE repo `frontend-2.0-weather-station`: master `83b4d8d` (2026-10-05). Working tree is clean and equals master.
- BE repo `wakecap-weather-station`: master `352195f` (2026-10-04). The checked-out branch is one commit ahead (one comment and one test file). Every number reads `master` through git objects, so the checkout does not matter.
- Portal monorepo `frontend-2.0`: the local ref `origin/master` (tip dated 2026-09-30, fetch date unknown). Its local `master` is stale (2026-08-07), so it is not used. Nothing was fetched.
- Production build per release kit: front end 1.0.7 on 2026-10-04.

Evidence: `git -C $FE rev-parse --short HEAD master`; `git -C $BE rev-parse --short master HEAD`; `git -C $BE merge-base master HEAD`; `git -C $MONO log origin/master -1 --format='%h %ad' --date=short`; `git -C $MONO log master -1 --format='%h %ad' --date=short`; `RK/four-videos/_research/refresh-1.0.7.md:4`.

### Status values

- live = seen working in production (release kit, 4 Oct 2026, builds 1.0.3 to 1.0.7).
- code = in master code, deploy not verified.
- test = deployed to the test environment only.
- plan = documented intent.
- vision = nobody built it.
- stat = published statistic (none used in this slice).

### Shorthands used in every evidence line

```
FE=/Users/admin/wc/weather-station/frontend-2.0-weather-station
BE=/Users/admin/wc/weather-station/wakecap-weather-station
MONO=/Users/admin/wc/frontend-2.0
WS=/Users/admin/wc/weather-station
RK=/Users/admin/wc/weather-station/release-kit
sum() { awk -F: '{s+=$NF} END{print s+0}'; }
```

- `FE <hash>` means `git -C $FE show -s <hash>`. Same for `BE <hash>` and `MONO <hash>`.
- `FE:path:line` means `git -C $FE show master:path | sed -n 'LINEp'`. Same for `BE:` and `MONO:` (the monorepo uses `origin/master`).
- `tag <name>` means `git -C $FE for-each-ref refs/tags/<name>` (or `$BE`).
- `WS:file:line` and `RK:file:line` are plain files read from disk.
- Line numbers in code refer to the file as stored on master.

### Caveats that apply to the whole sheet

- FE tags are all lightweight (184 of 184 are type `commit`). A tag date is a commit date, not a deploy time. Evidence: `git -C $FE for-each-ref --format='%(objecttype)' refs/tags | sort | uniq -c`.
- Test counts are static (counted from source). Nothing was run. The only runtime numbers quoted come from commit messages and are labelled.
- Linear and PR bodies are not evidence here. Status comes from code, git history and the release kit.
- Customer and people names are left out on purpose. Live projects are called Project A, B, C as in the release kit (A has Weather Station, B has Lightning, C has Weather Station and Gas).

## 1. The story in ten lines

1. Before: Weather Station was one product in two parts. A .NET backend (repo born 2025-05-25) and a portal module `@wakecap-fe/ws` inside the portal monorepo (route `/project/:projId/ws`, first commit 2025-06-11). See 2.1 E0.
2. On 2026-06-23 the UI moved to its own repo and became its own micro-app. It reached production tags on 2026-07-13 and was compared side by side with the legacy route on 2026-07-14. See E1.
3. July and August: an answer-first dashboard (v0.1.0 on 2026-08-09), a defended write path with audit, an MCP endpoint and a policy screen. The legacy module was deleted from the monorepo on 2026-08-11. See E2.
4. On 2026-08-24 the app was renamed to Connected Environment and Weather Station moved under `/connected-env/weather-station` (260-file commit). On 2026-08-27 the backend moved every type under `Shared/` or `Products/WeatherStation` (345-file commit). See E3.
5. On 2026-08-30 Lightning landed in both repos. Gas followed (FE 2026-09-08, BE 2026-09-13). See E4.
6. On 2026-09-13 and 09-14 the shell got a side rail, a header with a clock and per-project product switches (Connected Products). Settings (09-14) and Reports (09-29) followed. See E4.
7. First production tag under the new name: 2026-09-03. Version 1.0: 2026-09-30. Build 1.0.7: 2026-10-04. See E5.
8. Today: 3 products, 6 FE feature folders, 28 controllers with 67 endpoints, 7 background services, 43 migrations, 33 MCP tools. See section 5.
9. What the three products really share: one shell, one menu and header, one backend, one read permission, per-project switches. What they do not share: one rule set and one audit trail (the release kit refutes both). See 3.12.
10. Still open: backend namespace rename, stage environment, gas notifications and compliance maths, a shell hand-off of permissions, a production check of the legacy keys, and any running AI agent. See section 4 and 6.

## 2. Timeline

### 2.1 Eras

Commit counts use author date on `master`: `git -C $R log master --format=%ad --date=short | awk -v a=START -v b=END '$0>=a && $0<=b' | wc -l`. The era totals add up to 348 (FE) and 447 (BE).

| Era | Dates | FE commits | BE commits | What changed | Evidence |
|---|---|---|---|---|---|
| E0 Standalone Weather Station | 2025-05-25 to 2026-06-22 | 0 | 276 | Backend born. Legacy portal module `@wakecap-fe/ws` born 2025-06-11 (36 commits on its path until 2026-08-11). BE tags stable-1.1.0 (2025-08-11) to stable-1.5.0 (2025-12-22). .NET 10 on 2025-11-13. Mediator replaced by services on 2025-12-22. Modern ECR pipeline on 2026-04-02. Customer heat-index band sets in June 2026. ws moved off the internal helpers package on 2026-06-22. | BE c4190a5; MONO dab1605e2; tags in 2.6; BE efb54ef; BE 0176f7c; BE fd92603; MONO 9092ab4a4 |
| E1 Extraction to a micro-app | 2026-06-23 to 2026-07-14 | 42 | 3 | New repo, new micro-app `@wakecap-fe/weather-station-app`. 17 commits on 06-27 ported live dashboard, historical, thresholds, i18n. Hardening port 06-28. v0.0.1-testing 07-01. Deploy fixes 07-13. First production tag 07-13. Parity fixes and side-by-side doc 07-14. | FE b75687f, 539afd3, 50d43bf, 8c68a5e (tag v0.0.1-testing), ea1bb10, 9a4df3e, 13917bd, 5a66cd5; tag v0.0.1-production |
| E2 Hardening and answer-first | 2026-07-15 to 2026-08-23 | 153 | 77 | Station-domain reads, answer-first dashboard becomes default (07-20), permissions consumer (07-23), BE neutral reads (07-17 to 07-19), defended write path (07-26 to 08-09), v0.1.0-production (08-09), MCP as second transport (08-11), legacy ws deleted from monorepo (08-11), config substrate (08-16), policy screen (08-17, 44 FE commits that day). | FE 81331d4, 16602bd, e28c054, a5870d9, 2c6eb16, c795e21; BE 5a72fc4, 9fc225a, 6b05c84, 2100dc4, 45fb0cc; MONO 4cff7ca34 |
| E3 Restructure and rename | 2026-08-24 to 2026-08-29 | 16 | 5 | FE rename (08-24), consolidate under `features/WeatherStation` (08-24), `/connected-env` base (08-24), finish rename (08-26), tab bar for three domains and product header with Planned markers (08-27). BE: architecture tests, 345-file move, product route area (08-27). Zero-Open Program doc prepared (08-27). | FE 5cd97d2, 7532223, 1fe03bc, d7f6221, 9b5efae, a9eb8b8; BE a0cd3f0, 65d4a05, 69bb2c5, 273519c; WS:ConnectedEnvironment*Zero-OpenProgram.md:3 |
| E4 Products land, shell grows | 2026-08-30 to 2026-09-29 | 120 | 72 | Lightning (08-30). Status slider (09-01). First production tag under the new name (09-03). Permissions consolidated onto the shared grant (09-07 to 09-10). Gas tab on, fixture-backed (09-08). Gas ingestion (BE 09-13). Side rail, header, clock (09-13). Connected Products and Settings (09-14). Historical tab and endpoint removed (09-16). Policy publish and preview (09-20). Lightning to Observation Manager (09-24). Reports (09-29). | FE bf52a0f, 99b430c, 561c504, 9328829, 9c4ea20, 1e322b6, 2d72101, 4db3aeb; BE 3dc572d, f542126, 688b766, e797731, f2d5edc, 9675915, a88a668, 3490dd3; tag v0.0.3-ConnectedEnvironmentApp-production |
| E5 Connected Environment 1.0 | 2026-09-30 to 2026-10-04 | 16 | 14 | v1.0.0 (09-30). v1.0.1 (10-01, Gas reads real data by default). v1.0.2 and v1.0.3 (Saudi time). v1.0.4 (Gas overview, acknowledge and close). v1.0.5 (Zones hidden). v1.0.6 (Esri map). v1.0.7 (satellite basemap). Release kit built 10-04. | tags v1.0.0 to v1.0.7 in 2.6; FE 31a3f80; RK:internal-notes.md:3 |
| E6 After 1.0 | 2026-10-05 on | 1 | 0 | FE master is one commit ahead of production: the Trends Planned row is removed from the rail. | FE 83b4d8d; `git -C $FE rev-list --count v1.0.7-ConnectedEnvironmentApp-production..master` returns 1 |

Day gaps (computed from the dates above): repo birth to first production tag 20 days; to rename 62 days; to first production tag under the new name 72 days; to v1.0.0 99 days; to v1.0.7 103 days. Rename to v1.0.0: 37 days. Legacy ws path first commit to removal: 426 days. BE birth to master tip: 497 days.

### 2.2 Dated ledger (each row is one animatable moment)

| Date | Repo | Event | Evidence |
|---|---|---|---|
| 2025-05-25 | BE | Initial commit of the Weather Station backend | BE c4190a5 |
| 2025-06-02 | BE | Indicators and graphs first implemented | BE 4ef14c3 |
| 2025-06-11 | MONO | First commit on the legacy ws module path | MONO dab1605e2 |
| 2025-06-15 | BE | First CI pipeline | BE 833e37c |
| 2025-07-08 | BE | Observation notification (sends safety observations) implemented | BE bc61cde |
| 2025-08-11 | BE | stable-1.1.0 | tag stable-1.1.0 |
| 2025-11-13 | BE | .NET 10 upgrade | BE efb54ef |
| 2025-12-22 | BE | Mediator replaced by services; stable-1.5.0 | BE 0176f7c |
| 2026-04-02 | BE | ECR push workflow (modern CI) | BE fd92603 |
| 2026-06-22 | MONO | ws moved off the internal helpers package | MONO 9092ab4a4 |
| 2026-06-23 | FE | Initial commit of the new repo | FE b75687f |
| 2026-06-26 | FE | Scaffold: "Add weather station frontend app" | FE 539afd3 |
| 2026-06-27 | FE | 17 commits: live dashboard, historical, thresholds, i18n, telemetry ported | `git -C $FE log master --format=%ad --date=short \| grep -c '^2026-06-27$'` |
| 2026-06-28 | FE, BE | Hardening port (bands, answer-first agent, layout) in FE; backend counterpart merged | FE 50d43bf; BE ae5a3ed |
| 2026-07-01 | FE | First tag v0.0.1-testing | tag v0.0.1-testing |
| 2026-07-13 | FE | First production tag v0.0.1-production and v0.0.2-production | tag v0.0.1-production; tag v0.0.2-production |
| 2026-07-14 | FE | Parity fixes (PR 7) and side-by-side verification note; both routes live in production | FE 13917bd; FE 5a66cd5; WS:Weather Station Architecture/evidence-index.md:73,86-88 |
| 2026-07-17 to 07-19 | BE | WeatherStations Status, Summary and Insight read endpoints | BE 5a72fc4; BE 9fc225a; BE 6b05c84 |
| 2026-07-20 | FE | Answer-first dashboard becomes the default view | FE 16602bd |
| 2026-07-20 | BE | Tag stable-1.6.0-rc.1 (last BE tag) | tag stable-1.6.0-rc.1 |
| 2026-07-23 | FE | Consumes `permissionsPromise` from the shell with a storage fallback | FE e28c054 |
| 2026-07-26 | BE | Defended write path (optimistic concurrency, atomic audit) | BE 2100dc4 |
| 2026-08-09 | FE | v0.1.0-production (answer-first dashboard) | tag v0.1.0-production |
| 2026-08-11 | MONO | Legacy `@wakecap-fe/ws` removed from the portal monorepo | MONO 4cff7ca34 |
| 2026-08-11 | BE | MCP becomes a second transport inside the backend | BE 45fb0cc |
| 2026-08-16 | FE | Config framework folder born | FE 2c6eb16 |
| 2026-08-17 | FE | Site Safety Policy route and rail (44 FE commits that day) | FE c795e21 |
| 2026-08-24 | FE | Rename app to connected-environment (18 files) | FE 5cd97d2 |
| 2026-08-24 | FE | Consolidate WS code under `features/WeatherStation` (260 files, 220 renames) | FE 7532223 |
| 2026-08-24 | FE | Weather Station moved under a `/connected-env` base with a redirect for old URLs | FE 1fe03bc |
| 2026-08-26 | FE | Finish the rename: shared layer, styles, analytics (181 files); first test build `v1.0.0-testing` | FE d7f6221; tag v1.0.0-testing |
| 2026-08-27 | FE | Index route and a tab bar naming three domains (Weather Station on; Gas and Lightning Planned) | FE 9b5efae; FE a9eb8b8 |
| 2026-08-27 | BE | Architecture tests pin the product folders; 345-file move under `Shared/` or `Products/WeatherStation`; product route area | BE a0cd3f0; BE 65d4a05; BE 69bb2c5 |
| 2026-08-27 | WS | Zero-Open Program prepared: 26 features in 6 weeks | WS:ConnectedEnvironment*Zero-OpenProgram.md:3-4 |
| 2026-08-30 | FE, BE | Lightning tab (FE) and Lightning module (BE) land; per-product permission prefix first added | FE bf52a0f; BE 3dc572d; BE df300aa |
| 2026-08-30 | WS | Design prototype of the Connected Environment shell created | WS:prototypes/ws-connected-env/README.md:5 |
| 2026-09-01 | FE | Connected Environment bar becomes a Status Slider | FE 99b430c |
| 2026-09-03 | FE | First production tag under the new name | tag v0.0.3-ConnectedEnvironmentApp-production |
| 2026-09-07 to 09-10 | FE, BE | Lightning and Gas authorize on the shared weather-station grant; per-product permissions dropped | BE f542126; BE 6ec8510; BE 16addbf; FE e3ab750; FE 233abad |
| 2026-09-08 | FE | Gas tab turned on with fixture-backed screens | FE 561c504 |
| 2026-09-13 | BE | Gas module: vendor ingestion, readings API, product wiring | BE 688b766 |
| 2026-09-13 | FE | Side rail (TAN-2600), horizontal track retired, header with live clock, orange accent | FE 9328829; FE 9889d47; FE 9c4ea20; FE 8e55e33 |
| 2026-09-14 | BE, FE | `project_product` table (Connected Products) and rail gating on entitlement; Settings becomes a real screen | BE e797731; FE 1e322b6 |
| 2026-09-15 | FE, BE | Connected Products tab behind its own grant; rail collapses to icons | FE ffe4f0b; FE be30cc8; BE 922a848 |
| 2026-09-16 | FE, BE | Historical tab and Historical endpoint removed | FE 2d72101; BE f2d5edc |
| 2026-09-20 | BE, FE | Policy impact, observation outbox, atomic publish; policy screen rebuilt | BE 248bed9; BE 9675915; FE b1bb503; FE 2ce0b42 |
| 2026-09-21 | FE | Settings absorbs Site Safety Policy and Lightning radii | FE f8d3e14 |
| 2026-09-24 | BE | Lightning email and SMS added then removed the same day; lightning observations go to the Observation Manager | BE 505e6d9; BE 367bf43; BE a88a668 |
| 2026-09-29 | FE, BE | Reports (Maximum Values Report) screen and endpoint | FE 4db3aeb; BE 3490dd3 |
| 2026-09-30 | FE | v1.0.0 production tag | tag v1.0.0-ConnectedEnvironmentApp-production |
| 2026-10-01 | FE | Gas reads real data by default (v1.0.1) | FE 31a3f80; tag v1.0.1-ConnectedEnvironmentApp-production |
| 2026-10-04 | FE, BE | v1.0.2 to v1.0.7 in one day; Gas acknowledge and close; Lightning location | tags v1.0.2 to v1.0.7; BE b36cdfa; BE 352195f |
| 2026-10-05 | FE | Trends Planned row removed (master only) | FE 83b4d8d |

### 2.3 Rename ledger (what each name was, and when it changed)

| Thing | Before | Then | Now | Evidence |
|---|---|---|---|---|
| npm package and micro-app id | `@wakecap-fe/ws` | `@wakecap-fe/weather-station-app` (2026-06-26) | `@wakecap-fe/connected-environment-app` (2026-08-24) | `git -C $FE show 539afd3:package.json \| sed -n 2p`; `FE:package.json:2`; FE 5cd97d2 |
| webpack project name | `ws` | `weather-station-app` | `connected-environment-app` | MONO d2e0962bf:packages/web/ws/webpack.config.js:13; `git -C $FE show 539afd3:webpack.config.js \| sed -n 31p`; `FE:webpack.config.js:31` |
| entry file | `wakecap-fe-ws.tsx` | `wakecap-fe-weather-station-app.tsx` | `wakecap-fe-connected-environment-app.tsx` | FE 5cd97d2 (file rename in its stat); `WS:Weather Station Architecture/evidence-index.md:30` |
| deploy key and S3 prefix | `{ver}-PORTAL` | `{ver}-WeatherStationApp` | `{ver}-ConnectedEnvironmentApp` (changed in the rename commit) | `git -C $FE show 5cd97d2 -- .github/workflows/main.yml`; `FE:.github/workflows/main.yml:86,112,214` |
| git tag format | none (monorepo) | `v{ver}-{env}` | `v{ver}-ConnectedEnvironmentApp-{env}` (from 2026-09-03) | `git -C $FE log master -S'-ConnectedEnvironmentApp-${{ inputs.ENV_SETUP }}' --format='%h %ad' --date=short -- .github/workflows/main.yml` returns 5977fc8 2026-09-03 |
| Tailwind class prefix | `tw-` | `twws-` | `twce-` (2026-08-26) | `FE:tailwind.config.js:5`; `git -C $FE show 5cd97d2^:tailwind.config.js \| sed -n 5p`; FE d7f6221 |
| route | `/project/:projId/ws` (and `ws-historical`) | `/project/:projId/weather-station` | `/project/:projId/connected-env/weather-station`, plus sibling product routes | `WS:wakecap-weather-station/WEATHER_STATION.md:136`; `FE:src/app/routes.tsx:116,209`; FE 1fe03bc |
| Mixpanel root key | `WeatherStation` | `WeatherStation` | `ConnectedEnvironment` (2026-08-26) | `git -C $FE show d7f6221^:src/app/features/WeatherStation/constants/mixpanelEvents.ts \| sed -n 2p`; same file at `d7f6221` |
| Sentry micro-app tag | `@wakecap-fe/ws` | `@wakecap-fe/weather-station-app` | `@wakecap-fe/connected-environment-app` | `FE:src/app/providers/sentry.ts:9`; `FE:MIGRATION.md:31` |
| rail first row label | none (portal layout) | Dashboard | Weather Station (2026-09-13) | FE 9cbe998; `FE:src/app/translations/en.ts:29` |
| brand accent | blue | blue | orange (`--primary: 21 90% 48%`; primary-600 `#ea580c`) | FE 8e55e33; `FE:src/app/brandAccentTheme.test.ts:15,20-21` |
| backend namespaces | `Wakecap.WeatherStation.*` | same | same (NOT renamed) | `git -C $BE grep -l 'Wakecap.ConnectedEnvironment' master -- '*.cs' '*.csproj' '*.sln'` returns nothing |
| backend folders | flat `Controllers/`, `Services/` | flat | `Shared/` and `Products/<Product>/` in every layer | BE 65d4a05; 3.7 |
| backend read permission | `weatherstation:view` | same | same, shared by all three products | `BE:Wakecap.WeatherStation.Domain/Shared/Constants/Permissions.cs:12` |
| LaunchDarkly keys | `weather-station-*` | same | weather keys unchanged; Gas keys are `connected-env-gas*` | 3.5 flags row |

### 2.4 Commits per month (author date, `master`)

Command (FE or BE): `git -C $R log master --format='%ad' --date=format:'%Y-%m' | sort | uniq -c`.

| Month | FE repo | BE repo | Monorepo ws path |
|---|---|---|---|
| 2025-05 | 0 | 13 | 0 |
| 2025-06 | 0 | 133 | 2 |
| 2025-07 | 0 | 64 | 8 |
| 2025-08 | 0 | 16 | 0 |
| 2025-09 | 0 | 0 | 3 |
| 2025-10 | 0 | 6 | 7 |
| 2025-11 | 0 | 15 | 5 |
| 2025-12 | 0 | 6 | 3 |
| 2026-01 | 0 | 3 | 0 |
| 2026-02 | 0 | 2 | 0 |
| 2026-03 | 0 | 0 | 0 |
| 2026-04 | 0 | 5 | 1 |
| 2026-05 | 0 | 5 | 1 |
| 2026-06 | 27 | 10 | 4 |
| 2026-07 | 82 | 18 | 1 |
| 2026-08 | 122 | 73 | 1 |
| 2026-09 | 106 | 68 | 0 |
| 2026-10 (to 10-05) | 11 | 10 | 0 |
| Total | 348 | 447 | 36 |

Monorepo ws path command: `git -C $MONO log origin/master --format='%ad' --date=format:'%Y-%m' -- packages/web/ws | sort | uniq -c`. Rows with 0 are months the command does not print.

Contributors on master (count only): FE 7, BE 11. Evidence: `git -C $R shortlog -s master | wc -l`. Merge commits: FE 36 of 348, BE 87 of 447. Evidence: `git -C $R rev-list --merges --count master`.

Busiest days. FE: 2026-08-17 had 44 commits, 2026-07-15 had 31. BE: 2026-08-09 had 28, 2025-06-16 and 2025-06-18 had 27 each. Evidence: `git -C $R log master --format=%ad --date=short | sort | uniq -c | sort -rn | head -3`.

### 2.5 Commits per ISO week since June 2026 (week starts Monday)

FE: W26 (06-22) 24, W27 (06-29) 7, W29 (07-13) 53, W30 (07-20) 24, W31 (07-27) 1, W32 (08-03) 1, W33 (08-10) 8, W34 (08-17) 77, W35 (08-24) 22, W36 (08-31) 32, W37 (09-07) 28, W38 (09-14) 23, W39 (09-21) 20, W40 (09-28) 27, W41 (10-05) 1. Sum 348.

BE since 2026-06-01: W23 (06-01) 1, W24 (06-08) 7, W26 (06-22) 2, W27 (06-29) 1, W29 (07-13) 6, W30 (07-20) 10, W31 (07-27) 2, W32 (08-03) 28, W33 (08-10) 18, W34 (08-17) 13, W35 (08-24) 10, W36 (08-31) 9, W37 (09-07) 8, W38 (09-14) 17, W39 (09-21) 21, W40 (09-28) 26. Sum 179.

Evidence: `git -C $R log master --since=2026-06-01 --format='%ad' --date=format:'%G-W%V' | sort | uniq -c`. The week start dates are computed from the ISO calendar (week 1 of 2026 starts Monday 2025-12-29).

### 2.6 Tags and release cadence

FE repo (184 tags, all lightweight):

- Testing 87, stage 16, production 81. Of the production tags 22 are the old line (v0.0.1 on 2026-07-13 to v0.1.6 on 2026-08-24) and 59 carry `ConnectedEnvironmentApp` (v0.0.3 on 2026-09-03 to v1.0.7 on 2026-10-04).
- Production tags per month: July 15, August 7, September 52, October 7 (to 10-04). Testing: 29, 20, 35, 3. Stage: 15 in July and 1 in August. The last stage tag is `v0.0.16-stage` on 2026-08-17.
- 81 production tags fall on 28 distinct days between 2026-07-13 and 2026-10-04 (83 days).
- Commits between production releases: `v0.1.0-production` to `v1.0.3-...-production` is 232; to `v1.0.5` is 235; to `v1.0.7` is 237; `v1.0.7` to master is 1.
- Key production tags: v0.0.1 (07-13, `54d7d3c`), v0.0.3 (07-14, `13917bd`), v0.1.0 (08-09, `a5870d9`), v0.1.6 (08-24, `e631109`), v0.0.3-CE (09-03, `fea8f5a`), v1.0.0 (09-30, `f2eb26a`), v1.0.1 (10-01, `31a3f80`), v1.0.2 (10-04, `f3e49a1`), v1.0.3 (`8dfbae9`), v1.0.4 (`7f5eef0`), v1.0.5 (`95e1650`), v1.0.6 (`e1faf00`), v1.0.7 (`8f3bf01`).
- The release kit's own count of commits between v0.1.0 and v1.0.3 is 232 and matches. Evidence: `RK:internal-notes.md:7`.

Evidence: `git -C $FE for-each-ref --sort=creatordate --format='%(creatordate:short) %(refname:short) %(objectname:short)' refs/tags`; `git -C $FE tag -l '*-production' | wc -l`; `git -C $FE for-each-ref --format='%(creatordate:format:%Y-%m)' 'refs/tags/*-production' | sort | uniq -c`; `git -C $FE rev-list --count v0.1.0-production..v1.0.7-ConnectedEnvironmentApp-production`.

BE repo: 8 tags. stable-1.1.0 (2025-08-11), 1.2.0 (2025-10-26), 1.3.0 (2025-11-03), 1.4.0 (2025-11-24), 1.4.1 (2025-11-30), 1.4.2 (2025-12-01), 1.5.0 (2025-12-22), 1.6.0-rc.1 (2026-07-20, the only annotated tag). 156 commits on master since stable-1.6.0-rc.1. Evidence: `git -C $BE for-each-ref --sort=creatordate --format='%(creatordate:short) %(refname:short) %(objecttype)' refs/tags`; `git -C $BE rev-list --count stable-1.6.0-rc.1..master`. The backend is deployed by image tag, not by git tag (a 2026-08 image tag looked like `prod-20260823-aa1ca63`). Evidence: `WS:BLOCKED.md:82-86` (dated 2026-08-31, see section 7).

### 2.7 Growth snapshots at milestones

FE (source = non-test, non-stories `.ts` and `.tsx` under `src/`):

| Ref | Date | Source files | Test files | Source lines | Test lines | Feature folders |
|---|---|---|---|---|---|---|
| `539afd3` scaffold | 2026-06-26 | 12 | 0 | 259 | 0 | 0 |
| `13917bd` v0.0.3-production | 2026-07-14 | 91 | 20 | 9,562 | 2,687 | 2 |
| `a5870d9` v0.1.0-production | 2026-08-09 | 131 | 59 | 16,314 | 11,570 | 3 |
| `5cd97d2^` before rename | 2026-08-24 | 178 | 113 | 26,844 | 28,155 | 5 |
| `d7f6221` rename finished | 2026-08-26 | 180 | 124 | 27,505 | 30,949 | 2 |
| `fea8f5a` first CE prod tag | 2026-09-03 | 239 | 208 | 35,941 | 47,771 | 3 |
| `f2eb26a` v1.0.0 | 2026-09-30 | 358 | 266 | 52,756 | 65,291 | 6 |
| `8f3bf01` v1.0.7 | 2026-10-04 | 406 | 311 | 58,858 | 74,665 | 6 |
| master `83b4d8d` | 2026-10-05 | 406 | 311 | 58,824 | 74,655 | 6 |

Derived: source lines grew by 31,980 (+119.1%) from the day before the rename (26,844) to master (58,824). Test files grew from 113 to 311 (+198). The 20 test files on 2026-07-14 match the "20 suites" in `WS:Weather Station Architecture/04-frontend-project-structure.dot:41`.

BE (production C# = all `.cs` except IntegrationTests, LoadTesting, Tools.BlacklineCheck and Migrations):

| Ref | Date | C# files | C# lines | Test files | Test lines | Controllers | Migrations |
|---|---|---|---|---|---|---|---|
| `stable-1.1.0` | 2025-08-11 | 167 | 8,771 | 7 | 511 | 4 | 5 |
| `stable-1.5.0` | 2025-12-22 | 181 | 10,008 | 11 | 638 | 7 | 12 |
| `stable-1.6.0-rc.1` | 2026-07-20 | 243 | 14,520 | 24 | 3,487 | 11 | 18 |
| `65d4a05^` before restructure | 2026-08-27 | 346 | 28,691 | 78 | 26,105 | 15 | 29 |
| `3dc572d` Lightning lands | 2026-08-30 | 386 | 32,245 | 88 | 29,340 | 17 | 31 |
| `688b766` Gas lands | 2026-09-13 | 434 | 37,751 | 101 | 34,139 | 22 | 33 |
| master `352195f` | 2026-10-04 | 523 | 53,761 | 187 | 61,477 | 28 | 43 |

Derived: production lines grew by 25,070 (+87.4%) from the day before the restructure (28,691) to master (53,761). Controllers went from 15 to 28. The restructure commit moved 345 files and net-added only 253 lines (28,691 to 28,944), so it was a move, not a rewrite.

Commands (swap `$REF`): FE source lines `git -C $FE grep -c '' $REF -- 'src/*.ts' 'src/*.tsx' ':(exclude)*.test.ts' ':(exclude)*.test.tsx' ':(exclude)*.stories.ts' ':(exclude)*.stories.tsx' | sum`; FE test files `git -C $FE ls-tree -r --name-only $REF -- src | grep -cE '\.test\.(ts|tsx)$'`; BE lines `git -C $BE grep -c '' $REF -- '*.cs' ':(exclude)Wakecap.WeatherStation.IntegrationTests/*' ':(exclude)Wakecap.WeatherStation.LoadTesting/*' ':(exclude)Wakecap.WeatherStation.Tools.BlacklineCheck/*' ':(exclude)*/Migrations/*' | sum`; BE controllers `git -C $BE ls-tree -r --name-only $REF | grep -E 'Controller\.cs$' | grep -vE 'IntegrationTests|WakecapController' | wc -l`; BE migrations `git -C $BE ls-tree -r --name-only $REF | grep -E '/Migrations/[0-9]{14}_.*\.cs$' | grep -vc 'Designer\.cs$'`.

### 2.8 Feature and product folder births

| Folder | First commit | Date |
|---|---|---|
| FE `features/config` | `2c6eb16` | 2026-08-16 |
| FE `features/WeatherStation` | `7532223` | 2026-08-24 |
| FE `features/LightningSensor` | `bf52a0f` | 2026-08-30 |
| FE `features/Gas` | `561c504` | 2026-09-08 |
| FE `features/Settings` | `1e322b6` | 2026-09-14 |
| FE `features/Reports` | `4db3aeb` | 2026-09-29 |
| BE `Core/Shared` and `Core/Products/WeatherStation` | `65d4a05` | 2026-08-27 |
| BE `Core/Products/LightningSensor` | `3dc572d` | 2026-08-30 |
| BE `Core/Products/GasDetector` | `688b766` | 2026-09-13 |
| BE `Web.API/Mcp` | `45fb0cc` | 2026-08-11 |
| BE `IntegrationTests/Architecture` | `a0cd3f0` | 2026-08-27 |
| BE `Domain/Shared/Entity/ProjectProduct.cs` | `e797731` | 2026-09-14 |

Evidence: `git -C $FE log master --diff-filter=A --format='%ad %h' --date=short -- src/app/features/<Name> | tail -1`; `git -C $BE log master --diff-filter=A --format='%ad %h' --date=short -- Wakecap.WeatherStation.Core/<Path> | tail -1`. The WeatherStation folder was a rename target on 2026-08-24. Its four sub-features existed earlier under `features/` (agent-dashboard and dashboard-layout 2026-06-28 in `50d43bf`, station-domain 2026-07-15 in `81331d4`, policy 2026-08-17 in `c795e21`).

## 3. Architecture, before and after

### 3.0 Before and after at a glance

"Before" is 2026-07-14, the day the architecture package was written: FE commit `13917bd` and BE commit `381b482` (the BE had no commit between 2026-07-02 and 2026-07-17, so `381b482` was the BE head that day). "After" is master.

| Measure | Before (2026-07-14) | After (2026-10-05) | Evidence |
|---|---|---|---|
| Products in the app | 1 (Weather Station) | 3 (Weather Station, Lightning, Gas), plus Reports and Settings areas | 3.5 |
| Frontend micro-apps for Weather Station | 2 (`@wakecap-fe/ws` and `@wakecap-fe/weather-station-app`) | 1 in code (`@wakecap-fe/connected-environment-app`) | 3.1 |
| Frontend route entries | 2 (`/:projId/weather-station` and a catch-all) | 19 under one base | 3.3; `git -C $FE show 13917bd:src/app/routes.tsx \| grep -nE 'path:\|index:'` |
| Frontend feature folders | 2 | 6 | `git -C $FE ls-tree -d --name-only 13917bd src/app/features/` |
| Frontend API URL builders | 17 | 44 | `git -C $FE show 13917bd:src/app/contracts/apiUrls.ts \| grep -cE '^  [A-Za-z0-9_]+:'`; section 5.2 |
| Frontend source files and lines | 91 and 9,562 | 406 and 58,824 | 2.7 |
| Frontend test files | 20 | 311 | 2.7 |
| Shell rail, header, entitlement gates | none | rail, header, 4 route gates | `git -C $FE ls-tree -r --name-only 13917bd -- src \| grep -ciE 'VerticalSideNav\|ConnectedEnv\|entitlement'` returns 0 |
| Backend controllers and endpoints | 10 and 20 | 28 and 67 | commands below |
| Backend hosted services | 0 | 7 | `git -C $BE grep -c 'AddHostedService<' 381b482 -- '*.cs' ':(exclude)Wakecap.WeatherStation.IntegrationTests/*' \| sum` returns 0; matches `WS:Weather Station Architecture/weather-station-architecture-report.md:147` |
| Backend migrations | 17 | 43 | 2.7 command with `381b482` |
| Backend MCP tools | 0 | 33 | `git -C $BE grep -c 'McpServerTool(' 381b482 -- 'Wakecap.WeatherStation.Web.API/Mcp/Tools/*.cs'` returns nothing |
| Backend production C# lines | 12,900 | 53,761 | 2.7 command with `381b482` |
| Backend test-project C# files | 15 | 187 | `git -C $BE ls-tree -r --name-only 381b482 -- Wakecap.WeatherStation.IntegrationTests \| grep -c '\.cs$'` |
| Backend solution projects | 8 | 9 | `git -C $BE show 381b482:Wakecap.WeatherStation.sln \| grep -cE '^Project\('` |

Backend controllers and endpoints at `381b482`: `git -C $BE ls-tree -r --name-only 381b482 | grep -E 'Controller\.cs$' | grep -vE 'IntegrationTests|WakecapController' | wc -l` (10, which matches the report's "10 controllers"); `git -C $BE grep -c -E '^[[:space:]]*\[Http(Get|Post|Put|Delete|Patch)' 381b482 -- 'Wakecap.WeatherStation.Web.API/*Controller.cs' | sum` (20).

### 3.1 Frontend identity and import-map key names

| Attribute | Legacy ws (E0) | weather-station-app (E1 to E3 start) | connected-environment-app (E3 on) |
|---|---|---|---|
| package and micro-app id | `@wakecap-fe/ws` | `@wakecap-fe/weather-station-app` | `@wakecap-fe/connected-environment-app` |
| import-map or registry key | static key `"@wakecap-fe/ws": WEB_WS` in the portal `index.ejs` (line 65 before removal) | key in the vertex microapps registry (production served 0.1.6-WeatherStationApp on 2026-09-03) | key `@wakecap-fe/connected-environment-app` (production 0.0.3-ConnectedEnvironmentApp and testing 2.1.9-ConnectedEnvironmentApp on 2026-09-03) |
| deploy path | monorepo Deploy S3, `{ver}-PORTAL` | own Deploy S3, `{ver}-WeatherStationApp` | own Deploy S3, `{ver}-ConnectedEnvironmentApp`, registry pointer moved by a `PUT` |
| class prefix | `tw-` | `twws-` | `twce-` |
| dev port | 4016 (`WEB_WS_PORT`) | 4293 | 4293 (`WEB_CONNECTED_ENVIRONMENT_APP_PORT`) |
| route | `/project/:projId/ws` (+ `-historical`) | `/project/:projId/weather-station` | `/project/:projId/connected-env/...` |
| repo size | 47 tracked files, 39 TS files, 3,725 TS lines, 1 test file | 91 source files and 20 test files on 2026-07-14 | 406 source files, 311 test files, 134,625 TS lines |
| deploy trigger | monorepo workflow | `workflow_dispatch` only | `workflow_dispatch` only (no push trigger) |

Evidence:

- Legacy facts: `git -C $MONO show d2e0962bf:packages/web/ws/package.json | sed -n 2p`; `git -C $MONO show d2e0962bf:packages/web/ws/webpack.config.js | sed -n 12,13p`; `git -C $MONO show d2e0962bf:packages/web/root-config/src/index.ejs | sed -n 65p`; `WS:wakecap-weather-station/WEATHER_STATION.md:111,138` (port 4016, import-map key, bundle `wakecap-fe-ws.js`). `d2e0962bf` is the parent of the removal commit `4cff7ca34`. Size: `git -C $MONO ls-tree -r --name-only d2e0962bf -- packages/web/ws | wc -l` (47); `git -C $MONO grep -c '' d2e0962bf -- 'packages/web/ws/src/*.ts' 'packages/web/ws/src/*.tsx' | sum` (3,725).
- Middle facts: `WS:Weather Station Architecture/02-weather-station-migration-state.dot:14-15,25-27`; `WS:wakecap-weather-station/WEATHER_STATION.md:112`.
- New facts: `FE:package.json:2`; `FE:webpack.config.js:30-31`; `FE:tailwind.config.js:5`; `FE:README.md:38` (port); `FE:.github/workflows/main.yml:86,112,213-226`; `WS:CLAUDE.md:44,65`; workflow triggers: `git -C $FE ls-tree -r --name-only master -- .github/workflows` returns main.yml and pull-request.yml; `FE:.github/workflows/main.yml:3` (`workflow_dispatch`).
- Registry key values come from the dated observation in `WS:CLAUDE.md:65` (2026-09-03). They were not re-read today (no network).
- The entry exports the three single-spa lifecycles `bootstrap`, `mount`, `unmount` and reads `ldContext`, `ldClient` and an optional `permissionsPromise` from the shell: `FE:src/wakecap-fe-connected-environment-app.tsx:37-39,114,119,139`.

### 3.2 How the portal mounts the app (no route table in the repo)

- The shell is single-spa `root-config`. It has no checked-in route table. It fetches layout data at runtime from `GET {VERTEX_API_URL}/layout-configs`. The data carries route segments and a `microApps` map of name to URL. The shell builds one application per route entry. Evidence: `MONO:packages/web/root-config/src/layout-config/apiUrls.ts:10`; `MONO:...layout-builder.ts:145-146`; `MONO:...types.ts:19`; `FE:docs/rollout-rollback.md:19-42`.
- The static import map in the shell lists 10 `@wakecap-fe/*` keys: helpers, admin, map-tools, root-config, nav, pm, components, om, training-center-app, worker-signup-app. It has no key for ws and none for connected-environment. Evidence: `MONO:packages/web/root-config/src/index.ejs:57-66`.
- The shell registers every app with `customProps` that carry only `ldContext` and `ldClient`. Evidence: `MONO:packages/web/root-config/src/wakecap-fe-root-config.ts:131-139`.
- A segment `connected-env` in the layout data plus a micro-app that resolves to `@wakecap-fe/connected-environment-app` is all that is needed to mount the app. One segment covers every sub-route. Evidence: `FE:docs/rollout-rollback.md:26-37`.
- The route entry, the registry key and the portal menu entry are server data. No sibling repo mentions `connected-env` on its checked-out HEAD (other branches were not searched). Evidence: `git -C $MONO grep -l -i -E 'connected-env|connected-environment' origin/master` returns nothing, and the same search on the HEAD of identity-service, infrastructure, node-service, sensors-service, wakecap-observation, wakecap-app-api, asset, safety-service, location-service, node-status-service, wakecap-notification returns 0 files each.
- Rollback is a data change: remove the `connected-env` route entry, clear the import-map override key, verify. The doc names no verified rollback API call. Evidence: `FE:docs/rollout-rollback.md:222-239`; `WS:DEFERRED.md:36`.

### 3.3 Route map

Before. The legacy module owned two routes: `/:projId/ws` and `/:projId/ws-historical`, rendered inside the portal's private layout. Evidence: `WS:wakecap-weather-station/WEATHER_STATION.md:136`; `FE:MIGRATION.md:32`.

After. Router basename is `envKeys.PORTAL_BASE_URL` (`/project/`). Evidence: `FE:src/app/routes.tsx:226-231`. The table has 19 entries: 14 screens, 4 redirects, 1 catch-all.

| URL after `/project/:projId/connected-env` | Renders | Gate | Evidence |
|---|---|---|---|
| (index) | Redirect to the first entitled product (Weather Station, then Gas, then Lightning), else Settings. Waits while the entitlement read is in flight. | entitlement read | `FE:src/app/routes.tsx:54-68,94-104` |
| `/weather-station` | Weather Station home | entitlement `weatherStationActive` | `FE:src/app/features/WeatherStation/routes.ts`; `FE:.../WeatherStationRouteGate.tsx` |
| `/lightning` | Lightning screen | entitlement `lightningSensorActive` | `FE:src/app/features/LightningSensor/routes.ts`; `FE:.../LightningRouteGate.tsx:31` |
| `/lightning/wallboard` | Control-room wallboard | same | same |
| `/lightning/mobile` | Phone view | same | same |
| `/gas` | Gas Overview | flag `connected-env-gas` not false, read grant, entitlement | `FE:src/app/features/Gas/routes.ts`; `FE:.../GasRouteGate.tsx`; `FE:.../gasTabFlag.ts:15` |
| `/gas/devices`, `/gas/alerts`, `/gas/compliance` | Detectors, Alerts, Compliance | same | `FE:src/app/features/Gas/routes.ts` |
| `/gas/zones` | Redirect to `/gas` (Zones hidden) | same | same |
| `/gas/wallboard`, `/gas/mobile` | Glance views | same | same |
| `/reports` | Maximum Values Report | entitlement `weatherStationActive` | `FE:src/app/features/Reports/routes.ts`; `FE:.../ReportsRouteGate.tsx` |
| `/settings` | Redirect to the first visible section | any section grant | `FE:src/app/features/Settings/routes.ts` |
| `/settings/connected-products` | Product switches | `weatherstation:settingsProducts` or `project_builder:manage` | `FE:src/app/features/Settings/constants/permissions.ts` |
| `/settings/weather-station` | Site Safety Policy and weather settings | `weatherstation:manage-weather-settings` | same |
| `/settings/lightning` | Radii, location, 24 h state history | `weatherstation:manage-lightning-settings` | same |

Outside the base: `/:projId/weather-station/*` redirects to `/:projId/connected-env/weather-station/*` and keeps the query string (`FE:src/app/routes.tsx:186-212`). `*` renders NotFound with no shell (`FE:src/app/routes.tsx:219-224`). Settings is never entitlement-gated, because it is where an operator reads which products the project holds (`FE:src/app/routes.tsx:161-166`).

### 3.4 Shell components

The shell is `App`: a column of header, then a row of rail and body. The body holds the Lightning RED banner, the bar and the outlet. Evidence: `FE:src/app/App.tsx:30-68`.

| Component | What it does | Evidence | Born |
|---|---|---|---|
| `ConnectedEnvHeader` | Shield glyph, a screen-reader-only h1 (the portal already prints the app name), the Gas status line, a clock in `Asia/Riyadh` that ticks every 30 s | `FE:src/app/components/ConnectedEnvHeader.tsx:47,54,60,96`; `FE:src/app/utils/siteTime.ts:16` | FE 9c4ea20, 2026-09-13 |
| `VerticalSideNav` (the rail) | Collapse toggle (storage key `connectedEnv.sideNav.collapsed`), product rows filtered by entitlement, a separator, a Settings row, Gas sub-rows (Dashboard, Devices, Alerts, Compliance) and a Gas state mark | `FE:src/app/components/VerticalSideNav.tsx:101,131-174,594,616,683,696` | FE 9328829, 2026-09-13; collapse FE be30cc8, 2026-09-15 |
| rail product rows | Weather Station (id `dashboard`, flag `weatherStationActive`), Gas (`gasDetectorActive`), Lightning (`lightningSensorActive`), Reports (`weatherStationActive`). Four rows. | `FE:src/app/components/VerticalSideNav.tsx:131-174` | FE 9328829 |
| rail Settings row | Drawn only when the operator holds one of the three section grants. Never touched by entitlement. | `FE:src/app/components/VerticalSideNav.tsx:573,696` | FE 1e322b6 |
| `ConnectedEnvTabs` and bar slots | The page row under the header and two portal slots (`connected-env-bar-views`, `connected-env-bar-actions`) that features fill. The old horizontal domain track was retired. | `FE:src/app/components/ConnectedEnvTabs.tsx`; `FE:src/app/components/ConnectedEnvBarSlot.tsx`; FE 9889d47 | FE 9b5efae, 2026-08-27 |
| `LightningRedBanner` | Renders above the bar on every screen when a lightning device exists and the site is in RED | `FE:src/app/App.tsx:20-29,61` | FE cc14505, 2026-08-31 |
| `NotFound` | Lives outside the shell so a bad URL shows no tabs | `FE:src/app/App.tsx:15-19`; `FE:src/app/routes.tsx:219-224` | |

Icons (Font Awesome light): Weather Station `cloud-sun`, Gas `explosion`, Lightning `bolt`, Reports `file-lines`, Settings `gear`, collapse toggle `bars`, header mark `shield-halved`. Evidence: `FE:src/app/components/VerticalSideNav.tsx:144,151,158,170,640,698`; `FE:src/app/components/ConnectedEnvHeader.tsx:68`. Rail labels: "Weather Station", "Gas", "Lightning", "Reports", "Settings" (`FE:src/app/translations/en.ts:29-39`).

Planned rail rows: a "Trends" row marked Planned existed in production and was removed from master on 2026-10-05 (`FE:83b4d8d`). The rail now has no Planned row in code (`FE:src/app/components/VerticalSideNav.tsx:131-174`). The Planned-row component `PlannedNavRow` is still in the file (line 440).

### 3.5 Product modules (frontend)

Counts are for `.ts` and `.tsx` under the folder. "Source" excludes tests and stories. Test cases are static `it(` and `test(` calls.

| Module | Segment | Source files and lines | Test files and cases | Entitlement flag | Notes |
|---|---|---|---|---|---|
| WeatherStation | `weather-station` | 171 and 32,667 | 171 and 1,907 | `weatherStationActive` | Sub-folders: agent-dashboard 105 files, policy 85, components 43, dashboard-layout 40, station-domain 36, utils 26, contracts 11, constants 5, config-sections 4, translations 2, fixtures 1 (all file types). |
| LightningSensor | `lightning` | 62 and 6,030 | 58 and 443 | `lightningSensorActive` | components 35, utils 33, hooks 14, api 9, contracts 6. |
| Gas | `gas` | 64 and 8,716 | 23 and 302 | `gasDetectorActive` plus flag `connected-env-gas` | components 23, hooks 13, utils 11, api 11. Four rail pages. |
| Reports | `reports` | 14 and 735 | 2 and 13 | `weatherStationActive` | One screen. |
| Settings | `settings` | 17 and 1,325 | 4 and 32 | none | Three sections. |
| config (framework) | none | 11 and 3,195 | 9 and 124 | none | Descriptor-driven config sections. Three imports from `WeatherStation/policy/policyTextScale` remain. |
| shell and UI kit (`app/components`) | none | 27 and 3,441 | 9 | none | Includes the vendored `ui/` kit (29 files) and its `MISSING.md`. |

Weather Station sub-features (folders under `features/WeatherStation/`): station-domain (the Status, Summary and Insight reads), dashboard-layout (the per-user featured-cards board and its persistence), agent-dashboard (the answer-first verdict strip, recommended steps, details drawers; the composition and observation drawer are flag-gated), policy (the Site Safety Policy, now shown under Settings), and config-sections (four descriptors: thresholds, heat-index-bands, project-settings, sensors). Evidence: `FE:WEATHER-STATION-RESTRUCTURE-PLAN.md:132-135` (descriptions at move time); `git -C $FE ls-tree -r --name-only master -- src/app/features/WeatherStation/config-sections`; `FE:src/app/features/Settings/routes.ts` (policy served under `settings/weather-station`).

Shares of the 58,824 non-test lines (derived): WeatherStation 55.5%, Gas 14.8%, Lightning 10.3%, config 5.4%, shell and UI 5.8%, Settings 2.3%, Reports 1.2%. The rest is providers, utils, contracts, translations, test mocks and app-level files.

LaunchDarkly keys in code: `connected-env-gas` (default on, only an explicit false withdraws Gas), `connected-env-gas-sample-data` (default off), `weather-station-answer-first-dashboard` (default on), `weather-station-safety-policy-screen` (default on), `weather-station-change-history` (default on), `weather-station-agent-dashboard-composition` (default off). Evidence: `FE:src/app/features/Gas/gasTabFlag.ts:15`; `FE:src/app/features/Gas/hooks/useGasReads.ts:21`; `FE:src/app/features/WeatherStation/components/LiveDashboard.tsx:52`; `FE:src/app/features/WeatherStation/policy/policyScreenFlag.ts:27`; `FE:src/app/features/WeatherStation/policy/changeHistoryFlag.ts:19`; `FE:src/app/features/WeatherStation/agent-dashboard/hooks/useAgentDashboardComposition.ts:13`; defaults from `RK:four-videos/_research/changes.md:38-39`. Flag values were not queried (no network).

Evidence for the counts: see section 5 (per-module commands).

### 3.6 Connected Products (per-project switches)

- Backend table `project_product`: one row per project, three booleans `WeatherStationActive`, `GasDetectorActive`, `LightningSensorActive`. A project with no row reads back all false. Nothing backfills existing projects. Evidence: `BE:Wakecap.WeatherStation.Domain/Shared/Entity/ProjectProduct.cs:3-22`; migration `20260914154605_add-project-product`.
- Endpoint: `GET` and `PUT api/project/{projectId}/ProjectProduct`. GET accepts `weatherstation:settingsProducts`, `project_builder:manage` or `weatherstation:view`. PUT accepts only the first two. Evidence: `BE:Wakecap.WeatherStation.Web.API/Shared/Controllers/ProjectProductController.cs:28-52`.
- Frontend reads it as `IProductEntitlement` and calls `{{WEATHER_STATION_API_URL}}/project/{{projectId}}/ProjectProduct`. Evidence: `FE:src/app/features/Settings/types/productEntitlement.ts:12-15`; `FE:src/app/features/Settings/contracts/apiUrls.ts:25,33`.
- The frontend enforces it in the rail rows and in the route gates (`=== true`, else NotFound). The backend product routes do not check it. Evidence: `FE:src/app/components/VerticalSideNav.tsx:594-597`; `git -C $BE grep -n -E 'ProjectProduct|IProjectProductService' master -- 'Wakecap.WeatherStation.Web.API/Products/*' 'Wakecap.WeatherStation.Core/Products/*'` returns only a comment in `PolicyImpactTimings.cs:11`; `RK:four-videos/_research/integration-and-devices.md:15`.
- The UI says Active or Inactive per product. Evidence: `FE:src/app/features/Settings/translations/en.ts` (connectedProducts.active and inactive); `RK:release-note.md:21`.
- Live: three projects with different sets (A: Weather Station; B: Lightning; C: Weather Station and Gas). Evidence: `RK:four-videos/final/1-connected-environment.script.md:30,34`. Status live (seen, not toggled).

### 3.7 Backend structure, before and after

Before (July 2026 guide). Seven projects in Clean Architecture: Web.API, Core, Domain, Infrastructure, Contracts, SharedKernel, IntegrationTests. One product. Controllers in a flat folder. Evidence: `WS:wakecap-weather-station/WEATHER_STATION.md:49-58`. The 2026-07-14 report counted 10 controllers. Evidence: `WS:Weather Station Architecture/weather-station-architecture-report.md:50`.

After. The solution has 9 projects, all `net10.0`: the seven above plus LoadTesting and Tools.BlacklineCheck. Evidence: `git -C $BE show master:Wakecap.WeatherStation.sln | grep -cE '^Project\('`; `BE:Wakecap.WeatherStation.Web.API/Wakecap.WeatherStation.Web.API.csproj:4`.

Every public type in five layers (Domain, Contracts, Core, Infrastructure model configuration, Web.API controllers) must sit under `.Common`, `.Shared` or `.Products.<Product>`. A type under one product may not reference another product. Reflection tests pin both rules. Evidence: `BE:Wakecap.WeatherStation.IntegrationTests/Architecture/ProductFolderStructureTests.cs:7-20,60-66`.

| Module | Controllers and endpoints | Hosted services | Entity configs | Route area | Files and lines (C#, all five layers) |
|---|---|---|---|---|---|
| Products/WeatherStation | 13 and 34 | 2 | 17 | `api/project/{projectId}/[controller]` | 223 and 24,917 |
| Products/LightningSensor | 3 and 10 | 4 | 5 | `api/project/{projectId}/lightning-sensor/[controller]` | 55 and 5,731 |
| Products/GasDetector | 6 and 11 | 1 | 7 | `api/project/{projectId}/gas-detector/[controller]` and `integrations/blackline/push` | 43 and 5,646 |
| Shared | 6 and 12 | 0 | 4 | `api/project/{projectId}/[controller]` and `api/Health` | 79 and 6,580 |
| Mcp (Web.API/Mcp) | 33 tools, 1 resource (the dashboard card catalogue) | 0 | 0 | `/mcp` | 23 and 2,734 |

Derived shares of 53,761 production lines (without migrations): WeatherStation 46.3%, Shared 12.2%, Lightning 10.7%, Gas 10.5%, MCP 5.1%, other 15.2%.

- Weather Station controllers (13): AgentMonitoring, AgentObservations, AgentSummary, Dashboard, HeatIndexBands, Observation, PolicyImpact, ProjectSettings, Report, SafetyPolicy, Threshold, WeatherStations, ObserverFindings. Lightning (3): Devices, Polling, Summary. Gas (6): Alerts, Devices, GasPush, Summary, Thresholds, Zones. Shared (6): ChangeApproval, ChangeAudit, ChangeProposal, DashboardLayout, Health, ProjectProduct.
- The product route area is a new attribute `ApiProjectScopProductRoute(product)`. The old `ApiProjectScopRoute` was left unchanged on purpose so the frontend paths do not move. Evidence: `BE:Wakecap.WeatherStation.Web.API/Filters/ApiProjectScopRouteAttribute.cs:93-120`; controller attributes: `git -C $BE grep -n 'ApiProjectScopProductRoute(' master -- 'Wakecap.WeatherStation.Web.API/Products/*'`.
- Endpoint mix: 45 GET, 11 POST, 10 PUT, 1 DELETE. Evidence: section 5.
- MCP: 33 tools in 10 tool classes and 1 resource (the dashboard card catalogue). Split: 26 tools marked `ReadOnly = true`, 4 `propose_*` tools, 3 observer write tools. No tool approves a change. Evidence: `git -C $BE grep -c 'McpServerTool(' master -- 'Wakecap.WeatherStation.Web.API/Mcp/Tools/*.cs' | sum` (33); `git -C $BE grep -c 'ReadOnly = true' master -- 'Wakecap.WeatherStation.Web.API/Mcp/Tools/*.cs' | sum` (26); `BE:Wakecap.WeatherStation.Web.API/Mcp/McpToolNames.cs:40-52`; `BE:Wakecap.WeatherStation.Web.API/Mcp/Resources/DashboardCardCatalogResource.cs:22,31`; `WS:wakecap-weather-station/WEATHER_STATION.md:84-85`.
- Weather Station tests still sit at the test project root (138 root-level `.cs` files). Only Lightning and Gas tests (with their fixtures, 49 files in all) moved under `IntegrationTests/Products/`. Evidence: `git -C $BE ls-tree --name-only master Wakecap.WeatherStation.IntegrationTests/ | grep -c '\.cs$'` returns 138; `git -C $BE ls-tree -r --name-only master -- Wakecap.WeatherStation.IntegrationTests | grep -c 'IntegrationTests/Products/'` returns 49.
- Leftovers: no `Mediator` usage in any `.cs` file, but the Mediator packages are still referenced in the Contracts project, and MassTransit packages are still referenced in Infrastructure with no `AddMassTransit` call. Evidence: `git -C $BE grep -l -E 'IMediator|AddMediator' master -- '*.cs'` returns nothing; `BE:Wakecap.WeatherStation.Contracts/Wakecap.WeatherStation.Contracts.csproj:22-23`; `BE:Wakecap.WeatherStation.Infrastructure/Wakecap.WeatherStation.Infrastructure.csproj:19-20`.

### 3.8 Backend permission scopes

| Scope | Meaning | Evidence |
|---|---|---|
| `weatherstation:view` | Read gate (or `project_builder:manage`). Used by all three products. | `BE:Wakecap.WeatherStation.Domain/Shared/Constants/Permissions.cs:12`; `FE:src/app/features/Gas/constants/permissions.ts:24`; `FE:src/app/features/LightningSensor/constants/permissions.ts:18` |
| `weatherstation:edit` | Write gate (or `project_builder:manage`) | `BE:...Permissions.cs:13`; `FE:src/app/features/Gas/constants/permissions.ts:32` |
| `project_builder:manage` | Admin alternative to the two above. Marked not seeded. | `BE:...Permissions.cs:46-49` |
| `weatherstation:settingsProducts` | Connected Products | `BE:...Permissions.cs:14` |
| `weatherstation:manage-weather-settings` | Weather policy management (no fallback to edit) | `BE:...Permissions.cs:31` |
| `weatherstation:manage-lightning-settings` | Lightning radii management | `BE:...Permissions.cs:42` |
| `weather.change.approve` (JWT scope) | Out-of-band approval of a proposed change. Not carried by an agent token. | `BE:...Permissions.cs:66` |
| `weather.observer.review` (JWT scope) | Human-only observer review | `BE:...Permissions.cs:90` |

All sit in one category: `CategoryId = 23`, level `project` (`BE:...Permissions.cs:9,44`). The release kit adds a footnote: one view permission covers all three products, but three narrower Settings grants share the family, and writes use different grants. Evidence: `RK:four-videos/_research/integration-and-devices.md:14`.

How it got here. On 2026-08-30 each product was given its own permission prefix (`df300aa`, test `278745d`). On 2026-09-07 to 09-10 Lightning and Gas were moved back onto the shared grant (`f542126`, `6ec8510`, `16addbf`) and the shared permissions moved to `Domain/Shared/Constants` (`3958a8e`). A reflection test now pins that no product owns a permission class. The product owner has said `lightningsensor:view` will not exist. Evidence: `BE:Wakecap.WeatherStation.IntegrationTests/Architecture/ProductPermissionCategoryTests.cs:70-74`; `WS:CLAUDE.md:67,69`.

### 3.9 Backend background services (7)

Registered in `CoreServiceRegistry` so a new product does not edit `Program.cs`. Evidence: `BE:Wakecap.WeatherStation.Core/CoreServiceRegistry.cs:110-111,134,171-175`.

| Service | Product | Job | Default cadence | Evidence |
|---|---|---|---|---|
| ObservationEvaluationBackgroundService | Weather | Record episodes that breach policy into an outbox | 30 s, batch 2,000 | `BE:Wakecap.WeatherStation.Core/Products/WeatherStation/SafetyPolicy/ObservationEvaluation.cs:37-49` |
| ObservationDispatchBackgroundService | Weather | Deliver outbox rows to the Observation Manager | 10 s, batch 100 | `BE:...Products/WeatherStation/Observation/ObservationDispatch.cs:72-74` |
| GasReadingsPollingBackgroundService | Gas | Poll the gas vendor cloud for devices and readings | 45 s | `BE:...Products/GasDetector/Configuration/GasPollingOptions.cs:75` |
| LightningQueueConsumerBackgroundService | Lightning | Drain two SQS queues (lightning, and the modbus-error fallback) by long-poll; a message it cannot handle is left for the dead-letter queue | continuous loop, 10 s error backoff | `BE:...Products/LightningSensor/Hosting/LightningQueueConsumerBackgroundService.cs:12-26,59-60,82-87,32` |
| LightningStalenessSweepBackgroundService | Lightning | Mark devices stale | 5 s | `BE:...Products/LightningSensor/Configuration/LightningSensorOptions.cs:34` |
| LightningDeviceSyncBackgroundService | Lightning | Register devices that already exist in the node registry | 1 hour | `BE:...Products/LightningSensor/Hosting/LightningDeviceSyncBackgroundService.cs:24`; `RK:four-videos/_research/integration-and-devices.md:28`; BE 9119736 |
| LightningObservationDispatchBackgroundService | Lightning | Deliver lightning observations | 5 s, batch 50 | `BE:...Products/LightningSensor/Services/LightningObservationDispatch.cs:45-46` |

The lightning staleness rule is 4 times the device heartbeat (3 times until 2026-09-22); a runbook and a frontend helper still say 3. Do not quote a multiplier. Evidence: `RK:four-videos/_research/integration-and-devices.md:16`.

### 3.10 Stores, tables and migrations

- Two database contexts: `WeatherStationDBContext` (app data, mutable) and `SensorsDbContext` (raw station readings, read-only). Evidence: `WS:wakecap-weather-station/WEATHER_STATION.md:60-62`; `BE:Wakecap.WeatherStation.Infrastructure/Database/SensorsDbContext.cs`.
- 33 EF entity configurations: WeatherStation 17 (including 4 observer tables), Gas 7, Lightning 5, Shared 4. Evidence: section 5.
- Gas tables: alert, device, push audit record, reading, sync state, threshold profile, zone. Lightning tables: observation, sensor event, sensor settings, state current, state interval. Shared tables: change request, project product, safety config audit log, user project dashboard layout. Evidence: `git -C $BE grep -l 'IEntityTypeConfiguration<' master -- 'Wakecap.WeatherStation.Infrastructure/*.cs' ':(exclude)Wakecap.WeatherStation.Infrastructure/Migrations/*'`.
- 43 migrations: 12 dated 2025 and 31 dated 2026. First `20250602121252_Initial-migration`. Lightning tables `20260830111011`. Gas `20260909070759`. Project product `20260914154605`. Lightning location `20261004101005` (last). Evidence: `git -C $BE ls-tree -r --name-only master -- Wakecap.WeatherStation.Infrastructure/Migrations | grep -E '/[0-9]{14}_.*\.cs$' | grep -v 'Designer\.cs$'`.
- A failing migration kills startup, so a serving backend is itself proof its migrations applied. Evidence: `WS:CLAUDE.md:64`.

### 3.11 Products at a glance (from the release kit)

| Product | Device and path | Who decides state | Cadence |
|---|---|---|---|
| Weather Station | station node, wireless mesh, gateway, cloud ingestion (sensors-service), time-series store, read by the backend and a status API | backend (online per indicator, health classes); sensors-service (station list) | portal polls 60 s; offline default 10 min |
| Lightning | warning unit through an input module on a mesh node, mesh, gateway, decoded to a queue (with a dead-letter queue), backend consumer | the device sends state; the backend decides stale | stale sweep 5 s; portal polls 30 s; only green is safe |
| Gas | vendor detectors, vendor cloud, WakeCap polls the vendor API; the push endpoint only acknowledges receipt | the backend raises alerts; the frontend derives SAFE, CHECK, ALERT | poll 45 s; detectors report about every 30 min; stale after 60 min |

Evidence: `RK:four-videos/_research/integration-and-devices.md:20-26`. The backend hops behind these paths are covered by other slices. Only the module names are used here.

### 3.12 What "one" means in code

| Claim | In code | Caveat |
|---|---|---|
| One shell | `App` renders header, rail, bar and outlet for every product (`FE:src/app/App.tsx:30-68`) | |
| One menu and header | `VerticalSideNav` and `ConnectedEnvHeader` | The portal's own left-rail entry "Connected Environment" is server data, seen live only as a tooltip frame (`RK:four-videos/final/1-connected-environment.script.md:53`) |
| One backend | one .NET service with `Shared/` and `Products/` | Weather station status still comes from sensors-service: 43 of 44 frontend endpoint builders use `WEATHER_STATION_API_URL`; the 44th (`getStatus`) uses `SENSORS_API_URL` (`FE:src/app/features/WeatherStation/contracts/apiUrls.ts:309-313`) |
| One view permission | `weatherstation:view` or `project_builder:manage` guards all three products' reads | Writes and Settings use other grants (3.8) |
| Per-project switches | `project_product` and the entitlement gates (3.6) | The backend product routes do not check it |
| One rule set | refuted: three separate rule implementations share one principle (unknown never reads as safe) | `RK:four-videos/_research/agent-and-control.md:33` |
| One audit trail | refuted: audit covers the weather policy only; lightning settings and gas zones have none | `RK:four-videos/_research/agent-and-control.md:34` |

### 3.13 Hops the presentation can animate

Page load (after): user, portal shell, `layout-configs` (vertex), microApps registry URL, CDN prefix `{ver}-ConnectedEnvironmentApp`, single-spa mount with `ldContext` and `ldClient`, app boot (query provider, i18n, Sentry tag, Ability store), `GET ProjectProduct`, rail rows and landing redirect, product screens call the one backend. Evidence: `MONO:packages/web/root-config/src/layout-config/layout-builder.ts:145-146`; `FE:src/wakecap-fe-connected-environment-app.tsx:114-139`; `FE:src/app/routes.tsx:94-104`; the pre-restructure sequence is in `WS:Weather Station Architecture/06-runtime-data-flow.mmd:18-27`.

Switching a product on: Settings, Connected Products, `PUT ProjectProduct` (needs `weatherstation:settingsProducts` or `project_builder:manage`), `project_product` row, frontend refetch, rail row appears. Evidence: `FE:src/app/features/Settings/routes.ts`; `BE:...ProjectProductController.cs:47-52`; `RK:four-videos/final/connected-environment-setup-tour.script.md` (section 4 of the tour; nothing was switched in the recording).

## 4. Plans in the docs, and what is done

### 4.1 The plan documents

| Document | Date | What it plans | Evidence |
|---|---|---|---|
| `Weather Station Architecture/` (report, 6 diagrams, evidence index, regression report) | 2026-07-14 | Three states: current (legacy ws only), coexistence (both routes live, config-only rollback), target (standalone frontend only; backend neutral reads, then MCP tools, then an agent, then the frontend). 12 risks. 9 ordered next steps. | `WS:Weather Station Architecture/README.md:3`; `.../weather-station-architecture-report.md:105-119,123-138,156-168`; `.../03-weather-station-target-state.dot:2,9` |
| `MIGRATION.md` (FE) | TAN-1779, June 2026, edited for naming on 2026-08-24 | File-by-file map from `@wakecap-fe/ws` to the new repo (36 rows), scaffold gaps, and the TAN-1778 scope. | `FE:MIGRATION.md:3-14,26-66,70-91,106-121` |
| `HELPERS_MIGRATION.md` (BE repo) | 2026-06-14 | Hand-off to move ws off the internal helpers package (16 files). | `BE:HELPERS_MIGRATION.md:1,117` |
| `docs/rollout-rollback.md` (FE) | updated 2026-10-01 | Additive rollout through layout-config data, config-only rollback. | `FE:docs/rollout-rollback.md:19-42,222-239` |
| `WEATHER-STATION-RESTRUCTURE-PLAN.md` (FE) | 2026-08-24 | Seven phases: move 220 files under `features/WeatherStation/`, delete 6 dead files, split 7 files, 925 relative imports, green baseline 114 suites and 1,763 tests. | `FE:WEATHER-STATION-RESTRUCTURE-PLAN.md:29,392-443,458` |
| `ConnectedEnvironment*Zero-OpenProgram.md` (workspace root) | 2026-08-27 (log 08-30) | 26 features in 6 working weeks (30 Aug to 8 Oct): Lightning 9, Gas 8, Weather and platform 9. 28 human gates. Milestone "WS Connected Environment" targeted 30 Sep. | `WS:ConnectedEnvironment*Zero-OpenProgram.md:3-4,12-24,148-181,240` |
| `specs/mediator-to-service-with-iscoped.md` (BE) | 2025-12-22 | Replace Mediator with services and IScoped registration. | `BE:specs/mediator-to-service-with-iscoped.md:1` |
| `release-deck/ws-release-2026-08.html` | 2026-08-10 | The v0.0.13 to v0.1.0 release story and a "Direction, not built yet" slide. | `WS:release-deck/ws-release-2026-08.html:199,205-215,345-353` |
| `claude-code-prompt-gas-module.md` | verified 2026-09-08 | Gas is one more feature of the same micro-app and one more product folder of the same backend. It supersedes a plan for a new connector service and a new micro-app. | `WS:claude-code-prompt-gas-module.md:13-15` |
| `AgentizationStrategy.md` (BE repo) | 2026-06-28 | Automating the engineering work (tests, CI, migrations). It is not a site AI. Do not cite it for product predictions. | `BE:AgentizationStrategy.md:3-9` |
| `prototypes/ws-connected-env` | 2026-08-30 | A design prototype of the shell: a sidebar with Weather Station and two Planned peers. | `WS:prototypes/ws-connected-env/README.md:5,24,35-36` |

### 4.2 Done and not done (code and docs only)

Verdicts: DONE, PARTIAL, NOT DONE, NOT CHECKED, NOT EVIDENCED (nothing in the repos or release kit either way), STALE (the doc is out of date). The word after each verdict is the status value (live, code, test, plan, vision).

**A. Architecture report next steps (2026-07-14)**

| Step | Verdict | Status | Evidence |
|---|---|---|---|
| 1 Reconcile the AgentSummary route | DONE | code | BE 2ae01da (2026-07-29); `BE:...Controllers/AgentSummaryController.cs:24` is a plain `[HttpGet]` |
| 2 Rotate and purge committed secrets | PARTIAL | code | BE 8402910 removed committed test credentials; BE ad959f8 redacted README connection strings. The release kit still flags tracked secret-like config files under `Wakecap.WeatherStation.Web.API/` (`RK:four-videos/_research/integration-and-devices.md:40`). Not opened. |
| 3 Contract test for heat-index bands in the payload | NOT CHECKED | | |
| 4 Permission hand-off through customProps | PARTIAL | code | Frontend consumer done (FE e28c054, `FE:src/app/providers/abilityPermissions.ts:19-26`). The shell sends only `ldContext` and `ldClient` (`MONO:packages/web/root-config/src/wakecap-fe-root-config.ts:134-137`); `git -C $MONO grep -c permissionsPromise origin/master -- packages/web/root-config` returns 0. The frontend falls back to the storage mirror. |
| 5 Backend neutral read endpoints | DONE | code | BE 5a72fc4, 9fc225a, 6b05c84; `WeatherStationsController` has 4 endpoints |
| 6 MCP read-only tools and an agent | DONE in code, no agent running | code | BE 45fb0cc; 33 tools; the human-approval invariant is test-pinned (`RK:four-videos/_research/agent-and-control.md:17-19`); production answers the MCP discovery and a 401 challenge, no connected agent evidenced (`RK:...agent-and-control.md:22-23`) |
| 7 Answer-first UI rollout | DONE | live | FE 16602bd; v0.1.0-production; flag default on (`RK:four-videos/_research/changes.md:39`); parity seen live 2026-07-14 (`WS:Weather Station Architecture/evidence-index.md:86-88`) |
| 8 Retire `/ws` | PARTIAL | code | Monorepo side done: MONO 4cff7ca34 is in `origin/master` and `packages/web/ws` is absent (`git -C $MONO ls-tree -d origin/master packages/web/ \| grep -c '/ws$'` returns 0). Production side unverified: the registry still served `@wakecap-fe/ws` 2.81.3-PORTAL on 2026-09-03 (`WS:CLAUDE.md:65`). |
| 9 Drift control for the vendored UI | NOT DONE | code | `FE:src/app/components/ui/MISSING.md` is still the only control; no scheduled diff found |

**B. Extraction migration map (`MIGRATION.md`)**

| Item | Verdict | Status | Evidence |
|---|---|---|---|
| Port every mapped file (36 rows) | DONE | code | FE commits 2026-06-27 to 06-30 (TAN-1778 to TAN-1813), see `git -C $FE log master --reverse --format='%h %ad %s' --date=short \| sed -n 3,27p` |
| Close the scaffold gaps (providers, dependencies, env keys) | DONE | code | dependencies in `FE:package.json` (react-query, i18next, echarts, yup, Sentry, LaunchDarkly); env keys `WEATHER_STATION_API_URL`, `SENSORS_API_URL` in `FE:webpack.config.js:126` |
| Route param `projId` and base `/weather-station` | DONE, then moved under `/connected-env` | code | `FE:src/app/routes.tsx:116` |

**C. Restructure plan (2026-08-24)**

| Item | Verdict | Status | Evidence |
|---|---|---|---|
| Phases 0 to 6 (delete 6 dead files, move four feature folders, 40 components, utils, constants, contracts, descriptors, route table, split translations) | DONE in one commit | code | FE 7532223: 220 renames, 6 deletions, 8 additions, 26 edits (`git -C $FE diff --name-status -M 7532223^ 7532223 \| cut -c1 \| sort \| uniq -c`). The message says it ran as the seven phases and was green at 116 suites and 1,763 tests, equal to the baseline (a runtime figure from the commit message, not re-run). The old folders `modules`, `lib`, `constants`, `configs`, `src/test/fixtures` hold 0 files on master. |
| Config framework must not import Weather Station (8.1) | PARTIAL | code | 5 of 8 imports removed in FE d7f6221; 3 remain (`FE:src/app/features/config/ConfigChangeEntries.tsx:4`, `ConfigConflictPanel.tsx:14`, `ConfigSection.tsx:29`) |
| 37 `weatherStation.*` copy keys inside the framework (8.2) | DONE | code | `git -C $FE grep -c 'weatherStation\.' master -- 'src/app/features/config/*.ts' 'src/app/features/config/*.tsx'` returns nothing |
| The plan's own header says nothing has been carried out | STALE | | `FE:WEATHER-STATION-RESTRUCTURE-PLAN.md:3`; the plan was added in the same commit that executed it |

**D. Backend restructure inside the Zero-Open Program (feature P1)**

| Item | Verdict | Status | Evidence |
|---|---|---|---|
| Types under `Shared/` or `Products/` guarded by architecture tests | DONE | code | BE 65d4a05; `BE:...Architecture/ProductFolderStructureTests.cs` |
| Per-product route area | DONE for Lightning and Gas; Weather Station keeps its old shape | code | `BE:...ApiProjectScopRouteAttribute.cs:111-119` |
| Per-product permission categories as the entitlement | NOT DONE as planned (done on 2026-08-30, reversed 09-07 to 09-10) | code | 3.8 |
| Entitlement through `project_product` | DONE, frontend-enforced | code | 3.6 |
| Analytics renamed to Connected Environment | DONE | code | FE d7f6221 (Mixpanel root key) |
| Feature-flag keys renamed to Connected Environment | PARTIAL | code | Gas keys `connected-env-gas*`; weather keys still `weather-station-*` (3.5) |
| Solution rename to `Wakecap.ConnectedEnvironment.*` | NOT DONE | plan | `WS:ConnectedEnvironment*Zero-OpenProgram.md:128,363`; `git -C $BE grep -l 'Wakecap.ConnectedEnvironment' master` returns nothing |

**E. Other feature groups in the Program (27 Aug) against code**

| Feature | Verdict | Status | Evidence |
|---|---|---|---|
| L1 lightning feed stored end to end | DONE | live | BE `LightningQueueConsumerBackgroundService`; Lightning screen seen live (`RK:internal-notes.md:15,32`) |
| L2 status page | DONE | live | same |
| L3 site-wide RED banner | DONE in code; never seen (no RED state) | code | `FE:src/app/App.tsx:61`; `RK:internal-notes.md:37` |
| L4 wallboard and L5 phone view | DONE, opened by URL | live | `RK:four-videos/_research/refresh-1.0.7.md:13`; `RK:four-videos/final/3-lightning.script.md` (Left out section) |
| L6 notifications to control room and safety staff | NOT DONE as planned | code | Email and SMS were added and removed on 2026-09-24 (BE 505e6d9, 367bf43). Replaced by observations to the Observation Manager on entry to Red, Fault or Offline (BE a88a668, 63b7886; `RK:four-videos/_research/agent-and-control.md:28`). |
| L7 stoppage reporting | PARTIAL | code | Alarm history and CSV seen (empty, CSV disabled) (`RK:internal-notes.md:16`); HSE reporting in BE c18e2d5 |
| L8 commissioning and L9 acceptance on site | NOT EVIDENCED | plan | physical and external; the site date is not stated anywhere (`RK:internal-notes.md:62`) |
| G1 vendor connection live, G2 fleet readings | DONE | live | Gas screens show live detector data (`RK:four-videos/_research/refresh-1.0.7.md:15-19`) |
| G3 alerts in seconds with acknowledgements sent back | PARTIAL | live | Acknowledge and close are recorded in WakeCap only; the page says so; the push endpoint only acknowledges receipt (`RK:four-videos/_research/integration-and-devices.md:9-10`) |
| G4 safety analytics computed by WakeCap (TWA, STEL) | NOT DONE | plan | the screen says so (`RK:four-videos/_research/integration-and-devices.md:12`) |
| G5 gas alerts through WakeCap notifications | NOT DONE | plan | gas is not built in the Observation Manager path (`RK:four-videos/_research/agent-and-control.md:28`) |
| G6 Gas app with five tabs | DONE as four tabs | live | Zones hidden in 1.0.5 (FE 95e1650; `RK:four-videos/_research/changes.md:31,33`) |
| G7 go-live switch | DONE | live | real data is the default since v1.0.1 (FE 31a3f80) |
| G8 pilot and sign-off | NOT EVIDENCED | plan | |
| P2 policy that can face an auditor | DONE for reading; staged publish not exercised | live and code | `RK:internal-notes.md:17-19,39` |
| P3 audit trail | PARTIAL | code | weather policy only (`RK:four-videos/_research/agent-and-control.md:34`) |
| P5 agent intelligence phase 2 | DONE in code, flag off | code | `RK:internal-notes.md:25,35`; `RK:four-videos/_research/changes.md:17,39` |
| P7 Arabic-ready weather screens | NOT DONE in the frontend | plan | English is the only locale: 6 translation files, all `en.ts` (`git -C $FE ls-tree -r --name-only master -- src \| grep -E 'translations/[^/]+\.ts$' \| grep -v test`) |
| P6 Weather Station on mobile | NOT IN THESE REPOS | plan | mobile app repo not read |

**F. Other**

| Item | Verdict | Status | Evidence |
|---|---|---|---|
| Replace Mediator with services | DONE | code | BE 0176f7c; 3.7 leftovers |
| Production stage environment for the new app | NOT DONE (as of 2026-09-06) | plan | `WS:DEFERRED.md:14-16`; last stage tag `v0.0.16-stage` on 2026-08-17 |
| A written, verified rollback call | NOT DONE | plan | `WS:DEFERRED.md:36` |
| Remove the Historical dashboard | DONE | code | FE 2d72101; BE f2d5edc; `FE:src/app/features/WeatherStation/policy/historicalDataRetired.test.ts` is the only Historical file left |

## 5. Build statistics (every number with its exact command)

Set the shorthands from section 0 first. The block below prints the headline numbers in about 20 seconds. It uses only read-only git and shell commands.

```
FE=/Users/admin/wc/weather-station/frontend-2.0-weather-station
BE=/Users/admin/wc/weather-station/wakecap-weather-station
MONO=/Users/admin/wc/frontend-2.0
sum() { awk -F: '{s+=$NF} END{print s+0}'; }
echo "fe_commits=$(git -C $FE rev-list --count master)"
echo "be_commits=$(git -C $BE rev-list --count master)"
echo "fe_tags=$(git -C $FE tag -l | wc -l | tr -d ' ')"
echo "fe_tags_prod=$(git -C $FE tag -l '*-production' | wc -l | tr -d ' ')"
echo "fe_tags_prod_CE=$(git -C $FE tag -l '*-ConnectedEnvironmentApp-production' | wc -l | tr -d ' ')"
echo "fe_ts_files=$(git -C $FE ls-tree -r --name-only master -- src | grep -E '\.(ts|tsx)$' | wc -l | tr -d ' ')"
echo "fe_test_files=$(git -C $FE ls-tree -r --name-only master -- src | grep -E '\.test\.(ts|tsx)$' | wc -l | tr -d ' ')"
echo "fe_lines_all=$(git -C $FE grep -c '' master -- 'src/*.ts' 'src/*.tsx' | sum)"
echo "fe_lines_nontest=$(git -C $FE grep -c '' master -- 'src/*.ts' 'src/*.tsx' ':(exclude)*.test.ts' ':(exclude)*.test.tsx' ':(exclude)*.stories.ts' ':(exclude)*.stories.tsx' | sum)"
echo "fe_testcases=$(git -C $FE grep -c -E '^[[:space:]]*(it|test)[(]' master -- 'src/*.test.ts' 'src/*.test.tsx' | sum)"
echo "fe_feature_folders=$(git -C $FE ls-tree -d --name-only master src/app/features/ | wc -l | tr -d ' ')"
echo "be_cs_files=$(git -C $BE ls-tree -r --name-only master | grep -c '\.cs$')"
echo "be_cs_lines=$(git -C $BE grep -c '' master -- '*.cs' | sum)"
echo "be_controllers=$(git -C $BE ls-tree -r --name-only master -- Wakecap.WeatherStation.Web.API | grep 'Controller\.cs$' | grep -vc WakecapController)"
echo "be_endpoints=$(git -C $BE grep -c -E '^[[:space:]]*\[Http(Get|Post|Put|Delete|Patch)' master -- 'Wakecap.WeatherStation.Web.API/*Controller.cs' | sum)"
echo "be_migrations=$(git -C $BE ls-tree -r --name-only master -- Wakecap.WeatherStation.Infrastructure/Migrations | grep -E '/[0-9]{14}_.*\.cs$' | grep -vc 'Designer\.cs$')"
echo "be_fact=$(git -C $BE grep -c -E '^[[:space:]]*\[Fact' master -- 'Wakecap.WeatherStation.IntegrationTests/*.cs' | sum)"
echo "be_theory=$(git -C $BE grep -c -E '^[[:space:]]*\[Theory' master -- 'Wakecap.WeatherStation.IntegrationTests/*.cs' | sum)"
echo "be_hosted=$(git -C $BE grep -c 'AddHostedService<' master -- Wakecap.WeatherStation.Core/CoreServiceRegistry.cs | sum)"
echo "be_mcp_tools=$(git -C $BE grep -c 'McpServerTool(' master -- 'Wakecap.WeatherStation.Web.API/Mcp/Tools/*.cs' | sum)"
echo "mono_ws_commits=$(git -C $MONO rev-list --count origin/master -- packages/web/ws)"
```

Expected output: 348, 447, 184, 81, 59, 730, 311, 134625, 58824, 3238, 6, 799, 149152, 28, 67, 43, 1344, 164, 7, 33, 36.

Note on the regex: use `[[:space:]]` and `[(]` as shown. On this machine's git, `\s` with a group in `-E` matches nothing and gives a false 0.

### 5.1 Git history

| Number | Value | Command |
|---|---|---|
| FE commits on master | 348 | `git -C $FE rev-list --count master` |
| BE commits on master | 447 | `git -C $BE rev-list --count master` |
| FE first commit date | 2026-06-23 | `git -C $FE log master --reverse --format=%ad --date=short \| head -1` |
| BE first commit date | 2025-05-25 | `git -C $BE log master --reverse --format=%ad --date=short \| head -1` |
| Legacy ws commits (monorepo path) | 36 | `git -C $MONO rev-list --count origin/master -- packages/web/ws` |
| FE tags, production, CE production, testing, stage | 184, 81, 59, 87, 16 | `git -C $FE tag -l \| wc -l`; `... tag -l '*-production' \| wc -l`; `... '*-ConnectedEnvironmentApp-production'`; `... '*-testing'`; `... '*-stage'` |
| BE tags | 8 | `git -C $BE tag -l \| wc -l` |
| FE commits between v0.1.0 and v1.0.7 production tags | 237 | `git -C $FE rev-list --count v0.1.0-production..v1.0.7-ConnectedEnvironmentApp-production` |
| BE commits since stable-1.6.0-rc.1 | 156 | `git -C $BE rev-list --count stable-1.6.0-rc.1..master` |
| FE and BE merge commits | 36 and 87 | `git -C $R rev-list --merges --count master` |
| Contributors (counts only) | FE 7, BE 11 | `git -C $R shortlog -s master \| wc -l` |
| Ticket-linked commit subjects | FE 203, BE 168 | `git -C $R log master --format=%s \| grep -cE '(TAN\|SUPRT\|WCA\|ALU\|NEM\|SAI\|DUB\|WC3)-[0-9]+'` |
| Restructure commit size, FE rename | 18 files | `git -C $FE show --shortstat 5cd97d2` |
| Restructure commit size, FE consolidate | 260 files, +2,644, -1,999; 220 renames | `git -C $FE show --shortstat 7532223`; `git -C $FE diff --name-status -M 7532223^ 7532223 \| cut -c1 \| sort \| uniq -c` |
| FE finish-rename commit | 181 files, +4,347, -2,147 | `git -C $FE show --shortstat d7f6221` |
| BE restructure commit | 345 files, +1,246, -834 | `git -C $BE show --shortstat 65d4a05` |
| Monthly and weekly counts | see 2.4 and 2.5 | commands there |

### 5.2 Frontend (`master` 83b4d8d)

| Number | Value | Command |
|---|---|---|
| Tracked files | 840 | `git -C $FE ls-tree -r --name-only master \| wc -l` |
| TypeScript files under `src/` (ts and tsx) | 730 | `git -C $FE ls-tree -r --name-only master -- src \| grep -E '\.(ts\|tsx)$' \| wc -l` |
| Test files | 311 | `... \| grep -E '\.test\.(ts\|tsx)$' \| wc -l` |
| Stories files | 13 | `... \| grep -E '\.stories\.(ts\|tsx)$' \| wc -l` |
| Source files (not test, not stories) | 406 | `... \| grep -E '\.(ts\|tsx)$' \| grep -vE '\.test\.\|\.stories\.' \| wc -l` |
| TS lines under `src/` | 134,625 | `git -C $FE grep -c '' master -- 'src/*.ts' 'src/*.tsx' \| sum` |
| Source lines (not test, not stories) | 58,824 | the same with the four `:(exclude)` pathspecs in 2.7 |
| Test lines | 74,655 | `git -C $FE grep -c '' master -- 'src/*.test.ts' 'src/*.test.tsx' \| sum` |
| TS only (not d.ts), d.ts, TSX lines across the repo | 45,395; 50; 89,221 | `git -C $FE grep -c '' master -- '*.ts' ':(exclude)*.d.ts' \| sum`; `'*.d.ts'`; `'*.tsx'` |
| Other text | Markdown 2,983 lines in 26 files; YAML 293 lines; JSON 639 lines in 17 files; CSS 113 lines in `src/` | `git -C $FE grep -c '' master -- '*.md' '*.mdx' \| sum`; `'*.yml' '*.yaml' ':(exclude)pnpm-lock.yaml'`; `'*.json'`; `'src/*.css'` |
| Test cases (static `it(` and `test(`) | 3,238 | `git -C $FE grep -c -E '^[[:space:]]*(it\|test)[(]' master -- 'src/*.test.ts' 'src/*.test.tsx' \| sum` |
| `it.each` and `test.each` calls (expand at run time) | 204 | `... '^[[:space:]]*(it\|test)[.]each'` |
| `describe(` blocks | 1,010 | `... '^[[:space:]]*describe[(]'` |
| Skipped tests | 0 | `... '^[[:space:]]*(it\|test)[.](skip\|todo)'` |
| Feature folders | 6 | `git -C $FE ls-tree -d --name-only master src/app/features/ \| wc -l` |
| API URL builders (all features) | 44: WeatherStation 28, Gas 7, Lightning 6, Settings 2, Reports 1 | `for f in $(git -C $FE ls-tree -r --name-only master -- src/app/features \| grep 'contracts/apiUrls.ts$'); do git -C $FE show master:$f \| grep -cE '^  [A-Za-z0-9_]+:'; done` |
| Builders on the main backend vs sensors-service | 43 and 1 | `git -C $FE grep -h -o -E '\{\{[A-Z_]+_API_URL\}\}' master -- 'src/app/features/*/contracts/apiUrls.ts' \| sort \| uniq -c` |
| Route entries | 19 (14 screens, 4 redirects, 1 catch-all) | counted by hand from `FE:src/app/routes.tsx` and the five route files in 3.3 |

Per module (source files and lines, then test files and cases). Pattern for one module: `git -C $FE grep -c '' master -- 'src/app/features/<M>/*.ts' 'src/app/features/<M>/*.tsx' ':(exclude)*.test.ts' ':(exclude)*.test.tsx' ':(exclude)*.stories.ts' ':(exclude)*.stories.tsx' | sum`. Test cases: `git -C $FE grep -c -E '^[[:space:]]*(it|test)[(]' master -- 'src/app/features/<M>/*.test.ts' 'src/app/features/<M>/*.test.tsx' | sum`.

| Module `<M>` | Source files | Source lines | Test files | Test cases |
|---|---|---|---|---|
| WeatherStation | 171 | 32,667 | 171 | 1,907 |
| LightningSensor | 62 | 6,030 | 58 | 443 |
| Gas | 64 | 8,716 | 23 | 302 |
| Settings | 17 | 1,325 | 4 | 32 |
| Reports | 14 | 735 | 2 | 13 |
| config | 11 | 3,195 | 9 | 124 |
| outside `features/` | | | | 417 |

### 5.3 Backend (`master` 352195f)

| Number | Value | Command |
|---|---|---|
| Tracked files | 904 | `git -C $BE ls-tree -r --name-only master \| wc -l` |
| C# files and lines (all) | 799 and 149,152 | `git -C $BE ls-tree -r --name-only master \| grep -c '\.cs$'`; `git -C $BE grep -c '' master -- '*.cs' \| sum` |
| Production C# lines without migrations, tests, tools | 53,761 | the `$REF` command in 2.7 with `master` |
| Migration C# lines | 33,611 | `git -C $BE grep -c '' master -- 'Wakecap.WeatherStation.Infrastructure/Migrations/*.cs' \| sum` |
| Test project C# files and lines | 187 and 61,477 | `git -C $BE ls-tree -r --name-only master -- Wakecap.WeatherStation.IntegrationTests \| grep -c '\.cs$'`; `git -C $BE grep -c '' master -- 'Wakecap.WeatherStation.IntegrationTests/*.cs' \| sum` |
| Lines per project (Web.API, Core, Domain, Infrastructure, Contracts, SharedKernel) | 6,973; 28,627; 3,164; 42,041; 6,225; 342 | `git -C $BE grep -c '' master -- 'Wakecap.WeatherStation.<P>/*.cs' \| sum` |
| Other file types | 27 Markdown (5,599 lines), 21 JSON, 9 csproj, 10 YAML (760 lines) | `git -C $BE ls-tree -r --name-only master \| awk -F/ '{print $NF}' \| sed -E 's/^.*\.([A-Za-z0-9]+)$/\1/' \| sort \| uniq -c \| sort -rn` |
| Controllers | 28 | `git -C $BE ls-tree -r --name-only master -- Wakecap.WeatherStation.Web.API \| grep 'Controller\.cs$' \| grep -vc WakecapController` |
| Endpoints (HTTP attributes) | 67: 45 GET, 11 POST, 10 PUT, 1 DELETE | `git -C $BE grep -c -E '^[[:space:]]*\[Http(Get\|Post\|Put\|Delete\|Patch)' master -- 'Wakecap.WeatherStation.Web.API/*Controller.cs' \| sum`; per verb change the group |
| Endpoints per module | WeatherStation 34, Lightning 10, Gas 11, Shared 12 | same command with `-- 'Wakecap.WeatherStation.Web.API/Products/WeatherStation/*Controller.cs'` and so on |
| EF migrations | 43 (12 in 2025, 31 in 2026) | command in 3.10 |
| EF entity configurations | 33 | `git -C $BE grep -l 'IEntityTypeConfiguration<' master -- 'Wakecap.WeatherStation.Infrastructure/*.cs' ':(exclude)Wakecap.WeatherStation.Infrastructure/Migrations/*' \| wc -l` |
| Hosted services | 7 | `git -C $BE grep -c 'AddHostedService<' master -- Wakecap.WeatherStation.Core/CoreServiceRegistry.cs` |
| MCP tools | 33 (26 read-only, 4 propose, 3 observer writes) | `git -C $BE grep -c 'McpServerTool(' master -- 'Wakecap.WeatherStation.Web.API/Mcp/Tools/*.cs' \| sum`; read-only: same with `'ReadOnly = true'` (26); propose: `git -C $BE show master:Wakecap.WeatherStation.Web.API/Mcp/McpToolNames.cs \| grep -c '"propose_'` (4) |
| Solution projects | 9 | `git -C $BE show master:Wakecap.WeatherStation.sln \| grep -cE '^Project\('` |
| Test files containing a test | 157 | `git -C $BE grep -l -E '^[[:space:]]*\[(Fact\|Theory)' master -- 'Wakecap.WeatherStation.IntegrationTests/*.cs' \| wc -l` |
| `[Fact]`, `[Theory]`, `[InlineData]` | 1,344; 164; 630 | `git -C $BE grep -c -E '^[[:space:]]*\[Fact' master -- 'Wakecap.WeatherStation.IntegrationTests/*.cs' \| sum` (and `Theory`, `InlineData`) |
| Tests under Lightning and Gas folders | Lightning 19 files, 134 Fact, 16 Theory; Gas 22 files, 176 Fact, 34 Theory; Architecture 4 files, 14 Fact, 2 Theory; Shared 2 files, 11 Fact, 3 Theory | the Fact and Theory commands with `-- 'Wakecap.WeatherStation.IntegrationTests/Products/LightningSensor/*.cs'` and so on |
| Files and lines per module (five layers) | WeatherStation 223 and 24,917; Lightning 55 and 5,731; Gas 43 and 5,646; Shared 79 and 6,580; Mcp 23 and 2,734 | `for p in Web.API Core Domain Infrastructure Contracts; do git -C $BE grep -c '' master -- "Wakecap.WeatherStation.$p/Products/GasDetector/*.cs"; done \| sum` (swap the product; for Shared use `Shared`; for Mcp use `Wakecap.WeatherStation.Web.API/Mcp/*.cs`) |

### 5.4 The legacy module just before removal (`d2e0962bf`, parent of `4cff7ca34`)

| Number | Value | Command |
|---|---|---|
| Tracked files | 47 | `git -C $MONO ls-tree -r --name-only d2e0962bf -- packages/web/ws \| wc -l` |
| TS and TSX files and lines under `src/` | 39 and 3,725 | `git -C $MONO ls-tree -r --name-only d2e0962bf -- packages/web/ws/src \| grep -cE '\.(ts\|tsx)$'`; `git -C $MONO grep -c '' d2e0962bf -- 'packages/web/ws/src/*.ts' 'packages/web/ws/src/*.tsx' \| sum` |
| Test files | 1 | `git -C $MONO ls-tree -r --name-only d2e0962bf -- packages/web/ws \| grep -cE '\.test\.(ts\|tsx)$'` |
| Portal packages left on origin/master | 7 (admin, map-tools, nav, om, pm, root-config, worker-signup) | `git -C $MONO ls-tree -d --name-only origin/master packages/web/` |

## 6. Status board

Production facts below were seen in captures of 4 Oct 2026 (build 1.0.3 in the first kit, 1.0.5 then 1.0.7 in the later work). The later refresh says Weather Station, Reports, Settings and Gas screens did not change between 1.0.5 and 1.0.7; only two Lightning commits did. Evidence: `RK:four-videos/_research/refresh-1.0.7.md:3-6`; `RK:four-videos/final/README.md:3,24`; `RK:internal-notes.md:7`.

### 6.1 live (seen in production)

| Item | Evidence |
|---|---|
| The portal's left rail has a "Connected Environment" entry (sun-and-cloud icon with a tooltip) | `RK:release-note.md:14`; `RK:four-videos/final/1-connected-environment.script.md:53` |
| Rail inside the area: Weather Station, Gas, Lightning, Reports, Settings, and Trends marked Planned; collapsible | `RK:internal-notes.md:23`; `RK:release-note.md:18,29`; `RK:four-videos/_research/changes.md:8` |
| Header with a live clock; every time shown in Saudi time (confirmed with the browser set to Los Angeles time) | `RK:internal-notes.md:24,32`; `RK:release-note.md:27` |
| Connected Products: Active or Inactive per product, three projects with three different sets (not toggled) | `RK:internal-notes.md:20`; `RK:four-videos/final/1-connected-environment.script.md:30,34` |
| Weather Station: verdict strip, Heat Index with work, rest and water, data as of, station health (3 stations, 1 offline, Not ready), steps and details drawers | `RK:internal-notes.md:32`; `RK:four-videos/final/1-connected-environment.script.md:36-37` |
| Reports: Maximum Values Report with tiles, daily table and an Export .xlsx button (download not clicked) | `RK:internal-notes.md:14,32,40` |
| Safety Policy: limits, 30-day "would have stopped work" preview, band ribbon and cards, NOAA method, Change history tab (read only) | `RK:internal-notes.md:17,19,32` |
| Lightning: All Clear tile, zone rings, backup banner, alarm activity and history (empty), Settings radii; wallboard and phone views opened by URL | `RK:internal-notes.md:15,16,32`; `RK:four-videos/_research/refresh-1.0.7.md:8-13` |
| Gas: Overview, Detectors, Alerts (with Closed rows), Compliance; header status line | `RK:four-videos/_research/refresh-1.0.7.md:15-19`; `RK:four-videos/final/1-connected-environment.script.md:40-44` |
| Backend: Gas acknowledge and close is deployed (three alerts changed to Closed during the work) | `RK:four-videos/_research/refresh-1.0.7.md:17-18` |
| Backend: the MCP discovery document and a 401 challenge answer at `services.wakecap.com/weather-station/mcp`; other routes answer 401 or 405 | `RK:four-videos/_research/agent-and-control.md:22` |
| Production serves front end 1.0.7 (public runtime-config, checked 16:34 and 17:00 on 2026-10-04) | `RK:four-videos/_research/refresh-1.0.7.md:4` |
| Production registry (2026-09-03): `@wakecap-fe/connected-environment-app` 0.0.3 beside `@wakecap-fe/weather-station-app` 0.1.6 and `@wakecap-fe/ws` 2.81.3 | `WS:CLAUDE.md:65` |
| The extracted micro-app and the legacy route were compared side by side in production (identical cards, legend, gear, charts) | `WS:Weather Station Architecture/evidence-index.md:86-88` |

### 6.2 test (deployed to the test environment only)

| Item | Evidence |
|---|---|
| First build under the new name went to testing on 2026-08-26 (`v1.0.0-testing`), a week before the first production tag | tag v1.0.0-testing; tag v0.0.3-ConnectedEnvironmentApp-production |
| On 2026-09-03 the testing registry carried only `@wakecap-fe/connected-environment-app` 2.1.9; testing tags reached v2.1.39 on 2026-10-04 (same commit as the v1.0.6 production tag) | `WS:CLAUDE.md:65`; `git -C $FE tag -l '*-ConnectedEnvironmentApp-testing'` |

No item could be shown as test-only today. The test environment was not queried.

### 6.3 code (in master, deploy not verified)

| Item | Evidence |
|---|---|
| Agent-composed dashboard, "Recommended for this situation", "Charts for this situation", Observations drawer with Request approval. Flag `weather-station-agent-dashboard-composition` is off by default. | `RK:four-videos/_research/changes.md:17,39`; `RK:internal-notes.md:25,35` |
| Staged edit, review and publish, loosening gate, version-checked edits, conflict panel (seen read-only, never exercised) | `RK:four-videos/_research/changes.md:16`; `RK:internal-notes.md:18,39` |
| Lightning RED banner and red-frame flash on a real RED only; the simulate switch is disabled in production builds | `RK:four-videos/_research/changes.md:22`; `RK:internal-notes.md:37` |
| Lightning state entry to Red, Fault or Offline raises an Observation Manager observation | `RK:four-videos/_research/agent-and-control.md:28`; BE a88a668, 63b7886 |
| Backend `Shared/` and `Products/` layout, route areas and architecture tests | 3.7 |
| MCP with 33 tools (26 read, 4 propose, 3 observer bookkeeping), human-approval boundary pinned by tests | `WS:wakecap-weather-station/WEATHER_STATION.md:84`; `RK:four-videos/_research/agent-and-control.md:9,17-19`; section 5.3 |
| Observer control plane and agent observations with a second approver | `RK:four-videos/_research/agent-and-control.md:13-14` |
| Seven background services | 3.9 |
| Trends Planned row removed from the rail (master only, one commit after v1.0.7) | FE 83b4d8d |
| Legacy URL redirect `/weather-station/*` to `/connected-env/weather-station/*` | `FE:src/app/routes.tsx:186-212` |
| Backend deploy of the 2026-10-04 commits (Lightning location and others) | `RK:internal-notes.md:8,69` (not verified) |

### 6.4 plan (documented intent, not built or reversed)

| Item | Evidence |
|---|---|
| Rename the backend solution to `Wakecap.ConnectedEnvironment.*` | `WS:ConnectedEnvironment*Zero-OpenProgram.md:128,363` |
| Gas safety analytics computed by WakeCap (TWA, STEL, exposure, compliance) | `WS:ConnectedEnvironment*Zero-OpenProgram.md:116`; `RK:four-videos/_research/integration-and-devices.md:12` |
| Gas alerts through WakeCap notifications; Observation Manager coverage for Gas | `WS:ConnectedEnvironment*Zero-OpenProgram.md:118`; `RK:four-videos/_research/agent-and-control.md:28` |
| Gas acknowledgements written back to the vendor | `WS:ConnectedEnvironment*Zero-OpenProgram.md:114`; `RK:four-videos/_research/integration-and-devices.md:9` |
| Lightning notifications to control room and safety staff (replaced by observations) | `WS:ConnectedEnvironment*Zero-OpenProgram.md:100`; BE 367bf43 |
| Arabic-ready weather screens | `WS:ConnectedEnvironment*Zero-OpenProgram.md:140`; section 4.2 E |
| Shell hand-off of permissions (customProps) | 4.2 A step 4 |
| Stage environment for the new app; a verified rollback call | `WS:DEFERRED.md:16,36` |
| Production clean-up of the legacy registry keys | 4.2 A step 8 |
| Site commissioning, customer acceptance, gas pilot sign-off | `WS:ConnectedEnvironment*Zero-OpenProgram.md:104-108,124`; no date stated (`RK:internal-notes.md:62`) |

### 6.5 vision (nobody built it)

| Item | Evidence |
|---|---|
| Suggestions with memory: compare a reading with past values and the same time last year | `WS:release-deck/ws-release-2026-08.html:350`; `git -C $FE grep -l -i 'same time last year' master` and the same in `$BE` return nothing |
| Forecasting: "it will be dangerous at 14:00" | `WS:release-deck/ws-release-2026-08.html:351`; no source hit for "forecast" in either repo |
| Per-worker suggestions through a clinical service | `WS:release-deck/ws-release-2026-08.html:352`; no source hit |
| A WhatsApp bot that pushes the dashboard to a customer safety group | `WS:release-deck/ws-release-2026-08.html:353`; the only source hit is a code comment (`FE:src/app/features/WeatherStation/agent-dashboard/components/RecommendedActionFlow.tsx:68`) |
| A running AI assistant on any site; assistant tools for Lightning or Gas (none exist) | `RK:four-videos/final/README.md:16`; `RK:four-videos/_research/agent-and-control.md:6,9` |
| "New products go under Connected Environment" as direction with no dates | `RK:presentation/README.md:19-20` |

## 7. Docs that lag the code (do not quote these as current)

| Doc | What it says | What the code shows | Evidence |
|---|---|---|---|
| `FE:WEATHER-STATION-RESTRUCTURE-PLAN.md:3` | "Nothing in it has been carried out" | All seven phases landed on 2026-08-24 | FE 7532223 |
| `FE:README.md:3` | Weather Station is the one feature the app hosts | Six feature folders; Lightning, Gas, Reports, Settings exist | section 5.2 |
| `FE:README.md:209` | route file is `routes.tsx` | it is `routes.ts` | `git -C $FE ls-tree -r --name-only master -- src/app/features/WeatherStation \| grep 'routes'` |
| `BE:README.md` and `BE:WEATHER_STATION.md` | Describe one product, a flat layout and the legacy ws frontend | `Products/` and `Shared/`; Lightning and Gas modules | `git -C $BE show master:README.md \| grep -ciE 'lightning\|gas'` returns 0 |
| `WS:BLOCKED.md` (2026-08-31) | Lightning infrastructure and image waiting on approvals | Lightning All Clear was seen in production on 4 Oct | `RK:internal-notes.md:32` |
| `WS:DEFERRED.md:13,24-25` | Lightning permission gate is a temporary bypass | no TEMPORARY gate remains; `lightningsensor:view` appears only in one test name | `git -C $FE grep -n 'lightningsensor:view' master -- src`; `WS:CLAUDE.md:67` |
| `WS:DEFERRED.md:26,31,33,42,44` | Historical dashboard items | the Historical tab was removed on 2026-09-16 | FE 2d72101 |
| `FE:MIGRATION.md:10-14` | Source and target paths use the pre-restructure folders | folders moved on 2026-08-24 | FE 7532223 |
| Lightning Settings intro line | "radii the alerting service uses" | the backend treats the radii as display-only | `FE:src/app/features/Settings/translations/en.ts` (lightning.description); `RK:four-videos/_research/refresh-1.0.7.md:12` |
| August deck, MCP | "16 tools" | 33 tools | `WS:release-deck/ws-release-2026-08.html:336`; section 5.3 |

## 8. Gaps (what this sheet could not settle)

1. No network was used. The live import map, the layout-config route entry, LaunchDarkly values and every production endpoint were not read. All "live" statuses come from the release kit records of 4 Oct 2026. The kit's first notes say build 1.0.3; the later refresh says 1.0.7. Both are recorded.
2. The portal menu entry, the `connected-env` route entry and the registry keys are server data. They are in none of the 12 sibling repos searched (checked-out HEAD only; the monorepo was searched on `origin/master`).
3. Monorepo facts read the local `origin/master` ref (tip 2026-09-30). The local `master` there is stale. Nothing was fetched.
4. Test counts are static counts of source. Runtime counts were not measured. The only runtime numbers are in a commit message (116 suites, 1,763 tests on 2026-08-24; 1,771 after the route commit).
5. Backend deploy state is unknown for most of master. Gas acknowledge and close is the only backend change shown live.
6. FE tags are lightweight. Tag dates are commit dates. The first date a customer could see the new name is not recorded in any repo.
7. Which projects have which products on is not in the repos. The three Project A, B, C labels come from the release kit.
8. The registry state for stage and for the legacy keys after 2026-09-03 and 2026-09-06 was not re-checked. `WS:CLAUDE.md:65` says to re-check the date before relying on it.
9. Tracked config files with secret-like names exist under `Wakecap.WeatherStation.Web.API/`. They were not opened. Their contents are unknown.
10. Not read in depth: `.audit-trail-progress.md`, the `GAPS*.md` bodies, `Running Cost/`, the prototype source, and the mobile repo. `Weather Station Architecture` PNG and PDF files were not read (text sources only). `docs-archive/` was not read by rule.
11. Linear milestone percentages and ticket states were not used, by rule. A few commit subjects carry ticket keys as labels only.
12. Adoption, project counts and user counts are not in any repo.
13. Items marked NOT CHECKED in 4.2 (for example the heat-index payload contract test) were not looked up.

## 9. Animatable sets (ready-made lists)

- Eras: E0 to E6 (2.1).
- Names that changed: package, import-map key, deploy prefix, tag format, class prefix, route, analytics key, rail label (2.3).
- Products: Weather Station, Lightning, Gas, with Reports and Settings as supporting areas (3.5).
- Rail rows: Weather Station, Gas, Lightning, Reports, then a separator and Settings (3.4).
- Route entries: 19 (3.3).
- Backend modules: WeatherStation, LightningSensor, GasDetector, Shared, Mcp (3.7).
- Scopes: 8 (3.8). Background services: 7 (3.9). Switches: 3 booleans (3.6).
- Growth curves: monthly commits (2.4), weekly commits (2.5), snapshots (2.7).
- Counts: 6 feature folders, 28 controllers, 67 endpoints, 43 migrations, 33 entity configs, 33 MCP tools, 311 FE test files, 187 BE test-project C# files (157 hold tests), 3,238 FE test cases, 1,344 `[Fact]` plus 164 `[Theory]` in the BE.

## 10. Files read for this sheet

Workspace: `Weather Station Architecture/` (README, evidence index, report, regression report, diagrams 01 to 06 text sources), `ConnectedEnvironment*Zero-OpenProgram.md`, `CLAUDE.md`, `DEFERRED.md`, `BLOCKED.md`, `release-deck/ws-release-2026-08.html`, `claude-code-prompt-gas-module.md`, `prototypes/ws-connected-env` (README and intent head).

FE repo: `WEATHER-STATION-RESTRUCTURE-PLAN.md`, `MIGRATION.md`, `README.md`, `docs/rollout-rollback.md`, `docs/side-by-side-regression.md`, headings of the other docs, `package.json`, `webpack.config.js`, `tailwind.config.js`, `.github/workflows/main.yml` and `pull-request.yml`, and the source files cited in section 3 (read through git).

BE repo: `WEATHER_STATION.md`, `README.md` (headings and counts), `HELPERS_MIGRATION.md`, `AgentizationStrategy.md` and `specs/` (headings), the source files cited in section 3 (read through git). No `appsettings*`, `.env`, key, token or state file was opened.

Release kit: `internal-notes.md`, `release-note.md`, `four-videos/_research/{changes,integration-and-devices,agent-and-control,refresh-1.0.7}.md`, `four-videos/_research/changes.json` (item list), `four-videos/final/README.md`, `1-connected-environment.script.md`, `connected-environment-setup-tour.script.md`, the Left-out sections of the product scripts, `presentation/README.md` and `presenter-guide.md` (head).

Monorepo: `packages/web/root-config` and `packages/web/ws` through git, read-only.
