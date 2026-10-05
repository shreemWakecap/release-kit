/* Slide: what a wrong decision costs. One idea: heat alone costs lives and hours, worldwide. Published numbers, each with its publisher and year.
   Step 0 a crowd of workers, dim. 1 the crowd heats up and 2.41 billion counts. 2 lives lost: 18,970. 3 work hours lost: 639 billion (a modelled loss).
   4 building sites in the US: 7% of workers, about 1 in 3 heat deaths.
   Numbers: S1-03 (ILO, 2020 data), S1-06 (The Lancet Countdown, 2024, modelled), S1-18 (CPWR, 2023 data). Lightning and gas have no verified outside numbers, so none are shown. */
Deck.add({
  id: 'stakes-lives', section: 'why', title: 'What a wrong decision costs', kicker: 'The stakes · Lives and hours', reality: ['stat'], short: true,
  steps: 4, ambient: { orb: 1.1, beam: .7, dust: 1 }, dur: [4000, 5200, 5200, 5200, 6500], minutes: 1,
  notes: [
    'Heat is our example of what a wrong decision costs.',
    'Step 1: billions of workers are in too much heat each year.',
    'Step 2: the estimate is 18,970 lives lost a year.',
    'Step 3: a model puts lost work at 639 billion hours.',
    'Step 4: in the US, building sites hold 7 in 100 workers.',
    'But they see about 1 in 3 heat deaths.',
    'If asked: ILO, 2020 data, report published April 2024. At least 2.41 billion workers in excessive heat, and 18,970 deaths a year. These are modelled estimates. The Lancet Countdown 2025 report, 2024 data: 639 billion potential work hours lost. It is a modelled potential loss, not a count. CPWR Data Bulletin, August 2025, 2023 data, USA: construction is 7 percent of US workers and 34.0 percent of heat deaths, which is 18 deaths. Say about 1 in 3. Lightning and gas have no verified outside numbers, so this slide leaves them out.',
  ].join('\n'),
  html: `
    <h2 class="h2 sl-h" data-step="0">What a wrong decision <span class="o glow-text">costs</span></h2>
    <p class="lead sl-sub" data-step="0" data-delay="200">Heat, worldwide.</p>
    <div class="sl-haze" aria-hidden="true"></div>
    <svg class="sl-svg" viewBox="0 0 1920 1080" width="1920" height="1080" role="img" aria-label="A crowd of workers heats up. Two cards show lives lost and work hours lost. A bar chart shows building sites in the US."></svg>
    <div class="sl-who" data-step="1">
      <div class="sl-pre">At least</div>
      <div class="sl-big"><b class="sl-n" data-k="who">0</b><span class="sl-u">billion</span></div>
      <div class="sl-lab">workers in too much heat</div>
      <div class="src">ILO estimate, 2020 data</div>
    </div>
    <div class="sl-card glass sweepable sl-lives" data-step="2">
      <svg class="sl-ico" viewBox="-60 -60 120 120" width="150" height="150" aria-hidden="true"></svg>
      <div class="sl-cb">
        <div class="sl-big"><b class="sl-n sl-red" data-k="lives">0</b></div>
        <div class="sl-lab">lives lost a year</div>
      </div>
      <div class="src">ILO estimate, 2020 data</div>
    </div>
    <div class="sl-card glass sweepable sl-hours" data-step="3">
      <svg class="sl-ico" viewBox="-60 -60 120 120" width="150" height="150" aria-hidden="true"></svg>
      <div class="sl-cb">
        <div class="sl-big"><b class="sl-n" data-k="hours">0</b><span class="sl-u">billion</span></div>
        <div class="sl-lab">work hours lost</div>
      </div>
      <span class="sl-chip">Modelled</span>
      <div class="src">The Lancet Countdown, 2024</div>
    </div>
    <div class="sl-strip" data-step="4">
      <div class="sl-sl">Building sites, US</div>
      <div class="src">CPWR, 2023 data</div>
      <div class="sl-row r1"><span class="k">Share of workers</span><span class="tr"><i class="f" data-k="w"></i><b class="v" data-k="wv">7%</b></span></div>
      <div class="sl-row r2"><span class="k">Share of heat deaths</span><span class="tr"><i class="f" data-k="d"></i><b class="v" data-k="dv">About 1 in 3</b></span></div>
    </div>`,
  css: `
    .s-stakes-lives .sl-h{position:absolute;left:96px;top:104px;width:1700px;font-size:62px}
    .s-stakes-lives .sl-sub{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-stakes-lives .sl-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-stakes-lives .sl-who{position:absolute;left:96px;top:262px;width:680px}
    .s-stakes-lives .sl-pre{font:700 22px/1 var(--font);letter-spacing:.16em;text-transform:uppercase;color:var(--wc-orange-soft)}
    .s-stakes-lives .sl-big{display:flex;align-items:baseline;gap:18px;white-space:nowrap}
    .s-stakes-lives .sl-who .sl-big{margin-top:12px}
    .s-stakes-lives .sl-n{display:inline-block;font:900 108px/1 var(--font);letter-spacing:-.04em;font-variant-numeric:tabular-nums;color:#fff;text-shadow:0 0 34px rgba(255,131,0,.6),0 0 90px rgba(255,131,0,.28)}
    .s-stakes-lives .sl-n.sl-red{text-shadow:0 0 34px rgba(255,77,77,.55),0 0 90px rgba(255,77,77,.25)}
    .s-stakes-lives .sl-u{font:700 46px/1 var(--font);color:#D9D9D4}
    .s-stakes-lives .sl-lab{margin-top:10px;font:500 30px/1.15 var(--font);color:#D9D9D4;white-space:nowrap}
    .s-stakes-lives .src{color:#9A9A94;font-size:18px}
    .s-stakes-lives .sl-who .src{margin-top:8px}
    .s-stakes-lives .sl-card{position:absolute;top:500px;width:852px;height:290px}
    .s-stakes-lives .sl-lives{left:96px}
    .s-stakes-lives .sl-hours{left:972px}
    .s-stakes-lives .sl-ico{position:absolute;left:44px;top:70px;overflow:visible}
    .s-stakes-lives .sl-cb{position:absolute;left:250px;top:40px}
    .s-stakes-lives .sl-card .sl-n{font-size:136px}
    .s-stakes-lives .sl-card .sl-u{font-size:56px}
    .s-stakes-lives .sl-card .sl-lab{margin-top:12px;font-size:34px}
    .s-stakes-lives .sl-card .src{position:absolute;left:250px;bottom:30px}
    .s-stakes-lives .sl-chip{position:absolute;right:30px;top:28px;padding:9px 18px;border-radius:999px;border:1.5px dashed rgba(255,179,102,.85);font:700 22px/1 var(--font);color:#FFB366;background:rgba(255,131,0,.08)}
    .s-stakes-lives .sl-ring{transform-box:fill-box;transform-origin:center;opacity:0}
    .s-stakes-lives.active .sl-lives.in .sl-ring{animation:slRing 2.8s var(--ease) infinite}
    @keyframes slRing{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.55);opacity:0}}
    .s-stakes-lives .sl-strip{position:absolute;left:96px;top:822px;width:1728px;height:150px;border-top:1px solid rgba(255,255,255,.12)}
    .s-stakes-lives .sl-sl{position:absolute;left:0;top:20px;font:700 22px/1 var(--font);letter-spacing:.16em;text-transform:uppercase;color:var(--wc-orange-soft)}
    .s-stakes-lives .sl-strip .src{position:absolute;right:0;top:18px}
    .s-stakes-lives .sl-row{position:absolute;left:0;width:1700px;height:36px;display:flex;align-items:center}
    .s-stakes-lives .sl-row.r1{top:58px}
    .s-stakes-lives .sl-row.r2{top:104px}
    .s-stakes-lives .sl-row .k{flex:none;width:340px;font:600 28px/1 var(--font);color:#D9D9D4}
    .s-stakes-lives .sl-row .tr{position:relative;flex:none;width:1200px;height:26px;border-radius:13px;background:rgba(255,255,255,.09)}
    .s-stakes-lives .sl-row .f{position:absolute;left:0;top:0;height:26px;width:0;border-radius:13px;background:linear-gradient(90deg,#E9590C,#FFB366);box-shadow:0 0 22px rgba(255,131,0,.55)}
    .s-stakes-lives .sl-row .v{position:absolute;top:-4px;left:0;font:800 34px/1 var(--font);color:#fff;white-space:nowrap;opacity:0}
    .s-stakes-lives .sl-haze{position:absolute;left:528px;top:214px;width:1360px;height:260px;border-radius:50%;pointer-events:none;opacity:0;will-change:transform,opacity;background:radial-gradient(closest-side,rgba(255,131,0,.7),rgba(233,89,12,.32) 60%,rgba(233,89,12,0))}
    .s-stakes-lives.active .sl-haze{animation:slBreath 4.6s ease-in-out infinite}
    @keyframes slBreath{50%{transform:scale(1.05,1.1)}}
    body.calm .s-stakes-lives *{animation:none!important}
    body.calm .s-stakes-lives .sl-ring{opacity:0}`,
  init(ctx) {
    const svg = ctx.q('.sl-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg), clamp = Fx.clamp, E = Fx.ease;
    const COLS = 40, ROWS = 3, X0 = 608, Y0 = 292, PX = 30, PY = 44;
    const DIM = [74, 74, 80], LIT = [255, 131, 0];
    const mix = (k) => 'rgb(' + DIM.map((d, j) => Math.round(d + (LIT[j] - d) * k)).join(',') + ')';
    /* gradients */
    const defs = mk('defs');
    const lg = mk('linearGradient', { id: 'sl-trail', x1: 0, y1: 0, x2: 1, y2: 0 }, defs);
    mk('stop', { offset: 0, 'stop-color': '#FF8300', 'stop-opacity': 0 }, lg); mk('stop', { offset: 1, 'stop-color': '#FFB366', 'stop-opacity': .5 }, lg);
    /* heat glow behind the crowd (a plain layer, so its slow breathing never repaints the svg) */
    ctx.glow = ctx.q('.sl-haze');
    /* the crowd: 3 rows x 36 workers, one group per column so a wave of heat can sweep across */
    const crowd = mk('g', {});
    ctx.cols = [];
    for (let c = 0; c < COLS; c++) {
      const g = mk('g', { fill: mix(0) }, crowd);
      for (let r = 0; r < ROWS; r++) {
        const x = X0 + c * PX, y = Y0 + r * PY;
        mk('circle', { cx: x + 10, cy: y + 5.5, r: 5.5 }, g);
        mk('path', { d: `M${x} ${y + 26} C${x} ${y + 16} ${x + 4} ${y + 12.5} ${x + 10} ${y + 12.5} C${x + 16} ${y + 12.5} ${x + 20} ${y + 16} ${x + 20} ${y + 26} Z` }, g);
      }
      ctx.cols.push(g);
    }
    /* the light that sweeps across the crowd */
    const BH = PY * (ROWS - 1) + 26;
    ctx.band = mk('g', { opacity: 0 });
    mk('rect', { x: -190, y: Y0 - 26, width: 190, height: BH + 52, fill: 'url(#sl-trail)' }, ctx.band);
    mk('rect', { x: -2, y: Y0 - 30, width: 4, height: BH + 60, rx: 2, fill: '#FFE2C2', filter: 'url(#fx-glow-u)' }, ctx.band);
    /* feeds: the crowd flows into each card */
    const feed = (d, col, step) => {
      const g = mk('g', { 'data-step': step }), p = mk('path', { d, fill: 'none', stroke: 'rgba(255,255,255,.2)', 'stroke-width': 2, 'stroke-dasharray': '2 9', 'stroke-linecap': 'round' }, g);
      const f = ctx.flow(p, { color: col, count: 3, speed: 150, r: 6, tail: 6, tailGap: 11 }); f.stop().show(false); return f;
    };
    ctx.fl = [feed('M900 424 C900 480 522 450 522 496', '#FF6B5E', 2), feed('M1500 424 C1500 480 1398 450 1398 496', '#FFB366', 3)];
    /* icons */
    const ico = (sel, draw) => { const g = mk('g', {}, ctx.q(sel)); draw(g); return g; };
    ico('.sl-lives .sl-ico', (g) => {
      mk('circle', { r: 54, fill: 'rgba(255,77,77,.08)', stroke: '#FF4D4D', 'stroke-width': 4, filter: 'url(#fx-glow-soft)' }, g);
      mk('circle', { class: 'sl-ring', r: 54, fill: 'none', stroke: '#FF4D4D', 'stroke-width': 2 }, g);
      mk('circle', { cx: 0, cy: -19, r: 15, fill: 'none', stroke: '#fff', 'stroke-width': 5 }, g);
      mk('path', { d: 'M-28 30 C-28 6 -14 0 0 0 C14 0 28 6 28 30', fill: 'none', stroke: '#fff', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
    });
    ico('.sl-hours .sl-ico', (g) => {
      mk('circle', { r: 54, fill: 'rgba(255,131,0,.08)', stroke: '#FF8300', 'stroke-width': 4, filter: 'url(#fx-glow-soft)' }, g);
      [0, 90, 180, 270].forEach((a) => mk('line', { x1: 0, y1: -46, x2: 0, y2: -38, stroke: '#FFB366', 'stroke-width': 3, 'stroke-linecap': 'round', transform: `rotate(${a})` }, g));
      ctx.hourHand = mk('line', { x1: 0, y1: 0, x2: 0, y2: -24, stroke: '#fff', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
      ctx.minHand = mk('line', { x1: 0, y1: 0, x2: 0, y2: -38, stroke: '#FFB366', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
      mk('circle', { r: 5, fill: '#fff' }, g);
    });
    /* state: every animated value has a value v and a target t, so forward, back and jumps always work */
    const el = (k) => ctx.q(`[data-k="${k}"]`);
    ctx.n = { who: el('who'), lives: el('lives'), hours: el('hours') };
    ctx.bars = { w: el('w'), d: el('d'), wv: el('wv'), dv: el('dv') };
    ctx.S = { crowd: { v: 0, t: 0, d: 1.8, hold: 0 }, lives: { v: 0, t: 0, d: 1.8, hold: 0 }, hours: { v: 0, t: 0, d: 1.8, hold: 0 }, strip: { v: 0, t: 0, d: 1.3, hold: 0 } };
    ctx.setT = (k, t, snap, hold) => { const s = ctx.S[k]; s.t = t; s.hold = snap ? 0 : (hold || 0) / 1000; if (snap) s.v = t; };
    const TRACK = 1200, W7 = TRACK * .07, W34 = TRACK * .34;
    ctx.render = () => {
      const S = ctx.S, ez = E.outCubic;
      const p = S.crowd.v, lead = p * (COLS + 4);
      ctx.cols.forEach((g, c) => { const k = clamp(lead - c, 0, 1); g.setAttribute('fill', mix(k)); if (k > .02) g.setAttribute('filter', 'url(#fx-glow)'); else g.removeAttribute('filter'); });
      ctx.band.setAttribute('transform', `translate(${(X0 + lead * PX - 6).toFixed(1)} 0)`);
      ctx.band.setAttribute('opacity', (clamp(p * 10, 0, 1) * clamp((1 - p) * 10, 0, 1)).toFixed(2));
      ctx.glow.style.opacity = (clamp(p * 1.6, 0, 1) * .85).toFixed(2);
      ctx.n.who.textContent = Fx.fmt(2.41 * ez(p), 2);
      ctx.n.lives.textContent = Fx.fmt(Math.round(18970 * ez(S.lives.v)), 0);
      ctx.n.hours.textContent = Fx.fmt(Math.round(639 * ez(S.hours.v)), 0);
      const a = ez(S.hours.v);
      ctx.minHand.setAttribute('transform', `rotate(${(a * 720).toFixed(1)})`); ctx.hourHand.setAttribute('transform', `rotate(${(a * 60).toFixed(1)})`);
      const e = E.outCubic(S.strip.v), w7 = W7 * e, w34 = W34 * e;
      ctx.bars.w.style.width = w7.toFixed(1) + 'px'; ctx.bars.d.style.width = w34.toFixed(1) + 'px';
      ctx.bars.wv.style.left = (w7 + 18).toFixed(1) + 'px'; ctx.bars.dv.style.left = (w34 + 18).toFixed(1) + 'px';
      ctx.bars.wv.style.opacity = clamp((e - .5) * 3, 0, 1).toFixed(2); ctx.bars.dv.style.opacity = clamp((e - .5) * 3, 0, 1).toFixed(2);
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
    const snap = !!instant || dir < 0 || ctx.calm, gen = ++ctx.gen;
    ctx.setT('crowd', i >= 1 ? 1 : 0, snap, 450);
    ctx.setT('lives', i >= 2 ? 1 : 0, snap, 500);
    ctx.setT('hours', i >= 3 ? 1 : 0, snap, 500);
    ctx.setT('strip', i >= 4 ? 1 : 0, snap, 500);
    ctx.fl.forEach((f, k) => { const on = i >= k + 2; f.show(on); if (on) f.start(); else f.stop(); });
    if (snap) { ctx.render(); return; }
    const at = (ms, fn) => ctx.after(ms, () => { if (gen === ctx.gen) fn(); });
    if (i === 1) at(2300, () => Fx.burstEl(ctx.n.who, { n: 26, color: '#FF8300', speed: 340 }));
    if (i === 2) { at(2350, () => { Fx.sweep(ctx.q('.sl-lives')); Fx.burstEl(ctx.n.lives, { n: 30, color: '#FF6B5E', speed: 380 }); }); }
    if (i === 3) at(2350, () => Fx.burstEl(ctx.n.hours, { n: 26, color: '#FF8300', speed: 340 }));
    if (i === 4) at(1800, () => Fx.burstEl(ctx.bars.d, { n: 20, color: '#FFB366', speed: 300 }));
  },
  static(ctx) {
    ctx.gen++;
    Object.values(ctx.S).forEach((s) => { s.v = s.t = 1; s.hold = 0; });
    ctx.render(); ctx.fl.forEach((f) => f.show(true).freeze());
  },
});
