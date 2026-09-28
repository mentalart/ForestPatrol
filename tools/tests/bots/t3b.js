//@@
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r=[];let t=0;
while(sol.perch&&t<60*14){ZC.tick(1);t++;}r.push('down t='+(t/60).toFixed(1));r.push(U.brawl(8.5));r.push('emb='+sol.embers,sol.state,'perch='+sol.perch,'phase='+F.phase);r
//@@
const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r3=[];
// пробой — добиваем
let t=0;while(sol.perch&&t<60*25){ZC.tick(1);t++;}sol.embers=0;sol.state='broken';sol.t=0;sol.bdur=6;ZC.tick(2);
r3.push(U.brawl(4),'phase='+F.phase);ZC.tick(200);r3.push('dark='+(F.dark||0).toFixed(2),'perch='+sol.perch,'guard='+(sol.guardAll&&sol.guardAll()),U.st());r3
//@@ shot=w3bb.png
ZC.tick(1);
//@@
// фаза 2: свет у Пелагеи, Прошка без света бьёт
const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r4=[];if(!U.act(1).lit)U.tap('Semicolon');ZC.tick(3);
r4.push(U.walkTo(1,sol.pos.x+2.2,sol.pos.z+2.5,5));ZC.tick(300);r4.push('sparks='+W.sparks.length,'emb='+sol.embers,'lit='+sol.litNow);r4.push(U.brawl(25),'emb='+sol.embers,sol.state,'phase='+F.phase);r4
//@@
const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r5=['phase='+F.phase];
if(F.phase===2){sol.embers=0;sol.state='broken';sol.t=0;sol.bdur=6;ZC.tick(2);r5.push(U.brawl(4));}ZC.tick(120);r5.push('phase='+F.phase,'puff='+(F.puff||0).toFixed(2),'perch='+sol.perch);
// рогатка по жёлудю
if(!ZC.HERO.proshka.active)U.tap('KeyQ');ZC.tick(3);U.tap('KeyE');ZC.tick(80);r5.push(sol.state,'perch='+sol.perch);
// богатырский мах вдвоём
const hs=[U.act(0),U.act(1)];r5.push(U.walkTo(0,sol.pos.x-1.6,sol.pos.z+1.6,4),U.walkTo(1,sol.pos.x+1.6,sol.pos.z+1.6,4));hs.forEach(h=>{h.face=Math.atan2(sol.pos.x-h.pos.x,sol.pos.z-h.pos.z);});ZC.press('KeyF');ZC.press('Comma');ZC.tick(5);r5.push('won='+F.won,sol.state);ZC.tick(100);r5.push(!!ZC.G.cine);r5
//@@ shot=w3bc.png
ZC.tick(1);
//@@
ZC.skip();ZC.tick(10);const W=ZC.W;const r6=['song='+!!W.song,!!ZC.G.cine];
// Пелагея прыгает в долю
let n=0;for(let i=0;i<60*10&&W.song;i++){const S=W.song;const B=60/84;const k=Math.round(S.t/B);if(k>=0&&k<8&&Math.abs(S.t-k*B)<0.02&&U.act(1).grounded)ZC.press('KeyM');ZC.tick(1);n++;}
r6.push('ticks='+n,!!ZC.G.cine);ZC.tick(60);ZC.skip();ZC.tick(200);r6.push(W.levelId,ZC.W.levelId,ZC.G.done['3-B']);r6
