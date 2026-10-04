# -*- coding: utf-8 -*-
# Сборка релизной версии «Златой цепи» из прототипа.
#   python3 zlataya_cep/build/build_final.py          — final06 (WebGL, Three r128)
#   python3 zlataya_cep/build/build_final.py --gpu    — final07 (WebGPU, Three r186): те же модули + gpu/ (совместимость, материалы
#                                                       и шейдеры на TSL, постобработка), см. docs/18_webgpu.md
# Берёт прототип — части proto/ по списку proto/parts.txt, склеенные в index.html (tools/proto.py; index.html в git не хранится,
# сборка пишет его заново — открыть прототип в браузере), встраивает Three.js r128, встраивает Three.js r128, подключает модули финальной версии
# (fin_early.js — до создания геометрии, late_*.js по порядку — перед запуском игры, fin.css, fin_body.html, rep_*.py — точечные замены)
# и пишет zlataya_cep/zlataya_cep_final06.html (final01–final05 — предыдущие релизы, лежат рядом как есть). В конце — проверка синтаксиса через node --check.
import os,sys,re,subprocess
B=os.path.dirname(os.path.abspath(__file__))
ROOT=os.path.normpath(os.path.join(B,'..','..'))
SRC=os.path.join(ROOT,'index.html')
GPU='--gpu' in sys.argv
K5SB='--k5sandbox' in sys.argv   # «Полигон Кощея» (docs/24_koschei_proposals.md): модули sandbox_k5/, без озвучки, свой файл; в main не вливается
# --pages ПАПКА — версия для GitHub Pages: ПАПКА/index.html без записей голосов внутри (27 МБ → ~8 МБ, игра открывается за секунды),
# записи — отдельными файлами ПАПКА/voice/<id>.mp3; игра подгружает записи уровня при его загрузке (late_91_voice.js, e.src).
# Обычная сборка (файл для скачивания в Releases и для ботов) — как прежде, всё в одном файле.
PAGES=sys.argv[sys.argv.index('--pages')+1] if '--pages' in sys.argv else None
VERSION='final07' if GPU else 'final06'
OUT=os.path.join(ROOT,'zlataya_cep','zlataya_cep_'+('k5sandbox' if K5SB else VERSION)+'.html')
SBK=os.path.join(B,'sandbox_k5')
GB=os.path.join(B,'gpu')
def rdg(n):return open(os.path.join(GB,n),encoding='utf-8').read()
sys.path.insert(0,os.path.join(ROOT,'tools'));import proto
s=proto.write_index()   # прототип из частей proto/ → index.html
def rd(n):return open(os.path.join(B,n),encoding='utf-8').read()
# модули и замены лежат в build/ (общие) и в build/levels/<уровень>/ (одного уровня или мира: levels/2-2/, levels/w2/); порядок —
# по имени файла, папка на него не влияет (late_99f после late_99e, где бы они ни лежали); два файла с одним именем — ошибка
def walk(pat):
    out={}
    for d,ds,fs in os.walk(B):
        ds[:]=sorted(x for x in ds if x not in ('gpu','voice','fonts','sandbox_k5'))
        for f in fs:
            if re.match(pat,f):
                rp=os.path.relpath(os.path.join(d,f),B).replace(os.sep,'/')
                if f in out:sys.exit('BUILD: два файла с одним именем: '+out[f]+' и '+rp)
                out[f]=rp
    return [out[k] for k in sorted(out)]
def rep(old,new,cnt=1):
    global s
    n=s.count(old)
    if n!=cnt: print('BUILD REP COUNT',n,'!=',cnt,'::',old[:150]);sys.exit(1)
    s=s.replace(old,new)

# 1. шапка: вместо заметок разработчика — короткое описание релиза и лицензии
a=s.find('<!--');b=s.find('-->',a)+3
s=s[:a]+rd('header.txt').replace('%VERSION%',VERSION).rstrip()+'\n'+s[b:]
# 2. Three.js внутри страницы — игра работает без интернета (final07 — r186 с WebGPURenderer и слоем совместимости gpu/gpu_compat.js)
three=rd('three.r186.webgpu.min.js')+'\n'+rdg('gpu_compat.js') if GPU else rd('three.r128.min.js')
assert '</script' not in three
rep('<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>','<script>\n'+three+'\n</script>')
rep("<title>Златая цепь</title>","<title>Златая цепь</title>\n<meta name=\"description\" content=\"Златая цепь — кооперативная low-poly сказка для всей семьи по мотивам Пушкина и русских народных сказок.\">")
# 3. стили и разметка финальной версии
# шрифт заставки студии — Comfortaa (SIL Open Font License 1.1, см. fonts/OFL.txt), встраивается в страницу, чтобы работать офлайн
import base64
CYR='U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116';LAT='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2212,U+FEFF,U+FFFD'
FONTS=[(300,'comfortaa-cyrillic-300-normal.woff2',CYR),(600,'comfortaa-cyrillic-600-normal.woff2',CYR),(600,'comfortaa-latin-600-normal.woff2',LAT)]
fontcss=''.join("@font-face{font-family:'ZCComfortaa';font-style:normal;font-weight:%d;font-display:block;src:url(data:font/woff2;base64,%s) format('woff2');unicode-range:%s}\n"%(w,base64.b64encode(open(os.path.join(B,'fonts',f),'rb').read()).decode(),r) for w,f,r in FONTS)
rep('</style>',fontcss+rd('fin.css').rstrip()+'\n</style>')
rep('<div id="ui">',rd('fin_body.html').rstrip()+'\n<div id="ui">')
# 4. модули: ранний (low-poly геометрия и материалы) и поздний (всё остальное)
GPU_EARLY=['gpu_early.js','gpu_shaders.js']   # final07: материалы и переводы шейдеров на TSL — до поздних модулей
rep("const V3=THREE.Vector3;","const V3=THREE.Vector3;\n"+rd('fin_early.js').rstrip()+'\n'+(''.join(rdg(f).rstrip()+'\n' for f in GPU_EARLY) if GPU else ''))
late='\n'.join(rd(f).rstrip() for f in walk(r'late_\d+.*\.js$'))
if K5SB:late+='\n'+'\n'.join(open(os.path.join(SBK,f),encoding='utf-8').read().rstrip() for f in sorted(os.listdir(SBK)) if f.endswith('.js'))   # после всех поздних модулей
if GPU:late+='\n'+'\n'.join(rdg(f).rstrip() for f in sorted(os.listdir(GB)) if re.match(r'gpu_late_\d+.*\.js$',f))   # final07: после всех поздних модулей
# озвучка реплик (final06): каталог voice/lines.json и записи voice/<id>.mp3 → VOX_LINES (MP3 в base64) перед поздними модулями
import json
VD=os.path.join(B,'voice');VL=json.load(open(os.path.join(VD,'lines.json'),encoding='utf-8'))['lines'];vox=[]
for e in ([] if K5SB else VL):
    f=os.path.join(VD,e['id']+'.mp3')
    if not (os.path.exists(f) and e.get('dur')):print('voice: нет записи',e['id']);continue
    ve={'id':e['id'],'lv':e['lv'],'who':e['who'],'text':e['text'],'dur':e['dur'],'gain':e.get('gain',1),'lul':e.get('lul')}
    if PAGES:
        os.makedirs(os.path.join(PAGES,'voice'),exist_ok=True);import shutil;shutil.copyfile(f,os.path.join(PAGES,'voice',e['id']+'.mp3'));ve['src']='voice/'+e['id']+'.mp3'
    else:ve['b64']=base64.b64encode(open(f,'rb').read()).decode()
    vox.append(ve)
voxjs='const VOX_LINES='+json.dumps(vox,ensure_ascii=False)+';\n';late=voxjs+late
# защита: модуль не должен объявлять функцию с именем функции прототипа — в общей области видимости она молча подменит оригинал
PF=set(re.findall(r'(?m)^function\s+([A-Za-z_$][\w$]*)\s*\(',s))
MODS=[(f,rd(f)) for f in walk(r'(late_\d+.*|fin_early)\.js$')]
if K5SB:MODS+=[('sandbox_k5/'+f,open(os.path.join(SBK,f),encoding='utf-8').read()) for f in sorted(os.listdir(SBK)) if f.endswith('.js')]
if GPU:MODS+=[('gpu/'+f,rdg(f)) for f in sorted(os.listdir(GB)) if re.match(r'gpu_(early|shaders|late_\d+.*)\.js$',f)]
for f,src in MODS:
        clash=sorted(set(re.findall(r'(?<![\w.])function\s+([A-Za-z_$][\w$]*)\s*\(',src))&PF)
        if clash: sys.exit('BUILD NAME CLASH in '+f+': '+', '.join(clash)+' — переименуйте функцию модуля')
rep("hudInit();loadLevel(0);showMenu('menu');requestAnimationFrame(frame);",late+"\nhudInit();finBoot();requestAnimationFrame(frame);")
# 5. отладочный объект для тестов — только с ?debug в адресе
rep("window.ZC={G,players,","if(/[?&]debug/.test(location.search))window.ZC={G,players,")
rep("skip(){if(G.cine){G.cine.skip();G.cine.t=G.cine.dur;}}};","skip(){if(G.cine){G.cine.skip();G.cine.t=G.cine.dur;}}};\nif(window.ZC)window.ZC.FIN=FIN;")
for mod in walk(r'rep_\d+.*\.py$'):
    exec(open(os.path.join(B,mod),encoding='utf-8').read())
# у каждой озвученной реплики должна быть такая же строка в игре (после всех замен субтитров), иначе запись не прозвучит
# (реплика, собранная в коде из кусков — например t+'…', — перечисляет эти куски в поле parts: в игре должен быть каждый)
sg=s.replace(voxjs,'',1)   # код игры без самого каталога записей (в нём есть все тексты)
miss=[] if K5SB else [e for e in VL if ("'"+e['text'].replace("'","\\'")+"'" not in sg) and not (e.get('parts') and all(p in sg for p in e['parts']))]
for e in miss: print('VOICE LINE NOT FOUND ::',e['id'],e['text'])
if miss: sys.exit('VOICE LINE NOT FOUND: '+str(len(miss)))
if PAGES:OUT=os.path.join(PAGES,'index.html')
open(OUT+'.tmp','w',encoding='utf-8').write(s);os.replace(OUT+'.tmp',OUT)   # атомарно: идущие тесты не прочитают файл наполовину
m=re.findall(r'<script>([\s\S]*?)</script>',s)
chk=os.path.join(B,'.chk.js');open(chk,'w',encoding='utf-8').write(m[-1])
r=subprocess.run(['node','--check',chk]);os.remove(chk)
if r.returncode: sys.exit('syntax error')
print('final ok',OUT,len(s),'voice lines',len(vox),'/',len(VL))
