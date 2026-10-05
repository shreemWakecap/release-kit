/* Slide 08: where each number comes from. Four tags (device, computed, policy, person) fly from the legend and land on the numbers of a simplified Weather Station page.
   The numbers are from one live screen (Project A, 4 Oct 2026). Easy words, few words: the only text is the headline, the four tags, the closing line and the page labels. */
const PV_BD = (k) => `<span class="bd"><i></i><svg viewBox="0 0 24 24"><use href="#pv-${k}"/></svg></span>`;
const PV_LEGEND = [['dev', 'Device', 'a sensor sends it'], ['comp', 'Calculated', 'we work it out'], ['pol', 'Policy', 'a rule someone set'], ['per', 'Person', 'someone chose it']]
  .map(([k, name, mean], n) => `<div class="lg" data-o="${n + 1}"><i class="lg-ghost"></i><i class="lg-gb a"></i><i class="lg-gb b"></i>${n ? '<i class="lg-seg"></i>' : ''}<div class="lg-bd"><i class="lg-ring"></i><svg viewBox="0 0 24 24"><use href="#pv-${k}"/></svg></div><div class="lg-t"><b>${name}</b><span>${mean}</span></div></div>`).join('');

Deck.add({
  id: 'provenance', section: 'tech', title: 'Where each number comes from', reality: ['code'],
  steps: 5, ambient: { orb: 1, beam: .5, dust: .9 }, dur: [3600, 4600, 4800, 4800, 6400, 5600], minutes: 1,
  notes: 'Every number on this page comes from somewhere. There are four kinds of source.\nDevice: a sensor sent it, like the dust reading.\nCalculated: we work it out. Examples: the heat index, the Danger answer, and the age of the last reading.\nPolicy: a rule someone set, like the work and rest cycle.\nPerson: someone chose it, like which readings are featured.\nLightning and Gas work the same way.\nIf asked: the numbers are from a live Project A screen, 4 Oct 2026. Heat index (HeatIndexCalculator, default method) = temperature + 0.33 x humidity - 0.7 x wind (m/s) - 4.0; the method is a per-project setting. Band (HeatIndexBandResolver): the first one where start <= heat index < end; it gives work, rest and water, and the band table is policy. Verdict (SafetyVerdictService): unknown if the station has gone dark, then danger (heat band or a limit), then caution, else safe. Station health (StationHealthService): live under 15 min, stale 15 to under 60, dark 60 or more; it also writes the \"last reading N minutes ago\" text. The dust number is the raw sensor value; the Danger flag beside it on the real page is a computed check against a policy limit. Lightning: the tile state comes from the warning unit, the held-for time is worked out, the alert distances are settings. Gas: readings come from the vendor detector, the Check state is worked out in the browser, the limits are policy, a person acknowledges alerts.',
  html: `
    <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <symbol id="pv-dev" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><circle cx="12" cy="19.2" r="1.5" fill="currentColor" stroke="none"/><path d="M8.4 15.4a5.2 5.2 0 0 1 7.2 0"/><path d="M5.2 12.2a9.6 9.6 0 0 1 13.6 0"/><path d="M2.2 9a13.9 13.9 0 0 1 19.6 0"/></g></symbol>
      <symbol id="pv-comp" viewBox="0 0 24 24"><path d="M18.4 5H6.4l6.2 7-6.2 7h12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
      <symbol id="pv-pol" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M3.5 8h17M3.5 16h17"/><circle cx="9" cy="8" r="2.7" fill="#0B0B0C"/><circle cx="15.5" cy="16" r="2.7" fill="#0B0B0C"/></g></symbol>
      <symbol id="pv-per" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><circle cx="12" cy="8" r="3.7"/><path d="M4.6 20.2c.7-4.1 3.5-6.4 7.4-6.4s6.7 2.3 7.4 6.4"/></g></symbol>
      <symbol id="pv-alert" viewBox="0 0 24 24"><path d="M12 3.6 21.8 20.4H2.2z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 10v4.6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.6" r="1.3" fill="currentColor"/></symbol>
      <symbol id="pv-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 6.8V12l3.4 2.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
      <symbol id="pv-therm" viewBox="0 0 24 24"><path d="M10 13.6V5.4a2 2 0 0 1 4 0v8.2a4.2 4.2 0 1 1-4 0z" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round"/><circle cx="12" cy="17" r="1.6" fill="currentColor"/></symbol>
      <symbol id="pv-drop" viewBox="0 0 24 24"><path d="M12 3.4c3.5 4.2 5.7 7.1 5.7 10.2a5.7 5.7 0 0 1-11.4 0c0-3.1 2.2-6 5.7-10.2z" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round"/></symbol>
      <symbol id="pv-wind" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M3 9.5h10.6a2.6 2.6 0 1 0-2.4-3.6"/><path d="M3 14.2h14.2a2.8 2.8 0 1 1-2.6 3.9"/></g></symbol>
      <symbol id="pv-dust" viewBox="0 0 24 24"><g fill="currentColor"><circle cx="6.5" cy="8" r="1.8"/><circle cx="14.5" cy="5.5" r="1.4"/><circle cx="11" cy="12.5" r="2.4"/><circle cx="18.2" cy="13.5" r="1.7"/><circle cx="6.8" cy="17.8" r="1.4"/><circle cx="15.2" cy="19" r="1.2"/></g></symbol>
      <symbol id="pv-gear" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="7.4" stroke-width="3.6" stroke-dasharray="3.7 2.1"/></g></symbol>
    </defs></svg>

    <h2 class="h2 pv-h" data-step="0">Where each number <span class="o glow-text">comes from</span></h2>

    <div class="pv-dim">
      <div class="pv-page" data-step="0" data-delay="250">
        <div class="pv-strip">
          <div class="tg pv-verdict" data-o="2"><svg class="ic" viewBox="0 0 24 24"><use href="#pv-alert"/></svg><span class="val">Danger</span>${PV_BD('comp')}</div>
          <div class="tg pv-age" data-o="2"><svg class="ic" viewBox="0 0 24 24"><use href="#pv-clock"/></svg><span class="val"><b class="n" data-v="1">1</b> min ago</span>${PV_BD('comp')}</div>
        </div>
        <div class="pv-heat">
          <div class="pv-lab"><svg class="ic" viewBox="0 0 24 24"><use href="#pv-therm"/></svg>Heat index</div>
          <div class="tg pv-hi" data-o="2"><span class="val"><b class="n" data-v="49.5">49.5</b><sup>°C</sup></span>${PV_BD('comp')}</div>
          <div class="tg pv-cycle" data-o="3">
            <svg class="pv-ring" viewBox="0 0 120 120"><circle class="rg0" cx="60" cy="60" r="48"/><circle class="rk" cx="60" cy="60" r="48" transform="rotate(-90 60 60)"/><circle class="rt" cx="60" cy="60" r="48" transform="rotate(184 60 60)"/></svg>
            <div class="cy c1"><span class="val">30</span><small>min</small><em>work</em></div>
            <div class="cy c2"><span class="val">10</span><small>min</small><em>rest</em></div>
            ${PV_BD('pol')}
          </div>
        </div>
        <div class="pv-dust">
          <div class="pv-lab"><svg class="ic" viewBox="0 0 24 24"><use href="#pv-dust"/></svg>Dust</div>
          <div class="tg pv-dv" data-o="1"><span class="val"><b class="n" data-v="63.0">63.0</b></span><span class="unit">µg/m³</span>${PV_BD('dev')}</div>
        </div>
        <div class="tg pv-feat" data-o="4">
          <svg class="gear" viewBox="0 0 24 24"><use href="#pv-gear"/></svg>
          <div class="fc" style="left:71px"><svg viewBox="0 0 24 24"><use href="#pv-therm"/></svg><div class="tgl"><i></i></div></div>
          <div class="fc" style="left:212px"><svg viewBox="0 0 24 24"><use href="#pv-drop"/></svg><div class="tgl"><i></i></div></div>
          <div class="fc" style="left:353px"><svg viewBox="0 0 24 24"><use href="#pv-wind"/></svg><div class="tgl"><i></i></div></div>
          ${PV_BD('per')}
        </div>
      </div>
    </div>

    <div class="pv-lg">${PV_LEGEND}</div>

    <div class="pv-end" data-step="5">Lightning and Gas work <span class="o glow-text">the same way.</span></div>

    <div class="pv-cur"><svg viewBox="0 0 24 24" width="44" height="44"><path d="M5 3l13 6.8-5.6 1.7 3.5 6.3-2.6 1.4-3.5-6.3L5 17z" fill="#fff" stroke="#0B0B0C" stroke-width="1.2" stroke-linejoin="round"/></svg></div>`,
  css: `
    .s-provenance{--c-dev:#33D6E8;--c-comp:#FF8300;--c-pol:#A98BFF;--c-per:#FF5CA8;--pv-ink:#0B0B0C}
    .s-provenance.no-trans *,.s-provenance.no-trans *::before,.s-provenance.no-trans *::after{transition:none!important;animation:none!important}
    .s-provenance .pv-h{position:absolute;left:96px;top:114px;width:1500px}
    .s-provenance .pv-dim{position:absolute;left:0;top:0;width:1920px;height:1080px;pointer-events:none;transition:opacity 1s var(--ease),filter 1s var(--ease)}
    .s-provenance.fin .pv-dim{opacity:.5;filter:saturate(.75)}

    /* the page replica */
    .s-provenance .pv-page{position:absolute;left:96px;top:236px;width:1100px;height:620px;border-radius:34px;background:linear-gradient(150deg,rgba(255,255,255,.075),rgba(255,255,255,.022));border:1px solid rgba(255,255,255,.14);box-shadow:0 40px 90px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.12)}
    .s-provenance .pv-strip{position:absolute;left:26px;top:36px;width:1046px;height:98px;border-radius:24px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12)}
    .s-provenance .pv-heat,.s-provenance .pv-dust{position:absolute;border-radius:28px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.12)}
    .s-provenance .pv-heat{left:26px;top:158px;width:600px;height:436px}
    .s-provenance .pv-dust{left:650px;top:158px;width:424px;height:200px}
    .s-provenance .pv-lab{position:absolute;left:34px;top:24px;display:flex;align-items:center;gap:12px;font:600 26px/1 var(--font);color:var(--mut)}
    .s-provenance .pv-lab .ic{width:30px;height:30px}
    .s-provenance .ic{flex:none;color:#B9B9B4;transition:color .6s var(--ease)}
    .s-provenance .tg.lit .ic{color:var(--c)}
    .s-provenance .val{color:#E8E8E3;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
    .s-provenance .n{font-weight:inherit}

    /* tagged items: outline, colour, badge */
    .s-provenance .tg{position:relative;isolation:isolate;--c:#fff}
    .s-provenance .tg[data-o="1"]{--c:var(--c-dev)}.s-provenance .tg[data-o="2"]{--c:var(--c-comp)}.s-provenance .tg[data-o="3"]{--c:var(--c-pol)}.s-provenance .tg[data-o="4"]{--c:var(--c-per)}
    .s-provenance .tg::before{content:"";position:absolute;inset:-14px -22px;border-radius:22px;border:2px solid var(--c);background:color-mix(in srgb,var(--c) 11%,transparent);box-shadow:0 0 44px color-mix(in srgb,var(--c) 38%,transparent),inset 0 0 26px color-mix(in srgb,var(--c) 14%,transparent);opacity:0;transform:scale(.93);transition:opacity .7s var(--ease),transform .7s var(--ease);z-index:-1;pointer-events:none}
    .s-provenance .tg.lit::before{opacity:1;transform:none}
    .s-provenance .tg .val{transition:color .6s var(--ease),text-shadow .6s var(--ease)}
    .s-provenance .tg.lit .val{color:var(--c);text-shadow:0 0 30px color-mix(in srgb,var(--c) 60%,transparent)}
    .s-provenance .bd{position:absolute;right:-50px;top:-46px;width:52px;height:52px;border-radius:50%;background:var(--pv-ink);border:2px solid var(--c);color:var(--c);display:grid;place-items:center;box-shadow:0 0 28px color-mix(in srgb,var(--c) 55%,transparent);opacity:0;transform:scale(.3);transition:opacity .4s var(--ease),transform .7s cubic-bezier(.3,1.5,.4,1);z-index:3}
    .s-provenance .bd svg{width:30px;height:30px}
    .s-provenance .bd i{position:absolute;inset:-2px;border-radius:50%;border:2px solid var(--c);opacity:0;pointer-events:none}
    .s-provenance .tg.lit .bd{opacity:1;transform:scale(1)}
    .s-provenance .tg.ping .bd i{animation:pvPing 1.3s ease-out 2}
    @keyframes pvPing{0%{transform:scale(1);opacity:.85}100%{transform:scale(2.6);opacity:0}}

    /* strip */
    .s-provenance .pv-verdict{position:absolute;left:46px;top:19px;height:60px;display:flex;align-items:center;gap:16px}
    .s-provenance .pv-verdict .ic{width:46px;height:46px}
    .s-provenance .pv-verdict .val{font-size:52px;line-height:1;font-weight:800}
    .s-provenance .pv-age{position:absolute;right:78px;top:23px;height:52px;display:flex;align-items:center;gap:14px}
    .s-provenance .pv-age .ic{width:40px;height:40px}
    .s-provenance .pv-age .val{font-size:42px;line-height:1;font-weight:700}

    /* heat card */
    .s-provenance .pv-hi{position:absolute;left:34px;top:80px}
    .s-provenance .pv-hi .val{display:block;font:900 156px/1 var(--font);letter-spacing:-.045em}
    .s-provenance .pv-hi sup{font:700 56px/1 var(--font);letter-spacing:0;vertical-align:top;position:relative;top:12px;margin-left:10px}
    .s-provenance .pv-cycle{position:absolute;left:26px;top:268px;width:546px;height:148px;border-radius:24px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)}
    .s-provenance .pv-cycle::before{inset:-8px;border-radius:30px}
    .s-provenance .pv-cycle .bd{right:-24px;top:-26px}
    .s-provenance .pv-ring{position:absolute;left:30px;top:24px;width:100px;height:100px;overflow:visible}
    .s-provenance .pv-ring circle{fill:none;stroke-width:14}
    .s-provenance .pv-ring .rg0{stroke:rgba(255,255,255,.13)}
    .s-provenance .pv-ring .rk{stroke:var(--c-pol);stroke-dasharray:222 302;stroke-dashoffset:222;opacity:0;transition:stroke-dashoffset 1.1s var(--ease),opacity .2s}
    .s-provenance .pv-ring .rt{stroke:var(--c-pol);stroke-dasharray:69 302;stroke-dashoffset:69;opacity:0;transition:stroke-dashoffset .7s var(--ease) .5s,opacity .2s .5s}
    .s-provenance .pv-cycle.lit .rk{stroke-dashoffset:0;opacity:1}
    .s-provenance .pv-cycle.lit .rt{stroke-dashoffset:0;opacity:.5}
    .s-provenance .cy{position:absolute;top:18px}
    .s-provenance .cy.c1{left:176px}.s-provenance .cy.c2{left:366px}
    .s-provenance .cy .val{font:800 76px/1 var(--font)}
    .s-provenance .cy small{font:600 26px/1 var(--font);color:var(--mut);margin-left:8px}
    .s-provenance .cy em{display:block;margin-top:12px;font:600 26px/1 var(--font);font-style:normal;color:var(--mut)}

    /* dust and featured */
    .s-provenance .pv-dv{position:absolute;left:34px;top:74px;display:flex;align-items:baseline;gap:14px}
    .s-provenance .pv-dv .val{font:900 100px/1 var(--font);letter-spacing:-.04em}
    .s-provenance .pv-dv .unit{font:600 30px/1 var(--font);color:var(--mut)}
    .s-provenance .pv-feat{position:absolute;left:650px;top:382px;width:424px;height:212px;border-radius:28px;border:2px dashed rgba(255,255,255,.2);background:rgba(255,255,255,.02)}
    .s-provenance .pv-feat::before{inset:-10px;border-radius:34px}
    .s-provenance .pv-feat .bd{right:-26px;top:-28px}
    .s-provenance .pv-feat .gear{position:absolute;left:24px;top:20px;width:34px;height:34px;color:#8E8E89}
    .s-provenance .pv-feat .fc{position:absolute;top:66px;width:96px;margin-left:-48px;display:flex;flex-direction:column;align-items:center;gap:22px}
    .s-provenance .pv-feat .fc svg{width:42px;height:42px;color:#CFCFCA}
    .s-provenance .tgl{position:relative;width:86px;height:46px;border-radius:23px;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.2);transition:background .35s,border-color .35s,box-shadow .35s}
    .s-provenance .tgl i{position:absolute;left:4px;top:3px;width:36px;height:36px;border-radius:50%;background:#9B9B96;transition:left .35s var(--ease),background .35s}
    .s-provenance .tgl.on{background:color-mix(in srgb,var(--c-per) 62%,transparent);border-color:var(--c-per);box-shadow:0 0 24px color-mix(in srgb,var(--c-per) 50%,transparent)}
    .s-provenance .tgl.on i{left:44px;background:#fff}
    .s-provenance .tgl::after{content:"";position:absolute;left:50%;top:50%;width:28px;height:28px;margin:-14px;border-radius:50%;border:2px solid var(--c-per);opacity:0;pointer-events:none}
    .s-provenance .tgl.clk::after{animation:pvPing .8s ease-out 1}

    /* legend */
    .s-provenance .pv-lg{position:absolute;left:1330px;top:286px;width:500px;height:522px}
    .s-provenance .lg{position:absolute;left:0;width:500px;height:84px;--c:#fff}
    .s-provenance .lg[data-o="1"]{top:0;--c:var(--c-dev)}.s-provenance .lg[data-o="2"]{top:146px;--c:var(--c-comp)}.s-provenance .lg[data-o="3"]{top:292px;--c:var(--c-pol)}.s-provenance .lg[data-o="4"]{top:438px;--c:var(--c-per)}
    .s-provenance .lg[data-o="2"]{--pc:var(--c-dev)}.s-provenance .lg[data-o="3"]{--pc:var(--c-comp)}.s-provenance .lg[data-o="4"]{--pc:var(--c-pol)}
    .s-provenance .lg-seg{position:absolute;left:40px;top:-56px;width:3px;height:50px;border-radius:2px;background:rgba(255,255,255,.1)}
    .s-provenance .lg-seg::after{content:"";position:absolute;inset:0;border-radius:2px;background:linear-gradient(var(--pc),var(--c));box-shadow:0 0 14px color-mix(in srgb,var(--c) 60%,transparent);transform:scaleY(0);transform-origin:50% 0;transition:transform .6s var(--ease)}
    .s-provenance .lg.lit .lg-seg::after{transform:scaleY(1)}
    .s-provenance .lg-ghost{position:absolute;left:0;top:0;width:84px;height:84px;border-radius:50%;border:2px dashed rgba(255,255,255,.22);transition:opacity .5s}
    .s-provenance .lg-gb{position:absolute;left:112px;height:14px;border-radius:7px;background:rgba(255,255,255,.07);transition:opacity .5s}
    .s-provenance .lg-gb.a{top:20px;width:150px}.s-provenance .lg-gb.b{top:50px;width:270px}
    .s-provenance .lg.lit .lg-ghost,.s-provenance .lg.lit .lg-gb{opacity:0}
    .s-provenance .lg-bd{position:absolute;left:0;top:0;width:84px;height:84px;border-radius:50%;background:var(--pv-ink);border:2.5px solid var(--c);color:var(--c);display:grid;place-items:center;box-shadow:0 0 38px color-mix(in srgb,var(--c) 50%,transparent);opacity:0;transform:scale(.4);transition:opacity .4s var(--ease),transform .8s cubic-bezier(.3,1.5,.4,1)}
    .s-provenance .lg-bd svg{width:46px;height:46px}
    .s-provenance .lg-ring{position:absolute;inset:-2px;border-radius:50%;border:2px solid var(--c);opacity:0;pointer-events:none}
    .s-provenance .lg.ping .lg-ring{animation:pvPing 1.3s ease-out 2}
    .s-provenance .lg.lit .lg-bd{opacity:1;transform:scale(1)}
    .s-provenance .lg-t{position:absolute;left:112px;top:0;height:84px;display:flex;flex-direction:column;justify-content:center;opacity:0;transform:translateX(-18px);transition:opacity .6s var(--ease) .15s,transform .6s var(--ease) .15s}
    .s-provenance .lg.lit .lg-t{opacity:1;transform:none}
    .s-provenance .lg-t b{font:800 38px/1.05 var(--font);color:var(--c);text-shadow:0 0 26px color-mix(in srgb,var(--c) 50%,transparent)}
    .s-provenance .lg-t span{font:500 31px/1.2 var(--font);color:#E6E6E1;margin-top:6px}

    /* closing line, flying badge, cursor */
    .s-provenance .pv-end{position:absolute;left:96px;top:906px;width:1728px;text-align:center;font:800 58px/1.1 var(--font);letter-spacing:-.02em;color:#F4F4F2}
    .s-provenance .fly{position:absolute;left:0;top:0;width:52px;height:52px;border-radius:50%;background:var(--pv-ink);border:2px solid var(--c);color:var(--c);display:grid;place-items:center;box-shadow:0 0 34px var(--c),0 0 8px var(--c);z-index:8;pointer-events:none}
    .s-provenance .fly svg{width:30px;height:30px}
    .s-provenance .pv-cur{position:absolute;left:0;top:0;width:44px;height:44px;opacity:0;pointer-events:none;z-index:9;transition:left .8s var(--ease),top .8s var(--ease),opacity .35s;filter:drop-shadow(0 0 12px rgba(255,92,168,.95))}
    .s-provenance .pv-cur.snap{transition:none}`,

  init(ctx) {
    ctx.items = ctx.qa('.tg'); ctx.rows = ctx.qa('.lg'); ctx.togs = ctx.qa('.tgl'); ctx.cur = ctx.q('.pv-cur'); ctx.pend = [];
    ctx.COL = { 1: '#33D6E8', 2: '#FF8300', 3: '#A98BFF', 4: '#FF5CA8' };
    ctx.clear = () => { ctx.pend.splice(0).forEach((f) => { try { f(); } catch (e) { /* ignore */ } }); };
    /* position of an element on the 1920 stage, ignoring transforms */
    ctx.where = (el) => { let x = 0, y = 0, n = el; while (n && n !== ctx.root) { x += n.offsetLeft; y += n.offsetTop; const p = n.offsetParent; if (p && p !== ctx.root) { x += p.clientLeft; y += p.clientTop; } n = p; } return { x, y, w: el.offsetWidth, h: el.offsetHeight, cx: x + el.offsetWidth / 2, cy: y + el.offsetHeight / 2 }; };
  },

  step(ctx, i, dir, instant) {
    ctx.clear(); ctx.qa('.ping,.clk').forEach((e) => e.classList.remove('ping', 'clk')); ctx.cur.style.opacity = 0;
    const later = (ms, fn) => { const id = ctx.after(ms, fn); ctx.pend.push(() => clearTimeout(id)); };
    const animate = dir > 0 && !instant && !ctx.calm && i >= 1 && i <= 4;
    const setState = (hold) => {
      ctx.rows.forEach((r) => r.classList.toggle('lit', +r.dataset.o <= i));
      ctx.items.forEach((t) => t.classList.toggle('lit', +t.dataset.o <= i && +t.dataset.o !== hold));
      ctx.togs.forEach((t, k) => t.classList.toggle('on', i >= 4 && k < 2 && hold !== 4));
      ctx.root.classList.toggle('fin', i >= 5);
      ctx.qa('.n').forEach((n) => { n.textContent = n.dataset.v; });
    };
    setState(animate ? i : 0);
    if (i === 5 && dir > 0 && !instant && !ctx.calm) {
      ctx.rows.forEach((r, k) => later(250 + k * 230, () => { r.classList.add('ping'); later(1400, () => r.classList.remove('ping')); }));
      later(700, () => Fx.burstEl(ctx.q('.pv-end'), { n: 30, speed: 420 }));
    }
    if (!animate) return;

    /* a tag flies from the legend and lands on its numbers */
    const row = ctx.rows[i - 1], col = ctx.COL[i], targets = ctx.items.filter((t) => +t.dataset.o === i);
    row.classList.add('ping'); later(2800, () => row.classList.remove('ping'));
    const scramble = (el, dur) => {
      const fin = el.dataset.v, t0 = performance.now(), idx = [...fin].map((c, k) => (/\d/.test(c) ? k : -1)).filter((k) => k >= 0);
      const stop = ctx.raf(() => {
        const p = Math.min(1, (performance.now() - t0) / dur);
        el.textContent = [...fin].map((c, k) => { const j = idx.indexOf(k); return j < 0 || p >= (j + 1) / (idx.length + .4) ? c : String((Math.random() * 10) | 0); }).join('');
        if (p >= 1) { el.textContent = fin; stop(); }
      });
      ctx.pend.push(() => { stop(); el.textContent = fin; });
    };
    const person = () => {
      const t0 = ctx.where(ctx.rows[3].querySelector('.lg-bd')), a = ctx.where(ctx.togs[0]), b = ctx.where(ctx.togs[1]);
      ctx.cur.classList.add('snap'); ctx.cur.style.left = (t0.cx - 9) + 'px'; ctx.cur.style.top = (t0.cy - 5) + 'px'; void ctx.cur.offsetWidth; ctx.cur.classList.remove('snap');
      const click = (k) => { ctx.togs[k].classList.add('on', 'clk'); Fx.burstEl(ctx.togs[k], { n: 14, color: col, speed: 240 }); };
      later(60, () => { ctx.cur.style.opacity = 1; ctx.cur.style.left = (a.cx - 9) + 'px'; ctx.cur.style.top = (a.cy - 5) + 'px'; });
      later(850, () => click(0));
      later(1150, () => { ctx.cur.style.left = (b.cx - 9) + 'px'; ctx.cur.style.top = (b.cy - 5) + 'px'; });
      later(1700, () => click(1));
      later(2150, () => { ctx.cur.style.opacity = 0; });
    };
    const trail = ctx.raf(() => { ctx.qa('.fly').forEach((f) => { if (+getComputedStyle(f).opacity < .3) return; const r = f.getBoundingClientRect(); Fx.burst(r.left + r.width / 2, r.top + r.height / 2, { n: 2, speed: 34, color: col, life: .6 }); }); });
    ctx.pend.push(trail); later(2600, trail);
    targets.forEach((tg, k) => {
      const src = ctx.where(row.querySelector('.lg-bd')), dst = ctx.where(tg.querySelector('.bd'));
      const x0 = src.cx - 26, y0 = src.cy - 26, x1 = dst.cx - 26, y1 = dst.cy - 26, mx = (x0 + x1) / 2, my = Math.min(y0, y1) - 70;
      const el = Fx.el('div', { class: 'fly', html: row.querySelector('.lg-bd svg').outerHTML }, ctx.root); el.style.setProperty('--c', col);
      const an = el.animate([
        { transform: `translate(${x0}px,${y0}px) scale(1.5)`, opacity: 0 },
        { transform: `translate(${x0}px,${y0}px) scale(1.5)`, opacity: 1, offset: .1 },
        { transform: `translate(${mx}px,${my}px) scale(1.2)`, opacity: 1, offset: .55 },
        { transform: `translate(${x1}px,${y1}px) scale(1)`, opacity: 1 },
      ], { duration: 950, delay: 420 + k * 170, easing: 'cubic-bezier(.45,0,.2,1)', fill: 'both' });
      ctx.pend.push(() => { an.cancel(); el.remove(); });
      an.onfinish = () => {
        el.remove(); if (!ctx.active || ctx.step !== i) return;
        tg.classList.add('lit', 'ping'); Fx.burstEl(tg.querySelector('.bd'), { n: 16, color: col, speed: 290 });
        if (i === 2) tg.querySelectorAll('.n').forEach((n) => scramble(n, 800));
        if (i === 4) person();
      };
    });
  },

  leave(ctx) { ctx.clear(); },

  static(ctx) {
    ctx.clear(); ctx.rows.forEach((r) => r.classList.add('lit')); ctx.items.forEach((t) => t.classList.add('lit'));
    ctx.togs.forEach((t, k) => t.classList.toggle('on', k < 2)); ctx.root.classList.remove('fin'); ctx.cur.style.opacity = 0;
    ctx.qa('.n').forEach((n) => { n.textContent = n.dataset.v; });
  },
});
