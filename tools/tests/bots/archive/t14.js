U.go();ZC.loadLevel(5);ZC.tick(60*3);'cine='+!!ZC.G.cine+' '+U.st()
//@@ shot=n1.png
ZC.skip();ZC.tick(10);const H=ZC.HERO;'gaze='+ZC.W.gaze+' hats='+[H.proshka.hatOn,H.potap.hatOn,H.pelageya.hatOn,H.yosha.hatOn].join(',')+' | '+U.obj()
//@@
U.tap('Digit1');U.tap('Digit0');const r=[U.walkTo(0,-2,-12,4),U.walkTo(1,2,-12,4)];ZC.tick(20);r.join(',')+' '+U.st()+' falls='+ZC.G.stats.falls
//@@ shot=n2.png
const r=[U.walkTo(0,-2,-24.5,6)];ZC.tick(60*4);r+' cine='+!!ZC.G.cine+' stage='+ZC.W.flags.stage
//@@ shot=n3.png
ZC.skip();ZC.tick(20);const H=ZC.HERO;[U.st(),'ring='+H.pelageya.inRing,'act1='+ZC.players[1].act,'nose='+H.proshka.hatOn,U.obj()].join(' | ')
//@@
const r=[U.walkTo(1,9.9,-10,6),U.walkTo(1,9.9,-22,6),U.walkTo(1,1.4,-24,6),U.walkTo(1,1.4,-33,6),U.walkTo(1,3.6,-33,3)];ZC.tick(5);const H=ZC.HERO;H.yosha.face=Math.PI/2;ZC.press('KeyL');ZC.tick(60);r.join(',')+' '+U.st()+' watered='+!!ZC.W.flags.watered
//@@
const r=[U.walkTo(0,-9.9,-4,6),U.walkTo(0,-9.9,-26,8)];const W=ZC.W;const out=[];
const spots=W.marks.filter(m=>m.pos.y>2&&m.pos.y<2.6);
for(const target of [[1.2,-26.9],[0.4,-33],[1.2,-39.1]]){out.push(U.walkTo(0,target[0],target[1],6));const h=U.act(0);h.face=Math.atan2(5.5-h.pos.x,-33-h.pos.z);ZC.tick(2);ZC.press('KeyE');ZC.tick(50);out.push(W.marks.filter(m=>m.active()).length);}
ZC.tick(60);r.join(',')+' | '+out.join(',')+' open='+!!W.flags.ringOpen+' ring='+ZC.HERO.pelageya.inRing+' '+U.st()
//@@ shot=n5.png
const r=[U.walkTo(1,7.3,-33,4)];ZC.tick(30);r+' links='+ZC.W.links+' owl='+ZC.W.abil.owl+' | '+U.obj()
//@@
const r=[U.walkTo(0,-10,-45,6),U.walkTo(0,-10,-68,8),U.walkTo(0,-4.5,-67.5,4),U.walkTo(1,10,-45,6),U.walkTo(1,10,-68,8),U.walkTo(1,4.5,-67.5,4)];ZC.tick(5);
const W=ZC.W;const gl=W.movers.find(m=>m.tieable&&m.ax<0),gr=W.movers.find(m=>m.tieable&&m.ax>0);
// отвернуться, чтобы ели-ворота разошлись к колышкам
const H0=U.act(0),H1=U.act(1);H0.face=0;H1.face=0;let n=0;while(n<600&&!(gl.tieable()&&gr.tieable())){ZC.tick(1);n++;}
H0.face=Math.atan2(gl.pos.x-H0.pos.x,gl.pos.z-H0.pos.z);H1.face=Math.atan2(gr.pos.x-H1.pos.x,gr.pos.z-H1.pos.z);ZC.tick(1);ZC.press('KeyR');ZC.press('Semicolon');ZC.tick(40);
r.join(',')+' wait='+n+' tiedL='+!!gl.tied+' tiedR='+!!gr.tied+' gl='+gl.pos.x.toFixed(2)+' gr='+gr.pos.x.toFixed(2)+' th='+W.threads.map(t=>t.owner+':'+t.len.toFixed(1)).join(' ')
//@@ shot=n6.png
U.tap('Digit1');U.tap('Digit0');const r=[U.walkTo(0,-4.5,-68,3),U.walkTo(0,-0.8,-68,3),U.walkTo(0,-0.8,-74,6),U.walkTo(1,4.5,-68,3),U.walkTo(1,0.8,-68,3),U.walkTo(1,0.8,-74,6)];ZC.tick(120);r.join(',')+' '+U.st()+' | '+U.obj()
//@@
U.tap('KeyK');const r=[U.walkTo(1,3.5,-77.5,5),U.walkTo(0,2.2,-78.4,5)];ZC.press('KeyL');ZC.tick(10);const F=ZC.W.flags;const h=U.act(0);h.face=Math.atan2(3.4,-16)+0.3;ZC.tick(1);ZC.press('KeyR');ZC.tick(40);
r.join(',')+' seen='+!!F.seenSilver+' silver='+!!F.silver+' owlT='+ZC.W.owlT.toFixed(1)+' th='+ZC.W.threads.map(t=>t.owner+':'+t.len.toFixed(1)+' a'+Math.atan2(t.dx,t.dz).toFixed(2)).join(' ')+' nuts='+ZC.W.nuts+' | '+U.obj()+' | '+U.st()
//@@ shot=n7.png
U.tap('Digit1');U.tap('Digit0');const r=[U.walkTo(0,5.5,-94.5,6),U.walkTo(0,5.5,-99,3),U.walkTo(1,5.5,-94.5,6),U.walkTo(1,5.5,-99,3)];ZC.tick(60);r.join(',')+' '+U.st()+' pushes? falls='+ZC.G.stats.falls
//@@
const r=[U.walkTo(0,0,-101,3),U.walkTo(1,1,-101,3)];ZC.tick(60);r.join(',')+' foes='+ZC.W.enemies.map(e=>e.kind+':'+e.state).join(',')
//@@ shot=n8.png
const b=U.brawl(90);b+' petals='+ZC.players.map(p=>p.petals).join('/')+' | '+U.obj()
//@@
const r=[U.walkTo(0,0,-120,8),U.walkTo(0,0,-122.5,3)];ZC.tick(60);r.join(',')+' links='+ZC.W.links+' nuts='+ZC.W.nuts+' got='+JSON.stringify(ZC.G.got)+' lvl='+ZC.W.levelId+' trans='+!!ZC.G.trans
