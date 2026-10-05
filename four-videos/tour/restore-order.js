// Puts the user's featured-card order back to what it was before the tour (read from initial-order.json). Only uses the Move up/down buttons.
const { chromium } = require('/Users/admin/wstack/node_modules/playwright-core');
const fs = require('fs');
const target = JSON.parse(fs.readFileSync(__dirname + '/out/timeline.json')).initialOrder;
(async () => {
  const exe = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
  const ctx = await chromium.launchPersistentContext(process.env.HOME + '/.wstack/chromium-profile', { headless: true, executablePath: exe, viewport: { width: 1920, height: 1080 }, args: ['--hide-scrollbars'] });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto('https://portal.wakecap.com/project/da2a9547-5b2f-49f3-bba3-e241aa9b5ddd/connected-env/weather-station', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Weather parameters', { timeout: 60000 }); await page.waitForTimeout(4000);
  const order = () => page.evaluate(() => [...document.querySelectorAll('button[aria-label^="Move "][aria-label$=" up"]')].map(b => b.getAttribute('aria-label').replace(/^Move /, '').replace(/ up$/, '')));
  let cur = await order(); console.log('before:', JSON.stringify(cur));
  for (let i = 0; i < target.length; i++) {
    let guard = 0;
    while (cur.indexOf(target[i]) > i && guard++ < 20) {
      await page.locator('button[aria-label="Move ' + target[i] + ' up"]').click(); await page.waitForTimeout(900);
      cur = await order();
    }
  }
  console.log('after: ', JSON.stringify(cur));
  console.log('matches original:', JSON.stringify(cur) === JSON.stringify(target));
  await ctx.close();
})().catch(e => { console.error('ERR', e.message.slice(0, 300)); process.exit(1); });
