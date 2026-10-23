#!/bin/sh
# Склейка серии (громкость — −14 LUFS, как просят ленты соцсетей): кадры сегментов (DIR/NN_id/*.jpg, 720×1280) + звук (audio.webm) → MP4 1080×1920 (H.264 + AAC) для вертикальных лент.
#   tools/serial/encode.sh [DIR] [выход.mp4]      (DIR по умолчанию — tools/serial/out/ep01)
set -e
D=$(cd "$(dirname "$0")" && pwd)
OUT=${1:-$D/out/ep01}; MP4=${2:-$OUT/$(basename "$OUT").mp4}; FPS=${FPS:-24}
FF=$(command -v ffmpeg || python3 -c "import imageio_ffmpeg as i;print(i.get_ffmpeg_exe())")
N=$(ls "$OUT"/[0-9][0-9]_*/*.jpg | wc -l); DUR=$(python3 -c "print(round($N/$FPS,3))")
FO=$(python3 -c "print(round($N/$FPS-0.6,3))"); AO=$(python3 -c "print(round($N/$FPS-1.2,3))")
echo "кадров $N, длительность $DUR с"
VF="scale=1080:1920:flags=lanczos,fade=t=in:st=0:d=0.25,fade=t=out:st=$FO:d=0.6"
if [ -f "$OUT/audio.webm" ]; then
  # метки времени в webm от MediaRecorder «плывут» — сначала WAV по сэмплам
  "$FF" -y -loglevel error -i "$OUT/audio.webm" -ar 48000 -ac 2 -c:a pcm_s16le "$OUT/audio.wav"
  "$FF" -y -loglevel error -framerate $FPS -pattern_type glob -i "$OUT/[0-9][0-9]_*/*.jpg" -ss 0.6 -i "$OUT/audio.wav" \
    -vf "$VF" -af "dynaudnorm=f=400:g=11:m=8:p=0.92,loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=in:st=0:d=0.1,afade=t=out:st=$AO:d=1.2" -ar 48000 \
    -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -profile:v high -c:a aac -b:a 192k -t $DUR -movflags +faststart "$MP4"
else
  "$FF" -y -loglevel error -framerate $FPS -pattern_type glob -i "$OUT/[0-9][0-9]_*/*.jpg" \
    -vf "$VF" -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -movflags +faststart "$MP4"
fi
ls -la "$MP4"
