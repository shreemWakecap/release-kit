# Connected Environment 1.0: presentation and material

Built 5 Oct 2026 from the live production screens captured 4 Oct 2026 (masked frames in `../four-videos/*/assets`). Internal audience assumed. Nothing was posted, sent or published.

| File | What it is |
|---|---|
| `connected-environment-1.0.pptx` | The deck, 14 slides (11 to present, 3 appendix). Editable text and shapes, Arial, speaker notes on every slide. |
| `connected-environment-1.0.pdf` | Same deck as PDF, to present or share. |
| `presenter-guide.md` | Run of show (12 min and 8 min), talk track, video cues, likely questions, say / do not say, what to click and not click if you show the portal live, where each fact comes from. |
| `one-pager.pdf` | A4 handout: the three products, good to know, where to find it, the five videos. |

Videos to play with it: `../four-videos/final/` (overview 3:21, Weather Station 2:18, Lightning 2:08, Gas 2:32, setup tour 4:33).

## Checked
- Every claim traces to `../four-videos/final/*.script.md` (evidence column) or `../release-note.md`. No ticket ids, build numbers, flag names or customer names on any slide.
- OCR scan of every slide and the one-pager: 0 hits (names, coordinates, Arabic text, initials, ids). Run `python3 scan_deck.py`.
- The PPTX was not opened in PowerPoint (none installed here). `check_pptx.py` redraws it from the file and reports 0 text overflows and nothing off the slide. Open it once in PowerPoint or Keynote and look at slides 4 and 9.

## Wording to keep
Lightning is a backup. Gas acknowledge and close are recorded in WakeCap only. Gas exposure and compliance figures are Not available yet. The AI assistant and "new products go under it" are direction, with no dates. Numbers on screens (49.5, 8 of 30 days) are values at capture.

## Rebuild
`./make.sh` (needs python3 with Pillow, node with playwright-core, Chrome for Testing; creates `.venv` for python-pptx on first run). Edit slides and notes in `gen_deck.py`, crops in `prep_assets.py`. `deck.html` is the single source: Chrome renders the PDF and PNGs from it, and `build_pptx.py` converts its measured layout to PowerPoint objects.
