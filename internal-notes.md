# Internal notes: Connected Environment release kit (INTERNAL ONLY)

Built 4 Oct 2026 from six live production pages, read-only. Nothing posted, filed, sent or published. Repos untouched.

## 1. Version range

- **FE** `frontend-2.0-weather-station`: `v0.1.0-production` (9 Aug) to `v1.0.3-ConnectedEnvironmentApp-production` (4 Oct) = **232 commits**. Your brief names v1.0.0 (30 Sep) and v1.0.1 (1 Oct) = 228 commits. Two more tags exist, both 4 Oct: v1.0.2 (Saudi time everywhere) and v1.0.3 (Saudi time on the flag-gated parts). **Production serves 1.0.3** (import map, read 4 Oct).
- **BE** `wakecap-weather-station`: no release tag since `stable-1.6.0-rc.1` (20 Jul). 148 first-parent commits on master since 9 Aug. HEAD `b36cdfa` (4 Oct). Deploy state not verified.

## 2. Ticket to user-visible change (15 lines)

| Ticket | What a user sees | Seen live |
|---|---|---|
| TAN-2810 | Reports: Maximum Values Report | yes |
| TAN-2804 | Lightning status band + zone-radius tile | yes |
| TAN-2786, #181 | Alarm history table, activity chart, CSV button | yes (empty, CSV disabled) |
| TAN-2722, TAN-2716 | Safety Policy page, 30-day "would have stopped work" preview | yes |
| TAN-2183, 2184, 2724 | Stage, review, publish, concurrency checks | no (read-only, not exercised) |
| TAN-2186, 2385, 2386 | Change history tab | yes (empty) |
| #149 | Connected Products Active/Inactive | yes (not toggled) |
| TAN-2204 | Station Rename button | button seen, not used |
| #169 | Gear popup for featured readings | gear seen, not opened |
| TAN-2600, 2601, 2602 | Side rail, header, live clock | yes |
| #204, #206 | Saudi time | yes |
| TAN-2122, 2123, 2124 | Agent dashboard, dynamic charts, observation drawer | no (flag off) |
| TAN-2410 | Lightning access and empty states | plumbing, nothing to see |
| TAN-2854 | Gas dashboard | out of scope |
| #151 | Historical tab removed, Trends shows Planned | yes |

## 3. Verified live vs excluded

**Live (shown):** verdict strip with confidence and update time; Heat Index card with work, rest, water; Data as of; station health (3 stations, 1 offline, Not ready); steps and Details drawers; Reports tiles, daily table, Export .xlsx; Connected Products; Safety Policy limits, ribbon, band cards, NOAA method, Change history tab; Lightning All Clear tile, zone rings, held-for, backup banner, AST labels; second project layout. Saudi time confirmed with the browser set to Los Angeles time.

**Excluded, with reason:**
- Agent-composed dashboard, "Why this verdict", observation drawer: flag `weather-station-agent-dashboard-composition` off. The string "Why this verdict" is on no page.
- Trends / history charts: rail shows Planned, disabled.
- Lightning wallboard, mobile glance, red alarm flash: no link from the page, not one of the six URLs, state not RED. `lightning.simulate` never touched.
- Alarm rows, non-green Lightning states: alarm history empty today.
- Version-checked edits, staged publish, loosening gate, "every change audited": not exercised. Change history was empty, so recording was not seen.
- Copy as image result, Excel/CSV downloads: buttons seen, not clicked.
- Settings › Lightning (radii, state history): not among the six.
- **Gas** (out of scope, mention here only): in the rail, Connected Products and the Project C header on the live portal. Masked or cropped out of every frame and page.

## 4. Captures that show real names

Decide before sharing anything.
- `.work/live/*.png`, `.work/cap/*`, `.work/wt/*` (raw): organization **Aramco** and projects **Riyas**, **Fadhili GIP PKG 1**, **Jafurah-Phase 2** in the top bar, user avatar "MS", and Gas on Project C and in Connected Products.
- `sellit/assets/*.png`, `demo/assets/**`, `walkthrough/assets/*.png` and both `final.mp4`: top bar blanked. Still visible: station names "Main Plant Weather Station" and "SCC Weather Station", serials `1925073288` (Project A) and `1158465167` (Project C). Lightning device label (site name) is masked.
- `demo/launch-context.json`, `demo/storyboard.json`: portal URLs with project IDs.
- Customer-facing text (`index.clean.html`, `release-note.md`, `howto.md`, `slack-post.md`, both narrations): no ticket IDs, versions, flag names, customer or people names.

## 5. Assumptions log

- Q3b alignment for the primary audience: **aligned**. Registry file `operator.md`.
- `index.html` is the tagged internal render. `index.clean.html` is the customer render, same source. Stakeholder map and friction matrix are internal only.
- Answers log is `.work/sellit-answers.md`, not `~/.wstack`, to keep writes under `release-kit/`. `wstack-live-data` not run. Preamble telemetry and proactive auto-enable skipped.
- Used `/browse` for all captures, including the `/demoit` capture step (skill suggests Chrome MCP).
- `/demoit` builder emits two demo scenes, so a third was patched in by hand. Hero 1's second frame is the offline station, not the Details drawer, to match the voice. The bands frame was dropped.
- **TTS quota:** the key is free tier, 10 requests per model per day. The demo used `gemini-3.1-flash-tts-preview` (Aoede). That quota ran out, so the walkthrough uses `gemini-2.5-flash-preview-tts` (Aoede) in 4 batched requests, aligned with Whisper. The timbre differs a little. Enabling billing on the key fixes it.
- Walkthrough composition comes from a throwaway script in `.work/wt/` because the `/demoit` builder caps at 60 s.
- Live values moved between captures (Project A heat index 50.4 to 52.9 °C, Danger to Extreme Danger). Each image is a real moment.
- "1.0" and ticket IDs omitted from customer files. Fadhili site date not stated anywhere. No expansion claims. No pilot results.
- Promise lines "Never falsely safe" and "Every change audited" appear as the promise. Evidence is partial (see section 3).
- Session: you turned `/sandbox` off, and imported cookies through the picker (1,157 cookies, many non-wakecap; later direct import for wakecap). Browser was restarted once in a Los Angeles time zone for the Saudi-time test.
- Side effect outside `release-kit/`: `/Users/admin/wc/.wstack/browse-startup-error.log`, written by `browse`. Safe to delete.

## 6. Could not verify

LaunchDarkly flag values (not queried). Download and clipboard results. Any edit, publish or audit-recording path. Lightning states other than All Clear. BE deploy state. Whether "never falsely safe" holds for stale or faulty Lightning devices.
