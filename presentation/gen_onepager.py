#!/usr/bin/env python3
"""gen_onepager.py: writes onepager.html (A4 portrait, 794x1123 px). Rendered to one-pager.pdf by render_onepager.js."""
import html, os
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, "assets")
INK, MUTE, LINE, BG = "#0C0C0C", "#6B6B6B", "#DCDCD7", "#F5F5F2"
ORANGE, ORANGE_INK = "#FF8300", "#B85C00"
RED, GREEN, AMBER = "#D64545", "#1E9E5A", "#F2A33A"
e = lambda s: html.escape(s, quote=False)


def img(name, x, y, w):
    iw, ih = Image.open(os.path.join(A, name + ".png")).size
    h = round(w * ih / iw)
    return f'<img src="assets/{name}.png" alt="" style="position:absolute;left:{x}px;top:{y}px;width:{w}px;height:{h}px;border:1px solid #D5D5D0">', h


def pill(x, y, w, h, label, bg, fg, size=14, extra=""):
    return f'<div style="position:absolute;left:{x}px;top:{y}px;width:{w}px;height:{h}px;border-radius:{h // 2}px;background:{bg};color:{fg};font-size:{size}px;line-height:{h}px;font-weight:700;text-align:center;white-space:nowrap;{extra}">{e(label)}</div>'


def t(x, y, w, content, size, lh, color="#2B2B2B", extra=""):
    return f'<p style="position:absolute;left:{x}px;top:{y}px;width:{w}px;font-size:{size}px;line-height:{lh}px;color:{color};{extra}">{content}</p>'


def bullets(x, y, w, rows, size=12.5, lh=18, gap=7):
    out = [f'<div style="position:absolute;left:{x}px;top:{y}px;width:{w}px;display:flex;flex-direction:column;gap:{gap}px">']
    for r in rows:
        out.append(f'<div style="display:flex"><div style="flex:none;width:7px;height:7px;border-radius:4px;background:{ORANGE};margin:{(lh - 7) // 2}px 10px 0 0"></div>'
                   f'<p style="flex:1;font-size:{size}px;line-height:{lh}px;color:#2B2B2B">{r}</p></div>')
    out.append("</div>")
    return "".join(out)


b = []
b.append(f'<div style="position:absolute;left:0;top:0;width:794px;height:190px;background:{INK}"></div>')
b.append(f'<div style="position:absolute;left:40px;top:34px;width:36px;height:4px;background:{ORANGE}"></div>')
b.append(t(40, 48, 440, e("RELEASE · OCTOBER 2026"), 11, 14, ORANGE, "font-weight:700;letter-spacing:1.4px"))
b.append(t(40, 70, 470, 'Connected<br>Environment <span style="color:%s">1.0</span>' % ORANGE, 34, 40, "#fff", "font-weight:700"))
b.append(t(40, 158, 470, e("The home for everything environmental on site."), 14, 18, "#CFCFCF"))
for i, (chip, bg, fg, lab) in enumerate((("Danger", RED, "#fff", "Weather Station"), ("All Clear", GREEN, "#fff", "Lightning"), ("Check", AMBER, INK, "Gas"))):
    y = 44 + i * 44
    b.append(pill(522, y, 120, 30, chip, bg, fg, 14))
    b.append(t(656, y + 6, 100, e(lab), 12, 18, "#C4C4C4"))
b.append(t(40, 212, 714, "One product for everything environmental on a site. <b>Weather Station, Lightning and Gas</b> are in it today, on one platform with one menu and header. Each project switches on only the products it uses. Going forward, new environment products go under it (direction, no dates).", 15, 23, "#2B2B2B"))

cols = [
    ("Weather Station", "Danger", RED, "#fff", "tile-weather", [
        "A verdict, in words, and the steps to take, in priority order.",
        "A heat card with work, rest and water. Offline stations are named.",
        "Reports, and a Site Safety Policy with 30 day charts."]),
    ("Lightning", "All Clear", GREEN, "#fff", "tile-lightning", [
        "A backup: the site's cabinet lights and sounder come first.",
        "Only green is safe to work. Alert distances on a map.",
        "Alarm history with CSV export. Wallboard and phone views."]),
    ("Gas", "Check", AMBER, INK, "tile-gas", [
        "Overview, detectors and compliance limits.",
        "A silent detector is named, and the status reads Check.",
        "Acknowledge and close alerts: recorded in WakeCap only."]),
]
for i, (name, chip, bg, fg, im, rows) in enumerate(cols):
    x = 40 + i * 244
    b.append(f'<div style="position:absolute;left:{x}px;top:296px;width:226px;height:316px;background:#fff;border:1px solid {LINE};border-radius:10px"></div>')
    b.append(f'<div style="position:absolute;left:{x}px;top:296px;width:226px;height:5px;background:{ORANGE};border-radius:10px 10px 0 0"></div>')
    b.append(t(x + 16, 316, 130, e(name), 16, 20, INK, "font-weight:700"))
    b.append(pill(x + 140, 316, 70, 22, chip, bg, fg, 11))
    s, h = img(im, x + 13, 354, 200)
    b.append(s)
    b.append(bullets(x + 16, 354 + max(h, 100) + 16, 196, rows, 12, 17, 7))

b.append(f'<div style="position:absolute;left:40px;top:628px;width:714px;height:44px;background:#FFF1E0;border:1px solid #F3C894;border-radius:10px"></div>')
b.append(t(58, 639, 680, "<b>One platform behind them.</b> Each project switches on only what it uses (Settings, Connected Products).", 12.5, 20))

b.append(f'<div style="position:absolute;left:40px;top:692px;width:350px;height:316px;background:#fff;border:1px solid {LINE};border-radius:10px"></div>')
b.append(t(58, 710, 300, "Good to know", 16, 20, INK, "font-weight:700"))
b.append(bullets(58, 746, 316, [
    "<b>Lightning is a backup,</b> not the alarm. Cabinet lights and sounder first.",
    "<b>Gas acknowledge and close</b> are recorded in WakeCap only, not sent to the gas vendor.",
    "<b>Gas exposure and compliance figures:</b> Not available yet.",
    "<b>The AI assistant</b> is direction only. No assistant runs on any site.",
    "<b>Trends</b> is in the menu marked Planned.",
], 12.5, 18, 9))

b.append(f'<div style="position:absolute;left:404px;top:692px;width:350px;height:316px;background:#fff;border:1px solid {LINE};border-radius:10px"></div>')
b.append(t(422, 710, 300, "Find it, and watch", 16, 20, INK, "font-weight:700"))
b.append(t(422, 742, 316, "In the portal's left rail, click the <b>sun-and-cloud icon</b>: Connected Environment, if your project has it. Read the top line first.", 12.5, 18))
vids = [("Connected Environment overview", "3:21"), ("Weather Station", "2:18"), ("Lightning", "2:08"), ("Gas", "2:32"), ("Setup tour: explore, enable, configure", "4:33")]
for i, (n, d) in enumerate(vids):
    y = 816 + i * 36
    b.append(f'<div style="position:absolute;left:422px;top:{y}px;width:314px;height:1px;background:{LINE}"></div>')
    b.append(t(422, y + 9, 250, e(n), 12.5, 18, INK, "font-weight:700"))
    b.append(pill(680, y + 7, 56, 22, d, "#fff", INK, 11, f"border:1px solid {LINE}"))
b.append(t(40, 1040, 714, "Internal · live production screens, 4 October 2026, names blurred. Numbers on screens are values at capture.", 10.5, 14, MUTE))

page = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Connected Environment 1.0, at a glance</title><style>
@page {{ size: 794px 1123px; margin: 0 }}
* {{ box-sizing: border-box; margin: 0; padding: 0 }}
html, body {{ background: #fff }}
body {{ font-family: Arial, Helvetica, sans-serif; width: 794px; height: 1123px }}
.page {{ position: relative; width: 794px; height: 1123px; background: {BG}; overflow: hidden }}
b {{ font-weight: 700; color: {INK} }}
</style></head><body><div class="page">{"".join(b)}</div></body></html>"""
open(os.path.join(HERE, "onepager.html"), "w").write(page)
print("onepager.html written")
