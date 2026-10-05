#!/bin/bash
# Rebuilds everything in this folder: slides (HTML -> PDF + PNG), editable PPTX, one-pager, presenter guide.
# Needs: python3 with Pillow, node with playwright-core (/Users/admin/wstack), Chrome for Testing (Playwright cache).
# Nothing is posted, sent or published.
set -e
cd "$(dirname "$0")"
[ -d .venv ] || { python3 -m venv .venv && .venv/bin/pip install -q python-pptx; }
python3 prep_assets.py > /dev/null          # crops of the masked live frames in ../four-videos/*/assets
python3 gen_deck.py                         # deck.html (14 slides, speaker notes inside)
node extract.js                             # qa/slide-NN.png, deck.pdf, slides.json
.venv/bin/python build_pptx.py              # connected-environment-1.0.pptx
.venv/bin/python check_pptx.py              # redraws the PPTX from the file, flags text overflow
python3 scan_deck.py                        # OCR privacy scan of every slide (expect 0 hits)
cp deck.pdf connected-environment-1.0.pdf
python3 gen_onepager.py && node render_onepager.js
python3 make_guide.py                       # presenter-guide.md from the same speaker notes
