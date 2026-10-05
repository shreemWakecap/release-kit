# C2 Weather path: fact sheet

Slice: C2-weather-path (physical station to the pixel on the Weather Station page).
Written: 2026-10-05. Read-only research. Nothing was run, built, posted or changed outside this file.
Deliverable: this fact sheet plus a structured result. Target: release-kit presentation research. Not doing: any app run, any call to a WakeCap host, any edit outside this file. One public web page was fetched to check a published formula (section 5.2).

No customer names, no people names, no secrets. Projects are called Project A, B, C as the release-kit labels them. Station serials, project ids, account ids and certificate names are left out on purpose.

---

## 0. How to read this sheet

Every fact has a status tag and an evidence line.

| Tag | Meaning in this sheet |
|---|---|
| live | Seen working in production (release-kit capture of 4 Oct 2026, build 1.0.7). |
| code | In master code. Deploy not verified by me. |
| test | Deployed to the test environment only. No fact in this slice needed this tag. |
| plan | Documented intent, or code on an unmerged branch. |
| vision | Nobody built it. |
| stat | Published statistic from a document. I did not measure it. |

Evidence lines use path keys. Expand a key with this table, then go to the line.

| Key | Path |
|---|---|
| BE | /Users/admin/wc/weather-station/wakecap-weather-station |
| BE-Core | BE/Wakecap.WeatherStation.Core/Products/WeatherStation |
| BE-Dom | BE/Wakecap.WeatherStation.Domain/Products/WeatherStation |
| BE-Infra | BE/Wakecap.WeatherStation.Infrastructure |
| BE-Api | BE/Wakecap.WeatherStation.Web.API |
| BE-Contracts | BE/Wakecap.WeatherStation.Contracts |
| FE | /Users/admin/wc/weather-station/frontend-2.0-weather-station/src/app |
| FE-WS | FE/features/WeatherStation |
| FE-Root | /Users/admin/wc/weather-station/frontend-2.0-weather-station |
| SS | /Users/admin/wc/weather-station/sensors-service |
| INF | /Users/admin/wc/infrastructure |
| IOT | INF/terraform/aws/wakecap-main/us-west-2/prod/iot |
| NS | /Users/admin/wc/node-service |
| OBS | /Users/admin/wc/wakecap-observation |
| FE2 | /Users/admin/wc/frontend-2.0 (read with `git show origin/master:<path>`) |
| RK | /Users/admin/wc/weather-station/release-kit |
| ARCH | /Users/admin/wc/weather-station/Weather Station Architecture |
| COST | /Users/admin/wc/weather-station/Running Cost |
| KB | /Users/admin/wc/wc3-platform/docs/wc2-knowledge-base (HEAD f7468ac, 2026-09-06). Second-hand notes about repos that are not local (node firmware, gateway transport). |

A line like `SS src/handlers/sqs-handler.ts:130` means `/Users/admin/wc/weather-station/sensors-service/src/handlers/sqs-handler.ts`, line 130.

### 0.1 Versions read

| Repo | State I read | Note |
|---|---|---|
| BE | branch `TAN-2895-drop-testing-comment`, commit 5cd5335 (2026-10-04) | `origin/master` is 8453a99 (2026-10-04). `git diff --stat HEAD origin/master` shows 18 files: gas files, `ci.yaml`, `CoreServiceRegistry.cs` (adds a gas dispatcher), the model snapshot and one outbox test (migration count bumped 42 to 43). No weather path logic differs. In `origin/master` the weather workers are on lines 111-112 of CoreServiceRegistry.cs (110-111 in my tree). The last prod image I can see is `prod-20260922-600f1f7` (BE commit 600f1f7, 2026-09-21). Of 27 weather-path files I rely on, 22 are byte-identical to that commit. The 5 that changed (ProjectSettingsService, SafetyVerdictService, SensorAnomalyDetector, StuckSensorAnalyzer, AgentSummaryService) changed by audit snapshots, a doc comment, one action type tag and flag-gated additions. |
| FE | master 83b4d8d (2026-10-05) = `origin/master` | package name is `@wakecap-fe/connected-environment-app` (FE-Root/package.json:2). The production tag `v1.0.7-ConnectedEnvironmentApp-production` is 8f3bf01 (2026-10-04). `git diff --stat v1.0.7-ConnectedEnvironmentApp-production..HEAD` shows 4 files, all side rail, so every weather page line below equals the production build. |
| SS | master-wakecap-2 8ee79d8 (2026-10-01) = `origin/master-wakecap-2` | This is the clone under `weather-station/`. The other clone `/Users/admin/wc/sensors-service` is at e969d3e (2026-07-08) and is 89 commits behind its own `origin/master-wakecap-2` (7be6a96). I did not take code lines from it. The last prod image I can see is `prod-20260824-aa1f127` (2026-08-24). Since then there are 4 commits. The decode, format, save and status code is unchanged. Only the node-sync part changed (hunks start at line 256 of the weather service). |
| INF | master 0c17cb299 (2026-09-22) | Deploy bumps after 22 Sep are not visible to me. |
| NS | branch `test` 262e8bf (2026-10-01) | `origin/master` is 5356819 (2026-08-30). |
| OBS | HEAD 0dbd7f7 (2026-09-29) | Shallow check only. |
| FE2 | `origin/master` a5907a0e5 (2026-09-30) | Used only for the legacy map widget and the removal of the old `ws` micro-app. |
| KB | HEAD f7468ac (2026-09-06) | A knowledge base about WakeCap repos. It is documentation, not code. I use it only where the code is not local (node firmware, gateway transport service) or to corroborate. Every such line is tagged "second-hand" in its evidence. |

Evidence: `git -C <repo> log -1 --format='%h %ad %s' --date=short`, `git -C SS rev-list --count HEAD..origin/master-wakecap-2` (0), `git -C FE-Root diff --stat v1.0.7-ConnectedEnvironmentApp-production..HEAD`, `git -C BE diff --quiet 600f1f7 HEAD -- <file>` (per file, bash loop over 27 files), `git -C SS diff -U0 aa1f127 HEAD -- src/services/weather-station-sensor-service.ts`, `git -C /Users/admin/wc/sensors-service rev-list --count master-wakecap-2..origin/master-wakecap-2` (89), `git -C BE diff --stat HEAD origin/master`.

### 0.2 What I did not open

`.env` files, `appsettings*.json`, `*.pem`, `*.key`, tfvars, state files, kubeconfig, credentials. I read Terraform `.tf` module files. They name secrets and certificate files but hold no values, and I did not record the names. Branch names that carry a developer handle are written without the handle.

---

## 1. The story in ten lines (for the animation)

1. A weather station is a Modbus sensor head on a WakeCap mesh node. It sends one 34-byte block of 16 numbers on Wirepas endpoint 61. [code]
2. The mesh carries it to a sink and an ESP32 gateway. A transport service rebuilds the frame as a Wirepas protobuf message with the gateway id, the sink id, the receive time, the travel time and the hop count, and publishes it on AWS IoT Core. [code]
3. One IoT rule takes every endpoint-61 frame and puts it in an SQS queue. [code]
4. sensors-service (a legacy Node service) reads the queue. It finds the device from the first byte of the payload (0x01 is the weather station). It scales 16 values. 0x7FFF becomes NULL. [code]
5. It finds the project through the gateway's registry record, rebuilds the reading time (receive time minus travel time) and stores one row of 29 columns in a Timescale table. A last-seen row is updated. [code]
6. The new Weather Station backend (.NET) reads that table read-only. It never writes to it. [code]
7. On each request it takes the newest reading of today, swaps dead-sensor values for the last good one, converts wind to km/h, computes the heat index and picks the band. [code]
8. The band gives work, rest and water. Limits give Danger per parameter. Reading age gives station health. Fixed rules give the verdict, the steps and the confidence. [code]
9. The page asks again every 60 seconds for readings, graphs and the verdict. The station list and readiness have no timer in code. [code]
10. A side branch turns danger episodes into outbox rows and posts them to the Observation Manager every 10 seconds. Live delivery was not evidenced. [code]

End to end the chain works: readings, the heat card with work, rest and water, the verdict strip and station health are on the production page. [live]
Evidence: RK/internal-notes.md section 3 ("Live (shown)"), RK/four-videos/_research/refresh-1.0.7.md (production serves 1.0.7).

---

## 2. Timeline (dates the deck can animate)

| Date | Event | Tag | Evidence |
|---|---|---|---|
| 2021-03-17 | sensors-service first commit | code | `git -C SS log --reverse --format='%h %ad %s' --date=short \| head -1` gives a474d5e |
| 2025-04-26 | `weather_station_sensor` table migration is created | code | SS src/migrations/1745697311995-create_weather_station_sensor_table.ts (id is epoch ms, 2025-04-26 19:55 UTC) |
| 2025-04-27 | first weather decode commit | code | `git -C SS log --diff-filter=A --format='%h %ad %s' --date=short -- src/services/weather-station-sensor-service.ts` gives 9c5c39a |
| 2025-05-01 | first production weather reading | stat | COST/2026-08-10-weather-station-running-cost.html ("the first production weather reading landed on 2025-05-01") |
| 2025-05-25 | Weather Station backend repo first commit | code | `git -C BE log --reverse --format='%h %ad %s' --date=short \| head -1` gives c4190a5 |
| 2025-06-02 | first EF migration of the WS App DB | code | BE-Infra/Migrations/20250602121252_Initial-migration.cs |
| 2025-07-24 | NULL handling for "sensor not connected" | code | `git -C SS log -S'0x7FFF' -- src/services/weather-station-sensor-service.ts` gives 23e415a |
| 2025-08-01 | node-sync job (auto-register stations) | code | `git -C SS log -S'syncWeatherStationJob' ...` gives 173352b |
| 2025-08-20 | dedupe key becomes serial_no + network_id + generated_at | code | SS src/migrations/1755727250432-add_serial_no_index_to_weather_station_sensor.ts:17-20 |
| 2025-08-24 | last-seen summary table and offline threshold column | code | SS src/migrations/1755980126868-create_weather_station_sensor_summary_table.ts; 1755983012007 |
| 2025-09-03 | threshold column renamed `weather_station_offline_threshold`, default 10 | code | SS src/migrations/1756895794289-change_weather_station_online_threshold.ts:9-14 |
| 2025-10-13 | `ProjectSettings.HeatIndexCalculation` column added, default 1 (AAT with wind) | code | BE-Infra/Migrations/20251013125035_add-heatIndex-calculation-mode.cs |
| 2026-03-08 | sensors DB reads the registry through the `v_node_with_meta` foreign table | code | SS src/migrations/1773000000001-import_v_node_with_meta_drop_old_fdw.ts:18-43 |
| 2026-06-08 | global heat bands reseeded to a customer heat-stress chart | code | BE-Infra/Migrations/20260608093328_*.cs (the file name carries a customer name, so I left it out) |
| 2026-06-27 | per-project band overrides table | code | BE-Infra/Migrations/20260627152952_add-project-heat-index-band.cs |
| 2026-07-14 | Architecture package written (diagrams 00 to 06) | code | ARCH/README.md:3 |
| 2026-08-09 | baseline front end tag `v0.1.0-production` (answer-first dashboard) | code | `git -C FE-Root log -1 --format='%h %ad %s' --date=short v0.1.0-production` gives a5870d9; RK/internal-notes.md section 1 |
| 2026-08-11 | station auto-registration made self-healing (TAN-1957); legacy `ws` micro-app removed from the monorepo | code | `git -C SS show 813bc16 --stat`; `git -C FE2 log origin/master --grep=TAN-1967` gives 4cff7ca34 |
| 2026-08-17 | Modbus tag router in sensors-service (NEM-662); prod image bump recorded | code | `git -C SS show 3dde479 --stat`; INF/CHANGELOG.md:1645 (`prod-20260817-3dde479`) |
| 2026-09-20 | observation outbox table and workers | code | BE-Infra/Migrations/20260920120821_add-weather-observation-outbox.cs; BE-Core/SafetyPolicy/ObservationEvaluation.cs |
| 2026-09-22 | latest Weather Station backend prod image bump I can see | code | `git -C INF log --grep=weather_station_image -1` gives cfb48cd85 (`prod-20260922-600f1f7`) |
| 2026-09-24 | the external observation sweep endpoint is retired (410 Gone) and the inline sweep removed (TAN-2720) | code | `git -C BE log --grep=TAN-2720 --format='%h %ad %s' --date=short` gives 45974ba and 3da8e45 |
| 2026-10-01 | node-sync failures stop being swallowed (TAN-2106) | code | `git -C SS log -2` gives 8ee79d8 and 7be6a96 |
| 2026-10-04 | production serves front end 1.0.7 | live | RK/four-videos/_research/refresh-1.0.7.md ("Production build") |

---

## 3. The path, hop by hop

### 3.0 Summary table

| # | Hop | Repo path | Protocol or format | Adds or computes | Stored in | Constants (code) | Status |
|---|---|---|---|---|---|---|---|
| H1 | Weather station (sensor head) | not in repos | Modbus values, 16 channel slots | raw 16-bit values, 14 named channels, 2 reserved | none | vendor and model unknown | code |
| H2 | Mesh node firmware and Wirepas radio mesh | not in repos (KB names a Modbus add-on board, second-hand) | Wirepas packet, endpoint 61 to 61, one TLV block | frames the Modbus response, sets source address | none | TLV tag 0x01, length 32 | code |
| H3 | Sink, ESP32 gateway and the gateway transport service (GTS) | not in repos; infra module INF/terraform/modules/wakecap-apps-aws/gateway-esp-backend-transport.tf | gateway: binary frames on `esp_uplink/...`; GTS: protobuf `GenericMessage.wirepas.packet_received_event` on `gw-event/...` | gateway id, sink id, event id, rx time, travel time, qos, hop count | gateway SD-card buffer while offline (KB, second-hand) | fixture frame 104 B | code |
| H4 | AWS IoT Core rule `iot_sqs_sensors_weather_station_production` | IOT/rules.tf:890-905 | IoT SQL on MQTT topic | selects endpoint 61, base64 payload, adds topic and endpoints | raw archive rule also exists | region us-west-2 only | code |
| H5 | SQS queue `production_wakecap_two_sensors_queue` | IOT/rules.tf:898 | JSON `{data, topic, srcEndpoint, dstEndpoint}` | buffering, retries | queue and dead-letter queue | batch 10, visibility 30 s | code |
| H6 | sensors-service `sqs` mode: `AWSSQSHandler`, `ModbusSensorService`, `WeatherStationSensorService.decode` | SS src/handlers, src/services | protobuf decode, TLV decode | routes by endpoint then tag, scales 16 values, 0x7FFF to NULL | none | coefficients 0.1, 1, 0.001 | code |
| H7 | same service, `format` | SS src/services/weather-station-sensor-service.ts:77-101 | in-memory DTO | project id via gateway registry, serial, reading time | none | reject if no registry match (retried, then dead-lettered) | code |
| H8 | same service, `save` | SS same file:103-121, 516-525 | SQL insert and upsert | insert-or-ignore, last-seen upsert unless buffered | Sensors DB: `weather_station_sensor`, `weather_station_sensor_summary` | 1-week chunks | code |
| H9 | Registry loop and status API | SS same file:257-273, 527-576; NS src/services/weather-station-service.ts | REST, FDW | registers stations as nodes, computes `isOnline` | Node DB `node`, `node_meta`; view `v_node_with_meta`; `project_configuration` | offline default 10 min | code |
| H10 | Weather Station backend: read and derive | BE-Core/Services/DashboardService.cs | EF Core read-only, raw SQL | newest reading, rollback, km/h, heat index, band, limits, online | reads Sensors DB and WS App DB | cache 60 min | code, live |
| H11 | Weather Station backend: station layer | BE-Core/Services/WeatherStations, Services/Agent | in process | state, health, anomalies, verdict, steps, confidence, readiness | WS App DB `StationName`; nothing for verdicts (computed per request) | 15 and 60 min | code, live |
| H12 | Weather Station backend: alert branch | BE-Core/SafetyPolicy, Observation, Hosting | HTTP POST `/api/ingest` | episodes, outbox rows, exactly-once key | WS App DB `weather_observation`; Observation DB | 30 s, 10 s, 8 attempts | code |
| H13 | API edge | INF/terraform/aws/wakecap-main/us-east-2/prod/apps/ingress.tf | HTTPS, bearer JWT | path rewrite, permission check | none | host services.wakecap.com | code, live |
| H14 | Micro-frontend | FE-WS | REST polls, React Query | cards, strip, rail | browser cache | 60 s poll | code, live |
| H15 | Second reader: map widget in the legacy portal | FE2 packages/web/map-tools | REST | temperature, heat index, wind, humidity on the live map | browser cache | stale time 5 min | code |

### H1. Weather station (the sensor head)

- The decoder knows 14 named channels and 2 reserved slots: wind speed, rainfall, temperature, cumulative rainfall, air pressure, PM2.5, wind direction, PM10, humidity, TSP, CO2, H2S, SO2, CO. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:157-176 and :207-224.
- A channel with no sensor fitted reads raw 0x7FFF. The decoder stores NULL for it. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:192-195.
- Vendor and model of the station are not named in any repo or doc I read. [gap]
  Evidence: RK/four-videos/_research/integration-and-devices.json, lane "Weather Station", field `device` ("Vendor and model: UNKNOWN").
- Station id on the page is the Wirepas source address of its node, written as a string. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:90 (`serial_no: String(weatherStationData.sourceAddress)`).

### H2. Mesh node and the Modbus transport

- Endpoint 61 is the Modbus transport, not a device type. One send path uses 61 to 61 for every third-party Modbus device on the mesh: weather station, solar charge controller (MPPT), lightning sensor and "the gas sensors being added next". [code]
  Evidence: SS src/utilities/enums.ts:36-49 (comment above `MODBUS = 61`); `git -C SS show 3dde479` (commit body quotes the firmware define `SEND_MODBUS_RESPONSE 61`).
- Gas does not ride this transport today. The gas Modbus tag ticket (TAN-2465) was cancelled because there is no hardware gas device for now. Gas is read from a vendor cloud. [code]
  Evidence: /Users/admin/wc/weather-station/ConnectedEnvironment*Zero-OpenProgram.md:78 (the file name holds a long dash, shown here as *); RK/four-videos/_research/integration-and-devices.md (headline finding 3); SS src/utilities/enums.ts:60-62 (only tags 0x01 and 0x02 exist, so a gas frame would be skipped).
- The device is told apart by the first payload byte: 0x01 weather station (length 0x20), 0x02 MPPT (length 0x1b). [code]
  Evidence: SS src/utilities/enums.ts:53-62; SS src/services/modbus-sensor-service.ts:23-40.
- The node firmware source is not in any local repo. A search for the firmware define finds only the sensors-service comments and two knowledge-base pages. [gap]
  Evidence: `rg -l SEND_MODBUS_RESPONSE /Users/admin/wc --glob '!node_modules/**' --glob '!.git/**' --glob '!**/dist/**'` lists sensors-service files (enums.ts, modbus-sensor-service.ts) and KB 10-services/wm-sdk-2_4/interfaces.md, 10-services/gateway-v2.0/interfaces.md.
- Second-hand corroboration: the firmware endpoint table lists endpoint 61 as `EP_SEND_MODBUS_RESPONSE` ("Modbus response (weather/MPPT)", header line `wakecap_asset_config.h:503`). [code, second-hand]
  Evidence: KB 10-services/wm-sdk-2_4/interfaces.md:43; KB 10-services/gateway-v2.0/interfaces.md:146.
- Second-hand: the weather station node is a Modbus add-on board (`wc_addon_v10`, board macro `ADDONV10_BOARD`) in the asset firmware family. The KB says it "was not traced further". [code, second-hand]
  Evidence: KB 10-services/Firmware_V4.0/overview.md:51-53 and :196.

### H3. Sink, ESP32 gateway and the gateway transport service (GTS)

- The site gateway is an ESP32 device. It publishes the mesh frames to AWS IoT Core as a compact binary message on an `esp_uplink` topic (up to 100 packed sub-frames per MQTT message). It buffers on an SD card while offline. [code, second-hand]
  Evidence: KB 10-services/gateway-esp-backend-transport/architecture.md:35-37; KB 10-services/gateway-esp-backend-transport/overview.md ("an ESP32 gateway at each site relays mesh traffic to the cloud over MQTT").
- A Python service, GTS (repo `gateway-esp-backend-transport`, not local), subscribes to those topics on the same broker. It unpacks the sub-frames, checks the CRC on endpoints 17 and 238, routes by endpoint, and republishes each frame as a Wirepas Gateway API protobuf message on a `gw-event` topic. It stores nothing. [code, second-hand]
  Evidence: KB 10-services/gateway-esp-backend-transport/architecture.md:38-40; KB 10-services/gateway-esp-backend-transport/overview.md ("Database: None"); INF/terraform/modules/wakecap-apps-aws/gateway-esp-backend-transport.tf:1-60 (the deployment module, topic bases `ESPA_BASE_GW_EVENT_TOPIC` and `ABE_BASE_GW_EVENT_TOPIC`, broker host in us-west-2).
- Lightning shows the same service from the infrastructure side: "The transport publishes a parsed lightning frame on `production/gw-event/received_lightning_data/{gwId}`". [code]
  Evidence: IOT/lightning-ingestion.tf:18-20.
- The protobuf is a Wirepas `GenericMessage` with a `packet_received_event`. A captured live frame on endpoint 61 (taken from the IoT to SQS bridge on 2026-04-20) was 104 bytes. [code, stat]
  Evidence: INF/scripts/loadtest/vernemq/subscriber-b/fixtures/README.md:3-16 ("mtype-61-modbus.bin", 104 B, "decode as `wirepas.proto.gateway_api.GenericMessage`"); SS src/proto/node-diagnostic.proto:22-40.
- The protobuf carries: gateway id, sink id, event id, source and destination address, source and destination endpoint, travel time (ms), receive time (ms epoch), qos, payload, payload size, hop count. [code]
  Evidence: SS src/proto/node-diagnostic.proto:22-40.
- MQTT topic shape the backend reads (0-based parts): `[0] env / [1] gw-event / [2] received_data / [3] gateway id / [4] sink id / [5] network id / [6] source endpoint / [7] destination endpoint`. A weather frame has 61 and 61 at the end. [code]
  Evidence: SS src/utilities/helper.ts:19-27 (network is part 5, gateway is part 3); SS test/data/weather-station-sensor-service/weather-station-data.ts:9 (`test/gw-event/received_data/gateway_001/sink_001/1/61/61`); INF/scripts/loadtest/vernemq/subscriber-b/fixtures/README.md:7 (`production/gw-event/received_data/<gw>/sink0/<net>/61/61`).
- Replayed ("buffered") messages come on a topic whose second part contains "buffered". They are stored but do not move the last-seen row. The KB describes that family as "offline-buffered replay". [code]
  Evidence: SS src/utilities/helper.ts:10-17; SS src/services/weather-station-sensor-service.ts:111-115; SS test/handlers/sqs-handler-spec.ts:77 (`development/buffered-gw-event/...`); KB 10-services/gateway-esp-backend-transport/interfaces.md:29 (second-hand).
- The KB also lists endpoint 61 among the toolkit endpoints GTS routes ("61 (Modbus/weather/MPPT, TLV-tagged)"). Its diagram shows the relay on a `wakecap_received_data` topic, while the production IoT rule and the captured fixture use `received_data` for endpoint 61. I follow the rule and the fixture. [gap]
  Evidence: KB 10-services/gateway-esp-backend-transport/interfaces.md:82-84 and architecture.md:40; IOT/rules.tf:893; INF/scripts/loadtest/vernemq/subscriber-b/fixtures/README.md:7.

### H4. AWS IoT Core topic rule

- Rule `iot_sqs_sensors_weather_station_production` is enabled. It reads `production/gw-event/received_data/#` where topic part 7 (the source endpoint) is 61. It outputs the payload as base64 plus `topic`, `srcEndpoint`, `dstEndpoint` and sends it to SQS `production_wakecap_two_sensors_queue`. [code]
  Evidence: IOT/rules.tf:890-905.
- A twin rule that copied production weather traffic into a test queue was disabled on 2026-07-26. The comment records about 7,300 messages a day, received 36,043 times for 7,209 sent (5.00 per message, equal to the max receive count) and a dead-letter queue holding 100,050 messages. [code, stat]
  Evidence: IOT/rules.tf:907-945.
- The IoT broker is in us-west-2 only. Every gateway topic rule in the account lives there. [code]
  Evidence: IOT/lightning-ingestion.tf:10-13.
- A separate enabled rule `IoT_Kinesis_Prod_Topics` is described as "All data received on broker (production topics) stored to S3 through Kinesis Firehose". Its Terraform shows only the error action (an S3 bucket). The Firehose action itself is not visible in the file. [code]
  Evidence: IOT/rules.tf:29-48; INF/context/documentations/iot-rules-audit-2026-04-27.md:109 ("since 2026-02") and :145 ("3 active `IoT_Kinesis*` rules to S3 via Kinesis").
- Plan: replace AWS IoT Core with a self-managed VerneMQ broker. The audit lists archival as one of 6 hard blockers. [plan]
  Evidence: INF/context/documentations/RFC-18-aws-iot-core-migration.md:3-10 (status Final, "Recommendation: migrate ... to VerneMQ"); INF/context/documentations/iot-rules-audit-2026-04-27.md:13,145.

### H5. SQS queue

- The weather rule shares `production_wakecap_two_sensors_queue` with other sensor rules (for example altimeter data). [code]
  Evidence: IOT/rules.tf:143-160 (altimeter rule to the same queue); IOT/rules.tf:898; KB 10-services/sensors-service/architecture.md:34-41 (rule table, second-hand).
- A comment records that this shared queue "drops ~0.9% of sensor messages into a saturated DLQ". It is one reason lightning got its own queues. [stat]
  Evidence: IOT/lightning-ingestion.tf:28-33.
- The consumer app uses batch size 10 and visibility timeout 30 s by default. The Terraform-managed `sensors_queue` has visibility 60 s, 4-day retention and a dead-letter queue after 5 receives (14-day retention). [code]
  Evidence: SS src/configs/sqs-config.ts:4-6; INF/terraform/modules/wakecap-apps-aws/sensors-service.tf:26-40.
- A production sensors dead-letter queue named `production_dead_letter_offline_caching_queue_sensors` is named in a commit body. In a 91-message sample, 70 were solar-controller frames and 21 were endpoint-10 sensor data. [stat]
  Evidence: `git -C SS show 3dde479` (commit body).

### H6. sensors-service consumer: route and decode

- One image runs three modes: `api` (REST, port 3009), `sqs` (SQS consumer) and `buffer` (MQTT pipeline). In prod Terraform: api 2 replicas, sqs 15, buffer 5. [code]
  Evidence: INF/terraform/modules/wakecap-apps-aws/sensors-service.tf:106-112; INF/terraform/aws/wakecap-main/us-east-2/prod/apps/main.tf:1218-1220.
- The production logs and runbooks name the Kubernetes deployment `sensors-service-sqs` as an emitter of `No-Metadata-Found` lines, so that deployment was processing messages when the runbook was written (2026-07-23). Whether the old VM consumers still also run is not provable from the repos. The KB says "`sensors-service-sqs` (Kubernetes) or the VM `sqs`/`buffer` service (legacy)" and that an active legacy consumer "could not be established". [code, second-hand]
  Evidence: INF/docs/runbooks/integration-failures.md:11 and :75; INF/terraform/aws/wakecap-main/us-east-2/prod/apps/main.tf:1210-1217 (replicas "match the legacy VM (sqs=15, buffer=5 running there)"); KB 10-services/sensors-service/architecture.md:51 and debt.md:74-80.
- The weather feed comes through the SQS path. The handler reads the JSON body, decodes the data as base64 (or hex for buffered topics) and picks the service by `srcEndpoint`. Endpoint 61 goes to `ModbusSensorService`. [code]
  Evidence: SS src/handlers/sqs-handler.ts:56-70 and :130-131.
- `ModbusSensorService` reads the first payload byte. Tag 0x01 goes to `WeatherStationSensorService`. An unknown tag returns `SKIP_MESSAGE`: the frame is acknowledged, not retried, and a warning is logged at most once an hour per network, source and tag per replica. [code]
  Evidence: SS src/services/modbus-sensor-service.ts:63-65, 70-96, 134-149, 167-195; SS src/configs/constants.ts:52 (`MODBUS_UNSUPPORTED_WARN_THROTTLE: 60`).
- Before 2026-08-17 every endpoint-61 frame was handed to the weather decoder. A valid frame from another Modbus device was thrown, retried and dead-lettered, and failed the whole batch of ten. [code]
  Evidence: `git -C SS show 3dde479` (commit body).
- The MQTT `buffer` pipeline now resolves `SERVICE_TYPE=weatherStationSensor` to the same router. [code]
  Evidence: SS src/factories/sensor-factory.ts:36-37.
- Decode steps: protobuf decode, take `wirepas.packetReceivedEvent`, run the TLV decode on the payload, copy network id and gateway id from the topic. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:49-75.
- A frame with tag 0x01 and any length other than 32 finds no valid block. The decoder returns null and the handler treats that as a failure, so the batch is retried and then dead-lettered. The length 32 is therefore a hard contract with the firmware. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:184 and :244-248; SS src/handlers/sqs-handler.ts:85-88.

### H7. sensors-service: format

- The project is found through the gateway, not the station: the registry view is searched for `serial_no = gateway id` and `network_id = network`. No match throws `No-Metadata-Found`. In `sqs` mode the handler rethrows, so the whole batch is not acknowledged and the message is received again until the queue's dead-letter rule moves it (the disabled test rule shows 5.00 receives per message and zero deletes). The README text "the message is dropped" is not what the SQS path does. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:79-86 and :251-255; SS src/services/node-service.ts:35-64; SS src/handlers/sqs-handler.ts:98-101; `git -C SS show 3dde479` ("sqs-consumer deletes nothing when handleMessageBatch rejects"); IOT/rules.tf:907-930; SS CLAUDE.md ("the message is dropped (logged but not retried)").
- Reading time is rebuilt as `rxTimeMsEpoch - travelTimeMs`. The receive time is kept as `gateway_received_at`. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:93-94.
- Mesh quality fields are kept with every reading: `travel_time`, `qos`, `hop_count`, `sink_id`. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:89-98.
- The alert `HardwareMetadataMissing` fires on `No-Metadata-Found` log lines. A runbook records 224 to 5,625 such lines a day over the 7 days before 2026-07-23, for two services together. [stat]
  Evidence: INF/docs/runbooks/integration-failures.md:11 and :40.

### H8. sensors-service: save

- The row is written with insert-or-ignore (`ON CONFLICT DO NOTHING`). The unique key is `serial_no + network_id + generated_at`. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:107-109; SS src/utilities/database-manager.ts:262-280; SS src/migrations/1755727250432-add_serial_no_index_to_weather_station_sensor.ts:17-20.
- After a new row (and only if not buffered) a last-seen row is saved: primary key `project_id + serial_no`, with `network_id`, `gateway_id`, `generated_at`, `created_at`, `updated_at`. It carries no readings. It is a last-writer-wins save, so an older late packet can overwrite a newer time. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:111-115 and :516-525; SS src/utilities/database-manager.ts:173; SS src/models/weather-station-sensor-summary-model.ts:3-27.
- `weather_station_sensor` is a TimescaleDB hypertable partitioned on `generated_at` with 1-week chunks and a space dimension on `network_id`. [code]
  Evidence: SS src/migrations/1745697311995-create_weather_station_sensor_table.ts:174-176.
- A fix that makes the last-seen save monotonic (older time cannot overwrite a newer one) exists only on an unmerged branch (TAN-2106, tip 98c3b28, fix commit 11ab624). [plan]
  Evidence: `git -C SS show 11ab624 --stat` (commit body, defect 3); `git -C SS merge-base --is-ancestor 98c3b28 origin/master-wakecap-2` exits 1 (not merged).

### H9. Registry loop and the status API

- Stations register themselves. The job `syncWeatherStationJob` lists serials seen in the last 1 day, drops the ones that already have a `weather_station` node, finds each one's gateway node, and posts the rest to node-service as bulk nodes of type `weather_station`. Failures now throw. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:257-291 and :323-498; SS src/services/node-service.ts:100-169; `git -C SS show 8ee79d8 --stat`.
- The job is exposed as `POST /weather-station/node-sync`. A code comment says a Quartz job in `wakecap-jobs` calls it every 10 minutes and records only the HTTP status and body, so a run that attempted stations and registered none answers 500. The KB lists the job as `WeatherStationSyncJob` (10 min). The `wakecap-jobs` repo is not local. [code, second-hand]
  Evidence: SS src/controllers/weather-station-controller.ts:17-33 (comment at lines 24-27); KB 10-services/wakecap-jobs/overview.md:52; `rg -n node-sync /Users/admin/wc/infrastructure /Users/admin/wc/wakecap-tools` finds only a GPS tracker node-sync, no weather entry.
- node-service stores the station as a node (`node_type = weather_station`) and exposes the combined view `v_node_with_meta` (node plus meta). The node-sync job sets the local id equal to the serial, so the page shows the serial number as the station name until someone renames it. node-service also defines a local id prefix `WS` for the type, used by its own id generator. [code]
  Evidence: NS src/utilities/enums.ts:9 and :28; NS src/services/network-service.ts:404-405; SS src/services/weather-station-sensor-service.ts:507-508; BE-Core/Services/WeatherStations/WeatherStationStatusMapper.cs:52-61; NS src/migrations/1769300000000-rename_view_to_v_node_with_meta_and_drop_old_views.ts:11-23.
- The sensors DB sees that view as a foreign table. [code]
  Evidence: SS src/migrations/1773000000001-import_v_node_with_meta_drop_old_fdw.ts:18-43.
- The status API `GET /projects/{id}/weather-station/status` returns, per registered station: `nodeId`, `localId`, `serialNo`, `projectId`, `generatedAt` and `isOnline`. `isOnline` is `generated_at BETWEEN now - threshold AND now` on the last-seen row. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:527-562; SS src/controllers/weather-station-controller.ts:35-51.
- The threshold is `project_configuration.weather_station_offline_threshold` (integer minutes, default 10), else the code default 10. It is set through the sensors-service `POST /projects/{id}/configuration`, not through any Weather Station screen. [code]
  Evidence: SS src/services/weather-station-sensor-service.ts:532-541; SS src/configs/constants.ts:37; SS src/dtos/project-configuration-dto.ts:3-10; `rg -n -i offlineThreshold FE` finds no use.
- A registered station with no reading for 1,440 minutes (24 h) raises a warning, at most one per project and station per 360 minutes. [code]
  Evidence: SS src/configs/constants.ts:42 and :46; SS src/services/weather-station-sensor-service.ts:586-637.
- node-service lists weather stations too (`/projects/:project_id/weather-stations`). It calls the sensors-service status API and merges `isOnline` and `generatedAt` into each row. [code]
  Evidence: NS src/controllers/weather-station-controller.ts:14-66; NS src/services/weather-station-service.ts:55-78 and :328-346.

### H10. Weather Station backend: read and derive

- The backend is a .NET 10 service. It runs as the k8s app `weather-station` on port 1201 with 2 replicas by default. [code]
  Evidence: INF/terraform/modules/wakecap-apps-aws/weather-station.tf:241-255; INF/terraform/modules/wakecap-apps-aws/variables-apps.tf:1112.
- It reads the sensors DB through `SensorsDbContext`, which throws on any save. It maps `weather_station_sensor` and `project_configuration`. [code]
  Evidence: BE-Infra/Database/SensorsDbContext.cs:13-14 and :18-26.
- It also calls sensors-service over REST for the station list: `GET /api/projects/{projectId}/weather-station/status`, at the cluster-internal address of `sensors-service-api` port 3009. [code]
  Evidence: BE-Infra/RestServices/ExternalRestPaths.cs:37; BE-Infra/RestServices/Sensors/IConcreteSensorService.cs:9-10; INF/terraform/modules/wakecap-apps-aws/weather-station.tf:88-90.
- Per request, `GetIndicatorsAsync` reads thresholds, project settings and the station list, takes the newest row of today (UTC) for the project (and for one serial if the project has more than one station), then builds the indicator list. [code]
  Evidence: BE-Core/Services/DashboardService.cs:33-79 and :81-126.
- With more than one station and no `nodeId`, the first station of the list is used. The list is ordered by node id descending, so the newest node comes first. [code]
  Evidence: BE-Core/Services/DashboardService.cs:145-147; SS src/services/weather-station-sensor-service.ts:561.
- If a parameter is NULL or a "not connected" marker in the newest row, the backend runs a second query: the latest non-null, non-marker value for that column in the whole table for the project. That older value is shown with its own time. [code]
  Evidence: BE-Core/Services/DashboardService.cs:150-180; BE-Core/IndicatorsResultProcessor.cs:36-53 and :144-149.
- Results are cached in memory, per pod, for 60 minutes: indicator definitions, project thresholds and heat bands. A write evicts the cache only on the pod that handled it. There is no Redis. [code]
  Evidence: BE-Core/Services/DashboardService.cs:28 and :244-264; BE-Core/Services/ThresholdService.cs:45 and :691; BE-Core/Services/HeatIndexBandResolver.cs:17 and BE-Core/Services/HeatIndexBandService.cs:487; BE-Api/Program.cs:40.

### H11. Weather Station backend: the station layer

- `GET .../WeatherStations/Status` lists every registered station with state, last reading time, "state since" and a reason. `GET .../WeatherStations/Summary` returns readiness, headline, counts and reasons. `GET .../WeatherStations/{nodeId}/Insight` returns one station. [code]
  Evidence: BE-Api/Products/WeatherStation/Controllers/WeatherStationsController.cs:34-78.
- `GET .../AgentSummary` returns the verdict, reasons, steps, station health, priority cards, work decision and criteria version. Two optional extras ride on it: Claude rewording of the text, and dashboard composition (flag). [code]
  Evidence: BE-Core/Services/Agent/AgentSummaryService.cs:44-90 and :108-206; BE-Api/Products/WeatherStation/Controllers/AgentSummaryController.cs:23-24.
- The Claude layer only rewrites wording. It does not change status, numbers or actions. It has a default model name in code, an 8-second timeout and a 1024-token limit. It falls back to the deterministic text on any failure or missing key. [code]
  Evidence: BE-Core/Services/Agent/AgentNarrator.cs:26-32; BE-Core/Services/Agent/ClaudeAgentOptions.cs:27, :30, :44.
- On 4 Oct the live strip text equals the deterministic strings in code ("Unsafe conditions", "One or more readings indicate a danger-level condition. Act on the recommended steps."). No rewording was visible. [live]
  Evidence: RK/four-videos/final/2-weather-station.script.md beat w02; BE-Core/Services/Agent/SafetyVerdictService.cs:91-95.
- Controllers on the weather product: 12 files, plus the observer controller. The old external "sweep" endpoint `GET api/Observation/Process` now answers 410 Gone. [code]
  Evidence: `ls BE-Api/Products/WeatherStation/Controllers | wc -l` gives 12; BE-Api/Products/WeatherStation/Controllers/ObservationController.cs:10-25.

### H12. Alert branch (danger episodes to the Observation Manager)

- An evaluator worker ticks every 30 s (clamped 10 to 300). It reads each project's new readings since a cursor (batch 2,000 per project, first run looks back 5 minutes), folds them into episodes with the shared limit check, and records outbox rows. [code]
  Evidence: BE-Core/SafetyPolicy/ObservationEvaluation.cs:22-49 and :73-110; BE-Core/Hosting/ObservationEvaluationBackgroundService.cs:25-50.
- A dispatcher worker ticks every 10 s (clamped 5 to 300). It claims up to 100 rows with `FOR UPDATE SKIP LOCKED`, retries with backoff from 30 s doubling up to 3,600 s, and dead-letters a row after 8 attempts. There is no on/off switch. [code]
  Evidence: BE-Core/Observation/ObservationDispatch.cs:58-86 and :100-110; BE-Core/Hosting/ObservationDispatchBackgroundService.cs:10-30.
- The outbox table is `weather_observation` (unique `episode_key`). The row's `reading_at` is the reading's own time, not the sweep time. [code]
  Evidence: BE-Dom/Entity/WeatherObservation.cs:13-65; BE-Core/Observation/ObservationManagerSink.cs:54-80.
- The sink posts to the Observation service (`POST /api/ingest`, source `WeatherStation`). The Observation Manager drops a replay when the pair (project, external id) already exists. [code]
  Evidence: BE-Core/Observation/ObservationManagerSink.cs:25; BE-Infra/RestServices/ExternalRestPaths.cs:47-50; OBS/Wakecap.Observation.Core/Processors/Handlers/WeatherStationObservationHandler.cs:59-137.
- Delivery to the Observation Manager in production was not evidenced. [gap]
  Evidence: RK/four-videos/_research/agent-and-control.md ("Not evidenced: ... observation delivery working").

### H13. API edge

- The browser calls `services.wakecap.com`. The ALB ingress sends the path prefix `/weather-station` to the Weather Station service and `/concrete/sensors` to `sensors-service-api`, rewriting the prefix away. [code]
  Evidence: INF/terraform/aws/wakecap-main/us-east-2/prod/apps/ingress.tf:78-83 and :113-118, :236, :382, :447.
- Routes are `api/project/{projectId}/[controller]`. Reads need `weatherstation:view` or `project_builder:manage`. Policy writes need `weatherstation:manage-weather-settings`. [code]
  Evidence: BE-Api/Filters/ApiProjectScopRouteAttribute.cs:13-14; BE-Api/Products/WeatherStation/Controllers/DashboardController.cs:16 and :33; BE/Wakecap.WeatherStation.Domain/Shared/Constants/Permissions.cs:12-31; BE-Api/Products/WeatherStation/Controllers/ThresholdController.cs:34-35 and :83-84.
- The same host also serves an MCP endpoint `/mcp`, a second door onto the same services. [code]
  Evidence: BE/WEATHER_STATION.md section "MCP surface"; BE-Api/Mcp/ (directory).

### H14. Micro-frontend

- In-app route: `/:projId/connected-env/weather-station` (the portal adds its own base in front). [code]
  Evidence: FE/routes.tsx:116; FE-WS/routeSegments.ts:36.
- The dashboard has four live regions: a safety strip on top; a main column with the parameter board; a right rail with the station summary, station cards and verdict details; the old metrics view stays mounted but hidden. [code]
  Evidence: FE-WS/components/LiveDashboard.tsx:237, :260, :276, :291, :297, :321.
- Polling: indicators and graphs every 60 s; agent summary every 60 s; the parameter board's own indicators query every 60 s. [code]
  Evidence: FE-WS/components/WeatherMetrics.tsx:119 and :141; FE-WS/agent-dashboard/hooks/useAgentSummary.ts:24; FE-WS/dashboard-layout/components/DashboardLayoutSection.tsx:82.
- The station list (`WeatherStations/Status`) and readiness (`.../Summary`) have no `refetchInterval`. The default stale time is 5 minutes and window-focus refetch is off. [code]
  Evidence: FE-WS/station-domain/hooks/useStationDomainStatus.ts:15-32; FE-WS/station-domain/hooks/useStationDomainSummary.ts:15-32; FE/providers/QueryProvider.tsx:21-25.
- Every time on the page is formatted in the browser as Arabia Standard Time (`Asia/Riyadh`, UTC+3), whatever zone the browser or the project uses. [code]
  Evidence: FE/utils/siteTime.ts:16 and :46-54; FE/utils/formatDateTime.ts:13-16.
- Heat band colors come from the API (`heatIndex.color`). The front end keeps a fallback color map that equals the seeded colors. [code]
  Evidence: FE-WS/components/HeatIndexCard.tsx:31-35; FE-WS/constants/heatIndexColors.ts:24-30.

### H15. Second reader: map widget in the legacy portal

- The live-map dashboard in the map-tools micro-app has a Weather widget. It reads the sensors-service status list and the Weather Station `dashboard/indicators` for the first station. It shows temperature, heat index ("feels like"), wind and humidity. [code]
  Evidence: `git -C FE2 show origin/master:packages/web/map-tools/src/app/modules/MCC/modes/LiveMap/Dashboard/widgets/Weather/weatherAPIUrls.ts` (both URLs); same folder `WeatherStats.tsx` (NAME_ALIASES, stale time 5 min).

---

## 4. One reading, byte by byte (the frame, for a decode animation)

### 4.1 The TLV block (34 bytes)

`01 20` then 16 values of 2 bytes each, big-endian. The decoder reads the tag and length, and if the tag is 0x01 and the length is 32 it decodes the 16 values. Any other block is skipped by its length. [code]
Evidence: SS src/services/weather-station-sensor-service.ts:178-249.

Each value is a signed 16-bit integer. Raw 0x7FFF means "sensor not connected" and becomes NULL. Otherwise the value is multiplied by the field's coefficient. [code]
Evidence: SS src/services/weather-station-sensor-service.ts:187-205.

| Slot | Field | Coefficient | Unit | DB column | Card on the page (seeded) | Project limit | Feeds heat index |
|---|---|---|---|---|---|---|---|
| 0 | wind speed | 0.1 | m/s | `wind_speed` | Wind Speed (shown in km/h, times 3.6) | yes (km/h) | yes |
| 1 | rainfall | 0.1 | mm | `rain_fall` | Rainfall | yes | no |
| 2 | temperature | 0.1 | °C | `temperature` | Temperature | yes | yes |
| 3 | cumulative rainfall | 0.1 | mm | `cumulative_rain_fall` | none | no | no |
| 4 | air pressure | 0.1 | hPa | `air_pressure` | Barometric Pressure | yes | no |
| 5 | PM2.5 | 1 | µg/m³ | `pm25` | Dust Particles | yes | no |
| 6 | wind direction | 1 | degrees | `wind_direction` | Wind Direction (8-point label) | no | no |
| 7 | PM10 | 1 | µg/m³ | `pm10` | PM10 | yes | no |
| 8 | humidity | 0.1 | % | `humidity` | Air Humidity | yes | yes |
| 9 | TSP | 1 | µg/m³ | `tsp` | TSP | yes | no |
| 10 | CO2 | 1 | ppm | `co2` | CO2 (seed has an empty reading column) | yes | no |
| 11 | H2S | 0.001 | ppm | `h2s` | H2S (3 decimals) | yes | no |
| 12 | SO2 | 0.001 | ppm | `so2` | none | no | no |
| 13 | CO | 0.001 | ppm | `co` | CO (enum value exists, no seed row) | no | no |
| 14 | reserved 4 | none (raw) | none | `custom_sensor_4` | none | no | no |
| 15 | reserved 5 | none (raw) | none | `custom_sensor_5` | none | no | no |

Evidence: SS src/services/weather-station-sensor-service.ts:159-176 (coefficients) and :207-224 (field order); BE-Core/SafetyPolicy/ProjectThresholdLimits.cs:26-42 (which parameters have a limit); BE-Dom/Helpers/HeatIndexCalculator.cs:23-25 (temperature, humidity and wind speed feed the heat index); SS src/models/weather-station-sensor-model.ts:40-86; BE-Infra/InfrastructureServiceRegistry.cs:269-382 (12 seeded Indicator rows and their `ReadingColumn`); BE-Contracts/Products/WeatherStation/Costants/Enums.cs:7-26 (13 IndicatorType values); BE-Core/IndicatorsResultProcessor.cs:20-21 and :55-59 (H2S, SO2, CO shown with 3 decimals, others 1).

Worked example (test fixture): `00 34` at slot 0 is raw 52, times 0.1, is 5.2 m/s. `00 FF` at slot 2 is 255, times 0.1, is 25.5 °C. [code]
Evidence: SS test/data/weather-station-sensor-service/weather-station-data.ts:101-119.

### 4.2 What the gateway wraps around it

Receive time `rx_time_ms_epoch` and `travel_time_ms` give the reading time. `hop_count`, `qos`, `sink_id`, `gw_id`, `event_id` come from the Wirepas event. [code]
Evidence: SS src/proto/node-diagnostic.proto:22-40; SS src/services/weather-station-sensor-service.ts:86-98.

### 4.3 The stored row (29 columns)

| Group | Columns |
|---|---|
| Identity and transport (11) | `id`, `network_id`, `gateway_id`, `serial_no`, `project_id`, `sink_id`, `generated_at`, `gateway_received_at`, `travel_time`, `qos`, `hop_count` |
| Measurements (16, all nullable floats) | `wind_speed`, `rain_fall`, `temperature`, `cumulative_rain_fall`, `air_pressure`, `pm25`, `wind_direction`, `pm10`, `humidity`, `tsp`, `h2s`, `co2`, `so2`, `co`, `custom_sensor_4`, `custom_sensor_5` |
| Housekeeping (2) | `created_at`, `is_buffered` |

Evidence: SS src/models/weather-station-sensor-model.ts:1-98 (`grep -c '@Column\|@PrimaryGeneratedColumn\|@CreateDateColumn'` gives 29); BE-Dom/Entity/External/WeatherStationSensor.cs:3-33 (the backend mirrors the same 29 properties).

---

## 5. Derived values (what is computed, where, and with which constants)

### 5.1 Clean-up on read

- Wind is converted from m/s to km/h: value times 3.6, rounded to 1 decimal. [code]
  Evidence: BE-Core/IndicatorsResultProcessor.cs:230-232; BE-Contracts/Extentions/CalculationExtensions.cs:5-8.
- Two raw markers count as "not connected" on the read path: 0x7FFF (32767) and 0x7FFE (32766), scaled by each field's coefficient. The decoder only catches 0x7FFF. [code]
  Evidence: BE-Core/IndicatorsResultProcessor.cs:31-53; SS src/services/weather-station-sensor-service.ts:193.
- When a value is NULL or a marker, the card shows the previous good value with its own time (see H10). When no row exists today every card shows "-". [code]
  Evidence: BE-Core/IndicatorsResultProcessor.cs:134-137, :144-149, :171-186.
- Wind direction also gets an 8-point label (N, NE, E, SE, S, SW, W, NW). [code]
  Evidence: BE-Contracts/Extentions/CalculationExtensions.cs:35-47; BE-Core/IndicatorsResultProcessor.cs:233-235.

### 5.2 Heat index

- Default method AAT (project setting `AAT_Windspeed`): `HI = round(T + 0.33 x RH - 0.7 x W - 4.0, 1)`. T is temperature in °C (rounded to 1 decimal), RH is relative humidity in percent (rounded to 1 decimal), W is wind in m/s (the km/h value divided by 3.6, rounded to 1 decimal). If T = 0 and RH = 0 the result is 0. [code]
  Evidence: BE-Dom/Helpers/AATMethod.cs:5-10; BE-Dom/Helpers/HeatIndexCalculator.cs:44-47 and :77-84; BE-Contracts/Extentions/CalculationExtensions.cs:25-28.
- Method `AAT_WithoutWindSpeed`: same, with W = 0. [code]
  Evidence: BE-Dom/Helpers/HeatIndexCalculator.cs:79-80; BE-Contracts/Products/WeatherStation/Costants/Enums.cs:63-77.
- Method `NOAA`: the Rothfusz regression on Fahrenheit values with two humidity adjustments and the simple formula below 80 °F, then back to °C, rounded to 1 decimal. [code]
  Evidence: BE-Dom/Helpers/NOAAMethod.cs:5-51.
- The method is a per-project setting. New projects get Metric and `AAT_Windspeed`. [code]
  Evidence: BE-Core/Services/ProjectSettingsService.cs:75-76; BE-Core/Services/ThresholdService.cs:443-444. A live project showed the method `NOAA` on its policy page: RK/four-videos/final/2-weather-station.script.md beat w13 [live].
- No heat index is computed when temperature or humidity is "-". The result is band 0 with value 0. [code]
  Evidence: BE-Dom/Helpers/HeatIndexCalculator.cs:64-75.
- The band is the first one with `Start <= HI < End`. [code]
  Evidence: BE-Dom/Helpers/HeatIndexCalculator.cs:86-92.
- The code uses relative humidity in percent as the humidity term. The published Australian apparent temperature (Steadman) is `AT = Ta + 0.33 e - 0.7 v - 4.00` with `e = (RH/100) x 6.105 x exp(17.27 Ta / (237.7 + Ta))` in hPa. So the code is a simplified variant, not that formula. The enum comment calls the method "Austrian Appearant Temperature" (sic). I did not check ticket WCA-18479 for intent. Worked examples (my own arithmetic, not live readings) are in section 13.2. [code, gap]
  Evidence: BE-Dom/Helpers/AATMethod.cs:8; BE-Contracts/Products/WeatherStation/Costants/Enums.cs:63-69; BE-Dom/Helpers/HeatIndexCalculator.cs:11-15 (cites WCA-18479); published form: https://en.wikipedia.org/wiki/Apparent_temperature (fetched 2026-10-05; it cites Steadman 1984 and the Australian Bureau of Meteorology). The Bureau page itself returned HTTP 403 to my fetch.

### 5.3 Bands, work, rest and water

Five global bands are seeded, with `Start` inclusive and `End` exclusive. A project with its own band rows replaces the global set. Otherwise the global set is the fallback. [code]
Evidence: BE-Infra/InfrastructureServiceRegistry.cs:519-568; BE-Core/Services/HeatIndexBandResolver.cs:31-39; BE-Dom/Entity/ProjectHeatIndexBand.cs:5-13.

| Band (id) | HI from (°C) | HI below (°C) | Color | Work min | Rest min | Water every (min) | Water ml | No restriction |
|---|---|---|---|---|---|---|---|---|
| Normal (5) | -50 | 25 | #1E7B34 | 0 | 0 | 30 | 250 | yes |
| Caution (1) | 25 | 30 | #0CA957 | 60 | 0 | 20 | 250 | no |
| Extreme Caution (2) | 30 | 39 | #F4F208 | 50 | 10 | 20 | 250 | no |
| Danger (3) | 39 | 52 | #F39A1F | 30 | 10 | 15 | 250 | no |
| Extreme Danger (4) | 52 | 1000 | #F90D0D | 20 | 10 | 10 | 250 | no |

Evidence: BE-Infra/InfrastructureServiceRegistry.cs:519-568 (the ids come from insert order, lines 515-518).

- The seed is applied only to an empty table. The last migration that truncates the table so the seed is re-applied is the one of 2026-08-09 (red band 20/10, caution water every 20). [code]
  Evidence: BE-Infra/Migrations/20260809083000_reseed-heatindex-red-cycle-and-caution-water.cs:13-19; BE-Infra/InfrastructureServiceRegistry.cs:507-513.
- The page shows the work and rest cycle and the water panel for a band only if the band records those figures. The Normal band shows "No restriction". [code]
  Evidence: FE-WS/dashboard-layout/components/HeatIndexAdvisory.tsx:71-90; FE-WS/components/HeatIndexCard.tsx:143-197.
- Live cross-check 1: Project A showed a heat index of 50.4 then 52.9 in two captures, and the card moved from Danger to Extreme Danger. That matches the 52 edge. [live]
  Evidence: RK/internal-notes.md section 5 ("Live values moved between captures").
- Live cross-check 2: a live Danger card at 49.5 showed 30 min work, 10 min rest, 250 ml every 15 min. That matches the Danger row. [live]
  Evidence: RK/four-videos/final/2-weather-station.script.md beat w06.
- Heat band numbers on the policy page may be on screen but must not be narrated (release-kit lead decision 3). [live]
  Evidence: RK/four-videos/_research/refresh-1.0.7.md ("Lead decisions", item 3).

### 5.4 Per-parameter limit check ("Above safe limit")

- Each parameter has a project limit. The rule is: if the limit is greater than the value the reading is Normal, otherwise Danger. A reading equal to the limit is Danger. [code]
  Evidence: BE-Core/SafetyPolicy/SafetyPolicyEvaluator.cs:55-72.
- Temperature is always checked. Every other parameter is checked only if its limit is greater than 0. A limit of 0 means "not watched". A parameter with no entry in the limit map is left alone. [code]
  Evidence: BE-Core/SafetyPolicy/SafetyPolicyEvaluator.cs:61-66 and :79-94; BE-Core/IndicatorsResultProcessor.cs:260-291.
- Limit keys: temperature, wind speed (km/h), dust particles, rainfall, barometric pressure, air humidity, PM10, CO2, TSP, H2S. [code]
  Evidence: BE-Core/SafetyPolicy/ProjectThresholdLimits.cs:26-42.
- Defaults inserted when a project has none: CO2 5,000; H2S 10; dust particles 3.5; PM10 150; TSP 230; wind speed 32 km/h; temperature 38; barometric pressure 1,000. Rainfall and air humidity default to 0 (not watched). The comment says the defaults are based on a live site (WCA-18577). [code]
  Evidence: BE-Dom/Constants/ProjectThresholdDefaults.cs:5-23; BE-Core/Services/ThresholdService.cs:73-77 and :417-444.
- The front end shows "Above safe limit" when `statusId` is 2 (Danger). [code]
  Evidence: FE-WS/dashboard-layout/utils/cardState.ts:22 and :46-52; FE-WS/dashboard-layout/components/FeaturedIndicatorCard.tsx:174-178.

### 5.5 Online, offline and the clocks (there are several)

| Clock | Threshold | Computed where | Meaning |
|---|---|---|---|
| Per parameter "online" | 10 min default, project override; 2 min of future skew tolerated | BE-Core/IndicatorsResultProcessor.cs:25, :29, :81-94 | `age >= -2` and `age < threshold`. Uses total minutes. |
| Station `isOnline` (sensors-service) | 10 min default, project override | SS src/services/weather-station-sensor-service.ts:532-554 | last-seen row time between now minus threshold and now (no skew tolerance) |
| Station health (backend) | live under 15 min, stale 15 to under 60, dark 60 or more | BE-Core/Services/Agent/StationHealthService.cs:27-28 and :69-119 | based on the newest reading time of the station |
| "Not live" pill (front end) | 30 min | FE-WS/dashboard-layout/components/DataAsOfTimestamp.tsx:24; FE-WS/dashboard-layout/components/DashboardLayoutSection.tsx:103-105 | shown when `staleForMinutes` is 30 or more |
| Stale node warning (sensors-service log) | 1,440 min | SS src/configs/constants.ts:42 | a registered station with no recent reading |
| Device list in the main app (not the weather page) | 15 min seeded for `weather_station` | /Users/admin/wc/wakecap-app-api/Wakecap.App.Infrastrcture/Database/Migrations/20260512100000_AddDeviceTypeConfig.cs:38-50 | comment says only asset, fob and card_id are used today; the weather value is seeded "for future-proofing" |

- The visible station state comes from the Weather Station backend: if sensors-service says the station is not online, the state is `offline` before any health class is looked at. Otherwise live maps to online, stale to stale, suspect to suspect, dark to dark, and no readings to offline. [code]
  Evidence: BE-Core/Services/WeatherStations/WeatherStationStatusMapper.cs:30-43.
- At the default 10-minute threshold, `stale` (15 min or more) and `dark` (60 min or more) cannot be reached, because `offline` wins first. They can appear only when a project's threshold is raised above 15 minutes. This is my reading of the code, not an observed state. [code]
  Evidence: BE-Core/Services/WeatherStations/WeatherStationStatusMapper.cs:32-43; BE-Core/Services/Agent/StationHealthService.cs:27-28; SS src/services/weather-station-sensor-service.ts:532-554.
- The state `unregistered` is declared but not produced. It is deferred to TAN-1919. [code]
  Evidence: BE-Contracts/Products/WeatherStation/DTO/WeatherStations/WeatherStationState.cs:6-7 and :16.

### 5.6 Station health, anomalies and stuck sensors

- Health classes: `live`, `stale`, `dark`, `suspect`, `unknown`. Age is minutes since the newest reading, rounded to the nearest whole minute. 60 or more is dark, 15 or more is stale. A fresh reading with one or more flagged anomalies is suspect. No indicators at all is unknown. [code]
  Evidence: BE-Core/Services/Agent/StationHealthService.cs:27-28 and :30-120.
- The "Last reading was N minute(s) ago." text is the reason string of a live station. [code]
  Evidence: BE-Core/Services/Agent/StationHealthService.cs:116.
- Anomaly kinds: missing (value "-"), sentinel (the scaled "not connected" markers), impossible (outside physical bounds), stuck (equal to the previous value). Physical bounds include temperature -60 to 70 °C, humidity 0 to 100 %, pressure 800 to 1,100 hPa, wind direction 0 to 360. [code]
  Evidence: BE-Core/Services/Agent/SensorAnomalyDetector.cs:32-79 and :83-159.
- A sensor is "frozen" when its newest 6 readings are identical and non-null, they span at least 30 minutes, another sensor changed inside the same run, and the value is not a normal resting value (zero for gases, dust, rain, wind). The look-back window is 2 hours and at most 500 rows. [code]
  Evidence: BE-Core/Services/Agent/StuckSensorAnalyzer.cs:20-55; BE-Core/Services/Agent/AgentSummaryService.cs:38 and :41.
- The Summary service upgrades a fresh station to suspect when any anomaly is flagged on its latest reading. [code]
  Evidence: BE-Core/Services/WeatherStations/WeatherStationsSummaryService.cs:41-50 and :54-73.

### 5.7 Verdict, steps, work decision and confidence

Rule order, first match wins:

1. Station health is dark or unknown: verdict `unknown`, confidence low. Text: "Status unknown". Step: the station health action or "Check station connectivity".
2. Heat index band is a danger band (ids 3 or 4, or a name with "danger" or "extreme"): verdict `danger`.
3. Any other parameter has status Danger: verdict `danger`.
4. Heat index band is a caution band (ids 1 or 2, or a name with "caution"), or the station is suspect or stale: verdict `caution`.
5. Otherwise: verdict `safe`.

[code]
Evidence: BE-Core/Services/Agent/SafetyVerdictService.cs:12-23, :52-135, :137-173 and :275-304.

- Danger text: "Unsafe conditions". Steps: "Pause outdoor work and move crews to shade/rest" then "Notify the site safety officer". Caution step: "Increase water/rest cadence and monitor conditions". Safe step: "No action required - continue normal operations" (the code string has a dash). A stale or suspect station adds its own recommended action. [code]
  Evidence: BE-Core/Services/Agent/SafetyVerdictService.cs:91-95 and :202-251.
- Live: the Danger strip showed the same title and the two steps in the same order. [live]
  Evidence: RK/four-videos/final/2-weather-station.script.md beats w02 and w04.
- Confidence: high when the station is live and the verdict is danger, caution or safe; medium when the station is stale or suspect; low when the verdict is unknown. The page shows three bars and prints no scale. [code, live]
  Evidence: BE-Core/Services/Agent/SafetyVerdictService.cs:94, :118-125, :133, :166 and :306-309; FE-WS/agent-dashboard/components/ConfidenceMeter.tsx:5-64; RK/four-videos/final/2-weather-station.script.md beat w05.
- Work decision is a fixed mapping of the verdict: danger is `stop_work`, caution is `controlled_work`, safe is `safe_to_work`, anything else is `safety_unknown`. [code]
  Evidence: BE-Core/Services/Agent/WorkSafetyDecisionService.cs:54-66.
- The criteria identifier covers the heat band only (name, bounds, work, rest, water, no-restriction flag). It does not cover the parameter limits. [code]
  Evidence: BE-Core/Services/Agent/WorkSafetyDecisionService.cs:68-106.
- The "View Recommended Steps" button appears only when the verdict is danger and actions exist. [code]
  Evidence: FE-WS/agent-dashboard/components/SafetySummaryStrip.tsx:124 and :344-352.

### 5.8 Station state, readiness and "What needs attention"

- Readiness, first match wins: no stations gives `no_station`; zero online, or any dark, or any offline gives `not_ready`; any stale, suspect or unregistered gives `degraded`; otherwise `ready`. [code]
  Evidence: BE-Core/Services/WeatherStations/WeatherStationsSummaryComposer.cs:54-63.
- Headline: "There is no Weather Station" when empty; "All N station(s) reporting" when ready; otherwise the worst station by severity (dark 5, offline 4, suspect 3, stale 2, unregistered 1), for example "<name> is offline". [code]
  Evidence: BE-Core/Services/WeatherStations/WeatherStationsSummaryComposer.cs:14, :65-96 and :107-115.
- "What needs attention" lists, in order: "N station(s) dark", "N station(s) offline", "N suspect reading(s) flagged (excluded from safety)", "N stale reading(s)", "N unregistered station(s)", then "Check station <name>". [code]
  Evidence: BE-Core/Services/WeatherStations/WeatherStationsSummaryComposer.cs:76-86 and :120-123.
- Live: a project showed "<station> is offline", Readiness "Not ready", "What needs attention: 1 station offline", "Check station <serial>". [live]
  Evidence: RK/four-videos/final/2-weather-station.script.md beat w07.
- Station name falls back in this order: stored name (WS App DB `StationName`), `LocalId`, `SerialNo`. [code]
  Evidence: BE-Core/Services/WeatherStations/WeatherStationStatusMapper.cs:52-61.

### 5.9 Alerts out

See H12. Episode keys are unique per (project, station serial, indicator, episode start). [code]
Evidence: BE-Dom/Entity/WeatherObservation.cs:59-65.

### 5.10 How policy configuration changes (limits, bands, the Counted switch)

- One endpoint publishes a whole policy: `PUT api/project/{projectId}/SafetyPolicy` carries the stop-work limits, the per-sensor Counted switch and the heat-index bands. It writes them in one database transaction, all or nothing. [code]
  Evidence: BE-Api/Products/WeatherStation/Controllers/SafetyPolicyController.cs:6-32 and :38-52; BE-Core/Services/SafetyPolicyPublishService.cs:8-18.
- The gate is `weatherstation:manage-weather-settings` and nothing else (no fallback to edit or builder rights). [code]
  Evidence: BE-Api/Products/WeatherStation/Controllers/SafetyPolicyController.cs:38; BE/Wakecap.WeatherStation.Domain/Shared/Constants/Permissions.cs:31.
- A stale version answers 409 `rowVersion_conflict`. A loosening change without an acknowledgement answers 409 `acknowledgement_required`. A success returns the audit row ids and closes the project's open observation episodes against the new policy reference. [code]
  Evidence: BE-Api/Products/WeatherStation/Controllers/SafetyPolicyController.cs:41-52; BE-Dom/Entity/ProjectThreshold.cs:5-11 (the version token is the Postgres `xmin` column).
- Writes are audited in `SafetyConfigAuditLog`. Staged changes use `ChangeRequest`. [code]
  Evidence: BE-Infra/Shared/ModelConfiguration/SafetyConfigAuditLogConfiguration.cs:29; BE-Infra/Shared/ModelConfiguration/ChangeRequestConfiguration.cs:31.
- The Counted switch is stored as `ProjectSettings.IndicatorOnlineSettings` (one `OnlineStatusEnabled` flag per indicator, true by default). It is audited and it feeds the 30-day preview. The live limit check, the verdict and the observation evaluator do not read it. [code]
  Evidence: BE-Core/Services/SafetyPolicyPublishService.cs:20-28; BE-Core/Services/ProjectSettingsService.cs:78; BE-Core/Services/PolicyImpactService.cs:244-253; `rg -n -i 'OnlineStatus|Counted' BE-Core/Services/Agent BE-Core/SafetyPolicy/SafetyPolicyEvaluator.cs BE-Core/SafetyPolicy/ObservationEvaluator.cs BE-Core/SafetyPolicy/EpisodeFolder.cs BE-Core/SafetyPolicy/ObservationEvaluation.cs` returns nothing.
- Publishing was never exercised in the release-kit captures. [gap]
  Evidence: RK/internal-notes.md section 3 ("Excluded": "Version-checked edits, staged publish ... not exercised").

---

## 6. Timers, thresholds and constants (code, not live)

| Where | Constant | Value | Evidence |
|---|---|---|---|
| SQS consumer | batch size, visibility timeout, region default | 10, 30 s, us-west-2 | SS src/configs/sqs-config.ts:4-6 |
| Terraform sensors queue | visibility, retention, max receives, DLQ retention | 60 s, 4 days, 5, 14 days | INF/terraform/modules/wakecap-apps-aws/sensors-service.tf:17, :29-36 |
| MQTT connector (`buffer` mode) | port, QoS | 8883, at least once | SS src/configs/connector.ts:53-62 |
| Hypertable | chunk interval | 1 week | SS src/migrations/1745697311995-create_weather_station_sensor_table.ts:174-176 |
| TLV | tag, length, values | 0x01, 32 bytes, 16 | SS src/services/weather-station-sensor-service.ts:184 |
| Offline (legacy and backend) | default minutes, future skew | 10, 2 | SS src/configs/constants.ts:37; BE-Core/IndicatorsResultProcessor.cs:25 and :29 |
| Station health | stale, dark | 15, 60 min | BE-Core/Services/Agent/StationHealthService.cs:27-28 |
| Stuck sensor | identical readings, span, look-back, rows | 6, 30 min, 2 h, 500 | BE-Core/Services/Agent/StuckSensorAnalyzer.cs:33 and :36; AgentSummaryService.cs:38 and :41 |
| node-sync | look-back | 1 day | SS src/services/weather-station-sensor-service.ts:275-277 |
| Stale node warning | stale, throttle | 1,440 min, 360 min | SS src/configs/constants.ts:42 and :46 |
| Unknown device warning | throttle | 60 min | SS src/configs/constants.ts:52 |
| Backend caches | thresholds, bands, indicator list | 60 min each, per pod | BE-Core/Services/ThresholdService.cs:45; HeatIndexBandResolver.cs:17; DashboardService.cs:28 |
| Policy impact preview | default window, maximum, in-force cache | 30 d, 180 d, 300 s | BE-Core/Services/PolicyImpactService.cs:74 and :80; BE-Core/Configuration/PolicyImpactOptions.cs:38 |
| Claude wording | timeout, tokens | 8 s, 1,024 | BE-Core/Services/Agent/ClaudeAgentOptions.cs:30; AgentNarrator.cs:26 |
| Evaluator worker | interval (min, max), look-back, batch | 30 s (10, 300), 5 min, 2,000 | BE-Core/SafetyPolicy/ObservationEvaluation.cs:31-49 |
| Dispatcher worker | interval (min, max), batch, attempts, backoff | 10 s (5, 300), 100, 8, 30 s doubling to 3,600 s | BE-Core/Observation/ObservationDispatch.cs:58-86 |
| Front end polling | indicators, graphs, agent summary | 60 s | FE-WS/components/WeatherMetrics.tsx:119 and :141; FE-WS/agent-dashboard/hooks/useAgentSummary.ts:24 |
| Front end defaults | stale time, retries, cache time | 5 min, 0, 0 | FE/providers/QueryProvider.tsx:21-25 |
| Front end layout save | debounce | 600 ms | FE-WS/dashboard-layout/hooks/useDashboardLayout.ts:22 |
| Prod replicas | Weather Station backend, sensors api, sqs, buffer | 2 (default), 2, 15, 5 | INF/terraform/modules/wakecap-apps-aws/variables-apps.tf:1112; INF/terraform/aws/wakecap-main/us-east-2/prod/apps/main.tf:1218-1220 |

---

## 7. Where the data lives (the weather part of the single data bank)

| Store | Where | Tables or objects for weather | Written by | Read by | Tag |
|---|---|---|---|---|---|
| Gateway offline buffer | SD card on the ESP32 gateway | frames held while the site has no uplink, replayed on the `buffered-gw-event` topic family | gateway | gateway transport service (GTS), then the same path | code (second-hand: KB 10-services/gateway-esp-backend-transport/architecture.md:36 and interfaces.md:29) |
| Raw gateway archive | S3 via Kinesis Firehose (bucket named in rules.tf) | every production `gw-event` message | IoT rule `IoT_Kinesis_Prod_Topics` | nobody in these repos | code (action not visible in Terraform) |
| SQS queue | us-west-2 | `production_wakecap_two_sensors_queue` and its dead-letter queue | IoT rule | sensors-service `sqs` mode | code |
| Sensors DB (TimescaleDB, database `sensors`) | same Timescale cluster as the WS App DB | `weather_station_sensor` (hypertable, 29 columns), `weather_station_sensor_summary` (last seen), `project_configuration` (offline threshold) | sensors-service | Weather Station backend (read-only), sensors-service status API | code |
| Node DB | node-service | `node`, `node_meta`, view `v_node_with_meta` (exposed to the sensors DB as a foreign table) | node-service | sensors-service, node-service | code |
| WS App DB (Timescale, database `wakecap_weather_station`) | Weather Station backend | weather tables: `Indicator`, `Graph`, `HeatIndexStatus`, `ProjectHeatIndexBand`, `ProjectSettings`, `ProjectThreshold`, `Report`, `CalculatedStatistics`, `StationName`, `weather_observation`, `WeatherObservationCursor`. Shared tables: `UserProjectDashboardLayout`, `SafetyConfigAuditLog`, `ChangeRequest`, `project_product`. | Weather Station backend | Weather Station backend | code |
| Observation DB | Observation service | weather observation rows (type `WeatherStation`) | Observation service | Observation Manager | code |
| Browser | React Query cache | responses of the polls | front end | front end | code |

Evidence: IOT/rules.tf:29-48; SS src/models/weather-station-sensor-model.ts:4, weather-station-sensor-summary-model.ts:3, project-configuration-model.ts:15-16; NS src/migrations/1769300000000-rename_view_to_v_node_with_meta_and_drop_old_views.ts:11-23; INF/terraform/modules/wakecap-apps-aws/weather-station.tf:34-35 (two connection strings: `App` to database `wakecap_weather_station`, `SensorsDb` to database `sensors`, same Timescale host variable); BE-Infra `ToTable(` mappings (33 in the project, 2 of them read the sensors DB); OBS Wakecap.Observation.Core/Processors/Handlers/WeatherStationObservationHandler.cs:19.

What the pool already keeps per reading, which a future prediction or work-plan feature could use: 14 measurement channels, the reading time, the mesh path quality (`hop_count`, `travel_time`, `qos`, `sink_id`, `gateway_id`), the project and the station. [code]
Evidence: SS src/models/weather-station-sensor-model.ts:1-98.

The Sensors DB is the shared pool for 8 non-position sensor types (impact, free fall, panic, altimeters, worker steps, weather, generic sensor data). Weather is one table in it. [stat, second-hand]
Evidence: KB 10-services/sensors-service/overview.md:5; KB 10-services/sensors-service/data.md:38 (607 MB on 2026-07-30); KB 10-services/wakecap-weather-station/overview.md:37 (database 15.9 GiB on 2026-07-27).

Join keys and seams that exist in the pool today:
- `project_id` (uuid) is on every weather table: readings, last-seen row, thresholds, bands, settings, layout, outbox. [code]
  Evidence: SS src/models/weather-station-sensor-model.ts:19-20; BE-Dom/Entity/ProjectThreshold.cs:35; BE-Dom/Entity/ProjectHeatIndexBand.cs:24; BE-Dom/Entity/WeatherObservation.cs:22.
- A station is a node in the registry and can carry a space id and map coordinates. [code]
  Evidence: NS src/services/weather-station-service.ts (`upsertWeatherStationMeta`, `listWeatherStations` filter on `space_id`); NS src/dtos/weather-station-dtos.ts:51, :92-129; SS src/models/v-node-with-meta-model.ts:49-53.
- The Observation Manager is the common sink. Weather episodes are filed there under source `WeatherStation`, next to other products' observations. [code, second-hand]
  Evidence: BE-Core/Observation/ObservationManagerSink.cs:25; OBS/Wakecap.Observation.Core/Processors/Handlers/WeatherStationObservationHandler.cs:19; KB 10-services/wakecap-digital-work-permit/overview.md:48.
- No code in the weather backend or the weather front end joins a reading to a work permit or to equipment. [vision]
  Evidence: `rg -n -i 'work.?permit|permit|equipment' --glob '*.cs' -g '!**/bin/**' -g '!**/obj/**' -g '!**/IntegrationTests/**' -g '!**/Migrations/**' BE/Wakecap.WeatherStation.Core BE/Wakecap.WeatherStation.Domain BE/Wakecap.WeatherStation.Web.API BE/Wakecap.WeatherStation.Contracts BE/Wakecap.WeatherStation.Infrastructure` returns 3 unrelated lines (two work-permit fields on a copied project DTO, one comment). `rg -n -i 'permit|equipment' --glob '!**/*.test.*' --glob '!**/stories/**' FE-WS` returns 1 unrelated comment.

What reads the stored readings today: dashboard, graphs, historical queries, Excel and JSON reports, station readings window, recent readings for stuck detection, the 30-day policy impact preview, the observation evaluator, service health. [code]
Evidence: `rg -l "SensorsDbContext|WeatherStationSensor" --glob '*.cs' -g '!**/bin/**' -g '!**/obj/**' -g '!**/IntegrationTests/**' -g '!**/Migrations/**' BE/Wakecap.WeatherStation.Core BE/Wakecap.WeatherStation.Web.API BE/Wakecap.WeatherStation.Infrastructure` lists 16 files. Ten of them are Core implementations: DashboardService, HistoricalDashboardService, ReportService, ReportSummaryService, PolicyImpactService, StationReadingsWindowService, RecentReadingsProvider, WeatherServiceHealthService, WeatherStationsStatusService and ObservationEvaluation. The rest are interfaces, the DbContext, its mapping and one controller.

Prediction: no forecast or prediction code exists in the weather path. The only hits for "predict" are unrelated comments. [vision]
Evidence: `rg -n -i 'forecast|predict' --glob '*.cs' -g '!**/bin/**' -g '!**/obj/**' -g '!**/IntegrationTests/**' -g '!**/Migrations/**' BE/Wakecap.WeatherStation.Core BE/Wakecap.WeatherStation.Domain BE/Wakecap.WeatherStation.Web.API BE/Wakecap.WeatherStation.Contracts` returns 3 comment lines (two about a timing benchmark, one about clock skew). `rg -n -i 'forecast|predict' SS/src` and `rg -n -i 'forecast|predict' --glob '!**/*.test.*' --glob '!**/stories/**' FE-Root/src` return nothing.

A look-back "what would this limit have done" replay exists (30 days default, 180 maximum). It is a replay, not a forecast. [code, live]
Evidence: BE-Core/Services/PolicyImpactService.cs:24, :74, :80; RK/four-videos/final/2-weather-station.script.md beat w12 ("Would have stopped work on 8 of the last 30 days").

---

## 8. Legacy still in the path, and what is new

### 8.1 Original WakeCap sensor pipeline (legacy, still carrying every reading)

| Piece | What it does for weather | Evidence |
|---|---|---|
| Wirepas mesh, node firmware, gateways | carry the frame | H1 to H3 |
| Gateway transport service (GTS, Python, hardware team) | turns the gateway's binary frames into Wirepas protobuf on `gw-event`; no store | H3 |
| AWS IoT Core and its topic rules (hand-made, imported into Terraform) | one rule routes endpoint 61 to SQS | IOT/rules.tf:1-3 (header says rules are "imported, not created"), :890-905 |
| SQS `production_wakecap_two_sensors_queue` | buffers | IOT/rules.tf:898 |
| sensors-service (Node, first commit 2021) | decode, store, last-seen, status API, node-sync | SS src, `git -C SS log --reverse` |
| Sensors DB tables | the pool of raw readings | SS src/migrations |
| node-service and the Node DB | registry of stations and gateways | NS src/services/weather-station-service.ts |
| wakecap-jobs (Quartz, HTTP triggers only) | `WeatherStationSyncJob` calls node-sync every 10 minutes. Its repo is not local. | SS src/controllers/weather-station-controller.ts:24-27; KB 10-services/wakecap-jobs/overview.md:52 |
| job-scheduler-service | holds the sensors status URL in its config. Its repo is not local. | INF/terraform/modules/wakecap-apps-aws/job-scheduler-service.tf:111 |
| Observation service (Observation Manager) | receives weather danger episodes | OBS Wakecap.Observation.Core/Processors/Handlers/WeatherStationObservationHandler.cs |
| Identity server and permissions | JWT authority, `weatherstation:*` grants | BE/Wakecap.WeatherStation.Domain/Shared/Constants/Permissions.cs:12-31 |
| Legacy portal widgets | the live-map weather widget reads the same data | H15 |

Services I checked that are not in the weather reading path: `wakecap-integrations` (camera, KSPF, compliance, worker signup; it only reuses a namespace name), `safety-service` (alarms and evacuation; only a node-type enum migration mentions weather), `node-status-service` (mesh node status, last commit 2021, no weather reference), `diagnostics-service`, `location-service` (node-type enum copies only).
Evidence: `rg -il weather` per repo gave: wakecap-integrations 6 files (all `Wakecap.WeatherStation.Contracts` namespace reuse), safety-service 2 (migration), node-status-service 0, diagnostics-service 2 (migration), location-service 3 (enum and migration); README overview lines of each repo.

### 8.2 New in the Weather Station service (everything derived)

| Piece | Evidence |
|---|---|
| Heat index (AAT and NOAA), band resolver, per-project bands | BE-Dom/Helpers; BE-Core/Services/HeatIndexBandResolver.cs |
| Limit check, null rollback, online per parameter | BE-Core/IndicatorsResultProcessor.cs; BE-Core/SafetyPolicy/SafetyPolicyEvaluator.cs |
| Station health, anomalies, stuck detection | BE-Core/Services/Agent |
| Verdict, steps, confidence, work decision | BE-Core/Services/Agent/SafetyVerdictService.cs; WorkSafetyDecisionService.cs |
| Station state, readiness, "What needs attention" | BE-Core/Services/WeatherStations |
| Policy tables and audit, per-user layout | BE-Infra `ToTable(` mappings; BE/Wakecap.WeatherStation.Domain/Shared/Entity/UserProjectDashboardLayout.cs |
| Observation outbox, evaluator, dispatcher | BE-Core/SafetyPolicy, BE-Core/Observation, BE-Core/Hosting |
| The micro-frontend (earlier names `ws` and `weather-station-app`, now `@wakecap-fe/connected-environment-app`) | FE-Root/package.json:2; `git -C FE2 log origin/master --grep=TAN-1967` (old `ws` micro-app removed 2026-08-11) |

### 8.3 What the Connected Environment conversion changed on this path

Nothing in ingestion or storage. The backend stayed one service (repo `wakecap-weather-station`, k8s app `weather-station`, ingress `/weather-station`) and now also hosts Lightning and Gas folders. The front end was renamed and moved under `/connected-env/`. [code]
Evidence: BE solution projects (`grep '^Project(' BE/Wakecap.WeatherStation.sln`); BE-Api/Products (WeatherStation, LightningSensor, GasDetector folders); FE/routes.tsx:116; INF/terraform/aws/wakecap-main/us-east-2/prod/apps/ingress.tf:382.

### 8.4 Contrast for the three-product slide (context only)

Lightning uses the same node-level endpoint 61, but its frames go to their own IoT topic (`received_lightning_data/{gwId}`), their own SQS queues and a consumer inside the Weather Station backend. Weather is decoded inside sensors-service and read from the shared table. Gas is polled from a vendor cloud and has no mesh path. [code]
Evidence: IOT/lightning-ingestion.tf:16-33; BE/Wakecap.WeatherStation.Core/CoreServiceRegistry.cs:171-175 (lightning workers); RK/four-videos/_research/integration-and-devices.md ("Paths at a glance").

---

## 9. Provenance of 15 visible fields

Origin is one of: device sensor, computed, policy configuration, user choice.

| # | Field on the page | Origin | Computed or chosen where | Note | Tag |
|---|---|---|---|---|---|
| 1 | Heat Index (value and band color) | computed from 3 device sensors; method chosen per project | BE-Dom/Helpers/AATMethod.cs:8; NOAAMethod.cs:5-51; HeatIndexCalculator.cs:38-62; called at BE-Core/Services/DashboardService.cs:67 and :182-189; shown by FE-WS/components/HeatIndexCard.tsx:100-122 | inputs: temperature, humidity, wind speed. Live values seen: 49.5, 50.4, 52.9 °C. | code, live |
| 2 | Work time | policy configuration (the band is picked by the computed heat index) | BE-Infra/InfrastructureServiceRegistry.cs:519-568 or per-project rows via BE-Core/Services/HeatIndexBandResolver.cs:31-39; copied at BE-Dom/Helpers/HeatIndexCalculator.cs:54-61 | shown by FE-WS/dashboard-layout/components/HeatIndexAdvisory.tsx:112-180 | code, live |
| 3 | Rest time | same as 2 | same as 2 | same card | code, live |
| 4 | Drinking water | same as 2 (`WaterFrequencyMinutes`, `WaterAmountMl`) | same as 2 | FE-WS/dashboard-layout/components/HeatIndexAdvisory.tsx:182-216 | code, live |
| 5 | Verdict word and text | computed | BE-Core/Services/Agent/SafetyVerdictService.cs:52-135 | FE-WS/agent-dashboard/components/SafetySummaryStrip.tsx:108-110; text may be reworded by the Claude layer (not seen live) | code, live |
| 6 | Verdict steps ("View Recommended Steps") | computed (fixed text per verdict) | BE-Core/Services/Agent/SafetyVerdictService.cs:202-251 | button only on Danger, FE-WS/agent-dashboard/components/SafetySummaryStrip.tsx:124 | code, live |
| 7 | Data confidence | computed | BE-Core/Services/Agent/SafetyVerdictService.cs:118-125, :133, :166, :306-309 | three bars, no scale printed; FE-WS/agent-dashboard/components/ConfidenceMeter.tsx:30-64 | code, live |
| 8 | Last updated | device time, rebuilt in sensors-service, then max over parameters; formatted in the browser | SS src/services/weather-station-sensor-service.ts:94; BE-Core/Services/Agent/StationHealthService.cs:49-53; BE-Core/Services/Agent/SafetyVerdictService.cs:194; FE-WS/agent-dashboard/components/SafetySummaryStrip.tsx:111-119; FE/utils/siteTime.ts:16 | Saudi time for every project | code, live |
| 9 | Station Online or Offline | computed from the reading time against a project threshold (default 10 min) | SS src/services/weather-station-sensor-service.ts:532-554; BE-Core/Services/WeatherStations/WeatherStationStatusMapper.cs:30-43; FE-WS/station-domain/utils/stationState.ts:66-84 | threshold is policy configuration held in the sensors service, not editable on the page | code, live |
| 10 | "Last reading was N minutes ago" | computed | BE-Core/Services/Agent/StationHealthService.cs:69 and :116 | shown from `stationHealth.reason`: FE-WS/agent-dashboard/components/StationHealthCard.tsx:64; can sit under an offline headline (release-kit lead decision 4) | code, live |
| 11 | Readiness | computed | BE-Core/Services/WeatherStations/WeatherStationsSummaryComposer.cs:54-63 | FE-WS/station-domain/components/WeatherStationSummaryCard.tsx:64-81 | code, live |
| 12 | What needs attention | computed | BE-Core/Services/WeatherStations/WeatherStationsSummaryComposer.cs:65-86 and :120-123 | FE-WS/station-domain/components/WeatherStationSummaryCard.tsx:119-137 | code, live |
| 13 | Dust Particles reading and "Above safe limit" | device sensor (PM2.5) plus a computed comparison | SS src/services/weather-station-sensor-service.ts:165 (slot 5); BE-Infra/InfrastructureServiceRegistry.cs:298-304 (`Pm25`); BE-Core/IndicatorsResultProcessor.cs:260-291; BE-Core/SafetyPolicy/SafetyPolicyEvaluator.cs:61 and :71 | "Dust Particles" is the PM2.5 column. Danger when reading is at or above the limit. | code |
| 14 | Dust Particles threshold | policy configuration | BE-Dom/Entity/ProjectThreshold.cs:26; default 3.5 at BE-Dom/Constants/ProjectThresholdDefaults.cs:16; inserted at BE-Core/Services/ThresholdService.cs:417-444; edit needs `weatherstation:manage-weather-settings` at BE-Api/Products/WeatherStation/Controllers/ThresholdController.cs:34-35 and :83-84; field range 0 to 2,000 at FE-WS/utils/weatherThresholds.ts:12-15 | shown on the policy page, not on the live card | code, live (policy page seen) |
| 15 | "Select parameters" layout | user choice, saved per user per project | BE/Wakecap.WeatherStation.Domain/Shared/Entity/UserProjectDashboardLayout.cs:12-26; BE-Api/Shared/Controllers/DashboardLayoutController.cs:21-38; BE/Wakecap.WeatherStation.Core/Shared/Services/DashboardLayoutService.cs:15-60; FE-WS/dashboard-layout/components/DashboardLayoutSettings.tsx; label at FE-WS/translations/en.ts:736 | 12 switchable parameters; Heat Index is pinned (FE-WS/dashboard-layout/utils/indicatorCatalog.ts:78-103) | code, live (popup seen, no switch touched) |

Evidence for "live": RK/internal-notes.md section 3; RK/four-videos/final/2-weather-station.script.md beats w02 to w09, w13.

---

## 10. Seen live, and not seen live (4 Oct 2026, production build 1.0.7)

Seen live:
- Verdict strip with confidence mark and update time; "View Recommended Steps" and Details drawers.
- Heat Index card with work, rest and water.
- Station health: 3 stations, 1 offline, readiness Not ready (Project A).
- A second project with three readings in Danger (heat index 41.5, temperature 39.4, pressure 1001.9 hPa).
- The gear popup "Select parameters" (opened and closed only).
- Policy page showing the heat method NOAA and five band cards.
- Saudi time with the browser set to Los Angeles time.
Evidence: RK/internal-notes.md section 3; RK/four-videos/final/2-weather-station.script.md beats w02 to w09, w13; RK/four-videos/_research/refresh-1.0.7.md.

Not seen live:
- The agent-composed dashboard, "Why this verdict" and the observation drawer (flag off).
- Claude rewording (no evidence it is on).
- Any hop between the station and the database (only the result is visible).
- Alert delivery to the Observation Manager.
- Backend build and deploy state.
Evidence: RK/internal-notes.md sections 3 and 6; RK/four-videos/_research/agent-and-control.md ("Live on 2026-10-04").

---

## 11. Differences between sources (do not repeat the stale side)

| # | Stale or conflicting claim | Where | What the code says | Evidence |
|---|---|---|---|---|
| D1 | Weather station endpoint is 242 | ARCH/01-weather-station-current-state.dot:49; ARCH/05-backend-data-ownership.dot:22; ARCH/weather-station-architecture-report.md:55; SS README.md ("Supported Sensor Types" table); COST html component table | The endpoint is 61 and it is the shared Modbus transport. 242 does not appear in `src`. The README table also disagrees with the enum for other sensors. | SS src/utilities/enums.ts:36-49; `rg -n 242 SS/src --glob '*.ts'` returns nothing. Second-hand, same conclusion: KB 10-services/sensors-service/debt.md:20-24 and interfaces.md:36 ("code value 61, README says 242, wrong" in KB 10-services/gateway-v2.0/interfaces.md:146) |
| D2 | "External scheduler (owner unknown) triggers `Observation/Process`" | ARCH/05-backend-data-ownership.dot:46 and :60; ARCH report section 8 | The KB names the caller: `WeatherStationObservationJob` in `wakecap-jobs`, every 1 minute. The sweep endpoint was retired on 2026-09-24 and answers 410 Gone. In-process workers now do the job. | BE-Api/Products/WeatherStation/Controllers/ObservationController.cs:10-25; BE/Wakecap.WeatherStation.Core/CoreServiceRegistry.cs:110-111 |
| D3 | Gateway path routing is "Inferred" | ARCH/05-backend-data-ownership.dot:11 | The ALB ingress rules are in Terraform. | INF/terraform/aws/wakecap-main/us-east-2/prod/apps/ingress.tf:78-83, :113-118, :382, :447 |
| D4 | Backend and sensors-service run on EC2 hosts | COST/2026-08-10-weather-station-running-cost.html (component table) | Terraform deploys both as Kubernetes apps. Whether live ingestion still runs on a legacy VM is not provable from repos (see gaps). | INF/terraform/modules/wakecap-apps-aws/weather-station.tf:241-255; sensors-service.tf:106-112; INF/terraform/aws/wakecap-main/us-east-2/prod/apps/main.tf:1210-1220 |
| D5 | `WeatherStations/Status`, `Summary`, `Insight` are "planned" | ARCH/03-weather-station-target-state.dot:23 | They exist in code and the first two are on the live page. | BE-Api/Products/WeatherStation/Controllers/WeatherStationsController.cs:34-78 |
| D6 | Local clone `/Users/admin/wc/sensors-service` shows `WEATHER_STATION = 61` and no router | that clone's src/utilities/enums.ts | Current master renamed it `MODBUS = 61` with a tag router. | SS src/utilities/enums.ts:49; `git -C /Users/admin/wc/sensors-service rev-list --count master-wakecap-2..origin/master-wakecap-2` gives 89 |
| D7 | Narration is "gated behind a flag that is OFF" | COST html | In code narration is on whenever an API key exists. The flag is not in the narrator. Whether a key is set in prod is unknown. | BE-Core/Services/Agent/ClaudeAgentOptions.cs:44 and :83-97 |
| D8 | The weather page calls the sensors-service status API directly | ARCH/06-runtime-data-flow.mmd:29-33 | The visible station list comes from the Weather Station backend. The old metrics view stays mounted but hidden and still calls the sensors status API and owns the station selection. | FE-WS/components/LiveDashboard.tsx:317-326; FE-WS/components/WeatherMetrics.tsx:76 |
| D9 | The device publishes straight to AWS IoT Core | ARCH/05-backend-data-ownership.dot:63 (`devices -> iot`); ARCH/06-runtime-data-flow.mmd | A gateway transport service (GTS) sits between the gateway and the topic rule. It re-encodes the frames. | INF/terraform/modules/wakecap-apps-aws/gateway-esp-backend-transport.tf:1-60; IOT/lightning-ingestion.tf:18-20; KB 10-services/gateway-esp-backend-transport/architecture.md:35-40 (second-hand) |
| D10 | A reading with no registry match "is dropped (logged but not retried)" | SS CLAUDE.md (section "Node/Metadata Lookup") | In `sqs` mode the handler rethrows, the batch is not acknowledged, and the message is received again until it is dead-lettered. | SS src/handlers/sqs-handler.ts:98-101; `git -C SS show 3dde479` (commit body); IOT/rules.tf:907-930 |

---

## 12. Watch-outs for the slides

- Do not name a standard for the heat index formula. The code is a simplified apparent temperature that uses RH in percent where the published form uses vapour pressure. See section 13.2 for numbers. Evidence: section 5.2.
- Do not say "stale" or "dark" station states appear by default. At the default 10-minute threshold only online, offline and suspect can appear. The health class still drives the verdict: a station silent for 60 minutes gives the verdict `unknown` ("Status unknown"). Evidence: section 5.5; BE-Core/Services/Agent/SafetyVerdictService.cs:57-60.
- A green "Last reading was N minute(s) ago." can sit under an offline headline. The offline flag uses 10 minutes, the health class uses 15. Evidence: RK/four-videos/_research/refresh-1.0.7.md ("Lead decisions", item 4); BE-Core/Services/Agent/StationHealthService.cs:27 and :116.
- Last-seen is last-writer-wins on master. A late packet can make a station read offline until the next packet. The fix is on an unmerged branch. Evidence: H8.
- A project row with a NULL offline threshold makes the status API treat the threshold as zero minutes, so every station reads offline. The code path is `threshold = projectConfiguration.weather_station_offline_threshold` with no null check. The backend's own per-parameter check falls back to 10 for zero or negative, but not for the station flag. Evidence: SS src/services/weather-station-sensor-service.ts:532-543; BE-Core/IndicatorsResultProcessor.cs:88-90; `git -C SS show 11ab624` (defect 2 in the unmerged fix).
- The seeded barometric pressure limit is 1,000 hPa and a reading equal to or above the limit is Danger. A live project showed 1001.9 hPa as "Threshold: Danger". I did not check whether that project uses the default. Evidence: BE-Dom/Constants/ProjectThresholdDefaults.cs:21; BE-Core/SafetyPolicy/SafetyPolicyEvaluator.cs:71; RK/four-videos/final/2-weather-station.script.md beat w08.
- Policy edits are cached per pod for up to 60 minutes. With 2 replicas, the pod that did not serve the write can keep the old limits until its cache expires. This is my inference from the code. Evidence: BE-Core/Services/ThresholdService.cs:45 and :691; BE-Api/Program.cs:40; INF/terraform/modules/wakecap-apps-aws/variables-apps.tf:1112.
- The "Data as of" line falls back to `general.time`, which is the current clock time in the project zone, not the reading time. Evidence: BE-Core/Services/DashboardService.cs:53-58; FE-WS/dashboard-layout/components/DashboardLayoutSection.tsx:116 and :149 and DataAsOfTimestamp.tsx:40.
- The front end treats `onlineStatus === false` as "Sensor offline". The backend field of that name is the policy Counted switch, true by default. A parameter set to not counted would show as offline on its card. I did not test it. Evidence: FE-WS/dashboard-layout/utils/cardState.ts:40-43; BE-Core/IndicatorsResultProcessor.cs:96-112; BE-Core/Services/SafetyPolicyPublishService.cs:20-28.
- In the backend code I read, the Counted switch does not change the live verdict. The limit check, the verdict and the observation evaluator do not read it. Only the policy preview and the change rules do. Do not say a Counted switch stops a parameter from counting toward stop-work today. Evidence: section 5.10.
- Known loss on the shared sensors queue is about 0.9 percent into a dead-letter queue (a code comment, undated). Evidence: IOT/lightning-ingestion.tf:30-33.
- A reading from a gateway that is not in the registry is rejected (`No-Metadata-Found`). In `sqs` mode it is retried and then dead-lettered, and its batch-mates are redelivered with it. Evidence: H7.
- Station names and serials are shown on the page. The release-kit blurs names and never narrates them. Evidence: RK/four-videos/_research/refresh-1.0.7.md ("Lead decisions", item 1).

---

## 13. Numbers I measured (and stats I only quote)

### 13.1 Measured by me (read-only commands)

| Figure | Value | How |
|---|---|---|
| Values per frame | 16 (14 named, 2 reserved) | SS src/services/weather-station-sensor-service.ts:157-224 |
| TLV block size | 34 bytes (tag, length, 32 bytes) | SS same file:181-184 |
| Stored columns per reading | 29 (11 identity and transport, 16 measurements, 2 housekeeping) | `grep -c '@Column\|@PrimaryGeneratedColumn\|@CreateDateColumn' SS/src/models/weather-station-sensor-model.ts` |
| Columns in the last-seen table | 7 | `grep -c '@Column\|@PrimaryColumn\|@CreateDateColumn\|@UpdateDateColumn' SS/src/models/weather-station-sensor-summary-model.ts` |
| Seeded indicator rows | 12 (13 IndicatorType values) | BE-Infra/InfrastructureServiceRegistry.cs:368-382; BE-Contracts/Products/WeatherStation/Costants/Enums.cs:7-26 |
| Parameters in the "Select parameters" popup | 12 switchable (Heat Index pinned) | FE-WS/dashboard-layout/utils/indicatorCatalog.ts:78-103 |
| Heat bands in the global seed | 5 | BE-Infra/InfrastructureServiceRegistry.cs:519-568 |
| IoT topic rule resources in the file | 59 (file header says 62) | `grep -c '^resource "aws_iot_topic_rule"' IOT/rules.tf`; `sed -n 2p IOT/rules.tf` |
| IoT rules with `enabled = true` / `false` | 45 / 14 | `grep -c 'enabled *= *true' IOT/rules.tf`; `grep -c 'enabled *= *false' IOT/rules.tf` |
| IoT rules that select source endpoint 61 | 2 (one enabled, one disabled 2026-07-26) | `grep -c "topic(7) ='61'" IOT/rules.tf` |
| EF migrations of the WS App DB | 43 in my tree, 44 on `origin/master` | `ls BE-Infra/Migrations/*.cs \| grep -v Designer \| grep -v Snapshot \| wc -l`; `git -C BE ls-tree --name-only origin/master Wakecap.WeatherStation.Infrastructure/Migrations/` |
| Entity to table mappings in the backend | 33 (2 read the sensors DB) | `rg -c 'ToTable\(' BE-Infra --glob '*.cs' -g '!Migrations/**'` summed |
| Weather product controllers | 12 files | `ls BE-Api/Products/WeatherStation/Controllers \| wc -l` |
| Agent service files | 45 | `ls BE-Core/Services/Agent \| wc -l` |
| Core weather product source files | 118 | `find BE-Core -name '*.cs'` |
| C# files per project | Core 190, Domain 62, Infrastructure 159, Web.API 69, Contracts 118, SharedKernel 12, IntegrationTests 187 | `find BE/Wakecap.WeatherStation.<P> -name '*.cs' -not -path '*/bin/*' -not -path '*/obj/*' \| wc -l` |
| Test attributes in the backend | 1,509 `[Fact]` or `[Theory]` | `rg -c '\[Fact\|\[Theory' BE/Wakecap.WeatherStation.IntegrationTests --glob '*.cs'` summed |
| Weather specs in sensors-service | 42 + 9 + 2 `it(` blocks | `rg -c '^\s*it\(' SS/test/services/weather-station-sensor-service-spec.ts SS/test/services/modbus-sensor-service-spec.ts SS/test/controllers/weather-station-node-sync-spec.ts` |
| Backend commits on master | 447 (266 first-parent) | `git -C BE log --oneline master \| wc -l`; `git -C BE log --first-parent --oneline master \| wc -l` |
| Sensors-service commits behind in the stale clone | 89 | `git -C /Users/admin/wc/sensors-service rev-list --count master-wakecap-2..origin/master-wakecap-2` |

### 13.2 Worked heat index examples (my arithmetic, not live readings)

Code formula `T + 0.33 x RH - 0.7 x W - 4.0` against the published Australian apparent temperature form `T + 0.33 x e - 0.7 x W - 4.0`, with `e = RH/100 x 6.105 x exp(17.27 T / (237.7 + T))`. Wind is km/h divided by 3.6, rounded to 1 decimal.

| T °C | RH % | Wind km/h | Code HI | Code band | Vapour-pressure form |
|---|---|---|---|---|---|
| 45 | 30 | 18 | 47.4 | Danger | 46.9 |
| 40 | 50 | 0 | 52.5 | Extreme Danger | 48.1 |
| 35 | 60 | 10 | 48.8 | Danger | 40.1 |
| 32 | 40 | 7.2 | 39.8 | Danger | 32.9 |
| 28 | 20 | 0 | 30.6 | Extreme Caution | 26.5 |

Edge checks with the seeded bands: 52.0 is Extreme Danger, 51.9 is Danger, 39.0 is Danger, 25.0 is Caution.
How: `python3` one-off using the formula in BE-Dom/Helpers/AATMethod.cs:8, the bands in BE-Infra/InfrastructureServiceRegistry.cs:519-568 and the published form at https://en.wikipedia.org/wiki/Apparent_temperature.

### 13.3 Stats quoted from documents (not measured by me)

| Figure | Value | Source |
|---|---|---|
| Readings stored, up to 2026-08-10 | 1,496,265 | COST/2026-08-10-weather-station-running-cost.html (usage "queried read-only against the production cluster on 2026-08-10") |
| Time in production | 466 days from 2025-05-01 | same |
| Stations ever seen / reporting | 19 / 13 | same |
| Stations reporting at 5 minutes or better | 5 | same |
| Best station cadence | 1.2 minutes | same |
| Ingest rate | 6,095 readings a day, about 183,000 a month | same |
| Peak month | 195,287 readings in 2026-06 | same |
| Hypertable | 643 MB, 62 chunks, 0 compressed | same |
| Storage per reading | 451 bytes, uncompressed with indexes | same |
| Projects with data / configured | 8 / 44 | same |
| Messages a day on the weather rule (duplicate test rule, 2026-07) | about 7,300 | IOT/rules.tf:907-945 |
| Loss on the shared sensors queue | about 0.9 percent | IOT/lightning-ingestion.tf:30-33 |
| `No-Metadata-Found` lines a day (two services) | 224 to 5,625 over 7 days | INF/docs/runbooks/integration-failures.md:40 |
| Captured weather frame | 104 bytes | INF/scripts/loadtest/vernemq/subscriber-b/fixtures/README.md:7 |
| `weather_station_sensor` table on 2026-07-30 | 607 MB, 60 chunks, first row 2025-05-01, last row 2026-07-30 | KB 10-services/sensors-service/data.md:38 (second-hand, from an analysis cache) |
| Sensors DB size on 2026-07-27 | 15.9 GiB, 54 tables, 9 hypertables | KB 10-services/wakecap-weather-station/overview.md:37 (second-hand) |
| WS App DB size on 2026-07-27 | 10.8 MiB, 10 tables (before the lightning, gas and observer tables) | KB 10-services/wakecap-weather-station/overview.md:36 (second-hand) |
| Gateway fleet (platform-wide, April 2026) | 534 gateways across 28 customers | INF/context/documentations/RFC-18-aws-iot-core-migration.md:20 |

---

## 14. Gaps (what I could not verify)

1. Station vendor, model and Modbus register map are not in any repo. Only the decoder shows the 16-slot layout.
2. Node firmware, gateway software and the gateway transport service (GTS) are not local repos. Endpoint 61 and tag 0x01 come from comments, a commit body, a fixture note and the KB (second-hand). I did not read GTS code. How GTS treats an endpoint-61 frame (relay topic) is stated differently in the KB and in the IoT rule (see H3).
3. The station's transmit interval is not stated in any repo or doc. Only second-hand stats exist (section 13.3).
4. Which sensors-service runtime consumes the production weather queue is not provable. Infra comments say the Kubernetes pods were wired to a duplicate or empty queue during go-live and that the legacy VM ran 15 sqs and 5 buffer instances. The queue URL for the pods is set in Secrets Manager, which is not in the repos. The KB reaches the same open question. Evidence: KB 10-services/sensors-service/debt.md:74-80; INF/terraform/aws/wakecap-main/us-east-2/prod/apps/main.tf:1210-1220; INF/context/plans/prod-apps-go-live-plan.md:49-54; INF/terraform/modules/wakecap-apps-aws/sensors-service-config.tf:7-10.
5. The `wakecap-jobs` repo is not local. I rely on a code comment and the KB for the 10-minute node-sync job. I cannot say whether its 1-minute `WeatherStationObservationJob` (the old caller of the retired sweep endpoint, per the KB) still fires and now receives 410 Gone. Evidence: SS src/controllers/weather-station-controller.ts:24-27; KB 10-services/wakecap-jobs/overview.md:52; BE-Api/Products/WeatherStation/Controllers/ObservationController.cs:10-25.
6. `job-scheduler-service` holds the sensors status URL. What it does with it is unknown.
7. The live `Indicator` rows (for example whether CO2 has a reading column, whether a CO row exists) were not inspected. I read the seed only.
8. Whether Claude rewording is on in production is not evidenced.
9. Intent of the heat index humidity term (RH percent) is not checked against WCA-18479.
10. Whether the old `@wakecap-fe/ws` bundle is still in the production import map is unknown after 2026-09-03.
11. Backend prod build is not verified. My infrastructure clone ends on 2026-09-22 (image `prod-20260922-600f1f7`). The release-kit says backend deploy state is not verified.
12. The raw archive rule's primary action is not visible in Terraform. I cannot say what is stored in S3.
13. The 0.9 percent queue loss is a code comment with no date or method.
14. Which projects have which stations in production is not known to me (no database access, by rule).
15. Reading time accuracy depends on the mesh travel time. Nothing validates it.
16. The `unregistered` station state is not produced. A sensors-service branch for it is unmerged (TAN-1911, tip 1d61880). [plan] Evidence: `git -C SS show 1d61880 --stat`; `git -C SS merge-base --is-ancestor 1d61880 origin/master-wakecap-2` exits 1.
17. An Ambient Weather WS-2000 HTTP input (Weather Underground protocol, imperial to metric) exists only on an unmerged branch. [plan] Evidence: `git -C SS show 7c78803 --stat`; `git -C SS merge-base --is-ancestor 7c78803 origin/master-wakecap-2` exits 1; ARCH/03-weather-station-target-state.dot:37.
18. The solar controller (tag 0x02) has no storage table yet. Its frames are skipped. [plan] Evidence: SS src/services/modbus-sensor-service.ts:63-67.
19. No compression policy is set on the hypertable (stat says 0 compressed chunks). Evidence: COST html ("62 chunks, 0 compressed"); no `add_compression_policy` in SS src/migrations (`rg -n compress SS/src/migrations` returns nothing).
20. The station list and readiness have no timer in code. I did not observe their live refresh behavior.
21. `No-Metadata-Found` counts are for sensors-service-sqs and diagnostics-service-sqs together, not weather alone.
22. Mesh quality fields (`hop_count`, `travel_time`, `qos`) are stored per reading. I did not query them (no database access).

---

## 15. Names and counts the deck can animate (quick list)

Components, in path order: weather station sensor head, mesh node (Modbus transport), Wirepas mesh, sink, ESP32 gateway, gateway transport service (GTS), AWS IoT Core, topic rule `iot_sqs_sensors_weather_station_production`, SQS `production_wakecap_two_sensors_queue`, sensors-service (`sqs` mode, `ModbusSensorService`, `WeatherStationSensorService`), Sensors DB (`weather_station_sensor`, `weather_station_sensor_summary`), node-service registry (`v_node_with_meta`), Weather Station backend (`DashboardService`, `HeatIndexCalculator`, `HeatIndexBandResolver`, `StationHealthService`, `SafetyVerdictService`, `WeatherStationsSummaryComposer`), WS App DB, ALB ingress (`/weather-station`), `@wakecap-fe/connected-environment-app`, side branch (evaluator, outbox `weather_observation`, dispatcher, Observation Manager).

Counts: 16 values in one 34-byte block; 1 row of 29 columns; 12 seeded indicators; 5 heat bands; 12 switchable parameters; 4 health classes plus unknown; 6 declared station states (5 are produced); 3 sensors-service modes (replicas 2, 15, 5); 2 backend replicas; 3 offline clocks (10, 15, 60 minutes) plus the 30-minute pill; 60-second poll; 30-second evaluator; 10-second dispatcher; 8 attempts.

Dates: 2025-04-26 table created; 2025-05-01 first reading; 2025-05-25 backend repo; 2026-08-17 Modbus router; 2026-10-04 production build 1.0.7.

Formulas and rules the deck can show as one line each:
- Heat index (default): `T + 0.33 x RH - 0.7 x W - 4.0`, W in m/s.
- Band: `Start <= HI < End`.
- Reading time: `rx time - travel time`.
- Online: `age < threshold` (default 10 min).
- Limit: Danger when `reading >= limit`.
- Verdict order: unknown, danger (heat or limit), caution (heat or suspect or stale), safe.
- Readiness order: no_station, not_ready (no online, any dark, any offline), degraded (any stale, suspect, unregistered), ready.

---

## 16. Commands used (all read-only)

- `ls`, `find`, `wc`, `grep -n`, `rg -n`, `rg -c`, `rg -l`, `sed -n`, `awk` on files under the repos listed in section 0.
- `git log`, `git show`, `git diff --stat`, `git rev-list --count`, `git rev-parse`, `git merge-base --is-ancestor`, `git ls-tree`, `git branch -r`, `git status --short`, `git grep` on `origin/master` of `/Users/admin/wc/frontend-2.0`.
- `python3` for date conversion of migration ids, for text extraction from the running-cost HTML, and for the worked heat index examples.
- `WebFetch` of one public page (en.wikipedia.org) to confirm the published apparent temperature formula. A second public fetch (the Australian Bureau of Meteorology page) returned HTTP 403.
- No `git fetch`, `pull`, `checkout`, `stash` or `reset`. No app, test, build, install or docker run. No call to any WakeCap host.
