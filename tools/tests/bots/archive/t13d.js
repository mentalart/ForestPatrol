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

const S=ZC.W.song;const L=[];const orig=window.rbot;
for(let i=0;i<60*14;i++){rbot(1,1);if(i%20==0&&S.lastK>=16&&S.lastK<=24)L.push(S.lastK+':L'+S.lane[0]+'x'+U.act(0).pos.x.toFixed(1));}
L.join(' ')+' st='+S.stLog
