# Slide module contract (Connected Environment story)

One HTML file, no dependencies, 1920x1080 stage scaled to the window. Slides are JS modules in `src/slides/NN-name.js`
that call `Deck.add({...})`. `python3 build_story.py --out dist/dev-NAME.html` inlines everything.
Test your slide: `node qa_shots.js dist/dev-NAME.html <slideId> qa/NAME` (screenshots every step + layout lint),
then LOOK at the PNGs with the Read tool. `node qa_controls.js dist/dev-NAME.html` tests keys, overview, notes, print.
Run in your own dev file name so parallel builders never overwrite each other. Reference slides: `01-title.js`, `02-question.js`.

## Module shape
```js
Deck.add({
  id: 'flow-weather',            // unique, kebab-case; CSS scope is .s-flow-weather
  section: 'tech',               // why | convert | tech | bank | future | numbers | next | appendix
  title: 'The path of a weather reading',   // used in overview, notes, presenter window
  kicker: 'Data paths · Weather',           // small orange label top-left (optional)
  reality: ['code'],             // badge top-right: live | code | test | plan | vision | stat (array allowed). Honest: see below
  steps: 5,                      // build steps. Step 0 = state on arrival. Next key goes 0->1->2... then next slide
  dur: [4000, 4500, ...],        // autoplay ms per step (optional)
  minutes: 1,                    // suggested talk time (optional)
  ambient: { orb: 1, beam: .7, dust: 1 },   // background light intensity 0..1.5 (calm slides: beam .3)
  notes: 'Speaker notes, plain sentences, what to SAY at each step.',
  html: `...markup in 1920x1080 coordinates...`,
  css: `.s-flow-weather .x{...}`,      // always scope with .s-<id>
  init(ctx) {},                  // once, DOM exists. Build SVG here, create ctx.flow(...) controllers
  enter(ctx, dir) {},            // slide became active (dir 1 forward, -1 back)
  step(ctx, i, dir, instant) {}, // step index changed. instant=true when jumping/going back: set final state, no animation
  leave(ctx) {},                 // optional; timers, rafs and flows are cleaned up automatically
  static(ctx) {},                // REQUIRED for any canvas/JS-drawn state: put slide in its final state (print/PDF)
});
```
## Revealing things
- `data-step="n"` on any HTML element: hidden until step n (fade+rise). `data-fx="left|right|down|scale|pop|fade|blur"` changes the motion.
  `data-step-out="m"` hides it again at step m (replace one element by another). `data-delay="300"` staggers (ms).
- NEVER put layout transforms (translate/scale/rotate) on a `[data-step]` element: wrap it. Inside `<svg>`, `data-step` only fades.
- Do not use CSS `filter` on zero-height SVG shapes (horizontal lines): they vanish. Use `filter="url(#fx-glow-u)"` or a polygon/rect.

## ctx (per slide)
`ctx.root`, `ctx.q(sel)`, `ctx.qa(sel)`, `ctx.raf((dt,t)=>{})` per-frame while active, `ctx.after(ms,fn)` timers (auto-cleared),
`ctx.stagger(list, fn, stepMs, startMs)`, `ctx.flow(pathEl,{color,speed,count,r,tail,tailGap,loop})` -> glowing packets travelling an SVG path;
controller: `.start() .stop() .show(bool) .speed(n) .freeze() .color(c)`. Start flows in `step()` (they pause while the slide is inactive and resume on re-entry).
`ctx.calm` true when motion is reduced.

## Fx helpers (global `Fx`)
`Fx.counter(el, to, {from,dur,dec,prefix,suffix,fmt})`, `Fx.type(el, text, cps)`, `Fx.draw(pathEl, ms, delay)` stroke draw-in,
`Fx.sweep(el)` highlight pass (el needs class `sweepable`), `Fx.burst(x,y,{n,color,speed})`, `Fx.burstEl(el,opts)`, `Fx.tilt(el)`,
`Fx.el(tag, attrs, parent)` create HTML/SVG nodes, `Fx.ease.*`, `Fx.fmt(n,dec)`.
SVG defs available globally: filters `#fx-glow`, `#fx-glow-soft`, `#fx-glow-u` (userSpace, works on lines), gradients `#g-orange`, `#g-orange-v`, `#g-core`.

## Design rules (WakeCap look: black, orange light, glass)
- Tokens (CSS vars): `--wc-orange #FF8300` (brand glow), `--wc-orange-deep #E9590C` (portal primary), `--wc-orange-soft #FFB366`, `--ink*` blacks, `--txt`, `--mut`.
  Status: `--danger --ok --check`. Reality badge colours: live green, code blue, test amber, plan grey, vision purple (dashed), stat white.
- Classes: `.h1 .h2 .h3 .lead .p .small .label .mono .o(orange) .glow-text .shine .title-grad .glass .glass.hot .edge-glow .sweepable .chip .rb(.rb-live...) .src .beam .pulse-ring .float .blink`.
- Type minimums on the 1920 stage: body 26px+, labels 20px+, source lines 17px+. Nothing under 16px.
- Safe area: x 96..1824, y 0..1000 (the HUD sits on the bottom 70px and top 60px of the window). Title zone y 100..260.
- Every slide: ONE idea, a headline that states it, at most 5 things on screen at once. Motion explains (flow, build-up, cause and effect); no decoration for its own sake.
- Make light feel real: glow on the thing that matters, packets along flows, a light sweep on arrival of a key card, count-ups for numbers.
- All text must fit; run the lint. Prefer SVG for diagrams, HTML for text. No external requests, no web fonts, no CDN.

## Honesty rules (non-negotiable)
- Every fact on a slide must come from `research/*.md|json`. Never invent numbers, names, dates, quotes or prices. No customer or people names (say Project A/B/C).
- Badge honestly. `live` = seen working in production; `code` = in master, deploy not verified; `test` = test environment only; `plan` = documented intent;
  `vision` = nobody built it (use dashed purple, say "Vision" in text; show no dates and never write "no dates" on a slide); `stat` = published external number (show publisher + year on the slide with class `src`).
- A slide mixing statuses uses several badges or per-element `<span class="rb rb-vision sm">Vision</span>`.
- Published numbers: copy exactly from `research/verified-numbers` (figure, year, publisher). Illustrations are labelled "illustration, not a measured WakeCap result".
- Never claim WakeCap results. Never promise dates. Gas acknowledge/close is recorded in WakeCap only; the assistant is direction only.
