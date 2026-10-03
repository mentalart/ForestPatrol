// Правки сценариста — в исходники игры: node tools/script/apply_edits.js правки.json снимок.json --rev=<коммит> [--write] > отчёт.json
// правки.json — вывод read_doc.js; снимок.json — вывод extract.js той версии игры, с которой делался документ (с полями
// order и col: порядок кусков и вставок, точное место куска); --rev — коммит этой версии (по нему кусок узнаётся в
// нынешнем файле, даже если файл с тех пор менялся: по соседнему коду до и после).
// Для каждой правки edit: новый текст делится по вставкам игры {…} и раскладывается по кускам-строкам кода; каждый кусок
// заменяется на своём месте: прототип (index.html — склейка proto/, запись режется обратно по частям) и late_*.js — строка JS в тех же кавычках, rep_*.py — правая строка замены
// (питоновская строка). Значки и атрибуты тегов возвращаются из старой строки (markup.js). Одно место кода, на которое
// претендуют разные правки с разным текстом, — конфликт; место, которое делят с непоменявшейся строкой, — в отчёт.
// Без --write только пишет отчёт: applied (что заменится), problems (что сделать руками) и br (новый текст с переносом
// строки там, где игра выводит текст без разметки).
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const {visible,toValue}=require('./markup.js');
const ROOT=path.join(__dirname,'..','..');
const ARGS=process.argv.slice(2),FLAG=Object.fromEntries(ARGS.filter(a=>a.startsWith('--')).map(a=>{const [k,...v]=a.slice(2).split('=');return [k,v.join('=')||true];}));
const [EDITS,SNAP]=ARGS.filter(a=>!a.startsWith('--'));if(!EDITS||!SNAP||!FLAG.rev){console.error('node apply_edits.js правки.json снимок.json --rev=<коммит> [--write]');process.exit(1);}
const E=JSON.parse(fs.readFileSync(EDITS,'utf8')).changes.filter(c=>c.kind==='edit'&&c.changed!==false);
const S=JSON.parse(fs.readFileSync(SNAP,'utf8'));const ROWS=new Map();for(const s of S.sections)for(const g of s.groups)for(const r of g.rows)ROWS.set(r.id,r);
// index.html — склейка частей прототипа proto/ (tools/proto.py): читается склейкой, после записи режется обратно по частям
const PROTO_PY=path.join(ROOT,'tools','proto.py'),protoCat=rev=>execFileSync('python3',[PROTO_PY,'cat',...(rev?[rev]:[])],{cwd:ROOT,maxBuffer:1<<28}).toString();
const OLD={},NOW={};const old=f=>OLD[f]!=null?OLD[f]:(OLD[f]=f==='index.html'?protoCat(FLAG.rev):execFileSync('git',['show',FLAG.rev+':'+f],{cwd:ROOT,maxBuffer:1<<28}).toString());
const now=f=>NOW[f]!=null?NOW[f]:(NOW[f]=f==='index.html'?protoCat():fs.readFileSync(path.join(ROOT,f),'utf8'));
const lineStart=(t,line)=>{let p=0;for(let i=1;i<line;i++){p=t.indexOf('\n',p)+1;if(!p)return -1;}return p;};
const jsValue=raw=>raw[0]==='`'?null:Function('"use strict";return ('+raw+')')();
const jsRaw=(v,q)=>q+v.replace(/\\/g,'\\\\').replace(new RegExp(q,'g'),'\\'+q).replace(/\n/g,'\\n')+q;
const pyStr=v=>v.replace(/\\/g,'\\\\').replace(/"/g,'\\"');
function commonSuffix(a,b){let n=0;while(n<a.length&&n<b.length&&a[a.length-1-n]===b[b.length-1-n])n++;return n;}
function commonPrefix(a,b){let n=0;while(n<a.length&&n<b.length&&a[n]===b[n])n++;return n;}
const problems=[],brWarn=[];const places=new Map();   // место в старом файле → {file,pos,raw,claims:[{id,value}]}
const TEXT_ONLY=new Set(['float','sign','mark']);   // floatText (textContent), надписи на холсте, подписи у кнопок — без разметки

// 1) каждая правка — по кускам
for(const c of E){const r=ROWS.get(c.id);if(!r){problems.push({id:c.id,why:'нет в снимке'});continue;}
  const nv=c.new;if(/<br>/.test(nv)&&TEXT_ONLY.has(r.type))brWarn.push({id:c.id,type:r.type,new:nv});
  for(const o of r.occ){
    const toks=o.order.map(x=>typeof x==='number'?{lit:x,raw:o.pieces[x].raw,piece:o.pieces[x]}:{ph:x});
    for(const t of toks)if(t.raw){t.value=jsValue(t.raw);t.vis=t.value==null?null:visible(t.value);}
    if(toks.some(t=>t.raw&&t.value==null)){problems.push({id:c.id,why:'шаблонная строка `…`',old:r.text,new:nv});continue;}
    // новый текст — по вставкам игры (в том же порядке, что в старом)
    const phs=toks.filter(t=>t.ph).map(t=>'{'+t.ph+'}');let pos=0;const chunks=[];let bad=false;
    for(const ph of phs){const k=nv.indexOf(ph,pos);if(k<0){bad=true;break;}chunks.push(nv.slice(pos,k));pos=k+ph.length;}chunks.push(nv.slice(pos));
    if(bad){problems.push({id:c.id,why:'вставки игры переставлены или убраны',old:r.text,new:nv});continue;}
    // куски старого текста между вставками
    const runs=[[]];for(const t of toks){if(t.ph)runs.push([]);else runs[runs.length-1].push(t);}
    for(let i=0;i<runs.length;i++){const run=runs[i],ch=chunks[i].trim()===''&&!run.length?'':chunks[i];
      const oldVis=run.map(t=>t.vis).join('');
      if(visible(oldVis)===visible(ch)&&oldVis.trim()===ch.trim())continue;                       // этот кусок не менялся
      if(!run.length){if(ch.trim())addTail(c,r,o,toks,i,ch,nv);continue;}
      let target=run[0],rest='',first=true,last=true;
      if(run.length>1){// несколько кусков подряд: меняем тот, что отличается, если остальные остались в начале/конце
        const pre=[],post=[];let a=0,b=run.length-1,s=ch;
        while(a<b&&s.startsWith(run[a].vis)){s=s.slice(run[a].vis.length);a++;}
        while(b>a&&s.endsWith(run[b].vis)){s=s.slice(0,s.length-run[b].vis.length);b--;}
        if(a!==b){problems.push({id:c.id,why:'кусок текста собран в коде из нескольких строк — разложить руками',old:r.text,new:nv,pieces:run.map(t=>t.raw)});continue;}
        target=run[a];rest=s;first=a===0;last=a===run.length-1;}else rest=ch;
      // пробелы по краям куска — как были (склейка с соседними кусками), а рядом со вставкой игры — как в новом тексте
      const sp=(x,re)=>(x.match(re)||[''])[0];
      const lead=i>0&&first?sp(rest,/^\s*/):sp(target.value,/^\s*/),trail=i<runs.length-1&&last?sp(rest,/\s*$/):sp(target.value,/\s*$/);
      let v=toValue(rest.trim(),target.value);
      if(v==null){problems.push({id:c.id,why:'в старой строке сложная разметка (div, span, small…)',old:r.text,new:nv,piece:target.raw});continue;}
      v=lead+v+trail;
      const p=target.piece,key=p.file+'|'+p.line+'|'+(p.col!=null?p.col:p.raw);
      if(!places.has(key))places.set(key,{file:p.file,line:p.line,col:p.col,raw:p.raw,value:target.value,claims:[]});
      places.get(key).claims.push({id:c.id,value:v});}}}

// текст рядом со вставкой, где в коде строки нет: вставка K(…) → K(…)+' хвост' (или 'голова'+K(…));
// место — выражение вставки в коде, найденное от соседнего куска-строки
function addTail(c,r,o,toks,i,ch,nv){
  const phIdx=[];toks.forEach((t,k)=>{if(t.ph)phIdx.push(k);});
  const after=i>0,phTok=after?phIdx[i-1]:phIdx[i];            // хвост — после вставки i-1, голова (i=0) — перед первой вставкой
  const code=o.phs[toks.slice(0,phTok+1).filter(t=>t.ph).length-1];
  let anchor=null;for(let k=phTok-1;k>=0;k--)if(toks[k].raw){anchor=toks[k];break;}
  if(!anchor||!code){problems.push({id:c.id,why:'новый текст у вставки, а рядом в коде нет строки — руками',old:r.text,new:nv});return;}
  const p=anchor.piece;if(p.col==null||/\.py$/.test(p.file)){problems.push({id:c.id,why:'новый текст у вставки в замене сборки — руками',old:r.text,new:nv});return;}
  const O=old(p.file),a0=lineStart(O,p.line)+p.col+p.raw.length,x=O.indexOf(code,a0);
  if(x<0||x-a0>400){problems.push({id:c.id,why:'выражение вставки не найдено — руками',old:r.text,new:nv,code});return;}
  const lineOf=q=>O.slice(0,q).split('\n').length,colOf=q=>q-O.lastIndexOf('\n',q-1)-1;
  const wrap=/[?:|&]/.test(code.replace(/'[^']*'/g,''))?'('+code+')':code,q=p.raw[0]==='"'?'"':"'";
  const text=ch.replace(/^\s+|\s+$/g,m=>m);   // пробелы по краям — как в документе (склейка с вставкой)
  const v=toValue(text,'');if(v==null){problems.push({id:c.id,why:'новый текст у вставки со значком — руками',old:r.text,new:nv});return;}
  const key=p.file+'|'+lineOf(x)+'|'+colOf(x)+'|code';
  if(!places.has(key))places.set(key,{file:p.file,line:lineOf(x),col:colOf(x),raw:code,value:code,code:true,claims:[]});
  places.get(key).claims.push({id:c.id,value:after?wrap+'+'+jsRaw(v,q):jsRaw(v,q)+'+'+wrap});}

// 2) все строки снимка, которые делят место с правкой, — чтобы заметить общий кусок у непоменявшейся строки
const edited=new Set(E.map(c=>c.id)),sharers=new Map();
for(const r of ROWS.values())for(const o of r.occ)for(const p of o.pieces){const key=p.file+'|'+p.line+'|'+(p.col!=null?p.col:p.raw);if(places.has(key)&&!edited.has(r.id))(sharers.get(key)||sharers.set(key,[]).get(key)).push(r.id);}

// 3) место в нынешнем файле и замена
const reps={};const applied=[];
for(const [key,pl] of places){const vals=[...new Set(pl.claims.map(x=>x.value))];
  if(vals.length>1){problems.push({why:'одно место кода — разные новые тексты',ids:pl.claims.map(x=>x.id),place:key,values:vals});continue;}
  const nvalue=vals[0];if(nvalue===pl.value)continue;
  const O=old(pl.file),N=now(pl.file);let oldPos=-1,newPos=-1,rawOld,rawNew;
  if(/\.py$/.test(pl.file)){// замена сборки: питоновская строка со значением куска на этой строке файла
    const ls=lineStart(O,pl.line),le=O.indexOf('\n',ls);const L=O.slice(ls,le<0?O.length:le);
    const cand=[...L.matchAll(/"((?:[^"\\\n]|\\.)*)"/g)].filter(m=>m[1].replace(/\\(.)/g,'$1')===pl.value);
    if(cand.length!==1){problems.push({ids:pl.claims.map(x=>x.id),why:'замена сборки: строка не найдена однозначно — руками',place:key,value:pl.value,new:nvalue});continue;}
    oldPos=ls+cand[0].index;rawOld=cand[0][0];rawNew='"'+pyStr(nvalue)+'"';}
  else{if(pl.col==null){problems.push({ids:pl.claims.map(x=>x.id),why:'нет позиции куска',place:key});continue;}
    oldPos=lineStart(O,pl.line)+pl.col;rawOld=pl.raw;if(O.substr(oldPos,rawOld.length)!==rawOld){problems.push({ids:pl.claims.map(x=>x.id),why:'кусок не на своём месте в старом файле',place:key});continue;}
    rawNew=pl.code?nvalue:jsRaw(nvalue,rawOld[0]);}
  // то же место в нынешнем файле: среди вхождений — самое похожее по коду вокруг
  const before=O.slice(Math.max(0,oldPos-300),oldPos),after=O.slice(oldPos+rawOld.length,oldPos+rawOld.length+300);
  let best=-1,bs=-1,second=-1;for(let q=N.indexOf(rawOld);q>=0;q=N.indexOf(rawOld,q+1)){const sc=commonSuffix(N.slice(Math.max(0,q-300),q),before)+commonPrefix(N.slice(q+rawOld.length,q+rawOld.length+300),after);
    if(sc>bs){second=bs;bs=sc;best=q;}else if(sc>second)second=sc;}
  if(best<0){problems.push({ids:pl.claims.map(x=>x.id),why:'этого текста в игре больше нет (менялся после снимка)',place:key,value:pl.value,new:nvalue});continue;}
  if(bs<30||bs===second){problems.push({ids:pl.claims.map(x=>x.id),why:'место в нынешнем файле не узнаётся однозначно',place:key,value:pl.value,score:[bs,second]});continue;}
  (reps[pl.file]=reps[pl.file]||[]).push({pos:best,len:rawOld.length,rawNew,key});
  applied.push({ids:pl.claims.map(x=>x.id),file:pl.file,from:pl.value,to:nvalue,shared:sharers.get(key)||undefined});}
for(const f in reps){const L=reps[f].sort((a,b)=>b.pos-a.pos);for(let i=1;i<L.length;i++)if(L[i].pos+L[i].len>L[i-1].pos)problems.push({why:'замены пересекаются',file:f,keys:[L[i].key,L[i-1].key]});
  if(FLAG.write){let t=now(f);for(const x of L)t=t.slice(0,x.pos)+x.rawNew+t.slice(x.pos+x.len);fs.writeFileSync(path.join(ROOT,f),t);if(f==='index.html')execFileSync('python3',[PROTO_PY,'split'],{cwd:ROOT,stdio:'ignore'});}}
const byWhy={};for(const p of problems)byWhy[p.why]=(byWhy[p.why]||0)+1;
process.stdout.write(JSON.stringify({edits:E.length,places:places.size,appliedCount:applied.length,written:!!FLAG.write,problemsByWhy:byWhy,problems,br:brWarn,applied},null,1));
