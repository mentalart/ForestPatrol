//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('z-d'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.obj());
r.push(U.brawl(150));ZC.tick(30);r.push('stage='+W.flags.stage,'t='+W.flags.t.toFixed(0),'best='+JSON.stringify(ZC.G.zbest)+' arm='+Object.keys((JSON.parse(localStorage.getItem('zlatayaCep.wardrobe.v1')||'{}').owned)||{}).join(','));ZC.tick(260);r.push('lv='+ZC.W.levelId);r
//@@
// Алёша: перекличка
ZC.startFrom(ZC.LV('z-a'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,F=W.flags,ZA=W.ZA,H=ZC.HERO;const r=[W.name,F.stage];let log=[];
for(let n=0;n<60*200&&F.stage==='run';n++){if(ZA.state!=='input'){ZC.tick(1);continue;}const want=ZA.SEQ[ZA.input.length];const b=ZA.BELLS[want];
  if(b.high){if(U.act(0).kind!=='proshka'){U.tap('KeyQ');ZC.tick(3);}const p=U.act(0);if(Math.hypot(p.pos.x-b.pos.x,p.pos.z-b.pos.z)>12){U.walkTo(0,b.pos.x*0.6,-7,4);}p.face=Math.atan2(b.pos.x-p.pos.x,b.pos.z-p.pos.z);U.tap('KeyE');ZC.tick(40);}
  else{const q=U.walkTo(0,b.pos.x,b.pos.z+1.2,5);U.act(0).face=Math.atan2(b.pos.x-U.act(0).pos.x,b.pos.z-U.act(0).pos.z);U.tap('KeyF');ZC.tick(25);}}
r.push('stage='+F.stage,'t='+F.t.toFixed(0),'pen='+(F.pen||0),'best='+JSON.stringify(ZC.G.zbest)+' arm='+Object.keys((JSON.parse(localStorage.getItem('zlatayaCep.wardrobe.v1')||'{}').owned)||{}).join(','));r
//@@ shot=za.png
ZC.tick(5);
//@@
// Илья: крен моста
ZC.startFrom(ZC.LV('z-i'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,F=W.flags,H=ZC.HERO;const r=[W.name,F.stage];
if(U.act(0).kind!=='potap'){U.tap('KeyQ');ZC.tick(3);}
const K0=['KeyA','KeyD','KeyW','KeyS'],K1=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];
const pair=(ax,bx,z)=>{for(let i=0;i<60*40;i++){const a=U.act(0),b=U.act(1);const s=(h,K,x)=>{const dx=x-h.pos.x,dz=z-h.pos.z;ZC.hold(K[0],dx<-0.25);ZC.hold(K[1],dx>0.25);ZC.hold(K[2],dz<-0.3);ZC.hold(K[3],dz>0.3);return Math.hypot(dx,dz)<0.5;};
  const g=W.gust?W.gust():0;const d1=s(a,K0,ax-g*(a.kind==='potap'?2.2:2)),d2=s(b,K1,bx-g*2);ZC.tick(1);if(d1&&d2)break;}K0.concat(K1).forEach(k=>ZC.hold(k,false));ZC.tick(2);};
pair(-0.6,1.8,1);for(let z=-1;z>=-36;z-=5)pair(-0.6,1.8,z);r.push('trip1 '+U.st(),'tips='+(F.tips||0));
U.tap('KeyQ');U.tap('KeyK');ZC.tick(5);r.push('act='+U.act(0).kind+'/'+U.act(1).kind);pair(-1.4,1.4,1);for(let z=-1;z>=-36;z-=5)pair(-1.4,1.4,z);r.push('trip2 '+U.st(),'tips='+(F.tips||0),'stage='+F.stage,'t='+F.t.toFixed(0),'best='+JSON.stringify(ZC.G.zbest)+' arm='+Object.keys((JSON.parse(localStorage.getItem('zlatayaCep.wardrobe.v1')||'{}').owned)||{}).join(','));r
//@@ shot=zi.png
ZC.tick(5);
