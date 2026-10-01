U.go();ZC.loadLevel(3);ZC.tick(30);const r=[U.walkTo(0,-5.5,-5.4),U.walkTo(1,5.5,-5.4)];const H=ZC.HERO;H.proshka.face=Math.PI;H.pelageya.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.press('Semicolon');ZC.tick(40);
// сам бросивший идёт по своей струне
const a=U.walkTo(0,-5.1,-14,8),b=U.walkTo(1,5.5,-14,8);r.join(',')+' '+a+','+b+' threads='+ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')).join(' ')+' '+U.st()+' falls='+ZC.G.stats.falls
//@@
// второй колышек: снова сам
const H=ZC.HERO;U.walkTo(0,-5.5,-14.2,2);U.walkTo(1,5.5,-14.2,2);H.proshka.face=Math.PI;H.pelageya.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.press('Semicolon');ZC.tick(40);
const th=ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)).join(' ');const a=U.walkTo(0,-5.1,-24.2,8),b=U.walkTo(1,5.9,-24.2,8);
th+' | '+a+','+b+' '+U.st()+' falls='+ZC.G.stats.falls+' threads='+ZC.W.threads.length
//@@
// Паутинник у второго колышка: пришёл к пустой струне — распутать, пока грызёт
const u=U.until(()=>ZC.W.enemies.some(e=>e.kind==='tat'&&e.alive),6);const b=U.brawl(40);u+' '+b+' strings='+ZC.W.threads.filter(t=>t.string).length+' '+U.st()+' falls='+ZC.G.stats.falls
//@@
// позвать второго: идёт по струне следом
U.tap('Digit1');U.tap('Digit0');ZC.tick(60*6);U.st()+' carries='+ZC.G.stats.carries+' falls='+ZC.G.stats.falls
//@@
// смотать струну RB
U.tap('KeyR');ZC.tick(5);'threads='+ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')).join(' ')
//@@
// ветка: бросок и съезд тем же героем
const r=[U.walkTo(0,-5.8,-33.5,6),U.walkTo(0,-5.8,-40.5,6),U.walkTo(0,-4,-42.6,4)];ZC.tick(30);const H=ZC.HERO;const h=U.act(0);h.face=Math.atan2(0.6-h.pos.x,-53.6-h.pos.z);ZC.tick(1);ZC.press('KeyR');ZC.tick(40);
const th=ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)).join(' ');const tx=h.pos.x+Math.sin(h.face)*1.2,tz=h.pos.z+Math.cos(h.face)*1.2;U.walkTo(0,tx,tz,1);const L=[];for(let i=0;i<150;i++){ZC.tick(1);if(i%15==0)L.push(h.pos.z.toFixed(1)+'/'+h.pos.y.toFixed(2)+(h.hang?'h':''));}
r.join(',')+' '+th+' | '+L.join(' ')+' nuts='+ZC.W.nuts
//@@
// Пелагея: с ветки сама бросает и съезжает, Йошу — «Ко мне!»
U.tap('Digit1');U.tap('Digit0');ZC.tick(120);const r=[U.walkTo(1,-5.8,-33.5,8),U.walkTo(1,-5.8,-40.5,6),U.walkTo(1,-3,-42.4,4)];ZC.tick(20);const h=U.act(1);h.face=Math.atan2(0.6-h.pos.x,-53.6-h.pos.z);ZC.tick(1);ZC.press('Semicolon');ZC.tick(40);
U.walkTo(1,h.pos.x+Math.sin(h.face)*1.2,h.pos.z+Math.cos(h.face)*1.2,1);ZC.tick(150);U.tap('Digit0');U.tap('Digit1');ZC.tick(300);r.join(',')+' '+U.st()+' | '+U.obj()
//@@
// толстая струна Потапа: Потапом на камень, бросок; все идут по ней, Потапа зовут в конце
if(ZC.players[0].act!==1)U.tap('KeyQ');const r=[U.walkTo(0,0,-58.6,8)];ZC.tick(20);const H=ZC.HERO;H.potap.face=Math.PI;ZC.tick(1);ZC.press('KeyR');ZC.tick(40);
const th=ZC.W.threads.filter(t=>t.thick).map(t=>(t.string?'S':'')+t.len.toFixed(1)).join(' ');U.tap('KeyQ');r.push(U.walkTo(0,0,-75,10));r.push(U.walkTo(1,0.3,-58,8),U.walkTo(1,0,-75,10));U.tap('KeyK');r.push(U.walkTo(1,0.3,-58,8),U.walkTo(1,0,-75.5,10));
U.tap('Digit1');ZC.tick(240);'thick='+th+' '+r.join(',')+' | '+U.st()+' thanks='+!!ZC.W.flags.thanks+' sag='+!!ZC.W.flags.sagged
//@@
// за толстой струной — берег Журавля (дальше уровень проверяет t12long: Журавль и Цапля, огоньки, Царевна-лягушка, бесёнок, стычка и выход)
const r=[U.walkTo(0,-1,-84,5),U.walkTo(1,1,-84,5)];ZC.tick(90);r.join(',')+' wed='+ZC.W.flags.wed.stage+' told='+ZC.W.flags.wed.told+' links='+ZC.W.links+'/'+ZC.W.linkTotal+' | '+U.obj()
