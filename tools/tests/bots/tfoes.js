//@@
ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);ZC.W.warp51('meadow');ZC.tick(60);const W=ZC.W,H=ZC.HERO;const e=W.enemies.find(x=>x.kind==='hameley');const r=['mode0='+e.mode];
H.proshka.pos.set(5,0,-4);H.pelageya.pos.set(8,0,-4);ZC.tick(2);e.pos.set(6.5,0,-8);e.home.set(6.5,0,-8);ZC.tick(60*3.3);r.push('nearPero='+e.mode+' guard='+e.guardAll()+' ranged='+e.def.ranged);
// свет у знака пера
U.walkTo(0,7.2,-6.6,3);U.tap('KeyR');ZC.tick(5);r.push('lit='+U.act(0).lit+' litNow='+e.litNow+' guard='+e.guardAll());r
//@@ shot=nf_ham1.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO;const e=W.enemies.find(x=>x.kind==='hameley');U.act(0).lit=false;e.pos.set(-4,0,-6.5);e.home.set(-4,0,-6.5);H.proshka.pos.set(-3,0,-3);H.pelageya.pos.set(-6,0,-3);ZC.tick(60*3.3);
['nearGusli='+e.mode+' ranged='+e.def.ranged+' sig='+e.signals.join('/')+' guard='+e.guardAll()+' told='+!!W.flags.hameleyTold]
//@@ shot=nf_ham2.png
ZC.tick(1);
//@@
ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(10);ZC.skip();ZC.tick(5);U.walkTo(0,-1,-2,5);ZC.skip();ZC.tick(5);const W=ZC.W,H=ZC.HERO;W.flags.gateOpen=true;
H.proshka.pos.set(-1.6,0,-124.6);H.pelageya.pos.set(1.6,0,-124.6);H.potap.pos.set(-3,0,-120);H.yosha.pos.set(3,0,-120);[H.proshka,H.pelageya].forEach(h=>h.vel.set(0,0,0));ZC.tick(3);H.proshka.pos.z=-126;ZC.tick(60);
const m=W.enemies.find(x=>x.kind==='motylek');W.enemies.filter(x=>x.kind==='ten').forEach(x=>{x.alive=false;W.group.remove(x.g);});const r=['moth='+!!m+' at '+(m&&m.pos.x.toFixed(1)+','+m.pos.z.toFixed(1))];
r.push('none: guard='+m.guardAll());U.tap('KeyR');ZC.tick(5);r.push('p1lit: guard='+m.guardAll()+' lp='+m.lp);U.tap('Semicolon');ZC.tick(5);r.push('both: guard='+m.guardAll()+' lp='+m.lp+' open='+m.open.toFixed(2)+' d='+[0,1].map(pi=>Math.hypot(U.act(pi).pos.x-m.pos.x,U.act(pi).pos.z-m.pos.z).toFixed(1)));r
//@@ shot=nf_moth.png
ZC.tick(1);
//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('4-4'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,H=ZC.HERO;
W.flags.stage='B';W.flags.doorOpen=true;H.proshka.pos.set(-5,0,-60.5);H.pelageya.pos.set(-2,0,-61);ZC.tick(20);const p=W.enemies.find(x=>x.kind==='pechnik');const r=['pech='+!!p,'coal='+W.hots.length];
['proshka','potap','pelageya','yosha'].forEach(n=>{H[n].iT=99;});U.walkTo(0,W.hots[0].pos.x+1.0,W.hots[0].pos.z,3);U.act(0).face=-Math.PI/2;ZC.tick(2);U.tap('KeyR');ZC.tick(3);r.push('carry='+!!U.act(0).carry);
r.push('guard0='+p.guardAll());const t0=U.until(()=>{['proshka','potap','pelageya','yosha'].forEach(n=>{H[n].iT=99;});const h=U.act(0),dx=p.pos.x-h.pos.x,dz=p.pos.z-h.pos.z,d=Math.hypot(dx,dz);ZC.hold('KeyA',dx<-0.3);ZC.hold('KeyD',dx>0.3);ZC.hold('KeyW',dz<-0.3);ZC.hold('KeyS',dz>0.3);return p.fed>0;},8);['KeyA','KeyD','KeyW','KeyS'].forEach(k=>ZC.hold(k,false));
r.push('fed '+t0+' fed='+p.fed.toFixed(1)+' guard='+p.guardAll()+' sig='+p.signals.join('/'));r
//@@ shot=nf_pech.png
ZC.tick(1);
//@@
ZC.startFrom(ZC.LV('2-5'));ZC.G.manual=true;ZC.tick(30);const F=ZC.W.flags;const H=ZC.HERO;F.voice='sunk';F.given=true;F.b1=F.b2=F.b3=true;
// релиз final06: в 2-5 главный колокол дальше по городу на 68 м (late_99i_k25.js) — туда переносит warp25('bell')
const REL=!!ZC.W.warp25;if(REL){ZC.W.warp25('bell');ZC.tick(5);}const DZ=REL?-68:0;
H.proshka.pos.set(-3,6,-76.8+DZ);H.pelageya.pos.set(3,6,-76.8+DZ);H.potap.pos.set(-4,6,-76.6+DZ);H.yosha.pos.set(4,6,-76.6+DZ);ZC.tick(40);const t=ZC.W.enemies.find(e=>e.kind==='tyagun');const MZ=ZC.W.waters.find(z=>z.minx===-6&&z.maxx===6&&z.minz===-88+DZ);
ZC.W.enemies.filter(e=>e.kind!=='tyagun').forEach(e=>{e.alive=false;ZC.W.group.remove(e.g);});const r=['high: guard='+t.guardAll()+' up='+t.up+' y='+t.pos.y.toFixed(2)];U.walkTo(0,-4,-79.5+DZ,3);U.tap('KeyR');ZC.tick(150);r.push('low: state='+MZ.state+' up='+t.up+' guard='+t.guardAll()+' y='+t.pos.y.toFixed(2)+' side='+t.sideOpen);r
//@@ shot=nf_tyag.png
ZC.tick(1);
//@@
ZC.loadLevel(3);ZC.tick(30);const H=ZC.HERO;const e=[];for(let i=0;i<1;i++){}
const r=[U.walkTo(0,-5.5,-5.4)];H.proshka.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.tick(40);r.push(U.walkTo(0,-5.1,-14,8));U.walkTo(0,-5.5,-14.2,2);H.proshka.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.tick(60*5.5);
const t=ZC.W.enemies.find(x=>x.kind==='tat');r.push('tat='+!!t+' chew='+!!(t&&t.chew));r
//@@ shot=nf_tat.png
ZC.tick(1);
