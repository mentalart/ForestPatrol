//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-2'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj(),'lt='+W.linkTotal);r
//@@
// круг 1: каждый игрок ставит обоих героев
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const C={x:0,z:-18};const ORDER=['proshka','pelageya','potap','yosha'];const ANG=[-Math.PI*0.75,-Math.PI*0.25,Math.PI*0.25,Math.PI*0.75];
const sp=(k,kind)=>{const R=[7,5,3.2][k],i=ORDER.indexOf(kind);return [C.x+Math.sin(ANG[i])*R,C.z+Math.cos(ANG[i])*R];};window.SP=sp;
const place=(k)=>{const out=[];for(const pi of[0,1]){for(let s=0;s<2;s++){const h=U.act(pi);const [x,z]=sp(k,h.kind);out.push(h.kind+':'+U.walkTo(pi,x,z,8));if(s===0){U.tap(pi?'KeyK':'KeyQ');ZC.tick(5);}}}return out.join(' ');};window.PLACE=place;
r.push(place(0));ZC.tick(60);r.push('circle stage='+F.stage,'links='+W.links,'hare='+ZC.W.flags.stage);r.push(U.obj());r
//@@ shot=w52a.png
ZC.tick(10);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];r.push(PLACE(1));U.until(()=>W.links>=1&&ZC.W.flags.closeT===0,3);r.push('links='+W.links,U.obj());r.push(PLACE(2));U.until(()=>F.stage==='toss',12);r.push('links='+W.links,'stage='+F.stage,U.obj());r
//@@ shot=w52b.png
ZC.tick(10);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];if(U.act(0).kind!=='potap'){U.tap('KeyQ');ZC.tick(3);}U.tap('KeyE');ZC.tick(5);r.push('cine='+!!ZC.G.cine);ZC.skip();ZC.tick(200);r.push('lv='+ZC.W.levelId,'links');r
