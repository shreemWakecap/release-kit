/* Slide 11: where it stands. Five glowing columns, one card per row of the status board (research C1 section 6).
   Count-ups earn their number as the cards land. Last step: what the three products share and what they do not (C1 3.12). */
Deck.add({
  id: 'status', section: 'convert', title: 'Where it stands', kicker: 'The conversion · Honest status board',
  reality: ['live', 'code', 'test', 'plan', 'vision'],
  steps: 6, ambient: { orb: 1, beam: .5, dust: .9 }, dur: [4200, 5200, 5000, 5200, 5000, 5000, 8000], minutes: 1.6,
  notes: 'This is the honest board. Five states, from seen in production to nobody built it. Each card is one item we checked.\nLive: fourteen items seen on production. The rail, the header, Connected Products and all three products. Gas acknowledge and close is deployed too.\nIn code: eleven items in master where we did not verify the deploy. The agent dashboard, staged edits, the Lightning red banner, the observer control plane.\nIn test: almost empty. We only have two facts about the test environment and we did not query it. Nothing is shown as test only.\nPlanned: ten items with a document behind them. Gas analytics, gas alerts through notifications, Arabic screens, a stage environment, site sign-off.\nVision: six ideas nobody built. Memory, forecasting, per-worker suggestions, a WhatsApp bot, a running assistant. No dates.\nLast step. The three products share one shell, one menu and header, one backend, one view permission and per-project switches. They do not share one rule set or one audit trail. Say that plainly.',
  html: `
    <h2 class="h2 st-h" data-step="0">Where it <span class="o glow-text">stands.</span></h2>
    <p class="lead st-lead" data-step="0" data-delay="200">One card per checked item. Live means seen in production, not just merged.</p>
    <div class="st-board"></div>
    <div class="st-strip">
      <div class="st-pan st-yes glass sweepable" data-step="6" data-fx="left">
        <div class="st-pan-h"><b>Shared</b><span>one product area, three products</span></div>
        <ul>
          <li data-step="6" data-delay="450"><b>One shell</b><span>Header, rail and page area for every product.</span></li>
          <li data-step="6" data-delay="560"><b>One menu and header</b></li>
          <li data-step="6" data-delay="670"><b>One backend</b><span>Weather status still comes from sensors-service.</span></li>
          <li data-step="6" data-delay="780"><b>One view permission</b><span>Writes and Settings use other grants.</span></li>
          <li data-step="6" data-delay="890"><b>Per-project switches</b><span>Enforced in the front end, not in the backend routes.</span></li>
        </ul>
      </div>
      <div class="st-vs" data-step="6" data-fx="scale" data-delay="300">vs</div>
      <div class="st-pan st-no glass sweepable" data-step="6" data-fx="right" data-delay="150">
        <div class="st-pan-h"><b>Not shared</b><span>said plainly</span></div>
        <ul>
          <li data-step="6" data-delay="1000"><b>One rule set</b><span>Three rule implementations share one principle: unknown never reads as safe.</span></li>
          <li data-step="6" data-delay="1150"><b>One audit trail</b><span>Audit covers the weather policy only. Lightning settings and Gas zones have none.</span></li>
        </ul>
      </div>
    </div>`,
  css: `
    .s-status .st-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-status .st-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-status .st-board{position:absolute;left:96px;top:262px;width:1728px;display:grid;grid-template-columns:repeat(5,1fr);gap:20px;align-items:start}
    .s-status .st-col{position:relative;height:722px;padding:16px 14px 0;border-radius:22px;border:1px solid color-mix(in srgb,var(--c) 24%,rgba(255,255,255,.05));background:linear-gradient(180deg,color-mix(in srgb,var(--c) 11%,transparent),rgba(255,255,255,.015) 60%);transition:height .9s var(--ease),border-color .8s,box-shadow .8s}
    .s-status .st-col[data-k=vision]{border-style:dashed}
    .s-status .st-col.on{border-color:color-mix(in srgb,var(--c) 72%,transparent);box-shadow:0 0 56px color-mix(in srgb,var(--c) 22%,transparent),inset 0 1px 0 rgba(255,255,255,.12)}
    .s-status .st-edge{position:absolute;left:18px;right:18px;top:0;height:3px;border-radius:0 0 3px 3px;background:var(--c);opacity:.4;box-shadow:0 0 18px var(--c);transition:opacity .8s}
    .s-status .st-col.on .st-edge{opacity:1}
    .s-status .st-head{display:flex;align-items:center;gap:12px;height:76px}
    .s-status .st-n{flex:none;min-width:92px;font:900 74px/1 var(--font);letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:var(--c);opacity:.5;text-shadow:0 0 30px color-mix(in srgb,var(--c) 55%,transparent);transition:opacity .6s}
    .s-status .st-col.on .st-n{opacity:1}
    .s-status .st-lab{display:block;min-width:0}
    .s-status .st-lab em{display:block;font:800 22px/1.1 var(--font);font-style:normal;letter-spacing:.1em;text-transform:uppercase;color:#fff}
    .s-status .st-lab u{display:block;margin-top:5px;text-decoration:none;font:500 20px/1.15 var(--font);color:var(--mut)}
    .s-status .st-list{margin-top:16px}
    .s-status .st-card{height:38px;margin-bottom:5px;border-radius:10px;padding:0 10px 0 13px;display:flex;align-items:center;border:1px solid color-mix(in srgb,var(--c) 40%,transparent);border-left:4px solid var(--c);background:color-mix(in srgb,var(--c) 10%,rgba(255,255,255,.03));opacity:0;transform:translateY(-56px) scale(.96);filter:blur(5px);
      transition:transform .7s cubic-bezier(.2,1.4,.35,1),opacity .35s ease,filter .5s ease,height .8s var(--ease),margin .8s var(--ease)}
    .s-status .st-col[data-k=vision] .st-card{border-style:dashed;border-left-style:solid}
    .s-status .st-card span{display:block;min-width:0;font:600 20px/1 var(--font);color:#F0F0EC;white-space:nowrap;overflow:hidden;transition:opacity .45s}
    .s-status .st-card.in{opacity:1;transform:none;filter:none;transition-delay:var(--d),var(--d),var(--d),0s,0s;animation:stFlash 1s ease-out both;animation-delay:calc(var(--d) + .3s)}
    @keyframes stFlash{0%{box-shadow:0 0 30px var(--c),inset 0 0 14px color-mix(in srgb,var(--c) 45%,transparent)}100%{box-shadow:0 0 12px color-mix(in srgb,var(--c) 16%,transparent)}}
    .s-status.snap .st-card,.s-status.snap .st-note,.s-status.snap .st-col{transition:none!important;animation:none!important}
    .s-status .st-note{margin:12px 4px 0;font:500 20px/1.35 var(--font);color:var(--mut);opacity:0;transition:opacity .8s .9s}
    .s-status .st-note.in{opacity:1}
    .s-status.packed .st-col{height:280px}
    .s-status.packed .st-card{height:8px;margin-bottom:3px;border-radius:4px;transition-delay:0s!important;animation:none}
    .s-status.packed .st-card span{opacity:0}
    .s-status.packed .st-note{opacity:0;transition-delay:0s}
    .s-status .st-strip{position:absolute;left:96px;top:568px;width:1728px;height:420px}
    .s-status .st-pan{position:absolute;top:0;height:420px;padding:20px 30px}
    .s-status .st-yes{left:0;width:1000px;border-color:rgba(255,131,0,.6);box-shadow:0 0 0 1px rgba(255,131,0,.25),0 0 70px rgba(255,131,0,.2),0 30px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.2)}
    .s-status .st-no{left:1056px;width:672px;border:1.5px dashed rgba(185,185,180,.55);box-shadow:0 30px 80px rgba(0,0,0,.45)}
    .s-status .st-vs{position:absolute;left:1000px;top:182px;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;font:800 22px/1 var(--font);letter-spacing:.04em;color:#0B0B0C;background:linear-gradient(135deg,var(--wc-orange-soft),var(--wc-orange));box-shadow:0 0 34px rgba(255,131,0,.7);z-index:2}
    .s-status .st-pan-h{display:flex;align-items:baseline;gap:16px;margin-bottom:12px}
    .s-status .st-pan-h b{font:900 34px/1 var(--font);letter-spacing:.02em;text-transform:uppercase}
    .s-status .st-yes .st-pan-h b{color:var(--wc-orange);text-shadow:0 0 26px var(--wc-orange-glow)}
    .s-status .st-no .st-pan-h b{color:#D9D9D4}
    .s-status .st-pan-h span{font:500 22px/1 var(--font);color:var(--mut)}
    .s-status .st-pan ul{list-style:none;margin:0;padding:0}
    .s-status .st-pan li{position:relative;padding:5px 0 6px 34px}
    .s-status .st-pan li::before{content:"";position:absolute;left:4px;top:14px;width:13px;height:13px;border-radius:3px;transform:rotate(45deg)}
    .s-status .st-yes li::before{background:var(--wc-orange);box-shadow:0 0 14px var(--wc-orange)}
    .s-status .st-no li::before{border:2px dashed #B9B9B4}
    .s-status .st-pan li b{display:block;font:700 27px/1.15 var(--font);color:#fff}
    .s-status .st-pan li span{display:block;margin-top:2px;font:400 21px/1.25 var(--font);color:var(--mut)}`,
  init(ctx) {
    const COLS = [
      { k: 'live', name: 'Live', def: 'seen in production', c: '#2BD576', cards: ['Portal rail entry', 'Side rail, collapsible', 'Header with live clock', 'Connected Products', 'Weather verdict and steps', 'Maximum Values Report', 'Safety Policy, read only', 'Lightning, wallboard, phone', 'Gas: four screens', 'Gas acknowledge and close', 'MCP endpoint responds', 'Front end 1.0.7 served', 'Registry key, 3 Sep', 'Old route match, 14 Jul'] },
      { k: 'code', name: 'In code', def: 'deploy not verified', c: '#4FB3FF', cards: ['Agent-composed dashboard', 'Staged edit and publish', 'Lightning RED banner', 'Lightning observations', 'Backend product layout', 'MCP with 33 tools', 'Observer control plane', 'Seven background services', 'Trends row removed', 'Legacy URL redirect', 'Backend deploy of 4 Oct'] },
      { k: 'test', name: 'In test', def: 'test environment only', c: '#FFC24B', cards: ['v1.0.0 built in testing', 'Testing tags to v2.1.39'], note: 'Nothing is shown as test-only today. The test environment was not queried.' },
      { k: 'plan', name: 'Planned', def: 'documented intent', c: '#B9B9B4', cards: ['Rename backend solution', 'Gas safety analytics', 'Gas alerts, notifications', 'Gas acks back to vendor', 'Lightning staff notices', 'Arabic weather screens', 'Permissions via the shell', 'Stage environment, rollback', 'Old registry key clean-up', 'Site commissioning, sign-off'] },
      { k: 'vision', name: 'Vision', def: 'nobody built it', c: '#C58BFF', cards: ['Memory: same time last year', 'Forecasting', 'Per-worker suggestions', 'WhatsApp safety-group bot', 'A running AI assistant', 'New products join CE'] },
    ];
    const board = ctx.q('.st-board');
    ctx.cols = COLS.map((d) => {
      const el = Fx.el('div', { class: 'st-col sweepable', 'data-k': d.k }, board); el.style.setProperty('--c', d.c);
      el.innerHTML = `<i class="st-edge"></i><div class="st-head"><b class="st-n">0</b><span class="st-lab"><em>${d.name}</em><u>${d.def}</u></span></div><div class="st-list"></div>`;
      const list = el.querySelector('.st-list'), n = d.cards.length, stag = Math.round(Math.min(220, 900 / n));
      const cards = d.cards.map((t, i) => { const c = Fx.el('div', { class: 'st-card' }, list); c.style.setProperty('--d', (i * stag) + 'ms'); Fx.el('span', { text: t }, c); return c; });
      const note = d.note ? Fx.el('p', { class: 'st-note', text: d.note }, list) : null;
      return { d, el, num: el.querySelector('.st-n'), cards, note, n, stag, c: d.c, on: false };
    });
    ctx.yes = ctx.q('.st-yes'); ctx.no = ctx.q('.st-no');
    ctx.apply = (i, instant) => {
      const root = ctx.root;
      if (instant || ctx.calm) root.classList.add('snap');
      ctx.cols.forEach((col, k) => {
        const on = i >= k + 1, was = col.on; col.on = on;
        col.el.classList.toggle('on', on);
        col.cards.forEach((c) => c.classList.toggle('in', on));
        if (col.note) col.note.classList.toggle('in', on);
        if (on && !was) {
          if (instant || ctx.calm) Fx.counter(col.num, col.n, { dur: 0 });
          else {
            Fx.counter(col.num, col.n, { from: 0, dur: col.n * col.stag, delay: 380, ease: Fx.ease.linear });
            ctx.after(380 + col.n * col.stag, () => Fx.burstEl(col.num, { n: 18, color: col.c, speed: 300 }));
            Fx.sweep(col.el);
          }
        } else if (!on && was) Fx.counter(col.num, 0, { dur: 0 });
        else if (!on) Fx.counter(col.num, 0, { dur: 0 });
      });
      const packed = i >= 6; root.classList.toggle('packed', packed);
      if (packed && !ctx.packed && !instant && !ctx.calm) { ctx.after(900, () => { Fx.sweep(ctx.yes); Fx.burstEl(ctx.yes.querySelector('.st-pan-h b'), { n: 22, speed: 340 }); }); ctx.after(1500, () => Fx.sweep(ctx.no)); }
      ctx.packed = packed;
      if (instant || ctx.calm) { void root.offsetWidth; requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('snap'))); }
    };
  },
  step(ctx, i, dir, instant) { ctx.apply(i, instant); },
  static(ctx) { ctx.apply(6, true); },
});
