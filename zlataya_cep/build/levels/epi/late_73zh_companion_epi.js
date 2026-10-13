/* ============================== РЕЛИЗ final06 · ЭПИЛОГ «ТЕАТР ТЕНЕЙ»: НАПАРНИК-БОТ ИГРАЕТ ТЕНЯМИ ЗА ИГРОКА 2 ============================== */
// Театр теней (late_39_epi_shadows.js, FIN.epiTh) — общее дело на четверых: без маршрута бот шёл за человеком, его тени в круги не вставали,
// Змей ждал огня Игрока 2, хоровод — его прыжка, и каждую сценку через минуту-две засчитывал Тишка. Теперь бот играет свою половину:
//   • «Великаны» — его герой тенью дотягивается до звезды, что дальше от тени человека;
//   • «Змей о трёх головах» — его герои встают в свободные круги подальше от человека (человеку — ближний: из трёх кругов ему один,
//     а встал человек вторым героем — бот берёт оставшийся); Змей ожил — бот дважды дышит огнём;
//   • «Жар-птица» — его тень садится сбоку от птицы, с другой стороны от тени человека: «ладошку» человек подводит сам;
//   • «Хоровод» — два его героя в два свободных круга подальше от человека; на хлопок Тишки — прыжок (Растеряша изредка опаздывает).
// Место героя — по ethIdeal (FIN.epiTh.dbg.ideal): где встать, чтобы макушка тени пришлась в нужную точку стены. Оставленный герой стоит,
// пока бот ведёт другого (смена героя оставляет прежнего на месте). До театра и после него (сидим и слушаем) — как прежде, повтор за человеком.
const KEP={w:null,R:null,tg:{},t0:0,fT:-1,jb:-1,jd:0,side:0,prep:false};
CMP.kep=KEP;
const kep=R=>{if(KEP.w!==W||KEP.R!==R){Object.assign(KEP,{w:W,R,tg:{},t0:G.time,fT:-1,jb:-1,jd:0,side:0,prep:false});}return KEP;};
const epSh=h=>{const E=FIN.epiTh,S=E.S;return (S&&S.find(s=>s.h===h))||E.dbg.shadow(h.kind);};
// встать героем h так, чтобы макушка его тени пришлась в (u,y) на стене; true — уже там
function epTo(h,u,y,stop){const p=FIN.epiTh.dbg.ideal(h.kind,u,y),s=stop||0.1;return cmpGoto(h,p.x,p.z,s)<=s;}
// круги сценки (Змей, хоровод): n своих героев — в свободные круги подальше от тени человека; кто уже в своём круге — там и стоит
function epSlots(R,K,n){const mine=players[1].heroes,hum=sl=>sl.held&&players[0].heroes.includes(sl.held.h),hu=epSh(active(0)).u;
  for(const k in K.tg)if(hum(R.slots[K.tg[k]]))delete K.tg[k];                                  // круг занял человек — ищем другой
  let ks=Object.keys(K.tg);
  while(ks.length>n){const k=ks.find(q=>!(R.slots[K.tg[q]].held&&R.slots[K.tg[q]].held.h.kind===q))||ks[ks.length-1];delete K.tg[k];ks=Object.keys(K.tg);}
  const used=new Set(Object.values(K.tg));
  for(const h of [active(1),...mine.filter(q=>q!==active(1))]){if(ks.length>=n)break;if(K.tg[h.kind]!=null)continue;
    let best=-1,bd=-1;R.slots.forEach((sl,i)=>{if(used.has(i)||hum(sl))return;const d=Math.abs(sl.u-hu);if(d>bd){bd=d;best=i;}});
    if(best<0)break;K.tg[h.kind]=best;used.add(best);ks=Object.keys(K.tg);}
  // ведём того, кто ещё не в своём круге; активный уже стоит — берём второго (прежний остаётся на месте)
  const h=active(1),o=other(1),at=q=>K.tg[q.kind]!=null&&R.slots[K.tg[q.kind]].held&&R.slots[K.tg[q.kind]].held.h===q;
  if(K.tg[h.kind]!=null&&!at(h)){const sl=R.slots[K.tg[h.kind]];epTo(h,sl.u,sl.y);return;}
  if(o&&!o._down&&K.tg[o.kind]!=null&&!at(o))cmpWant(o.kind);}
CMP.route('epi',[
  {id:'theatre',done:()=>false,run:(h,hh,dt)=>{const E=FIN.epiTh;if(!E||!E.on||W.custom)return 'follow';   // до театра и после — сидим и слушаем (повтор за человеком)
    const R=E.rd;if(!R||R.fin>=0||R.forced)return;const K=kep(R),id=R.def.id,o=other(1);
    if(!K.prep){K.prep=true;if(o&&(id==='zmei'||id==='horo'))o.following=false;}                 // в круги — каждого героя отдельно
    if(id==='giant'){const st=R.stars.filter(s=>!s.lit);if(!st.length)return;const hu=epSh(hh).u;
      let s=st.find(q=>q.i===K.tg.star);if(!s){s=st.slice().sort((a,b)=>Math.abs(b.u-hu)-Math.abs(a.u-hu))[0];K.tg.star=s.i;}
      epTo(h,s.u,s.y+0.3,0.12);return;}
    if(id==='zmei'){if(R.fly>=0)return;
      if(R.formed){if(R.fire[1]>=2)return;if(K.fT<0)K.fT=G.time+0.5+0.4*Math.random();if(G.time>=K.fT){cmpTap('attack');K.fT=G.time+0.45+0.3*Math.random();}return;}
      K.fT=-1;const hum=sl=>sl.held&&players[0].heroes.includes(sl.held.h),free=R.slots.filter(sl=>!hum(sl)).length,inS=R.slots.some(sl=>sl.held&&sl.held.h===hh);
      // человеку — один круг (ближний к нему); стоит без дела полминуты — бот занимает и его
      const n=Math.min(2,Math.max(0,free-(inS||G.time-K.t0>30?0:1)));epSlots(R,K,n);return;}
    if(id==='bird'){const B=R.B;if(R.big||B.st==='caught'||B.st==='wait')return;
      const tu=B.st==='fly'?B.to.u:B.u,ty=B.st==='fly'?B.to.y:B.y,d=epSh(hh).u-tu;
      if(!K.side||(Math.abs(d)>0.6&&Math.sign(d)===K.side))K.side=d>0.3?-1:d<-0.3?1:(tu>0?-1:1);   // с другой стороны от тени человека
      const w=epSh(h).w;epTo(h,tu+K.side*(w+0.5),Math.min(3.4,ty+0.4),0.12);return;}             // рядом, но не накрывая птицу: накроет — вспорхнёт
    if(id==='horo'){if(R.tr>=0)return;const hum=sl=>sl.held&&players[0].heroes.includes(sl.held.h);
      epSlots(R,K,Math.min(2,R.slots.filter(sl=>!hum(sl)).length));
      if(R.ph==='beat'&&K.jb!==R.next){if(K.jb!==-2-R.next){K.jb=-2-R.next;K.jd=Math.random()<CMP.lv().miss?-0.6:0.02+0.1*Math.random();}   // Растеряша иногда опаздывает к хлопку
        if(G.time>=R.next-K.jd){cmpTap('jump');K.jb=R.next;}}
      return;}}}
]);
