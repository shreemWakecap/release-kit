/* Slide 04: the story map. Built from the plan, so it always shows what is built right now (this is the construction view). */
Deck.add({
  id: 'map', section: 'why', title: 'The story map', kicker: 'All slides · Map',
  steps: 3, ambient: { orb: 1, beam: .6, dust: 1 }, dur: [4500, 4500, 4500, 6000],
  notes: 'The whole story on one page. Five parts. Each dot is one slide.\nTo jump to a slide, click its dot.',
  html: `
    <h2 class="h2 mp-h" data-step="0"></h2>
    <p class="lead mp-lead" data-step="0" data-delay="200">Bright dot: a built slide. Dim dot: an idea.</p>
    <svg class="mp-top" viewBox="0 0 1920 120" width="1920" height="120"></svg>
    <div class="mp-acts"></div>`,
  css: `
    .s-map .mp-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-map .mp-lead{position:absolute;left:96px;top:196px;width:1400px;font-size:27px}
    .s-map .mp-top{position:absolute;left:0;top:268px;overflow:visible}
    .s-map .mp-acts{position:absolute;left:98px;top:268px;width:1724px;height:700px}
    .s-map .mp-act{position:absolute;top:0;width:208px;height:760px}
    .s-map .mp-head{position:absolute;left:0;top:0;width:208px;height:88px;padding-top:2px}
    .s-map .mp-n{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--c);color:#0B0B0C;font:900 18px/1 var(--mono);margin-right:10px;box-shadow:0 0 22px var(--c);vertical-align:middle}
    .s-map .mp-head b{display:block;margin-top:12px;font:800 17px/1.15 var(--font);letter-spacing:.04em;text-transform:uppercase;color:#fff}
    .s-map .mp-line{position:absolute;left:12px;top:122px;width:3px;height:0;background:linear-gradient(180deg,var(--c),rgba(255,255,255,.08));border-radius:2px;transition:height 1.2s var(--ease)}
    .s-map .mp-act.on .mp-line{height:var(--h)}
    .s-map .mp-st{position:absolute;left:0;top:112px;width:208px}
    .s-map .mp-s{position:relative;height:78px;padding-left:38px;cursor:pointer}
    .s-map .mp-d{position:absolute;left:5px;top:4px;width:17px;height:17px;border-radius:50%;background:#0B0B0C;border:3px solid var(--sc);transition:all .7s var(--ease)}
    .s-map .mp-s.vision .mp-d{border-style:dashed}
    .s-map .mp-t{display:block;font:600 19px/1.2 var(--font);color:#D9D9D4;transition:color .6s}
    .s-map .mp-t em{font:700 18px/1 var(--mono);font-style:normal;color:var(--mut2);margin-right:8px}
    .s-map .mp-s:hover .mp-t{color:#fff}
    .s-map .mp-s.built .mp-d{background:var(--sc);box-shadow:0 0 0 6px color-mix(in srgb,var(--sc) 22%,transparent),0 0 26px var(--sc);transform:scale(1.18)}
    .s-map .mp-s.built .mp-t{color:#fff}
    .s-map .mp-s:not(.built) .mp-t{color:#7F7F7A}
`,
  init(ctx) {
    const data = Deck.planData(), W = 208, GAP = 9;
    const ACTS = [['why', 'The stakes', '#FF8300'], ['convert', 'The conversion', '#FFB366'], ['tech', 'The paths', '#4FB3FF'], ['bank', 'The data bank', '#2BD576'], ['future', 'What it can do', '#C58BFF'], ['numbers', 'The numbers', '#E6E6E2'], ['next', 'What next', '#FFC24B'], ['appendix', 'Extras', '#8E8E89']];
    const stCol = { live: '#2BD576', code: '#4FB3FF', test: '#FFC24B', plan: '#B9B9B4', vision: '#C58BFF', stat: '#FFFFFF', none: '#F2F2EE' };
    ctx.q('.mp-h').innerHTML = `${data.length} slides. <span class="o glow-text">Ideas bank.</span>`;
    const root = ctx.q('.mp-acts');
    ctx.acts = ACTS.map(([key, name, color], ai) => {
      const st = data.filter((d) => d.section === key);
      const col = document.createElement('div'); col.className = 'mp-act'; col.style.left = (ai * (W + GAP)) + 'px'; col.style.setProperty('--c', color); col.style.setProperty('--h', (st.length * 78 - 26) + 'px');
      col.innerHTML = `<div class="mp-head" data-step="0" data-delay="${ai * 90}"><span class="mp-n">${ai + 1}</span><b>${name}</b></div><div class="mp-line"></div><div class="mp-st"></div>`;
      const box = col.querySelector('.mp-st'), stepFor = ai < 3 ? 1 : ai < 6 ? 2 : 3;
      st.forEach((s, si) => {
        const d = document.createElement('div'); d.className = 'mp-s ' + s.st + (s.built ? ' built' : '');
        d.style.setProperty('--sc', stCol[s.st] || stCol.none); d.dataset.step = stepFor; d.dataset.delay = si * 90; d.dataset.interactive = '1';
        d.innerHTML = `<span class="mp-d"></span><span class="mp-t"><em>${String(s.n).padStart(2, '0')}</em>${s.t}</span>`;
        d.addEventListener('click', () => Deck.go(s.n - 1, 0)); box.appendChild(d);
      });
      root.appendChild(col); return col;
    });
    const svg = ctx.q('.mp-top'), y = 100, path = Fx.el('path', { d: `M98 ${y} L1822 ${y}`, stroke: '#FF8300', 'stroke-width': 3, fill: 'none', opacity: .75, filter: 'url(#fx-glow-u)' }, svg);
    ACTS.forEach((a, ai) => Fx.el('circle', { cx: 98 + ai * (W + GAP) + 17, cy: y, r: 7, fill: a[2], filter: 'url(#fx-glow)' }, svg));
    ctx.flowTop = ctx.flow(path, { color: '#FFB366', count: 4, speed: 420, r: 5, tail: 8, tailGap: 14 }); ctx.mpath = path; ctx.total = data.length;
  },
  enter(ctx) { Fx.draw(ctx.mpath, 1500, 200); },
  step(ctx, i, dir, instant) {
    ctx.flowTop.start();
    ctx.acts.forEach((c, ai) => { const need = ai < 3 ? 1 : ai < 6 ? 2 : 3; c.classList.toggle('on', i >= need); });
  },
  static(ctx) { ctx.acts.forEach((c) => c.classList.add('on')); ctx.flowTop.freeze(); },
});
