import json,sys
ev=json.load(open(sys.argv[1]))
kinds=sys.argv[2].split(',') if len(sys.argv)>2 else None
for e in ev:
    if kinds and e['k'] not in kinds: continue
    k=e['k']
    if k=='play': print(f"{e['t']:7.2f} PLAY dur={e['dur']} shots={e['shots']} says={len(e['says'])} voiced={sum(1 for s in e['says'] if s['v']>0)}")
    elif k=='dom': print(f"{e['t']:7.2f} DOM {e['id']} fs={e['fs']} rect={e['rect']} | {e['text'][:140]}")
    else: print(f"{e['t']:7.2f} {k.upper():8} "+' '.join(f"{a}={str(b)[:130]}" for a,b in e.items() if a not in('t','k','lv') and b not in('',None)))
