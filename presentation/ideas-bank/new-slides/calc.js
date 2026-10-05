/* Slide: Your-site calculator. Four sliders (workers, hours a day, hot days, heat) and published rates do the math.
   Rates (all from the verified shortlist, nothing else):
   - WHO and WMO 2025 (S1-08): worker output drops 2 to 3 percent for every degree above 20 C (WBGT).
   - Lancet Countdown 2025 (S1-06): 639 billion potential work hours lost in 2024 and US$1.09 trillion potential income loss. Modelled. Per hour = 1.09 trillion / 639 billion = US$1.71 (our division).
   - IZA 2021 (S1-09): injury risk +5 to 7 percent on 85 to 90 F days, +10 to 15 percent above 100 F (California).
   - SAR 3.75 = US$1 is the fixed bank rate, only used for the SAR switch (flagged in the report).
   An example, never a WakeCap result. Stat slide: publisher and year sit on the slide in .src lines. */
Deck.add({
  id: 'calc', section: 'numbers', title: 'Your site, published rates', kicker: 'The numbers · Your site', reality: ['stat'],
  steps: 4, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [4000, 5000, 5000, 5000, 6000], minutes: 1.5,
  notes: [
    'This is a calculator. It uses published rates, not our own results.',
    'Step 1: we set up a site. One thousand workers, eight hours a day, forty hot days, heat at thirty degrees.',
    'Hours lost come first. Each degree over twenty costs two to three percent of output. That rate is from the WHO and WMO.',
    'Step 2: hours become money. The Lancet Countdown puts about one dollar seventy on an hour. Tap riyals or dollars.',
    'Step 3: hot days also raise injury risk. A California study found five to fifteen percent more risk.',
    'Step 4: now drag the sliders yourself. Every rate shows its source. This is an example, not a WakeCap result.',
    'If asked: the rate is 2 to 3 percent for each degree above 20 °C WBGT (WHO and WMO, 2025). An hour is worth about US$1.71: US$1.09 trillion for 639 billion hours, a model (Lancet Countdown 2025, 2024 data). Riyals use the fixed rate of 3.75. Injury risk is 5 to 7 percent higher on 85 to 90 °F days and 10 to 15 percent higher above 100 °F (IZA 2021, California). For construction alone the same sum gives about US$2.70 an hour. Pay at your site will differ from this world average.',
  ].join('\n'),
  html: `
    <h2 class="h2 cc-h" data-step="0">Your site. <span class="o glow-text">Published rates.</span></h2>
    <p class="lead cc-lead" data-step="0" data-delay="200">Example only. Not a WakeCap result.</p>
    <div class="cc-in glass hot" data-step="0" data-delay="300" data-interactive>
      <div class="cc-rowi" data-k="w"><div class="cc-top"><span class="cc-lab">Workers</span><b class="cc-v">100</b></div><input class="cc-rng" type="range" min="100" max="5000" step="any" data-st="100" value="100" aria-label="Workers"></div>
      <div class="cc-rowi" data-k="h"><div class="cc-top"><span class="cc-lab">Hours a day</span><b class="cc-v">8</b></div><input class="cc-rng" type="range" min="4" max="12" step="any" data-st="1" value="8" aria-label="Hours a day"></div>
      <div class="cc-rowi" data-k="d"><div class="cc-top"><span class="cc-lab">Hot days</span><b class="cc-v">0</b></div><input class="cc-rng" type="range" min="0" max="120" step="any" data-st="5" value="0" aria-label="Hot days"></div>
      <div class="cc-rowi" data-k="t"><div class="cc-top"><span class="cc-lab">Heat (WBGT)</span><b class="cc-v">20 °C</b></div><input class="cc-rng" type="range" min="20" max="34" step="any" data-st="0.5" value="20" aria-label="Heat in degrees C"><div class="cc-sub">0 degrees over 20</div></div>
      <div class="cc-try" data-step="4" data-fx="pop">Drag the sliders</div>
    </div>
    <div class="cc-card cc-c1 glass sweepable" data-step="0" data-delay="450">
      <div class="cc-lb">Hours lost</div>
      <div class="cc-body">
        <div class="cc-rate">2 to 3% per degree over 20 °C</div>
        <div class="cc-num"><b class="a">0</b><i>to</i><b class="b">0</b><span class="u">hours</span></div>
        <div class="cc-day"><svg class="cc-pi" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#FFB366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="4"/><path d="M4 21c0-5 3.6-8 8-8s8 3 8 8"/></svg><div class="cc-day-bar"><div class="maybe"></div><div class="sure"></div></div><span class="cc-day-t">0 to 0 hours a day</span></div>
        <div class="src">WHO and WMO, 2025</div>
      </div>
    </div>
    <div class="cc-card cc-c2 glass sweepable" data-step="0" data-delay="600">
      <div class="cc-lb">Money lost</div>
      <div class="cc-body">
        <div class="cc-cw" data-interactive><button class="cc-cur on" data-c="SAR">SAR</button><button class="cc-cur" data-c="USD">US$</button></div>
        <div class="cc-rate">US$1.71 per hour</div>
        <div class="cc-num"><em class="cc-pre">SAR</em><b class="a">0</b><i>to</i><b class="b">0</b><span class="u"></span></div>
        <div class="src s1">Lancet Countdown, 2025. A model, world average.</div>
        <div class="src s2"><span>US$1.09 trillion for 639 billion hours.</span> <span>SAR 3.75 = US$1.</span></div>
      </div>
    </div>
    <div class="cc-card cc-c3 glass sweepable" data-step="0" data-delay="750">
      <div class="cc-lb">Injury risk</div>
      <div class="cc-body">
        <div class="cc-rate">5 to 15% higher</div>
        <div class="cc-num"><b class="a">0</b><span class="u">worker-days at risk</span></div>
        <div class="src"><span>IZA, 2021, California.</span> <span>5 to 7% at 85 to 90 °F,</span> <span>10 to 15% over 100 °F.</span></div>
      </div>
    </div>`,
  css: `
    .s-calc .cc-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-calc .cc-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-calc .cc-in{position:absolute;left:96px;top:290px;width:720px;height:676px;padding:34px 46px 30px;display:flex;flex-direction:column;justify-content:space-between}
    .s-calc .cc-top{display:flex;justify-content:space-between;align-items:baseline}
    .s-calc .cc-lab{font:600 30px/1 var(--font);color:#E6E6E2}
    .s-calc .cc-v{font:800 48px/1 var(--font);color:#fff;letter-spacing:-.02em;text-shadow:0 0 26px rgba(255,131,0,.5)}
    .s-calc .cc-sub{margin-top:0;font:500 24px/1 var(--font);color:var(--wc-orange-soft)}
    .s-calc .cc-rng{-webkit-appearance:none;appearance:none;display:block;width:100%;height:44px;margin:8px 0 0;background:transparent;cursor:pointer;outline:none;touch-action:none;--p:0%}
    .s-calc .cc-rng::-webkit-slider-runnable-track{height:12px;border-radius:6px;background:linear-gradient(90deg,var(--wc-orange) 0,var(--wc-orange) var(--p),rgba(255,255,255,.18) var(--p),rgba(255,255,255,.18) 100%)}
    .s-calc .cc-rng::-webkit-slider-thumb{-webkit-appearance:none;width:36px;height:36px;margin-top:-12px;border-radius:50%;background:#fff;border:7px solid var(--wc-orange);box-shadow:0 0 0 7px rgba(255,131,0,.16),0 0 26px rgba(255,131,0,.75)}
    .s-calc .cc-rng::-moz-range-track{height:12px;border-radius:6px;background:rgba(255,255,255,.18)}
    .s-calc .cc-rng::-moz-range-progress{height:12px;border-radius:6px;background:var(--wc-orange)}
    .s-calc .cc-rng::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:#fff;border:7px solid var(--wc-orange);box-shadow:0 0 26px rgba(255,131,0,.75)}
    .s-calc .cc-try{position:absolute;right:40px;top:-28px;padding:12px 24px;border-radius:999px;border:2px solid var(--wc-orange);background:#1d1106;color:#FFC98F;font:800 26px/1 var(--font);box-shadow:0 0 34px rgba(255,131,0,.5);animation:ccTry 1.8s ease-in-out infinite}
    .s-calc .cc-try.used{opacity:0!important;transition:opacity .4s}
    @keyframes ccTry{50%{box-shadow:0 0 56px rgba(255,131,0,.85)}}
    body.calm .s-calc .cc-try{animation:none}
    .s-calc .cc-card{position:absolute;left:860px;width:964px}
    .s-calc .cc-c1{top:290px;height:250px}
    .s-calc .cc-c2{top:556px;height:216px}
    .s-calc .cc-c3{top:790px;height:184px}
    .s-calc .cc-card{transition:opacity .75s var(--ease),transform .75s var(--ease),filter .75s var(--ease),border-color .7s var(--ease),background .7s var(--ease),box-shadow .7s var(--ease)}
    .s-calc .cc-card:not(.live){border:1.5px dashed rgba(255,255,255,.28);background:rgba(255,255,255,.02);box-shadow:none}
    .s-calc .cc-body{position:absolute;inset:0;opacity:0;transform:translateY(16px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
    .s-calc .cc-card.live .cc-body{opacity:1;transform:none}
    .s-calc.no-trans .cc-body,.s-calc.no-trans .cc-card,body.calm .s-calc .cc-body,body.calm .s-calc .cc-card{transition:none!important}
    .s-calc .cc-lb{position:absolute;left:34px;top:30px;font:800 24px/1 var(--font);letter-spacing:.14em;text-transform:uppercase;color:var(--wc-orange-soft);transition:color .7s var(--ease)}
    .s-calc .cc-card:not(.live) .cc-lb{color:rgba(255,179,102,.5)}
    .s-calc .cc-rate{position:absolute;right:28px;top:14px;padding:11px 22px;border-radius:999px;border:1.5px solid rgba(255,179,102,.7);background:rgba(255,131,0,.1);font:700 24px/1 var(--font);color:#FFE2C2;white-space:nowrap}
    .s-calc .cc-cw{position:absolute;left:250px;top:19px;display:flex;gap:8px}
    .s-calc .cc-cur{all:unset;cursor:pointer;padding:8px 18px;border-radius:999px;border:1.5px solid rgba(255,255,255,.3);font:800 22px/1 var(--font);color:#D9D9D4;transition:all .25s}
    .s-calc .cc-cur:hover{border-color:var(--wc-orange-soft);color:#fff}
    .s-calc .cc-cur.on{background:var(--wc-orange);border-color:var(--wc-orange);color:#0B0B0C;box-shadow:0 0 22px rgba(255,131,0,.55)}
    .s-calc .cc-num{position:absolute;left:34px;top:62px;display:flex;align-items:baseline;gap:16px;white-space:nowrap}
    .s-calc .cc-num b{font:900 74px/1 var(--font);letter-spacing:-.03em;color:#fff;text-shadow:0 0 34px rgba(255,131,0,.6),0 0 90px rgba(255,131,0,.28)}
    .s-calc .cc-num i{font:600 34px/1 var(--font);font-style:normal;color:#D9D9D4}
    .s-calc .cc-num .u,.s-calc .cc-num .cc-pre{font:600 34px/1 var(--font);font-style:normal;color:#D9D9D4}
    .s-calc .cc-card .src{position:absolute;left:34px;right:28px;bottom:14px;font-size:19px;color:#A3A39E;line-height:1.2}
    .s-calc .cc-c2 .src.s1{bottom:42px}
    .s-calc .cc-day{position:absolute;left:34px;right:34px;top:158px;display:flex;align-items:center;gap:16px}
    .s-calc .cc-pi{flex:none}
    .s-calc .cc-day-bar{position:relative;flex:1;height:24px;border-radius:7px;background:rgba(255,255,255,.2);overflow:hidden;--cell:12.5%}
    .s-calc .cc-day-bar div{position:absolute;top:0;bottom:0}
    .s-calc .cc-day-bar .sure{right:0;background:var(--wc-orange);box-shadow:0 0 18px rgba(255,131,0,.6)}
    .s-calc .cc-day-bar .maybe{background:repeating-linear-gradient(135deg,rgba(255,131,0,.7) 0 6px,rgba(255,131,0,.24) 6px 12px)}
    .s-calc .cc-day-bar::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0,transparent calc(var(--cell) - 3px),#101012 calc(var(--cell) - 3px),#101012 var(--cell))}
    .s-calc .cc-day-t{flex:none;font:600 24px/1 var(--font);color:#FFD2A3;white-space:nowrap}`,
  init(ctx) {
    const q = (s) => ctx.q(s), clamp = Fx.clamp, eio = Fx.ease.inOutCubic, KEYS = ['w', 'h', 'd', 't'];
    const ARR = { w: 100, h: 8, d: 0, t: 20 }, DEF = { w: 1000, h: 8, d: 40, t: 30 };
    const LO = .02, HI = .03, FLOOR = 20, USD_H = 1.09e12 / 639e9, SAR = 3.75;
    const S = Object.assign({}, ARR), F = { a: 0, b: 0, c: 0 }, tw = {}, rp = {};
    let cur = 'SAR', dirty = true;
    const inp = {}, val = {}, sub = q('.cc-sub');
    KEYS.forEach((k) => { inp[k] = q(`[data-k="${k}"] input`); val[k] = q(`[data-k="${k}"] .cc-v`); });
    const c1 = { a: q('.cc-c1 .a'), b: q('.cc-c1 .b'), u: q('.cc-c1 .u'), sure: q('.cc-day-bar .sure'), maybe: q('.cc-day-bar .maybe'), bar: q('.cc-day-bar'), t: q('.cc-day-t') };
    const c2 = { pre: q('.cc-c2 .cc-pre'), a: q('.cc-c2 .a'), b: q('.cc-c2 .b'), u: q('.cc-c2 .u'), card: q('.cc-c2') };
    const c3 = { a: q('.cc-c3 .a') };
    /* three significant digits, so we never show false precision */
    const sig = (v) => { if (v < 1000) return Math.round(v); const p = Math.pow(10, Math.floor(Math.log10(v)) - 2); return Math.round(v / p) * p; };
    const f0 = (v) => Fx.fmt(sig(v), 0), fm = (v, big) => Fx.fmt(v / 1e6, big >= 1e7 ? 1 : 2);
    const model = () => {
      const wh = S.w * S.h * S.d, g = Math.max(0, S.t - FLOOR), lo = Math.min(1, g * LO), hi = Math.min(1, g * HI), k = (cur === 'SAR' ? SAR : 1) * USD_H;
      return { wh, g, lo, hi, hLo: wh * lo, hHi: wh * hi, mLo: wh * lo * k, mHi: wh * hi * k, days: S.w * S.d };
    };
    const thumb = (k) => { const el = inp[k], mn = +el.min, mx = +el.max; el.value = S[k]; el.style.setProperty('--p', (100 * (S[k] - mn) / (mx - mn)).toFixed(2) + '%'); };
    const render = () => {
      const m = model(), t = Math.round(S.t * 2) / 2;
      val.w.textContent = Fx.fmt(Math.round(S.w), 0); val.h.textContent = Math.round(S.h); val.d.textContent = Math.round(S.d);
      val.t.textContent = (t % 1 ? t.toFixed(1) : t) + ' °C'; sub.textContent = Math.round(Math.max(0, S.t - FLOOR) * 2) / 2 + ' degrees over 20';
      const bigH = m.hHi >= 1e6, bigM = m.mHi >= 1e6;
      c1.a.textContent = bigH ? fm(m.hLo * F.a, m.hHi) : f0(m.hLo * F.a); c1.b.textContent = bigH ? fm(m.hHi * F.a, m.hHi) : f0(m.hHi * F.a); c1.u.textContent = (bigH ? 'million ' : '') + 'hours';
      c2.a.textContent = bigM ? fm(m.mLo * F.b, m.mHi) : f0(m.mLo * F.b); c2.b.textContent = bigM ? fm(m.mHi * F.b, m.mHi) : f0(m.mHi * F.b); c2.u.textContent = bigM ? 'million' : '';
      c3.a.textContent = f0(m.days * F.c);
      /* one worker, one hot day: the day bar */
      const H = Math.max(1, S.h), a = H * m.lo, b = H * m.hi, r = (n) => Math.round(n * 10) / 10;
      c1.bar.style.setProperty('--cell', (100 / H).toFixed(3) + '%');
      c1.sure.style.width = (100 * m.lo).toFixed(2) + '%'; c1.maybe.style.right = (100 * m.lo).toFixed(2) + '%'; c1.maybe.style.width = (100 * (m.hi - m.lo)).toFixed(2) + '%';
      c1.t.textContent = r(a) + ' to ' + r(b) + ' hours a day';
    };
    ctx.render = render;
    ctx.setAll = (o) => { KEYS.forEach((k) => { tw[k] = null; S[k] = o[k]; thumb(k); }); render(); };
    ctx.tweenAll = (o, ms, delay) => { const now = performance.now(); KEYS.forEach((k) => { tw[k] = { from: S[k], to: o[k], ms, t0: now + delay }; }); };
    ctx.setF = (o) => { Object.keys(o).forEach((k) => { rp[k] = null; F[k] = o[k]; }); render(); };
    ctx.rampF = (k, to, ms, delay) => { rp[k] = { from: F[k], to, ms, t0: performance.now() + delay }; };
    ctx.ARR = ARR; ctx.DEF = DEF; ctx.S = S; ctx.F = F; ctx.mark = () => { dirty = true; };
    ctx.loop = () => {
      const now = performance.now(); let d = dirty; dirty = false;
      KEYS.forEach((k) => { const t = tw[k]; if (!t) return; const p = clamp((now - t.t0) / t.ms, 0, 1); S[k] = t.from + (t.to - t.from) * eio(p); thumb(k); d = true; if (p >= 1) tw[k] = null; });
      Object.keys(rp).forEach((k) => { const t = rp[k]; if (!t) return; const p = clamp((now - t.t0) / t.ms, 0, 1); F[k] = t.from + (t.to - t.from) * Fx.ease.outCubic(p); d = true; if (p >= 1) rp[k] = null; });
      if (d) render();
    };
    /* the sliders: a person can drag any time. We stop the press from reaching the deck, so a drag never turns the slide. */
    ctx.qa('[data-interactive]').forEach((el) => el.addEventListener('pointerdown', (e) => e.stopPropagation()));
    KEYS.forEach((k) => {
      const el = inp[k], st = +el.dataset.st;
      el.addEventListener('pointerdown', () => { tw[k] = null; });
      el.addEventListener('input', () => { tw[k] = null; S[k] = Math.round(+el.value / st) * st; thumb(k); dirty = true; q('.cc-try').classList.add('used'); });
      el.addEventListener('pointerup', () => el.blur());
    });
    ctx.qa('.cc-cur').forEach((b) => b.addEventListener('click', () => {
      cur = b.dataset.c; ctx.qa('.cc-cur').forEach((x) => x.classList.toggle('on', x === b)); c2.pre.textContent = cur === 'SAR' ? 'SAR' : 'US$'; dirty = true; b.blur();
      if (ctx.active) Fx.burstEl(c2.a, { n: 12, color: '#FFB366', speed: 220 });
    }));
    ctx.setAll(ARR);
  },
  enter(ctx) { ctx.mark(); ctx.raf(ctx.loop); },
  step(ctx, i, dir, instant) {
    const go = !instant && dir > 0 && !ctx.calm;
    ctx.qa('.cc-card').forEach((c, n) => c.classList.toggle('live', i >= n + 1));
    if (i === 0) { ctx.q('.cc-try').classList.remove('used'); ctx.setAll(ctx.ARR); ctx.setF({ a: 0, b: 0, c: 0 }); return; }
    if (!go) { ctx.setAll(ctx.DEF); ctx.setF({ a: i >= 1 ? 1 : 0, b: i >= 2 ? 1 : 0, c: i >= 3 ? 1 : 0 }); return; }
    if (i === 1) { ctx.tweenAll(ctx.DEF, 1500, 250); ctx.setF({ a: 0, b: 0, c: 0 }); ctx.rampF('a', 1, 1500, 250); }
    if (i === 2) { ctx.setF({ a: 1, b: 0, c: 0 }); ctx.rampF('b', 1, 1300, 300); }
    if (i === 3) { ctx.setF({ a: 1, b: 1, c: 0 }); ctx.rampF('c', 1, 1300, 300); }
    if (i === 4) {
      ctx.setF({ a: 1, b: 1, c: 1 });
      ctx.after(250, () => Fx.sweep(ctx.q('.cc-c2')));
      ctx.after(900, () => Fx.burstEl(ctx.q('.cc-c2 .a'), { n: 26, color: '#FF8300', speed: 340 }));
    }
  },
  static(ctx) { ctx.setAll(ctx.DEF); ctx.setF({ a: 1, b: 1, c: 1 }); },
});
