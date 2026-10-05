#!/usr/bin/env node
// extract.js: renders deck.html in Chrome -> qa/slide-NN.png, deck.pdf, and slides.json (geometry + text runs + notes) for build_pptx.py.
// Usage: node extract.js
const { chromium } = require('/Users/admin/wstack/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

function inPage() {
  const px = (v) => parseFloat(v) || 0;
  const parseColor = (c) => {
    const m = c && c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map((s) => parseFloat(s));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const hex = (c) => [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();

  const out = [];
  document.querySelectorAll('.slide').forEach((slideEl) => {
    const S = slideEl.getBoundingClientRect();
    const items = [];
    const rel = (r) => ({ x: r.left - S.left, y: r.top - S.top, w: r.width, h: r.height });

    const collect = (node, runs) => {
      node.childNodes.forEach((n) => {
        if (n.nodeType === 3) {
          let t = n.textContent.replace(/\s+/g, ' ');
          if (!t) return;
          const pcs = getComputedStyle(n.parentElement);
          if (pcs.textTransform === 'uppercase') t = t.toUpperCase();
          runs.push({
            text: t, bold: parseInt(pcs.fontWeight, 10) >= 600, italic: pcs.fontStyle === 'italic',
            color: hex(parseColor(pcs.color)), size: px(pcs.fontSize), spacing: px(pcs.letterSpacing),
          });
        } else if (n.nodeType === 1) {
          if (n.tagName === 'BR') runs.push({ br: true });
          else collect(n, runs);
        }
      });
    };

    const walk = (el) => {
      if (el.matches('script,style')) return;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      const r = el.getBoundingClientRect();
      const g = rel(r);
      const bg = parseColor(cs.backgroundColor);
      const bw = { t: px(cs.borderTopWidth), r: px(cs.borderRightWidth), b: px(cs.borderBottomWidth), l: px(cs.borderLeftWidth) };
      const hasBorder = bw.t > 0 || bw.r > 0 || bw.b > 0 || bw.l > 0;
      const hasFill = bg && bg.a > 0;
      const borderColor = parseColor(cs.borderTopColor);
      const shapeItem = () => ({
        type: 'shape', ...g, radius: px(cs.borderTopLeftRadius),
        fill: hasFill ? { hex: hex(bg), a: bg.a } : null,
        border: hasBorder ? { w: bw, hex: hex(borderColor), a: borderColor.a, dash: cs.borderTopStyle === 'dashed' } : null,
      });
      const outlineItem = () => {
        const ow = px(cs.outlineWidth);
        if (cs.outlineStyle === 'none' || ow <= 0) return;
        const oc = parseColor(cs.outlineColor);
        items.push({ type: 'shape', x: g.x - ow, y: g.y - ow, w: g.w + 2 * ow, h: g.h + 2 * ow, radius: 0, fill: null,
          border: { w: { t: ow, r: ow, b: ow, l: ow }, hex: hex(oc), a: oc.a, dash: false } });
      };
      if (el.tagName === 'IMG') {
        items.push({ type: 'image', src: el.getAttribute('src'), x: g.x + bw.l, y: g.y + bw.t, w: g.w - bw.l - bw.r, h: g.h - bw.t - bw.b });
        if (hasBorder) items.push({ ...shapeItem(), fill: null });
        outlineItem();
        return;
      }
      if (hasFill || hasBorder) items.push(shapeItem());
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length);
      if (hasText) {
        const pl = px(cs.paddingLeft) + bw.l, pr = px(cs.paddingRight) + bw.r, pt = px(cs.paddingTop) + bw.t, pb = px(cs.paddingBottom) + bw.b;
        const runs = [];
        collect(el, runs);
        while (runs.length && runs[0].text !== undefined) { runs[0].text = runs[0].text.replace(/^\s+/, ''); if (runs[0].text) break; runs.shift(); }
        while (runs.length && runs[runs.length - 1].text !== undefined) { const l = runs[runs.length - 1]; l.text = l.text.replace(/\s+$/, ''); if (l.text) break; runs.pop(); }
        const fs = px(cs.fontSize);
        const lh = cs.lineHeight === 'normal' ? fs * 1.15 : px(cs.lineHeight);
        items.push({
          type: 'text', tag: el.tagName, x: g.x + pl, y: g.y + pt, w: g.w - pl - pr, h: g.h - pt - pb,
          align: cs.textAlign === 'center' ? 'center' : (cs.textAlign === 'right' || cs.textAlign === 'end') ? 'right' : 'left',
          lineHeight: lh, nowrap: cs.whiteSpace === 'nowrap', runs,
        });
        outlineItem();
        return;
      }
      outlineItem();
      for (const c of el.children) walk(c);
    };

    for (const c of slideEl.children) walk(c);
    const notes = slideEl.querySelector('script.notes');
    out.push({ bg: hex(parseColor(getComputedStyle(slideEl).backgroundColor)), notes: notes ? notes.textContent : '', items });
  });
  return out;
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: EXE });
  const ctx = await browser.newContext({ viewport: { width: 1360, height: 900 }, deviceScaleFactor: 1.5 });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(HERE, 'deck.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
  fs.mkdirSync(path.join(HERE, 'qa'), { recursive: true });

  const slides = await page.evaluate(inPage);
  fs.writeFileSync(path.join(HERE, 'slides.json'), JSON.stringify({ width: 1280, height: 720, slides }, null, 1));

  const els = await page.$$('.slide');
  for (let i = 0; i < els.length; i++) {
    await els[i].screenshot({ path: path.join(HERE, 'qa', `slide-${String(i + 1).padStart(2, '0')}.png`) });
  }
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: path.join(HERE, 'deck.pdf'), width: '1280px', height: '720px', printBackground: true, preferCSSPageSize: true });
  console.log('slides', slides.length, '| items', slides.map((s) => s.items.length).join(','), '| pdf + png written');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
