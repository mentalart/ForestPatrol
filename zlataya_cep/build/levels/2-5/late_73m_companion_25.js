/* ============================== РЕЛИЗ final06 · 2-5 «КИТЕЖ ЗВОНИТ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Пелагея плывёт к колоколу на островке и «кричит» (скриптованная неудача), все в колодец — отлив, потом прилив наверх; низкая и двойная звонницы — своя, верхняя, на приливе (удар крылом);
// мосты-призраки: звонит у колокола (гусли) в паре с человеком; Светлояр: Пелагея идёт по невидимым камням, пока человек на Феврониином; напев Садко — свои ноты; главный колокол — прыжок на «ТРИ».
// Положения — из proto/levels/2-5.js и build/levels/2-5/late_99i_k25.js.
const K25={w:null,t:0,ow:0,wl:0,tide:0,sw:0,cr:0,bell:0,stp:null,go:false,lk:0,A:null};
const k25=()=>{if(K25.w!==W){K25.w=W;K25.t=0;K25.ow=0;K25.wl=0;K25.tide=0;K25.sw=0;K25.cr=0;K25.bell=0;K25.stp=null;K25.go=false;K25.lk=0;K25.A=null;}return K25;};
const k25Z=(x0,x1,z0,z1)=>W.waters.find(z=>z.minx===x0&&z.maxx===x1&&z.minz===z0&&z.maxz===z1);
const linkTaken25=()=>!!(W.items&&W.items.find(it=>it.taken&&Math.abs(it.pos.x+2.8)<0.5&&Math.abs(it.pos.z+24)<0.5))||W.flags.given;
const k25GW=()=>k25Z(-9,9,-26,-8);
// вода зоны z должна быть want: сыграть гусли в зоне (раз в 0,9 с); true — уже такая и устоялась
const k25Water=(h,z,want)=>{if(z.state===want)return z.t>=1;if(inZone(z,h,1.3)&&!(K25.tide>G.time-0.9)){K25.tide=G.time;cmpTap('item');}return false;};
CMP.route('2-5',[
  // колокол на островке: Пелагея плывёт к нему и «кричит» (не получается — ролик, колокол тонет вместе со звеном)
  {id:'voice',done:()=>{const v=W.flags.voice;return v==='sunk'||v==='sinking'||!!W.flags.given;},run:h=>{k25();const F=W.flags;if(h.pos.z>8)return 'follow';
    if(!cmpWant('pelageya'))return;
    if(F.voice==='ready'){if(Math.hypot(h.pos.x,h.pos.z+17)<2.2&&!(K25.ow>G.time-1.2)){K25.ow=G.time;cmpTap('skill');}return;}
    cmpGoto(h,0,-17,0.4);}},
  // колодец: оба героя в воду (с островка — вплавь), отлив — на дно; звено со дна (его подымет и человек), после ролика — прилив наверх и в открытую решётку
  {id:'well',done:()=>W.flags.given===true&&k25GW().state==='high'&&HERO.pelageya.pos.z<-27.5&&HERO.yosha.pos.z<-27.5,run:h=>{k25();const F=W.flags,GW=k25GW();if(F.voice!=='sunk'&&F.given!==true)return 'follow';
    const inW=q=>q.pos.x>-9&&q.pos.x<9&&q.pos.z<-8&&q.pos.z>-26&&hd(q.pos,{x:0,z:-17})>2.5;
    if(F.given===true){                                                                                         // решётка открыта — прилив, наверх
      if(GW.state==='low'){if(h.pos.y<-4){k25Water(h,GW,'high');}else cmpGoto(h,0,-12,0.5);return;}
      if(GW.state==='high'&&h.pos.y>-2){const need=['pelageya','yosha'].filter(k=>HERO[k].pos.z>-27.5),k=need.includes(h.kind)?h.kind:need[0];if(k&&!cmpWant(k))return;cmpGoto(h,0,-29,0.4);if(h.grounded&&h.blocked)cmpTap('jump');}return;}
    if(F.given)return 'follow';                                                                                 // ролик «звено отдаёт»
    if(GW.state==='high'){                                                                                      // сначала оба в воду
      const o=other(1);k25GW();
      if(!inW(h)){cmpGoto(h,h.kind==='pelageya'?3.5:-3.5,-13.5,0.4);return;}
      if(!inW(o)){if(!(K25.sw>G.time-1)){K25.sw=G.time;cmpTap('swap');}return;}
      k25Water(h,GW,'low');return;}
    // отлив: на дно, к звену
    if(h.pos.y>-4){cmpGoto(h,0,-13,0.5);return;}
    if(!linkTaken25()){cmpGoto(h,-2.8,-23.2,0.3);}}},
  // низкая звонница, правая половина: прилив — доплыть до колокола на высоте и ударить крылом (левую — рогаткой Прошки в отлив — делает человек)
  {id:'tier1',done:()=>!!W.flags.b2,run:h=>{k25();const F=W.flags,R=k25Z(1,9,-44,-30);if(!R||F.given!==true||h.pos.z>-26||h.pos.z<-46)return 'follow';
    if(R.state!=='high'){if(!inZone(R,h,1.3)){cmpGoto(h,6,-29.2,0.4);return;}k25Water(h,R,'high');return;}
    if(R.t<1)return;
    if(Math.hypot(h.pos.x-5.5,h.pos.z+35.2)>1.4){cmpGoto(h,5.5,-35.2,0.4);return;}
    h.face=Math.atan2(5.5-h.pos.x,-37-h.pos.z);if(!(K25.t>G.time-0.5)){K25.t=G.time;cmpTap('attack');}}},
  // двойная звонница, верхняя (справа): прилив, доплыть, ударить, когда друг готов (его отлив сыгран) — за пять секунд он успеет выстрелить
  {id:'tier2',done:()=>!!W.flags.b3,run:h=>{k25();const F=W.flags,R=k25Z(1,9,-68,-56),L=k25Z(-9,-1,-68,-56);if(!R||!F.b2||h.pos.z>-52||h.pos.z<-70)return 'follow';
    if(R.state!=='high'){if(!inZone(R,h,1.3)){cmpGoto(h,6,-55.0,0.4);return;}k25Water(h,R,'high');return;}
    if(R.t<1)return;
    if(Math.hypot(h.pos.x-5.5,h.pos.z+60.2)>1.4){cmpGoto(h,5.5,-60.2,0.4);return;}
    const ready=F.dbL||(L.state==='low'&&L.t>=1);
    if(ready&&!F.dbR){h.face=Math.atan2(5.5-h.pos.x,-62-h.pos.z);if(!(K25.t>G.time-0.5)){K25.t=G.time;cmpTap('attack');}}}},
  // мосты-призраки: звон кажет мост на другой стороне, звенит 3,5 с (сменил героя — оставленный доигрывает 15 с). Бот справляется двумя героями: первый звонит у ближнего колокола и уступает управление —
  // второй идёт по правому мосту; за провалом он звонит в дальний и уступает — первый идёт по левому; потом звонит в дальний, пока человек не перейдёт по левому мосту
  {id:'bridge',done:()=>{const c=q=>q.pos.z<-98.4&&q.pos.y>5;return !!W.flags.zvon&&c(HERO.pelageya)&&c(HERO.yosha)&&c(active(0));},run:(h,hh)=>{k25();const D=W.dbg25(),F=W.flags;if(!F.b3||!F.zvon||h.pos.z>-70)return 'follow';
    const c=q=>q.pos.z<-98.4&&q.pos.y>5,o=other(1);k25();
    const ring=(x,z,bell)=>{if(Math.hypot(h.pos.x-x,h.pos.z-z)>0.8){cmpGoto(h,x,z,0.35);return false;}if(bell.hum<1.2&&!(K25.t>G.time-1.0)){K25.t=G.time;cmpTap('item');return false;}return bell.hum>=1.2;};
    const swap=()=>{if(!(K25.sw>G.time-1.0)){K25.sw=G.time;cmpTap('swap');}};
    if(!c(h)&&!c(o)){                                                                                           // оба ещё здесь: первый звонит у ближнего колокола и передаёт управление
      if(!K25.A)K25.A=h.kind;if(h.kind===K25.A){if(ring(-6.4,-78.3,D.BA))swap();return;}
      if(!D.brR.solid){cmpGoto(h,4.6,-78.8,0.4);return;}cmpGoto(h,4.6,-99.8,0.3);return;}
    if(c(h)&&!c(o)){                                                                                            // второй за провалом: звонит в дальний и уступает управление первому
      if(h.kind!==K25.A){if(ring(6.4,-100.4,D.BB))swap();return;}
      if(!D.brL.solid){cmpGoto(h,-4.6,-78.8,0.4);return;}cmpGoto(h,-4.6,-99.8,0.3);return;}
    if(!c(h)&&c(o)){if(h.kind!==K25.A){swap();return;}if(!D.brL.solid){cmpGoto(h,-4.6,-78.8,0.4);return;}cmpGoto(h,-4.6,-99.8,0.3);return;}
    // оба за провалом: звонит в дальний, пока человек не перейдёт
    if(!c(active(0))&&G.time-(K25.bell||(K25.bell=G.time))<45){ring(6.4,-100.4,D.BB);return;}
    return 'follow';}},
  // Светлояр: камни-невидимки (в воде их кажет отражение, пока человек стоит на Феврониином камне) — идёт по ним, потом встаёт на дальний камень отражения, пока человек идёт
  {id:'lake',done:()=>active(1).pos.z<-120.2&&active(0).pos.z<-120.2&&active(1).pos.y>5&&active(0).pos.y>5,run:(h,hh)=>{k25();const D=W.dbg25();if(!W.flags.zvon||h.pos.z>-98||h.pos.y<5)return 'follow';
    if(!K25.stp)K25.stp=D.STN.filter(s=>!s.side).map(s=>[s.x,s.z]).concat([[1.6,-121.3]]);
    if(h.pos.z>-102.5){cmpGoto(h,-1.5,-101.6,0.4);if(Math.hypot(h.pos.x+1.5,h.pos.z+101.6)>0.9)return;}
    if(h.pos.z>-120.2){if(!W.flags.look&&!K25.go&&G.time-(K25.lk||(K25.lk=G.time))<25)return;K25.go=true;cmpPath(h,K25.stp,0.3,0.55);return;}   // идёт по камням (ждёт отражения, если человек на камне)
    if(Math.hypot(h.pos.x-6.6,h.pos.z+121.6)>0.8){cmpGoto(h,6.6,-121.6,0.3);return;}}},                          // на дальнем камне отражения — человек идёт
  // напев Садко: дзинь (человек), дилинь (бот), дон (человек), дон (бот): бот звонит свои, только когда очередь за ними, иначе напев собьётся
  {id:'tune',done:()=>!!W.flags.tune,run:(h,hh)=>{k25();const D=W.dbg25(),TN=D.TN;if(!W.flags.zvon||h.pos.z>-121||h.pos.z<-146||h.pos.y<5)return 'follow';
    const n=TN.i<2?1:3,S=D.TB[n].shells[0],x=S.x,z=S.z;
    if(Math.hypot(h.pos.x-x,h.pos.z-(z+0.5))>0.7){cmpGoto(h,x,z+0.5,0.3);return;}
    if(TN.i===n&&!(K25.t>G.time-0.8)){K25.t=G.time;cmpTap('item');}}},
  // стычка у главного колокола: тягун прячется под водой — отлив гуслями (на мели его бьют); зарылся в ил — прилив, потом снова отлив; тягуна нет — прилив обратно (всплыть со дна к кругу под колоколом). Остальное — общий бой
  {id:'tyagun',first:true,done:()=>{const A=W.dbg25().arena,MZ=k25Z(-6,6,-156,-146);return !!A.cleared&&!!MZ&&MZ.state==='high';},run:h=>{k25();const D=W.dbg25(),A=D.arena;if(!A.started)return 'follow';
    const ty=W.enemies.find(e=>e.alive&&e.kind==='tyagun'),MZ=k25Z(-6,6,-156,-146);if(!MZ||!inZone(MZ,h,1.3))return 'follow';
    const want=ty?(ty.silt?'high':'low'):'high';
    if(MZ.state!==want&&MZ.t>=1&&!(K25.tide>G.time-1.6)){K25.tide=G.time;cmpTap('item');return;}
    return 'follow';}},
  // главный колокол, язык повешен: все четверо на круг под колоколом (бот — на два свободных места, смена героя), на «ТРИ» — прыжок вместе
  {id:'spots',done:()=>!!W.flags.bom||!!W.flags.bomWait,run:(h,hh)=>{k25();const D=W.dbg25(),F=W.flags,A=D.arena;if(!A.cleared||!F.tongueIn||h.pos.y<5)return 'follow';
    const sp=D.spots,on=(s,q)=>Math.hypot(q.pos.x-s.x,q.pos.z-s.z)<0.7&&q.pos.y>6.3&&q.pos.y<9.5,o=other(1);other(1).following=false;
    const humOn=s=>HEROES.some(q=>q.player===0&&on(s,q)),oS=sp.find(s=>on(s,o)&&!humOn(s)),me=sp.find(s=>s!==oS&&on(s,h)&&!humOn(s));
    if(!me){const free=sp.filter(s=>s!==oS&&!humOn(s)).sort((a,b)=>Math.hypot(a.x-h.pos.x,a.z-h.pos.z)-Math.hypot(b.x-h.pos.x,b.z-h.pos.z))[0];if(free){cmpGoto(h,free.x,free.z,0.15);if(h.grounded&&h.blocked)cmpTap('jump');}return;}
    if(Math.hypot(h.pos.x-me.x,h.pos.z-me.z)>0.3){cmpGoto(h,me.x,me.z,0.1);return;}
    if(!oS||!sp.every(s=>s.hero)){if(!oS&&!(K25.sw>G.time-1.2)){K25.sw=G.time;cmpTap('swap');}return;}      // второй герой ещё не на круге — передать ему управление
    const C=F.cnt;if(C&&C.t>=2.0&&C.p[1]===null&&!(K25.t>G.time-0.5)){K25.t=G.time;cmpTap('jump');}}},
]);
