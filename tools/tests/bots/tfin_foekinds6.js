//@@
// релиз final06: каждый вид врага виден (часть 6 из 6: виды с 34-го — мир 2: чайка, прилипала, жемчужница, Рак-Отшельник; первая часть — tfin_foekinds). Враг создаётся перед героями на ровном месте 1-1, 6 с драки; раз в секунду — кадр с врагом и без
// него (разница в пикселях), плюс учёт треугольников (видимые части рисуются своими мешами или локальными пачками).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
const O=ZC.FIN.occ,D=O.dbg,R=D.renderer,gl=R.getContext();O.fdt=0.05;
window.visChain=o=>{while(o){if(!o.visible)return false;if(o===ZC.W.group||!o.parent)return true;o=o.parent;}return true;};
window.tris=g=>{let vis=0,drawn=0;g.traverse(m=>{if(!m.isMesh||!visChain(m))return;const gg=m.geometry;if(!gg||!gg.attributes.position)return;const n=(gg.index?gg.index.count:gg.attributes.position.count)/3;
  if(m.userData.batchMesh){const A=gg.attributes.position.array;let live=0;for(let i=0;i<A.length;i+=9){if(A[i]!==A[i+3]||A[i+1]!==A[i+4]||A[i+2]!==A[i+5]||A[i]!==A[i+6])live++;}drawn+=live;return;}
  if(m.userData.xray)return;vis+=n;const mt=m.material;if(m.layers.mask&1&&mt&&!Array.isArray(mt)&&mt.visible&&mt.opacity>0.05)drawn+=n;});return {vis,drawn};};
window.px=r=>{const b=new Uint8Array(r[2]*r[3]*4);gl.readPixels(r[0],r[1],r[2],r[3],gl.RGBA,gl.UNSIGNED_BYTE,b);return b;};
window.rect=e=>{const c=new THREE.Vector3();new THREE.Box3().setFromObject(e.inner).getCenter(c);const p=c.project(D.camS);if(p.z>1||Math.abs(p.x)>0.9||Math.abs(p.y)>0.9)return null;const W2=R.domElement.width,H2=R.domElement.height;
  return [Math.max(0,Math.min(W2-60,Math.round((p.x*0.5+0.5)*W2)-30)),Math.max(0,Math.min(H2-60,Math.round((p.y*0.5+0.5)*H2)-30)),60,60];};
window.pdiff=e=>{O.frame();const r=rect(e);if(!r)return -1;const a=px(r);const v=e.g.visible;e.g.visible=false;O.frame();const b=px(r);e.g.visible=v;let n=0;for(let i=0;i<a.length;i+=4)if(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2])>30)n++;return n;};
// уровень загружается один раз на группу видов (раньше — на каждый вид, и бот не укладывался в 900 с); перед каждым врагом герои
// возвращаются на исходные места, прошлый враг убран
window.lvl=()=>{ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(90);   // пачки статики успевают собраться
  const P=ZC.players;window.H0=[0,1].map(q=>{const h=P[q].heroes[P[q].act];return {q,h,p:h.pos.clone()};});};
window.one=k=>{const P=ZC.players;for(const s of H0){P[s.q].downed=false;s.h.pos.copy(s.p);s.h.vel.set(0,0,0);}ZC.tick(3);
  const h=H0[0].h;const big=['leshyBoss','vodyanoy','solovei','golova'].includes(k);
  const e=ZC.FIN.dbgFoe(k,h.pos.x+1.2,h.pos.z-(big?7:4),{y:h.pos.y});const res={k,min:1e9,zero:0,checks:0,tr:0,notes:[]};
  for(let s=0;s<6;s++){U.brawl(1);if(!e.alive){res.notes.push('died@'+s);break;}if(e.state==='hide'||!visChain(e.g))continue;
    const t=tris(e.g);if(t.vis>0&&t.drawn<t.vis*0.5){res.tr++;if(res.notes.length<3)res.notes.push('tris '+t.drawn+'/'+t.vis+' st='+e.state);}
    const d=pdiff(e);if(d<0)continue;res.checks++;res.min=Math.min(res.min,d);if(d<3){res.zero++;if(res.notes.length<3)res.notes.push('pix0 st='+e.state+' s='+s);}}
  e.alive=false;e.g.visible=false;ZC.tick(30);return k+': checks='+res.checks+' minDiff='+(res.min===1e9?'-':res.min)+' zero='+res.zero+' trisBad='+res.tr+(res.notes.length?' ['+res.notes.join('; ')+']':'');};
window.KINDS=ZC.FIN.dbgFoeKinds();KINDS.join(',')
//@@
lvl();KINDS.slice(33).map(one).concat(['errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')])
