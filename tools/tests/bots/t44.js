//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('4-4'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj(),'links='+W.linkTotal);r
//@@ shot=w44a.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r2=[];const P=H.proshka;
r2.push(U.walkTo(0,-3,-3.2,3));P.face=0;ZC.tick(2);U.tap('KeyR');ZC.tick(3);
r2.push(U.path(0,[[-4.2,-4.5],[-5.2,-6.5],[-5.2,-9],[-3,-12],[-1.5,-15.5],[-1.2,-17.5],[2.5,-17.5],[4.5,-20],[6,-22.8],[6,-26]],4));ZC.tick(30);U.tap('KeyR');ZC.tick(3);
const row=z=>{let s='';for(let x=-9.5;x<10;x++){const v=W.furrowAt(x,z);s+=v<0?'?':v===0?' ':v===10?'.':v===20?'#':v===21?'~':'x';}return s;};
const g=[];for(let z=-4.5;z>-27;z-=1)g.push(row(z));r2.push(g.join('|'));
ZC.tick(60*14);const g2=[];for(let z=-4.5;z>-27;z-=1)g2.push(row(z));r2.push(g2.join('|'),'bowlA='+F.bowlA);r2
//@@ shot=w44b.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r3=[];const P=H.proshka;
const tr=[];r3.push(U.st(),U.walkTo(0,0,-28,4,(h,i)=>{if(i%15===0)tr.push(h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+F.stage);}),tr.join(' '),U.walkTo(0,0,-32.5,4,(h,i)=>{if(i%5===0)tr.push(h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+F.stage+(ZC.G.cine?'C':''));}),tr.join(' '),U.st(),F.stage,'plow='+W.PLOW.g.position.x.toFixed(1)+','+W.PLOW.g.position.z.toFixed(1));
r3.push(U.walkTo(0,-2,-34.4,3));P.face=0;ZC.tick(2);U.tap('KeyR');ZC.tick(3);
r3.push(U.path(0,[[2,-35.6],[7.6,-35.6],[7.6,-37.6],[1,-40],[-5,-42.5],[-5,-48],[-2.5,-52],[0,-56.2]],4));ZC.tick(20);U.tap('KeyR');ZC.tick(3);
const row=z=>{let s='';for(let x=-9.5;x<10;x++){const v=W.furrowAt(x,z);s+=v<0?'?':v===0?' ':v===10?'.':v===20?'#':v===21?'~':'x';}return s;};
ZC.tick(60*14);const g2=[];for(let z=-31.5;z>-57;z-=1)g2.push(row(z));r3.push(g2.join('|'),'heat='+F.doorHeat.toFixed(2));
// Потап — плечом
U.tap('KeyQ');ZC.tick(3);r3.push('act='+U.act(0).kind);H.potap.pos.set(0,0,-55.6);H.potap.vel.set(0,0,0);ZC.tick(3);r3.push(U.walkTo(0,0,-56.1,2));H.potap.face=Math.PI;U.tap('KeyF');ZC.tick(40);r3.push('door='+F.doorOpen);r3
//@@ shot=w44c.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r4=[];const P=H.proshka,Y=H.yosha;
if(U.act(0)!==P){U.tap('KeyQ');ZC.tick(2);}P.pos.set(0,0,-56);P.vel.set(0,0,0);if(U.act(1)!==Y){U.tap('KeyK');ZC.tick(2);}Y.pos.set(1.5,0,-56);ZC.tick(3);
const inv=()=>{HEROES_();};function HEROES_(){['proshka','potap','pelageya','yosha'].forEach(n=>{H[n].iT=99;});}
r4.push(U.walkTo(0,0,-60.2,3),F.stage,'foes='+W.enemies.length,'plow='+W.PLOW.g.position.x.toFixed(1)+','+W.PLOW.g.position.z.toFixed(1));HEROES_();
r4.push(U.walkTo(0,-4,-62.4,3,()=>HEROES_()));P.face=0;ZC.tick(2);U.tap('KeyR');ZC.tick(3);
r4.push(U.path(0,[[-6.6,-62.4],[-6.6,-61.6],[9,-61.6]],4));HEROES_();ZC.tick(20);U.tap('KeyR');
const row=z=>{let s='';for(let x=-9.5;x<10;x++){const v=W.furrowAt(x,z);s+=v<0?'?':v===0?' ':v===10?'.':v===20?'#':v===21?'~':'x';}return s;};
for(let i=0;i<60*10;i++){HEROES_();ZC.tick(1);}const g=[];for(let z=-59.5;z>-78;z-=1)g.push(row(z));r4.push(g.join('|'),'drained='+F.drained);r4
//@@ shot=w44d.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r5=[];const P=H.proshka,Y=H.yosha;const inv=()=>['proshka','potap','pelageya','yosha'].forEach(n=>{H[n].iT=99;});
const K2=[{B:['KeyA','KeyD','KeyW','KeyS']},{B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}];
const mv=(pi,x,z,stop)=>{const h=U.act(pi),k=K2[pi];const dx=x-h.pos.x,dz=z-h.pos.z,far=Math.hypot(dx,dz)>stop;{const d=Math.hypot(dx,dz)||1;if(far&&h.grounded&&W.lavaCell(h.pos.x+dx/d*0.9,h.pos.z+dz/d*0.9))ZC.press(pi?'KeyM':'Space');}ZC.hold(k.B[0],far&&dx<-0.3);ZC.hold(k.B[1],far&&dx>0.3);ZC.hold(k.B[2],far&&dz<-0.3);ZC.hold(k.B[3],far&&dz>0.3);if(!far)h.face=Math.atan2(dx,dz);return !far;};
inv();U.walkTo(1,0.5,-57,3,()=>inv());U.walkTo(1,0.5,-60.2,3,()=>inv());const lg=[];r5.push('foes0='+W.enemies.map(e=>e.kind+':'+e.alive+':'+e.state).join(','));for(let i=0;i<60*40;i++){inv();const b=W.enemies.find(e=>e.alive&&e.kind==='bolvan');if(i%120===0)lg.push((b?b.armor+':'+b.pos.x.toFixed(1)+','+b.pos.z.toFixed(1):'nob')+' Y'+U.act(1).kind+':'+U.act(1).pos.x.toFixed(1)+','+U.act(1).pos.y.toFixed(1)+','+U.act(1).pos.z.toFixed(1)+' P'+U.act(0).pos.x.toFixed(1)+','+U.act(0).pos.z.toFixed(1));if(!b||b.armor==='off')break;
  if(b.armor==='hot'){if(mv(1,b.pos.x,b.pos.z,2.2)&&Y.skillCd<=0){if(lg.length<25)lg.push('T['+W.waterTargets.filter(w=>w.active()).map(w=>(Math.hypot(w.pos.x-Y.pos.x,w.pos.z-Y.pos.z)-(w.pri||0)).toFixed(1)).join(',')+']Y'+Y.active);ZC.press('KeyL');}mv(0,b.pos.x,b.pos.z,3.5);}
  else{if(mv(0,b.pos.x,b.pos.z,1.6)&&i%10===0)ZC.press('KeyR');}ZC.tick(1);}
[0,1].forEach(pi=>K2[pi].B.forEach(k=>ZC.hold(k,false)));
const bb=W.enemies.find(e=>e.kind==='bolvan');r5.push(lg.join(' '),'bolvan='+(bb?bb.armor+':'+bb.alive:'none'));
// печник: уголь у жерла клещами → вплотную к печнику → бить, пока горит
const pc=W.enemies.find(e=>e.kind==='pechnik'),coal=W.hots[0],pl=[];
for(let tries=0;tries<6&&pc&&pc.alive;tries++){inv();if(coal.gone){ZC.tick(110);}
  for(let i=0;i<60*6&&!mv(0,coal.home.x+1.0,coal.home.z,0.3);i++){inv();ZC.tick(1);}K2[0].B.forEach(k=>ZC.hold(k,false));const h0=U.act(0);h0.face=Math.atan2(coal.pos.x-h0.pos.x,coal.pos.z-h0.pos.z);ZC.tick(2);U.tap('KeyR');ZC.tick(5);const carry=!!U.act(0).carry;
  for(let i=0;i<60*6&&pc.alive&&pc.fed<=0;i++){inv();mv(0,pc.pos.x,pc.pos.z,1.0);ZC.tick(1);}K2[0].B.forEach(k=>ZC.hold(k,false));
  let hits=0;const f0=pc.fed;for(let i=0;i<60*8&&pc.alive&&(pc.fed>0||pc.state==='broken');i++){inv();if(mv(0,pc.pos.x,pc.pos.z,1.6)&&i%10===0){ZC.press('KeyF');hits++;}ZC.tick(1);}K2[0].B.forEach(k=>ZC.hold(k,false));
  pl.push('try'+tries+':carry='+carry+',fed='+f0.toFixed(1)+',hits='+hits+',emb='+pc.embers+','+pc.state+(pc.alive?'':'†'));}
r5.push('pechnik: '+pl.join(' '));
let res='';for(let t=0;t<4&&W.enemies.some(e=>e.alive);t++){inv();res=U.brawl(20);}r5.push(res,'cleared='+F.cleared,W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state+':'+e.embers+(e.hot?'H':'')).join(','));r5
//@@
ZC.tick(200);[ZC.W.flags.stage,!!ZC.G.cine]
//@@ shot=w44e.png
ZC.tick(500);
//@@
ZC.tick(400);ZC.skip();ZC.tick(300);[ZC.W.levelId,ZC.G.done['4-4'],ZC.G.got['4-4']]
