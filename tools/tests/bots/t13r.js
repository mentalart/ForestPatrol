U.go();ZC.loadLevel(4);ZC.tick(10);ZC.skip();ZC.tick(5);
window.rbot=function(n,skill){const S=ZC.W.song,B=S.B;const K=[{j:'Space',g:'KeyG',r:'ShiftLeft',l:'KeyA',rt:'KeyD'},{j:'KeyM',g:'Period',r:'Slash',l:'ArrowLeft',rt:'ArrowRight'}];
 for(let i=0;i<n;i++){if(S.state!=='play')break;
  for(const pi of[0,1]){const h=U.act(pi),k=K[pi];const kb=Math.round(S.t/B),d=S.t-kb*B;
   // желаемая дорожка
   let want=S.lane[pi];const ahead=o=>o.pi===pi&&!o.hit&&o.z<h.pos.z&&h.pos.z-o.z<9;
   const pit=S.obst.find(o=>o.type==='pit'&&ahead(o));const midStr=S.strings.find(s=>s.pi===pi&&!s.used&&s.lanes.length===1&&s.z<h.pos.z&&h.pos.z-s.z<9);
   if(pit||midStr)want=1;else{const st=S.obst.filter(o=>o.type==='stump'&&ahead(o)&&h.pos.z-o.z<7);if(st.length){const blocked=new Set();st.forEach(o=>o.lanes.forEach(l=>blocked.add(l)));if(blocked.has(want)){for(const l of[1,0,2])if(!blocked.has(l)){want=l;break;}}}}
   if(want<S.lane[pi]&&i%6===0)ZC.press(k.l);if(want>S.lane[pi]&&i%6===0)ZC.press(k.rt);
   if(Math.abs(d)<0.009){const s=S.strings.find(q=>q.pi===pi&&!q.used&&Math.abs(q.z-h.pos.z)<1.3&&q.lanes.includes(S.lane[pi]));if(s&&Math.random()<skill)ZC.press(k.j);
     const b=S.beasts.find(q=>q.pi===pi&&!q.res&&q.k===kb);if(b&&Math.random()<skill)ZC.press(k.g);}
   const log=S.obst.find(o=>o.type==='log'&&ahead(o)&&h.pos.z-o.z<1.25&&h.pos.z-o.z>0.95);if(log&&h.grounded)ZC.press(k.j);
   const br=S.obst.find(o=>o.type==='branch'&&ahead(o)&&h.pos.z-o.z<1.1&&h.pos.z-o.z>0.7);if(br&&h.grounded&&h.rollT<=0)ZC.press(k.r);}
  ZC.tick(1);}
 return 't='+S.t.toFixed(1)+' k='+S.lastK+' hits='+JSON.stringify(S.hits)+' tries='+JSON.stringify(S.tries)+' links='+ZC.W.links+' nuts='+ZC.W.nuts+' rep='+JSON.stringify(S.rep)+' combo='+S.best+' sparks='+S.got+' hitObst='+S.obst.filter(o=>o.hit).length;};
rbot(60*22,1)+' | '+U.st()
//@@
rbot(60*21,1)+' | '+U.st()
//@@ shot=r1.png
rbot(60*10,1)+' state='+ZC.W.song.state+' untaken='+ZC.W.song.items.filter(q=>!q.it.taken).map(q=>q.it.kind+'@'+q.it.pos.x.toFixed(1)+','+q.it.pos.z.toFixed(1)).join(' ')+' stumbles='+ZC.W.song.stLog
//@@
ZC.skip();ZC.tick(60*2);const S=ZC.W.song;const r0='state='+S.state+' ft='+(S.ft||0).toFixed(2);
// первый круг: второй игрок промахивается на 2-й доле
let n=0;const L=[];while(n<60*20&&S.state==='final'){n++;if(S.fin){const k=Math.round(S.ft/S.B2),d=S.ft-k*S.B2;if(k>=0&&Math.abs(d)<0.009){ZC.press('Space');if(!(k===1&&!S.missed)){ZC.press('KeyM');}else S.missed=true;}}ZC.tick(1);if(n%60==0)L.push(S.lit.map(x=>x?1:0).join(''));}
r0+' | '+L.join(' ')+' | state='+S.state+' t='+(n/60).toFixed(1)
//@@ shot=r2.png
ZC.tick(60*2);const c=!!ZC.G.cine;ZC.skip();ZC.tick(60*4);'gift cine='+c+' links='+ZC.W.links+' lvl='+ZC.W.levelId+' got='+JSON.stringify(ZC.G.got)
