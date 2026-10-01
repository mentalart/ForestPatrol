#!/bin/sh
# Склейка трейлера: кадры сегментов (tools/video/out/NN_id/*.jpg) + звук (audio.webm) → MP4 (H.264 + AAC), 1280×720.
#   tools/video/encode.sh [DIR] [выход.mp4]
# Звук выравнивается по громкости (dynaudnorm): сегменты с одной музыкой не проваливаются рядом с голосами.
# Нужен ffmpeg с libx264 (например: pip install imageio-ffmpeg; путь берётся оттуда, если ffmpeg нет в PATH).
set -e
D=$(cd "$(dirname "$0")" && pwd)
OUT=${1:-$D/out}; MP4=${2:-$OUT/trailer.mp4}; FPS=${FPS:-24}
FF=$(command -v ffmpeg || python3 -c "import imageio_ffmpeg as i;print(i.get_ffmpeg_exe())")
N=$(ls "$OUT"/[0-9][0-9]_*/*.jpg | wc -l); DUR=$(python3 -c "print(round($N/$FPS,3))")
FO=$(python3 -c "print(round($N/$FPS-0.8,3))"); AO=$(python3 -c "print(round($N/$FPS-1.4,3))")
echo "кадров $N, длительность $DUR с"
if [ -f "$OUT/audio.webm" ]; then
  # метки времени в webm от MediaRecorder «плывут» (ffmpeg видит 3:16 вместо 2:53) — сначала WAV по сэмплам, без меток
  "$FF" -y -loglevel error -i "$OUT/audio.webm" -ar 48000 -ac 2 -c:a pcm_s16le "$OUT/audio.wav"
  "$FF" -y -loglevel error -framerate $FPS -pattern_type glob -i "$OUT/[0-9][0-9]_*/*.jpg" -ss 0.6 -i "$OUT/audio.wav" \
    -vf "fade=t=in:st=0:d=0.35,fade=t=out:st=$FO:d=0.8" -af "dynaudnorm=f=500:g=15:m=6:p=0.93,afade=t=in:st=0:d=0.2,afade=t=out:st=$AO:d=1.4" \
    -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -c:a aac -b:a 160k -t $DUR -movflags +faststart "$MP4"
else
  "$FF" -y -loglevel error -framerate $FPS -pattern_type glob -i "$OUT/[0-9][0-9]_*/*.jpg" \
    -vf "fade=t=in:st=0:d=0.35,fade=t=out:st=$FO:d=0.8" -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart "$MP4"
fi
ls -la "$MP4"
