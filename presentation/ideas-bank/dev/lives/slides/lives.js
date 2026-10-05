/* Slide: Save lives: the closed loop. One idea: Sense, Predict, Decide, Notify, Act is one loop, most of it exists, and a person stays in charge.
   Vision: the whole loop is not built. Pieces that exist wear their own badge: Sense and Decide are live, Notify is in code, Predict is vision. No numbers on purpose.
   Step 0 five dim stations on a ring. 1 Sense lights. 2 a line and packets run to Predict. 3 Decide. 4 Notify (Observation Manager, recipient rules). 5 Act, the ring closes, a person sits at the centre.
   Facts: C2 (verdict on the live Weather page), C3 and C4 (Lightning and Gas pages live), C6 H1, H2 (Observation Manager, recipient rules), C6 H5 and S6 (helmet alarm exists, no rule calls it), C6 11 (no forecast code). */
Deck.add({
  id: 'lives', section: 'future', title: 'Save lives: the closed loop', kicker: 'What it can do · Save lives', reality: ['vision', 'live', 'code'],
  steps: 5, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [3600, 3000, 3800, 3800, 3800, 6000], minutes: 1,
  notes: [
    'Step 1: sensors read the weather, lightning and gas.',
    'Step 2: a forecast would give people more time to act.',
    'Nobody has built that part.',
    'Step 3: the Safety Policy turns the readings into one answer.',
    'Step 4: the Observation Manager and its rules tell the right people.',
    'Step 5: a person acts and stays in charge.',
    'If asked: the Weather, Lightning and Gas pages are live on production. The Safety Policy gives the answer on the Weather page. Weather and Lightning alerts leave through the Observation Manager in the code, but nobody has seen one arrive in production yet. Recipient rules pick people by source, zone and company. Weather alerts carry no zone today, and SMS goes out only for worker events. Gas alerts are not proven to arrive. For Lightning the site warning unit comes first and we are the backup. The safety service can already ring helmets in a zone, but no rule calls it. A rule could, only with a person approving. No forecast code exists today.',
  ].join('\n'),
  html: `
    <h2 class="h2 lfl-h" data-step="0">A loop that <span class="o glow-text">saves lives.</span></h2>
    <svg class="lfl-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <div class="lfl-core" data-step="0" data-delay="700">
      <svg class="lfl-halo" viewBox="-200 -200 400 400" width="400" height="400" aria-hidden="true"><defs><radialGradient id="lfl-hg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="rgba(255,170,80,.5)"/><stop offset=".55" stop-color="rgba(255,131,0,.16)"/><stop offset="1" stop-color="rgba(255,131,0,0)"/></radialGradient></defs><circle r="200" fill="url(#lfl-hg)"/></svg>
      <svg class="lfl-spin" viewBox="-100 -100 200 200" width="200" height="200" aria-hidden="true"><circle r="92" fill="none" stroke="rgba(255,214,170,.5)" stroke-width="2.5" stroke-dasharray="3 11" stroke-linecap="round"/></svg>
      <svg class="lfl-av" viewBox="-40 -40 80 80" width="128" height="128" aria-hidden="true"><circle r="38"/><circle class="h" cx="0" cy="-9" r="12"/><path d="M-22 22 C-22 3 22 3 22 22"/></svg>
      <p class="lfl-ct"><span>A person stays in charge.</span></p>
    </div>
    <div class="lfl-nodes"></div>`,
  css: `
    .s-lives .lfl-h{position:absolute;left:96px;top:104px;width:1500px;margin:0;font-size:62px}
    .s-lives .lfl-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-lives .lfl-arc{stroke-dasharray:1;stroke-dashoffset:1;stroke-linecap:butt;transition:stroke-dashoffset 1.1s var(--ease)}
    .s-lives .lfl-arc.on{stroke-dashoffset:0}
    .s-lives .lfl-chev{fill:rgba(255,255,255,.24);transition:fill .5s var(--ease)}
    .s-lives .lfl-chev.on{fill:#FFB366}
    .s-lives .lfl-spoke{stroke:rgba(255,214,170,.5);stroke-width:2.5;stroke-dasharray:2 11;stroke-linecap:round;opacity:0;transition:opacity .9s var(--ease) var(--d,0s)}
    .s-lives.core .lfl-spoke{opacity:1}
    .s-lives .lfl-nw{position:absolute;width:340px;height:160px}
    .s-lives .lfl-node{--lc:#FF8300;position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 26px;border-radius:26px;background:linear-gradient(145deg,#17171A,#0E0E10);border:2px solid rgba(255,255,255,.16);transition:border-color .6s var(--ease),box-shadow .6s var(--ease)}
    .s-lives .lfl-hd,.s-lives .lfl-s{opacity:.5;transition:opacity .6s var(--ease)}
    .s-lives .lfl-node.on .lfl-hd,.s-lives .lfl-node.on .lfl-s{opacity:1}
    .s-lives .lfl-node.on{border-color:var(--lc);box-shadow:0 0 0 1px color-mix(in srgb,var(--lc) 30%,transparent),0 0 56px color-mix(in srgb,var(--lc) 38%,transparent),0 24px 60px rgba(0,0,0,.5)}
    .s-lives .lfl-node.vis{--lc:#C58BFF}
    .s-lives .lfl-node.vis.on{border-style:dashed}
    .s-lives .lfl-node::before{content:"";position:absolute;inset:-2px;border-radius:28px;border:2px solid var(--lc);opacity:0;pointer-events:none}
    .s-lives .lfl-node.on::before{animation:lflRing 1.3s var(--ease) .1s 1 both}
    @keyframes lflRing{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.14,1.34);opacity:0}}
    .s-lives .lfl-hd{display:flex;align-items:center;gap:14px}
    .s-lives .lfl-hd b{font:800 40px/1 var(--font);color:#fff;letter-spacing:-.01em}
    .s-lives .lfl-ic{width:46px;height:46px;display:grid;place-items:center;color:#8E8E89;transition:color .6s var(--ease)}
    .s-lives .lfl-node.on .lfl-ic{color:var(--lc)}
    .s-lives .lfl-s{display:block;margin-top:6px;font:500 26px/1.15 var(--font);color:#B9B9B4;white-space:nowrap}
    .s-lives .lfl-hd + .lfl-s{margin-top:12px}
    .s-lives .lfl-chip{position:absolute;right:22px;top:-21px;background:#0B0B0C;opacity:0;transform:scale(.6);transition:opacity .35s var(--ease) .35s,transform .35s var(--ease) .35s}
    .s-lives .lfl-node.on .lfl-chip{opacity:1;transform:none}
    /* the person at the centre */
    .s-lives .lfl-core{position:absolute;left:700px;top:430px;width:520px;height:330px;pointer-events:none}
    .s-lives .lfl-halo{position:absolute;left:60px;top:-60px;opacity:0;transition:opacity 1s var(--ease)}
    .s-lives .lfl-spin{position:absolute;left:160px;top:40px;opacity:0;transition:opacity 1s var(--ease)}
    .s-lives .lfl-av{position:absolute;left:196px;top:76px;opacity:.28;transition:opacity .8s var(--ease),filter .8s var(--ease)}
    .s-lives .lfl-av circle{fill:rgba(255,255,255,.06);stroke:rgba(255,255,255,.55);stroke-width:2.5}
    .s-lives .lfl-av circle.h{fill:rgba(255,255,255,.92);stroke:none}
    .s-lives .lfl-av path{fill:none;stroke:rgba(255,255,255,.92);stroke-width:4.5;stroke-linecap:round}
    .s-lives .lfl-ct span{display:inline-block;padding:8px 26px 10px;border-radius:22px;background:rgba(10,10,12,.84);border:1px solid rgba(255,214,170,.22)}
    .s-lives .lfl-ct{position:absolute;left:0;top:226px;width:520px;margin:0;text-align:center;font:800 40px/1.12 var(--font);letter-spacing:-.01em;color:#fff;opacity:0;transform:translateY(14px);transition:opacity .8s var(--ease) .3s,transform .8s var(--ease) .3s}
    .s-lives.core .lfl-halo,.s-lives.core .lfl-spin{opacity:1}
    .s-lives.core .lfl-av{opacity:1;filter:drop-shadow(0 0 22px rgba(255,170,90,.75))}
    .s-lives.core .lfl-ct{opacity:1;transform:none}
    .s-lives.core.on-spin .lfl-spin{animation:lflSpin 40s linear infinite}
    @keyframes lflSpin{to{transform:rotate(360deg)}}
    .s-lives.lfl-snap *,.s-lives.lfl-snap *::before,.s-lives.lfl-snap *::after,.s-lives.no-trans *,.s-lives.no-trans *::before,.s-lives.no-trans *::after{transition:none!important}
    .s-lives.lfl-snap .lfl-node::before,.s-lives.no-trans .lfl-node::before{animation:none!important}
    body.print .s-lives .lfl-node::before,body.print .s-lives .lfl-spin{animation:none!important}
    body.calm .s-lives *,body.calm .s-lives *::before,body.calm .s-lives *::after{transition:none!important;animation:none!important}`,
  init(ctx) {
    ctx.gen = 0;
    const svg = ctx.q('.lfl-svg'), box = ctx.q('.lfl-nodes'), mk = (t, a, p) => Fx.el(t, a, p || svg);
    const CX = 960, CY = 630, RX = 610, RY = 290, NW = 340, NH = 160, HUB = [960, 570];
    const rad = (d) => d * Math.PI / 180, ang = (k) => -90 + 72 * k, P = (d) => [CX + RX * Math.cos(rad(d)), CY + RY * Math.sin(rad(d))];
    const ico = (p) => `<svg viewBox="0 0 48 48" width="46" height="46" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
    const NODES = [
      { t: 'Sense', s: ['Weather, Lightning, Gas'], chip: ['live', 'Live'], ic: '<circle cx="24" cy="31" r="4.5"/><path d="M15 23a13 13 0 0 1 18 0M9 17a21 21 0 0 1 30 0"/><path d="M24 36v8"/>', col: '#FF8300' },
      { t: 'Predict', s: ['More time to act'], chip: ['vision', 'Vision'], cls: 'vis', ic: '<path d="M3 24c6-10 14-15 21-15s15 5 21 15c-6 10-14 15-21 15S9 34 3 24z"/><circle cx="24" cy="24" r="6"/>', col: '#C58BFF' },
      { t: 'Decide', s: ['Safety Policy'], chip: ['live', 'Live'], ic: '<path d="M24 5l16 6v11c0 10-7 18-16 21C15 40 8 32 8 22V11z"/><path d="M16 24l6 6 11-12"/>', col: '#FF8300' },
      { t: 'Notify', s: ['Observation Manager', 'Recipient rules'], chip: ['code', 'In code'], ic: '<path d="M12 34V22a12 12 0 0 1 24 0v12l4 4H8z"/><path d="M20 42a4 4 0 0 0 8 0"/>', col: '#FF8300' },
      { t: 'Act', s: ['Stop work'], ic: '<path d="M17 5h14l12 12v14L31 43H17L5 31V17z"/><path d="M15 24h18"/>', col: '#FF8300' },
    ];
    /* the ring: dotted base, five lit arcs, a chevron on each arc */
    const base = mk('g', { 'data-step': 0, 'data-delay': 300 });
    mk('ellipse', { cx: CX, cy: CY, rx: RX, ry: RY, fill: 'none', stroke: 'rgba(255,255,255,.16)', 'stroke-width': 3, 'stroke-dasharray': '2 13', 'stroke-linecap': 'round' }, base);
    ctx.arcs = NODES.map((n, k) => {
      const a = P(ang(k)), b = P(ang(k + 1)), mid = ang(k) + 36, th = rad(mid), [mx, my] = P(mid);
      const p = mk('path', { class: 'lfl-arc', d: `M${a[0].toFixed(1)} ${a[1].toFixed(1)} A ${RX} ${RY} 0 0 1 ${b[0].toFixed(1)} ${b[1].toFixed(1)}`, pathLength: 1, fill: 'none', stroke: '#FF8300', 'stroke-width': 5, filter: 'url(#fx-glow-u)' });
      const chev = mk('polygon', { class: 'lfl-chev', points: '14,0 -9,-11 -9,11', transform: `translate(${mx.toFixed(1)} ${my.toFixed(1)}) rotate(${(Math.atan2(RY * Math.cos(th), -RX * Math.sin(th)) * 180 / Math.PI).toFixed(1)})` });
      const f = ctx.flow(p, { color: '#FFD2A3', count: 2, speed: 330, r: 6, tail: 7, tailGap: 13 }); f.stop().show(false);
      return { p, chev, f };
    });
    /* spokes from the person to every station (they show when the person lights up) */
    ctx.spokes = NODES.map((n, k) => {
      const [px, py] = P(ang(k)); let dx = px - HUB[0], dy = py - HUB[1]; const L = Math.hypot(dx, dy); dx /= L; dy /= L;
      const t = Math.min((NW / 2 + 8) / Math.max(Math.abs(dx), 1e-6), (NH / 2 + 8) / Math.max(Math.abs(dy), 1e-6));
      const s = mk('line', { class: 'lfl-spoke', x1: (HUB[0] + dx * 88).toFixed(1), y1: (HUB[1] + dy * 88).toFixed(1), x2: (px - dx * t).toFixed(1), y2: (py - dy * t).toFixed(1) });
      s.style.setProperty('--d', (.3 + k * .12).toFixed(2) + 's'); return s;
    });
    /* the five stations */
    ctx.nodes = NODES.map((n, k) => {
      const [x, y] = P(ang(k));
      const w = Fx.el('div', { class: 'lfl-nw', 'data-step': 0, 'data-delay': 400 + k * 120, style: `left:${(x - NW / 2).toFixed(1)}px;top:${(y - NH / 2).toFixed(1)}px` }, box);
      w.innerHTML = `<div class="lfl-node ${n.cls || ''}" data-k="${k}"><div class="lfl-hd"><span class="lfl-ic">${ico(n.ic)}</span><b>${n.t}</b></div>${n.s.map((s) => `<span class="lfl-s">${s}</span>`).join('')}${n.chip ? `<span class="rb rb-${n.chip[0]} lfl-chip">${n.chip[1]}</span>` : ''}</div>`;
      return { el: w.firstChild, col: n.col };
    });
    /* instant state for step i: nothing animates */
    ctx.setState = (i) => {
      ctx.nodes.forEach((n, k) => n.el.classList.toggle('on', i >= k + 1));
      ctx.arcs.forEach((a, k) => { const on = k < 4 ? i >= k + 2 : i >= 5; a.p.classList.toggle('on', on); a.chev.classList.toggle('on', on); a.f.show(on); if (on) a.f.start(); else a.f.stop(); });
      ctx.root.classList.toggle('core', i >= 5); ctx.root.classList.toggle('on-spin', i >= 5);
    };
  },
  step(ctx, i, dir, instant) {
    const R = ctx.root, gen = ++ctx.gen, fwd = dir > 0 && !instant && !ctx.calm && i > 0;
    const at = (ms, fn) => ctx.after(ms, () => { if (gen === ctx.gen) fn(); });
    R.classList.add('lfl-snap'); ctx.setState(fwd ? i - 1 : i); void R.offsetWidth;
    if (!fwd) { requestAnimationFrame(() => R.classList.remove('lfl-snap')); return; }
    R.classList.remove('lfl-snap');
    const node = (k) => { const n = ctx.nodes[k]; n.el.classList.add('on'); Fx.burstEl(n.el, { n: 20, color: n.col, speed: 320 }); };
    const arc = (k) => { const a = ctx.arcs[k]; a.p.classList.add('on'); a.chev.classList.add('on'); a.f.show(true); at(150, () => a.f.start()); };
    if (i === 1) node(0);
    else if (i <= 4) { arc(i - 2); at(1000, () => node(i - 1)); }
    else {
      arc(3); at(950, () => node(4)); at(1150, () => arc(4));
      at(2350, () => { node(0); });
      at(2550, () => { R.classList.add('core'); R.classList.add('on-spin'); Fx.burstEl(ctx.q('.lfl-av'), { n: 36, color: '#FFB366', speed: 380 }); });
    }
  },
  static(ctx) {
    const R = ctx.root; ctx.gen++; R.classList.add('lfl-snap'); ctx.setState(5);
    ctx.arcs.forEach((a) => a.f.show(true).freeze());
  },
});
