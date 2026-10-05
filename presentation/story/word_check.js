#!/usr/bin/env node
// word_check.js: easy-words check. Lists hard words, long words, long sentences and awkward symbols in what is ON each slide
// (final step) and in the speaker notes (what the presenter SAYS). Usage: node word_check.js <built.html> [--all]
const { chromium } = require('/Users/admin/wstack/node_modules/playwright-core');
const path = require('path');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const HARD = /\b(provenance|ingest\w*|telemetry|outbox|entitlement\w*|orchestrat\w*|leverag\w*|utili[sz]\w*|seamless\w*|holistic|paradigm|stakeholder\w*|synchroni[sz]\w*|aggregat\w*|correlat\w*|infrastructure|architecture|asynchron\w*|heterogene\w*|interoperab\w*|granular\w*|scalab\w*|robust\w*|comprehensive\w*|end-to-end|unified|consolidat\w*|capabilit\w*|functionalit\w*|integrat\w*|vendor\w*|poll(s|ed|ing)?|threshold\w*|compliance|exposure|acknowledg\w*|verdict|stand down|informs?|ponds?|metrics?|instrument\w*|algorithm\w*|predictive|analytics|latency|payload|endpoint|schema|pipeline|milestone\w*|platform\w*|roadmap|prototype|mitigat\w*|facilitat\w*|implement\w*|methodolog\w*|proactive\w*|actionable|insights?|deliverable\w*|transform\w*|ecosystem|dependenc\w*|redundan\w*|visibility|concurrent\w*|persist\w*|propagat\w*|derive[sd]?|computed?|expos(e|es|ed))\b/i;
const SYMS = /[→←↔·—–&~°%\/<>=|]|e\.g\.|i\.e\.|\bvs\b|\betc\b/;
(async () => {
  const b = await chromium.launch({ headless: true, executablePath: EXE });
  const p = await (await b.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  await p.goto('file://' + path.resolve(process.argv[2]) + '?print'); await p.waitForFunction(() => window.Deck && Deck.ready); await p.waitForTimeout(1200);
  const rows = await p.evaluate(() => Deck.defs.map((d, i) => {
    const lines = [];
    const walk = (el) => {
      if (el.matches && el.matches('.slide-kicker,.slide-rb,.slide-new,script,style,.ph-foot,.ph-bar,.ph-num')) return;
      const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') return;
      el.childNodes.forEach((n) => { if (n.nodeType === 3) { const t = n.textContent.replace(/\s+/g, ' ').trim(); if (t) lines.push(t); } else if (n.nodeType === 1) walk(n); });
    };
    walk(d.el);
    return { n: i + 1, id: d.id, placeholder: !!d.placeholder, lines, notes: d.notes || '' };
  }));
  const all = process.argv.includes('--all'); let bad = 0;
  if (process.argv.includes('--dump')) { rows.filter((r) => !r.placeholder).forEach((r) => { console.log(`\n=== ${r.n} ${r.id}\nON SLIDE: ${r.lines.join(' | ')}\nNOTES:\n${r.notes.split('\n').map((l) => '  ' + l).join('\n')}`); }); await b.close(); return; }
  rows.filter((r) => !r.placeholder).forEach((r) => {
    const out = [];
    r.lines.forEach((t) => {
      const w = t.split(/\s+/).filter((x) => /[A-Za-z0-9]/.test(x));
      const hard = (t.match(new RegExp(HARD.source, 'gi')) || []);
      const long = w.filter((x) => x.replace(/[^A-Za-z]/g, '').length >= 11);
      if (hard.length) out.push(`  slide hard  : "${t}"  -> ${[...new Set(hard.map((s) => s.toLowerCase()))].join(', ')}`);
      if (long.length) out.push(`  slide long  : "${t}"  -> ${long.join(', ')}`);
      if (w.length > 8) out.push(`  slide >8 w  : "${t}" (${w.length})`);
    });
    const notes = r.notes.split('\n').map((s) => s.trim()).filter(Boolean);
    notes.forEach((ln) => {
      const ifAsked = /^If asked/i.test(ln);
      ln.split(/(?<=[.!?])\s+/).forEach((s) => {
        const w = s.split(/\s+/).filter((x) => /[A-Za-z0-9]/.test(x));
        const hard = (s.match(new RegExp(HARD.source, 'gi')) || []);
        if (!ifAsked && w.length > 14) out.push(`  notes >14 w : "${s}" (${w.length})`);
        if (!ifAsked && hard.length) out.push(`  notes hard  : "${s}"  -> ${[...new Set(hard.map((x) => x.toLowerCase()))].join(', ')}`);
        if (!ifAsked && SYMS.test(s)) out.push(`  notes symbol: "${s}"`);
      });
    });
    if (out.length) { bad += out.length; console.log(`${String(r.n).padStart(2)} ${r.id}\n${out.join('\n')}`); } else if (all) console.log(`${String(r.n).padStart(2)} ${r.id}  ok`);
  });
  console.log(`\n${bad} finding(s) in ${rows.filter((r) => !r.placeholder).length} built slides (${rows.filter((r) => r.placeholder).length} placeholders skipped)`);
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
