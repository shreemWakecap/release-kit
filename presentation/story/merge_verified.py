#!/usr/bin/env python3
"""merge_verified.py: merge researched claims (research/S*.json) with verifier verdicts found in the research workflow journal
-> research/verified-numbers.json (+ .md). Re-run any time; it uses whatever verdicts exist so far."""
import glob, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
RES = os.path.join(HERE, "research")
JOURNAL = sys.argv[1] if len(sys.argv) > 1 else "/Users/admin/.claude/projects/-Users-admin-wc/549729bc-a053-475a-9ba5-66a2cbce47c2/subagents/workflows/wf_5f482f11-3c2/journal.jsonl"
verd = {}
for line in open(JOURNAL):
    try: r = json.loads(line)
    except Exception: continue
    res = r.get("result")
    if r.get("type") == "result" and isinstance(res, dict) and "verdicts" in res:
        for v in res["verdicts"]: verd[v["id"]] = v
claims = []
for f in sorted(glob.glob(os.path.join(RES, "S*.json"))):
    d = json.load(open(f)); cl = d["claims"] if isinstance(d, dict) else d
    claims += cl
out = []
for c in claims:
    v = verd.get(c["id"])
    out.append({**c, "verdict": v["verdict"] if v else "pending", "verified_quote": (v or {}).get("exact_quote", ""), "corrected_figure": (v or {}).get("corrected_figure", ""), "verifier_note": (v or {}).get("note", ""), "page_date": (v or {}).get("page_date", "")})
json.dump(out, open(os.path.join(RES, "verified-numbers.json"), "w"), indent=1)
from collections import Counter
cnt = Counter(o["verdict"] for o in out)
md = ["# Verified numbers (merged from researchers and verifiers)", "", f"{len(out)} claims: " + ", ".join(f"{k} {v}" for k, v in cnt.items()), ""]
for o in out:
    if o["verdict"] in ("verified", "partial"):
        md.append(f"- **{o['id']}** [{o['verdict']}] {o['figure']} ({o['publisher']}, {o['year']}, {o['region']}). {o['measures'][:160]} <{o['url']}>" + (f" Corrected: {o['corrected_figure']}." if o["corrected_figure"] else "") + (f" Note: {o['verifier_note'][:200]}" if o["verdict"] == "partial" else ""))
open(os.path.join(RES, "verified-numbers.md"), "w").write("\n".join(md))
print(dict(cnt))
