//@@
// релиз final06 · 1-1: мусор после кикиморок похож на мусор (у каждого куска — грязное пятно, мухи и дымок; корыто с помоями),
// подобранный кусок уменьшается и без пятна, в куче у забора лежит; у калитки на двух лапках экран не делится (лапки в 11 м друг от друга).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);
const W=ZC.W;W.rzt.state='done';W.rzt.onDone();ZC.tick(60*3.5);ZC.skip();ZC.tick(30);
['stage='+W.flags.stage]
//@@
const W=ZC.W,r=[U.brawl(90)];ZC.tick(120);const C=W.clean11,F=W.flags;
const meshes=g=>{let n=0;g.traverse(o=>{if(o.isMesh)n++;});return n;};
r.push('stage='+F.stage,'items='+C.TR.length,'meshes='+C.TR.map(t=>meshes(t.g)).join(','));
// у каждого куска — грязное пятно и мухи с дымком; корыто тоже
const fx=C.TR.every(t=>t.g.userData.mess&&t.g.userData.fx&&t.g.userData.fx.fl.length===3&&t.g.userData.fx.st.length===3),tfx=!!(C.TRB.g.userData.fx&&C.TRB.g.userData.fx.fl.length>=4);
// все куски заметно крупнее прежних 10–30 см: габарит самой «вещи» (без пятна, мух и дымка) — не меньше 0,45 м
const part=g=>{const skip=new Set([g.userData.mess,...g.userData.fx.fl.map(f=>f.m),...g.userData.fx.st.map(s=>s.m)]),b=new THREE.Box3();g.traverse(o=>{if(o.isMesh&&!skip.has(o))b.union(new THREE.Box3().setFromObject(o));});return Math.max(b.max.x-b.min.x,b.max.z-b.min.z);};
const big=C.TR.map(t=>part(t.g));
r.push('fx='+fx,'troughFx='+tfx,'minPart='+Math.min(...big).toFixed(2));
// мухи летают: положение меняется со временем
const f0=C.TR[0].g.userData.fx.fl[0].m.position.clone();ZC.tick(20);const f1=C.TR[0].g.userData.fx.fl[0].m.position;r.push('flies='+(f0.distanceTo(f1)>0.01));
r.push(fx&&tfx&&Math.min(...big)>=0.45&&f0.distanceTo(f1)>0.01&&C.TR.length===9?'trash ok':'FAIL trash');r
//@@ shot=tfin_trash11.png
ZC.tick(30);
//@@
// подобрать кусок: уменьшается, пятно прячется; в куче — остаётся лежать
const W=ZC.W,C=W.clean11,H=C.HEAP,r=[],pr=ZC.HERO.proshka;
const it=C.TR.filter(t=>t.state==='ground').sort((a,b)=>Math.hypot(a.g.position.x-pr.pos.x,a.g.position.z-pr.pos.z)-Math.hypot(b.g.position.x-pr.pos.x,b.g.position.z-pr.pos.z))[0];
U.walkTo(0,pr.pos.x,-24.2,4);U.walkTo(0,it.g.position.x,-24.2,8);U.walkTo(0,it.g.position.x,it.g.position.z,6);ZC.tick(10);
r.push('hero='+pr.pos.x.toFixed(1)+','+pr.pos.z.toFixed(1)+' trash='+!!pr.trash+' act='+pr.active,'item='+it.g.position.x.toFixed(1)+','+it.g.position.z.toFixed(1),'carry='+it.state,'scale='+it.g.scale.x.toFixed(2),'mess='+it.g.userData.mess.visible);
U.walkTo(0,U.act(0).pos.x,-24.2,4);U.walkTo(0,H.x+1.6,H.z,10);ZC.tick(60);
r.push('state='+it.state,'inHeap='+(it.g.parent&&it.g.parent.position.distanceTo(H)<0.01),'n='+C.cleanN());
r.push(it.state==='done'&&it.g.scale.x<0.6&&it.g.parent.position.distanceTo(H)<0.01?'heap ok':'FAIL heap');r
//@@
// калитка-упрямица: у лапок экран общий, пока оба героя у калитки; издали — делится, как раньше
const W=ZC.W,F=W.flags,put=(h,x,z)=>{h.pos.set(x,h.pos.y+3,z);h.vel.set(0,0,0);};F.stage='yard';
const a=U.act(0),b=U.act(1);put(a,-5.5,-102.5);put(b,5.5,-102.5);ZC.tick(120);
const r=['coop fn='+!!W.noSplitFn(),'splitT='+ZC.G.splitTarget,'split='+ZC.G.split.toFixed(2)];
put(b,5.5,-60);ZC.tick(120);r.push('apart fn='+!!W.noSplitFn(),'splitT='+ZC.G.splitTarget);
put(b,5.5,-102.5);F.out=true;ZC.tick(5);r.push('out fn='+!!W.noSplitFn());
r.push(r[0]==='coop fn=true'&&r[1]==='splitT=0'&&r[2]==='split=0.00'&&r[3]==='apart fn=false'&&r[4]==='splitT=1'&&r[5]==='out fn=false'?'nosplit ok':'FAIL nosplit');r.concat(window._errs.length?['ERRS '+window._errs.join('|')]:[])
