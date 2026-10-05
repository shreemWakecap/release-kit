/* Slide 04: the cost of every call. One idea: every limit costs something on both sides, and the policy page shows it in days.
   Step 0 a glowing balance (people at risk / hours lost). 1 the real 30 day heat chart arrives, limit line glowing.
   2 red days light one by one, the counter counts to 8, the balance tips. 3 the same for wind: 1 day. 4 "A limit is a decision."
   Bars are traced from the live Safety Policy page (Project A): same 30 days, same limits, same red days. */
Deck.add({
  id: 'stakes', title: 'The cost of every decision', reality: ['live'],
  steps: 4, ambient: { orb: 1.1, beam: .85, dust: 1 }, dur: [4200, 4600, 6200, 7000, 6200], minutes: 1,
  notes: `Every decision to stop work has a cost. Stop too late, and people are at risk. Stop too early, and hours are lost.
Step 1: this is a real page from a live project. It shows 30 days of heat, and the limit.
Step 2: each red bar is a day the limit would have stopped work. For heat, that is 8 of 30 days.
Step 3: for wind, it is 1 of 30 days.
Step 4: a limit is a decision. This page shows its cost in days, before anyone sets it.
If asked: the limits on that page are 46 °C for heat and 32 km/h for wind. When we captured it, the heat index was 50.1 °C, in Danger, with 30 minutes of work, 10 minutes of rest and 250 ml of water every 15 minutes. The bars are redrawn from the live page: same 30 days, same limits, same red days.`,
  html: `
    <svg class="sk-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <linearGradient id="sk-beam" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#E9590C"/><stop offset=".5" stop-color="#FFE2C2"/><stop offset="1" stop-color="#E9590C"/></linearGradient>
      <linearGradient id="sk-post" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="rgba(255,255,255,.26)"/><stop offset=".5" stop-color="rgba(255,255,255,.05)"/><stop offset="1" stop-color="rgba(255,255,255,.2)"/></linearGradient>
      <linearGradient id="sk-pan" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="rgba(255,176,90,.42)"/><stop offset="1" stop-color="rgba(255,131,0,.05)"/></linearGradient>
      <radialGradient id="sk-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="rgba(255,190,120,.34)"/><stop offset="1" stop-color="rgba(255,170,90,0)"/></radialGradient>
      <linearGradient id="sk-core" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="rgba(255,226,194,0)"/><stop offset=".22" stop-color="rgba(255,226,194,.95)"/><stop offset=".78" stop-color="rgba(255,226,194,.95)"/><stop offset="1" stop-color="rgba(255,226,194,0)"/></linearGradient>
      <radialGradient id="sk-dglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="rgba(255,150,40,.6)"/><stop offset=".45" stop-color="rgba(255,131,0,.24)"/><stop offset="1" stop-color="rgba(255,131,0,0)"/></radialGradient>
      <radialGradient id="sk-floor" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="rgba(255,131,0,.55)"/><stop offset="1" stop-color="rgba(255,131,0,0)"/></radialGradient>
      <filter id="sk-cf" filterUnits="userSpaceOnUse" x="-30" y="-40" width="60" height="300"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="sk-red" x="-260%" y="-40%" width="620%" height="180%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs></svg>
    <h2 class="h2 sk-h" data-step="0">The cost of <span class="o glow-text">every decision</span></h2>
    <div class="sk-bal-wrap"><svg class="sk-bal" viewBox="0 0 1100 700" width="1100" height="700"></svg></div>
    <div class="sk-row sk-heat">
      <div class="sk-txt"><div class="sk-lab">Heat limit</div><div class="sk-num"><b class="sk-n">0</b><span class="sk-u">of 30 days</span></div></div>
      <svg class="sk-chart" viewBox="0 0 754 210" width="754" height="210"></svg>
    </div>
    <div class="sk-row sk-wind">
      <div class="sk-txt"><div class="sk-lab">Wind limit</div><div class="sk-num"><b class="sk-n">0</b><span class="sk-u">of 30 days</span></div></div>
      <svg class="sk-chart" viewBox="0 0 754 210" width="754" height="210"></svg>
    </div>
    <p class="sk-close" data-step="4">A limit is a <span class="o glow-text">decision.</span></p>
    <p class="sk-foot" data-step="4" data-delay="700">Changing a limit changes when work stops.</p>`,
  css: `
    .s-stakes .sk-h{position:absolute;left:96px;top:112px;width:1500px;margin:0;font-size:64px}
    .s-stakes .sk-bal-wrap{position:absolute;left:0;top:0;width:1100px;height:700px;transform-origin:0 0;transform:translate(410px,226px);transition:transform 1.5s var(--ease)}
    .s-stakes.on1 .sk-bal-wrap{transform:translate(96px,330px) scale(.5)}
    .s-stakes .sk-bal{display:block;overflow:visible}
    .s-stakes .sk-pl{font:800 54px/1 var(--font);fill:#fff;text-anchor:middle}
    .s-stakes .sk-halo{transform-box:fill-box;transform-origin:center;animation:skBreath 4.2s ease-in-out infinite}
    @keyframes skBreath{50%{transform:scale(1.12);opacity:.8}}
    .s-stakes .sk-row{position:absolute;left:720px;width:1104px;height:230px;opacity:0;transition:opacity .9s var(--ease),transform 1.2s var(--ease)}
    .s-stakes .sk-heat{top:262px;transform:translateY(150px)}
    .s-stakes .sk-wind{top:552px;transform:translateY(26px)}
    .s-stakes .sk-row.on{opacity:1}
    .s-stakes .sk-heat.up,.s-stakes .sk-wind.on{transform:none}
    .s-stakes .sk-txt{position:absolute;left:0;top:34px;width:330px}
    .s-stakes .sk-lab{font:800 26px/1 var(--font);letter-spacing:.14em;text-transform:uppercase;color:var(--wc-orange-soft)}
    .s-stakes .sk-num{margin-top:14px;display:flex;align-items:baseline;gap:14px;white-space:nowrap;opacity:0;transition:opacity .5s var(--ease)}
    .s-stakes .sk-row.num .sk-num{opacity:1}
    .s-stakes .sk-n{display:inline-block;font:900 124px/1 var(--font);letter-spacing:-.04em;color:#fff;text-shadow:0 0 34px rgba(255,131,0,.6),0 0 90px rgba(255,131,0,.28)}
    .s-stakes .sk-n.tick{animation:skTick .45s var(--ease)}
    @keyframes skTick{0%{transform:scale(1.2)}100%{transform:none}}
    .s-stakes .sk-u{font:600 38px/1 var(--font);color:#D9D9D4}
    .s-stakes .sk-chart{position:absolute;left:350px;top:0;overflow:visible}
    .s-stakes .bar{fill:rgba(255,255,255,.26);transition:fill .5s var(--ease);transform:scaleY(0);transform-box:fill-box;transform-origin:50% 100%}
    .s-stakes .sk-row.on .bar{transform:scaleY(1);transition:fill .5s var(--ease),transform .8s cubic-bezier(.2,.9,.3,1.1) calc(var(--i) * 24ms + 350ms)}
    .s-stakes .bar.lit{fill:#FF4D4D;filter:url(#sk-red)}
    .s-stakes .dash{opacity:0}
    .s-stakes .sk-row.on .dash{opacity:1;transition:opacity .4s var(--ease) calc(var(--j) * 18ms + 1000ms)}
    .s-stakes .dash{transform-box:fill-box;transform-origin:center}
    .s-stakes .sk-row.pulse .dash{animation:skLim 1s ease-out calc(var(--j) * 18ms + 1700ms) 1 both}
    @keyframes skLim{0%{transform:scaleY(1)}35%{transform:scaleY(1.8)}100%{transform:scaleY(1)}}
    .s-stakes .sk-close{position:absolute;left:96px;top:846px;width:1728px;margin:0;text-align:center;font:800 78px/1.1 var(--font);letter-spacing:-.03em;color:#fff}
    .s-stakes .sk-foot{position:absolute;left:96px;top:954px;width:1728px;margin:0;text-align:center;font:500 22px/1.3 var(--font);color:#8E8E89}
    .s-stakes.no-trans .sk-bal-wrap,.s-stakes.no-trans .sk-row,.s-stakes.no-trans .sk-num,.s-stakes.no-trans .bar,.s-stakes.no-trans .dash,
    body.calm .s-stakes .sk-bal-wrap,body.calm .s-stakes .sk-row,body.calm .s-stakes .sk-num,body.calm .s-stakes .bar,body.calm .s-stakes .dash{transition:none!important}
    body.calm .s-stakes .sk-halo,body.calm .s-stakes .sk-n,body.calm .s-stakes .dash{animation:none!important}`,
  init(ctx) {
    const mk = Fx.el, N = 30, PITCH = 25, BW = 17, X0 = 6, BASE = 200, HP = 180, CW = 754;
    const tilt = (n) => 3.4 * Math.sqrt(n);
    /* ---------------------------------------------------------- the balance */
    const svg = ctx.q('.sk-bal'), PX = 550, PY = 150, L = 340;
    mk('ellipse', { cx: PX, cy: 664, rx: 250, ry: 30, fill: 'url(#sk-floor)' }, svg);
    mk('rect', { x: PX - 124, y: 640, width: 248, height: 18, rx: 9, fill: '#17171B', stroke: 'rgba(255,255,255,.3)', 'stroke-width': 1.6 }, svg);
    mk('rect', { x: PX - 11, y: PY + 24, width: 22, height: 466, rx: 11, fill: 'url(#sk-post)', stroke: 'rgba(255,255,255,.24)', 'stroke-width': 1.4 }, svg);
    const beam = mk('g', {}, svg);
    mk('rect', { x: PX - L - 16, y: PY - 8, width: 2 * L + 32, height: 16, rx: 8, fill: 'url(#sk-beam)', filter: 'url(#fx-glow-soft)' }, beam);
    [-L, L].forEach((dx) => mk('circle', { cx: PX + dx, cy: PY, r: 13, fill: '#FFE2C2', filter: 'url(#fx-glow)' }, beam));
    mk('circle', { class: 'sk-halo', cx: PX, cy: PY, r: 84, fill: 'url(#g-core)', opacity: .5 }, svg);
    ctx.orb = mk('circle', { cx: PX, cy: PY, r: 31, fill: '#FF8300', filter: 'url(#fx-glow-soft)' }, svg);
    mk('circle', { cx: PX, cy: PY, r: 18, fill: '#FFB366' }, svg);
    const pan = (label, draw) => {
      const g = mk('g', {}, svg);
      mk('path', { d: 'M0 0 L-128 276 M0 0 L128 276', stroke: 'rgba(255,214,170,.6)', 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' }, g);
      mk('path', { d: 'M-140 276 Q0 380 140 276 Z', fill: 'url(#sk-pan)', stroke: '#FF8300', 'stroke-width': 4, 'stroke-linejoin': 'round', filter: 'url(#fx-glow-soft)' }, g);
      mk('ellipse', { cx: 0, cy: 276, rx: 140, ry: 14, fill: 'rgba(255,160,70,.28)', stroke: '#FFB366', 'stroke-width': 3.5 }, g);
      draw(mk('g', { transform: 'translate(0 228) scale(1.25)', fill: 'rgba(255,255,255,.1)', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', filter: 'url(#fx-glow-soft)' }, g));
      mk('text', { class: 'sk-pl', x: 0, y: 424, text: label }, g);
      return g;
    };
    const panL = pan('People at risk', (ic) => { mk('circle', { cx: 0, cy: -22, r: 15, stroke: '#fff' }, ic); mk('path', { d: 'M-28 36 C-28 6 -14 -2 0 -2 C14 -2 28 6 28 36', stroke: '#fff' }, ic); });
    const panR = pan('Hours lost', (ic) => { mk('circle', { cx: 0, cy: 0, r: 36, stroke: '#FFB366' }, ic); mk('path', { d: 'M0 -20 V0 L16 11', stroke: '#FFB366', fill: 'none' }, ic); });
    ctx.bal = { theta: 0, vel: 0, target: 0, sway: 2.4, swayTo: 2.4, t: 0 };
    ctx.drawBal = () => {
      const b = ctx.bal, th = b.theta + b.sway * Math.sin(b.t * 1.15), r = th * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
      beam.setAttribute('transform', `rotate(${th.toFixed(3)} ${PX} ${PY})`);
      panL.setAttribute('transform', `translate(${(PX - L * c).toFixed(2)} ${(PY - L * s).toFixed(2)})`);
      panR.setAttribute('transform', `translate(${(PX + L * c).toFixed(2)} ${(PY + L * s).toFixed(2)})`);
    };
    ctx.drawBal();
    /* ---------------------------------------------------------- the two charts (traced from the live page) */
    const DATA = {
      heat: { v: [0.347, 0.449, 0.694, 0.816, 0.745, 0.592, 0.745, 0.714, 0.663, 0.622, 0.663, 0.5, 0.541, 0.592, 0.459, 0.418, 0.276, 0.347, 0.48, 0.663, 0.612, 0.49, 0.5, 0.622, 0.143, 0.255, 0.224, 0.337, 0.459, 0.306], hot: [2, 3, 4, 6, 7, 8, 10, 19], lim: 0.6429 },
      wind: { v: [0.643, 0.551, 0.857, 0.551, 0.765, 0.327, 0.398, 0.357, 0.357, 0.235, 0.551, 0.235, 0.694, 0.449, 0.449, 0.133, 0.398, 0.48, 0.531, 0.143, 0.306, 0.48, 0.163, 0.429, 0.663, 0.622, 0.5, 0.378, 0.571, 0.398], hot: [2], lim: 0.8469 },
    };
    const R = 4;
    const chart = (sel, key, d) => {
      const row = ctx.q(sel), s = row.querySelector('.sk-chart'), ly = BASE - d.lim * HP;
      mk('line', { x1: 0, y1: BASE + 5, x2: CW, y2: BASE + 5, stroke: 'rgba(255,255,255,.16)', 'stroke-width': 2 }, s);
      const bars = d.v.map((v0, i) => {
        const hot = d.hot.includes(i), v = hot ? Math.max(v0, d.lim + .012) : v0, x = X0 + i * PITCH, y = BASE - v * HP;
        const p = mk('path', { class: 'bar' + (hot ? ' hot' : ''), d: `M${x} ${BASE} V${y + R} Q${x} ${y} ${x + R} ${y} H${x + BW - R} Q${x + BW} ${y} ${x + BW} ${y + R} V${BASE} Z` }, s);
        p.style.setProperty('--i', i); return p;
      });
      const g = mk('g', {}, s);
      for (let x = 0, j = 0; x < CW - 6; x += 23, j++) {
        const d = mk('g', { class: 'dash', style: `--j:${j}` }, g);
        mk('ellipse', { cx: x + 7, cy: ly, rx: 25, ry: 16, fill: 'url(#sk-dglow)' }, d);
        mk('rect', { x, y: ly - 2, width: 14, height: 4, rx: 2, fill: '#FF8F1F' }, d);
        mk('rect', { x: x + 2, y: ly - .8, width: 10, height: 1.6, rx: .8, fill: '#FFE9CC' }, d);
      }
      mk('clipPath', { id: 'sk-clip-' + key }, mk('defs', {}, s)).appendChild(mk('rect', { x: -8, y: -30, width: CW + 16, height: BASE + 56 }));
      const band = mk('g', { opacity: 0, transform: 'translate(-200 0)' }, mk('g', { 'clip-path': `url(#sk-clip-${key})` }, s));
      mk('ellipse', { cx: 0, cy: 104, rx: 90, ry: 150, fill: 'url(#sk-glow)' }, band);
      mk('rect', { x: -1.5, y: -14, width: 3, height: 236, fill: 'url(#sk-core)', filter: 'url(#sk-cf)' }, band);
      return { row, bars, hot: d.hot.map((i) => bars[i]), hotIdx: d.hot, band, numEl: row.querySelector('.sk-n'), n: 0 };
    };
    const heat = chart('.sk-heat', 'heat', DATA.heat), wind = chart('.sk-wind', 'wind', DATA.wind);
    ctx.heat = heat; ctx.wind = wind; ctx.scan = null;
    /* ---------------------------------------------------------- helpers */
    const clear = (c) => { c.bars.forEach((b) => b.classList.remove('lit')); c.n = 0; c.numEl.textContent = '0'; c.row.classList.remove('num'); };
    const finish = (c) => { c.hot.forEach((b) => b.classList.add('lit')); c.n = c.hot.length; c.numEl.textContent = c.n; c.row.classList.add('num'); };
    const light = (c, k) => {
      const bar = c.hot[k];
      bar.style.transition = 'none'; bar.style.fill = '#fff'; void bar.getBoundingClientRect(); bar.style.transition = ''; bar.style.fill = ''; bar.classList.add('lit');
      c.n = k + 1; c.numEl.textContent = c.n; c.numEl.classList.remove('tick'); void c.numEl.offsetWidth; c.numEl.classList.add('tick');
      ctx.bal.target = tilt(c.n); ctx.bal.vel += 5;
      const r = bar.getBoundingClientRect(); Fx.burst(r.left + r.width / 2, r.top, { n: 8, color: '#FF6B5E', speed: 190, life: .7 });
    };
    const startScan = (c, per) => { clear(c); c.row.classList.add('num'); ctx.scan = { c, per, t: -1.2 * per, k: 0 }; };
    ctx.tick = (dt) => {
      const b = ctx.bal; b.t += dt;
      if (ctx.calm) { b.theta = b.target; b.vel = 0; b.sway = 0; }
      else { b.vel += (42 * (b.target - b.theta) - 8.5 * b.vel) * dt; b.theta += b.vel * dt; b.sway += (b.swayTo - b.sway) * Math.min(1, dt * 1.6); }
      ctx.drawBal();
      const s = ctx.scan; if (!s) return;
      const c = s.c, pos = (s.t += dt) / s.per;
      c.band.setAttribute('transform', `translate(${(X0 + BW / 2 + pos * PITCH).toFixed(1)} 0)`);
      c.band.setAttribute('opacity', Math.max(0, Math.min(1, (pos + .5) / 2, (N + 2 - pos) / 3)).toFixed(2));
      while (s.k < c.hot.length && pos >= c.hotIdx[s.k] + .34) light(c, s.k++);
      if (pos > N + 2) { c.band.setAttribute('opacity', 0); ctx.scan = null; Fx.burstEl(c.numEl, { n: 26, color: '#FF8300', speed: 360 }); }
    };
    ctx.stepTo = (i, dir, instant) => {
      const b = ctx.bal, fwd = dir > 0 && !instant && !ctx.calm;
      clearTimeout(ctx.pend); ctx.scan = null; heat.band.setAttribute('opacity', 0); wind.band.setAttribute('opacity', 0);
      heat.row.classList.toggle('pulse', fwd && i === 1); wind.row.classList.toggle('pulse', fwd && i === 3);
      ctx.root.classList.toggle('on1', i >= 1);
      heat.row.classList.toggle('on', i >= 1); heat.row.classList.toggle('up', i >= 3); wind.row.classList.toggle('on', i >= 3);
      if (i >= 3 || (i === 2 && !fwd)) finish(heat); else { clear(heat); if (i === 2) ctx.pend = ctx.after(550, () => startScan(heat, .07)); }
      if (i >= 4 || (i === 3 && !fwd)) finish(wind); else { clear(wind); if (i === 3) ctx.pend = ctx.after(2100, () => startScan(wind, .035)); }
      b.swayTo = i === 0 ? 2.4 : .5;
      b.target = i >= 4 ? 0 : i === 3 ? tilt(wind.n) : i === 2 ? tilt(heat.n) : 0;
      if (!fwd) { b.theta = b.target; b.vel = 0; b.sway = b.swayTo; ctx.drawBal(); }
      if (fwd && i === 4) { b.vel -= 4; ctx.after(500, () => Fx.burstEl(ctx.orb, { n: 44, color: '#FFB366', speed: 430 })); }
    };
  },
  enter(ctx, dir) {
    /* start clean: reset to step 0 without animation, then let the balance swing into place */
    const R = ctx.root; R.classList.add('no-trans'); ctx.stepTo(0, 1, true); void R.offsetWidth; requestAnimationFrame(() => R.classList.remove('no-trans'));
    if (dir > 0) ctx.bal.theta = -9;
    ctx.raf(ctx.tick);
  },
  step(ctx, i, dir, instant) { ctx.stepTo(i, dir, instant); },
  static(ctx) { ctx.stepTo(4, 1, true); },
});
