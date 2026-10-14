//@@
// толстая струна 1-2: Потап бросает с камня, остальные проходят, потом идёт сам Потап — струна не должна пропасть, когда он сходит с круга
U.go();ZC.loadLevel(ZC.LV('1-2'));ZC.tick(30);ZC.skip();ZC.tick(20);window.H=ZC.HERO;window.TH=()=>ZC.W.threads.filter(t=>t.thick).map(t=>(t.string?'S':'')+(t.sag?'sag':'')+t.len.toFixed(1)).join(' ')||'none';
if(ZC.players[0].act!==1)U.tap('KeyQ');ZC.tick(5);H.potap.pos.set(0,0.22,-58.6);H.potap.vel.set(0,0,0);H.proshka.pos.set(0.6,0,-56.5);H.pelageya.pos.set(-0.6,0,-56);H.yosha.pos.set(1.4,0,-56);const r=[];ZC.tick(20);H.potap.face=Math.PI;ZC.tick(1);ZC.press('KeyR');ZC.tick(40);r.push('thrown='+TH()+' act='+ZC.players[0].act+' '+U.st());r
//@@
// остальные идут по струне (Потап стоит на камне)
U.tap('KeyQ');const r=[U.walkTo(0,0,-75,12),U.walkTo(1,0.3,-58,10),U.walkTo(1,0,-75,12)];ZC.tick(20);r.concat('after others='+TH()+' '+U.st())
//@@
// Потап сам: сошёл с камня на струну и идёт на тот берег
const h=H.potap;if(ZC.players[0].act!==1){U.tap('KeyQ');}ZC.tick(5);const L=[];const a=U.walkTo(0,0,-62,6);L.push('on string='+TH());const b=U.walkTo(0,0,-75.3,12);L.push('end='+TH()+' z='+h.pos.z.toFixed(1)+' y='+h.pos.y.toFixed(2));
L.concat([a,b]).concat(h.pos.z<-73?[]:['FAIL Потап не дошёл: z='+h.pos.z.toFixed(1)])
//@@
// друг ещё стоит на струне у камня, когда Потап ступает на неё: струна держит, никто не падает, Потап доходит
U.go();ZC.loadLevel(ZC.LV('1-2'));ZC.tick(30);ZC.skip();ZC.tick(20);window.H=ZC.HERO;if(ZC.players[0].act!==1)U.tap('KeyQ');ZC.tick(5);
H.potap.pos.set(0,0.22,-58.6);H.potap.vel.set(0,0,0);H.proshka.pos.set(0.7,0,-56.5);H.pelageya.pos.set(-0.6,0,-56);H.yosha.pos.set(1.4,0,-56);ZC.tick(20);H.potap.face=Math.PI;ZC.tick(1);ZC.press('KeyR');ZC.tick(40);
H.pelageya.pos.set(0,0,-61);H.pelageya.vel.set(0,0,0);ZC.tick(10);const on=H.pelageya.groundRef&&H.pelageya.groundRef.thick;const a=U.walkTo(0,0,-66,10);ZC.tick(20);const mid=TH();const z66=H.potap.pos.z;U.walkTo(0,0,-75.3,10);ZC.tick(30);
const r=['friend on string='+!!on,'mid='+mid+' z='+z66.toFixed(1),'potap z='+H.potap.pos.z.toFixed(1)+' y='+H.potap.pos.y.toFixed(2),'sagged='+!!ZC.W.flags.sagged,a];if(!on)r.push('FAIL друг не на струне');if(mid!=='S14.7')r.push('FAIL струна пропала или просела под Потапом на ходу: '+mid);if(H.potap.pos.z>-73)r.push('FAIL Потап не дошёл');if(ZC.W.flags.sagged)r.push('FAIL струна просела');r
