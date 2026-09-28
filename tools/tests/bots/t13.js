U.go();ZC.loadLevel(4);ZC.tick(10);const S=ZC.W.song;[S.state,!!ZC.G.cine,U.st(),U.obj()].join(' | ')
//@@
ZC.skip();ZC.tick(30);const S=ZC.W.song;[S.state,S.t.toFixed(2),U.st()].join(' | ')
//@@ shot=k13a.png
// бот: игрок 0 попадает, игрок 1 — половину промахивает в фразе 2 (проверка «Лада» нет: один попадает)
window.bot=function(n,miss1){const S=ZC.W.song,B=S.B;const J=['Space','KeyM'],G=['KeyG','Period'];let log=[];
 for(let i=0;i<n;i++){if(S.state!=='play')break;
  for(const pi of[0,1]){const h=U.act(pi);const k=Math.round(S.t/B),d=S.t-k*B;if(Math.abs(d)>0.009)continue;
   const s=S.strings.find(q=>q.pi===pi&&!q.used&&Math.abs(q.z-h.pos.z)<1.3);if(s&&!(miss1&&pi===1))ZC.press(J[pi]);
   const b=S.beasts.find(q=>q.pi===pi&&!q.res&&q.k===k);if(b&&!(miss1&&pi===1))ZC.press(G[pi]);}
  ZC.tick(1);}
 return 't='+S.t.toFixed(1)+' k='+S.lastK+' hits='+JSON.stringify(S.hits)+' tries='+JSON.stringify(S.tries)+' links='+ZC.W.links+' nuts='+ZC.W.nuts+' rep='+JSON.stringify(S.rep);};
bot(60*22)+' | '+U.st()
//@@ shot=k13b.png
bot(60*40)+' | '+U.obj()
//@@ shot=k13c.png
const S=ZC.W.song;[S.state,!!ZC.G.cine].join(' ')
//@@
ZC.tick(60*8);ZC.skip();ZC.tick(90);const S=ZC.W.song;[S.state,S.ft&&S.ft.toFixed(2),!!S.fin].join(' ')
//@@
const S=ZC.W.song;const J=['Space','KeyM'];for(let i=0;i<60*5&&S.state==='final';i++){if(S.fin){const k=Math.round(S.ft/S.B2),d=S.ft-k*S.B2;if(k>=0&&k<4&&Math.abs(d)<0.009){ZC.press(J[0]);ZC.press(J[1]);}}ZC.tick(1);}
[S.state,!!ZC.G.cine].join(' ')
//@@
ZC.tick(60*4);ZC.skip();ZC.tick(60*3);'links='+ZC.W.links+' got='+JSON.stringify(ZC.G.got)+' trans='+!!ZC.G.trans+' lvl='+ZC.W.levelId
