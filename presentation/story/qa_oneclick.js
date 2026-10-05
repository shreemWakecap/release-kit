#!/usr/bin/env node
// qa_oneclick.js <built.html>: one press per slide. For each slide: press Next once, time how long until every step has played,
// then check the skip (Next during the run), Next to the following slide, and Back behaviour.
const { chromium } = require('/Users/admin/wstack/node_modules/playwright-core');
const path = require('path');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
(async () => {
  const b = await chromium.launch({ headless: true, executablePath: EXE });
  const p = await (await b.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  await p.goto('file://' + path.resolve(process.argv[2])); await p.waitForFunction(() => window.Deck && Deck.ready); await p.waitForTimeout(800);
  const st = () => p.evaluate(() => Deck.state());
  const n = (await st()).count; let bad = 0;
  console.log('slide        steps  playTime(s)  result');
  for (let i = 0; i < n; i++) {
    await p.evaluate((k) => Deck.go(k, 0), i); await p.waitForTimeout(1200);
    const s0 = await st(); const steps = await p.evaluate((k) => Deck.defs[k].steps, i);
    const t0 = Date.now(); await p.keyboard.press('ArrowRight');
    let last = -1, tFinal = null;
    for (let t = 0; t < 40000; t += 200) { await p.waitForTimeout(200); const s = await st(); if (s.step !== last) { last = s.step; if (s.step === steps && tFinal == null) tFinal = Date.now() - t0; } if (s.step === steps) break; }
    const ok = last === steps; if (!ok) bad++;
    console.log(`${String(i + 1).padStart(2)} ${s0.id.padEnd(12)} ${String(steps).padStart(3)}   ${tFinal == null ? ' n/a' : (tFinal / 1000).toFixed(1).padStart(5)}      ${ok ? 'ok' : 'DID NOT REACH FINAL STEP'}`);
  }
  // skip, next slide, back
  await p.evaluate(() => Deck.go(2, 0)); await p.waitForTimeout(1000);
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(700); const mid = await st();
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300); const skipped = await st();
  const steps2 = await p.evaluate(() => Deck.defs[2].steps);
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(600); const nextSlide = await st();
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(500); const back1 = await st();
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(500); const back2 = await st();
  const chk = (name, cond, v) => { if (!cond) bad++; console.log((cond ? 'PASS ' : 'FAIL ') + name + ' ' + JSON.stringify(v)); };
  chk('first press starts the run', mid.i === 2 && mid.step >= 1, mid);
  chk('second press during the run skips to the final step', skipped.i === 2 && skipped.step === steps2, skipped);
  chk('third press moves to the next slide', nextSlide.i === 3 && nextSlide.step === 0, nextSlide);
  chk('Back from step 0 goes to the previous slide (final step)', back1.i === 2 && back1.step === steps2, back1);
  chk('Back from the final step returns to step 0', back2.i === 2 && back2.step === 0, back2);
  // J toggles step by step
  await p.keyboard.press('j'); await p.waitForTimeout(300); const sb = await p.evaluate(() => Deck.isOneClick());
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(500); const one = await st();
  chk('J switches to step by step (one step per press)', sb === false && one.step === 1, { oneClick: sb, state: one });
  console.log(errs.length ? 'PAGE ERRORS ' + JSON.stringify(errs) : 'no page errors'); if (errs.length) bad++;
  await b.close(); process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
