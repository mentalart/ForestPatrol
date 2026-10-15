U.go();ZC.loadLevel(7);ZC.tick(60);const c=!!ZC.G.cine;ZC.skip();ZC.tick(30);'cine='+c+' phase='+ZC.W.flags.phase+' foes='+ZC.W.enemies.map(e=>e.kind+':'+e.state+':'+e.sig).join(',')
//@@ shot=b1.png
// бот до первого Пробоя руки
let n=0;const W=ZC.W;while(n<60*60&&!W.enemies.some(e=>e.state==='broken')){U.brawl(1/60);n++;}
'broken after '+(n/60).toFixed(1)+'s '+W.enemies.map(e=>e.kind+':'+e.state+':'+e.embers).join(',')+' petals='+ZC.players.map(p=>p.petals).join('/')+' eaten? '+U.st()
//@@
const W=ZC.W;const e=W.enemies.find(e=>e.state==='broken');const sh={x:e.side*2.4,z:-22.5};const h=U.act(0);const hx=e.pos.x,hz=e.pos.z;const lp=(a,b,t)=>a+(b-a)*t;
const r=[U.walkTo(0,hx,hz+1.2,4)];for(let k=1;k<=8;k++){r.push(U.walkTo(0,lp(hx,sh.x,k/8),lp(hz,sh.z,k/8),2)+'/'+h.pos.y.toFixed(1));}
const y=h.pos.y;h.face=Math.atan2(0-h.pos.x,-24.2-h.pos.z);ZC.tick(1);ZC.press('KeyF');ZC.tick(30);
r.join(',')+' y='+y.toFixed(2)+' head='+W.flags.head+' '+U.st()
//@@
window.cycle=function(){const W=ZC.W;let n=0;while(n<60*60&&!W.enemies.some(e=>e.state==='broken'&&e.kind==='hand')){U.brawl(1/60);n++;}
  const e=W.enemies.find(e=>e.state==='broken');if(!e)return 'no break';const sh={x:e.side*2.4,z:-22.5};const h=U.act(0);const hx=e.pos.x,hz=e.pos.z;const lp=(a,b,t)=>a+(b-a)*t;
  U.walkTo(0,hx,hz+1.2,4);for(let k=1;k<=8;k++)U.walkTo(0,lp(hx,sh.x,k/8),lp(hz,sh.z,k/8),2);h.face=Math.atan2(0-h.pos.x,-24.2-h.pos.z);ZC.tick(1);ZC.press('KeyF');ZC.tick(40);
  return 'n='+(n/60).toFixed(1)+' head='+W.flags.head+' y='+h.pos.y.toFixed(1);};
const out=[];let g=0;while(ZC.W.flags.phase===1&&g<8){ZC.tick(60);out.push(cycle());g++;}out.join(' | ')+' phase='+ZC.W.flags.phase+' cine='+!!ZC.G.cine
//@@
ZC.tick(60*2);ZC.skip();ZC.tick(60);const W=ZC.W;'phase='+W.flags.phase+' stakes='+W.stakes.length+' dbl='+W.group.children.length+' | '+U.obj()
//@@
window.ph2=function(){return U.k1bTrap(0,90);};   // ложный двойник рвёт струну (аудит 1-Б): струна — перед настоящим (helpers.js)
ph2()
//@@
ZC.tick(60*3);ph2()+' phase='+ZC.W.flags.phase
//@@
ZC.tick(60*3);const W=ZC.W;let n=0;const st0={...ZC.G.stats};
while(n<60*150&&!W.flags.won){n++;const c=W.cring;if(c&&c.on&&Math.abs(c.t-1.3)<0.012){ZC.press('KeyG');ZC.press('Period');}
  if(n%600==0){for(const pi of[0,1])if(ZC.players[pi].blue>=1)ZC.press(pi?'KeyK':'KeyQ');}
  U.brawl(1/60);}
const b=W.enemies.find(e=>e.kind==='leshyBoss');'phase='+W.flags.phase+' won='+!!W.flags.won+' t='+(n/60).toFixed(1)+' boss='+(b?b.state+':'+b.embers+' shell='+JSON.stringify(b.shell):'-')+' shields+'+(ZC.G.stats.shields-st0.shields)+' bog='+ZC.G.stats.bogatyr+' blue='+ZC.players.map(p=>p.blue.toFixed(2)).join('/')+' petals='+ZC.players.map(p=>p.petals).join('/')
//@@ shot=b4.png
ZC.tick(60*3);const c=!!ZC.G.cine;ZC.skip();ZC.tick(60*4);'cine='+c+' lvl='+ZC.W.levelId+' done='+JSON.stringify(ZC.G.done)
