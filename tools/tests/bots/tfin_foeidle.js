//@@
// релиз final05: враг, появившийся после загрузки уровня и постоявший вдали без драки, не склеивается пачками статики (раньше глобальная
// пачка забирала его меши — в бою враг становился невидимым). Потом драка: кадр с врагом и без него (разница в пикселях) и учёт треугольников.
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
window.one=k=>{ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(90);   // пачки статики успевают собраться
  const P=ZC.players,h=P[0].heroes[P[0].act];const big=ZC.FIN.dbgFoeKinds&&['leshyBoss','vodyanoy','solovei','golova'].includes(k);
  const e=ZC.FIN.dbgFoe(k,h.pos.x+1.2,h.pos.z-(big?7:4),{y:h.pos.y});const res={k,min:1e9,zero:0,checks:0,tr:0,notes:[]};
  for(let s=0;s<10;s++){U.brawl(1);if(!e.alive){res.notes.push('died@'+s);break;}if(e.state==='hide'||!visChain(e.g))continue;
    const t=tris(e.g);if(t.vis>0&&t.drawn<t.vis*0.5){res.tr++;if(res.notes.length<3)res.notes.push('tris '+t.drawn+'/'+t.vis+' st='+e.state);}
    const d=pdiff(e);if(d<0)continue;res.checks++;res.min=Math.min(res.min,d);if(d<3){res.zero++;if(res.notes.length<3)res.notes.push('pix0 st='+e.state+' s='+s);}}
  e.alive=false;return k+': checks='+res.checks+' minDiff='+(res.min===1e9?'-':res.min)+' zero='+res.zero+' trisBad='+res.tr+(res.notes.length?' ['+res.notes.join('; ')+']':'');};
// враг появился позже загрузки уровня и 5 с стоит вдали (без драки) — проверяем, не склеили ли его пачки статики, и видимость в бою потом
window.idle=k=>{ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(150);
  const P=ZC.players,h=P[0].heroes[P[0].act];const e=ZC.FIN.dbgFoe(k,h.pos.x+2,h.pos.z-16,{y:h.pos.y});const B=ZC.FIN.batch;
  let n=0,glob=0,loc=0;for(let t=0;t<6;t++){ZC.tick(60);}e.g.traverse(m=>{if(m.isMesh){n++;if(m.userData.bat){const p=B.prox.find(q=>q.m===m);if(p&&p.cell&&p.cell.local)loc++;else glob++;}}});
  const res=[k+': meshes='+n+' batchedGlobal='+glob+' batchedLocal='+loc];for(const q of[0,1]){const hh=P[q].heroes[P[q].act];hh.pos.set(e.pos.x+(q?1.5:-1.5),h.pos.y,e.pos.z+2.5);hh.vel.set(0,0,0);}
  let zero=0,min=1e9,tb=0,ch=0;for(let s2=0;s2<8;s2++){U.brawl(1);if(!e.alive)break;if(e.state==='hide'||!visChain(e.g))continue;const t=tris(e.g);if(t.vis>0&&t.drawn<t.vis*0.5)tb++;const d=pdiff(e);if(d<0)continue;ch++;min=Math.min(min,d);if(d<3)zero++;}
  e.alive=false;res.push('fight checks='+ch+' minDiff='+(min===1e9?'-':min)+' zero='+zero+' trisBad='+tb);return res.join(' | ');};
'ok'
//@@
['morok','kiki','stump','lizard','cep','golova','pugalo','bolvan'].map(idle).concat(['errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')])
