/* Slide: from heat to cost. One idea: hot hours turn into lost work, lost money, injuries and lives, and prevention can pay back. Every link carries a published number. An illustration, not a WakeCap result.
   Step 0 a thermometer. 1 heat cuts work (a line joining the published points of a table). 2 lost hours become lost money. 3 hot days raise injury risk, and injuries lead to deaths. 4 prevention costs money, and a US proposal projects a bigger benefit.
   Numbers: S1-07 (Global Health Action, 2009), S1-06 (The Lancet Countdown, 2024, modelled), S1-09 (IZA, 2021), S1-03 (ILO, 2020 data), S1-16 (US OSHA, 2024 proposal, a projection). */
Deck.add({
  id: 'chain', section: 'why', title: 'From heat to cost', kicker: 'The stakes · The chain', reality: ['stat'],
  steps: 4, ambient: { orb: 1, beam: .6, dust: 1 }, dur: [4000, 5000, 5000, 7200, 6500], minutes: 1.3,
  notes: [
    'This is how heat turns into cost.',
    'Step 1: heat cuts how much heavy work a person can do.',
    'Step 2: a model turns lost work hours into lost money.',
    'Step 3: hot days raise injury risk, and injuries can end lives.',
    'Step 4: a US proposal projects that prevention can pay back.',
    'This is an illustration, not a WakeCap result.',
    'If asked: step 1 is Global Health Action, 2009, Table 2. It is for acclimatised workers in light clothing, doing heavy work of about 400 watts. Heat is measured as WBGT, a reading that counts humidity and sun. 27 degrees needs no rest, 29.5 degrees half rest, 31.5 degrees three quarters rest, 36 degrees no work. Work left is the share of each hour a person can work. The line joins the published points, and 27.5 degrees is 75 percent. WHO and WMO, 2025: productivity drops 2 to 3 percent for every degree above 20 degrees WBGT. Step 2 is The Lancet Countdown 2025 report, 2024 data: 639 billion potential hours and 1.09 trillion US dollars of potential income loss. It is a model, not a count. Step 3 is IZA paper 14560, California workers compensation claims, 2001 to 2018: injury risk on the same day, against days in the 60s F. 85 to 90 F is about 29 to 32 C, and 100 F is about 38 C. ILO, 2020 data: 22.85 million injuries and 18,970 deaths a year from excessive heat, modelled estimates. Step 4 is the US OSHA 2024 proposal, in 2023 dollars: cost 7.8 billion a year, benefit 9.179 billion a year, 531 deaths and 16,027 injuries prevented a year. The cost is net of assumed productivity savings. The benefit uses the OSHA undercount adjustment, and without it OSHA gives a benefit of 771 million dollars a year. It is a projection, not a final rule. Cal/OSHA Standards Board, 2023 proposal, indoor work in California only: 4.0 billion dollars of benefit against about 1.0 billion of direct cost over 10 years, a projection. The links come from different studies, so the chain is an illustration, not one calculation.',
  ].join('\n'),
  html: `
    <h2 class="h2 ch-h" data-step="0">From heat to <span class="o glow-text">cost</span></h2>
    <div class="ch-hot" data-step="0" data-delay="300">Heat</div>
    <div class="ch-haze" aria-hidden="true"></div>
    <svg class="ch-svg" viewBox="0 0 1920 1080" width="1920" height="1080" role="img" aria-label="A thermometer feeds a chain. Less work leads to lost hours and money. Higher injury risk leads to injuries and deaths. Prevention can pay back."></svg>
    <div class="ch-card glass sweepable ch-a" data-step="1">
      <div class="ch-lab">Less work</div>
      <div class="ch-cap">Heavy work, heat in WBGT</div>
      <svg class="ch-chart" viewBox="0 0 430 140" width="430" height="140" aria-hidden="true"></svg>
      <div class="ch-key"><div class="ch-kn"><b class="ch-n" data-k="cap">100</b><span class="ch-pc">%</span></div><div class="ch-un">work left</div></div>
      <div class="src">Global Health Action, 2009. <span>Class 3, about 400 W.</span></div>
    </div>
    <div class="ch-card glass sweepable ch-b" data-step="2">
      <div class="ch-lab">Lost hours and money</div>
      <span class="ch-chip">Modelled</span>
      <div class="ch-row r1"><svg class="ch-ic ic-clock" viewBox="-30 -30 60 60" width="52" height="52" aria-hidden="true"></svg><div class="ch-big"><b class="ch-n" data-k="hrs">0</b><span class="ch-u">billion hours</span></div></div>
      <div class="ch-row r2"><svg class="ch-ic ic-coin" viewBox="-30 -30 60 60" width="52" height="52" aria-hidden="true"></svg><div class="ch-big"><span class="ch-pre">US$</span><b class="ch-n" data-k="usd">0</b><span class="ch-u">trillion</span></div></div>
      <div class="src">The Lancet Countdown, 2024</div>
    </div>
    <div class="ch-card glass sweepable ch-c" data-step="3">
      <div class="ch-lab">Higher injury risk</div>
      <div class="ch-cap">Day’s high</div>
      <svg class="ch-chart2" viewBox="0 0 640 152" width="640" height="152" aria-hidden="true"></svg>
      <div class="src">IZA, 2021. California data, 2001 to 2018.</div>
    </div>
    <div class="ch-card glass sweepable ch-d" data-step="3" data-delay="1100">
      <div class="ch-lab">Injuries and deaths</div>
      <div class="ch-row r1"><svg class="ch-ic ic-plus" viewBox="-30 -30 60 60" width="52" height="52" aria-hidden="true"></svg><div class="ch-big"><b class="ch-n" data-k="inj">0</b><span class="ch-u">million injuries a year</span></div></div>
      <div class="ch-row r2"><svg class="ch-ic ic-person" viewBox="-30 -30 60 60" width="52" height="52" aria-hidden="true"></svg><div class="ch-big"><b class="ch-n ch-red" data-k="dth">0</b><span class="ch-u">deaths a year</span></div></div>
      <div class="src">ILO estimate, 2020 data</div>
    </div>
    <div class="ch-pay glass sweepable hot" data-step="4">
      <svg class="ch-shield" viewBox="-34 -38 68 76" width="76" height="84" aria-hidden="true"></svg>
      <div class="ch-pt"><span>Prevention</span><span>can pay back</span></div>
      <span class="ch-chip ch-chip2">Projection</span>
      <div class="ch-bars">
        <div class="ch-br r1"><span class="k">Yearly cost</span><span class="tr"><i class="f" data-k="cost"></i><b class="v" data-k="costv">US$7.8 billion</b></span></div>
        <div class="ch-br r2"><span class="k">Yearly benefit</span><span class="tr"><i class="f ok" data-k="ret"></i><b class="v" data-k="retv">US$9.179 billion</b></span></div>
      </div>
      <div class="ch-liv"><b class="ch-n" data-k="liv">0</b><span class="ch-u">deaths prevented<br>a year</span></div>
      <div class="src">US OSHA, 2024 proposal, 2023 dollars, not final</div>
    </div>
    <p class="ch-foot" data-step="0" data-delay="500">An illustration, not a WakeCap result.</p>`,
  css: `
    .s-chain .ch-h{position:absolute;left:96px;top:104px;width:1700px;font-size:62px}
    .s-chain .ch-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-chain .ch-hot{position:absolute;left:96px;top:264px;width:148px;text-align:center;font:700 20px/1 var(--font);letter-spacing:.12em;text-transform:uppercase;color:var(--wc-orange-soft)}
    .s-chain .src{color:#9A9A94;font-size:18px}
    .s-chain .ch-card{position:absolute;width:700px;height:236px}
    .s-chain .ch-a{left:340px;top:262px}.s-chain .ch-b{left:1124px;top:262px}
    .s-chain .ch-c{left:340px;top:522px}.s-chain .ch-d{left:1124px;top:522px}
    .s-chain .ch-card .src{position:absolute;left:28px;bottom:16px}
    .s-chain .ch-lab{position:absolute;left:28px;top:18px;font:700 22px/1 var(--font);letter-spacing:.16em;text-transform:uppercase;color:var(--wc-orange-soft)}
    .s-chain .ch-cap{position:absolute;right:28px;top:20px;font:600 20px/1 var(--font);color:#B9B9B4}
    .s-chain .ch-chart{position:absolute;left:14px;top:44px;overflow:visible}
    .s-chain .ch-chart2{position:absolute;left:30px;top:44px;overflow:visible}
    .s-chain .ch-key{position:absolute;left:484px;top:58px;width:196px}
    .s-chain .ch-kn{display:flex;align-items:baseline;white-space:nowrap}
    .s-chain .ch-n{display:inline-block;font:900 64px/1 var(--font);letter-spacing:-.04em;font-variant-numeric:tabular-nums;color:#fff;text-shadow:0 0 28px rgba(255,131,0,.55),0 0 70px rgba(255,131,0,.25)}
    .s-chain .ch-key .ch-n{font-size:92px}
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
    .s-chain .ch-pay{position:absolute;left:96px;top:778px;width:1728px;height:170px}
    .s-chain .ch-shield{position:absolute;left:36px;top:43px;overflow:visible}
    .s-chain .ch-pt{position:absolute;left:140px;top:26px;font:800 38px/1.1 var(--font);letter-spacing:-.01em;color:#fff}
    .s-chain .ch-pt span{display:block}
    .s-chain .ch-chip2{right:30px;top:18px}
    .s-chain .ch-bars{position:absolute;left:420px;top:28px;width:860px}
    .s-chain .ch-br{position:absolute;left:0;height:40px;display:flex;align-items:center}
    .s-chain .ch-br.r1{top:0}.s-chain .ch-br.r2{top:54px}
    .s-chain .ch-br .k{flex:none;width:196px;font:600 28px/1 var(--font);color:#D9D9D4}
    .s-chain .ch-br .tr{position:relative;flex:none;width:470px;height:28px}
    .s-chain .ch-br .f{position:absolute;left:0;top:0;height:28px;width:0;border-radius:14px;background:linear-gradient(90deg,rgba(255,255,255,.28),rgba(255,255,255,.62))}
    .s-chain .ch-br .f.ok{background:linear-gradient(90deg,#E9590C,#FFB366);box-shadow:0 0 22px rgba(255,131,0,.55)}
    .s-chain .ch-br .v{position:absolute;top:-4px;left:0;font:800 32px/1 var(--font);color:#fff;white-space:nowrap;opacity:0}
    .s-chain .ch-liv{position:absolute;left:1310px;top:44px;display:flex;align-items:center;gap:18px}
    .s-chain .ch-liv .ch-n{font-size:84px}
    .s-chain .ch-liv .ch-u{font:600 26px/1.15 var(--font);white-space:nowrap}
    .s-chain .ch-pay .src{position:absolute;left:140px;bottom:12px}
    .s-chain .ch-foot{position:absolute;left:96px;top:962px;margin:0;font:500 24px/1 var(--font);color:#B9B9B4}
    .s-chain .ch-haze{position:absolute;left:-20px;top:220px;width:380px;height:600px;border-radius:50%;pointer-events:none;opacity:.2;will-change:transform,opacity;background:radial-gradient(closest-side,rgba(255,131,0,.55),rgba(233,89,12,.2) 60%,rgba(233,89,12,0))}
    .s-chain.active .ch-haze{animation:chBreath 4.4s ease-in-out infinite}
    @keyframes chBreath{50%{transform:scale(1.07,1.04)}}
    body.calm .s-chain *{animation:none!important}`,
  init(ctx) {
    const svg = ctx.q('.ch-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg), clamp = Fx.clamp, E = Fx.ease;
    /* ---------- defs */
    const defs = mk('defs');
    const lg = (id, x1, y1, x2, y2, stops) => { const g = mk('linearGradient', { id, x1, y1, x2, y2 }, defs); stops.forEach(([o, c, a]) => mk('stop', { offset: o, 'stop-color': c, 'stop-opacity': a == null ? 1 : a }, g)); };
    lg('ch-merc', 0, 1, 0, 0, [[0, '#E9590C'], [1, '#FFC48A']]);
    lg('ch-bar', 0, 1, 0, 0, [[0, '#E9590C'], [1, '#FFB366']]);
    /* ---------- the thermometer */
    const TX = 170, TW = 44, BY = 724;
    const th = mk('g', { 'data-step': 0 });
    ctx.haze = ctx.q('.ch-haze');
    mk('rect', { x: TX - TW / 2, y: 300, width: TW, height: 420, rx: 22, fill: 'rgba(255,255,255,.04)', stroke: 'rgba(255,255,255,.38)', 'stroke-width': 2.5 }, th);
    for (let y = 340; y <= 680; y += 40) mk('line', { x1: TX - TW / 2 - 22, y1: y, x2: TX - TW / 2 - 8, y2: y, stroke: 'rgba(255,255,255,.28)', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, th);
    ctx.merc = mk('rect', { x: TX - 12, y: BY, width: 24, height: 0, rx: 12, fill: 'url(#ch-merc)', filter: 'url(#fx-glow-soft)' }, th);
    mk('circle', { cx: TX, cy: BY, r: 40, fill: 'url(#ch-merc)', stroke: '#FFB366', 'stroke-width': 3, filter: 'url(#fx-glow-soft)' }, th);
    mk('circle', { cx: TX - 11, cy: BY - 12, r: 9, fill: 'rgba(255,255,255,.35)' }, th);
    /* ---------- roads: heat to each lane, and across each lane */
    const road = (d, step, delay) => {
      const g = mk('g', { 'data-step': step, 'data-delay': delay || 0 }), p = mk('path', { d, fill: 'none', stroke: 'rgba(255,255,255,.22)', 'stroke-width': 2.4, 'stroke-dasharray': '2 9', 'stroke-linecap': 'round' }, g);
      const m = d.match(/L(\d+) (\d+)$/), ex = +m[1], ey = +m[2];
      mk('polygon', { points: `${ex + 4},${ey} ${ex - 9},${ey - 8} ${ex - 9},${ey + 8}`, fill: '#FF8300', filter: 'url(#fx-glow-u)' }, g);
      const f = ctx.flow(p, { color: '#FF8300', count: 3, speed: 170, r: 6, tail: 6, tailGap: 12 }); f.stop().show(false); return f;
    };
    ctx.fl = [road('M204 380 L336 380', 1), road('M1044 380 L1120 380', 2), road('M204 640 L336 640', 3), road('M1044 640 L1120 640', 3, 1100)];
    /* ---------- card A: the published table (heavy work, WBGT in C: 27 needs no rest = 100% work, 27.5 = 75%, 29.5 = 50%, 31.5 = 25%).
       The line joins these published points with straight segments. Nothing is smoothed, so it never passes a value the table does not give. */
    const A = ctx.q('.ch-chart'), ax = (t) => 44 + 360 * (t - 27) / 4.5, ay = (c) => 98 - 88 * c;
    const P = [[27, 1], [27.5, .75], [29.5, .5], [31.5, .25]];
    const cap = (t) => { let k = 0; while (k < P.length - 2 && t > P[k + 1][0]) k++; const s = clamp((t - P[k][0]) / (P[k + 1][0] - P[k][0]), 0, 1); return P[k][1] + (P[k + 1][1] - P[k][1]) * s; };
    const dcv = P.map((p, i) => (i ? 'L' : 'M') + ax(p[0]).toFixed(1) + ' ' + ay(p[1]).toFixed(1)).join('');
    mk('line', { x1: 36, y1: 102, x2: 414, y2: 102, stroke: 'rgba(255,255,255,.22)', 'stroke-width': 2 }, A);
    mk('path', { d: dcv, fill: 'none', stroke: 'rgba(255,255,255,.2)', 'stroke-width': 3, 'stroke-dasharray': '3 8', 'stroke-linecap': 'round' }, A);
    ctx.aClip = mk('rect', { x: 0, y: -20, width: 0, height: 200 }, mk('clipPath', { id: 'ch-aclip' }, defs));
    mk('path', { d: dcv, fill: 'none', stroke: '#FF8300', 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', filter: 'url(#fx-glow-u)', 'clip-path': 'url(#ch-aclip)' }, A);
    ctx.aMarks = [27, 27.5, 29.5, 31.5].map((t) => {
      const g = mk('g', {}, A), lab = t !== 27.5; /* 27.5 is a published point too, drawn as a small dot with no label (it would touch the 27 label) */
      if (lab) {
        mk('line', { x1: ax(t), y1: 102, x2: ax(t), y2: 108, stroke: 'rgba(255,255,255,.4)', 'stroke-width': 2 }, g);
        mk('text', { x: ax(t), y: 128, 'text-anchor': 'middle', fill: '#D9D9D4', style: 'font:600 20px var(--font)', text: t + ' °C' }, g);
      }
      return { t, g, dot: mk('circle', { cx: ax(t), cy: ay(cap(t)), r: lab ? 7 : 5, fill: '#0B0B0C', stroke: '#FFB366', 'stroke-width': lab ? 3 : 2.5 }, g) };
    });
    ctx.aDot = mk('circle', { cx: ax(27), cy: ay(1), r: 11, fill: '#fff', filter: 'url(#fx-glow)' }, A);
    /* ---------- card C: injury risk bars (5 to 7 percent on 85 to 90 F days, 10 to 15 percent above 100 F) */
    const C = ctx.q('.ch-chart2'), BASE = 118, K = 5;
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
    const WC = 322, WR = 380;
    ctx.render = () => {
      const S = ctx.S, ez = E.outCubic;
      const h = E.inOutCubic(S.heat.v), top = BY - (BY - 322) * h;
      ctx.merc.setAttribute('y', top.toFixed(1)); ctx.merc.setAttribute('height', (BY + 6 - top).toFixed(1));
      ctx.haze.style.opacity = (.2 + .75 * h).toFixed(2);
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
    if (i === 3) { at(1900, () => Fx.sweep(ctx.q('.ch-d'))); at(3500, () => Fx.burstEl(ctx.e.dth, { n: 28, color: '#FF6B5E', speed: 360 })); }
    if (i === 4) { at(2500, () => { Fx.sweep(ctx.q('.ch-pay')); Fx.burstEl(ctx.e.liv, { n: 26, color: '#FFB366', speed: 340 }); }); }
  },
  static(ctx) {
    ctx.gen++;
    Object.values(ctx.S).forEach((s) => { s.v = s.t = 1; s.hold = 0; });
    ctx.render(); ctx.fl.forEach((f) => f.show(true).freeze());
  },
});
