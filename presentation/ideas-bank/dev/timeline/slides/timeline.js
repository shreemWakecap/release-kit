/* Slide: six eras in 497 days. One light line runs along a timeline and lights each era in order.
   The first year is squeezed (a break mark in the axis), the last 103 days are drawn to scale.
   Bars = commits per era: backend (cream) and front end (orange). A bracket shows rename to 1.0 = 37 days.
   Facts: research C1 (2.1 eras and commit counts, 2.2 ledger, day gaps under the era table).
   Days: 25 May 2025 = day 0, 23 Jun 2026 = day 394, 4 Oct 2026 (build 1.0.7) = day 497. */
Deck.add({
  id: 'timeline', section: 'convert', title: 'Six eras, 497 days', kicker: 'The conversion · Six eras', reality: ['code', 'live'], short: true,
  steps: 4, ambient: { orb: 1, beam: .6, dust: 1 }, dur: [3200, 4600, 4600, 4600, 6000], minutes: 1,
  notes: [
    'The whole story sits on one line.',
    'It starts with the first backend commit, on 25 May 2025.',
    'For over a year, Weather Station stood on its own.',
    'Then the pace changed: its own app, then the answer first page.',
    'The new name came on 24 Aug. Lightning and Gas landed over the next month.',
    'From the new name to version 1.0 took only 37 days.',
    'If asked: a commit is one saved change to the code. The eras: on its own 25 May 2025 to 22 Jun 2026, own app 23 Jun to 14 Jul, answer first 15 Jul to 23 Aug, new name 24 to 29 Aug, Lightning and Gas 30 Aug to 29 Sep, version 1.0 from 30 Sep. Commits per era, backend then front end: 276 and 0, 3 and 42, 77 and 153, 5 and 16, 72 and 120, 14 and 16. One more front end commit came on 5 Oct, so the front end total is 348. The backend total is 447. The 497 days run from the first backend commit to the 4 Oct 2026 tip, build 1.0.7. The new app took 103 days from its first commit to build 1.0.7. From the rename on 24 Aug to the 1.0.0 tag on 30 Sep is 37 days. The picture squeezes the first year, so only the last 103 days are drawn to scale.',
  ].join('\n'),
  html: `
    <h2 class="h2 tl-h" data-step="0">Six eras. <span class="o glow-text tl-497">497 days.</span></h2>
    <div class="tl-tot glass sweepable" data-step="0" data-delay="300">
      <div class="label tl-cap">Commits</div>
      <div class="tl-row">
        <div class="tl-t be"><b class="tl-n tl-nbe">0</b><span><i></i>Backend</span></div>
        <div class="tl-t fe"><b class="tl-n tl-nfe">0</b><span><i></i>Front end</span></div>
      </div>
    </div>
    <svg class="tl-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>`,
  css: `
    .s-timeline .tl-h{position:absolute;left:96px;top:104px;width:1100px;font-size:62px}
    .s-timeline .tl-497{display:inline-block}
    .s-timeline .tl-497.pulse{animation:tlPulse 1.6s ease-out}
    @keyframes tlPulse{30%{text-shadow:0 0 40px rgba(255,170,80,.95),0 0 120px rgba(255,131,0,.65);transform:scale(1.04)}}
    .s-timeline .tl-tot{position:absolute;left:1228px;top:122px;width:596px;height:196px;padding:22px 32px}
    .s-timeline .tl-row{display:flex;gap:30px;margin-top:8px}
    .s-timeline .tl-t{flex:1}
    .s-timeline .tl-n{display:block;font:900 84px/1 var(--font);letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:#F1E4D4;text-shadow:0 0 30px rgba(241,228,212,.28)}
    .s-timeline .tl-t.fe .tl-n{color:#fff;text-shadow:0 0 34px rgba(255,131,0,.65),0 0 90px rgba(255,131,0,.3)}
    .s-timeline .tl-n.tick{animation:tlTick .45s var(--ease)}
    @keyframes tlTick{0%{transform:scale(1.1)}100%{transform:none}}
    .s-timeline .tl-t span{display:flex;align-items:center;gap:12px;margin-top:8px;font:700 26px/1 var(--font);color:#D9D9D4}
    .s-timeline .tl-t i{display:block;width:16px;height:16px;border-radius:5px;background:#F1E4D4;box-shadow:0 0 14px rgba(241,228,212,.5)}
    .s-timeline .tl-t.fe i{background:#FF8300;box-shadow:0 0 14px rgba(255,131,0,.8)}
    .s-timeline .tl-svg{position:absolute;left:0;top:0;overflow:visible}
    .s-timeline .tl-base{fill:rgba(255,255,255,.13)}
    .s-timeline .tl-dash{fill:rgba(255,255,255,.13);transition:fill .5s}
    .s-timeline .tl-dash.lit{fill:#FF8300}
    .s-timeline .tl-brk{fill:none;stroke:rgba(255,255,255,.6);stroke-width:3;stroke-linecap:round}
    .s-timeline .tl-era .tl-col{opacity:0;transition:opacity .9s var(--ease);pointer-events:all}
    .s-timeline .tl-era.on .tl-col{opacity:1}
    .s-timeline .tl-era.on:hover .tl-col{opacity:2}
    .s-timeline .tl-node{fill:#0B0B0C;stroke:rgba(255,255,255,.4);stroke-width:3;transition:fill .5s,stroke .5s,transform .6s var(--ease);transform-box:fill-box;transform-origin:center}
    .s-timeline .tl-era.on .tl-node,.s-timeline .tl-end.on .tl-node{fill:#FF8300;stroke:#FFD9B3;transform:scale(1.18);filter:url(#fx-glow)}
    .s-timeline .tl-ring{fill:none;stroke:#FF8300;stroke-width:2.5;opacity:0;transform-box:fill-box;transform-origin:center}
    .s-timeline .tl-ring.pop{animation:tlPop 1.3s var(--ease) both}
    @keyframes tlPop{0%{transform:scale(.6);opacity:.95}100%{transform:scale(3.6);opacity:0}}
    .s-timeline .tl-bar{transform:scaleY(0);transform-box:fill-box;transform-origin:50% 100%;transition:transform .85s cubic-bezier(.2,.9,.3,1.12)}
    .s-timeline .tl-era.bars .tl-bar{transform:scaleY(1)}
    .s-timeline .tl-bar.fe{filter:drop-shadow(0 0 9px rgba(255,131,0,.55))}
    .s-timeline .tl-bar.be{filter:drop-shadow(0 0 8px rgba(241,228,212,.3))}
    .s-timeline .tl-bar.zero{opacity:.55}
    .s-timeline .tl-num{font:700 20px/1 var(--font);fill:#F1E4D4;opacity:0;transition:opacity .5s .5s}
    .s-timeline .tl-num.fe{fill:#FFB366}
    .s-timeline .tl-era.bars .tl-num{opacity:1}
    .s-timeline .tl-flag{opacity:0;transform:translateY(10px);transition:opacity .6s var(--ease),transform .7s var(--ease)}
    .s-timeline .tl-era.on .tl-flag,.s-timeline .tl-end.on .tl-flag{opacity:1;transform:none}
    .s-timeline .tl-pole{stroke:rgba(255,255,255,.3);stroke-width:2}
    .s-timeline .tl-name{font:800 28px/1 var(--font);fill:#fff}
    .s-timeline .tl-date{font:500 22px/1 var(--font);fill:#B9B9B4}
    .s-timeline .tl-scan{transition:opacity .8s}
    .s-timeline .tl-scan.off{opacity:0}
    .s-timeline .tl-pt{font:800 22px/1 var(--font);fill:#fff;text-anchor:middle}
    .s-timeline .tl-br{opacity:0;transition:opacity .3s}
    .s-timeline .tl-br.on{opacity:1}
    .s-timeline .tl-brp{fill:none;stroke:#FF8300;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round}
    .s-timeline .tl-brn{font:900 66px/1 var(--font);fill:#fff;text-anchor:middle;filter:drop-shadow(0 0 14px rgba(255,131,0,.6))}
    .s-timeline .tl-brc{font:600 26px/1 var(--font);fill:#FFD2A3;text-anchor:middle}
    .s-timeline.tl-nt *,.s-timeline.tl-nt *::before,.s-timeline.tl-nt *::after{transition:none!important;animation:none!important}
    body.calm .s-timeline *,body.calm .s-timeline *::before,body.calm .s-timeline *::after{animation:none!important;transition-duration:.01s!important;transition-delay:0s!important}`,
  init(ctx) {
    const svg = ctx.q('.tl-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg);
    const AX = 740, K = .86, XS = 104, X1 = 372, X2 = 1620, S = (X2 - X1) / 103;
    /* day 0 = 25 May 2025. The first 394 days are squeezed into XS..X1, the last 103 days are to scale. */
    const dayX = (d) => (d <= 394 ? XS + d / 394 * (X1 - XS) : X1 + (d - 394) * S);
    const xDay = (x) => (x <= X1 ? (x - XS) / (X1 - XS) * 394 : 394 + (x - X1) / S);
    const ERAS = [
      { name: 'On its own', date: '25 May 2025', d0: 0, d1: 394, be: 276, fe: 0, row: 0 },
      { name: 'Own app', date: '23 Jun 2026', d0: 394, d1: 416, be: 3, fe: 42, row: 0 },
      { name: 'Answer first', date: '15 Jul', d0: 416, d1: 456, be: 77, fe: 153, row: 0 },
      { name: 'New name', date: '24 Aug', d0: 456, d1: 462, be: 5, fe: 16, row: 1 },
      { name: 'Lightning and Gas', date: '30 Aug', d0: 462, d1: 493, be: 72, fe: 120, row: 0 },
      { name: 'Version 1.0', date: '30 Sep', d0: 493, d1: 497, be: 14, fe: 16, row: 1 },
    ];
    const CUM_BE = [276, 279, 356, 361, 433, 447], CUM_FE = [0, 42, 195, 211, 331, 347];
    ctx.T = [XS, dayX(416) - 6, dayX(456) - 6, dayX(493) - 6, X2];   /* where the light line rests at the end of each step */
    /* ---- defs */
    const defs = mk('defs');
    const lg = (id, stops, a) => { const g = mk('linearGradient', Object.assign({ id, x1: 0, y1: 0, x2: 0, y2: 1 }, a || {}), defs); stops.forEach(([o, c, op]) => mk('stop', { offset: o, 'stop-color': c, 'stop-opacity': op == null ? 1 : op }, g)); };
    lg('tl-fe', [[0, '#FFC48A'], [1, '#FF8300', .8]]);
    lg('tl-be', [[0, '#FFF4E6'], [1, '#D9C7B2', .55]]);
    lg('tl-col', [[0, '#FF8300', 0], [1, '#FF8300', .1]]);
    lg('tl-core', [[0, 'rgba(255,226,194,0)'], [.22, 'rgba(255,226,194,.95)'], [.78, 'rgba(255,226,194,.95)'], [1, 'rgba(255,226,194,0)']]);
    lg('tl-axis', [[0, '#E9590C'], [1, '#FFB366']], { x1: 0, y1: 0, x2: 1, y2: 0 });
    const rg = mk('radialGradient', { id: 'tl-glow', cx: .5, cy: .5, r: .5 }, defs);
    mk('stop', { offset: 0, 'stop-color': 'rgba(255,190,120,.34)' }, rg); mk('stop', { offset: 1, 'stop-color': 'rgba(255,170,90,0)' }, rg);
    const cf = mk('filter', { id: 'tl-cf', filterUnits: 'userSpaceOnUse', x: -30, y: 380, width: 60, height: 400 }, defs);
    mk('feGaussianBlur', { stdDeviation: 4, result: 'b' }, cf); const fm = mk('feMerge', {}, cf); mk('feMergeNode', { in: 'b' }, fm); mk('feMergeNode', { in: 'SourceGraphic' }, fm);
    /* ---- the axis: a dashed first year, a break mark, then a solid line to scale */
    ctx.dashes = []; for (let i = 0; i < 9; i++) { const x = 108 + i * 26; ctx.dashes.push({ x, el: mk('rect', { class: 'tl-dash', x, y: AX - 3, width: 16, height: 6, rx: 3 }) }); }
    mk('path', { class: 'tl-brk', d: `M344 ${AX + 17} L356 ${AX - 17} M360 ${AX + 17} L372 ${AX - 17}` });
    mk('rect', { class: 'tl-base', x: X1 + 8, y: AX - 3, width: X2 - X1 - 8, height: 6, rx: 3 });
    ctx.fill = mk('rect', { x: X1 + 8, y: AX - 3, width: 0, height: 6, rx: 3, fill: 'url(#tl-axis)', filter: 'url(#fx-glow-soft)' });
    /* ---- the six eras: column, two bars, numbers, node and flag */
    ctx.eras = ERAS.map((E, k) => {
      const xa = k === 0 ? XS : dayX(E.d0), xb = k === 0 ? X1 : dayX(E.d1), w = xb - xa, g = mk('g', { class: 'tl-era', 'data-k': k });
      mk('rect', { class: 'tl-col', x: xa + 2, y: 452, width: w - 4, height: AX - 452, rx: 10, fill: 'url(#tl-col)' }, g);
      const narrow = w < 120, gap = narrow ? 4 : 10, pad = narrow ? 2 : 16, bw = Math.min(40, (w - 2 * pad - gap) / 2);
      [['be', E.be], ['fe', E.fe]].forEach(([kind, v], j) => {
        const x = xa + pad + j * (bw + gap), h = Math.max(3, v * K), y = AX - h, r = Math.min(5, h / 2);
        mk('path', { class: 'tl-bar ' + kind + (v ? '' : ' zero'), d: `M${x} ${AX} V${y + r} Q${x} ${y} ${x + r} ${y} H${x + bw - r} Q${x + bw} ${y} ${x + bw} ${y + r} V${AX} Z`, fill: kind === 'be' ? 'url(#tl-be)' : 'url(#tl-fe)' }, g);
        mk('text', { class: 'tl-num ' + kind, x: x + bw / 2, y: y - 12, 'text-anchor': 'middle', text: String(v) }, g);
      });
      const yN = E.row ? 906 : 806, yD = yN + 32, fl = mk('g', { class: 'tl-flag' }, g);
      mk('line', { class: 'tl-pole', x1: xa, y1: AX + 16, x2: xa, y2: yD + 8 }, fl);
      mk('text', { class: 'tl-name', x: xa + 14, y: yN, text: E.name }, fl); mk('text', { class: 'tl-date', x: xa + 14, y: yD, text: E.date }, fl);
      mk('circle', { class: 'tl-ring', cx: xa, cy: AX, r: 11 }, g);
      const node = mk('circle', { class: 'tl-node', cx: xa, cy: AX, r: 11 }, g);
      return { g, xa, xb, node, ring: g.querySelector('.tl-ring'), on: false, barsOn: false, be: E.be };
    });
    /* ---- the end: build 1.0.7 on day 497 */
    ctx.end = mk('g', { class: 'tl-end' });
    { const fl = mk('g', { class: 'tl-flag' }, ctx.end);
      mk('line', { class: 'tl-pole', x1: X2, y1: AX + 16, x2: X2, y2: 806 + 40 }, fl);
      mk('text', { class: 'tl-name', x: X2 + 14, y: 806, text: 'Build 1.0.7' }, fl); mk('text', { class: 'tl-date', x: X2 + 14, y: 838, text: '4 Oct' }, fl);
      mk('circle', { class: 'tl-ring', cx: X2, cy: AX, r: 11 }, ctx.end); ctx.endNode = mk('circle', { class: 'tl-node', cx: X2, cy: AX, r: 11 }, ctx.end); ctx.endRing = ctx.end.querySelector('.tl-ring'); }
    /* ---- the bracket: rename to 1.0 in 37 days */
    const bx0 = ctx.eras[3].xa, bx1 = ctx.eras[5].xa, bcx = (bx0 + bx1) / 2;
    ctx.br = mk('g', { class: 'tl-br' });
    ctx.brp = mk('path', { class: 'tl-brp', d: `M${bx0} 598 V574 H${bx1} V598` }, ctx.br);
    ctx.brn = mk('text', { class: 'tl-brn', x: bcx, y: 522, 'text-anchor': 'middle', text: '37 days' }, ctx.br);
    mk('text', { class: 'tl-brc', x: bcx, y: 556, 'text-anchor': 'middle', text: 'Rename to 1.0' }, ctx.br);
    /* ---- the light line with its day counter */
    ctx.scanG = mk('g', { class: 'tl-scan' });
    mk('ellipse', { cx: 0, cy: AX, rx: 70, ry: 170, fill: 'url(#tl-glow)' }, ctx.scanG);
    mk('rect', { x: -1.5, y: 420, width: 3, height: 326, fill: 'url(#tl-core)', filter: 'url(#tl-cf)' }, ctx.scanG);
    mk('circle', { cx: 0, cy: AX, r: 8, fill: '#fff', filter: 'url(#fx-glow)' }, ctx.scanG);
    ctx.pill = mk('g', {}, ctx.scanG);
    mk('rect', { x: -68, y: 380, width: 136, height: 38, rx: 19, fill: 'rgba(11,11,12,.9)', stroke: '#FF8300', 'stroke-width': 2 }, ctx.pill);
    ctx.pt = mk('text', { class: 'tl-pt', x: 0, y: 406, text: 'Day 0' }, ctx.pill);
    /* ---- state painters */
    ctx.nBE = ctx.q('.tl-nbe'); ctx.nFE = ctx.q('.tl-nfe'); ctx.tm = []; ctx.sx = XS; ctx.scan = null; ctx.brOn = false; ctx.endOn = false;
    const at = (ms, fn) => ctx.tm.push(ctx.after(ms, fn));
    const fire = (el, cls) => { el.classList.remove(cls); void el.getBoundingClientRect(); el.classList.add(cls); };
    const setNum = (el, v, anim) => {
      const from = +el.dataset.v || 0; if (el.dataset.v !== undefined && from === v) return; el.dataset.v = v;
      if (anim) { Fx.counter(el, v, { from, dur: 800 }); el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); } else Fx.counter(el, v, { dur: 0 });
    };
    ctx.updTot = (anim) => {
      const n = ctx.eras.filter((e) => e.barsOn).length;
      setNum(ctx.nBE, n ? CUM_BE[n - 1] : 0, anim); setNum(ctx.nFE, (n ? CUM_FE[n - 1] : 0) + (ctx.endOn ? 1 : 0), anim);
    };
    ctx.lightOn = (k, anim) => {
      const e = ctx.eras[k]; e.on = true; e.g.classList.add('on');
      if (anim) { fire(e.ring, 'pop'); Fx.burstEl(e.node, { n: 16, color: '#FF8300', speed: 250 }); }
    };
    ctx.lightBars = (k, anim) => { const e = ctx.eras[k]; e.barsOn = true; e.g.classList.add('bars'); ctx.updTot(anim); if (anim && e.be) Fx.burstEl(e.g.querySelector('.tl-bar.be'), { n: 10, color: '#F1E4D4', speed: 200 }); };
    ctx.showBracket = (anim) => {
      ctx.brOn = true; ctx.br.classList.add('on');
      if (anim) { Fx.draw(ctx.brp, 900, 0); Fx.counter(ctx.brn, 37, { dur: 1000, suffix: ' days' }); at(1000, () => Fx.burstEl(ctx.brn, { n: 26, color: '#FF8300', speed: 340 })); }
      else { ctx.brp.style.strokeDasharray = ''; ctx.brp.style.strokeDashoffset = ''; ctx.brp.style.transition = ''; ctx.brn.textContent = '37 days'; }
    };
    ctx.showEnd = (anim) => {
      ctx.endOn = true; ctx.end.classList.add('on'); ctx.updTot(anim);
      if (anim) {
        fire(ctx.endRing, 'pop'); Fx.burstEl(ctx.endNode, { n: 40, color: '#FF8300', speed: 420 }); Fx.burstEl(ctx.endNode, { n: 18, color: '#FFE2C2', speed: 260 });
        const h = ctx.q('.tl-497'); fire(h, 'pulse'); Fx.sweep(ctx.q('.tl-tot'));
        at(1300, () => ctx.scanG.classList.add('off'));
      } else ctx.scanG.classList.add('off');
    };
    /* the light line at x: moves, fills the axis, and wakes up whatever it has reached */
    ctx.paint = (x, anim) => {
      ctx.sx = x; ctx.scanG.setAttribute('transform', `translate(${x.toFixed(1)} 0)`);
      ctx.pill.setAttribute('transform', `translate(${(Math.max(x, 164) - x).toFixed(1)} 0)`); ctx.pt.textContent = 'Day ' + Math.round(xDay(x));
      ctx.fill.setAttribute('width', Math.max(0, Math.min(x, X2) - X1 - 8).toFixed(1));
      ctx.dashes.forEach((d) => d.el.classList.toggle('lit', x >= d.x + 8));
      ctx.eras.forEach((e, k) => { if (!e.on && x >= e.xa - .5) ctx.lightOn(k, anim); if (!e.barsOn && x >= e.xa + 22) ctx.lightBars(k, anim); });
      if (!ctx.brOn && x >= ctx.eras[5].xa - 12) ctx.showBracket(anim);
      if (!ctx.endOn && x >= X2 - .5) ctx.showEnd(anim);
    };
    /* paint the whole picture for a step at once: used for arrival, jumping, going back and print */
    ctx.snap = (i) => {
      const R = ctx.root; R.classList.add('tl-nt');
      ctx.tm.forEach(clearTimeout); ctx.tm = []; ctx.scan = null;
      ctx.eras.forEach((e) => { e.on = false; e.barsOn = false; e.g.classList.remove('on', 'bars'); });
      ctx.brOn = false; ctx.br.classList.remove('on'); ctx.endOn = false; ctx.end.classList.remove('on'); ctx.scanG.classList.remove('off');
      delete ctx.nBE.dataset.v; delete ctx.nFE.dataset.v; ctx.root.querySelector('.tl-497').classList.remove('pulse');
      ctx.paint(ctx.T[i], false); ctx.updTot(false);
      void R.offsetWidth; R.classList.remove('tl-nt');
    };
    ctx.play = (i) => { ctx.scanG.classList.remove('off'); ctx.scan = { from: ctx.sx, to: ctx.T[i], t0: performance.now(), dur: i === 4 ? 650 : 2150 }; };
    ctx.tick = () => {
      const s = ctx.scan; if (!s) return;
      const p = Math.min(1, (performance.now() - s.t0) / s.dur);
      ctx.paint(s.from + (s.to - s.from) * Fx.ease.inOutSine(p), true);
      if (p >= 1) ctx.scan = null;
    };
    ctx.snap(0);
  },
  enter(ctx) { ctx.snap(0); ctx.raf(ctx.tick); },
  step(ctx, i, dir, instant) {
    if (i === 0 || instant || dir < 0 || ctx.calm) ctx.snap(i); else ctx.play(i);
  },
  static(ctx) { ctx.snap(4); },
});
