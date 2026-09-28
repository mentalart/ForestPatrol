//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-4'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj(),'lt='+W.linkTotal,'NB='+W.S54.NB);r
//@@ shot=w54a.png
ZC.tick(150);
//@@
// бот: прыжок/защита точно в долю; клетку — Йошей
const W=ZC.W,H=ZC.HERO,F=W.flags,S=W.S54;const r=[];const KJ=['Space','KeyM'],KG=['KeyG','Period'];let log=[],pressed={};
for(let i=0;i<60*140;i++){if(F.stage==='moyo'||S.state!=='play')break;
  for(const pi of[0,1]){for(let k=Math.max(0,S.lastK);k<=S.lastK+1&&k<S.NB;k++){const key=pi+':'+k+':'+S.t.toFixed(0);const d=S.bt[k]-S.t;if(d<0.02&&d>-0.02&&!S.judged[pi][k]){ZC.press(S.act(pi,k)==='guard'?KG[pi]:KJ[pi]);}}}
  if(F.cageOn&&!F.freed){if(U.act(1).kind!=='yosha')ZC.press('KeyK');else if(Math.abs(U.act(1).pos.z-(-240))<999)ZC.press('KeyL');}
  ZC.tick(1);if(i%900===0)log.push((i/60)+'s k='+S.lastK+' ph='+S.phase+' c='+S.combo.join('/'));}
r.push(log.join(' '),'stage='+F.stage,'freed='+F.freed,'flips='+S.flips,'scares='+S.scares,'tog='+S.together,'best='+S.best.join('/'),'links='+W.links,'nuts='+W.nuts);r
//@@ shot=w54b.png
ZC.tick(5);
//@@
const W=ZC.W,F=W.flags;const r=['cine='+!!ZC.G.cine];ZC.tick(300);r.push('t');ZC.skip();ZC.tick(5);r.push('links='+W.links+'/'+W.linkTotal);ZC.tick(200);r.push('lv='+ZC.W.levelId,'got='+ZC.G.got['5-4'],'zvenBack='+ZC.G.flags.zvenBack);r
