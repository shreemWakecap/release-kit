#!/usr/bin/env python3
"""blur_serials.py: rebuild the Gas screenshots used by the deck with every detector serial number blurred.
Source: the masked live frame four-videos/gas/assets/g-dashboard-c.png, cropped (265,90,1910,810) as prep_assets.py does.
Writes: src/assets/gas-dash.png and src/assets/permits-gas.png (same picture). Safe to run again.
"""
import os
from PIL import Image, ImageFilter
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "..", "four-videos", "gas", "assets", "g-dashboard-c.png")
CROP = (265, 90, 1910, 810)
# boxes in crop pixels (x0, y0, x1, y1): the serial numbers only, the words around them stay readable
BOXES = [
  (157, 387, 234, 408),   # H2S card: Worst of 4 reporting
  (585, 403, 662, 424),   # O2 card
  (1013, 387, 1090, 408), # LEL card
  (1324, 208, 1468, 238), # side panel title: "... is offline"
  (1348, 315, 1428, 336), # side panel: what needs attention
] + [(1330, cy - 13, 1434, cy + 13) for cy in (445, 501, 557, 613, 669)]  # detector list
im = Image.open(SRC).convert("RGB").crop(CROP)
for b in BOXES:
    part = im.crop(b).filter(ImageFilter.GaussianBlur(6))
    im.paste(part, b[:2])
for name in ("gas-dash.png", "permits-gas.png"):
    im.save(os.path.join(HERE, "src", "assets", name), optimize=True)
print("blurred", len(BOXES), "boxes ->", im.size)
