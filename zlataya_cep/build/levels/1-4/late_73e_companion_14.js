/* ============================== РЕЛИЗ final06 · 1-4 «ЛЕШИЙ ВОДИТ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Бот за Игрока 2 делает то, что делал бы живой игрок за Пелагею и Йошу: после «Пелагею увели» берёт Йошу, ползёт под корнями к кольцу и поливает ёлку-замок живой водой
// (шишки-замки сбивает Прошка); потом ведёт обоих героев по тропе ёлок-ходунов к воротам из ёлок и привязывает правую ёлку клубком у столба (левую, если друг не успел);
// на поляне Лешего берёт Пелагею: Совиный взор показывает серебряную тропу, клубок ложится вдоль неё — ёлки замирают, и бот идёт по серебру; бой с лешачатами и выход — общий бой бота.
// Ёлки-ходуны стоят, пока на них кто-то смотрит (герой в ходьбе смотрит вперёд), поэтому к ёлке-воротам бот встаёт спиной и поворачивается к ней, только когда она у столба.
const KM14={w:null,t:0,rt:0,sv:0};
const km14=()=>{if(KM14.w!==W){KM14.w=W;KM14.t=0;KM14.rt=0;KM14.sv=0;}return KM14;};
const km14F=()=>W.flags,km14Gates=()=>W.movers.filter(m=>m.tieable),km14Tied=m=>!!(m&&m.tied);
const KM14_LAIR=[[1.6,-33],[3.2,-33]],KM14_WAY=[[0.8,-33],[0.3,-39],[0,-44.5],[0,-48],[0,-56],[1.2,-63],[2.8,-68.6]],KM14_GLADE=[[0,-69.5],[0,-75.5],[2.2,-78.0]],KM14_SILVER=[[2.2,-78.6],[5.6,-94.6],[5.5,-99.5],[3,-103.5]];
const KM14_PASS=[[0,-69.2],[0,-77.5]];
const KM14_EXIT=[[0,-119.4],[0,-123.5]];
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
  {id:'glade',done:()=>!!km14F().silver||HERO.pelageya.pos.z<-97||HERO.yosha.pos.z<-97,run:h=>{km14();if(!cmpWant('pelageya'))return;
    if(!(Math.hypot(h.pos.x-KM14_SV.sx,h.pos.z-KM14_SV.sz)<2.0)){cmpPath(h,KM14_GLADE,0.6);return;}
    h.face=Math.atan2(KM14_SV.ex-KM14_SV.sx,KM14_SV.ez-KM14_SV.sz);
    if(!km14F().seenSilver){if(W.abil.owl&&!(KM14.sv>G.time-0.9)){KM14.sv=G.time;cmpTap('skill');}return;}
    // бросает, когда на линии серебра (первые 10 м) нет ходячей ёлки: нить упирается в ёлку и до восьми метров не дорастает
    const a=Math.atan2(KM14_SV.ex-KM14_SV.sx,KM14_SV.ez-KM14_SV.sz),dx=Math.sin(a),dz=Math.cos(a);
    const clear=W.movers.every(m=>{const px=m.pos.x-h.pos.x,pz=m.pos.z-h.pos.z,u=px*dx+pz*dz;return u<0.5||u>10.5||Math.abs(px*dz-pz*dx)>1.6;});
    if(clear&&!(KM14.sv>G.time-0.9)){KM14.sv=G.time;cmpTap('item');}}},
  // по серебру к настоящему проходу и на поляну лешачат; бой — общий; когда лешачата распутаны — к выходу и звену
  {id:'arena',done:()=>!!km14F().out,run:h=>{const bar=W.gates.find(g=>g.link==='g');
    if(bar&&bar.forceOpen&&!W.enemies.some(e=>e.alive)){cmpPath(h,KM14_EXIT,0.4);return;}   // звено у выхода — и прочь из леса
    if(h.pos.z>-99)cmpPath(h,KM14_SILVER,0.6);else cmpGoto(h,3,-104,0.6);}},
]);
