# Gas capture observations (Oct 4, 2026, 3:23-3:27 PM portal clock). Project C, read-only.

## What is new (found live)
- [code+live] TAN-2914..2917 (front-end commit 7f5eef0, 2026-10-04): Overview figures row (Detectors / Online / Live alarms / Acknowledged) live on g-dashboard-c. No big SAFE hero. Only H2S, O2, LEL cards (no CO/CO2). Acknowledge and Close actions on alerts: Close buttons live on g-alerts-c.
- [code+live] TAN-2926 (95e1650): Zones tab gone. /gas/zones lands on /gas (URL stayed .../connected-env/gas after loading /gas/zones). Nav shows Dashboard, Detectors, Alerts, Compliance only.
- [code+live] Gas reads real data (31a3f80); header status line and side-nav state dot (db30701); wallboard and phone views (6064744); restyled Detectors/Alerts/Compliance (f2eb26a). All seen live.
- [live] Trends nav item tagged "Planned".

## Not found / not visible
- Acknowledge button: every open alert was already Acknowledged, only "Close" shows (and the oldest listed alert is Closed with no buttons).
- Any live alarm: Live alarms 0, Critical open 0.
- Peak today / Longest quiet gap values: "Not available yet".

## Surprises
- 15 "open" alerts, all Acknowledged, all from the same offline detector (3589602346), mostly "SOS" and "Detector tipped over", Critical. Dashboard still reads CHECK, not alarm.
- Dashboard "Closest to limit now" shows O2 20.5 vs "23.5 %VOL alarm limit" although O2's low side is the real risk; low-oxygen alarm is stated as not raised yet.
- Alerts note says closing here does NOT close in the vendor system (Blackline Live).
- /gas/wallboard has no portal chrome; the raw screenshot was 1026 px tall.
- Detector expand is inline, not a drawer.
- cap_clean leaves a 2 px black strip under the right end of the top bar (mask taller than bar).

## Verbatim wording (frame)
- g-header-c: "Gas CHECK  Last reading 3 min ago · 4 of 5 detectors reporting"
- g-dashboard-c: "Registered on this project" | "1 offline" | "None waiting for a person" | "Open, being handled" | "Gases, worst current reading" | "Within limits" | "Warning from 5 · alarm above 10 ppm · TWA 10 · STEL 15" | "Safe 19.5 to 23.5 %VOL · alarm above 23.5 · low-oxygen alarm is not raised yet" | "Warning from 10 · alarm above 20 %LEL" | "Worst of 4 reporting: <detector>" | "Reading newer than 60 min" | "Across all detectors" | "of 23.5 %VOL alarm limit" | Peak today / Longest quiet gap: "Not available yet" + "Needs stored readings for the day, which the backend does not keep yet." | "<detector> is offline" | "Readiness: Not ready" | "Total detectors: 5" | "What needs attention" | "Offline. Last reading 2 h 2 min ago."
- g-detectors-c: "Every gas detector registered on this project." | "Show detail for a row to see its readings and limits" | "No current reading. Last known values, not current:" | tabs "All", "Needs attention"
- g-detector-detail-c: "Detector ID" | "Every reading inside its limits."
- g-alerts-c: "Every alert raised on this project, newest first (up to the latest 500). Acknowledging or closing an alert is recorded here with who did it and when. It is not sent to Blackline: an alert closed here stays open in Blackline Live." | tiles "Open alerts 15", "Critical open 0", "Acknowledged 15", "Closed —" each "Live count from the Summary read" (Closed: "Not available yet")
- g-alerts-bottom-c: "The alert timeline and assignee are not available yet" / "There is no timeline or assignee to show for an alert, and no count of closed alerts. The list above, the open, critical and acknowledged counts and the acknowledge and close actions are real; the state on the Dashboard comes straight from the detector readings and does not wait for this."
- g-compliance-c: "The limits every reading is judged against." | "Compliance figures, exposure and exceedances are not available yet." | "Limits in force" | "Exposure against TWA and STEL, and a compliance percentage: Needs time spent exposed to each gas per worker and shift, measured against a limit. Neither is recorded yet, so there is no compliance percentage." | "Exceedances per gas over time: Needs alert history and stored readings. Both are missing today, so no trend is drawn rather than an empty chart that reads as all clear." | all "Not available yet"
- g-wallboard-c / g-mobile-c: "Not confirmed safe: 1 detector not reporting." | "Resolve the items listed before relying on this reading."

## Date/time formats seen
- Header clock: "Oct 4, 2026, 3:23 PM" (12h, Saudi time).
- Detector last reported and alert raised: "2026-10-04 15:21" (24h ISO-style).
- Relative: "just now", "2 min ago", "29 min ago", "2 h 2 min ago", "Last reading 1 min ago".
- Threshold: "Reading newer than 60 min".

## Notes
- Body text contained no customer or site names (only the top bar, masked). Vendor name "Blackline" appears in the Alerts note (vendor, not customer).
- Detectors are all model "exo_mk2" with 9-10 digit serial names.
- No secrets, no unexpected dialogs, no blockers. The Gemini API key pasted in the request was not used or written anywhere.
