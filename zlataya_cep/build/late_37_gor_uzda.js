/* ============================== РЕЛИЗ final06 · 4-Б «ЗМЕЙ ГОРЫНЫЧ», ФАЗА 3: ОГНЕННАЯ УЗДА, ЗОЛОТОЙ ОРЕОЛ, «РАЗ-ДВА-ТРИ» ============================== */
// По отзыву и видео-референсу (герои несут узду клещами к золотому ореолу над шеей средней головы):
// - узда — широкое огненное кольцо: красно-оранжевый пояс с золотым узором, светлые ободки, язычки пламени, угольки, свечение;
//   в фазе 3 лежит (на подставке или упала в поле) — над ней столб огненного света и пятно на полу: видно с любого края арены;
// - место на шее — золотой ореол с бегущими искрами-рунами, столб света до неба и круг на полу (зона, где надевают узду);
//   чем ближе узда, тем ярче ореол и чаще он пульсирует; пока узду несут — от неё к кругу по полу бегут золотые стрелки;
// - у шеи «раз-два-три»: умение нажимают три раза — вдвоём каждый счёт засчитывается, когда нажали оба (порядок любой),
//   в одиночку — одно нажатие на счёт. Над ореолом три огонька: счёт зажигает огонёк, узда поднимается к ореолу на треть;
//   на «три» узда надевается. Разошлись или вышли из круга — счёт сначала;
// - у шеи ореол закрывает средняя голова — поэтому счёт «Раз · Два · Три» и кто уже нажал крупно дублируются на экране;
// - в полоске босса — сколько ещё головы без сил. Само время — в rep_30 (вдвое дольше: 50 с вместо 25).
// Логика узды прототипа (клещи, переноска, падение) не меняется; облик прототипа (тонкий тор) спрятан.
const UZ={gy:0,hud:null,beat:0,got:[false,false],lift:0,vis:null,flash:0,hot:0,ember:0,demo:-1,stats:{beats:0,resets:0,wins:0}};FIN.uzda=UZ;
const UZ_GOLD=0xffd76a;
const uzOn=()=>W&&W.levelId==='4-B'&&W.gor4L&&W.flags;
// ---------- текстуры: пояс узды с узором, мягкое пятно, вертикальный градиент столба ----------
const UZ_TEX=(()=>{const c=document.createElement('canvas');c.width=512;c.height=64;const x=c.getContext('2d');
  const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,'#ff9a3a');g.addColorStop(0.5,'#e83a12');g.addColorStop(1,'#ff9a3a');x.fillStyle=g;x.fillRect(0,0,512,64);
  x.fillStyle='#ffe58a';x.fillRect(0,3,512,4);x.fillRect(0,57,512,4);   // золотые ободки
  x.strokeStyle='#ffe58a';x.lineWidth=3;
  for(let i=0;i<8;i++){const cx=32+i*64;   // розетка и завитки между ними
    x.beginPath();x.arc(cx,32,13,0,Math.PI*2);x.stroke();x.beginPath();for(let k=0;k<8;k++){const a=k/8*Math.PI*2;x.moveTo(cx,32);x.lineTo(cx+Math.cos(a)*10,32+Math.sin(a)*10);}x.stroke();
    x.beginPath();x.moveTo(cx+18,32);x.quadraticCurveTo(cx+26,14,cx+32,32);x.quadraticCurveTo(cx+38,50,cx+46,32);x.stroke();}
  const t=new THREE.CanvasTexture(c);t.wrapS=THREE.RepeatWrapping;return t;})();
const UZ_GLOW=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);
  g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.25,'rgba(255,255,255,0.65)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c);})();
const UZ_BEAM=(()=>{const c=document.createElement('canvas');c.width=4;c.height=128;const x=c.getContext('2d');const g=x.createLinearGradient(0,128,0,0);
  g.addColorStop(0,'rgba(255,255,255,0.95)');g.addColorStop(0.25,'rgba(255,255,255,0.5)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,4,128);return new THREE.CanvasTexture(c);})();
const UZ_PATH=(()=>{const c=document.createElement('canvas');c.width=64;c.height=64;const x=c.getContext('2d');   // шеврон остриём вверх: светлый, с тёмной обводкой
  const ch=()=>{x.beginPath();x.moveTo(10,46);x.lineTo(32,20);x.lineTo(54,46);};x.lineJoin='round';x.lineCap='round';
  ch();x.strokeStyle='rgba(58,22,6,0.85)';x.lineWidth=18;x.stroke();ch();x.strokeStyle='#ffe27a';x.lineWidth=10;x.stroke();ch();x.strokeStyle='#fffbe8';x.lineWidth=4;x.stroke();
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;})();
function uzMat(col,o){return new THREE.MeshBasicMaterial(Object.assign({color:col,transparent:true,depthWrite:false,fog:false,toneMapped:false},o||{}));}
function uzTag(o){o.traverse(q=>{q.userData.noBatch=true;q.userData.occEx=true;q.castShadow=false;q.frustumCulled=false;});return o;}
function uzBeam(col,r,h){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r*1.25,h,20,1,true),uzMat(col,{map:UZ_BEAM,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,opacity:0.7}));m.position.y=h/2;m.renderOrder=6;return m;}
function uzGlow(col,s){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:UZ_GLOW,color:col,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,toneMapped:false}));sp.scale.setScalar(s);sp.renderOrder=7;return sp;}
function uzDisc(col,r){const m=new THREE.Mesh(new THREE.CircleGeometry(r,40),uzMat(col,{map:UZ_GLOW,blending:THREE.AdditiveBlending,opacity:0.6}));m.rotation.x=-Math.PI/2;m.renderOrder=5;return m;}
// ---------- облик: узда, ореол с кругом на полу, стрелки дорожки ----------
function uzBuild(){const L=W.gor4L,g=W.group;
  // узда: пояс с узором (две стороны), светлые ободки, язычки пламени, свечение; столб света и пятно на полу — пока лежит
  const br=new THREE.Group(),ring=new THREE.Group();br.add(ring);
  const band=new THREE.Mesh(new THREE.CylinderGeometry(0.62,0.62,0.3,40,1,true),uzMat(0xffffff,{map:UZ_TEX,side:THREE.DoubleSide,transparent:false,depthWrite:true}));ring.add(band);
  for(const y of[-0.16,0.16]){const m=new THREE.Mesh(new THREE.TorusGeometry(0.62,0.035,6,40),uzMat(0xfff1b0,{transparent:false,depthWrite:true}));m.rotation.x=Math.PI/2;m.position.y=y;ring.add(m);}
  const core=new THREE.Mesh(new THREE.TorusGeometry(0.62,0.16,8,40),uzMat(0xff8a2a,{blending:THREE.AdditiveBlending,opacity:0.5}));core.rotation.x=Math.PI/2;ring.add(core);
  const tongues=[];for(let i=0;i<10;i++){const a=i/10*Math.PI*2,m=new THREE.Mesh(new THREE.ConeGeometry(0.09,0.42,6),uzMat(i%2?0xffb030:0xff6a18,{blending:THREE.AdditiveBlending,opacity:0.85}));
    m.position.set(Math.cos(a)*0.62,0.32,Math.sin(a)*0.62);ring.add(m);tongues.push(m);}
  const glow=uzGlow(0xff7a20,2.8);br.add(glow);const glow2=uzGlow(0xffe0a0,1.2);br.add(glow2);
  const beam=uzBeam(0xff8a2a,0.42,6.5);const pool=uzDisc(0xff7a20,1.5);const lieG=new THREE.Group();lieG.add(beam);lieG.add(pool);g.add(uzTag(lieG));
  g.add(uzTag(br));
  // ореол на шее: золотое кольцо, бегущие руны, свечение; столб света; круг на полу (зона «раз-два-три») со стрелками внутрь; три огонька счёта
  const sp=L.neckSpot,halo=new THREE.Group();halo.position.copy(sp);
  const hr=new THREE.Mesh(new THREE.TorusGeometry(1.2,0.1,8,56),uzMat(UZ_GOLD,{transparent:false,depthWrite:true}));hr.rotation.x=Math.PI/2;halo.add(hr);
  const hr2=new THREE.Mesh(new THREE.TorusGeometry(1.2,0.24,8,56),uzMat(0xffc040,{blending:THREE.AdditiveBlending,opacity:0.45}));hr2.rotation.x=Math.PI/2;halo.add(hr2);
  const runes=new THREE.Group();for(let i=0;i<14;i++){const a=i/14*Math.PI*2,m=new THREE.Mesh(new THREE.OctahedronGeometry(0.11),uzMat(0xfff4c8,{transparent:false,depthWrite:true}));m.position.set(Math.cos(a)*1.48,0,Math.sin(a)*1.48);runes.add(m);}halo.add(runes);
  const hg=uzGlow(0xffcf5a,4.2);halo.add(hg);
  // огоньки счёта — рядком над ореолом, выше подсказок над героями; рисуются поверх шеи. Слева направо: раз, два, три
  const lamps=[-1,0,1].map(k=>{const m=new THREE.Mesh(new THREE.OctahedronGeometry(0.36),uzMat(0x6a5a30,{depthTest:false}));m.position.set(k*1.1,3.0,0.4);m.renderOrder=20;
    const gl=uzGlow(0xfff0a0,2.4);gl.material.opacity=0;gl.material.depthTest=false;gl.renderOrder=19;m.add(gl);halo.add(m);return {m,gl};});
  g.add(uzTag(halo));
  UZ.gy=Math.max(0,groundAt(sp.x+3.2,sp.z,3).y);   // пол арены ровный; сбоку от шеи — чтобы не попасть на голову
  const zone=new THREE.Group();zone.position.set(sp.x,UZ.gy+0.06,sp.z);
  const zr=new THREE.Mesh(new THREE.RingGeometry(2.82,3.0,72),uzMat(UZ_GOLD,{opacity:0.95,side:THREE.DoubleSide}));zr.rotation.x=-Math.PI/2;zone.add(zr);
  const zf=uzDisc(0xffc040,3.0);zf.material.opacity=0.25;zone.add(zf);
  const rip=[0,1].map(()=>{const m=new THREE.Mesh(new THREE.RingGeometry(0.92,1.0,64),uzMat(0xffe08a,{opacity:0.6,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;zone.add(m);return m;});
  const chev=new THREE.Shape();chev.moveTo(-0.32,0.2);chev.lineTo(0,-0.14);chev.lineTo(0.32,0.2);chev.lineTo(0.32,0.02);chev.lineTo(0,-0.32);chev.lineTo(-0.32,0.02);chev.closePath();const CG=new THREE.ShapeGeometry(chev);
  const ins=new THREE.Group();for(let i=0;i<8;i++){const a=i/8*Math.PI*2,m=new THREE.Mesh(CG,uzMat(UZ_GOLD,{opacity:0.9,side:THREE.DoubleSide}));const p=new THREE.Group();p.position.set(Math.cos(a)*3.45,0,Math.sin(a)*3.45);
    m.rotation.x=-Math.PI/2;p.add(m);p.rotation.y=-a+Math.PI/2;ins.add(p);}zone.add(ins);
  const zb=uzBeam(UZ_GOLD,0.55,11);zone.add(zb);
  g.add(uzTag(zone));
  // дорожка: стрелки по полу от узды к кругу
  // дорожка: лента бегущих шевронов по полу от узды к кругу — сплошная, читается и издалека
  const pg=new THREE.PlaneGeometry(1,1);pg.rotateX(-Math.PI/2);const path=new THREE.Mesh(pg,uzMat(0xffffff,{map:UZ_PATH,opacity:0.95}));path.renderOrder=7;path.visible=false;g.add(uzTag(path));
  UZ.vis={br,ring,band,core,tongues,glow,glow2,lieG,beam,pool,halo,hr,hr2,runes,hg,lamps,zone,zr,zf,rip,ins,zb,path};
  // облик прототипа — спрятать (логика та же)
  for(const c of L.BR.g.children)c.visible=false;}
// ---------- «раз-два-три» ----------
function uzNear(){const L=W.gor4L,BR=L.BR;return !!(BR.holders[0]&&BR.holders[1])&&hd(BR.pos,L.neckSpot)<=3;}
function uzReset(why){if(UZ.beat||UZ.got[0]||UZ.got[1]){UZ.stats.resets++;if(why){const L=W.gor4L;floatText(L.neckSpot.clone().add(new V3(0,2.2,0)),why,'#ffd0a0');}}UZ.beat=0;UZ.got=[false,false];}
function uzBeatFx(n,pos){const V=UZ.vis;tone([523,659,784][n-1],0.22,'triangle',0.25);if(n===3)tone(1047,0.4,'triangle',0.22,null,0.08);
  floatText(pos.clone().add(new V3(0,1.6,0)),['Раз!','Два!','ТРИ!'][n-1],'#ffe27a');if(FX.sparks)FX.sparks(pos.clone(),12+n*6,0xffc24a);UZ.flash=1;
  if(V){const l=V.lamps[n-1];l.pop=1;}}
function uzSkill(pi,h){const L=W.gor4L,F=W.flags,BR=L.BR;if(F.phase!==3||BR.on||BR.holders[pi]!==h||!uzNear())return null;
  if(UZ.got[pi]){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ждём друга — вместе: '+['раз','два','три'][UZ.beat]+'!','#ffd9a0');return true;}
  UZ.got[pi]=true;if(G.solo)UZ.got[1-pi]=true;tone(700+pi*160,0.07,'triangle',0.16);
  if(UZ.got[0]&&UZ.got[1]){UZ.beat++;UZ.stats.beats++;UZ.got=[false,false];uzBeatFx(UZ.beat,UZ.vis?UZ.vis.br.position:BR.pos);
    if(UZ.beat>=3){BR.on=true;UZ.stats.wins++;if(L.win)L.win();}}
  else floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Жми и ты — '+['раз','два','три'][UZ.beat]+'!','#ffe08a');
  return true;}
// ---------- кадр ----------
function uzTick(dt){const L=W.gor4L,F=W.flags,BR=L.BR,V=UZ.vis;if(!V)return;const ph3=F.phase===3,won=!!F.won,t=G.time;
  if(L.spotM)L.spotM.visible=false;
  // счёт: разошлись, бросили, вышли из круга, головы очнулись — сначала
  if(!ph3||BR.on){if(!BR.on&&(UZ.beat||UZ.got[0]||UZ.got[1]))uzReset();}else if(!uzNear()&&(UZ.beat||UZ.got[0]||UZ.got[1]))uzReset('Из круга вышли — снова: раз!');
  const held=BR.holders.filter(Boolean).length,dSpot=hd(BR.pos,L.neckSpot),near=ph3&&uzNear();
  // узда: следует за логикой прототипа, на счёт — поднимается к ореолу; после «три» — на шее
  const top=L.neckSpot.clone();const want=won||BR.on?1:near?UZ.beat/3*0.7:0;UZ.lift+=(want-UZ.lift)*(1-Math.exp(-(won?10:7)*dt));
  const base=BR.pos.clone().add(new V3(0,0.3,0));V.br.position.lerpVectors(base,top,UZ.lift);
  V.ring.rotation.y+=dt*(held?2.2:0.6);const s=won?1+0.5*Math.min(1,UZ.lift):1;V.ring.scale.setScalar(s);
  V.tongues.forEach((m,i)=>{const f=0.75+0.35*Math.sin(t*13+i*1.7)+0.15*Math.sin(t*29+i);m.scale.set(1,f,1);});
  V.band.material.map.offset.x=(t*0.05)%1;V.core.material.opacity=0.4+0.15*Math.sin(t*9);
  V.glow.material.opacity=0.85+0.15*Math.sin(t*7);V.glow.scale.setScalar(2.6+0.3*Math.sin(t*5)+UZ.flash*1.5);V.glow2.scale.setScalar(1.1+0.15*Math.sin(t*11));
  // лежит — столб огненного света и пятно на полу (видно издалека); несут — гаснет
  const lie=!held&&!BR.on&&!won&&F.phase===3?1:0;   // в фазах 1–2 узда просто горит: столб не зовёт к ней раньше времениUZ.hot+=(lie-UZ.hot)*(1-Math.exp(-5*dt));V.lieG.visible=UZ.hot>0.02;
  if(V.lieG.visible){const gy=groundAt(BR.pos.x,BR.pos.z,BR.pos.y+0.5).y;V.lieG.position.set(BR.pos.x,Math.max(0,gy)+0.04,BR.pos.z);
    V.beam.material.opacity=UZ.hot*(0.55+0.15*Math.sin(t*4));V.pool.material.opacity=UZ.hot*0.6;V.beam.scale.set(1+0.08*Math.sin(t*6),1,1+0.08*Math.sin(t*6));}
  UZ.ember-=dt;if(UZ.ember<=0&&FX.sparkle&&F.phase>=1&&!G.cine){UZ.ember=0.09;FX.sparkle(V.br.position.clone().add(new V3(rand(-0.5,0.5),0.2,rand(-0.5,0.5))),1,Math.random()<0.5?0xffb040:0xff7020);}
  // ореол и круг — в фазе 3; ярче и чаще пульсирует, чем ближе узда
  const showSpot=ph3&&!BR.on&&!won;const k=Math.max(0,Math.min(1,1-(dSpot-3)/12));V.halo.visible=V.zone.visible=showSpot||UZ.flash>0.05;
  if(V.halo.visible){const pf=4+6*k,pul=Math.sin(t*pf);V.hr.scale.setScalar(1+0.06*pul*(0.5+k));V.hr2.material.opacity=(0.35+0.4*k)*(0.75+0.25*pul)+UZ.flash*0.5;
    V.runes.rotation.y+=dt*(0.8+2.2*k);V.hg.scale.setScalar(3.6+1.6*k+0.5*pul+UZ.flash*2.5);V.hg.material.opacity=0.6+0.4*k;
    V.zr.material.opacity=0.7+0.3*pul;V.zf.material.opacity=near?0.55+0.15*pul:0.18+0.12*k;V.zf.material.color.setHex(near?0xffe9a0:0xffc040);
    V.rip.forEach((m,i)=>{const q=((t*0.6+i*0.5)%1);m.scale.setScalar(near?0.6+q*2.4:3.6-q*3.0);m.material.opacity=(1-q)*0.7;});
    V.ins.rotation.y=-t*0.4;V.ins.children.forEach(p=>{p.children[0].position.z=0.12*Math.sin(t*6);p.children[0].material.opacity=near?0.3:0.95;});
    V.zb.material.opacity=0.45+0.25*k+0.1*pul;
    // огоньки счёта: видны, когда узду поднесли; зажигаются по счёту; кто уже нажал на этот счёт — огонёк мигает
    const demo=UZ.demo;V.lamps.forEach((l,i)=>{const on=i<(demo>=0?demo:UZ.beat),wait=!on&&i===UZ.beat&&(UZ.got[0]||UZ.got[1]);l.m.visible=near||demo>=0||on;
      l.pop=Math.max(0,(l.pop||0)-dt*2.5);l.m.material.color.setHex(on?0xfff4c0:wait?(Math.sin(t*14)>0?0xffd76a:0x8a7a40):0x6a5a30);l.m.scale.setScalar(1+(on?0.25:0)+l.pop*0.8);
      l.gl.material.opacity=on?0.9:wait?0.4:0;l.m.rotation.y+=dt*2;});}
  UZ.flash=Math.max(0,UZ.flash-dt*2.2);
  // дорожка: несут узду вне круга — шевроны бегут от узды к кругу
  const showPath=ph3&&held>0&&!near&&!BR.on&&dSpot>3.4;V.path.visible=showPath;
  if(showPath){const from=BR.pos,to=L.neckSpot,dx=to.x-from.x,dz=to.z-from.z,D=Math.hypot(dx,dz)||1,ux=dx/D,uz=dz/D,a0=0.7,a1=D-3.05,len=Math.max(0.5,a1-a0),m=a0+len/2;
    V.path.position.set(from.x+ux*m,UZ.gy+0.1,from.z+uz*m);V.path.rotation.y=Math.atan2(-ux,-uz);V.path.scale.set(1.25,1,len);
    UZ_PATH.repeat.set(1,len/1.1);UZ_PATH.offset.y=-(t*1.4)%1;V.path.material.opacity=0.85+0.15*Math.sin(t*6);}}
// ---------- счётчик на экране: у шеи ореол и огоньки закрывает средняя голова — «раз-два-три» дублируется крупно ----------
function uzHud(){let d=UZ.hud;if(!d||!d.isConnected){d=UZ.hud=document.createElement('div');d.id='uzCount';
    d.style.cssText='position:fixed;left:50%;top:30vh;transform:translate(-50%,0);z-index:34;pointer-events:none;font-family:system-ui;text-align:center;color:#fff6e0;opacity:0;transition:opacity .2s;text-shadow:0 2px 4px #000a';
    document.body.appendChild(d);const st=document.createElement('style');st.textContent='@keyframes uzPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}#uzCount .cur{animation:uzPulse .5s ease-in-out infinite}';document.head.appendChild(st);}return d;}
function uzHudTick(){const L=W.gor4L,F=W.flags,BR=L.BR;const d=uzHud();const show=G.state==='play'&&!FIN.titleOn&&!G.cine&&F.phase===3&&!F.won&&(uzNear()||BR.on);
  d.style.opacity=show?'1':'0';if(!show)return;
  const b=n=>{const on=n<UZ.beat||BR.on,cur=n===UZ.beat&&!BR.on,pl=cur&&(UZ.got[0]||UZ.got[1]);
    return '<span'+(cur?' class="cur"':'')+' style="display:inline-block;width:76px;height:76px;line-height:76px;margin:0 7px;border-radius:50%;font-size:24px;font-weight:800;'+
      'border:4px solid '+(on?'#fff6c0':'#ffd76a')+';background:'+(on?'radial-gradient(#fff6c0,#ffb030)':pl?'#7a5a1aee':'#2a1608cc')+';color:'+(on?'#3a1606':'#ffe9a0')+';box-shadow:0 0 '+(on?'22':'8')+'px #ffb030">'+['Раз','Два','Три'][n]+'</span>';};
  const who=G.solo?'жми '+K(G.soloPi,'skill')+' — на каждый счёт':[0,1].map(pi=>'Игрок '+(pi+1)+' '+(UZ.got[pi]?'✓':K(pi,'skill'))).join(' &nbsp;·&nbsp; ');
  const html='<div style="font-size:20px;font-weight:800;color:#ffd76a;margin-bottom:8px">Узда у шеи — раз-два-три!</div><div>'+b(0)+b(1)+b(2)+'</div><div style="margin-top:8px;font-size:17px">'+(BR.on?'Узда на Змее!':who)+'</div>';
  if(d._h!==html){d._h=html;d.innerHTML=html;}}
// ---------- полоска босса: сколько ещё головы без сил ----------
function uzBar(){const F=W.flags;if(F.phase!==3||F.won||!(F.stun>0))return;const bb=$('bossbar');if(!bb||bb.style.display==='none'||bb.querySelector('.uzT'))return;
  bb.insertAdjacentHTML('beforeend',' <span class="uzT" style="color:'+(F.stun<10?'#ff9a8a':'#ffd76a')+';font-weight:bold">· без сил ещё '+Math.ceil(F.stun)+' с</span>');}
// ---------- подключение ----------
{const _ll=loadLevel;loadLevel=function(i){if(UZ.hud)UZ.hud.style.opacity='0';UZ.vis=null;UZ.beat=0;UZ.got=[false,false];UZ.lift=0;UZ.flash=0;UZ.hot=0;UZ.demo=-1;_ll(i);
  if(uzOn()){try{uzBuild();const L=W.gor4L,orig=W.skillHook;W.skillHook=function(pi,h){const r=uzSkill(pi,h);return r==null?(orig?orig(pi,h):false):r;};}catch(e){console.error('uzda',e);}}};}
{const _step=step;step=function(dt){_step(dt);if(!uzOn()||!UZ.vis)return;try{uzTick(dt||0);uzBar();uzHudTick();}catch(e){console.error('uzda',e);}};}
// для обучающего ролика (late_87): показать счёт огоньками без настоящей узды; -1 — выключить
UZ.pathN=()=>UZ.vis&&UZ.vis.path.visible?+UZ.vis.path.scale.z.toFixed(1):0;   // длина дорожки, м
UZ.demoBeat=(n)=>{UZ.demo=n;if(n>0&&UZ.vis){const l=UZ.vis.lamps[n-1];l.pop=1;UZ.flash=1;}};
