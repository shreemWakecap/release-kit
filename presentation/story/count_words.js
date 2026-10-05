#!/usr/bin/env node
// count_words.js: words visible on each slide in its final step (kicker and badges excluded). Usage: node count_words.js <built.html>
const { chromium } = require('/Users/admin/wstack/node_modules/playwright-core');
const path = require('path');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
(async () => {
  const b = await chromium.launch({ headless: true, executablePath: EXE });
  const p = await (await b.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  await p.goto('file://' + path.resolve(process.argv[2] || '../connected-environment-story.html') + '?print'); await p.waitForFunction(() => window.Deck && Deck.ready); await p.waitForTimeout(1200);
  const rows = await p.evaluate(() => Deck.defs.map((d, i) => {
    const root = d.el; let words = 0; const seen = new Set();
    const walk = (el) => {
      if (el.matches && el.matches('.slide-kicker,.slide-rb,.slide-new,script,style,.ph-foot,.ph-bar,.ph-num')) return;
      const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') return;
      el.childNodes.forEach((n) => { if (n.nodeType === 3) { const t = n.textContent.trim(); if (t) words += t.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length; } else if (n.nodeType === 1) walk(n); });
    };
    walk(root); return { n: i + 1, id: d.id, words, placeholder: !!d.placeholder };
  }));
  console.log(rows.map((r) => `${String(r.n).padStart(2)} ${r.id.padEnd(12)} ${String(r.words).padStart(4)} words ${r.placeholder ? '(placeholder)' : ''}`).join('\n'));
  await b.close();
})();
