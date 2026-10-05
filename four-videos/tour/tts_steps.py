#!/usr/bin/env python3
"""One Gemini TTS clip per step (Aoede, pinned model), then a Whisper check of every clip against its script.
A clip with inserted or dropped words is regenerated (up to 3 tries). Writes durations.json and tts-report.json.
Run: python3 tts_steps.py            (all steps)   |   python3 tts_steps.py s05 s09   (only those)
"""
import os, sys, json, re, subprocess, hashlib, difflib, time
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
TTS = os.path.expanduser("~/.claude/skills/wstack/demoit/bin/gemini-tts")
TRANSCRIBE = os.path.expanduser("~/.claude/skills/wstack/make-video/bin/transcribe")
VOICE, MODEL = "Aoede", "gemini-3.1-flash-tts-preview"
NUM = {"1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten", "24": "twenty four", "30": "thirty"}


def sha(t):
    return hashlib.sha1((t + VOICE + MODEL).encode()).hexdigest()


def words(t):
    t = t.lower().replace("-", " ")
    t = re.sub(r"[^a-z0-9' ]+", " ", t)
    out = []
    for w in t.split():
        out.extend(NUM.get(w, w).split())
    return out


def gen(step, force=False):
    sid, text = step["id"], step["say"]
    m4a, txt, sf = f"{HERE}/audio/{sid}.m4a", f"{HERE}/audio/{sid}.txt", f"{HERE}/audio/{sid}.sha"
    if not force and os.path.exists(m4a) and os.path.exists(sf) and open(sf).read() == sha(text):
        return True
    open(txt, "w").write(text + "\n")
    for attempt in range(5):
        r = subprocess.run([TTS, "--text-file", txt, "--output", m4a, "--voice", VOICE, "--model", MODEL], capture_output=True, text=True)
        if r.returncode == 0 and os.path.exists(m4a):
            open(sf, "w").write(sha(text))
            return True
        time.sleep(8 + 6 * attempt)
    print("TTS failed", sid, (r.stdout + r.stderr)[-200:])
    return False


def check(step):
    sid, text = step["id"], step["say"]
    pref = f"{HERE}/audio/{sid}-chk"
    subprocess.run([TRANSCRIBE, f"{HERE}/audio/{sid}.m4a", pref, "--language", "en"], capture_output=True)
    try:
        d = json.load(open(pref + ".json"))
    except Exception as e:
        return 0.0, [f"transcribe failed {e}"], True
    heard = " ".join(seg["text"].strip() for seg in d["transcription"])
    a, b = words(text), words(heard)
    sm = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
    diffs, bad = [], False
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        diffs.append(f"{tag}: script[{' '.join(a[i1:i2])}] heard[{' '.join(b[j1:j2])}]")
        if (tag == "insert" and j2 - j1 > 2) or (tag == "delete" and i2 - i1 > 1) or (tag == "replace" and max(i2 - i1, j2 - j1) > 3):
            bad = True
    return sm.ratio(), diffs, bad


def dur(p):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p], capture_output=True, text=True)
    return float(r.stdout.strip())


def main():
    steps = json.load(open(f"{HERE}/steps.json"))
    only = set(sys.argv[1:])
    todo = [s for s in steps if not only or s["id"] in only]
    with ThreadPoolExecutor(max_workers=3) as ex:
        list(ex.map(lambda s: gen(s, force=bool(only)), todo))
    report = {}
    for s in todo:
        for attempt in range(3):
            ratio, diffs, bad = check(s)
            if not bad:
                break
            print(f"  {s['id']}: bad clip (ratio {ratio:.2f}) {diffs[:3]} -> regenerating")
            gen(s, force=True)
        report[s["id"]] = {"ratio": round(ratio, 3), "bad": bad, "diffs": diffs}
        print(f"{s['id']}: match {ratio*100:.0f}%  {'BAD' if bad else 'ok'}  {diffs[:2]}")
    durs = json.load(open(f"{HERE}/durations.json")) if os.path.exists(f"{HERE}/durations.json") else {}
    for s in steps:
        p = f"{HERE}/audio/{s['id']}.m4a"
        if os.path.exists(p):
            durs[s["id"]] = round(dur(p), 2)
    json.dump(durs, open(f"{HERE}/durations.json", "w"), indent=1)
    old = json.load(open(f"{HERE}/tts-report.json")) if os.path.exists(f"{HERE}/tts-report.json") else {}
    old.update(report)
    json.dump(old, open(f"{HERE}/tts-report.json", "w"), indent=1)
    print("total narration: %.0f s" % sum(durs.values()))


if __name__ == "__main__":
    main()
