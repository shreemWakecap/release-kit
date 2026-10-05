# Builder brief: Connected Environment story (read this first, fully)

## RULE ZERO: EASY WORDS, FEW WORDS (the user asked for this; it beats every other style hint)
The audience reads a slide in 3 seconds. Write like you talk to a smart 12 year old. Short, plain, concrete.
Word budget per slide (words ON the slide, not in the notes):
- Headline: 2 to 6 words. Sub line: 0 to 8 words (or none).
- Everything else: labels of 1 to 3 words, bullets of 2 to 5 words, at most 3 bullets. No paragraphs. No sentence longer than 8 words on the slide.
- Total words on the slide: about 30 or fewer (not counting product screenshots). Fewer is better. Delete, then delete again.
- Plain words: "use" not "utilize", "show" not "demonstrate", "start" not "initiate", "check" not "validate". No jargon (no "provenance", "ingest", "outbox", "telemetry", "entitlement"). Product names are fine: Weather Station, Lightning, Gas, Connected Environment, Observation Manager, Safety Policy.
- Let the picture and the motion tell the story, not the text. Big type, big shapes, lots of dark space.
- Speaker notes: short too, 3 to 6 plain sentences, then an optional line "If asked: ..." with the deeper fact.


## INTERNAL SHOW, OUR OWN PRODUCT (decision from the user, overrides anything below)
This deck is shown INTERNALLY about OUR OWN product. NO outside statistics, no published studies, no ILO/WHO/Lancet/OSHA/NSC numbers, no source tables.
Numbers on slides may only be: (a) numbers visible in our own live product screens (the masked frames under `/Users/admin/wc/weather-station/release-kit/four-videos/*/assets/` and `/Users/admin/wc/weather-station/release-kit/presentation/assets/`, and the script evidence in `/Users/admin/wc/weather-station/release-kit/four-videos/final/*.script.md`), or (b) facts from the internal research sheets in `research/C*.md`. Everything else is a concept drawn as a picture, with no invented figures. Vision slides carry the Vision badge, no dates, a person approves.

## TOP PRIORITY: LIGHT DETAIL (the presenter must not be dragged into detailed questions)
The deck is now 15 slides, merged and high level. The presenter does not want to be asked deep technical or numeric questions.
- Headline claims only. One idea per slide, 3 to 5 things on screen, short plain words.
- NO cadences or timings (seconds, minutes between polls), byte sizes, frame formats, table or file or commit counts, ticket ids, version numbers other than "1.0", internal class or file names, vendor protocol names beyond what a manager knows (mesh, gateway, cloud, database, portal are enough).
- Dates only at month level ("Aug 2026"), and only when they carry the story.
- Put the deeper facts ONLY in the speaker notes, under a line that starts "If asked:" (so the presenter has the answer ready but the slide stays light).
- Every claim still comes from the research files and carries the right badge. Never invent. When unsure, leave it out.

You build ONE OR MORE slides of a live, animated HTML presentation. The user is watching the deck in a browser while you work.
Folder: `/Users/admin/wc/weather-station/release-kit/presentation/story/` (call it STORY). Everything you need is under it.

## How the live deck works (important)
- A watcher rebuilds the shared deck on EVERY file change under `STORY/src/`, and the open browser reloads itself.
  So: write a COMPLETE first working version of your slide file EARLY (a few minutes in). The blueprint placeholder for your slide then flips into your real slide.
  Then iterate. Always save complete, syntactically valid files (use the Write tool for the whole file). A broken file shows the placeholder again.
- Your slide REPLACES the placeholder with the same `id`. The id MUST equal the plan id. File name: `STORY/src/slides/NN-<id>.js` where NN = the plan number zero-padded (the plan is `STORY/src/plan.js`).
- Section, title, short flag come from the plan if you leave them out. You set: `kicker`, `reality`, `steps`, `notes`, `html`, `css`, `init/enter/step/static`.
- Write ONLY your own slide files (and assets named `STORY/src/assets/<id>-*.png|jpg|svg` if really needed). Never edit engine.js, engine.css, shell.html, plan.js, build_story.py or other people's slides.
  If you need an engine feature, work around it and mention it in your report.

## Read before coding (10 minutes, no more)
1. `STORY/README-slides.md`: module contract, Fx helpers, design rules, honesty rules. Follow it exactly.
2. Reference slides, read the code AND look at their screenshots in `STORY/qa/`: `src/slides/01-title.js`, `02-question.js`, `05-shipped.js`, `13-flow.js` (SVG lanes, nodes, ctx.flow packets), `23-pool.js` (SVG tween, liquid merge).
3. `STORY/src/engine.css` class list (glass, rb badges, chip, label, shine...). `STORY/src/engine.js` only for the Fx and ctx API.
4. The research files named in your assignment, under `STORY/research/`. They are long: read each file's "story in ten lines" and the sections you need (use grep for headings). Facts only from there.

## Quality bar (the user judges on this)
- One idea per slide. A headline that states it. At most 5 things on screen at once. Body text 26px or larger, labels 20px or larger, nothing under 16px. Safe area x 96..1824, y 120..1000.
- A signature animation that EXPLAINS: flow of data, build-up, cause and effect, a timeline lighting up, a counter earning its number. Steps (0..N) are presses of the Next key; plan 3 to 6 steps; step 0 is the arrival state.
- Light and glow in the WakeCap look: black stage, orange light (`--wc-orange`), glass cards, glow on the thing that matters, packets along flows (`ctx.flow`), a count-up for numbers, one light sweep or burst on the key moment. Motion must mean something. Red moves only for Danger.
- Stage is 1920x1080. Use SVG for diagrams, HTML for text. Build SVG in `init(ctx)` from data. Implement `static(ctx)` so the final state prints and shows in calm mode.
- Look at your own screenshots with the Read tool at every step and FIX what you see: overlaps, clipped text, low contrast, empty areas, boring layouts, text that is too small, things hidden under the bottom bar (keep y < 1000).
- Speaker notes: plain short sentences, what to SAY at each step. No em dashes.

## Honesty rules (non-negotiable)
- Every fact on a slide comes from the research files. Numbers exactly as written there (with unit and year). Never invent numbers, names, dates, quotes, prices, versions or percentages.
- Badges: `live` = seen in production; `code` = in master code, deploy not verified; `test` = test environment only; `plan` = documented intent; `vision` = nobody built it (show no dates, and never write the words "no dates" on a slide or in notes; a person approves); `stat` = published number (show publisher and year on the slide in a `.src` line).
  Put the right badges in `reality: [...]`. Mixed slide = several badges, or per-element `<span class="rb rb-vision sm">Vision</span>`.
- This is an INTERNAL tech story. Service and component names are fine (sensors-service, Wirepas, AWS IoT, SQS, Timescale, Observation Manager...). NEVER show: ticket ids (TAN-1234), commit hashes, feature-flag names, customer or people names (say Project A/B/C or "a live project"), secrets, hostnames with keys.
- Never claim WakeCap results, never give dates for the future, never say a site "is safe". Gas acknowledge/close is recorded in WakeCap only. The AI assistant is direction only.

## Test loop (use your OWN dev file so parallel builders do not collide)
```
cd STORY
python3 build_story.py --out dist/dev-<yourname>.html
node qa_shots.js dist/dev-<yourname>.html <slideId> qa/<yourname> --wait=1800     # screenshots every step + layout lint (JSON)
node qa_controls.js dist/dev-<yourname>.html                                         # once, at the end: all PASS
```
Open the PNGs in `STORY/qa/<yourname>/` with the Read tool. Fix every "text outside safe area", "clipped" and "font below 16px" finding unless it is a deliberate tiny tag.
`qa_shots.js` only loads your slide when you pass its id. Pitfalls: SVG filters on zero-height shapes vanish (use `filter="url(#fx-glow-u)"` or polygons); never put layout transforms on `[data-step]` elements; `data-step` inside `<svg>` only fades.

## Report (final message, JSON via the schema you are given)
List what you built (file, id, steps), screenshots you checked, facts used (with the research file), anything you were unsure about, and engine gaps you hit.
