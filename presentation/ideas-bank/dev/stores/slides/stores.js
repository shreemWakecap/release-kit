/* Slide: what is stored where. Three stores today (sensor data, our own data, alert data), each with a real size, and nothing that joins them.
   Facts (research C5): 1.5 million weather readings (internal cost doc, 10 Aug 2026, exactly 1,496,265; first reading May 2025; C5 3.1, 5.1, 14);
   31 tables, up from 10 in 70 days (counted in the code, 26 Jul to 4 Oct 2026; C5 1, 4, 12);
   9 event sources in the Observation Manager (code; C6 section 7 H1: nine sources, weather, SOS and permits among them; C5 2.4: one main table with a Source column);
   no foreign key across the databases (C5 section 1 and 7). The notification rules live in a fourth store (C6 H2), so the slide says events only. */
Deck.add({
  id: 'stores', section: 'bank', title: 'What is stored where', kicker: 'The data bank · Stored today', reality: ['code'], short: true,
  steps: 4, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [4000, 5000, 5000, 5000, 6200], minutes: 1.2,
  notes: [
    'Our data lives in three separate stores.',
    'Step 1: sensor data holds about 1.5 million weather readings.',
    'Step 2: our tables grew from 10 to 31 in 70 days.',
    'Step 3: alert data comes from nine sources.',
    'Step 4: nothing links the three, so each one stands alone.',
    'A single question cannot cross all three.',
    'If asked: the sensor store is a time series table owned by the sensors service. It held 1,496,265 weather readings on 10 Aug 2026, kept since May 2025. Our own database holds all three products, and had 10 tables on 26 Jul 2026 and 31 on 4 Oct 2026. The Observation Manager database has one main table of events from nine sources: weather, lightning, SOS, permits and more. Who gets told sits in the notification database next to it. Our backend reads the sensor store read only, and posts alerts one way to the Observation Manager. The Observation Manager reads people and zones from the app database, but none of these three stores links to another. Row counts and sizes come from an internal cost doc of 10 Aug 2026.',
  ].join('\n'),
  html: `
    <h2 class="h2 st-h" data-step="0">Three stores. <span class="o glow-text">Not joined.</span></h2>
    <div class="st-cw" style="left:96px" data-step="0" data-delay="150"><div class="st-card glass sweepable"></div></div>
    <div class="st-cw" style="left:720px" data-step="0" data-delay="300"><div class="st-card glass sweepable"></div></div>
    <div class="st-cw" style="left:1344px" data-step="0" data-delay="450"><div class="st-card glass sweepable"></div></div>
    <svg class="st-svg" viewBox="0 0 1920 1080" width="1920" height="1080" aria-hidden="true"></svg>
    <div class="st-t" style="left:96px" data-step="0" data-delay="500">Sensor data</div>
    <div class="st-t" style="left:720px" data-step="0" data-delay="650">Our data</div>
    <div class="st-t" style="left:1344px" data-step="0" data-delay="800">Alert data</div>
    <div class="st-num" style="left:96px" data-step="1"><b>0.0</b><i>million</i></div>
    <div class="st-unit" style="left:96px" data-step="1" data-delay="250">weather readings</div>
    <div class="st-tag" style="left:96px" data-step="1" data-delay="1100"><span>since May 2025</span></div>
    <div class="st-num" style="left:720px" data-step="2"><b>10</b></div>
    <div class="st-unit" style="left:720px" data-step="2" data-delay="250">tables</div>
    <div class="st-tag" style="left:720px" data-step="2" data-delay="1500"><span>from 10 in 70 days</span></div>
    <div class="st-num" style="left:1344px" data-step="3"><b>0</b></div>
    <div class="st-unit" style="left:1344px" data-step="3" data-delay="250">event sources</div>
    <div class="st-tag" style="left:1344px" data-step="3" data-delay="1500"><span>weather, SOS, permits</span></div>
    <div class="st-close" data-step="4" data-delay="500"><span class="o glow-text">No links</span> between them.</div>
    <div class="src st-src st-src-l" data-step="0" data-delay="900">1.5 million: internal doc, Aug 2026.</div>
    <div class="src st-src st-src-r" data-step="0" data-delay="900">Tables and sources: counted in code, Oct 2026.</div>`,
  css: `
    .s-stores .st-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-stores .st-cw{position:absolute;top:240px;width:480px;height:620px}
    .s-stores .st-card{width:100%;height:100%;transition:border-color .6s var(--ease),box-shadow .6s var(--ease)}
    .s-stores .st-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-stores .st-t{position:absolute;top:266px;width:480px;text-align:center;font:800 40px/1.1 var(--font);color:#fff}
    .s-stores .st-num{position:absolute;top:640px;width:480px;display:flex;justify-content:center;align-items:baseline;gap:14px;white-space:nowrap}
    .s-stores .st-num b{display:inline-block;font:900 108px/1 var(--font);letter-spacing:-.04em;color:#fff;text-shadow:0 0 34px rgba(255,131,0,.6),0 0 90px rgba(255,131,0,.28)}
    .s-stores .st-num b.tick{animation:stoTick .45s var(--ease)}
    @keyframes stoTick{0%{transform:scale(1.14)}100%{transform:none}}
    .s-stores .st-num i{font:600 38px/1 var(--font);font-style:normal;color:#D9D9D4}
    .s-stores .st-unit{position:absolute;top:756px;width:480px;text-align:center;font:500 30px/1.2 var(--font);color:#D9D9D4}
    .s-stores .st-tag{position:absolute;top:800px;width:480px;text-align:center}
    .s-stores .st-tag span{display:inline-block;padding:9px 20px;border-radius:999px;border:1px solid rgba(255,179,102,.5);background:rgba(255,131,0,.1);font:700 24px/1 var(--font);color:#FFD2A3}
    .s-stores .st-close{position:absolute;left:96px;top:884px;width:1728px;text-align:center;font:800 62px/1.05 var(--font);letter-spacing:-.03em;color:#fff}
    .s-stores .st-src{position:absolute;top:968px}
    .s-stores .st-src-l{left:96px}
    .s-stores .st-src-r{right:96px;text-align:right}
    .s-stores .cy-f{fill:rgba(255,255,255,.035);stroke:none}
    .s-stores .cy-b{fill:none;stroke:rgba(255,255,255,.3);stroke-width:2.5;stroke-linejoin:round;transition:stroke .6s var(--ease),filter .6s var(--ease)}
    .s-stores .cy-t{fill:rgba(255,255,255,.07);stroke:rgba(255,255,255,.36);stroke-width:2.5;transition:stroke .6s var(--ease),filter .6s var(--ease)}
    .s-stores .cy-b.on{stroke:#FF8300;filter:url(#fx-glow-soft)}
    .s-stores .cy-t.on{stroke:#FFB366}
    .s-stores .sq{opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.3);transition:opacity .45s var(--ease),transform .6s cubic-bezier(.2,1.4,.3,1)}
    .s-stores .sq.on{opacity:1;transform:none}
    .s-stores .sq.old{fill:rgba(255,255,255,.34);stroke:rgba(255,255,255,.5);stroke-width:1.5}
    .s-stores .sq.new{fill:#FF8300;stroke:#FFC48A;stroke-width:1.5;filter:url(#fx-glow)}
    .s-stores .dt{opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.3);transition:opacity .45s var(--ease),transform .6s cubic-bezier(.2,1.4,.3,1)}
    .s-stores .dt.on{opacity:1;transform:none}
    .s-stores .slot{fill:rgba(255,255,255,.1)}
    .s-stores .gp{opacity:0;transition:opacity .9s var(--ease)}
    .s-stores .gp.on{opacity:1}
    .s-stores.no-trans .sq,.s-stores.no-trans .dt,.s-stores.no-trans .gp,.s-stores.no-trans .cy-b,.s-stores.no-trans .cy-t,.s-stores.no-trans .st-card{transition:none!important}
    body.calm .s-stores .sq,body.calm .s-stores .dt,body.calm .s-stores .gp{transition:none!important}
    body.calm .s-stores .st-num b.tick{animation:none!important}`,
  init(ctx) {
    const svg = ctx.q('.st-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg);
    const CX = [336, 960, 1584], CY0 = 366, W = 300, H = 200, RY = 38, BOT = CY0 + H, MID = 466;
    const defs = mk('defs');
    const lg = mk('linearGradient', { id: 'sto-liq', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    mk('stop', { offset: 0, 'stop-color': '#FFB366', 'stop-opacity': .95 }, lg); mk('stop', { offset: 1, 'stop-color': '#E9590C', 'stop-opacity': .92 }, lg);
    ctx.cyl = CX.map((cx, k) => {
      const body = `M${cx - W / 2} ${CY0} V${BOT} A${W / 2} ${RY} 0 0 0 ${cx + W / 2} ${BOT} V${CY0} Z`;
      const cp = mk('clipPath', { id: 'sto-clip' + k }, defs); mk('path', { d: body }, cp); mk('ellipse', { cx, cy: CY0, rx: W / 2, ry: RY }, cp);
      const g = mk('g', {});
      mk('path', { class: 'cy-f', d: body }, g);
      const inner = mk('g', { 'clip-path': `url(#sto-clip${k})` }, g);
      const b = mk('path', { class: 'cy-b', d: `M${cx - W / 2} ${CY0} V${BOT} A${W / 2} ${RY} 0 0 0 ${cx + W / 2} ${BOT} V${CY0}` }, g);
      const t = mk('ellipse', { class: 'cy-t', cx, cy: CY0, rx: W / 2, ry: RY }, g);
      return { cx, g, b, t, inner };
    });
    /* store 1: liquid with rising bubbles */
    const c0 = ctx.cyl[0];
    ctx.liqRect = mk('rect', { x: c0.cx - W / 2 - 2, y: BOT, width: W + 4, height: H + RY + 4, fill: 'url(#sto-liq)' }, c0.inner);
    ctx.bub = Array.from({ length: 16 }, () => ({ el: mk('circle', { r: 2 + Math.random() * 2.6, fill: '#FFE2C2', opacity: 0 }, c0.inner), x: c0.cx - W / 2 + 26 + Math.random() * (W - 52), y: BOT + RY * Math.random(), v: 28 + Math.random() * 44, ph: Math.random() * 6 }));
    ctx.liqTop = mk('ellipse', { cx: c0.cx, cy: BOT, rx: W / 2, ry: RY, fill: '#FFD9B0', 'fill-opacity': .88, stroke: '#FFF0DC', 'stroke-width': 2 }, c0.inner);
    ctx.lv = 0; ctx.lvT = 0; ctx.t = 0; ctx.tok = 0;
    ctx.drawLiq = () => {
      const sy = BOT - ctx.lv * H, show = ctx.lv > .004;
      ctx.liqRect.setAttribute('y', sy); ctx.liqRect.setAttribute('height', BOT + RY + 4 - sy);
      ctx.liqTop.setAttribute('cy', sy); ctx.liqTop.setAttribute('ry', (RY * (1 + .07 * Math.sin(ctx.t * 2.1))).toFixed(2));
      ctx.liqRect.style.display = ctx.liqTop.style.display = show ? '' : 'none';
      ctx.bub.forEach((b) => { b.el.setAttribute('cx', (b.x + Math.sin(ctx.t * 1.6 + b.ph) * 5).toFixed(1)); b.el.setAttribute('cy', b.y.toFixed(1)); b.el.setAttribute('opacity', show && b.y > sy + 8 ? .55 : 0); });
    };
    /* spread the bubbles through the liquid (still frame for print and calm mode) */
    ctx.scatter = () => { const sy = BOT - ctx.lv * H; ctx.bub.forEach((b, k) => { b.y = sy + 14 + ((k * 37) % 100) / 100 * Math.max(10, BOT - sy - 22); }); };
    /* store 2: 31 table squares, 10 old (grey) and 21 new (orange) */
    const c1 = ctx.cyl[1], PX = 31, PY = 36, X0 = c1.cx - (8 * PX - 9) / 2, Y0 = CY0 + RY + 12;
    ctx.sq = [];
    for (let n = 0; n < 31; n++) {
      const c = n % 8, r = Math.floor(n / 8), x = X0 + c * PX, y = Y0 + r * PY;
      mk('rect', { class: 'slot', x, y, width: 22, height: 28, rx: 5 }, c1.inner);
      ctx.sq.push(mk('rect', { class: 'sq ' + (n < 10 ? 'old' : 'new'), x, y, width: 22, height: 28, rx: 5 }, c1.inner));
    }
    /* store 3: nine dots, nine event sources */
    const c2 = ctx.cyl[2];
    ctx.dt = [];
    for (let n = 0; n < 9; n++) {
      const x = c2.cx + ((n % 3) - 1) * 62, y = CY0 + RY + 40 + Math.floor(n / 3) * 52;
      mk('circle', { class: 'slot', cx: x, cy: y, r: 16 }, c2.inner);
      const g = mk('g', { class: 'dt' }, c2.inner);
      mk('circle', { cx: x, cy: y, r: 22, fill: 'none', stroke: 'rgba(255,131,0,.55)', 'stroke-width': 1.6 }, g);
      mk('circle', { cx: x, cy: y, r: 14, fill: '#FFE2C2', filter: 'url(#fx-glow)' }, g);
      ctx.dt.push(g);
    }
    /* the gaps: dashed line, a ring with a cross, a spark that cannot cross */
    ctx.gaps = [[0, 1], [1, 2]].map(([a, b]) => {
      const x0 = CX[a] + W / 2 + 14, x1 = CX[b] - W / 2 - 14, xm = (x0 + x1) / 2;
      const g = mk('g', { class: 'gp' });
      mk('path', { d: `M${x0} ${MID} H${x1}`, stroke: 'rgba(255,255,255,.4)', 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '3 10', 'stroke-linecap': 'round' }, g);
      mk('circle', { cx: xm, cy: MID, r: 24, fill: '#0B0B0C', stroke: '#D9D9D4', 'stroke-width': 3 }, g);
      mk('path', { d: `M${xm - 9} ${MID - 9} L${xm + 9} ${MID + 9} M${xm + 9} ${MID - 9} L${xm - 9} ${MID + 9}`, stroke: '#fff', 'stroke-width': 3.4, 'stroke-linecap': 'round', fill: 'none' }, g);
      const road = mk('path', { d: `M${x0} ${MID} H${xm - 36}`, stroke: 'none', fill: 'none' }, g);
      const f = ctx.flow(road, { color: '#FFB366', count: 2, speed: 110, r: 5, tail: 5, tailGap: 11 }); f.stop().show(false);
      return { g, f };
    });
    ctx.num = ctx.qa('.st-num b');
    ctx.cards = ctx.qa('.st-card');
    /* set a number and stop any count-up that is still running on it */
    const setNum = (el, v) => { if (el._cnt) el._cnt.stop = true; el.textContent = v; };
    const tick = (el) => { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); };
    /* state for step i. quick = no animation (jump, back, print) */
    ctx.render = (i, quick, dir) => {
      const S = (n) => i >= n, tok = ++ctx.tok, live = (n) => tok === ctx.tok && ctx.step >= n;
      ctx.cards.forEach((c, k) => c.classList.toggle('hot', i === k + 1));
      ctx.cyl.forEach((c, k) => { c.b.classList.toggle('on', S(k + 1)); c.t.classList.toggle('on', S(k + 1)); });
      /* store 1: the liquid rises and 1.5 million counts up */
      ctx.lvT = S(1) ? .82 : 0; if (quick) { ctx.lv = ctx.lvT; ctx.drawLiq(); }
      if (!S(1)) setNum(ctx.num[0], '0.0'); else if (quick) setNum(ctx.num[0], '1.5'); else if (!ctx.d1) Fx.counter(ctx.num[0], 1.5, { dec: 1, dur: 1500, delay: 250 });
      ctx.d1 = S(1);
      /* store 2: ten grey squares were there, twenty one orange ones landed, the number follows */
      ctx.sq.forEach((s, n) => {
        if (!S(2)) { s.classList.remove('on'); return; }
        if (quick) { s.classList.add('on'); return; }
        if (s.classList.contains('on')) return;
        ctx.after(n < 10 ? 150 + n * 25 : 650 + (n - 10) * 55, () => {
          if (!live(2)) return; s.classList.add('on');
          if (n >= 10) { setNum(ctx.num[1], n + 1); tick(ctx.num[1]); }
        });
      });
      if (!S(2)) setNum(ctx.num[1], '10'); else if (quick) setNum(ctx.num[1], '31');
      /* store 3: nine dots, nine sources */
      ctx.dt.forEach((d, n) => {
        if (!S(3)) { d.classList.remove('on'); return; }
        if (quick) { d.classList.add('on'); return; }
        if (d.classList.contains('on')) return;
        ctx.after(350 + n * 150, () => { if (!live(3)) return; d.classList.add('on'); setNum(ctx.num[2], n + 1); tick(ctx.num[2]); });
      });
      if (!S(3)) setNum(ctx.num[2], '0'); else if (quick) setNum(ctx.num[2], '9');
      /* the gaps */
      ctx.gaps.forEach((G, k) => {
        G.g.classList.toggle('on', S(4));
        if (S(4)) { const go = () => { if (live(4)) { G.f.show(true); G.f.start(); } }; if (quick) go(); else ctx.after(900 + k * 300, go); } else { G.f.stop(); G.f.show(false); }
      });
      if (!quick && dir > 0) {
        if (i >= 1 && i <= 3) ctx.after(250, () => { if (live(i)) Fx.sweep(ctx.cards[i - 1]); });
        if (i === 1) ctx.after(1900, () => { if (live(1)) Fx.burstEl(ctx.num[0], { n: 26, speed: 340 }); });
        if (i === 2) ctx.after(2000, () => { if (live(2)) Fx.burstEl(ctx.num[1], { n: 26, speed: 340 }); });
        if (i === 3) ctx.after(1900, () => { if (live(3)) Fx.burstEl(ctx.num[2], { n: 26, speed: 340 }); });
        if (i === 4) ctx.cards.forEach((c, k) => ctx.after(200 + k * 260, () => { if (live(4)) Fx.sweep(c); }));
      }
    };
    ctx.drawLiq();
  },
  enter(ctx) {
    ctx.raf((dt) => {
      if (ctx.calm) { ctx.lv = ctx.lvT; ctx.scatter(); ctx.drawLiq(); return; }
      ctx.t += dt;
      const d = ctx.lvT - ctx.lv; if (Math.abs(d) > .0006) ctx.lv += d * Math.min(1, dt * 2.2);
      const sy = 366 + 200 - ctx.lv * 200;
      ctx.bub.forEach((b) => { b.y -= b.v * dt; if (b.y < sy + 6) b.y = 366 + 200 + 20 * Math.random(); });
      ctx.drawLiq();
    });
  },
  step(ctx, i, dir, instant) { ctx.render(i, instant || dir < 0 || ctx.calm, dir); },
  static(ctx) { ctx.render(4, true, 1); ctx.lv = ctx.lvT = .82; ctx.scatter(); ctx.drawLiq(); ctx.gaps.forEach((G) => G.f.show(true).freeze()); },
});
