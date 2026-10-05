#!/usr/bin/env python3
"""vbuild: spec.json -> narrated product video (Hyperframes).

  python3 vbuild.py <video-dir> --check              validate the spec, print the estimated timeline (no audio, no render)
  python3 vbuild.py <video-dir> --dry [--render]     SILENT preview: estimated timings, silent audio (no TTS spend)
  python3 vbuild.py <video-dir> [--render]           real run: Gemini TTS (Aoede) per chunk, Whisper alignment, compose, lint, render
  python3 vbuild.py <video-dir> --preview-diagrams   write preview.html with every diagram stage visible

See SPEC.md for the spec format. Frames are 1920x988 PNGs; the video canvas is 1920x1080.
"""
import os, sys, json, re, subprocess, shutil, hashlib, html, time

K = "/Users/admin/wc/weather-station/release-kit/four-videos"
TTS = os.path.expanduser("~/.claude/skills/wstack/demoit/bin/gemini-tts")
TRANSCRIBE = os.path.expanduser("~/.claude/skills/wstack/make-video/bin/transcribe")
ORANGE = "#FF8300"
SCALE = 0.9
OX, OY = 96, 56
SW, SH = 1728, 889           # stage = 1920x988 frame * 0.9
WPS = 2.35                   # estimated words per second of Aoede narration
CHUNK_GAP = 0.5
LEAD = 0.2
TAIL = 1.4

BANNED_WORDS = ["delve", "crucial", "robust", "comprehensive", "nuanced", "multifaceted", "furthermore", "moreover",
                "additionally", "pivotal", "landscape", "tapestry", "underscore", "foster", "showcase", "intricate",
                "vibrant", "fundamental", "significant", "interplay"]
BANNED_PHRASES = ["here's the kicker", "here's the thing", "plot twist", "let me break this down", "the bottom line",
                  "make no mistake", "can't stress this enough"]
FORBIDDEN = [r"TAN-\d", r"\bAramco\b", r"Fadhili", r"Riyas", r"Jafurah", r"\bGIP\b", r"PKG1", r"\bv\d+\.\d+\.\d+",
             r"weather-station-agent", r"lightning\.simulate", r"LaunchDarkly", r"\bSUPRT-\d"]


def cs(x): return int(round(x * 100))
def fmt(c): return "%.2f" % (c / 100.0)
def esc(s): return html.escape(str(s), quote=True)
def words(t): return len(re.findall(r"[A-Za-z0-9']+", t))
def dur(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", path], capture_output=True, text=True)
    return float(r.stdout.strip())


# --------------------------------------------------------------------------- spec
def load_spec(vdir):
    spec = json.load(open(f"{vdir}/spec.json"))
    spec.setdefault("voice", "Aoede")
    spec.setdefault("model", "gemini-3.1-flash-tts-preview")
    spec.setdefault("capture_label", "LIVE CAPTURE · READ-ONLY")
    spec.setdefault("chapters", [])
    spec.setdefault("diagrams", {})
    return spec


def validate(spec, vdir):
    errs, warns = [], []
    ids = set()
    for i, b in enumerate(spec["beats"]):
        bid = b.get("id", f"#{i}")
        if bid in ids: errs.append(f"{bid}: duplicate id")
        ids.add(bid)
        kind = b.get("kind")
        if kind not in ("shot", "card", "tri", "diagram"): errs.append(f"{bid}: kind must be shot|card|tri|diagram")
        n = b.get("narration", "")
        if not n.strip(): errs.append(f"{bid}: narration is empty")
        text = " ".join([n, b.get("caption", ""), b.get("h1", ""), b.get("sub", ""), b.get("eyebrow", "")]
                        + list(b.get("lines", [])) + [c.get("l", "") for c in b.get("callouts", [])]
                        + [x.get("t", "") + " " + x.get("s", "") for x in b.get("items", [])] + b.get("labels", []))
        if "—" in text or "–" in text: errs.append(f"{bid}: contains an em/en dash (use commas or periods)")
        for w in BANNED_WORDS:
            if re.search(r"\b" + w + r"\b", text, re.I): errs.append(f"{bid}: banned word '{w}'")
        for p in BANNED_PHRASES:
            if p in text.lower(): errs.append(f"{bid}: banned phrase '{p}'")
        for pat in FORBIDDEN:
            if re.search(pat, text, re.I): errs.append(f"{bid}: forbidden string /{pat}/ in customer-facing text")
        if kind in ("shot", "tri") and not b.get("caption"): errs.append(f"{bid}: caption required")
        if b.get("caption") and words(b["caption"]) > 12: warns.append(f"{bid}: caption has {words(b['caption'])} words (max 12)")
        if kind == "shot":
            p = f"{vdir}/{b.get('img','')}"
            if not b.get("img") or not os.path.exists(p): errs.append(f"{bid}: image missing: {b.get('img')}")
            for c in b.get("callouts", []):
                r = c.get("r", [])
                if len(r) != 4 or r[0] < 0 or r[1] < 0 or r[0] + r[2] > 1921 or r[1] + r[3] > 989: errs.append(f"{bid}: callout rect out of frame {r}")
            if b.get("zoom") and len(b["zoom"].get("r", [])) != 4: errs.append(f"{bid}: zoom.r must be [x,y,w,h]")
        if kind == "tri":
            for im in b.get("imgs", []):
                if not os.path.exists(f"{vdir}/{im}"): errs.append(f"{bid}: image missing: {im}")
            if len(b.get("imgs", [])) not in (2, 3): errs.append(f"{bid}: tri needs 2 or 3 imgs")
        if kind == "card" and b.get("card") not in ("title", "lines", "list"): errs.append(f"{bid}: card must be title|lines|list")
        if kind == "diagram" and b.get("diagram") not in ("umbrella", "paths", "agent"): errs.append(f"{bid}: diagram must be umbrella|paths|agent")
        if kind == "diagram" and not isinstance(b.get("stage"), int): errs.append(f"{bid}: diagram needs an integer stage")
        ch = b.get("chapter", 0)
        if ch and ch > len(spec["chapters"]): errs.append(f"{bid}: chapter {ch} not defined")
        if words(n) > 60: warns.append(f"{bid}: narration {words(n)} words (a beat is usually 15-45 words)")
    def flat(x):
        if isinstance(x, str): return [x]
        if isinstance(x, dict): return [t for v in x.values() for t in flat(v)]
        if isinstance(x, list): return [t for v in x for t in flat(v)]
        return []
    dtext = " ".join(flat(spec.get("diagrams", {})))
    if "—" in dtext or "–" in dtext: errs.append("diagrams: contains an em/en dash")
    for w in BANNED_WORDS:
        if re.search(r"\b" + w + r"\b", dtext, re.I): errs.append(f"diagrams: banned word '{w}'")
    for pat in FORBIDDEN:
        if re.search(pat, dtext, re.I): errs.append(f"diagrams: forbidden string /{pat}/")
    need = {"umbrella": ["tagline", "products", "platform", "devices", "paths", "team", "agent"],
            "paths": ["lanes", "sink", "title"],
            "agent": ["title", "knows", "platform", "platform_sub", "agent", "guard", "badge"]}
    used = {b.get("diagram") for b in spec["beats"] if b.get("kind") == "diagram"}
    for name in sorted(x for x in used if x in need):
        given = spec.get("diagrams", {}).get(name, {})
        miss = [k for k in need[name] if k not in given]
        if miss: errs.append(f"diagrams.{name}: define {miss} explicitly (defaults are not claims you verified)")
    total_words = sum(words(b.get("narration", "")) for b in spec["beats"])
    est = total_words / WPS + CHUNK_GAP * 3 + TAIL
    return errs, warns, total_words, est


# --------------------------------------------------------------------------- audio
def make_chunks(spec):
    chunks, cur, cw = [], [], 0
    for i, b in enumerate(spec["beats"]):
        w = words(b["narration"])
        brk = cur and (cw + w > 150 or (cw >= 105))
        if brk:
            chunks.append(cur); cur, cw = [], 0
        cur.append(i); cw += w
    if cur: chunks.append(cur)
    return chunks


def run_tts(cid, text, vdir, spec):
    out, txtp, shaf = f"{vdir}/narr/{cid}.m4a", f"{vdir}/narr/{cid}.txt", f"{vdir}/narr/{cid}.sha"
    sig = hashlib.sha1((text + spec["voice"] + spec["model"]).encode()).hexdigest()
    if os.path.exists(out) and os.path.exists(shaf) and open(shaf).read() == sig:
        return
    open(txtp, "w").write(text + "\n")
    last = ""
    for attempt in range(6):
        r = subprocess.run([TTS, "--text-file", txtp, "--output", out, "--voice", spec["voice"], "--model", spec["model"]], capture_output=True, text=True)
        if r.returncode == 0 and os.path.exists(out):
            open(shaf, "w").write(sig); return
        last = (r.stdout + r.stderr)[-400:]
        time.sleep(12 + 10 * attempt)
    raise SystemExit(f"TTS failed for {cid}: {last}")


def run_whisper(cid, vdir):
    out, m4a = f"{vdir}/narr/{cid}-timed.json", f"{vdir}/narr/{cid}.m4a"
    if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(m4a): return
    subprocess.run([TRANSCRIBE, m4a, f"{vdir}/narr/{cid}-timed", "--language", "en"], capture_output=True, check=True)


DIGITS = {"1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine", "for": "four", "to": "two", "too": "two"}
def norm(w):
    w = re.sub(r"[^a-z0-9]", "", w.lower())
    return DIGITS.get(w, w)


def align_chunk(cid, beats, vdir):
    d = json.load(open(f"{vdir}/narr/{cid}-timed.json"))
    ws = []
    for seg in d["transcription"]:
        for tk in seg["tokens"]:
            tx = tk["text"]
            if tx.startswith("[_"): continue
            if tx.startswith(" ") or not ws: ws.append([tk["offsets"]["from"] / 1000.0, norm(tx)])
            else: ws[-1][1] += norm(tx)
    ns = "".join(w[1] for w in ws)
    cum, c = [], 0
    for w in ws: cum.append(c); c += len(w[1])
    out, cur, lost = {}, 0, []
    for b in beats:
        toks = b["narration"].split()
        found = None
        for k in range(0, 4):      # Whisper may mis-hear a brand name in the first words (WakeCap -> WayCap): try the next windows
            kk = "".join(norm(x) for x in toks[k:k + 4])
            if len(kk) < 6: continue
            idx = ns.find(kk[:14], cur)
            if idx < 0: idx = ns.find(kk[:8], cur)
            if idx >= 0: found = (idx, k, kk); break
        if not found: lost.append(b["id"]); out[b["id"]] = None; continue
        idx, k, kk = found
        wi = max(i for i, cc in enumerate(cum) if cc <= idx)
        wi = max(0, wi - k)
        out[b["id"]] = max(0.0, ws[wi][0] - LEAD)
        cur = idx + len(kk[:8])
    return out, lost


def build_timeline(spec, vdir, dry):
    """returns (starts_cs per beat id, total_cs, audio_path)"""
    os.makedirs(f"{vdir}/narr", exist_ok=True)
    chunks = make_chunks(spec)
    starts, off = {}, 0.0
    lst = []
    sil = f"{vdir}/narr/sil.wav"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", str(CHUNK_GAP), "-c:a", "pcm_s16le", sil], check=True)
    for ci, idxs in enumerate(chunks):
        cid = f"c{ci+1}"
        beats = [spec["beats"][i] for i in idxs]
        text = "\n\n".join(b["narration"] for b in beats)
        wav = f"{vdir}/narr/{cid}.wav"
        if dry:
            tot = sum(words(b["narration"]) for b in beats) / WPS + 0.6
            acc = 0.0
            for b in beats:
                starts[b["id"]] = off + acc
                acc += words(b["narration"]) / WPS + 0.1
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", "%.2f" % tot, "-c:a", "pcm_s16le", wav], check=True)
            cd = tot
        else:
            run_tts(cid, text, vdir, spec)
            run_whisper(cid, vdir)
            al, lost = align_chunk(cid, beats, vdir)
            cd = dur(f"{vdir}/narr/{cid}.m4a")
            if lost: print(f"  ! could not align {lost} in {cid}; using word-count split", file=sys.stderr)
            tw = sum(words(b["narration"]) for b in beats) or 1
            acc = 0.0
            for b in beats:
                t = al.get(b["id"])
                starts[b["id"]] = off + (t if t is not None else cd * acc / tw)
                acc += words(b["narration"])
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{vdir}/narr/{cid}.m4a", "-ar", "24000", "-ac", "1", "-c:a", "pcm_s16le", wav], check=True)
        lst.append(f"file '{wav}'")
        if ci < len(chunks) - 1: lst.append(f"file '{sil}'")
        off += cd + CHUNK_GAP
    first = spec["beats"][0]["id"]
    starts[first] = 0.0
    total = off - CHUNK_GAP + TAIL
    open(f"{vdir}/narr/list.txt", "w").write("\n".join(lst) + "\n")
    os.makedirs(f"{vdir}/project", exist_ok=True)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", f"{vdir}/narr/list.txt", "-af", "apad=pad_dur=%.2f" % (TAIL + 0.5), "-c:a", "aac", "-b:a", "128k", f"{vdir}/project/narration.m4a"], check=True)
    return {k: cs(v) for k, v in starts.items()}, cs(total)


# --------------------------------------------------------------------------- html pieces
CSS = """
:root{--o:%(o)s}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1920px;height:1080px;overflow:hidden;background:#000;color:#fff;font-family:"Inter",-apple-system,system-ui,sans-serif}
.clip{position:absolute;inset:0;opacity:0}
.grid{background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:40px 40px}
.card{display:flex;flex-direction:column;justify-content:center;padding:0 150px;background-color:#000}
.eyebrow{align-self:flex-start;font-size:22px;letter-spacing:.24em;text-transform:uppercase;color:var(--o);border:2px solid var(--o);padding:8px 18px;margin-bottom:36px;font-weight:600}
.card h1{font-size:112px;line-height:1.03;font-weight:800;letter-spacing:-.025em;max-width:1560px}
.card h1 em,.ln em{font-style:normal;color:var(--o)}
.card .sub{margin-top:36px;font-size:40px;line-height:1.38;color:rgba(255,255,255,.76);max-width:1320px}
.card .rule{margin-top:44px;height:6px;width:0;background:var(--o)}
.lines{display:flex;flex-direction:column;gap:22px}
.ln{font-size:92px;line-height:1.05;font-weight:800;letter-spacing:-.02em;opacity:0}
.items{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:56px}
.items.two{grid-template-columns:repeat(2,1fr)}
.it{position:relative;background:#0c0c0c;border:1px solid #2b2b2b;padding:34px 34px 34px 42px;clip-path:polygon(0 0,calc(100%% - 22px) 0,100%% 22px,100%% 100%%,0 100%%);opacity:0}
.it::before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px;background:var(--o)}
.it b{display:block;font-size:40px;font-weight:700;margin-bottom:12px}
.it span{font-size:28px;line-height:1.4;color:rgba(255,255,255,.72)}
.top{position:absolute;left:0;right:0;top:0;height:56px;background:#000;border-bottom:2px solid var(--o);display:flex;align-items:center;justify-content:space-between;padding:0 96px}
.top .ch{font-size:24px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.top .ch b{color:var(--o);margin-right:14px}
.top .path{font-size:22px;color:rgba(255,255,255,.78)}
.top .path i{font-style:normal;color:var(--o);margin-right:10px;letter-spacing:.14em;font-size:18px;font-weight:700}
.stage{position:absolute;left:%(ox)dpx;top:%(oy)dpx;width:%(sw)dpx;height:%(sh)dpx;overflow:hidden;border:1px solid #2b2b2b;background:#fff}
.zw{position:absolute;left:0;top:0;width:%(sw)dpx;height:%(sh)dpx;transform-origin:0 0}
.zw img{width:%(sw)dpx;height:%(sh)dpx;display:block}
.co{position:absolute;border:5px solid var(--o);opacity:0}
.co.spot{box-shadow:0 0 0 2600px rgba(0,0,0,.42)}
.lab{position:absolute;opacity:0;transform-origin:0 0;display:flex;align-items:center;gap:12px;background:#000;color:#fff;font-size:26px;font-weight:700;padding:6px 16px 6px 6px;border-left:6px solid var(--o);white-space:nowrap}
.lab .n{background:var(--o);color:#000;min-width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800}
.cur{position:absolute;left:0;top:0;width:44px;height:44px;opacity:0;z-index:5}
.rip{position:absolute;width:70px;height:70px;border:4px solid var(--o);border-radius:50%%;opacity:0;margin:-35px 0 0 -35px}
.cap{position:absolute;left:%(ox)dpx;right:%(ox)dpx;top:962px;height:72px;display:flex;align-items:center;gap:18px;padding-left:22px;border-left:6px solid var(--o);font-size:38px;font-weight:600;opacity:0}
.cap .bd{font-size:20px;font-weight:800;letter-spacing:.14em;color:#000;background:var(--o);padding:6px 14px;white-space:nowrap}
.live{position:absolute;right:%(ox)dpx;top:968px;font-size:18px;font-weight:700;letter-spacing:.14em;color:rgba(255,255,255,.7);display:flex;align-items:center;gap:10px}
.live::before{content:"";width:12px;height:12px;border-radius:50%%;background:#ff3b30}
.pips{position:absolute;left:%(ox)dpx;right:%(ox)dpx;top:1056px;height:8px;display:flex;gap:10px}
.pip{flex:1;background:#2b2b2b}.pip.done{background:rgba(255,131,0,.45)}.pip.on{background:var(--o)}
.tri{position:absolute;left:%(ox)dpx;top:96px;width:%(sw)dpx;display:grid;gap:26px}
.tri.n3{grid-template-columns:repeat(3,1fr)}.tri.n2{grid-template-columns:repeat(2,1fr)}
.tri .pn{position:relative;opacity:0}
.tri .pn .im{width:100%%;background-repeat:no-repeat;border:1px solid #2b2b2b;background-color:#fff}
.tri .pn .tt{margin-top:18px;font-size:34px;font-weight:800;border-left:6px solid var(--o);padding-left:16px}
.ribbon{position:absolute;right:96px;top:70px;font-size:22px;font-weight:800;letter-spacing:.16em;color:#000;background:var(--o);padding:10px 22px}
/* diagrams */
.dg{position:absolute;inset:0}
.st{position:absolute;opacity:0}
.dgx{position:absolute;left:96px;top:56px;font-size:22px;font-weight:700;letter-spacing:.2em;color:var(--o)}
.pcard{background:#0c0c0c;border:2px solid #2b2b2b;padding:20px 22px;clip-path:polygon(0 0,calc(100%% - 18px) 0,100%% 18px,100%% 100%%,0 100%%)}
.pcard b{display:block;font-size:32px;font-weight:800}
.pcard span{display:block;margin-top:6px;font-size:22px;color:rgba(255,255,255,.7);line-height:1.3}
.pcard.o{border-color:var(--o)}
.chip{display:inline-block;border:2px solid var(--o);color:#fff;font-size:22px;font-weight:700;padding:8px 16px;margin:0 8px 8px 0;background:#000}
.bar{background:#0c0c0c;border:2px solid var(--o)}
.bar .bt{font-size:24px;font-weight:800;letter-spacing:.2em;color:var(--o);padding:12px 22px 0}
.dline{position:absolute;background:var(--o);transform-origin:50%% 0}
.dash{border:3px dashed var(--o);background:#0c0c0c}
.pill{position:absolute;background:var(--o);color:#000;font-size:20px;font-weight:800;letter-spacing:.08em;padding:6px 14px;white-space:nowrap}
.arrow{position:absolute;color:var(--o);font-size:44px;font-weight:800}
.lane{position:absolute;left:96px;right:96px;height:190px}
.lane .dev{position:absolute;left:0;top:0;width:330px;height:190px}
.lane .stp{position:absolute;top:30px;height:130px;width:215px;background:#0c0c0c;border:2px solid #2b2b2b;padding:18px 16px;font-size:23px;font-weight:700;line-height:1.25}
.lane .stp small{display:block;margin-top:8px;font-size:18px;font-weight:500;color:rgba(255,255,255,.62)}
.lane .bdg{position:absolute;left:0;top:-30px}
"""


def css(spec):
    return CSS % {"o": spec.get("brand", ORANGE), "ox": OX, "oy": OY, "sw": SW, "sh": SH}


class TL:
    def __init__(self): self.l = []
    def add(self, s): self.l.append(s)
    def to(self, sel, props, t, d=0.4, ease=None):
        e = f',ease:"{ease}"' if ease else ""
        self.l.append(f'tl.to("{sel}",{{{props},duration:{d}{e}}},{t});')
    def set(self, sel, props, t): self.l.append(f'tl.set("{sel}",{{{props}}},{t});')
    def fromto(self, sel, a, b, t, d=0.4, ease=None):
        e = f',ease:"{ease}"' if ease else ""
        self.l.append(f'tl.fromTo("{sel}",{{{a}}},{{{b},duration:{d}{e}}},{t});')
    def js(self): return "\n".join(self.l)


def pips(cur, n):
    return "".join('<span class="%s"></span>' % ("pip on" if i == cur else "pip done" if i < cur else "pip") for i in range(1, n + 1))


def camera(zoom):
    if not zoom: return (0.0, 0.0, 1.0)
    x, y, w, h = zoom["r"]
    s = zoom.get("s") or max(1.15, min(1.9, 0.82 * SW / (w * SCALE), 0.82 * SH / (h * SCALE)))
    cx, cy = (x + w / 2) * SCALE, (y + h / 2) * SCALE
    tx, ty = SW / 2 - s * cx, SH / 2 - s * cy
    tx = min(0, max(SW - s * SW, tx)); ty = min(0, max(SH - s * SH, ty))
    return (round(tx, 1), round(ty, 1), round(s, 3))


def label_xy(r, label, pos):
    x, y, w, h = r
    X, Y, W, H = round(x * SCALE, 1), round(y * SCALE, 1), round(w * SCALE, 1), round(h * SCALE, 1)
    lw = 34 + 24 + len(label) * 15 + 20
    if pos == "r": lx, ly = X + W + 10, Y + H / 2 - 21
    elif pos == "l": lx, ly = X - lw - 10, Y + H / 2 - 21
    elif pos == "inr": lx, ly = X + W - lw - 70, Y + H / 2 - 21
    elif pos == "b" or Y - 50 < 4: lx, ly = X, Y + H + 8
    else: lx, ly = X, Y - 46
    lx = max(4, min(lx, SW - lw - 4)); ly = max(4, min(ly, SH - 50))
    return round(lx, 1), round(ly, 1), (X, Y, W, H)


# ---- scenes
def scene_shot(group, spec, tl, sid, t0, t1, chapters):
    b0 = group[0][1]
    ch = b0.get("chapter", 0)
    chn = chapters[ch - 1] if ch else {"name": "", "path": ""}
    h = [f'<div id="{sid}" class="clip" data-start="{fmt(t0)}" data-duration="{fmt(t1 - t0)}" data-track-index="1">']
    if ch:
        h.append(f'<div class="top"><div class="ch"><b>{ch:02d}</b>{esc(chn.get("name",""))}</div><div class="path"><i>OPEN</i>{esc(chn.get("path",""))}</div></div>')
    h.append(f'<div class="stage"><div class="zw" id="{sid}_zw"><img src="{esc(b0["img"])}" alt="">')
    body = []
    for bi, (start, b) in enumerate(group):
        s_cs = start
        e_cs = group[bi + 1][0] if bi + 1 < len(group) else t1
        bid = f"{sid}_b{bi}"
        tx, ty, s = camera(b.get("zoom"))
        ts = s_cs / 100.0
        te = e_cs / 100.0
        tl.to(f"#{sid}_zw", f"x:{tx},y:{ty},scale:{s}", fmt(s_cs + 25), 1.0, "power2.inOut")
        cos = b.get("callouts", [])
        spot = len(cos) == 1 and not b.get("nospot")
        for ci, c in enumerate(cos):
            pos = c.get("pos", "a")
            lx, ly, (X, Y, W, H) = label_xy(c["r"], c.get("l", ""), pos)
            cid = f"{bid}_c{ci}"
            body.append(f'<div class="co{" spot" if spot else ""}" id="{cid}" style="left:{X}px;top:{Y}px;width:{W}px;height:{H}px"></div>')
            body.append(f'<div class="lab" id="{cid}_l" style="left:{lx}px;top:{ly}px"><span class="n">{ci+1}</span>{esc(c.get("l",""))}</div>')
            d0 = s_cs + 60 + ci * 80
            tl.set(f"#{cid}", "opacity:0", fmt(t0)); tl.set(f"#{cid}_l", "opacity:0", fmt(t0))
            tl.set(f"#{cid}_l", f"scale:{round(1/s,3)}", fmt(s_cs))
            tl.fromto(f"#{cid}", "opacity:0,scale:1.04,transformOrigin:'50% 50%'", "opacity:1,scale:1", fmt(d0), 0.35, "power2.out")
            tl.to(f"#{cid}_l", "opacity:1", fmt(d0 + 8), 0.3)
            tl.to(f"#{cid}", "opacity:0", fmt(e_cs - 25), 0.2)
            tl.to(f"#{cid}_l", "opacity:0", fmt(e_cs - 25), 0.2)
            if c.get("click"):
                cx, cy = (c["r"][0] + c["r"][2] / 2) * SCALE, (c["r"][1] + c["r"][3] / 2) * SCALE
                cu = f"{cid}_cur"; rp = f"{cid}_rip"
                body.append(f'<svg class="cur" id="{cu}" viewBox="0 0 24 24"><path d="M3 2l7 19 3-8 8-3z" fill="#fff" stroke="#000" stroke-width="1.5"/></svg><div class="rip" id="{rp}" style="left:{cx}px;top:{cy}px"></div>')
                tl.set(f"#{cu}", f"x:{cx+300},y:{cy+260},opacity:0", fmt(t0))
                tl.to(f"#{cu}", f"x:{cx},y:{cy},opacity:1", fmt(d0 - 30), 0.7, "power2.inOut")
                tl.fromto(f"#{rp}", "opacity:1,scale:.3", "opacity:0,scale:1.6", fmt(d0 + 55), 0.5, "power1.out")
                tl.to(f"#{cu}", "opacity:0", fmt(e_cs - 40), 0.2)
    h.extend(body)
    h.append("</div></div>")
    n = len(chapters)
    for bi, (start, b) in enumerate(group):
        e_cs = group[bi + 1][0] if bi + 1 < len(group) else t1
        cid = f"{sid}_cap{bi}"
        bd = f'<span class="bd">{esc(b["badge"])}</span>' if b.get("badge") else ""
        h.append(f'<div class="cap" id="{cid}">{bd}<span>{esc(b.get("caption",""))}</span></div>')
        tl.set(f"#{cid}", "opacity:0", fmt(t0))
        tl.to(f"#{cid}", "opacity:1", fmt(start + 10), 0.3)
        tl.to(f"#{cid}", "opacity:0", fmt(e_cs - 25), 0.2)
    h.append(f'<div class="live">{esc(spec["capture_label"])}</div>')
    if ch and n: h.append(f'<div class="pips">{pips(ch, n)}</div>')
    h.append("</div>")
    tl.to(f"#{sid}", "opacity:1", fmt(t0), 0.3)
    tl.to(f"#{sid}", "opacity:0", fmt(t1 - 25), 0.25)
    return "\n".join(h)


def scene_card(beat, spec, tl, sid, t0, t1):
    k = beat["card"]
    dsec = (t1 - t0) / 100.0
    h = [f'<div id="{sid}" class="clip card grid" data-start="{fmt(t0)}" data-duration="{fmt(t1 - t0)}" data-track-index="1">']
    ts = t0 / 100.0
    if beat.get("eyebrow"): h.append(f'<span class="eyebrow" id="{sid}_e">{esc(beat["eyebrow"])}</span>'); tl.fromto(f"#{sid}_e", "opacity:0,y:20", "opacity:1,y:0", fmt(t0 + 15), 0.5, "power2.out")
    if k == "title":
        h.append(f'<h1 id="{sid}_h">{beat.get("h1","")}</h1>')
        tl.fromto(f"#{sid}_h", "opacity:0,y:50", "opacity:1,y:0", fmt(t0 + 35), 0.8, "power3.out")
        if beat.get("sub"):
            h.append(f'<p class="sub" id="{sid}_s">{beat["sub"]}</p>')
            tl.fromto(f"#{sid}_s", "opacity:0,y:24", "opacity:1,y:0", fmt(t0 + 95), 0.7, "power2.out")
        h.append(f'<div class="rule" id="{sid}_r"></div>')
        tl.to(f"#{sid}_r", "width:260", fmt(t0 + 60), 0.9, "power2.out")
    elif k == "lines":
        lines = beat.get("lines", [])
        h.append('<div class="lines">' + "".join(f'<div class="ln" id="{sid}_l{i}">{ln}</div>' for i, ln in enumerate(lines)) + "</div>")
        n = len(lines)
        step = max(0.7, (dsec - 1.6) / max(1, n))
        for i in range(n):
            tt = int(t0 + 60 + i * step * 100)
            tl.fromto(f"#{sid}_l{i}", "opacity:0,y:36", "opacity:1,y:0", fmt(tt), 0.6, "power3.out")
            if i > 0: tl.to(f"#{sid}_l{i-1}", "opacity:0.3", fmt(tt), 0.5)
    elif k == "list":
        if beat.get("h1"): h.append(f'<h1 id="{sid}_h" style="font-size:80px">{beat["h1"]}</h1>'); tl.fromto(f"#{sid}_h", "opacity:0,y:40", "opacity:1,y:0", fmt(t0 + 30), 0.7, "power3.out")
        items = beat.get("items", [])
        h.append(f'<div class="items{" two" if len(items)==2 or len(items)==4 else ""}">' + "".join(f'<div class="it" id="{sid}_i{i}"><b>{esc(it.get("t",""))}</b><span>{esc(it.get("s",""))}</span></div>' for i, it in enumerate(items)) + "</div>")
        step = max(0.6, (dsec - 2.2) / max(1, len(items)))
        for i in range(len(items)):
            tt = int(t0 + 110 + i * step * 100)
            tl.fromto(f"#{sid}_i{i}", "opacity:0,y:34", "opacity:1,y:0", fmt(tt), 0.6, "power2.out")
    h.append("</div>")
    tl.to(f"#{sid}", "opacity:1", fmt(t0), 0.35)
    tl.to(f"#{sid}", "opacity:0", fmt(t1 - 25), 0.25)
    return "\n".join(h)


def scene_tri(beat, spec, tl, sid, t0, t1, chapters):
    imgs, labels, crops = beat["imgs"], beat.get("labels", []), beat.get("crops", [])
    n = len(imgs)
    colw = (SW - 26 * (n - 1)) / n
    ch = beat.get("chapter", 0)
    h = [f'<div id="{sid}" class="clip" data-start="{fmt(t0)}" data-duration="{fmt(t1 - t0)}" data-track-index="1">']
    if ch:
        chn = chapters[ch - 1]
        h.append(f'<div class="top"><div class="ch"><b>{ch:02d}</b>{esc(chn.get("name",""))}</div><div class="path">{esc(chn.get("path",""))}</div></div>')
    h.append(f'<div class="tri n{n}">')
    for i, im in enumerate(imgs):
        r = crops[i] if i < len(crops) and crops[i] else [0, 0, 1920, 988]
        x, y, w, hh = r
        s = colw / w
        bw, bh = int(1920 * s), int(988 * s)
        ph = int(hh * s)
        h.append(f'<div class="pn" id="{sid}_p{i}"><div class="im" style="height:{ph}px;background-image:url({esc(im)});background-size:{bw}px {bh}px;background-position:{int(-x*s)}px {int(-y*s)}px"></div><div class="tt">{esc(labels[i] if i < len(labels) else "")}</div></div>')
    h.append("</div>")
    cid = f"{sid}_cap"
    bd = f'<span class="bd">{esc(beat["badge"])}</span>' if beat.get("badge") else ""
    h.append(f'<div class="cap" id="{cid}">{bd}<span>{esc(beat.get("caption",""))}</span></div>')
    h.append(f'<div class="live">{esc(spec["capture_label"])}</div>')
    if ch and chapters: h.append(f'<div class="pips">{pips(ch, len(chapters))}</div>')
    h.append("</div>")
    dsec = (t1 - t0) / 100.0
    step = max(0.5, (dsec - 2.0) / max(1, n))
    for i in range(n):
        tt = int(t0 + 40 + i * step * 100)
        tl.fromto(f"#{sid}_p{i}", "opacity:0,y:40", "opacity:1,y:0", fmt(tt), 0.7, "power2.out")
    tl.set(f"#{cid}", "opacity:0", fmt(t0)); tl.to(f"#{cid}", "opacity:1", fmt(t0 + 10), 0.3)
    tl.to(f"#{sid}", "opacity:1", fmt(t0), 0.3)
    tl.to(f"#{sid}", "opacity:0", fmt(t1 - 25), 0.25)
    return "\n".join(h)


# ---- diagrams: every element carries a stage; the scene reveals stage k at the start of the beat whose stage is k
class Dg:
    def __init__(self): self.els = []   # (stage, id, html, anim)
    def add(self, stage, eid, htmlfrag, anim="up"): self.els.append((stage, eid, htmlfrag, anim))


ICONS = {
    "sun": '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#FF8300" stroke-width="4"><circle cx="32" cy="32" r="11"/><path d="M32 6v9M32 49v9M6 32h9M49 32h9M13 13l6 6M45 45l6 6M13 51l6-6M45 19l6-6"/></svg>',
    "bolt": '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#FF8300" stroke-width="4" stroke-linejoin="round"><path d="M36 4L14 36h16l-4 24 24-34H34z"/></svg>',
    "gas": '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#FF8300" stroke-width="4" stroke-linecap="round"><path d="M32 6c8 12 14 18 14 28a14 14 0 0 1-28 0c0-6 4-9 6-14 3 4 4 6 8 8-1-8-2-14 0-22z"/></svg>',
    "station": '<svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"><path d="M32 10v44M20 54h24M32 18h14M32 28h10M32 38h14"/><circle cx="32" cy="10" r="4"/></svg>',
    "sensor": '<svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="30" width="36" height="24" rx="2"/><path d="M32 30V12M22 18c6-8 14-8 20 0M26 24c4-4 8-4 12 0"/></svg>',
    "detector": '<svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"><rect x="18" y="8" width="28" height="48" rx="6"/><circle cx="32" cy="24" r="6"/><path d="M24 38h16M24 46h16"/></svg>',
    "team": '<svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="#FF8300" stroke-width="4" stroke-linecap="round"><circle cx="32" cy="20" r="9"/><path d="M12 56c2-14 10-20 20-20s18 6 20 20"/></svg>',
    "agent": '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#FF8300" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="18" width="40" height="30" rx="6"/><circle cx="24" cy="33" r="4"/><circle cx="40" cy="33" r="4"/><path d="M32 18V8M26 8h12M20 48v8M44 48v8"/></svg>',
}


def umbrella(spec):
    d = {
        "tagline": "everything environmental on site, in one place",
        "products": [{"t": "Weather Station", "s": "Heat and site conditions", "icon": "sun"}, {"t": "Lightning", "s": "Status and alarm history", "icon": "bolt"}, {"t": "Gas", "s": "Detectors and alerts", "icon": "gas"}],
        "platform": {"t": "ONE PLATFORM", "chips": ["One backend", "One portal menu", "Same view permission", "Switch per project"]},
        "devices": [{"t": "Weather stations", "icon": "station"}, {"t": "Lightning sensors", "icon": "sensor"}, {"t": "Gas detectors", "icon": "detector"}],
        "paths": ["Mesh gateway", "Mesh gateway", "Vendor cloud"],
        "team": {"t": "Your site team", "verbs": ["Watch", "Decide", "Control"]},
        "agent": {"t": "Future AI agent", "lines": ["Reads weather data", "Proposes changes", "People approve"], "badge": "DIRECTION · NOT LIVE TODAY"},
    }
    d.update(spec.get("diagrams", {}).get("umbrella", {}))
    g = Dg()
    g.add(0, "u_x", f'<div class="dgx" style="top:56px">CONNECTED ENVIRONMENT · THE UMBRELLA</div>', "none")
    canopy = ('<svg width="1200" height="340" viewBox="0 0 1200 340"><path d="M0 300C0 130 250 8 600 8S1200 130 1200 300Q1100 362 1000 300Q900 362 800 300Q700 362 600 300Q500 362 400 300Q300 362 200 300Q100 362 0 300Z" fill="%s"/>'
              '<g stroke="rgba(0,0,0,.28)" stroke-width="4" fill="none"><path d="M600 8Q420 140 400 300"/><path d="M600 8Q240 140 200 300"/><path d="M600 8Q780 140 800 300"/><path d="M600 8Q960 140 1000 300"/><path d="M600 8V300"/></g>'
              '<circle cx="600" cy="8" r="12" fill="#fff"/></svg>') % ORANGE
    g.add(1, "u_can", f'<div style="left:360px;top:60px;position:absolute">{canopy}<div style="position:absolute;left:0;width:1200px;top:150px;text-align:center;color:#000"><div style="font-size:60px;font-weight:800;letter-spacing:-.01em">{esc(spec.get("title","Connected Environment"))}</div><div style="font-size:28px;font-weight:600;margin-top:6px">{esc(d["tagline"])}</div></div></div>', "drop")
    xs = [440, 790, 1140]
    for i, p in enumerate(d["products"][:3]):
        g.add(2, f"u_p{i}", f'<div class="pcard o" style="left:{xs[i]}px;top:406px;width:340px;height:222px;position:absolute"><div style="margin-bottom:10px">{ICONS.get(p.get("icon","sun"),"")}</div><b>{esc(p["t"])}</b><span>{esc(p["s"])}</span></div>')
    chips = "".join(f'<span class="chip">{esc(c)}</span>' for c in d["platform"]["chips"])
    g.add(3, "u_plat", f'<div class="bar" style="left:360px;top:650px;width:1200px;height:112px;position:absolute"><div class="bt">{esc(d["platform"]["t"])}</div><div style="padding:10px 22px 0">{chips}</div></div>')
    for i in range(3):
        g.add(4, f"u_ln{i}", f'<div class="dline" style="left:{xs[i]+168}px;top:762px;width:4px;height:78px"></div>', "draw")
    for i, dv in enumerate(d["devices"][:3]):
        g.add(4, f"u_dv{i}", f'<div class="pcard" style="left:{xs[i]}px;top:844px;width:340px;height:104px;position:absolute;display:flex;align-items:center;gap:16px">{ICONS.get(dv.get("icon","station"),"")}<b style="font-size:28px">{esc(dv["t"])}</b></div>')
    for i, pt in enumerate(d["paths"][:3]):
        g.add(5, f"u_pt{i}", f'<div class="pill" style="left:{xs[i]+176+14}px;top:782px">{esc(pt)}</div>', "fade")
    tm = d["team"]
    verbs = "".join(f'<div style="font-size:30px;font-weight:800;margin-top:10px">{esc(v)}</div>' for v in tm["verbs"])
    g.add(6, "u_team", f'<div class="pcard" style="left:60px;top:406px;width:260px;height:310px;position:absolute"><div style="margin-bottom:8px">{ICONS["team"]}</div><b style="font-size:28px">{esc(tm["t"])}</b>{verbs}</div>')
    g.add(6, "u_tl", f'<div class="dline" style="left:320px;top:520px;width:120px;height:4px"></div>', "fade")
    ag = d["agent"]
    al = "".join(f'<div style="font-size:24px;font-weight:600;margin-top:8px;color:rgba(255,255,255,.86)">{esc(x)}</div>' for x in ag["lines"])
    g.add(7, "u_ag", f'<div class="dash" style="left:1610px;top:190px;width:270px;height:300px;position:absolute;padding:22px 20px"><div style="margin-bottom:8px">{ICONS["agent"]}</div><b style="font-size:30px">{esc(ag["t"])}</b>{al}</div>')
    g.add(7, "u_al", f'<div style="position:absolute;left:1560px;top:490px;width:4px;height:160px;border-left:4px dashed {ORANGE}"></div>', "fade")
    g.add(7, "u_rb", f'<div class="ribbon" style="top:120px;right:40px;position:absolute;font-size:18px">{esc(ag["badge"])}</div>', "none")
    return g


def paths(spec):
    d = {"lanes": [
        {"badge": "MESH GATEWAY", "product": "Weather Station", "device": "Weather stations", "icon": "station", "steps": [["Mesh gateway", "radio network on site"], ["Cloud IoT", "messages in"], ["Ingestion", "decode and store"], ["Weather Station", "readings + status"]]},
        {"badge": "MESH GATEWAY", "product": "Lightning", "device": "Lightning sensors", "icon": "sensor", "steps": [["Mesh gateway", "radio network on site"], ["Cloud queue", "messages in"], ["Backend", "state + history"], ["Lightning", "status + alarms"]]},
        {"badge": "VENDOR CLOUD", "product": "Gas", "device": "Gas detectors", "icon": "detector", "steps": [["Vendor cloud", "a black box to us"], ["WakeCap polls", "about every minute"], ["Alerts + readings", "stored in WakeCap"], ["Gas", "readings + alerts"]]},
    ], "sink": {"t": "ONE PLATFORM", "s": "readings reach the same portal"}, "title": "MANY DEVICES, MANY WAYS IN"}
    d.update(spec.get("diagrams", {}).get("paths", {}))
    g = Dg()
    g.add(0, "p_x", f'<div class="dgx">{esc(d["title"])}</div>', "none")
    nl = len(d["lanes"][:3])
    ys = [440] if nl == 1 else [300, 580] if nl == 2 else [190, 440, 690]
    for i, ln in enumerate(d["lanes"][:3]):
        y = ys[i]
        steps = ln["steps"][:4]
        frag = [f'<div class="lane" style="top:{y}px">']
        frag.append(f'<div class="pill bdg">{esc(ln["badge"])}</div>')
        frag.append(f'<div class="pcard o dev" style="display:flex;flex-direction:column;justify-content:center"><div style="margin-bottom:6px">{ICONS.get(ln.get("icon","station"),"")}</div><b style="font-size:28px">{esc(ln["device"])}</b></div>')
        x0 = 380
        for j, (a, b) in enumerate(steps):
            x = x0 + j * 262
            frag.append(f'<div class="stp" style="left:{x}px">{esc(a)}<small>{esc(b)}</small></div>')
            frag.append(f'<div class="arrow" style="left:{x+219}px;top:62px">›</div>')
        frag.append("</div>")
        g.add(i + 1, f"p_l{i}", "".join(frag))
    sk = d["sink"]
    top = {1: 330, 2: 250, 3: 190}[nl]; hh = {1: 230, 2: 480, 3: 690}[nl]
    g.add(nl + 1, "p_sink", f'<div class="bar" style="left:1500px;top:{top}px;width:324px;height:{hh}px;position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center"><div style="font-size:30px;font-weight:800;letter-spacing:.14em;color:{ORANGE}">{esc(sk["t"])}</div><div style="font-size:26px;margin-top:14px;color:rgba(255,255,255,.82);padding:0 18px">{esc(sk["s"])}</div></div>')
    return g


def agent(spec):
    d = {"title": "BUILT TO FEED AN AI AGENT", "knows": ["Live readings", "Station health", "Safety policy limits", "Change history"],
         "platform": "ONE PLATFORM", "platform_sub": "the connection exists for Weather Station today",
         "agent": {"t": "AI agent", "verbs": ["Read", "Propose", "Ask a person"]},
         "guard": "People stay in control: nothing changes without approval", "badge": "DIRECTION · NOT LIVE TODAY"}
    d.update(spec.get("diagrams", {}).get("agent", {}))
    g = Dg()
    g.add(0, "a_x", f'<div class="dgx">{esc(d["title"])}</div>', "none")
    g.add(0, "a_rb", f'<div class="ribbon" style="opacity:1">{esc(d["badge"])}</div>', "none")
    ch = "".join(f'<div class="pcard o" style="margin-bottom:16px"><b style="font-size:30px">{esc(k)}</b></div>' for k in d["knows"])
    g.add(1, "a_k", f'<div style="position:absolute;left:96px;top:210px;width:480px"><div style="font-size:24px;font-weight:800;letter-spacing:.16em;color:{ORANGE};margin-bottom:18px">WHAT THE PLATFORM KNOWS</div>{ch}</div>')
    g.add(2, "a_p", f'<div class="bar" style="left:700px;top:210px;width:520px;height:560px;position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:36px;font-weight:800;letter-spacing:.16em;color:{ORANGE}">{esc(d["platform"])}</div><div style="font-size:26px;margin-top:16px;color:rgba(255,255,255,.8);text-align:center;padding:0 28px">{esc(d["platform_sub"])}</div></div>')
    g.add(2, "a_a1", f'<div class="arrow" style="left:600px;top:450px;font-size:70px">›</div>', "fade")
    ag = d["agent"]
    vs = "".join(f'<div style="font-size:34px;font-weight:800;margin-top:18px">{esc(v)}</div>' for v in ag["verbs"])
    g.add(3, "a_ag", f'<div class="dash" style="left:1340px;top:210px;width:484px;height:400px;position:absolute;padding:30px"><div style="margin-bottom:10px">{ICONS["agent"]}</div><b style="font-size:40px">{esc(ag["t"])}</b>{vs}</div>')
    g.add(3, "a_a2", f'<div class="arrow" style="left:1240px;top:340px;font-size:70px">›</div>', "fade")
    g.add(4, "a_g", f'<div class="bar" style="left:700px;top:840px;width:1124px;height:100px;position:absolute;display:flex;align-items:center;padding:0 34px;font-size:32px;font-weight:700">{esc(d["guard"])}</div>')
    return g


def scene_diagram(group, spec, tl, sid, t0, t1, kind):
    g = {"umbrella": umbrella, "paths": paths, "agent": agent}[kind](spec)
    stage_t = {}
    for start, b in group: stage_t.setdefault(b["stage"], start)
    h = [f'<div id="{sid}" class="clip grid" data-start="{fmt(t0)}" data-duration="{fmt(t1 - t0)}" data-track-index="1"><div class="dg">']
    byst = {}
    for stage, eid, frag, anim in g.els:
        h.append(f'<div class="st" id="{sid}_{eid}" style="left:0;top:0;width:1920px;height:1080px;pointer-events:none">{frag}</div>')
        byst.setdefault(stage, []).append((eid, anim))
    h.append("</div>")
    ch = group[0][1].get("chapter", 0)
    for bi, (start, b) in enumerate(group):
        e_cs = group[bi + 1][0] if bi + 1 < len(group) else t1
        cid = f"{sid}_cap{bi}"
        bd = f'<span class="bd">{esc(b["badge"])}</span>' if b.get("badge") else ""
        if b.get("caption"):
            h.append(f'<div class="cap" id="{cid}">{bd}<span>{esc(b["caption"])}</span></div>')
            tl.set(f"#{cid}", "opacity:0", fmt(t0)); tl.to(f"#{cid}", "opacity:1", fmt(start + 10), 0.3); tl.to(f"#{cid}", "opacity:0", fmt(e_cs - 25), 0.2)
    h.append("</div>")
    for stage, els in byst.items():
        t = t0 if stage == 0 else stage_t.get(stage)
        for k, (eid, anim) in enumerate(els):
            sel = f"#{sid}_{eid}"
            tl.set(sel, "opacity:0", fmt(t0))
            if t is None: continue
            tt = t + 25 + (0 if stage == 0 else k * 18)
            if anim == "none": tl.to(sel, "opacity:1", fmt(tt), 0.3)
            elif anim == "drop": tl.fromto(sel, "opacity:0,y:-60,scale:.94,transformOrigin:'50% 0'", "opacity:1,y:0,scale:1", fmt(tt), 0.9, "back.out(1.4)")
            elif anim == "draw": tl.fromto(sel, "opacity:0", "opacity:1", fmt(tt), 0.5)
            elif anim == "fade": tl.to(sel, "opacity:1", fmt(tt), 0.5)
            else: tl.fromto(sel, "opacity:0,y:34", "opacity:1,y:0", fmt(tt), 0.6, "power2.out")
    tl.to(f"#{sid}", "opacity:1", fmt(t0), 0.3)
    tl.to(f"#{sid}", "opacity:0", fmt(t1 - 25), 0.25)
    return "\n".join(h)


# --------------------------------------------------------------------------- compose
def compose(spec, vdir, starts, total_cs):
    beats = spec["beats"]
    chapters = spec["chapters"]
    order = [(starts[b["id"]], b) for b in beats]
    # scenes: group consecutive beats that share an image (shot) or a diagram
    scenes = []
    for st, b in order:
        k = b["kind"]
        if scenes and k == "shot" and scenes[-1]["kind"] == "shot" and scenes[-1]["key"] == b["img"] and scenes[-1]["chapter"] == b.get("chapter", 0):
            scenes[-1]["beats"].append((st, b)); continue
        if scenes and k == "diagram" and scenes[-1]["kind"] == "diagram" and scenes[-1]["key"] == b["diagram"]:
            scenes[-1]["beats"].append((st, b)); continue
        scenes.append({"kind": k, "key": b.get("img") or b.get("diagram"), "chapter": b.get("chapter", 0), "beats": [(st, b)]})
    tl = TL()
    parts = []
    for i, sc in enumerate(scenes):
        t0 = sc["beats"][0][0]
        t1 = scenes[i + 1]["beats"][0][0] if i + 1 < len(scenes) else total_cs
        sid = f"s{i}"
        if sc["kind"] == "shot": parts.append(scene_shot(sc["beats"], spec, tl, sid, t0, t1, chapters))
        elif sc["kind"] == "card": parts.append(scene_card(sc["beats"][0][1], spec, tl, sid, t0, t1))
        elif sc["kind"] == "tri": parts.append(scene_tri(sc["beats"][0][1], spec, tl, sid, t0, t1, chapters))
        else: parts.append(scene_diagram(sc["beats"], spec, tl, sid, t0, t1, sc["key"]))
    doc = f'''<!doctype html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=1920, height=1080"/>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>{css(spec)}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{fmt(total_cs)}" data-width="1920" data-height="1080">
<audio id="narration" class="clip" src="narration.m4a" data-start="0" data-duration="{fmt(total_cs)}" data-track-index="0"></audio>
{chr(10).join(parts)}
</div>
<script>
const tl = gsap.timeline({{ paused: true }});
window.__timelines = window.__timelines || {{}};
window.__timelines["main"] = tl;
{tl.js()}
</script></body></html>'''
    P = f"{vdir}/project"
    os.makedirs(f"{P}/assets", exist_ok=True)
    for f in os.listdir(f"{vdir}/assets"):
        shutil.copy(f"{vdir}/assets/{f}", f"{P}/assets/{f}")
    open(f"{P}/index.html", "w").write(doc)
    open(f"{P}/package.json", "w").write('{"name":"video","private":true,"type":"module"}\n')
    return scenes


def preview_diagrams(spec, vdir):
    """all stages visible, one page per diagram kind, for layout checks"""
    out = []
    for name, fn in (("umbrella", umbrella), ("paths", paths), ("agent", agent)):
        g = fn(spec)
        out.append(f'<div class="clip grid" style="opacity:1;position:relative;width:1920px;height:1080px;margin-bottom:20px"><div class="dg">' + "".join(f'<div class="st" style="opacity:1;left:0;top:0;width:1920px;height:1080px">{frag}</div>' for _, _, frag, _ in g.els) + "</div></div>")
    open(f"{vdir}/preview-diagrams.html", "w").write(f'<!doctype html><html><head><meta charset="utf-8"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/><style>{css(spec)} html,body{{height:auto;overflow:auto}}</style></head><body>' + "".join(out) + "</body></html>")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}
    if not args:
        print(__doc__); sys.exit(2)
    vdir = os.path.abspath(args[0])
    spec = load_spec(vdir)
    errs, warns, tw, est = validate(spec, vdir)
    for w in warns: print("warn:", w)
    for e in errs: print("ERROR:", e)
    print(f"beats={len(spec['beats'])} words={tw} estimated length ~{est:.0f}s ({est/60:.1f} min)")
    if "--preview-diagrams" in flags:
        preview_diagrams(spec, vdir); print("wrote", f"{vdir}/preview-diagrams.html"); return
    if errs: sys.exit(1)
    if "--check" in flags: return
    dry = "--dry" in flags
    if not dry and os.environ.get("VB_ALLOW_TTS") != "1":
        sys.exit("Refusing a real run: this would generate narration (TTS). Use --dry for previews. The lead sets VB_ALLOW_TTS=1 for real runs.")
    starts, total = build_timeline(spec, vdir, dry)
    scenes = compose(spec, vdir, starts, total)
    tl_rows = [(starts[b["id"]], b["id"], b["kind"]) for b in spec["beats"]]
    json.dump([{"id": i, "start": s / 100.0, "kind": k} for s, i, k in tl_rows], open(f"{vdir}/timeline.json", "w"), indent=1)
    print(f"composed: {len(scenes)} scenes, total {total/100:.1f}s -> {vdir}/project/index.html")
    r = subprocess.run(["hyperframes", "lint"], cwd=f"{vdir}/project", capture_output=True, text=True)
    print((r.stdout + r.stderr).strip().splitlines()[-1] if (r.stdout + r.stderr).strip() else "lint: (no output)")
    if "--render" in flags:
        out = f"{vdir}/final{'-dry' if dry else ''}.mp4"
        fps, q = ("12", "draft") if dry else ("24", "high")   # dry previews: fast and small; real run: full quality
        subprocess.run(["hyperframes", "render", "--fps", fps, "--quality", q, "--output", out, "--quiet"], cwd=f"{vdir}/project", check=True, capture_output=True)
        print("rendered:", out, "%.1fs" % dur(out))


if __name__ == "__main__":
    main()
