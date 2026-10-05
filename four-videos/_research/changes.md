# What changed on screen, by product (research, internal)

Production serves front-end 1.0.5 (cdn.wakecap.com/1.0.5-ConnectedEnvironmentApp), 4 Oct 2026. Baseline for "new" is v0.1.0-production (9 Aug, answer-first dashboard). 235 commits sit between it and v1.0.5. Everything below is [code] or [doc]. Nothing was checked [live]. Full detail, exact UI strings, first tags and shas are in `changes.json`.

Tag facts: tags are lightweight, so dates are commit dates. The Connected Environment line starts at v0.0.3 (3 Sep) and contains all August work; the old line ended at v0.1.6-production (24 Aug). 57 `*-ConnectedEnvironmentApp-production` tags, v0.0.3 to v1.0.5. After v1.0.5 there is one master commit, not in production: the Lightning map moves to Esri ArcGIS (e1faf00).

## Shell, settings, reports
- Side rail replaces the tab strip (first v0.0.5): Weather Station, Gas, Lightning, Trends (Planned, no route), Reports, Settings. Collapsible (v0.0.9). Product rows only for products the project has switched on (v0.0.7 to v0.0.10).
- Header with a live clock; all times in Saudi time (v1.0.2, flag-gated parts v1.0.3). Orange accent (v0.0.5).
- Reports: Maximum Values Report with period buttons, two tiles, daily table, Export .xlsx (v0.0.50).
- Settings: Connected Products (Active/Inactive), Weather Station (policy), Lightning; each needs its own grant (v0.0.7, v0.0.11, v0.0.34).

## Weather Station
- Verdict strip "View Recommended Steps", compact readings grid, station health inline (v0.0.5).
- Station Rename (v0.0.3, old line v0.1.1). Gear popup "Select parameters" replaces the parameter list (v0.0.33). Historical tab removed (v0.0.15).
- Site Safety Policy rebuilt and moved into Settings (v0.0.19 to v0.0.34): "Right now" banner, stop-work limits with a 30-day "what this limit would have done" chart, band ribbon and cards, staged then "Review & publish" with a loosening tick box, conflict panel, Change history tab.
- DEFAULT OFF, DIRECTION / not live today (v1.0.2): "Recommended for this situation", "Charts for this situation", Observations drawer with Request approval.

## Lightning
- Screen with state tile, three colours (All Clear / Caution — Yellow / Warning, else Unknown), Readings as of line, backup disclaimer (v0.0.3 onwards; disclaimer v0.0.16).
- Tile redesign: status band, "Held for", zone rings RED / YELLOW / ALL-CLEAR (v0.0.49). Rings are a legend, not a strike position.
- Wallboard and phone view by URL only (v0.0.3, redesign v0.0.49). RED banner and red frame flash only on a real RED; the test switch is off in production (v0.0.50).
- Alarm history, Alarm activity chart, Export CSV (v0.0.45, v0.0.48, v0.0.51). Radii, sensor location and full state history moved to Settings > Lightning (v0.0.34, v0.0.48, v1.0.5). Radii map beside the tiles, marked Temporary (v1.0.5; open-source map in 1.0.5, Esri on master).
- Removed: routing panel, alert-message notice, alerts-sent panel.

## Gas (timeline)
1. 8 Sep, v0.0.5: five screens on sample data (fixtures). v0.0.6: fleet-overview restyle.
2. v0.0.53 (30 Sep): live device mapping, big SAFE/CHECK/ALERT word with zone ring, header line, nav dot, wallboard and phone view. Live reads still behind a default-off flag, so sample data by default.
3. v1.0.0 (30 Sep): Detectors, Alerts, Compliance, Zones restyled. v1.0.1 (1 Oct): real data is the default.
4. v1.0.4 (4 Oct): Overview (Detectors, Online, Live alarms, Acknowledged) replaces the SAFE hero; no CO/CO2; Acknowledge and Close on Alerts (recorded in WakeCap only, not sent to the vendor app).
5. v1.0.5 (4 Oct): Zones tab and all zone labels hidden; /gas/zones redirects to the dashboard.

Production build shows: tabs Dashboard, Detectors, Alerts, Compliance; header line "Gas SAFE|CHECK|ALERT" with last reading and detectors reporting; never SAFE on a failed or stale read (stale after 60 min; contact lost after 60 min with no report). Visible only with the flag not false, the read grant and the project entitlement.

## Backend enablers (plain)
Vendor-cloud gas connection (poll every 45 s, detectors upload about every 30 min); gas alert read, acknowledge and close routes; lightning module, auto-registration, sensor location, observations to the Observation Manager; atomic policy publish, policy impact, audit with actor names; project product entitlements; MCP as a second door with 33 tools, proposals need a second approver (DIRECTION: no agent live). Backend deploy state is unverified.

## Flags (defaults; LaunchDarkly not queried)
ON by default: connected-env-gas, weather-station-answer-first-dashboard, weather-station-safety-policy-screen, weather-station-change-history. OFF by default: weather-station-agent-dashboard-composition (dark), connected-env-gas-sample-data. Retired: connected-env-gas-live-data. Lightning has no flag; its test switch is disabled in production.

## Check before filming
Is the backend with Gas acknowledge/close deployed; which project has Gas; Lightning has shown only All Clear so far. Never click Close on a real gas alert and never publish a policy. Full list in `open_questions` in the JSON.
