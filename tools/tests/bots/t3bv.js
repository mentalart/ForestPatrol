//@@
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r=[];let t=0;window.IMM=()=>ZC.HERO&&Object.values(ZC.HERO).forEach(h=>{h.iT=99;});
window.HIT=(pi,x,z)=>{const h=U.act(pi);h.face=Math.atan2(x-h.pos.x,z-h.pos.z);ZC.press(pi?'Comma':'KeyF');};
window.BREAK=()=>{IMM();sol.embers=0;sol.state='broken';sol.t=0;sol.bdur=9;ZC.tick(2);};
window.FIN=(pi)=>{const ph=F.phase;const L=[];for(let k=0;k<6&&F.phase===ph;k++){BREAK();['KeyA','KeyD','KeyW','KeyS','KeyG','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Period'].forEach(q=>ZC.hold(q,false));U.walkTo(pi,sol.pos.x+0.3,sol.pos.z+2.2,3);const h=U.act(pi);L.push(h.kind+':'+Math.hypot(sol.pos.x-h.pos.x,sol.pos.z-h.pos.z).toFixed(1)+':'+sol.state+':'+(ZC.players[pi].downed?'D':''));HIT(pi,sol.pos.x,sol.pos.z);ZC.tick(20);}return L.join(',');};
// стадия 1: смотрим таблички и волны
let signs=new Set();while(sol.perch&&t<60*14){IMM();ZC.tick(1);t++;const m=document.getElementById('solsign');if(m&&m.style.display==='block')signs.add(t);}
r.push('down t='+(t/60).toFixed(1),'signFrames='+signs.size,'shields='+ZC.G.stats.shields,'bar='+document.getElementById('bossbar').textContent.trim());r.join(' | ')
//@@ shot=w3bv1.png
ZC.tick(1);
//@@
const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r=[];
IMM();r.push(U.brawl(10));r.push('emb='+sol.embers,sol.state,'ph='+F.phase);
if(F.phase===1)r.push(FIN(0));r.push('ph='+F.phase);ZC.tick(200);
// стадия 2: свет у Пелагеи
if(!U.act(1).lit)U.tap('Semicolon');ZC.tick(3);IMM();r.push(U.walkTo(1,sol.pos.x+2.2,sol.pos.z+2.5,5));ZC.tick(60*8);r.push('lit='+sol.litNow,'dark='+(F.dark||0).toFixed(2),'pelLit='+U.act(1).lit);
r.join(' | ')
//@@ shot=w3bv2.png
ZC.tick(1);
//@@
const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r=[];
r.push(FIN(0));r.push('ph='+F.phase);
let t=0;while(!F.fly&&t<300){IMM();ZC.tick(1);t++;}r.push('fly='+F.fly+' t='+t,'y='+sol.pos.y.toFixed(1));IMM();ZC.tick(60*6);r.push('afterStorm '+U.st());
r.join(' | ')
//@@ shot=w3bv3.png
ZC.tick(1);
//@@
const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r=[];
// один колокол — не звон
IMM();r.push(U.walkTo(0,-8.2,-11,5));HIT(0,-8.2,-12.5);ZC.tick(10);r.push('single down='+!!F.down);ZC.tick(120);
// два колокола разом
IMM();r.push(U.walkTo(1,8.2,-11,6));IMM();U.walkTo(0,-8.2,-11,3);HIT(0,-8.2,-12.5);HIT(1,8.2,-12.5);ZC.tick(5);r.push('down='+!!F.down);let t=0;while(sol.state!=='broken'&&t<200){IMM();ZC.tick(1);t++;}r.push(sol.state,'y='+sol.pos.y.toFixed(1));
IMM();r.push(U.walkTo(0,sol.pos.x-0.5,sol.pos.z+2,4));HIT(0,sol.pos.x,sol.pos.z);ZC.tick(10);r.push('knock='+F.knock);ZC.tick(90);
r.join(' | ')
//@@ shot=w3bv4.png
ZC.tick(1);
//@@
const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r=[];
// облачный колокол: светим пером (Пелагея свет уже держит?) — идём к обоим колоколам со светом
IMM();if(!U.act(0).lit)U.tap('KeyR');if(!U.act(1).lit)U.tap('Semicolon');ZC.tick(2);
r.push(U.walkTo(0,-8.2,-11,6),U.walkTo(1,8.2,-11,6));IMM();ZC.tick(100);
HIT(0,-8.2,-12.5);HIT(1,8.2,-12.5);ZC.tick(5);r.push('down2='+!!F.down);let t=0;while(sol.state!=='broken'&&t<200){IMM();ZC.tick(1);t++;}
IMM();U.walkTo(1,sol.pos.x+0.5,sol.pos.z+2,4);HIT(1,sol.pos.x,sol.pos.z);ZC.tick(10);r.push('knock='+F.knock,'ph='+F.phase);
r.join(' | ')
//@@
const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r=[];
let t=0;while(!F.puffing&&t<400){IMM();ZC.tick(1);t++;}r.push('puffing='+F.puffing+' t='+t,'marks='+W.marks.length);
// Прошка у насеста, смотрит на Соловья
if(!ZC.HERO.proshka.active)U.tap('KeyQ');IMM();U.walkTo(0,0,-10,4);const pr=ZC.HERO.proshka;
const near=()=>{let b=-1,bd=1e9;W.marks.forEach((m,i)=>{if(!m.active())return;const d=Math.hypot(m.pos.x-pr.pos.x,m.pos.z-pr.pos.z);if(d<bd){bd=d;b=i;}});return b;};
// ненастоящий
pr.face=Math.PI;t=0;while(near()!==1&&t<300){IMM();ZC.tick(1);t++;}const p0=F.puff;ZC.press('KeyE');ZC.tick(40);r.push('fake: puff '+p0.toFixed(2)+'→'+F.puff.toFixed(2),'act1='+W.marks[1].active());
// совиный взор + настоящий
U.tap('KeyL');ZC.tick(2);r.push('owl='+W.owlT.toFixed(1));pr.face=Math.PI;t=0;while(near()!==0&&t<300){IMM();ZC.tick(1);t++;}ZC.press('KeyE');ZC.tick(80);r.push('real: '+sol.state,'perch='+sol.perch);
r.join(' | ')
//@@ shot=w3bv5.png
ZC.tick(1);
//@@
const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r=[];
const both=()=>{IMM();U.walkTo(0,sol.pos.x-1.8,sol.pos.z+1.4,4);U.walkTo(1,sol.pos.x+1.8,sol.pos.z+1.4,4);HIT(0,sol.pos.x,sol.pos.z);HIT(1,sol.pos.x,sol.pos.z);ZC.tick(5);};
both();r.push('round='+F.round,sol.state);let t=0;while(!F.puffing&&t<400){IMM();ZC.tick(1);t++;}r.push('again puffing='+F.puffing);
// второй раунд: сразу пробой
IMM();const pr=ZC.HERO.proshka;U.walkTo(0,0,-10,4);const near=()=>{let b=-1,bd=1e9;W.marks.forEach((m,i)=>{if(!m.active())return;const d=Math.hypot(m.pos.x-pr.pos.x,m.pos.z-pr.pos.z);if(d<bd){bd=d;b=i;}});return b;};
pr.face=Math.PI;t=0;while(near()!==0&&t<300){IMM();ZC.tick(1);t++;}ZC.press('KeyE');ZC.tick(80);r.push(sol.state);both();r.push('round='+F.round,'won='+F.won);ZC.tick(100);r.push('cine='+!!ZC.G.cine);
r.join(' | ')
//@@
ZC.skip();ZC.tick(10);const W=ZC.W;const r6=['song='+!!W.song,!!ZC.G.cine];
let n=0,j=0;for(let i=0;i<60*10&&W.song;i++){const S=W.song;const B=60/84;const k=Math.round(S.t/B);if(k>=0&&k<8&&Math.abs(S.t-k*B)<0.017&&U.act(1).grounded){ZC.press('KeyM');j++;}ZC.tick(1);n++;}
r6.push('ticks='+n,'jumps='+j,!!ZC.G.cine);ZC.tick(60);ZC.skip();ZC.tick(200);r6.push(ZC.W.levelId,ZC.G.done['3-B']);r6.join(' ')
