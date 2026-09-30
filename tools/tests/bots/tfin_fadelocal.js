//@@
// релиз final06: «прозрачная стена» растворяется только в круге вокруг героя. 4-1: стена кузни 9,4 × 6 м — один меш, на куски не делится.
// Герои за стеной: кусок стены у героев уходит в узор (кадр меняется, если силу растворения сбросить), дальний край стены (4+ м в сторону) — нет.
// Кадры: fadelocal_41.png — герои за стеной. Раньше (до final06 с кругом) узором шла вся стена — половина экрана.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.O=ZC.FIN.occ;window.D=O.dbg;window.R=D.renderer;window.gl=R.getContext();window.FB=ZC.FIN.batch.fade;O.fdt=0.05;
window.px=r=>{const b=new Uint8Array(r[2]*r[3]*4);gl.readPixels(r[0],r[1],r[2],r[3],gl.RGBA,gl.UNSIGNED_BYTE,b);return b;};
window.diff=(a,b)=>{let n=0;for(let i=0;i<a.length;i+=4)if(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2])>30)n++;return n/(a.length/4);};
window.rectAt=(x,y,z)=>{const p=new THREE.Vector3(x,y,z).project(D.camS),W2=R.domElement.width,H2=R.domElement.height;return [Math.round((p.x*0.5+0.5)*W2)-12,Math.round((p.y*0.5+0.5)*H2)-12,24,24];};
ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(10);for(let q=0;q<40&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(20);
const cam=D.camS,put=()=>{for(const pi of[0,1]){const h=U.act(pi);h.pos.set(pi?-7.5:-5.1,h.pos.y+2,-28.2);h.vel.set(0,0,0);}};
put();ZC.tick(90);for(let q=0;q<20&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}put();ZC.tick(90);for(let i=0;i<30;i++){ZC.tick(1);O.frame();}
// кусок стены перед героями: меш «прозрачной стены», через который идёт луч к герою 0
const W=ZC.W,h0=U.act(0),T=new THREE.Vector3(h0.pos.x,h0.pos.y+1,h0.pos.z),dir=T.clone().sub(cam.position).normalize(),rc=new THREE.Raycaster(cam.position,dir,0.05,cam.position.distanceTo(T));
rc.layers.enableAll();const hit=rc.intersectObjects(W.fadeMeshes,false)[0];window.FL={f:hit&&hit.object.userData.fadeRef,m:hit&&hit.object};
const b=hit?new THREE.Box3().setFromObject(hit.object):null;window.FL.b=b;
['cam='+cam.position.toArray().map(v=>v.toFixed(1)).join(','),'hit='+(hit?hit.point.toArray().map(v=>v.toFixed(1)).join(','):'none'),'box='+(b?(b.max.x-b.min.x).toFixed(1)+'x'+(b.max.y-b.min.y).toFixed(1)+'x'+(b.max.z-b.min.z).toFixed(1):'-'),'w='+(FL.f?FL.f.w.toFixed(2):'-')]
//@@ shot=fadelocal_41.png
ZC.tick(1);O.frame();'shot'
//@@
// пиксели: с текущей силой растворения и со сброшенной — у героев разница есть, на дальнем краю стены — нет
const {f,b}=FL,z=b.max.z+0.02;const near=rectAt(-6.3,1.4,z),far=rectAt(b.min.x+0.6,3.2,z);
const set=v=>{for(const m of f.mats)m.userData._occW.value=v;FB.tick(0);O.frame();};const k=f.mats[0].userData._occW.value;
set(k);const aN=px(near),aF=px(far);set(0);const bN=px(near),bF=px(far);set(k);
const dn=diff(aN,bN),df=diff(aF,bF);['k='+k.toFixed(2),'near='+dn.toFixed(2),'far='+df.toFixed(2),(k>0.5&&dn>0.1&&df<0.02)?'ok':'FAIL','errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')]
