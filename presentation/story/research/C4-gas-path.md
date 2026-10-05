# C4 Gas path: how a gas reading and a gas alert travel

Slice C4-gas-path, fact sheet for the Connected Environment presentation. Written 2026-10-05. Read-only research: nothing was run, built, deployed, posted or filed, and no network call was made. Only this file was written.

## 0. How to read this sheet

Status labels (as briefed):
- live = seen working in production. Only the release-kit captures of 4 Oct 2026 (production build 1.0.7) qualify.
- code = in master code, deploy not verified.
- test = deployed to the test environment only.
- plan = documented intent.
- vision = nobody built it.
- stat = published statistic. None is used in this slice.

Path shorthand (every fact below has an Evidence line):
- BE = /Users/admin/wc/weather-station/wakecap-weather-station. Read at origin/master 8453a99 (TAN-2943, 2026-10-04 17:00 +0300), fetched 2026-10-05 13:02. The working tree there is on branch TAN-2895-drop-testing-comment and is 2 commits behind origin/master, so it lacks the TAN-2943 files. Re-check any BE line with `git -C <BE> show origin/master:<path> | sed -n '<line>p'`. I compared 87 files against the working tree: 72 are identical, 4 differ (CoreServiceRegistry.cs, GasPollSweepRunner.cs, ci.yaml, GasReadingDedupeTests.cs) and 11 do not exist there (the TAN-2943 files).
- BE.Core = BE/Wakecap.WeatherStation.Core/Products/GasDetector. BE.Web = BE/Wakecap.WeatherStation.Web.API/Products/GasDetector/Controllers. BE.Infra = BE/Wakecap.WeatherStation.Infrastructure/Products/GasDetector. BE.Domain = BE/Wakecap.WeatherStation.Domain/Products/GasDetector. BE.DTO = BE/Wakecap.WeatherStation.Contracts/Products/GasDetector/DTO. BE.Tests = BE/Wakecap.WeatherStation.IntegrationTests/Products/GasDetector.
- FE = /Users/admin/wc/weather-station/frontend-2.0-weather-station at master 83b4d8d. FE.Gas = FE/src/app/features/Gas. The Gas folder is identical to production tag v1.0.7-ConnectedEnvironmentApp-production (8f3bf01): `git diff --stat v1.0.7-ConnectedEnvironmentApp-production HEAD -- src/app/features/Gas` prints nothing. Only the side rail changed after it (TAN-2956, Trends row removed).
- OM = /Users/admin/wc/wakecap-observation, read at origin/master 4df736e. This clone was last fetched 2026-09-30 12:11, so it may be 5 days behind. Its working tree is a detached HEAD at 0dbd7f7 (2026-09-29).
- RK = /Users/admin/wc/weather-station/release-kit. INFRA = /Users/admin/wc/infrastructure (clone at 0c17cb299, 2026-09-22). PROBE = /Users/admin/wc/blackline-probe. SIM = /Users/admin/wc/blackline-push-simulator. PLAN = /Users/admin/wc/Gas/blackline-integration-plan.md. PROTO = /Users/admin/wc/weather-station/gas-detector-monitoring-standalone.html. ZOP = /Users/admin/wc/weather-station/ConnectedEnvironment*Zero-OpenProgram.md (the real file name has an em dash where the asterisk is; use the glob). MEM = /Users/admin/.claude/projects/-Users-admin-wc/memory/project_gas_observation_hand_off.md (a session note, not a repo artifact).

Redactions: no customer names, people names, project ids, vendor account numbers, client ids, detector serials or cloud account ids appear here. The poller has a built-in default project id (a GUID, BE.Core/Configuration/GasPollingOptions.cs:38); its value is not reproduced.

## 1. The story in ten lines

Each line is backed by the facts and evidence in sections 2 to 5.

1. A Blackline detector (vendor type `exo_mk2`, sensors H2S, O2 and LEL) uploads to Blackline's cloud about every 30 minutes. WakeCap owns no gas hardware, mesh or Modbus path.
2. WakeCap's backend asks that cloud for the whole fleet with one `GET /device` call every 45 seconds. The vendor never pushes readings.
3. That one call returns, per device: the latest reading of each gas, an online flag, battery, wearer, and the alerts Blackline still holds open.
4. WakeCap maps vendor spellings to its own (LEL-MPS to LEL, vol to %VOL), stores each distinct reading once, and refreshes the device row.
5. A newly stored reading strictly over a gas's High alarm point opens a platform alert. Alerts Blackline lists are mirrored as vendor alerts.
6. Four alert types are critical: high gas, SOS, fall, tipped over.
7. A new, active, critical alert writes an outbox row in the same save. A dispatcher posts it to the Observation Manager every 5 seconds. Merged on master; TEST only; production unverified.
8. The Gas screens read what WakeCap stored, never the vendor, and re-read every 60 seconds.
9. People acknowledge and close alerts in WakeCap only. Nothing goes back to Blackline.
10. The screens say what they lack: no exposure or compliance figures, no alert timeline or assignee, no closed count, no peak today.

## 2. The reading path, hop by hop

Hop 1. Detector.
- The detectors are Blackline units. On the real account fixture all 5 are vendor type `exo_mk2`, each with 3 sensors: H2S in ppm, O2 in vol, LEL-MPS in lel. [code]
  Evidence: BE.Tests/Fixtures/blackline-eu-device-list-first-poll.json (counted with `git show origin/master:<file> | python3`: 5 devices, 15 sensor blocks); BE.Core/Services/BlacklineModels.cs:26-32.
- WakeCap has no gas hardware path: no mesh, no gateway, no Modbus. The gas Modbus tag ticket was cancelled ("no hardware gas device for now"). [plan]
  Evidence: ZOP:78 and :179; RK/four-videos/_research/integration-and-devices.md:11.
- Detectors upload about every 30 minutes. Two captures 27 minutes apart: 12 of 15 series carry a new device-side `date_utc`. A 60-poll monitor run: the 4 reporting devices posted a second reading exactly 30.0 minutes after the first. [code]
  Evidence: python3 over the two fixtures in BE.Tests/Fixtures (first-poll and 27-minutes-later); python3 over SIM/responses/monitor_2026-09-30_131232/readings.jsonl; BE.Core/Configuration/GasPollingOptions.cs:59-66.

Hop 2. Vendor cloud (Blackline Live, Connect API).
- WakeCap reaches it through the Blackline Connect API. Default base URL is the EU host `https://eu.connect-live.blacklinesafety.com/1/`. A North America host exists. A client id is known only to its own region. [code]
  Evidence: BE.Infra/Blackline/BlacklineOptions.cs:24, :33, :36.
- A wrong region answers `/authorize` with an error body that reads like bad credentials (TAN-2844). The error names the region first. [code]
  Evidence: BE.Infra/Blackline/BlacklineOptions.cs:26-32; BE.Infra/Blackline/BlacklineTransport.cs:193-220; fixture BE.Tests/Fixtures/blackline-na-authorize-invalid-client-200.json (keys: error, error_description).
- Handshake, two GETs: `/authorize?response_type=code&client_id=...` returns `{"code": ...}`; `/token?grant_type=authorization_code&code&client_id&client_secret` returns `{"access_token", "token_type": "bearer"}`. [code]
  Evidence: BE.Infra/Blackline/BlacklineTransport.cs:106-116, :144-166, :179; fixtures blackline-eu-authorize-ok.json (key: code) and blackline-eu-token-ok.json (keys: access_token, token_type).
- The token rides in the query string as `access_token=...`. It is cached in the process, never refreshed on a timer (no published TTL), dropped on 401 or 403 or on a refused body, and re-obtained once. [code]
  Evidence: BE.Infra/Blackline/BlacklineTransport.cs:20-21, :43, :53, :78, :88, :93-97; BE.Core/Services/BlacklineClient.cs:26-58.
- Logs scrub the whole query string, mask the client id to its last 4 characters and the secret to a masked length. [code]
  Evidence: BE.Infra/Blackline/BlacklineTransport.cs:61-71, :379-412, :438-444.
- Transport failures (socket, timeout, 5xx, 429) are retried up to 3 extra times with 500 ms, 1 s, 2 s backoff. Request timeout is 30 s. [code]
  Evidence: BE.Infra/Blackline/BlacklineOptions.cs:48-53; BE.Infra/Blackline/BlacklineTransport.cs:254-313, :446-457.
- Blackline reports many failures as HTTP 200 with an error body. The parser accepts only a root JSON array as a device list and treats any other body as a refusal, never as "no devices". [code]
  Evidence: BE.Core/Services/BlacklineResponseParser.cs:5-27, :50-58, :132-135.
- Credentials are not in the repo. The infra module renders a `Blackline` section (ClientId, ClientSecret, Push.ApiKey) into the pod's config from the weather-station secret store. The backend no longer reads a Push key (the push receiver is anonymous). [code]
  Evidence: INFRA/terraform/modules/wakecap-apps-aws/weather-station.tf:46-51 and INFRA/terraform/aws/wakecap-main/us-east-2/prod/apps/main.tf:240-246 (key names only; no value was read); BE.Infra/Blackline/BlacklineOptions.cs:3-12, :13-59 (no Push member); BE.Web/GasPushController.cs:41; `git grep -n -i -E 'Push:ApiKey|PushApiKey' origin/master` in BE finds no reader.

Hop 3. WakeCap poller (the runner and its cadence).
- The runner is `GasReadingsPollingBackgroundService`, a hosted service inside the weather-station backend process. Each tick opens a scope and calls `GasPollSweepRunner.RunOnceAsync`. It is one of 8 background workers registered in CoreServiceRegistry (2 weather, 2 gas, 4 lightning). [code]
  Evidence: BE.Core/Hosting/GasReadingsPollingBackgroundService.cs:26-29, :66, :76-79; BE/Wakecap.WeatherStation.Core/CoreServiceRegistry.cs:127-147 (origin/master); `git grep -n 'AddHostedService<' origin/master` lists lines 111, 112, 135, 146, 183, 185, 186, 187.
- Cadence constants (section `GasDetector:Polling`): IntervalSeconds 45 (floor 10; a lower configured value is clamped up), OfflineAfterSeconds 5400 (90 minutes), StaleReadingAfterSeconds 3600 (60 minutes). [code]
  Evidence: BE.Core/Configuration/GasPollingOptions.cs:16, :24, :67, :84, :93, :95-97.
- The timer is a `PeriodicTimer`. A failing tick is logged with a consecutive-failure count and the loop continues. Killing the process mid-sweep is safe because the unique dedupe index absorbs any replay. [code]
  Evidence: BE.Core/Hosting/GasReadingsPollingBackgroundService.cs:20-24, :66-106.
- The poll starts only when Blackline credentials and a project are configured; otherwise it logs once and idles. It serves ONE project: the configured `GasDetector:Polling:ProjectId`, else the built-in default project id. A second site on the same Blackline account would need a per-device project mapping table. [code]
  Evidence: BE.Core/Hosting/GasReadingsPollingBackgroundService.cs:42-55; BE.Core/Configuration/GasPollingOptions.cs:26-38, :47-48, :104.
- The infra module renders no `GasDetector` key (only the `Blackline` section), so the built-in default project applies unless something else sets it. Clone is from 2026-09-22. [code]
  Evidence: `grep -n -i -E 'blackline|GasDetector' INFRA/terraform/modules/wakecap-apps-aws/weather-station.tf` prints only lines 46-50.
- One tick, in order, each step with its own failure handling: GET /device; upsert gas_device; append new gas_reading rows; evaluate platform alerts; mirror vendor alerts; mark silent devices offline; record gas_sync_state. [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:82-106 (origin/master).
- One HTTP call per tick. `BlacklineClient` exposes only `GetDevicesAsync`; `GET /alert` is never called. GET /device pages nothing and returns no cursor. [code]
  Evidence: BE.Core/Services/BlacklineClient.cs:17-24; BE.Core/Services/GasPollSweepRunner.cs:1107-1114 (origin/master).
- The poll works in production. The 1.0.7 captures show a header reading "Last reading 17 min ago" (4 Oct 2026, 4:48 PM Saudi time) and an earlier capture "Last reading 3 min ago". [live]
  Evidence: RK/four-videos/gas/captures/g-dashboard-c.txt; RK/four-videos/gas/observations.md:23-24; RK/four-videos/_research/refresh-1.0.7.md:15-19.

Hop 3b. Push (a second channel that is not the data path).
- Blackline's Push service sends alerts only, never readings. It expects a 2xx whose body is the MD5 hex of the exact raw POST body, and WakeCap's receiver implements that. [code]
  Evidence: PROBE/docs/push_home.txt:22-33 (vendor documentation capture); BE.Web/GasPushController.cs:12-25, :76, :97.
- Registering the endpoint is manual through Blackline customer care (service name, endpoint URI, failure email). Whether it was done for production is not shown anywhere I read. [plan]
  Evidence: PROBE/docs/push_home.txt:8-17; PLAN:33-35.
- WakeCap's receiver is `POST integrations/blackline/push` (public path `/weather-station/integrations/blackline/push`). It is anonymous on purpose (TAN-2799). It hashes the untouched bytes, inserts one `gas_push_audit` row (raw bytes, content type, parse error) and returns the digest. It raises no alert and touches no device or project row. [code]
  Evidence: BE.Web/GasPushController.cs:12-38, :40-41, :59-98; BE.Domain/Entity/GasPushAuditRecord.cs:5-35; SIM/Program.cs:19.
- Alerts reach WakeCap through the poll, not through push. The sweep's own comment says "every push since 2026-09-24 was refused". Whether Blackline's Push service is registered against the production endpoint is not shown anywhere I could read. [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:821-825 (origin/master).

Hop 4. What the vendor returns: readings versus alerts.
- `GET /device` returns a bare JSON array, one object per device: id, type, name, `status` (date_last_seen_utc, is_online, shutdown_reason, battery, location, `sensors[]`), contact, `alerts[]`, owner. [code]
  Evidence: BE.Core/Services/BlacklineModels.cs:26-110, :112-118, :126-156, :204-232; PROBE/docs/device.txt:37-193 (vendor documentation capture).
- Readings are `status.sensors[]`: one block per gas the unit measures, all sharing one device-taken `date_utc`: `gas_type`, `reading`, `units`, `date_utc`. [code]
  Evidence: BE.Core/Services/BlacklineModels.cs:80-85, :93-110.
- Alerts are `alerts[]` on each device: only alerts Blackline still holds open. Each carries only `id`, `status`, `type`, `date_last_modified_utc`. No gas, no value, no creation time. `GET /alert` (not used) adds `date_created` and a note. [code]
  Evidence: BE.Core/Services/BlacklineModels.cs:204-213; fixture BE.Tests/Fixtures/blackline-eu-alert-list.json (keys: date_created, date_last_modified, date_last_modified_utc, device_id, device_name, id, status, type); PROBE/docs/alert_list.txt:6-8.
- Vendor alert statuses: unacknowledged, acknowledged, resolved. Vendor alert types in the Connect doc (13): emergency_alert, fall_detected_alert, logoff, logon, low_battery, missed_check_in, network_timeout, no_motion_occurred, silent_alert, gas_alert_detected, over_limit_gas_alert_detected, twa_alert_detected, stel_alert_detected. The Push doc lists 15 and adds device_tipped_over and pump_block_detected. [code]
  Evidence: PROBE/docs/device.txt:17-30; PROBE/docs/alert_put.txt:18-23; PROBE/docs/push_home.txt:35-50.
- Measured on the real EU account (committed fixture, captured 2026-09-30): 5 devices, 4 online, 1 offline, 3 sensors each. 11 open vendor alerts: 6 `emergency_alert` and 5 `device_tipped_over`, all unacknowledged at capture, spread 0/1/1/3/6 over the devices. The separate alert-list fixture has the same 11. [code]
  Evidence: python3 over BE.Tests/Fixtures/blackline-eu-device-list-first-poll.json and blackline-eu-alert-list.json; replay test BE.Tests/GasBlacklineReplayTests.cs:73, :96, :158, :296.
- The vendor also sends things WakeCap does not store: location, device-local timestamps, shutdown reason. They are parsed or dropped at the boundary. [code]
  Evidence: BE.Core/Services/BlacklineModels.cs:5-16, :57-86, :126-156; BE.Domain/Entity/GasDevice.cs:14-44 (no location columns).

Hop 5. Normalisation.
- Gas names: H2S, CO, CO2, O2, LEL map to themselves; `LEL-MPS` maps to LEL (case-insensitive). Units: ppm stays ppm; `vol` and `%vol` become `%VOL`; `lel` and `%lel` become `%LEL`. [code]
  Evidence: BE.Core/Services/BlacklineGasMapping.cs:31-48; BE.Domain/Constants/GasTypes.cs:10-18.
- An unknown gas or unit is kept, not dropped: the gas is upper-cased and clipped to 32 characters, the unit kept as sent (16). It has no alarm point, so it raises no alert. A warning is logged when it is stored. [code]
  Evidence: BE.Core/Services/BlacklineGasMapping.cs:50-63, :82-88; BE.Core/Services/GasPollSweepRunner.cs:433-445 (origin/master).
- Values are rounded to 2 decimals (away from zero) at the boundary because the vendor JSON carries float noise. A sensor with no reading is skipped ("no reading" is never stored as zero). A block with no `date_utc` fails mapping for that one gas and is logged. [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:344-352, :370-376 (origin/master); BE.Core/Services/BlacklineModels.cs:103-109.
- The reading instant is the device's own `date_utc` (UTC), never the poll time. [code]
  Evidence: BE.Domain/Entity/GasReading.cs:39-44; BE.Core/Services/GasPollSweepRunner.cs:349-352, :376 (origin/master).
- Alert type: emergency_alert to `sos`; fall_detected_alert to `fall`; gas_alert_detected and over_limit_gas_alert_detected to `gas_high`; every other type keeps Blackline's spelling (device_tipped_over, low_battery, no_motion_occurred, ...). Status: unacknowledged to active, acknowledged to acknowledged, resolved to resolved, anything else to active so it is seen. [code]
  Evidence: BE.Core/Services/BlacklineAlertMapping.cs:5-23, :32-38, :65-72.
- The vendor's own alert document is kept as jsonb in `gas_alert.RawPayload`. [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:1006 (origin/master); BE.Infra/ModelConfiguration/GasAlertConfiguration.cs:87-89; BE.Core/Services/BlacklineResponseParser.cs:105-130.

Hop 6. Storage.
- Eight Gas tables, all in the same `WeatherStationDBContext` as weather and lightning: `gas_alert`, `gas_device`, `gas_observation`, `gas_push_audit`, `gas_reading`, `gas_sync_state`, `gas_threshold_profile`, `gas_zone`. Four gas migrations: add-gas-detector-product (20260909070759), add-gas-push-audit (20260909114139), remove-gas-device-mapping (20260928144148), add-gas-observation (20261004134004). [code]
  Evidence: `git grep -n 'ToTable' origin/master -- 'Wakecap.WeatherStation.Infrastructure/Products/GasDetector/ModelConfiguration/*'` (8 hits: ToTable("gas_alert") ... GasObservationSchema.TableName, GasPushAuditRecordConfiguration.TableName); `git grep -n 'IWeatherStationDbContextConfiguration'` on the same folder (8 hits, all gas configs join the shared context); BE.Core/Services/GasPollSweepRunner.cs:66-69 (injects `WeatherStationDBContext`); `git ls-tree -r --name-only origin/master | grep -i gas` for the 4 migration files.
- `gas_reading` is a plain table: one row per (device, gas, device-side instant), unique index `UX_gas_reading_Dedupe` on (GasDeviceId, GasType, ReadingAtUtc), decimal(10,2) value. No hypertable call exists in the migrations. [code]
  Evidence: BE.Infra/ModelConfiguration/GasReadingConfiguration.cs:32-76; `git grep -n -i 'create_hypertable' origin/master -- 'Wakecap.WeatherStation.Infrastructure/*'` prints nothing.
- The sweep skips readings it already holds with one bounded read per device, then inserts one row per save. The dedupe index stays the authority, so two workers cannot double-store a reading. Only a dedupe-index refusal counts as "already stored"; any other database error is rethrown so a lost reading never looks like a duplicate. [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:28-36, :382-470, :472-506 (origin/master).
- `gas_device` is upserted on (ProjectId, VendorDeviceId): model and type (vendor type string), wearer name (free text), battery percent, online flag, last-seen instant (moves forward only). [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:154-199 (origin/master); BE.Domain/Entity/GasDevice.cs:14-44; BE.Infra/ModelConfiguration/GasDeviceConfiguration.cs:68-70.
- `gas_sync_state`: one row per project with a watermark (newest reading instant seen), last success time, consecutive error count and last error text. Nothing reads the watermark back to resume. [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:1107-1157 (origin/master); BE.Domain/Entity/GasSyncState.cs:14-29.
- `gas_threshold_profile`: five org-wide default rows seeded at startup from OSHA PEL and NIOSH REL; a project row for the same gas replaces the default for that project. [code]
  Evidence: BE/Wakecap.WeatherStation.Infrastructure/InfrastructureServiceRegistry.cs:71-83, :570-640 (origin/master); BE.Core/Services/GasThresholdResolution.cs:20-49.
- Default alarm points (Low, High, TWA, STEL): H2S 5, 10, 10, 15 ppm. CO 25, 50, 25, 200 ppm. CO2 5000, 30000 ppm, no TWA or STEL. O2 19.5, 23.5 %VOL, none. LEL 10, 20 %LEL, none. [code]
  Evidence: BE/Wakecap.WeatherStation.Infrastructure/InfrastructureServiceRegistry.cs:590-640 (origin/master).
- `gas_zone` exists but no production code creates a zone, so nothing can be assigned to one. The front end hid the Zones tab (TAN-2926) because nothing assigns a detector to a zone. Zone assignment is `PUT Devices/{id}/zone` only. [code]
  Evidence: `git grep -n -E 'new GasZone|Set<GasZone>\(\)\.Add' origin/master -- <BE Core, Web.API, Infrastructure>` prints nothing; BE.Web/DevicesController.cs:106-124; FE.Gas/routes.ts:55-59.
- Only `GasPollSweepRunner` creates `gas_alert` rows (two sites) and `gas_reading` rows (one site). [code]
  Evidence: `git grep -n 'new GasAlert\b' origin/master -- <Core, Web.API, Infrastructure>` hits GasPollSweepRunner.cs:640 and :994; `new GasReading` hits :363.

What is KEPT:
- Every distinct reading, with no deletion. No retention, purge or pruning code exists in the Gas module. [code]
  Evidence: `git grep -n -i -E 'retention|purge|prune|cleanup|ExecuteDelete|RemoveRange' origin/master -- <BE Gas Core, Infrastructure, Domain, Web.API, Contracts folders>` prints nothing (0 hits). PLAN:106 lists "raw-readings retention" as an open question.
- Alerts with raised, acknowledged and resolved instants, and the verified OAuth subject of who acknowledged and who closed. [code]
  Evidence: BE.Domain/Entity/GasAlert.cs:43-56; BE.Core/Services/GasAlertHandlingService.cs:73-81, :120-128.
- Platform alerts keep the value that tripped them (`Reading`) and the device instant. [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:640-655 (origin/master).
- Raw push bodies as bytea with their MD5. [code]
  Evidence: BE.Domain/Entity/GasPushAuditRecord.cs:12-35; BE.Infra/ModelConfiguration/GasPushAuditRecordConfiguration.cs:21-49.

What is NOT kept (and the UI says so):
- No alert timeline (status history), no assignee, no notes: there is no column or table for them. [code]
  Evidence: BE.Domain/Entity/GasAlert.cs:14-85; FE.Gas/translations/en.ts:403-405.
- No creation time for vendor alerts: `RaisedAtUtc` is Blackline's last-modified time at first sight. No gas or value for vendor alerts (the vendor payload has none). [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:988-1003 (origin/master); BE.Core/Services/BlacklineModels.cs:204-213.
- No detector location, shutdown reason or device-local timestamps. [code]
  Evidence: BE.Domain/Entity/GasDevice.cs:14-44.
- No exposure (TWA and STEL are limits only), no compliance percentage, no per-worker or per-shift dose. Nothing computes them. [code]
  Evidence: BE.Domain/Entity/GasThresholdProfile.cs:30-34; FE.Gas/translations/en.ts:462-470; PLAN:40.
- No closed-alert count in the Summary read. [code]
  Evidence: BE.DTO/GasSummaryDto.cs:15-63 (no such field); FE.Gas/GasAlertsScreen.tsx:359-377.
- The screen cannot show who acknowledged or closed an alert: the alert DTO leaves the actor subjects out on purpose, although the database holds them. [code]
  Evidence: BE.DTO/GasAlertDto.cs:5-8; BE.Domain/Entity/GasAlert.cs:47-53.
- Mismatch to know about: the Overview says "Peak today" and "Longest quiet gap" need "stored readings for the day, which the backend does not keep yet". The backend does keep every reading and has a history read (`GET Devices/{id}/readings`, default 24 h window, max 5000 points, buckets raw, 1m, 15m, 1h). The front end never calls it. [code]
  Evidence: FE.Gas/translations/en.ts:223-227; FE.Gas/components/GasTodayStrip.tsx:5-6, :90-103; FE.Gas/contracts/apiUrls.ts:10-13; BE.Web/DevicesController.cs:76-98; BE.DTO/GasReadingHistoryDto.cs:81-99; BE.Core/Services/GasQueryService.cs:143-203.

Hop 7. Read side.
- Routes under `api/project/{projectId}/gas-detector/`: `Devices`, `Devices/{id}`, `Devices/{id}/readings`, `PUT Devices/{id}/zone`, `Summary`, `Alerts`, `POST Alerts/{id}/acknowledge`, `POST Alerts/{id}/resolve`, `Thresholds`, `Zones`. Nothing calls Blackline at read time. [code]
  Evidence: BE.Web/DevicesController.cs:36-124; BE.Web/SummaryController.cs:22-38; BE.Web/AlertsController.cs:24-87; BE.Web/ThresholdsController.cs:17-33; BE.Web/ZonesController.cs:14-27; BE.Core/Services/GasQueryService.cs:12-23.
- Permissions: reads need `weatherstation:view` or `project_builder:manage`. Writes (acknowledge, close, zone) need `project_builder:manage` or `weatherstation:edit`. There is no gas-specific permission. Some comments in the code still say `gasdetector:view`; the attributes are what count. [code]
  Evidence: BE.Web/AlertsController.cs:24, :49, :69; BE.Web/DevicesController.cs:36, :106, comment :14-23; FE.Gas/constants/permissions.ts:24, :32.
- Each device read carries `isStale` and `readingAgeSeconds`, measured from the device's own reading instant, never negative. A device is stale when it has no reading or its newest is older than 3600 s. [code]
  Evidence: BE.Core/Services/GasQueryService.cs:472-515.
- Alerts read: default limit 100, maximum 500, newest first; `severity` is `critical` for the four critical types, `warning` for everything else. [code]
  Evidence: BE.Core/Services/GasQueryService.cs:84-101, :230-351.

Store inventory (the eight Gas tables; all are plain tables in the shared database):

| Table | Written by | Key and uniqueness | One row is | Evidence |
|---|---|---|---|---|
| gas_device | poll sweep upsert | unique (ProjectId, VendorDeviceId) | one Blackline detector in one project | BE.Infra/ModelConfiguration/GasDeviceConfiguration.cs:25, :68-70 |
| gas_reading | poll sweep insert | unique (GasDeviceId, GasType, ReadingAtUtc); index (ProjectId, ReadingAtUtc); cascade delete with its device | one gas, one value, one device-side instant | BE.Infra/ModelConfiguration/GasReadingConfiguration.cs:36-76 |
| gas_alert | poll sweep (create, auto-close); a person (acknowledge, close) | unique VendorAlertId where not null; index (ProjectId, RaisedAtUtc) | one alert, platform or vendor | BE.Infra/ModelConfiguration/GasAlertConfiguration.cs:31-103 |
| gas_sync_state | poll sweep | unique ProjectId | the poll watermark, last success, error count | BE.Infra/ModelConfiguration/GasSyncStateConfiguration.cs:25, :47-49 |
| gas_threshold_profile | startup seed only (the Thresholds route is read only) | unique (ProjectId, GasType); unique GasType where ProjectId is null | alarm points for one gas, org default or project override | BE.Infra/ModelConfiguration/GasThresholdProfileConfiguration.cs:26-65; BE.Web/ThresholdsController.cs:8-11 |
| gas_zone | nothing in production code | unique (ProjectId, Name) | a named area with a risk level | BE.Infra/ModelConfiguration/GasZoneConfiguration.cs:21, :37-39 |
| gas_push_audit | the push receiver | unique PayloadMd5 | one acknowledged push delivery, raw bytes | BE.Infra/ModelConfiguration/GasPushAuditRecordConfiguration.cs:21-49 |
| gas_observation | poll sweep, same save as the alert; the dispatcher updates delivery columns | unique ExternalId; partial indexes on next_attempt_at and OccurredAtUtc (descending) | one outbox row for the Observation Manager | BE.Infra/ModelConfiguration/GasObservationConfiguration.cs:28-76 |

Component inventory (exact names, for labels in the animation):

| Layer | Names | Role | Evidence |
|---|---|---|---|
| Vendor | Blackline Live; Connect API (`/authorize`, `/token`, `/device`); Push service | the cloud WakeCap asks; the alerts-only channel | BE.Infra/Blackline/BlacklineTransport.cs:117-166; PROBE/docs/push_home.txt:4-33 |
| Backend host | `GasReadingsPollingBackgroundService`, `GasObservationDispatchBackgroundService` | the 45 s timer and the 5 s dispatcher | BE.Core/Hosting/GasReadingsPollingBackgroundService.cs:26; BE.Core/Hosting/GasObservationDispatchBackgroundService.cs:14 |
| Backend vendor access | `BlacklineClient` (`IBlacklineClient`), `BlacklineTransport`, `BlacklineResponseParser`, `BlacklineLogRedactor`, `BlacklineOptions` | call, parse, scrub | BE.Core/Services/BlacklineClient.cs:21; BE.Infra/Blackline/BlacklineTransport.cs:23; BE.Core/Services/BlacklineResponseParser.cs:28 |
| Backend logic | `GasPollSweepRunner` (`IGasPollSweepRunner`), `BlacklineGasMapping`, `BlacklineAlertMapping`, `GasThresholdResolution` | sweep, normalise, limits in force | BE.Core/Services/GasPollSweepRunner.cs:66; BlacklineGasMapping.cs:23; BlacklineAlertMapping.cs:24; GasThresholdResolution.cs:20 |
| Backend read and write | `GasQueryService` (`IGasQueryService`), `GasAlertHandlingService`, `GasDeviceZoneService` | reads, acknowledge and close, zone assignment | BE.Core/Services/GasQueryService.cs:71; GasAlertHandlingService.cs:53; GasDeviceZoneService.cs:33 |
| Backend hand-off | `GasObservationRecorder`, `GasObservationDispatchRunner`, `GasObservationManagerSink` (`IGasObservationSink`), `IObservationService` (Refit), `OutboxRetry`, `GasObservationInstruments` | outbox row, dispatch, ingest call, retry, metrics | BE.Core/Services/GasObservationRecorder.cs:35; GasObservationDispatch.cs:77, :207, :168; OutboxRetry.cs:32 |
| Backend routes | `DevicesController`, `SummaryController`, `AlertsController`, `ThresholdsController`, `ZonesController`, `GasPushController` | the HTTP surface | BE.Web/ (six files) |
| Observation Manager | `IngestionService`, `ObservationsConsumerService`, `ObservationHandlerResolver`, `WeatherStationObservationHandler`, `ObservationCompanyResolver`, `ObservationsHierarchy` | queue, resolve, create, company | OM/Wakecap.Observation.Core (files cited in section 4) |
| Notification | `RecipientRule` | who is notified (per project, source, source types, companies, zones) | /Users/admin/wc/wakecap-notification/Wakecap.Notification.Domain/Entity/Dispatcher/RecipientRule.cs:10 |
| Front end | `GasRouteGate`, `gasRoutes`, `createGasHttpAdapter`, `useGasQueries`, `useGasSiteState`, `deriveGasSiteState`, `GasStatusLine`, `GasNavStateMark`, `GasDashboardScreen`, `GasDevicesScreen`, `GasAlertsScreen`, `GasComplianceScreen`, `GasWallboardScreen`, `GasMobileScreen`, `useGasAlertActions` | gate, fetch, derive, draw | FE.Gas (files cited in section 5) |
| Tools | `Wakecap.WeatherStation.Tools.BlacklineCheck`, `blackline-probe`, `blackline-push-simulator`, `gas-detector-monitoring-standalone.html` | diagnostics and a design demo | section 7 |

## 3. The alert path

Two origins, one table (`gas_alert`, column `Source` = `platform` or `vendor`):
- Platform alert. A newly stored reading strictly over its gas's `High` alarm point opens an alert (`AlertType` `gas_high`, status active, `RaisedAtUtc` = the device's reading instant). A later reading at or under High closes it (status resolved, no subject: "nobody resolved this, the gas did"). [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:508-527, :618-680 (origin/master); test pin BE.Tests/GasAlertingTests.cs:112 (`AReadingAtOrUnderTheHighAlarmPoint_RaisesNothing`).
- The rule is deliberately small: no hysteresis, no sustained duration. It looks for an open row first, so one exposure is one alert, not 160. Only newly stored readings are judged, so a re-poll cannot re-raise an alert. [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:508-527, :618-640 (origin/master).
- Only `HighThreshold` is ever compared. `LowThreshold` is used only in the Thresholds read. So a low-oxygen reading (below 19.5 %VOL) never raises an alert. A reading in a different unit than its alarm point is skipped with a warning. [code]
  Evidence: `git grep -n LowThreshold origin/master -- <BE Core, Web.API>` hits only GasQueryService.cs:464; BE.Core/Services/GasPollSweepRunner.cs:556-584 (origin/master); FE.Gas/translations/en.ts:144-145.
- Vendor alert. The sweep mirrors each alert Blackline lists on a device into `gas_alert` (`Source` `vendor`), keyed by Blackline's alert id (unique index `UX_gas_alert_VendorAlertId`). [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:821-850, :969-1018 (origin/master); BE.Infra/ModelConfiguration/GasAlertConfiguration.cs:96-99.
- Vendor sync rules: a vendor update only moves an alert forward (active, acknowledged, resolved); an alert we hold open that Blackline no longer lists on a device whose list was complete is closed with no subject; a person's closure stands; our own sync closure is reopened if Blackline lists the alert again; a list with an unreadable entry closes nothing. [code]
  Evidence: BE.Core/Services/GasPollSweepRunner.cs:222-280, :829-850, :926-962, :1020-1062 (origin/master); BE.Core/Services/BlacklineAlertMapping.cs:74-85.

Alert types and which are critical:
- Critical (4): `gas_high`, `sos`, `fall`, `device_tipped_over`. Everything else is a warning (for example low_battery, no_motion_occurred, missed_check_in, network_timeout, silent_alert, twa_alert_detected, stel_alert_detected). [code]
  Evidence: BE.Core/Services/GasQueryService.cs:84-90, :92-93, :100-101; BE.Domain/Entity/GasAlert.cs:58-84.
- `gas_low` appears only in doc comments. No code creates or maps it. [code]
  Evidence: `git grep -n 'gas_low' origin/master -- <BE Core, Domain, Contracts, Web.API>` hits only GasAlertDto.cs:30 and GasAlert.cs:31 comments.
- The Summary's `criticalOpenAlerts` counts only active critical alerts, so an acknowledged SOS is not counted. The DTO comment lists "high gas, SOS or fall" and omits tipped over; the code includes it. [code]
  Evidence: BE.Core/Services/GasQueryService.cs:396-398; BE.DTO/GasSummaryDto.cs:35-40.

Acknowledge and close (recorded in WakeCap only):
- `POST .../Alerts/{id}/acknowledge` moves an active alert to acknowledged and records the time and the caller's verified OAuth subject (read from the token, never from the request). `POST .../Alerts/{id}/resolve` closes an alert from active or acknowledged. Both are one guarded UPDATE, idempotent, and answer 409 when the alert changed under them or was already closed (acknowledge on a closed alert). [code]
  Evidence: BE.Core/Services/GasAlertHandlingService.cs:11-25, :63-144; BE.Web/AlertsController.cs:49-87.
- Closing straight from active leaves `AcknowledgedAtUtc` empty: nobody acknowledged it. [code]
  Evidence: BE.Core/Services/GasAlertHandlingService.cs:118-119.
- Nothing is sent to Blackline. An alert closed here stays open in Blackline Live. Pushing the acknowledgement back (`PUT alert/:id`) is not built (a code comment names it TAN-2442). [code]
  Evidence: BE.Web/AlertsController.cs:52-57, :72-77; BE.Core/Services/GasAlertHandlingService.cs:19-22; BE.Core/Services/GasPollSweepRunner.cs:841-842 (origin/master); PROBE/docs/alert_put.txt:4-26 (the vendor call exists and is not used).
- The Alerts page says the same in words: "Acknowledging or closing an alert is recorded here with who did it and when. It is not sent to Blackline: an alert closed here stays open in Blackline Live." [live]
  Evidence: FE.Gas/translations/en.ts:393-394; RK/four-videos/gas/observations.md:27.
- The acknowledge and close deploy is live: between 4:40 and 4:46 PM on 4 Oct three alerts were closed in production and the counts moved (Open 12, Acknowledged 12, three Closed rows without a Close button). [live]
  Evidence: RK/four-videos/_research/refresh-1.0.7.md:17-18; RK/four-videos/gas/observations-1.0.7.md:3.
- The buttons show only to a person with write access; others see "You can read alerts here. Acknowledging or closing one needs edit access on this project." Close asks for confirmation. [code]
  Evidence: FE.Gas/GasAlertsScreen.tsx:202-302, :313-319, :333-340; FE.Gas/translations/en.ts:423-427.
- A closure stands against Blackline's status. If the gas is still over its alarm point, the next newly stored reading raises a new alert (and a new observation). [code]
  Evidence: BE.Web/AlertsController.cs:72-77; BE.Core/Services/GasPollSweepRunner.cs:1020-1027 (origin/master).
- The Gas header state (SAFE, CHECK, ALERT) is derived from readings and limits only. It does not read alerts. An open SOS does not turn the header or the wallboard to ALERT; it moves the Overview tiles. [code]
  Evidence: FE.Gas/hooks/useGasSiteState.ts:27-46 (reads devices and thresholds only); FE.Gas/utils/gasState.ts:393-494; RK/four-videos/gas/observations.md:15 (live: 15 open alerts, header still CHECK).

## 4. Hand-off of new critical alerts to the Observation Manager (TAN-2943)

State, part 1: merged to master as 8453a99 on 2026-10-04 17:00 (+0300), 18 files and 4441 insertions. [code]
  Evidence: `git -C <BE> show --stat origin/master`.

State, part 2: deployed to the TEST environment only; production deploy unverified. [test]
  Evidence: the task brief and MEM:11 (image tag `test-20261004-8453a99`, production not deployed). I cannot re-check either offline. Merging deploys nothing: a person dispatches `ecr-push.yml` with environment test, stage or prod (BE/.github/workflows/ecr-push.yml:11-18 at origin/master; rule "merge status is not completion status" in WS/CLAUDE.md).

- Trigger: a NEW alert that is active and of one of the four critical types. The outbox row is added to the same context and written by the same save as the alert, at both creation sites (platform rule and vendor sync). A refused alert write detaches its row, so no orphan survives. [code]
  Evidence: BE.Core/Services/GasObservationRecorder.cs:22-34, :59-74; BE.Core/Services/GasPollSweepRunner.cs:657-663, :683-733, :1013-1015 (origin/master).
- Outbox row = table `gas_observation`: alert id (no foreign key), observation type, indicator name and value, threshold text, serial number (the Blackline device id), occurred-at, description, unique `ExternalId`, `sent_at`, `Attempts`, `next_attempt_at`, `LastError`, `IngestionId`, `dead_at`. Partial indexes serve the claim. [code]
  Evidence: BE.Domain/Entity/GasObservation.cs:18-93; BE.Infra/ModelConfiguration/GasObservationConfiguration.cs:26-85.
- Types: `Gas` (high gas), `GasSOS`, `GasFall`, `GasTippedOver`. One type per kind because, per the code comment, the Observation Manager folds a new observation under an open one with the same source, type and device (not re-checked in OM). `ExternalId` is `gas|<alert id>`. [code]
  Evidence: BE.Core/Services/GasObservationRecorder.cs:37-56.
- Text: for a platform alarm "[WakeCap Gas] <gas> over its alarm point at device <id> (worn by <name>): <value> <unit> (alarm point <n> <unit>). Verify the area and respond." SOS, fall and tipped-over have their own sentences. A vendor gas alarm cannot name a gas or value. H2S is sent as "H₂S" so the Observation Manager screen finds its unit. [code]
  Evidence: BE.Core/Services/GasObservationRecorder.cs:76-80, :98-133; frontend-2.0-om/src/app/modules/ObservationManager/en.ts:882 (`"H₂S": "ppm"`).
- Dispatcher: `GasObservationDispatchBackgroundService` ticks every 5 s and has no on/off switch. Each tick: one transaction, claim due rows with `FOR UPDATE SKIP LOCKED`, newest occurrence first, batch 50, send, record. [code]
  Evidence: BE.Core/Configuration/GasObservationDispatchOptions.cs:7-26; BE.Core/Hosting/GasObservationDispatchBackgroundService.cs:14-51; BE.Core/Services/GasObservationDispatch.cs:207-284.
- Ingest call: Refit `IObservationService.Ingest` posts to `/api/ingest` with `ObservationIngestRequest`: Source `WeatherStation`, Type (the four above), ProjectId, one entry (generated-at, description, payload with indicator name and value, threshold, gateway id empty, serial number, danger tier null) and the `ExternalId`. One call per row. [code]
  Evidence: BE/Wakecap.WeatherStation.Infrastructure/RestServices/Admin/IObservationService.cs:9-10; BE/Wakecap.WeatherStation.Infrastructure/RestServices/ExternalRestPaths.cs:47-50; BE/Wakecap.WeatherStation.Contracts/Shared/DTO/ExternalRest/Observation/ObservationIngestRequest.cs:3-34; BE.Core/Services/GasObservationDispatch.cs:77-124.
- Outcomes: a 2xx with a body is Accepted and stores the ingestion id. A 2xx with no body is retried. A 4xx other than 408 and 429 is permanent and dead-letters at once. Anything else retries. [code]
  Evidence: BE.Core/Services/GasObservationDispatch.cs:126-160.
- Retry arithmetic: wait = 10 s x 2^(attempts-1), capped at 600 s; the 8th failure sets `dead_at`. Waits are 10, 20, 40, 80, 160, 320, 600 s, 1230 s in total (20.5 min) before a row dies. A dead row is logged at Error and counted on a gauge. [code]
  Evidence: BE/Wakecap.WeatherStation.Core/Shared/Outbox/OutboxRetry.cs:41-104; BE.Core/Configuration/GasObservationDispatchOptions.cs:15-23; BE.Core/Services/GasObservationDispatch.cs:236-255; sum computed by me (python3: 10+20+40+80+160+320+600).
- Metrics on the meter the host already exports: `gas_observation_sends_total{result}`, `gas_observation_dead_rows`, `gas_observation_oldest_unsent_age_seconds`. [code]
  Evidence: BE.Core/Services/GasObservationDispatch.cs:163-201.
- What does NOT send: acknowledge, close or clear; warnings (low battery, no motion, unrecognised types); an alert first seen already acknowledged or resolved; a re-poll. Only the creation of an alert builds a row. [code]
  Evidence: BE.Core/Services/GasObservationRecorder.cs:22-34, :64-74; BE.Core/Services/GasPollSweepRunner.cs:661, :1015 (origin/master).
- Not yet seen working on TEST: no Gas observation has been seen in the Observation Manager. The PR body lists the end-to-end check as unverified (needs a deploy and a real or provoked new alarm). [test]
  Evidence: WS/pr-bodies/BE-TAN-2943.md "UNVERIFIED" section (a PR body, not authoritative); MEM:11.

On the Observation Manager side (read at OM origin/master 4df736e; clone last fetched 2026-09-30):
- `POST /api/ingest` only enqueues the message and returns an ingestion id with a 2xx. Gas types are not in the high-priority list, so they go to the medium queue. [code]
  Evidence: OM/Wakecap.Observation.Core/Ingestion/IngestionService.cs:38-64, :70-113.
- A queue consumer then resolves a handler. Since TAN-2825 (73c1b9f, 2026-09-30) a WeatherStation observation resolves only if its Type is one of the constants in `ObservationsHierarchy.WeatherStation`: HeatIndex, Temperature, WindSpeed, DustParticles, Rainfall, BarometricPressure, WindDirection, AirHumidity, PM10, CO2, TSP, H2S, CO, Lightning (14). `Gas`, `GasSOS`, `GasFall` and `GasTippedOver` are not in the list. An unknown Type makes the resolver throw "No handler found", counted on `observation.ingest.rejected{source, reason=unknown_type}`. The consumer swallows the exception and acks the message. [code]
  Evidence: OM/Wakecap.Observation.Core/Processors/Handlers/Common/ObservationHandlerResolver.cs:74-88, :121-124; OM/Wakecap.Observation.Domain/Constants/ObservationsHierarchy.cs:194-231, :233-261; OM/Wakecap.Observation.Core/Processors/ObservationsConsumerService.cs:42-71; OM/Wakecap.Observation.SharedKernel/Observability/ObservationMetrics.cs:215-235; `git -C <OM> merge-base --is-ancestor 73c1b9f origin/master` says yes and `... 73c1b9f HEAD` says no.
- RISK, not verified: with that rule live, the Gas outbox row would read as sent (2xx plus ingestion id) while the Observation Manager creates no observation. The sink comment ("a category named for its type is created by the service itself") describes the behaviour before TAN-2825. The session note MEM:17 says "No Type whitelist"; that matches OM's checked-out tree (0dbd7f7, 2026-09-29) and not origin/master. Whether OM test or prod already runs TAN-2825, or whether OM master changed after 2026-09-30, I cannot see. [code]
  Evidence: BE.Core/Services/GasObservationDispatch.cs:71-76, :132-137; the OM files above; `git -C <OM> show HEAD:Wakecap.Observation.Core/Processors/Handlers/Common/ObservationHandlerResolver.cs` has no `GetTypes` check.
- Company is resolved for a WeatherStation observation by matching the serial number to Observation Manager devices in the project. A Blackline device id is not one, so a Gas observation carries no company. Zone is not sent either. [code]
  Evidence: OM/Wakecap.Observation.Core/Processors/Handlers/Common/ObservationCompanyResolver.cs:44-48, :91-118.
- Who is notified is a per-project recipient rule in the notification service, with fields Source, SourceTypes, CompaniesIds and ZonesIds. Which rules will match Gas is a decision the PR body leaves open. (Notification clone is from 2026-08-01.) [code]
  Evidence: /Users/admin/wc/wakecap-notification/Wakecap.Notification.Domain/Entity/Dispatcher/RecipientRule.cs:10-21; WS/pr-bodies/BE-TAN-2943.md "UNVERIFIED" (non-authoritative).
- Derived latency budget from code constants (not measured): WakeCap adds at most 45 s (poll) plus 5 s (dispatch tick) between Blackline listing an alert and the Observation Manager queue, if the send succeeds first time. A platform `gas_high` alert is bounded by the detector upload cadence (about 30 min) plus the poll. [code]
  Evidence: BE.Core/Configuration/GasPollingOptions.cs:67; BE.Core/Configuration/GasObservationDispatchOptions.cs:15; cadence from Hop 1.

## 5. The Gas screens

Where it lives: the Gas pages are a feature of the Connected Environment micro-app (`@wakecap-fe/connected-environment-app`), not a separate app. The backend is the same service as Weather Station and Lightning. [code]
  Evidence: WS/claude-code-prompt-gas-module.md:7 (micro-app name) and :13-15 (decision: all Gas work lands in the two existing repos); FE.Gas/contracts/apiUrls.ts:5-9.

Gates (all three must be true or the URL answers Not Found): the LaunchDarkly flag `connected-env-gas` is not false; the person holds `weatherstation:view` or `project_builder:manage`; and the project's `gasDetectorActive` entitlement is true (from `GET api/project/{projectId}/ProjectProduct`, which returns weatherStationActive, gasDetectorActive, lightningSensorActive). A second flag `connected-env-gas-sample-data` serves canned data only when explicitly true; real data is the default since 1.0.1. [code]
  Evidence: FE.Gas/GasRouteGate.tsx:61-73; FE.Gas/gasTabFlag.ts:15; FE.Gas/hooks/useGasReads.ts:21, :38-48; FE/src/app/features/Settings/contracts/apiUrls.ts:22-28; FE/src/app/features/Settings/types/productEntitlement.ts:12-16; RK/four-videos/_research/changes.md:29 (real data default since v1.0.1), :39 (flag defaults).

Routes (relative to `/:projId/connected-env`): `gas` (Dashboard, heading Overview), `gas/devices` (Detectors), `gas/alerts` (Alerts), `gas/compliance` (Compliance), `gas/wallboard`, `gas/mobile`. The wallboard and the phone view are not in the menu: they open by web address only. `gas/zones` redirects to the dashboard. [code]
  Evidence: FE.Gas/routes.ts:33, :39, :60-88, :113-144; RK/four-videos/final/4-gas.script.md:15-16 (beats g07, g08).

Data and refresh: five reads (Devices, Summary, Alerts with `limit=500`, Zones, Thresholds) and two writes (acknowledge, resolve). The page re-reads every 60 s (`GAS_REFETCH_MS`) and re-derives the state against the clock every 30 s (`GAS_STATE_TICK_MS`). The wallboard also re-reads on visibility change, going online, and page restore. [code]
  Evidence: FE.Gas/contracts/apiUrls.ts:19-83; FE.Gas/hooks/useGasQueries.ts:41-66; FE.Gas/hooks/useGasSiteState.ts:18-19; FE.Gas/hooks/useGasWallboardRecovery.ts:21-45.

Overview (the Dashboard page):
- Four tiles from one Summary read: Detectors, Online, Live alarms, Acknowledged. A number the backend did not send reads "Not available yet", never zero. [live]
  Evidence: FE.Gas/components/GasOverviewStrip.tsx:1-100; RK/four-videos/final/4-gas.script.md:11 (live: Detectors 5, Online 4, Live alarms 0, Acknowledged 12).
- "Gases, worst current reading": three tiles, H2S, O2, LEL. CO and CO2 are deliberately not recognised by the front end (TAN-2916); a reading of either would show as an unrecognised gas and make the site CHECK. [live]
  Evidence: FE.Gas/utils/gasNames.ts:9-22; FE.Gas/GasDashboardScreen.tsx:84-100; RK/four-videos/gas/observations.md:4.
- "Today" strip: Detectors reporting, Oldest reading, Closest to limit now are live; Peak today and Longest quiet gap are "Not available yet". [live]
  Evidence: FE.Gas/components/GasTodayStrip.tsx:38-103.
- Right column: "What needs attention" (capped at 3 with "+N more"), a Readiness badge, "Total detectors: N", and a per-detector state list. [live]
  Evidence: FE.Gas/components/GasNeedsYouNow.tsx:23-136; FE.Gas/utils/gasState.ts:56, :562-596; FE.Gas/components/GasDetectorStateList.tsx:14-60.
- The big SAFE word and the zone tiles were removed (TAN-2915, TAN-2926). The state is said in the header line, the nav dot and the Readiness badge. [code]
  Evidence: FE.Gas/GasDashboardScreen.tsx:1-22; FE.Gas/components/GasStatusLine.tsx:1-15.

Detectors: a table (Detector, Model, State, Battery, Last reported, Detail), filter All or Needs attention, detail opens inline. The detector name is the wearer's name if the vendor has one, else the vendor device id. A detector with no readings says "Never reported". [live]
  Evidence: FE.Gas/GasDevicesScreen.tsx:96-120, :164-179, :233-256; FE.Gas/api/gasDeviceMapper.ts:97-105; RK/four-videos/gas/observations.md:25.

Alerts: caption, four tiles (Open alerts, Critical open, Acknowledged, Closed), a table of the latest 500 alerts (Raised, Alert, Severity, Detector, Alarm point crossed, Detector's latest reading, Status, Actions). The "reading" column is the detector's latest reading, not the value that tripped the alert, although the backend stores that value. A panel says "The alert timeline and assignee are not available yet". [live]
  Evidence: FE.Gas/GasAlertsScreen.tsx:341-393, :408-437, :571-577; FE.Gas/api/gasReadMappers.ts:77; FE.Gas/translations/en.ts:393-405, :415.

Compliance: a "Limits in force" table (Gas, Now, Unit, Low alarm, High alarm, TWA 8 h, STEL 15 min) with the oxygen low side marked "(not alarmed yet)", and two panels that say "Not available yet": exposure against TWA and STEL with a compliance percentage, and exceedances per gas over time. The live page refuses to draw a trend from the capped alert list. [live]
  Evidence: FE.Gas/GasComplianceScreen.tsx:20-74, :49-141; FE.Gas/translations/en.ts:447-482; RK/four-videos/gas/observations.md:29.

Wallboard (`gas/wallboard`): chrome-free, full viewport; state word, headline, action line, honest line, attention list, gas tiles. The stop banner (pulsing) shows only for a real ALERT; motion is off under reduced motion. It never shows SAFE on a failed or stale read. [live]
  Evidence: FE.Gas/GasWallboardScreen.tsx:1-18, :47-174; RK/four-videos/gas/observations.md:30.

Phone (`gas/mobile`): one column, state word first, same derivation as the dashboard. The code comment says it is "the URL a gas alert push, SMS or email links into". No backend code sends such a link. [live]
  Evidence: FE.Gas/GasMobileScreen.tsx:1-8, :31-139; FE.Gas/routes.ts:35-39; `git grep -n -i -E 'gas/mobile|connected-env/gas' origin/master -- '*.cs'` in BE prints nothing.

How the state words are decided (SAFE, CHECK, ALERT), all in the browser from Devices plus Thresholds, never from alerts:
- Only SAFE is green. Missing data, stale (older than 60 min, exactly 60 is fresh), offline, never reported, unknown gas, unit mismatch, no limits, no detectors, contact lost (no detector with a reading under 60 min) and a failed refresh are all CHECK. [code]
  Evidence: FE.Gas/utils/gasState.ts:1-37, :52-53, :266-267, :294-372, :486-494; FE.Gas/hooks/useGasSiteState.ts:47-71.
- A fresh reading is ALERT only when strictly over its High limit (the backend alerts only strictly over). Oxygen above High is ALERT; below Low is CHECK, never ALERT. At or over Low is a warning (CHECK) for the other gases. [code]
  Evidence: FE.Gas/utils/gasState.ts:13-21, :228-242.
- The site state is the worst of its detectors and its gases, ALERT over CHECK over SAFE. Readiness reads "Ready" only when the site state is SAFE. [code]
  Evidence: FE.Gas/utils/gasState.ts:186-190, :486-494; FE.Gas/components/GasNeedsYouNow.tsx:31, :58-62.

## 6. Provenance table: 15 visible fields

Field texts were seen live in the 1.0.5 and 1.0.7 captures; the 1.0.7 refresh says the Gas UI text is unchanged since 1.0.5 (RK/four-videos/_research/refresh-1.0.7.md:16). Origin chain: vendor field, WakeCap table, read, derivation, screen.

| # | Visible field | Origin chain | BE evidence | FE evidence |
|---|---|---|---|---|
| 1 | Detectors "5", sub "Registered on this project" | vendor devices in GET /device, one `gas_device` row each, `Summary.deviceCount` = count of rows for the project | GasPollSweepRunner.cs:154-185 (upsert); GasQueryService.cs:385, :393 | GasOverviewStrip.tsx:44, :63-68; en.ts:234-236 |
| 2 | Online "4", sub "1 offline" | vendor `status.is_online` (null counts as offline) to `gas_device.IsOnline`; a 90-minute silence turns it off; `Summary.devicesOffline` = count of not online; front end shows total minus offline | GasPollSweepRunner.cs:191, :195-199, :1081-1105; GasQueryService.cs:394 | GasOverviewStrip.tsx:45, :69-78; en.ts:237-239 |
| 3 | Live alarms "0", sub "None waiting for a person" | `gas_alert` rows with status active (platform rule, or vendor unacknowledged) to `Summary.activeAlerts` | GasPollSweepRunner.cs:649, :1001; BlacklineAlertMapping.cs:65-72; GasQueryService.cs:399 | GasOverviewStrip.tsx:46, :79-86; en.ts:240-242 |
| 4 | Acknowledged "12", sub "Open, being handled" | `gas_alert` rows with status acknowledged (a person's POST, or vendor status) and not closed to `Summary.acknowledgedAlerts` | GasAlertHandlingService.cs:63-106; GasQueryService.cs:400-401 | GasOverviewStrip.tsx:47-48, :87-97; en.ts:243-244 |
| 5 | Worst current reading per gas, "Worst of N reporting" | newest `gas_reading` per (device, gas) via the Devices read; the browser keeps fresh readings of online detectors and picks the one closest to its alarm (value over High; oxygen distance from mid-range) | GasQueryService.cs:428-448, :485-499 | gasState.ts:379-387, :433-484; GasGasTile.tsx:140-160, :310-314; en.ts:115-123 |
| 6 | Limits lines, e.g. "Warning from 5 · alarm above 10 ppm · TWA 10 · STEL 15", oxygen "Safe 19.5 to 23.5 %VOL · alarm above 23.5 · low-oxygen alarm is not raised yet", LEL "Warning from 10 · alarm above 20 %LEL" | `gas_threshold_profile` org defaults seeded at startup, project override wins per gas, Thresholds read, text template | InfrastructureServiceRegistry.cs:590-640; GasThresholdResolution.cs:44-49; GasQueryService.cs:458-470 | GasGasTile.tsx:155-190; en.ts:138-146 |
| 7 | Check status, header "Gas CHECK" and nav dot | browser derivation from Devices plus Thresholds (not alerts); CHECK on offline, stale, unknown gas, warning band, contact lost, failed refresh | none beyond the reads | gasState.ts:1-37, :234-242, :486-494; useGasSiteState.ts:47-71; GasStatusLine.tsx:28-80; en.ts:47-51 |
| 8 | Readiness "Not ready", "Total detectors: 5" | browser: ready = site state is SAFE; total = detectors in the Devices read | GasQueryService.cs:103-114 | GasNeedsYouNow.tsx:31, :46-67; en.ts:177-180 |
| 9 | Last reading age "Last reading 17 min ago" | newest vendor `sensors[].date_utc` across detectors; backend age = now minus that instant (never negative); browser takes the smallest | GasPollSweepRunner.cs:349-352, :376; GasQueryService.cs:496, :514-515 | gasState.ts:253-263, :325-328, :503; en.ts:53-64 |
| 10 | "4 of 5 detectors reporting" and Today "Detectors reporting 4 of 5, Reading newer than 60 min" | browser count of detectors with at least one reading no older than 3600 s; differs from Online, which uses the vendor flag and a 90-minute net | GasPollingOptions.cs:84, :93 | gasState.ts:52-53, :266-267, :329, :403; GasTodayStrip.tsx:38-48; en.ts:209-214 |
| 11 | Open alerts "12", hint "Live count from the Summary read" | `gas_alert` rows with status not resolved to `Summary.openAlerts` | GasQueryService.cs:387-389, :395 | GasAlertsScreen.tsx:346-352; en.ts:397-402 |
| 12 | Critical open "0" | `gas_alert` rows that are active AND of a critical type (acknowledged excluded) to `Summary.criticalOpenAlerts` | GasQueryService.cs:84-90, :396-398 | GasAlertsScreen.tsx:353-358 |
| 13 | Closed "Not available yet" | no origin: the Summary has no closed count | GasSummaryDto.cs:15-63 | GasAlertsScreen.tsx:359-377; en.ts:403-405 |
| 14 | Peak today, Longest quiet gap, "Not available yet" | no origin in the UI: readings are stored and a history read exists but is not called | DevicesController.cs:76-98 | GasTodayStrip.tsx:5-6, :90-103; apiUrls.ts:10-13; en.ts:223-227 |
| 15 | Detectors page "Last reported 2026-10-04 13:21", "Battery 40%" | vendor `status.date_last_seen_utc` (forward only) and `status.battery.internal_level` to `gas_device.LastSeenAtUtc` and `BatteryPercent` to Devices read | GasPollSweepRunner.cs:190, :195-199; GasDeviceDto.cs:34-48 | gasDeviceMapper.ts:103-105; GasDevicesScreen.tsx:233-245; en.ts:349-364 |

Paths in the table: BE rows are under BE.Core/Services, BE.Core/Configuration, BE.DTO, BE.Web and BE/Wakecap.WeatherStation.Infrastructure; FE rows are under FE.Gas (components, utils, hooks, api, translations, contracts). GasPollSweepRunner.cs lines are origin/master.
Live values behind the examples: RK/four-videos/final/4-gas.script.md:11-26 (row 15 text is at :17); RK/four-videos/gas/observations.md:23-30; RK/four-videos/gas/observations-1.0.7.md:3-5; RK/four-videos/gas/captures.json (`captured_at`: 4 Oct 2026, 4:48 PM to 4:51 PM, build 1.0.7).

## 7. Tools, probes and prototypes

- `Wakecap.WeatherStation.Tools.BlacklineCheck` is a console tool in the backend solution. It pulls the device list through the shipped `BlacklineClient`, prints id, type, online, open-alert count and sensor gas types, and appends one row per device per gas to a local SQLite file `blackline-check.db` (table `device_check`: run_at_utc, device_id, device_type, gas_type). Exit codes 0 success, 1 Blackline answered but not with a device list or the handshake failed, 2 not configured. `--self-check` proves the file opens. Credentials come from the user-secrets store. On master since 2026-09-20. [code]
  Evidence: BE/Wakecap.WeatherStation.Tools.BlacklineCheck/Program.cs:8-12, :14, :36-47, :85, :103-118, :157-193 (origin/master); `git log origin/master -- Wakecap.WeatherStation.Tools.BlacklineCheck` shows 9049087 (2026-09-20), 36f2a66, b46f4ff.
- `blackline-probe` is a standalone Python (stdlib only) page on 127.0.0.1:8765. It runs authorize, token, device and alert and stores each raw request and response in `blackline_probe.db` (table `calls`, 2 rows). It holds captured vendor documentation under `docs/` (authorize, token, device, device_id, alert list, alert get, alert put, locate get, locate put, push home). A support note records the 2026-09-24 handshake failure that turned out to be a region problem. This is a sandbox tool outside the product repos. [code]
  Evidence: PROBE/blackline_probe.py:1-10, :16, :60, :117-131, :211-213; `ls PROBE/docs`; PROBE/blackline-support-repro.md:8-10; BE.Infra/Blackline/BlacklineOptions.cs:26-32 (note: the capture shows HTTP 400, the code comment says HTTP 200).
- `blackline-push-simulator` is a sandbox console tool. Menu 1 sends a simulated push to the receiver (default target is the production URL; a confirmed 2xx writes a real `gas_push_audit` row). Menu 2 drives the Connect API, and its item 12 "MONITOR" runs the whole Connect flow every 30 s, GET only, saving each cycle. This is a sandbox tool outside the product repos. [code]
  Evidence: SIM/README.md:6-8, :37-46, :48-54; SIM/Program.cs:19, :37-38; SIM/BlacklineConnect.cs:80, :506-515.
- `gas-detector-monitoring-standalone.html` (282 KB, 2026-09-13) is the early design demo: simulated data only, 5 detectors, 3 zones, 3 alerts, 2 seeded observations, and two pages: Fleet Overview and an Observation Manager view. It carries things the live product does not have: a calibration-due bucket, CO, a site map and acknowledge reasons ("Testing", "Resolved"). The demo's top bar names a real customer project (not reproduced here). [plan]
  Evidence: PROTO:84-88 (zones), :90-96 (detectors), :98-102 (alerts), :104-111 (seeded observations), :118-123 (calibration), :143-148 (observation text), :181-196 (status buckets), :200-218 (state and acknowledge reasons), :315 (sidebar).
- `prototypes/gas-connected-env` is the approved Vite prototype whose `src/lib/gas.ts` rules were ported into `FE.Gas/utils/gasState.ts`, with one deliberate departure: the prototype alarmed at or over the limit, the product alarms strictly over, to match the backend. [plan]
  Evidence: WS/prototypes/gas-connected-env/src/lib/gas.ts (exists); FE.Gas/utils/gasState.ts:1-37.

## 8. Plan versus built

The July to September plan expected a separate connector service, a separate Gas micro-app and wider features. What exists:

| Planned | Built | Status | Evidence |
|---|---|---|---|
| G1 Blackline connection live | Connect client, token handling, parser, real EU data | code, live data | ZOP:110; BE.Core/Services/BlacklineClient.cs |
| G2 continuous readings every 30 to 60 s, history via an API | poll every 45 s; history read exists; the screens do not use it | code | ZOP:112; GasPollingOptions.cs:67; DevicesController.cs:76-98 |
| G3 alerts in seconds, acknowledgements flowing back, a reconciler | push is receipt-only; alerts mirrored by the poll; no write-back | code | ZOP:114; GasPushController.cs:35-38; GasPollSweepRunner.cs:841-842 |
| G4 TWA, STEL, peaks, exposure, compliance, AQI, MTBA computed by WakeCap | nothing computed; UI says Not available yet | vision | ZOP:116; en.ts:462-470 |
| G5 gas alerts through WakeCap notifications (low O2, offline, battery, calibration) | new critical alerts go to the Observation Manager; no low-O2, battery or calibration rules | code (hand-off on TEST only) | ZOP:118; GasObservationRecorder.cs:22-34 |
| G6 five-tab app | four pages plus wallboard and phone; Zones hidden | code, live | ZOP:120; routes.ts:60-88 |
| G7 go-live switch | LaunchDarkly flag, per-project entitlement, real data default | code, live | ZOP:122; GasRouteGate.tsx:61-73 |
| G8 hardened, piloted, signed off | unknown | plan | ZOP:124 |
| Separate `gas-blackline-connector` service and `frontend-2.0-gas` app | superseded: built inside the two existing repos | code | WS/claude-code-prompt-gas-module.md:13-15; PLAN:60-63 |

Paths: ZOP lines are in ConnectedEnvironment*Zero-OpenProgram.md (glob; see section 0). The program doc also names customers and people; none are reproduced here.

## 9. Numbers (all measured or derived by me, read-only)

Sizes and history (BE at origin/master, FE at HEAD):
- BE Gas source: 49 files, 6434 lines across Core, Web.API, Infrastructure, Domain and Contracts (Products/GasDetector).
  Evidence: `cd <BE>; for f in $(git ls-tree -r --name-only origin/master Wakecap.WeatherStation.Core/Products/GasDetector Wakecap.WeatherStation.Web.API/Products/GasDetector Wakecap.WeatherStation.Infrastructure/Products/GasDetector Wakecap.WeatherStation.Domain/Products/GasDetector Wakecap.WeatherStation.Contracts/Products/GasDetector); do git show origin/master:$f | wc -l; done | awk '{s+=$1;n++} END{print n" files, "s" lines"}'`
- BE Gas tests: 27 files, 8162 lines, 257 test methods (216 Fact, 41 Theory).
  Evidence: `git ls-tree -r --name-only origin/master Wakecap.WeatherStation.IntegrationTests/Products/GasDetector | grep -c '\.cs$'` (27); the same loop as above over those files (8162); `git grep -h -E '^[[:space:]]*\[(Fact|Theory)' origin/master -- 'Wakecap.WeatherStation.IntegrationTests/Products/GasDetector/*.cs' | wc -l` (257).
- BE commits touching the five Gas source folders: 19, from 2026-08-30 to 2026-10-04.
  Evidence: `git log --format='%ad' --date=short origin/master -- <the five folders> | sort | awk 'NR==1{f=$0}{l=$0;n++}END{print n,f,l}'`
- FE Gas feature: 64 source files, 8716 lines; 23 test files; 313 test cases; 14 commits from 2026-09-08 to 2026-10-04.
  Evidence: in <FE>: `find src/app/features/Gas -type f \( -name '*.ts' -o -name '*.tsx' \) ! -name '*.test.*' | wc -l` (64; add `-print0 | xargs -0 cat | wc -l` for 8716); `find src/app/features/Gas -type f -name '*.test.*' | wc -l` (23); `grep -rhoE '^[[:space:]]*(it|test)(\.each)?\(' src/app/features/Gas --include='*.test.*' | wc -l` (313); `git log --reverse --format='%ad %h %s' --date=short -- src/app/features/Gas` (14 lines).
- Gas tables 8; weather 13 and lightning 5 table configurations in the same context; gas migrations 4; background workers 8 of which 2 are Gas.
  Evidence: `git grep -h -E 'ToTable\(' origin/master -- 'Wakecap.WeatherStation.Infrastructure/Products/<Product>/ModelConfiguration/*' | wc -l` for GasDetector (8), WeatherStation (13), LightningSensor (5); `git ls-tree -r --name-only origin/master | grep -i 'Migrations/.*gas.*[^r]\.cs$'` for the 4 gas migrations; `git grep -n 'AddHostedService<' origin/master -- <Core, Web.API, Infrastructure>` (8 lines).

Constants in code (file and line in sections 2 to 5):
- Poll 45 s (floor 10 s); offline net 5400 s; stale flag 3600 s; transport retries 3 with 500 ms base; timeout 30 s.
  Evidence: BE.Core/Configuration/GasPollingOptions.cs:24, :67, :84, :93; BE.Infra/Blackline/BlacklineOptions.cs:48-53.
- Dispatcher 5 s tick, batch 50, 8 attempts, backoff base 10 s, cap 600 s.
  Evidence: BE.Core/Configuration/GasObservationDispatchOptions.cs:15-23.
- Front end: reads every 60 s, state re-derived every 30 s, alerts read limit 500.
  Evidence: FE.Gas/hooks/useGasQueries.ts:48; FE.Gas/hooks/useGasSiteState.ts:19; FE.Gas/contracts/apiUrls.ts:43.
- Backend alerts read: default 100, max 500. History read: default window 24 h, max 5000 points.
  Evidence: BE.Core/Services/GasQueryService.cs:94-95; BE.DTO/GasReadingHistoryDto.cs:93, :99.
- Critical alert types 4; gases the backend knows 5 (H2S, CO, CO2, O2, LEL); gases the front end recognises 3 (H2S, O2, LEL).
  Evidence: BE.Core/Services/GasQueryService.cs:84-90; BE.Domain/Constants/GasTypes.cs:10-14; FE.Gas/utils/gasNames.ts:17-22.

Derived from those constants (arithmetic, not measured): 1,920 polls a day (86400 / 45); 40 polls per 30-minute upload interval; outbox backoff total 1,230 s; about 720 reading rows a day for 5 detectors x 3 gases x 48 uploads (assumes the measured 30-minute cadence and the 5-detector, 3-gas fleet in the fixtures).
  Evidence: `python3 -c "print(86400/45, 30*60/45, sum(min(10*2**(a-1),600) for a in range(1,8)), 5*3*48)"`

Measured on committed real-account fixtures (captured 2026-09-30): 5 devices, 4 online, 1 offline, 15 sensor series, 11 open vendor alerts (6 emergency_alert, 5 device_tipped_over), 12 of 15 series changed in 27 minutes.
  Evidence: `git -C <BE> show origin/master:Wakecap.WeatherStation.IntegrationTests/Products/GasDetector/Fixtures/blackline-eu-device-list-first-poll.json | python3 -c 'import sys,json; d=json.load(sys.stdin); print(len(d), sum(1 for x in d if x["status"]["is_online"]), [len(x["status"]["sensors"]) for x in d], [len(x["alerts"]) for x in d])'`; same for `blackline-eu-device-list-27-minutes-later.json` comparing each series' `date_utc`; `blackline-eu-alert-list.json` has 11 entries.

Measured on the sandbox monitor run (2026-09-30 13:12 to 13:42, real vendor cloud, not WakeCap production): 60 polls at 30 s, span 29.5 min, 900 reading rows, 0 failed steps, one authorize for all 60 cycles, devices with two reading instants were exactly 30.0 minutes apart, median cycle 1811 ms for 7 requests.
  Evidence: python3 over SIM/responses/monitor_2026-09-30_131232/cycles.jsonl (60 lines, 59 cycles of 7 steps and 1 of 9) and readings.jsonl (900 lines); `ls SIM/responses/monitor_2026-09-30_131232 | grep -c '^cycle_'` (60). The cycle makes more calls than production (one GET per device plus GET /alert); production makes one GET /device per tick.

Seen live (build 1.0.7, 4 Oct 2026, 4:48 to 4:51 PM Saudi time, Project C): 5 detectors, 4 online, 0 live alarms, Acknowledged 12, Open alerts 12, Critical open 0, Closed no count, 15 alert rows listed (12 acknowledged and 3 closed), header "Gas CHECK", "4 of 5 detectors reporting", oldest reading about 3 h 25 min. Do not interpret the SOS or tipped-over rows (lead decision).
  Evidence: RK/four-videos/_research/refresh-1.0.7.md:17-19; RK/four-videos/gas/observations-1.0.7.md:3-4; RK/four-videos/gas/observations.md:15, :23-24; RK/four-videos/gas/captures.json (`captured_at`).

Observation Manager list: 14 accepted WeatherStation types, 0 Gas types (OM origin/master 4df736e).
  Evidence: `git -C <OM> show origin/master:Wakecap.Observation.Domain/Constants/ObservationsHierarchy.cs | sed -n '194,231p' | grep -c 'public const string'` (14); no line contains "Gas".

## 10. Timeline (for an animated strip)

- 2026-07-21 to 2026-08-26: vendor offers Connect API (pull) and Push (alerts only); the decision is Connect now, Push later; the integration plan is drafted. [plan] (PLAN:3, :8-15)
- 2026-08-30: first backend commit touching the Gas folders (per-product permission prefix, BE df300aa).
- 2026-09-08: Gas tab on, five screens on fixture data (FE 561c504). 2026-09-09: Gas tables migration.
- 2026-09-13: Blackline ingestion and readings API (BE 688b766); push receiver and audit table (BE 34107cd).
- 2026-09-14 and 2026-09-29: push receiver gets an API-key header, then a path secret, then all auth is dropped on purpose (BE ef60b03, 3358b28, a3570a4).
- 2026-09-24: handshake failure captured against the North America host; the cause, a wrong region, is named later in code (PROBE/blackline-support-repro.md:8-10; BE.Infra/Blackline/BlacklineTransport.cs:196-201).
- 2026-09-28: readings and alerts keyed on the device row (BE a65c4dc).
- 2026-09-30: "works on real EU data" (BE b46f4ff); read-only alerts, zones, thresholds endpoints (BE 2b5e7d8); front end maps live devices and derives SAFE, CHECK, ALERT, wallboard and phone (FE TAN-2854 series).
- 2026-10-01: real data becomes the front-end default (FE 31a3f80); Blackline call logging; default poller project.
- 2026-10-04: skip already-stored readings before insert (BE 7a13cbb); acknowledge, close and counts (BE b36cdfa, FE 7f5eef0); Zones hidden (FE 95e1650); Observation Manager hand-off merged (BE 8453a99); production serves FE 1.0.7.
  Evidence: `git -C <BE> log --format='%h %ad %s' --date=short origin/master -- <five Gas folders>`; `git -C <FE> log --reverse --format='%ad %h %s' --date=short -- src/app/features/Gas`; RK/four-videos/_research/changes.md:26-31.

## 11. What the story can say, and what it must not

Can say (each backed above):
- Detectors report to the vendor's cloud; WakeCap asks that cloud every 45 seconds; each detector uploads about every 30 minutes, so a "current" reading can be up to about 30 minutes old.
- Every distinct reading is stored once, with the device's own time, in WakeCap's own database next to weather and lightning.
- One alert table holds alerts WakeCap derived and alerts Blackline raised. Four types are critical.
- Acknowledging and closing are recorded in WakeCap with who and when, and are not sent to the vendor.
- The screens never show SAFE on doubt. They show CHECK and say what is missing.
- A new critical alert also writes an outbox row in the same database save, and a dispatcher then posts it to the Observation Manager (merged; TEST only; not yet seen end to end).

Must not say:
- That every gas is checked against its limits: oxygen's low side is not alarmed. (FE.Gas/translations/en.ts:144-145)
- That an SOS or fall turns the Gas header red: the header reads readings only.
- That acknowledgements reach Blackline.
- That alerts already reach the Observation Manager in production, or in test, until one provoked alert is seen end to end (see the risk in section 4).
- That exposure, TWA, STEL, compliance or peaks are computed.
- That Gas works for any project: one Blackline account feeds one configured project.
- That a gas reading can be tied to a worker, permit, equipment or WakeCap zone today: the wearer is free text, no location is stored, no zone is created by any code. (BE.Domain/Entity/GasDevice.cs:21-36)
- The same limit is called "warning point" on the Overview and "Low alarm" in the Compliance table. (FE.Gas/translations/en.ts:138-139 against :491-492)

For the data-bank story (what Gas offers and lacks): every Gas row except thresholds and push audit carries `ProjectId`, so Gas joins other products on project today. It cannot join on worker, zone, permit or equipment yet. [code]
  Evidence: BE.Domain/Entity/GasDevice.cs:14, GasReading.cs:14, GasAlert.cs:14, GasObservation.cs:18, GasZone.cs:13, GasSyncState.cs:14 (all `IProjectEntity`); GasDevice.cs:21-36; OM ObservationCompanyResolver.cs:91-118.

## 12. Gaps and open risks

1. Deploy state of TAN-2943: "TEST only" comes from the task brief and a session note (image tag). No repo artifact proves it, and production is unverified.
2. Observation Manager type whitelist (section 4): Gas types are not accepted by OM origin/master as of 2026-09-30. Not verified against the deployed OM or a newer master. This needs one provoked alert in test and a look at `observation.ingest.rejected`.
3. Is Blackline's Push service registered against the production endpoint? No evidence in the repos. `gas_push_audit` row counts need database access I do not have.
4. No database access: row counts of `gas_reading`, `gas_alert`, `gas_observation` in any environment are unknown. No retention rule exists in code.
5. Vendor rate limits, token lifetime and the vendor's alert latency for SOS are unanswered in the code comments. The sandbox monitor showed a token valid for at least 29.5 minutes.
6. Notification recipients for Gas are undecided (PR body, non-authoritative). Notification clone is from 2026-08-01.
7. The Gas poller feeds one project from one Blackline account. Which projects have Gas switched on in `ProjectProduct` is not visible to me. A second project with the switch on would list no detectors.
8. The infra clone is from 2026-09-22. The built-in default project applies when the infra does not set `GasDetector:Polling:ProjectId`; I did not verify the live setting.
9. UI copy says "the backend does not keep" stored readings, while the backend keeps them and has a history read. Peak today and Longest quiet gap could be built from it. Copy or build needs a decision.
10. The Alerts page says changes are "recorded here with who did it and when", but the screen cannot show who (the DTO omits the subject).
11. Doc drift to avoid quoting: `GasSummaryDto` comment omits tipped over; `DevicesController` and FE `permissions.ts` comments still mention `gasdetector:*` grants (the backend stopped seeding them in commit 16addbf, 2026-09-10); the infra still renders a `Blackline:Push:ApiKey` the backend no longer reads; `CoreServiceRegistry.cs:62` says the Observation Manager does not dedupe on ExternalId yet, while OM commit 9950f8e (2026-09-24) made WeatherStation ingest idempotent.
12. No cost, lives or incident-rate figure for Gas exists in the evidence I read. None is invented. The SOS and tipped-over rows in production must not be interpreted (lead decision).
13. Detector hardware details beyond the vendor type string `exo_mk2` (uplink technology, calibration, bump test) are not in the code or the fixtures. The prototype's "Calib Due" is not backed by any field.
14. Pilot sign-off and go-live date for the site are not stated in any file I read.
15. The probe note records HTTP 400 for a wrong-region authorize on 2026-09-24; a code comment says HTTP 200. Both carry the same error body. Not reconciled.
16. The Gas FE state is derived in the browser. The same rules are not enforced anywhere in the backend, so another client would have to reimplement SAFE, CHECK and ALERT.
17. The side rail lost the "Trends Planned" row after 1.0.7 (TAN-2956, master only); production 1.0.7 still shows it in the captures.
18. The phone view is described in code as the target of a gas alert push, SMS or email link. No backend code sends such a message. Do not claim Gas sends push, SMS or email; the only outward path is the Observation Manager hand-off.
19. The backend README, WEATHER_STATION.md and docs folder contain no Gas or Blackline section, so there is no runbook for the poller, the push receiver or the outbox in the repo (`grep -n -i -E 'gas|blackline' README.md WEATHER_STATION.md` prints nothing).
