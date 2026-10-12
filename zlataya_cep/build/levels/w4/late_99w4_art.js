/* ============================== МИР 4 · АРТ И ЭФФЕКТЫ (docs/39, АР.1–АР.9) ============================== */
// АР.1 цветовой сценарий: у каждого уровня свой свет и небо (W4PAL; тема прототипа остаётся — правится после загрузки уровня):
//   4-1 горн и холодный голубой свет корыта · 4-2 день над рекой · 4-3 закат, лилово-розовое небо · 4-4 осень, охра · 4-5 дым и красное небо · 4-Б ночь.
// АР.2 кромка: у края земли над лавой — тёмная застывшая корка и светящаяся полоса, над ней дрожит марево (спрайты).
// АР.3 вехи: на горизонте всегда видна гора Горыныча (впереди) и Калинов мост (справа) — куда идём и что впереди.
// АР.4 кузнецы (late_17_cast2): оживая, светятся трещинами по камню.
// АР.5 остывание по стадиям: 100–50 % — свечение, 50–20 % — дымок, меньше 20 % — серый цвет и «тик».
// АР.6 лава: пузыри с хлопком; у струй (L.flow) — бегущие полосы по течению.
// АР.7 корка: при появлении — столб пара и шипение; последние 3 с — трещины со звуком.
// АР.8 ковка (4-1): точный удар — hit-stop и нота; закалка — пар и шипение; кольцо-волна по всему цеху (proto: W.fx4).
// АР.9 мелочи: 4-3 лямка натягивается и скрипит, пыль из-под баржи; 4-4 «голова» лавы у фронта, комья за плугом; 4-5 цепи скрипят и дрожат в такт качанию.
// W.fx4(вид, точка) — хук прототипа для звуков и эффектов, которых в прототипе нет; FIN.w4art.log — для ботов (tfin_w4art).
const W4A={log:[],n:{}};FIN.w4art=W4A;
const w4aLog=k=>{W4A.n[k]=(W4A.n[k]||0)+1;if(W4A.log.length<200)W4A.log.push(k);};
{const P={'4-1':{grade:[[255,170,110,.16],[20,30,70,.2],1.45]},
  '4-2':{bg:0x6a4a44,fog:[0x6e4e46,26,100],amb:[0xfff0e0,0.62],sun:[0xfff0d8,0.9],grade:[[255,240,220,.12],[60,40,30,.16],1.36]},
  '4-3':{bg:0x5a3456,fog:[0x6a3a5a,24,95],amb:[0xffc0d0,0.56],sun:[0xffa890,0.75],sunOff:[-24,12,6],grade:[[255,160,200,.18],[70,30,100,.2],1.4]},
  '4-4':{bg:0x6a5038,fog:[0x6e5440,30,115],amb:[0xfff0c8,0.62],sun:[0xffd090,0.85],grade:[[255,215,140,.16],[70,60,20,.16],1.38]},
  '4-5':{bg:0x4a2c3a,fog:[0x523444,22,90],amb:[0xe8b8c8,0.54],sun:[0xff8a70,0.7],grade:[[255,110,80,.18],[60,40,80,.22],1.42]},
  '4-B':{bg:0x140a16,fog:[0x1c0e1a,26,95],amb:[0xc8a0d0,0.46],sun:[0xff9070,0.55],grade:[[130,100,220,.14],[70,10,10,.24],1.5]}};W4A.PAL=P;
  const rg=a=>'rgba('+a[0]+','+a[1]+','+a[2]+','+a[3]+')';
  W4A.palette=function(){const p=P[W&&W.levelId];if(!p||W.world!==4)return;
    if(p.bg!=null&&scene.background&&scene.background.isColor)scene.background.setHex(p.bg);
    if(p.fog&&scene.fog){scene.fog.color.setHex(p.fog[0]);scene.fog.near=p.fog[1];scene.fog.far=p.fog[2];}
    if(p.amb){amb.color.setHex(p.amb[0]);amb.intensity=p.amb[1];}if(p.sun){sun.color.setHex(p.sun[0]);sun.intensity=p.sun[1];}
    if(p.sunOff){const o=new V3(...p.sunOff),hz=Math.hypot(o.x,o.z)||1,L=Math.max(24,o.length());W.sunOff=new V3(o.x/hz*L*0.7071,L*0.42,o.z/hz*L*0.7071);}
    const g=p.grade,el=$('finGrade');if(g&&el){el.style.background='linear-gradient(180deg,'+rg(g[0])+',rgba(255,255,255,0) 45%,'+rg(g[1])+')';FIN.exposure=1+(g[2]-1.4)*0.55;renderer.toneMappingExposure=FIN.exposure;}
    if(W.levelId==='4-1'){const l=new THREE.PointLight(0x6ab8ff,1.3,7,2);l.position.set(4.6,1.4,-14.2);W.group.add(l);W4A.trough=l;}   // голубой свет корыта против оранжевого горна
    w4aLog('pal:'+W.levelId);};}
// ---------- АР.2: кромка у лавы и марево ----------
function w4aRim(){if(W.world!==4||W.levelId==='4-B'||!W.lavas.length)return;const P=[],C=[],hz=[];const cG=new THREE.Color(0xff7a2a),cD=new THREE.Color(0x2a1a16);
  const quad=(x0,z0,x1,z1,nx,nz,y,w,c)=>{const ax=x0+nx*w,az=z0+nz*w,bx=x1+nx*w,bz=z1+nz*w;P.push(x0,y,z0,x1,y,z1,bx,y,bz,x0,y,z0,bx,y,bz,ax,y,az);for(let i=0;i<6;i++)C.push(c.r,c.g,c.b);};
  for(const b of W.boxes){if(!b.on||b.pass||b.maxx-b.minx<1.2||b.maxz-b.minz<1.2||b.maxy-b.miny<0.3)continue;const y=b.maxy;
    const edges=[[b.minx,b.maxz,b.minx,b.minz,1,0,-1,0],[b.maxx,b.minz,b.maxx,b.maxz,-1,0,1,0],[b.minx,b.minz,b.maxx,b.minz,0,1,0,-1],[b.maxx,b.maxz,b.minx,b.maxz,0,-1,0,1]];
    for(const[x0,z0,x1,z1,nx,nz,ox,oz]of edges){const len=Math.hypot(x1-x0,z1-z0),n=Math.max(1,Math.round(len/0.5));let run=-1;
      const flush=(i)=>{if(run<0)return;const a=run/n,c=i/n,ax=lerp(x0,x1,a),az=lerp(z0,z1,a),cx=lerp(x0,x1,c),cz=lerp(z0,z1,c);quad(ax,az,cx,cz,nx,nz,y+0.025,0.16,cG);quad(ax+nx*0.16,az+nz*0.16,cx+nx*0.16,cz+nz*0.16,nx,nz,y+0.03,0.22,cD);
        if(hz.length<40)for(let s=a;s<c;s+=0.18*Math.max(1,len/6)/len*6)hz.push(new V3(lerp(x0,x1,s)+ox*0.35,y+0.4,lerp(z0,z1,s)+oz*0.35));run=-1;};
      for(let i=0;i<n;i++){const s=(i+0.5)/n,x=lerp(x0,x1,s)+ox*0.35,z=lerp(z0,z1,s)+oz*0.35;const L=lavaAt(x,z),g=groundAt(x,z,y+0.5,0);const lava=!!L&&g.y<y-0.3;
        if(lava&&run<0)run=i;if(!lava)flush(i);}flush(n);}}
  if(!P.length)return;const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3));geo.setAttribute('color',new THREE.Float32BufferAttribute(C,3));
  const m=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.DoubleSide}));m.renderOrder=1;W.group.add(m);W.w4rim=m;
  // марево: дрожащие прозрачные спрайты над краем
  const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d'),gr=q.createRadialGradient(32,32,2,32,32,32);gr.addColorStop(0,'rgba(255,190,120,0.5)');gr.addColorStop(1,'rgba(255,120,40,0)');q.fillStyle=gr;q.fillRect(0,0,64,64);
  const tex=new THREE.CanvasTexture(c),H=hz.slice(0,40).map((p,i)=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:0.18}));s.position.copy(p);s.scale.set(1.4,1.0,1);W.group.add(s);return {s,p:p.clone(),o:i*0.7};});
  W.w4haze=H;W.updates.push(dt=>{for(const h of H){const k=(G.time*0.4+h.o)%1;h.s.position.set(h.p.x+Math.sin(G.time*3+h.o)*0.08,h.p.y+k*0.9,h.p.z);h.s.material.opacity=0.2*Math.sin(Math.PI*k);h.s.scale.set(1.4+0.3*Math.sin(G.time*5+h.o),1+k*0.6,1);}});
  w4aLog('rim');}
// ---------- АР.3: вехи на горизонте — гора Горыныча и Калинов мост ----------
function w4aMarks(){if(W.world!==4||W.levelId==='4-1'||W.levelId==='4-B')return;const dk=MB(0x2a1418,{fog:false,depthTest:false}),glow=MB(0xff6a2a,{fog:false,depthTest:false});
  const mt=new THREE.Group();const cone=new THREE.Mesh(new THREE.ConeGeometry(34,46,7,1,true),dk);cone.position.y=23;mt.add(cone);const cr=new THREE.Mesh(new THREE.CylinderGeometry(6,7,2,10),glow);cr.position.y=45.5;mt.add(cr);
  for(const s of[-1,1]){const sh=new THREE.Mesh(new THREE.ConeGeometry(16,24,6,1,true),dk);sh.position.set(s*26,10,6);mt.add(sh);}
  const smoke=[];for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(5,8,6),MB(0x4a3a40,{fog:false,depthTest:false,transparent:true,opacity:0.4}));mt.add(m);smoke.push(m);}
  mt.traverse(m=>{m.renderOrder=-19;m.frustumCulled=false;});
  const br=new THREE.Group();const arc=new THREE.Mesh(new THREE.TorusGeometry(26,1.6,5,24,Math.PI),dk);br.add(arc);const deck=new THREE.Mesh(new THREE.BoxGeometry(56,1.2,3),dk);deck.position.y=4;br.add(deck);
  for(let i=-3;i<=3;i++){const p=new THREE.Mesh(new THREE.BoxGeometry(0.8,Math.max(1,24-Math.abs(i)*7),0.8),dk);p.position.set(i*7,Math.max(4,22-Math.abs(i)*7)/2+2,0);br.add(p);}
  br.traverse(m=>{m.renderOrder=-19;m.frustumCulled=false;});
  const pos=(g,ang,R,y)=>{g.onBeforeRender=null;g.userData={ang,R,y};W.group.add(g);};pos(mt,0.32,250,-28);if(W.levelId!=='4-5')pos(br,-0.62,240,-6);
  W.w4marks=[mt,br];W.updates.push(()=>{const c=camS.position;for(const g of W.w4marks){if(!g.parent)continue;const u=g.userData;g.position.set(c.x+Math.sin(Math.PI+u.ang)*u.R,c.y+u.y,c.z+Math.cos(Math.PI+u.ang)*u.R);g.lookAt(c.x,g.position.y,c.z);}
    smoke.forEach((m,i)=>{const k=(G.time*0.05+i/6)%1;m.position.set(Math.sin(i*2.1)*3+k*14,48+k*40,0);m.scale.setScalar(1+k*2.4);m.material.opacity=0.45*Math.sin(Math.PI*k);});});
  w4aLog('marks');}
// ---------- АР.6: пузыри на лаве и полосы течения ----------
function w4aLava(){if(W.world!==4||!W.lavas.length)return;const bub=[],bm=MB(0xffb050,{transparent:true});for(let i=0;i<10;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.22,8,6,0,Math.PI*2,0,Math.PI/2),bm.clone());m.visible=false;W.group.add(m);bub.push({m,t:9});}
  const strips=[];for(const L of W.lavas){if(!L.flow)continue;const c=document.createElement('canvas');c.width=16;c.height=64;const q=c.getContext('2d');for(let y=0;y<64;y+=16){q.fillStyle='rgba(255,230,140,0.55)';q.fillRect(0,y,16,5);}
    const tex=new THREE.CanvasTexture(c);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;const w=L.maxx-L.minx,d=L.maxz-L.minz;tex.repeat.set(w/2,d/2);
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:0.35,depthWrite:false,blending:THREE.AdditiveBlending}));m.rotation.x=-Math.PI/2;m.position.set((L.minx+L.maxx)/2,L.y+0.04,(L.minz+L.maxz)/2);m.renderOrder=2;W.group.add(m);
    const fl=Math.hypot(L.flow.x,L.flow.z)||1;tex.rotation=Math.atan2(L.flow.x,-L.flow.z);strips.push({tex,v:fl});}
  W.w4strips=strips;
  W.updates.push(dt=>{for(const s of strips){s.tex.offset.y-=dt*s.v*0.25;}
    const c=camS.position;for(const b of bub){if(b.t<1){b.t+=dt*1.4;const k=b.t;b.m.scale.setScalar(0.4+k*1.2);b.m.material.opacity=1-k*0.6;if(k>=1){b.m.visible=false;burst(b.m.position.clone(),0xffa040,4,1.8,0.5);w4aLog('pop');if(AUD.ready()&&hd(b.m.position,c)<16)AUD.nz({type:'lowpass',f0:420,d:0.12,v:0.05});}continue;}
      if(Math.random()<dt*0.9){const L=W.lavas[Math.floor(Math.random()*W.lavas.length)];const x=rand(Math.max(L.minx,c.x-12),Math.min(L.maxx,c.x+12)),z=rand(Math.max(L.minz,c.z-16),Math.min(L.maxz,c.z+4));
        if(!(x>L.minx&&x<L.maxx&&z>L.minz&&z<L.maxz))continue;const g=groundAt(x,z,L.y+0.5,0);if(g.y>L.y-0.2)continue;b.t=0;b.m.visible=true;b.m.position.set(x,L.y+0.02,z);}}});}
// ---------- АР.4 + АР.5 + АР.7: обёртки общих функций мира 4 ----------
{const _hv=heatVis;heatVis=function(it){_hv(it);if(it.gold||W.world!==4)return;const h=it.heat,st=h>0.5?2:h>0.2?1:0;
    if(st===1&&!it.carrier&&Math.random()<0.04)burst(it.pos.clone().add(new V3(0,0.35,0)),0x9a9aa4,1,0.8,0.9);
    if(st===0&&h>0){it.m.color.setHex(0x6a6a72);it.m.emissiveIntensity=0.02;}
    if(it._st===1&&st===0){w4aLog('tick');if(W.fx4)W.fx4('cool',it.pos.clone());tone(1900,0.05,'square',0.05);tone(1500,0.05,'square',0.04,null,0.09);floatText(it.pos.clone().add(new V3(0,0.7,0)),'Остывает!','#c8d0e0');}
    if(it._st!=null&&it._st!==st)w4aLog('heat'+st);it._st=st;};}
{const _ca=crustAt;crustAt=function(x,z,y,ang,o){const c=_ca(x,z,y,ang,o);if(W.world===4){w4aLog('steam');for(let i=0;i<3;i++)later(i*0.12,()=>burst(new V3(x+rand(-0.3,0.3),y+0.4+i*0.5,z+rand(-0.5,0.5)),0xeef4ff,6,1.6,1.1));
      if(AUD.ready())AUD.nz({type:'highpass',f0:2600,f1:5200,d:0.7,v:0.05});}return c;};}
function w4aCrustTick(){for(const c of W.crusts){if(c.gone||c.cracks)continue;if(c.t<3){c.cracks=true;w4aLog('crack');const m=MB(0x140808);for(let i=0;i<4;i++){const k=addMesh(new THREE.BoxGeometry(0.04,0.02,rand(0.5,1.1)),m,rand(-0.4,0.4),0.15,rand(-0.6,0.6),c.g);k.rotation.y=rand(-1.2,1.2);}
    tone(320,0.08,'square',0.05);later(0.15,()=>tone(260,0.08,'square',0.04));if(AUD.ready())AUD.nz({type:'bandpass',f0:900,q:3,d:0.25,v:0.05});}}}
{const _ms=makeSmith;makeSmith=function(kind,stone){const S=_ms(kind,stone);const cm=MB(0xff8a2a,{transparent:true,opacity:0,depthWrite:false}),cr=new THREE.Group();(S.g||S.root||S).add?((S.g||S.root||S).add(cr)):null;
    for(let i=0;i<9;i++){const k=new THREE.Mesh(new THREE.BoxGeometry(0.035,rand(0.4,0.9),0.035),cm);k.position.set(rand(-0.45,0.45),rand(0.5,2.4),0.52+rand(-0.05,0.05));k.rotation.z=rand(-0.9,0.9);cr.add(k);}
    const _s=S.setStone;S.setStone=function(k){_s.call(S,k);cm.opacity=k>0.02&&k<0.98?Math.min(1,Math.sin(Math.PI*k)*1.6):0;if(cm.opacity>0.5&&!S._crk){S._crk=true;w4aLog('smithcrack');}};return S;};}
// ---------- W.fx: звуки и эффекты для прототипа (ковка, лямка, цепи) ----------
function w4aFx(kind,p){w4aLog('fx:'+kind);const ok=AUD.ready();
  if(kind==='strike'){G.hitstop=Math.max(G.hitstop||0,0.06);}
  else if(kind==='temper'){for(let i=0;i<5;i++)later(i*0.1,()=>burst(p.clone().add(new V3(rand(-0.4,0.4),0.4+i*0.35,rand(-0.3,0.3))),0xeef4ff,6,1.4,1.2));if(ok)AUD.nz({type:'highpass',f0:2400,f1:6000,d:1.0,v:0.07});}
  else if(kind==='ringwave'){ringFx(p,0xffd76a,14);later(0.25,()=>ringFx(p,0xffe9a0,20));if(ok)AUD.bell(1320,{v:0.07,d:2.2});}
  else if(kind==='rope'){if(ok)AUD.nz({type:'bandpass',f0:380,f1:240,q:8,d:0.4,v:0.05});}
  else if(kind==='chain'){if(ok)AUD.nz({type:'bandpass',f0:520,f1:300,q:7,d:0.5,v:0.05});}}
// ---------- 4-5: цепи дрожат в такт качанию ----------
function w4aChains(dt){const C=W.chainL,HD=W.HD;if(!C||!HD||W.flags.stage!=='hold')return;const a=Math.abs(HD.sway);
  for(const c of C){if(!c.q0)c.q0=c.m.quaternion.clone();const w=a*0.035*Math.sin(G.time*18+c.x);c.m.quaternion.copy(c.q0).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(w,0,w*0.6)));}
  if(a>0.6&&!W4A.chainHi){W4A.chainHi=true;w4aFx('chain');}else if(a<0.4)W4A.chainHi=false;}
{const _ll=loadLevel;loadLevel=function(i){_ll(i);if(!W||W.world!==4)return;W.fx4=w4aFx;W4A.palette();try{w4aRim();w4aMarks();w4aLava();}catch(e){console.error(e);}W4A.chainHi=false;
  W.updates.push(dt=>{w4aCrustTick();w4aChains(dt);});};}
