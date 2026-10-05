# Video spec guide (vbuild)

One folder per video under `/Users/admin/wc/weather-station/release-kit/four-videos/<video>/`:

```
spec.json          <- you write this
assets/            <- 1920x988 frames from the capture agents (never edit pixels)
captures.json      <- what each frame shows, visible text, measured rects (frame coordinates)
captures/*.txt     <- page text per frame
```

Build tool: `python3 /Users/admin/wc/weather-station/release-kit/four-videos/_tools/vbuild.py <video-dir> <flags>`

| flag | what it does |
|---|---|
| `--check` | validates the spec (dashes, banned words, forbidden names, missing images, rect bounds) and prints the estimated length |
| `--dry --render` | SILENT preview with estimated timings: writes `final-dry.mp4`. Use it to look at layout, zoom and overlaps. No TTS is spent. |
| `--preview-diagrams` | writes `preview-diagrams.html` showing every diagram stage |

**Never run vbuild without `--dry` or `--check`.** The real run (voice, alignment, final render) is done by the lead after the fact-check.

To look at a frame of the preview: `ffmpeg -ss <seconds> -i final-dry.mp4 -frames:v 1 -vf scale=1280:720 /tmp/x.png` then Read the png. `timeline.json` lists each beat's start time.

## spec.json

```json
{
  "id": "gas",
  "title": "Connected Environment",
  "capture_label": "LIVE CAPTURE · 4 OCT 2026 · READ-ONLY",
  "chapters": [ {"name": "Overview", "path": "Left rail › Connected Environment › Gas"} ],
  "diagrams": { "umbrella": {}, "paths": {}, "agent": {} },
  "beats": [ ... ]
}
```

Voice (Aoede, Gemini 3.1) and model are set by the tool. Chapters give the header label (`01 OVERVIEW`) and the "OPEN ..." path shown on screenshot scenes (where the screen is: a menu path or "by address"); `chapter` on a beat is the 1-based index (0 = no header).

### Beat kinds (every beat needs `id`, `kind`, `narration`)

**card**: full-screen typographic scene.
- `"card":"title"` with `eyebrow`, `h1` (may contain `<em>word</em>` in orange), `sub`.
- `"card":"lines"` with `eyebrow`, `lines` (3-5 short lines, each appears in turn; the earlier ones dim). `<em>` allowed.
- `"card":"list"` with `eyebrow`, `h1`, `items:[{"t","s"}]` (2-4 items).

**shot**: a screenshot with camera and callouts.
```json
{"id":"g04","kind":"shot","chapter":1,"img":"assets/g-dashboard-c.png",
 "narration":"...", "caption":"max 12 words",
 "zoom":{"r":[x,y,w,h]},                         // camera moves to this rect (frame coordinates); optional "s" overrides the scale (1.15 to 1.9)
 "callouts":[{"r":[x,y,w,h],"l":"label","pos":"a|b|r|l|inr","click":false}],
 "badge":"DIRECTION"}                             // optional chip in the caption bar
```
- Rects are in FRAME coordinates (1920x988), exactly as listed in `captures.json`.
- Consecutive beats with the same `img` and `chapter` share one scene: the camera glides from one target to the next. Use that: one image, several beats, each zooming to what is being said.
- One callout dims everything else (spotlight). Two or three callouts get numbered badges and no dimming. Labels are 1-4 words.
- `"click":true` animates a cursor to the callout: use it for "where to click" beats.
- `pos`: `a` above (auto), `b` below, `r` right, `l` left, `inr` inside the right end of a wide rect.

**tri**: 2 or 3 images side by side, `imgs`, `labels`, optional `crops:[[x,y,w,h],...]` (give all crops the SAME aspect ratio, e.g. 640x560, so the tiles line up), `caption`. Use for "three products, one layout".

**diagram**: `"diagram":"umbrella|paths|agent"` and `"stage": n`. Consecutive beats with the same diagram form one animated scene; stage n is revealed when its beat starts.
- umbrella stages: 1 canopy "Connected Environment" · 2 the three products · 3 "One platform" bar with chips · 4 devices row + connectors · 5 path labels on the connectors · 6 your site team (watch, decide, control) · 7 the future AI agent with a DIRECTION ribbon.
- paths stages: 1, 2, 3 reveal lane 1, 2, 3 (device → steps) · the next stage after the last lane reveals the "one model" sink (stage 4 with three lanes, stage 2 with one lane). With one or two lanes in `diagrams.paths.lanes`, the lanes are centred. A product video can use one lane (its own device path).
- agent stages: 1 what the platform knows · 2 the platform · 3 the AI agent · 4 the people-stay-in-control bar. A DIRECTION ribbon is always shown.
- Customise text with `spec.diagrams.<name>` (shapes in `vbuild.py`: functions `umbrella`, `paths`, `agent` and their defaults). Every label you put there is a claim: it must be supported by the research facts (`_research/*.json`) and phrased customer-safe.
- Diagram beats may omit `caption`; do not add a caption on umbrella beats (it would sit on the device row).

## Narration craft (the last videos were judged too weak: do better)

- Open on a concrete question or scene, not a feature name. Close with one clear next step.
- One idea per beat, 15-40 words. Sentences under 18 words. Active verbs. Say what the viewer SEES at the moment they see it ("This strip is the answer."), then what it means.
- Plain words. Say "an answer", not "a verdict endpoint". Explain a technical word the first time (Modbus: "an industrial wiring standard many sensors speak").
- Contrast and rhythm: "Numbers tell you what. An answer tells you what to do." Short, then a longer sentence. Avoid lists of nouns.
- Numbers: only those visible in the frame being shown, or fixed facts from the research files. Never say a live value that will be stale tomorrow unless it is on screen and part of the point.
- Tone: confident, calm, useful. No hype, no filler ("powerful", "seamless"), no "we are excited".
- wstack voice rules: no em dashes or en dashes, none of: delve, crucial, robust, comprehensive, nuanced, multifaceted, furthermore, moreover, additionally, pivotal, landscape, tapestry, underscore, foster, showcase, intricate, vibrant, fundamental, significant, interplay.
- Safety language: never say a site IS safe. Say what the page says: "All Clear", "within limits", "Danger". Lightning alerts are a backup: the site's own cabinet lights and sounder come first (the page says so).
- What is not live today (the future AI agent, flag-gated screens) is DIRECTION: say so in the narration and put `"badge":"DIRECTION"` on the beat.

## Visual craft

- Every beat needs a visual reason: the camera moves to the thing being named, or a callout points at it. Do not leave the same full-frame view for more than one beat without a zoom.
- Use `click:true` callouts for "where to click". Use `tri` once for the cross-product moment. Diagrams: the umbrella video uses all three (umbrella, paths with three lanes, agent). A product video may use ONE `paths` diagram with a single lane (its own device path; stage 1 = the lane, stage 2 = the sink). The `agent` diagram is for the umbrella video only.
- Captions are the muted-viewing track: a short phrase that restates the beat (max 12 words, no dash characters).
- Show the NEW screens first-class: they are the reason for the refresh.

## Truth and hygiene (the lead rejects specs that break these)

- Add an `"evidence"` array to EVERY beat (not rendered): each entry is a frame name plus the exact visible text it relies on, or a research claim id (`integration-and-devices#c12`). A claim without evidence does not ship.
- Customer-facing text (narration, caption, labels, h1, items, diagram labels) contains no ticket IDs, version numbers, feature-flag names, or customer/site names (Aramco, Fadhili, Riyas, Jafurah, GIP, PKG1). Station and detector serials in frames are fine.
- Do not state the Fadhili lightning go-live date (unknown). Do not claim Gas feeds the Observation Manager (not built). Read `_research/agent-and-control.json` `must_not_claim`.
- Never show or describe an action as performed that the capture did not do (nothing was acknowledged, closed, saved or switched).

## Lengths

Umbrella 2:45-3:30 (about 400-520 words). Each product video 1:45-2:30 (about 250-340 words). Words per second ~2.35 (the tool prints the estimate).

## Evidence rules added after the research (read these)

- Research files: `_research/integration-and-devices.json`, `_research/agent-and-control.json`, `_research/changes.json`. Cite claims as `integration-and-devices#W06`, `agent-and-control#<id>`, `changes#<id>`. Open each file's `claims`, `must_not_claim`, `direction_only` and `open_questions` before you write a word.
- A claim may be stated plainly only if its `live_today` is `yes` OR it is directly visible in a frame you use (quote the visible text in `evidence`). `unknown` means omit it or soften it to what the page shows. `no` means it may appear only as DIRECTION or as "not available".
- You may copy frames from another video's `assets/` into yours (`cp`), keeping the file name. Never edit pixels.
- Frames with a map are already blurred on purpose (privacy). Keep the blur; a caption may say "map blurred".
- Saudi time evidence: front-end commits f3e49a1 and 8dfbae9 (all times in Asia/Riyadh) and a live test where the portal was loaded with the browser clock set to Los Angeles time and still showed Saudi clock times. Lightning pages label times "AST, UTC+3"; Weather Station and Reports pages show clock times without a zone label.
- The real run is blocked unless the lead sets an environment flag. If vbuild refuses, that is correct: use `--dry`.

## Diagram text is mandatory

The builder refuses a spec whose diagram text is not set explicitly (`--check` lists the missing keys). Set every key:
- `diagrams.umbrella`: tagline, products[{t,s,icon: sun|bolt|gas}], platform{t,chips[]}, devices[{t,icon: station|sensor|detector}], paths[3 short pill labels], team{t,verbs[]}, agent{t,lines[],badge}
- `diagrams.paths`: title, lanes[{badge,product,device,icon,steps[[title,subtitle] x up to 4]}], sink{t,s}
- `diagrams.agent`: title, knows[], platform, platform_sub, agent{t,verbs[]}, guard, badge
Every string is a customer-facing claim. Keep pill and step titles short (pills about 24 characters, step titles about 16, subtitles about 24) so they do not clip.

## Writing for the voice (Aoede reads your narration aloud)

- Spell out what a voice stumbles on: "H two S", "L E L", "C S V file", "Excel file", "Saudi time" (not AST).
- The first four words of every beat must be unique in the video and contain no digits or abbreviations: the aligner finds each beat in the transcript by those four words.
- No parentheses, brackets, emoji, URLs, markdown or stage directions in narration. One blank line is added between beats automatically.
