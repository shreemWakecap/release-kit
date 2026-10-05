/* Slide 14: the close. Three status lights drift into the pool, merge into one orange light that blooms, then one line shines. Then a quiet "Questions".
   Steps: 0 arrive (three lights + calm pool), 1 drift + merge + bloom, 2 the line shines, 3 questions with slow beams. */
Deck.add({
  id: 'close', section: 'next', title: 'One data bank. One answer. Lives first.', reality: [],
  steps: 3, ambient: { orb: 1.15, beam: .45, dust: 1.2 }, dur: [3600, 7200, 5200, 9000], minutes: .5,
  notes: 'Three lights, three answers, now one light: one data bank, one answer, lives first. Say it slowly, then press Next, say thank you and take questions.',
  html: `
    <div class="cl-beams" data-step="3" data-fx="fade"><div class="cl-beam b1"><i></i></div><div class="cl-beam b2"><i></i></div><div class="cl-beam b3"><i></i></div></div>
    <svg class="cl-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <h2 class="cl-line">
      <span class="cl-a"><span class="shine">One data bank. One answer.</span></span>
      <span class="cl-b"><span class="o glow-text">Lives first.</span></span>
    </h2>
    <div class="cl-bar l"></div><div class="cl-bar r"></div>
    <div class="cl-q" data-step="3" data-delay="600">Questions</div>`,
  css: `
    .s-close .cl-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    /* the line: a zero-width slit in the middle, opened to both sides by two bars of light (driven from JS so bars and text stay in sync) */
    .s-close .cl-line{position:absolute;left:50%;top:676px;transform:translateX(-50%);width:max-content;margin:0;display:flex;gap:.2em;white-space:nowrap;font:800 92px/1.1 var(--font);letter-spacing:-.04em;
      clip-path:inset(-140px 50% -140px 50%);transition:opacity 1.6s var(--ease)}
    .s-close .cl-a,.s-close .cl-b{display:block;padding-bottom:8px}
    .s-close.st3 .cl-line{opacity:.7}
    .s-close.st3 .shine{animation:none;background-position:130% 0}
    .s-close .cl-bar{position:absolute;left:958px;top:668px;width:4px;height:128px;border-radius:2px;opacity:0;pointer-events:none;background:linear-gradient(180deg,transparent,#FFE9CF 20%,#fff 50%,#FFE9CF 80%,transparent);box-shadow:0 0 26px 6px rgba(255,150,40,.85)}
    .s-close .cl-q{position:absolute;left:360px;top:884px;width:1200px;text-align:center;padding-left:.34em;font:300 50px/1 var(--font);letter-spacing:.5em;color:rgba(255,255,255,.88);text-shadow:0 0 40px rgba(255,131,0,.35)}
    .s-close .cl-q[data-step]{transition:opacity 1.6s var(--ease),transform 1.6s var(--ease),filter 1.6s var(--ease),letter-spacing 2.6s var(--ease)}
    .s-close .cl-q[data-step].in{letter-spacing:.34em}
    /* slow beams: soft wedges of light that hang from the top and sway very slowly */
    .s-close .cl-beams{position:absolute;inset:0;pointer-events:none}
    .s-close .cl-beams[data-step]{visibility:hidden;transition:opacity 2.6s var(--ease),visibility 0s 2.6s}
    .s-close .cl-beams[data-step].in{visibility:visible;transition:opacity 2.6s var(--ease),visibility 0s}
    .s-close .cl-beam{position:absolute;top:-40px;width:560px;height:1200px;margin-left:-280px;transform-origin:50% 0;pointer-events:none;filter:blur(22px);animation:clSwing 26s ease-in-out infinite alternate;animation-play-state:paused}
    .s-close.st3 .cl-beam{animation-play-state:running}
    .s-close .cl-beam i{position:absolute;inset:0;clip-path:polygon(45% 0,55% 0,100% 100%,0 100%);background:linear-gradient(180deg,rgba(255,176,90,.36) 0%,rgba(255,131,0,.16) 48%,rgba(255,131,0,0) 92%)}
    .s-close .b1{left:430px}
    .s-close .b2{left:960px;animation-duration:31s;animation-direction:alternate-reverse}
    .s-close .b3{left:1490px;animation-duration:23s}
    @keyframes clSwing{from{transform:rotate(-11deg)}to{transform:rotate(11deg)}}
    /* the pool */
    .s-close .L-halo{transition:opacity 2.4s var(--ease)}
    .s-close.st3 .L-halo{opacity:.78}
    .s-close .rip{fill:none;stroke:#FF8300;stroke-width:2;transform-box:fill-box;transform-origin:center;opacity:0;animation:clRip 5.4s cubic-bezier(.2,.8,.2,1) infinite}
    @keyframes clRip{0%{transform:scale(.7);opacity:.5}100%{transform:scale(3);opacity:0}}
    .s-close .arr{fill:none;stroke-width:3;transform-box:fill-box;transform-origin:center;opacity:0;animation:clArr 1.6s cubic-bezier(.2,.8,.2,1) forwards}
    @keyframes clArr{0%{transform:scale(.8);opacity:.95}100%{transform:scale(3.4);opacity:0}}
    .s-close .core{transform-box:fill-box;transform-origin:center;animation:clBreath 4.8s ease-in-out infinite}
    .s-close.st3 .core{animation-duration:8s}
    @keyframes clBreath{50%{transform:scale(1.06)}}
    .s-close .bl{transform-box:fill-box;transform-origin:center;opacity:0}
    .s-close .rip,.s-close .arr,.s-close .bl-s,.s-close .bl-p{vector-effect:non-scaling-stroke}
    .s-close.bloom .bl-h{animation:clBlH 3s cubic-bezier(.2,.8,.2,1) forwards}
    .s-close.bloom .bl-f{animation:clBlF 1.3s cubic-bezier(.2,.8,.2,1) forwards}
    .s-close.bloom .bl-s{animation:clBlS 2s cubic-bezier(.15,.7,.2,1) forwards}
    .s-close.wipe .bl-p{animation:clBlS 2.2s cubic-bezier(.15,.7,.2,1) forwards}
    @keyframes clBlH{0%{transform:scale(.3);opacity:0}14%{transform:scale(1.1);opacity:1}100%{transform:scale(.85);opacity:0}}
    @keyframes clBlF{0%{transform:scale(.5);opacity:0}12%{transform:scale(1.2);opacity:1}100%{transform:scale(1);opacity:0}}
    @keyframes clBlS{0%{transform:scale(.35);opacity:.9}100%{transform:scale(7.5);opacity:0}}
    .s-close.nt .cl-line,.s-close.nt .cl-q,.s-close.nt .L-halo{transition:none!important}
    body.calm .s-close .rip,body.calm .s-close .core,body.calm .s-close .cl-beam{animation:none}
    body.calm .s-close .cl-line,body.calm .s-close .L-halo{transition:none}`,
  init(ctx) {
    const svg = ctx.q('.cl-svg'), PX = 960, PY = 470, W = .62, BLOOM = .76, TRAVEL = 3.6, WIPE = 1.5;
    const mk = (t, a, p) => Fx.el(t, a, p || svg), clamp = Fx.clamp, lerp = Fx.lerp, E = Fx.ease;
    const sm = (a, b, x) => { const k = clamp((x - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); };
    Object.assign(ctx, { t: 0, tt: 0, time: 0, ap: [1, 1, 1], wp: 0, wt: 0 });
    /* gradients: the pool light (a light source, not a marble) and the bloom flash */
    const dfs = mk('defs'), rg = mk('radialGradient', { id: 'cl-liq', cx: .5, cy: .5, r: .5 }, dfs);
    [[0, '#FFF6EA'], [.34, '#FFC48A'], [.72, '#FF8300'], [1, '#E9590C']].forEach(([o, c]) => mk('stop', { offset: o, 'stop-color': c }, rg));
    const fg = mk('radialGradient', { id: 'cl-flash', cx: .5, cy: .5, r: .5 }, dfs);
    [[0, '#FFFFFF', 1], [.3, '#FFEBD2', .85], [.65, '#FFB366', .35], [1, '#FF8300', 0]].forEach(([o, c, a]) => mk('stop', { offset: o, 'stop-color': c, 'stop-opacity': a }, fg));
    const L = {}; ['halo', 'guide', 'rip', 'bl', 'arr', 'core', 'tail', 'chip'].forEach((k) => { L[k] = mk('g', { class: 'L-' + k }); });
    /* the pool: steady halo, idle ripples, bloom layers, the light itself */
    ctx.halo = mk('circle', { cx: PX, cy: PY, r: 430, fill: 'url(#g-core)', opacity: .12 }, L.halo);
    [0, -1.8, -3.6].forEach((dl) => mk('circle', { class: 'rip', cx: PX, cy: PY, r: 84, style: `animation-delay:${dl}s` }, L.rip));
    mk('circle', { class: 'bl bl-h', cx: PX, cy: PY, r: 520, fill: 'url(#g-core)' }, L.bl);
    mk('circle', { class: 'bl bl-f', cx: PX, cy: PY, r: 250, fill: 'url(#cl-flash)' }, L.bl);
    mk('circle', { class: 'bl bl-s', cx: PX, cy: PY, r: 70, fill: 'none', stroke: '#FFE2C2', 'stroke-width': 3 }, L.bl);
    mk('circle', { class: 'bl bl-p', cx: PX, cy: PY, r: 90, fill: 'none', stroke: '#FFB366', 'stroke-width': 2.5 }, L.bl);
    ctx.core = mk('circle', { class: 'core', cx: PX, cy: PY, r: 50, fill: 'url(#cl-liq)', filter: 'url(#fx-glow-soft)' }, L.core);
    /* three status chips, no words: Danger red, All Clear green, Check amber */
    const glyph = (g, kind, col) => {
      const s = { stroke: col, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
      if (kind === 'danger') { mk('path', Object.assign({ d: 'M0 -21 V3' }, s), g); mk('circle', { cx: 0, cy: 18, r: 4.8, fill: col }, g); }
      if (kind === 'clear') mk('path', Object.assign({ d: 'M-17 1 L-5 13 L18 -13' }, s), g);
      if (kind === 'check') { mk('path', Object.assign({ d: 'M-10 -9 C-10 -24 12 -24 12 -9 C12 1 0 2 0 9' }, s), g); mk('circle', { cx: 0, cy: 21, r: 4.8, fill: col }, g); }
    };
    const SPEC = [
      { col: '#FF4D4D', kind: 'danger', d: `M400 330 C 400 480, 650 545, ${PX} ${PY}`, s: 0 },
      { col: '#22C55E', kind: 'clear', d: `M960 190 C 900 290, 1020 375, ${PX} ${PY}`, s: .08 },
      { col: '#F5A524', kind: 'check', d: `M1520 330 C 1520 480, 1270 545, ${PX} ${PY}`, s: .16 },
    ];
    ctx.chips = SPEC.map((sp) => {
      const path = mk('path', { d: sp.d, fill: 'none', stroke: sp.col, 'stroke-width': 2, 'stroke-dasharray': '4 11', 'stroke-linecap': 'round', opacity: .3 }, L.guide);
      const g = mk('g', {}, L.chip);
      const base = mk('rect', { x: -88, y: -42, width: 176, height: 84, rx: 42, fill: '#0E0E10' }, g);
      const tint = mk('rect', { x: -88, y: -42, width: 176, height: 84, rx: 42, fill: sp.col, 'fill-opacity': .14 }, g);
      mk('rect', { x: -88, y: -42, width: 176, height: 84, rx: 42, fill: 'none', stroke: sp.col, 'stroke-width': 3, filter: 'url(#fx-glow-soft)' }, g);
      const gl = mk('g', {}, g); glyph(gl, sp.kind, sp.col);
      const tail = Array.from({ length: 9 }, (_, j) => mk('circle', { r: 7 * (1 - j / 10), fill: sp.col, opacity: 0 }, L.tail));
      const ring = mk('circle', { cx: PX, cy: PY, r: 60, fill: 'none', stroke: sp.col, 'stroke-width': 8, opacity: 0, filter: 'url(#fx-glow-soft)' }, L.core);
      return { col: sp.col, s: sp.s, path, len: path.getTotalLength(), g, base, tint, gl, tail, ring, flash: 0 };
    });
    /* each light arrives: a ring in its colour, a tint on the pool, a small burst */
    ctx.arrive = (c) => {
      c.flash = 1;
      if (ctx.calm) return;
      const r = mk('circle', { class: 'arr', cx: PX, cy: PY, r: 66, stroke: c.col }, L.arr);
      r.addEventListener('animationend', () => r.remove());
      Fx.burstEl(ctx.core, { n: 14, color: c.col, speed: 240, life: .7 });
    };
    /* all three are in: one orange light blooms */
    ctx.bloom = () => {
      if (ctx.calm) return;
      const r = ctx.root; r.classList.remove('bloom'); void r.offsetWidth; r.classList.add('bloom');
      Fx.burstEl(ctx.core, { n: 46, speed: 520, color: '#FFD9B0' });
    };
    ctx.apply = (was) => {
      const t = ctx.t, fwd = t > was + 1e-6; let ab = 0, bump = 0;
      ctx.chips.forEach((c, k) => {
        const u = clamp((t - c.s) / W, 0, 1), up = clamp((was - c.s) / W, 0, 1), pos = c.len * E.inOutSine(u), p = c.path.getPointAtLength(pos);
        const bob = ctx.calm ? 0 : Math.sin(ctx.time * 1.15 + k * 2.2) * 8 * (1 - clamp(u * 8, 0, 1));
        c.g.setAttribute('transform', `translate(${p.x.toFixed(1)} ${(p.y + bob).toFixed(1)}) scale(${lerp(1, .2, sm(.3, .95, u)).toFixed(3)})`);
        c.g.setAttribute('opacity', (ctx.ap[k] * (1 - sm(.8, 1, u))).toFixed(3));
        c.base.setAttribute('fill-opacity', (1 - .85 * sm(.25, .7, u)).toFixed(3));
        c.tint.setAttribute('fill-opacity', (.14 + .5 * sm(.25, .8, u)).toFixed(3));
        c.gl.setAttribute('opacity', (1 - sm(.25, .55, u)).toFixed(3));
        c.path.setAttribute('opacity', (.3 * ctx.ap[k] * (1 - sm(0, .5, u))).toFixed(3));
        c.tail.forEach((dot, j) => {
          const d = pos - (j + 1) * 22;
          if (d <= 0 || u <= 0 || u >= 1) { dot.setAttribute('opacity', 0); return; }
          const q = c.path.getPointAtLength(d);
          dot.setAttribute('cx', q.x.toFixed(1)); dot.setAttribute('cy', q.y.toFixed(1));
          dot.setAttribute('opacity', (.6 * (1 - j / 9) * (1 - sm(.8, 1, u))).toFixed(3));
        });
        ab += sm(.72, 1, u) / 3; bump = Math.max(bump, c.flash);
        if (fwd && up < .96 && u >= .96) ctx.arrive(c);
      });
      const r = 50 + 38 * ab + 9 * bump;
      ctx.core.setAttribute('r', r.toFixed(1)); ctx.core.setAttribute('opacity', (.7 + .3 * ab).toFixed(3));
      ctx.chips.forEach((c) => { c.ring.setAttribute('r', (r + 4).toFixed(1)); c.ring.setAttribute('opacity', (.85 * c.flash).toFixed(3)); });
      ctx.halo.setAttribute('opacity', (.12 + .42 * ab).toFixed(3));
      if (fwd && was < BLOOM && t >= BLOOM) ctx.bloom();
      if (!fwd && t < BLOOM && was >= BLOOM) ctx.root.classList.remove('bloom');
    };
    /* the line opens from the middle: text slit and the two light bars share one progress value */
    const line = ctx.q('.cl-line'), bars = [ctx.q('.cl-bar.l'), ctx.q('.cl-bar.r')];
    ctx.applyWipe = () => {
      const p = E.inOutCubic(ctx.wp), half = line.offsetWidth / 2, edge = (1 - p) * half - p * 140, x = p * (half + 140);
      line.style.clipPath = `inset(-140px ${edge.toFixed(1)}px -140px ${edge.toFixed(1)}px)`;
      const a = ctx.wp <= 0 || ctx.wp >= 1 ? 0 : Math.min(1, ctx.wp * 9, (1 - ctx.wp) * 4.5);
      bars[0].style.transform = `translateX(${(-x).toFixed(1)}px)`; bars[1].style.transform = `translateX(${x.toFixed(1)}px)`;
      bars[0].style.opacity = bars[1].style.opacity = a.toFixed(3);
    };
    ctx.tick = (dt) => {
      ctx.time += dt;
      ctx.ap = ctx.ap.map((_, k) => (ctx.calm ? 1 : clamp((ctx.time - .3 - k * .2) / .8, 0, 1)));
      ctx.chips.forEach((c) => { c.flash *= Math.exp(-dt * 3.2); if (c.flash < .01) c.flash = 0; });
      const was = ctx.t, d = ctx.tt - ctx.t;
      if (Math.abs(d) > 1e-4) ctx.t += Math.sign(d) * Math.min(Math.abs(d), dt / TRAVEL);
      ctx.apply(was);
      const wd = ctx.wt - ctx.wp, wasW = ctx.wp;
      if (Math.abs(wd) > 1e-4 && (wd < 0 || ctx.t >= .98)) {
        ctx.wp += Math.sign(wd) * Math.min(Math.abs(wd), dt / WIPE); ctx.applyWipe();
        if (wasW <= 0 && ctx.wp > 0 && !ctx.calm) { const r = ctx.root; r.classList.remove('wipe'); void r.offsetWidth; r.classList.add('wipe'); }
        if (wasW < .86 && ctx.wp >= .86 && !ctx.calm) Fx.burstEl(ctx.q('.cl-b'), { n: 30, speed: 400 });
      }
    };
    /* steps 2 and 3 are class switches; "instant" turns the transitions off for one frame */
    ctx.setCls = (st, instant) => {
      const r = ctx.root;
      if (instant) r.classList.add('nt');
      r.classList.toggle('st3', st >= 3);
      if (instant) { void r.offsetWidth; requestAnimationFrame(() => r.classList.remove('nt')); }
    };
    ctx.apply(0); ctx.applyWipe();
  },
  enter(ctx) {
    ctx.time = 0; ctx.ap = [0, 0, 0]; ctx.t = ctx.tt = 0; ctx.wp = ctx.wt = 0; ctx.chips.forEach((c) => { c.flash = 0; });
    ctx.root.classList.remove('bloom', 'wipe');
    ctx.setCls(0, true);
    ctx.apply(0); ctx.applyWipe();
    ctx.raf((dt) => ctx.tick(dt));
  },
  step(ctx, i, dir, instant) {
    const quick = instant || ctx.calm, r = ctx.root;
    ctx.tt = i >= 1 ? 1 : 0; ctx.wt = i >= 2 ? 1 : 0;
    ctx.setCls(i, quick);
    if (i < 2 || quick) r.classList.remove('wipe');
    if (quick) { ctx.t = ctx.tt; ctx.wp = ctx.wt; r.classList.remove('bloom'); ctx.chips.forEach((c) => { c.flash = 0; }); ctx.apply(ctx.t); ctx.applyWipe(); }
  },
  static(ctx) { ctx.t = ctx.tt = 1; ctx.wp = ctx.wt = 1; ctx.ap = [1, 1, 1]; ctx.root.classList.remove('bloom', 'wipe'); ctx.setCls(3, true); ctx.apply(1); ctx.applyWipe(); },
});
