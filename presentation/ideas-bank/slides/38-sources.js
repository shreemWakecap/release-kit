/* Slide: every published number, its source. One idea: each outside number in this deck matches the page it came from.
   A ledger: number, what it is, who and when, which slides use it, a note when it is a forecast or a model, a check mark and a link.
   Rows come from the fixed shortlist of claims marked verified in research/verified-numbers (S1-01, S1-03, S1-05, S1-06, S1-07, S1-08, S1-09, S1-16, S1-17, S1-18, S4-01, S4-02, S4-04).
   At load the slide reads the deck itself (notes, markup and text of the four stat slides) and lists only the numbers a built slide really uses.
   Amber tags mean the number is not a count: Model (a modelled loss), Forecast (a projection), Draft rule (a rule that is not final).
   In a one-slide test deck there is nothing to read, so it lists all 13. Rows land in three steps and earn the counter. The last step sweeps a beam down the ledger and points at the amber tags.
   Hover a row for the full title, the publisher and the other figures from that source. Click a "used on" tag to jump to that slide. No WakeCap result is shown here. */
Deck.add({
  id: 'sources', section: 'appendix', title: 'Every number, its source', kicker: 'Extras · Sources', reality: ['stat'],
  steps: 4, ambient: { orb: .9, beam: .35, dust: .8 }, dur: [3600, 5000, 5000, 5000, 6000], minutes: 1,
  notes: [
    'This page lists every outside number in the deck.',
    'Each row has the maker, the year and a check mark.',
    'Steps 1 to 3: the rows land in three groups.',
    'Click a tag to jump to the slide that uses the number.',
    'Step 4: amber tags mark forecasts, models and drafts, not counts.',
    'Point at a row to see the full title and the maker.',
    'If asked: every number here was checked against the page it came from. 126 claims were researched. 32 were verified, 7 partly verified, 2 not verified, and 85 had no check yet. Only verified claims are used, and only the ones a slide uses are listed. The ILO heat figures are modelled estimates. The 639 billion hours are a modelled potential loss, not a count. The OSHA figures come from a draft rule that is not final, and the 531 deaths are a projection, not a count. The OSHA cost is net of assumed savings, and without its undercount fix the benefit is US$771 million a year. The California figures come from the 2023 proposal for an indoor rule, and California adopted that rule in 2024. WBGT counts heat, humidity, wind and sun together. The building share is 18 of 53 deaths in one chart, which is 34.0 percent. Another chart gives 55 deaths in all, and 18 of 55 is 32.7 percent, so say about one in three. The makers are the International Labour Organization, the World Health Organization with the World Meteorological Organization, the Lancet Countdown, the IZA Institute of Labor Economics, the US safety agency OSHA, the California standards board, CPWR, and the journal Global Health Action.',
  ].join('\n'),
  html: `
    <h2 class="h2 sr-h" data-step="0">Every number, <span class="o glow-text">its source</span></h2>
    <p class="lead sr-lead" data-step="0" data-delay="200"><span class="la">Each one matches its source page.</span><span class="lb">Amber tags mark forecasts, models and drafts.</span></p>
    <div class="sr-count" data-step="0" data-delay="300"><b class="sr-n">0</b><span class="sr-of">checked</span></div>
    <div class="sr-hd" data-step="0" data-delay="250"><span style="left:24px">Number</span><span style="left:300px">What it is</span><span style="left:790px">Who and when</span><span class="hu" style="left:1120px">Used on</span><span style="left:1486px">Note</span><span style="left:1596px">Checked</span></div>
    <div class="sr-table" role="list"></div>
    <div class="sr-fn" data-step="2"><b>WBGT</b> counts heat, humidity, wind and sun together.</div>
    <div class="sr-beam"></div>
    <div class="sr-detail"><b></b><span class="p"></span><span class="a"></span></div>`,
  css: `
    .s-sources .sr-h{position:absolute;left:96px;top:104px;width:1300px;font-size:62px}
    .s-sources .sr-lead{position:absolute;left:96px;top:196px;width:1100px;height:40px;font-size:27px}
    .s-sources .sr-lead span{position:absolute;left:0;top:0;white-space:nowrap;transition:opacity .6s var(--ease),transform .6s var(--ease)}
    .s-sources .sr-lead .lb{opacity:0;transform:translateY(14px);color:#FFC24B}
    .s-sources .sr-lead.b .la{opacity:0;transform:translateY(-14px)}
    .s-sources .sr-lead.b .lb{opacity:1;transform:none}
    .s-sources .sr-lead.hov span{opacity:0!important}
    .s-sources .sr-count{position:absolute;right:96px;top:112px;display:flex;align-items:baseline;gap:16px;white-space:nowrap}
    .s-sources .sr-n{font:900 92px/1 var(--font);letter-spacing:-.03em;color:#fff;text-shadow:0 0 34px rgba(255,131,0,.6),0 0 90px rgba(255,131,0,.28);font-variant-numeric:tabular-nums;display:inline-block;min-width:60px;text-align:right}
    .s-sources .sr-n.tick{animation:srTick .45s var(--ease)}
    @keyframes srTick{0%{transform:scale(1.18)}100%{transform:none}}
    .s-sources .sr-of{font:700 28px/1 var(--font);color:var(--wc-orange-soft)}
    .s-sources .sr-hd{position:absolute;left:96px;top:268px;width:1728px;height:26px}
    .s-sources .sr-hd span{position:absolute;top:0;font:700 19px/26px var(--font);letter-spacing:.16em;text-transform:uppercase;color:var(--mut2);white-space:nowrap}
    .s-sources .sr-table{position:absolute;left:0;top:0;width:1920px;height:1080px;pointer-events:none}
    .s-sources .sr,.s-sources .sr-g{position:absolute;left:96px;width:1728px;height:var(--rh,46px);border-radius:12px}
    .s-sources .sr{background:linear-gradient(90deg,rgba(255,255,255,.055),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.08);transition:background .3s,border-color .3s,box-shadow .5s}
    .s-sources .sr-g{background:rgba(255,255,255,.012);border:1px dashed rgba(255,255,255,.1)}
    .s-sources .sr.in{pointer-events:auto}
    .s-sources .sr:hover{background:linear-gradient(90deg,rgba(255,131,0,.2),rgba(255,131,0,.06));border-color:rgba(255,131,0,.55)}
    .s-sources .sr-bar{position:absolute;left:-1px;top:7px;bottom:7px;width:4px;border-radius:2px;background:linear-gradient(180deg,#FFB366,#FF8300);box-shadow:0 0 14px rgba(255,131,0,.7)}
    .s-sources .sr.tg .sr-bar{background:linear-gradient(180deg,#FFD479,#F5A524);box-shadow:0 0 14px rgba(245,165,36,.7)}
    .s-sources .sr>b,.s-sources .sr>span,.s-sources .sr>a{position:absolute;top:0;bottom:0;display:flex;align-items:center;white-space:nowrap}
    .s-sources .sr-v{left:24px;width:270px;font:800 28px/1 var(--font);letter-spacing:-.01em;color:#fff}
    .s-sources .sr-l{left:300px;width:482px;font:500 24px/1 var(--font);color:#E3E3DF}
    .s-sources .sr-w{left:790px;width:324px;font:500 20px/1 var(--font);letter-spacing:.01em;color:var(--mut)}
    .s-sources .sr-u{left:1120px;width:344px;gap:6px}
    .s-sources .sr-u button{all:unset;box-sizing:border-box;cursor:pointer;font:700 17px/1 var(--font);color:#EDEDEA;padding:7px 10px;border-radius:999px;border:1.5px solid rgba(255,255,255,.34);background:rgba(255,255,255,.06);transition:background .2s,border-color .2s,color .2s}
    .s-sources .sr-u button:hover{background:rgba(255,131,0,.45);border-color:#FF8300;color:#fff}
    .s-sources .sr-u button:focus-visible{outline:2px solid #FFB366;outline-offset:2px}
    .s-sources .sr-t{left:1486px;width:130px}
    .s-sources .sr-t i{font:700 18px/1 var(--font);font-style:normal;color:#FFC24B;border:1.5px solid rgba(245,165,36,.75);background:rgba(245,165,36,.1);padding:7px 13px;border-radius:999px}
    .s-sources .sr-c{left:1622px;width:30px}
    .s-sources .sr-c svg{width:30px;height:30px;overflow:visible;filter:drop-shadow(0 0 8px rgba(255,131,0,.7))}
    .s-sources .sr-a{left:1670px;width:44px;justify-content:center;color:var(--mut);border-radius:10px;transition:color .25s,background .25s}
    .s-sources .sr-a:hover{color:#fff;background:rgba(255,131,0,.35)}
    .s-sources .sr-a svg{width:22px;height:22px}
    /* fewer rows: bigger rows */
    .s-sources.roomy .sr-v{font-size:33px}
    .s-sources.roomy .sr-l{font-size:25px}
    .s-sources.roomy .sr-w{font-size:21px}
    .s-sources.roomy .sr-c svg{width:34px;height:34px}
    .s-sources.roomy .sr-a svg{width:25px;height:25px}
    .s-sources.roomy .sr-bar{top:12px;bottom:12px}
    .s-sources .sr.fl{animation:srFlash 1s ease-out}
    @keyframes srFlash{0%{box-shadow:0 0 0 1px rgba(255,205,150,.8),0 0 44px rgba(255,131,0,.6)}100%{box-shadow:none}}
    .s-sources .sr.pl{animation:srPulse 1.5s ease-in-out 2}
    @keyframes srPulse{50%{box-shadow:0 0 0 2px rgba(245,165,36,.9),0 0 46px rgba(245,165,36,.5);border-color:rgba(245,165,36,.9)}}
    .s-sources .sr-fn{position:absolute;left:96px;font:500 19px/26px var(--font);color:var(--mut);white-space:nowrap}
    .s-sources .sr-fn b{color:#fff;font-weight:700}
    .s-sources .sr-beam{position:absolute;left:96px;width:1728px;height:3px;top:300px;border-radius:2px;opacity:0;pointer-events:none;background:linear-gradient(90deg,transparent,#FFB366 18%,#fff 50%,#FFB366 82%,transparent);box-shadow:0 0 30px 8px rgba(255,131,0,.55)}
    .s-sources .sr-beam.go{animation:srBeam 1.7s cubic-bezier(.45,0,.3,1) both}
    @keyframes srBeam{0%{opacity:0;transform:translateY(0)}8%{opacity:1}92%{opacity:1}100%{opacity:0;transform:translateY(var(--sp,648px))}}
    .s-sources .sr-detail{position:absolute;left:96px;top:184px;width:1450px;height:80px;opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s .25s;pointer-events:none;overflow:hidden}
    .s-sources .sr-detail.show{opacity:1;visibility:visible;transition:opacity .25s}
    .s-sources .sr-detail b,.s-sources .sr-detail span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .s-sources .sr-detail b{font:700 23px/30px var(--font);color:#fff}
    .s-sources .sr-detail .p{font:500 19px/24px var(--font);color:var(--mut)}
    .s-sources .sr-detail .a{font:500 19px/24px var(--font);color:var(--wc-orange-soft)}
    .s-sources.no-trans *{transition:none!important}
    body.calm .s-sources *{animation:none!important;transition-duration:.01s!important}`,
  init(ctx) {
    const mk = Fx.el;
    /* The 13 claims on the fixed shortlist. Figure, publisher, year and link are copied from research/verified-numbers, with two links swapped for a page that opens for everyone:
       S1-07 uses the open PMC page of the paper (PMC2799237, the research record names it; the research link is a raw XML file), and S1-18 uses the publisher's own copy of the bulletin (the verifier found it byte-identical to the CDC copy).
       tok = how this number is written in other slides (notes, markup, text), used to find which slides use it. */
    const ROWS = [
      { id: 'S1-03', v: '2.41 billion', l: 'workers in too much heat, a year', w: 'ILO · 2020 data, 2024 report', pub: 'International Labour Organization (ILO)', yr: '2020 data, report published April 2024', t: 'Ensuring safety and health at work in a changing climate: Report at a glance', u: 'https://www.ilo.org/media/535301/download', also: 'An ILO estimate, at least this many. Also: 22.85 million injuries and 18,970 deaths a year.', tok: [/2\.41 billion/i, /(?:^|[^\d,])18,?970(?!\d)/, /22\.85 million/i] },
      { id: 'S1-05', v: '8 in 10', l: 'heat injuries outside heatwaves', w: 'ILO · 2020 data, 2024 report', pub: 'International Labour Organization (ILO)', yr: '2020 data, published July 2024', t: 'More workers than ever are losing the fight against heat stress', u: 'https://www.ilo.org/resource/news/more-workers-ever-are-losing-fight-against-heat-stress', also: 'Also: 9 in 10 cases of too much heat at work happen outside a heatwave.', tok: [/\b8 in 10\b/i, /\beight in ten\b/i, /\b8 of 10\b/i] },
      { id: 'S1-09', v: '10 to 15%', l: 'higher injury risk over 100 °F', w: 'IZA · 2021 paper, California', pub: 'IZA Institute of Labor Economics', yr: '2001 to 2018 data, paper 2021, California', t: 'Temperature, Workplace Safety, and Labor Market Inequality (IZA Discussion Paper No. 14560)', u: 'https://docs.iza.org/dp14560.pdf', also: 'Also: 5 to 7% on 85 to 90 °F days (about 29 to 32 °C). Both are same-day risk, against days in the 60s °F. 100 °F is about 38 °C.', tok: [/\bIZA\b/, /(?:^|[^\d.])10\s?(to|-|–)\s?15\s?(%|percent)/i] },
      { id: 'S1-18', v: '34.0%', l: 'of US worker heat deaths: building work', w: 'CPWR · 2023 data, 2025 bulletin', pub: 'CPWR, The Center for Construction Research and Training', yr: '2023 data, bulletin 2025', t: 'Data Bulletin: Heat Injuries and Illnesses among Construction Workers', u: 'https://www.cpwr.com/wp-content/uploads/DataBulletin-August2025.pdf', also: 'Also: construction is 7% of US workers. 18 deaths in 2023. Against 55 deaths in all, that is 32.7%, so say about 1 in 3.', tok: [/\bCPWR\b/, /34\.0\s?(%|percent)/] },
      { id: 'S1-07', v: '29.5 °C WBGT', l: 'heavy work needs 50% rest', w: 'Global Health Action · 2009', pub: 'Global Health Action (Taylor & Francis)', yr: '2009', t: 'Workplace heat stress, health and productivity: an increasing challenge for low and middle-income countries during climate change', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2799237/', also: 'For workers used to the heat, in light clothing. Heavy work, about 400 W: 27 °C no rest, 31.5 °C 75% rest, 36 °C no work.', tok: [/Global Health Action/i, /29\.5 degrees/i] },
      { id: 'S1-08', v: '2 to 3%', l: 'less work per degree over 20 °C WBGT', w: 'WHO and WMO · 2025', pub: 'World Health Organization (WHO) and World Meteorological Organization (WMO)', yr: '2025', t: 'WHO, WMO issue new report and guidance to protect workers from increasing heat stress', u: 'https://www.who.int/news/item/22-08-2025-who-wmo-issue-new-report-and-guidance-to-protect-workers-from-increasing-heat-stress', also: 'The news release names no heat measure. The WHO Q&A and the report say WBGT.', tok: [/WHO and WMO/i, /WHO, WMO/i, /(?:^|[^\d.])2\s?(to|-|–)\s?3\s?(%|percent)/i] },
      { id: 'S1-06', v: '639 billion', l: 'potential work hours lost to heat', w: 'Lancet Countdown · 2024', tag: 'Model', pub: 'The Lancet Countdown (manuscript hosted by LSE Research Online)', yr: '2024, modelled potential loss', t: 'The 2025 report of the Lancet Countdown on health and climate change: climate change action offers a lifeline', u: 'https://researchonline.lse.ac.uk/id/eprint/130009/1/FINAL_-_2025_Report_of_the_Lancet_Countdown.pdf', also: 'Also: US$1.09 trillion potential income loss (0.99% of global GDP). Building work: 17.7% of the hours, 28% of the income loss.', tok: [/Lancet/i, /639 billion/i, /1\.09 trillion/i] },
      { id: 'S1-01', v: '2.2%', l: 'of work hours lost to heat, 2030', w: 'ILO · 2019 report', tag: 'Forecast', pub: 'International Labour Organization (ILO)', yr: '2030 projection, published 2019', t: 'Increase in heat stress predicted to bring productivity loss equivalent to 80 million jobs', u: 'https://www.ilo.org/resource/news/increase-heat-stress-predicted-bring-productivity-loss-equivalent-80', also: 'Also: 80 million full-time jobs, US$2,400 billion. This is the low case, with work in the shade.', tok: [/(?:^|[^\d.])2\.2\s?(%|percent|per cent)/i, /80 million (full-time )?jobs/i, /2,?400 billion/i] },
      { id: 'S1-16', v: 'US$7.8 billion', l: 'cost a year; benefit US$9.179 billion', w: 'OSHA · 2024 proposal', tag: 'Draft rule', pub: 'US Occupational Safety and Health Administration (OSHA), Department of Labor', yr: '2024 proposal, not final, 2023 dollars, data 2011 to 2022', t: 'Heat Injury and Illness Prevention in Outdoor and Indoor Work Settings (proposed rule, Federal Register Vol. 89, No. 169)', u: 'https://www.govinfo.gov/content/pkg/FR-2024-08-30/pdf/2024-14824.pdf', also: 'Both amounts are a year. OSHA projects 531 heat deaths and 16,027 injuries or illnesses prevented a year.', tok: [/US OSHA/, /(?:^|[^/])OSHA(’s)? (2024 )?proposal/, /(?:^|[^\d.])7\.8 billion/i, /9\.179/, /531 deaths/i, /16,?027/] },
      { id: 'S1-17', v: 'US$4.0 billion', l: '10 year benefit; cost about US$1.0 billion', w: 'Cal/OSHA · 2023 proposal', tag: 'Forecast', pub: 'California Occupational Safety and Health Standards Board (Cal/OSHA)', yr: '2023 proposal, 10 year view, indoor work in California', t: 'Heat Illness Prevention in Indoor Places of Employment: Initial Statement of Reasons', u: 'https://www.dir.ca.gov/oshsb/documents/Indoor-Heat-ISOR.pdf', also: 'Also: US$404 million a year in benefits, 57% of it productivity gains. California adopted its rule in 2024.', tok: [/Cal\/OSHA/, /404 million/i, /(?:^|[^\d.])4\.0 billion/i] },
      { id: 'S4-01', v: '2.93 million', l: 'deaths linked to work', w: 'ILO · 2019 data, 2023 report', pub: 'International Labour Organization (ILO)', yr: '2019 estimate, report published 2023', t: 'A call for safer and healthier working environments', u: 'https://www.ilo.org/media/358981/download', also: 'Also: over 395 million non-fatal work injuries.', tok: [/2\.93 million/i, /395 million/i] },
      { id: 'S4-02', v: '3.94%', l: 'of world GDP: cost of work injury, illness', w: 'ILO · announced 2017', pub: 'International Labour Organization (ILO)', yr: 'announced 4 September 2017', t: 'ILO head calls for global coalition on safety and health at work', u: 'https://www.ilo.org/global/about-the-ilo/newsroom/news/WCMS_573118/lang--en/index.htm', also: 'Also: 2.99 trillion US dollars. The page gives no data year.', tok: [/3\.94\s?(%|percent|per cent)/i, /2\.99 trillion/i] },
      { id: 'S4-04', v: '1 in 6', l: 'fatal work accidents on building sites', w: 'ILO · 2017', pub: 'International Labour Organization (ILO)', yr: '2017, ILO figures quoted at a forum', t: 'ILO and IIRSM social dialogue on occupational health and safety calls for improved safety in the construction industry', u: 'https://www.ilo.org/resource/news/ilo-and-iirsm-social-dialogue-occupational-health-and-safety-calls-improved', also: 'Also: no less than 60,000 fatal accidents a year on construction sites.', tok: [/one in six/i, /\b1 in 6\b/i, /60,?000 fatal/i] },
    ];
    /* which stat slides exist, and how each of them writes its numbers */
    const STAT = [['stakes-lives', 'Costs', 'What a wrong decision costs'], ['chain', 'Chain', 'From heat to cost'], ['calc', 'Your site', 'Your site, published rates'], ['relations', 'Relations', 'The relations, with numbers']];
    const built = STAT.filter(([sid]) => Deck.isBuilt(sid));
    const textOf = (sid) => { const d = Deck.defs.find((x) => x.id === sid); return (d.notes || '') + ' ' + (d.html || '') + ' ' + (d.el ? d.el.textContent : ''); };
    const txt = {}; built.forEach(([sid]) => { txt[sid] = textOf(sid); });
    ROWS.forEach((r) => { r.use = built.filter(([sid]) => r.tok.some((re) => re.test(txt[sid]))).map((b) => b[0]); });
    const shown = built.length && ROWS.some((r) => r.use.length) ? ROWS.filter((r) => r.use.length) : ROWS;
    const N = shown.length, per = Math.ceil(N / 3), roomy = N <= 9;
    const PITCH = roomy ? Math.min(80, Math.floor(650 / N)) : 50, RH = PITCH - (roomy ? 10 : 4);
    ctx.root.style.setProperty('--rh', RH + 'px');
    ctx.root.classList.toggle('roomy', roomy);
    const TOP = 304;
    ctx.q('.sr-of').textContent = N === 1 ? 'checked' : 'of ' + N + ' checked';
    ctx.q('.sr-hd .hu').style.display = built.length ? '' : 'none';
    const table = ctx.q('.sr-table'), det = ctx.q('.sr-detail'), lead = ctx.q('.sr-lead');
    const CHECK = '<svg viewBox="0 0 30 30"><circle cx="15" cy="15" r="13" fill="rgba(255,131,0,.2)" stroke="#FF8300" stroke-width="2.2"/><path d="M8.5 15.5l4.4 4.4 8.6-9.8" fill="none" stroke="#FFD2A3" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';
    shown.forEach((r, i) => { const g = mk('div', { class: 'sr-g' }, table); g.style.top = (TOP + i * PITCH) + 'px'; });
    ctx.rows = []; ctx.stepRows = { 1: [], 2: [], 3: [] };
    shown.forEach((r, i) => {
      const s = Math.min(3, Math.floor(i / per) + 1), j = i - (s - 1) * per, delay = j * 150;
      const row = mk('div', { class: 'sr' + (r.tag ? ' tg' : ''), 'data-step': s, 'data-delay': delay, role: 'listitem' }, table); row.style.top = (TOP + i * PITCH) + 'px';
      mk('i', { class: 'sr-bar' }, row); mk('b', { class: 'sr-v', text: r.v }, row); mk('span', { class: 'sr-l', text: r.l }, row); mk('span', { class: 'sr-w', text: r.w }, row);
      if (built.length) {
        const us = mk('span', { class: 'sr-u' }, row);
        r.use.forEach((sid) => {
          const meta = STAT.find((x) => x[0] === sid), real = Deck.defs.find((x) => x.id === sid), b = mk('button', { type: 'button', 'data-interactive': '', title: 'Go to the slide: ' + ((real && real.title) || meta[2]), text: meta[1] }, us);
          b.addEventListener('click', (e) => { e.stopPropagation(); b.blur(); const k = Deck.defs.findIndex((d) => d.id === sid); if (k >= 0) Deck.go(k, 0); });
          b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') e.stopPropagation(); }); /* the deck keys must not swallow Enter and Space on a focused tag */
        });
      }
      const tg = mk('span', { class: 'sr-t' }, row); if (r.tag) mk('i', { text: r.tag }, tg);
      mk('span', { class: 'sr-c', html: CHECK, 'data-step': s, 'data-delay': delay + 420, 'data-fx': 'pop' }, row);
      const al = mk('a', { class: 'sr-a', href: r.u, target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Open the source page', title: 'Open the source page', html: ARROW }, row);
      al.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.stopPropagation(); });
      row.addEventListener('pointerenter', () => { det.querySelector('b').textContent = r.t; det.querySelector('.p').textContent = r.pub + ' · ' + r.yr; det.querySelector('.a').textContent = r.also || ''; det.classList.add('show'); lead.classList.add('hov'); });
      row.addEventListener('pointerleave', () => { det.classList.remove('show'); lead.classList.remove('hov'); });
      const o = { el: row, chk: row.querySelector('.sr-c'), delay, tag: !!r.tag, wb: /WBGT/.test(r.v + r.l), s }; ctx.rows.push(o); ctx.stepRows[s].push(o);
    });
    /* the WBGT footnote lands with the first row that uses the word, and sits under the last row */
    const fn = ctx.q('.sr-fn'), wb = ctx.rows.find((o) => o.wb);
    if (wb) { fn.dataset.step = wb.s; fn.style.top = (TOP + N * PITCH + 4) + 'px'; } else fn.remove();
    ctx.q('.sr-beam').style.setProperty('--sp', (N * PITCH - 6) + 'px'); ctx.q('.sr-beam').style.top = (TOP - 4) + 'px';
    ctx.total = N; ctx.n = 0; ctx.cnt = ctx.q('.sr-n');
    ctx.setN = (n, pop) => { ctx.n = n; ctx.cnt.textContent = n; if (pop) { ctx.cnt.classList.remove('tick'); void ctx.cnt.offsetWidth; ctx.cnt.classList.add('tick'); } };
    ctx.rowsDone = (i) => ctx.rows.filter((o) => o.s <= i).length;
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
        tm.push(ctx.after(250, () => { const b = ctx.q('.sr-beam'); void b.offsetWidth; b.classList.add('go'); }));
        ctx.rows.forEach((o, k) => { tm.push(ctx.after(450 + k * Math.min(112, 1200 / ctx.rows.length), () => o.el.classList.add('fl'))); });
        ctx.rows.filter((o) => o.tag).forEach((o, k) => { tm.push(ctx.after(2300 + k * 220, () => o.el.classList.add('pl'))); });
        tm.push(ctx.after(2000, () => Fx.burstEl(ctx.cnt, { n: 30, color: '#FF8300', speed: 380 })));
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
