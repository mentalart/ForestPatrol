U.go();ZC.loadLevel(4);ZC.tick(10);ZC.skip();ZC.tick(5);
window.bot2=function(n,skipPh){const S=ZC.W.song,B=S.B;const J=['Space','KeyM'];
 for(let i=0;i<n;i++){if(S.state!=='play')break;
  for(const pi of[0,1]){const h=U.act(pi);const k=Math.round(S.t/B),d=S.t-k*B;if(Math.abs(d)>0.009)continue;if(Math.floor(k/16)===skipPh&&S.rep[skipPh]===0)continue;
   const s=S.strings.find(q=>q.pi===pi&&!q.used&&Math.abs(q.z-h.pos.z)<1.3);if(s)ZC.press(J[pi]);}
  ZC.tick(1);}
 return 't='+S.t.toFixed(1)+' k='+S.lastK+' hits='+JSON.stringify(S.hits)+' links='+ZC.W.links+' nuts='+ZC.W.nuts+' rep='+JSON.stringify(S.rep)+' '+U.st();};
bot2(60*20.5,1)
//@@ shot=k13d.png
bot2(60*10,1)
