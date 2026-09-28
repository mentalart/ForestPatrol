U.go();ZC.loadLevel(7);ZC.tick(60);const c=!!ZC.G.cine;ZC.skip();ZC.tick(30);'cine='+c+' phase='+ZC.W.flags.phase+' foes='+ZC.W.enemies.map(e=>e.kind+':'+e.state+':'+e.sig).join(',')
//@@ shot=b1.png
// бот до первого Пробоя руки
let n=0;const W=ZC.W;while(n<60*60&&!W.enemies.some(e=>e.state==='broken')){U.brawl(1/60);n++;}
'broken after '+(n/60).toFixed(1)+'s '+W.enemies.map(e=>e.kind+':'+e.state+':'+e.embers).join(',')+' petals='+ZC.players.map(p=>p.petals).join('/')+' eaten? '+U.st()
//@@
const W=ZC.W;const e=W.enemies.find(e=>e.state==='broken');const sh={x:e.side*2.4,z:-22.5};const h=U.act(0);const hx=e.pos.x,hz=e.pos.z;const lp=(a,b,t)=>a+(b-a)*t;
const r=[U.walkTo(0,hx,hz+1.2,4)];for(let k=1;k<=8;k++){r.push(U.walkTo(0,lp(hx,sh.x,k/8),lp(hz,sh.z,k/8),2)+'/'+h.pos.y.toFixed(1));}
const y=h.pos.y;h.face=Math.atan2(0-h.pos.x,-24.2-h.pos.z);ZC.tick(1);ZC.press('KeyF');ZC.tick(30);
r.join(',')+' y='+y.toFixed(2)+' head='+W.flags.head+' '+U.st()
//@@
window.cycle=function(){const W=ZC.W;let n=0;while(n<60*60&&!W.enemies.some(e=>e.state==='broken'&&e.kind==='hand')){U.brawl(1/60);n++;}
  const e=W.enemies.find(e=>e.state==='broken');if(!e)return 'no break';const sh={x:e.side*2.4,z:-22.5};const h=U.act(0);const hx=e.pos.x,hz=e.pos.z;const lp=(a,b,t)=>a+(b-a)*t;
  U.walkTo(0,hx,hz+1.2,4);for(let k=1;k<=8;k++)U.walkTo(0,lp(hx,sh.x,k/8),lp(hz,sh.z,k/8),2);h.face=Math.atan2(0-h.pos.x,-24.2-h.pos.z);ZC.tick(1);ZC.press('KeyF');ZC.tick(40);
  return 'n='+(n/60).toFixed(1)+' head='+W.flags.head+' y='+h.pos.y.toFixed(1);};
ZC.tick(60);const a=cycle();ZC.tick(60);const b=cycle();a+' | '+b+' phase='+ZC.W.flags.phase+' cine='+!!ZC.G.cine
//@@
ZC.tick(60*2);ZC.skip();ZC.tick(60);const W=ZC.W;'phase='+W.flags.phase+' stakes='+W.stakes.length+' dbl='+W.group.children.length+' | '+U.obj()
//@@
window.ph2=function(){const W=ZC.W;const st=W.stakes.find(s=>!s.used);const h=U.act(0);U.walkTo(0,st.x*0.25,-14+(st.z+14)*0.25,5);h.face=Math.atan2(st.x-h.pos.x,st.z-h.pos.z);ZC.tick(1);ZC.press('KeyR');ZC.tick(40);
 const th=W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)).join(' ');U.tap('KeyQ');const r0=W.flags.round||0;
 let n=0,hits=0;while(n<60*60&&W.flags.phase===2&&(W.flags.round||0)===r0){n++;const f=W.doubles.find(d=>d.state==='fallen');const a=U.act(0);
   if(f){const d=Math.hypot(f.pos.x-a.pos.x,f.pos.z-a.pos.z);if(d>2.2){const B=['KeyA','KeyD','KeyW','KeyS'];const dx=f.pos.x-a.pos.x,dz=f.pos.z-a.pos.z;ZC.hold(B[0],dx<-0.3);ZC.hold(B[1],dx>0.3);ZC.hold(B[2],dz<-0.3);ZC.hold(B[3],dz>0.3);}
     else{['KeyA','KeyD','KeyW','KeyS'].forEach(k=>ZC.hold(k,false));a.face=Math.atan2(f.pos.x-a.pos.x,f.pos.z-a.pos.z);if(n%10==0){ZC.press('KeyF');hits++;}}}
   ZC.tick(1);}
 ['KeyA','KeyD','KeyW','KeyS'].forEach(k=>ZC.hold(k,false));U.tap('KeyQ');
 return 'th='+th+' '+(n/60).toFixed(1)+'s round='+W.flags.round+' hits='+hits+' left='+W.doubles.filter(d=>d.state!=='gone').length;};
ph2()
//@@
ZC.tick(60*3);ph2()+' phase='+ZC.W.flags.phase
//@@
ZC.tick(60*3);const W=ZC.W;let n=0;const L=[];let prev='';
while(n<60*40&&!W.flags.won){n++;const c=W.cring;if(c&&c.on&&Math.abs(c.t-1.3)<0.012){ZC.press('KeyG');ZC.press('Period');}
  const b=W.enemies.find(e=>e.kind==='leshyBoss');const st=b?b.state+(b.finT>0?'F':''):'-';if(st!==prev){L.push((n/60).toFixed(1)+':'+st+':'+(b?b.embers:0)+' d0='+(b?Math.hypot(U.act(0).pos.x-b.pos.x,U.act(0).pos.z-b.pos.z).toFixed(1):'')+' d1='+(b?Math.hypot(U.act(1).pos.x-b.pos.x,U.act(1).pos.z-b.pos.z).toFixed(1):'')+' ring='+(c?c.on+'/'+c.next.toFixed(1):''));prev=st;}
  U.brawl(1/60);}
L.join(' | ')
