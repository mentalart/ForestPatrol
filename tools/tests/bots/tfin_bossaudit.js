//@@ wait=1500
// релиз final06: бот-аудитор боссов (задача F-0, docs/34 §6.2; стандарт — docs/33 п. 8). По каждому боссу (1-Б, 2-Б, 3-Б, 4-Б, 5-Б1, 5-Б2) и мини-боссу
// (Яга 1-1, Рак 2-1, Ворон 3-1, Баран 3-2, Лихо 5-1) гоняет короткий сценарий — вдвоём, герои неуязвимы, защита и удары по ближайшему врагу
// (приёмы из tfin_k1b*, tfin_k2bboss, tfin_k3bboss, tfin_boss4b, t5b1, tk5e_smoke, tfin_sky31boss, tfin_sky32boss, t51, tfin_k21, tfin_yaga11),
// следующие стадии — тем же переходом, что Ctrl+Alt+B (W.bossNext), ролики досматриваются до конца. Журнал интерфейса — PR из late_96_uilog.js
// (подсказки, баннеры, реплики, ролики, тряска, вспышки, hit-stop, окна HUD, нагрузка). Дважды: окно 1280×720 (всё) и 1920×1080 (шрифты и перекрытия).
// Печатает таблицу и проверяет нормы стандарта docs/33 п. 8 ЖЁСТКО (F-0b): слов в подсказке/реплике/субтитре ≤ 10, шрифт подсказок ≥ 3 % высоты окна, перекрытий HUD нет,
// hit-stop ≤ 0,16, тряска ≤ 0,09, вспышек ≤ 3/с (тряска в секунду и число подсказок зависят от хода боя — только WARN; разовый толчок ≤ 0,5 с — до 0,15). Где норма ещё нарушена — явный список KNOWN_EXCEPTIONS (значение, причина, строка docs/34): красным бот
// становится только при ухудшении относительно исключения; исправили игру — удалить исключение (бот напомнит WARN-ом «исключение больше не нужно»). Нагрузка и длины
// роликов зависят от машины — WARN (нагрузку закрывает tk5e_budget). Пустой уровень (нет подсказок, роликов) не ошибка. Сценарий, не добравшийся до босса, — FAIL.
// Все жёсткие метрики считаются по игровому времени (ZC.tick), не по реальному — прогон детерминирован.
// @timeout=1800
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.SEED=()=>{Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();};SEED();
window.RES={};window.VP='720';
// ролик: ждём начала до wait кадров, потом играем до конца (не больше max)
window.CINE_OUT=(wait,max)=>{let t=0;while(!ZC.G.cine&&t<(wait||0)){ZC.tick(1);t++;}let c=0;while(ZC.G.cine&&c<(max||4000)){ZC.tick(1);c++;}return c;};
// бой sec секунд: герои неуязвимы; защита от шаров и замахов (U.def), иначе — удар по ближайшему врагу
window.SCALE=1;   // в окне 1920×1080 бой короче (нужны шрифты и перекрытия, а не нагрузка)
window.PLAY=(sec)=>{const n=Math.round(sec*SCALE*60);let i=0;
  for(;i<n;i++){if(ZC.G.state!=='play')break;
    for(const h of Object.values(ZC.HERO))if(h.active)h.iT=Math.max(h.iT||0,0.5);
    if(!ZC.G.cine){for(const pi of[0,1]){if(U.def(pi,i))continue;const hh=U.hero(pi);let e=null,bd=1e9;
      for(const x of ZC.W.enemies){if(!x.alive)continue;const d=Math.hypot(x.pos.x-hh.pos.x,x.pos.z-hh.pos.z);if(d<bd){bd=d;e=x;}}
      if(e&&bd<30)U.hit(pi,e,i);}}
    ZC.tick(1);}
  U.rel(0);U.rel(1);return i;};
// стадии: dwell секунд боя → следующая стадия (как Ctrl+Alt+B) → досмотреть ролик; до max стадий
// переход не всегда сразу (ролик, урок, этап ещё не начался) — до 15 попыток с боем между ними
window.STAGES=(max,dwell,need)=>{let s=0;for(;s<max;s++){PLAY(dwell);let ok=false;for(let k=0;k<15&&!ok;k++){try{ok=!!(ZC.W.bossNext&&ZC.W.bossNext());}catch(e){}if(!ok){if(ZC.G.cine)CINE_OUT(0,4000);else PLAY(2);}}if(!ok)break;ZC.tick(5);CINE_OUT(30,4000);}PLAY(8);if(s<(need==null?1:need))throw new Error('не добрались до следующей стадии босса: '+s);return s;};
window.load=(id,tk)=>{ZC.setSolo(false);ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(tk||10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}};
window.SC={
 '1-B':()=>{load('1-B',20);CINE_OUT(0,4000);ZC.tick(60);return STAGES(4,22);},
 '2-B':()=>{load('2-B',10);CINE_OUT(200,4000);ZC.W.warp2b('boss');CINE_OUT(300,4000);ZC.tick(30);return STAGES(5,22);},
 '3-B':()=>{load('3-B',10);CINE_OUT(30,4000);ZC.W.warp3b('boss1');ZC.tick(5);CINE_OUT(60,4000);ZC.tick(30);return STAGES(5,22);},
 '4-B':()=>{load('4-B',60);CINE_OUT(0,4000);return STAGES(4,22);},
 '5-B1':()=>{load('5-B1',60);CINE_OUT(0,4000);ZC.tick(30);return STAGES(3,20);},
 '5-B2':()=>{const o=document.getElementById('k5eStart');if(o)o.remove();load('5-B2',10);const E5=ZC.FIN.k5e;let n=0;
   for(const st of[0,1,2,3]){E5.goStage(st);ZC.G.manual=true;ZC.tick(30);CINE_OUT(0,3000);PLAY(14);if(E5.cur==null)throw new Error('нет стадии '+st);n++;}return n;},
 '1-1':()=>{load('1-1',30);if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(30);const W=ZC.W;W.rzt.state='done';W.rzt.onDone();CINE_OUT(600,4000);ZC.tick(10);if(W.flags.stage!=='fight')throw new Error('после ролика не бой: '+W.flags.stage);PLAY(40);return 1;},
 '2-1':()=>{load('2-1',20);ZC.W.warp21('boss');ZC.tick(20);CINE_OUT(0,2000);ZC.tick(10);const D=ZC.W.dbg21();
   U.walkTo(0,-2,-308,10);U.walkTo(1,2,-308,10);CINE_OUT(200,4000);ZC.tick(20);if(D.HB.dbg().phase<1)throw new Error('рак не вышел: phase='+D.HB.dbg().phase+' '+U.st());PLAY(45);return 1;},
 '3-1':()=>{load('3-1',20);U.nocine();ZC.tick(5);const H=ZC.HERO;ZC.FIN.warp('boss');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
   U.toKind('proshka',0);U.toKind('pelageya',1);U.goto(0,0,-445,5);ZC.tick(5);CINE_OUT(60,4000);ZC.tick(10);if(!ZC.W.voron31||ZC.W.voron31.phase<1)throw new Error('нет Ворона: '+U.st());PLAY(45);return 1;},
 '3-2':()=>{load('3-2',30);const H=ZC.HERO;if(ZC.FIN.tut32)ZC.FIN.tut32.auto=false;ZC.FIN.warp('boss');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
   U.toKind('proshka',0);U.toKind('yosha',1);U.goto(0,0,-307,5);ZC.tick(5);CINE_OUT(60,4000);ZC.tick(10);if(!ZC.W.ram32||ZC.W.ram32.phase<1)throw new Error('нет Барана: '+U.st());PLAY(45);return 1;},
 '5-1':()=>{load('5-1',60);if(ZC.G.cine){ZC.skip();ZC.tick(5);}for(const to of['boss1','boss2','boss3']){ZC.W.warp51(to);ZC.tick(30);CINE_OUT(30,4000);if(!/^boss/.test(ZC.W.flags.stage))throw new Error('не босс: '+ZC.W.flags.stage);PLAY(22);}return 3;}
};
// один босс: журнал → сценарий → сводка в RES (ошибка сценария не обрывает остальных, но пойдёт в FAIL)
window.RUNB=(name)=>{SEED();PR.reset();PR.start({perf:VP==='720'});const c0=PR.c;let err=null,st=0;
  try{st=SC[name]();}catch(e){err=String(e&&e.message||e).slice(0,160);}
  const r=PR.report();PR.stop();r.err=err;r.stages=st;r.ticks=PR.c-c0;RES[VP+' '+name]=r;
  return name+' '+VP+' ticks='+r.ticks+' stages='+st+' tips='+r.tips.n+' cines='+r.cines.n+(err?' ERR '+err:'');};
'ok'
//@@
RUNB('1-B')
//@@
RUNB('2-B')
//@@
RUNB('3-B')
//@@
RUNB('4-B')
//@@
RUNB('5-B1')
//@@
RUNB('5-B2')
//@@
RUNB('1-1')
//@@
RUNB('2-1')
//@@
RUNB('3-1')
//@@
RUNB('3-2')
//@@
RUNB('5-1')
//@@ vp=1920x1080
VP='1080';SCALE=0.6;innerHeight+'px'
//@@
RUNB('1-B')
//@@
RUNB('2-B')
//@@
RUNB('3-B')
//@@
RUNB('4-B')
//@@
RUNB('5-B1')
//@@
RUNB('5-B2')
//@@
RUNB('1-1')
//@@
RUNB('2-1')
//@@
RUNB('3-1')
//@@
RUNB('3-2')
//@@
RUNB('5-1')
//@@ wait=500
// ---- сводка и проверки ----
// Жёсткие нормы (docs/33 п. 8) — NORM; исключения — KNOWN_EXCEPTIONS; мягкие (WARN) — THR: средняя длина подсказки, нагрузка (вызовы, треугольники, частицы), самый длинный ролик.
// Допуски на шум: hit-stop +0,005, тряска +0,005, шрифт −0,06 п.п., перекрытие +3 п.п.; слова целые — без допуска.
// THR[босс] — мягкий «храповик» (WARN): средняя длина подсказки, p95 вызовов и тысяч треугольников, живые частицы (пик), самый длинный ролик, с. Зависят от скорости
// машины и содержимого других PR; нагрузку закрывает tk5e_budget. Запас: среднее +1,5, вызовы/треугольники ×1,4 +20, частицы +30, ролик ×1,15 +2 с.
window.THR={
 '1-B':{"tipAvg":6.8,"calls":374,"tris":162,"fx":55,"cine":28},
 '2-B':{"tipAvg":17.8,"calls":514,"tris":235,"fx":50,"cine":29.6},
 '3-B':{"tipAvg":20.4,"calls":284,"tris":398,"fx":30,"cine":28},
 '4-B':{"tipAvg":10.1,"calls":280,"tris":141,"fx":120,"cine":97.1},
 '5-B1':{"tipAvg":14.8,"calls":196,"tris":223,"fx":53,"cine":25.0},
 '5-B2':{"tipAvg":9.5,"calls":520,"tris":274,"fx":120,"cine":214.4},
 '1-1':{"tipAvg":11,"calls":356,"tris":560,"fx":69,"cine":24.1},
 '2-1':{"tipAvg":28.0,"calls":889,"tris":577,"fx":52,"cine":11.5},
 '3-1':{"tipAvg":8.5,"calls":273,"tris":533,"fx":53,"cine":18.6},
 '3-2':{"tipAvg":11.7,"calls":276,"tris":440,"fx":52,"cine":16.5},
 '5-1':{"tipAvg":9.7,"calls":269,"tris":279,"fx":63,"cine":3.1}
};
window.NORM={words:10,font:3,hitstop:0.16,shake:0.09,shakeOnce:0.15,shakePs:5,flash:3};
// KNOWN_EXCEPTIONS: {boss, metric, vp, val, why, doc}. metric: 'words' (подсказки, реплики, субтитры — максимум), 'font' (% высоты окна, vp — окно),
// 'ov:<пара>' (% перекрытия, vp), 'hitstop' | 'shake' | 'flash'. val — текущее значение: хуже него — FAIL; лучше нормы — WARN «исключение больше не нужно».
const _FT='мелкий шрифт подсказок: карточка finTut 16 px / подсказка боя finBossHint 15,6 px, hint0/hintS 19 px = 2,64 % при 720p (норма 22 px); общий слой подсказок — F-2c';
window.KNOWN_EXCEPTIONS=[
 {boss:'1-B',metric:'font',vp:'720',val:2.22,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'1-B',metric:'font',vp:'1080',val:1.48,why:_FT+'; карточка 16 px не растёт с окном',doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'2-B',metric:'font',vp:'720',val:2.22,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'2-B',metric:'font',vp:'1080',val:1.48,why:_FT+'; карточка 16 px не растёт с окном',doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'3-B',metric:'font',vp:'720',val:2.22,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'3-B',metric:'font',vp:'1080',val:1.48,why:_FT+'; карточка 16 px не растёт с окном',doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'4-B',metric:'font',vp:'720',val:1.94,why:_FT+'; в 4-Б ещё 14 px',doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'4-B',metric:'font',vp:'1080',val:1.3,why:_FT+'; в 4-Б ещё 14 px',doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'5-B1',metric:'font',vp:'720',val:2.64,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'5-B1',metric:'font',vp:'1080',val:2.63,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'2-1',metric:'font',vp:'720',val:2.64,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'2-1',metric:'font',vp:'1080',val:2.63,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'3-1',metric:'font',vp:'720',val:2.64,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'3-1',metric:'font',vp:'1080',val:2.63,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'3-2',metric:'font',vp:'720',val:2.17,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'3-2',metric:'font',vp:'1080',val:1.48,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'5-1',metric:'font',vp:'720',val:2.64,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'5-1',metric:'font',vp:'1080',val:2.63,why:_FT,doc:'docs/34 X-2 (стр. 428), F-2c (стр. 527)'},
 {boss:'1-B',metric:'subs',vp:'*',val:23,why:'реплика/субтитр ролика длиннее 10 слов (норма субтитра ≤ 10)',doc:'docs/33 стр. 41; docs/34 X-7, X-8 (стр. 433–434)'},
 {boss:'2-B',metric:'subs',vp:'*',val:19,why:'реплика/субтитр ролика длиннее 10 слов (норма субтитра ≤ 10)',doc:'docs/33 стр. 41; docs/34 X-7, X-8 (стр. 433–434)'},
 {boss:'3-B',metric:'subs',vp:'*',val:19,why:'реплика/субтитр ролика длиннее 10 слов (норма субтитра ≤ 10)',doc:'docs/33 стр. 41; docs/34 X-7, X-8 (стр. 433–434)'},
 {boss:'4-B',metric:'subs',vp:'*',val:15,why:'реплика/субтитр ролика длиннее 10 слов (норма субтитра ≤ 10)',doc:'docs/33 стр. 41; docs/34 X-7, X-8 (стр. 433–434)'},
 {boss:'5-B1',metric:'subs',vp:'*',val:15,why:'реплика/субтитр ролика длиннее 10 слов (норма субтитра ≤ 10)',doc:'docs/33 стр. 41; docs/34 X-7, X-8 (стр. 433–434)'},
 {boss:'5-B2',metric:'subs',vp:'*',val:20,why:'реплика/субтитр ролика длиннее 10 слов (норма субтитра ≤ 10)',doc:'docs/33 стр. 41; docs/34 X-7, X-8 (стр. 433–434)'},
 {boss:'1-1',metric:'subs',vp:'*',val:14,why:'реплика/субтитр ролика длиннее 10 слов (норма субтитра ≤ 10)',doc:'docs/33 стр. 41; docs/34 X-7, X-8 (стр. 433–434)'},
 {boss:'3-1',metric:'subs',vp:'*',val:17,why:'реплика/субтитр ролика длиннее 10 слов (норма субтитра ≤ 10)',doc:'docs/33 стр. 41; docs/34 X-7, X-8 (стр. 433–434)'},
 {boss:'3-2',metric:'subs',vp:'*',val:12,why:'реплика/субтитр ролика длиннее 10 слов (норма субтитра ≤ 10)',doc:'docs/33 стр. 41; docs/34 X-7, X-8 (стр. 433–434)'},
 {boss:'5-1',metric:'subs',vp:'*',val:17,why:'реплика/субтитр ролика длиннее 10 слов (норма субтитра ≤ 10)',doc:'docs/33 стр. 41; docs/34 X-7, X-8 (стр. 433–434)'},
];
const names=['1-B','2-B','3-B','4-B','5-B1','5-B2','1-1','2-1','3-1','3-2','5-1'];const L=[];const bad=[];const warn=[];const note=[];
const f=(v,d)=>v==null?'-':(+v).toFixed(d==null?1:d);
const EX=(boss,metric,vp)=>KNOWN_EXCEPTIONS.find(e=>e.boss===boss&&e.metric===metric&&(e.vp===vp||e.vp==='*'));
const usedEx=new Set();
// проверка одной метрики: v — значение, lim — норма, hi — «чем больше, тем хуже», tol — допуск
window.CHECK=(boss,metric,vp,v,lim,hi,tol,unit,what)=>{if(v==null)return;const ex=EX(boss,metric,vp);const sgn=hi?1:-1;
  const bound=ex?ex.val:lim, t=tol||0;
  const worse=(x,b)=>hi?x>b+t+1e-9:x<b-t-1e-9;
  if(worse(v,bound)){bad.push(boss+' '+vp+': '+what+' '+v+unit+(hi?' > ':' < ')+(+(bound+sgn*t).toFixed(3))+unit+(ex?' (исключение '+ex.val+': ухудшение)':' (норма)'));}
  else if(ex){usedEx.add(ex);if(!worse(v,lim)){note.push(boss+' '+vp+': '+what+' '+v+unit+' уже в норме — исключение '+metric+' больше не нужно');}}};
L.push('босс  | подск.: шт ср/макс | слов реплик/субт. макс | шрифт% 720/1080 | перекр.% 720/1080 | ролики: шт макс/сумма с | вспышки/с | тряска: макс /в с | hit-stop | вызовы p95 | тр.тыс p95 | частицы');
for(const n of names){const a=RES['720 '+n],b=RES['1080 '+n];
  if(!a){bad.push(n+': нет замера');continue;}
  if(a.err)bad.push(n+' 720: сценарий упал: '+a.err);if(b&&b.err)bad.push(n+' 1080: сценарий упал: '+b.err);
  L.push([n,a.tips.n+' '+f(a.tips.avg)+'/'+a.tips.max,a.says.max+'/'+a.cineSays.max,f(a.hintFontPct,2)+'/'+(b?f(b.hintFontPct,2):'-'),a.ovMax+'/'+(b?b.ovMax:'-'),a.cines.n+' '+f(a.cines.max)+'/'+f(a.cines.total),a.flash.perSec,a.shake.max+' / '+a.shake.perSec,f(a.hitstop.max,2),a.perf.callsP95,a.perf.trisP95,a.perf.fxMax].join(' | '));
  // --- жёсткие нормы ---
  {const rr=[a,b].filter(r=>r&&!r.err);
   CHECK(n,'words','*',Math.max(0,...rr.map(r=>r.tips.max)),NORM.words,1,0,'','слов в подсказке (макс.)');
   CHECK(n,'subs','*',Math.max(0,...rr.map(r=>Math.max(r.says.max,r.cineSays.max))),NORM.words,1,0,'','слов в реплике/субтитре (макс.)');}
  for(const [vp,r] of[['720',a],['1080',b]]){if(!r||r.err)continue;
    CHECK(n,'font',vp,r.hintFontPct,NORM.font,0,0.06,'%','шрифт подсказок');
    for(const p in r.ov)CHECK(n,'ov:'+p,vp,r.ov[p],0,1,EX(n,'ov:'+p,vp)?3:0,'%','перекрытие HUD '+p+' (≥10 %)');
    CHECK(n,'hitstop',vp,r.hitstop.max,NORM.hitstop,1,0.005,' с','hit-stop');
    CHECK(n,'shake',vp,r.shake.max,NORM.shake,1,0.005,'','тряска длительная (> 0,5 с)');
    CHECK(n,'shakeOnce',vp,r.shake.once,NORM.shakeOnce,1,0.005,'','тряска разовая (≤ 0,5 с)');
    if(r.shake.perSec>NORM.shakePs)warn.push(n+' '+vp+': тряска '+r.shake.perSec+'/с > '+NORM.shakePs+' (норма 5/с; зависит от хода боя — не жёстко)');
    CHECK(n,'flash',vp,r.flash.perSec,NORM.flash,1,0,'/с','вспышки');}
  // --- мягкие (WARN): храповик по THR ---
  const T=THR[n];if(!T)continue;
  const SL=(lim,hi)=>hi?Math.max(lim*1.25,lim+(Number.isInteger(lim)?1:0.01)):lim*0.85;
  const chk=(what,v,lim,hi)=>{if(v==null||lim==null)return;const L2=SL(lim,hi);if(hi?v>L2+1e-9:v<L2-1e-9)warn.push(n+': '+what+' '+v+(hi?' > ':' < ')+(+L2.toFixed(2))+' (KNOWN '+lim+')');};
  chk('слов в подсказке (сред.)',a.tips.avg,T.tipAvg,1);chk('вызовы p95',a.perf.callsP95,T.calls,1);chk('треугольники p95',a.perf.trisP95,T.tris,1);chk('частицы',a.perf.fxMax,T.fx,1);chk('самый длинный ролик',a.cines.max,T.cine,1);}
const hint=[];for(const k of Object.keys(RES)){const r=RES[k];if(r.hud)for(const id in r.hud)if(['hint0','hint1','hintS','finBossHint','finTut'].includes(id)){hint.push(k+' '+id+' n='+r.hud[id].n+' мин='+r.hud[id].pxMin+'px '+r.hud[id].pctMin+'% (сам элемент '+r.hud[id].pctOwnMin+'%)');}}
const ovl=[];for(const k of Object.keys(RES)){const o=RES[k].ovAny||{};for(const p in o)ovl.push(k+' '+p+' '+o[p]+'%');}
const NOW={};for(const n of names){const a=RES['720 '+n],b=RES['1080 '+n];if(!a)continue;
  NOW[n]={tipMax:a.tips.max,tipAvg:a.tips.avg,says:a.says.max,cineSays:a.cineSays.max,font720:a.hintFontPct,font1080:b?b.hintFontPct:null,ov720:a.ovMax,ov1080:b?b.ovMax:null,flash:a.flash.perSec,shake:a.shake.max,shakePs:a.shake.perSec,hitstop:a.hitstop.max,calls:a.perf.callsP95,tris:a.perf.trisP95,fx:a.perf.fxMax,cine:a.cines.max};}
window.NOWJ=JSON.stringify(NOW);
const LONG=names.map(n=>{const a=RES['720 '+n];return a&&a.tips.long&&a.tips.long.length?n+': '+a.tips.long.join(' | '):null;}).filter(Boolean);
const OUT=L.join('\n')+'\n--- подсказки длиннее 7 слов\n'+LONG.join('\n')+'\n--- шрифты окон HUD (мин. по подсказкам)\n'+hint.join('\n')+'\n--- перекрытия ≥1%\n'+ovl.join('\n')+'\n--- значения сейчас: '+NOWJ+'\n--- ошибки страницы: '+_errs.length+(_errs.length?' '+_errs.slice(0,3).join(' | '):'')+'\n'+(bad.length?bad.map(x=>'FAIL '+x).join('\n'):'bossaudit ok');
// первая строка вывода («> …» в сводке regress и CI) — итог: нарушения или ok; красным — ошибка страницы (PAGEERROR), чтобы бот упал, а итог остался виден
const SUM=bad.length?'FAIL '+bad.length+': '+bad.slice(0,4).join('; ')+(bad.length>4?'; …':''):'bossaudit ok'+(KNOWN_EXCEPTIONS.length?' (исключений '+KNOWN_EXCEPTIONS.length+')':'')+(warn.length?' (WARN нагрузка: '+warn.slice(0,3).join('; ')+')':'');
if(bad.length)setTimeout(()=>{throw new Error(bad.length+' нарушений норм: '+bad.join(' | '));},0);
SUM+'\n'+OUT+'\n--- KNOWN_EXCEPTIONS ('+KNOWN_EXCEPTIONS.length+')\n'+KNOWN_EXCEPTIONS.map(e=>e.boss+' '+e.metric+' '+e.vp+' = '+e.val+' — '+e.why+' ['+e.doc+']').join('\n')+(note.length?'\n'+note.map(x=>'NOTE '+x).join('\n'):'')+(warn.length?'\n'+warn.map(x=>'WARN '+x).join('\n'):'')
