# Lightning capture observations (2026-10-04, ~15:22-15:30 AST)

Project B (Lightning), production, one device, state All Clear. Labels: [live] seen in the portal, [code] read in the FE repo.

## New and live today
- [live] Radii map beside the tile (frame l-radii-map, l-top-b). Red ring, yellow ring, green state dot, Temporary badge. It is the Leaflet/OpenStreetMap version (attribution "Leaflet | © OpenStreetMap contributors"). [code] A switch to Esri ArcGIS was merged the same day and is NOT in production yet.
- [live] Settings > Lightning (l-settings-b-all): Alerting radii with "Edit alerting radii" and "Set location" buttons, the Temporary location panel, and "Full state history — last 24 hours" with Export CSV.
- [live] Tile redesign: status band (All Clear + Safe to work + Normal operations.), zone ring diagram, chips, Held for box.
- [live] Alarm activity chart below the tile row, then Alarm history (disabled Export CSV when empty).
- [live] Wallboard (/lightning/wallboard) and phone view (/lightning/mobile) both exist and render.
- [live] Trends tab marked "Planned" / "Not available yet".

## Not found / surprises
- No lightning indicator in the shared header on this project. [code] The site indicator lives on the Weather Station home, which this project does not have (weather-station URL shows 404).
- The 24 h history shows many short "Data unavailable" rows with source stale_sweep between GREEN rows, even at All Clear. Worth knowing before the video says "continuous".
- The map reveals the real terrain around the site (coast, plant footprint). No names, but recognisable to the customer. Frame masks hide the device label in the tile and map heading.
- The wallboard has no Held for box and no map; it has no portal chrome.
- The mobile route at 430 px width still carries the portal rail and header.
- The map heading is "Alarm radii — <device label>" and contains a site-derived name; masked, so the frame reads "Alarm radii".
- The settings location line shows exact coordinates (masked in the frame, scrubbed in the txt).

## Exact wording (verbatim)
- Backup banner (l-top-b): "WakeCap lightning alerts are a backup. Always follow the site's cabinet lights and sounder first."
- Readings as of (l-top-b): "Readings as of 2026-10-04 15:22 (AST)"
- State label / badge / action: "All Clear", "Safe to work", "Normal operations."
- Zone chips: "RED ≤ 13km", "YELLOW 13-20km", "ALL-CLEAR 30min"
- Zone caption: "Zone reference only — not a live strike position. This device reports no distance or bearing; the rings show the configured alert thresholds, nothing more."
- Held for: "HELD FOR" / "117h 29m" / "since 2026-09-29 17:53 (AST)"
- Map legend (l-radii-map): "Red ring: the Red radius. Yellow ring: the Yellow radius. The dot shows the sensor's current state."
- Map note: "Set manually until Management Maps supports lightning sensor locations."
- Alarm activity: "Yellow: 0 · 0s total", "Red: 0 · 0s total", "0 alarm(s) in this window."
- Alarm history caption (l-hist-b): "Every YELLOW, ORANGE or RED interval in this window — the site's own alarm record, without the GREEN and data-unavailable rows around it. All times in AST, UTC+3. Strike distance, bearing and count are not part of this feed and are never shown here."
- Alarm history empty state: "No alarms were raised in this window."
- State history caption (l-settings-b-all): "Every state the device passed through, including data-unavailable gaps. All times in AST, UTC+3."
- Settings intro: "These are the radii the alerting service uses on this project. A change applies to one device only, and takes effect on its next reading."
- Alerting radii value: "Red ≤ 13 km · Yellow 13-20 km · 30 min all-clear"
- Table columns: Start, End, Duration, State, Source. Values: GREEN, Data unavailable, In progress, packet, stale_sweep.
- [code] Other states (not seen live): "Caution — Yellow", "Warning" (action "Stop work now. Move all personnel to shelter."), "Unknown", "Fault"; empty dashboard "No lightning signal yet". These are DIRECTION for the video only as code, not live.

## Time and date formats seen
- Header clock: "Oct 4, 2026, 3:23 PM"
- Readings as of: "2026-10-04 15:22 (AST)"
- Held since: "since 2026-09-29 17:53 (AST)"
- Tables: "2026-10-04 07:49", end "In progress"; durations "7h 36m", "59m", "15s", "0s", "1m"
- Zone is AST, UTC+3 (Saudi time) everywhere on the Lightning screens.

## Disabled / not clicked
Export CSV on Alarm history is greyed (no rows). Export CSV in state history was enabled and not clicked. Edit alerting radii, Set location, map zoom +/- not clicked.

## Process notes
- l-hist-b uses window y0=412 not 520 (1400 px viewport limit). l-mobile-phone-b is a composite of a 430 px screenshot on a grey canvas.
- A committed secret was not looked for; none was noticed. The pasted Gemini key in the request was not used or written anywhere.
