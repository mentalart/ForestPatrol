//@@
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r=[];let t=0;window.IMM=()=>ZC.HERO&&Object.values(ZC.HERO).forEach(h=>{h.iT=99;});
while(sol.perch&&t<60*14){IMM();ZC.tick(1);t++;}r.push('down');IMM();r.push(U.brawl(18));r.push('emb='+sol.embers,sol.state,'ph='+F.phase,'shields='+ZC.G.stats.shields,'parries='+ZC.G.stats.parries);r
//@@
const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r=[];
// сразу в фазу 3
IMM();const h=U.act(0);let guard=0;while(F.phase<3&&guard<12){guard++;IMM();sol.embers=0;sol.state='broken';sol.t=0;sol.bdur=9;ZC.tick(2);U.walkTo(0,sol.pos.x+0.3,sol.pos.z+2.2,3);h.face=Math.atan2(sol.pos.x-h.pos.x,sol.pos.z-h.pos.z);U.tap('KeyF');ZC.tick(20);r.push('ph='+F.phase);}
let t=0;while(!F.puffing&&t<600){IMM();ZC.tick(1);t++;}ZC.tick(30);r.push('puffing='+F.puffing,'puff='+F.puff,U.st());
if(!ZC.HERO.proshka.active)U.tap('KeyQ');ZC.tick(2);U.walkTo(0,0,-12.5,3);ZC.HERO.proshka.face=Math.PI;U.tap('KeyE');ZC.tick(90);r.push(sol.state,'perch='+sol.perch,sol.pos.z.toFixed(1));
const hs=[U.act(0),U.act(1)];r.push(U.walkTo(0,sol.pos.x-1.8,sol.pos.z+1.4,4),U.walkTo(1,sol.pos.x+1.8,sol.pos.z+1.4,4));hs.forEach(q=>{q.face=Math.atan2(sol.pos.x-q.pos.x,sol.pos.z-q.pos.z);});ZC.press('KeyF');ZC.press('Comma');ZC.tick(5);r.push('won='+F.won,sol.state);ZC.tick(100);r.push(!!ZC.G.cine);r
//@@
ZC.skip();ZC.tick(10);const W=ZC.W;const r6=['song='+!!W.song,!!ZC.G.cine];
let n=0,j=0;for(let i=0;i<60*10&&W.song;i++){const S=W.song;const B=60/84;const k=Math.round(S.t/B);if(k>=0&&k<8&&Math.abs(S.t-k*B)<0.017&&U.act(1).grounded){ZC.press('KeyM');j++;}ZC.tick(1);n++;}
r6.push('ticks='+n,'jumps='+j,!!ZC.G.cine);ZC.tick(60);ZC.skip();ZC.tick(200);r6.push(ZC.W.levelId,ZC.G.done['3-B']);r6
