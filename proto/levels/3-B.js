/* ============================== 3-Б «СОЛОВЕЙ-РАЗБОЙНИК» — босс мира 3 ============================== */
// четыре стадии · над Соловьём табличка «что делать сейчас» · 1 свист: белая волна — прыжок, синяя — в синюю тень за щитом Потапа, кружки — щит вдвоём
// 2 тьма: свет делает его пёстрым, фиолетовая волна гасит перо · 3 буря: в небе, два колокола разом, облако тает от пера · 4 главный свист: совиный взор + рогатка, мах вдвоём дважды
function build3B(){
  W.zvenAway=true;W.world=3;setTheme('heaven');W.name='3-Б · «Соловей-Разбойник»';W.sub='Босс мира 3 · четыре стадии · свистит так, что облака рвутся';W.camX=16;const F=W.flags;F.phase=0;F.fin=[-9,-9];F.knock=0;F.round=0;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.pero=true;W.fallY=-12;
  const C={x:0,z:-14},R=12,T=HERO;const BG0=new THREE.Color(0x4a4488),BG1=new THREE.Color(0x0c0a1c),BG3=new THREE.Color(0x2c2c58),BG4=new THREE.Color(0x7a4a6a);scene.background=BG0.clone();scene.fog=new THREE.Fog(0x4a4488,30,110);
  heavenDecor(-60,20,{xw:18,sunY:14});
  /* ---------- гнездо на семи дубах ---------- */
  colBox(-16,16,-4,0,-30,4,false);cloudIsle(-6,6,-4,6,0);
  {const fl=new THREE.Mesh(new THREE.CylinderGeometry(R+0.6,R-1,1.2,40),M(0x8a6a40));fl.position.set(C.x,-0.6,C.z);fl.receiveShadow=true;W.group.add(fl);
    for(let i=0;i<9;i++){const t=addMesh(new THREE.TorusGeometry(R-0.4-i*1.25,0.14,6,48),M(i%2?0x9a7a48:0x6a4a2a),C.x,0.02,C.z);t.rotation.x=Math.PI/2;t.castShadow=false;}
    for(let i=0;i<7;i++){const a=i/7*Math.PI*2+0.2,x=C.x+Math.cos(a)*(R+2),z=C.z+Math.sin(a)*(R+2);addMesh(new THREE.CylinderGeometry(1.0,1.5,14,10),M(0x5a3d22),x,4,z);
      for(let k=0;k<3;k++){const b=addMesh(new THREE.CylinderGeometry(0.28,0.4,9,6),M(0x6b4a2b),x-Math.cos(a)*3,8+k*1.6,z-Math.sin(a)*3);b.rotation.z=Math.cos(a+k)*1.1;b.rotation.x=Math.sin(a+k)*1.1;}
      for(let k=0;k<3;k++)addMesh(new THREE.SphereGeometry(rand(2.2,3.2),10,8),M(0x4f7a2c),x+rand(-1.5,1.5),11+rand(0,3),z+rand(-1.5,1.5));}}
  // пень-насест посередине
  addMesh(new THREE.CylinderGeometry(1.1,1.5,4.4,12),M(0x5a3d22),C.x,2.2,C.z-2);W.cyls.push({x:C.x,z:C.z-2,r:1.3,miny:-1,maxy:4.4,on:true});nestMesh(C.x,4.4,C.z-2,1.3);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,2);W.zvenFree=true;
  const arena={x:C.x,z:C.z,r:R-2,camActive:()=>!G.cine};W.camZones.push(arena);bell(-3,3);
  const bb=$('bossbar');bb.style.display='block';
  let sol=null;const PERCH=new V3(C.x,4.4,C.z-2),FLOOR=new V3(C.x,0,C.z+2.6);
  const STN=['','свист','тьма','буря','главный свист'];
  const setBar=()=>{const e=sol;let hp=e&&e.alive?Math.max(0,e.embers)/e.maxEmb:0;if(F.phase===3)hp=1-F.knock/2;if(F.phase>=4)hp=F.won?0:1-F.round/2;const ph=clamp(F.phase,1,4);
    bb.innerHTML='<b>Соловей-Разбойник</b> · стадия '+ph+' / 4 · '+STN[ph]+' <span class="seg"><i style="width:'+Math.round(hp*100)+'%"></i></span>';};
  /* ---------- табличка над Соловьём: что делать прямо сейчас (на экране — видна, даже когда он высоко) ---------- */
  let sg=$('solsign');if(!sg){sg=document.createElement('div');sg.id='solsign';sg.style.cssText='position:absolute;display:none;padding:7px 18px;border-radius:12px;border:3px solid #fff3c0;color:#fff;font:800 22px system-ui;white-space:nowrap;text-shadow:0 2px 3px rgba(0,0,0,.55);box-shadow:0 4px 14px rgba(0,0,0,.4)';bb.parentNode.appendChild(sg);}
  W.onLeave=()=>{bb.style.display='none';sg.style.display='none';scene.background=BG0.clone();};
  let sgKey='';const fl={txt:'',bg:'',t:0};
  function flash(txt,bg,dur){fl.txt=txt;fl.bg=bg;fl.t=dur||1.4;}
  function showSign(txt,bg){if(!txt||G.cine||!sol||G.state!=='play'||G.ui){sg.style.display='none';return;}sg.style.display='block';const key=txt+'|'+bg;if(sgKey!==key){sgKey=key;sg.textContent=txt;sg.style.background=bg||'#3a2a6a';}
    const v=sol.pos.clone().add(new V3(0,4.2,0)).project(camS),Wd=innerWidth,H=innerHeight;let x=(v.x+1)/2*Wd,y=(1-v.y)/2*H;if(v.z>1){x=Wd/2;y=H*0.3;}
    x=clamp(x,Wd*0.3,Wd*0.7);y=clamp(y,H*0.2,H*0.62);sg.style.left=x.toFixed(0)+'px';sg.style.top=y.toFixed(0)+'px';sg.style.transform='translate(-50%,-100%) scale('+(fl.t>0?(1+0.05*Math.sin(G.time*14)).toFixed(3):1)+')';}
  function stateSign(){const e=sol;if(!e||F.phase<1||F.phase>4||F.won)return null;
    if(e.state==='broken')return F.phase===4?['ОГЛУШЁН — БЕЙТЕ РАЗОМ, ВДВОЁМ!','#8a6a10']:['ОГЛУШЁН — БЕЙ!','#8a6a10'];
    if(F.phase===1){if(cring.on)return['ЩИТ ВДВОЁМ — КАК КРУЖОК СОЖМЁТСЯ!','#8a6a10'];if(!e.perch)return['ЖЁЛТЫЙ ПОСОХ — ЩИТ, А ПОТОМ БЕЙ!','#6a4a1a'];return null;}
    if(F.phase===2)return e.litNow?['ПЁСТРЫЙ — БЕЙ!','#8a6a10']:['ПЛОСКИЙ — ПЕРОМ ПОСВЕТИ!','#4a2a7a'];
    if(F.phase===3){if(F.sw&&F.sw.t<2.3)return['ПИКЕ — С КРАСНОЙ ПОЛОСЫ УЙДИ!','#8a1a1a'];if(bells.some(B=>B.clouded))return['ОБЛАКО НА КОЛОКОЛЕ — ПЕРОМ ПОСВЕТИ!','#3a4a7a'];return['ДВА КОЛОКОЛА — УДАРЬТЕ РАЗОМ!','#7a5a10'];}
    if(F.phase===4){if(cring.on)return['ЩИТ ВДВОЁМ — КАК КРУЖОК СОЖМЁТСЯ!','#8a6a10'];if(F.puffing)return W.owlT>0?['ЗОЛОТОЙ ЖЁЛУДЬ — ОН И НАСТОЯЩИЙ!','#8a6a10']:['КАКОЙ ЖЁЛУДЬ НАСТОЯЩИЙ? СОВИНЫЙ ВЗОР ПОКАЖЕТ!','#4a2a7a'];}
    return null;}
  /* ---------- свист-волна ---------- */
  const waves=[];
  function wave(kind){const h=kind==='big'?3.2:kind==='high'?2.4:0.5;const col=kind==='low'?0xffffff:kind==='dark'?0xb08aff:kind==='high'?0x7ab0ff:0xffe08a;
    const m=new THREE.Mesh(new THREE.CylinderGeometry(1,1,h,56,1,true),MB(col,{transparent:true,opacity:kind==='low'||kind==='dark'?0.55:0.32,side:THREE.DoubleSide,depthWrite:false}));
    const src=sol&&!sol.perch?new V3(sol.pos.x,0,sol.pos.z):new V3(C.x,0,C.z-2);
    m.position.set(src.x,h/2,src.z);W.group.add(m);waves.push({kind,m,r:1.3,src,sp:7.5+Math.min(2.4,(F.cyc||0)*0.8),hit:new Set()});SFX.whoosh();tone(kind==='low'||kind==='dark'?1400:kind==='high'?900:600,0.6,'sine',0.14,kind==='low'?2000:400);if(sol)sol.L.cheeks.forEach(c=>c.scale.setScalar(1.25));}
  function behindPotap(h,src){const P=T.potap;if(!P.active||!P.guard||players[0].downed||h===P)return false;const ax=h.pos.x-src.x,az=h.pos.z-src.z,bx=P.pos.x-src.x,bz=P.pos.z-src.z;const da=Math.hypot(ax,az),db=Math.hypot(bx,bz);
    if(da<db)return false;const cos=(ax*bx+az*bz)/(da*db||1);return cos>0.92;}
  function updateWaves(dt){for(let i=waves.length-1;i>=0;i--){const w=waves[i];w.r+=dt*w.sp;w.m.scale.set(w.r,1,w.r);w.m.material.opacity*=w.r>R-1?0.9:1;
      for(const h of HEROES){if(!h.active||w.hit.has(h)||h.cling||players[h.player].downed)continue;const d=Math.hypot(h.pos.x-w.src.x,h.pos.z-w.src.z);if(Math.abs(d-w.r)>0.5)continue;w.hit.add(h);const pi=h.player;
        if(w.kind==='low'){if(h.pos.y>0.45){floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Перепрыгнул!','#ffe36b');}else{damageHero(h,{kind:'hazard',ref:{pos:w.src}});tip(pi,'Низкая белая волна — прыгни '+K(pi,'jump')+' через неё!',2.4);}}
        else if(w.kind==='dark'){if(h.pos.y>0.45){floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Перепрыгнул!','#e0c8ff');}else if(h.lit){h.lit=false;featherFx(h);floatText(h.pos.clone().add(new V3(0,h.d.height+0.9,0)),'Перо погасло!','#c8b0ff');tip(pi,'Фиолетовая волна — прыгай '+K(pi,'jump')+' или зажги перо '+K(pi,'item')+'!',2.8);}}
        else if(w.kind==='high'){if(behindPotap(h,w.src)){floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'За щитом широким!','#e0b27a');}else if(h.guard){shieldBlock(h);}else{damageHero(h,{kind:'hazard',ref:{pos:w.src}});tip(pi,'Синяя волна — за Потапа или щит '+K(pi,'guard')+'!',2.6);}}}
      if(w.r>R+1){W.group.remove(w.m);waves.splice(i,1);}}}
  // синяя тень за широким щитом Потапа: туда прятаться от высокой волны
  const wedge=new THREE.Group();W.group.add(wedge);{const m=new THREE.Mesh(new THREE.CircleGeometry(3.4,24,-Math.PI/2-0.4,0.8),MB(0x7ab0ff,{transparent:true,opacity:0.3,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.y=0.07;m.renderOrder=2;wedge.add(m);wedge.userData.m=m;}wedge.visible=false;
  // самая большая волна по всему гнезду — общий кружок: защита вдвоём в одну долю
  const cring={on:false,t:0,press:[null,null]};const ringM=[0,1].map(()=>{const m=new THREE.Mesh(new THREE.TorusGeometry(1,0.08,6,32),MB(COL.yellow,{transparent:true,opacity:0.9}));m.rotation.x=Math.PI/2;m.visible=false;W.group.add(m);return m;});
  W.onGuardTap=(pi,h)=>{if(cring.on&&cring.press[pi]===null)cring.press[pi]=cring.t;};
  function startCring(){cring.on=true;cring.t=0;cring.press=[null,null];SFX.yellow();banner('Самый большой свист — держись!','#ffe08a',1.8,'кружки сжимаются — закройтесь щитом вместе, как станут малы: Богатырский щит');}
  function ringStrike(){cring.on=false;ringM.forEach(m=>{m.visible=false;});wave('big');const win=TIMING[genPath()].parry+0.06;const hit=[0,1].map(pi=>cring.press[pi]!==null&&Math.abs(cring.press[pi]-1.3)<=win);
    if(hit[0]&&hit[1]){G.stats.shields++;SFX.horn();banner('Богатырский щит!','#ffd76a',1.8,'вместе, в лад');waves[waves.length-1].hit=new Set(HEROES);for(const pi of[0,1]){const h=active(pi);burst(h.pos.clone().add(new V3(0,1,0)),0xffffff,14,4);for(let i=0;i<3;i++)spawnSpark(h.pos.clone().add(new V3(rand(-1,1),1.4,rand(-1,1))),0x6ad0ff);}if(sol&&sol.alive&&F.phase<3)emberOut(sol,2,'Богатырский щит!');}
    else{const wv=waves[waves.length-1];for(const pi of[0,1]){const h=active(pi);wv.hit.add(h);if(players[pi].downed||h.cling)continue;if(cring.press[pi]!==null||h.guard)shieldBlock(h);else damageHero(h,{kind:'hazard',ref:{pos:new V3(C.x,0,C.z-2)}});if(!hit[pi])tip(pi,'Кружки сжимаются — щитом '+K(pi,'guard')+' закройтесь вместе, как станут малы!',2.6);}}
    shakeAll(0.05,0.35);}
  /* ---------- стадия 3: два колокола на краю гнезда ---------- */
  const BZ=C.z+1.5;
  const bells=[C.x-8.2,C.x+8.2].map((x,i)=>{const fr=new THREE.Group();fr.position.set(x,0,BZ);W.group.add(fr);const wm=M(0x6a4a2a);
    for(const s of[-1,1])addMesh(new THREE.CylinderGeometry(0.12,0.16,4.2,8),wm,s*1.0,2.1,0,fr);addMesh(new THREE.BoxGeometry(2.4,0.22,0.26),wm,0,4.2,0,fr);
    const b=bigBell(x,4.1,BZ,0.85,{pitch:i?1.26:1});
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.5,0.08,6,36),MB(COL.gold,{transparent:true,opacity:0.9}));ring.rotation.x=Math.PI/2;ring.position.set(x,0.08,BZ);ring.visible=false;W.group.add(ring);
    const cloud=new THREE.Group();cloud.position.set(x,3.2,BZ);W.group.add(cloud);for(let k=0;k<7;k++){const c=new THREE.Mesh(PUFF_GEO,CLOUD_TOP);c.scale.setScalar(rand(0.5,0.75));c.position.set(rand(-0.8,0.8),rand(-0.6,0.6),rand(-0.5,0.5));cloud.add(c);}cloud.visible=false;
    fr.visible=false;b.g.visible=false;return {i,x,fr,b,ring,cloud,t:0,clouded:false,melt:0};});
  function showBells(on){for(const B of bells){B.fr.visible=on;B.b.g.visible=on;if(!on){B.ring.visible=false;B.cloud.visible=false;B.clouded=false;}}}
  bells.forEach(B=>W.hittables.push({pos:new V3(B.x,1.2,BZ),r:1.5,alive:()=>F.phase===3&&!F.down&&!B.clouded,onHit:h=>ringBell(B,h)}));
  function ringBell(B,h){if(B.t>0.9)return;B.b.ring();B.t=1.6;floatText(new V3(B.x,3.4,BZ),'Бом!','#ffe08a');const O=bells[1-B.i];
    if(O.t>0&&!O.clouded){doubleChime();return;}
    if(!F.oneTold||G.time-F.oneTold>5){F.oneTold=G.time;if(sol)bark({g:sol.g},'solovei','Один звон — не звон, а ползвона! Фью-ить!',1.8);flash('ВТОРОЙ КОЛОКОЛ — СКОРЕЙ!','#8a6a10',1.6);}}
  function doubleChime(){for(const B of bells)B.t=0;F.down=true;F.falling=true;F.fly=false;F.sw=null;stripe.visible=false;SFX.horn();shakeAll(0.05,0.4);banner('Двойной звон!','#ffe08a',1.6,'Соловей оглох, падает — бейте его, бейте!');
    for(const B of bells){const w=new THREE.Mesh(new THREE.TorusGeometry(1,0.12,6,40),MB(COL.gold,{transparent:true,opacity:0.8}));w.rotation.x=Math.PI/2;w.position.set(B.x,1.6,BZ);W.group.add(w);anim(0.9,k=>{w.scale.setScalar(1+k*9);w.material.opacity=0.8*(1-k);if(k>=1)W.group.remove(w);});}
    const e=sol,from=e.pos.clone();tone(1800,0.5,'sine',0.2,300);floatText(e.pos.clone().add(new V3(0,2,0)),'Ай, уши!','#ffe08a');
    anim(1.0,k=>{e.pos.lerpVectors(from,FLOOR,smooth(k));e.pos.y=lerp(from.y,0,k*k);});
    later(1.05,()=>{F.falling=false;if(F.phase!==3)return;e.pos.copy(FLOOR);e.state='broken';e.t=0;e.bdur=6;e.embers=0;SFX.thud();SFX.brk();shakeAll(0.04,0.3);});}
  // крылатая буря: полоса пике и перья-стрелы
  const stripe=new THREE.Mesh(new THREE.PlaneGeometry(2.6,19),MB(0xff3a2a,{transparent:true,opacity:0.3,depthWrite:false}));stripe.rotation.x=-Math.PI/2;stripe.position.y=0.08;stripe.renderOrder=2;stripe.visible=false;W.group.add(stripe);
  const darts=[];
  function dropDart(){const hs=[0,1].map(pi=>active(pi)).filter(h=>!players[h.player].downed&&!h.cling);if(!hs.length||!sol)return;const h=hs[Math.floor(Math.random()*hs.length)];const spot=new V3(h.pos.x,0,h.pos.z);
    const disc=new THREE.Mesh(new THREE.CircleGeometry(1.3,28),MB(0xff3a2a,{transparent:true,opacity:0.25,depthWrite:false}));disc.rotation.x=-Math.PI/2;disc.position.set(spot.x,0.09,spot.z);disc.renderOrder=2;W.group.add(disc);
    const f=featherMesh(2.2);f.visible=false;W.group.add(f);darts.push({spot,disc,f,t:0,from:null});}
  function updateDarts(dt){for(let i=darts.length-1;i>=0;i--){const d=darts[i];d.t+=dt;d.disc.material.opacity=0.2+0.25*Math.abs(Math.sin(d.t*9));
      if(d.t>=0.75&&!d.from){d.from=sol.pos.clone().add(new V3(0,1.2,0));d.f.visible=true;tone(1500,0.2,'sine',0.08,700);}
      if(d.from){const k=clamp((d.t-0.75)/0.35,0,1);d.f.position.lerpVectors(d.from,d.spot,k);d.f.lookAt(d.spot);}
      if(d.t>=1.1&&!d.hit){d.hit=true;burst(d.spot.clone().add(new V3(0,0.3,0)),0xffb040,8,3);SFX.knock();for(const h of HEROES){if(!h.active||h.cling||players[h.player].downed)continue;if(hd(h.pos,d.spot)<1.3&&h.pos.y<1.4)damageHero(h,{kind:'hazard',ref:{pos:d.spot}});}}
      if(d.t>=2.2){W.group.remove(d.disc);W.group.remove(d.f);darts.splice(i,1);}}}
  function clearStorm(){for(const d of darts){W.group.remove(d.disc);W.group.remove(d.f);}darts.length=0;stripe.visible=false;F.sw=null;}
  function orbitPos(a){return new V3(C.x+Math.cos(a)*7,6.2,C.z+Math.sin(a)*7);}
  function takeOff(cloud){const e=sol;F.fly=false;F.down=false;e.state='idle';e.perch=false;e.noMove=true;const from=e.pos.clone(),to=orbitPos(F.ang);SFX.jump();SFX.whoosh();
    anim(1.1,k=>{if(F.down||F.phase!==3)return;e.pos.lerpVectors(from,to,smooth(k));e.pos.y=lerp(from.y,to.y,smooth(k))+Math.sin(k*Math.PI)*1.2;if(k>=1&&F.phase===3)F.fly=true;});
    F.dartT=2;F.swoopT=5.5;
    if(cloud){const B=bells[Math.floor(Math.random()*2)];B.clouded=true;B.melt=0;B.cloud.visible=true;B.cloud.scale.setScalar(1);later(0.6,()=>{if(sol)bark({g:sol.g},'solovei','А колокольчик — в облачко, прятки! Фью!',2);});}}
  // «Ураган»: свист закручивает ветер по гнезду
  const leaves=[];for(let i=0;i<26;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(0.22,0.14),MB(i%3?0x7aa04a:0xc0a050,{side:THREE.DoubleSide,transparent:true,opacity:0.85}));m.visible=false;W.group.add(m);leaves.push({m,a:rand(0,6.3),r:rand(2,R-1),y:rand(0.3,3),s:rand(0.8,1.4)});}
  /* ---------- стадия 4: три жёлудя у клюва, настоящий — один ---------- */
  const acorns=[0,1,2].map(i=>{const g=acornMesh(3.2);g.visible=false;W.group.add(g);const halo=new THREE.Mesh(new THREE.SphereGeometry(0.5,12,8),MB(COL.gold,{transparent:true,opacity:0,depthWrite:false}));g.add(halo);
    const A={i,g,halo,pos:new V3(),gone:0,real:i===0};A.mk={pos:A.pos,active:()=>F.phase===4&&F.puffing&&A.gone<=0&&!!sol&&sol.state!=='broken',onHit:()=>shotAcorn(A)};W.marks.push(A.mk);return A;});
  const aim=markMesh(0.9);aim.visible=false;W.group.add(aim);
  function shotAcorn(A){if(!sol)return;
    if(!A.real){A.gone=5;A.g.visible=false;burst(A.pos.clone(),0xb08aff,12,3);SFX.miss();floatText(A.pos.clone().add(new V3(0,0.8,0)),'Пусто! Жёлудь-морок','#c8b0ff');F.puff=Math.min(0.95,F.puff+0.15);
      bark({g:sol.g},'solovei','Хи-хи! Не тот, не тот!',1.6);if(!F.fakeTold){F.fakeTold=true;tip(0,'Жёлудь не тот! Взор Пелагеи покажет настоящий.',3.2);tip(1,'Не тот жёлудь! Совиный взор '+K(1,'skill')+' покажет настоящий.',3.2);}return;}
    F.puffing=false;F.puff=0;acorns.forEach(q=>{q.g.visible=false;});aim.visible=false;tone(1800,0.5,'sine',0.25,3000);floatText(sol.pos.clone().add(new V3(0,4.4,0)),'Пи-и-иск!','#ffe08a');
    const from=sol.pos.clone();sol.perch=false;F.onFloor=true;anim(0.9,k=>{sol.pos.lerpVectors(from,FLOOR,smooth(k));sol.pos.y=lerp(from.y,0,k)+Math.sin(k*Math.PI)*1.2;});
    later(0.95,()=>{if(F.phase!==4)return;sol.state='broken';sol.t=0;sol.bdur=7;sol.embers=0;F.fin=[-9,-9];SFX.brk();SFX.thud();banner('ПРОБОЙ!','#fff2b0',1.8,'смените героя '+K(0,'swap')+' / '+K(1,'swap')+' — и бейте вдвоём, разом!');});}
  function toPerch(){const e=sol;F.onFloor=false;e.state='idle';const from=e.pos.clone();SFX.jump();
    anim(0.9,k=>{e.pos.lerpVectors(from,PERCH,smooth(k));e.pos.y=lerp(from.y,PERCH.y,smooth(k))+Math.sin(k*Math.PI)*1.4;if(k>=1&&F.phase===4&&!F.won){e.perch=true;F.puffing=true;F.puff=0;acorns.forEach(q=>{q.gone=0;});}});}
  /* ---------- Соловей ---------- */
  function spawnSol(){sol=makeFoe('solovei',PERCH.x,PERCH.z,{y:PERCH.y,leash:12,scale:0.95});sol.def=Object.assign({},sol.def);sol.noKill=true;sol.big=true;sol.embers=sol.maxEmb=6;sol.perch=true;sol.noMove=true;
    sol.onFinisher=h=>{const e=sol;if(F.phase===1){nextPhase(2);return;}if(F.phase===2){nextPhase(3);return;}
      if(F.phase===3){if(!F.down||e.state!=='broken')return;F.knock++;SFX.finisher();ringFx(e.pos,COL.gold,3);floatText(e.pos.clone().add(new V3(0,3.6,0)),'Бум!','#ffd76a');shakeAll(0.05,0.3);
        if(F.knock>=2){nextPhase(4);return;}banner('Ещё разок!','#ffe08a',2.2,'Соловей снова в небе — колокол в облако спрятал: посвети на него пером '+K(0,'item')+' / '+K(1,'item'));takeOff(true);return;}
      if(F.phase===4){F.fin[h.player]=G.time;if(G.solo)F.fin[1-h.player]=G.time;SFX.finisher();ringFx(e.pos,COL.gold,3);floatText(e.pos.clone().add(new V3(0,4,0)),'Мах!','#ffd76a');
        if(Math.abs(F.fin[0]-F.fin[1])<0.7){F.round++;F.fin=[-9,-9];SFX.horn();G.stats.bogatyr++;shakeAll(0.08,0.6);
          if(F.round>=2){F.won=true;banner('Богатырский мах!','#ffd76a',2,'вместе — вдвое сильней');later(1.2,ending);}
          else{banner('Богатырский мах!','#ffd76a',2.2,'Соловей ещё держится — второй раз, и живее!');e.state='idle';e.t=0;later(1.1,()=>{if(F.phase===4&&!F.won){toPerch();players.forEach(p=>{p.blue=1;});}});}}
        else if(!F.finTold){F.finTold=true;for(const pi of[0,1])tip(pi,'Соловей оглушён! Ударьте '+K(pi,'attack')+' оба разом — Богатырский мах!',3);}}};
    sol.tick=(e,dt)=>{if(G.cine)return;e.litNow=litAt(e.pos.x,e.pos.y+1.5,e.pos.z,0.6);
      if(F.phase>=3){if(e.state!=='broken'){e.cd=Math.max(e.cd,1);if(e.state==='ready'||e.state==='wind'||e.state==='strike'||e.state==='stagger')e.state='idle';}
        if(F.phase===3&&F.fly){F.ang+=dt*(0.5+F.knock*0.18);const p=orbitPos(F.ang);e.pos.x=p.x;e.pos.z=p.z;e.pos.y=p.y+Math.sin(G.time*2.2)*0.4;}
        if(F.phase===4&&e.perch){e.pos.x=damp(e.pos.x,PERCH.x,6,dt);e.pos.z=damp(e.pos.z,PERCH.z,6,dt);e.pos.y=damp(e.pos.y,PERCH.y,6,dt);}
        return;}
      if(e.perch&&e.state==='broken'&&F.phase<3){e.perch=false;e.noMove=false;const from=e.pos.clone();anim(0.6,k=>{e.pos.lerpVectors(from,FLOOR,smooth(k));e.pos.y=lerp(from.y,0,k);});e.home.copy(FLOOR);if(F.phase===1)F.ct=Math.max(F.ct,10.5);return;}
      if(e.perch){e.pos.x=damp(e.pos.x,PERCH.x,6,dt);e.pos.z=damp(e.pos.z,PERCH.z,6,dt);e.pos.y=damp(e.pos.y,PERCH.y,6,dt);if(e.state!=='broken'){e.cd=Math.max(e.cd,1);if(e.state==='ready'||e.state==='wind')e.state='idle';}}
      else if(e.state==='idle'||e.state==='ready'||e.state==='wind'||e.state==='recover')e.pos.y=damp(e.pos.y,0,8,dt);};
    sol.post=(e,dt)=>{const L=e.L;L.cheeks.forEach(c=>{c.scale.setScalar(damp(c.scale.x,F.puff>0?1+F.puff*0.9:1,6,dt));});
      const flat=F.phase===2&&!e.litNow;e.flatK=damp(e.flatK||0,flat?1:0,6,dt);e.body.scale.z*=lerp(1,0.12,e.flatK);
      const show=F.phase===2&&e.litNow;L.chest.children.forEach((c,i)=>{if(c.material.emissive)c.material.emissiveIntensity=show?0.8+0.4*Math.sin(G.time*8+i):0;});
      const air=F.phase===3&&!F.down;L.wings.forEach(w=>{w.wp.rotation.z=w.s*(air?0.3+Math.sin(G.time*11)*0.55:e.perch?0.3+Math.sin(G.time*2)*0.1:0.5);});};
    W.onEat=(e)=>{if(!F.yum||G.time-F.yum>6){F.yum=G.time;bark({g:sol.g},'solovei','Фью-ить! Ваши искорки — мои, мои!',1.8);}};}
  function descend(){const e=sol;e.perch=false;e.noMove=false;e.def.sp=1.4;const from=e.pos.clone();SFX.jump();anim(0.8,k=>{e.pos.lerpVectors(from,FLOOR,smooth(k));e.pos.y=lerp(from.y,0,k)+Math.sin(k*Math.PI)*1.5;});later(0.85,()=>{e.home.copy(FLOOR);e.cd=0.6;SFX.thud();shakeAll(0.03,0.2);});}
  function ascend(){const e=sol;e.perch=true;e.noMove=true;e.state='idle';SFX.jump();}
  function nextPhase(n){F.phase=n;const e=sol;SFX.brk();shakeAll(0.06,0.5);e.state='idle';e.t=0;e.cd=2;F.cyc=0;F.ct=0;waves.forEach(w=>W.group.remove(w.m));waves.length=0;cring.on=false;ringM.forEach(m=>{m.visible=false;});fl.t=0;
    if(n===2){e.embers=e.maxEmb=6;ascend();F.dark=0;F.dwT=5;say('solovei','А я вам солнышко — свистом погашу!',2.4);banner('Стадия 2 · тьма','#c8b0ff',2.6,'во тьме Соловей плоский — посвети пером, станет пёстрым: бей! · фиолетовая волна гасит перо — прыгай');
      e.darkGuard=()=>!e.litNow&&e.state!=='broken';e.guardAll=e.darkGuard;e.guardText='насквозь! Во тьме он плоский — нужен свет';later(2.2,()=>{descend();});F.sparkT=4;}
    if(n===3){e.darkGuard=null;e.def.sp=0.01;e.embers=e.maxEmb=2;e.guardAll=()=>e.state!=='broken';e.guardText='в небе не достать — в колокола вдвоём звоните!';F.knock=0;F.ang=Math.atan2(e.pos.z-C.z,e.pos.x-C.x);
      showBells(true);bells.forEach(B=>{const y0=B.fr.position.y;anim(0.8,k=>{B.fr.position.y=lerp(-4.4,0,smooth(k));B.b.g.position.y=lerp(-0.3,4.1,smooth(k));});});
      say('solovei','Ну держитесь — я в небо, ввысь!',2.2);banner('Стадия 3 · буря','#9fd0ff',2.8,'Соловей в небе! В оба колокола почти разом ударьте — двойной звон оглушит · красный круг да красная полоса — отойди');takeOff(false);}
    if(n===4){F.fly=false;F.down=false;clearStorm();showBells(false);e.embers=e.maxEmb=1;e.guardAll=()=>e.state!=='broken';e.guardText='щёки надувает — сперва рогаткой по жёлудю!';F.puff=0;F.puffing=false;F.round=0;players.forEach(p=>{p.blue=1;});
      toPerch();say('solovei','А теперь — главный свист, держитесь!',2.2);banner('Стадия 4 · главный свист','#ffe08a',3,'у клюва три жёлудя, настоящий — один · Пелагея — совиный взор '+K(1,'skill')+' · Прошка — рогатка '+K(0,'skill')+', не мимо');
      later(3.2,()=>say('zven','Пелагея, посмотри совиным взором — какой жёлудь настоящий? Прошка, стреляй в золотой!',3.4,true));}}
  /* ---------- сюжет ---------- */
  function intro(){HEROES.forEach((h,i)=>{placeOnGround(h,-4.5+i*3,2.4,0);h.face=Math.PI;});spawnSol();sol.state='idle';
    play({dur:13,fov:48,camK:2.6,shots:[shot(0,[0,5,8],[0,8,-16]),shot(4.6,[4,5.6,-6],[0,5.4,-16]),shot(9,[0,3,4],[0,4,-16])],
      says:[[0.3,4,null,'<i>Соловей-Разбойник на семи дубах сидит, свитых гнездом,</i><br><i>И свистит так, что облака рвутся кругом.</i>',true],[4.6,2.6,'solovei','Фью-у-ить! Кто там звенит, кто спать не даёт?'],[7.4,2.6,'solovei','А ну — сдуло! Прочь, народ!'],[10,2.6,'zven','На табличку над ним глядите — там написано, что делать!']],
      events:[{t:7.6,fn:()=>{wave('low');}}],
      end:()=>{waves.forEach(w=>W.group.remove(w.m));waves.length=0;F.phase=1;F.cyc=0;F.ct=0;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-4.4,0);h.face=Math.PI;});W.clampR={x:C.x,z:C.z,r:R-0.7};snapCams();W.wideShield=true;
        banner('Стадия 1 · свист','#ffe08a',2.6,'белая волна — прыгай · синяя — в синюю тень за щит Потапа · меж волнами спустится он — отбей посох и бей');}});}
  function ending(){const e=sol,pe=T.pelageya;F.phase=5;clearStorm();acorns.forEach(q=>{q.g.visible=false;});aim.visible=false;
    play({dur:13,fov:48,camK:2.4,shots:[shot(0,[4,2.4,-4],[0,1.6,-10]),shot(6.6,[pe.pos.x+2,1.6,pe.pos.z+2],[0,1.6,-10])],
      says:[[0.3,3,null,'<i>Соловей садится и горло трёт.</i>',true],[3.4,3,'solovei','Я не хотел свистеть, не хотел…'],[6.6,3,'solovei','Я петь разучился — вот беда.'],[9.8,3,null,'<i>Пелагея подходит к нему. Варя сама прыгает в долю той песни — из сада Сирин и Алконоста.</i>',true]],
      events:[{t:0,fn:()=>{e.harmless=true;e.state="idle";e.noMove=true;e.pos.copy(FLOOR);e.face=0;e.cd=99;e.body.rotation.x=0.3;}},{t:9.8,fn:()=>{if(players[1].act!==0)doSwap(1);placeOnGround(pe,C.x+0.4,FLOOR.z+2.4,0);pe.face=Math.PI;}}],
      end:()=>{startSong();}});}
  // песня с Соловьём: Пелагея прыгает в долю — Соловей подхватывает. Провалить нельзя
  const SG={on:false,t:0,k:-1,B:60/84,hits:0,judged:{}};W.song=null;
  function startSong(){SG.on=true;SG.t=-4*SG.B;SG.k=-5;SG.hits=0;W.song={t:SG.t,B:SG.B,show:true,state:'play',pulse:0};banner('Подпой, Пелагея!','#d7a6ec',2.4,'прыгай '+K(1,'jump')+' в такт — Соловей подпоёт, подхватит');
    W.custom=(pi,h,dt,c)=>{for(const q of players[pi].heroes){q.vel.x=damp(q.vel.x,0,10,dt);q.vel.z=damp(q.vel.z,0,10,dt);}
      if(pi===1&&(tap(1,'jump')||G.solo&&tap(G.soloPi,'jump'))&&h.grounded&&SG.on){h.vel.y=6.4;h.grounded=false;SFX.jump();const k=Math.round(SG.t/SG.B);if(k>=0&&k<8&&!SG.judged[k]){const d=SG.t-k*SG.B;const ok=Math.abs(d)<=(LADWIN[players[1].path]||0.1)+0.05+(W.ladBonus||0);SG.judged[k]=1;
        if(ok){SG.hits++;const m=BER[0][k][0];if(m){tone(mf(m+12),0.4,'sine',0.2);}floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'В долю!','#e7c3ff');if(SG.hits>=3){const mm=BER[0][k][0];if(mm)tone(mf(mm),0.5,'triangle',0.16);}}
        else floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),d<0?'рано':'поздно','#dddddd');}}};}
  function songTick(dt){SG.t+=dt;W.song.t=SG.t;const k=Math.floor(SG.t/SG.B+1e-6);while(SG.k<k){SG.k++;const n=SG.k;if(n<0){tone(1760,0.06,'square',0.05);banner(['Раз','Два','Три','Четыре!'][n+4],'#ffe7a0',0.5);}
      else if(n<8){const l=BER[0][n];gusli(l[0]?l[0]-12:0,0,0.08);tone(mf(BER_BASS[n]),0.5,'sine',0.14);W.song.pulse=1;if(SG.hits>=3&&l[0])tone(mf(l[0]),0.5,'triangle',0.13);if(n===4&&SG.hits>=2)floatText(sol.pos.clone().add(new V3(0,3.4,0)),'Соловей подхватывает!','#ffe08a');}}
    W.song.pulse=Math.max(0,(W.song.pulse||0)-dt*4);
    if(SG.t>8*SG.B+0.3){SG.on=false;W.custom=null;W.song=null;finale();}}
  function finale(){const e=sol;
    play({dur:14,fov:46,camK:2.4,shots:[shot(0,[3,2.2,-5],[0,2,-10]),shot(7,[0,3,0],[0,2.4,-10])],
      says:[[0.3,3.4,null,'<i>Соловей подхватывает. Голос у него — настоящий.</i>',true],[3.8,3,'solovei','Спасибо, маленькая. С тобою — поётся.'],[7.2,3.2,null,'<i>Соловей звено выплёвывает — звенит, как колокольчик.</i>',true],[10.6,2.8,'zven','Третий виток! Дзинь!']],
      events:[{t:0.3,fn:()=>{for(let r=0;r<2;r++)BER[0].concat(BER[2]).forEach((l,i)=>later(r*4.8+i*0.3,()=>{if(l[0]){tone(mf(l[0]),0.5,'triangle',0.16);tone(mf(l[0]+12),0.3,'sine',0.1);}}));e.body.rotation.x=0;}},
        {t:7.2,fn:()=>{const L=linkItem(e.pos.x,3,e.pos.z);const to=T.pelageya.pos.clone();anim(1.2,k=>{L.base=3+Math.sin(k*Math.PI)*2;L.pos.x=lerp(e.pos.x,to.x,k);L.pos.z=lerp(e.pos.z,to.z,k);});later(1.3,()=>takeItem(L,T.pelageya));}}],
      tick:(t)=>{e.L.cheeks.forEach(c=>c.scale.setScalar(1+Math.abs(Math.sin(t*6))*0.15));e.L.head.rotation.x=-0.2;},
      end:()=>{F.out=true;banner('Соловей снова поёт!','#ffd76a',2.4,'звенья мира — ваши · на Лукоморье праздник-пир');later(2.2,finishLevel);}});}
  /* ---------- шаг боя ---------- */
  const SEQ1=[[0.3,'tl'],[1.3,'low'],[2.1,'th'],[3.3,'high'],[4.3,'tl2'],[5.3,'low'],[5.85,'low'],[6.8,'ring'],[10.6,'down'],[19.2,'up']];
  W.updates.push(dt=>{setBar();updateWaves(dt);if(SG.on&&!G.cine)songTick(dt);
    fl.t=Math.max(0,fl.t-dt);{const s=fl.t>0?[fl.txt,fl.bg]:stateSign();showSign(s&&s[0],s&&s[1]);}
    // небо по стадиям
    {const tgt=F.phase===2?BG1:F.phase===3?BG3:F.phase===4?BG4:BG0;if(!G.cine||F.phase>=1){scene.background.lerp(tgt,Math.min(1,dt*0.9));scene.fog.color.copy(scene.background);}}
    // синяя тень за Потапом — когда идёт высокая волна
    {const P=T.potap;const on=F.phase===1&&P.active&&!players[0].downed&&(F.tellHigh>0||waves.some(w=>w.kind==='high'));wedge.visible=on;
      if(on){const src=new V3(C.x,0,C.z-2);wedge.position.set(P.pos.x,0,P.pos.z);wedge.rotation.y=Math.atan2(P.pos.x-src.x,P.pos.z-src.z);wedge.userData.m.material.opacity=P.guard?0.45:0.14+0.1*Math.sin(G.time*8);}}
    F.tellHigh=Math.max(0,(F.tellHigh||0)-dt);
    if(!sol||G.cine||F.phase<1||F.phase>4)return;const e=sol;
    // стадия 1: с насеста — волны с табличкой-подсказкой, потом спускается и бьёт посохом
    if(F.phase===1){F.ct+=dt;
      for(const[t0,a]of SEQ1){if(F.ct-dt<t0&&F.ct>=t0){if(!e.perch&&a!=='up'&&a!=='down')continue;
        if(a==='tl'){flash('БЕЛАЯ ВОЛНА — ПРЫГ!','#4a4a5a',1.2);F.puff=0.4;}
        else if(a==='tl2'){flash('ДВЕ БЕЛЫЕ — ПРЫГ ДА ЕЩЁ ПРЫГ!','#4a4a5a',1.8);F.puff=0.4;}
        else if(a==='low'){wave('low');F.puff=0;}
        else if(a==='th'){e.S.sig.visible=true;SFX.blue();floatText(e.pos.clone().add(new V3(0,4.6,0)),'Фью-у!','#9fd0ff');F.sigT=1.2;F.tellHigh=2.4;flash('СИНЯЯ ВОЛНА — ЗА ПОТАПОВ ЩИТ!','#2a4a8a',1.6);}
        else if(a==='high')wave('high');else if(a==='ring')startCring();else if(a==='down')descend();else if(a==='up'){ascend();F.ct=0;F.cyc=(F.cyc||0)+1;}}}
      if(F.sigT>0){F.sigT-=dt;e.S.sig.visible=true;e.S.sb.visible=true;e.S.sy.visible=e.S.sr.visible=false;e.S.tRing.visible=false;e.S.halo.material.color.setHex(COL.blue);}}
    // стадия 2: тьма — свет высвистывает искры, фиолетовая волна гасит перья
    if(F.phase===2){F.dark=Math.min(1,(F.dark||0)+dt/1.5);amb.intensity=lerp(0.52,0.22,F.dark);sun.intensity=lerp(0.5,0.12,F.dark);
      F.sparkT-=dt;if(F.sparkT<=0){F.sparkT=4;const lit=HEROES.filter(h=>heroLight(h));if(lit.length){SFX.blue();floatText(e.pos.clone().add(new V3(0,4.2,0)),'Фью-ить!','#ffe08a');
        for(const h of lit)for(let i=0;i<lit.length;i++){const p=h.pos.clone().add(new V3(rand(-0.4,0.4),h.d.height+0.6,rand(-0.4,0.4)));spawnSpark(p,[COL.gold,0x6ad0ff,0xff6a8a][i%3]);const s=W.sparks[W.sparks.length-1];s.free=4.05;s.noLit=true;const dx=e.pos.x-p.x,dz=e.pos.z-p.z,dd=Math.hypot(dx,dz)||1;s.v.set(dx/dd*6,4,dz/dd*6);}
        if(!F.sparkTold){F.sparkTold=true;tip(0,'У кого перо погасло — лови искры!',3.4);tip(1,'Перо погасло — лови искры скорей!',3.4);}}}
      if(!e.perch&&e.state!=='broken'){F.dwT-=dt;if(F.dwT<=1.1&&!F.dwTold){F.dwTold=true;flash('ФИОЛЕТОВАЯ ВОЛНА — ПРЫГ!','#4a2a7a',1.1);}if(F.dwT<=0){F.dwT=7;F.dwTold=false;wave('dark');}}}
    else if(F.dark>0){F.dark=Math.max(0,F.dark-dt/1.5);amb.intensity=lerp(0.52,0.22,F.dark);sun.intensity=lerp(0.5,0.12,F.dark);}
    // стадия 3: буря — Соловей кружит в небе, перья-стрелы, пике, ветер; два колокола разом его оглушают
    if(F.phase===3){updateDarts(dt);
      for(const B of bells){B.t=Math.max(0,B.t-dt);B.ring.visible=B.t>0;if(B.t>0){B.ring.scale.setScalar(0.5+B.t/1.6);B.ring.material.opacity=0.5+0.4*Math.sin(G.time*16);}
        if(B.clouded){B.cloud.rotation.y+=dt*0.8;const lit=HEROES.some(h=>heroLight(h)&&hd(h.pos,{x:B.x,z:BZ})<2.6);if(lit){B.melt+=dt;B.cloud.scale.setScalar(Math.max(0.1,1-B.melt/1.2));if(Math.random()<0.2)burst(B.cloud.position.clone(),0xffffff,2,2);}
          if(B.melt>=1.2){B.clouded=false;B.cloud.visible=false;SFX.ok();floatText(new V3(B.x,3.6,BZ),'Облако растаяло!','#ffffff');}}}
      if(F.down&&!F.falling&&e.state!=='broken'){bark({g:e.g},'solovei','Фью! Проморгался, прозрел!',1.6);takeOff(false);}
      if(F.fly){F.dartT-=dt;if(F.dartT<=0){F.dartT=Math.max(1.3,2.4-F.knock*0.6);dropDart();}
        F.swoopT-=dt;if(F.swoopT<=0&&!F.sw){F.swoopT=Math.max(5,7.5-F.knock*1.2);const a=F.ang,d=new V3(-Math.cos(a),0,-Math.sin(a));F.sw={t:0,a,P0:new V3(C.x+Math.cos(a)*9,1.1,C.z+Math.sin(a)*9),P1:new V3(C.x-Math.cos(a)*9,1.1,C.z-Math.sin(a)*9),hit:new Set()};
          stripe.visible=true;stripe.position.set(C.x,0.08,C.z);stripe.rotation.z=-Math.atan2(d.x,d.z);SFX.blue();tone(500,0.9,'sawtooth',0.05,1400);}}
      if(F.sw){const S=F.sw;S.t+=dt;stripe.material.opacity=0.2+0.25*Math.abs(Math.sin(S.t*8));
        if(S.t>=1.3&&S.t<2.2){F.fly=false;const k=(S.t-1.3)/0.9;e.pos.lerpVectors(S.P0,S.P1,k);if(!S.woosh){S.woosh=true;SFX.whoosh();}
          for(const h of HEROES){if(!h.active||S.hit.has(h)||h.cling||players[h.player].downed)continue;const ax=h.pos.x-S.P0.x,az=h.pos.z-S.P0.z,bx=S.P1.x-S.P0.x,bz=S.P1.z-S.P0.z;const L2=bx*bx+bz*bz,u=clamp((ax*bx+az*bz)/L2,0,1);
            const dd=Math.hypot(ax-bx*u,az-bz*u);if(dd<1.3&&h.pos.y<1.8&&hd(h.pos,e.pos)<2.2){S.hit.add(h);damageHero(h,{kind:'hazard',ref:{pos:e.pos.clone()}});}}}
        if(S.t>=2.2&&!S.back){S.back=true;stripe.visible=false;F.ang=S.a+Math.PI;const from=e.pos.clone(),to=orbitPos(F.ang);anim(0.8,k=>{if(F.phase!==3||F.down)return;e.pos.lerpVectors(from,to,smooth(k));if(k>=1){F.fly=true;F.sw=null;}});}}
      const wind=F.fly||(F.sw&&!F.down);for(const L of leaves){L.m.visible=wind;if(!wind)continue;L.a+=dt*(1.6/L.r*3)*L.s;L.m.position.set(C.x+Math.cos(L.a)*L.r,L.y+Math.sin(G.time*2+L.a)*0.3,C.z+Math.sin(L.a)*L.r);L.m.rotation.set(G.time*3*L.s,L.a,G.time*2);}
      if(wind)for(const pi of[0,1]){const h=active(pi);if(players[pi].downed||h.cling||!h.grounded)continue;const dx=h.pos.x-C.x,dz=h.pos.z-C.z,d=Math.hypot(dx,dz)||1;h.pos.x+=-dz/d*1.1*dt;h.pos.z+=dx/d*1.1*dt;}}
    else for(const L of leaves)L.m.visible=false;
    // стадия 4: главный свист — щёки надуваются, у клюва три жёлудя; полный вдох — общий кружок
    if(F.phase===4){const hp=new V3();e.L.beak.getWorldPosition(hp);const spd=0.9+F.round*0.5;
      acorns.forEach((A,i)=>{A.gone=Math.max(0,A.gone-dt);const a=G.time*spd+i*Math.PI*2/3;A.pos.set(hp.x+Math.cos(a)*1.5,hp.y+0.2+Math.sin(G.time*3+i)*0.15,hp.z+Math.sin(a)*1.5);A.g.position.copy(A.pos);A.g.rotation.y+=dt*3;
        const on=F.puffing&&A.gone<=0&&e.state!=='broken';A.g.visible=on;const owl=W.owlT>0;A.halo.material.color.setHex(A.real?COL.gold:0xa080ff);A.halo.material.opacity=on&&owl?(A.real?0.55+0.25*Math.sin(G.time*10):0.3):0;A.g.scale.setScalar(on&&owl&&!A.real?0.75:1);});
      {const pr=T.proshka;const mk=F.puffing&&pr.active&&!players[0].downed?findMark(pr):null;const A=mk&&acorns.find(q=>q.mk===mk);aim.visible=!!A;if(A){aim.position.copy(A.pos);aim.lookAt(camS.position);aim.scale.setScalar(0.9+0.15*Math.sin(G.time*10));}}
      if(F.puffing){F.puff=Math.min(1,F.puff+dt/(4.8-F.round*1.0));if(F.puff>=1){F.puffing=false;F.puff=0;aim.visible=false;floatText(e.pos.clone().add(new V3(0,4.6,0)),'ФЬЮ-У-У-УИТЬ!','#ffe08a');startCring();
          later(3.4,()=>{if(F.phase===4&&!F.won&&e.state!=='broken'&&e.perch){F.puffing=true;acorns.forEach(q=>{q.gone=0;});}});}}
      // оглушение прошло, а мах не получился — снова на насест
      if(F.onFloor&&!F.won&&e.state!=='broken'){if(F.ret===undefined)F.ret=G.time;if(G.time-F.ret>1.6){F.ret=undefined;toPerch();}}else F.ret=undefined;}
    if(cring.on){cring.t+=dt;const u=clamp(cring.t/1.3,0,1);ringM.forEach((m,pi)=>{const h=active(pi);m.visible=true;m.position.set(h.pos.x,h.pos.y+0.08,h.pos.z);m.scale.setScalar(lerp(2.2,0.5,u));m.material.color.setHex(u>0.85?0xffffff:COL.yellow);});if(cring.t>=1.3+0.25)ringStrike();}});
  /* ---------- рисунки кнопок и задачи ---------- */
  const wd=(h,w)=>Math.hypot(h.pos.x-w.src.x,h.pos.z-w.src.z);
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'jump',()=>headOf(h()),()=>waves.some(w=>(w.kind==='low'||w.kind==='dark')&&Math.abs(wd(h(),w)-w.r)<3&&wd(h(),w)>w.r),'волна');
    prompt(pi,'guard',()=>headOf(h()),()=>cring.on||W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.help),'');
    prompt(pi,'item',()=>headOf(h()),()=>F.phase===2&&sol&&!sol.litNow&&!h().lit&&!HEROES.some(q=>heroLight(q)),'свет!');
    prompt(pi,'label',()=>headOf(h()),()=>F.phase===2&&!G.cine&&heroLight(h()),'ты светишь');
    prompt(pi,'label',()=>headOf(h()),()=>F.phase===2&&!G.cine&&!heroLight(h())&&HEROES.some(q=>heroLight(q))&&W.sparks.some(s=>s.free>0),'лови искры!');
    prompt(pi,'attack',()=>headOf(h()),()=>sol&&(sol.state==='broken'||(sol.state==='stagger'&&!sol.openHit&&(F.phase!==2||sol.litNow)))&&hd(sol.pos,h().pos)<5,F.phase===4?'вместе!':'');
    prompt(pi,'swap',()=>headOf(h()),()=>F.phase===4&&players[pi].blue>=1&&sol&&sol.state==='broken','богатырский выход');
    for(const B of bells){prompt(pi,'attack',()=>new V3(B.x,2.4,BZ),()=>F.phase===3&&!F.down&&!B.clouded&&hd(h().pos,{x:B.x,z:BZ})<5,()=>bells[1-B.i].t>0?'скорее!':'бей в колокол');
      prompt(pi,'item',()=>new V3(B.x,2.4,BZ),()=>F.phase===3&&B.clouded&&!heroLight(h())&&hd(h().pos,{x:B.x,z:BZ})<5,'посвети — облако растает');}}
  prompt(0,'guard',()=>headOf(T.potap),()=>F.phase===1&&(F.sigT>0||F.tellHigh>0)&&T.potap.active,'широкий щит');
  prompt(0,'swap',()=>headOf(T.proshka),()=>F.phase===1&&F.tellHigh>0&&T.proshka.active,'Потап — щит');
  prompt(0,'skill',()=>headOf(T.proshka),()=>F.phase===4&&F.puffing&&T.proshka.active,()=>W.owlT>0?'в золотой!':'в жёлудь');
  prompt(0,'swap',()=>headOf(T.potap),()=>F.phase===4&&F.puffing&&T.potap.active,'Прошка — рогатка');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>F.phase===4&&F.puffing&&T.pelageya.active&&W.owlT<=0&&players[1].owlCd<=0,'совиный взор');
  prompt(1,'swap',()=>headOf(T.yosha),()=>F.phase===4&&F.puffing&&T.yosha.active,'Пелагея — совиный взор');
  prompt(1,'jump',()=>headOf(T.pelageya),()=>SG.on,'в такт');
  const ph1=pi=>O(()=>'Стадия 1 · свист. Табличку над Соловьём читай! Белая волна — прыгай '+K(pi,'jump')+'. Синяя — в синюю тень за Потапом'+(pi?' встань':' (Потап — щит '+K(0,'guard')+')')+'.<br>Кружки над обоими — щит вдвоём. Спустится — посох отбей '+K(pi,'guard')+' и бей '+K(pi,'attack')+' — вот и весь сказ!',()=>F.phase>1,()=>sol?[sol.g]:[]);
  const ph2=pi=>O(()=>'Стадия 2 · тьма. Во тьме Соловей плоский — посвети пером '+K(pi,'item')+', пёстрым станет: бей!<br>Фиолетовая волна перо гасит — прыгай через неё. Искры лови, у кого перо погасло, — живей!',()=>F.phase>2,()=>sol?[sol.g]:[]);
  const ph3=pi=>O(()=>'Стадия 3 · буря. Соловей в небе. Ты бей '+K(pi,'attack')+' в один колокол, друг — в другой, почти разом: двойной звон оглушит.<br>Облако на колоколе — пером '+K(pi,'item')+' посвети. Красное — отойди, кто спешит.',()=>F.phase>3,()=>F.phase===3&&!F.down?bells.map(B=>B.b.g):sol?[sol.g]:[]);
  const ph4=pi=>O(pi?()=>'Стадия 4 · главный свист. У клюва три жёлудя, настоящий — один. Совиный взор '+K(1,'skill')+' — настоящий золотом засветится: Прошке скажи!<br>Соловей упадёт — смени героя '+K(1,'swap')+', бейте вместе '+K(1,'attack')+'. Дважды — держи!'
    :()=>'Стадия 4 · главный свист. У клюва три жёлудя, настоящий — один: Пелагея его совиным взором видит.<br>Стреляй '+K(0,'skill')+', как колечко на золотом. Соловей упадёт — смени '+K(0,'swap')+', бейте вместе '+K(0,'attack')+'. Дважды — и не обидит!',()=>!!F.won,()=>F.puffing?acorns.filter(a=>a.g.visible).map(a=>a.g):sol?[sol.g]:[]);
  for(const pi of[0,1])W.objectives[pi]=[O('Гнездо Соловья…',()=>F.phase>=1,()=>[]),ph1(pi),ph2(pi),ph3(pi),ph4(pi),O(pi?()=>'Соловей петь разучился. Подпой ему: прыгай '+K(1,'jump')+' в такт, от души.':'Соловей петь разучился…',()=>false,()=>sol?[sol.g]:[])];
  W.spawns=[[new V3(-3,0,3),new V3(-5,0,4)],[new V3(3,0,3),new V3(5,0,4)]];W.startAct=[0,0];
  W.pauseLine='Соловей-Разбойник, стадии четыре. Свист: белую волну — перепрыгнуть, синюю — в тень за щит Потапа.<br>Тьма: свет пёстрым его делает. Буря: два колокола разом.<br>Главный свист: совиный взор настоящий жёлудь найдёт, рогатка собьёт — и богатырский мах вдвоём, одним разом!';
  W.onStart=()=>{later(0.4,intro);};
  flushDecor();flushPuffs();}

