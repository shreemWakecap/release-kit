# Devices and integration paths - research summary

Companion to `integration-and-devices.json` (52 claims, every one with file:line:quote evidence, machine-checked against the files). Labels: [live] seen live, [code] read in code, [doc] read in docs. Read-only research; nothing was posted or changed outside this folder.

**Verified live:** production serves front-end 1.0.5 [live] (public runtime-config). That equals git tag `v1.0.5-ConnectedEnvironmentApp-production` = commit `95e1650`. Master is one commit ahead (Lightning map moved to Esri); that is NOT live, so production still draws the lightning map on OpenStreetMap tiles. Backend deploy state is not verifiable from here.

## Headline findings (things that would be wrong in a video)

1. **Gas acknowledgements do not go back to Blackline.** Acknowledge/Close are recorded in WakeCap only; the API docs and the screen's own caption say so. The program doc's "acks flowing back" is not built. [code]
2. **The Blackline push receiver only acknowledges receipt** (MD5 of the raw body, stored in an audit table, anonymous endpoint). It raises no alerts. Alerts come from the timer poll; the poll also mirrors the vendor's open alerts, which is what the doc calls the "reconciler" (no separate component). [code]
3. **No Modbus path for gas.** The gas Modbus tag ticket was cancelled ("no hardware gas device for now"); the mesh router only handles the weather tag, anything else is dropped. Gas = vendor cloud only. [doc + code]
4. **Gas compliance (TWA/STEL, compliance %) is not computed**; the screen says so. [code]
5. **The AI-agent story is direction.** The MCP server (weather read tools, proposals, observer) has no gas or lightning tools; agent UI is behind flags; the August deck says narration was dark in production. [code + doc]
6. **"Single permission scope" needs a footnote.** One category (`weatherstation:view/edit`) covers all three products, no `lightningsensor:*`/`gasdetector:*` exists, but three narrower Settings grants sit in the same family (`settingsProducts`, `manage-weather-settings`, `manage-lightning-settings`). Several comments/notes in the repos still claim otherwise. [code]
7. **Entitlement is a front-end switch.** `project_product` (3 flags per project) is stored by the backend; the portal menu rows and route gates read it. Backend product routes do not check it. The Connected Products page needs `weatherstation:settingsProducts` or `project_builder:manage`. [code]
8. **Lightning staleness is 4x the device's own heartbeat** in code (was 3x until 2026-09-22) but the runbook and a front-end helper still say 3x. Do not quote a multiplier. Lightning surfaces poll every 30 s (the backend's 10/30/5 s polling endpoint is never called by the front end). [code]
9. **Lightning radii are reference-only in the backend**, yet the Edit-radii dialog says "the radii the alerting service uses". Conflict to resolve before the lightning video. [code]
10. **Gas fleet carries H2S, O2 and combustible gas only**; CO/CO2 were removed from the UI. Zones tab is hidden in 1.0.5. [code]

## Paths at a glance

| Product | Device | Path | Who decides state | Cadence / thresholds |
|---|---|---|---|---|
| Weather Station | station node (make/model unknown) | Wirepas mesh -> gateway -> AWS IoT/MQTT (optionally SQS) -> sensors-service (pipeline or sqs mode) decodes protobuf + TLV tag 0x01 -> TimescaleDB -> backend reads read-only + status API | backend (online per indicator, health classes); sensors-service (station list online) | portal polls 60 s; offline default 10 min (project override); agent classes stale 15 / dark 60 min; stuck = 6 identical readings over >= 30 min while another sensor moves |
| Lightning | warning unit via ADAM input on a mesh "asset" node (vendor unknown) | mesh -> gateway -> transport decodes tag 0x06 -> IoT topic `received_lightning_data` -> SQS lightning queue (+DLQ); unparsable -> `received_modbus_data` (error:true) -> modbus-unparsed queue (+DLQ) -> backend consumer | device sends state; backend decides stale; front end adds "page not refreshing" (5 min) | stale sweep every 5 s, > 4 x heartbeat (default 60 s); portal polls 30 s; only GREEN is safe |
| Gas | Blackline detectors (H2S, O2, LEL) | WakeCap -> Blackline Connect: /authorize -> /token -> GET /device every 45 s (default); push endpoint = receipt only | backend raises alerts (strictly over High); front end derives SAFE/CHECK/ALERT | reading stale > 60 min; offline safety net 90 min; portal polls 60 s; detectors report ~every 30 min |

Unregistered lightning device: packet kept as an audit event, no state shown. Lightning devices already in node-service are auto-registered hourly.

## New since the last videos (build 1.0.5, shipped 2026-10-04 and the weeks before)

Gas: real acknowledge/close, live/acknowledged counts, no SAFE hero, no CO/CO2, Zones hidden. Lightning: three-colour palette, "All Clear / Caution - Yellow / Warning", "Safe to work" badge, alarm history + activity chart + CSV, full history moved to Settings, alert-routing panels removed, radii map + temporary admin-set location. Platform: Connected Products toggle, Settings split into three permission-gated sections, Reports (Maximum Values Report), Saudi time on weather screens.

## Open questions that block narration

Is the 2026-10-04 backend (gas ack/close, lightning location) deployed? Is the production staleness multiplier 4x? What do the lightning radii really control? Is Gas polling/push live and bound to the right project? Which projects have which products switched on? Does the portal's sun-and-cloud "Connected Environment" entry look as briefed (outside the repos)? Full list in the JSON.

## Housekeeping

- Committed-secret candidates, paths only (contents not read): `wakecap-weather-station/Wakecap.WeatherStation.Web.API/{.env, appsettings.Development.json, appsettings.json, appsettings.local.json, http-client.private.env.json}`; example env files under `sensors-service/ci-cd-scripts/env-files-example/`.
- The Fadhili lightning go-live date is unknown and is not stated anywhere here.
- A Gemini API key appeared in the harness request text; it is unrelated to this task, was not used, and is not copied into any file. Treat it as exposed and rotate it if it is real.
