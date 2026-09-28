/* ============================== РЕЛИЗ · ГЛАВНОЕ МЕНЮ, ПАУЗА, ГЛАВЫ, НАСТРОЙКИ, УПРАВЛЕНИЕ, ТИТРЫ ============================== */
const POEM=['У лукоморья дуб зелёный;','Златая цепь на дубе том:','И днём и ночью кот учёный','Всё ходит по цепи кругом;','Идёт направо — песнь заводит,','Налево — сказку говорит.'];
FIN.menuStack=[];
function fixSel(scr,d){const n=scr.items.length;for(let k=0;k<n&&scr.items[scr.sel].off;k++)scr.sel=(scr.sel+(d||1)+n)%n;}
function finScreen(scr){FIN.menu=scr;scr.sel=Math.min(scr.sel||0,scr.items.length-1);fixSel(scr,1);finDraw();}
function finPush(scr){if(FIN.menu){scr.pause=FIN.menu.pause;FIN.menuStack.push(FIN.menu);}finScreen(scr);}
function finBack(){const p=FIN.menuStack.pop();if(p)finScreen(p);else if(FIN.menu&&FIN.menu.onBack)FIN.menu.onBack();}
function finDraw(){const scr=FIN.menu;if(!scr)return;const host=$(scr.pause?'finPanelP':'finPanel');let h=scr.head?'<div class="fin-head">'+scr.head+'</div>':'';if(scr.html)h+=scr.html();
  const n=scr.items.length,win=scr.win||n;let a=0;if(n>win)a=Math.max(0,Math.min(n-win,scr.sel-Math.floor(win/2)));h+='<div class="fin-scroll">';
  for(let i=a;i<Math.min(n,a+win);i++){const it=scr.items[i],sub=typeof it.sub==='function'?it.sub():it.sub;
    h+='<div class="fin-item'+(i===scr.sel?' fin-sel':'')+(it.off?' fin-off':'')+'" data-i="'+i+'">'+(it.val?'<span class="fin-val">'+it.val()+'</span>':'')+it.label+(sub?'<small>'+sub+'</small>':'')+'</div>';}
  host.innerHTML=h+'</div>';
  host.querySelectorAll('.fin-item').forEach(el=>{const i=+el.dataset.i;el.onmouseenter=()=>{if(scr.items[i].off||scr.sel===i)return;scr.sel=i;finDraw();};el.onclick=()=>{if(scr.items[i].off)return;scr.sel=i;finAct(0);};});}
function finAct(dx){const scr=FIN.menu,it=scr&&scr.items[scr.sel];if(!it||it.off)return;
  if(dx){if(it.side){it.side(dx);SFX.swap();finDraw();}return;}if(it.act){SFX.ok();it.act();}else if(it.side){it.side(1);SFX.swap();finDraw();}}
function finMenuInput(){const scr=FIN.menu;if(!scr)return;const a=uiNav(0),b=uiNav(1),dy=a.dy||b.dy,dx=a.dx||b.dx;
  if(dy&&scr.items.length){scr.sel=(scr.sel+dy+scr.items.length)%scr.items.length;fixSel(scr,dy);SFX.swap();finDraw();}
  if(dx)finAct(dx);
  if(pressed.has('Enter')||tap(0,'jump')||tap(1,'jump'))finAct(0);
  else if(pressed.has('Escape')||tap(0,'guard')||tap(1,'guard')){if(FIN.menuStack.length){SFX.swap();finBack();}else if(scr.onBack)scr.onBack();}}
// переход с затемнением
function finGo(fn){const f=$('finFade');f.style.opacity=1;setTimeout(()=>{fn();setTimeout(()=>{f.style.opacity=0;},80);},470);}
function newGame(){startFrom(0);}
// ---------- экраны ----------
function mainScreen(){const sv=FIN.readSave();return {id:'main',items:[
  {label:'Продолжить',sub:()=>sv?FIN.saveSummary(sv):'сохранений пока нет — начните новую игру',off:!sv,act:()=>finGo(()=>FIN.continueGame())},
  {label:'Новая игра',sub:'пролог «Звенышко» — с самого начала',act:()=>{if(sv)finPush(confirmNew());else finGo(newGame);}},
  {label:'Главы',sub:'переиграть пройденные уровни',act:()=>finPush(chaptersScreen())},
  {label:'Режим',val:()=>G.solo?'один':'вдвоём',sub:()=>G.solo?'один игрок и все четверо героев':'кооператив на двоих: клавиатура и/или два джойстика',side:()=>{setSolo(!G.solo);}},
  {label:'Настройки',sub:'звук, субтитры, размер текста, графика, сложность',act:()=>finPush(settingsScreen())},
  {label:'Управление',act:()=>finPush(controlsScreen())},
  {label:'Титры',act:()=>finPush(creditsScreen())}],sel:sv?0:1};}
function confirmNew(){return {head:'Начать новую сказку?',html:()=>'<div class="fin-note">Прежнее сохранение заменится новым, когда вы пройдёте первый уровень.</div>',
  items:[{label:'Да, с самого начала',act:()=>finGo(newGame)},{label:'Нет, назад',act:finBack}],sel:1};}
function chaptersScreen(){const L=FIN.chapterList(),sv=FIN.readSave();
  const items=L.map(c=>({label:c.name,off:!c.open,sub:!c.open?'ещё закрыто':c.links?('звенья '+c.got+' / '+c.links+(c.nutT?' · орешки '+c.nuts+' / '+c.nutT:'')+(c.done?' · пройдено':'')):(c.done?'пройдено':''),
    act:()=>finGo(()=>{if(sv)FIN.continueGame(c.i);else newGame();})}));
  items.push({label:'Назад',act:finBack});return {head:'Главы',items,win:7,sel:Math.max(0,L.filter(c=>c.open).length-1)};}
function settingsScreen(){const S=FIN.set,pct=v=>Math.round(v*100)+'%',step=(v,d)=>Math.max(0,Math.min(1,Math.round((v+d*0.1)*10)/10));
  const TS=[0.9,1,1.15,1.3],Q=['low','mid','high'],QN={low:'низкая',mid:'средняя',high:'высокая'},save=()=>{FIN.saveSettings();FIN.applySettings();};
  const cyc=(pi,d)=>{cyclePath(pi);if(d<0)cyclePath(pi);};
  const items=[{label:'Музыка',val:()=>pct(S.mus),side:d=>{S.mus=step(S.mus,d);save();}},
    {label:'Звуки',val:()=>pct(S.sfx),side:d=>{S.sfx=step(S.sfx,d);save();}},
    {label:'Субтитры',val:()=>S.subs?'вкл':'выкл',side:()=>{S.subs=!S.subs;save();}},
    {label:'Размер текста',val:()=>Math.round(S.ts*100)+'%',side:d=>{const i=TS.indexOf(S.ts);S.ts=TS[Math.max(0,Math.min(TS.length-1,(i<0?1:i)+d))];save();}},
    {label:'Тряска камеры',val:()=>S.shake?'вкл':'слабая',side:()=>{S.shake=!S.shake;save();}},
    {label:'Яркие вспышки',val:()=>S.flash?'вкл':'выкл',side:()=>{S.flash=!S.flash;save();}},
    {label:'Графика',val:()=>QN[S.quality],sub:'тени, чёткость, трава и цветы',side:d=>{const i=Q.indexOf(S.quality);S.quality=Q[Math.max(0,Math.min(2,i+d))];save();FIN.applyQuality();}}];
  if(G.solo)items.push({label:'Сложность',val:()=>PATHNAME[players[0].path],sub:'Лёгкий путь — шире окна для щита и такта',side:d=>cyc(0,d)});
  else items.push({label:'Путь игрока 1',val:()=>PATHNAME[players[0].path],side:d=>cyc(0,d)},{label:'Путь игрока 2',val:()=>PATHNAME[players[1].path],side:d=>cyc(1,d)});
  items.push({label:'Джойстики местами',val:()=>PADS.swap?'да':'нет',sub:()=>String(padStatus()).replace(/<[^>]+>/g,''),side:()=>{PADS.swap=!PADS.swap;}},{label:'Назад',act:finBack});
  return {head:'Настройки',items,win:8};}
function controlsScreen(){const rows=[['move','Ходьба'],['jump','Прыжок · держать — Пелагея планирует'],['swap',G.solo?'Выбрать героя: все четверо по кругу':'Смена героя'],['skill','Свой приём'],['guard','Защита: щит, отбив, «Одним махом»'],
    ['attack','Удар'],['call',G.solo?'«Ко мне!» — зовёт всех троих':'«Ко мне!»'],['item','Чудо-вещь мира'],['roll','Кувырок (с уровня 1-2)']];
  const k=(pi,a)=>a==='move'?(pi?'<kbd>↑←↓→</kbd>':'<kbd>WASD</kbd>'):'<kbd>'+KEYNAME[BIND[pi][a]]+'</kbd>';
  const html=()=>'<div class="fin-note"><table class="fin-ctl"><tr><th></th><th>Игрок 1</th><th>Игрок 2</th><th>Джойстик</th></tr>'+rows.map(([a,t])=>'<tr><td>'+t+'</td><td>'+k(0,a)+'</td><td>'+k(1,a)+'</td><td>'+(a==='move'?STICK:padGlyph(a))+'</td></tr>').join('')+
    '</table><div style="margin-top:8px;opacity:.85">'+(G.solo?'В одиночном режиме подходит любая половина клавиатуры и любой джойстик. ':'')+'Пауза — Esc или Start. Фото-режим — P. Ролик пропускается, если держать прыжок.</div></div>';
  return {head:'Управление',html,items:[{label:'Назад',act:finBack}]};}
const CREDITS='<h3>Златая цепь</h3><p>кооперативная сказка для всей семьи</p>'+
  '<h3>По мотивам</h3><p>А. С. Пушкин, пролог к поэме «Руслан и Людмила» — «У лукоморья дуб зелёный…»</p><p>русские народные сказки: «Колобок», «Садко», «Гуси-лебеди», «Кощей Бессмертный», «Репка», «Курочка Ряба», «Кузьма и Демьян», былины о трёх богатырях</p>'+
  '<h3>Студия «Лесной патруль»</h3><p>геймдизайн и кооперативные механики</p><p>дизайн уровней и low-poly арт</p><p>ролики на движке и анимация</p><p>сценарий и подсказки для детей</p><p>музыка и звук</p><p>программирование и тестирование</p>'+
  '<h3>Героев озвучивают</h3><p>Прошка, Потап, Пелагея и Йоша — голосами своих игроков</p>'+
  '<h3>Технологии</h3><p>Three.js r128 · © 2010–2021 Three.js Authors · лицензия MIT</p><p>звук и музыка синтезируются в браузере (Web Audio)</p>'+
  '<h3>Спасибо</h3><p>всем, кто играет вместе — с детьми, друзьями и бабушками</p><p style="margin-top:22px;font-style:italic">«Там русский дух… там Русью пахнет!»</p>';
function creditsScreen(){return {head:'Титры',html:()=>'<div class="fin-credits"><div id="finCred">'+CREDITS+'</div></div>',items:[{label:'Назад',act:finBack}],credits:true};}
function pauseScreen(){return {pause:true,items:[{label:'Продолжить',act:()=>hideMenu()},
  {label:'Настройки',act:()=>finPush(settingsScreen())},{label:'Управление',act:()=>finPush(controlsScreen())},
  {label:'Режим',val:()=>G.solo?'один':'вдвоём',side:()=>{setSolo(!G.solo);}},
  {label:'Выйти в главное меню',sub:()=>G.hub?'пройденные уровни сохранены, этот уровень начнётся заново':'пролог начнётся заново',act:()=>{FIN.saveGame();finGo(()=>FIN.openTitle(true));}}],onBack:()=>hideMenu()};}
// ---------- открыть / закрыть ----------
FIN.openTitle=function(first){G.state='menu';FIN.titleOn=true;document.body.classList.add('fin-title');$('menu').classList.add('hide');$('finPause').classList.add('fin-hide');$('finTitle').classList.remove('fin-hide');
  FIN.menuStack=[];finScreen(mainScreen());if(first)FIN.title.restart();$('finVer').textContent='версия '+FIN.ver;$('finHint').textContent='↑ ↓ — выбрать · ← → — изменить · Enter / Пробел / A — да · Esc / B — назад';
  const pm=$('finPoem');pm.innerHTML=POEM.map(l=>'<span>'+l+'</span>').join('');clearTimeout(FIN.poemT);let i=0;const nx=()=>{const s=pm.children[i++];if(s){s.classList.add('fin-on');FIN.poemT=setTimeout(nx,1500);}};FIN.poemT=setTimeout(nx,first?2600:400);
  if(FIN.music)FIN.music.play(undefined);};
FIN.openPause=function(){G.state='pause';$('menu').classList.add('hide');$('finPause').classList.remove('fin-hide');$('finPauseLine').innerHTML=W&&W.pauseLine?'<b>Что мы делаем.</b> '+W.pauseLine:'';FIN.menuStack=[];finScreen(pauseScreen());};
FIN.closeAll=function(){FIN.menu=null;FIN.menuStack=[];FIN.titleOn=false;$('finTitle').classList.add('fin-hide');$('finPause').classList.add('fin-hide');document.body.classList.remove('fin-title');
  if(FIN.splashOn){FIN.splashOn=false;$('finSplash').classList.add('fin-hide');}if(FIN.music)FIN.music.play(undefined);};
FIN.splash=function(){const el=$('finSplash');el.classList.remove('fin-hide');el.style.opacity=1;FIN.splashOn=true;
  FIN.splashEnd=()=>{if(!FIN.splashOn)return;FIN.splashOn=false;el.style.opacity=0;setTimeout(()=>el.classList.add('fin-hide'),800);FIN.openTitle(true);};setTimeout(FIN.splashEnd,2900);el.onclick=FIN.splashEnd;};
{const _hm=hideMenu;hideMenu=function(){FIN.closeAll();_hm();};}
{const _sm=showMenu;showMenu=function(mode){if(mode==='menu'){FIN.openTitle(false);return;}if(mode==='pause'){FIN.openPause();return;}_sm(mode);};}
{const _mi=menuInput;menuInput=function(){if(FIN.splashOn){if(pressed.size)FIN.splashEnd();return;}if(FIN.menu){finMenuInput();return;}_mi();};}
// титры медленно плывут вверх
FIN.tickUI=function(){const now=performance.now(),dt=Math.min(0.1,(now-(FIN.uiT||now))/1000);FIN.uiT=now;const scr=FIN.menu;if(scr&&scr.credits){const el=$('finCred');if(el){FIN.credY=(FIN.credY===undefined?0:FIN.credY)+32*dt;const H=el.offsetHeight,box=el.parentNode.offsetHeight;if(FIN.credY>H+box)FIN.credY=0;el.style.top=(box-FIN.credY)+'px';}}else FIN.credY=undefined;};
