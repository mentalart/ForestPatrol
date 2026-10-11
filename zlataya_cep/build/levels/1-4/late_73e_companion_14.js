/* ============================== РЕЛИЗ final06 · 1-4 «ЛЕШИЙ ВОДИТ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Бот за Игрока 2 делает то, что делал бы живой игрок за Пелагею и Йошу: после «Пелагею увели» берёт Йошу, ползёт под корнями к кольцу и поливает ёлку-замок живой водой
// (шишки-замки сбивает Прошка); потом ведёт обоих героев по тропе ёлок-ходунов к воротам из ёлок и привязывает правую ёлку клубком у столба (левую, если друг не успел);
// на поляне Лешего берёт Пелагею: Совиный взор показывает серебряную тропу, клубок ложится вдоль неё — ёлки замирают, и бот идёт по серебру;
// на двух тропках держит взглядом тропку друга; в хороводе сам ставит кольца (смотрит на кольцо и шагает в проход); на поляне-петле аукает с пня-эхо;
// с Аукой (мирная перекличка, late_99zg_auka14.js): берёт каждое второе «ау» песенки — встаёт в круг нужного дупла и аукает.
// Ёлки-ходуны стоят, пока на них кто-то смотрит (герой в ходьбе смотрит вперёд), поэтому к ёлке-воротам бот встаёт спиной и поворачивается к ней, только когда она у столба.
const KM14={w:null,t:0,rt:0,sv:0};
const km14=()=>{if(KM14.w!==W){KM14.w=W;KM14.t=0;KM14.rt=0;KM14.sv=0;}return KM14;};
const km14F=()=>W.flags,km14Gates=()=>W.movers.filter(m=>m.tieable),km14Tied=m=>!!(m&&m.tied);
const KM14_LAIR=[[1.6,-33],[3.2,-33]],KM14_WAY=[[0.8,-33],[0.3,-39],[0,-44.5],[0,-48],[0,-56],[1.2,-63],[2.8,-68.6]],KM14_GLADE=[[0,-69.5],[0,-75.5],[2.2,-78.0]],KM14_SILVER=[[2.2,-78.6],[5.6,-94.6],[5.5,-99.5],[3,-103.5]];
const KM14_PASS=[[0,-69.2],[0,-77.5]];
const KM14_EXIT=[[0,-216.5],[0,-221]];
const KM14_SV={sx:2.2,sz:-78.6,ex:5.6,ez:-94.6};
CMP.route('1-4',[
  // Пелагею увели: Йоша под корнями к кольцу и — ковшик на ёлку-замок
  {id:'water',done:()=>!!km14F().watered,run:h=>{km14();if(km14F().stage!=='rescue')return 'follow';if(!cmpWant('yosha'))return;
    if(cmpPath(h,KM14_LAIR,0.4)&&!(KM14.t>G.time-1)){KM14.t=G.time;cmpTap('skill');}}},
  // шишки-замки сбивает Прошка (человек): бот ждёт в лазу
  {id:'cones',done:()=>!!km14F().ringOpen,run:()=>{if(km14F().stage!=='rescue')return 'follow';}},
  // тропа ёлок-ходунов к воротам из ёлок: оба героя, второй следом
  {id:'way',done:()=>HERO.yosha.pos.z<-62||HERO.pelageya.pos.z<-62,run:h=>{cmpCall();cmpPath(h,KM14_WAY,0.5);}},
  // ёлки-ворота: у каждого игрока один клубок — бот привязывает правую ёлку у столба, левую привязывает друг (новый бросок отпустил бы правую)
  {id:'gates',done:()=>{const g=km14Gates();return g.length>0&&g.every(km14Tied);},run:h=>{km14();const g=km14Gates().sort((a,b)=>a.bx-b.bx),R=g[g.length-1];
    cmpCall();if(km14Tied(R))return;
    if(Math.hypot(h.pos.x-2.8,h.pos.z+68.6)>0.5){cmpGoto(h,2.8,-68.6,0.3);return;}
    // стоит спиной к воротам, пока ёлка не дойдёт до столба: взгляд (и свет оставленного героя) замораживает ходуна на месте
    if(Math.hypot(R.pos.x-3.35,R.pos.z+71)<1.2&&Math.abs(R.pos.x-h.pos.x)<0.5){h.face=Math.PI;
      if(!(KM14.t>G.time-0.7)){KM14.t=G.time;cmpTap('item');}}
    else h.face=0;}},
  // оба героя — в проход между колючими стенами, по очереди (ведомый на тесном месте цепляется за столбы)
  {id:'pass',done:()=>HERO.yosha.pos.z<-74&&HERO.pelageya.pos.z<-74,run:h=>{const td=['yosha','pelageya'].filter(q=>HERO[q].pos.z>-74),k=td.includes(h.kind)?h.kind:td[0];
    if(!cmpWant(k))return;cmpPath(h,KM14_PASS,0.5);}},
  // поляна Лешего: Пелагея, Совиный взор, нить по серебряной тропе
  {id:'glade',done:()=>!!km14F().silver||HERO.pelageya.pos.z<-97||HERO.yosha.pos.z<-97,run:(h,hh,dt)=>{km14();if(!cmpWant('pelageya'))return;
    if(!(Math.hypot(h.pos.x-KM14_SV.sx,h.pos.z-KM14_SV.sz)<2.0)){cmpPath(h,KM14_GLADE,0.6);return;}
    h.face=Math.atan2(KM14_SV.ex-KM14_SV.sx,KM14_SV.ez-KM14_SV.sz);
    if(!km14F().seenSilver){if(W.abil.owl&&!(KM14.sv>G.time-0.9)){KM14.sv=G.time;cmpTap('skill');}return;}
    // бросает, когда на линии серебра (первые 10 м) нет ходячей ёлки: нить упирается в ёлку и до восьми метров не дорастает
    const a=Math.atan2(KM14_SV.ex-KM14_SV.sx,KM14_SV.ez-KM14_SV.sz),dx=Math.sin(a),dz=Math.cos(a);
    const clear=W.movers.every(m=>{const px=m.pos.x-h.pos.x,pz=m.pos.z-h.pos.z,u=px*dx+pz*dz;return u<0.5||u>10.5||Math.abs(px*dz-pz*dx)>1.6;});
    // своя нить уже лежит: растёт — ждать; упёрлась в ёлку и не доросла до серебра (или это нить от ворот) — смотать
    {const mine=W.threads.find(t=>t.owner===1&&!t.ret&&!t.string);if(mine){if(!mine.grow&&!(KM14.sv>G.time-0.9)){KM14.sv=G.time;cmpTap('item');}return;}}
    // ходун замер прямо на линии (его держит взгляд бота) — отвернуться, пока не уйдёт
    if(!clear){KM14.blk=(KM14.blk||0)+dt;if(KM14.blk>1.5)h.face=a+Math.PI;return;}KM14.blk=0;
    if(!(KM14.sv>G.time-0.9)){KM14.sv=G.time;cmpTap('item');}}},
  // по серебру через колючие стены — к тропкам
  {id:'silver',done:()=>active(1).pos.z<-101||active(0).pos.z<-127,run:h=>{if(!cmpWant('pelageya'))return;cmpPath(h,KM14_SILVER,0.6);}},
  // «Друг за друга»: бот на другой тропке, чуть впереди друга, смотрит на его тропку — держит его ёлки; друг прошёл — следом (ведомый подтянется)
  {id:'lanes',first:true,done:()=>active(0).pos.z<-127.5&&active(1).pos.z<-127.5,run:(h,hh)=>{const K=W.k14;if(!K||hh.pos.z>K.LN.z0+1||hh.pos.z<K.LN.z1)return 'follow';
    const sd=hh.pos.x<0?1:-1,tz=Math.max(K.LN.z1+1,Math.min(K.LN.z0-0.5,hh.pos.z-2.5));if(cmpGoto(h,sd*1.3,tz,0.6)<=0.8)h.face=sd>0?-Math.PI/2:Math.PI/2;}},
  // «Хоровод ёлок»: к воротцам внешнего несвободного кольца (взгляд держит кольцо), шаг в воротца — кольцо встаёт; сквозь кольцо не пройти —
  // к внутренним кольцам и к пню — через воротца уже вставших колец
  {id:'horo',done:()=>!!km14F().horoDone,run:h=>{const K=W.k14;if(!K)return 'follow';if(active(0).pos.z>-128&&h.pos.z>-128)return 'follow';
    const HC=K.HC,ra=Math.atan2(h.pos.z-HC.z,h.pos.x-HC.x),rh=Math.hypot(h.pos.x-HC.x,h.pos.z-HC.z),tgt=K.horo.filter(q=>!q.locked).slice(-1)[0],goal=tgt?tgt.R:0;
    const side=k=>(h._hr&&h._hr[k])||(rh>K.horo[k].R?1:-1),blk=K.horo.filter((q,k)=>side(k)>0&&q.R>goal+0.1).sort((a,b)=>b.R-a.R)[0],r=blk||tgt;if(!r){cmpGoto(h,HC.x,HC.z+0.8,0.3);return;}
    let da=r.a-ra;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;
    const P=k=>[HC.x+Math.cos(r.a)*(r.R+k),HC.z+Math.sin(r.a)*(r.R+k)],o=P(1.2),inB=Math.abs(rh-r.R)<1.0&&Math.abs(da)*r.R<0.9;
    if(!inB&&(Math.abs(da)*r.R>0.9||rh>r.R+2.2)){const a=ra+Math.sign(da)*Math.min(Math.abs(da),0.5),R=r.R+1.2;cmpGoto(h,HC.x+Math.cos(a)*R,HC.z+Math.sin(a)*R,0.3);}
    else if(!inB&&Math.hypot(h.pos.x-o[0],h.pos.z-o[1])>0.3)cmpGoto(h,o[0],o[1],0.2);   // сперва точно против воротец, потом — прямо в них
    else if(r===blk){const q=P(-1.1);cmpGoto(h,q[0],q[1],0.25);}
    else{cmpGoto(h,HC.x+Math.cos(r.a)*r.R,HC.z+Math.sin(r.a)*r.R,0.25);h.face=Math.atan2(HC.x-h.pos.x,HC.z-h.pos.z)+0.9;}}},
  // «Леший водит по кругу»: бот на пне-эхо аукает, когда друг у проходов; друг сам на пне — бот бежит к золотому огоньку
  {id:'krug',done:()=>!!km14F().krugDone,run:(h,hh)=>{const K=W.k14;if(!K)return 'follow';const KG=K.KG;if(hh.pos.z>-157&&h.pos.z>-157)return 'follow';
    if(hd(hh.pos,KG.stump)<1.8){const gx=KG.gaps[KG.tru];if(KG.lit>0){if(h.pos.z>-184.8)cmpGoto(h,gx,-185.4,0.3);else cmpGoto(h,gx,-188.5,0.3);}else cmpGoto(h,0,-182,0.6);return;}
    if(cmpGoto(h,KG.stump.x,KG.stump.z,0.5)<=0.8){h.face=Math.PI;if(hh.pos.z<-176&&KG.lit<=0&&!(KM14.t>G.time-1.5)){KM14.t=G.time;cmpTap('call');}}}},
  // Аука-перекличка: бот берёт каждое второе «ау» песенки (второе, четвёртое…) — встаёт в круг нужного дупла и аукает; остальное время ждёт в стороне
  {id:'auka',first:true,done:()=>!!(W.k14&&W.k14.arena.cleared),run:(h,hh)=>{const K=W.k14,A=K&&K.auka;if(!A||A.ph!==1)return 'follow';const D=A.dbg();
    if(D.st==='play'&&D.pos%2===1){const q=D.HL[D.seq[D.pos]];if(cmpGoto(h,q.mx,q.mz,0.4)<=0.9&&!(KM14.at>G.time-1.0)){KM14.at=G.time;cmpTap('call');}return;}
    cmpGoto(h,2.4,-201.5,0.6);}},
  // выход: ворота открыты — к выходу
  {id:'exit',done:()=>!!km14F().out,run:h=>{if(!(W.k14&&W.k14.arena.cleared))return 'follow';cmpPath(h,KM14_EXIT,0.4);}},
]);
