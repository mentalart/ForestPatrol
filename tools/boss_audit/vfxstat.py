import json,sys,os,collections
for lg in sys.argv[1:]:
    ev=json.load(open(lg));T=max([e['t'] for e in ev] or [1])
    c=collections.Counter(e['k'] for e in ev)
    sh=[e['a'] for e in ev if e['k']=='shake'];hs=[e['a'] for e in ev if e['k']=='hitstop']
    # максимум событий тряски/вспышек в любом окне 1 с
    def peak(k,key=None):
        ts=sorted(e['t'] for e in ev if e['k']==k);m=0;j=0
        for i,t in enumerate(ts):
            while ts[j]<t-1:j+=1
            m=max(m,i-j+1)
        return m
    print(f"{os.path.basename(lg):22} T={T:6.1f}с shake={len(sh)} (макс a={max(sh) if sh else 0:.2f}, пик/с={peak('shake')}) hitstop={len(hs)} (макс {max(hs) if hs else 0:.2f}) flash={c['flash']} (пик/с={peak('flash')})")
