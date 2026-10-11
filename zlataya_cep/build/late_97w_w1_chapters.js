/* ============================== РЕЛИЗ · МИР 1: СОХРАНЕНИЕ ВНУТРИ ДЛИННЫХ УРОВНЕЙ (1-1, 1-2, 1-5) ============================== */
// 1-1 после «за калиткой» вдвое длиннее, 1-2 — семь сказок подряд, 1-5 — пять комнат с боссом: ребёнок не всегда доигрывает за раз.
// На границе главы — карточка «Часть II · …» и точка возобновления в сохранении (G.flags.ch1 = {lv, at, items}); при новом входе в уровень
// Игрок первый выбирает «Продолжить с: …» или «Начать сначала». Переход — W.warp11/12/15 уровня (те же, что у ботов).
// Звенья и орешки, собранные до точки, записываются номерами в W.items и возвращаются тихо. Уровень пройден — запись стирается.
// Образец — 5-1 (late_97b_buyan51_chapters.js).
const W1CH={
  '1-1':{title:'Избушка, повернись',from:'со двора Яги',warp:'warp11',pts:{gate:{n:'II',name:'За калиткой',sub:'Вороны Кощея, стог, ступа Яги — и теремок'}},
    at:F=>F.stage==='crows'?'gate':null},
  '1-2':{title:'Кикиморино болото',from:'с края болота',warp:'warp12',pts:{fog:{n:'II',name:'Туман',sub:'Огоньки-обманщики, Царевна-лягушка, бесёнок у омута'}},
    at:F=>F.wed&&F.wed.stage==='done'?'fog':null},
  '1-5':{title:'Кикиморина прялка',from:'из сеней',warp:'warp15',pts:{ovin:{n:'II',name:'Овин',sub:'Прялка Кикиморы: галерея, чердак — и веретено'},
      dry:{n:'III',name:'Сушильня',sub:'Сторожевые нити и засов на двоих'},boss:{n:'III',name:'Повить',sub:'Бой с Веретенником',quiet:true}},
    at:F=>F.latch?'boss':F.spFled?'dry':F.loomDone&&HEROES.some(h=>h.active&&h.pos.z<3&&h.pos.y<1)?'ovin':null}};
const W1ORDER={'1-1':['gate'],'1-2':['fog'],'1-5':['ovin','dry','boss']};
function w1Card(title,c){let el=document.getElementById('w1card');
  if(!el){el=document.createElement('div');el.id='w1card';el.style.cssText='position:fixed;left:50%;top:20%;transform:translate(-50%,-8px);z-index:40;pointer-events:none;text-align:center;'+
    'padding:14px 30px 16px;border-radius:18px;background:rgba(24,44,24,.62);color:#fff;opacity:0;transition:opacity .45s,transform .45s;font-family:Georgia,serif;text-shadow:0 2px 6px rgba(0,0,0,.45)';document.body.appendChild(el);}
  el.innerHTML='<div style="font:700 calc(13px*var(--fts,1)) system-ui;letter-spacing:.14em;text-transform:uppercase;color:#b8e08a">'+title+'</div>'+
    '<div style="font:900 calc(34px*var(--fts,1)) Georgia,serif;color:#ffd76a;margin-top:2px">Часть '+c.n+' · '+c.name+'</div>'+
    '<div style="font:600 calc(15px*var(--fts,1)) system-ui;opacity:.9;margin-top:4px">'+c.sub+'</div>';
  clearTimeout(el._t);requestAnimationFrame(()=>{el.style.opacity='1';el.style.transform='translate(-50%,0)';});
  el._t=setTimeout(()=>{el.style.opacity='0';el.style.transform='translate(-50%,-8px)';},2600);
  try{tone(660,0.5,'sine',0.05);later(0.18,()=>tone(990,0.8,'sine',0.045));}catch(e){}}
// глава началась: карточка (кроме тихих) и запись в сохранение; более ранняя точка не перетирает более позднюю
function w1Mark(id,at){const D=W1CH[id],sv=G.flags.ch1,ord=W1ORDER[id];if(sv&&sv.lv===id&&ord.indexOf(sv.at)>=ord.indexOf(at))return;
  if(!D.pts[at].quiet)w1Card(D.title,D.pts[at]);
  G.flags.ch1={lv:id,at,items:W.items.map((it,i)=>it.taken?i:-1).filter(i=>i>=0)};try{FIN.saveGame();}catch(e){}}
// собранное до точки — тихо, без вспышек и «+звено»
function w1Restore(ids){for(const i of ids||[]){const it=W.items[i];if(!it||it.taken)continue;it.taken=true;W.group.remove(it.g);if(it.kind==='link')W.links++;else W.nuts++;}}
for(const[id,bn]of[['1-1','build11'],['1-2','build12'],['1-5','build15']]){
  const wrap=_b=>function(){_b.apply(this,arguments);const D=W1CH[id],F=W.flags,st0=W.onStart||(()=>{});let seen=null;
    W.updates.push(()=>{if(G.cine||W.levelId!==id)return;let at=null;try{at=D.at(F);}catch(e){}if(!at||at===seen)return;seen=at;w1Mark(id,at);});
    W.onStart=function(){const sv=G.flags.ch1,c=sv&&sv.lv===id&&D.pts[sv.at];
      if(!c||(G.manual&&!G.flags.ch1ask)){st0.apply(this,arguments);return;}   // боты (G.manual) переходят сами; ch1ask — бот проверяет сам выбор
      skazClouds({who:0,title:D.title,sub:'Сказ ждёт там, где остановились. Выбирает Игрок первый.',
        opts:['Продолжить с: Часть '+c.n+' · '+c.name,'Начать сначала — '+D.from]},sel=>{
        if(sel===0){W[D.warp](sv.at);w1Restore(sv.items);seen=sv.at;}else{G.flags.ch1=null;st0();}});};};
  if(bn==='build11')build11=wrap(build11);else if(bn==='build12')build12=wrap(build12);else build15=wrap(build15);}
{const _f=finishLevel;finishLevel=function(){if(W&&G.flags&&G.flags.ch1&&G.flags.ch1.lv===W.levelId)G.flags.ch1=null;return _f.apply(this,arguments);};}
