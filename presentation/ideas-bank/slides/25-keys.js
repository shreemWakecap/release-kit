/* Slide 22: the join keys that already exist. A matrix of keys (rows) by services (columns). Glowing threads link the cells that share a key.
   At the end the threads gather into one bright ring: the join, which is vision. Facts: research C5 section 8.1 (join keys) and C6 sections 5.2 and 6.1. */
Deck.add({
  id: 'keys', section: 'bank', title: 'The join keys that already exist', kicker: 'The data bank · Join keys', reality: ['code', 'vision'],
  steps: 5, ambient: { orb: 1.05, beam: .5, dust: 1 }, dur: [4200, 5600, 5600, 5200, 6200, 7500], minutes: 1.4,
  notes: 'This is a map of keys. Down the side: the keys that identify a thing. Across the top: the services that store data today.\nA glowing dot means the service holds that key. A half dot means partly. A dash means it does not.\nStep 1: project id and time. Every service holds both. But project id is a plain column. No foreign key joins the databases.\nStep 2: space, zone and device. The platform services hold them. The weather and Connected Environment readings carry no zone, and gas devices have no platform id since the mapping was removed.\nStep 3: workers. Location, the app service and the Observation Manager know who a worker is. The Connected Environment database holds no worker.\nStep 4: permits and equipment. A permit carries project, company, area and workshift. Equipment is only free text on a permit, and a plate number in the Observation Manager. The thread is dashed because no id links them. The equipments column comes from platform documents, not from code.\nStep 5: the threads gather into one ring. That ring is the join. The keys exist. The join does not. It is vision, nobody has built it.',
  html: `
    <h2 class="h2 ky-h" data-step="0">The join keys that <span class="o glow-text">already exist.</span></h2>
    <p class="lead ky-lead" data-step="0" data-step-out="5" data-delay="200">Which service holds which key. A glowing thread joins the services that share one.</p>
    <svg class="ky-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <div class="ky-cap" data-step="1" data-step-out="2"><b>Project id and time are everywhere.</b> But project id is a plain column: no foreign key joins the databases.</div>
    <div class="ky-cap" data-step="2" data-step-out="3"><b>Space, zone and device</b> sit in the platform services. Readings carry no zone, and gas has no platform device id.</div>
    <div class="ky-cap" data-step="3" data-step-out="4"><b>Workers</b> are keyed in location, app-api and the Observation Manager. The Connected Environment database holds none.</div>
    <div class="ky-cap" data-step="4" data-step-out="5"><b>Permits and equipment share no id.</b> A permit carries project, company, area and workshift. Equipment is free text there, and a plate number in the Observation Manager.</div>
    <div class="ky-mid" data-step="5" data-delay="1200" data-fx="pop"><b>THE JOIN</b><span class="rb rb-vision sm">Vision</span></div>
    <div class="ky-final" data-step="5" data-delay="1500"><span class="ky-final-a">The keys exist. <span class="shine">The join does not.</span></span><span class="ky-final-b">No foreign key joins these services today. Nobody has built it.</span></div>`,
  css: `
    .s-keys .ky-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-keys .ky-lead{position:absolute;left:96px;top:186px;width:1500px;font-size:27px}
    .s-keys .ky-svg{position:absolute;left:0;top:0;overflow:visible}
    .s-keys .ky-cap{position:absolute;left:96px;top:826px;width:1728px;font:500 29px/1.4 var(--font);color:#D9D9D4}
    .s-keys .ky-cap b{color:#fff;font-weight:800}
    .s-keys .ky-mid{position:absolute;left:810px;top:508px;width:300px;text-align:center}
    .s-keys .ky-mid b{display:block;font:900 36px/1 var(--font);letter-spacing:.3em;margin-right:-.3em;color:#fff;text-shadow:0 0 24px rgba(255,131,0,.7)}
    .s-keys .ky-mid .rb{margin-top:16px;background:rgba(10,10,12,.7)}
    .s-keys .ky-final{position:absolute;left:0;top:822px;width:1920px;text-align:center}
    .s-keys .ky-final-a{display:block;font:900 62px/1.05 var(--font);letter-spacing:-.03em;color:#fff}
    .s-keys .ky-final-b{display:block;margin-top:16px;font:500 28px/1.3 var(--font);color:var(--mut)}
    .s-keys .grid{transition:opacity 1.2s var(--ease)}
    .s-keys .ky-svg.ring .grid{opacity:.07}
    .s-keys .trk{fill:rgba(255,255,255,.028);stroke:rgba(255,255,255,.07);stroke-width:1}
    .s-keys .trk.ce{stroke:rgba(255,131,0,.5);fill:rgba(255,131,0,.05)}
    .s-keys .sep{stroke:rgba(255,255,255,.075);stroke-width:1.5}
    .s-keys .ch-n{font:800 20px var(--font);fill:#fff;text-anchor:middle}
    .s-keys .ch-r{font:500 18px var(--font);fill:#A9A9A4;text-anchor:middle}
    .s-keys .rl{font:800 22px var(--mono)}
    .s-keys .pill{fill:rgba(10,10,12,.92);stroke-width:2;transition:fill .6s,stroke .6s}
    .s-keys .row .rl{fill:#E8E8E4}
    .s-keys .row.core .rl{fill:#2BD576}
    .s-keys .row.core .pill{stroke:rgba(43,213,118,.7)}
    .s-keys .row:not(.core) .pill{stroke:rgba(255,255,255,.4)}
    .s-keys .row.cur .pill{fill:rgba(255,131,0,.16);stroke:#FF8300;filter:url(#fx-glow-soft)}
    .s-keys .row.cur .rl{fill:#fff}
    .s-keys .cell .glyph{opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.3);transition:opacity .5s var(--ease),transform .7s cubic-bezier(.2,1.4,.3,1)}
    .s-keys .cell.on .glyph{opacity:1;transform:none}
    .s-keys .slot{fill:rgba(255,255,255,.16)}
    .s-keys .dot{fill:#FFC48A;filter:url(#fx-glow)}
    .s-keys .halo{fill:none;stroke:rgba(255,131,0,.55);stroke-width:1.6}
    .s-keys .half{fill:#FFB366}
    .s-keys .pring{fill:none;stroke:#FFB366;stroke-width:2.6}
    .s-keys .none{stroke:rgba(255,255,255,.26);stroke-width:2.6;stroke-linecap:round}
    .s-keys .unk{font:800 22px var(--font);fill:rgba(255,255,255,.4);text-anchor:middle}
    .s-keys .row.past .dot{filter:none;fill:#D99A5B}
    .s-keys .row.past .halo{stroke:rgba(255,131,0,.28)}
    .s-keys .thread{fill:none;stroke:#FF8300;stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round;filter:url(#fx-glow-u);opacity:0}
    .s-keys .thread.dashed{stroke:#FFB366;stroke-width:2.6;stroke-dasharray:2 10}
    .s-keys .lg{font:500 20px var(--font);fill:#A9A9A4}
    .s-keys .srcl{font:500 17px var(--font);fill:#74746F;text-anchor:end}
    .s-keys .rglow{opacity:0;transition:opacity 1.6s var(--ease) .6s}
    .s-keys .ky-svg.ring .rglow{opacity:.55}
    .s-keys .rlab{opacity:0;transition:opacity .8s var(--ease)}
    .s-keys .ky-svg.ring .rlab{opacity:1}
    .s-keys .rim{fill:none;stroke:rgba(255,255,255,.1);stroke-width:1.5;opacity:0;transition:opacity 1s .9s}
    .s-keys .ky-svg.ring .rim{opacity:1}
    .s-keys .hdr{opacity:1}
    .s-keys.arrive .hdr{animation:kyIn .9s var(--ease) both;animation-delay:calc(var(--i) * 70ms + 250ms)}
    @keyframes kyIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`,
  init(ctx) {
    const svg = ctx.q('.ky-svg'), mk = Fx.el, SV = 'http://www.w3.org/2000/svg';
    const X0 = 430, CW = 226, Y0 = 352, RH = 68, TOP = 232;
    const colX = (c) => X0 + CW * c + CW / 2, rowY = (r) => Y0 + RH * r;
    /* services across the top (research C5 section 2 and C6 section 4) */
    const SVC = [
      ['sensors-service', 'weather readings'], ['CE backend', 'three products'], ['location-service', 'worker positions'],
      ['app-api', 'people, zones, permits'], ['Observation Manager', 'events'], ['equipments', 'fleet, GPS (docs)'],
    ];
    /* keys down the side. cells: h holds, p partly, n does not, ? not read in code. step = when it lights (research C5 8.1, C6 5.2 and 6.1) */
    const KEYS = [
      { k: 'project id', core: 1, cells: 'hhhhhh', step: 1 },
      { k: 'time', core: 1, cells: 'hhhhhh', step: 1 },
      { k: 'space or zone', core: 1, cells: 'nnhhhp', step: 2 },
      { k: 'device or serial', core: 1, cells: 'hphhhh', step: 2 },
      { k: 'worker', core: 0, cells: 'nnhhh?', step: 3 },
      { k: 'permit', core: 0, cells: 'nnnhh?', step: 4, dashed: 1 },
      { k: 'equipment', core: 0, cells: 'nnnphh', step: 4, dashed: 1 },
    ];
    const bottom = rowY(KEYS.length - 1) + RH / 2;
    const grid = mk('g', { class: 'grid' }, svg), thg = mk('g', { class: 'threads' }, svg), rg = mk('g', { class: 'ring-ui' }, svg);
    /* column tracks and headers */
    SVC.forEach(([n, r], c) => {
      mk('rect', { class: 'trk' + (c === 1 ? ' ce' : ''), x: X0 + CW * c + 7, y: TOP, width: CW - 14, height: bottom - TOP + 8, rx: 20 }, grid);
      const h = mk('g', { class: 'hdr', style: '--i:' + c }, grid);
      mk('text', { class: 'ch-n', x: colX(c), y: TOP + 40, text: n }, h);
      mk('text', { class: 'ch-r', x: colX(c), y: TOP + 66, text: r }, h);
    });
    for (let r = 1; r < KEYS.length; r++) mk('line', { class: 'sep', x1: 96, y1: rowY(r) - RH / 2, x2: X0 + CW * SVC.length - 8, y2: rowY(r) - RH / 2 }, grid);
    /* glyphs */
    const glyph = (s, x, y, p) => {
      const g = mk('g', { class: 'glyph' }, p);
      if (s === 'h') { mk('circle', { class: 'halo', cx: x, cy: y, r: 15 }, g); mk('circle', { class: 'dot', cx: x, cy: y, r: 8.5 }, g); }
      else if (s === 'p') { mk('circle', { class: 'pring', cx: x, cy: y, r: 13 }, g); mk('path', { class: 'half', d: `M${x} ${y - 8} A8 8 0 0 0 ${x} ${y + 8} Z` }, g); }
      else if (s === 'n') mk('line', { class: 'none', x1: x - 9, y1: y, x2: x + 9, y2: y }, g);
      else mk('text', { class: 'unk', x, y: y + 8, text: '?' }, g);
      return g;
    };
    const pw = (s) => Math.round(s.length * 13.3 + 40);
    ctx.rows = KEYS.map((K, r) => {
      const y = rowY(r), el = mk('g', { class: 'row' + (K.core ? ' core' : '') }, grid), w = pw(K.k);
      mk('rect', { class: 'pill', x: 96, y: y - 21, width: w, height: 42, rx: 21 }, el);
      mk('text', { class: 'rl', x: 116, y: y + 8, text: K.k }, el);
      const cells = K.cells.split('').map((s, c) => {
        const ce = mk('g', { class: 'cell' }, el);
        mk('circle', { class: 'slot', cx: colX(c), cy: y, r: 3 }, ce);
        glyph(s, colX(c), y, ce);
        return ce;
      });
      /* thread through the cells that hold the key; it hops over the cells that do not */
      const held = []; K.cells.split('').forEach((s, c) => { if (s === 'h' || s === 'p') held.push(c); });
      let d = `M${colX(held[0])} ${y}`;
      for (let j = 1; j < held.length; j++) { const a = colX(held[j - 1]), b = colX(held[j]); d += held[j] === held[j - 1] + 1 ? ` L${b} ${y}` : ` Q${(a + b) / 2} ${y - 34} ${b} ${y}`; }
      const path = mk('path', { class: 'thread' + (K.dashed ? ' dashed' : ''), d }, thg);
      const flow = ctx.flow(path, { color: '#FFE2C2', count: K.dashed ? 1 : 2, speed: 170, r: 5, tail: 5, tailGap: 11 });
      flow.stop().show(false);
      return { K, el, cells, path, flow, dOrig: d, step: K.step, shown: false };
    });
    /* steps that carry two rows: the second one waits a little */
    const seen = {}; ctx.rows.forEach((row) => { row.lag = (seen[row.step] || 0) * 750; seen[row.step] = (seen[row.step] || 0) + 1; });
    /* legend and source */
    const lg = mk('g', { class: 'legend' }, svg), LY = 984;
    let lx = 96;
    const item = (s, t, wText) => { glyph(s, lx + 12, LY - 7, lg).setAttribute('class', 'glyph'); lg.lastChild.style.opacity = 1; lg.lastChild.style.transform = 'none'; mk('text', { class: 'lg', x: lx + 34, y: LY, text: t }, lg); lx += 34 + wText + 30; };
    item('h', 'holds the key', 138); item('p', 'partly', 62); item('n', 'does not', 86); item('?', 'not read in code', 166);
    mk('line', { x1: lx, y1: LY - 7, x2: lx + 26, y2: LY - 7, stroke: '#FFB366', 'stroke-width': 2.6, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' }, lg);
    mk('text', { class: 'lg', x: lx + 38, y: LY, text: 'no shared id' }, lg);
    mk('text', { class: 'srcl', x: 1824, y: LY, text: 'Code on master, read 5 Oct 2026, deploy not verified. Equipments: internal docs, Jul 2026.' }, svg);
    /* the ring: threads gather into it (target points) */
    const RC = { x: 960, y: 548, r: 172 }, NP = 72, STEP = Math.PI * 2 / KEYS.length, GAP = 0.085;
    ctx.RC = RC;
    ctx.rows.forEach((row, k) => {
      const len = row.path.getTotalLength(); row.len = len;
      row.pts = Array.from({ length: NP + 1 }, (_, j) => { const p = row.path.getPointAtLength(len * j / NP); return [p.x, p.y]; });
      const a0 = -Math.PI / 2 + k * STEP + GAP / 2, a1 = -Math.PI / 2 + (k + 1) * STEP - GAP / 2;
      row.tgt = Array.from({ length: NP + 1 }, (_, j) => { const a = a0 + (a1 - a0) * j / NP; return [RC.x + RC.r * Math.cos(a), RC.y + RC.r * Math.sin(a)]; });
      row.mid = (a0 + a1) / 2;
    });
    /* ring furniture: glow, rim, labels */
    mk('circle', { class: 'rglow', cx: RC.x, cy: RC.y, r: 300, fill: 'url(#g-core)' }, rg);
    mk('circle', { class: 'rim', cx: RC.x, cy: RC.y, r: RC.r - 26 }, rg);
    mk('circle', { class: 'rim', cx: RC.x, cy: RC.y, r: RC.r + 26 }, rg);
    ctx.rows.forEach((row, k) => {
      const t = row.K.k, w = pw(t), c = Math.cos(row.mid), s = Math.sin(row.mid), lx0 = RC.x + (RC.r + 64) * c, ly0 = RC.y + (RC.r + 64) * s;
      const x = c > .35 ? lx0 - 14 : c < -.35 ? lx0 - w + 14 : lx0 - w / 2;
      const g = mk('g', { class: 'rlab row' + (row.K.core ? ' core' : ''), style: `transition-delay:${900 + k * 90}ms` }, rg);
      mk('rect', { class: 'pill', x, y: ly0 - 21, width: w, height: 42, rx: 21 }, g);
      mk('text', { class: 'rl', x: x + 20, y: ly0 + 8, text: t }, g);
    });
    const ringPath = mk('path', { d: `M${RC.x + RC.r} ${RC.y} A${RC.r} ${RC.r} 0 1 1 ${RC.x - RC.r} ${RC.y} A${RC.r} ${RC.r} 0 1 1 ${RC.x + RC.r} ${RC.y}`, fill: 'none', stroke: 'none' }, rg);
    ctx.ringFlow = ctx.flow(ringPath, { color: '#FFFFFF', count: 3, speed: 210, r: 5, tail: 6, tailGap: 13 }); ctx.ringFlow.stop().show(false);
    /* morph: m = 0 rows, m = 1 ring */
    ctx.m = 0; ctx.mt = 0; ctx.morphed = false;
    ctx.apply = (m) => {
      const on = m > .0005;
      ctx.rows.forEach((row, k) => {
        const p = row.path;
        if (!on) { if (row.morphed) { row.morphed = false; p.setAttribute('d', row.dOrig); p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; p.style.strokeWidth = ''; } return; }
        if (!row.morphed) { row.morphed = true; p.style.transition = 'none'; p.style.strokeDasharray = 'none'; p.style.strokeDashoffset = '0'; p.style.opacity = 1; row.shown = true; }
        const e = Fx.ease.inOutCubic(Math.min(1, Math.max(0, m * 1.3 - k * 0.04)));
        p.style.strokeWidth = (3.4 + 2.6 * e) + 'px';
        p.setAttribute('d', 'M' + row.pts.map((a, j) => (a[0] + (row.tgt[j][0] - a[0]) * e).toFixed(1) + ' ' + (a[1] + (row.tgt[j][1] - a[1]) * e).toFixed(1)).join(' L'));
      });
    };
  },
  enter(ctx) {
    const r = ctx.root; r.classList.remove('arrive'); void r.offsetWidth; if (!ctx.calm) r.classList.add('arrive');
    ctx.raf((dt) => { if (Math.abs(ctx.mt - ctx.m) > .0005) { ctx.m += Math.sign(ctx.mt - ctx.m) * Math.min(Math.abs(ctx.mt - ctx.m), dt / 1.7); ctx.apply(ctx.m); } });
  },
  step(ctx, i, dir, instant) {
    const quick = instant || ctx.calm, svg = ctx.q('.ky-svg');
    ctx.rows.forEach((row) => {
      const on = i >= row.step, cur = on && (i === row.step || i >= 5);
      row.el.classList.toggle('cur', cur); row.el.classList.toggle('past', on && !cur);
      row.cells.forEach((c, ci) => {
        if (!on) { c.classList.remove('on'); return; }
        if (quick) c.classList.add('on'); else ctx.after(250 + row.lag + ci * 110, () => { if (ctx.step >= row.step) c.classList.add('on'); });
      });
      const p = row.path;
      if (on && !row.shown) {
        row.shown = true; p.style.opacity = 1;
        if (quick) { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; }
        else if (!row.K.dashed) Fx.draw(p, 1100, row.lag + 350);
        else { p.style.transition = 'none'; p.style.opacity = 0; void p.getBoundingClientRect(); p.style.transition = 'opacity .9s ' + (row.lag + 450) + 'ms'; p.style.opacity = 1; }
        const go = () => { if (ctx.step >= row.step && i < 5 && ctx.step < 5) { row.flow.show(true); row.flow.start(); } };
        if (quick) go(); else ctx.after(row.lag + 1500, go);
      } else if (!on && row.shown) {
        row.shown = false; p.style.transition = 'none'; p.style.opacity = 0; p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; row.flow.stop().show(false);
      } else if (on && i >= 5) { row.flow.stop().show(false); } else if (on && row.shown && i < 5) { row.flow.show(true); row.flow.start(); }
    });
    const ring = i >= 5; svg.classList.toggle('ring', ring); ctx.mt = ring ? 1 : 0;
    if (quick) { ctx.m = ctx.mt; ctx.apply(ctx.m); }
    if (ring) { const go = () => { if (ctx.step >= 5) { ctx.ringFlow.show(true); ctx.ringFlow.start(); } }; if (quick) go(); else ctx.after(1900, go); if (!quick) ctx.after(1700, () => { if (ctx.step >= 5) Fx.burstEl(ctx.q('.ky-mid'), { n: 40, speed: 460 }); }); }
    else ctx.ringFlow.stop().show(false);
  },
  static(ctx) { ctx.m = ctx.mt = 1; ctx.apply(1); ctx.q('.ky-svg').classList.add('ring'); ctx.rows.forEach((row) => row.flow.stop().show(false)); ctx.ringFlow.show(true).freeze(); },
});
