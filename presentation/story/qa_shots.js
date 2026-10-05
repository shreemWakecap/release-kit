#!/usr/bin/env node
// qa_shots.js: screenshot every step of one slide (or the whole deck) and lint the layout.
// Usage: node qa_shots.js <built.html> <slideId|all> [outDir] [--wait=1500]
// Writes <outDir>/<id>-s<k>.png and prints a JSON report (console errors, layout findings).
const { chromium } = require('/Users/admin/wstack/node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const [html, which, outArg, ...rest] = process.argv.slice(2);
const wait = +((rest.find((a) => a.startsWith('--wait=')) || '--wait=1500').split('=')[1]);
const outDir = outArg && !outArg.startsWith('--') ? outArg : path.join(__dirname, 'qa');
fs.mkdirSync(outDir, { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: EXE, args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })).newPage();
  const logs = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(m.type() + ': ' + m.text()); });
  page.on('pageerror', (e) => logs.push('pageerror: ' + e.message));
  const url = 'file://' + path.resolve(html) + (which === 'all' ? '' : '?only=' + which);
  await page.goto(url);
  await page.waitForFunction(() => window.Deck && Deck.ready, null, { timeout: 15000 });
  const defs = await page.evaluate(() => Deck.defs.map((d) => ({ id: d.id, steps: d.steps || 0 })));
  const report = { url, slides: [], logs, deckErrors: [], files: [] };
  const lint = () => page.evaluate(() => {
    const out = []; const root = document.querySelector('.slide.active'); if (!root) return out;
    root.querySelectorAll('*').forEach((el) => {
      const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < .05) return;
      if (el.closest('[data-step]:not(.in)')) return; if (el.closest('svg') && el.tagName !== 'svg' && el.tagName !== 'text') return;
      const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return;
      const label = el.tagName.toLowerCase() + (el.className && el.className.baseVal === undefined ? '.' + String(el.className).split(' ')[0] : '') + ' "' + (el.textContent || '').trim().slice(0, 30) + '"';
      const stage = document.getElementById('stage').getBoundingClientRect(); const s = stage.width / 1920;
      const x0 = (r.left - stage.left) / s, x1 = (r.right - stage.left) / s, y0 = (r.top - stage.top) / s, y1 = (r.bottom - stage.top) / s;
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (hasText && (x1 > 1860 || x0 < 56 || y1 > 1015 || y0 < 0)) out.push('text outside safe area: ' + label + ` [${Math.round(x0)},${Math.round(y0)} to ${Math.round(x1)},${Math.round(y1)}]`);
      if (hasText && el.scrollWidth > el.clientWidth + 3 && cs.overflow !== 'visible') out.push('text clipped horizontally: ' + label);
      if (hasText && el.scrollHeight > el.clientHeight + 3 && cs.overflow !== 'visible') out.push('text clipped vertically: ' + label);
      if (hasText && parseFloat(cs.fontSize) < 15.5) out.push('font below 16px: ' + label);
    });
    return out;
  });
  const ids = which === 'all' ? defs.map((d) => d.id) : [which];
  for (const id of ids) {
    const d = defs.find((x) => x.id === id); if (!d) { report.logs.push('unknown slide ' + id); continue; }
    const idx = defs.findIndex((x) => x.id === id);
    await page.evaluate(([i]) => Deck.go(i, 0), [idx]);
    await page.waitForTimeout(wait + 600);
    const rec = { id, steps: d.steps, lint: {} };
    for (let s = 0; s <= d.steps; s++) {
      if (s > 0) { await page.evaluate(([i, st]) => Deck.go(i, st), [idx, s]); await page.waitForTimeout(wait); }
      const f = path.join(outDir, `${id}-s${s}.png`); await page.screenshot({ path: f }); report.files.push(f);
      rec.lint[s] = await lint();
    }
    report.slides.push(rec);
  }
  report.deckErrors = await page.evaluate(() => Deck.errors.concat(window.__modErr || []));
  console.log(JSON.stringify(report, null, 1));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
