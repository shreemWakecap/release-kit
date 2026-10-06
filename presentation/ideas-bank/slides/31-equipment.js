/* Slide: Equipment meets the weather. One idea: weather readings could tell machines to stop, and a person approves. Vision: nobody has built the link.
   The machine side (GPS tracking, violation alerts) already exists in code; it wears the blue "In code" colour (the GPS unit on each machine, the strip at the bottom).
   The weather link and the approval are the vision part and wear purple.
   Step 0 three machines work (crane, lift, truck), each paired with its weather reading. 1 wind rises past its limit: the crane gets a "Stop lifting" suggestion.
   2 lightning strikes and the lamps climb to red: the lift gets a "Stop work" suggestion. 3 heat climbs: the truck gets a "Rest break" suggestion.
   4 a person approves: the suggestions become real, the load comes down, the lift lowers, the truck stops.
   Facts: C6 section 6.1 and seam S8 (equipments service: GPS tracking and alert rules, from internal documents; the Observation Manager takes vehicle alerts),
   C6 section 11 (no weather link exists), S5 only as plain words in the notes (each machine has its own wind limit; sensors cannot predict the first strike).
   No numbers on the slide: S5 numbers are outside numbers and this is a Vision slide. */
Deck.add({
  id: 'equipment', section: 'future', title: 'Equipment meets the weather', kicker: 'What it can do · Equipment', reality: ['vision', 'code'],
  steps: 4, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [3600, 5200, 5200, 5200, 6400], minutes: 1,
  notes: [
    'Machines on site work in the same weather as people.',
    'Step 1: strong wind, so the crane should stop lifting.',
    'Step 2: lightning, so people should come down from the lift.',
    'Step 3: heat climbs, so the driver should rest.',
    'Step 4: a person approves, and the machines stop.',
    'This is a vision, and nobody has built it.',
    'If asked: the machine side already exists in part. The equipments service tracks machines by GPS and has alert rules, from older internal documents. The Observation Manager code already takes vehicle alerts such as speed and seat belt. We found no link between machines and our weather, lightning or heat readings. Weather readings carry no zone yet, so a rule would first need to know which machines each station covers. Each machine has its own wind limit from its maker, so a rule would need to read that limit. Sensors can warn about lightning, but they cannot predict the first strike. A person would approve every stop. The machines in the picture are only drawings.',
  ].join('\n'),
  html: (() => {
    const PADX = [96, 684, 1272], PADY = 256, PH = 594;
    const P = [
      { n: 'Wind', m: 'Crane', c: '#F1E4D4', t: 'Stop lifting', sev: '#FFC24B', ic: 'stop' },
      { n: 'Lightning', m: 'Lift', c: '#4FB3FF', t: 'Stop work', sev: '#FF4D4D', ic: 'stop' },
      { n: 'Heat', m: 'Truck', c: '#FF8300', t: 'Rest break', sev: '#FFC24B', ic: 'pause' },
    ];
    const IC = {
      stop: '<path d="M17 5h14l12 12v14L31 43H17L5 31V17z"/><path d="M15 24h18"/>',
      pause: '<circle cx="24" cy="24" r="19"/><path d="M19 16v16M29 16v16"/>',
      check: '<path d="M10 25l9 9 19-20"/>',
      pin: '<path d="M24 44s14-12 14-24a14 14 0 1 0-28 0c0 12 14 24 14 24z"/><circle cx="24" cy="20" r="5"/>',
      bell: '<path d="M12 34V22a12 12 0 0 1 24 0v12l4 4H8z"/><path d="M20 42a4 4 0 0 0 8 0"/>',
      arrow: '<path d="M6 24h32M27 13l11 11-11 11"/>',
    };
    const ico = (p, s, w) => `<svg viewBox="0 0 48 48" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="${w || 3}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
    return `
    <h2 class="h2 eq-h" data-step="0">Equipment meets <span class="o glow-text">the weather.</span></h2>
    <p class="lead eq-lead" data-step="0" data-delay="200">Weather could tell machines to stop.</p>
    ${P.map((p, k) => `<div class="eq-pad" data-k="${k}" data-step="0" data-delay="${300 + k * 160}" style="left:${PADX[k]}px;top:${PADY}px;--c:${p.c}">
      <div class="eq-card glass flat"></div>
      <svg class="eq-ps" viewBox="0 0 552 ${PH}" width="552" height="${PH}"></svg>
      <div class="eq-hd"><span class="eq-rl">${p.n}</span><span class="eq-ar">${ico(IC.arrow, 26, 3.4)}</span><span class="eq-ml"><i class="eq-gps"></i>${p.m}</span></div>
    </div>`).join('')}
    <svg class="eq-rail" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    ${P.map((p, k) => `<div class="eq-chipw" style="left:${PADX[k]}px;top:${PADY + PH - 32}px"><div class="eq-chip sweepable" data-k="${k}" style="--c:${p.sev}"><span class="eq-ci">${ico(IC[p.ic], 34)}</span><b>${p.t}</b><span class="eq-ck">${ico(IC.check, 28, 4.5)}</span></div></div>`).join('')}
    <div class="eq-have" data-step="0" data-delay="1100"><span class="eq-hl">Already there</span><span class="chip eq-hc">${ico(IC.pin, 28)}GPS</span><span class="chip eq-hc">${ico(IC.bell, 28)}Violation alerts</span><span class="rb rb-code sm">In code</span></div>
    <p class="eq-whot" data-step="4" data-delay="250">A person approves</p>`;
  })(),
  css: `
    .s-equipment .eq-h{position:absolute;left:96px;top:104px;width:1700px;margin:0;font-size:62px}
    .s-equipment .eq-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-equipment .eq-pad{position:absolute;width:552px;height:594px}
    .s-equipment .eq-card{position:absolute;inset:0;border-radius:28px;border-color:color-mix(in srgb,var(--c) 26%,rgba(255,255,255,.1));transition:border-color .6s var(--ease),box-shadow .6s var(--ease)}
    .s-equipment .eq-card.hot{border-color:var(--c);box-shadow:0 0 0 1px color-mix(in srgb,var(--c) 40%,transparent),0 0 64px color-mix(in srgb,var(--c) 30%,transparent),0 30px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.18)}
    .s-equipment .eq-ps{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-equipment .eq-rail{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-equipment .eq-hd{position:absolute;left:30px;top:24px;display:flex;align-items:center;gap:14px;font:800 22px/1 var(--font);letter-spacing:.16em;text-transform:uppercase}
    .s-equipment .eq-rl{color:var(--c)}
    .s-equipment .eq-ar{display:grid;color:#74746F}
    .s-equipment .eq-ml{display:flex;align-items:center;gap:12px;color:#D9D9D4}
    .s-equipment .eq-gps{position:relative;display:block;width:12px;height:12px;border-radius:50%;background:#4FB3FF;box-shadow:0 0 12px #4FB3FF}
    .s-equipment .eq-gps::after{content:"";position:absolute;inset:-2px;border-radius:50%;border:2px solid #4FB3FF;opacity:0}
    .s-equipment.active .eq-gps::after{animation:eqPing 2.8s ease-out infinite}
    @keyframes eqPing{0%{transform:scale(.6);opacity:.9}100%{transform:scale(3);opacity:0}}
    /* drawing styles */
    .s-equipment .ln{fill:none;stroke:#E8DCCB;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
    .s-equipment .th{fill:none;stroke:#E8DCCB;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;opacity:.55}
    .s-equipment .fk{fill:#0F0F11}
    .s-equipment .og{stroke:#FFB366}
    .s-equipment .eq-lim{font:800 22px/1 var(--font);fill:#FFB366;letter-spacing:.08em;text-transform:uppercase}
    .s-equipment .eq-arc.over{animation:eqArc 1s ease-in-out infinite}
    @keyframes eqArc{50%{opacity:.45}}
    .s-equipment .eq-link{opacity:.3;transition:opacity .6s var(--ease)}
    .s-equipment .eq-link.on{opacity:1}
    .s-equipment .eq-gr{opacity:0;transform-box:fill-box;transform-origin:center}
    .s-equipment.active .eq-gr{animation:eqGr 2.8s ease-out infinite}
    @keyframes eqGr{0%{transform:scale(.7);opacity:.9}100%{transform:scale(3.4);opacity:0}}
    .s-equipment .eq-lamp{fill:#141416;stroke-width:2.5;opacity:.4;transition:fill .25s,opacity .25s}
    .s-equipment .eq-lamp.on{fill:var(--lc);opacity:1;filter:url(#fx-glow-soft)}
    .s-equipment .eq-liq{fill:#FF8300;transition:fill .4s}
    .s-equipment .eq-liq.over{fill:#FF4D4D}
    .s-equipment .eq-bolt{opacity:0}
    .s-equipment .eq-bolt.go{animation:eqBolt 1s linear both}
    @keyframes eqBolt{0%{opacity:0}6%{opacity:1}14%{opacity:.15}24%{opacity:1}44%{opacity:.35}100%{opacity:0}}
    .s-equipment .eq-flash{opacity:0}
    .s-equipment .eq-flash.go{animation:eqFlash 1s ease-out both}
    @keyframes eqFlash{0%{opacity:0}8%{opacity:.4}100%{opacity:0}}
    .s-equipment .eq-shim{opacity:0}
    .s-equipment.heat-on .eq-shim{animation:eqShim 2.6s ease-in infinite}
    @keyframes eqShim{0%{opacity:0;transform:translateY(0)}25%{opacity:.55}100%{opacity:0;transform:translateY(-34px)}}
    .s-equipment .eq-zz{opacity:0}
    .s-equipment.heat-on .eq-zz{animation:eqZz 3s ease-out infinite}
    @keyframes eqZz{0%{opacity:0;transform:translate(0,0)}18%{opacity:.95}70%{opacity:.8}100%{opacity:0;transform:translate(22px,-44px)}}
    /* chips: a suggestion first (purple, dashed), then approved by a person */
    .s-equipment .eq-chipw{position:absolute;width:552px;height:64px;display:flex;justify-content:center}
    .s-equipment .eq-chip{display:flex;align-items:center;gap:12px;height:64px;padding:0 24px 0 18px;border-radius:999px;border:2px dashed #C58BFF;background:#120E1B;color:#fff;
      opacity:0;transform:scale(.7) translateY(10px);transition:opacity .4s var(--ease),transform .55s cubic-bezier(.2,1.3,.3,1),border-color .5s,background .5s,box-shadow .5s}
    .s-equipment .eq-chip b{font:800 30px/1 var(--font);letter-spacing:-.01em;white-space:nowrap}
    .s-equipment .eq-ci{display:grid;color:#C58BFF;transition:color .5s}
    .s-equipment .eq-chip.show{opacity:1;transform:none;box-shadow:0 0 24px rgba(197,139,255,.25)}
    .s-equipment .eq-ck{display:grid;width:0;overflow:hidden;opacity:0;transform:scale(.4);color:var(--c);transition:width .4s var(--ease),opacity .4s var(--ease),transform .5s cubic-bezier(.2,1.3,.3,1)}
    .s-equipment .eq-chip.ok{border-style:solid;border-color:var(--c);background:linear-gradient(145deg,color-mix(in srgb,var(--c) 26%,#0b0b0c),color-mix(in srgb,var(--c) 8%,#0b0b0c));box-shadow:0 0 0 1px color-mix(in srgb,var(--c) 30%,transparent),0 0 44px color-mix(in srgb,var(--c) 40%,transparent)}
    .s-equipment .eq-chip.ok .eq-ci{color:var(--c)}
    .s-equipment .eq-chip.ok .eq-ck{width:28px;opacity:1;transform:none}
    /* what already exists */
    .s-equipment .eq-have{position:absolute;left:96px;top:931px;display:flex;align-items:center;gap:14px}
    .s-equipment .eq-hl{font:800 24px/1 var(--font);color:#D9D9D4;margin-right:4px}
    .s-equipment .eq-hc{gap:10px;font-size:24px;padding:10px 18px 10px 14px}
    .s-equipment .eq-hc svg{color:#4FB3FF}
    /* the person */
    .s-equipment .eq-whot{position:absolute;left:1018px;top:934px;margin:0;font:800 34px/1.1 var(--font);letter-spacing:-.01em;color:#fff}
    .s-equipment.on4 .eq-spin{animation:eqSpin 40s linear infinite;transform-box:fill-box;transform-origin:center}
    @keyframes eqSpin{to{transform:rotate(360deg)}}
    .s-equipment.eq-snap *,.s-equipment.eq-snap *::before,.s-equipment.eq-snap *::after,.s-equipment.no-trans *,.s-equipment.no-trans *::before,.s-equipment.no-trans *::after{transition:none!important}
    body.print .s-equipment *{animation:none!important}
    body.calm .s-equipment *,body.calm .s-equipment *::before,body.calm .s-equipment *::after{transition:none!important;animation:none!important}
    body.calm .s-equipment.heat-on .eq-shim{opacity:.4}
    body.calm .s-equipment.heat-on .eq-zz{opacity:.85}`,
  init(ctx) {
    const mk = Fx.el, svgs = ctx.qa('.eq-ps'), rail = ctx.q('.eq-rail');
    const LIM = .68, LIMH = .72, DX = 276, DY = 166, DR = 78;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    ctx.gen = 0;
    ctx.S = {
      t: 0, ph: 0, wheel: 0, road: 0, lastH: -99,
      wind: { c: .22, g: .22 }, heat: { c: .26, g: .26 }, amp: { c: 3, g: 3 }, L: { c: 94, g: 94 }, H: { c: 170, g: 170 }, spd: { c: 1, g: 1 },
    };
    const ground = (s) => mk('line', { x1: 28, y1: 548, x2: 524, y2: 548, stroke: 'rgba(255,255,255,.2)', 'stroke-width': 2, 'stroke-linecap': 'round' }, s);
    /* the GPS unit on a machine: a blue dot with a slow ping. The weather link arrives here. */
    const gpsUnit = (p, x, y) => { mk('circle', { class: 'eq-gr', cx: x, cy: y, r: 5, fill: 'none', stroke: '#4FB3FF', 'stroke-width': 2 }, p); mk('circle', { cx: x, cy: y, r: 5.5, fill: '#4FB3FF', filter: 'url(#fx-glow)' }, p); };
    /* a link from the weather reading to the machine: dotted, dim until its step, then packets run along it */
    const link = (s, d, ex, ey, col) => {
      const g = mk('g', { class: 'eq-link' }, s);
      mk('path', { d, stroke: '#C58BFF', 'stroke-width': 10, 'stroke-linecap': 'round', fill: 'none', opacity: .16 }, g);
      const p = mk('path', { d, stroke: '#C58BFF', 'stroke-width': 2.8, 'stroke-dasharray': '2 9', 'stroke-linecap': 'round', fill: 'none' }, g);
      mk('polygon', { points: `${ex - 9},${ey - 13} ${ex + 9},${ey - 13} ${ex},${ey}`, fill: '#C58BFF' }, g);
      const f = ctx.flow(p, { color: col, count: 2, speed: 120, r: 5.5, tail: 6, tailGap: 11 }); f.stop().show(false);
      return { g, f };
    };
    ctx.links = [];

    /* ====================================================== pad 0: wind and the crane */
    {
      const s = svgs[0];
      mk('ellipse', { cx: DX, cy: 170, rx: 210, ry: 100, fill: 'url(#g-core)', opacity: .1 }, s);
      ground(s);
      /* wind streaks stay inside the card */
      const defs = mk('defs', {}, s); mk('rect', { x: 4, y: 4, width: 544, height: 586, rx: 24 }, mk('clipPath', { id: 'eq-clip-w' }, defs));
      const sg = mk('g', { 'clip-path': 'url(#eq-clip-w)' }, s);
      ctx.streaks = [[34, 300, 96, 210], [176, 352, 74, 330], [24, 404, 112, 190], [118, 446, 84, 280], [232, 486, 70, 240], [300, 330, 92, 260], [372, 418, 80, 310], [410, 500, 96, 220]].map(([x, y, len, sp]) => ({ x, y, len, sp,
        el: mk('line', { stroke: '#F1E4D4', 'stroke-width': 2.4, 'stroke-linecap': 'round', opacity: 0 }, sg) }));
      /* the wind dial */
      const pt = (v, r) => { const th = Math.PI * (1 - v); return [DX + r * Math.cos(th), DY - r * Math.sin(th)]; };
      const arc = (v0, v1, col, cls) => { const [x0, y0] = pt(v0, DR), [x1, y1] = pt(v1, DR); return mk('path', { class: cls || '', d: `M${x0.toFixed(1)} ${y0.toFixed(1)} A ${DR} ${DR} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`, stroke: col, 'stroke-width': 15, fill: 'none' }, s); };
      arc(0, LIM, '#2BD576'); ctx.arcHi = arc(LIM, 1, '#FFC24B', 'eq-arc');
      const [tx0, ty0] = pt(LIM, DR - 17), [tx1, ty1] = pt(LIM, DR + 15), [lx, ly] = pt(LIM, DR + 30);
      mk('line', { x1: tx0, y1: ty0, x2: tx1, y2: ty1, stroke: '#fff', 'stroke-width': 11, 'stroke-linecap': 'round', opacity: .2 }, s);
      ctx.limTick = mk('line', { x1: tx0, y1: ty0, x2: tx1, y2: ty1, stroke: '#fff', 'stroke-width': 4, 'stroke-linecap': 'round' }, s);
      mk('text', { class: 'eq-lim', x: lx + 6, y: ly + 4, text: 'Limit' }, s);
      ctx.needle = mk('polygon', { points: `${DX - 6},${DY} ${DX + 6},${DY} ${DX},${DY - 64}`, fill: '#fff', stroke: 'rgba(255,255,255,.28)', 'stroke-width': 7, 'stroke-linejoin': 'round' }, s);
      mk('circle', { cx: DX, cy: DY, r: 13, fill: '#FFB366' }, s); mk('circle', { cx: DX, cy: DY, r: 5.5, fill: '#0F0F11' }, s);
      /* the link to the crane's GPS unit */
      ctx.links.push(link(s, 'M276 186 V232', 276, 246, '#F1E4D4'));
      /* the tower crane. The whole crane sways a little in wind. */
      const crane = ctx.sway = mk('g', {}, s);
      mk('rect', { class: 'ln fk', x: 238, y: 540, width: 76, height: 8, rx: 2 }, crane);
      mk('line', { class: 'ln', x1: 265, y1: 334, x2: 265, y2: 540 }, crane); mk('line', { class: 'ln', x1: 287, y1: 334, x2: 287, y2: 540 }, crane);
      let d = 'M265 540'; for (let k = 0; k < 9; k++) d += ` L${k % 2 === 0 ? 287 : 265} ${(540 - (k + 1) * (206 / 9)).toFixed(1)}`;
      mk('path', { class: 'th', d }, crane);
      mk('rect', { class: 'ln fk', x: 254, y: 326, width: 44, height: 8, rx: 2 }, crane);
      /* jib and counter-jib: two chords and a zigzag */
      const truss = (x0, x1) => { mk('line', { class: 'ln', x1: x0, y1: 314, x2: x1, y2: 314 }, crane); mk('line', { class: 'ln', x1: x0, y1: 326, x2: x1, y2: 326 }, crane);
        const dir = x1 > x0 ? 1 : -1; let z = `M${x0} 326`, up = true; for (let x = x0 + dir * 20; dir * (x1 - x) >= 0; x += dir * 20) { z += ` L${x} ${up ? 314 : 326}`; up = !up; } mk('path', { class: 'th', d: z }, crane); };
      truss(287, 520); truss(265, 142);
      mk('rect', { class: 'ln fk og', x: 134, y: 326, width: 40, height: 28, rx: 3 }, crane);
      mk('rect', { class: 'ln fk', x: 226, y: 338, width: 34, height: 26, rx: 3 }, crane);
      mk('rect', { class: 'th og', x: 232, y: 344, width: 14, height: 11, rx: 2, style: 'opacity:.9' }, crane);
      mk('circle', { cx: 254, cy: 345, r: 3.5, fill: '#FFC24B', filter: 'url(#fx-glow-soft)' }, crane);
      mk('path', { class: 'ln', d: 'M262 314 L276 268 L290 314' }, crane);
      mk('line', { class: 'ln', x1: 276, y1: 268, x2: 276, y2: 260 }, crane);
      gpsUnit(crane, 276, 255);
      mk('path', { class: 'th', d: 'M276 268 L150 314 M276 268 L380 314 M276 268 L500 314', style: 'opacity:.7' }, crane);
      mk('rect', { class: 'ln fk', x: 436, y: 326, width: 26, height: 8, rx: 2 }, crane);
      /* the hook and the load swing like a pendulum */
      ctx.swing = mk('g', { transform: 'translate(449 334)' }, crane);
      ctx.cable = mk('line', { class: 'th', x1: 0, y1: 0, x2: 0, y2: 94, style: 'opacity:.9;stroke-width:2.4' }, ctx.swing);
      ctx.load = mk('g', { transform: 'translate(0 94)' }, ctx.swing);
      mk('rect', { class: 'ln fk', x: -8, y: -2, width: 16, height: 12, rx: 3 }, ctx.load);
      mk('path', { class: 'th', d: 'M0 10 L-22 18 M0 10 L22 18', style: 'opacity:.9' }, ctx.load);
      mk('rect', { class: 'ln og', x: -26, y: 18, width: 52, height: 36, rx: 3, fill: '#1A1A1D' }, ctx.load);
      mk('path', { class: 'th og', d: 'M-26 36H26M0 18V54' }, ctx.load);
    }

    /* ====================================================== pad 1: lightning and the lift */
    {
      const s = svgs[1];
      mk('ellipse', { cx: DX, cy: 150, rx: 210, ry: 100, fill: 'url(#g-core)', opacity: .1 }, s);
      ground(s);
      /* the state lamps: green, yellow, red. Only green is safe. */
      mk('polygon', { points: '284,87 264.8,119.2 277.6,119.2 268,144.8 290.4,109.6 277.6,109.6', fill: '#4FB3FF', filter: 'url(#fx-glow-soft)' }, s);
      const LC = ['#22C55E', '#FFD23F', '#FF4D4D'];
      ctx.lamps = LC.map((c, k) => mk('circle', { class: 'eq-lamp', cx: DX - 108 + k * 108, cy: 186, r: 25, style: `--lc:${c};stroke:${c}` }, s));
      /* the link runs from the red lamp to the GPS unit on the lift's mast */
      ctx.links.push(link(s, 'M384 224 V262', 384, 278, '#4FB3FF'));
      /* the scissor lift, with a mast and a GPS unit at the back */
      mk('path', { class: 'ln', d: 'M366 516 H384 V296' }, s); gpsUnit(s, 384, 291);
      mk('rect', { class: 'ln fk', x: 186, y: 506, width: 180, height: 24, rx: 8 }, s);
      [214, 338].forEach((x) => { mk('circle', { class: 'ln fk', cx: x, cy: 531, r: 17 }, s); mk('circle', { class: 'th', cx: x, cy: 531, r: 6 }, s); });
      ctx.scis = []; for (let k = 0; k < 4; k++) ctx.scis.push([mk('line', { class: 'ln' }, s), mk('line', { class: 'ln' }, s)]);
      ctx.deck = mk('g', {}, s);
      mk('rect', { class: 'ln fk og', x: 196, y: -6, width: 160, height: 6, rx: 2 }, ctx.deck);
      mk('path', { class: 'ln', d: 'M200 -6 V-56 H352 V-6 M200 -30 H352' }, ctx.deck);
      mk('circle', { cx: 276, cy: -47, r: 9, fill: 'none', stroke: '#fff', 'stroke-width': 3 }, ctx.deck);
      mk('path', { d: 'M265 -50 A11 11 0 0 1 287 -50 Z', fill: '#FFC24B' }, ctx.deck);
      mk('path', { d: 'M276 -37 V-19 M276 -33 L262 -22 M276 -33 L290 -22 M276 -19 L268 -6 M276 -19 L284 -6', fill: 'none', stroke: '#fff', 'stroke-width': 3, 'stroke-linecap': 'round' }, ctx.deck);
      /* the strike: a flash on the whole card, and a bolt to the ground */
      ctx.flash = mk('rect', { class: 'eq-flash', x: 0, y: 0, width: 552, height: 594, rx: 28, fill: '#BFE3FF' }, s);
      ctx.bolt = mk('g', { class: 'eq-bolt' }, s);
      const bp = '492,64 470,142 490,150 462,270 482,278 450,412 466,420 440,548';
      mk('polyline', { points: bp, fill: 'none', stroke: '#4FB3FF', 'stroke-width': 14, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', opacity: .5, filter: 'url(#fx-glow)' }, ctx.bolt);
      mk('polyline', { points: bp, fill: 'none', stroke: '#fff', 'stroke-width': 4.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, ctx.bolt);
      ctx.hit = mk('circle', { cx: 440, cy: 546, r: 3, fill: 'none' }, s);
    }

    /* ====================================================== pad 2: heat and the truck */
    {
      const s = svgs[2];
      mk('ellipse', { cx: DX, cy: 150, rx: 210, ry: 100, fill: 'url(#g-core)', opacity: .1 }, s);
      ground(s);
      /* the sun, brighter with heat */
      ctx.sunGlow = mk('circle', { cx: 448, cy: 112, r: 40, fill: 'url(#g-core)', opacity: .4 }, s);
      mk('circle', { cx: 448, cy: 112, r: 20, fill: '#FFB366', filter: 'url(#fx-glow-soft)' }, s);
      let rays = ''; for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5, c = Math.cos(a), n = Math.sin(a); rays += `M${(448 + 30 * c).toFixed(1)} ${(112 + 30 * n).toFixed(1)} L${(448 + 40 * c).toFixed(1)} ${(112 + 40 * n).toFixed(1)} `; }
      mk('path', { d: rays, stroke: '#FFB366', 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none' }, s);
      /* the thermometer */
      mk('rect', { x: 258, y: 72, width: 36, height: 124, rx: 18, fill: '#0F0F11', stroke: 'rgba(255,255,255,.7)', 'stroke-width': 2.4 }, s);
      mk('circle', { cx: 276, cy: 206, r: 26, fill: '#0F0F11', stroke: 'rgba(255,255,255,.7)', 'stroke-width': 2.4 }, s);
      ctx.liq = mk('g', { class: 'eq-liq' }, s);
      ctx.liqRect = mk('rect', { x: 266, y: 150, width: 20, height: 64, rx: 10 }, ctx.liq);
      mk('circle', { cx: 276, cy: 206, r: 19 }, ctx.liq);
      const ly = 190 - LIMH * 108;
      mk('line', { x1: 246, y1: ly, x2: 306, y2: ly, stroke: '#fff', 'stroke-width': 10, 'stroke-linecap': 'round', opacity: .2 }, s);
      ctx.limTickH = mk('line', { x1: 246, y1: ly, x2: 306, y2: ly, stroke: '#fff', 'stroke-width': 3.5, 'stroke-linecap': 'round' }, s);
      /* link to the GPS unit on the cab roof (curved: the cab sits to the right) */
      ctx.links.push(link(s, 'M276 238 C 276 296, 342 290, 342 366', 342, 380, '#FF8300'));
      /* heat shimmer above the truck */
      [96, 170, 244].forEach((x) => mk('path', { class: 'eq-shim', d: `M${x} 386 q10 -14 0 -28 t0 -28 t0 -28`, stroke: '#FF8300', 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none' }, s));
      /* the dump truck */
      ctx.road = mk('line', { x1: 28, y1: 548, x2: 524, y2: 548, stroke: 'rgba(255,255,255,.45)', 'stroke-width': 3, 'stroke-dasharray': '24 22' }, s);
      ctx.truck = mk('g', {}, s);
      const tr = ctx.truck;
      mk('path', { class: 'ln fk', d: 'M64 392 L284 392 L308 478 L64 478 Z' }, tr);
      mk('path', { class: 'th', d: 'M110 392 V478 M156 392 V478 M202 392 V478 M248 392 V478' }, tr);
      mk('rect', { class: 'ln fk', x: 56, y: 478, width: 372, height: 20, rx: 4 }, tr);
      mk('path', { class: 'ln fk', d: 'M318 478 V416 H366 L398 452 L440 458 L444 478 Z' }, tr);
      mk('path', { class: 'th og', d: 'M330 428 H358 L380 452 H330 Z', style: 'opacity:.9' }, tr);
      mk('circle', { cx: 346, cy: 440, r: 7, fill: '#fff' }, tr);
      mk('path', { d: 'M334 452 C334 446 358 446 358 452', fill: 'none', stroke: '#fff', 'stroke-width': 3.5, 'stroke-linecap': 'round' }, tr);
      mk('rect', { x: 438, y: 462, width: 8, height: 9, rx: 2, fill: '#FFD9A0', filter: 'url(#fx-glow-soft)' }, tr);
      mk('line', { class: 'ln', x1: 342, y1: 416, x2: 342, y2: 402 }, tr);
      gpsUnit(tr, 342, 396);
      /* drowsy driver: z z Z drift up from the cab when it is hot */
      [['z', 0, 22], ['z', 1, 28], ['Z', 2, 34]].forEach(([z, k, sz]) => mk('text', { class: 'eq-zz', x: 372 + k * 14, y: 424 - k * 10, text: z, style: `font:800 ${sz}px var(--font);fill:#FFD9A0;animation-delay:${k * .8}s` }, s));
      ctx.wheels = [118, 180, 382].map((x) => {
        const g = mk('g', { transform: `translate(${x} 522)` }, ctx.truck);
        mk('circle', { class: 'ln fk', cx: 0, cy: 0, r: 26 }, g); mk('circle', { class: 'th', cx: 0, cy: 0, r: 12 }, g);
        return mk('path', { class: 'th', d: 'M0 -12 V12 M-10.4 -6 L10.4 6 M-10.4 6 L10.4 -6', style: 'opacity:.9' }, g);
      });
    }

    /* ====================================================== the person, and the rail from the person to the three chips */
    {
      const CX = [372, 960, 1548], RY = 906, AY = 954;
      const defs = mk('defs', {}, rail), rg = mk('radialGradient', { id: 'eq-hg', cx: .5, cy: .5, r: .5 }, defs);
      mk('stop', { offset: 0, 'stop-color': 'rgba(255,170,80,.5)' }, rg); mk('stop', { offset: .55, 'stop-color': 'rgba(255,131,0,.16)' }, rg); mk('stop', { offset: 1, 'stop-color': 'rgba(255,131,0,0)' }, rg);
      const who = mk('g', { 'data-step': 4 }, rail);
      const rd = `M${CX[0]} 884 V${RY} M${CX[1]} 884 V${RY} M${CX[2]} 884 V${RY} M${CX[0]} ${RY} H${CX[2]} M${CX[1]} ${RY} V${AY - 36}`;
      mk('path', { d: rd, fill: 'none', stroke: 'rgba(197,139,255,.16)', 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, who);
      mk('path', { d: rd, fill: 'none', stroke: 'rgba(197,139,255,.8)', 'stroke-width': 3, 'stroke-dasharray': '2 11', 'stroke-linecap': 'round' }, who);
      mk('circle', { cx: CX[1], cy: AY, r: 92, fill: 'url(#eq-hg)' }, who);
      mk('circle', { class: 'eq-spin', cx: CX[1], cy: AY, r: 46, fill: 'none', stroke: 'rgba(255,214,170,.55)', 'stroke-width': 2.5, 'stroke-dasharray': '3 10', 'stroke-linecap': 'round' }, who);
      ctx.avatar = mk('circle', { cx: CX[1], cy: AY, r: 34, fill: 'rgba(255,255,255,.07)', stroke: 'rgba(255,255,255,.75)', 'stroke-width': 2.5, filter: 'url(#fx-glow-soft)' }, who);
      mk('circle', { cx: CX[1], cy: AY - 7, r: 10, fill: '#fff' }, who);
      mk('path', { d: `M${CX[1] - 18} ${AY + 18} C${CX[1] - 18} ${AY + 4} ${CX[1] + 18} ${AY + 4} ${CX[1] + 18} ${AY + 18}`, fill: 'none', stroke: '#fff', 'stroke-width': 4.5, 'stroke-linecap': 'round' }, who);
      /* packets run from the person up to each chip */
      ctx.rf = CX.map((x, k) => {
        const road = mk('path', { d: k === 1 ? `M${x} ${AY - 36} V886` : `M${CX[1]} ${AY - 36} V${RY} H${x} V886`, fill: 'none', stroke: 'none' }, who);
        const f = ctx.flow(road, { color: '#E4C9FF', count: 2, speed: 220, r: 5.5, tail: 6, tailGap: 11 }); f.stop().show(false); return f;
      });
    }

    ctx.cards = ctx.qa('.eq-card'); ctx.chips = ctx.qa('.eq-chip');
    ctx.fl = ctx.links.map((l) => l.f);

    /* ====================================================== numbers for each step, and drawing */
    const ST = (i) => ({ wind: i >= 1 ? .9 : .22, amp: i >= 4 ? 0 : i >= 1 ? 17 : 3, L: i >= 4 ? 160 : 94, H: i >= 4 ? 40 : 170, spd: i >= 4 ? 0 : 1, heat: i >= 3 ? .93 : .26, lamp: i >= 2 ? 2 : 0 });
    ctx.setLamp = (n) => { ctx.lampIdx = n; ctx.lamps.forEach((l, k) => l.classList.toggle('on', k === n)); };
    ctx.hot = (list) => ctx.cards.forEach((c, k) => c.classList.toggle('hot', list.includes(k)));
    ctx.linkOn = (k, on) => { ctx.links[k].g.classList.toggle('on', on); ctx.fl[k].show(on); if (on) ctx.fl[k].start(); else ctx.fl[k].stop(); };
    ctx.chipShow = (k, on) => { ctx.chips[k].classList.toggle('show', on); if (!on) ctx.chips[k].classList.remove('ok'); };
    ctx.railOn = (on) => { ctx.rf.forEach((f) => { f.show(on); if (on) f.start(); else f.stop(); }); ctx.root.classList.toggle('on4', on); };
    /* put everything in the state of step i, at once */
    ctx.apply = (i) => {
      const S = ctx.S, T = ST(i);
      ['wind', 'heat', 'amp', 'L', 'H', 'spd'].forEach((k) => { S[k].g = T[k]; S[k].c = T[k]; });
      ctx.setLamp(T.lamp);
      ctx.hot(i === 4 ? [0, 1, 2] : i >= 1 ? [i - 1] : []);
      ctx.chips.forEach((c, k) => { c.classList.toggle('show', i >= k + 1); c.classList.toggle('ok', i >= 4); });
      [0, 1, 2].forEach((k) => ctx.linkOn(k, i >= k + 1));
      ctx.railOn(i >= 4);
      ctx.root.classList.toggle('heat-on', i >= 3);
      ctx.bolt.classList.remove('go'); ctx.flash.classList.remove('go');
      ctx.render();
    };
    ctx.render = () => {
      const S = ctx.S, calm = ctx.calm, t = S.t;
      /* wind dial and crane */
      const over = S.wind.c > LIM;
      const jit = calm ? 0 : over ? Math.sin(t * 5.1) * 1.3 + Math.sin(t * 2.3) * 1.0 : Math.sin(t * 2.7) * .6;
      ctx.needle.setAttribute('transform', `rotate(${(-90 + 180 * S.wind.c + jit).toFixed(2)} ${DX} ${DY})`);
      ctx.arcHi.classList.toggle('over', over && !calm);
      const th = calm ? 0 : S.amp.c * (Math.sin(S.ph) + .28 * Math.sin(S.ph * 2.3 + 1));
      ctx.swing.setAttribute('transform', `translate(449 334) rotate(${th.toFixed(2)})`);
      ctx.cable.setAttribute('y2', S.L.c.toFixed(1));
      ctx.load.setAttribute('transform', `translate(0 ${S.L.c.toFixed(1)})`);
      ctx.sway.setAttribute('transform', `rotate(${(calm ? 0 : S.wind.c * .7 * Math.sin(t * 1.7)).toFixed(3)} 276 548)`);
      const vis = clamp((S.wind.c - .3) / .5, 0, 1);
      ctx.streaks.forEach((k) => {
        const f = clamp(Math.min(k.x + k.len, 552 - k.x) / 80, 0, 1);
        k.el.setAttribute('x1', k.x.toFixed(1)); k.el.setAttribute('x2', (k.x + k.len).toFixed(1)); k.el.setAttribute('y1', k.y.toFixed(1)); k.el.setAttribute('y2', k.y.toFixed(1));
        k.el.setAttribute('opacity', (vis * f * .7).toFixed(2));
      });
      /* lift */
      if (Math.abs(S.H.c - S.lastH) > .01) {
        S.lastH = S.H.c; const hh = S.H.c / 4;
        ctx.scis.forEach((p, k) => { const yb = 506 - k * hh, yt = yb - hh;
          p[0].setAttribute('x1', 246); p[0].setAttribute('y1', yb.toFixed(1)); p[0].setAttribute('x2', 306); p[0].setAttribute('y2', yt.toFixed(1));
          p[1].setAttribute('x1', 306); p[1].setAttribute('y1', yb.toFixed(1)); p[1].setAttribute('x2', 246); p[1].setAttribute('y2', yt.toFixed(1)); });
        ctx.deck.setAttribute('transform', `translate(0 ${(506 - S.H.c).toFixed(1)})`);
      }
      /* truck */
      ctx.wheels.forEach((w) => w.setAttribute('transform', `rotate(${S.wheel.toFixed(1)})`));
      ctx.road.setAttribute('stroke-dashoffset', (S.road % 46).toFixed(1));
      ctx.truck.setAttribute('transform', `translate(0 ${(calm ? 0 : Math.sin(t * 17) * .9 * S.spd.c).toFixed(2)})`);
      /* heat */
      const yTop = 190 - S.heat.c * 108;
      ctx.liqRect.setAttribute('y', yTop.toFixed(1)); ctx.liqRect.setAttribute('height', (214 - yTop).toFixed(1));
      ctx.liq.classList.toggle('over', S.heat.c > LIMH);
      ctx.sunGlow.setAttribute('r', (40 + S.heat.c * 46).toFixed(1)); ctx.sunGlow.setAttribute('opacity', (.25 + S.heat.c * .55).toFixed(2));
    };
    ctx.tick = (dt) => {
      const S = ctx.S; if (ctx.calm) return;
      const ap = (o, r) => { o.c += (o.g - o.c) * Math.min(1, dt * r); if (Math.abs(o.g - o.c) < 1e-3) o.c = o.g; };
      const mv = (o, v) => { const d = o.g - o.c, m = v * dt; o.c = Math.abs(d) <= m ? o.g : o.c + Math.sign(d) * m; };
      S.t += dt;
      ap(S.wind, 2); ap(S.heat, 1.4); ap(S.amp, S.amp.g === 0 ? 3 : 1.6); mv(S.L, 62); mv(S.H, 84); ap(S.spd, 1.7);
      S.ph += dt * 2.2 * Math.sqrt(94 / S.L.c);
      S.wheel = (S.wheel + S.spd.c * dt * 520) % 360; S.road -= S.spd.c * dt * 240;
      const vis = clamp((S.wind.c - .3) / .5, 0, 1);
      ctx.streaks.forEach((k) => { k.x += k.sp * (.3 + S.wind.c * 1.4) * dt * (vis > 0 ? 1 : .2); if (k.x > 552 + 20) { k.x = -100; k.y = 286 + Math.random() * 230; } });
      ctx.render();
    };
    ctx.strike = () => {
      ctx.bolt.classList.remove('go'); ctx.flash.classList.remove('go'); void ctx.bolt.getBoundingClientRect();
      ctx.bolt.classList.add('go'); ctx.flash.classList.add('go');
      Fx.burstEl(ctx.hit, { n: 30, color: '#9AD4FF', speed: 440 });
    };
    ctx.apply(0);
  },
  enter(ctx) { ctx.raf((dt) => ctx.tick(dt)); },
  step(ctx, i, dir, instant) {
    const R = ctx.root, gen = ++ctx.gen, fwd = dir > 0 && !instant && !ctx.calm && i > 0, S = ctx.S;
    const at = (ms, fn) => ctx.after(ms, () => { if (gen === ctx.gen) fn(); });
    R.classList.add('eq-snap'); ctx.apply(fwd ? i - 1 : i); void R.offsetWidth;
    if (!fwd) { requestAnimationFrame(() => R.classList.remove('eq-snap')); return; }
    R.classList.remove('eq-snap');
    const pop = (k, col) => { ctx.chipShow(k, true); Fx.burstEl(ctx.chips[k], { n: 20, color: col, speed: 300 }); };
    if (i === 1) {
      ctx.hot([0]); S.wind.g = .9; S.amp.g = 17;
      at(450, () => ctx.linkOn(0, true));
      at(600, () => Fx.burstEl(ctx.limTick, { n: 16, color: '#FFC24B', speed: 260 }));
      at(1250, () => pop(0, '#C58BFF'));
    } else if (i === 2) {
      ctx.hot([1]); at(200, ctx.strike);
      at(560, () => ctx.setLamp(1)); at(900, () => ctx.setLamp(2));
      at(1050, () => ctx.linkOn(1, true));
      at(1550, () => pop(1, '#C58BFF'));
    } else if (i === 3) {
      ctx.hot([2]); S.heat.g = .93; at(700, () => R.classList.add('heat-on'));
      at(600, () => ctx.linkOn(2, true));
      at(850, () => Fx.burstEl(ctx.limTickH, { n: 16, color: '#FF6B5E', speed: 260 }));
      at(1500, () => pop(2, '#C58BFF'));
    } else if (i === 4) {
      ctx.hot([0, 1, 2]); ctx.railOn(true);
      at(900, () => {
        ctx.chips.forEach((c, k) => at(k * 160, () => { c.classList.add('ok'); Fx.sweep(c); Fx.burstEl(c.querySelector('.eq-ck'), { n: 24, color: ['#FFC24B', '#FF4D4D', '#FFC24B'][k], speed: 340 }); }));
        S.wind.g = .9; S.amp.g = 0; S.L.g = 160; S.H.g = 40; S.spd.g = 0;
      });
      at(1000, () => Fx.burstEl(ctx.avatar, { n: 30, color: '#FFB366', speed: 380 }));
    }
  },
  static(ctx) {
    ctx.gen++; ctx.root.classList.add('eq-snap'); ctx.apply(4);
    ctx.fl.concat(ctx.rf).forEach((f) => f.show(true).freeze());
  },
});
