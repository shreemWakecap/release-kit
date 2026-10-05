/* Slide: one system, four data streams. Vision: nobody has built the join.
   Step 0 four streams run side by side, each in its own service. 1 what each stream adds. 2 the rivers bend into one JOIN.
   3 three questions only a join can answer; each one lights the two streams it needs. 4 closing line and "a person approves".
   Facts: research C5 B9 and section 8.2 (no worker, permit or machine in our bank; the keys exist elsewhere), C6 sections 5, 6 and 8 (permit service, equipments service, seams S5 S7 S8).
   Nothing here is a number and nothing is dated. */
Deck.add({
  id: 'streams', section: 'future', title: 'One system, four data streams', kicker: 'What it can do · Four streams', reality: ['vision'],
  steps: 4, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [4000, 5000, 5600, 7200, 5000], minutes: 1,
  notes: [
    'Four streams of data matter on a site. Each sits in its own service.',
    'Step 1: each stream adds its own piece.',
    'Step 2: a join links them.',
    'Step 3: now we can ask questions no single stream can answer.',
    'Step 4: nobody has built this, and a person approves.',
    'If asked: Environment is Weather, Lightning and Gas in Connected Environment. Worker positions and zones sit in the location and app services, and heat bracelets in worker gear. The Digital Work Permit service already sends six permit types to the Observation Manager; its production state is not proven. Machines sit in the equipments service with GPS and alert rules, from platform documents of July 2026. On a permit, equipment is only free text today. None of these streams is joined to our weather, lightning or gas data yet. The keys to join them exist: project, time, zone and device.',
  ].join('\n'),
  html: (() => {
    const ICON = {
      env: '<path d="M13 36h22a8 8 0 0 0 1-16 11 11 0 0 0-21-2 9 9 0 0 0-2 18z"/>',
      work: '<circle cx="24" cy="15" r="8"/><path d="M8 43c1-10 8-15 16-15s15 5 16 15"/>',
      permit: '<path d="M12 5h19l7 7v31H12z"/><path d="M31 5v8h7"/><path d="M18 29l5 5 9-11"/>',
      equip: '<path d="M14 44V6M4 10h38M14 6l-8 4M14 6l22 4M34 10v16M34 26a3 3 0 1 1-3 3"/><rect x="27" y="35" width="14" height="8" rx="1.5"/>',
    };
    const ico = (k, s) => `<svg viewBox="0 0 48 48" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`;
    const L = [
      { k: 'env', n: 'Environment', s: 'Weather, Lightning, Gas', c: '#FF8300' },
      { k: 'work', n: 'Workforce', s: 'Where people are', c: '#4FB3FF' },
      { k: 'permit', n: 'Permits', s: 'Work, place, time', c: '#2BD576' },
      { k: 'equip', n: 'Equipment', s: 'Machines and GPS', c: '#F1E4D4' },
    ];
    const Q = [{ t: 'Who is in the heat?', a: 0, b: 1 }, { t: 'Should a permit hold?', a: 2, b: 0 }, { t: 'Should the crane stop?', a: 3, b: 0 }];
    const LY = [364, 516, 668, 820], QY = [404, 592, 780];
    return `
    <h2 class="h2 st-h" data-step="0">One system, <span class="o glow-text">four data streams.</span></h2>
    <p class="lead st-lead">Each one sits in its own service.</p>
    <svg class="st-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <div class="st-pan-h">${L.map((l, i) => `<div class="st-lane glass" data-k="${i}" style="top:${LY[i] - 52}px;--c:${l.c};--i:${i}"><span class="st-ic">${ico(l.k, 34)}</span><span class="st-tx"><b class="st-name">${l.n}</b><span class="st-sub">${l.s}</span></span></div>`).join('')}</div>
    ${Q.map((q, k) => `<div class="st-q glass sweepable" data-step="3" data-delay="${k * 1200}" data-k="${k}" style="top:${QY[k] - 75}px">
      <div class="st-qi"><span class="st-bub" style="--c:${L[q.a].c}">${ico(L[q.a].k, 26)}</span><i class="st-plus"></i><span class="st-bub" style="--c:${L[q.b].c}">${ico(L[q.b].k, 26)}</span></div>
      <b class="st-qt">${q.t}</b></div>`).join('')}
    <div class="st-close" data-step="4" data-delay="300"><b>Answers no single stream can give.</b><span class="chip st-chip">A person approves</span></div>`;
  })(),
  css: `
    .s-streams .st-h{position:absolute;left:96px;top:104px;width:1700px;font-size:62px}
    .s-streams .st-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px;transition:opacity .6s var(--ease)}
    .s-streams.s2 .st-lead{opacity:0}
    .s-streams .st-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-streams .st-pan-h{position:absolute;left:0;top:0;width:1920px;height:1080px;pointer-events:none;transform:translateX(506px);transition:transform 1.4s var(--ease)}
    .s-streams .pan{transform:translateX(506px);transition:transform 1.4s var(--ease)}
    .s-streams.s2 .st-pan-h,.s-streams.s2 .pan{transform:none}
    .s-streams .st-lane{position:absolute;left:96px;width:424px;height:104px;display:flex;align-items:center;gap:18px;padding:0 24px;border-radius:26px;
      border-color:color-mix(in srgb,var(--c) 55%,transparent);transition:opacity .6s var(--ease),border-color .6s,box-shadow .6s}
    .s-streams .st-ic{flex:none;width:58px;height:58px;border-radius:18px;display:grid;place-items:center;color:var(--c);border:1.5px solid color-mix(in srgb,var(--c) 60%,transparent);background:color-mix(in srgb,var(--c) 12%,transparent)}
    .s-streams .st-tx{display:block;min-width:0}
    .s-streams .st-name{display:block;font:800 34px/1.1 var(--font);letter-spacing:-.01em;color:#fff;transform:translateY(15px);transition:transform .6s var(--ease)}
    .s-streams .st-sub{display:block;margin-top:4px;font:500 23px/1.2 var(--font);color:#B9B9B4;opacity:0;transform:translateY(8px);white-space:nowrap;
      transition:opacity .6s var(--ease) calc(var(--i) * 200ms + 150ms),transform .6s var(--ease) calc(var(--i) * 200ms + 150ms)}
    .s-streams.s1 .st-name{transform:none}
    .s-streams.s1 .st-sub{opacity:1;transform:none}
    .s-streams .st-lane.hl{border-color:var(--c);box-shadow:0 0 0 1px color-mix(in srgb,var(--c) 45%,transparent),0 0 56px color-mix(in srgb,var(--c) 38%,transparent),0 30px 80px rgba(0,0,0,.45)}
    .s-streams.hl .st-lane:not(.hl){opacity:.4}
    /* rivers */
    .s-streams .ln{transition:opacity .5s var(--ease)}
    .s-streams.hl .ln:not(.hl){opacity:.28}
    .s-streams .ch{fill:none;stroke-linecap:round;opacity:.1}
    .s-streams .jch{opacity:0}
    .s-streams.s2 .jch{opacity:.1;transition:opacity .8s var(--ease) .6s}
    .s-streams .rv,.s-streams .jn{fill:none;stroke-linecap:round;transition:stroke-width .5s var(--ease)}
    .s-streams .ln.hl .rv,.s-streams .ln.hl .jn{stroke-width:6}
    .s-streams .jn{stroke-dasharray:1;stroke-dashoffset:1;opacity:0}
    .s-streams.s2 .jn{opacity:1;stroke-dashoffset:0;transition:stroke-dashoffset 1.2s var(--ease) calc(var(--i) * 140ms + 600ms),stroke-width .5s var(--ease)}
    .s-streams .wall{transition:opacity .5s var(--ease)}
    .s-streams.s2 .wall{opacity:0;transition:opacity .5s var(--ease) .5s}
    /* the join */
    .s-streams .hub{opacity:0;transform:scale(.6);transform-box:fill-box;transform-origin:center;transition:opacity .8s var(--ease) .9s,transform 1s cubic-bezier(.2,1.2,.3,1) .9s}
    .s-streams.s2 .hub{opacity:1;transform:none}
    .s-streams .hub-t{font:900 30px/1 var(--font);letter-spacing:.3em;fill:#fff;filter:drop-shadow(0 0 14px rgba(197,139,255,.8))}
    .s-streams.active .hub-r2{animation:streamsRot 28s linear infinite;transform-box:fill-box;transform-origin:center}
    @keyframes streamsRot{to{transform:rotate(360deg)}}
    .s-streams .out{opacity:0;transition:opacity .6s var(--ease)}
    .s-streams .out.on{opacity:1}
    /* questions */
    .s-streams .st-q{position:absolute;left:1384px;width:440px;height:150px;padding:20px 28px 0;border-radius:26px;border-color:rgba(197,139,255,.5)}
    .s-streams .st-qi{display:flex;align-items:center;gap:14px}
    .s-streams .st-bub{width:50px;height:50px;border-radius:50%;display:grid;place-items:center;color:var(--c);border:2px solid var(--c);background:color-mix(in srgb,var(--c) 16%,transparent)}
    .s-streams .st-plus{position:relative;display:block;width:20px;height:20px}
    .s-streams .st-plus::before,.s-streams .st-plus::after{content:"";position:absolute;left:50%;top:50%;background:#B9B9B4;border-radius:2px}
    .s-streams .st-plus::before{width:18px;height:3px;margin:-1.5px 0 0 -9px}
    .s-streams .st-plus::after{width:3px;height:18px;margin:-9px 0 0 -1.5px}
    .s-streams .st-qt{position:absolute;left:28px;right:16px;top:88px;font:800 31px/1.15 var(--font);letter-spacing:-.01em;color:#fff;white-space:nowrap}
    .s-streams .st-close{position:absolute;left:96px;top:912px;width:1728px;display:flex;align-items:center;justify-content:center;gap:30px}
    .s-streams .st-close b{font:800 46px/1.1 var(--font);letter-spacing:-.025em;color:#fff}
    .s-streams .st-chip{color:#C58BFF;border:2px dashed #C58BFF;background:rgba(197,139,255,.1);font:800 26px/1 var(--font);padding:13px 24px;box-shadow:0 0 24px rgba(197,139,255,.25)}
    .s-streams.no-trans .st-lead,.s-streams.no-trans .st-pan-h,.s-streams.no-trans .pan,.s-streams.no-trans .st-name,.s-streams.no-trans .st-sub,.s-streams.no-trans .st-lane,.s-streams.no-trans .ln,.s-streams.no-trans .jch,.s-streams.no-trans .jn,.s-streams.no-trans .rv,.s-streams.no-trans .wall,.s-streams.no-trans .hub,.s-streams.no-trans .out,
    body.calm .s-streams .st-lead,body.calm .s-streams .st-pan-h,body.calm .s-streams .pan,body.calm .s-streams .st-name,body.calm .s-streams .st-sub,body.calm .s-streams .st-lane,body.calm .s-streams .ln,body.calm .s-streams .jch,body.calm .s-streams .jn,body.calm .s-streams .rv,body.calm .s-streams .wall,body.calm .s-streams .hub,body.calm .s-streams .out{transition:none!important}
    body.calm .s-streams .hub-r2{animation:none!important}`,
  init(ctx) {
    const svg = ctx.q('.st-svg'), mk = Fx.el;
    const COL = ['#FF8300', '#4FB3FF', '#2BD576', '#F1E4D4'];
    const LY = [364, 516, 668, 820], X0 = 520, WALL = 800, JX = 1040, HUB = { x: 1122, y: 592, r: 82 }, QX = 1384, QY = [404, 592, 780];
    ctx.tm = [];
    ctx.later = (ms, fn) => { const id = ctx.after(ms, fn); ctx.tm.push(id); return id; };
    const defs = mk('defs', {}, svg), rg = mk('radialGradient', { id: 'streams-hubg', cx: .5, cy: .5, r: .5 }, defs);
    mk('stop', { offset: 0, 'stop-color': '#E9D2FF', 'stop-opacity': .9 }, rg); mk('stop', { offset: .35, 'stop-color': '#C58BFF', 'stop-opacity': .5 }, rg); mk('stop', { offset: 1, 'stop-color': '#C58BFF', 'stop-opacity': 0 }, rg);
    ctx.laneEls = ctx.qa('.st-lane');
    const pan = mk('g', { class: 'pan' }, svg);
    /* the four rivers: each runs to a wall (apart), then bends into the hub (joined) */
    ctx.lanes = LY.map((y, i) => {
      const c = COL[i], ty = HUB.y + (i - 1.5) * 28, g = mk('g', { class: 'ln', 'data-k': i }, pan);
      const bend = `M${WALL} ${y} C ${WALL + 90} ${y}, ${JX - 90} ${ty}, ${JX} ${ty}`;
      mk('path', { class: 'ch', d: `M${X0} ${y} L${WALL} ${y}`, stroke: c, 'stroke-width': 22 }, g);
      mk('path', { class: 'ch jch', d: bend, stroke: c, 'stroke-width': 22 }, g);
      const rv = mk('path', { class: 'rv', d: `M${X0} ${y} L${WALL} ${y}`, stroke: c, 'stroke-width': 3.6, filter: 'url(#fx-glow-u)' }, g);
      mk('line', { class: 'wall', x1: WALL + 6, y1: y - 30, x2: WALL + 6, y2: y + 30, stroke: c, 'stroke-width': 6, 'stroke-linecap': 'round', filter: 'url(#fx-glow-u)' }, g);
      mk('path', { class: 'jn', pathLength: 1, style: `--i:${i}`, d: bend, stroke: c, 'stroke-width': 3.6, filter: 'url(#fx-glow-u)' }, g);
      const road = mk('path', { d: `M${X0} ${y} L${WALL} ${y} C ${WALL + 90} ${y}, ${JX - 90} ${ty}, ${JX} ${ty}`, fill: 'none', stroke: 'none' }, g);
      const fs = ctx.flow(rv, { color: c, count: 3, speed: 150, r: 6, tail: 7, tailGap: 13 }), ff = ctx.flow(road, { color: c, count: 5, speed: 190, r: 6, tail: 7, tailGap: 13 });
      fs.stop().show(true); ff.stop().show(false);
      return { g, fs, ff };
    });
    /* the join */
    const hub = mk('g', { class: 'hub' }, pan);
    mk('circle', { cx: HUB.x, cy: HUB.y, r: 200, fill: 'url(#streams-hubg)', opacity: .55 }, hub);
    mk('circle', { class: 'hub-r2', cx: HUB.x, cy: HUB.y, r: 106, fill: 'none', stroke: 'rgba(197,139,255,.65)', 'stroke-width': 2.4, 'stroke-dasharray': '4 12', 'stroke-linecap': 'round' }, hub);
    ctx.hubRing = mk('circle', { cx: HUB.x, cy: HUB.y, r: HUB.r, fill: 'rgba(18,12,28,.94)', stroke: '#C58BFF', 'stroke-width': 3.2, filter: 'url(#fx-glow-soft)' }, hub);
    mk('text', { class: 'hub-t', x: HUB.x + 5, y: HUB.y + 10, 'text-anchor': 'middle', text: 'JOIN' }, hub);
    /* from the join to the three questions */
    ctx.outs = QY.map((y, k) => {
      const g = mk('g', { class: 'out' }, pan);
      const p = mk('path', { d: `M${HUB.x + HUB.r} ${HUB.y} C ${HUB.x + HUB.r + 90} ${HUB.y}, ${QX - 100} ${y}, ${QX} ${y}`, fill: 'none', stroke: 'rgba(197,139,255,.7)', 'stroke-width': 2.6, 'stroke-dasharray': '7 8', filter: 'url(#fx-glow-u)' }, g);
      const f = ctx.flow(p, { color: '#E4C9FF', count: 3, speed: 150, r: 5, tail: 6, tailGap: 12 }); f.stop().show(false);
      return { g, f };
    });
    ctx.qEls = ctx.qa('.st-q');
    ctx.pairs = [[0, 1], [2, 0], [3, 0]];
    ctx.setHl = (arr) => { ctx.root.classList.toggle('hl', arr.length > 0); ctx.lanes.forEach((L, j) => { const on = arr.includes(j); L.g.classList.toggle('hl', on); ctx.laneEls[j].classList.toggle('hl', on); }); };
  },
  step(ctx, i, dir, instant) {
    const fwd = dir > 0 && !instant && !ctx.calm, R = ctx.root;
    ctx.tm.forEach(clearTimeout); ctx.tm.length = 0;
    [1, 2, 3, 4].forEach((k) => R.classList.toggle('s' + k, i >= k));
    ctx.setHl([]);
    /* rivers: short packets while apart, long packets into the join once joined */
    const joined = i >= 2;
    ctx.lanes.forEach((L, k) => {
      if (!joined) { L.ff.stop().show(false); L.fs.show(true).start(); return; }
      if (fwd && i === 2) ctx.later(1800 + k * 120, () => { L.fs.stop().show(false); L.ff.show(true).start(); });
      else { L.fs.stop().show(false); L.ff.show(true).start(); }
    });
    if (fwd && i === 2) ctx.later(2000, () => { if (ctx.step >= 2) Fx.burstEl(ctx.hubRing, { n: 44, color: '#C58BFF', speed: 440 }); });
    /* questions: one every 1.2 s; each lights the two streams it needs */
    ctx.outs.forEach((o, k) => {
      if (i < 3) { o.g.classList.remove('on'); o.f.stop().show(false); return; }
      if (fwd && i === 3) { o.g.classList.remove('on'); o.f.stop().show(false); ctx.later(k * 1200 + 500, () => { o.g.classList.add('on'); o.f.show(true).start(); }); }
      else { o.g.classList.add('on'); o.f.show(true).start(); }
    });
    if (fwd && i === 3) {
      ctx.pairs.forEach((pr, k) => {
        ctx.later(k * 1200 + 250, () => { if (ctx.step >= 3) { ctx.setHl(pr); Fx.sweep(ctx.qEls[k]); } });
        ctx.later(k * 1200 + 1250, () => { if (ctx.step >= 3 && k === 2) ctx.setHl([]); });
      });
    }
    if (fwd && i === 4) ctx.later(1100, () => { if (ctx.step >= 4) Fx.burstEl(ctx.q('.st-chip'), { n: 24, color: '#C58BFF', speed: 320 }); });
  },
  static(ctx) {
    ctx.tm.forEach(clearTimeout); ctx.root.classList.add('s1', 's2', 's3', 's4'); ctx.setHl([]);
    ctx.lanes.forEach((L) => { L.fs.stop().show(false); L.ff.show(true).freeze(); });
    ctx.outs.forEach((o) => { o.g.classList.add('on'); o.f.show(true).freeze(); });
  },
});
