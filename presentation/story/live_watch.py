#!/usr/bin/env python3
"""live_watch.py: rebuilds connected-environment-story.html whenever anything under story/src changes, and writes live.json
(version, time, events, research progress) that the open page polls. Atomic writes: the browser never sees a half-written file.
Usage: python3 live_watch.py        (runs until killed)
"""
import glob, json, os, re, subprocess, sys, time
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
OUT = os.path.join(ROOT, "connected-environment-story.html")
LIVE = os.path.join(ROOT, "live.json")
SRC = os.path.join(HERE, "src")
RES = os.path.join(HERE, "research")

def snapshot():
    snap = {}
    for p in glob.glob(os.path.join(SRC, "**", "*"), recursive=True):
        if os.path.isfile(p):
            st = os.stat(p); snap[os.path.relpath(p, HERE)] = (st.st_mtime_ns, st.st_size)
    for p in glob.glob(os.path.join(RES, "*")):
        if os.path.isfile(p):
            st = os.stat(p); snap[os.path.relpath(p, HERE)] = (st.st_mtime_ns, st.st_size)
    return snap

def slide_id(path):
    try:
        m = re.search(r"id:\s*'([a-z0-9\-]+)'", open(path, encoding="utf-8").read())
        return m.group(1) if m else os.path.basename(path)
    except Exception:
        return os.path.basename(path)

def research_state():
    code = len(glob.glob(os.path.join(RES, "C*.md")))
    web = len(glob.glob(os.path.join(RES, "S*.json")))
    model = os.path.exists(os.path.join(RES, "relations-model.json"))
    return {"code": code, "web": web, "model": model}

def load_live():
    try:
        return json.load(open(LIVE))
    except Exception:
        return {"version": 0, "events": []}

def write_live(d):
    tmp = LIVE + ".tmp"; json.dump(d, open(tmp, "w"), indent=1); os.replace(tmp, LIVE)

def main():
    live = load_live(); prev = {}
    def event(text):
        live["events"].append({"t": time.strftime("%H:%M:%S"), "text": text}); live["events"] = live["events"][-40:]
    def build():
        tmp = OUT + ".tmp"; t0 = time.time()
        r = subprocess.run([sys.executable, os.path.join(HERE, "build_story.py"), "--out", tmp, "--version", str(live["version"] + 1)], capture_output=True, text=True)
        if r.returncode != 0:
            event("build failed: " + (r.stderr or r.stdout).strip().splitlines()[-1][:120]); write_live(live); return False
        os.replace(tmp, OUT); live["version"] += 1; live["time"] = time.strftime("%H:%M:%S"); live["build_ms"] = int((time.time() - t0) * 1000)
        return True
    first = True
    while True:
        snap = snapshot()
        if snap != prev:
            time.sleep(1.2)                      # wait until writers are quiet
            snap2 = snapshot()
            if snap2 != snap:
                continue
            added = [k for k in snap if k not in prev]; changed = [k for k in snap if k in prev and prev[k] != snap[k]]; removed = [k for k in prev if k not in snap]
            if not first:
                for k in added + changed:
                    kind = "built" if k in added else "updated"
                    if k.startswith("src/slides/"): event(f"slide {slide_id(os.path.join(HERE, k))} {kind}")
                    elif k.startswith("src/engine") or k.endswith("shell.html"): event("engine updated")
                    elif k.endswith("plan.js"): event("plan updated")
                    elif k.startswith("src/assets/"): event("asset " + os.path.basename(k) + " " + kind)
                    elif k.startswith("research/"): event("research: " + os.path.basename(k) + " " + ("written" if kind == "built" else "updated"))
                for k in removed: event("removed " + os.path.basename(k))
            else:
                event("live build started")
            first = False; prev = snap
            ok = build()
            live["modules"] = sorted(slide_id(p) for p in glob.glob(os.path.join(SRC, "slides", "*.js")))
            live["planned"] = len(re.findall(r"\{ id:", open(os.path.join(SRC, "plan.js")).read())) if os.path.exists(os.path.join(SRC, "plan.js")) else 0
            live["research"] = research_state(); write_live(live)
            print(time.strftime("%H:%M:%S"), "build", "ok" if ok else "FAILED", "v", live["version"], flush=True)
        else:
            rs = research_state()
            if rs != live.get("research"):
                live["research"] = rs; write_live(live)
        time.sleep(0.8)

if __name__ == "__main__":
    main()
