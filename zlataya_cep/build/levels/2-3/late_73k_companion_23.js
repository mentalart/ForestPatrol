/* ============================== РЕЛИЗ final06 · 2-3 «НЕВОД»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// «Невод на четверых»: у каждого игрока два героя, и все четыре встают на камни со знаком клубка — бот ставит своих (Пелагею и Йошу) на камни, которые не заняты человеком,
// бросает клубок, оставляет героя держать угол (смена героя) и берёт второго. Йоша поливает серёдку мёртвой водой, Пелагея перелетает пропасть, на «прилив» невод держат трое-четверо.
// Дальше — протока (плот, Совиный взор, тайное течение), озеро с Ершом (течения навстречу), лодка старика и отмель у кита. Положения — из build/levels/2-3/late_99g_k23.js.
const K23={w:null,t:0,sw:0,ow:0,tide:0};
const k23=()=>{if(K23.w!==W){K23.w=W;K23.t=0;K23.sw=0;K23.ow=0;K23.tide=0;}return K23;};
const k23Nets=id=>W.dbg23().stones.filter(s=>s.net.id===id);
const k23On=(s,q)=>hd(q.pos,s)<1.0&&Math.abs(q.pos.y-s.y)<0.7;
// поставить героя h на камень сети N (pref — порядок предпочтения по индексам); 'throw' — бросает клубок, 'wait' — ждёт очереди, 'go' — идёт, 'placed' — стоит на поставленном камне
const k23Place=(h,N,pref,via)=>{const hum=s=>HEROES.some(q=>q.player===0&&!q.cling&&k23On(s,q)),SS=N.corners,o=other(1),oS=SS.find(s=>k23On(s,o)&&!hum(s)),me=SS.find(s=>s!==oS&&k23On(s,h)&&!hum(s));
  if(me){if(Math.hypot(h.pos.x-me.x,h.pos.z-me.z)>0.3)cmpGoto(h,me.x,me.z,0.1);   // встать в середину камня — гусли у ракушки слышны с камня, угол держится
    if(!me.set){if(N.order&&me.num!==N.next)return 'wait';if(!(K23.t>G.time-0.8)){K23.t=G.time;cmpTap('item');}return 'throw';}return 'placed';}
  const free=s=>s!==oS&&!hum(s);
  const i=pref.find(j=>free(SS[j]));if(i===undefined)return 'none';
  const v=via&&via(i,h);if(v&&Math.hypot(h.pos.x-SS[i].x,h.pos.z-SS[i].z)>3.2&&!(CMP.wp&&CMP.wp.key===v&&CMP.wp.i===v.length-1)){cmpPath(h,v,0.5,0.9);return 'go';}
  cmpGoto(h,SS[i].x,SS[i].z,0.2);return 'go';};
const k23Hold=()=>{other(1).following=false;};
const k23Via=(V,pre)=>(i,h)=>pre(h)||(V[i]&&CMP.wp&&CMP.wp.key===V[i]&&CMP.wp.i<V[i].length-1)?V[i]:null;   // маршрут обхода: пока не пройден до конца — не бросать посередине
const K23_PIT=[[-4.6,-5.2],[-4.6,-7.2],[-4.6,-8.4]],K23_PIT_S=[[-4.6,-12.4],[-4.6,-10.9],[-4.6,-8.6]];
const K23_RAMP=[[10.8,-22.5],[10.8,-19.5],[10.8,-16.5]],K23_LINK=[[2.2,-14],[2.2,-18.2],[0.6,-20.4]];
const K23_CLIFF=[[0,-12.4],[0,-13.3],[0,-14.2],[0,-15.2],[0,-16.6]];
const K23_V3S=[null,null,[[2.5,-17.9],[2.5,-12.5],[2.5,-3.0],[7.7,-2.6]],[[2.5,-17.9],[2.5,-12.5],[2.5,-3.0],[9.6,-2.6]]];   // к кольцам невода рыбки с юга — через среднюю полосу и по северной кромке
const K23_V3=k23Via(K23_V3S,h=>h.pos.z<-9);
const K23_END=[[0,-57.5],[0,-60.5]];
const K23_WEST=[[-11,-61.5],[-11,-72],[-11,-82.5],[-6,-83.4],[-2.5,-83.4]];
const K23_V1S=[null,null,[[-0.5,-5.5],[-0.5,-13.5],[-9.0,-13.5]],[[-0.5,-5.5],[-0.5,-11.0],[-1.8,-11.7]]];
const K23_V1=k23Via(K23_V1S,h=>h.pos.z>-9);   // к южным камням первого невода — в обход ямы
CMP.route('2-3',[
  // первое дело: сундук на дне — четыре угла невода, Йоша сращивает нити мёртвой водой, на прилив невод держат трое
  {id:'net1',done:()=>W.flags.task>1,run:(h,hh)=>{k23();const D=W.dbg23(),SS=k23Nets(1);if(!SS.length)return 'follow';const N=SS[0].net;k23Hold();
    if(N.laid&&!N.formed){if(!cmpWant('yosha'))return;                                                          // Йоша сращивает нити: с края ямы или со ступенек, ковшик до серёдки — 3 м
      if(Math.hypot(h.pos.x+4.6,h.pos.z+8)>1.2){if(h.pos.y<-1.5)cmpGoto(h,-4.6,-8,0.4);else cmpPath(h,h.pos.z<-10.8?K23_PIT_S:K23_PIT,0.5,0.7);return;}
      h.face=-Math.PI/2;if(!(K23.ow>G.time-1.2)){K23.ow=G.time;cmpTap('skill');}return;}
    if(N.formed&&N.zone.state==='low'&&N.held>=N.need){                                                         // прилив: играет тот из своих героев, кто стоит на камне
      const on=['pelageya','yosha'].find(k=>SS.some(s=>s.set&&k23On(s,HERO[k])));if(on){if(!cmpWant(on))return;const st=SS.find(s=>k23On(s,h));if(st&&Math.hypot(h.pos.x-st.x,h.pos.z-st.z)>0.35){cmpGoto(h,st.x,st.z,0.1);return;}if(!(K23.tide>G.time-0.9)){K23.tide=G.time;cmpTap('item');}}return;}
    if(N.done){cmpGoto(h,-7,-2.8,0.5);return;}                                                                 // сундук приехал на берег — подойти (откроется сам)
    const r=k23Place(h,N,[3,2,1,0],K23_V1);
    if(r==='placed'){const o=other(1);if(!SS.some(s=>k23On(s,o)&&!HEROES.some(q=>q.player===0&&k23On(s,q)))&&!(K23.sw>G.time-1.2)){K23.sw=G.time;cmpTap('swap');}}}},
  // второе дело: невод-мост через течение. Пелагея с утёса планирует (держит прыжок) к дальнему камню, бросает клубок; на прилив невод держат трое; по неводу Йоша — за звеном
  {id:'net2',done:()=>W.flags.task>2,run:(h,hh)=>{k23();const D=W.dbg23(),SS=k23Nets(2);if(!SS.length||W.flags.task<2)return 'follow';const N=SS[0].net,pel=HERO.pelageya,yo=HERO.yosha;k23Hold();
    const inChasm=q=>q.pos.y<-1&&q.pos.z<-17&&q.pos.z>-25;
    if(inChasm(h)){cmpPath(h,K23_RAMP,0.5,0.8);return;}                                                          // свалился в пропасть — по горке наверх
    const pOn=SS.find(s=>k23On(s,pel));
    if(N.formed&&N.zone.state==='low'&&N.held>=N.need&&pOn&&pOn.set){if(!cmpWant('pelageya'))return;if(Math.hypot(h.pos.x-pOn.x,h.pos.z-pOn.z)>0.35){cmpGoto(h,pOn.x,pOn.z,0.1);return;}
      if(!(K23.tide>G.time-0.9)){K23.tide=G.time;cmpTap('item');}return;}
    if(!(pOn&&pOn.z<-24&&pOn.set)&&!(N.tight||N.perm)){                                                                  // Пелагея ещё не на дальнем берегу
      if(!cmpWant('pelageya'))return;
      if(pel.pos.z>-17.2){                                                                                      // на утёс и прыжок с планированием
        if(h.pos.y<2.5){cmpPath(h,K23_CLIFF,0.3,0.6);if(h.grounded&&h.blocked)cmpTap('jump');return;}
        if(h.pos.z>-17.0){cmpGoto(h,0,-17.5,0.2);return;}}
      if(!h.grounded){const far=SS.filter(s=>s.z<-24&&!s.set).sort((a,b)=>Math.abs(a.x-h.pos.x)-Math.abs(b.x-h.pos.x))[0]||SS[3];cmpGoto(h,far.x,far.z-1.2,0.1);if(h.vel.y<0)cmpKey('jump',true);return;}
      if(h.pos.z>-17.2&&h.pos.y>2.5){cmpTap('jump');return;}
      const r=k23Place(h,N,[3,2]);return;}
    if(N.tight||N.perm){                                                                                         // невод натянут — Йоша за звеном по неводу
      if(!cmpWant('yosha'))return;if(inChasm(h)){cmpPath(h,K23_RAMP,0.5,0.8);return;}cmpPath(h,K23_LINK,0.4,0.7);return;}}},
  // третье дело: золотая рыбка — четыре кольца по порядку 1–4, все четыре героя на кольцах, прилив; бот ставит своих на 3-е и 4-е
  {id:'net3',done:()=>W.flags.task>3,run:(h,hh)=>{k23();const SS=k23Nets(3);if(!SS.length||W.flags.task<3)return 'follow';const N=SS[0].net;k23Hold();
    if(h.pos.y<-1&&h.pos.z<-17&&h.pos.z>-25){cmpPath(h,K23_RAMP,0.5,0.8);return;}
    if(N.formed&&N.zone.state==='low'&&N.held>=N.need){const on=['pelageya','yosha'].find(k=>SS.some(s=>s.set&&k23On(s,HERO[k])));
      if(on){if(!cmpWant(on))return;const st=SS.find(s=>k23On(s,h));if(st&&Math.hypot(h.pos.x-st.x,h.pos.z-st.z)>0.35){cmpGoto(h,st.x,st.z,0.1);return;}if(!(K23.tide>G.time-0.9)){K23.tide=G.time;cmpTap('item');}}return;}
    const r=k23Place(h,N,[2,3,1,0],K23_V3);
    if(r==='placed'){const o=other(1);if(!SS.some(s=>k23On(s,o)&&!HEROES.some(q=>q.player===0&&k23On(s,q)))&&!(K23.sw>G.time-1.2)){K23.sw=G.time;cmpTap('swap');}}}},
  // протока: оба героя на плот, пока он у причала; течение играет человек; водоворот держит плот — Пелагея Совиным взором находит тайное течение, прыгает на уступ и играет его; дальше вплавь/на плоту до песка
  {id:'raft',done:()=>HERO.pelageya.pos.z<-58&&HERO.yosha.pos.z<-58,run:(h,hh)=>{k23();const D=W.dbg23(),R=D.RAFT,WH=D.WH,Fl=W.flags;if(Fl.task<5||h.pos.z>-31)return 'follow';
    const aboard=q=>q.groundRef===R.col,pel=HERO.pelageya,yo=HERO.yosha;k23Hold();
    const board=q=>{const d=Math.hypot(R.x-q.pos.x,R.z-q.pos.z);cmpGoto(q,R.x,R.z,0.2);if(q.grounded&&d<2.4)cmpTap('jump');};
    if(R.z>-41&&!(aboard(pel)&&aboard(yo))){                                                                    // плот у причала — сначала оба на плот
      const k=!aboard(pel)?'pelageya':'yosha';if(!cmpWant(k))return;board(h);return;}
    if(WH.on&&Fl.task>=5){
      if(!cmpWant('pelageya'))return;
      if(!Fl.hidFound){if(R.z>-44.8&&aboard(pel)&&hd(pel.pos,{x:0,z:-47})<12){if(W.owlT<=0.6&&!(K23.ow>G.time-1.4)){K23.ow=G.time;cmpTap('skill');}}return;}   // водоворот держит плот — взор
      if(Math.hypot(h.pos.x-2.6,h.pos.z+47.5)>0.9){cmpGoto(h,2.6,-47.5,0.2);if(h.grounded&&Math.hypot(R.x-h.pos.x,R.z-h.pos.z)<4.5&&h.pos.y<0.1)cmpTap('jump');return;}   // на уступ
      h.face=-Math.PI/2;if(!(K23.t>G.time-1)){K23.t=G.time;cmpTap('item');}return;}
    // водоворот распался — к песку за плотом
    const need=['pelageya','yosha'].filter(k=>HERO[k].pos.z>=-58),k=need.includes(h.kind)?h.kind:need[0];if(!cmpWant(k))return;
    if(aboard(h)){if(R.z<-55.5)cmpGoto(h,0,-60.5,0.4);return;}cmpGoto(h,0,-60.5,0.4);}},
  // озеро и Ёрш: Йоша — на южный камень невода (по западному берегу), Пелагея — к восточной ракушке: течение на запад (навстречу), играть, пока не кончится
  {id:'lake',done:()=>W.flags.task>=7,run:(h,hh)=>{k23();const D=W.dbg23(),Fl=W.flags;if(Fl.task<6||h.pos.z>-58)return 'follow';
    const NS=D.NS,yo=HERO.yosha;k23Hold();
    const placed=Math.hypot(yo.pos.x-NS[1].x,yo.pos.z-NS[1].z)<0.8;
    if(!placed){if(!cmpWant('yosha'))return;if(Math.hypot(h.pos.x-NS[1].x,h.pos.z-NS[1].z)>3.5)cmpPath(h,K23_WEST,0.5,1.0);else cmpGoto(h,NS[1].x,NS[1].z,0.15);return;}
    if(!cmpWant('pelageya'))return;
    if(Math.hypot(h.pos.x-10.2,h.pos.z+73)>0.7){cmpGoto(h,10.2,-73,0.3);return;}
    h.face=-Math.PI/2;if((D.CE.dir!==-1||D.CE.t<2.5)&&!(K23.t>G.time-1.2)){K23.t=G.time;cmpTap('item');}}},
  // лодка старика: оба героя в лодку, пока она у причала (течение играет человек); заросли рубит Пелагея с носа; у отмели — на берег
  {id:'pier',done:()=>W.flags.task>=11,run:(h,hh)=>{k23();const D=W.dbg23(),R=D.RAFT3,Fl=W.flags;if(Fl.task<9||h.pos.z>-90)return 'follow';
    const aboard=q=>q.groundRef===R.col,pel=HERO.pelageya,yo=HERO.yosha;k23Hold();
    if(R.z>-100.5&&!(aboard(pel)&&aboard(yo))){const k=!aboard(pel)?'pelageya':'yosha';if(!cmpWant(k))return;const d=Math.hypot(R.x-h.pos.x,R.z-h.pos.z);cmpGoto(h,R.x,R.z,0.2);if(h.grounded&&d<2.4)cmpTap('jump');return;}
    const kz=D.KELP.find(k=>!k.gone);
    if(kz){if(!cmpWant('pelageya'))return;if(aboard(h)&&Math.abs(kz.z-h.pos.z)<4.6){h.face=Math.PI;if(!(K23.t>G.time-0.3)){K23.t=G.time;cmpTap('attack');}}return;}    // руби с носа
    if(R.z<-130){const need=['pelageya','yosha'].filter(k=>HERO[k].pos.z>-134.5),k=need.includes(h.kind)?h.kind:need[0];if(!k)return;if(!cmpWant(k))return;cmpGoto(h,k==='pelageya'?-1.2:1.2,-137.5,0.4);if(h.grounded&&h.blocked)cmpTap('jump');}}},
  // отмель: Йоша — в сторону (храп сдувает с середины), Пелагея щекочет нижние усы ударом (Прошка — верхние рогаткой); зевок — в пасть
  {id:'shoal',done:()=>W.flags.task>=12,run:(h,hh)=>{k23();const D=W.dbg23(),Fl=W.flags;if(Fl.task<11||h.pos.z>-134)return 'follow';
    const yo=HERO.yosha,W2=D.WHI;k23Hold();
    if(Math.abs(yo.pos.x)<6||yo.pos.z>-136){if(!cmpWant('yosha'))return;cmpGoto(h,9,-139,0.4);return;}              // Йоша — в сторону
    if(!cmpWant('pelageya'))return;
    const lo=[W2[0],W2[1]].filter(q=>q.t<=0).sort((a,b)=>Math.hypot(a.x-h.pos.x,a.z-h.pos.z)-Math.hypot(b.x-h.pos.x,b.z-h.pos.z))[0];
    if(!lo){return;}
    const tx=lo.x*0.92,tz=-145.4;if(Math.hypot(h.pos.x-tx,h.pos.z-tz)>0.6){cmpGoto(h,tx,tz,0.3);return;}
    h.face=Math.atan2(lo.x-h.pos.x,lo.z-h.pos.z);if(!(K23.t>G.time-0.25)){K23.t=G.time;cmpTap('attack');}}},
  {id:'mouth',done:()=>W.flags.task>=13,run:h=>{const Fl=W.flags;if(Fl.task<12)return 'follow';cmpGoto(h,0,-149,0.3);}},
]);
