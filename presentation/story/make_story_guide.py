#!/usr/bin/env python3
"""make_story_guide.py: deck-notes.json -> ../story-presenter-guide.md (run of show, talk track per slide, 'If asked' answers)."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
defs = json.load(open(os.path.join(HERE, "deck-notes.json")))
L = ["# Connected Environment story: presenter guide", "",
     "Open `connected-environment-story.html` in Chrome. It works offline.", "",
     "**One press per slide:** press → once and the whole slide plays by itself. Press → again to skip to the end of the slide. Press → again to go on. Press J if you prefer one step per press.", "",
     "**Keys:** → or Space = next step · ← = back · O = all slides · N = notes · P = presenter window · S = short talk · F = full screen · B = black screen · L = laser · T = timer · M = calm · ? = help", ""]
short = [d for d in defs if d["short"]]
L += [f"**Full story:** {len(defs)} slides. **Short talk (S):** {len(short)} slides.", "", "## Run of show", "", "| # | Slide | Steps | Short talk | Minutes |", "|---|---|---|---|---|"]
for d in defs:
    L.append(f"| {d['n']} | {d['title']} | {d['steps']} | {'yes' if d['short'] else ''} | {d['minutes'] or ''} |")
L += ["", "## Talk track", ""]
for d in defs:
    L.append(f"### {d['n']}. {d['title']}" + ("  (not built yet)" if d["placeholder"] else ""))
    L.append("")
    main, asked = [], []
    for line in d["notes"].strip().splitlines():
        (asked if re.match(r"\s*If asked", line) else main).append(line.strip()) if line.strip() else None
    for line in main: L += [f"> {line}", ">"]
    if main: L.pop()
    if asked:
        strip_ask = lambda a: re.sub(r"^\s*If asked[^:]*:\s*", "", a)
        L += ["", "**If asked:**"] + ["- " + strip_ask(a) for a in asked]
    L.append("")
open(os.path.join(HERE, "..", "story-presenter-guide.md"), "w").write("\n".join(L))
print("guide written,", len(defs), "slides")
