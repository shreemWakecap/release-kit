#!/usr/bin/env python3
"""compose.py: out/raw/*.webm + out/timeline.json + audio clips -> out/tour.mp4
 - finds the magenta sync flash in the recording
 - drops the warm-up and every page-loading interval (cuts)
 - places each narration clip at its step start (on the edited timeline)
"""
import os, sys, json, subprocess, glob

HERE = os.path.dirname(os.path.abspath(__file__))
TLP = sys.argv[1] if len(sys.argv) > 1 else f"{HERE}/out/timeline.json"
OUT = sys.argv[2] if len(sys.argv) > 2 else f"{HERE}/out/tour.mp4"
tl = json.load(open(TLP))
steps = json.load(open(f"{HERE}/steps.json"))
dur = json.load(open(f"{HERE}/durations.json"))
video = tl["video"]
FPS = 10

# 1) sync flash: first run of magenta frames
raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", video, "-vf", f"fps={FPS},scale=8:8", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
fsz = 8 * 8 * 3
n = len(raw) // fsz
flash = None
for i in range(n):
    f = raw[i * fsz:(i + 1) * fsz]
    r = sum(f[0::3]) / 64; g = sum(f[1::3]) / 64; b = sum(f[2::3]) / 64
    if r > 220 and b > 220 and g < 70:
        flash = i / FPS
        break
if flash is None:
    sys.exit("sync flash not found")
sync_v = flash - 0.05
print(f"sync flash at video t={flash:.2f}s ({n/FPS:.0f}s scanned)")

# 2) segments to keep (relative to the sync point)
KEEP_FROM = 0.8
cuts = sorted([c for c in tl["cuts"] if c[1] > KEEP_FROM])
segs, prev = [], KEEP_FROM
for a, b in cuts:
    if a > prev:
        segs.append((prev, a))
    prev = max(prev, b)
segs.append((prev, tl["endT"]))
segs = [(a, b) for a, b in segs if b - a > 0.2]
total = sum(b - a for a, b in segs)
print(f"{len(segs)} segments, final length {total:.1f}s (cut {tl['endT'] - KEEP_FROM - total:.1f}s of loading)")


def final_time(r):
    cut = sum(b - a for a, b in cuts if b <= r)
    return r - KEEP_FROM - cut


# 3) audio placement
inputs, filt, labels = [], [], []
k = 0
for st in steps:
    sid = st["id"]
    if sid not in tl["starts"]:
        continue
    t = final_time(tl["starts"][sid]) + 0.30
    ms = int(max(0, t) * 1000)
    k += 1
    inputs += ["-i", f"{HERE}/audio/{sid}.m4a"]
    filt.append(f"[{k}:a]adelay={ms}|{ms}[a{k}]")
    labels.append(f"[a{k}]")
    end = t + dur[sid]
    nxt = None
    print(f"  {sid}: start {t:6.1f}s  voice {dur[sid]:5.1f}s  ends {end:6.1f}s")
amix = "".join(labels) + f"amix=inputs={len(labels)}:normalize=0:dropout_transition=0,volume=1.0[aout]"

vparts = []
for i, (a, b) in enumerate(segs):
    vparts.append(f"[0:v]trim=start={sync_v + a:.3f}:end={sync_v + b:.3f},setpts=PTS-STARTPTS[v{i}]")
vcat = "".join(f"[v{i}]" for i in range(len(segs))) + f"concat=n={len(segs)}:v=1:a=0[vout]"
fc = ";".join(vparts + [vcat] + filt + [amix])
out = OUT
cmd = ["ffmpeg", "-loglevel", "error", "-y", "-i", video] + inputs + ["-filter_complex", fc, "-map", "[vout]", "-map", "[aout]",
       "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-r", "25", "-c:a", "aac", "-b:a", "160k", "-t", f"{total:.2f}", "-movflags", "+faststart", out]
r = subprocess.run(cmd, capture_output=True, text=True)
if r.returncode != 0:
    print(r.stderr[-1500:]); sys.exit(1)
d = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration,size", "-of", "default=nw=1", out], capture_output=True, text=True).stdout.split()
print("wrote", out, d)
json.dump({"sync_video_t": sync_v, "segments": segs, "final_length": total}, open(f"{HERE}/out/compose.json", "w"), indent=1)
