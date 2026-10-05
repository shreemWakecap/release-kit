/* Slide 07: before. One product in two parts, a weather station on its own.
   Mast -> light line -> backend (born 25 May 2025) -> portal module page (born 11 Jun 2025) -> 2025 ribbon -> 276 backend commits.
   Facts: research C1 (2.1 E0, 2.2 ledger, 2.6 tags) and C2 (section 2, first production reading, stat). */
Deck.add({
  id: 'before', section: 'convert', title: 'Before: a weather station on its own', kicker: 'The conversion · Before', reality: ['code', 'stat'],
  steps: 4, ambient: { orb: 1, beam: .7, dust: 1 }, dur: [4200, 4800, 5200, 7000, 8500], minutes: 1.2,
  notes: 'Step 0: Before the conversion, Weather Station stood on its own. A weather station on a mast, sending readings.\nStep 1: The backend is born on 25 May 2025. A .NET service. The readings flow into it.\nStep 2: The portal module is born on 11 June 2025. It lives inside the portal monorepo, as the package wakecap-fe/ws. The page lights up. One product, in two parts, in two different places.\nStep 3: The 2025 ribbon, in date order. The first production reading on 1 May 2025 comes from an internal cost document, so it carries the stat badge. Then the backend, the portal module, the first stable tag, .NET 10 and stable 1.5.0.\nStep 4: 276 backend commits in this era, from 25 May 2025 to 22 June 2026. One product. Two parts. On its own. The next slides show how that changed.',
  html: `
    <h2 class="h2 bf-h" data-step="0">Before: a weather station <span class="o glow-text">on its own.</span></h2>
    <p class="lead bf-lead" data-step="0" data-delay="250">One product, in two parts: a backend and a module inside the portal.</p>
    <div class="bf-scene">
      <svg class="bf-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
      <div class="glass bf-be" data-step="1" data-fx="scale">
        <div class="label o">Part 1 · Backend</div>
        <div class="bf-t">.NET backend</div>
        <div class="bf-d">born <b>25 May 2025</b></div>
      </div>
      <div class="bf-page sweepable" data-step="2" data-fx="scale">
        <div class="bf-bar"><i></i><i></i><i></i><span class="bf-url mono">/project/:projId/ws</span></div>
        <div class="bf-body">
          <div class="bf-ptitle">Weather Station</div>
          <div class="bf-tiles"><span class="big"></span><span></span><span></span></div>
          <div class="bf-bars"><b></b><b></b></div>
        </div>
      </div>
      <div class="bf-cap" data-step="2" data-delay="300">
        <div class="label o">Part 2 · Portal module</div>
        <div class="bf-id mono">@wakecap-fe/ws</div>
        <div class="bf-d">inside the portal monorepo · born <b>11 Jun 2025</b></div>
      </div>
    </div>
    <svg class="bf-rsvg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <div class="bf-scrim"></div>
    <div class="bf-fin">
      <div class="bf-od" data-step="4" data-fx="fade"><div class="od-wrap"></div></div>
      <div class="bf-odl" data-step="4" data-delay="250">backend commits in this era</div>
      <div class="bf-ods src" data-step="4" data-delay="450">25 May 2025 to 22 Jun 2026 · backend repository, master</div>
      <div class="bf-line"><span data-step="4" data-delay="1500">One product.</span> <span data-step="4" data-delay="2100">Two parts.</span> <span class="bf-on shine" data-step="4" data-delay="2700">On its own.</span></div>
    </div>`,
  css: `
    .s-before .bf-h{position:absolute;left:96px;top:118px;width:1600px}
    .s-before .bf-lead{position:absolute;left:96px;top:214px;width:1300px;font-size:30px}
    .s-before .bf-scene{position:absolute;inset:0;transition:opacity 1.1s var(--ease)}
    .s-before[data-cur="3"] .bf-scene{opacity:.42}
    .s-before[data-cur="4"] .bf-scene,.s-before[data-cur="4"] .bf-rsvg{opacity:.12}
    .s-before .bf-svg,.s-before .bf-rsvg{position:absolute;left:0;top:0;overflow:visible}
    .s-before .bf-rsvg{transition:opacity 1.1s var(--ease)}
    .s-before .bf-mast{opacity:0;transition:opacity 1.4s var(--ease)}
    .s-before .bf-mast.on{opacity:1}
    .s-before .bf-ring{fill:none;stroke:#FF8300;stroke-width:2.5;transform-box:fill-box;transform-origin:center;animation:bfRing 3.9s var(--ease) infinite;opacity:0}
    @keyframes bfRing{0%{transform:scale(.7);opacity:.75}100%{transform:scale(3.1);opacity:0}}
    .s-before .bf-cups{transform-origin:250px 316px;animation:bfSpin 2.6s linear infinite}
    @keyframes bfSpin{to{transform:rotate(360deg)}}
    .s-before .bf-halo{animation:bfBreath 4.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
    @keyframes bfBreath{50%{transform:scale(1.12);opacity:.85}}
    .s-before .bf-mlab{font:800 20px/1 var(--font);letter-spacing:.2em;fill:#B9B9B4;text-anchor:middle;text-transform:uppercase}
    .s-before .bf-line-a,.s-before .bf-line-b{opacity:0;transition:opacity .6s}
    .s-before .bf-line-a.on,.s-before .bf-line-b.on{opacity:1}
    .s-before .bf-be{position:absolute;left:620px;top:356px;width:360px;height:260px;padding:28px 32px}
    .s-before .bf-t{font:800 42px/1.1 var(--font);color:#fff;margin-top:22px}
    .s-before .bf-d{font:500 26px/1.35 var(--font);color:#D9D9D4;margin-top:14px}
    .s-before .bf-d b{color:#fff;font-weight:800}
    .s-before .bf-page{position:absolute;left:1180px;top:316px;width:644px;height:300px;border-radius:22px;border:2px solid rgba(255,255,255,.2);background:#0C0C0E;box-shadow:0 30px 80px rgba(0,0,0,.5);transition:border-color .9s,box-shadow .9s}
    .s-before .bf-page.lit{border-color:var(--wc-orange);box-shadow:0 0 0 1px rgba(255,131,0,.3),0 0 90px rgba(255,131,0,.38),0 30px 80px rgba(0,0,0,.5)}
    .s-before .bf-bar{height:50px;display:flex;align-items:center;gap:9px;padding:0 18px;background:rgba(255,255,255,.06);border-bottom:1px solid var(--line)}
    .s-before .bf-bar i{display:block;width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.28)}
    .s-before .bf-url{margin-left:16px;font-size:21px;color:#E6E6E2;padding:6px 16px;border-radius:999px;background:rgba(0,0,0,.45)}
    .s-before .bf-body{padding:22px 28px}
    .s-before .bf-ptitle{font:800 28px/1 var(--font);color:#fff;opacity:.9}
    .s-before .bf-tiles{display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:16px;margin-top:20px}
    .s-before .bf-tiles span{display:block;height:92px;border-radius:14px;background:rgba(255,255,255,.07);border:1px solid var(--line);transition:all 1s var(--ease)}
    .s-before .bf-page.lit .bf-tiles span.big{background:linear-gradient(135deg,rgba(255,131,0,.55),rgba(233,89,12,.2));border-color:rgba(255,131,0,.8);box-shadow:0 0 40px rgba(255,131,0,.45);animation:bfTile 2.8s ease-in-out infinite}
    .s-before .bf-page.lit .bf-tiles span{border-color:rgba(255,179,102,.5)}
    @keyframes bfTile{50%{box-shadow:0 0 70px rgba(255,131,0,.7)}}
    .s-before .bf-bars{margin-top:18px;display:grid;gap:10px}
    .s-before .bf-bars b{display:block;height:12px;border-radius:6px;background:rgba(255,255,255,.1)}
    .s-before .bf-bars b:nth-child(2){width:62%}
    .s-before .bf-cap{position:absolute;left:1180px;top:634px;width:644px}
    .s-before .bf-id{font-size:38px;font-weight:800;color:#fff;margin-top:12px;line-height:1.1}
    .s-before .bf-cap .bf-d{margin-top:8px}
    .s-before .bf-scrim{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity 1.1s var(--ease);background:radial-gradient(ellipse 62% 52% at 50% 46%,rgba(5,5,6,.9),rgba(5,5,6,.55) 55%,rgba(5,5,6,0))}
    .s-before[data-cur="4"] .bf-scrim{opacity:1}
    .s-before .bf-fin{position:absolute;left:0;top:250px;width:1920px;text-align:center}
    .s-before .bf-od{display:flex;justify-content:center}
    .s-before .od-wrap{display:flex;font:900 250px/1 var(--font);font-variant-numeric:tabular-nums;color:#fff;filter:drop-shadow(0 0 26px rgba(255,131,0,.7)) drop-shadow(0 0 80px rgba(255,131,0,.35))}
    .s-before .od-col{display:block;width:.62em;height:1em;overflow:hidden;text-align:center;transition:opacity .8s}
    .s-before .od-col.z{opacity:.22}
    .s-before .od-strip{display:block;will-change:transform}
    .s-before .od-c{display:block;height:1em;line-height:1}
    .s-before .bf-odl{margin-top:6px;font:800 46px/1.1 var(--font);color:#fff;letter-spacing:-.01em}
    .s-before .bf-ods{margin-top:12px;font-size:22px;color:var(--mut)}
    .s-before .bf-line{margin-top:66px;font:800 74px/1.1 var(--font);letter-spacing:-.03em;color:#fff;white-space:nowrap}
    .s-before .bf-line span{display:inline-block;margin:0 .14em}
    .s-before .bf-on{margin-left:.2em}
    .s-before .rn-lab{font:800 22px/1 var(--font);fill:#fff}
    .s-before .rn-cap{font:600 20px/1 var(--font);fill:#B9B9B4}
    .s-before .rn-sub{font:500 18px/1 var(--font);fill:#8E8E89}
    .s-before .rn-mon{font:700 20px/1 var(--font);fill:#8E8E89;letter-spacing:.08em;text-transform:uppercase}
    .s-before .rn-node{opacity:.28;transition:opacity .7s}
    .s-before .rn-node .dot{transform-box:fill-box;transform-origin:center;transform:scale(.55);transition:transform .8s cubic-bezier(.2,1.5,.3,1)}
    .s-before .rn-node .txt{opacity:0;transition:opacity .7s var(--ease)}
    .s-before .rn-node.lit{opacity:1}
    .s-before .rn-node.lit .dot{transform:scale(1)}
    .s-before .rn-node.lit .txt{opacity:1}
    .s-before .rn-ring{fill:none;stroke-width:2.5;transform-box:fill-box;transform-origin:center;opacity:0}
    .s-before .rn-node.pop .rn-ring{animation:bfPop 1.3s var(--ease) both}
    @keyframes bfPop{0%{transform:scale(.6);opacity:.95}100%{transform:scale(3.4);opacity:0}}
    .s-before .rn-axis{transition:opacity .8s}
    .s-before .rn-tag{font:800 16px/1 var(--font);letter-spacing:.14em;fill:#fff}`,
  init(ctx) {
    const svg = ctx.q('.bf-svg'), rs = ctx.q('.bf-rsvg'), mk = (t, a, p) => Fx.el(t, a, p || svg);
    const MX = 250, Y = 486;
    /* ---- the mast */
    const mast = mk('g', { class: 'bf-mast' }); ctx.mast = mast;
    mk('circle', { class: 'bf-halo', cx: MX, cy: Y, r: 170, fill: 'url(#g-core)', opacity: .5 }, mast);
    [0, 1, 2].forEach((k) => mk('circle', { class: 'bf-ring', cx: MX, cy: Y, r: 52, style: 'animation-delay:' + (k * 1.3) + 's' }, mast));
    mk('ellipse', { cx: MX, cy: 694, rx: 170, ry: 16, fill: 'url(#g-core)', opacity: .42 }, mast);
    mk('path', { d: 'M96 694 H404', stroke: 'rgba(255,255,255,.3)', 'stroke-width': 2, fill: 'none' }, mast);
    mk('path', { d: `M${MX} 640 L${MX - 76} 694 M${MX} 640 L${MX + 76} 694 M${MX} 640 V694`, stroke: '#FF8300', 'stroke-width': 4, 'stroke-linecap': 'round', fill: 'none', filter: 'url(#fx-glow)' }, mast);
    mk('rect', { x: MX - 5, y: 318, width: 10, height: 326, rx: 4, fill: '#16120E', stroke: '#FF8300', 'stroke-width': 2.5, filter: 'url(#fx-glow)' }, mast);
    /* anemometer cups */
    const cups = mk('g', { class: 'bf-cups' }, mast);
    [90, 210, 330].forEach((a) => { const r = a * Math.PI / 180, x = MX + Math.cos(r) * 44, y = 316 + Math.sin(r) * 44; mk('line', { x1: MX, y1: 316, x2: x, y2: y, stroke: '#FFB366', 'stroke-width': 3.5, 'stroke-linecap': 'round' }, cups); mk('circle', { cx: x, cy: y, r: 11, fill: '#FF8300', stroke: '#FFD3A1', 'stroke-width': 2, filter: 'url(#fx-glow)' }, cups); });
    mk('circle', { cx: MX, cy: 316, r: 7, fill: '#fff', filter: 'url(#fx-glow)' }, mast);
    /* radiation shield: cap + stacked plates */
    mk('polygon', { points: `${MX - 52},${Y - 40} ${MX},${Y - 74} ${MX + 52},${Y - 40}`, fill: '#1B140C', stroke: '#FF8300', 'stroke-width': 2.5, 'stroke-linejoin': 'round', filter: 'url(#fx-glow)' }, mast);
    [-30, -8, 14, 36].forEach((dy) => mk('ellipse', { cx: MX, cy: Y + dy, rx: 54, ry: 10, fill: '#0F0F11', stroke: '#FF8300', 'stroke-width': 2.5, filter: 'url(#fx-glow)' }, mast));
    mk('ellipse', { cx: MX, cy: Y + 36, rx: 22, ry: 4, fill: '#FFB366', opacity: .8 }, mast);
    /* solar panel */
    mk('polygon', { points: `${MX + 8},566 ${MX + 118},540 ${MX + 118},596 ${MX + 8},622`, fill: 'rgba(79,179,255,.10)', stroke: '#FF8300', 'stroke-width': 2.2, 'stroke-linejoin': 'round' }, mast);
    mk('path', { d: `M${MX + 45} 557 V613 M${MX + 82} 548 V604 M${MX + 8} 594 L${MX + 118} 568`, stroke: 'rgba(255,179,102,.55)', 'stroke-width': 1.6, fill: 'none' }, mast);
    mk('text', { class: 'bf-mlab', x: MX, y: 740, text: 'Weather station' }, mast);
    /* ---- the light line: mast -> backend -> page */
    const defA = `M${MX + 62} ${Y} C ${MX + 190} ${Y - 26}, 480 ${Y + 26}, 612 ${Y}`, defB = `M988 ${Y} C 1050 ${Y - 20}, 1120 ${Y + 20}, 1172 ${Y}`;
    ctx.pathA = mk('path', { class: 'bf-line-a', d: defA, fill: 'none', stroke: '#FF8300', 'stroke-width': 4, 'stroke-linecap': 'round', filter: 'url(#fx-glow-u)' });
    ctx.pathB = mk('path', { class: 'bf-line-b', d: defB, fill: 'none', stroke: '#FF8300', 'stroke-width': 4, 'stroke-linecap': 'round', filter: 'url(#fx-glow-u)' });
    ctx.flowA = ctx.flow(ctx.pathA, { color: '#FFB366', count: 3, speed: 210, r: 6, tail: 6, tailGap: 12 }); ctx.flowA.stop().show(false);
    ctx.flowB = ctx.flow(ctx.pathB, { color: '#FFB366', count: 2, speed: 170, r: 6, tail: 6, tailGap: 12 }); ctx.flowB.stop().show(false);
    /* bracket: one product, two parts */
    const br = mk('g', { 'data-step': 2, 'data-delay': 500 });
    mk('path', { d: 'M620 292 V274 H1824 V292', fill: 'none', stroke: '#FF8300', 'stroke-width': 2.5, 'stroke-linejoin': 'round', opacity: .9 }, br);
    mk('rect', { x: 1060, y: 252, width: 324, height: 44, rx: 22, fill: '#0B0B0C' }, br);
    mk('text', { x: 1222, y: 281, 'text-anchor': 'middle', text: 'ONE PRODUCT · TWO PARTS', style: 'font:800 20px var(--font);letter-spacing:.14em;fill:#FFB366' }, br);
    /* ---- the 2025 ribbon (own svg, proportional in days since 1 May 2025) */
    const AX = 880, X0 = 110, X1 = 1810, DAYS = 244, px = (d) => X0 + d / DAYS * (X1 - X0);
    const rg = Fx.el('g', { class: 'bf-rib' }, rs); ctx.rib = rg;
    ctx.ribBase = Fx.el('rect', { class: 'rn-axis', x: X0, y: AX - 3, width: X1 - X0, height: 6, rx: 3, fill: 'rgba(255,255,255,.16)' }, rg);
    ctx.ribFill = Fx.el('rect', { class: 'rn-axis', x: X0, y: AX - 3, width: 0, height: 6, rx: 3, fill: 'url(#g-orange)', filter: 'url(#fx-glow-u)' }, rg);
    [['May', 0], ['Jun', 31], ['Jul', 61], ['Aug', 92], ['Sep', 123], ['Oct', 153], ['Nov', 184], ['Dec', 214]].forEach(([m, d]) => {
      Fx.el('line', { x1: px(d), y1: AX - 12, x2: px(d), y2: AX + 12, stroke: 'rgba(255,255,255,.3)', 'stroke-width': 2 }, rg);
      Fx.el('text', { class: 'rn-mon', x: px(d) + 8, y: AX + 36, text: m }, rg);
    });
    Fx.el('line', { x1: X1, y1: AX - 12, x2: X1, y2: AX + 12, stroke: 'rgba(255,255,255,.3)', 'stroke-width': 2 }, rg);
    Fx.el('text', { class: 'rn-mon', x: X0, y: AX - 112, text: '2025', style: 'display:none' }, rg);
    const RIB = [
      { d: 0, date: '1 May 2025', cap: 'First production reading', side: 'up', stat: true, col: '#FFFFFF' },
      { d: 24, date: '25 May 2025', cap: 'Backend born', side: 'down', col: '#FF8300' },
      { d: 41, date: '11 Jun 2025', cap: 'Portal module born', side: 'up', col: '#FF8300' },
      { d: 102, date: '11 Aug 2025', cap: 'stable-1.1.0', side: 'down', col: '#FF8300' },
      { d: 196, date: '13 Nov 2025', cap: '.NET 10', side: 'up', col: '#FF8300' },
      { d: 235, date: '22 Dec 2025', cap: 'stable-1.5.0', sub: 'Mediator replaced by services', side: 'down', col: '#FF8300', end: true },
    ];
    ctx.nodes = RIB.map((n) => {
      const x = px(n.d), up = n.side === 'up', g = Fx.el('g', { class: 'rn-node' }, rg), anchor = n.end ? 'end' : 'start', tx = n.end ? x + 4 : x - 4;
      const dy = up ? -1 : 1;
      Fx.el('circle', { class: 'rn-ring', cx: x, cy: AX, r: 12, stroke: n.col }, g);
      Fx.el('line', { class: 'txt', x1: x, y1: AX + dy * 12, x2: x, y2: AX + dy * 34, stroke: n.col, 'stroke-width': 2, opacity: .7 }, g);
      Fx.el('circle', { class: 'dot', cx: x, cy: AX, r: 12, fill: n.stat ? '#fff' : n.col, stroke: '#0B0B0C', 'stroke-width': 3, filter: 'url(#fx-glow)' }, g);
      const t = Fx.el('g', { class: 'txt' }, g);
      const y0 = up ? AX - 64 : AX + 70;
      Fx.el('text', { class: 'rn-lab', x: tx, y: y0, 'text-anchor': anchor, text: n.date }, t);
      Fx.el('text', { class: 'rn-cap', x: tx, y: y0 + 28, 'text-anchor': anchor, text: n.cap }, t);
      if (n.sub) Fx.el('text', { class: 'rn-sub', x: tx, y: y0 + 54, 'text-anchor': anchor, text: n.sub }, t);
      if (n.stat) {
        Fx.el('rect', { x: tx + 205, y: y0 + 9, width: 62, height: 26, rx: 13, fill: 'none', stroke: '#fff', 'stroke-width': 1.6 }, t);
        Fx.el('text', { class: 'rn-tag', x: tx + 236, y: y0 + 27, 'text-anchor': 'middle', text: 'STAT' }, t);
        Fx.el('text', { class: 'rn-sub', x: tx, y: y0 - 26, 'text-anchor': anchor, text: 'Internal running-cost document, 10 Aug 2026', style: 'font-size:17px' }, t);
      }
      n.el = g; n.x = x; return n;
    });
    ctx.ribX0 = X0; ctx.ribX1 = X1; ctx.ribAX = AX;
    ctx.head = Fx.el('circle', { cx: X0, cy: AX, r: 9, fill: '#fff', filter: 'url(#fx-glow)', opacity: 0 }, rg);
    /* ---- the finale odometer (3 digits) */
    const host = ctx.q('.od-wrap'), cols = [];
    for (let k = 0; k < 3; k++) {
      const col = Fx.el('span', { class: 'od-col' }, host), strip = Fx.el('span', { class: 'od-strip' }, col);
      for (let n = 0; n < 40; n++) Fx.el('span', { class: 'od-c', text: String(n % 10) }, strip);
      cols.push({ col, strip, pos: 0 });
    }
    ctx.odo = {
      set(v, o) {
        o = o || {}; const s = String(Math.max(0, Math.round(v))).padStart(3, '0');
        cols.forEach((c, k) => {
          const d = +s[k]; let np;
          if (o.instant || ctx.calm) { np = d; c.strip.style.transition = 'none'; }
          else { np = c.pos + ((d - (c.pos % 10) + 10) % 10) + (o.spin && d > 0 ? 10 : 0); c.strip.style.transition = `transform ${(o.dur || 1800) + k * 250}ms cubic-bezier(.16,.8,.2,1)`; }
          c.pos = np; c.strip.style.transform = `translateY(${-np}em)`;
          c.col.classList.toggle('z', s.slice(0, k + 1).replace(/0/g, '') === '' && k < 2);
        });
      },
    };
    ctx.odo.set(0, { instant: true });
    /* ribbon: a light head runs along the axis and ignites each node in date order */
    ctx.ribT = 0;
    ctx.ribbon = (on, animate) => {
      const my = ++ctx.ribT;
      ctx.rib.style.display = on ? '' : 'none';
      if (!on) { ctx.nodes.forEach((n) => n.el.classList.remove('lit', 'pop')); ctx.ribFill.setAttribute('width', 0); ctx.head.setAttribute('opacity', 0); return; }
      if (!animate) { ctx.nodes.forEach((n) => { n.el.classList.add('lit'); n.el.classList.remove('pop'); }); ctx.ribFill.setAttribute('width', X1 - X0); ctx.head.setAttribute('opacity', 0); return; }
      ctx.nodes.forEach((n) => n.el.classList.remove('lit', 'pop')); ctx.ribFill.setAttribute('width', 0); ctx.head.setAttribute('opacity', 1); ctx.head.setAttribute('cx', X0);
      const T = 3600, t0 = performance.now() + 250;
      const stop = ctx.raf(() => {
        if (my !== ctx.ribT) { stop(); return; }
        const p = Math.min(1, Math.max(0, (performance.now() - t0) / T)), x = X0 + (X1 - X0) * p;
        ctx.head.setAttribute('cx', x); ctx.ribFill.setAttribute('width', x - X0);
        ctx.nodes.forEach((n) => { if (!n.el.classList.contains('lit') && x >= n.x - 2) { n.el.classList.add('lit', 'pop'); Fx.burstEl(n.el.querySelector('.dot'), { n: 14, color: n.col, speed: 220 }); } });
        if (p >= 1) { ctx.head.setAttribute('opacity', 0); stop(); }
      });
    };
  },
  enter(ctx) { ctx.mast.classList.remove('on'); },
  step(ctx, i, dir, instant) {
    const anim = !instant && dir > 0;
    /* mast: fades in on arrival */
    if (instant) ctx.mast.classList.add('on'); else ctx.after(i === 0 ? 200 : 0, () => ctx.mast.classList.add('on'));
    /* line A and backend (step 1), line B and page (step 2) */
    const a = i >= 1, b = i >= 2;
    ctx.pathA.classList.toggle('on', a); ctx.pathB.classList.toggle('on', b);
    if (anim && i === 1) { Fx.draw(ctx.pathA, 1000, 100); ctx.after(900, () => Fx.burstEl(ctx.q('.bf-be'), { n: 24, color: '#FF8300', speed: 330 })); }
    if (anim && i === 2) { Fx.draw(ctx.pathB, 800, 100); ctx.after(800, () => { Fx.sweep(ctx.q('.bf-page')); Fx.burstEl(ctx.q('.bf-page'), { n: 30, color: '#FFB366', speed: 380 }); }); }
    ctx.flowA.show(a); if (a) ctx.flowA.start(); else ctx.flowA.stop();
    ctx.flowB.show(b); if (b) ctx.flowB.start(); else ctx.flowB.stop();
    const page = ctx.q('.bf-page');
    if (b && anim) ctx.after(700, () => page.classList.add('lit')); else page.classList.toggle('lit', b);
    /* ribbon (step 3) */
    ctx.ribbon(i >= 3, anim && i === 3);
    /* finale (step 4) */
    if (i >= 4) { if (anim) ctx.after(900, () => ctx.odo.set(276, { dur: 2200, spin: true })); else ctx.odo.set(276, { instant: true }); }
    else ctx.odo.set(0, { instant: true });
  },
  static(ctx) {
    ctx.mast.classList.add('on'); ctx.pathA.classList.add('on'); ctx.pathB.classList.add('on'); ctx.q('.bf-page').classList.add('lit');
    ctx.flowA.show(true).freeze(); ctx.flowB.show(true).freeze(); ctx.ribbon(true, false); ctx.odo.set(276, { instant: true });
  },
});
