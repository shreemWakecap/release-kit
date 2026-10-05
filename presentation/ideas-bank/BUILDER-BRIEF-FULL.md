# Builder brief: the FULL interactive deck (17 missing slides)

Read `../story/BUILDER-BRIEF.md` and `../story/README-slides.md` first. Everything there still applies (RULE ZERO easy words, quality bar, honesty, module contract, Fx helpers).
This file CHANGES or ADDS the rules below. Where they disagree, THIS FILE wins.

## What you build
One or two slide modules for the full deck. The owner wants ALL the slides as real, animated, interactive slides in one HTML file (no placeholders).
Write ONLY `new-slides/<id>.js` in this folder (`/Users/admin/wc/weather-station/release-kit/presentation/ideas-bank/new-slides/`). The `id` must equal the plan id, and `section` must equal the section given in your assignment.
Extra pictures only if truly needed: `assets/<id>-*.png|svg` in this folder (prefer drawing in SVG/HTML, no screenshots with real names). NEVER edit anything under `../story/src/`, `../story/`, other builders' files, `make_ideas_bank.py`, `plan.js` or `sections.js`.

## Plan details
Your slide's plan entry (brief, shows, needs) is in `original-plan-35.js` (same folder). The slide `stakes-lives` is the plan entry with id `stakes`. Treat `shows` as ideas to cover simply, not as a word list to paste: pick the 3 to 5 strongest and show them as pictures and motion.

## Words (the owner asked for this four times: it is the top rule)
- Easy to read AND easy to hear. Headline 6 words or fewer. Labels 1 to 3 words. Bullets 2 to 5 words. About 30 words on the slide (source lines on stat slides come on top).
- Plain words only. Say system, not platform. Maker, not vendor. Peaks and totals, not exposure. Decision, not call. Stop work, not stand down. No jargon (no provenance, ingest, telemetry, outbox, entitlement, orchestration).
- NEVER write "no dates", "not a schedule" or any line about dates on a slide or in the notes. Show no dates for the future, and do not announce it. No Arabic content.
- Speaker notes: 3 to 6 short spoken sentences (12 words or fewer each), no symbols, then one optional line starting "If asked:" with the deeper fact.

## Numbers
- Our own product facts (counts from code, dates of our history, thresholds on our screens): only from `../story/research/C1` to `C7` and the live-screen assets. Copy exactly, with unit. Never invent.
- Outside (published) numbers are allowed ONLY on slides with status `stat` (`stakes-lives`, `chain`, `calc`, `relations`, `sources`), badge `stat`, and ONLY from this fixed shortlist of claims marked [verified] in `../story/research/verified-numbers.md`: S1-01, S1-03, S1-05, S1-06, S1-07, S1-08, S1-09, S1-16, S1-17, S1-18, S4-01, S4-02, S4-04. Read the full claim line, copy figure, unit, publisher and year exactly, and put publisher and year on the slide in a `.src` line (17px or larger). Projections and modelled losses must say so (S1-01 is a 2030 projection; S1-06 is a modelled potential loss).
- Lightning and Gas have no verified outside numbers. Do not show any.
- Calculators and chains are "an illustration, not a WakeCap result". Never claim WakeCap results. Never say a site is safe.
- Vision slides (`plan`, `lives`, `equipment`, `streams`, and the vision part of others): Vision badge, nobody has built it, a person approves, no dates.
- No ticket ids, commit hashes, feature-flag names, customer or people names (say Project A), hostnames, or secrets.

## Motion: one press plays the whole slide
The engine plays every step of a slide automatically after one press of Next: it waits half of each step's `dur` (between 1.3 s and 3.6 s) before starting the next step. A second press skips to the end. So:
- Use 3 to 5 steps, set `dur` (for example `[4000, 5000, 5000, 5000]`), and make each step's animation finish inside its gap.
- Step 0 is the arrival state. The whole slide should be fully shown about 8 to 12 seconds after the press.
- `static(ctx)` must put the slide in its final state (print and skip use it). Anything drawn by JS needs it.
- Reuse the look of the finished slides in `../story/src/slides/` and `../story-archive/` (glass cards, orange light, packets along flows, count-ups, one light sweep on the key moment). Red only for Danger.

## Test loop (use your own names, never the shared files)
```
cd /Users/admin/wc/weather-station/release-kit/presentation/ideas-bank
python3 dev_slide.py <id>                     # builds dev/<id>/dev.html (one-slide deck)
cd ../story
node qa_shots.js ../ideas-bank/dev/<id>/dev.html <id> ../ideas-bank/qa/<id> --wait=2200    # screenshot of every step + layout lint (JSON)
node word_check.js ../ideas-bank/dev/<id>/dev.html                                         # hard words, long lines, long spoken sentences
```
Open the PNGs with the Read tool and FIX what you see: overlaps, clipped text, text under 16px, anything outside x 96..1824 / y under 1000, empty or boring layouts. Also check the slide works with a press-through: `node qa_oneclick.js ../ideas-bank/dev/<id>/dev.html` (first press must reach the last step on its own).
Write a complete valid file EARLY (within 10 minutes), then iterate. A syntax error shows nothing.

## Report
For each slide: file, steps, what it shows, every number used with its source id, anything you were unsure about.
