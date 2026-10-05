/* Slide 32: our roadmap. A staircase from what is live to what is vision. Facts: conversion research (open items) and ecosystem research (integration seams). */
Deck.add({
  id: 'roadmap', section: 'next', title: 'Our roadmap', kicker: 'What next · Our roadmap', reality: ['live', 'plan', 'vision'],
  steps: 4, ambient: { orb: 1.1, beam: .8, dust: 1 }, dur: [4500, 5500, 5500, 5500, 6500], minutes: 1.2,
  notes: [
    'This is our roadmap. First, what is live today: Weather Station, Lightning and Gas.',
    'Step 1: finish 1.0. Gas peaks and totals, and alerts that know the zone.',
    'Step 2: build the data bank. One shared key, and join the data.',
    'Step 3: connect to other products and plan the day. Work Permits, forecasts and plans.',
    'Step 4: a person approves every action.',
  ].join('\n'),
  html: `
    <h2 class="h2 rm-h" data-step="0">Our <span class="o glow-text">roadmap.</span></h2>
    <svg class="rm-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <div class="rm-card glass" data-k="0" data-step="0" data-delay="300"><span class="rb rb-live sm">Live</span><h3>Live today</h3><ul><li>Weather Station</li><li>Lightning</li><li>Gas</li></ul></div>
    <div class="rm-card glass" data-k="1" data-step="1" data-fx="up"><span class="rb rb-plan sm">Planned</span><h3>Finish 1.0</h3><ul><li>Gas peaks and totals</li><li>Alerts that know the zone</li></ul></div>
    <div class="rm-card glass" data-k="2" data-step="2" data-fx="up"><span class="rb rb-vision sm">Vision</span><h3>Build the data bank</h3><ul><li>One shared key</li><li>Join the data</li></ul></div>
    <div class="rm-card glass hot" data-k="3" data-step="3" data-fx="up"><span class="rb rb-vision sm">Vision</span><h3>Connect and plan</h3><ul><li>Work Permits</li><li>Forecasts and plans</li></ul></div>
    <div class="rm-final" data-step="4"><span class="shine">A person approves every action.</span></div>`,
  css: `
    .s-roadmap .rm-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-roadmap .rm-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-roadmap .rm-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-roadmap .rm-card{position:absolute;width:410px;padding:22px 26px 24px}
    .s-roadmap .rm-card[data-k="0"]{left:96px;top:672px}.s-roadmap .rm-card[data-k="1"]{left:534px;top:540px}.s-roadmap .rm-card[data-k="2"]{left:972px;top:408px}.s-roadmap .rm-card[data-k="3"]{left:1410px;top:276px}
    .s-roadmap .rm-card h3{margin:14px 0 10px;font:800 33px/1.1 var(--font);color:#fff}
    .s-roadmap .rm-card .rb{margin-right:8px}
    .s-roadmap .rm-card ul{margin:0;padding:0;list-style:none}
    .s-roadmap .rm-card li{position:relative;padding:5px 0 5px 24px;font:500 23px/1.28 var(--font);color:#DCDCD7}
    .s-roadmap .rm-card li::before{content:"";position:absolute;left:0;top:15px;width:10px;height:10px;border-radius:3px;background:var(--wc-orange);box-shadow:0 0 12px var(--wc-orange)}
    .s-roadmap .rm-card[data-k="3"] li::before{background:var(--vision);box-shadow:0 0 12px var(--vision)}
    .s-roadmap .rm-final{position:absolute;left:96px;top:330px;width:820px;font:900 66px/1.06 var(--font);letter-spacing:-.025em}`,
  init(ctx) {
    const svg = ctx.q('.rm-svg'), mk = Fx.el;
    /* a rising light path through the card corners */
    const d = 'M96 1000 L400 1000 C 470 1000, 470 872, 534 872 L944 872 C 1004 872, 1004 740, 1060 740 L1380 740 C 1440 740, 1440 608, 1500 608 L1820 608';
    const base = mk('path', { d, fill: 'none', stroke: 'rgba(255,255,255,.12)', 'stroke-width': 3 }, svg);
    ctx.path = mk('path', { d, fill: 'none', stroke: '#FF8300', 'stroke-width': 3, filter: 'url(#fx-glow-u)', opacity: .9 }, svg);
    ctx.flowR = ctx.flow(ctx.path, { color: '#FFB366', count: 3, speed: 330, r: 6, tail: 8, tailGap: 14 });
    ctx.cards = ctx.qa('.rm-card');
  },
  enter(ctx) { Fx.draw(ctx.path, 2200, 300); },
  step(ctx, i, dir, instant) {
    ctx.flowR.start();
    if (i >= 1 && !instant) Fx.burstEl(ctx.cards[Math.min(i, 3)], { n: 22, color: i === 3 ? '#C58BFF' : '#FF8300', speed: 340 });
  },
  static(ctx) { ctx.flowR.freeze(); },
});
