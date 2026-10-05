/* Slide: the Lightning path. One idea: silence is never read as clear.
   Facts: research C3 (story lines 1, 4, 6, 8; hops H1, H4 to H6, H10; sections 5.1, 6).
   Step 0 the unit decides, WakeCap is the backup. 1 messages wait in two queues, each with a safety net (a dead-letter queue).
   2 the unit goes quiet: four missed heartbeats, a sweep every 5 s marks it stale, the page says Unknown. 3 only green is safe. */
Deck.add({
  id: 'flow-lightning', section: 'tech', title: 'Lightning: silence is never clear', kicker: 'Data paths · Lightning',
  reality: ['code', 'live'], steps: 3, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [4500, 5600, 6400, 6400], minutes: 1.2,
  notes: [
    'The warning unit decides, and WakeCap is the backup.',
    'Messages wait in two queues, each with a safety net.',
    'If the unit goes quiet, we count missed heartbeats.',
    'After four, the page says Unknown, never all clear.',
    'Only green is safe.',
    'Every other state, and silence, is not safe.',
    'If asked: the unit has five contact lines (red, orange, yellow, green, fault) and picks its own state. The page tells people the cabinet lights and sounder come first. A radio node on the mesh reads the unit, a gateway passes it on, and two AWS IoT rules copy each message into two SQS queues: one for readings, one for frames it could not read. Each queue has a dead-letter queue that catches a message after 5 failed receives. Messages are kept 14 days. A sweep runs every 5 seconds. A unit is stale when its last message is older than 4 heartbeats. The default heartbeat is 60 seconds, so 240 seconds. It was 3 heartbeats until 22 Sep 2026. Offline, stale and a page that stopped refreshing all read Unknown. RED, FAULT and OFFLINE also go to the Observation Manager. This is from the code. The page and the silence rule are seen working in production. A red state was never seen live.',
  ].join('\n'),
  html: `
    <h2 class="h2 lt-title" data-step="0">Lightning: silence is <span class="o glow-text">never clear.</span></h2>
    <svg class="flt-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>`,
  css: `
    .s-flow-lightning .lt-title{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-flow-lightning .flt-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-flow-lightning .flt-card{stroke:rgba(255,255,255,.16);stroke-width:2;transition:stroke .5s}
    .s-flow-lightning .flt-card.hot{stroke:rgba(255,131,0,.62);filter:drop-shadow(0 0 16px rgba(255,131,0,.2))}
    .s-flow-lightning.bad .flt-card.tl{stroke:rgba(255,77,77,.75)}
    .s-flow-lightning .flt-tabbg{fill:#0B0B0C;stroke:rgba(255,255,255,.22);stroke-width:1.5}
    .s-flow-lightning .flt-tab{font:800 20px/1 var(--font);letter-spacing:.14em;text-transform:uppercase;fill:#FFD2A3}
    .s-flow-lightning .flt-nm{font:700 26px/1 var(--font);fill:#fff;text-anchor:middle}
    .s-flow-lightning .flt-sm{font:600 20px/1 var(--font);fill:#FFD27A;text-anchor:middle}
    .s-flow-lightning .flt-pl{font:600 20px/1 var(--font);fill:#9CCFF7}
    .s-flow-lightning .flt-pill{fill:rgba(255,131,0,.16);stroke:#FF8300;stroke-width:2}
    .s-flow-lightning .flt-pill.b{fill:rgba(255,255,255,.07);stroke:rgba(255,255,255,.4)}
    .s-flow-lightning .flt-pt{font:800 22px/1 var(--font);text-anchor:middle;fill:#FFD2A3}
    .s-flow-lightning .flt-pt.b{fill:#E6E6E2}
    /* the unit */
    .s-flow-lightning .flt-lamp{stroke-width:2.5;transition:fill .4s,stroke .4s}
    .s-flow-lightning .flt-lamp.r{fill:rgba(255,77,77,.12);stroke:rgba(255,77,77,.45)}
    .s-flow-lightning .flt-lamp.y{fill:rgba(255,194,75,.12);stroke:rgba(255,194,75,.45)}
    .s-flow-lightning .flt-lamp.g{fill:#2BD576;stroke:#A6F7C9;filter:url(#fx-glow);animation:fltBreath 3.4s ease-in-out infinite}
    @keyframes fltBreath{50%{opacity:.7}}
    body.calm .s-flow-lightning .flt-lamp.g{animation:none}
    /* the middle of the path wakes up at step 1 */
    .s-flow-lightning .flt-mid{opacity:.2;transition:opacity .9s var(--ease)}
    .s-flow-lightning.on1 .flt-mid{opacity:1}
    .s-flow-lightning .flt-pipe{fill:rgba(79,179,255,.06);stroke:rgba(79,179,255,.55);stroke-width:2}
    .s-flow-lightning .flt-pipe.q{stroke:rgba(255,255,255,.3);fill:rgba(255,255,255,.03)}
    .s-flow-lightning .flt-spare{opacity:0;transition:opacity .6s var(--ease) .7s}
    .s-flow-lightning.on1 .flt-spare{opacity:1}
    .s-flow-lightning .flt-spare rect{fill:rgba(255,194,75,.05);stroke:rgba(255,194,75,.7);stroke-width:2;stroke-dasharray:7 6;transition:fill .4s,stroke .4s}
    .s-flow-lightning .flt-spare.hit rect{fill:rgba(255,194,75,.24);stroke:#FFC24B;stroke-dasharray:none}
    .s-flow-lightning .flt-road{fill:none;stroke:rgba(255,255,255,.13);stroke-width:3.5;stroke-linecap:round;transition:stroke .6s}
    .s-flow-lightning.on1 .flt-road{stroke:rgba(79,179,255,.5)}
    .s-flow-lightning.on2 .flt-road{stroke:rgba(255,255,255,.13)}
    .s-flow-lightning .flt-ah{fill:rgba(255,255,255,.22);transition:fill .6s}
    .s-flow-lightning.on1 .flt-ah{fill:#4FB3FF}
    .s-flow-lightning.on2 .flt-ah{fill:rgba(255,255,255,.22)}
    .s-flow-lightning .flt-cut{opacity:0;transition:opacity .4s}
    .s-flow-lightning.on2 .flt-cut{opacity:1}
    .s-flow-lightning .flt-cut .rg{fill:none;stroke:#FFC24B;stroke-width:2;transform-box:fill-box;transform-origin:center;animation:fltRing 1.9s var(--ease) infinite}
    @keyframes fltRing{0%{transform:scale(1);opacity:.9}100%{transform:scale(2.3);opacity:0}}
    body.calm .s-flow-lightning .flt-cut .rg{animation:none;opacity:0}
    /* WakeCap: the five second sweep */
    .s-flow-lightning .flt-ring{fill:none;stroke:rgba(255,255,255,.22);stroke-width:3;transition:stroke .5s}
    .s-flow-lightning .flt-tick{stroke:rgba(255,255,255,.26);stroke-width:2}
    .s-flow-lightning .flt-comet{fill:none;stroke:#FF8300;stroke-width:6;stroke-linecap:round;stroke-dasharray:84 260;transform-box:fill-box;transform-origin:center;animation:fltSpin 5s linear infinite;filter:url(#fx-glow);transition:stroke .5s}
    @keyframes fltSpin{to{transform:rotate(360deg)}}
    body.calm .s-flow-lightning .flt-comet{animation:none}
    .s-flow-lightning.bad .flt-comet{stroke:#FF4D4D}
    .s-flow-lightning.bad .flt-ring{stroke:rgba(255,77,77,.55)}
    /* the page tile */
    .s-flow-lightning .flt-tl{fill:#2BD576;stroke:#A6F7C9;stroke-width:3;filter:url(#fx-glow);transition:fill .5s,stroke .5s}
    .s-flow-lightning.bad .flt-tl{fill:#FF4D4D;stroke:#FFB3B3}
    .s-flow-lightning .flt-tg{transform-box:fill-box;transform-origin:center}
    .s-flow-lightning .flt-tg.pop{animation:fltPop .8s var(--ease)}
    @keyframes fltPop{0%{transform:scale(.82)}45%{transform:scale(1.14)}100%{transform:none}}
    .s-flow-lightning .flt-big{font:800 42px/1 var(--font);fill:#fff;text-anchor:middle}
    .s-flow-lightning .flt-q{font:900 84px/1 var(--font);fill:#fff;text-anchor:middle}
    /* heartbeat strip */
    .s-flow-lightning .flt-slot .sc{fill:none;stroke:rgba(255,255,255,.3);stroke-width:2.5;stroke-dasharray:5 6;transition:stroke .3s,fill .3s}
    .s-flow-lightning .flt-slot.heard .sc{fill:rgba(255,131,0,.2);stroke:#FF8300;stroke-dasharray:none}
    .s-flow-lightning .flt-slot .sd{fill:#FF8300;transform-box:fill-box;transform-origin:center}
    .s-flow-lightning .flt-slot.beat .sd{animation:fltBeat .7s var(--ease)}
    @keyframes fltBeat{0%{transform:scale(1)}40%{transform:scale(1.8)}100%{transform:scale(1)}}
    .s-flow-lightning .flt-slot .sn{font:900 30px/1 var(--font);fill:#FFC24B;text-anchor:middle;opacity:0;transition:opacity .25s}
    .s-flow-lightning .flt-slot.miss .sc{fill:rgba(255,194,75,.14);stroke:#FFC24B;stroke-dasharray:none}
    .s-flow-lightning .flt-slot.miss .sn{opacity:1}
    .s-flow-lightning .flt-slot.last .sc{fill:rgba(255,77,77,.24);stroke:#FF4D4D}
    .s-flow-lightning .flt-slot.last .sn{fill:#fff}
    .s-flow-lightning .flt-brk{opacity:0;transition:opacity .4s}
    .s-flow-lightning .flt-brk.on{opacity:1}
    .s-flow-lightning .flt-brk path{fill:none;stroke:rgba(255,255,255,.4);stroke-width:2}
    .s-flow-lightning .flt-brk text{font:600 24px/1 var(--font);fill:#D9D9D4;text-anchor:middle}
    .s-flow-lightning .flt-stale{opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.7);transition:opacity .35s,transform .5s cubic-bezier(.2,1.4,.3,1)}
    .s-flow-lightning .flt-stale.on{opacity:1;transform:none}
    .s-flow-lightning .flt-stale rect{fill:rgba(255,77,77,.18);stroke:#FF4D4D;stroke-width:2.5;filter:drop-shadow(0 0 14px rgba(255,77,77,.4))}
    .s-flow-lightning .flt-stale text{font:900 30px/1 var(--font);fill:#FFD0D0;text-anchor:middle}
    /* only green is safe */
    .s-flow-lightning .flt-cap{font:800 36px/1 var(--font);fill:#fff}
    .s-flow-lightning .flt-cap .gr{fill:#2BD576}
    .s-flow-lightning .flt-lp{opacity:0;transform:scale(.6);transform-box:fill-box;transform-origin:center;transition:opacity .4s var(--ease),transform .55s cubic-bezier(.2,1.4,.3,1)}
    .s-flow-lightning.on3 .flt-lp{opacity:1;transform:none;transition-delay:calc(var(--i) * 150ms + 250ms)}
    .s-flow-lightning .flt-ln{font:700 24px/1 var(--font);fill:#E6E6E2;text-anchor:middle}
    .s-flow-lightning .flt-mk{fill:none;stroke:#06200F;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}
    .s-flow-lightning .flt-mq{font:900 44px/1 var(--font);fill:#FF8F8F;text-anchor:middle}
    .s-flow-lightning .flt-lm.pulse{animation:fltGlow 1.4s var(--ease) 2}
    @keyframes fltGlow{50%{filter:drop-shadow(0 0 22px #2BD576) drop-shadow(0 0 40px #2BD576)}}
    body.calm .s-flow-lightning .flt-lm.pulse{animation:none}
    .s-flow-lightning.nt [class*="flt-"],.s-flow-lightning.no-trans [class*="flt-"]{transition:none!important}`,
  init(ctx) {
    const svg = ctx.q('.flt-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg);
    const BLUE = '#4FB3FF', GRN = '#2BD576', YEL = '#FFC24B', RED = '#FF4D4D';
    const grp = (cls, a, p) => mk('g', Object.assign({ class: cls }, a || {}), p);
    const rev = (cls, step, delay) => grp(cls, { 'data-step': step, 'data-fx': 'fade', 'data-delay': delay || 0 });
    ctx.tm = []; ctx.rm = [];
    const later = (ms, fn) => { const id = ctx.after(ms, fn); ctx.tm.push(id); return id; };
    const tween = (ms, fn, done) => {
      if (ctx.calm) { fn(1); if (done) done(); return; }
      let t = 0, stop = null;
      stop = ctx.raf((dt) => { t += dt * 1000; const p = Math.min(1, t / ms); fn(p); if (p >= 1) { stop(); if (done) done(); } });
      ctx.rm.push(stop);
    };
    ctx.clear = () => { ctx.tm.splice(0).forEach((id) => { clearTimeout(id); ctx._timers.delete(id); }); ctx.rm.splice(0).forEach((s) => s()); };
    ctx.nt = (fn) => { const R = ctx.root; R.classList.add('nt'); fn(); void R.offsetWidth; requestAnimationFrame(() => R.classList.remove('nt')); };

    /* ---- defs ---- */
    const df = mk('defs');
    const gl = mk('linearGradient', { id: 'flt-glass', x1: 0, y1: 0, x2: 1, y2: 1 }, df);
    mk('stop', { offset: 0, 'stop-color': 'rgba(255,255,255,.09)' }, gl); mk('stop', { offset: 1, 'stop-color': 'rgba(255,255,255,.02)' }, gl);
    const sg = mk('linearGradient', { id: 'flt-swg', x1: 0, y1: 0, x2: 1, y2: 0 }, df);
    mk('stop', { offset: 0, 'stop-color': 'rgba(255,255,255,0)' }, sg); mk('stop', { offset: .5, 'stop-color': 'rgba(255,255,255,.36)' }, sg); mk('stop', { offset: 1, 'stop-color': 'rgba(255,255,255,0)' }, sg);
    mk('rect', { x: 1520, y: 250, width: 304, height: 400, rx: 28 }, mk('clipPath', { id: 'flt-tclip' }, df));

    const card = (p, x, y, w, h, tab, cls, solid) => {
      mk('rect', { x, y, width: w, height: h, rx: 28, fill: solid ? '#0C0C0E' : 'rgba(10,10,12,.55)' }, p);
      mk('rect', { class: 'flt-card ' + (cls || ''), x, y, width: w, height: h, rx: 28, fill: 'url(#flt-glass)' }, p);
      if (!tab) return;
      const t = mk('text', { class: 'flt-tab', x: x + 42, y: y + 7, text: tab }, p);
      let bw = 0; try { bw = t.getBBox().width; } catch (e) { /* ignore */ }
      const b = mk('rect', { class: 'flt-tabbg', x: x + 26, y: y - 16, width: (bw || tab.length * 17) + 32, height: 32, rx: 16 }, p);
      p.insertBefore(b, t);
    };
    const pill = (p, cx, cy, w, h, text, cls) => {
      mk('rect', { class: 'flt-pill ' + (cls || ''), x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: h / 2 }, p);
      return mk('text', { class: 'flt-pt ' + (cls || ''), x: cx, y: cy + 8, text }, p);
    };
    const packet = (d, col, r) => {
      const path = mk('path', { d, fill: 'none', stroke: 'none' }), len = path.getTotalLength();
      const g = mk('g'); g.style.display = 'none';
      const tail = [3, 2, 1].map((j) => mk('circle', { r: Math.max(2, r * (1 - j * .2)), fill: col, opacity: .5 - j * .1 }, g));
      const head = mk('circle', { r, fill: col, filter: 'url(#fx-glow)' }, g);
      const at = (q) => path.getPointAtLength(Math.max(0, q) * len);
      return (p) => {
        if (p <= 0 || p >= 1) { g.style.display = 'none'; return; }
        g.style.display = '';
        const h = at(p); head.setAttribute('cx', h.x); head.setAttribute('cy', h.y);
        tail.forEach((c, i) => { const q = at(p - (3 - i) * 12 / len); c.setAttribute('cx', q.x); c.setAttribute('cy', q.y); });
      };
    };

    /* ---- the warning unit: it decides (step 0) ---- */
    const U = rev('lt-unit', 0, 250);
    card(U, 96, 250, 330, 400, 'Warning unit', 'hot');
    mk('rect', { x: 196, y: 548, width: 130, height: 12, rx: 6, fill: '#1C1C21', stroke: 'rgba(255,255,255,.2)', 'stroke-width': 1.5 }, U);
    mk('rect', { x: 206, y: 330, width: 110, height: 220, rx: 16, fill: '#15151A', stroke: 'rgba(255,255,255,.34)', 'stroke-width': 2.5 }, U);
    mk('path', { d: 'M233 330 A28 28 0 0 1 289 330 Z', fill: '#26262C', stroke: 'rgba(255,255,255,.34)', 'stroke-width': 2.5 }, U);
    [['r', 386], ['y', 442], ['g', 498]].forEach(([c, y]) => mk('circle', { class: 'flt-lamp ' + c, cx: 261, cy: y, r: 20 }, U));
    pill(U, 261, 604, 140, 38, 'Decides');

    /* ---- the two queues (step 1) ---- */
    const Q = grp('flt-mid');
    card(Q, 730, 250, 430, 400, 'Two queues');
    [[341, 392, 'Readings', ''], [559, 610, 'Unreadable', ' q']].forEach(([py, sy, name, cls]) => {
      mk('text', { class: 'flt-pl', x: 770, y: py - 31, text: name }, Q);
      mk('rect', { class: 'flt-pipe' + cls, x: 760, y: py - 23, width: 370, height: 46, rx: 23 }, Q);
      const s = grp('flt-spare', {}, Q); if (!cls) ctx.spare = s;
      mk('rect', { x: 800, y: sy - 16, width: 290, height: 32, rx: 16 }, s);
      mk('text', { class: 'flt-sm', x: 945, y: sy + 7, text: 'Safety net' }, s);
    });

    /* ---- roads and the packets that walk them ---- */
    const D_MAIN = 'M426 450 L624 450 C676 450 690 341 770 341 L1120 341 C1196 341 1180 450 1246 450 L1520 450';
    const D_SIDE = 'M624 450 C676 450 690 559 770 559 L1120 559 C1196 559 1180 450 1246 450';
    const rMain = mk('path', { class: 'flt-road', d: D_MAIN }), rSide = mk('path', { class: 'flt-road', d: D_SIDE });
    ctx.fm = ctx.flow(rMain, { color: BLUE, count: 5, speed: 240, r: 6, tail: 7, tailGap: 13 }); ctx.fm.stop().show(false);
    ctx.fs = ctx.flow(rSide, { color: '#C9C9C4', count: 1, speed: 150, r: 5, tail: 5, tailGap: 11 }); ctx.fs.stop().show(false);
    mk('polygon', { class: 'flt-ah', points: '516,450 500,441 500,459' });
    mk('polygon', { class: 'flt-ah', points: '1520,450 1504,441 1504,459' });
    const cut = grp('flt-cut');
    mk('circle', { class: 'rg', cx: 471, cy: 450, r: 17 }, cut);
    mk('circle', { cx: 471, cy: 450, r: 17, fill: '#0B0B0C', stroke: YEL, 'stroke-width': 3 }, cut);
    mk('path', { d: 'M464 443 L478 457 M478 443 L464 457', stroke: YEL, 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none' }, cut);
    const drops = [packet('M970 341 L970 392', YEL, 6), packet('M970 559 L970 610', YEL, 6)];

    /* ---- the gateway (drawn after the roads so packets pass behind it) ---- */
    const G = grp('flt-mid');
    mk('circle', { cx: 570, cy: 450, r: 54, fill: '#0C0C0E', stroke: BLUE, 'stroke-width': 2.4 }, G);
    mk('line', { x1: 570, y1: 480, x2: 570, y2: 440, stroke: BLUE, 'stroke-width': 3.2, 'stroke-linecap': 'round' }, G);
    mk('circle', { cx: 570, cy: 432, r: 5.5, fill: BLUE }, G);
    [16, 28].forEach((r) => {
      const dx = r * Math.cos(Math.PI * 50 / 180), dy = r * Math.sin(Math.PI * 50 / 180);
      mk('path', { d: `M${570 + dx} ${432 - dy} A${r} ${r} 0 0 1 ${570 + dx} ${432 + dy}`, fill: 'none', stroke: BLUE, 'stroke-width': 3, 'stroke-linecap': 'round' }, G);
      mk('path', { d: `M${570 - dx} ${432 - dy} A${r} ${r} 0 0 0 ${570 - dx} ${432 + dy}`, fill: 'none', stroke: BLUE, 'stroke-width': 3, 'stroke-linecap': 'round' }, G);
    });
    mk('text', { class: 'flt-nm', x: 570, y: 548, text: 'Gateway' }, G);

    /* ---- WakeCap: a sweep every 5 s ---- */
    const W = grp('flt-mid');
    card(W, 1236, 330, 218, 240, 'WakeCap', '', true);
    const DX = 1345, DY = 444;
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; mk('line', { class: 'flt-tick', x1: DX + 41 * Math.sin(a), y1: DY - 41 * Math.cos(a), x2: DX + 47 * Math.sin(a), y2: DY - 47 * Math.cos(a) }, W); }
    mk('circle', { class: 'flt-ring', cx: DX, cy: DY, r: 52 }, W);
    mk('circle', { class: 'flt-comet', cx: DX, cy: DY, r: 52 }, W);
    mk('circle', { cx: DX, cy: DY, r: 6, fill: '#FF8300' }, W);
    mk('text', { class: 'flt-sm', x: DX, y: 534, text: 'Every 5 s' }, W);

    /* ---- the page tile: All clear, then Unknown ---- */
    const T = rev('lt-tile', 0, 450);
    card(T, 1520, 250, 304, 400, 'Lightning page', 'tl');
    const TG = mk('g', { class: 'flt-tg' }, T);
    mk('circle', { class: 'flt-tl', cx: 1672, cy: 400, r: 68 }, TG);
    const ok = mk('path', { d: 'M1644 402 L1664 424 L1702 378', fill: 'none', stroke: '#06200F', 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, TG);
    const qm = mk('text', { class: 'flt-q', x: 1672, y: 430, text: '?' }, TG); qm.style.display = 'none';
    const word = mk('text', { class: 'flt-big', x: 1672, y: 522, text: 'All clear' }, T);
    pill(T, 1672, 604, 140, 38, 'Backup', 'b');
    const swp = mk('rect', { x: 1380, y: 250, width: 150, height: 400, fill: 'url(#flt-swg)' }, mk('g', { 'clip-path': 'url(#flt-tclip)' }, T));
    ctx.tg = TG;

    /* ---- step 2: the heartbeat strip ---- */
    const S = rev('lt-strip', 2, 150);
    card(S, 96, 704, 974, 252, 'Heartbeat');
    mk('line', { x1: 118, y1: 812, x2: 820, y2: 812, stroke: 'rgba(255,255,255,.14)', 'stroke-width': 2 }, S);
    ctx.slots = [];
    for (let i = 0; i < 8; i++) {
      const cx = 146 + i * 92, g = mk('g', { class: 'flt-slot ' + (i < 4 ? 'heard' : 'quiet') }, S);
      mk('circle', { class: 'sc', cx, cy: 812, r: 28 }, g);
      if (i < 4) mk('circle', { class: 'sd', cx, cy: 812, r: 10 }, g); else mk('text', { class: 'sn', x: cx, y: 822, text: String(i - 3) }, g);
      ctx.slots.push(g);
    }
    const brk = mk('g', { class: 'flt-brk' }, S);
    mk('path', { d: 'M486 868 V878 H820 V868' }, brk); mk('text', { x: 653, y: 914, text: 'missed' }, brk);
    const stale = mk('g', { class: 'flt-stale' }, S);
    mk('rect', { x: 860, y: 784, width: 170, height: 56, rx: 28 }, stale); mk('text', { x: 945, y: 823, text: 'Stale' }, stale);

    /* ---- step 3: only green is safe ---- */
    const L = rev('lt-lamps', 3, 0);
    card(L, 1094, 704, 730, 252, '');
    const cap = mk('text', { class: 'flt-cap', x: 1130, y: 772 }, L); cap.innerHTML = 'Only <tspan class="gr">green</tspan> is safe.';
    ctx.lamps = [['Green', GRN, 'ok'], ['Yellow', YEL, 'no'], ['Red', RED, 'no'], ['Unknown', RED, 'q']].map(([name, col, kind], i) => {
      const cx = 1185 + i * 183, cy = 856, g = mk('g', { class: 'flt-lp', style: '--i:' + i }, L);
      const lm = mk('g', { class: 'flt-lm' }, g);
      if (kind === 'q') mk('circle', { cx, cy, r: 34, fill: 'rgba(255,77,77,.1)', stroke: RED, 'stroke-width': 3, 'stroke-dasharray': '6 6' }, lm);
      else mk('circle', { cx, cy, r: 34, fill: col, stroke: kind === 'ok' ? '#A6F7C9' : 'none', 'stroke-width': 3 }, lm);
      const mkg = mk('g', { class: 'flt-mk', style: '--i:' + i, transform: `translate(${cx} ${cy})` }, g);
      mkg.setAttribute('class', '');
      if (kind === 'ok') mk('path', { class: 'flt-mk', d: 'M-15 2 L-4 14 L16 -12' }, mkg);
      if (kind === 'no') mk('path', { class: 'flt-mk', d: 'M-12 -12 L12 12 M12 -12 L-12 12' }, mkg);
      if (kind === 'q') mk('text', { class: 'flt-mq', x: 0, y: 15, text: '?' }, mkg);
      mk('text', { class: 'flt-ln', x: cx, y: 930, text: name }, g);
      return { g, lm };
    });

    /* ---- state helpers ---- */
    ctx.setBad = (b) => {
      ctx.root.classList.toggle('bad', b);
      word.textContent = b ? 'Unknown' : 'All clear';
      ok.style.display = b ? 'none' : ''; qm.style.display = b ? '' : 'none';
    };
    ctx.setMiss = (n) => {
      ctx.slots.forEach((g, i) => { if (i < 4) return; const k = i - 4; g.classList.toggle('miss', k < n); g.classList.toggle('last', k === 3 && n >= 4); });
      brk.classList.toggle('on', n >= 1); stale.classList.toggle('on', n >= 4);
    };
    ctx.setDrop = (on) => { ctx.spare.classList.toggle('hit', on); };
    ctx.flip = () => {
      ctx.setBad(true);
      if (ctx.calm) return;
      ctx.tg.classList.remove('pop'); void ctx.tg.getBoundingClientRect(); ctx.tg.classList.add('pop');
      swp.animate([{ transform: 'translateX(0px)', opacity: 1 }, { transform: 'translateX(620px)', opacity: 0 }], { duration: 1100, easing: 'cubic-bezier(.2,.8,.2,1)' });
      Fx.burstEl(ctx.tg, { n: 36, color: '#FF6B5E', speed: 380 });
    };
    ctx.drop = (i) => {
      tween(650, (p) => drops[i](Math.min(.995, p)), () => {
        drops[i](1); if (i === 0) ctx.setDrop(true);
        if (!ctx.calm) Fx.burstEl(ctx.root.querySelectorAll('.flt-spare rect')[i], { n: 14, color: YEL, speed: 220 });
      });
    };

    /* final state of step k, no animation */
    ctx.settle = (k) => {
      ctx.clear();
      const R = ctx.root;
      R.classList.toggle('on1', k >= 1); R.classList.toggle('on2', k >= 2); R.classList.toggle('on3', k >= 3);
      const run = k === 1;
      [ctx.fm, ctx.fs].forEach((f) => { f.show(run); if (run) f.start(); else f.stop(); });
      drops.forEach((d) => d(0));
      ctx.setDrop(k >= 1);
      ctx.slots.forEach((g) => g.classList.remove('beat'));
      ctx.setMiss(k >= 2 ? 4 : 0);
      ctx.setBad(k >= 2);
      ctx.lamps.forEach((l) => l.lm.classList.remove('pulse'));
    };
    /* animate step k (the state of step k-1 is already in place) */
    ctx.play = (k) => {
      const R = ctx.root;
      if (k === 1) {
        ctx.setDrop(false);
        R.classList.add('on1');
        ctx.fm.show(true).start(); later(500, () => ctx.fs.show(true).start());
        later(1500, () => ctx.drop(0)); later(1950, () => ctx.drop(1));
      } else if (k === 2) {
        R.classList.add('on2');
        ctx.fm.stop().show(false); ctx.fs.stop().show(false);
        for (let i = 0; i < 4; i++) later(600 + i * 130, () => { const g = ctx.slots[i]; g.classList.remove('beat'); void g.getBoundingClientRect(); g.classList.add('beat'); });
        for (let n = 1; n <= 4; n++) later(1250 + (n - 1) * 400, () => { ctx.setMiss(n); if (n === 4 && !ctx.calm) Fx.burstEl(ctx.slots[7], { n: 18, color: '#FF6B5E', speed: 260 }); });
        later(2750, () => ctx.flip());
      } else if (k === 3) {
        R.classList.add('on3');
        later(1500, () => { const l = ctx.lamps[0].lm; l.classList.remove('pulse'); void l.getBoundingClientRect(); l.classList.add('pulse'); if (!ctx.calm) Fx.burstEl(l, { n: 30, color: GRN, speed: 330 }); });
      }
    };
    ctx.settle(0);
  },
  enter(ctx) { ctx.prev = undefined; },
  step(ctx, i, dir, instant) {
    const fwd = dir > 0 && !instant && !ctx.calm && i > 0 && ctx.prev === i - 1;
    if (fwd) { ctx.nt(() => ctx.settle(i - 1)); ctx.play(i); } else ctx.nt(() => ctx.settle(i));
    ctx.prev = i;
  },
  leave(ctx) { ctx.clear(); },
  static(ctx) { ctx.settle(3); },
});
