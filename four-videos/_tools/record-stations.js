const { chromium } = require('/Users/admin/wstack/node_modules/playwright-core');
(async () => {
  const exe = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
  const url = 'https://portal.wakecap.com/project/da2a9547-5b2f-49f3-bba3-e241aa9b5ddd/connected-env/weather-station';
  const tLaunch = Date.now();
  const ctx = await chromium.launchPersistentContext(process.env.HOME + '/.wstack/chromium-profile', {
    headless: true, executablePath: exe, viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: 'out', size: { width: 1920, height: 1080 } }, args: ['--hide-scrollbars'],
  });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.addInitScript(() => {
    const boot = () => {
      if (document.getElementById('__cur')) return;
      const c = document.createElement('div'); c.id = '__cur';
      c.style.cssText = 'position:fixed;left:0;top:0;width:30px;height:30px;z-index:2147483647;pointer-events:none;transform:translate(-100px,-100px)';
      c.innerHTML = '<svg viewBox="0 0 24 24" width="30" height="30"><path d="M3 2l7 19 3-8 8-3z" fill="#fff" stroke="#000" stroke-width="1.5"/></svg>';
      document.documentElement.appendChild(c);
      document.addEventListener('mousemove', e => { c.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)'; }, true);
      document.addEventListener('mousedown', e => {
        const r = document.createElement('div');
        r.style.cssText = 'position:fixed;left:' + (e.clientX - 30) + 'px;top:' + (e.clientY - 30) + 'px;width:60px;height:60px;border:4px solid #FF8300;border-radius:50%;z-index:2147483646;pointer-events:none;opacity:1;transition:all .6s ease-out';
        document.documentElement.appendChild(r);
        requestAnimationFrame(() => { r.style.transform = 'scale(1.8)'; r.style.opacity = '0'; });
        setTimeout(() => r.remove(), 700);
      }, true);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('text=Main Plant Weather Station', { timeout: 60000 });
  await page.waitForTimeout(3500);
  const tStart = Date.now();
  await page.mouse.move(900, 700);
  await page.waitForTimeout(800);
  const clickText = async (name, hold) => {
    const bb = await page.getByText(name, { exact: true }).first().boundingBox();
    const x = bb.x + Math.min(70, bb.width / 2), y = bb.y + bb.height / 2;
    await page.mouse.move(x, y, { steps: 40 });
    await page.waitForTimeout(450);
    await page.mouse.down(); await page.waitForTimeout(90); await page.mouse.up();
    await page.waitForTimeout(hold);
  };
  await clickText('Main Plant Weather Station', 4000);
  await clickText('SCC Weather Station', 4000);
  await clickText('1925073288', 4000);
  await page.mouse.move(900, 900, { steps: 30 });
  await page.waitForTimeout(1500);
  const tEnd = Date.now();
  const video = page.video();
  await ctx.close();
  console.log(JSON.stringify({ path: await video.path(), startOffsetMs: tStart - tLaunch, durationMs: tEnd - tStart }));
})().catch(e => { console.error('ERR', e.message.slice(0, 500)); process.exit(1); });
