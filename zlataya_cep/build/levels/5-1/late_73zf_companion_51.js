/* ============================== РЕЛИЗ final06 · 5-1 «СУНДУК НА ДУБЕ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из proto/levels/5-1.js (W.dbg51: коршун, дыхание Головы, хрусталики, замки, кольца, зеркальце…). В мире 5 кнопка вещи берёт вещь по знаку рядом (клубок, гусли, перо, клещи).
// Бот идёт по стадиям уровня (F.stage): ждёт, пока их откроет человек, и делает свою половину — гусли-волну на коршуна и добивание, щекотку Голове, хрусталики… (дальше — по ярусам дуба и бою с Лихом).
const K51={w:null,t:{}};
CMP.k51=K51;
const k51=()=>{if(K51.w!==W){K51.w=W;K51.t={};}return K51;};
const k51Tap=(K,k,gap,act)=>{if(!(K.t[k]>G.time-gap)){K.t[k]=G.time;cmpTap(act);return true;}return false;};
const k51Spd=h=>Math.hypot(h.vel.x,h.vel.z);
const K51_AB=[[2.9,18.2],[3,14],[3,12.2]],K51_BC=[[1.8,10],[3,9.4],[3,5],[3,2.6],[3.4,1.2]];
const k51Face=(h,p)=>{h.face=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);};
const K51_ORD=['introCine','bay','kiteCine','kite','swanCine','toHead','headCine','head','sneeze','headCine2','toLagoon','lagoonCine','lagoon','belkaCine','meadow','clew','cross1','well','pero','crown','cross2','forge','chainCine','skinsCine','escape','bossCine','boss1','boss12','boss2','boss2done','boss23','boss3','bossWake','bossEnd','end','chest','hareCine'];
const k51Past=st=>K51_ORD.indexOf(W.flags.stage)>K51_ORD.indexOf(st);
const K51_TH={x:-4.4,z:-25.4},K51_STK={x:0.4,z:-29.8};                                                       // кольцо Игрока 2 на ярусе клубка и колышек напротив
const K51_B1=[[8,-33],[8.3,-35.5],[8.2,-38.4]],K51_BAIT1={x:8.2,z:-38.4};                                     // переправа 1: кольцо-приманка справа,
const K51_D1=[[-8.3,-33],[-8.5,-36],[-8.5,-42],[-8.5,-48],[-7,-52.5],[-6,-56]];                              // а обход — слева, мимо Лиха
const K51_PERO=[[7,-69],[7,-75],[7,-81],[7,-87.5]],K51_CROWN=[[3,-93],[1,-99],[1,-108],[1,-114]];            // тенемостки справа; крона и корень вниз
const K51_B2=[[3,-120],[3.5,-127.8],[6.9,-127.9]],K51_BAIT2={x:6.9,z:-127.9};                                 // переправа 2: приманка у щели в изгороди,
const K51_S2=[[2,-131],[0,-136],[1,-145],[10,-145],[20,-145],[26,-141]];                                      // обход — по южной кромке к горну
const k51Wait=x=>x.pos.x>-10&&x.pos.x<-2&&x.pos.z<-54.3&&x.pos.z>-64&&x.pos.y>3;                             // колодец в дупле
const k51Dodge=(K,h)=>{for(const L of W.likhos){const r=L.reach;if(r&&r.h===h&&r.t>0.3&&r.t<0.9)k51Tap(K,'roll',0.8,'roll');}};   // Лихо тянет лапу — кувырок
const k51Other=h=>h===HERO.pelageya?HERO.yosha:HERO.pelageya;
CMP.route('5-1',[
  // коршун бьёт Лебедь: волна гуслями на «целится»; упал — бить вместе с человеком
  {id:'kite',done:()=>!!W.flags.kiteDone||['toHead','headCine','head','sneeze'].includes(W.flags.stage),run:(h,hh)=>{const K=k51(),F=W.flags;if(G.cine||F.stage!=='kite')return 'follow';
    const KT=W.dbg51.KT;h.following=false;
    if(KT.st==='ground'){if(hd(h.pos,KT.pos)>2.0){cmpGoto(h,KT.pos.x-1.5,KT.pos.z+(h.pos.z>KT.pos.z?1.2:-1.2),0.3);return;}k51Face(h,KT.pos);k51Tap(K,'hit',0.4,'attack');return;}
    const sp={x:9,z:65.6};if(hd(h.pos,sp)>0.7){cmpGoto(h,sp.x,sp.z,0.3);return;}
    if(KT.st==='aim'&&KT.t>1.0&&KT.waveCd<=0)k51Tap(K,'wave',1.7,'item');}},
  // Голова дует: за щитом Потапа; на вдохе — под усы и пером пощекотать нос (Йоша)
  {id:'head',done:()=>!!W.flags.headDone||['toLagoon','lagoonCine','lagoon'].includes(W.flags.stage),run:(h,hh)=>{const K=k51(),F=W.flags;if(G.cine||F.stage!=='head')return 'follow';
    if(!cmpWant('yosha'))return;h.following=false;const po=HERO.potap,HB=W.dbg51.HB,tick={x:1,z:38.2};
    const under=hd(h.pos,tick)<0.6;
    if(under){if(!h.lit)k51Tap(K,'lit',0.8,'item');return;}                                                                       // под усами: ветра нет, перо — зажечь и щекотать
    if(HB.ph==='in'&&po.pos.z<41.5&&hd(h.pos,tick)<5){cmpGoto(h,tick.x,tick.z,0.15);return;}                                   // вдох — рывок под усы
    const tz=Math.max(po.pos.z+1.3,39.8);cmpGoto(h,po.pos.x,tz,0.35);}},                                                          // иначе — за спиной Потапа, под его щитом
  // залив: человек светит у первого хрусталика; бот — на островок, поворачивает средний, на тот берег и светит у третьего
  {id:'lagoon',done:()=>!!W.flags.lagoonDone||['belkaCine','meadow','clew'].includes(W.flags.stage),run:(h,hh)=>{const K=k51(),F=W.flags;if(G.cine||F.stage!=='lagoon')return 'follow';
    const CR=W.dbg51.CR;h.following=false;
    if(!CR.aLit&&h.pos.z>18)return 'follow';                                                                                       // пока человек не засветил первый — ждём рядом
    if(h.pos.z>12.6){if(CR.aLit||h.pos.z<17){cmpPath(h,K51_AB,0.4,1.0);return;}return 'follow';}                                      // по мостку от А к Б (свет А)
    if(!CR.axisNS&&h.pos.z>9.8){const b={x:1.8,z:11.4};if(hd(h.pos,b)>0.5){cmpGoto(h,b.x,b.z,0.25);return;}h.face=Math.atan2(3-h.pos.x,11-h.pos.z);k51Tap(K,'rot',0.7,'attack');return;}   // хрусталик Б — повернуть
    if(h.pos.z>1.4){cmpPath(h,K51_BC,0.4,0.9);return;}                                          // к хрусталику В
    const c={x:3.2,z:0.6};if(hd(h.pos,c)>0.5){cmpGoto(h,c.x,c.z,0.25);return;}if(!h.lit)k51Tap(K,'lit',0.8,'item');}},                 // светит у В — пока человек переходит
  // луг: хамелей у знака пера уходит во тьму — рядом с ним нужен свет; бот (перо Игрока 2 по знаку у дороги) светит, пока человек дерётся; сам бой — общий
  {id:'meadow',first:true,done:()=>!!W.flags.meadowClear||k51Past('clew'),run:(h,hh)=>{const K=k51(),F=W.flags;if(G.cine||(F.stage!=='meadow'&&F.stage!=='clew'))return 'follow';
    const ham=W.enemies.find(e=>e.alive&&e.kind==='hameley');if(!ham||ham.mode!=='pero'||ham.litNow||hd(ham.pos,hh.pos)>14)return 'follow';
    h.following=false;if(h.lit)return 'follow';                                                                                  // уже со светом — бой общий (свет держится у знака)
    const sg=W.signs.find(q=>q.item==='pero'&&hd(q,ham.pos)<14&&(!q.on||q.on()));if(!sg)return 'follow';
    if(hd(h.pos,sg)>1.2){cmpGoto(h,sg.x,sg.z,0.5);return;}k51Tap(K,'lit',0.8,'item');}},
  // ярус клубка: колышек напротив — клубок к нему; вторая струна (человека) даёт паутинку, прыжок с неё — наверх, оба героя; потом замок клубка — удар
  {id:'clew',done:()=>k51Past('cross1')||([HERO.pelageya,HERO.yosha].every(x=>x.pos.y>2.5)&&!!W.dbg51.lk1.open),run:(h,hh)=>{const K=k51(),F=W.flags;if(G.cine||(F.stage!=='clew'&&F.stage!=='cross1'))return 'follow';
    const D=W.dbg51,hs=[HERO.pelageya,HERO.yosha],dn=hs.filter(x=>x.pos.y<=2.5);
    for(const x of hs)if(x!==h)x.following=false;h.following=false;
    if(dn.length){const x=dn.includes(h)?h:dn[0];if(!cmpWant(x.kind))return;                                                  // кто ещё внизу — тот и лезет
      if(!W.threads.some(t=>t.owner===1&&!t.ret)){if(hd(h.pos,K51_TH)>0.45){cmpGoto(h,K51_TH.x,K51_TH.z,0.25);return;}
        if(k51Spd(h)<0.6){k51Face(h,K51_STK);k51Tap(K,'throw',1.2,'item');}return;}
      const w=W.webs[0];if(!w)return;                                                                                         // ждём клубок человека
      if(hd(h.pos,w)>0.6){cmpGoto(h,w.x,w.z,0.3);return;}if(h.grounded)k51Tap(K,'web',0.5,'jump');return;}
    if(D.lk1.open)return;const sp={x:1.9,z:-30.8};                                                                           // все наверху — замок клубка
    if(hd(h.pos,sp)>0.5){cmpGoto(h,sp.x,sp.z,0.3);return;}k51Face(h,D.lk1);k51Tap(K,'lock',0.5,'attack');}},
  // переправа 1 и колодец: один герой — в кольцо-приманку (Лихо глядит на него), второй — в обход слева; потом «Ко мне!», прилив гуслями, замок гуслей
  {id:'cross1',done:()=>k51Past('well'),run:(h,hh)=>{const K=k51(),F=W.flags,st=F.stage;if(G.cine||(st!=='cross1'&&st!=='well'))return 'follow';
    const D=W.dbg51;if(!K.bait)K.bait=h.kind;const B=HERO[K.bait],R=k51Other(B),ring=x=>hd(x.pos,K51_BAIT1)<0.9&&x.pos.y>3,past=x=>x.pos.z<-50||k51Wait(x);
    k51Dodge(K,h);
    if(!K.placed){if(h!==B){B.following=false;R.following=false;cmpWant(B.kind);return;}
      if(!ring(h)){B.following=false;R.following=false;cmpPath(h,K51_B1,0.4,0.9);return;}K.placed=true;}
    if(!cmpWant(R.kind))return;R.following=false;
    const others=HEROES.filter(x=>x!==B&&!ring(x));
    if(ring(B)){if(others.every(past))cmpCall();else B.following=false;}                                                       // приманку держим в кольце, пока остальные не прошли
    if(st==='cross1'){cmpPath(h,K51_D1,0.4,1.0);return;}
    // колодец: прилив — когда все (кроме оставленных в кольцах) в колодце
    const W2=D.well,sg={x:-6,z:-58.5},all=HEROES.filter(x=>!ring(x)).every(k51Wait);
    if(W2.state==='low'){if(hd(h.pos,sg)>0.9){cmpGoto(h,sg.x,sg.z,0.4);return;}if(all)k51Tap(K,'tide',1.6,'item');return;}
    if(W2.t<1)return;                                                                                                             // вода ещё поднимается
    const to={x:-6,z:-66.2};if(hd(h.pos,to)>0.7){cmpGoto(h,to.x,to.z,0.4);return;}
    if(!D.lk2.open){k51Face(h,D.lk2);k51Tap(K,'lock',0.5,'attack');}}},
  // ярус пера: Игроку 2 — тенемостки справа (перо не жечь); свой замок в конце — удар; потом крона и корень вниз
  {id:'pero',done:()=>k51Past('crown'),run:(h,hh)=>{const K=k51(),F=W.flags,st=F.stage;if(G.cine||(st!=='pero'&&st!=='crown'))return 'follow';
    const D=W.dbg51;h.following=false;
    if(st==='pero'){const end={x:7,z:-87.5};if(D.lk3b.open)return;
      if(hd(h.pos,end)>0.6){cmpPath(h,K51_PERO,0.35,0.6);return;}k51Face(h,D.lk3b);k51Tap(K,'lock',0.5,'attack');return;}
    cmpPath(h,K51_CROWN,0.5,1.0);}},
  // переправа 2 и горн: приманка у щели, второй герой — по южной кромке к горну; пугала — общий бой; потом каждому своя скважина — ключ клещами
  {id:'cross2',done:()=>k51Past('forge'),run:(h,hh)=>{const K=k51(),F=W.flags,st=F.stage;if(G.cine||(st!=='cross2'&&st!=='forge'))return 'follow';
    const D=W.dbg51;if(!K.bait2)K.bait2=h.kind;const B=HERO[K.bait2],R=k51Other(B),ring=x=>hd(x.pos,K51_BAIT2)<0.9;
    k51Dodge(K,h);
    if(h.pos.x<20){                                                                                                              // ещё не у горна: приманка у щели, второй герой — в обход
      if(!K.placed2){if(h!==B){B.following=false;R.following=false;cmpWant(B.kind);return;}
        if(!ring(h)){B.following=false;R.following=false;cmpPath(h,K51_B2,0.4,0.9);return;}K.placed2=true;}
      B.following=false;if(!cmpWant(R.kind))return;R.following=false;cmpPath(h,K51_S2,0.4,1.0);return;}
    if(st!=='forge')return;
    if(!F.forgeClear){const al=W.enemies.filter(e=>e.alive);if(!al.length)return;return 'follow';}
    const sock=W.sockets.find(q=>Math.abs(q.pos.x-25.85)<0.2&&Math.abs(q.pos.z+132.8)<0.2);if(sock&&sock.item)return;                  // свой ключ уже в скважине
    const car=heroCarry(h);
    if(!car){const ks=W.hots.filter(i=>i.kind==='kluch'&&!i.gone&&!i.carrier&&!i.socket).sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos));const kk=ks[0];if(!kk)return;
      if(hd(kk.pos,h.pos)>1.0){cmpGoto(h,kk.pos.x,kk.pos.z+0.9,0.4);return;}k51Face(h,kk.pos);k51Tap(K,'take',0.5,'item');return;}
    const sp={x:26.1,z:-131.4};                                                                                                   // скважина Игрока 2 — справа, лицом к замку
    if(hd(h.pos,sp)>0.4||k51Spd(h)>1.0){cmpGoto(h,sp.x,sp.z,0.2);return;}h.face=Math.PI;k51Tap(K,'put',0.6,'item');}},
  // побег в шкурах: идём с отарой (внутри её круга Лихо не видит); пока Лихо считает овец — перебежка ко второй отаре
  {id:'escape',done:()=>k51Past('escape'),run:(h,hh)=>{const K=k51(),F=W.flags;if(G.cine||F.stage!=='escape')return 'follow';
    const D=W.dbg51,FA=D.flockA,FB=D.flockB,L=D.likho2;
    if(!K.ph||(K.ph!=='A'&&FA.k<FA.path.length-1))K.ph='A';                                                                      // поймали — первую отару вернули к началу
    if(K.ph==='A'){cmpGoto(h,FA.pos.x+0.66,FA.pos.z+0.55,0.25);if(FA.k>=FA.path.length-1&&L.counting)K.ph='gap';return;}
    if(K.ph==='gap'){cmpGoto(h,FB.pos.x+0.66,FB.pos.z,0.25);if(hd(h.pos,FB.pos)<FB.r-0.5)K.ph='B';return;}
    cmpGoto(h,FB.pos.x+0.55,FB.pos.z+0.5,0.25);}},
  // бой с Лихом (без ударов): зеркальце — на линию взгляда спиной к Лиху; овечки — прыжок через бревно по очереди; колыбельная гуслями у головы (замри, когда приоткроет глаз)
  {id:'boss',done:()=>k51Past('end'),run:(h,hh)=>{const K=k51(),F=W.flags,st=F.stage;if(G.cine||!/^boss/.test(st))return 'follow';
    const D=W.dbg51,L=D.likho2,B=D.B;h.following=false;
    if(st==='boss1'){const M=D.MR,e=likhoEye(L);
      if(M.holder!==h){if(M.holder&&M.holder.player===1){if(hd(h.pos,M.holder.pos)>1.2){cmpGoto(h,M.holder.pos.x,M.holder.pos.z+1,0.4);return;}k51Tap(K,'mir',0.8,'item');return;}
        if(M.holder)return;                                                                                                       // зеркальце держит человек
        if(hd(h.pos,M.rest)>1.2){cmpGoto(h,M.rest.x,M.rest.z+0.8,0.4);return;}k51Face(h,M.rest);k51Tap(K,'mir',0.8,'item');return;}
      const dir=likhoDir(L);let dx=dir.x,dz=dir.z;const n=Math.hypot(dx,dz)||1;dx/=n;dz/=n;
      const tg=L.tgt,dd=tg?Math.max(3.8,Math.min(7,0.45*hd(e,tg.pos))):5.2,px=e.x+dx*dd,pz=e.z+dz*dd;
      if(hd(h.pos,{x:px,z:pz})>0.5)cmpGoto(h,px,pz,0.3);h.face=Math.atan2(h.pos.x-e.x,h.pos.z-e.z);return;}
    if(st==='boss2'){const LOGZ=D.LOGZ,side=h.pos.z>LOGZ?1:-1,hx=hh.pos.x,sx=hx<-3.5?-1.8:-5,sp={x:sx,z:LOGZ+side*1.3};
      const turn=(B.lastBy&&B.lastBy!==h&&G.time-B.lastT>0.9)||(!B.lastBy&&G.time-B.lastT>2.2);
      if(K.jmp&&G.time-K.jmp<0.9){cmpKey(side>0?'up':'down',true);if(G.time-K.jmp>0.1&&h.grounded)cmpTap('jump');return;}
      if(hd(h.pos,sp)>0.5||k51Spd(h)>1.0){cmpGoto(h,sp.x,sp.z,0.25);return;}
      if(turn&&h.grounded)K.jmp=G.time;return;}
    if(st==='boss3'){if(B.warn>0||B.peek>0)return;                                                                                  // Лихо приоткрыл глаз — замри
      const sg={x:D.lullSign.x,z:D.lullSign.z+1.4};if(hd(h.pos,sg)>0.6){cmpGoto(h,sg.x,sg.z,0.3);return;}if(B.sleep<0.95)k51Tap(K,'lull',1.4,'item');}}},
  // сундук упал закрытым: «Раз-два — взяли!» — удар у крышки вместе с человеком (его удар — отзываемся сразу)
  {id:'chest',done:()=>k51Past('chest')||!!W.flags.out,run:(h,hh)=>{const K=k51(),F=W.flags;if(G.cine||F.stage!=='chest')return 'follow';
    const D=W.dbg51,C=D.CHEST_REST;h.following=false;const sp={x:C.x+1.4,z:C.z+1.3};
    if(hd(h.pos,sp)>0.6){cmpGoto(h,sp.x,sp.z,0.3);return;}k51Face(h,C);
    if(G.time-F.lift[0]<1.2){k51Tap(K,'lift',0.45,'attack');return;}
    if(G.time-(K.liftT||0)>4){K.liftT=G.time;cmpTap('attack');}}}
]);
