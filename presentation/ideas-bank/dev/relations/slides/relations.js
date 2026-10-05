/* Slide: The relations, with numbers. The chain from a hot hour to money and to lives, link by link, each link with its published rate.
   Then what prevention returned in two proposed rules, then what is known and what is not. Stat slide: publisher and year on the slide in .src lines.
   Numbers (verified shortlist only):
   - WHO and WMO 2025 (S1-08): worker output drops 2 to 3 percent for every degree above 20 C (WBGT).
   - Lancet Countdown 2025 (S1-06): 639 billion potential work hours and US$1.09 trillion potential income lost in 2024. Modelled. 1.09 trillion / 639 billion = US$1.71 an hour (our division).
   - IZA 2021 (S1-09): injury risk +5 to 7 percent on 85 to 90 F days, +10 to 15 percent above 100 F (California).
   - ILO 2024 report, 2020 data (S1-03): 22.85 million injuries and 18,970 deaths a year from excessive heat. 22.85 million / 18,970 = about 1,200 injuries per death (our division).
   - OSHA 2024 proposed rule (S1-16): cost US$7.8 billion a year, benefits US$9.179 billion a year. 9.179 / 7.8 = 1.18 (our division). A projection, not final.
   - Cal/OSHA 2023 proposal (S1-17): benefits US$4.0 billion over 10 years, direct cost about US$1.0 billion over 10 years. 4.0 / 1.0 = 4.0 (our division). A projection.
   An illustration, never a WakeCap result. */
Deck.add({
  id: 'relations', section: 'numbers', title: 'The relations, with numbers', kicker: 'The numbers · Relations', reality: ['stat'],
  steps: 4, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [4000, 5200, 5200, 5200, 5200], minutes: 1.5,
  notes: [
    'This is the chain from a hot hour to lives and money.',
    'Every link is a published rate, not our result.',
    'Step 1: two to three percent less work per degree over twenty.',
    'Step 2: hot days raise injury risk by five to fifteen percent.',
    'Step 3: prevention returns more than it costs in two proposed rules.',
    'Step 4: we know the rates, not your site’s own result.',
    'If asked: WHO and WMO 2025 gives 2 to 3 percent per degree above 20 °C WBGT. The Lancet Countdown 2025 report (2024 data) gives 639 billion hours and US$1.09 trillion, a model, so about US$1.71 an hour. IZA 2021 (California) gives +5 to 7 percent at 85 to 90 °F and +10 to 15 percent above 100 °F, against days in the 60s. ILO’s 2024 report (2020 data) estimates 22.85 million injuries and 18,970 deaths a year from heat, so about 1,200 injuries for each death. OSHA’s 2024 proposal: US$7.8 billion a year in cost, US$9.179 billion a year in benefits, 531 deaths and 16,027 injuries prevented. It is a projection, not final, and it depends on how deaths and injuries are counted. Cal/OSHA’s 2023 proposal covers indoor work in California: about US$4.0 billion in benefits against about US$1.0 billion in cost over 10 years, and 57 percent of the benefit is output. The research found no Saudi count of heat injuries or deaths.',
  ].join('\n'),
  html: `
    <h2 class="h2 rl-h" data-step="0">The relations, <span class="o glow-text">with numbers</span></h2>
    <p class="lead rl-lead" data-step="0" data-delay="200">Published rates. Not a WakeCap result.</p>
    <svg class="rl-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>

    <div class="rl-node rl-start live" data-step="0" data-delay="250"><i class="rl-halo"></i><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg><b>Hot hours</b></div>

    <div class="rl-node la rl-a2" data-step="0" data-delay="400"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg><b>Hours lost</b></div>
    <div class="rl-node la rl-a4" data-step="0" data-delay="500"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2.5"/><circle cx="12" cy="12" r="3"/></svg><b>Money lost</b></div>
    <div class="rl-node lb rl-b2" data-step="0" data-delay="600"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg><b>Injuries</b></div>
    <div class="rl-node lb rl-b4" data-step="0" data-delay="700"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.6-9.2-9.1C1.4 8.8 3.2 5 6.6 5c2 0 3.5 1.1 5.4 3.1C13.9 6.1 15.4 5 17.4 5c3.4 0 5.2 3.8 3.8 6.9C19 16.4 12 21 12 21z"/></svg><b>Lives lost</b></div>

    <div class="rl-up" style="left:490px;top:282px;width:410px" data-step="1" data-delay="250"><b class="rl-fig"><span class="n" data-to="2">2</span> to <span class="n" data-to="3">3</span>% less work</b></div>
    <div class="rl-dn" style="left:490px;top:366px;width:410px" data-step="1" data-delay="450"><div class="rl-cap">per degree above 20 °C</div><div class="src">WHO and WMO, 2025</div></div>
    <div class="rl-up" style="left:1170px;top:282px;width:380px" data-step="1" data-delay="1050"><b class="rl-fig">US$<span class="n" data-to="1.71" data-dec="2">1.71</span></b></div>
    <div class="rl-dn" style="left:1170px;top:366px;width:380px" data-step="1" data-delay="1250"><div class="rl-cap">per lost hour</div><div class="src">Lancet Countdown, 2024 data. A model.</div><div class="src">US$1.09 trillion for 639 billion hours.</div></div>

    <div class="rl-up" style="left:490px;top:472px;width:410px" data-step="2" data-delay="250"><b class="rl-fig"><span class="n" data-to="5">5</span> to <span class="n" data-to="15">15</span>%</b></div>
    <div class="rl-dn" style="left:490px;top:556px;width:410px" data-step="2" data-delay="450"><div class="rl-cap">more injury risk</div><div class="src">IZA, 2021, California.</div><div class="src">85 °F and up, against 60s °F.</div></div>
    <div class="rl-up" style="left:1170px;top:472px;width:380px" data-step="2" data-delay="1050"><b class="rl-fig">1 death</b></div>
    <div class="rl-dn" style="left:1170px;top:556px;width:380px" data-step="2" data-delay="1250"><div class="rl-cap">per <span class="n" data-to="1200">1,200</span> injuries</div><div class="src">ILO estimate, 2020 data (report 2024).</div><div class="src">22.85 million injuries, 18,970 deaths.</div></div>

    <div class="rl-ret glass sweepable" data-step="3">
      <div class="rl-rh">Returns on prevention</div>
      <div class="rl-ch" style="left:554px">Spend</div><div class="rl-ch" style="left:867px">Get back</div>
      <svg class="rl-coins" viewBox="0 0 1728 224" width="1728" height="224"></svg>
      <div class="rl-rn" style="top:56px"><b>OSHA proposal, 2024</b><span class="src">US$9.179 billion for US$7.8 billion a year.</span></div>
      <div class="rl-v rl-vs" style="top:76px">US$1</div>
      <div class="rl-v rl-vg" style="top:68px">US$<span class="n" data-to="1.18" data-dec="2">1.18</span></div>
      <div class="rl-tag" style="top:74px">Projection</div>
      <div class="rl-rn" style="top:132px"><b>Cal/OSHA Board proposal, 2023</b><span class="src">US$4.0 billion for about US$1.0 billion, 10 years.</span></div>
      <div class="rl-v rl-vs" style="top:152px">US$1</div>
      <div class="rl-v rl-vg" style="top:144px">US$<span class="n" data-to="4" data-dec="1">4.0</span></div>
      <div class="rl-tag" style="top:150px">Projection</div><div class="rl-tag rl-tag2" style="top:150px">Indoors only</div>
    </div>

    <div class="rl-knrow"><div class="rl-kn rl-known" data-step="4"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M7 12.5l3.2 3.2L17 8.8"/></svg><b>Known:</b><span>the published rates</span></div>
    <div class="rl-kn rl-unk" data-step="4" data-delay="300"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke-dasharray="3 3"/><path d="M9.2 9.2a2.9 2.9 0 1 1 4.6 2.3c-1 .7-1.8 1.2-1.8 2.6M12 17.4v.2"/></svg><b>Not known:</b><span>your site’s own result</span></div></div></div>`,
  css: `
    .s-relations .rl-h{position:absolute;left:96px;top:104px;width:1700px;font-size:62px}
    .s-relations .rl-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-relations .rl-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-relations .rl-sk{fill:none;stroke:rgba(255,255,255,.2);stroke-width:2.4;stroke-dasharray:9 10}
    .s-relations .rl-ln{fill:none;stroke-width:3.6;stroke-linecap:round;opacity:0}
    .s-relations .rl-node{position:absolute;width:260px;height:104px;border-radius:22px;border:2px dashed rgba(255,255,255,.24);background:rgba(255,255,255,.02);display:flex;align-items:center;gap:14px;padding:0 20px;color:rgba(255,255,255,.42);transition:opacity .75s var(--ease),transform .75s var(--ease),filter .75s var(--ease),border-color .7s var(--ease),background .7s var(--ease),color .7s var(--ease),box-shadow .7s var(--ease)}
    .s-relations .rl-node svg{flex:none;width:40px;height:40px;fill:none;stroke:currentColor;stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round}
    .s-relations .rl-node b{font:800 29px/1.05 var(--font);white-space:nowrap}
    .s-relations .rl-node.live{border-style:solid;background:#0F0F11;color:#fff}
    .s-relations .rl-node.live svg{stroke:var(--c,#FFB366)}
    .s-relations .la{--c:#FF8300;--g:rgba(255,131,0,.38)}.s-relations .lb{--c:#F1E4D4;--g:rgba(241,228,212,.24)}
    .s-relations .rl-node.live.la,.s-relations .rl-node.live.lb{border-color:var(--c);box-shadow:0 0 38px var(--g)}
    .s-relations .rl-start{left:96px;top:393px;width:240px;--c:#FF8300;border-color:#FF8300;box-shadow:0 0 48px rgba(255,131,0,.5)}
    .s-relations .rl-start svg{stroke:#FFB366;animation:rlSun 30s linear infinite}
    @keyframes rlSun{to{transform:rotate(360deg)}}
    body.calm .s-relations .rl-start svg{animation:none}
    .s-relations .rl-halo{position:absolute;inset:-2px;border-radius:22px;box-shadow:0 0 0 0 rgba(255,131,0,.5);animation:rlHalo 2.6s ease-out infinite;pointer-events:none}
    @keyframes rlHalo{0%{box-shadow:0 0 0 0 rgba(255,131,0,.5)}100%{box-shadow:0 0 0 26px rgba(255,131,0,0)}}
    body.calm .s-relations .rl-halo{animation:none}
    .s-relations .rl-a2{left:900px;top:298px}.s-relations .rl-a4{left:1560px;top:298px}
    .s-relations .rl-b2{left:900px;top:488px}.s-relations .rl-b4{left:1560px;top:488px}
    .s-relations .rl-up{position:absolute;height:54px;display:flex;align-items:flex-end;justify-content:center;text-align:center}
    .s-relations .rl-dn{position:absolute;text-align:center}
    .s-relations .rl-fig{font:900 38px/1 var(--font);letter-spacing:-.02em;color:#fff;white-space:nowrap;text-shadow:0 0 28px rgba(255,131,0,.5)}
    .s-relations .rl-cap{font:600 25px/1.15 var(--font);color:#E6E6E2}
    .s-relations .rl-dn .src{margin-top:4px;font-size:19px;line-height:1.2;color:#A3A39E}
    .s-relations .rl-dn .rl-cap+.src{margin-top:8px}
    .s-relations .rl-ret{position:absolute;left:96px;top:668px;width:1728px;height:224px}
    .s-relations .rl-rh{position:absolute;left:34px;top:20px;font:800 22px/1 var(--font);letter-spacing:.14em;text-transform:uppercase;color:var(--wc-orange-soft)}
    .s-relations .rl-ch{position:absolute;top:22px;font:800 20px/1 var(--font);letter-spacing:.14em;text-transform:uppercase;color:#A3A39E}
    .s-relations .rl-coins{position:absolute;left:0;top:0;overflow:visible}
    .s-relations .rl-coin{transform-box:fill-box;transform-origin:center;transform:scale(0);transition:transform .55s cubic-bezier(.2,.9,.3,1.3) calc(var(--i) * 110ms + 350ms)}
    .s-relations .rl-ret.in .rl-coin{transform:scale(1)}
    .s-relations.no-trans .rl-coin,body.calm .s-relations .rl-coin{transition:none!important}
    .s-relations .rl-rn{position:absolute;left:34px;width:510px}
    .s-relations .rl-rn b{display:block;font:800 27px/1.1 var(--font);color:#fff}
    .s-relations .rl-rn .src{display:block;margin-top:5px;font-size:19px;line-height:1.2;color:#A3A39E}
    .s-relations .rl-v{position:absolute;font:800 36px/1 var(--font);color:#fff}
    .s-relations .rl-vs{left:632px}
    .s-relations .rl-vg{left:1136px;font-size:50px;font-weight:900;color:#FFB366;text-shadow:0 0 30px rgba(255,131,0,.55)}
    .s-relations .rl-tag{position:absolute;right:34px;padding:9px 20px;border-radius:999px;border:1.5px dashed rgba(255,255,255,.5);font:700 22px/1 var(--font);color:#E6E6E2}
    .s-relations .rl-tag.rl-tag2{right:200px;border-style:solid;border-color:#FFB366;color:#FFD2A3}
    .s-relations .rl-knrow{position:absolute;left:96px;top:914px;display:flex;gap:36px}
    .s-relations .rl-kn{height:72px;display:flex;align-items:center;gap:16px;padding:0 34px 0 26px;border-radius:999px;font:500 28px/1 var(--font);color:#E6E6E2;white-space:nowrap}
    .s-relations .rl-kn b{font-weight:800;color:#fff}
    .s-relations .rl-kn svg{flex:none;width:36px;height:36px;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
    .s-relations .rl-known{border:2px solid #fff;background:rgba(255,255,255,.06)}
    .s-relations .rl-known svg{stroke:#fff}
    .s-relations .rl-unk{border:2px dashed #FFB366;background:rgba(255,131,0,.06)}
    .s-relations .rl-unk svg{stroke:#FFB366}
    .s-relations .rl-unk b{color:#FFB366}`,
  init(ctx) {
    const svg = ctx.q('.rl-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg);
    const COL = { a: '#FF8300', b: '#F1E4D4' };
    /* the four roads: weather goes right, work lane on top (orange), people lane below (cream) */
    const ROAD = {
      a1: ['a', 'M336 445 C 412 445, 412 350, 492 350 L 900 350'], a2: ['a', 'M1160 350 L 1560 350'],
      b1: ['b', 'M336 445 C 412 445, 412 540, 492 540 L 900 540'], b2: ['b', 'M1160 540 L 1560 540'],
    };
    ctx.ln = {}; ctx.fl = {};
    Object.keys(ROAD).forEach((k) => { const [l, d] = ROAD[k]; mk('path', { class: 'rl-sk', d }); });
    Object.keys(ROAD).forEach((k) => {
      const [l, d] = ROAD[k];
      ctx.ln[k] = mk('path', { class: 'rl-ln', d, stroke: COL[l], filter: 'url(#fx-glow-u)' });
    });
    /* arrow heads, one per link end */
    const head = (x, y, l, step, delay) => mk('polygon', { points: `${x},${y} ${x - 15},${y - 9} ${x - 15},${y + 9}`, fill: COL[l], 'data-step': step, 'data-delay': delay });
    head(900, 350, 'a', 1, 800); head(1560, 350, 'a', 1, 1700); head(900, 540, 'b', 2, 800); head(1560, 540, 'b', 2, 1700);
    /* invisible roads for the glowing packets */
    Object.keys(ROAD).forEach((k) => {
      const [l, d] = ROAD[k], road = mk('path', { d, stroke: 'none', fill: 'none' });
      const f = ctx.flow(road, { color: COL[l], count: 3, speed: 230, r: 6.5, tail: 7, tailGap: 13 }); f.stop().show(false); ctx.fl[k] = f;
    });
    /* coins for the two returns rows: one white coin spent, then the coins that come back */
    const cs = ctx.q('.rl-coins'), defs = mk('defs', {}, cs); let n = 0;
    const coin = (cx, cy, col, frac, id) => {
      const g = mk('g', { class: 'rl-coin', style: `--i:${n++}` }, cs);
      if (frac < 1) {
        mk('circle', { cx, cy, r: 23, fill: 'none', stroke: col, 'stroke-width': 1.6, 'stroke-dasharray': '4 5', opacity: .45 }, g);
        const cp = mk('clipPath', { id }, defs); mk('rect', { x: cx - 23, y: cy - 30, width: 46 * frac, height: 60 }, cp);
        const inner = mk('g', { 'clip-path': `url(#${id})` }, g);
        mk('circle', { cx, cy, r: 23, fill: 'rgba(255,131,0,.22)', stroke: col, 'stroke-width': 3.2 }, inner);
        return;
      }
      mk('circle', { cx, cy, r: 23, fill: col === '#fff' ? 'rgba(255,255,255,.12)' : 'rgba(255,131,0,.22)', stroke: col, 'stroke-width': 3.2, filter: col === '#fff' ? '' : 'url(#fx-glow-soft)' }, g);
      mk('circle', { cx, cy, r: 14, fill: 'none', stroke: col, 'stroke-width': 1.6, opacity: .55 }, g);
    };
    [[96 + 0, 0, 1.18], [172, 1, 4]].forEach(([_, row, back], r) => {
      const cy = r === 0 ? 94 : 170;
      coin(590, cy, '#fff', 1, '');
      const x0 = 890, whole = Math.floor(back), part = back - whole;
      for (let i = 0; i < whole; i++) coin(x0 + 56 * i, cy, '#FF8300', 1, '');
      if (part > .001) coin(x0 + 56 * whole, cy, '#FF8300', part, 'rl-clip-' + r);
      /* the arrow from spent to back */
      mk('path', { d: `M742 ${cy} H830`, stroke: 'rgba(255,255,255,.55)', 'stroke-width': 2.6, fill: 'none', 'stroke-linecap': 'round', class: 'rl-coin', style: `--i:${n++}` }, cs);
      mk('polygon', { points: `${846},${cy} ${830},${cy - 9} ${830},${cy + 9}`, fill: 'rgba(255,255,255,.7)', class: 'rl-coin', style: `--i:${n}` }, cs);
    });
    /* numbers that count up */
    ctx.nums = (root, animate, delay) => {
      root.querySelectorAll('.n').forEach((el) => {
        const to = +el.dataset.to, dec = +el.dataset.dec || 0;
        if (el._cnt) el._cnt.stop = true;
        if (animate && !ctx.calm) Fx.counter(el, to, { from: 0, dur: 1000, dec, delay });
        else el.textContent = Fx.fmt(to, dec);
      });
    };
    ctx.lane = { a: false, b: false }; ctx.gen = { a: 0, b: 0 };
    ctx.setLane = (k, on, animate) => {
      ctx.lane[k] = on; const gen = ++ctx.gen[k], live = () => ctx.gen[k] === gen && ctx.lane[k];
      const l1 = ctx.ln[k + '1'], l2 = ctx.ln[k + '2'], nodes = ctx.qa('.rl-' + k + '2, .rl-' + k + '4'), nodeA = nodes[0], nodeB = nodes[1], f1 = ctx.fl[k + '1'], f2 = ctx.fl[k + '2'];
      const lines = [l1, l2];
      if (!on) {
        lines.forEach((l) => { l.style.transition = 'none'; l.style.strokeDasharray = ''; l.style.strokeDashoffset = ''; l.style.opacity = 0; });
        nodes.forEach((n) => n.classList.remove('live')); [f1, f2].forEach((f) => { f.stop().show(false); }); return;
      }
      const run = (l, ms, delay, vis) => { l.style.transition = 'none'; l.style.opacity = 1; Fx.draw(l, ms, delay); };
      if (animate) {
        run(l1, 800, 0); f1.show(true).start();
        ctx.after(800, () => { if (live()) nodeA.classList.add('live'); });
        ctx.after(700, () => { if (live()) { run(l2, 800, 0); f2.show(true).start(); } });
        ctx.after(1600, () => { if (live()) nodeB.classList.add('live'); });
        const grp = ctx.qa(`[data-step="${k === 'a' ? 1 : 2}"]`);
        grp.forEach((el) => ctx.nums(el, true, 400 + (+el.dataset.delay || 0)));
      } else {
        lines.forEach((l) => { l.style.transition = 'none'; l.style.strokeDasharray = ''; l.style.strokeDashoffset = ''; l.style.opacity = 1; });
        nodes.forEach((n) => n.classList.add('live')); [f1, f2].forEach((f) => { f.show(true).start(); });
        ctx.qa(`[data-step="${k === 'a' ? 1 : 2}"]`).forEach((el) => ctx.nums(el, false));
      }
    };
  },
  step(ctx, i, dir, instant) {
    const go = !instant && dir > 0 && !ctx.calm;
    ['a', 'b'].forEach((k, n) => { const s = n + 1; ctx.setLane(k, i >= s, go && i === s); });
    const ret = ctx.q('.rl-ret');
    if (go && i === 3) { ctx.nums(ret, true, 500); ctx.after(450, () => Fx.sweep(ret)); ctx.after(1500, () => Fx.burstEl(ctx.qa('.rl-vg')[1], { n: 22, color: '#FF8300', speed: 300 })); } else ctx.nums(ret, false);
    if (go && i === 4) ctx.after(250, () => Fx.sweep(ctx.q('.rl-known')));
  },
  static(ctx) {
    ['a', 'b'].forEach((k) => ctx.setLane(k, true, false)); ctx.nums(ctx.root, false);
    Object.values(ctx.fl).forEach((f) => f.show(true).freeze());
  },
});
