#!/usr/bin/env python3
"""scan_frames.py: OCR a frame every 2 s of out/tour.mp4 and report any leaked name, coordinate, Arabic text or avatar initials."""
import os, re, subprocess, glob, sys
HERE = os.path.dirname(os.path.abspath(__file__))
OCR = os.path.join(HERE, "..", "_tools", "ocr")  # built from _tools/ocr.swift (swiftc -O ocr.swift -o ocr)
src = sys.argv[1] if len(sys.argv) > 1 else f"{HERE}/out/tour.mp4"
d = f"{HERE}/qa/ocr"
os.makedirs(d, exist_ok=True)
for f in glob.glob(d + "/*.png"):
    os.remove(f)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", src, "-vf", "fps=0.5", f"{d}/f%04d.png"], check=True)
frames = sorted(glob.glob(d + "/*.png"))
out = subprocess.run([OCR] + frames, capture_output=True, text=True).stdout.splitlines()
pat = re.compile(r"aramco|riyas|fadhili|jafurah|\bgip\b|pkg ?1|\bscc\b|main plant|h7038|27\.08|49\.09|[؀-ۿ]|\bMS\b", re.I)
hits = 0
for line in out:
    path, _, txt = line.partition("\t")
    m = pat.findall(txt)
    if m:
        hits += 1
        i = int(re.search(r"f(\d+)\.png", path).group(1))
        print(f"t~{(i-1)*2:4d}s  {sorted(set(x.lower() for x in m))}")
print(f"frames scanned: {len(frames)} | frames with hits: {hits}")
