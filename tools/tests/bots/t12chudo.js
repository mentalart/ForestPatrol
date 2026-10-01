//@@
// 1-2 «Кикиморино болото», живое болото: Паутинники на кочках гати (заметные: фиолетовые, красный ромб и круг), Журавль ждёт, пока гать не очистят;
// чудо болотное — пузыри и тёмный круг, высовывается у струны и сталкивает героя, щит держит; в остальной трясине только выглядывает;
// лягушки прыгают и плюхаются в воду, если подойти; камыш, осока, кувшинки и коряги — инстансами
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(3);ZC.tick(30);ZC.skip();ZC.tick(20);
window.SW=()=>ZC.W.sw12;window.F=()=>ZC.W.flags;window.H=ZC.HERO;
window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
window.faceTo=(pi,x,z)=>{const h=U.act(pi);h.face=Math.atan2(x-h.pos.x,z-h.pos.z);};
window.st=()=>U.st()+' errs='+_errs.length+(_errs[0]?' '+_errs[0]:'');
F().noChudo=true;
['proshka','potap'].forEach((k,i)=>put(H[k],-1.2-i*1.2,-77.5));['pelageya','yosha'].forEach((k,i)=>put(H[k],1.2+i*1.2,-77.5));ZC.tick(60);
['proshka','potap'].forEach((k,i)=>put(H[k],-2.6-i*1.2,-87.5));['pelageya','yosha'].forEach((k,i)=>put(H[k],-1.2+i*1.2,-87.0));ZC.tick(150);
const S=SW(),W=ZC.W;let inst=0,veg=0;W.group.traverse(o=>{if(o.isInstancedMesh){inst++;veg+=o.count;}});
['GT='+S.GT.length+' alive='+S.GT.filter(e=>e.alive).length+' kit='+S.GT.every(e=>e.kit&&e.kit.ring.visible),'stage='+F().wed.stage+' left='+F().wed.left,
 'inst='+inst+' items='+veg,'frogs='+S.FROG.L.length+' spots='+S.FROG.spots.length,'chudo='+F().chudo.st,st()]
//@@ shot=t12c_gat.png
put(H.proshka,-1.6,-89.2);put(H.pelageya,0.4,-89.0);faceTo(0,-1.6,-110);faceTo(1,-1.6,-110);ZC.tick(30);st()
//@@
// Прошка кидает струну с берега к первой кочке и встаёт на её середину; Паутинник рядом, но струну под героем не грызёт
const S=SW(),G=S.GS,P=H.proshka;faceTo(0,G[0].x,G[0].z);ZC.press('KeyR');ZC.tick(40);const s1=G[0].used;
const r=['s1='+!!s1];r.push(U.walkTo(0,s1.sx+s1.dx*s1.len*0.45,s1.sz+s1.dz*s1.len*0.45,6));ZC.tick(20);
r.push('onStr='+!!(P.groundRef&&P.groundRef.string)+' z='+P.pos.z.toFixed(1));
// чудо включено: выбирает героя на струне гати — пузыри и тёмный круг сбоку
F().noChudo=false;const C=S.CHU;C.cd=0;r.push(U.until(()=>C.st==='warn'&&C.t>0.9,4)+' st='+C.st+' peek='+C.peek+' d='+Math.hypot(C.x-P.pos.x,C.z-P.pos.z).toFixed(2));
r.join(' ')+' | '+st()
//@@ shot=t12c_warn.png
ZC.tick(1);
//@@
const S=SW(),C=S.CHU,P=H.proshka;const r=[U.until(()=>C.st==='hold'&&C.t>0.55,3)+' st='+C.st+' pushed='+C.pushed];
r.join(' ')+' | '+st()
//@@ shot=t12c_push.png
ZC.tick(1);
//@@
const S=SW(),C=S.CHU,P=H.proshka;const r=[];ZC.tick(60);r.push('pushed='+C.pushed+' ups='+C.ups+' offStr='+!(P.groundRef&&P.groundRef.string));
U.until(()=>C.st==='off'&&P.grounded,8);r.push('back y='+P.pos.y.toFixed(2)+' z='+P.pos.z.toFixed(1)+' falls='+ZC.G.stats.falls);
// столкнутый выкарабкивается на ближайшую кочку гати, а не к колокольчику; за одно появление — один толчок
const pushOne=C.pushed===1,onHum=P.pos.z<-89&&P.pos.z>-142&&P.pos.y>0.2;
// со щитом: снова на струну, держим щит — чудо не сталкивает
const s1=S.GS[0].used;F().noChudo=true;r.push('s1 alive='+!!(s1&&ZC.W.threads.includes(s1)));
if(!(s1&&ZC.W.threads.includes(s1))){const G=S.GS;r.push(U.walkTo(0,-1.6,-89.4,8));faceTo(0,G[0].x,G[0].z);ZC.press('KeyR');ZC.tick(40);}
const t=S.GS[0].used;put(P,t.sx+t.dx*t.len*0.4,t.sz+t.dz*t.len*0.4,0.2);ZC.tick(20);r.push('onStr='+!!(P.groundRef&&P.groundRef.string));
const p0=C.pushed;ZC.hold('KeyG',true);F().noChudo=false;C.cd=0;r.push(U.until(()=>C.st==='down',6));ZC.hold('KeyG',false);ZC.tick(5);
r.push('guard: pushed+='+(C.pushed-p0)+' still onStr='+!!(P.groundRef&&P.groundRef.string)+' peek='+C.peek);
window.R1={push:pushOne,hummock:onHum,guard:C.pushed-p0===0};r.join(' ')+' | '+st()
//@@
// все на берегу — чудо только выглядывает подальше от героев; лягушки прыгают сами и плюхаются, если подойти
const S=SW(),C=S.CHU,FR=S.FROG,r=[];['proshka','potap','pelageya','yosha'].forEach((k,i)=>put(H[k],-3+i*1.6,-86.5));ZC.tick(10);
const pk=C.peeks;C.st='off';C.cd=0;r.push(U.until(()=>C.peeks>pk,14)+' peeks='+C.peeks+' near='+Math.min(...ZC.HERO.proshka?['proshka','potap','pelageya','yosha'].map(k=>Math.hypot(H[k].pos.x-C.x,H[k].pos.z-C.z)):[0]).toFixed(1));
F().noChudo=true;const h0=FR.hops;ZC.tick(600);r.push('hops in 10s='+(FR.hops-h0));
// лягушку — на берег Журавля, Пелагею — в 1,4 м от неё: лягушка отпрыгивает
const f=FR.L[0];Object.assign(f,{x:3,z:-82,y:0,hop:null,water:false});const fl=FR.flee;put(H.pelageya,3,-80.6);ZC.tick(40);r.push('flee+='+(FR.flee-fl)+' frog d='+Math.hypot(f.x-H.pelageya.pos.x,f.z-H.pelageya.pos.z).toFixed(1));
window.R2={peek:C.peeks>pk,hops:FR.hops-h0>3,flee:FR.flee>fl};r.join(' ')+' | '+st()
//@@ shot=t12c_frog.png
ZC.tick(1);
//@@
// пока на гати хоть один Паутинник — Журавль не идёт; победили всех на кочках — пошёл
const S=SW(),r=[];const W=ZC.W;put(H.pelageya,0.5,-143.5);ZC.tick(30);r.push('stage='+F().wed.stage);U.until(()=>F().wed.stage!=='carry',7);r.push('then='+F().wed.stage+' left='+F().wed.left);ZC.tick(240);r.push('after 4s='+F().wed.stage);
window.KF=[{g:'KeyG',a:'KeyF',B:['KeyA','KeyD','KeyW','KeyS']},{g:'Period',a:'Comma',B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}];
window.beat=(e,max)=>{const n=Math.round((max||30)*60);let k=0;
  for(let i=0;i<n;i++){if(!e.alive){[0,1].forEach(pi=>KF[pi].B.forEach(b=>ZC.hold(b,false)));ZC.tick(2);return 't='+(i/60).toFixed(1);}
    for(const pi of[0,1]){const h=U.act(pi),K=KF[pi],dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz);const far=d>1.5+e.r&&!(e.state==='wind'&&e.tgt===h);
      K.B.forEach(b=>ZC.hold(b,false));if(far){ZC.hold(K.B[0],dx<-0.3);ZC.hold(K.B[1],dx>0.3);ZC.hold(K.B[2],dz<-0.3);ZC.hold(K.B[3],dz>0.3);}
      if(e.state==='wind'&&e.tgt===h){const left=e.wdur-e.t;if(left<0.16&&e.left===null)ZC.press(K.g);}
      if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0)){h.face=Math.atan2(dx,dz);if(((++k)>>1)%9===pi*4)ZC.press(K.a);}}
    ZC.tick(1);}
  [0,1].forEach(pi=>KF[pi].B.forEach(b=>ZC.hold(b,false)));return 'TIMEOUT '+e.state+':'+e.embers;};
// герои — на кочку к Паутиннику (в игре туда ведут струны), бой щитом и отбивом
const res=[];for(const e of S.GT){if(!e.alive)continue;const hx=e.home.x+0.3,hz=e.home.z-0.3;put(U.act(0),hx-0.6,hz+0.9,0.3);put(U.act(1),hx+0.7,hz+0.6,0.3);ZC.tick(10);res.push(beat(e,40));}
r.push('fights '+res.join(','),'left='+F().wed.left+' falls='+ZC.G.stats.falls);U.until(()=>F().wed.stage==='walk',3);r.push('stage='+F().wed.stage);
window.R3={blocked:r.join(' ').includes('then=blocked')&&r.join(' ').includes('after 4s=blocked'),walk:F().wed.stage==='walk'&&F().wed.left===0};r.join(' ')+' | '+st()
//@@
const S=SW();let inst=0;ZC.W.group.traverse(o=>{if(o.isInstancedMesh)inst++;});
const ok=R1.push&&R1.hummock&&R1.guard&&R2.peek&&R2.hops&&R2.flee&&R3.blocked&&R3.walk&&_errs.length===0;
[JSON.stringify(R1),JSON.stringify(R2),JSON.stringify(R3),'chudo='+JSON.stringify({ups:F().chudo.ups,pushed:F().chudo.pushed,peeks:F().chudo.peeks}),'errs='+_errs.length,ok?'ok':'FAIL']
