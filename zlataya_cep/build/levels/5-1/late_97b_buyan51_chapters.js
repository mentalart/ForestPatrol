/* ============================== РЕЛИЗ · 5-1 «СУНДУК НА ДУБЕ»: СОХРАНЕНИЕ ПО ЧАСТЯМ И КАРТОЧКИ ГЛАВ ============================== */
// Самый длинный уровень игры (≈25 мин): на границах частей — карточка главы и точка возобновления в сохранении (G.flags.ch51).
// Точки: 'clew' — часть II «Дуб» (ярус клубка у корней), 'glade' — часть III «Лихо» (крона открыта, вниз на поляну), 'boss1' — бой с Лихом.
// При новом входе — «Продолжить с: …» или «Начать сначала» (выбирает Игрок первый); переход — W.warp51, тот же, что у ботов.
// Звенья и орешки, собранные до точки, записываются номерами в W.items и возвращаются без вспышек. Уровень пройден — запись стирается.
const CH51={clew:{n:'II',name:'Дуб',sub:'Ярусы по вещам: клубок, гусли, перо, клещи'},glade:{n:'III',name:'Лихо',sub:'Пятая цепь — у Лиха в лапе'},
  boss1:{n:'III',name:'Лихо',sub:'Бой с Лихом — без ударов'}};
function ch51Card(c){let el=document.getElementById('ch51card');
  if(!el){el=document.createElement('div');el.id='ch51card';el.style.cssText='position:fixed;left:50%;top:20%;transform:translate(-50%,-8px);z-index:40;pointer-events:none;text-align:center;'+
    'padding:14px 30px 16px;border-radius:18px;background:rgba(18,40,44,.62);color:#fff;opacity:0;transition:opacity .45s,transform .45s;font-family:Georgia,serif;text-shadow:0 2px 6px rgba(0,0,0,.45)';document.body.appendChild(el);}
  el.innerHTML='<div style="font:700 calc(13px*var(--fts,1)) system-ui;letter-spacing:.14em;text-transform:uppercase;color:#7fe0d6">Сундук на дубе</div>'+
    '<div style="font:900 calc(34px*var(--fts,1)) Georgia,serif;color:#ffd76a;margin-top:2px">Часть '+c.n+' · '+c.name+'</div>'+
    '<div style="font:600 calc(15px*var(--fts,1)) system-ui;opacity:.9;margin-top:4px">'+c.sub+'</div>';
  clearTimeout(el._t);requestAnimationFrame(()=>{el.style.opacity='1';el.style.transform='translate(-50%,0)';});
  el._t=setTimeout(()=>{el.style.opacity='0';el.style.transform='translate(-50%,-8px)';},2600);
  try{tone(660,0.5,'sine',0.05);later(0.18,()=>tone(990,0.8,'sine',0.045));}catch(e){}}
{const _b=build51;build51=function(){_b();const F=W.flags,st0=W.onStart;let last=null;
  const mark=at=>{if(G.flags.ch51&&G.flags.ch51.at===at)return;G.flags.ch51={at,items:W.items.map((it,i)=>it.taken?i:-1).filter(i=>i>=0)};try{FIN.saveGame();}catch(e){}};
  W.updates.push(()=>{if(G.cine||W.levelId!=='5-1')return;const s=F.stage;if(s===last)return;last=s;
    if(s==='clew'&&!F.ch2){F.ch2=true;ch51Card(CH51.clew);mark('clew');}
    if(s==='crown'&&!F.ch3){F.ch3=true;ch51Card(CH51.glade);mark('glade');}
    if(s==='boss1'&&!F.chB){F.chB=true;mark('boss1');}});
  // собранное до точки — тихо, без вспышек и «+звено»
  const restore=ids=>{for(const i of ids||[]){const it=W.items[i];if(!it||it.taken)continue;it.taken=true;W.group.remove(it.g);if(it.kind==='link')W.links++;else W.nuts++;}};
  W.onStart=()=>{const sv=G.flags.ch51,c=sv&&CH51[sv.at];
    if(!c||(G.manual&&!G.flags.ch51ask)){st0();return;}   // боты (G.manual) переходят сами; ch51ask — бот проверяет сам выбор
    skazClouds({who:0,title:'Сундук на дубе',sub:'Сказ ждёт там, где остановились. Выбирает Игрок первый.',opts:['Продолжить с: Часть '+c.n+' · '+c.name+(sv.at==='boss1'?' (бой)':''),'Начать сначала — с причала Горыныча']},sel=>{
      if(sel===0){W.warp51(sv.at);restore(sv.items);if(sv.at==='boss1')F.chB=true;}else{G.flags.ch51=null;st0();}});};};}
{const _f=finishLevel;finishLevel=function(){if(W&&W.levelId==='5-1'&&G.flags)G.flags.ch51=null;return _f.apply(this,arguments);};}
