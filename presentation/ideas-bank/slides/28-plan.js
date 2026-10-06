/* Slide: Plan: suggested work plans. One idea: the system suggests a day plan and a person approves it. Vision: nobody built it. No numbers on purpose.
   Step 0 the day as planned: three tasks sit in the hot hours. 1 the forecast colours the day (cool, warm, hot); heavy tasks glow red.
   2 heavy tasks glide into the cool hours (dashed = suggested). 3 rest breaks light up where it is warm (from the Safety Policy).
   4 a person presses Approve and the plan turns solid.
   Facts: the bands give work, rest and water; the Normal band has no limit (research C2 5.3). The Observation Manager code has two assistants (exports, templates) that work by proposal and confirm (C6 H9). */
Deck.add({
  id: 'plan', section: 'future', title: 'Plan: suggested work plans', kicker: 'What it can do · Work plans', reality: ['vision'],
  steps: 4, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [3600, 4400, 4400, 3400, 5600], minutes: 1,
  notes: [
    'A plan is a list of tasks for the day.',
    'Step 1: a forecast would show cool hours and hot hours.',
    'Step 2: heavy work moves to cool hours, and indoor work stays.',
    'Step 3: where it is warmer, the Safety Policy adds rest breaks.',
    'Step 4: a person checks the plan and approves it.',
    'This is a vision, and nobody has built it.',
    'If asked: the Safety Policy already gives work, rest and water for each heat band. In the standard set the Normal band has no work or rest limit. Extreme Caution is 50 minutes of work and 10 of rest. Danger is 30 and 10. A project can set its own bands. We found no forecast code and no plan suggester in our code. The Observation Manager code has two assistants, for exports and templates. Each one proposes, a person confirms, then it runs. The tasks in this picture are examples.',
  ].join('\n'),
  html: `
    <h2 class="h2 wpn-h" data-step="0">Heavy work in <span class="o glow-text">cool hours.</span></h2>
    <p class="lead wpn-lead" data-step="0" data-delay="200">The system suggests. A person approves.</p>
    <div class="wpn-cols" data-step="0" data-delay="300">
      <div class="wpn-col" style="left:430px;width:376px;--c:#22C55E;--d:.1s"><b>Cool</b></div>
      <div class="wpn-col" style="left:806px;width:182px;--c:#F5A524;--d:.4s"></div>
      <div class="wpn-col hot" style="left:988px;width:362px;--c:#FF4D4D;--d:.62s"><b>Hot</b></div>
      <div class="wpn-col" style="left:1350px;width:167px;--c:#F5A524;--d:1s"></div>
      <div class="wpn-col" style="left:1517px;width:307px;--c:#22C55E;--d:1.18s"><b>Cool</b></div>
      <i class="wpn-scan"></i>
    </div>
    <div class="wpn-axis" data-step="0" data-delay="400"></div>
    <div class="wpn-lane" style="top:352px" data-step="0" data-delay="450"><div class="wpn-ln"><span class="ic"><svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 44V6M4 10h38M14 6l-8 4M14 6l22 4M34 10v16M34 26a3 3 0 1 1-3 3"/><rect x="27" y="35" width="14" height="8" rx="1.5"/></svg></span><span>Lift steel</span></div><i class="wpn-track"></i></div>
    <div class="wpn-lane" style="top:502px" data-step="0" data-delay="600"><div class="wpn-ln"><span class="ic"><svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 28L22 12l18 16M10 24v18h24V24"/><circle cx="40" cy="9" r="4"/></svg></span><span>Roof work</span></div><i class="wpn-track"></i></div>
    <div class="wpn-lane" style="top:652px" data-step="0" data-delay="750"><div class="wpn-ln"><span class="ic"><svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="7" width="30" height="35" rx="2"/><path d="M17 15h4M27 15h4M17 23h4M27 23h4M20 42V32h8v10"/></svg></span><span>Indoor work</span></div><i class="wpn-track"></i></div>
    <div class="wpn-blocks" data-step="0" data-delay="900">
      <i class="wpn-ghost" style="left:1000px;top:352px;width:320px"></i>
      <i class="wpn-ghost" style="left:1000px;top:502px;width:344px"></i>
      <div class="wpn-blk heavy b1" style="left:600px;top:352px;width:320px"><i class="s" style="width:206px"></i><i class="s" style="width:44px"></i><i class="s r" style="width:26px"></i><i class="s" style="width:44px"></i></div>
      <div class="wpn-blk heavy b2" style="left:1403px;top:502px;width:344px"><i class="s" style="width:44px"></i><i class="s r" style="width:26px"></i><i class="s" style="width:44px"></i><i class="s" style="width:230px"></i></div>
      <div class="wpn-blk b3" style="left:1019px;top:652px;width:300px"><i class="s" style="width:300px"></i></div>
    </div>
    <p class="wpn-cap" data-step="3" data-delay="500"><i class="sw w"></i> Work and <i class="sw r"></i> rest from the Safety Policy.</p>
    <div class="wpn-state" data-step="2" data-delay="1100"><span class="st sug">Suggested</span><span class="st app"><svg viewBox="0 0 40 40" width="30" height="30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 21 L17 30 L33 11"/></svg>Approved</span></div>
    <div class="wpn-act" data-step="4">
      <svg class="wpn-av" viewBox="-40 -40 80 80" width="80" height="80" aria-hidden="true"><circle r="38"/><circle class="h" cx="0" cy="-9" r="12"/><path d="M-22 22 C-22 3 22 3 22 22"/></svg>
      <div class="wpn-ok sweepable"><svg class="wpn-ck" viewBox="0 0 40 40" aria-hidden="true"><path d="M8 21 L17 30 L33 11"/></svg><span>Approve</span></div>
    </div>
    <svg class="wpn-cur" viewBox="0 0 26 40" width="26" height="40" aria-hidden="true"><path d="M0 0 L0 33 L8.5 25.5 L14.5 38 L21 35 L15 22.5 L26 22 Z" fill="#fff" stroke="#0B0B0C" stroke-width="2.2" stroke-linejoin="round"/></svg>`,
  css: `
    .s-plan .wpn-h{position:absolute;left:96px;top:104px;width:1500px;margin:0;font-size:62px}
    .s-plan .wpn-lead{position:absolute;left:96px;top:196px;width:1300px;margin:0;font-size:27px}
    .s-plan .wpn-cols,.s-plan .wpn-blocks{position:absolute;left:0;top:0;width:1920px;height:1080px;pointer-events:none}
    /* the day: five windows. They start grey and take their colour when the forecast arrives (step 1). */
    .s-plan .wpn-col{position:absolute;top:296px;height:510px;background:rgba(255,255,255,.03);border-left:1px solid rgba(255,255,255,.08)}
    .s-plan .wpn-col::before{content:"";position:absolute;inset:0;border-top:5px solid var(--c);background:linear-gradient(180deg,color-mix(in srgb,var(--c) 32%,transparent),color-mix(in srgb,var(--c) 5%,transparent) 88%);opacity:0;transition:opacity .9s var(--ease) var(--d)}
    .s-plan .wpn-col.hot::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(45deg,rgba(255,77,77,.16) 0 7px,transparent 7px 24px);opacity:0;transition:opacity .9s var(--ease) var(--d)}
    .s-plan.on1 .wpn-col::before,.s-plan.on1 .wpn-col.hot::after{opacity:1}
    .s-plan .wpn-col b{position:absolute;left:0;right:0;top:-46px;text-align:center;font:800 34px/1 var(--font);color:var(--c);opacity:0;transition:opacity .7s var(--ease) calc(var(--d) + .25s)}
    .s-plan.on1 .wpn-col b{opacity:1}
    .s-plan .wpn-scan{position:absolute;left:430px;top:286px;width:8px;height:530px;border-radius:4px;background:linear-gradient(180deg,rgba(255,226,194,0),rgba(255,241,224,.95) 50%,rgba(255,226,194,0));box-shadow:0 0 34px 8px rgba(255,150,40,.55);opacity:0}
    .s-plan.scan .wpn-scan{animation:wpnScan 1.6s linear both}
    @keyframes wpnScan{0%{left:430px;opacity:0}8%{opacity:1}92%{opacity:1}100%{left:1816px;opacity:0}}
    .s-plan .wpn-axis{position:absolute;left:430px;top:806px;width:1394px;height:3px;border-radius:2px;background:rgba(255,255,255,.3)}
    .s-plan .wpn-axis::after{content:"";position:absolute;left:0;top:3px;width:100%;height:12px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.26) 0 2px,transparent 2px 72px)}
    /* lanes: one task each */
    .s-plan .wpn-lane{position:absolute;left:0;width:1920px;height:88px;pointer-events:none}
    .s-plan .wpn-ln{position:absolute;left:96px;top:0;width:330px;height:88px;display:flex;align-items:center;gap:16px;font:700 32px/1.1 var(--font);color:#fff;white-space:nowrap}
    .s-plan .wpn-ln .ic{flex:none;width:62px;height:62px;border-radius:18px;display:grid;place-items:center;color:var(--wc-orange);border:1.5px solid rgba(255,131,0,.5);background:rgba(255,131,0,.08)}
    .s-plan .wpn-track{position:absolute;left:430px;top:43px;width:1394px;height:0;border-top:3px dotted rgba(255,255,255,.2)}
    /* blocks: white = as planned. Red = hot. Dashed orange = suggested. Pale blue part = rest. Solid = approved. */
    .s-plan .wpn-ghost{position:absolute;height:88px;border-radius:20px;border:2px dashed rgba(255,255,255,.3);opacity:0;transition:opacity .8s var(--ease) .3s}
    .s-plan.on2 .wpn-ghost{opacity:1}
    .s-plan .wpn-blk{--dx:var(--x0,0px);position:absolute;height:88px;display:flex;border-radius:20px;overflow:hidden;border:2.5px solid rgba(255,255,255,.55);background:#171518;box-shadow:0 18px 40px rgba(0,0,0,.4);transform:translateX(var(--dx));transition:transform 1.4s var(--ease) var(--td,0s),border-color .6s var(--ease),box-shadow .6s var(--ease)}
    .s-plan .wpn-blk.b1{--x0:400px;--td:.15s}
    .s-plan .wpn-blk.b2{--x0:-403px;--td:.5s}
    .s-plan .wpn-blk .s{position:relative;flex:none;height:100%;background:rgba(255,255,255,.2);transition:background .7s var(--ease)}
    .s-plan .wpn-blk .s.r::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 7px,rgba(11,11,12,.6) 7px 10px,transparent 10px 16px,rgba(11,11,12,.6) 16px 19px,transparent 19px);opacity:0;transition:opacity .6s var(--ease) .3s}
    .s-plan.on1 .wpn-blk.heavy{border-color:#FF4D4D;box-shadow:0 0 36px rgba(255,77,77,.55),0 18px 40px rgba(0,0,0,.4)}
    .s-plan.on1:not(.on2) .wpn-blk.heavy{animation:wpnWarn 1.5s ease-in-out infinite}
    @keyframes wpnWarn{50%{box-shadow:0 0 62px rgba(255,77,77,.85),0 18px 40px rgba(0,0,0,.4)}}
    .s-plan.on2 .wpn-blk,.s-plan.on2 .wpn-blk.heavy{--dx:0px;border:2.5px dashed #FFC48A;box-shadow:0 18px 40px rgba(0,0,0,.4);animation:none}
    .s-plan.on2 .wpn-blk .s{background:rgba(255,131,0,.5)}
    .s-plan.on3 .wpn-blk .s.r{background:#BFE3FF}
    .s-plan.on3 .wpn-blk .s.r::after{opacity:1}
    .s-plan.on4 .wpn-blk,.s-plan.on4 .wpn-blk.heavy{border:2.5px solid #FFE2C2;box-shadow:0 0 46px rgba(255,131,0,.5),0 18px 40px rgba(0,0,0,.4)}
    .s-plan.on4 .wpn-blk .s{background:linear-gradient(180deg,#FFB366,#E9590C)}
    .s-plan.on4 .wpn-blk .s.r{background:#BFE3FF}
    .s-plan .wpn-cap{position:absolute;left:430px;top:832px;margin:0;font:600 28px/1.2 var(--font);color:#E6E6E2;white-space:nowrap}
    .s-plan .wpn-cap .sw{display:inline-block;width:34px;height:20px;border-radius:6px;vertical-align:-2px;margin:0 4px 0 6px}
    .s-plan .wpn-cap .sw.w{background:linear-gradient(180deg,#FFB366,#E9590C)} .s-plan .wpn-cap .sw.r{background:#BFE3FF}
    /* status pill: Suggested, then Approved */
    .s-plan .wpn-state{position:absolute;left:96px;top:896px;width:300px;height:64px}
    .s-plan .wpn-state .st{position:absolute;left:0;top:0;height:64px;display:inline-flex;align-items:center;gap:10px;padding:0 28px;border-radius:32px;font:800 30px/1 var(--font);white-space:nowrap;transition:opacity .5s var(--ease)}
    .s-plan .wpn-state .sug{border:2px dashed #FFC48A;color:#FFC48A;background:rgba(255,196,138,.08)}
    .s-plan .wpn-state .app{border:2px solid #22C55E;color:#22C55E;background:rgba(34,197,94,.12);opacity:0;box-shadow:0 0 30px rgba(34,197,94,.3)}
    .s-plan.done .wpn-state .sug{opacity:0} .s-plan.done .wpn-state .app{opacity:1}
    /* a person approves */
    .s-plan .wpn-act{position:absolute;left:1382px;top:884px;width:442px;height:88px;display:flex;align-items:center;gap:22px}
    .s-plan .wpn-av{flex:none;width:80px;height:80px;overflow:visible}
    .s-plan .wpn-av circle{fill:rgba(255,255,255,.06);stroke:rgba(255,255,255,.5);stroke-width:2.5}
    .s-plan .wpn-av circle.h{fill:rgba(255,255,255,.92);stroke:none}
    .s-plan .wpn-av path{fill:none;stroke:rgba(255,255,255,.92);stroke-width:4.5;stroke-linecap:round}
    .s-plan .wpn-ok{position:relative;flex:1;height:88px;border-radius:44px;display:flex;align-items:center;justify-content:center;font:800 38px/1 var(--font);color:#FFB366;border:2px solid rgba(255,131,0,.8);background:rgba(255,131,0,.08);box-shadow:0 0 40px rgba(255,131,0,.28);transition:background .5s,color .5s,box-shadow .5s,border-color .5s,transform .14s}
    .s-plan .wpn-ok.press{transform:scale(.95)}
    .s-plan.done .wpn-ok{background:linear-gradient(95deg,#FF8300,#FFB366);color:#1A0C00;border-color:#FFD2A3;box-shadow:0 0 70px rgba(255,131,0,.7)}
    .s-plan.stamp .wpn-ok{animation:wpnStamp .55s var(--ease)}
    @keyframes wpnStamp{0%{transform:scale(1.28)}45%{transform:scale(.95)}72%{transform:scale(1.04)}100%{transform:scale(1)}}
    .s-plan .wpn-ck{flex:none;width:0;height:40px;opacity:0;margin-right:0;transition:width .4s var(--ease),margin .4s var(--ease),opacity .3s}
    .s-plan.done .wpn-ck{width:40px;margin-right:14px;opacity:1}
    .s-plan .wpn-ck path{fill:none;stroke:#1A0C00;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:44;stroke-dashoffset:44;transition:stroke-dashoffset .5s var(--ease) .15s}
    .s-plan.done .wpn-ck path{stroke-dashoffset:0}
    .s-plan .wpn-cur{position:absolute;left:0;top:0;opacity:0;transform:translate(1432px,918px);transition:transform .95s var(--ease),opacity .4s;filter:drop-shadow(0 0 8px rgba(255,255,255,.55));pointer-events:none}
    .s-plan.curin .wpn-cur{opacity:1;transform:translate(1740px,930px)}
    .s-plan.curin.tap .wpn-cur{transform:translate(1740px,930px) scale(.84);transition:transform .14s}
    .s-plan.curin.gone .wpn-cur{opacity:0;transition:opacity .6s}
    .s-plan.wpn-snap *,.s-plan.wpn-snap *::before,.s-plan.wpn-snap *::after,.s-plan.no-trans *,.s-plan.no-trans *::before,.s-plan.no-trans *::after{transition:none!important}
    .s-plan.wpn-snap .wpn-ok,.s-plan.no-trans .wpn-ok,body.print .s-plan .wpn-ok,body.calm .s-plan .wpn-ok{animation:none!important}
    body.print .s-plan .wpn-blk{animation:none!important}
    body.calm .s-plan *,body.calm .s-plan *::before,body.calm .s-plan *::after{transition:none!important;animation:none!important}`,
  init(ctx) {
    ctx.gen = 0; ctx.pill = ctx.q('.wpn-ok');
  },
  step(ctx, i, dir, instant) {
    const R = ctx.root, gen = ++ctx.gen, fwd = dir > 0 && !instant && !ctx.calm && i > 0;
    const at = (ms, fn) => ctx.after(ms, () => { if (gen === ctx.gen) fn(); });
    if (!fwd) R.classList.add('wpn-snap');
    [1, 2, 3, 4].forEach((k) => R.classList.toggle('on' + k, i >= k));
    ['curin', 'tap', 'gone', 'done', 'scan', 'stamp'].forEach((c) => R.classList.remove(c)); ctx.pill.classList.remove('press');
    if (i >= 4) {
      if (!fwd) ['curin', 'gone', 'done'].forEach((c) => R.classList.add(c));
      else {
        at(900, () => R.classList.add('curin'));
        at(2200, () => { R.classList.add('tap'); ctx.pill.classList.add('press'); });
        at(2350, () => { R.classList.remove('tap'); ctx.pill.classList.remove('press'); R.classList.add('done', 'stamp'); Fx.burstEl(ctx.pill, { n: 34, speed: 440 }); Fx.sweep(ctx.pill); });
        at(3300, () => R.classList.add('gone'));
      }
    } else if (i === 1 && fwd) { void R.offsetWidth; R.classList.add('scan'); }
    if (fwd && i === 2) ctx.qa('.wpn-blk.heavy').forEach((b, k) => at(1500 + k * 350, () => Fx.burstEl(b, { n: 18, color: '#FFB366', speed: 300 })));
    if (fwd && i === 3) ctx.qa('.wpn-blk .s.r').forEach((s, k) => at(500 + k * 250, () => Fx.burstEl(s, { n: 8, color: '#BFE3FF', speed: 180 })));
    if (!fwd) { void R.offsetWidth; requestAnimationFrame(() => R.classList.remove('wpn-snap')); }
  },
  static(ctx) {
    const R = ctx.root; ctx.gen++; R.classList.add('wpn-snap');
    ['on1', 'on2', 'on3', 'on4', 'curin', 'gone', 'done'].forEach((c) => R.classList.add(c)); R.classList.remove('scan', 'tap', 'stamp'); ctx.pill.classList.remove('press');
  },
});
