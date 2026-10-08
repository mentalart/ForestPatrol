#!/usr/bin/env python3
"""Экстрактор русских строк из JS: контекст (вызов/ключ), строка, число слов, длительность. Вывод TSV."""
import re, sys, json, os
CY = re.compile(r'[А-Яа-яЁё]')
WORD = re.compile(r"[А-Яа-яЁёA-Za-z0-9]+(?:[-’'][А-Яа-яЁёA-Za-z]+)*")
def tokenize(s):
    i=0;n=len(s);toks=[];line=1;prev_sig=None
    def add(k,v,st,en,ln): toks.append((k,v,st,en,ln))
    while i<n:
        c=s[i]
        if c=='\n': line+=1;i+=1;continue
        if c in ' \t\r': i+=1;continue
        if s.startswith('//',i):
            j=s.find('\n',i); j=n if j<0 else j; i=j; continue
        if s.startswith('/*',i):
            j=s.find('*/',i+2); j=n if j<0 else j+2; line+=s.count('\n',i,j); i=j; continue
        if c in '\'"':
            j=i+1
            while j<n and s[j]!=c:
                if s[j]=='\\': j+=1
                if j<n and s[j]=='\n': line+=1
                j+=1
            raw=s[i+1:j]; add('str',raw,i,j+1,line); i=j+1; continue
        if c=='`':
            j=i+1;d=0
            while j<n:
                if s[j]=='\\': j+=2; continue
                if s[j]=='$' and j+1<n and s[j+1]=='{': d+=1; j+=2; continue
                if s[j]=='}' and d>0: d-=1; j+=1; continue
                if s[j]=='`' and d==0: break
                if s[j]=='\n': line+=1
                j+=1
            add('str',s[i+1:j],i,j+1,line); i=j+1; continue
        if c=='/':
            # регулярка?
            pv=toks[-1] if toks else None
            if pv is None or (pv[0]=='p' and pv[1] in '(,=:[!&|?{};+-*%<>') or (pv[0]=='id' and pv[1] in ('return','typeof','case','in','of')):
                j=i+1;cl=False
                while j<n and s[j]!='\n':
                    if s[j]=='\\': j+=2; continue
                    if s[j]=='[': cl=True
                    elif s[j]==']': cl=False
                    elif s[j]=='/' and not cl: break
                    j+=1
                if j<n and s[j]=='/':
                    j+=1
                    while j<n and s[j].isalpha(): j+=1
                    add('re',s[i:j],i,j,line); i=j; continue
        m=re.compile(r'[A-Za-z_$][\w$]*').match(s,i)
        if m: add('id',m.group(),i,m.end(),line); i=m.end(); continue
        m=re.compile(r'\d+(\.\d+)?').match(s,i)
        if m: add('num',m.group(),i,m.end(),line); i=m.end(); continue
        add('p',c,i,i+1,line); i+=1
    return toks
def unesc(raw):
    raw=raw.replace("\\'","'").replace('\\"','"').replace('\\n',' ')
    return raw
def strip_html(t):
    t=re.sub(r'<br\s*/?>',' ',t); t=re.sub(r'<[^>]*>','',t); t=t.replace('&nbsp;',' ').replace('&mdash;','—').replace('&middot;','·')
    return re.sub(r'\s+',' ',t).strip()
def nwords(t): return len(WORD.findall(re.sub(r'\[[^\]]*\]','',t)))
def srcof(toks,a,b,s):  # текст исходника между токенами
    return s[toks[a][2]:toks[b][3]]
def extract(path):
    s=open(path,encoding='utf-8').read()
    toks=tokenize(s)
    rows=[];stack=[];lastkey={}  # stack: [bracket, name, idx]
    i=0;n=len(toks)
    # карта парных скобок
    pair={};st=[]
    for k,t in enumerate(toks):
        if t[0]=='p':
            if t[1] in '([{': st.append(k)
            elif t[1] in ')]}' and st: pair[st.pop()]=k
    def term_end(k):
        """конец терма выражения после '+', начиная с токена k (включительно) -> индекс последнего токена и представление"""
        t=toks[k]
        if t[0]=='str': return k,'S',unesc(t[1])
        if t[0] in('id','num'):
            j=k;
            # цепочка a.b(c)[d]
            while True:
                if j+1<n and toks[j+1][0]=='p' and toks[j+1][1]=='.' and j+2<n and toks[j+2][0]=='id': j+=2; continue
                if j+1<n and toks[j+1][0]=='p' and toks[j+1][1] in '([' and (j+1) in pair: j=pair[j+1]; continue
                break
            expr=srcof(toks,k,j,s)
            m=re.match(r"K\(\s*[^,]+,\s*'(\w+)'\s*\)",expr)
            if m: return j,'E','[кн:'+m.group(1)+']'
            return j,'E','{}'
        if t[0]=='p' and t[1]=='(' and k in pair: return pair[k],'E','{}'
        return k,'E','{}'
    ctxstack=[]  # (bracket, ident-before, key-in-frame)
    i=0
    while i<n:
        t=toks[i]
        if t[0]=='p' and t[1] in '([{':
            prev=toks[i-1] if i>0 else None
            nm=prev[1] if prev and prev[0]=='id' else (ctxstack[-1][2] if ctxstack else '')
            if prev and prev[0]=='p' and prev[1]=='.' : nm=''
            # имя вызова с точкой: a.b(
            if prev and prev[0]=='id' and i>1 and toks[i-2][0]=='p' and toks[i-2][1]=='.' and i>2 and toks[i-3][0]=='id':
                nm=toks[i-3][1]+'.'+prev[1]
            ctxstack.append([t[1],nm,'' ,i]);i+=1;continue
        if t[0]=='p' and t[1] in ')]}':
            if ctxstack: ctxstack.pop()
            i+=1;continue
        if t[0]=='id' and i+1<n and toks[i+1][0]=='p' and toks[i+1][1]==':' and ctxstack and ctxstack[-1][0]=='{':
            ctxstack[-1][2]=t[1];i+=1;continue
        if t[0]=='str' and i>0 and toks[i-1][0]=='p' and toks[i-1][1]==':' and i>1 and toks[i-2][0]=='str' and ctxstack and ctxstack[-1][0]=='{':
            pass
        if t[0]=='str' and CY.search(t[1]):
            # склейка a+b+c
            j=i;parts=[unesc(t[1])]
            while j+2<n and toks[j+1][0]=='p' and toks[j+1][1]=='+':
                e,kd,txt=term_end(j+2)
                parts.append(txt); j=e
            text=''.join(parts)
            # контекст: ближайший объемлющий вызов с именем + ключ
            call='';key=''
            for fr in reversed(ctxstack):
                if fr[0]=='{' and not key and fr[2]: key=fr[2]
                if fr[0]=='(' and fr[1] and fr[1] not in('if','for','while','switch','function','catch','return'): call=fr[1];break
            # индекс аргумента внутри вызова
            argi=None
            if call:
                for fr in reversed(ctxstack):
                    if fr[0]=='(' and fr[1]==call: op=fr[3];break
                # считаем запятые верхнего уровня до i
                depth=0;cnt=0
                for k in range(op+1,i):
                    tk=toks[k]
                    if tk[0]=='p':
                        if tk[1] in '([{': depth+=1
                        elif tk[1] in ')]}': depth-=1
                        elif tk[1]==',' and depth==0: cnt+=1
                argi=cnt
            rows.append(dict(file=path,line=t[4],call=call,argi=argi,key=key,text=text,tokidx=i,endtok=j))
            i=j+1;continue
        i+=1
    return rows,toks,pair,s
if __name__=='__main__':
    for p in sys.argv[1:]:
        rows,_,_,_=extract(p)
        for r in rows:
            tx=strip_html(r['text'])
            print(f"{os.path.basename(p)}:{r['line']}\t{r['call']}[{r['argi']}]\t{r['key']}\t{nwords(tx)}\t{tx[:160]}")
