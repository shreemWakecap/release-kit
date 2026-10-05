/* Slide 14: what we do not claim. Five calm glass cards, three then two, each with a thin cross. Easy words, few words. */
const LM_X = '<svg class="lm-x" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true"><path class="rg" pathLength="1" d="M62 32 A30 30 0 1 1 2 32 A30 30 0 1 1 62 32"/><path class="ln l1" pathLength="1" d="M24 24 L40 40"/><path class="ln l2" pathLength="1" d="M40 24 L24 40"/></svg>';
/* lines = the words, broken where a person would pause. delay = [step, ms]. */
const LM_CARD = (lines, delay) => `<div class="lm-slot" data-step="${delay[0]}" data-delay="${delay[1]}"><div class="glass sweepable lm-card">${LM_X}<p class="lm-t">${lines.map((l) => `<span class="lm-l">${l}</span>`).join(' ')}</p></div></div>`;
Deck.add({
  id: 'limits', reality: [],
  steps: 2, ambient: { orb: .9, beam: .3, dust: .9 }, dur: [3200, 5200, 6200], minutes: .5,
  notes: [
    'Step 0: Pause on the headline. Say it calmly.',
    'Step 1: Vision is not built yet. In code is not the same as live. The badges show which is which. Lightning is a backup.',
    'Step 2: Gas peaks and totals are not in the product yet. People decide, and the product helps.',
    'If asked: the Lightning page tells people to follow the site\'s cabinet lights and sounder first. The Gas screen says "Not available yet" for exposure and compliance. The assistant gives direction only, and a person approves every plan.',
  ].join('\n'),
  html: `
    <div class="lm-head"><h2 class="h2 lm-h" data-step="0">What we do <span class="o glow-text">not</span> claim</h2></div>
    <div class="lm-grid">
      ${LM_CARD(['Vision is', 'not built yet.'], [1, 500])}
      ${LM_CARD(['In code is not', 'the same as live.'], [1, 680])}
      ${LM_CARD(['Lightning is', 'a backup.'], [1, 860])}
      ${LM_CARD(['Gas peaks and totals:', 'not yet.'], [2, 100])}
      ${LM_CARD(['People decide.', 'The product helps.'], [2, 280])}
    </div>`,
  css: `
    .s-limits .lm-head{position:absolute;left:96px;top:118px;transform-origin:0 0;transition:transform 1.25s var(--ease)}
    .s-limits:not(.lm-up) .lm-head{transform:translate(var(--hx,0px),var(--hy,0px)) scale(var(--hs,1))}
    .s-limits .lm-h{font-size:76px;white-space:nowrap}
    .s-limits .lm-grid{position:absolute;left:96px;top:318px;width:1728px;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:40px}
    .s-limits .lm-slot{grid-column:span 2}.s-limits .lm-slot:nth-child(4){grid-column:2 / span 2}.s-limits .lm-slot:nth-child(5){grid-column:4 / span 2}
    .s-limits .lm-card{min-height:282px;height:100%;padding:36px 40px 38px;display:flex;flex-direction:column;justify-content:space-between}
    .s-limits .lm-card::before{content:"";position:absolute;left:-70px;top:-70px;width:300px;height:300px;pointer-events:none;background:radial-gradient(circle,rgba(255,131,0,.2),transparent 66%);opacity:0;transition:opacity 1.4s var(--ease)}
    .s-limits .lm-card.on::before{opacity:1}
    .s-limits .lm-card.sweep::after{background:linear-gradient(105deg,transparent 22%,rgba(255,170,100,.07) 38%,rgba(255,226,196,.15) 50%,rgba(255,170,100,.07) 62%,transparent 78%);animation-duration:2s}
    .s-limits .lm-t{position:relative;margin:0;font:700 46px/1.15 var(--font);letter-spacing:-.015em;color:#F4F4F2;text-wrap:balance}
    .s-limits .lm-l{display:block}
    .s-limits .lm-x{position:relative;display:block;width:64px;height:64px;overflow:visible;filter:drop-shadow(0 0 10px rgba(255,131,0,.35))}
    .s-limits .lm-x path{fill:none;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;opacity:0}
    .s-limits .lm-x .rg{stroke:rgba(255,255,255,.3);stroke-width:1.5}
    .s-limits .lm-x .ln{stroke:#FFB366;stroke-width:2.5}
    .s-limits .lm-card.on .lm-x path{stroke-dashoffset:0;opacity:1;transition:stroke-dashoffset .9s var(--ease),opacity .3s}
    .s-limits .lm-card.on .lm-x .l1{transition-delay:.35s}
    .s-limits .lm-card.on .lm-x .l2{transition-delay:.5s}
    body.calm .s-limits .lm-x path,body.calm .s-limits .lm-card::before,body.calm .s-limits .lm-head{transition:none!important}`,
  init(ctx) {
    const h = ctx.q('.lm-head'), w = h.offsetWidth, hh = h.offsetHeight, s = 1.55;
    h.style.setProperty('--hs', s);
    h.style.setProperty('--hx', (960 - w * s / 2 - 96) + 'px');
    h.style.setProperty('--hy', (500 - hh * s / 2 - 118) + 'px');
    ctx.cards = ctx.qa('.lm-card');
  },
  enter(ctx) {
    /* start every visit from a clean step 0: headline centred, no card or cross left over from the last visit */
    LM_UP(ctx, false, true);
    ctx.cards.forEach((c) => c.classList.remove('on', 'sweep'));
    const sl = ctx.qa('.lm-slot'); sl.forEach((s) => { s.style.transition = 'none'; s.classList.remove('in'); });
    void ctx.root.offsetWidth; sl.forEach((s) => { s.style.transition = ''; });
  },
  step(ctx, i, dir, instant) {
    LM_UP(ctx, i >= 1, instant);
    /* going back: cards leave at once (the engine would reuse their forward delays and they would linger under the moving headline) */
    if (dir < 0 && !instant) ctx.qa('.lm-slot').forEach((s) => { s.style.transitionDelay = '0ms'; });
    ctx.cards.forEach((c, k) => {
      const on = i >= (k < 3 ? 1 : 2);
      if (!on) { c.classList.remove('on', 'sweep'); return; }
      if (c.classList.contains('on')) return;
      if (instant || ctx.calm) { c.classList.add('on'); return; }
      ctx.after(+c.parentNode.dataset.delay + 350, () => { c.classList.add('on'); Fx.sweep(c); });
    });
  },
  static(ctx) { LM_UP(ctx, true, true); ctx.cards.forEach((c) => c.classList.add('on')); },
});
function LM_UP(ctx, on, instant) {
  const h = ctx.q('.lm-head');
  if (instant) h.style.transition = 'none';
  ctx.root.classList.toggle('lm-up', on);
  if (instant) { void h.offsetWidth; h.style.transition = ''; }
}
