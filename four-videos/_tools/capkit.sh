#!/bin/bash
# Capture kit. Run at the START OF EVERY Bash call:   source /Users/admin/wc/weather-station/release-kit/four-videos/_tools/capkit.sh <AGENT_DIR>
# It cd's into AGENT_DIR: the headless-browser daemon keeps its state in AGENT_DIR/.wstack, so each agent has its OWN browser.
K=/Users/admin/wc/weather-station/release-kit/four-videos
B=$HOME/.claude/skills/wstack/browse/dist/browse
# Full Chromium build: the headless shell has no WebGL2, so the new Lightning map (Esri) shows "Unable to display map" there.
_FULL="$HOME/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
[ -x "$_FULL" ] && export WSTACK_CHROMIUM_PATH="$_FULL"
export CAPDIR="${1:?usage: source capkit.sh <agent-dir>}"
mkdir -p "$CAPDIR/raw" "$CAPDIR/frames"; cd "$CAPDIR"
CAP_H=988; [ -f "$CAPDIR/.viewport" ] && CAP_H=$(cat "$CAPDIR/.viewport")
P=https://portal.wakecap.com/project
PROJ_A=da2a9547-5b2f-49f3-bba3-e241aa9b5ddd   # Weather Station project
PROJ_B=28df7ba2-94b1-436d-b114-fe7e16a15e07   # Lightning project
PROJ_C=0f52747e-9de9-421d-8aa8-fa9d01d66196   # Weather Station + Gas project

cap_view() { "$B" viewport 1920x$1 >/dev/null 2>&1; echo $1 > "$CAPDIR/.viewport"; CAP_H=$1; }          # cap_view 988 | 1400 | 3800
cap_login() {   # imports the identity cookies if the portal redirects to the login page
  "$B" goto "https://portal.wakecap.com/" >/dev/null 2>&1; sleep 4
  case "$("$B" url)" in *identity.wakecap.com*) "$B" cookie-import-browser chrome --domain identity.wakecap.com 2>&1 | head -1;; esac
}
cap_goto() {    # cap_goto <url> [wait-text]: navigate and wait until the real page renders (the first load can sit on a transient 404)
  local url="$1" want="${2:-}" t i
  "$B" goto "$url" >/dev/null 2>&1
  for i in $(seq 1 18); do sleep 5; t=$("$B" text 2>/dev/null)
    if [ -n "$want" ]; then case "$t" in *"$want"*) break;; esac
    else case "$t" in *404*|"") ;; *) [ ${#t} -gt 400 ] && break;; esac; fi
  done; sleep 5; echo "loaded after $i polls: $("$B" url | cut -c1-120)"
}
cap_prep() {   # headed-window safe: hide scrollbars, scroll to the top, park the pointer on the black top bar (no hover artifacts)
  "$B" js "(()=>{let s=document.getElementById('__nosb');if(!s){s=document.createElement('style');s.id='__nosb';s.textContent='html,body,*{scrollbar-width:none !important} *::-webkit-scrollbar{display:none !important}';document.head.appendChild(s)}document.documentElement.style.scrollBehavior='auto';document.scrollingElement.scrollTop=0;window.scrollTo(0,0);const e=document.elementFromPoint(150,19);if(e)e.id='__park';return 1})()" >/dev/null 2>&1
  "$B" hover "#__park" >/dev/null 2>&1; sleep 1; }
cap_raw()  { cap_prep; "$B" screenshot --clip 0,0,1920,$CAP_H "$CAPDIR/raw/$1.png" >/dev/null 2>&1 && echo "raw: raw/$1.png"; }          # cap_raw <name>  (exact 1920xH clip; works in headless and headed windows)
cap_text() { "$B" text 2>/dev/null > "$CAPDIR/raw/$1.txt" && echo "text: raw/$1.txt"; }                  # cap_text <name>
cap_clean() {   # cap_clean <name> <y0> [drawer=0|1] [extra ffmpeg filters starting with a comma, in RAW pixel coordinates]
  local n=$1 y0=${2:-0} dr=${3:-0} extra="${4:-}" H=$CAP_H f c
  if [ "$dr" = 1 ]; then f="drawbox=x=1380:y=0:w=124:h=38:color=black:t=fill"; else f="drawbox=x=1380:y=0:w=540:h=38:color=black:t=fill"; fi
  c=$(ffmpeg -loglevel error -y -i "$CAPDIR/raw/$n.png" -vf "crop=1:1:8:$((H-120)),format=rgb24" -f rawvideo - | xxd -p | head -1)
  f="$f,drawbox=x=6:y=$((H-54)):w=46:h=50:color=0x${c}:t=fill"
  ffmpeg -loglevel error -y -i "$CAPDIR/raw/$n.png" -vf "${f}${extra},crop=1920:988:0:$y0" "$CAPDIR/frames/$n.png" && echo "frame: frames/$n.png (window y0=$y0 of a 1920x$H viewport)"
}
cap_js() { "$B" js "$(cat $K/_tools/finder.js)" >/dev/null 2>&1; "$B" js "$1" 2>&1 | head -1; }            # cap_js '(()=>{const f=window.__f; return JSON.stringify({a:f.box([...],{...})})})()'
