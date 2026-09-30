/* ============================== РЕЛИЗ · КЛАВИШИ РАЗРАБОТЧИКА ============================== */
// Ctrl+Alt+] — открыть все уровни: прогресс как у пройденной игры, в «Главах» — все уровни и испытания Заставы.
//   Отметка живёт в самом сохранении (флаг devAll), поэтому «Новая игра» снимает её вместе со старым прогрессом.
// Ctrl+Alt+[ — стереть всё, что игра хранит на этом компьютере (сохранение, настройки, гардероб лавки), и начать как в первый раз.
// Всё хранится в localStorage под ключами «zlatayaCep.*» — других следов у игры нет.
const DEV_PREFIX='zlatayaCep.';
FIN.devToast=function(title,sub,hold){let el=$('finDev');if(!el){el=document.createElement('div');el.id='finDev';document.body.appendChild(el);}
  el.innerHTML='<b>'+title+'</b>'+(sub?'<small>'+sub+'</small>':'');el.classList.remove('fin-on','fin-hold');void el.offsetWidth;el.classList.add(hold?'fin-hold':'fin-on');};
// «Главы» после Ctrl+Alt+]: все уровни по порядку, включая пролог, эпилог и Заставу
{const _cl=FIN.chapterList;FIN.chapterList=function(){const L=_cl(),d=FIN.readSave();if(!(d&&d.G.flags&&d.G.flags.devAll))return L;const done=d.G.done||{};
  return LEVELS.map((l,i)=>{if(!(l.world||l.zast||['p','luko','epi'].includes(l.id)))return null;const c=L.find(q=>q.i===i);
    return c?Object.assign(c,{open:true}):{i,id:l.id,name:l.name,world:0,open:true,got:0,links:0,nuts:0,nutT:0,boss:false,done:!!done[l.id]};}).filter(Boolean);};}
FIN.devUnlockAll=function(){if(FIN.wiped)return;const clone=o=>o==null?o:JSON.parse(JSON.stringify(o));
  const old={};SAVE_FIELDS.forEach(k=>{old[k]=clone(G[k]);});
  const pl=players.map(p=>({enc:p.enc,shieldTaught:p.shieldTaught,closedTaught:p.closedTaught,staggerSeen:p.staggerSeen,blue:p.blue,act:p.act}));
  const photo=document.body.classList.contains('photo');
  // состояние «пройдено всё» собирает сам прототип: startFrom с индексом после эпилога, но без загрузки уровня
  const _ll=loadLevel,_hm=hideMenu;loadLevel=()=>{};hideMenu=()=>{};try{startFrom(LV('z-i'));}finally{loadLevel=_ll;hideMenu=_hm;}
  // своё не теряем: время, статистика, покупки, огород, курочка, сказки, рекорды Заставы, лучшие сборы звеньев и орешков
  if(old.stats)Object.assign(G.stats,old.stats);
  ['playTime','nutsSpent','gemsSpent','nutsHub','garden','hen','secrets','tales','zbest','medals'].forEach(k=>{if(old[k]!==undefined)G[k]=old[k];});
  const mx=(a,b)=>{const o=Object.assign({},a);for(const k in b||{})o[k]=Math.max(+o[k]||0,+b[k]||0);return o;};
  G.done=Object.assign({},old.done,G.done);G.gems=Object.assign({},old.gems,G.gems);G.got=mx(G.got,old.got);G.nutsGot=mx(G.nutsGot,old.nutsGot);
  G.owned=Object.assign({},old.owned,{'z-i':true,'z-d':true,'z-a':true});   // испытания Заставы открыты без самоцветов
  const f=Object.assign({},old.flags,G.flags);['skaz','skaz2','skaz3','skaz4','skaz5','ending','claspQ'].forEach(k=>{if(old.flags&&old.flags[k]!==undefined)f[k]=old.flags[k];});G.flags=f;
  G.forgedW=mx(G.forgedW,old.forgedW);G.forgedLinks=[1,2,3,4,5].reduce((s,w)=>s+(G.forgedW[w]||0),0);
  G.links=Math.max(G.links||0,old.links||0);G.trips=Math.max(G.trips||0,old.trips||0);
  players.forEach((p,i)=>Object.assign(p,pl[i]));if(photo)document.body.classList.add('photo');
  G.flags.devAll=true;FIN.saveGame();
  // обновить то, что уже на экране: главное меню или Лукоморье (если там ничего не открыто)
  if(FIN.titleOn&&FIN.menu&&!FIN.menu.pause&&!FIN.splashOn){FIN.menuStack=[];finScreen(mainScreen());}
  else if(G.state==='play'&&W&&W.levelId==='luko'&&!G.ui&&!G.cine&&!G.trans)loadLevel(LV('luko'));
  FIN.devToast('Все уровни открыты','«Главы» в главном меню и карта в Лукоморье · Ctrl+Alt+[ — стереть всё');};
FIN.devWipe=function(){FIN.wiped=true;
  for(const st of[localStorage,sessionStorage])try{for(let i=st.length-1;i>=0;i--){const k=st.key(i);if(k&&k.startsWith(DEV_PREFIX))st.removeItem(k);}}catch(e){}
  FIN.devToast('Все сохранения стёрты','настройки и наряды из лавки тоже · игра начинается заново',true);
  setTimeout(()=>location.reload(),1200);};
// после стирания игра больше ничего не записывает: ни автосохранение, ни настройки, ни гардероб не вернут старые данные до перезапуска
{const _set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(FIN.wiped&&String(k).startsWith(DEV_PREFIX))return;return _set.call(this,k,v);};}
// по коду клавиши, чтобы работало и в русской раскладке (] — «ъ», [ — «х»)
addEventListener('keydown',e=>{if(!e.ctrlKey||!e.altKey||e.repeat)return;
  const c=e.code==='BracketRight'||e.key===']'||e.key==='ъ'||e.key==='Ъ'?1:e.code==='BracketLeft'||e.key==='['||e.key==='х'||e.key==='Х'?-1:0;if(!c)return;
  e.preventDefault();e.stopImmediatePropagation();if(c>0)FIN.devUnlockAll();else FIN.devWipe();},true);
// для съёмки трейлера (tools/video): интерфейс (субтитры, цели, баннеры, поля кадра) по времени видео — игровой цикл при съёмке выключен
if(window.ZC)ZC.ui=dt=>updateUI(dt);
