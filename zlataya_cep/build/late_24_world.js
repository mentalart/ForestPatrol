/* ============================== РЕЛИЗ final03 · МИР: деревья кита, подножия-обрывы, долина, средний план, ориентиры ============================== */
// Планы глубины: передний (кромки, трава) → игровой (платформы) → средний (долина, лес, скалы, дома, ниже уровня) → дальний (хребты) → небо.
// Всё это — только меши: коллизии, триггеры и падение (W.fallY) прежние. Ничего высокого не ставится на ходибельную землю и за спину камере.
const DRESS={};FIN.dress=DRESS;
const THEME_KIND={forest:'forest',dark:'forest',evening:'forest',swamp:'forest',sea:'sea',whirl:'sea',sunset:'sea',buyan:'sea',dawn:'sea',kitezh:'reef',
  heaven:'sky',skynight:'sky',skyday:'sky',smorodina:'lava',valy:'hills'};
const dressKind=()=>THEME_KIND[W.theme||'sunset']||null;
const TREES={forest:[['fir',4],['firTall',3],['pine',2],['birch',1],['spruce',1]],dark:[['spruce',4],['firTall',3],['snag',2],['fir',1]],evening:[['fir',4],['firTall',3],['pine',2],['birch',1]],
  swamp:[['spruce',4],['willow',2],['snag',3],['firTall',1]],sunset:[['oak',3],['birch',3],['round',2],['apple',2],['fir',1]],buyan:[['birch',3],['oak',3],['pine',3],['round',1]],
  dawn:[['birch',4],['round',2],['apple',2],['oak',2]],valy:[['autumn',4],['snag',2],['oak',2],['birch',1]],smorodina:[['snag',1]],forgein:[['snag',1]],
  heaven:[['cloudTree',3],['round',1]],skynight:[['cloudTree',1]],skyday:[['cloudTree',3],['round',1]],sea:[['pine',2],['birch',1]],whirl:[['pine',1]],kitezh:[['kelp',1]],
  barn:[['fir',1]],belly:[['kelp',1]],terem:[['snag',1]],egg:[['round',1]]};
const pickW=(list,r)=>{let t=0;for(const x of list)t+=x[1];let u=r*t;for(const x of list){u-=x[1];if(u<=0)return x[0];}return list[0][0];};
// ---------- инстансы кита: одна отрисовка на вид и вариант ----------
const D_M=new THREE.Matrix4(),D_Q=new THREE.Quaternion(),D_Y=new V3(0,1,0),D_C=new THREE.Color();
function instKit(items,o){o=o||{};const groups=new Map();for(const it of items){const k=it.name+'|'+(it.v||0)+'|'+(it.mat||o.mat||'');let a=groups.get(k);if(!a){a=[];groups.set(k,a);}a.push(it);}
  const out=[];for(const [k,a] of groups){const it0=a[0];const mat=KMAT[it0.mat||o.mat||(/tuft|fern|flower/.test(it0.name)?'windD':/reeds|kelp|bush|berry/.test(it0.name)?'windM':/fir|pine|birch|oak|round|poplar|willow|apple|autumn|spruce|cloudTree/.test(it0.name)?'wind':/crystal|Glass|Glow|glowCaps/.test(it0.name)?'glow':'vc')];
    const im=new THREE.InstancedMesh(kit(it0.name,it0.v||0),mat,a.length);let tinted=false;
    a.forEach((d,i)=>{D_Q.setFromAxisAngle(D_Y,d.ry||0);if(d.rx||d.rz)D_Q.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(d.rx||0,0,d.rz||0)));const s=d.s||1;D_M.compose(new V3(d.x,d.y,d.z),D_Q,new V3(s*(d.sx||1),s*(d.sy||1),s*(d.sz||1)));im.setMatrixAt(i,D_M);
      if(d.tint!=null){tinted=true;if(typeof d.tint==='number')D_C.setScalar(d.tint);else D_C.copy(d.tint);}else D_C.setScalar(1);im.setColorAt(i,D_C);});
    im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;im.frustumCulled=false;im.castShadow=a.some(d=>d.shadow);im.receiveShadow=true;im.userData.decor=true;im.userData.dress=true;
    W.group.add(im);out.push(im);}
  return out;}
FIN.instKit=instKit;
// ---------- границы уровня и «ходибельная» земля ----------
function lvBounds(){const G0=W.finG||[];let a=G0.map(g=>({minx:g.minx,maxx:g.maxx,minz:g.minz,maxz:g.maxz,top:g.top}));
  if(!a.length)a=W.boxes.filter(b=>b.on&&(b.maxx-b.minx)*(b.maxz-b.minz)>3&&b.maxy>-6&&b.maxy<4&&b.miny>-13).map(b=>({minx:b.minx,maxx:b.maxx,minz:b.minz,maxz:b.maxz,top:b.maxy}));
  if(!a.length)return null;const B={minx:1e9,maxx:-1e9,minz:1e9,maxz:-1e9,minTop:1e9,maxTop:-1e9,rects:a};
  for(const r of a){B.minx=Math.min(B.minx,r.minx);B.maxx=Math.max(B.maxx,r.maxx);B.minz=Math.min(B.minz,r.minz);B.maxz=Math.max(B.maxz,r.maxz);B.minTop=Math.min(B.minTop,r.top);B.maxTop=Math.max(B.maxTop,r.top);}return B;}
const inRects=(rs,x,z,m)=>{for(const r of rs)if(x>r.minx-m&&x<r.maxx+m&&z>r.minz-m&&z<r.maxz+m)return r;return null;};
function onWalk(x,z,y){for(const g of (W.finG||[]))if(x>g.minx-0.2&&x<g.maxx+0.2&&z>g.minz-0.2&&z<g.maxz+0.2&&Math.abs(g.top-y)<1.2)return true;
  for(const b of W.boxes)if(b.on&&x>b.minx-0.2&&x<b.maxx+0.2&&z>b.minz-0.2&&z<b.maxz+0.2&&Math.abs(b.maxy-y)<1.2)return true;return false;}
function blockedBy(x,z,m,y0){for(const b of W.boxes){if(!b.on||b.maxy<y0)continue;if(x>b.minx-m&&x<b.maxx+m&&z>b.minz-m&&z<b.maxz+m)return true;}return false;}
// ---------- ели прототипа → деревья кита (у края обрыва — растут из долины, вершины там же, где были) ----------
{const _flush=flushDecor;flushDecor=function(){const L=W.decor.slice();W.decor.length=0;_flush();if(L.length)(DRESS.trees||(DRESS.trees=[])).push(...L);};}
function plantDecorTrees(floorY){const L=DRESS.trees||[];DRESS.trees=[];if(!L.length)return;const mix=TREES[W.theme||'sunset']||TREES.forest,R=kRng(seedOf(W.levelId)+3),items=[];
  for(const d of L){const name=pickW(mix,R()),v=0,H=4.1;R();let y=d.y||0,s=d.s;
    if(!onWalk(d.x,d.z,y)&&floorY!=null){const top=y+4.05*d.s*0.8;y=floorY;s=Math.min(3.7,Math.max(d.s,(top-floorY)/H));}
    items.push({name,v,x:d.x,y,z:d.z,s,ry:R()*6.283,tint:d.dark?0.72+R()*0.12:0.9+R()*0.18,shadow:true});}
  instKit(items);}
// ---------- подножия: обрыв со слоями из-под каждой плоскости земли вниз (к долине, морю) или клином (парящий остров) ----------
function skirtGeo(rects,y1,kind,pal){const P=[],C=[],col=new THREE.Color(),R=kRng(seedOf(W.levelId)+11);
  const push=(a,b,c,s)=>{ktone(pal,Math.max(-1,Math.min(1,s)),col);for(const v of[a,b,c]){P.push(v[0],v[1],v[2]);C.push(col.r,col.g,col.b);}};
  for(const r of rects){const y0=r.top-3.9,depth=y0-y1;if(depth<0.5)continue;const w=r.maxx-r.minx,d=r.maxz-r.minz;const seg=L=>Math.max(1,Math.round(L/2.2));
    const per=[];const nx=seg(w),nz=seg(d);for(let i=0;i<nx;i++)per.push([r.minx+w*i/nx,r.maxz]);for(let i=0;i<nz;i++)per.push([r.maxx,r.maxz-d*i/nz]);for(let i=0;i<nx;i++)per.push([r.maxx-w*i/nx,r.minz]);for(let i=0;i<nz;i++)per.push([r.minx,r.minz+d*i/nz]);
    const cx=(r.minx+r.maxx)/2,cz=(r.minz+r.maxz)/2,rings=[];const nr=kind==='sky'?5:Math.max(2,Math.round(depth/1.8));
    for(let j=0;j<=nr;j++){const t=j/nr,y=y0-depth*t;let k;if(kind==='sky')k=1-Math.pow(t,1.35)*0.9;else k=1-t*Math.min(0.14,3/Math.max(w,d));
      const ring=per.map(([x,z],i)=>{const nzv=j===0?0:(n3(q4(x),q4(y),q4(z),7)*0.45+(kind==='sky'?n3(i,j,3,9)*0.3:0));const dx=x-cx,dz=z-cz,L=Math.hypot(dx,dz)||1;return [cx+dx*k+dx/L*nzv,y+(j&&j<nr?n3(i,j,1,5)*0.25:0),cz+dz*k+dz/L*nzv];});rings.push(ring);}
    for(let j=0;j<nr;j++){const A=rings[j],B2=rings[j+1],band=((j%3)===1?-0.18:(j%3)===2?0.06:-0.04);for(let i=0;i<A.length;i++){const i2=(i+1)%A.length,s=band-j/nr*0.35+(R()-0.5)*0.12;
        push(A[i],B2[i],B2[i2],s);push(A[i],B2[i2],A[i2],s+(R()-0.5)*0.06);}}
    if(kind==='sky'){const L2=rings[nr],c=[cx,y1-1.2,cz];for(let i=0;i<L2.length;i++)push(L2[i],c,L2[(i+1)%L2.length],-0.6);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));g.computeVertexNormals();g.computeBoundingSphere();return g;}
// ---------- долина: неровная земля под уровнем ----------
function valleyGeo(B,y,margin,pal,cell,o){o=o||{};const x0=B.minx-margin,x1=B.maxx+margin,z0=B.minz-margin,z1=B.maxz+Math.min(margin,24);const nx=Math.min(90,Math.ceil((x1-x0)/cell)),nz=Math.min(160,Math.ceil((z1-z0)/cell));
  const hk=o.flat?0.12:1;const H=(i,j)=>{const x=x0+(x1-x0)*i/nx,z=z0+(z1-z0)*j/nz;return [x+(i&&i<nx?n3(i,j,2,3)*cell*0.3:0),y+(n3(Math.floor(x/9),Math.floor(z/9),4,5)*1.4+n3(i,j,6,7)*0.35)*hk,z+(j&&j<nz?n3(j,i,8,3)*cell*0.3:0)];};
  const V=[];for(let i=0;i<=nx;i++){V.push([]);for(let j=0;j<=nz;j++)V[i].push(H(i,j));}const P=[],C=[],col=new THREE.Color();
  for(let i=0;i<nx;i++)for(let j=0;j<nz;j++){const a=V[i][j],b=V[i+1][j],c=V[i+1][j+1],d=V[i][j+1];for(const t of[[a,d,c],[a,c,b]]){const cy=(t[0][1]+t[1][1]+t[2][1])/3;
      const riv=o.river?o.river((t[0][0]+t[1][0]+t[2][0])/3,(t[0][2]+t[1][2]+t[2][2])/3):0;ktone(riv?o.riverPal:pal,(cy-y)*0.25+n3(i,j,9,1)*0.15,col);for(const v of t){P.push(v[0],riv?y-0.5:v[1],v[2]);C.push(col.r,col.g,col.b);}}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));g.computeVertexNormals();g.computeBoundingSphere();return g;}
function addStatic(g,mat,o){const m=new THREE.Mesh(g,mat||KMAT.vc);m.receiveShadow=true;m.castShadow=!!(o&&o.shadow);m.userData.dress=true;m.userData.sty=true;W.group.add(m);return m;}
// ---------- средний план ----------
function ringPoints(B,n,r0,r1,floorY,R,avoid){const pts=[];let tries=0;const rs=B.rects;while(pts.length<n&&tries++<n*14){
    const x=B.minx-r1+R()*(B.maxx-B.minx+2*r1),z=B.minz-r1+R()*(B.maxz-B.minz+r1+Math.min(r1,10));
    const dx=Math.max(B.minx-x,0,x-B.maxx),dz=Math.max(B.minz-z,0,z-B.maxz),dist=Math.hypot(dx,dz);
    if(inRects(rs,x,z,r0))continue;if(dist>r1)continue;if(blockedBy(x,z,1.2,floorY))continue;if(avoid&&avoid(x,z))continue;
    let near=1e9;for(const r of rs){const ddx=Math.max(r.minx-x,0,x-r.maxx),ddz=Math.max(r.minz-z,0,z-r.maxz);near=Math.min(near,Math.hypot(ddx,ddz));}pts.push({x,z,d:near});}
  return pts;}
const DRESS_CFG={
  forest:{skirt:PAL.cliff,floor:PAL.moss,ring:[['fir',3],['firTall',3],['pine',2],['spruce',1],['birch',1]],props:[['boulders',2],['rock',3],['log',2],['stump',2],['snag',1],['bush',3]],landmark:['tower',0,1.3]},
  sea:{skirt:PAL.cliff,ring:[['seaStack',2],['boat',1],['rock',2]],landmark:['tower',1,1.5]},
  reef:{skirt:PAL.stone,floor:PAL.sand,ring:[['coral',3],['kelp',4],['column',2],['dome',1]],props:[['shell',2],['starfish',2],['rock',2],['coral',2]],landmark:['dome',1,1.8]},
  sky:{skirt:PAL.cliff,ring:[['islet',2],['cloudPuff',3]],props:[],landmark:['crystal',0,4]},
  lava:{skirt:PAL.basalt,floor:PAL.basalt,ring:[['basalt',3],['snag',1],['boulders',1]],props:[['ember',3],['rock',2]],landmark:['basalt',0,2.6]},
  hills:{skirt:PAL.cliff,floor:PAL.leafDk,ring:[['autumn',4],['oak',2],['snag',1],['birch',1]],props:[['boulders',2],['rock',2],['haystack',1],['stump',1]],landmark:['mill',0,1.6]}};
function dressRing(B,kind,floorY,oceanY){const cfg=DRESS_CFG[kind],R=kRng(seedOf(W.levelId)+23),items=[];const len=B.maxz-B.minz,wid=B.maxx-B.minx,scaleN=Math.min(1,Math.max(0.35,(len*wid)/2600));
  const vil=kind==='sea'&&/sunset|buyan|dawn/.test(W.theme||'sunset')?{x:(B.minx+B.maxx)/2+(R()<0.5?-1:1)*(8+R()*6),z:B.minz-36-R()*6}:null;const avoidV=vil?(x,z)=>Math.abs(x-vil.x)<22&&Math.abs(z-vil.z)<17:null;
  const baseY=kind==='sea'?oceanY:floorY;
  if(kind==='forest'||kind==='hills'){const mix=kind==='forest'?(TREES[W.theme]||cfg.ring):cfg.ring;for(const p of ringPoints(B,Math.round(420*scaleN+120),2.5,46,floorY,R)){const topMax=B.maxTop+(p.d<10?2.5:p.d<20?6:12);
      const s=Math.min(5.2,Math.max(1.4,(topMax-floorY)/4.2*(0.75+R()*0.3)));items.push({name:pickW(mix,R()),v:0,x:p.x,y:floorY-0.3,z:p.z,s,ry:R()*6.283,tint:0.78+R()*0.3+(R()*0),shadow:p.d<14});}
    for(const p of ringPoints(B,Math.round(90*scaleN+30),2.5,34,floorY,R))items.push({name:pickW(cfg.props,R()),v:0,x:p.x,y:floorY-0.2,z:p.z,s:1.2+R()*1.6,ry:R()*6.283,tint:0.85+R()*0.25});}
  if(kind==='reef'){for(const p of ringPoints(B,Math.round(160*scaleN+60),2.5,40,floorY,R)){const n=pickW(cfg.ring,R());items.push({name:n,v:Math.floor(R()*4),x:p.x,y:floorY-0.2,z:p.z,s:n==='dome'?1+R()*0.6:n==='kelp'?1.5+R()*2:1.4+R()*1.8,ry:R()*6.283,tint:0.85+R()*0.25});}
    for(const p of ringPoints(B,Math.round(120*scaleN+40),2,26,floorY,R))items.push({name:pickW(cfg.props,R()),v:Math.floor(R()*3),x:p.x,y:floorY-0.1,z:p.z,s:1.5+R()*2,ry:R()*6.283});}
  if(kind==='lava'){for(const p of ringPoints(B,Math.round(130*scaleN+50),3,42,floorY,R)){const n=pickW(cfg.ring,R());items.push({name:n,v:R()<0.5?0:1,x:p.x,y:floorY-0.3,z:p.z,s:n==='basalt'?1.2+R()*1.8:1.5+R()*1.5,ry:R()*6.283,tint:0.8+R()*0.3,shadow:p.d<10});}
    for(const p of ringPoints(B,Math.round(70*scaleN+30),2.5,30,floorY,R)){const v=R()<0.5?0:1;items.push({name:'ember',v,x:p.x,y:floorY-0.1,z:p.z,s:1.5+R()*2,ry:R()*6.283});items.push({name:'emberGlow',v,x:p.x,y:floorY-0.1,z:items[items.length-1].z,s:items[items.length-1].s,ry:items[items.length-1].ry,mat:'glow'});}}
  if(kind==='sea'){for(const p of ringPoints(B,Math.round(26*scaleN+10),9,70,-1e9,R,avoidV)){const n=pickW(cfg.ring,R());const s=n==='seaStack'?0.8+R()*0.9:n==='boat'?1+R()*0.3:2+R()*2.5;
      items.push({name:n,v:R()<0.5?0:1,x:p.x,y:oceanY-(n==='seaStack'?1.5:n==='boat'?0.25:0.4),z:p.z,s,ry:R()*6.283,tint:0.85+R()*0.25,shadow:false});}
    // камни у подножия обрывов, в полосе прибоя
    for(const r of B.rects){const per=2*((r.maxx-r.minx)+(r.maxz-r.minz)),n=Math.min(40,Math.round(per/5));for(let i=0;i<n;i++){const u=R()*per;let x,z;const w=r.maxx-r.minx,d=r.maxz-r.minz;
        if(u<w){x=r.minx+u;z=r.maxz+0.8;}else if(u<w+d){x=r.maxx+0.8;z=r.maxz-(u-w);}else if(u<2*w+d){x=r.maxx-(u-w-d);z=r.minz-0.8;}else{x=r.minx-0.8;z=r.minz+(u-2*w-d);}
        if(inRects(B.rects,x,z,0.3)||blockedBy(x,z,0.5,oceanY))continue;items.push({name:R()<0.6?'boulders':'rock',v:R()<0.5?0:1,x:x+(R()-0.5)*1.5,y:oceanY-0.5,z:z+(R()-0.5)*1.5,s:1+R()*1.4,ry:R()*6.283,tint:0.85+R()*0.2});}}}
  if(kind==='sky'){for(const p of ringPoints(B,Math.round(40*scaleN+16),6,60,-1e9,R)){const n=pickW(cfg.ring,R());items.push({name:n,v:R()<0.5?0:1,x:p.x,y:n==='cloudPuff'?B.minTop-10-R()*14:B.minTop-4-R()*10,z:p.z,s:n==='cloudPuff'?2+R()*3:0.8+R()*1.1,ry:R()*6.283,tint:0.9+R()*0.15});}
    for(const p of ringPoints(B,Math.round(60*scaleN+30),0,70,-1e9,R))items.push({name:'cloudPuff',v:R()<0.5?0:1,x:p.x,y:B.minTop-18-R()*8,z:p.z,s:3+R()*4,ry:R()*6.283,tint:0.92+R()*0.1});
    // на части островков — светящиеся кристаллы
    for(const it of items.filter(q=>q.name==='islet').slice(0,8))if(R()<0.6)items.push({name:'crystal',v:Math.floor(R()*4),x:it.x+(R()-0.5)*1.4*it.s,y:it.y+0.2*it.s,z:it.z+(R()-0.5)*1.4*it.s,s:it.s*(0.6+R()*0.4),ry:R()*6.283,mat:'glow'});}
  // деревня на островке впереди (закат, Буян, рассвет): избы, мельница, стог, деревья и жители — генератор вариаций NPC
  if(vil){const vx=vil.x,vz=vil.z,vy=oceanY+0.9;
    DRESS.village={x:vx,z:vz,blocked:blockedBy(vx,vz,14,oceanY)};if(!DRESS.village.blocked){addStatic(skirtGeo([{minx:vx-15,maxx:vx+15,minz:vz-11,maxz:vz+11,top:vy+3.9}],oceanY-2,'cliff',PAL.cliff),KMAT.vc);
      addStatic(valleyGeo({minx:vx-14.5,maxx:vx+14.5,minz:vz-10.5,maxz:vz+10.5},vy,0,PAL.grass,3,{flat:true}),KMAT.vc);
      const hs=[[-8,-4],[-1,-6],[6,-4],[-5,4],[4,5]];hs.forEach(([dx,dz],i)=>items.push({name:'izba',v:(i+Math.floor(R()*4))%4,x:vx+dx,y:vy,z:vz+dz,s:0.9+R()*0.2,ry:Math.atan2(-dx,-dz)+Math.PI+(R()-0.5)*0.4,tint:0.92+R()*0.12}));
      items.push({name:'mill',v:0,x:vx+11,y:vy,z:vz-1,s:1,ry:-0.6});items.push({name:'millBlades',v:0,x:vx+11+Math.sin(-0.6)*1.3,y:vy+3.2,z:vz-1+Math.cos(-0.6)*1.3,s:1,ry:-0.6,rz:R()*1.5});
      items.push({name:'haystack',v:0,x:vx-11,y:vy,z:vz+1,s:1},{name:'well',v:1,x:vx+1,y:vy,z:vz+0.5,s:0.9,ry:R()*6});
      for(let i=0;i<5;i++)items.push({name:R()<0.5?'birch':'oak',v:0,x:vx-13+R()*26,y:vy,z:vz+7+R()*3,s:0.8+R()*0.5,ry:R()*6.283,tint:0.9+R()*0.2});
      for(let i=0;i<4;i++)items.push({name:'fence',v:0,x:vx-6+i*2.1,y:vy,z:vz+8.5,s:1,ry:0});
      for(let i=0;i<7;i++){const a=R()*6.283,r=2+R()*5;items.push({name:'villager',v:i,x:vx+Math.cos(a)*r,y:vy,z:vz+Math.sin(a)*r,s:1,ry:R()*6.283});}
      items.push({name:'bunting',v:0,x:vx-1,y:vy+2.6,z:vz-1,s:1.1,ry:0.3},{name:'lanternPost',v:0,x:vx+3,y:vy,z:vz+2,s:1,ry:0.5},{name:'lanternGlass',v:0,x:vx+3,y:vy,z:vz+2,s:1,ry:0.5,mat:'glow'},{name:'boat',v:1,x:vx-4,y:oceanY-0.25,z:vz+15.5,s:1,ry:0.4},{name:'boat',v:0,x:vx+8.5,y:oceanY-0.25,z:vz+14.5,s:1,ry:-0.3},{name:'bridge',v:0,x:vx+2,y:oceanY-0.95,z:vz+13.4,s:1,ry:0});
      // двор: телега, бочки, ящики, дрова, корзины, вёдра, горшки, лавки
      const yard=[['cart',1],['barrel',0],['barrel',1],['crate',0],['crate',1],['firewood',0],['basket',1],['bucket',0],['pot',1],['bench',0],['rope',0],['chest',0]];
      yard.forEach(([n,v],i)=>{const a=i/yard.length*6.283+R()*0.3,r=4+R()*3.5;items.push({name:n,v,x:vx+Math.cos(a)*r,y:vy,z:vz+Math.sin(a)*r*0.8,s:1,ry:R()*6.283});});}}
  // ориентир в конце уровня: притягивает взгляд вперёд
  if(cfg.landmark&&len>30){const [n,v,s]=cfg.landmark;let lx=(B.minx+B.maxx)/2+(R()-0.5)*wid*0.6,lz=B.minz-14-R()*8;if(!blockedBy(lx,lz,2,baseY)){const ly=kind==='sky'?B.minTop-3:kind==='sea'?oceanY-1:baseY-0.2;
      if(kind==='sea')items.push({name:'seaStack',v:1,x:lx,y:oceanY-2,z:lz,s:1.1,ry:0});items.push({name:n,v,x:lx,y:kind==='sea'?oceanY-2+kit('seaStack',1).boundingBox.max.y*1.1-0.5:ly,z:lz,s,ry:R()*6.283,shadow:false,mat:n==='crystal'?'glow':undefined});
      if(kind==='sky')items.push({name:'islet',v:0,x:lx,y:ly-0.2,z:lz,s:2.2,ry:0});}}
  instKit(items);}
// своё море прототипа (большая плоскость воды у острова): его высота — уровень моря для обрывов, волн, пены и деревни
function seaPlaneY(fy,B){let best=null;const bb=new THREE.Box3(),sz=new V3(),cols=new Set(W.boxes.map(b=>b.mesh).filter(Boolean));for(const o of W.group.children){if(!o.isMesh||!o.geometry||o.userData.gtop||o.userData.gside||cols.has(o))continue;bb.setFromObject(o);bb.getSize(sz);
    if(sz.x*sz.z<1500||sz.y>1.2)continue;const y=bb.max.y;if(y<fy-0.4||y>B.minTop-0.2)continue;if(best==null||y>best)best=y;}return best;}
// ---------- одеть мир ----------
FIN.dressWorld=function(){const kind=dressKind(),B=lvBounds();DRESS.kind=kind;DRESS.B=B;DRESS.floorY=null;DRESS.oceanY=null;DRESS.seaPlane=false;DRESS.village=null;
  const fy=W.fallY||-9;let floorY=null,oceanY=null;
  if(B&&kind){floorY=Math.min(fy,B.minTop-4)-2.6;if(kind==='reef')floorY=Math.max(floorY,B.minTop-9);if(kind==='sea'){oceanY=Math.min(fy+1.2,B.minTop-1.2);const sy=seaPlaneY(fy,B);if(sy!=null){oceanY=sy;DRESS.seaPlane=true;}}DRESS.floorY=floorY;DRESS.oceanY=oceanY;const cfg=DRESS_CFG[kind];
    const rects=B.rects.filter(r=>(r.maxx-r.minx)*(r.maxz-r.minz)>2);
    if(kind==='sky')addStatic(skirtGeo(rects,B.minTop-4-8,'sky',cfg.skirt),KMAT.vc);
    else addStatic(skirtGeo(rects,kind==='sea'?oceanY-2:floorY-1,'cliff',cfg.skirt),KMAT.vc);
    if(cfg.floor){const lava=kind==='lava';addStatic(valleyGeo(B,floorY,lava?60:52,cfg.floor,lava?4:3.6,lava?{river:(x,z)=>Math.abs(Math.sin(x*0.09+z*0.021)*14+Math.sin(z*0.05)*6)<2.2&&!inRects(B.rects,x,z,4),riverPal:PAL.lava}:{}),lava?DRESS.lavaFloorMat():KMAT.vc);}
    dressRing(B,kind,floorY,oceanY);}
  plantDecorTrees(floorY);if(FIN.dressAtmo)FIN.dressAtmo(kind,B);};
// долина Смородины: лавовые реки светятся (свечение по цвету вершин — только у ярких)
DRESS.lavaFloorMat=()=>{if(!DRESS._lm){DRESS._lm=new THREE.MeshLambertMaterial({vertexColors:true});DRESS._lm.userData.fx='glowHot';DRESS._lm.userData.kit=true;DRESS._lm.userData.shared=true;}return DRESS._lm;};
FIN.fxHook.glowHot=(sh)=>{sh.uniforms.uTime=FIN.U.time;sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uTime;').replace('vec3 totalEmissiveRadiance = emissive;',
  'vec3 totalEmissiveRadiance = emissive + vColor * smoothstep( 0.55, 0.8, vColor.r - vColor.b ) * ( 0.9 + 0.2 * sin( uTime * 1.7 + vViewPosition.x * 0.3 ) );');};
