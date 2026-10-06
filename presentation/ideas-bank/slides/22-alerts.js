/* Slide 19: how an alert reaches a person. Outbox rows, dispatcher, Observation Manager, recipient rules, four gaps.
   Facts: research C3 (H15, H16), C4 (section 4), C5 (3.8, 12), C6 (H1, H2, S1 to S4, R1 to R4). */
Deck.add({
  id: 'alerts', section: 'tech', title: 'Alerts leave the screen', kicker: 'The paths · Alerts', reality: ['code', 'test'],
  steps: 5, ambient: { orb: .9, beam: .4, dust: .8 }, dur: [4200, 5200, 5600, 5200, 5600, 7000], minutes: 1.5,
  notes: 'An alert on the screen helps whoever is looking at it. This slide is about how an alert reaches someone who is not.\nStep 1: Weather, Lightning and Gas each write an outbox row in the same database save as the alert. If the alert is saved, its row exists. If the alert is refused, no orphan row is left. Weather and Lightning are in the code. Gas is deployed to the test environment only.\nStep 2: A dispatcher for each product posts its rows to one door, the Observation Manager. Weather ticks every 10 seconds, Lightning and Gas every 5. A failed send is retried up to 8 times, then the row is marked dead. All three are filed under the source WeatherStation, with a type per kind. Nobody has seen a Weather or Lightning observation arrive in production. No Gas observation has been seen in test yet.\nStep 3: The Observation Manager drops a repeat with the same project and external id. It groups a new one under an open one with the same source, type and serial number.\nStep 4: Notification rules choose the people. A rule can name a source, a zone and a company. An empty field matches all. Web is always added. Mobile needs a device token.\nStep 5: Four connectors are not there. Weather observations carry no zone. SMS goes out only for ConnectedWorker events. The Gas types are not on the Observation Manager type list, so they would be dropped. Permit observations get no company. This is read from the code.',
  html: `
    <h2 class="h2 al-h" data-step="0">Alerts <span class="o glow-text">leave the screen.</span></h2>
    <p class="lead al-lead" data-step="0" data-delay="200">An alert on the screen helps whoever is looking. This is how it reaches whoever is not.</p>
    <svg class="al-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <div class="al-cap"></div>
    <div class="src al-src" data-step="0" data-delay="400">Read from the code of the weather-station backend, the Observation Manager and the notification service. Deploy not verified.</div>`,
  css: `
    .s-alerts .al-h{position:absolute;left:96px;top:104px;width:1400px;font-size:62px}
    .s-alerts .al-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-alerts .al-svg{position:absolute;left:0;top:0;overflow:visible}
    .s-alerts .al-cap{position:absolute;left:96px;top:924px;width:1728px;font:500 28px/1.3 var(--font);color:#E6E6E2;opacity:0;transition:opacity .45s var(--ease)}
    .s-alerts .al-cap b{color:var(--wc-orange-soft);font-weight:700}
    .s-alerts .al-src{position:absolute;left:96px;top:972px}
    .s-alerts .rv{opacity:0;transition:opacity .8s var(--ease) var(--d,0s)}
    .s-alerts .rv.on{opacity:1}
    .s-alerts.no-trans .rv,.s-alerts.no-trans .dm{transition:none!important}
    .s-alerts .dm{transition:opacity .9s var(--ease)}
    .s-alerts .dm.low{opacity:.1}
    .s-alerts .al-t{font:800 25px/1 var(--font);fill:#fff}
    .s-alerts .al-s{font:500 20px/1 var(--font);fill:#B9B9B4}
    .s-alerts .al-n{font:600 22px/1 var(--font);fill:#E6E6E2}
    .s-alerts .al-hd{font:800 17px/1 var(--font);letter-spacing:.2em;fill:#7D7D78;text-transform:uppercase}
    .s-alerts .al-mono{font:600 16px/1 var(--mono);fill:#D9D9D4}
    .s-alerts .al-tag{font:800 16px/1 var(--mono);letter-spacing:.1em}
    .s-alerts .al-ring{fill:none;stroke:var(--c);stroke-width:2;transform-box:fill-box;transform-origin:center;animation:alRing 2.6s var(--ease) infinite;opacity:0}
    @keyframes alRing{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.4);opacity:0}}
    body.calm .s-alerts .al-ring{animation:none}
    .s-alerts .al-sweep{transform:translateX(-400px)}
    .s-alerts .al-sweep.go{animation:alSweep 1.5s var(--ease) both}
    @keyframes alSweep{to{transform:translateX(900px)}}
    .s-alerts .al-chip rect{transition:stroke .5s,fill .5s}
    .s-alerts .al-chip.lit rect{stroke:#FFB366;fill:rgba(255,131,0,.22)}
    .s-alerts .al-chip text{font:700 22px/1 var(--font);fill:#9a9a95;text-anchor:middle;transition:fill .5s}
    .s-alerts .al-chip.lit text{fill:#fff}`,
  init(ctx) {
    const svg = ctx.q('.al-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg);
    const COL = { w: '#FF8300', l: '#4FB3FF', g: '#2BD576' };
    const LN = [
      { k: 'w', y: 450, t: 'Weather', s: ['a danger episode'], tbl: 'weather_observation', tick: 'every 10 s', typ: 'type: the indicator', bt: 'code', dt: 'ne', dl: '' },
      { k: 'l', y: 630, t: 'Lightning', s: ['RED, FAULT, OFFLINE'], tbl: 'lightning_observation', tick: 'every 5 s', typ: 'type: Lightning', bt: 'code', dt: 'ne', dl: '' },
      { k: 'g', y: 810, t: 'Gas', s: ['a critical alert:', 'high gas, SOS, fall,', 'tipped over'], tbl: 'gas_observation', tick: 'every 5 s', typ: 'type: one per kind', bt: 'test', dt: 'test', dl: 'TEST · NONE SEEN YET' },
    ];
    const SX = 96, SW = 280, BX = 500, BW = 250, OX = 1060, OW = 330, OY = 360, OH = 540, PX = 1470, PW = 354;
    const KIND = { code: ['#4FB3FF', 'CODE'], test: ['#FFC24B', 'TEST'], ne: ['#B9B9B4', 'NOT EVIDENCED'] };
    const G = (at, parent, delay) => { const g = mk('g', { class: 'rv', 'data-at': at }, parent); if (delay) g.style.setProperty('--d', delay + 'ms'); return g; };
    const pill = (p, x, y, kind, label) => {
      const [c, t0] = KIND[kind], t = label || t0, w = Math.round(t.length * 11.2 + 42), g = mk('g', {}, p);
      mk('rect', { x, y, width: w, height: 30, rx: 15, fill: 'rgba(10,10,12,.94)', stroke: c, 'stroke-width': 1.6, 'stroke-dasharray': kind === 'ne' ? '5 4' : '' }, g);
      mk('circle', { cx: x + 16, cy: y + 15, r: 4.5, fill: c }, g);
      mk('text', { class: 'al-tag', x: x + 28, y: y + 20.5, fill: c, text: t }, g);
      return w;
    };
    const defs = mk('defs');
    const cp = mk('clipPath', { id: 'al-omclip' }, defs); mk('rect', { x: OX, y: OY, width: OW, height: OH, rx: 26 }, cp);
    const lg = mk('linearGradient', { id: 'al-sweepg', x1: 0, y1: 0, x2: 1, y2: 0 }, defs);
    mk('stop', { offset: 0, 'stop-color': 'rgba(255,255,255,0)' }, lg); mk('stop', { offset: .5, 'stop-color': 'rgba(255,200,140,.34)' }, lg); mk('stop', { offset: 1, 'stop-color': 'rgba(255,255,255,0)' }, lg);
    const main = mk('g', { class: 'dm' });
    ctx.fl = { save: [], rail: [], out: null, fan: [], gap: [] };
    /* column headers */
    const hd = (at, x, w, t) => { const g = G(at, main); mk('text', { class: 'al-hd', x, y: 312, text: t }, g); mk('line', { x1: x, y1: 326, x2: x + w, y2: 326, stroke: 'rgba(255,255,255,.14)', 'stroke-width': 1.5 }, g); };
    hd(0, SX, SW, 'Alert'); hd(1, BX, BW, 'Outbox'); hd(2, BX + BW + 18, OX - BX - BW - 36, 'Dispatch'); hd(2, OX, OW, 'Observation Manager'); hd(4, PX, PW, 'Notification rules');
    /* lanes: alert card, same-save link, outbox bucket, rail */
    LN.forEach((L, n) => {
      const c = COL[L.k], y0 = L.y - 66, nl = L.s.length, top = y0 + (132 - (60 + (nl - 1) * 25)) / 2;
      const a = G(0, main, 200 + n * 170);
      mk('rect', { x: SX, y: y0, width: SW, height: 132, rx: 18, fill: '#0F0F11', stroke: c, 'stroke-width': 2.2 }, a);
      mk('circle', { class: 'al-ring', cx: SX + 34, cy: L.y, r: 11, style: `--c:${c};animation-delay:${n * .5}s` }, a);
      mk('circle', { cx: SX + 34, cy: L.y, r: 9, fill: c, filter: 'url(#fx-glow)' }, a);
      mk('text', { class: 'al-t', x: SX + 66, y: top + 24, text: L.t }, a);
      L.s.forEach((ln, i) => mk('text', { class: 'al-s', x: SX + 66, y: top + 54 + i * 25, text: ln }, a));
      const b = G(1, main, n * 180);
      const link = mk('path', { d: `M${SX + SW} ${L.y} L${BX - 6} ${L.y}`, stroke: c, 'stroke-width': 3, fill: 'none', filter: 'url(#fx-glow-u)' }, b);
      mk('polygon', { points: `${BX} ${L.y} ${BX - 12} ${L.y - 7} ${BX - 12} ${L.y + 7}`, fill: c }, b);
      mk('text', { class: 'al-mono', x: (SX + SW + BX) / 2, y: L.y - 16, 'text-anchor': 'middle', text: 'same save', fill: c, style: `fill:${c}` }, b);
      const by0 = L.y - 58;
      mk('rect', { x: BX, y: by0, width: BW, height: 116, rx: 16, fill: '#0F0F11', stroke: c, 'stroke-width': 2.2 }, b);
      mk('text', { class: 'al-mono', x: BX + 18, y: by0 + 34, text: L.tbl }, b);
      [0, 1, 2].forEach((r) => mk('rect', { x: BX + 18, y: by0 + 54 + r * 20, width: BW - 36, height: 12, rx: 5, fill: c, opacity: [.9, .45, .22][r] }, b));
      const pw = Math.round(KIND[L.bt][1].length * 11.2 + 42); pill(b, BX + BW - pw - 12, by0 - 15, L.bt);
      const r = G(2, main, n * 170);
      const rail = mk('path', { d: `M${BX + BW} ${L.y} L${OX - 6} ${L.y}`, stroke: c, 'stroke-width': 3, fill: 'none', filter: 'url(#fx-glow-u)', opacity: .9 }, r);
      mk('polygon', { points: `${OX} ${L.y} ${OX - 13} ${L.y - 7.5} ${OX - 13} ${L.y + 7.5}`, fill: c }, r);
      mk('text', { class: 'al-s', x: BX + BW + 20, y: L.y - 16, text: L.tick }, r);
      mk('text', { class: 'al-s', x: BX + BW + 20, y: L.y + 34, text: L.typ }, r);
      pill(r, BX + BW + 20, L.y + 46, L.dt, L.dl);
      ctx.fl.save.push(ctx.flow(link, { color: c, count: 1, speed: 120, r: 5, tail: 5, tailGap: 11 }));
      ctx.fl.rail.push(ctx.flow(rail, { color: c, count: 3, speed: 190, r: 6, tail: 7, tailGap: 13 }));
      ctx.rails = (ctx.rails || []).concat([rail]);
    });
    /* Observation Manager */
    const om = G(2, main, 450);
    ctx.omRect = mk('rect', { x: OX, y: OY, width: OW, height: OH, rx: 26, fill: 'rgba(255,131,0,.07)', stroke: '#FF8300', 'stroke-width': 2.6, filter: 'url(#fx-glow-soft)' }, om);
    mk('text', { x: OX + 24, y: OY + 46, text: 'Observation Manager', style: 'font:800 26px var(--font);fill:#fff' }, om);
    mk('text', { class: 'al-mono', x: OX + 24, y: OY + 78, text: 'source: WeatherStation' }, om);
    const sw = mk('g', { 'clip-path': 'url(#al-omclip)' }, om); ctx.sweep = mk('rect', { class: 'al-sweep', x: OX - 100, y: OY, width: 200, height: OH, fill: 'url(#al-sweepg)' }, sw);
    pill(om, OX + OW - 96, OY - 15, 'code');
    const blk = (y, t, s) => { const g = G(3, main); mk('rect', { x: OX + 20, y, width: OW - 40, height: 128, rx: 16, fill: '#0F0F11', stroke: 'rgba(255,255,255,.28)', 'stroke-width': 1.6 }, g); mk('text', { class: 'al-t', x: OX + 42, y: y + 44, text: t }, g); mk('text', { class: 'al-s', x: OX + 42, y: y + 76, text: s[0] }, g); mk('text', { class: 'al-mono', x: OX + 42, y: y + 106, text: s[1] }, g); return g; };
    blk(OY + 120, 'Drops repeats', ['same alert twice:', 'project + external id']);
    blk(OY + 276, 'Groups the rest', ['under an open one:', 'source + type + serial no']);
    /* notification rules */
    const ru = G(4, main, 100);
    mk('rect', { x: PX, y: OY, width: PW, height: 236, rx: 22, fill: '#0F0F11', stroke: '#FFB366', 'stroke-width': 2.2, filter: 'url(#fx-glow-soft)' }, ru);
    mk('text', { class: 'al-t', x: PX + 22, y: OY + 44, text: 'Recipient rules' }, ru);
    mk('text', { class: 'al-s', x: PX + 22, y: OY + 82, text: 'a rule can name a:' }, ru);
    ctx.chips = ['source', 'zone', 'company'].map((t, i) => { const g = mk('g', { class: 'al-chip' }, ru), x = PX + 22 + i * 106; mk('rect', { x, y: OY + 102, width: 96, height: 46, rx: 23, fill: 'rgba(255,255,255,.04)', stroke: 'rgba(255,255,255,.28)', 'stroke-width': 1.8 }, g); mk('text', { x: x + 48, y: OY + 132, text: t }, g); return g; });
    mk('text', { class: 'al-s', x: PX + 22, y: OY + 186, text: 'an empty field matches all' }, ru);
    pill(ru, PX + PW - 96, OY - 15, 'code');
    const omOut = mk('path', { d: `M${OX + OW + 6} ${OY + 300} C ${OX + OW + 50} ${OY + 300}, ${PX - 50} ${OY + 118}, ${PX - 6} ${OY + 118}`, stroke: '#FFB366', 'stroke-width': 3, fill: 'none', filter: 'url(#fx-glow-u)' }, ru);
    mk('polygon', { points: `${PX} ${OY + 118} ${PX - 13} ${OY + 111} ${PX - 13} ${OY + 125}`, fill: '#FFB366' }, ru);
    ctx.omOut = omOut; ctx.fl.out = ctx.flow(omOut, { color: '#FFB366', count: 2, speed: 150, r: 5, tail: 6, tailGap: 12 });
    /* people */
    const pe = G(4, main, 300), px = (i) => PX + 29 + i * 59.2, LIT = [0, 2, 3];
    ctx.fan = [];
    for (let i = 0; i < 6; i++) {
      const lit = LIT.includes(i), x = px(i), c = lit ? '#FFB366' : '#55555b';
      const path = mk('path', { d: `M${PX + PW / 2} ${OY + 242} C ${PX + PW / 2} ${OY + 300}, ${x} ${OY + 300}, ${x} ${OY + 340}`, stroke: c, 'stroke-width': lit ? 2.4 : 1.4, fill: 'none', 'stroke-dasharray': lit ? '' : '4 6' }, pe);
      mk('circle', { cx: x, cy: 726, r: 13, fill: lit ? 'rgba(255,131,0,.5)' : 'none', stroke: c, 'stroke-width': 2.2, filter: lit ? 'url(#fx-glow)' : '' }, pe);
      mk('path', { d: `M${x - 23} 772 C ${x - 23} 746, ${x + 23} 746, ${x + 23} 772 Z`, fill: lit ? 'rgba(255,131,0,.28)' : 'none', stroke: c, 'stroke-width': 2.2 }, pe);
      if (lit) { ctx.fl.fan.push(ctx.flow(path, { color: '#FFB366', count: 1, speed: 110, r: 4.5, tail: 5, tailGap: 11 })); }
      ctx.fan.push(path);
    }
    mk('text', { class: 'al-s', x: PX, y: 820, text: 'Web is always added.' }, pe);
    mk('text', { class: 'al-s', x: PX, y: 848, text: 'Mobile needs a device token.' }, pe);
    mk('text', { x: PX, y: 884, text: 'Illustration: who matches depends on each project.', style: 'font:500 17px var(--font);fill:#74746F' }, pe);
    /* step 5: four connectors that are not there */
    const gp = G(5, svg), GAPS = [
      { y: 462, from: ['Weather observation', COL.w], to: ['Zone in the rules', '#FFB366'], why: 'Weather observations carry no zone', ev: 'The weather payload has no zone, space or point.' },
      { y: 590, from: ['Recipient rules', '#FFB366'], to: ['SMS', '#FFB366'], why: 'SMS goes out only for ConnectedWorker events', ev: 'Web is always added. Email is never produced on this path.' },
      { y: 718, from: ['Gas observation', COL.g], to: ['Observation Manager type list', '#FFB366'], why: 'Gas types are not on the type list', ev: 'Unknown types are dropped without an error to the sender.' },
      { y: 846, from: ['Permit observation', '#D9D9D4'], to: ['Company in the rules', '#FFB366'], why: 'Permit observations get no company', ev: 'Under a package policy those rows are hidden.' },
    ];
    ctx.gapPaths = [];
    GAPS.forEach((g, n) => {
      const row = G(5, gp, 150 + n * 260), L0 = 214, L1 = 574, R0 = 1346, R1 = 1706, gx0 = 940, gx1 = 980;
      [[L0, g.from], [R0, g.to]].forEach(([x, f]) => { mk('rect', { x, y: g.y - 36, width: 360, height: 72, rx: 18, fill: '#0F0F11', stroke: f[1], 'stroke-width': 2, 'stroke-dasharray': x === R0 ? '7 6' : '' }, row); mk('text', { class: 'al-n', x: x + 180, y: g.y + 8, 'text-anchor': 'middle', text: f[0] }, row); });
      const left = mk('path', { d: `M${L1 + 6} ${g.y} L${gx0 - 14} ${g.y}`, stroke: g.from[1], 'stroke-width': 3, fill: 'none', 'stroke-dasharray': '3 9', 'stroke-linecap': 'round', opacity: .65 }, row);
      mk('line', { x1: gx1 + 14, y1: g.y, x2: R0 - 6, y2: g.y, stroke: '#74746F', 'stroke-width': 3, 'stroke-dasharray': '3 9', 'stroke-linecap': 'round', opacity: .6 }, row);
      mk('circle', { cx: gx0, cy: g.y, r: 9, fill: '#0B0B0C', stroke: g.from[1], 'stroke-width': 2.4 }, row);
      mk('circle', { cx: gx1, cy: g.y, r: 9, fill: '#0B0B0C', stroke: '#74746F', 'stroke-width': 2.4, 'stroke-dasharray': '3 3' }, row);
      mk('text', { x: 960, y: g.y - 26, 'text-anchor': 'middle', text: g.why, style: 'font:700 26px var(--font);fill:#fff' }, row);
      mk('text', { x: 960, y: g.y + 44, 'text-anchor': 'middle', text: g.ev, style: 'font:500 20px var(--font);fill:#A9A9A4' }, row);
      ctx.fl.gap.push(ctx.flow(left, { color: g.from[1], count: 1, speed: 80, r: 4.5, tail: 5, tailGap: 11 }));
    });
    mk('text', { x: 960, y: 366, 'text-anchor': 'middle', text: 'FOUR CONNECTORS THAT WOULD NEED BUILDING', style: 'font:800 20px var(--font);letter-spacing:.24em;fill:#B9B9B4' }, gp);
    Object.values(ctx.fl).flat().filter(Boolean).forEach((f) => f.stop().show(false));
    ctx.cap = ctx.q('.al-cap');
    ctx.caps = [
      '',
      '<b>Same save.</b> Each alert writes its own outbox row. If the alert exists, its row exists.',
      '<b>One door.</b> A dispatcher posts each row to the Observation Manager. Nobody has yet seen one arrive in production.',
      '<b>One record per alert.</b> Repeats are dropped, the rest are grouped.',
      '<b>Rules pick the people</b> by source, zone and company. Web and Mobile only.',
      '<b>Four gaps.</b> Read from the code.',
    ];
  },
  step(ctx, i, dir, instant) {
    ctx.qa('.rv').forEach((g) => g.classList.toggle('on', i >= +g.dataset.at));
    ctx.q('.dm').classList.toggle('low', i >= 5);
    const f = ctx.fl, on = (arr, v) => arr.forEach((x) => { x.show(v); if (v) x.start(); else x.stop(); });
    on(f.save, i >= 1 && i < 5); on(f.rail, i >= 2 && i < 5); on([f.out], i >= 4 && i < 5); on(f.fan, i >= 4 && i < 5); on(f.gap, i >= 5);
    const setCap = () => { ctx.cap.innerHTML = ctx.caps[i]; ctx.cap.style.opacity = ctx.caps[i] ? 1 : 0; };
    if (instant) setCap(); else { ctx.cap.style.opacity = 0; ctx.after(260, setCap); }
    ctx.chips.forEach((c, k) => { const lit = i >= 4; if (instant) c.classList.toggle('lit', lit); else ctx.after(lit ? 700 + k * 450 : 0, () => c.classList.toggle('lit', lit)); });
    if (!instant) {
      if (i === 1) ctx.rails.forEach((r) => { r.style.strokeDasharray = ''; });
      if (i === 2) { ctx.rails.forEach((r, k) => Fx.draw(r, 1100, 300 + k * 170)); ctx.sweep.classList.remove('go'); void ctx.sweep.getBoundingClientRect(); ctx.after(900, () => { ctx.sweep.classList.add('go'); Fx.burstEl(ctx.omRect, { n: 26, speed: 340 }); }); }
      if (i === 4) Fx.draw(ctx.omOut, 900, 200);
    }
  },
  static(ctx) { Object.values(ctx.fl).flat().filter(Boolean).forEach((f) => f.show(true).freeze()); ctx.cap.style.opacity = 1; ctx.chips.forEach((c) => c.classList.add('lit')); },
});
