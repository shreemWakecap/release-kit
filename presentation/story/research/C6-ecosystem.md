# C6 Ecosystem: the WakeCap platform around Connected Environment

Research slice C6. Date 2026-10-05. Read-only research. This is the only file written. No repo, ticket or message was changed.

## 0. How to read this sheet

Status tags used on every fact:

- [live] seen working in production by the release kit (4 Oct 2026, build 1.0.7).
- [code] in the default-branch code at the cited ref. Deploy not verified.
- [test] seen only as test-environment data, recorded in a repo document.
- [plan] documented intent (a doc, an ADR or a plan file).
- [vision] nobody built it.
- [stat] a number from a document. I did not measure it.

Seam labels in section 8:

- plan = a small change inside an existing mechanism, scoped from a gap I verified in code. It is my proposal. No ticket or doc was found for it unless one is cited.
- vision = needs a new component or model that nobody has designed.

Evidence format: `ALIAS path:lines`. The alias table below gives the repo, the ref and the tip. To re-check a ref-based line in under a minute:

`git -C /Users/admin/wc/<dir> show <ref>:<path> | sed -n '<a>,<b>p'`

For working-tree items: `sed -n '<a>,<b>p' /Users/admin/wc/<dir>/<path>`.

Names: no customer or people names are used. Projects are "a live project". Branch names that carry a person's name are given as "a feature branch" plus a commit hash.

Important: I did not fetch. Local checkouts are stale or sit on feature branches. So most evidence is read from the freshest local remote ref. What changed on the remotes after the last local fetch is unknown.

### Alias table

| Alias | Dir under /Users/admin/wc | Ref read | Tip date | Local checkout and note |
|---|---|---|---|---|
| OM | wakecap-observation | origin/master 4df736e | 2026-09-30 | detached 0dbd7f7 (2026-09-29), 3 commits behind the ref |
| NOTIF | wakecap-notification | origin/master 1078fb1 | 2026-09-21 | master 1aa3526 (2026-08-01) |
| APP | wakecap-app-api | origin/master 66ff5127 | 2026-09-15 | feature branch 922067f9 (2026-08-12), 48 commits behind |
| SENS | sensors-service | origin/master-wakecap-2 7be6a96 | 2026-09-30 | master-wakecap-2 e969d3e (2026-07-08) |
| LOC | location-service | origin/master-wakecap-2 a362eb3 | 2026-09-16 | feature branch c412c81 (2026-08-11) |
| SAFE | safety-service | origin/master-wakecap-2 b270fef | 2026-08-01 | same commit |
| NODE | node-service | origin/master 5356819 | 2026-08-30 | checked out on test 262e8bf (2026-10-01). The node type enum is identical on origin/test. |
| DIAG | diagnostics-service | origin/master-wakecap-2 e6afa92 | 2026-08-05 | master-wakecap-2 0b90eb5 (2026-07-08) |
| IDS | identity-service | origin/master a83c422d | 2026-09-21 | feature branch 218539e8 (2026-08-19) |
| INT | wakecap-integrations | origin/master 83e7c16 | 2026-09-21 | master 1976bb4 (2026-08-30) |
| WG | worker-gear | origin/master 6e01dbb | 2026-09-07 | master b1e2053 (2026-08-17) |
| AC | access-controls/wakecap-access-controls | origin/master de99a23 | 2026-09-22 | feature branch 0432b5c (2026-09-07) |
| FE | frontend-2.0 | origin/master a5907a0e5 | 2026-09-30 | feature branch a8e66e05e (2026-08-12), 73 commits behind |
| FEOM | frontend-2.0-om | origin/main 73e1877 | 2026-09-29 | detached 17c2639 |
| FEMAP | frontend-2.0-maps | origin/master be722a1 | 2026-09-22 | master fc8e8a9 (2026-09-09) |
| MOB | mobile/flutter_wakecap | origin/main 6a7832bd8 | 2026-09-22 | a feature branch, not in origin/main |
| WC3 | wc3-platform | working tree (v0.98.1, 2026-09-06). origin/main is c4b012f (v0.124.1, 2026-09-24) | | main f7468ac |
| INFRA | infrastructure | working tree, master 0c17cb299 | 2026-09-22 | |
| KB | wc3-platform/docs/wc2-knowledge-base | working tree files, modified 2026-07-27 to 2026-08-02 | | A doc set. Source repos behind it are not in the workspace. |
| WSBE | weather-station/wakecap-weather-station | origin/master 8453a99 | 2026-10-04 | a feature branch 5cd5335 |
| WSFE | weather-station/frontend-2.0-weather-station | working tree, master 83b4d8d | 2026-10-05 | |
| RK | weather-station/release-kit | working tree | 2026-10-04/05 | |

Folders skipped by rule (24): app-api-promote-staging, app-api-promote-testing, conductor-worktrees, diagnostics-service.broken-empty-clone, frontend-2.0-maps-i18n, frontend-2.0-om-TAN-2769, frontend-2.0-remove-user, identity-service-hotfix-remove-user, identity-service-remove-user, idnetity-service (empty), location-service.broken-empty-clone, node-service-lightning-tests, node-service-worktrees, node-service.broken-empty-clone, pr-review-repos, review-repos, sensors-service-sos-logging, sensors-service-sos-nolocation, sensors-sos-nolocation-v2, triage-inbox, wakecap-app-api-bracelet-sos, wakecap-app-api-sos-nolocation, wakecap-observation-TAN-2768, worktrees.
Also not opened: slack-realtime (holds a credentials file), mobile keystore and provisioning files (names only seen), every .env and appsettings file.

## 1. Summary

Around Connected Environment sit a mesh ingest layer, a set of domain services and a portal made of micro-apps. Environmental data already has working hooks: the Observation Manager ingest (nine sources, WeatherStation among them), the notification rule engine (source, zone, company, package), location and zone data, and the safety-service zone alarm API. Work permits live in a separate Digital Work Permit service that is not cloned here. Its Terraform wires it to the Observation Manager ingest, and the Observation Manager code accepts six permit types from it. A legacy permit module in app-api and a Live Map layer in the portal also exist. Equipment lives in a separate equipments service with its own GPS database. In the mesh code, "asset" means a worn tag, not equipment. Four gaps matter most: weather observations carry no zone, SMS goes out only for ConnectedWorker events, Gas observation types are not on the Observation Manager type list, and permit observations get no company. Nothing was found for forecasting or automatic work-plan suggestions, so those are vision.

## 2. The platform in one screen (animation inventory)

### 2.1 Layers and component names

- Devices: 14 node types in the registry (asset, card_id, fob, anchor, gateway, sink, camera, gps_tracker, sim_card, heatstress_bracelet, safety_harness, weather_station, power_solution, lightning_sensor). [code]
  Evidence: `NODE src/utilities/enums.ts:1-16`.
- Gas detectors are not mesh nodes. They are vendor cloud devices read through the vendor API. [code]
  Evidence: `RK four-videos/_research/integration-and-devices.md:11` and `:26`, `NODE src/utilities/enums.ts:1-16` (no gas node type).
- Transport: Wirepas mesh, ESP32 gateway, AWS IoT Core, gateway-esp-backend-transport (the only decoder), IoT topic rules, SQS queues. [stat] (transport repo not in the workspace)
  Evidence: `KB 30-flows/worker-position-ingestion.md:31-64`.
- Ingest and device services in the workspace: sensors-service, location-service, diagnostics-service, node-service, safety-service, worker-gear. [code]
  Evidence: section 4 table A.
- Domain and response services in the workspace: wakecap-app-api, identity-service, wakecap-observation, wakecap-notification, wakecap-integrations, access-controls. [code]
  Evidence: section 4 table B.
- Services seen only in Terraform or the KB: wakecap-digital-work-permit, wakecap-pcc-work-permit, wakecap-equipments, wakecap-jobs, gateway-esp-backend-transport, position-engine-v2, job-scheduler-service, and others. [code]
  Evidence: `INFRA terraform/modules/wakecap-apps-aws/*.tf` (63 files), section 4 table F.
- UIs: portal shell and micro-apps (frontend-2.0, frontend-2.0-om, frontend-2.0-maps, frontend-2.0-access-controls, the Connected Environment app), Flutter mobile app. [code]
  Evidence: `FE AGENTS.md:9-26`, `:88-103`.
- Data: one TimescaleDB cluster with 36 databases, a warehouse (Azure SQL in the KB, Databricks Unity Catalog `wakecap_prod` in Terraform), an equipment lakehouse, and test-only Iceberg and Trino layers. [stat] for the DB list, [code] for the Terraform layers.
  Evidence: `KB 20-data/estate-map.md:12-24`, section 7 H8.

### 2.2 Internal service map (names and ports)

Sixteen internal service URLs are declared in one Terraform locals block. [code]
Evidence: `INFRA terraform/modules/wakecap-apps-aws/main.tf:78-93`.

| Service | Port | Evidence line |
|---|---|---|
| identity-service | 4009 | main.tf:78 |
| location-service | 3004 | main.tf:79 |
| observation | 1001 | main.tf:80 |
| app-api | 5001 | main.tf:81 |
| sensors-service-api | 3009 | main.tf:82 |
| diagnostics-service-api | 3008 | main.tf:83 |
| node-service | 3001 | main.tf:84 |
| position-engine-v2 | 6001 | main.tf:85 |
| job-scheduler-api | 3007 | main.tf:86 |
| integrations-service | 2001 | main.tf:87 |
| equipments-service | 1801 | main.tf:88 |
| notification-service | 1101 | main.tf:89 |
| compress-image-service | 3008 | main.tf:90 |
| digitalclinic | 5008 | main.tf:91 |
| digitalworkpermit | 5009 | main.tf:92 |
| trainingcenter | 5010 | main.tf:93 |

Other ports: weather-station backend 1201 (`INFRA terraform/modules/wakecap-apps-aws/weather-station.tf:29-30`), wakecap-jobs 8001 (`wakecap-jobs.tf:38-40`), safety-service 3005 (`SAFE CLAUDE.md:55`). [code]

### 2.3 Hop lists (platform level)

These are platform-level hops. Per-product detail belongs to the weather, lightning and gas path sheets (C2, C3, C4). Where this sheet overlaps them, the evidence lines are the check.

Path A, a worker safety event (SOS, head impact, free fall). [code] with [stat] for the transport hops.

1. Helmet button or motion sensor, mesh, ESP32 gateway, AWS IoT Core, gateway-esp-backend-transport. Evidence: `KB 30-flows/worker-position-ingestion.md:68-83`.
2. IoT rule `iot_sqs_sensors_wakecap_two_production` selects endpoints 10, 12, 13, 15, 25 into SQS `production_wakecap_two_sensors_queue`. Two more rules feed the same queue: altimeter endpoint 23 and step endpoint 238. Evidence: `INFRA terraform/aws/wakecap-main/us-west-2/prod/iot/rules.tf:855-864`, `:143-154`, `:1015-1020`.
3. sensors-service SQS mode: decode, format (node lookup through a foreign table), save, then `addObservation`. Evidence: `SENS CLAUDE.md:54-63`, `src/services/observation-service.ts:48-108`.
4. Worker lookup: app-api `GET /api/project/people/observation` with network id and serial. Evidence: `APP Wakceap.App.Web.API/Controllers/Directory/PeopleController.cs:1053-1066`, `SENS src/services/app-service.ts:46-83`.
5. `POST /api/ingest` on the Observation Manager with a client-credentials token. Evidence: `SENS src/services/observation-service.ts:182-208`, `src/services/app-service.ts:26-44`.
6. OM queues the envelope on MassTransit (Postgres transport), queue `observation-hight` for SOS, head impact and free fall. Evidence: `OM Wakecap.Observation.Core/Ingestion/IngestionService.cs:76-84`, `Infrastructure/Queue/MessageSender.cs:34-48`.
7. `SafetyEventObservationHandler` saves the observation. Evidence: `OM Core/Processors/Handlers/Common/ObservationHandlerResolver.cs:26-40`.
8. OM calls notification `POST /api/ingest` (topic `observation`). Evidence: `OM Core/Processors/Handlers/Common/BaseObservationHandler.cs:432-445`, `Infrastructure/RestServices/ExternalRestPaths.cs:71`.
9. Notification queues on `notification-queue`, filters RecipientRules, sends on Web, Mobile and SMS. Evidence: `NOTIF docs/ARCHITECTURE.md:98-127`, `Core/Dispatcher/NotificationDispatchHandler.cs:192-253`.
10. The mobile app deep-links into its Observation Manager module and acknowledges back on queue `notification-acknowledgment`. [stat] for the mobile hop. Evidence: `OM Infrastructure/Queue/Constants/ObservationQueues.cs:16-20`, `KB 30-flows/safety-alert-dispatch.md:77-85`.

Path B, a worker position. [code]

1. Neighbour scans reach location-service by MQTT. Evidence: `LOC CLAUDE.md:54-59`, `src/configs/pipeline.ts:7-9`.
2. The pipeline calls a position engine (client file `src/services/position-engine-service.ts`, URL from environment), then `publishLocation` to the MQTT topic template `{env}/asset/location/{project_id}/{space_id}/{node_id}`. Evidence: `LOC src/configs/position-engine.ts:1-3`, `src/pipeline.ts:143-145`, `src/utilities/services-helper.ts:59-66`.
3. location-service saves `asset_location` and `location_summary`. Evidence: `LOC src/models/asset-model.ts:5`, `src/models/location-summary.ts:6`.
4. app-api subscribes and saves `DeviceLocation`, `DeviceLocationSummary` (day grain) and `DeviceLocationLatest`. Evidence: `APP Wakecap.App.Core/MQTTServices/DeviceLocationMQTTService.cs:59-65`, `:117-140`, `Wakecap.App.Domain/Entity/Directory/DeviceLocationLatest.cs:10-38`.
5. Hourly ADF copy to the warehouse and the detected-shift algorithm. [stat] Evidence: `KB 30-flows/attendance-and-verifytime.md:34-60`.

Path C, an environmental reading. [code] unless marked.

1. Weather station sends Modbus frames on endpoint 61, device tag 0x01. Evidence: `SENS src/utilities/enums.ts:27-63`.
2. IoT rule `iot_sqs_sensors_weather_station_production` selects endpoint 61 into the same two-sensors SQS queue. Evidence: `INFRA terraform/aws/wakecap-main/us-west-2/prod/iot/rules.tf:890-898`.
3. sensors-service (service type `weatherStationSensor` resolves to the Modbus router) saves `weather_station_sensor` (16 measurement columns). Evidence: `SENS src/factories/sensor-factory.ts:32-37`, `src/models/weather-station-sensor-model.ts:4-98`.
4. The weather-station backend (port 1201) reads status from sensors-service `GET /api/projects/{id}/weather-station/status` and reads the latest readings from the sensors database. Evidence: `WSBE Wakecap.WeatherStation.Infrastructure/RestServices/ExternalRestPaths.cs:35-38`, `INFRA weather-station.tf:88-90`, `/Users/admin/wc/weather-station/Weather Station Architecture/06-runtime-data-flow.mmd:30-38`.
5. The backend sends `POST /api/ingest` with Source WeatherStation, Type = indicator, ExternalId = episode key. Evidence: `WSBE Wakecap.WeatherStation.Core/Products/WeatherStation/Observation/ObservationManagerSink.cs:54-87`.
6. Lightning: transport tag 0x06, IoT topic `received_lightning_data`, SQS `production_lightning_data_queue`, then the backend. Evidence: `INFRA terraform/aws/wakecap-main/us-west-2/prod/iot/lightning-ingestion.tf:16-33`, `:89`, `:191-195`, `weather-station.tf:126-129`, `RK four-videos/_research/integration-and-devices.md:25` (tag 0x06).
7. Gas: vendor cloud poll plus a push receiver that only acknowledges receipt. Evidence: `RK four-videos/_research/integration-and-devices.md:10`, `:26`.

### 2.4 Stores, queues and topics (names)

- Databases (KB, measured 2026-07-27): location 379.62 GiB, wakecap_app 168.18, diagnostics 34.69, vlm 19.27, sensors 14.87, wakecap_equipments 13.99, wakecap_observation 12.65, wakecap_integrations 12.52, wakecap_notification 3.57, node 0.20, wakecap_identity 0.14, wakecap_workergear 0.07, safety 0.02, weather-station 0.01. [stat]
  Evidence: `KB 20-data/estate-map.md:51-82`.
- OM queues: observation-low, observation-medium, observation-hight (sic), notification-acknowledgment, notification-closed. [code]
  Evidence: `OM Wakecap.Observation.Infrastructure/Queue/Constants/ObservationQueues.cs:9-20`.
- Notification queues: notification-queue and external-notification-queue (own DB bus), notification-acknowledgment (shared bus DB). [code]
  Evidence: `NOTIF docs/ARCHITECTURE.md:264-270`.
- IoT SQS queues named in Terraform: production_wakecap_two_sensors_queue, production_sensors_queue, production_lightning_data_queue, production_modbus_unparsed_queue, heatstress_queue_production, corrupted_message_queue_production. [code]
  Evidence: `INFRA terraform/aws/wakecap-main/us-west-2/prod/iot/rules.tf:154`, `:134`, `:205`, `lightning-ingestion.tf:89`, `:107`, `heatstress-queue.tf:24`.

## 3. Provenance caveats that change what you can claim

- The local checkouts of app-api, location-service, identity-service, frontend-2.0 and sensors-service are behind their remotes by weeks. Facts come from remote refs as of the last local fetch. [code]
  Evidence: the alias table above. Command: `git -C /Users/admin/wc/<dir> rev-list --left-right --count <ref>...HEAD`.
- The Digital Work Permit repo, the equipments repo, wakecap-jobs and the transport repo are not in the workspace. Their facts come from Terraform and from the KB. [code] for Terraform, [stat] for KB.
  Evidence: `find /Users/admin/wc -maxdepth 3 \( -iname '*permit*' -o -iname '*ptw*' \)` returned nothing. The only `*equipment*` name is `infrastructure/traccar-deploy/equipment-service` (deploy files).
- The KB is a doc set dated 2026-07-27 to 2026-08-02. It describes the Digital Work Permit service as an empty scaffold. Code from September 2026 says otherwise (section 5). Treat KB as older than the code. [stat]
  Evidence: `KB 10-services/wakecap-digital-work-permit/overview.md:22-29` versus `OM Wakecap.Observation.Domain/Constants/ObservationsHierarchy.cs:158-192`.
- Production state seen live by the release kit on 4 Oct 2026: front-end build 1.0.7 is served (public runtime config checked at 16:34 and 17:00). [live]
  Evidence: `RK four-videos/_research/refresh-1.0.7.md:4`.
- The Gas acknowledge and close backend is deployed in production. Rows changed to Closed between 4:40 and 4:46 PM on 4 Oct 2026. [live]
  Evidence: `RK four-videos/_research/refresh-1.0.7.md:17-18`.
- Gas shows in the rail, in Connected Products and in a project header on the live portal. [live]
  Evidence: `RK internal-notes.md:42`.

## 4. Component catalogue

Table A: mesh, device and location services (Node and TypeScript, Ts.ED).

| Repo (alias) | Purpose | Stack | Owned data | Calls and called by | Environment and safety relevance | Evidence |
|---|---|---|---|---|---|---|
| sensors-service (SENS) | Decodes mesh sensor frames and stores them. Raises SOS, head impact and free fall events. Hosts the weather-station status API. | Node 18+, TypeScript, Ts.ED 6.133, TypeORM 0.3 on TimescaleDB, RxJS, SQS, MQTT connector, protobufjs, Firebase Admin, Twilio. Version 2.1.0. Modes: pipeline, sqs, api (port 3009). | Database `sensors`: impact, free fall, panic alert, altimeters, weather_station_sensor and summary, sensor_data, project_configuration. Foreign tables `node` and `anchor_meta`. | Calls app-api (worker lookup, people query), identity (token), node-service (bulk node save), OM `POST /api/ingest`, Firebase (legacy), Twilio and Cequens SMS. Called by the weather-station backend (status API). The caller of `POST /api/weather-station/node-sync` was not found. | The mesh entry for weather (endpoint 61, tag 0x01) and the SOS path. | `SENS CLAUDE.md:34-84`, `package.json`, `src/utilities/enums.ts:27-63`, `src/controllers/weather-station-controller.ts:17-47`, `src/services/observation-service.ts:48-208` |
| location-service (LOC) | Turns neighbour scans into positions, stores and serves them, publishes asset locations. Zone and anchor health. | Node 16-22, TypeScript, Ts.ED 7.87, TypeORM, PostGIS and TimescaleDB, RxJS, SQS, MQTT. Version 5.1.0. 38 routes. | Database `location`: asset_location, anchor_scans, location_summary, zone_health_summary view. Foreign tables Zone, Space, ResourceDevice. | Calls position engine, diagnostics-service, node-service, integrations (camera), notification external ingest (an email digest). Publishes MQTT asset locations that app-api consumes. | Worker positions and zone resolution. A worker position is a point in a space, matched to zone polygons. | `LOC CLAUDE.md:44-88`, `src/models/asset-model.ts:5-105`, `src/models/zone-model.ts:5-44`, `src/configs/foreign-server.ts`, `src/configs/*.ts`, `src/utilities/notification-service-helper.ts:45-64`, `KB 00-platform/context-map.md:70-73` |
| diagnostics-service (DIAG) | Device and network diagnostics from the mesh. | Node 20+, TypeScript, Ts.ED 7.87, TypeORM, Redis. Version 3.1.0. API port 3008. | Database `diagnostics`: node diagnostics (voltage, buffer, radio), traffic, neighbour, boot, firmware, debug. | Reads MQTT or SQS. Called by location-service. | Station and gateway health inputs (battery, voltage, firmware). | `DIAG CLAUDE.md:5-7`, `README.md:91-107`, `package.json` |
| node-service (NODE) | Device registry for all node types and the mesh network. | Node 16+, TypeScript, Ts.ED 6.133, TypeORM, PostGIS, Redis. Branches test, staging, master. 46 routes. Port 3001. | Database `node`: network, node, node meta, node audit, cellular provider. | Called by sensors-service, location-service, equipments, weather-station backend. | Registers weather_station and lightning_sensor nodes. Keys: node id, serial_no, network_id, project_id. | `NODE CLAUDE.md:4`, `:57-98`, `src/utilities/enums.ts:1-30`, `src/controllers/weather-station-controller.ts:14-94` |
| node-status-service | Tracks mesh node online and offline state. Stale. | Node, TypeScript. Last commit 2021-04-04 on an old branch. | None found. | None found. | None. | `/Users/admin/wc/node-status-service/README.md:1-4`, `git log -1` |
| safety-service (SAFE) | Sends alarms and evacuations to helmets through gateways and records acknowledgements. | Node 16+, TypeScript, Ts.ED 6.133, TypeORM, RxJS, workerpool, MQTT connector. Version 3.0.0. Port 3005. | Database `safety`: safety, safety details, session resources, device acknowledgements. Foreign tables node, zone, location summary. | Calls app service (assembly zones, people, zones) and identity (timezone). Publishes Wirepas protobuf to gateways. | The only built actuation path to workers: a zone-targeted alarm. | `SAFE CLAUDE.md:47-121`, `src/controllers/safety-controller.ts:18-33`, `src/dtos/safety-dtos.ts:34-56` |

Table B: domain, safety response and identity services (.NET 8 unless stated).

| Repo (alias) | Purpose | Stack | Owned data | Calls and called by | Environment and safety relevance | Evidence |
|---|---|---|---|---|---|---|
| wakecap-observation (OM) | Stores observations from many sources, groups them, notifies, and serves the Observation Manager. | .NET 8, EF Core 8, Npgsql with NetTopologySuite, MassTransit 8.4 on a Postgres transport, RabbitMQ client (camera AI), MQTTnet, Refit, PuppeteerSharp, Anthropic SDK and Agents AI. 8 controllers, 53 HTTP attributes. Port 1001. | Database `wakecap_observation`. Foreign tables Company, People, Device, Space, Zone, Package, Trade, Training, User. | Called by sensors-service, weather-station backend, worker-gear, app-api, DWP (Terraform) and equipments (KB). Calls notification (`/api/ingest`, `/dispatcher/me`), app-api (package access policy), identity. | The alert sink for environmental events. Nine sources. | `OM Wakecap.Observation.Infrastructure/Wakecap.Observation.Infrastructure.csproj:23-60`, `Web.API/Controllers/Ingest/IngestController.cs:11-24`, `Domain/Entity/External/*.cs`, `Infrastructure/RestServices/ExternalRestPaths.cs:13-77`, `KB 00-platform/context-map.md:59-60` |
| wakecap-notification (NOTIF) | Fan-out engine. Resolves recipients from rules, renders templates, sends, tracks acknowledgements. | .NET 8, EF Core, MassTransit on Postgres, Refit, Scriban 6.2, FirebaseAdmin, SignalR with Redis backplane, Twilio, Azure email. 4 controllers. Port 1101. | Database `wakecap_notification`: RecipientRule, MessageTemplate, trackers, acknowledgements, three materialized views. | Called by OM (`/api/ingest`, `/dispatcher/me`), DWP and location-service (`/api/ExternalIngest`). Calls app-api and the admin service. | Decides who is told, by which channel, about which zone and company. | `NOTIF docs/ARCHITECTURE.md:10-27`, `:98-127`, `:284-293`, `Infrastructure/*.csproj`, `Domain/Entity/Dispatcher/RecipientRule.cs:10-42` |
| wakecap-app-api (APP) | Workforce and project core: people, companies, packages, spaces, zones, device assignment, locations, permits (legacy), attendance proxy. | .NET 8, EF Core 8 (Npgsql, SQL Server for the warehouse), MQTTnet, Firestore client (legacy), MediatR, Refit. 37 controllers, 273 HTTP attributes. Port 5001. | Database `wakecap_app`: People, Company, Package, Space, Zone, ZoneCategory, ResourceDevice, DeviceLocation, DeviceLocationLatest, DeviceLocationSummary, WorkPermit family. | Called by sensors-service, OM, notification, worker-gear, portal. Subscribes to location MQTT. Calls the OM ingest for zone violations, unfit worker and expired training. | Zones, spaces, worker-device mapping, restricted zones. | `APP README.md:3`, `:51-83`, `Wakceap.App.Web.API/*.csproj`, `Wakecap.App.Infrastrcture/RestServices/Observation/IObservationService.cs:17-25` |
| identity-service (IDS) | Authentication, roles, permissions, projects, project settings, module toggles. | .NET 6, IdentityServer4 4.1.2, EF Core 7, PostgreSQL. 24 controllers, 128 HTTP attributes. Port 4009. | Database `wakecap_identity`, shared `authorization` database. | Called by the portal and by services for tokens and permissions. Services seed their module permissions here. | Permission model, tenant and project claims, project calendar and hours settings. | `IDS README.md:3`, `:41-50`, `Wakecap.Identity.Domain/Entity/Admin/Project.cs:20-71`, `Web/Controllers/Identity/AuthorizationExternalSeedingController.cs:27-41` |
| worker-gear (WG) | Heat-stress bracelet and safety-harness telemetry. Publishes wearable alerts to OM. | .NET 8, EF Core 8, AWS SQS, MQTTnet, GCS. 6 controllers. | Database `wakecap_workergear`. | Reads SQS. Calls OM `POST /api/ingest` and app-api for the worker. | Per-worker heat exposure. The closest precedent for a wearable alert with worker identity and location. | `WG README.md:1-39`, `Wakecap.WorkerGear.Contracts/DTO/Observations/ObservationManagerIngestRequestDto.cs:5-31`, `Core/Services/Observations/ObservationExternalIdFactory.cs:8-36` |
| wakecap-integrations (INT) | Customer system integrations: cameras, employee time tracking, compliance dashboards, worker signup. | .NET 8, EF Core 9, PostgreSQL. 22 controllers. Port 2001. | Database `wakecap_integrations`. | Called by location-service (camera status). Calls external systems: HikCentral and Kerberos cameras, the KSPF time-tracking API, Metabase. | Camera status for site views. | `INT README.md:3`, `:20-24`, `:49-115` |
| access-controls backend (AC) | Hikvision door panels: access levels, device sync, door events. | .NET 8, EF Core 8, PostGIS, native SDK listener on TCP 7660 and 7661. 18 controllers, 98 HTTP attributes. | Database `wakecap_accesscontrols`. | Calls identity and app-api. Called by wakecap-jobs (internal jobs). | Possible gate presence feed. The KB marked the DB dormant on 2026-07-27. | `/Users/admin/wc/access-controls/access-controls-architecture-deep-dive.md:9-17`, `:19-60`, `:62-70`, `KB 20-data/estate-map.md` row wakecap_accesscontrols |

Table C: platform and infrastructure.

| Repo | Purpose | Stack | Owned data | Calls and called by | Relevance | Evidence |
|---|---|---|---|---|---|---|
| infrastructure (INFRA) | Terraform and Kubernetes for AWS and GCP. One file per deployed app. | Terraform. AWS: us-east-2 prod, us-west-2 test, stage and the IoT broker layer. GCP: me-central2 layers. | None. Defines everything else. | Deploys all services. | The authoritative list of deployed apps, ports, queues and warehouse layers. | `INFRA CLAUDE.md:19-36`, `terraform/modules/wakecap-apps-aws/` (63 files) |
| wc3-platform (WC3) | Ontology-backed product platform for construction operations. The planned successor platform. [plan] | A .NET solution (Wc3Platform.slnx), an API and a web app on PostgreSQL. 56 decision records. | Spec, docs, KB, three product folders. | No live consumer found in the workspace. | The planned home of a unified data model. | `WC3 README.md:3-6`, `:29-31`, `products/README.md:3-4`, `decisions/ADR-*.md` |

Table D: frontends.

| Repo | Purpose | Stack | Evidence |
|---|---|---|---|
| frontend-2.0 (FE) | The portal shell and micro-apps. Root config, nav, pm, om, admin, map-tools, worker-signup. The legacy `ws` app was removed. | React 18.2, TypeScript 5.2, single-spa 5.9, SystemJS, pnpm and Lerna. | `FE AGENTS.md:9-26`, `:38-57`, `git log` commit 4cff7ca34 (2026-08-11) |
| frontend-2.0-om (FEOM) | The standalone Observation Manager micro-app. Mounted at `/project/:projectId/om/*`. | React 18, TypeScript 5, single-spa, TanStack Query. | `FEOM README.md:3-17` |
| frontend-2.0-maps (FEMAP) | Map management: spaces, zones, devices (anchors, gateways, cameras, weather stations). | React 18, ArcGIS Maps SDK, MUI 7. | `FEMAP readme.md:3-24`, `:47-63` |
| frontend-2.0-access-controls | Access Controls micro-app. | React 18, single-spa. | `AC` deep dive `:23-25` |
| frontend-helpers | Shared HTTP, cookie and logging helpers, version 2.3.1. | TypeScript, Rollup. | `/Users/admin/wc/frontend-helpers/package.json`, `README.md:1-18` |
| Connected Environment app (WSFE) | `@wakecap-fe/connected-environment-app`, route base `/:projId/connected-env`, children weather-station, lightning, gas, reports, settings. | React, react-router. | `WSFE src/app/routes.tsx:112-170`, `package.json:2` |
| flutter_wakecap (MOB) | Mobile apps `wakecap_mobile_v2` and `wakecap_worker_app` plus shared packages. On origin/main it shows a weather alert card inside the Observation Manager details. Dedicated weather station screens exist only on a feature branch. | Flutter, melos monorepo. | `ls /Users/admin/wc/mobile/flutter_wakecap/{apps,packages}`, `git ls-tree -r origin/main --name-only` (weather_alert_card.dart) |

Table E: prototypes, sandboxes, plans and hardware.

| Folder | What it is | Evidence |
|---|---|---|
| Observation-Manager-V2 | A Vite prototype of an org and project dashboard. Last commit 2026-02-18. Not the production OM. [code] (prototype) | `Observation-Manager-V2/README.md:1-14`, `git -C Observation-Manager-V2 log -1` |
| gate-pass | A vehicle gate pass prototype (QR pass, plate, approval) as HTML files and a technical proposal PDF. No service code. "Permit" here means a vehicle entry permit. [code] (prototype files) | `unzip -l "GatePass Technical.zip"` (4 files), `gate-pass/Technical /GatePass v1.7.html` (string "Vehicle Entry Permit") |
| asset | KiCAD PCB design files for helmet tags. Last commit 2023-05-30. Not software. [code] | `asset/README.md:1-4`, `git -C asset log -1` |
| Gas | A plan file for the Blackline integration (dated 2026-08-26). The built path lives in the weather-station backend. [plan] | `Gas/blackline-integration-plan.md:42-63`, `WSBE .../GasDetector/` |
| blackline-probe, blackline-push-simulator | Sandboxes that call the vendor API and the push receiver. | `blackline-push-simulator/README.md:3-15`, `:48-54` |
| connected-env/Lightning | Empty folder. | `ls -la /Users/admin/wc/connected-env/Lightning` |
| wakecap-tools, idnetity-service | Empty folders. | `ls /Users/admin/wc/wakecap-tools` |

Table F: services seen only in Terraform or the KB (not in the workspace).

| Service | What the evidence says | Evidence |
|---|---|---|
| wakecap-digital-work-permit | Deployed as `digitalworkpermit` on port 5009 with its own database. [code] | `INFRA .../digitalworkpermit.tf:58`, `:70-72`, `:365` |
| wakecap-pcc-work-permit | A small replica of an older permit tracker for three sites. Marked for sunset. Not the Digital Work Permit. [code] | `INFRA .../pccworkpermit.tf:35-39` |
| wakecap-equipments | Fleet equipment, GPS tracking on a bundled Traccar, alert engine, journeys, CO2, AI agents. Database `wakecap_equipments`. [stat] | `KB 10-services/wakecap-equipments/overview.md:22-72`, `INFRA .../equipments-service.tf`, `main.tf:88` |
| wakecap-jobs | A Quartz scheduler. Calls services on a timer with one API key and a client id. [code] | `INFRA .../wakecap-jobs.tf:56-57`, `:46-52` |
| gateway-esp-backend-transport | The only decoder of gateway binary frames. [stat] | `KB 30-flows/worker-position-ingestion.md:76-83` |
| position-engine-v2 | Stateless RSSI trilateration, port 6001. [stat] | `INFRA main.tf:85`, `KB 30-flows/worker-position-ingestion.md:51` |
| job-scheduler-service | Cross-service sync jobs. Port 3007. | `INFRA main.tf:86`, `KB 20-data/estate-map.md` row job_scheduler |
| equipment-data-pipeline | Databricks bronze, silver, gold for equipment telemetry, every 2 hours. [stat] | `KB 10-services/equipment-data-pipeline/overview.md:22-39` |
| siteguard-v2 and others | Camera AI violations. Digital clinic, training center, wecare, on-site-support, capture-service. | `INFRA terraform/modules/wakecap-apps-aws/` file names |

## 5. Work permits: where they live

Five permit-related things exist: the Digital Work Permit service (DWP, the current line), a legacy permit module in app-api with Novade rows, a Live Map layer in the portal, permit settings in identity-service, and two lookalikes (PCC Work Permit and gate-pass).

### 5.1 Digital Work Permit service (DWP), the current line

- DWP is deployed as a Kubernetes app named `digitalworkpermit` on port 5009, with Serilog application name `DigitalWorkPermit-Service`. Its Terraform says the deployed image builds from the `testing` branch and master is a scaffold. [code]
  Evidence: `INFRA terraform/modules/wakecap-apps-aws/digitalworkpermit.tf:26-29`, `:58`, `:70-72`, `:365-366`.
- DWP uses its own database `wakecap_digitalworkpermit` (stage: `wakecap_digitalworkpermit_stg`). [code]
  Evidence: `INFRA .../digitalworkpermit.tf:74-79`.
- DWP calls the Observation Manager `POST /api/ingest` and notification `POST /api/ExternalIngest`. The Terraform comment records a check against the test services on 2026-08-09 (GET returned 405, so the POST route exists) and a past misconfiguration that silently stalled zone-drift ingestion. [code]
  Evidence: `INFRA .../digitalworkpermit.tf:99-121`.
- DWP reads the app database through postgres_fdw foreign tables (People, Zone and others). The KB plan says this is to place a receiver inside a permit zone. [code] for the wiring, [plan] for the purpose.
  Evidence: `INFRA .../digitalworkpermit.tf:143-171`. KB plan lists People, Zone, Space, DeviceLocationLatest, ResourceDevice, Company, Workshift: `KB 10-services/wakecap-digital-work-permit/overview.md:52-61`.
- `wakecap-jobs` calls DWP `POST /api/project/zonedrift/detect` every 5 minutes. [code]
  Evidence: `INFRA .../digitalworkpermit.tf:123-124`.
- The Observation Manager has a source `DigitalWorkPermit` with six types: PermitZoneDrift, PermitIssuerZoneDrift, PermitWorkingHoursExceeded, PermitExpiredWhileActive, PermitMissingReceiver, PermitMissedDailySignoff. One handler serves all six. [code]
  Evidence: `OM Wakecap.Observation.Domain/Constants/ObservationsHierarchy.cs:158-192`, `Core/Processors/Handlers/Common/ObservationHandlerResolver.cs:100-119`.
- Dedupe key for permit observations: Identifier = `{ExternalId}:{ResourceId}` (permit number plus worker id) plus Type, excluding soft-deleted rows. Permit-level findings use `{permitNumber}:`. [code]
  Evidence: `OM Core/Processors/Handlers/DWPZoneDriftObservationHandler.cs:69-73`, `:94-119`, `:25-27`.
- The code comment calls PermitZoneDrift "live in production". The commit that added the other five types says "for the DWP production release" (2026-09-22). So full production state is not proven. [code]
  Evidence: `OM ObservationsHierarchy.cs:173-175`; `git -C /Users/admin/wc/wakecap-observation log -1 92d437a --format='%h %ad %s' --date=short`.
- A test project holds DWP observation rows (recorded 2026-09-17 in the OM README). They carry zoneId and no spaceId, and null company and package. [test]
  Evidence: `OM README.md:35-36`, `:46-55`.
- The company resolver has no branch for the DWP entity. So permit observations get no company or package from the resolver. [code]
  Evidence: `OM Core/Processors/Handlers/Common/ObservationCompanyResolver.cs:30-50` and `DWPZoneDriftObservationHandler.cs:64`.
- The KB called DWP an empty scaffold on 2026-07-27 (zero entities, four commits). The Observation Manager code and the Terraform module are later. [stat]
  Evidence: `KB 10-services/wakecap-digital-work-permit/overview.md:22-29`.
- The DWP repo, its entities, endpoints and UI are not in the workspace. No DWP package exists in frontend-2.0. [code]
  Evidence: `git -C /Users/admin/wc/frontend-2.0 ls-tree -r origin/master --name-only | rg -i -c 'dwp|digital-?work'` prints nothing. The 19 files matching `workpermit` are all under `packages/web/map-tools`.
- Two DWP demo deployments exist in Terraform: a temporary second instance and a stub contract server for an authority gate demo. [code]
  Evidence: `INFRA terraform/modules/wakecap-apps-aws/digitalworkpermit-poc.tf:1-8`, `digitalworkpermit-r*-stub.tf:1-5`.

### 5.2 Legacy permit module in app-api

- app-api has a `DigitalPermit` module: entities WorkPermit, WorkArea, WorkPermitActivity, lookup PermitActivity, and NovadeWorkPermit. [code]
  Evidence: `APP Wakecap.App.Domain/Entity/DigitalPermit/*.cs`, `Entity/Lookup/PermitActivity.cs:13`.
- WorkPermit keys: ProjectId (Guid), CompanyId, AreaId, WorkshiftId, IssuerId, ReceiverId, ApprovedById, and a free-text `Equipment` field. Statuses: approved, pending_approval. [code]
  Evidence: `APP Wakecap.App.Domain/Entity/DigitalPermit/WorkPermit.cs:22-67`, `Constant/WorkPermitStatus.cs:9-13`.
- NovadeWorkPermit keys: ExternalPermitId, ProjectId, ZoneId, SpaceId, Location point, StartDate, EndDate, PermitType. [code]
  Evidence: `APP Wakecap.App.Domain/Entity/DigitalPermit/NovadeWorkPermit.cs:9-30`.
- Endpoints: a paged list of Novade permits (action `GetNovadeWorkPermit`, project-scoped route; the portal calls `/project/{projId}/workpermit`) and `GET /api/project/{projectId}/space/{spaceId}/WorkPermit` (explicit route, GeoJSON, active permits with a location). Permission `mpvew:work_permit_view`. The project-scope route attribute comes from a framework package that is not in the workspace. [code]
  Evidence: `APP Wakceap.App.Web.API/Controllers/DigitalPermit/WorkPermitController.cs:24-26`, `:37-65`, `Wakecap.App.Domain/Constant/Permissions.cs:338-348`, `FE .../WorkPermits/workPermitsAPIUrls.ts:7-22`.
- The Novade sync job was decommissioned on 2026-07-27 (credentials rejected since 2026-07-17). So Novade rows are old. [stat]
  Evidence: `KB 30-flows/external-integrations.md:52`.
- app-api README lists a Digital Permit module in its key modules. [code]
  Evidence: `APP README.md:77-83`.

### 5.3 Portal UI for permits

- The Live Map and MCC modes in map-tools show a Work Permits layer. API URLs: `{SERVICES_API_URL}/project/{projId}/workpermit` and `/space/{spaceId}/workpermit`. Item fields: id, spaceId, spaceName, externalId, name, owner, type, status, externalLocation, location, startDate, endDate, createdAt. [code]
  Evidence: `FE packages/web/map-tools/src/app/modules/MCC/modes/LiveMap/WorkPermits/workPermitsAPIUrls.ts:7-22`, `.../LiveMap/interfaces/WorkPermitsInterfaces.ts:3-20`.
- Portal routes for these screens: `/project/:id/livemap/*` and `/project/:id/mcc/*`. [code]
  Evidence: `FE AGENTS.md:137`, `:139`.
- The portal routes now come from a server catalog: `GET {VERTEX_API_URL}/layout-configs`. The route table in the repo is no longer the source. [code]
  Evidence: `FE packages/web/root-config/src/layout-config/apiUrls.ts:9-13`, `types.ts:11-46`.

### 5.4 Permit settings in identity-service

- Project settings hold `WorkPermitMaxRevalidation` and `WorkPermitExtentionDuration`. Four other services copy these fields into their project DTO. [code]
  Evidence: `IDS Wakecap.Identity.Domain/Entity/Admin/Project.cs:61-62`, `AC Wakecap.AccessControls.Contracts/DTO/ExternalRest/Admin/ProjectDto.cs:21-22`, `NOTIF Wakecap.Notification.Contracts/DTO/ExternalRest/Admin/ProjectDto.cs:22-23`, `INT Wakecap.Integration.SharedKernal/DTO/WakecapApp/ProjectDto.cs:23-24`, `WG Wakecap.WorkerGear.Contracts/DTO/ExternalRest/Admin/ProjectDto.cs:21-22` (working-tree reads).

### 5.5 Lookalikes and a sunset item

- PCC Work Permit is a small sunset module for three sites. Its own Terraform says it is not Digital Work Permit. [code]
  Evidence: `INFRA .../pccworkpermit.tf:35-39`.
- gate-pass is a vehicle entry permit prototype. It has no work permit data model. [plan]
  Evidence: `/Users/admin/wc/gate-pass/Technical /GatePass v1.7.html` (string "Vehicle Entry Permit"), `rg -c -i 'work permit'` returned no match.
- Searches in safety-service, location-service, sensors-service, node-service and diagnostics-service for permit, ptw and work permit returned 0 files. access-controls matched only vendor docs and a DTO copy. [code]
  Evidence: `rg -l -i 'work[ _-]?permit|\bptw\b|permit[ _-]to[ _-]work|digitalworkpermit' <repo>` per repo.

## 6. Equipment and assets: where they live

### 6.1 Equipment

- Equipment lives in the equipments service (`wakecap-equipments`), split out of app-api in 2026. It owns database `wakecap_equipments` (13.99 GiB, 121 tables). Portal route `/project/:id/equipments/*` loads `@wakecap-fe/equipments-app` from repo `frontend-2.0-equipments`. [stat] for the service, [code] for the route and internal URL.
  Evidence: `KB 10-services/wakecap-equipments/overview.md:29-36`, `FE AGENTS.md:98`, `:142`, `INFRA main.tf:88`.
- Equipment data model (KB): equipments, avl_devices, tc_devices, tc_positions (hypertable candidate, key id and fixtime), alert_history, geofences with PostGIS geometry, 20 alert checkers, journeys. [stat]
  Evidence: `KB 10-services/wakecap-equipments/data.md:27-38`, `overview.md:59-72`.
- The Observation Manager has a vehicle source, AVL, with types SpeedViolation, Seatbelt, Mobile, OnCall, SeatbeltAndOnCall, SeatbeltAndMobile. The AVL entity keys on PlateNumber (plus Speed, SpeedLimit, RoadName), not an asset id. Grouping is off. [code]
  Evidence: `OM Domain/Constants/ObservationsHierarchy.cs:43-51`, `Domain/Entity/Observations/AVLObservation.cs:10-17`, `Core/Processors/Handlers/AVLObservationHandler.cs:104-112`.
- The KB says the equipments service forwards alert events to the Observation Manager through `IngestVehicleViolationObservation`. The equipments code is not in the workspace, so the source name it sends was not verified. [stat]
  Evidence: `KB 10-services/wakecap-equipments/interfaces.md:58`.
- Vehicle and equipment trackers are registry nodes of type `gps_tracker` (3,845 on the 2026-07-28 count) with node-service routes for trackers and SIM cards. [stat] for the count, [code] for routes.
  Evidence: `KB 00-platform/device-model.md:34`, `NODE src/controllers/gps-tracker-controller.ts:17-94`.
- Equipment analytics are a separate Databricks pipeline (raw, silver, gold on Unity Catalog `wakecap_prod`), run every 2 hours. [stat]
  Evidence: `KB 10-services/equipment-data-pipeline/overview.md:22-39`.
- The app-api README still advertises an Equipment module with `/api/v{version}/projects/{projectId}/equipments`. On origin/master there are no equipment source files, only 2025 migrations. The README is stale. [code]
  Evidence: `APP README.md:63-75`; `git -C /Users/admin/wc/wakecap-app-api ls-tree -r origin/master --name-only | rg -i 'equip' | rg -v Migrations` returned nothing.
- No "plant" entity was found. [code]
  Evidence: the same listing for `plant` matched only an unrelated migration name.
- A permit carries equipment only as a free-text string. There is no equipment id link in the permit data. [code]
  Evidence: `APP Wakecap.App.Domain/Entity/DigitalPermit/WorkPermit.cs:35-36`.

### 6.2 "Asset" in the mesh code means a worn tag

- In location-service an asset node is type ASSET, CARD_ID or FOB. These are worker wearables. [code]
  Evidence: `LOC src/utilities/services-helper.ts:68-84`.
- In node-service "assets" are listed beside cards, FOBs, anchors, gateways and sinks. [code]
  Evidence: `NODE CLAUDE.md:4`.
- The `asset` folder is hardware: "Asset hardware which are used in helmets for safety and tracking". [code]
  Evidence: `/Users/admin/wc/asset/README.md:3-4`.
- 94,621 `asset` devices were registered on 2026-07-28 (the helmet tag). [stat]
  Evidence: `KB 00-platform/device-model.md:31`.
- Routes use AssetId in the location-service sense: `/projects/:project_id/assets/:asset_id` and `/projects/:project_id/spaces/:space_id/assets/locations`. [code]
  Evidence: `LOC src/controllers/asset-controller.ts:18`, `:83`.
- Naming trap: the map micro-app README describes "Assets" as "Tracked equipment and machinery". The data behind it is the wearable asset API. [code]
  Evidence: `FEMAP readme.md:24`.

## 7. Existing hooks environmental data can use

### H1. Observation Manager ingest

- Endpoint: `POST /api/ingest` (route `api/[controller]`), requires a bearer token. It returns `{IngestionId, ReceivedAt}` after queueing, not after saving. [code]
  Evidence: `OM Wakecap.Observation.Web.API/Controllers/Ingest/IngestController.cs:11-24`, `Contracts/DTO/Messages/ObservationIngestResult.cs:9-18`, `Core/Ingestion/IngestionService.cs:38-64`.
- Envelope: Sender, ProjectId (Guid), IngestionId, Source, SourceAPIKey, Type, Entries[]. Entry: GeneratedAt, Description, Identifier, Payload (object), ExternalId. [code]
  Evidence: `OM Contracts/DTO/Messages/ObservationEnvelope.cs:9-19`, `ObservationEntry.cs:9-30`.
- Nine sources: ConnectedWorker, AVL, CCTV, Manual, QRCode, ClinicViolation, TrainingCenter, DigitalWorkPermit, WeatherStation. Nine handler classes. [code]
  Evidence: `OM Domain/Constants/ObservationsHierarchy.cs:14-231`, `git ls-tree -r origin/master --name-only | rg 'Processors/Handlers/[A-Za-z]+ObservationHandler\.cs$'`.
- WeatherStation has 14 types: HeatIndex, Temperature, WindSpeed, DustParticles, Rainfall, BarometricPressure, WindDirection, AirHumidity, PM10, CO2, TSP, H2S, CO, Lightning. [code]
  Evidence: `OM ObservationsHierarchy.cs:194-216`.
- Since 2026-09-30 an unknown WeatherStation Type is rejected at the resolver and counted. A Lightning DangerCategory must be one of RED, ORANGE, YELLOW, GREEN, UNKNOWN, OFFLINE, FAULT. [code]
  Evidence: `OM Core/Processors/Handlers/Common/ObservationHandlerResolver.cs:74-88`, `WeatherStationObservationHandler.cs:66-98`, `ObservationsHierarchy.cs:226-230`, commit 73c1b9f.
- Queue priority is chosen from Type alone. High: SOS, HeadImpact, FreeFall, Un-Fit-Worker, WorkerGear alert types, Lightning. Low: ZoneTimeViolation, RestrictedZoneViolation. Medium: everything else, including weather indicators. [code]
  Evidence: `OM Core/Ingestion/IngestionService.cs:70-113`.
- Dedupe keys by source: [code]
  - SafetyEvent (SOS and the rest of ConnectedWorker safety events): `{ResourceId}|{GeneratedAt yyyy-MM-dd HH:mm:ss}|{Type}`. Evidence: `OM Core/Processors/Handlers/SafetyEventObservationHandler.cs:135-139`.
  - WeatherStation: (ProjectId, ExternalId) when an ExternalId is sent. A partial unique index backs it. No ExternalId means no dedupe. Soft-deleted rows still count. Evidence: `OM .../WeatherStationObservationHandler.cs:151-223`.
  - DigitalWorkPermit: Identifier plus Type. Evidence: `OM .../DWPZoneDriftObservationHandler.cs:94-119`.
  - AVL: Identifier = PlateNumber, grouping disabled. Evidence: `OM .../AVLObservationHandler.cs:104-112`.
- Grouping: a new observation joins an open parent with the same Source, Type, Identifier and Project. Weather Identifier is the station serial number. A child sends only a group_updated notification. [code]
  Evidence: `OM Core/Processors/Handlers/Common/BaseObservationHandler.cs:466-509`, `:536-548`, `WeatherStationObservationHandler.cs:225-228`.
- The consumer swallows handler errors: the message is acked, logged and counted. A rejected type is silent to the sender. Metrics: `observation.ingest.received`, `observation.ingest.rejected` (reasons `unknown_type`, `invalid_danger_category`). [code]
  Evidence: `OM Core/Processors/ObservationsConsumerService.cs:42-67`, `SharedKernel/Observability/ObservationMetrics.cs:207-228`.
- A second ingest door exists: a RabbitMQ consumer for camera AI messages. [code]
  Evidence: `git -C /Users/admin/wc/wakecap-observation ls-tree -r origin/master --name-only | rg 'RabbitMQ/HazenAI'`.
- Observation fields that carry the ecosystem keys: ProjectId, ExternalId, Identifier, CompanyId, PackageId, Location (point), SpaceId, ZoneId, Extra (JSON), and ResourceId for worker events. [code]
  Evidence: `OM Domain/Entity/Observations/BaseObservation.cs:19-68`, `Aspects/ObservationResourceAspect.cs:15-19`.
- Company comes from the station serial or local id matched to a device that has a company: `Device(ProjectId, LocalId, SerialNo, CompanyId)`. [code]
  Evidence: `OM Core/Processors/Handlers/Common/ObservationCompanyResolver.cs:79-142`, `Domain/Entity/External/Device.cs:10-16`.
- Visibility: users under an active package-access policy do not see observations with null company and package. OM reads the policy from app-api and the responder scope from notification. [code]
  Evidence: `OM README.md:44-55`, `Infrastructure/RestServices/ExternalRestPaths.cs:58`, `:66`, `:76`.
- Transport inside OM is MassTransit on a Postgres SQL transport. Health checks probe two databases. [code]
  Evidence: `OM Infrastructure/*.csproj:28-29`, `Web.API/Program.cs:148-209`.
- Weather payload already sent today: IndicatorName, IndicatorValue, Threshold, GatewayId, SerialNo, GatewayGeneratedAt, DangerCategory. It has no zone, space or location. [code]
  Evidence: `WSBE Wakecap.WeatherStation.Contracts/Shared/DTO/ExternalRest/Observation/ObservationIngestRequest.cs:26-34`.

### H2. Notification rules (RecipientRule)

- Entry points: `POST /api/Ingest` (rule-based), `POST /api/ExternalIngest` (explicit channels, no rules), dispatcher management under `api/project/{projectId}/Dispatcher/**`. [code]
  Evidence: `NOTIF docs/ARCHITECTURE.md:18-22`, `:284-293`.
- RecipientRule is one row per (project, user, channel). Dimensions: SourceTypes, CompaniesIds, PackagesIds, ZonesIds. A null dimension means match all. Type is Responder or Controller. Channels are Web, Mobile, SMS, Email. [code]
  Evidence: `NOTIF Wakecap.Notification.Domain/Entity/Dispatcher/RecipientRule.cs:10-42`, `Domain/Constants/RecipientTypes.cs:12-13`, `Domain/Constants/NotificationChannels.cs:13-19`, `docs/ARCHITECTURE.md:301-303`.
- Filtering: source always; zone only when the event carries a zone; company only when the event carries a company; package mode resolves the company's package live and fails open on error. [code]
  Evidence: `NOTIF Core/Dispatcher/NotificationDispatchHandler.cs:124-176`.
- SMS is sent only when SourceType equals ConnectedWorker. Mobile needs device tokens. Web is always added. Email is never produced on this path. [code]
  Evidence: `NOTIF Core/Dispatcher/NotificationDispatchHandler.cs:196-217`, `Domain/Constants/NotificationSourcesTypes.cs:11`, `docs/ARCHITECTURE.md:162-170`.
- No retry constructs exist in the notification code (0 files match). [code]
  Evidence: `for f in $(git -C wakecap-notification ls-tree -r origin/master --name-only | rg '\.cs$' | rg -v 'Migrations|Tests'); do git -C wakecap-notification show origin/master:$f; done | rg -c 'UseMessageRetry|RetryPolicy|WaitAndRetry|\.Retry\('` printed nothing.
- Permissions: `notification_dispatcher:view`, `:manage`, `:delete`, `:view_controllers`, `:manage_responders`, `:manage_controllers`. [code]
  Evidence: `NOTIF Domain/Constants/Permissions.cs:14-31`.
- Templates are Scriban, keyed by channel, source and language `en`. [code]
  Evidence: `NOTIF docs/ARCHITECTURE.md:175-177`.
- External ingest precedent: location-service sends a templated email (topic `LowBatteryCardIds`) through `/api/ExternalIngest`. [code]
  Evidence: `LOC src/utilities/notification-service-helper.ts:45-64`.

### H3. Locations, zones and worker positions

- location-service tables: `asset_location` (key serial_no, network_id, generated_at; fields node_id, project_id, space_id, location, optimized_location, voltage, is_active, steps, is_buffered), `location_summary` (latest per node and project, with confidence_area polygon). [code]
  Evidence: `LOC src/models/asset-model.ts:5-105`, `src/models/location-summary.ts:6-72`.
- Zone: Id, Name, Height, Coordinates (Polygon), SpaceId, ZoneCategoryId, ProjectId. Space: Name, ProjectId, Altitude, blueprint, Coordinates. ResourceDevice: ResourceId (worker), DeviceId, AssignedAt, UnAssignedAt. [code]
  Evidence: `LOC src/models/zone-model.ts:5-44`, `space-model.ts:5-48`, `resource-device-model.ts:5-38`, `APP Wakecap.App.Core/DomainServices/PeopleDomainService.cs:1200-1204` (ResourceId joins to People.Id).
- app-api Zone adds `Restricted`, `AllowedStayMinutes`, authorized resources. ZoneCategories: Direct Productive (1), Indirect Productive (2), Non-Productive (3), Assembly Point (4). ZoneViolationLog keys: ResourceId, ZoneId, Location, entry and exit time, Type, TimeInMinutes. Violation types: "Unauthorized Entry", "Exceed Maximum Duration". [code]
  Evidence: `APP Wakecap.App.Domain/Entity/MapManagement/Zone.cs:19-41`, `Constant/ZoneCategories.cs:22-25`, `Entity/MapManagement/ZoneViolationLog.cs:14-26`, `Constant/ZoneViolations.cs:11-12`.
- app-api serves positions: `GET .../people/map/space/{spaceId}` (GeoJSON, versions 1 and 2), `GET .../people/map/space/{spaceId}/history?timestamp=` (marked as a proof of concept), `GET .../people/analysis/space/{spaceId}`. Permission People.View or NetworkAnalysis.PeopleView. [code]
  Evidence: `APP Wakceap.App.Web.API/Controllers/Directory/PeopleController.cs:948-1030`, `FE packages/web/map-tools/src/app/modules/LiveMap/apiUrls.ts:28`, `:41` (the portal calls the v2 route).
- Zone from a position: `zone.Coordinates.Intersects(location)` within the space. [code]
  Evidence: `APP Wakecap.App.Core/DomainServices/PeopleDomainService.cs:1228-1234`.
- app-api tables for latest and daily device location: DeviceLocationLatest (DeviceId, SpaceId, Point, IsActive, Battery, DeviceType, LastSeenAt) and DeviceLocationSummary. [code]
  Evidence: `APP Wakecap.App.Domain/Entity/Directory/DeviceLocationLatest.cs:10-38`.
- Zone health view and routes: `GET /projects/:project_id/spaces/:space_id/zones/health` reads materialized view `zone_health_summary`. It is device health per zone, not worker counts. [code]
  Evidence: `LOC src/controllers/summary-controller.ts:51-67`, `src/services/summary-service.ts:94-131`.
- Responder status with zones: `POST .../Responder` returns active responder status. [code]
  Evidence: `APP Wakceap.App.Web.API/Controllers/External/ResponderController.cs:22-40`.
- The DWP drift detector already does the polygon-and-receiver join every 5 minutes. It is the working example of a "who is in which zone now" job. [code] for the schedule, [stat] for the join design.
  Evidence: `INFRA .../digitalworkpermit.tf:123-124`, `KB 10-services/wakecap-digital-work-permit/overview.md:52-61`.

### H4. SOS paths

- sensors-service path: panic alert endpoint 12 becomes observation type SOS. Buffered SOS is not skipped. Impact and free fall are skipped when buffered. Only projects in the safety-events project list create observations. [code]
  Evidence: `SENS src/services/observation-service.ts:61-78`, `src/utilities/enums.ts:27-34`, `:92-96`, `CLAUDE.md:77-84`.
- Head impact needs the net acceleration to reach a minimum level (`sqrt(x*x+y*y+z*z)`). [code]
  Evidence: `SENS src/services/observation-service.ts:123-143`.
- A node-type gate runs first. No observation is created for node types anchor, gateway, sink, weather_station and camera. A FOB is also blocked for head impact and free fall but may raise SOS. [code]
  Evidence: `SENS src/configs/constants.ts:53-60`, `src/utilities/helper.ts:54-58`, `src/services/panic-alert-service.ts:99-101`.
- Safety events are also published to MQTT on a topic built from `{env}`, `{eventType}`, `{projectId}`, `{nodeId}`. The KB found no consumer for it. [code] for the topic, [stat] for the missing consumer.
  Evidence: `SENS src/utilities/helper.ts:64-71`, `KB 30-flows/safety-alert-dispatch.md:96-98`.
- Each event does three independent writes: legacy Firebase observation, direct SMS (Twilio, Cequens for +966), and the OM ingest. Failures are logged and swallowed. [code]
  Evidence: `SENS src/services/observation-service.ts:99-103`, `CLAUDE.md:79-84`, `README.md:47-48`.
- The OM payload carries resourceId (worker), location, deviceId (node id), zoneId, spaceId, externalId (legacy observation id). [code]
  Evidence: `SENS src/services/observation-service.ts:156-180`.
- Worker lookup is `GET /api/project/people/observation?hardwareNetworkId&deviceSerialNmber`. In app-api origin/master it inner-joins device location, so a worker with no location row is not found. [code]
  Evidence: `APP .../PeopleController.cs:1053-1066`, `Wakecap.App.Core/DomainServices/PeopleDomainService.cs:1194-1226`.
- sensors-service master already sends `requireLocation=false` for SOS. The app-api change that honours it sits on two feature branches (commits 261fce52 and 3753913d) that are not contained in origin/master at the last fetch. [code]
  Evidence: `SENS src/services/app-service.ts:53-61`; `git -C /Users/admin/wc/wakecap-app-api branch -r --contains 261fce52` lists only feature branches.
- Heat-stress bracelet and safety-harness alerts take a different route: worker-gear publishes with default Source ConnectedWorker and types such as "Heatstress Bracelet - Heatstroke Alert". The Observation Manager comment calls these ACTIVE types and the two low-battery types RESERVED. [code]
  Evidence: `WG Wakecap.WorkerGear.Contracts/DTO/Observations/ObservationManagerIngestRequestDto.cs:5-12`, `Core/Services/Observations/WorkerGearObservationPublisher.cs:77-120`, `OM ObservationsHierarchy.cs:22-41`, `IngestionService.cs:80-84`.
- The KB drew three disconnected safety lanes on 2026-07-27: sensor events, supervisor-driven evacuation, and heat stress with no alerting. The heat-stress lane now has an observation publisher in worker-gear master. [stat] with a [code] update.
  Evidence: `KB 30-flows/safety-alert-dispatch.md:25-70`, `WG Wakecap.WorkerGear.Core/Services/Observations/WorkerGearObservationPublisher.cs:26-120`.

### H5. safety-service actuation (alarm and evacuation to helmets)

- `POST /projects/:project_id/safety/alarm` takes `{ data: [ { space_id, zones: [zoneId, ...] } ] }` and returns `{ execution_time, ring_time }`. `GET` returns status. `POST .../safety/emergency` starts an evacuation, with reports routes. [code]
  Evidence: `SAFE src/controllers/safety-controller.ts:18-33`, `:35`, `:51`, `:68`, `:84`, `:100`, `src/dtos/safety-dtos.ts:34-61`.
- Delivery: worker pool, MQTT to gateways, Wirepas protobuf to helmets. Acknowledgements are stored per device. [code]
  Evidence: `SAFE CLAUDE.md:57-80`.
- The new emergency path broadcasts to all devices when no zones are given. [code]
  Evidence: `SAFE CLAUDE.md:103-107`.
- Permissions are module permissions `alarm` and `emergency` under the safety module prefix. [code]
  Evidence: `SAFE src/configs/endpoints-permissions.ts:4-60`.
- No caller of `POST /projects/{id}/safety/alarm` exists in the workspace outside safety-service itself. The portal calls the emergency routes from supervisor screens (MCC Evacuation mode and Site View). No backend rule calls either route. [code]
  Evidence: `FE packages/web/map-tools/src/app/modules/MCC/modes/Evacuation/evacuationAPIUrls.ts:7-14`, `packages/web/map-tools/src/app/modules/SiteView/apisURL.ts:94-101`. Search: `rg -l 'safety/alarm'` over every non-copy folder (non-markdown files) matched only safety-service files; `rg -l 'safety/emergency'` matched safety-service files and the two portal files.

### H6. Identity, permissions and project settings

- Services seed their module permissions into identity: `POST /AuthorizationExternalSeeding/module-permission`. [code]
  Evidence: `IDS Wakecap.Identity.Web/Controllers/Identity/AuthorizationExternalSeedingController.cs:27-41`, `WSBE .../ExternalRestPaths.cs:29`.
- User permissions: `GET .../authorization/user/permissions`, and users by permission in a project: `GET .../authorization/users/{projectId}`. [code]
  Evidence: `IDS Web/Controllers/Identity/AuthorizationController.cs:263`, `:299`, `:315`.
- Per-project module switch: `PUT /project/{projectId}/module-toggle` needs `Project.EnableProjectModules`. [code]
  Evidence: `IDS Wakecap.Identity.Web/Controllers/Admin/ProjectController.cs:69-84`.
- Backend services get tokens by client credentials. wakecap-jobs uses client id `wakecap_jobs`. [code]
  Evidence: `IDS README.md:176-181`, `INFRA .../wakecap-jobs.tf:46-52`, `SENS src/services/app-service.ts:26-44`.
- Project settings that matter for cost: TimeZoneId, CalendarWorkingDaysIds, calendar start and end, CustomerExpectedHoursId, ClaimedHoursId, WakecapWorkingHoursId, AttendanceThreshold, UndeliveredThreshold, DefaultTracingDistance, ZoneBufferDistance. [code]
  Evidence: `IDS Wakecap.Identity.Domain/Entity/Admin/Project.cs:30-70`.
- Portal permissions: ability instance filled from the identity API at bootstrap. [code]
  Evidence: `FE AGENTS.md:176-183`.
- The Connected Environment entitlement is a front-end switch. Backend product routes do not check it. The permission scope is `weatherstation:view` and `weatherstation:edit` for all three products. [code]
  Evidence: `RK four-videos/_research/integration-and-devices.md:14-15` (cross-reference), `/Users/admin/wc/weather-station/CLAUDE.md:69`.

### H7. Scheduler

- wakecap-jobs is a Quartz background worker (port 8001) that sends one API key as `x-api-key` on every job. It drives DWP drift detection every 5 minutes. access-controls says all its scheduling lives in wakecap-jobs. [code]
  Evidence: `INFRA .../wakecap-jobs.tf:56-57`, `:38-40`, `.../digitalworkpermit.tf:123-131`, `AC deep dive:66`.
- sensors-service has no internal timer. Its node-sync endpoint is called from outside. [code]
  Evidence: `SENS src/controllers/weather-station-controller.ts:17-29`; a scan of `src/**/*.ts` for `setInterval|cron|schedule` found none.

### H8. The data pool pieces that exist

- Production warehouse: Databricks Unity Catalog `wakecap_prod`, described as "WakeCap production data warehouse (migrated from Azure)". [code]
  Evidence: `INFRA terraform/gcp/wakecap-databricks-prod/me-central2/prod/databricks-config/catalog.tf:1-6`.
- Its `gold_secure` schema has fact views: fact_observations, fact_reported_attendances, fact_training_attendances, fact_weather_observations, fact_worker_activity_sessions, fact_worker_contacts, fact_worker_history, fact_worker_positions, fact_worker_shifts (9), plus fact_worker_shifts_tracked. [code]
  Evidence: `INFRA .../databricks-config/site-metrics.tf:36-46`.
- The reality check of 2026-06-09 counted 24 schemas and 9 jobs on the Azure Databricks workspace (reconcile 215, raw 114, silver 90, gold 79, gold_secure 67 tables). [stat]
  Evidence: `INFRA databricks-migration-reality-check.md:1-45`.
- The equipment lakehouse runs every 2 hours from `wakecap_equipments` into the same catalog. [stat]
  Evidence: `KB 10-services/equipment-data-pipeline/overview.md:22-39`.
- A Lakekeeper Iceberg REST catalog, per-tenant Iceberg warehouses on GCS, and a Trino layer exist as Terraform layers under the GCP project's `test` environment only. The layers are `lakehouse`, `trino`, `pipeline-poc`, `pipeline-builder` and `wc3`. The lakehouse README says authentication is on and authorization is not. [code]
  Evidence: `INFRA terraform/modules/wakecap-lakehouse-gcp/helm.tf:1-13`, `tenants.tf:1-13`, `terraform/gcp/wakecap-com-414722/me-central2/test/lakehouse/README.md:1-12`, and `find terraform/gcp -type d \( -iname '*lakehouse*' -o -iname '*trino*' \)` returned only the two `test` folders.
- RFC-52 (DRAFT, 2026-09-07) names one shared Flink cluster, one Feldera, one Kafka and one Iceberg warehouse. RFC-47 has a reference implementation and a live proof dated 2026-08-11 with a restricted-zone alert example. [plan]
  Evidence: `INFRA context/documentations/RFC-52-multi-tenant-engine-isolation.md:3-4`, `:19-21`, `RFC-47-pipeline-manifest.md:3`, `:22`, `:44`.
- WC3 decisions: ADR-026 lakehouse boundary (accepted), ADR-033 Kafka backbone (accepted), ADR-053 VerneMQ MQTT ingress (accepted), ADR-044 device source platform (accepted, names environmental and safety sensors), ADR-055 telemetry storage (rejected), ADR-056 presence sessionizer (proposed). [plan]
  Evidence: `WC3 decisions/ADR-026*.md:8-14`, `ADR-033*.md:8-14`, `ADR-044*.md:8-30`, `ADR-053*.md`, `ADR-055*.md:8-21`, `ADR-056*.md`.
- WC3 has three product folders (connected-worker-positioning-ontology, gateway-mqtt-ingress, wirepas-nms-ontology). None is environmental. Its README says the folder holds no installable products. These two statements disagree. [plan]
  Evidence: `WC3 products/README.md:3-4`, `ls /Users/admin/wc/wc3-platform/products`.
- The KB maps 17 bounded contexts and 18 foreign-data-wrapper edges across 12 databases. It says safety is four contexts that do not reference each other. [stat]
  Evidence: `KB 00-platform/context-map.md:27-45`, `:99`, `:140`.

### H9. AI and agent precedents

- OM has two agent surfaces (export assistant and template builder). A write is a proposal that a user confirms (Proposed, Confirmed, Executed). [code]
  Evidence: `OM Domain/Entity/Agent/AgentEnums.cs:3-36`, `:50-60`.
- The equipments service ships an AI platform and an `/mcp` endpoint. [stat]
  Evidence: `KB 10-services/wakecap-equipments/interfaces.md:61-74`.
- The weather-station backend exposes an MCP origin under `/weather-station`. [code]
  Evidence: `INFRA terraform/modules/wakecap-apps-aws/weather-station.tf:55-62`.
- Terraform has LLM gateway, Langfuse and memory-MCP layers on GCP. [code]
  Evidence: `INFRA terraform/modules/` (wakecap-litellm-gcp, wakecap-langfuse-gcp, wakecap-memory-mcp-gcp), `terraform/gcp/wakecap-com-414722/me-central2/prod/llm-gateway`.
- No forecast ingestion exists in the weather-station backend or frontend, sensors-service, OM core, notification core or WC3 products. [code]
  Evidence: `rg -l -i forecast` over those paths returned no files.

## 8. Integration seams table

Labels: plan = small change in an existing mechanism. vision = new component or model.

| # | Seam | Existing mechanism (status) | Evidence | What would be needed |
|---|---|---|---|---|
| S1 | Environmental alert to responders | WeatherStation source with 14 types. ExternalId idempotency. Lightning on the high queue. Rules by source, zone, company, package. [code] | `OM IngestionService.cs:70-113`, `WeatherStationObservationHandler.cs:151-223`, `NOTIF NotificationDispatchHandler.cs:124-176` | Nothing for weather and lightning. For Gas: plan, add Gas, GasSOS, GasFall and GasTippedOver to the OM type list (or send agreed names) and map them to the high queue. See risk R1. |
| S2 | Zone-targeted notification | RecipientRule.ZonesIds exists. Observation.ZoneId exists. The weather payload sends no zone, so rules with a zone list match every weather event. [code] | `NOTIF RecipientRule.cs:40`, `OM ObservationDomainService.cs:107-111`, `WSBE ObservationIngestRequest.cs:26-34`, `NOTIF NotificationDispatchHandler.cs:126-130` | plan: add the station's ZoneId and SpaceId (and point) to the weather, lightning and gas payload. |
| S3 | Channel reach (SMS) | SMS only when SourceType is ConnectedWorker. [code] | `NOTIF NotificationDispatchHandler.cs:196-200` | plan: allow SMS for WeatherStation events (one condition and a template). |
| S4 | Company and package attribution | Weather: station serial matched to a device with a company. DWP: no resolver branch. Gas sends the vendor device id as SerialNo. It resolves a company only if a device row with that serial or local id exists (not verified). [code] | `OM ObservationCompanyResolver.cs:30-50`, `:79-142`, `WSBE .../GasDetector/Services/GasObservationDispatch.cs:96-101` | plan: assign station and gas devices to a company. plan: add a DWP branch or send CompanyId in the payload. |
| S5 | Worker exposure join (reading x position x zone) | Positions in location and app-api. Zone polygons. ResourceDevice. Intersects test. DWP does the join every 5 minutes. [code] | `APP PeopleDomainService.cs:1228-1234`, `INFRA digitalworkpermit.tf:123-124` | plan: record which space and zones each station covers. vision: a time-bucketed exposure table (worker, hour, heat band). |
| S6 | Actuation: ring helmets in a zone | `POST /projects/{id}/safety/alarm` with space and zones. No caller exists in the workspace. The portal uses the emergency route from supervisor screens. [code] | `SAFE safety-controller.ts:18-33`, `safety-dtos.ts:34-56`, `FE .../Evacuation/evacuationAPIUrls.ts:7-14` | vision: a rule that calls it on RED lightning or extreme heat, with approval, audit and a permission (`alarm`). |
| S7 | Work permit suspension by weather | DWP has zones, receivers and six observation types. Project settings for revalidation. [code] | `OM ObservationsHierarchy.cs:158-192`, `IDS Project.cs:61-62` | vision: a new permit state or type "suspended by environment" and a DWP rule that reads environment state. plan: expose station state by zone or space for DWP to read. DWP code is not in the workspace. |
| S8 | Equipment and environment | Equipments service has geofences, 20 alert checkers, and an OM path (AVL). [stat] | `KB 10-services/wakecap-equipments/overview.md:59-72`, `interfaces.md:58` | vision: environment-aware checkers. plan: send equipment events with the same ProjectId, SpaceId and ZoneId keys. |
| S9 | Cost layer | Project hours settings. Warehouse views fact_worker_shifts and fact_weather_observations. [code] | `IDS Project.cs:36-58`, `INFRA site-metrics.tf:36-46` | plan: join weather and shift facts by project, day and hour in the warehouse. vision: a cost model (rates are not in code). |
| S10 | The data pool | Databricks `wakecap_prod` facts. Equipment lakehouse. Test-only Iceberg and Trino layers. WC3 ADRs. [code] and [plan] | section 7 H8 | plan: a key contract (ProjectId, SpaceId, ZoneId, WorkerId, DeviceId) used by every producer. vision: one pool across products. |
| S11 | Prediction and forecast | None. No forecast code. AI precedents exist. [code] | section 7 H9 | vision. |
| S12 | Suggested work plans | OM agent proposal and confirm pattern. Permit data in DWP. [code] | `OM AgentEnums.cs:3-36` | vision: a planner that proposes a plan and a human approves it. |
| S13 | Gate presence | access-controls ingests door events. KB marked the DB dormant on 2026-07-27. [stat] | `/Users/admin/wc/access-controls/access-controls-architecture-deep-dive.md:9-17`, `KB 20-data/estate-map.md:75` | vision: use gate counts as headcount during a hazard. |
| S14 | Entitlement | Identity module toggle per project. CE entitlement is a front-end switch. [code] | `IDS ProjectController.cs:69-84`, `RK integration-and-devices.md:15` | plan: make backend product routes check entitlement. |
| S15 | Periodic digest | `/api/ExternalIngest` sends templated email without rules. [code] | `LOC notification-service-helper.ts:45-64` | plan: a daily environmental risk digest through the same door. |
| S16 | Mobile | Mobile OM module shows a weather alert card on origin/main. Weather station screens are on a feature branch only. [code] | `MOB origin/main weather_alert_card.dart`, `KB safety-alert-dispatch.md:77-85` | plan: merge the weather station screens. |
| S17 | Health and training outcomes | OM already takes clinic findings (Un-Fit-Worker) and training expiry (ExpiredTraining) as sources. Digital clinic and training center run as services. [code] | `OM ObservationsHierarchy.cs:143-156`, `INFRA main.tf:91`, `:93` | vision: join exposure history to clinic visits and training status to learn outcomes per worker. |

## 9. Risks and contradictions found

- R1. Gas types versus the OM type list. weather-station master (2026-10-04) sends types Gas, GasSOS, GasFall, GasTippedOver under Source WeatherStation. OM origin/master (2026-09-30) accepts only the 14 listed WeatherStation types and drops others at the resolver. No Gas type appears in any OM `.cs` file at that ref. Unless OM changed after the last fetch, Gas observations would be accepted at the door (HTTP 200) and then dropped, with only a log line and a counter. [code]
  The Gas sender's own comment assumes the opposite: "a category named for its type is created by the service itself". That was true before the 2026-09-30 whitelist.
  Evidence: `WSBE .../GasDetector/Services/GasObservationRecorder.cs:37-40`, `.../GasObservationDispatch.cs:68-76`, `OM ObservationsHierarchy.cs:194-216`, `ObservationHandlerResolver.cs:74-88`, `ObservationsConsumerService.cs:42-67`. Check: `git -C /Users/admin/wc/wakecap-observation ls-tree -r origin/master --name-only | rg '\.cs$'` then search each file for `GasSOS`, `GasFall`, `GasTippedOver` (no hit).
- R2. Weather payload has no zone, so zone-scoped recipients cannot target weather events (S2). [code]
  Evidence: as S2.
- R3. SMS reaches responders only for ConnectedWorker events (S3). [code]
  Evidence: as S3.
- R4. Permit observations carry no company. Under a package-access policy the rows are hidden. [code] and [test]
  Evidence: `OM ObservationCompanyResolver.cs:30-50`, `README.md:50-55`.
- R5. SOS worker lookup can fail for a worker with no location row on app-api origin/master. The fix is on feature branches. [code]
  Evidence: H4.
- R6. KB and code disagree on DWP (scaffold versus six live types) and on heat-stress alerting (none versus a publisher). Use the code. [stat]
  Evidence: H4 and section 5.1.
- R7. KB database numbers differ between pages: `location` is 428 GiB on the index page (2026-08-02) and 379.62 GiB on the estate map (2026-07-27). [stat]
  Evidence: `KB index.md:40`, `20-data/estate-map.md:51`.
- R8. Stale docs: sensors-service README says the weather endpoint is 242, code says 61. app-api README lists an Equipment module that is gone. frontend-2.0 AGENTS.md still lists the removed `ws` app. [code]
  Evidence: `SENS README.md:94` versus `src/utilities/enums.ts:49`; `APP README.md:63-75`; `FE AGENTS.md:23` and commit 4cff7ca34.
- R9. IoT rule count: the header comment in rules.tf says 62 rules, the file defines 59, and lightning-ingestion.tf adds 4. [code]
  Evidence: `INFRA terraform/aws/wakecap-main/us-west-2/prod/iot/rules.tf:2`, `rg -c '^resource "aws_iot_topic_rule"' rules.tf`.
- R10. A code comment says the shared two-sensors queue drops about 0.9 percent of sensor messages to a saturated dead-letter queue. [stat]
  Evidence: `INFRA .../iot/lightning-ingestion.tf:28-33`.
- R11. Notification has no retry. A failed channel send is logged and lost. [code]
  Evidence: H2.

## 10. Numbers measured

Every figure below was produced by a read-only command or a file read. Commands assume `cd /Users/admin/wc`.

- Top-level folders in /Users/admin/wc: 56. Command: `ls -d */ | wc -l`
- Top-level folders with a .git: 39. Command: `for d in */; do [ -e "$d/.git" ] && echo $d; done | wc -l`
- Folders skipped as copies, worktrees or empty: 24. Command: `ls -d */ | rg 'TAN-|worktrees|review-repos|conductor-|triage-inbox|broken-empty-clone|sos-|bracelet-sos|promote-|remove-user|maps-i18n|lightning-tests|idnetity' | wc -l`
- OM sources: 9. Command: `git -C wakecap-observation show origin/master:Wakecap.Observation.Domain/Constants/ObservationsHierarchy.cs | rg -c '^        public class '`
- OM handler classes: 9. Command: `git -C wakecap-observation ls-tree -r origin/master --name-only | rg -c 'Processors/Handlers/[A-Za-z]+ObservationHandler\.cs$'`
- WeatherStation types in OM: 14. Command: same file, `sed -n '194,216p' | rg -c 'public const string'`
- DigitalWorkPermit types in OM: 6. Same file, lines 158-192 (same command).
- ConnectedWorker types in OM: 10. Same file, lines 14-41 (same command).
- Manual and QRCode types in OM: 39 each. Method: python parse of the same file, counting `public const string` per nested class.
- OM controllers and HTTP attributes: 8 and 53. Command: `for f in $(git -C wakecap-observation ls-tree -r origin/master --name-only | rg 'Web\.API/Controllers/.*Controller\.cs$'); do git -C wakecap-observation show origin/master:$f; done | rg -c '^\s*\[(HttpGet|HttpPost|HttpPut|HttpPatch|HttpDelete)'` (controllers: the loop list length).
- Notification controllers and HTTP attributes: 4 and 14. Same method on wakecap-notification.
- app-api controllers and HTTP attributes: 37 and 273. Same method on wakecap-app-api.
- worker-gear controllers and HTTP attributes: 6 and 41. Same method on worker-gear.
- access-controls controllers and HTTP attributes: 18 and 98. Same method on access-controls/wakecap-access-controls.
- wakecap-integrations controllers and HTTP attributes: 22 and 61. Same method, path filter `Controllers/.*Controller\.cs$`.
- identity-service controllers and HTTP attributes: 24 and 128. Same method, path filter `Web/Controllers/.*Controller\.cs$`.
- sensors-service routes: 5. Command: loop over `git ls-tree` files matching `^src/controllers/.*controller\.ts$` on origin/master-wakecap-2, then `rg -c '^\s*@(Get|Post|Put|Patch|Delete)\('`.
- safety-service routes: 7. Same method.
- location-service routes: 38. Same method (filter `^src/controllers/.*controller.*\.ts$`).
- node-service routes: 46. Same method on origin/master.
- node-service controller files: 15. Command: `git -C node-service ls-tree -r origin/master --name-only | rg '^src/controllers/.*-controller\.ts$' | wc -l`
- Node types in node-service: 14. Command: `git -C node-service show origin/master:src/utilities/enums.ts | sed -n '1,16p' | rg -c ' = '`
- Sensor endpoint ids in sensors-service: 8. Command: `git -C sensors-service show origin/master-wakecap-2:src/utilities/enums.ts | rg -c '^\s+[A-Z_]+ = [0-9]+,?$'`
- Measurement columns on weather_station_sensor: 16. Command: `git -C sensors-service show origin/master-wakecap-2:src/models/weather-station-sensor-model.ts | sed -n '40,86p' | rg -c "type: 'float'"`
- Internal service URLs in Terraform locals: 16. Command: `sed -n '78,93p' infrastructure/terraform/modules/wakecap-apps-aws/main.tf | rg -c '_internal_url'`
- .tf files in the apps module: 63. Command: `ls infrastructure/terraform/modules/wakecap-apps-aws/*.tf | wc -l`
- Files holding a k8s-app deployment: 41. Command (in that folder): `rg -l 'source\s*=\s*"\.\./k8s-app"' *.tf | wc -l`
- k8s-app deployments: 50. Command (in that folder): `rg -o 'source\s*=\s*"\.\./k8s-app"' *.tf | wc -l`
- IoT topic rules in rules.tf: 59 (the header comment says 62). Command (in `infrastructure/terraform/aws/wakecap-main/us-west-2/prod/iot`): `rg -c '^resource "aws_iot_topic_rule"' rules.tf`
- IoT topic rules in lightning-ingestion.tf: 4. Same command on that file.
- SQS queues created by the IoT layer: 10. Command (same folder): `rg -c '^resource "aws_sqs_queue"' *.tf`, summed (heatstress 2, lightning 8).
- Warehouse fact views in the site-metrics grant list: 9. Command: `sed -n '37,45p' infrastructure/terraform/gcp/wakecap-databricks-prod/me-central2/prod/databricks-config/site-metrics.tf | rg -c '"fact_'`
- Repo entries in the GitHub org Terraform inventory: 280. Command: `rg -o '^\s{4}"([^"]+)" = \{' -r '$1' infrastructure/terraform/github/wakecap/repos/main.tf | wc -l`
- Web packages and shared packages in frontend-2.0: 7 and 5. Command: `git -C frontend-2.0 ls-tree origin/master packages/web/ --name-only | wc -l`, and the same for `packages/shared/`.
- Portal route rows in AGENTS.md: 17. Command: `git -C frontend-2.0 show origin/master:AGENTS.md | sed -n '134,152p' | rg -c '^\| .?/project'`
- Files named WorkPermit in frontend-2.0 origin/master: 19, all under packages/web/map-tools. Command: `git -C frontend-2.0 ls-tree -r origin/master --name-only | rg -i 'workpermit'`, counted.
- WC3 decision records: 56. Command: `ls wc3-platform/decisions/ADR-*.md | wc -l`
- KB service folders: 61. Command: `ls -d wc3-platform/docs/wc2-knowledge-base/10-services/*/ | wc -l`
- Notification channels: 4. File: `NOTIF Wakecap.Notification.Domain/Constants/NotificationChannels.cs:13-19`.
- OM queues: 3 plus 2 external. File: `OM Wakecap.Observation.Infrastructure/Queue/Constants/ObservationQueues.cs:9-20`.
- app-api permit entities: 5 (WorkPermit, WorkArea, WorkPermitActivity, PermitActivity, NovadeWorkPermit). Command: `git -C wakecap-app-api ls-tree -r origin/master --name-only | rg -c 'Domain/Entity/(DigitalPermit/|Lookup/PermitActivity)'`
- Commits on origin/master not in the frontend-2.0 checkout: 73. Command: `git -C frontend-2.0 rev-list --left-right --count origin/master...HEAD` printed `73 1`.

Documented numbers (not measured by me) used in this sheet:

- Registered devices 141,464 (2026-08-02); 139,995 on the 2026-07-28 table: asset 94,621, anchor 30,074, card_id 7,216, gps_tracker 3,845, sim_card 2,502, gateway 583, fob 449, sink 374, camera 213, heatstress_bracelet 113, weather_station 4, safety_harness 1. [stat] Evidence: `KB 00-platform/device-model.md:24-42`, `index.md:41`.
- 36 production databases, 1,046 application tables, 32 hypertables, 40 client organizations, MQTT ingest 229.7 msg/s average and 382.6 msg/s peak. [stat] Evidence: `KB index.md:35-43`.
- `weather_station_sensor` hypertable since 2025-05-01, about 607 MB. [stat] Evidence: `KB 20-data/hypertable-usage.md:83`.
- Equipments `alert_history` 54,024 rows (2026-07-27). [stat] Evidence: `KB 10-services/wakecap-equipments/data.md:31`.

## 11. Claims to avoid in the presentation

- Do not say the platform predicts heat or lightning. No forecast code exists (S11).
- Do not say permits suspend by weather. Nothing links permit state to environment (S7).
- Do not say Gas alarms reach the Observation Manager in production without checking R1 and the production deploy state.
- Do not say equipment sits in app-api. It moved to its own service (6.1).
- Do not call helmet tags equipment. In the code they are "assets" (6.2).
- Do not quote KB database sizes as current. They are from July and August 2026 (R7).
- Do not say the DWP repo or its UI was reviewed. It is not in the workspace.

## 12. Gaps

- The Digital Work Permit repo, the equipments repo, wakecap-jobs, gateway-esp-backend-transport and position-engine-v2 are not in the workspace. Their facts rest on Terraform and the KB.
- I did not fetch, so remote state after the last local fetch is unknown. This matters for R1 (OM and weather-station) and R5 (app-api).
- The caller of sensors-service `POST /api/weather-station/node-sync` was not found.
- No production check was made (no network). Nothing here is [live] except the three release-kit statements: production serves build 1.0.7 (`RK four-videos/_research/refresh-1.0.7.md:4`), the Gas acknowledge and close backend is deployed (`:17-18`), and Gas appears in the rail and Connected Products on the live portal (`RK internal-notes.md:42`).
- The GatePass technical proposal PDF could not be read (no PDF text tool). Only the HTML prototypes were read.
- The Observation Manager UI route list and the portal layout catalog contents (server side) were not read.
- No incident, injury or cost-of-delay figures were found in these repos. Only fleet and platform counts exist ([stat]).
- The mobile app's weather station screens are on a feature branch. Their merge state is unknown.
- Whether the Digital Work Permit service is fully live in production is not proven (see 5.1).

## 13. Rule compliance notes

- One early whole-tree search for permit names (`rg -l`) ran without a tfvars exclusion. The search read inside three `terraform.auto.tfvars.json` files under infrastructure (prod, stage and test apps layers) and listed their paths as matches. Only file names were printed. No content was seen or used. Later searches used an exclusion wrapper that skips tfvars, tfstate, env, appsettings, pem, key, credential, secret, token and kubeconfig files.
- AWS role ARNs and account ids appeared in terminal output from IoT rule files. They are not reproduced here.
- No `.env`, `appsettings*.json`, key file or credentials file was opened. Terraform `.tf` files were read for structure only.
- `docs-archive/` was not read. Linear tickets and PR bodies were not used as evidence.
- A saved memory note about the Gas hand-off was read for orientation only. Nothing in this sheet depends on it. Where it disagreed with code (the OM type list), the code won.
