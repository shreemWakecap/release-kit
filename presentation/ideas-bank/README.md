# Connected Environment: all slides

Open `../connected-environment-all-slides.html` in Chrome (works offline). 39 pages: **22 built slides** (bright dots) and **17 ideas** that were planned but never built (blueprint cards).
The 7-slide demo deck is `../connected-environment-story.html`. Nothing here changes it.

Keys: → plays a slide, O = all slides, N = notes, F = full screen, ? = help. Click a dot on the map slide to jump.

| # | Slide | Part | Status | In the 7-slide demo | Source file |
|---|---|---|---|---|---|
| 1 | From a weather station to one data bank | why | built | yes | story/src/slides/01-title.js |
| 2 | Is it safe to work right now? | why | built | yes | story/src/slides/02-question.js |
| 3 | Every claim wears a badge | why | built |  | story-archive/detailed-slides/03-badges.js |
| 4 | The story map | why | built |  | story-archive/map/04-map.js |
| 5 | The cost of every decision | why | built | yes | story/src/slides/04-stakes.js |
| 6 | What a wrong call costs: lives and hours | why | idea |  | idea only: see plan.js |
| 7 | From heat to cost: the chain | why | idea |  | idea only: see plan.js |
| 8 | Before: a weather station on its own | convert | built |  | story-archive/detailed-slides/07-before.js |
| 9 | Six eras, 497 days | convert | idea |  | idea only: see plan.js |
| 10 | One app grew into three | convert | built |  | story-archive/conversion/05-conversion.js |
| 11 | One portal area, three products | convert | built |  | story-archive/shipped/05-shipped.js |
| 12 | Rename day: one name, 260 files | convert | idea |  | idea only: see plan.js |
| 13 | Where it stands | convert | built |  | story-archive/detailed-slides/11-status.js |
| 14 | The build in numbers | convert | idea |  | idea only: see plan.js |
| 15 | Two paths in. One page. | tech | built | yes | story/src/slides/13-flow.js |
| 16 | The path of every reading, today (first detailed version) | tech | built |  | story/board/20-flow.js |
| 17 | The system around Connected Environment | tech | idea |  | idea only: see plan.js |
| 18 | Weather: from a sensor head to a pixel | tech | built |  | story-archive/detailed-slides/15-flow-weather.js |
| 19 | Lightning: silence is never clear | tech | idea |  | idea only: see plan.js |
| 20 | Gas: asked every 45 seconds | tech | idea |  | idea only: see plan.js |
| 21 | Where each number comes from | tech | built |  | story-archive/provenance/08-provenance.js |
| 22 | Alerts leave the screen | tech | built |  | story-archive/detailed-slides/19-alerts.js |
| 23 | What is stored where | bank | idea |  | idea only: see plan.js |
| 24 | What prediction would still need | bank | idea |  | idea only: see plan.js |
| 25 | The join keys that already exist | bank | built |  | story-archive/detailed-slides/22-keys.js |
| 26 | From three stores to one pool | bank | built |  | story-archive/pool/23-pool.js |
| 27 | Plan the day early | future | built |  | story-archive/predict/10-predict.js |
| 28 | Plan: suggested work plans | future | idea |  | idea only: see plan.js |
| 29 | Save lives: the closed loop | future | idea |  | idea only: see plan.js |
| 30 | Permits check the weather | future | built |  | story-archive/permits/11-permits.js |
| 31 | Equipment meets the weather | future | idea |  | idea only: see plan.js |
| 32 | One system, four data streams | future | idea |  | idea only: see plan.js |
| 33 | Connect to other WakeCap products | future | built | yes | story/src/slides/08-connect.js |
| 34 | Your site, published rates | numbers | idea |  | idea only: see plan.js |
| 35 | The relations, with numbers | numbers | idea |  | idea only: see plan.js |
| 36 | Our roadmap | next | built | yes | story/src/slides/32-roadmap.js |
| 37 | One data bank. One answer. Lives first. | next | built | yes | story/src/slides/14-close.js |
| 38 | Every number, its source | appendix | idea |  | idea only: see plan.js |
| 39 | What we do not claim | appendix | built |  | story-archive/limits/14-limits.js |

## How to reuse a slide

Copy its file from `slides/` into `../story/src/slides/`, add or keep its id in `../story/src/plan.js`, and the live deck builds it.
The first 35-slide plan, with each idea's bullets, is `original-plan-35.js`. Re-run `python3 make_ideas_bank.py` to rebuild the deck.
