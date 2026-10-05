CE=/Users/admin/wc/weather-station/release-kit/four-videos/connected-environment
fin(){ # fin <name> : copy frame + scrubbed text
  cp $CAPDIR/frames/$1.png $CE/assets/$1.png
  "$B" text 2>/dev/null | sed -E "s/Aramco|Riyas|Fadhili|FADHILI|Jafurah-Phase 2|Jafurah/[name]/g" > $CE/captures/$1.txt
  ffprobe -v error -show_entries stream=width,height -of csv=p=0 $CE/assets/$1.png; }
