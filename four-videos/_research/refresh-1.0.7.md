# Refresh note, 4 Oct 2026 about 5 PM (production build 1.0.7). READ FIRST: it overrides older research and captures where they differ.

## Production build
- Production now serves front-end 1.0.7 (public runtime-config, checked 16:34 and 17:00). Earlier research and captures were made on 1.0.5.
- Only two front-end commits sit between 1.0.5 and 1.0.7, both Lightning. Weather Station, Reports, Settings and Gas screens are unchanged.

## Lightning (frames recaptured 4:52 to 4:55 PM in a visible browser window)
- The radii map beside the state tile is now an Esri ArcGIS map with a SATELLITE basemap (it was OpenStreetMap). It is wide, shows a red filled circle and a yellow ring around a green sensor dot, and the legend line under it is unchanged: "Red ring: the Red radius. Yellow ring: the Yellow radius. The dot shows the sensor's current state." It needs WebGL2 to draw.
- The Temporary badge and the note "Set manually until Management Maps supports lightning sensor locations." are now ONLY in Settings > Lightning (next to the Location line). They are gone from the main Lightning page and from the map card.
- The satellite imagery shows real terrain and a town. EVERY map frame is blurred on purpose (l-top-b, l-radii-map, l-hist-b, u-lightning-b). Never describe the imagery. A caption may say "map blurred". The map heading reads "Alarm radii" (the site label is masked).
- Unchanged: backup banner, state tile (All Clear, Safe to work, Normal operations), zone ring and chips, zone caption, Held for box, alarm activity chart, alarm history (empty, Export CSV disabled), wallboard and phone views, Settings (radii, Edit alerting radii, Set location, 24 h state history with Data unavailable gaps).
- Still open (research L10): the Settings intro line says "These are the radii the alerting service uses on this project..." while the backend treats radii as display-only. Do not claim the radii change what the alarm does; do not put that line under a spotlight or zoom.
- Frame rects were remeasured for l-top-b, l-radii-map, l-hist-b, l-settings-b-all, u-lightning-b, u-settings-lightning-b (see captures.json). Wallboard and phone frames were recaptured with the same layout; their rects are kept.

## Gas (frames recaptured 4:48 to 4:51 PM in a visible browser window)
- The Gas UI is unchanged since 1.0.5: identical text on all six pages apart from numbers.
- The DATA changed: three alerts were closed in production between 4:40 and 4:46 PM by someone using the Close button (we never clicked anything). The Alerts page now shows Open alerts 12, Critical open 0, Acknowledged 12, Closed "Not available yet" (the Closed tile still has no count); the three newest rows (2026-10-04 13:11) read Closed with no Close button; the older rows read Acknowledged with a Close button. The Dashboard Overview now says Acknowledged 12.
- This answers an earlier open question: the backend with Gas acknowledge and close is deployed (the rows changed to Closed and the counts moved). It does not tell us who closed them or when, and the page still says: "It is not sent to Blackline: an alert closed here stays open in Blackline Live."
- Still true: Live alarms 0 ("None waiting for a person") counts alerts nobody has acknowledged; Open alerts counts alerts not yet closed. Explain the difference if both numbers are narrated. The alert list rows come from one offline detector (3589602346); do not interpret the SOS or tipped-over rows.

## Weather Station and umbrella frames
- Station display names ("Main Plant Weather Station", "SCC Weather Station") are now blurred in every frame that shows them (w-top-a, w-gear-a, w-reports-a, w-reports-7d-a, u-ws-a, u-rail-tooltip, u-ws-gear-a, u-reports-a). Station serial numbers such as 1925073288 stay visible. Do not narrate station names.
- The Gas and Lightning frames inside the umbrella video were replaced by the new captures (u-gas-c, u-gas-devices-c, u-gas-alerts-c, u-gas-compliance-c, u-ws-c, u-lightning-b, u-settings-lightning-b). The old 1.0.5 versions are archived under _review/frames-1.0.5/ (internal only).

## Lead decisions (apply to every video)
1. Blurred station names on screen are fine. Never narrate a station name.
2. "Held for": never narrate it, never spotlight or zoom onto it (two clocks disagree). If it is visible during a camera glide, accept that; prefer glides that start away from it.
3. Heat band numbers on the Safety Policy page may be on screen but must not be narrated or spotlighted; callout labels carry no band numbers.
4. The green "Last reading was N minute(s) ago." line under an offline headline contradicts the headline: avoid zooms that include it and keep full-frame glides over it short.
5. No blanket claim "never falsely safe" over the three products. Say only what is shown: Gas shows CHECK and "Not confirmed safe" when a detector is not reporting; Lightning treats only the green state as safe to work (a rule, not page text); Weather Station names an offline station and reads Not ready.
6. "Control" means exactly: Weather Station safety policy limits (with a 30-day "would have stopped" preview); Gas alerts can be acknowledged and closed, recorded in WakeCap only; Lightning has alert distances and a sensor location in Settings (never claim the distances change what the alarm does). Each product has its own settings.
7. Never say "Stopped on N days": the preview says "Would have stopped work on N of the last 30 days".
8. Oxygen has a low limit (19.5) that is "not alarmed yet" on the page: never say every gas is checked against its limits; say what each card shows.
