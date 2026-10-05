#!/usr/bin/env python3
"""check_pptx.py: independent check of connected-environment-1.0.pptx (no PowerPoint needed).
Re-reads the PPTX, redraws every slide from the file itself (shapes, pictures, wrapped text with real Arial metrics),
flags text that would overflow its box or shapes outside the slide, and compares with the Chrome render.
Run with the venv: .venv/bin/python check_pptx.py   -> qa/pptx-NN.png + a report
"""
import io, os, sys
from pptx import Presentation
from pptx.util import Pt
from pptx.enum.shapes import MSO_SHAPE_TYPE
from PIL import Image, ImageDraw, ImageFont, ImageChops, ImageStat

HERE = os.path.dirname(os.path.abspath(__file__))
PPTX = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "connected-environment-1.0.pptx")
PX = 9525
FDIR = "/System/Library/Fonts/Supplemental/"
FONT_FILES = {(False, False): "Arial.ttf", (True, False): "Arial Bold.ttf", (False, True): "Arial Italic.ttf", (True, True): "Arial Bold Italic.ttf"}
_cache = {}


def font(size_px, bold, italic):
    k = (round(size_px * 4), bool(bold), bool(italic))
    if k not in _cache:
        _cache[k] = ImageFont.truetype(FDIR + FONT_FILES[(bool(bold), bool(italic))], size=max(1, round(size_px * 4)))  # 4x for sub-pixel accuracy
    return _cache[k]


def measure(text, size_px, bold, italic, spacing_px=0.0):
    return font(size_px, bold, italic).getlength(text) / 4.0 + spacing_px * len(text)


def paragraph_tokens(p):
    """-> list of ('br',) or (word, size_px, bold, italic, color, spacing_px) with spaces kept as separate tokens"""
    toks = []
    for el in p._p:
        tag = el.tag.split("}")[1]
        if tag == "br":
            toks.append(("br",))
        elif tag == "r":
            rPr = el.find("{http://schemas.openxmlformats.org/drawingml/2006/main}rPr")
            size = int(rPr.get("sz", "1800")) / 100 / 0.75 if rPr is not None else 24
            bold = rPr is not None and rPr.get("b") == "1"
            italic = rPr is not None and rPr.get("i") == "1"
            spc = int(rPr.get("spc", "0")) / 100 / 0.75 if rPr is not None else 0
            color = (0, 0, 0)
            if rPr is not None:
                c = rPr.find(".//{http://schemas.openxmlformats.org/drawingml/2006/main}srgbClr")
                if c is not None:
                    h = c.get("val")
                    color = (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))
            t = el.find("{http://schemas.openxmlformats.org/drawingml/2006/main}t").text or ""
            import re
            for w in re.findall(r"\S+|\s+", t):
                toks.append((w, size, bold, italic, color, spc))
    return toks


def layout_text(shape, wrap=True):
    """-> (lines, line_height_px). lines: list of list of (text, size, bold, italic, color, spacing, x_offset)"""
    tf = shape.text_frame
    width = shape.width / PX
    out, lh_px = [], None
    for p in tf.paragraphs:
        ls = p.line_spacing
        lh = (ls.pt / 0.75) if ls is not None and hasattr(ls, "pt") else None
        toks = paragraph_tokens(p)
        cur, curw = [], 0.0
        for t in toks:
            if t[0] == "br":
                out.append(cur); cur, curw = [], 0.0
                continue
            w = measure(t[0], t[1], t[2], t[3], t[5])
            if wrap and t[0].strip() and cur and curw + w > width + 0.01:
                while cur and not cur[-1][0].strip():
                    curw -= cur[-1][6]; cur.pop()
                out.append(cur); cur, curw = [], 0.0
            if not cur and not t[0].strip():
                continue
            cur.append(t + (w,)); curw += w
        out.append(cur)
        if lh:
            lh_px = lh
    return out, lh_px or 24.0


def align_of(shape):
    p = shape.text_frame.paragraphs[0]
    return {None: "l", 1: "l", 2: "c", 3: "r"}.get(int(p.alignment) if p.alignment is not None else None, "l")


prs = Presentation(PPTX)
W, H = prs.slide_width / PX, prs.slide_height / PX
problems = []
scores = []
for si, slide in enumerate(prs.slides, 1):
    bgc = slide.background.fill.fore_color.rgb
    img = Image.new("RGB", (int(W), int(H)), (bgc[0], bgc[1], bgc[2]))
    d = ImageDraw.Draw(img)
    for shp in slide.shapes:
        x, y, w, h = shp.left / PX, shp.top / PX, shp.width / PX, shp.height / PX
        if x < -1 or y < -1 or x + w > W + 1 or y + h > H + 1:
            problems.append(f"slide {si}: '{shp.name}' outside the slide ({x:.0f},{y:.0f},{w:.0f},{h:.0f})")
        if shp.shape_type == MSO_SHAPE_TYPE.PICTURE:
            pic = Image.open(io.BytesIO(shp.image.blob)).convert("RGB").resize((max(1, round(w)), max(1, round(h))), Image.LANCZOS)
            img.paste(pic, (round(x), round(y)))
            continue
        if shp.shape_type == MSO_SHAPE_TYPE.AUTO_SHAPE or (shp.shape_type == MSO_SHAPE_TYPE.PLACEHOLDER and not shp.has_text_frame):
            spPr = shp._element.spPr
            fill = None
            sf = spPr.find("{http://schemas.openxmlformats.org/drawingml/2006/main}solidFill")
            if sf is not None:
                c = sf.find("{http://schemas.openxmlformats.org/drawingml/2006/main}srgbClr").get("val")
                fill = (int(c[0:2], 16), int(c[2:4], 16), int(c[4:6], 16))
            ln = spPr.find("{http://schemas.openxmlformats.org/drawingml/2006/main}ln")
            line, lw = None, 1
            if ln is not None and ln.find("{http://schemas.openxmlformats.org/drawingml/2006/main}solidFill") is not None:
                c = ln.find(".//{http://schemas.openxmlformats.org/drawingml/2006/main}srgbClr").get("val")
                line = (int(c[0:2], 16), int(c[2:4], 16), int(c[4:6], 16))
                lw = max(1, round(int(ln.get("w", "9525")) / PX))
            kind = shp.auto_shape_type
            box = [x, y, x + w, y + h]
            name = str(kind)
            if "OVAL" in name:
                d.ellipse(box, fill=fill, outline=line, width=lw)
            elif "ROUNDED" in name:
                r = shp.adjustments[0] * min(w, h)
                d.rounded_rectangle(box, radius=r, fill=fill, outline=line, width=lw)
            else:
                d.rectangle(box, fill=fill, outline=line, width=lw)
            continue
        if shp.has_text_frame and shp.text_frame.text.strip():
            wrap = shp.text_frame.word_wrap is not False
            lines, lh = layout_text(shp, wrap)
            need = len(lines) * lh
            if need > h + 3:
                problems.append(f"slide {si}: text overflows its box by {need - h:.0f}px ('{shp.text_frame.text[:50]}...') need {need:.0f}, box {h:.0f}")
            al = align_of(shp)
            for li, line in enumerate(lines):
                lw_ = sum(t[6] for t in line)
                tx = x + {"l": 0, "c": (w - lw_) / 2, "r": w - lw_}[al]
                cy = y + li * lh + lh / 2
                for t in line:
                    f1 = ImageFont.truetype(FDIR + FONT_FILES[(bool(t[2]), bool(t[3]))], size=max(1, round(t[1])))
                    a1, d1 = f1.getmetrics()
                    d.text((tx, cy + (a1 - d1) / 2.0), t[0], font=f1, fill=t[4], anchor="ls")
                    tx += t[6]
    out = os.path.join(HERE, "qa", f"pptx-{si:02d}.png")
    img.save(out)
    ref = Image.open(os.path.join(HERE, "qa", f"slide-{si:02d}.png")).convert("RGB").resize((int(W), int(H)), Image.LANCZOS)
    diff = ImageChops.difference(img, ref).convert("L")
    scores.append(ImageStat.Stat(diff).mean[0])

print("PPTX:", os.path.basename(PPTX), "|", len(prs.slides), "slides | slide size", int(W), "x", int(H), "px")
print("mean pixel difference vs Chrome render per slide:", " ".join(f"{s:.1f}" for s in scores))
print("problems:", len(problems))
for p in problems:
    print("  -", p)
