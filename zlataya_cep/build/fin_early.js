/* ============================== РЕЛИЗ · LOW-POLY: грани вместо гладкости ============================== */
// Общий объект релизной сборки: настройки, состояние меню, музыка, сохранения
const FIN={ver:'final02',set:{mus:0.7,sfx:0.8,subs:true,ts:1,shake:true,flash:true,quality:'high',photo:true},menu:null,title:null};
try{const s=JSON.parse(localStorage.getItem('zlatayaCep.settings.v1')||'null');if(s)Object.assign(FIN.set,s);}catch(e){}
// Материалы «Ламберта» рисуются с плоским затенением: каждая грань — своим тоном, без бликов
{const Phong=THREE.MeshPhongMaterial;
 class LowPolyMat extends Phong{constructor(p){super(Object.assign({specular:0x000000,shininess:0,flatShading:true},p||{}));}}
 THREE.MeshLambertMaterial=LowPolyMat;}
// Сегменты круглых форм ограничены: шары, цилиндры, конусы и кольца — гранёные, как у вырезанной из дерева игрушки
{const cap=(v,d,lo,hi)=>Math.max(lo,Math.min(v===undefined||v===null?d:v,hi));
 const rad=r=>r<0.6?8:r<2.2?12:16;
 const Sp=THREE.SphereGeometry;class LPSphere extends Sp{constructor(r=1,w,h,...a){super(r,cap(w,32,5,r<0.5?8:r<2?10:12),cap(h,16,4,r<0.5?6:r<2?7:9),...a);}}
 const Cy=THREE.CylinderGeometry;class LPCyl extends Cy{constructor(rt=1,rb=1,h=1,rs,...a){super(rt,rb,h,cap(rs,8,3,rad(Math.max(rt,rb))),...a);}}
 const Co=THREE.ConeGeometry;class LPCone extends Co{constructor(r=1,h=1,rs,...a){super(r,h,cap(rs,8,3,rad(r)),...a);}}
 const To=THREE.TorusGeometry;class LPTorus extends To{constructor(r=1,t=0.4,rs,ts,arc){super(r,t,cap(rs,8,3,6),cap(ts,6,3,r<1.2?16:24),arc);}}
 const Ci=THREE.CircleGeometry;class LPCircle extends Ci{constructor(r=1,seg,...a){super(r,cap(seg,8,3,r<3?12:18),...a);}}
 // камни и угли — неровные: вершины додекаэдров и икосаэдров чуть сдвинуты (одинаковые вершины двигаются вместе)
 const jitter=(g,k)=>{const p=g.attributes.position,m=new Map();
   for(let i=0;i<p.count;i++){const key=Math.round(p.getX(i)*1e3)+','+Math.round(p.getY(i)*1e3)+','+Math.round(p.getZ(i)*1e3);let f=m.get(key);
     if(!f){f=[1+(Math.random()-0.5)*k,1+(Math.random()-0.5)*k*0.8,1+(Math.random()-0.5)*k];m.set(key,f);}p.setXYZ(i,p.getX(i)*f[0],p.getY(i)*f[1],p.getZ(i)*f[2]);}
   p.needsUpdate=true;g.computeVertexNormals();g.computeBoundingSphere();return g;};
 const Do=THREE.DodecahedronGeometry;class LPDod extends Do{constructor(r=1,d=0){super(r,d);if(!d)jitter(this,0.3);}}
 const Ic=THREE.IcosahedronGeometry;class LPIco extends Ic{constructor(r=1,d=0){super(r,d);if(!d)jitter(this,0.26);}}
 THREE.SphereGeometry=THREE.SphereBufferGeometry=LPSphere;THREE.CylinderGeometry=THREE.CylinderBufferGeometry=LPCyl;THREE.ConeGeometry=THREE.ConeBufferGeometry=LPCone;
 THREE.TorusGeometry=THREE.TorusBufferGeometry=LPTorus;THREE.CircleGeometry=THREE.CircleBufferGeometry=LPCircle;
 THREE.DodecahedronGeometry=THREE.DodecahedronBufferGeometry=LPDod;THREE.IcosahedronGeometry=THREE.IcosahedronBufferGeometry=LPIco;
 FIN.jitter=jitter;FIN.orig={Sphere:Sp,Cylinder:Cy,Cone:Co,Torus:To,Circle:Ci,Dodeca:Do,Icosa:Ic};}
