/* Board 3: from three ponds to one pool. Today: separate stores. Vision: one data bank with new inputs and outputs. */
Deck.add({
  id: 'pool', section: 'bank', title: 'From three stores to one pool', kicker: 'Data and the bank · The data bank', reality: ['code', 'vision'],
  steps: 4, ambient: { orb: 1.1, beam: .5, dust: 1 }, dur: [4500, 5000, 5000, 5000, 6500],
  notes: 'Today the data sits in three separate stores.\nNothing joins them yet. The keys to join them already exist.\nStep 2: new data could flow in: workers, permits, equipment.\nStep 3: new answers could flow out: forecasts, plans, permit checks.\nAll of this is vision. A person approves.\nIf asked: weather readings sit in a time-series table owned by the sensors service. The platform database has about 31 tables. There is no foreign key between the three.',
  html: `
    <h2 class="h2 pl-h" data-step="0">From three stores to <span class="o glow-text">one pool.</span></h2>
    <p class="lead pl-lead" data-step="0" data-delay="200">Today, each one stands alone.</p>
    <svg class="pl-svg" viewBox="0 0 1920 1080" width="1920" height="1080">
      <defs>
        <filter id="pl-goo" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur in="SourceGraphic" stdDeviation="15" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -13"/></filter>
        <radialGradient id="pl-liq" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#FFD9B0"/><stop offset=".35" stop-color="#FF9A33"/><stop offset="1" stop-color="#E9590C"/></radialGradient>
      </defs>
      <g class="pl-glow"></g><g class="pl-rip"></g><g class="pl-blobs" filter="url(#pl-goo)"></g>
      <g class="pl-lbl"></g><g class="pl-in"></g><g class="pl-out"></g><g class="pl-keys"></g>
    </svg>
    <div class="pl-bank" data-step="1" data-fx="pop"><b>DATA BANK</b><span class="rb rb-vision sm">Vision</span></div>
    <div class="pl-note glass" data-step="4" data-fx="up"><b class="o">Nothing joins them yet.</b> The keys exist: project, time, zone, device.</div>`,
  css: `
    .s-pool .pl-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-pool .pl-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-pool .pl-svg{position:absolute;left:0;top:0;overflow:visible}
    .s-pool .pl-bank{position:absolute;left:760px;top:548px;width:400px;text-align:center;pointer-events:none}
    .s-pool .pl-bank b{display:block;font:900 40px/1 var(--font);letter-spacing:.28em;color:#2a1405;text-shadow:0 0 18px rgba(255,255,255,.5)}
    .s-pool .pl-bank .rb{margin-top:14px;background:rgba(10,10,12,.7)}
    .s-pool .pl-note{position:absolute;left:96px;top:900px;width:1728px;padding:18px 30px;font:500 25px/1.4 var(--font);color:#E6E6E2}
    .s-pool .lbl-t{font:800 24px/1 var(--font);fill:#fff}
    .s-pool .lbl-s{font:500 18.5px/1 var(--font);fill:#B9B9B4}
    .s-pool .io rect{fill:#0F0F11;stroke-width:2.2}
    .s-pool .io .t{font:800 22px/1 var(--font);fill:#fff}
    .s-pool .io .s{font:500 17.5px/1 var(--font);fill:#B9B9B4}
    .s-pool .tag{font:800 16px/1 var(--mono);letter-spacing:.12em;fill:#C58BFF}
    .s-pool .rip{fill:none;stroke:#FF8300;stroke-width:2;transform-box:fill-box;transform-origin:center;animation:plRip 4.2s var(--ease) infinite;opacity:0}
    @keyframes plRip{0%{transform:scale(.7);opacity:.7}100%{transform:scale(1.7);opacity:0}}`,
  init(ctx) {
    const svg = ctx.q('.pl-svg'), blobs = ctx.q('.pl-blobs'), lbl = ctx.q('.pl-lbl'), mk = Fx.el;
    ctx.ponds = [
      { n: 'Sensor data', s: 'weather', ax: 470, ay: 520, ar: 78, cx: 925, cy: 585, cr: 120 },
      { n: 'App data', s: 'Lightning, Gas, policies', ax: 960, ay: 700, ar: 104, cx: 975, cy: 610, cr: 130 },
      { n: 'Alerts', s: 'who gets what', ax: 1450, ay: 520, ar: 66, cx: 955, cy: 545, cr: 100 },
    ];
    ctx.ponds.forEach((p) => { p.el = mk('circle', { cx: p.ax, cy: p.ay, r: p.ar, fill: 'url(#pl-liq)' }, blobs); p.lb = mk('g', {}, lbl); mk('text', { class: 'lbl-t', x: p.ax, y: p.ay + p.ar + 40, 'text-anchor': 'middle', text: p.n }, p.lb); mk('text', { class: 'lbl-s', x: p.ax, y: p.ay + p.ar + 68, 'text-anchor': 'middle', text: p.s }, p.lb); });
    /* ripples + glow around the merged pool */
    const rip = ctx.q('.pl-rip'); ctx.rip = [0, 1, 2].map((i) => { const c = mk('circle', { class: 'rip', cx: 955, cy: 585, r: 170, style: `animation-delay:${i * 1.4}s` }, rip); c.style.display = 'none'; return c; });
    ctx.glow = mk('circle', { cx: 955, cy: 585, r: 300, fill: 'url(#g-core)', opacity: 0 }, ctx.q('.pl-glow'));
    ctx.glow.style.transition = 'opacity 1.6s';
    /* inputs and outputs */
    const mkio = (g, x, y, w, t, s, col, dir, i) => { const n = mk('g', { class: 'io' }, g); mk('rect', { x, y, width: w, height: 92, rx: 16, stroke: col, 'stroke-dasharray': '7 7' }, n); mk('text', { class: 't', x: x + 18, y: y + 36, text: t }, n); mk('text', { class: 's', x: x + 18, y: y + 66, text: s }, n); mk('text', { class: 'tag', x: x + w - 74, y: y + 26, text: 'VISION' }, n); return n; };
    const gin = ctx.q('.pl-in'), gout = ctx.q('.pl-out');
    const ins = [['Workers', 'where they are', 330], ['Permits', 'what and where', 480], ['Equipment', 'where and how', 630]];
    const outs = [['Forecast', 'heat and storms', 330], ['Work plans', 'a person approves', 480], ['Permit checks', 'allow or hold', 630], ['Stop work', 'by the weather', 780]];
    ctx.ins = ins.map(([t, s, y]) => { const g = mk('g', {}, gin); g.style.opacity = 0; g.style.transition = 'opacity .8s'; mkio(g, 96, y, 300, t, s, '#C58BFF'); const path = mk('path', { d: `M396 ${y + 46} C 560 ${y + 46}, 640 585, 800 585`, stroke: '#C58BFF', 'stroke-width': 2.4, fill: 'none', 'stroke-dasharray': '7 8' }, g); return { g, path }; });
    ctx.outs = outs.map(([t, s, y]) => { const g = mk('g', {}, gout); g.style.opacity = 0; g.style.transition = 'opacity .8s'; mkio(g, 1524, y, 300, t, s, '#C58BFF'); const path = mk('path', { d: `M1110 585 C 1260 585, 1340 ${y + 46}, 1520 ${y + 46}`, stroke: '#C58BFF', 'stroke-width': 2.4, fill: 'none', 'stroke-dasharray': '7 8' }, g); return { g, path }; });
    ctx.inF = ctx.ins.map((o) => { const f = ctx.flow(o.path, { color: '#C58BFF', count: 2, speed: 150, r: 5, tail: 6, tailGap: 12 }); f.stop().show(false); return f; });
    ctx.outF = ctx.outs.map((o) => { const f = ctx.flow(o.path, { color: '#FFB366', count: 2, speed: 150, r: 5, tail: 6, tailGap: 12 }); f.stop().show(false); return f; });
    /* join keys ring */
    const kg = ctx.q('.pl-keys'); ctx.keys = ['project', 'time', 'zone', 'device'].map((k, i) => { const a = (-60 + i * 40) * Math.PI / 180; const x = 955 + 262 * Math.cos(a - Math.PI / 2), y = 585 + 262 * Math.sin(a - Math.PI / 2); const g = mk('g', {}, kg); g.style.opacity = 0; g.style.transition = 'opacity .8s'; mk('rect', { x: x - 62, y: y - 20, width: 124, height: 40, rx: 20, fill: 'rgba(10,10,12,.9)', stroke: '#2BD576', 'stroke-width': 2 }, g); mk('text', { x, y: y + 7, 'text-anchor': 'middle', text: k, style: 'font:800 20px var(--mono);fill:#2BD576' }, g); return g; });
    ctx.t = 0; ctx.tt = 0;
    ctx.apply = (t) => {
      const e = Fx.ease.inOutCubic(t);
      ctx.ponds.forEach((p) => { p.el.setAttribute('cx', Fx.lerp(p.ax, p.cx, e)); p.el.setAttribute('cy', Fx.lerp(p.ay, p.cy, e)); p.el.setAttribute('r', Fx.lerp(p.ar, p.cr, e)); p.lb.style.opacity = 1 - Math.min(1, t * 1.6); });
    };
    ctx.apply(0);
  },
  enter(ctx) { ctx.raf((dt) => { if (Math.abs(ctx.tt - ctx.t) > .001) { ctx.t += Math.sign(ctx.tt - ctx.t) * Math.min(Math.abs(ctx.tt - ctx.t), dt / 1.7); ctx.apply(ctx.t); } }); },
  step(ctx, i, dir, instant) {
    ctx.tt = i >= 1 ? 1 : 0; if (instant || ctx.calm) { ctx.t = ctx.tt; ctx.apply(ctx.t); }
    ctx.glow.setAttribute('opacity', i >= 1 ? .85 : 0); ctx.rip.forEach((r) => { r.style.display = i >= 1 ? '' : 'none'; });
    ctx.ins.forEach((o, k) => { o.g.style.opacity = i >= 2 ? 1 : 0; const f = ctx.inF[k]; f.show(i >= 2); if (i >= 2) f.start(); else f.stop(); });
    ctx.outs.forEach((o, k) => { o.g.style.opacity = i >= 3 ? 1 : 0; const f = ctx.outF[k]; f.show(i >= 3); if (i >= 3) f.start(); else f.stop(); });
    ctx.keys.forEach((k) => { k.style.opacity = i >= 4 ? 1 : 0; });
    if (i === 1 && !instant) ctx.after(1500, () => Fx.burst(innerWidth / 2, innerHeight * .55, { n: 34, speed: 420 }));
  },
  static(ctx) { ctx.t = ctx.tt = 1; ctx.apply(1); ctx.glow.setAttribute('opacity', .85); ctx.ins.concat(ctx.outs).forEach((o) => { o.g.style.opacity = 1; }); ctx.keys.forEach((k) => { k.style.opacity = 1; }); ctx.inF.concat(ctx.outF).forEach((f) => f.show(true).freeze()); },
});
