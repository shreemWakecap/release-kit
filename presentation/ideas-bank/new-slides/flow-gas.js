/* Slide: the Gas path. One idea: the maker's cloud is asked, on a timer, for the whole fleet.
   Facts: research C4 (story lines 2 to 6 and 9; hops 1 to 3 and 4; section 3 alert path; section 9 constants).
   Step 0 the loop at rest: detectors, the maker's cloud, WakeCap. 1 one call every 45 s brings the whole fleet back.
   2 a reading over the High alarm opens an alert. 3 four alert types are critical. 4 people confirm and close in WakeCap; nothing goes back to the maker. */
Deck.add({
  id: 'flow-gas', section: 'tech', title: 'Gas: asked every 45 seconds', kicker: 'Data paths · Gas',
  reality: ['code', 'live'], steps: 4, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [4000, 5400, 5400, 5400, 6400], minutes: 1.3,
  notes: [
    'Gas has no mesh and no Modbus.',
    'The maker keeps the readings, and we ask for them every 45 seconds.',
    'One call brings back the whole fleet.',
    'A reading over the High alarm opens an alert.',
    'Four kinds of alert are critical: high gas, SOS, fall and tipped over.',
    'People confirm and close alerts in WakeCap, and the maker is never told.',
    'If asked: the maker is Blackline. WakeCap makes one GET device call per tick, and it returns every detector with its newest readings, online flag, battery and open alerts. Detectors upload about every 30 minutes, so a reading can be up to about 30 minutes old. Each reading is stored once, with the detector time. An alert opens when a new reading is strictly over its High alarm, for example above 10 ppm for H2S, and closes when a reading is at or under it. A low oxygen reading never opens an alert. The four critical types are high gas, SOS, fall and tipped over. The page button says Acknowledge. Closing happens only in WakeCap, so an alert closed here stays open in the maker cloud. New critical alerts are also handed to the Observation Manager; that is merged and on test only, and not yet seen working end to end. The screens are live on production.',
  ].join('\n'),
  html: `
    <h2 class="h2 gs-title" data-step="0">Gas: asked <span class="o glow-text">every 45 seconds.</span></h2>
    <p class="lead gs-lead" data-step="0" data-delay="200">No mesh. No Modbus. Just the maker’s cloud.</p>
    <svg class="fg-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>`,
  css: `
    .s-flow-gas .gs-title{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-flow-gas .gs-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-flow-gas .fg-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-flow-gas .fg-row1{transform:translateY(140px);transition:transform 1.1s var(--ease)}
    .s-flow-gas.a1 .fg-row1{transform:none}
    .s-flow-gas .fg-card{stroke:rgba(255,255,255,.16);stroke-width:2}
    .s-flow-gas .fg-card.hot{stroke:rgba(255,131,0,.6);filter:drop-shadow(0 0 16px rgba(255,131,0,.18))}
    .s-flow-gas .fg-tabbg{fill:#0B0B0C;stroke:rgba(255,255,255,.22);stroke-width:1.5}
    .s-flow-gas .fg-tab{font:800 20px/1 var(--font);letter-spacing:.14em;text-transform:uppercase;fill:#FFD2A3}
    .s-flow-gas .fg-nm{font:700 26px/1 var(--font);fill:#fff}
    .s-flow-gas .fg-lab{font:700 22px/1 var(--font);fill:#FFC48A;text-anchor:middle}
    .s-flow-gas .fg-hi{font:700 22px/1 var(--font);fill:#FFC24B}
    .s-flow-gas .fg-line{fill:none;stroke:rgba(255,255,255,.14);stroke-width:3;stroke-linecap:round}
    .s-flow-gas .fg-ah{fill:rgba(255,255,255,.3)}
    .s-flow-gas .fg-up{fill:none;stroke:rgba(43,213,118,.4);stroke-width:3;stroke-dasharray:3 9;stroke-linecap:round}
    /* the poll ring */
    .s-flow-gas .fg-track{fill:none;stroke:rgba(255,255,255,.14);stroke-width:9}
    .s-flow-gas .fg-arc{fill:none;stroke:#FF8300;stroke-width:9;stroke-linecap:round;filter:url(#fx-glow)}
    .s-flow-gas .fg-45{font:900 30px/1 var(--font);fill:#fff;text-anchor:middle}
    /* the maker's cloud */
    .s-flow-gas .fg-cloud{fill:rgba(79,179,255,.07);stroke:rgba(79,179,255,.6);stroke-width:2.6;transition:fill .3s,stroke .3s}
    .s-flow-gas .fg-cg.hit .fg-cloud{fill:rgba(255,131,0,.18);stroke:#FF8300}
    .s-flow-gas .fg-fd{transition:fill .3s}
    /* the fleet rows */
    .s-flow-gas .fg-row{opacity:.28;transition:opacity .4s}
    .s-flow-gas .fg-row.lit{opacity:1}
    .s-flow-gas .fg-row rect.bg{fill:rgba(255,255,255,.05);stroke:rgba(255,255,255,.16);stroke-width:1.5;transition:stroke .3s,fill .3s}
    .s-flow-gas .fg-row.flash rect.bg{stroke:#2BD576;fill:rgba(43,213,118,.14)}
    .s-flow-gas .fg-row .tk{fill:rgba(255,255,255,.12)}
    .s-flow-gas .fg-row .lv{fill:#2BD576}
    .s-flow-gas .fg-row.off .lv{fill:#6F6F6A}
    /* panel A: the High alarm */
    .s-flow-gas .fg-base{stroke:rgba(255,255,255,.2);stroke-width:2}
    .s-flow-gas .fg-alarm{stroke:#FFC24B;stroke-width:2.6;stroke-dasharray:9 8;opacity:0;transition:opacity .4s}
    .s-flow-gas .fg-alarmlab{opacity:0;transition:opacity .4s}
    .s-flow-gas.a1 .fg-alarm,.s-flow-gas.a1 .fg-alarmlab{opacity:1}
    .s-flow-gas .fg-ru{fill:none;stroke:#2BD576;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
    .s-flow-gas .fg-ro{fill:none;stroke:#FF4D4D;stroke-width:5.5;stroke-linecap:round;stroke-linejoin:round;filter:url(#fx-glow-u)}
    .s-flow-gas .fg-alert{opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.7);transition:opacity .35s,transform .5s cubic-bezier(.2,1.4,.3,1)}
    .s-flow-gas .fg-alert.on{opacity:1;transform:none}
    .s-flow-gas .fg-alert rect{fill:rgba(255,77,77,.2);stroke:#FF4D4D;stroke-width:2.5;filter:drop-shadow(0 0 14px rgba(255,77,77,.4))}
    .s-flow-gas .fg-alert text{font:900 24px/1 var(--font);fill:#FFD0D0;text-anchor:middle}
    .s-flow-gas .fg-xring{fill:none;stroke:#FF4D4D;stroke-width:3;opacity:0;transform-box:fill-box;transform-origin:center}
    .s-flow-gas .fg-xring.go{animation:fgPulse 1.3s var(--ease)}
    @keyframes fgPulse{0%{opacity:1;transform:scale(.5)}100%{opacity:0;transform:scale(3.6)}}
    body.calm .s-flow-gas .fg-xring.go{animation:none}
    /* panel B: four critical */
    .s-flow-gas .fg-chip{opacity:0;transform:scale(.7);transform-box:fill-box;transform-origin:center;transition:opacity .35s,transform .5s cubic-bezier(.2,1.4,.3,1)}
    .s-flow-gas .fg-chip.on{opacity:1;transform:none}
    .s-flow-gas .fg-chip rect{fill:rgba(255,131,0,.08);stroke:#FF8300;stroke-width:2}
    .s-flow-gas .fg-chip .ic{fill:none;stroke:#FFB366;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round}
    .s-flow-gas .fg-chip text{font:700 26px/1 var(--font);fill:#fff}
    /* panel C: confirm and close stay here */
    .s-flow-gas .fg-ac{fill:rgba(255,255,255,.04);stroke:rgba(255,255,255,.18);stroke-width:2}
    .s-flow-gas .fg-st rect{transition:fill .35s,stroke .35s}
    .s-flow-gas .fg-st text{font:800 24px/1 var(--font);text-anchor:middle;transition:fill .35s}
    .s-flow-gas .fg-st.s0 rect{fill:rgba(255,77,77,.2);stroke:#FF4D4D}.s-flow-gas .fg-st.s0 text{fill:#FFC9C9}
    .s-flow-gas .fg-st.s1 rect{fill:rgba(255,194,75,.18);stroke:#FFC24B}.s-flow-gas .fg-st.s1 text{fill:#FFE3A6}
    .s-flow-gas .fg-st.s2 rect{fill:rgba(156,176,198,.18);stroke:#9CB0C6}.s-flow-gas .fg-st.s2 text{fill:#DCE6F1}
    .s-flow-gas .fg-btn rect{fill:rgba(255,131,0,.08);stroke:#FF8300;stroke-width:2.2;transition:fill .25s,stroke .25s}
    .s-flow-gas .fg-btn text{font:800 24px/1 var(--font);fill:#FFD2A3;text-anchor:middle;transition:fill .25s}
    .s-flow-gas .fg-btn.press rect{fill:#FF8300}.s-flow-gas .fg-btn.press text{fill:#1a0d02}
    .s-flow-gas .fg-btn.done rect{fill:rgba(255,255,255,.05);stroke:rgba(255,255,255,.3)}.s-flow-gas .fg-btn.done text{fill:#D9D9D4}
    .s-flow-gas .fg-btn .tick{fill:none;stroke:#2BD576;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;opacity:0;transition:opacity .3s}
    .s-flow-gas .fg-btn.done .tick{opacity:1}
    .s-flow-gas .fg-cur{opacity:0;transition:transform .55s var(--ease),opacity .3s}
    .s-flow-gas .fg-cur.on{opacity:1}
    .s-flow-gas .fg-block{opacity:0;transition:opacity .4s}
    .s-flow-gas .fg-block.on{opacity:1}
    .s-flow-gas .fg-bx{fill:rgba(255,77,77,.14);stroke:#FF4D4D;stroke-width:2.6}
    .s-flow-gas .fg-bx.shake{animation:fgShake .5s}
    @keyframes fgShake{20%{transform:translateX(-6px)}50%{transform:translateX(6px)}80%{transform:translateX(-3px)}}
    body.calm .s-flow-gas .fg-bx.shake{animation:none}
    .s-flow-gas .fg-open{opacity:0;transition:opacity .4s}
    .s-flow-gas .fg-open.on{opacity:1}
    .s-flow-gas .fg-open text{font:700 22px/1 var(--font);fill:#FFC9C9;text-anchor:middle}
    .s-flow-gas.nt [class*="fg-"],.s-flow-gas.no-trans [class*="fg-"]{transition:none!important}`,
  init(ctx) {
    const svg = ctx.q('.fg-svg'); let host = svg; const mk = (t, a, p) => Fx.el(t, a, p || host);
    const GRN = '#2BD576', ORG = '#FF8300', AMB = '#FFC24B', RED = '#FF4D4D', BLUE = '#4FB3FF';
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
    const ease = Fx.ease.outCubic;

    /* ---- defs ---- */
    const df = mk('defs');
    const gl = mk('linearGradient', { id: 'fg-glass', x1: 0, y1: 0, x2: 1, y2: 1 }, df);
    mk('stop', { offset: 0, 'stop-color': 'rgba(255,255,255,.09)' }, gl); mk('stop', { offset: 1, 'stop-color': 'rgba(255,255,255,.02)' }, gl);

    const card = (p, x, y, w, h, tab, cls) => {
      mk('rect', { x, y, width: w, height: h, rx: 28, fill: 'rgba(10,10,12,.55)' }, p);
      mk('rect', { class: 'fg-card ' + (cls || ''), x, y, width: w, height: h, rx: 28, fill: 'url(#fg-glass)' }, p);
      if (!tab) return;
      const t = mk('text', { class: 'fg-tab', x: x + 42, y: y + 7, text: tab }, p);
      let bw = 0; try { bw = t.getBBox().width; } catch (e) { /* ignore */ }
      const b = mk('rect', { class: 'fg-tabbg', x: x + 26, y: y - 16, width: (bw || tab.length * 17) + 32, height: 32, rx: 16 }, p);
      p.insertBefore(b, t);
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
    const cloudD = (cx, cy, s) => 'M' + [[-78, 44]].map(([x, y]) => (cx + x * s) + ' ' + (cy + y * s)).join('') +
      ' C' + [[-108, 44], [-112, -4], [-82, -10], [-86, -48], [-34, -62], [-16, -30], [0, -56], [56, -52], [62, -12], [96, -12], [106, 44], [74, 44]]
        .map(([x, y]) => (cx + x * s) + ' ' + (cy + y * s)).join(' ') + ' Z';

    /* =========================================================== row 1: the loop (starts low, glides up at step 2) */
    host = grp('fg-row1');
    /* detectors */
    const D = rev('gs-det', 0, 250);
    card(D, 96, 290, 330, 258, 'Detectors');
    [0, 1, 2, 3, 4].forEach((k) => {
      const cx = 151 + k * 55, cy = 398, on = k < 4;
      mk('rect', { x: cx - 18, y: cy - 36, width: 36, height: 72, rx: 10, fill: '#15151A', stroke: 'rgba(255,255,255,.34)', 'stroke-width': 2.2 }, D);
      mk('rect', { x: cx - 11, y: cy - 28, width: 22, height: 15, rx: 4, fill: on ? 'rgba(43,213,118,.22)' : 'rgba(255,255,255,.07)', stroke: on ? 'rgba(43,213,118,.7)' : 'rgba(255,255,255,.3)', 'stroke-width': 1.5 }, D);
      [0, 1, 2].forEach((j) => mk('circle', { cx, cy: cy - 2 + j * 11, r: 3, fill: on ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.25)' }, D));
      mk('circle', { cx, cy: cy + 58, r: 6.5, fill: on ? GRN : '#6F6F6A' }, D);
    });
    /* upload link: the detectors tell the cloud (dashed, no packets) */
    const LN = rev('gs-lines', 0, 650);
    mk('path', { class: 'fg-up', d: 'M434 419 L548 419' }, LN);
    mk('polygon', { points: '560,419 546,411 546,427', fill: 'rgba(43,213,118,.5)' }, LN);

    /* maker's cloud */
    const C = rev('gs-cloud', 0, 400);
    card(C, 560, 290, 420, 258, 'Maker’s cloud');
    const CG = mk('g', { class: 'fg-cg' }, C); ctx.cg = CG;
    mk('path', { class: 'fg-cloud', d: cloudD(770, 424, 1.18) }, CG);
    ctx.fd = [0, 1, 2, 3, 4].map((k) => mk('circle', { class: 'fg-fd', cx: 722 + k * 24, cy: 436, r: 7.5, fill: k < 4 ? GRN : '#6F6F6A' }, CG));

    /* WakeCap card: the ring and the fleet rows */
    const W = rev('gs-wc', 0, 550);
    card(W, 1160, 290, 664, 258, 'WakeCap', 'hot');
    const RX = 1256, RY = 384, RR = 50, RC = 2 * Math.PI * RR;
    mk('circle', { class: 'fg-track', cx: RX, cy: RY, r: RR }, W);
    ctx.arc = mk('circle', { class: 'fg-arc', cx: RX, cy: RY, r: RR, transform: `rotate(-90 ${RX} ${RY})`, 'stroke-dasharray': RC }, W);
    mk('text', { class: 'fg-45', x: RX, y: RY + 11, text: '45 s' }, W);
    ctx.rows = [0, 1, 2, 3, 4].map((i) => {
      const y = 342 + i * 38, g = mk('g', { class: 'fg-row' + (i === 4 ? ' off' : '') }, W);
      mk('rect', { class: 'bg', x: 1380, y, width: 410, height: 30, rx: 10 }, g);
      mk('circle', { cx: 1402, cy: y + 15, r: 6, fill: i === 4 ? '#6F6F6A' : GRN }, g);
      [0.62, 0.38, 0.5].forEach((lv, j) => {
        const x = 1434 + j * 120;
        mk('rect', { class: 'tk', x, y: y + 11, width: 100, height: 8, rx: 4 }, g);
        mk('rect', { class: 'lv', x, y: y + 11, width: i === 4 ? 0 : 100 * (lv + ((i * 7 + j * 3) % 5) * .05), height: 8, rx: 4 }, g);
      });
      return g;
    });

    /* the call and the answer */
    mk('path', { class: 'fg-line', d: 'M1204 384 L996 384' }, LN);
    mk('polygon', { class: 'fg-ah', points: '980,384 994,376 994,392' }, LN);
    mk('text', { class: 'fg-lab', x: 1092, y: 358, text: 'One call' }, LN);
    mk('text', { class: 'fg-lab', x: 1080, y: 512, text: 'Whole fleet' }, LN);
    const ansD = [0, 1, 2, 3, 4].map((i) => `M988 474 L1196 474 C1296 474 1306 ${357 + i * 38} 1372 ${357 + i * 38}`);
    ansD.forEach((d) => mk('path', { class: 'fg-line', d, 'stroke-width': 2 }, LN));
    const callPk = packet('M1204 384 L996 384', ORG, 7);
    const ansPk = ansD.map((d) => packet(d, GRN, 6));

    host = svg;
    /* ---- poll loop: ring fills, one call goes out, the fleet comes back ---- */
    const PER = 5.2, REST = 2.7, ph = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
    ctx.on = [false, false, false, false, false];
    ctx.drawPoll = (t) => {
      const pr = t < .8 ? ease(t / .8) : (t > PER - .4 ? (PER - t) / .4 : 1);
      ctx.arc.style.strokeDashoffset = RC * (1 - pr);
      callPk(ph(t, .8, 1.3));
      ctx.cg.classList.toggle('hit', t >= 1.3 && t < 1.8);
      ansPk.forEach((pk, i) => pk(ph(t, 1.4 + i * .06, 2.05 + i * .06)));
      ctx.rows.forEach((r, i) => {
        const at = 2.05 + i * .06; if (t >= at) ctx.on[i] = true;
        r.classList.toggle('lit', ctx.on[i]); r.classList.toggle('flash', t >= at && t < at + .4);
      });
    };
    ctx.T = 0;
    ctx.loopOn = (on) => {
      if (ctx.loopRm) { ctx.loopRm(); ctx.loopRm = null; }
      if (!on || ctx.calm) return;
      ctx.loopRm = ctx.raf((dt) => { ctx.T += dt; if (ctx.T >= PER) ctx.T -= PER; ctx.drawPoll(ctx.T); });
    };

    /* =========================================================== row 2: three panels */
    /* panel A: a reading over the High alarm opens an alert */
    const A = rev('gs-a', 2, 150);
    card(A, 96, 596, 560, 364, 'Reading');
    mk('line', { class: 'fg-base', x1: 130, y1: 916, x2: 622, y2: 916 }, A);
    mk('line', { class: 'fg-alarm', x1: 130, y1: 738, x2: 622, y2: 738 }, A);
    mk('text', { class: 'fg-hi fg-alarmlab', x: 134, y: 722, text: 'High alarm' }, A);
    const PX = [140, 196, 252, 308, 364, 420, 476, 532, 588], PY = [868, 842, 870, 836, 816, 790, 760, 712, 672], LIM = 738;
    let ci = 0; while (PY[ci + 1] > LIM) ci++;                       /* first segment that crosses the line */
    const tc = (PY[ci] - LIM) / (PY[ci] - PY[ci + 1]), CX = PX[ci] + tc * (PX[ci + 1] - PX[ci]);
    const seg = [], cum = [0];
    for (let i = 0; i < PX.length - 1; i++) { const l = Math.hypot(PX[i + 1] - PX[i], PY[i + 1] - PY[i]); seg.push(l); cum.push(cum[i] + l); }
    const LTOT = cum[cum.length - 1], LC = cum[ci] + tc * seg[ci];
    const under = 'M' + PX.slice(0, ci + 1).map((x, i) => x + ' ' + PY[i]).join(' L') + ` L${CX} ${LIM}`;
    const over = `M${CX} ${LIM} L` + PX.slice(ci + 1).map((x, i) => x + ' ' + PY[ci + 1 + i]).join(' L');
    const pu = mk('path', { class: 'fg-ru', d: under }, A), po = mk('path', { class: 'fg-ro', d: over }, A);
    const lu = pu.getTotalLength(), lo = po.getTotalLength();
    mk('circle', { class: 'fg-xring', cx: CX, cy: LIM, r: 12 }, A); ctx.xr = A.lastChild;
    const AL = grp('fg-alert', {}, A);
    mk('line', { x1: CX, y1: LIM + 8, x2: 541, y2: 792, stroke: RED, 'stroke-width': 2.2, 'stroke-dasharray': '4 5' }, A);
    mk('rect', { x: 452, y: 792, width: 178, height: 46, rx: 23 }, AL); mk('text', { x: 541, y: 824, text: 'Alert opens' }, AL);
    ctx.alert = AL;
    ctx.drawChart = (p) => {                                          /* p 0..1 along the reading line */
      const s = p * LTOT;
      pu.style.strokeDasharray = lu; pu.style.strokeDashoffset = lu * (1 - Math.min(1, s / LC));
      po.style.strokeDasharray = lo; po.style.strokeDashoffset = lo * (1 - Math.max(0, Math.min(1, (s - LC) / (LTOT - LC))));
    };
    ctx.LC = LC; ctx.LTOT = LTOT;

    /* panel B: four critical types */
    const B = rev('gs-b', 3, 150);
    card(B, 680, 596, 560, 364, 'Critical');
    const icons = {
      gas: (g) => { mk('path', { class: 'ic', d: 'M-22 14 C-34 14 -34 -6 -20 -8 C-20 -22 0 -26 6 -13 C18 -20 32 -8 24 6 C28 14 20 14 16 14 Z' }, g); mk('path', { class: 'ic', d: 'M-8 22 V30 M4 20 V32 M16 22 V30' }, g); },
      sos: (g) => { mk('path', { class: 'ic', d: 'M-16 14 V0 A16 16 0 0 1 16 0 V14 Z M-24 14 H24 V22 H-24 Z M0 -26 V-20 M-20 -20 L-16 -16 M20 -20 L16 -16' }, g); },
      fall: (g) => { mk('circle', { class: 'ic', cx: -14, cy: -18, r: 7 }, g); mk('path', { class: 'ic', d: 'M-10 -10 L8 6 M8 6 L24 10 M8 6 L2 22 M-4 -6 L-22 -2 M-2 -4 L10 -16 M-26 26 H28' }, g); },
      tip: (g) => { mk('rect', { class: 'ic', x: -26, y: 2, width: 46, height: 24, rx: 6 }, g); mk('path', { class: 'ic', d: 'M-14 14 H-8 M-26 -14 C-18 -28 4 -28 12 -16 M12 -16 L4 -16 M12 -16 L12 -8' }, g); },
    };
    ctx.chips = [['High gas', 'gas'], ['SOS', 'sos'], ['Fall', 'fall'], ['Tipped over', 'tip']].map(([name, ic], i) => {
      const x = 704 + (i % 2) * 266, y = 652 + Math.floor(i / 2) * 148, g = grp('fg-chip', {}, B);
      mk('rect', { x, y, width: 246, height: 126, rx: 22 }, g);
      icons[ic](mk('g', { transform: `translate(${x + 46} ${y + 63}) scale(.92)` }, g));
      mk('text', { x: x + 86, y: y + 73, text: name }, g);
      return g;
    });

    /* panel C: confirm and close stay in WakeCap */
    const P = rev('gs-c', 4, 150);
    card(P, 1264, 596, 560, 364, 'Stays in WakeCap');
    mk('rect', { class: 'fg-ac', x: 1292, y: 650, width: 274, height: 270, rx: 20 }, P);
    ctx.st = grp('fg-st s0', {}, P); mk('rect', { x: 1322, y: 674, width: 214, height: 46, rx: 23 }, ctx.st); ctx.stt = mk('text', { x: 1429, y: 706, text: 'Active' }, ctx.st);
    const btn = (y, label) => {
      const g = grp('fg-btn', {}, P);
      mk('rect', { x: 1322, y, width: 214, height: 58, rx: 16 }, g); mk('text', { x: 1440, y: y + 37, text: label }, g);
      mk('path', { class: 'tick', d: `M1338 ${y + 30} L1346 ${y + 38} L1358 ${y + 20}` }, g);
      return g;
    };
    ctx.b1 = btn(742, 'Confirm'); ctx.b2 = btn(826, 'Close');
    /* the way back to the maker is blocked */
    const K = grp('fg-block', {}, P);
    mk('path', { d: 'M1574 785 L1610 785', stroke: 'rgba(255,255,255,.4)', 'stroke-width': 3, 'stroke-dasharray': '4 6', fill: 'none', 'stroke-linecap': 'round' }, K);
    ctx.bx = mk('g', { class: 'fg-bx-g' }, K);
    mk('circle', { class: 'fg-bx', cx: 1626, cy: 785, r: 16 }, ctx.bx); mk('path', { d: 'M1619 778 L1633 792 M1633 778 L1619 792', stroke: RED, 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none' }, ctx.bx);
    ctx.blk = K;
    mk('path', { class: 'fg-cloud', d: cloudD(1716, 768, .62), style: 'fill:rgba(79,179,255,.07);stroke:rgba(79,179,255,.6)' }, P);
    mk('circle', { cx: 1768, cy: 738, r: 10, fill: RED, filter: 'url(#fx-glow)' }, P);
    const OP = grp('fg-open', {}, P); mk('text', { x: 1716, y: 842, text: 'Still open' }, OP); ctx.open = OP;
    const blockPk = packet('M1568 785 L1604 785', AMB, 6);
    const cur = mk('g', { class: 'fg-cur' }, P); ctx.cur = cur;
    mk('polygon', { points: '0,0 0,26 7,20 12,31 17,29 12,18 21,18', fill: '#fff', stroke: '#0B0B0C', 'stroke-width': 1.6, 'stroke-linejoin': 'round' }, cur);
    const curTo = (x, y) => { cur.style.transform = `translate(${x}px,${y}px)`; };
    curTo(1580, 930);

    /* ---- state helpers ---- */
    ctx.setStatus = (n) => {
      ctx.st.setAttribute('class', 'fg-st s' + n); ctx.stt.textContent = ['Active', 'Confirmed', 'Closed'][n];
      ctx.b1.classList.toggle('done', n >= 1); ctx.b2.classList.toggle('done', n >= 2);
    };
    ctx.setChips = (n) => ctx.chips.forEach((g, i) => g.classList.toggle('on', i < n));
    ctx.setAlert = (on) => { ctx.alert.classList.toggle('on', on); };
    ctx.setBlock = (on) => { ctx.blk.classList.toggle('on', on); ctx.open.classList.toggle('on', on); };

    /* final state of step k, no animation */
    ctx.settle = (k, keep) => {
      ctx.clear();
      const R = ctx.root;
      R.classList.toggle('a1', k >= 2);
      ctx.on = [k >= 1, k >= 1, k >= 1, k >= 1, k >= 1];
      if (k >= 1) { if (!(keep && ctx.loopRm)) { ctx.T = REST; ctx.drawPoll(REST); ctx.loopOn(true); } } else { ctx.loopOn(false); ctx.T = 0; ctx.arc.style.strokeDashoffset = RC; callPk(0); ansPk.forEach((f) => f(0)); ctx.cg.classList.remove('hit'); ctx.rows.forEach((r) => { r.classList.remove('lit', 'flash'); }); }
      ctx.drawChart(k >= 2 ? 1 : 0); ctx.setAlert(k >= 2); ctx.xr.classList.remove('go');
      ctx.setChips(k >= 3 ? 4 : 0);
      ctx.setStatus(k >= 4 ? 2 : 0); ctx.setBlock(k >= 4); blockPk(0); curTo(1580, 930); ctx.cur.classList.remove('on');
      ctx.bx.firstChild.classList.remove('shake');
    };
    /* animate step k (the state of step k-1 is already in place) */
    ctx.play = (k) => {
      const R = ctx.root;
      if (k === 1) {
        ctx.T = 0; ctx.loopOn(true);
      } else if (k === 2) {
        R.classList.add('a1');
        const f = ctx.LC / ctx.LTOT;
        later(450, () => {
          let crossed = false;
          tween(1100, (p) => {
            const q = ease(p); ctx.drawChart(q);
            if (!crossed && q >= f) { crossed = true; ctx.xr.classList.remove('go'); void ctx.xr.getBoundingClientRect(); ctx.xr.classList.add('go'); }
          });
        });
        later(1750, () => { ctx.setAlert(true); if (!ctx.calm) Fx.burstEl(ctx.alert, { n: 26, color: '#FF6B5E', speed: 300 }); });
      } else if (k === 3) {
        ctx.chips.forEach((g, i) => later(450 + i * 300, () => { ctx.setChips(i + 1); if (!ctx.calm) Fx.burstEl(g, { n: 16, color: '#FF8300', speed: 260 }); }));
      } else if (k === 4) {
        later(250, () => ctx.cur.classList.add('on')); later(500, () => curTo(1330, 748));
        later(1000, () => { ctx.b1.classList.add('press'); });
        later(1250, () => { ctx.b1.classList.remove('press'); ctx.setStatus(1); });
        later(1550, () => curTo(1330, 832));
        later(1900, () => { ctx.b2.classList.add('press'); });
        later(2150, () => { ctx.b2.classList.remove('press'); ctx.setStatus(2); ctx.cur.classList.remove('on'); });
        later(2500, () => {
          ctx.blk.classList.add('on');
          tween(500, (p) => blockPk(Math.min(.995, p)), () => { blockPk(1); ctx.bx.firstChild.classList.remove('shake'); void ctx.bx.getBoundingClientRect(); ctx.bx.firstChild.classList.add('shake'); ctx.open.classList.add('on'); if (!ctx.calm) Fx.burstEl(ctx.bx, { n: 14, color: '#FF6B5E', speed: 220 }); });
        });
      }
    };
    ctx.settle(0);
  },
  enter(ctx) { ctx.prev = undefined; },
  step(ctx, i, dir, instant) {
    const fwd = dir > 0 && !instant && !ctx.calm && i > 0 && ctx.prev === i - 1;
    if (fwd) { ctx.nt(() => ctx.settle(i - 1, true)); ctx.play(i); } else ctx.nt(() => ctx.settle(i));
    ctx.prev = i;
  },
  leave(ctx) { ctx.clear(); ctx.loopRm = null; },
  static(ctx) { ctx.settle(4); ctx.loopOn(false); ctx.T = 2.7; ctx.drawPoll(2.7); },
});
