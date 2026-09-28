/* ============================== РЕЛИЗ · LOW-POLY ОКРУЖЕНИЕ: фактура граней, трава, цветы, камешки ============================== */
// бесшовная фактура «треугольники»: каждая плоскость земли и стены разбита на грани чуть разного тона
const TRI_TEX=(()=>{const N=10,S=512,c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d');const cell=S/N;let rs=7;const rnd=()=>{rs=(rs*16807)%2147483647;return (rs-1)/2147483646;};
  const J=[];for(let i=0;i<N;i++){J.push([]);for(let j=0;j<N;j++)J[i].push([(rnd()-0.5)*cell*0.7,(rnd()-0.5)*cell*0.7]);}
  const P=(i,j)=>{const q=J[i%N][j%N];return [i*cell+q[0],j*cell+q[1]];};
  const tri=(a,b,d)=>{const g=Math.round(255*(0.8+rnd()*0.2));x.fillStyle='rgb('+g+','+g+','+g+')';x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.lineTo(d[0],d[1]);x.closePath();x.fill();x.stroke();};
  x.lineWidth=1.2;x.strokeStyle='rgba(0,0,0,0.035)';
  for(let i=-1;i<=N;i++)for(let j=-1;j<=N;j++){const a=P(i+N,j+N),b=P(i+1+N,j+N),d=P(i+1+N,j+1+N),e=P(i+N,j+1+N);const o=[-N*cell,-N*cell];const sh=p=>[p[0]+o[0],p[1]+o[1]];
    if(rnd()<0.5){tri(sh(a),sh(b),sh(d));tri(sh(a),sh(d),sh(e));}else{tri(sh(a),sh(b),sh(e));tri(sh(b),sh(d),sh(e));}}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t;})();
// UV по мировым координатам: одна фактура на все размеры, крупность грани одинакова на полянах и на стенах
function worldUV(m,top,side){const g=m.geometry,p=g.attributes.position,n=g.attributes.normal,uv=g.attributes.uv;if(!p||!n||!uv)return;const o=m.position;
  for(let i=0;i<p.count;i++){const x=p.getX(i)+o.x,y=p.getY(i)+o.y,z=p.getZ(i)+o.z,ny=Math.abs(n.getY(i)),nx=Math.abs(n.getX(i));
    if(ny>0.5)uv.setXY(i,x/top,z/top);else if(nx>0.5)uv.setXY(i,z/side,y/side);else uv.setXY(i,x/side,y/side);}uv.needsUpdate=true;}
function triMat(mat){if(!mat||mat.map||mat.transparent||!mat.isMeshPhongMaterial||mat.userData.noTri)return;mat.map=TRI_TEX;mat.needsUpdate=true;}
{const _ground=ground;ground=function(minx,maxx,minz,maxz,top,topMat,sideMat){const n0=W.group.children.length;const c=_ground(minx,maxx,minz,maxz,top,topMat,sideMat);
   const ch=W.group.children,side=ch[n0],tp=ch[n0+1];
   if(tp&&tp.isMesh){worldUV(tp,5,4);triMat(tp.material);(W.finG||(W.finG=[])).push({minx,maxx,minz,maxz,top:top||0,mat:tp.material});}
   if(side&&side.isMesh){worldUV(side,5,3.2);triMat(side.material);}return c;};}
{const _box=box;box=function(minx,maxx,miny,maxy,minz,maxz,mat,o){const r=_box(minx,maxx,miny,maxy,minz,maxz,mat,o);if(r&&r.mesh){worldUV(r.mesh,4,3);triMat(r.mesh.material);}return r;};}
// ели на опушках — гранёные, чуть неровные, каждая повёрнута по-своему
{let done=false;const _flush=flushDecor;flushDecor=function(){if(!done){done=true;['cone1','cone2','needle'].forEach(k=>{if(GEO[k])FIN.jitter(GEO[k],0.18);});}
  const L=W.decor;_flush();if(!L.length)return;const q=new THREE.Quaternion(),m=new THREE.Matrix4(),Y=new V3(0,1,0),s=new V3(),p=new V3();
  for(const o of W.group.children){if(!o.isInstancedMesh||o.count!==L.length||o.userData.rot)continue;o.userData.rot=true;
    for(let i=0;i<o.count;i++){o.getMatrixAt(i,m);m.decompose(p,q,s);q.setFromAxisAngle(Y,((i*2654435761)%1000)/1000*6.283);m.compose(p,q,s);o.setMatrixAt(i,m);}o.instanceMatrix.needsUpdate=true;}};}
// трава, цветы и камешки на полянах, по краям — ракушки на песке, угольки у огненной реки
const TUFT_GEO=(()=>{const pos=[];for(let i=0;i<5;i++){const a=i/5*Math.PI*2+0.3,w=0.05,h=0.26+0.12*((i*7)%3)/2,tx=Math.sin(a)*0.1,tz=Math.cos(a)*0.1,cx=Math.cos(a)*w,cz=-Math.sin(a)*w;
    pos.push(-cx,0,-cz, cx,0,cz, tx*1.4,h,tz*1.4);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.computeVertexNormals();return g;})();
const BLOOM_GEO=new FIN.orig.Icosa(0.07,0),PEB_GEO=new THREE.DodecahedronGeometry(0.11);
function surfKind(mat,theme){if(theme==='heaven'||theme==='skynight'||theme==='skyday')return 'cloud';if(theme==='smorodina'||theme==='forgein')return 'ash';if(theme==='kitezh')return 'sea';
  const hsl={h:0,s:0,l:0};mat.color.getHSL(hsl);if(hsl.h>0.16&&hsl.h<0.47&&hsl.s>0.18&&hsl.l<0.62)return 'grass';if(hsl.h>0.08&&hsl.h<0.17&&hsl.l>0.55)return 'sand';return 'stone';}
function scatterDecor(){const G0=W.finG||[];if(!G0.length)return;const q=FIN.set.quality,dens=q==='low'?0.35:q==='mid'?0.7:1;
  const blockers=[];const pt=o=>o&&(o.pos||(o.g&&o.g.position)||(o.x!==undefined&&o.z!==undefined?o:null));
  for(const L of [W.plates,W.items,W.bells,W.stakes,W.sockets,W.hots,W.chests,W.stumps])if(L)for(const o of L){const p=pt(o);if(p)blockers.push(p);}
  const rects=[].concat(W.waters||[],W.lavas||[]).filter(z=>z&&z.minx!==undefined);
  const free=(x,z,top)=>{for(const b of W.boxes){if(!b.on)continue;if(x>b.minx-0.15&&x<b.maxx+0.15&&z>b.minz-0.15&&z<b.maxz+0.15&&b.maxy>top+0.05&&b.miny<top+1.2)return false;}
    for(const c of W.cyls){if(!c.on)continue;if(Math.hypot(x-c.x,z-c.z)<c.r+0.2&&c.miny<top+1.2&&c.maxy>top)return false;}
    for(const p of blockers)if(Math.hypot(x-p.x,z-p.z)<1.3)return false;for(const r of rects)if(x>r.minx&&x<r.maxx&&z>r.minz&&z<r.maxz)return false;return true;};
  const T=[],F=[],P=[];let rs=(W.levelId||'x').split('').reduce((a,c)=>a*31+c.charCodeAt(0),7)%2147483647||7;const rnd=()=>{rs=(rs*16807)%2147483647;return (rs-1)/2147483646;};
  for(const g of G0){const k=surfKind(g.mat,W.theme);if(k==='cloud')continue;const area=(g.maxx-g.minx)*(g.maxz-g.minz);
    const nT=k==='grass'?area*0.8:k==='sea'?area*0.25:0,nF=k==='grass'?area*0.1:0,nP=area*(k==='grass'?0.06:k==='ash'?0.2:0.14);
    const put=(arr,n,kind)=>{for(let i=0;i<n*dens;i++){const x=g.minx+0.3+rnd()*(g.maxx-g.minx-0.6),z=g.minz+0.3+rnd()*(g.maxz-g.minz-0.6);if(free(x,z,g.top))arr.push({x,z,y:g.top,k,kind,r:rnd(),mc:g.mat.color});}};
    put(T,nT,'tuft');put(F,nF,'bloom');put(P,nP,'peb');}
  const cap=(a,n)=>{while(a.length>n)a.splice(Math.floor(rnd()*a.length),1);};cap(T,1500*dens);cap(F,260*dens);cap(P,420*dens);
  for(const f of F)T.push({x:f.x,z:f.z,y:f.y,k:'grass',kind:'stem',r:f.r*0.5,mc:f.mc});
  const m4=new THREE.Matrix4(),qq=new THREE.Quaternion(),Y=new V3(0,1,0),col=new THREE.Color(),hsl={h:0,s:0,l:0};
  const inst=(geo,mat,arr,fn)=>{if(!arr.length)return;const im=new THREE.InstancedMesh(geo,mat,arr.length);arr.forEach((d,i)=>fn(d,i,im));im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;im.receiveShadow=true;im.castShadow=false;im.userData.decor=true;W.group.add(im);};
  const BLOOMS={grass:[0xfff4e0,0xffd84a,0x7fb4ff,0xff7a8a,0xd8a0ff]};
  inst(TUFT_GEO,new THREE.MeshLambertMaterial({color:0xffffff,side:THREE.DoubleSide}),T,(d,i,im)=>{const s=d.kind==='stem'?0.55:0.7+d.r*0.8;qq.setFromAxisAngle(Y,d.r*40);m4.compose(new V3(d.x,d.y,d.z),qq,new V3(s,s*(d.kind==='sea'?2.2:d.kind==='stem'?1.25:1),s));im.setMatrixAt(i,m4);
    d.mc.getHSL(hsl);if(d.k==='sea')col.setHSL(0.45+d.r*0.05,0.45,0.32+d.r*0.1);else col.setHSL(hsl.h+(d.r-0.5)*0.04,Math.min(1,hsl.s*1.1+0.05),hsl.l*(0.72+d.r*0.35));im.setColorAt(i,col);});
  inst(BLOOM_GEO,new THREE.MeshLambertMaterial({color:0xffffff,emissive:0x222222}),F,(d,i,im)=>{const s=0.8+d.r*0.7;qq.setFromAxisAngle(Y,d.r*30);m4.compose(new V3(d.x,d.y+0.2+d.r*0.08,d.z),qq,new V3(s,s,s));im.setMatrixAt(i,m4);
    const L=BLOOMS.grass;col.setHex(L[Math.floor(d.r*L.length*0.999)]);im.setColorAt(i,col);});
  inst(PEB_GEO,new THREE.MeshLambertMaterial({color:0xffffff}),P,(d,i,im)=>{const s=0.5+d.r*1.1;qq.setFromAxisAngle(Y,d.r*50);m4.compose(new V3(d.x,d.y+0.02,d.z),qq,new V3(s,s*0.55,s));im.setMatrixAt(i,m4);
    if(d.k==='ash')col.setHSL(0.03,0.2,0.12+d.r*0.1);else if(d.k==='sand'||d.k==='sea')col.setHSL(0.07+d.r*0.04,0.35,0.72+d.r*0.15);else{d.mc.getHSL(hsl);col.setHSL(hsl.h,hsl.s*0.3,Math.min(0.85,hsl.l*0.85+0.1+d.r*0.12));}im.setColorAt(i,col);});}
