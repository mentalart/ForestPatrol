/* ============================== РЕЛИЗ final03 · SYNTY-ПРОХОД ПО УРОВНЮ: фаски, шум, тон по вершинам, слои, кромки ============================== */
// После постройки уровня (и потом раз в полсекунды — для нового) каждый меш мира получает:
//  · коробки — фаску и лёгкий шум вершин (верх ровный: пол не проваливается), большие — сетку граней;
//  · остальные формы — шум вершин (плоские верхушки цилиндров остаются плоскими), цилиндры — фаску по кромкам;
//  · тон по вершинам (атрибут aShade): верх светлее и теплее, низ темнее и холоднее, градиент-AO по высоте, разброс граней, слои-страты на высоких стенах;
//  · земля: трава — сетка граней с пятнами и светлой кромкой, боковина — обрыв со слоями и неровным краем.
// Материалы, коллизии, видимость и перекрашивание не трогаются.
const STY={cache:new WeakMap(),sweepT:0,n:0,t:0};FIN.sty=STY;
const S_V=[new V3(),new V3(),new V3()],S_E1=new V3(),S_E2=new V3(),S_N=new V3(),S_S=new V3(),S_Q=new THREE.Quaternion(),S_P=new V3();
// тон по треугольникам; o: kind ('gen'|'box'|'gtop'|'gside'), rim (фаска), strata, J (разброс), seed
function syShade(g,o){const pos=g.attributes.position,n=pos.count;if(!g.boundingBox)g.computeBoundingBox();const bb=g.boundingBox,y0=bb.min.y,y1=bb.max.y,H=Math.max(1e-4,y1-y0);
  const A=new Float32Array(n*3),J=o.J!=null?o.J:0.035,sd=o.seed||0,rim=o.rim||0,kind=o.kind||'gen',tall=H*(o.sy||1);
  const grad=kind==='gside'?0.3:tall>2.5?0.26:tall>0.8?0.18:0.1,band=o.band||0.55;
  for(let i=0;i+2<n;i+=3){for(let k=0;k<3;k++)S_V[k].fromBufferAttribute(pos,i+k);S_E1.subVectors(S_V[1],S_V[0]);S_E2.subVectors(S_V[2],S_V[0]);S_N.crossVectors(S_E1,S_E2);const L=S_N.length();if(L<1e-14)continue;S_N.divideScalar(L);
    const cx=(S_V[0].x+S_V[1].x+S_V[2].x)/3,cy=(S_V[0].y+S_V[1].y+S_V[2].y)/3,cz=(S_V[0].z+S_V[1].z+S_V[2].z)/3,ny=S_N.y;
    let s=(h3(Math.round(cx*37+sd),Math.round(cy*37),Math.round(cz*37))-0.5)*2*J,r=0,gg=0,b=0;
    if(ny>0.8){s+=kind==='gtop'?0.02:0.06;r+=0.025;gg+=0.015;b-=0.01;
      if(kind==='gtop'){s+=n3(Math.floor(cx/3.5),Math.floor(cz/3.5),1,sd+3)*0.045+n3(Math.floor(cx/1.3),Math.floor(cz/1.3),2,sd)*0.02;}}
    else if(ny<-0.8){s-=0.3;b+=0.03;}
    else{const t=(cy-y0)/H;s-=Math.pow(1-t,1.4)*grad;
      if(rim&&ny>0.2&&cy>y1-rim*2.2){s+=kind==='gtop'?0.2:0.15;r+=0.02;gg+=0.02;}          // светлая кромка ходибельной поверхности
      if(kind==='gtop'&&ny<0.2)s-=0.1;
      if(o.strata&&tall>1.2){const bi=Math.floor((cy-y0)/band+h3(Math.round(cx*0.7),0,Math.round(cz*0.7)+sd)*0.35);const st=[0.05,-0.04,0.02,-0.08,0.0,-0.03][((bi%6)+6)%6];s+=st*(kind==='gside'?1.6:1);
        if(kind==='gside'){r+=(bi%2?0.03:-0.01);b+=(bi%2?-0.02:0.015);}}}
    for(let k=0;k<3;k++){A[(i+k)*3]=s+r;A[(i+k)*3+1]=s+gg;A[(i+k)*3+2]=s+b;}}
  g.setAttribute('aShade',new THREE.BufferAttribute(A,3));return g;}
// шум вершин по позиции (одинаковые точки — одинаковый сдвиг), верхушка по y не двигается
function syJitter(g,amp,sd,keepTop){const p=g.attributes.position;if(!g.boundingBox)g.computeBoundingBox();const top=g.boundingBox.max.y,bot=g.boundingBox.min.y;
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),kx=q4(x),ky=q4(y),kz=q4(z),t=keepTop&&y>top-1e-4,bt=y<bot+1e-4;
    p.setXYZ(i,x+n3(kx,ky,kz,sd)*amp,t||bt?y:y+n3(ky,kz,kx,sd+1)*amp*0.7,z+n3(kz,kx,ky,sd+2)*amp);}
  p.needsUpdate=true;g.computeVertexNormals();g.computeBoundingBox();g.computeBoundingSphere();return g;}
const syWS=m=>{m.updateMatrixWorld();m.matrixWorld.decompose(S_P,S_Q,S_S);return S_S;};
const sySeed=m=>{const p=m.getWorldPosition(S_P);return (Math.round(p.x*7)*31+Math.round(p.z*7)*17+Math.round(p.y*7)*7)%997;};
// коробка: те же размеры, но с фаской, шумом и сеткой граней
function syBox(m,g,sz,ctr,ws,o){const minD=Math.min(sz.x*ws.x,sz.y*ws.y,sz.z*ws.z),maxD=Math.max(sz.x*ws.x,sz.y*ws.y,sz.z*ws.z),sc=(ws.x+ws.y+ws.z)/3,sd=sySeed(m);
  const b=Math.max(0.01,Math.min(minD*0.12,0.1))/sc,cell=(maxD>1.4?Math.max(0.9,maxD/36):1e9)/sc,amp=(maxD<0.5?Math.min(minD*0.04,0.012):Math.min(minD*0.045,0.05))/sc;
  const topA=(sz.x*ws.x*sz.z*ws.z>6&&!o.gtop?0.012:o.gtop?0.018:0)/sc;
  const ng=sBoxGeo(sz.x,sz.y,sz.z,{b:o.gtop?0.07/sc:b,cell:o.gtop?1.25/sc:cell,amp:o.gside?0.07/sc:amp,topAmp:topA,seed:sd,max:60});
  if(o.gtop){const p=ng.attributes.position,hy=sz.y/2;for(let i=0;i<p.count;i++){const y=p.getY(i);if(y<-hy+1e-4){const x=p.getX(i),z=p.getZ(i);p.setY(i,y-(h3(q4(x),q4(z),5)*0.12)/sc);}}p.needsUpdate=true;}   // неровный нижний край травы
  ng.translate(ctr.x,ctr.y,ctr.z);ng.computeBoundingBox();ng.computeBoundingSphere();
  return syShade(ng,{kind:o.gtop?'gtop':o.gside?'gside':'box',rim:o.gtop?0.07/sc:b,strata:o.gside||(sz.y*ws.y>1.5&&Math.max(sz.x*ws.x,sz.z*ws.z)>0.9),seed:sd,sy:ws.y,band:(o.gside?0.62:0.5)/ws.y,J:o.gtop?0.045:0.035});}
// цилиндр без поворота: профиль с фаской сверху и снизу
function syCyl(g,prm,ctr,ws){const rt=prm.radiusTop,rb=prm.radiusBottom,h=prm.height,seg=prm.radialSegments||8,b=Math.min(0.06,Math.min(rt,rb)*0.25,h*0.2)/((ws.x+ws.z)/2);
  const pts=[[0,-h/2],[rb-b,-h/2],[rb,-h/2+b],[rt,h/2-b],[rt-b,h/2],[0,h/2]].map(p=>new THREE.Vector2(Math.max(0,p[0]),p[1]));
  const ng=new THREE.LatheGeometry(pts,seg).toNonIndexed();ng.translate(ctr.x,ctr.y,ctr.z);ng.computeBoundingBox();return ng;}
function syGeo(m){const g=m.geometry,ws=syWS(m);if(!g.boundingBox)g.computeBoundingBox();const bb=g.boundingBox,sz=bb.getSize(new V3()),ctr=bb.getCenter(new V3());
  const wr=Math.max(sz.x*ws.x,sz.y*ws.y,sz.z*ws.z);if(!(wr>0.07))return null;const gtop=!!m.userData.gtop,gside=!!m.userData.gside;
  // общая геометрия у многих мешей: одна стилизованная копия на масштаб
  const key=(gtop?'t':gside?'s':'')+Math.round(ws.x*50)+','+Math.round(ws.y*50)+','+Math.round(ws.z*50);let ce=STY.cache.get(g);if(ce&&ce[key])return ce[key];
  let ng=null;const p=g.parameters||{};
  if(g.type==='BoxGeometry'&&p.width!=null){const d=[p.width,p.height,p.depth].sort((a,b)=>a-b),s=[sz.x,sz.y,sz.z].sort((a,b)=>a-b);
    if(Math.abs(d[0]-s[0])<1e-3&&Math.abs(d[1]-s[1])<1e-3&&Math.abs(d[2]-s[2])<1e-3)ng=syBox(m,g,sz,ctr,ws,{gtop,gside});}
  if(!ng&&g.type==='CylinderGeometry'&&p.radiusTop>0.04&&p.radiusBottom>0.04&&!p.openEnded&&Math.abs((p.thetaLength||6.2832)-6.2832)<1e-3&&p.height>0.06&&Math.abs(sz.y-p.height)<1e-3&&Math.abs(sz.x-2*Math.max(p.radiusTop,p.radiusBottom))<0.02*Math.max(p.radiusTop,p.radiusBottom)+1e-3){
    ng=syCyl(g,p,ctr,ws);const amp=Math.min(0.03,Math.min(p.radiusTop,p.radiusBottom)*0.12)/((ws.x+ws.z)/2);if(amp>0.002&&wr>0.3)syJitter(ng,amp,sySeed(m),true);ng.computeBoundingSphere();ng=syShade(ng,{kind:'box',rim:0.05,seed:sySeed(m),sy:ws.y});}
  if(!ng){if(g.attributes.position.count>6000)return null;ng=g.index?g.toNonIndexed():g.clone();if(ng.groups)ng.clearGroups();
    const minE=Math.min(sz.x,sz.y,sz.z),flat=minE<1e-3;const r0=Math.min(sz.x*ws.x,sz.y*ws.y,sz.z*ws.z),sc=(ws.x+ws.y+ws.z)/3;
    const small=/Sphere/.test(g.type)&&(p.radius||1)*sc<0.25;const amp=flat||small||/Torus|Tube|Text/.test(g.type)?0:Math.min(0.035,r0*0.06,wr*0.03)/sc;
    if(amp>0.002)syJitter(ng,amp,sySeed(m),true);else{ng.computeBoundingBox();ng.computeBoundingSphere();}
    ng=syShade(ng,{kind:'gen',seed:sySeed(m),sy:ws.y,J:0.03});}
  ng.userData.sty=true;if(!ce){ce={};STY.cache.set(g,ce);}ce[key]=ng;return ng;}
function syOk(m){if(!m.isMesh||m.isInstancedMesh||m.isSkinnedMesh||m.userData.sty||m.userData.styNo)return false;const mt=m.material;
  if(!mt||Array.isArray(mt)||!mt.isMeshPhongMaterial||mt.map||mt.userData.kit||mt.transparent&&mt.opacity<0.98)return false;
  const g=m.geometry;if(!g||!g.attributes||!g.attributes.position||g.userData.sty||g.userData.kit||g.morphAttributes&&g.morphAttributes.position)return false;return true;}
// мелочь (глаза, пуговицы, бусины) тени не отбрасывает: тени не видно, а отрисовка в карту теней стоит как целый меш
function syShadowCull(m){if(!m.castShadow)return;const g=m.geometry;if(!g.boundingSphere)g.computeBoundingSphere();const s=syWS(m);if(g.boundingSphere.radius*Math.max(s.x,s.y,s.z)<0.13)m.castShadow=false;}
function syMesh(m){if(!syOk(m))return false;m.userData.sty=true;syShadowCull(m);let ng=null;try{ng=syGeo(m);}catch(e){console.error('sty',e);}
  if(ng){m.geometry=ng;m.userData.styGeo=ng;STY.n++;return true;}
  if(!m.geometry.attributes.aShade&&!m.geometry.index&&m.geometry.attributes.position.count<6000){syShade(m.geometry,{kind:'gen',J:0.03});}return false;}
function syTree(root){const t0=performance.now();let k=0;root.traverse(o=>{if(o.isMesh&&!o.userData.sty&&syMesh(o))k++;});STY.t=performance.now()-t0;return k;}
FIN.styLevel=()=>syTree(W.group);
// раз в полсекунды — то, что появилось в мире после загрузки (персонажи роликов, подвижные детали)
FIN.stySweep=function(dt){STY.sweepT-=dt;if(STY.sweepT>0||!W||!W.group)return;STY.sweepT=0.5;syTree(W.group);};
// земля: верх и боковина помечаются при постройке
{const _ground=ground;ground=function(minx,maxx,minz,maxz,top,topMat,sideMat){const n0=W.group.children.length;const c=_ground(minx,maxx,minz,maxz,top,topMat,sideMat);
   const ch=W.group.children,side=ch[n0],tp=ch[n0+1];if(side&&side.isMesh)side.userData.gside=true;if(tp&&tp.isMesh)tp.userData.gtop=true;return c;};}
{const _step=step;step=function(dt){_step(dt);FIN.stySweep(dt);};}
