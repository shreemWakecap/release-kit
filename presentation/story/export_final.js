#!/usr/bin/env node
// export_final.js: from the built deck (file://) write deck-notes.json and a PDF (one page per slide, final state, print mode).
// Usage: node export_final.js [../connected-environment-story.html] [../connected-environment-story.pdf]
const { chromium } = require('/Users/admin/wstack/node_modules/playwright-core');
const path = require('path'); const fs = require('fs');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const html = path.resolve(process.argv[2] || path.join(__dirname, '..', 'connected-environment-story.html'));
const pdf = path.resolve(process.argv[3] || path.join(__dirname, '..', 'connected-environment-story.pdf'));
(async () => {
  const b = await chromium.launch({ headless: true, executablePath: EXE });
  const p = await (await b.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  await p.goto('file://' + html + '?print'); await p.waitForFunction(() => window.Deck && Deck.ready); await p.waitForTimeout(1500);
  const defs = await p.evaluate(() => Deck.defs.map((d, i) => ({ n: i + 1, id: d.id, title: d.title, section: d.section, steps: d.steps || 0, short: !!d.short, placeholder: !!d.placeholder, notes: d.notes || '', minutes: d.minutes || 0, reality: d.reality || [] })));
  fs.writeFileSync(path.join(__dirname, 'deck-notes.json'), JSON.stringify(defs, null, 1));
  await p.pdf({ path: pdf, width: '1920px', height: '1080px', printBackground: true });
  console.log('slides', defs.length, 'placeholders', defs.filter((d) => d.placeholder).length, '| pdf', pdf);
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
