# Сценарий бота -> шаги для run.js: python3 mk.py bots/t41v.js out/t41v.json
# Шаги разделяются строками «//@@ [shot=имя.png] [wait=мс] [reload=1] [mouse=x,y] [key=Код]»; первым шагом всегда подключается helpers.js
import json,sys,os
src=open(sys.argv[1],encoding='utf-8').read()
helpers=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'helpers.js'),encoding='utf-8').read()
steps=[{"code":helpers}];cur=[];meta={}
for line in src.split('\n'):
    if line.startswith('//@@'):
        if cur or meta: steps.append(dict(code='\n'.join(cur),**meta))
        cur=[];meta={}
        for kv in line[4:].split():
            k,v=kv.split('=');meta[k]=int(v) if k in('wait','reload') else v
    else: cur.append(line)
if cur or meta: steps.append(dict(code='\n'.join(cur),**meta))
os.makedirs(os.path.dirname(os.path.abspath(sys.argv[2])),exist_ok=True)
json.dump(steps,open(sys.argv[2],'w',encoding='utf-8'),ensure_ascii=False)
