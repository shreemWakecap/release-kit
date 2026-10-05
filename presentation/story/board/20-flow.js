/* Board 2: the path of every reading, today. Hops read from the code (research C2, C3, C4). */
Deck.add({
  id: 'flow', section: 'flow', title: 'The path of every reading, today', kicker: 'Board 2 · Data flow today', reality: ['code', 'live'],
  steps: 5, ambient: { orb: .9, beam: .4, dust: .8 }, dur: [4000, 5200, 5200, 5200, 5200, 6000],
  notes: 'Three products, three roads in, one place you look.\nWeather: a sensor head on a mesh node, a gateway, AWS IoT, a queue, the old sensors-service decodes it into a Timescale table, and the new backend reads that table, computes the heat index and the verdict.\nLightning: a warning unit with an input module read over Modbus, the same mesh, then the backend itself takes the queues, runs the state machine and stores the state. Silence never reads as clear.\nGas: no mesh. The vendor cloud holds the readings and WakeCap asks it every 45 seconds.\nAll three end in the portal. Danger, RED and critical gas events also leave through an outbox to the Observation Manager.',
  html: `
    <h2 class="h2 fl-h" data-step="0">The path of <span class="o glow-text">every reading.</span></h2>
    <p class="lead fl-lead" data-step="0" data-delay="200">From the sensor on site to the pixel on the page. Hops are read from the code. Deploy is not verified.</p>
    <svg class="fl-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>`,
  css: `
    .s-flow .fl-h{position:absolute;left:96px;top:104px;width:1400px;font-size:62px}
    .s-flow .fl-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-flow .fl-svg{position:absolute;left:0;top:0;overflow:visible}
    .s-flow .nd rect{stroke-width:2.2}
    .s-flow .nd .t{font:800 22px/1 var(--font);fill:#fff}
    .s-flow .nd .s{font:500 17.5px/1 var(--font);fill:#B9B9B4}
    .s-flow .hd{font:800 17px/1 var(--font);letter-spacing:.2em;fill:#7D7D78;text-transform:uppercase}
    .s-flow .lane-t{font:800 18px/1 var(--font);letter-spacing:.14em;text-transform:uppercase}
    .s-flow .note{font:600 18px/1.2 var(--font);fill:#D9D9D4}
    .s-flow .ar{stroke-width:2.4;fill:none}
    .s-flow .tag{font:800 16px/1 var(--mono);letter-spacing:.12em}`,
  init(ctx) {
    const svg = ctx.q('.fl-svg'), COL = { w: '#FF8300', l: '#4FB3FF', g: '#2BD576' }, mk = (t, a, p) => Fx.el(t, a, p || svg);
    const NW = 232, NH = 100, X = [96, 366, 636, 906], BX = 1190, BW = 280, PX = 1560, PW = 264, Y = { w: 420, l: 580, g: 740 };
    const grp = (step, delay) => mk('g', { 'data-step': step, 'data-delay': delay || 0 });
    const hds = [['On site', X[0], NW], ['Radio and gateway', X[1], NW], ['Cloud intake', X[2], NW], ['Store', X[3], NW], ['Platform', BX, BW], ['People', PX, PW]];
    hds.forEach(([t, x, w]) => { const g = grp(0); mk('text', { class: 'hd', x, y: 290, text: t }, g); mk('line', { x1: x, y1: 304, x2: x + w, y2: 304, stroke: 'rgba(255,255,255,.14)', 'stroke-width': 1.5 }, g); });
    const node = (g, x, y, w, h, title, sub, col, fillc) => {
      const n = mk('g', { class: 'nd' }, g); mk('rect', { x, y, width: w, height: h, rx: 18, stroke: col, fill: fillc || '#0F0F11' }, n);
      mk('text', { class: 't', x: x + 18, y: y + 34, text: title }, n);
      sub.split('\n').forEach((ln, i) => mk('text', { class: 's', x: x + 18, y: y + 62 + i * 22, text: ln }, n));
      return n;
    };
    const arrow = (g, x1, x2, y, col, dashed) => { mk('line', { class: 'ar', x1, y1: y, x2: x2 - 8, y2: y, stroke: col, 'stroke-dasharray': dashed ? '6 7' : '' }, g); mk('polygon', { points: `${x2},${y} ${x2 - 12},${y - 7} ${x2 - 12},${y + 7}`, fill: col }, g); };
    const lanes = {};
    ['w', 'l', 'g'].forEach((k) => { lanes[k] = mk('path', { d: `M${X[0] + NW} ${Y[k]} L${PX} ${Y[k]}`, stroke: 'none', fill: 'none' }); });
    const lane = (k, label, step, nodes) => {
      const y = Y[k] - NH / 2, col = COL[k], g = grp(step);
      mk('text', { class: 'lane-t', x: 96, y: y - 12, text: label, fill: col }, g);
      nodes.forEach(([x, t, sb], i) => { node(g, x, y, NW, NH, t, sb, col); });
      for (let i = 0; i < nodes.length - 1; i++) arrow(g, X[i] + NW + 4, X[i + 1] - 4, Y[k], col, false);
    };
    lane('w', 'Weather Station', 1, [[X[0], 'Weather station', 'Sensor head, Modbus\non a mesh node'], [X[1], 'Mesh and gateway', 'Wirepas radio,\nMQTT to AWS IoT'], [X[2], 'IoT rule, queue', 'sensors-service\ndecodes the frame'], [X[3], 'Sensors DB', 'Timescale, one row\nper reading']]);
    lane('l', 'Lightning', 2, [[X[0], 'Warning unit', 'ADAM input module,\nread over Modbus'], [X[1], 'Mesh and gateway', '10-byte frame,\nJSON to AWS IoT'], [X[2], 'IoT rules, 2 queues', 'each with a\ndead-letter queue']]);
    lane('g', 'Gas', 3, [[X[0], 'Gas detector', 'Blackline, uploads\nabout every 30 min'], [X[1], 'Blackline cloud', 'the vendor: a black\nbox to us'], [X[2], 'WakeCap poller', 'asks the cloud\nevery 45 s']]);
    const pass = (k, step, from) => { const g = grp(step); arrow(g, from, BX - 4, Y[k], COL[k], true); };
    pass('w', 1, X[3] + NW + 4); pass('l', 2, X[2] + NW + 4); pass('g', 3, X[2] + NW + 4);
    /* backend */
    const be = grp(1);
    mk('rect', { x: BX, y: 300, width: BW, height: 510, rx: 24, fill: 'rgba(255,131,0,.08)', stroke: '#FF8300', 'stroke-width': 2.6, filter: 'url(#fx-glow-soft)' }, be);
    mk('text', { x: BX + 22, y: 338, text: 'CE backend', style: 'font:800 27px var(--font);fill:#fff' }, be);
    mk('text', { x: BX + 22, y: 364, text: '.NET. Reads, decides, serves.', style: 'font:500 17px var(--font);fill:#B9B9B4' }, be);
    const beRow = (step, k, a, b) => { const g = grp(step), y = Y[k]; mk('rect', { x: BX + 18, y: y - 40, width: BW - 36, height: 80, rx: 14, fill: '#0F0F11', stroke: COL[k], 'stroke-width': 1.6 }, g); mk('text', { class: 'note', x: BX + 30, y: y - 8, text: a }, g); mk('text', { class: 'note', x: BX + 30, y: y + 20, text: b, fill: '#B9B9B4' }, g); };
    beRow(1, 'w', 'Heat index, band', 'Work, rest, water, verdict');
    beRow(2, 'l', 'State machine, stale sweep', 'Only green is safe');
    beRow(3, 'g', 'Alerts, limits, close', 'Ack and close stay here');
    const pg = grp(3); node(pg, BX, 850, BW, 84, 'CE Postgres', '31 tables, all products', '#FFB366');
    mk('line', { class: 'ar', x1: BX + BW / 2, y1: 810, x2: BX + BW / 2, y2: 842, stroke: '#FFB366' }, pg); mk('polygon', { points: `${BX + BW / 2},848 ${BX + BW / 2 - 7},836 ${BX + BW / 2 + 7},836`, fill: '#FFB366' }, pg);
    const om = grp(4); node(om, PX, 850, PW, 84, 'Observation Manager', 'danger, RED, critical gas', '#C58BFF');
    arrow(om, BX + BW + 4, PX - 4, 892, '#C58BFF', false); mk('text', { class: 'tag', x: BX + BW + 8, y: 876, text: 'OUTBOX', fill: '#C58BFF' }, om);
    mk('text', { class: 'tag', x: PX + PW - 118, y: 922, text: 'GAS: TEST', fill: '#FFC24B' }, om);
    [['w', 'polls every 60 s'], ['l', 'polls every 30 s'], ['g', 'polls every 60 s']].forEach(([k, sb], i) => {
      const g = grp(i + 1); arrow(g, BX + BW + 4, PX - 4, Y[k], COL[k], false); node(g, PX, Y[k] - NH / 2, PW, NH, 'Portal page', sb, COL[k]);
      mk('text', { class: 'tag', x: PX + PW - 62, y: Y[k] - NH / 2 + 28, text: 'LIVE', fill: '#2BD576' }, g);
    });
    const rn = grp(5); mk('text', { class: 'note', x: 96, y: 900, text: 'Weather reads its own store.' }, rn); mk('text', { class: 'note', x: 96, y: 930, text: 'Lightning and Gas live in CE Postgres.' }, rn); mk('text', { class: 'note', x: 96, y: 960, text: 'Three ponds, not one pool: next slide.', fill: '#FFB366' }, rn);
    ctx.lanes = lanes; ctx.fl = {};
    ['w', 'l', 'g'].forEach((k) => { ctx.fl[k] = ctx.flow(lanes[k], { color: COL[k], count: 5, speed: 190, r: 6, tail: 7, tailGap: 13 }); ctx.fl[k].stop().show(false); });
  },
  step(ctx, i) { ['w', 'l', 'g'].forEach((k, n) => { const on = i >= n + 1; ctx.fl[k].show(on); if (on) ctx.fl[k].start(); else ctx.fl[k].stop(); }); },
  static(ctx) { Object.values(ctx.fl).forEach((f) => f.show(true).freeze()); },
});
