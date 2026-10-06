/* Slide: the build in numbers. One idea: what was built, counted from the code.
   Three layers (Screens, Server, Data), eight odometers that roll up one layer per step, a spine of light packets that links the layers,
   and on the last step the short command behind each number types in. Facts: research C1 (sections 3.7, 3.10, 5) and C5 (sections 2.1, 12).
   Every number was re-counted on the main branch (front end of 5 Oct 2026, backend of 4 Oct 2026) before it went on the slide, and each command on the slide was run in its folder (checked again on 5 Oct 2026 on a copy of master). The Products command counts the three product folders in features, because the front end has no single product list. */
Deck.add({
  id: 'build', section: 'convert', title: 'The build in numbers', kicker: 'The conversion · The build in numbers', reality: ['code'],
  steps: 4, ambient: { orb: 1, beam: .5, dust: .9 }, dur: [3600, 5000, 5000, 5000, 6500], minutes: 1,
  notes: [
    'Here is what was built, counted from the code.',
    'Step 1: three products and six feature folders.',
    'Step 2: the server has 28 request groups and 67 requests.',
    'It also has 7 background services and 33 tools for AI.',
    'Step 3: after 43 database changes, there are 31 tables.',
    'Step 4: each number has a short command anyone can run.',
    'If asked: request groups are controllers and requests are endpoints. There are 30 controller files, and 2 are base classes, so 28 are real. Tools for AI are MCP tools, and database changes are migrations. Counted on the main branch: the backend on 4 Oct 2026 and the front end on 5 Oct 2026. That is code in master, not a deploy check. The 67 requests are 45 read, 11 create, 10 update and 1 delete; a looser search finds 11 updates because one code comment mentions an update. The 7 background services are 2 for Weather, 4 for Lightning and 1 for Gas. Of the 33 AI tools, 26 only read, 4 propose changes and 3 are observer writes, and all are for Weather. All 31 tables sit in one database for the three products, and it had 10 tables on 26 Jul 2026. The 3 products are Weather Station, Lightning and Gas. The 6 feature folders are Weather Station, Lightning, Gas, Reports, Settings and config. Where each command runs: the two front end commands in the src/app folder; the two request commands in the Web API project; the services command in the Core project; the tools command in Mcp/Tools inside Web API; the two data commands in Infrastructure/Migrations. Run in those folders, the commands print the same counts. The products command counts the three product folders inside features.',
  ].join('\n'),
  html: `
    <h2 class="h2 bd-h" data-step="0">The build in <span class="o glow-text">numbers</span></h2>
    <p class="lead bd-lead" data-step="0" data-delay="200"><span class="la">Counted from the code.</span><span class="lb">One command for each number.</span></p>
    <svg class="bd-svg" viewBox="0 0 1920 1080" width="1920" height="1080"></svg>
    <div class="bd-wall"></div>`,
  css: `
    .s-build .bd-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-build .bd-lead{position:absolute;left:96px;top:196px;width:1500px;height:40px;font-size:27px}
    .s-build .bd-lead span{position:absolute;left:0;top:0;white-space:nowrap;transition:opacity .6s var(--ease),transform .6s var(--ease)}
    .s-build .bd-lead .lb{opacity:0;transform:translateY(14px);color:var(--wc-orange-soft)}
    .s-build .bd-lead.b .la{opacity:0;transform:translateY(-14px)}
    .s-build .bd-lead.b .lb{opacity:1;transform:none}
    .s-build .bd-svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
    .s-build .bd-wall{position:absolute;left:0;top:0;width:1920px;height:1080px}
    .s-build .bd-lay{position:absolute;left:142px;width:126px;font:800 28px/1.1 var(--font);color:#fff;opacity:.4;transition:opacity .7s var(--ease),text-shadow .7s}
    .s-build .bd-lay.on{opacity:1;text-shadow:0 0 26px rgba(255,131,0,.5)}
    .s-build .nd .ring{fill:#0B0B0C;stroke:rgba(255,255,255,.34);stroke-width:2.6;transition:stroke .6s,fill .6s}
    .s-build .nd .core{fill:rgba(255,255,255,.2);transition:fill .6s}
    .s-build .nd.on .ring{stroke:#FF8300}
    .s-build .nd.on .core{fill:#FF8300}
    .s-build .bd-card{position:absolute;height:228px;border-radius:24px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.02)),rgba(12,12,14,.62);box-shadow:inset 0 1px 0 rgba(255,255,255,.1);opacity:.42;transition:opacity .7s var(--ease),border-color .7s,box-shadow .7s,transform .35s var(--ease)}
    .s-build .bd-card.on{opacity:1;border-color:rgba(255,131,0,.5);box-shadow:0 0 0 1px rgba(255,131,0,.14),0 0 44px rgba(255,131,0,.14),inset 0 1px 0 rgba(255,255,255,.16)}
    .s-build .bd-card.on:hover{transform:translateY(-4px);border-color:rgba(255,160,70,.9);box-shadow:0 0 0 1px rgba(255,131,0,.3),0 0 64px rgba(255,131,0,.3),inset 0 1px 0 rgba(255,255,255,.2)}
    .s-build .bd-card.done{animation:bdDone 1.1s ease-out}
    @keyframes bdDone{0%{box-shadow:0 0 0 2px rgba(255,205,150,.7),0 0 110px rgba(255,131,0,.55),inset 0 1px 0 rgba(255,255,255,.2)}100%{box-shadow:0 0 0 1px rgba(255,131,0,.14),0 0 44px rgba(255,131,0,.14),inset 0 1px 0 rgba(255,255,255,.16)}}
    .s-build .bd-top{position:absolute;left:24px;top:14px;display:flex;align-items:center;gap:16px;height:124px}
    .s-build .od{display:flex;flex:none;filter:drop-shadow(0 0 16px rgba(255,131,0,.5))}
    .s-build .od.pop{animation:odPop .55s var(--ease)}
    @keyframes odPop{0%{transform:scale(1.14)}100%{transform:none}}
    .s-build .od-w{position:relative;display:block;width:70px;height:124px;overflow:hidden;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 88%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 88%,transparent 100%)}
    .s-build .od-w span{position:absolute;left:0;top:0;width:100%;height:124px;text-align:center;font:900 116px/124px var(--font);font-variant-numeric:tabular-nums;letter-spacing:-.02em;color:#fff;filter:blur(var(--bl,0px))}
    .s-build .od-w span::before{content:attr(data-d)}
    .s-build .od-w.lz{opacity:.22}
    .s-build .od .nn{position:absolute;left:0;top:0;opacity:0;pointer-events:none;font:900 16px/1 var(--font)}
    .s-build .bd-lab{max-width:168px;font:800 26px/1.14 var(--font);color:#fff;letter-spacing:-.005em}
    .s-build .bd-tally{position:absolute;left:24px;right:24px;top:150px;height:12px;display:flex;gap:2px}
    .s-build .bd-tally i{flex:1;display:block;border-radius:2px;background:rgba(255,255,255,.12);transition:background .25s,box-shadow .25s}
    .s-build .bd-tally i.lit{background:linear-gradient(180deg,#FFB366,#FF8300);box-shadow:0 0 8px rgba(255,131,0,.7)}
    .s-build .bd-cmd{position:absolute;left:24px;right:12px;top:170px;height:46px;font:500 17px/22px var(--mono);color:#C9C9C4;white-space:pre;overflow:hidden;transition:opacity .4s}
    .s-build .bd-cmd.w{top:auto;bottom:16px;height:26px;font-size:20px;line-height:26px}
    .s-build .bd-cmd.empty{opacity:0}
    .s-build .bd-cmd .pr{color:var(--wc-orange)}
    .s-build .bd-right{position:absolute;right:24px;top:20px;width:336px;height:136px}
    .s-build .pt{position:absolute;top:0;width:104px;text-align:center;opacity:.3;transform:scale(.88);transition:opacity .5s var(--ease),transform .6s var(--ease)}
    .s-build .pt.lit{opacity:1;transform:none}
    .s-build .pt svg{display:block;margin:0 auto;width:74px;height:74px;overflow:visible}
    .s-build .pt b{display:block;margin-top:6px;font:700 22px/1 var(--font);color:#fff}
    .s-build .fo{position:absolute;width:104px;height:56px;display:grid;place-items:center;opacity:.3;transform:scale(.86);transition:opacity .5s var(--ease),transform .6s var(--ease)}
    .s-build .fo.lit{opacity:1;transform:none}
    .s-build .fo svg{width:62px;height:48px;overflow:visible}
    .s-build .fo path{fill:rgba(255,255,255,.06);stroke:rgba(255,255,255,.4);stroke-width:2.4;transition:fill .5s,stroke .5s,filter .5s}
    .s-build .fo.lit path{fill:rgba(255,131,0,.22);stroke:#FF8300;filter:drop-shadow(0 0 7px rgba(255,131,0,.7))}
    .s-build .cell{position:absolute;border-radius:4px;background:rgba(255,255,255,.1);transition:background .25s,box-shadow .25s}
    .s-build .cell.lit{background:linear-gradient(135deg,#FFB366,#FF8300);box-shadow:0 0 9px rgba(255,131,0,.7)}
    .s-build.no-trans *{transition:none!important}
    body.calm .s-build *{animation:none!important;transition-duration:.01s!important}`,
  init(ctx) {
    const mk = Fx.el, H = 124, W = 70;
    const ICONS = {
      sun: `<svg viewBox="-50 -50 100 100" fill="none" stroke="#FF8300" stroke-width="4" stroke-linecap="round"><circle r="16" fill="#FF8300" fill-opacity=".25"/>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<line x1="${(Math.cos(a) * 27).toFixed(1)}" y1="${(Math.sin(a) * 27).toFixed(1)}" x2="${(Math.cos(a) * 41).toFixed(1)}" y2="${(Math.sin(a) * 41).toFixed(1)}"/>`; }).join('')}</svg>`,
      bolt: `<svg viewBox="-50 -50 100 100" fill="none" stroke="#4FB3FF" stroke-width="4" stroke-linejoin="round"><polygon points="5,-42 -24,6 -3,6 -10,42 24,-12 3,-12 12,-42" fill="#4FB3FF" fill-opacity=".28"/></svg>`,
      gas: `<svg viewBox="-50 -50 100 100" fill="none" stroke="#2BD576" stroke-width="4"><circle cx="-20" cy="14" r="18" fill="#2BD576" fill-opacity=".2"/><circle cx="0" cy="-12" r="24" fill="#2BD576" fill-opacity=".2"/><circle cx="22" cy="16" r="15" fill="#2BD576" fill-opacity=".2"/></svg>`,
    };
    const FOLDER = `<svg viewBox="0 0 44 34"><path d="M3 7a4 4 0 0 1 4-4h9l5 5h16a4 4 0 0 1 4 4v15a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/></svg>`;
    /* what the slide counts. cmd = short form of the command in the research sheet (checked on master: same count) */
    const LAYERS = [
      { name: 'Screens', cards: [
        { n: 3, label: 'Products', c1: 'ls features | grep -cE "Wea|Lig|Gas"', wide: 1, art: 'products' },
        { n: 6, label: 'Feature folders', c1: 'ls features | wc -l', wide: 1, art: 'folders' } ] },
      { name: 'Server', cards: [
        { n: 28, label: 'Request groups', c1: 'grep -rl "^ *\\[Http" . |', c2: 'wc -l' },
        { n: 67, label: 'Requests it answers', c1: 'grep -rh "^ *\\[Http" . |', c2: 'wc -l' },
        { n: 7, label: 'Background services', c1: 'grep -c Hosted *Registry.cs' },
        { n: 33, label: 'Tools for AI', c1: 'grep -h "ServerTool(" *.cs |', c2: 'wc -l' } ] },
      { name: 'Data', cards: [
        { n: 43, label: 'Database changes', c1: 'ls | grep -vc -e Designer -e Snapshot', wide: 1, art: 'cells43' },
        { n: 31, label: 'Data tables', c1: 'grep -c "b.ToTable(" *Snapshot.cs', wide: 1, art: 'cells31' } ] },
    ];
    const Y0 = 262, CH = 228, GAP = 14, X0 = 270, NW = 375, XG = 18;
    const wall = ctx.q('.bd-wall'), svg = ctx.q('.bd-svg');
    const rowY = (k) => Y0 + k * (CH + GAP), rowC = (k) => rowY(k) + CH / 2;
    /* ---- the spine: three nodes and two roads for the packets */
    const sp = mk('g', { 'data-step': 0 }, svg);
    ctx.fl = [];
    LAYERS.forEach((L, k) => {
      const y = rowC(k);
      L.node = mk('g', { class: 'nd' }, sp);
      mk('circle', { class: 'ring', cx: 114, cy: y, r: 15 }, L.node); mk('circle', { class: 'core', cx: 114, cy: y, r: 6 }, L.node);
      L.label = mk('div', { class: 'bd-lay', text: L.name }, wall); L.label.style.top = (y - 16) + 'px';
      if (k < 2) {
        const d = `M114 ${y + 20} V ${rowC(k + 1) - 20}`;
        mk('path', { d, stroke: 'rgba(255,131,0,.45)', 'stroke-width': 2.4, fill: 'none', filter: 'url(#fx-glow-u)' }, sp);
        const p = mk('path', { d, stroke: 'none', fill: 'none' }, sp);
        const f = ctx.flow(p, { color: '#FFB366', count: 2, speed: 90, r: 5, tail: 6, tailGap: 11 }); f.stop().show(false); ctx.fl.push(f);
      }
    });
    /* ---- odometer ---- */
    const mkOdo = (host, n) => {
      const nd = String(n).length, reels = [];
      for (let p = nd - 1; p >= 0; p--) {
        const win = mk('span', { class: 'od-w', 'aria-hidden': 'true' }, host), a = mk('span', { 'data-d': '0' }, win), b = mk('span', { 'data-d': '0' }, win);
        reels.push({ p, win, a, b, da: -1, db: -1 });
      }
      return reels;
    };
    const place = (c, v) => {
      c.v = v;
      c.reels.forEach((r) => {
        const q = Math.pow(10, r.p), base = Math.floor(v / q + 1e-9), rem = v - base * q;
        const f = r.p === 0 ? v - Math.floor(v) : Math.max(0, rem - (q - 1));
        const d0 = base % 10, d1 = (d0 + 1) % 10;
        if (r.da !== d0) { r.a.dataset.d = d0; r.da = d0; } if (r.db !== d1) { r.b.dataset.d = d1; r.db = d1; }
        r.a.style.transform = `translateY(${(-f * H).toFixed(1)}px)`; r.b.style.transform = `translateY(${((1 - f) * H).toFixed(1)}px)`;
        r.win.classList.toggle('lz', r.p > 0 && v < q);
      });
    };
    /* ---- one card per number ---- */
    ctx.cards = []; ctx.layers = LAYERS;
    LAYERS.forEach((L, k) => {
      let x = X0; L.cardEls = [];
      L.cards.forEach((d) => {
        const w = d.wide ? 2 * NW + XG : NW;
        const el = mk('div', { class: 'bd-card sweepable' }, wall); el.style.left = x + 'px'; el.style.top = rowY(k) + 'px'; el.style.width = w + 'px'; x += w + XG;
        const top = mk('div', { class: 'bd-top' }, el), od = mk('div', { class: 'od' }, top); mk('div', { class: 'bd-lab', text: d.label }, top);
        const c = { d, n: d.n, el, od, reels: mkOdo(od, d.n), v: 0, lit: 0, on: false, items: [], t0: 0, dur: 1300, last: 0 };
        mk('span', { class: 'nn', text: String(d.n) }, od);
        /* the small picture that fills up as the number rolls */
        if (!d.art) {
          const tl = mk('div', { class: 'bd-tally' }, el);
          for (let i = 0; i < d.n; i++) c.items.push(mk('i', {}, tl));
        } else {
          const rg = mk('div', { class: 'bd-right' }, el);
          if (d.art === 'products') {
            [['sun', 'Weather'], ['bolt', 'Lightning'], ['gas', 'Gas']].forEach(([ic, nm], i) => { const t = mk('div', { class: 'pt', html: ICONS[ic] + '<b>' + nm + '</b>' }, rg); t.style.left = (i * 116) + 'px'; t.style.top = '10px'; c.items.push(t); });
          } else if (d.art === 'folders') {
            for (let i = 0; i < 6; i++) { const f = mk('div', { class: 'fo', html: FOLDER }, rg); f.style.left = ((i % 3) * 116) + 'px'; f.style.top = (Math.floor(i / 3) * 66 + 4) + 'px'; c.items.push(f); }
          } else {
            const cols = d.n > 31 ? 15 : 16, cs = d.n > 31 ? 15 : 14, gp = d.n > 31 ? 6 : 5, rows = Math.ceil(d.n / cols), off = Math.round((136 - (rows * cs + (rows - 1) * gp)) / 2);
            for (let i = 0; i < d.n; i++) { const e = mk('i', { class: 'cell' }, rg); e.style.width = e.style.height = cs + 'px'; e.style.left = ((i % cols) * (cs + gp)) + 'px'; e.style.top = (Math.floor(i / cols) * (cs + gp) + off) + 'px'; c.items.push(e); }
          }
        }
        const cm = mk('div', { class: 'bd-cmd empty' + (d.wide ? ' w' : '') }, el); mk('span', { class: 'pr', text: '$ ' }, cm); c.tx = mk('span', { class: 'tx' }, cm); c.cm = cm;
        c.cmdText = d.c1 + (d.c2 ? (d.wide ? ' ' : '\n  ') + d.c2 : '');
        place(c, 0); ctx.cards.push(c); L.cardEls.push(c);
      });
    });
    /* ---- motion helpers ---- */
    ctx.rolls = [];
    const light = (c, k) => {
      if (k === c.lit) return;
      const a = Math.min(k, c.lit), b = Math.max(k, c.lit);
      for (let i = a; i < b; i++) c.items[i].classList.toggle('lit', k > c.lit);
      c.lit = k;
    };
    const finish = (c, fx) => {
      ctx.rolls = ctx.rolls.filter((r) => r !== c); place(c, c.n); light(c, c.n); c.reels.forEach((r) => r.win.style.setProperty('--bl', '0px'));
      if (fx) { c.el.classList.remove('done'); void c.el.offsetWidth; c.el.classList.add('done'); c.od.classList.remove('pop'); void c.od.offsetWidth; c.od.classList.add('pop'); Fx.burstEl(c.od, { n: 16, color: '#FF8300', speed: 280 }); }
    };
    ctx.setFinal = (c) => { c.on = true; c.el.classList.add('on'); finish(c, false); };
    ctx.setZero = (c) => { clearTimeout(c.sw); c.on = false; c.el.classList.remove('on', 'done'); ctx.rolls = ctx.rolls.filter((r) => r !== c); place(c, 0); light(c, 0); c.reels.forEach((r) => r.win.style.removeProperty('--bl')); };
    ctx.startRoll = (c, delay) => {
      c.on = true; c.el.classList.add('on'); c.t0 = performance.now() + delay; c.dur = c.n > 30 ? 1500 : 1250; c.last = 0; c.fin = false;
      if (ctx.rolls.indexOf(c) < 0) ctx.rolls.push(c);
      clearTimeout(c.sw); c.sw = ctx.after(delay, () => Fx.sweep(c.el));
    };
    ctx.tick = (dt) => {
      const now = performance.now();
      ctx.rolls.slice().forEach((c) => {
        const p = Fx.clamp((now - c.t0) / c.dur, 0, 1); if (now < c.t0) return;
        const v = c.n * Fx.ease.outQuart(p); place(c, v); light(c, Math.floor(v + 1e-6));
        const sp = Math.abs(v - c.last) / Math.max(dt, .001); c.last = v;
        c.reels.forEach((r) => { r.win.style.setProperty('--bl', Math.min(2.6, sp / 60).toFixed(2) + 'px'); });
        if (p >= 1) finish(c, true);
      });
    };
    ctx.tt = [];
    ctx.typeAll = (on, fast) => {
      ctx.tt.forEach(clearTimeout); ctx.tt.length = 0;
      ctx.cards.forEach((c, j) => {
        if (c.tx._typ) c.tx._typ.stop = true;
        if (!on) { c.tx.textContent = ''; c.cm.classList.add('empty'); return; }
        if (fast) { c.tx.textContent = c.cmdText; c.cm.classList.remove('empty'); return; }
        c.tx.textContent = '';
        ctx.tt.push(ctx.after(120 + j * 300, () => { c.cm.classList.remove('empty'); Fx.type(c.tx, c.cmdText, 62); }));
      });
    };
    ctx.apply = (i, instant) => {
      const fast = !!instant || ctx.calm;
      if (fast) ctx.root.classList.add('no-trans');
      LAYERS.forEach((L, k) => {
        const on = i >= k + 1;
        L.label.classList.toggle('on', on); L.node.classList.toggle('on', on);
        L.cardEls.forEach((c, j) => {
          if (on && !c.on) { if (fast) ctx.setFinal(c); else ctx.startRoll(c, 150 + j * 150); }
          else if (!on && c.on) ctx.setZero(c);
          else if (on && fast) ctx.setFinal(c);
        });
      });
      ctx.fl.forEach((f, k) => { const on = i >= k + 2; f.show(on); if (on) f.start(); else f.stop(); });
      const cmdOn = i >= 4;
      if (cmdOn !== ctx.cmdOn || fast) { ctx.typeAll(cmdOn, fast); }
      if (cmdOn && !ctx.cmdOn && !fast) ctx.cards.forEach((c, j) => ctx.tt.push(ctx.after(j * 120, () => Fx.sweep(c.el))));
      ctx.cmdOn = cmdOn;
      ctx.q('.bd-lead').classList.toggle('b', cmdOn);
      if (fast) { void ctx.root.offsetWidth; requestAnimationFrame(() => requestAnimationFrame(() => ctx.root.classList.remove('no-trans'))); }
    };
    ctx.cmdOn = false;
  },
  enter(ctx) {
    ctx.root.classList.add('no-trans');
    ctx.tt.forEach(clearTimeout); ctx.tt.length = 0;
    ctx.cards.forEach((c) => { c.tx.textContent = ''; c.cm.classList.add('empty'); ctx.setZero(c); });
    ctx.cmdOn = false; ctx.layers.forEach((L) => { L.label.classList.remove('on'); L.node.classList.remove('on'); });
    ctx.q('.bd-lead').classList.remove('b');
    void ctx.root.offsetWidth; requestAnimationFrame(() => ctx.root.classList.remove('no-trans'));
    ctx.raf(ctx.tick);
  },
  step(ctx, i, dir, instant) { ctx.apply(i, instant); },
  static(ctx) { ctx.apply(4, true); ctx.fl.forEach((f) => f.show(true).freeze()); },
});
