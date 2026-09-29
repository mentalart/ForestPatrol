# -*- coding: utf-8 -*-
# Сборка релизной версии «Златой цепи» из прототипа.
#   python3 zlataya_cep/build/build_final.py
# Берёт ../../index.html (прототип, не меняется), встраивает Three.js r128, подключает модули финальной версии
# (fin_early.js — до создания геометрии, late_*.js по порядку — перед запуском игры, fin.css, fin_body.html, rep_*.py — точечные замены)
# и пишет zlataya_cep/zlataya_cep_final05.html (final01–final04 — предыдущие релизы, лежат рядом как есть). В конце — проверка синтаксиса через node --check.
import os,sys,re,subprocess
B=os.path.dirname(os.path.abspath(__file__))
ROOT=os.path.normpath(os.path.join(B,'..','..'))
SRC=os.path.join(ROOT,'index.html')
OUT=os.path.join(ROOT,'zlataya_cep','zlataya_cep_final05.html')
VERSION='final05'
s=open(SRC,encoding='utf-8').read()
def rd(n):return open(os.path.join(B,n),encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    n=s.count(old)
    if n!=cnt: print('BUILD REP COUNT',n,'!=',cnt,'::',old[:150]);sys.exit(1)
    s=s.replace(old,new)

# 1. шапка: вместо заметок разработчика — короткое описание релиза и лицензии
a=s.find('<!--');b=s.find('-->',a)+3
s=s[:a]+rd('header.txt').replace('%VERSION%',VERSION).rstrip()+'\n'+s[b:]
# 2. Three.js r128 внутри страницы — игра работает без интернета
three=rd('three.r128.min.js')
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
rep("const V3=THREE.Vector3;","const V3=THREE.Vector3;\n"+rd('fin_early.js').rstrip()+'\n')
late='\n'.join(rd(f).rstrip() for f in sorted(os.listdir(B)) if re.match(r'late_\d+.*\.js$',f))
# защита: модуль не должен объявлять функцию с именем функции прототипа — в общей области видимости она молча подменит оригинал
PF=set(re.findall(r'(?m)^function\s+([A-Za-z_$][\w$]*)\s*\(',s))
for f in sorted(os.listdir(B)):
    if re.match(r'(late_\d+.*|fin_early)\.js$',f):
        clash=sorted(set(re.findall(r'(?<![\w.])function\s+([A-Za-z_$][\w$]*)\s*\(',rd(f)))&PF)
        if clash: sys.exit('BUILD NAME CLASH in '+f+': '+', '.join(clash)+' — переименуйте функцию модуля')
rep("hudInit();loadLevel(0);showMenu('menu');requestAnimationFrame(frame);",late+"\nhudInit();finBoot();requestAnimationFrame(frame);")
# 5. отладочный объект для тестов — только с ?debug в адресе
rep("window.ZC={G,players,","if(/[?&]debug/.test(location.search))window.ZC={G,players,")
rep("skip(){if(G.cine){G.cine.skip();G.cine.t=G.cine.dur;}}};","skip(){if(G.cine){G.cine.skip();G.cine.t=G.cine.dur;}}};\nif(window.ZC)window.ZC.FIN=FIN;")
for mod in sorted(f for f in os.listdir(B) if re.match(r'rep_\d+.*\.py$',f)):
    exec(open(os.path.join(B,mod),encoding='utf-8').read())
open(OUT+'.tmp','w',encoding='utf-8').write(s);os.replace(OUT+'.tmp',OUT)   # атомарно: идущие тесты не прочитают файл наполовину
m=re.findall(r'<script>([\s\S]*?)</script>',s)
chk=os.path.join(B,'.chk.js');open(chk,'w',encoding='utf-8').write(m[-1])
r=subprocess.run(['node','--check',chk]);os.remove(chk)
if r.returncode: sys.exit('syntax error')
print('final ok',OUT,len(s))
