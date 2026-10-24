#!/usr/bin/env python3
"""Страница выбора голосов: все дубли дизайна (out/voice_design/<голос>/takeK.wav) с плеером и отметками, звук внутри файла (mp3).
  python3 tools/mult2d/voice_page.py   → out/voice_design/vybor_golosov.html; «Скопировать выбор» даёт текст «Герой: номер дубля»,
  выбранные дубли → voice_rec.py profile <голос> out/voice_design/<голос>/takeK.wav. Нужен ffmpeg (FFMPEG=путь)."""
import os, sys, json, base64, subprocess, html
D = os.path.dirname(os.path.abspath(__file__))
FF = os.environ.get('FFMPEG', 'ffmpeg')
S = os.path.join(D, 'out', 'voice_design')
out = os.path.join(S, 'vybor_golosov.html')
vox = json.load(open(os.path.join(D, 'voice', 'profiles', 'vox.json'), encoding='utf-8'))
NAMES = {'kot': 'Кот Учёный', 'proshka': 'Прошка', 'potap': 'Потап', 'pelageya': 'Пелагея', 'yosha': 'Йоша', 'tishka': 'Тишка',
         'zven': 'Звенышко', 'kuzma': 'Кузьма', 'koschei': 'Кощей', 'kolobok': 'Колобок'}
BRIEF = {'kot': 'бархатный баритон, около 50 лет, тёплый, чуть хрипловатый; сказовый распев с озорством',
         'proshka': 'звонкий мальчишеский, 10–11 лет; быстро, уверенно, с усмешкой',
         'potap': 'низкий для ребёнка, гулкий, 10 лет; медленно, добродушно',
         'pelageya': 'тихий девичий, 9 лет; шёпот с придыханием, паузы',
         'yosha': 'самый высокий и звонкий, 6–7 лет; задорно, с напором',
         'tishka': 'малыш 4–5 лет, сонный, тянет гласные',
         'zven': 'высокий звенящий голос без возраста; в серии — с лёгким металлическим призвуком',
         'kuzma': 'густой бас, около 45 лет, рубленые фразы (в серии 1 не говорит — на серию 2)',
         'koschei': 'сухой, тихий, усталый, 60+; холодно и грустно, не кричит; в серии — с лёгким эхом',
         'kolobok': 'круглый, весёлый, нараспев (в брифе нет — для плана 1-8)'}
cards = []
for v, x in vox.items():
    sc = {r['file']: r for r in json.load(open(f'{S}/{v}/score.json', encoding='utf-8'))}
    takes = []
    for k in range(1, 7):
        f = f'{S}/{v}/take{k}.wav'
        if not os.path.exists(f): continue
        mp3 = subprocess.run([FF, '-loglevel', 'error', '-i', f, '-ac', '1', '-b:a', '64k', '-f', 'mp3', '-'], capture_output=True, check=True).stdout
        r = sc.get(f'take{k}.wav', {})
        takes.append(f'''<label class="take{' cur' if k == x['design_take'] else ''}"><input type="checkbox" data-v="{v}" data-k="{k}">
<span class="n">Дубль {k}</span><audio controls preload="none" src="data:audio/mpeg;base64,{base64.b64encode(mp3).decode()}"></audio>
<span class="meta">{r.get('f0', '?')} Гц · {r.get('dur', '?')} с{' · <b>сейчас в профиле</b>' if k == x['design_take'] else ''}</span>
<span class="asr">слышно: «{html.escape(str(r.get('asr', ''))[:90])}»</span></label>''')
    cards.append(f'''<section><h2>{NAMES[v]}</h2><p class="brief">{BRIEF[v]}</p><p class="line">Проба: «{html.escape(x['ref'])}»</p>
{''.join(takes)}
<label class="none"><input type="checkbox" data-v="{v}" data-k="0"> Ни один не подходит — сделать новые дубли</label>
<input class="note" data-v="{v}" placeholder="Комментарий: что не так или что поменять (необязательно)"></section>''')

page = f'''<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Выбор голосов</title><style>
:root{{--bg:#FBF3E2;--card:#fff;--ink:#231a14;--mut:#7a6a5a;--acc:#C8652F;--line:#e8dcc6}}
@media (prefers-color-scheme:dark){{:root{{--bg:#16131c;--card:#221d2a;--ink:#f1e9dc;--mut:#a99d8e;--acc:#F0A060;--line:#3a3245}}}}
body{{margin:0;background:var(--bg);color:var(--ink);font:16px/1.45 system-ui,sans-serif}}
main{{max-width:760px;margin:0 auto;padding:16px 16px 120px}}
h1{{font-size:24px;margin:8px 0}} .intro{{color:var(--mut)}}
section{{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin:16px 0}}
h2{{margin:0 0 4px;font-size:20px}} .brief{{margin:0;color:var(--mut)}} .line{{margin:4px 0 10px;font-style:italic}}
.take{{display:grid;grid-template-columns:24px 70px 1fr;gap:4px 10px;align-items:center;padding:8px;border-radius:10px}}
.take.cur{{background:rgba(200,101,47,.10)}} .take audio{{width:100%;height:36px}}
.meta,.asr{{grid-column:3;font-size:13px;color:var(--mut)}} input[type=checkbox]{{width:20px;height:20px;accent-color:var(--acc)}}
.none{{display:flex;gap:8px;align-items:center;margin-top:8px;color:var(--mut)}}
.note{{width:100%;box-sizing:border-box;margin-top:8px;padding:8px;border:1px solid var(--line);border-radius:8px;background:transparent;color:var(--ink);font:inherit}}
.bar{{position:fixed;left:0;right:0;bottom:0;background:var(--card);border-top:1px solid var(--line);padding:10px 16px}}
.bar div{{max-width:760px;margin:0 auto;display:flex;gap:10px;align-items:center}}
button{{background:var(--acc);color:#fff;border:0;border-radius:10px;padding:10px 16px;font:600 16px system-ui;cursor:pointer}}
#st{{color:var(--mut);font-size:14px}} textarea{{width:100%;height:110px;margin-top:8px;display:none}}
</style></head><body><main>
<h1>Голоса сериала — выбор</h1>
<p class="intro">По 6 дублей на голос, VoxCPM2 по описанию из брифа. Отметь понравившийся дубль у каждого героя (лучше один).
Подсвечен дубль текущего профиля. Потом нажми «Скопировать выбор» и вставь текст в тред — сохраню выбранные голоса профилями и перезапишу реплики.</p>
{''.join(cards)}
<textarea id="out" readonly></textarea></main>
<div class="bar"><div><button id="cp">Скопировать выбор</button><span id="st"></span></div></div>
<script>
const KEY='zc-voice-choice';
const boxes=[...document.querySelectorAll('input[type=checkbox]')], notes=[...document.querySelectorAll('.note')];
try{{const s=JSON.parse(localStorage.getItem(KEY)||'{{}}');boxes.forEach(b=>b.checked=!!(s.c||[]).includes(b.dataset.v+':'+b.dataset.k));notes.forEach(n=>n.value=(s.n||{{}})[n.dataset.v]||'');}}catch(e){{}}
const save=()=>{{try{{localStorage.setItem(KEY,JSON.stringify({{c:boxes.filter(b=>b.checked).map(b=>b.dataset.v+':'+b.dataset.k),n:Object.fromEntries(notes.map(n=>[n.dataset.v,n.value]))}}))}}catch(e){{}}}};
boxes.forEach(b=>b.onchange=save); notes.forEach(n=>n.oninput=save);
const text=()=>[...document.querySelectorAll('section')].map(s=>{{const v=s.querySelector('input').dataset.v,
 c=boxes.filter(b=>b.dataset.v===v&&b.checked).map(b=>b.dataset.k==='0'?'ни один':b.dataset.k), n=s.querySelector('.note').value.trim();
 return s.querySelector('h2').textContent+': '+(c.length?c.join(', '):'—')+(n?' ('+n+')':'');}}).join('\\n');
document.getElementById('cp').onclick=async()=>{{const t='Голоса:\\n'+text(),o=document.getElementById('out');o.value=t;
 try{{await navigator.clipboard.writeText(t);document.getElementById('st').textContent='Скопировано — вставь в тред';}}
 catch(e){{o.style.display='block';o.select();document.getElementById('st').textContent='Скопируй текст из поля ниже';}}}};
</script></body></html>'''
open(out, 'w', encoding='utf-8').write(page)
print(out, os.path.getsize(out) // 1024, 'КБ')
