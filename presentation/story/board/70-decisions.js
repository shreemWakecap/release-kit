/* Board 7: decisions needed before the full build, and where the work stands. */
Deck.add({
  id: 'decisions', section: 'next', title: 'Decisions, and where the work stands', kicker: 'Board 7 · Your call', reality: [],
  steps: 3, ambient: { orb: 1, beam: .6, dust: 1 }, dur: [4500, 6000, 6000, 6000],
  notes: 'Six decisions before I build the other 29 slides. Each has a recommendation. Below: research is done for the code side, the web numbers are being verified, and four slides are built.',
  html: `
    <h2 class="h2 dc-h" data-step="0">Six decisions, <span class="o glow-text">then I build.</span></h2>
    <p class="lead dc-lead" data-step="0" data-delay="200">Each has a recommendation. Say yes, or change it.</p>
    <div class="dc-list">
      <div class="dc-card glass" data-step="1" data-delay="0"><b><i>1</i>Audience and length</b><span>Tech team, leadership, or both. <em>Recommend:</em> one deck. Full story about 40 minutes, short path (S) about 15.</span></div>
      <div class="dc-card glass" data-step="1" data-delay="120"><b><i>2</i>Orange</b><span>Portal D46514, app E9590C, kit FF8300. <em>Recommend:</em> E9590C as base, FF8300 only for glow.</span></div>
      <div class="dc-card glass" data-step="1" data-delay="240"><b><i>3</i>Dark deck, light screens</b><span>The product is light only. <em>Recommend:</em> a night deck with the real light screens inside glass frames.</span></div>
      <div class="dc-card glass" data-step="2" data-delay="0"><b><i>4</i>Numbers and money</b><span>SAR or USD. <em>Recommend:</em> each source in its own currency, calculator lets you switch. Published rates only. No WakeCap results claimed.</span></div>
      <div class="dc-card glass" data-step="2" data-delay="120"><b><i>5</i>How far the vision goes</b><span>Predict, plan, permits, equipment. <em>Recommend:</em> what the data supports, badged Vision, no dates, a person approves.</span></div>
      <div class="dc-card glass" data-step="2" data-delay="240"><b><i>6</i>Screens with serials</b><span>Gas screens show detector serials. <em>Recommend:</em> blur the serials in the deck.</span></div>
    </div>
    <div class="dc-status glass hot" data-step="3" data-fx="up">
      <div class="label o">Where the work stands</div>
      <div class="dc-rows">
        <div class="dc-row"><b>7 of 7</b><span>code fact sheets done: conversion, three data paths, data bank, ecosystem, brand</span></div>
        <div class="dc-row"><b>7</b><span>web researchers on lives and cost. A second agent re-checks every number.</span></div>
        <div class="dc-row"><b>4 of 33</b><span>slides built. Engine, controls and short path tested.</span></div>
        <div class="dc-row"><b>Next</b><span>ten builders in parallel, then visual, fact and control reviews.</span></div>
      </div>
    </div>`,
  css: `
    .s-decisions .dc-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-decisions .dc-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-decisions .dc-list{position:absolute;left:96px;top:280px;width:1728px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
    .s-decisions .dc-card{padding:22px 26px;border-radius:22px;min-height:206px}
    .s-decisions .dc-card b{display:flex;align-items:center;gap:14px;font:800 27px/1.1 var(--font);color:#fff}
    .s-decisions .dc-card b i{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:var(--wc-orange);color:#0B0B0C;font:900 20px/1 var(--mono);font-style:normal}
    .s-decisions .dc-card span{display:block;margin-top:10px;font:400 21px/1.35 var(--font);color:var(--mut)}
    .s-decisions .dc-card span em{font-style:normal;font-weight:700;color:var(--wc-orange)}
    .s-decisions .dc-status{position:absolute;left:96px;top:760px;width:1728px;padding:24px 34px 26px}
    .s-decisions .dc-rows{display:grid;grid-template-columns:repeat(4,1fr);gap:30px;margin-top:14px}
    .s-decisions .dc-row b{display:block;font:900 38px/1 var(--mono);color:var(--wc-orange)}
    .s-decisions .dc-row span{display:block;margin-top:10px;font:400 20px/1.35 var(--font);color:#E6E6E2}`,
});
