/* Slide 05: One app became a platform. One timeline with five dates, and one picture that grows with it:
   a lone card, its own frame, a new title, two more cards, a 1.0 seal. Easy words, very few of them. */
const CV_M = [['May 2025', 'Weather Station'], ['Jun 2026', 'Its own app'], ['Aug 2026', 'New name'], ['Sep 2026', 'Lightning and Gas'], ['Oct 2026', 'Version 1.0']];
const CV_X = [246, 603, 960, 1317, 1674], CV_X0 = 130;
const CV_RAYS = Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<line x1="${(Math.cos(a) * 25).toFixed(1)}" y1="${(Math.sin(a) * 25).toFixed(1)}" x2="${(Math.cos(a) * 38).toFixed(1)}" y2="${(Math.sin(a) * 38).toFixed(1)}"/>`; }).join('');
const CV_ICON = [
  `<svg class="cv-ic" viewBox="-50 -50 100 100" fill="none" stroke="#FF8300" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><circle r="15" fill="#FF8300" fill-opacity=".22"/><g class="cv-rays">${CV_RAYS}</g></svg>`,
  `<svg class="cv-ic cv-bolt" viewBox="-50 -50 100 100" fill="none" stroke="#4FB3FF" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="5,-40 -22,5 -2,5 -9,40 22,-11 2,-11 11,-40" fill="#4FB3FF" fill-opacity=".25"/></svg>`,
  `<svg class="cv-ic cv-gas" viewBox="-50 -50 100 100" fill="none" stroke="#2BD576" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="-18" cy="11" r="16" fill="#2BD576" fill-opacity=".18"/><circle cx="0" cy="-11" r="22" fill="#2BD576" fill-opacity=".18"/><circle cx="20" cy="13" r="14" fill="#2BD576" fill-opacity=".18"/></svg>`,
];
const CV_CARD = (k, col, name) => `<div class="cv-card" data-k="${k}" style="--c:${col}"><div class="cv-ci">${CV_ICON[k]}<div class="cv-cl">${name}</div></div></div>`;

Deck.add({
  id: 'conversion', section: 'convert', reality: ['code', 'live'],
  steps: 5, ambient: { orb: 1.1, beam: .6, dust: 1 }, dur: [3600, 4200, 4800, 4800, 5400, 7000], minutes: 1,
  notes: [
    'Open with the headline: one app grew into three products.',
    'Step 1, May 2025: Weather Station was one product on its own.',
    'Step 2, June 2026: it got its own app.',
    'Step 3, August 2026: the app got a new name, Connected Environment.',
    'Step 4, September 2026: Lightning and Gas joined it.',
    'Step 5, October 2026: it reached version 1.0.',
    'If asked: the backend was about 276 commits old before the UI moved to its own app (June 2026). The rename on 24 Aug 2026 moved about 260 files. The backend moved about 345 files on 27 Aug. The first production tag under the new name was 3 Sep 2026. Version 1.0 was tagged 30 Sep 2026, so the Oct label means the 1.0 build that was live that month: build 1.0.7 was seen live on 4 Oct 2026. Lightning landed in the code on 30 Aug 2026, Gas screens on 8 Sep and the Gas backend on 13 Sep.',
  ].join('\n'),
  html: `
    <h2 class="h2 cv-h" data-step="0">One app grew <span class="o glow-text">into three.</span></h2>
    <div class="cv-glow"></div>
    <div class="cv-pic">
      <div class="cv-frame edge-glow">
        <div class="cv-clip">
          <div class="cv-bar">
            <i class="cv-dots"><b></b><b></b><b></b></i>
            <div class="cv-title"><span class="cv-t-old">Weather Station</span><span class="cv-t-new">Connected Environment</span></div>
          </div>
        </div>
      </div>
      ${CV_CARD(0, '#FF8300', 'Weather Station')}${CV_CARD(1, '#4FB3FF', 'Lightning')}${CV_CARD(2, '#2BD576', 'Gas')}
      <div class="cv-sweepw"><div class="cv-sweep"></div></div>
      <div class="cv-ring"></div>
      <div class="cv-seal"><div class="cv-seal-in"><span>1.0</span></div></div>
    </div>
    <div class="cv-time" data-step="0" data-delay="450">
      <div class="cv-track"></div><div class="cv-fill"></div>
      ${CV_X.map((x, k) => `<i class="cv-node" style="left:${x - 17}px"></i>`).join('')}
      <i class="cv-comet"></i>
    </div>
    ${CV_X.map((x, k) => `<div class="cv-lbl" data-step="${k + 1}" data-delay="600" style="left:${x - 160}px"><b>${CV_M[k][0]}</b> <span>${CV_M[k][1]}</span></div>`).join('')}`,
  css: `
    .s-conversion .cv-h{position:absolute;left:96px;top:112px;width:1500px}
    .s-conversion .cv-glow{position:absolute;left:260px;top:116px;width:1400px;height:700px;pointer-events:none;background:radial-gradient(closest-side,rgba(255,131,0,.30),rgba(255,131,0,.10) 55%,transparent 78%);opacity:.3;transform:scale(.4);transition:opacity 1.6s var(--ease),transform 1.8s var(--ease)}
    .s-conversion.s1 .cv-glow{opacity:.55;transform:scale(.5)}
    .s-conversion.s2 .cv-glow{opacity:.6;transform:scale(.62)}
    .s-conversion.s3 .cv-glow{opacity:.85;transform:scale(.72)}
    .s-conversion.s4 .cv-glow{opacity:1;transform:scale(1)}
    .s-conversion.s5 .cv-glow{opacity:1;transform:scale(1.08)}
    .s-conversion .cv-pic{position:absolute;inset:0;pointer-events:none}

    /* the frame: its own app, then a new name, then room for more */
    .s-conversion .cv-frame{position:absolute;left:670px;top:236px;width:580px;height:460px;border-radius:30px;border:2px solid rgba(255,255,255,.3);background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.02)),rgba(10,10,12,.66);box-shadow:0 30px 80px rgba(0,0,0,.5);opacity:0;transform:scale(1.18);transition:left 1s var(--ease),width 1s var(--ease),opacity .8s var(--ease),transform 1s var(--ease),border-color .9s,box-shadow .9s}
    .s-conversion.s2 .cv-frame{opacity:1;transform:none}
    .s-conversion.s3 .cv-frame{border-color:rgba(255,131,0,.85);box-shadow:0 0 0 1px rgba(255,131,0,.22),0 0 90px rgba(255,131,0,.3),0 30px 80px rgba(0,0,0,.5)}
    .s-conversion.s4 .cv-frame{left:336px;width:1248px}
    .s-conversion .cv-frame::before{opacity:0;transition:opacity 1s}
    .s-conversion.s3 .cv-frame::before{opacity:1}
    .s-conversion .cv-frame.flash{animation:cvFlash 1.1s ease-out}
    @keyframes cvFlash{0%{box-shadow:0 0 0 1px rgba(255,131,0,.22),0 0 90px rgba(255,131,0,.3),0 30px 80px rgba(0,0,0,.5)}30%{box-shadow:0 0 0 2px rgba(255,205,150,.65),0 0 170px rgba(255,131,0,.8),0 30px 80px rgba(0,0,0,.5)}100%{box-shadow:0 0 0 1px rgba(255,131,0,.22),0 0 90px rgba(255,131,0,.3),0 30px 80px rgba(0,0,0,.5)}}
    .s-conversion .cv-clip{position:absolute;inset:0;border-radius:28px;overflow:hidden}
    .s-conversion .cv-bar{position:relative;height:72px;display:flex;align-items:center;justify-content:center;border-bottom:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.01))}
    .s-conversion .cv-dots{position:absolute;left:26px;top:30px;display:flex;gap:9px}
    .s-conversion .cv-dots b{display:block;width:13px;height:13px;border-radius:50%;background:rgba(255,255,255,.22);transition:background .8s,box-shadow .8s}
    .s-conversion.s3 .cv-dots b:first-child{background:var(--wc-orange);box-shadow:0 0 14px var(--wc-orange)}
    .s-conversion .cv-title{display:grid;perspective:800px;font:800 28px/1 var(--font)}
    .s-conversion .cv-title span{grid-area:1/1;text-align:center;white-space:nowrap;backface-visibility:hidden;transition:transform .65s var(--ease),opacity .45s,filter .45s}
    .s-conversion .cv-t-old{color:#E6E6E2}
    .s-conversion .cv-t-new{color:#fff;text-shadow:0 0 22px rgba(255,131,0,.55);transform:rotateX(90deg);opacity:0;filter:blur(6px)}
    .s-conversion.s3 .cv-t-old{transform:rotateX(-90deg);opacity:0;filter:blur(6px)}
    .s-conversion.s3 .cv-t-new{transform:none;opacity:1;filter:none;transition-delay:.3s}
    .s-conversion .cv-sweepw{position:absolute;left:670px;top:236px;width:580px;height:460px;border-radius:30px;overflow:hidden;pointer-events:none}
    .s-conversion .cv-sweep{position:absolute;inset:0;pointer-events:none;opacity:0;transform:translateX(-80%);mix-blend-mode:screen;background:linear-gradient(105deg,transparent 26%,rgba(255,170,90,.28) 42%,rgba(255,240,220,.62) 50%,rgba(255,170,90,.28) 58%,transparent 74%)}
    .s-conversion .cv-sweep.go{animation:cvSweep 1.4s cubic-bezier(.4,0,.3,1) both}
    @keyframes cvSweep{0%{opacity:1;transform:translateX(-80%)}92%{opacity:1}100%{opacity:0;transform:translateX(80%)}}

    /* the cards */
    .s-conversion .cv-card{position:absolute;top:352px;width:360px;height:300px;transition:transform 1s var(--ease),opacity .8s var(--ease),filter .8s var(--ease)}
    .s-conversion .cv-card[data-k="0"]{left:780px;opacity:0;transform:scale(.84);filter:blur(10px)}
    .s-conversion.s1 .cv-card[data-k="0"]{opacity:1;transform:none;filter:none}
    .s-conversion.s4 .cv-card[data-k="0"]{transform:translateX(-396px)}
    .s-conversion .cv-card[data-k="1"]{left:780px;opacity:0;transform:translateX(110px);filter:blur(8px)}
    .s-conversion .cv-card[data-k="2"]{left:1176px;opacity:0;transform:translateX(110px);filter:blur(8px)}
    .s-conversion.s4 .cv-card[data-k="1"]{opacity:1;transform:none;filter:none;transition-delay:.5s}
    .s-conversion.s4 .cv-card[data-k="2"]{opacity:1;transform:none;filter:none;transition-delay:.85s}
    .s-conversion .cv-ci{position:relative;width:100%;height:100%;border-radius:28px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;border:2px solid color-mix(in srgb,var(--c) 70%,transparent);background:radial-gradient(120% 90% at 50% 0%,color-mix(in srgb,var(--c) 22%,transparent),rgba(255,255,255,.03) 70%),rgba(12,12,14,.74);box-shadow:0 0 60px color-mix(in srgb,var(--c) 28%,transparent),0 24px 60px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.14);animation:cvBob 5.5s ease-in-out infinite alternate}
    .s-conversion .cv-card[data-k="1"] .cv-ci{animation-delay:-1.8s}
    .s-conversion .cv-card[data-k="2"] .cv-ci{animation-delay:-3.6s}
    @keyframes cvBob{from{transform:translateY(-3px)}to{transform:translateY(5px)}}
    .s-conversion .cv-ic{width:132px;height:132px;overflow:visible;filter:drop-shadow(0 0 14px color-mix(in srgb,var(--c) 70%,transparent))}
    .s-conversion .cv-rays{animation:cvSpin 36s linear infinite}
    @keyframes cvSpin{to{transform:rotate(360deg)}}
    .s-conversion .cv-bolt polygon{animation:cvFlick 3.4s ease-in-out infinite}
    @keyframes cvFlick{0%,86%,100%{opacity:1}90%{opacity:.45}94%{opacity:1}97%{opacity:.6}}
    .s-conversion .cv-gas circle{animation:cvRise 4s ease-in-out infinite alternate}
    .s-conversion .cv-gas circle:nth-child(2){animation-delay:-1.3s}.s-conversion .cv-gas circle:nth-child(3){animation-delay:-2.6s}
    @keyframes cvRise{from{transform:translateY(2px)}to{transform:translateY(-4px)}}
    .s-conversion .cv-cl{font:800 34px/1.1 var(--font);color:#fff;letter-spacing:-.01em;text-align:center}

    /* the 1.0 seal: it slams down, the impact is at 46 percent of the animation */
    .s-conversion .cv-seal{position:absolute;left:1484px;top:132px;width:200px;height:200px;opacity:0;transform:scale(2.6) rotate(-26deg);transition:opacity .25s,transform 0s linear .25s}
    .s-conversion.s5 .cv-seal{opacity:1;transform:none;transition:opacity .2s,transform 0s}
    .s-conversion .cv-seal.slam{animation:cvSlam .75s both}
    @keyframes cvSlam{0%{opacity:0;transform:scale(2.8) rotate(-30deg);animation-timing-function:cubic-bezier(.55,0,.85,.4)}12%{opacity:1}46%{opacity:1;transform:scale(.88) rotate(-5deg);animation-timing-function:cubic-bezier(.2,.9,.3,1)}66%{transform:scale(1.07) rotate(-1deg);animation-timing-function:ease-in-out}100%{opacity:1;transform:none}}
    .s-conversion .cv-seal-in{position:relative;width:100%;height:100%;border-radius:50%;display:grid;place-items:center;transform:rotate(-9deg);background:radial-gradient(circle at 34% 28%,#FFE9D0 0%,#FFB366 34%,#FF8300 68%,#E9590C 100%);box-shadow:0 0 0 7px rgba(255,210,163,.28),0 0 80px rgba(255,131,0,.75),0 18px 50px rgba(0,0,0,.55)}
    .s-conversion .cv-seal-in::before{content:"";position:absolute;inset:13px;border-radius:50%;border:3px solid rgba(27,15,5,.55)}
    .s-conversion .cv-seal-in::after{content:"";position:absolute;inset:23px;border-radius:50%;border:1.5px dashed rgba(27,15,5,.4)}
    .s-conversion .cv-seal-in span{position:relative;font:900 90px/1 var(--font);letter-spacing:-.04em;color:#1b0f05}
    .s-conversion .cv-ring{position:absolute;left:1484px;top:132px;width:200px;height:200px;border-radius:50%;border:3px solid #FFB366;opacity:0}
    .s-conversion .cv-ring.go{animation:cvRing 1.2s var(--ease) both}
    @keyframes cvRing{0%{opacity:.9;transform:scale(.9)}100%{opacity:0;transform:scale(3)}}

    /* the timeline */
    .s-conversion .cv-time{position:absolute;left:0;top:0;width:1920px;height:1080px;pointer-events:none}
    .s-conversion .cv-track{position:absolute;left:130px;top:809px;width:1660px;height:6px;border-radius:3px;background:linear-gradient(90deg,rgba(255,255,255,.04),rgba(255,255,255,.17) 8%,rgba(255,255,255,.17) 92%,rgba(255,255,255,.04))}
    .s-conversion .cv-fill{position:absolute;left:130px;top:809px;width:0;height:6px;border-radius:3px;background:linear-gradient(90deg,rgba(255,131,0,.15),#FF8300 60%,#FFD2A3);box-shadow:0 0 22px rgba(255,131,0,.85);transition:width 1.1s var(--ease)}
    .s-conversion .cv-node{position:absolute;top:795px;width:34px;height:34px;border-radius:50%;background:#0B0B0C;border:3px solid rgba(255,255,255,.3);transition:background .6s,border-color .6s,box-shadow .6s,transform .6s var(--ease)}
    .s-conversion .cv-node.on{background:#FF8300;border-color:#FFD9B3;box-shadow:0 0 0 7px rgba(255,131,0,.2),0 0 32px #FF8300;transform:scale(1.12);transition-delay:.7s}
    .s-conversion .cv-node.now::after{content:"";position:absolute;inset:-12px;border-radius:50%;border:2px solid var(--wc-orange);animation:cvPulse 2.2s var(--ease) infinite}
    @keyframes cvPulse{0%{transform:scale(.6);opacity:.9}100%{transform:scale(1.7);opacity:0}}
    .s-conversion .cv-comet{position:absolute;left:118px;top:800px;width:24px;height:24px;border-radius:50%;background:radial-gradient(circle,#fff 0 30%,#FFD2A3 55%,#FF8300 100%);box-shadow:0 0 26px 8px rgba(255,131,0,.75);transition:left 1.1s var(--ease);animation:cvBreath 2.4s ease-in-out infinite}
    @keyframes cvBreath{50%{box-shadow:0 0 36px 12px rgba(255,131,0,.9)}}
    .s-conversion .cv-lbl{position:absolute;top:852px;width:320px;text-align:center}
    .s-conversion .cv-lbl b{display:block;font:800 26px/1.2 var(--font);letter-spacing:.04em;color:var(--wc-orange);transition:opacity .6s}
    .s-conversion .cv-lbl span{display:block;margin-top:6px;font:800 32px/1.15 var(--font);color:#fff;transition:opacity .6s}
    .s-conversion .cv-lbl.past b,.s-conversion .cv-lbl.past span{opacity:.74}

    /* no motion while jumping, and in calm mode */
    .s-conversion.cv-nt *,.s-conversion.cv-nt *::before,.s-conversion.cv-nt *::after{transition:none!important}
    body.calm .s-conversion *,body.calm .s-conversion *::before,body.calm .s-conversion *::after{animation:none!important;transition-duration:.01s!important;transition-delay:0s!important}`,
  init(ctx) {
    ctx.nodes = ctx.qa('.cv-node'); ctx.lbls = ctx.qa('.cv-lbl'); ctx.cards = ctx.qa('.cv-card');
    ctx.fill = ctx.q('.cv-fill'); ctx.comet = ctx.q('.cv-comet'); ctx.frame = ctx.q('.cv-frame'); ctx.sweep = ctx.q('.cv-sweep');
    ctx.ring = ctx.q('.cv-ring'); ctx.seal = ctx.q('.cv-seal'); ctx.title = ctx.q('.cv-title'); ctx.tm = [];
    ctx.fire = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
    /* one function paints the whole state for a step, so jumping, going back and printing all agree */
    ctx.apply = (i) => {
      for (let k = 1; k <= 5; k++) ctx.root.classList.toggle('s' + k, i >= k);
      ctx.nodes.forEach((n, k) => { n.classList.toggle('on', i >= k + 1); n.classList.toggle('now', i === k + 1); });
      ctx.lbls.forEach((l, k) => l.classList.toggle('past', i > k + 1));
      ctx.seal.classList.remove('slam');
      const x = i === 0 ? CV_X0 : CV_X[i - 1];
      ctx.fill.style.width = (x - CV_X0) + 'px'; ctx.comet.style.left = (x - 12) + 'px';
    };
  },
  enter(ctx) {
    /* start from the empty state with no transitions, so coming back never flashes an old picture */
    const r = ctx.root; r.classList.add('cv-nt'); ctx.apply(0); void r.offsetWidth; r.classList.remove('cv-nt');
  },
  step(ctx, i, dir, instant) {
    ctx.tm.forEach(clearTimeout); ctx.tm = [];
    ctx.apply(i);
    if (instant || dir < 0 || ctx.calm) return;
    const at = (ms, fn) => ctx.tm.push(ctx.after(ms, fn)), c = ctx.cards;
    if (i === 1) at(380, () => Fx.burstEl(c[0], { n: 20, color: '#FF8300', speed: 300 }));
    if (i === 2) { ctx.fire(ctx.frame, 'flash'); at(420, () => Fx.burstEl(ctx.frame, { n: 24, color: '#FFFFFF', speed: 360 })); }
    if (i === 3) { at(260, () => { ctx.fire(ctx.sweep, 'go'); ctx.fire(ctx.frame, 'flash'); }); at(520, () => Fx.burstEl(ctx.title, { n: 30, color: '#FFB366', speed: 340 })); }
    if (i === 4) { at(900, () => Fx.burstEl(c[1], { n: 24, color: '#4FB3FF', speed: 340 })); at(1250, () => Fx.burstEl(c[2], { n: 24, color: '#2BD576', speed: 340 })); }
    if (i === 5) { ctx.fire(ctx.seal, 'slam'); at(345, () => { ctx.fire(ctx.ring, 'go'); ctx.fire(ctx.frame, 'flash'); Fx.burstEl(ctx.seal, { n: 54, color: '#FF8300', speed: 520 }); Fx.burstEl(ctx.seal, { n: 24, color: '#FFE2C2', speed: 300 }); }); }
  },
  static(ctx) {
    ctx.root.classList.add('cv-nt'); ctx.apply(5); ctx.nodes.forEach((n) => n.classList.remove('now')); void ctx.root.offsetWidth;
  },
});
