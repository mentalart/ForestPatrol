// Все реплики игры для озвучки: node tools/voice/extract.js [релиз.html] > реплики.json
// Разбирает код релизной сборки (acorn; один раз: cd tools/voice && npm i) и находит реплики роликов (says:[[t,d,кто,текст]])
// и вызовы say(кто,текст)/bark(герой,кто,текст). Текст, собранный в коде, раскрывается во все варианты, если он составлен из
// строк: условия, случайный элемент списка, склейка, списки-константы. Для каждой реплики — уровень (по функции уровня),
// а в роликах — время до следующей реплики (предел длины записи). Печатает JSON: {lines:[…], dynamic:[нераскрытые места]}.
const fs=require('fs'),path=require('path'),acorn=require('acorn'),walk=require('acorn-walk');
const HTML=process.argv[2]||path.join(__dirname,'..','..','zlataya_cep','zlataya_cep_final06.html');
const html=fs.readFileSync(HTML,'utf8');const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);const src=scripts[scripts.length-1];
const ast=acorn.parse(src,{ecmaVersion:'latest',locations:true});
// функция уровня → id уровня
const LV={};for(const m of src.matchAll(/\{id:'([^']+)',name:'[^']*',build:(?:\(\)=>)?(\w+)/g))LV[m[2]]=m[1];
const HEROES=['proshka','potap','pelageya','yosha'];
// ---------- константы: имя → узел значения (для списков строк) ----------
const decls=new Map();walk.full(ast,n=>{if(n.type==='VariableDeclarator'&&n.id.type==='Identifier'&&n.init)(decls.get(n.id.name)||decls.set(n.id.name,[]).get(n.id.name)).push(n.init);});
const CAP=60;
// множество возможных строк для выражения (null — не удалось)
let ENV=null,SCOPE=null;   // ENV: t → списки кусочков Сказа; SCOPE: предки текущего узла (поиск переменных функции)
function strs(n,depth){depth=depth||0;if(!n||depth>6)return null;
  switch(n.type){
    case 'Literal':return typeof n.value==='string'?[n.value]:typeof n.value==='number'?[String(n.value)]:null;
    case 'TemplateLiteral':{let acc=[''];for(let i=0;i<n.quasis.length;i++){acc=acc.map(a=>a+n.quasis[i].value.cooked);if(i<n.expressions.length){const e=strs(n.expressions[i],depth+1);if(!e)return null;acc=cross(acc,e);if(!acc)return null;}}return acc;}
    case 'BinaryExpression':if(n.operator!=='+')return null;{const a=strs(n.left,depth+1),b=strs(n.right,depth+1);return a&&b?cross(a,b):null;}
    case 'ConditionalExpression':{const a=strs(n.consequent,depth+1),b=strs(n.alternate,depth+1);return a&&b?uniq(a.concat(b)):null;}
    case 'LogicalExpression':{const a=strs(n.left,depth+1),b=strs(n.right,depth+1);return a&&b?uniq(a.concat(b)):null;}
    case 'ArrayExpression':return null;
    case 'MemberExpression':{if(!n.computed)return null;if(ENV&&n.object.type==='Identifier'&&ENV[n.object.name]&&n.property.type==='Literal')return ENV[n.object.name][n.property.value]||null;const arr=arrOf(n.object,depth+1);return arr;}
    case 'Identifier':{if(ENV&&ENV[n.name]&&!Array.isArray(ENV[n.name][0]))return ENV[n.name];const d=local(n.name)||decls.get(n.name);if(d&&d.length===1&&d[0].type!=='ArrayExpression')return strs(d[0],depth+1);return null;}
    case 'CallExpression':{const c=n.callee;if(c.type==='MemberExpression'&&!c.computed){const b=strs(c.object,depth+1);if(!b)return null;const m=c.property.name;
        if(m==='toLowerCase')return b.map(x=>x.toLowerCase());if(m==='replace'&&n.arguments[0]&&n.arguments[0].regex&&n.arguments[0].regex.pattern==='^.')return b.map(x=>x.charAt(0).toLowerCase()+x.slice(1));}return null;}}
  return null;}
function arrOf(n,depth){if(n.type==='ArrayExpression'){let out=[];for(const e of n.elements){const s=strs(e,depth);if(!s)return null;out=out.concat(s);}return uniq(out);}
  if(n.type==='Identifier'){const d=local(n.name)||decls.get(n.name);if(d&&d.length===1&&d[0].type==='ArrayExpression')return arrOf(d[0],depth);}return null;}
// переменная, объявленная в одной из функций-предков (ближайшая)
function local(name){if(!SCOPE)return null;for(let i=SCOPE.length-1;i>=0;i--){const f=SCOPE[i];if(!/Function/.test(f.type))continue;const found=[];
  walk.recursive(f.body,null,{Function(){},VariableDeclarator(d){if(d.id.type==='Identifier'&&d.id.name===name&&d.init)found.push(d.init);}});if(found.length)return found.slice(-1);}return null;}
function cross(a,b){if(a.length*b.length>CAP)return null;const o=[];for(const x of a)for(const y of b)o.push(x+y);return uniq(o);}
function uniq(a){return [...new Set(a)];}
// говорящий: строка, null (ремарка) или h.kind (любой герой, с условием на h.kind в тексте)
function whoOf(n){if(!n)return null;if(n.type==='Literal')return [n.value];const s=strs(n);if(s)return s;return null;}
// обёртки: function sayP(text,…){…say('pelageya',text…)…} → вызовы sayP('…') — реплики Пелагеи
const WRAP={};walk.full(ast,n=>{if(n.type!=='FunctionDeclaration'||!n.id||n.id.name==='say'||n.id.name==='bark')return;const ps=n.params.map(q=>q.name);
  walk.simple(n.body,{CallExpression(c){if(c.callee.type==='Identifier'&&c.callee.name==='say'&&c.arguments[0]&&c.arguments[0].type==='Literal'&&c.arguments[1]&&c.arguments[1].type==='Identifier'){const k=ps.indexOf(c.arguments[1].name);if(k>=0)WRAP[n.id.name]={who:c.arguments[0].value,arg:k};}}});});
// пересказ Сказа: function tell(t){…} рядом со steps=[{opts:[…]},…] → t[i] — варианты i-го кусочка
function stepsNear(anc,fn){for(let i=anc.length-2;i>=0;i--){const f=anc[i];if(!/Function|Program/.test(f.type))continue;let st=null;
  walk.full(f.type==='Program'?f:f.body,d=>{if(d.type==='VariableDeclarator'&&d.id.name==='steps'&&d.init&&d.init.type==='ArrayExpression'&&d.init.start<fn.start&&d.init.elements.length&&d.init.elements.every(e=>e&&e.type==='ObjectExpression')&&(!st||d.init.start>st.start))st=d.init;});
  if(st)return st.elements.map(o=>{const p=o.properties.find(q=>(q.key.name||q.key.value)==='opts');return p?arrOf(p.value,0):null;});}return null;}
// ---------- обход ----------
const out=[],dyn=[];
function levelOf(anc){for(let i=anc.length-1;i>=0;i--){const a=anc[i];if(a.type==='FunctionDeclaration'&&a.id&&LV[a.id.name])return LV[a.id.name];}return null;}
function push(o){out.push(o);}
function textByKind(tn){// текст вида h.kind==='x'?A:(h.kind==='y'?B:C) → {x:A, y:B, *:C}
  const m={};let n=tn;while(n&&n.type==='ConditionalExpression'&&n.test.type==='BinaryExpression'&&/kind$/.test(src.slice(n.test.left.start,n.test.left.end))){m[n.test.right.value]=strs(n.consequent);n=n.alternate;}
  m['*']=strs(n);return m;}
walk.fullAncestor(ast,(n,_s,anc)=>{SCOPE=anc;ENV=null;
  {const fn=[...anc].reverse().find(a=>a.type==='FunctionDeclaration'&&/^tell/.test(a.id&&a.id.name)&&a.params[0]&&a.params[0].name==='t');if(fn){if(!fn._st)fn._st=stepsNear(anc.slice(0,anc.indexOf(fn)+1),fn)||'none';if(fn._st!=='none')ENV={t:fn._st};}}
  if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&n.callee.name==='OR'&&n.arguments[4]){const T=strs(n.arguments[4]);   // задача уровня: подсказку вслух читает Пелагея (o.read → sayP)
    if(T)T.forEach(t=>push({src:'OR.read',who:'pelageya',text:t,lv:levelOf(anc),line:n.loc.start.line,d:3.4}));else dyn.push({line:n.loc.start.line,who:'pelageya',text:src.slice(n.arguments[4].start,n.arguments[4].end).slice(0,100)});}
  if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&WRAP[n.callee.name]){const w=WRAP[n.callee.name],T=strs(n.arguments[w.arg]);if(T)T.forEach(t=>push({src:n.callee.name,who:w.who,text:t,lv:levelOf(anc),line:n.loc.start.line,d:null}));else dyn.push({line:n.loc.start.line,who:w.who,text:n.arguments[w.arg]?src.slice(n.arguments[w.arg].start,n.arguments[w.arg].end).slice(0,100):''});}
  if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&(n.callee.name==='say'||n.callee.name==='bark')){
    const a=n.arguments,o=n.callee.name==='bark'?1:0,wN=a[o],tN=a[o+1],lv=levelOf(anc),line=n.loc.start.line,d=a[o+2]&&a[o+2].type==='Literal'?a[o+2].value:null;
    const wsrc=wN?src.slice(wN.start,wN.end):'';
    if(/(^|\.)kind$/.test(wsrc)){const m=textByKind(tN),set=new Set();for(const k in m){if(k==='*')continue;if(m[k])m[k].forEach(t=>push({src:n.callee.name,who:k,text:t,lv,line,d}));set.add(k);}
      if(m['*'])HEROES.filter(h=>!set.has(h)).forEach(h=>m['*'].forEach(t=>push({src:n.callee.name,who:h,text:t,lv,line,d})));else dyn.push({line,who:wsrc,text:src.slice(tN.start,tN.end).slice(0,100)});return;}
    const W=wN&&wN.type==='Literal'&&wN.value===null?[null]:whoOf(wN),T=strs(tN);
    if(W&&T){for(const w of W)for(const t of T)push({src:n.callee.name,who:w,text:t,lv,line,d});}
    else dyn.push({line,who:wsrc.slice(0,40),text:tN?src.slice(tN.start,tN.end).slice(0,100):''});}
  if(n.type==='Property'&&(n.key.name||n.key.value)==='says'&&n.value.type==='ArrayExpression'){
    const parent=anc[anc.length-2];let dur=null;if(parent&&parent.type==='ObjectExpression'){const p=parent.properties.find(q=>q.key&&(q.key.name||q.key.value)==='dur');if(p&&p.value.type==='Literal')dur=p.value.value;}
    const lv=levelOf(anc);const els=n.value.elements.filter(e=>e&&e.type==='ArrayExpression').map(e=>({e,t:e.elements[0]&&e.elements[0].value}));
    els.forEach((x,i)=>{const [tN,dN,wN,xN,nv]=x.e.elements;const next=els.slice(i+1).find(y=>typeof y.t==='number'&&y.t>x.t);
      const gap=next?next.t-x.t:(dur!=null&&typeof x.t==='number'?dur-x.t:null);
      const W=wN&&wN.type==='Literal'?[wN.value]:whoOf(wN),T=strs(xN);
      if(W&&T){for(const w of W)for(const t of T)push({src:'cine',who:w,text:t,lv,line:x.e.loc.start.line,t:x.t,d:dN&&dN.value,gap,cineDur:dur,noVoice:!!(nv&&nv.value)});}
      else dyn.push({line:x.e.loc.start.line,who:wN?src.slice(wN.start,wN.end):'',text:xN?src.slice(xN.start,xN.end).slice(0,100):''});});}
});
// ---------- вручную: реплики из данных ----------
const B5=['Жил-был мальчик — сказки сам сложить мечтал','Жил у Кота Учёного ученик','Жил-был мальчишка с молоточком деревянным'],
  EN5=['И ушёл он — и был таков','И простили его — и прощенья он просил','И позвали его слушать — сел он в круг'],
  H5=['Леший со светлячком','Баба Яга с клубком','Колобок с пружиной','Садко с гуслями','Рыба-кит','Золотая рыбка','Жар-птица','Сирин и Алконост','Баба Яга со ступой','Демьян с молотом','Кикимора с крепкой куделью','Леший со светлячками'];
const man=(who,text,lv,note)=>push({src:'data',who,text,lv,line:0,d:null,note});
B5.forEach(b=>{man('pelageya',b+'…','5-B2','Сказ по памяти: начало');man('pelageya',b+'…','epi','эпилог: пятый Сказ');EN5.forEach(e=>man('kot',b+'… '+e+'.','luko','Кот пересказывает пятый Сказ'));});
H5.forEach(h=>man('pelageya','И помогал ему в том '+h.charAt(0).toLowerCase()+h.slice(1)+'.','5-B2','Сказ по памяти: помощник'));
[['proshka','<i>(с набитым ртом)</i> Ну и что это доказывает, а?'],['pelageya','<i>(шёпотом)</i> Спасибо, спасибо…'],['potap','Вкусно. Спасибо, матушка.'],['yosha','Ням! Сладкий, как мёд!']].forEach(([w,t])=>man(w,t,'3-5','пирожок из Печки'));
[1,2,3,4].forEach(k=>man('rybka','Все вчетвером на кольца! Ещё '+k+', ещё!','2-3','невод'));
['…синее — щит держи, красное — упрись, не дрожи.','Синее — щит. Красное — упрись, держись.','Щит. Упрись.','Держи.'].forEach(t=>man('pelageya',t,'4-5','Потап держит мост'));
const keep=new Set(['1540','1622','13304','1436','5838','6987','8223','8357','5491','5493']);   // сами say/play, отладка и места, перечисленные вручную выше   // сами say/play и отладка — не реплики
process.stdout.write(JSON.stringify({lines:out,dynamic:dyn.filter(x=>!keep.has(String(x.line)))},null,1));
