#!/usr/bin/env python3
"""build_story.py: inlines engine + slide modules + assets into ONE self-contained HTML file.
Usage: python3 build_story.py [--out PATH]    (default ../connected-environment-story.html)
Each slide module goes into its own <script>, so a syntax error in one module cannot break the others.
Assets referenced as assets/xyz.png inside slide modules are inlined as data URIs from src/assets/.
"""
import argparse, base64, glob, mimetypes, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "src")
ap = argparse.ArgumentParser()
ap.add_argument("--out", default=os.path.join(HERE, "..", "connected-environment-story.html"))
ap.add_argument("--slides-dir", default=os.path.join(SRC, "slides"))
ap.add_argument("--sections-file", default=os.path.join(SRC, "sections.js"))
ap.add_argument("--title", default="")
ap.add_argument("--plan-file", default=os.path.join(SRC, "plan.js"))
ap.add_argument("--version", type=int, default=0)
ap.add_argument("--assets-dir", default=SRC)
a = ap.parse_args()

def read(p):
    return open(p, encoding="utf-8").read()

def inline_assets(text, fname):
    def rep(m):
        rel = m.group(2).lstrip("./")
        path = os.path.join(a.assets_dir, rel)
        if not os.path.exists(path):
            print(f"  WARNING {fname}: missing asset {rel}", file=sys.stderr)
            return m.group(0)
        mime = mimetypes.guess_type(path)[0] or "application/octet-stream"
        return m.group(1) + f"data:{mime};base64," + base64.b64encode(open(path, "rb").read()).decode() + m.group(3)
    return re.sub(r"""(['"(])((?:\./)?assets/[A-Za-z0-9_\-./]+\.(?:png|jpe?g|webp|svg|gif))(['")])""", rep, text)

shell = read(os.path.join(SRC, "shell.html"))
css = read(os.path.join(SRC, "engine.css"))
js = read(os.path.join(SRC, "engine.js"))
mods = sorted(glob.glob(os.path.join(a.slides_dir, "*.js")))
scripts = []
for p in [a.sections_file, a.plan_file] + mods:
    if not p or not os.path.exists(p):
        continue
    name = os.path.basename(p)
    body = inline_assets(read(p), name)
    scripts.append(f"<script>\n/* {name} */\ntry{{\n{body}\n}}catch(e){{console.error('slide module failed: {name}',e);(window.__modErr=window.__modErr||[]).push('{name}: '+e.message)}}\n</script>")
import json, time
build_info = json.dumps({"version": a.version, "time": time.strftime("%H:%M:%S"), "slides": len(mods)})
html = shell.replace("/*__BUILD_INFO__*/null", build_info).replace("/*__ENGINE_CSS__*/", css).replace("/*__ENGINE_JS__*/", js).replace("/*__SLIDE_SCRIPTS__*/", "\n".join(scripts))
if a.title:
    html = html.replace("<title>Connected Environment: from Weather Station to one data bank</title>", "<title>" + a.title + "</title>")
os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
open(a.out, "w", encoding="utf-8").write(html)
print(f"wrote {os.path.abspath(a.out)}  {len(html)//1024} KB  ({len(mods)} slide modules)")
