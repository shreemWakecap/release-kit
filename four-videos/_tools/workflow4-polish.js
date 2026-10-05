export const meta = {
  name: 'four-videos-polish',
  description: 'Last polish of the four video specs: apply the cross-video critic fixes and the lead decisions, re-render the silent previews, one all-lens check on the changed beats. No voice, nothing posted.',
  phases: [
    { title: 'Polish', detail: 'one fixer per video: apply the listed fixes, silent preview render, frame inspection' },
    { title: 'Check', detail: 'one all-lens checker per video on the changed beats and the whole script for hard rules' },
    { title: 'Fix', detail: 'only if the checker finds blockers or majors' },
    { title: 'Recheck', detail: 'one more look after the fix' },
  ],
}

const ROOT = '/Users/admin/wc/weather-station/release-kit/four-videos'
const VB = 'python3 ' + ROOT + '/_tools/vbuild.py'
const dirOf = (v) => ROOT + '/' + v.id

const REPORT = {
  type: 'object',
  properties: {
    video: { type: 'string' },
    changes_made: { type: 'array', items: { type: 'string' } },
    not_done: { type: 'array', items: { type: 'string' } },
    beats: { type: 'number' },
    words: { type: 'number' },
    est_seconds: { type: 'number' },
    check_clean: { type: 'boolean' },
    dry_render: { type: 'string' },
    frames_inspected: { type: 'number' },
  },
  required: ['video', 'changes_made', 'not_done', 'beats', 'words', 'est_seconds', 'check_clean', 'dry_render', 'frames_inspected'],
}
const FINDINGS = {
  type: 'object',
  properties: {
    video: { type: 'string' },
    verdict: { type: 'string', enum: ['pass', 'fail'] },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          beat: { type: 'string' },
          lens: { type: 'string', enum: ['claims', 'hygiene', 'visual'] },
          severity: { type: 'string', enum: ['blocker', 'major', 'minor'] },
          issue: { type: 'string' },
          evidence_checked: { type: 'string' },
          suggested_fix: { type: 'string' },
        },
        required: ['beat', 'lens', 'severity', 'issue', 'evidence_checked', 'suggested_fix'],
      },
    },
    checked: { type: 'array', items: { type: 'string' } },
  },
  required: ['video', 'verdict', 'findings', 'checked'],
}

const CONTEXT = `PROJECT CONTEXT
- WakeCap "Connected Environment" is a micro-app in the WakeCap portal: Weather Station, Lightning, Gas, plus Reports and Settings. We are finishing FOUR narrated product videos built from live screenshots (frames in <video>/assets, 1920x988; refreshed on production build 1.0.7 on 4 Oct 2026).
- Pipeline: ${ROOT}/_tools/vbuild.py reads <video>/spec.json and builds the video (voice is added later by the lead). READ ${ROOT}/_tools/SPEC.md first. Beat sheet: <video>/beatsheet.md. Captures: <video>/captures.json and captures/*.txt. Research: ${ROOT}/_research/*.json and refresh-1.0.7.md (the refresh note OVERRIDES older research and carries the lead's decisions: read it).
- The specs were already written, fact-checked twice and refreshed. Only a small final polish is left. Do NOT rewrite what works.`

const RULES = `HARD RULES
- Local only: never post, send, file or publish anything; no browser; never touch the live portal. Never run text-to-speech or set VB_ALLOW_TTS. Run vbuild only with --check, --dry or --dry --render.
- Write only inside your own video folder (spec.json, beatsheet.md, scratch under .work/). Do not edit frames, captures, research, SPEC.md or vbuild.py.
- Never read or print API keys, cookies, tokens, .env or appsettings files.
- No invented quotes, names, metrics, dates or customer names; every number comes from a frame or a research file. No expansion claims. Customer-facing text has no ticket IDs, version numbers, flag names, customer, site or person names. Name the vendor Blackline only when quoting the page text that names it (and gloss it as the gas vendor).
- No em or en dashes, none of the wstack banned words, sentences under 18 words, beats of 15 to 40 words, the first four words of every beat unique and free of digits and abbreviations, TTS-friendly spelling ("H two S", "L E L", "Saudi time").`

const DECISIONS = `LEAD DECISIONS FOR THE FINAL POLISH (apply to every video; they settle the cross-video critic's findings)
A. HOOK (umbrella): do not promise that each product "has an answer". The Lightning page is a backup (the site's cabinet lights and sounder come first) and Gas says Check when it cannot confirm. Use a hook like: "Is it safe to work right now?" then "Heat says one thing. Lightning says another. Gas says a third." then "You need one place to look."
B. CONTROL (umbrella): the team card keeps the verb Control (it is the user's message) but the narration scopes it immediately: Weather Station limits that decide when work stops, and recording what happens to a Gas alert (acknowledge or close, recorded in WakeCap only). DROP the umbrella beat that files Lightning alert distances under "Control" (k02); the Lightning video covers its Settings. Lightning alert distances are reference values everywhere.
C. MODBUS AND THE MESH (every video that touches it; research claims W01, L01, L02, G12): Weather Station and Lightning devices reach WakeCap over the site's wireless mesh through a gateway. The lightning sensor is read through a small input module and shows up on the mesh as a MODBUS device (L01). Do NOT call the weather lane "Modbus style frames". Lane labels: Weather = "Wireless mesh"; Lightning = "Wireless mesh + Modbus input"; Gas = "Vendor cloud". Explain Modbus once, at its first mention in each video: "an industrial wiring and data standard many sensors speak". Gas is never on the mesh and never Modbus.
D. GAS CADENCE AND STALENESS: say no polling or reporting numbers (45 seconds, 30 minutes) because they are not live-verified. Say only: WakeCap asks that cloud for readings on a regular timer; each detector reports on its own schedule; the screen shows how old each reading is. You may say what is on screen: "Detectors reporting" counts readings newer than 60 min (tile text "Reading newer than 60 min"); an offline detector reads Check and shows its last reading time. Remove "one quiet for over an hour reads Check" style claims. The diagram sink and badge texts follow the same rule.
E. WALLBOARD AND PHONE VIEWS: for both Lightning and Gas say once that they open by address (a web address), not from the menu (research: wallboard and phone by address only). Use the same wording in both videos and the same chapter treatment: chapter name "Wallboard and phone", path text "By address".
F. NAVIGATION VOCABULARY: the builder now prints OPEN (not CLICK) before the chapter path. Use ONE path style everywhere: "Connected Environment › <page or product> › <sub page>" (for example "Connected Environment › Gas › Alerts", "Connected Environment › Settings › Lightning"). Never "Left rail" or "Left menu" in chapter paths. In narration the narrow icon column is "the portal's left rail" and the in-app list is "the menu".
G. GAS PAGE NAMES: the menu item is Dashboard and the page heading is Overview. Say once "the Gas dashboard opens on Overview" and then use Overview.
H. LIGHTNING WORDING: use "alert distances" for the Red and Yellow radii in narration (the page labels say radii; labels may keep the page's word). The green rule: "WakeCap treats only the green state as safe to work" (a rule of the product, not page text). The Settings intro line and the "Set manually..." note are now BLURRED in the Settings frames: no workaround needed; never read them aloud.
I. NEXT STEPS: every closing line that tells the viewer to open a product carries the entitlement qualifier ("if your project has it" or equal): each project switches on only the products it uses.
J. GEAR DIALOG (weather): spotlight and zoom only the dialog title, its one-line description and the first four rows (Temperature, Wind Speed, Air Humidity, Rainfall). Do not put the whole dialog (it lists gas parameters) under a spotlight.
K. GAS ALERTS WORDING: quote the page's own sentence in the same words in the umbrella and the Gas video: "It is not sent to Blackline: an alert closed here stays open in Blackline Live", and gloss once that Blackline is the gas vendor. The three newest rows read Closed: say "the newest rows read Closed" (not a count) in the umbrella; the Gas video may say three because it shows them. Never say who closed them.
L. REPEATED SENTENCES across videos are fine when each video must stand alone, but do not reuse a sentence verbatim more than twice; vary one of the two.
M. Keep the story strong: do not blunt a good beat to dodge a finding; fix the claim and keep the energy.`

const TASKS = {
  'connected-environment': `UMBRELLA TASKS (apply A, B, C, D, F, I, K): 1) rewrite the hook h01 per decision A. 2) Remove beat k02 (Lightning Settings under Control) and re-balance the chapter 3 beats; keep Control scoped (decision B); the stage-6 team card stays. 3) Fix the paths diagram and its beats p01 to p04 per decision C (lane labels, pills, narration; Modbus explained once at the Lightning lane or earlier). 4) Gas: no cadence numbers anywhere (decision D), including diagram text; use the verbatim alert sentence (K). 5) Use the Lightning wording of the green rule (H). 6) Chapter paths per F. 7) Closing line per I. 8) The video is about 8 s over 3:30: the removal of k02 should fix it; trim further only if needed. 9) Read ${ROOT}/_review/findings-before-update/connected-environment.json and ${ROOT}/_review/workflow3-result.json (the consistency critic's notes) and apply any other cheap valid minor fix.`,
  'weather-station': `WEATHER TASKS (apply C, F, I, J): 1) the one-lane path diagram and w17, w18: lane label "Wireless mesh", no "Modbus style frames" (decision C; if Modbus is mentioned at all, only as "some devices on that mesh speak Modbus", otherwise leave it out of this video). 2) The closing line w18 gets the entitlement qualifier (I). 3) The gear spotlight per J (w09). 4) Chapter paths per F. 5) Read ${ROOT}/_review/workflow3-result.json (cross-video critic) and ${ROOT}/_review/findings-before-update/weather-station.json for any other cheap valid minor fix.`,
  'lightning': `LIGHTNING TASKS (apply C, E, F, H, I): 1) l11/l10 path diagram and narration per C: the sensor is read through a small input module and shows up on the mesh as a Modbus device; explain Modbus once; lane label "Wireless mesh + Modbus input". 2) Wallboard and phone beats per E (chapter "Wallboard and phone", path "By address"). 3) Wording per H (alert distances; the green rule wording; the Settings intro line and the "Set manually..." note are blurred now: remove any zoom or camera workaround that was only there to avoid them, and make sure the settings beats still move the camera purposefully). 4) The closing line l16 per I. 5) Chapter paths per F. 6) The earlier remaining major (l12: the intro line legible during a glide) is solved by the blur: confirm in the dry render. 7) Read ${ROOT}/_review/workflow3-result.json and ${ROOT}/_review/findings-before-update/lightning.json for any other cheap valid minor fix.`,
  'gas': `GAS TASKS (apply D, E, F, G, I, K): 1) g15 and g16 and the one-lane diagram and its sink and badge texts per D (no numbers for cadence; say what is on screen; remove the "over an hour reads Check" claim). 2) Wallboard and phone beats per E. 3) Overview naming per G. 4) The alert sentence per K, and keep the newest-rows-Closed beat honest. 5) Closing line per I. 6) Chapter paths per F. 7) Read ${ROOT}/_review/workflow3-result.json and ${ROOT}/_review/findings-before-update/gas.json for any other cheap valid minor fix.`,
}

const VIDEOS = [
  { id: 'connected-environment', name: 'Connected Environment (umbrella)' },
  { id: 'weather-station', name: 'Weather Station' },
  { id: 'lightning', name: 'Lightning' },
  { id: 'gas', name: 'Gas' },
]

const polishPrompt = (v) => [
  `You are the FIXER for the "${v.name}" video. Apply the lead's decisions and the task list below to ${dirOf(v)}/spec.json and beatsheet.md with the smallest edits that fully solve each point. Then run ${VB} ${dirOf(v)} --check until clean, run --dry --render, extract frames of every changed beat (ffmpeg -ss <t> -i final-dry.mp4 -frames:v 1 -vf scale=1280:720 ${dirOf(v)}/.work/p-<n>.png, times from timeline.json) and LOOK at them (at least 8 frames, including every changed diagram stage and chapter bar). Keep the beat sheet in step with the spec. Keep the length inside 3:00 to 3:30 (umbrella) or 1:50 to 2:30 (product videos).`,
  CONTEXT, RULES, DECISIONS,
  'TASKS FOR THIS VIDEO\n' + TASKS[v.id],
  'In changes_made list each change in one line (beat id and what). In not_done list anything from the task list you could not do and why. Return the structured result.',
].join('\n\n')

const checkPrompt = (v, rep, pass) => [
  `You are the FINAL CHECKER for the "${v.name}" video (check ${pass}). One agent, three lenses. Your scope: the beats the fixer changed (list below) PLUS the hard rules on the whole script. You do not edit anything; you report. Be adversarial and concrete.`,
  CONTEXT, RULES, DECISIONS,
  `FIXER REPORT\n${JSON.stringify(rep)}`,
  `DO THIS
1. CLAIMS: for every changed beat, check each statement against the frame text (captures/*.txt and the PNG you Read), research claims (${ROOT}/_research/*.json: live_today, caveats, must_not_claim) and the refresh note. Confirm decisions A to M are applied wherever they touch this video. Search the WHOLE spec for: "Modbus style", "Left rail" or "Left menu" in chapter paths, "over an hour", "every minute", "30 minutes", "45 seconds", "stopped on", "never falsely safe", "one rule set", "audit trail", "Held for" in narration, "Main Plant", "SCC", "H7038". Any hit that breaks a decision is a finding.
2. HYGIENE: grep the whole spec (all customer-facing fields and diagrams) for forbidden strings (TAN-digits, Aramco, Fadhili, Riyas, Jafurah, GIP, PKG1, SCC, Main Plant, version numbers, flag names, dashes, banned words); run ${VB} ${dirOf(v)} --check; confirm every beat has evidence and every DIRECTION beat has the badge; view every frame used by a changed beat for names, maps and initials.
3. VISUAL: ${VB} ${dirOf(v)} --dry --render only if final-dry.mp4 is older than spec.json (you may render); extract and LOOK at a frame for every changed beat (+1.6 s) and every chapter bar; verify callout and zoom rectangles still match their targets (overlay with ffmpeg drawbox); check text clipping in diagrams; confirm the total length is inside the target range.
Severity: blocker = false claim, name, map, forbidden string, wrong target, clipped text hiding content; major = a decision not applied, overreach, missing badge or evidence, length out of range; minor = polish. Save your result also to ${dirOf(v)}/.work/final-check-${pass}.json. verdict is fail if any blocker or major. Return the structured result.`,
].join('\n\n')

const fixPrompt = (v, rep, found) => [
  `You are the FIXER (second round) for the "${v.name}" video. The final checker found problems. Fix every valid blocker and major (and cheap minors) in ${dirOf(v)}/spec.json and beatsheet.md; if a finding is wrong, say why with evidence. Then --check, --dry --render and look at the frames of every changed beat.`,
  CONTEXT, RULES, DECISIONS,
  'FIRST FIXER REPORT\n' + JSON.stringify(rep),
  'FINDINGS\n' + JSON.stringify(found),
  'Return the structured result (changes_made, not_done with reasons for rejected findings).',
].join('\n\n')

const hard = (x) => x.severity === 'blocker' || x.severity === 'major'

const results = await pipeline(
  VIDEOS,
  (v) => agent(polishPrompt(v), { label: 'polish:' + v.id, phase: 'Polish', effort: 'high', schema: REPORT }),
  async (rep, v) => {
    if (!rep) { log('fixer failed for ' + v.id); return { video: v.id, error: 'fixer returned nothing' } }
    log(v.id + ': polish done (' + rep.beats + ' beats, ~' + rep.est_seconds + ' s, ' + rep.changes_made.length + ' changes)')
    let check = await agent(checkPrompt(v, rep, 'c1'), { label: 'check:' + v.id, phase: 'Check', effort: 'high', schema: FINDINGS })
    let fix = null
    if (check && check.findings.some(hard)) {
      log(v.id + ': checker found ' + check.findings.filter(hard).length + ' blocker/major; fixing')
      fix = await agent(fixPrompt(v, rep, check.findings), { label: 'fix:' + v.id, phase: 'Fix', effort: 'high', schema: REPORT })
      check = await agent(checkPrompt(v, fix || rep, 'c2'), { label: 'recheck:' + v.id, phase: 'Recheck', effort: 'high', schema: FINDINGS })
    }
    log(v.id + ': final verdict ' + (check ? check.verdict : 'none') + ' with ' + (check ? check.findings.length : '?') + ' findings')
    return { video: v.id, rep, fix, check }
  },
)
return { results }
