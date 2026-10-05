/* Slide 15: Weather, from a sensor head to a pixel. One reading, ten hops, a new shape at each stop.
   Facts: research C2 sections 1, 3, 4, 5, 9. Example bytes are the test fixture; the heat index is the worked example. */
Deck.add({
  id: 'flow-weather', section: 'tech', title: 'Weather: from a sensor head to a pixel', kicker: 'Data paths · Weather',
  reality: ['code', 'live'], steps: 6, ambient: { orb: 1, beam: .5, dust: 1 }, dur: [4500, 8500, 8500, 8500, 6500, 6500, 8500], minutes: 2,
  notes: 'Step 0: One weather reading, ten hops. The reading changes shape on the way: bytes, a message, a row, a heat index card. Everything on the way is read from the code. The page at the end is live on production.\nStep 1: A sensor head on a mesh node sends one block of 16 numbers, 34 bytes, on Wirepas endpoint 61. The gateway wraps it with its own id, the sink id, the receive time, the travel time and the hop count, and publishes it to AWS IoT Core.\nStep 2: One IoT rule puts every endpoint 61 frame into an SQS queue. The old sensors-service reads the queue. The first byte, 0x01, says weather station. It scales 16 values. A raw 0x7FFF means no sensor fitted and becomes NULL.\nStep 3: sensors-service finds the project through the gateway registry, rebuilds the reading time as receive time minus travel time, and stores one row of 29 columns in a Timescale table. The new backend reads that table. Read only. It never writes to it.\nStep 4: On each request the backend takes the newest reading of today, swaps dead sensor values for the last good one, converts wind to kilometres an hour, computes the heat index and picks the band. The numbers here are a worked example, not a live reading.\nStep 5: The band gives work, rest and water. The limits give Danger per parameter. The age of the reading gives station health. Fixed rules turn all of that into the verdict, the steps and the confidence.\nStep 6: The page asks again every 60 seconds. That page is live on production. On the side, danger episodes leave through an outbox to the Observation Manager every 10 seconds. We have not evidenced live delivery.',
  html: `
    <h2 class="h2 fw-h" data-step="0">Weather: from a <span class="o glow-text">sensor head to a pixel.</span></h2>
    <p class="lead fw-lead" data-step="0" data-delay="200">Ten hops. One reading. It changes shape at every stop.</p>
    <svg class="fw-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <div class="fw-shelf glass flat" data-step="0" data-delay="450">
      <div class="fw-head"><span class="fw-hop"></span><span class="fw-adds"></span></div>
      <div class="fw-views"></div>
    </div>`,
  css: `
    .s-flow-weather .fw-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-flow-weather .fw-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-flow-weather .fw-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-flow-weather .fw-river{fill:none;stroke:rgba(255,131,0,.08);stroke-width:34px;stroke-linecap:round;stroke-linejoin:round;filter:blur(12px)}
    .s-flow-weather .fw-base{fill:none;stroke:rgba(255,255,255,.17);stroke-width:5px;stroke-linecap:round;stroke-linejoin:round}
    .s-flow-weather .fw-trail{fill:none;stroke:#FF8300;stroke-width:6px;stroke-linecap:round;stroke-linejoin:round;filter:url(#fx-glow-u)}
    .s-flow-weather .fw-spur{fill:none;stroke:#C58BFF;stroke-width:4px;stroke-dasharray:3 11;stroke-linecap:round;opacity:0;transition:opacity .8s}
    .s-flow-weather.spur-on .fw-spur{opacity:.9}
    .s-flow-weather .st .ring{fill:#0B0B0C;stroke:rgba(255,255,255,.3);stroke-width:3px;transition:fill .5s,stroke .5s}
    .s-flow-weather .st .n{font:900 21px/1 var(--mono);fill:#97978F;text-anchor:middle;transition:fill .4s}
    .s-flow-weather .st .nm{font:700 22px/1 var(--font);fill:#8E8E88;text-anchor:middle;transition:fill .4s}
    .s-flow-weather .st .nm.end{text-anchor:end}
    .s-flow-weather .st .sb{font:500 20px/1 var(--font);fill:#B7A3D6;text-anchor:end}
    .s-flow-weather .st.on .ring{fill:#FF8300;stroke:#FFD9B0;filter:url(#fx-glow)}
    .s-flow-weather .st.om.on .ring{fill:#C58BFF;stroke:#EAD7FF}
    .s-flow-weather .st.on .n{fill:#1a0d02}
    .s-flow-weather .st.on .nm{fill:#fff}
    .s-flow-weather .st.cur .nm{fill:#FFC48A}
    .s-flow-weather .st .halo{fill:none;stroke:#FFB366;stroke-width:2.5px;opacity:0;transform-box:fill-box;transform-origin:center}
    .s-flow-weather .st.cur .halo{animation:fwHalo 2.2s var(--ease) infinite}
    .s-flow-weather .st .shock{fill:none;stroke:#FFD9B0;stroke-width:3px;opacity:0;transform-box:fill-box;transform-origin:center}
    .s-flow-weather .st.pop .shock{animation:fwShock 1.1s var(--ease) both}
    @keyframes fwHalo{0%{opacity:.8;transform:scale(1)}100%{opacity:0;transform:scale(2.3)}}
    @keyframes fwShock{0%{opacity:.95;transform:scale(1)}100%{opacity:0;transform:scale(3.4)}}
    body.calm .s-flow-weather .st.cur .halo{animation:none}
    .s-flow-weather .fw-shelf{position:absolute;left:96px;top:652px;width:1728px;height:344px}
    .s-flow-weather .fw-head{position:absolute;left:34px;right:34px;top:20px}
    .s-flow-weather .fw-hop{display:block;font:800 20px/1 var(--font);letter-spacing:.18em;text-transform:uppercase;color:var(--wc-orange)}
    .s-flow-weather .fw-adds{display:block;margin-top:11px;font:500 26px/1.25 var(--font);color:#EDEDEA;white-space:nowrap}
    .s-flow-weather .fw-head.sw>*{animation:fwSw .7s var(--ease) both}
    @keyframes fwSw{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}
    .s-flow-weather .fw-views{position:absolute;left:34px;right:34px;top:98px;height:204px}
    .s-flow-weather .v{position:absolute;inset:0;opacity:0;visibility:hidden;transition:opacity .3s var(--ease),visibility 0s .3s}
    .s-flow-weather .v.on{opacity:1;visibility:visible;transition:opacity .45s var(--ease) .1s,visibility 0s}
    .s-flow-weather .i{opacity:0;transform:translateY(14px);transition:opacity .22s,transform .22s}
    .s-flow-weather .v.on .i{opacity:1;transform:none;transition:opacity .55s var(--ease) calc(var(--d,0) * 1ms + 120ms),transform .55s var(--ease) calc(var(--d,0) * 1ms + 120ms)}
    .s-flow-weather.nt .v,.s-flow-weather.nt .i,.s-flow-weather.nt .fw-spur{transition:none!important}
    .s-flow-weather .vsrc{position:absolute;left:0;bottom:-34px;white-space:nowrap}
    .s-flow-weather code{font:700 22px/1 var(--mono);color:#fff}
    /* step 0 teaser */
    .s-flow-weather .tz{position:absolute;inset:0;display:flex;align-items:center;justify-content:space-between}
    .s-flow-weather .tz-c{width:360px;height:178px;border-radius:22px;border:1.5px solid rgba(255,255,255,.16);background:rgba(255,255,255,.04);padding:16px 22px;display:flex;flex-direction:column;justify-content:space-between}
    .s-flow-weather .tz-c b{display:block;font:800 30px/1 var(--font);color:#fff}
    .s-flow-weather .tz-c span.t{display:block;margin-top:8px;font:500 22px/1.2 var(--font);color:var(--mut)}
    .s-flow-weather .tz-g{height:56px;display:flex;align-items:center;gap:6px}
    .s-flow-weather .tz-g i{display:block;width:30px;height:38px;border-radius:7px;background:rgba(255,131,0,.2);border:1.5px solid #FF8300}
    .s-flow-weather .tz-g i.d{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.3)}
    .s-flow-weather .tz-g em{font:700 40px/1 var(--mono);font-style:normal;color:#4FB3FF}
    .s-flow-weather .tz-g .cd{width:120px;height:46px;border-radius:12px;background:rgba(255,131,0,.16);border:1.5px solid #F39A1F;display:grid;place-items:center;font:900 26px/1 var(--font);color:#F39A1F}
    .s-flow-weather .tz-a{font:700 40px/1 var(--font);color:#FF8300}
    /* step 1: bytes */
    .s-flow-weather .by-br{position:absolute;left:0;top:0;display:flex;gap:16px;font:600 20px/1 var(--font);color:var(--mut)}
    .s-flow-weather .by-br .h{display:flex;gap:3px;width:87px}.s-flow-weather .by-br .h span{width:42px;text-align:center;color:#8CCBFF}
    .s-flow-weather .by-br .vl{width:1497px;border-top:2px solid rgba(255,131,0,.6);padding-top:8px;text-align:center;color:#FFC48A}
    .s-flow-weather .byt{position:absolute;left:0;top:44px;display:flex;gap:16px}
    .s-flow-weather .byt .g{display:flex;gap:7px}.s-flow-weather .byt .g.h{gap:3px}
    .s-flow-weather .byt .s{display:flex;gap:3px}
    .s-flow-weather .bc{display:grid;place-items:center;width:42px;height:50px;border-radius:9px;background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.16);font:800 21px/1 var(--mono);color:#fff;font-style:normal}
    .s-flow-weather .bc.tg{background:rgba(79,179,255,.2);border-color:#4FB3FF}
    .s-flow-weather .bc.hi{background:rgba(255,131,0,.24);border-color:#FF8300}
    .s-flow-weather .by-co{position:absolute;top:104px;font:600 20px/1 var(--font);color:#FFC48A;white-space:nowrap}
    .s-flow-weather .by-co::before{content:"";position:absolute;left:20px;top:-14px;width:2px;height:10px;background:#FF8300}
    .s-flow-weather .by-cap{position:absolute;left:0;top:150px;font:600 34px/1 var(--font);color:#fff;white-space:nowrap}
    .s-flow-weather .by-cap b{color:#FF8300;font-weight:900}.s-flow-weather .by-cap span{color:var(--mut2);margin:0 10px}
    /* step 1: envelope */
    .s-flow-weather .en-box{position:absolute;left:0;top:14px;display:flex;align-items:center;gap:14px;padding:30px 26px 22px;border-radius:22px;border:2px solid #FFB366;background:rgba(255,131,0,.06)}
    .s-flow-weather .en-tag{position:absolute;left:24px;top:-13px;padding:5px 14px;border-radius:999px;background:#0B0B0C;border:1.5px solid #FFB366;font:800 18px/1 var(--font);letter-spacing:.12em;text-transform:uppercase;color:#FFB366}
    .s-flow-weather .en-f{padding:12px 18px;border-radius:12px;border:1.5px solid rgba(255,255,255,.3);background:rgba(255,255,255,.07);font:700 24px/1 var(--font);color:#fff;white-space:nowrap}
    .s-flow-weather .en-pl{display:flex;align-items:center;gap:14px;padding:10px 16px;border-radius:12px;border:1.5px solid #FF8300;background:rgba(255,131,0,.16)}
    .s-flow-weather .en-pl .m{display:flex;gap:2px}.s-flow-weather .en-pl .m i{display:block;width:8px;height:26px;border-radius:2px;background:#FF8300;opacity:.85}
    .s-flow-weather .en-pl b{font:800 24px/1 var(--font);color:#fff;white-space:nowrap}
    .s-flow-weather .en-cap{position:absolute;left:0;top:136px;font:600 28px/1.2 var(--font);color:#fff;white-space:nowrap}
    .s-flow-weather .en-cap b{color:#FFB366}
    /* step 2: json */
    .s-flow-weather .js{position:absolute;left:0;top:0;width:1060px;padding:16px 24px;border-radius:18px;background:rgba(0,0,0,.4);border:1.5px solid rgba(255,255,255,.14);font:600 24px/1.32 var(--mono);color:#D9D9D4;white-space:pre}
    .s-flow-weather .js .k{color:#FFB366}.s-flow-weather .js .n{color:#6FC3FF}.s-flow-weather .js .m{color:#8E8E88}
    .s-flow-weather .sq{position:absolute;left:1110px;top:8px;width:550px}
    .s-flow-weather .sq .t{display:block;font:800 20px/1 var(--font);letter-spacing:.16em;text-transform:uppercase;color:#FF8300;margin-bottom:14px}
    .s-flow-weather .sq p{margin:0 0 10px;font:500 26px/1.3 var(--font);color:#EDEDEA}.s-flow-weather .sq p b{color:#fff}
    /* step 2: decode */
    .s-flow-weather .dc-r{position:absolute;left:0;display:grid;grid-template-columns:150px 150px 210px 250px;align-items:center;height:58px;padding:0 20px;border-radius:14px;border:1.5px solid rgba(255,255,255,.16);background:rgba(255,255,255,.045);width:790px}
    .s-flow-weather .dc-r em{font:700 24px/1 var(--mono);font-style:normal;color:#FFB366}
    .s-flow-weather .dc-r b{font:800 30px/1 var(--font);color:#fff}
    .s-flow-weather .dc-r span{font:500 22px/1 var(--font);color:var(--mut)}
    .s-flow-weather .dc-r.nul{border-style:dashed;border-color:rgba(255,255,255,.34)}.s-flow-weather .dc-r.nul b{color:#8E8E88;font-family:var(--mono)}
    .s-flow-weather .dc-rule{position:absolute;left:850px;top:0;width:810px;font:500 27px/1.35 var(--font);color:#EDEDEA}
    .s-flow-weather .dc-rule b{color:#FF8300;font-family:var(--mono)}.s-flow-weather .dc-rule p{margin:0 0 12px}
    /* step 3: row */
    .s-flow-weather .rw-l{position:absolute;left:0;top:0;display:flex;gap:22px;font:700 20px/1 var(--font);color:var(--mut);white-space:nowrap}
    .s-flow-weather .rw-l span{display:block}
    .s-flow-weather .rw-c{position:absolute;left:0;top:34px;display:flex;gap:22px}
    .s-flow-weather .rw-c .g{display:flex;gap:5px}
    .s-flow-weather .rc{display:block;width:44px;height:58px;border-radius:9px;border:1.5px solid}
    .s-flow-weather .rc.a{background:rgba(143,163,184,.22);border-color:#8FA3B8}
    .s-flow-weather .rc.b{background:rgba(255,131,0,.24);border-color:#FF8300}
    .s-flow-weather .rc.c{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.4)}
    .s-flow-weather .rw-t{position:absolute;left:0;top:112px;font:500 25px/1.2 var(--font);color:#EDEDEA;white-space:nowrap}
    .s-flow-weather .rw-t code{font-size:24px;color:#FFB366}
    .s-flow-weather .rw-ro{position:absolute;left:0;top:152px;display:flex;align-items:center;gap:14px;padding:8px 18px 8px 14px;border-radius:999px;border:1.5px solid #4FB3FF;background:rgba(79,179,255,.12);font:700 25px/1 var(--font);color:#fff;white-space:nowrap;opacity:0;transform:translateY(10px);transition:opacity .5s var(--ease),transform .5s var(--ease)}
    .s-flow-weather .v-row.ro-on .rw-ro{opacity:1;transform:none}
    .s-flow-weather .rw-ro b{color:#8CCBFF}
    /* step 4: heat index */
    .s-flow-weather .hi-in{position:absolute;left:0;top:0;display:flex;gap:12px}
    .s-flow-weather .hi-in span{padding:11px 16px;border-radius:12px;border:1.5px solid rgba(255,255,255,.28);background:rgba(255,255,255,.06);font:700 24px/1 var(--font);color:#fff;white-space:nowrap}
    .s-flow-weather .hi-in span em{font-style:normal;color:#FFB366;margin-left:8px;font-family:var(--mono)}
    .s-flow-weather .hi-fm{position:absolute;left:0;top:70px;font:700 26px/1.3 var(--mono);color:#fff;white-space:nowrap}
    .s-flow-weather .hi-fm i{font-style:normal;color:#FFB366}
    .s-flow-weather .hi-fm small{display:block;margin-top:6px;font:500 20px/1.3 var(--font);color:var(--mut)}
    .s-flow-weather .hi-num{position:absolute;left:800px;top:-8px;font:900 100px/1 var(--font);letter-spacing:-.03em;color:#fff;white-space:nowrap}
    .s-flow-weather .hi-num small{font-size:44px;font-weight:700;color:#FFB366;margin-left:6px}
    .s-flow-weather .hi-pill{position:absolute;left:1170px;top:6px;padding:10px 24px;border-radius:999px;font:900 32px/1 var(--font);color:#1a0d02;background:#F39A1F;box-shadow:0 0 36px rgba(243,154,31,.55);opacity:0;transform:scale(.8);transition:opacity .4s,transform .5s cubic-bezier(.2,1.4,.3,1)}
    .s-flow-weather .v-hi.band .hi-pill{opacity:1;transform:none}
    .s-flow-weather .hi-rl{position:absolute;left:800px;top:110px;width:860px}
    .s-flow-weather .hi-rl .bar{display:flex;gap:6px}
    .s-flow-weather .hi-rl .bar i{display:block;flex:1;height:16px;border-radius:8px;opacity:.28;transition:opacity .35s,box-shadow .35s}
    .s-flow-weather .hi-rl .bar i.on{opacity:1;box-shadow:0 0 22px currentColor}
    .s-flow-weather .hi-rl .nm{display:flex;gap:6px;margin-top:10px}
    .s-flow-weather .hi-rl .nm span{flex:1;text-align:center;font:600 20px/1.15 var(--font);color:#8E8E88;transition:color .35s}.s-flow-weather .hi-rl .nm span.on{color:#fff}
    .s-flow-weather .hi-rl .mk{position:absolute;top:-14px;left:0;width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-top:12px solid #fff;margin-left:-9px;transition:left .45s var(--ease);filter:drop-shadow(0 0 6px #fff)}
    /* step 5: decisions */
    .s-flow-weather .dz{position:absolute;top:0;height:200px;padding:18px 22px;border-radius:20px;border:1.5px solid rgba(255,255,255,.18);background:rgba(255,255,255,.045)}
    .s-flow-weather .dz .t{display:block;font:800 19px/1.1 var(--font);letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
    .s-flow-weather .dz b{display:block;margin-top:12px;font:800 32px/1.1 var(--font);color:#fff}
    .s-flow-weather .dz span.s{display:block;margin-top:10px;font:500 23px/1.3 var(--font);color:#D9D9D4}
    .s-flow-weather .dz-a{position:absolute;top:80px;font:700 40px/1 var(--font);color:#FF8300}
    .s-flow-weather .dz.vd{border-color:rgba(255,77,77,.7);background:linear-gradient(145deg,rgba(255,77,77,.2),rgba(255,77,77,.05));box-shadow:0 0 50px rgba(255,77,77,.25)}
    .s-flow-weather .dz.vd b{color:var(--danger);text-shadow:0 0 30px rgba(255,77,77,.5);font-size:44px}
    /* step 6: the page */
    .s-flow-weather .pg-st{position:absolute;left:0;top:0;width:1660px;height:104px;display:flex;align-items:center;gap:26px;padding:0 28px;border-radius:18px;border:1.5px solid rgba(255,77,77,.75);background:linear-gradient(95deg,rgba(255,77,77,.28),rgba(255,77,77,.07));box-shadow:0 0 60px rgba(255,77,77,.25);overflow:hidden}
    .s-flow-weather .pg-pill{padding:11px 22px;border-radius:999px;background:var(--danger);color:#1a0505;font:900 28px/1 var(--font);letter-spacing:.05em}
    .s-flow-weather .pg-tx{width:520px}.s-flow-weather .pg-tx b{display:block;font:800 32px/1.1 var(--font);color:#fff}
    .s-flow-weather .pg-tx span{display:block;margin-top:6px;font:500 20px/1.25 var(--font);color:#F2D5D5}
    .s-flow-weather .pg-sp{flex:1}.s-flow-weather .pg-sp div{font:600 23px/1.3 var(--font);color:#fff}.s-flow-weather .pg-sp div em{font-style:normal;color:#FF9A9A;font-weight:800;margin-right:8px}
    .s-flow-weather .pg-cf{text-align:center}.s-flow-weather .pg-cf .br{display:flex;gap:6px;align-items:flex-end;height:36px;justify-content:center}
    .s-flow-weather .pg-cf .br i{display:block;width:14px;border-radius:4px;background:#fff;box-shadow:0 0 12px rgba(255,255,255,.5)}
    .s-flow-weather .pg-cf span{display:block;margin-top:6px;font:600 19px/1 var(--font);color:#F2D5D5}
    .s-flow-weather .pg-poll{position:absolute;left:0;bottom:0;height:5px;width:0;background:linear-gradient(90deg,#FF8300,#FFD9B0);box-shadow:0 0 14px #FF8300}
    .s-flow-weather .v-page.on .pg-poll{animation:fwPoll 60s linear infinite}
    @keyframes fwPoll{from{width:0}to{width:100%}}
    body.calm .s-flow-weather .pg-poll{animation:none!important;width:100%}
    .s-flow-weather .pg-row{position:absolute;left:0;top:118px;display:flex;gap:14px;width:1660px}
    .s-flow-weather .pg-c{height:86px;padding:0 24px;border-radius:16px;border:1.5px solid rgba(255,255,255,.2);background:rgba(255,255,255,.05);display:flex;align-items:center;gap:18px}
    .s-flow-weather .pg-c .l{font:700 19px/1.15 var(--font);letter-spacing:.1em;text-transform:uppercase;color:var(--mut)}
    .s-flow-weather .pg-c b{font:900 40px/1 var(--font);color:#fff;white-space:nowrap}.s-flow-weather .pg-c b small{font-size:22px;font-weight:700;color:#D9D9D4;margin-left:5px}
    .s-flow-weather .pg-c.hc{border-color:rgba(243,154,31,.8);background:rgba(243,154,31,.12);flex:1.15}
    .s-flow-weather .pg-c.hc em{font:900 22px/1 var(--font);font-style:normal;color:#1a0d02;background:#F39A1F;padding:7px 14px;border-radius:999px}
    .s-flow-weather .pg-c.wr{flex:1.1}.s-flow-weather .pg-c.wt{flex:1.2}
    .s-flow-weather .pg-c .sep{width:2px;height:42px;background:rgba(255,255,255,.18)}`,
  init(ctx) {
    const svg = ctx.q('.fw-svg'), mk = (t, a, p) => Fx.el(t, a, p || svg), root = ctx.root, vwr = ctx.q('.fw-views');
    /* ---- the winding path: Catmull-Rom through the stations, exact length per station ---- */
    const ST = [
      { n: 1, name: 'Sensor head', x: 190, y: 560 }, { n: 2, name: 'Gateway', x: 372, y: 396 }, { n: 3, name: 'IoT rule + queue', x: 556, y: 556 },
      { n: 4, name: 'Decode', x: 746, y: 404 }, { n: 5, name: 'Store', x: 936, y: 566 }, { n: 6, name: 'Backend reads', x: 1126, y: 400 },
      { n: 7, name: 'Heat index', x: 1316, y: 560 }, { n: 8, name: 'Verdict', x: 1504, y: 398 }, { n: 9, name: 'The page', x: 1700, y: 556 },
      { n: 10, name: 'Observation Manager', x: 1742, y: 334 },
    ];
    const pts = [[112, 606]].concat(ST.slice(0, 9).map((s) => [s.x, s.y])), segs = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || pts[i + 1];
      segs.push(`C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`);
    }
    const pd = `M${pts[0][0]} ${pts[0][1]} ` + segs.join(' ');
    const river = mk('path', { class: 'fw-river', d: pd }), base = mk('path', { class: 'fw-base', d: pd });
    const L = base.getTotalLength(), D = [];
    let cum = 0; segs.forEach((s, i) => { const t = mk('path', { d: `M${pts[i][0]} ${pts[i][1]} ${s}` }); cum += t.getTotalLength(); t.remove(); D.push(cum); });
    const scale = L / cum; for (let i = 0; i < D.length; i++) D[i] *= scale;       /* D[k] = distance of station k (0 based) */
    const trail = mk('path', { class: 'fw-trail', d: pd, 'stroke-dasharray': '0 ' + (L + 80) });
    const spur = mk('path', { class: 'fw-spur', d: `M${ST[7].x} ${ST[7].y} C${ST[7].x + 110} ${ST[7].y + 6} ${ST[9].x - 90} ${ST[9].y + 4} ${ST[9].x} ${ST[9].y}` });
    ctx.idle = ctx.flow(base, { color: '#FFB366', count: 3, speed: 170, r: 4.5, tail: 6, tailGap: 12 }); ctx.idle.stop().show(false);
    ctx.spurF = ctx.flow(spur, { color: '#C58BFF', count: 2, speed: 120, r: 5.5, tail: 6, tailGap: 12 }); ctx.spurF.stop().show(false);
    /* ---- stations ---- */
    ctx.st = ST.map((s, k) => {
      const g = mk('g', { class: 'st' + (k === 9 ? ' om' : '') }), up = s.y < 480;
      mk('circle', { class: 'halo', cx: s.x, cy: s.y, r: 24 }, g); mk('circle', { class: 'shock', cx: s.x, cy: s.y, r: 24 }, g);
      const ring = mk('circle', { class: 'ring', cx: s.x, cy: s.y, r: 24 }, g); mk('text', { class: 'n', x: s.x, y: s.y + 7.5, text: s.n }, g);
      if (k === 9) { mk('text', { class: 'nm end', x: s.x + 40, y: s.y - 44, text: s.name }, g); mk('text', { class: 'sb', x: s.x + 40, y: s.y - 18, text: 'Outbox, every 10 s. Live delivery not evidenced.' }, g); }
      else if (k === 7) mk('text', { class: 'nm end', x: s.x + 8, y: s.y - 44, text: s.name }, g);
      else mk('text', { class: 'nm', x: s.x, y: up ? s.y - 42 : s.y + 58, text: s.name }, g);
      return { g, ring, s };
    });
    /* ---- packet ---- */
    const pk = mk('g', { class: 'fw-pk' }); pk.style.display = 'none';
    const halo = mk('circle', { r: 30, fill: 'url(#g-core)', opacity: .85 }, pk);
    const tl = Array.from({ length: 10 }, (_, j) => mk('circle', { r: Math.max(2, 8 - j * .65), fill: '#FFB366', opacity: Math.max(.06, .6 - j * .06) }, pk));
    const hd = mk('circle', { r: 10, fill: '#FFF1E0', filter: 'url(#fx-glow)' }, pk);
    const at = (d) => base.getPointAtLength(Math.max(0, Math.min(L, d)));
    ctx.setPk = (d) => { const p = at(d); hd.setAttribute('cx', p.x); hd.setAttribute('cy', p.y); halo.setAttribute('cx', p.x); halo.setAttribute('cy', p.y); tl.forEach((c, j) => { const q = at(d - (j + 1) * 15); c.setAttribute('cx', q.x); c.setAttribute('cy', q.y); }); trail.setAttribute('stroke-dasharray', Math.max(0, d) + ' ' + (L + 80)); };
    /* ---- shelf views ---- */
    const V = (name, html) => { const el = Fx.el('div', { class: 'v v-' + name, html }, vwr); return el; };
    ctx.v = {};
    ctx.v.tease = V('tease', `<div class="tz">
      <div class="tz-c i" style="--d:0"><div class="tz-g"><i></i><i></i><i class="d"></i><i></i><i class="d"></i><i></i></div><div><b>Bytes</b><span class="t">at the sensor and the gateway</span></div></div>
      <div class="tz-a i" style="--d:150">›</div>
      <div class="tz-c i" style="--d:300"><div class="tz-g"><em>{ }</em></div><div><b>JSON</b><span class="t">in the queue</span></div></div>
      <div class="tz-a i" style="--d:450">›</div>
      <div class="tz-c i" style="--d:600"><div class="tz-g"><i class="d" style="width:16px"></i><i class="d" style="width:16px"></i><i style="width:16px"></i><i style="width:16px"></i><i style="width:16px"></i><i style="width:16px"></i><i class="d" style="width:16px"></i><i class="d" style="width:16px"></i></div><div><b>A row</b><span class="t">in the database</span></div></div>
      <div class="tz-a i" style="--d:750">›</div>
      <div class="tz-c i" style="--d:900"><div class="tz-g"><div class="cd">47.4 °C</div></div><div><b>A heat index card</b><span class="t">on the page</span></div></div></div>`);
    /* bytes */
    const hex = { 0: '01', 1: '20', 2: '00', 3: '34', 6: '00', 7: 'FF' };
    let bh = '<div class="by-br i" style="--d:0"><div class="h"><span>tag</span><span>len</span></div><div class="vl">16 values, 2 bytes each</div></div><div class="byt"><div class="g h">';
    for (let c = 0; c < 2; c++) bh += `<i class="bc tg i" style="--d:${120 + c * 30}">${hex[c]}</i>`;
    bh += '</div><div class="g">';
    for (let sl = 0; sl < 16; sl++) { bh += '<div class="s">'; for (let c = 0; c < 2; c++) { const ci = 2 + sl * 2 + c, h = hex[ci]; bh += `<i class="bc i${h ? ' hi' : ''}" style="--d:${200 + ci * 22}">${h || ''}</i>`; } bh += '</div>'; }
    bh += '</div></div>';
    bh += '<span class="by-co i" style="left:103px;--d:900">wind speed</span><span class="by-co i" style="left:291px;--d:960">temperature</span>';
    bh += '<div class="by-cap i" style="--d:700"><b class="cnt">34</b> bytes<span>·</span><b>16</b> numbers<span>·</span>Wirepas endpoint <b>61</b></div><div class="src vsrc">Example bytes from the code\'s test fixture. Other slots are not shown.</div>';
    ctx.v.bytes = V('bytes', bh); ctx.cnt = ctx.v.bytes.querySelector('.cnt');
    /* envelope */
    const mini = '<span class="m">' + '<i></i>'.repeat(14) + '</span>';
    ctx.v.env = V('env', `<div class="en-box"><span class="en-tag i" style="--d:0">Wirepas message</span>
      <span class="en-f i" style="--d:100">gateway id</span><span class="en-f i" style="--d:200">sink id</span><span class="en-f i" style="--d:300">receive time</span><span class="en-f i" style="--d:400">travel time</span><span class="en-f i" style="--d:500">hop count</span>
      <span class="en-pl i" style="--d:650">${mini}<b>payload: 34 bytes</b></span></div>
      <div class="en-cap i" style="--d:900">Published as MQTT on <b>AWS IoT Core</b></div><div class="src vsrc">A frame captured on 20 Apr 2026 was 104 bytes.</div>`);
    /* json */
    ctx.v.json = V('json', `<div class="js"><div class="i" style="--d:0">{</div><div class="i" style="--d:130">  <span class="k">"data"</span>:        <span class="m">"…the frame, base64…"</span>,</div><div class="i" style="--d:260">  <span class="k">"topic"</span>:       <span class="m">"production/gw-event/received_data/…/61/61"</span>,</div><div class="i" style="--d:390">  <span class="k">"srcEndpoint"</span>: <span class="n">61</span>,</div><div class="i" style="--d:520">  <span class="k">"dstEndpoint"</span>: <span class="n">61</span></div><div class="i" style="--d:650">}</div></div>
      <div class="sq i" style="--d:500"><span class="t">One IoT rule, one queue</span><p>The rule takes <b>every endpoint-61 frame</b> and puts it in an <b>SQS queue</b>.</p><p>The queue buffers and retries.</p></div>`);
    /* decode */
    ctx.v.dec = V('dec', `<div class="dc-r i" style="top:0;--d:0"><code>00 34</code><em>× 0.1</em><b>5.2 m/s</b><span>wind speed</span></div>
      <div class="dc-r i" style="top:70px;--d:260"><code>00 FF</code><em>× 0.1</em><b>25.5 °C</b><span>temperature</span></div>
      <div class="dc-r nul i" style="top:140px;--d:520"><code>7F FF</code><em>no sensor</em><b>NULL</b><span>not connected</span></div>
      <div class="dc-rule i" style="--d:780"><p>First byte <b>01</b> means weather station.</p><p>Then 16 values, each times its own factor: 0.1, 1 or 0.001.</p></div><div class="src vsrc">Example values from the code's test fixture.</div>`);
    /* row */
    const grp = (n, c, d0) => '<div class="g">' + Array.from({ length: n }, (_, k) => `<i class="rc ${c} i" style="--d:${d0 + k * 26}"></i>`).join('') + '</div>';
    ctx.v.row = V('row', `<div class="rw-l i" style="--d:0"><span style="width:534px">11 identity and transport</span><span style="width:779px">16 measurements</span><span>2 housekeeping</span></div>
      <div class="rw-c">${grp(11, 'a', 100)}${grp(16, 'b', 380)}${grp(2, 'c', 800)}</div>
      <div class="rw-t i" style="--d:950"><code>weather_station_sensor</code> · TimescaleDB · one row per reading · the last-seen row is updated</div>
      <div class="rw-ro"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#8CCBFF" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="12" width="16" height="11" rx="3"/><path d="M8.5 12V8.5a4.5 4.5 0 0 1 9 0V12"/></svg><span>The new backend reads this table. <b>Read-only.</b> It never writes.</span></div>`);
    /* heat index */
    const bandCol = ['#1E7B34', '#0CA957', '#F4F208', '#F39A1F', '#F90D0D'], bandNm = ['Normal', 'Caution', 'Extreme Caution', 'Danger', 'Extreme Danger'];
    ctx.v.hi = V('hi', `<div class="hi-in i" style="--d:0"><span>temperature<em>45 °C</em></span><span>humidity<em>30 %</em></span><span>wind<em>18 km/h</em></span></div>
      <div class="hi-fm i" style="--d:300"><i>T</i> + 0.33 × <i>RH</i> − 0.7 × <i>W</i> − 4.0<small>W in m/s: 18 km/h ÷ 3.6 = 5.0</small></div>
      <div class="hi-num i" style="--d:200"><span class="hv">0.0</span><small>°C</small></div><div class="hi-pill i" style="--d:0">Danger</div>
      <div class="hi-rl i" style="--d:500"><div class="mk"></div><div class="bar">${bandCol.map((c) => `<i style="background:${c};color:${c}"></i>`).join('')}</div><div class="nm">${bandNm.map((n) => `<span>${n}</span>`).join('')}</div></div>
      <div class="src vsrc">Worked example from the code's formula. Not a live reading.</div>`);
    ctx.hv = ctx.v.hi.querySelector('.hv'); ctx.hmk = ctx.v.hi.querySelector('.mk'); ctx.hbar = ctx.v.hi.querySelectorAll('.bar i'); ctx.hnm = ctx.v.hi.querySelectorAll('.nm span');
    /* decisions */
    ctx.v.dz = V('dz', `<div class="dz i" style="left:0;width:392px;--d:0"><span class="t">The band gives</span><b>Work, rest, water</b><span class="s">30 min work, 10 min rest, 250 ml every 15 min</span></div>
      <div class="dz i" style="left:412px;width:392px;--d:260"><span class="t">The limits give</span><b>Danger</b><span class="s">any reading at or above its limit</span></div>
      <div class="dz i" style="left:824px;width:392px;--d:520"><span class="t">The reading age gives</span><b>Station health</b><span class="s">live under 15 min, stale, dark</span></div>
      <div class="dz-a i" style="left:1228px;--d:700">›</div>
      <div class="dz vd i" style="left:1268px;width:392px;--d:850"><span class="t">Fixed rules give</span><b>DANGER</b><span class="s">the verdict, the steps and the confidence</span></div>
      <div class="src vsrc">Danger band row and rule order from the code. Worked example, not a live reading.</div>`);
    /* the page */
    ctx.v.page = V('page', `<div class="pg-st i" style="--d:0"><span class="pg-pill">DANGER</span>
        <div class="pg-tx"><b>Unsafe conditions</b><span>One or more readings indicate a danger-level condition.</span></div>
        <div class="pg-sp"><div><em>1</em>Pause outdoor work and move crews to shade/rest</div><div><em>2</em>Notify the site safety officer</div></div>
        <div class="pg-cf"><div class="br"><i style="height:14px"></i><i style="height:24px"></i><i style="height:34px"></i></div><span>Data confidence</span></div><i class="pg-poll"></i></div>
      <div class="pg-row"><div class="pg-c hc i" style="--d:400"><span class="l">Heat<br>index</span><b>47.4<small>°C</small></b><em>Danger</em></div>
        <div class="pg-c wr i" style="--d:550"><span class="l">Work<br>and rest</span><b>30<small>min</small></b><span class="sep"></span><b>10<small>min</small></b></div>
        <div class="pg-c wt i" style="--d:700"><span class="l">Drinking<br>water</span><b>250<small>ml</small></b><span class="l" style="text-transform:none;letter-spacing:0;font-size:22px">every 15 min</span></div></div>
      <div class="src vsrc">Simplified page, worked-example reading. Wording and steps as seen live on 4 Oct 2026. The page asks again every 60 s.</div>`);
    ctx.hop = ctx.q('.fw-hop'); ctx.adds = ctx.q('.fw-adds'); ctx.head = ctx.q('.fw-head');
    ctx.HOPS = [
      ['Hop 1 of 10 · Sensor head', 'A Modbus sensor head on a mesh node sends one block of 16 numbers on Wirepas endpoint 61.'],
      ['Hop 2 of 10 · Gateway', 'The gateway adds ids, receive time, travel time and hop count, then publishes MQTT to AWS IoT Core.'],
      ['Hop 3 of 10 · IoT rule and queue', 'One IoT rule puts every endpoint-61 frame into an SQS queue.'],
      ['Hop 4 of 10 · Decode', 'sensors-service reads the queue. The first byte says which device. It scales 16 values.'],
      ['Hop 5 of 10 · Store', 'It finds the project, rebuilds the reading time and stores one row of 29 columns in Timescale.'],
      ['Hop 6 of 10 · Backend reads', 'The new backend reads that table. Read-only: it never writes to it.'],
      ['Hop 7 of 10 · Heat index', 'Per request: newest reading of today, dead sensors swapped for the last good value, wind in km/h.'],
      ['Hop 8 of 10 · Verdict', 'The band gives work, rest and water. Limits give Danger. Reading age gives health. Rules give the verdict.'],
      ['Hop 9 of 10 · The page', 'The page asks every 60 seconds for readings, graphs and the verdict. The side branch is hop 10.'],
    ];
    /* step plan: [first station, second station or -1, view of first, view of second] */
    ctx.PLAN = [null, [0, 1, 'bytes', 'env'], [2, 3, 'json', 'dec'], [4, 5, 'row', 'row+ro'], [6, -1, 'hi'], [7, -1, 'dz'], [8, 9, 'page']];
    ctx.cur = 'tease'; ctx.tm = []; ctx.last = -1;
    /* ---- helpers ---- */
    const later = (ms, fn) => { const id = ctx.after(ms, fn); ctx.tm.push(id); return id; };
    ctx.clear = () => { ctx.tm.splice(0).forEach((id) => { clearTimeout(id); ctx._timers.delete(id); }); if (ctx.trv) { ctx.trv(); ctx.trv = null; } if (ctx.num) { ctx.num(); ctx.num = null; } };
    ctx.later = later;
    ctx.light = (n, on, anim) => {
      const s = ctx.st[n]; s.g.classList.toggle('on', on);
      if (on && anim && !ctx.calm) { s.g.classList.remove('pop'); void s.g.getBoundingClientRect(); s.g.classList.add('pop'); Fx.burstEl(s.ring, { n: 18, speed: 280 }); }
    };
    ctx.setCur = (n) => ctx.st.forEach((s, k) => s.g.classList.toggle('cur', k === n));
    ctx.setHead = (n, anim) => { const h = ctx.HOPS[Math.min(n, 8)]; ctx.hop.textContent = n < 0 ? 'One reading · ten hops' : h[0]; ctx.adds.textContent = n < 0 ? 'The same reading changes shape on the way: bytes, JSON, a row, a heat index card.' : h[1]; if (anim && !ctx.calm) { ctx.head.classList.remove('sw'); void ctx.head.offsetWidth; ctx.head.classList.add('sw'); } };
    ctx.heatSet = (v) => { ctx.hv.textContent = v.toFixed(1); const b = v < 25 ? 0 : v < 30 ? 1 : v < 39 ? 2 : v < 52 ? 3 : 4; ctx.hbar.forEach((e, k) => e.classList.toggle('on', k === b)); ctx.hnm.forEach((e, k) => e.classList.toggle('on', k === b)); ctx.hmk.style.left = ((b + .5) / 5 * 100) + '%'; ctx.v.hi.classList.toggle('band', b === 3 && v >= 39); };
    ctx.show = (name, anim) => {
      const ro = name === 'row+ro', nm = ro ? 'row' : name;
      Object.keys(ctx.v).forEach((k) => ctx.v[k].classList.toggle('on', k === nm));
      ctx.v.row.classList.toggle('ro-on', ro);
      ctx.cur = name;
      if (nm === 'bytes') { if (anim && !ctx.calm) Fx.counter(ctx.cnt, 34, { dur: 1000, delay: 700 }); else ctx.cnt.textContent = '34'; }
      if (nm === 'hi') {
        if (anim && !ctx.calm) { let t = -.5; ctx.heatSet(0); ctx.num = ctx.raf((dt) => { t += dt; const p = Math.max(0, Math.min(1, t / 1.5)); ctx.heatSet(47.4 * Fx.ease.outCubic(p)); if (p >= 1) { ctx.heatSet(47.4); ctx.num(); ctx.num = null; } }); } else ctx.heatSet(47.4);
      }
    };
    ctx.travel = (a, b, ms, done) => {
      if (ctx.trv) { ctx.trv(); ctx.trv = null; }
      pk.style.display = '';
      if (ctx.calm) { ctx.setPk(b); done && done(); return; }
      let t = 0; ctx.trv = ctx.raf((dt) => { t += dt * 1000; const p = Math.min(1, t / ms); ctx.setPk(a + (b - a) * Fx.ease.inOutCubic(p)); if (p >= 1) { ctx.trv(); ctx.trv = null; done && done(); } });
    };
    ctx.D = D; ctx.pk = pk;
    /* final state of a step, no animation */
    ctx.settle = (k) => {
      ctx.clear(); const P = ctx.PLAN[k], last = k === 0 ? -1 : (P[1] >= 0 ? P[1] : P[0]), end = Math.min(last, 8);
      ctx.st.forEach((s, n) => ctx.light(n, n <= end || (k === 6 && n === 9), false));
      ctx.setCur(k === 0 ? 0 : end);
      if (k === 0) { pk.style.display = 'none'; ctx.setPk(0); } else { pk.style.display = ''; ctx.setPk(D[end]); }
      root.classList.toggle('spur-on', k === 6); ctx.spurF.show(k === 6); if (k === 6) ctx.spurF.start(); else ctx.spurF.stop();
      ctx.idle.show(k === 0); if (k === 0) ctx.idle.start(); else ctx.idle.stop();
      ctx.setHead(k === 0 ? -1 : (k === 6 ? 8 : last), false);
      ctx.show(k === 0 ? 'tease' : P[P[1] >= 0 ? 3 : 2], false);
      ctx.last = k;
    };
    ctx.play = (k) => {
      const P = ctx.PLAN[k], a = P[0], b = P[1], D0 = ctx.D;
      ctx.idle.show(false); ctx.idle.stop();
      const arrive = (n, view, big) => { ctx.light(n, true, true); ctx.setCur(Math.min(n, 8)); ctx.setHead(n, true); ctx.show(view, true); if (big) ctx.later(250, () => Fx.burstEl(ctx.v.page, { n: 40, speed: 460 })); };
      if (k === 1) {
        pk.style.display = ''; ctx.setPk(D0[0]); ctx.light(0, true, true); ctx.setCur(0); ctx.setHead(0, true); ctx.show('bytes', true);
        later(2600, () => ctx.travel(D0[0], D0[1], 1400, () => arrive(1, 'env')));
      } else if (k === 6) {
        const prev = ctx.PLAN[5][0];
        root.classList.add('spur-on'); ctx.spurF.show(true); ctx.spurF.start();
        ctx.travel(D0[prev], D0[8], 1500, () => { arrive(8, 'page', true); later(900, () => ctx.light(9, true, true)); });
      } else {
        const prev = ctx.PLAN[k - 1], pn = prev[1] >= 0 ? prev[1] : prev[0];
        ctx.setCur(-1);
        ctx.travel(D0[pn], D0[a], 1300, () => {
          arrive(a, P[2]);
          if (b >= 0) later(k === 3 ? 2600 : 2800, () => ctx.travel(D0[a], D0[b], 1200, () => { arrive(b, P[3]); }));
        });
      }
    };
    ctx.settle(0);
  },
  enter(ctx) { ctx.prevStep = undefined; },
  step(ctx, i, dir, instant) {
    const jump = instant || ctx.calm || ctx.prevStep === undefined || i === 0 || i - ctx.prevStep !== 1;
    root_nt(ctx, () => { if (jump) ctx.settle(i); else { ctx.settle(i - 1); } });
    if (!jump) ctx.play(i);
    ctx.prevStep = i;
    function root_nt(c, fn) { c.root.classList.add('nt'); fn(); void c.root.offsetWidth; requestAnimationFrame(() => c.root.classList.remove('nt')); }
  },
  leave(ctx) { ctx.clear(); },
  static(ctx) { ctx.root.classList.add('nt'); ctx.settle(6); ctx.spurF.freeze(); ctx.idle.stop(); ctx.setCur(-1); },
});
