/* ============================== РЕЛИЗ · МИР 1 ДЛЯ ДЕТЕЙ 7–11 · СТАРТ, УДОБСТВО, СОХРАННОСТЬ ============================== */
// По отчёту детской оценки (QA 7–11 лет). Здесь — то, что общее для игры и нужно ребёнку ещё до первого уровня; сами правки мира 1 — late_75_kids_w1.js.
//  • «Новая игра» открывает экран «Кто играет?»: вдвоём или один, у каждого игрока — Ёжик / Лисёнок / Богатырь (Лёгкий / Средний / Богатырский путь),
//    чтение задач вслух и крупный текст. По умолчанию выбрано «Начать сказку!» — одно нажатие. В ?debug экран пропускается (боты), FIN.kids.force — показать.
//  • Для новой установки тряска камеры и вспышки — 50 % (было 100 %).
//  • Настройки: «Читать задачи вслух», «На весь экран». Управление: клавиша H / LB — «Повтори задачу».
//  • Игра сама встаёт на паузу, когда окно теряет фокус или вкладка скрыта (раньше герои стояли без нажатий, а их били).
//  • Закрытие вкладки посреди уровня мира 1 спрашивает подтверждение (сохранение внутри уровня нет — об этом честно сказано в паузе).
//  • Слабый компьютер: если первые секунды уровня идут медленнее ~30 кадров/с, графика сама снижается на ступень (без сохранения в настройки).
const KIDS=FIN.kids={ver:'мир 1 · версия для 7–11 лет',force:false,seen:false,t0:0,q:{t:0,n:0,sum:0,last:0,done:false},debug:/[?&]debug/.test(location.search),
  worlds:[1],levels:['p']};   // где включены правки: миры из worlds и уровни из levels
KIDS.isKidsLevel=i=>{const L=LEVELS[i];return !!L&&(KIDS.worlds.includes(L.world)||KIDS.levels.includes(L.id));};
// ---------- настройки новой установки ----------
try{if(localStorage.getItem('zlatayaCep.settings.v1')===null){FIN.set.shakeK=0.5;FIN.set.flashK=0.5;}}catch(e){}
const kidsRead=()=>FIN.set.readAloud!==false;
// ---------- экран «Кто играет?» ----------
const KIDS_PATHS={easy:['🦔 Ёжик','Лёгкий путь','больше времени на щит и кувырок, подсказки приходят быстрее'],mid:['🦊 Лисёнок','Средний путь','щит и кувырок вовремя — как в сказке'],hard:['🛡 Богатырь','Богатырский путь','для опытных: враги быстрее, окна короче']};
function kidsSetupScreen(){const S=FIN.set,cyc=(pi,d)=>{cyclePath(pi);if(d<0)cyclePath(pi);},save=()=>{FIN.saveSettings();FIN.applySettings();};
  const pathItem=(pi,label)=>({label,val:()=>KIDS_PATHS[players[pi].path][0]+' · '+KIDS_PATHS[players[pi].path][1],sub:()=>KIDS_PATHS[players[pi].path][2],side:d=>cyc(pi,d)});   // ← → меняют путь; малышам — Ёжик, взрослым и подросткам — Лисёнок или Богатырь
  const p2=pathItem(1,'Путь игрока 2');Object.defineProperty(p2,'off',{get:()=>!!G.solo});
  const p1=pathItem(0,'Путь игрока 1');Object.defineProperty(p1,'label',{get:()=>G.solo?'Твой путь':'Путь игрока 1'});
  const items=[
    {label:'Сколько вас?',val:()=>G.solo?'я один':'вдвоём',sub:()=>G.solo?'один игрок водит всех четверых героев по очереди':'двое: игрок 1 слева, игрок 2 справа',side:()=>{setSolo(!G.solo);}},
    p1,p2,
    {label:'Читать задачи вслух',val:()=>kidsRead()?'да':'нет',sub:()=>FIN.readAloud?FIN.readAloud.status():'',side:()=>{S.readAloud=!kidsRead();save();if(S.readAloud&&FIN.readAloud)FIN.readAloud.test();}},
    {label:'Крупный текст',val:()=>S.ts>=1.3?'да':'нет',side:()=>{S.ts=S.ts>=1.3?1:1.3;save();}},
    {label:'Начать сказку!',sub:'можно поменять потом: Настройки',act:()=>{save();finGo(()=>startFrom(0));}},
    {label:'Назад',act:finBack}];
  return {head:'Кто играет?',items,sel:5};}
{const _ng=newGame;newGame=function(){
  if(KIDS.debug&&!KIDS.force){_ng();return;}
  if(!KIDS.seen){KIDS.seen=true;players.forEach(p=>{p.path='easy';});if(G.solo)players[1].path=players[0].path;}
  finPush(kidsSetupScreen());};}
// версия на титуле
{const _ot=FIN.openTitle;FIN.openTitle=function(first){_ot(first);const v=$('finVer');if(v)v.textContent='версия '+FIN.ver+' · '+KIDS.ver;};}
// ---------- настройки и управление ----------
function kidsFullscreen(){try{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen();}catch(e){}}
addEventListener('fullscreenchange',()=>{if(FIN.menu)finDraw();});
{const _ss=settingsScreen;settingsScreen=function(){const scr=_ss(),S=FIN.set,L=scr.items,k=L.findIndex(it=>it.label==='Джойстики местами'),save=()=>{FIN.saveSettings();FIN.applySettings();};
  const add=[{label:'Читать задачи вслух',val:()=>kidsRead()?'да':'нет',sub:()=>FIN.readAloud?FIN.readAloud.status():'',side:()=>{S.readAloud=!kidsRead();save();if(S.readAloud&&FIN.readAloud)FIN.readAloud.test();}},
    {label:'На весь экран',val:()=>document.fullscreenElement?'да':'нет',sub:'Esc выйдет из полного экрана',side:()=>kidsFullscreen()}];
  L.splice(k<0?L.length-1:k,0,...add);return scr;};}
{const _cs=controlsScreen;controlsScreen=function(){const scr=_cs(),h0=scr.html;scr.html=()=>h0().replace('</table>','<tr><td>Повторить задачу вслух</td><td><kbd>H</kbd></td><td><kbd>H</kbd></td><td>'+padGlyph('help')+'</td></tr><tr><td>«Ко мне!» — ещё и ближе к рукам</td><td><kbd>T</kbd></td><td><kbd>Enter</kbd></td><td>—</td></tr></table>');return scr;};}
// кнопка «Повтори задачу»: H на клавиатуре, LB на джойстике (одна на двоих)
BIND[0].help=BIND[1].help='KeyH';ALL.add('KeyH');KEYNAME.KeyH='H';PADG.help=['LB','T'];PADMAP.push([4,'help']);
// «Ко мне!» — ещё и на T (игрок 1) и Enter (игрок 2): цифры 1 и 0 далеко от рук (только в игре, не в меню)
const KALT={KeyT:'Digit1',Enter:'Digit0'};
addEventListener('keydown',e=>{const a=KALT[e.code];if(a&&G.state==='play'&&!G.cine&&!e.repeat){pressed.add(a);down.add(a);}},true);
addEventListener('keyup',e=>{const a=KALT[e.code];if(a)down.delete(a);},true);
// ---------- автопауза ----------
function kidsAutoPause(){if(KIDS.debug||G.manual||FIN.titleOn||FIN.splashOn)return;if(G.state==='play')showMenu('pause');}
addEventListener('blur',()=>{setTimeout(()=>{try{if(!document.hasFocus())kidsAutoPause();}catch(e){}},200);});
document.addEventListener('visibilitychange',()=>{try{if(document.hidden){kidsAutoPause();if(AC&&AC.state==='running')AC.suspend();}else if(AC&&AC.state==='suspended')AC.resume();}catch(e){}});
// ---------- закрытие вкладки посреди уровня ----------
addEventListener('beforeunload',e=>{try{if(KIDS.debug||!W||!W.kids||G.state==='menu'||FIN.titleOn)return;if(W.levelId==='luko'||W.levelId==='epi')return;if(performance.now()-KIDS.t0<30000)return;
  e.preventDefault();e.returnValue='Уровень начнётся заново. Выйти?';return e.returnValue;}catch(err){}});
// ---------- слабый компьютер: графика сама проще ----------
{const _ll=loadLevel;loadLevel=function(i){_ll(i);KIDS.t0=performance.now();const q=KIDS.q;q.t=0;q.n=0;q.sum=0;q.last=0;};}
{const _st=step;step=function(dt){_st(dt);if(KIDS.debug||KIDS.q.done||G.state!=='play'||G.cine||G.trans||document.hidden)return;const q=KIDS.q,now=performance.now();
  if(q.last&&now-q.last<400){q.t+=now-q.last;if(q.t>4000){q.n++;q.sum+=now-q.last;}}q.last=now;
  if(q.n>=240){const ms=q.sum/q.n;q.done=true;if(ms>34&&FIN.set.quality!=='low'){FIN.set.quality=FIN.set.quality==='high'?'mid':'low';FIN.applyQuality();banner('Игре тяжело — картинка стала проще','#ffffff',2.6,'так она пойдёт плавнее · вернуть можно в «Настройки → Графика»');}}};}
// ---------- числа для плейтеста: по уровням мира 1 — сколько раз упали, сколько просили «Повтори», сколько играли ----------
KIDS.log={};KIDS.lv=()=>{const id=W&&W.levelId||'?';return KIDS.log[id]||(KIDS.log[id]={downs:0,help:0,read:0,sec:0,visits:0});};
{const _ll2=loadLevel;loadLevel=function(i){_ll2(i);if(W&&W.kids)KIDS.lv().visits++;};}
{const _st2=step;step=function(dt){_st2(dt);if(W&&W.kids&&G.state==='play'&&!G.cine&&!G.trans)KIDS.lv().sec+=dt;};}
KIDS.report=()=>{const o={ver:FIN.ver+' · '+KIDS.ver,paths:players.map(p=>p.path),solo:!!G.solo,readAloud:kidsRead(),quality:FIN.set.quality,levels:{}};
  for(const id in KIDS.log){const l=KIDS.log[id];o.levels[id]={'минут':+(l.sec/60).toFixed(1),'упали':l.downs,'повтори':l.help,'прочитано':l.read,'заходов':l.visits};}
  return JSON.stringify(o,null,1);};
window.zlatayaReport=()=>KIDS.report();   // в консоли браузера (F12): zlatayaReport() — числа для плейтеста
