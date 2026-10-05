#!/usr/bin/env python3
"""dev_slide.py <id>: build a one-slide dev deck so a builder can test new-slides/<id>.js alone.
Output: ideas-bank/dev/<id>/dev.html. Then, from ../story:  node qa_shots.js ../ideas-bank/dev/<id>/dev.html <id> ../ideas-bank/qa/<id> --wait=2200"""
import os, re, shutil, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(HERE); S = os.path.join(P, "story")
sid = sys.argv[1]
src = os.path.join(HERE, "new-slides", sid + ".js")
if not os.path.exists(src): sys.exit("missing " + src)
plan = open(os.path.join(HERE, "plan.js"), encoding="utf-8").read()
m = re.search(r"^  \{ id: '%s',.*$" % re.escape(sid), plan, re.M)
if not m: sys.exit("no plan entry for " + sid)
entry = m.group(0).rstrip(); entry += "" if entry.endswith(",") else ","
sec = re.search(r"section: '([^']+)'", entry).group(1)
d = os.path.join(HERE, "dev", sid); shutil.rmtree(d, ignore_errors=True); os.makedirs(os.path.join(d, "slides"))
txt = open(src, encoding="utf-8").read()
txt = re.sub(r"(Deck\.add\(\{\s*id: ')[^']+(',\s*)section: '[^']*'", lambda mm: mm.group(1) + sid + mm.group(2) + f"section: '{sec}'", txt, count=1)
open(os.path.join(d, "slides", sid + ".js"), "w", encoding="utf-8").write(txt)
open(os.path.join(d, "plan.js"), "w", encoding="utf-8").write("Deck.plan([\n" + entry + "\n]);\n")
out = os.path.join(d, "dev.html")
r = subprocess.run([sys.executable, os.path.join(S, "build_story.py"), "--out", out, "--slides-dir", os.path.join(d, "slides"), "--sections-file", os.path.join(HERE, "sections.js"),
                    "--plan-file", os.path.join(d, "plan.js"), "--assets-dir", HERE, "--version", "99999999"], capture_output=True, text=True)
print(r.stdout.strip()); print(r.stderr.strip())
print("next: cd ../story && node qa_shots.js ../ideas-bank/dev/%s/dev.html %s ../ideas-bank/qa/%s --wait=2200" % (sid, sid, sid))
