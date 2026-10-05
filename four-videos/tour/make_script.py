#!/usr/bin/env python3
"""make_script.py: steps.json + out/timeline.json -> a readable narration script with the start time of every step in the final cut.
Usage: python3 make_script.py [timeline.json] [out.md]
"""
import os, sys, json

HERE = os.path.dirname(os.path.abspath(__file__))
TLP = sys.argv[1] if len(sys.argv) > 1 else f"{HERE}/out/timeline.json"
OUT = sys.argv[2] if len(sys.argv) > 2 else f"{HERE}/out/tour.script.md"
tl = json.load(open(TLP))
steps = json.load(open(f"{HERE}/steps.json"))
KEEP_FROM = 0.8
cuts = sorted([c for c in tl["cuts"] if c[1] > KEEP_FROM])


def final_time(r):
    return r - KEEP_FROM - sum(b - a for a, b in cuts if b <= r)


def mmss(t):
    t = max(0, int(round(t)))
    return f"{t // 60}:{t % 60:02d}"


lines = [
    "# Connected Environment setup tour: narration script",
    "",
    "Screen recording of the live portal. No product was switched on or off, and no policy, limit or setting was saved or published. The only writes were to the recorder's own featured-card layout (Select parameters and the card buttons), put back as it was afterwards.",
    "",
    "Voice: Gemini TTS (Aoede). Times are where each line starts in the final cut.",
    "",
]
chapter = None
words = 0
for st in steps:
    sid = st["id"]
    if sid not in tl["starts"]:
        lines += [f"_{sid} was skipped in this take (data dependent)._", ""]
        continue
    if st["chapter"] != chapter:
        chapter = st["chapter"]
        lines += [f"## {chapter}", ""]
    t = final_time(tl["starts"][sid]) + 0.30
    words += len(st["say"].split())
    lines += [f"**{mmss(t)}** · caption: {st['caption']}", f"> {st['say']}", ""]
lines += [f"{words} spoken words.", ""]
open(OUT, "w").write("\n".join(lines))
print("wrote", OUT, f"({words} words)")
