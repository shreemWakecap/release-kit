/* Board 4: colour, type and the mark. Tokens read from the product code (research C7). */
Deck.add({
  id: 'color', section: 'design', title: 'Colour, type and the mark', kicker: 'Board 4 · Design kit', reality: ['code'],
  steps: 4, ambient: { orb: 1.1, beam: .8, dust: 1 }, dur: [4000, 5000, 5000, 5000, 6000],
  notes: 'Colours come from the product code, not from taste. Three oranges live in WakeCap material: the portal, mobile app and e-mails use D46514; the Connected Environment app uses E9590C; the release kit uses FF8300, which is in no product repo.\nProposal: E9590C as the base, FF8300 only as the glow, so the deck feels like the product at night.\nStatus colours are the product trio: green safe, amber check, red danger. Red moves only for Danger, which is the product own rule: a 1.4 second red flash.\nFont is Inter, the portal font. The mark is the real WakeCap mark.',
  html: `
    <h2 class="h2 co-h" data-step="0">Colour, type and <span class="o glow-text">the mark.</span></h2>
    <p class="lead co-lead" data-step="0" data-delay="200">Read from the product code, not guessed. One light source: orange.</p>
    <div class="co-or">
      <div class="co-disc" data-step="1" data-delay="0"><i style="background:#D46514;box-shadow:0 0 60px #D4651466"></i><b>#D46514</b><span>Portal, mobile app, e-mails</span></div>
      <div class="co-disc base" data-step="1" data-delay="250"><i style="background:#E9590C;box-shadow:0 0 70px #E9590C99"></i><b>#E9590C</b><span>Connected Environment app</span><em>Proposed base</em></div>
      <div class="co-disc" data-step="1" data-delay="500"><i style="background:#FF8300;box-shadow:0 0 70px #FF8300aa"></i><b>#FF8300</b><span>Release kit and videos</span><em>Glow only</em></div>
    </div>
    <div class="co-row" data-step="2">
      <div class="co-grp"><div class="label">Night</div><div class="co-sw"><i style="background:#0B0B0C"></i><i style="background:#121214"></i><i style="background:#1A1A1D"></i><i style="background:#141210"></i></div><div class="src">#0B0B0C #121214 #1A1A1D · warm option #141210</div></div>
      <div class="co-grp"><div class="label">Status, as in the product</div><div class="co-sw"><i style="background:#22C55E"></i><i style="background:#F5A524"></i><i style="background:#FF4D4D"></i></div><div class="src">safe · check · danger. Red moves only for Danger.</div></div>
      <div class="co-grp"><div class="label">How real</div><div class="co-sw"><i style="background:#2BD576"></i><i style="background:#4FB3FF"></i><i style="background:#FFC24B"></i><i style="background:#B9B9B4"></i><i style="background:#C58BFF"></i><i style="background:#fff"></i></div><div class="src">live · code · test · plan · vision · number</div></div>
    </div>
    <div class="co-type glass" data-step="3" data-fx="left">
      <div class="label">Type · Inter, the portal font</div>
      <div class="co-t1">Is it safe?</div>
      <div class="co-t2">The answer first, then the data behind it.</div>
      <div class="co-t3 mono">1,496,265 <span>readings, sensors DB, 10 Aug 2026 (internal cost doc)</span></div>
      <div class="src">800 headline · 400 lead · tracked caps for labels · mono for numbers</div>
    </div>
    <div class="co-mark" data-step="4" data-fx="pop"><svg viewBox="0 0 278.78 176.15"><path fill="#FF8300" d="M65.58,4.66l21.91,30.92,20.8-31.16,62.09-.03,21.5,31.2s21.05-31.2,21.21-31.2h62.08v62.09s-52.28,105.07-52.28,105.07l-62.09-.05-21.48-30.97-21.05,31.02h-62.09S3.49,66.77,3.49,66.77V4.67h62.09Z"/></svg><span class="src">The WakeCap mark</span></div>`,
  css: `
    .s-color .co-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-color .co-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-color .co-or{position:absolute;left:96px;top:290px;width:960px;display:flex;gap:44px}
    .s-color .co-disc{width:280px;text-align:center}
    .s-color .co-disc i{display:block;width:170px;height:170px;border-radius:50%;margin:0 auto}
    .s-color .co-disc b{display:block;margin-top:22px;font:800 30px/1 var(--mono);color:#fff}
    .s-color .co-disc span{display:block;margin-top:10px;font:500 21px/1.25 var(--font);color:var(--mut)}
    .s-color .co-disc em{display:inline-block;margin-top:12px;font:800 15px/1 var(--font);font-style:normal;letter-spacing:.16em;text-transform:uppercase;color:#0B0B0C;background:var(--wc-orange);padding:7px 12px;border-radius:999px}
    .s-color .co-row{position:absolute;left:96px;top:640px;width:960px;display:flex;flex-direction:column;gap:22px}
    .s-color .co-grp{display:flex;align-items:center;gap:26px}
    .s-color .co-grp .label{width:270px}
    .s-color .co-sw{display:flex;gap:10px}
    .s-color .co-sw i{display:block;width:54px;height:54px;border-radius:14px;border:1px solid rgba(255,255,255,.18)}
    .s-color .co-grp .src{flex:1;font-size:18px}
    .s-color .co-type{position:absolute;left:1120px;top:290px;width:704px;padding:34px 40px}
    .s-color .co-t1{margin-top:20px;font:800 92px/1 var(--font);letter-spacing:-.035em}
    .s-color .co-t2{margin-top:18px;font:400 32px/1.3 var(--font);color:var(--mut)}
    .s-color .co-t3{margin-top:22px;font-size:58px;font-weight:700;color:var(--wc-orange)}
    .s-color .co-t3 span{font:600 19px var(--font);color:var(--mut);display:block;margin-top:6px}
    .s-color .co-type .src{margin-top:20px}
    .s-color .co-mark{position:absolute;left:1120px;top:760px;width:704px;display:flex;align-items:center;gap:30px}
    .s-color .co-mark svg{width:200px;height:auto;filter:drop-shadow(0 0 22px rgba(255,131,0,.75))}`,
});
