U.go();ZC.loadLevel(ZC.LV('2-4'));ZC.tick(20);for(let k=0;k<6;k++){ZC.skip();ZC.tick(30);}
[ZC.W.name,U.st(),'split='+ZC.G.splitTarget,'cine='+!!ZC.G.cine].join(' | ')
//@@ shot=k24a.png
// перепонки: просто идём вперёд — проходим, когда раскрыты
const r=[U.walkTo(0,-2,-31,14),U.walkTo(1,2,-31,14)];r.join(' ')+' | '+U.st()
//@@ shot=k24b.png
// озеро: Йоша поливает клапан (левые ворота), просит; Прошка стреляет в колокол (правые ворота)
const r=[];U.tap('KeyK');ZC.tick(5);r.push('p2='+U.act(1).kind);
r.push(U.walkTo(1,6,-36,8),U.walkTo(1,7.8,-49.5,8));ZC.press('KeyL');ZC.tick(60);
r.push(U.walkTo(1,6,-57,6));ZC.press('Digit0');ZC.tick(30);
r.push(U.walkTo(0,-6,-36,8),U.walkTo(0,-6,-46,8));const h=U.act(0);h.face=Math.atan2(-2.4-h.pos.x,-46.3-h.pos.z);ZC.tick(2);ZC.press('KeyE');ZC.tick(90);
r.push('gates='+ZC.W.gates?'':'');r.join(' ')+' | ask='+!!ZC.W.flags.ask
//@@
const r=[U.walkTo(0,-3,-68.5,8),U.walkTo(1,3,-68.5,8)];ZC.tick(40);const al=ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind);for(const e of ZC.W.enemies)e.alive=false;ZC.tick(60);
r.join(' ')+' | arena='+al.join(',')+' | split='+ZC.G.splitTarget
//@@
const r=[U.walkTo(0,-2,-89,8),U.walkTo(1,2,-89,8)];ZC.tick(20);for(let k=0;k<3;k++){ZC.skip();ZC.tick(30);}
r.join(' ')+' | caught='+!!ZC.W.flags.caught+' p2='+U.act(1).kind+' pel='+ZC.HERO.pelageya.pos.y.toFixed(1)
//@@
// клапан-батут: Йоша стоит на клапане — ждём, пока подбросит высоко
const Y=U.act(1);Y.pos.set(6.2,0,-93.2);Y.vel.set(0,0,0);let top=0;for(let i=0;i<60*4;i++){ZC.tick(1);top=Math.max(top,Y.pos.y);if(Y.pos.y>0.2)Y.vel.x=0;}
// на уступ и полить пузырь
Y.pos.set(6.4,4.2,-98.6);Y.vel.set(0,0,0);ZC.tick(10);ZC.press('KeyL');ZC.tick(150);
'padTop='+top.toFixed(2)+' freed='+!!ZC.W.flags.freed
//@@
// реснички: оба бьют одну ресничку одновременно, три раза
const r=[];for(const x of[-5,0,5]){const a=U.act(0),b=U.act(1);a.pos.set(x-1.1,0,-113.2);b.pos.set(x+1.1,0,-113.2);a.vel.set(0,0,0);b.vel.set(0,0,0);ZC.tick(4);
 a.face=Math.atan2(x-a.pos.x,-114-a.pos.z);b.face=Math.atan2(x-b.pos.x,-114-b.pos.z);ZC.press('KeyF');ZC.press('Comma');ZC.tick(40);}
ZC.tick(90);'final='+!!ZC.W.flags.final+' cine='+!!ZC.G.cine
//@@ shot=k24c.png
for(let k=0;k<4;k++){ZC.skip();ZC.tick(40);}ZC.tick(120);'lvl='+ZC.W.levelId+' got='+JSON.stringify(ZC.G.got)
