/* Slide: every published number, its source. One idea: each outside number in this deck matches the page it came from.
   A ledger of 13 rows (the fixed shortlist of claims marked verified in research/verified-numbers): number, what it is, who and when, a note when it is a forecast or a model, a check mark and a link.
   Rows land in three steps and earn the counter (0 to 13). The last step sweeps a beam down the ledger and points at the amber tags.
   Hover a row for the full title and publisher. No WakeCap result is shown here. */
Deck.add({
  id: 'sources', section: 'appendix', title: 'Every number, its source', kicker: 'Extras · Sources', reality: ['stat'],
  steps: 4, ambient: { orb: .9, beam: .35, dust: .8 }, dur: [3600, 5000, 5000, 5000, 6000], minutes: 1,
  notes: [
    'This page lists every outside number in the deck.',
    'Each row has the maker, the year and a check mark.',
    'Step 1: numbers about people and heat.',
    'Step 2: numbers about hours of work, and how heat slows work.',
    'Step 3: numbers about money, and about work in general.',
    'Step 4: the amber tags mark forecasts and models. They are not counts.',
    'If asked: all 13 numbers were checked against the page they came from. 126 claims were researched. 32 were verified, 7 partly verified, 2 not verified, and 85 were not checked. Only verified claims are used. The 2.2 percent is a 2030 forecast. The 639 billion hours are a modelled potential loss. The two cost and benefit rows are estimates for draft rules that are not final. The heat measure in the two work rows is WBGT, which counts heat, humidity and sun together. The construction share is 18 of 53 deaths in one chart, which is 34.0 percent. Another chart gives 55 deaths in all, which is about one in three. The publishers are the International Labour Organization, the World Health Organization with the World Meteorological Organization, the Lancet Countdown, the IZA Institute of Labor Economics, the US safety agency OSHA, California OSHA, CPWR, and the journal Global Health Action.',
  ].join('\n'),
  html: `
    <h2 class="h2 sr-h" data-step="0">Every number, <span class="o glow-text">its source</span></h2>
    <p class="lead sr-lead" data-step="0" data-delay="200"><span class="la">Each one matches its source page.</span><span class="lb">Amber tags mark forecasts and models.</span></p>
    <div class="sr-count" data-step="0" data-delay="300"><b class="sr-n">0</b><span class="sr-of">of 13 checked</span></div>
    <div class="sr-hd" data-step="0" data-delay="250"><span style="left:22px">Number</span><span style="left:290px">What it is</span><span style="left:914px">Who and when</span><span style="left:1314px">Note</span><span style="left:1560px">Checked</span></div>
    <div class="sr-table"></div>
    <div class="sr-fn" data-step="2"><b>WBGT</b> counts heat, humidity and sun together.</div>
    <div class="sr-beam"></div>
    <div class="sr-detail"><b></b><span></span></div>`,
  css: `
    .s-sources .sr-h{position:absolute;left:96px;top:104px;width:1300px;font-size:62px}
    .s-sources .sr-lead{position:absolute;left:96px;top:196px;width:1100px;height:40px;font-size:27px}
    .s-sources .sr-lead span{position:absolute;left:0;top:0;white-space:nowrap;transition:opacity .6s var(--ease),transform .6s var(--ease)}
    .s-sources .sr-lead .lb{opacity:0;transform:translateY(14px);color:#FFC24B}
    .s-sources .sr-lead.b .la{opacity:0;transform:translateY(-14px)}
    .s-sources .sr-lead.b .lb{opacity:1;transform:none}
    .s-sources .sr-lead.hov span{opacity:0!important}
    .s-sources .sr-count{position:absolute;right:96px;top:112px;display:flex;align-items:baseline;gap:16px;white-space:nowrap}
    .s-sources .sr-n{font:900 92px/1 var(--font);letter-spacing:-.03em;color:#fff;text-shadow:0 0 34px rgba(255,131,0,.6),0 0 90px rgba(255,131,0,.28);font-variant-numeric:tabular-nums;display:inline-block;min-width:96px;text-align:right}
    .s-sources .sr-n.tick{animation:srTick .45s var(--ease)}
    @keyframes srTick{0%{transform:scale(1.18)}100%{transform:none}}
    .s-sources .sr-of{font:700 28px/1 var(--font);color:var(--wc-orange-soft)}
    .s-sources .sr-hd{position:absolute;left:96px;top:264px;width:1728px;height:26px}
    .s-sources .sr-hd span{position:absolute;top:0;font:700 19px/26px var(--font);letter-spacing:.16em;text-transform:uppercase;color:var(--mut2);white-space:nowrap}
    .s-sources .sr-table{position:absolute;left:0;top:0;width:1920px;height:1080px;pointer-events:none}
    .s-sources .sr,.s-sources .sr-g{position:absolute;left:96px;width:1728px;height:46px;border-radius:12px;background:linear-gradient(90deg,rgba(255,255,255,.055),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.08);pointer-events:auto;transition:background .3s,border-color .3s,box-shadow .5s}
    .s-sources .sr-g{background:rgba(255,255,255,.012);border:1px dashed rgba(255,255,255,.1);pointer-events:none;transition:none}
    .s-sources .sr:not(.in){pointer-events:none}
    .s-sources .sr-fn{position:absolute;left:96px;top:958px;font:500 19px/26px var(--font);color:var(--mut);white-space:nowrap}
    .s-sources .sr-fn b{color:#fff;font-weight:700}
    .s-sources .sr:hover{background:linear-gradient(90deg,rgba(255,131,0,.2),rgba(255,131,0,.06));border-color:rgba(255,131,0,.55)}
    .s-sources .sr-bar{position:absolute;left:-1px;top:7px;width:4px;height:30px;border-radius:2px;background:linear-gradient(180deg,#FFB366,#FF8300);box-shadow:0 0 14px rgba(255,131,0,.7)}
    .s-sources .sr.tg .sr-bar{background:linear-gradient(180deg,#FFD479,#F5A524);box-shadow:0 0 14px rgba(245,165,36,.7)}
    .s-sources .sr>b,.s-sources .sr>span,.s-sources .sr>a{position:absolute;top:0;height:44px;display:flex;align-items:center;white-space:nowrap}
    .s-sources .sr-v{left:22px;width:262px;font:800 28px/1 var(--font);letter-spacing:-.01em;color:#fff}
    .s-sources .sr-l{left:290px;width:612px;font:500 24px/1 var(--font);color:#E3E3DF}
    .s-sources .sr-w{left:914px;width:390px;font:500 20px/1 var(--font);letter-spacing:.01em;color:var(--mut)}
    .s-sources .sr-t{left:1314px;width:240px}
    .s-sources .sr-t i{font:700 19px/1 var(--font);font-style:normal;color:#FFC24B;border:1.5px solid rgba(245,165,36,.75);background:rgba(245,165,36,.1);padding:7px 14px;border-radius:999px}
    .s-sources .sr-c{left:1578px;width:30px}
    .s-sources .sr-c svg{width:30px;height:30px;overflow:visible;filter:drop-shadow(0 0 8px rgba(255,131,0,.7))}
    .s-sources .sr-a{left:1648px;width:44px;justify-content:center;color:var(--mut);border-radius:10px;transition:color .25s,background .25s;pointer-events:auto}
    .s-sources .sr-a:hover{color:#fff;background:rgba(255,131,0,.35)}
    .s-sources .sr-a svg{width:22px;height:22px}
    .s-sources .sr.fl{animation:srFlash 1s ease-out}
    @keyframes srFlash{0%{box-shadow:0 0 0 1px rgba(255,205,150,.8),0 0 44px rgba(255,131,0,.6)}100%{box-shadow:none}}
    .s-sources .sr.pl{animation:srPulse 1.5s ease-in-out 2}
    @keyframes srPulse{50%{box-shadow:0 0 0 2px rgba(245,165,36,.9),0 0 46px rgba(245,165,36,.5);border-color:rgba(245,165,36,.9)}}
    .s-sources .sr-beam{position:absolute;left:96px;width:1728px;height:3px;top:296px;border-radius:2px;opacity:0;pointer-events:none;background:linear-gradient(90deg,transparent,#FFB366 18%,#fff 50%,#FFB366 82%,transparent);box-shadow:0 0 30px 8px rgba(255,131,0,.55)}
    .s-sources .sr-beam.go{animation:srBeam 1.7s cubic-bezier(.45,0,.3,1) both}
    @keyframes srBeam{0%{opacity:0;transform:translateY(0)}8%{opacity:1}92%{opacity:1}100%{opacity:0;transform:translateY(648px)}}
    .s-sources .sr-detail{position:absolute;left:96px;top:192px;width:1370px;height:62px;opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s .25s;pointer-events:none;overflow:hidden}
    .s-sources .sr-detail b,.s-sources .sr-detail span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .s-sources .sr-detail b{font:700 23px/32px var(--font);color:#fff}
    .s-sources .sr-detail span{font:500 20px/28px var(--font);color:var(--mut)}
    .s-sources .sr-detail.show{opacity:1;visibility:visible;transition:opacity .25s}
    .s-sources.no-trans *{transition:none!important}
    body.calm .s-sources *{animation:none!important;transition-duration:.01s!important}`,
  init(ctx) {
    const mk = Fx.el;
    /* 13 rows: the fixed shortlist of verified claims. figure, publisher, year and link are copied from research/verified-numbers. */
    const ROWS = [
      { id: 'S1-03', s: 1, v: '2.41 billion', l: 'workers facing heat', w: 'ILO · 2020 data, 2024 report', pub: 'International Labour Organization (ILO)', yr: '2020 data, report published April 2024', t: 'Ensuring safety and health at work in a changing climate: Report at a glance', u: 'https://www.ilo.org/media/535301/download' },
      { id: 'S1-05', s: 1, v: '8 in 10', l: 'heat injuries outside heatwaves', w: 'ILO · 2020 data, 2024 report', pub: 'International Labour Organization (ILO)', yr: '2020 data, published July 2024', t: 'More workers than ever are losing the fight against heat stress', u: 'https://www.ilo.org/resource/news/more-workers-ever-are-losing-fight-against-heat-stress' },
      { id: 'S1-09', s: 1, v: '10 to 15%', l: 'injury risk over 100 °F', w: 'IZA · 2021 paper, California', pub: 'IZA Institute of Labor Economics', yr: '2001 to 2018 data, paper 2021, California', t: 'Temperature, Workplace Safety, and Labor Market Inequality (IZA Discussion Paper 14560)', u: 'https://docs.iza.org/dp14560.pdf' },
      { id: 'S1-18', s: 1, v: '34.0%', l: 'US heat deaths in building', w: 'CPWR · 2023 data, 2025 bulletin', pub: 'CPWR, The Center for Construction Research and Training', yr: '2023 data, bulletin 2025', t: 'Data Bulletin: Heat Injuries and Illnesses among Construction Workers', u: 'https://stacks.cdc.gov/view/cdc/260013/cdc_260013_DS1.pdf' },
      { id: 'S1-07', s: 2, v: '29.5 °C WBGT', l: 'heavy work: half rest', w: 'Global Health Action · 2009', pub: 'Global Health Action (Taylor & Francis)', yr: '2009', t: 'Workplace heat stress, health and productivity: an increasing challenge for low and middle-income countries during climate change', u: 'https://doi.org/10.3402/gha.v2i0.2047' },
      { id: 'S1-08', s: 2, v: '2 to 3%', l: 'less work per degree over 20 °C', w: 'WHO and WMO · 2025', pub: 'World Health Organization (WHO) and World Meteorological Organization (WMO)', yr: '2025', t: 'WHO, WMO issue new report and guidance to protect workers from increasing heat stress', u: 'https://www.who.int/news/item/22-08-2025-who-wmo-issue-new-report-and-guidance-to-protect-workers-from-increasing-heat-stress' },
      { id: 'S1-06', s: 2, v: '639 billion', l: 'work hours lost, 2024', w: 'Lancet Countdown · 2024', tag: 'Model estimate', pub: 'The Lancet Countdown (manuscript hosted by LSE Research Online)', yr: '2024, modelled potential loss', t: 'The 2025 report of the Lancet Countdown on health and climate change: climate change action offers a lifeline', u: 'https://researchonline.lse.ac.uk/id/eprint/130009/1/FINAL_-_2025_Report_of_the_Lancet_Countdown.pdf' },
      { id: 'S1-01', s: 2, v: '2.2%', l: 'of work hours lost, 2030', w: 'ILO · 2019 report', tag: 'Forecast', pub: 'International Labour Organization (ILO)', yr: '2030 projection, published 2019', t: 'Increase in heat stress predicted to bring productivity loss equivalent to 80 million jobs', u: 'https://www.ilo.org/resource/news/increase-heat-stress-predicted-bring-productivity-loss-equivalent-80' },
      { id: 'S1-16', s: 3, v: 'US$7.8 billion', l: 'cost a year, US heat rule', w: 'OSHA · 2024 proposal', tag: 'Draft rule estimate', pub: 'US Occupational Safety and Health Administration (OSHA), Department of Labor', yr: '2024 proposal, 2023 dollars, data 2011 to 2022', t: 'Heat Injury and Illness Prevention in Outdoor and Indoor Work Settings (proposed rule)', u: 'https://www.govinfo.gov/content/pkg/FR-2024-08-30/pdf/2024-14824.pdf' },
      { id: 'S1-17', s: 3, v: 'US$404 million', l: 'benefit a year, California', w: 'Cal/OSHA · 2023 proposal', tag: 'Draft rule estimate', pub: 'California Occupational Safety and Health Standards Board (Cal/OSHA)', yr: '2023 proposal, 10 year view', t: 'Heat Illness Prevention in Indoor Places of Employment: Initial Statement of Reasons', u: 'https://www.dir.ca.gov/oshsb/documents/Indoor-Heat-ISOR.pdf' },
      { id: 'S4-01', s: 3, v: '2.93 million', l: 'deaths from work', w: 'ILO · 2019 data, 2023 report', pub: 'International Labour Organization (ILO)', yr: '2019 estimate, report published 2023', t: 'A call for safer and healthier working environments', u: 'https://www.ilo.org/media/358981/download' },
      { id: 'S4-02', s: 3, v: '3.94%', l: 'of world GDP lost', w: 'ILO · announced 2017', pub: 'International Labour Organization (ILO)', yr: 'announced 4 September 2017', t: 'ILO head calls for global coalition on safety and health at work', u: 'https://www.ilo.org/global/about-the-ilo/newsroom/news/WCMS_573118/lang--en/index.htm' },
      { id: 'S4-04', s: 3, v: '1 in 6', l: 'fatal accidents on building sites', w: 'ILO · 2017', pub: 'International Labour Organization (ILO)', yr: '2017', t: 'ILO and IIRSM social dialogue on occupational health and safety calls for improved safety in the construction industry', u: 'https://www.ilo.org/resource/news/ilo-and-iirsm-social-dialogue-occupational-health-and-safety-calls-improved' },
    ];
    const TOP = 300, PITCH = 50, N = ROWS.length;
    ctx.q('.sr-of').textContent = 'of ' + N + ' checked';
    const table = ctx.q('.sr-table'), det = ctx.q('.sr-detail'), lead = ctx.q('.sr-lead');
    const CHECK = '<svg viewBox="0 0 30 30"><circle cx="15" cy="15" r="13" fill="rgba(255,131,0,.2)" stroke="#FF8300" stroke-width="2.2"/><path d="M8.5 15.5l4.4 4.4 8.6-9.8" fill="none" stroke="#FFD2A3" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';
    ROWS.forEach((r, i) => { const g = mk('div', { class: 'sr-g' }, table); g.style.top = (TOP + i * PITCH) + 'px'; });
    const idxInStep = {}; ctx.rows = []; ctx.stepRows = { 1: [], 2: [], 3: [] };
    ROWS.forEach((r, i) => {
      const j = idxInStep[r.s] = (idxInStep[r.s] || 0) + 1, delay = (j - 1) * 150;
      const row = mk('div', { class: 'sr' + (r.tag ? ' tg' : ''), 'data-step': r.s, 'data-delay': delay, role: 'listitem' }, table); row.style.top = (TOP + i * PITCH) + 'px';
      mk('i', { class: 'sr-bar' }, row); mk('b', { class: 'sr-v', text: r.v }, row); mk('span', { class: 'sr-l', text: r.l }, row); mk('span', { class: 'sr-w', text: r.w }, row);
      const tg = mk('span', { class: 'sr-t' }, row); if (r.tag) mk('i', { text: r.tag }, tg);
      mk('span', { class: 'sr-c', html: CHECK, 'data-step': r.s, 'data-delay': delay + 420, 'data-fx': 'pop' }, row);
      mk('a', { class: 'sr-a', href: r.u, target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Open the source page', title: 'Open the source page', html: ARROW }, row);
      const show = () => { det.querySelector('b').textContent = r.t; det.querySelector('span').textContent = r.pub + ' · ' + r.yr; det.classList.add('show'); lead.classList.add('hov'); };
      row.addEventListener('pointerenter', show); row.addEventListener('pointerleave', () => { det.classList.remove('show'); lead.classList.remove('hov'); });
      const o = { el: row, chk: row.querySelector('.sr-c'), delay, tag: !!r.tag }; ctx.rows.push(o); ctx.stepRows[r.s].push(o);
    });
    ctx.rowsDone = (i) => (i >= 1 ? ctx.stepRows[1].length : 0) + (i >= 2 ? ctx.stepRows[2].length : 0) + (i >= 3 ? ctx.stepRows[3].length : 0);
    ctx.n = 0; ctx.cnt = ctx.q('.sr-n');
    ctx.setN = (n, pop) => { ctx.n = n; ctx.cnt.textContent = n; if (pop) { ctx.cnt.classList.remove('tick'); void ctx.cnt.offsetWidth; ctx.cnt.classList.add('tick'); } };
    ctx.apply = (i, dir, instant) => {
      const fast = !!instant || ctx.calm || dir < 0, root = ctx.root;
      if (fast) root.classList.add('no-trans');
      const target = ctx.rowsDone(i), tm = (ctx.tm = ctx.tm || []);
      tm.forEach(clearTimeout); tm.length = 0;
      root.querySelectorAll('.sr.fl,.sr.pl').forEach((e) => e.classList.remove('fl', 'pl'));
      ctx.q('.sr-beam').classList.remove('go');
      ctx.q('.sr-lead').classList.toggle('b', i >= 4);
      if (fast || target <= ctx.n) { ctx.setN(target, false); }
      else {
        let k = ctx.n;
        for (let q = ctx.n; q < target; q++) { const o = ctx.rows[q]; tm.push(ctx.after(o.delay + 520, () => { k += 1; ctx.setN(k, true); Fx.burstEl(o.chk, { n: 8, color: '#FFB366', speed: 190, life: .6 }); })); }
      }
      if (i >= 4 && !fast && !ctx.fin) {
        ctx.after(250, () => { const b = ctx.q('.sr-beam'); void b.offsetWidth; b.classList.add('go'); });
        ctx.rows.forEach((o, k) => { tm.push(ctx.after(450 + k * 112, () => o.el.classList.add('fl'))); });
        ctx.rows.filter((o) => o.tag).forEach((o, k) => { tm.push(ctx.after(2300 + k * 220, () => o.el.classList.add('pl'))); });
        ctx.after(2000, () => Fx.burstEl(ctx.cnt, { n: 30, color: '#FF8300', speed: 380 }));
      }
      ctx.fin = i >= 4;
      if (fast) { void root.offsetWidth; requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('no-trans'))); }
    };
  },
  enter(ctx) {
    ctx.root.classList.add('no-trans'); ctx.tm && ctx.tm.forEach(clearTimeout); ctx.setN(0, false); ctx.fin = false;
    ctx.q('.sr-lead').classList.remove('b'); ctx.q('.sr-beam').classList.remove('go'); ctx.q('.sr-detail').classList.remove('show'); ctx.q('.sr-lead').classList.remove('hov');
    void ctx.root.offsetWidth; requestAnimationFrame(() => ctx.root.classList.remove('no-trans'));
  },
  step(ctx, i, dir, instant) { ctx.apply(i, dir, instant); },
  static(ctx) { ctx.apply(4, 1, true); ctx.q('.sr-detail').classList.remove('show'); ctx.q('.sr-lead').classList.remove('hov'); },
});
