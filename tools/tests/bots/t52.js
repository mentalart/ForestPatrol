//@@
window.FHAM=(max)=>{const W=ZC.W;const e=W.k52.ham();if(!e)return 'none';let refl=0;for(let i=0;i<60*(max||60);i++){if(!e.alive||W.flags.stage!=='ham')return 'done t='+(i/60).toFixed(1)+' refl='+refl;
  const h=U.act(0),B=['KeyA','KeyD','KeyW','KeyS'];const b=W.bolts.find(q=>!q.refl&&q.tgt===h&&q.left===null);if(b&&b.eta<0.12){ZC.press('KeyG');refl++;}
  const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz),open=e.state==='broken'||e.state==='stagger';const far=open?d>1.8:d<3.5?false:d>5.5;
  ZC.hold(B[0],far&&dx<-0.3);ZC.hold(B[1],far&&dx>0.3);ZC.hold(B[2],far&&dz<-0.3);ZC.hold(B[3],far&&dz>0.3);if(open&&d<2.2){h.face=Math.atan2(dx,dz);if(i%8===0)ZC.press('KeyF');}
  if(e.state==='wind'&&!e.def.ranged){const left=e.wdur-e.t;if(left<0.16&&e.left===null)ZC.press('KeyG');}ZC.tick(1);}
  ['KeyA','KeyD','KeyW','KeyS'].forEach(k=>ZC.hold(k,false));return 'TIMEOUT state='+e.state+' emb='+e.embers+' refl='+refl;};
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-2'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj(),'lt='+W.linkTotal);r
//@@
// разминка: Хамелей у капусты перенял гусли — распутываем
const W=ZC.W,F=W.flags;const r=['stage='+F.stage];r.push(FHAM(60));ZC.tick(30);r.push('stage='+F.stage);r.push(F.stage==='hunt'?'ok':'FAIL ham');r
//@@
// круг 1: каждый игрок ставит обоих героев
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const C={x:0,z:-18};const ORDER=['proshka','pelageya','potap','yosha'];const ANG=[-Math.PI*0.75,-Math.PI*0.25,Math.PI*0.25,Math.PI*0.75];
const sp=(k,kind)=>{const R=[7,5,3.2][k],i=ORDER.indexOf(kind);return [C.x+Math.sin(ANG[i])*R,C.z+Math.cos(ANG[i])*R];};window.SP=sp;
const place=(k)=>{const out=[];for(const pi of[0,1]){for(let s=0;s<2;s++){const h=U.act(pi);const [x,z]=sp(k,h.kind);out.push(h.kind+':'+U.walkTo(pi,x,z,8));if(s===0){U.tap(pi?'KeyK':'KeyQ');ZC.tick(5);}}}return out.join(' ');};window.PLACE=place;
r.push(place(0));ZC.tick(60);r.push('circle stage='+F.stage,'links='+W.links,'hare='+ZC.W.flags.stage);r.push(U.obj());r
//@@ shot=w52a.png
ZC.tick(10);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];r.push(PLACE(1));for(let i=0;i<60*40&&W.links<2;i++){if(W.k52.TH.some(t=>t.cut)&&i%20===0)ZC.press('KeyR');ZC.tick(1);if(i%240===0&&W.links<2&&!W.k52.TH.some(t=>t.cut))PLACE(1);}r.push('reties='+(F.reties||0));r.push('links='+W.links,U.obj());r.push(PLACE(2));U.until(()=>F.stage==='toss',12);r.push('links='+W.links,'stage='+F.stage,U.obj());r
//@@ shot=w52b.png
ZC.tick(10);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];if(U.act(0).kind!=='potap'){U.tap('KeyQ');ZC.tick(3);}U.tap('KeyE');ZC.tick(5);r.push('cine='+!!ZC.G.cine);for(let q=0;q<4;q++){if(ZC.G.cine)ZC.skip();ZC.tick(60);}ZC.tick(200);r.push('lv='+ZC.W.levelId,'links');r
