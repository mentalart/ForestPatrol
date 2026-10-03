//@@
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(30);const F=ZC.W.flags;const e=ZC.W.enemies[0];
const log=[];let ph=F.phase;const t0=Date.now();
for(let k=0;k<60;k++){const r=U.brawl(1.5);if(F.phase!==ph){log.push('t='+k*1.5+' phase '+ph+'->'+F.phase);ph=F.phase;}if(!e.alive||r.indexOf('cleared')===0){log.push('t='+k*1.5+' alive='+e.alive+' st='+e.state+' inList='+ZC.W.enemies.includes(e)+' won='+F.won+' cine='+!!ZC.G.cine);break;}}
log.push('end phase='+F.phase+' emb='+e.embers+' st='+e.state+' cur='+F.current);log
