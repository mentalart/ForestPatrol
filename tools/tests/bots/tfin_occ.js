//@@
// @timeout=1800   (замеры пикселей gl.readPixels в программной графике: на машине CI бот идёт 10–20 мин)
// релиз final04, видимость героев: вырез «в горошек» перед героем, силуэт за стеной, земля и то, что за героем, не трогаются, затухание у камеры,
// враги и предметы без выреза, старые «прозрачные стены» — узором, производительность. Видимость героя меряется по пикселям: кадр с героем и без него.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(a.map(x=>x&&x.stack?x.stack.slice(0,200):String(x)).join(' '));ce(...a);};}
const O=ZC.FIN.occ,D=O.dbg,R=D.renderer,gl=R.getContext();O.fdt=0.05;
window.px=(x,y,w,h)=>{const b=new Uint8Array(w*h*4);gl.readPixels(x,y,w,h,gl.RGBA,gl.UNSIGNED_BYTE,b);return b;};
// прямоугольник героя на экране (в пикселях буфера, от низа)
window.heroRect=(h,cam)=>{cam=cam||D.camS;const W2=R.domElement.width,H2=R.domElement.height;let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;const hh=h.d.height;
  for(const dy of[0,hh*0.5,hh])for(const dx of[-0.45,0.45])for(const dz of[-0.45,0.45]){const v=new THREE.Vector3(h.pos.x+dx,h.pos.y+dy,h.pos.z+dz).project(cam);const X=(v.x*0.5+0.5)*W2,Y=(v.y*0.5+0.5)*H2;x0=Math.min(x0,X);x1=Math.max(x1,X);y0=Math.min(y0,Y);y1=Math.max(y1,Y);}
  x0=Math.max(0,Math.floor(x0));y0=Math.max(0,Math.floor(y0));x1=Math.min(W2-1,Math.ceil(x1));y1=Math.min(H2-1,Math.ceil(y1));return [x0,y0,Math.max(1,x1-x0),Math.max(1,y1-y0)];};
// доля пикселей прямоугольника, которые меняются, если героя спрятать (= видно героя или его силуэт)
window.vis=(h,rect)=>{O.frame();const a=px(...rect);const sk=h._xrSk;sk.visible=false;O.frame();const b=px(...rect);sk.visible=true;let n=0;for(let i=0;i<a.length;i+=4)if(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2])>24)n++;return n/(a.length/4);};
window.frames=n=>{for(let i=0;i<n;i++)O.frame();};
// синхронизация с видеокартой: очередь кадров разбирается внутри шага, а не перед снимком (иначе снимок под нагрузкой ждёт дольше 2 минут)
window.gsync=()=>{const b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);return b[0];};
// кадры, пока сила выреза и силуэтов не установится (в боте кадры короче настоящих)
window.settle=()=>{let i=0,prev=-1;for(;i<60;i++){O.frame();const V=O.views.s,s=V?V.h[0].s:0;if(Math.abs(s-prev)<1e-4&&(O.xa===0||O.xa===1)&&i>3)break;prev=s;}gsync();return i;};
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(120);frames(2);
const H=ZC.HERO,P=ZC.players,h=P[0].heroes[P[0].act];
['lvl='+ZC.W.levelId,'cand='+O.stats.cand,'xray='+ZC.HERO.proshka._xr+'' .slice(0,0)+[H.proshka,H.potap,H.pelageya,H.yosha].filter(q=>q._xr&&q._xr.parent).length+'/4','errs='+window._errs.length]
//@@
// своя стена между камерой и героем (от 0,9 м над землёй — земля под ней видна) и столб за героем
const O=ZC.FIN.occ,D=O.dbg,P=ZC.players,h=P[0].heroes[P[0].act],W=ZC.W;const cam=D.camS.position.clone();
const top=new THREE.Vector3(h.pos.x,h.pos.y+h.d.height*0.55,h.pos.z);const dir=top.clone().sub(cam);const L=dir.length();dir.normalize();
const wall=new THREE.Mesh(new THREE.BoxGeometry(4.2,3.2,0.35),new THREE.MeshLambertMaterial({color:0x8a6a4a}));wall.position.copy(cam).addScaledVector(dir,L*0.55);wall.position.y=Math.max(wall.position.y,h.pos.y+0.9+1.6);
wall.lookAt(cam.x,wall.position.y,cam.z);W.group.add(wall);window._wall=wall;
const post=new THREE.Mesh(new THREE.BoxGeometry(2.4,4,0.4),new THREE.MeshLambertMaterial({color:0x4a7a9a}));post.position.set(h.pos.x,h.pos.y+2,h.pos.z).addScaledVector(dir,2.2);post.lookAt(cam.x,post.position.y,cam.z);W.group.add(post);window._post=post;
O.nextCol=0;frames(1);window._rect=heroRect(h);
['wallY='+wall.position.y.toFixed(2),'L='+L.toFixed(1),'cand='+O.stats.cand,'rect='+window._rect,'seg='+D.seg(D.camS.position,top)]
//@@
// без системы: героя почти не видно; с системой: вырез + силуэт
const O=ZC.FIN.occ,P=ZC.players,h=P[0].heroes[P[0].act];const r=window._rect;
window._wall.visible=false;O.on=false;O.xray=false;settle();const base=vis(h,r);window._wall.visible=true;settle();const off=vis(h,r);
O.on=true;O.xray=false;settle();const cutOnly=vis(h,r);
O.xray=true;settle();const both=vis(h,r);const st=O.views.s.h[0];
['hero share of full: behind wall off='+(off/base).toFixed(2),'cut='+(cutOnly/base).toFixed(2),'cut+xray='+(both/base).toFixed(2),'base='+base.toFixed(2),'occ='+st.occ,'s='+st.s.toFixed(2),'ok='+(cutOnly/base>0.5&&off/base<0.1)]
//@@ shot=fin_occ_on.png wait=300
settle();
//@@ shot=fin_occ_off.png wait=300
const O=ZC.FIN.occ;O.on=false;O.xray=false;settle();
//@@
// земля под стеной и столб за героем не меняются от выреза (вырез включён / выключен; меш героя спрятан, стена по-прежнему его «закрывает»)
const O=ZC.FIN.occ,D=O.dbg,R=D.renderer,P=ZC.players,h=P[0].heroes[P[0].act];const W2=R.domElement.width,H2=R.domElement.height;
const pr=v=>{const q=v.clone().project(D.camS);return [Math.round((q.x*0.5+0.5)*W2),Math.round((q.y*0.5+0.5)*H2)];};
const g=window._wall.position.clone();g.y=h.pos.y+0.05;const gp=pr(g);const pp=pr(window._post.position.clone().add(new THREE.Vector3(0.9,1.2,0)));
const box=(c,s)=>[Math.max(0,c[0]-s),Math.max(0,c[1]-s),s*2,s*2];O.xray=false;
const grab=on=>{O.on=on;settle();h._xrSk.visible=false;O.frame();const a=px(...box(gp,10)),b=px(...box(pp,10)),w=px(...window._rect);h._xrSk.visible=true;return [a,b,w];};
const A=grab(false),B=grab(true);const s1=O.views.s.h[0].s;
const diff=(x,y)=>{let n=0;for(let i=0;i<x.length;i+=4)if(Math.abs(x[i]-y[i])+Math.abs(x[i+1]-y[i+1])+Math.abs(x[i+2]-y[i+2])>30)n++;return n/(x.length/4);};
O.xray=true;['ground changed='+diff(A[0],B[0]).toFixed(2),'behind changed='+diff(A[1],B[1]).toFixed(2),'wall cut='+diff(A[2],B[2]).toFixed(2),'s='+s1.toFixed(2)]
//@@
// затухание у камеры: стена в 1,2 м перед объективом
const O=ZC.FIN.occ,D=O.dbg,R=D.renderer,W=ZC.W;window._wall.visible=false;window._post.visible=false;O.on=true;frames(2);
const c=D.camS.position.clone(),f=new THREE.Vector3(0,0,-1).applyQuaternion(D.camS.quaternion);const nw=new THREE.Mesh(new THREE.BoxGeometry(1.6,1.2,0.1),new THREE.MeshLambertMaterial({color:0x335577}));nw.position.copy(c).addScaledVector(f,1.2);nw.quaternion.copy(D.camS.quaternion);W.group.add(nw);
const W2=R.domElement.width,H2=R.domElement.height,rc=[Math.round(W2/2-40),Math.round(H2/2-40),80,80];
const cov=()=>{nw.visible=true;settle();const a=px(...rc);nw.visible=false;O.frame();const b=px(...rc);let n=0;for(let i=0;i<a.length;i+=4)if(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2])>24)n++;return n/(a.length/4);};
O.on=false;const off=cov();O.on=true;const on=cov();W.group.remove(nw);
['near coverage off='+off.toFixed(2),'on='+on.toFixed(2)]
//@@
// враги и предметы — без выреза; силуэты героев есть; производительность
const O=ZC.FIN.occ,D=O.dbg,R=D.renderer,W=ZC.W;D.exempt();let tot=0,no=0;for(const k of['enemies','items','gates','movers','lifts'])for(const o of (W[k]||[])){const g=o&&(o.g||o.mesh||o.m||o.group);if(g&&g.traverse)g.traverse(c=>{if(c.isMesh&&c.material&&!Array.isArray(c.material)&&(c.material instanceof ZC.FIN.LowPolyMat)&&!c.userData.bat){tot++;if(c.material.userData.noOcc)no++;}});}
const H=ZC.HERO;let hx=0;for(const h of[H.proshka,H.potap,H.pelageya,H.yosha])if(h._xr&&h._xr.parent&&h._xr.material.userData.xray)hx++;
const t=(on)=>{O.on=on;O.xray=on;frames(2);const t0=performance.now();for(let i=0;i<6;i++)O.frame();return (performance.now()-t0)/6;};
const off=t(false),on=t(true);R.info.reset();O.frame();const calls=R.info.render.calls;
['live meshes noOcc='+no+'/'+tot,'xray='+hx+'/4','ms off='+off.toFixed(1),'on='+on.toFixed(1),'occ ms/frame='+(O.stats.ms/O.stats.frames).toFixed(2),'rays='+O.stats.rays,'precise='+O.stats.precise,'calls='+calls,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')]
//@@ shot=fin_occ_house.png wait=300
// настоящее препятствие уровня: самая высокая коробка из списка рядом — герои за ней (со стороны камеры не видно)
const O=ZC.FIN.occ,D=O.dbg,W=ZC.W,P=ZC.players;window._wall.visible=false;window._post.visible=false;O.on=true;O.xray=true;
const h0=P[0].heroes[P[0].act],h1=P[1].heroes[P[1].act];const back=D.camS.position.clone().sub(h0.pos);back.y=0;back.normalize();
const floors=W.boxes.filter(b=>b.on&&(b.maxx-b.minx)*(b.maxz-b.minz)>60&&Math.abs(b.maxy-h0.pos.y)<1.2);const onF=(x,z)=>floors.find(b=>x>b.minx+0.8&&x<b.maxx-0.8&&z>b.minz+0.8&&z<b.maxz-0.8);
let best=null;for(const c of O.cand){const b=c.b,cx=(b.min.x+b.max.x)/2,cz=(b.min.z+b.max.z)/2,hgt=b.max.y-b.min.y,w=Math.max(b.max.x-b.min.x,b.max.z-b.min.z),d=Math.hypot(cx-h0.pos.x,cz-h0.pos.z);
  if(!(hgt>2.2&&hgt<12&&w>1.2&&w<7&&d<40))continue;const px=cx-back.x*(w*0.5+1.1),pz=cz-back.z*(w*0.5+1.1),F=onF(px,pz);if(!F||!onF(cx,cz))continue;if(!best||d<best.d)best={c,h:hgt,cx,cz,w,d,px,pz,y:F.maxy};}
const r=[];if(best){for(const [h,o] of[[h0,-0.5],[h1,0.5]]){h.pos.set(best.px+back.z*o,best.y+0.05,best.pz-back.x*o);h.vel.set(0,0,0);}ZC.tick(150);settle();
  r.push('box h='+best.h.toFixed(1)+' w='+best.w.toFixed(1)+' d='+best.d.toFixed(1),'occ0='+O.views.s.h[0].occ,'occ1='+O.views.s.h[1].occ,'s0='+O.views.s.h[0].s.toFixed(2),'s1='+O.views.s.h[1].s.toFixed(2));}else r.push('no box');r
//@@
// старые «прозрачные стены» (Китеж): материал не становится полупрозрачным, стена вне пачек, узор по uniform
ZC.loadLevel(ZC.LV('2-2'));ZC.tick(30);if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(60);const W=ZC.W;ZC.FIN.occ.frame();
let tr=0,occW=0,nb=0;for(const m of W.fadeMeshes){if(m.material.transparent&&m.material.opacity<0.99)tr++;if(m.material.userData._occW)occW++;if(m.userData.noBatch)nb++;}
['fades='+W.fades.length+'/'+W.fadeMeshes.length,'transparent='+tr,'occW='+occW,'noBatch='+nb,'errs='+window._errs.length]
