/* Board 5: the light and motion kit. Eight live effects, each used somewhere in the story. */
Deck.add({
  id: 'light', section: 'design', title: 'Light and motion kit', kicker: 'Board 5 · Design kit', reality: [],
  steps: 2, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [4500, 5500, 6000],
  notes: 'Eight effects, all live on this page. Glow marks the thing that matters. Shine sweeps the key headline. Beams give the room its light. Packets carry data along a path. Edge light frames the hero card. Pulse rings say this is alive. Count-ups make a number feel earned. Bursts reward a key moment.\nRule: motion explains. It shows flow, build-up, cause and effect. Red moves only for Danger.',
  html: `
    <h2 class="h2 lt-h" data-step="0">Light and <span class="o glow-text">motion kit.</span></h2>
    <p class="lead lt-lead" data-step="0" data-delay="200">Motion explains: flow, build-up, cause and effect. Eight effects, live.</p>
    <div class="lt-grid">
      <div class="lt-tile glass" data-step="0" data-delay="100"><div class="lt-demo"><span class="lt-danger">Danger</span></div><b>Glow</b><span>Red flashes only for Danger. 1.4 s.</span></div>
      <div class="lt-tile glass" data-step="0" data-delay="200"><div class="lt-demo"><span class="shine lt-shine">One data bank.</span></div><b>Shine sweep</b><span>The key headline, once per slide.</span></div>
      <div class="lt-tile glass" data-step="0" data-delay="300"><div class="lt-demo lt-bm"><div class="beam" style="left:30px;top:-110px;width:360px;height:420px;background:conic-gradient(from 190deg at 50% -25%,transparent 0 30deg,rgba(255,131,0,.7) 58deg,transparent 92deg 360deg);filter:blur(18px)"></div><i class="lt-star"></i></div><b>Light beams</b><span>The room's light. Always behind.</span></div>
      <div class="lt-tile glass" data-step="0" data-delay="400"><div class="lt-demo"><svg viewBox="0 0 360 150" class="lt-svg"></svg></div><b>Packets</b><span>Data travelling a path. Direction = meaning.</span></div>
      <div class="lt-tile glass" data-step="1" data-delay="0"><div class="lt-demo"><div class="lt-edge edge-glow"><b>Hero card</b></div></div><b>Edge light</b><span>One card per slide that matters most.</span></div>
      <div class="lt-tile glass" data-step="1" data-delay="120"><div class="lt-demo"><div class="lt-pulse"><i class="pulse-ring" style="inset:-16px"></i><i class="pulse-ring" style="inset:-16px;animation-delay:1.3s"></i><em></em></div></div><b>Pulse ring</b><span>Alive, listening, polling.</span></div>
      <div class="lt-tile glass" data-step="1" data-delay="240"><div class="lt-demo"><span class="lt-cnt mono">0</span></div><b>Count-up</b><span>Readings in the sensors DB, 10 Aug 2026 (internal doc).</span></div>
      <div class="lt-tile glass lt-burst" data-step="1" data-delay="360" data-interactive="1"><div class="lt-demo"><span class="chip">click me</span></div><b>Burst</b><span>A reward for the key moment.</span></div>
    </div>`,
  css: `
    .s-light .lt-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-light .lt-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-light .lt-grid{position:absolute;left:96px;top:290px;width:1728px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
    .s-light .lt-tile{height:300px;padding:0 0 18px;overflow:hidden;display:flex;flex-direction:column}
    .s-light .lt-demo{position:relative;height:178px;display:grid;place-items:center;overflow:hidden}
    .s-light .lt-tile>b{display:block;padding:0 24px;font:800 25px/1 var(--font);color:#fff}
    .s-light .lt-tile>span{display:block;padding:8px 24px 0;font:400 19px/1.3 var(--font);color:var(--mut)}
    .s-light .lt-danger{font:900 54px/1 var(--font);color:var(--danger);animation:ltFlash 1.4s ease-in-out infinite}
    @keyframes ltFlash{0%,100%{text-shadow:0 0 10px rgba(255,77,77,.3)}50%{text-shadow:0 0 44px rgba(255,77,77,.95),0 0 90px rgba(255,77,77,.55)}}
    .s-light .lt-shine{font:800 38px/1 var(--font)}
    .s-light .lt-bm .lt-star{position:absolute;width:10px;height:10px;border-radius:50%;background:#fff;box-shadow:0 0 18px 6px rgba(255,131,0,.8);left:50%;top:50%}
    .s-light .lt-svg{width:340px;height:140px;overflow:visible}
    .s-light .lt-edge{width:240px;height:118px;border-radius:22px;display:grid;place-items:center;background:rgba(255,255,255,.05);font:800 26px var(--font);color:#fff}
    .s-light .lt-pulse{position:relative;width:34px;height:34px}
    .s-light .lt-pulse em{position:absolute;inset:0;border-radius:50%;background:var(--wc-orange);box-shadow:0 0 30px var(--wc-orange)}
    .s-light .lt-cnt{font-size:50px;font-weight:700;color:var(--wc-orange);text-shadow:0 0 28px rgba(255,131,0,.5)}
    .s-light .lt-burst{cursor:pointer}`,
  init(ctx) {
    const svg = ctx.q('.lt-svg'), p = Fx.el('path', { d: 'M10 110 C 90 10, 180 150, 350 40', stroke: 'rgba(255,255,255,.2)', 'stroke-width': 3, fill: 'none' }, svg);
    ctx.fl = ctx.flow(p, { color: '#FF8300', count: 3, speed: 150, r: 6, tail: 8, tailGap: 13 });
    ctx.q('.lt-burst').addEventListener('click', (e) => Fx.burst(e.clientX, e.clientY, { n: 40, speed: 520 }));
  },
  step(ctx, i, dir, instant) { ctx.fl.start(); if (i >= 1) Fx.counter(ctx.q('.lt-cnt'), 1496265, { dur: instant ? 0 : 2200 }); else ctx.q('.lt-cnt').textContent = '0'; if (i === 1 && !instant) ctx.after(900, () => Fx.burstEl(ctx.q('.lt-burst'), { n: 30, speed: 380 })); },
  static(ctx) { ctx.q('.lt-cnt').textContent = '1,496,265'; ctx.fl.freeze(); },
});
