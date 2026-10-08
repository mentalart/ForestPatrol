/* ============================== РЕЛИЗ final06 · 1-1 «ИЗБУШКА, ПОВЕРНИСЬ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Бот за Игрока 2 (late_73_companion) делает то, что делал бы живой игрок за Пелагею и Йошу: оба героя садятся на пеньки «с лапками» и на «ТРИ» жмут приём;
// после кикиморок носит мусор в кучу у забора и берёт корыто вдвоём с человеком; кидает клубок на грядки и идёт по нити; у лужи кидает нить навстречу
// нити друга; встаёт на лапку калитки и проходит с обоими героями. Бой с кикиморками ведёт общий бой бота. Положения — из proto/levels/1-1.js.
const S11={w:null,v:{},thr:0,stump:{},dv:0,dt:0};
const s11=(k,f)=>{if(S11.w!==W){S11.w=W;S11.v={};S11.thr=0;S11.stump={};S11.dv=0;S11.dt=0;}return S11.v[k]||(S11.v[k]=!!f());};   // «уже было»: запоминается на заход в уровень
const s11F=()=>W.flags,s11Th=(h,pit)=>W.threads.find(t=>t.owner===1&&!t.ret&&!t.string&&t.hero===h&&(t.sz<-55)===!!pit);   // нить героя на грядках (pit=false) или у лужи (true)
// кто из героев Игрока 2 ещё не перешёл z<zEnd: сначала ведомый нами, потом другой
const s11Todo=(zEnd,tag)=>['yosha','pelageya'].filter(k=>!s11(tag+k,()=>HERO[k].pos.z<zEnd&&HERO[k].pos.y>-0.8));
// кинуть клубок с места (раз в 0,8 с) — нить ляжет вперёд
// нить ложится туда, куда смотрит герой: перед броском бот встаёт лицом вперёд (по ходу камеры), как поворачивался бы игрок
const s11Throw=h=>{h.face=Math.atan2(-Math.sin(W.camYaw),-Math.cos(W.camYaw));if(!(S11.thr>G.time-0.8)){S11.thr=G.time;cmpTap('item');}};
// ближайший свободный пенёк (занятый чужим героем не берём); выбранный запоминается, пока его не заняли
function s11Stump(h){const st=W.stumps,k=h.kind;let s=S11.stump[k];
  if(!s||(s.hero&&s.hero!==h))s=S11.stump[k]=st.filter(q=>!q.hero||q.hero===h).sort((a,b)=>hd(a,h.pos)-hd(b,h.pos))[0]||null;return s;}
CMP.route('1-1',[
  // «Избушка, повернись»: все четверо на пеньках, на «ТРИ» — свой приём
  {id:'stumps',done:()=>W.rzt.state==='done',run:(h,hh)=>{const R=W.rzt,o=other(1);
    if(!W.stumps.some(s=>s.hero===h)){const s=s11Stump(h);if(!s)return 'follow';cmpGoto(h,s.x,s.z,0.2);if(h.blocked&&h.grounded)cmpTap('jump');return;}
    if(!W.stumps.some(s=>s.hero===o)){cmpWant(o.kind);return;}                             // второй герой — на свободный пенёк
    if(R.state==='count'&&R.t>=2.12&&R.press[1]===null)cmpTap('skill');}},
  // кикиморки из луж: дерётся общий бой бота, а этот шаг отправляет его к тем, что ещё стоят в стороне (пока они не распутаны, двор не убрать)
  {id:'foes',done:()=>!['hut','turn','yaga','fight'].includes(s11F().stage),run:h=>{if(s11F().stage!=='fight')return 'follow';
    const al=W.enemies.filter(e=>e.alive&&e.state!=='spawn'&&e.state!=='dying'&&(!e.g||e.g.visible!==false)).sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos));
    if(!al.length)return 'follow';cmpGoto(h,al[0].pos.x,al[0].pos.z,3);}},
  // после кикиморок: мусор — в кучу, корыто — вдвоём с человеком
  {id:'clean',done:()=>!!s11F().cleanDone,run:(h,hh)=>{if(s11F().stage!=='clean')return 'follow';const C=W.clean11;
    if(h.trash){cmpGoto(h,C.HEAP.x+1.6,C.HEAP.z,0.4);return;}
    const left=C.TR.filter(t=>t.state==='ground').sort((a,b)=>hd(a.g.position,h.pos)-hd(b.g.position,h.pos));
    if(left.length){cmpGoto(h,left[0].g.position.x,left[0].g.position.z,0.25);return;}
    const B=C.TRB;if(B.state==='ground')cmpGoto(h,B.g.position.x+0.9,B.g.position.z,0.3);       // ждёт человека у корыта
    else if(B.state==='carry')cmpGoto(h,hh.pos.x,hh.pos.z,1.3);}},                              // понесли — идёт рядом с человеком
  // грядки: клубок вперёд — по нити на ту сторону, оба героя по очереди
  // грядки: клубок вперёд — по нити на ту сторону, оба героя по очереди; у каждого своя дорожка (нить прежнего не смотать, пока стоишь на ней)
  {id:'beds',done:()=>s11Todo(-52.3,'bed').length===0,run:h=>{if(s11F().stage!=='yard')return 'follow';
    const td=s11Todo(-52.3,'bed'),k=td.includes(h.kind)?h.kind:td[0];if(!cmpWant(k))return;const th=s11Th(h,false),x=h.kind==='yosha'?5.5:4.2;
    if(!th){if(Math.hypot(h.pos.x-x,h.pos.z+36.6)>0.45){cmpGoto(h,x,-36.6,0.25);return;}s11Throw(h);return;}
    if(th.len<13&&th.grow)return;cmpGoto(h,x,-52.8,0.3);}},
  // звено на голубятне (задача Игрока 2, необязательная): Пелагея взбирается на стог в две ступени и планирует на голубятню, держа прыжок
  {id:'dove',done:()=>{const it=W.items.find(q=>q.kind==='link'&&Math.abs(q.pos.x-9.4)<0.3&&Math.abs(q.pos.z+62.2)<0.3);if(!S11.dt)S11.dt=G.time;return !it||it.taken||G.time-S11.dt>80||HERO.pelageya.pos.z<-64;},
   run:h=>{if(s11F().stage!=='yard')return 'follow';if(!cmpWant('pelageya'))return;
    if(!h.grounded&&S11.dv===3){cmpGoto(h,9.4,-62.4,0.2);cmpKey('jump',true);return;}      // планирует: держит прыжок до самой голубятни
    if(h.grounded)S11.dv=h.pos.y>=2.0?2:h.pos.y>=0.8?1:0;
    if(S11.dv===2){if(Math.hypot(h.pos.x-7.0,h.pos.z+58.2)>0.45)cmpGoto(h,7.0,-58.2,0.25);       // верхняя ступень: к краю и — на голубятню
      else{S11.dv=3;cmpGoto(h,9.4,-62.4,0.2);cmpTap('jump');}return;}
    if(S11.dv===1){if(h.grounded&&h.pos.z>-56.4)cmpGoto(h,6.5,-56.6,0.2);                          // первая ступень: к краю, на вторую — шагом, не разбегом
      else{cmpAxes(0,-1,0.3);if(h.grounded)cmpTap('jump');}return;}
    if(h.pos.z<-57.2&&Math.abs(h.pos.x-6.5)<3){cmpGoto(h,h.pos.x>4.7?4.0:4.0,h.pos.x>4.7?-59:-53.6,0.3);return;}   // за стогом: обойти слева
    if(Math.abs(h.pos.x-6.5)>0.5&&h.pos.z>-54.2){cmpGoto(h,6.5,-53.6,0.3);return;}               // с земли: к первой ступени и прыжок
    cmpGoto(h,6.5,-58,0.2);if(h.grounded&&h.pos.z<-54.7)cmpTap('jump');}},
  // лужа: нить к нити — бросает, когда друг у края или его нить уже лежит; переходит оба героя
  {id:'puddle',done:()=>s11Todo(-88.5,'pit').length===0,run:(h,hh)=>{if(s11F().stage!=='yard')return 'follow';
    const td=s11Todo(-88.5,'pit'),k=td.includes(h.kind)?h.kind:td[0];if(!cmpWant(k))return;const th=s11Th(h,true),friend=W.threads.some(t=>t.owner===0&&!t.ret)||(hh.pos.z<-59&&hh.pos.z>-63);
    if(s11F().glued){const rt=W.threads.find(t=>t.sz<-55&&!t.ret&&!t.string&&!t.parent),rx=rt?rt.sx:1;   // мост ляжет по дорожке того, кто бросил первым
      if(Math.abs(h.pos.x-rx)>0.7&&h.pos.z>-62.3)cmpGoto(h,rx,-61.2,0.3);else cmpGoto(h,rx,-90,0.4);return;}
    if(Math.hypot(h.pos.x-1,h.pos.z+61.4)>0.5&&!th){cmpGoto(h,1,-61.4,0.3);return;}
    if(!th&&friend)s11Throw(h);}},
  // калитка-упрямица: встать на свою лапку, подержать секунду вместе с человеком — и все четверо за калитку
  {id:'gate',done:()=>!!s11F().out,run:(h,hh)=>{if(s11F().stage!=='yard')return 'follow';const P=W.clean11.PL[1];
    if(!s11F().gateKept){cmpGoto(h,P.x,P.z,0.2);return;}
    cmpCall();cmpGoto(h,1,-111,0.5);}},   // проход калитки — x от -2,2 до 2,2
]);
