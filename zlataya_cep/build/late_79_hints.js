/* ============================== РЕЛИЗ final06 · ПОДСКАЗКИ: ОДНА КАРТОЧКА НА ИГРОКА, БЕЗ ПОВТОРОВ ============================== */
// Было: у каждого игрока два окна — подсказка сверху (tip0/tip1: tip() и contextTip) и задача снизу (obj0/obj1). Одинаковая задача
// у обоих игроков висела дважды, подсказка часто пересказывала задачу, и на экране разом оказывалось до четырёх больших окон
// (плюс «весточка», баннер, субтитры, подсказка босса). Стало:
//  • у игрока одна карточка — под его панелью в углу экрана (как продолжение HUD): задача, а когда есть подсказка — подсказка,
//    над ней коротко задача (первая фраза);
//  • одинаковое у обоих (с точностью до кнопок) — одна общая карточка по центру под счётчиком; кнопки обоих игроков — «R / ;»;
//  • почти одинаковое (общее начало, разница в паре слов) — тоже одна, различия цветом игрока; разные роли остаются у каждого;
//  • подсказка, которая пересказывает задачу (слова подсказки почти все есть в задаче), не показывается; задача, которую целиком
//    повторяет подсказка, — тоже; подсказка, которую сейчас произносят в субтитрах или пишет баннер, — тоже;
//  • идёт подсказка босса (карточка по центру) — подсказки игроков молчат, остаётся только задача;
//  • виден баннер события — карточка, которую он задевает, сжимается в одну строку, а не поместилась — уступает ему место;
//  • одиночная игра: карточка того, кем играешь; задача второго — только если другая, и бледнее.
// Прежние окна tip0/tip1/obj0/obj1 остаются в DOM с теми же текстами (их пишет updateUI прототипа) — их скрывает fin.css.
const HN={els:null,html:['','',''],shown:[false,false,false],objK:['','',''],flash:[0,0,0],titleT:-99,cmp:[false,false,false]};
const HN_KEY=/<kbd>[\s\S]*?<\/kbd>|<span class="pb [^"]*">[\s\S]*?<\/span>/g;
const hnText=h=>String(h||'').replace(HN_KEY,' ⌨ ').replace(/<br\s*\/?>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ');
const hnNorm=h=>hnText(h).replace(/[«»"“”.,!?:;—–\-()…·✦]/g,' ').replace(/\s+/g,' ').trim().toLowerCase();
const hnWords=h=>hnNorm(h).split(' ').filter(w=>w.length>3&&w!=='⌨').map(w=>w.slice(0,5));
// какая доля слов a есть в b (по основам из пяти букв)
function hnCover(a,b){const A=hnWords(a),B=new Set(hnWords(b));if(A.length<3||!B.size)return 0;let n=0;for(const w of A)if(B.has(w))n++;return n/A.length;}
// одинаковые тексты двух игроков с разными кнопками — в один, кнопки «первый / второй»
function hnMerge(a,b){if(a===b)return a;const ka=a.match(HN_KEY)||[],kb=b.match(HN_KEY)||[],sa=a.split(HN_KEY),sb=b.split(HN_KEY);
  if(ka.length!==kb.length||sa.join('\u0001')!==sb.join('\u0001'))return null;
  let out=sa[0];for(let i=0;i<ka.length;i++)out+=(ka[i]===kb[i]?ka[i]:'<span class="hn-k2"><span class="hn-p1">'+ka[i]+'</span><i>/</i><span class="hn-p2">'+kb[i]+'</span></span>')+sa[i+1];return out;}
// почти одинаковые тексты (общая часть + у каждого своя фраза: «Левая голова — твоя…» / «Правая голова — твоя…»): общие фразы —
// в общую карточку один раз, у каждого игрока остаются только свои
const hnSent=h=>String(h||'').replace(/<br\s*\/?>/gi,'\n').split(/\n|(?<=[.!?…])\s+(?=[^\s<])/).map(x=>x.trim()).filter(x=>hnNorm(x).length>1);
function hnSplit(a,b){const A=hnSent(a),B=hnSent(b);if(A.length<2&&B.length<2)return null;const nb=B.map(hnNorm),used=new Set(),com=[],ra=[];
  for(const x of A){const k=hnNorm(x),j=nb.findIndex((y,i)=>!used.has(i)&&y===k);if(j>=0&&hnWords(x).length>=2){used.add(j);com.push(hnMerge(x,B[j])||x);}else ra.push(x);}
  if(!com.length||(!ra.length&&used.size===B.length))return null;return {common:com.join(' '),a:ra.join(' '),b:B.filter((_,i)=>!used.has(i)).join(' ')};}
// почти одинаковые тексты с общим началом (различие — пара слов или кнопок: «…Потап его поднимет E (смени героя Q).» /
// «…Потап его поднимет. Беги следом!»): одним текстом, различия — парой «первый / второй» цветами игроков. Тексты, которые
// начинаются по-разному («Левая голова — твоя…» / «Правая голова — твоя…»), — разные роли, их не склеивать
const HN_TOK=/<kbd>[\s\S]*?<\/kbd>|<span class="pb [^"]*">[\s\S]*?<\/span>|<i [^>]*><\/i>|<[^>]+>|[^\s<.,!?:;()«»…—–]+|[.,!?:;()«»…—–]/g;
const hnIsKey=t=>/^(<kbd>|<span class="pb )/.test(t);
function hnJoin(ts){let s='';for(const t of ts){const br=/^<br/i.test(t);
    if(s&&!br&&!/<br\s*\/?>$/i.test(s)&&!/[(«]$/.test(s)&&!/<[a-z][^>]*>$/i.test(s.slice(s.lastIndexOf('<')))&&!/^[.,!?:;)»…]$/.test(t)&&!/^<\//.test(t))s+=' ';s+=t;}return s;}
const HN_FZ=new Map();
function hnFuzzy(a,b){const key=a+'\u0002'+b;if(HN_FZ.has(key))return HN_FZ.get(key);if(HN_FZ.size>64)HN_FZ.clear();const r=hnFuzzy0(a,b);HN_FZ.set(key,r);return r;}
function hnFuzzy0(a,b){const A=a.match(HN_TOK)||[],B=b.match(HN_TOK)||[],n=A.length,m=B.length;if(!n||!m||n*m>14000)return null;
  let p=0;while(p<n&&p<m&&A[p]===B[p])p++;if(p<3)return null;
  const L=[];for(let i=0;i<=n;i++)L.push(new Uint16Array(m+1));
  for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)L[i][j]=A[i]===B[j]?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
  const eq=L[0][0],mn=Math.min(n,m),mx=Math.max(n,m);if(eq<0.55*mx&&!(eq>=0.8*mn&&mx-eq<=8))return null;   // или почти целиком общее, или у одного — короткий хвост («Солнышко! Защита G — в последний миг.»)
  const out=[];let i=0,j=0,da=[],db=[],runs=0,words=0,bad=false;
  const flush=()=>{if(!da.length&&!db.length)return;
    if(da.length&&db.length&&hnIsKey(da[0])&&hnIsKey(db[0])&&da.length+db.length>2){const ra=da.slice(1),rb=db.slice(1);da=[da[0]];db=[db[0]];flush();da=ra;db=rb;flush();return;}   // кнопки — парой отдельно от слов
    runs++;const keys=da.concat(db).every(hnIsKey);if(!keys)words++;
    if(da.length>8||db.length>8||da.concat(db).some(t=>t[0]==='<'&&!hnIsKey(t)&&!/^<i /.test(t)))bad=true;
    out.push(da.length&&db.length?'<span class="'+(keys?'hn-k2':'hn-v2')+'"><span class="hn-p1">'+hnJoin(da)+'</span><i>/</i><span class="hn-p2">'+hnJoin(db)+'</span></span>'
      :'<span class="hn-v1 '+(da.length?'hn-p1">'+hnJoin(da):'hn-p2">'+hnJoin(db))+'</span>');da=[];db=[];};
  while(i<n||j<m){if(i<n&&j<m&&A[i]===B[j]){flush();out.push(A[i]);i++;j++;}else if(j>=m||(i<n&&L[i+1][j]>=L[i][j+1]))da.push(A[i++]);else db.push(B[j++]);}
  flush();return bad||runs>5||words>2?null:hnJoin(out);}
// пара текстов двух игроков → общее {s} и у каждого своё {a, b}; null — общего нет
function hnPair(x,y){if(!x||!y)return null;const m=hnMerge(x,y);if(m!==null)return {s:m,a:'',b:''};const f=hnFuzzy(x,y);if(f)return {s:f,a:'',b:''};
  const r=hnSplit(x,y);if(!r)return null;const g=r.a&&r.b?hnFuzzy(r.a,r.b):null;return g?{s:r.common+' '+g,a:'',b:''}:{s:r.common,a:r.a,b:r.b};}
// первая фраза задачи — заголовок над подсказкой
function hnShort(h){const t=hnText(h).replace(/\s+/g,' ').trim();const m=t.match(/^[^.!?]{4,}?[.!?…]/);let s=(m?m[0]:t).replace(/\s*⌨\s*/g,' ').trim();if(s.length>64)s=s.slice(0,62).replace(/\s+\S*$/,'')+'…';return s;}
function hnDom(){if(HN.els&&HN.els[0].isConnected)return HN.els;const par=$('tip0').parentNode;
  HN.els=['hint0','hint1','hintS'].map((id,i)=>{let d=$(id);if(!d){d=document.createElement('div');d.id=id;d.className='hn-card '+['hn-p1c','hn-p2c','hn-both'][i];
    d.innerHTML='<div class="hn-head"></div><div class="hn-body"></div>';par.appendChild(d);}return d;});return HN.els;}
// карточка игрока: задача и подсказка → {head, body}
function hnCard(o,t){if(!t)return o?{head:'',body:o}:null;if(!o)return {head:'',body:t};
  if(hnCover(t,o)>=0.6)return {head:'',body:o};       // подсказка пересказывает задачу
  if(hnCover(o,t)>=0.7)return {head:'',body:t};       // подсказка содержит всю задачу и больше
  return {head:hnShort(o),body:t};}
// видно ли окно: по заданному стилю (баннер гаснет переходом opacity — смотрим, к чему он идёт), иначе по вычисленному
function hnVisible(id){const e=$(id);if(!e||!e.innerHTML.trim())return '';const cs=getComputedStyle(e);if(cs.display==='none')return '';return +(e.style.opacity!==''?e.style.opacity:cs.opacity)<0.1?'':e.innerHTML;}
const hnHit=(r,q,m)=>Math.min(r.right,q.right)-Math.max(r.left,q.left)>-m&&Math.min(r.bottom,q.bottom)-Math.max(r.top,q.top)>-m;   // пересекаются или ближе m px
function hnLayout(){const els=hnDom(),cine=!!G.cine,lv=$('level'),title=G.time-HN.titleT<4.2&&!!lv&&lv.style.opacity==='1';   // заставка с именем уровня (3,6 с; баннер убирает её раньше) — карточки ждут
  const off=cine||title||G.ui||G.state!=='play'||!W||document.body.classList.contains('fin-title')||!!(W.hintsOff&&W.hintsOff());   // W.hintsOff — уровень сам гасит карточки (5-Б2 k5epic: текст — только в начале стадии)
  let O=[0,1].map(pi=>off?'':(hudEls[pi].cache.obj||'')),T=[0,1].map(pi=>off?'':(hudEls[pi].cache.tip||''));
  // подсказка босса, субтитры, баннер — уже говорят: подсказки игроков молчат или не повторяют их
  const boss=$('finBossHint'),bossOn=!!(boss&&boss.classList.contains('on'));if(bossOn)T=['',''];
  const said=hnVisible('subs')+' '+hnVisible('banner');if(said.trim())T=T.map(t=>t&&hnCover(t,said)>=0.6?'':t);
  // одиночная игра: подсказки — только тому, кем играешь
  const solo=G.solo,sp=G.soloPi;if(solo)T[1-sp]='';
  // подсказка, которая пересказывает задачу (свою, друга или общую), лишняя — задача уже на экране
  for(const pi of[0,1])if(T[pi]&&O.some(o=>o&&hnCover(T[pi],o)>=0.6))T[pi]='';
  // одинаковое у обоих — в общую карточку; тогда в личных остаётся только своё (подсказка без задачи или задача без подсказки)
  const SH=[0,1].map(pi=>{const o=O[pi]&&W&&W.objectives&&W.objectives[pi]&&W.objectives[pi][players[pi].obj];return o&&o.short?o.short(pi):'';});
  let S={o:'',t:''};const po=hnPair(O[0],O[1]),pt=hnPair(T[0],T[1]);
  if(po){S.o=po.s;O=[po.a,po.b];}if(pt){S.t=pt.s;T=[pt.a,pt.b];}
  if(solo&&O[1-sp]&&O[sp]&&hnCover(O[1-sp],O[sp])>=0.8)O[1-sp]='';
  // краткая формулировка задачи (o.short — таблица late_79c_taskshort.js): крупной строкой над полным текстом; у общей карточки — если у обоих одна
  const shS=SH[0]&&SH[1]?(hnMerge(SH[0],SH[1])||SH[0]):SH[0]||SH[1];   // кнопки двух игроков в общей строке — парой «R / ;»
  const cards=[hnCard(O[0],T[0]),hnCard(O[1],T[1]),hnCard(S.o,S.t)];
  [[0,O[0],SH[0]],[1,O[1],SH[1]],[2,S.o,shS]].forEach(([i,o,sh])=>{const c=cards[i];if(c&&o&&sh){c.head=sh;c.sh=true;c.rd=c.body===o;}});
  // баннер события («Вал догнал!», «Коршун!») висит по центру по нескольку секунд: общая карточка на это время сжимается в одну
  // строку (◆ первая фраза задачи), личная — если баннер её задевает; не поместилась и так — уступает баннеру место
  const BR=hnVisible('banner')?$('banner').getBoundingClientRect():null;if(!BR)HN.cmp=[false,false,false];else HN.cmp[2]=true;
  // строка сжатой карточки: у общей — первая фраза задачи; у личной — первая своя фраза, которой нет у друга («Клещи 0 / 4.» у обоих)
  const line=i=>{const c=cards[i];if(i===2||!cards[1-i])return c.head||hnShort(c.body);const o=cards[1-i],had=new Set(hnSent((o.head?o.head+'<br>':'')+o.body).map(hnNorm));
    const own=hnSent((c.head?c.head+'<br>':'')+c.body).find(x=>!had.has(hnNorm(x)));return hnShort(own||c.head||c.body);};
  // три карточки: первого игрока, второго, общая; новая задача — карточка вспыхивает золотом
  const render=(i,c)=>{const el=els[i],html=!c?'':HN.cmp[i]?'<div class="hn-body">'+line(i)+'</div>':(c.head?'<div class="hn-head'+(c.sh?' hn-short':'')+(c.rd?' hn-rd':'')+'">'+c.head+'</div>':'')+'<div class="hn-body">'+c.body+'</div>';
    const on=!!c;if(HN.html[i]!==html){const was=HN.html[i];HN.html[i]=html;if(on){el.innerHTML=html;const k=hnNorm(c.head||c.body);if(k!==HN.objK[i]){HN.objK[i]=k;if(was)HN.flash[i]=G.time;el.classList.remove('hn-pop');void el.offsetWidth;el.classList.add('hn-pop');}}}
    if(HN.shown[i]!==on){HN.shown[i]=on;el.classList.toggle('on',on);}
    el.classList.toggle('hn-cmp',on&&HN.cmp[i]);el.classList.toggle('hn-dim',!!(solo&&i===1-sp));el.classList.toggle('hn-new',G.time-HN.flash[i]<1.2);};
  cards.forEach((c,i)=>render(i,c));
  // места: карточка игрока — под его панелью (у первого — под «весточкой»), общая — под счётчиком звеньев (и под подсказкой босса)
  const H0=$('hud0').getBoundingClientRect(),H1=$('hud1').getBoundingClientRect(),V=$('vest'),VR=V&&getComputedStyle(V).display!=='none'?V.getBoundingClientRect():null;
  let top0=Math.max(H0.bottom,VR?VR.bottom:0)+8,top1=H1.bottom+8;
  if(bossOn){const B=boss.getBoundingClientRect();if(12+els[0].offsetWidth>B.left-6)top0=Math.max(top0,B.bottom+8);if(innerWidth-12-els[1].offsetWidth<B.right+6)top1=Math.max(top1,B.bottom+8);}   // подсказка босса широкая — карточки игроков под ней
  els[0].style.top=top0+'px';els[1].style.top=top1+'px';
  let ts=Math.max(H0.bottom,H1.bottom);for(const id of['links','bossbar'])if($(id)&&getComputedStyle($(id)).display!=='none')ts=Math.max(ts,$(id).getBoundingClientRect().bottom);
  if(bossOn)ts=Math.max(ts,boss.getBoundingClientRect().bottom);if(VR&&VR.right>innerWidth/2-els[2].offsetWidth/2-6)ts=Math.max(ts,VR.bottom);   // длинная «весточка» — общая карточка ниже неё
  els[2].style.top=(ts+8)+'px';
  els.forEach((el,i)=>{let y=false;if(BR&&HN.shown[i]){if(!HN.cmp[i]&&hnHit(el.getBoundingClientRect(),BR,4)){HN.cmp[i]=true;render(i,cards[i]);}y=hnHit(el.getBoundingClientRect(),BR,4);}
    el.classList.toggle('hn-yield',y);});
  hnSkip();}
// плашка пропуска — над субтитрами (X-10): по умолчанию выше двух строк, а если реплика длиннее — ещё выше
function hnSkip(){const sk=$('skip'),sb=$('subs');if(!sk||!sb)return;sk.style.bottom='';
  if(getComputedStyle(sk).display==='none'||!hnVisible('subs'))return;
  const S=sb.getBoundingClientRect(),K=sk.getBoundingClientRect();if(K.bottom>S.top-6)sk.style.bottom=(innerHeight-S.top+8)+'px';}
{const _ui=updateUI;updateUI=function(dt){_ui(dt);try{hnLayout();}catch(e){console.error('hints',e);}};}
{const _st=showTitle;showTitle=function(){_st();HN.titleT=G.time;};}
FIN.hints={layout:hnLayout,cover:hnCover,merge:hnMerge,fuzzy:hnFuzzy,split:hnSplit,pair:hnPair,short:hnShort,state:()=>({html:HN.html.slice(),shown:HN.shown.slice()})};   // для ботов
