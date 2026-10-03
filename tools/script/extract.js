// Все тексты игры для сценариста: node tools/script/extract.js [релиз.html] > тексты.json
// Разбирает код релизной сборки (acorn; один раз: cd tools/script && npm i) и находит каждую строку с русским текстом,
// которую видит или слышит игрок: реплики и ремарки роликов, реплики в игре, задачи, подсказки, крупные надписи, надписи
// над героями и в мире, названия уровней, сказки Кота, Сказы. Меню, настройки, титры, сохранения и отладка — не входят.
// Текст, собранный в коде, показывается целиком: вставки игры (кнопка, имя героя, число) — в фигурных скобках {…},
// условия (a?'x':'y') — отдельными вариантами. Для каждой строки — уровень, ролик и время в нём, кто говорит, озвучена ли
// (build/voice/lines.json) и где лежит каждый кусок текста в исходниках: index.html, модуль build/late_*.js или замена
// build/rep_*.py. Печатает JSON {made, release, sections:[{id,title,groups:[{kind,title,rows:[…]}]}]} — его читают
// make_doc.js (документ Word) и read_doc.js (правки из документа).
const fs=require('fs'),path=require('path'),acorn=require('acorn'),walk=require('acorn-walk');
const ROOT=path.join(__dirname,'..','..'),BD=path.join(ROOT,'zlataya_cep','build');
const REL=process.argv[2]||path.join(ROOT,'zlataya_cep','zlataya_cep_final06.html');
const rel=f=>path.relative(ROOT,f).split(path.sep).join('/');
const html=fs.readFileSync(REL,'utf8');const src=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).pop();
const ast=acorn.parse(src,{ecmaVersion:'latest',locations:true});
const CY=/[А-Яа-яЁё]/;
const colAt=(text,pos)=>pos-text.lastIndexOf('\n',pos-1)-1;
const lineAt=(text,pos)=>{let n=1;for(let i=text.indexOf('\n');i>=0&&i<pos;i=text.indexOf('\n',i+1))n++;return n;};

// ---------- откуда кусок: прототип, модуль или замена сборки ----------
// прототип — склейка частей proto/ (tools/proto.py); место куска пишется как index.html:строка склейки (apply_edits.js понимает)
const PROTO=require('child_process').execFileSync('python3',[path.join(ROOT,'tools','proto.py'),'cat'],{maxBuffer:1<<28}).toString();
const MODS=fs.readdirSync(BD).filter(f=>/^(late_\d+.*|fin_early)\.js$/.test(f)).map(f=>{const t=fs.readFileSync(path.join(BD,f),'utf8');const a=src.indexOf(t.trimEnd().slice(0,400));return {f,t,a,b:a<0?-1:a+t.trimEnd().length};});
const REPS=fs.readdirSync(BD).filter(f=>/^rep_\d+.*\.py$/.test(f)).map(f=>({f,t:fs.readFileSync(path.join(BD,f),'utf8')}));
const VOXA=src.indexOf('const VOX_LINES='),VOXB=VOXA<0?-1:src.indexOf('\n',VOXA);
const modAt=pos=>MODS.find(m=>m.a>=0&&pos>=m.a&&pos<m.b)||null;
function commonSuffix(a,b){let n=0;while(n<a.length&&n<b.length&&a[a.length-1-n]===b[b.length-1-n])n++;return n;}
function commonPrefix(a,b){let n=0;while(n<a.length&&n<b.length&&a[n]===b[n])n++;return n;}
function origin(start,end,value){const raw=src.slice(start,end),m=modAt(start);
  if(m){let q=start-m.a;if(m.t.substr(q,raw.length)!==raw)q=m.t.indexOf(raw);return {file:rel(path.join(BD,m.f)),line:q<0?null:lineAt(m.t,q),col:q<0?null:colAt(m.t,q)};}
  const occ=[];for(let q=PROTO.indexOf(raw);q>=0;q=PROTO.indexOf(raw,q+1))occ.push(q);
  if(occ.length){let best=occ[0];
    // одинаковые строки (копии функций): i-я в релизе вне модулей — i-я в прототипе, если их столько же; иначе — по соседнему коду до и после
    const rel_=[];for(let q=src.indexOf(raw);q>=0;q=src.indexOf(raw,q+1))if(!modAt(q)&&!(q>=VOXA&&q<VOXB))rel_.push(q);
    if(occ.length>1&&rel_.length===occ.length&&rel_.indexOf(start)>=0)best=occ[rel_.indexOf(start)];
    else if(occ.length>1){const pre=src.slice(Math.max(0,start-300),start),post=src.slice(end,end+300);let bs=-1;
      for(const q of occ){const s=commonSuffix(PROTO.slice(Math.max(0,q-300),q),pre)+commonPrefix(PROTO.slice(q+raw.length,q+raw.length+300),post);if(s>bs){bs=s;best=q;}}}
    return {file:'index.html',line:lineAt(PROTO,best),col:colAt(PROTO,best)};}
  // строка пришла заменой сборки: ищем её (или самый длинный её кусок) среди строк rep_*.py
  let bestR=null;for(const r of REPS){for(const mm of r.t.matchAll(/"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'/g)){const v=(mm[1]!=null?mm[1]:mm[2]).replace(/\\(.)/g,'$1').replace(/^'|'$/g,'');
    if(v.length>=4&&value.includes(v)&&(!bestR||v.length>bestR.len))bestR={file:rel(path.join(BD,r.f)),line:lineAt(r.t,mm.index),len:v.length};}}
  return bestR?{file:bestR.file,line:bestR.line}:{file:'?',line:null};}

// ---------- верхний уровень: функции внутри общей IIFE ----------
const iife=ast.body.find(st=>st.type==='ExpressionStatement'&&/Function/.test((st.expression.callee||{}).type||''));
const TOP=(iife?iife.expression.callee.body.body:ast.body);
function topOf(pos){let lo=0,hi=TOP.length-1;while(lo<=hi){const mid=(lo+hi)>>1,s=TOP[mid];if(pos<s.start)hi=mid-1;else if(pos>=s.end)lo=mid+1;else return s;}return null;}
function topName(st){if(!st)return '?';if(st.type==='FunctionDeclaration')return st.id.name;if(st.type==='VariableDeclaration')return st.declarations.map(d=>d.id.name).join(',');
  if(st.type==='ExpressionStatement'&&st.expression.type==='AssignmentExpression')return src.slice(st.expression.left.start,st.expression.left.end);return st.type;}
// уровни: {id:'1-1',name:'…',build:()=>build11()}
const LV={},LVNAME={},LVORDER=[];for(const m of src.matchAll(/\{id:'([^']+)',name:'([^']*)',build:(?:\(\)=>)?(\w+)/g)){if(!LV[m[3]])LV[m[3]]=m[1];LVNAME[m[1]]=m[2];LVORDER.push(m[1]);}
LV.buildZast='zast';

// ---------- что не входит: меню, настройки, джойстики, сохранения, титры, отладка ----------
const SKIP_MODS=/^late_(50_save|35_guard|70_menu|71_pads|88_occ|89_camorbit|95_dev)\.js$/;
const SKIP_TOP=new Set(['menuHTML','padStatus','pollPads','startFrom','KEYNAME','PATHS,PATHNAME','HERO_DEF','VOX_LINES','SPL_VOX_T,SPL_VOX_TEXT__','GD_FS','finBoot']);
const SKIP_TEXT=[/^Джойстик/, /Не удалось загрузить Three\.js/, /Нажмите любую кнопку/];
// модули, у которых свой раздел документа (остальные — по функции уровня, в которой стоит текст)
const MODLV={late_72_splash:'splash',late_87_boss4b:'4-B',late_92_koschei:'5-B2',late_93_koschei_level:'5-B2',late_94_koschei_tut:'5-B2',late_96_prolog_scooter:'p',late_97_buyan51:'5-1'};
// функции прототипа, которые модуль заменяет целиком (name=function… без сохранения прежней) — в релизе не работают, их тексты не в игре
const DEAD=new Set();{const PF=new Set([...PROTO.matchAll(/^function\s+([A-Za-z_$][\w$]*)\s*\(/gm)].map(x=>x[1]));
  for(const md of MODS)for(const x of md.t.matchAll(/(?<![\w.$])([A-Za-z_$][\w$]*)\s*=\s*function\b/g))if(PF.has(x[1])&&!new RegExp('=\\s*'+x[1].replace(/\$/g,'\\$')+'\\s*[;,]').test(md.t))DEAD.add(x[1]);}

// ---------- обёртки say/bark: function f(text){say('kot',text)} ----------
const WRAP={};   // имя → {who: строка|null|{arg:j}, text: k}
function scanWrap(name,fn){if(!fn||!/Function/.test(fn.type)||!name||name==='say'||name==='bark')return;const ps=fn.params.map(q=>q.name);
  walk.simple(fn.body.type==='BlockStatement'?fn.body:{type:'ExpressionStatement',expression:fn.body},{CallExpression(c){if(c.callee.type!=='Identifier'||(c.callee.name!=='say'&&c.callee.name!=='bark'))return;
    const o=c.callee.name==='bark'?1:0,wN=c.arguments[o],tN=c.arguments[o+1];if(!tN||tN.type!=='Identifier')return;const k=ps.indexOf(tN.name);if(k<0)return;
    let who=null;if(wN&&wN.type==='Literal')who=wN.value;else if(wN&&wN.type==='Identifier'&&ps.indexOf(wN.name)>=0)who={arg:ps.indexOf(wN.name)};else who={expr:wN?src.slice(wN.start,wN.end):''};
    WRAP[name]={who,text:k};}});}
walk.full(ast,n=>{if(n.type==='FunctionDeclaration'&&n.id)scanWrap(n.id.name,n);if(n.type==='VariableDeclarator'&&n.id.type==='Identifier'&&n.init)scanWrap(n.id.name,n.init);});

// ---------- корни текста: самое внешнее выражение, из которого собирается строка ----------
const roots=new Map();
walk.fullAncestor(ast,(n,_s,anc)=>{
  const ok=(n.type==='Literal'&&typeof n.value==='string'&&CY.test(n.value))||(n.type==='TemplateLiteral'&&n.quasis.some(q=>CY.test(q.value.cooked)));
  if(!ok)return;let i=anc.length-1,cur=n;
  while(i>0){const p=anc[i-1];
    if((p.type==='BinaryExpression'&&p.operator==='+')||p.type==='TemplateLiteral'||(p.type==='ConditionalExpression'&&p.test!==cur)||(p.type==='LogicalExpression'&&p.right===cur)||(p.type==='LogicalExpression'&&p.operator==='||'&&p.left===cur)){cur=p;i--;continue;}
    break;}
  if(!roots.has(cur.start))roots.set(cur.start,{node:cur,anc:anc.slice(0,i)});
});

// ---------- кто потребляет строку ----------
function fnName(anc,j){const f=anc[j];if(f.id&&f.id.name)return f.id.name;const q=anc[j-1];if(!q)return '?';
  if(q.type==='VariableDeclarator')return q.id.name;if(q.type==='Property')return '.'+(q.key.name||q.key.value);if(q.type==='AssignmentExpression')return src.slice(q.left.start,q.left.end);
  if(q.type==='CallExpression')return 'arg:'+(q.callee.type==='Identifier'?q.callee.name:q.callee.property?q.callee.property.name:'?');return '?';}
function consumer(node,anc){let cur=node;const path=[];
  for(let i=anc.length-1;i>=0;i--){const p=anc[i];
    if(p.type==='ArrayExpression'){path.push(p.elements.indexOf(cur));cur=p;continue;}
    if((p.type==='ConditionalExpression'&&p.test!==cur)||p.type==='LogicalExpression'||p.type==='SpreadElement'||p.type==='ParenthesizedExpression'||(p.type==='SequenceExpression')){cur=p;continue;}
    if(p.type==='ArrowFunctionExpression'&&p.body===cur){cur=p;continue;}
    if(p.type==='MemberExpression'&&p.object===cur){cur=p;continue;}
    if(p.type==='BinaryExpression'&&p.operator==='+'){cur=p;continue;}
    if(p.type==='CallExpression'&&p.callee===cur){cur=p;continue;}
    if(p.type==='ReturnStatement'){for(let j=i-1;j>=0;j--)if(/Function/.test(anc[j].type))return {kind:'return',name:fnName(anc,j),path};return {kind:'return',name:'?',path};}
    if(p.type==='CallExpression'){const c=p.callee;return {kind:'call',name:c.type==='Identifier'?c.name:c.type==='MemberExpression'&&!c.computed?'.'+c.property.name:'?',arg:p.arguments.indexOf(cur),call:p,path};}
    if(p.type==='NewExpression')return {kind:'new',name:p.callee.name||'?',path};
    if(p.type==='Property')return {kind:'prop',name:String(p.key.name||p.key.value),obj:anc[i-1],prop:p,path};
    if(p.type==='AssignmentExpression')return {kind:'assign',name:src.slice(p.left.start,p.left.end).replace(/\s+/g,''),path};
    if(p.type==='VariableDeclarator')return {kind:'var',name:p.id.name,path};
    return {kind:'expr',name:p.type+(p.operator||''),path};}
  return {kind:'?',name:'?',path};}

// ---------- вставки игры: {кнопка «прыжок»}, {имя героя}, {число} ----------
const KEYRU={jump:'прыжок',attack:'удар',guard:'щит',item:'предмет',skill:'умение',swap:'смена героя',roll:'кувырок',call:'зов',up:'вверх',down:'вниз',left:'влево',right:'вправо'};
function phLabel(n){const code=src.slice(n.start,n.end);
  if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&/^(K|padGlyph|glyph)$/.test(n.callee.name)){const a=n.arguments[n.arguments.length-1];return a&&a.type==='Literal'&&KEYRU[a.value]?'кнопка «'+KEYRU[a.value]+'»':'кнопка';}
  if(/^(heroName|HNAME)\b|\.d\.name$|WHO\[[^\]]*\]\[0\]|^nm$|NAMES?\[|heroNameAcc|\.name$/.test(code))return /lvName|LEVELS/.test(code)?'название уровня':'имя героя';
  if(/lvName|LEVELS\[/.test(code))return 'название уровня';
  if(/^ICO_|^[A-Z]{3,}I$|MAGI|GOOI/.test(code))return 'значок';
  if(/^(WORLDN|WN)\b|worldName/.test(code))return 'название мира';
  if(n.type==='Literal'&&typeof n.value==='number')return String(n.value);
  if(/^(fmt|zfmt)\(/.test(code))return 'время';
  if(/GATE\(|links|linkTotal|[nN]uts?\b|nutTotal|gems|Avail|combo|\.done|\.made|\.total|merges|feathers|shields|\.pen\b|\.tips|round|clean|pending|onRack|\bheld\b|\bgood\b|\bnx\b|\bst\b|\bpl\b|\bph\b|\bnut\b|\bw\b|\bs\b|\bm\b|\bset\b|mult\(|\.skaz\b/.test(code))return 'число';
  if(/Math\.|toFixed|\.length\b|\b(n|k|cnt|count|left|got|total|need|num)\b|\+\s*1\b|-\s*1\b|\d/.test(code)||n.type==='UpdateExpression'||(n.type==='BinaryExpression'&&/[-*/%]/.test(n.operator)))return 'число';
  return 'вставка';}
// варианты текста: [{segs:[{lit,raw,start,end}|{ph,code}], cond:[…]}]
const CAP=12;
function cond(test,yes){const c=src.slice(test.start,test.end);let m;
  if((m=c.match(/kind\s*===\s*'(\w+)'/))&&!/&&|\|\|/.test(c)){const nm=(WHONAME[m[1]]||m[1]);return yes?'если герой — '+nm:'если герой — не '+nm;}
  if(/^!?G\.solo$/.test(c))return (c[0]==='!')!==yes?'одиночный режим':'игра вдвоём';
  if(/^pi$/.test(c))return yes?'игрок 2':'игрок 1';
  return null;}
function variants(n){
  switch(n.type){
    case 'Literal':if(typeof n.value==='string')return [{segs:n.value?[{lit:n.value,start:n.start,end:n.end}]:[],cond:[]}];return [{segs:[{ph:phLabel(n),code:src.slice(n.start,n.end)}],cond:[]}];
    case 'TemplateLiteral':{let acc=[{segs:[],cond:[]}];n.quasis.forEach((q,i)=>{if(q.value.cooked)acc=acc.map(a=>({segs:a.segs.concat([{lit:q.value.cooked,start:q.start,end:q.end,tpl:true}]),cond:a.cond}));if(i<n.expressions.length)acc=cross(acc,variants(n.expressions[i]),n.expressions[i]);});return acc;}
    case 'BinaryExpression':if(n.operator==='+'&&hasText(n))return cross(variants(n.left),variants(n.right),n.right);break;
    case 'ConditionalExpression':if(hasText(n.consequent)||hasText(n.alternate)){const y=variants(n.consequent),no=variants(n.alternate),cy=cond(n.test,true),cn=cond(n.test,false);
      return y.map(v=>({segs:v.segs,cond:(cy?[cy]:[]).concat(v.cond),test:src.slice(n.test.start,n.test.end)})).concat(no.map(v=>({segs:v.segs,cond:(cn?[cn]:[]).concat(v.cond)})));}break;
    case 'LogicalExpression':if(hasText(n.right)||hasText(n.left)){if(n.operator==='&&')return variants(n.right);return variants(n.left).concat(variants(n.right));}break;
  }
  return [{segs:[{ph:phLabel(n),code:src.slice(n.start,n.end)}],cond:[]}];}
function hasText(n){let t=false;walk.full(n,x=>{if((x.type==='Literal'&&typeof x.value==='string')||x.type==='TemplateLiteral')t=true;});return t;}
function cross(a,b,bn){if(a.length*b.length>CAP){b=[{segs:[{ph:'вставка',code:src.slice(bn.start,bn.end)}],cond:[]}];}const o=[];for(const x of a)for(const y of b)o.push({segs:x.segs.concat(y.segs),cond:x.cond.concat(y.cond)});return o;}

// ---------- кто говорит ----------
const WHOSRC=src.match(/const WHO=\{([\s\S]*?)\};/);const WHONAME={},WHOCOL={};
if(WHOSRC)for(const m of WHOSRC[1].matchAll(/(\w+):\['([^']*)','(#[0-9a-fA-F]+)'/g)){WHONAME[m[1]]=m[2];WHOCOL[m[1]]=m[3];}
function whoOf(n){if(!n)return null;if(n.type==='Literal')return n.value===null?{who:null}:{who:String(n.value)};
  if(n.type==='ConditionalExpression'&&n.consequent.type==='Literal'&&n.alternate.type==='Literal')return {who:n.consequent.value+'/'+n.alternate.value};
  return {who:'*',code:src.slice(n.start,n.end)};}

// ---------- ролики: play({dur, says:[[t,d,кто,текст,безГолоса]], events:[{t,fn}], end}) ----------
function cineOf(anc){for(let i=anc.length-1;i>=0;i--){const a=anc[i];if(a.type==='CallExpression'&&a.callee.type==='Identifier'&&a.callee.name==='play'&&a.arguments[0]&&a.arguments[0].type==='ObjectExpression'){
  const def=a.arguments[0],prop=k=>def.properties.find(p=>p.key&&(p.key.name||p.key.value)===k);const d=prop('dur');
  // время внутри ролика: реплика says или событие events {t}
  let t=null,inEnd=false;for(let j=i+1;j<anc.length;j++){const x=anc[j];if(x.type==='Property'&&(x.key.name==='end'))inEnd=true;if(x.type==='ObjectExpression'&&j>i+1){const tp=x.properties.find(p=>p.key&&p.key.name==='t'&&p.value.type==='Literal');if(tp&&t==null)t=tp.value.value;}}
  return {node:a,dur:d&&d.value.type==='Literal'?d.value.value:null,t:inEnd?(d&&d.value.value):t};}}return null;}
function innerFn(anc,top){for(let i=anc.length-1;i>=0;i--){const a=anc[i];if(a===top)break;
  if(a.type==='FunctionDeclaration'&&a.id)return a.id.name;if(/Function/.test(a.type)){const q=anc[i-1];if(q&&q.type==='VariableDeclarator')return q.id.name;if(q&&q.type==='Property'&&q.key)return String(q.key.name||q.key.value);if(q&&q.type==='AssignmentExpression')return src.slice(q.left.start,q.left.end);}}return null;}

// ---------- тип текста по потребителю ----------
function typeOf(c){const k=c.kind,nm=c.name,a=c.arg;
  if(k==='call'){if(nm==='say')return a===1?'say':null;if(nm==='bark')return a===2?'bark':null;if(WRAP[nm]&&a===WRAP[nm].text)return 'say';
    if(nm==='OR')return a===4?'read':a===0?'task':null;if(nm==='O')return a===0?'task':null;
    if(/^(tip|teach|hitHero|likhoArrives|intro|t4HintShow)$/.test(nm))return 'tip';if(nm==='banner')return a===0?'banner':a===3?'bannerSub':null;if(nm==='flash')return 'banner';
    if(/^(floatText|emberOut|stumble|foeOk|foeBad|holdErr|stop|rztFail|rewind)$/.test(nm))return 'float';if(nm==='prompt')return 'mark';
    if(/^(scratchTex|signBoard|board|plate|sandWriting|\.fillText|lab|web|LB|lubokTex)$/.test(nm))return 'sign';if(/^(babble|devToast|\.devToast)$/.test(nm))return null;if(nm==='panel')return 'tale';}
  if(k==='assign'){if(nm==='W.name')return 'lvName';if(nm==='W.sub')return 'lvSub';if(nm==='W.pauseLine')return 'pause';if(/Tip$|guardText|LockText|Locked$|contextTip|^best$/.test(nm))return 'tip';if(/innerHTML|extra|linkLabel|textContent/.test(nm))return 'bar';if(/skaz/.test(nm))return 'skaz';}
  if(k==='prop'){if(nm==='says')return 'cine';if(nm==='text'||nm==='go'||nm==='okText')return 'tip';if(nm==='lines'||nm==='t')return 'tale';if(nm==='sub'||nm==='title')return 'tip';if(nm==='opts')return 'skaz';if(nm==='note')return 'mark';}
  if(k==='return'){if(/contextTip|\.text/.test(nm))return 'tip';if(nm==='stateSign')return 'sign';if(nm==='arg:O')return 'task';if(nm==='arg:prompt')return 'mark';}
  return 'screen';}
// ролик: строка — 4-й элемент [t,d,кто,текст] внутри says (в том числе says:[…].concat(…))
function saysEntry(node,anc){const el=anc[anc.length-1];if(!el||el.type!=='ArrayExpression'||el.elements[3]!==node||!el.elements[0])return null;
  if(!anc.some(a=>a.type==='Property'&&a.key&&a.key.name==='says'))return null;const e=el.elements;return {t:e[0].type==='Literal'?e[0].value:null,d:e[1]&&e[1].type==='Literal'?e[1].value:null,who:whoOf(e[2]),noVoice:!!(e[4]&&e[4].value)};}

// ---------- разделы ----------
const LVTITLE=id=>{const n=LVNAME[id]||id;return n.replace(/^(\S+) · /,'$1 · «')+(n.includes(' · ')?'»':'');};
const WORLDS=['Дремучий лес','Подводный Китеж','Небесное царство','Огненная Смородина','Остров Буян'];
const SECTIONS=[{id:'p',h1:'Пролог',title:'Пролог «Звенышко»',lvs:['splash','p']},{id:'luko',h1:'Лукоморье',title:'Лукоморье — хаб между мирами',lvs:['luko']}];
for(let w=1;w<=5;w++)for(const id of LVORDER.filter(x=>x[0]===String(w)))SECTIONS.push({id,h1:'Мир '+w+' · '+WORLDS[w-1],title:LVTITLE(id),lvs:[id]});
SECTIONS.push({id:'epi',h1:'Эпилог и Застава',title:'Эпилог',lvs:['epi']},{id:'zast',h1:'Эпилог и Застава',title:'Застава трёх богатырей',lvs:['zast']},
  {id:'common',h1:'Общие тексты',title:'Общие тексты — звучат и показываются на многих уровнях',lvs:[null]},
  {id:'names',h1:'Приложения',title:'Приложение А. Имена персонажей в субтитрах',tops:/^(WHO|HNAME)$/},
  {id:'helpers',h1:'Приложения',title:'Приложение Б. Помощники, весточки, умения и предметы',tops:/^(VEST|HELPER5|POWER|SIGN_COL,SIGN_NAME|W1,W2,W3,W4,W5,WL,WORLDN)$/},
  {id:'shop',h1:'Приложения',title:'Приложение В. Лавка Векши и примерочная',tops:/^(WEAR|WEAR_SLOTS,SLOT_NAME)$/},
  {id:'ui',h1:'Приложения',title:'Приложение Г. Надписи интерфейса в игре: счётчики, карта-рушник, экраны Сказа и сказок Кота',tops:/^(updateUI|hudW2|rtInfo|glyph)$/});
// в Лукоморье лавка, примерочная и карта — это интерфейс: товары — в приложении В, экраны — в приложении Г
const LUKO_UI=/^(dressDraw|draw|zfmt|openMap|W\.linkLabel|bossTo|info)$/;
function sectionOf(r){
  if(r.top==='WEAR'||r.top==='WEAR_SLOTS,SLOT_NAME')return 'shop';
  if(r.lv==='luko'&&r.fn==='dressDraw')return null;                      // рамка лавки (вкладки, цены, «купить») — меню
  for(const s of SECTIONS)if(s.tops&&s.tops.test(r.top))return s.id;
  if(r.lv==null)return 'common';if(r.lv==='zast'&&r.fn==='fmt')return null;
  if(r.lv==='luko'&&LUKO_UI.test(r.fn||''))return 'ui';
  const s=SECTIONS.find(x=>x.lvs&&x.lvs.includes(r.lv));return s?s.id:'common';}

// ---------- данные: списки и таблицы строк, которые код потом показывает (NUM[i], LINES[v][k], REFUSE[kind][1]) ----------
const USES=new Map();   // имя → [{node, anc}] — обращения X[…]
walk.fullAncestor(ast,(n,_s,anc)=>{if(n.type==='MemberExpression'&&n.computed&&n.object.type==='Identifier'){const k=n.object.name;(USES.get(k)||USES.set(k,[]).get(k)).push({node:n,anc:anc.slice(0,-1)});}});
function whoFromCall(c){const args=c.call.arguments;
  if(c.name==='say')return whoOf(args[0]);if(c.name==='bark')return whoOf(args[1]);if(c.name==='sayP'||(c.name==='OR'&&c.arg===4))return {who:'pelageya'};
  if(WRAP[c.name]){const w=WRAP[c.name].who;return typeof w==='string'||w===null?{who:w}:w.arg!=null?whoOf(args[w.arg]):{who:'*',code:w.expr};}return null;}
function viaData(name,top,depth){if(depth>2)return null;for(const u of USES.get(name)||[]){if(u.node.start<top.start||u.node.end>top.end)continue;
    let node=u.node,anc=u.anc;while(anc.length&&anc[anc.length-1].type==='MemberExpression'&&anc[anc.length-1].object===node){node=anc[anc.length-1];anc=anc.slice(0,-1);}
    const c=consumer(node,anc);if(c.kind==='var'&&depth<2){const r=viaData(c.name,top,depth+1);if(r)return r;continue;}
    const t=typeOf(c);if(t&&t!=='screen')return {type:t,who:c.kind==='call'?whoFromCall(c):null};}return null;}

// ---------- обход корней ----------
const raw=[];
for(const [pos,r] of [...roots].sort((a,b)=>a[0]-b[0])){
  if(pos>=VOXA&&pos<VOXB)continue;const m=modAt(pos);if(m&&SKIP_MODS.test(m.f))continue;
  const top=topOf(pos),tn=topName(top);if(SKIP_TOP.has(tn)||tn==='DIR')continue;if(!m&&top&&top.type==='FunctionDeclaration'&&DEAD.has(tn))continue;
  const c=consumer(r.node,r.anc);let type=typeOf(c);if(!type)continue;let dataWho=null;
  if(type==='screen'&&c.kind==='var'&&top){const u=viaData(c.name,top,0);if(u){type=u.type;dataWho=u.who;}}
  // пара [кто, текст]: REFUSE={proshka:['proshka','Я не голодный.'],…}
  {const el=r.anc[r.anc.length-1];if(el&&el.type==='ArrayExpression'&&el.elements.length===2&&el.elements[1]===r.node&&el.elements[0]&&el.elements[0].type==='Literal'&&(el.elements[0].value===null||WHONAME[el.elements[0].value])){dataWho={who:el.elements[0].value};if(type==='screen')type=el.elements[0].value===null?'say':'bark';}}
  let lv=LV[tn]||null;if(m&&MODLV[m.f.replace(/\.js$/,'')])lv=MODLV[m.f.replace(/\.js$/,'')];
  if(/^(lukoScene|TAILS|LUBOK|skazClouds)$/.test(tn))lv='luko';
  if(tn==='LEVELS'&&c.kind==='prop'&&c.name==='name'&&c.obj){const idp=c.obj.properties.find(p=>p.key&&p.key.name==='id');if(idp)lv=/^z-/.test(idp.value.value)?'zast':idp.value.value;type='chapter';}
  const cine=cineOf(r.anc);let who=null,t=null,d=null,noVoice=false;
  const se=saysEntry(r.node,r.anc);
  if(se){({t,d,noVoice}=se);who=se.who;type='cine';}
  else if(c.kind==='prop'&&c.name==='says')continue;
  if(c.kind==='call'&&!se)who=whoFromCall(c);
  if(!who&&dataWho)who=dataWho;
  if(type==='cine'&&!cine)type='say';
  let cfn=null;if(cine){const k=r.anc.indexOf(cine.node);cfn=innerFn(r.anc.slice(0,k+1),top);}
  const fn=innerFn(r.anc,top);let vs=variants(r.node);
  // составная строка интерфейса (много вариантов или вставок) — сценаристу по кускам: каждый кусок с текстом — отдельной строкой
  const phMax=Math.max(...vs.map(v=>v.segs.filter(s=>s.ph).length)),sec=sectionOf({top:tn,lv,fn});
  const part=vs.length>6||sec==='ui'||(/^(screen|bar)$/.test(type)&&(vs.length>2||phMax>=3));
  if(part){const seen=new Set(),ps=[];for(const v of vs)for(const s of v.segs)if(s.lit!=null&&!seen.has(s.start)){seen.add(s.start);ps.push({segs:[s],cond:[],part:true});}vs=ps;}
  vs.forEach(v=>{if(!v.segs.some(s=>s.lit&&CY.test(s.lit)))return;
    const text=v.segs.map(s=>s.lit!=null?s.lit:'{'+s.ph+'}').join('');if(SKIP_TEXT.some(re=>re.test(text)))return;
    raw.push({pos,lv,top:tn,fn,sec,part:!!v.part,cine:cine&&{pos:cine.node.start,dur:cine.dur,fn:cfn},t:se?t:cine?cine.t:null,d,type,
      who:who?who.who:undefined,noVoice,cond:v.cond,text,
      pieces:v.segs.filter(s=>s.lit!=null).map(s=>({raw:src.slice(s.start,s.end),...origin(s.start,s.end,s.lit)})),
      order:(()=>{let k=0;return v.segs.map(s=>s.lit!=null?k++:s.ph);})(),
      phs:v.segs.filter(s=>s.ph).map(s=>s.code)});});
}

// ---------- видимый текст: <i>, <b>, <br> и вставки {…}; остальная разметка убирается (markup.js) ----------
const {visible}=require('./markup.js');
const hasWords=v=>CY.test(v.replace(/\{[^}]*\}/g,''));

// ---------- озвучка: build/voice/lines.json ----------
const VOICE=JSON.parse(fs.readFileSync(path.join(BD,'voice','lines.json'),'utf8')).lines;
const vByText=new Map();for(const e of VOICE){(vByText.get(e.text)||vByText.set(e.text,[]).get(e.text)).push(e);}

// ---------- ролики: название и задача сцены из docs/05_cinematics.md ----------
const CINEDOC=[];{const LVM={'Пролог':'p','Эпилог':'epi','Застава':'zast','Лукоморье':'luko'};
  const md=fs.readFileSync(path.join(ROOT,'zlataya_cep','docs','05_cinematics.md'),'utf8');
  for(const m of md.matchAll(/^\| \d+ \| ([^|·]+?) · `(\w+)` \| ([\d.]+) с · \d+ \| ([^|]+?) \|/gm)){const l=m[1].trim();CINEDOC.push({lv:LVM[l]||l.replace('Б','B'),fn:m[2],dur:+m[3],about:m[4].trim()});}}
function cineAbout(lv,fn,dur){const c=CINEDOC.filter(x=>x.lv===lv&&x.fn===fn);if(!c.length)return null;c.sort((a,b)=>Math.abs(a.dur-dur)-Math.abs(b.dur-dur));return c[0].about;}

// общие тексты — по темам (функция верхнего уровня)
const COMMON_TOPICS=[['Герои: прыжки, падения, смена героя, клубочек',/^(onFall|updatePlayer|doJump|doSwap|doCall|soloSwap|updateLeftBehind|startCling|updateCling|updateDowned|damageHero|dsSwapOut|dsTick|BlockStatement|integrate|HNAME)$/],
  ['Умения героев и предметы: клубок, гусли, перо, клещи, живая вода',/^(doSkill|toss|owlSight|shootAcorn|ladle|throwYarn|glue|makeString|releaseString|updateThreads|takeItem|playGusli|requestWater|playFeather|featherFx|playTongs|hotItem|pickHot|lostHot|updateHots|useSign|lavaWaterTarget|crustAt|steamVent|updateVents|collectSpark|updateSparks)$/],
  ['Бой и мороки',/(Foe|^foe|^hitHero|^parryFoe|^shieldBlock|^oneSwoop|^p7|^emberOut|^knockPlate|^enemyHit|^finisher|^unravel|^updateFoe|^updateBolts|^bogatyrExit|^contextTip|^updateGeese|^gooseGrab|^updateFlocks|^likhoCatch|^updateLikhos|^mimicSig|^peekSig)/],
  ['Мир: механизмы, облака, сундуки, переходы',/./]];

// ---------- сборка строк ----------
const T={cine:'ролик',say:'реплика',bark:'реплика',read:'Пелагея читает подсказку',task:'задача',tip:'подсказка',banner:'крупная надпись',bannerSub:'строка под крупной надписью',float:'надпись над героем',mark:'подпись у кнопки-подсказки',
  sign:'надпись в мире',lvName:'название уровня',lvSub:'подзаголовок уровня',pause:'пауза: «Что мы делаем»',chapter:'название в главах и на рушнике',tale:'сказка Кота / лубок',skaz:'Сказ (кусок на выбор)',bar:'строка на экране',screen:'текст на экране'};
for(const r of raw){r.consumer=r.consumer||'';r.vis=visible(r.text);
  // говорящий: из вызова, а если его нет — из каталога озвучки
  const ve=vByText.get(r.text)||[];if(ve.length){r.voice=ve.map(e=>e.id);const ws=[...new Set(ve.map(e=>e.who))];
    if((r.who===undefined||r.who==='*')&&ws.length===1){r.who=ws[0];if(/^(screen|skaz|tale|tip)$/.test(r.type))r.type='say';}
    const vw=[...new Set(ve.map(e=>e.voice).filter(Boolean))];if(r.who==null&&vw.length===1)r.voiceWho=WHONAME[vw[0]]||vw[0];}}
const kept=raw.filter(r=>hasWords(r.vis));
// одинаковые варианты одного выражения (отличались только разметкой) — одна строка
const byKey=new Map(),rowsOut=[];
for(const r of kept){const sec=r.sec;if(!sec)continue;
  const dedupe=r.type!=='cine'?[sec,r.type,r.who||'',r.vis].join('|'):[sec,'cine',r.cine.pos,r.t,r.who||'',r.vis].join('|');
  const prev=byKey.get(dedupe);const occ={file:r.pieces.map(p=>p.file),pieces:r.pieces,phs:r.phs,order:r.order};
  if(prev){prev.n++;if(!prev.occ.some(o=>JSON.stringify(o.pieces)===JSON.stringify(occ.pieces)))prev.occ.push(occ);if(r.voice)prev.voice=[...new Set((prev.voice||[]).concat(r.voice))];continue;}
  const o={sec,part:r.part,pos:r.pos,lv:r.lv,top:r.top,fn:r.fn,type:r.type,who:r.who===undefined?null:r.who,cond:(r.part?['часть составной строки']:[]).concat(r.cond).join(', ')||null,voiceWho:r.voiceWho||null,text:r.vis,n:1,voice:r.voice||null,
    cine:r.cine,t:r.t,d:r.d,noVoice:r.noVoice||undefined,occ:[occ]};
  byKey.set(dedupe,o);rowsOut.push(o);}
// варианты: строки одного выражения рядом — «вариант 1 из 2»
const byPos=new Map();for(const r of rowsOut)(byPos.get(r.sec+r.pos)||byPos.set(r.sec+r.pos,[]).get(r.sec+r.pos)).push(r);
for(const g of byPos.values())if(g.length>1&&!g[0].part)g.forEach((r,i)=>{r.var=(i+1)+' из '+g.length;});

// ---------- группы в разделе: название уровня, затем по коду — «во время игры» и ролики ----------
const out=[];let idn=0;const nextId=()=>String(++idn).padStart(4,'0');
const HEAD_ORDER={chapter:0,lvName:1,lvSub:2,pause:3};
for(const S of SECTIONS){const rs=rowsOut.filter(r=>r.sec===S.id);if(!rs.length)continue;const groups=[];
  const head=rs.filter(r=>r.type in HEAD_ORDER).sort((a,b)=>HEAD_ORDER[a.type]-HEAD_ORDER[b.type]||a.pos-b.pos);
  if(head.length)groups.push({kind:'head',title:'Название и описание уровня',rows:head});
  const body=rs.filter(r=>!(r.type in HEAD_ORDER));
  if(S.id==='common'){for(const [title,re] of COMMON_TOPICS){const g=body.filter(r=>!r._g&&re.test(r.top));g.forEach(r=>{r._g=1;});if(g.length)groups.push({kind:'play',title,rows:g});}}
  else if(S.tops||S.id==='ui'||S.id==='shop'){groups.push({kind:'list',title:'',rows:body});}
  else{const cines=new Map();let cur=null;
    for(const r of body){if(r.type==='cine'||r.cine){const k=r.cine.pos;if(!cines.has(k)){const g={kind:'cine',pos:k,dur:r.cine.dur,fn:r.cine.fn,about:cineAbout(r.lv==='splash'?'p':r.lv,r.cine.fn,r.cine.dur),rows:[]};cines.set(k,g);groups.push(g);cur=null;}cines.get(k).rows.push(r);}
      else{if(!cur){cur={kind:'play',title:'Во время игры',rows:[]};groups.push(cur);}cur.rows.push(r);}}
    // заставка студии — отдельная группа в начале пролога
    for(const g of groups)if(g.kind==='play'&&g.rows.some(r=>r.lv==='splash')){const sp=g.rows.filter(r=>r.lv==='splash');g.rows=g.rows.filter(r=>r.lv!=='splash');groups.unshift({kind:'play',title:'Заставка студии',rows:sp});break;}
    for(const g of groups)if(g.kind==='cine')g.rows.sort((a,b)=>(a.t==null?1e9:a.t)-(b.t==null?1e9:b.t)||a.pos-b.pos);}
  const gs=groups.filter(g=>g.rows.length);let ci=0;
  for(const g of gs){if(g.kind==='cine'){g.title='Ролик '+(++ci)+(g.about?' — '+g.about:'')+(g.dur?' · '+String(g.dur).replace('.',',')+' с':'');
      const says=g.rows.filter(r=>r.type==='cine'&&r.t!=null);says.forEach((r,i)=>{const nx=says.slice(i+1).find(x=>x.t>r.t);r.gap=+((nx?nx.t:g.dur)-r.t).toFixed(2);});}
    g.rows=g.rows.map(r=>({id:nextId(),type:r.type,typeName:T[r.type]||r.type,who:r.who,whoName:r.who==null?null:r.who.split('/').map(w=>WHONAME[w]||(w==='*'?'герой':w)).join(' / '),
      voiceWho:r.voiceWho,cond:r.cond,var:r.var||null,text:r.text,n:r.n,voice:r.voice,t:r.t,d:r.d,gap:r.gap,cineDur:r.cine?r.cine.dur:undefined,lv:r.lv,fn:r.fn,
      occ:r.occ.map(o=>({pieces:o.pieces.map(p=>({raw:p.raw,file:p.file,line:p.line,col:p.col})),phs:o.phs,order:o.order}))}));}
  out.push({id:S.id,h1:S.h1,title:S.title,groups:gs.map(g=>({kind:g.kind,title:g.title,dur:g.dur||null,rows:g.rows}))});}

const cast=JSON.parse(fs.readFileSync(path.join(BD,'voice','lines.json'),'utf8')).cast;
process.stdout.write(JSON.stringify({made:new Date().toISOString().slice(0,10),release:rel(REL),rows:idn,
  who:Object.keys(WHONAME).map(k=>({k,name:WHONAME[k],color:WHOCOL[k],about:cast[k]&&cast[k].about||null})),sections:out},null,1));
