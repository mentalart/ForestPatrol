/* ============================== МИР 4 · 4-5 «КАЛИНОВ МОСТ» — кульминация мира, путь Потапа ============================== */
// стройка: жёлуди по крюкам — цепи опускаются; калёные доски клещами на цепи; Йоша сращивает стыки · Прошка по натянутой цепи к вороту
// Кикимора: «Должна была — отдаю.» · бык с медвежьей лапой: Потап упирается — мост выпрямляется · «Не сила богатыря держит — земля его держит.»
// держать мост (Игрок 1): стик против качания, синие капли — щит, красная дрожь — упереться; дух тратится от ошибок · переход Игрока 2: стыки и пролёты
// бег Потапа: доски рушатся за спиной, но только после того, как он сошёл · лоза Йоши · «Ты держал.» — «А ты чинил.»
function build45(){
  W.zvenAway=true;W.world=4;setTheme('smorodina');W.name='4-5 · «Калинов мост»';W.sub='Огненная Смородина · Потап держит мост';W.camX=11;const F=W.flags;F.stage='intro';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.kleshi=true;W.fallY=-12;const T=HERO,LY=-0.7;W.noLavaWater=()=>true;   // корки здесь не встают: огонь слишком силён
  scene.fog=new THREE.Fog(0x3a1a18,18,70);
  const bankM=M(0x5a4a40),rockM=M(0x3e3230),stoneM=M(0x6a625c),boardM=M(0x8a5a30,{emissive:0xff4a00,emissiveIntensity:0.15}),chainM=M(0x4a4a52);
  const Z=makeVestZ(helperOf(3));W.zven=Z;Z.pos.set(0,2.4,6);
  /* ---------- берега, огонь, дым, Горыныч вдали ---------- */
  ground(-9,9,-8,14,0,bankM);ground(-9,9,-84,-52,0,bankM);wall(-9.2,-9,-84,14);wall(9,9.2,-84,14);wall(-9.2,9.2,14,14.2);
  lavaZone(-60,60,-52,-8,LY);lavaZone(-60,60,-120,-84,LY);lavaZone(-60,-9,-84,-52,LY);lavaZone(9,60,-84,-52,LY);
  for(let z=10;z>-84;z-=rand(3,5))for(const s of[-1,1])addMesh(new THREE.DodecahedronGeometry(rand(1,2.2)),rockM,s*rand(11,18),LY,z);
  const smoke=[];for(let i=0;i<22;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(rand(2,4),10,8),MB(0x2a2224,{transparent:true,opacity:0.35,depthWrite:false}));m.position.set(rand(-14,14),rand(7,12),rand(-60,-20));W.group.add(m);smoke.push(m);}
  const gor=makeGorynych();gor.g.position.set(0,6,-100);gor.g.scale.setScalar(1.6);gor.g.rotation.y=Math.PI;
  bell(-5,6);bell(-5,-58);const n1=nutItem(7.6,0.6,10),n2=nutItem(-7.6,0.6,-60);
  /* ---------- первая половина моста: 8 гнёзд для калёных досок на цепях ---------- */
  const posts=[-1.6,1.6].map(x=>{addMesh(new THREE.CylinderGeometry(0.2,0.26,4.6,8),M(0x5a4030),x,2.3,-7.6);const hk=addMesh(new THREE.TorusGeometry(0.28,0.07,6,14),chainM,x,4.5,-7.4);return {x,hk,shot:false};});
  const chainL=[-1.3,1.3].map(x=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,1,6),chainM);W.group.add(m);return {x,m,y:5};});
  function segTo(m,a,b){const d=b.clone().sub(a),l=d.length();m.position.copy(a).addScaledVector(d,0.5);m.scale.set(1,l,1);m.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());}
  const drawChains=()=>chainL.forEach(c=>segTo(c.m,new V3(c.x,4.3,-7.6),new V3(c.x,c.y,-30)));drawChains();
  posts.forEach((p,i)=>{W.marks.push({pos:new V3(p.x,4.5,-7.4),active:()=>!p.shot,onHit:()=>{p.shot=true;SFX.brk();burst(new V3(p.x,4.5,-7.4),0xc8c8d0,10,3);p.hk.visible=false;floatText(new V3(p.x,5,-7.4),'Крюк сбит!','#ffd9a0');
    if(posts.every(q=>q.shot)){F.chains=true;anim(1.2,k=>{chainL.forEach(c=>{c.y=5-4.8*smooth(k);});drawChains();});banner('Цепи опустились!','#ffb070',2,'кладите горячие доски');const it=linkItem(0,1.1,-6.4);later(0.6,()=>sayP('…доска к доске, а стык — водой.',2.8));}}});});
  const SEC_REF=[];const SLOTS=[];for(let i=0;i<8;i++){const z0=-8-2.75*i,z1=z0-2.75;const S={i,z0,z1,zc:(z0+z1)/2,placed:false,fused:false,col:null,mesh:null,glow:null};SLOTS.push(S);
    S.sock=hotSocket(0,0.1,S.zc,{r:1.7,accept:it=>it.kind==='doska'&&F.chains&&!S.placed&&(i===0||SLOTS[i-1].fused),onPut:(it)=>{consumeHot(it);placeSlot(S);}});
    W.waterTargets.push({pos:new V3(0,0,S.z1+0.2),active:()=>S.placed&&!S.fused,onWater:()=>{S.fused=true;S.glow.material.color.setHex(0x4a4a52);S.glow.material.emissiveIntensity=0;SFX.grow();burst(new V3(0,0.2,S.z1),0x9fe6a0,10,3);floatText(new V3(0,1,S.z1),'Стык сросся','#9fe6a0');
      if(SLOTS.every(q=>q.fused)&&!F.half){F.half=true;halfDone();}}});}
  W.SLOTS=SLOTS;W.SEC=SEC_REF;function placeSlot(S){S.placed=true;S.col=colBox(-1.2,1.2,-0.3,0,S.z1,S.z0,false);S.mesh=addMesh(new THREE.BoxGeometry(2.4,0.24,2.7),boardM,0,-0.12,S.zc);
    S.glow=addMesh(new THREE.BoxGeometry(2.5,0.08,0.18),M(0xff6a20,{emissive:0xff3000,emissiveIntensity:1}),0,0.02,S.z1+0.05);SFX.plate();burst(new V3(0,0.3,S.zc),0xffa040,12,3);
    if(S.i===0&&!F.boardTold){F.boardTold=true;later(0.5,()=>bark(T.yosha,'yosha','Стык — мой, мой!',1.6));}}
  // горн с калёными досками у берега
  const fm=makeForge(-5.4,-2,0,{ry:Math.PI/2});colBox(-6.3,-4.5,0,1.1,-3.1,-0.9,true);forgeZone(-5.4,1.1,-2,1.6);
  const boards=[0,1,2].map(i=>hotItem('doska',-5.4,1.12,-1.4-i*0.6,{name:'doska'}));
  /* ---------- бык с медвежьей лапой; натянутая цепь к вороту; ворот на том берегу ---------- */
  box(-1.8,1.8,LY-5,0,-32,-30,stoneM);{const paw=new THREE.Mesh(new THREE.CircleGeometry(0.6,20),MB(0x2a1a14));paw.rotation.x=-Math.PI/2;paw.position.set(0,0.02,-31);W.group.add(paw);for(let i=0;i<4;i++){const t=new THREE.Mesh(new THREE.CircleGeometry(0.16,10),MB(0x2a1a14));t.rotation.x=-Math.PI/2;t.position.set(-0.42+i*0.28,0.02,-31.7);W.group.add(t);}}
  const tChain=colBox(1.25,1.55,-1,0.05,-52,-32,false);tChain.on=false;const tChainM=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.14,20),chainM);tChainM.position.set(1.4,-0.05,-42);tChainM.visible=false;W.group.add(tChainM);
  const winch=makeWinch();winch.g.position.set(3,0,-55);W.cyls.push({x:3,z:-55,r:1,miny:-1,maxy:1.6,on:true});const L2=linkItem(6.8,1.1,-56);
  /* ---------- вторая половина: 6 участков — стыки (Йоша) и пролёты (Пелагея + плита) ---------- */
  const SEC=SEC_REF;for(let s=0;s<6;s++){const z0=-32-s*3.333,z1=z0-3.333,span=s%2===1;const S={s,z0,z1,span,ok:false,col:null,mesh:null,land:null,plate:null,hinge:null};
    if(span){S.land=colBox(-1.2,1.2,-0.3,0,z1,z1+1.0,false);S.land.on=false;S.landM=addMesh(new THREE.BoxGeometry(2.4,0.3,1.0),stoneM,0,-0.15,z1+0.5);S.landM.visible=false;
      S.col=colBox(-1.2,1.2,-0.3,0,z1+1.0,z0,false);S.plate=new V3(0,0,z1+0.5);const pm=addMesh(new THREE.CylinderGeometry(0.4,0.42,0.06,14),M(0x8a5a32),0,0.03,z1+0.5);pm.visible=false;S.plateM=pm;
      const hg=new THREE.Group();hg.position.set(0,0,z1+1.0);W.group.add(hg);addMesh(new THREE.BoxGeometry(2.3,0.2,z0-z1-1.0),boardM,0,-0.1,(z0-z1-1.0)/2,hg);hg.rotation.x=-Math.PI/2;hg.visible=false;S.hinge=hg;}
    else{S.col=colBox(-1.2,1.2,-0.3,0,z1,z0,false);S.mesh=addMesh(new THREE.BoxGeometry(2.4,0.24,3.25),boardM,0,-0.12,(z0+z1)/2);S.mesh.visible=false;S.crack=addMesh(new THREE.BoxGeometry(2.5,0.1,0.5),M(0xff6a20,{emissive:0xff3000,emissiveIntensity:1}),0,0.02,(z0+z1)/2);S.crack.visible=false;}
    S.col.on=false;SEC.push(S);}
  const setSec=(S,ok)=>{S.ok=ok;S.col.on=ok;if(S.span){S.hinge.rotation.x=ok?0:-Math.PI/2;}else{S.mesh.material=ok?boardM:M(0x5a3a20);S.crack.visible=!ok;}};
  function showSecond(sag){SEC.forEach(S=>{if(S.span){S.landM.visible=true;S.plateM.visible=true;S.hinge.visible=true;S.land.on=!sag;}else{S.mesh.visible=true;}
    const mid=(S.z0+S.z1)/2,k=1-Math.abs(mid+42)/10;const y=sag?-1.6*k:0;[S.mesh,S.landM,S.plateM,S.hinge,S.crack].forEach(m=>{if(m)m.position.y=(m===S.hinge?0:m===S.plateM?0.03:m===S.landM?-0.15:m===S.crack?0.02:-0.12)+y;});});}
  SEC.forEach(S=>{if(!S.span)W.waterTargets.push({pos:new V3(0,0,(S.z0+S.z1)/2),active:()=>(F.stage==='hold'||F.stage==='run')&&!S.ok&&!S.gone,onWater:()=>{setSec(S,true);SFX.grow();burst(new V3(0,0.3,(S.z0+S.z1)/2),0x9fe6a0,12,3);floatText(new V3(0,1,(S.z0+S.z1)/2),'Стык сросся!','#9fe6a0');}});});
  const L4=linkItem(-2.2,1.2,-43.2);
  /* ---------- держать мост: качание, синие капли, красная дрожь, дух ---------- */
  W.camZones.push({x:0,y:0,z:-41,r:11.5,camActive:()=>!G.cine&&(F.stage==='hold'||F.stage==='run')});
  const HD={t:0,sway:0,drift:0,spirit:1,errCd:0,dropT:3,tremT:7,trem:null,drops:[],frozen:0,koshT:false,said:0};W.HD=HD;
  const hud=new THREE.Group();W.group.add(hud);const barBg=addMesh(new THREE.BoxGeometry(1.6,0.08,0.05),MB(0x2a2224),0,0,0,hud);const ball=addMesh(new THREE.SphereGeometry(0.1,10,8),MB(0xffd76a),0,0.1,0,hud);
  const spBar=addMesh(new THREE.BoxGeometry(1.6,0.07,0.05),MB(0xffffff),0,0.35,0,hud);hud.visible=false;
  const ringM=MB(0x2f7bff,{transparent:true,opacity:0.8});const warnRing=new THREE.Mesh(new THREE.TorusGeometry(1,0.06,6,28),ringM);warnRing.rotation.x=Math.PI/2;warnRing.visible=false;W.group.add(warnRing);
  function holdErr(txt,col){if(HD.errCd>0)return;HD.errCd=0.6;HD.spirit=Math.max(0,HD.spirit-(HD.t<10?0.05:0.14));SFX.miss();floatText(T.potap.pos.clone().add(new V3(0,3.2,0)),txt,col||'#ff9a8a');
    if(HD.spirit<=0){HD.frozen=3;HD.spirit=0.6;SFX.knock();shakeAll(0.05,0.6);banner('Мост раскачался!','#ff9a8a',2,'держимся три секунды — Потап силы набирается');}}
  function spawnDrop(){const tg=active(1);const burned=SEC.filter(S=>S.ok&&!S.span);const onJoint=burned.length&&Math.random()<0.4;const S=onJoint?burned[Math.floor(Math.random()*burned.length)]:null;
    const x=S?rand(-0.8,0.8):clamp(tg.pos.x+rand(-1.2,1.2),-3,3),z=S?(S.z0+S.z1)/2:clamp(tg.pos.z+rand(-1.5,1.5),-56,-32.2);
    const m=new THREE.Mesh(new THREE.SphereGeometry(0.32,10,8),MB(0x5ab0ff));W.group.add(m);const mk=new THREE.Mesh(new THREE.RingGeometry(0.35,0.5,20),MB(0x2f7bff,{transparent:true,opacity:0.8,side:THREE.DoubleSide}));mk.rotation.x=-Math.PI/2;mk.position.set(x,0.05,z);W.group.add(mk);
    HD.drops.push({m,mk,x,z,t:0,dur:1.5,sec:S});}
  function holdTick(dt){const po=T.potap;HD.t+=dt;HD.errCd=Math.max(0,HD.errCd-dt);if(HD.frozen>0)HD.frozen-=dt;
    // Потап стоит у лапы; стик — против качания
    po.pos.set(0,0,-31);po.vel.set(0,0,0);po.face=Math.PI;const ix=AUTO(0)?clamp((HD.drift+HD.sway)/1.6,-1,1):(btn(0,'right')?1:0)-(btn(0,'left')?1:0)+(padAx(0).x||0);
    const amp=HD.t<10?0.35:0.8;HD.drift=Math.sin(HD.t*0.9)*amp+Math.sin(HD.t*2.3+1)*amp*0.5;HD.sway=clamp(HD.sway+(HD.drift-ix*1.6)*dt*1.2,-1.4,1.4);
    if(Math.abs(HD.sway)>1){holdErr('Качнуло!');HD.sway*=0.5;}po.body.rotation.z=-HD.sway*0.25;
    hud.visible=true;hud.position.set(0,3.4,-31);ball.position.x=HD.sway*0.7;ball.material.color.setHex(Math.abs(HD.sway)>0.75?0xff5a3a:0xffd76a);spBar.scale.x=Math.max(0.02,HD.spirit);spBar.position.x=-0.8+0.8*HD.spirit;
    // синие капли огня: щит Потапа закрывает весь мост
    HD.dropT-=dt;if(HD.dropT<=0){HD.dropT=HD.t<10?rand(3,3.8):rand(1.8,2.8);spawnDrop();}
    let soon=null;for(const d of HD.drops){d.t+=dt;const k=d.t/d.dur;d.m.position.set(d.x,lerp(9,0.3,k*k),d.z);d.mk.scale.setScalar(0.6+k*0.8);if(!soon||d.t>soon.t)soon=d;}
    for(let i=HD.drops.length-1;i>=0;i--){const d=HD.drops[i];if(d.t<d.dur)continue;W.group.remove(d.m);W.group.remove(d.mk);HD.drops.splice(i,1);
      if(po.guard||AUTO(0)){SFX.shield();burst(new V3(d.x,0.6,d.z),0x9fd0ff,12,3);floatText(po.pos.clone().add(new V3(0,2.8,0)),'Широкий щит!','#cfe8ff');HD.good=(HD.good||0)+1;continue;}
      burst(new V3(d.x,0.3,d.z),0x5ab0ff,16,4);holdErr('Капля прожгла!','#9fd0ff');if(d.sec&&d.sec.ok){setSec(d.sec,false);floatText(new V3(0,1,d.z),'Стык прогорел!','#ff9a60');}
      for(const h of[T.pelageya,T.yosha])if(hd(h.pos,{x:d.x,z:d.z})<1.3){const dx=h.pos.x-d.x,dz=h.pos.z-d.z,dd=Math.hypot(dx,dz)||1;h.vel.x=dx/dd*1.5;h.vel.z=dz/dd*1.5;h.vel.y=2.5;h.grounded=false;floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Ай!','#9fd0ff');}}
    // предупреждение над Потапом: синее кольцо сжимается к удару; красное — дрожь
    HD.tremT-=dt;if(!HD.trem&&HD.tremT<=0){HD.trem={t:0,dur:1.1,ok:false};HD.tremT=HD.t<10?rand(8,10):rand(6,9);SFX.knock();floatText(po.pos.clone().add(new V3(0,3.6,0)),'Дрожь!','#ff5a3a');}
    if(HD.trem){const tr=HD.trem;tr.t+=dt;if((tap(0,'roll')||AUTO(0))&&tr.t>tr.dur-0.75){tr.ok=true;}if(tr.t>=tr.dur){if(tr.ok){SFX.parry();floatText(po.pos.clone().add(new V3(0,3,0)),'Упёрся!','#ffe36b');burst(po.pos.clone().add(new V3(0,0.4,0)),0xffd76a,14,3);}else{holdErr('Тряхнуло!');shakeAll(0.04,0.3);}HD.trem=null;}}
    const cue=HD.trem?{c:0xff3b30,k:HD.trem.t/HD.trem.dur}:soon?{c:0x2f7bff,k:soon.t/soon.dur}:null;warnRing.visible=!!cue;if(cue){warnRing.position.set(0,0.2,-31);warnRing.scale.setScalar(lerp(2.2,0.7,cue.k));ringM.color.setHex(cue.c);}
    // голос мира: строчки Пелагеи короче и твёрже
    const L=[[2,'…синее — щит держи, красное — упрись, не дрожи.'],[16,'Синее — щит. Красное — упрись, держись.'],[34,'Щит. Упрись.'],[52,'Держи.']];if(HD.said<L.length&&HD.t>L[HD.said][0]){sayP(L[HD.said][1],2.6);HD.said++;}
    if(HD.t>40&&!HD.koshT){HD.koshT=true;koshShadow();}}
  // Кощей — тень в дыму
  function koshShadow(){const ko=makeKoschei();ko.g.position.set(-6,4,-46);ko.g.scale.setScalar(1.6);ko.g.traverse(o=>{if(o.isMesh){o.material=MB(0x0a0608,{transparent:true,opacity:0});o.castShadow=false;}});
    anim(2,k=>{ko.g.traverse(o=>{if(o.isMesh)o.material.opacity=0.55*k;});});later(4.5,()=>{anim(1.5,k=>{ko.g.traverse(o=>{if(o.isMesh)o.material.opacity=0.55*(1-k);});ko.g.position.x=-6-k*2;if(k>=1)W.group.remove(ko.g);});});
    later(0.8,()=>floatText(new V3(-6,9,-46),'…в дыму — тень высокая, тонкая','#c8b8c8'));}
  // P2: плита на посадке опускает доску через пролёт
  function crossTick(dt){for(const S of SEC){if(!S.span||S.ok)continue;for(const h of[T.pelageya,T.yosha]){if(h.grounded&&hd(h.pos,S.plate)<0.75&&Math.abs(h.pos.y)<0.4){setSec(S,true);SFX.gate();floatText(new V3(0,1.2,S.plate.z),'Доска опустилась!','#ffd76a');if(!F.plateTold){F.plateTold=true;later(0.4,()=>bark(T.pelageya,'pelageya','Йоша, иди, ступай!',1.6));}}}}
    if(HD.frozen>0)for(const h of[T.pelageya,T.yosha]){h.vel.x=0;h.vel.z=0;}
    if(!F.lookBack&&T.yosha.pos.z<-39){F.lookBack=true;later(0.5,()=>{T.yosha.face=0;bark(T.yosha,'yosha','…',1);later(1.1,()=>bark(T.potap,'potap','<i>(не оборачиваясь)</i> Иди. Я держу — не бойся.',2.4));});}
    if([T.pelageya,T.yosha].every(h=>h.pos.z<-52.2&&h.grounded)){if(HD.t>=40)acrossDone();else if(!F.waitTold){F.waitTold=true;banner('Горыныч не унимается — ишь, какой!','#ff9a8a',2.2,'Потап держит, пока огонь не утихнет — берегитесь горячих капель, берегитесь');}}}
  /* ---------- бег Потапа ---------- */
  const RUN={fall:-1,t:0},PIER={};
  function runTick(dt){const po=T.potap;RUN.t+=dt;
    // доски рушатся за спиной: первая половина, бык, участки — только когда Потап уже сошёл
    const behind=[...SLOTS.map(S=>({z0:S.z0,z1:S.z1,col:S.col,m:[S.mesh,S.glow],done:S.gone,ref:S})),{z0:-30,z1:-32,col:null,m:[],ref:PIER},...SEC.map(S=>({z0:S.z0,z1:S.z1,col:S.col,land:S.land,m:[S.mesh,S.landM,S.plateM,S.hinge,S.crack],ref:S}))];
    const front=-26-RUN.t*1.4;for(const b of behind){if(b.ref.gone)continue;if(b.z1>front&&po.pos.z<b.z1-0.6){b.ref.gone=true;if(b.col)b.col.on=false;if(b.land)b.land.on=false;SFX.brk();burst(new V3(0,0,(b.z0+b.z1)/2),0xff8a3a,10,3);b.m.forEach(m=>{if(!m)return;const y0=m.position.y;anim(1,k=>{m.position.y=y0-k*k*3;m.rotation.x+=0.02;});later(1.05,()=>{m.visible=false;});});}}
    if(RUN.t>2&&!F.runTold){F.runTold=true;sayP('Беги, беги!',1.6);}
    // последний пролёт — пустота: прыжок и лоза
    if(po.pos.z<-48.2&&!F.vine)vineScene();}
  /* ---------- сюжет ---------- */
  function intro(){const pe=T.pelageya,po=T.potap;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-4,0);h.face=Math.PI;});
    play({dur:22,fov:48,camK:2.4,shots:[shot(0,[-6,6,6],[0,0,-30]),shot(5.4,[5,4,-20],[0,-0.4,-40]),shot(10.8,[0,3,-4],[0,4.3,-7.6]),shot(16,[pe.pos.x+1.6,1.4,pe.pos.z-1.6],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,5,null,'<i>Калинов мост — калёный, из раскалённых досок на цепях над Смородиной. Половина досок разбросана по берегу.</i>',true],[5.4,5,null,'<i>Горыныч где-то за дымом. Порой сверху огонь летит.</i>',true],
        [10.8,5,null,'<i>Цепи подтянуты к высоким крюкам. Сначала — строим.</i>',true],[16,3.6,'pelageya','Тут написано… Прошка сбивает крюки, а доски — в клещи.']],
      events:[{t:5.4,fn:()=>{const d={m:new THREE.Mesh(new THREE.SphereGeometry(0.4,10,8),MB(0x5ab0ff))};W.group.add(d.m);anim(1.6,k=>{d.m.position.set(2,10-k*10.6,-38);if(k>=1){W.group.remove(d.m);burst(new V3(2,LY,-38),0x5ab0ff,16,4);}});}}],
      end:()=>{W.anims.length=0;F.stage='build';snapCams();for(const pi of[0,1])tip(pi,pi?'Горячие доски в печи у берега — клещами '+K(1,'item')+' возьми.<br>Щель в мосту — мёртвой водой Йоши '+K(1,'skill')+' залей, срасти.':'Прошка, жёлудями '+K(0,'skill')+' в два крюка на столбах стрельни — цепи опустятся вниз.',4);}});}
  function halfDone(){F.stage='chain';tChain.on=true;tChainM.visible=true;banner('Полмоста!','#ffb070',2.4,'дальше цепь до другого берега: Прошка к вороту идёт');later(0.8,()=>bark(T.proshka,'proshka','Как по струне на болоте. Я — первый, так и быть.',2.2));}
  function winchDone(){F.winch=true;F.stage='kiki';tChain.on=false;tChainM.position.y=1.2;const pr=T.proshka,po=T.potap,pe=T.pelageya,yo=T.yosha;placeOnGround(pr,3.8,-55.4,0);pr.face=Math.PI*0.2;
    const ki=makeKikimora();ki.g.position.set(4,6,-70);
    play({dur:21,fov:46,camK:2.4,shots:[shot(0,[6,3,-50],[3,1,-55]),shot(4,[-3,3,-20],[0,2,-40]),shot(9,[po.pos.x+2,2,po.pos.z-3],[0,1.6,-28]),shot(13.6,[-4,3,-26],[0,-0.6,-42])],
      says:[[0.3,3.4,null,'<i>Прошка ворот на том берегу держит.</i>',true],[4,3,null,'<i>С того берега прилетает Кикимора с охапкой крепкой кудели.</i>',true],[7,1.8,'kiki','Должна была — отдаю.'],
        [9,4.4,null,'<i>Её нитками доски к цепям вяжут —</i><br><i>Да середина всё равно провисает, скажут.</i>',true],[13.6,4.6,null,'<i>Посередине стоит каменный бык с медвежьей лапой.</i>',true],[18.2,2.6,'pelageya','Тут написано… Потапа — к лапе.']],
      events:[{t:4,fn:()=>{const f=ki.g.position.clone();anim(2.8,k=>{ki.g.position.lerpVectors(f,new V3(-1.6,1.4,-29),smooth(k));ki.g.position.y+=Math.sin(k*Math.PI)*2;});}},
        {t:9,fn:()=>{showSecond(true);for(let i=0;i<10;i++)later(i*0.15,()=>burst(new V3(rand(-1,1),0,rand(-50,-33)),0xd8d0a0,5,2));}},
        {t:11,fn:()=>{giveLink(new V3(-1.6,0,-29),po,1.6);}},
        {t:16,fn:()=>{const f=ki.g.position.clone();anim(2.4,k=>{ki.g.position.lerpVectors(f,new V3(-10,8,-60),k);if(k>=1)W.group.remove(ki.g);});}}],
      end:()=>{W.anims.length=0;flushGifts();showSecond(true);if(active(0)!==po)doSwap(0);placeOnGround(po,0,-26,0);placeOnGround(pe,-0.6,-24,0);placeOnGround(yo,0.6,-24,0);snapCams();tip(0,'Потап, встань на медвежью лапу посреди моста — и '+K(0,'skill')+' нажми.',4);}});}
  function holdScene(){F.stage='cut';const po=T.potap,pr=T.proshka,pe=T.pelageya,yo=T.yosha;placeOnGround(po,0,-31,0);po.face=Math.PI;placeOnGround(pe,-0.5,-29.2,0);placeOnGround(yo,0.5,-29.4,0);
    play({dur:23,fov:44,camK:2.2,shots:[shot(0,[4,2,-27],[0,1,-31]),shot(4.2,[-6,4,-24],[0,-0.3,-42]),shot(8.6,[po.pos.x+1.2,1.6,po.pos.z+2],[po.pos.x,1.5,po.pos.z]),shot(13,[po.pos.x-1.2,1.5,po.pos.z-2.2],[po.pos.x,1.5,po.pos.z]),shot(18.4,[pr.pos.x-1,1.4,pr.pos.z+1.6],[pr.pos.x,1,pr.pos.z])],
      says:[[0.3,3.8,null,'<i>Потап в балку плечом упирается —</i>',true],[4.2,3.6,null,'<i>— и мост выпрямляется, ровный, как стрела.</i>',true],[8.6,4,null,'<i>Потап на быка глядит, на дым, на друзей.</i>',true],
        [13,4.6,'potap','<i>(медленно, басом)</i> Не сила богатыря держит —<br>Земля его держит, земля его держит.'],[18.4,3.4,null,'<i>Прошка на том берегу рот открыл, чтоб пошутить, —</i><br><i>И закрыл: не стал шутить.</i>',true]],
      events:[{t:0.6,fn:()=>{po.body.rotation.x=0.3;}},{t:4.2,fn:()=>{showSecond(false);SFX.gate();shakeAll(0.04,0.6);}}],
      end:()=>{W.anims.length=0;po.body.rotation.x=0;showSecond(false);startHold();}});}
  function startHold(){F.stage='hold';F.hold=true;const po=T.potap;if(active(0)!==po)doSwap(0);if(active(1)!==T.yosha)doSwap(1);W.noSwap=pi=>pi===0&&(F.stage==='hold'||F.stage==='run');W.noSwapTip='Потап мост держит — не отпускает';
    SEC.forEach(S=>setSec(S,false));snapCams();banner('Держи мост!','#ffd76a',2.8,'Потап: стик наклоняй против качания · синяя капля — щит '+K(0,'guard')+' · красный зубец — упрись '+K(0,'roll'));
    tip(1,'Щель в мосту — мёртвой водой Йоши '+K(1,'skill')+' залей.<br>Пропасть — Пелагея перелетит, встанет на плиту: доска опустится. Сменяй '+K(1,'swap')+' скорей.',5);}
  function acrossDone(){if(F.across)return;F.across=true;F.stage='run';HD.drops.forEach(d=>{W.group.remove(d.m);W.group.remove(d.mk);});HD.drops.length=0;hud.visible=false;warnRing.visible=false;T.potap.body.rotation.z=0;
    banner('Всё! Мы на том берегу — ура!','#ffd76a',2.4,'мост рушится — беги, Потап, беги!');say(null,'<i>Варя кричит: «Всё! Мы на том берегу!»</i>',2.6,true);SFX.brk();shakeAll(0.05,0.6);
    // от удара две доски впереди треснули: Йоша срастит, Пелагея видит целые
    [SEC[2],SEC[4]].forEach(S=>setSec(S,false));SEC.filter(S=>S.span).forEach(S=>setSec(S,true));later(1.2,()=>sayP('Йоша — доски перед ним, скорей!',2.2));}
  function vineScene(){F.vine=true;F.stage='end';{const S5=SEC[5];S5.col.on=false;const hg=S5.hinge;anim(0.8,k=>{hg.rotation.x=k*1.2;hg.position.y=-k*k*2;});}const po=T.potap,yo=T.yosha,pe=T.pelageya,pr=T.proshka;placeOnGround(yo,-0.8,-53.2,0);yo.face=0;placeOnGround(pe,-2.4,-54,0);
    const vine=new THREE.Group();vine.position.set(0,0,-52.2);W.group.add(vine);const vm=M(0x3f8a3a);const segs=[];for(let i=0;i<8;i++){const s=addMesh(new THREE.CylinderGeometry(0.06,0.07,0.5,6),vm,0,-i*0.45,0.1*i,vine);s.visible=false;segs.push(s);}
    play({dur:24,fov:46,camK:2.6,shots:[shot(0,[4,2,-46],[0,-0.5,-50]),shot(3.6,[-3,0.6,-54],[0,-1.2,-51]),shot(8,[-0.4,2.8,-59],[-0.2,0.5,-53.6]),shot(13.4,[-2.6,1.4,-56.6],[-0.4,0.6,-53.5]),shot(17.4,[2.6,1.4,-56.8],[0,0.6,-53.6])],
      says:[[0.3,3.4,null,'<i>Последний пролёт — пустота. Потап прыгает — не достаёт.</i>',true],[3.6,4,null,'<i>Навстречу лоза растёт — Йоша живой водой полил,</i><br><i>Потап хватается — из последних сил.</i>',true],
        [8,4.6,null,'<i>На берегу лежит — тяжело дышит.</i>',true],[13.4,2.8,'yosha','Ты держал — не отпустил.'],[16.4,2.2,'potap','А ты чинил — что было сил.'],[19,4.4,null,'<i>И больше никто ни слова не молвит.</i>',true]],
      events:[{t:0.2,fn:()=>{const f=po.pos.clone();anim(1.1,k=>{po.pos.set(0,f.y+Math.sin(k*Math.PI)*1.8-k*2.4,lerp(f.z,-51.6,k));});}},
        {t:1.6,fn:()=>{later(0.1,()=>{SFX.water();burst(new V3(0,0.3,-52.4),0x7ad8ff,12,3);});segs.forEach((s,i)=>later(0.15*i,()=>{s.visible=true;SFX.grow();}));}},
        {t:4.4,fn:()=>{const f=new V3(0,-2.4,-51.8);anim(2,k=>{po.pos.set(0,lerp(f.y,0,smooth(k)),lerp(f.z,-53.6,smooth(k)));});}},
        {t:8,fn:()=>{placeOnGround(po,0.4,-53.8,0);po.face=-0.6;po.body.scale.y=0.72;placeOnGround(yo,-0.8,-53.5,0);yo.face=0.6;yo.body.scale.y=0.78;}},
        {t:17,fn:()=>{giveLink(new V3(0.3,0,-53.8),po,2.2,1);}}],
      end:()=>{W.anims.length=0;flushGifts();po.body.scale.y=1;yo.body.scale.y=1;F.out=true;banner('Калинов мост','#ffb070',2.4,'в лавке у Векши — богатырский пояс, загляни!');later(1.8,finishLevel);}});}
  W.linkTotal+=2;   // ещё два звена: от Кикиморы и на том берегу у лозы
  W.updates.push(dt=>{smoke.forEach((m,i)=>{m.position.x+=Math.sin(G.time*0.2+i)*dt*0.3;});gor.g.position.y=6+Math.sin(G.time*0.7)*0.4;
    if(F.stage==='chain'&&T.proshka.pos.z<-52.4&&T.proshka.grounded&&!F.onBank){F.onBank=true;tip(0,'Прошка на том берегу! К вороту иди и крути: '+K(0,'item')+'.',3);}
    if(F.stage==='hold'&&!G.cine){holdTick(dt);crossTick(dt);}
    if(F.stage==='run'&&!G.cine)runTick(dt);
    // упавший в огонь во время перехода — к началу своего участка (не к колокольчику)
  });
  W.fallHook=h=>{if(F.stage!=='hold'&&F.stage!=='run')return false;if(h===T.potap){const sf=h.safe&&groundAt(h.safe.x,h.safe.z,0.5,0).y>-0.5?h.safe:null;placeOnGround(h,sf?sf.x:0,sf?sf.z:-31,0);h.iT=1;h.vel.set(0,0,0);floatText(h.pos.clone().add(new V3(0,2.6,0)),'Доска держит — Йоша, впереди срасти!','#ffd9a0');return true;}
    let best=null;for(const S of SEC)if(S.ok||S.span){const z=S.span?S.z1+0.5:(S.z0+S.z1)/2;if(z>h.pos.z-0.5&&(S.span?S.land.on:S.ok))best=z;}const z=best!==null?best:-31;placeOnGround(h,h===T.pelageya?-0.5:0.5,z===-31?-30.6:z,0);h.iT=1;h.vel.set(0,0,0);return true;};
  // ворот (только Прошка) и лапа (только Потап)
  W.itemSign=pi=>{const h=active(pi);if(F.stage==='chain'&&h===T.proshka&&hd(h.pos,{x:3,z:-55})<2.2)return ()=>{SFX.latch();winch.handle.rotation.x+=1;winchDone();};return null;};
  W.skillHook=(pi,h)=>{if(F.stage==='kiki'&&h===T.potap&&hd(h.pos,{x:0,z:-31})<1.6){holdScene();return true;}return false;};
  /* ---------- рисунки кнопок ---------- */
  const P=T.proshka,Po=T.potap,Y=T.yosha,Pe=T.pelageya;
  prompt(0,'skill',()=>headOf(P),()=>P.active&&F.stage==='build'&&!F.chains&&hd(P.pos,{x:0,z:-6})<9,'стрельни по крюкам');
  prompt(0,'item',()=>headOf(P),()=>F.stage==='chain'&&P.active&&hd(P.pos,{x:3,z:-55})<2.2,'крутить ворот');
  prompt(0,'skill',()=>headOf(Po),()=>F.stage==='kiki'&&Po.active&&hd(Po.pos,{x:0,z:-31})<1.6,'встань на лапу');
  prompt(0,'guard',()=>headOf(Po),()=>F.stage==='hold'&&HD.drops.some(d=>d.t>d.dur-0.6),'щит!');
  prompt(0,'roll',()=>headOf(Po),()=>F.stage==='hold'&&!!HD.trem,'упрись!');
  prompt(1,'skill',()=>headOf(Y),()=>Y.active&&W.waterTargets.some(w=>w.active()&&hd(w.pos,Y.pos)<3),'мёртвая вода');
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'item',()=>headOf(h()),()=>{const it=heroCarry(h());return !!it&&it.kind==='doska'&&SLOTS.some(S=>!S.placed&&S.sock.accept(it)&&hd(S.sock.pos,h().pos)<3);},'положить доску');}
  /* ---------- задачи ---------- */
  const OR=(text,done,targets,ghost,read)=>{const o=O(text,done,targets,ghost);o.read=read;return o;};
  const mk=pi=>[
    OR(()=>pi?'Цепи к крюкам подняты. Прошка (Игрок 1) жёлудями крюки сбивает —<br>А ты пока калёную доску в горне бери: клещи '+K(1,'item')+' — всяк знает.':'Цепи к крюкам подняты. Прошка — жёлуди '+K(0,'skill')+' по двум крюкам на столбах у моста.',()=>!!F.chains,()=>pi?[fm.g]:posts.filter(p=>!p.shot).map(p=>p.hk),null,'…Прошка крюки сбивает.'),
    OR(()=>'Калёные доски на цепи: доска из горна клещами '+K(pi,'item')+' — на край моста.<br>Йоша стык мёртвой водой '+K(1,'skill')+' сращивает — тогда следующую кладут, и так до конца.',()=>!!F.half,()=>{const S=SLOTS.find(q=>!q.fused);return S?[new V3(0,0,S.placed?S.z1:S.zc)]:[];},null,'…доска к доске, а стык — водой.'),
    OR(()=>pi?'Прошка по натянутой цепи на тот берег, к вороту идёт':'Прошка — по натянутой цепи, как по струне на болоте, на тот берег. У ворота — '+K(0,'item')+'.',()=>!!F.winch,()=>[winch.g],null,'…как по струне — вперёд.'),
    OR(()=>'Середина провисает. Каменный бык с медвежьей лапой — Потапа к лапе: '+K(0,'skill')+'.',()=>!!F.hold,()=>[new V3(0,0,-31)],null,'Тут написано… Потапа — к лапе.'),
    OR(()=>pi?'Переводи своих: стык — Йоша, мёртвая вода '+K(1,'skill')+'; пролёт — Пелагея перелетит, на плиту встанет — доска опустится.<br>Смена — '+K(1,'swap')+', и дело сладится.':'Держи мост! Стик — против качания (жёлтый шарик — в середину).<br>Синее — щит '+K(0,'guard')+'. Красная дрожь — упереться '+K(0,'roll')+', как в былину.',()=>!!F.across,()=>pi?SEC.filter(S=>!S.ok).slice(0,1).map(S=>new V3(0,0,S.span?S.plate.z:(S.z0+S.z1)/2)):[T.potap.g],null,pi?'…стык — водой, пролёт — крылами.':'…синее — щит держи, красное — упрись, не дрожи.'),
    OR(()=>pi?'Йоша — мёртвая вода на треснувшие доски перед Потапом. Пелагея — Совиный взор '+K(1,'skill')+'.':'Беги, Потап! Мост за спиной рушится!',()=>F.stage==='end',()=>[new V3(0,0,-53)],null,'Беги, беги!'),
    O('…',()=>false,()=>[T.potap.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>F.stage==='build'&&!heroCarry(h)&&hd(h.pos,{x:-5.4,z:-2})<2.6,text:pi=>'Горячие доски в печи. Клещами '+K(pi,'item')+' возьми — на край моста положи.'});
  W.spawns=[[new V3(-2.6,0,9),new V3(-4.6,0,10)],[new V3(2.6,0,9),new V3(4.6,0,10)]];W.startAct=[0,1];
  W.pauseLine='Калинов мост. Жёлуди по крюкам — цепи опустятся;<br>Калёные доски — клещами, стыки — мёртвой водой срастутся.<br>Потап мост держит: стик против качания, синее — щит, красное — упереться.<br>Переход: стык — Йоша, пролёт — Пелагея да плита, чтоб не свалиться.';
  W.onStart=()=>{later(0.4,intro);};
  flushDecor();}

