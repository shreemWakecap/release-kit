/* Board 6: presentation controls (all working in this very file). */
Deck.add({
  id: 'controls', section: 'controls', title: 'Presentation controls', kicker: 'Board 6 · Controls', reality: [],
  steps: 2, ambient: { orb: .9, beam: .4, dust: .9 }, dur: [4500, 5500, 6000],
  notes: 'Everything here works in this file. Right arrow or space steps the story. Shift and arrows jump whole slides. O opens the overview. N the notes. P opens a presenter window with notes, timer and next slide. F is fullscreen, L a laser pointer, A autoplay, B a black screen, M calm mode. Type a number and Enter to jump. S switches to the short path of 15 slides. Links like hash 12 slash 3 open a slide and step directly. Add question mark print to the address and the whole deck becomes a PDF.',
  html: `
    <h2 class="h2 ct-h" data-step="0">Presentation <span class="o glow-text">controls.</span></h2>
    <p class="lead ct-lead" data-step="0" data-delay="200">Everything here already works in this file. Press the keys.</p>
    <div class="ct-keys" data-step="0" data-delay="300">
      <div><kbd>→</kbd><kbd>Space</kbd><span>next step</span></div><div><kbd>←</kbd><span>back</span></div>
      <div><kbd>⇧</kbd>+<kbd>→</kbd><span>next slide</span></div><div><kbd>O</kbd><span>overview grid</span></div>
      <div><kbd>N</kbd><span>speaker notes</span></div><div><kbd>P</kbd><span>presenter window</span></div>
      <div><kbd>F</kbd><span>fullscreen</span></div><div><kbd>L</kbd><span>laser pointer</span></div>
      <div><kbd>A</kbd><span>autoplay</span></div><div><kbd>T</kbd><span>timer</span></div>
      <div><kbd>B</kbd><span>black screen</span></div><div><kbd>M</kbd><span>calm motion</span></div>
      <div class="hot"><kbd>S</kbd><span>short path, 15 slides</span></div><div><kbd>12</kbd><kbd>↵</kbd><span>jump to slide 12</span></div>
    </div>
    <div class="ct-more src" data-step="0" data-delay="450">Deep links like #/12/3 · print mode ?print makes the PDF · touch swipe · works offline from one file</div>
    <div class="ct-shot a" data-step="1" data-fx="right"><img src="assets/ctl-overview.jpg" alt="Overview grid"><span>Overview grid (O)</span></div>
    <div class="ct-shot b" data-step="2" data-fx="right"><img src="assets/ctl-notes.jpg" alt="Speaker notes"><span>Speaker notes (N)</span></div>`,
  css: `
    .s-controls .ct-h{position:absolute;left:96px;top:104px;width:1500px;font-size:62px}
    .s-controls .ct-lead{position:absolute;left:96px;top:196px;width:1500px;font-size:27px}
    .s-controls .ct-keys{position:absolute;left:96px;top:290px;width:760px;display:grid;grid-template-columns:1fr 1fr;gap:16px 26px}
    .s-controls .ct-keys>div{display:flex;align-items:center;gap:10px;font:500 24px/1.2 var(--font);color:#E6E6E2;padding:12px 16px;border-radius:16px;border:1px solid var(--line);background:rgba(255,255,255,.03)}
    .s-controls .ct-keys span{margin-left:6px}
    .s-controls .ct-keys .hot{border-color:var(--wc-orange);box-shadow:0 0 34px rgba(255,131,0,.3)}
    .s-controls kbd{font:800 20px/1 var(--mono);padding:8px 12px;border-radius:10px;background:#26262a;border:1px solid #3d3d44;color:#fff;box-shadow:0 3px 0 #111}
    .s-controls .ct-more{position:absolute;left:96px;top:892px;width:780px;font-size:20px}
    .s-controls .ct-shot{position:absolute;width:840px;border-radius:20px;overflow:hidden;border:2px solid rgba(255,131,0,.65);box-shadow:0 0 70px rgba(255,131,0,.3),0 40px 90px rgba(0,0,0,.6);background:#000}
    .s-controls .ct-shot img{display:block;width:100%;height:auto}
    .s-controls .ct-shot span{position:absolute;left:16px;top:14px;padding:8px 14px;border-radius:999px;background:var(--wc-orange);color:#0B0B0C;font:900 17px/1 var(--font);letter-spacing:.08em;text-transform:uppercase}
    .s-controls .ct-shot.a{left:984px;top:280px}
    .s-controls .ct-shot.b{left:1030px;top:500px}`,
});
