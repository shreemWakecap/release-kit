# Weather Station live capture, 2026-10-04 (portal clock 3:23 to 3:27 PM)

Labels: [live] seen in portal, [code] read in repo, [doc] read in docs.

## What is new and found live
- [live] Left rail now has Weather Station / Reports / Trends (Planned) / Settings; Gas row appears only where Gas is active (Project C shows "Gas Check"). Hover on Trends shows "Not available yet" (w-menu-a).
- [live] A Reports screen "Maximum Values Report" with period pills Today, Yesterday, This Week, Last 7 Days, This Month, Last 30 Days, Custom... plus "Export .xlsx"; max heat index and max wind speed cards and a "Daily breakdown" (w-reports-a, w-reports-7d-a). Last 30 Days = 04 Sep to 03 Oct (ends yesterday). [code] added 2026-09-29.
- [live] Dashboard parameters now behind a gear "Dashboard settings" popup titled "Select parameters" (w-gear-a). [live] The featured area shows an empty "No parameters featured" slot beside the Heat Index card.
- [live] Verdict banner with "View Recommended Steps" and "Details" drawers (w-steps-a, w-details-a); Details lists VERDICT, DATA CONFIDENCE, DATA FRESHNESS.
- [live] Settings is a real screen: Connected Products (Weather Station Active, Gas Inactive, Lightning Inactive), Weather Station, Lightning (w-settings-products-a). The Connected Products tab is flag-gated in code ("weatherstation:settingsProducts") yet visible live.
- [live] Site Safety Policy: single page with "Right now" banner, stop-work limits with 30-day "would have stopped work" charts, heat index band ribbon with "Now 50.1 °C — Danger" marker, 30-day band strip, five band cards, then tabs "Heat index calculation method" (NOAA) and "Change history" (w-policy-a-*).
- [live] Header strip in Project C: "Gas CHECK Last reading 2 min ago · 4 of 5 detectors reporting" (w-top-c) - umbrella-story material.
- [code] Every time value is shown in Saudi time (Asia/Riyadh), commit f3e49a1/8dfbae9 on 2026-10-04; [live] but no zone label is printed.
- [code, not live] agent dashboard composition and dynamic charts behind a default-OFF flag: DIRECTION only.

## Surprises
- Offline station: headline "1925073288 is offline" yet a green "Last reading was 1 minute(s) ago." line and "Last seen: 04 Oct, 2026 03:22 PM" appear below it (w-top-a). The page text also says "The sensors service reports this station offline. Last reading: 15 Jul, 2026 04:54 PM" (not visibly rendered on the frame).
- Band edges differ between screens: dashboard scale "Danger 39–51°C, Extreme Danger ≥52°C"; policy "Danger 39 – 52 °C".
- Policy Caution band is bright green, Normal dark green, Extreme Caution yellow, Danger orange, Extreme Danger deep red. Normal has "No work restriction" on.
- Change history is empty for Project A.

## Verbatim explanatory texts
- (w-top-a) "One or more readings indicate a danger-level condition. Act on the recommended steps."
- (w-steps-a) "Listed in the order the safety service prioritised them."
- (w-details-a) "The full safety verdict as the safety service reported it."
- (w-gear-a) "Choose which parameters appear in the featured area."
- (w-top-a) "Heat Index is in a danger band — heat-stress risk to workers."
- (w-top-c) "Temperature has breached its configured safety threshold."
- (w-reports-a) "Computed from raw readings, project-wide across every station"
- (w-policy-a-top) "This page shows the limits and cycles that decide when work stops on this site. Changing anything here changes when work stops, for everyone on the project."
- (w-policy-a-top) "In force on site: 30 minutes of work, then 10 minutes of rest, with 250 ml of water every 15 minutes."
- (w-policy-a-limits) "Work stops when a sensor reading reaches its limit. Temperature and Wind Speed show what the limit would have done over the last 30 days."
- (w-policy-a-limits) "No reading will ever be marked Danger for Rainfall."
- (w-policy-a-bands) "Drag a boundary, or focus it and use the arrow keys. Moving a boundary changes both bands that meet at it, so the bands always cover the scale with no gap and no overlap."
- (w-policy-a-bands) "Each cell is one day of heat index, coloured by the band it falls in." / "A day is banded by its highest heat index reading, over the last 30 days."
- (w-policy-a-cards) "Band colours are set by severity — coolest green through hottest deep red — and are no longer chosen by hand."
- (w-policy-a-history) "No changes were recorded in the history we read for this project. Older changes may sit further back than this page reaches."

## Time and date formats seen
- Header clock: "Oct 4, 2026, 3:23 PM" (12-hour, no zone label).
- Dashboard: "Last updated 04 Oct, 2026 03:22 PM", "Data as of 04 Oct, 2026 03:22 PM", "Last reading: 15 Jul, 2026 04:54 PM", "Last seen: ...", "Last reading was 1 minute(s) ago.", "No new data for 1 min".
- Gas strip: "Last reading 2 min ago".
- Reports: "09 Sep, 2026 · 03:01 PM · Main Plant Weather Station" (monospace), table dates "04 Sep, 2026".
- Policy: "30 days ago ... today", "last 30 days".

## Colour and band names
Normal (<25 °C, dark green), Caution (25–29/30 °C, green), Extreme Caution (30–38/39, yellow), Danger (39–51/52, orange; banner and badge red text on orange card), Extreme Danger (≥52 °C, deep red).

## Offline / stale display
Offline badge (red dot, "Offline" pill), headline "<serial> is offline", Readiness "Not ready", attention list "1 station offline", "Check station <serial>". Online stations: green dot, "Online" pill, "Last reading was 1 minute(s) ago."

## Not captured
Hover tooltips on Copy as image (none) and Rename (native title only). Committed secrets: none noticed. No unexpected dialogs or publish bars appeared.
