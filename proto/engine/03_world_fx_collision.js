/* ============================== МИР ============================== */
const G={state:'menu',time:0,levelIdx:0,hitstop:0,split:0,splitTarget:0,cine:null,trans:null,playTime:0,subs:true,skipT:0,links:0,
  nutsGot:{},ui:null,uiTick:null,forgedLinks:0,forgedW:{1:0,2:0,3:0,4:0,5:0},zbest:{},gems:{},gemsSpent:0,nutsSpent:0,nutsHub:0,trips:0,garden:null,hen:null,owned:{},secrets:{},tales:{},stats:{parries:0,mahs:0,shields:0,finishers:0,sparks:0,swaps:0,falls:0,clings:0,carries:0,skips:0,dodges:0,revives:0,seven:0,bogatyr:0,glue:0},flags:{},got:{},done:{},slowFoes:0};
let W=null;G.solo=false;G.soloPi=0;
// ушедший уровень отдаёт видеопамять: геометрии (буферы) и текстуры. Материалы не трогаем — общие материалы кита живут между
// уровнями, а их dispose выбросил бы шейдерные программы (повторная компиляция при входе). Общая геометрия или текстура, которой
// пользуется следующий уровень, просто загрузится заново.
function disposeTree(root){const seen=new Set();
  const tex=v=>{if(v&&v.isTexture&&!seen.has(v)){seen.add(v);v.dispose();}};
  root.traverse(o=>{if(o.geometry&&!seen.has(o.geometry)){seen.add(o.geometry);o.geometry.dispose();}
    if(o.isInstancedMesh&&o.dispose)o.dispose();
    for(const m of[].concat(o.material||[])){for(const k in m)tex(m[k]);if(m.uniforms)for(const u in m.uniforms)tex(m.uniforms[u]&&m.uniforms[u].value);}});}
function newWorld(){
  if(W&&W.onLeave)W.onLeave();G.ui=null;G.uiTick=null;
  if(W&&W.group){scene.remove(W.group);disposeTree(W.group);}
  W={group:new THREE.Group(),boxes:[],cyls:[],enemies:[],plates:[],gates:[],bells:[],hittables:[],marks:[],waterTargets:[],updates:[],camZones:[],tipZones:[],prompts:[],
     objectives:[[],[]],decor:[],needles:[],noCarry:[],camYaw:0,camX:8,clampR:null,name:'',sub:'',spawns:null,startAct:[0,0],fx:[],shots:[],sparks:[],timers:[],anims:[],debris:[],
     forceSplit:false,zven:null,zvenGoal:null,zvenFree:false,bolts:[],stakes:[],pawStones:[],hummocks:[],movers:[],stumps:[],rzt:null,threads:[],returning:[],webs:[],webMeshes:null,glueHints:null,items:[],links:0,nuts:0,linkTotal:0,nutTotal:0,
     abil:{clew:false,roll:false,toss:false,owl:false,gusli:false,pero:false,kleshi:false},waters:[],chests:[],surfs:[],lifts:[],world:0,lights:[],tiles:[],clouds:[],flocks:[],geese:[],trees:[],hots:[],sockets:[],forges:[],grabs:[],lavas:[],crusts:[],vents:[],pickRing:null,signs:[],likhos:[],flocks5:[],covers:[],baits:[],feat5:false,tong5:false,threadLife:10,sagY:-0.55,gaze:false,owlT:0,levelId:'',fades:[],fadeMeshes:[],fadeOwner:new Map(),flags:{},firstUnravel:false,sunOff:new V3(14,24,10),onStart:null};
  scene.add(W.group);}
function setTheme(t){
  if(t==='evening'){scene.background=new THREE.Color(0x232b4c);scene.fog=new THREE.Fog(0x232b4c,22,80);amb.color.set(0x9aa8dc);amb.intensity=0.6;sun.color.set(0xcfd9ff);sun.intensity=0.62;W.grass=M(0x55804f);W.sunOff=new V3(-12,26,10);}
  else if(t==='forest'){scene.background=new THREE.Color(0x3a5a5a);scene.fog=new THREE.Fog(0x3a5a5a,18,64);amb.color.set(0xb4c8d8);amb.intensity=0.64;sun.color.set(0xe0e8ff);sun.intensity=0.8;W.grass=M(0x5c8a4c);W.sunOff=new V3(10,24,8);}
  else if(t==='swamp'){scene.background=new THREE.Color(0x3a4a3c);scene.fog=new THREE.Fog(0x3a4a3c,14,55);amb.color.set(0xb0c0a0);amb.intensity=0.62;sun.color.set(0xd8e0c0);sun.intensity=0.7;W.grass=M(0x5a6a3a);W.sunOff=new V3(-10,24,8);}
  else if(t==='dark'){scene.background=new THREE.Color(0x1e3038);scene.fog=new THREE.Fog(0x1e3038,14,52);amb.color.set(0x8aa4bc);amb.intensity=0.58;sun.color.set(0xb8c8e8);sun.intensity=0.6;W.grass=M(0x3f6a3f);W.sunOff=new V3(10,24,8);}
  else if(t==='barn'){scene.background=new THREE.Color(0x2a2018);scene.fog=new THREE.Fog(0x2a2018,20,70);amb.color.set(0xd8c0a0);amb.intensity=0.6;sun.color.set(0xffd8a0);sun.intensity=0.55;W.grass=M(0x8a7050);W.sunOff=new V3(6,30,10);}
  else if(t==='kitezh'){scene.background=new THREE.Color(0x0e4654);scene.fog=new THREE.Fog(0x0e4654,16,72);amb.color.set(0xa8e4e8);amb.intensity=0.68;sun.color.set(0xfff0c8);sun.intensity=0.72;W.grass=M(0x7a9a86);W.sunOff=new V3(4,26,6);}
  else if(t==='sea'){scene.background=new THREE.Color(0x8fd0f0);scene.fog=new THREE.Fog(0x8fd0f0,40,150);amb.color.set(0xe8f4ff);amb.intensity=0.66;sun.color.set(0xfff4dc);sun.intensity=0.9;W.grass=M(0x7ab060);W.sunOff=new V3(-12,24,10);}
  else if(t==='belly'){scene.background=new THREE.Color(0x2a0e14);scene.fog=new THREE.Fog(0x2a0e14,12,50);amb.color.set(0xe8b0b0);amb.intensity=0.66;sun.color.set(0xffc8a8);sun.intensity=0.55;W.grass=M(0x8a3a44);W.sunOff=new V3(6,26,8);}
  else if(t==='whirl'){scene.background=new THREE.Color(0x355a5c);scene.fog=new THREE.Fog(0x355a5c,22,80);amb.color.set(0xc0e0d8);amb.intensity=0.64;sun.color.set(0xfff0d0);sun.intensity=0.78;W.grass=M(0x5a7a5a);W.sunOff=new V3(-10,24,8);}
  else if(t==='heaven'){scene.background=new THREE.Color(0x3a3470);scene.fog=new THREE.Fog(0x3a3470,26,100);amb.color.set(0xb8b0ec);amb.intensity=0.52;sun.color.set(0xd8c8ff);sun.intensity=0.5;W.grass=M(0xe0dcf4);W.sunOff=new V3(-10,26,8);}
  else if(t==='skynight'){scene.background=new THREE.Color(0x141838);scene.fog=new THREE.Fog(0x141838,30,120);amb.color.set(0x8890d0);amb.intensity=0.5;sun.color.set(0xa8b8ff);sun.intensity=0.42;W.grass=M(0xc8c8e8);W.sunOff=new V3(10,26,6);}
  else if(t==='smorodina'){scene.background=new THREE.Color(0x3a1a18);scene.fog=new THREE.Fog(0x3a1a18,22,85);amb.color.set(0xf0b098);amb.intensity=0.56;sun.color.set(0xffb070);sun.intensity=0.7;W.grass=M(0x5a4a44);W.sunOff=new V3(-8,24,10);}
  else if(t==='forgein'){scene.background=new THREE.Color(0x24100c);scene.fog=new THREE.Fog(0x24100c,16,60);amb.color.set(0xf0a080);amb.intensity=0.5;sun.color.set(0xff9a50);sun.intensity=0.55;W.grass=M(0x4a3a34);W.sunOff=new V3(6,26,6);}
  else if(t==='valy'){scene.background=new THREE.Color(0x5a4038);scene.fog=new THREE.Fog(0x5a4038,30,110);amb.color.set(0xf8d0b8);amb.intensity=0.6;sun.color.set(0xffc890);sun.intensity=0.8;W.grass=M(0x6a5a44);W.sunOff=new V3(-12,24,10);}
  else if(t==='buyan'){scene.background=new THREE.Color(0xa8d0e0);scene.fog=new THREE.Fog(0xa8d0e0,40,150);amb.color.set(0xfff4e0);amb.intensity=0.64;sun.color.set(0xfff0c8);sun.intensity=0.85;W.grass=M(0x7a9a58);W.sunOff=new V3(-12,24,10);}
  else if(t==='egg'){scene.background=new THREE.Color(0x3a2408);scene.fog=new THREE.Fog(0x3a2408,22,80);amb.color.set(0xffe0a0);amb.intensity=0.64;sun.color.set(0xffd070);sun.intensity=0.62;W.grass=M(0xc89a3a);W.sunOff=new V3(4,26,6);}
  else if(t==='terem'){scene.background=new THREE.Color(0x0c0a12);scene.fog=new THREE.Fog(0x0c0a12,18,64);amb.color.set(0xb8a8c8);amb.intensity=0.52;sun.color.set(0xffd890);sun.intensity=0.52;W.grass=M(0x201a26);W.sunOff=new V3(6,26,8);}
  else if(t==='dawn'){scene.background=new THREE.Color(0xf0b8a8);scene.fog=new THREE.Fog(0xf0b8a8,40,150);amb.color.set(0xffe4e0);amb.intensity=0.64;sun.color.set(0xffc8a0);sun.intensity=0.82;W.grass=M(0x6a8a58);W.sunOff=new V3(-16,14,6);}
  else if(t==='skyday'){scene.background=new THREE.Color(0x9ac8f0);scene.fog=new THREE.Fog(0x9ac8f0,40,150);amb.color.set(0xf0f0ff);amb.intensity=0.66;sun.color.set(0xfff0d0);sun.intensity=0.9;W.grass=M(0xf4f2ff);W.sunOff=new V3(-12,24,10);}
  else{scene.background=new THREE.Color(0xf0a878);scene.fog=new THREE.Fog(0xf0a878,45,150);amb.color.set(0xffe4d0);amb.intensity=0.64;sun.color.set(0xffc893);sun.intensity=0.86;W.grass=MAT.grass;W.sunOff=new V3(-14,18,8);}
  const ab=new THREE.Mesh(new THREE.PlaneGeometry(700,700),MB(t==='evening'?0x151c30:t==='kitezh'?0x08303a:t==='belly'?0x1a0608:t==='sea'?0x3a90c0:t==='heaven'?0x4a4488:t==='skynight'?0x20244a:t==='skyday'?0xc8d8f4:t==='buyan'?0x3a7fa8:t==='egg'?0x2a1804:t==='terem'?0x060408:t==='dawn'?0x5a7aa0:t==='smorodina'||t==='forgein'?0x5a1408:t==='valy'?0x3a2418:0x2f6a90));ab.rotation.x=-Math.PI/2;ab.position.y=-12;W.group.add(ab);}
function sky(t){
  if(t==='evening'){const moon=new THREE.Mesh(new THREE.CircleGeometry(7,32),MB(0xfff3cf,{fog:false}));moon.position.set(-38,46,-160);moon.lookAt(0,0,0);W.group.add(moon);
    const halo=new THREE.Mesh(new THREE.CircleGeometry(13,32),MB(0xfff3cf,{fog:false,transparent:true,opacity:0.1,depthWrite:false}));halo.position.set(-37.9,45.9,-159.5);halo.lookAt(0,0,0);W.group.add(halo);
    const n=460,pos=new Float32Array(n*3);for(let i=0;i<n;i++){const a=rand(0,Math.PI*2),e=rand(0.1,1.3),r=210;pos[i*3]=Math.cos(a)*Math.cos(e)*r;pos[i*3+1]=Math.sin(e)*r;pos[i*3+2]=Math.sin(a)*Math.cos(e)*r-40;}
    const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.BufferAttribute(pos,3));W.group.add(new THREE.Points(gg,new THREE.PointsMaterial({color:0xfff8e0,size:2,sizeAttenuation:false,fog:false})));}
  else{const s=new THREE.Mesh(new THREE.CircleGeometry(11,32),MB(0xfff0b8,{fog:false}));s.position.set(-50,12,-210);s.lookAt(0,0,0);W.group.add(s);
    const h=new THREE.Mesh(new THREE.CircleGeometry(22,32),MB(0xffd9a0,{fog:false,transparent:true,opacity:0.22,depthWrite:false}));h.position.set(-49.7,12,-209);h.lookAt(0,0,0);W.group.add(h);}}
function colBox(minx,maxx,miny,maxy,minz,maxz,occ){const c={minx,maxx,miny,maxy,minz,maxz,on:true,occ:!!occ};W.boxes.push(c);return c;}
function box(minx,maxx,miny,maxy,minz,maxz,mat,o){o=o||{};const m=addMesh(new THREE.BoxGeometry(maxx-minx,maxy-miny,maxz-minz),mat,(minx+maxx)/2,(miny+maxy)/2,(minz+maxz)/2);
  let c=null;if(o.solid!==false)c=colBox(minx,maxx,miny,maxy,minz,maxz,o.occ!==undefined?o.occ:(maxy-miny>=2&&maxy>1.6));if(c)c.mesh=m;return {mesh:m,col:c};}
function ground(minx,maxx,minz,maxz,top,topMat,sideMat){top=top||0;
  addMesh(new THREE.BoxGeometry(maxx-minx,3.75,maxz-minz),sideMat||MAT.dirt,(minx+maxx)/2,top-2.125,(minz+maxz)/2);
  addMesh(new THREE.BoxGeometry(maxx-minx,0.25,maxz-minz),topMat||W.grass,(minx+maxx)/2,top-0.125,(minz+maxz)/2);
  return colBox(minx,maxx,top-4,top,minz,maxz,false);}
function branch(minx,maxx,minz,maxz,top){top=top||0;const w=maxx-minx,l=maxz-minz,cx=(minx+maxx)/2,cz=(minz+maxz)/2; // ветка: плоский настил сверху, круглый ствол снизу
  addMesh(new THREE.BoxGeometry(w,0.5,l),MAT.bark,cx,top-0.3,cz);addMesh(new THREE.BoxGeometry(w-0.12,0.1,l-0.06),MAT.moss,cx,top-0.05,cz);
  const alongZ=l>=w,r=Math.min(w,l)*0.42,cg=new THREE.CylinderGeometry(r,r*1.06,alongZ?l:w,12);if(alongZ)cg.rotateX(Math.PI/2);else cg.rotateZ(Math.PI/2);addMesh(cg,MAT.bark,cx,top-0.4-r*0.6,cz);
  return colBox(minx,maxx,top-1.2,top,minz,maxz,false);}
function wall(minx,maxx,minz,maxz){return colBox(minx,maxx,-12,9,minz,maxz,false);}
function decorFir(x,z,s,dark,y){W.decor.push({x,z,s,dark,y:y||0});}
function needle(x,y,z,ry,s){W.needles.push({x,y,z,ry,s:s||1});}
function edgeTrees(minz,maxz,xl,xr,skip){
  for(let z=maxz;z>minz;z-=rand(1.5,2.4)){if(skip&&skip(z))continue;
   decorFir(xl-rand(0.7,2.2),z,rand(0.9,1.9),true);decorFir(xr+rand(0.7,2.2),z+rand(-0.6,0.6),rand(0.9,1.9),true);
   if(Math.random()<0.8){decorFir(xl-rand(3.5,9),z+rand(-1,1),rand(1.3,2.6),true);decorFir(xr+rand(3.5,9),z+rand(-1,1),rand(1.3,2.6),true);}}}
function flushDecor(){const L=W.decor,m=new THREE.Matrix4(),q=new THREE.Quaternion(),col=new THREE.Color();
  if(L.length){const n=L.length,leafM=M(0xffffff);const tr=new THREE.InstancedMesh(GEO.trunk,MAT.trunk,n),c1=new THREE.InstancedMesh(GEO.cone1,leafM,n),c2=new THREE.InstancedMesh(GEO.cone2,leafM,n);
    L.forEach((d,i)=>{const s=new V3(d.s,d.s,d.s);m.compose(new V3(d.x,d.y+0.6*d.s,d.z),q,s);tr.setMatrixAt(i,m);m.compose(new V3(d.x,d.y+2.0*d.s,d.z),q,s);c1.setMatrixAt(i,m);
     m.compose(new V3(d.x,d.y+3.1*d.s,d.z),q,s);c2.setMatrixAt(i,m);col.setHSL(0.38+rand(-0.03,0.03),0.36+rand(-0.1,0.1),(d.dark?0.17:0.28)+rand(-0.04,0.04));c1.setColorAt(i,col);c2.setColorAt(i,col);});
    [tr,c1,c2].forEach(x=>{x.castShadow=true;x.receiveShadow=false;W.group.add(x);});}
  if(W.needles.length){const n=W.needles.length,nm=new THREE.InstancedMesh(GEO.needle,M(0xffffff),n);const e=new THREE.Euler();
    W.needles.forEach((d,i)=>{e.set(0,d.ry,Math.PI/2+rand(-0.3,0.3));q.setFromEuler(e);m.compose(new V3(d.x,d.y,d.z),q,new V3(d.s,d.s*rand(0.8,1.2),d.s));nm.setMatrixAt(i,m);
      col.setHSL(0.36+rand(-0.03,0.03),0.4,0.2+rand(-0.04,0.05));nm.setColorAt(i,col);});nm.castShadow=true;W.group.add(nm);}}
function lantern(x,z,y){const g=new THREE.Group();g.position.set(x,y||0,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.05,0.07,1.3,6),M(0x3a2614),0,0.65,0,g);
  const lm=M(0xffe0a0,{emissive:0xffb040,emissiveIntensity:1.2});addMesh(new THREE.SphereGeometry(0.16,10,8),lm,0,1.42,0,g).castShadow=false;addMesh(new THREE.ConeGeometry(0.2,0.16,8),M(0x3a2614),0,1.62,0,g);return g;}
function bell(x,z,y){ // колокольчик-закладка: столб + конус-колокол
  y=y||0;const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const post=M(0x6b4a2b),bm=M(0xb89a50,{emissive:0xffc040,emissiveIntensity:0});
  addMesh(new THREE.CylinderGeometry(0.08,0.1,2.2,8),post,0,1.1,0,g);const bar=addMesh(new THREE.BoxGeometry(0.8,0.1,0.1),post,0.3,2.2,0,g);bar.castShadow=false;
  const piv=new THREE.Group();piv.position.set(0.55,2.15,0);g.add(piv);addMesh(new THREE.ConeGeometry(0.3,0.5,12),bm,0,-0.28,0,piv);addMesh(new THREE.SphereGeometry(0.08,8,6),bm,0,-0.55,0,piv);
  const b={x,y,z,g,piv,bm,act:[false,false],swing:0};W.bells.push(b);return b;}
/* Жёлтая плита «своя»: кольца на торце; над ней рисунок того, кто может встать (лапка — любой) */
function pawIcon(){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.CircleGeometry(0.42,24),MB(0x1a2230,{transparent:true,opacity:0.72})));
  const wm=MB(0xfff4d0);const pad=new THREE.Mesh(new THREE.CircleGeometry(0.15,20),wm);pad.scale.set(1.15,0.95,1);pad.position.set(0,-0.08,0.01);g.add(pad);
  for(const[x,y]of[[-0.17,0.08],[-0.06,0.18],[0.06,0.18],[0.17,0.08]]){const t=new THREE.Mesh(new THREE.CircleGeometry(0.058,14),wm);t.position.set(x,y,0.01);g.add(t);}
  g.add(new THREE.Mesh(new THREE.TorusGeometry(0.43,0.035,6,28),MB(COL.yellow)));return g;}
function plate(x,z,link,y){y=y||0;
  const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const mat=M(COL.yellow,{emissive:COL.yellow,emissiveIntensity:0});
  const base=addMesh(new THREE.CylinderGeometry(0.95,1.0,0.14,26),mat,0,0.07,0,g);const rm=M(0x9a6c00);for(const R of[0.62,0.32]){const t=addMesh(new THREE.TorusGeometry(R,0.05,6,28),rm,0,0.15,0,g);t.rotation.x=Math.PI/2;}
  const icon=pawIcon();icon.position.set(0,2.2,0);g.add(icon);
  const p={x,y,z,link,r:1.0,pressed:false,g,base,mat,icon};W.plates.push(p);return p;}
function makeGate(minx,maxx,z,type,link,o){o=o||{};
  const colr={own:COL.yellow,thread:0x3a1a34}[type];const H=o.h||2.6;
  const g=new THREE.Group();W.group.add(g);const mat=M(colr,{emissive:colr,emissiveIntensity:0});
  addMesh(new THREE.BoxGeometry(maxx-minx,H,0.5),mat,(minx+maxx)/2,H/2,z,g);
  const n=Math.max(1,Math.round((maxx-minx)/2.6));
  for(let i=0;i<n;i++){const x=minx+(i+0.5)*(maxx-minx)/n,y=H*0.55;
    if(type==='own'){const m=M(0x9a6c00);for(const R of[0.5,0.25])addMesh(new THREE.TorusGeometry(R,0.06,6,24),m,x,y,z+0.27,g);}
    else{const m=M(i%2?0x8a3a74:0x5a2a6a);for(let j=0;j<5;j++){const t=addMesh(new THREE.TorusGeometry(rand(0.35,0.7),0.05,6,20),m,x+rand(-0.8,0.8),y+rand(-0.6,0.6),z+0.28,g);t.rotation.set(rand(0,3),rand(0,3),0);}}}
  const pm=M(0x4a3020);for(const x of[minx,maxx])addMesh(new THREE.CylinderGeometry(0.18,0.2,H+0.7,8),pm,x,(H+0.7)/2,z);
  const col=colBox(minx,maxx,0,H,z-0.25,z+0.25,false);
  const gate={type,link,g,col,mat,z,minx,maxx,open:false,latched:false,forceOpen:false,depth:-(H+0.15),wasOpen:false,latchIf:o.latchIf||null};W.gates.push(gate);return gate;}
function acornMesh(s){const g=new THREE.Group();const n=new THREE.Mesh(new THREE.SphereGeometry(0.1,10,8),M(0xb0702c));n.scale.set(1,1.25,1);g.add(n);
  const c=new THREE.Mesh(new THREE.SphereGeometry(0.105,10,6,0,Math.PI*2,0,Math.PI/2),M(0x5a3a1a));c.position.y=0.05;g.add(c);
  const st=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,0.07,5),M(0x5a3a1a));st.position.y=0.15;g.add(st);g.scale.setScalar(s||1);return g;}
/* Персонажи и реквизит пролога */
function makeTishka(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const c=M(0xc9783a),cr=M(0xf2dcb8),k=MAT.dark;
  const b=part(body,new THREE.SphereGeometry(0.2,12,10),c,0,0.24,0);b.scale.set(1,1.15,0.95);part(body,new THREE.SphereGeometry(0.13,10,8),cr,0,0.22,0.1).scale.set(1,1.2,0.6);
  const head=new THREE.Group();head.position.set(0,0.5,0.02);body.add(head);part(head,new THREE.SphereGeometry(0.15,12,10),c,0,0,0);part(head,new THREE.SphereGeometry(0.07,8,6),cr,0,-0.03,0.12);
  part(head,new THREE.SphereGeometry(0.025,6,5),k,0,-0.01,0.19);
  for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.028,6,5),k,s*0.065,0.04,0.12);const e=part(head,new THREE.ConeGeometry(0.045,0.13,5),c,s*0.08,0.15,-0.01);e.rotation.z=-s*0.25;}
  const tail=new THREE.Group();tail.position.set(0,0.2,-0.18);body.add(tail);const tm=M(0xb86a30);
  [[0,0,0,0.1],[0,0.14,-0.1,0.13],[0,0.32,-0.12,0.15],[0,0.48,-0.04,0.13],[0,0.56,0.08,0.1]].forEach(([x,y,z,r])=>part(tail,new THREE.SphereGeometry(r,10,8),tm,x,y,z));
  return {g,body,head,tail};}
function makeKot(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const c=M(0x8e8478),dk=M(0x5e554c),cr=M(0xe8dcc8),k=MAT.dark;
  const cap=capsule(0.5,0.5,c);cap.position.y=0.8;cap.scale.set(1,1,0.85);body.add(cap);part(body,new THREE.SphereGeometry(0.34,12,10),cr,0,0.95,0.3).scale.set(1,1.3,0.6);
  for(let i=0;i<3;i++){const t=part(body,new THREE.TorusGeometry(0.47,0.035,6,24),dk,0,0.55+i*0.22,0);t.rotation.x=Math.PI/2;t.scale.set(1,0.85,1);}
  for(const s of[-1,1]){part(body,new THREE.CylinderGeometry(0.1,0.12,0.6,8),c,s*0.2,0.3,0.36);part(body,new THREE.SphereGeometry(0.13,8,6),cr,s*0.2,0.03,0.42);part(body,new THREE.SphereGeometry(0.22,10,8),c,s*0.36,0.2,-0.05);}
  const head=new THREE.Group();head.position.set(0,1.62,0.05);body.add(head);part(head,new THREE.SphereGeometry(0.4,14,12),c,0,0,0).scale.set(1.1,0.95,1);
  part(head,new THREE.SphereGeometry(0.16,10,8),cr,0,-0.1,0.3).scale.set(1.3,0.8,0.8);part(head,new THREE.SphereGeometry(0.045,8,6),M(0xd88a8a),0,-0.03,0.42);
  const lids=[];for(const s of[-1,1]){const e=M(0xc8e060,{emissive:0x9ab830,emissiveIntensity:0.6});part(head,new THREE.SphereGeometry(0.075,10,8),e,s*0.15,0.07,0.33);part(head,new THREE.SphereGeometry(0.035,8,6),k,s*0.15,0.07,0.395);
    const lid=part(head,new THREE.SphereGeometry(0.088,10,8,0,Math.PI*2,0,Math.PI/2),c,s*0.15,0.07,0.33);lid.rotation.x=1.3;lids.push(lid); // верхнее веко
    const ear=part(head,new THREE.ConeGeometry(0.14,0.3,4),c,s*0.24,0.36,-0.02);ear.rotation.z=-s*0.3;
    part(head,new THREE.TorusGeometry(0.1,0.012,6,18),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3}),s*0.15,0.07,0.43); // очки учёного
    for(let j=0;j<3;j++){const w=part(head,new THREE.CylinderGeometry(0.006,0.006,0.4,4),MB(0xf4f0e8),s*0.3,-0.1+j*0.04,0.3);w.rotation.z=Math.PI/2+s*(j-1)*0.15;}}
  const tail=[];for(let i=0;i<7;i++)tail.push(part(body,new THREE.SphereGeometry(0.11-i*0.007,8,6),i%2?dk:c,0,0,0));
  return {g,body,head,lids,tail};}
function makeScooter(){const g=new THREE.Group();W.group.add(g);const parts=[];const w=M(0x9a6a3c),pc=M(0x7a4a22);
  const add=(geo,mat,x,y,z,rz)=>{const m=addMesh(geo,mat,x,y,z,g);if(rz)m.rotation.z=rz;parts.push(m);return m;};
  add(new THREE.BoxGeometry(0.16,0.05,0.8),w,0,0.16,0);const cone=new THREE.ConeGeometry(0.1,0.22,7);add(cone,pc,0,0.1,0.32,Math.PI/2);add(cone,pc,0,0.1,-0.32,Math.PI/2);
  add(new THREE.CylinderGeometry(0.025,0.025,0.8,6),w,0,0.56,0.32);add(new THREE.BoxGeometry(0.45,0.04,0.04),w,0,0.96,0.32);return {g,parts};}
function makeNotebook(){const g=new THREE.Group();W.group.add(g);const cov=M(0x6e3f82),pg=M(0xf4ecd8,{emissive:0xffd070,emissiveIntensity:0});const ink=c=>MB(c);
  addMesh(new THREE.BoxGeometry(0.62,0.03,0.42),cov,0,0.015,0,g);
  const L=addMesh(new THREE.BoxGeometry(0.29,0.02,0.39),pg,-0.155,0.04,0,g);L.rotation.z=0.06;const Rp=addMesh(new THREE.BoxGeometry(0.29,0.02,0.39),pg,0.155,0.04,0,g);Rp.rotation.z=-0.06;
  for(let i=0;i<5;i++)addMesh(new THREE.BoxGeometry(0.2,0.002,0.008),ink(0x8a8aa8),-0.16,0.057+i*0.0006,-0.12+i*0.06,g); // строчки сказки
  // рисунок, который проступит сам: дуб, цепь и сухая рука с перстнем, рвущая цепь
  const pic=new THREE.Group();pic.position.set(0.155,0.056,0);pic.rotation.z=-0.06;g.add(pic);
  const trunk=new THREE.Mesh(new THREE.BoxGeometry(0.026,0.003,0.12),ink(0x6b4a2b));trunk.position.set(0,0,0.07);pic.add(trunk);
  const crown=new THREE.Mesh(new THREE.CircleGeometry(0.075,16),ink(0x4f8a3a));crown.rotation.x=-Math.PI/2;crown.position.set(0,0.002,-0.02);pic.add(crown);
  const chainL=new THREE.Group(),chainR=new THREE.Group();pic.add(chainL,chainR);
  for(let i=0;i<7;i++){const a=Math.PI*0.15+i*0.33;const r=new THREE.Mesh(new THREE.TorusGeometry(0.012,0.004,4,10),ink(0xe0aa20));r.rotation.x=-Math.PI/2;r.position.set(Math.cos(a)*0.088,0.004,-0.02+Math.sin(a)*0.088);(i<3?chainL:chainR).add(r);}
  const hand=new THREE.Group();hand.position.set(-0.02,0.005,0.02);pic.add(hand);const hm=ink(0x9a9a9a);hand.add(new THREE.Mesh(new THREE.BoxGeometry(0.04,0.002,0.032),hm));
  for(let i=0;i<4;i++){const f=new THREE.Mesh(new THREE.BoxGeometry(0.006,0.002,0.045),hm);f.position.set(-0.015+i*0.01,0,-0.035);hand.add(f);}
  const ring=new THREE.Mesh(new THREE.BoxGeometry(0.012,0.003,0.01),ink(0x202020));ring.position.set(0.005,0.001,-0.02);hand.add(ring); // перстень
  const parts={trunk,crown,chainL,chainR,hand};Object.values(parts).forEach(o=>o.scale.setScalar(0.001));
  g.scale.setScalar(1.35);return {g,pg,pic,parts};}
function makeOak(x,z){const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const bark=M(0x6b4a2b),leaf=M(0x4f7a2c);
  addMesh(new THREE.CylinderGeometry(1.25,1.8,7.2,14),bark,0,3.6,0,g);
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2+0.4;const r=addMesh(new THREE.ConeGeometry(0.55,2.4,6),bark,Math.sin(a)*1.9,0.45,Math.cos(a)*1.9,g);r.rotation.x=Math.cos(a)*1.25;r.rotation.z=-Math.sin(a)*1.25;}
  for(const[bx,by,bz,rz]of[[1.6,5.8,0.2,-0.9],[-1.7,6.2,-0.3,0.9],[0.3,6.6,1.4,0]]){const b=addMesh(new THREE.CylinderGeometry(0.28,0.4,3.2,8),bark,bx,by,bz,g);b.rotation.z=rz;if(!rz)b.rotation.x=0.8;}
  for(const[lx,ly,lz,r]of[[0,9.2,0,3.6],[2.8,8.2,0.4,2.6],[-2.8,8.4,-0.2,2.6],[0.2,8.4,2.4,2.4],[0.4,8.6,-2.4,2.5],[1.6,10.4,-0.8,2.2]])addMesh(new THREE.SphereGeometry(r,14,10),leaf,lx,ly,lz,g);
  // пустой дуб: только тёмная бороздка по спирали там, где висела цепь
  const groove=M(0x2a1a0e);for(let i=0;i<9;i++){const t=addMesh(new THREE.TorusGeometry(1.52-i*0.03,0.035,5,26),groove,0,0.9+i*0.62,0,g);t.rotation.x=Math.PI/2+0.12;t.rotation.y=i*0.7;}
  W.cyls.push({x,z,r:1.95,miny:-1,maxy:8,on:true,occ:true});fadeable(g);return g;}
function hollowTree(x,z){const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const bark=M(0x55391f);
  addMesh(new THREE.CylinderGeometry(2.8,3.6,15,16),bark,0,7.5,0,g);
  for(let i=0;i<7;i++){const a=i/7*Math.PI*2+0.25;const r=addMesh(new THREE.ConeGeometry(0.9,3.4,6),bark,Math.sin(a)*3.5,0.55,Math.cos(a)*3.5,g);r.rotation.x=Math.cos(a)*1.25;r.rotation.z=-Math.sin(a)*1.25;}
  const glowM=MB(0xffe9a8);const hole=new THREE.Mesh(new THREE.CircleGeometry(1.0,28),glowM);hole.scale.set(0.95,1.35,1);hole.position.set(0,1.45,3.56);g.add(hole);
  const rim=addMesh(new THREE.TorusGeometry(1.0,0.17,8,26),M(0x3a2614),0,1.45,3.57,g);rim.scale.set(0.95,1.35,1);
  const hl=new THREE.PointLight(0xffd890,1.1,10,2);hl.position.set(0,1.6,4.6);g.add(hl);
  for(const[lx,ly,lz,r]of[[0,15.5,0,4.6],[3,13.6,0.6,3],[-3,13.8,-0.4,3.2]])addMesh(new THREE.SphereGeometry(r,12,10),M(0x2e5230),lx,ly,lz,g);
  W.cyls.push({x,z,r:3.35,miny:-1,maxy:15,on:true,occ:true});fadeable(g.children.filter(c=>c!==hole&&!c.isLight));return {g,hole,hl};}

/* ============================== FX ============================== */
const FXGEO=new THREE.BoxGeometry(0.12,0.12,0.12);
function burst(p,color,n,speed,size){n=n||10;speed=speed||5;for(let i=0;i<n;i++){const m=new THREE.Mesh(FXGEO,MB(color,{transparent:true}));m.position.copy(p);m.scale.setScalar(size||1);
  W.group.add(m);W.fx.push({m,v:new V3(rand(-1,1),rand(0.4,1.4),rand(-1,1)).multiplyScalar(speed*rand(0.5,1)),t:0,life:rand(0.45,0.8)});}}
function ringFx(p,color,r){const m=new THREE.Mesh(new THREE.TorusGeometry(1,0.07,6,30),MB(color,{transparent:true}));m.rotation.x=Math.PI/2;m.position.copy(p);m.position.y+=0.15;W.group.add(m);W.fx.push({m,t:0,life:0.5,ring:r||2.5});}
function updateFx(dt){for(let i=W.fx.length-1;i>=0;i--){const f=W.fx[i];f.t+=dt;const k=f.t/f.life;
  if(f.ring){f.m.scale.setScalar(0.3+k*f.ring);if(f.keepRot&&f.m.rotation.x!==0)f.m.rotation.z+=dt;}else{f.v.y-=12*dt;f.m.position.addScaledVector(f.v,dt);f.m.rotation.x+=dt*6;}
  f.m.material.opacity=1-k;if(k>=1){W.group.remove(f.m);W.fx.splice(i,1);}}}
function later(t,fn){W.timers.push({t,fn});}
function updateTimers(dt){for(const tm of W.timers.slice()){tm.t-=dt;if(tm.t<=0){W.timers.splice(W.timers.indexOf(tm),1);tm.fn();}}}
function anim(dur,fn){W.anims.push({t:0,dur,fn});}
function updateAnims(dt){for(let i=W.anims.length-1;i>=0;i--){const a=W.anims[i];a.t+=dt;const k=Math.min(1,a.t/a.dur);a.fn(k);if(k>=1&&W.anims[i]===a)W.anims.splice(i,1);}}
// обломки (самокат из шишек): простая баллистика с полом
function debris(mesh,v,floorY){W.group.attach(mesh);W.debris.push({m:mesh,v,floor:floorY||0,spin:new V3(rand(-8,8),rand(-8,8),rand(-8,8))});}
function updateDebris(dt){for(const d of W.debris){if(!d.v)continue;d.v.y-=GRAV*dt;d.m.position.addScaledVector(d.v,dt);d.m.rotation.x+=d.spin.x*dt;d.m.rotation.y+=d.spin.y*dt;d.m.rotation.z+=d.spin.z*dt;
  if(d.m.position.y<d.floor+0.05){d.m.position.y=d.floor+0.05;d.v.y*=-0.3;d.v.x*=0.6;d.v.z*=0.6;d.spin.multiplyScalar(0.5);if(Math.abs(d.v.y)<0.6&&Math.hypot(d.v.x,d.v.z)<0.3)d.v=null;}}}
function flower(x,y,z){const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.02,0.02,0.35,5),M(0x3f8a3a),0,0.17,0,g);
  const pc=[0xff9ad0,0xfff08a,0x9ad0ff,0xffc07a][Math.floor(rand(0,4))];for(let i=0;i<5;i++){const a=i/5*Math.PI*2;addMesh(new THREE.SphereGeometry(0.06,8,6),M(pc),Math.cos(a)*0.08,0.37,Math.sin(a)*0.08,g);}
  addMesh(new THREE.SphereGeometry(0.05,8,6),M(0xffd23a),0,0.38,0,g);g.scale.setScalar(0.01);anim(0.45,k=>g.scale.setScalar(Math.max(0.01,smooth(k)*(1+0.25*Math.sin(k*Math.PI)))));SFX.flower();}
let stitchT=0;function stitch(){stitchT=0.55;}   // «кадр на миг вышит нитью»

/* ============================== ПОЛУПРОЗРАЧНОСТЬ ТОГО, ЧТО ЗАСЛОНЯЕТ ГЕРОЕВ ============================== */
// Большие объекты (стены, стволы, заборы, срубы) между камерой и героем плавно становятся полупрозрачными.
const RAY=new THREE.Raycaster();
function fadeable(obj){if(!obj)return null;const f={mats:[],k:1,hit:false};
  for(const o of[].concat(obj))meshesOf(o).forEach(m=>{let mat=m.material;const own=W.fadeOwner.get(mat);
    if(mat.userData.shared||(own&&own!==f)){mat=mat.clone();mat.userData.shared=false;m.material=mat;}
    if(mat.userData.baseOp===undefined)mat.userData.baseOp=mat.transparent?mat.opacity:1;
    W.fadeOwner.set(mat,f);if(f.mats.indexOf(mat)<0)f.mats.push(mat);m.userData.fadeRef=f;W.fadeMeshes.push(m);});
  W.fades.push(f);return f;}
const since=mark=>W.group.children.slice(mark);   // всё, что добавлено в мир после отметки
function updateFade(dt){if(!W.fades.length)return;for(const f of W.fades)f.hit=false;
  if(!G.cine){const ex=W.fadeTargets?W.fadeTargets():[];const views=G.split>0.5?[[rigs[0].pos,[active(0)].concat(ex)],[rigs[1].pos,[active(1)].concat(ex)]]:[[shared.pos,[active(0),active(1)].concat(ex)]];
    for(const[cp,hs]of views)for(const h of hs){const tgt=new V3(h.pos.x,h.pos.y+heroHeight(h)*0.6,h.pos.z),dir=tgt.clone().sub(cp),d=dir.length();if(d<0.6)continue;dir.divideScalar(d);
      RAY.set(cp,dir);RAY.near=0.05;RAY.far=d-0.45;for(const x of RAY.intersectObjects(W.fadeMeshes,false)){const f=x.object.userData.fadeRef;if(f)f.hit=true;}}}
  for(const f of W.fades){const tk=f.hit?0.22:1;if(f.k===tk)continue;f.k=damp(f.k,tk,9,dt);if(Math.abs(f.k-tk)<0.01)f.k=tk;
    for(const m of f.mats){m.opacity=f.k*m.userData.baseOp;m.transparent=m.opacity<0.99;m.depthWrite=f.k>=0.99;}}}

/* ============================== КОЛЛИЗИИ ============================== */
function collideXZ(x,z,r,feet,top,skipMovers){let hit=false;
  for(const b of W.boxes){if(!b.on||b.maxy<=feet+STEP||b.miny>=top)continue;if(x<b.minx-r||x>b.maxx+r||z<b.minz-r||z>b.maxz+r)continue;
   const cx=clamp(x,b.minx,b.maxx),cz=clamp(z,b.minz,b.maxz),dx=x-cx,dz=z-cz,d2=dx*dx+dz*dz;if(d2>=r*r)continue;hit=true;
   if(d2>1e-9){const d=Math.sqrt(d2);x=cx+dx/d*r;z=cz+dz/d*r;}
   else{const pl=x-b.minx,pr=b.maxx-x,pb=z-b.minz,pf=b.maxz-z,m=Math.min(pl,pr,pb,pf);if(m===pl)x=b.minx-r;else if(m===pr)x=b.maxx+r;else if(m===pb)z=b.minz-r;else z=b.maxz+r;}}
  for(const c of W.cyls){if(!c.on||c.maxy<=feet+STEP||c.miny>=top)continue;const dx=x-c.x,dz=z-c.z,rr=r+c.r,d2=dx*dx+dz*dz;if(d2>=rr*rr)continue;
   hit=true;const d=Math.sqrt(d2)||1e-4;x=c.x+dx/d*rr;z=c.z+dz/d*rr;}
  return {x,z,hit};}
function groundAt(x,z,reach,m,hh,noWater){m=m===undefined?0.12:m;let y=-1e9,ref=null;
  for(const b of W.boxes){if(!b.on||b.maxy>reach)continue;if(x<b.minx-m||x>b.maxx+m||z<b.minz-m||z>b.maxz+m)continue;if(b.maxy>y){y=b.maxy;ref=b;}}
  for(const c of W.cyls){if(!c.on||c.maxy>reach)continue;const dx=x-c.x,dz=z-c.z;if(dx*dx+dz*dz>(c.r+m)*(c.r+m))continue;if(c.maxy>y){y=c.maxy;ref=c;}}
  if(W.ramps)for(const r of W.ramps){const px=x-r.x0,pz=z-r.z0,u=px*r.dx+pz*r.dz;if(u<0||u>r.len)continue;if(Math.abs(px*r.dz-pz*r.dx)>r.w)continue;const ry=lerp(r.y0,r.y1,u/r.len);if(ry<=reach&&ry>y){y=ry;ref=r;}}   // наклонный мостик
  for(const t of W.threads){if(t.len<=0.3||t.ret)continue;if(t.sag&&!(hh&&t.sagOn&&t.sagOn.includes(hh)))continue;const px=x-t.sx,pz=z-t.sz,u=px*t.dx+pz*t.dz;if(u<(t.string?0.05:-0.4)||u>t.len+0.25)continue;
    if(Math.abs(px*t.dz-pz*t.dx)>(t.thick?1.0:t.glued?0.95:0.62))continue;const ty=thY(t,u);if(ty>reach)continue;if(ty>y){y=ty;ref=t;}}
  // вода участка (гусли): гладь держит плывущего; кто оказался чуть ниже глади — всплывает на неё
  if(!noWater)for(const w of W.waters){if(w.level<=w.floor+0.05)continue;if(x<w.minx-m||x>w.maxx+m||z<w.minz-m||z>w.maxz+m)continue;
    const under=hh&&hh.pos.y<w.level&&hh.pos.y>w.level-1.6;if((w.level<=reach||under)&&w.level>y){y=w.level;ref=w;}}
  for(const f of W.surfs){const r=f(x,z,reach,hh);if(r&&r.y<=reach+0.001&&r.y>y){y=r.y;ref=r.ref;}}
  return {y,ref};}
// потолок над головой (для прыжка в низком лазе): самый низкий низ коробки выше макушки
function ceilingAt(x,z,r,top){let c=1e9;for(const b of W.boxes){if(!b.on||b.miny<top-0.02)continue;if(x<b.minx-r*0.5||x>b.maxx+r*0.5||z<b.minz-r*0.5||z>b.maxz+r*0.5)continue;if(b.miny<c)c=b.miny;}return c;}
function segBox(p,q,b){let t0=0,t1=1;const d=[q.x-p.x,q.y-p.y,q.z-p.z],o=[p.x,p.y,p.z],mn=[b.minx,b.miny,b.minz],mx=[b.maxx,b.maxy,b.maxz];
  for(let i=0;i<3;i++){if(Math.abs(d[i])<1e-9){if(o[i]<mn[i]||o[i]>mx[i])return false;}else{let ta=(mn[i]-o[i])/d[i],tb=(mx[i]-o[i])/d[i];if(ta>tb){const s=ta;ta=tb;tb=s;}t0=Math.max(t0,ta);t1=Math.min(t1,tb);if(t0>t1)return false;}}return true;}
function segCyl(p,q,c){const dx=q.x-p.x,dz=q.z-p.z,l2=dx*dx+dz*dz;let t=l2>0?((c.x-p.x)*dx+(c.z-p.z)*dz)/l2:0;t=clamp(t,0,1);const x=p.x+dx*t-c.x,z=p.z+dz*t-c.z;return x*x+z*z<c.r*c.r&&Math.min(p.y,q.y)<c.maxy&&Math.max(p.y,q.y)>c.miny;}
function occluded(a,b){const p=new V3(a.pos.x,a.pos.y+0.9,a.pos.z),q=new V3(b.pos.x,b.pos.y+0.9,b.pos.z);
  for(const bx of W.boxes)if(bx.on&&bx.occ&&segBox(p,q,bx))return true;for(const c of W.cyls)if(c.on&&c.occ&&segCyl(p,q,c))return true;return false;}
function pathBlocked(a,b){ // закрытые ворота и глухие стены — оставленного через них не переносит
  const p=new V3(a.x,Math.max(a.y,b.y)+0.9,a.z),q=new V3(b.x,Math.max(a.y,b.y)+0.9,b.z);
  for(const g of W.gates)if(g.col.on&&segBox(p,q,g.col))return true;for(const nb of W.noCarry)if(segBox(p,q,nb))return true;
  for(const bx of W.boxes)if(bx.on&&bx.occ&&segBox(p,q,bx))return true;for(const c of W.cyls)if(c.on&&c.occ&&segCyl(p,q,c))return true;return false;}

