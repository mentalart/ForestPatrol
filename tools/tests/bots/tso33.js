//@@
ZC.setSolo(true);ZC.startFrom(ZC.LV('3-3'));ZC.G.manual=true;ZC.tick(20);const r=[!!ZC.G.cine,ZC.W.name];ZC.skip();ZC.tick(5);r.push(ZC.W.song.state,'NB='+ZC.W.song.NB,'end='+ZC.W.song.bt[ZC.W.song.NB].toFixed(0)+'s');r.join(' ')
//@@
window.T33=function(sec,skipPi,missPart){const S=ZC.W.song;const n=Math.round(sec*60);const JK=['Space','KeyM'],GK=['KeyG','Period'];
  for(let i=0;i<n&&S.state==='play';i++){for(const pi of[ZC.G.soloPi]){if(pi===skipPi&&S.typ(Math.max(0,S.lastK))==="solo")continue;
      if(S.hold[pi]){ZC.hold(JK[0],S.t<S.hold[pi].end);}else ZC.hold(JK[0],false);
      let k=-1;for(let q=Math.max(0,S.lastK);q<Math.min(S.NB,S.lastK+3);q++){const e=S.ev(pi,q);if(!e)continue;if(e==='guard'?S.jg[pi][q]:S.judged[pi][q])continue;k=q;break;}
      if(k<0||S.t<S.bt[k]-0.025||S.t>=S.bt[k]+0.05)continue;const e=S.ev(pi,k);if(missPart!==undefined&&S.typ(k)===missPart)continue;
      if(e==='guard')ZC.press(GK[0]);else if(U.act(pi).grounded){ZC.press(JK[0]);if(e==='hold')ZC.hold(JK[0],true);}}
    ZC.tick(1);}
  const miss=[0,1].map(pi=>{const m={};for(const k in S.judged[pi])if(S.judged[pi][k]==='miss'){const t=S.typ(+k);m[t]=(m[t]||0)+1;}for(const k in S.jg[pi])if(S.jg[pi][k]==='miss'){m.guard=(m.guard||0)+1;}return JSON.stringify(m);});
  return [S.state,'t='+S.t.toFixed(1),'k='+S.lastK,'part='+S.phase,'best='+S.best.join('/'),'holds='+S.holds,'feath='+S.feathers,'shields='+S.shields,'merges='+S.merges,'links='+ZC.W.links,'nuts='+ZC.W.nuts,'rep='+JSON.stringify(S.rep),'miss='+miss.join(' ')].join(' ');};
T33(20)
//@@ shot=w33n1.png
ZC.tick(1);
//@@
T33(19)
//@@ shot=w33n2.png
ZC.tick(1);
//@@
T33(21.5)
//@@ shot=w33n3.png
ZC.tick(1);
//@@
T33(18)
//@@ shot=w33n4.png
ZC.tick(1);
//@@
T33(18)
//@@ shot=w33n5.png
ZC.tick(1);
//@@
T33(15)
//@@ shot=w33n6.png
ZC.tick(1);
//@@
const q=T33(50,0);[q,ZC.W.song.listenT.toFixed(1),ZC.W.song.soloT.toFixed(1),!!ZC.G.cine,U.st()].join(' | ')
//@@ shot=w33n7.png
ZC.tick(300);
//@@
ZC.skip();ZC.tick(200);[ZC.W.levelId,ZC.G.done['3-3'],ZC.G.got['3-3'],ZC.G.nutsGot['3-3']].join(' ')
