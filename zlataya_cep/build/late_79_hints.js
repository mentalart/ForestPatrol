/* ============================== РЕЛИЗ final06 · ПОДСКАЗКИ: ОДНА КАРТОЧКА НА ИГРОКА, БЕЗ ПОВТОРОВ ============================== */
// Было: у каждого игрока два окна — подсказка сверху (tip0/tip1: tip() и contextTip) и задача снизу (obj0/obj1). Одинаковая задача
// у обоих игроков висела дважды, подсказка часто пересказывала задачу, и на экране разом оказывалось до четырёх больших окон
// (плюс «весточка», баннер, субтитры, подсказка босса). Стало:
//  • у игрока одна карточка — под его панелью в углу экрана (как продолжение HUD) — и в ней один текст: подсказка, пока она на экране,
//    иначе задача (краткая строка, если она есть в таблице late_79c_taskshort.js, а не она и полный текст под ней);
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
// карточка игрока: один текст — {head, body}. Подсказка («что делать здесь») главнее задачи, пока она на экране; нет подсказки —
// задача: краткая строка (o.short, late_79c_taskshort.js), если она есть, иначе полный текст. Задача над подсказкой и полный текст
// под краткой строкой не нужны — они пересказывали друг друга и съедали пол-экрана
function hnCard(o,t,sh){if(t)return {head:'',body:t};if(!o)return null;return sh?{head:sh,body:'',sh:true,rd:true}:{head:'',body:o};}
// ---- «один раз», «сама уходит», «убрать», «показать снова», «выкл» ----
// • Подсказка (tip, контекстные зоны) показывается один раз за уровень: исчезла — вернуться сама не может (сыграла роль «видел»). Ключ — текст без цифр и знаков,
//   поэтому счётчик «3 / 10» не делает подсказку новой.
// • Всё показанное (карточки игроков, подсказка босса, табличка Соловья) само уходит, когда его успел бы прочитать восьмилетний: hnReadT — 2 с «заметить»
//   и по 0,75 с на слово (≈80 слов в минуту — чтение второклассника), не меньше 5 и не больше 20 с. Время идёт только пока надпись на экране (не в паузе и роликах).
//   Ушла подсказка — на её месте задача (со своим временем); ушла и задача — вернётся сама, когда сменится.
// • LB джойстика и H на клавиатуре (одно действие «Повтори») — одна кнопка: на экране есть подсказки — убирает всё, что игрок видит; ничего не видно —
//   показывает то, что нужно сейчас (текущую задачу или подсказку, подсказку босса), а нет такого — последнее виденное; показанное уходит тем же таймером.
//   «Читать задачи вслух» (late_79b) на том же LB читает показанное — так что «показать» ещё и повторяет голосом. В паузах, роликах и окнах нажатия не считаются.
//   (Крестовина не годится: она ещё и ведёт героя.)
// • «Подсказки: выкл» (по умолчанию; пауза — вверху списка, настройки): новые подсказки сами не появляются; LB показывает нужную сейчас, LB или таймер её убирают.
//   Класс fin-nohints на body прячет остальные надписи-подсказки (обучающая карточка, подписи пузырей — fin.css).
const HNS={W:null,tk:['','',''],td:[false,false,false],pk:['','',''],pv:[false,false,false],seen:new Set(),last:[null,null,null],rc:[null,null,null],
  vt:[null,null,null],ly:{},pr:new Map(),pgt:0,gt:0,dt:0,ev:[],taps:0,noh:null};
const HN_LAYERS=['finBossHint','solsign'];
const hnKey=h=>hnNorm(h).replace(/[0-9]+/g,'').replace(/\s+/g,' ').trim().slice(0,90);
const hnCardKey=c=>c?hnKey((c.head||'')+' '+(c.body||'')):'';
// по умолчанию подсказки выключены (их показывает LB / H; в прологе этому учит late_79t_hintteach.js); в ?debug — включены, как ждут боты
const hnOn=()=>FIN.set.hints!=null?FIN.set.hints!==false:!!(FIN.kids&&FIN.kids.debug);
const hnLayerOn=el=>el.classList.contains('on')||(el.id==='solsign'&&el.style.display==='block');
// сколько секунд читает надпись восьмилетний
function hnReadT(h){const w=String(h||'').replace(/<[^>]*>/g,' ').split(/\s+/).filter(x=>/[0-9A-Za-zА-Яа-яЁё]/.test(x)).length;return Math.min(20,Math.max(5,2+0.75*w));}
const hnCardText=c=>c?(c.head||'')+' '+(c.body||''):'';
function hnBlip(up){try{tone(up?1175:784,0.07,'triangle',0.07);}catch(e){}}
function hnReset(){HNS.W=W;HNS.tk=['','',''];HNS.td=[false,false,false];HNS.pk=['','',''];HNS.pv=[false,false,false];HNS.seen.clear();HNS.last=[null,null,null];HNS.rc=[null,null,null];HNS.vt=[null,null,null];HNS.ly={};HNS.pr=new Map();}
// O, T — задачи и подсказки трёх карточек (первого, второго, общая); off — окно закрыто роликом или меню: состояние стоит.
// Выключены подсказки — новая задача сразу убрана, подсказка не тратит свой «один раз» (показать — только LB)
function hnGate(O,T,off){if(HNS.W!==W)hnReset();const oo=['','',''],tt=['','',''],on=hnOn();
  for(let i=0;i<3;i++){
    if(!off){const ko=hnKey(O[i]);if(ko!==HNS.tk[i]){HNS.tk[i]=ko;HNS.td[i]=!on;}
      const kt=hnKey(T[i]);if(kt!==HNS.pk[i]){HNS.pk[i]=kt;HNS.pv[i]=false;if(kt&&on){const sk=i+'|'+kt;if(!HNS.seen.has(sk)){HNS.seen.add(sk);HNS.pv[i]=true;}}}}
    oo[i]=HNS.td[i]?'':O[i];tt[i]=HNS.pv[i]?T[i]:'';}
  return {o:oo,t:tt};}
// убрать: pis — карточки, которые видит нажавший; true — что-то убрано
function hnDismissCard(i){let any=false;if(HNS.tk[i]&&!HNS.td[i]){HNS.td[i]=true;any=true;}if(HNS.pv[i]){HNS.pv[i]=false;any=true;}if(HNS.rc[i]){HNS.rc[i]=null;any=true;}return any;}
function hnDismiss(pis){let any=false;
  for(const i of pis)if(hnDismissCard(i))any=true;
  for(const id of HN_LAYERS){const L=HNS.ly[id];if(L&&!L.hid){L.hid=true;any=true;}}
  for(const [pr,P] of HNS.pr)if(!P.hid&&pis.includes(pr.pi)){P.hid=true;any=true;}
  hnLayers(true);if(any)hnBlip(false);return any;}
// показать снова: из карточек pis — все нужные сейчас (live: задачи и подсказки, которые есть, но убраны), иначе ту, что видели последней;
// слои босса и Соловья, которые горят, но убраны, — тоже
function hnRecallLast(pis,live){const rc=i=>{const c=live&&live[i]||HNS.last[i].c;HNS.rc[i]={left:hnReadT(hnCardText(c)),k:hnCardKey(c)};};
  for(let i=0;i<3;i++)HNS.rc[i]=null;
  let n=0;if(live)for(const i of pis)if(live[i]&&!HN.shown[i]){rc(i);n++;}
  if(!n){let b=-1;for(const i of pis){if(!HNS.last[i]||HN.shown[i])continue;if(b<0||HNS.last[i].t>HNS.last[b].t)b=i;}if(b>=0){HNS.rc[b]={left:hnReadT(hnCardText(HNS.last[b].c)),k:''};n++;}}
  let any=n>0;for(const id of HN_LAYERS){const L=HNS.ly[id];if(L&&L.hid){L.hid=false;L.t=0;any=true;}}
  for(const [pr,P] of HNS.pr)if(P.hid&&pis.includes(pr.pi)){P.hid=false;P.t=0;any=true;}
  hnLayers(true);if(any)hnBlip(true);return any;}
// что игрок видит сейчас: карточки pis или слои босса / Соловья, не убранные
const hnShownNow=pis=>pis.some(i=>HN.shown[i])||HN_LAYERS.some(id=>{const el=$(id),L=HNS.ly[id];return !!el&&hnLayerOn(el)&&!!L&&!L.hid;})||[...HNS.pr].some(([pr,P])=>!P.hid&&pis.includes(pr.pi));
// нажатия LB, накопленные опросом джойстиков (в паузе опрос их не копит; кадр бывает долгим — нажатие не теряется): видно — убрать, не видно — показать
function hnEvents(off,live){const ev=HNS.ev.splice(0);if(off||!ev.length)return;
  HNS.taps+=ev.length;   // счётчик нажатий для урока в прологе
  for(const e of ev){const pis=e.pi<0||G.solo||(FIN.co&&FIN.co.live())?[0,1,2]:[e.pi,2];
    if(hnShownNow(pis)){hnDismiss(pis);if(FIN.readAloud&&FIN.readAloud.stop)FIN.readAloud.stop();}   // убрали — и голос замолчал
    else hnRecallLast(pis,live);}}
// слои, которыми занимаются другие модули (подсказка босса, табличка Соловья): новый текст — новая надпись (при «выкл» — сразу убранная),
// горит дольше времени чтения — уходит; погас — забыт. tick — считать ли время (не в паузе и роликах)
function hnLayers(tick,off){for(const id of HN_LAYERS){const el=$(id);if(!el)continue;
  if(!hnLayerOn(el)){delete HNS.ly[id];el.classList.remove('hn-gone');continue;}
  const k=hnKey(el.textContent);let L=HNS.ly[id];if(!L||L.k!==k)L=HNS.ly[id]={k,t:0,hid:!hnOn()};
  if(tick===true||off||L.hid);else if((L.t+=HNS.dt)>hnReadT(el.textContent))L.hid=true;
  el.classList.toggle('hn-gone',L.hid);}}
// переключили вкл/выкл: выкл — всё на экране убрано; вкл — текущие задача, подсказка (если ещё не показывалась) и слои возвращаются
function hnSwitch(){const noh=!hnOn();if(HNS.noh===noh)return;const first=HNS.noh===null;HNS.noh=noh;document.body.classList.toggle('fin-nohints',noh);if(first)return;
  HNS.rc=[null,null,null];HNS.vt=[null,null,null];
  for(let i=0;i<3;i++){HNS.td[i]=noh;HNS.pv[i]=false;if(!noh)HNS.pk[i]='';}   // pk — подсказка пройдёт через «один раз» заново
  for(const id in HNS.ly){HNS.ly[id].hid=noh;HNS.ly[id].t=0;}for(const P of HNS.pr.values()){P.hid=noh;P.t=0;}hnLayers(true);}
// запомнить показанное, подставить «показать снова», убрать прочитанное
function hnTrack(cards,mk,O3,T3,off){const live=mk(O3,T3);
  for(let i=0;i<3;i++){const r=HNS.rc[i];if(!r)continue;
    if(cards[i]){HNS.rc[i]=null;continue;}                                      // пришла новая подсказка
    if(off)continue;const c=live[i]||(HNS.last[i]&&HNS.last[i].c);if(!c){HNS.rc[i]=null;continue;}
    if((r.left-=HNS.dt)<=0){HNS.rc[i]=null;continue;}                            // прочитали — уходит
    cards[i]=c;}
  if(off)return;
  cards.forEach((c,i)=>{if(!c){HNS.vt[i]=null;return;}HNS.last[i]={c,k:hnCardKey(c),t:G.time};if(HNS.rc[i])return;
    const k=hnCardKey(c);if(!HNS.vt[i]||HNS.vt[i].k!==k)HNS.vt[i]={k,t:0};
    if((HNS.vt[i].t+=HNS.dt)>hnReadT(hnCardText(c))){if(HNS.pv[i])HNS.pv[i]=false;else hnDismissCard(i);HNS.vt[i]=null;cards[i]=null;}});}   // ушла подсказка — под ней задача со своим временем
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
  // краткая строка задачи (o.short — таблица late_79c_taskshort.js) вместо полного текста: одна на двоих (с точностью до кнопок) —
  // общая карточка, кнопки в ней парой «R / ;»; у каждого своя (разные роли: «Левая голова» / «Правая голова») — общей карточки задачи нет
  const SH=[0,1].map(pi=>{const o=O[pi]&&W&&W.objectives&&W.objectives[pi]&&W.objectives[pi][players[pi].obj];return o&&o.short?o.short(pi):'';});
  const shS=SH[0]&&SH[1]?hnMerge(SH[0],SH[1]):SH[0]||SH[1],shOwn=!!(SH[0]&&SH[1]&&shS===null);
  let S={o:'',t:''};const po=shOwn?null:hnPair(O[0],O[1]),pt=hnPair(T[0],T[1]);
  if(po){S.o=po.s;O=[po.a,po.b];}if(pt){S.t=pt.s;T=[pt.a,pt.b];}
  if(SH[0]&&SH[1]&&shS){S.o=S.o||O[0]||O[1];O=['',''];}   // одна краткая строка на двоих — одна общая карточка, даже если полные тексты не склеились
  if(solo&&O[1-sp]&&O[sp]&&hnCover(O[1-sp],O[sp])>=0.8)O[1-sp]='';
  const SH3=[SH[0],SH[1],shS],O3=[O[0],O[1],S.o],T3=[T[0],T[1],S.t];
  const mk=(oo,tt)=>[0,1,2].map(i=>hnCard(oo[i],tt[i],oo[i]?SH3[i]:''));   // у общей карточки краткая строка — если у обоих одна
  HNS.dt=Math.min(1,Math.max(0,G.time-HNS.gt));HNS.gt=G.time;   // время на экране: игровое (боты зовут updateUI раз в 0,5 с), скачок не больше 1 с
  hnSwitch();hnEvents(off,mk(O3,T3));hnLayers(false,off);
  const gt=hnGate(O3,T3,off),cards=mk(gt.o,gt.t);hnTrack(cards,mk,O3,T3,off);
  // баннер события («Вал догнал!», «Коршун!») висит по центру по нескольку секунд: общая карточка на это время сжимается в одну
  // строку (◆ первая фраза задачи), личная — если баннер её задевает; не поместилась и так — уступает баннеру место
  // подсказка босса уступает баннеру место по высоте (F-2d): пока баннер виден, она стоит под ним, потом возвращается на своё (top из fin.css)
  if(boss){const bb=bossOn&&hnVisible('banner')?$('banner').getBoundingClientRect():null;boss.style.top=bb?(bb.bottom+8)+'px':'';}
  const BR=hnVisible('banner')?$('banner').getBoundingClientRect():null;if(!BR)HN.cmp=[false,false,false];else HN.cmp[2]=true;
  // строка сжатой карточки: у общей — первая фраза задачи; у личной — первая своя фраза, которой нет у друга («Клещи 0 / 4.» у обоих)
  const line=i=>{const c=cards[i];if(i===2||!cards[1-i])return c.head||hnShort(c.body);const o=cards[1-i],had=new Set(hnSent((o.head?o.head+'<br>':'')+o.body).map(hnNorm));
    const own=hnSent((c.head?c.head+'<br>':'')+c.body).find(x=>!had.has(hnNorm(x)));return hnShort(own||c.head||c.body);};
  // три карточки: первого игрока, второго, общая; новая задача — карточка вспыхивает золотом
  const render=(i,c)=>{const el=els[i],html=!c?'':HN.cmp[i]?'<div class="hn-body">'+line(i)+'</div>':(c.head?'<div class="hn-head'+(c.sh?' hn-short':'')+(c.rd?' hn-rd':'')+'">'+c.head+'</div>':'')+(c.body?'<div class="hn-body">'+c.body+'</div>':'');
    const on=!!c;if(HN.html[i]!==html){const was=HN.html[i];HN.html[i]=html;if(on){el.innerHTML=html;const k=hnNorm(c.head||c.body);if(k!==HN.objK[i]){HN.objK[i]=k;if(was)HN.flash[i]=G.time;el.classList.remove('hn-pop');void el.offsetWidth;el.classList.add('hn-pop');}}}
    if(HN.shown[i]!==on){HN.shown[i]=on;el.classList.toggle('on',on);}
    el.classList.toggle('hn-cmp',on&&HN.cmp[i]);el.classList.toggle('hn-dim',!!(solo&&i===1-sp));el.classList.toggle('hn-new',G.time-HN.flash[i]<1.2);};
  cards.forEach((c,i)=>render(i,c));
  // места: карточка игрока — под его панелью (у первого — под «весточкой»), общая — под счётчиком звеньев (и под подсказкой босса)
  // F-2e: полоса босса, «весточка» и карточка обучения — разные зоны: «весточка» и карточка урока уходят под полосу, если задели её
  {const bb=$('bossbar'),vs=$('vest'),ft=$('finTut'),vis=e=>e&&getComputedStyle(e).display!=='none';
    const hit=(a,b)=>a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom;
    if(vs){vs.style.top='';if(vis(vs)&&vis(bb)){const B=bb.getBoundingClientRect();if(hit(vs.getBoundingClientRect(),B))vs.style.top=Math.round(B.bottom+6)+'px';}}
    if(ft){ft.style.top='';if(ft.classList.contains('on')){const F=ft.getBoundingClientRect();let y=0;
      for(const e of[bb,vs,$('banner')])if(vis(e)){const R=e.getBoundingClientRect();if(F.left<R.right&&R.left<F.right&&F.top<R.bottom+8&&R.top<F.bottom)y=Math.max(y,R.bottom+8);}
      if(y)ft.style.top=Math.round(y)+'px';}}}
  const H0=$('hud0').getBoundingClientRect(),H1=$('hud1').getBoundingClientRect(),V=$('vest'),VR=V&&getComputedStyle(V).display!=='none'?V.getBoundingClientRect():null;
  els[2].style.maxWidth='';   // ширину общей карточки каждый кадр считаем заново (ниже — по зазору между личными)
  let top0=Math.max(H0.bottom,VR?VR.bottom:0)+8,top1=H1.bottom+8;
  if(bossOn){const B=boss.getBoundingClientRect();if(12+els[0].offsetWidth>B.left-6)top0=Math.max(top0,B.bottom+8);if(innerWidth-12-els[1].offsetWidth<B.right+6)top1=Math.max(top1,B.bottom+8);}   // подсказка босса широкая — карточки игроков под ней
  els[0].style.top=top0+'px';els[1].style.top=top1+'px';
  let ts=Math.max(H0.bottom,H1.bottom);for(const id of['links','bossbar'])if($(id)&&getComputedStyle($(id)).display!=='none')ts=Math.max(ts,$(id).getBoundingClientRect().bottom);
  if(bossOn)ts=Math.max(ts,boss.getBoundingClientRect().bottom);if(VR&&VR.right>innerWidth/2-els[2].offsetWidth/2-6)ts=Math.max(ts,VR.bottom);   // длинная «весточка» — общая карточка ниже неё
  els[2].style.top=(ts+8)+'px';
  // общая карточка не наезжает на личные: если задела хоть одну, её ширина — в зазор между личными (по центру экрана);
  // зазор уже 200 px (невысокое или узкое окно: шрифт растёт от высоты, а ширина карточек — от ширины) — карточка встаёт под личные
  if(HN.shown[2]){const sh=els[2],S0=sh.getBoundingClientRect(),own=[0,1].filter(i=>HN.shown[i]).map(i=>[i,els[i].getBoundingClientRect()]);
    if(own.some(([i,r])=>hnHit(S0,r,6))){const cx=innerWidth/2,half=Math.min(...own.map(([i,r])=>i?r.left-cx:cx-r.right)),w=2*(half-8);
      if(w>=200)sh.style.maxWidth=Math.floor(w)+'px';else sh.style.top=Math.round(Math.max(...own.map(([i,r])=>r.bottom))+8)+'px';}}
  els.forEach((el,i)=>{let y=false;if(BR&&HN.shown[i]){if(!HN.cmp[i]&&hnHit(el.getBoundingClientRect(),BR,4)){HN.cmp[i]=true;render(i,cards[i]);}y=hnHit(el.getBoundingClientRect(),BR,4);}
    el.classList.toggle('hn-yield',y);});
  hnSkip();}
// плашка пропуска — над субтитрами (X-10): по умолчанию выше двух строк, а если реплика длиннее — ещё выше
function hnSkip(){const sk=$('skip'),sb=$('subs');if(!sk||!sb)return;sk.style.bottom='';
  if(getComputedStyle(sk).display==='none')return;
  const sv=!!hnVisible('subs'),S=sv?sb.getBoundingClientRect():null;let K=sk.getBoundingClientRect();if(S&&K.bottom>S.top-6){sk.style.bottom=(innerHeight-S.top+8)+'px';K=sk.getBoundingClientRect();}
  // F-2f: карточка урока (крупный шрифт) задела плашку — плашка уходит под карточку, если там её не заденут субтитры
  const ft=$('finTut');if(ft&&ft.classList.contains('on')){const F=ft.getBoundingClientRect();if(K.left<F.right&&F.left<K.right&&K.top<F.bottom&&F.top<K.bottom&&F.bottom+6+K.height<(S?S.top-6:innerHeight-8))sk.style.bottom=(innerHeight-F.bottom-6-K.height)+'px';}}
{const _ui=updateUI;updateUI=function(dt){_ui(dt);try{hnLayout();}catch(e){console.error('hints',e);}};}
{const _st=showTitle;showTitle=function(){_st();HN.titleT=G.time;};}
// LB (кнопка 4 стандартной раскладки — «Повтори», PADMAP в late_74): опрос джойстиков (каждые 8 мс) копит новые нажатия у каждого джойстика отдельно (код у обоих один — KeyH), карточки разбирают их в кадре
HNS.lb=[false,false];
// то же — на клавише H (клавиатурный «Повтори»: общая на двоих, поэтому убирает у обоих); настоящее нажатие, не ZC.press ботов
addEventListener('keydown',e=>{if(e.code==='KeyH'&&!e.repeat&&e.isTrusted&&G.state==='play'&&!e.ctrlKey&&!e.altKey&&!e.metaKey){HNS.ev.push({pi:-1});if(HNS.ev.length>8)HNS.ev.shift();}});
{const _pp=pollPads;pollPads=function(){_pp();const play=G.state==='play';
  for(let pi=0;pi<2;pi++){const gp=PADS.gp[pi],b=gp&&gp.buttons&&gp.buttons[4],on=!!b&&(b.pressed||b.value>0.5);
    if(on&&!HNS.lb[pi]&&play){HNS.ev.push({pi});if(HNS.ev.length>8)HNS.ev.shift();}HNS.lb[pi]=on;}};}
// «Подсказки: вкл / выкл» — настройка (FIN.set.hints, по умолчанию выкл): пункт в паузе и в настройках
HN.on=hnOn;HN.toggle=()=>{FIN.set.hints=!hnOn();FIN.saveSettings();FIN.applySettings();};
{const _as=FIN.applySettings;FIN.applySettings=function(){_as();document.body.classList.toggle('fin-nohints',!hnOn());};}
const hnItem=()=>({label:'Подсказки',val:()=>hnOn()?'вкл':'выкл',sub:()=>hnOn()?'подсказка уходит сама, когда её успеешь прочитать; LB (H на клавиатуре) — убрать, ещё раз — показать':'сами не появляются; LB (H на клавиатуре) — показать нужную сейчас, ещё раз — убрать',side:()=>HN.toggle()});
// в паузе — вверху, сразу после «Продолжить»; в ?debug скрыт, чтобы не сдвигать пункты ботам
{const _ps=pauseScreen;pauseScreen=function(){const scr=_ps(),kk=FIN.kids;
  if(!(kk&&kk.debug&&!kk.force)){const k=scr.items.findIndex(it=>it.label==='Продолжить');scr.items.splice(k+1,0,hnItem());}return scr;};}
// в настройках — рядом с текстовыми («Размер текста»), на первом экране списка, а не в хвосте
{const _ss=settingsScreen;settingsScreen=function(){const scr=_ss(),k=scr.items.findIndex(it=>it.label==='Размер текста');scr.items.splice(k>=0?k+1:Math.max(0,scr.items.length-1),0,hnItem());return scr;};}
// значки кнопок над героями (prompt() движка, updatePrompts в 07_props.js) — та же логика, что у подсказок: появился значок — при «вкл» виден
// и уходит сам за время чтения (не меньше 5 с), при «выкл» сам не появляется; LB убирает и показывает его вместе с карточками своего игрока.
// Значок, у которого условие погасло, забыт (HNS.pr — по объекту prompt); в ролике, паузе и окнах время стоит
{const _up=updatePrompts;updatePrompts=function(){if(!W||!W.prompts)return _up();if(HNS.W!==W)hnReset();
  const play=!G.cine&&!G.trans&&(!G.ui||G.ui==='forge')&&G.state==='play',dt=Math.min(1,Math.max(0,G.time-HNS.pgt));HNS.pgt=G.time;
  const all=W.prompts,vis=[];
  if(play)for(const pr of all){let c=false;try{c=!!pr.cond();}catch(e){}
    if(!c){HNS.pr.delete(pr);continue;}
    let P=HNS.pr.get(pr);if(!P)HNS.pr.set(pr,P={t:0,hid:!hnOn()});
    if(!P.hid){const nt=typeof pr.note==='function'?pr.note():pr.note;if((P.t+=dt)>hnReadT(nt||''))P.hid=true;}
    if(!P.hid)vis.push(pr);}
  W.prompts=play?vis:all;try{_up();}finally{W.prompts=all;}};}
FIN.hints={layout:hnLayout,cover:hnCover,merge:hnMerge,fuzzy:hnFuzzy,split:hnSplit,pair:hnPair,short:hnShort,state:()=>({html:HN.html.slice(),shown:HN.shown.slice()}),   // для ботов
  gate:HNS,dismiss:hnDismiss,recall:hnRecallLast,on:hnOn,toggle:HN.toggle,readT:hnReadT};
