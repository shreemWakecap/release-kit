/* Connected Environment story: presentation engine (no dependencies, works from file://).
   Slides register with Deck.add({...}). See story/README-slides.md for the module contract. */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const params = new URLSearchParams(location.search);
  const PRINT = params.has('print');
  const PRESENTER = params.has('presenter');
  const ease = {
    linear: (t) => t, inCubic: (t) => t * t * t, outCubic: (t) => 1 - Math.pow(1 - t, 3),
    inOutCubic: (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    outExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)), outQuart: (t) => 1 - Math.pow(1 - t, 4),
    outBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  };
  const REALITY = { live: 'Live', code: 'In code', test: 'In test', plan: 'Planned', vision: 'Vision', stat: 'Published number' };

  let calm = PRINT || params.has('calm') || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const defs = [];
  let sectionList = [], planList = [];
  let cur = -1, curStep = 0, started = false, shortMode = false;
  let oneClick = !params.has('steps'), autoRun = null; /* one press plays every step of a slide; ?steps or key J gives step by step */
  const errors = [];
  const loops = new Set();
  let lastT = performance.now();

  function fail(where, e) { errors.push(where + ': ' + (e && e.stack ? e.stack.split('\n')[0] : e)); console.error('[deck]', where, e); }
  function safe(where, fn) { try { return fn(); } catch (e) { fail(where, e); } }
  function frame(now) {
    const dt = Math.min(.05, (now - lastT) / 1000); lastT = now;
    for (const f of Array.from(loops)) { try { f(dt, now); } catch (e) { fail('loop', e); loops.delete(f); } }
    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------------ Fx */
  const Fx = {
    ease, clamp, lerp, NS,
    fmt(v, dec = 0) { return Number(v).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }); },
    /* count a number up inside el; returns a promise */
    counter(el, to, o = {}) {
      const from = o.from == null ? 0 : o.from, dur = o.dur == null ? 1800 : o.dur, dec = o.dec || 0;
      const text = (v) => (o.prefix || '') + (o.fmt ? o.fmt(v) : Fx.fmt(v, dec)) + (o.suffix || '');
      if (el._cnt) el._cnt.stop = true;
      if (calm || dur <= 0) { el.textContent = text(to); return Promise.resolve(); }
      const h = { stop: false }; el._cnt = h;
      return new Promise((res) => {
        const t0 = performance.now() + (o.delay || 0);
        (function f(now) {
          if (h.stop) return res();
          const p = clamp((now - t0) / dur, 0, 1);
          el.textContent = text(from + (to - from) * (o.ease || ease.outExpo)(p));
          if (p < 1) requestAnimationFrame(f); else res();
        })(performance.now());
      });
    },
    type(el, str, cps = 40) {
      if (el._typ) el._typ.stop = true;
      if (calm) { el.textContent = str; return Promise.resolve(); }
      const h = { stop: false }; el._typ = h; el.textContent = '';
      return new Promise((res) => {
        const t0 = performance.now();
        (function f(now) {
          if (h.stop) return res();
          const n = Math.min(str.length, Math.floor((now - t0) / 1000 * cps));
          el.textContent = str.slice(0, n);
          if (n < str.length) requestAnimationFrame(f); else res();
        })(t0);
      });
    },
    /* stroke-draw an SVG path/line/circle */
    draw(el, ms = 1200, delay = 0) {
      let len = 600; try { len = el.getTotalLength ? el.getTotalLength() : 600; } catch (e) { /* ignore */ }
      el.style.strokeDasharray = len; el.style.transition = 'none';
      if (calm) { el.style.strokeDashoffset = 0; return; }
      el.style.strokeDashoffset = len;
      void el.getBoundingClientRect();
      el.style.transition = `stroke-dashoffset ${ms}ms cubic-bezier(.2,.8,.2,1) ${delay}ms`;
      el.style.strokeDashoffset = 0;
    },
    sweep(el) { el.classList.remove('sweep'); void el.offsetWidth; if (!calm) el.classList.add('sweep'); },
    stagger(list, fn, step = 90, start = 0) { Array.from(list).forEach((n, i) => setTimeout(() => fn(n, i), start + i * step)); },
    el(tag, attrs, parent) {
      const svg = ['svg', 'g', 'path', 'circle', 'rect', 'line', 'text', 'defs', 'linearGradient', 'radialGradient', 'stop', 'polygon', 'polyline', 'ellipse', 'filter', 'feGaussianBlur', 'feMerge', 'feMergeNode', 'clipPath', 'mask', 'tspan', 'marker', 'use'].includes(tag);
      const n = svg ? document.createElementNS(NS, tag) : document.createElement(tag);
      for (const k in (attrs || {})) { if (k === 'text') n.textContent = attrs[k]; else if (k === 'html') n.innerHTML = attrs[k]; else n.setAttribute(k, attrs[k]); }
      if (parent) parent.appendChild(n);
      return n;
    },
    /* particle burst on the top canvas (viewport coordinates) */
    burst(x, y, o = {}) {
      if (calm) return;
      const n = o.n || 26, sp = o.speed || 380, col = o.color || '#FF8300';
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, v = sp * (.25 + Math.random() * .85);
        top.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0, max: (o.life || .9) * (.6 + Math.random() * .6), s: 1.5 + Math.random() * 3, col });
      }
    },
    burstEl(el, o) { const r = el.getBoundingClientRect(); Fx.burst(r.left + r.width / 2, r.top + r.height / 2, o); },
    /* pointer tilt with glare on an inner element (never on a [data-step] element) */
    tilt(el, max = 7) {
      if (calm) return;
      el.style.transformStyle = 'preserve-3d';
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    },
  };

  /* particles + laser trail canvas */
  const top = { cv: null, g: null, parts: [], trail: [] };
  function topDraw(dt) {
    const g = top.g; if (!g) return;
    const W = top.cv.width, H = top.cv.height, d = top.dpr;
    g.clearRect(0, 0, W, H);
    g.globalCompositeOperation = 'lighter';
    for (let i = top.parts.length - 1; i >= 0; i--) {
      const p = top.parts[i]; p.life += dt;
      if (p.life >= p.max) { top.parts.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= .96; p.vy = p.vy * .96 + 90 * dt;
      const k = 1 - p.life / p.max;
      g.fillStyle = p.col; g.globalAlpha = k;
      g.beginPath(); g.arc(p.x * d, p.y * d, p.s * k * d, 0, 6.283); g.fill();
    }
    const now = performance.now();
    while (top.trail.length && now - top.trail[0].t > 450) top.trail.shift();
    for (let i = 0; i < top.trail.length; i++) {
      const p = top.trail[i], k = 1 - (now - p.t) / 450;
      g.globalAlpha = k * .55; g.fillStyle = '#FF7A1A';
      g.beginPath(); g.arc(p.x * d, p.y * d, 9 * k * d, 0, 6.283); g.fill();
    }
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
  }

  /* ------------------------------------------------------------------ ambient background */
  const amb = { cv: null, g: null, W: 0, H: 0, dpr: 1, t: 0, mx: .5, my: .4, cfg: { orb: 1, beam: 1, dust: 1 }, tgt: { orb: 1, beam: 1, dust: 1 }, orbs: [], dust: [] };
  function ambInit() {
    amb.orbs = [
      { x: .82, y: .12, r: .55, k: 1.0, a: 0, v: .006, c: '255,131,0' }, { x: .12, y: .85, r: .5, k: .65, a: 2, v: .005, c: '233,89,12' },
      { x: .5, y: .5, r: .42, k: .35, a: 4, v: .004, c: '255,160,60' }, { x: .95, y: .9, r: .38, k: .5, a: 1, v: .005, c: '255,90,20' },
    ];
    amb.dust = Array.from({ length: 110 }, () => ({ x: Math.random(), y: Math.random(), z: .25 + Math.random() * .75, s: .0006 + Math.random() * .0018, tw: Math.random() * 6.28 }));
  }
  function ambResize() {
    const cv = amb.cv; amb.dpr = Math.min(1.5, window.devicePixelRatio || 1);
    amb.W = cv.width = Math.round(innerWidth * amb.dpr); amb.H = cv.height = Math.round(innerHeight * amb.dpr);
    top.dpr = Math.min(2, window.devicePixelRatio || 1); top.cv.width = Math.round(innerWidth * top.dpr); top.cv.height = Math.round(innerHeight * top.dpr);
    ambDraw(0);
  }
  function ambDraw(dt) {
    const g = amb.g, W = amb.W, H = amb.H; if (!g) return;
    amb.t += dt;
    for (const k in amb.cfg) amb.cfg[k] = lerp(amb.cfg[k], amb.tgt[k], Math.min(1, dt * 2.4 + (dt === 0 ? 1 : 0)));
    g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
    g.fillStyle = '#060607'; g.fillRect(0, 0, W, H);
    const px = (amb.mx - .5) * .03, py = (amb.my - .5) * .03;
    g.globalCompositeOperation = 'lighter';
    for (const o of amb.orbs) {
      if (!calm) { o.a += dt * .25; }
      const x = (o.x + Math.cos(o.a) * .05 + px * o.k * 2) * W, y = (o.y + Math.sin(o.a * 1.3) * .05 + py * o.k * 2) * H, r = o.r * Math.max(W, H);
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, `rgba(${o.c},${.2 * amb.cfg.orb * o.k})`); gr.addColorStop(.45, `rgba(${o.c},${.05 * amb.cfg.orb * o.k})`); gr.addColorStop(1, `rgba(${o.c},0)`);
      g.fillStyle = gr; g.fillRect(0, 0, W, H);
    }
    if (amb.cfg.beam > .02) {
      for (let i = 0; i < 3; i++) {
        const ang = (-0.35 + i * .35) + Math.sin(amb.t * .25 + i * 2) * .1, x0 = (.25 + i * .25) * W;
        g.save(); g.translate(x0, -H * .1); g.rotate(ang);
        const gr = g.createLinearGradient(0, 0, 0, H * 1.2); gr.addColorStop(0, `rgba(255,150,50,${.1 * amb.cfg.beam})`); gr.addColorStop(1, 'rgba(255,150,50,0)');
        g.fillStyle = gr; g.beginPath(); g.moveTo(-W * .015, 0); g.lineTo(W * .015, 0); g.lineTo(W * .13, H * 1.2); g.lineTo(-W * .13, H * 1.2); g.closePath(); g.fill(); g.restore();
      }
    }
    for (const d of amb.dust) {
      if (!calm) { d.y -= d.s * dt * 60 * d.z; if (d.y < -.02) { d.y = 1.02; d.x = Math.random(); } d.tw += dt * 2; }
      const tw = .5 + .5 * Math.sin(d.tw), x = (d.x + px * d.z * 3) * W, y = d.y * H;
      g.fillStyle = `rgba(255,${170 + (d.z * 60) | 0},${90 + (d.z * 70) | 0},${(.12 + .5 * d.z * tw) * amb.cfg.dust})`;
      g.beginPath(); g.arc(x, y, (.7 + d.z * 1.7) * amb.dpr, 0, 6.283); g.fill();
    }
    g.globalCompositeOperation = 'source-over';
    const vg = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * .35, W / 2, H / 2, Math.max(W, H) * .78);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.72)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
  }

  /* ------------------------------------------------------------------ slide context */
  function makeCtx(d) {
    const ctx = {
      def: d, root: null, step: 0, active: false, fx: Fx, ease, _raf: new Set(), _timers: new Set(), _flows: [],
      q: (s) => ctx.root.querySelector(s), qa: (s) => Array.from(ctx.root.querySelectorAll(s)),
      get calm() { return calm; }, print: PRINT,
      raf(fn) { const w = (dt, t) => fn(dt, t); ctx._raf.add(w); loops.add(w); return () => { ctx._raf.delete(w); loops.delete(w); }; },
      after(ms, fn) { const id = setTimeout(() => { ctx._timers.delete(id); safe(d.id + '.after', fn); }, ms); ctx._timers.add(id); return id; },
      stagger(list, fn, step = 90, start = 0) { Array.from(list).forEach((n, i) => ctx.after(start + i * step, () => fn(n, i))); },
      /* glowing packets travelling along an SVG path. Auto pauses when the slide is inactive. */
      flow(path, o) {
        o = Object.assign({ color: '#FF8300', speed: 300, count: 3, r: 7, tail: 7, tailGap: 16, loop: true, offset: 0 }, o || {});
        const len = path.getTotalLength(), g = Fx.el('g', { class: 'fx-flow' });
        path.parentNode.insertBefore(g, path.nextSibling);
        const pk = [];
        for (let i = 0; i < o.count; i++) {
          const dots = [];
          for (let j = 0; j <= o.tail; j++) {
            const k = 1 - j / (o.tail + 1);
            dots.push(Fx.el('circle', { r: Math.max(1.5, o.r * (j === 0 ? 1 : k * .8)), fill: o.color, opacity: j === 0 ? 1 : .55 * k, filter: j === 0 ? 'url(#fx-glow)' : '' }, g));
          }
          pk.push({ pos: ((i / o.count) * len + o.offset) % len, dots });
        }
        const place = () => pk.forEach((p) => p.dots.forEach((c, j) => {
          const at = p.pos - j * o.tailGap, pt = path.getPointAtLength(((at % len) + len) % len);
          c.setAttribute('cx', pt.x); c.setAttribute('cy', pt.y); c.style.display = (!o.loop && at < 0) ? 'none' : '';
        }));
        const h = {
          el: g, running: false, want: false, _rm: null, o,
          start() { h.want = true; if (calm) { place(); return h; } if (h.running || !ctx.active) return h; h.running = true; h._rm = ctx.raf((dt) => { pk.forEach((p) => { p.pos += o.speed * dt; if (p.pos > len + o.tail * o.tailGap) p.pos = o.loop ? p.pos - len : len + 9999; }); place(); }); return h; },
          stop() { h.want = false; if (h._rm) h._rm(); h.running = false; return h; },
          show(v) { g.style.display = v ? '' : 'none'; return h; },
          speed(v) { o.speed = v; return h; },
          freeze() { h.stop(); place(); return h; },
          color(c) { g.querySelectorAll('circle').forEach((n) => n.setAttribute('fill', c)); return h; },
        };
        place(); ctx._flows.push(h);
        return h;
      },
    };
    return ctx;
  }

  /* ------------------------------------------------------------------ deck core */
  const timers = {};
  function build() {
    const stage = $('#stage');
    defs.forEach((d, i) => {
      d.index = i; d.steps = d.steps || 0;
      const el = document.createElement('section');
      el.className = 'slide s-' + d.id; el.dataset.id = d.id; el.dataset.section = d.section || ''; el.setAttribute('aria-label', d.title || d.id);
      let pre = '';
      if (d.kicker) pre += `<div class="slide-kicker"><i></i><span>${d.kicker}</span></div>`;
      if (d.isNew) pre += '<div class="slide-new">Just built</div>';
      if (d.placeholder) el.classList.add('ph');
      if (d.reality) { const rs = [].concat(d.reality); pre += `<div class="slide-rb">${rs.map((r) => `<span class="rb rb-${r}">${REALITY[r] || r}</span>`).join(' ')}</div>`; }
      el.innerHTML = pre + (d.html || '');
      stage.appendChild(el); d.el = el;
      if (d.css) { const st = document.createElement('style'); st.dataset.slide = d.id; st.textContent = d.css; document.head.appendChild(st); }
      d.ctx = makeCtx(d); d.ctx.root = el;
    });
    defs.forEach((d) => { if (d.init && !d.lazy) safe(d.id + '.init', () => d.init(d.ctx)); d._inited = !d.lazy; });
  }
  function ensureInit(d) { if (!d._inited) { d._inited = true; if (d.init) safe(d.id + '.init', () => d.init(d.ctx)); } }

  function applyStep(d, step, dir, instant) {
    const el = d.el, ctx = d.ctx; ctx.step = step; el.dataset.cur = step;
    if (instant) el.classList.add('no-trans');
    el.querySelectorAll('[data-step]').forEach((n) => {
      const s = +n.dataset.step, o = n.dataset.stepOut !== undefined ? +n.dataset.stepOut : Infinity;
      n.style.transitionDelay = (!instant && n.dataset.delay) ? n.dataset.delay + 'ms' : '';
      n.classList.toggle('in', step >= s && step < o);
    });
    if (d.step) safe(d.id + '.step', () => d.step(ctx, step, dir, !!instant));
    if (instant) { void el.offsetWidth; requestAnimationFrame(() => el.classList.remove('no-trans')); }
  }

  function enterSlide(d, dir, step, opts) {
    const el = d.el, ctx = d.ctx; ensureInit(d);
    clearTimeout(timers[d.id]); el.classList.remove('leaving', 'leave-fwd', 'leave-back', 'enter-fwd', 'enter-back');
    void el.offsetWidth;
    el.classList.add('active'); ctx.active = true;
    if (!calm && !opts.instant) el.classList.add(dir > 0 ? 'enter-fwd' : 'enter-back');
    amb.tgt = Object.assign({ orb: 1, beam: 1, dust: 1 }, d.ambient || {});
    safe(d.id + '.enter', () => d.enter && d.enter(ctx, dir));
    applyStep(d, step, dir, !!opts.instant || step > 0);
    ctx._flows.forEach((f) => { if (f.want) f.start(); });
    if (!calm && !opts.instant) { const sw = $('#sweep'); sw.classList.remove('go'); void sw.offsetWidth; sw.classList.add('go'); }
  }
  function leaveSlide(d, dir) {
    const el = d.el, ctx = d.ctx;
    safe(d.id + '.leave', () => d.leave && d.leave(ctx));
    ctx.active = false;
    ctx._raf.forEach((w) => loops.delete(w)); ctx._raf.clear();
    ctx._timers.forEach((id) => clearTimeout(id)); ctx._timers.clear();
    ctx._flows.forEach((f) => { f.running = false; f._rm = null; });
    el.classList.remove('active', 'enter-fwd', 'enter-back');
    if (calm) return;
    el.classList.add('leaving', dir > 0 ? 'leave-fwd' : 'leave-back');
    timers[d.id] = setTimeout(() => el.classList.remove('leaving', 'leave-fwd', 'leave-back'), 800);
  }

  function go(i, step, dir, opts) {
    opts = opts || {}; if (!opts.auto) cancelAuto();
    i = clamp(i, 0, defs.length - 1); const d = defs[i]; step = clamp(step || 0, 0, d.steps || 0);
    if (i === cur) {
      if (step !== curStep) { const dr = step > curStep ? 1 : -1; curStep = step; applyStep(d, step, dr, opts.instant); hud(); sync(); }
      return;
    }
    const prev = cur >= 0 ? defs[cur] : null; dir = dir || (i > cur ? 1 : -1);
    if (prev) leaveSlide(prev, dir);
    cur = i; curStep = step; enterSlide(d, dir, step, opts);
    hud(); sync();
  }
  const okIdx = (i) => !shortMode || defs[i].short;
  const findNext = () => { for (let i = cur + 1; i < defs.length; i++) if (okIdx(i)) return i; return -1; };
  const findPrev = () => { for (let i = cur - 1; i >= 0; i--) if (okIdx(i)) return i; return -1; };
  function cancelAuto() { if (autoRun) { autoRun.ids.forEach(clearTimeout); autoRun = null; } }
  const autoGap = (d, k) => clamp(.5 * (([].concat(d.dur || 4000))[k] || 4000), 1300, 3600);
  function runAuto(i) {
    cancelAuto(); const d = defs[i]; if (!d.steps) return;
    const run = autoRun = { ids: [], end: performance.now() }; let t = 0;
    go(i, 1, 1, { auto: true });
    for (let k = 1; k < d.steps; k++) {
      t += autoGap(d, k);
      run.ids.push(setTimeout(() => { if (autoRun !== run || cur !== i) return; go(i, k + 1, 1, { auto: true }); if (k + 1 >= d.steps) autoRun = null; }, t));
    }
    run.end = performance.now() + t; if (d.steps === 1) autoRun = null;
  }
  const next = () => {
    const d = defs[cur];
    if (oneClick) {
      if (autoRun) { cancelAuto(); go(cur, d.steps, 1, { instant: true }); return; }
      if (curStep === 0 && d.steps > 0) { runAuto(cur); return; }
      if (curStep < d.steps) { go(cur, d.steps, 1, { instant: true }); return; }
      const n = findNext(); if (n >= 0) go(n, 0, 1); return;
    }
    if (curStep < d.steps) go(cur, curStep + 1, 1); else { const n = findNext(); if (n >= 0) go(n, 0, 1); }
  };
  const prev = () => {
    if (oneClick) {
      if (autoRun || curStep > 0) { cancelAuto(); go(cur, 0, -1, { instant: true }); return; }
      const p = findPrev(); if (p >= 0) go(p, defs[p].steps, -1, { instant: true }); return;
    }
    if (curStep > 0) go(cur, curStep - 1, -1); else { const p = findPrev(); if (p >= 0) go(p, defs[p].steps, -1, { instant: true }); }
  };
  const nextSlide = () => { const n = findNext(); if (n >= 0) go(n, 0, 1); };
  const prevSlide = () => { const p = findPrev(); if (p >= 0) go(p, 0, -1); };
  function toggleShort() {
    shortMode = !shortMode; document.body.classList.toggle('short-mode', shortMode);
    const b = $('#b-short'); if (b) b.classList.toggle('on', shortMode);
    $$('.ovcard').forEach((c) => c.classList.toggle('dimmed', shortMode && !defs[+c.dataset.i].short));
    if (shortMode && !defs[cur].short) { const n = findNext(); if (n >= 0) go(n, 0, 1); }
    hud();
  }

  /* ------------------------------------------------------------------ HUD, overlays */
  let presenterWin = null, timerOn = false, t0 = 0, autoplay = null;
  function sync() {
    const d = defs[cur];
    try { history.replaceState(null, '', '#/' + (cur + 1) + (curStep ? '/' + curStep : '')); } catch (e) { /* file:// quirks */ }
    if (presenterWin && !presenterWin.closed) presenterWin.postMessage({ ce: 'state', i: cur, step: curStep, id: d.id }, '*');
  }
  function hud() {
    const d = defs[cur];
    $('#progress i').style.width = ((cur + (d.steps ? curStep / (d.steps + 1) : 0) + 1) / defs.length * 100) + '%';
    const total = shortMode ? defs.filter((x) => x.short).length : defs.length, pos = shortMode ? defs.slice(0, cur + 1).filter((x) => x.short).length : cur + 1;
    $('#count').innerHTML = String(pos).padStart(2, '0') + ' <small>/ ' + String(total).padStart(2, '0') + (shortMode ? ' short' : '') + '</small>';
    $('#dots').innerHTML = Array.from({ length: oneClick ? (d.steps ? 2 : 1) : (d.steps || 0) + 1 }, (_, k) => `<i class="${oneClick ? (k === 0 || curStep > 0 ? 'on' : '') : (k <= curStep ? 'on' : '')}"></i>`).join('');
    $$('#sections button').forEach((b) => b.classList.toggle('on', b.dataset.sec === d.section));
    if ($('#notes').classList.contains('show')) fillNotes();
  }
  function fillNotes() {
    const d = defs[cur], n = defs[cur + 1];
    $('#notes').innerHTML = `<div class="nk">Speaker notes · slide ${cur + 1}${oneClick ? '' : ' · step ' + curStep + '/' + (d.steps || 0)}</div><div class="nt">${(d.notes || 'No notes for this slide.').replace(/</g, '&lt;')}</div><div class="nx">${n ? 'Next: ' + (n.title || n.id) : 'Last slide'}</div>`;
  }
  function buildHud() {
    $('#sections').innerHTML = sectionList.map((s) => `<button data-sec="${s.key}" title="${s.title}">${s.short || s.title}</button>`).join('');
    $$('#sections button').forEach((b) => b.addEventListener('click', () => { const i = defs.findIndex((d) => d.section === b.dataset.sec); if (i >= 0) go(i, 0); }));
    $('#legend').innerHTML = Object.keys(REALITY).filter((k) => k !== 'stat').map((k) => `<span class="rb rb-${k}">${REALITY[k]}</span>`).join('');
    const btn = (id, label, title, fn) => { const b = $('#' + id); b.textContent = label; b.title = title; b.addEventListener('click', (e) => { e.stopPropagation(); fn(); b.blur(); }); };
    btn('b-prev', '‹', 'Previous (←)', prev); btn('b-next', '›', 'Next (→ or Space)', next);
    btn('b-over', '▦', 'Overview (O)', toggleOverview); btn('b-notes', '✎', 'Speaker notes (N)', toggleNotes);
    btn('b-full', '⛶', 'Fullscreen (F)', toggleFull); btn('b-help', '?', 'Shortcuts (?)', toggleHelp);
    btn('b-short', 'S', 'Short path (S)', toggleShort); btn('b-laser', '◉', 'Laser pointer (L)', toggleLaser); btn('b-auto', '▶', 'Autoplay (A)', toggleAuto);
  }
  function overlay(id, on) { const el = $('#' + id); const show = on === undefined ? !el.classList.contains('show') : on; el.classList.toggle('show', show); return show; }
  function toggleOverview() {
    if (!$('#ovgrid').children.length) {
      $('#ovgrid').innerHTML = defs.map((d, i) => `<div class="ovcard" data-i="${i}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="k">${(sectionList.find((s) => s.key === d.section) || {}).title || ''}</span><span class="t">${d.title || d.id}</span>${d.short ? '<span class="sp">short</span>' : ''}${d.reality && d.reality.length ? `<span class="rb rb-${[].concat(d.reality)[0]}">${[].concat(d.reality)[0]}</span>` : ''}${d.placeholder ? '<span class="pd">building</span>' : (d.isNew ? '<span class="nw">new</span>' : '')}</div>`).join('');
      $$('.ovcard').forEach((c) => c.classList.toggle('pending', !!defs[+c.dataset.i].placeholder));
      $$('.ovcard').forEach((c) => c.addEventListener('click', () => { overlay('overview', false); go(+c.dataset.i, 0); }));
    }
    const on = overlay('overview'); if (on) { $$('.ovcard').forEach((c) => c.classList.toggle('sel', +c.dataset.i === cur)); const s = $('.ovcard.sel'); if (s) s.scrollIntoView({ block: 'center' }); }
  }
  function toggleNotes() { const on = overlay('notes'); if (on) fillNotes(); }
  function toggleHelp() { overlay('help'); }
  function toggleFull() { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); }
  let laserOn = false;
  function toggleLaser() { laserOn = !laserOn; $('#laser').style.display = laserOn ? 'block' : 'none'; document.body.classList.toggle('hide-cursor', laserOn); $('#b-laser').classList.toggle('on', laserOn); }
  function toggleAuto() {
    const b = $('#b-auto');
    if (autoplay) { clearInterval(autoplay.iv); autoplay = null; b.classList.remove('on'); b.textContent = '▶'; $('#autoplay-bar').style.width = '0'; return; }
    b.classList.add('on'); b.textContent = '❚❚';
    const tick = () => {
      const d = defs[cur];
      const ms = oneClick ? (curStep === 0 && d.steps ? 2200 : autoRun ? Math.max(500, autoRun.end - performance.now()) + 3600 : 4200) : ([].concat(d.dur || 4200)[curStep] || [].concat(d.dur || 4200).slice(-1)[0]);
      autoplay.left = ms; autoplay.total = ms;
    };
    autoplay = { iv: null, left: 0, total: 1 }; tick();
    autoplay.iv = setInterval(() => {
      autoplay.left -= 100; $('#autoplay-bar').style.width = (100 * (1 - autoplay.left / autoplay.total)) + '%';
      if (autoplay.left <= 0) { if (cur === defs.length - 1 && curStep >= defs[cur].steps) { toggleAuto(); return; } next(); tick(); }
    }, 100);
  }
  function toggleTimer() { timerOn = !timerOn; const t = $('#timer'); t.style.display = timerOn ? 'block' : 'none'; if (timerOn && !t0) t0 = Date.now(); }
  setInterval(() => { if (timerOn) { const s = Math.floor((Date.now() - t0) / 1000); $('#timer').textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); } }, 500);
  function openPresenter() {
    presenterWin = window.open(location.href.split('#')[0].split('?')[0] + '?presenter=1', 'ce-presenter', 'width=1180,height=760');
  }

  let numBuf = '', numTimer = null;
  function jumpDigit(k) {
    numBuf += k; const j = $('#jump'); j.style.display = 'block'; j.textContent = numBuf;
    clearTimeout(numTimer); numTimer = setTimeout(() => commitJump(), 1500);
  }
  function commitJump() { clearTimeout(numTimer); const n = parseInt(numBuf, 10); numBuf = ''; $('#jump').style.display = 'none'; if (n >= 1) go(n - 1, 0); }

  function bindEvents() {
    addEventListener('resize', () => { fit(); ambResize(); });
    addEventListener('keydown', (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key, ov = $('#overview').classList.contains('show');
      if (/^[0-9]$/.test(k)) { jumpDigit(k); e.preventDefault(); return; }
      if (k === 'Enter' && numBuf) { commitJump(); e.preventDefault(); return; }
      if (k === 'Escape') { if (numBuf) { numBuf = ''; $('#jump').style.display = 'none'; } overlay('overview', false); overlay('notes', false); overlay('help', false); $('#black').classList.remove('show'); return; }
      if (ov) {
        const cs = $$('.ovcard'); let s = cs.findIndex((c) => c.classList.contains('sel')); if (s < 0) s = cur;
        const cols = Math.max(1, Math.floor($('#ovgrid').clientWidth / 264));
        const mv = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[k];
        if (mv) { s = clamp(s + mv, 0, cs.length - 1); cs.forEach((c, i) => c.classList.toggle('sel', i === s)); cs[s].scrollIntoView({ block: 'nearest' }); e.preventDefault(); return; }
        if (k === 'Enter') { overlay('overview', false); go(s, 0); e.preventDefault(); return; }
      }
      switch (k) {
        case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': case 'Enter': e.shiftKey && k === 'ArrowRight' ? nextSlide() : next(); e.preventDefault(); break;
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace': e.shiftKey && k === 'ArrowLeft' ? prevSlide() : prev(); e.preventDefault(); break;
        case ']': nextSlide(); break; case '[': prevSlide(); break;
        case 'Home': go(0, 0); break; case 'End': go(defs.length - 1, 0); break;
        case 'f': case 'F': toggleFull(); break; case 'o': case 'O': case 'g': case 'G': case 'Tab': toggleOverview(); e.preventDefault(); break;
        case 'n': case 'N': toggleNotes(); break; case 'p': case 'P': openPresenter(); break;
        case 'u': case 'U': if ($('#live')) { liveOn = !liveOn; renderLive(); toast('Live build', liveOn ? 'following updates' : 'paused', 2000); } break;
        case 's': case 'S': toggleShort(); break; case 't': case 'T': toggleTimer(); break; case 'l': case 'L': toggleLaser(); break;
        case 'a': case 'A': toggleAuto(); break; case 'b': case 'B': case '.': overlay('black'); break;
        case 'r': case 'R': $('#legend').style.display = $('#legend').style.display === 'none' ? '' : 'none'; break;
        case 'j': case 'J': oneClick = !oneClick; cancelAuto(); hud(); toast('Steps', oneClick ? 'one press plays the whole slide' : 'step by step', 2200); break;
        case 'm': case 'M': calm = !calm; document.body.classList.toggle('calm', calm); ambDraw(0); break;
        case '?': case 'h': case 'H': toggleHelp(); break;
        default: return;
      }
    });
    const st = $('#stage'); let down = null;
    st.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, t: Date.now() }; });
    st.addEventListener('pointerup', (e) => {
      if (!down) return; const dx = e.clientX - down.x, dy = e.clientY - down.y, d0 = down; down = null;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { dx < 0 ? next() : prev(); return; }
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8 || Date.now() - d0.t > 600) return;
      if (e.target.closest('button,a,input,select,textarea,label,[data-interactive]')) return;
      if (window.getSelection && String(window.getSelection())) return;
      e.clientX < innerWidth * .22 ? prev() : next();
    });
    let idle;
    addEventListener('pointermove', (e) => {
      amb.mx = e.clientX / innerWidth; amb.my = e.clientY / innerHeight;
      if (laserOn) { const l = $('#laser'); l.style.left = e.clientX + 'px'; l.style.top = e.clientY + 'px'; top.trail.push({ x: e.clientX, y: e.clientY, t: performance.now() }); }
      $('#hud').classList.remove('idle'); if (!laserOn) document.body.classList.remove('hide-cursor');
      clearTimeout(idle); idle = setTimeout(() => { if (!document.querySelector('.overlay.show')) { $('#hud').classList.add('idle'); if (!laserOn) document.body.classList.add('hide-cursor'); } }, 3200);
    });
    addEventListener('hashchange', () => { const t = parseHash(); if (t && (t.i !== cur || t.step !== curStep)) go(t.i, t.step, 0, { instant: true }); });
    addEventListener('message', (e) => {
      const m = e.data; if (!m || !m.ce) return;
      if (m.ce === 'cmd') { ({ next, prev, nextSlide, prevSlide })[m.cmd] && ({ next, prev, nextSlide, prevSlide })[m.cmd](); if (m.cmd === 'goto') go(m.i, m.step || 0); }
      if (m.ce === 'hello' && e.source) { presenterWin = e.source; e.source.postMessage({ ce: 'init', i: cur, step: curStep, defs: defs.map((d) => ({ id: d.id, title: d.title, kicker: d.kicker, notes: d.notes || '', steps: d.steps || 0, section: d.section, minutes: d.minutes || 0 })) }, '*'); }
    });
    document.addEventListener('fullscreenchange', () => $('#b-full').classList.toggle('on', !!document.fullscreenElement));
  }
  function parseHash() {
    const m = location.hash.match(/^#\/([^/]+)(?:\/(\d+))?/); if (!m) return null;
    let i = /^\d+$/.test(m[1]) ? parseInt(m[1], 10) - 1 : defs.findIndex((d) => d.id === m[1]);
    if (i < 0 || isNaN(i)) return null; return { i: clamp(i, 0, defs.length - 1), step: m[2] ? parseInt(m[2], 10) : 0 };
  }
  function fit() { const s = Math.min(innerWidth / 1920, innerHeight / 1080); $('#stage').style.transform = `translate(-50%,-50%) scale(${s})`; }

  /* ------------------------------------------------------------------ presenter console (?presenter=1) */
  function presenterMode(totalFromOpener) {
    document.body.innerHTML = `<style>
      body{overflow:auto;background:#0A0A0C;color:#EDEDEA;font-family:var(--font)}
      .pv{display:grid;grid-template-columns:1.4fr 1fr;gap:22px;padding:22px;height:100vh}
      .pc{border:1px solid #2a2a2e;border-radius:18px;padding:22px;background:#111114;overflow:auto}
      .pk{font:800 12px/1 var(--font);letter-spacing:.26em;text-transform:uppercase;color:#FF8300;margin-bottom:12px}
      .pt{font:800 34px/1.12 var(--font);margin-bottom:14px}.pn{font:500 24px/1.5 var(--font);white-space:pre-wrap;color:#F2F2EE}
      .pb button{all:unset;cursor:pointer;padding:14px 22px;border-radius:14px;background:#1d1d21;border:1px solid #333;font:800 18px/1 var(--font);margin-right:10px}
      .pb button:hover{background:#FF8300;color:#000}.tm{font:800 54px/1 var(--mono);color:#fff}.nx{font:600 20px/1.4 var(--font);color:#A9A9A4}
    </style><div class="pv"><div class="pc"><div class="pk" id="pk"></div><div class="pt" id="pt"></div><div class="pn" id="pn"></div></div>
    <div style="display:grid;gap:22px;grid-template-rows:auto auto 1fr"><div class="pc"><div class="pk">Elapsed</div><div class="tm" id="tm">00:00</div></div>
    <div class="pc"><div class="pk">Controls</div><div class="pb"><button id="pp">‹ Prev</button><button id="pnx">Next ›</button></div></div>
    <div class="pc"><div class="pk">Next up</div><div class="nx" id="nx"></div></div></div></div>`;
    let D = [], i = 0, step = 0; const t0p = Date.now();
    const draw = () => { const d = D[i]; if (!d) return; $('#pk').textContent = `Slide ${i + 1} / ${D.length} · step ${step}/${d.steps} · ${d.kicker || ''}`; $('#pt').textContent = d.title || d.id; $('#pn').textContent = d.notes || 'No notes.'; $('#nx').textContent = D[i + 1] ? `${i + 2}. ${D[i + 1].title}` : 'End of deck'; };
    addEventListener('message', (e) => { const m = e.data; if (!m || !m.ce) return; if (m.ce === 'init') { D = m.defs; i = m.i; step = m.step; draw(); } if (m.ce === 'state') { i = m.i; step = m.step; draw(); } });
    const send = (cmd) => window.opener && window.opener.postMessage({ ce: 'cmd', cmd }, '*');
    $('#pp').onclick = () => send('prev'); $('#pnx').onclick = () => send('next');
    addEventListener('keydown', (e) => { if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) send('next'); if (['ArrowLeft', 'PageUp'].includes(e.key)) send('prev'); });
    setInterval(() => { const s = Math.floor((Date.now() - t0p) / 1000); $('#tm').textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }, 500);
    if (window.opener) window.opener.postMessage({ ce: 'hello' }, '*');
  }


  /* ------------------------------------------------------------------ plan, placeholders, live build */
  const esc = (t) => String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  function phHtml(d, i) {
    const p = d.plan || {}, total = planList.length || defs.length, sec = (sectionList.find((x) => x.key === p.section) || {}).title || '';
    return `<div class="ph-grid"></div><div class="ph-scan"></div>
      <div class="ph-beacons"><i></i><i></i></div>
      <div class="ph-stripe"><span>Under construction</span></div>
      <div class="ph-num">${String(i + 1).padStart(2, '0')}</div>
      <h2 class="h2 ph-h">${esc(p.title || d.title)}</h2>
      <p class="lead ph-lead">${esc(p.brief || 'This slide is planned and not built yet.')}</p>
      <div class="ph-card glass"><div class="label o">This slide will show</div><ul>${(p.shows || []).map((x, k) => `<li style="animation-delay:${k * .35}s">${esc(x)}</li>`).join('')}</ul></div>
      <div class="ph-need"><div class="label">Built from</div>${(p.needs || []).map((x) => `<span class="chip">${esc(x)}</span>`).join('') || '<span class="small">no outside facts needed</span>'}</div>
      <div class="ph-bar"><i></i></div>
      <div class="ph-foot">Slide ${i + 1} of ${total} · ${esc(sec)}${p.short ? ' · on the short path' : ''} · waiting for its builder</div>`;
  }
  function mergePlan() {
    if (!planList.length) return;
    const real = new Map(defs.map((d) => [d.id, d])), merged = [];
    planList.forEach((p) => {
      const d = real.get(p.id);
      if (d) { d.plan = p; if (d.section == null) d.section = p.section; if (!d.title) d.title = p.title; if (d.short == null) d.short = !!p.short; real.delete(p.id); merged.push(d); }
      else merged.push({ id: p.id, section: p.section, title: p.title, kicker: ((sectionList.find((x) => x.key === p.section) || {}).title || '') + ' · not built yet', reality: p.st && p.st !== 'none' ? [p.st] : [], steps: 0, short: !!p.short, placeholder: true, plan: p, notes: 'Not built yet. ' + (p.brief || ''), html: '', ambient: { orb: .8, beam: .25, dust: .8 } });
    });
    real.forEach((d) => merged.push(d));
    defs.length = 0; merged.forEach((d) => defs.push(d));
    defs.forEach((d, i) => { if (d.placeholder) d.html = phHtml(d, i); });
  }
  function detectNew() {
    try {
      const k = 'ce-story-built', now = defs.filter((d) => !d.placeholder).map((d) => d.id), prevRaw = localStorage.getItem(k), prev = prevRaw ? JSON.parse(prevRaw) : null;
      localStorage.setItem(k, JSON.stringify(now));
      Deck.newIds = prev ? now.filter((id) => !prev.includes(id)) : [];
      defs.forEach((d) => { if (Deck.newIds.includes(d.id)) d.isNew = true; });
    } catch (e) { Deck.newIds = []; }
  }
  function toast(tag, text, ms) {
    const box = $('#toasts'); if (!box) return;
    const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = `<b>${esc(tag)}</b><span>${esc(text)}</span>`;
    box.appendChild(t); requestAnimationFrame(() => t.classList.add('in'));
    setTimeout(() => { t.classList.remove('in'); setTimeout(() => t.remove(), 600); }, ms || 7000);
  }
  let liveOn = false, liveTimer = null, liveInfo = null, livePinned = false;
  function builtCount() { return defs.filter((d) => !d.placeholder).length; }
  function renderLive() {
    const pill = $('#live'); if (!pill) return;
    pill.style.display = 'flex'; $('#lv-count').textContent = builtCount() + ' / ' + defs.length + ' built';
    $('#lv-bar i').style.width = (builtCount() / defs.length * 100) + '%';
    pill.classList.toggle('paused', !liveOn);
    pill.classList.toggle('done', builtCount() === defs.length);
    const j = liveInfo, pan = $('#lv-panel');
    pan.classList.toggle('show', livePinned);
    if (!livePinned || !j) return;
    const r = j.research || {};
    pan.innerHTML = `<div class="lv-row"><b>Build #${j.version}</b><span>updated ${j.time}</span></div>
      <div class="lv-row"><b>Research</b><span>code and docs ${r.code || 0}/7 done</span></div>
      <div class="lv-row"><b>Modules</b><span>${(j.modules || []).length} slide files on disk${(window.__modErr || []).length ? ' · ' + window.__modErr.length + ' with errors' : ''}</span></div>
      <div class="lv-log">${(j.events || []).slice(-8).reverse().map((e) => `<div><em>${esc(e.t)}</em>${esc(e.text)}</div>`).join('')}</div>`;
  }
  async function pollLive() {
    try {
      const r = await fetch('live.json?t=' + Date.now(), { cache: 'no-store' }); if (!r.ok) throw new Error('no live.json');
      const j = await r.json(); liveInfo = j; const mine = (window.__BUILD || {}).version;
      if (mine != null && j.version > mine) {
        const e = (j.events || []).slice(-1)[0]; toast('Updating', (e ? e.text : 'a new build is ready') + ' · reloading', 1500);
        $('#live').classList.add('busy'); setTimeout(() => location.reload(), 1100); return;
      }
      renderLive();
    } catch (e) { const pill = $('#live'); if (pill) pill.style.display = 'none'; }
  }
  function startLive() {
    if (!/^https?:/.test(location.protocol) || params.has('nolive')) return;
    liveOn = true; pollLive(); liveTimer = setInterval(() => { if (liveOn) pollLive(); }, 1800);
    $('#live').addEventListener('click', (e) => { e.stopPropagation(); if (e.shiftKey) { liveOn = !liveOn; renderLive(); return; } livePinned = !livePinned; renderLive(); });
  }

  /* ------------------------------------------------------------------ public API */
  const Deck = {
    add(def) { defs.push(def); return Deck; },
    sections(list) { sectionList = list; return Deck; },
    plan(list) { planList = list; return Deck; },
    planData() { return defs.map((d, i) => ({ id: d.id, n: i + 1, section: d.section, t: (d.plan && d.plan.t) || d.title, st: (d.plan && d.plan.st) || 'none', short: !!d.short, built: !d.placeholder, isNew: !!d.isNew })); },
    isBuilt(id) { const d = defs.find((x) => x.id === id); return !!d && !d.placeholder; },
    start() {
      if (PRESENTER) { presenterMode(); return; }
      mergePlan(); detectNew();
      const only = params.get('only'); if (only) { const ids = only.split(','); for (let i = defs.length - 1; i >= 0; i--) if (!ids.includes(defs[i].id)) defs.splice(i, 1); }
      if (!defs.length) { document.body.innerHTML = '<p style="color:#fff;padding:40px;font:20px sans-serif">No slides registered.</p>'; return; }
      if (PRINT) document.body.classList.add('print');
      if (calm) document.body.classList.add('calm');
      amb.cv = $('#bg'); amb.g = amb.cv.getContext('2d'); top.cv = $('#fxtop'); top.g = top.cv.getContext('2d');
      ambInit(); ambResize(); fit(); buildHud(); build(); bindEvents();
      if (!PRINT) { (Deck.newIds || []).slice(0, 4).forEach((id, k) => setTimeout(() => toast('Just built', (defs.findIndex((x) => x.id === id) + 1) + '. ' + defs.find((x) => x.id === id).title, 8000), 900 + k * 500)); if ((Deck.newIds || []).length > 4) setTimeout(() => toast('Just built', '+ ' + (Deck.newIds.length - 4) + ' more slides', 8000), 3200); startLive(); }
      loops.add((dt) => { if (!calm) ambDraw(dt); topDraw(dt); });
      requestAnimationFrame((t) => { lastT = t; requestAnimationFrame(frame); });
      if (PRINT) { defs.forEach((d) => { d.el.classList.add('active'); applyStep(d, d.steps || 0, 1, true); if (d.static) safe(d.id + '.static', () => d.static(d.ctx)); d.ctx._flows.forEach((f) => f.freeze()); }); started = true; Deck.ready = true; return; }
      const h = parseHash(); go(h ? h.i : 0, h ? h.step : 0, 1, { instant: !!h });
      started = true; Deck.ready = true;
    },
    go(i, step, o) { go(i, step || 0, 0, o); }, next, prev, nextSlide, prevSlide,
    state() { return { i: cur, step: curStep, id: defs[cur] && defs[cur].id, count: defs.length }; },
    get defs() { return defs; }, errors, ready: false,
    setOneClick(v) { oneClick = !!v; cancelAuto(); hud(); },
    isOneClick() { return oneClick; },
    setCalm(v) { calm = !!v; document.body.classList.toggle('calm', calm); },
  };
  window.Deck = Deck; window.Fx = Fx;
})();
