#!/usr/bin/env python3
"""scan_deck.py: OCR every rendered slide (qa/slide-NN.png) and report names, coordinates, Arabic text, initials, ticket ids, flags, versions.
Run after extract.js: python3 scan_deck.py   (expect 0 hits)
"""
import glob, os, re, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
OCR = os.path.join(HERE, "..", "four-videos", "_tools", "ocr")  # built from ocr.swift (swiftc -O ocr.swift -o ocr)
files = sorted(glob.glob(os.path.join(HERE, "qa", "slide-[0-9][0-9].png")))
rows = subprocess.run([OCR] + files, capture_output=True, text=True).stdout.splitlines()
pat = re.compile(r"aramco|riyas|fadhili|jafurah|\bgip\b|pkg ?1|\bscc\b|main plant|h7038|27\.08|49\.09|[؀-ۿ]|\bMS\b|TAN-\d+|NEM-\d+|WCA-\d+|\b1\.0\.\d|launchdarkly|simulate|feature flag|blackline", re.I)
hits = 0
for l in rows:
    path, _, txt = l.partition("\t")
    m = pat.findall(txt)
    if m:
        hits += 1
        print(os.path.basename(path), sorted(set(x.lower() for x in m)))
print(f"slides scanned: {len(rows)} | slides with hits: {hits}")
sys.exit(1 if hits else 0)
