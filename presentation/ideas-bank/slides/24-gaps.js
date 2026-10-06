/* Slide: what prediction would still need. Four honest gaps, one card each, read from the code.
   1 No forecast: a line of past readings that stops at Now.  2 Short history: readings run long, saved answers start late (only danger starts and ends).
   3 Gas: the data is saved, the screen says not yet.  4 Weather alerts carry no zone: a site map full of question marks. Then: no prediction exists today.
   Facts: research C5 section 6 (B0 gas history, B1 no forecast code, B4 verdict history from 20 Sep 2026), C6 section 8 (S2 weather payload has no zone). No outside numbers. */
Deck.add({
  id: 'gaps', section: 'bank', title: 'What prediction would still need', kicker: 'The data bank · Gaps', reality: ['code'],
  steps: 4, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [4000, 5000, 5000, 5000, 5000], minutes: 1,
  notes: [
    'Prediction is not built. We found four gaps in the code.',
    'Step 1: no forecast and no trend code exists.',
    'Step 2: saved answers start 20 September 2026, at the earliest.',
    'Step 3: gas history is saved, but screens say not yet.',
    'Step 4: weather alerts name no zone.',
    'If asked: the backend has no forecast, trend or prediction code. The only regression in it is the standard heat index formula, and the anomaly checks are rule based. A reading that stays inside its limit leaves no saved answer: only the start and the end of a danger period are stored, and that began on 20 Sep 2026 in the code. We have not proven that it runs in production. Older weather observations also sit in the Observation Manager, with repeats, but our own database kept none before that date. Gas readings are stored, and a history route exists since 13 Sep 2026, but no gas screen calls it. The Peak today tile on the live gas dashboard said Not available yet on 4 Oct 2026. The weather alert we send carries no zone, space or place, so a recipient rule that lists zones still matches every weather alert.',
  ].join('\n'),
  html: (() => {
    const labels = [['No forecast', 'Weather, Lightning, Gas'], ['Short history', 'Weather answers'], ['Saved, not shown', 'Gas history'], ['No zone', 'Weather alerts']];
    return `
    <h2 class="h2 gp-h" data-step="0">What prediction would <span class="o glow-text">still need.</span></h2>
    ${labels.map(([t, u], k) => `<div class="gp-card glass sweepable" data-g="${k + 1}" style="left:${96 + k * 440}px">
      <span class="gp-ghost">${k + 1}</span>
      <svg class="gp-pic" viewBox="0 0 352 330" width="352" height="330"></svg>
      <b class="gp-t">${t}</b><span class="gp-s">${u}</span>
    </div>`).join('')}
    <p class="gp-close" data-step="4" data-delay="2300">No prediction exists <span class="o glow-text">today.</span></p>`;
  })(),
  css: `
    .s-gaps .gp-h{position:absolute;left:96px;top:104px;width:1700px;font-size:62px}
    .s-gaps .gp-card{position:absolute;top:262px;width:408px;height:512px;padding:0;opacity:.46;transition:opacity .7s var(--ease),border-color .7s,box-shadow .7s}
    .s-gaps .gp-card.on{opacity:1;border-color:rgba(255,131,0,.6);box-shadow:0 0 0 1px rgba(255,131,0,.25),0 0 70px rgba(255,131,0,.26),0 30px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.2)}
    .s-gaps .gp-ghost{position:absolute;left:0;top:70px;width:100%;text-align:center;font:900 230px/1 var(--mono);color:transparent;-webkit-text-stroke:2px rgba(255,255,255,.17);transition:opacity .5s var(--ease)}
    .s-gaps .gp-card.on .gp-ghost{opacity:0}
    .s-gaps .gp-pic{position:absolute;left:28px;top:26px;overflow:visible;opacity:0;transition:opacity .5s var(--ease)}
    .s-gaps .gp-card.on .gp-pic{opacity:1}
    .s-gaps .gp-t{position:absolute;left:28px;right:20px;top:384px;font:800 38px/1.12 var(--font);letter-spacing:-.015em;color:#fff}
    .s-gaps .gp-s{position:absolute;left:28px;right:20px;top:434px;font:500 27px/1.25 var(--font);color:var(--mut)}
    .s-gaps .gp-close{position:absolute;left:96px;top:832px;width:1728px;margin:0;text-align:center;font:800 62px/1.1 var(--font);letter-spacing:-.03em;color:#fff}
    /* picture text */
    .s-gaps .pt{font:600 22px/1 var(--font);fill:#D9D9D4}
    .s-gaps .pm{font:500 22px/1 var(--font);fill:#A9A9A4}
    .s-gaps .pv{font:800 31px/1 var(--font);fill:#FFC24B}
    .s-gaps .qm{font:900 96px/1 var(--font);fill:#FFC24B;filter:drop-shadow(0 0 14px rgba(255,194,75,.55))}
    .s-gaps .qz{font:900 52px/1 var(--font);fill:#FFC24B;filter:drop-shadow(0 0 10px rgba(255,194,75,.5))}
    .s-gaps .ztag{font:800 25px/1 var(--font);fill:#FFC24B}
    /* base state = final state. .play only adds the entrance. */
    .s-gaps .dr{stroke-dasharray:1}
    .s-gaps .play .dr{animation:gapsDraw var(--d,1s) var(--ease) var(--t,0s) both}
    .s-gaps .play .fi{animation:gapsFade .7s ease var(--t,0s) both}
    .s-gaps .play .pp{animation:gapsPop .65s cubic-bezier(.2,1.3,.3,1) var(--t,0s) both;transform-box:fill-box;transform-origin:center}
    .s-gaps .play .gx{animation:gapsGrow var(--d,.9s) var(--ease) var(--t,0s) both;transform-box:fill-box;transform-origin:0 50%}
    .s-gaps .play .gc{animation:gapsGrow var(--d,.6s) var(--ease) var(--t,0s) both;transform-box:fill-box;transform-origin:50% 50%}
    @keyframes gapsDraw{from{stroke-dashoffset:1;opacity:0}6%{opacity:1}to{stroke-dashoffset:0;opacity:1}}
    @keyframes gapsFade{from{opacity:0}to{opacity:1}}
    @keyframes gapsPop{0%{opacity:0;transform:scale(.3)}100%{opacity:1;transform:scale(1)}}
    @keyframes gapsGrow{from{transform:scaleX(0);opacity:0}30%{opacity:1}to{transform:scaleX(1);opacity:1}}
    /* loops, only while the slide is on screen */
    .s-gaps .gh{opacity:0}
    .s-gaps.active .gp-card.on .gh{animation:gapsGhost 4s ease-in-out 2.6s infinite backwards}
    @keyframes gapsGhost{0%{opacity:0;stroke-dashoffset:0}18%{opacity:.85}62%{opacity:.85}100%{opacity:0;stroke-dashoffset:-48}}
    .s-gaps.active .gp-card.on .qm{animation:gapsPulse 2.8s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
    @keyframes gapsPulse{50%{transform:scale(1.07)}}
    .s-gaps .rg{opacity:0;transform-box:fill-box;transform-origin:center}
    .s-gaps.active .gp-card.on .rg{animation:gapsRing 3s ease-out infinite;animation-delay:calc(var(--k)*1s + 1.4s);animation-fill-mode:backwards}
    @keyframes gapsRing{0%{transform:scale(.5);opacity:.9}100%{transform:scale(7);opacity:0}}
    .s-gaps.no-trans .gp-card,.s-gaps.no-trans .gp-pic,.s-gaps.no-trans .gp-ghost,
    body.calm .s-gaps .gp-card,body.calm .s-gaps .gp-pic,body.calm .s-gaps .gp-ghost{transition:none!important}
    body.calm .s-gaps .dr,body.calm .s-gaps .fi,body.calm .s-gaps .pp,body.calm .s-gaps .gx,body.calm .s-gaps .gc,body.calm .s-gaps .gh,body.calm .s-gaps .qm,body.calm .s-gaps .rg{animation:none!important}`,
  init(ctx) {
    const mk = Fx.el, pics = ctx.qa('.gp-pic');
    ctx.cards = ctx.qa('.gp-card'); ctx.tm = [];
    ctx.later = (ms, fn) => { const id = ctx.after(ms, fn); ctx.tm.push(id); return id; };
    const stop = (c) => 'rgba(255,255,255,' + c + ')';
    /* ---------- 1. no forecast: past readings draw in, then the line stops at Now and the future stays empty */
    {
      const s = pics[0], NOW = 206, BASE = 262, defs = mk('defs', {}, s);
      const lg = mk('linearGradient', { id: 'gaps-area', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
      mk('stop', { offset: 0, 'stop-color': '#FF8300', 'stop-opacity': .34 }, lg); mk('stop', { offset: 1, 'stop-color': '#FF8300', 'stop-opacity': 0 }, lg);
      const f = (x) => 196 - x * .28 - 26 * Math.sin(x / 27 + .4) - 11 * Math.sin(x / 10.5 + 1.3);
      let d = ''; for (let x = 0; x <= NOW; x += 3) d += (x ? ' L' : 'M') + x + ' ' + f(x).toFixed(1);
      const yNow = f(NOW);
      mk('rect', { class: 'fi', style: '--t:.1s', x: 224, y: 30, width: 120, height: 232, rx: 16, fill: stop(.025), stroke: stop(.22), 'stroke-width': 2, 'stroke-dasharray': '7 8' }, s);
      mk('line', { x1: 0, y1: BASE, x2: 352, y2: BASE, stroke: stop(.22), 'stroke-width': 2 }, s);
      mk('path', { class: 'fi', style: '--t:1.1s', d: d + ` L${NOW} ${BASE} L0 ${BASE} Z`, fill: 'url(#gaps-area)' }, s);
      mk('path', { class: 'dr', style: '--t:.15s;--d:1.05s', pathLength: 1, d, fill: 'none', stroke: '#FF8300', 'stroke-width': 5, 'stroke-linejoin': 'round', filter: 'url(#fx-glow-u)' }, s);
      mk('line', { class: 'fi', style: '--t:1.1s', x1: NOW, y1: 30, x2: NOW, y2: BASE, stroke: stop(.42), 'stroke-width': 2, 'stroke-dasharray': '6 7' }, s);
      const dot = mk('g', { class: 'pp', style: '--t:1.05s' }, s);
      mk('circle', { cx: NOW, cy: yNow, r: 9, fill: '#FFE2C2', filter: 'url(#fx-glow)' }, dot);
      mk('text', { class: 'pt fi', style: '--t:1.1s', x: NOW, y: 298, 'text-anchor': 'middle', text: 'Now' }, s);
      /* a forecast that tries to start and finds nothing */
      mk('path', { class: 'gh', d: `M${NOW + 14} ${(yNow - 8).toFixed(1)} C 246 ${(yNow - 36).toFixed(1)}, 288 ${(yNow - 52).toFixed(1)}, 334 ${(yNow - 30).toFixed(1)}`, fill: 'none', stroke: stop(.7), 'stroke-width': 4.5, 'stroke-linecap': 'round', 'stroke-dasharray': '2 11' }, s);
      const q = mk('g', { class: 'pp', style: '--t:1.7s' }, s);
      ctx.qMark = mk('text', { class: 'qm', x: 284, y: 196, 'text-anchor': 'middle', text: '?' }, q);
    }
    /* ---------- 2. short history: the readings bar is long, the saved answers bar starts late and holds only danger periods */
    {
      const s = pics[1], defs = mk('defs', {}, s);
      const lg = mk('linearGradient', { id: 'gaps-bar', x1: 0, y1: 0, x2: 1, y2: 0 }, defs);
      mk('stop', { offset: 0, 'stop-color': '#E9590C' }, lg); mk('stop', { offset: 1, 'stop-color': '#FFB366' }, lg);
      mk('text', { class: 'pt fi', style: '--t:.1s', x: 0, y: 66, text: 'Readings' }, s);
      const A = mk('g', { class: 'gx', style: '--t:.25s;--d:1s' }, s);
      mk('rect', { x: 0, y: 82, width: 352, height: 38, rx: 19, fill: 'url(#gaps-bar)', filter: 'url(#fx-glow-soft)' }, A);
      let tk = ''; for (let x = 12; x < 346; x += 9) tk += `M${x} 91V111`;
      mk('path', { d: tk, stroke: 'rgba(255,255,255,.42)', 'stroke-width': 2, 'stroke-linecap': 'round', fill: 'none' }, A);
      mk('line', { class: 'fi', style: '--t:1.05s', x1: 300, y1: 124, x2: 300, y2: 206, stroke: stop(.34), 'stroke-width': 2, 'stroke-dasharray': '3 7', 'stroke-linecap': 'round' }, s);
      mk('text', { class: 'pt fi', style: '--t:.9s', x: 0, y: 190, text: 'Answers' }, s);
      mk('rect', { class: 'fi', style: '--t:1s', x: 0, y: 206, width: 352, height: 38, rx: 19, fill: stop(.03), stroke: stop(.3), 'stroke-width': 2, 'stroke-dasharray': '7 8' }, s);
      const p1 = mk('g', { class: 'pp', style: '--t:1.2s' }, s), p2 = mk('g', { class: 'pp', style: '--t:1.42s' }, s);
      mk('rect', { x: 290, y: 206, width: 24, height: 38, rx: 12, fill: 'url(#gaps-bar)', filter: 'url(#fx-glow-soft)' }, p1);
      mk('rect', { x: 322, y: 206, width: 30, height: 38, rx: 15, fill: 'url(#gaps-bar)', filter: 'url(#fx-glow-soft)' }, p2);
      mk('line', { class: 'fi', style: '--t:1.5s', x1: 302, y1: 250, x2: 302, y2: 268, stroke: stop(.34), 'stroke-width': 2, 'stroke-linecap': 'round' }, s);
      ctx.pill = p1;
      mk('text', { class: 'pt fi', style: '--t:1.55s', x: 352, y: 296, 'text-anchor': 'end', text: '20 Sep 2026' }, s);
    }
    /* ---------- 3. gas: stored in a database (green check), but the screen tile says not available yet */
    {
      const s = pics[2], G = '#2BD576';
      mk('path', { class: 'fi', style: '--t:.1s', d: 'M34 44 V118 A62 18 0 0 0 158 118 V44 Z', fill: 'rgba(43,213,118,.08)' }, s);
      const o = { fill: 'none', stroke: G, 'stroke-width': 3.6, 'stroke-linejoin': 'round' };
      mk('path', Object.assign({ class: 'dr', style: '--t:.1s;--d:.7s', pathLength: 1, d: 'M34 44 V118 A62 18 0 0 0 158 118 V44' }, o), s);
      mk('path', Object.assign({ class: 'dr', style: '--t:.3s;--d:.6s', pathLength: 1, d: 'M34 81 A62 18 0 0 0 158 81' }, o, { 'stroke-opacity': .55, 'stroke-width': 2.6 }), s);
      mk('ellipse', { class: 'fi', style: '--t:.15s', cx: 96, cy: 44, rx: 62, ry: 18, fill: 'rgba(43,213,118,.18)', stroke: G, 'stroke-width': 3.6 }, s);
      const ck = mk('g', { class: 'pp', style: '--t:.75s' }, s);
      mk('circle', { cx: 190, cy: 50, r: 20, fill: G, filter: 'url(#fx-glow-soft)' }, ck);
      mk('path', { d: 'M181 50 l6 6 l12 -13', fill: 'none', stroke: '#0B0B0C', 'stroke-width': 4.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ck);
      ctx.gasPath = mk('path', { d: 'M96 164 L96 210', fill: 'none', stroke: 'rgba(43,213,118,.4)', 'stroke-width': 2.4, 'stroke-dasharray': '3 8', 'stroke-linecap': 'round' }, s);
      mk('rect', { class: 'gc', style: '--t:1.15s;--d:.5s', x: 48, y: 216, width: 96, height: 9, rx: 4.5, fill: '#FFC24B', filter: 'url(#fx-glow)' }, s);
      const tile = mk('g', { class: 'fi', style: '--t:1.3s' }, s);
      mk('rect', { x: 0, y: 244, width: 352, height: 82, rx: 16, fill: stop(.05), stroke: stop(.22), 'stroke-width': 2 }, tile);
      mk('text', { class: 'pm', x: 22, y: 276, text: 'Peak today' }, tile);
      ctx.pv = mk('text', { class: 'pv', x: 22, y: 312, text: 'Not available yet' }, tile);
      ctx.gasF = ctx.flow(ctx.gasPath, { color: G, count: 2, speed: 70, r: 5, tail: 6, tailGap: 11 }); ctx.gasF.stop().show(false);
    }
    /* ---------- 4. no zone: a site map with three zones, a station in the yard, an alert that names no zone */
    {
      const s = pics[3];
      mk('rect', { class: 'fi', style: '--t:.05s', x: 0, y: 4, width: 352, height: 316, rx: 22, fill: stop(.022), stroke: stop(.12), 'stroke-width': 1.6 }, s);
      const Z = [[18, 24, 150, 96], [184, 24, 150, 96], [60, 238, 232, 66]];
      Z.forEach(([x, y, w, h], k) => mk('rect', { class: 'dr', pathLength: 1, style: `--t:${.1 + k * .12}s;--d:.7s`, x, y, width: w, height: h, rx: 16, fill: stop(.03), stroke: stop(.36), 'stroke-width': 2.4, 'stroke-linejoin': 'round' }, s));
      [0, 1, 2].forEach((k) => mk('circle', { class: 'rg', style: '--k:' + k, cx: 176, cy: 158, r: 9, fill: 'none', stroke: '#FF8300', 'stroke-width': 2.6 }, s));
      const st = mk('g', { class: 'pp', style: '--t:.55s' }, s);
      mk('circle', { cx: 176, cy: 158, r: 10, fill: '#FF8300', filter: 'url(#fx-glow)' }, st);
      mk('circle', { cx: 176, cy: 158, r: 4.5, fill: '#FFE2C2' }, st);
      const tag = mk('g', { class: 'pp', style: '--t:1.05s' }, s);
      mk('rect', { x: 66, y: 184, width: 220, height: 40, rx: 20, fill: 'rgba(255,194,75,.12)', stroke: '#FFC24B', 'stroke-width': 2.4 }, tag);
      mk('text', { class: 'ztag', x: 176, y: 211, 'text-anchor': 'middle', text: 'Zone: none' }, tag);
      ctx.tag = tag;
      [[93, 90], [259, 90], [176, 285]].forEach(([x, y], k) => { const g = mk('g', { class: 'pp', style: `--t:${1.35 + k * .16}s` }, s); mk('text', { class: 'qz', x, y, 'text-anchor': 'middle', text: '?' }, g); });
    }
  },
  step(ctx, i, dir, instant) {
    const fwd = dir > 0 && !instant && !ctx.calm;
    ctx.tm.forEach(clearTimeout); ctx.tm.length = 0;
    if (ctx.pv._typ) ctx.pv._typ.stop = true;
    ctx.cards.forEach((c, k) => {
      const n = k + 1, on = i >= n;
      c.classList.remove('play'); c.classList.toggle('on', on);
      if (fwd && i === n) { void c.offsetWidth; c.classList.add('play'); }
    });
    const gas = i >= 3;
    ctx.pv.textContent = 'Not available yet';
    ctx.gasF.show(gas);
    if (gas) {
      if (fwd && i === 3) { ctx.gasF.stop(); ctx.later(1000, () => ctx.gasF.start()); ctx.pv.textContent = ''; ctx.later(1500, () => Fx.type(ctx.pv, 'Not available yet', 30)); }
      else ctx.gasF.start();
    } else ctx.gasF.stop();
    if (fwd && i >= 1 && i <= 4) {
      const c = ctx.cards[i - 1], hit = [() => ctx.qMark, () => ctx.pill, () => ctx.pv, () => ctx.tag][i - 1], at = [1900, 1600, 2000, 1400][i - 1], col = ['#FFC24B', '#FF8300', '#FFC24B', '#FFC24B'][i - 1];
      ctx.later(250, () => Fx.sweep(c));
      ctx.later(at, () => { if (ctx.step >= i) Fx.burstEl(hit(), { n: 22, color: col, speed: 300 }); });
    }
  },
  static(ctx) {
    ctx.tm.forEach(clearTimeout); if (ctx.pv._typ) ctx.pv._typ.stop = true;
    ctx.cards.forEach((c) => { c.classList.remove('play'); c.classList.add('on'); });
    ctx.pv.textContent = 'Not available yet'; ctx.gasF.show(true).freeze();
  },
});
