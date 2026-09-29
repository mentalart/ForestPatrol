//@@
// релиз final05: «прозрачные стены» Китежа склеены в пачки по ячейкам (номер стены в вершинах, сила растворения — из текстуры).
// Проверки: пачки собрались и рисуют почти все стены; стена из пачки растворяется узором (кадр меняется) и возвращается целиком;
// соседняя стена той же пачки при этом не растворяется; стена, которую сдвинули, выходит из пачки и рисуется сама.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.O=ZC.FIN.occ;window.D=O.dbg;window.R=D.renderer;window.gl=R.getContext();window.FB=ZC.FIN.batch.fade;O.fdt=0.05;
window.px=r=>{const b=new Uint8Array(r[2]*r[3]*4);gl.readPixels(r[0],r[1],r[2],r[3],gl.RGBA,gl.UNSIGNED_BYTE,b);return b;};
window.diff=(a,b)=>{let n=0;for(let i=0;i<a.length;i+=4)if(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2])>30)n++;return n;};
window.rectOf=m=>{const bx=new THREE.Box3().setFromObject(m),c=bx.getCenter(new THREE.Vector3()),p=c.clone().project(D.camS);if(p.z>1||Math.abs(p.x)>0.8||Math.abs(p.y)>0.8)return null;
  const W2=R.domElement.width,H2=R.domElement.height;return [Math.round((p.x*0.5+0.5)*W2)-20,Math.round((p.y*0.5+0.5)*H2)-20,40,40];};
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}for(let q=0;q<20;q++){ZC.tick(30);if(ZC.G.cine){ZC.skip();ZC.tick(5);}}
const W=ZC.W;let inB=0;for(const m of W.fadeMeshes)if(m.userData.fadeBat)inB++;
['fadeMeshes='+W.fadeMeshes.length,'inBatch='+inB,'cells='+FB.cells.length,'share='+(inB/W.fadeMeshes.length).toFixed(2)]
//@@
// стена из пачки в кадре: растворяем её (как делает updateFade — через _occW материала), кадр меняется; соседняя стена — нет
const W=ZC.W;O.frame();let pick=null,other=null,r=null,r2=null;
for(const c of FB.cells){for(const q of c.snaps){const m=q.m,rr=rectOf(m);if(!rr)continue;if(!pick){pick=m;r=rr;continue;}if(m.userData.fadeRef!==pick.userData.fadeRef&&c.snaps.some(x=>x.m===pick)){const d=Math.hypot(rr[0]-r[0],rr[1]-r[1]);if(d>60){other=m;r2=rr;break;}}}if(other)break;}
if(!pick)'no wall on screen';else{
  const hold=v=>{for(const mt of pick.userData.fadeRef.mats)mt.userData._occW.value=v;};
  O.frame();const a=px(r),a2=r2?px(r2):null;hold(0.92);FB.tick(0.3);O.frame();const b=px(r),b2=r2?px(r2):null;hold(0);FB.tick(0.3);O.frame();const c=px(r);
  window._res=['dissolve diff='+diff(a,b),'back diff='+diff(a,c),'neighbour diff='+(r2?diff(a2,b2):'-'),'ok='+(diff(a,b)>60&&diff(a,c)<20&&(!r2||diff(a2,b2)<20))];window._res;}
//@@
// сдвинутая стена выходит из пачки и рисуется сама
const c=FB.cells[0],m=c.snaps[0].m;const n0=FB.cells.length;m.position.y+=0.5;m.updateMatrixWorld(true);ZC.tick(20);
['undone='+(FB.cells.indexOf(c)<0),'layer0='+(m.layers.mask===1),'fadeBat='+m.userData.fadeBat,'cells '+n0+'→'+FB.cells.length,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')]
