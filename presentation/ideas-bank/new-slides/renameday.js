/* Slide: rename day. 24 Aug 2026 the front end got its new name and 260 files moved under one product folder.
   27 Aug 2026 the backend followed with 345 files. Each dot is one file: old folders (a tree with six branches) empty
   into one new folder (a tree with one branch), and the counter earns its number as the dots land.
   Facts: research C1 (2.2 ledger rows for 24 Aug and 27 Aug, 4.2 C and D, 5.1 commit sizes: FE 260 files, BE 345 files).
   The dots are a picture: how many files sat in which old folder is not in the research, so the old folders are drawn evenly rough. */
Deck.add({
  id: 'renameday', section: 'convert', title: 'Rename day: one name, 260 files', kicker: 'The conversion · Rename day', reality: ['code'],
  steps: 3, ambient: { orb: 1, beam: .6, dust: 1 }, dur: [3600, 6000, 6000, 6500], minutes: 1,
  notes: [
    'This is the day the app got its new name.',
    'On 24 Aug, the app was renamed Connected Environment.',
    'The same day, 260 files moved into one product folder.',
    'Three days later, on 27 Aug, the backend followed.',
    'It moved 345 files into a new, tidy layout.',
    'It was a move, not a rewrite.',
    'If asked: the front end commit changed 260 files: 220 moves, 6 deleted, 8 added and 26 edited. A smaller commit the same day renamed the app itself, 18 files. On 26 Aug a third commit finished the rename in the shared layer, styles and analytics, 181 files. Old links still work: a redirect sends the old Weather Station address to the new one. The backend commit added only 253 lines net, from 28,691 to 28,944. The backend names inside the code were not renamed. Only its folders moved. Each dot stands for one file, but how many sat in each old folder, and the split between Shared and Weather Station, is drawn as a picture.',
  ].join('\n'),
  html: `
    <h2 class="h2 rd-h" data-step="0">Rename <span class="o glow-text">day</span></h2>
    <p class="lead rd-lead" data-step="0" data-delay="200">One new name. One new home.</p>
    <div class="label rd-eb rd-eb-fe" data-step="0" data-delay="300">Front end</div>
    <div class="label rd-eb rd-eb-be" data-step="0" data-delay="400">Backend</div>
    <div class="rd-pan rd-fe glass flat sweepable" data-step="0" data-delay="300">
      <svg class="rd-svg" viewBox="0 0 830 620" width="830" height="620"></svg>
      <div class="rd-bar"><i class="rd-dots"><b></b><b></b><b></b></i><span class="rd-name"><span class="rd-t">Weather Station</span><u class="rd-caret"></u></span><span class="rd-chip">24 Aug</span></div>
      <div class="rd-cnt" data-step="2"><b class="rd-n">0</b><span>files</span></div>
    </div>
    <div class="rd-pan rd-be glass flat sweepable" data-step="0" data-delay="450">
      <svg class="rd-svg" viewBox="0 0 830 620" width="830" height="620"></svg>
      <div class="rd-bar"><i class="rd-dots"><b></b><b></b><b></b></i><span class="rd-name"><span class="rd-t">Backend</span></span><span class="rd-chip">27 Aug</span></div>
      <div class="rd-cnt" data-step="3"><b class="rd-n">0</b><span>files</span></div>
      <div class="rd-close" data-step="3" data-delay="2300">A move, <span class="o">not a rewrite.</span></div>
    </div>
    <div class="src rd-src" data-step="1">One dot is one file. The layout is a picture.</div>`,
  css: `
    .s-renameday .rd-h{position:absolute;left:96px;top:104px;width:900px;font-size:62px}
    .s-renameday .rd-lead{position:absolute;left:96px;top:196px;width:1200px;font-size:27px}
    .s-renameday .rd-eb{position:absolute;top:262px;color:var(--wc-orange-soft)}
    .s-renameday .rd-eb-fe{left:104px}.s-renameday .rd-eb-be{left:1002px}
    .s-renameday .rd-pan{position:absolute;top:292px;width:830px;height:620px;border-radius:26px}
    .s-renameday .rd-fe{left:96px}.s-renameday .rd-be{left:994px}
    .s-renameday .rd-be{border-color:rgba(255,255,255,.1)}
    .s-renameday .rd-svg{position:absolute;left:0;top:0;overflow:visible}
    .s-renameday .rd-bar{position:absolute;left:0;top:0;width:100%;height:64px;display:flex;align-items:center;justify-content:center;border-bottom:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.01));border-radius:26px 26px 0 0}
    .s-renameday .rd-dots{position:absolute;left:26px;top:26px;display:flex;gap:9px}
    .s-renameday .rd-dots b{display:block;width:13px;height:13px;border-radius:50%;background:rgba(255,255,255,.22)}
    .s-renameday .rd-name{display:flex;align-items:center;font:800 30px/1 var(--font);color:#fff;white-space:nowrap}
    .s-renameday .rd-t{padding:5px 12px;border-radius:8px;transition:background .3s,box-shadow .3s}
    .s-renameday .rd-name.sel .rd-t{background:rgba(255,131,0,.38);box-shadow:0 0 0 2px rgba(255,131,0,.6)}
    .s-renameday .rd-name.neu .rd-t{text-shadow:0 0 22px rgba(255,131,0,.6)}
    .s-renameday .rd-caret{display:none;width:3px;height:34px;margin-left:2px;background:#FF8300;box-shadow:0 0 12px #FF8300;animation:rdBlink .8s steps(2) infinite}
    .s-renameday .rd-name.typing .rd-caret{display:block}
    @keyframes rdBlink{50%{opacity:0}}
    .s-renameday .rd-chip{position:absolute;right:22px;top:15px;padding:8px 18px;border-radius:999px;border:2px solid #FFB366;background:rgba(255,131,0,.14);color:#FFD2A3;font:800 24px/1 var(--font);box-shadow:0 0 24px rgba(255,131,0,.3);opacity:0;transform:scale(.6);transition:opacity .4s var(--ease),transform .5s cubic-bezier(.2,1.5,.3,1)}
    .s-renameday .rd-chip.on{opacity:1;transform:none}
    .s-renameday .rd-be .rd-chip{border-color:#E8D9C6;background:rgba(241,228,212,.12);color:#F1E4D4;box-shadow:0 0 24px rgba(241,228,212,.22)}
    .s-renameday .rd-be{opacity:.5;transition:opacity .9s var(--ease),border-color .9s,box-shadow .9s}
    .s-renameday .rd-be.lit{opacity:1;border-color:rgba(241,228,212,.5);box-shadow:0 0 0 1px rgba(241,228,212,.18),0 0 70px rgba(241,228,212,.12),0 30px 80px rgba(0,0,0,.5)}
    .s-renameday .rd-fe.lit{border-color:rgba(255,131,0,.6);box-shadow:0 0 0 1px rgba(255,131,0,.25),0 0 70px rgba(255,131,0,.22),0 30px 80px rgba(0,0,0,.5)}
    .s-renameday .rd-cnt{position:absolute;left:36px;top:506px;display:flex;align-items:baseline;gap:16px;white-space:nowrap}
    .s-renameday .rd-n{font:900 104px/1 var(--font);letter-spacing:-.04em;font-variant-numeric:tabular-nums;color:#fff;text-shadow:0 0 34px rgba(255,131,0,.6),0 0 90px rgba(255,131,0,.28)}
    .s-renameday .rd-be .rd-n{text-shadow:0 0 34px rgba(241,228,212,.4),0 0 90px rgba(241,228,212,.16)}
    .s-renameday .rd-n.tick{display:inline-block;animation:rdTick .45s var(--ease)}
    @keyframes rdTick{0%{transform:scale(1.12)}100%{transform:none}}
    .s-renameday .rd-cnt span{font:700 36px/1 var(--font);color:#D9D9D4}
    .s-renameday .rd-close{position:absolute;left:372px;top:540px;width:420px;font:800 36px/1.15 var(--font);color:#fff;letter-spacing:-.01em}
    .s-renameday .rd-src{position:absolute;left:96px;top:940px;font-size:20px}
    .s-renameday .rd-old{transition:opacity .9s var(--ease)}
    .s-renameday .rd-old.gone{opacity:0}
    .s-renameday .rd-new{opacity:0;transition:opacity .7s var(--ease)}
    .s-renameday .rd-new.on{opacity:1}
    .s-renameday .rd-root{fill:#FF8300;filter:url(#fx-glow)}
    .s-renameday .rd-be .rd-root{fill:#F1E4D4}
    .s-renameday .rd-line{fill:none;stroke:rgba(255,255,255,.3);stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
    .s-renameday .rd-fold{fill:none;stroke:rgba(255,255,255,.4);stroke-width:2.2;stroke-linejoin:round}
    .s-renameday .rd-out{fill:none;stroke:#FF8300;stroke-width:3;stroke-linejoin:round;filter:url(#fx-glow-soft)}
    .s-renameday .rd-be .rd-out{stroke:#F1E4D4}
    .s-renameday .rd-conn{fill:none;stroke:#FF8300;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;filter:url(#fx-glow-u)}
    .s-renameday .rd-be .rd-conn{stroke:#F1E4D4}
    .s-renameday .rd-flab{font:800 26px/1 var(--font);fill:#fff}
    .s-renameday .rd-bloom{opacity:0}
    .s-renameday.rd-nt *,.s-renameday.rd-nt *::before,.s-renameday.rd-nt *::after{transition:none!important;animation:none!important}
    body.calm .s-renameday *,body.calm .s-renameday *::before,body.calm .s-renameday *::after{animation:none!important;transition-duration:.01s!important;transition-delay:0s!important}`,
  init(ctx) {
    const mk = Fx.el, clamp = Fx.ease && ((v, a, b) => Math.min(b, Math.max(a, v)));
    const rng = (seed) => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const FLIGHT = 1000, SPREAD = 1000, START = 380;
    const folder = (x, y, w, h, tw, th) => `M${x} ${y + h - 12} V${y - th + 10} Q${x} ${y - th} ${x + 10} ${y - th} H${x + tw - 4} L${x + tw + 14} ${y} H${x + w - 12} Q${x + w} ${y} ${x + w} ${y + 12} V${y + h - 12} Q${x + w} ${y + h} ${x + w - 12} ${y + h} H${x + 12} Q${x} ${y + h} ${x} ${y + h - 12} Z`;
    const mix = (a, b, t) => a + (b - a) * t;
    /* one panel: a tree of old folders full of dots, and the new folder(s) the dots fly into */
    const panel = (sel, cfg) => {
      const root = ctx.q(sel), svg = root.querySelector('.rd-svg'), R = rng(cfg.seed);
      const P = { root, cfg, dots: [], run: false, t0: 0, landed: 0, n: cfg.rows.reduce((a, b) => a + b, 0), numEl: root.querySelector('.rd-n') };
      /* the old tree: six branches */
      const old = mk('g', { class: 'rd-old' }, svg), RY = (i) => 150 + i * 58;
      mk('path', { class: 'rd-line', d: `M62 112 V${RY(5)}` }, old);
      cfg.rows.forEach((n, i) => {
        mk('path', { class: 'rd-line', d: `M62 ${RY(i)} H106` }, old);
        mk('path', { class: 'rd-fold', d: 'M0 5 Q0 0 5 0 H12 L16 5 H27 Q32 5 32 10 V21 Q32 26 27 26 H5 Q0 26 0 21 Z', transform: `translate(110 ${RY(i) - 13})` }, old);
      });
      /* the new folders */
      const neo = mk('g', { class: 'rd-new' }, svg); P.neo = neo;
      P.bloom = [];
      cfg.folders.forEach((f, fi) => {
        const rg = mk('radialGradient', { id: `rd-bl-${cfg.id}-${fi}`, cx: .5, cy: .5, r: .5 }, mk('defs', {}, neo));
        mk('stop', { offset: 0, 'stop-color': cfg.glow, 'stop-opacity': .38 }, rg); mk('stop', { offset: 1, 'stop-color': cfg.glow, 'stop-opacity': 0 }, rg);
        P.bloom.push(mk('rect', { class: 'rd-bloom', x: f.x - 40, y: f.y - 30, width: f.w + 80, height: f.h + 60, fill: `url(#rd-bl-${cfg.id}-${fi})` }, neo));
        f.out = mk('path', { class: 'rd-out', d: folder(f.x, f.y, f.w, f.h, f.tw, 36) }, neo);
        mk('text', { class: 'rd-flab', x: f.x + 16, y: f.y - 10, text: f.label }, neo);
      });
      cfg.conns.forEach((d) => mk('path', { class: 'rd-conn', d }, neo));
      mk('circle', { class: 'rd-root', cx: 62, cy: 104, r: 8 }, svg);
      /* the dots: sources in the old folders, targets in a neat grid */
      const src = [], tgt = [];
      cfg.rows.forEach((n, i) => {
        const L = cfg.lines, per = Math.ceil(n / L);
        for (let j = 0; j < n; j++) { const l = Math.floor(j / per), c = j % per; src.push({ x: 158 + c * cfg.ps, y: RY(i) - (L - 1) * cfg.ps / 2 + l * cfg.ps }); }
      });
      cfg.folders.forEach((f) => { for (let r = 0; r < f.rows; r++) for (let c = 0; c < f.cols; c++) tgt.push({ x: f.gx + c * cfg.pt, y: f.gy + r * cfg.pt }); });
      const dg = mk('g', {}, svg), S = cfg.size;
      src.forEach((s, k) => {
        const t = tgt[k], d = { sx: s.x, sy: s.y, tx: t.x, ty: t.y, p: 0, delay: START + (k / src.length) * SPREAD + R() * 140, bend: (R() - .5) * 90 };
        const dx = d.tx - d.sx, dy = d.ty - d.sy, len = Math.hypot(dx, dy) || 1;
        d.cx = (d.sx + d.tx) / 2 - dy / len * d.bend; d.cy = (d.sy + d.ty) / 2 + dx / len * d.bend;
        d.el = mk('rect', { width: S, height: S, rx: 2.5, fill: 'rgb(170,170,166)', 'fill-opacity': .55 }, dg); P.dots.push(d);
      });
      const fin = cfg.color;
      const place = (d) => {
        const p = d.p, e = Fx.ease.inOutCubic(p), u = 1 - e, x = u * u * d.sx + 2 * u * e * d.cx + e * e * d.tx, y = u * u * d.sy + 2 * u * e * d.cy + e * e * d.ty;
        const w = S + 3.5 * Math.sin(Math.PI * p), fl = Math.sin(Math.PI * Math.min(1, p * 1.15)) * .45;
        d.el.setAttribute('x', (x - w / 2 + S / 2).toFixed(1)); d.el.setAttribute('y', (y - w / 2 + S / 2).toFixed(1)); d.el.setAttribute('width', w.toFixed(1)); d.el.setAttribute('height', w.toFixed(1));
        const r = mix(170, fin[0], p) + (255 - mix(170, fin[0], p)) * fl, g = mix(170, fin[1], p) + (255 - mix(170, fin[1], p)) * fl, b = mix(166, fin[2], p) + (255 - mix(166, fin[2], p)) * fl;
        d.el.setAttribute('fill', `rgb(${r | 0},${g | 0},${b | 0})`); d.el.setAttribute('fill-opacity', mix(.55, 1, Math.min(1, p * 2)).toFixed(2));
      };
      P.setCount = (v, anim) => { if (v === P.landed && P.numEl.textContent !== '0' + (v ? '' : '')) { /* unchanged */ } P.landed = v; P.numEl.textContent = v; P.bloom.forEach((b) => { b.style.opacity = (v / P.n).toFixed(2); }); };
      P.setAll = (p) => { P.run = false; P.dots.forEach((d) => { d.p = p; place(d); }); P.setCount(p >= 1 ? P.n : 0); };
      P.go = (now) => { P.t0 = now; P.run = true; };
      P.tick = (now) => {
        if (!P.run) return; const t = now - P.t0; let landed = 0, active = false;
        P.dots.forEach((d) => { const p = clamp((t - d.delay) / FLIGHT, 0, 1); if (p !== d.p) { d.p = p; place(d); } if (p >= 1) landed++; else active = true; });
        if (landed !== P.landed) { const bigger = landed > P.landed; P.setCount(landed); if (bigger && landed % 9 === 0) { P.numEl.classList.remove('tick'); void P.numEl.offsetWidth; P.numEl.classList.add('tick'); } }
        if (!active) { P.run = false; if (P.done) P.done(); }
      };
      P.setAll(0); return P;
    };
    /* FE: 260 files = 20 x 13. Six old branches: 34 + 52 + 28 + 61 + 47 + 38 */
    ctx.fe = panel('.rd-fe', {
      id: 'fe', seed: 11, rows: [34, 52, 28, 61, 47, 38], lines: 2, ps: 15, pt: 16, size: 10, color: [255, 131, 0], glow: '#FF8300',
      folders: [{ x: 318, y: 152, w: 400, h: 296, tw: 220, label: 'Weather Station', cols: 20, rows: 13, gx: 358, gy: 196 }],
      conns: ['M62 112 V120 Q62 134 76 134 H318'],
    });
    /* BE: 345 files = 11 x 15 + 12 x 15. Six old branches: 58 + 41 + 72 + 49 + 64 + 61 */
    ctx.be = panel('.rd-be', {
      id: 'be', seed: 29, rows: [58, 41, 72, 49, 64, 61], lines: 3, ps: 15, pt: 15, size: 10, color: [241, 228, 212], glow: '#F1E4D4',
      folders: [{ x: 300, y: 152, w: 220, h: 296, tw: 120, label: 'Shared', cols: 11, rows: 15, gx: 327, gy: 188 }, { x: 548, y: 152, w: 240, h: 296, tw: 220, label: 'Weather Station', cols: 12, rows: 15, gx: 578, gy: 188 }],
      conns: ['M62 112 V120 Q62 134 76 134 H300', 'M458 134 H548'],
    });
    /* ---- the name on the title bar: select, delete, type */
    ctx.nm = ctx.q('.rd-fe .rd-name'); ctx.nmT = ctx.nm.querySelector('.rd-t'); ctx.chipFE = ctx.q('.rd-fe .rd-chip'); ctx.chipBE = ctx.q('.rd-be .rd-chip');
    ctx.OLD = 'Weather Station'; ctx.NEW = 'Connected Environment'; ctx.tm = [];
    const at = (ms, fn) => ctx.tm.push(ctx.after(ms, fn));
    ctx.snap = (i) => {
      const R = ctx.root; R.classList.add('rd-nt'); ctx.tm.forEach(clearTimeout); ctx.tm = [];
      ctx.nm.classList.remove('sel', 'typing'); ctx.nm.classList.toggle('neu', i >= 1); ctx.nmT.textContent = i >= 1 ? ctx.NEW : ctx.OLD; ctx.nmT._typ && (ctx.nmT._typ.stop = true);
      ctx.chipFE.classList.toggle('on', i >= 1); ctx.chipBE.classList.toggle('on', i >= 3);
      const f2 = i >= 2, f3 = i >= 3;
      ctx.fe.setAll(f2 ? 1 : 0); ctx.be.setAll(f3 ? 1 : 0);
      [[ctx.fe, f2], [ctx.be, f3]].forEach(([P, on]) => {
        P.neo.classList.toggle('on', on); P.neo.querySelectorAll('.rd-out').forEach((o) => { o.style.strokeDasharray = ''; o.style.strokeDashoffset = ''; o.style.transition = ''; });
        P.root.querySelector('.rd-old').classList.toggle('gone', on);
      });
      ctx.fe.root.classList.toggle('lit', i >= 1); ctx.be.root.classList.toggle('lit', i >= 3);
      void R.offsetWidth; R.classList.remove('rd-nt');
    };
    /* animated steps */
    ctx.rename = () => {
      const el = ctx.nmT; ctx.fe.root.classList.add('lit');
      ctx.nm.classList.add('sel'); at(650, () => { ctx.nm.classList.remove('sel'); el.textContent = ''; ctx.nm.classList.add('typing'); });
      at(900, () => { Fx.type(el, ctx.NEW, 26).then(() => { ctx.nm.classList.add('neu'); }); });
      at(900 + Math.ceil(ctx.NEW.length / 26 * 1000) + 150, () => { ctx.nm.classList.remove('typing'); ctx.chipFE.classList.add('on'); Fx.sweep(ctx.fe.root); Fx.burstEl(ctx.nm, { n: 30, color: '#FFB366', speed: 340 }); Fx.burstEl(ctx.chipFE, { n: 16, color: '#FF8300', speed: 260 }); });
    };
    ctx.move = (P, chip) => {
      P.root.classList.add('lit'); if (chip) at(250, () => chip.classList.add('on'));
      P.root.querySelector('.rd-old').classList.add('gone'); P.neo.classList.add('on');
      P.neo.querySelectorAll('.rd-out').forEach((o) => Fx.draw(o, 900, 150));
      P.go(performance.now());
      P.done = () => { P.done = null; const f = P.cfg.folders[0]; Fx.sweep(P.root); const o = P.neo.querySelector('.rd-out').getBoundingClientRect(); Fx.burst(o.left + o.width / 2, o.top + o.height / 2, { n: 44, color: P.cfg.glow, speed: 420 }); P.numEl.classList.remove('tick'); void P.numEl.offsetWidth; P.numEl.classList.add('tick'); };
    };
    ctx.snap(0);
  },
  enter(ctx) { ctx.snap(0); ctx.raf(() => { const n = performance.now(); ctx.fe.tick(n); ctx.be.tick(n); }); },
  step(ctx, i, dir, instant) {
    if (i === 0 || instant || dir < 0 || ctx.calm) { ctx.snap(i); return; }
    if (i === 1) ctx.rename();
    if (i === 2) ctx.move(ctx.fe, null);
    if (i === 3) ctx.move(ctx.be, ctx.chipBE);
  },
  static(ctx) { ctx.snap(3); },
});
