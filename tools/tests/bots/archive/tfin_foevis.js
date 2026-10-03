//@@
// релиз: враги не пропадают. На каждом уровне с аренами — герои переносятся в каждую арену, идёт драка; каждые 0,5 с для каждого врага в кадре
// (его не заслоняет стена) сравниваются кадр с врагом и без него: разница в пикселях должна быть. Плюс учёт треугольников: видимые части врага
// рисуются своими мешами на слое 0 или локальными пачками.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(a.map(x=>x&&x.stack?x.stack.slice(0,160):String(x)).join(' '));ce(...a);};}
const O=ZC.FIN.occ,D=O.dbg,R=D.renderer,gl=R.getContext();O.fdt=0.05;
window.visChain=o=>{while(o){if(!o.visible)return false;if(o===ZC.W.group||!o.parent)return true;o=o.parent;}return true;};
window.tris=g=>{let vis=0,drawn=0;g.traverse(m=>{if(!m.isMesh||!visChain(m))return;const gg=m.geometry;if(!gg||!gg.attributes.position)return;const n=(gg.index?gg.index.count:gg.attributes.position.count)/3;
  if(m.userData.batchMesh){const A=gg.attributes.position.array;let live=0;for(let i=0;i<A.length;i+=9){if(A[i]!==A[i+3]||A[i+1]!==A[i+4]||A[i+2]!==A[i+5]||A[i]!==A[i+6])live++;}drawn+=live;return;}
  if(m.userData.xray)return;vis+=n;const mt=m.material;if(m.layers.mask&1&&mt&&!Array.isArray(mt)&&mt.visible&&mt.opacity>0.05)drawn+=n;});return {vis,drawn};};
const RC=new THREE.Raycaster();
window.onScreen=(e,cam)=>{const c=new THREE.Vector3();new THREE.Box3().setFromObject(e.g).getCenter(c);const p=c.clone().project(cam);if(p.z>1||Math.abs(p.x)>0.85||Math.abs(p.y)>0.85)return null;
  const d=c.clone().sub(cam.position);const L=d.length();RC.set(cam.position,d.normalize());RC.far=L-1;const hit=RC.intersectObjects(ZC.W.group.children,true).find(h=>h.object.visible&&!(()=>{let o=h.object;while(o){if(o===e.g)return true;o=o.parent;}return false;})()&&h.object.material&&!h.object.material.transparent);
  if(hit)return null;const W2=R.domElement.width,H2=R.domElement.height;return [Math.max(0,Math.round((p.x*0.5+0.5)*W2)-40),Math.max(0,Math.round((p.y*0.5+0.5)*H2)-40),80,80];};
window.gsync=()=>{const b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.px=(r)=>{const b=new Uint8Array(r[2]*r[3]*4);gl.readPixels(r[0],r[1],r[2],r[3],gl.RGBA,gl.UNSIGNED_BYTE,b);return b;};
window.pixDiff=(e,r)=>{O.frame();const a=px(r);const v=e.g.visible;e.g.visible=false;O.frame();const b=px(r);e.g.visible=v;let n=0;for(let i=0;i<a.length;i+=4)if(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2])>30)n++;return n;};
window.scan=(id)=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(30);for(let k=0;k<4&&ZC.G.cine;k++){ZC.skip();ZC.tick(10);}
  const W=ZC.W,P=ZC.players,bad=[];let checks=0,pix=0,nb=0;const arenas=W.camZones.filter(z=>z.x!==undefined&&z.r);
  const spots=arenas.length?arenas.map(z=>[z.x,z.z,z.y||0]):[[null]];
  for(const s of spots){if(s[0]!==null){for(const pi of[0,1]){const h=P[pi].heroes[P[pi].act];h.pos.set(s[0]+(pi?1:-1),(s[2]||0)+0.5,s[1]+2);h.vel.set(0,0,0);}ZC.tick(60);}
    for(let t=0;t<24;t++){U.brawl(0.5);for(let k=0;k<3&&ZC.G.cine;k++){ZC.skip();ZC.tick(5);}
      for(const e of W.enemies){if(!e.alive||!e.g||e.state==='hide'||!visChain(e.g))continue;const c=tris(e.g);checks++;
        if(c.vis>0&&c.drawn<c.vis*0.5){nb++;if(bad.length<6)bad.push('tris '+e.kind+' st='+e.state+' drawn='+c.drawn+'/'+c.vis);}
        if(t%4===0&&pix<60){O.frame();gsync();const r=onScreen(e,D.camS);if(r){pix++;const n=pixDiff(e,r);if(n<3){nb++;if(bad.length<6)bad.push('pix '+e.kind+' st='+e.state+' diff='+n);}}}}}}
  return id+': arenas='+arenas.length+' foes='+W.enemies.length+' checks='+checks+' pix='+pix+' bad='+nb+(bad.length?' '+bad.join(' | '):'');};
'ok'
//@@
['1-1','1-2','1-3','1-4','1-5','1-B'].map(id=>scan(id))
//@@
['2-1','2-2','2-3','2-4','2-5','2-B'].map(id=>scan(id))
//@@
['3-1','3-2','3-3','3-4','3-5','3-B'].map(id=>scan(id))
//@@
['4-1','4-2','4-3','4-4','4-5','4-B'].map(id=>scan(id))
//@@
['5-1','5-2','5-3','5-4','5-B1','5-B2'].map(id=>scan(id))
//@@
['errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')]
