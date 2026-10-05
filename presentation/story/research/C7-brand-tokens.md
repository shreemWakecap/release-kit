# C7 brand tokens: fact sheet

Slice C7-brand-tokens. Built 2026-10-05 from text sources only. Read only: no image was opened, no network call was made, no .env, appsettings, key or credential file was read, no repo was changed. No customer or people names appear.

Status tags: [live] seen working in production (release kit, build 1.0.7, 4 Oct 2026). [code] in code, deploy not verified by me. [test] test environment only. [plan] documented intent. [vision] nobody built it. [stat] published statistic. "derived" means I computed it from code values with a plain arithmetic script (command given).

Path aliases used in every Evidence line:

- CE = /Users/admin/wc/weather-station/frontend-2.0-weather-station (Connected Environment frontend)
- PORTAL = /Users/admin/wc/frontend-2.0 (portal shell monorepo)
- KIT = /Users/admin/wc/weather-station/release-kit
- WSTACK = /Users/admin/wstack (internal tooling, not a product)
- MOBILE = /Users/admin/wc/mobile/flutter_wakecap
- OMV2 = /Users/admin/wc/Observation-Manager-V2
- BE = /Users/admin/wc/weather-station/wakecap-weather-station
- WCORE = WSTACK/design/wakecore/packages/core-tokens.tgz (read with `tar -xzOf`, nothing extracted)

## 1. Read this first

1. Three different oranges live in WakeCap material. Portal, mobile app and e-mails use `#D46514`. The Connected Environment (CE) app uses Tailwind orange-600 `#EA580C` (its CSS variable computes to `#E9590C`). The release kit and wstack tooling use `#FF8300`. `#FF8300` is in zero product repos. [code]
2. CE status is a three colour system with words: green (safe), amber (check, caution), red (alert, danger). Offline is red in Weather Station and Lightning, amber in Gas. There is no grey for offline in code. Grey means "no reading, no station, unknown". [code]
3. Heat index bands have their own ramp: deep green, green, yellow, orange, red, black-red. The band called Danger is orange `#F39A1F`. Extreme Danger is red `#F90D0D`. The word Danger on the safety strip is red. Do not mix them. [code]
4. Font: the portal loads Inter (300 to 700) and CE inherits it. The Wakecore design system uses Figtree. The release kit uses Inter. The existing deck uses Arial. [code]
5. CE has no logo by design. The portal top bar uses a PNG logo. The WakeCap mark exists as SVG in the Observation Manager export preview, in OMV2 and in the mobile app; an orange copy is at `WSTACK/docs/assets/favicon.svg`. [code]
6. CE is light only. Any dark presentation is a deliberate step away from the product. Closest in-family dark values: kit black `#000` and `#0C0C0C`, or Wakecore warm charcoal `#141210`. [code]
7. Brand rule conflict to decide on purpose: the sellit brand rules say no glow and no gradients. The brief asks for shining lights. [plan]
8. The product keeps motion for one moment, the stop-work state: a 1.4 s red flash. Mirror that only for Danger. [code]

## 2. What was read (snapshot, so every fact can be re-checked)

| Source | Ref | Commit and date | Check |
|---|---|---|---|
| CE | master | 83b4d8d, 2026-10-05T12:47:04+03:00 | `git -C CE rev-parse --abbrev-ref HEAD; git -C CE log -1 --format='%h %cI'` |
| CE production tag | v1.0.7-ConnectedEnvironmentApp-production | 8f3bf01, 2026-10-04T15:58:28+03:00 | `git -C CE diff --stat v1.0.7-ConnectedEnvironmentApp-production HEAD -- tailwind.config.js src/app/index.css` prints nothing. Same for ConnectedEnvHeader, ConnectedEnvTabs, Card, Badge, Button, Switch, cardState, stationState, severity, SafetySummaryStrip, LightningRedBanner, gasState, gasStateVisual, gasDerivations, lightningVisuals, HeatIndexCard, both heat colour files and `public/assets/images/sun-cloud.svg`. Only `VerticalSideNav.tsx` differs (1 later commit, 83b4d8d). |
| PORTAL | branch ftr/TAN-2168-warn-device-count-on-space-delete (not master) | a8e66e05e, 2026-08-12T12:55:55+03:00 | local origin/master ref (last fetch) is a5907a0e5, 2026-09-30T13:13:58+03:00. `git -C PORTAL diff --stat HEAD origin/master -- packages/web/nav/src/app/components/SideNavV2 packages/web/nav/src/app/components/Header packages/shared/CapUI/src/scss/abstracts/_variables.scss packages/shared/CapUI/src/scss/mixins/_navlink.scss packages/web/root-config/src/index.ejs packages/shared/ui/tailwind.config.js` prints nothing. |
| BE | feature branch, HEAD 5cd5335 (2026-10-04T13:32:57+03:00); local master 352195f (2026-10-04T13:15:22+03:00) | heat band seed file | `git -C BE diff --stat master HEAD -- Wakecap.WeatherStation.Infrastructure/InfrastructureServiceRegistry.cs` prints nothing |
| MOBILE | feature branch | 1d3779f22, 2026-08-26T17:24:42+03:00 | `git -C MOBILE log -1 --format='%h %cI'` |
| OMV2 | main | 32602ca, 2026-02-18T11:40:57+03:00 | `git -C OMV2 log -1 --format='%h %cI'` |
| WCORE | Wakecore develop | commit b2e8ab3, core-tokens 0.2.0, core-ui 0.5.0, synced 2026-07-29T03:01:35Z | `cat WSTACK/design/wakecore/manifest.json` |
| KIT | files dated 2026-10-04 to 2026-10-05 | not a git repo | `ls -la KIT` |

## 3. Colour

### 3.1 Primary: the oranges

| Name | Hex | Where it is used | Status | Evidence |
|---|---|---|---|---|
| Portal "WakeCap orange" | `#D46514` | Bootstrap `$primary` for the whole shell, mobile `AppColors.primary`, e-mail buttons with 8px radius | [code] | `PORTAL/packages/shared/CapUI/src/scss/abstracts/_variables.scss:2`; `PORTAL/docs/styling.mdx:87` (comment says "WakeCap orange"); `MOBILE/packages/wakecap_design_system/lib/theme/colors.dart:6`; `PORTAL/mails/reset-password.mjml:15-16`; `rg -ic '#d46514' PORTAL/mails` gives 3 per template, 9 in all |
| Portal orange wash | `rgba(212,101,20,0.1)` active, `0.2` hover; tint `#FBF3EC` | legacy nav item mixin, `--wc-primary-light` | [code] | `PORTAL/packages/shared/CapUI/src/scss/mixins/_navlink.scss:13,18`; `_variables.scss:45` |
| Portal badge warning | `rgb(212,101,20)` | `.bg-light-warning` | [code] | `PORTAL/packages/shared/CapUI/src/scss/components/_badges.scss:22-23` |
| CE accent `--primary` and `--ring` | HSL `21 90% 48%`, computes to `#E9590C`; the file's own comment says `#ea580c` | CE default button, active rail row, focus ring | [code] | `CE/src/app/index.css:22,71`; comment at `CE/src/app/index.css:12`; pinned by `CE/src/app/brandAccentTheme.test.ts:15-21` |
| CE orange scale | 50 `#FFF7ED`, 100 `#FFEDD5`, 200 `#FED7AA`, 300 `#FDBA74`, 400 `#FB923C`, 500 `#F97316`, 600 `#EA580C`, 700 `#C2410C`, 800 `#9A3412`, 900 `#7C2D12`, 950 `#431407` | the `primary` and `orange` families are the same scale | [code] | `CE/tailwind.config.js:40-50` and `:122-132` |
| CE primary button | `#EA580C`, hover `#C2410C`, disabled `#FB923C` | Button variant `primary` | [code] | `CE/src/app/components/ui/Button/Button.tsx:48-49` |
| CE accent before the retheme | HSL `221 83% 53%`, computes to `#2463EB` (blue) | tags v0.0.3 and v0.0.4 (the first two Connected Environment production tags) | [code] | `git -C CE show v0.0.3-ConnectedEnvironmentApp-production:src/app/index.css` and the same for v0.0.4, line 22 of each |
| Release kit orange | `#FF8300` | videos, sellit page, deck accent bar, markers | [code] (kit file) | `KIT/four-videos/_tools/vbuild.py:16`; `KIT/sellit/index.html:12`; `KIT/presentation/gen_deck.py:13` |
| Deck text orange | `#B85C00` | orange text on a light slide | [code] (kit file) | `KIT/presentation/gen_deck.py:13` |
| Mobile light orange | `#FF8734` (named `primary950`) | legacy mobile | [code] | `MOBILE/packages/wakecap_design_system/lib/theme/colors.dart:7` |
| Wakecore chart ramp | `#FFDFB1`, `#FFC073`, `#FF9D19`, `#FF7400`, `#FC3B00` (derived from OKLCH) | `--chart-1` to `--chart-5`, amber to burnt orange | [code] | `tar -xzOf WCORE package/dist/theme.css` (`--chart-1..5`); conversion command in section 10 |
| Other tooling oranges | `#FF6B00` ("WakeCap" brand in make-video and demoit), `#FF8A3D` (singit default) | video skills, not product | [plan] | `WSTACK/make-video/SKILL.md:200,307`; `WSTACK/demoit/bin/quality-check:12`; `WSTACK/singit/SKILL.md:81` |

- `#FF8300` is not in any product repo. [code] Evidence: `rg -il 'ff8300' --glob '!**/node_modules/**' --glob '!**/dist/**' --glob '!**/build/**' --glob '!pnpm-lock.yaml' --glob '!*.env*'` over PORTAL, CE, frontend-2.0-om, MOBILE, OMV2, Gas, frontend-2.0-maps and wc3-platform printed no file.
- The kit orange comes from the sellit skill brand rules: black background, white text, orange `#FF8300` "sparingly", Inter, clipped corners, 40px grid, left accent bar 4px. [plan] Evidence: `WSTACK/sellit/SKILL.md:1213-1225`.
- Portal has two primaries on screen at once. Bootstrap layer: orange `#D46514`. Tailwind layer (`tw-`): a blue scale, 500 `#3B82F6`, 800 `#1E40AF`, 950 `#172554`. The new rail uses blue-800 for its active icon. CE moved its own accent to orange on 2026-09-13. [code] Evidence: `PORTAL/packages/shared/ui/tailwind.config.js:36-48` (comment line 31 cites a Figma file "WakeCap Platform Design System"); `PORTAL/packages/web/nav/src/app/components/SideNavV2/IconButton.tsx:26,31`.
- The orange accent reached production in tag v0.0.5-ConnectedEnvironmentApp-production (2026-09-13T15:34:23+03:00). The retheme commit is PR #138, 8e55e33, 2026-09-13T15:34:04+03:00 (branch commit 268c719, 14:07:11). [code] Evidence: `git -C CE show --stat --format='%h %cI %s' 8e55e33`; `git -C CE show v0.0.5-ConnectedEnvironmentApp-production:src/app/index.css | rg -n '^\s+--primary:'` prints `21 90% 48%`; the same command on v0.0.4 prints `221 83% 53%`; `KIT/four-videos/_research/changes.md:9` says "Orange accent (v0.0.5)".

### 3.2 Secondary and neutral

CE semantic tokens (HSL as written, hex derived with the script in section 10). All in `CE/src/app/index.css` inside one `:root` block.

| Token | Value | Hex | Role | Evidence |
|---|---|---|---|---|
| `--background`, `--card`, `--popover` | `0 0% 100%` | `#FFFFFF` | page and card surface | `CE/src/app/index.css:16,18,20` |
| `--foreground`, `--card-foreground` | `221 39% 11%` | `#111827` | primary ink | `:17,19` |
| `--secondary`, `--muted`, `--accent` | `220 14% 96%` | `#F3F4F6` | quiet surface | `:24,26,36` |
| `--muted-foreground` | `220 9% 44%` | `#666D7A` | secondary ink. Raised from 46% (`#6B7280`) so the worst pair is 4.57:1 (TAN-2485) | `:35`; comment `:27-34` |
| `--border`, `--input` | `220 13% 91%` | `#E5E7EB` | hairline border | `:69-70` |
| `--destructive` | `0 84% 60%` | `#EF4343` | destructive button | `:38` |
| `--track-surface` | `220 14% 93%` | `#EBECF0` | inset track, rail hover fill | `:80`; `CE/src/app/components/VerticalSideNav.tsx:221` |
| `--track-border` | `220 13% 86%` | `#D7DAE0` | track hairline | `:81` |
| `--radius` | `0.5rem` | 8px | base corner radius | `:72` |

CE colour scales (hex as written): [code]

- `secondary` is the Tailwind gray scale: 50 `#F9FAFB`, 100 `#F3F4F6`, 200 `#E5E7EB`, 300 `#D1D5DB`, 400 `#9CA3AF`, 500 `#6B7280`, 600 `#4B5563`, 700 `#374151`, 800 `#1F2937`, 900 `#111827`, 950 `#030712`. Evidence: `CE/tailwind.config.js:55-65`. It carries 394 of 692 colour utilities in CE source (section 10).
- `natural` is the Tailwind neutral (true grey) scale, 50 `#FAFAFA` to 950 `#0A0A0A`. Evidence: `CE/tailwind.config.js:96-106`.
- `gray` is the older Figma scale: 25 `#FCFCFD`, 50 `#F9FAFB`, 75 `#ECECF3`, 100 `#F2F4F7`, 200 `#EAECF0`, 300 `#D0D5DD`, 400 `#98A2B3`, 500 `#667085`, 700 `#344054`, 800 `#1D2939`, 900 `#101828`, 950 `#0C111D`. Evidence: `CE/tailwind.config.js:199-210`.
- Shell (Bootstrap) neutrals from the Figma grays: gray-100 `#F2F4F7` backgrounds, 200 `#EAECF0` borders, 300 `#D0D5DD` disabled, 500 `#667085` secondary text, 600 `#475467` body text, 700 `#344054` headings, 900 `#101828` primary text; `$secondary` `#DEE2E6`; table stripe `#F9FAFC`. Evidence: `PORTAL/packages/shared/CapUI/src/scss/abstracts/_variables.scss:3,15-21,29`; `PORTAL/docs/styling.mdx:95-105`.

### 3.3 Semantic status colours used in CE

The status system in one table. Fill = lamp, dot, gauge arc. Ink = icon and word on the tint. All hex are as written in `CE/tailwind.config.js` unless marked derived.

| Meaning | Fill (500 step) | Ink | Tint (50 step) | Border | Evidence |
|---|---|---|---|---|---|
| Safe, All Clear, SAFE, online, normal card | `#17B26A` | `#039855` (`--success-foreground`) | `#ECFDF3` | success-500 as a 4px leading rule (tiles), `#D1FADF` (badge) | `CE/tailwind.config.js:167-173`; `CE/src/app/index.css:66`; `CE/src/app/components/ui/Badge/Badge.tsx:56-57` |
| Check, Caution, stale, not confirmed | `#F79009` | `#DC6803` (`--warning-foreground`) | `#FFFAEB` | warning-500, `#FEDF89` (badge) | `CE/tailwind.config.js:186-193`; `CE/src/app/index.css:67` |
| Alert, Danger, offline, Warning | `#F04438` | `#F04438` (`--error-foreground`) | `#FEF3F2` | error-500, `#FDA29B` (badge) | `CE/tailwind.config.js:177-182`; `CE/src/app/index.css:68` |
| No reading, no station, unknown (neutral) | `#98A2B3` (gray-400 dot) | `#666D7A` (`--muted-foreground`) | `#F3F4F6` (`--muted`) | `#E5E7EB` | `CE/src/app/features/WeatherStation/station-domain/utils/stationState.ts:56-62` |

Words and mapping by product (what each product prints, and how it is drawn): [code]

| Product | Words printed | Colour rule | Evidence |
|---|---|---|---|
| Weather Station verdict strip | Safe, Caution, Danger, Safety status unavailable | green, amber, red text on the matching 50 tint (`#085D3A`, `#93370D`, `#B32318`). Danger gets an 8px leading border and extrabold word. Unknown gets an amber override, not grey | `CE/src/app/features/WeatherStation/agent-dashboard/utils/severity.ts:42-48,50-73`; `.../components/SafetySummaryStrip.tsx:86-89,241-253`; words at `CE/src/app/features/WeatherStation/translations/en.ts:353-356` |
| Weather Station parameter card | normal, breached ("Above safe limit"), stale, missing | normal green tint with `#039855` icon; breached red tint with `#F04438` icon; stale amber tint with `#DC6803` icon; missing and unknown white with grey icon. A blank value is never green | `CE/src/app/features/WeatherStation/dashboard-layout/utils/cardState.ts:114-135`; label `en.ts:701`; backend Danger status id is 2 at `cardState.ts:22` |
| Weather Station station state | online, stale, suspect, unregistered, dark, offline | online green; stale, suspect, unregistered amber; dark and offline RED; readiness `no_station` neutral grey. Glyphs: circle-check, hourglass-half, triangle-exclamation, circle-question, circle-xmark, power-off | `.../station-domain/utils/stationState.ts:66-84,131-139` |
| Lightning tile | All Clear (green), Caution Yellow (amber), Warning (red), Unknown, Fault; badge "Safe to work" on green only | exactly 3 colours (TAN-2787, 2026-09-28). ORANGE looks identical to YELLOW. Unknown, offline, stale, unrefreshed and fault are red, never grey. Only green is safe | `CE/src/app/features/LightningSensor/utils/lightningVisuals.ts:8-31,47-62,114-125`; words `CE/src/app/features/LightningSensor/translations/en.ts:37,47,51,56` |
| Gas | SAFE, CHECK, ALERT | green, amber, red. Stale (a reading older than 60 minutes), offline and never-reported are CHECK, not red, not grey. Contact lost is CHECK plus a banner, never a fourth word. Gas arc and bars `#17B26A`, `#F79009`, `#F04438` | `CE/src/app/features/Gas/utils/gasStateVisual.ts:28-56`; `.../Gas/utils/gasDerivations.ts:46-50`; `.../Gas/utils/gasState.ts:9-12,53`; words `.../Gas/translations/en.ts:37-39,44-45` |

- Seen live on 4 Oct 2026 (build 1.0.7): the red Danger strip ("The red strip is the answer: Danger, in words"); the Lightning state tile reading All Clear and Safe to work; the Gas wallboard reading CHECK and "Not confirmed safe"; a reading above its limit turning red with "Above safe limit"; one offline station named with readiness Not ready. [live] Evidence: `KIT/four-videos/final/connected-environment-setup-tour.script.md:13,51`; `KIT/four-videos/final/3-lightning.script.md:11`; `KIT/four-videos/final/4-gas.script.md:15`; `KIT/four-videos/final/2-weather-station.script.md:15`.
- "Offline grey" has no support in code. Offline station is red (`stationState.ts:82-83`), Lightning offline is red (`lightningVisuals.ts:122`), Gas offline is amber (`gasState.ts:9-12`), portal map hardware offline icons are red `#B42318` and `#F04438`. Grey is the neutral "no reading" family above. [code] Evidence: `PORTAL/packages/web/root-config/public/assets/hardware/gateways/offline.svg` (2 fills `#B42318`); `.../hardware_shapes/gateways/offline.svg` (fill `#F04438`); `PORTAL/packages/shared/CapUI/src/scss/abstracts/_variables.scss:46-47` (`--wc-online #039855`, `--wc-offline #b42318`).
- Portal map hardware online icon: fill `#C3FF9C`, stroke `#05603A`. [code] Evidence: `PORTAL/packages/web/root-config/public/assets/hardware/gateways/online.svg` (command: `rg -o -i '(fill|stroke)="#[0-9a-f]{6}"'` on that file).
- Portal legacy badges: success `rgb(25,135,84)` `#198754`, warning `rgb(212,101,20)` `#D46514`, danger `rgb(222,22,15)` `#DE160F`, secondary `rgb(179,180,186)` `#B3B4BA`. [code] Evidence: `PORTAL/packages/shared/CapUI/src/scss/components/_badges.scss:14-47`.
- Status badge shape in CE: a pill (`rounded-full`), 1px border, soft tint, ink is the foreground colour, the meaning is written in words and colour is the third signal. Variants: danger, warning, neutral, success. [code] Evidence: `CE/src/app/components/ui/Badge/Badge.tsx:36-59` (variants at `:50-59`, doc block `:19-33`).
- Status icon tokens are a deliberate fourth colour role for one non-text glyph, so a card reads by meaning at a glance. [code] Evidence: `CE/src/app/index.css:40-68`; `CE/src/app/features/WeatherStation/dashboard-layout/utils/cardState.ts:104-108`.

### 3.4 Heat index band ramp (not the same thing as Danger red)

| Id | Band (printed) | Default range, heat index in C | Colour | Work and rest (min) | Water every (min) and amount (ml) |
|---|---|---|---|---|---|
| 5 | Normal | -50 to 25 | `#1E7B34` deep green | 0 and 0, no work restriction | 30 and 250 |
| 1 | Caution | 25 to 30 | `#0CA957` green | 60 and 0 | 20 and 250 |
| 2 | Extreme Caution | 30 to 39 | `#F4F208` yellow | 50 and 10 | 20 and 250 |
| 3 | Danger | 39 to 52 | `#F39A1F` orange | 30 and 10 | 15 and 250 |
| 4 | Extreme Danger | 52 to 1000 | `#F90D0D` red | 20 and 10 | 10 and 250 |
| (6th stop) | beyond the last named band | n/a | `#5C0A0A` black-red | n/a | n/a |

- The backend seeds the five default bands and their colours. A project can hold its own band set (the API can send per-project band fields, and the seed rows are tagged as the global fallback), so these are defaults, not every project's limits. [code] Evidence: `BE/Wakecap.WeatherStation.Infrastructure/InfrastructureServiceRegistry.cs:515-570` (insert order fixes ids 1 to 5, comment at `:515-518`); `BE/Wakecap.WeatherStation.IntegrationTests/SafetyPolicyPublishSeamTests.cs:696-700`; `BE/Wakecap.WeatherStation.IntegrationTests/HeatIndexAtomicityTests.cs:37` (`Source = "global_fallback"`); `CE/src/app/features/WeatherStation/constants/heatIndexColors.ts:5-12` (per-project band fields).
- CE falls back to the same five colours when the API omits a band colour, and derives the sixth stop for sets with more bands. [code] Evidence: `CE/src/app/features/WeatherStation/constants/heatIndexColors.ts:24-30`; `CE/src/app/features/WeatherStation/utils/heatIndexBandBoundaries.ts:374-381`.
- The card background is the band colour itself, with black or white text picked by luminance (yellow gets black). [code] Evidence: `CE/src/app/features/WeatherStation/components/HeatIndexCard.tsx:26-52`.
- The Safety Policy page says: Band colours are set by severity, coolest green through hottest deep red. Five band cards (Normal, Caution, Extreme Caution, Danger, Extreme Danger) were on screen. [live] Evidence: code `CE/src/app/features/WeatherStation/translations/en.ts:1299`; live `KIT/four-videos/final/2-weather-station.script.md:21`.
- The mobile app documents the same ids, colours and ranges and warns that heat status ids and indicator status ids are two different enums. [code] Evidence: `MOBILE/apps/wakecap_mobile_v2/lib/presentation/weather_station/widgets/weather_station_status.dart:3-47`.

### 3.5 Contrast, measured (derived)

Command: python3 script using the WCAG relative luminance formula over the hex pairs below. The first seven match the numbers written in the CE code comments.

| Pair | Ratio |
|---|---|
| `#039855` on success tint `#ECFDF3` | 3.54:1 |
| `#039855` on white | 3.73:1 |
| `#DC6803` on warning tint `#FFFAEB` | 3.34:1 |
| `#DC6803` on white | 3.49:1 |
| `#F04438` on error tint `#FEF3F2` | 3.46:1 |
| `#F04438` on white | 3.76:1 |
| `#666D7A` on white | 5.21:1 |
| `#666D7A` on `#F3F4F6` | 4.73:1 |
| `#111827` on white | 17.74:1 |
| white on CE primary `#E9590C` (active rail label) | 3.56:1 |
| `#FF8300` on `#000000` | 8.50:1 |
| `#FF8300` on `#0C0C0C` | 7.92:1 |
| `#FF8300` on white | 2.47:1 |
| `#B85C00` on `#F5F5F2` | 4.21:1 |
| `#D46514` on white | 3.70:1 |
| on `#0C0C0C`: `#17B26A` 7.09, `#F79009` 8.34, `#F04438` 5.21, `#D46514` 5.28, `#E9590C` 5.49, `#B4B4B4` 9.43, `#7C7C7C` 4.69 | all at or above 4.5:1 |

- The code comments state the status ink pairs clear the 3:1 floor for a non-text graphic, and the muted ink clears 4.5:1. [code] Evidence: `CE/src/app/index.css:27-34,57-65`.
- Take-away for a dark deck: orange and the three status 500 colours all pass as text on black or `#0C0C0C`. Orange text on white does not (2.47:1). White on CE orange is 3.56:1, fine for large text only.

### 3.6 Release kit and deck tokens (what the existing presentation material uses)

Kit dark theme (sellit page, same tokens in the video builder): [code] (kit files)

| Token | Value | Evidence |
|---|---|---|
| black, white, orange | `#000000`, `#FFFFFF`, `#FF8300` | `KIT/sellit/index.html:12` |
| card ink 2, ink 3 | `#0C0C0C`, `#161616` | `KIT/sellit/index.html:13` |
| line | `#2B2B2B` | `KIT/sellit/index.html:13`; `KIT/four-videos/_tools/vbuild.py:253` |
| dim text, faint text | `#B4B4B4`, `#7C7C7C` | `KIT/sellit/index.html:13` |
| card shape | clipped top-right corner, `polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)`; videos use 18 to 22px | `KIT/sellit/index.html:14`; `KIT/four-videos/_tools/vbuild.py:253,287` |
| grid | 40px, `rgba(255,255,255,.05)` lines | `KIT/sellit/index.html:21`; `vbuild.py:242` |
| accent bar | 4px full height on key cards (6px in videos) | `KIT/sellit/index.html:45`; `vbuild.py:254` |
| wordmark | text `WAKE` white plus `CAP` orange, weight 800, letter spacing .12em, 13px | `KIT/sellit/index.html:26-27,110` |
| eyebrow | 22px, letter spacing .24em, uppercase, orange, 2px orange border | `KIT/four-videos/_tools/vbuild.py:244` |
| live dot | `#FF3B30` | `vbuild.py:274` |
| canvas and type in videos | 1920 x 1080, `#000`, Inter 400 to 800, GSAP 3.14.2 from jsdelivr | `KIT/four-videos/_tools/vbuild.py:9,240,653-654` |
| diagram icons | inline SVG, stroke orange 4 or white 3.5, round caps | `vbuild.py:489-496` |

Existing deck (pptx, 14 slides) is light, not dark: [code] (kit files)

| Token | Value | Evidence |
|---|---|---|
| ink, mute, line, background | `#0C0C0C`, `#6B6B6B`, `#DCDCD7`, `#F5F5F2` | `KIT/presentation/gen_deck.py:12` |
| orange, orange ink | `#FF8300`, `#B85C00` | `gen_deck.py:13` |
| red, green, amber (deck-local picks) | `#D64545`, `#1E9E5A`, `#F2A33A` | `gen_deck.py:14`; used as the three product pills Danger, All Clear, Check at `gen_deck.py:140-144,154-156` |
| font and radius | Arial, 12px card radius, no shadows | `gen_deck.py:20,41`; `KIT/presentation/build_pptx.py:3,141` |
| brand text | "WakeCap · Internal presentation" (text only, no logo) | `gen_deck.py:139` |

- The deck status hex values are not product tokens. They are close to, but not equal to, the CE 500 steps (`#17B26A`, `#F79009`, `#F04438`). [code] Evidence: compare `gen_deck.py:14` with `CE/tailwind.config.js:170,180,189`.
- The sellit brand rules forbid emoji, gradients (except the grid), glow effects and rounded corners. The deck uses rounded 12px cards and the brief asks for glow, so both depart from the rules. [plan] Evidence: `WSTACK/sellit/SKILL.md:1213-1225`; `KIT/presentation/gen_deck.py:41`.

### 3.7 Wakecore design system tokens (the newer WakeCap system)

Wakecore is a restrained near-black and grey system with orange and amber kept for charts and accents. CE does not use it; in the portal only the PM micro-app consumes it (the people and workforce feature plus 3 style files, 30 source files under `PORTAL/packages/web/pm/src`). [code] Evidence: `WSTACK/DESIGN.md:62-73` (section Color); `rg -l 'wwc-scope|@wakecap/core-ui|@wakecap/core-tokens' PORTAL/packages/web` lists only `pm`; `rg -n '"@wakecap/' CE/package.json` lists no core-ui or core-tokens.

Values from WCORE `package/dist/theme.css` (OKLCH as written, hex derived with the script in section 10, gamut clipped, so approximate):

| Token | Light | Dark |
|---|---|---|
| `--background` | `oklch(0.985 0 0)` = `#FAFAFA` | `oklch(0.185 0.006 70)` = `#141210` (warm charcoal) |
| `--card` | `oklch(1 0 0)` = white | `oklch(0.215 0.006 70)` = `#1B1916` |
| `--muted` | `oklch(0.96 0 0)` | `oklch(0.26 0.007 70)` = `#262320` |
| `--border` | `oklch(0.92 0 0)` = `#E4E4E4` | `oklch(0.30 0.008 70)` = `#302D2A` |
| `--sidebar` | `oklch(0.99 0 0)` | `oklch(0.165 0.006 70)` = `#100E0C` |
| `--foreground` | `oklch(0.145 0 0)` = `#0A0A0A` | `oklch(0.985 0 0)` = `#FAFAFA` |
| `--primary` | `oklch(0.205 0 0)` = `#171717` | `oklch(0.922 0 0)` |
| `--muted-foreground` | `oklch(0.556 0 0)` = `#737373` | `oklch(0.708 0 0)` = `#A1A1A1` |
| `--destructive` | `oklch(0.577 0.245 27.325)` = `#E7000B` | `oklch(0.704 0.191 22.216)` = `#FF6467` |
| `--success` | `oklch(0.59 0.16 145)` = `#2D9539` | `oklch(0.72 0.16 145)` = `#5BBE62` |
| `--warning` | `oklch(0.72 0.16 70)` = `#E38F00` | `oklch(0.80 0.15 75)` = `#F5AE39` |
| `--radius` | 8px (control radius 4px) | same |
| `--shadow-surface` | `0 1px 2px 0 rgb(0 0 0 / 0.06)` | `0 1px 2px 0 rgb(0 0 0 / 0.4)` |

- The theme file says dark is a warm charcoal with surfaces stepping up by lightness because shadows are off. Evidence: `tar -xzOf WCORE package/dist/theme.css` (comment above `.dark`).
- The PM bundle generated on 2026-07-27 holds older values (`--radius .625rem`, dark background `oklch(14.5% 0 0)`). The wstack snapshot synced 2026-07-29 is newer. Evidence: `PORTAL/packages/web/pm/src/app/styles/core-ui/core-ui.generated.css` (one line file); `WSTACK/design/wakecore/manifest.json`.

### 3.8 Diagram role colours already used in the architecture pack (not brand tokens)

Blue = frontend, green = backend, orange = data and storage, purple = infrastructure and messaging, grey = external. Dashed = planned or async, solid = implemented or sync. [code] (doc source) Evidence: `/Users/admin/wc/weather-station/Weather Station Architecture/README.md:32`.

Hex used in `02-weather-station-migration-state.dot`: frontend `#1D4ED8` border, `#DBEAFE` fill, `#EFF6FF` cluster; config and delivery (purple) `#6D28D9`, `#EDE9FE`, `#F5F3FF`; backend (green) `#15803D`, `#DCFCE7`, `#F0FDF4`; data (orange) `#C2410C`, `#FFEDD5`; external (grey) `#6B7280`, `#F3F4F6`, `#FAFAFA`. Evidence: `/Users/admin/wc/weather-station/Weather Station Architecture/02-weather-station-migration-state.dot:10-36`.

## 4. Fonts

| Context | Family | Weights | Status | Evidence |
|---|---|---|---|---|
| Portal shell body | Inter, then sans-serif, loaded from Google Fonts | 300, 400, 500, 600, 700 | [code] | `PORTAL/packages/web/root-config/src/index.ejs:9`; `PORTAL/packages/shared/CapUI/src/scss/abstracts/_variables.scss:5`; `PORTAL/docs/styling.mdx:18,89` |
| CE app text | none set. It inherits the shell font (Inter). Not confirmed in a rendered browser | semibold 151, medium 73, bold 32, normal 17, extrabold 15 class uses | [code] | `rg -n 'font-family\|fontFamily' CE/src CE/tailwind.config.js` finds only a Storybook sample at `CE/src/stories/button.css:8`; counts from the command in section 10 |
| CE numbers (readouts) | Tailwind default mono stack: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | medium, semibold | [code] | 6 uses of `twce-font-mono`: `CE/src/app/features/Reports/components/MaxValueTile.tsx:59,80`; `.../DailyBreakdownTable.tsx:60,64,77`; `.../LightningSensor/components/LightningStateTile.tsx:209`; stack at `CE/node_modules/tailwindcss/stubs/config.full.js:313-322` (Tailwind 3.4.19) |
| Icons | Font Awesome Pro 6.5.2 (Light is the platform idiom; CE source also uses Solid 55 times and Regular 19 times) | 300 Light | [code] | `PORTAL/packages/web/root-config/src/index.ejs:10-12` (CAPICONS_URL, CAPUI_URL, UI_URL load order); `CE/src/app/index.tsx:31-39` (CE loads FA itself only in standalone mode); `CE/src/app/features/LightningSensor/utils/lightningVisuals.ts:88` (comment: `fa-light`, the platform's icon idiom) |
| Wakecore sans, mono, serif | Figtree (variable), IBM Plex Mono, Lora | Figtree 300 to 900 plus italics; Plex Mono 400, 500, 600 plus 400 italic; Lora 400 to 700 plus italics | [code] | `tar -xzOf WCORE package/dist/fonts.css`; `PORTAL/packages/web/pm/src/app/styles/core-ui/core-ui.generated.css:2`; `PORTAL/packages/web/pm/src/app/styles/core-ui/core-ui.entry.css:19-26` |
| Release kit (videos, sellit page) | Inter, then system-ui, sans-serif | 400, 500, 600, 700, 800 | [code] | `KIT/four-videos/_tools/vbuild.py:240,654`; `KIT/sellit/index.html:9,18` |
| Kit monospace tag | ui-monospace, "SF Mono", Menlo, Consolas, monospace | n/a | [code] | `KIT/sellit/index.html:59` |
| Existing deck, pptx | Arial | 400, 700 | [code] | `KIT/presentation/gen_deck.py:20`; `KIT/presentation/build_pptx.py:3,141` |
| E-mails | Arial, sans-serif | n/a | [code] | `rg -n -i 'font-family' PORTAL/mails` (7 uses) |
| Mobile design system | 8 families bundled: AvenirNext, SfPro, Arial, SFNSDisplay, AvenirNextLt, Poppins, Inter, figtree | per family | [code] | `MOBILE/packages/wakecap_design_system/pubspec.yaml:77-137` |
| Other kit guidance (not used here) | IBM Plex Sans (EN) and Tajawal (AR) for "WakeCap board" decks | n/a | [plan] | `WSTACK/make-video/SKILL.md:200,308` |

CE type scale (px, from the frozen contract table; capped at the 2xl breakpoint 1536px by TAN-2722): [code]

| Step | Minimum (phone to 1280px) | At and above 1536px |
|---|---|---|
| `fluid-xs` | 11 | 11.76 |
| `fluid-sm` | 14 | 14.96 |
| `fluid` | 16 | 17.12 |
| `fluid-lg` | 20 | 21.41 |
| `fluid-xl` | 26 (28.16 at 1280) | 33.79 |
| `icon-fluid` | 20 | 20.32 |

Evidence: `CE/src/app/fluidTypeScale.contract.test.ts:155-162`; clamp definitions `CE/tailwind.config.js:265-272`. The reason: on a 2560px viewport the clock drew at 25.2px and the safety banner at 29.07px while the portal chrome is a fixed 14 to 16px (`fluidTypeScale.contract.test.ts:7-12`). CE adds wall-display breakpoints `3xl` 2560px and `4xl` 3200px (`CE/tailwind.config.js:15-21`).

## 5. Logo and brand assets

- CE has no logo and says so. The header carries a generic Font Awesome `fa-shield-halved` icon in `#EA580C` and the portal chrome above it prints the name. The share image stamps the text "WakeCap Weather Station". [code] Evidence: `CE/src/app/components/ConnectedEnvHeader.tsx:62-70` (comment: a safety mark, not a logo, no wordmark); `CE/src/app/features/WeatherStation/translations/en.ts:671`; `CE/src/app/features/WeatherStation/dashboard-layout/components/ShareableSnapshot.tsx:396`.
- CE `public/` holds 39 files: one PNG `public/images/logo.png` (6,594 bytes, no source file references it), one SVG `public/assets/images/sun-cloud.svg`, the Font Awesome Pro 6.5.2 CSS and 36 font files. [code] Evidence: `find CE/public -type f | wc -l` prints 39; `find CE/public/fonts -type f | wc -l` prints 36; `rg -n -i 'images/logo' CE/src` prints nothing.
- `sun-cloud.svg` (3,700 bytes) is the weather art: orange radial gradient sun `#EA580C` to `#E1A325`, blue cloud `#60A5FA`, white cloud base, and an orange glow (drop shadow, blur 10.5, offset 4, colour about `#E39320` at 40% opacity). It is byte-identical in the portal. Shown at 4vw in the weather metrics card. [code] Evidence: `CE/public/assets/images/sun-cloud.svg:8-21`; `cmp CE/public/assets/images/sun-cloud.svg PORTAL/packages/web/root-config/public/assets/images/sun-cloud.svg` prints nothing; `CE/src/app/features/WeatherStation/components/WeatherMetrics.tsx:216-221`.
- Portal top bar: black (`tw-bg-black`), height `--wc-main-header` 38px, PNG logo `wc-logo-light.png` at 24px wide, then the breadcrumb. The splash screen shows `wc-logo-dark.png` at 200px wide on white. These are PNG, not SVG. [code] Evidence: `PORTAL/packages/web/nav/src/app/components/Header/Header.tsx:38,40,47-48`; `PORTAL/packages/web/root-config/src/UI/splashScreen/splashScreen.ts:11-13`; `PORTAL/packages/web/root-config/public/styles/main.css:5-22`.
- WakeCap PNG files in the portal (seven): `wc-logo-dark.png` 3,684 B, `wc-logo-light.png` 3,582 B, `wc-logo-gray.png` 561 B, `wakecap-dark.png` 6,695 B, `wakecap-light.png` 6,938 B, `wakecap-gradient.png` 13,174 B, `wakecap-banner.png` 117,657 B. Not opened. [code] Evidence: `ls -la PORTAL/packages/web/root-config/public/assets/images`. The e-mail header logo is a hosted PNG named `Wakecap+Logo.png` (`PORTAL/mails/header.mjml:4`).
- The portal also holds product illustrations `helmet-alarm.svg` (2,931 B) and `escape.svg` (2,481 B) with gradient stops `#F6A550` and `#5A4126`. [code] Evidence: `rg -o -i 'stop-color="#[0-9a-f]{6}"'` on each file.
- No SVG logo file exists in CE or in the portal `public` folders. The WakeCap "W" mark exists as SVG in these places (same shape, different coordinate systems): [code]

| Where | viewBox and size | Fill | Evidence |
|---|---|---|---|
| Inline in the Observation Manager export preview, portal repo | 278.78 x 176.15 | `#000000` | `PORTAL/packages/web/om/src/app/modules/ObservationManager/features/Observations/ExportObservationPreview.tsx:547-556` (same shape also in `/Users/admin/wc/frontend-2.0-om/src/app/features/observations/components/ExportObservationPreview.tsx:745`) |
| `OMV2/public/images/wakecap-logo.svg` | 24 x 16, 294 bytes | black | file |
| `MOBILE/apps/wakecap_mobile_v2/assets/svg/wakecap_icon.svg` | 22 x 14, 351 bytes | black | file |
| `MOBILE/apps/wakecap_mobile_v2/assets/svg/appbar_wakecap_logo_with_text.svg` and `splash_wakecap_logo_with_text.svg` (identical) | 672 x 414, 395 bytes | black | file; `cmp` of the two prints nothing |
| `MOBILE/apps/wakecap_mobile_v2/assets/svg/wakecap_horizontal_logo.svg` (wordmark) | 632 x 97, 2,243 bytes | black | file |
| `WSTACK/docs/assets/favicon.svg` (orange) and `WSTACK/docs/assets/logo.svg` (white) | 278.78 x 176.15, 293 bytes each | `#FF8300`, `#ffffff` | files. The path (191 characters) is identical to the portal inline copy: python3 comparison printed IDENTICAL. Referenced as the docs logo at `WSTACK/mkdocs.yml:17-18`; extra.css says orange is "used sparingly for the logo" (`WSTACK/docs/stylesheets/extra.css:6-10`) |

First 400 characters (whole file when shorter), copied verbatim. Files were not copied.

`WSTACK/docs/assets/favicon.svg` (293 bytes, orange, best fit for a dark deck):

```
<svg viewBox="0 0 278.78 176.15" xmlns="http://www.w3.org/2000/svg"><path fill="#FF8300" d="M65.58,4.66l21.91,30.92,20.8-31.16,62.09-.03,21.5,31.2s21.05-31.2,21.21-31.2h62.08v62.09s-52.28,105.07-52.28,105.07l-62.09-.05-21.48-30.97-21.05,31.02h-62.09S3.49,66.77,3.49,66.77V4.67h62.09Z"/></svg>
```

`WSTACK/docs/assets/logo.svg` (293 bytes, white): same file with `fill="#ffffff"`.

`OMV2/public/images/wakecap-logo.svg` (294 bytes):

```
<svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 6.00746V0.5H18.4134L16.581 3.23134L14.6592 0.5H9.2514L7.41899 3.23134L5.49721 0.5H0V6.00746L4.64804 15.5H10.1006L11.9777 12.7687L13.8101 15.5H19.3966L24 6.00746Z" fill="black"/>
</svg>
```

`MOBILE/apps/wakecap_mobile_v2/assets/svg/wakecap_icon.svg` (351 bytes):

```
<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.0279 0.0226131L6.80212 2.61223L8.48645 0.00251258L13.5144 0L15.2554 2.61307C15.2554 2.61307 16.96 0 16.9729 0H22V5.20017L17.7665 14L12.7386 13.9958L10.9992 11.402L9.29461 14H4.26671L0 5.22446V0.0234506H5.0279V0.0226131Z" fill="black"/>
</svg>
```

`MOBILE/apps/wakecap_mobile_v2/assets/svg/wakecap_horizontal_logo.svg` (2,243 bytes, first 400 characters):

```
<svg width="632" height="97" viewBox="0 0 632 97" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M120.31 3.75H144.41L118.86 90.72H84.3201L74.2601 22.01L63.8201 90.72H29.0401L4.39014 3.75H29.2401L47.6701 70.96L58.2401 3.75H90.9201L101.11 70.84L120.31 3.75Z" fill="black"/>
<path d="M192.57 90.71L187.48 72.94H155.67L150.58 90.71H127.59L153.93 3.75H189.96L216.3 90.72H192.57V90.71ZM160.64 55.
```

Evidence for the first-400 text: `head -c 400 <file>` on each path above.

- The release kit and the deck use no logo file. The kit writes the name as text (`WAKE` white, `CAP` orange). [code] Evidence: `KIT/sellit/index.html:110`; `KIT/presentation/gen_deck.py:139`.
- No brand guide with clear space or minimum size rules was found in the repos. The only pointer is a Figma file named "WakeCap Platform Design System" cited in a code comment (not opened). [code] Evidence: `PORTAL/packages/shared/ui/tailwind.config.js:31`.

## 6. Portal visual language as tokens

Two layers show on one screen: the shell (portal, Bootstrap plus `tw-` Tailwind) and the CE micro-app (`twce-` Tailwind, shadcn "new-york", Radix). CE ships its own stylesheet `wakecap-fe-connected-environment-app.css` so there is no collision with the shell's `tw-` classes. [code] Evidence: `CE/docs/styling.md:3-14,28-32`; `CE/components.json:3-11`; `CE/src/app/index.tsx:42-50`.

| Token | Portal shell | CE micro-app | Evidence |
|---|---|---|---|
| Accent | Bootstrap `#D46514`; rail uses blue-800 `#1E40AF` for active text | `--primary` `#E9590C` (documented `#EA580C`) | `_variables.scss:2`; `SideNavV2/IconButton.tsx:26,31`; `CE/src/app/index.css:22` |
| Top bar | black `#000`, 38px, PNG logo 24px wide, breadcrumb 16px normal weight: current crumb `#FCFCFD`, earlier crumbs and slashes `#98A2B3` | white bar, 1px bottom border `#E5E7EB`, padding 24px by 12px, shield icon in `#EA580C`, clock at the right in muted ink, ticks every 30 s, Saudi time | `Header/Header.tsx:38,40,47-48`; `Breadcrumb/Breadcrumb.tsx:35,39-40`; `CE/src/app/components/ConnectedEnvHeader.tsx:37-47,62-70,95-105` |
| Rail width | 56px (`tw-w-14`) plus a 256px drawer (`tw-w-64`). `--wc-sidebar-width` 4rem is defined but nothing uses it | 56px collapsed, 208px expanded (capped by `clamp(3.5rem,15vw,13rem)`); choice stored in `localStorage` key `connectedEnv.sideNav.collapsed` | `SideNavV2/SideNavV2.tsx:108`; `SideNavV2/Drawer.tsx:47`; `_variables.scss:52`; `CE/src/app/components/VerticalSideNav.tsx:101,202-206` |
| Rail surface and border | `#F9FAFB`, right border `#E5E7EB` (secondary-50, secondary-200) | white card, right border `#E5E7EB`, padding 8px, gap 4px | `SideNavV2/SideNavV2.tsx:110,112`; `VerticalSideNav.tsx:181-184` |
| Rail item box | icon button 36 x 32px, 16px glyph, radius 4px, 4px gap between items | row min height 44px, padding 12px by 8px, gap 12px, radius 6px, label 14px (fluid-sm) | `SideNavV2/IconButton.tsx:16-19`; `SideNavV2/IconRail.tsx:35`; `VerticalSideNav.tsx:209-214` |
| Nav active colour | tile `#E5E7EB` with `#1E40AF` icon; in the drawer `#F3F4F6` with `#1E40AF` text | solid primary fill (`#E9590C`), white semibold label and white icon | `IconButton.tsx:31`; `NavItem.tsx:44`; `VerticalSideNav.tsx:216-217,343` |
| Nav inactive and hover | icon `#4B5563`; hover tile `#F3F4F6` and `#1E40AF` | label `#666D7A`, icon `#6B7280`; hover fill `#EBECF0` and ink `#111827` | `IconButton.tsx:15,25-26`; `VerticalSideNav.tsx:219-222,344` |
| Disabled or planned | opacity 50 and not-allowed on disabled items | not faded: dashed 1px `#D1D5DB` rim, a "Planned" marker, `aria-disabled`, tooltip "Not available yet" | `NavItem.tsx:45`; `VerticalSideNav.tsx:230-235,250-254` |
| Rail icon style | Font Awesome Pro Light, class from the catalog, fallback `fa-light fa-circle-xmark`; hover card label on the right; red "Beta" chip, 6px text | Font Awesome Light, fixed width (`fa-fw`), decorative, one glyph per row | `SideNavV2/IconRail.tsx:41`; `SideNavV2/IconButton.tsx:37-41`; `VerticalSideNav.tsx:340-347` |
| Rail rows (CE) | not applicable | Weather Station `fa-cloud-sun`, Gas `fa-explosion`, Lightning `fa-bolt`, Reports `fa-file-lines`, a rule, Settings `fa-gear`; collapse control `fa-bars`; Gas sub-rows Dashboard `fa-gauge`, Devices `fa-tower-broadcast`, Alerts `fa-bell`, Compliance `fa-clipboard-check` | `VerticalSideNav.tsx:131-174,248,371-376,640,698` |
| Page row (CE) | not applicable | active: semibold `#111827`; others `#4B5563`; radius 4px; focus ring `#F97316` | `CE/src/app/components/ConnectedEnvTabs.tsx:153-171` |
| Card | Bootstrap card, border `#DEE2E6`, radius 8px | radius 8px (`rounded-lg`), 1px border `#E5E7EB`, white, `shadow-sm` (`0 1px 2px rgb(0 0 0 / .05)`), padding 24px; clickable card lifts 2px with a heavier shadow over 300ms | `_variables.scss:4,6`; `CE/src/app/components/ui/Card/Card.tsx:16,19`; `CE/tailwind.config.js:231-235,293-296` |
| Radius ladder | 8px (`$border-radius`); inputs 8px; e-mail buttons 8px | `lg` 8px, `md` 6px, `sm` 4px, default 4px, `full` for badges and switches. Use counts in CE source: `rounded` 51, `lg` 50, `md` 45, `full` 44, `sm` 11, `xl` 8 | `_form-control.scss:6`; `CE/tailwind.config.js:231-235` |
| Button | Bootstrap `btn-primary`, font 0.9rem, no shadow | default: primary fill, white 13px medium text, height 36px, hover 90% | `_buttons.scss:3-7`; `CE/src/app/components/ui/Button/Button.tsx:33,46-47,78` |
| Border colour | `#E5E7EB` (Tailwind), `#DEE2E6` (Bootstrap) | `--border` `#E5E7EB` | see above |
| Dark mode | none seen | none: `darkMode: class` is set but `index.css` defines only `:root` | `CE/tailwind.config.js:3`; `CE/src/app/index.css:14-83` |
| Z layers | nav 2, sidebar 20, popup 30, table 10 | same names | `PORTAL/packages/shared/ui/tailwind.config.js:22-29`; `CE/tailwind.config.js:306-313` |

- Seen live on 4 Oct 2026: the left rail, the header with a live clock, the collapsible side menu, product rows only for switched-on products, and the portal rail icon for Connected Environment (a sun-and-cloud icon). [live] Evidence: `KIT/internal-notes.md:23`; `KIT/release-note.md:14`; `KIT/four-videos/_research/changes.md:8-9`.
- The Status Slider (a horizontal track of domain segments with a lamp, TAN-2482) shipped 2026-09-01 and was deleted by TAN-2601. Its two helper files still define lamp rules (`red`, `amber`, none) and nothing in non-test source calls them. The rail took over. [code] Evidence: `CE/src/app/components/ConnectedEnvTabs.tsx:180-188`; `rg -n 'connectedEnvStationStatus|connectedEnvLightningStatusLine' --glob '!**/*.test.*' CE/src` finds only the two definitions; commit `99b430c` (2026-09-01T14:37:44+03:00).
- Shared UI paths: the portal Tailwind prefix is `tw-`, CE is `twce-`. 615 distinct `twce-` utility tokens are used in CE source (app code only, tests and stories excluded). [code] Evidence: `PORTAL/packages/shared/ui/tailwind.config.js:18`; `CE/tailwind.config.js:5`; command in section 10.
- Colour use in CE source (bg, text, border utilities): secondary 394, warning 94, error 66, success 52, primary 29, gray 27, red 24, blue 3, rose 2, green 1; total 692. Primary orange is 4.2% of colour utilities: it is used sparingly. [code] Evidence: command in section 10.

## 7. Motion tokens found in product code

| Token | Value | Evidence |
|---|---|---|
| Stop-work flash (Lightning RED only) | full-screen overlay, `rgba(220,38,38,0.22)` fill plus a 10px inset frame `rgba(220,38,38,0.55)`, opacity 0 to 1 to 0 over 1.4s ease-in-out, infinite, z-index 9999, off for `prefers-reduced-motion`. The banner icon also pulses (Tailwind pulse: 2s cubic-bezier(.4,0,.6,1), opacity to .5) | `CE/src/app/features/LightningSensor/components/LightningRedBanner.tsx:38-46,95`; pulse at `CE/node_modules/tailwindcss/stubs/config.full.js:14,581-584` |
| Rule | the code comment says this is the one piece of motion in the app, on the one state that means stop work | `LightningRedBanner.tsx:89-91` |
| Dialog overlay | `overlayShow` 150ms `cubic-bezier(0.16, 1, 0.3, 1)`, fade from 0 | `CE/tailwind.config.js:323-333` |
| Accordion | 0.2s ease-out | `CE/tailwind.config.js:315-331` |
| Switch thumb | 180ms (named duration, an arbitrary value would not build) | `CE/tailwind.config.js:297-305` |
| Card hover | lift `translateY(-2px)`, shadow `0 -8px 14px 0 rgba(87,87,87,.15)`, 300ms ease-in-out | `Card.tsx:19`; `CE/tailwind.config.js:293-296` |
| Strip refresh | the safety strip refetches every 60 s | `CE/src/app/features/WeatherStation/agent-dashboard/hooks/useAgentSummary.ts:24`; comment `.../components/SafetySummaryStrip.tsx:230` |
| Product art glow | sun art drop shadow, blur 10.5, offset 4, `#E39320` at 40% | `CE/public/assets/images/sun-cloud.svg:8-17` |

All [code]. The RED flash was never seen live (the kit notes the state was not RED): `KIT/internal-notes.md:37`.

## 8. Timeline of the visual system (dates for animation)

| Date | Event | Evidence |
|---|---|---|
| 2026-03-01 | portal styling doc names `#d46514` "WakeCap orange" | `git -C PORTAL log -1 --format='%h %cI' -- docs/styling.mdx` gives dd755e5df 2026-03-01T12:59:25+03:00 |
| 2026-06-18 | portal nav becomes catalog driven (SideNavV2) | `git -C PORTAL log -1 --format='%h %cI %s' -- packages/web/nav/src/app/components/SideNavV2/IconButton.tsx` gives 60d367d40 |
| 2026-06-26 | first commit of the weather station frontend (CE ancestor) | `git -C CE log --reverse --format='%h %cI %s' -- src/app/index.css` first line 539afd3 |
| 2026-07-13 | shadcn CSS variables defined. Before this every rounded corner compiled to square | f0d0255; `CE/src/app/index.css:5-13` |
| 2026-08-26 | CE rename finished, `twce-` prefix and own stylesheet | d7f6221; `CE/docs/styling.md` |
| 2026-08-30 | three text roles, status as badges, muted ink raised for contrast | 0bd009e (TAN-2484, TAN-2485) |
| 2026-09-01 | Status Slider ships | 99b430c |
| 2026-09-03 | first Connected Environment production tag v0.0.3 (2026-09-03T12:43:39+03:00) | `git -C CE log -1 --format='%cI' v0.0.3-ConnectedEnvironmentApp-production` |
| 2026-09-13 | accent blue to orange (PR #138); production tag v0.0.5 at 15:34:23 | 8e55e33; v0.0.5 tag |
| 2026-09-21 | type scale capped at 1536px (TAN-2722, PR #168) | 6088c76 |
| 2026-09-28 | Lightning palette cut to three colours (review item 6 of TAN-2787) | `CE/src/app/features/LightningSensor/utils/lightningVisuals.ts:8` |
| 2026-09-30 | v1.0.0 production tag (17:49:28) | `git -C CE log -1 --format='%cI' v1.0.0-ConnectedEnvironmentApp-production` |
| 2026-10-04 | v1.0.7 production tag (15:58:28); the kit captured production on this build | 8f3bf01; `KIT/four-videos/_research/refresh-1.0.7.md:4` |
| 2026-10-05 | Trends Planned row removed from the rail | 83b4d8d |

All [code] (git history). Tags named `*-production` are created by the Deploy S3 workflow after it syncs the build (`/Users/admin/wc/weather-station/CLAUDE.md`, rule "merge status is not completion status"), so a `-production` tag implies the deploy ran. I did not verify the live import map (no network).

## 9. Authoritative or approximate

| Value | Class | Why |
|---|---|---|
| CE hex steps in `tailwind.config.js` (primary, secondary, natural, status, gray) | authoritative (code) | same file at master and at the production tag v1.0.7 |
| CE HSL variables in `index.css` | authoritative (code) | hex is derived, rounded; `#E9590C` against the documented `#EA580C` differs by 1 unit |
| Status ink tokens `#039855`, `#DC6803`, `#F04438` | authoritative (code) | written in the file comment and computed from the HSL |
| Shell tokens (Bootstrap, `--wc-*`, nav classes) | authoritative (code) with a caveat | read on a feature branch checkout; no diff against the local origin/master ref of 2026-09-30; not compared with a rendered production page |
| Heat band colours and ranges | authoritative (code) for defaults | project band sets can differ from the seed |
| Kit orange `#FF8300`, black and grey ink | authoritative for the release kit only | tooling brand, absent from product code |
| Deck red, green, amber (`#D64545`, `#1E9E5A`, `#F2A33A`) | approximation | picked by the deck author, near but not equal to product tokens |
| Wakecore hex from OKLCH | approximation | conversion is rounded and gamut clipped |
| Any value "seen on screen" | not measured | no image was opened. Live evidence is caption text only, not pixels |

## 10. Commands behind the numbers

All read only. `CE`, `PORTAL`, `KIT`, `WSTACK` as defined above.

```
# 1. colour families and hex literals in CE tailwind theme.extend.colors (lines 27-230)
python3 - <<'EOF'
import re
t=open('CE/tailwind.config.js').read().split('\n'); blk='\n'.join(t[26:230])
print(len(re.findall(r'^\s{8}([a-z]+):\s*\{', blk, re.M)), len(re.findall(r'#[0-9a-fA-F]{6}\b', blk)))
EOF
# 2. everything in this group runs inside CE/src, so the test/ and stories/ folders are excluded
cd CE/src
rg -o --no-filename -i '#[0-9a-f]{6}\b' --glob '!**/*.test.*' --glob '!**/fixtures/**' --glob '!test/**' --glob '!stories/**' . | tr a-f A-F | sort -u | wc -l
rg -o --no-filename 'twce-[A-Za-z0-9\[\]/:.%()_-]+' --glob '!**/*.test.*' --glob '!test/**' --glob '!stories/**' . | sort -u | wc -l
rg -o --no-filename 'twce-(bg|text|border)-(primary|secondary|natural|red|orange|green|rose|danger|success|error|warning|info|gray|yellow|blue|purple)(-[0-9]+)?' --glob '!**/*.test.*' --glob '!test/**' --glob '!stories/**' . | sed -E 's/twce-(bg|text|border)-//; s/-[0-9]+$//' | sort | uniq -c | sort -rn
rg -o --no-filename 'twce-font-[a-z0-9-]+' --glob '!**/*.test.*' --glob '!test/**' --glob '!stories/**' . | sort | uniq -c | sort -rn
rg -o --no-filename '\bfa-(light|regular|solid|duotone|thin|brands|sharp)\b' --glob '!**/*.test.*' --glob '!test/**' --glob '!stories/**' . | sort | uniq -c
rg -o --no-filename '\bfa-light fa-[a-z0-9-]+' --glob '!**/*.test.*' --glob '!test/**' --glob '!stories/**' . | sort -u | wc -l
rg -o --no-filename '\btwce-(rounded(-[a-z0-9]+)?)\b' --glob '!**/*.test.*' --glob '!test/**' --glob '!stories/**' . | sort | uniq -c | sort -rn
cd ../..
# 3. file counts
find CE/public -type f | wc -l; find CE/public/fonts -type f | wc -l
find PORTAL -path '*/node_modules' -prune -o -path '*/.git' -prune -o -iname '*.svg' -print | grep -v '/dist/' | wc -l
# 4. no product repo holds the kit orange (run from /Users/admin/wc)
rg -il 'ff8300' --glob '!**/node_modules/**' --glob '!**/dist/**' --glob '!**/build/**' --glob '!**/coverage/**' --glob '!pnpm-lock.yaml' --glob '!package-lock.json' --glob '!*.env*' frontend-2.0 weather-station/frontend-2.0-weather-station frontend-2.0-om mobile/flutter_wakecap Observation-Manager-V2 Gas frontend-2.0-maps wc3-platform
# 5. git counts
git -C CE log --oneline v0.0.4-ConnectedEnvironmentApp-production..v0.0.5-ConnectedEnvironmentApp-production | wc -l
git -C CE log --oneline v1.0.7-ConnectedEnvironmentApp-production..HEAD | wc -l
git -C CE tag --list '*-ConnectedEnvironmentApp-production' | wc -l
```

HSL to hex: python `colorsys.hls_to_rgb(h/360, l/100, s/100)` then round(x*255), for each `--token` in `CE/src/app/index.css`. OKLCH to hex: standard OKLab to linear sRGB matrix, sRGB gamma, clamp to 0..1, for each value in WCORE `package/dist/theme.css`. Contrast: WCAG formula `(L1 + 0.05) / (L2 + 0.05)`.

## 11. Suggested token set for the HTML presentation (suggestion derived from the facts above, not a product spec)

- Canvas `#0C0C0C` (kit ink2) or `#000`; panel `#161616`; line `#2B2B2B`; text `#FFFFFF`; dim `#B4B4B4`; faint `#7C7C7C`. Alternative in-family dark: Wakecore warm charcoal `#141210`, card `#1B1916`, border `#302D2A`.
- Brand accent `#FF8300` for lines, glow and numbers (8.5:1 on black). If a product-true orange is needed use `#D46514` (portal) or `#EA580C` (CE).
- Status lamps: green `#17B26A`, amber `#F79009`, red `#F04438` (CE 500 steps, 5.2:1 or better on `#0C0C0C`). Neutral "no reading" `#98A2B3`. Heat ramp `#1E7B34`, `#0CA957`, `#F4F208`, `#F39A1F`, `#F90D0D`, `#5C0A0A`. Label words as the product prints them: Danger, All Clear, Check; call offline red (Weather Station, Lightning) or amber (Gas), not grey.
- Type: Inter 400 to 800 as in the kit and portal; monospace numerals as CE does for readouts. Draw icons as inline SVG like the kit (`vbuild.py:489-496`).
- Glow (a deliberate exception to the sellit "no glow" rule): orange halo around the active node, for example `0 0 24px rgba(255,131,0,.35)`. Keep red pulses for the Danger or stop-work moment only, 1.4s ease-in-out like the product, and honour `prefers-reduced-motion` as the product does (`LightningRedBanner.tsx:46`).
- Logo: the orange mark in `WSTACK/docs/assets/favicon.svg` fits a dark canvas; the wordmark treatment used in the kit is text `WAKE` plus orange `CAP`.

## 12. Gaps

1. No official brand guideline file was found. The Figma "WakeCap Platform Design System" cited at `PORTAL/packages/shared/ui/tailwind.config.js:31` was not opened (no network).
2. The portal's real root CSS (body background, base colours) lives in the backend portal solution, not in any repo I read (`PORTAL/packages/web/root-config/public/styles/main.css:1-3`).
3. The exact Font Awesome class of the portal rail icon for Connected Environment is set in the backend catalog. Only the release note says "sun-and-cloud icon".
4. The portal checkout is a feature branch from 2026-08-12. I compared the nav and token paths with the local origin/master ref (2026-09-30) only, not with current master or a rendered production page.
5. Inter in CE is inferred from inheritance. It was not confirmed in a rendered browser, and no pixel was sampled. The TAN-2484 pixel sampling mentioned in a test comment was not read.
6. Lightning RED, the flash, and every Lightning state other than All Clear were never seen live. Gas SAFE chips were visible but not narrated in the kit.
7. Heat band defaults can be overridden per project. Production band values were not read.
8. Wakecore values differ between the PM bundle (2026-07-27) and the wstack snapshot (2026-07-29). The upstream Wakecore repo was not opened to see which is newest.
9. Which SVG is the master logo is not stated anywhere. The portal inline copy, OMV2 and the mobile files are product owned; the WSTACK copies are derived. Clear space and minimum size rules were not found.
10. The "offline grey" in the brief is not supported by code (section 3.3). If the deck needs a grey, use the neutral family and say what the product shows for offline.
11. `CE/public/images/logo.png` and every PNG logo were not inspected (binary). Only sizes are known.
12. Nothing was checked against the live site today (5 Oct 2026): no network call was allowed. Production state comes from the release kit (build 1.0.7, 4 Oct 2026) and from git tags.
