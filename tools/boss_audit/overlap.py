import json,sys,itertools,os
def inter(a,b):
    x=max(0,min(a[0]+a[2],b[0]+b[2])-max(a[0],b[0]));y=max(0,min(a[1]+a[3],b[1]+b[3])-max(a[1],b[1]));return x*y
seen={}
for lg in sys.argv[1:]:
    ev=[e for e in json.load(open(lg)) if e['k']=='dom']
    cur={}
    for e in ev:
        if e['rect'] and e['text']: cur[e['id']]=(e['rect'],e['text'])
        else: cur.pop(e['id'],None)
        for (a,(ra,ta)),(b,(rb,tb)) in itertools.combinations(cur.items(),2):
            if e['id'] not in(a,b): continue
            ar=inter(ra,rb)
            if ar>0:
                small=min(ra[2]*ra[3],rb[2]*rb[3]);pc=100*ar/small
                key=tuple(sorted((a,b)))
                if key not in seen or seen[key][0]<pc: seen[key]=(pc,e['t'],os.path.basename(lg),ta[:50],tb[:50],ra,rb)
for k,v in sorted(seen.items(),key=lambda kv:-kv[1][0]):
    print(f"{k[0]:11}×{k[1]:11} {v[0]:5.1f}% (от меньшего) t={v[1]:.1f} {v[2]} | {v[3]} | {v[4]} | {v[5]} {v[6]}")
