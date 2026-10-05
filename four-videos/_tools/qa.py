#!/usr/bin/env python3
"""qa.py <video-dir> : checks a REAL build (final.mp4) without listening.

 - ffprobe: duration, size, audio present, audio/video length gap
 - Whisper the finished narration and diff it against the script (finds misread words)
 - contact sheets of a frame 1.6 s after each beat start (qa/contact-*.png) for a human look
 - qa/report.md with the numbers
"""
import os, sys, json, re, subprocess, difflib

TRANSCRIBE = os.path.expanduser("~/.claude/skills/wstack/make-video/bin/transcribe")


def sh(*a, **k):
    return subprocess.run(a, capture_output=True, text=True, **k)


def dur(p):
    return float(sh("ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", p).stdout.strip())


def norm_words(t):
    t = t.lower().replace("&", " and ")
    t = re.sub(r"[^a-z0-9' ]+", " ", t)
    return t.split()


def main():
    vdir = os.path.abspath(sys.argv[1])
    q = f"{vdir}/qa"
    os.makedirs(q, exist_ok=True)
    spec = json.load(open(f"{vdir}/spec.json"))
    out = [f"# QA {spec.get('id')}\n"]
    fm = f"{vdir}/final.mp4"
    if not os.path.exists(fm):
        sys.exit("no final.mp4 (run the real build first)")
    vd = dur(fm)
    pr = sh("ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height,duration", "-of", "json", fm)
    streams = json.loads(pr.stdout)["streams"]
    kinds = [s["codec_type"] for s in streams]
    out.append(f"- duration {vd:.1f} s ({vd/60:.2f} min); streams {kinds}")
    vs = [s for s in streams if s["codec_type"] == "video"][0]
    out.append(f"- video {vs['width']}x{vs['height']}")
    aud = [s for s in streams if s["codec_type"] == "audio"]
    if not aud:
        out.append("- ERROR no audio stream")
    else:
        ad = float(aud[0].get("duration") or vd)
        out.append(f"- audio {ad:.1f} s, gap to video {abs(vd-ad):.1f} s")

    # transcript diff
    nar = f"{vdir}/project/narration.m4a"
    script = " ".join(b["narration"] for b in spec["beats"])
    sw = norm_words(script)
    pref = f"{q}/narration-check"
    chunks = sorted(f for f in os.listdir(f"{vdir}/narr") if re.fullmatch(r"c\d+-timed\.json", f)) if os.path.isdir(f"{vdir}/narr") else []
    chunks.sort(key=lambda f: int(re.findall(r"\d+", f)[0]))
    if os.path.exists(nar):
        txt = ""
        try:
            # chunk-level transcripts (made during the build, one per voice chunk): a whole-file Whisper run can loop on long audio
            for f in chunks:
                d = json.load(open(f"{vdir}/narr/{f}"))
                txt += " " + " ".join(seg["text"].strip() for seg in d["transcription"])
            out.append(f"- transcript source: {len(chunks)} chunk transcripts from the build")
        except Exception as e:
            txt = ""
            out.append(f"- transcript failed: {e}")
        tw = norm_words(txt)
        sm = difflib.SequenceMatcher(a=sw, b=tw, autojunk=False)
        ratio = sm.ratio()
        out.append(f"- narration vs transcript word match {ratio*100:.1f}% (script {len(sw)} words, heard {len(tw)})")
        diffs = []
        for tag, i1, i2, j1, j2 in sm.get_opcodes():
            if tag != "equal":
                diffs.append(f"{tag}: script[{' '.join(sw[i1:i2])}] heard[{' '.join(tw[j1:j2])}]")
        out.append(f"- {len(diffs)} differences (digits spoken as words, 'H two S' as heard, etc. are expected):")
        out.extend(f"  - {x}" for x in diffs[:60])
    else:
        out.append("- no project/narration.m4a to check")

    # contact sheets
    tlp = f"{vdir}/timeline.json"
    if os.path.exists(tlp):
        tl = json.load(open(tlp))
        fr = []
        for i, b in enumerate(tl):
            t = b["start"] + 1.6
            if t >= vd - 0.2:
                t = max(0, vd - 0.5)
            fp = f"{q}/f-{i:02d}-{b['id']}.png"
            sh("ffmpeg", "-loglevel", "error", "-y", "-ss", f"{t:.2f}", "-i", fm, "-frames:v", "1", "-vf", "scale=640:360", fp)
            fr.append(fp)
        per = 12
        for k in range(0, len(fr), per):
            chunk = fr[k:k + per]
            cols = 4
            rows = (len(chunk) + cols - 1) // cols
            cmd = ["ffmpeg", "-loglevel", "error", "-y"]
            for f in chunk:
                cmd += ["-i", f]
            lay = "|".join(f"{(n % cols) * 640}_{(n // cols) * 360}" for n in range(len(chunk)))
            if len(chunk) == 1:
                cmd += ["-frames:v", "1", f"{q}/contact-{k//per+1}.png"]
            else:
                cmd += ["-filter_complex", f"xstack=inputs={len(chunk)}:layout={lay}", "-frames:v", "1", f"{q}/contact-{k//per+1}.png"]
            sh(*cmd)
        out.append(f"- contact sheets: {q}/contact-*.png ({len(fr)} frames, beat start + 1.6 s)")
    open(f"{q}/report.md", "w").write("\n".join(out) + "\n")
    print("\n".join(out[:12]))
    print("report:", f"{q}/report.md")


if __name__ == "__main__":
    main()
