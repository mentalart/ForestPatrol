/* ============================== РЕЛИЗ final06 · 4-1 «КУЗНЯ КУЗЬМЫ И ДЕМЬЯНА»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из proto/levels/4-1.js. Ковка клещей: Пелагея прыгает на рычаг мехов (жар), а Йоша, оставленный у корыта, закаливает сам (через 5 с);
// чугунные болваны: Йоша поливает горячие латы, клещами (R/;) срывают остывшие, открытых бьют; большая заготовка: оба берут клещами по концу и несут на наковальню;
// ковка вдвоём: на плите «БИТЬ» — удар на раз-два-три, на плите «ДЕРЖАТЬ» — поворот клещами на четыре, на середине меняются; кольцо закаляет Йоша.
// Слиток, гвоздь и уголь (двери, подъёмник, большой горн) носит человек — Прошка.
const K41={w:null,t:0,jt:0,at:0,wt:0,role:null,rt:0,half:0};
CMP.k41=K41;
const k41=()=>{if(K41.w!==W){Object.assign(K41,{w:W,t:0,jt:0,at:0,wt:0,role:null,rt:0,half:0});}return K41;};
const k41Tap=(K,k,gap,act)=>{if(!(K[k]>G.time-gap)){K[k]=G.time;cmpTap(act);return true;}return false;};
const K41_LEVER={x:-7.1,z:-13.8},K41_ANV={x:0,z:-50.8},K41_STRIKE={x:1.2,z:-49.1},K41_HOLD={x:-2.4,z:-50.8};
const k41Ends=()=>{const B=W.BIG,c=Math.cos(B.ang),s=Math.sin(B.ang);return [{x:B.pos.x-1.1*c,z:B.pos.z+1.1*s},{x:B.pos.x+1.1*c,z:B.pos.z-1.1*s}];};
CMP.route('4-1',[
  // ковка клещей: Пелагея прыгает на рычаг мехов (поддерживает жар), Йоша остаётся у корыта и закаливает сам
  {id:'forge',done:()=>!!W.abil.kleshi,run:(h,hh)=>{const K=k41(),F=W.flags,FG=W.FG;if(F.stage!=='forge')return 'follow';if(!cmpWant('pelageya'))return;
    const Y=HERO.yosha;Y.following=false;
    if(hd(h.pos,K41_LEVER)>0.5){cmpGoto(h,K41_LEVER.x,K41_LEVER.z,0.3);return;}
    if(FG.heat<0.85&&h.grounded)k41Tap(K,'jt',0.5,'jump');}},
  // чугунные болваны: Йоша поливает горячие латы, срывает остывшие (клещи), бьёт открытых; от замаха — щит/кувырок (общий бой)
  {id:'golems',first:true,done:()=>!!W.flags.cleared,run:(h,hh)=>{const K=k41(),F=W.flags;if(!F.fight||G.cine)return 'follow';
    const al=W.enemies.filter(e=>e.alive&&e.state!=='dying');if(!al.length)return 'follow';if(!cmpWant('yosha'))return;
    if(al.some(e=>e.state==='wind'&&e.tgt===h&&hd(e.pos,h.pos)<7)){cmpFight(h,hh,al.filter(e=>hd(e.pos,h.pos)<9),TIMING[players[1].path]||TIMING.mid);return 'x';}
    const nr=l=>l.sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos))[0];
    const hot=al.filter(e=>e.armor==='hot'),cool=al.filter(e=>e.armor==='cool'),off=al.filter(e=>e.armor==='off');
    if(cool.length){const e=nr(cool);cmpGoto(h,e.pos.x,e.pos.z,1.5);if(hd(h.pos,e.pos)<2.1)k41Tap(K,'at',0.5,'item');return;}
    if(hot.length&&!off.length){const e=nr(hot);cmpGoto(h,e.pos.x,e.pos.z,2.2);if(hd(h.pos,e.pos)<2.8)k41Tap(K,'wt',0.9,'skill');return;}
    if(off.length){cmpFight(h,hh,[nr(off)],TIMING[players[1].path]||TIMING.mid);return 'x';}
    const e=nr(hot);cmpGoto(h,e.pos.x,e.pos.z,2.2);if(hd(h.pos,e.pos)<2.8)k41Tap(K,'wt',0.9,'skill');}},
  // большая заготовка: взять клещами свободный конец, нести на большую наковальню, не уходя от напарника дальше 3 м
  {id:'carry',done:()=>{const B=W.BIG;return !!B&&B.placed;},run:(h,hh)=>{const K=k41(),F=W.flags,B=W.BIG;if(F.stage!=='carry'||!B)return 'follow';
    const mine=B.hold[1],oth=B.hold[0];
    if(!mine){const E=k41Ends(),used=oth?oth.end:-1;let bi=-1,bd=99;E.forEach((e,i)=>{if(i===used)return;const d=hd(e,h.pos);if(d<bd){bd=d;bi=i;}});
      if(bi<0)return;if(bd>1.0){cmpGoto(h,E[bi].x,E[bi].z,0.6);return;}k41Tap(K,'at',0.7,'item');return;}
    if(!oth)return;const p=oth.h,d=hd(p.pos,h.pos),side=p.pos.x<K41_ANV.x?1:-1;
    if(d>3.1){cmpGoto(h,p.pos.x+(h.pos.x>p.pos.x?2.2:-2.2),p.pos.z,0.4);return;}cmpGoto(h,K41_ANV.x+1.1*side,K41_ANV.z,0.3);}},
  // ковка вдвоём: роль — та плита, что не занята человеком; удар на раз-два-три, поворот на четыре; на середине — местами
  {id:'r4',done:()=>['quench','rung','end'].includes(W.flags.stage),run:(h,hh)=>{const K=k41(),F=W.flags,R=W.R4;if(F.stage!=='r4'||!R||R.phase!=='play')return 'follow';
    const h0=active(0),half=R.prog>=R.need/2?1:0;
    if(!K.role){K.rt=K.rt||G.time;if(G.time-K.rt>0.8){const dS=hd(h0.pos,K41_STRIKE),dH=hd(h0.pos,K41_HOLD);K.role=dS<1.6?'hold':dH<1.6?'strike':dS<dH?'hold':'strike';}else return;}
    if(half&&!K.half){K.half=1;K.role=K.role==='strike'?'hold':'strike';}
    const P=K.role==='strike'?K41_STRIKE:K41_HOLD;if(hd(h.pos,P)>0.6){cmpGoto(h,P.x,P.z,0.35);return;}
    if(R.t<-R.B*0.4)return;const k=Math.round(R.t/R.B),d=R.t-k*R.B,b=((k%4)+4)%4;if(Math.abs(d)>0.08||R.beatDone[k])return;
    h.face=Math.atan2(K41_ANV.x-h.pos.x,K41_ANV.z-h.pos.z);
    if(K.role==='strike'&&b!==3)k41Tap(K,'at',0.3,'attack');else if(K.role==='hold'&&b===3)k41Tap(K,'at',0.3,'item');}},
  // закалка кольца: Йоша живой водой
  {id:'quench',done:()=>['rung','end'].includes(W.flags.stage),run:h=>{const K=k41(),F=W.flags;if(F.stage!=='quench')return 'follow';if(!cmpWant('yosha'))return;
    if(hd(h.pos,K41_ANV)>2.3){cmpGoto(h,K41_ANV.x,K41_ANV.z-1.2,0.6);return;}k41Tap(K,'wt',0.9,'skill');}}
]);
