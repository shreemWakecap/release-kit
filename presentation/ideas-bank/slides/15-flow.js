/* Slide: the path of every reading, at a glance. Two paths in today: our own Modbus path (Weather Station and Lightning share it) and the maker's cloud (Gas). Room for more paths. Light on detail; the details live in the speaker notes. */
Deck.add({
  id: 'flow', section: 'tech', title: 'Two paths in. One page.', kicker: 'Data and the bank · Sensor to screen', reality: ['code', 'live'], short: true,
  steps: 4, ambient: { orb: .9, beam: .4, dust: .8 }, dur: [4000, 5000, 5000, 5000, 6000], minutes: 1.3,
  notes: [
    'Two paths bring data in today. We can support more.',
    'Step 1: path 1 is our own Modbus path. A weather sensor talks Modbus. Our mesh radio and a gateway carry it to the cloud. Then our system works out the heat answer.',
    'Step 2: Lightning uses the same path. A warning unit decides on site. We are the backup. If we hear nothing, we never say all clear.',
    'Step 3: path 2 is the maker’s cloud. Gas detectors send to the maker, and we ask the maker for the readings.',
    'Step 4: we can support more paths. Today we have two. Both end on one page you read.',
    'If asked: Weather and Lightning both use Modbus. Weather has a sensor head. Lightning has an input module on the warning unit. Both ride the same mesh radio and gateway into AWS IoT and a queue. A sensors service saves the weather and the new backend reads it. The backend takes the Lightning queues itself. Gas is read from the maker’s cloud on a timer. This is from the code; deploy is not verified.',
  ].join('\n'),
  html: `
    <h2 class="h2 fl-h" data-step="0">Two paths in. <span class="o glow-text">One page.</span></h2>
    <p class="lead fl-lead" data-step="0" data-delay="200">Two paths today. Room for more.</p>
    <svg class="fl-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>`,
  css: `
    .s-flow .fl-h{position:absolute;left:96px;top:104px;width:1400px;font-size:62px}
    .s-flow .fl-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-flow .fl-svg{position:absolute;left:0;top:0;overflow:visible}
    .s-flow .nd rect{stroke-width:2.4}
    .s-flow .nd .t{font:800 27px/1 var(--font);fill:#fff}
    .s-flow .nd .s{font:500 21px/1 var(--font);fill:#B9B9B4}
    .s-flow .hd{font:800 19px/1 var(--font);letter-spacing:.2em;fill:#7D7D78;text-transform:uppercase}
    .s-flow .band-t{font:800 22px/1 var(--font);letter-spacing:.14em;text-transform:uppercase}
    .s-flow .more-t{font:800 30px/1 var(--font);fill:#D9D9D4}
    .s-flow .ar{stroke-width:2.6;fill:none}`,
  init(ctx) {
    const svg = ctx.q('.fl-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg);
    const COL = { w: '#FF8300', l: '#4FB3FF', g: '#2BD576', s: '#F1E4D4' };
    const X = [96, 426, 756], NW = 270, NH = 112, PX = 1100, PW = 360, QX = 1530, QW = 294;
    const Y = { w: 440, l: 580, m: 510, g: 800 };
    const grp = (step, delay) => mk('g', { 'data-step': step, 'data-delay': delay || 0 });
    /* column headers */
    [['On site', X[0], NW], ['On the way', X[1], NW], ['Cloud', X[2], NW], ['Our system', PX, PW], ['People', QX, QW]].forEach(([t, x, w], i) => {
      const g = grp(0, i * 80); mk('text', { class: 'hd', x, y: 296, text: t }, g); mk('line', { x1: x, y1: 312, x2: x + w, y2: 312, stroke: 'rgba(255,255,255,.14)', 'stroke-width': 1.5 }, g);
    });
    const node = (g, x, y, w, h, title, sub, col) => {
      const n = mk('g', { class: 'nd' }, g); mk('rect', { x, y, width: w, height: h, rx: 20, stroke: col, fill: '#0F0F11' }, n);
      mk('text', { class: 't', x: x + 20, y: y + 44, text: title }, n);
      mk('text', { class: 's', x: x + 20, y: y + 76, text: sub }, n);
    };
    const head = (g, x, y, col) => mk('polygon', { points: `${x},${y} ${x - 13},${y - 8} ${x - 13},${y + 8}`, fill: col }, g);
    const arrow = (g, x1, x2, y, col) => { mk('line', { class: 'ar', x1, y1: y, x2: x2 - 8, y2: y, stroke: col }, g); head(g, x2, y, col); };
    const band = (g, y, h, dashed) => mk('rect', { x: 80, y, width: 966, height: h, rx: 26, fill: 'rgba(255,255,255,.025)', stroke: 'rgba(255,255,255,.13)', 'stroke-width': 1.6, 'stroke-dasharray': dashed ? '10 9' : '' }, g);
    const row = (g, k, a, b) => {
      const r = mk('g', {}, g); mk('rect', { x: PX + 20, y: Y[k] - 44, width: PW - 40, height: 88, rx: 16, fill: '#0F0F11', stroke: COL[k], 'stroke-width': 1.8 }, r);
      mk('text', { x: PX + 38, y: Y[k] - 8, text: a, style: 'font:700 24px var(--font);fill:#fff' }, r); mk('text', { x: PX + 38, y: Y[k] + 22, text: b, style: 'font:500 21px var(--font);fill:#B9B9B4' }, r);
      arrow(g, PX + PW + 4, QX - 4, Y[k], COL[k]);
    };
    const page = (g, k, title) => node(g, QX, Y[k] - NH / 2, QW, NH, title, 'in the portal', COL[k]);
    /* invisible roads for the glowing packets: weather and Lightning share the middle of path 1 */
    const roads = {
      w: 'M366 440 C 392 440, 392 510, 418 510 L 1030 510 C 1066 510, 1066 440, 1096 440 L 1530 440',
      l: 'M366 580 C 392 580, 392 510, 418 510 L 1030 510 C 1066 510, 1066 580, 1096 580 L 1530 580',
      g: 'M366 800 L 1530 800',
    };
    ctx.roads = {}; ['w', 'l', 'g'].forEach((k) => { ctx.roads[k] = mk('path', { d: roads[k], stroke: 'none', fill: 'none' }); });
    /* the platform frame (step 1) */
    const pf = grp(1); mk('rect', { x: PX, y: 330, width: PW, height: 550, rx: 26, fill: 'rgba(255,131,0,.07)', stroke: '#FF8300', 'stroke-width': 2.6, filter: 'url(#fx-glow-soft)' }, pf);
    mk('text', { x: PX + 24, y: 366, text: 'Connected Environment', style: 'font:800 24px var(--font);fill:#fff' }, pf);
    /* step 1: path 1 with Weather Station */
    const g1 = grp(1);
    band(g1, 330, 340); mk('text', { class: 'band-t', x: 104, y: 364, text: 'Path 1 · Our Modbus path', fill: '#FFD2A3' }, g1);
    node(g1, X[0], Y.w - NH / 2, NW, NH, 'Weather sensor', 'Modbus', COL.w);
    mk('path', { class: 'ar', d: 'M370 440 C 392 440, 392 510, 414 510', stroke: COL.w }, g1); head(g1, X[1] - 4, Y.m, COL.s);
    node(g1, X[1], Y.m - NH / 2, NW, NH, 'Gateway', 'our mesh radio', COL.s);
    arrow(g1, X[1] + NW + 4, X[2] - 4, Y.m, COL.s);
    node(g1, X[2], Y.m - NH / 2, NW, NH, 'Cloud', 'waits in line', COL.s);
    mk('path', { class: 'ar', d: 'M1030 510 C 1066 510, 1066 440, 1092 440', stroke: COL.w }, g1); head(g1, PX, Y.w, COL.w);
    row(g1, 'w', 'Heat answer', 'work, rest, water'); page(g1, 'w', 'Weather page');
    /* step 2: Lightning joins the same path */
    const g2 = grp(2);
    node(g2, X[0], Y.l - NH / 2, NW, NH, 'Warning unit', 'Modbus', COL.l);
    mk('path', { class: 'ar', d: 'M370 580 C 392 580, 392 510, 414 510', stroke: COL.l }, g2);
    mk('path', { class: 'ar', d: 'M1030 510 C 1066 510, 1066 580, 1092 580', stroke: COL.l }, g2); head(g2, PX, Y.l, COL.l);
    row(g2, 'l', 'State of the site', 'only green is safe'); page(g2, 'l', 'Lightning page');
    /* step 3: path 2, the maker's cloud, with Gas */
    const g3 = grp(3);
    band(g3, 690, 186); mk('text', { class: 'band-t', x: 104, y: 724, text: 'Path 2 · The maker’s cloud', fill: '#7EE6A8' }, g3);
    node(g3, X[0], Y.g - NH / 2, NW, NH, 'Gas detector', 'on site', COL.g); arrow(g3, X[0] + NW + 4, X[1] - 4, Y.g, COL.g);
    node(g3, X[1], Y.g - NH / 2, NW, NH, 'Maker’s cloud', 'holds the readings', COL.g); arrow(g3, X[1] + NW + 4, X[2] - 4, Y.g, COL.g);
    node(g3, X[2], Y.g - NH / 2, NW, NH, 'WakeCap asks', 'on a timer', COL.g); arrow(g3, X[2] + NW + 4, PX - 4, Y.g, COL.g);
    row(g3, 'g', 'Alerts and limits', 'people handle them'); page(g3, 'g', 'Gas page');
    /* step 4: room for more paths */
    const g4 = grp(4);
    band(g4, 900, 84, true); mk('text', { class: 'more-t', x: 112, y: 953, text: '+  More paths can join.' }, g4);
    mk('path', { class: 'ar', d: 'M1050 942 L1280 942 L1280 896', stroke: '#8E8E89', 'stroke-dasharray': '7 8' }, g4);
    mk('polygon', { points: '1280,882 1272,896 1288,896', fill: '#8E8E89' }, g4);
    ctx.fl = {}; ['w', 'l', 'g'].forEach((k) => { ctx.fl[k] = ctx.flow(ctx.roads[k], { color: COL[k], count: 5, speed: 200, r: 6, tail: 7, tailGap: 13 }); ctx.fl[k].stop().show(false); });
  },
  step(ctx, i) { ['w', 'l', 'g'].forEach((k, n) => { const on = i >= n + 1; ctx.fl[k].show(on); if (on) ctx.fl[k].start(); else ctx.fl[k].stop(); }); },
  static(ctx) { Object.values(ctx.fl).forEach((f) => f.show(true).freeze()); },
});
