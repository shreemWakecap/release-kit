/* Slide 03: how to read the story. The six reality badges and the evidence behind each. */
Deck.add({
  id: 'badges', section: 'why', title: 'Every claim wears a badge', kicker: 'How to read this story',
  steps: 3, ambient: { orb: .9, beam: .5, dust: 1 }, dur: [4000, 5000, 5000, 5000], minutes: .8,
  notes: 'Before the story, one rule. Every claim in this talk wears a badge that says how real it is.\nLive: we saw it working in production. Code: it is merged on master and we have not verified it is deployed. Test: it runs in the test environment only.\nPlanned: written down as intent. Vision: nobody has built it, . Published number: it comes from an outside source and carries publisher and year.\nWhen a slide mixes statuses, it shows several badges. Please hold us to this.',
  html: `
    <h2 class="h2 bd-h" data-step="0">Every claim wears <span class="o glow-text">a badge.</span></h2>
    <p class="lead bd-lead" data-step="0" data-delay="250">It tells you how real the claim is, and what evidence stands behind it.</p>
    <div class="bd-spine"><i class="bd-fill"></i></div>
    <div class="bd-rows">
      <div class="bd-row glass" data-step="1" data-fx="left" data-delay="0"><span class="rb rb-live">Live in production</span><div class="bd-t">We saw it working on the production portal.</div><div class="bd-e mono">evidence · dated screenshot</div></div>
      <div class="bd-row glass" data-step="1" data-fx="left" data-delay="260"><span class="rb rb-code">In the code</span><div class="bd-t">Merged on master. We have not verified it is deployed.</div><div class="bd-e mono">evidence · file and line</div></div>
      <div class="bd-row glass" data-step="1" data-fx="left" data-delay="520"><span class="rb rb-test">In test</span><div class="bd-t">Running in the test environment only.</div><div class="bd-e mono">evidence · test deploy</div></div>
      <div class="bd-row glass" data-step="2" data-fx="left" data-delay="0"><span class="rb rb-plan">Planned</span><div class="bd-t">Written down as intent. A plan, not a product.</div><div class="bd-e mono">evidence · a document</div></div>
      <div class="bd-row glass" data-step="2" data-fx="left" data-delay="260"><span class="rb rb-vision">Vision</span><div class="bd-t">Nobody has built it. A direction.</div><div class="bd-e mono">evidence · none yet</div></div>
      <div class="bd-row glass" data-step="2" data-fx="left" data-delay="520"><span class="rb rb-stat">Published number</span><div class="bd-t">From an outside source, with publisher and year.</div><div class="bd-e mono">evidence · link in sources</div></div>
    </div>
    <div class="bd-final" data-step="3"><span class="shine">Hold us to it.</span></div>`,
  css: `
    .s-badges .bd-h{position:absolute;left:96px;top:118px;width:1500px}
    .s-badges .bd-lead{position:absolute;left:96px;top:236px;width:1300px}
    .s-badges .bd-spine{position:absolute;left:150px;top:330px;width:4px;height:540px;border-radius:2px;background:rgba(255,255,255,.1)}
    .s-badges .bd-fill{display:block;width:100%;height:0;border-radius:2px;background:linear-gradient(180deg,var(--live),var(--code) 22%,var(--test) 44%,var(--plan) 62%,var(--vision) 82%,#fff);box-shadow:0 0 22px rgba(255,255,255,.4);transition:height 2.4s var(--ease)}
    .s-badges .bd-rows{position:absolute;left:210px;top:318px;width:1500px;display:flex;flex-direction:column;gap:12px}
    .s-badges .bd-row{display:grid;grid-template-columns:400px 1fr 330px;align-items:center;gap:22px;padding:0 34px;height:82px;border-radius:22px}
    .s-badges .bd-row .rb{font-size:23px;padding:12px 22px 12px 18px;justify-self:start}
    .s-badges .bd-t{font:500 28px/1.25 var(--font);color:#F0F0EC}
    .s-badges .bd-e{font-size:21px;color:var(--mut);justify-self:end}
    .s-badges .bd-final{position:absolute;left:0;top:890px;width:1920px;text-align:center;font:900 54px/1 var(--font);letter-spacing:-.02em}`,
  step(ctx, i) { ctx.q('.bd-fill').style.height = ([0, 38, 100, 100][i]) + '%'; if (i === 3 && !ctx.calm) Fx.burstEl(ctx.q('.bd-final'), { n: 24, speed: 360 }); },
  static(ctx) { ctx.q('.bd-fill').style.height = '100%'; },
});
/* live-test 1791198352 */
