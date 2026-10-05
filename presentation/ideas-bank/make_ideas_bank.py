#!/usr/bin/env python3
"""make_ideas_bank.py: build the Connected Environment IDEAS BANK deck.
Every slide module we ever built (the 7 shown in the demo and all the removed ones) plus the planned-but-never-built ideas
(shown as blueprint cards from the first 35-slide plan). Run again any time: python3 make_ideas_bank.py
Output: ../connected-environment-ideas-bank.html and slides/ + plan.js + sections.js in this folder."""
import os, re, shutil, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(HERE)
S = os.path.join(P, "story"); A = os.path.join(P, "story-archive"); B = os.path.join(S, "board")
SL = os.path.join(S, "src", "slides"); DET = os.path.join(A, "detailed-slides")
ACTS = [("why", "The stakes", "Stakes"), ("convert", "The conversion", "Change"), ("tech", "The paths of readings", "Paths"), ("bank", "The data bank", "Bank"),
        ("future", "What it can do", "Future"), ("numbers", "The numbers", "Numbers"), ("next", "What next", "Next"), ("appendix", "Extras", "Extras")]
# (id, section, source file or None, plan label t, plan title, status, shown in the 7-slide demo?)
BANK = [
 ("title","why",f"{SL}/01-title.js","The big idea","From a weather station to one data bank","none",1),
 ("question","why",f"{SL}/02-question.js","Safe now?","Is it safe to work right now?","live",1),
 ("badges","why",f"{DET}/03-badges.js","Claim badges","Every claim wears a badge","none",0),
 ("map","why",f"{A}/map/04-map.js","This map","The story map","none",0),
 ("stakes","why",f"{SL}/04-stakes.js","Cost of a decision","The cost of every decision","live",1),
 ("stakes-lives","why",None,"Lives and hours","What a wrong call costs: lives and hours","stat",0),
 ("chain","why",None,"Heat to cost chain","From heat to cost: the chain","stat",0),
 ("before","convert",f"{DET}/07-before.js","Before: standalone","Before: a weather station on its own","code",0),
 ("timeline","convert",None,"Six eras, 497 days","Six eras, 497 days","code",0),
 ("conversion","convert",f"{A}/conversion/05-conversion.js","How it grew","One app grew into three","code",0),
 ("shipped","convert",f"{A}/shipped/05-shipped.js","Three products","One portal area, three products","live",0),
 ("renameday","convert",None,"Rename day","Rename day: one name, 260 files","code",0),
 ("status","convert",f"{DET}/11-status.js","Where it stands","Where it stands","code",0),
 ("build","convert",None,"The build in numbers","The build in numbers","code",0),
 ("flow","tech",f"{SL}/13-flow.js","Sensor to screen","Two paths in. One page.","code",1),
 ("flow-detailed","tech",f"{B}/20-flow.js","Detailed paths","The path of every reading, today (first detailed version)","code",0),
 ("platform","tech",None,"The system around it","The system around Connected Environment","code",0),
 ("flow-weather","tech",f"{DET}/15-flow-weather.js","Weather path","Weather: from a sensor head to a pixel","code",0),
 ("flow-lightning","tech",None,"Lightning path","Lightning: silence is never clear","code",0),
 ("flow-gas","tech",None,"Gas path","Gas: asked every 45 seconds","code",0),
 ("provenance","tech",f"{A}/provenance/08-provenance.js","Where numbers come from","Where each number comes from","code",0),
 ("alerts","tech",f"{DET}/19-alerts.js","Alerts leave the screen","Alerts leave the screen","code",0),
 ("stores","bank",None,"What is stored where","What is stored where","code",0),
 ("gaps","bank",None,"What prediction needs","What prediction would still need","code",0),
 ("keys","bank",f"{DET}/22-keys.js","The join keys","The join keys that already exist","code",0),
 ("pool","bank",f"{A}/pool/23-pool.js","The data bank","From three stores to one pool","vision",0),
 ("predict","future",f"{A}/predict/10-predict.js","Predict and plan","Plan the day early","vision",0),
 ("plan","future",None,"Plan","Plan: suggested work plans","vision",0),
 ("lives","future",None,"Save lives","Save lives: the closed loop","vision",0),
 ("permits","future",f"{A}/permits/11-permits.js","Work permits","Permits check the weather","vision",0),
 ("equipment","future",None,"Equipment","Equipment meets the weather","vision",0),
 ("streams","future",None,"Four data streams","One system, four data streams","vision",0),
 ("connect","future",f"{SL}/08-connect.js","Other products","Connect to other WakeCap products","vision",1),
 ("calc","numbers",None,"Your site, published rates","Your site, published rates","stat",0),
 ("relations","numbers",None,"The relations","The relations, with numbers","stat",0),
 ("roadmap","next",f"{SL}/32-roadmap.js","Our roadmap","Our roadmap","plan",1),
 ("close","next",f"{SL}/14-close.js","Wrap up","One data bank. One answer. Lives first.","none",1),
 ("sources","appendix",None,"Every number, its source","Every number, its source","stat",0),
 ("limits","appendix",f"{A}/limits/14-limits.js","What we don’t claim","What we do not claim","none",0),
]

# easy-words and "no dates" fixes applied to the COPIES of older slides (the archived originals stay as they were)
TEXT_FIXES = {
  "badges": [("and we give no dates.", "."), ("A direction, with no dates.", "A direction.")],
  "alerts": [(" We give no dates.", "")],
  "keys": [(", and there are no dates.", ".")],
  "flow-detailed": [("['Platform', BX, BW]", "['Our system', BX, BW]"), ("the vendor: a black", "the maker: a black"), ("polls every 60 s", "asks every 60 s"), ("polls every 30 s", "asks every 30 s"),
                    ("Three ponds, not one pool: next slide.", "Three stores, not one pool."), ("The vendor cloud holds the readings", "The maker’s cloud holds the readings")],
  "status": [("Gas acks back to vendor", "Gas acks back to the maker")],
}
orig = open(os.path.join(HERE, "original-plan-35.js"), encoding="utf-8").read()
olines = {}
for m in re.finditer(r"^  \{ id: '([^']+)'.*$", orig, re.M): olines[m.group(1)] = m.group(0)
# fresh slides folder
shutil.rmtree(os.path.join(HERE, "slides"), ignore_errors=True); os.makedirs(os.path.join(HERE, "slides"))
plan = ["/* Ideas bank plan: every slide we built (bright dots) plus every planned idea that was never built (blueprint cards, until a builder writes them into `new-slides/`). */", "Deck.plan(["]
cur = None; built = ideas = 0; rows = []
NEW = os.path.join(HERE, "new-slides"); os.makedirs(NEW, exist_ok=True)
missing = [b[0] for b in BANK if b[2] is None and not os.path.exists(os.path.join(NEW, b[0] + ".js"))]
for n, (sid, sec, src, t, title, st, demo) in enumerate(BANK, 1):
    if src is None and os.path.exists(os.path.join(NEW, sid + ".js")): src = os.path.join(NEW, sid + ".js")
    if sec != cur:
        plan.append(f"  /* ---- {dict((a[0], a[1]) for a in ACTS)[sec]} */"); cur = sec
    if src:
        txt = open(src, encoding="utf-8").read()
        txt = re.sub(r"(Deck\.add\(\{\s*id: ')[^']+(',\s*)section: '[^']*'", lambda m: m.group(1) + sid + m.group(2) + f"section: '{sec}'", txt, count=1)
        for old, new in TEXT_FIXES.get(sid, []):
            if old in txt: txt = txt.replace(old, new)
            else: print("  note: text fix not found in", sid, "->", old[:40])
        if sid == "flow-detailed":
            txt = re.sub(r"\.s-flow(?=[ .{:,>\[])", ".s-flow-detailed", txt)
            txt = txt.replace("title: 'The path of every reading, today'", "title: 'The path of every reading, today (first detailed version)'").replace("kicker: 'Board 2 · Data flow today'", "kicker: 'Data paths · First detailed version'")
        if sid == "map":
            def R(a, b, c=1):
                global txt
                assert a in txt, a[:60]; txt = txt.replace(a, b, c)
            R("W = 326, GAP = 23;", "W = 208, GAP = 9;")
            R("const ACTS = [['why', 'Why it matters', '#FF8300'], ['convert', 'The change', '#FFB366'], ['tech', 'Data and the bank', '#4FB3FF'], ['future', 'What it can do', '#C58BFF'], ['next', 'What next', '#FFC24B']];",
              "const ACTS = [['why', 'The stakes', '#FF8300'], ['convert', 'The conversion', '#FFB366'], ['tech', 'The paths', '#4FB3FF'], ['bank', 'The data bank', '#2BD576'], ['future', 'What it can do', '#C58BFF'], ['numbers', 'The numbers', '#E6E6E2'], ['next', 'What next', '#FFC24B'], ['appendix', 'Extras', '#8E8E89']];")
            R("data.filter((d) => d.section === key || (key === 'next' && d.section === 'appendix'))", "data.filter((d) => d.section === key)")
            R("(st.length * 118 - 44)", "(st.length * 78 - 26)")
            R("stepFor = ai < 2 ? 1 : ai < 4 ? 2 : 3;", "stepFor = ai < 3 ? 1 : ai < 6 ? 2 : 3;")
            R("const need = ai < 2 ? 1 : ai < 4 ? 2 : 3;", "const need = ai < 3 ? 1 : ai < 6 ? 2 : 3;")
            R(".s-map .mp-act{position:absolute;top:0;width:326px;height:700px}", ".s-map .mp-act{position:absolute;top:0;width:208px;height:760px}")
            R(".s-map .mp-head{position:absolute;left:0;top:0;width:326px;height:88px;padding-top:2px}", ".s-map .mp-head{position:absolute;left:0;top:0;width:208px;height:88px;padding-top:2px}")
            R("font:800 22px/1.15 var(--font);letter-spacing:.06em;text-transform:uppercase;color:#fff}", "font:800 17px/1.15 var(--font);letter-spacing:.04em;text-transform:uppercase;color:#fff}")
            R(".s-map .mp-st{position:absolute;left:0;top:116px;width:326px}", ".s-map .mp-st{position:absolute;left:0;top:112px;width:208px}")
            R(".s-map .mp-s{position:relative;height:118px;padding-left:50px;cursor:pointer}", ".s-map .mp-s{position:relative;height:78px;padding-left:38px;cursor:pointer}")
            R("left:7px;top:7px;width:24px;height:24px;border-radius:50%;background:#0B0B0C;border:3px solid var(--sc)", "left:5px;top:4px;width:17px;height:17px;border-radius:50%;background:#0B0B0C;border:3px solid var(--sc)")
            R("font:600 29px/1.2 var(--font);color:#D9D9D4", "font:600 19px/1.2 var(--font);color:#D9D9D4")
            R(".s-map .mp-line{position:absolute;left:16px;top:128px;", ".s-map .mp-line{position:absolute;left:12px;top:122px;")
            R("<span class=\"o glow-text\">One story.</span>", "<span class=\"o glow-text\">" + ("Ideas bank." if missing else "All of them.") + "</span>")
            R('data-delay="200">Each dot is one slide.</p>', 'data-delay="200">' + ("Bright dot: a built slide. Dim dot: an idea." if missing else "Each dot is one slide. Click one to jump.") + '</p>')
            R("kicker: 'Why it matters · This map'", "kicker: 'All slides · Map'")
        open(os.path.join(HERE, "slides", f"{n:02d}-{sid}.js"), "w", encoding="utf-8").write(txt); built += 1
        entry = f"  {{ id: '{sid}', section: '{sec}', t: {t!r}, title: {title!r}, st: '{st}' }},"
    else:
        key = "stakes" if sid == "stakes-lives" else sid
        line = olines[key]
        if sid == "stakes-lives": line = line.replace("id: 'stakes'", "id: 'stakes-lives'", 1)
        line = line.replace(", short: 1", "")
        entry = line if line.rstrip().endswith(",") else line + ","
        ideas += 1
    plan.append(entry); rows.append((n, sid, sec, "built" if src else "idea", title, demo, src))
plan.append("]);")
open(os.path.join(HERE, "plan.js"), "w", encoding="utf-8").write("\n".join(plan) + "\n")
open(os.path.join(HERE, "sections.js"), "w", encoding="utf-8").write("Deck.sections([\n" + "\n".join(f"  {{ key: '{k}', title: '{t}', short: '{s}' }}," for k, t, s in ACTS) + "\n]);\n")
out = os.path.join(P, "connected-environment-all-slides.html")
old = os.path.join(P, "connected-environment-ideas-bank.html")
if os.path.exists(old): os.remove(old)
r = subprocess.run([sys.executable, os.path.join(S, "build_story.py"), "--out", out, "--slides-dir", os.path.join(HERE, "slides"), "--sections-file", os.path.join(HERE, "sections.js"),
                    "--plan-file", os.path.join(HERE, "plan.js"), "--assets-dir", HERE, "--title", "Connected Environment: all slides", "--version", "99999999"], capture_output=True, text=True)
print(r.stdout.strip()); print(r.stderr.strip())
h = open(out, encoding="utf-8").read()
for x, y in (("<span>Under construction</span>", "<span>Idea · not built</span>"), ("This slide will show", "This slide would show"), ('<div class="label">Built from</div>', '<div class="label">Would use</div>'),
             (" · waiting for its builder", " · an idea for later"), ("' · not built yet'", "' · an idea'"), ("'Not built yet. '", "'An idea, not built. '")):
    assert x in h, x
    h = h.replace(x, y)
open(out, "w", encoding="utf-8").write(h)
# README
L = ["# Connected Environment: all slides", "", f"Open `../connected-environment-all-slides.html` in Chrome (works offline). {len(BANK)} pages: **{built} built slides** (bright dots) and **{ideas} ideas** that were planned but never built (blueprint cards).",
     "The 7-slide demo deck is `../connected-environment-story.html`. Nothing here changes it.", "",
     "Keys: → plays a slide, O = all slides, N = notes, F = full screen, ? = help. Click a dot on the map slide to jump.", "",
     "| # | Slide | Part | Status | In the 7-slide demo | Source file |", "|---|---|---|---|---|---|"]
for n, sid, sec, stt, title, demo, src in rows:
    L.append(f"| {n} | {title} | {sec} | {stt} | {'yes' if demo else ''} | {os.path.relpath(src, P) if src else 'idea only: see plan.js'} |")
L += ["", "## How to reuse a slide", "", "Copy its file from `slides/` into `../story/src/slides/`, add or keep its id in `../story/src/plan.js`, and the live deck builds it.",
      "The first 35-slide plan, with each idea's bullets, is `original-plan-35.js`. Re-run `python3 make_ideas_bank.py` to rebuild the deck.", ""]
open(os.path.join(HERE, "README.md"), "w", encoding="utf-8").write("\n".join(L))
print(f"{built} built + {ideas} ideas = {built + ideas} pages")
