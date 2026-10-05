/* Slide 01: cinematic title with the data-bank core. Pattern slide: shows data-step, ctx.flow, Fx.draw, ambient, static(). */
Deck.add({
  id: 'title', section: 'why', title: 'From a weather station to one data bank', kicker: 'Release story · October 2026',
  short: true, steps: 2, ambient: { orb: 1.35, beam: 1.3, dust: 1.2 }, dur: [5200, 4500, 5000], minutes: 1,
  notes: 'One weather app became three products. Next step: one data bank.\nUnder the title is how it grew. May 2025: Weather Station. June 2026: its own app. August 2026: a new name. September 2026: Lightning and Gas. October 2026: version 1.0.\nIf asked: the backend was about 276 commits old before the UI moved to its own app (June 2026). The rename on 24 Aug 2026 moved about 260 files. The backend moved about 345 files on 27 Aug. The first production tag under the new name was 3 Sep 2026. Version 1.0 was tagged 30 Sep 2026, so the Oct label means the 1.0 build that was live that month: build 1.0.7 was seen live on 4 Oct 2026. Lightning landed in the code on 30 Aug 2026, Gas screens on 8 Sep and the Gas backend on 13 Sep.\nStep 1: Weather Station, Lightning and Gas are live today.\nStep 2: the purple dots are the future: permits, equipment, workers. Not built yet.',
  html: `
    <div class="beam" style="left:1000px;top:-380px;width:1100px;height:1300px"></div>
    <div class="t-left">
      <div class="t-eyebrow" data-step="0" data-fx="left">WakeCap · Connected Environment</div>
      <h1 class="t-title">
        <span class="t-l1" data-step="0" data-delay="200">From a weather station</span>
        <span class="t-l2 shine" data-step="0" data-delay="520">to one data bank.</span>
      </h1>
      <p class="lead t-sub" data-step="1">One app. Three products. Next: one data bank.</p>
      <div class="t-tags" data-step="2">
        <span class="chip"><i class="t-dot" style="background:#FF8300"></i>Weather Station</span>
        <span class="chip"><i class="t-dot" style="background:#4FB3FF"></i>Lightning</span>
        <span class="chip"><i class="t-dot" style="background:#2BD576"></i>Gas</span>
        <span class="chip t-vis"><i class="t-dot" style="background:#C58BFF"></i>Work permits · Equipment · Workers</span>
      </div>
    </div>
    <div class="t-time">
      <div class="t-time-h">How it grew</div>
      <div class="t-time-line"></div>
      <div class="t-ms" style="left:0"><i></i><b>May 2025</b><span>Weather Station</span></div>
      <div class="t-ms" style="left:235px"><i></i><b>Jun 2026</b><span>Its own app</span></div>
      <div class="t-ms" style="left:470px"><i></i><b>Aug 2026</b><span>New name</span></div>
      <div class="t-ms" style="left:705px"><i></i><b>Sep 2026</b><span>Lightning and Gas</span></div>
      <div class="t-ms now" style="left:940px"><i></i><b>Oct 2026</b><span>Version 1.0</span></div>
    </div>
    <svg class="t-core" viewBox="0 0 820 820" width="820" height="820"></svg>`,
  css: `
    .s-title .t-left{position:absolute;left:96px;top:190px;width:1060px}
    .s-title .t-eyebrow{font:800 24px/1 var(--font);letter-spacing:.32em;text-transform:uppercase;color:var(--wc-orange)}
    .s-title .t-title{margin:30px 0 0;font:800 98px/1.02 var(--font);letter-spacing:-.045em;white-space:nowrap}
    .s-title .t-l1,.s-title .t-l2{display:block;padding-bottom:6px}
    .s-title .t-l1{color:#fff}
    .s-title .t-sub{margin-top:38px;width:880px;font-size:32px}
    .s-title .t-tags{margin-top:38px;display:flex;flex-wrap:wrap;gap:14px;width:1000px}
    .s-title .t-dot{display:block;width:12px;height:12px;border-radius:50%;box-shadow:0 0 14px currentColor}
    .s-title .t-vis{border-style:dashed;border-color:rgba(197,139,255,.7);color:#E5CCFF}
    .s-title .t-time{position:absolute;left:96px;top:846px;width:1200px;height:150px}
    .s-title .t-time-h{font:800 20px/1 var(--font);letter-spacing:.28em;text-transform:uppercase;color:#8E8E89}
    .s-title .t-time-line{position:absolute;left:8px;top:63px;width:948px;height:2px;background:linear-gradient(90deg,rgba(255,131,0,.9),rgba(255,179,102,.55));box-shadow:0 0 12px rgba(255,131,0,.5)}
    .s-title .t-ms{position:absolute;top:56px;width:230px}
    .s-title .t-ms i{display:block;width:16px;height:16px;border-radius:50%;background:#0B0B0C;border:3px solid var(--wc-orange);box-shadow:0 0 14px rgba(255,131,0,.7)}
    .s-title .t-ms b{display:block;margin-top:14px;font:800 26px/1 var(--font);color:#fff}
    .s-title .t-ms span{display:block;margin-top:8px;font:500 22px/1.15 var(--font);color:#B9B9B4}
    .s-title .t-ms.now i{background:var(--wc-orange)}.s-title .t-ms.now b{color:#FFB366}
    .s-title .t-core{position:absolute;left:1000px;top:130px;overflow:visible}
    .s-title .ring{fill:none;stroke:rgba(255,255,255,.16);stroke-width:1.5}
    .s-title .ring.r3{stroke-dasharray:3 12;stroke:rgba(255,255,255,.24)}
    .s-title .tspin{transform-origin:410px 410px;animation:tRot 70s linear infinite}
    .s-title .tspin.rev{animation-duration:90s;animation-direction:reverse}
    @keyframes tRot{to{transform:rotate(360deg)}}
    .s-title .node text{font:800 22px/1 var(--font);fill:#fff;text-anchor:middle}
    .s-title .node.ghost text{fill:#E5CCFF;font-weight:700}
    .s-title .node{opacity:0;transition:opacity .8s var(--ease)}
    .s-title .node.on{opacity:1}
    .s-title .node .pop{transform-box:fill-box;transform-origin:center;transform:scale(.4);transition:transform .9s cubic-bezier(.2,1.3,.3,1)}
    .s-title .node.on .pop{transform:scale(1)}
    .s-title .link{fill:none;stroke-width:2;opacity:0;transition:opacity .8s}
    .s-title .link.on{opacity:.55}
    .s-title .core-hex{transform-origin:410px 410px;animation:tRot 24s linear infinite}
    .s-title .core-label{font:800 20px/1 var(--font);letter-spacing:.3em;fill:#1b0f05;text-anchor:middle}
    .s-title .core-glow{animation:tBreath 4.2s ease-in-out infinite;transform-origin:410px 410px}
    @keyframes tBreath{50%{transform:scale(1.12);opacity:.8}}`,
  init(ctx) {
    const svg = ctx.q('.t-core'), C = 410, R1 = 255, R2 = 350, CORE = 112;
    const mk = (t, a, p) => Fx.el(t, a, p || svg);
    /* rings + decorative orbiting dots */
    ['150:r1', '255:r2', '350:r3'].forEach((s) => { const [r, c] = s.split(':'); mk('circle', { class: 'ring ' + c, cx: C, cy: C, r }); });
    const sp = mk('g', { class: 'tspin' }); [[0, 255], [120, 255], [240, 255]].forEach(([a, r]) => mk('circle', { cx: C + r * Math.cos(a * Math.PI / 180), cy: C + r * Math.sin(a * Math.PI / 180), r: 4, fill: '#FFB366', filter: 'url(#fx-glow)' }, sp));
    const sp2 = mk('g', { class: 'tspin rev' }); [[60, 350], [180, 350], [300, 350]].forEach(([a, r]) => mk('circle', { cx: C + r * Math.cos(a * Math.PI / 180), cy: C + r * Math.sin(a * Math.PI / 180), r: 3.5, fill: '#C58BFF', filter: 'url(#fx-glow)' }, sp2));
    /* core */
    mk('circle', { class: 'core-glow', cx: C, cy: C, r: 150, fill: 'url(#g-core)', opacity: .7 });
    mk('circle', { cx: C, cy: C, r: CORE, fill: '#FF8300', filter: 'url(#fx-glow-soft)' });
    mk('circle', { cx: C, cy: C, r: CORE - 14, fill: '#FFB366' });
    const hex = mk('polygon', { class: 'core-hex', points: Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3 + Math.PI / 6; return (C + 140 * Math.cos(a)) + ',' + (C + 140 * Math.sin(a)); }).join(' '), fill: 'none', stroke: 'rgba(255,255,255,.55)', 'stroke-width': 2 });
    mk('text', { class: 'core-label', x: C, y: C + 7, text: 'DATA BANK' });
    /* nodes */
    const nodes = [
      { id: 'w', name: 'Weather Station', a: -90, col: '#FF8300', icon: 'sun', real: true },
      { id: 'l', name: 'Lightning', a: 30, col: '#4FB3FF', icon: 'bolt', real: true },
      { id: 'g', name: 'Gas', a: 150, col: '#2BD576', icon: 'gas', real: true },
      { id: 'p', name: 'Work permits', a: -45, col: '#C58BFF', icon: 'doc', r: R2 },
      { id: 'e', name: 'Equipment', a: 90, col: '#C58BFF', icon: 'gear', r: R2 },
      { id: 'k', name: 'Workers', a: 225, col: '#C58BFF', icon: 'person', r: R2 },
    ];
    ctx.nodes = nodes;
    nodes.forEach((n) => {
      const r = n.r || R1, x = C + r * Math.cos(n.a * Math.PI / 180), y = C + r * Math.sin(n.a * Math.PI / 180), ux = Math.cos(n.a * Math.PI / 180), uy = Math.sin(n.a * Math.PI / 180);
      const link = mk('path', { class: 'link', d: `M${x - ux * 52} ${y - uy * 52} L${C + ux * (CORE + 8)} ${C + uy * (CORE + 8)}`, stroke: n.col, 'stroke-dasharray': n.real ? '' : '6 8' });
      const g = mk('g', { class: 'node' + (n.real ? '' : ' ghost') }), pop = mk('g', { class: 'pop' }, g);
      mk('circle', { cx: x, cy: y, r: 50, fill: 'rgba(10,10,12,.88)', stroke: n.col, 'stroke-width': 2.5, 'stroke-dasharray': n.real ? '' : '7 7', filter: n.real ? 'url(#fx-glow-soft)' : '' }, pop);
      const ic = mk('g', { transform: `translate(${x} ${y})`, stroke: n.col, fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, pop);
      if (n.icon === 'sun') { mk('circle', { r: 9 }, ic); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; mk('line', { x1: Math.cos(a) * 15, y1: Math.sin(a) * 15, x2: Math.cos(a) * 22, y2: Math.sin(a) * 22 }, ic); } }
      if (n.icon === 'bolt') mk('polygon', { points: '3,-22 -12,3 -1,3 -5,22 12,-6 1,-6 6,-22', fill: n.col, 'fill-opacity': .25 }, ic);
      if (n.icon === 'gas') { mk('circle', { cx: -10, cy: 6, r: 9 }, ic); mk('circle', { cx: 0, cy: -6, r: 12 }, ic); mk('circle', { cx: 11, cy: 7, r: 8 }, ic); }
      if (n.icon === 'doc') { mk('path', { d: 'M-12 -20 H4 L14 -10 V20 H-12 Z' }, ic); mk('path', { d: 'M-5 0 H7 M-5 9 H7' }, ic); }
      if (n.icon === 'gear') { mk('polygon', { points: Array.from({ length: 6 }, (_, k) => { const a = k * Math.PI / 3; return (Math.cos(a) * 20) + ',' + (Math.sin(a) * 20); }).join(' ') }, ic); mk('circle', { r: 8 }, ic); }
      if (n.icon === 'person') { mk('circle', { cy: -10, r: 8 }, ic); mk('path', { d: 'M-16 20 C-16 4 16 4 16 20' }, ic); }
      const ly = n.a === 90 ? y + 82 : (uy > 0.3 ? y + 84 : y - 70);
      mk('text', { x, y: ly, text: n.name }, g);
      n.el = g; n.link = link; n.x = x; n.y = y;
    });
    ctx.flows = nodes.map((n) => ctx.flow(n.link, { color: n.col, count: n.real ? 2 : 1, speed: n.real ? 120 : 70, r: n.real ? 6 : 4, tail: 6, tailGap: 13 }));
    ctx.flows.forEach((f) => f.stop().show(false));
  },
  enter(ctx) { ctx.qa('.ring').forEach((r, i) => Fx.draw(r, 1800, 200 + i * 250)); },
  step(ctx, i, dir, instant) {
    const show = (n, on) => { n.el.classList.toggle('on', on); n.link.classList.toggle('on', on); };
    ctx.nodes.forEach((n, k) => {
      const on = n.real ? i >= 1 : i >= 2;
      if (instant) show(n, on); else ctx.after((n.real ? 0 : 0) + (k % 3) * 260, () => show(n, on));
    });
    ctx.flows.forEach((f, k) => { const on = ctx.nodes[k].real ? i >= 1 : i >= 2; f.show(on); if (on) f.start(); else f.stop(); });
    if (i >= 2 && !instant) Fx.burstEl(ctx.q('.t-vis'), { n: 18, color: '#C58BFF', speed: 260 });
  },
  static(ctx) { ctx.nodes.forEach((n) => { n.el.classList.add('on'); n.link.classList.add('on'); }); ctx.flows.forEach((f) => f.show(true).freeze()); },
});
