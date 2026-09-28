/* ============================== РЕЛИЗ final03 · ПРОЦЕДУРНЫЙ КИТ: палитра, фаски, шум, тон по вершинам ============================== */
// Всё окружение final03 собирается из этих генераторов: размер, сид и цветовой вариант — параметры. Внешних моделей и текстур нет.
// Палитра: 40 цветов, у каждого три тона — свет, база, тень. Общая для окружения и персонажей.
const PAL={
 grass:[0xa8d860,0x74ae46,0x447a34],moss:[0x8eab50,0x5f7f3a,0x3b552b],fir:[0x5e9e62,0x35724c,0x1f4a37],
 leaf:[0xc0dc5e,0x8cb842,0x5b8a2f],autumn:[0xf6bc4c,0xe2842f,0xb0521f],bark:[0xa2734b,0x724a2e,0x4a301f],
 birch:[0xfbf8ef,0xe4dfd2,0xb8b0a0],mush:[0xff6e58,0xd8362b,0x9a211b],pink:[0xffbcd0,0xff7ea4,0xd24c7a],
 yellow:[0xfff28e,0xf8d03c,0xc89c1e],white:[0xffffff,0xf1eee6,0xcfc8ba],
 stone:[0xd2cdc3,0x9f9a90,0x6c6760],cliff:[0xc09262,0x926844,0x5e422a],sand:[0xf7e6b6,0xe6cc92,0xb89c64],
 basalt:[0x625866,0x3e3740,0x232026],ash:[0x8e827c,0x625852,0x3c3432],
 shallow:[0xa8f0f4,0x56c4d4,0x2c8ca8],deep:[0x42a2d0,0x2874a2,0x1a4e76],foam:[0xffffff,0xeef9fc,0xc6e6ef],cloud:[0xffffff,0xf0f2ff,0xc8cdf2],
 crystal:[0xd0fdff,0x66e8ff,0x2aa2da],lava:[0xfff290,0xff8c2c,0xc83c1a],coral:[0xffa894,0xff6c6e,0xc84c5c],
 plank:[0xe6b880,0xc48e56,0x8e6238],log:[0xaa7641,0x7e552e,0x53381e],straw:[0xf8de90,0xdeb85c,0xa8863c],plaster:[0xfdf7ec,0xeadec8,0xc0b094],
 roofR:[0xee7c60,0xc6523e,0x8a3228],roofB:[0x76aae0,0x4878b4,0x2c5082],
 iron:[0x949cab,0x606874,0x3a404b],gold:[0xffe884,0xf6be3e,0xba8220],red:[0xff806c,0xda4230,0x9c2c22],blue:[0x80b8ff,0x4282da,0x2a56a2],
 fox:[0xffa464,0xea6e32,0xaa4a20],bear:[0xce9662,0x9c6c3a,0x6c4624],owl:[0xcea4e6,0x9e68bc,0x6c428a],
 hedge:[0x8ae0d0,0x40ac9e,0x2a766e],cream:[0xfff8e8,0xf6deba,0xceb28c],night:[0x3c4c6c,0x202838,0x0f1320],
 green:[0x8ee07a,0x4cb44a,0x2e7a34]};
// близкие оттенки — псевдонимы основных цветов: всего 40 уникальных цветов по 3 тона
Object.assign(PAL,{firDk:PAL.fir,leafDk:PAL.moss,bluefl:PAL.blue,kelp:PAL.green,roofG:PAL.green,hazard:PAL.red,skin:PAL.cream,cloth:PAL.cream,sandstone:PAL.sand});
FIN.PAL=PAL;
const K_WH=new THREE.Color(1,1,1),K_C2=new THREE.Color();
// тон s∈[−1,1]: 0 — база, +1 — свет, −1 — тень
function ktone(p,s,out){out=out||new THREE.Color();if(typeof p==='number'){out.setHex(p);if(s>0)out.lerp(K_WH,s*0.3);else out.multiplyScalar(1+s*0.42);return out;}
  out.setHex(p[1]);if(s>=0)out.lerp(K_C2.setHex(p[0]),Math.min(1,s));else out.lerp(K_C2.setHex(p[2]),Math.min(1,-s));return out;}
// детерминированный шум: одинаковые точки сдвигаются одинаково, поэтому швы не расходятся
function h3(x,y,z){const n=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return n-Math.floor(n);}
function n3(x,y,z,s){return h3(x+s*1.37,y-s*0.71,z+s*2.13)*2-1;}
const q4=v=>Math.round(v*1e4)/1e4;
function kRng(seed){let s=(Math.abs(Math.floor(seed))%2147483646)+1;return ()=>{s=(s*16807)%2147483647;return (s-1)/2147483646;};}
const seedOf=str=>String(str||'x').split('').reduce((a,c)=>(a*31+c.charCodeAt(0))%2147483647,7)||7;
// ---------- коробка с фаской: грани-сетки, рёбра срезаны под 45°, углы — гранёные ----------
// o.b — фаска, o.cell — клетка сетки, o.amp — шум боков, o.topAmp — шум верха (обычно 0: пол не должен проваливаться), o.seed
function sBoxGeo(w,h,d,o){o=o||{};const hx=w/2,hy=h/2,hz=d/2,b=Math.max(0,Math.min(o.b!=null?o.b:0.06,hx*0.45,hy*0.45,hz*0.45)),cell=o.cell||1e9,amp=o.amp||0,tAmp=o.topAmp||0,sd=o.seed||0,mx=o.max||48;
  const ax=len=>{const inner=len-2*b,n=Math.max(1,Math.min(mx,Math.round(inner/cell)));const a=[-len/2];if(b>1e-5)a.push(-len/2+b);for(let i=1;i<n;i++)a.push(-len/2+b+inner*i/n);if(b>1e-5)a.push(len/2-b);a.push(len/2);return a;};
  const X=ax(w),Y=ax(h),Z=ax(d),P=[];
  const mp=(x,y,z)=>{let px=x,py=y,pz=z;if(b>1e-5){const qx=Math.max(-hx+b,Math.min(hx-b,x)),qy=Math.max(-hy+b,Math.min(hy-b,y)),qz=Math.max(-hz+b,Math.min(hz-b,z));
      const dx=x-qx,dy=y-qy,dz=z-qz,L=Math.hypot(dx,dy,dz)||1;px=qx+dx/L*b;py=qy+dy/L*b;pz=qz+dz/L*b;}
    if(amp||tAmp){const kx=q4(px),ky=q4(py),kz=q4(pz),top=py>hy-1e-6,bot=py<-hy+1e-6;
      if(top){px+=n3(kx,ky,kz,sd)*amp*0.5;pz+=n3(kz,kx,ky,sd+2)*amp*0.5;py+=tAmp?(n3(kx,kz,1,sd+4)-0.35)*tAmp:0;}
      else{px+=n3(kx,ky,kz,sd)*amp;pz+=n3(kz,kx,ky,sd+2)*amp;if(!bot)py+=n3(ky,kz,kx,sd+1)*amp*0.6;}}
    return [px,py,pz];};
  const face=(A,B,C,fixed,nrm)=>{ // A,B — оси сетки (массивы координат), C — фиксированная ось
    const nu=A.arr.length,nv=B.arr.length,G=[];for(let i=0;i<nu;i++){G.push([]);for(let j=0;j<nv;j++){const c=[0,0,0];c[A.ax]=A.arr[i];c[B.ax]=B.arr[j];c[C]=fixed;G[i].push(mp(c[0],c[1],c[2]));}}
    for(let i=0;i<nu-1;i++)for(let j=0;j<nv-1;j++){const a=G[i][j],b2=G[i+1][j],c=G[i+1][j+1],e=G[i][j+1];const alt=h3(i*1.3+fixed,j*0.7,C+sd)>0.5;
      const tris=alt?[[a,b2,c],[a,c,e]]:[[a,b2,e],[b2,c,e]];
      for(const t of tris){const ux=t[1][0]-t[0][0],uy=t[1][1]-t[0][1],uz=t[1][2]-t[0][2],vx=t[2][0]-t[0][0],vy=t[2][1]-t[0][1],vz=t[2][2]-t[0][2];
        const cx=uy*vz-uz*vy,cy=uz*vx-ux*vz,cz=ux*vy-uy*vx;if(cx*cx+cy*cy+cz*cz<1e-16)continue;const ok=cx*nrm[0]+cy*nrm[1]+cz*nrm[2]>=0;
        if(ok)P.push(...t[0],...t[1],...t[2]);else P.push(...t[0],...t[2],...t[1]);}}};
  face({ax:0,arr:X},{ax:2,arr:Z},1,hy,[0,1,0]);face({ax:0,arr:X},{ax:2,arr:Z},1,-hy,[0,-1,0]);
  face({ax:1,arr:Y},{ax:2,arr:Z},0,hx,[1,0,0]);face({ax:1,arr:Y},{ax:2,arr:Z},0,-hx,[-1,0,0]);
  face({ax:0,arr:X},{ax:1,arr:Y},2,hz,[0,0,1]);face({ax:0,arr:X},{ax:1,arr:Y},2,-hz,[0,0,-1]);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.computeVertexNormals();g.computeBoundingBox();g.computeBoundingSphere();return g;}
// ---------- сборщик кит-объекта: части с палитрой, шумом и тоном по вершинам ----------
const K_E=new THREE.Euler(),K_Q=new THREE.Quaternion();
function tm(x,y,z,rx,ry,rz,sx,sy,sz){K_E.set(rx||0,ry||0,rz||0);K_Q.setFromEuler(K_E);const s=sx==null?1:sx;return new THREE.Matrix4().compose(new V3(x||0,y||0,z||0),K_Q,new V3(s,sy==null?s:sy,sz==null?s:sz));}
class KGeo{constructor(H,seed){this.P=[];this.C=[];this.H=H||1;this.sd=seed||0;}
  // g — геометрия части, pal — цвет палитры (или hex), m — матрица, o: noise (шум, м), s (сдвиг тона), kN (свет сверху), kG (градиент по высоте), kJ (разброс граней), flat (без шума по y у верха)
  add(g,pal,m,o){o=o||{};const pos=g.attributes.position,idx=g.index,n=idx?idx.count:pos.count,v=[new V3(),new V3(),new V3()],e1=new V3(),e2=new V3(),nn=new V3(),col=new THREE.Color();
    const amp=o.noise||0,sd=this.sd+(o.seed||0),kN=o.kN!=null?o.kN:0.45,kG=o.kG!=null?o.kG:0.3,kJ=o.kJ!=null?o.kJ:0.2,base=o.s||0,H=this.H,flip=m&&m.determinant()<0;
    let top=-1e9;if(o.flat&&amp){for(let j=0;j<pos.count;j++)top=Math.max(top,pos.getY(j));}
    for(let i=0;i+2<n;i+=3){for(let k=0;k<3;k++){const j=idx?idx.getX(i+k):i+k;const vk=v[flip&&k?3-k:k];vk.fromBufferAttribute(pos,j);const lt=o.flat&&vk.y>top-1e-4;if(m)vk.applyMatrix4(m);
        if(amp){const x=q4(vk.x),y=q4(vk.y),z=q4(vk.z);vk.x+=n3(x,y,z,sd)*amp;if(!lt)vk.y+=n3(y,z,x,sd+1)*amp*0.7;vk.z+=n3(z,x,y,sd+2)*amp;}}
      e1.subVectors(v[1],v[0]);e2.subVectors(v[2],v[0]);nn.crossVectors(e1,e2);const L=nn.length();if(L<1e-12)continue;nn.divideScalar(L);
      const cx=(v[0].x+v[1].x+v[2].x)/3,cy=(v[0].y+v[1].y+v[2].y)/3,cz=(v[0].z+v[1].z+v[2].z)/3;
      const s=base+nn.y*kN+(cy/H-0.5)*kG+(h3(Math.round(cx*40),Math.round(cy*40),Math.round(cz*40)+sd)-0.5)*2*kJ;
      if(o.col)col.copy(o.col);else ktone(pal,Math.max(-1,Math.min(1,s)),col);
      for(let k=0;k<3;k++){this.P.push(v[k].x,v[k].y,v[k].z);this.C.push(col.r,col.g,col.b);}}
    return this;}
  box(w,h,d,pal,m,o){o=o||{};return this.add(sBoxGeo(w,h,d,{b:o.b!=null?o.b:Math.min(w,h,d)*0.14,cell:o.cell,amp:o.amp,seed:this.sd+(o.seed||0)}),pal,m,o);}
  build(){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(this.P,3));g.setAttribute('color',new THREE.Float32BufferAttribute(this.C,3));
    g.computeVertexNormals();g.computeBoundingBox();g.computeBoundingSphere();return g;}}
// примитивы без ограничителя сегментов (он в fin_early — для прототипа)
const KP={cyl:(rt,rb,h,s)=>new FIN.orig.Cylinder(rt,rb,h,s||7,1),cone:(r,h,s)=>new FIN.orig.Cone(r,h,s||7,1),ico:(r,d)=>new FIN.orig.Icosa(r,d||0),dod:r=>new FIN.orig.Dodeca(r,0),
  sph:(r,w,h)=>new FIN.orig.Sphere(r,w||7,h||5),tor:(r,t,rs,ts,arc)=>new FIN.orig.Torus(r,t,rs||4,ts||10,arc),
  // лейка: профиль [[r,y]…] вращается вокруг оси Y
  lathe:(pts,s)=>new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p[0],p[1])),s||8),
  // цилиндр с фаской сверху и снизу
  bcyl:(r,h,b,s)=>{b=Math.min(b,r*0.4,h*0.3);return new THREE.LatheGeometry([[0,-h/2],[r-b,-h/2],[r,-h/2+b],[r,h/2-b],[r-b,h/2],[0,h/2]].map(p=>new THREE.Vector2(p[0],p[1])),s||8);},
  tri:(a,b,c)=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([...a,...b,...c],3));return g;}};
// ---------- материалы кита: цвет в вершинах, ветер, свечение ----------
FIN.fxHook.wind=(sh,m)=>{sh.uniforms.uTime=FIN.U.time;sh.uniforms.uWindK={value:m.userData.wind||0.02};sh.uniforms.uGust=FIN.U.wind;
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nuniform float uTime;\nuniform float uWindK;\nuniform float uGust;').replace('#include <begin_vertex>',
  '#include <begin_vertex>\n#ifdef USE_INSTANCING\n\tvec2 wPh = instanceMatrix[3].xz;\n#else\n\tvec2 wPh = modelMatrix[3].xz;\n#endif\n\tfloat wH = max( 0.0, transformed.y );\n\tfloat wS = sin( uTime * 1.6 + wPh.x * 0.31 + wPh.y * 0.23 ) + 0.4 * sin( uTime * 3.1 + wPh.x * 0.9 + wPh.y * 0.7 );\n\ttransformed.x += wS * wH * wH * uWindK * uGust;\n\ttransformed.z += wS * 0.55 * wH * wH * uWindK * uGust;');};
FIN.fxHook.glow=(sh,m)=>{sh.uniforms.uGlowK={value:m.userData.glow||0.85};sh.uniforms.uTime=FIN.U.time;
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uGlowK;\nuniform float uTime;').replace('vec3 totalEmissiveRadiance = emissive;','vec3 totalEmissiveRadiance = emissive + vColor * uGlowK * ( 0.85 + 0.15 * sin( uTime * 2.3 + vViewPosition.x * 0.7 ) );');};
const KMAT={vc:new THREE.MeshLambertMaterial({vertexColors:true}),vcD:new THREE.MeshLambertMaterial({vertexColors:true,side:THREE.DoubleSide}),
  wind:new THREE.MeshLambertMaterial({vertexColors:true}),windD:new THREE.MeshLambertMaterial({vertexColors:true,side:THREE.DoubleSide}),
  windM:new THREE.MeshLambertMaterial({vertexColors:true,side:THREE.DoubleSide}),glow:new THREE.MeshLambertMaterial({vertexColors:true})};
KMAT.wind.userData.fx='wind';KMAT.wind.userData.wind=0.006;KMAT.windD.userData.fx='wind';KMAT.windD.userData.wind=0.35;KMAT.windM.userData.fx='wind';KMAT.windM.userData.wind=0.05;KMAT.glow.userData.fx='glow';
Object.values(KMAT).forEach(m=>{m.userData.shared=true;m.userData.kit=true;});FIN.KMAT=KMAT;
