U.go();ZC.loadLevel(3);ZC.tick(30);ZC.skip();ZC.tick(20);const H=ZC.HERO;
// Прошка у края трясины бросает тонкую нить к толстому колышку
H.proshka.pos.set(0.6,0,-59.4);H.proshka.vel.set(0,0,0);H.proshka.face=Math.PI;ZC.tick(3);ZC.press('KeyR');ZC.tick(50);
const t=ZC.W.threads.find(q=>q.owner===0&&!q.ret);const tip=t?(t.sz+t.dz*t.len):null;
'thread='+!!t+' tipZ='+(tip&&tip.toFixed(2))+' len='+(t&&t.len.toFixed(2))+' string='+(t&&t.string)+' grow='+(t&&t.grow)
//@@
// бежим до конца нити и прыгаем вперёд изо всех сил
const H=ZC.HERO;const r=U.walkTo(0,0.6,-63.6,4);ZC.hold('KeyW',true);ZC.press('Space');let maxZ=0;for(let i=0;i<150;i++){ZC.tick(1);maxZ=Math.min(maxZ,H.proshka.pos.z);}ZC.hold('KeyW',false);
'walk='+r+' minZ='+maxZ.toFixed(2)+' falls='+ZC.G.stats.falls+' now='+H.proshka.pos.z.toFixed(1)
//@@
// Потап подкидывает Пелагею с конца нити, она пытается планировать
const H=ZC.HERO;ZC.tick(60);H.proshka.pos.set(0.6,0,-59.4);H.proshka.face=Math.PI;ZC.tick(3);ZC.press('KeyR');ZC.tick(50);
const t=ZC.W.threads.find(q=>q.owner===0&&!q.ret);
ZC.press('KeyQ');ZC.tick(5);   // игрок 1 — Потап
H.potap.pos.set(0.6,0.02,-63.2);H.potap.vel.set(0,0,0);H.potap.face=Math.PI;H.pelageya.pos.set(0.6,0.02,-62.4);H.pelageya.vel.set(0,0,0);ZC.tick(4);
ZC.press('KeyE');ZC.tick(2);ZC.hold('ArrowUp',true);ZC.hold('KeyM',true);let minZ=0,glid=0;for(let i=0;i<200;i++){ZC.tick(1);minZ=Math.min(minZ,H.pelageya.pos.z);if(H.pelageya.glide)glid++;}ZC.hold('ArrowUp',false);ZC.hold('KeyM',false);
'potapActive='+H.potap.active+' thread='+!!t+' minZ='+minZ.toFixed(2)+' glideFrames='+glid+' pelZ='+H.pelageya.pos.z.toFixed(1)+' falls='+ZC.G.stats.falls
//@@ shot=k12deep.png
// Потап на камне — толстая струна по-прежнему доходит до колышка
const H=ZC.HERO;ZC.W.threads.slice().forEach(q=>{});H.potap.pos.set(0,0.22,-58.6);H.potap.face=Math.PI;H.potap.vel.set(0,0,0);ZC.tick(5);ZC.press('KeyR');ZC.tick(60);
const t=ZC.W.threads.find(q=>q.thick);'thick='+!!t+' string='+(t&&t.string)+' len='+(t&&t.len.toFixed(1))
