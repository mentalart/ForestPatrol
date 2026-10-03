//@@
ZC.startFrom(ZC.LV('3-3'));ZC.G.manual=true;ZC.tick(20);ZC.skip();ZC.tick(5);'ok'
//@@
window.T33=function(sec,skipPi,log){const S=ZC.W.song;const n=Math.round(sec*60);const JK=['Space','KeyM'],GK=['KeyG','Period'];const L=[];
  for(let i=0;i<n&&S.state==='play';i++){for(const pi of[0,1]){if(pi===skipPi)continue;
      if(S.hold[pi]){ZC.hold(JK[pi],S.t<S.hold[pi].end);}else ZC.hold(JK[pi],false);
      let k=-1;for(let q=Math.max(0,S.lastK);q<Math.min(S.NB,S.lastK+3);q++){const e=S.ev(pi,q);if(!e)continue;if(e==='guard'?S.jg[pi][q]:S.judged[pi][q])continue;k=q;break;}
      if(log&&pi===0&&i%6===0){const h=U.act(0);L.push(S.t.toFixed(2)+':k'+k+(k>=0?S.ev(0,k):'')+' y'+h.pos.y.toFixed(2)+' g'+(+h.grounded)+' vy'+h.vel.y.toFixed(1)+' '+h.kind);}
      if(k<0||S.t<S.bt[k]-0.025||S.t>=S.bt[k]+0.05)continue;const e=S.ev(pi,k);
      if(e==='guard')ZC.press(GK[pi]);else if(U.act(pi).grounded){ZC.press(JK[pi]);if(e==='hold')ZC.hold(JK[pi],true);}}
    ZC.tick(1);}
  return L.join('\n');};
T33(110);'t='+ZC.W.song.t.toFixed(1)+' k='+ZC.W.song.lastK
//@@
T33(8,undefined,false)+"\n"+JSON.stringify(Object.entries(ZC.W.song.judged[0]).filter(([k,v])=>v==="miss"))
