# C5 Data bank: fact sheet

Slice: the data bank. Everything stored today, what is missing, who owns what, and which keys join it.
Written 2026-10-05. Read-only research. No app, test, build, database or network call was made. Nothing was posted. No secret file was opened or printed. One broad phrase search is disclosed in section 11, item 17.

## 0. How to read this sheet

Status values (as set for this program):

- `live` = seen working in production.
- `code` = in master code, deploy not verified.
- `test` = deployed to the test environment only.
- `plan` = documented intent.
- `vision` = nobody built it.
- `stat` = a published or documented statistic. For numbers copied from an internal doc I use `stat` and write "internal doc" with its date.

Every fact has an `Evidence:` line under it. A path with `:line` or an exact command. Another engineer can re-check each in under a minute.

Path aliases (all absolute under `/Users/admin/wc`):

| Alias | Path |
|---|---|
| WS | `/Users/admin/wc/weather-station` |
| BE | `WS/wakecap-weather-station` (CE backend) |
| BE.Domain / BE.Core / BE.Infra / BE.Contracts / BE.Api / BE.Tests | `BE/Wakecap.WeatherStation.Domain` / `.Core` / `.Infrastructure` / `.Contracts` / `.Web.API` / `.IntegrationTests` |
| SNAP | `BE.Infra/Migrations/WeatherStationDBContextModelSnapshot.cs` |
| FE | `WS/frontend-2.0-weather-station` |
| SS | `WS/sensors-service` |
| NS | `node-service` |
| OM | `wakecap-observation` |
| OM.SNAP | `OM/Wakecap.Observation.Infrastructure/Database/Migrations/ObservationDBContextModelSnapshot.cs` |
| LS | `location-service` |
| APP | `wakecap-app-api` |
| WG | `worker-gear` |
| KB | `wc3-platform/docs/wc2-knowledge-base` (internal platform knowledge base) |
| INFRA | `infrastructure` |
| RC | `WS/Running Cost` |
| RK | `WS/release-kit` |
| ARCH | `WS/Weather Station Architecture` |

Which commit each repo was read at (`git log -1` in each):

- BE: master is `352195f` (2026-10-04). The checked-out branch is `TAN-2895-drop-testing-comment` at `5cd5335`. It is master plus one commit that only deletes a comment and edits one test. Where I cite `GasPollingOptions.cs` I cite master line numbers (`git show master:...`).
  Evidence: `git -C BE diff --stat master..HEAD` shows 2 files, 1 insertion, 9 deletions.
- FE master `83b4d8d` (2026-10-05). Production served front-end build 1.0.7 on 2026-10-04.
  Evidence: `RK/four-videos/_research/refresh-1.0.7.md:4`.
- SS `8ee79d8` (2026-10-01). A second, older checkout at `/Users/admin/wc/sensors-service` is at `e969d3e` (2026-07-08) and was not used.
- NS `262e8bf` (2026-10-01). OM `0dbd7f7` (2026-09-29, detached HEAD). LS `c412c81` (2026-08-11, a feature branch). APP `922067f9` (2026-08-12). WG `b1e2053` (2026-08-17). INFRA `0c17cb299` (2026-09-22).
- Backend deploy state is not verifiable from here.
  Evidence: `RK/internal-notes.md:8`, `RK/four-videos/_research/integration-and-devices.md:5`.

No customer or people names appear in this sheet. Projects are "a live project" or Project A, B, C.

---

## 1. Headline (plain)

1. The CE backend keeps one PostgreSQL database with 31 tables for all three products. It had 10 tables on 2026-07-26. It has 31 on 2026-10-04. That is 21 new tables in 70 days.
2. Weather readings are not in that database. They sit in the sensors-service TimescaleDB table `weather_station_sensor`, which the CE backend reads read-only. An internal doc counted 1,496,265 readings on 2026-08-10.
3. Gas readings, gas alerts, lightning packets and lightning state history are stored in the CE database. No code deletes them.
4. The claim "gas reading history is not stored" is false in code and true in the screen text. The backend stores every gas reading and serves a history route. The gas screens tell the user the backend does not keep it yet.
5. Verdicts are stored as episodes (start and end), not as one row per reading. Verdict history starts 2026-09-20 at the earliest.
6. Nothing in the CE bank names a worker, a permit or a machine. The keys to join them exist in other services: project id, time, space and zone, device-to-worker assignment.
7. No forecast, prediction or trend code exists in the backend.
8. "One pool that holds everything" is vision. No store joins to another today. There is no foreign key across databases.

---

## 2. The stores today (physical map)

Evidence for the whole table sits in the bullets below it.

| Store | Owner service | Tech | Written by | Read by | Status |
|---|---|---|---|---|---|
| WS App DB (31 tables) | wakecap-weather-station | PostgreSQL, EF Core 10, plain tables | CE backend only | CE backend, MCP tools | code, parts live |
| Sensors DB: `weather_station_sensor`, `weather_station_sensor_summary`, `project_configuration` | sensors-service | TimescaleDB, TypeORM | sensors-service ingest | sensors-service API, CE backend read-only | live |
| Node registry: `node`, `node_meta`, `network`, view `v_node_with_meta` | node-service | PostgreSQL, PostGIS | node-service | sensors DB and location by foreign table, CE backend by REST | live |
| Observation Manager DB: `Observation` and 14 more own tables | wakecap-observation | PostgreSQL, EF Core | OM only, fed by POST ingest | OM | code |
| Location DB: `asset_location`, `anchor_scans`, `location_summary` | location-service | TimescaleDB, PostGIS | location-service | location-service | code, stat |
| App DB `wakecap_app`: People, Zone, Space, ResourceDevice, WorkPermit, NovadeWorkPermit, DeviceLocation | wakecap-app-api | PostgreSQL | app-api | OM, location by foreign table | code, stat |
| Blackline cloud (gas devices) | external vendor | vendor API | vendor | CE backend polls | code, live |
| SQS queues (lightning, modbus) with dead-letter queues | infrastructure | AWS SQS, 14-day retention | IoT rules | CE backend consumer | code |
| Heat-stress bracelet readings: `Heatstress` | worker-gear | PostgreSQL | worker-gear | worker-gear | code |
| Equipment and GPS: `wakecap_equipments` | wakecap-equipments | PostgreSQL, Traccar tables | that service | that service | stat only |
| Warehouse `wakecapdw` | analytics pipelines | Azure SQL | ADF pipelines | BI, app-api | stat only |

### 2.1 WS App DB

- One EF context holds all CE tables for weather, lightning, gas, observer and shared features. [code]
  Evidence: `BE.Infra/Database/WeatherStationDBContext.cs:15-16` applies every configuration that implements `IWeatherStationDbContextConfiguration`.
- 31 tables. By family: gas 7, lightning 5, observer 4, shared 4, weather outbox 2, weather config and catalog 9. [code]
  Evidence: `grep -c 'b.ToTable("' SNAP` returns 31. Table lines are `SNAP:105` to `SNAP:1766`.
- 43 migrations. The first is `20250602121252_Initial-migration`. The last is `20261004101005_add-lightning-location`. [code]
  Evidence: `ls BE.Infra/Migrations | grep -v Designer | grep -v Snapshot | wc -l` returns 43.
- Migrations run at every start. A failed migration stops the app. [code]
  Evidence: `BE.Infra/InfrastructureServiceRegistry.cs:1185-1208` (`Seed(app)` calls `Database.Migrate()` and rethrows).
- The database has no hypertable, no compression and no retention job. [code]
  Evidence: `grep -il 'hypertable\|timescale\|add_job\|continuous' BE.Infra/Migrations/*.cs` returns nothing. KB says 0 hypertables in this database (internal doc, 2026-07-27): `KB/10-services/wakecap-weather-station/overview.md` (table "At a glance").
- Every timestamp is `timestamp` without time zone and holds UTC. [code]
  Evidence: `SNAP:229` (`ReadingAtUtc` is `HasColumnType("timestamp")`), same pattern on every date column.
- The row version is PostgreSQL `xmin` mapped to `RowVersion` on three tables. [code]
  Evidence: `SNAP:976-980` (ProjectHeatIndexBand), `SNAP:1032-1036` (ProjectSettings), `SNAP:1099-1103` (ProjectThreshold).
- Cache is in-memory only. No Redis. [code]
  Evidence: `grep -rli 'redis\|StackExchange' BE --include=*.cs --include=*.csproj` returns nothing. `IMemoryCache` is used in `BE.Core/Products/WeatherStation/Services/PolicyImpactInForceCache.cs` and 9 other files (`grep -rl 'IMemoryCache' BE.Core BE.Infra BE.Api --include=*.cs` returns 10).
- The policy-impact cache holds at most 200 entries for 300 s. [code]
  Evidence: `BE.Core/Products/WeatherStation/Configuration/PolicyImpactOptions.cs:38` (300 s) and `:46` (200 entries).
- Size: 10 MB on 2026-08-10 with about 10 tables; 10.8 MiB (0.01 GiB) on 2026-07-27. [stat]
  Evidence: `RC/2026-08-10-weather-station-running-cost.html:672` (internal doc, 2026-08-10); `KB/10-services/wakecap-weather-station/overview.md:36` (10.8 MiB, 10 tables) and `KB/20-data/estate-map.md:82` (0.01 GiB), internal docs, 2026-07-27.
- Seven hosted services run inside the backend. [code]
  Evidence: `BE.Core/CoreServiceRegistry.cs:110,111,134,171,173,174,175` (ObservationEvaluation, ObservationDispatch, GasReadingsPolling, LightningObservationDispatch, LightningStalenessSweep, LightningQueueConsumer, LightningDeviceSync).
- The foreign-data-wrapper helpers (`People`, `Space`, `Zone`, `Company` foreign tables) exist as code but nothing calls them. The CE backend reads the sensors DB through a second connection string, not through foreign tables. [code]
  Evidence: `BE.Infra/Database/SQL/ForeignWrapperManager.cs:78-151` (helpers); `grep -rn 'CreatePeopleMapping\|CreateZoneMapping\|CreateSpaceMapping\|CreateCompanyMapping' BE --include=*.cs` finds only the definitions; `BE.Infra/InfrastructureServiceRegistry.cs:86-93` (`SensorsDbContext` on `GetConnectionString("SensorsDb")`).

### 2.2 Sensors DB (weather readings)

- `weather_station_sensor` is a TimescaleDB hypertable on `generated_at` with a one-partition space key on `network_id` and a one-week chunk. [code]
  Evidence: `SS/src/migrations/1745697311995-create_weather_station_sensor_table.ts:174-176`.
- It has 29 columns, 16 of them measurement channels. The channels are wind speed, rain fall, temperature, cumulative rain fall, air pressure, PM2.5, wind direction, PM10, humidity, TSP, H2S, CO2, SO2, CO, custom sensor 4, custom sensor 5. [code]
  Evidence: `SS/src/models/weather-station-sensor-model.ts` (`grep -c "type: 'float'"` returns 16; 29 column declarations).
- The unique key is `(serial_no, network_id, generated_at)`. Duplicates are ignored on insert. [code]
  Evidence: `SS/src/migrations/1755727250432-add_serial_no_index_to_weather_station_sensor.ts:17-20`; `SS/src/services/weather-station-sensor-service.ts:107` (`insertOrIgnore`).
- A solar radiation column and three spare custom columns were dropped in July 2025. Today there is no radiation column. [code]
  Evidence: `SS/src/migrations/1752492955913-add_new_columns_in_weather_station.ts:9-15`.
- `weather_station_sensor_summary` holds the latest reading time per (project, station). It is written only for live (not buffered) readings. [code]
  Evidence: `SS/src/migrations/1755980126868-create_weather_station_sensor_summary_table.ts:12-22` (PK project_id + serial_no); `SS/src/services/weather-station-sensor-service.ts:112-114`.
- `project_configuration` holds one row per project with the offline threshold. The default is 10 minutes. [code]
  Evidence: `SS/src/migrations/1742869817305-create_project_configuration_table.ts:19-30`; `SS/src/configs/constants.ts:37` (`WEATHER_STATION_OFFLINE_THRESHOLD: 10`).
- The serial number of a reading is the mesh source address written as text. The reading time is the gateway receive time minus the travel time. [code]
  Evidence: `SS/src/services/weather-station-sensor-service.ts:90` and `:94`.
- The project of a reading comes from the registered gateway node, looked up by gateway serial and network. [code]
  Evidence: `SS/src/services/weather-station-sensor-service.ts:252-253`.
- Raw values are decoded from a TLV block (tag 0x01, 32 bytes, 16 big-endian fields). The value 0x7FFF means "sensor not connected" and is stored as NULL. [code]
  Evidence: `SS/src/services/weather-station-sensor-service.ts:184-196`.
- The sensors DB has 9 hypertables and 30 migrations. [code]
  Evidence: `grep -l 'create_hypertable' SS/src/migrations/*.ts | wc -l` returns 9; `ls SS/src/migrations | grep -v index.ts | wc -l` returns 30.
- The CE backend cannot write to it. [code]
  Evidence: `BE.Infra/Database/SensorsDbContext.cs:18-26` (both `SaveChanges` overrides throw "This context is read-only").
- Ten backend services read this DB: observation evaluation, station readings window, recent readings, service health, dashboard, historical dashboard, policy impact, report, report summary, station status. [code]
  Evidence: `grep -rn 'sensorsDbContext\|SensorsDbContext' BE.Core --include=*.cs` lists those files.

### 2.3 Node registry (device identity)

- `node` is the device registry. Key columns: `id` (int), `network_id`, `project_id` (uuid), `serial_no`, `local_id`, `node_type`, `tenant_id`, `company_id`. [code]
  Evidence: `NS/src/models/node-model.ts:7-46`.
- `node_meta` holds space, coordinates (Point, SRID 4326), approval and a JSON configs column. A GIST index covers the coordinates. [code]
  Evidence: `NS/src/models/node-meta-model.ts:6-25`; `NS/src/migrations/1769100000000-extend_node_meta_unified.ts:12-35`.
- The view `v_node_with_meta` joins `node` and `node_meta`. Other services import it as a foreign table. [code]
  Evidence: `NS/src/migrations/1769300000000-rename_view_to_v_node_with_meta_and_drop_old_views.ts:11-23`; `SS/src/models/v-node-with-meta-model.ts:4`.
- There are 14 node types, including `weather_station`, `lightning_sensor`, `heatstress_bracelet`, `gps_tracker`, `asset`, `gateway`. There is no gas node type. [code]
  Evidence: `NS/src/utilities/enums.ts:1-16`.
- A node-sync job registers weather stations that reported in the last day. It is called as `POST /api/weather-station/node-sync`. A station is registered only when a gateway node in the same project matches. A station whose gateway does not match is skipped with a warning. [code]
  Evidence: `SS/README.md:327`; `SS/src/controllers/weather-station-controller.ts:17`; `SS/src/services/weather-station-sensor-service.ts:275-285` (last-day query), `:411-417` (gateway match) and `:433-434` (skip warning).
- Station location and space are set through node-service. A station needs `spaceId` and `coordinates` when `isApproved` is true. [code]
  Evidence: `NS/src/dtos/weather-station-dtos.ts:55-83`.
- Counts on 2026-07-28: 4 registered `weather_station` nodes, 3,845 `gps_tracker`, 94,621 `asset`, 139,995 devices in total. [stat]
  Evidence: `KB/00-platform/device-model.md:22,31,34,41` (internal doc, measured 2026-07-28, file modified 2026-08-02).

### 2.4 Observation Manager DB

- The main table is `Observation` with a discriminator column. There are 9 observation kinds: AVL, CCTV, ClinicViolation, Manual, SafetyEvent, TrainingCenter, WeatherStation, ZoneViolation, and the permit kind DWPZoneDrift. [code]
  Evidence: `grep 'HasDiscriminator().HasValue' OM.SNAP` lists 13 discriminators, 9 of them observation kinds.
- Common columns: `ExternalId`, `ProjectId`, `Source`, `Status`, `Type`, `GeneratedAt`, `ReceivedAt`, `Severity`, `CompanyId`, `PackageId`, `IngestionId`, `Location` (Point), `SpaceId`, `ZoneId`, `Extra` (JSON). [code]
  Evidence: `OM/Wakecap.Observation.Domain/Entity/Observations/BaseObservation.cs:19-68`.
- Weather observations add `IndicatorName`, `IndicatorValue`, `Threshold`, `GatewayId`, `SerialNo`, `DangerCategory`. Lightning observations are filed under the same weather source with type "Lightning". [code]
  Evidence: `OM/Wakecap.Observation.Domain/Entity/Observations/WeatherStationObservation.cs:13-25`; `BE.Core/Products/LightningSensor/Services/LightningObservationDispatch.cs:105-106`.
- A unique index on (ProjectId, ExternalId), filtered to weather observations, makes a replay harmless. It landed 2026-09-20. [code]
  Evidence: `OM.SNAP` lines 1094-1098 (`UX_Observation_WeatherStation_ProjectId_ExternalId`); migration `20260920135255_AddWeatherStationExternalIdUniqueIndex`.
- The OM model has 26 named tables. Ten are external entities read through foreign tables: Company, Device, ExpiryDuration, Package, People, Space, Trade, Training, TrainingSession, Zone. The two training ones were repointed to the training-center database on 2026-08-25. `UserCache` is an application cache. The other 15 are OM-owned. [code]
  Evidence: `grep -c 'b.ToTable("' OM.SNAP` returns 26; `OM/Wakecap.Observation.Domain/Entity/External/` holds the ten external classes; migration `20260825130000_RepointTrainingForeignTablesToTrainingCenter`; the 83 migrations are listed by `ls OM/Wakecap.Observation.Infrastructure/Database/Migrations`.
- Permit observations exist as a source called `DigitalWorkPermit` with six types: PermitZoneDrift, PermitIssuerZoneDrift, PermitWorkingHoursExceeded, PermitExpiredWhileActive, PermitMissingReceiver, PermitMissedDailySignoff. [code]
  Evidence: `OM/Wakecap.Observation.Domain/Constants/ObservationsHierarchy.cs:158-192`.
- Gas has no source or type in the Observation Manager. [code]
  Evidence: `ObservationsHierarchy.cs` has no gas class; `grep -rn 'gas' BE.Core/Products/WeatherStation/Observation` and `BE.Core/Products/GasDetector` find no observation sink; `RK/four-videos/_research/agent-and-control.md:28` ("Gas: NOT built").

### 2.5 Location, app DB, heat-stress, equipment, warehouse

- `asset_location` is a hypertable of worker and asset positions: `node_id`, `project_id`, `space_id`, `serial_no`, `location` (Point), `network_id`, `gateway_id`, `generated_at`, `is_buffered`. The chunk is 3 days. [code]
  Evidence: `LS/src/models/asset-model.ts:5-94`; `LS/src/migrations/1771925027860-change_asset_location_chunk_interval.ts:10`.
- `location_summary` keeps the latest position per (node, project). [code]
  Evidence: `LS/src/models/location-summary.ts:5-25`.
- The device-to-worker assignment is `ResourceDevice` (`ResourceId`, `DeviceId`, `AssignedAt`, `UnAssignedAt`) in the app DB. location-service joins it to `v_node_with_meta` on `n.id = rd."DeviceId"`. [code]
  Evidence: `LS/src/models/resource-device-model.ts:5-33`; `LS/src/services/asset-location-service.ts:440` and `:561`; `APP/Wakecap.App.Domain/Entity/Directory/ResourceDevice.cs:15-25`.
- The app DB has `People`, `Zone`, `Space` (both with polygon coordinates), `DeviceLocation`, `DeviceLocationLatest`, `WorkPermit`, `WorkArea` and `NovadeWorkPermit`. [code]
  Evidence: `APP/Wakecap.App.Domain/Entity/MapManagement/Zone.cs`, `Space.cs`; `APP/Wakecap.App.Domain/Entity/DigitalPermit/WorkPermit.cs:22-46`, `NovadeWorkPermit.cs:9-28`; `APP/Wakecap.App.Domain/Entity/Directory/DeviceLocation.cs:17-35`.
- `People` carries names, address and mobile number. A pool must use a pseudonymous worker key, not this table. [code]
  Evidence: `APP/Wakecap.App.Domain/Entity/Directory/People.cs:29-50`.
- worker-gear stores bracelet readings in `Heatstress`: project, serial number, generated time, ambient temperature, a heat stress index, two trigger flags, battery. Its `DeviceAssignment` links worker to device with an assignment interval. [code]
  Evidence: `WG/Wakecap.WorkerGear.Domain/Entity/Heatstress/Heatstress.cs:7-45`; `WG/Wakecap.WorkerGear.Domain/Entity/DeviceAssignment/DeviceAssignment.cs:8-14`.
- Equipment lives in `wakecap_equipments` (121 tables, Traccar tables inside). The repo is not checked out here. [stat]
  Evidence: `KB/10-services/wakecap-equipments/overview.md` ("At a glance", internal doc 2026-07-27); `ls /Users/admin/wc` shows no equipment repo.
- The warehouse `wakecapdw` holds worker readings from 2019-06-03 (363 weekly partitions). It also takes `weather_station_sensor` and OM `Observation` by ADF pipeline. [stat]
  Evidence: `KB/20-data/warehouse-and-analytics.md:107` (weather landing table), `:120-121` (partitions), internal doc 2026-07-28. Not verified live.

---

## 3. (a) Entity families: what is stored today

Legend: Stored = yes, partial or no. Retention = what the code or a doc says.

| # | Family | Tables and stores | Stored today? | Granularity | Retention | Product | Status |
|---|---|---|---|---|---|---|---|
| 1a | Observations and time series: weather | sensors DB `weather_station_sensor`, `weather_station_sensor_summary` | Yes, outside the CE DB | One row per station message, 16 channels. Best station cadence 1.2 min (doc) | No policy in code. No retention job, 0 of 62 chunks compressed (doc 2026-08-10) | Weather Station | live |
| 1b | Observations and time series: gas | `gas_reading`, `gas_device`, `gas_sync_state` | Yes | One gas, one value, one device instant. Vendor uploads about every 30 min. Poll every 45 s | No delete code | Gas | live |
| 1c | Observations and time series: lightning | `lightning_sensor_event`, `lightning_sensor_state_interval`, `lightning_sensor_state_current` | Yes | A row per unique packet (default heartbeat 60 s). An interval per state change. One current row per device | Kept indefinitely. No delete code | Lightning | live (state, intervals), code (events) |
| 2 | Device registry | node-service `node`, `node_meta` (owner). CE: `lightning_sensor_settings`, `gas_device`, `gas_zone`, `StationName`. Sensors: `weather_station_sensor_summary`, `project_configuration` | Partly. CE has no weather device table. Gas devices have no platform id | One row per device or per (project, node) | None deleted | All | code |
| 3 | Policies and versions | `ProjectThreshold`, `ProjectHeatIndexBand`, `HeatIndexStatus`, `ProjectSettings`, `gas_threshold_profile`, `lightning_sensor_settings`, `project_product`, `Indicator`, `Graph`, `Report` | Yes, current state only. Versions only through `xmin` and the audit log | One row per project (thresholds, settings, product flags). N bands per project | Current row overwritten. History in audit log | All | live (weather policy), code (rest) |
| 4 | Alerts and acknowledgements | `gas_alert`; `observer_finding`, `observer_finding_event`, `observer_finding_evidence`; `ChangeRequest` | Yes for gas, observer, proposals. No for lightning | One alert, one finding, one proposal | Observer evidence keeps the newest 200 per finding. Proposals expire after 24 h (status change, row stays) | Gas, Weather | live (gas), code (rest) |
| 5 | Verdicts and reasons | `weather_observation`; lightning `effective_state` columns; `gas_alert` platform rows | Partly. Episodes only | One row per danger episode start and one per end | None deleted | Weather, Lightning, Gas | code |
| 6 | Audit and change history | `SafetyConfigAuditLog`, `ChangeRequest`, `observer_finding_event`, `gas_push_audit`, raw payload columns | Yes, for weather policy. Lightning settings and gas zones are not audited | One row per write attempt | Append-only. The app role has INSERT only | Weather mainly | code |
| 7 | Dashboard layouts | `UserProjectDashboardLayout` | Yes | One row per (project, user) | None. Not audited by decision | Weather | stat (34 users, doc 2026-08-10) |
| 8 | Outbox and cursors | `weather_observation`, `weather_observation_cursor`, `lightning_observation`; cursors `gas_sync_state`, `observer_checkpoint` | Yes for weather and lightning. No outbox for gas | One row per episode or per state entry | Sent rows are never deleted. A row goes dead after 8 attempts | Weather, Lightning | code |

### 3.1 Observations and time series (detail)

- Weather readings are the largest store that has a measured size: 1,496,265 readings, 643 MB in 62 chunks, 451 bytes per reading including indexes, on 2026-08-10. Sizes for gas and lightning rows are not known. [stat]
  Evidence: `RC/2026-08-10-weather-station-running-cost.html:663` (readings), `:670` (643 MB, 62 chunks, 0 compressed), `:671` (451 B). Internal doc, 2026-08-10.
- First production weather reading: 2025-05-01. 466 days live on 2026-08-10. [stat]
  Evidence: `RC/2026-08-10-weather-station-running-cost.html:568-569`. Arithmetic check: `python3 -c "import datetime;print((datetime.date(2026,8,10)-datetime.date(2025,5,1)).days)"` prints 466.
- Ingest rate was 6,095 readings a day, about 183,000 a month. Peak month 2026-06 with 195,287. June 2025 has zero readings. [stat]
  Evidence: `RC/2026-08-10-weather-station-running-cost.html:668` (rate), `:707` (peak and the June 2025 gap). Internal doc, 2026-08-10.
- 19 stations were ever seen. 13 reported in the last 30 days. Only 5 report at a 5-minute cadence or better. Best cadence is 1.2 minutes. [stat]
  Evidence: `RC/2026-08-10-weather-station-running-cost.html:664-666,669`. Internal doc, 2026-08-10.
- Only 8 of 44 configured projects ever produced a reading. [stat]
  Evidence: `RC/2026-08-10-weather-station-running-cost.html:667,898`. Internal doc, 2026-08-10.
- Weather data is kept. IoT telemetry in other hypertables is trimmed to about one month, but `weather_station_sensor` is on the "kept" list with its earliest chunk on 2025-05-01. [stat]
  Evidence: `KB/20-data/hypertable-usage.md:47-48` (rule) and `:83` (weather row). Internal doc, 2026-08-02. What trims the other tables is "undetermined" in the same doc.
- Gas: `gas_reading` stores one sensor block: one gas, one value, one instant (the instant the device took it, in UTC). The unique index `(GasDeviceId, GasType, ReadingAtUtc)` stops a repeated poll from storing the same block twice. [code]
  Evidence: `BE.Domain/Products/GasDetector/Entity/GasReading.cs:5-13,44`; `SNAP:246-248`.
- Gas types stored: H2S, CO, CO2, O2, LEL. A gas the vendor reports that has no mapping is stored under the vendor's upper-cased name and raises no alarm. [code]
  Evidence: `BE.Domain/Products/GasDetector/Constants/GasTypes.cs:8-14`; `GasReading.cs:21-28`.
- Gas poll: every 45 s by default (never below 10 s). The vendor uploads about every 30 minutes on the EU account, so almost every poll re-reads a stored block. [code]
  Evidence: `BE.Core/Products/GasDetector/Configuration/GasPollingOptions.cs` on master lines 75 (45 s), 68 (30 minutes, TAN-2850), 24 (floor 10 s).
- A gas device is marked offline after 5,400 s of silence. A reading is flagged stale after 3,600 s. [code]
  Evidence: `GasPollingOptions.cs` on master lines 92 and 101.
- Gas data covers one project only. "One account, one project." A built-in testing project is used when none is configured. [code]
  Evidence: `GasPollingOptions.cs` on master lines 33 and 39-43.
- Lightning packets: `lightning_sensor_event` stores every unique packet with its raw JSON. The unique key is `(SourceAddress, RxTimeMsEpoch, EventId)`. [code]
  Evidence: `BE.Domain/Products/LightningSensor/Entity/LightningSensorEvent.cs:6-55`; `SNAP:534-536`; `BE.Core/Products/LightningSensor/Services/LightningStateAdvancement.cs:75-100`.
- Lightning intervals: a heartbeat that repeats the open state writes nothing. A state change closes one interval and opens the next. A silent device gets a `stale_sweep` interval. [code]
  Evidence: `BE.Core/Products/LightningSensor/Services/LightningStateAdvancement.cs:48-60`; `BE.Domain/Products/LightningSensor/Entity/LightningSensorStateInterval.cs:15-25`.
- Lightning has 7 states: Unknown 0, Green 1, Yellow 2, Orange 3, Red 4, Fault 5, Offline 6. [code]
  Evidence: `BE.Domain/Products/LightningSensor/Constants/LightningState.cs:13-21`.
- The default heartbeat is 60 s. That is 525,600 packets per device per year if every heartbeat is stored. [code]
  Evidence: `BE.Domain/Products/LightningSensor/Entity/LightningSensorSettings.cs:24`; `BE/GAPS2.md:46` ("about 525k rows per device per year"). Arithmetic: `python3 -c "print(60*24*365)"` prints 525600.
- Lightning retention: nothing deletes a lightning row. I re-ran the search on master on 2026-10-05. [code]
  Evidence: `grep -rnE 'ExecuteDelete|RemoveRange|DELETE FROM|drop_chunks' BE.Core BE.Infra BE.Domain` finds only observer evidence prune, heat-index band replace and band delete. `BE/GAPS2.md:46` says the same.
- Station display names: one row per (project, node id). A row exists only when someone named the station. [code]
  Evidence: `BE.Domain/Products/WeatherStation/Entity/StationName.cs:5-16`; `SNAP:1185-1186`.

### 3.2 Device registry (detail)

- Lightning devices: `lightning_sensor_settings` is the registry. `SourceAddress` is unique across all projects. A device keeps its `DeviceId` when re-bound to another project. [code]
  Evidence: `BE.Domain/Products/LightningSensor/Entity/LightningSensorSettings.cs:6-14`; `SNAP:609-611`; `BE/GAPS2.md:54`.
- The node-service registry is copied in once an hour. [code]
  Evidence: `BE.Core/Products/LightningSensor/Hosting/LightningDeviceSyncBackgroundService.cs:24`; `BE.Infra/RestServices/Nodes/INodeService.cs:11-17` (read-only `GET /nodes`).
- The registry row stores `SourceAddress` (the node serial as a number) and `ProjectId`. It does not store the node `id` or the `network_id`. [code]
  Evidence: `BE.Domain/.../LightningSensorSettings.cs:41-46`; `BE.Contracts/Products/LightningSensor/DTO/LightningNodeDto.cs` (node fields that arrive).
- Lightning sensor location (`Latitude`, `Longitude`) is set by hand by an admin. It is marked TEMPORARY until node-service owns the point. Both are set or neither. [code]
  Evidence: `LightningSensorSettings.cs:63-72`; `SNAP:617` (`CK_lightning_sensor_settings_LocationPaired`). The UI says "Set manually until Management Maps supports lightning sensor locations": `RK/four-videos/_research/refresh-1.0.7.md:9`.
- Gas devices: `gas_device` has Blackline's own id, a model, a battery percent, an online flag, a last-seen time and an optional zone. The wearer is a vendor free-text name. [code]
  Evidence: `BE.Domain/Products/GasDetector/Entity/GasDevice.cs:19,22,26-43`.
- The link from a gas device to a platform device was removed on 2026-09-28. The code calls it "unreachable". Gas devices now have no platform identity. [code]
  Evidence: `BE.Infra/Migrations/20260928144148_remove-gas-device-mapping.cs:14-16`; `git -C BE log -1 --format='%h %ad %s' a65c4dc` prints "TAN-2592: key gas_reading/gas_alert on gas_device.Id, drop the unreachable device mapping (#381)", 2026-09-28.
- `gas_zone` has no writer. No code creates a zone. A device can be assigned only to a zone that already exists. [code]
  Evidence: `BE.Core/Products/GasDetector/Services/GasDeviceZoneService.cs:57-71`; `ZonesController.cs` has only `[HttpGet]`; `grep -rn 'Set<GasZone>' BE.Core` finds reads only. The Zones tab is hidden in the UI: `RK/four-videos/_research/changes.md` ("v1.0.5: Zones tab and all zone labels hidden").
- A gas zone is a name and a risk level. It has no geometry and no link to the platform zone. [code]
  Evidence: `BE.Domain/Products/GasDetector/Entity/GasZone.cs:13-29`.
- Live: 5 gas detectors registered on one live project, 4 online, 1 offline, on 2026-10-04 16:48. [live]
  Evidence: `RK/four-videos/gas/captures/g-dashboard-c.txt` ("Detectors 5 Registered on this project Online 4 1 offline").
- Live: the weather project in the notes showed 3 stations, 1 offline. [live]
  Evidence: `RK/internal-notes.md:32`.

### 3.3 Policies and versions (detail)

- `ProjectThreshold` has one row per project (unique). It holds 10 limits: air humidity, barometric pressure, CO2, dust, H2S, PM10, rainfall, TSP, temperature, wind speed. There is no limit for CO, SO2, wind direction or cumulative rain. [code]
  Evidence: `SNAP:1062-1123` (properties at 1070-1115, unique index `UX_ProjectThreshold_ProjectId` at 1119-1121).
- `ProjectHeatIndexBand` holds the per-project heat-index bands: start, end, work minutes, rest minutes, water amount, water frequency, a no-work flag, colour, sort order. The unique key is `(ProjectId, SortOrder)`. [code]
  Evidence: `SNAP:943-1008`.
- `HeatIndexStatus` is the global default set of 5 bands. Four reseed migrations changed its values. [code]
  Evidence: `BE.Infra/InfrastructureServiceRegistry.cs:519-566` (seed); migrations `20260601235848`, `20260608093328`, `20260720110222`, `20260809083000`.
- `ProjectSettings` has one row per project: unit, heat-index calculation mode (1 = AAT with wind, 2 = AAT without wind, 3 = NOAA), and a JSON list of per-indicator online switches. [code]
  Evidence: `SNAP:1011-1059`; `BE/WEATHER_STATION.md:165`.
- `gas_threshold_profile` holds the org default per gas (project id null) and optional project overrides. The default has 5 rows. It has no writer except the startup seed. [code]
  Evidence: `SNAP:291-340`; `BE.Infra/InfrastructureServiceRegistry.cs:570-640` (seed); `ThresholdsController.cs` has only `[HttpGet]`.
- Seeded gas limits (low, high, TWA, STEL): H2S 5, 10, 10, 15 ppm. CO 25, 50, 25, 200 ppm. CO2 5000, 30000 ppm. O2 19.5, 23.5 %VOL. LEL 10, 20 %LEL. [code]
  Evidence: `BE.Infra/InfrastructureServiceRegistry.cs:590-640`. The same H2S, LEL and O2 limits appear on the live compliance page: `RK/four-videos/gas/captures/g-compliance-c.txt`.
- `project_product` has one row per project with three flags: weather, gas, lightning. A project with no row has every flag false. [code]
  Evidence: `BE.Domain/Shared/Entity/ProjectProduct.cs:5-22`; `SNAP:1608-1648`.
- Product entitlement is stored by the backend but enforced by the front end. No backend product route, poll or ingest path reads the three flags. [code]
  Evidence: `grep -rnE 'WeatherStationActive|GasDetectorActive|LightningSensorActive' BE.Core BE.Api BE.Infra --include=*.cs` finds only the product service, `BE.Api/Shared/Controllers/ProjectProductController.cs:26` and migrations. Same finding in `RK/four-videos/_research/integration-and-devices.md:15`.
- The startup seed runs the sync seeders: 14 indicators, 11 graphs, 5 heat-index bands, 5 gas profiles and one "Weather Report" definition. The async seeders in the same file are not hooked. [code]
  Evidence: `BE.Infra/InfrastructureServiceRegistry.cs:74-80` (`UseSeeding`), `:642-776` (sync indicators, 14), `:388-500` (graphs, 11), `:777-830` (report). `grep -n UseAsyncSeeding` finds nothing.
- Versioning model: there is no policy version table. A policy "version" is the id of an audit log row. The outbox stores that id as `policy_ref`. [code]
  Evidence: `BE.Domain/Products/WeatherStation/Entity/WeatherObservation.cs:52-57`; `BE.Core/Products/WeatherStation/SafetyPolicy/ObservationEvaluation.cs:148-168` (`PolicyOf` takes the newest applied or provisioned audit row).
- Change request lifecycle: pending, approved, applied, failed, stale, rejected, expired. A proposal lives 24 hours. [code]
  Evidence: `BE.Domain/Shared/Entity/ChangeRequest.cs:15-26`; `BE.Core/Products/WeatherStation/Services/ChangeProposalService.cs:67`.

### 3.4 Alerts and acknowledgements (detail)

- `gas_alert` is one table for two origins: `vendor` (Blackline raised it: SOS, fall, tipped over) and `platform` (WakeCap raised it when a reading crossed the High limit). [code]
  Evidence: `BE.Domain/Products/GasDetector/Entity/GasAlert.cs:5-12,58-80`.
- Status is active, acknowledged or resolved. Acknowledge and resolve store who (token subject) and when. [code]
  Evidence: `GasAlert.cs:41-53`; `BE.Api/Products/GasDetector/Controllers/AlertsController.cs` (`[HttpPost("{id:guid}/acknowledge")]`, `[HttpPost("{id:guid}/resolve")]`).
- The tripping value is stored on the platform alert row (`Reading`). [code]
  Evidence: `GasAlert.cs:37-38`; `BE.Core/Products/GasDetector/Services/GasPollSweepRunner.cs:643`; `BE.Contracts/Products/GasDetector/DTO/GasAlertDto.cs:42-43` (`reading` is served).
- Acknowledge and close are recorded in WakeCap only. They are not sent to Blackline. The screen says so. [live]
  Evidence: `RK/four-videos/gas/captures/g-alerts-c.txt` ("It is not sent to Blackline: an alert closed here stays open in Blackline Live"); `FE/src/app/features/Gas/contracts/apiUrls.ts` (comment on `acknowledgeGasAlert`).
- Live gas alerts on 2026-10-04: 16 rows, 12 acknowledged and 4 closed. Every row is an SOS or "Detector tipped over" alert from one detector. None is a gas-limit crossing. The oldest row is dated 2026-10-03 05:33 (the portal shows Saudi time). [live]
  Evidence: `RK/four-videos/gas/captures/g-alerts-c.txt` (counted with `grep -o -E 'SOS|Detector tipped over' ... | sort | uniq -c`: SOS 14, tipped over 2); `RK/four-videos/_research/refresh-1.0.7.md:17-19`.
- The sweep is the only writer of platform gas alerts. One exposure is one alert, not one per poll. [code]
  Evidence: `BE.Core/Products/GasDetector/Services/GasPollSweepRunner.cs:18-24,514`.
- Lightning has no alert table and no acknowledgement. The notification table was dropped on 2026-09-24. The HSE report states it cannot say when anyone was told or when work stopped. [code]
  Evidence: `BE.Infra/Migrations/20260924120232_drop-lightning-notifications.cs:14-15`; `BE/GAPS2.md:51` (decision G6, "Not decided, and nothing built behind it"); `RK/four-videos/_research/agent-and-control.md:28`.
- Observer findings: kind (dark, stuck, trending, other), status (open, acknowledged, snoozed, resolved), a drafted recommendation, first seen, last evidence time, evidence count. One non-resolved finding per (project, station, kind). [code]
  Evidence: `BE.Domain/Products/WeatherStation/Observer/ObserverFinding.cs:20-81`; `ObserverSchema.cs:59-103`; `SNAP:1443-1446`.
- Observer evidence is capped at 200 rows per finding, 8 KB per sample. The agent cannot acknowledge, snooze or resolve. A human can, through one controller and one scope. [code]
  Evidence: `BE.Core/Products/WeatherStation/Observer/ObserverLimits.cs:30,36`; `ObserverFinding.cs:3-19`.
- Observer: the kind "trending" means "a reading moving toward a limit". It is a label an agent writes. No trend model exists behind it. [code]
  Evidence: `ObserverSchema.cs:67-68`; section 6, item B1.
- No observer or agent data was seen live. [gap]
  Evidence: `RK/four-videos/_research/agent-and-control.md` (section "Live on 2026-10-04": "Not evidenced: any connected agent, ... observation delivery working").

### 3.5 Verdicts and reasons (detail)

- `weather_observation` keeps the verdict episodes. One row when a danger period starts (`entered`, verdict `Danger`) and one when it ends (`cleared`, verdict `Normal`). A stream that never breaches writes nothing. [code]
  Evidence: `BE.Core/Products/WeatherStation/SafetyPolicy/EpisodeFolder.cs:105-113,214-226`.
- Each row carries: source, project, station serial, indicator, reading value, reading time, policy kind, limit or band, verdict, transition, policy ref, episode key, external id, ingestion id, and the delivery state (sent, attempts, next attempt, last error, dead). [code]
  Evidence: `BE.Domain/Products/WeatherStation/Entity/WeatherObservation.cs:13-93`; `SNAP:1191-1306`.
- Policy kinds: `threshold`, `heat_index_band`, and two approved agent kinds `agent_safety_unknown`, `agent_stuck_sensor`. Transitions: `entered`, `cleared`, `reported`. [code]
  Evidence: `WeatherObservation.cs:104-143`.
- The evaluator watches 10 indicators plus a computed heat index: temperature, wind speed (km/h), PM2.5, rainfall, pressure, humidity, PM10, CO2, TSP, H2S. CO, SO2 and wind direction are stored in the sensors DB but have no limit, so they can never produce a verdict. [code]
  Evidence: `BE.Core/Products/WeatherStation/SafetyPolicy/ObservationEvaluation.cs:224-235` (`Values`), `:211-221` (heat index); `SNAP:1070-1115` (10 limit columns).
- The row key is `project | station serial | indicator | start time`. The unique index on `episode_key` is the idempotency. [code]
  Evidence: `EpisodeFolder.cs:39-52`; `SNAP:1298-1300`.
- Time on a row is the reading time, never the time the sweep ran. [code]
  Evidence: `WeatherObservation.cs:33-38`; `EpisodeFolder.cs:9-14`.
- When a new policy is published, open episodes are closed with a "policy changed" reason and re-judged under the new policy. [code]
  Evidence: `WeatherObservation.cs:195-203`; `EpisodeFolder.cs:296-310`.
- Before this table existed, the old sweep re-derived a verdict every tick, sent it inline and stored nothing in the CE database. That sweep is gone: `GET api/Observation/Process` answers 410. [code]
  Evidence: `WeatherObservation.cs:3-11`; `BE.Api/Products/WeatherStation/Controllers/ObservationController.cs:11-23`; commit `3da8e45` (2026-09-24) "TAN-2720: remove the inline observation sweep".
- Lightning verdict: stored as `EffectiveState`, a label, `IsSafe`, `OverrideReason`, health, contact bits, data age and stale flags on `lightning_sensor_state_current`. Only Green is safe. [code]
  Evidence: `BE.Domain/Products/LightningSensor/Entity/LightningSensorStateCurrent.cs:10-58`.
- Gas SAFE, CHECK and ALERT are computed in the front end from readings. They are not stored. [code]
  Evidence: `FE/src/app/features/Gas/hooks/useGasSiteState.ts:7-9,49-67` (the hook derives `state` and downgrades `safe` to `check`); `BE.Contracts/Products/GasDetector/DTO/GasSummaryDto.cs` has no state field; `RK/four-videos/_research/integration-and-devices.md:26`.

### 3.6 Audit and change history (detail)

- `SafetyConfigAuditLog` is append-only. The application role has INSERT only. A config write cannot commit unless its audit row commits in the same transaction. [code]
  Evidence: `BE.Domain/Shared/Entity/SafetyConfigAuditLog.cs:3-10`.
- Columns: resource type, project, resource id, event type, actor subject, actor client id, expected and actual version, change request id, reason, time, correlation id, before state (JSON), after state (JSON). [code]
  Evidence: `SafetyConfigAuditLog.cs:36-133`; `SNAP:1651-1722`.
- Event types: applied, conflict, rejected, failed, provisioned, pending, approved, expired. The column has no CHECK constraint. [code]
  Evidence: `SafetyConfigAuditLog.cs:11-21`.
- Only the actor subject and client id are stored. Names are resolved at read time through the organisation directory and cached for 5 minutes. [code]
  Evidence: `BE.Infra/ActorIdentity/OrganizationActorDirectory.cs:48` (`SnapshotTtl` 5 minutes); `SafetyConfigAuditLog.cs:60-66`.
- Audited categories: thresholds, project settings, indicator online status, heat-index bands. Excluded by decision: dashboard layout. Not applicable: report settings. [code]
  Evidence: `BE.Domain/Shared/Entity/ChangeAuditCoverage.cs:140-196`.
- Not audited at all: lightning device settings (heartbeat, name, project binding), gas zone assignment, station rename. The heartbeat changes a safety verdict and nothing records who changed it. [code]
  Evidence: `ChangeAuditCoverage.cs:243-256` and `:284`; `RK/four-videos/_research/agent-and-control.md` ("One audit trail: refuted").
- Creation auditing began 2026-08-19 12:58:36 UTC. Older projects have no creation row. [code]
  Evidence: `ChangeAuditCoverage.cs:62-63`.
- Before and after snapshots exist only on some paths. The rows written by the change-request store carry neither. [code]
  Evidence: `SafetyConfigAuditLog.cs:105-133`; `BE.Domain/Shared/Entity/SnapshotDiffOutcome.cs:6-20` (the value `not-recorded`).
- `gas_push_audit` stores the raw bytes of every Blackline push that was acknowledged, plus the MD5 and a parse error. The push endpoint only acknowledges receipt. It is anonymous. [code]
  Evidence: `BE.Domain/Products/GasDetector/Entity/GasPushAuditRecord.cs:5-35`; `BE.Api/Products/GasDetector/Controllers/GasPushController.cs:41` (`[AllowAnonymous]`); `RK/four-videos/_research/integration-and-devices.md:10`.
- Raw vendor payloads are kept as JSON on `gas_alert.RawPayload` and `lightning_sensor_event.RawPayload`. [code]
  Evidence: `SNAP:61-62` and `SNAP:502-503`.
- The Change history tab was live and empty on the project captured. [live]
  Evidence: `RK/internal-notes.md:19` (TAN-2186 row: "yes (empty)").

### 3.7 Dashboard layouts (detail)

- One row per (project, user). It stores three JSON lists: featured indicator keys, full-list order, and dismissed agent recommendations. [code]
  Evidence: `BE.Domain/Shared/Entity/UserProjectDashboardLayout.cs:5-26`; `SNAP:1725-1766`.
- It is not audited, by decision: it is one person's view, not policy. [code]
  Evidence: `ChangeAuditCoverage.cs:65-79`.
- 34 users had saved layouts on 2026-08-10. The cost doc uses this as a proxy for active users. [stat]
  Evidence: `RC/2026-08-10-weather-station-running-cost.html:675`. Internal doc, 2026-08-10.
- A layout stores no reading and no verdict. The dashboard composition (promoted cards, dynamic charts) is computed on request and not stored. [code]
  Evidence: `BE/README.md:459-463` (composition fields are response fields); `UserProjectDashboardLayout.cs:5-10` ("Agent recommendations never overwrite this row").

### 3.8 Outbox and cursors (detail)

- Weather outbox: evaluator tick every 30 s. First run looks back 5 minutes. Up to 2,000 readings per project per tick. A cursor per project advances only after the rows commit. [code]
  Evidence: `BE.Core/Products/WeatherStation/SafetyPolicy/ObservationEvaluation.cs:37-49`; `BE.Domain/Products/WeatherStation/Entity/WeatherObservationCursor.cs:3-17`.
- Weather dispatcher: tick every 10 s, batch 100, 8 attempts, first backoff 30 s, capped at 3,600 s. A row that fails permanently, or after 8 attempts, gets `dead_at` and is never claimed again. [code]
  Evidence: `BE.Core/Products/WeatherStation/Observation/ObservationDispatch.cs:72-83`; `BE.Core/Shared/Outbox/OutboxRetry.cs:41-94`.
- The claim uses `FOR UPDATE SKIP LOCKED`, so two pods never send one row. [code]
  Evidence: `ObservationDispatch.cs:102-105` (doc comment).
- The payload sent is source "WeatherStation", type = the indicator, `ExternalId` = the episode key, plus indicator, value, limit or band, serial, time, verdict. The gateway field is sent empty. [code]
  Evidence: `BE.Core/Products/WeatherStation/Observation/ObservationManagerSink.cs:50-86`.
- The client to the Observation Manager has one method: `POST /api/ingest`. The CE backend never reads the Observation Manager back. [code]
  Evidence: `BE.Infra/RestServices/Admin/IObservationService.cs:8-12`; `ExternalRestPaths.cs:47-49`.
- Lightning outbox: written in the same save as the state change, only for Red, Fault and Offline. Dispatcher tick 5 s, batch 50, 8 attempts, backoff 10 s capped at 600 s. [code]
  Evidence: `BE.Core/Products/LightningSensor/Services/LightningObservationRecorder.cs:30-31`; `LightningObservationDispatch.cs:45-49`; `LightningIngestService.cs:86-98`.
- Gas has no outbox and no Observation Manager delivery. `ObservationSource.Gas` is defined and has no writer. [code]
  Evidence: `BE.Domain/Products/WeatherStation/Entity/WeatherObservation.cs:96-101`; `grep -rn 'ObservationSource.Gas' BE --include=*.cs` finds only the definition.
- Observation delivery is not evidenced live. [gap]
  Evidence: `RK/four-videos/_research/agent-and-control.md` ("Not evidenced: ... observation delivery working").
- Cursors: `gas_sync_state` (one per project, poll watermark and error count), `observer_checkpoint` (one per project and observer, compare-and-swap version). The observer cursor is kept apart from the evaluator cursor on purpose. [code]
  Evidence: `BE.Domain/Products/GasDetector/Entity/GasSyncState.cs:5-28`; `ObserverCheckpoint.cs:3-49`; `ObserverSchema.cs:3-19`.

### 3.9 Tables with no writer or no reader

- `CalculatedStatistics` is created by the first migration and referenced by no code except its own configuration. It looks vestigial. [code]
  Evidence: `grep -rn 'CalculatedStatistics' BE --include=*.cs` (excluding Migrations and tests) returns only the entity and its configuration.
- `gas_zone` has no writer. `gas_threshold_profile` is seed only. `Report` is seed only and read by `ReportService`. [code]
  Evidence: see 3.2 and 3.3; `BE.Core/Products/WeatherStation/Services/ReportService.cs:52,63`.

### 3.10 All 31 tables

| Table | Product | Key and uniques | Grain | Written by | SNAP line |
|---|---|---|---|---|---|
| gas_alert | Gas | PK Id; FK GasDeviceId to gas_device (cascade); unique VendorAlertId (partial) | one alert | gas poll sweep, ack and resolve endpoints | 26 |
| gas_device | Gas | PK Id; FK ZoneId to gas_zone (set null); unique (ProjectId, VendorDeviceId) | one Blackline device | gas poll sweep, zone assign | 108 |
| gas_push_audit | Gas | PK Id; unique PayloadMd5 | one acknowledged push body | push endpoint | 166 |
| gas_reading | Gas | PK Id; FK GasDeviceId (cascade); unique (GasDeviceId, GasType, ReadingAtUtc) | one gas at one instant | gas poll sweep | 204 |
| gas_sync_state | Gas | PK Id; unique ProjectId | one poll cursor per project | gas poll sweep | 253 |
| gas_threshold_profile | Gas | PK Id; unique (ProjectId, GasType); unique GasType where ProjectId is null | org default or project override | startup seed | 291 |
| gas_zone | Gas | PK Id; unique (ProjectId, Name) | one named zone | nobody in code | 343 |
| lightning_observation | Lightning | PK Id; unique ExternalId | one state entry to send | ingest service, dispatcher | 380 |
| lightning_sensor_event | Lightning | PK Id; unique (SourceAddress, RxTimeMsEpoch, EventId) | one packet | queue consumer | 469 |
| lightning_sensor_settings | Lightning | PK Id; unique DeviceId; unique SourceAddress; 3 check constraints | one device (registry) | provisioning PUT, hourly sync | 541 |
| lightning_sensor_state_current | Lightning | PK Id; unique DeviceId; unique (ProjectId, SourceAddress) | one row per device | queue consumer, stale sweep | 623 |
| lightning_sensor_state_interval | Lightning | PK Id; unique open interval per DeviceId | one state span | queue consumer, stale sweep | 708 |
| CalculatedStatistics | Weather | PK Id (int) | none used | nobody | 763 |
| Graph | Weather | PK Id; FK IndicatorId to Indicator | one chart definition | startup seed | 796 |
| HeatIndexStatus | Weather | PK Id | global heat-index band | startup seed, reseed migrations | 849 |
| Indicator | Weather | PK Id | one indicator definition | startup seed | 898 |
| ProjectHeatIndexBand | Weather | PK Id; unique (ProjectId, SortOrder); xmin | one band of one project | band service, safety policy publish | 943 |
| ProjectSettings | Weather | PK Id; unique ProjectId; xmin | one row per project | settings service | 1011 |
| ProjectThreshold | Weather | PK Id; unique ProjectId; xmin | one row per project | threshold service | 1062 |
| Report | Weather | PK Id; owned JSON settings | one report definition | startup seed | 1126 |
| StationName | Weather | PK Id; unique (ProjectId, NodeId) | one name per station | rename endpoint | 1155 |
| weather_observation | Weather | PK Id; unique episode_key | one episode edge | evaluator, agent approval | 1191 |
| weather_observation_cursor | Weather | PK ProjectId | one cursor per project | evaluator | 1309 |
| observer_checkpoint | Weather | PK (ProjectId, ObserverKey) | one agent cursor | agent over MCP | 1328 |
| observer_finding | Weather | PK Id; unique open (ProjectId, StationKey, Kind) | one finding | agent draft, human review | 1364 |
| observer_finding_event | Weather | PK Id; FK FindingId (cascade) | one lifecycle step | agent, human review | 1454 |
| observer_finding_evidence | Weather | PK Id; FK FindingId (cascade) | one sample, newest 200 kept | agent | 1492 |
| ChangeRequest | Shared | PK Id; index (ProjectId, Status) | one proposal | proposal, approval services | 1529 |
| project_product | Shared | PK Id; unique ProjectId | one row per project | product service | 1608 |
| SafetyConfigAuditLog | Shared | PK Id (bigint); unique applied row per (ChangeRequestId, ProjectId) | one write attempt | every protected write | 1651 |
| UserProjectDashboardLayout | Shared | PK Id; unique (ProjectId, UserId) | one layout | layout endpoint | 1725 |

Evidence for the whole table: `SNAP` at the line shown in the last column (the line where the entity block starts). Writers come from the service reads in sections 3.1 to 3.8.

---

## 4. Growth of the bank (animation data)

Measured with `git show <sha>:<snapshot> | grep -c 'b.ToTable("'` in the BE repo. Read-only.

| Date | Commit | Tables in the model | What landed |
|---|---|---|---|
| 2026-07-26 | `2100dc4` | 10 | audit log migration |
| 2026-08-30 | `3dc572d` | 16 | lightning module (and change request, station name before it) |
| 2026-09-13 | `688b766` | 23 | gas detector, Blackline ingestion, gas readings API |
| 2026-09-14 | `e797731` | 25 | project products (and gas push audit) |
| 2026-09-20 | `248bed9` | 27 | weather observation outbox and cursor |
| 2026-09-24 | `63b7886` | 27 | lightning observation outbox replaces lightning notification; inline sweep removed |
| 2026-10-01 | `41b20bf` | 31 | observer control plane (4 tables) |
| 2026-10-04 | `352195f` | 31 | lightning sensor location columns |

- 10 tables to 31 tables in 70 days. [code]
  Evidence: the command above for each sha; `python3 -c "import datetime;print((datetime.date(2026,10,4)-datetime.date(2026,7,26)).days)"` prints 70. The KB also counted 10 tables on 2026-07-27: `KB/20-data/estate-map.md:82`.
- Other dates: BE first commit 2025-05-25 (`c4190a5`), 447 commits on master. First migration 2025-06-02. [code]
  Evidence: `git -C BE log master --reverse --format='%h %ad %s' --date=short | head -1`; `git -C BE rev-list --count master` prints 447.
- Each product's data entered master on a different day. Weather outbox 2026-09-20. Lightning 2026-08-30. Gas 2026-09-13. Observer 2026-10-01. Nothing here says when each was deployed. [code]
  Evidence: `git -C BE log master --diff-filter=A --format='%h %ad' --date=short -- <migration file>` for each migration.
- The Observation Manager has carried weather observation fields since 2025-07-13. [code]
  Evidence: `OM/Wakecap.Observation.Infrastructure/Database/Migrations/20250713221352_AddWeatherStationObservationFields.cs`.

---

## 5. Volumes, retention and cost (internal docs, dated)

All numbers in this section are internal docs. None was re-measured by me. No database access was used.

### 5.1 Running cost and cost to serve (internal doc, 2026-08-10)

Files: `RC/2026-08-10-weather-station-running-cost.html` and `RC/2026-08-10-weather-station-cost-to-serve.html`. The running-cost doc says its usage figures were queried read-only against the production cluster on 2026-08-10 (`:956`).

Usage measured (running cost, lines 663-675):

| Metric | Value |
|---|---|
| Time in production | 466 days (first reading 2025-05-01) |
| Total readings stored | 1,496,265 |
| Stations ever seen (by distinct gateway) | 19 |
| Stations reporting in last 30 days | 13 |
| Stations reporting healthily (5 minutes or better) | 5 |
| Projects with data / configured | 8 / 44 |
| Current ingest rate | 6,095 per day, about 183,000 per month |
| Best station cadence | 1.2 min (offline threshold is 10 min) |
| Hypertable size | 643 MB, 62 chunks, 0 compressed |
| Storage per reading | 451 B uncompressed with indexes |
| WS App DB size | 10 MB |
| Share of sensors DB | 3.8% (643 MB of 17 GB) |
| Share of whole cluster | 0.08% (653 MB of about 860 GB) |
| Users with saved dashboard layouts | 34 |
| Peak month | 195,287 readings in 2026-06 |
| Growth | about 6.5 times as stations went from 2 to 13 |

Cost (list rates, internal cost, not a price):

| Metric | Value | Line |
|---|---|---|
| Fully allocated per month | $117.18 | running cost `:716` |
| Marginal per month (what stops if switched off) | $78.58 | `:776` |
| Spent to date at today's run rate | about $1,800 fully allocated, $1,200 marginal, an upper bound | running cost "Cumulative spend" |
| Per active station per month (13) | $9.01 | `:826`; cost to serve `:210` |
| Per healthy station per month (5) | $23.44 | `:827`; cost to serve `:254` |
| Per active project per month (6) | $19.53 | `:828`; cost to serve `:214` |
| Per user per month (34) | $3.45 | `:829`; cost to serve `:245` |
| Per 1,000 readings | $0.64 | `:830`; cost to serve `:241` |
| Marginal cost of one reading | about $0.0000027 | running cost "Cumulative spend" block; cost to serve `:255` |
| Share of the bill that is idle capacity and subscriptions | 96% | running cost headline |

Cost lines that touch the data bank: production EC2 host $30.37, staging $15.18, test $15.18, three 30 GB EBS volumes $7.20, GitHub Actions $6.00, CloudWatch $1.00, ECR $0.50, Secrets Manager $0.40, Elastic APM $15.00, Sentry $10.00, LaunchDarkly $5.00, Mixpanel $5.00, sensors-service host share (3.9%) $2.46, gateway and load balancer $2.00 for about 718k requests a month from the 60-second poll, Aiven database share (0.08% of about $1,500 a month) $1.14, S3 and CloudFront $0.30, AWS IoT $0.25 for 183k messages, SQS $0.20, Anthropic API $0.00 (flag off).
  Evidence: `RC/2026-08-10-weather-station-running-cost.html:725-745`.

Assumptions the doc says it made (`:924-935`):

- Production host is a t3.medium in us-east-2. Staging and test are t3.small each.
- The Aiven database plan is about $1,500 a month.
- SaaS contracts are $35 a month combined.
- AWS and vendor list rates, no reserved instances. If the hosts are t3.large the total is about $205. With reserved instances or a savings plan it is about $90.
- Hardware is capital equipment and is excluded.
- Anthropic narration is off, so $0.

What the doc recommends and warns (`:843-898`):

- About $40 a month is recoverable: schedule the test and staging hosts ($22.77) and right-size production ($15.18).
- No compression policy on `weather_station_sensor`. 643 MB would become about 55 MB. This releases no cash on a fixed plan.
- "No hypertable in the cluster has a retention job." The weather table grows about 1 GB a year at 13 stations and about 3 GB a year at 40. The doc says to decide a retention horizon now.
- Six of the 13 "active" stations produced between 1 and 21 readings in 30 days. They are probably swapped devices whose nodes were never retired. Real cost per working station is $23.44, not $9.01.
- 36 projects have settings and never sent a reading.

### 5.2 Platform knowledge base (internal doc, 2026-07-27 to 2026-08-02)

| Fact | Value | Evidence |
|---|---|---|
| Production databases | 36, 669.9 GiB, one Timescale Cloud cluster | `KB/20-data/estate-map.md:20` |
| `sensors` | 14.87 GiB, 54 tables, 9 hypertables | `KB/20-data/estate-map.md:57` |
| `weather-station` | 0.01 GiB, 10 tables, 0 hypertables | `KB/20-data/estate-map.md:82` |
| `wakecap_observation` | 12.65 GiB, 49 tables, 0 hypertables | `KB/20-data/estate-map.md:59` |
| `location` | about 380 GiB, holds about 6 weeks | `KB/20-data/hypertable-usage.md:102` |
| `wakecap_app` | 168.2 GiB; `DeviceLocation` declared 1-month retention, retains about 45 days | `KB/20-data/hypertable-usage.md:178,202` |
| Retention rule | IoT device data (asset location, sensor telemetry, diagnostics) kept about one month because of size. Low-volume event tables kept for years | `KB/20-data/hypertable-usage.md:47-48` |
| Weather table in that rule | kept, earliest chunk 2025-05-01, 607 MB on 2026-07-27 | `KB/20-data/hypertable-usage.md:83` |
| Retention mechanism | not a TimescaleDB policy. "What performs it is undetermined" | `KB/20-data/hypertable-usage.md:95-99` |
| Full worker history | warehouse `FactWorkersHistory`, 363 weekly partitions back to 2019-06-03 | `KB/20-data/warehouse-and-analytics.md:120-121` |
| People (workers) | 165,049 rows | `KB/20-data/system-of-record.md:44` |
| Device-to-worker assignments | 118,105 rows (`ResourceDevice`) | `KB/20-data/system-of-record.md:81` |
| Node registry | 141,272 devices (141,464 on 2026-08-02) | `KB/20-data/system-of-record.md:80`; `KB/00-platform/device-model.md` |
| Projects in identity | 93 | `KB/20-data/system-of-record.md:64` |
| `ProjectSettings` rows | 44, `ProjectThreshold` rows 41 | `KB/20-data/system-of-record.md:70` |

### 5.3 Queues (code, infrastructure repo)

- The lightning data queue, the modbus-unparsed queue and their dead-letter queues keep messages 14 days (1,209,600 s). Visibility 30 s. Dead-letter after 5 receives. Same for test. [code]
  Evidence: `INFRA/terraform/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf:48-51,60-63,89-98,107-116`.
- The weather path reads from SQS queues named `production_sensors_queue` and `production_wakecap_two_sensors_queue`. [code]
  Evidence: `INFRA/terraform/aws/wakecap-main/us-west-2/prod/iot/rules.tf:134,154`.

---

## 6. (b) What is NOT stored today that blocks prediction

Each item says what is missing, why it blocks, and the evidence.

### B0. The check you asked for: "gas reading history is not stored"

Result: false in code, true in the screen text.

- Code stores it. `gas_reading` appends every new sensor block and no code deletes it. [code]
  Evidence: `BE.Domain/Products/GasDetector/Entity/GasReading.cs:5-13`; `SNAP:204-250`.
- Code serves it. `GET api/project/{projectId}/gas-detector/Devices/{id}/readings?from&to&bucket`. Buckets: raw, 1m, 15m, 1h. Default window 24 hours. At most 5,000 points. The response says when it cut the series. [code]
  Evidence: `BE.Api/Products/GasDetector/Controllers/DevicesController.cs:72-98`; `BE.Contracts/Products/GasDetector/DTO/GasReadingHistoryDto.cs:12-21,81-99`.
- It was added on 2026-09-13. [code]
  Evidence: `git -C BE log master --format='%h %ad %s' --date=short -S'GetReadingsAsync' -- BE.Core/Products/GasDetector/Services/GasQueryService.cs` prints `688b766 2026-09-13 ... gas readings API`.
- It has service-level tests in the repo (not a test-environment deploy). [code]
  Evidence: `BE.Tests/Products/GasDetector/GasPollingTests.cs:738,766,783` call `GetReadingsAsync`; `GasReadingDedupeTests.cs` covers the unique index.
- The front end calls none of it. The URL file lists 7 routes and says "There is no compliance or history route". No `/readings` call exists in the front end. [code]
  Evidence: `FE/src/app/features/Gas/contracts/apiUrls.ts:12`; `grep -rn '/readings' FE/src/app/features/Gas` (excluding tests) finds nothing.
- The screens say the opposite. Peak today and Longest quiet gap show "Not available yet" with "Needs stored readings for the day, which the backend does not keep yet." This text was on the live dashboard on 2026-10-04. [live]
  Evidence: `FE/src/app/features/Gas/translations/en.ts:225-227`; `RK/four-videos/gas/captures/g-dashboard-c.txt` (same text).
- Compliance says "Needs alert history and stored readings. Both are missing today." Also live. [live]
  Evidence: `FE/src/app/features/Gas/translations/en.ts:469`; `RK/four-videos/gas/captures/g-compliance-c.txt`.
- The strings are newer than the route. The route landed 2026-09-13. The string landed 2026-09-30. [code]
  Evidence: `git -C FE log --format='%h %ad %s' --date=short -S'which the backend does not keep yet' -- src/app/features/Gas/translations/en.ts` prints `db30701 2026-09-30 TAN-2854 ...`.
- The alerts caption says "the reading that raised the alert ... is not recorded yet". The backend stores that value on platform alerts and serves it as `reading`. [code]
  Evidence: `FE/src/app/features/Gas/translations/en.ts:388`; `BE.Domain/.../GasAlert.cs:37-38`; `GasAlertDto.cs:42-43`.
- What is true: no exposure, no TWA or STEL, no compliance percentage is computed or stored. The backend only maps the limits. [code]
  Evidence: `grep -rn -i 'TwaLimit\|StelLimit\|exposure' BE.Core/Products/GasDetector` finds only `GasQueryService.cs:466-467` (copy limits) and two comments.

So the honest statement for the presentation: gas history is stored and queryable. The screens do not use it yet.

### B1. No prediction layer exists

- No forecast, prediction, trend or regression code exists in the backend. The only "regression" is the NOAA heat-index formula. The only anomaly logic is rule based. [code]
  Evidence: `grep -rn -i 'forecast\|predict\|prognos\|trend\|regression\|anomal' BE.Core BE.Domain BE.Contracts` finds only: the NOAA formula, the rule-based sensor anomaly detector, the observer label "trending", and the chart type `Trend` (a line chart of past readings, `BE.Core/Products/WeatherStation/Services/Agent/ChartPlanner.cs:148,217,267`). A second search for `forecast|predict|prognos|extrapolat` finds two comments (`ObserverLimits.cs:51`, `PolicyImpactTimings.cs:15`) and no code.
- Rule thresholds that exist: station live up to 15 min, stale 15 to 60 min, dark from 60 min. A sensor is stuck after 6 identical readings spanning at least 30 minutes. These are computed on request and not stored. [code]
  Evidence: `BE.Core/Products/WeatherStation/Services/Agent/StationHealthService.cs:14-17,27-28`; `StuckSensorAnalyzer.cs:33,36`.
- The Trends item in the menu is "Planned" and has no route. It was removed from the rail on master on 2026-10-05. [code]
  Evidence: `FE` commit `83b4d8d` "TAN-2956: remove obsolete Trends Planned tab from the Connected Env side rail (#212)"; live capture `RK/four-videos/gas/captures/g-compliance-c.txt` ("TrendsPlanned").
- The agent can read weather only. All 33 MCP tools are weather or shared tools. None reads gas or lightning. [code]
  Evidence: `grep -rc 'McpServerTool(' BE.Api/Mcp` sums to 33; `grep -rli 'gas\|lightning' BE.Api/Mcp/Tools` finds nothing.

### B2. Weather history is short, thin and gappy

- 1.5 million readings, 13 stations that reported in 30 days, 5 that report well, 8 projects ever. June 2025 is empty. [stat]
  Evidence: section 5.1. `RC/2026-08-10-weather-station-running-cost.html:663-667,707`.
- Code comments claim readings arrive "about every ten seconds". The measurement says the best station reports every 1.2 minutes. Do not say ten seconds. [code, stat]
  Evidence: `BE.Core/Products/WeatherStation/Configuration/PolicyImpactOptions.cs:29` and `PolicyImpactService.cs:237`; `RC/...running-cost.html:669`.
- 16 channels only. The radiation column was dropped in July 2025. There is no radiation or globe-temperature channel, so models that need one cannot use this table. [code]
  Evidence: `SS/src/migrations/1752492955913-add_new_columns_in_weather_station.ts:9-15`; section 2.2.
- CO, SO2, wind direction and cumulative rain are stored but have no limit in the policy tables, so no verdict can be formed on them. [code]
  Evidence: section 3.5; `SNAP:1070-1115`.

### B3. Station identity and location are not in the CE bank

- The CE backend stores no station coordinates, space or model. node-service holds `space_id` and `coordinates` for approved weather stations. The CE backend does not read them. [code]
  Evidence: `NS/src/dtos/weather-station-dtos.ts:55-83`; `BE.Contracts/Products/WeatherStation/DTO/ExternalRest/Sensors/ConcreteSensorResponse.cs` (fields: NodeId, ProjectId, SerialNo, LocalId, GeneratedAt, IsOnline).
- A reading can exist with no registered station. The station list is built from registered nodes with a left join to the latest reading. The August release deck records two live stations that were "structurally invisible". [code, stat]
  Evidence: `SS/src/services/weather-station-sensor-service.ts:555-557`; `RK`'s August deck: `WS/release-deck/ws-release-2026-08.html` ("TAN-2105 two live stations structurally invisible").
- The counts disagree. 4 registered `weather_station` nodes on 2026-07-28. 13 stations reporting on 2026-08-10. Do not state a count of registered stations. [stat]
  Evidence: `KB/00-platform/device-model.md:41`; `RC/...running-cost.html:665`.

### B4. Verdict history is short and shaped as episodes

- The outbox started 2026-09-20 in code. Before that the CE database stored no verdict at all. [code]
  Evidence: `BE.Infra/Migrations/20260920120821_add-weather-observation-outbox.cs`; `WeatherObservation.cs:8-11`.
- The Observation Manager copy of older weather observations contains repeats. It did not dedupe on `ExternalId` until 2026-09-20. [code]
  Evidence: `BE.Core/Products/WeatherStation/SafetyPolicy/ObservationEvaluation.cs:14-17`; `OM/.../20260920135255_AddWeatherStationExternalIdUniqueIndex.cs`.
- Only transitions are stored. A reading that stays inside its limit leaves no row, so "how close to the limit" is not in the bank. [code]
  Evidence: `EpisodeFolder.cs:105-113`.
- It is not evidenced that the outbox is filled or delivering in production. [gap]
  Evidence: `RK/four-videos/_research/agent-and-control.md` (section "Live on 2026-10-04").

### B5. Gas has no labels, no worker and no spatial link

- All 16 live gas alerts are SOS or tipped-over rows from one detector. There is no example of a gas-limit crossing. [live]
  Evidence: `RK/four-videos/gas/captures/g-alerts-c.txt` (section 3.4).
- The earliest alert row is 2026-10-03. Gas readings can only start after the code merged on 2026-09-13. The first-row date is unknown. [live, code]
  Evidence: `git -C BE log -1 --format='%h %ad' 688b766`; `RK/four-videos/gas/captures/g-alerts-c.txt`.
- One account maps to one project. [code]
  Evidence: `GasPollingOptions.cs` on master line 33.
- Cadence is about 30 minutes per detector. [code]
  Evidence: `GasPollingOptions.cs` on master line 68.
- No worker link. The wearer is vendor free text. The device-to-platform mapping was removed. No coordinates, no zone geometry. [code]
  Evidence: `GasDevice.cs:32-36`; migration `20260928144148_remove-gas-device-mapping.cs`; `GasZone.cs:13-29`.
- No Observation Manager delivery for gas. [code]
  Evidence: section 3.8.
- No compliance, no exposure, no TWA or STEL. The screen says so. [live]
  Evidence: `RK/four-videos/gas/captures/g-compliance-c.txt`.
- Gas fleet reports H2S, O2 and combustible gas. CO and CO2 were removed from the UI. [code]
  Evidence: `RK/four-videos/_research/integration-and-devices.md:18` (headline finding 10).

### B6. Lightning stores state, not strikes

- The stored fields are a state (7 values), contact bits, health, data age and flags. There is no strike distance, strike count or bearing. [code]
  Evidence: `BE.Domain/Products/LightningSensor/Entity/LightningSensorStateCurrent.cs:10-58`.
- The radii are display-only. No rule reads a distance. [code]
  Evidence: `LightningSensorSettings.cs:26-30`; `RK/four-videos/_research/refresh-1.0.7.md:12`.
- The sensor location is manual and temporary. [code]
  Evidence: `LightningSensorSettings.cs:63-72`.
- The module is new (2026-08-30) and only the All Clear state has been seen live. There are no Red examples. [live]
  Evidence: `RK/four-videos/_research/changes.md` ("Check before filming ... Lightning has shown only All Clear so far"); `RK/four-videos/_research/refresh-1.0.7.md:11`.
- Nothing records that someone was told or that work stopped. [code]
  Evidence: section 3.4 (lightning bullet).

### B7. What people did is not in the CE bank

- The CE backend never reads the Observation Manager. The outcome of an observation (open, closed, false alarm, false positive, severity, close-out report) stays there. The only thread back is `weather_observation.ingestion_id` and `external_id`. [code]
  Evidence: `BE.Infra/RestServices/Admin/IObservationService.cs:8-12`; `OM/Wakecap.Observation.Domain/Entity/Observations/BaseObservation.cs:48-58,89-110`.
- Gas acknowledgement exists in WakeCap only. Lightning has none. [code]
  Evidence: sections 3.4 and 3.8.

### B8. Policy-in-force history is partial

- Before and after snapshots exist only on some paths, and creation auditing began 2026-08-19. Verdicts before then cannot be tied to the exact limits in force. [code]
  Evidence: `ChangeAuditCoverage.cs:62-63`; `SafetyConfigAuditLog.cs:105-133`.
- Only `weather_observation` rows carry `policy_ref`. [code]
  Evidence: `WeatherObservation.cs:52-57`.

### B9. No people, permits or machines

- The CE bank has no worker id, no position, no permit and no equipment record. The only person-like fields are the OAuth subject on audit rows, the user id on layouts, and the gas wearer name. [code]
  Evidence: `SNAP` (no worker, permit or equipment column); `BE.Domain/Shared/Entity/UserProjectDashboardLayout.cs:14-16`; `GasDevice.cs:36`.
- Worker position history is a rolling window in the operational stores (about 6 weeks in `location`, declared 1 month in `wakecap_app.DeviceLocation`). Full history is in the warehouse. [stat]
  Evidence: `KB/20-data/hypertable-usage.md:58,102,178`; `KB/20-data/warehouse-and-analytics.md:120-121`.
- Per-worker heat data lives in worker-gear, not in the CE bank. [code]
  Evidence: `WG/Wakecap.WorkerGear.Domain/Entity/Heatstress/Heatstress.cs:7-45`.
- Permits are in the app DB and as observations in the Observation Manager. [code]
  Evidence: section 2.4 and 2.5.

### B10. Retention is lopsided

- No CE table is ever trimmed except observer evidence (newest 200 per finding) and heat-index bands that are replaced. Weather, gas, lightning and verdict rows grow forever. [code]
  Evidence: `grep -rnE 'ExecuteDelete|RemoveRange|DELETE FROM' BE.Core BE.Infra BE.Domain` (excluding Migrations) finds `ObserverFindingService.cs:313` (evidence prune) and `SafetyPolicyPublishService.cs:457` (band replace). One repository delete of a heat-index band is at `HeatIndexBandService.cs:235,409`.
- The sensors DB has no retention job and no compression (internal doc). [stat]
  Evidence: `RC/...running-cost.html:867-881`.
- Worker positions are trimmed to about 6 weeks. So the one dataset a worker-risk model most needs is the one kept shortest in the operational stores. [stat]
  Evidence: `KB/20-data/hypertable-usage.md:58,92,102`.

### B11. Keys, units and time

- There is no foreign key across databases. ProjectId is a plain column. [stat]
  Evidence: `KB/20-data/system-of-record.md:72-74`.
- `project_id` is a uuid in readings and a varchar(255) in the node view. The join casts it. [code]
  Evidence: `SS/src/models/v-node-with-meta-model.ts:13`; `SS/src/services/weather-station-sensor-service.ts:557`.
- Day grain uses a fixed +3 hour offset in the weather report. Lightning uses a fixed +03:00. A multi-country pool needs a per-project time zone. [code]
  Evidence: `BE.Core/Products/WeatherStation/Services/ReportSummaryService.cs:44` (`LocalOffset = TimeSpan.FromHours(3)`); `BE/GAPS2.md:49`. The Observation Manager does store project-time-zone columns: `BaseObservation.cs:28-29`.

### B12. Derived state is computed, not stored

- Station health class, agent verdict, work decision, composed dashboard, gas SAFE or CHECK or ALERT, readiness: all computed at request time. You cannot replay what a user saw. [code]
  Evidence: `BE.Core/Products/WeatherStation/Services/Agent/StationHealthService.cs`; section 3.5; `BE/README.md:459-463`.

---

## 7. (c) Ownership boundaries

| Data | System of record | Writers | Readers | Boundary rule | Evidence |
|---|---|---|---|---|---|
| Weather readings and latest rollup | sensors-service | sensors-service ingest only | sensors-service API; CE backend read-only | The CE context throws on save | `BE.Infra/Database/SensorsDbContext.cs:18-26` |
| Per-project offline threshold | sensors-service `project_configuration` | sensors-service | CE backend reads it for the dashboard | Config is split: this lives in sensors, the rest in CE `ProjectSettings` | `BE.Core/Products/WeatherStation/Services/DashboardService.cs:116`; `SS/src/migrations/1755983012007-add_weather_station_threshold_to_project_configuration_table.ts` |
| Station list and online flag | sensors-service status API over node registry | sensors-service | CE backend by REST | Only registered nodes appear | `BE.Infra/RestServices/ExternalRestPaths.cs:35-38`; `SS/src/services/weather-station-sensor-service.ts:527-557` |
| Device registry (all node types) | node-service | node-service REST; sensors-service node-sync posts new stations | sensors, location, diagnostics, safety by foreign table; CE backend by REST for lightning | Unique (serial_no, network_id) | `NS/src/models/node-model.ts`; `SS/src/services/weather-station-sensor-service.ts:257-262,390-460` |
| Policy, thresholds, bands, settings, product flags, layouts, station names | CE backend | CE REST, plus MCP propose and approve | CE front end, MCP | One DB, one writer | section 3.3 |
| Gas devices, readings, alerts | CE backend (source device data is Blackline's cloud) | CE poll sweep; ack and resolve endpoints | CE | Ack is not sent back | `BE.Core/Products/GasDetector/Services/GasPollSweepRunner.cs:18-24`; FE `apiUrls.ts` |
| Lightning registry copy, packets, state | CE backend (registry also in node-service) | CE queue consumer and sweep; hourly sync from node-service | CE | Location is temporary in CE until node-service owns it | `LightningSensorSettings.cs:63-72` |
| Observations and their lifecycle | Observation Manager | OM; CE outbox and sensors-service post by REST | OM | One-way. CE never reads back | `IObservationService.cs:8-12` |
| Worker positions | location-service; also app DB `DeviceLocation` | their pipelines | their APIs | CE has none | `LS/src/models/asset-model.ts` |
| People, Space, Zone, Company, Package, ResourceDevice, permits | app-api (`wakecap_app`) | app-api | OM, notification, location by foreign table | No FK across DBs | `OM.SNAP` (foreign tables); `KB/20-data/system-of-record.md:72-74` |
| Bracelet readings and assignments | worker-gear | worker-gear | worker-gear | Own DB | `WG/Wakecap.WorkerGear.Domain/Entity/Heatstress/Heatstress.cs` |
| Equipment and GPS trackers | wakecap-equipments | that service | that service | KB only | `KB/10-services/wakecap-equipments/overview.md` |
| Permissions | identity and authorization | admin surfaces | CE backend by REST | CE seeds module permissions | `BE.Api/Extentions/ModulePermissionSeedingExtensions.cs` |
| Audit of weather policy | CE backend | every protected write | audit endpoints | Lightning and gas are off this audit | `ChangeAuditCoverage.cs:140-256` |

Cross-service calls the CE backend makes (all of them):

- Read: sensors-service status (`/api/projects/{projectId}/weather-station/status`), node-service `GET /nodes`, identity and admin (organisations, users, authorization). [code]
  Evidence: `BE.Infra/RestServices/ExternalRestPaths.cs:5-38,52-54`.
- Write: Observation Manager `POST /api/ingest`, identity permission seeding. [code]
  Evidence: `ExternalRestPaths.cs:47-49`; `ModulePermissionSeedingExtensions.cs:40-46`.
- Vendor: Blackline `GET /device` poll and a push receiver. [code]
  Evidence: `BE.Core/Products/GasDetector/Hosting/GasReadingsPollingBackgroundService.cs`; `GasPushController.cs`.
- Queue: SQS consumer for lightning. [code]
  Evidence: `BE.Core/Products/LightningSensor/Hosting/LightningQueueConsumerBackgroundService.cs:3-17`.
- MassTransit is referenced in the project file and a `MessageSender` class exists. No bus is registered. [code]
  Evidence: `BE.Infra/Wakecap.WeatherStation.Infrastructure.csproj:19-20`; `grep -rn 'AddMassTransit' BE --include=*.cs` finds nothing.

---

## 8. (d) Join keys

### 8.1 Keys that already exist across services

| Key | Type | Where it exists today | Hazard | Evidence |
|---|---|---|---|---|
| ProjectId | uuid | 24 of 31 CE tables; sensors `project_id`; node `project_id`; location `project_id`; OM `ProjectId`; app DB; worker-gear | A plain column. No FK across DBs. Varchar in the node view | `SNAP` (24 tables, counted by a regex script); `SS/src/models/weather-station-sensor-model.ts:19-20`; `NS/src/models/node-model.ts:13`; `LS/src/models/asset-model.ts:19`; `OM/.../BaseObservation.cs:23` |
| Time (UTC) | timestamp | `generated_at` (sensors, location, bracelet), `ReadingAtUtc` (gas), `OccurredAtUtc` (lightning), `reading_at` (outbox), OM `GeneratedAt` | No time zone in the type. Reading time is receive time minus travel time | `SS/src/services/weather-station-sensor-service.ts:94`; `SNAP:229` |
| Station serial | string | sensors `serial_no`; node `serial_no`; CE `weather_observation.station_serial` and `observer_finding.station_key`; OM `SerialNo`; location `serial_no`; bracelet `SerialNo` | It is the mesh source address as text | `SS/src/services/weather-station-sensor-service.ts:90`; `WeatherObservation.cs:24-25`; `ObserverFinding.cs:28-33`; `OM/.../WeatherStationObservation.cs:24`; `WG/.../Heatstress.cs:16,55` |
| Node id | int | node `id`; CE `StationName.NodeId`; station status `nodeId`; location `node_id`; `ResourceDevice.DeviceId`; bracelet `DeviceId` | CE stores it only on `StationName`, not on readings | `StationName.cs:13-15`; `ConcreteSensorResponse.cs`; `LS/src/services/asset-location-service.ts:440` |
| Network id and gateway id | int, string | sensors `network_id`, `gateway_id`; node `network_id`; location; bracelet | A network can serve several projects | `NS/src/models/network-model.ts:3-10` |
| Source address | int | the 5 lightning tables | Equals the node serial as a number. No node id kept | `BE.Domain/.../LightningSensorSettings.cs:45-46`; `LightningNodeDto.cs` |
| Gas device | uuid and vendor id | `gas_device.Id`, `GasDeviceId`, `VendorDeviceId` | Vendor id only. No platform device id since 2026-09-28 | `GasDevice.cs:19`; `20260928144148_remove-gas-device-mapping.cs` |
| Space and zone | int | node `space_id`; location `space_id`; OM `SpaceId`, `ZoneId`; app Space, Zone; permits; CE `gas_device.ZoneId` (its own guid) | CE gas zone is not the platform zone. CE has no space or zone on readings | `OM/.../BaseObservation.cs:66-67`; `NS/src/models/node-meta-model.ts:12-13`; `GasZone.cs:13-29` |
| Coordinates | Point | node `coordinates`; OM `Location`; permit `Location`; CE lightning lat and lon (temporary) | CE has none for weather or gas | `NS/src/models/node-meta-model.ts:15-16`; `NovadeWorkPermit.cs:23` |
| Company and package | int | node `company_id`; OM `CompanyId`, `PackageId`; People; WorkPermit | Not in CE | `NS/src/models/node-model.ts:45`; `BaseObservation.cs:33-34` |
| Worker or resource id | int | `ResourceDevice.ResourceId`; bracelet `DeviceAssignment.WorkerId`; People `Id` | Pseudonymise before pooling | `APP/.../ResourceDevice.cs:17`; `WG/.../DeviceAssignment.cs:10` |
| External id, ingestion id, episode key | string, uuid | CE outbox `external_id`, `ingestion_id`, `episode_key`; OM `ExternalId`, `IngestionId` | The only thread from a CE verdict to its OM outcome | `WeatherObservation.cs:65,83,86`; `BaseObservation.cs:22,62` |
| Policy ref | bigint | `weather_observation.policy_ref` to `SafetyConfigAuditLog.Id` | Verdict rows only | `WeatherObservation.cs:57` |
| User subject or id | string, uuid | audit `ActorSubject`; layout `UserId`; OM `CreatedBy` | Names resolved at read time | `SafetyConfigAuditLog.cs:68`; `UserProjectDashboardLayout.cs:16` |
| Indicator name | string | `weather_observation.indicator`; OM `IndicatorName` | Enum name, not number | `WeatherObservation.cs:27-28` |
| Gas type | string | the gas tables | Vendor spelling mapped (`LEL-MPS` to `LEL`) | `GasReading.cs:21-28` |

The common spine: weather rows, bracelet rows and location rows share one mesh envelope: project, network, gateway, serial number, generated time, travel time, quality, hop count, buffered flag.
  Evidence: `SS/src/models/weather-station-sensor-model.ts:10-41`; `WG/.../Heatstress.cs:12-27`; `LS/src/models/asset-model.ts:15-94`.

### 8.2 Where new data could join (vision, built on keys that exist)

These are proposals. None is built. Status: vision. Each names the join and the gap.

- Worker locations to weather: join `asset_location` (project, space, point, time) to `weather_station_sensor` by project and time bucket. Add a spatial join to the station's `node_meta.coordinates` when the station is approved. Gap: CE does not read coordinates. Registered-station count is in doubt (B3). [vision]
  Evidence: `LS/src/models/asset-model.ts:19-22`; `NS/src/models/node-meta-model.ts:12-16`.
- Worker locations to lightning: join to the sensor point in `lightning_sensor_settings` (lat, lon). Gap: the point is manual and temporary. The radii are display-only. [vision]
  Evidence: `LightningSensorSettings.cs:63-72`.
- Worker locations to gas: join by project and zone only. Gap: gas zones have no geometry and no writer. Detectors have no coordinates. [vision]
  Evidence: `GasZone.cs:13-29`; section 3.2.
- Worker identity: `ResourceDevice` links a worn device to a person with an assignment interval. location-service already joins it. Use the pseudonymous resource id, not `People`, which holds names and contact details. [vision]
  Evidence: `LS/src/services/asset-location-service.ts:426-440`; `APP/.../People.cs:29-50`.
- Heat-stress on workers: bracelet rows carry ambient temperature, a heat stress index, two trigger flags and battery, on the same mesh envelope as weather. Join by project and time, and by the worker through `DeviceAssignment`. [vision]
  Evidence: `WG/.../Heatstress.cs:7-45`; `WG/.../DeviceAssignment.cs:8-14`.
- Permits: `WorkPermit` has project, area, company, workshift, date, estimated duration, number of workers, free-text equipment and material, issuer and receiver user ids. `NovadeWorkPermit` has an external permit id, start and end, zone, space and a point. The Observation Manager already files permit events with the permit number as `ExternalId` and the zone in `ZoneId`. Join by project, a time window (permit start to end) and zone, space or point. [vision]
  Evidence: `APP/Wakecap.App.Domain/Entity/DigitalPermit/WorkPermit.cs:22-46`; `NovadeWorkPermit.cs:9-28`; `OM/.../DWPZoneDriftObservation.cs:3-15`; `OM/.../ObservationsHierarchy.cs:158-192`.
- Permit service status: the platform knowledge base called the Digital Work Permit service a scaffold with zero entities (2026-07-27). The Observation Manager README records permit rows on the test environment on 2026-09-17 and the code says the first type is "live in production". These disagree. [stat]
  Evidence: `KB/10-services/wakecap-digital-work-permit/overview.md:5,17`; `OM/README.md` (section "Getting the Floors control on screen"); `OM/.../ObservationsHierarchy.cs:173-175`.
- Equipment: a machine record lives in `wakecap_equipments` (Traccar `tc_devices`, positions, geofences). Node-service has a `gps_tracker` type. A permit names equipment as free text. Join by project, time and geofence. No id link exists. [vision]
  Evidence: `KB/10-services/wakecap-equipments/overview.md`; `NS/src/utilities/enums.ts:10`; `WorkPermit.cs:36`.
- Observation outcomes: join a CE verdict row to its Observation Manager row by `ExternalId` (episode key) and `IngestionId`. Gap: CE never reads OM. A pool must pull the OM outcome. [vision]
  Evidence: `BE.Infra/RestServices/Admin/IObservationService.cs:8-12`.
- Warehouse: worker history from 2019 and a copy of weather readings live in the warehouse. A pool that wants years of worker history must read it from there. [vision]
  Evidence: `KB/20-data/warehouse-and-analytics.md:107,120-121`.

---

## 9. Where each reading lands (stores on the path)

This is the storage view only. The hop-by-hop path is another slice.

### Weather

1. Station message to mesh, gateway, IoT, SQS (`production_sensors_queue`). [code]
   Evidence: `INFRA/.../prod/iot/rules.tf:134,154`; `KB/30-flows/worker-position-ingestion.md` (flow diagram).
2. sensors-service decodes, finds the project by gateway, and inserts into `weather_station_sensor`. [code]
   Evidence: `SS/src/services/weather-station-sensor-service.ts:49-115`.
3. If the message is live (not buffered) it upserts `weather_station_sensor_summary`. [code]
   Evidence: `SS/src/services/weather-station-sensor-service.ts:112-114`.
4. The CE backend reads read-only for the dashboard (60 s poll), reports, policy impact, station health. [code]
   Evidence: section 2.2; `ARCH/06-runtime-data-flow.mmd:34-47`.
5. Every 30 s the evaluator folds new readings into episodes and writes `weather_observation`. [code]
   Evidence: section 3.8.
6. Every 10 s the dispatcher posts unsent rows to the Observation Manager, which stores `Observation` (kind WeatherStation). [code]
   Evidence: section 3.8; section 2.4.
7. A copy of the readings table goes to the warehouse by ADF (not verified). [stat]
   Evidence: `KB/20-data/warehouse-and-analytics.md:107`.

### Lightning

1. Device packet to the IoT topic `received_lightning_data` to the lightning SQS queue (14-day retention, dead-letter after 5). [code]
   Evidence: `INFRA/.../lightning-ingestion.tf:89-98`; `BE.Core/Products/LightningSensor/Hosting/LightningQueueConsumerBackgroundService.cs:3-9`.
2. The consumer writes `lightning_sensor_event` and moves `lightning_sensor_state_interval` and `lightning_sensor_state_current`. An unregistered address keeps an event row and advances no state. [code]
   Evidence: `BE.Core/Products/LightningSensor/Services/LightningIngestService.cs:66-83`.
3. On entry to Red, Fault or Offline, `lightning_observation` is written in the same save. [code]
   Evidence: `LightningIngestService.cs:86-98`.
4. A sweep every 5 s writes `stale_sweep` intervals for silent devices. [code]
   Evidence: `BE.Core/Products/LightningSensor/Configuration/LightningSensorOptions.cs:34`.
5. A dispatcher every 5 s posts to the Observation Manager as source WeatherStation, type Lightning. [code]
   Evidence: `LightningObservationDispatch.cs:45,105-106`.

### Gas

1. Blackline device uploads to the vendor cloud about every 30 minutes. [code]
   Evidence: `GasPollingOptions.cs` on master line 68.
2. The CE backend polls `GET /device` every 45 s. It upserts `gas_device`, appends new blocks to `gas_reading`, raises platform alerts to `gas_alert`, mirrors vendor alerts, marks silent devices offline and records the watermark in `gas_sync_state`. [code]
   Evidence: `BE.Core/Products/GasDetector/Services/GasPollSweepRunner.cs:79-103`.
3. A push endpoint stores raw bodies in `gas_push_audit` and answers with the MD5. It raises no alert. [code]
   Evidence: `GasPushController.cs:41`; `RK/four-videos/_research/integration-and-devices.md:10`.
4. Nothing goes to the Observation Manager. [code]
   Evidence: section 3.8.

---

## 10. Conflicts and stale documents

| Where | What it says | What code or measurement says | Evidence |
|---|---|---|---|
| Gas screens | The backend does not keep readings for the day | `gas_reading` stores every reading and a history route exists since 2026-09-13 | B0 |
| Gas alerts caption | The tripping reading is not recorded | `gas_alert.Reading` is stored and served | `GasAlert.cs:37-38` |
| Code comment on policy impact | Readings arrive about every ten seconds | Best station 1.2 min. Health rule treats 15 min as stale | `PolicyImpactOptions.cs:29`; `RC/...:669` |
| `BE/WEATHER_STATION.md` | The app DB has 6 entities. `GET api/Observation/Process` runs the sweep | 31 tables. The endpoint returns 410 Gone | `BE/WEATHER_STATION.md:61,73`; `ObservationController.cs:11-23` |
| `BE/GAPS.md` row 1 and row 3 | No hosted service, no `lightning_sensor_settings` table | 7 hosted services. The table exists since 2026-08-30 | `BE/GAPS.md:5,7`; `CoreServiceRegistry.cs:110-175` |
| `BE/GAPS2.md` rows 1 to 11 | Lightning notifications and cadences are built around a notification engine | The notification table was dropped 2026-09-24. Email and SMS removed. The retention row (46) still holds | `20260924120232_drop-lightning-notifications.cs`; `RK/four-videos/_research/agent-and-control.md:28` |
| `BE/GAPS2.md:46` retention | Lightning history kept indefinitely | Confirmed by a fresh search on master | section 3.1 |
| `ARCH/05-backend-data-ownership.dot:46,60` | An external scheduler triggers `Observation/Process` | The inline sweep was removed 2026-09-24 | `ObservationController.cs:11-23` |
| `ARCH/05-backend-data-ownership.dot:55` | Reads the sensors DB through "FDW views" | A second connection string, not foreign tables | `InfrastructureServiceRegistry.cs:86-93` |
| `ARCH/05-backend-data-ownership.dot:27` | The WS App DB lists 9 entities | 31 tables | section 4 |
| `BE/WEATHER_STATION.md:45` | "staging/prod use TimescaleDB" | The WS DB has no hypertable | `KB/10-services/wakecap-weather-station/overview.md` (0 hypertables) |
| `GasPollingOptions.cs:7-8` | No Blackline account exists yet | Gas data is live on a project | `RK/four-videos/gas/captures/g-dashboard-c.txt` |
| `ObservationEvaluationBackgroundService.cs:16-17` | Disabled is the shipping state | The option defaults to true | `ObservationEvaluation.cs:18,37` |
| Registered weather stations | 4 nodes (KB 2026-07-28) | 13 stations reporting (RC 2026-08-10) | B3 |
| Digital Work Permit service | Scaffold with zero entities (KB 2026-07-27) | Permit observations exist in the OM code and on test | section 8.2 |
| `BE/GAPS.md` row 4 | A `Permissions.LightningSensor` class with `lightningsensor:view` and `edit` | One scope for all three products: `weatherstation:view` and `edit` | `BE/GAPS.md:8`; `BE.Domain/Shared/Constants/Permissions.cs:9-14`; `WS/CLAUDE.md:69` |

---

## 11. Gaps (what I could not verify)

1. No database access. Row counts and sizes are internal docs dated 2026-07-27 to 2026-08-10. Today's numbers differ.
2. Backend deploy state is unknown. Gas acknowledge and close is proven deployed by the changing rows on 2026-10-04. Everything else marked `code` may or may not be deployed.
3. Whether the weather outbox and the Observation Manager delivery work in production is not evidenced.
4. First-row dates and volumes for `gas_reading`, `lightning_sensor_event` and `weather_observation` in production are unknown.
5. Which project Blackline is bound to in each environment is unknown. I did not open config files.
6. Lightning queue and rule state in production is unknown. The terraform exists. An approval gate was open on 2026-08-31 (`WS/BLOCKED.md:5-40`).
7. The permit service status conflicts between two internal sources. Row counts of `WorkPermit` and `NovadeWorkPermit` are unknown.
8. `wakecap-equipments` is not checked out. Its join keys come from the knowledge base only.
9. worker-gear is read from a checkout dated 2026-08-17. Its bracelet row shape may have changed.
10. The warehouse copy of weather readings is an internal doc claim. The ADF trigger state is "not determinable" in that doc.
11. What trims location data to about 6 weeks is "undetermined" in the knowledge base. I did not trace it.
12. Retention for the Observation Manager, node and app databases was not examined.
13. Registered weather station count (4 or 13 or other) is unresolved.
14. The GAPS and GAPS2 files are stale in places. I used code where they disagree.
15. Side note, path only: `BE.Infra/InfrastructureServiceRegistry.cs:59` and `:93` log the whole connection strings at Debug level. The research notes also list committed-secret candidates by path only: `RK/four-videos/_research/integration-and-devices.md` (section "Housekeeping"). I did not open any of those files.
16. The older checkout of sensors-service (`e969d3e`) was not compared with the newer one beyond the commit dates.
17. Disclosure about the secret-file rule. One search for the phrases "data bank", "data pool" and "data lake" ran `grep -rIil` with `--include='*.json'` over `WS`. By file pattern it could have scanned `appsettings*.json` in the backend repo. It printed only file names, nothing from those files, and the only hit was a presentation page. All other searches were limited to source, markdown, terraform and HTML files, and excluded `appsettings*` where json was included.
18. Row counts for the 31 CE tables are unknown. I only know code shape and the sizes in the internal docs.

---

## 12. Numbers (every figure, how it was produced)

Measured by me with read-only commands:

| Figure | Value | Command or file |
|---|---|---|
| Tables in the CE model | 31 | `grep -c 'b.ToTable("' SNAP` |
| Tables by family | gas 7, lightning 5, observer 4, shared 4, weather outbox 2, weather config and catalog 9 | `grep -n 'b.ToTable("' SNAP \| sed ... \| awk` (prefix grouping) |
| Tables with a ProjectId column | 24 of 31 (not: gas_push_audit, Graph, HeatIndexStatus, Indicator, Report, observer_finding_event, observer_finding_evidence) | `python3` regex over SNAP (split on `modelBuilder.Entity("`, test `Property<Guid?>("ProjectId")`) |
| CE migrations | 43 | `ls BE.Infra/Migrations \| grep -v Designer \| grep -v Snapshot \| wc -l` |
| Tables at 2100dc4, 3dc572d, 688b766, e797731, 248bed9, 63b7886, 41b20bf, 352195f | 10, 16, 23, 25, 27, 27, 31, 31 | `git show <sha>:<SNAP path> \| grep -c 'b.ToTable("'` |
| Days 2026-07-26 to 2026-10-04 | 70 | `python3 -c "import datetime;print((datetime.date(2026,10,4)-datetime.date(2026,7,26)).days)"` |
| Days 2025-05-01 to 2026-08-10 | 466 | same method |
| BE commits on master | 447 | `git -C BE rev-list --count master` |
| BE hosted services | 7 | `grep -c AddHostedService BE.Core/CoreServiceRegistry.cs` |
| BE controllers | 30 files, 28 real controllers (2 are base classes) | `find BE.Api -name '*Controller.cs' \| wc -l` |
| HTTP actions | 45 GET, 11 POST, 11 PUT, 1 DELETE | `grep -rhoE '\[(Http(Get\|Post\|Put\|Delete))' BE.Api --include=*Controller.cs \| sort \| uniq -c` |
| MCP tools | 33 | `grep -rc 'McpServerTool(' BE.Api/Mcp` summed |
| Seeded indicators, graphs, heat-index bands, gas profiles | 14, 11, 5, 5 | `sed -n 642,776p ... \| grep -c 'new Indicator'` and the same for the other seeders in `InfrastructureServiceRegistry.cs` |
| Sensors weather table columns and float channels | 29 and 16 | `grep -c "type: 'float'" SS/src/models/weather-station-sensor-model.ts`; column count by declaration pattern |
| Sensors hypertable migrations / all migrations | 9 / 30 | `grep -l create_hypertable SS/src/migrations/*.ts \| wc -l`; `ls SS/src/migrations \| grep -v index.ts \| wc -l` |
| node-service migrations / node types | 58 / 14 | `ls NS/src/migrations \| grep -v index.ts \| wc -l`; count of `= '` in `NodeType` |
| Observation Manager migrations / named tables / observation kinds | 83 / 26 / 9 | `ls ... \| grep -v Designer \| grep -v Snapshot \| wc -l`; `grep -c 'b.ToTable("' OM.SNAP`; discriminator list |
| location-service migrations | 63 | `ls LS/src/migrations \| grep -v index.ts \| wc -l` |
| Lightning default heartbeat rows per device per year | 525,600 | `python3 -c "print(60*24*365)"` |
| Gas poll interval, floor, offline-after, stale-after | 45 s, 10 s, 5,400 s, 3,600 s | `GasPollingOptions.cs` master lines 75, 24, 92, 101 |
| Gas history route default window and cap | 24 h, 5,000 points | `GasReadingHistoryDto.cs:93,99` |
| Evaluator tick, lookback, batch | 30 s, 5 min, 2,000 | `ObservationEvaluation.cs:39,46,49` |
| Weather dispatcher tick, batch, attempts, backoff, cap | 10 s, 100, 8, 30 s, 3,600 s | `ObservationDispatch.cs:72-83` |
| Lightning dispatcher tick, batch, attempts, backoff, cap | 5 s, 50, 8, 10 s, 600 s | `LightningObservationDispatch.cs:45-49` |
| Join key rows in section 8.1 | 16 | count of table rows in section 8.1 |
| Lightning stale sweep, device sync | 5 s, 1 h | `LightningSensorOptions.cs:34`; `LightningDeviceSyncBackgroundService.cs:24` |
| Heartbeat default and clamp | 60 s, 6 to 3,599 s | `LightningSensorSettings.cs:18-24` |
| Observer limits | 200 evidence per finding, 8 KB, snooze max 7 days, evidence age max 30 days | `ObserverLimits.cs:30,36,49,55` |
| Change request TTL | 24 hours | `ChangeProposalService.cs:67` |
| Policy impact window default / max | 30 / 180 days | `PolicyImpactService.cs:74,80` |
| Station readings window max and default per indicator | 7 days, 500 | `StationReadingsWindowService.cs:46,50` |
| Station health thresholds | live 15 min, dark 60 min; stuck 6 readings over 30 min | `StationHealthService.cs:27-28`; `StuckSensorAnalyzer.cs:33,36` |
| Queue retention, max receives, visibility | 1,209,600 s (14 days), 5, 30 s | `INFRA/.../lightning-ingestion.tf:51,92,93,98` |

Quoted from internal docs (not measured by me): see sections 5.1 and 5.2. They are: 1,496,265 readings; 466 days; 19, 13 and 5 stations; 8 of 44 projects; 6,095 a day; 183,000 a month; 1.2 min; 643 MB; 62 chunks; 0 compressed; 451 B; 10 MB; 3.8%; 0.08%; 34 users; 195,287; $117.18; $78.58; $9.01; $23.44; $19.53; $3.45; $0.64; about $1,800; about $1,200; about 1 GB and 3 GB a year; about $40 recoverable; 55 MB if compressed; 36 databases and 669.9 GiB; 14.87 GiB sensors; 12.65 GiB observation; about 380 GiB location; 168.2 GiB app; 4 weather nodes; 3,845 trackers; 94,621 assets; 165,049 people; 118,105 assignments; 363 warehouse partitions.

Seen live (on-screen, 2026-10-04, production build 1.0.7): gas project 5 detectors registered, 4 online, 1 offline; 16 gas alerts (12 acknowledged, 4 closed, 14 SOS and 2 tipped over); a weather project with 3 stations, 1 offline.
  Evidence: `RK/four-videos/gas/captures/g-dashboard-c.txt`, `g-alerts-c.txt`; `RK/internal-notes.md:32`.

---

## 13. Animation hooks (ready to use)

Everything here points back to a section above. Status is the status of the underlying fact.

### Stores to draw (nodes)

1. Weather stations and mesh (devices, outside the bank).
2. Sensors DB: `weather_station_sensor` (9 hypertables in the DB, weather one is 16 channels, one-week chunks). [live]
3. Node registry: `node`, `node_meta`, view `v_node_with_meta` (14 node types). [live]
4. CE App DB: 31 tables in 8 families. [code]
5. Blackline cloud (gas detectors). [code, live]
6. SQS lightning queue with dead-letter queue (14-day retention). [code]
7. Observation Manager DB: `Observation` with 9 kinds. [code]
8. Location DB: `asset_location` (worker positions). [code, stat]
9. App DB: People, Zone, Space, ResourceDevice, WorkPermit, NovadeWorkPermit. [code, stat]
10. Heat-stress bracelet DB (worker-gear). [code]
11. Equipment DB and the warehouse. [stat]

### Edges to draw (who moves data to whom)

| From | To | What moves | Cadence | Status | Evidence |
|---|---|---|---|---|---|
| IoT rules | SQS `production_sensors_queue` | mesh messages | continuous | code | `INFRA/.../prod/iot/rules.tf:134,154` |
| sensors-service | Sensors DB | insert reading, upsert latest | per message | code | `SS/src/services/weather-station-sensor-service.ts:107,112-114` |
| sensors-service | node-service | register new weather station nodes (REST bulk) | on the node-sync call | code | `SS/src/services/weather-station-sensor-service.ts:458` |
| Node DB | Sensors DB | `v_node_with_meta` as a foreign table | query time | code | `SS/src/models/v-node-with-meta-model.ts:4` |
| Sensors DB | CE backend | read-only reads (10 services) | dashboard polls every 60 s; evaluator every 30 s | code | section 2.2 |
| sensors-service | CE backend | station list over REST | per request | code | `BE.Infra/RestServices/ExternalRestPaths.cs:35-38` |
| node-service | CE backend | lightning nodes over REST | hourly | code | `LightningDeviceSyncBackgroundService.cs:24` |
| Blackline cloud | CE backend | gas devices, readings, vendor alerts | poll every 45 s | code | `GasPollingOptions.cs` master line 75 |
| SQS lightning queue | CE backend | lightning packets | long poll | code | `LightningQueueConsumerBackgroundService.cs:3-17` |
| CE backend | Observation Manager | weather episodes (outbox) | tick every 10 s | code | `ObservationDispatch.cs:72` |
| CE backend | Observation Manager | lightning entries to Red, Fault, Offline (outbox) | tick every 5 s | code | `LightningObservationDispatch.cs:45` |
| sensors-service | Observation Manager | SOS, head impact, free fall observations | per event | code | `SS/CLAUDE.md:62,83` |
| App DB | Observation Manager and location | People, Zone, Space, ResourceDevice as foreign tables | query time | code | `OM.SNAP`; `LS/src/migrations/index.ts:17-18` |
| Warehouse pipelines | Warehouse | readings, observations, worker history | not determinable | stat | `KB/20-data/warehouse-and-analytics.md:102-108` |

### Dated beats (all dates are sourced above)

- 2025-05-01 first weather reading in production. [stat]
- 2025-05-25 backend repo first commit. 2025-06-02 first migration. [code]
- 2025-07-13 the Observation Manager gets weather observation fields. [code]
- 2026-07-26 the CE database has 10 tables. [code]
- 2026-08-19 creation auditing begins. [code]
- 2026-08-30 lightning tables (16 tables). [code]
- 2026-09-13 gas tables and the gas history route (23 tables). [code]
- 2026-09-20 weather observation outbox (27 tables) and the Observation Manager dedupe index. [code]
- 2026-09-24 lightning outbox. The inline sweep returns 410. [code]
- 2026-09-28 gas device mapping dropped. [code]
- 2026-10-01 observer control plane (31 tables). [code]
- 2026-10-03 oldest gas alert row on the live project. [live]
- 2026-10-04 production serves front end 1.0.7. 16 gas alerts. Lightning location columns land on master. [live, code]

### Counts to show

8 families. 31 tables. 24 of 31 carry a project id. 3 products. 7 hosted services. 33 agent tools (weather only). 9 hypertables in the sensors DB. 14 node types. 9 observation kinds. 16 join key rows (section 8.1). 14 seeded indicators. 16 weather channels. 70 days from 10 to 31 tables.

---

## 14. What the presentation can safely say, and what it must not

Safe (each has a status above):

- One backend, one database, 31 tables for three products. Up from 10 in 70 days. [code]
- Weather readings: 1.5 million by 10 Aug 2026, kept since May 2025. [stat]
- Every gas reading and alert is stored and never deleted. Gas history can be queried. [code]
- Lightning keeps every packet and every state change. [code]
- Verdicts are stored as episodes with the policy in force. [code]
- Every policy change is written to an append-only audit log. [code]
- On 4 Oct 2026 one live gas project showed 16 alerts, all from SOS or tipped-over events. [live]
- The keys to join workers, permits and machines exist in other services. The pool is not built. [vision]

Do not say:

- "Gas history is not stored." (It is.) Say "the gas screens do not show it yet".
- "Readings arrive every ten seconds." (Best measured: 1.2 minutes.)
- "Every station is registered and visible." (Counts conflict.)
- "One audit trail for all products." (Weather policy only.)
- "The agent can read gas or lightning." (33 weather tools.)
- "Gas alerts reach the Observation Manager." (Not built.)
- "Closing a gas alert closes it at the vendor." (WakeCap only.)
- "Lightning radii change the alarm." (Display only.)
- "A prediction model exists." (None.)
- "Worker exposure is tracked." (No.)
- "The pool exists." (Vision.)
