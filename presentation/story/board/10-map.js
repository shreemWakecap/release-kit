/* Board 1: the story map. Seven acts, 33 stations. Dot colour = how real. Glow = built. Ring = the 15 slide short path. */
Deck.add({
  id: 'map', section: 'map', title: 'The story map: 33 slides, seven acts', kicker: 'Board 1 · Story map',
  steps: 5, ambient: { orb: 1, beam: .6, dust: 1 }, dur: [4500, 4500, 4500, 4500, 4500, 6000],
  notes: 'This is the whole story on one page. Each station is a slide. Seven acts, left to right: the stakes, the conversion, the paths of readings, the data bank, what the bank enables, lives and cost, and what comes next.\nThe dot colour is how real the claim is. Glow marks the four slides already built. The orange ring marks the 15 slide short path for a 15 minute talk.',
  html: `
    <h2 class="h2 mp-h" data-step="0">33 slides. <span class="o glow-text">Seven acts.</span> One story.</h2>
    <p class="lead mp-lead" data-step="0" data-delay="200">Each station is a slide. The dot colour is how real it is. Glow means built. The ring is the 15 slide short path.</p>
    <div class="mp-chip chip" data-step="4" data-fx="right"><i class="mp-gl"></i><span class="mp-chip-t">4 of 33 built</span></div>
    <svg class="mp-top" viewBox="0 0 1920 120" width="1920" height="120"></svg>
    <div class="mp-acts"></div>
`,
  css: `
    .s-map .mp-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-map .mp-lead{position:absolute;left:96px;top:196px;width:1300px;font-size:27px}
    .s-map .mp-chip{position:absolute;right:96px;top:208px;font-size:25px;border-color:rgba(255,131,0,.6);color:#FFD2A3}
    .s-map .mp-gl{display:block;width:14px;height:14px;border-radius:50%;background:var(--wc-orange);box-shadow:0 0 16px var(--wc-orange)}
    .s-map .mp-top{position:absolute;left:0;top:268px;overflow:visible}
    .s-map .mp-acts{position:absolute;left:98px;top:268px;width:1724px;height:700px}
    .s-map .mp-act{position:absolute;top:0;width:236px;height:700px}
    .s-map .mp-head{position:absolute;left:0;top:0;width:236px;height:88px;padding-top:2px}
    .s-map .mp-n{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--c);color:#0B0B0C;font:900 18px/1 var(--mono);margin-right:10px;box-shadow:0 0 22px var(--c);vertical-align:middle}
    .s-map .mp-head b{display:block;margin-top:12px;font:800 20px/1.15 var(--font);letter-spacing:.06em;text-transform:uppercase;color:#fff}
    .s-map .mp-line{position:absolute;left:16px;top:128px;width:3px;height:0;background:linear-gradient(180deg,var(--c),rgba(255,255,255,.08));border-radius:2px;transition:height 1.2s var(--ease)}
    .s-map .mp-act.on .mp-line{height:var(--h)}
    .s-map .mp-st{position:absolute;left:0;top:116px;width:236px}
    .s-map .mp-s{position:relative;height:78px;padding-left:44px}
    .s-map .mp-d{position:absolute;left:8px;top:6px;width:20px;height:20px;border-radius:50%;background:#0B0B0C;border:3px solid var(--sc);box-shadow:0 0 0 0 transparent;transition:all .7s var(--ease)}
    .s-map .mp-s.vision .mp-d{border-style:dashed}
    .s-map .mp-t{display:block;font:600 22px/1.2 var(--font);color:#D9D9D4;transition:color .6s}
    .s-map .mp-t em{font:700 16px/1 var(--mono);font-style:normal;color:var(--mut2);margin-right:8px}
    .s-map .mp-bt{display:none;font:800 15px/1 var(--mono);letter-spacing:.14em;color:var(--wc-orange);margin-top:6px}
    .s-map.built-on .mp-s.built .mp-bt{display:block}
    .s-map.built-on .mp-s.built .mp-d{background:var(--sc);box-shadow:0 0 0 6px color-mix(in srgb,var(--sc) 22%,transparent),0 0 26px var(--sc);transform:scale(1.18)}
    .s-map.built-on .mp-s.built .mp-t{color:#fff}
    .s-map.built-on .mp-s:not(.built) .mp-t{color:#8E8E89}
    .s-map .mp-s::after{content:"";position:absolute;left:1px;top:-1px;width:34px;height:34px;border-radius:50%;border:2px solid var(--wc-orange);opacity:0;transform:scale(.6);transition:all .7s var(--ease);box-shadow:0 0 18px rgba(255,131,0,.6)}
    .s-map.short-on .mp-s.short::after{opacity:1;transform:none}
    .s-map.short-on .mp-s.short .mp-t{color:#fff}
        .s-map .mp-act{opacity:1}`,
  init(ctx) {
    const SM = window.SM, root = ctx.q('.mp-acts'), W = 236, GAP = 12;
    ctx.acts = SM.acts.map((a, ai) => {
      const col = document.createElement('div'); col.className = 'mp-act'; col.style.left = (ai * (W + GAP)) + 'px'; col.style.setProperty('--c', a.color);
      col.style.setProperty('--h', (a.stations.length * 78 - 26) + 'px');
      col.innerHTML = `<div class="mp-head" data-step="0" data-delay="${ai * 90}"><span class="mp-n">${ai + 1}</span><b>${a.name}</b></div><div class="mp-line"></div><div class="mp-st"></div>`;
      const st = col.querySelector('.mp-st'), stepFor = ai < 2 ? 1 : ai < 4 ? 2 : 3;
      a.stations.forEach((s, si) => {
        const d = document.createElement('div'); d.className = 'mp-s ' + s.st + (s.built ? ' built' : '') + (s.short ? ' short' : '');
        d.style.setProperty('--sc', SM.stCol[s.st]); d.dataset.step = stepFor; d.dataset.delay = si * 90;
        d.innerHTML = `<span class="mp-d"></span><span class="mp-t"><em>${String(s.n).padStart(2, '0')}</em>${s.t}</span><span class="mp-bt">BUILT</span>`;
        st.appendChild(d);
      });
      root.appendChild(col); return col;
    });
    /* main line across the act headers with packets */
    const svg = ctx.q('.mp-top'), y = 100, path = Fx.el('path', { d: `M98 ${y} L1822 ${y}`, stroke: '#FF8300', 'stroke-width': 3, fill: 'none', opacity: .75, filter: 'url(#fx-glow-u)' }, svg);
    SM.acts.forEach((a, ai) => Fx.el('circle', { cx: 98 + ai * (W + GAP) + 17, cy: y, r: 7, fill: a.color, filter: 'url(#fx-glow)' }, svg));
    ctx.flowTop = ctx.flow(path, { color: '#FFB366', count: 4, speed: 420, r: 5, tail: 8, tailGap: 14 });
    ctx.mpath = path;
  },
  enter(ctx) { Fx.draw(ctx.mpath, 1500, 200); },
  step(ctx, i, dir, instant) {
    ctx.flowTop.start();
    ctx.acts.forEach((c, ai) => { const need = ai < 2 ? 1 : ai < 4 ? 2 : 3; c.classList.toggle('on', i >= need); });
    ctx.root.classList.toggle('built-on', i >= 4); ctx.root.classList.toggle('short-on', i >= 5);
    ctx.q('.mp-chip-t').textContent = i >= 5 ? '15 slides · about 15 minutes' : '4 of 33 built';
    if (i === 4 && !instant) Fx.burstEl(ctx.q('.mp-chip'), { n: 20, speed: 320 });
  },
  static(ctx) { ctx.acts.forEach((c) => c.classList.add('on')); ctx.root.classList.add('built-on', 'short-on'); ctx.q('.mp-chip-t').textContent = '15 slides · about 15 minutes'; ctx.flowTop.freeze(); },
});
