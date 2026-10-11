//@@
// 4-4 «Змиевы валы» в одиночном режиме (клавиши Игрока 1, Q — по кругу): плуг к чаше, дверь — Потап плечом, сток в яму,
// арена одним героем за раз: болван — Йоша поливает, Прошка срывает латы; печник — уголь клещами; змеёныши на сухом.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.setSolo(true);ZC.startFrom(ZC.LV('4-4'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);U.nocine();
window.H=ZC.HERO;window.st=()=>U.st()+' errs='+_errs.length+' '+_errs.join(' | ');
window.as=k=>{const r=U.toKind(k);if(r!==k)throw new Error('не взять '+k+': '+U.me().kind+' '+st());return r;};
'solo='+ZC.G.solo+' '+ZC.W.flags.stage+' me='+U.me().kind
//@@
const W=ZC.W,F=W.flags;const r2=[];const P=H.proshka;as('proshka');
r2.push(U.walkTo(0,-3,-3.2,3));P.face=0;ZC.tick(2);U.tap('KeyR');ZC.tick(3);
r2.push(U.path(0,[[-4.2,-4.5],[-5.2,-6.5],[-5.2,-9],[-3,-12],[-1.5,-15.5],[-1.2,-17.5],[2.5,-17.5],[4.5,-20],[6,-22.8],[6,-26]],4));ZC.tick(30);U.tap('KeyR');ZC.tick(3);
const row=z=>{let s='';for(let x=-9.5;x<10;x++){const v=W.furrowAt(x,z);s+=v<0?'?':v===0?' ':v===10?'.':v===20?'#':v===21?'~':'x';}return s;};
const g=[];for(let z=-4.5;z>-27;z-=1)g.push(row(z));r2.push(g.join('|'));
ZC.tick(60*14);const g2=[];for(let z=-4.5;z>-27;z-=1)g2.push(row(z));if(!F.bowlA)throw new Error('чаша не полна: '+g2.join('|'));'bowlA solo'
//@@
const W=ZC.W,F=W.flags;const r3=[];const P=H.proshka;as('proshka');
const tr=[];r3.push(U.st(),U.walkTo(0,0,-28,4,(h,i)=>{if(i%15===0)tr.push(h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+F.stage);}),tr.join(' '),U.walkTo(0,0,-32.5,4,(h,i)=>{if(i%5===0)tr.push(h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+F.stage+(ZC.G.cine?'C':''));}),tr.join(' '),U.st(),F.stage,'plow='+W.PLOW.g.position.x.toFixed(1)+','+W.PLOW.g.position.z.toFixed(1));
r3.push(U.walkTo(0,-2,-34.4,3));P.face=0;ZC.tick(2);U.tap('KeyR');ZC.tick(3);
r3.push(U.path(0,[[2,-35.6],[7.6,-35.6],[7.6,-37.6],[1,-40],[-5,-42.5],[-5,-48],[-2.5,-52],[0,-56.2]],4));ZC.tick(20);U.tap('KeyR');ZC.tick(3);
const row=z=>{let s='';for(let x=-9.5;x<10;x++){const v=W.furrowAt(x,z);s+=v<0?'?':v===0?' ':v===10?'.':v===20?'#':v===21?'~':'x';}return s;};
ZC.tick(60*14);const g2=[];for(let z=-31.5;z>-57;z-=1)g2.push(row(z));r3.push(g2.join('|'),'heat='+F.doorHeat.toFixed(2));
// Потап — плечом
as('potap');H.potap.pos.set(0,0,-55.6);H.potap.vel.set(0,0,0);ZC.tick(3);r3.push(U.walkTo(0,0,-56.1,2));H.potap.face=Math.PI;U.tap('KeyF');ZC.tick(40);if(!F.doorOpen)throw new Error('дверь не открыта: heat='+F.doorHeat.toFixed(2)+' '+st());'door solo'
//@@
const W=ZC.W,F=W.flags;const r4=[];const P=H.proshka,Y=H.yosha;
as('yosha');Y.pos.set(1.5,0,-56);as('proshka');P.pos.set(0,0,-56);P.vel.set(0,0,0);ZC.tick(3);
const inv=()=>{HEROES_();};function HEROES_(){['proshka','potap','pelageya','yosha'].forEach(n=>{H[n].iT=99;});}
r4.push(U.walkTo(0,0,-60.2,3),F.stage,'foes='+W.enemies.length,'plow='+W.PLOW.g.position.x.toFixed(1)+','+W.PLOW.g.position.z.toFixed(1));HEROES_();
r4.push(U.walkTo(0,-4,-62.4,3,()=>HEROES_()));P.face=0;ZC.tick(2);U.tap('KeyR');ZC.tick(3);
r4.push(U.path(0,[[-6.6,-62.4],[-6.6,-61.6],[9,-61.6]],4));HEROES_();ZC.tick(20);U.tap('KeyR');
const row=z=>{let s='';for(let x=-9.5;x<10;x++){const v=W.furrowAt(x,z);s+=v<0?'?':v===0?' ':v===10?'.':v===20?'#':v===21?'~':'x';}return s;};
for(let i=0;i<60*10;i++){HEROES_();ZC.tick(1);}const g=[];for(let z=-59.5;z>-78;z-=1)g.push(row(z));if(!F.drained)throw new Error('лава не ушла в яму: '+g.join('|'));'drained solo foes='+W.enemies.length
//@@
// арена одним героем за раз
const W=ZC.W,F=W.flags;const r5=[];const P=H.proshka,Y=H.yosha;const inv=()=>['proshka','potap','pelageya','yosha'].forEach(n=>{H[n].iT=99;});
const B=['KeyA','KeyD','KeyW','KeyS'];const rel=()=>B.forEach(k=>ZC.hold(k,false));
const mv=(x,z,stop)=>{const h=U.me();const dx=x-h.pos.x,dz=z-h.pos.z,far=Math.hypot(dx,dz)>stop;{const d=Math.hypot(dx,dz)||1;if(far&&h.grounded&&W.lavaCell(h.pos.x+dx/d*0.9,h.pos.z+dz/d*0.9))ZC.press('Space');}ZC.hold(B[0],far&&dx<-0.3);ZC.hold(B[1],far&&dx>0.3);ZC.hold(B[2],far&&dz<-0.3);ZC.hold(B[3],far&&dz>0.3);if(!far)h.face=Math.atan2(dx,dz);return !far;};
const lg=[];
as('yosha');inv();U.walkTo(1,0.5,-57,3,()=>inv());U.walkTo(1,0.5,-60.2,3,()=>inv());
// болван: Йоша поливает латы, Прошка срывает нагрудник клещами
for(let tries=0;tries<6;tries++){inv();const b=W.enemies.find(e=>e.alive&&e.kind==='bolvan');if(!b||b.armor==='off')break;
  if(b.armor==='hot'){as('yosha');for(let i=0;i<60*8&&b.armor==='hot';i++){inv();if(mv(b.pos.x,b.pos.z,2.2)&&Y.skillCd<=0)ZC.press('KeyE');ZC.tick(1);}rel();lg.push('w:'+b.armor+' me='+U.me().kind+' d='+Math.hypot(b.pos.x-Y.pos.x,b.pos.z-Y.pos.z).toFixed(1)+' cd='+Y.skillCd.toFixed(2)+' y='+Y.pos.y.toFixed(1)+' T['+W.waterTargets.filter(w=>w.active()).map(w=>(Math.hypot(w.pos.x-Y.pos.x,w.pos.z-Y.pos.z)).toFixed(1)).join(',')+']');}
  if(b.armor==='cool'){as('proshka');for(let i=0;i<60*8&&b.armor==='cool';i++){inv();if(mv(b.pos.x,b.pos.z,1.6)&&i%10===0)ZC.press('KeyR');ZC.tick(1);}rel();lg.push('g:'+b.armor);}}
const bb=W.enemies.find(e=>e.kind==='bolvan');r5.push(lg.join(' '),'bolvan='+(bb?bb.armor+':'+bb.alive:'none'));
// печник: уголь у жаровни клещами → вплотную → бить, пока горит
as('proshka');const pc=W.enemies.find(e=>e.kind==='pechnik'),coal=W.hots[0],pl=[];
for(let tries=0;tries<6&&pc&&pc.alive;tries++){inv();if(coal.gone){ZC.tick(110);}
  for(let i=0;i<60*6&&!mv(coal.home.x+1.0,coal.home.z,0.3);i++){inv();ZC.tick(1);}rel();const h0=U.me();h0.face=Math.atan2(coal.pos.x-h0.pos.x,coal.pos.z-h0.pos.z);ZC.tick(2);U.tap('KeyR');ZC.tick(5);const carry=!!U.me().carry;
  for(let i=0;i<60*6&&pc.alive&&pc.fed<=0;i++){inv();mv(pc.pos.x,pc.pos.z,1.0);ZC.tick(1);}rel();
  let hits=0;const f0=pc.fed;for(let i=0;i<60*8&&pc.alive&&(pc.fed>0||pc.state==='broken');i++){inv();if(mv(pc.pos.x,pc.pos.z,1.6)&&i%10===0){ZC.press('KeyF');hits++;}ZC.tick(1);}rel();
  pl.push('try'+tries+':carry='+carry+',fed='+f0.toFixed(1)+',hits='+hits+','+pc.state+(pc.alive?'':'†'));}
r5.push('pechnik: '+pl.join(' '));
// остальные — одним героем: защита и удары
for(let i=0;i<60*90&&W.enemies.some(e=>e.alive);i++){inv();const h=U.me();let e=null,bd=99;for(const x of W.enemies){if(!x.alive)continue;const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}
  if(e&&e.kind==='bolvan'&&e.armor!=='off'){rel();as(e.armor==='hot'?'yosha':'proshka');continue;}
  if(i%300===0)r5.push('['+(i/60)+'s me='+h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.z.toFixed(1)+' e='+e.kind+':'+e.state+':'+e.embers+'@'+e.pos.x.toFixed(1)+','+e.pos.z.toFixed(1)+' tgt='+(e.tgt&&e.tgt.kind)+' hot='+!!e.hot+']');
  if(!U.def(0,i)){if(mv(e.pos.x,e.pos.z,1.3)&&i%9===0)ZC.press('KeyF');}ZC.tick(1);}
rel();
if(!F.cleared)throw new Error('арена не очищена: '+r5.join(' ')+' '+W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state+':'+e.embers).join(','));
'arena solo '+r5.join(' ')
//@@
ZC.tick(200);[ZC.W.flags.stage,!!ZC.G.cine]
//@@
ZC.tick(500);ZC.tick(400);ZC.skip();ZC.tick(300);ZC.skip();ZC.tick(300);
const ok=ZC.G.done['4-4']&&!_errs.length;(ok?'tso44 ok ':'FAIL tso44 ')+[ZC.W.levelId,ZC.G.done['4-4'],ZC.G.got['4-4'],'errs='+_errs.length]
