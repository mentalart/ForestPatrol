/* ============================== РЕЛИЗ final06 · 3-2 «ОБЛАЧНЫЕ ПАСТБИЩА»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Бот ведёт Йошу: у неё и живая вода (облака для Потапа, Пушок-пружинка, дождик, стожки), и перо. Положения — из proto/levels/3-2.js и build/levels/3-2/late_99o_sky32.js.
// Облако-лифт: полить (пухлое не тает), встать на него с пером — поднимает; барашки-мостик: перо на холмике, пока друг не перешёл; грозовые тучки и тени — общий бой с пером;
// Пушок: два пера рядом (человек и бот, а нет — вторым героем бота) — нить тает; польёт — пружинка: прыжок на него и вперёд, на уступ.
const K32={w:null,t:0,jt:0,hw:0,lb:0,lt:0,pj:0,ob:null,ew:0,rw:0,rr:null,sg:null,at:0,ro:0,ju:0};
CMP.k32=K32;
const k32=()=>{if(K32.w!==W){K32.w=W;K32.t=0;K32.jt=0;K32.hw=0;K32.lb=0;K32.lt=0;K32.pj=0;K32.ob=null;K32.ew=0;K32.rw=0;K32.rr=null;K32.sg=null;K32.at=0;K32.ro=0;K32.ju=0;}return K32;};
const k32Tap=(K,k,gap,act)=>{if(!(K[k]>G.time-gap)){K[k]=G.time;cmpTap(act);return true;}return false;};
const k32Cl=n=>W.clouds.find(c=>c.name===n);
// подняться на облако c и сойти на dest [x,z]; (wx,wz) — где стоять, поливая облако; true — уже наверху (сошёл)
function k32Lift(h,c,dest,wx,wz){const K=k32();if(c.gone>0)return false;
  if(h.pos.y>c.ceil-0.4&&h.groundRef!==c){cmpGoto(h,dest[0],dest[1],0.4);return false;}   // уже наверху — идти на пастбище, а не к облаку
  if(h.groundRef===c){w3Lit(h,true);if(c.y>=c.ceil-0.25)cmpGoto(h,dest[0],dest[1],0.4);else cmpGoto(h,c.x,c.z,0.3);return false;}
  if(!c.puffy){if(hd(h.pos,{x:wx,z:wz})>0.6){cmpGoto(h,wx,wz,0.35);return false;}h.face=Math.atan2(c.x-h.pos.x,c.z-h.pos.z);k32Tap(K,'t',0.8,'skill');return false;}
  w3Lit(h,true);cmpGoto(h,c.x,c.z,0.3);return false;}
const K32_BOW=[[-7.4,-316],[-2.4,-316]];                                                 // вход на радугу у тучки и подъём к туче Барана
const K32_WP=[[0.2,-153.5],[0.2,-158.5],[-0.8,-166],[0.2,-177.6],[0,-190.5]];   // укрытия за стожками (x — восточнее стожка) и выход из зоны ветра
// радуга-дуга: сходить к тучке R (по имени), полить (если Йоша может) и светить рядом; радугу встал — перейти к end; друга (если он сзади и недалеко) ждёт до 25 с
function k32Rain(h,hh,name,sp,end){const K=k32(),R=W.rains.find(q=>q.name===name),B=R.bow;
  if(K.rr!==R){K.rr=R;K.rw=G.time;}
  if(B.on){if(B.k>=0.95&&(R.rain>4||hd(h.pos,{x:sp[0],z:sp[1]})>3))cmpGoto(h,end[0],end[1],0.5);else cmpGoto(h,sp[0],sp[1],0.4);return;}
  const near=hd(h.pos,{x:sp[0],z:sp[1]})<0.7;
  if(R.rain>0.3){w3Lit(h,true);if(!near)cmpGoto(h,sp[0],sp[1],0.4);return;}
  if(!near){cmpGoto(h,sp[0],sp[1],0.4);return;}
  w3Lit(h,true);if(!R.yosha)return;
  if(hh.pos.z>R.z-0.5&&hd(hh.pos,R)>6&&hd(hh.pos,h.pos)<30&&G.time-K.rw<25)return;
  k32Tap(K,'t',0.9,'skill');}
// ходьба у кошары: через калитку с севера (калитка — между столбиками на +z), внутрь и наружу — по ней
function k32Pen(h,x,z,stop){const P={x:0,z:-285},G1={x:0,z:-280.4},inP=hd(h.pos,P)<3.9,tIn=hd({x,z},P)<3.9;
  if(inP!==tIn&&hd(h.pos,G1)>1.0){cmpGoto(h,G1.x,G1.z,0.6);return;}cmpGoto(h,x,z,stop);}
// Баран: бить — встать у него и ударить, когда достаёшь (как в 2-Б)
function k32Strike(K,h,e){const [tx,tz]=cmpPos(e,h),bd=hd(e.pos,h.pos);cmpGoto(h,tx,tz,0.3);
  if(bd<=h.d.range*0.9+e.r){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);k32Tap(K,'at',0.45,'attack');}}
// этап 1/3: стожок между Бараном и героем (на 1,7 м за ним), поливать, если сухой; разбег — перекатом, если стожка не между
function k32Lure(h,hh,B,e,ph){const K=k32();w3Lit(h,true);
  const ok=B.SB.filter(s=>s.gone<=0);if(!ok.length){cmpGoto(h,0,-308,1);return;}
  let S=K.sg;if(!S||S.gone>0||(!S.puffy&&ok.some(s=>s.puffy))){const pf=ok.filter(s=>s.puffy);S=K.sg=(pf.length?pf:ok).sort((a,b)=>hd(b,e.pos)-hd(a,e.pos))[0];}
  const stuck=B.ai==='stuck'||(ph===3&&B.ai==='bonk');
  if(stuck||e.state==='broken'){
    if(ph===3){const LB=W.lamb32;cmpGoto(h,e.pos.x+(h.pos.x>e.pos.x?1.5:-1.5),e.pos.z+1.2,0.3);return;}   // Пушок идёт за светом — подвести к батюшке
    k32Strike(K,h,e);return;}
  const dx=S.x-e.pos.x,dz=S.z-e.pos.z,dl=Math.hypot(dx,dz)||1,bx=clamp(S.x+dx/dl*1.7,-10.2,10.2),bz=clamp(S.z+dz/dl*1.7,-327,-305.4);
  if(B.ai==='charge'){const ux=B.dir.x,uz=B.dir.z,rx=h.pos.x-e.pos.x,rz=h.pos.z-e.pos.z,al=rx*ux+rz*uz,lat=Math.abs(rx*uz-rz*ux);
    if(al>0&&al<3.3&&lat<B.hitR+0.4&&!B.SB.some(s=>{if(s.gone>0)return false;const sx=s.x-e.pos.x,sz=s.z-e.pos.z,sa=sx*ux+sz*uz;return sa>0&&sa<al&&Math.abs(sx*uz-sz*ux)<1.2;}))k32Tap(K,'ro',0.5,'roll');
    return;}
  if(hd(h.pos,{x:bx,z:bz})>0.4){cmpGoto(h,bx,bz,0.3);return;}
  if(!S.puffy)k32Tap(K,'t',1.0,'skill');}
CMP.route('3-2',[
  // первое облако: полить, подняться на луг повыше
  {id:'c2',done:()=>active(1).pos.z<-15&&active(1).pos.y>4.5,run:h=>{k32();if(!cmpWant('yosha'))return;k32Lift(h,k32Cl('c2'),[0,-15.5],0,-9.2);}},
  // обрыв: облако Потапа (пухлое) — на верхнее пастбище
  {id:'c4',done:()=>active(1).pos.y>9.5&&active(1).pos.z<-36,run:h=>{k32();if(!cmpWant('yosha'))return;k32Lift(h,k32Cl('c4'),[-2.2,-37],-2.2,-32.0);}},
  // барашки-мостик: перо на холмике (стадо складывается мостом); ждёт друга, если он рядом, и идёт по живому мосту со светом
  {id:'sheep',done:()=>active(1).pos.z<-68.5,run:(h,hh)=>{const K=k32();if(!cmpWant('yosha'))return;const fl=W.flocks.find(f=>f.name==='bridge');
    if(h.pos.z>-51.5){K.hw=0;cmpGoto(h,0,-54.2,0.3);w3Lit(h,hd(h.pos,{x:0,z:-54.2})<2);return;}
    w3Lit(h,true);
    if(h.pos.z>-55.5){if(!K.hw)K.hw=G.time;
      if(!fl.on||!fl.list.every(s=>s.at)){cmpGoto(h,0,-54.2,0.3);return;}                               // мостик ещё складывается — не ступать, пока все барашки не встали
      if(hd(hh.pos,h.pos)<14&&hh.pos.z>-56&&G.time-K.hw<15){cmpGoto(h,0,-54.2,0.3);return;}}              // друг рядом и ещё не перешёл — держим мостик
    cmpGoto(h,0,-70,0.5);}},
  // грозовой луг: тучки и тени — общий бой, перо горит (в темноте их не пробить)
  {id:'storm',first:true,done:()=>!!W.flags.cleared,run:h=>{k32();if(!W.flags.fight||h.pos.y<9)return 'follow';w3Lit(h,true);
    const al=W.enemies.filter(e=>e.alive).sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos));if(!al.length){cmpGoto(h,0,-76,1.5);return;}   // тучки ещё появляются — ждёт на лугу
    if(cmpAlive(al[0])&&hd(al[0].pos,h.pos)<7)return 'follow';                                                          // враг рядом — общий бой; далеко — идёт к нему сама
    cmpGoto(h,al[0].pos.x,al[0].pos.z,4);}},
  // последнее облако: полить и наверх, на остров с Пушком
  {id:'c6',done:()=>active(1).pos.y>14.5&&active(1).pos.z<-96,run:h=>{k32();if(!cmpWant('yosha'))return;if(!W.flags.cleared)return 'follow';k32Lift(h,k32Cl('c6'),[0,-97.5],0,-91.2);}},
  // Пушок в грозовой нити: два пера рядом (4,5 м) — нить тает. Человек со светом рядом — второе перо; иначе второй герой бота
  {id:'lamb',done:()=>!!W.flags.lambFree,run:(h,hh)=>{const K=k32(),LB=W.lamb32;if(h.pos.y<14.5)return 'follow';const lit=HEROES.filter(q=>heroLight(q)&&hd(q.pos,LB.pos)<4.5&&Math.abs(q.pos.y-LB.pos.y)<2).length;
    const o=other(1);
    if(K.lb===0){if(!cmpWant('yosha'))return;cmpGoto(h,1.6,-103.4,0.4);w3Lit(h,true);if(hd(h.pos,{x:1.6,z:-103.4})<0.8){if(!K.lt)K.lt=G.time;if(lit>=2)return;if(G.time-K.lt>6){K.lb=1;K.lt=G.time;K.ob=other(1).kind;}}return;}
    if(K.lb===1){o.following=true;cmpCall();if(hd(o.pos,h.pos)<7||G.time-K.lt>20){K.lb=2;}return;}
    if(K.lb===2){if(!cmpWant(K.ob))return;other(1).following=false;w3Lit(h,true);cmpGoto(h,-1.6,-103.4,0.4);return;}}}
,
  // уступ 4,2 м: Йоша поливает Пушка — пружинка 15 с; друг (если он внизу и недалеко) прыгает первым, потом она сама: на Пушка и вперёд, на уступ
  {id:'ledge',done:()=>active(1).pos.y>18.5&&active(1).pos.z<-128.5,run:(h,hh)=>{const K=k32(),LB=W.lamb32;if(h.pos.y<14)return 'follow';if(!cmpWant('yosha'))return;w3Lit(h,true);
    const st=[0,-126.6];if(!K.ew){if(hd(h.pos,{x:st[0],z:st[1]})>1.2){cmpGoto(h,st[0],st[1],0.6);return;}K.ew=G.time;}
    const hold=hh.pos.y<17&&hh.pos.z>-128.5&&hd(hh.pos,h.pos)<16&&G.time-K.ew<30;
    if(LB.puffT<(hold?4:7)&&!LB.hop){if(hd(h.pos,LB.pos)>1.8)cmpGoto(h,LB.pos.x,LB.pos.z,1.3);else k32Tap(K,'t',1.0,'skill');return;}
    if(hold){cmpGoto(h,st[0],st[1],0.6);return;}
    if(!h.grounded||h.pos.y>15.3){cmpGoto(h,0,-134,0.3);return;}
    if(LB.pos.z>-123.6||LB.pos.z<-127.4){cmpGoto(h,st[0],st[1],0.6);return;}                  // Пушок идёт за светом — ждём, пока встанет у самого уступа
    if(hd(h.pos,LB.pos)>0.5){cmpGoto(h,LB.pos.x,LB.pos.z,0.3);return;}
    k32Tap(K,'jt',0.7,'jump');}},
  // Ветер-Ветрило: от стожка к стожку (с подветренной стороны — восточнее) в паузах между порывами; на светомостки — только в паузу, перо должно гореть
  {id:'wind',done:()=>active(1).pos.z<-190,run:(h)=>{const K=k32(),WD=W.wind32;if(!cmpWant('yosha'))return;w3Lit(h,true);
    if(h.pos.z>-146.6&&hd(h.pos,{x:0.2,z:-146.2})>0.6){cmpGoto(h,0.2,-146.2,0.4);return;}                                                          // к краю зоны ветра
    const nx=K32_WP.find(p=>p[1]<h.pos.z-0.8)||K32_WP[K32_WP.length-1],here=h.pos.z>-147.3||K32_WP.some(p=>Math.hypot(p[0]-h.pos.x,p[1]-h.pos.z)<1.1);
    const need=Math.hypot(nx[0]-h.pos.x,nx[1]-h.pos.z)/4.4+0.8,safe=WD.st==='blow'?0:WD.st==='inhale'?WD.t:Math.max(0,WD.t)+1.8;
    if(here&&safe<need)return;cmpGoto(h,nx[0],nx[1],0.35);}},
  // радуга 1: полить дождевичок, светить рядом — радуга до следующего острова
  {id:'rain1',done:()=>active(1).pos.z<-214.5,run:(h,hh)=>{k32();if(!cmpWant('yosha'))return;k32Rain(h,hh,'r1',[-0.5,-197.5],[0,-216]);}},
  // радуга 2: то же (поливает только Йоша)
  {id:'rain2',done:()=>active(1).pos.z<-238.5,run:(h,hh)=>{k32();if(!cmpWant('yosha'))return;k32Rain(h,hh,'r2',[-0.5,-223.5],[0,-240]);}},
  // радуга 3: тучку-толстушку выжимает только Потап — свет рядом держит бот, ждёт человека
  {id:'rain3',done:()=>active(1).pos.z<-257,run:(h,hh)=>{k32();if(!cmpWant('yosha'))return;k32Rain(h,hh,'r3',[0.3,-240.6],[0,-259]);}},
  // овчарня: барашки бегут к свету — вести каждую кучку в кошару (вход с севера, через калитку)
  {id:'pen',done:()=>!!W.flags.penned,run:h=>{k32();if(!cmpWant('yosha'))return;if(!W.flags.herd){cmpGoto(h,0,-266,2);return;}
    w3Lit(h,true);const un=W.herd32.filter(q=>!q.penned);if(!un.length)return;
    const nr=un.filter(q=>hd(q.pos,h.pos)<9);if(nr.length){k32Pen(h,0,-285,0.6);return;}
    un.sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos));k32Pen(h,un[0].pos.x,un[0].pos.z,3.5);}},
  // на вершину по облачной лестнице: перед Бараном
  {id:'arena',done:()=>!!W.flags.boss,run:h=>{k32();if(!cmpWant('yosha'))return;if(!W.flags.penned)return 'follow';cmpGoto(h,0,-307,0.6);}},
  // Громовой Баран, этап 1 «Таран»: Йоша светит и поливает стожок, стоит ЗА ним (Баран бежит на свет — увязнет), увяз — бьёт в свете
  {id:'b1',first:true,done:()=>{const B=W.ram32;return !!B&&B.phase>=1.5;},run:(h,hh)=>{const B=W.ram32;if(!B||B.phase!==1||G.cine||!B.e||!B.e.alive)return 'follow';if(!cmpWant('yosha'))return;k32Lure(h,hh,B,B.e,1);}},
  // этап 2 «Гроза»: радуга (Йоша поливает западную тучку, светит) — на тучу к Барану; на полу уходит от тень-круга, на туче бьёт и прыгает через кольцо топота
  {id:'b2',first:true,done:()=>{const B=W.ram32;return !!B&&B.phase>=2.5;},run:(h,hh)=>{const K=k32(),B=W.ram32;if(!B||B.phase!==2||G.cine||!B.e||!B.e.alive)return 'follow';if(!cmpWant('yosha'))return;w3Lit(h,true);
    const e=B.e,RW=B.RW,top=h.pos.y>B.TOP.y-0.8&&hd(h.pos,B.ARC)<4.8;
    if(!top){const st=B.strikes.find(q=>!q.done&&hd(q.at,h.pos)<2.4);
      if(st){const dx=h.pos.x-st.at.x,dz=h.pos.z-st.at.z,d=Math.hypot(dx,dz)||1;cmpGoto(h,h.pos.x+(d<0.05?1:dx/d)*3,h.pos.z+dz/d*3,0.1);return;}
      if(!RW.bow.on){CMP.wp=null;const sp=[RW.x+0.1,RW.z+1.8];if(RW.rain>0.3||hd(h.pos,{x:sp[0],z:sp[1]})>0.6){cmpGoto(h,sp[0],sp[1],0.4);return;}k32Tap(K,'t',0.9,'skill');return;}
      if(RW.bow.k>=0.95)cmpPath(h,K32_BOW,0.35,0.4);return;}
    if(B.stompT>0&&B.stompT<0.3&&h.grounded){k32Tap(K,'ju',0.5,'jump');return;}
    k32Strike(K,h,e);}},
  // этап 3 «Пушок»: то же, но Баран неуязвим — Йоша заманивает его в стожок и подводит к нему Пушка (он идёт за светом)
  {id:'b3',first:true,done:()=>!!W.flags.won,run:(h,hh)=>{const B=W.ram32;if(!B||B.phase!==3||G.cine||!B.e||!B.e.alive)return 'follow';if(!cmpWant('yosha'))return;k32Lure(h,hh,B,B.e,3);}},
  // звено с радуги
  {id:'link',first:true,done:()=>!!W.flags.out,run:h=>{k32();if(W.flags.stage!=='link')return 'follow';const L=W.ram32.L4;cmpGoto(h,L.pos.x,L.pos.z,0.3);}}
]);
