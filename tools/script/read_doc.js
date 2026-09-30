// Правки сценариста из документа Word: node tools/script/read_doc.js документ.docx снимок.json [правки.md] [--proposals=предложения.json] > правки.json
// Читает таблицы документа (make_doc.js), находит столбцы по заголовкам («№», «Кто / что», «Сейчас в игре», «Новый вариант»,
// «Комментарий») и сравнивает каждую строку со снимком текстов (extract.js) по номеру. Учитывает режим исправлений Word
// (вставки — да, удаления — нет) и примечания Word. Разметка в ответе — как в снимке: <i>, <b>, <br>, вставки {…}.
// Виды правок: edit — новый текст (из «Нового варианта» или исправление прямо в «Сейчас в игре»), delete — «УДАЛИТЬ»,
// add — новая строка без номера (после строки after), note — только комментарий, lost — строки нет в документе.
// С --proposals (файл, из которого make_doc.js заполнил «Новый вариант», например verse_final06.json): у edit поле proposal —
// accepted (предложение оставлено как есть), changed (сценарист его поправил) или none; declined — предложение стёрто (текст не меняется).
const fs=require('fs'),JSZip=require('jszip');
const ARGS=process.argv.slice(2),FLAG=Object.fromEntries(ARGS.filter(a=>a.startsWith('--')).map(a=>a.slice(2).split('=')));
const [DOC,SNAP,MD]=ARGS.filter(a=>!a.startsWith('--'));if(!DOC||!SNAP){console.error('node read_doc.js документ.docx снимок.json [правки.md] [--proposals=предложения.json] > правки.json');process.exit(1);}
const PROP=FLAG.proposals?JSON.parse(fs.readFileSync(FLAG.proposals,'utf8')).rows:null;

// ---------- маленький разбор XML: дерево {n, a, c} ----------
function parseXML(x){const root={n:'#root',a:{},c:[]},st=[root];const re=/<(\/?)([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|<\?[\s\S]*?\?>|<!--[\s\S]*?-->|<!\[CDATA\[([\s\S]*?)\]\]>|([^<]+)/g;let m;
  while((m=re.exec(x))){if(m[6]!=null){st[st.length-1].c.push(dec(m[6]));continue;}if(m[5]!=null){st[st.length-1].c.push(m[5]);continue;}if(!m[2])continue;
    if(m[1]){st.pop();continue;}const a={};for(const q of m[3].matchAll(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g))a[q[1]]=dec(q[2]!=null?q[2]:q[3]);
    const el={n:m[2],a,c:[]};st[st.length-1].c.push(el);if(!m[4])st.push(el);}
  return root;}
function dec(s){return s.replace(/&(lt|gt|amp|quot|apos|#(\d+)|#x([0-9a-f]+));/gi,(_,e,d,h)=>e==='lt'?'<':e==='gt'?'>':e==='amp'?'&':e==='quot'?'"':e==='apos'?"'":String.fromCodePoint(d?+d:parseInt(h,16)));}
const kids=(el,n)=>el.c.filter(c=>typeof c==='object'&&c.n===n);
function* walkEl(el){for(const c of el.c)if(typeof c==='object'){yield c;yield* walkEl(c);}}

// ---------- текст ячейки с разметкой ----------
const on=el=>!!el&&!/^(0|false|off)$/i.test(el.a['w:val']||'');
function cellText(tc,comments){const paras=[];
  for(const p of walkEl(tc)){if(p.n!=='w:p')continue;const parts=[];
    (function visit(el,del){for(const c of el.c){if(typeof c!=='object')continue;
      if(c.n==='w:del'||c.n==='w:moveFrom'){continue;}
      if(c.n==='w:commentRangeStart'||c.n==='w:commentReference'){if(comments)comments.add(c.a['w:id']);continue;}
      if(c.n==='w:r'){const pr=kids(c,'w:rPr')[0];const i=pr&&on(kids(pr,'w:i')[0]),b=pr&&on(kids(pr,'w:b')[0]);
        for(const t of c.c){if(typeof t!=='object')continue;if(t.n==='w:t')parts.push({t:t.c.filter(x=>typeof x==='string').join(''),i,b});
          else if(t.n==='w:tab')parts.push({t:' ',i,b});else if(t.n==='w:br'||t.n==='w:cr')parts.push({br:true});else if(t.n==='w:noBreakHyphen')parts.push({t:'-',i,b});
          else if(t.n==='w:sym')parts.push({t:String.fromCharCode(parseInt(t.a['w:char']||'20',16)),i,b});}
        continue;}
      if(c.n==='w:pPr'||c.n==='w:rPr')continue;
      visit(c);}})(p);
    paras.push(parts);}
  // абзацы ячейки — через перенос строки; пустые в конце и в начале — не в счёт
  while(paras.length&&!paras[paras.length-1].some(x=>x.t&&x.t.trim()))paras.pop();while(paras.length&&!paras[0].some(x=>x.t&&x.t.trim()))paras.shift();
  let out='';paras.forEach((ps,k)=>{if(k)out+='<br>';let I=false,Bo=false;
    for(const x of ps){if(x.br){if(Bo){out+='</b>';Bo=false;}if(I){out+='</i>';I=false;}out+='<br>';continue;}if(!x.t)continue;const bi=x.b&&x.t.trim()!=='',ii=x.i&&x.t.trim()!=='';
      if(Bo&&!bi){out+='</b>';Bo=false;}if(I&&!ii){out+='</i>';I=false;}if(ii&&!I){out+='<i>';I=true;}if(bi&&!Bo){out+='<b>';Bo=true;}out+=x.t;}
    if(Bo)out+='</b>';if(I)out+='</i>';});
  return norm(out);}
// сравнение без разницы в пробелах и пустых тегах
// курсив и жирный, которые переходят через перенос строки, закрываются перед <br> и открываются после (как их читает cellText)
function splitTags(s){let I=false,B=false,out='';for(const t of String(s||'').split(/(<\/?[ib]>|<br>)/)){if(t==='<i>')I=true;else if(t==='</i>')I=false;else if(t==='<b>')B=true;else if(t==='</b>')B=false;
    if(t==='<br>'){out+=(B?'</b>':'')+(I?'</i>':'')+'<br>'+(I?'<i>':'')+(B?'<b>':'');continue;}out+=t;}return out;}
function norm(s){return splitTags(s).replace(/\u00a0/g,' ').replace(/(\s+)(<\/[ib]>)/g,'$2$1').replace(/(<[ib]>)(\s+)/g,'$2$1').replace(/<\/i><i>|<\/b><b>/g,'').replace(/<i>(\s*)<\/i>|<b>(\s*)<\/b>/g,'$1$2').replace(/[ \t]+/g,' ').replace(/ ?<br> ?/g,'<br>').replace(/^(<br>)+|(<br>)+$/g,'').trim();}
const plain=s=>norm(s).replace(/<[^>]+>/g,'');

(async()=>{
  const zip=await JSZip.loadAsync(fs.readFileSync(DOC));const docXml=await zip.file('word/document.xml').async('string');
  const cm={};const cf=zip.file('word/comments.xml');if(cf){const cx=parseXML(await cf.async('string'));for(const c of walkEl(cx))if(c.n==='w:comment'){const ps=[];for(const p of walkEl(c))if(p.n==='w:t')ps.push(p.c.join(''));cm[c.a['w:id']]={author:c.a['w:author']||'',text:ps.join('').trim()};}}
  const S=JSON.parse(fs.readFileSync(SNAP,'utf8'));const byId=new Map();
  for(const s of S.sections)for(const g of s.groups)for(const r of g.rows)byId.set(r.id,{r,s,g});
  const X=parseXML(docXml);const seen=new Set(),changes=[];let last=null;
  for(const tbl of walkEl(X)){if(tbl.n!=='w:tbl')continue;const trs=kids(tbl,'w:tr');let col=null;
    for(const tr of trs){const tcs=kids(tr,'w:tc');const ids=new Set();const txt=tcs.map(tc=>cellText(tc,ids));
      if(!col){const h=txt.map(plain);const f=k=>h.findIndex(x=>x.trim().toLowerCase()===k);if(f('новый вариант')>=0&&f('сейчас в игре')>=0){col={id:f('№'),who:f('кто / что'),cur:f('сейчас в игре'),nw:f('новый вариант'),cm:f('комментарий')};}continue;}
      if(txt.map(plain).join('|')===['№','Кто / что','Сейчас в игре','Новый вариант','Комментарий'].join('|'))continue;   // повтор заголовка
      const get=k=>col[k]>=0&&col[k]<txt.length?txt[col[k]]:'';const id=plain(get('id')).trim(),cur=get('cur'),nw=get('nw'),com=plain(get('cm')).trim();
      const wcom=[...ids].map(i=>cm[i]).filter(Boolean).map(c=>(c.author?c.author+': ':'')+c.text);
      const comment=[com].concat(wcom).filter(Boolean).join(' · ')||null;
      if(!/^\d{4}$/.test(id)){if(!plain(nw)&&!plain(cur)&&!comment)continue;
        changes.push({kind:'add',after:last,who:plain(get('who'))||null,new:nw||cur,comment});continue;}
      last=id;seen.add(id);const e=byId.get(id);if(!e){changes.push({kind:'unknown',id,new:nw||null,comment});continue;}
      const base={id,section:e.s.title,group:e.g.title||null,type:e.r.typeName,who:e.r.whoName||null,old:e.r.text,voice:e.r.voice||null};
      if(plain(nw)){if(/^удалить\.?$/i.test(plain(nw).trim()))changes.push({kind:'delete',...base,comment});
        else changes.push({kind:'edit',...base,new:nw,changed:norm(nw)!==norm(e.r.text),proposal:PROP?(PROP[id]?(norm(nw)===norm(PROP[id])?'accepted':'changed'):'none'):undefined,comment});}
      else if(PROP&&PROP[id]&&norm(cur)===norm(e.r.text))changes.push({kind:'declined',...base,comment});
      else if(norm(cur)!==norm(e.r.text))changes.push({kind:'edit',...base,new:cur,inPlace:true,comment});
      else if(comment)changes.push({kind:'note',...base,comment});}}
  for(const id of byId.keys())if(!seen.has(id)){const e=byId.get(id);changes.push({kind:'lost',id,section:e.s.title,old:e.r.text});}
  const cnt={};for(const c of changes){cnt[c.kind]=(cnt[c.kind]||0)+1;if(c.proposal)cnt['edit·'+c.proposal]=(cnt['edit·'+c.proposal]||0)+1;}
  process.stdout.write(JSON.stringify({doc:DOC,snapshot:SNAP,count:cnt,changes},null,1));
  if(MD){const L=['# Правки сценариста','','Документ: `'+DOC+'` · снимок: `'+SNAP+'`','',Object.entries(cnt).map(([k,v])=>k+': '+v).join(' · '),''];
    for(const c of changes){if(c.kind==='add'){L.push('- **+ новая строка** после '+(c.after||'начала')+(c.who?' · '+c.who:'')+': '+c.new+(c.comment?'  \n  _комментарий:_ '+c.comment:''));continue;}
      if(c.kind==='lost'){L.push('- **'+c.id+'** — строки нет в документе ('+c.section+'): '+c.old);continue;}
      L.push('- **'+c.id+'** '+(c.who||c.type||'')+' · '+(c.section||'')+(c.voice?' · 🎙':'')+'  \n  было: '+(c.old||'')+
        (c.kind==='edit'?'  \n  стало: '+c.new+(c.inPlace?' _(исправлено в «Сейчас в игре»)_':'')+(c.changed===false?' _(совпадает с текущим)_':'')+(c.proposal==='accepted'?' _(предложение принято)_':c.proposal==='changed'?' _(предложение исправлено сценаристом)_':''):c.kind==='delete'?'  \n  **удалить**':c.kind==='declined'?'  \n  _предложение стёрто — остаётся как есть_':'')+(c.comment?'  \n  _комментарий:_ '+c.comment:''));}
    fs.writeFileSync(MD,L.join('\n')+'\n');}
})().catch(e=>{console.error(e);process.exit(1);});
