/* Slide 02: three answers, one decision. Pattern slide: step-driven SVG gauges with live values, convergence lines with packets. */
Deck.add({
  id: 'question', section: 'why', title: 'Is it safe to work right now?', kicker: 'Why it matters · Safe now?', reality: ['live'],
  short: true, steps: 4, ambient: { orb: 1, beam: .7, dust: 1 }, dur: [4200, 4600, 4600, 4600, 6000], minutes: 1,
  notes: 'On site, one question matters: is it safe to work right now?\nHeat says Danger. Lightning says All Clear. Gas says Check.\nThese are live screens from three projects, 4 October 2026.\nCheck is not calm. It means we cannot be sure.\nConnected Environment puts all three in one place.',
  html: `
    <h2 class="h2 q-h" data-step="0">Is it safe to work <span class="o glow-text">right now?</span></h2>
    <p class="lead q-lead" data-step="0" data-step-out="4" data-delay="250">Three screens. Three answers.</p>
    <div class="q-row">
      <div class="q-slot" data-step="1" data-fx="scale"><div class="glass q-card" data-k="0"><div class="label">Weather Station</div><svg viewBox="0 0 400 250" class="q-g"></svg><div class="q-stat red">DANGER</div><div class="q-line">Heat index <b>49.5 °C</b></div><div class="src">Live screen · 4 Oct 2026</div></div></div>
      <div class="q-slot" data-step="2" data-fx="scale"><div class="glass q-card" data-k="1"><div class="label">Lightning</div><svg viewBox="0 0 400 250" class="q-g"></svg><div class="q-stat green">ALL CLEAR</div><div class="q-line">Safe to work</div><div class="src">Live screen · 4 Oct 2026</div></div></div>
      <div class="q-slot" data-step="3" data-fx="scale"><div class="glass q-card" data-k="2"><div class="label">Gas</div><svg viewBox="0 0 400 250" class="q-g"></svg><div class="q-stat amber">CHECK</div><div class="q-line"><b>4 of 5</b> detectors reporting</div><div class="src">Live screen · 4 Oct 2026</div></div></div>
    </div>
    <svg class="q-merge" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <div class="q-final" data-step="4"><span class="q-final-a">One site. Three answers.</span><span class="q-final-b shine">One place to look.</span></div>`,
  css: `
    .s-question .q-h{position:absolute;left:96px;top:118px;width:1500px}
    .s-question .q-lead{position:absolute;left:96px;top:236px;width:1200px}
    .s-question .q-row{position:absolute;left:0;top:330px;width:1920px;height:600px}
    .s-question .q-slot{position:absolute;top:0;width:520px;height:580px}
    .s-question .q-slot:nth-child(1){left:96px}.s-question .q-slot:nth-child(2){left:700px}.s-question .q-slot:nth-child(3){left:1304px}
    .s-question .q-card{width:520px;height:580px;padding:30px 34px;transform-origin:50% 0;transition:transform 1.1s var(--ease),opacity .8s}
    .s-question.merged .q-card{transform:translateY(-112px) scale(.58);opacity:.92}
    .s-question .q-g{display:block;width:452px;height:282px;margin:6px 0 0 -6px;overflow:visible}
    .s-question .q-stat{font:900 74px/1 var(--font);letter-spacing:-.02em;margin-top:6px}
    .s-question .q-stat.red{color:var(--danger);text-shadow:0 0 36px rgba(255,77,77,.55)}
    .s-question .q-stat.green{color:var(--ok);text-shadow:0 0 36px rgba(34,197,94,.5)}
    .s-question .q-stat.amber{color:var(--check);text-shadow:0 0 36px rgba(245,165,36,.5)}
    .s-question .q-line{margin-top:14px;font:500 27px/1.3 var(--font);color:#D9D9D4}
    .s-question .q-line b{color:#fff}
    .s-question .q-card .src{position:absolute;left:34px;bottom:26px}
    .s-question .q-card .label{font-size:22px}
    .s-question .q-merge{position:absolute;left:0;top:0;pointer-events:none;overflow:visible}
    .s-question .q-final{position:absolute;left:96px;top:795px;width:1728px;text-align:center}
    .s-question .q-final-a{display:block;font:700 44px/1.1 var(--font);color:#D9D9D4}
    .s-question .q-final-b{display:block;margin-top:14px;font:900 96px/1.05 var(--font);letter-spacing:-.03em}
    .s-question .zone{fill:none;stroke-width:26;stroke-linecap:round;opacity:.28;transition:opacity .9s,filter .9s}
    .s-question .zone.hit{opacity:1;filter:url(#fx-glow)}
    .s-question .needle{transform-origin:200px 215px;transform:rotate(180deg);transition:transform 1.7s cubic-bezier(.2,1.25,.3,1)}
    .s-question .needle.on{transform:rotate(var(--deg))}
    .s-question .hub{fill:#fff;filter:url(#fx-glow)}`,
  init(ctx) {
    const pt = (a, r) => [200 + r * Math.cos(a * Math.PI / 180), 215 + r * Math.sin(a * Math.PI / 180)];
    const arc = (a0, a1, r) => { const [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r); return `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`; };
    const zones = [['#22C55E', 184, 236], ['#F5A524', 244, 296], ['#FF4D4D', 304, 356]];
    const target = [{ deg: 322, zone: 2 }, { deg: 208, zone: 0 }, { deg: 270, zone: 1 }];
    ctx.gauges = ctx.qa('.q-g').map((svg, k) => {
      const zs = zones.map(([c, a0, a1]) => Fx.el('path', { class: 'zone', d: arc(a0, a1, 150), stroke: c }, svg));
      for (let a = 180; a <= 360; a += 22.5) { const [x0, y0] = pt(a, 176), [x1, y1] = pt(a, 188); Fx.el('line', { x1: x0, y1: y0, x2: x1, y2: y1, stroke: 'rgba(255,255,255,.28)', 'stroke-width': 2 }, svg); }
      const nd = Fx.el('g', { class: 'needle' }, svg); nd.style.setProperty('--deg', target[k].deg + 'deg');
      Fx.el('polygon', { points: '200,208 336,215 200,222', fill: '#fff', filter: 'url(#fx-glow)' }, nd);
      Fx.el('circle', { class: 'hub', cx: 200, cy: 215, r: 12 }, svg);
      return { zs, nd, t: target[k] };
    });
    /* convergence overlay: orb + three curves with packets */
    const m = ctx.q('.q-merge'), ox = 960, oy = 715;
    const grp = Fx.el('g', { class: 'q-m-g', 'data-step': 4, 'data-fx': 'fade' }, m);
    const cards = [356, 960, 1564];
    ctx.paths = cards.map((cx, k) => {
      const vx = cx - ox, vy = 552 - oy, L = Math.hypot(vx, vy), ux = vx / L, uy = vy / L, ex = ox + ux * 54, ey = oy + uy * 54;
      const d = `M${cx} 552 C ${cx} 642, ${ex + ux * 170} ${ey + uy * 170 + 30}, ${ex} ${ey}`;
      return Fx.el('path', { d, fill: 'none', stroke: ['#FF4D4D', '#22C55E', '#F5A524'][k], 'stroke-width': 3, opacity: .75 }, grp);
    });
    Fx.el('circle', { cx: ox, cy: oy, r: 46, fill: 'url(#g-core)', opacity: .9, filter: 'url(#fx-glow-soft)' }, grp);
    Fx.el('circle', { cx: ox, cy: oy, r: 24, fill: '#FFB366', filter: 'url(#fx-glow)' }, grp);
    ctx.mflows = ctx.paths.map((p, k) => ctx.flow(p, { color: ['#FF4D4D', '#22C55E', '#F5A524'][k], count: 2, speed: 210, r: 6, tail: 6, tailGap: 12 }));
    ctx.mflows.forEach((f) => f.stop().show(false));
    ctx.root.querySelector('.q-merge').style.display = 'none';
  },
  step(ctx, i, dir, instant) {
    ctx.gauges.forEach((g, k) => {
      const on = i >= k + 1;
      const apply = () => { g.nd.classList.toggle('on', on); g.zs.forEach((z, zi) => z.classList.toggle('hit', on && zi === g.t.zone)); };
      if (instant) { g.nd.style.transition = 'none'; apply(); void g.nd.getBoundingClientRect(); g.nd.style.transition = ''; } else ctx.after(on ? 500 : 0, apply);
    });
    const merged = i >= 4;
    ctx.root.classList.toggle('merged', merged);
    ctx.q('.q-merge').style.display = merged ? '' : 'none';
    ctx.mflows.forEach((f) => { f.show(merged); if (merged) f.start(); else f.stop(); });
    if (merged) ctx.paths.forEach((p, k) => Fx.draw(p, 1300, 500 + k * 150));
    if (merged && !instant) ctx.after(900, () => Fx.burstEl(ctx.q('.q-final-b'), { n: 30, speed: 420 }));
  },
  static(ctx) { ctx.gauges.forEach((g) => { g.nd.style.transition = 'none'; g.nd.classList.add('on'); g.zs[g.t.zone].classList.add('hit'); }); ctx.root.classList.add('merged'); ctx.q('.q-merge').style.display = ''; ctx.mflows.forEach((f) => f.show(true).freeze()); },
});
