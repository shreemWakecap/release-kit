/* Slide: the system around Connected Environment. What it talks to today (in the code) and what it could join (vision).
   Facts (research C6): sensors-service feeds weather, a queue feeds lightning, the maker's cloud feeds gas, node-service is the device list (C5 section 7 lists every call the backend makes);
   alerts go out to the Observation Manager (nine sources, section 7 H1), notification rules choose who is told (H2); gas does not reach the Observation Manager (C5 3.8, C6 section 9 R1), so the Gas chip has no line out and says "stays here";
   zones and positions (H3), the safety service that rings helmets by zone with no caller (H5), the Digital Work Permit service and the equipments service are separate (sections 5, 6); the links are vision (section 8). */
const PL_SV = (inner) => `<svg class="pl-ic" viewBox="0 0 64 64" aria-hidden="true">${inner}</svg>`;
const PL_IC = {
  tower: PL_SV('<circle cx="32" cy="22" r="3.5"/><path d="M23 14a13 13 0 0 1 18 0M17 8a21 21 0 0 1 30 0M32 28L24 56M32 28l8 28M26 44h12M20 56h24"/>'),
  list: PL_SV('<path d="M27 20h24M27 32h24M27 44h24"/><circle cx="15" cy="20" r="2.6"/><circle cx="15" cy="32" r="2.6"/><circle cx="15" cy="44" r="2.6"/>'),
  cloud: PL_SV('<path d="M18 46h26a10 10 0 0 0 1.6-19.9A14 14 0 0 0 18.4 30 8.5 8.5 0 0 0 18 46z"/>'),
  inbox: PL_SV('<path d="M10 34l7-18h30l7 18v14a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3z"/><path d="M10 34h15l3 6h8l3-6h15"/>'),
  bell: PL_SV('<path d="M32 10a14 14 0 0 1 14 14v10l4 8H14l4-8V24A14 14 0 0 1 32 10z"/><path d="M26 50a6 6 0 0 0 12 0"/>'),
  pin: PL_SV('<path d="M32 8a12 12 0 0 1 12 12c0 10-12 24-12 24S20 30 20 20A12 12 0 0 1 32 8z"/><circle cx="32" cy="20" r="4.5"/><path d="M14 54h36"/>'),
  helmet: PL_SV('<path d="M12 40a20 20 0 0 1 40 0"/><path d="M7 40h50v7H7z"/><path d="M32 20v20M23 23v17M41 23v17"/><path d="M8 20a26 26 0 0 1 6-9M56 20a26 26 0 0 0-6-9"/>'),
  permit: PL_SV('<rect x="15" y="12" width="34" height="44" rx="4"/><path d="M25 12V8h14v4M23 36l7 7 12-14"/>'),
  truck: PL_SV('<rect x="6" y="20" width="32" height="24" rx="2"/><path d="M38 28h10l10 10v6H38z"/><circle cx="19" cy="48" r="5.5"/><circle cx="46" cy="48" r="5.5"/>'),
};
const PL_PP = '<svg class="pl-pp" viewBox="0 0 44 56" width="44" height="56" aria-hidden="true"><circle cx="22" cy="14" r="8"/><path d="M5 50C5 30 39 30 39 50Z"/></svg>';
Deck.add({
  id: 'platform', section: 'tech', title: 'The system around Connected Environment', kicker: 'The paths · Around us', reality: ['code', 'vision'],
  steps: 4, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [4200, 5200, 5200, 5200, 6000], minutes: 1.2,
  notes: [
    'Step 1: our system takes data from sensors and the gas maker.',
    'Step 2: alerts go out, and rules choose who gets told.',
    'Gas does not go out yet.',
    'Step 3: zones and the helmet alarm run beside us, not joined.',
    'Step 4: work permits and equipment are separate services that could join.',
    'Nobody has built these links, and a person would approve every action.',
    'If asked: weather comes through the sensors service, lightning through a queue, and gas from the maker’s cloud. The device list is the node registry, and gas devices are not in it. Weather sends the start and end of each danger period, and lightning sends only red, fault and offline. Both go to the Observation Manager in the code, but delivery has not been seen live. Gas alerts do not reach it yet: the sending code is in master, but the Observation Manager code we read has no gas types and would drop them. The Observation Manager takes nine sources: connected worker, AVL, CCTV, manual, QR code, clinic violation, training center, digital work permit and weather station. Weather alerts carry no zone yet, so rules cannot aim at a zone. The safety service can ring helmets by zone, but no rule calls it. Permits and equipment have their own databases. Read from the code, deploy not verified.',
  ].join('\n'),
  html: `
    <h2 class="h2 pl-h" data-step="0">Part of a <span class="o glow-text">bigger system.</span></h2>
    <svg class="pl-svg" viewBox="0 0 1920 1080" width="1920" height="1080" aria-hidden="true"></svg>
    <div class="pl-hd" style="left:96px;width:344px" data-step="1">Comes in</div>
    <div class="pl-hd" style="left:1160px;width:664px" data-step="2">Goes out</div>
    <div class="pl-w" style="left:600px;top:300px;width:440px;height:330px" data-step="0" data-delay="250">
      <div class="pl-halo"></div>
      <div class="pl-core glass hot edge-glow">
        <div class="pl-core-t">Our system</div>
        <div class="pl-chip" style="top:96px;--c:#FF8300"><i></i>Weather</div>
        <div class="pl-chip" style="top:168px;--c:#4FB3FF"><i></i>Lightning</div>
        <div class="pl-chip" style="top:240px;--c:#2BD576"><i></i>Gas<span class="pl-nx" data-step="2" data-delay="1100">stays here</span></div>
      </div>
    </div>
    <div class="pl-w" style="left:96px;top:421px;width:344px;height:88px" data-step="1" data-delay="0"><div class="pl-n" style="--c:#FF8300">${PL_IC.tower}<b>Sensors</b></div></div>
    <div class="pl-w" style="left:96px;top:524px;width:344px;height:88px" data-step="1" data-delay="350"><div class="pl-n" style="--c:#2BD576">${PL_IC.cloud}<b>Gas maker</b></div></div>
    <div class="pl-w" style="left:96px;top:318px;width:344px;height:88px" data-step="1" data-delay="700"><div class="pl-n" style="--c:#F1E4D4">${PL_IC.list}<b>Device list</b></div></div>
    <div class="pl-w" style="left:1160px;top:316px;width:664px;height:120px" data-step="2" data-delay="300"><div class="pl-n pl-om sweepable" style="--c:#FFB366">${PL_IC.inbox}<b>Observation Manager</b><span class="pl-cnt"><u>0</u><em>sources</em></span></div></div>
    <div class="pl-w" style="left:1160px;top:526px;width:664px;height:104px" data-step="2" data-delay="900"><div class="pl-n" style="--c:#FFB366">${PL_IC.bell}<b>Who gets told</b><span class="pl-pps">${PL_PP}${PL_PP}${PL_PP}</span></div></div>
    <div class="pl-vh" data-step="3"><span>Could join</span><span class="rb rb-vision sm">Vision</span></div>
    <div class="pl-vc" data-step="4" data-delay="900">Nobody has built these links. A person approves.</div>
    <div class="pl-w" style="left:96px;top:736px;width:396px;height:160px" data-step="3" data-delay="500"><div class="pl-n vis">${PL_IC.pin}<b>Zones</b></div></div>
    <div class="pl-w" style="left:540px;top:736px;width:396px;height:160px" data-step="3" data-delay="900"><div class="pl-n vis">${PL_IC.helmet}<b>Helmet alarm</b></div></div>
    <div class="pl-w" style="left:984px;top:736px;width:396px;height:160px" data-step="4" data-delay="300"><div class="pl-n vis">${PL_IC.permit}<b>Work permits</b></div></div>
    <div class="pl-w" style="left:1428px;top:736px;width:396px;height:160px" data-step="4" data-delay="700"><div class="pl-n vis">${PL_IC.truck}<b>Equipment</b></div></div>
    <div class="src pl-src" data-step="0" data-delay="700">From the code, Oct 2026. Deploy not verified.</div>`,
  css: `
    .s-platform .pl-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-platform .pl-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-platform .pl-w{position:absolute}
    .s-platform .pl-hd{position:absolute;top:252px;padding-bottom:14px;border-bottom:1.5px solid rgba(255,255,255,.14);font:800 20px/1 var(--font);letter-spacing:.2em;text-transform:uppercase;color:#8E8E89}
    .s-platform .pl-halo{position:absolute;inset:0;border-radius:30px;border:2px solid var(--wc-orange);opacity:0;animation:platHalo 3.2s var(--ease) infinite}
    @keyframes platHalo{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.16,1.2);opacity:0}}
    .s-platform .pl-core{position:relative;width:100%;height:100%}
    .s-platform .pl-core-t{position:absolute;left:32px;top:28px;font:800 34px/1 var(--font);color:#fff}
    .s-platform .pl-chip{position:absolute;left:24px;right:24px;height:56px;display:flex;align-items:center;gap:16px;padding:0 22px;border-radius:16px;border:2px solid var(--c);background:rgba(0,0,0,.42);font:700 28px/1 var(--font);color:#fff}
    .s-platform .pl-chip i{flex:none;width:14px;height:14px;border-radius:50%;background:var(--c);box-shadow:0 0 14px var(--c)}
    .s-platform .pl-nx{margin-left:auto;padding:7px 14px;border-radius:999px;border:1.5px dashed rgba(255,255,255,.4);font:700 20px/1 var(--font);color:#C9C9C3;white-space:nowrap}
    .s-platform .pl-n{position:relative;width:100%;height:100%;display:flex;align-items:center;gap:22px;padding:0 28px;border-radius:22px;border:2px solid var(--c);background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.02)),#0F0F11;box-shadow:0 0 34px color-mix(in srgb,var(--c) 22%,transparent);transition:box-shadow .35s var(--ease),transform .35s var(--ease)}
    .s-platform .pl-n:hover{box-shadow:0 0 58px color-mix(in srgb,var(--c) 48%,transparent);transform:translateY(-3px)}
    .s-platform .pl-n b{font:800 33px/1.1 var(--font);color:#fff;white-space:nowrap}
    .s-platform .pl-ic{flex:none;width:58px;height:58px;fill:none;stroke:var(--ic,var(--c));stroke-width:3;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 8px rgba(255,131,0,.3))}
    .s-platform .pl-n.vis{--c:#C58BFF;border-style:dashed;border-color:rgba(197,139,255,.8);background:rgba(197,139,255,.06);flex-direction:column;justify-content:center;gap:10px}
    .s-platform .pl-n.vis .pl-ic{width:76px;height:76px;stroke-width:2.8;filter:drop-shadow(0 0 10px rgba(197,139,255,.45))}
    .s-platform .pl-cnt{margin-left:auto;display:flex;align-items:baseline;gap:10px;white-space:nowrap}
    .s-platform .pl-cnt u{text-decoration:none;font:900 54px/1 var(--font);color:#FFB366;text-shadow:0 0 24px rgba(255,131,0,.5)}
    .s-platform .pl-cnt em{font:600 26px/1 var(--font);font-style:normal;color:#D9D9D4}
    .s-platform .pl-pps{margin-left:auto;display:flex;gap:14px}
    .s-platform .pl-pp{width:40px;height:50px;fill:none;stroke:#6a6a70;stroke-width:2.4;transition:fill .6s var(--ease),stroke .6s var(--ease),filter .6s var(--ease)}
    .s-platform .pl-pp.on{fill:rgba(255,131,0,.34);stroke:#FFB366;filter:drop-shadow(0 0 8px rgba(255,131,0,.6))}
    .s-platform .pl-vh{position:absolute;left:96px;top:648px;display:flex;align-items:center;gap:18px;font:800 20px/1 var(--font);letter-spacing:.2em;text-transform:uppercase;color:#C58BFF}
    .s-platform .pl-vc{position:absolute;right:96px;top:648px;font:600 26px/1.1 var(--font);color:#D9D9D4}
    .s-platform .pl-src{position:absolute;left:96px;top:966px}
    .s-platform.no-trans .pl-pp{transition:none!important}
    body.calm .s-platform .pl-halo{animation:none!important}`,
  init(ctx) {
    const svg = ctx.q('.pl-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg);
    const C = { w: '#FF8300', l: '#4FB3FF', g: '#2BD576', s: '#F1E4D4', a: '#FFB366', v: '#C58BFF' };
    ctx.lines = []; ctx.flows = []; ctx.tok = 0;
    const head = (g, x, y, dir, col) => mk('polygon', { points: dir === 'd' ? `${x},${y} ${x - 8},${y - 13} ${x + 8},${y - 13}` : `${x},${y} ${x - 13},${y - 8} ${x - 13},${y + 8}`, fill: col }, g);
    const line = (at, d, col, o = {}) => {
      const g = mk('g', { 'data-step': at, 'data-delay': o.delay || 0 });
      const p = mk('path', { d, stroke: col, 'stroke-width': o.dash ? 2.8 : 3.2, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
      if (o.dash) p.setAttribute('stroke-dasharray', '8 9'); else p.setAttribute('filter', 'url(#fx-glow-u)');
      if (o.tip) head(g, o.tip[0], o.tip[1], o.tip[2], col);
      ctx.lines.push({ at, p, dash: !!o.dash, delay: o.delay || 0, shown: false });
      if (o.flow) { const f = ctx.flow(p, Object.assign({ color: col, count: 2, speed: 190, r: 6, tail: 6, tailGap: 12 }, o.flow)); f.stop().show(false); ctx.flows.push({ at, f, dl: o.delay || 0 }); }
    };
    /* comes in: sensors split into weather and lightning, the gas maker feeds gas, the device list feeds all */
    line(1, 'M440 465 C520 465 510 424 590 424', C.w, { tip: [600, 424, 'r'], flow: { count: 3 } });
    line(1, 'M440 465 C520 465 510 496 590 496', C.l, { tip: [600, 496, 'r'], flow: { count: 3 } });
    line(1, 'M440 568 H590', C.g, { tip: [600, 568, 'r'], delay: 350, flow: { count: 3 } });
    line(1, 'M440 362 H590', C.s, { tip: [600, 362, 'r'], delay: 700, flow: { count: 2 } });
    /* goes out: weather and lightning go to the Observation Manager (gas does not), then to the people */
    line(2, 'M1040 424 C1090 424 1090 376 1150 376', C.w, { tip: [1160, 376, 'r'], delay: 100, flow: { count: 3 } });
    line(2, 'M1040 496 C1090 496 1090 376 1150 376', C.l, { tip: [1160, 376, 'r'], delay: 100, flow: { count: 3 } });
    line(2, 'M1492 436 V516', C.a, { tip: [1492, 526, 'd'], delay: 700, flow: { count: 1, tail: 4, tailGap: 11, speed: 110 } });
    /* could join: dashed lines from our system down to four neighbours */
    const bus = (x2) => { const s = x2 < 820 ? -1 : 1; return `M820 630 V692 H${x2 - s * 16} Q${x2} 692 ${x2} 708 V726`; };
    [[294, 3, 400], [738, 3, 800], [1182, 4, 200], [1626, 4, 600]].forEach(([x2, at, dl]) => line(at, bus(x2), C.v, { dash: true, tip: [x2, 736, 'd'], delay: dl, flow: { count: 2, speed: 130, r: 5, tail: 5, tailGap: 11 } }));
    ctx.cnt = ctx.q('.pl-cnt u'); ctx.pps = ctx.qa('.pl-pp'); ctx.om = ctx.q('.pl-om'); ctx.vis = ctx.qa('.pl-n.vis');
    const setNum = (el, v) => { if (el._cnt) el._cnt.stop = true; el.textContent = v; };
    /* state for step i. quick = no animation (jump, back, print) */
    ctx.render = (i, quick, dir) => {
      const tok = ++ctx.tok, live = (n) => tok === ctx.tok && ctx.step >= n;
      ctx.lines.forEach((L) => {
        const on = i >= L.at;
        if (on && !L.shown) {
          L.shown = true;
          if (quick || L.dash) { L.p.style.strokeDasharray = L.dash ? '8 9' : ''; L.p.style.strokeDashoffset = ''; } else Fx.draw(L.p, 900, L.delay);
        } else if (!on && L.shown) {
          L.shown = false; L.p.style.transition = 'none'; L.p.style.strokeDasharray = L.dash ? '8 9' : ''; L.p.style.strokeDashoffset = '';
        }
      });
      ctx.flows.forEach(({ at, f, dl }) => {
        if (i >= at) { const go = () => { if (ctx.step >= at) { f.show(true); f.start(); } }; if (quick) go(); else if (!f.want) ctx.after(dl + 950, go); } else { f.stop(); f.show(false); }
      });
      if (i < 2) { setNum(ctx.cnt, '0'); ctx.c9 = false; } else if (quick) { setNum(ctx.cnt, '9'); ctx.c9 = true; } else if (!ctx.c9) { ctx.c9 = true; Fx.counter(ctx.cnt, 9, { dur: 1200, delay: 650 }); }
      ctx.pps.forEach((el, k) => { if (i < 2) el.classList.remove('on'); else if (quick) el.classList.add('on'); else if (!el.classList.contains('on')) ctx.after(1600 + k * 280, () => { if (ctx.step >= 2) el.classList.add('on'); }); });
      if (!quick && dir > 0) {
        if (i === 2) { ctx.after(500, () => { if (live(2)) Fx.sweep(ctx.om); }); ctx.after(2000, () => { if (live(2)) Fx.burstEl(ctx.cnt, { n: 24, color: '#FFB366', speed: 320 }); }); }
        if (i === 3) ctx.after(900, () => { if (live(3)) ctx.vis.slice(0, 2).forEach((n) => Fx.burstEl(n, { n: 14, color: '#C58BFF', speed: 260 })); });
        if (i === 4) ctx.after(700, () => { if (live(4)) ctx.vis.slice(2).forEach((n) => Fx.burstEl(n, { n: 14, color: '#C58BFF', speed: 260 })); });
      }
    };
  },
  step(ctx, i, dir, instant) { ctx.render(i, instant || dir < 0 || ctx.calm, dir); },
  static(ctx) { ctx.render(4, true, 1); ctx.flows.forEach(({ f }) => f.show(true).freeze()); },
});
