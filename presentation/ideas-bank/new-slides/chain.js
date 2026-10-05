/* Slide: from heat to cost. One idea: hot hours turn into lost work, lost money, injuries and lives, and prevention can pay back. Every link carries a published number. An illustration, not a WakeCap result.
   Step 0 a thermometer and the empty chain. 1 heat cuts work (a published curve). 2 lost hours become lost money. 3 hot days raise injury risk, injuries lead to lives lost. 4 prevention costs, and a US proposal projects a bigger return.
   Numbers: S1-07 (Global Health Action, 2009), S1-06 (The Lancet Countdown, 2024, modelled), S1-09 (IZA, 2021), S1-03 (ILO, 2020 data), S1-16 (US OSHA, 2024 proposal, a projection). */
Deck.add({
  id: 'chain', section: 'why', title: 'From heat to cost', kicker: 'The stakes · The chain', reality: ['stat'],
  steps: 4, ambient: { orb: 1, beam: .6, dust: 1 }, dur: [4000, 5000, 5000, 7200, 6500], minutes: 1.3,
  notes: [
    'This is how heat turns into cost.',
    'Step 1: hotter hours cut the work a person can do.',
    'Step 2: lost work hours become lost money.',
    'Step 3: hot days raise injury risk, and injuries can end lives.',
    'Step 4: prevention has a cost, but it can pay back.',
    'This is an illustration, not a WakeCap result.',
    'If asked: step 1 is heavy work, about 400 watts, for an acclimatised worker in light clothing. Heat is measured as WBGT. At 27 degrees no rest is needed. At 29.5 degrees half of each hour is rest. At 31.5 degrees three quarters is rest, so 25 percent of the hour is work. At 36 degrees there is no work. Source: Global Health Action, 2009, Table 2. The line joins the published points. WHO and WMO say productivity drops 2 to 3 percent for every degree above 20 degrees WBGT, 2025. Step 2: The Lancet Countdown 2025 report, 2024 data: 639 billion potential work hours lost, 1.09 trillion US dollars, 0.99 percent of global GDP. It is a modelled potential loss. Step 3: IZA discussion paper 14560, California workers compensation claims, 2001 to 2018. Injury risk rises 5 to 7 percent on 85 to 90 degree Fahrenheit days and 10 to 15 percent above 100 degrees, against days in the 60s. About 20,000 extra injuries a year in California. ILO, 2020 data, modelled: 22.85 million injuries and 18,970 deaths a year. Step 4: US OSHA proposed rule, 2024, in 2023 dollars: cost 7.8 billion a year, benefit 9.179 billion a year, 531 deaths and 16,027 injuries prevented a year. The cost is net of assumed productivity savings. It is a projection in a proposal, not a final rule. Cal/OSHA 2023 proposal for indoor work in California: benefits 4.0 billion against about 1.0 billion cost over 10 years, 57 percent of the benefit from productivity.',
  ].join('\n'),
  html: `
    <h2 class="h2 ch-h" data-step="0">From heat to <span class="o glow-text">cost</span></h2>
    <p class="lead ch-sub" data-step="0" data-delay="200">Each link has a published number.</p>
    <div class="ch-hot" data-step="0" data-delay="300">Hot hours</div>
    <svg class="ch-svg" viewBox="0 0 1920 1080" width="1920" height="1080" role="img" aria-label="A thermometer feeds a chain. Less work, lost money, more injuries, lives lost. Prevention pays back."></svg>
    <div class="ch-card glass sweepable ch-a" data-step="1">
      <div class="ch-lab">Less work</div>
      <svg class="ch-chart" viewBox="0 0 430 140" width="430" height="140" aria-hidden="true"></svg>
      <div class="ch-key"><div class="ch-kn"><b class="ch-n" data-k="cap">100</b><span class="ch-pc">%</span></div><div class="ch-un">work left</div></div>
      <div class="src">Global Health Action, 2009. Heavy work, WBGT.</div>
    </div>
    <div class="ch-card glass sweepable ch-b" data-step="2">
      <div class="ch-lab">Lost money</div>
      <span class="ch-chip">Modelled</span>
      <div class="ch-row r1"><svg class="ch-ic ic-clock" viewBox="-30 -30 60 60" width="52" height="52" aria-hidden="true"></svg><div class="ch-big"><b class="ch-n" data-k="hrs">0</b><span class="ch-u">billion hours</span></div></div>
      <div class="ch-row r2"><svg class="ch-ic ic-coin" viewBox="-30 -30 60 60" width="52" height="52" aria-hidden="true"></svg><div class="ch-big"><span class="ch-pre">US$</span><b class="ch-n" data-k="usd">0</b><span class="ch-u">trillion lost</span></div></div>
      <div class="src">The Lancet Countdown, 2024</div>
    </div>
    <div class="ch-card glass sweepable ch-c" data-step="3">
      <div class="ch-lab">More injuries</div>
      <svg class="ch-chart2" viewBox="0 0 640 152" width="640" height="152" aria-hidden="true"></svg>
      <div class="src">IZA, 2021. California data, 2001 to 2018.</div>
    </div>
    <div class="ch-card glass sweepable ch-d" data-step="3" data-delay="1100">
      <div class="ch-lab">Lives lost</div>
      <div class="ch-row r1"><svg class="ch-ic ic-plus" viewBox="-30 -30 60 60" width="52" height="52" aria-hidden="true"></svg><div class="ch-big"><b class="ch-n" data-k="inj">0</b><span class="ch-u">million injuries</span></div></div>
      <div class="ch-row r2"><svg class="ch-ic ic-person" viewBox="-30 -30 60 60" width="52" height="52" aria-hidden="true"></svg><div class="ch-big"><b class="ch-n ch-red" data-k="dth">0</b><span class="ch-u">deaths a year</span></div></div>
      <div class="src">ILO estimate, 2020 data</div>
    </div>
    <div class="ch-pay glass sweepable hot" data-step="4">
      <svg class="ch-shield" viewBox="-34 -38 68 76" width="76" height="84" aria-hidden="true"></svg>
      <div class="ch-pt"><span>Prevention</span><span>pays back</span></div>
      <span class="ch-chip ch-chip2">Projection</span>
      <div class="ch-bars">
        <div class="ch-br r1"><span class="k">Costs</span><span class="tr"><i class="f" data-k="cost"></i><b class="v" data-k="costv">US$7.8 billion</b></span></div>
        <div class="ch-br r2"><span class="k">Returns</span><span class="tr"><i class="f ok" data-k="ret"></i><b class="v" data-k="retv">US$9.179 billion</b></span></div>
      </div>
      <div class="ch-liv"><b class="ch-n" data-k="liv">0</b><span class="ch-u">deaths prevented<br>a year</span></div>
      <div class="src">US OSHA, 2024 proposal, not final</div>
    </div>
    <p class="ch-foot" data-step="0" data-delay="500">An illustration, not a WakeCap result.</p>`,
  css: `
    .s-chain .ch-h{position:absolute;left:96px;top:104px;width:1700px;font-size:62px}
    .s-chain .ch-sub{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-chain .ch-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-chain .ch-hot{position:absolute;left:96px;top:264px;width:148px;text-align:center;font:700 20px/1 var(--font);letter-spacing:.12em;text-transform:uppercase;color:var(--wc-orange-soft)}
    .s-chain .src{color:#9A9A94}
    .s-chain .ch-card{position:absolute;width:700px;height:236px}
    .s-chain .ch-a{left:340px;top:262px}.s-chain .ch-b{left:1124px;top:262px}
    .s-chain .ch-c{left:340px;top:522px}.s-chain .ch-d{left:1124px;top:522px}
    .s-chain .ch-card .src{position:absolute;left:28px;bottom:16px}
    .s-chain .ch-lab{position:absolute;left:28px;top:18px;font:700 22px/1 var(--font);letter-spacing:.16em;text-transform:uppercase;color:var(--wc-orange-soft)}
    .s-chain .ch-chart{position:absolute;left:14px;top:44px;overflow:visible}
    .s-chain .ch-chart2{position:absolute;left:30px;top:44px;overflow:visible}
    .s-chain .ch-key{position:absolute;left:450px;top:58px;width:226px}
    .s-chain .ch-kn{display:flex;align-items:baseline;white-space:nowrap}
    .s-chain .ch-n{display:inline-block;font:900 64px/1 var(--font);letter-spacing:-.04em;font-variant-numeric:tabular-nums;color:#fff;text-shadow:0 0 28px rgba(255,131,0,.55),0 0 70px rgba(255,131,0,.25)}
    .s-chain .ch-key .ch-n{font-size:100px}
    .s-chain .ch-pc{font:800 44px/1 var(--font);color:#D9D9D4;margin-left:4px}
    .s-chain .ch-un{margin-top:8px;font:500 30px/1.1 var(--font);color:#D9D9D4;white-space:nowrap}
    .s-chain .ch-n.ch-red{text-shadow:0 0 28px rgba(255,77,77,.55),0 0 70px rgba(255,77,77,.25)}
    .s-chain .ch-row{position:absolute;left:28px;display:flex;align-items:center;gap:22px;height:64px}
    .s-chain .ch-row.r1{top:52px}.s-chain .ch-row.r2{top:122px}
    .s-chain .ch-ic{flex:none;overflow:visible}
    .s-chain .ch-big{display:flex;align-items:baseline;gap:14px;white-space:nowrap}
    .s-chain .ch-u{font:600 30px/1 var(--font);color:#D9D9D4}
    .s-chain .ch-pre{font:800 36px/1 var(--font);color:#D9D9D4;margin-right:-10px}
    .s-chain .ch-chip{position:absolute;right:26px;top:16px;padding:8px 16px;border-radius:999px;border:1.5px dashed rgba(255,179,102,.85);font:700 22px/1 var(--font);color:#FFB366;background:rgba(255,131,0,.08)}
    .s-chain .ch-pay{position:absolute;left:96px;top:788px;width:1728px;height:160px}
    .s-chain .ch-shield{position:absolute;left:36px;top:38px;overflow:visible}
    .s-chain .ch-pt{position:absolute;left:140px;top:30px;font:800 38px/1.1 var(--font);letter-spacing:-.01em;color:#fff}
    .s-chain .ch-pt span{display:block}
    .s-chain .ch-chip2{right:30px;top:18px}
    .s-chain .ch-bars{position:absolute;left:420px;top:36px;width:760px}
    .s-chain .ch-br{position:absolute;left:0;height:40px;display:flex;align-items:center}
    .s-chain .ch-br.r1{top:0}.s-chain .ch-br.r2{top:56px}
    .s-chain .ch-br .k{flex:none;width:124px;font:600 28px/1 var(--font);color:#D9D9D4}
    .s-chain .ch-br .tr{position:relative;flex:none;width:520px;height:28px}
    .s-chain .ch-br .f{position:absolute;left:0;top:0;height:28px;width:0;border-radius:14px;background:linear-gradient(90deg,rgba(255,255,255,.28),rgba(255,255,255,.62))}
    .s-chain .ch-br .f.ok{background:linear-gradient(90deg,#E9590C,#FFB366);box-shadow:0 0 22px rgba(255,131,0,.55)}
    .s-chain .ch-br .v{position:absolute;top:-4px;left:0;font:800 32px/1 var(--font);color:#fff;white-space:nowrap;opacity:0}
    .s-chain .ch-liv{position:absolute;left:1300px;top:54px;display:flex;align-items:center;gap:18px}
    .s-chain .ch-liv .ch-n{font-size:84px}
    .s-chain .ch-liv .ch-u{font:600 26px/1.15 var(--font);white-space:nowrap}
    .s-chain .ch-pay .src{position:absolute;left:140px;bottom:14px}
    .s-chain .ch-foot{position:absolute;left:96px;top:962px;margin:0;font:500 24px/1 var(--font);color:#B9B9B4}
    body.calm .s-chain *{animation:none!important}`,
  init(ctx) {
    const svg = ctx.q('.ch-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg), clamp = Fx.clamp, E = Fx.ease;
    const NS = Fx.NS;
    /* ---------- defs */
    const defs = mk('defs');
    const lg = (id, x1, y1, x2, y2, stops) => { const g = mk('linearGradient', { id, x1, y1, x2, y2 }, defs); stops.forEach(([o, c, a]) => mk('stop', { offset: o, 'stop-color': c, 'stop-opacity': a == null ? 1 : a }, g)); };
    lg('ch-merc', 0, 1, 0, 0, [[0, '#E9590C'], [1, '#FFC48A']]);
    lg('ch-bar', 0, 1, 0, 0, [[0, '#E9590C'], [1, '#FFB366']]);
    const hz = mk('radialGradient', { id: 'ch-haze', cx: .5, cy: .5, r: .5 }, defs);
    mk('stop', { offset: 0, 'stop-color': '#FF8300', 'stop-opacity': .55 }, hz); mk('stop', { offset: .6, 'stop-color': '#E9590C', 'stop-opacity': .2 }, hz); mk('stop', { offset: 1, 'stop-color': '#E9590C', 'stop-opacity': 0 }, hz);
    /* ---------- ghost frames: where each card will land (they fade as the card arrives) */
    [[340, 262, 700, 236, 1], [1124, 262, 700, 236, 2], [340, 522, 700, 236, 3], [1124, 522, 700, 236, 3], [96, 788, 1728, 160, 4]].forEach(([x, y, w, h, out]) => {
      mk('rect', { x, y, width: w, height: h, rx: 28, fill: 'none', stroke: 'rgba(255,255,255,.14)', 'stroke-width': 2, 'stroke-dasharray': '10 9', 'data-step': 0, 'data-step-out': out });
    });
    /* ---------- the thermometer */
    const TX = 170, TW = 44, BY = 724;
    const th = mk('g', { 'data-step': 0 });
    ctx.haze = mk('ellipse', { class: 'ch-hz', cx: TX, cy: 520, rx: 190, ry: 300, fill: 'url(#ch-haze)', opacity: .2 }, th);
    mk('rect', { x: TX - TW / 2, y: 300, width: TW, height: 420, rx: 22, fill: 'rgba(255,255,255,.04)', stroke: 'rgba(255,255,255,.38)', 'stroke-width': 2.5 }, th);
    for (let y = 340; y <= 680; y += 40) mk('line', { x1: TX - TW / 2 - 22, y1: y, x2: TX - TW / 2 - 8, y2: y, stroke: 'rgba(255,255,255,.28)', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, th);
    ctx.merc = mk('rect', { x: TX - 12, y: BY, width: 24, height: 0, rx: 12, fill: 'url(#ch-merc)', filter: 'url(#fx-glow-soft)' }, th);
    mk('circle', { cx: TX, cy: BY, r: 40, fill: 'url(#ch-merc)', stroke: '#FFB366', 'stroke-width': 3, filter: 'url(#fx-glow-soft)' }, th);
    mk('circle', { cx: TX - 11, cy: BY - 12, r: 9, fill: 'rgba(255,255,255,.35)' }, th);
    /* ---------- roads: heat to each lane, and across each lane */
    const road = (d, step, delay) => {
      const g = mk('g', { 'data-step': step, 'data-delay': delay || 0 }), p = mk('path', { d, fill: 'none', stroke: 'rgba(255,255,255,.22)', 'stroke-width': 2.4, 'stroke-dasharray': '2 9', 'stroke-linecap': 'round' }, g);
      const f = ctx.flow(p, { color: '#FF8300', count: 3, speed: 170, r: 6, tail: 6, tailGap: 12 }); f.stop().show(false); return f;
    };
    ctx.fl = [road('M204 380 L336 380', 1), road('M1044 380 L1120 380', 2), road('M204 640 L336 640', 3), road('M1044 640 L1120 640', 3, 1100)];
    /* ---------- card A: the published curve (heavy work: 27 C needs no rest, 29.5 C half, 31.5 C a quarter) */
    const A = ctx.q('.ch-chart'), ax = (t) => 44 + 360 * (t - 27) / 4.5, ay = (c) => 98 - 88 * c;
    const P = [[27, 1], [29.5, .5], [31.5, .25]], h0 = 2.5, h1 = 2, d0 = (P[1][1] - P[0][1]) / h0, d1 = (P[2][1] - P[1][1]) / h1;
    const m0 = ((2 * h0 + h1) * d0 - h0 * d1) / (h0 + h1), m2 = ((2 * h1 + h0) * d1 - h1 * d0) / (h0 + h1), w1 = 2 * h1 + h0, w2 = h1 + 2 * h0, m1 = (w1 + w2) / (w1 / d0 + w2 / d1);
    const cap = (t) => { const k = t <= P[1][0] ? 0 : 1, x0 = P[k][0], x1 = P[k + 1][0], hh = x1 - x0, s = (t - x0) / hh, m = [m0, m1, m2], y0 = P[k][1], y1 = P[k + 1][1]; return (2 * s * s * s - 3 * s * s + 1) * y0 + (s * s * s - 2 * s * s + s) * hh * m[k] + (-2 * s * s * s + 3 * s * s) * y1 + (s * s * s - s * s) * hh * m[k + 1]; };
    let dcv = ''; for (let i = 0; i <= 90; i++) { const t = 27 + 4.5 * i / 90; dcv += (i ? 'L' : 'M') + ax(t).toFixed(1) + ' ' + ay(cap(t)).toFixed(1); }
    mk('line', { x1: 36, y1: 102, x2: 414, y2: 102, stroke: 'rgba(255,255,255,.22)', 'stroke-width': 2 }, A);
    mk('path', { d: dcv, fill: 'none', stroke: 'rgba(255,255,255,.2)', 'stroke-width': 3, 'stroke-dasharray': '3 8', 'stroke-linecap': 'round' }, A);
    ctx.aClip = mk('rect', { x: 0, y: -20, width: 0, height: 200 }, mk('clipPath', { id: 'ch-aclip' }, defs));
    mk('path', { d: dcv, fill: 'none', stroke: '#FF8300', 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', filter: 'url(#fx-glow-u)', 'clip-path': 'url(#ch-aclip)' }, A);
    ctx.aMarks = [27, 29.5, 31.5].map((t) => {
      const g = mk('g', {}, A);
      mk('line', { x1: ax(t), y1: 102, x2: ax(t), y2: 108, stroke: 'rgba(255,255,255,.4)', 'stroke-width': 2 }, g);
      mk('text', { x: ax(t), y: 128, 'text-anchor': 'middle', fill: '#D9D9D4', style: 'font:600 20px var(--font)', text: t + ' °C' }, g);
      return { t, g, dot: mk('circle', { cx: ax(t), cy: ay(cap(t)), r: 7, fill: '#0B0B0C', stroke: '#FFB366', 'stroke-width': 3 }, g) };
    });
    ctx.aDot = mk('circle', { cx: ax(27), cy: ay(1), r: 11, fill: '#fff', filter: 'url(#fx-glow)' }, A);
    /* ---------- card C: injury risk bars (5 to 7 percent on 85 to 90 F days, 10 to 15 percent above 100 F) */
    const C = ctx.q('.ch-chart2'), BASE = 118, K = 6;
    mk('line', { x1: 20, y1: BASE, x2: 620, y2: BASE, stroke: 'rgba(255,255,255,.22)', 'stroke-width': 2 }, C);
    const bars = [[60, '60s °F', null], [265, '85–90 °F', [5, 7, '+5–7%']], [470, 'Over 100 °F', [10, 15, '+10–15%']]];
    ctx.cb = bars.map(([x, lab, v]) => {
      mk('text', { x: x + 55, y: 146, 'text-anchor': 'middle', fill: '#D9D9D4', style: 'font:600 20px var(--font)', text: lab }, C);
      if (!v) { mk('rect', { x, y: BASE - 4, width: 110, height: 4, rx: 2, fill: 'rgba(255,255,255,.5)' }, C); mk('text', { x: x + 55, y: BASE - 14, 'text-anchor': 'middle', fill: '#9A9A94', style: 'font:600 20px var(--font)', text: 'Base' }, C); return null; }
      const ext = mk('rect', { x, y: BASE, width: 110, height: 0, rx: 8, fill: 'rgba(255,179,102,.38)', stroke: 'rgba(255,179,102,.8)', 'stroke-width': 1.5, 'stroke-dasharray': '6 5' }, C);
      const sol = mk('rect', { x, y: BASE, width: 110, height: 0, rx: 8, fill: 'url(#ch-bar)', filter: 'url(#fx-glow-u)' }, C);
      const txt = mk('text', { x: x + 55, y: BASE - v[1] * K - 12, 'text-anchor': 'middle', fill: '#fff', opacity: 0, style: 'font:800 28px var(--font)', text: v[2] }, C);
      return { lo: v[0], hi: v[1], ext, sol, txt };
    }).filter(Boolean);
    /* ---------- icons */
    const ic = (sel, draw) => { const g = mk('g', {}, ctx.q(sel)); draw(g); };
    const S2 = { fill: 'none', stroke: '#FFB366', 'stroke-width': 3.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    ic('.ic-clock', (g) => { mk('circle', Object.assign({ r: 25 }, S2), g); mk('path', Object.assign({ d: 'M0 -14 V0 L10 7' }, S2), g); });
    ic('.ic-coin', (g) => { mk('circle', Object.assign({ r: 25 }, S2), g); mk('circle', Object.assign({ r: 15 }, S2, { 'stroke-width': 2 }), g); mk('path', Object.assign({ d: 'M0 -8 V8' }, S2), g); });
    ic('.ic-plus', (g) => { mk('rect', Object.assign({ x: -24, y: -10, width: 48, height: 20, rx: 10, transform: 'rotate(-45)' }, S2), g); mk('circle', { cx: -3, cy: -3, r: 2, fill: '#FFB366', transform: 'rotate(-45)' }, g); mk('circle', { cx: 3, cy: 3, r: 2, fill: '#FFB366' }, g); });
    ic('.ic-person', (g) => { mk('circle', Object.assign({ cx: 0, cy: -11, r: 9 }, S2, { stroke: '#FF6B5E' }), g); mk('path', Object.assign({ d: 'M-18 22 C-18 6 -9 2 0 2 C9 2 18 6 18 22' }, S2, { stroke: '#FF6B5E' }), g); });
    ic('.ch-shield', (g) => {
      mk('path', { d: 'M0 -34 L28 -23 V4 C28 22 13 32 0 38 C-13 32 -28 22 -28 4 V-23 Z', fill: 'rgba(255,131,0,.1)', stroke: '#FF8300', 'stroke-width': 4, 'stroke-linejoin': 'round', filter: 'url(#fx-glow-soft)' }, g);
      mk('path', { d: 'M-11 2 L-3 11 L13 -9', fill: 'none', stroke: '#fff', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    });
    /* ---------- state: every animated value has a value v and a target t, so forward, back and jumps always work */
    const el = (k) => ctx.q(`[data-k="${k}"]`);
    ctx.e = { cap: el('cap'), hrs: el('hrs'), usd: el('usd'), inj: el('inj'), dth: el('dth'), liv: el('liv'), cost: el('cost'), ret: el('ret'), costv: el('costv'), retv: el('retv') };
    const T = (d) => ({ v: 0, t: 0, d, hold: 0 });
    ctx.S = { heat: T(1.5), a: T(1.9), b1: T(1.2), b2: T(1.2), c: T(1.1), d1: T(1.1), d2: T(1.3), p1: T(1.3), p2: T(1.3) };
    ctx.setT = (k, t, snap, hold) => { const s = ctx.S[k]; s.t = t; s.hold = snap ? 0 : (hold || 0) / 1000; if (snap) s.v = t; };
    const WC = 340, WR = 400;
    ctx.render = () => {
      const S = ctx.S, ez = E.outCubic;
      const h = E.inOutCubic(S.heat.v), top = BY - (BY - 322) * h;
      ctx.merc.setAttribute('y', top.toFixed(1)); ctx.merc.setAttribute('height', (BY + 6 - top).toFixed(1));
      ctx.haze.setAttribute('opacity', (.2 + .75 * h).toFixed(2));
      /* A: the dot slides down the published curve while the work left counts down */
      const a = E.inOutSine(S.a.v), t = 27 + 4.5 * a, x = ax(t);
      ctx.aClip.setAttribute('width', (x - 20 + (a >= 1 ? 40 : 0)).toFixed(1));
      ctx.aDot.setAttribute('cx', x.toFixed(1)); ctx.aDot.setAttribute('cy', ay(cap(t)).toFixed(1));
      ctx.aDot.setAttribute('opacity', S.a.v > 0 ? 1 : 0);
      ctx.e.cap.textContent = String(Math.round(100 * cap(t)));
      ctx.aMarks.forEach((m) => m.dot.setAttribute('fill', t >= m.t - .001 && S.a.v > 0 ? '#FF8300' : '#0B0B0C'));
      /* B */
      ctx.e.hrs.textContent = Fx.fmt(Math.round(639 * ez(S.b1.v)), 0);
      ctx.e.usd.textContent = Fx.fmt(1.09 * ez(S.b2.v), 2);
      /* C */
      const c = ez(S.c.v);
      ctx.cb.forEach((b, k) => {
        const kk = clamp(c * 1.5 - k * .35, 0, 1), s = b.lo * K * kk, e2 = (b.hi - b.lo) * K * kk;
        b.sol.setAttribute('y', (BASE - s).toFixed(1)); b.sol.setAttribute('height', s.toFixed(1));
        b.ext.setAttribute('y', (BASE - s - e2).toFixed(1)); b.ext.setAttribute('height', e2.toFixed(1));
        b.txt.setAttribute('opacity', clamp((kk - .6) * 3, 0, 1).toFixed(2));
      });
      /* D */
      ctx.e.inj.textContent = Fx.fmt(22.85 * ez(S.d1.v), 2);
      ctx.e.dth.textContent = Fx.fmt(Math.round(18970 * ez(S.d2.v)), 0);
      /* payback */
      const p = ez(S.p1.v), wc = WC * p, wr = WR * clamp(p * 1.15, 0, 1);
      ctx.e.cost.style.width = wc.toFixed(1) + 'px'; ctx.e.ret.style.width = wr.toFixed(1) + 'px';
      ctx.e.costv.style.left = (wc + 18).toFixed(1) + 'px'; ctx.e.retv.style.left = (wr + 18).toFixed(1) + 'px';
      ctx.e.costv.style.opacity = clamp((p - .55) * 3, 0, 1).toFixed(2); ctx.e.retv.style.opacity = clamp((p - .55) * 3, 0, 1).toFixed(2);
      ctx.e.liv.textContent = Fx.fmt(Math.round(531 * ez(S.p2.v)), 0);
    };
    /* real elapsed time (not the engine's clamped dt), so a slow computer still takes the same seconds */
    ctx.tick = (dt0, now) => {
      const dt = ctx.last && now ? Math.min(.25, (now - ctx.last) / 1000) : dt0; ctx.last = now || 0;
      let ch = false;
      for (const k in ctx.S) {
        const s = ctx.S[k]; if (s.v === s.t) continue; ch = true;
        if (s.hold > 0) { s.hold -= dt; continue; }
        const r = dt / (s.t > s.v ? s.d : s.d * .3);
        s.v = s.t > s.v ? Math.min(s.t, s.v + r) : Math.max(s.t, s.v - r);
      }
      if (ch) ctx.render();
    };
    ctx.gen = 0; ctx.last = 0;
    ctx.render();
  },
  enter(ctx) {
    ctx.gen++; ctx.last = 0;
    Object.values(ctx.S).forEach((s) => { s.v = s.t = 0; s.hold = 0; });
    ctx.render(); ctx.raf(ctx.tick);
  },
  step(ctx, i, dir, instant) {
    const snap = !!instant || dir < 0 || ctx.calm, gen = ++ctx.gen, on = (n) => (i >= n ? 1 : 0);
    ctx.setT('heat', on(1), snap, 0);
    ctx.setT('a', on(1), snap, 500);
    ctx.setT('b1', on(2), snap, 500); ctx.setT('b2', on(2), snap, 1100);
    ctx.setT('c', on(3), snap, 450);
    ctx.setT('d1', on(3), snap, 1700); ctx.setT('d2', on(3), snap, 2300);
    ctx.setT('p1', on(4), snap, 500); ctx.setT('p2', on(4), snap, 1000);
    ctx.fl.forEach((f, k) => { const n = [1, 2, 3, 3][k]; f.show(i >= n); if (i >= n) f.start(); else f.stop(); });
    if (snap) { ctx.render(); return; }
    const at = (ms, fn) => ctx.after(ms, () => { if (gen === ctx.gen) fn(); });
    if (i === 1) { at(2450, () => { Fx.burstEl(ctx.e.cap, { n: 22, color: '#FF8300', speed: 320 }); }); }
    if (i === 2) { at(2350, () => Fx.burstEl(ctx.e.usd, { n: 24, color: '#FF8300', speed: 330 })); }
    if (i === 3) { at(1500, () => Fx.sweep(ctx.q('.ch-d'))); at(3500, () => Fx.burstEl(ctx.e.dth, { n: 28, color: '#FF6B5E', speed: 360 })); }
    if (i === 4) { at(2500, () => { Fx.sweep(ctx.q('.ch-pay')); Fx.burstEl(ctx.e.liv, { n: 26, color: '#FFB366', speed: 340 }); }); }
  },
  static(ctx) {
    ctx.gen++;
    Object.values(ctx.S).forEach((s) => { s.v = s.t = 1; s.hold = 0; });
    ctx.render(); ctx.fl.forEach((f) => f.show(true).freeze());
  },
});
