U.go();ZC.loadLevel(3);ZC.tick(30);U.st()+' || '+U.obj()
//@@ shot=m1.png
const r=[U.walkTo(0,-5.5,-5.4),U.walkTo(1,5.5,-5.4)];const H=ZC.HERO;H.proshka.face=Math.PI;H.pelageya.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.press('Semicolon');ZC.tick(40);
r.join(',')+' threads:'+ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)+' y'+t.y.toFixed(2)+'-'+t.y2.toFixed(2)).join(' ')
//@@
U.tap('KeyQ');U.tap('KeyK');const a=U.walkTo(0,-5.3,-14,8),b=U.walkTo(1,5.4,-14,8);[a,b,U.st(),U.obj(),'threads:'+ZC.W.threads.length].join(' | ')
//@@ shot=m2.png
U.tap('Digit1');U.tap('Digit0');ZC.tick(300);U.st()+' carries='+ZC.G.stats.carries+' threads:'+ZC.W.threads.length
//@@
const H=ZC.HERO;U.walkTo(0,-5.5,-14.2,2);U.walkTo(1,5.5,-14.2,2);H.potap.face=Math.PI;H.yosha.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.press('Semicolon');ZC.tick(40);
const th='threads:'+ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)+' y'+t.y.toFixed(2)+'-'+t.y2.toFixed(2)).join(' ');
U.tap('KeyQ');U.tap('KeyK');const a=U.walkTo(0,-5.2,-24,8),b=U.walkTo(1,5.3,-24,8);[th,a,b,U.st(),U.obj()].join(' | ')
//@@
U.tap('Digit1');U.tap('Digit0');ZC.tick(300);U.st()+' carries='+ZC.G.stats.carries+' falls='+ZC.G.stats.falls+' threads:'+ZC.W.threads.length+' nuts='+ZC.W.nuts
//@@
const r=[U.walkTo(0,-5.8,-33.5,6),U.walkTo(0,-5.8,-40.5,6),U.walkTo(0,-4,-42.6,4),U.walkTo(1,-5.8,-33.5,8),U.walkTo(1,-5.8,-40.5,6),U.walkTo(1,-3,-42.2,4)];ZC.tick(120);
r.join(',')+' | '+U.st()+' | '+U.obj()
//@@
const H=ZC.HERO;H.proshka.face=Math.atan2(0.6-H.proshka.pos.x,-53.6-H.proshka.pos.z);ZC.tick(1);ZC.press('KeyR');ZC.tick(40);
U.tap('KeyQ');const L=[];const f=(h)=>h.pos.x.toFixed(2)+','+h.pos.y.toFixed(2)+','+h.pos.z.toFixed(2);
const tx=H.proshka.pos.x+Math.sin(H.proshka.face)*0.9,tz=H.proshka.pos.z+Math.cos(H.proshka.face)*0.9;
const B=['KeyA','KeyD','KeyW','KeyS'];for(let i=0;i<90;i++){const h=H.potap;const dx=tx-h.pos.x,dz=tz-h.pos.z;const go=Math.hypot(dx,dz)>0.45&&!h.hang;ZC.hold(B[0],go&&dx<-0.25);ZC.hold(B[1],go&&dx>0.25);ZC.hold(B[2],go&&dz<-0.25);ZC.hold(B[3],go&&dz>0.25);ZC.tick(1);if(i%6==0)L.push(i+' P'+f(H.proshka)+' T'+f(H.potap)+(H.potap.hang?'h':'')+' th'+ZC.W.threads.length+(ZC.W.threads[0]&&ZC.W.threads[0].sag?'sag':''));}
B.forEach(k=>ZC.hold(k,false));L.join('\n')
