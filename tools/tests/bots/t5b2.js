//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-B2'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj(),'foes='+W.enemies.length);r
//@@ shot=w5b2a.png
ZC.tick(60);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const KG=['KeyG','Period'],KR=['ShiftLeft','Slash'],KJ=['Space','KeyM'];let log=[],last='';const skazPick={skaz1:[1],skaz2:[0],skaz3:[0,1]};
for(let i=0;i<60*400;i++){const st=F.stage;if(st!==last){log.push((i/60).toFixed(0)+':'+st+'/'+F.links);last=st;}if(st==='chain'||ZC.W.levelId!=='5-B2')break;
  if(ZC.G.cine){ZC.skip();ZC.tick(2);continue;}
  if(ZC.G.ui==='skaz'){(skazPick[st]||[0,1]).forEach(pi=>ZC.press(KJ[pi]));ZC.tick(2);continue;}
  const RG=W.RG;if(RG.on&&Math.abs(RG.t-1.38)<0.009){ZC.press(KG[0]);ZC.press(KG[1]);}
  for(const pi of[0,1]){const h=U.act(pi);const e=W.enemies.find(x=>x.alive&&x.tgt===h&&x.state==='wind');if(e){const left=e.wdur-e.t;if(e.sig==='red'){if(left<0.2)ZC.press(KR[pi]);}else if(left<0.14&&e.left===null)ZC.press(KG[pi]);}
    const bo=W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.16);if(bo)ZC.press(KG[pi]);}
  if(st==='w2'){const y=H.yosha;const tgt=F.full?{x:0,z:-22.4}:{x:-6.5,z:-18.5};const B=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];const dx=tgt.x-y.pos.x,dz=tgt.z-y.pos.z;const d=Math.hypot(dx,dz);
    ZC.hold(B[0],dx<-0.4&&d>1.2);ZC.hold(B[1],dx>0.4&&d>1.2);ZC.hold(B[2],dz<-0.4&&d>1.2);ZC.hold(B[3],dz>0.4&&d>1.2);if(F.full&&d<2.4&&i%20===0){y.face=Math.atan2(dx,dz);ZC.press('KeyL');}if(i%300===0)log.push('Y'+y.pos.x.toFixed(1)+','+y.pos.z.toFixed(1)+' full='+F.full+' act='+U.act(1).kind);}
  else ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].forEach(k=>ZC.hold(k,false));
  if(st==='forge'){const FG=W.FG,FB=0.7;if(FG.on&&FG.t>=0){const u=FG.t-Math.floor(FG.t/(6*FB))*6*FB;for(const b of[1,2,3])if(Math.abs(u-b*FB)<0.009)ZC.press('KeyF');}}
  ZC.tick(1);}
r.push(log.join(' '),'oakW='+F.oakW,'stage='+F.stage,'links='+F.links,'names='+JSON.stringify(ZC.G.flags.names),'ending='+JSON.stringify(ZC.G.flags.ending),'claspQ='+ZC.G.flags.claspQ);r
//@@ shot=w5b2b.png
ZC.tick(60*20);
//@@
const W=ZC.W,F=W.flags;const r=['cine='+!!ZC.G.cine];ZC.skip();ZC.tick(300);r.push('lv='+ZC.W.levelId,'w5done='+ZC.G.flags.w5done,'nameless='+ZC.G.flags.nameless);r
