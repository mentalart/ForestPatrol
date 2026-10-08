/* ============================== РЕЛИЗ final06 · 2-2 «РЫБА-КИТ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Вода на хребте кита общая: ракушка посередине — «просьба»; через две секунды вода сменится у обоих (пока никто не прыгает над участком). Бот просит воду, только когда она нужна и друг
// уже ничего не просит; пока просьба висит — стоит смирно (прыжок «ведомого» в зоне задерживает смену воды). Положения — из build/levels/2-2/late_99f_k22*.js.
const K22={w:null,t:0,tide:0,ow:0,sw:0};
const k22=()=>{if(K22.w!==W){K22.w=W;K22.t=0;K22.tide=0;K22.ow=0;K22.sw=0;}return K22;};
const k22Z=(a,b)=>W.waters.find(z=>z.shared&&z.minz===a&&z.maxz===b);
// вода зоны z должна быть want: просит (если никто не просит), ускоряет просьбу друга; true — уже такая и устоялась
const k22Water=(h,z,want)=>{if(z.state===want&&!z.req)return z.t>=1;
  if(z.req){if(z.req.pi!==1&&z.req.want===want&&!(K22.tide>G.time-0.8)){K22.tide=G.time;cmpTap('item');}return false;}      // просит друг то же самое — «Давай!»
  if(inZone(z,h,1.3)&&!(K22.tide>G.time-0.9)){K22.tide=G.time;cmpTap('item');}return false;};
// оба героя Игрока 2 дальше линии z (идёт на юг: меньше z) / шаг для того, кто ещё не прошёл; активный — первым
const k22Past=z=>HERO.pelageya.pos.z<z&&HERO.yosha.pos.z<z;
const k22Each=(z,fn)=>(h,hh,dt)=>{const need=['pelageya','yosha'].filter(k=>HERO[k].pos.z>=z);if(!need.length)return 'follow';const k=need.includes(h.kind)?h.kind:need[0];if(!cmpWant(k))return;return fn(h,hh,dt);};
const K22_HOLE=[[5.5,-33.5],[5.5,-36.2],[5.5,-39.2],[7.5,-43.2],[8,-45.3]];
const K22_SPOT=[[-3.1,-419],[3.1,-419],[0,-415.2],[0,-422.6]];
const K22_CLOUD=[[0.6,-64.3],[3,-69.6],[3,-75.5]];
CMP.route('2-2',[
  // забор: прилив — вплавь через забор (вода общая)
  {id:'fence',done:()=>k22Past(-24),run:k22Each(-24,(h,hh)=>{k22();const Z=k22Z(-22.2,-7);if(!Z||h.pos.z>3)return 'follow';
    if(!(Z.state==='high'&&Z.t>=1)){if(Z.state==='high'||Z.req)k22Water(h,Z,'high');else if(inZone(Z,h,1.3))k22Water(h,Z,'high');else cmpGoto(h,0,-8.5,0.5);return;}
    cmpGoto(h,0,-27,0.4);})},
  // огород: в отлив Йоша пролезает в лаз у земли и встаёт на плиту-калитку; дальше — за человеком (ворота откроются, как друг сделает мачту; Пелагею «подтянет» ведомый)
  {id:'yard',done:()=>!!W.flags.garden,run:(h,hh)=>{k22();const Z=k22Z(-50,-25.5),Fl=W.flags;if(!Z||h.pos.z>-24)return 'follow';
    if(!cmpWant('yosha'))return;
    if(!(Z.state==='low'&&Z.t>=1&&!Z.req)){const hm=hh.pos.x<0.5&&hh.pos.z<-25&&!Fl.mast;if(hm&&Z.state==='high')return;                // друг плывёт к мачте — не отнимаем воду
      k22Water(h,Z,'low');return;}
    cmpPath(h,K22_HOLE,0.4,0.6);}},
  // фонтан дыхания: прилив у ракушки, встать на дыру на выдохе — до облаков; с облака на облако и на горб кита (по очереди оба героя)
  {id:'fountain',done:()=>k22Past(-72),run:k22Each(-72,(h,hh)=>{k22();const D=W.dbg22(),Z=D.Z3;if(h.pos.z>-52&&h.pos.y<6)return 'follow';
    if(h.pos.y>6.4){cmpPath(h,K22_CLOUD,0.5,0.8);return;}                                                     // на облаке: дальше по облакам
    if(Z.state!=='high'||Z.req){if(Z.state==='high')return;if(!inZone(Z,h,1.3)){cmpGoto(h,0,-56,0.5);return;}k22Water(h,Z,'high');return;}
    if(Z.t<1)return;
    cmpGoto(h,0,-61,0.35);})},
  // деревня: Совиный взор Пелагеи показывает человеку ведро со щукой; пруд общий — бот просит прилив (щуку выпустят только в полный пруд)
  {id:'village',done:()=>!!W.flags.pikeFree,run:(h,hh)=>{k22();const D=W.dbg22(),PZ=D.PZ;if(h.pos.z>-72||h.pos.y<4)return 'follow';
    const near=D.BUCK.some(b=>!b.tipped&&hd(b,hh.pos)<7);
    if(near&&hh.kind==='potap'&&W.owlT<=0){if(!cmpWant('pelageya'))return;if(!(K22.ow>G.time-1.2)){K22.ow=G.time;cmpTap('skill');}return;}   // Потап у вёдер — подсветить щуку
    if(PZ.state!=='high'||PZ.req){if(PZ.state==='high'&&!PZ.req)return;if(!inZone(PZ,h,1.2)){cmpGoto(h,0,-84.7,0.3);return;}k22Water(h,PZ,'high');return;}
    return 'follow';}},
  // печка Емели: оба в сборе — вскочить; волна — щит; смыло — догнать и вскочить; раки на дороге — общий бой
  {id:'stove',done:()=>W.flags.stove==='done',run:h=>{const S=W.dbg22().STV;if(S.state!=='wait'&&S.state!=='ride')return 'follow';
    const wv=S.wave;if(wv&&wv.t>-0.7&&wv.t<1.3&&h.groundRef===S.col)cmpKey('guard',true);
    if(h.groundRef!==S.col){const d=Math.hypot(S.x-h.pos.x,S.z-h.pos.z);cmpGoto(h,S.x,S.z,0.2);if(h.grounded&&d<2.3)cmpTap('jump');}}},
  // бока кита: Потап (человек) выдернул кол — Йоша лечит рану живой водой; рёбра ходят — ходит за человеком
  {id:'ribs',first:true,done:()=>W.dbg22().RB.healed>=3,run:(h,hh)=>{k22();const D=W.dbg22(),P=D.PALS.find(q=>q.pulled&&!q.healed);if(!P)return 'follow';
    if(!cmpWant('yosha'))return;
    if(Math.abs(h.pos.z-P.lp.z)>2.0||Math.abs(h.pos.y-P.lp.y)>1.2){cmpGoto(h,2.6,P.lp.z+1.2,0.4);if(h.grounded&&h.blocked)cmpTap('jump');return;}
    h.face=Math.PI;if(!(K22.t>G.time-1.2)){K22.t=G.time;cmpTap('skill');}}},
  // губа кита: морские жёлуди на плугах — бить (второй, дальний; первый и высокий — человек); кит зевает — держаться у плуга
  {id:'lip',done:()=>!!W.flags.plough,run:(h,hh)=>{k22();const D=W.dbg22(),Y=D.YW,B=D.BARN;if(h.pos.z>-211||h.pos.z<-264)return 'follow';
    if(Y.ph==='warn'||Y.ph==='suck'){const p=D.plows.slice().sort((a,b)=>hd(a,h.pos)-hd(b,h.pos))[0];if(hd(p,h.pos)>1.2){cmpGoto(h,p.x-0.2,p.z+0.8,0.3);return;}return;}   // зевок — под защиту плуга
    const b=!B[1].gone?B[1]:(!B[0].gone?B[0]:null);if(!b)return 'follow';
    if(hd(b,h.pos)>2.0){cmpGoto(h,b.x+1.3,b.z+0.8,0.5);return;}
    h.face=Math.atan2(b.x-h.pos.x,b.z-h.pos.z);if(!(K22.t>G.time-0.55)){K22.t=G.time;cmpTap('attack');}}},
  // между глаз: хоровод — встать на камушек своего цвета, пока горит
  {id:'eyes',done:()=>!!W.dbg22().DC.done,run:h=>{const DC=W.dbg22().DC;if(hd(h.pos,DC)>12||h.pos.y<4)return 'follow';
    const S=DC.stones.find(q=>q.lit===1);if(S){cmpGoto(h,S.x,S.z,0.3);return;}}},
  // дубрава: Совиный взор Пелагеи показывает боровики (мухомор — прилипала); бот светит взором и собирает видимые настоящие
  {id:'grove',done:()=>!!W.dbg22().GR.done,run:h=>{k22();const D=W.dbg22();if(hd(h.pos,{x:0,z:-330})>34||h.pos.y<4||h.pos.z>-300)return 'follow';
    if(!cmpWant('pelageya'))return;
    if(W.owlT<=0.8&&!(K22.ow>G.time-1.5)){K22.ow=G.time;cmpTap('skill');return;}
    const m=D.MUSH.filter(q=>!q.got&&q.real&&q.seen>0).sort((a,b)=>hd(a,h.pos)-hd(b,h.pos))[0];
    if(m&&hd(m,h.pos)<16){cmpGoto(h,m.x,m.z,0.3);return;}
    return 'follow';}},
  // макушка: колыбельная в три куплета. 1 — играть у своей ракушки, когда волна дошла до круга; 2 — Совиный взор Пелагеи и звёздочки прыжком; 3 — четыре голоса: сыграл и сменил героя
  // (оставленный держит напев 15 с), второй герой играет вторую ракушку; кончается напев — вернуться к тому, чей напев стихает
  {id:'lullaby',done:()=>W.dbg22().FN.done,run:(h,hh)=>{k22();const D=W.dbg22(),LS=D.LS,FN=D.FN,LUL=D.LUL;if(!FN.dive||h.pos.z>-396||h.pos.y<7)return 'follow';
    other(1).following=false;
    const near=i=>Math.hypot(h.pos.x-K22_SPOT[i][0],h.pos.z-K22_SPOT[i][1])<0.75&&Math.abs(h.pos.y-8.5)<0.8;
    const go=i=>{cmpGoto(h,K22_SPOT[i][0],K22_SPOT[i][1],0.3);if(h.grounded&&h.pos.y<8.3&&h.blocked)cmpTap('jump');};
    const play=i=>{if(!(K22.t>G.time-0.8)){K22.t=G.time;cmpTap('item');}};
    if(LS.stage<=1){if(!near(1)){go(1);return;}const d=LS.bt-0.7*LS.per;if(d>-0.25&&d<0.25&&G.time-LUL[1].press>1.5)play(1);return;}
    if(LS.stage===2){if(!cmpWant('pelageya'))return;
      if(W.owlT<=1&&!(K22.ow>G.time-1.5)){K22.ow=G.time;cmpTap('skill');return;}
      const st=D.STARS.filter(q=>!q.got&&q.seen>0).sort((a,b)=>Math.hypot(a.g.position.x-h.pos.x,a.g.position.z-h.pos.z)-Math.hypot(b.g.position.x-h.pos.x,b.g.position.z-h.pos.z))[0];
      if(st){const x=st.g.position.x,z=st.g.position.z;cmpGoto(h,x,z,0.2);if(h.grounded&&Math.hypot(x-h.pos.x,z-h.pos.z)<0.8)cmpTap('jump');}return;}
    // куплет 3: свои ракушки — вторая и четвёртая (индексы 1 и 3); на каждой — свой герой
    const mine=near(1)?1:near(3)?3:-1,oth=mine===1?3:1,stat=i=>Math.hypot(other(1).pos.x-K22_SPOT[i][0],other(1).pos.z-K22_SPOT[i][1])<0.9;
    if(mine<0){go(stat(1)?3:1);return;}
    if(stat(mine)){go(oth);if(near(oth)&&!(K22.t>G.time-0.8))play(oth);return;}                                 // второй герой уже стоит у этой ракушки — моя другая
    const fresh=G.time-LUL[mine].press<2.5&&LUL[mine].hum>3.2,swap=()=>{if(!(K22.sw>G.time-1.2)){K22.sw=G.time;cmpTap('swap');}};
    if(!stat(oth)){if(!fresh){play(mine);return;}swap();return;}                                                // второй герой ещё не у своей ракушки — передать ему управление
    if(LUL[oth].hum<2.2){if(!fresh){play(mine);return;}swap();return;}                                          // напев друга-героя стихает — теперь его очередь
    if(LUL[mine].hum<2.0)play(mine);}},
]);
