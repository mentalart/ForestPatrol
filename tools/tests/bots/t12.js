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
//@@ shot=m3.png
const H=ZC.HERO;H.proshka.face=Math.atan2(0.6-H.proshka.pos.x,-53.6-H.proshka.pos.z);ZC.tick(1);ZC.press('KeyR');ZC.tick(40);
const th='threads:'+ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)+' y'+t.y.toFixed(2)+'-'+t.y2.toFixed(2)).join(' ');
U.tap('KeyQ');const w=U.walkTo(0,H.proshka.pos.x+Math.sin(H.proshka.face)*0.9,H.proshka.pos.z+Math.cos(H.proshka.face)*0.9,3);const L=[];for(let i=0;i<150;i++){ZC.tick(1);if(i%15==0)L.push(H.potap.pos.z.toFixed(1)+'/'+H.potap.pos.y.toFixed(2)+(H.potap.hang?'h':''));}
th+' | '+w+' | '+L.join(' ')+' | nuts='+ZC.W.nuts+' | '+U.st()
//@@ shot=m4.png
U.tap('Digit1');ZC.tick(240);U.st()+' carries='+ZC.G.stats.carries+' | '+U.obj()
//@@
const H=ZC.HERO;H.pelageya.face=Math.atan2(0.6-H.pelageya.pos.x,-53.6-H.pelageya.pos.z);ZC.tick(1);ZC.press('Semicolon');ZC.tick(40);
const th='threads:'+ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)).join(' ');
U.tap('KeyK');U.walkTo(1,H.pelageya.pos.x+Math.sin(H.pelageya.face)*2.2,H.pelageya.pos.z+Math.cos(H.pelageya.face)*2.2,1.5);ZC.tick(150);U.tap('Digit0');ZC.tick(200);
th+' | nuts='+ZC.W.nuts+' | '+U.st()+' | '+U.obj()
//@@
const r=[U.walkTo(0,0,-58.6,6)];ZC.tick(20);const H=ZC.HERO;H.potap.face=Math.PI;ZC.tick(1);ZC.press('KeyR');ZC.tick(40);
const th='threads:'+ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')+(t.thick?'T':'')+t.len.toFixed(1)+' y'+t.y.toFixed(2)+'-'+t.y2.toFixed(2)).join(' ');
U.tap('KeyQ');r.push(U.walkTo(0,0,-75,10));r.push(U.walkTo(1,0.3,-58,6));r.push(U.walkTo(1,0,-75,10));U.tap('KeyK');r.push(U.walkTo(1,0.3,-58,8));r.push(U.walkTo(1,0,-75.5,10));
th+' | '+r.join(',')+' | '+U.st()+' thanks='+!!ZC.W.flags.thanks+' sag='+!!ZC.W.flags.sagged
//@@ shot=m5.png
U.tap('Digit1');U.tap('Digit0');ZC.tick(240);U.st()+' | '+U.obj()+' links='+ZC.W.links
//@@
const r=[U.walkTo(0,-1,-80,5),U.walkTo(1,1,-80,5)];ZC.tick(90);r.join(',')+' foes='+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind).join(',')
//@@ shot=m6.png
const b=U.brawl(90);b+' petals='+ZC.players.map(p=>p.petals).join('/')+' downed='+ZC.players.map(p=>p.downed).join('/')+' | '+U.obj()
//@@
const r=[U.walkTo(0,0,-99.5,8),U.walkTo(0,0,-103,4)];ZC.tick(60);r.join(',')+' links='+ZC.W.links+' nuts='+ZC.W.nuts+' trans='+!!ZC.G.trans+' next='+ZC.G.nextLevel+' got='+JSON.stringify(ZC.G.got)
