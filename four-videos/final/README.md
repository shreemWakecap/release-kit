# Connected Environment: four videos and a setup tour

Built 4 Oct 2026 from the live production portal (front end build 1.0.7). Voice: Gemini "Aoede". Nothing was posted, filed, sent or published.

| File | Length | What it shows |
|---|---|---|
| `1-connected-environment.mp4` | 3:21 | The umbrella: one product over weather, lightning and gas. One place to look, a detailed eye, control, three ways in (wireless mesh, mesh plus Modbus input, vendor cloud), and the future AI assistant. |
| `2-weather-station.mp4` | 2:18 | "A heat number is not an answer": the verdict strip and steps, details, station health, Select parameters, Maximum Values Report, Site Safety Policy with the 30 day preview, Change history, Connected Products. |
| `3-lightning.mp4` | 2:08 | A backup, not the alarm: All Clear tile, alert distances, new radii map (blurred), alarm activity and history, wallboard and phone views, Settings and the 24 hour state history. |
| `4-gas.mp4` | 2:32 | "A quiet gas screen is not a safe gas screen": Overview, Not confirmed safe, detectors, Alerts with Closed rows, Compliance limits, the vendor cloud path. |
| `connected-environment-setup-tour.mp4` | 4:33 | Screen recording with voice-over (5 Oct 2026): explore the Weather Station page (verdict and steps, details, stations, offline view), choose what to feature, Reports, enable products in Connected Products (shown, not switched), configure Weather Station (Site Safety Policy), Lightning (radii, location) and Gas (limits, read only). Replaces `riyas-weather-stations-click.mp4`. |

Each `*.script.md` has every beat: what is on screen, the narration, and the evidence for it. The tour's script lists each spoken line with its start time.

## What the videos say, and do not say
- **AI assistant:** shown only as DIRECTION (badge on every beat). Building blocks exist for Weather Station only. No assistant runs on any site. A person approves.
- **Gas alerts:** closing is recorded in WakeCap only. The page says it is not sent to the vendor.
- **Lightning:** only the green state counts as safe to work (a product rule). The page is a backup: cabinet lights and sounder first. Alert distances are reference values, never described as changing the alarm.
- **Paths:** weather over the wireless mesh; lightning over the mesh through a Modbus input module; gas only through the vendor's cloud (a black box to us). No polling or reporting numbers are spoken.
- **Never said:** "one rule set", "one audit trail", a site "is safe", a go-live date, tool counts, who closed the three Gas alerts.

## What was captured and changed
- Every frame is a real screenshot of production, read only. Names are blanked or blurred (top bar, device labels, coordinates, station names). The Lightning map is a satellite map now, so it is blurred.
- Production moved from 1.0.5 to 1.0.7 during the work: Lightning and Gas were recaptured in a visible browser at 4:48 to 4:55 PM Saudi time. Gas screens were unchanged; three alerts had been closed by someone else, so Alerts shows Closed rows.
- The Lightning Settings frame has two text lines blurred on purpose (the radii intro line and the "Set manually..." note).

## Setup tour: what was touched
- Production, live, 1080p. No product was switched on or off, nothing was saved or published, and every dialog (Edit alerting radii, Set location) was cancelled.
- The only writes were to the recorder's own featured-card layout on the Weather Station page (Select parameters and the card buttons). The Barometric Pressure card moved to the end of the list when switched back on, so the order was put back card by card afterwards and checked (all 12 switches on, original order). The page also sent its read-style policy preview calls.
- Privacy: top-bar names, the avatar (follows it on long pages), station names, the Lightning device label and coordinates, and the satellite maps are blurred or covered. OCR over every 2 seconds and a dense check of the avatar corner found no names, coordinates or initials.
- The red "Above safe limit" card (s12) shows only when a reading is above its limit at recording time. It showed this time (dust particles).
- Voice: 31 clips, each checked against its script (mean match 99.5%, every clip passes).
- Rebuild: `cd ../tour; python3 tts_steps.py; node record-tour.js; python3 compose.py; python3 scan_frames.py; python3 make_script.py`. The recorder needs the logged-in profile and briefly changes your own card layout, then restores it.

## Checks done
- Three fact-check lenses per video (claims, privacy, visuals), two to three rounds, then a cross-video review.
- Voice vs script, word match: umbrella 99.5%, weather 97.1%, lightning 98.7%, gas 96.9% (differences are only how numbers are spelled). Three lines the voice garbled were reworded and regenerated.

## Open items for you
1. "New" on Reports and Select parameters rests on the August baseline in the research. Say if the baseline is wrong.
2. The path diagrams in the product videos are plain (one lane). The umbrella has the full three lanes.
3. Rotate the Gemini key you pasted in chat (`~/.config/wstack/gemini.env`).
4. Raw captures with real names are internal only: `../_cap/` and `../_review/originals/`. Do not share them.

## Rebuild
`cd ..; VB_ALLOW_TTS=1 python3 _tools/vbuild.py <video-folder> --render` (voice is cached per chunk; only changed text is re-voiced). Check with `python3 _tools/qa.py <video-folder>`.
