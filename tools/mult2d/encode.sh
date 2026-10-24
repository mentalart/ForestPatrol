#!/bin/sh
# Склейка 2D-серии: кадры out/EP/*.jpg (1080×1920) + звук → MP4 (H.264 + AAC) для вертикальных лент.
#   tools/mult2d/encode.sh proba [звук.wav]
set -e
FF=${FFMPEG:-ffmpeg}   # FFMPEG=путь, если ffmpeg нет в PATH
D=$(cd "$(dirname "$0")" && pwd); EP=${1:-proba}; WAV=${2:-$D/out/${EP}_audio.wav}; FPS=${FPS:-24}
OUT=$D/out/$EP.mp4
if [ -f "$WAV" ]; then
  "$FF" -y -loglevel error -framerate $FPS -i "$D/out/$EP/%05d.jpg" -i "$WAV" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
    -profile:v high -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"
else
  "$FF" -y -loglevel error -framerate $FPS -i "$D/out/$EP/%05d.jpg" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart "$OUT"
fi
ls -la "$OUT"
