//@@
window.FHAM=(max)=>{const W=ZC.W;const e=W.k52.ham();if(!e)return 'none';let refl=0;for(let i=0;i<60*(max||60);i++){if(!e.alive||W.flags.stage!=='ham')return 'done t='+(i/60).toFixed(1)+' refl='+refl;
  const h=U.act(0),B=['KeyA','KeyD','KeyW','KeyS'];const b=W.bolts.find(q=>!q.refl&&q.tgt===h&&q.left===null);if(b&&b.eta<0.12){ZC.press('KeyG');refl++;}
  const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz),open=e.state==='broken'||e.state==='stagger';const far=open?d>1.8:d<3.5?false:d>5.5;
  ZC.hold(B[0],far&&dx<-0.3);ZC.hold(B[1],far&&dx>0.3);ZC.hold(B[2],far&&dz<-0.3);ZC.hold(B[3],far&&dz>0.3);if(open&&d<2.2){h.face=Math.atan2(dx,dz);if(i%8===0)ZC.press('KeyF');}
  if(e.state==='wind'&&!e.def.ranged){const left=e.wdur-e.t;if(left<0.16&&e.left===null)ZC.press('KeyG');}ZC.tick(1);}
  ['KeyA','KeyD','KeyW','KeyS'].forEach(k=>ZC.hold(k,false));return 'TIMEOUT state='+e.state+' emb='+e.embers+' refl='+refl;};
// 5-2: разминка с Хамелеем у капусты (перенял гусли), колыбельная по знаку гуслей усаживает зайца
Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-2'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);
const W=ZC.W,F=W.flags,K=W.k52;const r=['stage='+F.stage,'ham='+!!(K.ham()&&K.ham().alive)];r.push(FHAM(60));ZC.tick(30);r.push('stage='+F.stage);
// колыбельная: заяц у капусты, герой рядом со знаком — RB
const h=U.act(0);h.pos.set(1.5,0,-15);for(let i=0;i<600&&K.HR.state!=='center';i++)ZC.tick(1);K.HR.lullCd=0;ZC.press('KeyR');ZC.tick(3);r.push('hare='+K.HR.state,'lulls='+(F.lulls||0));
r.push(F.stage==='hunt'&&K.HR.state==='lull'?'ok':'FAIL lull');r
//@@
// круг 2: мышь перегрызает нить (круг не смыкается), клубок по знаку связывает её
const W=ZC.W,F=W.flags,K=W.k52;const r=[];for(const pi of[0,1])for(let s=0;s<2;s++){const hh=U.act(pi);const p=K.spot(0,hh.kind);hh.pos.set(p.x,0,p.z);if(s===0){U.tap(pi?'KeyK':'KeyQ');ZC.tick(4);}}
for(let i=0;i<120&&K.circle()<1;i++)ZC.tick(1);r.push('circle='+K.circle());
for(let i=0;i<60*20&&!K.TH.some(t=>t.cut);i++)ZC.tick(1);const cut=K.TH.findIndex(t=>t.cut);r.push('cut='+cut);
for(const pi of[0,1])for(let s=0;s<2;s++){const hh=U.act(pi);const p=K.spot(1,hh.kind);hh.pos.set(p.x,0,p.z);hh.vel.set(0,0,0);if(s===0){U.tap(pi?'KeyK':'KeyQ');ZC.tick(4);}}
ZC.tick(60);const held=K.circle();ZC.press('KeyR');ZC.tick(5);r.push('heldAt='+held,'cut after='+K.TH.some(t=>t.cut),'reties='+(F.reties||0));for(let i=0;i<120&&K.circle()<2;i++){if(K.TH.some(t=>t.cut)&&i%15===0)ZC.press('KeyR');ZC.tick(1);}r.push('circle='+K.circle());
r.push(cut>=0&&held===1&&(F.reties||0)>=1&&K.circle()===2?'ok':'FAIL mice');r
//@@
// круг 3: заяц хитрит (приседает к одной нити, бежит к другой) — Прошка ходит туда-сюда, нить мерцает; за 30 с хоть раз
const W=ZC.W,F=W.flags,K=W.k52;const r=[];let feints=0;for(let i=0;i<60*30;i++){if(K.HR.feint>=0)feints++;ZC.hold('KeyA',Math.floor(i/40)%2===0);ZC.hold('KeyD',Math.floor(i/40)%2===1);ZC.tick(1);if(feints>0&&K.HR.feint<0&&i>60)break;}ZC.hold('KeyA',false);ZC.hold('KeyD',false);r.push('feintFrames='+feints);r.push(feints>0?'ok':'FAIL feint');r
//@@
// финал: зеркальце — Кощей один в тереме, потом уровень пройден
const W=ZC.W,F=W.flags,K=W.k52;for(const pi of[0,1])for(let s=0;s<2;s++){const hh=U.act(pi);const p=K.spot(2,hh.kind);hh.pos.set(p.x,0,p.z);hh.vel.set(0,0,0);if(s===0){U.tap(pi?'KeyK':'KeyQ');ZC.tick(4);}}
for(let i=0;i<600&&F.stage!=='toss';i++){if(K.TH.some(t=>t.cut))ZC.press('KeyR');ZC.tick(1);}const r=['stage='+F.stage];if(U.act(0).kind!=='potap'){U.tap('KeyQ');ZC.tick(3);}U.tap('KeyE');ZC.tick(5);ZC.skip();ZC.tick(150);
let mv=false,dur=0;for(let i=0;i<900&&ZC.W.levelId==='5-2';i++){if(ZC.G.cine&&ZC.G.cine.dur===7.5){mv=true;dur=ZC.G.cine.dur;}const fr=document.getElementById('mvFrame');if(fr&&fr.style.opacity==='1')mv=true;ZC.tick(1);}
r.push('mirror='+mv,'lv='+ZC.W.levelId);r.push(mv&&ZC.W.levelId!=='5-2'?'ok':'FAIL mirror');r
