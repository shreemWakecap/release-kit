// Records the guided tour (browser video with a cursor, captions and privacy masks) paced by the narration clips.
// Read only on the portal. The only state it touches is the user's own Select parameters (restored) and card order (restored).
// Run: node record-tour.js            writes out/raw/*.webm and out/timeline.json
const { chromium } = require('/Users/admin/wstack/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');
const HERE = __dirname;
const steps = JSON.parse(fs.readFileSync(HERE + '/steps.json'));
const dur = JSON.parse(fs.readFileSync(HERE + '/durations.json'));
const ORIGIN = 'https://portal.wakecap.com/project/';
const A = ORIGIN + 'da2a9547-5b2f-49f3-bba3-e241aa9b5ddd/connected-env';
const B = ORIGIN + '28df7ba2-94b1-436d-b114-fe7e16a15e07/connected-env';
const C = ORIGIN + '0f52747e-9de9-421d-8aa8-fa9d01d66196/connected-env';
const RANGE = (process.env.RANGE || '').split(':');
const ONLY_FROM = RANGE[0] || steps[0].id, ONLY_TO = RANGE[1] || steps[steps.length - 1].id;

const INIT = `(() => {
  if (window.__tourInit) return; window.__tourInit = true;
  const boot = () => {
    const st = document.createElement('style');
    st.textContent = 'canvas,.esri-view-surface{filter:blur(18px) !important}';
    document.head.appendChild(st);
    const mk = (css, html) => { const d = document.createElement('div'); d.style.cssText = css; if (html) d.innerHTML = html; document.documentElement.appendChild(d); return d; };
    // privacy masks: top bar organization and project names, user avatar
    mk('position:fixed;left:1380px;top:0;width:540px;height:38px;background:#000;z-index:2147483000;pointer-events:none');
    mk('position:fixed;left:6px;top:1026px;width:44px;height:44px;border-radius:22px;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);z-index:2147483000;pointer-events:none');
    // cursor and click ripple
    const cur = mk('position:fixed;left:0;top:0;width:30px;height:30px;z-index:2147483646;pointer-events:none;transform:translate(-100px,-100px)',
      '<svg viewBox="0 0 24 24" width="30" height="30"><path d="M3 2l7 19 3-8 8-3z" fill="#fff" stroke="#000" stroke-width="1.5"/></svg>');
    document.addEventListener('mousemove', e => { cur.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)'; }, true);
    document.addEventListener('mousedown', e => {
      const r = mk('position:fixed;left:' + (e.clientX - 30) + 'px;top:' + (e.clientY - 30) + 'px;width:60px;height:60px;border:4px solid #FF8300;border-radius:50%;z-index:2147483645;pointer-events:none;opacity:1;transition:all .6s ease-out');
      requestAnimationFrame(() => { r.style.transform = 'scale(1.8)'; r.style.opacity = '0'; });
      setTimeout(() => r.remove(), 700);
    }, true);
    // caption bar
    const cap = mk('position:fixed;left:0;right:0;bottom:0;height:84px;background:rgba(0,0,0,.84);color:#fff;font:600 30px Inter,-apple-system,system-ui,sans-serif;display:none;align-items:center;padding:0 48px;gap:26px;z-index:2147483100;border-top:3px solid #FF8300;pointer-events:none',
      '<span id="__capch" style="font-size:17px;letter-spacing:.14em;color:#FF8300;text-transform:uppercase;white-space:nowrap"></span><span id="__captx"></span>');
    window.__setCap = (ch, tx) => { cap.style.display = tx ? 'flex' : 'none'; document.getElementById('__capch').textContent = ch || ''; document.getElementById('__captx').textContent = tx || ''; };
    window.__sync = () => { const f = mk('position:fixed;inset:0;background:#ff00ff;z-index:2147483647;pointer-events:none'); setTimeout(() => f.remove(), 450); return Date.now(); };
    // text and input blur overlays (names, coordinates, two ambiguous product lines): do not touch the page DOM, only overlay it
    const PATS = [/Main Plant Weather Station/, /SCC Weather Station/, /H7038/, /Fadhili/i, /\\d{2}\\.\\d{4,},\\s?\\d{2}\\.\\d{4,}/, /These are the radii the alerting service uses/, /Set manually until Management Maps/];
    let ranges = [], inputs = [], pool = [], avEl = null;
    const avOverlay = mk('position:fixed;display:none;border-radius:50%;background:#cdd5db;z-index:2147483001;pointer-events:none');
    const scan = () => {
      const out = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
      while ((n = w.nextNode())) { const t = n.nodeValue; if (!t || t.length < 3) continue; for (const p of PATS) { if (p.test(t)) { const r = document.createRange(); r.selectNodeContents(n); out.push(r); break; } } }
      avEl = [...document.querySelectorAll('[role=button]')].find(e => /^[A-Z]{1,3}$/.test((e.innerText || '').trim()) && e.getBoundingClientRect().x < 60) || null;
      ranges = out; inputs = [...document.querySelectorAll('input')].filter(i => /^-?\\d{2}\\.\\d{5,}$/.test(i.value || ''));
    };
    setInterval(scan, 350); scan();
    const tick = () => {
      if (avEl) { const a = avEl.getBoundingClientRect(); if (a.width > 4) { avOverlay.style.display = 'block'; avOverlay.style.left = (a.left - 3) + 'px'; avOverlay.style.top = (a.top - 3) + 'px'; avOverlay.style.width = (a.width + 6) + 'px'; avOverlay.style.height = (a.height + 6) + 'px'; } else avOverlay.style.display = 'none'; } else avOverlay.style.display = 'none';
      const rects = ranges.map(r => r.getBoundingClientRect()).concat(inputs.map(i => i.getBoundingClientRect()));
      while (pool.length < rects.length) pool.push(mk('position:fixed;display:none;backdrop-filter:blur(11px);-webkit-backdrop-filter:blur(11px);background:rgba(235,235,235,.55);z-index:2147483000;pointer-events:none'));
      pool.forEach((d, i) => { const b = rects[i]; if (b && b.width > 1 && b.height > 1) { d.style.display = 'block'; d.style.left = (b.left - 4) + 'px'; d.style.top = (b.top - 3) + 'px'; d.style.width = (b.width + 8) + 'px'; d.style.height = (b.height + 6) + 'px'; } else d.style.display = 'none'; });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();`;

(async () => {
  const exe = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
  fs.rmSync(HERE + '/out/raw', { recursive: true, force: true });
  const ctx = await chromium.launchPersistentContext(process.env.HOME + '/.wstack/chromium-profile', {
    headless: true, executablePath: exe, viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: HERE + '/out/raw', size: { width: 1920, height: 1080 } }, args: ['--hide-scrollbars'],
  });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.addInitScript(INIT);
  const log = (...a) => console.log(...a);
  const nonGet = [];
  page.on('request', r => { const u = r.url(); if (!['GET', 'HEAD', 'OPTIONS'].includes(r.method()) && u.includes('wakecap')) nonGet.push(r.method() + ' ' + u.replace(/\?.*/, '').slice(0, 120)); });

  let T0 = Date.now();           // sync reference (set by the flash)
  const starts = {}, ends = {}, cuts = [];
  const rel = () => (Date.now() - T0) / 1000;
  const sleep = ms => page.waitForTimeout(ms);
  const setCap = async (st) => { await page.evaluate(([c, t]) => window.__setCap && window.__setCap(c, t), [st.chapter, st.caption]); };
  let cx = 960, cy = 540;
  const move = async (x, y, n = 38) => { await page.mouse.move(x, y, { steps: n }); cx = x; cy = y; };
  const clickXY = async (x, y) => { await move(x, y); await sleep(380); await page.mouse.down(); await sleep(90); await page.mouse.up(); };
  const boxOf = async (loc) => { await loc.first().waitFor({ state: 'visible', timeout: 30000 }); return loc.first().boundingBox(); };
  const clickLoc = async (loc, dx = 0, dy = 0) => { const b = await boxOf(loc); await clickXY(b.x + b.width / 2 + dx, b.y + b.height / 2 + dy); };
  const hoverLoc = async (loc, dx = 0, dy = 0) => { const b = await boxOf(loc); await move(b.x + b.width / 2 + dx, b.y + b.height / 2 + dy); };
  const wheel = async (dy, parts = 10) => { if (cx < 300 || cy < 120 || cy > 960) await move(1000, 600, 25); for (let i = 0; i < parts; i++) { await page.mouse.wheel(0, dy / parts); await sleep(45); } };
  const scrollToLoc = async (loc) => { for (let i = 0; i < 25; i++) { const bb = await loc.boundingBox().catch(() => null); if (!bb) break; if (bb.y > 780) await wheel(Math.min(520, bb.y - 480), 6); else if (bb.y < 160) await wheel(-320, 4); else break; await sleep(200); } };
  const toTop = async () => { if (cx < 300 || cy < 120 || cy > 960) await move(1000, 600, 25); for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, -2500); await sleep(60); } await sleep(300); };
  const styled = () => page.evaluate(() => { const b = document.querySelector('button[aria-label="Collapse rail"]'); if (!b) return false; const r = b.getBoundingClientRect(); return r.width > 120 && r.width < 400; });
  const go = async (url, readyText) => {
    const a = rel();
    for (let attempt = 0; attempt < 3; attempt++) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      try { await page.waitForSelector('text=' + readyText, { timeout: 60000 }); } catch (e) { log('  ready text not found:', readyText); }
      await sleep(1800);
      if (await styled()) break;
      log('  page came up unstyled, reloading');
    }
    await sleep(500);
    cuts.push([a, rel()]);
  };
  const waitText = async (t, ms = 30000) => { try { await page.waitForSelector('text=' + t, { timeout: ms }); } catch (e) { log('  missing text:', t); } };
  const dlgSwitch = async (name) => {  // bounding box + state of the switch in the open dialog whose row text starts with name
    return page.evaluate((n) => {
      const d = document.querySelector('[role=dialog]'); if (!d) return null;
      for (const s of d.querySelectorAll('[role=switch]')) { let e = s, txt = ''; for (let i = 0; i < 4 && e; i++) { e = e.parentElement; txt = (e && e.innerText || '').trim(); if (txt.startsWith(n)) break; }
        if (txt.startsWith(n)) { const r = s.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, on: s.getAttribute('aria-checked') === 'true' }; } }
      return null;
    }, name);
  };
  const setSwitchHover = async (name) => { const sw = await dlgSwitch(name); if (sw) await move(sw.x, sw.y, 40); };
  const setSwitch = async (name, want) => { const s = await dlgSwitch(name); if (!s) { log('  switch not found', name); return; } if (s.on !== want) { await clickXY(s.x, s.y); await sleep(700); } else await move(s.x, s.y); };
  const cardOrder = async () => page.evaluate(() => [...document.querySelectorAll('button[aria-label^="Move "][aria-label$=" up"]')].map(b => b.getAttribute('aria-label').replace(/^Move /, '').replace(/ up$/, '')));
  const menuLink = (name) => page.locator('a').filter({ hasText: new RegExp('^\\s*' + name + '\\s*$') }).first();
  const stationBtn = (n) => page.locator('button[aria-label="View ' + n + '"]');

  // ---- warm up (not part of the video: trimmed away) ----
  for (const [u, t] of [[B + '/lightning', 'Readings as of'], [C + '/gas', 'Overview'], [B + '/settings/lightning', 'Alerting radii'], [C + '/gas/compliance', 'Limits in force'], [A + '/settings/weather-station', 'Stop-work limits'], [A + '/reports', 'Maximum Values Report'], [A + '/weather-station', 'Weather parameters']]) {
    await page.goto(u, { waitUntil: 'domcontentloaded' }); await waitText(t, 60000); await sleep(1200);
  }
  await toTop(); await sleep(1500);
  const initialOrder = await cardOrder();
  log('initial card order:', JSON.stringify(initialOrder));
  T0 = await page.evaluate(() => window.__sync()); await sleep(900);   // magenta flash = sync marker
  log('sync set');

  const bodies = {
    s01: async () => { await toTop(); await move(960, 330, 40); },
    s02: async () => { await clickLoc(page.getByRole('button', { name: 'View Recommended Steps' })); await sleep(1500); },
    s03: async () => { await move(1650, 380, 30); await sleep(2500); await page.keyboard.press('Escape'); await sleep(600); },
    s04: async () => { await clickLoc(page.getByRole('button', { name: 'Details' }).first()); await sleep(1500); await move(1500, 420, 30); await sleep(1500); await page.keyboard.press('Escape'); await sleep(600); },
    s05: async () => { await hoverLoc(page.locator('text=Heat Index').first(), 120, 90); await sleep(800); await move(700, 640, 40); },
    s05b: async () => {
      await hoverLoc(page.locator('button[aria-label^="Copy your selected cards"]')); await sleep(1800);
      await hoverLoc(page.locator('button[title="Export weather data"]')); await sleep(1500);
    },
    s06: async () => {
      await clickLoc(stationBtn('Main Plant Weather Station'), -60); await sleep(2600);
      await clickLoc(stationBtn('SCC Weather Station'), -60); await sleep(2600);
    },
    s06b: async () => { await hoverLoc(page.locator('button[aria-label="Rename Main Plant Weather Station"]')); await sleep(1800); },
    s07: async () => {
      const t0 = Date.now(); const need = (dur.s07 + 0.5) * 1000;
      await clickLoc(stationBtn('1925073288'), -60);
      while (Date.now() - t0 < need * 0.72) await sleep(200);
      await clickLoc(stationBtn('Main Plant Weather Station'), -60); await sleep(1200);
    },
    s08: async () => { await clickLoc(page.locator('button[aria-label="Dashboard settings"]')); await sleep(1800); await move(1100, 520, 30); await sleep(4200); await setSwitchHover('Barometric Pressure'); await sleep(1500); await page.keyboard.press('Escape'); await sleep(800); },
    s09: async () => {
      const rm = page.locator('button[aria-label="Remove Barometric Pressure from featured"]');
      await toTop(); await scrollToLoc(rm); await hoverLoc(rm, 0, 0); await sleep(1400);
      await clickLoc(rm); await sleep(2500); await move(900, 520, 30);
    },
    s10: async () => {
      await toTop(); await clickLoc(page.locator('button[aria-label="Dashboard settings"]')); await sleep(1500);
      await setSwitch('Barometric Pressure', true); await sleep(900); await page.keyboard.press('Escape'); await sleep(900);
      await wheel(3000, 26); await sleep(1500);
    },
    s11: async () => {
      await toTop(); await sleep(400);
      const down = page.locator('button[aria-label="Move Wind Speed down"]'); const up = page.locator('button[aria-label="Move Wind Speed up"]');
      await clickLoc(down); await sleep(1500); await clickLoc(up); await sleep(1500);
    },
    s12: async () => {
      await toTop(); const red = page.locator('text=Above safe limit >> visible=true').first();
      await scrollToLoc(red); await hoverLoc(red, 0, -50).catch(() => {}); await sleep(1500);
    },
    s13: async () => {
      await toTop(); await clickLoc(menuLink('Reports')); await waitText('Maximum Values Report'); await sleep(1500);
      await clickLoc(page.getByRole('button', { name: 'Today', exact: true })); await sleep(1700);
      await clickLoc(page.getByRole('button', { name: 'Last 7 Days' })); await sleep(1700);
      await clickLoc(page.getByRole('button', { name: 'Last 30 Days' })); await sleep(1200);
    },
    s14: async () => { await hoverLoc(page.locator('text=MAXIMUM HEAT INDEX').first(), 120, 40); await sleep(1500); await wheel(400, 8); await sleep(800); await toTop(); await hoverLoc(page.getByRole('button', { name: 'Export .xlsx' }), 0, 0); },
    s15: async () => {
      await clickLoc(menuLink('Settings')); await waitText('Connected Products'); await sleep(1200);
      await clickLoc(menuLink('Connected Products')); await sleep(1500);
    },
    s16: async () => {
      await waitText('Connected Products'); await page.waitForSelector('[role=switch]', { timeout: 40000 }).catch(() => log('  switches not shown')); await sleep(800);
      const sw = page.locator('[role=switch]'); const n = await sw.count();
      for (let i = 0; i < n; i++) { await hoverLoc(sw.nth(i), 0, 0); await sleep(1100); }
    },
    s17: async () => { await hoverLoc(page.locator('[role=switch]').nth(1), -20, 0); await sleep(1500); },
  };
  // navigation steps are wrapped so the loading time is cut from the final video
  const navBodies = {
    s18: async () => { await go(B + '/lightning', 'Readings as of'); },
    s19: async () => { await go(C + '/gas', 'Overview'); },
    s20: async () => { await go(A + '/settings/weather-station', 'Stop-work limits'); },
    s24: async () => { await go(A + '/settings/lightning', 'No lightning device'); },
    s25: async () => { await go(B + '/settings/lightning', 'Edit alerting radii'); },
    s27: async () => { await go(C + '/gas/compliance', 'Limits in force'); },
    s28: async () => { await go(A + '/weather-station', 'Weather parameters'); },
  };
  const afterNav = {
    s18: async () => { await hoverLoc(menuLink('Lightning'), 20, 0).catch(() => move(160, 163)); await sleep(2500); },
    s19: async () => { await move(150, 211, 40); await sleep(2500); },
    s20: async () => { await hoverLoc(page.locator('text=Changing anything here changes when work stops').first(), 60, 0).catch(() => {}); await sleep(2000); },
    s20b: async () => { await hoverLoc(page.locator('text=In force on site').first(), 120, 0).catch(() => {}); await sleep(2200); },
    s21: async () => { await wheel(520, 12); await sleep(800); await hoverLoc(page.locator('button[aria-label="Increase the Temperature limit"]'), 0, 0).catch(() => {}); await sleep(1500); await hoverLoc(page.locator('button[aria-label="Count Temperature in this policy"]'), 0, 0).catch(() => {}); await sleep(1500); await wheel(480, 10); await sleep(1500); },
    s22: async () => { await wheel(1500, 18); await sleep(800); await hoverLoc(page.locator('button[aria-label^="Danger, 39"]'), 0, 0).catch(() => {}); await sleep(1500); },
    s23: async () => { await wheel(900, 14); await sleep(600); await clickLoc(page.getByRole('tab', { name: 'Heat index calculation method' })); await sleep(2000); await clickLoc(page.getByRole('tab', { name: 'Change history' })); await sleep(2000); },
    s24: async () => { await move(840, 205, 40); await sleep(1500); },
    s25: async () => {
      await clickLoc(page.getByRole('button', { name: 'Edit alerting radii' })); await sleep(2800);
      await move(960, 560, 30); await sleep(1500);
      await clickLoc(page.getByRole('button', { name: 'Cancel' })); await sleep(800);
    },
    s26: async () => {
      await clickLoc(page.getByRole('button', { name: 'Set location' })); await sleep(3500);
      await clickLoc(page.getByRole('button', { name: 'Cancel' })); await sleep(800);
    },
    s27: async () => { await hoverLoc(page.locator('text=Limits in force').first(), 220, 60); await sleep(2500); },
    s28: async () => { await move(960, 400, 40); await sleep(1500); },
  };

  let active = false;
  for (const st of steps) {
    if (st.id === ONLY_FROM) active = true;
    if (!active) { if (navBodies[st.id]) { /* keep navigation state consistent when starting mid-way */ } continue; }
    const id = st.id;
    if (id === 's12') { const n = await page.locator('text=Above safe limit >> visible=true').count(); if (!n) { log('skip s12: no reading is above its limit right now'); continue; } }
    try {
      if (navBodies[id]) { await navBodies[id](); }
      const t0 = Date.now(); starts[id] = rel();
      await setCap(st);
      if (bodies[id]) await bodies[id](); else if (afterNav[id]) await afterNav[id]();
      if (navBodies[id] && afterNav[id] && bodies[id]) await afterNav[id]();
      const need = (dur[id] + 0.6) * 1000;
      const el = Date.now() - t0;
      if (el < need) await sleep(need - el);
      ends[id] = rel();
      log(id, 'start', starts[id].toFixed(1), 'len', (ends[id] - starts[id]).toFixed(1), 'narration', dur[id]);
    } catch (e) { log('STEP FAILED', id, e.message.slice(0, 200)); try { await page.keyboard.press('Escape'); } catch (e2) {} }
    if (id === ONLY_TO) break;
  }
  // some steps carry both a body and an after-navigation body; keep a record of everything
  await sleep(1500);
  const endT = rel();
  // ---- restore and verify the user's own view state ----
  let restored = true;
  try {
    await page.goto(A + '/weather-station', { waitUntil: 'domcontentloaded' }); await waitText('Weather parameters', 60000); await sleep(2500);
    const finalOrder = await cardOrder();
    let cur = finalOrder;
    if (JSON.stringify(cur) !== JSON.stringify(initialOrder)) {
      log('order differs, restoring (not part of the video):', JSON.stringify(cur));
      for (let i = 0; i < initialOrder.length; i++) { let g = 0; while (cur.indexOf(initialOrder[i]) > i && g++ < 20) { await page.locator('button[aria-label="Move ' + initialOrder[i] + ' up"]').click(); await sleep(900); cur = await cardOrder(); } }
    }
    if (JSON.stringify(cur) !== JSON.stringify(initialOrder)) { restored = false; log('ORDER STILL DIFFERS', JSON.stringify(cur)); } else log('card order restored');
    await page.locator('button[aria-label="Dashboard settings"]').click(); await sleep(1500);
    const sw = await page.evaluate(() => [...document.querySelectorAll('[role=dialog] [role=switch]')].map(s => s.getAttribute('aria-checked')));
    log('switches after tour:', JSON.stringify(sw)); if (sw.some(v => v !== 'true')) restored = false;
    await page.keyboard.press('Escape');
  } catch (e) { restored = false; log('restore check failed', e.message.slice(0, 160)); }
  log('state restored:', restored, '| wakecap non-GET requests:', JSON.stringify(nonGet));
  const video = page.video();
  await ctx.close();
  fs.writeFileSync(HERE + '/out/timeline.json', JSON.stringify({ starts, ends, cuts, endT, initialOrder, restored, nonGet, video: await video.path() }, null, 1));
  log('video:', await video.path());
})().catch(e => { console.error('ERR', e.message.slice(0, 600)); process.exit(1); });
