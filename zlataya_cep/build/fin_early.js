/* ============================== РЕЛИЗ · LOW-POLY: грани вместо гладкости ============================== */
// Общий объект релизной сборки: настройки, состояние меню, музыка, сохранения
const FIN={ver:'final06',set:{mus:0.7,sfx:0.8,vox:1,subs:true,ts:1,shake:true,flash:true,shakeK:null,flashK:null,caps:false,rumble:true,quality:'high',photo:true},menu:null,title:null};
try{const s=JSON.parse(localStorage.getItem('zlatayaCep.settings.v1')||'null');if(s)Object.assign(FIN.set,s);}catch(e){}
// тряска и вспышки — три ступени 1 / 0,5 / 0 (раньше вкл/слабая и вкл/выкл: старые настройки переводятся)
if(FIN.set.shakeK==null)FIN.set.shakeK=FIN.set.shake===false?0.5:1;if(FIN.set.flashK==null)FIN.set.flashK=FIN.set.flash===false?0:1;
// Материалы «Ламберта» рисуются с плоским затенением: каждая грань — своим тоном, без бликов
// final03: тон по вершинам — атрибут aShade (vec3) прибавляется к цвету материала: +0.1 светлее, −0.2 темнее, по каналам — теплее/холоднее.
// У геометрии без атрибута он равен нулю, поэтому материалы игровых объектов (перекрашивание, прозрачность, свечение) работают как раньше.
{const Phong=THREE.MeshPhongMaterial;
 const VS=s=>s.replace('#include <common>','#include <common>\nattribute vec3 aShade;\nvarying vec3 vShade;').replace('#include <begin_vertex>','#include <begin_vertex>\n\tvShade = aShade;');
 const FS=s=>s.replace('#include <common>','#include <common>\nvarying vec3 vShade;').replace('vec4 diffuseColor = vec4( diffuse, opacity );','vec4 diffuseColor = vec4( diffuse * max( vec3( 0.0 ), vec3( 1.0 ) + vShade ), opacity );');
 class LowPolyMat extends Phong{constructor(p){super(Object.assign({specular:0x000000,shininess:0,flatShading:true},p||{}));this.defaultAttributeValues={aShade:[0,0,0]};}
   onBeforeCompile(sh){sh.vertexShader=VS(sh.vertexShader);sh.fragmentShader=FS(sh.fragmentShader);const k=this.userData.fx;if(k&&FIN.fxHook&&FIN.fxHook[k])FIN.fxHook[k](sh,this);
     if(FIN.occHook&&!this.userData.noOcc&&!this.skinning)FIN.occHook(sh,this,false);}   // final04: вырез перед героями и затухание у камеры (late_88)
   customProgramCacheKey(){return 'lp'+(this.userData.fx||'')+(this.userData.noOcc||this.skinning?'':'o');}}
 THREE.MeshLambertMaterial=LowPolyMat;FIN.LowPolyMat=LowPolyMat;FIN.fxHook={};FIN.U={time:{value:0},wind:{value:1}};}
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
