U.go();ZC.loadLevel(4);ZC.tick(10);'ok'
//@@
ZC.skip();ZC.tick(30);ZC.W.song.state
//@@
// бот раннера: дорожки, прыжки, кувырки, струны и звери в такт. miss — список игроков, которые не жмут струны
window.rbot=function(n,o){o=o||{};const S=ZC.W.song;const J=['Space','KeyM'],G=['KeyG','Period'],R=['ShiftLeft','Slash'],L=['KeyA','ArrowLeft'],Rt=['KeyD','ArrowRight'];
 const LANES=[[-5.2,-3.2,-1.2],[1.2,3.2,5.2]];let log=[];let lastLane=[-1,-1];
 const oz=o2=>o2.type==='barrel'?o2.bz:o2.z;
 for(let i=0;i<n;i++){if(S.state!=='play')break;
  for(const pi of[0,1]){const h=U.act(pi);if(o.idle&&o.idle.includes(pi))continue;
   // какая дорожка свободна: пни, дыры, бочки в ближайших 7 м; перед обвалом — на середину
   const bad=l=>S.obst.some(x=>x.pi===pi&&!x.hit&&(x.type==='stump'||x.type==='hole'||x.type==='barrel')&&x.lanes.includes(l)&&oz(x)<h.pos.z+0.8&&h.pos.z-oz(x)<7.5);
   const pit=S.obst.some(x=>x.pi===pi&&!x.hit&&x.type==='pit'&&x.z<h.pos.z+0.5&&h.pos.z-x.z<12);
   const pick=S.picks.find(q=>q.pi===pi&&!q.taken&&q.z<h.pos.z&&h.pos.z-q.z<9);
   let want=S.lane[pi];if(pit)want=1;else if(pick&&!bad(pick.lane))want=pick.lane;else if(bad(want)){const c=[1,0,2].filter(l=>!bad(l));if(c.length)want=c.sort((a,b)=>Math.abs(a-S.lane[pi])-Math.abs(b-S.lane[pi]))[0];}
   if(want!==S.lane[pi]&&i%6===pi*3)ZC.press(want<S.lane[pi]?L[pi]:Rt[pi]);
   // прыжок: коряга впереди, струна в такт
   const k=S.lastK,t=S.t;let bk=null;for(const q of[k,k+1]){const d=t-(q>=0?0:0);}
   const log_=S.obst.find(x=>x.pi===pi&&!x.hit&&x.type==='log'&&x.z<h.pos.z&&h.pos.z-x.z<1.25);
   const br=S.obst.find(x=>x.pi===pi&&!x.hit&&x.type==='branch'&&x.z<h.pos.z&&h.pos.z-x.z<1.6);
   const hole=S.obst.find(x=>x.pi===pi&&!x.hit&&x.type==='hole'&&x.lanes.includes(S.lane[pi])&&x.z<h.pos.z&&h.pos.z-x.z<0.9);
   const s=S.strings.find(q=>q.pi===pi&&!q.used&&Math.abs(q.z-h.pos.z)<1.3&&q.lanes.includes(S.lane[pi]));
   const onB=Math.abs(S.bph)<0.012||Math.abs(S.bph-1)<0.012||(S.B&&(S.bph*S.B<0.0175));
   if(s&&!(o.miss&&o.miss.includes(pi))&&onB&&h.grounded)ZC.press(J[pi]);
   else if((log_||hole)&&h.grounded&&!s)ZC.press(J[pi]);
   if(br&&h.grounded&&h.rollT<=0)ZC.press(R[pi]);
   const b=S.beasts.find(q=>q.pi===pi&&!q.res&&Math.abs(q.z-h.pos.z)<3.6);if(b&&onB&&S.lastK===b.k)ZC.press(G[pi]);}
  ZC.tick(1);}
 return 't='+S.t.toFixed(1)+' k='+S.lastK+' part='+S.part+' hits='+JSON.stringify(S.hits)+' tries='+JSON.stringify(S.tries)+' got='+JSON.stringify(S.got)+' combo='+JSON.stringify(S.best)+' fox='+JSON.stringify(S.fox)+' st='+(S.stumbles||0)+' log='+(S.stLog||[]).join(',')+' links='+ZC.W.links+' nuts='+ZC.W.nuts+' rep='+JSON.stringify(S.rep);};
rbot(60*13.2)
//@@ shot=k13o.png
'snap'
//@@
rbot(60*3.4)
//@@ shot=k13o2.png
'snap2 mag='+(ZC.W.song.mag[0]>ZC.W.song.t)
