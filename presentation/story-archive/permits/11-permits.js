/* Slide: permits check the weather. One glowing gate reads the conditions. Three permit requests come out Allow, Hold or Stop work. Vision: nobody built it. */
Deck.add({
  id: 'permits', reality: ['vision'],
  steps: 4, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [3800, 4400, 5200, 5200, 6500], minutes: 1,
  notes: 'Permits live in the Digital Work Permit service. Equipment lives in the equipments service. Our product already has gas limits, a wind limit and the lightning state.\nStep 1: the data bank feeds the conditions.\nStep 2: hot work asks, gas is OK, so Allow.\nStep 3: a crane lift asks. Wind is over the limit and lightning is not green. So: Hold.\nStep 4: confined space asks, heat is in danger, so Stop work.\nA person decides every time. The gate is a vision. Nobody has built it.\nIf asked: the permit service already pushes six permit types to the Observation Manager. That is in the code; full production state is not proven.',
  html: (() => {
    const I = {
      flame: '<path d="M24 3c2 9 13 13 13 26a13 13 0 0 1-26 0c0-6 3-10 7-14 0 5 2 7 4 8-1-8-1-14 2-20z"/>',
      crane: '<path d="M14 44V6M4 10h38M14 6l-8 4M14 6l22 4M34 10v16M34 26a3 3 0 1 1-3 3"/><rect x="27" y="35" width="14" height="8" rx="1.5"/>',
      box: '<rect x="6" y="19" width="36" height="21" rx="10.5"/><rect x="19" y="12" width="10" height="7" rx="2"/><path d="M14 40v4M34 40v4"/>',
      ok: '<circle cx="24" cy="24" r="19"/><path d="M15 25l6 6 12-13"/>',
      hold: '<circle cx="24" cy="24" r="19"/><path d="M19 16v16M29 16v16"/>',
      stop: '<circle cx="24" cy="24" r="19"/><path d="M14 24h20"/>',
      who: '<circle cx="24" cy="15" r="8"/><path d="M8 43c1-10 8-15 16-15s15 5 16 15"/>',
    };
    const ico = (p, s, w) => `<svg viewBox="0 0 48 48" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="${w || 3}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
    const rows = [
      { y: 385, name: 'Hot work', res: 'Allow', c: '#22C55E', a: I.flame, g: I.ok },
      { y: 580, name: 'Crane lift', res: 'Hold', c: '#F5A524', a: I.crane, g: I.hold },
      { y: 775, name: 'Confined space', res: 'Stop work', c: '#FF4D4D', a: I.box, g: I.stop },
    ];
    const conds = [['Gas:', 'OK', '#22C55E'], ['Wind:', 'over limit', '#F5A524'], ['Lightning:', 'not green', '#F5A524'], ['Heat:', 'danger', '#FF4D4D']];
    return `
    <h2 class="h2 pm-h" data-step="0">Permits check <span class="o glow-text">the weather</span></h2>
    <svg class="pm-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    ${rows.map((r, k) => `<div class="pm-slot" data-step="0" data-fx="left" data-delay="${350 + k * 170}" style="top:${r.y - 56}px"><div class="pm-req glass" data-k="${k}"><span class="ico">${ico(r.a, 44)}</span><span class="t">${r.name}</span></div></div>`).join('')}
    ${rows.map((r, k) => `<div class="pm-res sweepable" data-k="${k}" style="top:${r.y - 56}px;--c:${r.c}"><span class="g">${ico(r.g, 48, 3.2)}</span><span class="t">${r.res}</span></div>`).join('')}
    <div class="pm-panel-w" data-step="1" data-fx="right"><div class="pm-panel glass">
      ${conds.map(([k, v, c], i) => `<div class="pm-cond" data-i="${i}" style="--c:${c};--i:${i}"><i class="dot"></i><span class="k">${k}</span><span class="v">${v}</span></div>`).join('')}
    </div></div>
    <div class="pm-tiny" data-step="4" data-delay="1500"><span class="pi">${ico(I.who, 32, 3)}</span><span>A person decides.</span><span class="rb rb-vision">Vision</span></div>`;
  })(),
  css: `
    .s-permits .pm-h{position:absolute;left:96px;top:104px;width:1500px;font-size:72px}
    .s-permits .pm-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-permits .pm-slot{position:absolute;left:96px;width:440px;height:112px}
    .s-permits .pm-req{width:100%;height:100%;display:flex;align-items:center;gap:22px;padding:0 24px;border-radius:26px;transition:border-color .5s,box-shadow .5s,opacity .7s var(--ease)}
    .s-permits .pm-req .ico{flex:none;width:64px;height:64px;border-radius:18px;display:grid;place-items:center;color:var(--wc-orange);border:1.5px solid rgba(255,131,0,.5);background:rgba(255,131,0,.08)}
    .s-permits .pm-req .t{font:700 38px/1.1 var(--font);letter-spacing:-.01em;color:#fff;white-space:nowrap}
    .s-permits .pm-req.hot{border-color:rgba(255,131,0,.85);box-shadow:0 0 0 1px rgba(255,131,0,.3),0 0 70px rgba(255,131,0,.38),0 30px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.2)}
    .s-permits .pm-req.done{opacity:.7}
    .s-permits .pm-res{position:absolute;left:900px;width:380px;height:112px;display:flex;align-items:center;gap:16px;padding:0 24px;border-radius:26px;border:2px solid var(--c);color:var(--c);
      background:linear-gradient(145deg,color-mix(in srgb,var(--c) 24%,#0b0b0c),color-mix(in srgb,var(--c) 7%,#0b0b0c));
      box-shadow:0 0 0 1px color-mix(in srgb,var(--c) 30%,transparent),0 0 70px color-mix(in srgb,var(--c) 38%,transparent),0 30px 60px rgba(0,0,0,.5);
      opacity:0;transform:translateX(-30px) scale(.9);transition:opacity .6s var(--ease),transform .8s var(--ease)}
    .s-permits .pm-res.on{opacity:1;transform:none}
    .s-permits .pm-res .g{flex:none;display:grid}
    .s-permits .pm-res .t{font:800 46px/1 var(--font);letter-spacing:-.01em;color:#fff;white-space:nowrap;text-shadow:0 0 30px color-mix(in srgb,var(--c) 75%,transparent)}
    .s-permits .pm-panel-w{position:absolute;left:1384px;top:320px;width:440px;height:520px}
    .s-permits .pm-panel{width:100%;height:100%;overflow:hidden;padding:0;border-radius:28px}
    .s-permits .pm-cond{position:relative;height:130px;display:flex;align-items:center;gap:14px;padding:0 26px 0 28px;font:600 28px/1 var(--font);color:#fff;white-space:nowrap;border-top:1px solid rgba(255,255,255,.08);
      opacity:0;transform:translateX(26px);transition:background .6s var(--ease),box-shadow .6s var(--ease)}
    .s-permits .pm-cond:first-child{border-top:0}
    .s-permits .pm-panel-w.in .pm-cond{opacity:1;transform:none;transition:opacity .7s var(--ease) calc(var(--i)*140ms + 350ms),transform .7s var(--ease) calc(var(--i)*140ms + 350ms),background .6s var(--ease),box-shadow .6s var(--ease)}
    .s-permits .pm-cond .dot{flex:none;width:16px;height:16px;margin-right:6px;border-radius:50%;background:var(--c);box-shadow:0 0 16px var(--c)}
    .s-permits .pm-cond .k{color:var(--mut);transition:color .5s}
    .s-permits .pm-cond .v{color:var(--c)}
    .s-permits .pm-cond.lit{background:linear-gradient(90deg,color-mix(in srgb,var(--c) 26%,transparent),color-mix(in srgb,var(--c) 5%,transparent));box-shadow:inset 5px 0 0 var(--c),inset 0 0 44px color-mix(in srgb,var(--c) 20%,transparent)}
    .s-permits .pm-cond.lit .k{color:#fff}
    .s-permits.active .pm-panel-w.in .pm-cond .dot{animation:pmBreath 3.4s ease-in-out infinite;animation-delay:calc(var(--i)*-.9s)}
    @keyframes pmBreath{50%{opacity:.5}}
    .s-permits .pm-tiny{position:absolute;left:418px;top:925px;width:600px;display:flex;justify-content:center;align-items:center;gap:14px;font:500 28px/1 var(--font);color:#CFCFCA}
    .s-permits .pm-tiny .pi{display:grid;color:#C58BFF}
    .s-permits.pm-nt *{transition:none!important}
    .s-permits .pm-pil{transform-box:fill-box;transform-origin:50% 50%}
    .s-permits.active .pm-pil{animation:pmGrow 1.3s var(--ease) both}
    @keyframes pmGrow{from{transform:scaleY(0);opacity:0}to{transform:none;opacity:1}}
    .s-permits.active .pm-cur{animation:pmFade 1.6s var(--ease) .4s backwards}
    @keyframes pmFade{from{opacity:0}}
    .s-permits .pm-cur{opacity:.8;transition:opacity .35s}
    .s-permits .pm-gate.flash .pm-cur{opacity:1}
    .s-permits .pm-tint{opacity:0}
    .s-permits .pm-tint.go{animation:pmTint 1.5s ease-out both}
    @keyframes pmTint{0%{opacity:0}9%{opacity:.62}100%{opacity:0}}
    .s-permits.active .pm-scan{animation:pmScan 3.8s ease-in-out infinite}
    @keyframes pmScan{0%{transform:translateY(0);opacity:0}12%{opacity:1}88%{opacity:1}100%{transform:translateY(560px);opacity:0}}
    .s-permits .pm-lamp,.s-permits .pm-lampb{transition:fill .35s}
    .s-permits .pm-trail,.s-permits .pm-conn{opacity:0;transition:opacity .5s}
    .s-permits .pm-trail.on{opacity:.8}.s-permits .pm-conn.on{opacity:.95}
    .s-permits .pm-feedl{opacity:0;transition:opacity .8s var(--ease)}
    .s-permits .pm-feedl.on{opacity:1}
    .s-permits .pm-orb{opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.5);transition:opacity .8s var(--ease),transform 1s var(--ease)}
    .s-permits .pm-orb.on{opacity:1;transform:none}
    .s-permits .pm-rip{fill:none;stroke:#FF8300;stroke-width:2;transform-box:fill-box;transform-origin:center;opacity:0}
    .s-permits.active .pm-rip{animation:pmRip 4.2s var(--ease) infinite}
    @keyframes pmRip{0%{transform:scale(.7);opacity:.7}100%{transform:scale(1.7);opacity:0}}
    .s-permits .pm-pop{fill:none;transform-box:fill-box;transform-origin:center;opacity:0}
    .s-permits .pm-pop.go{animation:pmPop 1s var(--ease) both}
    @keyframes pmPop{0%{transform:scale(.3);opacity:.95}100%{transform:scale(2.4);opacity:0}}
    body.calm .s-permits *{animation:none!important}
    body.calm .s-permits .pm-scan{opacity:0}`,
  init(ctx) {
    const svg = ctx.q('.pm-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg), GX = 718, LX0 = 548, LX1 = 888, PX = 1384, CHX = 1280, MX = 1332, Y0 = 276, Y1 = 890;
    const ROWS = [{ y: 385, c: '#22C55E', why: [0] }, { y: 580, c: '#F5A524', why: [1, 2] }, { y: 775, c: '#FF4D4D', why: [3] }];
    ctx.gen = 0; ctx.stops = [];
    /* gradients and the soft mask for the colour wash */
    const defs = mk('defs');
    const lg = (id, x1, y1, x2, y2, stops) => { const g = mk('linearGradient', { id, x1, y1, x2, y2 }, defs); stops.forEach(([o, c, a]) => mk('stop', { offset: o, 'stop-color': c, 'stop-opacity': a == null ? 1 : a }, g)); };
    lg('pm-pil', 0, 0, 0, 1, [[0, '#FFB366', 0], [.1, '#FFB366', 1], [.9, '#FF8300', 1], [1, '#E9590C', 0]]);
    lg('pm-cur', 0, 0, 0, 1, [[0, '#FF8300', 0], [.5, '#FF9A33', .3], [1, '#FF8300', 0]]);
    lg('pm-hal', 0, 0, 1, 0, [[0, '#FF8300', 0], [.5, '#FF8300', .3], [1, '#FF8300', 0]]);
    lg('pm-scan', 0, 0, 0, 1, [[0, '#FFD9B0', 0], [.44, '#FFD9B0', .22], [.5, '#FFF1DE', .95], [.56, '#FFD9B0', .22], [1, '#FFD9B0', 0]]);
    lg('pm-fd', 0, 0, 0, 1, [[0, '#fff', 0], [.2, '#fff', 1], [.8, '#fff', 1], [1, '#fff', 0]]);
    const mask = mk('mask', { id: 'pm-fm', maskUnits: 'userSpaceOnUse', x: GX - 60, y: Y0, width: 120, height: Y1 - Y0 }, defs);
    mk('rect', { x: GX - 60, y: Y0, width: 120, height: Y1 - Y0, fill: 'url(#pm-fd)' }, mask);
    const rg = mk('radialGradient', { id: 'pm-liq', cx: .4, cy: .35, r: .8 }, defs);
    [[0, '#FFD9B0'], [.35, '#FF9A33'], [1, '#E9590C']].forEach(([o, c]) => mk('stop', { offset: o, 'stop-color': c }, rg));
    /* lanes: dotted, from each request to its result, and a faint ghost of where each result will land */
    const lanes = mk('g', { 'data-step': 0, 'data-delay': 800 });
    ROWS.forEach((r) => {
      mk('line', { x1: LX0, y1: r.y, x2: LX1, y2: r.y, stroke: 'rgba(255,255,255,.22)', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-dasharray': '1 13' }, lanes);
      mk('rect', { x: 900, y: r.y - 56, width: 380, height: 112, rx: 26, fill: 'none', stroke: 'rgba(255,255,255,.1)', 'stroke-width': 2, 'stroke-dasharray': '9 12' }, lanes);
    });
    /* trails: lit after a pass, from the gate to the result */
    ROWS.forEach((r) => { r.trail = mk('path', { class: 'pm-trail', d: `M${GX + 64} ${r.y} L${LX1} ${r.y}`, stroke: r.c, 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round', filter: 'url(#fx-glow-u)' }); });
    /* the gate */
    const gate = mk('g', { class: 'pm-gate' }); ctx.gate = gate;
    mk('ellipse', { cx: GX, cy: 585, rx: 200, ry: 400, fill: 'url(#g-core)', opacity: .2 }, gate);
    mk('ellipse', { cx: GX, cy: Y1 + 2, rx: 130, ry: 15, fill: 'url(#g-core)', opacity: .65 }, gate);
    mk('rect', { class: 'pm-cur', x: GX - 48, y: Y0, width: 96, height: Y1 - Y0, fill: 'url(#pm-cur)' }, gate);
    ctx.tint = mk('rect', { class: 'pm-tint', x: GX - 48, y: Y0, width: 96, height: Y1 - Y0, fill: '#FF8300', mask: 'url(#pm-fm)' }, gate);
    mk('rect', { class: 'pm-scan', x: GX - 48, y: Y0, width: 96, height: 56, fill: 'url(#pm-scan)' }, gate);
    [-60, 48].forEach((dx) => {
      mk('rect', { class: 'pm-pil', x: GX + dx + 6 - 30, y: Y0, width: 60, height: Y1 - Y0, fill: 'url(#pm-hal)' }, gate);
      mk('rect', { class: 'pm-pil', x: GX + dx, y: Y0, width: 12, height: Y1 - Y0, rx: 6, fill: 'url(#pm-pil)', filter: 'url(#fx-glow-u)' }, gate);
      mk('rect', { class: 'pm-pil', x: GX + dx + 4.5, y: Y0 + 40, width: 3, height: Y1 - Y0 - 80, rx: 1.5, fill: '#FFF1DE', opacity: .85 }, gate);
      mk('rect', { x: GX + dx - 10, y: Y1 - 3, width: 32, height: 7, rx: 3.5, fill: '#FFB366', opacity: .9 }, gate);
    });
    mk('rect', { x: GX - 70, y: 270, width: 140, height: 12, rx: 6, fill: '#FFB366', filter: 'url(#fx-glow-u)' }, gate);
    mk('rect', { x: GX - 3, y: 254, width: 6, height: 18, fill: '#FFB366' }, gate);
    ctx.lampB = mk('circle', { class: 'pm-lampb', cx: GX, cy: 238, r: 32, fill: '#FF8300', opacity: .2 }, gate);
    ctx.lamp = mk('circle', { class: 'pm-lamp', cx: GX, cy: 238, r: 13, fill: '#FF8300', filter: 'url(#fx-glow)' }, gate);
    /* data bank: a glowing orb above the panel, feeding it */
    const orb = mk('g', { class: 'pm-orb' }); ctx.orb = orb;
    mk('circle', { cx: 1604, cy: 205, r: 84, fill: 'url(#g-core)', opacity: .55 }, orb);
    [0, 1].forEach((n) => mk('circle', { class: 'pm-rip', cx: 1604, cy: 205, r: 46, style: `animation-delay:${n * 2.1}s` }, orb));
    mk('circle', { cx: 1604, cy: 205, r: 32, fill: 'url(#pm-liq)', filter: 'url(#fx-glow-soft)' }, orb);
    const feed = mk('path', { class: 'pm-feedl', d: 'M1604 240 L1604 318', stroke: 'rgba(255,179,102,.4)', 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '2 9' });
    ctx.feedl = feed; ctx.feed = ctx.flow(feed, { color: '#FFB366', count: 3, speed: 120, r: 5, tail: 5, tailGap: 9 }); ctx.feed.stop().show(false);
    /* connectors: lit reasons feed each result */
    const connD = (cy, y) => { if (cy === y) return `M${PX} ${cy} L${CHX} ${y}`; const d = y > cy ? 1 : -1, r = 14; return `M${PX} ${cy} L${MX + r} ${cy} Q${MX} ${cy} ${MX} ${cy + d * r} L${MX} ${y - d * r} Q${MX} ${y} ${MX - r} ${y} L${CHX} ${y}`; };
    const tk = (r, tail) => { const g = mk('g', { class: 'pm-tok' }); g.style.display = 'none'; const dots = []; for (let j = 0; j <= tail; j++) dots.push(mk('circle', { r: j === 0 ? r : Math.max(1.8, r * (1 - j / (tail + 1)) * .85), fill: '#FFB366', opacity: j === 0 ? 1 : .55 * (1 - j / (tail + 1)), filter: j === 0 ? 'url(#fx-glow)' : '' }, g)); return { g, dots, gap: r * 1.15 }; };
    ctx.R = ROWS.map((r, k) => {
      const R = { y: r.y, c: r.c, trail: r.trail };
      R.req = ctx.q(`.pm-req[data-k="${k}"]`); R.chip = ctx.q(`.pm-res[data-k="${k}"]`);
      R.conds = r.why.map((i) => ctx.q(`.pm-cond[data-i="${i}"]`));
      R.conns = r.why.map((i) => mk('path', { class: 'pm-conn', d: connD(385 + i * 130, r.y), stroke: r.c, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round', filter: 'url(#fx-glow-u)' }));
      R.pre = mk('path', { d: `M${LX0} ${r.y} L${GX} ${r.y}`, fill: 'none', stroke: 'none' });
      R.post = mk('path', { d: `M${GX} ${r.y} L${LX1} ${r.y}`, fill: 'none', stroke: 'none' });
      R.mark = mk('circle', { cx: GX, cy: r.y, r: 4, fill: 'none' });
      R.pop = mk('circle', { class: 'pm-pop', cx: GX, cy: r.y, r: 40, stroke: r.c, 'stroke-width': 3 });
      R.tok = tk(11, 8); R.pk = R.conns.map(() => tk(7, 5));
      return R;
    });
  },
  step(ctx, i, dir, instant) {
    const gen = ++ctx.gen, quick = !!instant || dir < 0 || ctx.calm, root = ctx.root;
    ctx.stops.forEach((f) => f()); ctx.stops = [];
    root.classList.toggle('pm-nt', quick);
    const idle = () => { ctx.gate.classList.remove('flash'); ctx.lamp.style.fill = ''; ctx.lampB.style.fill = ''; };
    const paint = (R, c) => { R.tok.dots.forEach((d) => d.setAttribute('fill', c)); };
    const hideTok = (R) => { R.tok.g.style.display = 'none'; R.pk.forEach((p) => { p.g.style.display = 'none'; }); };
    const setRow = (R, done) => {
      R.chip.classList.toggle('on', done); R.req.classList.toggle('done', done); R.req.classList.remove('hot');
      R.conds.forEach((el) => el.classList.toggle('lit', done));
      R.conns.forEach((p) => { p.classList.toggle('on', done); p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; });
      R.trail.classList.toggle('on', done); R.trail.style.strokeDasharray = ''; R.trail.style.strokeDashoffset = ''; hideTok(R); paint(R, '#FFB366');
    };
    const travel = (tk, path, ms, ease, done) => {
      const len = path.getTotalLength(); let t = 0; tk.g.style.display = '';
      const place = (p) => tk.dots.forEach((d, j) => { const pt = path.getPointAtLength(Math.max(0, p * len - j * tk.gap)); d.setAttribute('cx', pt.x); d.setAttribute('cy', pt.y); });
      place(0);
      const stop = ctx.raf((dt) => { t += dt * 1000; const p = Math.min(1, t / ms); place(ease(p)); if (p >= 1) { stop(); ctx.stops = ctx.stops.filter((f) => f !== stop); if (done) done(); } });
      ctx.stops.push(stop);
    };
    const run = (k) => {
      const R = ctx.R[k], c = R.c, at = (ms, fn) => ctx.after(ms, () => { if (gen === ctx.gen) fn(); });
      R.req.classList.add('hot'); ctx.lampB.style.fill = '#FFB366';
      at(150, () => {
        paint(R, '#FFB366');
        travel(R.tok, R.pre, 760, Fx.ease.inOutCubic, () => {
          paint(R, c); ctx.gate.classList.add('flash'); ctx.lamp.style.fill = c; ctx.lampB.style.fill = c;
          ctx.tint.setAttribute('fill', c); ctx.tint.classList.remove('go'); void ctx.tint.getBoundingClientRect(); ctx.tint.classList.add('go');
          R.pop.classList.remove('go'); void R.pop.getBoundingClientRect(); R.pop.classList.add('go');
          Fx.burstEl(R.mark, { n: 30, color: c, speed: 400 });
          R.conds.forEach((el) => el.classList.add('lit'));
          R.conns.forEach((p, n) => { p.classList.add('on'); Fx.draw(p, 650, 0); R.pk[n].dots.forEach((d) => d.setAttribute('fill', c)); at(120, () => travel(R.pk[n], p, 620, Fx.ease.outCubic, () => { R.pk[n].g.style.display = 'none'; })); });
          travel(R.tok, R.post, 560, Fx.ease.outCubic, () => {
            R.tok.g.style.display = 'none'; R.chip.classList.add('on'); Fx.sweep(R.chip); Fx.burstEl(R.chip, { n: 24, color: c, speed: 340 });
            R.trail.classList.add('on'); Fx.draw(R.trail, 500, 0);
            R.req.classList.remove('hot'); R.req.classList.add('done');
          });
          at(1500, idle);
        });
      });
    };
    ctx.orb.classList.toggle('on', i >= 1); ctx.feedl.classList.toggle('on', i >= 1);
    ctx.feed.show(i >= 1); if (i >= 1) ctx.feed.start(); else ctx.feed.stop();
    idle();
    ctx.R.forEach((R, k) => { if (i === k + 2 && !quick) { setRow(R, false); run(k); } else setRow(R, i >= k + 2); });
    if (quick) { void root.offsetWidth; requestAnimationFrame(() => root.classList.remove('pm-nt')); }
  },
  static(ctx) {
    ctx.gen++; ctx.stops.forEach((f) => f()); ctx.stops = [];
    ctx.orb.classList.add('on'); ctx.feedl.classList.add('on'); ctx.feed.show(true).freeze();
    ctx.R.forEach((R) => { R.chip.classList.add('on'); R.req.classList.add('done'); R.conds.forEach((el) => el.classList.add('lit')); R.conns.forEach((p) => p.classList.add('on')); R.trail.classList.add('on'); R.tok.g.style.display = 'none'; });
  },
});
