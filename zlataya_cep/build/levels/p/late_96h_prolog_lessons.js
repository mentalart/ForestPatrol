/* ============================== РЕЛИЗ final06 · ПРОЛОГ: КОРОТКИЕ РОЛИКИ-УРОКИ (прыжок, смена героя, «Ко мне!», бой с мороком) ============================== */
// Подсказки по умолчанию спрятаны (late_79_hints.js), и текст обучения пролога («Смени героя…», «Позови…», «Солнышко — щит…») многие не видят;
// «Ко мне!» не объяснялся вовсе. Теперь четыре коротких ролика (def.kino, правила — docs/40_kino_pravila.md), объясняют сами герои и Звенышко:
//  1) «Прыжок» (≈ 12 с) — первый герой подошёл к трещине: Звенышко скачет к краю и перелетает по дуге в кольцо; Прошка: колокольчик вернёт;
//  2) «Двое героев» (≈ 14 с) — все люди перепрыгнули трещину, развилка: Пелагея объясняет смену, Потап убегает, Прошка «А я стою и жду?»;
//  3) «Ко мне!» (≈ 11 с) — Прошка скинул лесенку (или Пелагея у засохшего корня, а Йоша далеко): зовёт, позванный САМ бежит к нему
//     (по лесенке наверх); в конце ролика он и правда рядом и идёт следом (как после doCall). Играет один раз: второму пути — только карточка;
//  4) «Бой с мороком» (≈ 20 с) — начало поляны, до мороков игроков: показательный морок, солнышко → щит Потапа (отбил) → угольки гаснут →
//     удары Прошки → ПРОБОЙ → добивание; мороки игроков появляются в конце ролика (FIN.proFight, rep_30_prolog.py).
// После ролика — карточка урока (#finTut, шаблон FIN.lesson) на 7 с: значок, фраза, кнопки игроков; видна и при «Подсказки: выкл», читается вслух
// (записи r0997…r1002, голос Сказительницы). Ролики идут при каждом заходе в пролог, пропуск — как у всех роликов. Позиции героев после ролика —
// прежние (ролик ставит их сам и возвращает), кроме ролика 3. Повтор — «Показать урок ещё раз» в паузе (FIN.lesson.regLevel), последний урок.
// Боты (G.manual) уроков не видят, пока не включат G.flags.proLessons (бот tfin_prolessons).
const PLES={W:null,ctx:null,seen:{},last:0,ladT:-1,other3:false,side3:-1,card:null,cardT:0,runs:0,t:0,fix:null,log:[]};FIN.proLes=PLES;
const plesOn=()=>!G.manual||!!(G.flags&&G.flags.proLessons);
const plesHumans=()=>G.solo?[G.soloPi]:(FIN.co&&FIN.co.on)?[0]:[0,1];
const plesBotP2=()=>!G.solo&&!!(FIN.co&&FIN.co.on);
const plesFree=()=>!G.cine&&!G.trans&&!G.ui&&G.state==='play'&&!HEROES.some(h=>h.cling||h.hang)&&!players.some(p=>p.downed);
// ---------- герои: запомнить и вернуть; поставить; пробежать по ломаной ----------
function plesSave(){return HEROES.map(h=>({h,p:h.pos.clone(),f:h.face,fo:h.following}));}
function plesBack(sv,keep){for(const o of sv){if(keep&&keep.includes(o.h))continue;o.h.pos.copy(o.p);o.h.vel.set(0,0,0);o.h.face=o.f;o.h.following=o.fo;o.h.guard=false;o.h.grounded=true;o.h.lastGroundY=o.p.y;}}
function plesPut(h,x,z,y,at){placeOnGround(h,x,z,y||0);h.following=false;h.guard=false;if(at)KC.face(h,at);}
function plesPath(pts){const seg=[];let L=0;for(let i=1;i<pts.length;i++){const l=pts[i].distanceTo(pts[i-1]);seg.push(l);L+=l;}
  return u=>{let d=clamp(u,0,1)*L;for(let i=0;i<seg.length;i++){if(d<=seg[i]||i===seg.length-1){const k=seg[i]?Math.min(1,d/seg[i]):1;return {p:pts[i].clone().lerp(pts[i+1],k),dir:pts[i+1].clone().sub(pts[i]),L};}d-=seg[i];}};}
// бег по пути: позиция, взгляд по ходу, скорость — для шагов (late_83 heroLife берёт её из vel)
function plesRun(h,path,t,t0,t1){const u=clamp((t-t0)/(t1-t0),0,1),e=CINE.E.inOutSine(u),r=path(e);h.pos.copy(r.p);h.grounded=true;
  if(u>0&&u<1){const sp=r.L/(t1-t0)*Math.PI/2*Math.sin(Math.PI*u),d=r.dir.clone().setY(0);if(d.lengthSq()>1e-6){d.normalize();h.face=Math.atan2(d.x,d.z);h.vel.set(d.x*sp,0,d.z*sp);}}
  else h.vel.set(0,0,0);return u;}
const plesHold=h=>{h.vel.set(0,0,0);h.grounded=true;};
// ---------- карточка урока (#finTut, FIN.lesson.show) ----------
const PLES_ICO={
  jump:'<svg viewBox="0 0 64 64"><path d="M8 50 Q32 2 56 50" fill="none" stroke="#fff2b0" stroke-width="5" stroke-dasharray="7 6" stroke-linecap="round"/><path d="M48 40 L56 50 L44 52" fill="none" stroke="#fff2b0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="56" cy="56" rx="7" ry="3" fill="none" stroke="#ffd76a" stroke-width="3"/><rect x="2" y="52" width="16" height="10" rx="2" fill="#8a5a32"/></svg>',
  swap:'<svg viewBox="0 0 64 64"><circle cx="20" cy="36" r="12" fill="#e0784a" stroke="#6a2a10" stroke-width="3"/><circle cx="44" cy="36" r="12" fill="#a0784a" stroke="#4a3010" stroke-width="3"/><path d="M14 16 Q32 2 50 16" fill="none" stroke="#fff2b0" stroke-width="4" stroke-linecap="round"/><path d="M44 10 L50 16 L42 19" fill="none" stroke="#fff2b0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  call:'<svg viewBox="0 0 64 64"><path d="M8 26 L22 22 L40 10 V54 L22 42 L8 38 Z" fill="#ffd76a" stroke="#7a4a10" stroke-width="3" stroke-linejoin="round"/><path d="M46 22 Q52 32 46 42 M52 16 Q62 32 52 48" fill="none" stroke="#fff2b0" stroke-width="4" stroke-linecap="round"/></svg>',
  fight:'<svg viewBox="0 0 64 64"><circle cx="20" cy="16" r="8" fill="#ffd23a"/><g stroke="#ffd23a" stroke-width="3" stroke-linecap="round"><path d="M20 3V0M20 32v-3M7 16H4M36 16h-3"/></g><path d="M12 30 L28 35 V46 C28 54 20 60 12 62 C4 60 -4 54 -4 46" fill="none"/><path d="M6 32 L22 36 V46 C22 53 15 58 6 60 C-3 58 -10 53 -10 46 V36Z" transform="translate(10 0)" fill="#ffd76a" stroke="#7a4a10" stroke-width="3"/><path d="M42 30 L56 44 M56 30 L42 44" stroke="#fff2b0" stroke-width="6" stroke-linecap="round"/><circle cx="49" cy="52" r="6" fill="#3a3a3a" stroke="#ff7a1a" stroke-width="2"/></svg>'};
const plesKeys=(a,label)=>plesHumans().map(pi=>({pi,a,label}));
const PLES_CARDS={
  1:()=>({tag:'Урок',title:'Прыжок',icon:'jump',text:'Подбеги к самому краю и прыгай.<br>Кольцо покажет, куда приземлиться.',keys:plesKeys('jump')}),
  2:()=>({tag:'Урок',title:'Смена героя',icon:'swap',text:G.solo?'Смена — по кругу: Прошка, Потап, Пелагея, Йоша.<br>Оставленный стоит и ждёт.':'У каждого игрока — два героя.<br>Оставленный стоит и ждёт.',keys:plesKeys('swap')}),
  3:()=>({tag:'Урок',title:'«Ко мне!»',icon:'call',text:G.solo?'Все трое сами прибегут к тебе —<br>даже издалека.':'Оставленный друг сам прибежит к тебе —<br>даже издалека.',keys:plesKeys('call')}),
  4:()=>({tag:'Урок',title:'Бой с мороком',icon:'fight',text:'<i class="sg y"></i> Солнышко — закройся щитом.<br>Отбил — бей! «ПРОБОЙ!» — добей!',keys:[...plesKeys('guard','щит'),...plesKeys('attack','удар')]})};
function plesCard(n){const L=FIN.lesson;if(!L||L.on)return;Object.assign(L.icons,{pJump:PLES_ICO.jump,pSwap:PLES_ICO.swap,pCall:PLES_ICO.call,pFight:PLES_ICO.fight});
  const c=PLES_CARDS[n]();c.icon={jump:'pJump',swap:'pSwap',call:'pCall',fight:'pFight'}[c.icon];L.show(c,{},null);const sk=L.card&&L.card.querySelector('.ft-skip');if(sk)sk.remove();
  PLES.card=n;PLES.cardT=n===2&&G.solo?10:7.5;PLES.log.push('card'+n);}
function plesCardTick(dt){if(!PLES.card)return;const L=FIN.lesson;
  if(!W||W!==PLES.W||W.levelId!=='p'||G.cine||L.on){PLES.card=null;if(!L.on)L.show(null);return;}
  if(G.ui||G.state!=='play')return;PLES.cardT-=dt||0;if(PLES.cardT<=0){PLES.card=null;L.show(null);}}
{const _st=step;step=function(dt){_st(dt);try{plesCardTick(dt);}catch(e){console.error('proLes card',e);}};}   // ход игры (и ZC.tick ботов) — таймер карточки
// ---------- общий запуск ролика урока: Звенышко — в руки ролика, герои — на места; в конце — назад, карточка ----------
function plesPlay(n,rp,def,o){const Z=W.zven,zm=Z.mode,sv=o.sv;PLES.seen[n]=true;PLES.last=n;PLES.runs++;PLES.log.push((rp?'again':'les')+n);
  HEROES.forEach(h=>{h.following=false;h.guard=false;});Z.mode='script';Z.vis=true;
  const pose=def.pose;PLES.fix=pose?()=>{try{pose(PLES.t);}catch(e){console.error('proLes pose',e);PLES.fix=null;}}:null;
  const tick=def.tick;def.tick=(t,dt)=>{PLES.t=t;if(pose)pose(t,dt);if(tick)tick(t,dt);};
  const end=def.end;def.end=()=>{PLES.fix=null;HEROES.forEach(h=>{h.guard=false;});plesBack(sv,rp?null:o&&o.keep);Z.mode=zm;if(end)end(rp);snapCams();plesCard(n);};
  def.kino=true;PLES.t=0;play(def);}
// ---------- 1. Прыжок ----------
function plesJump(rp){const c=PLES.ctx,H=HERO,Z=W.zven,C0=c.CRK0,C1=c.CRK1,sv=plesSave();
  [['proshka',-1.9],['potap',-0.65],['pelageya',0.65],['yosha',1.9]].forEach(([k,x])=>{plesPut(H[k],x,C0+2.9,0);H[k].face=Math.PI;});
  const a=new V3(0,1.5,C0+2.0),b=new V3(0,0.55,C0+0.25),c2=new V3(0,0.55,C1-0.9);
  const zp=t=>{if(t<2.3)return a.clone().add(new V3(Math.sin(t*2)*0.3,Math.sin(t*3)*0.12,0));
    if(t<3.4){const u=CINE.E.inOutSine((t-2.3)/1.1),p=a.clone().lerp(b,u);p.y+=Math.abs(Math.sin(u*Math.PI*2))*0.35;return p;}     // два скока к краю
    if(t<4.9){const e=CINE.E.inOutSine((t-3.4)/1.5),p=b.clone().lerp(c2,e);p.y+=Math.sin(e*Math.PI)*1.6;return p;}                // по дуге — в кольцо
    if(t<10.6)return c2.clone().add(new V3(0,Math.abs(Math.sin((t-4.9)*5))*0.2*Math.max(0,1-(t-4.9)),0));
    return c2.clone().lerp(new V3(0,1.6,C0+1.4),CINE.E.inOutSine(clamp((t-10.6)/1.4,0,1)));};                                   // и назад — к героям
  plesPlay(1,rp,{dur:12.2,fov:46,mood:['#ffd08a',0.08],
    shots:[KS(0,[3.2,4.8,C0+9.5],[0,0.2,C1-0.6],{p2:[2.0,3.4,C0+7.0],l2:[0,0.3,C1-0.8],dur:2.2,move:'none'}),   // общий: герои у трещины, за ней кольцо
      KS(2.2,[4.3,1.5,C0+0.4],[0,0.8,C0+0.4],{trk:KC.look(()=>Z.pos,0.85),move:'truck',amp:0.6}),                  // средний сбоку: Звенышко скачет и прыгает
      KS(4.9,[1.2,1.0,C1+0.8],[0,0.35,C1-0.9],{move:'push',amp:0.8}),                                                // деталь: приземлилось в кольцо
      KS(7.4,[-1.9,1.2,C0+1.2],[-1.9,0.95,C0+2.9],{trk:KC.fcam(H.proshka,1.7,0.35,0.08,0.12)}),                        // Прошка: колокольчик вернёт
      KS(10.7,[0,2.0,C0-1.6],[0,0.9,C0+2.9],{move:'pull',amp:0.8})],                                                 // все четверо: ура
    says:[[2.3,5.0,'zven','Разбег до края — и прыжок!<br>Кольцо — куда ступить, дружок!'],[7.5,3.2,'proshka','Упадёшь — не беда:<br>колокольчик вернёт сюда!']],
    cues:[[2.4,()=>{KSND.puff(0);KSND.puff(0.5);}],[3.4,()=>SFX.jump()],[3.9,()=>CINE.slowmo(0.45,0.45)],[3.95,()=>CINE.punch(-2)],
      [4.9,()=>{FX.sparkle(c2.clone(),12,0xfff0a0);SFX.ok();}],[5.1,KC.emo('yosha','hop')],[5.3,KC.emo('potap','surprise')],
      [7.6,KC.emo('proshka','nod')],[10.8,KC.all('cheer',0.1)],[10.9,()=>KSND.yay(0)]],
    pose:t=>{Z.pos.copy(zp(t));Z.vis=true;HEROES.forEach(plesHold);if(t>=7.3&&t<10.7)HERO.proshka.face=Math.PI;}},{sv});}
// ---------- 2. Двое героев ----------
function plesSwap(rp){const H=HERO,Z=W.zven,cam=new V3(0,1.2,-15),sv=plesSave();
  plesPut(H.proshka,-3.0,-19.3,0,cam);plesPut(H.potap,-4.4,-19.6,0,cam);plesPut(H.pelageya,3.0,-19.3,0,cam);plesPut(H.yosha,4.4,-19.6,0,cam);
  const run=plesPath([new V3(-4.4,0,-19.6),new V3(-6.6,0,-22.4)]);
  plesPlay(2,rp,{dur:13.6,fov:46,mood:['#ffd08a',0.07],
    shots:[KS(0,[0,5.0,-11.0],[0,0.6,-21.0],{p2:[0,4.0,-12.5],l2:[0,0.8,-21.0],dur:1.8,move:'none'}),                 // общий: развилка — уступ слева, овраг справа
      KS(1.8,[3.0,1.0,-17.6],[3.0,0.9,-19.3],{trk:KC.fcam(H.pelageya,1.8,-0.3,0.1,0.12)}),                            // Пелагея объясняет
      KS(5.6,[-2.0,1.8,-16.6],[-4.6,0.8,-20.6],{trk:KC.two(KC.head(H.proshka),KC.head(H.potap),0.7),move:'push',amp:0.5}),   // смена: Потап убегает
      KS(7.4,[-3.0,1.1,-17.6],[-3.0,0.95,-19.3],{trk:KC.fcam(H.proshka,1.6,0.3,0.08,0.12)}),                           // Прошка: «А я?»
      KS(9.8,[-5.4,1.1,-21.3],[-6.6,0.95,-22.4],{trk:KC.fcam(H.potap,1.7,-0.3,0.08,0.1)}),                             // Потап оборачивается
      KS(11.9,[1.6,2.0,-15.8],[3.8,0.8,-19.5],{move:'pull',amp:0.7})],                                                // справа — то же у Пелагеи и Йоши
    says:[[2.0,3.8,'pelageya','Двое у каждого из нас —<br>меняй, кто нужен сейчас!'],[7.5,2.2,'proshka','Эй! А я стою и жду?'],[9.9,2.0,'potap','Постой чуток — я позову!']],
    cues:[[0.4,()=>KSND.steps(0,3,0.3)],[2.1,KC.emo('pelageya','nod')],[5.7,()=>{ringFx(H.potap.pos,PCOL[0],1.6);SFX.swap();}],[5.75,KC.emo('potap','hop')],
      [6.0,()=>KSND.steps(0,5,0.26)],[7.6,KC.emo('proshka','droop')],[8.6,KC.emo('proshka','tilt')],[10.0,KC.emo('potap','nod')],
      [12.0,()=>{ringFx(H.yosha.pos,PCOL[1],1.6);SFX.swap();}],[12.05,KC.emo('yosha','hop')],[12.3,KC.emo('pelageya','tilt')]],
    pose:t=>{const P=H.proshka,T=H.potap;HEROES.forEach(plesHold);Z.pos.set(Math.sin(G.time*1.7)*0.6,2.4+Math.sin(G.time*2.3)*0.15,-20.6);Z.vis=true;
      if(t<11.9)KC.face(H.pelageya,cam);if(t<5.9){KC.face(P,cam);KC.face(T,cam);}
      plesRun(T,run,t,5.95,7.3);if(t>=7.3)KC.face(T,P.pos);
      if(t>=5.9&&t<7.4)KC.face(P,T.pos);else if(t>=7.4&&t<9.8)P.face=Math.atan2(0.4,1);else if(t>=9.8)KC.face(P,T.pos);
      if(t>=11.9)KC.face(H.yosha,new V3(5.5,0,-24));}},{sv});}
// ---------- 3. «Ко мне!» — Прошка зовёт Потапа с уступа (или Пелагея — Йошу к засохшему корню) ----------
function plesCall(rp,side){const H=HERO,Z=W.zven,solo=G.solo,P2=side===1,sv=plesSave();
  const caller=P2?H.pelageya:H.proshka,mate=P2?H.yosha:H.potap,pi=P2?1:0;
  let top,path,shots,fcamM,folOff;
  if(!P2){const onLedge=caller.pos.y>1.5&&caller.pos.x<-1.6&&caller.pos.z<-25.2&&caller.pos.z>-35.6;
    if(!onLedge||rp)plesPut(caller,-6.9,-26.8,1.92);plesPut(mate,-4.6,-20.2,0);KC.face(caller,mate.pos);KC.face(mate,caller.pos);
    top=new V3(-7.75,1.92,-25.15);const d=caller.pos.clone().sub(top).setY(0),dl=d.length(),fin=dl>1.5?top.clone().add(d.multiplyScalar((dl-1.1)/dl)):top.clone();fin.y=caller.pos.y;
    path=plesPath([mate.pos.clone(),new V3(-7.75,0,-20.6),top,fin]);
    shots=[KS(0,[-0.8,5.6,-16.8],[-6.6,1.0,-24.0],{p2:[-1.4,5.0,-17.6],l2:[-6.8,1.2,-24.6],dur:1.8,move:'none'})];folOff=new V3(3.0,1.7,2.2);}
  else{const nearRoot=hd(caller.pos,{x:5.6,z:-40.0})<4.6&&caller.pos.z<-36.2;if(!nearRoot||rp)plesPut(caller,5.0,-39.0,0);plesPut(mate,6.6,-31.2,0);
    KC.face(caller,mate.pos);KC.face(mate,caller.pos);const d=mate.pos.clone().sub(caller.pos).setY(0).normalize(),fin=caller.pos.clone().add(d.multiplyScalar(1.1));
    path=plesPath([mate.pos.clone(),new V3(6.2,0,-36.5),fin]);
    shots=[KS(0,[1.8,6.0,-29.6],[5.6,0.8,-38.6],{p2:[2.2,5.2,-30.6],l2:[5.6,0.9,-38.8],dur:1.8,move:'none'})];folOff=new V3(-2.6,1.7,-2.8);}
  const cp=caller.pos.clone(),mp=mate.pos.clone();
  shots.push(KS(1.8,[cp.x,cp.y+1.0,cp.z+1.6],[cp.x,cp.y+0.9,cp.z],{trk:KC.fcam(caller,1.7,0.25,0.02,0.15)}),        // крупно: зовёт
    KS(3.6,[mp.x,mp.y+1.0,mp.z-1.6],[mp.x,mp.y+0.9,mp.z],{trk:KC.fcam(mate,P2?1.6:1.9,-0.25,0.1,0.1)}),                      // позванный: уши торчком
    KS(5.0,[mp.x+folOff.x,mp.y+folOff.y,mp.z+folOff.z],[mp.x,mp.y+0.8,mp.z],{trk:KC.follow(()=>mate.pos,folOff,new V3(0,0.8,0),0.9),move:'none'}),   // бежит сам
    KS(9.4,[cp.x+2.6,cp.y+1.5,cp.z+2.6],[cp.x,cp.y+0.9,cp.z],{trk:KC.two(KC.head(caller),KC.head(mate),0.8),move:'push',amp:0.4}));   // вместе
  const zl=solo?'Крикни «Ко мне!» —<br>все трое прибегут!':'Крикни «Ко мне!» —<br>друг прибежит, хоть где стоит!';
  plesPlay(3,rp,{dur:11.3,fov:46,mood:['#ffd08a',0.08],shots,
    says:[[2.0,1.7,P2?'pelageya':'proshka',P2?'Йоша, ко мне!':'Потап, ко мне!'],[3.8,1.2,P2?'yosha':'potap','Бегу-бегу!'],[5.2,4.2,'zven',zl]],
    cues:[[1.9,KC.emo(caller.kind,'cheer')],[2.05,()=>{ringFx(caller.pos,PCOL[pi],2);SFX.call();floatText(caller.pos.clone().add(new V3(0,caller.d.height+0.7,0)),solo?'Все ко мне, ко мне!':'Ко мне!',PCSS[pi]);CINE.punch(-2);}],
      [3.65,KC.emo(mate.kind,'surprise')],[5.1,()=>KSND.steps(0,10,0.28)],[9.5,KC.all('joy',0.12)],[9.6,()=>KSND.yay(0)]],
    pose:t=>{HEROES.forEach(h=>{if(h!==mate)plesHold(h);});
      if(t<5.1){plesHold(mate);KC.face(mate,caller.pos);}else plesRun(mate,path,t,5.1,8.7);
      if(t>=8.7)KC.face(mate,caller.pos);KC.face(caller,mate.pos);
      const zt=t<5.1?caller.pos.clone().add(new V3(0.7,caller.d.height+0.9,0.4)):mate.pos.clone().add(new V3(0.8,1.9,P2?-1.2:-1.0));
      Z.pos.lerp(zt.add(new V3(0,Math.sin(G.time*3)*0.1,0)),0.12);Z.vis=true;},
    end:r=>{if(r)return;if(active(pi)!==mate){mate.following=true;mate.stuck=0;}else caller.following=false;}},{sv,keep:rp?null:[mate,caller]});
  if(!rp)PLES.side3=side;}
// ---------- 4. Бой с мороком: показательный морок (в W.enemies его нет — им правит ролик) ----------
function plesFight(rp,spawn){const H=HERO,Z=W.zven,P=H.proshka,T=H.potap,M0=new V3(0,0,-88.4),sv=plesSave();
  const e=makeFoe('morok',M0.x,M0.z,{harmless:true,tutorial:true});{const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);}
  plesPut(T,-0.7,-86.4,0,M0);plesPut(P,1.5,-86.2,0,M0);plesPut(H.pelageya,-3.0,-84.2,0,M0);plesPut(H.yosha,3.0,-83.9,0,M0);
  const camP=new V3(-5.2,1.9,-83.0),step=plesPath([new V3(1.5,0,-86.2),new V3(0.6,0,-87.4)]);
  const mPose=t=>{const g=e.g,S=e.S,b=e.body;if(!g.parent)return;e.face=Math.atan2(T.pos.x-e.pos.x,T.pos.z-e.pos.z);g.rotation.y=e.face;
    g.position.y=t<0.3?-1.5:t<1.1?lerp(-1.5,0,smooth((t-0.3)/0.8)):0;g.position.z=lerp(M0.z,M0.z-0.5,smooth(clamp((t-7.05)/0.3,0,1)));
    const w=t>=2.6&&t<7.0,k=clamp((t-2.6)/4.4,0,1);S.sig.visible=w;S.sy.visible=w;S.sr.visible=S.sb.visible=false;S.sig.rotation.y=-e.face;
    if(w){S.tRing.visible=true;S.tRing.scale.setScalar(lerp(1.9,0.44,k));S.sig.scale.setScalar(0.8+0.45*k);S.halo.material.color.setHex(COL.yellow);S.halo.scale.setScalar(1+0.25*Math.sin(G.time*30));}
    const ec=w?COL.yellow:0xfff3a0;e.eyeMat.color.setHex(ec);e.eyeMat.emissive.setHex(ec);
    const n=t<7.0?3:t<11.8?2:t<12.4?1:0;e.embersM.forEach((m,i)=>{const on=i<n;m.m.visible=i<3;m.mat.color.setHex(on?0xff7a1a:0x3a3a3a);m.mat.emissive.setHex(on?0xff5a00:0);m.mat.emissiveIntensity=on?1+0.3*Math.sin(G.time*8+i):0;});
    const brk=t>=12.5,stag=(t>=7.05&&t<8.6)||(t>=11.8&&t<12.1)||(t>=12.4&&t<12.5);
    b.position.set(0,brk?-0.12:Math.abs(Math.sin(G.time*2.2))*0.06,t>=6.9&&t<7.15?Math.sin((t-6.9)/0.25*Math.PI)*0.7:0);
    b.rotation.x=brk?0.5:stag?-0.45:w?-0.25-0.15*k:0;b.rotation.z=Math.sin(G.time*1.6)*0.1;b.scale.set(1,brk?0.75:1,1);
    e.br.visible=brk&&t<16.85;if(e.br.visible)e.br.scale.setScalar(1+Math.sin(G.time*8)*0.08);e.spin.visible=brk&&t<16.85;if(e.spin.visible)e.spin.rotation.y=t*5;
    if(t>=16.85){const u=(t-16.85)/0.6;g.scale.setScalar(Math.max(0.01,1-u));e.inner.rotation.y=(t-16.85)*14;if(u>=1)g.visible=false;}};
  const hitFx=(lbl)=>{const c=e.pos.clone().add(new V3(0,1,0));burst(c,0xffffff,8,3);SFX.ember();floatText(e.pos.clone().add(new V3(0,e.L.top+1.1,0)),lbl,'#ffe36b');};
  plesPlay(4,rp,{dur:20.4,fov:46,mood:['#c89aff',0.1],
    shots:[KS(0,[0,5.5,-77.5],[0,0.8,-87.0],{p2:[0,4.2,-79.0],l2:[0,0.9,-87.2],dur:2.0,move:'none'}),                // общий: поляна, морок вылезает
      KS(2.0,[camP.x,camP.y,camP.z],[-2.0,0.9,-85.6],{move:'push',amp:0.5}),                                         // Пелагея, за ней — солнышко над мороком
      KS(6.4,[3.4,1.3,-86.0],[-0.3,0.8,-87.6],{move:'truck',amp:0.5}),                                                // сбоку: удар — щит — «Отбил!»
      KS(8.6,[0.6,1.1,-86.5],[-0.7,0.95,-86.4],{trk:KC.fcam(T,1.9,0.35,0.1,0.12)}),                                  // Потап: угольки потухли
      KS(11.2,[3.0,1.6,-85.0],[0.3,0.8,-88.6],{trk:KC.look(()=>e.pos.clone().add(new V3(0,0.8,0)),0.5),move:'push',amp:0.4}),   // удары Прошки — ПРОБОЙ
      KS(13.4,[0.6,1.1,-86.0],[0.6,0.95,-87.4],{trk:KC.fcam(P,1.6,-0.3,0.08,0.12)}),                                   // Прошка: ещё удар!
      KS(16.6,[1.9,1.2,-86.4],[0.1,0.7,-88.6],{move:'push',amp:0.9}),                                                 // деталь: добивание, клубок распутан
      KS(17.8,[2.2,1.1,-85.2],[3.0,0.9,-83.9],{trk:KC.fcam(H.yosha,1.5,0.2,0.08,0.1)})],                              // Йоша: теперь вы сами
    says:[[2.2,4.0,'pelageya','Солнышко над ним горит —<br>щит подними, удар отбит!'],[8.7,2.5,'potap','Угольки потухли — бей смелей!'],
      [13.5,3.0,'proshka','Пробой! Ещё удар — и нет клубка!'],[17.9,2.3,'yosha','Теперь вы сами — посмелей!']],
    events:[{t:20.0,fn:()=>{if(!rp&&spawn)spawn();}}],
    cues:[[0.3,()=>{SFX.gate();KSND.puff(0.2);}],[1.0,KC.all('surprise',0.1)],[2.6,()=>SFX.yellow()],
      [7.0,()=>{SFX.parry();burst(e.pos.clone().add(new V3(0,1,0)).lerp(T.pos,0.5),COL.yellow,12,5);floatText(T.pos.clone().add(new V3(0,T.d.height+0.6,0)),'Отбил!','#ffe36b');
        CINE.hitstop(3);CINE.slowmo(0.4,0.6);CINE.punch(-2);hitFx('Отбив!');}],[8.8,KC.emo('potap','nod')],
      [11.8,()=>{P.atkT=0.28;SFX.swish();hitFx('Удар!');}],[12.4,()=>{P.atkT=0.28;SFX.swish();hitFx('Удар!');}],
      [12.5,()=>{SFX.brk();floatText(e.pos.clone().add(new V3(0,2.3,0)),'ПРОБОЙ!','#fff2b0');CINE.punch(-3);}],[13.6,KC.emo('proshka','pride')],
      [16.8,()=>{P.atkT=0.28;SFX.finisher();ringFx(e.pos,COL.gold,3.5);floatText(e.pos.clone().add(new V3(0,2.4,0)),'Добивающий мах!','#ffd76a');CINE.hitstop(4);CINE.slowmo(0.35,0.5);}],
      [16.9,()=>{SFX.unravel();const c=e.pos.clone().add(new V3(0,0.7,0));burst(c,0x9a4482,18,6);burst(c,COL.gold,10,5);FX.confetti(c,24);}],[17.3,KC.all('cheer',0.1)],[17.4,()=>KSND.yay(0)]],
    pose:t=>{HEROES.forEach(plesHold);mPose(t);Z.pos.set(-1.6+Math.sin(G.time*1.5)*0.5,3.0+Math.sin(G.time*2.1)*0.15,-84.6);Z.vis=true;
      if(t<2.0){KC.face(H.pelageya,M0);}else if(t<6.4)KC.face(H.pelageya,camP);else KC.face(H.pelageya,M0);
      T.guard=t>=6.5&&t<7.6;if(t<8.6||t>=11.2)KC.face(T,e.pos);else KC.face(T,P.pos);
      if(t<11.2)KC.face(P,e.pos);else{plesRun(P,step,t,11.25,11.65);if(t<13.4||t>=16.6)KC.face(P,e.pos);else P.face=0;}
      KC.face(H.yosha,t<17.8?e.pos:new V3(2.2,0,-85.2));},
    end:()=>{if(e.g.parent)W.group.remove(e.g);}},{sv});
  return true;}
// ---------- уровень: контекст из buildPrologue (rep_30_prolog.py), условия запуска ----------
FIN.proLessons=function(ctx){PLES.W=W;PLES.ctx=ctx;PLES.seen={};PLES.last=0;PLES.ladT=-1;PLES.other3=false;PLES.side3=-1;PLES.card=null;PLES.fix=null;
  const F=ctx.F,JH=ctx.JH,H=HERO;
  W.updates.push(dt=>{if(PLES.W!==W)return;if(G.cine){if(PLES.fix)PLES.fix();return;}
    if(!plesOn()||!plesFree())return;const hum=plesHumans();
    // 1 — первый человек у трещины
    if(!PLES.seen[1]&&F.stage==='chase'&&hum.some(pi=>{const h=active(pi);return h.grounded&&Math.abs(h.pos.x)<2.5&&h.pos.z<ctx.CRK0+3.4&&h.pos.z>ctx.CRK0-0.5;})){plesJump(false);return;}
    // 2 — все люди перепрыгнули, кто-то уже на развилке
    if(!PLES.seen[2]&&F.stage==='chase'&&hum.every(pi=>JH.done[pi])&&hum.some(pi=>active(pi).pos.z<-18.6&&active(pi).pos.y>-0.5)){plesSwap(false);return;}
    // 3 — лесенка упала (Прошка наверху, Потап внизу) или Пелагея у засохшего корня, а Йоша далеко
    if(F.ladder&&PLES.ladT<0)PLES.ladT=G.time;
    const p1=F.ladder&&PLES.ladT>=0&&G.time-PLES.ladT>3.0&&H.potap.pos.y<1&&H.proshka.pos.y>1.5&&hum.includes(0);
    const p2=!plesBotP2()&&!F.rootGrown&&!F.rootGrowing&&hd(H.pelageya.pos,{x:5.6,z:-40.0})<4.6&&H.pelageya.pos.z<-36.2&&H.yosha.pos.z<-28.4&&hd(H.yosha.pos,H.pelageya.pos)>7;
    if(!PLES.seen[3]&&(p1||p2)){plesCall(false,p1?0:1);return;}
    // второй путь дошёл до своего «Ко мне!» — ролик уже был, только карточка
    if(PLES.seen[3]&&!PLES.other3&&((PLES.side3===0&&p2)||(PLES.side3===1&&p1))&&!PLES.card){PLES.other3=true;plesCard(3);}
  });
  FIN.lesson.regLevel('p',()=>{const n=PLES.last;if(n===1)plesJump(true);else if(n===2)plesSwap(true);else if(n===3)plesCall(true,0);else if(n===4)plesFight(true,null);},
    ()=>plesOn()&&PLES.W===W&&PLES.last>0&&plesFree()&&!W.enemies.some(e=>e.alive));};
// поляна: ролик «Бой с мороком» вместо мгновенного появления мороков (вернул false — мороки появятся сразу)
FIN.proFight=function(spawn){if(!W||W.levelId!=='p'||PLES.W!==W||!plesOn()||PLES.seen[4]||G.cine||G.trans)return false;
  if(HEROES.some(h=>h.cling||h.hang)||players.some(p=>p.downed))return false;try{return plesFight(false,spawn);}catch(e){console.error('proLes fight',e);return false;}};
