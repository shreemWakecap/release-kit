#!/usr/bin/env python3
"""make_guide.py: slides.json (titles + speaker notes) -> presenter-guide.md
The per-slide talk track is the same text as the PPTX speaker notes, so the two cannot drift apart.
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
data = json.load(open(os.path.join(HERE, "slides.json")))
html = open(os.path.join(HERE, "deck.html")).read()
titles = [re.sub(r"<[^>]+>", "", m).strip() for m in re.findall(r"<h1[^>]*>(.*?)</h1>", html, flags=re.S)]
titles[0] = "Connected Environment 1.0"

# minutes per slide for the 12 minute version (slides 1 to 11); appendix has none
minutes = [0.5, 1, 1, 1.5, 1.25, 1.25, 1.5, 0.75, 1, 1, 0.75]
cue = {
    3: "Play the overview video here (3:21) if you have time, or at the end.",
    4: "Optional: Weather Station video (2:18).",
    6: "Optional: Lightning video (2:08).",
    7: "Optional: Gas video (2:32).",
    8: "If asked how to enable or configure: setup tour (4:33), or appendix slide 12.",
}

L = []
A = L.append
A("# Connected Environment 1.0: presenter guide")
A("")
A("For the internal release presentation. Assumes an internal audience (product, delivery, support, sales engineering) and about 12 minutes of talk plus questions. Nothing in this folder was posted or sent.")
A("")
A("**Files:** `connected-environment-1.0.pptx` (editable, speaker notes on every slide), `connected-environment-1.0.pdf` (to present or share), `one-pager.pdf` (leave-behind), this guide. Videos: `../four-videos/final/`.")
A("")
A("## Run of show")
A("")
A("| Slide | Title | Min | Cue |")
A("|---|---|---|---|")
total = 0
for i, m in enumerate(minutes, 1):
    total += m
    A(f"| {i} | {titles[i - 1]} | {m:g} | {cue.get(i, '')} |")
A(f"| | **Talk total** | **{total:g}** | Add 3:21 if you play the overview video. Questions: 5 min. |")
A("")
A("**Short version (about 8 minutes):** slides 1, 2, 3, 10 and 11, then play the overview video (3:21).")
A("")
A("**Appendix (not presented, kept for questions):** 12 setup flows, 13 careful wording, 14 glossary.")
A("")
A("## Talk track")
A("")
for i, sd in enumerate(data["slides"], 1):
    A(f"### {i}. {titles[i - 1]}" + ("  (appendix)" if i > 11 else ""))
    A("")
    for line in sd["notes"].strip().splitlines():
        if line.strip():
            A(f"> {line.strip()}")
            A(">")
    L.pop()  # trailing quote spacer
    A("")
A("## Likely questions, with answers you can say")
A("")
qa = [
    ("What is in 1.0 today?",
     "Weather Station, Lightning and Gas, on one platform: one menu and header, and one place to switch products on per project (Settings, Connected Products)."),
    ("Can Lightning replace the site's own alarm?",
     "No. The page says it is a backup: the site's cabinet lights and sounder come first. Only the green state counts as safe to work."),
    ("If we close a gas alert in WakeCap, does it close at the gas vendor?",
     "No. It is recorded in WakeCap only. The page says an alert closed here stays open in the vendor's system."),
    ("Do we have gas exposure or compliance figures?",
     "Not yet. Those cards say Not available yet. Some gas history is not stored yet."),
    ("Is there an AI assistant?",
     "Direction only. Building blocks exist for Weather Station only, and no assistant runs on any site. A person approves. The weather safety answer comes from fixed rules."),
    ("How does a project get Gas or Lightning?",
     "Settings, Connected Products: one Active or Inactive switch per product. It changes a real project, so do it with the project owner. Who is allowed to change it was not verified: confirm before you promise."),
    ("What is new in Weather Station?",
     "Select parameters (the gear), Reports (Maximum Values Report with Excel export), the Site Safety Policy with 30 day charts for temperature and wind, heat index bands, a Change history tab, and station rename."),
    ("What time zone do the pages use?",
     "Saudi time, on every page."),
    ("Where do the readings come from?",
     "Slide 9. Weather over the site's wireless mesh. Lightning through an input module that shows as a Modbus device on the mesh. Gas through the vendor's cloud. Do not quote polling or reporting intervals."),
    ("What does Check mean on Gas?",
     "Not confirmed safe, for example when a detector is not reporting. It sits between Safe and Alert. It is not an all-clear."),
    ("Will new products go under Connected Environment?",
     "That is the direction. No dates and no names yet."),
]
for q, a in qa:
    A(f"- **{q}** {a}")
A("")
A("If you do not know, say so and take it away. Do not guess a date, a number or a permission.")
A("")
A("## Say, and do not say")
A("")
A("**Say:** Connected Environment 1.0 is live, with Weather Station, Lightning and Gas. Lightning is a backup. Gas acknowledge and close are recorded in WakeCap only. The AI assistant is direction only. New environment products go under it (direction, no dates).")
A("")
A("**Do not say:** that a site is safe. One rule set, or one audit trail. A go-live date or any expansion plan. That the assistant approves or runs anything. That gas exposure or compliance figures exist today. Who closed the three gas alerts on the screenshot.")
A("")
A("## If you show the portal live")
A("")
A("Safe to click: View Recommended Steps, Details, a station name (opens its panel), Reports period buttons, the Settings pages (look only), the Lightning and Gas pages.")
A("")
A("Do not click on production:")
A("- The Active or Inactive switches on Connected Products. They change a real project.")
A("- Save or Publish on the Site Safety Policy. It changes when work stops, for everyone on the project.")
A("- Acknowledge or Close on a gas alert.")
A("- Any Lightning simulate or dev switch.")
A("- Select parameters switches change your own featured cards (saved to your user). Put them back before you finish.")
A("")
A("## Where the facts come from")
A("")
A("- **Screens:** live production, captured 4 October 2026 (front end refreshed that day), read only. Station names, the top bar, the device label, coordinates and satellite maps are blurred or covered. Numbers on screens (a heat index of 49.5, temperature stopping work on 8 of 30 days) are values at capture, not typical values.")
A("- **Claims:** every spoken claim traces to the evidence column of `../four-videos/final/*.script.md` and to `../release-note.md`.")
A("- **Not verified, so not claimed:** feature-flag values; download and clipboard results; any edit, publish or audit-recording path; Lightning states other than All Clear at capture; backend deploy state; whether 'never falsely safe' holds for stale or faulty Lightning devices; polling intervals.")
A("")
A("## Rebuild")
A("")
A("Edit `gen_deck.py` (slides and notes) or the crops in `prep_assets.py`, then `./make.sh`. It renders the deck in Chrome, writes the PDF, builds the PPTX and runs `check_pptx.py`, which redraws the PPTX from the file and flags text that would overflow. Re-run `scan` (OCR) before sharing: see README.")
A("")
open(os.path.join(HERE, "presenter-guide.md"), "w").write("\n".join(L))
print("presenter-guide.md written,", len(L), "lines; talk total", total, "min")
