export const meta = {
  name: 'four-videos-update',
  description: 'Update the four video specs to the refreshed screens (build 1.0.7), fix the earlier fact-check findings, re-render the silent previews, verify with three lenses, revise, reverify, cross-check. No voice, nothing posted.',
  phases: [
    { title: 'Update', detail: 'one updater per video: edit spec.json and beatsheet.md, silent preview render, frame inspection' },
    { title: 'Verify', detail: 'claims, hygiene and visual lenses per video' },
    { title: 'Revise', detail: 'apply valid findings, re-check, re-render' },
    { title: 'Reverify', detail: 'fresh lenses on the revised spec' },
    { title: 'Consistency', detail: 'cross-video contradictions and coverage of the brief' },
  ],
}

const ROOT = '/Users/admin/wc/weather-station/release-kit/four-videos'
const VB = 'python3 ' + ROOT + '/_tools/vbuild.py'
const dirOf = (v) => ROOT + '/' + v.id

// ------------------------------------------------------------------ schemas
const DIRECTOR = {
  type: 'object',
  properties: {
    video: { type: 'string' },
    spec_path: { type: 'string' },
    beatsheet_path: { type: 'string' },
    beats: { type: 'number' },
    words: { type: 'number' },
    est_seconds: { type: 'number' },
    check_clean: { type: 'boolean' },
    dry_render: { type: 'string' },
    frames_inspected: { type: 'number' },
    changes_made: { type: 'array', items: { type: 'string' } },
    open_issues: { type: 'array', items: { type: 'string' } },
    assumptions: { type: 'array', items: { type: 'string' } },
  },
  required: ['video', 'spec_path', 'beatsheet_path', 'beats', 'words', 'est_seconds', 'check_clean', 'dry_render', 'frames_inspected', 'changes_made', 'open_issues', 'assumptions'],
}
const FINDINGS = {
  type: 'object',
  properties: {
    lens: { type: 'string' },
    video: { type: 'string' },
    verdict: { type: 'string', enum: ['pass', 'fail'] },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          beat: { type: 'string' },
          severity: { type: 'string', enum: ['blocker', 'major', 'minor'] },
          issue: { type: 'string' },
          evidence_checked: { type: 'string' },
          suggested_fix: { type: 'string' },
        },
        required: ['beat', 'severity', 'issue', 'evidence_checked', 'suggested_fix'],
      },
    },
    checked: { type: 'array', items: { type: 'string' } },
  },
  required: ['lens', 'video', 'verdict', 'findings', 'checked'],
}
const REVISE = {
  type: 'object',
  properties: {
    video: { type: 'string' },
    changed_beats: { type: 'array', items: { type: 'string' } },
    resolved: { type: 'array', items: { type: 'string' } },
    rejected: { type: 'array', items: { type: 'object', properties: { finding: { type: 'string' }, why: { type: 'string' } }, required: ['finding', 'why'] } },
    unresolved: { type: 'array', items: { type: 'string' } },
    check_clean: { type: 'boolean' },
    dry_render: { type: 'string' },
    frames_inspected: { type: 'number' },
  },
  required: ['video', 'changed_beats', 'resolved', 'rejected', 'unresolved', 'check_clean', 'dry_render', 'frames_inspected'],
}
const CONSISTENCY = {
  type: 'object',
  properties: {
    contradictions: { type: 'array', items: { type: 'object', properties: { videos: { type: 'string' }, issue: { type: 'string' }, fix: { type: 'string' } }, required: ['videos', 'issue', 'fix'] } },
    wording_inconsistencies: { type: 'array', items: { type: 'string' } },
    coverage: { type: 'array', items: { type: 'object', properties: { requirement: { type: 'string' }, status: { type: 'string', enum: ['covered', 'weak', 'missing'] }, where: { type: 'string' }, note: { type: 'string' } }, required: ['requirement', 'status', 'where', 'note'] } },
    overall: { type: 'string' },
  },
  required: ['contradictions', 'wording_inconsistencies', 'coverage', 'overall'],
}

// ------------------------------------------------------------------ shared text
const BRIEF = `THE USER'S BRIEF (verbatim, typos kept): "I see it's too waek .... I want to create four vdieos .... one for the connected envoiernmenet and one for each product .... the connected-env must show what is it near to the one you created by highlighting we have create an umprella that covers all the environmenet staff under one product that allow to manage and have detailed eye on the site and control what happen when anything is happen ... and that allwo us to feed our future ai agent to control everything in the site related to the env ... also we have multiple way of integration and multpel devices path modbus and blackbox like the gas ... also the screen has new changes take a look"
Later the user added: "lighnting need to be updated" and "even the GAS" and "take the gas screens from here (live portal) ... open the browser": the screens changed in production after our first capture; the frames were recaptured from the live portal in a visible browser (see the refresh note).
Meaning: four videos: (1) Connected Environment umbrella, (2) Weather Station, (3) Lightning, (4) Gas. The earlier videos were judged too weak: they must be stronger in story, visuals and voice, and still strictly honest.`

const CONTEXT = `PROJECT CONTEXT
- WakeCap "Connected Environment" is a micro-app in the WakeCap portal: Weather Station, Lightning, Gas, plus Reports and Settings. Frames were captured read-only from the live production portal on 4 Oct 2026 (nothing was saved, switched, acknowledged, closed or published by us during capture).
- The video pipeline is built and tested: ${ROOT}/_tools/vbuild.py reads <video>/spec.json and builds a 1920x1080 narrated video (voice and final render are done later by the lead; captions, camera zooms, callouts and diagrams are built in). READ ${ROOT}/_tools/SPEC.md FIRST: it is the format and craft guide.
- Folder per video: ${ROOT}/<video>/ with assets/ (1920x988 frames), captures.json (what each frame shows, visible text, measured element rectangles in FRAME coordinates; the earlier version is captures.1.0.5.json), captures/*.txt (page text per frame), observations.md and observations-1.0.7.md (surprises and verbatim wording).
- Research (internal, evidence-backed, every claim has file:line quotes): ${ROOT}/_research/integration-and-devices.json, agent-and-control.json, changes.json (plus .md summaries). Claims carry live_today and safe_phrase; the agent file has must_not_claim and direction_only; changes.json has per-screen items with live_in_1_0_5 and ui_strings.
- REFRESH NOTE (READ IT FIRST, it OVERRIDES the older research and captures where they differ, and it carries the lead's decisions): ${ROOT}/_research/refresh-1.0.7.md
- The frame file suffix tells the project: -a Project A, -b Project B, -c Project C. They are three different projects with different products switched on. Never present them as one site.`

const RULES = `HARD RULES (every agent, no exceptions)
- Local only. Never post, send, file or publish anything: no Slack, Linear, email, GitHub, LaunchDarkly, no git push. Do not use any browser or browse tool. Do not touch the live portal. The captures are final.
- Never run text-to-speech. Never set VB_ALLOW_TTS. Run vbuild only with --check, --dry, or --dry --render (silent previews).
- Write only inside your own video folder (spec.json, beatsheet.md, preview outputs, scratch under .work/). Do not edit frames, captures, research files, SPEC.md or vbuild.py; if you think vbuild.py has a bug, report it in your result (open_issues or findings).
- Never read, print or copy API keys, cookies, tokens, .env or appsettings files.
- Do not invent quotes, names, metrics, prices, dates or customer names. Every number comes from a frame or a research file. No expansion claims: do not promise features, dates or new products.
- Customer-facing text (narration, captions, callout labels, card text, diagram text) contains no ticket IDs, version numbers, feature-flag names, customer, site or person names. Station and detector serials visible in frames are fine. Name the vendor Blackline only when quoting the page text that names it.`

const GUARDRAILS = `HONESTY GUARDRAILS (each was established from code, docs and live pages; breaking one is a blocker)
1. Gas Acknowledge and Close are recorded in WakeCap only. The Alerts page says: "It is not sent to Blackline: an alert closed here stays open in Blackline Live." Never imply the vendor is told. Never say "acknowledge back to the vendor".
2. No Gas to Observation Manager (not built), no gas notifications, no gas compliance numbers (Exposure and Exceedances are "Not available yet"). CO and CO2 were removed. The Zones tab is hidden. Gas alarm limits on the page are read-only. Gas never reads SAFE on stale or failed data: the page says "Not confirmed safe: 1 detector not reporting" and "Readiness: Not ready". There is no big SAFE hero.
3. Do NOT say "one rule set", "one audit trail" or "one permission for everything". TRUE: one backend; one portal menu and header; the same view permission lets a person see all three products; each project switches on only the products it uses (an entitlement switch); settings are protected by separate grants per product.
4. AI agent: DIRECTION, not live today. The backend contains building blocks: tools an assistant can use to read Weather Station data, proposals that a person must approve, and a rule that the assistant may propose but never approve. They exist for Weather Station only: no Lightning or Gas tools yet. No assistant is running on any site today. Do not state tool counts. Verdict numbers are computed by fixed rules; AI would only reword. Agent screens (agent dashboard, observation drawer) are switched off by default: never show or claim them. Never say the assistant controls things by itself.
5. Integration paths. Weather Station and Lightning devices send data over the on-site wireless (Wirepas) mesh to a gateway, then to the cloud, in Modbus-style frames on a shared Modbus transport. Lightning is read through a small input module (ADAM) on a mesh node; frames that cannot be read are set aside in a separate queue. Gas detectors reach WakeCap ONLY through the vendor cloud (Blackline): WakeCap asks that cloud for readings about every minute (every 45 seconds by default) and detectors report about every 30 minutes; WakeCap cannot see inside the vendor system (a black box to us). A Modbus path for gas was cancelled: never say gas uses Modbus or the mesh. Explain Modbus on first use: "an industrial wiring and data standard many sensors speak".
6. Lightning: only the green state means safe to work (a rule in the product, NOT page text); only All Clear was seen live. Rings and radii are reference only: "Zone reference only, not a live strike position". Alerts are a backup: the site's own cabinet lights and sounder come first (the page says so). Do not narrate the "Held for" duration (two clocks disagree), staleness multiples, email or SMS notifications (removed), RED or flashing states (not seen live), any state other than All Clear as seen, or any go-live date.
7. Weather: avoid numeric heat-band edges in narration and labels (the dashboard and the policy page disagree by one degree). The green "Last reading was N minute(s) ago" line under an offline headline contradicts it: do not show it as meaningful. Times: Saudi time (evidence: front-end commits f3e49a1 and 8dfbae9, plus a live test where a Los Angeles browser clock still showed Saudi clock times); Weather Station pages print no zone label, Lightning pages print AST, UTC+3.
8. Never say a site IS safe. Say what the page says: All Clear, within limits, Danger, Not ready, Not confirmed safe.
9. Never describe an action as performed that capture did not do. Nothing was clicked, saved, acknowledged, closed, switched on or published by us. Click callouts are demonstrations: say "you can", "this is where you". (On the refreshed Gas Alerts page three alerts read Closed because someone else closed them before our capture: describe only what is visible, never who or when.)
10. A live value that will be stale tomorrow may be quoted only when it is on screen and part of the point.
11. Only claims with live_today yes (or directly visible in a frame you use) may be stated plainly. unknown: omit or soften to what the page shows. no: only as DIRECTION or as "not available yet".`

const DECISIONS = `LEAD DECISIONS (also in the refresh note; they settle the open questions of the first fact-check)
1. Blurred station display names on screen are fine. Never narrate a station name.
2. "Held for": never narrate it, never spotlight or zoom onto it. If it shows during a camera glide, accept that; prefer glides that start away from it.
3. Heat band numbers on the Safety Policy page may be on screen but are never narrated or spotlighted; callout labels carry no band numbers.
4. The green "Last reading was N minute(s) ago." line under an offline headline: avoid zooms that include it; keep full-frame glides over it short.
5. No blanket "never falsely safe" over the three products. Say only what is shown: Gas shows CHECK and "Not confirmed safe" when a detector is not reporting; Lightning treats only the green state as safe to work (a rule, not page text); Weather Station names an offline station and reads Not ready.
6. "Control" means exactly: Weather Station safety policy limits (with a 30-day "would have stopped work" preview); Gas alerts can be acknowledged and closed, recorded in WakeCap only; Lightning has alert distances and a sensor location in Settings (never claim the distances change what the alarm does). Each product has its own settings.
7. Never write "Stopped on N days": the preview says "Would have stopped work on N of the last 30 days".
8. Oxygen has a low limit (19.5) that the page calls "not alarmed yet": never say every gas is checked against its limits; say what each card shows.
9. The Lightning radii Settings intro line ("These are the radii the alerting service uses...") stays out of every zoom and spotlight; the "Set manually until Management Maps supports lightning sensor locations." note is never spotlighted or read aloud as a promise: say the location is entered by hand and marked Temporary.`

const CRAFT = `WHAT "STRONG" MEANS HERE (the last videos were judged too weak)
- A story, not a tour. Open on a human question or scene in the first 8 seconds, build one idea at a time, end on one concrete next step.
- Narration is written for the ear: sentences under 18 words, active verbs, plain words, rhythm (short, then longer). Say what the viewer sees at the moment they see it, then what it means for the site team. Never read the screen aloud. No lists of nouns, no filler, no hype. Example of weak: "The dashboard displays a comprehensive overview of the parameters." Example of strong: "Here is the answer, in one strip. Not a number. An instruction."
- Beats are 15 to 40 words. Voice speed is about 2.35 words per second.
- TTS-friendly: spell out what a voice would stumble on ("H two S", "L E L", "C S V file", "Excel file", "Saudi time" not AST). No parentheses, brackets, emoji, URLs, markdown or stage directions in narration. The first four words of every beat must be unique in the video and contain no digits or abbreviations (the timing aligner matches them against the transcript).
- Visuals do work: every shot beat moves the camera or points at the thing it names (zoom, callout, click callout). Consecutive beats on one image are good (the camera glides) but each needs its own target. Use click:true callouts for "where do I click". Use a tri beat for the cross-product moment, list cards for "what is new", diagrams where the brief says so.
- Captions (max 12 words) are the muted-viewing track: restate the beat. Put badge "DIRECTION" on every beat about something not live today.
- New screens are first-class: show them early and call them new only when changes.json says live_in_1_0_5 yes (or the refresh note says so) and a frame shows them.`

const TOOLING = (v) => `HOW TO WORK
1. Read SPEC.md, the REFRESH NOTE, then ${dirOf(v)}/captures.json (refreshed entries carry "refreshed": "1.0.7 build ..."), captures/*.txt and observations-1.0.7.md. LOOK at every frame you use (Read the PNG): several frames are NEW (Lightning map, Gas alerts, names blurred). Read the research files relevant to this video (claims with live_today, caveats and safe_phrase; must_not_claim; direction_only; open_questions). Query the JSON with python3 when it is large.
2. Frames are used as they are; if you need a frame from another video, cp it into ${dirOf(v)}/assets/ keeping its file name.
3. Validate: ${VB} ${dirOf(v)} --check. Fix every ERROR and read every warn. It prints the estimated length.
4. Preview: ${VB} ${dirOf(v)} --dry --render (silent, draft quality, about real time; --render writes final-dry.mp4 and timeline.json). Extract frames: ffmpeg -ss <seconds> -i ${dirOf(v)}/final-dry.mp4 -frames:v 1 -vf scale=1280:720 ${dirOf(v)}/.work/f-<n>.png and LOOK at them. For zoom and callout checks, overlay the rectangles on the original frame: ffmpeg -i <frame>.png -vf "drawbox=x=..:y=..:w=..:h=..:color=red@0.9:t=4" out.png. Inspect at least 12 frames covering every scene kind, every diagram stage, every click callout and every zoom. Fix overlaps, clipped labels, wrong targets and captions that hide content; re-render; re-inspect the fixed beats.
5. Keep ${dirOf(v)}/beatsheet.md in step with the spec: a table (# | beat id | time | what is on screen | narration | evidence), then three lists: DIRECTION beats, left out on purpose (and why), assumptions.
6. If you need a frame that does not exist, do not invent one: design around it and say so in open_issues.
7. Do not return until the dry render exists, --check is clean and you have looked at the frames.`

const BRIEFS = {
  'connected-environment': `VIDEO 1 of 4: CONNECTED ENVIRONMENT (the umbrella). Folder ${ROOT}/connected-environment/. Length 3:00 to 3:30 (about 420 to 520 words, 22 to 30 beats of about 15 to 20 words on average). Frames: 19 u-*.png (read captures.json for what each shows; u-gas-* , u-ws-c, u-lightning-b and u-settings-lightning-b are NEW captures from build 1.0.7).
Job: show what Connected Environment IS and why it beats three separate tools. All of the user's points are required:
 (a) An UMBRELLA: one product that covers everything environmental on a site (weather, lightning, gas).
 (b) Under it people manage the site, keep a detailed eye on it, and control what happens when something happens (scope "control" exactly as decision 6 says).
 (c) Everything lands in one platform, which is what lets us feed a FUTURE AI agent (direction, not live). Do not claim everything lands: Gas history and some gas figures are "Not available yet".
 (d) Multiple ways in: Modbus-style frames over the on-site mesh for weather stations and lightning sensors; a vendor-cloud black box for gas detectors. Explain Modbus on first use.
 (e) The screens have NEW changes: feature them (Gas Overview, Alerts with Close, compliance limits; Lightning radii map and alarm history; Weather Station safety policy with the 30-day preview, and the gear popup; Maximum Values Report; Connected Products; the gas status line in the shared header).
Suggested arc (improve it if you have a better one): 1 hook card ("Is it safe to work right now?" Heat. Lightning. Gas.); 2 the question behind it; 3 umbrella diagram stages 1 to 3 (chips only from true facts: one backend; one portal menu and header; the same view permission to see all three; switched on per project); 4 chapter "One place to look": Connected Products across the three projects (u-products-a, b, c; do not click), the shared header with the gas line (u-ws-c), a tri beat of the three product screens (u-ws-a, u-lightning-b, u-gas-c); 5 a chapter on honesty (NOT "never falsely safe"; decision 5): Gas CHECK and Not confirmed safe, an offline weather station named and Not ready, Lightning's single green state as a rule; 6 "A detailed eye": zooms (answer strip and steps with a click callout, details drawer, Maximum Values Report, gas detectors and alerts); 7 chapter "Control": umbrella diagram stage 6 (Watch, Decide, Control), Safety Policy (u-policy-a-top, the 30-day "would have stopped work" preview, band ribbon without numbers), Lightning Settings (alert distances, location marked Temporary, 24 hour history), Gas Alerts (Close recorded in WakeCap and not sent to the vendor; three alerts show Closed; u-gas-alerts-c); 8 "what is new" list card; 9 paths diagram with three lanes then the sink; 10 the AI agent (agent diagram, DIRECTION badge on every beat): the platform is built so an assistant can read what happens on site and propose actions, people always approve; today the connection exists for Weather Station only; Lightning and Gas are not available to it yet; no assistant runs on a site today; 11 close card with one next step (open Connected Environment in the portal's left rail) and the line that people stay in control.
Diagram text: set diagrams.umbrella, diagrams.paths and diagrams.agent explicitly in spec.json (the builder refuses defaults). Every label is a claim.`,

  'weather-station': `VIDEO 2 of 4: WEATHER STATION. Folder ${ROOT}/weather-station/. Length 1:50 to 2:30 (about 260 to 340 words, 14 to 18 beats). Frames: 16 w-*.png (Project A has an offline station; Project C is the second project). Station display names are now blurred in the frames.
Story: "A heat number is not an answer." The screen gives an answer a site team can act on and shows how far to trust it.
Arc: hook card; the answer strip with "View Recommended Steps" (click callout; w-top-a, w-steps-a); the Details drawer (w-details-a); heat card colour and work, rest and water cycle if the frame shows it; station health (an offline station is named by its serial and readiness reads Not ready); a second project (w-top-c, w-reasons-c); NEW gear popup "Select parameters" (w-gear-a); NEW Reports: Maximum Values Report (w-reports-a, w-reports-7d-a; never claim an export happened); NEW Site Safety Policy page in Settings: plain top text (w-policy-a-top), stop-work limits with the 30-day "would have stopped work" preview (w-policy-a-limits), the band ribbon and cards (no numbers in labels), the NOAA method tab, the empty Change history (w-policy-a-history); Connected Products (w-settings-products-a; do not click); a short "what is new" list card; ONE-lane paths diagram (diagrams.paths with a single lane: stage 1 the lane, stage 2 the sink); close with one next step.
Avoid: numeric heat-band edges in narration and labels; the green "Last reading was N minute(s) ago" line; agent or AI features; frozen-sensor or stale-data claims you cannot see.`,

  'lightning': `VIDEO 3 of 4: LIGHTNING. Folder ${ROOT}/lightning/. Length 1:50 to 2:30 (about 260 to 340 words, 14 to 17 beats). Frames: 8 l-*.png from Project B, ALL RECAPTURED on build 1.0.7. The map in l-top-b, l-radii-map and l-hist-b is a blurred SATELLITE map now (an Esri map); keep it blurred (a caption may say "map blurred"); never describe the imagery.
Story: "When lightning is near, who tells the crew to stop?" The page is a backup: the site's cabinet lights and sounder come first and the page says so. Then: what the page shows, what you can set, where the history lives.
Arc: open on the backup banner (l-top-b); the state tile: All Clear, Safe to work, Normal operations (only the green state means safe to work, as the product's rule; All Clear is what was on screen); zone rings and chips are reference thresholds: "Zone reference only, not a live strike position"; NEW radii map beside the tile: red filled circle, yellow ring, a green dot for the sensor state, legend "Red ring: the Red radius. Yellow ring: the Yellow radius. The dot shows the sensor's current state." (l-radii-map; the Temporary badge and note are NOT on this page any more); NEW alarm activity chart and alarm history, empty and honest ("No alarms were raised in this window."), Export CSV disabled when empty, times in Saudi time (AST, UTC+3) (l-hist-b); NEW Settings > Lightning (l-settings-b-all): alerting radii with Edit and Set location buttons (demonstrations only), the sensor location entered by hand and marked Temporary (decision 9), and the 24 hour state history that shows data-unavailable gaps instead of hiding them; wallboard view for a site screen and phone view (l-wallboard-b, l-mobile-b, l-mobile-phone-b, l-mobile-hist-b: they open by address; do not claim a menu link); ONE-lane paths diagram (sensor signal read by an input module on a mesh node, mesh gateway, cloud queue, Lightning; unreadable frames are set aside); "what is new" list card; close with one next step.
Avoid: the "Held for" duration, staleness multiples, email or SMS notifications, RED or flashing banners, any state other than All Clear as seen, the unblurred map, any go-live date, any customer or site name, claims that the rings show where lightning struck, claims that the radii change what the alarm does, and the Settings intro line "These are the radii the alerting service uses..." in any zoom or spotlight.`,

  'gas': `VIDEO 4 of 4: GAS. Folder ${ROOT}/gas/. Length 1:50 to 2:30 (about 260 to 340 words, 14 to 17 beats). Frames: 10 g-*.png from Project C, ALL RECAPTURED on build 1.0.7 (same UI as before; the data moved: the Alerts page now shows Open 12, Acknowledged 12 and THREE CLOSED rows without a Close button; the Overview says Acknowledged 12).
Story: "A quiet gas screen is not a safe gas screen." The product never reads SAFE on stale or missing data and says what it cannot confirm.
Arc: hook card; the header status line (g-header-c); NEW Overview: Detectors, Online, Live alarms, Acknowledged (g-dashboard-c; explain each as the page does; Live alarms counts alerts nobody has acknowledged, Open alerts counts those not yet closed); the three gases (H two S, oxygen, combustible gas as L E L) against their limits (read limits only from the frame; the limits are read-only; oxygen's low limit is "not alarmed yet": decision 8); "Not confirmed safe" and Readiness Not ready when a detector is offline (g-dashboard-c, g-wallboard-c, g-mobile-c); the Detectors page and inline detail (g-detectors-c, g-detector-detail-c: "No current reading. Last known values, not current:"); NEW Alerts: summary tiles, newest first; Closed rows without a Close button and acknowledged rows with one (the Close control is a demonstration only; never say who closed the three alerts or when); the honest page text "Acknowledging or closing an alert is recorded here with who did it and when. It is not sent to Blackline: an alert closed here stays open in Blackline Live." (g-alerts-c, g-alerts-bottom-c: timeline and assignee not available yet); Compliance: limits table and the honest "Not available yet" panels (g-compliance-c); wallboard and phone views (g-wallboard-c, g-mobile-c, g-mobile-desktopview-c); ONE-lane paths diagram: gas detectors report to the vendor's cloud, a black box to us; WakeCap asks that cloud about every minute; detectors report about every 30 minutes, so the screen shows the age of the reading; alerts and readings are stored in WakeCap; "what is new" list card (what each screen does today); close with one next step.
Avoid: gas notifications, Observation Manager, "acknowledge back to the vendor", compliance numbers (exposure, exceedances, percentages), CO and CO2, the Zones tab, a big SAFE hero (there is none), dramatising the SOS or tipped-over rows (you may say the list shows what the detector reported), the word "safe" about the site, any claim that Gas is on the mesh or Modbus. Make sure the narration for Live alarms, Open alerts and Acknowledged does not contradict itself.`,
}

const VIDEOS = [
  { id: 'connected-environment', name: 'Connected Environment (umbrella)' },
  { id: 'weather-station', name: 'Weather Station' },
  { id: 'lightning', name: 'Lightning' },
  { id: 'gas', name: 'Gas' },
]

const updaterPrompt = (v) => [
  `You are the DIRECTOR-UPDATER of the "${v.name}" video. A spec.json and beatsheet.md already exist (written earlier today and fact-checked once). Since then: (1) production moved from build 1.0.5 to 1.0.7 and the Lightning and Gas frames (and the Gas and Lightning frames inside the umbrella) were recaptured, and station display names were blurred; (2) the fact-check left findings; (3) the lead made decisions. Your job: update spec.json and beatsheet.md so the video is true to the CURRENT screens, resolves every valid earlier finding, obeys the lead decisions, and is STRONGER: keep the beats that work, rewrite the weak ones (the cross-video critic rated the story, visuals and new-screen coverage as weak), tighten the hook, and make every beat earn its place. Re-measure every callout and zoom rectangle against the CURRENT captures.json for the refreshed frames (rects moved; for example Gas alert rows and Close buttons, the Lightning map card and the Settings page).`,
  BRIEF, CONTEXT, RULES, GUARDRAILS, DECISIONS, CRAFT, TOOLING(v),
  'VIDEO-SPECIFIC BRIEF (the story the video must tell; current screens)\n' + BRIEFS[v.id],
  `EARLIER FINDINGS AND CRITIC NOTES FOR THIS VIDEO: read ${ROOT}/_review/findings-before-update/${v.id}.json (remaining findings of all severities, the last reviser report, cross-video contradictions, wording inconsistencies, coverage of the user's brief). Fix what is valid; where a finding is moot after the refresh or the decisions, say so in changes_made. Also read the current ${dirOf(v)}/spec.json and ${dirOf(v)}/beatsheet.md first.`,
  'Every beat needs an "evidence" array (not rendered): each entry is a frame name plus the exact visible text it relies on, or a research claim id such as integration-and-devices#W06. A claim without evidence does not ship. In changes_made list every beat you changed and why, in one line each. Return the structured result when done.',
].join('\n\n')

// ------------------------------------------------------------------ verification lenses
const LENS = {
  claims: `LENS: CLAIMS versus EVIDENCE (adversarial). Your job is to break the script. For every beat, list each factual statement in the narration, caption, callout labels, card text and diagram text, and find its support: (a) the beat's own evidence entries (they may be wrong: check them yourself); (b) the frame text in captures/*.txt and the frame image itself (Read it); (c) research claim ids in ${ROOT}/_research/*.json (check live_today, caveats, must_not_claim, direction_only); (d) the REFRESH NOTE, which overrides older research (the Lightning map is now a blurred satellite map; the Temporary note is in Settings only; Gas alerts show Closed rows). Flag every statement that is unsupported, overreaching or contradicted. Look hard at: absolute words (all, every, always, never, only, one, real-time, instantly, automatically, guarantee), numbers, "new" claims, what a click does (demonstrated or only described?), DIRECTION items stated as live, capabilities mixed across projects, labels that drop a qualifier (for example "would have"), and each of the 11 honesty guardrails and the lead decisions. Severity: blocker = false or unsupported claim or a guardrail breach; major = overreach or ambiguity a customer could misread; minor = wording.`,
  hygiene: `LENS: HYGIENE, SAFETY and HONESTY. (1) View EVERY image the spec uses (img, imgs, and crops: for a crop or zoom target, also cut it out with ffmpeg crop into .work and look). Check each for organisation, project, site, customer or person names (top bar, headers, drawers, tooltips, device labels, map labels including Arabic, station display names, initials), email addresses, avatars, coordinates, tokens and URLs with ids; unblurred maps; anything that shows terrain. Station display names must be blurred; station serials may show. (2) Grep spec.json (all customer-facing fields and the diagrams object) for the forbidden patterns: TAN-digits, Aramco, Fadhili, Riyas, Jafurah, GIP, PKG1, SCC, Main Plant, a version like v1.2.3, weather-station-agent, lightning.simulate, LaunchDarkly, SUPRT-digits, flag-like names (connected-env-*, weather-station-*), em or en dashes. (3) Safety language: no sentence says a site IS safe; DIRECTION badge present on every beat about not-live features; no action described as performed; no promise, date, price or metric that is not in a frame or research file. (4) Every beat has a non-empty evidence array. (5) ${VB} <video-dir> --check passes (use --check only; do not render). Severity: blocker = a name, map, key, forbidden string or a safety-language breach in anything a viewer sees or hears; major = missing DIRECTION badge, missing evidence, performed-action wording; minor = style.`,
  visual: `LENS: VISUAL, TIMING and CRAFT. (1) Run --check. Use <video-dir>/final-dry.mp4 and timeline.json; if final-dry.mp4 is missing or older than spec.json, run ${VB} <video-dir> --dry --render (you are the only lens allowed to render). (2) Extract frames at each beat start plus 1.6 seconds (scale 1280:720) into .work/verify-visual/ and LOOK at ALL of them. (3) For each shot beat verify the callout rectangle really surrounds the element its label names (overlay the rect on the original asset with ffmpeg drawbox and view it: the refreshed frames moved), the zoom target contains its subject without awkward cropping, labels do not collide with each other or fall off the stage, the caption bar hides nothing essential. Check every diagram stage for clipped or overlapping text. (4) Pacing: words divided by 2.35 versus the beat length; each consecutive beat on one image has its own zoom or callout; no more than 2 consecutive beats with no movement; variety of scene kinds; a hook in the first 8 seconds; each beat 15 to 40 words; sentences under 18 words; the closing beat has one concrete next step; total length inside the brief's range. (5) Craft: narration sounds like a person talking, says what the viewer sees as they see it, no filler or lists of nouns, first four words of each beat unique and free of digits or abbreviations, TTS-friendly spelling. (6) The story arc matches the video brief and the user's points. Severity: blocker = a callout or zoom on the wrong thing, clipped or overlapping text that hides content, wrong length by more than 20 percent; major = weak pacing, label collisions, a beat with no visual reason, hook missing; minor = polish.`,
}

const verifyPrompt = (v, lens, prior, pass) => [
  `You are an independent VERIFIER for the "${v.name}" video (pass: ${pass}). You do not edit the spec; you find problems and report them precisely. Be adversarial and concrete: cite the beat id, quote the offending words, say what you checked and where.`,
  CONTEXT.replace(/<video>/g, v.id),
  RULES.replace(/your own video folder/g, 'your lens scratch folder ' + dirOf(v) + '/.work/verify-' + lens + '/ (you may read everything; you may NOT modify spec.json, beatsheet.md or any asset)'),
  GUARDRAILS, DECISIONS,
  'THE VIDEO BRIEF THE UPDATER WAS GIVEN\n' + BRIEFS[v.id],
  `FILES: spec ${dirOf(v)}/spec.json, beat sheet ${dirOf(v)}/beatsheet.md, preview ${dirOf(v)}/final-dry.mp4 (silent), timeline ${dirOf(v)}/timeline.json, SPEC.md ${ROOT}/_tools/SPEC.md.`,
  LENS[lens].replace(/<video-dir>/g, dirOf(v)),
  prior ? 'PREVIOUS PASS (a reviser changed the spec since). Earlier findings for all lenses:\n' + JSON.stringify(prior.found) + '\nReviser report:\n' + JSON.stringify(prior.rev) + '\nConfirm each earlier finding is really resolved, reject any "rejected" explanation that is wrong, and then do a FRESH FULL pass of your lens: new problems hide behind fixed ones.' : 'This is the first pass after the update: do a full pass of your lens over every beat.',
  `Save your result JSON also to ${dirOf(v)}/.work/findings-${lens}-u${pass}.json. verdict is "fail" if there is any blocker or major finding. Return only the structured result.`,
].join('\n\n')

const revisePrompt = (v, dir, found) => [
  `You are the REVISER for the "${v.name}" video. Three independent verifiers reported findings against ${dirOf(v)}/spec.json. Fix every VALID finding (blockers and majors first, then minors that are cheap) in spec.json and beatsheet.md. If a finding is wrong, reject it with specific evidence (frame text, research claim, the refresh note) in "rejected". Do not weaken the story to dodge a finding: fix the claim, keep the strength. Keep the length inside the brief's range. Do not touch frames or other files.`,
  CONTEXT.replace(/<video>/g, v.id), RULES, GUARDRAILS, DECISIONS, CRAFT, TOOLING(v),
  'VIDEO-SPECIFIC BRIEF\n' + BRIEFS[v.id],
  'UPDATER REPORT\n' + JSON.stringify(dir),
  'FINDINGS TO FIX\n' + JSON.stringify(found),
  'After editing: run --check until clean, re-run --dry --render, look at the frames of every changed beat plus any beat whose timing moved (at least 5 frames), and return the structured result.',
].join('\n\n')

const flatten = (lensResults) => lensResults.filter(Boolean).flatMap((f) => (f.findings || []).map((x) => Object.assign({ lens: f.lens }, x)))
const isHard = (x) => x.severity === 'blocker' || x.severity === 'major'
const lensRun = (v, phaseName, prior, pass) =>
  parallel(['claims', 'hygiene', 'visual'].map((l) => () =>
    agent(verifyPrompt(v, l, prior, pass), { label: phaseName.toLowerCase() + ':' + v.id + ':' + l, phase: phaseName, effort: 'high', schema: FINDINGS })))

// ------------------------------------------------------------------ run
const results = await pipeline(
  VIDEOS,
  (v) => agent(updaterPrompt(v), { label: 'update:' + v.id, phase: 'Update', effort: 'high', schema: DIRECTOR }),
  async (dir, v) => {
    if (!dir) { log('updater failed for ' + v.id); return { video: v.id, error: 'updater returned nothing' } }
    log(v.id + ': update done (' + dir.beats + ' beats, ~' + dir.est_seconds + ' s, frames inspected ' + dir.frames_inspected + ')')
    let current = (await lensRun(v, 'Verify', null, 'pass1')).filter(Boolean)
    const rounds = []
    for (let round = 1; round <= 2; round++) {
      const found = flatten(current)
      log(v.id + ': pass ' + round + ' found ' + found.length + ' findings (' + found.filter(isHard).length + ' blocker/major)')
      if (!found.length) break
      const rev = await agent(revisePrompt(v, dir, found), { label: 'revise' + round + ':' + v.id, phase: 'Revise', effort: 'high', schema: REVISE })
      current = (await lensRun(v, 'Reverify', { found, rev }, 'pass' + (round + 1))).filter(Boolean)
      rounds.push({ round, found, rev, after: current })
      if (!flatten(current).some(isHard)) break
    }
    const remaining = flatten(current)
    log(v.id + ': finished with ' + remaining.length + ' remaining findings (' + remaining.filter(isHard).length + ' blocker/major)')
    return { video: v.id, dir, rounds, remaining }
  },
)

phase('Consistency')
const consistency = await agent(
  [
    'You are the CROSS-VIDEO CRITIC. Four video specs were updated and verified separately. Read all four spec.json and beatsheet.md files and compare them. Report: (1) contradictions between videos (for example one says gas alerts are recorded in WakeCap while another implies the vendor is told; different descriptions of the same path or feature; different treatment of the same frame); (2) wording inconsistencies (product names, how DIRECTION is framed, how Modbus is explained, repeated sentences reused verbatim); (3) coverage of the user\'s brief, requirement by requirement: umbrella over all environment products; manage plus detailed eye plus control when something happens (scoped as the lead decisions say); feeds a future AI agent (honestly framed); multiple integration paths with Modbus and the vendor-cloud black box for gas; the screens have new changes (each video shows its new screens, and the Lightning and Gas videos match the CURRENT screens in the refresh note); the videos are stronger than before (story, visuals). Mark each covered, weak or missing with where and a note. You do not edit anything.',
    BRIEF, CONTEXT, RULES.replace(/Write only inside your own video folder[^\n]*/, 'You are read-only: do not write files except a report at ' + ROOT + '/_review/consistency-2.json.'), GUARDRAILS, DECISIONS,
    'FILES: ' + VIDEOS.map((v) => dirOf(v) + '/spec.json').join(', ') + ' and the beatsheet.md next to each. Updater reports for context:\n' + JSON.stringify(results.map((r) => r && r.dir ? { video: r.video, beats: r.dir.beats, words: r.dir.words, est_seconds: r.dir.est_seconds, open_issues: r.dir.open_issues, assumptions: r.dir.assumptions } : r)),
  ].join('\n\n'),
  { label: 'consistency', phase: 'Consistency', effort: 'high', schema: CONSISTENCY },
)

return { results, consistency }
