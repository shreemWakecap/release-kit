#!/usr/bin/env python3
"""prep_assets.py: crop the masked live frames (four-videos/*/assets, 1920x988) into the pictures the deck uses.
Run: python3 prep_assets.py   -> assets/*.png (native pixels, no resize)
"""
import os
from PIL import Image
KIT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "four-videos"))
HERE = os.path.dirname(os.path.abspath(__file__))
# name: (source frame, (x0, y0, x1, y1))
CROPS = {
  "ws-top":        ("weather-station/assets/w-top-a.png",        (270, 150, 1910, 910)),
  "ws-steps":      ("weather-station/assets/w-steps-a.png",      (1520, 0, 1920, 262)),
  "ws-details":    ("weather-station/assets/w-details-a.png",    (1330, 0, 1920, 330)),
  "ws-reports":    ("weather-station/assets/w-reports-a.png",    (265, 85, 1910, 785)),
  "ws-policy-top": ("weather-station/assets/w-policy-a-top.png", (265, 85, 1910, 760)),
  "ws-limits":     ("weather-station/assets/w-policy-a-limits.png", (265, 0, 1910, 700)),
  "ws-bands":      ("weather-station/assets/w-policy-a-bands.png", (265, 0, 1910, 700)),
  "prod-a":        ("connected-environment/assets/u-products-a.png", (265, 85, 1910, 300)),
  "prod-b":        ("connected-environment/assets/u-products-b.png", (265, 85, 1910, 300)),
  "prod-c":        ("connected-environment/assets/u-products-c.png", (265, 85, 1910, 300)),
  "lt-top":        ("lightning/assets/l-top-b.png",              (265, 100, 1910, 720)),
  "lt-wall":       ("lightning/assets/l-wallboard-b.png",        (0, 0, 1000, 520)),
  "lt-settings":   ("lightning/assets/l-settings-b-all.png",     (265, 85, 1910, 700)),
  "gas-dash":      ("gas/assets/g-dashboard-c.png",              (265, 90, 1910, 810)),
  "gas-wall":      ("gas/assets/g-wallboard-c.png",              (0, 0, 1920, 740)),
  "tile-gas":      ("gas/assets/g-wallboard-c.png",              (0, 0, 1920, 740)),
  "ws-gear-thumb": ("weather-station/assets/w-gear-a.png",       (810, 198, 1110, 365)),
  "ws-limits-thumb": ("weather-station/assets/w-policy-a-limits.png", (630, 30, 1790, 670)),
  "tile-weather":  ("weather-station/assets/w-top-a.png",        (280, 160, 1000, 520)),
  "tile-lightning":("lightning/assets/l-top-b.png",              (275, 205, 815, 475)),
  "gas-alerts":    ("gas/assets/g-alerts-c.png",                 (265, 85, 1910, 700)),
  "gas-comp":      ("gas/assets/g-compliance-c.png",             (265, 85, 1910, 700)),
}
for name, (src, box) in CROPS.items():
    im = Image.open(os.path.join(KIT, src)).convert("RGB").crop(box)
    im.save(os.path.join(HERE, "assets", name + ".png"), optimize=True)
    print(f"{name:14s} {im.size[0]}x{im.size[1]}  {src}")
