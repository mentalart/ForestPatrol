/* ============================== РЕЛИЗ final06 · 2-1 «ГУСЛИ САДКО»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Бот за Игрока 2 играет правую сторону улиц и всё, что в уровне делает «второй голос»: мёртвая вода для струны Садко (Йоша), прилив и отлив гуслями у воды, лодки к террасам,
// верёвки, шлюзы, колодец-лифт, плиты напева, стул гусляра у трона, правая раковина, ростки сада (Йоша) и бой с Раком-Отшельником. Положения — из build/levels/2-1/late_99e_k21*.js.
const F21=()=>W.flags;
const K21B={w:null,t:0,tide:0};
const k21b=()=>{if(K21B.w!==W){K21B.w=W;K21B.t=0;K21B.tide=0;}return K21B;};
// сыграть гусли на воде зоны z, пока она не в нужном состоянии (раз в 0,8 с); true — вода уже такая и больше не меняется (повторное нажатие переключило бы обратно)
const k21Tide=(h,z,want)=>{if(z.state===want)return z.t>=1;if(zoneAt(h)===z&&!(K21B.tide>G.time-0.8)){K21B.tide=G.time;cmpTap('item');}return false;};
const h21Passed=(pi,z)=>active(pi).pos.z<z;
// оба героя Игрока 2 дальше линии z / шаг для того из них, кто ещё не прошёл (активный — первым)
const k21All=z=>HERO.pelageya.pos.z<z&&HERO.yosha.pos.z<z;
const k21Each=(z,fn)=>(h,hh,dt)=>{const need=['pelageya','yosha'].filter(k=>HERO[k].pos.z>=z);if(!need.length)return 'follow';const k=need.includes(h.kind)?h.kind:need[0];if(!cmpWant(k))return;return fn(h,hh,dt);};
// сад Китежа: герой на террасе над садом; подъём по листьям водоросли-лесенки (с лампы-ростка или с глади): true — наверху
const k21Top=k=>HERO[k].pos.y>4.2&&HERO[k].pos.z<-292;
const K21_STAIR=[[8.2,-271.6],[8.2,-277]];
const k21Climb=(h,S,tx,tz)=>{const lv=S.leaves;if(!lv.length)return false;let i=lv.findIndex(L=>h.groundRef===L.col);
  const nx=i>=0?i+1:lv.findIndex(L=>L.col.maxy>h.pos.y+0.15);
  if(nx<0||nx>=lv.length){cmpGoto(h,tx,tz,0.3);return h.pos.y>4.2;}
  const c=lv[nx].col,d=Math.hypot(c.x-h.pos.x,c.z-h.pos.z);cmpGoto(h,c.x,c.z,0.25);if(h.grounded&&c.maxy>h.pos.y+0.2&&d<1.7)cmpTap('jump');return false;};
CMP.route('2-1',[
  // Садко: порванная струна — мёртвая вода из ковшика Йоши
  {id:'sadko',done:()=>!!W.abil.gusli,run:h=>{k21b();if(F21().stage!=='sadko')return 'follow';if(!cmpWant('yosha'))return;
    if(Math.hypot(h.pos.x+4.3,h.pos.z+13.6)>0.8){cmpGoto(h,-4.3,-13.6,0.5);return;}
    if(!(K21B.t>G.time-1)){K21B.t=G.time;cmpTap('skill');}}},
  // причал (правая сторона): прилив — лодки всплывают; с лодки на крышу дома и дальше по улице
  {id:'dock',done:()=>h21Passed(1,-60.3),run:h=>{k21b();const zA=W.waters.find(z=>z.minx===1.2&&z.maxx===11&&z.minz===-56&&z.maxz===-44);if(!zA)return 'follow';
    if(h.pos.z>-43)return 'follow';
    const boat=zA.floaters[1];
    if(zA.state!=='high'||zA.t<1){if(zA.state!=='high'&&zoneAt(h)!==zA){cmpGoto(h,6,-45,0.4);return;}k21Tide(h,zA,'high');return;}
    if(h.pos.y<boat.col.maxy-0.5&&!(h.groundRef&&h.groundRef.col===boat.col)){cmpGoto(h,4.2,-54,0.3);const d=Math.hypot(h.pos.x-4.2,h.pos.z+54);if(d<2.2&&h.grounded&&h.groundRef&&h.groundRef.water)cmpTap('jump');return;}
    cmpGoto(h,4.2,-61,0.3);if(h.grounded&&h.pos.z>-56.5&&h.pos.z<-55)cmpTap('jump');}},
  // переливная улица: правый канал, лодка к террасе, верёвка открывает ворота друга; прилив/отлив — через заслонку, которую держит Потап; проходят оба героя
  {id:'perel',done:()=>k21All(-115.5),run:k21Each(-115.5,(h,hh)=>{k21b();const D=W.dbg21(),CR=D.CR,R=D.ropes[1],PG1=D.PG[1];if(h.pos.z>-77)return 'follow';
    if(h.pos.z<-108&&h.pos.x>1.2){                                                                            // терраса и лестница за воротами
      if(!R.pulled){if(Math.hypot(h.pos.x-5.9,h.pos.z+110.4)>1.0){cmpGoto(h,5.9,-110.4,0.6);return;}
        h.face=-Math.PI/2;if(!(K21B.t>G.time-0.7)){K21B.t=G.time;cmpTap('attack');}return;}              // верёвка: удар
      if(!PG1.open){cmpGoto(h,6,-111.2,0.5);return;}cmpGoto(h,6,-118,0.4);return;}                           // ворота друга открыты — вниз по лестнице
    const onWater=h.groundRef&&h.groundRef.water,inCR=h.pos.x>1.2&&h.pos.z<-80&&h.pos.z>-108;
    if(CR.state!=='high'||CR.t<1){                                                                            // нужен прилив справа
      if(CR.state==='high')return;                                                                            // вода ещё поднимается
      if(!D.SLU.held()){if(!inCR)cmpGoto(h,6,-79.2,0.5);return;}                                              // заслонка не держится — ждёт Потапа
      const hl=hh.pos.x<-1.2&&hh.pos.z<-80&&hh.pos.z>-110&&hh.pos.y<2.9&&hh.kind!=='potap';                  // друг плывёт слева — не отнимаем у него воду
      if(hl)return;
      if(zoneAt(h)!==CR){cmpGoto(h,6,-79.2,0.4);return;}k21Tide(h,CR,'high');return;}
    if(h.pos.z>-99.4){cmpGoto(h,8.3,-100,0.4);return;}                                                         // вплавь к лодке, на лодку, на террасу
    if(onWater){cmpGoto(h,8.3,-104.5,0.3);if(h.grounded&&h.pos.z<-102.2)cmpTap('jump');return;}
    cmpGoto(h,8.3,-109.2,0.3);if(h.grounded&&h.pos.y<3.1)cmpTap('jump');})},
  // шлюзы: три ступени воды — на каждой прилив поднимает на следующую; колодец-лифт: отлив опускает вниз (оба героя)
  {id:'locks',done:()=>k21All(-156.5),run:k21Each(-156.5,(h,hh)=>{k21b();const D=W.dbg21(),Z=W.waters.filter(z=>z.minx===-11&&z.maxx===11&&z.minz>=-144&&z.maxz<=-120).sort((a,b)=>b.minz-a.minz);
    if(h.pos.z>-114)return 'follow';
    if(Z.length<3)return 'follow';
    const LF=W.waters.find(z=>z.minx===-3&&z.maxx===3&&z.minz===-156&&z.maxz===-150),z=h.pos.z;
    const i=z>-128?0:z>-136?1:z>-144?2:3;
    if(i<3){const zn=Z[i];                                                                                    // ступень i: прилив, потом на следующую
      if(h.pos.z>-121&&i===0&&zn.state!=='high'){cmpGoto(h,6,-122.5,0.4);return;}
      if(zn.state!=='high'){if(zoneAt(h)!==zn){cmpGoto(h,6,-(124+8*i),0.5);return;}k21Tide(h,zn,'high');return;}
      cmpGoto(h,6,-(132+8*i)-(i===2?3:0),0.4);if(h.grounded&&h.groundRef&&h.groundRef.water&&h.pos.y<zn.level-0.8)cmpTap('jump');return;}
    // на верху последней ступени: в колодец, отлив — вниз
    if(!LF)return 'follow';
    if(Math.hypot(h.pos.x,h.pos.z+153)>1.2&&h.pos.z>-150.5){cmpGoto(h,0,-153,0.5);return;}
    if(LF.state==='high'&&h.pos.y>3){if(zoneAt(h)===LF)k21Tide(h,LF,'low');return;}
    cmpGoto(h,0,-160,0.4);})},
  // звонкая мостовая: плиты по напеву Садко — «дилинь» (вторая) после человека, потом «дон» (четвёртая) вместе с ним; пока не её очередь, стоит в стороне — чужая плита сбила бы напев
  {id:'tune',done:()=>W.dbg21().TS.done,run:h=>{const D=W.dbg21(),TS=D.TS,T=D.TUNE;if(h.pos.z>-183||!W.flags.sturg)return 'follow';
    other(1).following=false;
    if(TS.step===1){cmpGoto(h,T[1].x,T[1].z,0.25);return;}
    if(TS.step===2){cmpGoto(h,T[3].x,T[3].z,0.25);return;}
    cmpGoto(h,7.5,-186.5,0.5);}},
  // палаты Морского царя: второй стул гусляра — играть каждые несколько секунд, прыгать через кольца-волны, сбило — вернуться и сыграть снова
  {id:'dance',done:()=>!!W.flags.kingDone,run:h=>{const D=W.dbg21(),Fl=W.flags;if(!Fl.kingMet||G.cine)return 'follow';
    other(1).following=false;
    const s=D.seats[1],sx=s.x-0.3,sz=s.z+0.6;
    const d=Math.hypot(h.pos.x,h.pos.z-D.TZ);
    for(const w of D.WAV){if(w.side&&h.pos.x*w.side<0)continue;const gap=d-w.R;if(gap>0.3&&gap<1.3&&h.grounded&&h.pos.y<0.8){cmpTap('jump');break;}}
    if(Math.hypot(h.pos.x-sx,h.pos.z-sz)>0.6){cmpGoto(h,sx,sz,0.3);return;}
    if(D.KD&&!(K21B.t>G.time-0.9)&&(W.flags.kingMet)){const ref=D.SEATREF[1];if(ref.hum<2.5){K21B.t=G.time;cmpTap('item');}}}},
  // две раковины: левой воде — прилив (человек), правой — отлив (бот); решётка поднимается, когда оба сыграли
  {id:'shells',done:()=>!!W.flags.grate,run:h=>{const D=W.dbg21();if(h.pos.z>-251)return 'follow';
    other(1).following=false;
    if(D.RZ.state==='high'){if(zoneAt(h)!==D.RZ){cmpGoto(h,6,-257,0.5);return;}k21Tide(h,D.RZ,'low');return;}
    cmpGoto(h,6,-257,0.5);}},
  // сад Китежа: Йоша поливает ростки на дне (когда Потап сыграл отлив), потом оба героя — по листьям лесенки на террасу
  {id:'garden',done:()=>k21Top('pelageya')&&k21Top('yosha'),run:(h,hh)=>{k21b();const D=W.dbg21(),KS=D.KS,GA=D.GARD,DG=D.DG,Fl=W.flags;if(!Fl.grate||h.pos.z>-252)return 'follow';
    other(1).following=false;
    const pend=!(KS[0].grown&&KS[1].grown),dry=GA.state==='low'&&GA.t>=1,need=['yosha','pelageya'].filter(k=>!k21Top(k));
    const k=pend&&need.includes('yosha')?'yosha':(need.includes(h.kind)?h.kind:need[0]);if(!cmpWant(k))return;
    const bottom=h.pos.y<-3;
    if(pend){
      if(!dry&&!bottom){if(h.pos.z<-272)cmpGoto(h,8.2,-271.2,0.5);else cmpGoto(h,8.2,-270.5,0.5);return;}                // вода в саду — ждёт у входа (отлив играет Потап)
      if(!bottom){cmpPath(h,K21_STAIR,0.5);if(h.pos.y<-0.5)return;cmpGoto(h,8.2,-278.5,0.4);return;}                       // по ступеням вправо вниз
      const s=!KS[0].grown?KS[0]:(Fl.anchor?KS[1]:null);if(!s)return;
      const wx=s.x,wz=-256.6+DG;if(Math.hypot(h.pos.x-wx,h.pos.z-wz)>0.7){cmpGoto(h,wx,wz,0.4);return;}
      h.face=Math.PI;if(!(K21B.t>G.time-1.2)){K21B.t=G.time;cmpTap('skill');}return;}
    // лесенка правого ростка
    if(!bottom&&dry&&h.pos.y>-0.5&&h.pos.y<1.5&&h.pos.x>6){cmpPath(h,K21_STAIR,0.5);if(h.pos.y>-0.5)return;}
    k21Climb(h,KS[1],4,-294.4);}},
]);
