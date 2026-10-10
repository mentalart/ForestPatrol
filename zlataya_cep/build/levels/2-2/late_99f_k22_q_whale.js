/* ============================== РЕЛИЗ final06 · 2-2: КИТ ВИДНО — корпус по хребту, хвост с плавником, лицо, пена, колья в боках ============================== */
// Раньше «кит» был гладким эллипсоидом под морем (над водой — 2,4 м, а сверху ещё море на 92%), туман съедал всё дальше 150 м,
// и в ролике не было ни одного кадра, где виден кит. Теперь: море опущено на 9 м, у кита свой корпус (профиль хребта уровня: село — на низкой
// спине, ребра и голова — на горбу), на хвосте поднят плавник и машет, у головы — лицо (спящие глаза с ресницами, улыбка, румянец),
// у ватерлинии — пена, в бока вбиты колья, у воды — ласты; вокруг в море — скалы и лодки. Всё — только меши: коллизии и ходьба прежние.
// Подключается из build22 (late_99f_k22.js): const whale=whale22(); дальше — whale.vis(...) каждый кадр (late_99f_k22_p3_lullaby.js).
const WH22={SEA0:-12,N:2.6,M:36,NL:46};   // NL — длина носового колпака: нос на z=−541
// ключи по оси кита (z убывает от хвоста к носу): верх хребта, полуширина, верхний и нижний радиус сечения
// верх хребта: село на хвосте — 0 (под землёй −1), горб от z=−72 — 4,5 (под землёй 3,6), к макушке — выше, лоб — до 11
const WK22=[[94,24,9.5,7.5,7.5],[86,17,11.5,9,9],[76,9,14,11.5,11.5],[64,3,18,13.5,13.5],[46,-1,24,17,17],[30,-1,40,27,27],[10,-1,52,34,30],[-66,-1,56,34,30],[-84,3.6,56,34,30],
  [-394,3.6,58,34,30],[-412,7.4,60,34,30],[-424,8,62,34,30],[-445,10.5,64,34,30],[-470,11,62,33,30],[-495,10,56,31,28]];
const WKS22=(()=>{const K=WK22.slice().sort((a,b)=>b[0]-a[0]).map(r=>[-r[0],r[1],r[2],r[3],r[4]]);const m=[];   // s=−z растёт; монотонный кубик Эрмита (Фритч—Батлер)
  for(let c=1;c<5;c++){const d=[],t=[];for(let i=0;i<K.length-1;i++)d.push((K[i+1][c]-K[i][c])/(K[i+1][0]-K[i][0]));t.push(d[0]);for(let i=1;i<K.length-1;i++)t.push(d[i-1]*d[i]<=0?0:2*d[i-1]*d[i]/(d[i-1]+d[i]));t.push(d[d.length-1]);m.push(t);}
  return {K,m};})();
function wkVal22(z){const {K,m}=WKS22,s=-z;let i=0;while(i<K.length-2&&s>K[i+1][0])i++;const h=K[i+1][0]-K[i][0],t=clamp((s-K[i][0])/h,0,1),t2=t*t,t3=t2*t;
  return [0,1,2,3].map(c=>{const y0=K[i][c+1],y1=K[i+1][c+1];return (2*t3-3*t2+1)*y0+(t3-2*t2+t)*h*m[c][i]+(-2*t3+3*t2)*y1+(t3-t2)*h*m[c][i+1];});}
// сечение кита в точке z: центр по высоте yc, полуширина a, радиусы вверх bt и вниз bb (на концах — эллипсоидальные колпаки)
function whSec22(z){let b,cap=1;if(z>94){b=wkVal22(94);cap=Math.sqrt(Math.max(0,1-Math.pow((z-94)/6,2)));}else if(z<-495){b=wkVal22(-495);cap=Math.pow(Math.max(0,1-Math.pow((-495-z)/WH22.NL,2.3)),1/2.3);}else b=wkVal22(z);   // нос — круглый, но с плоским лицом
  const yc=b[0]-b[2];return {yc,a:b[1]*cap,bt:b[2]*cap,bb:b[3]*cap,top:yc+b[2]*cap};}
const wEdgeX22=(S,y)=>{const dy=y-S.yc,R=dy>=0?S.bt:S.bb;if(R<1e-3||Math.abs(dy)>=R)return -1;return S.a*Math.pow(1-Math.pow(Math.abs(dy)/R,WH22.N),1/WH22.N);};   // где сечение пересекает высоту y (−1 — нигде)
function whZ22(){const Z=[];for(let k=0;k<=6;k++)Z.push(94+6*Math.sin(Math.PI/2*(1-k/6)));for(let z=91;z>46;z-=3)Z.push(z);for(let z=46;z>-495;z-=6)Z.push(z);for(let k=0;k<=8;k++)Z.push(-495-WH22.NL*Math.sin(Math.PI/2*k/8));return Z;}
let w22seed=1;const w22r=()=>{w22seed=(w22seed*16807)%2147483647;return w22seed/2147483647;};
function hullGeo22(){const Z=whZ22(),M=WH22.M,N=WH22.N,P=[],C=[],I=[],tail=[],cB=new THREE.Color(0x6b8fbd),cL=new THREE.Color(0x9cc2e4),cV=new THREE.Color(0xe4edf8),col=new THREE.Color();
  w22seed=7;const sm=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
  for(let i=0;i<Z.length;i++){const z=Z[i],S=whSec22(z);for(let j=0;j<M;j++){const f=j/M*Math.PI*2,c=Math.cos(f),s=Math.sin(f);
      const x=S.a*Math.sign(c)*Math.pow(Math.abs(c),2/N),y=S.yc+(s>=0?S.bt:S.bb)*Math.sign(s)*Math.pow(Math.abs(s),2/N);P.push(x,y,z);
      let t=z>40?sm(0.0,-0.3,s):sm(0.5,0.12,s);if(z<-440)t=Math.max(t,sm(0.78,0.42,s)*0.85);   // брюхо снизу; у головы светлые щёки и подбородок
      if(z<40&&z>-440&&s>0.02&&s<0.72&&j%3===0)t=Math.max(t,0.38);   // продольные складки, как у горбача
      col.copy(cB).lerp(cL,(1-s)*0.4).lerp(cV,t);const n=(w22r()-0.5)*0.07;col.r=clamp(col.r+n,0,1);col.g=clamp(col.g+n,0,1);col.b=clamp(col.b+n,0,1);C.push(col.r,col.g,col.b);}
    if(z>46)tail.push(i);}
  for(let i=0;i<Z.length-1;i++)for(let j=0;j<M;j++){const a=i*M+j,b=i*M+(j+1)%M,c=(i+1)*M+j,d=(i+1)*M+(j+1)%M;I.push(a,c,d,a,d,b);}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3));geo.setAttribute('color',new THREE.Float32BufferAttribute(C,3));geo.setIndex(I);geo.computeVertexNormals();
  return {geo,Z,M,tailIdx:tail,p0:Float32Array.from(P)};}
// точка на поверхности корпуса, видимая спереди в точке (x,y) — для глаз, бровей, улыбки и румянца: луч с носа вдоль +z
function wSurf22(hull,x,y){const rc=new THREE.Raycaster(new V3(x,y,-900),new V3(0,0,1));const h=rc.intersectObject(hull,false)[0];   // луч спереди: что видно с носа
  if(!h)return null;return {p:h.point.clone(),n:h.face.normal.clone()};}
function makeFace22(g,hull){const eyes=[];const skin=0x6b8fbd,fl=o=>{o.userData.sty=true;o.userData.noBatch=true;o.userData.noBatchL=true;};
  const tube=(pts,r,col)=>{if(pts.length>3){const m=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),28,r,6,false),MB(col));fl(m);g.add(m);}};
  for(const s of[-1,1]){const h=wSurf22(hull,s*27,-1);if(!h)continue;const E=eye22(0,0,0,6.6,1);g.add(E.g);E.g.position.copy(h.p).addScaledVector(h.n,1.2);E.g.lookAt(h.p.clone().addScaledVector(h.n,10));
    E.g.traverse(m=>{fl(m);if(m.material&&m.material.color&&m.material.color.getHex()===0x5a6a86)m.material.color.set(skin);});eyes.push(E);
    {const R=6.6*1.05,ap=[];for(let a=Math.PI*1.12;a<=Math.PI*1.88;a+=0.1){const x=Math.cos(a)*R*0.62,y=Math.sin(a)*R*0.5+R*0.12;ap.push(new V3(x,y,Math.sqrt(Math.max(0.01,R*R-x*x-y*y))+0.25));}
      const arc=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ap),20,0.5,6,false),MB(0x22304e));fl(arc);E.g.add(arc);const set0=E.set;E.set=k=>{set0(k);arc.visible=k<0.15;};}   // закрытый глаз: тёмная дуга по веку, открыли — дуга прячется
    const bl=wSurf22(hull,s*38,-7);if(bl){const b=new THREE.Mesh(new THREE.CircleGeometry(4.6,18),MB(0xff9fb4,{transparent:true,opacity:0.65,depthWrite:false}));b.position.copy(bl.p).addScaledVector(bl.n,0.4);b.lookAt(bl.p.clone().addScaledVector(bl.n,5));fl(b);g.add(b);}
    const br=[];for(let k=-3;k<=3;k++){const q=wSurf22(hull,s*27+k*3.4,9+1.6*Math.cos(k/3*1.1));if(q)br.push(q.p.clone().addScaledVector(q.n,0.5));}tube(br,0.5,0x2a3a58);}   // брови
  const pts=[];for(let k=-6;k<=6;k++){const x=k/6*19,h=wSurf22(hull,x,-8.5+3.6*Math.pow(k/6,2));if(h)pts.push(h.p.clone().addScaledVector(h.n,0.55));}tube(pts,1.1,0x2a3a58);   // улыбка
  return {eyes};}
// ласты: качаются у воды
function makeFlippers22(g){const L=[];for(const s of[-1,1]){const p=new THREE.Group();p.position.set(s*60,-13.5,-446);g.add(p);const f=new THREE.Mesh(new THREE.SphereGeometry(1,14,8),M(0x5b7fae));f.scale.set(20,1.5,6.5);f.position.set(s*15,0,8);f.rotation.y=s*0.45;f.rotation.x=0.55;p.add(f);
    f.userData.sty=true;f.userData.noBatch=true;f.userData.noBatchL=true;L.push({p,s});}
  return L;}
// хвост: плавник на конце, как у кита, что машет рукой: два крыла и выемка; лежит в плоскости (x, вдоль хвоста)
function makeFluke22(g){const sh=new THREE.Shape();const pts=[[0,0],[-8,2],[-18,6],[-26,12],[-21,13],[-12,9.6],[0,6.8],[12,9.6],[21,13],[26,12],[18,6],[8,2]];pts.forEach((q,i)=>i?sh.lineTo(q[0],q[1]):sh.moveTo(q[0],q[1]));
  const geo=new THREE.ExtrudeGeometry(sh,{depth:1.4,bevelEnabled:true,bevelThickness:0.6,bevelSize:0.6,bevelSegments:2});geo.rotateX(Math.PI/2);   // форма в плоскости (x,y) → лежит в (x,z): хорда — вдоль +z (от хвоста), толщина — вниз
  const m=new THREE.Mesh(geo,M(0x5f86b6));m.userData.sty=true;m.userData.noBatch=true;m.userData.noBatchL=true;m.scale.setScalar(1.6);m.position.y=1.1;const roll=new THREE.Group();roll.rotation.z=0.9;roll.add(m);const f=new THREE.Group();f.add(roll);g.add(f);return f;}   // крен вокруг хорды: сбоку виден веером, не ребром
// пена по ватерлинии: замкнутый контур по сечениям кита, три ряда с затуханием, живая кромка; пересчитывается при смене уровня моря
function makeFoam22(g){const Z=whZ22(),n=Z.length,K=2*n,rows=3;const pos=new Float32Array(K*rows*3),col=new Float32Array(K*rows*4);const idx=[];
  for(let r=0;r<rows;r++)for(let k=0;k<K;k++){const a=[1,0.6,0][r];col[(r*K+k)*4]=1;col[(r*K+k)*4+1]=1;col[(r*K+k)*4+2]=1;col[(r*K+k)*4+3]=a;}
  for(let r=0;r<rows-1;r++)for(let k=0;k<K;k++){const k2=(k+1)%K,a=r*K+k,b=r*K+k2,c=(r+1)*K+k,d=(r+1)*K+k2;idx.push(a,c,d,a,d,b);}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setAttribute('color',new THREE.BufferAttribute(col,4));geo.setIndex(idx);
  const m=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({vertexColors:true,transparent:true,depthWrite:false,side:THREE.DoubleSide}));m.frustumCulled=false;m.renderOrder=6;m.userData.sty=true;m.userData.noBatch=true;m.userData.noBatchL=true;W.group.add(m);
  const SEC=Z.map(z=>whSec22(z)),px=new Float32Array(K),pz=new Float32Array(K);
  return {m,update(sy,rise,t,k){const y=sy-rise;   // уровень моря в системе корпуса
    for(let i=0;i<n;i++){let x=wEdgeX22(SEC[i],y);if(x<0)x=0;px[i]=-x;pz[i]=Z[i];px[K-1-i]=x;pz[K-1-i]=Z[i];}
    const cz=-220;for(let kk=0;kk<K;kk++){const a=(kk+K-1)%K,b=(kk+1)%K;let tx=px[b]-px[a],tz=pz[b]-pz[a];const L=Math.hypot(tx,tz)||1;tx/=L;tz/=L;let nx=tz,nz=-tx;if(nx*px[kk]+nz*(pz[kk]-cz)<0){nx=-nx;nz=-nz;}
      const wob=Math.sin(t*1.4+pz[kk]*0.07+(kk<n?0:2))*0.9;const off=[-0.7,3.4+wob*0.5,8.5+wob*1.6];
      for(let r=0;r<rows;r++){const o=(r*K+kk)*3;pos[o]=px[kk]+nx*off[r];pos[o+1]=sy+0.07+r*0.01;pos[o+2]=pz[kk]+nz*off[r];}}
    geo.attributes.position.needsUpdate=true;m.material.opacity=0.8+0.12*Math.sin(t*1.7);}};}
// колья в боках: «все бока его изрыты, частоколы в рёбра вбиты» — тёмные раны и торчащие колья по обе стороны у рёбер
function makeStakes22(g){const dark=M(0x4b5d86),wood=M(0x9a6a3c),rope=M(0xd8c090);
  for(let z=-104;z>-214;z-=9)for(const s of[-1,1]){const S=whSec22(z+(w22r()-0.5)*3),y=-3+w22r()*5,x=wEdgeX22(S,y);if(x<0)continue;const px=s*x,nrm=new V3(s*0.9,0.45,0).normalize();
    const wound=new THREE.Mesh(new THREE.SphereGeometry(1,10,6),dark);wound.scale.set(3.4,2.2,0.6);wound.position.set(px,y,z);wound.lookAt(new V3(px,y,z).add(nrm));g.add(wound);wound.userData.sty=true;wound.userData.noBatch=true;wound.userData.noBatchL=true;
    if(w22r()<0.7){const h=8+w22r()*4,stake=new THREE.Mesh(new THREE.CylinderGeometry(0.45,0.55,h,6),wood);const dir=new V3(s*(0.6+w22r()*0.4),0.8,(w22r()-0.5)*0.5).normalize();stake.position.set(px,y,z).addScaledVector(dir,h*0.32);
      stake.quaternion.setFromUnitVectors(new V3(0,1,0),dir);g.add(stake);stake.userData.sty=true;stake.userData.noBatch=true;stake.userData.noBatchL=true;
      if(w22r()<0.5){const band=new THREE.Mesh(new THREE.CylinderGeometry(0.65,0.65,0.5,6),rope);band.position.copy(stake.position).addScaledVector(dir,h*0.18);band.quaternion.copy(stake.quaternion);g.add(band);band.userData.sty=true;band.userData.noBatch=true;band.userData.noBatchL=true;}}}
  }
// целый кит: корпус, лицо, ласты, хвост, пена, колья. g поднимается на вдохе (whale.g.position.y), tail качается (whale.vis)
function whale22(){const g=new THREE.Group();W.group.add(g);const H=hullGeo22();
  const hull=new THREE.Mesh(H.geo,new THREE.MeshLambertMaterial({vertexColors:true}));hull.frustumCulled=false;hull.castShadow=false;hull.receiveShadow=false;hull.userData.sty=true;hull.userData.noBatch=true;hull.userData.noBatchL=true;g.add(hull);hull.updateMatrixWorld(true);
  const face=makeFace22(g,hull),fl=makeFlippers22(g),fluke=makeFluke22(g),foam=makeFoam22(g);makeStakes22(g);
  // дыхало на темени и фонтанчик: кит вздыхает
  const BHZ=-462,BHY=whSec22(BHZ).top,bh=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),MB(0x22304e));bh.scale.set(3,0.5,1.8);bh.position.set(0,BHY+0.05,BHZ);bh.userData.sty=true;bh.userData.noBatch=true;bh.userData.noBatchL=true;g.add(bh);
  const sp=new THREE.Mesh(new THREE.CylinderGeometry(1.0,2.4,1,14,1,true),MB(0xf4fcff,{transparent:true,opacity:0.8,side:THREE.DoubleSide,depthWrite:false}));sp.visible=false;sp.userData.sty=true;sp.userData.noBatch=true;sp.userData.noBatchL=true;g.add(sp);
  const pos=H.geo.attributes.position;
  const ZT0=46,ZT1=96,YP=-1,tailK=z=>Math.pow(clamp((z-ZT0)/(ZT1-ZT0),0,1),1.6);   // изгиб хвоста: тем сильнее, чем дальше от села
  const FL=1.15;const S96=whSec22(92);   // плавник: основание на сечении 92, хорда вверх под ~57° от горизонта
  const base=new V3(0,S96.yc,92);
  const state={th:0};
  function bendTail(th){const P=H.p0,A=pos.array;for(const i of H.tailIdx)for(let j=0;j<H.M;j++){const o=(i*H.M+j)*3,y=P[o+1],z=P[o+2],w=tailK(z)*th,dz=z-ZT0,dy=y-YP,c=Math.cos(w),s=Math.sin(w);A[o+2]=ZT0+dz*c-dy*s;A[o+1]=YP+dz*s+dy*c;}pos.needsUpdate=true;
    const w=th,dz=base.z-ZT0,dy=base.y-YP,c=Math.cos(w),s=Math.sin(w);fluke.position.set(0,YP+dz*s+dy*c,ZT0+dz*c-dy*s);fluke.rotation.x=-(FL+w*1.25);}
  bendTail(0);
  return {g,hull,face,flippers:fl,fluke,foam,
    // каждый кадр: качание хвоста и ластов, пена по текущему уровню моря. k — вдох (0…1), seaY — высота моря, t — время
    puff(H){H=H||12;sp.visible=true;SFX.whoosh();anim(2.6,q=>{const h=Math.sin(Math.min(1,q*1.1)*Math.PI)*H;sp.scale.set(1+q*1.8,Math.max(0.01,h),1+q*1.8);sp.position.set(0,BHY+h/2,BHZ);sp.material.opacity=0.8*(1-q*0.75);});
      for(let i=0;i<14;i++)later(i*0.07,()=>burst(new V3(rand(-1,1),BHY+g.position.y+rand(2,H),BHZ+rand(-1,1)),i%2?0xe8fbff:0xbfe8ff,5,4));later(2.7,()=>{sp.visible=false;});},
    vis(t,k,seaY){const th=Math.sin(t*0.55)*0.06+k*0.09;if(Math.abs(th-state.th)>0.0004){state.th=th;bendTail(th);}
      for(const f of fl)f.p.rotation.z=f.s*(0.28+0.14*Math.sin(t*0.7+f.s)+k*0.1);
      foam.update(seaY,g.position.y,t,k);}};}
// ---- общая «одёжка» мира (late_24_world.js) для 2-2: обрывов-подножий и скал у обрывов нет — кит стоит в воде сам; оставляем море с волнами и частицы,
// а скалы и лодки ставим кольцом далеко от корпуса
{const _dw=FIN.dressWorld;FIN.dressWorld=function(){if(!W.k22)return _dw.apply(this,arguments);
  const D=FIN.dress,B={minx:-60,maxx:60,minz:-545,maxz:100,minTop:0,maxTop:8.5,rects:[]};D.kind='sea';D.B=B;D.floorY=null;D.oceanY=WH22.SEA0;D.seaPlane=true;D.village=null;
  plantDecorTrees(null);if(FIN.dressAtmo)FIN.dressAtmo('sea',B);
  const items=[];let sd=4242;const R=()=>{sd=(sd*16807)%2147483647;return sd/2147483647;};
  for(let i=0;i<30;i++){const side=R()<0.5?-1:1,x=side*(95+R()*190),z=-545+R()*700,n=R()<0.5?'seaStack':R()<0.4?'boat':'rock',s=n==='seaStack'?1.4+R()*1.4:n==='boat'?1.1+R()*0.3:2.5+R()*2.5;
    items.push({name:n,v:R()<0.5?0:1,x,y:WH22.SEA0-(n==='seaStack'?1.5:n==='boat'?0.25:0.4),z,s,ry:R()*6.283,tint:0.85+R()*0.25,shadow:false});}
  instKit(items);};}
// дальность прорисовки: кит длиной 640 м — в ролике виден целиком (в других уровнях прежние 320)
{const _ll=loadLevel;loadLevel=function(i){_ll(i);const f=W.k22?1600:320;for(const c of[cams[0],cams[1],camS])if(c.far!==f){c.far=f;c.updateProjectionMatrix();}};}
// высота моря: логический уровень SEA.y (−3,2 в покое, до +7 при нырянии — по нему считаются герои) → на экране кит выступает на 11—24 м
const seaVis22=s=>{const t=clamp(-s/3.2,0,1);return s-8.8*t*t*(3-2*t);};
