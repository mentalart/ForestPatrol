/* ============================== РЕЛИЗ final06 · НАПАРНИК: БОТ ЗА ИГРОКА 2 ============================== */
// Режим «С напарником» (главное меню → «Режим»): играем вдвоём, но за Игрока 2 (Пелагея и Йоша) — бот; человек — за Игрока 1 (Прошка и Потап).
// Бот сидит на «втором месте» и жмёт те же клавиши Игрока 2, что и живой друг, — уровни об этом не знают и их править не нужно.
//   • идёт за человеком: этим занят сам движок — тот же «ведомый», что в одиночном режиме (не сходит с краёв, прыгает через щели, подтягивается при застревании);
//   • в бою (в пределах досягаемости моро́ков): сам держит щит, отбивает капли и замахи, кувыркается от красного зубца, бьёт, когда морок открыт,
//     заходит сбоку к «коре», на Богатырский мах ждёт удара человека; не безупречен — часть замахов только щитом, часть пропускает (CMP.skill);
//   • упал человек — подходит «подшить»; упал сам — берёт второго героя; в окнах (Лукоморье, «Сказ») и в ритме повторяет за человеком; ролик пропускается, пока держишь прыжок.
// Парные загадки уровней бот проходит по «маршруту уровня» (CMP.route, ниже): список шагов Игрока 2 с условием «выполнено» — свой модуль в папке уровня
// (levels/p — пролог, levels/1-1 … 1-5 и 1-B — мир 1, levels/2-1 … 2-5 и 2-B — мир 2, levels/3-1 … 3-5 и 3-B — мир 3 (общие помощники пера и мостков — levels/w3); в Лукоморье бот повторяет за человеком). Уровень без маршрута бот проходит «ведомым». Миры 4–5 — по маршруту на уровень.
// Клавиатура: в этом режиме стрелки и M K L , . / ; работают как вторая половина клавиатуры Игрока 1 (WASD, пробел, F, G, Q, E, R, Shift, 1).
const CMP={on:false,skill:0.85,mode:'idle',downT:0,tick:0};
CMP.live=()=>CMP.on&&!G.solo;
const CMP_MAP={};for(const a in BIND[1])CMP_MAP[BIND[1][a]]=BIND[0][a];
const CMP_HELD=new Set();
const cmpKey=(a,on)=>{const c=BIND[1][a];if(on){down.add(c);CMP_HELD.add(c);}else{down.delete(c);CMP_HELD.delete(c);}};
const cmpTap=a=>pressed.add(BIND[1][a]);
function cmpFree(){for(const c of CMP_HELD)down.delete(c);CMP_HELD.clear();PADS.axes[1]={x:0,y:0};}
// идти в сторону (dx,dz) по миру: стик Игрока 2 с учётом поворота камеры (ходьба в игре — относительно камеры)
function cmpAxes(dx,dz,k){const l=Math.hypot(dx,dz);if(l<1e-4){PADS.axes[1]={x:0,y:0};return;}dx/=l;dz/=l;const b=camBack();
  PADS.axes[1]={x:(dx*b.z-dz*b.x)*k,y:(dx*b.x+dz*b.z)*k};}
function cmpGoto(h,x,z,stop){const dx=x-h.pos.x,dz=z-h.pos.z,d=Math.hypot(dx,dz);if(d>stop)cmpAxes(dx,dz,d>stop+0.8?1:0.5);return d;}
// повторять за человеком (окна, ритм, особые уровни): те же клавиши и тот же стик
function cmpMirror(){for(const a in BIND[0]){const c=BIND[0][a];if(down.has(c)||PADS.down.has(c))cmpKey(a,true);if(pressed.has(c))cmpTap(a);}PADS.axes[1]=PADS.axes[0];}
// как встретить замах: отбить в окне, только щитом или проспать — по CMP.skill
const cmpDice=()=>{const r=Math.random(),s=CMP.skill;return r<s?'parry':r<s+(1-s)*0.65?'shield':'asleep';};
// чужих (привязанных к Игроку 1: учебные мороки пролога и т. п.) не трогает — они человеку
CMP.ignore=null;                                                           // уровень может назвать врагов, к которым не подходят (ящерки на сваях над лавой): CMP.ignore=e=>…
const cmpAlive=e=>e.alive&&!e.sleep&&e.pi!==0&&e.state!=='spawn'&&e.state!=='dying'&&e.state!=='hide'&&(!e.g||e.g.visible!==false)&&!(CMP.ignore&&CMP.ignore(e));
// морок открыт для удара: пробит, оглушён, шатается после отбива, окно после кувырка, у «коры» — сбоку или сзади
function cmpOpen(e,h){if(e.guardAll&&e.guardAll())return false;
  if(e.state==='broken'||e.dazeT>0||(e.state==='stagger'&&!e.openHit)||e.open>0)return true;
  const sh=e.shell;if(sh&&typeof sh==='object'&&e.plateCd<=0){const s=hitSide(e,h);if(s!=='f'||sh[s]===false)return !(e.shellLock&&e.shellLock());}
  return false;}
// где стоять у врага: у корявого — сбоку, у остальных — на расстоянии удара по линии «от врага к себе»
function cmpPos(e,h){const dx=h.pos.x-e.pos.x,dz=h.pos.z-e.pos.z,d=Math.hypot(dx,dz)||1;
  if(e.shell&&typeof e.shell==='object'){const rx=Math.cos(e.face),rz=-Math.sin(e.face),side=(dx*rx+dz*rz)>=0?1:-1,dd=e.r+h.d.radius+0.7;return [e.pos.x+rx*side*dd,e.pos.z+rz*side*dd];}
  const want=e.r+Math.min(1.3,h.d.range*0.6);return [e.pos.x+dx/d*want,e.pos.z+dz/d*want];}
// шары, летящие в героя: отбить в последний миг, только щитом или проспать — по CMP.skill (и в бою, и на шагах маршрута у боссов)
function cmpBolts(h,T){
  for(const b of W.bolts){if(b.tgt!==h||b.refl)continue;if(b._cm===undefined)b._cm=cmpDice();
    if(b._cm==='parry'){if(b.left===null&&b.eta<Math.min(0.2,T.parry*0.8))cmpTap('guard');if(b.eta<0.6)cmpKey('guard',true);}
    else if(b._cm==='shield'&&b.eta<0.6)cmpKey('guard',true);}}
function cmpFight(h,hh,near,T){
  for(const e of W.enemies)if(e._cm&&e.state!=='wind')e._cm=null;
  cmpBolts(h,T);                                                             // защита — прежде всего
  const w=near.find(e=>e.state==='wind'&&e.tgt===h);
  if(w){const c=w._cm||(w._cm={m:cmpDice(),done:false}),left=w.wdur-w.t;
    if(w.sig==='red'){if(W.abil.roll&&c.m!=='asleep'&&!c.done&&left<0.22){c.done=true;cmpTap('roll');}}
    else if(w.sig!=='blue'){
      if(c.m==='parry'&&!c.done&&left<=T.parry*0.55){c.done=true;cmpTap('guard');}
      if(c.done||c.m==='shield')cmpKey('guard',true);}}
  // кого бить и где стоять
  const open=near.filter(e=>cmpOpen(e,h)),pool=open.length?open:near;let e=null,bd=99;
  for(const x of pool){const d=hd(x.pos,h.pos);if(d<bd){bd=d;e=x;}}
  if(!e)return;
  const dh=hd(e.pos,hh.pos);
  const wait=e.state==='broken'&&e.big&&!(e.finT>0)&&e.t<e.bdur-1.3&&dh<7&&!players[0].downed;   // Богатырский мах — вдвоём: первым ударит человек
  if(!w){const [tx,tz]=cmpPos(e,h);cmpGoto(h,tx,tz,0.3);
    if(h.grounded&&h.blocked&&bd>h.d.range*0.9+e.r+0.4){CMP.bk=(CMP.bk||0)+1;if(CMP.bk>20&&!(CMP.jT>G.time-0.5)){CMP.jT=G.time;cmpTap('jump');}}else CMP.bk=0;}   // упёрся в ступеньку по пути к врагу — перепрыгнуть
  const reach=h.d.range*0.9+e.r,can=!w&&bd<=reach&&h.atkCd<=0&&h.rollT<=0&&!h.hang&&!h.knockT;
  if(can&&((open.includes(e)&&!wait)||(e.finT>0&&e.finBy!==1))){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);cmpTap('attack');}}
// ---- маршрут уровня: что бот делает на пути живого игрока вместо «идти за человеком» ----
// CMP.route(уровень, [{id, done(), run(h,hh,dt)}…]): шаги по порядку; текущий — первый, у которого done() ложно (выполненный шаг запоминается).
// run ведёт active(1) стиком и тапами за кадр; пока шаг не выполнен, «ведомый» не включается. Шаг может ждать человека (run ничего не жмёт)
// или вернуть 'follow' — пока делать нечего (ролик, бой не у него, не его этап), бот идёт за человеком.
CMP.routes={};CMP.route=(lv,steps)=>{CMP.routes[lv]=steps.map(s=>({fin:false,...s}));};
CMP.step=()=>{const r=CMP.routes[W.levelId];if(!r)return null;if(CMP.rw!==W){CMP.rw=W;CMP.wp=null;for(const s of r)s.fin=false;}   // новый заход в уровень — маршрут заново
  for(const s of r){if(s.fin)continue;if(s.done()){s.fin=true;continue;}return s;}return null;};
// взять героя kind (смена героя Игрока 2 раз в 0,6 с); true — он уже ведомый нами
function cmpWant(kind){if(active(1).kind===kind)return true;if(!(CMP.swapT>G.time-0.6)){CMP.swapT=G.time;cmpTap('swap');}return false;}
// позвать второго героя за собой (раз в 0,6 с, пока не идёт)
function cmpCall(){const o=other(1);if(!o.following&&!o.cling&&!(CMP.callT>G.time-0.6)){CMP.callT=G.time;cmpTap('call');}}
// пройти по точкам [[x,z]…] (массив — константа модуля: по нему бот помнит, на какой точке): true — дошёл до последней; другой герой начинает путь заново
function cmpPath(h,pts,stop,adv){if(!CMP.wp||CMP.wp.key!==pts||CMP.wp.kind!==h.kind)CMP.wp={key:pts,kind:h.kind,i:0};const w=CMP.wp;
  while(w.i<pts.length-1&&Math.hypot(pts[w.i][0]-h.pos.x,pts[w.i][1]-h.pos.z)<(adv||0.9))w.i++;   // adv — допуск промежуточной точки (узкий мост — меньше)
  const last=w.i===pts.length-1,s=last?(stop||0.35):0.5;return cmpGoto(h,pts[w.i][0],pts[w.i][1],s)<=s&&last;}
// ход бота за кадр: решает, чем занят, и жмёт клавиши Игрока 2 — до шага мира
function cmpThink(dt){cmpFree();
  const p=players[1],hp=players[0],h=active(1),hh=active(0),o=other(1);CMP.mode='idle';CMP.tick++;
  if(p.path!==hp.path)p.path=hp.path;                    // сложность — одна на двоих, как в одиночном режиме
  if(G.cine){const c=G.cine;if(c.skippable&&c.t>0.8&&btn(0,'jump'))cmpKey('jump',true);return;}   // ролик: держит прыжок вместе с человеком
  if(G.trans)return;
  const cu=!!(W.custom||W.soloMirror),rt=!!CMP.routes[W.levelId];
  if(G.ui||(cu&&!rt)){CMP.mode='mirror';cmpMirror();return;}           // окна и особые уровни (гусли, раннер): повторяет за человеком
  if(cu){const rs=CMP.step();if(rs&&rs.run(h,hh,dt)!=='follow'){CMP.mode='route:'+rs.id;return;}CMP.mode='mirror';cmpMirror();return;}   // …если у особого уровня нет своего маршрута или шаг уступает
  if(p.downed){CMP.mode='down';CMP.downT+=dt;if(CMP.downT>0.9&&o&&!o._down&&!o.cling)cmpTap('swap');return;}   // рассыпался клубком — берёт второго героя
  CMP.downT=0;
  if(h.cling||h.hang)return;
  // прилипала (2-2): на себе — два кувырка подряд; на друге — подойти и ударить
  if(h.prilip){CMP.mode='shake';h.following=false;if(!(CMP.rollT>G.time-0.45)){CMP.rollT=G.time;cmpTap('roll');}return;}
  if(hh.prilip&&hh.prilip.latched===hh&&!hh.cling){CMP.mode='unlatch';h.following=false;const d=hd(h.pos,hh.pos);
    if(d>1.5){cmpGoto(h,hh.pos.x,hh.pos.z,1.0);return;}
    h.face=Math.atan2(hh.pos.x-h.pos.x,hh.pos.z-h.pos.z);if(!(CMP.hitT>G.time-0.5)){CMP.hitT=G.time;cmpTap('attack');}return;}
  const T=TIMING[p.path]||TIMING.mid;
  const rs=CMP.step();                                                       // шаг маршрута с first:true идёт раньше общего боя (забег по мосту-руке, невидимый враг-носитель)
  if(rs&&rs.first){h.following=false;if(rs.run(h,hh,dt)!=='follow'){CMP.mode='route:'+rs.id;return;}}
  const ig=CMP.ig||(CMP.ig=new Map());
  const near=W.enemies.filter(e=>cmpAlive(e)&&Math.abs(e.pos.y-h.pos.y)<2.6&&(e.tgt===h||hd(e.pos,h.pos)<8||(hd(e.pos,hh.pos)<8&&hd(e.pos,h.pos)<14))&&!(ig.get(e)>G.time&&e.tgt!==h&&e.state==='idle'));
  if(near.length){CMP.mode='fight';h.following=false;if(o&&!o.following&&!o.cling&&hd(o.pos,h.pos)>22)cmpCall();cmpFight(h,hh,near,T);   // второй герой далеко отстал — позвать
    // упёрся по дороге к врагу (изгородь, стена): три секунды на месте вдали от него — этого (спокойного) врага не трогает 15 с, идёт за человеком
    const fs=CMP.fs;if(!fs||Math.hypot(h.pos.x-fs.x,h.pos.z-fs.z)>0.4)CMP.fs={x:h.pos.x,z:h.pos.z,t:G.time};
    else if(G.time-fs.t>3){CMP.fs=null;let e=null,bd=99;for(const x of near){const d=hd(x.pos,h.pos);if(d<bd){bd=d;e=x;}}if(e&&e.state==='idle'&&e.tgt!==h&&bd>h.d.range*0.9+e.r+0.3)ig.set(e,G.time+15);}
    return;}
  if(hp.downed&&!hh.cling){CMP.mode='revive';h.following=false;cmpGoto(h,hh.pos.x,hh.pos.z,0.7);return;}   // друга надо подшить: постоять рядом секунду
  if(rs&&!rs.first){h.following=false;if(rs.run(h,hh,dt)!=='follow'){CMP.mode='route:'+rs.id;return;}}   // у уровня есть маршрут: ведёт он; шаг, которому делать нечего, возвращает 'follow'
  CMP.mode='follow';}
// шаг мира: сначала ход бота, потом — всё остальное
{const _step=step;step=function(dt){if(CMP.live()&&G.state==='play')cmpThink(dt);_step(dt);};}
// следование — штатный «ведомый» одиночного режима: на время вызова герой Игрока 2 считается «не тем, кем управляют»
{const _up=updatePlayer;updatePlayer=function(pi,dt){
  if(pi===1&&CMP.mode==='follow'&&CMP.live()){const h=active(1),o=other(1),s=G.solo,sp=G.soloPi;h.following=true;if(o&&!o._down&&!o.cling)o.following=true;
    G.solo=true;G.soloPi=0;try{_up(pi,dt);}finally{G.solo=s;G.soloPi=sp;}return;}
  _up(pi,dt);};}
// включить / выключить; «Режим» в меню — вдвоём → один → с напарником
CMP.set=function(on){on=!!on;if(on===CMP.on)return;CMP.on=on;cmpFree();CMP.mode='idle';CMP.downT=0;
  if(on){if(G.solo)setSolo(false);PADS.swap=false;G.soloPi=0;players[1].path=players[0].path;}
  else for(const q of players[1].heroes)q.following=false;};
CMP.index=()=>G.solo?1:CMP.on?2:0;
CMP.cycle=function(d){const n=(CMP.index()+(d<0?2:1))%3;
  if(n===1){CMP.set(false);setSolo(true);}else{if(n===0)CMP.set(false);setSolo(false);if(n===2)CMP.set(true);}};
CMP.label=()=>['вдвоём','один','с напарником'][CMP.index()];
{const _ss=setSolo;setSolo=function(on){if(on&&CMP.on)CMP.set(false);_ss(on);};}
// стрелки и M K L , . / ; — вторая половина клавиатуры Игрока 1 (место Игрока 2 занято ботом)
addEventListener('keydown',e=>{const m=CMP_MAP[e.code];if(!m||!e.isTrusted||!CMP.live()||G.state!=='play')return;down.delete(e.code);pressed.delete(e.code);down.add(m);if(!e.repeat)pressed.add(m);});
addEventListener('keyup',e=>{const m=CMP_MAP[e.code];if(m&&e.isTrusted&&CMP.on)down.delete(m);});
FIN.co=CMP;
