/* Slide 10: See it coming. One day timeline: Now, a forecast, windows, a plan, a person approves.
   Vision: nobody built it. Very few words on purpose (user asked for easy words, fewer words). The picture tells the story. */
Deck.add({
  id: 'predict', reality: ['vision'], short: true,
  steps: 4, ambient: { orb: 1, beam: .5, dust: .9 }, dur: [3600, 4800, 4400, 4600, 6500], minutes: .7,
  notes: 'Now: the product shows the heat index and the work, rest and water rule.\nForecast: a picture of the heat for the day. It is a vision.\nSafe hours: the day splits into safe, caution and stop hours.\nPlan: work goes into the safe hours. This is only a suggestion.\nApprove: a person always approves.\nNothing here is built yet.\nIf asked: no forecast or trend code exists today (research C5). Verdicts are stored as episodes since 20 Sep 2026.',
  html: `
    <h2 class="h2 pd-h" data-step="0">Plan the day <span class="o glow-text">early</span></h2>
    <svg class="pd-svg" viewBox="0 0 1920 1080" width="1920" height="1080" role="img" aria-label="A day timeline. Now, a heat forecast, safe hours, a plan of work blocks, and a person who approves."></svg>
    <div class="pd-act" data-step="4">
      <svg class="pd-av" viewBox="-40 -40 80 80" width="80" height="80" aria-hidden="true"><circle r="38"/><circle class="h" cx="0" cy="-9" r="12"/><path d="M-22 22 C-22 3 22 3 22 22"/></svg>
      <div class="pd-ok sweepable"><svg class="pd-ck" viewBox="0 0 40 40" aria-hidden="true"><path d="M8 21 L17 30 L33 11"/></svg><span>Approve</span></div>
    </div>
    <svg class="pd-svg2" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <div class="pd-vis">Vision. Not built yet.</div>`,
  css: `
    .s-predict .pd-h{position:absolute;left:96px;top:104px;width:1400px;font-size:92px;line-height:1.04}
    .s-predict .pd-svg,.s-predict .pd-svg2{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-predict .lb{font:800 38px/1 var(--font)}
    .s-predict .pd-axis{stroke:rgba(255,255,255,.3);stroke-width:2.5;stroke-linecap:round}
    .s-predict .pd-tk line{stroke:rgba(255,255,255,.2);stroke-width:2}
    .s-predict .pd-rip{fill:none;stroke:#FF8300;stroke-width:2.5;transform-box:fill-box;transform-origin:center;opacity:0;animation:pdRip 3.4s var(--ease) infinite}
    .s-predict .pd-rip.b{animation-delay:1.7s}
    @keyframes pdRip{0%{transform:scale(.8);opacity:.85}100%{transform:scale(3.2);opacity:0}}
    body.calm .s-predict .pd-rip{animation:none}
    .s-predict.pd-snap *,.s-predict.no-trans *{transition:none!important}
    .s-predict.no-trans .pd-ok.done,body.print .s-predict .pd-ok.done,body.calm .s-predict .pd-ok.done{animation:none!important}
    body.print .s-predict .pd-rip{display:none}
    /* blocks: suggested (dashed) until a person approves, then solid */
    .s-predict .pd-bs{fill:rgba(255,255,255,.07);stroke:#FFC48A;stroke-width:2.5;stroke-dasharray:10 8;transition:opacity .5s}
    .s-predict .pd-bo{opacity:0;stroke:#FFE2C2;stroke-width:2;transition:opacity .6s}
    .s-predict .pd-bh{fill:rgba(255,255,255,.6);opacity:0;transition:opacity .6s}
    .s-predict.appr .pd-bs{opacity:0}
    .s-predict.appr .pd-bo{opacity:1;filter:drop-shadow(0 0 14px rgba(255,131,0,.7))}
    .s-predict.appr .pd-bh{opacity:1}
    /* approve: a person presses, the button is stamped */
    .s-predict .pd-act{position:absolute;left:1382px;top:848px;width:442px;height:88px;display:flex;align-items:center;gap:22px}
    .s-predict .pd-av{flex:none;width:80px;height:80px;overflow:visible}
    .s-predict .pd-av circle{fill:rgba(255,255,255,.06);stroke:rgba(255,255,255,.5);stroke-width:2.5}
    .s-predict .pd-av circle.h{fill:rgba(255,255,255,.92);stroke:none}
    .s-predict .pd-av path{fill:none;stroke:rgba(255,255,255,.92);stroke-width:4.5;stroke-linecap:round}
    .s-predict .pd-ok{position:relative;flex:1;height:88px;border-radius:44px;display:flex;align-items:center;justify-content:center;font:800 38px/1 var(--font);color:#FFB366;border:2px solid rgba(255,131,0,.8);background:rgba(255,131,0,.08);box-shadow:0 0 40px rgba(255,131,0,.28);transition:background .5s,color .5s,box-shadow .5s,border-color .5s,transform .14s}
    .s-predict .pd-ok.press{transform:scale(.95)}
    .s-predict .pd-ok.done{background:linear-gradient(95deg,#FF8300,#FFB366);color:#1A0C00;border-color:#FFD2A3;box-shadow:0 0 70px rgba(255,131,0,.7);animation:pdStamp .55s var(--ease)}
    @keyframes pdStamp{0%{transform:scale(1.28)}45%{transform:scale(.95)}72%{transform:scale(1.04)}100%{transform:scale(1)}}
    .s-predict .pd-ck{flex:none;width:0;height:40px;opacity:0;margin-right:0;transition:width .4s var(--ease),margin .4s var(--ease),opacity .3s}
    .s-predict .pd-ok.done .pd-ck{width:40px;margin-right:14px;opacity:1}
    .s-predict .pd-ck path{fill:none;stroke:#1A0C00;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:44;stroke-dashoffset:44;transition:stroke-dashoffset .5s var(--ease) .15s}
    .s-predict .pd-ok.done .pd-ck path{stroke-dashoffset:0}
    .s-predict .pd-cur{opacity:0;transform:translate(1432px,900px);transition:transform .95s var(--ease),opacity .4s;filter:drop-shadow(0 0 8px rgba(255,255,255,.55))}
    .s-predict.curin .pd-cur{opacity:1;transform:translate(1776px,908px)}
    .s-predict.curin.tap .pd-cur{transform:translate(1776px,908px) scale(.84);transition:transform .14s}
    .s-predict.curin.gone .pd-cur{opacity:0;transition:opacity .6s}
    .s-predict .pd-vis{position:absolute;left:96px;top:904px;padding:10px 22px;border:1.5px dashed rgba(197,139,255,.85);border-radius:999px;color:#C58BFF;font:700 24px/1 var(--font);letter-spacing:.02em;opacity:0;transform:translateY(12px);transition:opacity .8s var(--ease),transform .8s var(--ease)}
    .s-predict.showvis .pd-vis{opacity:1;transform:none}`,
  init(ctx) {
    const svg = ctx.q('.pd-svg'), svg2 = ctx.q('.pd-svg2'), mk = Fx.el, clamp = Fx.clamp, ez = Fx.ease.inOutSine;
    const X0 = 230, X1 = 1824, AX0 = 96, BY = 752, TOP = 322;
    const OKC = '#22C55E', CKC = '#F5A524', DGC = '#FF4D4D';
    ctx.pill = ctx.q('.pd-ok');
    /* the heat curve over the day: an illustration, no numbers */
    const pts = [[230, 568], [424, 556], [652, 520], [877, 456], [1074, 410], [1238, 394], [1411, 420], [1595, 492], [1745, 556], [1824, 592]];
    let curveD = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      curveD += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]} ${p2[1]}`;
    }
    /* defs */
    const defs = mk('defs', {}, svg);
    const lg = (id, x1, y1, x2, y2, stops, user) => { const g = mk('linearGradient', Object.assign({ id, x1, y1, x2, y2 }, user ? { gradientUnits: 'userSpaceOnUse' } : {}), defs); stops.forEach(([o, c, a]) => mk('stop', { offset: o, 'stop-color': c, 'stop-opacity': a == null ? 1 : a }, g)); return g; };
    [['ok', OKC], ['ck', CKC], ['dg', DGC]].forEach(([k, c]) => lg('pd-g-' + k, 0, 0, 0, 1, [[0, c, .06], [1, c, .4]]));
    lg('pd-area', 0, 0, 0, 1, [[0, '#FF8300', .38], [1, '#FF8300', .02]]);
    lg('pd-fade', 0, 0, 1, 0, [[0, '#fff', 1], [1, '#fff', 0]]);
    const hz = document.createElementNS(Fx.NS, 'pattern'); defs.appendChild(hz);
    Object.entries({ id: 'pd-hz', width: 24, height: 24, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }).forEach(([k, v]) => hz.setAttribute(k, v));
    mk('rect', { width: 7, height: 24, fill: 'rgba(255,77,77,.13)' }, hz);
    lg('pd-bf', 0, 0, 0, 1, [[0, '#FFB366'], [1, '#E9590C']]);
    lg('pd-scan', 0, 0, 0, 1, [[0, '#FFD2A3', 0], [.5, '#FFF1E0', 1], [1, '#FFD2A3', 0]]);
    const rg = mk('radialGradient', { id: 'pd-hill', cx: .5, cy: .5, r: .5 }, defs);
    mk('stop', { offset: 0, 'stop-color': '#FF8300', 'stop-opacity': .2 }, rg); mk('stop', { offset: 1, 'stop-color': '#FF8300', 'stop-opacity': 0 }, rg);
    /* the orange area follows the glowing head with a soft edge (a mask: a solid part and a fading part) */
    const mA = mk('mask', { id: 'pd-mask-area', maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: 1920, height: 1080 }, defs);
    ctx.mAs = mk('rect', { x: 0, y: 0, width: 0, height: 1080, fill: '#fff' }, mA);
    ctx.mAf = mk('rect', { x: 0, y: 0, width: 0, height: 1080, fill: 'url(#pd-fade)' }, mA);
    ctx.clipW = mk('rect', { x: 0, y: 0, width: 0, height: 1080 }, mk('clipPath', { id: 'pd-clip-wipe' }, defs));
    /* measure the curve: where it crosses the two limits, so the windows follow the heat */
    const probe = mk('path', { d: curveD, fill: 'none' }, svg), L = probe.getTotalLength(), samp = [];
    for (let s = 0; s <= L; s += 2) samp.push(probe.getPointAtLength(s));
    probe.remove();
    const cross = (yy, up) => { for (let i = 1; i < samp.length; i++) { const a = samp[i - 1], b = samp[i]; if (up ? (a.y > yy && b.y <= yy) : (a.y < yy && b.y >= yy)) return a.x + (b.x - a.x) * (yy - a.y) / (b.y - a.y); } return up ? X1 : X0; };
    const C1 = cross(508, true), S1 = cross(448, true), S2 = cross(448, false), C2 = cross(508, false);
    const peak = samp.reduce((m, p) => (p.y < m.y ? p : m));
    const wins = [[X0, C1, 'ok', OKC], [C1, S1, 'ck', CKC], [S1, S2, 'dg', DGC], [S2, C2, 'ck', CKC], [C2, X1, 'ok', OKC]];
    const zg = lg('pd-zg', 0, 0, 1, 0, [], true); zg.setAttribute('x1', X0); zg.setAttribute('x2', X1);
    wins.forEach(([a, b, , c]) => { const o0 = (a - X0) / (X1 - X0), o1 = (b - X0) / (X1 - X0); mk('stop', { offset: o0, 'stop-color': c }, zg); mk('stop', { offset: o1, 'stop-color': c }, zg); });
    /* soft heat glow behind the hill */
    ctx.hill = mk('ellipse', { cx: 1220, cy: 600, rx: 800, ry: 310, fill: 'url(#pd-hill)', opacity: 0 }, svg);
    /* the shaded windows: columns, revealed by a light that sweeps across the day */
    ctx.cols = mk('g', { 'clip-path': 'url(#pd-clip-wipe)' }, svg);
    wins.forEach(([a, b, k, c]) => {
      mk('rect', { x: a + 2, y: TOP, width: b - a - 4, height: BY - TOP, fill: `url(#pd-g-${k})` }, ctx.cols);
      if (k === 'dg') mk('rect', { x: a + 2, y: TOP, width: b - a - 4, height: BY - TOP, fill: 'url(#pd-hz)' }, ctx.cols);
      mk('rect', { x: a + 2, y: TOP, width: b - a - 4, height: 4, fill: c, opacity: .95 }, ctx.cols);
      mk('rect', { x: a + 2, y: BY - 4, width: b - a - 4, height: 8, rx: 2, fill: c }, ctx.cols);
    });
    /* the day: a line with small ticks, no numbers */
    ctx.axis = mk('line', { class: 'pd-axis', x1: AX0, y1: BY, x2: X1, y2: BY }, svg);
    ctx.ticks = mk('g', { class: 'pd-tk' }, svg);
    for (let x = AX0; x <= X1 + 1; x += 72) mk('line', { x1: x, y1: BY + 6, x2: x, y2: BY + 16 }, ctx.ticks);
    /* forecast curve: area, orange line, band-coloured line on top, glowing head */
    mk('path', { d: curveD + ` L${X1} ${BY} L${X0} ${BY} Z`, fill: 'url(#pd-area)', mask: 'url(#pd-mask-area)' }, svg);
    ctx.curve = mk('path', { d: curveD, fill: 'none', stroke: '#FF8300', 'stroke-width': 7, 'stroke-linecap': 'round', filter: 'url(#fx-glow-u)' }, svg);
    ctx.curveZ = mk('path', { d: curveD, fill: 'none', stroke: 'url(#pd-zg)', 'stroke-width': 7, 'stroke-linecap': 'round', 'clip-path': 'url(#pd-clip-wipe)', filter: 'url(#fx-glow-u)' }, svg);
    ctx.L = L;
    ctx.head = mk('g', {}, svg); ctx.tail = [];
    for (let j = 11; j >= 1; j--) ctx.tail.push({ back: j * 15, el: mk('circle', { r: 2.5 + (12 - j) * .62, fill: '#FFB366', opacity: (.65 * (1 - j / 12)).toFixed(2) }, ctx.head) });
    ctx.hd = mk('circle', { r: 11, fill: '#fff', filter: 'url(#fx-glow)' }, ctx.head);
    /* forecast label with a thin line down to the peak */
    ctx.fc = mk('g', { opacity: 0 }, svg);
    mk('line', { x1: peak.x, y1: 314, x2: peak.x, y2: peak.y - 18, stroke: 'rgba(255,179,102,.75)', 'stroke-width': 2.5, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' }, ctx.fc);
    mk('circle', { cx: peak.x, cy: peak.y, r: 9, fill: '#0B0B0C', stroke: '#fff', 'stroke-width': 3 }, ctx.fc);
    mk('text', { class: 'lb', x: peak.x, y: 298, 'text-anchor': 'middle', fill: '#FFB366', text: 'Forecast' }, ctx.fc);
    /* safe window label */
    ctx.sw = mk('text', { class: 'lb', x: (X0 + C1) / 2, y: 298, 'text-anchor': 'middle', fill: OKC, opacity: 0, text: 'Safe hours' }, svg);
    ctx.scan = mk('rect', { x: 0, y: TOP - 18, width: 4, height: BY - TOP + 30, fill: 'url(#pd-scan)', filter: 'url(#fx-glow-u)', opacity: 0 }, svg);
    /* Now: the one reading the product shows today */
    const now = mk('g', { 'data-step': 0, 'data-delay': 450 }, svg);
    mk('line', { x1: X0, y1: pts[0][1] + 30, x2: X0, y2: BY - 16, stroke: 'rgba(255,255,255,.4)', 'stroke-width': 2.5, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' }, now);
    mk('circle', { cx: X0, cy: BY, r: 10, fill: '#0B0B0C', stroke: '#FF8300', 'stroke-width': 3.5 }, now);
    mk('circle', { cx: X0, cy: pts[0][1], r: 70, fill: 'url(#g-core)', opacity: .5 }, now);
    mk('circle', { class: 'pd-rip', cx: X0, cy: pts[0][1], r: 26 }, now); mk('circle', { class: 'pd-rip b', cx: X0, cy: pts[0][1], r: 26 }, now);
    mk('circle', { cx: X0, cy: pts[0][1], r: 30, fill: 'none', stroke: 'rgba(255,131,0,.7)', 'stroke-width': 2 }, now);
    mk('circle', { cx: X0, cy: pts[0][1], r: 18, fill: '#FFB366', filter: 'url(#fx-glow)' }, now);
    mk('circle', { cx: X0, cy: pts[0][1], r: 8, fill: '#fff' }, now);
    mk('text', { class: 'lb', x: X0, y: BY + 80, 'text-anchor': 'middle', fill: '#fff', text: 'Now' }, now);
    /* work blocks that drop into the safe windows */
    const GAP = 26, place = (a, b, n) => { const w = Math.min(150, (b - a - (n + 1) * GAP) / n), tot = n * w + (n - 1) * GAP, x0 = a + (b - a - tot) / 2; return Array.from({ length: n }, (_, i) => [x0 + i * (w + GAP), w]); };
    const slots = place(X0 + 56, C1, 2).concat(place(C2, X1, 1));
    ctx.blocks = slots.map(([x, w], k) => {
      const g = mk('g', {}, svg), d = mk('g', { opacity: 0 }, g);
      const sug = mk('rect', { class: 'pd-bs', x, y: BY - 68, width: w, height: 64, rx: 14 }, d);
      mk('rect', { class: 'pd-bo', x, y: BY - 68, width: w, height: 64, rx: 14, fill: 'url(#pd-bf)' }, d);
      mk('rect', { class: 'pd-bh', x: x + 14, y: BY - 64, width: w - 28, height: 3, rx: 1.5 }, d);
      d.querySelectorAll('rect').forEach((r) => { r.style.transitionDelay = (k * .16) + 's'; });
      return { g, d, sug, landed: false };
    });
    /* one bracket under each group of blocks, one label */
    const bracket = (a, b) => mk('path', { d: `M${a} ${BY + 24} V${BY + 36} H${b} V${BY + 24}`, fill: 'none', stroke: 'rgba(255,255,255,.55)', 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ctx.plan);
    const bx0 = slots[0][0], bx1 = slots[1][0] + slots[1][1];
    ctx.plan = mk('g', { opacity: 0 }, svg);
    bracket(bx0, bx1); bracket(slots[2][0], slots[2][0] + slots[2][1]);
    mk('text', { class: 'lb', x: (bx0 + bx1) / 2, y: BY + 80, 'text-anchor': 'middle', fill: '#fff', text: 'Plan' }, ctx.plan);
    /* the cursor (a person presses Approve) */
    ctx.cur = mk('g', { class: 'pd-cur' }, svg2);
    mk('path', { d: 'M0 0 L0 33 L8.5 25.5 L14.5 38 L21 35 L15 22.5 L26 22 Z', fill: '#fff', stroke: '#0B0B0C', 'stroke-width': 2.2, 'stroke-linejoin': 'round' }, ctx.cur);

    /* state: every animated thing has a value v and a target t, so back, forward and jumps always work */
    const drop = (t) => (t <= 0 ? -320 : t < .55 ? -320 * (1 - (t / .55) * (t / .55)) : t < .72 ? -26 * Math.sin((t - .55) / .17 * Math.PI) : t < .88 ? -8 * Math.sin((t - .72) / .16 * Math.PI) : 0);
    ctx.S = { axis: { v: 0, t: 0, d: 1.5 }, curve: { v: 0, t: 0, d: 2.6 }, zone: { v: 0, t: 0, d: 2.2 }, blocks: { v: 0, t: 0, d: 1.9 } };
    ctx.setT = (k, t, snap) => { const s = ctx.S[k]; s.t = t; if (snap) s.v = t; };
    ctx.animating = false;
    ctx.render = () => {
      const S = ctx.S, ea = ez(S.axis.v), ec = ez(S.curve.v), ew = ez(S.zone.v), AL = X1 - AX0;
      ctx.axis.style.strokeDasharray = AL; ctx.axis.style.strokeDashoffset = AL * (1 - ea);
      ctx.ticks.style.opacity = clamp((ea - .4) / .5, 0, 1);
      const hp = ctx.curve.getPointAtLength(L * ec), headX = ec >= 1 ? X1 + 40 : hp.x;
      [ctx.curve, ctx.curveZ].forEach((c) => { c.style.strokeDasharray = L + ' ' + L; c.style.strokeDashoffset = L * (1 - ec); c.style.opacity = ec > 0 ? 1 : 0; });
      ctx.head.style.display = ec > .001 && ec < .999 ? '' : 'none'; ctx.head.style.opacity = clamp((1 - ec) * 16, 0, 1);
      ctx.hd.setAttribute('cx', hp.x); ctx.hd.setAttribute('cy', hp.y);
      ctx.tail.forEach((t) => { const q = ctx.curve.getPointAtLength(Math.max(0, L * ec - t.back)); t.el.setAttribute('cx', q.x); t.el.setAttribute('cy', q.y); });
      ctx.hill.setAttribute('opacity', ec);
      const wipeW = ew > 0 ? X0 + (X1 - X0) * ew + (ew >= 1 ? 40 : 0) : 0, wipeX = X0 + (X1 - X0) * ew;
      ctx.clipW.setAttribute('width', wipeW);
      const aL = ew >= 1 ? 4000 : wipeX, FADE = 170, aF = Math.max(aL, headX - FADE);
      ctx.mAs.setAttribute('x', aL); ctx.mAs.setAttribute('width', ec >= 1 ? 2000 : Math.max(0, aF - aL));
      ctx.mAf.setAttribute('x', aF); ctx.mAf.setAttribute('width', ec >= 1 ? 0 : Math.max(0, headX - aF));
      ctx.curveZ.style.opacity = ew > 0 ? 1 : 0;
      ctx.scan.setAttribute('x', wipeW - 2); ctx.scan.setAttribute('opacity', ew > 0 && ew < 1 ? clamp(ew * 10, 0, 1) * clamp((1 - ew) * 10, 0, 1) : 0);
      ctx.fc.setAttribute('opacity', clamp((hp.x - 1150) / 140, 0, 1));
      ctx.sw.setAttribute('opacity', clamp((wipeW - (X0 + 150)) / 160, 0, 1));
      const bv = S.blocks.v * 1.9;
      ctx.blocks.forEach((b, k) => {
        const lt = clamp((bv - k * .42) / 1, 0, 1);
        b.d.setAttribute('transform', 'translate(0 ' + drop(lt).toFixed(1) + ')'); b.d.setAttribute('opacity', clamp(lt / .1, 0, 1));
        const landed = lt >= .55;
        if (landed && !b.landed && ctx.animating) { const r = b.sug.getBoundingClientRect(); Fx.burst(r.left + r.width / 2, r.bottom, { n: 12, speed: 230, color: '#FFB366', life: .7 }); }
        b.landed = landed;
      });
      ctx.plan.setAttribute('opacity', clamp((bv - .6) / .5, 0, 1));
    };
    /* real elapsed time (not the engine's clamped dt), so a slow computer still takes the same seconds */
    ctx.tick = (dt0, now) => {
      const dt = ctx.lastNow && now ? Math.min(.25, (now - ctx.lastNow) / 1000) : dt0; ctx.lastNow = now || 0;
      let ch = false;
      for (const k in ctx.S) { const s = ctx.S[k]; if (s.v === s.t) continue; const r = dt / (s.t > s.v ? s.d : s.d * .35); s.v = s.t > s.v ? Math.min(s.t, s.v + r) : Math.max(s.t, s.v - r); ch = true; }
      if (ch) { ctx.animating = true; ctx.render(); ctx.animating = false; }
    };
    /* timed beats (the approve sequence) */
    ctx.tm = []; ctx.later = (ms, fn) => { ctx.tm.push(ctx.after(ms, fn)); }; ctx.clearTm = () => { ctx.tm.forEach((id) => clearTimeout(id)); ctx.tm = []; };
    ctx.flag = (c, v) => ctx.root.classList.toggle(c, !!v);
    ctx.act = (i, snap) => {
      const P = ctx.pill; ctx.clearTm();
      ['curin', 'tap', 'gone', 'appr', 'showvis'].forEach((c) => ctx.flag(c, false)); P.classList.remove('done', 'press');
      if (i < 4) return;
      if (snap) { ['curin', 'gone', 'appr', 'showvis'].forEach((c) => ctx.flag(c, true)); P.classList.add('done'); return; }
      ctx.later(700, () => ctx.flag('curin', true));
      ctx.later(1750, () => { ctx.flag('tap', true); P.classList.add('press'); });
      ctx.later(1900, () => { ctx.flag('tap', false); P.classList.remove('press'); P.classList.add('done'); ctx.flag('appr', true); Fx.burstEl(P, { n: 34, speed: 440 }); Fx.sweep(P); });
      ctx.later(2500, () => ctx.flag('showvis', true));
      ctx.later(3300, () => ctx.flag('gone', true));
    };
    ctx.reset = () => {
      const R = ctx.root; R.classList.add('pd-snap');
      Object.values(ctx.S).forEach((s) => { s.v = s.t = 0; });
      ctx.act(0, true); ctx.render(); void R.offsetWidth;
      requestAnimationFrame(() => R.classList.remove('pd-snap'));
    };
    ctx.render();
  },
  enter(ctx) { ctx.reset(); ctx.lastNow = 0; ctx.raf(ctx.tick); },
  step(ctx, i, dir, instant) {
    const snap = !!instant || ctx.calm;
    ctx.setT('axis', 1, snap); ctx.setT('curve', i >= 1 ? 1 : 0, snap); ctx.setT('zone', i >= 2 ? 1 : 0, snap); ctx.setT('blocks', i >= 3 ? 1 : 0, snap);
    ctx.act(i, snap);
    if (snap) ctx.render();
  },
  static(ctx) {
    Object.values(ctx.S).forEach((s) => { s.v = s.t = 1; });
    ctx.act(4, true); ctx.render();
  },
});
