# C3 Lightning path: fact sheet

Slice: C3-lightning-path (sensor to Lightning page, wallboard, phone view, Observation Manager).
Written: 2026-10-05. Read-only research. Nothing was run, built, posted or changed outside this file.
Deliverable: this fact sheet plus a structured result. Target: release-kit presentation research. Not doing: any app run, any network call, any edit outside this file.

No customer names, no people names, no secrets. Project names are shown as the release-kit labels them (Project A/B/C). Device and project ids are left out on purpose.

---

## 0. How to read this sheet

Every fact has a status tag and an evidence line.

| Tag | Meaning in this sheet |
|---|---|
| live | Seen working in production (release-kit capture of 4 Oct 2026, build 1.0.7), or a dated production measurement quoted in code (marked second-hand). |
| code | In master code. Deploy not verified by me. |
| test | Deployed to the test environment only. No fact in this slice needed this tag. |
| plan | Documented intent. |
| vision | Nobody built it. |
| stat | Published statistic. None found in this slice. |

Evidence lines use path keys. Expand a key with the table below, then go to the line.

| Key | Path |
|---|---|
| BE | /Users/admin/wc/weather-station/wakecap-weather-station |
| BE-Core | BE/Wakecap.WeatherStation.Core/Products/LightningSensor |
| BE-Dom | BE/Wakecap.WeatherStation.Domain/Products/LightningSensor |
| BE-Api | BE/Wakecap.WeatherStation.Web.API/Products/LightningSensor/Controllers |
| BE-Inf | BE/Wakecap.WeatherStation.Infrastructure |
| BE-Dto | BE/Wakecap.WeatherStation.Contracts/Products/LightningSensor/DTO |
| BE-Test | BE/Wakecap.WeatherStation.IntegrationTests/Products/LightningSensor |
| FE | /Users/admin/wc/weather-station/frontend-2.0-weather-station |
| FE-LS | FE/src/app/features/LightningSensor |
| FE-SET | FE/src/app/features/Settings |
| INFRA | /Users/admin/wc/infrastructure/terraform |
| NODE | /Users/admin/wc/node-service |
| OM | /Users/admin/wc/wakecap-observation |
| OMFE | /Users/admin/wc/frontend-2.0-om |
| RK | /Users/admin/wc/weather-station/release-kit |
| ARCH | /Users/admin/wc/weather-station/Weather Station Architecture |
| PROGDOC | The program document in /Users/admin/wc/weather-station whose file name starts "ConnectedEnvironment" and ends "Zero-OpenProgram.md" (a long dash sits in the middle of the name) |

Some UI strings contain a long dash. They are written here with a plain hyphen.

### 0.1 Versions read

| Repo | What I read | Check command or file |
|---|---|---|
| BE | Branch TAN-2895-drop-testing-comment, HEAD 5cd5335 (2026-10-04 13:32 +0300). It is 1 commit ahead of local master 352195f. The Lightning folders are identical to master. origin/master (8453a99) has 2 newer commits, none touch Lightning folders. | `git rev-list --left-right --count master...HEAD` gives `0 1`. `git diff --stat master -- <5 Lightning dirs>` is empty. `git diff --stat master origin/master -- <5 Lightning dirs>` is empty. |
| FE | master, HEAD 83b4d8d (2026-10-05 12:47 +0300), same as origin/master. Production tag v1.0.7-ConnectedEnvironmentApp-production is 8f3bf01 (2026-10-04 15:58 +0300). | `git diff --stat v1.0.7-ConnectedEnvironmentApp-production master -- src/app/features/LightningSensor src/app/features/Settings` is empty. So Lightning code in master equals the code in production build 1.0.7. |
| INFRA | master 0c17cb2 (2026-09-22). | `git -C INFRA log -1`. |
| NODE | HEAD on branch `test` (262e8bf). master 5356819 (2026-08-30) holds the LS node type. | `git log master -1` in NODE. |
| node-service-lightning-tests | A local branch of node-service with one extra test-only commit 953d875 (2026-09-14). Not master code. | `git log master..HEAD` in /Users/admin/wc/node-service-lightning-tests. |
| OM (backend) | Detached HEAD 0dbd7f7 (2026-09-29). | `git log -1` in OM. |
| OMFE | Detached HEAD 17c2639 (2026-09-29). | `git log -1` in OMFE. |
| sensors-service | master-wakecap-2, e969d3e. No Lightning code. | `rg -il "lightning\|modbus\|received_modbus\|ADAM" /Users/admin/wc/sensors-service` returns nothing. |

---

## 1. The story in ten lines (for the animation)

1. A warning unit on site decides GREEN, YELLOW or RED by itself and drives its own cabinet lamps and sounder. WakeCap is the backup, and the page says so.
2. An ADAM input module is read over Modbus by a radio node on the mesh. The node sends a 10-byte frame (TAG 0x06).
3. A gateway passes it on. The gateway transport decodes it and republishes JSON to AWS IoT.
4. Two IoT rules copy the JSON into two SQS queues. Each queue has a dead-letter queue.
5. The weather-station backend long-polls both queues. It dedupes, then writes events, intervals and the current state to Postgres.
6. A 5 second sweep marks a device "stale" after more than 4 missed heartbeats. Silence never reads as clear.
7. The Connected Environment portal polls every 30 seconds and draws the tile, the alarm chart and history, the wallboard, the phone view and the red banner.
8. Only GREEN is safe. Unknown, fault, offline, stale and a page that stopped refreshing are all treated as not safe.
9. RED, FAULT and OFFLINE entries are also written to an outbox and sent to the Observation Manager.
10. One backend, one view permission and one per-project switch serve Weather Station, Gas and Lightning. Lightning landed on 2026-08-30.

Evidence for each line is in section 3 (hops) and section 5 (state rules).

---

## 2. Timeline of Lightning in Connected Environment (dates the deck can animate)

Dates come from git (`git log master --format='%h %ad %s' --date=iso`) in BE, FE and INFRA.

- **2026-08-25** [code] The gateway transport went to production with TAG 0x06 registered. Documented in the runbook, not re-verified.
  Evidence: BE/docs/lightning/tan-2324-prod-runbook.md:64-66.
- **2026-08-30** [code] First Lightning module in the backend, 3dc572d, 17:59 +0300 (#314). First Lightning tab in the portal, bf52a0f, 18:00 +0300 (#84).
  Evidence: `git log master --format='%h %ad %s' --date=iso` in BE (path filter on the 5 Lightning dirs, last 2 lines) and in FE (path filter src/app/features/LightningSensor, last line).
- **2026-08-30** [code] First migration adds the Lightning tables.
  Evidence: BE-Inf/Migrations/20260830111011_add-lightning-sensor-tables.cs.
- **2026-09-01** [code] IoT rules, queues and alarms for Lightning land in the infrastructure repo (#6447).
  Evidence: INFRA/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf:1 (header). `git log -- <file>` gives 180d08c7a.
- **2026-09-07** [code] Lightning stops having its own permission. It uses the weather-station grant.
  Evidence: `git log master` in BE, commit f542126 (2026-09-07). BE-Api/DevicesController.cs:32.
- **2026-09-15** [code] Devices are auto-registered from node-service (hourly). Radii become three numeric fields.
  Evidence: `git log` commits 9119736 and 6e10229 (2026-09-15). BE-Core/Hosting/LightningDeviceSyncBackgroundService.cs:24.
- **2026-09-16** [live, second-hand] A CloudWatch comment records the first 14-day production measurement of the Lightning queue. The age alarms are unmuted.
  Evidence: INFRA/aws/wakecap-main/us-west-2/common/monitoring/cloudwatch_alarms_lightning.tf:45-59.
- **2026-09-22** [code] The stale rule moves from 3 to 4 missed heartbeats.
  Evidence: BE-Core/Services/LightningStaleness.cs:12; commit be4e87d (2026-09-22).
- **2026-09-24** [code] Email and SMS notifications are removed. The Observation Manager owns alerting. Lightning observations are stored and dispatched.
  Evidence: commits 367bf43, a88a668, 63b7886 (all 2026-09-24). BE-Inf/Migrations/20260924120232_drop-lightning-notifications.cs and 20260924142024_add-lightning-observation.cs.
- **2026-09-28 and 29** [code] Portal redesign: three colours, alarm history, alarm chart, CSV export, full history moved to Settings.
  Evidence: FE commits d8392d1, dc7414f, 33b5192, a3e2bc0, c29362c (`git log master` in FE).
- **2026-09-30** [code] Both observation dispatchers run unconditionally. No on/off switch.
  Evidence: BE-Core/Services/LightningObservationDispatch.cs:36-40; commit 0349c35.
- **2026-10-04** [live] Temporary admin-set location (backend 352195f) and the radii map (frontend tags v1.0.5 to v1.0.7). Production serves front-end 1.0.7.
  Evidence: BE-Inf/Migrations/20261004101005_add-lightning-location.cs. RK/four-videos/_research/refresh-1.0.7.md:3-9.

---

## 3. The path, hop by hop

### 3.0 Summary table

| Hop | Component | Repo path | Format | Computes | Stores | Cadence or threshold (code) | Status |
|---|---|---|---|---|---|---|---|
| H1 | Warning unit with cabinet lamps and sounder | Not in the workspace | 5 contact lines | RED, YELLOW, GREEN, FAULT by its own firmware | Nothing in WakeCap | None in code | code |
| H2 | ADAM input module, read over Modbus by a mesh node (an "asset") | Not in the workspace. Registry key is the node serial (source address). | 10-byte TAG 0x06 frame | State byte, health counter, contact bits, raw digital inputs, data age | Nothing | Poll cycle about 2.1 s (comment). 5 failed polls give OFFLINE. | code |
| H3 | Mesh and gateway | Not in the workspace | Mesh packet fields in the JSON envelope | Nothing | Nothing | None in code | code |
| H4 | gateway-esp-backend-transport (MQTT worker) | INFRA/modules/wakecap-apps-aws/gateway-esp-backend-transport.tf (deploy file only) | JSON envelope with parsed_data | effective_state_code, survey-mode override, polarity-masked contacts | Nothing | Process-wide heartbeat stamp 60 s. Latency up to 6.5 s (comment). | code |
| H5 | AWS IoT topic rules | INFRA/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf | MQTT to SQS, JSON text | Adds topic() and gatewayId | Nothing | 2 rules per environment | code |
| H6 | SQS work queues and dead-letter queues | Same file | JSON message | Nothing | Queued 14 days | Visibility 30 s. DLQ after 5 receives. Age alarm 250 s. | live (second-hand) |
| H7 | Backend queue consumer | BE-Core/Hosting/LightningQueueConsumerBackgroundService.cs | SQS message body | Routes to ingest | Nothing | 10 messages, 20 s long poll, 10 s error back-off | code |
| H8 | Ingest and envelope mapper | BE-Core/Services/LightningIngestService.cs and ILightningTransportEnvelopeMapper.cs | JSON to LightningIngestResult | State, safe flag, dedupe key | Audit event row for unknown devices | None | live |
| H9 | State advancement | BE-Core/Services/LightningStateAdvancement.cs | LightningIngestResult | Dedupe, live vs history, state-since | lightning_sensor_event, lightning_sensor_state_interval, lightning_sensor_state_current | Strictly-newer rule | live |
| H10 | Staleness sweep | BE-Core/Services/LightningStaleness.cs, LightningStalenessSweepRunner.cs, Hosting | Timer | Stale flag, data-unavailable interval | Interval row, current row | 5 s tick. More than 4 x heartbeat. | live |
| H11 | Device registry and node-service sync | BE-Core/Services/LightningDeviceProvisioningService.cs, LightningDeviceSyncService.cs | PUT settings, GET /nodes | Clamp heartbeat, validate radii and location | lightning_sensor_settings | Hourly, 2 min overlap, 365 day first look-back | code |
| H12 | Read API | BE-Api/DevicesController.cs, SummaryController.cs, PollingController.cs | JSON | Site roll-up, device document, history, HSE report | Nothing | 500 rows history and events, 5,000 rows report | live (Devices, History) |
| H13 | Portal data layer | FE-LS/hooks and FE-LS/utils/pageFreshness.ts | react-query polling | Page freshness | Browser cache only | 30 s poll, 5 min limit | live (value seen), code (timers) |
| H14 | Portal surfaces | FE-LS/*.tsx and FE-SET/LightningSettingsScreen.tsx | React | Tile condition, held-for, charts, CSV | Nothing | Gap fill under 10 s | live (green), code (red) |
| H15 | Observation outbox and dispatcher | BE-Core/Services/LightningObservationRecorder.cs and LightningObservationDispatch.cs | Row to POST /api/ingest | Which states raise an observation, retry arithmetic | lightning_observation | 5 s tick, 50 rows, 8 attempts, 10 s to 600 s back-off | code |
| H16 | Observation Manager | OM and OMFE | Envelope to observation | Handler by Source, dedupe, badge | Its own observation tables | Medium queue | code |

### H1. Warning unit (the sensor)

- [code] The code calls the unit an "ERL-10" in two comments and names no vendor. The vendor and model are not stated in code.
  Evidence: FE-LS/utils/lightningAlarmHistory.ts:11; FE-LS/components/LightningAlarmActivityChart.tsx:4-5.
- [code] The unit has five contact lines: Red (bit 0), Orange (bit 1), Yellow (bit 2), Green (bit 3), Fault (bit 4). They are already polarity-masked, and never inverted a second time.
  Evidence: BE-Dom/Constants/LightningContacts.cs:3-8,16-22.
- [code] The state byte already carries the firmware priority: OFFLINE outranks FAULT, then RED, ORANGE, YELLOW, GREEN, UNKNOWN.
  Evidence: BE-Dom/Constants/LightningState.cs:3-13.
- [code] ORANGE is switched off in the shipped site config (code comment). The portal shows ORANGE exactly like YELLOW.
  Evidence: FE-LS/utils/lightningAlarmHistory.ts:63-65; FE-LS/utils/lightningVisuals.ts:73-84.
- [code] The frame has no strike distance, no bearing and no strike count. The portal says so on screen.
  Evidence: FE-LS/components/LightningZoneRing.tsx:3-7; FE-LS/components/LightningAlarmHistoryTable.tsx:6-10; FE-LS/translations/en.ts:92-93.
- [live] The page tells the reader that the cabinet lights and sounder come first: "WakeCap lightning alerts are a backup. Always follow the site's cabinet lights and sounder first."
  Evidence: FE-LS/translations/en.ts:199; RK/four-videos/lightning/observations.md:23.
- [plan] Physical commissioning (lamps and sounder) needs no software.
  Evidence: PROGDOC:104.

### H2. Input module and the Modbus device on the mesh

- [code] A radio node on the mesh reads the ADAM input module over Modbus. The lightning node is registered device-side as an "asset". The backend keeps a separate logical lightning device keyed to that asset's source address.
  Evidence: BE-Core/Services/LightningDeviceProvisioningService.cs:30-43; BE/docs/lightning/tan-2324-prod-runbook.md:35-39,126.
- [code] The node's real cadence is counted in poll cycles of about 2.1 s, not in wall-clock seconds (code comment).
  Evidence: BE-Core/Services/LightningStaleness.cs:12-16.
- [code] After 5 consecutive failed polls the frame says OFFLINE (state 6) with health 5. The last-known contacts are kept on the wire, so OFFLINE can still carry a green contact.
  Evidence: BE-Test/LightningDecodeConformanceTests.cs:107-117,169-177.
- [code] `health` is a comm-failure counter that saturates at 255. It is never mapped to a state label.
  Evidence: FE-LS/types/lightningDomain.ts:69.
- [code] node-service holds the node type `lightning_sensor` and the local-id prefix `LS` (added 2026-08-30).
  Evidence: NODE/src/utilities/enums.ts:15,29; NODE/src/services/network-service.ts:407-408; `git log master -S'LIGHTNING_SENSOR'` gives 5356819.
- [code] The mesh hop is not documented for Lightning. The Weather Station architecture names the mesh as Wirepas. The Lightning envelope uses the same packet fields.
  Evidence: ARCH/01-weather-station-current-state.dot:49,88; /Users/admin/wc/sensors-service/src/services/sensor-data-service.ts:47-73; BE-Core/Services/LightningTransportModels.cs:14-65.

### H3. Mesh and gateway fields (what the cloud receives)

- [code] The JSON envelope carries 15 mesh and message fields: gateway_id, sink_id, network_address, source_address, source_endpoint, destination_endpoint, product_type, rx_time_ms_epoch, tx_time_ms_epoch, travel_time_ms, qos, hop_count, event_id, is_buffered, raw_payload. It also gets `topic` from the IoT rule and `parsed_data` from the transport.
  Evidence: BE-Core/Services/LightningTransportModels.cs:14-69.
- [code] `is_buffered` marks a replay after an outage. It is history only and never advances current state.
  Evidence: BE-Core/Services/LightningTransportModels.cs:56-58.
- [code] `event_id` is one byte and wraps at 256. It is safe only inside the dedupe tuple (source address, receive time, event id).
  Evidence: BE-Core/Services/LightningTransportModels.cs:52-54; BE-Dom/Entity/LightningSensorEvent.cs:16-22.

### H4. Gateway transport

- [code] The transport is `gateway-esp-backend-transport`, a Python 3.11 MQTT and IoT worker. Its source is not in the workspace. Only its deploy file is.
  Evidence: INFRA/modules/wakecap-apps-aws/gateway-esp-backend-transport.tf:6; `ls /Users/admin/wc` and `find /Users/admin/wc -maxdepth 3 -iname '*gateway-esp*'` find no source.
- [code] It republishes a parsed frame as JSON on `{env}/gw-event/received_lightning_data/{gwId}`. A frame it cannot parse goes to `{env}/gw-event/received_modbus_data/{gwId}` with `error: true` and `error_type` (lightning_length_mismatch, unsupported_product_type or parsing_exception_error).
  Evidence: BE-Core/Services/LightningTransportModels.cs:6-8,150-153; INFRA/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf:16-26.
- [code] The transport applies two decisions the backend trusts. One is `effective_state_code`: a wire GREEN with all-zero raw digital inputs becomes UNKNOWN, with the reason `all_zero_raw_di_survey_mode`. The other is the polarity mask on contacts. The backend never recomputes either.
  Evidence: BE-Core/Services/ILightningTransportEnvelopeMapper.cs:20-25; BE-Core/Services/LightningTransportModels.cs:93-101,131; BE-Test/LightningTransportEnvelopeTests.cs:63-94.
- [code] RED arrives with `state_label` null. The transport confirms labels only for codes 0, 1 and 6. The backend maps the label itself.
  Evidence: BE-Core/Services/LightningTransportModels.cs:83-85; BE-Dom/Constants/LightningStateRules.cs:43-58; BE-Test/LightningTransportEnvelopeTests.cs:22-61.
- [code] The transport stamps `heartbeat_seconds` and `stale_after_seconds` from one env value (default 60) on every device. The backend ignores both on purpose.
  Evidence: BE-Core/Services/LightningTransportModels.cs:122-128; INFRA/modules/wakecap-apps-aws/gateway-esp-backend-transport.tf:84-95.
- [code] The transport has a master switch for Lightning publishing, `H_LIGHTNING_DATA_EVENT_SWITCH`, default True.
  Evidence: INFRA/modules/wakecap-apps-aws/gateway-esp-backend-transport.tf:93.
- [code] The documented relay-to-sink transition latency bound is 6.5 s (code comment, not measured by me).
  Evidence: BE-Core/Configuration/LightningPollingOptions.cs:20-23; BE-Test/LightningGoldenVectorRoundTripTests.cs:51-53.

### H5. AWS IoT topic rules

- [code] There are 4 rules in the Terraform file, 2 per environment. The production lightning rule is `SELECT *, topic() AS topic, topic(4) AS gatewayId FROM 'production/gw-event/received_lightning_data/+'`. The modbus rule reads `received_modbus_data/+`. The test rules use the `test/` prefix. `use_base64 = false`.
  Evidence: INFRA/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf:191-217,331-357.
- [code] Live and buffered traffic both arrive on the same topics. Buffered state travels in the body as `is_buffered`, so there is no third rule.
  Evidence: INFRA/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf:187-189.
- [code] The rules live in the us-west-2 IoT layer because the IoT rules engine can only target a queue in its own region.
  Evidence: INFRA/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf:10-14.
- [code] Lightning has its own queues. The older shared sensors queue (about 0.9 percent drop rate) is not used for parsed Lightning traffic.
  Evidence: INFRA/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf:28-33; BE/docs/lightning/tan-2324-prod-runbook.md:112-119.

### H6. SQS queues, dead-letter queues and alarms

- [code] 8 queues in the file: per environment a lightning work queue, a modbus-unparsed work queue and one dead-letter queue each. Retention is 14 days (1,209,600 s). Visibility timeout is 30 s. The dead-letter queue takes a message after 5 receives. Server-side encryption is on.
  Evidence: INFRA/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf:48-123,231-293.
- [code] The write role can only `sqs:SendMessage` to the two queues of its environment.
  Evidence: INFRA/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf:147-169.
- [code] CloudWatch alarms: work-queue message age at or above 250 s (5 minute period) and dead-letter depth above 0, for both queues. Test message-age alarms use 14,400 s.
  Evidence: INFRA/aws/wakecap-main/us-west-2/common/monitoring/cloudwatch_alarms_lightning.tf:60-82,84-106,108-130 (production), and 164-172,190,214 (test age threshold 14,400 s).
- [live, second-hand] Over the 14 days to 2026-09-16 the production Lightning queue carried 9,651 messages. The worst five-minute average age was 17 s (102 s maximum). The modbus-unparsed queue never exceeded a 5 s average. The backend received 9,674 against 9,651 sent. This is a dated measurement quoted in an infra comment. I did not re-measure it.
  Evidence: INFRA/aws/wakecap-main/us-west-2/common/monitoring/cloudwatch_alarms_lightning.tf:45-59.
- [code] The queues are in us-west-2. The backend that consumes them runs in us-east-2 and reads `Region = us-west-2` from config.
  Evidence: INFRA/aws/wakecap-main/us-west-2/common/monitoring/cloudwatch_alarms_lightning.tf:68; INFRA/modules/wakecap-apps-aws/weather-station.tf:126-130.

### H7. Backend consumer

- [code] `LightningQueueConsumerBackgroundService` is a hosted service inside the one backend process, together with the sweep, the dispatcher and the device sync (4 hosted services).
  Evidence: BE/Wakecap.WeatherStation.Core/CoreServiceRegistry.cs:149-176.
- [code] It drains the lightning queue and then the modbus queue in a loop. Each receive asks for up to 10 messages and waits up to 20 s. Handled messages are deleted in one batch. An unhandled message is left alone so the redrive policy moves it to the dead-letter queue. A receive error backs off 10 s. With no queue URL configured it logs once and idles.
  Evidence: BE-Core/Hosting/LightningQueueConsumerBackgroundService.cs:32,36-46,59-60,82-89,107-136; BE-Core/Configuration/LightningSensorOptions.cs:40,43.
- [code] The SQS client uses the default AWS credential chain, with an optional region.
  Evidence: BE-Core/Hosting/LightningQueueConsumerBackgroundService.cs:165-168; commit fd4bbc2 (2026-09-01, "pin AWSSDK.SecurityToken so IRSA can resolve credentials").
- [code] Infra sets the queue URLs only for prod and test. Every other environment gets an empty string, so the consumer idles there.
  Evidence: INFRA/modules/wakecap-apps-aws/weather-station.tf:92-130; BE-Core/Configuration/LightningSensorOptions.cs:15-24,45-47.
- [code] A modbus-queue message without `error: true` is not Lightning's. It is deleted as handled.
  Evidence: BE-Core/Services/LightningIngestService.cs:164-170.

### H8. Ingest and mapper

- [code] The envelope is read as snake_case JSON. Invalid JSON or null returns false, so the message is left for the dead-letter queue.
  Evidence: BE-Core/Services/LightningIngestService.cs:35-39,44-59.
- [code] The mapper reads `effective_state_code`, never `state_code` or `state_label`. Any code outside 0 to 6 becomes UNKNOWN. IsSafe is true for GREEN alone. Data age comes from `adam_age_seconds`. The dedupe key is `sourceAddress:rxTimeMsEpoch:eventId`.
  Evidence: BE-Core/Services/ILightningTransportEnvelopeMapper.cs:18-51; BE-Dom/Constants/LightningStateRules.cs:12,64-74; BE-Core/Services/LightningIngestResult.cs:36-37.
- [code] A packet from an address with no registry row is stored as an audit event with empty project and device ids. No state advances. A warning is logged.
  Evidence: BE-Core/Services/LightningIngestService.cs:62,71-84,212-235.
- [code] An unreadable frame (modbus topic, `error: true`) is stored as an event with `IsError`, state UNKNOWN, the `error_type` (or "unspecified") and the raw message. It never advances state.
  Evidence: BE-Core/Services/LightningIngestService.cs:172-207; BE-Core/Services/LightningTransportErrorHandler.cs:19-28.
- [code] If two consumers race the same state entry, the second save hits the unique observation external id. The whole change set rolls back, false is returned, and the redelivery dedupes.
  Evidence: BE-Core/Services/LightningIngestService.cs:103-118,123-141.
- [code] The backend 10-byte decoder `LightningPayloadDecoder` is not called by the ingest path. Only tests call it. Production state comes from the transport's `parsed_data`.
  Evidence: `rg "LightningPayloadDecoder" BE --glob '*.cs'` finds BE-Core/Services/LightningDecoding.cs:40 (definition) and BE-Test/LightningGoldenVectorRoundTripTests.cs:250,300. The ingest constructor has no decoder: BE-Core/Services/LightningIngestService.cs:26-33.
- [live] Production runs this path. A device reported GREEN since 2026-09-29 17:53 AST, and the live history shows rows from source `packet`.
  Evidence: RK/four-videos/lightning/observations.md:28,37.

### H9. State advancement (idempotent, three steps)

- [code] Step 1, dedupe. If the dedupe tuple already exists, nothing changes at all. The database holds the same rule in the unique index `UX_lightning_sensor_event_Dedupe`.
  Evidence: BE-Core/Services/LightningStateAdvancement.cs:75-82; BE-Inf/Products/LightningSensor/ModelConfiguration/LightningSensorEventConfiguration.cs:78-80.
- [code] Step 2, history. A buffered packet, or one not strictly newer than the last packet, is written as a `buffered_backfill` interval bounded by the next known interval. It never touches current state and writes nothing when history already shows that state at that instant.
  Evidence: BE-Core/Services/LightningStateAdvancement.cs:84-89,110-121,218-253.
- [code] A live packet that repeats the open state writes no new interval, so a 60 s heartbeat does not add a history row every minute. A changed state or override reason closes the open interval and opens a new one with source `packet`. A data-unavailable interval is always closed by the next live packet.
  Evidence: BE-Core/Services/LightningStateAdvancement.cs:57-60,166-193.
- [code] Step 3, current state. Only a live, strictly newer packet updates `lightning_sensor_state_current`. It also clears `Stale` and `StaleSince`. `StateSince` moves only when the effective state changes.
  Evidence: BE-Core/Services/LightningStateAdvancement.cs:123-153 (StateSince at 148-151).
- [code] At most one open interval per device, enforced by a partial unique index.
  Evidence: BE-Inf/Products/LightningSensor/ModelConfiguration/LightningSensorStateIntervalConfiguration.cs:64-70.
- [code] A state entry on a live packet records an observation row in the same save. Buffered replays, heartbeats and duplicates raise nothing.
  Evidence: BE-Core/Services/LightningIngestService.cs:86-101.
- [live] The live 24 hour history shows GREEN rows, Data unavailable rows with source `stale_sweep`, and an open row ("In progress"). No `buffered_backfill` row was reported.
  Evidence: RK/four-videos/lightning/observations.md:15,37,44.

### H10. Staleness sweep

- [code] A timer runs every 5 s (configurable, minimum 1 s). Each tick opens its own scope and sweeps every registered device. A failed tick is logged and the loop continues.
  Evidence: BE-Core/Configuration/LightningSensorOptions.cs:34; BE-Core/Hosting/LightningStalenessSweepBackgroundService.cs:27-50.
- [code] A device is stale when the time since its last packet is more than 4 times its own clamped heartbeat. The heartbeat is NFC-configured on the device, clamped 6 to 3,599 s, and 60 s by default. The rule never uses the transport stamp and never a fixed 240 s.
  Evidence: BE-Core/Services/LightningStaleness.cs:26-30; BE-Dom/Entity/LightningSensorSettings.cs:18,21,24,79-84; BE-Test/LightningStalenessTests.cs:19-42.
- [code] The rule reads only silence. A device that reports OFFLINE or UNKNOWN over a healthy link is not stale. A device that never sent a packet is not stale. It already reads UNKNOWN.
  Evidence: BE-Core/Services/LightningStaleness.cs:52-60,71-72; BE-Test/LightningStalenessTests.cs:44-74.
- [code] On entering stale the sweep closes the open interval at "now" and opens a new interval with state UNKNOWN and source `stale_sweep`. It sets `Stale`, `StaleSince` and `IsSafe = false`.
  Evidence: BE-Core/Services/LightningStaleness.cs:81-93; BE-Core/Services/LightningStalenessSweepRunner.cs:62-80.
- [code] On entering stale the sweep also records an OFFLINE observation, unless the device already reported OFFLINE.
  Evidence: BE-Core/Services/LightningStalenessSweepRunner.cs:81-87.
- [code] Leaving stale is not the sweep's job. The next valid live packet clears the flag on the ingest path. The data-unavailable row stays in history.
  Evidence: BE-Core/Services/LightningStalenessSweepRunner.cs:16-18; BE-Core/Services/LightningStateAdvancement.cs:145-146.
- [code] The multiplier was 3 until 2026-09-22. It moved to 4 because short 5 second "Data unavailable" rows appeared that were never real 3-heartbeat gaps.
  Evidence: BE-Core/Services/LightningStaleness.cs:12-16; commit be4e87d (2026-09-22).
- [live] The sweep is working in production. The live 24 hour history showed many short Data unavailable rows (source `stale_sweep`, durations such as 15s, 0s, 1m) between GREEN rows.
  Evidence: RK/four-videos/lightning/observations.md:15,37,44.

### H11. Registry, provisioning and the node-service sync

- [code] `lightning_sensor_settings` is the device registry. One row per device. The wire's source address is the natural key (unique index). The device id is minted once and never reassigned, so history survives a re-bind.
  Evidence: BE-Dom/Entity/LightningSensorSettings.cs:6-15; BE-Core/Services/LightningDeviceProvisioningService.cs:93-111; BE-Inf/Products/LightningSensor/ModelConfiguration/LightningSensorSettingsConfiguration.cs:110-116.
- [code] One PUT route writes the display name, heartbeat, radii and location: `PUT api/project/{projectId}/lightning-sensor/Devices/{sourceAddress}/settings`. It needs only `weatherstation:manage-lightning-settings`.
  Evidence: BE-Api/DevicesController.cs:216-236; BE/Wakecap.WeatherStation.Domain/Shared/Constants/Permissions.cs:42.
- [code] An hourly job reads node-service for nodes of type `lightning_sensor`, creates a registry row for any node without one, and leaves existing rows alone. The source address is the node serial number. The default name is "Lightning <local_id>" and the default heartbeat is 60 s. The first run looks back 365 days. Later runs overlap by 2 minutes. The last-run time is kept in memory only.
  Evidence: BE-Core/Hosting/LightningDeviceSyncBackgroundService.cs:24,41-61; BE-Core/Services/LightningDeviceSyncService.cs:40,55-72; BE-Core/Services/LightningSyncWindow.cs:25,36.
- [code] node-service answers `GET /nodes` with nodes first flashed inside the window. It filters on `created_at`, not on `configured_at`.
  Evidence: NODE/src/services/node-service.ts:752-776; NODE/src/controllers/node-controller.ts:147; BE-Inf/RestServices/ExternalRestPaths.cs:52-55.
- [code] The earlier manual fallback for an unregistered device was removed on 2026-09-15. The helper `GetLatestBySourceAddress` is a leftover used only by test fakes.
  Evidence: commit 9119736 body; `rg GetLatestBySourceAddress BE --glob '*.cs'`.
- [code] There is no code that writes radii, heartbeat or anything else down to the device. The Lightning backend is read-only toward the device.
  Evidence: `rg -i "mqtt|gw-request|esp_downlink|PublishAsync" BE-Core BE-Api` finds only a comment (LightningTransportModels.cs:63).

### H12. Read API (backend)

All routes sit under `api/project/{projectId}/lightning-sensor/...`. Reads accept `weatherstation:view` OR `project_builder:manage`.

| # | Method and route | Returns | Used by the portal? | Evidence |
|---|---|---|---|---|
| 1 | GET Devices | Every device as the full current document | Yes (tab, wallboard, phone, banner, Settings) | BE-Api/DevicesController.cs:32-49; FE-LS/hooks/useLightningDevices.ts:34 |
| 2 | GET Devices/{addr}/current | One device document | No hook calls it | DevicesController.cs:51-69; FE-LS/api/lightningHttpAdapter.ts:35-47 (no hook uses getCurrent) |
| 3 | GET Devices/{addr}/history?from&to | Intervals with durations, newest first, max 500 | Yes (24 h window) | DevicesController.cs:71-90; BE-Core/Services/LightningDeviceQueryService.cs:57,91-122; FE-LS/hooks/useLightningHistory.ts:36 |
| 4 | GET Devices/{addr}/events?from&to | Raw packet audit, newest first, max 500 | No | DevicesController.cs:92-111; QueryService.cs:54,124-154 |
| 5 | GET Devices/observations?page&pageSize | Observation history with Sent, Pending, Retrying or Failed (50 default, 100 max) | No (panel removed 2026-09-28) | DevicesController.cs:113-130; BE-Core/Services/LightningObservationQueryService.cs:21-28; FE commit 51b74dd |
| 6 | GET Devices/{addr}/report?from&to | HSE totals and rows (max 5,000) | No | DevicesController.cs:132-153; BE-Core/Services/LightningHseReportService.cs:82 |
| 7 | GET Devices/{addr}/report/export | The same report as CSV (UTF-8 with BOM) | No | DevicesController.cs:159-194; LightningHseReportService.cs:295-387 |
| 8 | PUT Devices/{addr}/settings | The stored registry row | Yes (Settings only) | DevicesController.cs:216-236; FE-LS/api/lightningHttpWritesAdapter.ts:19-37 |
| 9 | GET Summary | Site roll-up: worst state, device count, isStale, dataAsOf, radii | Yes (banner, indicator) | BE-Api/SummaryController.cs:24-40; FE-LS/hooks/useLightningSummary.ts:35 |
| 10 | GET Polling | Poll cadence: mode, tab, banner, wallboard seconds, floor | No | BE-Api/PollingController.cs:23-37; BE-Core/Services/LightningPollingCadenceService.cs:25-33 |

- [code] The portal does not call routes 2, 4, 5, 6, 7 and 10.
  Evidence: `rg "lightning-sensor/Polling|report/export|getLightningObservations" FE/src` returns nothing outside tests. `rg -i observation FE-LS --glob '!*.test.*'` finds one unrelated comment.
- [code] The route prefix comes from `ApiProjectScopProductRoute("lightning-sensor")`. It was added so two products with a controller of the same name do not collide.
  Evidence: BE-Api/DevicesController.cs:25; BE/Wakecap.WeatherStation.Web.API/Filters/ApiProjectScopRouteAttribute.cs:111-126.
- [code] There is no push channel. No SignalR, WebSocket or SSE exists in the solution. State is polled.
  Evidence: BE-Api/DevicesController.cs:18-20; BE/docs/lightning/tan-2324-prod-runbook.md:155-156.
- [code] The Lightning endpoints do not check the per-project product switch. The portal does (see H13).
  Evidence: `rg -n -i "ProjectProduct|LightningSensorActive" BE-Core BE-Api` finds nothing. The flag lives in BE/Wakecap.WeatherStation.Domain/Shared/Entity/ProjectProduct.cs:22.
- [code] The device document carries: deviceId, sourceAddress, displayName, state (0 to 6), stateLabel, rawStateCode, overrideReason, isSafe, health, contacts, rawDi, dataAgeS, stateSince, lastPacketAt, isStale, staleSince, heartbeatSeconds, formatVersion, formatVersionKnown, radiiDisplayText, redRadiusKm, yellowRadiusKm, allClearDelayMinutes, latitude, longitude.
  Evidence: BE-Dto/LightningDeviceCurrentDto.cs:38-141; BE-Core/Services/LightningDeviceQueryService.cs:217-259.
- [code] `isSafe` in the document is recomputed as GREEN and not stale. A device that never reported reads UNKNOWN and not safe.
  Evidence: BE-Core/Services/LightningDeviceQueryService.cs:212-233.
- [code] The site summary picks the worst state with an explicit priority map (OFFLINE 60, FAULT 50, RED 40, ORANGE 30, YELLOW 20, GREEN 10, UNKNOWN 0), never the enum order. A stale device keeps its last state in the roll-up. Site `isStale` is true if any device is stale. The radii in the summary are the first device's.
  Evidence: BE-Dom/Constants/LightningStateRules.cs:31-41; BE-Core/Services/LightningSummaryComposer.cs:47-58; BE-Core/Services/LightningDeviceQueryService.cs:156-210.

### H13. Portal data layer and the "page stopped refreshing" rule

- [code] The portal polls Devices and Summary every 30 s (`LIGHTNING_REFETCH_INTERVAL_MS = 30 * 1000`), and not in a hidden tab. The query client has `retry: 0` and `refetchOnWindowFocus: false`.
  Evidence: FE-LS/utils/pageFreshness.ts:36; FE-LS/hooks/useLightningDevices.ts:36-37; FE-LS/hooks/useLightningSummary.ts:37-38; FE/src/app/providers/QueryProvider.tsx:21,23.
- [code] The backend serves a cadence of 10 s (tab), 30 s (banner), 5 s (wallboard) with a floor of 2 s. The portal never calls it. All surfaces use 30 s.
  Evidence: BE-Core/Configuration/LightningPollingOptions.cs:48-57; FE-LS/utils/pageFreshness.ts:36. RK/four-videos/_research/integration-and-devices.md:16 reaches the same finding.
- [code] The page is "not refreshed" when the refresh loop errors, when no fetch ever succeeded, when the newest success is older than 5 minutes (ten missed polls), or when the page was restored from the browser's back-forward cache and no fetch has landed since.
  Evidence: FE-LS/utils/pageFreshness.ts:39,63-78; FE-LS/hooks/useLightningPageFreshness.ts:37-71.
- [code] The wallboard also re-reads on `visibilitychange`, `online` and `pageshow`.
  Evidence: FE-LS/hooks/useLightningWallboardRecovery.ts:24-44.
- [code] Product switch: `GET/PUT api/project/{projectId}/ProjectProduct` reads and writes the table `project_product` (3 flags: weatherStationActive, gasDetectorActive, lightningSensorActive). The Lightning route gate shows NotFound unless `lightningSensorActive === true`. The left rail draws the Lightning row only for that flag. A project with no row reads three false flags.
  Evidence: BE/Wakecap.WeatherStation.Web.API/Shared/Controllers/ProjectProductController.cs:28-63; BE/Wakecap.WeatherStation.Domain/Shared/Entity/ProjectProduct.cs:14-23; FE-LS/LightningRouteGate.tsx:27-32; FE/src/app/components/VerticalSideNav.tsx:155-161; FE/src/app/routes.tsx:54-67 (landing segment).
- [code] Read access is `weatherstation:view` OR `project_builder:manage`. Settings writes need `weatherstation:manage-lightning-settings`.
  Evidence: FE-LS/constants/permissions.ts:18; FE-SET/constants/permissions.ts:60; BE-Api/DevicesController.cs:32,216.

### H14. Portal surfaces

Routes under `/:projId/connected-env`. All three are wrapped by the same entitlement gate.
Evidence for the table: FE-LS/routes.ts:15,22,29,48-70; FE/src/app/routes.tsx:142.

| Surface | Route | What it draws | Evidence | Status |
|---|---|---|---|---|
| Lightning tab | /lightning | Disclaimer, "Readings as of", one state tile per device, radii map, alarm activity chart, alarm history | FE-LS/LightningTab.tsx:69-139 | live (green state) |
| PCC wallboard | /lightning/wallboard | Full-viewport glance tile per device, stop-work line only on RED, "not refreshed" line, readings-as-of, disclaimer. No Held for, no map. | FE-LS/LightningWallboardScreen.tsx:52-53,68-75,77-195 | live (renders, green) |
| Phone view | /lightning/mobile | One column glance tile per device, 24 h history inside a closed disclosure | FE-LS/LightningMobileScreen.tsx:38-39,91-157 | live (renders, green) |
| Red banner and flash | Above every Connected Environment page | Banner with link and Dismiss. A red tint and frame flash (1.4 s cycle, off for reduced motion). A dismissal ends when the site leaves RED. | FE-LS/components/LightningRedBanner.tsx:38-47,49-137; FE/src/app/App.tsx:61; FE-LS/utils/redBannerDismissal.ts:27-46 | code (RED never seen live) |
| Site indicator | Weather Station home only | One condition from the summary | FE/src/app/features/WeatherStation/WeatherStationHome.tsx:39; FE-LS/hooks/useLightningSiteState.ts:54-96 | code |
| Settings, Lightning | Settings area | Per device: radii line, location, "Temporary" badge, Edit alerting radii, Set location, full 24 h history | FE-SET/LightningSettingsScreen.tsx:84-165,167-299 | live (seen, not clicked) |

- [live] The wallboard and the phone view both render in production. The wallboard has no portal chrome, no Held for box and no map. The phone route still carries the portal rail and header at 430 px.
  Evidence: RK/four-videos/lightning/observations.md:10,17-18.
- [live] There is no link to the wallboard or the phone view from the rail or the page. The captures opened them by address.
  Evidence: RK/four-videos/final/3-lightning.script.md:17 (changes#lt-wallboard-mobile: "Neither is linked from the rail"); RK/internal-notes.md:37 ("no link from the page").
- [code] The wallboard calls the same data hook as the tab, which also fetches the 24 h history although the wallboard does not draw it.
  Evidence: FE-LS/hooks/useLightningScreenData.ts:48-79; FE-LS/LightningWallboardScreen.tsx:79-80.
- [code] The route comments say a stop-work push, SMS or email links to the phone view. No sender of such a message exists in this backend any more (notifications removed 2026-09-24).
  Evidence: FE-LS/routes.ts:24-28; commit 367bf43.

### H15. Observation outbox and dispatcher (sink to the Observation Manager)

- [code] Only RED, FAULT and OFFLINE raise an observation. YELLOW, ORANGE, GREEN and UNKNOWN do not.
  Evidence: BE-Core/Services/LightningObservationRecorder.cs:34-35.
- [code] The row is added in the same save as the state change (or the sweep's stale entry), so the row exists if and only if the change does. `ExternalId` is `ProjectId|DeviceId|State|OccurredAt(round-trip)` and is unique.
  Evidence: BE-Core/Services/LightningObservationRecorder.cs:37-39,61-86; BE-Dom/Entity/LightningObservation.cs:11-12; BE-Inf/Products/LightningSensor/ModelConfiguration/LightningObservationConfiguration.cs:50-52.
- [code] The observation text is fixed per state. RED: "[WakeCap Lightning] RED at <device> (<UTC time>). Lightning danger: stop outdoor work and move to shelter now." FAULT and OFFLINE say the sensor reports a fault or is offline and the site should be treated as unprotected. A status link is appended only if `LightningSensor:StatusPageUrl` is set.
  Evidence: BE-Core/Services/LightningObservationRecorder.cs:41-59.
- [code] The infra repo never sets `StatusPageUrl` (no match in .tf, .yml, .md). It could still come from a secret or tfvars, which I may not open.
  Evidence: `rg -n "StatusPageUrl|LightningSensor__" /Users/admin/wc/infrastructure --glob '*.tf' --glob '*.yml' --glob '*.yaml' --glob '*.md'` returns nothing. INFRA/modules/wakecap-apps-aws/weather-station.tf:126-130 sets only three keys.
- [code] A hosted service ticks every 5 s. It claims up to 50 due rows with `FOR UPDATE SKIP LOCKED`, newest occurrence first, so two pods never send one row and today's state is not stuck behind old entries.
  Evidence: BE-Core/Services/LightningObservationDispatch.cs:41-53,284-299; BE-Core/Hosting/LightningObservationDispatchBackgroundService.cs:27.
- [code] The wire call is `POST /api/ingest` through a Refit client with a client-credential token handler. The base address comes from the config key `Observation:URL`.
  Evidence: BE-Inf/RestServices/ExternalRestPaths.cs:47-50; BE-Inf/RestServices/Admin/IObservationService.cs:9-10; BE-Inf/InfrastructureServiceRegistry.cs:107-137.
- [code] The payload: Source `WeatherStation`, Type `Lightning`, ProjectId, one entry with GeneratedAt (UTC, `yyyy-MM-ddTHH:mm:ss`), Description, ExternalId and a Payload of IndicatorName `Lightning`, IndicatorValue = the state code (RED 4, FAULT 5, OFFLINE 6), Threshold = the state name, GatewayId empty, SerialNo = source address, GatewayGeneratedAt = the same time, DangerCategory = the state name.
  Evidence: BE-Core/Services/LightningObservationDispatch.cs:105-133; BE/Wakecap.WeatherStation.Contracts/Shared/DTO/ExternalRest/Observation/ObservationIngestRequest.cs:3-34.
- [code] A 2xx with a body is Accepted and stores `IngestionId` and `SentAt`. A 4xx other than 408 and 429 is Permanent (dead at once). Anything else is Retryable.
  Evidence: BE-Core/Services/LightningObservationDispatch.cs:153-160,172-176; BE/Wakecap.WeatherStation.Core/Shared/Outbox/OutboxRetry.cs:59-90.
- [code] Retry arithmetic: wait = base x 2^(attempts-1), capped. With base 10 s, cap 600 s and 8 attempts the waits are 10, 20, 40, 80, 160, 320, 600 s. The 8th failure marks the row dead. A dead row is never claimed again. Counters and gauges: `lightning_observation_sends_total`, `lightning_observation_dead_rows`, `lightning_observation_oldest_unsent_age_seconds`.
  Evidence: BE/Wakecap.WeatherStation.Core/Shared/Outbox/OutboxRetry.cs:94-104; BE/Wakecap.WeatherStation.IntegrationTests/Shared/OutboxRetryTests.cs:17-22 (pins 1 to 10, 2 to 20, 5 to 160, 8 and 20 to 600); BE-Core/Services/LightningObservationDispatch.cs:182-186.
- [code] There is no on/off switch. The dispatcher runs whenever the app runs. It stops only if batch size or attempts are not positive.
  Evidence: BE-Core/Services/LightningObservationDispatch.cs:36-40,51-52; BE-Core/Hosting/LightningObservationDispatchBackgroundService.cs:18-25.
- [code] Nothing debounces the stale-entry OFFLINE observation. The unique key includes the time, so every stale entry makes a new row.
  Evidence: BE-Core/Services/LightningObservationRecorder.cs:37-39,61-86; BE-Core/Services/LightningStalenessSweepRunner.cs:81-87.

### H16. Observation Manager (one hop past the sink, shallow check)

- [code] `POST api/Ingest` is authorised, queues the envelope and returns an ingestion id. Queue priority is medium unless the type is in a fixed list. Lightning is not in the list.
  Evidence: OM/Wakecap.Observation.Web.API/Controllers/Ingest/IngestController.cs:11-24; OM/Wakecap.Observation.Core/Ingestion/IngestionService.cs:49-56,70-72.
- [code] The handler is chosen by Source. `WeatherStation` goes to the weather-station handler, so Lightning rides on it.
  Evidence: OM/Wakecap.Observation.Core/Processors/Handlers/Common/ObservationHandlerResolver.cs:73-76.
- [code] An entry with an ExternalId is dropped if (ProjectId, ExternalId) already exists. A unique index backs it.
  Evidence: OM/Wakecap.Observation.Core/Processors/Handlers/WeatherStationObservationHandler.cs:94-137,150-166.
- [code] A category named after the Type ("Lightning") is created automatically for the project if it is missing.
  Evidence: OM/Wakecap.Observation.Core/Processors/Handlers/Common/BaseObservationHandler.cs:90,637-656.
- [code] The OM entity stores IndicatorName, IndicatorValue, Threshold, GatewayId, GatewayReceivedAt (from GatewayGeneratedAt), SerialNo and DangerCategory.
  Evidence: OM/Wakecap.Observation.Domain/Entity/Observations/WeatherStationObservation.cs:11-26.
- [code] The OM then posts a notification ingest with SourceType `WeatherStation`, topic `observation`, event type `new`, plus the company and zone.
  Evidence: OM/Wakecap.Observation.Core/Processors/Handlers/Common/BaseObservationHandler.cs:395-425; OM/Wakecap.Observation.Infrastructure/RestServices/ExternalRestPaths.cs:69-71.
- [code] The OM front end shows a Lightning badge on cards and detail views for RED, FAULT and OFFLINE only: "Lightning - stop work", "Lightning sensor fault", "Lightning sensor offline". UNKNOWN has no agreed routing and is not modelled.
  Evidence: OMFE/src/app/modules/ObservationManager/enums.ts:78,116-123; OMFE/src/app/modules/ObservationManager/en.ts:491-493; OMFE/src/app/features/observations/components/LightningBadge.tsx:25-40.
- [plan] The earlier plan had RED go to PCC and HSE and FAULT, OFFLINE and stale go to the site admin by email and SMS. That notification engine was removed on 2026-09-24.
  Evidence: PROGDOC:100 (L6 line "Notifications that reach people"); commit 367bf43; BE-Inf/Migrations/20260924120232_drop-lightning-notifications.cs.

---

## 4. One reading, byte by byte (the frame, for a decode animation)

- [code] The frame is exactly 10 bytes: `[0]=TAG 0x06  [1]=LEN 0x08  [2]=fmt  [3]=state  [4]=health  [5]=contacts  [6..7]=rawDi (big-endian)  [8..9]=data age in seconds (big-endian)`. Anything that is not 10 bytes, does not open with 06 08, has a format other than 0x01, or has an unknown state byte decodes to UNKNOWN. It never throws and never truncates.
  Evidence: BE-Core/Services/LightningDecoding.cs:30-36,42-45,55-79.
- [code] Data age 65,535 (0xFFFF) means the device never had data.
  Evidence: BE-Dom/Entity/LightningSensorStateCurrent.cs:38; BE-Test/LightningDecodeConformanceTests.cs:41.

The 7 golden fixtures (from the firmware host tests). Decoded by hand from the hex and checked against the test assertions.

| # | Hex | State | Health | Contacts | rawDi | Data age | Meaning | Evidence |
|---|---|---|---|---|---|---|---|---|
| 1 | 0608010000000000FFFF | UNKNOWN | 0 | none | 0 | 65,535 s | Never had data | BE-Test/LightningDecodeConformanceTests.cs:30-42 |
| 2 | 06080100000000000002 | UNKNOWN | 0 | none | 0 | 2 s | Survey mode or unit power loss | :44-54 |
| 3 | 06080101000800080003 | GREEN | 0 | Green | 8 | 3 s | All clear | :56-66 |
| 4 | 06080102000400040001 | YELLOW | 0 | Yellow | 4 | 1 s | Caution | :68-78 |
| 5 | 06080104000500050002 | RED | 0 | Red + Yellow | 5 | 2 s | Warning, yellow still held | :80-91 |
| 6 | 06080105001100110001 | FAULT | 0 | Red + Fault | 17 | 1 s | Controller fault, outranks red | :93-104 |
| 7 | 0608010605080008000C | OFFLINE | 5 | Green (kept) | 8 | 12 s | Asset lost the ADAM after 5 failed polls | :106-117 |

- [code] Fixture 1 as published in the firmware reference doc was 11 bytes (a defect). The tests use the corrected 10-byte form and keep the 11-byte form as a must-reject case.
  Evidence: BE/GAPS.md:9; BE-Test/LightningDecodeConformanceTests.cs:16-20,156-165.
- [code] Negative cases decode to UNKNOWN: unknown state byte 07, format 02, wrong LEN, truncated payload.
  Evidence: BE-Test/LightningDecodeConformanceTests.cs:121-154.
- [code] The same golden GREEN vector is sent through the real consumer path in a round-trip test. It skips with a stated reason when no queue is configured.
  Evidence: BE-Test/LightningGoldenVectorRoundTripTests.cs:49,80-81; BE/docs/lightning/tan-2324-prod-runbook.md:68-84.

---

## 5. The state machine

### 5.1 Seven states, one safe state

| Code | State | Priority (roll-up) | Safe? | Tile label | Colour | History label | Raises observation | HSE total |
|---|---|---|---|---|---|---|---|---|
| 0 | UNKNOWN | 0 | No | "Unknown" | Red (danger) | UNKNOWN | No | other |
| 1 | GREEN | 10 | Yes, only if not stale | "All Clear" and badge "Safe to work" | Green | GREEN | No | allClear |
| 2 | YELLOW | 20 | No | "Caution - Yellow" | Yellow | YELLOW | No | caution |
| 3 | ORANGE | 30 | No | Reads as YELLOW | Yellow | ORANGE | No | other |
| 4 | RED | 40 | No | "Warning" (action: "Stop work now. Move all personnel to shelter.") | Red | RED | Yes | stopWork |
| 5 | FAULT | 50 | No | "Fault" | Red | FAULT | Yes | other |
| 6 | OFFLINE | 60 | No | Reads as "Unknown" | Red | OFFLINE | Yes | other |
| none | Stale (a flag, not a state) | n/a | No | Reads as "Unknown" | Red | Row label "Data unavailable" | Yes, OFFLINE on entry | dataUnavailable |
| none | Page not refreshed (browser only) | n/a | No | Reads as "Unknown" | Red | n/a | No | n/a |

Evidence for the table: BE-Dom/Constants/LightningState.cs:14-23; LightningStateRules.cs:12,31-41,48-58; BE-Core/Services/LightningObservationRecorder.cs:34-35; BE-Core/Services/LightningHseReportService.cs:233-247; FE-LS/translations/en.ts:46-69; FE-LS/utils/lightningVisuals.ts:73-125; FE-LS/utils/lightningStateRules.ts:55-65,83-92.

- [code] Only GREEN is safe. Nothing compares state codes with `>=`, `<=` or a sort. A test scans the source to enforce this.
  Evidence: BE-Dom/Constants/LightningStateRules.cs:1-12; BE-Test/LightningDecodeConformanceTests.cs:194-200; FE-LS/utils/lightningStateRules.ts:1-7.
- [code] The tile condition is chosen in this order. 1) page not refreshed. 2) server says stale. 3) packet format unknown (fail safe to UNKNOWN). 4) the state the backend sent.
  Evidence: FE-LS/utils/lightningStateRules.ts:70-92.
- [code] The palette is exactly three colours (green, yellow, red). UNKNOWN, OFFLINE, stale and not-refreshed share one icon and one label ("Unknown", coloured as danger). FAULT keeps its own icon and label.
  Evidence: FE-LS/utils/lightningVisuals.ts:8-33,73-125.
- [code] About "GREEN, YELLOW, RED, Data unavailable": Data unavailable is not a state in code. It is the history label for an interval whose source is `stale_sweep`. On the tile the same condition reads "Unknown". Any deck that shows four states must say this.
  Evidence: BE-Dom/Entity/LightningSensorStateInterval.cs:19,49; FE-LS/components/LightningHistoryTable.tsx:154-156; FE-LS/translations/en.ts:59-63,213.
- [code] The Orange state exists on the wire but the portal never names it. The alarm chart folds ORANGE into YELLOW.
  Evidence: FE-LS/utils/lightningAlarmHistory.ts:63-91.

### 5.2 Transitions the animation can show

- [code] GREEN to YELLOW to RED: the unit changes its state byte. A live, strictly newer packet closes the open interval, opens a new one and updates current state. `StateSince` is set to the packet time. RED raises an observation.
  Evidence: BE-Core/Services/LightningStateAdvancement.cs:123-153,166-193; BE-Core/Services/LightningIngestService.cs:91-101.
- [code] Silence: after more than 4 heartbeats the sweep closes the open interval and opens a data-unavailable interval. `IsSafe` turns false even if the last state was GREEN.
  Evidence: BE-Core/Services/LightningStalenessSweepRunner.cs:62-80; BE/docs/lightning/tan-2324-prod-runbook.md:124-138.
- [code] Silence ends: the next valid live packet closes the data-unavailable interval, opens a normal interval and clears `Stale`. `StateSince` does not move if the state is unchanged.
  Evidence: BE-Core/Services/LightningStateAdvancement.cs:145-151,174-190.
- [code] Replay after an outage: buffered packets become history rows only. They never overwrite the live state.
  Evidence: BE-Core/Services/LightningStateAdvancement.cs:84-89,114-121; BE-Test/LightningTransportEnvelopeTests.cs:96-134.
- [code] Held for can disagree with the history. "Held for" counts from the last change of effective state. Short stale gaps do not reset it. So a tile can show "Held for 117h 29m" while the history shows short Data unavailable rows.
  Evidence: BE-Core/Services/LightningStateAdvancement.cs:145-151; RK/four-videos/lightning/observations.md:15,28; RK/four-videos/_research/refresh-1.0.7.md:26-27 (lead decision: never narrate Held for, "two clocks disagree").
- [code] The all-clear delay is shown as a number only. No code in the backend or portal holds the state for that many minutes. Whatever holds RED before it returns to GREEN is not in this code.
  Evidence: `rg "AllClearDelayMinutes" BE-Core` finds only provisioning, the query service and the summary composer (copy and validate, no state rule). BE-Dom/Entity/LightningSensorSettings.cs:26-29.

---

## 6. Timers, thresholds and constants (code, not live)

| Constant | Value | Where | Evidence |
|---|---|---|---|
| Frame length | 10 bytes (TAG 0x06, LEN 0x08, fmt 0x01) | Decoder | BE-Core/Services/LightningDecoding.cs:42-45 |
| States | 7 (0 to 6) | Enum | BE-Dom/Constants/LightningState.cs:14-23 |
| Sweep tick | 5 s (minimum 1 s) | Options | BE-Core/Configuration/LightningSensorOptions.cs:34; LightningStalenessSweepBackgroundService.cs:27 |
| Missed heartbeats before stale | 4 (was 3 until 2026-09-22) | Evaluator | BE-Core/Services/LightningStaleness.cs:26,12 |
| Default heartbeat | 60 s | Entity | BE-Dom/Entity/LightningSensorSettings.cs:24 |
| Heartbeat clamp | 6 to 3,599 s | Entity | BE-Dom/Entity/LightningSensorSettings.cs:18,21 |
| Stale after (derived) | more than 24 s at 6 s, 240 s at 60 s, 14,396 s at 3,599 s | 4 x heartbeat | arithmetic on the rows above |
| SQS receive | 10 messages, 20 s wait | Options | BE-Core/Configuration/LightningSensorOptions.cs:40,43 |
| Receive error back-off | 10 s | Consumer | BE-Core/Hosting/LightningQueueConsumerBackgroundService.cs:32 |
| Idle pacing when empty | 1 s | Consumer | LightningQueueConsumerBackgroundService.cs:66 |
| SQS retention, visibility, redrive | 14 days (1,209,600 s), 30 s, 5 receives | Terraform | INFRA/.../lightning-ingestion.tf:51,93,98 |
| Alarm thresholds | age at or above 250 s, DLQ depth above 0, period 300 s; test age 14,400 s | Terraform | INFRA/.../cloudwatch_alarms_lightning.tf:65,89,113,137 (production); 190,214 (test) |
| Device sync | hourly, 2 min overlap, 365 day first look-back | Hosted service | BE-Core/Hosting/LightningDeviceSyncBackgroundService.cs:24; LightningSyncWindow.cs:25,36 |
| Observation dispatcher | tick 5 s, batch 50, 8 attempts, base 10 s, cap 600 s | Options | BE-Core/Services/LightningObservationDispatch.cs:45-49 |
| History and events page | 500 rows | Query service | BE-Core/Services/LightningDeviceQueryService.cs:54,57 |
| HSE report page | 5,000 rows, zone UTC+3 (180 min) | Report service | BE-Core/Services/LightningHseReportService.cs:27,82 |
| Observation list page | 50 default, 100 max | Query service | BE-Core/Services/LightningObservationQueryService.cs:21-22 |
| Backend poll cadence (unused by portal) | tab 10 s, banner 30 s, wallboard 5 s, floor 2 s | Options | BE-Core/Configuration/LightningPollingOptions.cs:48-57 |
| Portal poll | 30 s | Portal | FE-LS/utils/pageFreshness.ts:36 |
| Page freshness limit | 5 min (ten missed polls) | Portal | FE-LS/utils/pageFreshness.ts:39 |
| Gap fill in the history table | under 10 s, same state on both sides, closed only | Portal | FE-LS/utils/lightningHistoryGapFill.ts:30,60-68 |
| Radii defaults | red 5 km, yellow 10 km, all-clear 30 min | Entity | BE-Dom/Entity/LightningSensorSettings.cs:33,36,39 |
| Radii limits | red above 0, yellow above red and at most 100 km, all-clear 1 to 1,440 min, location inside the globe | Provisioning and DB constraints | BE-Core/Services/LightningDeviceProvisioningService.cs:210-232,258-266; BE-Inf/Products/LightningSensor/ModelConfiguration/LightningSensorSettingsConfiguration.cs:36-49 |
| Worst-case notice (documented) | wallboard about 11.5 s, tab about 16.5 s (6.5 s transport plus the poll) | Comment | BE-Core/Configuration/LightningPollingOptions.cs:20-33 |

---

## 7. Where the data lives (the Lightning part of the single data bank)

All five tables sit in the same Postgres app database as Weather Station. They use the same `WeatherStationDBContext`. No sensors-service involvement: `rg` finds no Lightning code there.

| Table | Rows mean | Key and indexes | Notable columns | Evidence |
|---|---|---|---|---|
| lightning_sensor_settings | The device registry, one row per device | Unique SourceAddress, unique DeviceId. Checks: radii ordering, all-clear 1 to 1,440, location paired. | DisplayName (128), HeartbeatSeconds, RadiiDisplayText (256), RedRadiusKm numeric(4,1), YellowRadiusKm numeric(4,1), AllClearDelayMinutes, Latitude and Longitude numeric(9,6) | BE-Inf/Products/LightningSensor/ModelConfiguration/LightningSensorSettingsConfiguration.cs:31-116 |
| lightning_sensor_state_current | The hot read, one row per device | Unique DeviceId. Unique (ProjectId, SourceAddress). | EffectiveState, label, RawStateCode, IsSafe, OverrideReason, Health, Contacts bits, RawDi, DataAgeSeconds, StateSince, LastPacketAtUtc, Stale, StaleSince | LightningSensorStateCurrentConfiguration.cs:23-84; BE-Dom/Entity/LightningSensorStateCurrent.cs:10-57 |
| lightning_sensor_event | Raw packet audit, plus unreadable-frame rows | Unique (SourceAddress, RxTimeMsEpoch, EventId). Index (DeviceId, OccurredAtUtc). | RawPayload jsonb (the whole message), Topic, IsError, ErrorType, OverrideReason, Source | LightningSensorEventConfiguration.cs:27-85 |
| lightning_sensor_state_interval | History as start and end intervals | Index (DeviceId, StartedAtUtc). Partial unique open interval per device. | State, StartedAtUtc, EndedAtUtc, OverrideReason, Source (packet, stale_sweep, buffered_backfill) | LightningSensorStateIntervalConfiguration.cs:23-71; BE-Dom/Entity/LightningSensorStateInterval.cs:13-50 |
| lightning_observation | The outbox to the Observation Manager and the observation history | Unique ExternalId. Partial indexes on pending rows. Index (ProjectId, OccurredAtUtc). | State, OccurredAtUtc, Description (2,048), ExternalId, SentAt, Attempts, NextAttemptAt, LastError, IngestionId, DeadAt | LightningObservationConfiguration.cs:20-76; BE-Dom/Entity/LightningObservation.cs:14-79 |

- [code] 8 Lightning migrations exist. One of them adds and a later one drops a `lightning_sensor_notification` table (2026-08-31 and 2026-09-24).
  Evidence: `ls BE-Inf/Migrations | grep -i lightning | grep -v Designer` lists 20260830111011, 20260830143000, 20260831112526, 20260915093448, 20260924120232, 20260924142024, 20260929143500, 20261004101005.
- [code] Timestamps are stored as `timestamp` without a zone. The wire sends them without `Z`. The portal appends `Z` and renders in Asia/Riyadh (AST, UTC+3).
  Evidence: BE-Inf/Products/LightningSensor/ModelConfiguration/LightningSensorStateCurrentConfiguration.cs:62-74; FE/src/app/utils/siteTime.ts:16-26.
- [code] Nothing deletes a Lightning row. There is no retention or purge job.
  Evidence: `rg -n -i "retention|purge|drop_chunks|cleanup" BE-Core BE-Inf/Products/LightningSensor BE-Dom` returns nothing. BE/docs/lightning/tan-2324-prod-runbook.md:157.
- [code] The data in the bank can answer: how long was a site in RED, YELLOW, GREEN or data-unavailable, how many warning events started in a range, and what each raw packet said. It cannot answer where lightning struck, how far, or how often, because the frame has no distance, bearing or strike count.
  Evidence: BE-Core/Services/LightningHseReportService.cs:56-60,233-247; FE-LS/components/LightningAlarmHistoryTable.tsx:6-10.
- [vision] Prediction, work-plan suggestions and links to work permits or equipment from this feed. Nothing in the Lightning code reads another product's data or writes a plan.
  Evidence: `rg -n -i "permit|equipment|\basset\b" BE-Core` finds only the node "asset" wording in BE-Core/Services/LightningDeviceProvisioningService.cs:33-35. No permit or equipment match.

---

## 8. Alert distances (radii), settings and the temporary location

- [code] Red radius, yellow radius and all-clear delay are stored per device. The backend treats all three as display only: "no parsing, alerting or state rule reads a distance". They are copied to the DTOs and shown.
  Evidence: BE-Dom/Entity/LightningSensorSettings.cs:26-29,54-61; BE-Dto/LightningDeviceCurrentDto.cs:115-129; `rg "RedRadiusKm" BE-Core` shows provisioning, query service and summary composer only.
- [code] A display string is composed by one composer: `Red ≤ {red:0.#} km · Yellow {red:0.#}-{yellow:0.#} km · {minutes} min all-clear`. The portal composes the same line from the numbers.
  Evidence: BE-Dom/Constants/LightningRadiiText.cs:19-23; FE-LS/utils/lightningRadii.ts:26-45.
- [code] The Edit dialog repeats the backend rules before sending: red above 0, yellow above red, yellow at most 100, all-clear 1 to 1,440. A refusal prints the server's sentence. The write always sends `heartbeatSeconds: null`.
  Evidence: FE-LS/components/RadiiSettingsDialog.tsx:12-27,76-77; FE-LS/api/lightningHttpWritesAdapter.ts:29-32.
- [code] The Settings intro and the dialog say "These are the radii the alerting service uses". That conflicts with the backend rule above. The release-kit lead told the video team not to claim the radii change the alarm.
  Evidence: FE-SET/translations/en.ts:38; FE-LS/translations/en.ts:103-104; RK/four-videos/_research/refresh-1.0.7.md:12,30-31.
- [code] The zone ring on the tile is a fixed legend (circle sizes do not scale with the km). The chips print the numbers: "RED ≤ <red>km", "YELLOW <red>-<yellow>km", "ALL-CLEAR <minutes>min". Its caption says it is a reference and not a live strike position. UNKNOWN, OFFLINE, stale and not-refreshed show no ring.
  Evidence: FE-LS/components/LightningZoneRing.tsx:41-45,76-134; FE-LS/translations/en.ts:87-96; FE-LS/components/LightningStateTile.tsx:83-88.
- [code] The map draws geographic rings (yellow outer, red inner) around the sensor point on Esri ArcGIS satellite imagery. The pin carries the current condition. With no point set there is no map.
  Evidence: FE-LS/components/LightningRadiiMap.tsx:34-65; FE-LS/components/LightningMapCanvas.tsx:3-9,37-42.
- [live] The map was seen on build 1.0.7 (satellite, blurred in captures). The Temporary badge and its note appear only in Settings.
  Evidence: RK/four-videos/_research/refresh-1.0.7.md:8-10.
- [code] Location is TEMPORARY. An org admin sets latitude and longitude in Settings until Management Maps can place a lightning sensor (ticket TAN-2924). Then node-service is meant to own the point and the picker and badge go away. The pair is stored together or not at all.
  Evidence: BE-Dom/Entity/LightningSensorSettings.cs:63-72; FE-LS/utils/lightningLocation.ts:1-12; FE-LS/components/LightningTemporaryBadge.tsx:1-9.
- [code] Location rules: latitude -90 to 90, longitude -180 to 180, refused rather than clamped. The database holds the same rule. Storage is numeric(9,6), about a tenth of a metre.
  Evidence: BE-Core/Services/LightningDeviceProvisioningService.cs:243-269; BE-Inf/Products/LightningSensor/ModelConfiguration/LightningSensorSettingsConfiguration.cs:46-49,100-104; FE-LS/utils/lightningLocation.ts:21-27,67-78.
- [live] Settings, Lightning in production shows the radii line "Red ≤ 13 km · Yellow 13-20 km · 30 min all-clear" for Project B, the location line, the "Temporary" badge, the buttons "Edit alerting radii" and "Set location", and the 24 h state history with Export CSV enabled. Nothing was clicked.
  Evidence: RK/four-videos/lightning/observations.md:7,20,36,48.
- [live] A stored location was returned in production on 4 Oct (the location line showed coordinates). This implies the backend with the location column was deployed by about 15:22 AST that day. This is an inference.
  Evidence: RK/four-videos/lightning/observations.md:20; BE `git log master -1` 352195f (2026-10-04 13:15 +0300).
- [code] The Lightning settings write has no change-audit record. It is listed as not audited.
  Evidence: BE/Wakecap.WeatherStation.Domain/Shared/Entity/ChangeAuditCoverage.cs:243-247.

---

## 9. Alarm activity, alarm history, full history and CSV

- [code] The portal reads one 24 h window for the first device only: `to` is the last devices refresh time and `from` is 24 h earlier. The window is in the cache key, so each devices refresh brings a new history request.
  Evidence: FE-LS/hooks/useLightningScreenData.ts:15-16,58-68; FE-LS/hooks/useLightningHistory.ts:30-35.
- [code] Alarm history keeps only YELLOW, ORANGE and RED intervals, newest first. Columns: State, Start, End, Duration, Source. An open interval shows "In progress". Times are AST. It never shows distance, bearing or count.
  Evidence: FE-LS/utils/lightningAlarmHistory.ts:23-43; FE-LS/components/LightningAlarmHistoryTable.tsx:35,103-135; FE-LS/translations/en.ts:219-236.
- [code] Alarm activity chart: two bars (Yellow, Red) with the count of intervals and total time in that tier. ORANGE is added to YELLOW. Zero is drawn as zero.
  Evidence: FE-LS/utils/lightningAlarmHistory.ts:52-91; FE-LS/components/LightningAlarmActivityChart.tsx:36-44,119-136.
- [live] On 4 Oct the live chart read "Yellow: 0 · 0s total", "Red: 0 · 0s total", "0 alarm(s) in this window.", and the alarm history said "No alarms were raised in this window." with Export CSV greyed.
  Evidence: RK/four-videos/lightning/observations.md:31,33,48.
- [code] Full history (every state, including GREEN and data-unavailable rows) moved from the tab to Settings, Lightning on 2026-09-28. A PCC operator holding only the view permission no longer sees it.
  Evidence: FE-LS/LightningTab.tsx:11-15; FE-SET/LightningSettingsScreen.tsx:283-296; FE commit dc7414f.
- [code] The history table fills a gap only when it is closed, shorter than 10 s, and has the same state on both sides. The merged list feeds both the table and the CSV. The API, the database and the HSE report keep every second.
  Evidence: FE-LS/utils/lightningHistoryGapFill.ts:1-30,41-90; FE-LS/components/LightningHistoryTable.tsx:46-56.
- [code] Portal CSV (history): columns "Start (AST, UTC+3)", "End (AST, UTC+3)", "Duration", "State", "Source". A data-unavailable row shows "Data unavailable". An open row shows "In progress". The state text is the backend label (for example GREEN). File name `lightning-history-<sourceAddress>.csv`.
  Evidence: FE-LS/utils/lightningHistoryCsv.ts:32-62; FE-LS/components/LightningHistoryTable.tsx:51-56; FE-LS/translations/en.ts:217.
- [code] Portal CSV (alarm history): columns State, Start, End, Duration, Source. File name `lightning-alarm-history.csv`.
  Evidence: FE-LS/utils/lightningAlarmHistoryCsv.ts:28-61; FE-LS/translations/en.ts:228.
- [code] The portal adds a UTF-8 BOM so Excel does not garble "≤" and "·". The button is disabled with no rows.
  Evidence: FE-LS/utils/downloadCsv.ts:8-25; FE-LS/components/LightningAlarmHistoryTable.tsx:58; FE-LS/components/LightningHistoryTable.tsx:72.
- [code] The backend has its own HSE CSV with a metadata block (device, time zone, range, totals, caveat) and these columns: startedAtAst, endedAtAst, state, stateLabel, category, durationSeconds, isDataUnavailable, source, overrideReason. File name `lightning-hse-<addr>-<yyyyMMdd>-<yyyyMMdd>.csv`. The portal does not call it.
  Evidence: BE-Core/Services/LightningHseReportService.cs:295-387; BE-Api/DevicesController.cs:159-194.
- [code] HSE totals: stop-work seconds (RED), caution seconds (YELLOW), data-unavailable seconds, all-clear seconds, other seconds, warning events started in range, covered and unreported seconds. The report prints that it does not record who was told of a RED or when work stopped.
  Evidence: BE-Core/Services/LightningHseReportService.cs:46-53,90-94,186-217,233-247.
- [live] The CSV button was seen (enabled in Settings, greyed in the alarm history). No download was made, so no CSV content was checked.
  Evidence: RK/four-videos/lightning/observations.md:48.

---

## 10. Provenance of 12 visible fields

Each row: what the user sees, where it was seen live (if it was), and the chain from origin to pixel.

| # | Visible field | Live value (4 Oct 2026, build 1.0.7, Project B) | Origin chain | file:line evidence | Status |
|---|---|---|---|---|---|
| 1 | "All Clear" tile (with "Safe to work" and "Normal operations.") | All Clear, Safe to work | Unit state byte 1 (GREEN), then transport `effective_state_code`, then `lightning_sensor_state_current.EffectiveState`, then Devices `state` and `isSafe`, then portal `resolveTileCondition` (not stale, format known, page fresh), then label from the translation file | BE-Core/Services/ILightningTransportEnvelopeMapper.cs:25; BE-Core/Services/LightningStateAdvancement.cs:133-136; BE-Core/Services/LightningDeviceQueryService.cs:220-233; FE-LS/utils/lightningStateRules.ts:83-109; FE-LS/translations/en.ts:37,46-49 | live |
| 2 | "Held for" and "since" | 117h 29m, since 2026-09-29 17:53 (AST) | `StateSince` is set in the database to the packet time when the effective state changes. The browser subtracts it from its own clock. The card prints the result and the AST time. | BE-Core/Services/LightningStateAdvancement.cs:148-151; FE-LS/utils/lightningTime.ts:35-44; FE-LS/components/LightningStateTile.tsx:99,201-217 | live |
| 3 | Red radius (chip "RED ≤ 13km") | 13 km | `lightning_sensor_settings.RedRadiusKm` (default 5). Set by PUT settings, or left at default. Served as `redRadiusKm`. Printed with one decimal at most. | BE-Dom/Entity/LightningSensorSettings.cs:33,55; BE-Core/Services/LightningDeviceQueryService.cs:253; BE-Core/Services/LightningDeviceProvisioningService.cs:136-144; FE-LS/components/LightningZoneRing.tsx:108-116; FE-LS/utils/lightningRadii.ts:26-27 | live |
| 4 | Yellow radius (chip "YELLOW 13-20km") | 13 to 20 km | `lightning_sensor_settings.YellowRadiusKm` (default 10, at most 100). Same path as row 3. The yellow band starts at the red radius. | BE-Dom/Entity/LightningSensorSettings.cs:36,58; BE-Core/Services/LightningDeviceQueryService.cs:254; FE-LS/components/LightningZoneRing.tsx:117-125 | live |
| 5 | All-clear delay (chip "ALL-CLEAR 30min") | 30 min | `lightning_sensor_settings.AllClearDelayMinutes` (default 30, 1 to 1,440). Display only. | BE-Dom/Entity/LightningSensorSettings.cs:39,61; BE-Core/Services/LightningDeviceQueryService.cs:255; FE-LS/components/LightningZoneRing.tsx:126-134 | live |
| 6 | "Data unavailable" rows in the full history | Many short rows, source `stale_sweep`, durations such as 15s, 0s, 1m | Sweep (5 s tick) finds silence above 4 x heartbeat, opens an interval with source `stale_sweep` and state UNKNOWN. `IsDataUnavailable` is derived from the source. The portal prints the fixed label. Gaps under 10 s with the same state on both sides are merged away on screen. | BE-Core/Services/LightningStaleness.cs:26-30,81-93; BE-Core/Services/LightningStalenessSweepRunner.cs:62-80; BE-Dom/Entity/LightningSensorStateInterval.cs:19,49; FE-LS/components/LightningHistoryTable.tsx:154-156; FE-LS/utils/lightningHistoryGapFill.ts:30,60-68 | live |
| 7 | Alarm history rows | None (empty state shown) | Intervals with state YELLOW, ORANGE or RED from `lightning_sensor_state_interval` (written by live packets), via GET History for the last 24 h, filtered in the portal | BE-Core/Services/LightningStateAdvancement.cs:166-193; BE-Core/Services/LightningDeviceQueryService.cs:91-122; FE-LS/utils/lightningAlarmHistory.ts:23-43; FE-LS/components/LightningAlarmHistoryTable.tsx:35 | code (rows), live (empty state) |
| 8 | CSV export | Button enabled in Settings, greyed in alarm history. Not clicked. | Portal builds the CSV text from the same history list (after gap fill). Browser downloads it with a BOM. The backend HSE CSV is a separate API route the portal does not use. | FE-LS/utils/lightningHistoryCsv.ts:64-68; FE-LS/utils/lightningAlarmHistoryCsv.ts:57-61; FE-LS/utils/downloadCsv.ts:13-25; BE-Core/Services/LightningHseReportService.cs:309-362 | code |
| 9 | Location and "Temporary" badge | Location line with coordinates (masked in captures) and the badge, in Settings only | Admin PUT latitude and longitude, validated as a pair, stored in `lightning_sensor_settings` (numeric(9,6), check constraint), returned in Devices, shown by `pointOf` | BE-Core/Services/LightningDeviceProvisioningService.cs:148-152,243-269; BE-Inf/Migrations/20261004101005_add-lightning-location.cs; FE-LS/utils/lightningLocation.ts:39-49; FE-SET/LightningSettingsScreen.tsx:125-141; FE-LS/components/LightningTemporaryBadge.tsx:13-24 | live |
| 10 | "Readings as of <time> (AST)" | 2026-10-04 15:22 (AST) | `LastPacketAtUtc` of the first device (the packet's receive time), served as `lastPacketAt`, formatted in Asia/Riyadh | BE-Core/Services/LightningStateAdvancement.cs:144; FE-LS/hooks/useLightningScreenData.ts:76; FE-LS/translations/en.ts:18; FE/src/app/utils/siteTime.ts:16 | live |
| 11 | Alarm activity chart counts | Yellow 0, Red 0, "0 alarm(s) in this window." | Same 24 h interval list as row 7. Count of intervals and total seconds per tier. ORANGE is added to YELLOW. | FE-LS/utils/lightningAlarmHistory.ts:73-91; FE-LS/components/LightningAlarmActivityChart.tsx:36-44,119-136 | live |
| 12 | Backup banner: "WakeCap lightning alerts are a backup. Always follow the site's cabinet lights and sounder first." | Seen on the tab and the wallboard | A fixed approved string in the portal translation file. It is not data. | FE-LS/translations/en.ts:195-200; FE-LS/components/LightningDisclaimer.tsx | live |

Evidence for the live column: RK/four-videos/lightning/observations.md:20,23-37,44,48. Row 12 on the wallboard: RK/four-videos/final/3-lightning.script.md:10,16.

---

## 11. Seen live, and not seen live (4 Oct 2026, production build 1.0.7)

Seen live (release-kit capture, read-only):
- [live] Production front end is 1.0.7. Only two front-end commits sit between 1.0.5 and 1.0.7, both Lightning.
  Evidence: RK/four-videos/_research/refresh-1.0.7.md:3-5.
- [live] One Lightning device in Project B reported All Clear. "Readings as of 2026-10-04 15:22 (AST)".
  Evidence: RK/four-videos/lightning/observations.md:3,24.
- [live] Tile: All Clear, Safe to work, Normal operations. Zone ring with chips. Held for box. Backup banner. Zone caption "Zone reference only - not a live strike position."
  Evidence: RK/four-videos/lightning/observations.md:8,23-27.
- [live] Alarm chart and alarm history (empty), Settings page, 24 h history with GREEN, Data unavailable, In progress, packet and stale_sweep values.
  Evidence: RK/four-videos/lightning/observations.md:7,9,31-37.
- [live] Wallboard and phone view exist and render.
  Evidence: RK/four-videos/lightning/observations.md:10; RK/four-videos/_research/refresh-1.0.7.md:13.
- [live] Radii map on Esri satellite imagery (build 1.0.7).
  Evidence: RK/four-videos/_research/refresh-1.0.7.md:8.

Not seen live:
- No RED, YELLOW or FAULT state, no alarm row, no red banner, no red flash, no wallboard stop-work line. `lightning.simulate` was never touched.
  Evidence: RK/internal-notes.md:37-38,69.
- No CSV download opened. No Settings write clicked. No observation to the Observation Manager seen.
  Evidence: RK/four-videos/lightning/observations.md:48; RK/internal-notes.md:39-42.
- Queue and rule existence was not seen directly in the release-kit. The only production measurement is the second-hand CloudWatch comment in section 3, H6.
  Evidence: RK/four-videos/final/3-lightning.script.md:19 (queue and rule existence not verified live).

---

## 12. Differences between sources (do not repeat the stale side)

1. Stale multiplier. Code says 4. Several comments, the runbook and a portal helper say 3. The portal helper is not used by any screen text.
   Evidence: code BE-Core/Services/LightningStaleness.cs:26. Old text: BE-Core/Configuration/LightningSensorOptions.cs:26-33; BE-Core/Hosting/LightningStalenessSweepBackgroundService.cs:13-15; BE-Dto/LightningDeviceCurrentDto.cs:101-105; BE-Core/Services/LightningDeviceProvisioningService.cs:271-276; BE/docs/lightning/tan-2324-prod-runbook.md:54-56,128; FE-LS/utils/lightningStaleness.ts:19. Dead helper: `rg -l "describeStaleThreshold|staleThresholdSeconds|MISSED_HEARTBEATS_BEFORE_STALE" FE/src` finds only lightningStaleness.ts and two test files (lightningStaleness.test.ts, LightningStateTile.staleThreshold.test.tsx), so no screen text uses it.
2. Poll cadence. The backend serves 10 s, 30 s and 5 s. The portal polls everything at 30 s and never calls the endpoint.
   Evidence: BE-Core/Configuration/LightningPollingOptions.cs:53-57; FE-LS/utils/pageFreshness.ts:36.
3. Radii meaning. Portal copy says the alerting service uses them. The backend says no rule reads them.
   Evidence: FE-SET/translations/en.ts:38; BE-Dom/Entity/LightningSensorSettings.cs:26-29.
4. What bytes 8 and 9 carry. The infra comment says they hold the NFC-configured heartbeat. The backend frame layout says they hold the data age in seconds.
   Evidence: INFRA/modules/wakecap-apps-aws/gateway-esp-backend-transport.tf:84-87; BE-Core/Services/LightningDecoding.cs:31-33.
5. Settings write permission. The workspace CLAUDE.md says the PUT needs `project_builder:manage` or `weatherstation:edit`. The code accepts only `weatherstation:manage-lightning-settings`.
   Evidence: /Users/admin/wc/weather-station/CLAUDE.md:69; BE-Api/DevicesController.cs:216.
6. Old Terraform text says the consumer "does not exist yet". It exists and drains both queues.
   Evidence: INFRA/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf:78-81; INFRA/aws/wakecap-main/us-west-2/common/monitoring/cloudwatch_alarms_lightning.tf:53-58.
7. BLOCKED.md (written 2026-08-31) says the production image predates every Lightning commit. It is superseded. DEFERRED.md still lists the old `lightningsensor:view` gate as open. CLAUDE.md:67 says that permission will not exist.
   Evidence: /Users/admin/wc/weather-station/BLOCKED.md:78-85; /Users/admin/wc/weather-station/DEFERRED.md:13,24-25; /Users/admin/wc/weather-station/CLAUDE.md:67.
8. Notifications. The program plan promised email and SMS to PCC and HSE. The code removed them on 2026-09-24. The Observation Manager owns alerting.
   Evidence: PROGDOC:100; commit 367bf43.
9. The tile reads "Unknown" for a stale device, while the history says "Data unavailable".
   Evidence: FE-LS/translations/en.ts:59-63,213.
10. The Weather Station Architecture folder (14 July) predates Lightning and cannot be used for the Lightning path. It has no Lightning mention.
    Evidence: `rg -i "lightning|modbus|adam" "/Users/admin/wc/weather-station/Weather Station Architecture"` returns nothing.
11. The backend README and WEATHER_STATION.md do not mention Lightning.
    Evidence: `rg -i lightning BE/README.md BE/WEATHER_STATION.md` returns nothing.

---

## 13. Numbers I measured

Each number lists the read-only command or the file. Counts were taken on 2026-10-05.

| Label | Value | How measured |
|---|---|---|
| Backend Core Lightning files and lines | 29 files, 3,673 lines | `find BE-Core -name '*.cs' \| wc -l`; `find BE-Core -name '*.cs' -exec cat {} + \| wc -l` |
| Backend Domain Lightning files and lines | 9 files, 481 lines | same pattern on BE-Dom |
| Backend Web.API Lightning files and lines | 3 controllers, 316 lines | same pattern on BE-Api |
| Backend Infrastructure Lightning files and lines | 5 files, 438 lines | same pattern on BE/Wakecap.WeatherStation.Infrastructure/Products/LightningSensor |
| Backend Contracts Lightning files and lines | 9 files, 823 lines | same pattern on BE-Dto |
| Backend Lightning production total | 55 files, 5,731 lines | Sum of the five rows above |
| Lightning endpoints | 10 (8 on Devices, 1 Summary, 1 Polling) | `rg -c "\[Http(Get\|Put\|Post\|Delete)" BE-Api/*.cs` |
| Hosted services | 4 | `ls BE-Core/Hosting/*.cs \| wc -l` |
| EF configurations | 5 | `ls BE-Inf/Products/LightningSensor/ModelConfiguration/*.cs \| wc -l` |
| Lightning migrations | 8 | `ls BE-Inf/Migrations \| grep -i lightning \| grep -v Designer \| wc -l` |
| Backend Lightning test files | 20 | `ls BE-Test/*.cs \| wc -l` |
| Test attribute lines (Fact, Theory, queue Fact) | 151 | `rg -c "^\s*\[(Fact\|Theory\|RequiresLightningQueueFact)" BE-Test/*.cs`, summed |
| Backend commits touching Lightning folders on master | 30 | `git log master --oneline -- <5 Lightning dirs> \| wc -l` |
| First Lightning module commit | 3dc572d, 2026-08-30 17:59 +0300 | `git log master --format='%h %ad %s' --date=iso -- <5 dirs> \| tail -2` |
| Portal Lightning non-test source files | 62 | `find FE-LS -type f \( -name '*.ts' -o -name '*.tsx' \) ! -name '*.test.*' \| wc -l` |
| Portal Lightning test files | 58 | `find FE-LS -type f -name '*.test.*' \| wc -l` |
| Portal Lightning non-test lines | 6,030 | `find FE-LS ... ! -name '*.test.*' -exec cat {} + \| wc -l` |
| Portal files by folder (non-test) | components 16, hooks 9, utils 17, api 5, contracts 4, types 2, top level 6 | `find FE-LS/<dir> -maxdepth 1 ...` |
| Portal commits touching Lightning | 51 | `git log master --oneline -- src/app/features/LightningSensor src/app/features/Settings/LightningSettingsScreen.tsx \| wc -l` |
| First portal Lightning commit | bf52a0f, 2026-08-30 18:00 +0300 | `git log master --reverse ... \| head -1` |
| Production portal tag | v1.0.7, commit 8f3bf01, 2026-10-04 15:58 +0300 | `git tag --sort=-creatordate`; `git rev-list -n1 <tag>` |
| Terraform queues, rules, roles in the Lightning file | 8 queues, 4 rules, 2 roles | `rg -c '^resource "aws_sqs_queue"' lightning-ingestion.tf` and the same for `aws_iot_topic_rule`, `aws_iam_role` |
| Queue retention | 14 days = 1,209,600 s | INFRA/.../lightning-ingestion.tf:51 |
| Production queue traffic, 14 days to 2026-09-16 | 9,651 messages sent, 9,674 received | INFRA/.../cloudwatch_alarms_lightning.tf:47-58 (second-hand comment) |
| Derived: messages per day, per minute, seconds between | 689 per day, 0.48 per minute, about 125 s between messages | Python arithmetic on 9,651 over 14 days |
| Queue age over that window | worst 5 min average 17 s, max 102 s | INFRA/.../cloudwatch_alarms_lightning.tf:47-50 (second-hand) |
| Message age alarm | 250 s (prod), 14,400 s (test) | INFRA/.../cloudwatch_alarms_lightning.tf:65,89 (prod); 190,214 (test) |
| Wire frame | 10 bytes | BE-Core/Services/LightningDecoding.cs:45 |
| Golden fixtures | 7 | BE-Test/LightningDecodeConformanceTests.cs:30-117 |
| States | 7 | `rg -c '^\s+(Unknown\|Green\|Yellow\|Orange\|Red\|Fault\|Offline) = ' BE-Dom/Constants/LightningState.cs` |
| Stale multiplier | 4 | BE-Core/Services/LightningStaleness.cs:26 |
| Stale thresholds (derived) | 24 s, 240 s, 14,396 s (at 6, 60 and 3,599 s heartbeat) | Python arithmetic |
| Sweep tick | 5 s | BE-Core/Configuration/LightningSensorOptions.cs:34 |
| Consumer receive | 10 messages, 20 s | BE-Core/Configuration/LightningSensorOptions.cs:40,43 |
| Observation dispatcher | 5 s tick, 50 batch, 8 attempts, 10 s base, 600 s cap | BE-Core/Services/LightningObservationDispatch.cs:45-49 |
| Retry waits (derived and test-pinned) | 10, 20, 40, 80, 160, 320, 600 s. Total before dead: 1,230 s (20.5 min) | Python arithmetic; BE/Wakecap.WeatherStation.IntegrationTests/Shared/OutboxRetryTests.cs:17-22 |
| Row caps | 500 history and events, 5,000 HSE report, 50 and 100 observation list | BE-Core/Services/LightningDeviceQueryService.cs:54,57; LightningHseReportService.cs:82; LightningObservationQueryService.cs:21-22 |
| Backend poll cadence | 10, 30, 5 s, floor 2 s | BE-Core/Configuration/LightningPollingOptions.cs:48-57 |
| Portal poll and freshness limit | 30 s and 5 min (300,000 ms) = 10 polls | FE-LS/utils/pageFreshness.ts:36,39 |
| Gap fill | under 10 s | FE-LS/utils/lightningHistoryGapFill.ts:30 |
| Radii defaults and limits | 5 km, 10 km, 30 min. Yellow at most 100 km. Delay 1 to 1,440 min. | BE-Dom/Entity/LightningSensorSettings.cs:33,36,39; BE-Core/Services/LightningDeviceProvisioningService.cs:210-232 |
| Device sync | every 1 h, 2 min overlap, 365 days | BE-Core/Hosting/LightningDeviceSyncBackgroundService.cs:24; LightningSyncWindow.cs:25,36 |
| Documented latency bound | 6.5 s transport transition | BE-Core/Configuration/LightningPollingOptions.cs:20-23 |
| Live: Held for | 117h 29m since 2026-09-29 17:53 AST, read at about 15:22 AST on 2026-10-04 | RK/four-videos/lightning/observations.md:28. Cross-check by Python: 4 days 21 h 29 min = 117 h 29 min. |
| Live: radii | red 13 km, yellow 13 to 20 km, all-clear 30 min | RK/four-videos/lightning/observations.md:26,36 |
| Live: alarms in the 24 h window | 0 yellow, 0 red | RK/four-videos/lightning/observations.md:31 |
| Live: devices on the page | 1 | RK/four-videos/lightning/observations.md:3 |
| sensors-service files mentioning Lightning, Modbus or ADAM | 0 | `rg -il "lightning\|modbus\|received_modbus\|ADAM" /Users/admin/wc/sensors-service` |
| Other repos with Lightning code | OM front end: 9 source or test files. OM backend: 1 test file. Zero in notification, location, node-status, safety, app-api, asset, gate-pass, identity, maps, integrations. Remaining hits in other repos are lockfiles or icon CSS. | `rg -il lightning src` in OMFE; `rg -il lightning <repo>` per repo, run for 15 sibling repos on 2026-10-05 |
| node-service Lightning code | 2 enum values and 1 switch case (4 source lines) | `rg -n -i lightning NODE/src` returns enums.ts:15, enums.ts:29, network-service.ts:407, network-service.ts:408 |

---

## 14. Gaps (what I could not verify)

1. Backend production build. I made no network call. The release-kit says deploy state was not verified. The live location data on 4 Oct suggests the build with commit 352195f was in production by then. A user memory note records the production image tag as prod-20261004-352195f at 2026-10-04 about 14:22 UTC. I did not re-check it. (Memory file: /Users/admin/.claude/projects/-Users-admin-wc/memory/project_gas_observation_hand_off.md.)
2. Whether a Lightning observation ever reached the Observation Manager in production. No capture shows one. The only entries that could exist are RED, FAULT, OFFLINE and stale-entry OFFLINE rows.
3. How many stale-entry OFFLINE observations the live project produced. The live history showed many short Data unavailable rows, and nothing in code debounces the observation. The outbox volume is unmeasured.
4. Who receives a RED, FAULT or OFFLINE in the Observation Manager. Recipients are set in the notification service. UNKNOWN has no agreed routing. I did not read recipient rules.
5. The heartbeat of the live device. It is NFC-configured. The default is 60 s. Production traffic of about 0.48 messages per minute (9,651 over 14 days, second-hand) does not match one message per 60 s, but I cannot say why (message volume depends on what the transport publishes, and on how many devices and days were live).
6. The transport source code. It is not in the workspace. What it does is read from the backend's contract, its tests and the infra deploy file.
7. The vendor and model of the warning unit and the input module. Code names "ERL-10" and "ADAM" in comments only.
8. What holds the "all-clear delay" and decides when RED returns to GREEN. It is not in the backend or portal code. Presumably the unit's firmware. Unconfirmed.
9. What the radii control. The backend says nothing reads them. The portal copy says the alerting service uses them. Unresolved. No code sends them to the device.
10. Mesh brand for the Lightning node. The architecture docs name Wirepas for the weather nodes. No Lightning document states it.
11. Whether bytes 8 and 9 hold data age or the heartbeat. Two sources disagree (section 12, item 4).
12. No RED, YELLOW or FAULT state was seen in production. The red banner, flash, wallboard stop-work line, alarm rows, CSV content and the Settings write were never exercised. Their status is code.
13. The server HSE report and its CSV have no caller in the portal and were never seen live.
14. The IoT rules and queues were not seen directly. Only the dated CloudWatch comment (2026-09-16) says traffic flowed.
15. A status link is not added to observation text unless `StatusPageUrl` is set. The infra .tf, .yml and .md files never set it. A secret or tfvars file could, and I may not open those.
16. The phone view is described as the link a stop-work push, SMS or email carries. No sender of such a message exists in the backend any more. Whether the Observation Manager notification carries a link is unknown.
17. The `node-service-lightning-tests` folder is a local branch with one test-only commit. It is not master code.
18. No published statistic about lightning deaths, injuries or cost was in my slice sources. Real-world lives and cost numbers are for another slice. The only Lightning numbers here are product measurements.
19. Predictions, work-plan suggestions, and links to work permits and equipment are vision for this feed. No Lightning code reads another product's data. The frame carries no distance, bearing or strike count.
20. Retention. No job deletes Lightning rows, and no retention period is documented.

---

## 15. Names and counts the deck can animate (quick list)

Each item points to the section where the evidence line sits.

- Hop names in order: warning unit, ADAM input module, mesh node (Modbus asset), gateway, gateway-esp-backend-transport, AWS IoT topic rules, SQS queue and dead-letter queue, queue consumer, ingest and mapper, state advancement, staleness sweep, read API, portal, observation outbox, Observation Manager. (Section 3)
- Frame: 10 bytes, fields fmt, state, health, contacts, rawDi, data age. 7 golden fixtures. (Section 4)
- States: 7 codes, 3 colours, 1 safe state. (Section 5)
- Topics: `received_lightning_data` and `received_modbus_data`. Queues: 2 work queues and 2 dead-letter queues per environment (8 in the file). (Section 3, H4 to H6)
- Tables: 5 (settings, state_current, event, state_interval, observation). 8 migrations. (Section 7)
- Timers: sweep 5 s, consumer long poll 20 s, dispatcher 5 s, portal poll 30 s, page freshness 5 min, device sync 1 h. (Section 6)
- Thresholds: stale after more than 4 heartbeats, default heartbeat 60 s, so 240 s. (H10)
- Surfaces: tab, wallboard, phone view, red banner and flash, site indicator, Settings. (H14)
- Observation sink: RED, FAULT, OFFLINE only. 8 attempts, 10 s to 600 s back-off. (H15)
- Dates: 2026-08-30 (module lands), 2026-09-22 (4 x rule), 2026-09-24 (notifications out, Observation Manager in), 2026-10-04 (location and map, build 1.0.7). (Section 2)
- Live facts for a "now" panel: All Clear, Held for 117h 29m since 2026-09-29 17:53 AST, 0 alarms in 24 h, one device. (Section 11)

---

## 16. Commands used (all read-only)

`ls`, `find`, `wc`, `rg` (with `--glob` excludes for .env, appsettings, pem, key, tfvars, tfstate), `git log`, `git show --stat`, `git diff --stat`, `git rev-list`, `git tag`, `sed -n` and `cat -n` on source files, `python3` for arithmetic only. No file named .env, appsettings*, *.pem, *.key, credentials, tokens, kubeconfig, tfvars or tfstate was opened. The infra file gateway-esp-backend-transport.tf contains host names, certificate file names and device lists. I read it but did not copy those values.
