/* Slide 05: what shipped, as users see it. Live screens (masked, 4 Oct 2026) in a light-edged 3D stack, product by product. */
Deck.add({
  id: 'shipped', section: 'convert', title: 'One portal area, three products', kicker: 'The change · Three products', reality: ['live'],
  short: true, steps: 4, ambient: { orb: 1, beam: .6, dust: .9 }, dur: [4200, 4800, 4800, 4800, 6000], minutes: 1.2,
  notes: 'This is Connected Environment today, live.\nWeather Station gives a clear answer with steps.\nLightning is a backup alert. The site lamps and horn come first.\nGas shows detectors and alerts.\nEach project switches on only the products it uses.',
  html: `
    <h2 class="h2 sh-h" data-step="0">One portal area. <span class="o glow-text">Three products.</span></h2>
    <p class="lead sh-lead" data-step="0" data-delay="250">Weather Station now sits beside Lightning and Gas.</p>
    <div class="sh-list">
      <div class="sh-item" data-k="0"><i style="--c:#FF8300"></i><div><b>Weather Station</b><span>A clear answer, with steps.</span></div></div>
      <div class="sh-item" data-k="1"><i style="--c:#4FB3FF"></i><div><b>Lightning</b><span>A backup alert.</span></div></div>
      <div class="sh-item" data-k="2"><i style="--c:#2BD576"></i><div><b>Gas</b><span>Watch detectors. Handle alerts.</span></div></div>
    </div>
    <div class="sh-stack">
      <div class="sh-card" data-k="0" style="--c:#FF8300"><div class="sh-frame"><img src="assets/ws-top.png" alt="Weather Station screen"><div class="sh-tag">Weather Station</div></div></div>
      <div class="sh-card" data-k="1" style="--c:#4FB3FF"><div class="sh-frame"><img src="assets/lt-top.png" alt="Lightning screen"><div class="sh-tag">Lightning</div></div></div>
      <div class="sh-card" data-k="2" style="--c:#2BD576"><div class="sh-frame"><img src="assets/gas-dash.png" alt="Gas screen"><div class="sh-tag">Gas</div></div></div>
    </div>
    <div class="sh-prod glass hot" data-step="4" data-fx="up">
      <div class="label o">Settings</div>
      <img src="assets/prod-c.png" alt="Connected Products switches">
      <div class="small">One switch per product.</div>
    </div>
    <div class="src sh-src" data-step="1">Live screens · names blurred</div>`,
  css: `
    .s-shipped .sh-h{position:absolute;left:96px;top:118px;width:1100px}
    .s-shipped .sh-lead{position:absolute;left:96px;top:236px;width:700px;font-size:30px}
    .s-shipped .sh-list{position:absolute;left:96px;top:450px;width:700px;display:flex;flex-direction:column;gap:20px}
    .s-shipped .sh-item{display:flex;gap:22px;align-items:flex-start;padding:20px 26px;border-radius:22px;border:1px solid var(--line);background:rgba(255,255,255,.03);opacity:0;transform:translateX(-30px);transition:all .8s var(--ease)}
    .s-shipped .sh-item i{flex:none;width:16px;height:16px;border-radius:50%;margin-top:12px;background:var(--c);box-shadow:0 0 18px var(--c)}
    .s-shipped .sh-item b{display:block;font:800 36px/1.1 var(--font);color:#fff}
    .s-shipped .sh-item span{display:block;margin-top:8px;font:400 25px/1.35 var(--font);color:var(--mut)}
    .s-shipped .sh-item.on{opacity:1;transform:none;border-color:var(--c);background:rgba(255,255,255,.06);box-shadow:0 0 50px color-mix(in srgb,var(--c) 25%,transparent)}
    .s-shipped .sh-item.past{opacity:.55;transform:none}
    .s-shipped .sh-item[data-k="0"]{--c:#FF8300}.s-shipped .sh-item[data-k="1"]{--c:#4FB3FF}.s-shipped .sh-item[data-k="2"]{--c:#2BD576}
    .s-shipped .sh-stack{position:absolute;left:860px;top:250px;width:960px;height:700px;perspective:1800px}
    .s-shipped .sh-card{position:absolute;left:0;top:0;width:900px;opacity:0;transition:transform 1.3s var(--ease),opacity .9s var(--ease),filter .9s;transform-style:preserve-3d;will-change:transform}
    .s-shipped .sh-frame{position:relative;border-radius:20px;overflow:hidden;border:2px solid var(--c);background:#fff;box-shadow:0 0 0 1px rgba(255,255,255,.1),0 0 70px color-mix(in srgb,var(--c) 40%,transparent),0 40px 90px rgba(0,0,0,.6)}
    .s-shipped .sh-frame img{display:block;width:100%;height:auto}
    .s-shipped .sh-prod .label{width:300px;line-height:1.35}
    .s-shipped .sh-frame::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.16) 48%,transparent 62%);pointer-events:none}
    .s-shipped .sh-tag{position:absolute;left:18px;top:14px;padding:8px 16px;border-radius:999px;background:var(--c);color:#0B0B0C;font:900 19px/1 var(--font);letter-spacing:.12em;text-transform:uppercase}
    .s-shipped.fan .sh-list,.s-shipped.fan .sh-lead{opacity:0!important;pointer-events:none}
    .s-shipped .sh-list,.s-shipped .sh-lead{transition:opacity .7s var(--ease)}
    .s-shipped .sh-prod{position:absolute;left:96px;top:700px;width:1728px;padding:20px 30px;display:flex;align-items:center;gap:30px}
    .s-shipped .sh-prod img{width:760px;height:auto;border-radius:12px;border:1px solid var(--line-2)}
    .s-shipped .sh-prod .small{flex:1;font-size:27px;color:#E6E6E2}
    .s-shipped .sh-src{position:absolute;left:96px;top:975px}`,
  init(ctx) {
    ctx.cards = ctx.qa('.sh-card'); ctx.items = ctx.qa('.sh-item');
    ctx.frames = ctx.qa('.sh-frame'); ctx.frames.forEach((f) => { f.addEventListener('pointermove', (e) => { const r = f.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5; f.style.transform = `rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`; }); f.addEventListener('pointerleave', () => { f.style.transform = ''; }); });
  },
  step(ctx, i, dir, instant) {
    /* state per card: [x, y, scale, rotY, opacity, z, blur] */
    const S = {
      hero: (n) => `translate3d(${n === 0 ? 0 : n === 1 ? 20 : 40}px,${n * 0}px,0) rotateY(-9deg) scale(1)`,
      back: (n) => `translate3d(${-40 + n * 30}px,${-30 + n * 40}px,-260px) rotateY(-9deg) scale(.92)`,
      fan: (n) => `translate3d(${[-944, -374, 196][n]}px,${[-30, -10, -20][n]}px,0) rotateY(0deg) scale(.6)`,
    };
    ctx.cards.forEach((c, n) => {
      let t, o, z, b = 0;
      if (i === 0) { t = S.back(n); o = 0; z = 1; }
      else if (i < 4) {
        const act = i - 1;
        if (n === act) { t = S.hero(n); o = 1; z = 5; } else if (n < act) { t = S.back(n); o = .28; z = 3 - n; b = 3; } else { t = S.back(n); o = 0; z = 1; }
      } else { t = S.fan(n); o = 1; z = 5 - n; }
      c.style.zIndex = z; c.style.filter = b ? `blur(${b}px)` : '';
      if (instant) c.style.transition = 'none';
      c.style.transform = t; c.style.opacity = o;
      if (instant) { void c.offsetWidth; c.style.transition = ''; }
    });
    ctx.root.classList.toggle('fan', i >= 4);
    ctx.items.forEach((el, n) => { el.classList.toggle('on', i >= 1 && i <= 3 ? n === i - 1 : i === 4 ? false : false); el.classList.toggle('past', (i >= 1 && i <= 3 && n < i - 1) || i === 4); });
    if (i >= 1 && i <= 3 && !instant) { Fx.burstEl(ctx.cards[i - 1], { n: 22, color: ['#FF8300', '#4FB3FF', '#2BD576'][i - 1], speed: 340 }); }
  },
  static(ctx) { ctx.cards.forEach((c) => { c.style.transition = 'none'; }); },
});
