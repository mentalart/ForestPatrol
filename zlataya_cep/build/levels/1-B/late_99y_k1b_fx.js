/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: АРЕНА И ЭФФЕКТЫ — СВЕТ ПО ЭТАПАМ, СВЕТЛЯКИ, ЛИСТОПАД, ТЕЛЕГРАФЫ, КАМЕРА, ЛЕНТЫ И СКАКАЛКА ============================== */
// docs/29_leshy_proposals.md, шаг 2. Арена меняется по этапам (сумерки → ночь со светляками → ярмарка с фонариками → рассвет), как омут у Водяного: смена света
// плавная (фон, туман, свет неба и солнца), светляки, туман у корней, лучи сквозь ели, листопад. Телеграфы — круги и веера, которые ЗАПОЛНЯЮТСЯ к удару
// (у ладоней-врагов заполнение ведёт сама логика замаха: e.t / e.wdur, круг — та же зона, по которой считается удар). Камера арены — своя (W.camFn):
// дальше и выше, Леший целиком. Детали этапа 3 собраны заранее: дорожка-хоровод, скакалка-лиана с золотым веером, ленты-нити клубка, витки на стволе,
// фонарики на ёлках кольца. FIN.k1b.fx: init(ctx) · mood(имя,сек) · tele(x,z,r,сек,вид) · sector(…) · leaves(p,n) · lane(C,r,w) · rope(len) · ribbon(a,b,цвет) · demo(on).
const K1F={q:[],ribbons:[],lamps:[],LV:null,ff:null,fog:[],rays:[],ctx:null,C:null,cur:null,tgt:null,ph:null,hT:new Map(),wraps:[],amb:0,demoO:null};K1B.fx=K1F;
const K1COL={red:0xff4a3a,yellow:0xffd24a,gold:0xffc83a,blue:0x4ab0ff,white:0xfff6dc,pink:0xff8fb0,green:0x8ee07a};
function k1Add(o){o.userData.noBatch=true;o.userData.noBatchL=true;o.raycast=()=>{};W.group.add(o);return o;}
function k1Del(o){if(o&&o.parent)o.parent.remove(o);}
K1F.anim=(dur,fn,end)=>{K1F.q.push({t:0,dur,fn,end});};
/* ---------- свет и небо: плавно к настроению этапа ---------- */
const K1MOOD={dusk:{bg:0x22383a,fog:[0x22383a,12,50],amb:[0x93aebf,0.62],sun:[0xc9d6ee,0.66],ff:36,fogA:0.16,rays:1,tint:0xb8d8c8},
  night:{bg:0x1a2444,fog:[0x1a2444,12,48],amb:[0x8090d4,0.64],sun:[0xa8baff,0.64],ff:150,fogA:0.12,rays:0.15,tint:0x6878c0},
  fair:{bg:0x3a2a4a,fog:[0x3a2a4a,16,60],amb:[0xf0d0b8,0.7],sun:[0xffe0a8,0.8],ff:60,fogA:0.06,rays:0.4,tint:0xffd8b0},
  dawn:{bg:0xf0c8a8,fog:[0xf0c8a8,24,90],amb:[0xffe8d8,0.7],sun:[0xffd8a0,0.95],ff:0,fogA:0.1,rays:1.4,tint:0xfff0d8}};
function k1MoodVals(m){return {bg:new THREE.Color(m.bg),fogC:new THREE.Color(m.fog[0]),fogN:m.fog[1],fogF:m.fog[2],amb:new THREE.Color(m.amb[0]),ambI:m.amb[1],sun:new THREE.Color(m.sun[0]),sunI:m.sun[1],
  ff:m.ff,fogA:m.fogA,rays:m.rays,tint:new THREE.Color(m.tint)};}
function k1MoodApply(v){if(scene.background&&scene.background.isColor)scene.background.copy(v.bg);if(scene.fog){scene.fog.color.copy(v.fogC);scene.fog.near=v.fogN;scene.fog.far=v.fogF;}
  amb.color.copy(v.amb);amb.intensity=v.ambI;sun.color.copy(v.sun);sun.intensity=v.sunI;}
K1F.mood=function(name,dur){const m=K1MOOD[name];if(!m)return;K1F.name=name;K1F.tgt=k1MoodVals(m);K1F.rate=dur>0.05?3/dur:0;
  if(!K1F.cur||!K1F.rate){K1F.cur=k1MoodVals(m);k1MoodApply(K1F.cur);}};
function k1MoodTick(dt){const c=K1F.cur,t=K1F.tgt;if(!c||!t)return;const k=K1F.rate?1-Math.exp(-dt*K1F.rate):1,L=(a,b)=>a+(b-a)*k;
  c.bg.lerp(t.bg,k);c.fogC.lerp(t.fogC,k);c.fogN=L(c.fogN,t.fogN);c.fogF=L(c.fogF,t.fogF);c.amb.lerp(t.amb,k);c.ambI=L(c.ambI,t.ambI);c.sun.lerp(t.sun,k);c.sunI=L(c.sunI,t.sunI);
  c.ff=L(c.ff,t.ff);c.fogA=L(c.fogA,t.fogA);c.rays=L(c.rays,t.rays);c.tint.lerp(t.tint,k);k1MoodApply(c);}
/* ---------- светляки, туман у корней, лучи сквозь ели ---------- */
function k1Fireflies(C){const N=170,g=new THREE.BufferGeometry(),pos=new Float32Array(N*3),col=new Float32Array(N*3),S=[];
  for(let i=0;i<N;i++){S.push({a:rand(0,6.28),r:rand(1,13.5),y:rand(0.5,4.8),sp:rand(0.05,0.2)*(i%2?1:-1),ph:rand(0,6.28),w:rand(0.6,1.8)});const c=new THREE.Color(i%4===0?0xb8ff90:i%4===1?0xffd0e0:0xfff3a0);col.set([c.r,c.g,c.b],i*3);}
  g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));g.setDrawRange(0,0);
  const p=new THREE.Points(g,new THREE.PointsMaterial({size:0.62,map:K1_SOFT,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true}));p.frustumCulled=false;k1Add(p);
  return {p,S,g,pos};}
function k1FogSprites(C){const a=[];for(let i=0;i<12;i++){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:K1_SOFT,color:0xb8d8c8,transparent:true,opacity:0.15,depthWrite:false}));const r=rand(3,11),an=rand(0,6.28);
    m.position.set(C.x+Math.cos(an)*r,0.9,C.z+Math.sin(an)*r);m.scale.set(rand(8,12),rand(3,4.5),1);k1Add(m);a.push({m,an,r,sp:rand(0.02,0.06)*(i%2?1:-1)});}return a;}
function k1RayTex(){const c=document.createElement('canvas');c.width=64;c.height=128;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,64,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(0.5,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=g;x.fillRect(0,0,64,128);x.globalCompositeOperation='destination-in';const v=x.createLinearGradient(0,0,0,128);v.addColorStop(0,'rgba(255,255,255,1)');v.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=v;x.fillRect(0,0,64,128);return new THREE.CanvasTexture(c);}
function k1Rays(C){const tex=k1RayTex(),a=[];[[-11,-2],[-6.5,-22],[-2,-27],[4.5,-26],[9.5,-20],[12,-6]].forEach(([x,dz],i)=>{
    const m=new THREE.Mesh(new THREE.PlaneGeometry(2.8+(i%3),24),new THREE.MeshBasicMaterial({map:tex,color:0xfff0c0,transparent:true,opacity:0.1,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));
    m.position.set(C.x+x,9,C.z+dz+2);m.rotation.z=(x<0?-1:1)*0.36;m.rotation.y=rand(-0.3,0.3);k1Add(m);m.renderOrder=5;a.push(m);});return a;}
/* ---------- листопад, лепестки и конфетти: один InstancedMesh ---------- */
const K1_LN=170,K1_M4=new THREE.Matrix4(),K1_Q2=new THREE.Quaternion(),K1_V=new V3(),K1_S=new V3(),K1_EU=new THREE.Euler();
function k1Leaves(){if(K1F.LV&&K1F.LV.im.parent)return K1F.LV;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([0,0.18,0,0.11,0,0,0,-0.18,0,-0.11,0,0],3));g.setIndex([0,1,2,0,2,3]);g.computeVertexNormals();
  const im=new THREE.InstancedMesh(g,new THREE.MeshBasicMaterial({side:THREE.DoubleSide,transparent:true,opacity:0.95}),K1_LN);im.frustumCulled=false;im.count=K1_LN;
  const L=[];for(let i=0;i<K1_LN;i++){L.push({on:false,p:new V3(),v:new V3(),spin:new V3(),r:new V3(),life:0,t:0,s:1,ph:0});K1_M4.makeScale(0,0,0);im.setMatrixAt(i,K1_M4);im.setColorAt(i,new THREE.Color(1,1,1));}
  k1Add(im);K1F.LV={im,L,i:0,col:new THREE.Color()};return K1F.LV;}
const K1_LC=[0xf6bc4c,0xe2842f,0xff8fb0,0x9acb48,0xfff3a0,0xffffff,0xf08a30];
// пригоршня листьев или лепестков из точки p
K1F.leaves=function(p,n,o){o=o||{};const S=k1Leaves();for(let j=0;j<(n||12);j++){const q=S.L[S.i++%K1_LN];q.on=true;q.p.copy(p).add(new V3(rand(-0.6,0.6),rand(-0.3,0.5),rand(-0.6,0.6)));const a=rand(0,6.28),sp=rand(1.5,4.5)*(o.spd||1);
    q.v.set(Math.cos(a)*sp,rand(2.5,7)*(o.up||1),Math.sin(a)*sp);q.spin.set(rand(-6,6),rand(-6,6),rand(-6,6));q.r.set(rand(0,6),rand(0,6),rand(0,6));q.life=rand(2.2,3.6);q.t=0;q.s=rand(0.8,1.6)*(o.size||1);q.ph=rand(0,6);
    S.col.setHex((o.cols||K1_LC)[j%(o.cols||K1_LC).length]);S.im.setColorAt(S.L.indexOf(q),S.col);}S.im.instanceColor.needsUpdate=true;};
function k1LeavesTick(dt){const S=K1F.LV;if(!S||!S.im||!S.im.parent)return;
  if(K1F.amb>0&&W.flags&&!G.cine&&Math.random()<dt*K1F.amb){const q=S.L[S.i++%K1_LN],C=K1F.C;q.on=true;q.p.set(C.x+rand(-12,12),rand(9,12),C.z+rand(-12,12));q.v.set(rand(-0.4,0.4),-rand(0.8,1.6),rand(-0.4,0.4));q.spin.set(rand(-3,3),rand(-3,3),rand(-3,3));q.r.set(rand(0,6),rand(0,6),rand(0,6));
    q.life=9;q.t=0;q.s=rand(0.8,1.4);q.ph=rand(0,6);S.col.setHex(K1_LC[(Math.random()*K1_LC.length)|0]);S.im.setColorAt(S.L.indexOf(q),S.col);S.im.instanceColor.needsUpdate=true;q.amb=true;}
  for(let i=0;i<K1_LN;i++){const q=S.L[i];if(!q.on)continue;q.t+=dt;if(q.amb){q.v.x+=Math.sin(q.t*2+q.ph)*dt*2;q.v.z+=Math.cos(q.t*1.7+q.ph)*dt*2;}else q.v.y-=9*dt;
    q.p.addScaledVector(q.v,dt);q.r.x+=q.spin.x*dt;q.r.y+=q.spin.y*dt;q.r.z+=q.spin.z*dt;
    if(q.p.y<0.06){q.p.y=0.06;q.v.set(0,0,0);q.spin.multiplyScalar(0.2);q.amb=false;}
    const k=q.t/q.life,s=k>0.75?Math.max(0,1-(k-0.75)/0.25):1;if(q.t>=q.life){q.on=false;K1_M4.makeScale(0,0,0);S.im.setMatrixAt(i,K1_M4);continue;}
    K1_EU.set(q.r.x,q.r.y,q.r.z);K1_Q2.setFromEuler(K1_EU);K1_S.setScalar(q.s*s);K1_M4.compose(q.p,K1_Q2,K1_S);S.im.setMatrixAt(i,K1_M4);}
  S.im.instanceMatrix.needsUpdate=true;}
/* ---------- телеграфы: круг и веер заполняются к удару ---------- */
function k1TeleMats(col,op){return new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,depthWrite:false,side:THREE.DoubleSide});}
const K1_DISC=new THREE.CircleGeometry(1,40),K1_RIM=new THREE.RingGeometry(0.93,1,48);
K1F.teleObj=function(x,z,r,kind){const col=K1COL[kind]||kind||K1COL.red,g=new THREE.Group();g.position.set(x,0.08,z);k1Add(g);
  const rim=new THREE.Mesh(K1_RIM,k1TeleMats(col,0.85));rim.rotation.x=-Math.PI/2;rim.scale.setScalar(r);g.add(rim);
  const fill=new THREE.Mesh(K1_DISC,k1TeleMats(col,0.3));fill.rotation.x=-Math.PI/2;fill.position.y=0.01;g.add(fill);g.traverse(c=>{c.renderOrder=6;});
  return {g,rim,fill,r,col,set(k){const kk=Math.max(0.02,Math.min(1,k));fill.scale.setScalar(r*kk);fill.material.opacity=0.2+0.32*kk;rim.material.opacity=0.55+0.4*Math.abs(Math.sin(kk*14));},
    flash(){fill.scale.setScalar(r);fill.material.opacity=0.85;K1F.anim(0.25,k=>{fill.material.opacity=0.85*(1-k);rim.material.opacity=0.85*(1-k);g.scale.setScalar(1+k*0.18);},()=>k1Del(g));},del(){k1Del(g);}};};
// круг на сек, заполняется сам
K1F.tele=function(x,z,r,dur,kind,o){o=o||{};const T=K1F.teleObj(x,z,r,kind);let done=false;K1F.anim(dur,k=>{if(done)return;if(o.follow){const p=o.follow();T.g.position.x=p.x;T.g.position.z=p.z;}T.set(k);},()=>{if(!done){done=true;T.flash();}});
  return {cancel(){done=true;T.del();}};};
// веер: центр x,z; курс dir (как у героев: atan2(dx,dz)); полуугол half; радиус r
K1F.sectorObj=function(x,z,dir,half,r,kind){const col=K1COL[kind]||kind||K1COL.red,g=new THREE.Group();g.position.set(x,0.08,z);k1Add(g);const th0=dir-Math.PI/2-half;
  const out=new THREE.Mesh(new THREE.RingGeometry(r*0.96,r,28,1,th0,half*2),k1TeleMats(col,0.85));out.rotation.x=-Math.PI/2;g.add(out);
  const fill=new THREE.Mesh(new THREE.CircleGeometry(r,28,th0,half*2),k1TeleMats(col,0.28));fill.rotation.x=-Math.PI/2;fill.position.y=0.01;g.add(fill);g.traverse(c=>{c.renderOrder=6;});
  return {g,out,fill,r,set(k){const kk=Math.max(0.02,Math.min(1,k));fill.scale.setScalar(kk);fill.material.opacity=0.28+0.42*kk;out.material.opacity=0.6+0.4*Math.abs(Math.sin(kk*14));},
    flash(){fill.scale.setScalar(1);fill.material.opacity=0.85;K1F.anim(0.25,k=>{fill.material.opacity=0.85*(1-k);out.material.opacity=0.85*(1-k);},()=>k1Del(g));},del(){k1Del(g);}};};
K1F.sector=function(x,z,dir,half,r,dur,kind){const T=K1F.sectorObj(x,z,dir,half,r,kind);let done=false;K1F.anim(dur,k=>{if(!done)T.set(k);},()=>{if(!done){done=true;T.flash();}});return {cancel(){done=true;T.del();}};};
// кольцо ростков от ладони по земле (после хлопка)
K1F.sprouts=function(x,z,r){for(let i=0;i<14;i++){const a=i/14*Math.PI*2;K1F.leaves(new V3(x+Math.cos(a)*r*0.6,0.2,z+Math.sin(a)*r*0.6),2,{up:0.35,spd:0.5,size:0.7,cols:[0x9acb48,0x6aa338,0xfff3a0]});}
  const m=new THREE.Mesh(new THREE.RingGeometry(0.9,1,40),k1TeleMats(0xb8e070,0.7));m.rotation.x=-Math.PI/2;m.position.set(x,0.1,z);k1Add(m);m.renderOrder=6;K1F.anim(0.7,k=>{m.scale.setScalar(r*(0.3+0.9*k));m.material.opacity=0.7*(1-k);},()=>k1Del(m));};
/* ---------- дорожка-хоровод: бегущие стрелки по кольцу ---------- */
function k1ArrowTex(){const c=document.createElement('canvas');c.width=128;c.height=64;const x=c.getContext('2d');x.clearRect(0,0,128,64);x.lineWidth=9;x.lineCap='round';x.lineJoin='round';x.strokeStyle='rgba(255,226,120,0.95)';
  x.beginPath();x.moveTo(34,14);x.lineTo(78,32);x.lineTo(34,50);x.stroke();x.strokeStyle='rgba(255,226,120,0.4)';x.beginPath();x.moveTo(78,14);x.lineTo(122,32);x.lineTo(78,50);x.stroke();
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;}
function k1RingGeo(r0,r1,seg,rep){const P=[],U=[],I=[];for(let i=0;i<=seg;i++){const a=i/seg*Math.PI*2,c=Math.cos(a),s=Math.sin(a);P.push(c*r0,0,s*r0,c*r1,0,s*r1);U.push(i/seg*rep,0,i/seg*rep,1);if(i<seg){const k=i*2;I.push(k,k+1,k+2,k+1,k+3,k+2);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));g.setIndex(I);return g;}
K1F.lane=function(C,r,w,dir){const tex=k1ArrowTex();tex.repeat.set(1,1);const grp=new THREE.Group();grp.position.set(C.x,0.07,C.z);k1Add(grp);
  const arrows=new THREE.Mesh(k1RingGeo(r-w/2,r+w/2,120,Math.round(2*Math.PI*r/2)),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:THREE.DoubleSide}));arrows.renderOrder=6;grp.add(arrows);
  const glow=new THREE.Mesh(k1RingGeo(r-w/2-0.2,r+w/2+0.2,96,1),new THREE.MeshBasicMaterial({color:0xffd870,transparent:true,opacity:0.16,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));glow.position.y=-0.01;glow.renderOrder=5;grp.add(glow);
  const L={g:grp,tex,dir:dir||1,show(on){grp.visible=on!==false;}};K1F.lanes=K1F.lanes||[];K1F.lanes.push(L);return L;};
/* ---------- скакалка: лиана с листьями и цветами, золотой веер впереди ---------- */
K1F.rope=function(C,len,dir){const pv=new THREE.Group();pv.position.set(C.x,0.45,C.z);k1Add(pv);dir=dir||1;
  fk(pv,K=>{const n=20,step=(len-1.2)/n;for(let i=0;i<n;i++){const x=1.2+step*(i+0.5),y=Math.sin(i*0.9)*0.06,k=i/n;
      K.add(KP.cyl(0.11-0.02*k,0.13-0.02*k,step*1.15,5),i%2?K1C.moss:K1C.mossL,tm(x,y,0,0,0,Math.PI/2),{noise:0.015});
      if(i%2===0){K.add(hIco(0.2),i%4?K1C.leaf:K1C.leafD,tm(x,y+0.1,0.12*(i%4<2?1:-1),i,0,0,1,0.55,1),{s:0.1});}
      if(i%4===1){K.add(hIco(0.13),i%8===1?K1C.pink:i%8===5?K1C.yellow:K1C.white,tm(x,y+0.26,0.06),{s:0.2});K.add(hIco(0.05),K1C.orange,tm(x,y+0.34,0.1),{kN:0});}}
    K.add(hSph(0.3,6,4),K1C.barkL,tm(len-0.1,0,0,0,0,0,1.1,0.8,0.9),{noise:0.02});},{H:2});   // узел на конце
  const sec=new THREE.Mesh(new THREE.CircleGeometry(len,24,0,0.8),k1TeleMats(0xffc83a,0.28));sec.rotation.x=-Math.PI/2;sec.position.y=-0.38;sec.scale.z=dir;pv.add(sec);sec.renderOrder=6;
  const R={g:pv,dir,sec,len,lead:1.2,th:0.8,set(angle,omega){pv.rotation.y=angle;const th=Math.max(0.05,Math.min(2.4,Math.abs(omega)*R.lead));if(Math.abs(th-R.th)>0.04){R.th=th;sec.geometry.dispose();sec.geometry=new THREE.CircleGeometry(len,24,0,th);}},show(on){pv.visible=on!==false;}};return R;};
/* ---------- ленты-нити: от рога Лешего к герою, провисают и колышутся ---------- */
K1F.ribbon=function(getA,getB,col,o){o=o||{};const N=18,P=new Float32Array((N+1)*2*3),I=[];for(let i=0;i<N;i++){const k=i*2;I.push(k,k+1,k+2,k+1,k+3,k+2);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setIndex(I);
  const m=new THREE.Mesh(g,new THREE.MeshLambertMaterial({color:col,emissive:col,emissiveIntensity:0.3,side:THREE.DoubleSide}));m.frustumCulled=false;k1Add(m);
  const R={m,g,on:true,sag:o.sag==null?1.2:o.sag,w:o.w||0.26,ph:rand(0,6),update(){const A=getA(),B=getB(),t0=G.time;if(!A||!B)return;const dx=B.x-A.x,dz=B.z-A.z,h=Math.hypot(dx,dz)||1,sx=-dz/h,sz=dx/h;
      for(let i=0;i<=N;i++){const k=i/N,wave=Math.sin(k*Math.PI*2+t0*3+R.ph)*0.18*Math.sin(k*Math.PI),x=A.x+dx*k+sx*wave,y=A.y+(B.y-A.y)*k-R.sag*Math.sin(k*Math.PI),z=A.z+dz*k+sz*wave;
        P[i*6]=x-sx*R.w;P[i*6+1]=y;P[i*6+2]=z-sz*R.w;P[i*6+3]=x+sx*R.w;P[i*6+4]=y;P[i*6+5]=z+sz*R.w;}g.attributes.position.needsUpdate=true;g.computeVertexNormals();},
    remove(){R.on=false;k1Del(m);}};K1F.ribbons.push(R);return R;};
// виток ленты на стволе Лешего (цветное кольцо); n — номер витка (кольцо выше предыдущих)
K1F.wrap=function(C,n,col){const m=new THREE.Mesh(new THREE.TorusGeometry(1.62,0.1,6,30),new THREE.MeshLambertMaterial({color:col,emissive:col,emissiveIntensity:0.3}));m.rotation.x=Math.PI/2+0.08*(n%2?1:-1);m.position.set(C.x,2.4+n*0.34,C.z);k1Add(m);
  m.scale.setScalar(1.6);K1F.anim(0.35,k=>{m.scale.setScalar(1.6-0.6*k);},null);K1F.wraps.push(m);return m;};
K1F.unwrap=function(){K1F.wraps.forEach(k1Del);K1F.wraps.length=0;};
/* ---------- фонарики на ёлках кольца ---------- */
const K1_LAMPS=[0xfff0a0,0xff9fc0,0x9fd4ff,0xb8ff98,0xffc070];
function k1Lamps(carousel){const arr=[];carousel.children.forEach((f,i)=>{const px=f.position.x,pz=f.position.z,len=Math.hypot(px,pz)||1,col=K1_LAMPS[i%K1_LAMPS.length];const g=new THREE.Group();g.position.set(-px/len*1.05,2.3,-pz/len*1.05);g.scale.setScalar(0);g.visible=false;f.add(g);
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.34,10,8),new THREE.MeshBasicMaterial({color:col})));const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:K1_SOFT,color:col,transparent:true,opacity:0.8,blending:THREE.AdditiveBlending,depthWrite:false}));gl.scale.setScalar(4.6);g.add(gl);
    const cap=new THREE.Mesh(new THREE.ConeGeometry(0.28,0.22,8),new THREE.MeshLambertMaterial({color:0x5a3d22}));cap.position.y=0.36;g.add(cap);g.userData.noBatch=true;g.traverse(c=>{c.userData.noBatch=true;c.userData.noBatchL=true;if(c.isSprite)c.raycast=()=>{};});arr.push({g,on:false});});return arr;}
K1F.lamp=function(i,on){const L=K1F.lamps[i];if(!L||L.on===on)return;L.on=on;if(on)L.g.visible=true;K1F.anim(0.4,k=>{const s=on?(k<0.7?k/0.7*1.25:1.25-0.25*(k-0.7)/0.3):1-k;L.g.scale.setScalar(Math.max(0,s));},()=>{if(!on)L.g.visible=false;});};
K1F.lampsOn=function(n,gap){for(let i=0;i<K1F.lamps.length;i++)if(i<n)later(i*(gap||0.1),()=>K1F.lamp(i,true));};
/* ---------- камера арены: дальше и выше, Леший целиком ---------- */
K1F.CP={p1:{ly:6.2,oy:12.5,oz:24,lz:-5.5,uy:1.8,uo:1,uz:0,ul:-3},p2:{ly:3.2,oy:12.5,oz:20,lz:-1},p3:{ly:5.4,oy:14,oz:22.5,lz:-1}};
K1F.up=0;
K1F.cam=function(){const c=K1F.ctx;if(!c)return null;const F=W.flags,C=c.C,CP=K1F.CP,a=G.solo?active(G.soloPi):active(0),b=G.solo?a:active(1),mid=new V3((a.pos.x+b.pos.x)/2,0,(a.pos.z+b.pos.z)/2);let look,off;
  if(F.phase===3){const P=CP.p3;look=new V3(lerp(C.x,mid.x,0.25),P.ly,lerp(C.z-1,mid.z,0.25));off=new V3(0,P.oy,P.oz);}
  else if(F.phase>=1.5&&F.phase<3){const P=CP.p2;look=new V3(lerp(C.x,mid.x,0.3),P.ly,lerp(C.z-1,mid.z,0.3));off=new V3(0,P.oy,P.oz);}
  else{const P=CP.p1,hy=Math.max(a.pos.y,b.pos.y);K1F.up+=(clamp((hy-1.5)/3.5,0,1)-K1F.up)*0.06;const u=K1F.up;   // герои лезут на плечо — камера поднимается и смотрит на голову
    look=new V3(lerp(C.x,mid.x,0.3),P.ly+P.uy*u,lerp(C.z+P.lz,mid.z,0.35)+P.ul*u);off=new V3(0,P.oy+P.uo*u,P.oz+P.uz*u);}
  if(typeof BS!=='undefined'&&BS&&BS.zoom)off.multiplyScalar(1-0.2*BS.zoom);return {pos:look.clone().add(off),look,k:3};};
/* ---------- мох-следы настоящего двойника и клубы дыма ---------- */
const K1_PN=36;
// зелёная кучка мха на земле: тает за 4,5 с
K1F.print=function(x,z){if(!K1F.prints){K1F.prints={list:[],i:0};for(let i=0;i<K1_PN;i++){const m=new THREE.Mesh(new THREE.CircleGeometry(0.42,7),new THREE.MeshBasicMaterial({color:i%2?0x8fd05a:0x6cb040,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));
      m.rotation.x=-Math.PI/2;m.visible=false;m.renderOrder=4;k1Add(m);K1F.prints.list.push({m,t:99});}}
  const P=K1F.prints,q=P.list[P.i++%K1_PN];q.t=0;q.m.visible=true;q.m.position.set(x+rand(-0.25,0.25),0.06,z+rand(-0.25,0.25));q.m.rotation.z=rand(0,6);q.m.scale.setScalar(rand(0.8,1.2));};
function k1PrintTick(dt){const P=K1F.prints;if(!P)return;for(const q of P.list){if(q.t>=99)continue;q.t+=dt;if(q.t>=4.5){q.m.visible=false;q.t=99;continue;}q.m.material.opacity=0.7*Math.min(1,q.t*4)*(1-q.t/4.5);}}
// клуб дыма: n мягких облачков расходятся и тают (двойник запутался, обменялись местами)
K1F.puff=function(x,y,z,n,col){for(let i=0;i<(n||5);i++){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:K1_SOFT,color:col||0xc8e8c0,transparent:true,opacity:0.7,depthWrite:false}));m.position.set(x,y,z);m.scale.setScalar(1.2);k1Add(m);
    const v=new V3(rand(-1.6,1.6),rand(0.4,1.6),rand(-1.6,1.6)),s0=rand(1.6,2.6);K1F.anim(rand(0.7,1.1),k=>{m.position.set(x+v.x*k,y+v.y*k,z+v.z*k);m.scale.setScalar(s0*(0.5+k*1.4));m.material.opacity=0.7*(1-k);},()=>k1Del(m));}
  try{tone(rand(220,300),0.12,'sine',0.06,rand(90,130));}catch(e){}};
/* ---------- запуск уровня ---------- */
K1F.reset=function(){K1F.prints=null;K1F.q.length=0;K1F.ribbons.length=0;K1F.lamps=[];K1F.LV=null;K1F.ff=null;K1F.fog=[];K1F.rays=[];K1F.ctx=null;K1F.cur=null;K1F.tgt=null;K1F.ph=null;K1F.hT=new Map();K1F.wraps=[];K1F.amb=0;K1F.demoO=null;K1F.lanes=null;K1F.up=0;};
K1F.init=function(ctx){K1F.reset();K1F.ctx=ctx;const C=ctx.C;K1F.C=C;K1F.ff=k1Fireflies(C);K1F.fog=k1FogSprites(C);K1F.rays=k1Rays(C);K1F.lamps=k1Lamps(ctx.carousel);
  K1F.mood('dusk',0);W.camFn=K1F.cam;};
// настроение по этапу, зрители реагируют; телеграфы ладоней; тик анимаций
function k1PhaseWatch(){const F=W.flags,c=K1F.ctx;if(!c)return;const key=F.won?'won':F.phase;if(K1F.ph===key)return;const was=K1F.ph;K1F.ph=key;
  if(key===0||key===1){K1F.mood('dusk',was==null?0:2.5);K1F.amb=0;if(key===1&&K1B.music)K1B.music('k1b1');}
  else if(key===1.5||key===2){K1F.mood('night',3);K1F.amb=0;if(key===1.5)K1B.cheer('duck',1.6);if(key===2&&K1B.music)K1B.music('k1b2');}
  else if(key===3){K1F.mood('fair',3);K1F.amb=2.5;K1B.cheer('clap',7);}   // фонарики зажигаются по виткам (late_99zb_k1b_hoorovod.js)
  else if(key==='won'){K1F.mood('dawn',4);K1F.amb=4;K1F.leaves(new V3(K1F.C.x,6,K1F.C.z),60,{spd:2,up:1.4,size:1.4});K1B.cheer('clap',10);}}
function k1HandTele(dt){const c=K1F.ctx;if(!c)return;const N=K1B.hands;for(const e of W.enemies){if(e.kind!=='hand')continue;let T=K1F.hT.get(e);
    if(e.state==='wind'&&e.alive){const red=e.sig==='red',kind=red?'red':'yellow';   // жёлтая — круг зоны удара, красная — веер перед ладонью (курс запирается на 60 % замаха)
      if(!T||T.kind!==kind||!T.o.g.parent){if(T)T.o.del();T={o:red?K1F.sectorObj(e.pos.x,e.pos.z,0,N?N.fanHalf:0.8,e.r+(N?N.fanExtra:3.4),'red'):K1F.teleObj(e.pos.x,e.pos.z,e.r+2.0,'yellow'),kind,red};K1F.hT.set(e,T);}
      T.o.g.position.x=e.pos.x;T.o.g.position.z=e.pos.z;if(T.red)T.o.g.rotation.y=e.face;T.o.set(clamp(e.t/Math.max(0.05,e.wdur),0,1));T.live=true;}
    else if(T&&T.live){T.live=false;if(e.state==='strike'||e.state==='recover'||e.state==='idle'||e.state==='chase'||e.state==='stagger'){T.o.flash();}else T.o.del();K1F.hT.delete(e);}}}
{const _ll=loadLevel;loadLevel=function(i){K1F.reset();_ll(i);};}
{const _st=step;step=function(dt){_st(dt);if(!K1F.ctx||!W||W.levelId!=='1-B')return;try{
    k1MoodTick(dt);k1PhaseWatch();k1HandTele(dt);k1LeavesTick(dt);k1PrintTick(dt);
    for(let i=K1F.q.length-1;i>=0;i--){const a=K1F.q[i];a.t+=dt;const k=Math.min(1,a.t/a.dur);if(a.fn)a.fn(k);if(k>=1){if(a.end)a.end();K1F.q.splice(i,1);}}
    const t=G.time,C=K1F.C,cur=K1F.cur;
    if(K1F.ff&&cur){const F=K1F.ff,n=Math.round(cur.ff);F.g.setDrawRange(0,n);for(let i=0;i<n;i++){const s=F.S[i],a=s.a+t*s.sp;F.pos[i*3]=C.x+Math.cos(a)*s.r;F.pos[i*3+1]=s.y+Math.sin(t*s.w+s.ph)*0.45;F.pos[i*3+2]=C.z+Math.sin(a)*s.r;}F.g.attributes.position.needsUpdate=true;}
    if(cur){K1F.fog.forEach(s=>{s.an+=dt*s.sp;s.m.position.x=C.x+Math.cos(s.an)*s.r;s.m.position.z=C.z+Math.sin(s.an)*s.r;s.m.material.color.copy(cur.tint);s.m.material.opacity=cur.fogA;});
      K1F.rays.forEach((m,i)=>{m.material.opacity=0.12*cur.rays*(0.75+0.25*Math.sin(t*0.4+i*1.7));});}
    for(const R of K1F.ribbons)if(R.on)R.update();
    if(K1F.lanes)for(const L of K1F.lanes)if(L.g.visible)L.tex.offset.x-=dt*0.5*L.dir;
    }catch(e){console.error('k1fx',e);K1F.ctx=null;W.camFn=null;}};}
/* ---------- показать детали этапа 3 для проверки (бот, кадры): ZC.FIN.k1b.fx.demo(true) ---------- */
K1F.demo=function(on){const c=K1F.ctx;if(!c)return;if(!on){const D=K1F.demoO;if(D){c.carousel.visible=false;c.L.g.visible=false;D.lane.g.visible=false;D.rope.g.visible=false;D.rb.forEach(r=>r.remove());K1F.unwrap();K1F.demoO=null;}return;}
  const C=c.C,lane=K1F.lane(C,6,1.6,1),rope=K1F.rope(C,8,1),rb=[];K1F.mood('fair',0);c.carousel.visible=true;c.L.g.visible=true;K1F.lampsOn(14,0.02);K1B.bloom(c.L,true);K1F.amb=2.5;
  const hs=[active(0),active(1)];hs.forEach((h,i)=>{rb.push(K1F.ribbon(()=>new V3(C.x+(i?1:-1)*3.4,8.6,C.z+0.2),()=>new V3(h.pos.x,h.pos.y+1.1,h.pos.z),i?0x4ab0ff:0xff8a3a,{sag:1.6}));});
  K1F.wrap(C,0,0xff8a3a);K1F.wrap(C,1,0x4ab0ff);K1F.wrap(C,2,0xff8a3a);K1F.demoO={lane,rope,rb};
  K1F.anim(9999,k=>{rope.set(G.time*0.6,0.6);},null);return K1F.demoO;};
