#!/usr/bin/env python3
"""sheets.py: contact sheets (4 slides each) from qa/slide-NN.png (or another prefix) -> qa/sheet-N.png"""
import sys, glob
from PIL import Image
prefix = sys.argv[1] if len(sys.argv) > 1 else "slide"
files = sorted(glob.glob(f"qa/{prefix}-[0-9][0-9].png"))
W, H = 960, 540
for s in range(0, len(files), 4):
    sheet = Image.new("RGB", (2 * W + 6, 2 * H + 6), (60, 60, 60))
    for i, f in enumerate(files[s:s + 4]):
        im = Image.open(f).convert("RGB").resize((W, H), Image.LANCZOS)
        sheet.paste(im, ((i % 2) * (W + 6), (i // 2) * (H + 6)))
    out = f"qa/{prefix}-sheet-{s // 4 + 1}.png"
    sheet.save(out)
    print(out, files[s:s + 4])
