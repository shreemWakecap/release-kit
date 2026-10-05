# Umbrella capture observations (2026-10-04, portal clock 3:23 to 3:36 PM, Saudi time)

## Found live (new since the last videos)
- [live] Gas dashboard: Overview tiles (Detectors, Online, Live alarms, Acknowledged), three gas cards H2S / O2 / LEL, a Today row, readiness card, detector list. No SAFE hero, no CO/CO2, no Zones tab. (u-gas-c)
- [live] Gas Alerts with summary counts and Close actions; Compliance with limits table and two "Not available yet" panels. Route for Detectors is /gas/devices (/gas/detectors is a 404). (u-gas-alerts-c, u-gas-compliance-c, u-gas-devices-c)
- [live] Gas status line in the shared header, plus Check dot in the rail, visible on Weather Station and Settings pages of project C. (u-ws-c, u-products-c)
- [live] Maximum Values Report under Reports with period pills. (u-reports-a)
- [live] Site Safety Policy lives in Settings > Weather Station with 30-day charts, band ribbon, 30-day band strip, band cards, calculation method / change history tabs. (u-policy-a-*)
- [live] Settings > Lightning holds alerting radii, Set location (Temporary) and the 24 h state history. (u-settings-lightning-b)
- [live] Dashboard gear popup replaces the parameter list; "Featured - use gear Settings to choose parameters". (u-ws-gear-a)
- [live] Connected Products tab; rail only shows Active products; Trends is Planned everywhere.
- [live] Collapse rail button exists (not clicked).

## Not found live
- Esri map on Lightning: production still renders Leaflet / OpenStreetMap. [code] says the Esri change is in a later commit.
- Historical tab (removed, correctly absent). Agent dashboard composition and observation drawer (flag-gated; not visible). Any AI agent surface: DIRECTION only, not live today.
- Any UI showing how a device connects (Modbus, mesh/gateway, vendor cloud). Only the Blackline mention in the Gas alerts text hints at the vendor-cloud path.

## Surprises
- Lightning tile says "Held for 117h 31m since 2026-09-29 17:53 (AST)" while Settings history shows GREEN "In progress 7h 39m" since 2026-10-04 07:49 with data-unavailable gaps: two different clocks for the same state.
- Project A has a station offline since 15 Jul 2026, so readiness reads "Not ready".
- Project C shows Barometric Pressure 1001.9 hPa with "Threshold: Danger" (project A threshold is 1051 hPa).
- Heat band edges differ between the dashboard scale (Caution 25-29, Extreme Caution 30-38, Danger 39-51) and Settings (25-30, 30-39, 39-52).
- Heat index and Right now banner drift minute to minute (49.5 / 49.7 / 50.2 across frames).
- Project B has no Reports row; the Settings menu lists Weather Station and Lightning for every project, even when inactive.
- Lightning map shows real terrain and one Arabic place label (not masked); consider cropping.
- Gas Alerts "Closed" count and Dashboard "Peak today" / "Longest quiet gap" show "Not available yet".
- No env or config file was opened; no committed-secret path noticed.

## Verbatim wording worth quoting
- u-lightning-b: "WakeCap lightning alerts are a backup. Always follow the site's cabinet lights and sounder first."
- u-lightning-b: "Zone reference only — not a live strike position. This device reports no distance or bearing; the rings show the configured alert thresholds, nothing more."
- u-lightning-b: "Set manually until Management Maps supports lightning sensor locations."
- u-policy-a-top: "This page shows the limits and cycles that decide when work stops on this site. Changing anything here changes when work stops, for everyone on the project."
- u-policy-a-bands: "Moving a boundary changes both bands that meet at it, so the bands always cover the scale with no gap and no overlap."
- u-policy-a-cards: "Band colours are set by severity — coolest green through hottest deep red — and are no longer chosen by hand."
- u-gas-alerts-c: "Acknowledging or closing an alert is recorded here with who did it and when. It is not sent to Blackline: an alert closed here stays open in Blackline Live."
- u-gas-compliance-c: "Both are missing today, so no trend is drawn rather than an empty chart that reads as all clear."
- u-gas-c: "Safe 19.5 to 23.5 %VOL · alarm above 23.5 · low-oxygen alarm is not raised yet"
- u-ws-steps-a: "Listed in the order the safety service prioritised them."
- u-ws-details-a: "The full safety verdict as the safety service reported it."

## Time and date formats seen
- Header clock: "Oct 4, 2026, 3:23 PM" (no timezone label)
- Weather Station: "04 Oct, 2026 03:22 PM"; "Last reading was 1 minute(s) ago."; station last reading "15 Jul, 2026 04:54 PM"
- Reports: "09 Sep, 2026 · 03:01 PM" and table dates "04 Sep, 2026"
- Gas: "2026-10-04 15:21", "4 min ago", "2 h 4 min", "Last reading 2 min ago"
- Lightning: "Readings as of 2026-10-04 15:24 (AST)", "since 2026-09-29 17:53 (AST)", "117h 31m", "All times in AST, UTC+3."
- Settings history: "2026-10-04 07:49", durations "7h 39m", "15s"

## Masks and handling
Customer or site names appear only in the top bar (blanked) and on Lightning (tile label, radii title, coordinates masked). Page text in captures is scrubbed. No frame shows a name.
