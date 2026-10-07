#!/usr/bin/env python3
"""Патч релиза для плейтест-ботов: в отладочный объект ZC добавляется ZC.X(код) — выполнить код внутри области видимости игры
(там живут tip, say, play, damageHero, makeFoe и т. д.). Игра и репозиторий не меняются: правится копия tools/playtest/out/pt_build.html.
Запуск: python3 tools/playtest/build_pt.py   (сначала python3 zlataya_cep/build/build_final.py)"""
import os,sys
here=os.path.dirname(os.path.abspath(__file__))
src=os.path.join(here,'..','..','zlataya_cep','zlataya_cep_final06.html')
dst=os.path.join(here,'out','pt_build.html')
a='window.ZC={G,players,'
s=open(src,encoding='utf-8').read()
if s.count(a)!=1: sys.exit('не нашёл точку вставки ZC в релизе (%d)'%s.count(a))
os.makedirs(os.path.dirname(dst),exist_ok=True)
open(dst,'w',encoding='utf-8').write(s.replace(a,'window.ZC={X(c){return eval(c);},G,players,'))
print('ok',dst,len(s))
