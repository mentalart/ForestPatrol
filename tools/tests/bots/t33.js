//@@
ZC.startFrom(ZC.LV('3-3'));ZC.G.manual=true;ZC.tick(20);const r=[!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(ZC.W.song.state);r
//@@
window.T33=function(sec,skipPi){const S=ZC.W.song;const n=Math.round(sec*60);
  for(let i=0;i<n&&S.state==='play';i++){for(const pi of[0,1]){if(pi===skipPi)continue;let k=-1;for(let q=Math.max(0,S.lastK);q<Math.min(S.NB,S.lastK+3);q++)if(S.need(pi,q)&&!S.judged[pi][q]){k=q;break;}
      if(k>=0&&S.t>=S.bt[k]-0.025&&S.t<S.bt[k]+0.05&&U.act(pi).grounded)ZC.press(pi?'KeyM':'Space');}ZC.tick(1);}
  return [S.state,S.t.toFixed(1),S.lastK,S.combo.join('/'),S.best.join('/'),'links='+ZC.W.links,'nuts='+ZC.W.nuts,JSON.stringify(S.rep)];};
T33(22)
//@@ shot=w33a.png
ZC.tick(1);
//@@
T33(22)
//@@ shot=w33b.png
ZC.tick(1);
//@@
const q=T33(40,0);[q,ZC.W.song.listenT.toFixed(1),ZC.W.song.soloT.toFixed(1),!!ZC.G.cine,U.st()]
//@@ shot=w33c.png
ZC.tick(300);
//@@
ZC.skip();ZC.tick(200);[ZC.W.levelId,ZC.G.done['3-3'],ZC.G.got['3-3'],ZC.G.nutsGot['3-3']]
