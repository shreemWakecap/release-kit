#!/usr/bin/env node
// qa_controls.js: exercises the presentation controls on a built deck and reports pass/fail.
// Usage: node qa_controls.js <built.html>
const { chromium } = require('/Users/admin/wstack/node_modules/playwright-core');
const path = require('path');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
(async () => {
  const html = path.resolve(process.argv[2]);
  const browser = await chromium.launch({ headless: true, executablePath: EXE });
  const page = await (await browser.newContext({ viewport: { width: 1600, height: 900 } })).newPage();
  const errs = []; page.on('pageerror', (e) => errs.push(e.message)); page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await page.goto('file://' + html); await page.waitForFunction(() => window.Deck && Deck.ready);
  const st = () => page.evaluate(() => Deck.state());
  const res = []; const ok = (name, cond, extra) => res.push((cond ? 'PASS ' : 'FAIL ') + name + (extra ? ' ' + extra : ''));
  const key = async (k) => { await page.keyboard.press(k); await page.waitForTimeout(250); };
  let s = await st(); ok('starts on slide 0 step 0', s.i === 0 && s.step === 0);
  const n = s.count;
  await key('ArrowRight'); s = await st(); ok('right arrow advances a step or slide', s.i > 0 || s.step > 0, JSON.stringify(s));
  await key('ArrowLeft'); s = await st(); ok('left arrow goes back', s.i === 0 && s.step === 0, JSON.stringify(s));
  await key('End'); s = await st(); ok('End goes to last slide', s.i === n - 1);
  await key('Home'); s = await st(); ok('Home goes to first slide', s.i === 0);
  await key(']'); s = await st(); ok('] next slide', s.i === Math.min(1, n - 1));
  await key('['); s = await st(); ok('[ previous slide', s.i === 0);
  await key('Space'); s = await st(); ok('space advances', s.i > 0 || s.step > 0);
  if (n >= 2) { await page.keyboard.press('2'); await page.keyboard.press('Enter'); await page.waitForTimeout(300); s = await st(); ok('digit jump 2 + Enter', s.i === 1, JSON.stringify(s)); }
  await key('o'); ok('overview opens', await page.evaluate(() => document.getElementById('overview').classList.contains('show')));
  ok('overview lists all slides', (await page.evaluate(() => document.querySelectorAll('.ovcard').length)) === n);
  await key('Escape'); ok('Esc closes overview', !(await page.evaluate(() => document.getElementById('overview').classList.contains('show'))));
  await key('n'); ok('notes open with text', (await page.evaluate(() => document.getElementById('notes').classList.contains('show') && document.getElementById('notes').textContent.length > 20)));
  await key('n'); await key('?'); ok('help opens', await page.evaluate(() => document.getElementById('help').classList.contains('show'))); await key('Escape');
  await key('b'); ok('black screen on', await page.evaluate(() => document.getElementById('black').classList.contains('show'))); await key('b');
  await key('l'); ok('laser on', await page.evaluate(() => getComputedStyle(document.getElementById('laser')).display !== 'none')); await key('l');
  await key('t'); ok('timer shows', await page.evaluate(() => getComputedStyle(document.getElementById('timer')).display !== 'none')); await key('t');
  await key('m'); ok('calm mode toggles', await page.evaluate(() => document.body.classList.contains('calm'))); await key('m');
  await page.evaluate(() => Deck.go(0, 0)); await page.waitForTimeout(300);
  await page.mouse.click(1300, 450); await page.waitForTimeout(300); s = await st(); ok('click right advances', s.i > 0 || s.step > 0, JSON.stringify(s));
  await page.mouse.click(60, 450); await page.waitForTimeout(300); s = await st(); ok('click left edge goes back', s.i === 0 && s.step === 0, JSON.stringify(s));
  await page.evaluate(() => { location.hash = '#/' + Math.min(2, Deck.state().count); }); await page.waitForTimeout(400); s = await st(); ok('hash navigation', s.i === Math.min(1, n - 1), JSON.stringify(s));
  await key('a'); await page.waitForTimeout(5200); const a = await st(); ok('autoplay advances by itself', a.i !== s.i || a.step !== s.step, JSON.stringify(a)); await key('a');
  /* fps on the busiest state */
  await page.evaluate(() => Deck.go(0, 0)); await page.waitForTimeout(2500);
  const fps = await page.evaluate(() => new Promise((r) => { let c = 0; const t0 = performance.now(); (function f() { c++; if (performance.now() - t0 < 2000) requestAnimationFrame(f); else r(c / 2); })(); }));
  ok('frame rate on slide 1 (software rendering)', fps > 12, fps.toFixed(1) + ' fps');
  ok('no deck errors', (await page.evaluate(() => Deck.errors.concat(window.__modErr || []))).length === 0, JSON.stringify(await page.evaluate(() => Deck.errors)));
  ok('no page errors', errs.length === 0, errs.join(' | ').slice(0, 300));
  /* print mode */
  const p2 = await (await browser.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  await p2.goto('file://' + html + '?print'); await p2.waitForFunction(() => window.Deck && Deck.ready); await p2.waitForTimeout(800);
  const pages = await p2.evaluate(() => document.querySelectorAll('.slide').length);
  await p2.pdf({ path: path.join(__dirname, 'qa', 'print-test.pdf'), width: '1920px', height: '1080px', printBackground: true });
  ok('print mode renders all slides', pages === n, pages + ' slides');
  console.log(res.join('\n')); await browser.close();
  process.exit(res.some((r) => r.startsWith('FAIL')) ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
