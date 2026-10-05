#!/usr/bin/env python3
"""gen_deck.py: writes deck.html (14 slides, 1280x720 px, speaker notes inside each slide).
The same HTML is rendered to PDF/PNG by extract.js and converted to PPTX by build_pptx.py.
Layout rules the converter relies on: absolute or flex layout, solid colours, no shadows, no pseudo-elements,
text blocks hold only text and inline tags (b, span, br).
"""
import os, html
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, "assets")
INK, MUTE, LINE, BG = "#0C0C0C", "#6B6B6B", "#DCDCD7", "#F5F5F2"
ORANGE, ORANGE_INK = "#FF8300", "#B85C00"
RED, GREEN, AMBER = "#D64545", "#1E9E5A", "#F2A33A"

CSS = f"""
@page {{ size: 1280px 720px; margin: 0 }}
* {{ box-sizing: border-box; margin: 0; padding: 0 }}
html, body {{ background: #8a8a8a }}
body {{ font-family: Arial, Helvetica, sans-serif }}
.slide {{ position: relative; width: 1280px; height: 720px; overflow: hidden; background: {BG}; color: {INK};
  margin: 0 auto 24px; break-after: page; page-break-after: always }}
.slide:last-child {{ break-after: auto; page-break-after: auto }}
.dark {{ background: {INK}; color: #fff }}
@media print {{ html, body {{ background: none }} .slide {{ margin: 0 }} }}
.abs {{ position: absolute }}
.h1 {{ font-size: 38px; line-height: 44px; font-weight: 700; color: {INK} }}
.h2 {{ font-size: 25px; line-height: 31px; font-weight: 700; color: {INK} }}
.h3 {{ font-size: 21px; line-height: 27px; font-weight: 700; color: {INK} }}
.sub {{ font-size: 20px; line-height: 28px; color: {MUTE} }}
.body {{ font-size: 19px; line-height: 27px; color: #2B2B2B }}
.small {{ font-size: 16px; line-height: 23px; color: #2B2B2B }}
.cap {{ font-size: 14px; line-height: 19px; color: {MUTE} }}
.tiny {{ font-size: 12px; line-height: 16px; color: {MUTE} }}
.lab {{ font-size: 13px; line-height: 17px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: {ORANGE_INK} }}
b {{ font-weight: 700; color: {INK} }}
.o {{ color: {ORANGE_INK}; font-weight: 700 }}
.dark b {{ color: #fff }}
.dark .o {{ color: {ORANGE} }}
.bar {{ position: absolute; left: 64px; top: 52px; width: 40px; height: 5px; background: {ORANGE} }}
.card {{ position: absolute; background: #fff; border: 1px solid {LINE}; border-radius: 12px }}
.pill {{ position: absolute; border-radius: 17px; height: 34px; line-height: 34px; text-align: center; font-size: 15px; font-weight: 700; white-space: nowrap }}
.shot {{ position: absolute; border: 1px solid #C9C9C4; background: #fff }}
.list {{ position: absolute; display: flex; flex-direction: column }}
.row {{ display: flex; align-items: flex-start }}
.mk {{ flex: none; width: 28px; height: 28px; border-radius: 14px; background: {ORANGE}; color: #fff; font-size: 15px; line-height: 28px; font-weight: 700; text-align: center; margin-right: 14px; margin-top: 0px }}
.dot {{ flex: none; width: 10px; height: 10px; border-radius: 5px; background: {ORANGE}; margin-right: 14px; margin-top: 9px }}
.row .tx {{ flex: 1 }}
.call {{ position: absolute; width: 26px; height: 26px; border-radius: 13px; background: {ORANGE}; border: 2px solid #fff; color: #fff; font-size: 13px; line-height: 22px; font-weight: 700; text-align: center }}
.sw {{ position: absolute; width: 46px; height: 26px; border-radius: 13px }}
.kn {{ position: absolute; width: 20px; height: 20px; border-radius: 10px; background: #fff }}
"""

slides = []   # (html, notes)
_n = [0]


def esc(s):
    return html.escape(s, quote=False)


def img(name, x, y, w, extra=""):
    """Picture at x,y, width w; height follows the asset's aspect ratio. Returns (html, height)."""
    iw, ih = Image.open(os.path.join(A, name + ".png")).size
    h = round(w * ih / iw)
    return (f'<img class="shot" src="assets/{name}.png" alt="" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;{extra}">', h)


def txt(x, y, w, cls, content, extra=""):
    return f'<p class="abs {cls}" style="left:{x}px;top:{y}px;width:{w}px;{extra}">{content}</p>'


def box(x, y, w, h, style=""):
    return f'<div class="abs" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;{style}"></div>'


def pill(x, y, w, label, bg, fg="#fff", extra=""):
    return f'<div class="pill" style="left:{x}px;top:{y}px;width:{w}px;background:{bg};color:{fg};{extra}">{esc(label)}</div>'


def items(x, y, w, rows, numbered=True, gap=20, cls="body"):
    out = [f'<div class="list" style="left:{x}px;top:{y}px;width:{w}px;gap:{gap}px">']
    for i, (lead, rest) in enumerate(rows, 1):
        mk = f'<div class="mk">{i}</div>' if numbered else '<div class="dot"></div>'
        body = f'<b>{esc(lead)}</b> {esc(rest)}' if lead else esc(rest)
        out.append(f'<div class="row">{mk}<p class="tx {cls}">{body}</p></div>')
    out.append('</div>')
    return "".join(out)


def banner(x, y, w, h, label, text, bg="#FFF1E0", bd="#F3C894"):
    return (f'<div class="abs" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;background:{bg};border:1px solid {bd};border-radius:12px"></div>' +
            pill(x + 16, y + (h - 30) // 2, 104, label, "#fff", ORANGE_INK, f"border:1px solid {ORANGE_INK};font-size:11px;letter-spacing:1px;height:30px;line-height:28px") +
            txt(x + 136, y + (h - 24) // 2, w - 152, "small", text, "line-height:24px"))


def banner2(x, y, w, h, label, text, bg="#FFF1E0", bd="#F3C894"):
    return (f'<div class="abs" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;background:{bg};border:1px solid {bd};border-radius:12px"></div>' +
            pill(x + 16, y + 14, 104, label, "#fff", ORANGE_INK, f"border:1px solid {ORANGE_INK};font-size:11px;letter-spacing:1px;height:30px;line-height:28px") +
            txt(x + 16, y + 54, w - 32, "small", text, "line-height:24px"))


def cbox(x, y, w, h, label, fill="#fff", brd=LINE, tw=None):
    tw = tw or (w - 24)
    return (f'<div class="abs" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;background:{fill};border:1px solid {brd};border-radius:10px;display:flex;align-items:center;justify-content:center">'
            f'<p class="small" style="width:{tw}px;text-align:center;line-height:20px;font-size:15px;font-weight:700;color:#0C0C0C">{esc(label)}</p></div>')


def callout(n, x, y):
    return f'<div class="call" style="left:{x - 13}px;top:{y - 13}px">{n}</div>'


def head(eyebrow, title, sub=None):
    s = ['<div class="bar"></div>',
         txt(64, 68, 1000, "lab", esc(eyebrow)),
         f'<h1 class="abs h1" style="left:64px;top:92px;width:1152px">{esc(title)}</h1>']
    if sub:
        s.append(txt(64, 142, 1100, "sub", esc(sub)))
    return "".join(s)


def foot(n):
    return (txt(64, 682, 600, "tiny", "Connected Environment 1.0 · Internal") +
            txt(1116, 682, 100, "tiny", str(n), "text-align:right"))


def slide(body, notes, dark=False):
    _n[0] += 1
    cls = "slide dark" if dark else "slide"
    slides.append(f'<section class="{cls}">{body}<script type="text/plain" class="notes">{html.escape(notes.strip())}</script></section>')


# ---------------------------------------------------------------- 1 title
slide(
    box(80, 150, 64, 6, f"background:{ORANGE}") +
    txt(80, 174, 700, "lab", "Release · October 2026", f"color:{ORANGE}") +
    '<h1 class="abs h1" style="left:80px;top:208px;width:780px;font-size:60px;line-height:68px;color:#fff">Connected Environment<br><span class="o">1.0</span></h1>' +
    txt(80, 372, 700, "sub", "The home for everything environmental on site.", "font-size:26px;line-height:36px;color:#D0D0D0") +
    txt(80, 610, 700, "cap", "WakeCap · Internal presentation", "color:#9A9A9A") +
    pill(900, 170, 300, "Danger", RED, "#fff", "height:72px;line-height:72px;border-radius:36px;font-size:30px") +
    txt(900, 250, 300, "cap", "Weather Station", "color:#B8B8B8;font-size:15px") +
    pill(900, 318, 300, "All Clear", GREEN, "#fff", "height:72px;line-height:72px;border-radius:36px;font-size:30px") +
    txt(900, 398, 300, "cap", "Lightning", "color:#B8B8B8;font-size:15px") +
    pill(900, 466, 300, "Check", AMBER, INK, "height:72px;line-height:72px;border-radius:36px;font-size:30px") +
    txt(900, 546, 300, "cap", "Gas", "color:#B8B8B8;font-size:15px"),
    """
Welcome. About twelve minutes, plus questions. The overview video (3:21) is optional.
We cover why we built Connected Environment, what is in 1.0 today, what it does not do yet, and where to watch and try it.
The three chips on the right are the three answers a site can get: Danger from Weather Station, All Clear from Lightning, Check from Gas. That is the whole story in one picture.
""", dark=True)

# ---------------------------------------------------------------- 2 problem
tiles = [
    ("Danger", RED, "#fff", "Weather Station", "tile-weather", "Danger, in words, with the steps to take."),
    ("All Clear", GREEN, "#fff", "Lightning", "tile-lightning", "All Clear. Only green counts as safe to work."),
    ("Check", AMBER, INK, "Gas", "tile-gas", "Check. Not confirmed safe: one detector is not reporting."),
]
b = head("Why one place", "Is it safe to work right now?", "Heat says one thing. Lightning says another. Gas says a third.")
for i, (chip, bg, fg, prod, im, cap) in enumerate(tiles):
    x = 64 + i * 400
    b += f'<div class="card" style="left:{x}px;top:200px;width:352px;height:318px"></div>'
    b += pill(x + 20, 218, 112, chip, bg, fg)
    b += txt(x + 146, 225, 190, "cap", esc(prod), "font-size:15px")
    iw, ih = Image.open(os.path.join(A, im + ".png")).size
    w = 320
    h = round(w * ih / iw)
    top = 266 + (184 - h) // 2 if h < 184 else 266
    b += f'<img class="shot" src="assets/{im}.png" alt="" style="left:{x + 16}px;top:{top}px;width:{w}px;height:{h}px;border-color:#E6E6E1">'
    b += txt(x + 20, 462, 312, "small", esc(cap))
b += (f'<div class="abs" style="left:64px;top:546px;width:1152px;height:76px;background:{INK};border-radius:12px"></div>' +
      txt(96, 563, 1090, "h3", 'Connected Environment puts them under one roof: <span class="o">one place to look.</span>', "color:#fff;font-size:24px;line-height:42px") +
      txt(64, 636, 1152, "cap", "Three projects, three screens, one portal. Live production screens, 4 October 2026. Names blurred."))
b += foot(2)
slide(b, """
On site the question is simple: is it safe to work right now?
Heat says one thing. Lightning says another. Gas says a third. Three screens, three products, three places to look.
Connected Environment puts them under one roof.
These tiles are live production screens from three different projects, captured on 4 October. Weather showed Danger. Lightning showed All Clear. Gas showed Check.
Point out that Check does not mean calm. It means one detector is not reporting, so the screen cannot confirm it is safe.
""")

# ---------------------------------------------------------------- 3 what shipped
b = head("What shipped", "One product. Three environment products inside.")
b += f'<div class="abs" style="left:64px;top:168px;width:1152px;height:96px;background:{INK};border-radius:12px"></div>'
b += txt(96, 184, 700, "h2", "Connected Environment", "color:#fff;font-size:30px;line-height:36px")
b += txt(96, 224, 900, "cap", "One menu and header · one backend · each project switches on only what it uses", "color:#BDBDBD;font-size:16px")
b += pill(1096, 196, 90, "1.0", ORANGE, "#fff", "font-size:18px")
cards = [
    ("Weather Station", ["A verdict and the steps to take, not just a heat number.", "Reports, and a Site Safety Policy with a 30 day preview."]),
    ("Lightning", ["Alert state and alert distances, on a map.", "Alarm history. A backup to the site's own cabinet lights and sounder."]),
    ("Gas", ["Overview and detectors.", "Alerts you can acknowledge and close, and compliance limits."]),
]
for i, (name, lines) in enumerate(cards):
    x = 64 + i * 400
    b += f'<div class="card" style="left:{x}px;top:290px;width:352px;height:226px"></div>'
    b += box(x, 290, 352, 6, f"background:{ORANGE};border-radius:12px 12px 0 0")
    b += txt(x + 24, 316, 304, "h2", esc(name))
    b += items(x + 24, 364, 304, [("", l) for l in lines], numbered=False, gap=12, cls="small")
b += f'<div class="abs" style="left:64px;top:536px;width:1152px;height:56px;background:#FFF1E0;border:1px solid #F3C894;border-radius:12px"></div>'
b += txt(88, 552, 1110, "small", "<b>One platform behind them.</b> Readings and status from all three sit in one place.", "line-height:24px")
b += f'<div class="abs" style="left:64px;top:610px;width:1152px;height:48px;border:1px dashed #A9A9A4;border-radius:12px"></div>'
b += pill(78, 617, 110, "DIRECTION", "#fff", ORANGE_INK, f"border:1px solid {ORANGE_INK};font-size:12px;letter-spacing:1px;height:34px")
b += txt(204, 623, 990, "small", "Going forward, new environment products go under Connected Environment.", "line-height:22px")
b += foot(3)
slide(b, """
Connected Environment is one umbrella in the portal.
Under it sit Weather Station, Lightning and Gas, each with its own screens and devices.
They share one platform: one backend, one menu and header. A project switches on only the products it uses.
The last line, new environment products go under it, is our stated direction. It is not a shipped feature, so say it as direction.
""")

# ---------------------------------------------------------------- 4 weather station
b = head("Weather Station", "A heat number is not an answer")
b += items(64, 188, 400, [
    ("A verdict, in words.", "The strip says Danger and the steps to take, in priority order."),
    ("The cycle in force.", "The heat card shows work, rest and water for the crew."),
    ("Station health.", "An offline station is named, and readiness reads Not ready."),
    ("Your readings.", "The gear, Select parameters, chooses which readings are featured."),
], gap=22)
ix, iy, iw_ = 520, 188, 696
s, h = img("ws-top", ix, iy, iw_)
b += s
k = iw_ / 1640
b += callout(1, ix + 936 * k, iy + 43 * k)
b += callout(2, ix + 320 * k, iy + 270 * k)
b += callout(3, ix + 1218 * k, iy + 395 * k)
b += callout(4, ix + 1184 * k, iy + 163 * k)
s2, h2 = img("ws-steps", 888, iy + h - 84, 320, "border:3px solid #fff;outline:1px solid #C9C9C4")
b += s2
b += txt(520, iy + h + 14, 350, "cap", "Live production screens, 4 October 2026. Station names blurred.")
b += txt(520, iy + h + 52, 350, "cap", "Inset: View Recommended Steps. The first action is marked Do first.", "color:#2B2B2B")
b += foot(4)
slide(b, """
A heat number does not tell a supervisor what to do. The strip across the top does: Danger, in words, and an instruction.
One: View Recommended Steps opens the actions in priority order. First, pause outdoor work and move crews to shade or rest. Then notify the site safety officer.
Two: the heat card carries the cycle in force. Work time, rest time, and drinking water.
Three: station health. An offline station is named, and readiness reads Not ready.
Four: the gear opens Select parameters. It chooses which readings are featured. Each station also has a rename pencil.
""")

# ---------------------------------------------------------------- 5 reports and policy
b = head("Weather Station · Reports and Safety Policy", "Look back at the heat. Check what stops work.")
colx = [64, 664]
heads = [("Reports", "Maximum Values Report"), ("Settings, Weather Station", "Site Safety Policy")]
pics = ["ws-reports", "ws-limits"]
for (lab, ttl), x, pic in zip(heads, colx, pics):
    b += txt(x, 172, 552, "lab", esc(lab))
    b += txt(x, 192, 552, "h2", esc(ttl))
    s, h = img(pic, x, 236, 552)
    b += s
b += items(64, 236 + h + 22, 552, [
    ("", "Pick a period, today to the last 30 days, or a custom range."),
    ("", "Peak heat index and peak wind speed, a daily breakdown, and an Excel export."),
], numbered=False, gap=10, cls="small")
b += items(664, 236 + h + 22, 552, [
    ("", "Temperature and wind limits show what they would have done in the last 30 days."),
    ("", "Heat index bands, each with its own work, rest and water settings. A Change history tab lists changes."),
], numbered=False, gap=10, cls="small")
b += banner(64, 602, 1152, 52, "CAREFUL", "The page warns: changing anything here changes when work stops, for everyone on the project.")
b += foot(5)
slide(b, """
Two more places.
Reports: pick a period and see the peak heat index and peak wind speed across stations, with a daily breakdown and an Excel export.
Settings, Weather Station holds the Site Safety Policy. Stop-work limits. For temperature and wind, a 30 day chart shows what the limit would have done. On the project in this screenshot, temperature would have stopped work on eight of the last 30 days, and wind on one. Those are values at capture time.
Below the limits are the heat index bands, each with work, rest and water settings, and a Change history tab.
Say the warning out loud: the page says changing anything here changes when work stops, for everyone on the project.
""")

# ---------------------------------------------------------------- 6 lightning
b = head("Lightning", "A backup, not the alarm")
b += items(64, 188, 400, [
    ("Cabinet lights and sounder first.", "The page's top line says so."),
    ("Only green is safe to work.", "The tile reads All Clear, with a held-for timer."),
    ("Alert distances, on a map.", "Red and yellow rings and a dot for the sensor. A zone reference, not a live strike position."),
    ("History you can export.", "An alarm activity chart, and an alarm history with CSV export."),
], gap=22)
ix, iy, iw_ = 520, 188, 696
s, h = img("lt-top", ix, iy, iw_)
b += s
s2, h2 = img("lt-wall", 888, iy + h - 40, 320, "border:3px solid #fff;outline:1px solid #C9C9C4")
b += s2
b += txt(520, iy + h + 14, 340, "cap", "Live production screens, 4 October 2026. Map blurred.")
b += txt(520, iy + h + 52, 340, "cap", "Inset: the wallboard view. Wallboard and phone views open by web address, not from the menu.", "color:#2B2B2B")
b += banner(64, 604, 1152, 52, "ON THE PAGE", "WakeCap lightning alerts are a backup. Always follow the site's cabinet lights and sounder first.", "#EAF6EF", "#BFE3CE")
b += foot(6)
slide(b, """
Lightning is close. Who tells the crew to stop? The site's own cabinet lights and sounder, first. This page is the backup, and its top line says so.
Only the green state counts as safe to work.
The rings are the configured alert distances. They are a zone reference, not a live strike position.
New here: a map of the alert distances, an alarm activity chart, and an alarm history you can export as CSV.
The wallboard and phone views, shown in the inset, open by web address, not from the menu.
Settings, Lightning lets you edit the alert distances and set the location.
""")

# ---------------------------------------------------------------- 7 gas
b = head("Gas", "A quiet screen is not a safe screen")
b += items(64, 188, 400, [
    ("Overview.", "Detectors, how many are online, live alarms, and the worst current reading per gas, each with its limits."),
    ("Gaps are named.", "A detector that stops reporting shows as offline. The status reads Check: not confirmed safe."),
    ("Alerts.", "Acknowledge and close, with edit access. Recorded in WakeCap only, not sent to the gas vendor."),
    ("Compliance.", "Limits in force. Exposure and exceedance figures say Not available yet."),
], gap=20, cls="small")
ix, iy, iw_ = 520, 188, 696
s, h = img("gas-dash", ix, iy, iw_)
b += s
s2, h2 = img("gas-wall", 868, iy + h - 40, 340, "border:3px solid #fff;outline:1px solid #C9C9C4")
b += s2
b += txt(520, iy + h + 14, 330, "cap", "Live production screens, 4 October 2026.")
b += txt(520, iy + h + 38, 330, "cap", "Inset: the wallboard view, by web address.", "color:#2B2B2B")
b += banner(64, 604, 1152, 52, "NOTE", "Acknowledge and close are recorded in WakeCap only. They are not sent to the gas vendor.")
b += foot(7)
slide(b, """
A quiet gas screen is not a safe gas screen.
The Gas dashboard opens on Overview. Five detectors, four online. Live alarms counts alerts nobody has acknowledged. Each gas card shows the worst current reading among the detectors that are reporting, with its limits.
When a detector stops reporting, the page names it, and the status reads Check: not confirmed safe.
Alerts can be acknowledged and closed, with edit access. Be explicit: that is recorded in WakeCap only. It is not sent to the gas vendor, so an alert closed here stays open in the vendor's system.
Compliance lists the limits. Exposure and exceedance figures say Not available yet, instead of an empty chart that reads as all clear.
""")

# ---------------------------------------------------------------- 8 platform
b = head("The platform", "Each project switches on only what it uses")
cols = [("Weather Station", 330), ("Lightning", 470), ("Gas", 610)]
b += f'<div class="card" style="left:64px;top:180px;width:700px;height:300px"></div>'
b += txt(88, 200, 220, "lab", "Project", "color:#6B6B6B")
for name, cx in cols:
    b += txt(cx - 20, 200, 140, "lab", esc(name), "color:#6B6B6B;text-align:center;width:140px;letter-spacing:0.5px;font-size:12px")
rows = [("Weather alone", (1, 0, 0)), ("Lightning alone", (0, 1, 0)), ("Weather with Gas", (1, 0, 1))]
for r, (label, st) in enumerate(rows):
    y = 244 + r * 76
    b += box(88, y - 12, 652, 1, f"background:{LINE}")
    b += txt(88, y + 8, 220, "body", esc(label), "font-weight:700;color:#0C0C0C")
    for (name, cx), on in zip(cols, st):
        sx = cx + 50 - 23
        bgc = "#1F3A8A" if on else "#C9C9C4"
        b += f'<div class="sw" style="left:{sx}px;top:{y + 8}px;background:{bgc}"></div>'
        kx = sx + (23 if on else 3)
        b += f'<div class="kn" style="left:{kx}px;top:{y + 11}px"></div>'
b += txt(88, 440, 660, "cap", "Active or Inactive, one switch per product. Three real projects.")
b += items(808, 188, 408, [
    ("Settings, then Connected Products.", "One switch per product on a project."),
    ("The menu follows.", "A project's menu shows only what it has switched on."),
    ("One shell.", "One menu and header across all three products."),
], numbered=False, gap=22, cls="body")
s, h = img("prod-c", 64, 504, 780)
b += s
b += txt(868, 508, 348, "cap", "Live screen: Connected Products on a project with Weather Station and Gas on. Nothing was switched for this deck.")
b += foot(8)
slide(b, """
Each project switches on only what it uses.
In Settings, Connected Products has one Active or Inactive switch per product. The table is drawn from three real projects: Weather alone, Lightning alone, and Weather with Gas. The strip below is the live screen.
The menu shows what is on.
We did not switch anything on or off for this deck.
If someone asks how to enable a product: Settings, Connected Products. It changes a real project, so do it with the project owner.
""")

# ---------------------------------------------------------------- 9 paths
b = head("How readings arrive", "Three roads in, one platform behind them")
lanes = [
    ("Weather", ["Weather station", "Site wireless mesh", "Gateway", "WakeCap cloud decodes and stores"]),
    ("Lightning", ["Sensor and input module", "Modbus device on the mesh", "Gateway", "WakeCap cloud, unreadable data set aside"]),
    ("Gas", ["Gas detectors", "Vendor's cloud, a black box to us", "WakeCap asks on a regular timer", "WakeCap stores readings and alerts"]),
]
for r, (lane, boxes) in enumerate(lanes):
    y = 180 + r * 112
    b += pill(64, y + 22, 128, lane, INK, "#fff")
    for c, label in enumerate(boxes):
        x = 224 + c * 248
        last = c == 3
        b += cbox(x, y, 200, 78, label, "#FFF1E0" if last else "#fff", "#F3C894" if last else LINE, 176)
        if c < 3:
            b += txt(x + 204, y + 24, 40, "h2", "→", f"color:{ORANGE};text-align:center;width:40px;font-size:26px")
b += f'<div class="abs" style="left:64px;top:528px;width:1152px;height:64px;background:{INK};border-radius:12px"></div>'
b += txt(96, 542, 1090, "h3", 'All three reach the same portal: <span class="o">Connected Environment.</span>', "color:#fff;font-size:22px;line-height:36px")
b += txt(64, 610, 1152, "cap", "Gas has no mesh and no Modbus. Each detector reports on its own schedule, so each reading shows its age. Modbus is an industrial wiring and data standard many sensors speak.")
b += foot(9)
slide(b, """
Different roads in, one platform behind them.
Weather stations reach WakeCap over the site's wireless mesh, through a gateway, into the cloud, which decodes and stores the readings.
Lightning is read through a small input module and shows on the mesh as a Modbus device. Modbus is an industrial wiring and data standard many sensors speak. Anything unreadable is set aside.
Gas takes another road: the vendor's cloud. No mesh, no Modbus. WakeCap asks that cloud on a regular timer, and each detector reports on its own schedule, so each reading shows its age.
Do not quote polling or reporting intervals. We have not verified numbers.
""")

# ---------------------------------------------------------------- 10 limits and direction
b = head("Honest edges", "What it does not do yet, and where it is going")
b += f'<div class="card" style="left:64px;top:176px;width:560px;height:396px"></div>'
b += box(64, 176, 560, 6, f"background:{INK};border-radius:12px 12px 0 0")
b += txt(92, 202, 500, "h2", "Good to know")
b += items(92, 252, 504, [
    ("Gas acknowledge and close", "are recorded in WakeCap only, not sent to the gas vendor."),
    ("Gas exposure and compliance figures", "say Not available yet. Some gas history is not stored yet."),
    ("Trends", "sits in the menu marked Planned."),
    ("The AI assistant", "is direction only. Building blocks exist for Weather Station only. No assistant runs on any site."),
], numbered=False, gap=18, cls="body")
b += f'<div class="abs" style="left:664px;top:176px;width:552px;height:396px;border:2px dashed #A9A9A4;border-radius:12px"></div>'
b += pill(692, 198, 110, "DIRECTION", "#fff", ORANGE_INK, f"border:1px solid {ORANGE_INK};font-size:12px;letter-spacing:1px")
b += txt(692, 246, 496, "h2", "Direction, not a commitment")
b += items(692, 296, 496, [
    ("New environment products", "go under Connected Environment."),
    ("A future assistant", "could read weather readings and propose changes. A person approves."),
    ("The weather safety answer", "comes from fixed rules. An assistant would only reword it."),
    ("", "No dates are promised."),
], numbered=False, gap=18, cls="body")
b += foot(10)
slide(b, """
Be plain about the edges.
Gas acknowledge and close are recorded in WakeCap only. Gas exposure and compliance figures say Not available yet, and some gas history is not stored yet. Trends is in the menu marked Planned.
The AI assistant is direction only. Building blocks exist for Weather Station only. No assistant runs on any site.
Direction: new environment products go under Connected Environment. A future assistant could read weather readings and propose changes. A person approves, and the weather safety answer comes from fixed rules. We promise no dates.
""")

# ---------------------------------------------------------------- 11 watch and try
b = head("Watch and try", "Five short videos, and one place to start")
vids = [
    ("Connected Environment overview", "3:21", "One umbrella over weather, lightning and gas."),
    ("Weather Station", "2:18", "The verdict, steps, Reports and Site Safety Policy."),
    ("Lightning", "2:08", "A backup alert view, alert distances and history."),
    ("Gas", "2:32", "Overview, Check, alerts and compliance limits."),
    ("Setup tour", "4:33", "Explore, feature, enable and configure, with voice-over."),
]
for i, (t, d, one) in enumerate(vids):
    y = 176 + i * 88
    b += f'<div class="card" style="left:64px;top:{y}px;width:664px;height:76px"></div>'
    b += f'<div class="mk" style="position:absolute;left:84px;top:{y + 24}px;margin:0">{i + 1}</div>'
    b += txt(128, y + 12, 470, "h3", esc(t), "font-size:20px;line-height:26px")
    b += txt(128, y + 42, 520, "cap", esc(one))
    b += pill(634, y + 21, 74, d, "#fff", INK, f"border:1px solid {LINE};font-size:14px")
b += f'<div class="card" style="left:768px;top:176px;width:448px;height:428px"></div>'
b += box(768, 176, 448, 6, f"background:{ORANGE};border-radius:12px 12px 0 0")
b += txt(796, 202, 400, "h2", "Try it")
b += items(796, 250, 392, [
    ("Open your project", "in the portal."),
    ("In the left rail,", "click the sun-and-cloud icon: Connected Environment, if your project has it."),
    ("Read the top line first.", "Weather verdict, Lightning banner, Gas status."),
    ("Ask.", "Questions now, or after."),
], gap=18, cls="small")
b += banner2(784, 476, 416, 112, "CAREFUL", "Look, do not switch. Enabling a product or changing a policy changes a real project.")
b += txt(64, 624, 1152, "cap", "All five videos show live production screens, read only.")
b += foot(11)
slide(b, """
Where to watch: five short videos. Start with the overview. The setup tour shows how to enable and configure each product, read only on production.
To try it: open your project in the portal, then click the sun-and-cloud icon in the left rail. That is Connected Environment, if your project has it.
Read the top line first: the Weather verdict, the Lightning banner, the Gas status.
Then take questions. The next slides are the appendix: setup flows, what we say and do not say, and a glossary.
""")

# ---------------------------------------------------------------- 12 appendix: setup
b = head("Appendix · Setup", "How products are enabled and configured")
steps = [
    ("Choose what to feature", "Weather Station page, gear", ["Select parameters: one switch per reading.", "Each card can also move or leave the area."], "ws-gear-thumb"),
    ("Enable products", "Settings, Connected Products", ["One Active or Inactive switch per product.", "Changes a real project."], None),
    ("Configure Weather Station", "Settings, Weather Station", ["Site Safety Policy: limits, heat index bands, method, change history.", "Changes when work stops, for the whole project."], "ws-limits-thumb"),
    ("Configure Lightning", "Settings, Lightning", ["Edit alerting radii: red, yellow, all-clear delay.", "Set location: click the map or type coordinates."], "lt-settings"),
]
BAND = 132
for i, (t_, where, lines, th) in enumerate(steps):
    x = 64 + i * 292
    b += f'<div class="card" style="left:{x}px;top:176px;width:272px;height:380px"></div>'
    b += f'<div class="mk" style="position:absolute;left:{x + 18}px;top:194px;margin:0">{i + 1}</div>'
    b += txt(x + 56, 194, 200, "h3", esc(t_), "font-size:18px;line-height:24px")
    b += txt(x + 18, 252, 240, "lab", esc(where), "font-size:11px;letter-spacing:0.5px;line-height:15px")
    if th:
        iw0, ih0 = Image.open(os.path.join(A, th + ".png")).size
        hh = round(236 * ih0 / iw0)
        s, h = img(th, x + 18, 290 + max(0, (BAND - hh) // 2), 236)
        b += s
    else:
        for r_, (nm, on) in enumerate((("Weather Station", 1), ("Gas", 0), ("Lightning", 0))):
            yy = 296 + r_ * 40
            b += txt(x + 24, yy + 3, 130, "cap", nm, "color:#2B2B2B;font-size:14px")
            b += f'<div class="sw" style="left:{x + 196}px;top:{yy}px;width:40px;height:22px;border-radius:11px;background:{"#1F3A8A" if on else "#C9C9C4"}"></div>'
            b += f'<div class="kn" style="left:{x + 196 + (20 if on else 2)}px;top:{yy + 2}px;width:18px;height:18px;border-radius:9px"></div>'
    b += items(x + 18, 290 + BAND + 16, 236, [("", l) for l in lines], numbered=False, gap=8, cls="cap")
b += txt(64, 580, 1152, "small", "<b>Gas</b> has no settings page. Its limits are shown, read only, on the Compliance page. The setup tour video (4:33) walks through all of this.", "line-height:22px")
b += foot(12)
slide(b, """
Appendix: the setup flow, in order.
Choose what to feature: the gear on the Weather Station page opens Select parameters.
Enable: Settings, Connected Products, one switch per product.
Configure Weather Station: Settings, Weather Station, the Site Safety Policy.
Configure Lightning: Settings, Lightning. Edit alerting radii and Set location.
Gas has no settings page. Its limits are read only on the Compliance page.
The setup tour video walks through all of it. Remind the audience that enabling a product and changing a policy both affect a real project.
""")

# ---------------------------------------------------------------- 13 appendix: say / do not say
b = head("Appendix · Careful wording", "What we say, and what we do not say")
say = [
    "Connected Environment 1.0 is live. Weather Station, Lightning and Gas are in it today.",
    "Lightning is a backup. The site's cabinet lights and sounder come first.",
    "Gas acknowledge and close are recorded in WakeCap only.",
    "The AI assistant is direction only.",
    "New environment products go under it. (Direction, no dates.)",
]
dont = [
    "That a site is safe.",
    "One rule set, or one audit trail.",
    "A go-live date, or any expansion plan.",
    "That the assistant approves or runs anything.",
    "That gas exposure or compliance figures exist today.",
]
for x, ttl, rows, col in ((64, "Say", say, GREEN), (664, "Do not say", dont, RED)):
    b += f'<div class="card" style="left:{x}px;top:176px;width:552px;height:380px"></div>'
    b += box(x, 176, 552, 6, f"background:{col};border-radius:12px 12px 0 0")
    b += txt(x + 28, 202, 500, "h2", ttl)
    b += items(x + 28, 254, 496, [("", r) for r in rows], numbered=False, gap=16, cls="body")
b += foot(13)
slide(b, """
Cheat sheet for questions.
Say: it is live; Lightning is a backup; gas close is recorded in WakeCap only; the assistant is direction only; new products go under it, as direction.
Do not say: that a site is safe; one rule set or one audit trail; a go-live date or expansion plan; that the assistant approves anything; that gas exposure or compliance figures exist today.
""")

# ---------------------------------------------------------------- 14 appendix: glossary
b = head("Appendix · Glossary", "Terms used in the videos and on the screens")
terms = [
    ("Verdict strip", "The bar across the top of Weather Station: the state in words, and the steps to take."),
    ("Heat index", "The heat number the policy uses, with a band such as Danger."),
    ("Readiness", "Whether the stations or detectors can be relied on. Not ready lists what needs attention, such as an offline station."),
    ("Alert distances", "Lightning reference rings, red and yellow. A zone, not a live strike position."),
    ("Held for", "How long the current Lightning state has lasted."),
    ("Wallboard view", "A large-type page for a site screen. Opens by web address."),
    ("Live alarms / Acknowledged", "Gas: alerts nobody has acknowledged, and open alerts that are being handled."),
    ("Modbus", "An industrial wiring and data standard many sensors speak."),
]
for i, (t, d) in enumerate(terms):
    col, row = i % 2, i // 2
    x, y = 64 + col * 584, 176 + row * 112
    b += f'<div class="card" style="left:{x}px;top:{y}px;width:568px;height:98px"></div>'
    b += txt(x + 24, y + 14, 520, "h3", esc(t), "font-size:19px;line-height:24px")
    b += txt(x + 24, y + 44, 520, "small", esc(d), "font-size:15px;line-height:21px")
b += foot(14)
slide(b, """
Glossary, for reference. Nothing here needs to be read out.
""")


page = "".join(slides)
out = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Connected Environment 1.0</title><style>{CSS}</style></head><body>{page}</body></html>"""
open(os.path.join(HERE, "deck.html"), "w").write(out)
print("deck.html written,", len(slides), "slides")
