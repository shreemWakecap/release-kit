#!/usr/bin/env node
// render_onepager.js: onepager.html -> one-pager.pdf (A4 px size) + qa/onepager.png
const { chromium } = require('/Users/admin/wstack/node_modules/playwright-core');
const path = require('path');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: EXE });
  const ctx = await browser.newContext({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(__dirname, 'onepager.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
  await page.screenshot({ path: path.join(__dirname, 'qa', 'onepager.png') });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: path.join(__dirname, 'one-pager.pdf'), width: '794px', height: '1123px', printBackground: true, preferCSSPageSize: true });
  console.log('one-pager.pdf + qa/onepager.png written');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
