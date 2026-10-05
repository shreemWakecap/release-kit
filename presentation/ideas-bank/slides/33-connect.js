/* Slide: connect to other WakeCap products. One message: the data bank can feed Work Permits (a lifting action checked against wind speed) and work plans (plan the day early). More can join. Vision: nobody has built it. */
Deck.add({
  id: 'connect', section: 'future', title: 'Connect to other WakeCap products', kicker: 'What it can do · Other products', reality: ['vision'], short: true,
  steps: 2, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [4500, 6000, 6000], minutes: 1,
  notes: [
    'Our data does not have to stop at our screens. We can connect it to other WakeCap products.',
    'This is the data bank. It holds Weather, Lightning and Gas. Today the example is wind speed.',
    'Step 1: example one is Work Permits. A lifting action needs a safe wind. When the wind speed goes over the limit, the permit holds.',
    'Step 2: example two is work plans. We can plan the day early. A person approves every plan.',
    'More products can join later. This is a vision. Nobody has built it.',
    'If asked: the Digital Work Permit service already runs as a separate service. The permit service already sends permit types to the Observation Manager. That is in the code; full production state is not proven. Our product already has a wind limit and a lightning state that a permit could read. A permit could also read gas and heat: for example, hot work waits for gas OK, and a confined space stops when heat is in danger. A forecast, safe hours and work plans do not exist in the code today.',
  ].join('\n'),
  html: `
    <h2 class="h2 cn-h" data-step="0">Connect to other <span class="o glow-text">WakeCap products.</span></h2>
    <p class="lead cn-lead" data-step="0" data-delay="200">One example: wind speed. More can join.</p>
    <div class="cn-hub glass hot" data-step="0" data-delay="300"><b>Data bank</b><span>Weather · Lightning · Gas</span></div>
    <svg class="cn-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <div class="cn-state" data-step="1" data-delay="2000">Over the limit</div>
    <div class="cn-card glass sweepable cn-a" data-step="1">
      <div class="cn-row">
        <svg class="cn-ic" viewBox="0 0 64 64" fill="none" stroke="#FFB366" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 58V10M10 14h48M18 10l14 4M50 14v22M12 58h12"/><rect x="43" y="36" width="14" height="10" rx="2"/></svg>
        <div class="cn-ct"><b>Work Permits</b><span>Lifting action</span></div>
      </div>
      <div class="cn-chip warn" data-step="1" data-delay="1900" data-fx="pop">Hold: wind too high</div>
    </div>
    <div class="cn-card glass sweepable cn-c" data-step="2">
      <div class="cn-row">
        <svg class="cn-ic" viewBox="0 0 64 64" fill="none" stroke="#FFB366" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="32" cy="32" r="24"/><path d="M32 17v16l11 7"/></svg>
        <div class="cn-ct"><b>Work plans</b><span>Plan the day early</span></div>
      </div>
      <div class="cn-chip vis" data-step="2" data-delay="1500" data-fx="pop">A person approves</div>
    </div>`,
  css: `
    .s-connect .cn-h{position:absolute;left:96px;top:104px;width:1700px;font-size:62px}
    .s-connect .cn-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-connect .cn-hub{position:absolute;left:96px;top:300px;width:620px;height:628px;padding:34px 40px}
    .s-connect .cn-hub b{display:block;font:800 40px/1.1 var(--font);color:#fff}
    .s-connect .cn-hub span{display:block;margin-top:10px;font:500 26px/1.2 var(--font);color:#B9B9B4}
    .s-connect .cn-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-connect .cn-wl{font:800 36px/1 var(--font);fill:#fff}
    .s-connect .cn-lim{font:800 22px/1 var(--font);fill:#FFB366;letter-spacing:.08em;text-transform:uppercase}
    .s-connect .cn-state{position:absolute;left:96px;top:836px;width:620px;text-align:center;font:800 32px/1 var(--font);color:#FFC24B}
    .s-connect .cn-card{position:absolute;left:1100px;width:724px;height:296px;padding:38px 40px}
    .s-connect .cn-a{top:300px}.s-connect .cn-c{top:632px}
    .s-connect .cn-row{display:flex;align-items:center;gap:24px}
    .s-connect .cn-ic{flex:none;width:84px;height:84px;filter:drop-shadow(0 0 10px rgba(255,131,0,.4))}
    .s-connect .cn-ct b{display:block;font:800 44px/1.1 var(--font);color:#fff}
    .s-connect .cn-ct span{display:block;margin-top:8px;font:500 30px/1.2 var(--font);color:#B9B9B4}
    .s-connect .cn-chip{position:absolute;right:30px;bottom:28px;padding:12px 22px;border-radius:999px;border:2px solid;font:800 28px/1 var(--font)}
    .s-connect .cn-chip.warn{color:#FFC24B;border-color:#FFC24B;background:rgba(255,194,75,.1);box-shadow:0 0 24px rgba(255,194,75,.25)}
        .s-connect .cn-chip.vis{color:#C58BFF;border-color:#C58BFF;background:rgba(197,139,255,.1);box-shadow:0 0 24px rgba(197,139,255,.25)}`,
  init(ctx) {
    const svg = ctx.q('.cn-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg);
    const cx = 406, cy = 700, R = 170, LIM = .68;
    const pt = (v, r) => { const th = Math.PI * (1 - v); return [cx + r * Math.cos(th), cy - r * Math.sin(th)]; };
    const arc = (v0, v1, col) => { const [x0, y0] = pt(v0, R), [x1, y1] = pt(v1, R); mk('path', { d: `M${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1}`, stroke: col, 'stroke-width': 24, fill: 'none' }); };
    arc(0, LIM, '#2BD576'); arc(LIM, 1, '#FFC24B');
    const [tx0, ty0] = pt(LIM, R - 24), [tx1, ty1] = pt(LIM, R + 26), [lx, ly] = pt(LIM, R + 50);
    mk('line', { x1: tx0, y1: ty0, x2: tx1, y2: ty1, stroke: '#fff', 'stroke-width': 4, filter: 'url(#fx-glow-u)' });
    mk('text', { class: 'cn-lim', x: lx + 8, y: ly, text: 'Limit' });
    ctx.needle = mk('polygon', { points: `${cx - 7},${cy} ${cx + 7},${cy} ${cx},${cy - 148}`, fill: '#fff', filter: 'url(#fx-glow-soft)' });
    mk('circle', { cx, cy, r: 17, fill: '#FFB366' }); mk('circle', { cx, cy, r: 7, fill: '#0F0F11' });
    mk('text', { class: 'cn-wl', x: cx, y: 786, 'text-anchor': 'middle', text: 'Wind speed' });
    /* roads for the glowing packets: from the data bank to each product */
    const road = (d, step) => mk('path', { d, stroke: 'rgba(255,131,0,.8)', 'stroke-width': 2.4, fill: 'none', filter: 'url(#fx-glow-u)', 'data-step': step });
    const pa = road('M716 560 C 900 560, 940 448, 1096 448', 1), pc = road('M716 660 C 900 660, 940 780, 1096 780', 2);
    const fl = (p) => { const f = ctx.flow(p, { color: '#FFB366', count: 3, speed: 200, r: 6, tail: 7, tailGap: 13 }); f.stop().show(false); return f; };
    ctx.fl = [fl(pa), fl(pc)];
    ctx.lo = .2; ctx.hi = .86; ctx.v = ctx.lo; ctx.tgt = ctx.lo;
    ctx.drawNeedle = (t) => {
      const w = ctx.calm ? 0 : (ctx.v > LIM ? Math.sin(t * 5.1) * 1.4 + Math.sin(t * 2.3) * 1.1 : Math.sin(t * 2.7) * .7);
      ctx.needle.setAttribute('transform', `rotate(${-90 + 180 * ctx.v + w} ${cx} ${cy})`);
    };
    ctx.drawNeedle(0);
  },
  enter(ctx) { ctx.raf((dt) => { const d = ctx.tgt - ctx.v; if (Math.abs(d) > .0004) ctx.v += d * Math.min(1, dt * 2.4); ctx.drawNeedle(performance.now() / 1000); }); },
  step(ctx, i, dir, instant) {
    ctx.tgt = i >= 1 ? ctx.hi : ctx.lo; if (instant || ctx.calm) { ctx.v = ctx.tgt; ctx.drawNeedle(0); }
    ctx.fl.forEach((f, k) => { f.show(i >= k + 1); if (i >= k + 1) f.start(); else f.stop(); });
    if (!instant && dir > 0) {
      if (i === 1) { ctx.after(300, () => Fx.sweep(ctx.q('.cn-a'))); ctx.after(2300, () => Fx.burstEl(ctx.q('.cn-a .cn-chip'), { n: 22, color: '#FFC24B', speed: 300 })); }
      if (i === 2) { ctx.after(300, () => Fx.sweep(ctx.q('.cn-c'))); ctx.after(1800, () => Fx.burstEl(ctx.q('.cn-c .cn-chip'), { n: 18, color: '#C58BFF', speed: 280 })); }
    }
  },
  static(ctx) { ctx.v = ctx.tgt = ctx.hi; ctx.drawNeedle(0); ctx.fl.forEach((f) => f.show(true).freeze()); },
});
