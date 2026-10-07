// ---- продолжение late_93_koschei_level.js (внутри build5B2, часть 2 из 5): ворон, гроза, буря, игла, этапы боя — части склеиваются сборкой по имени файла ----
  // эффекты ворона: глаза горят ярче перед пике, красная линия-прицел к герою, промах — удар о землю, пыль и звёздочки над головой
  function ravenFx(e,h,dt){const dive=e.state==='ready'||e.state==='wind'||(e.state==='idle'&&e.cd<=1&&K5.fight);const st=e.state;
    if(e.k5eyes)e.k5eyes.forEach(g=>{g.scale.setScalar(dive?0.55+0.15*Math.sin(G.time*20):0.3);});
    const ln=e.k5line;if(ln){const on=(st==='wind'||st==='ready')&&h;ln.material.opacity=damp(ln.material.opacity,on?0.55+0.35*Math.abs(Math.sin(G.time*12)):0,14,dt);
      if(h){const a=e.g.position.clone().add(new V3(0,0.9,0)),b=new V3(h.pos.x,0.15,h.pos.z),d=b.clone().sub(a),L=d.length()||0.01;ln.position.copy(a).addScaledVector(d,0.5);ln.scale.set(1,L,1);
        ln.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());}}
    if(e.k5trail)e.k5trail.every=st==='strike'||dive?0.025:0.5;
    if(st==='strike'&&e.k5ps!=='strike'){k5Feathers(e.g.position.clone().add(new V3(0,0.9,0)),5,0.6);}
    if((st==='recover'||st==='stagger')&&e.dazeT>0&&!e.k5crash){e.k5crash=true;const p=new V3(e.pos.x,0.1,e.pos.z);FX.dust(p,12,0x8a7a6a,1.1);k5Ring(p,0xffffff,0.3,2.2,0.45,0.12);k5Feathers(p.clone().add(new V3(0,0.5,0)),10,1.1);
      const ring=k5Prop(new THREE.Group());for(let i=0;i<3;i++){const st2=new THREE.Mesh(FX.geo.star,k5Add(0xffe27a));st2.scale.setScalar(0.16);ring.add(st2);}e.k5stars=ring;}
    if(e.dazeT<=0)e.k5crash=false;
    if(e.k5stars){const R0=e.k5stars;if(e.dazeT>0&&e.alive){R0.position.set(e.pos.x,e.pos.y+1.45,e.pos.z);R0.rotation.y+=dt*6;R0.children.forEach((m,i)=>{const a=i/3*Math.PI*2;m.position.set(Math.cos(a)*0.42,0.06*Math.sin(G.time*8+i),Math.sin(a)*0.42);m.lookAt(camS.position);});}
      else{k5Del(R0);e.k5stars=null;}}
    e.k5ps=st;}
  function needleRain(n,around){k5s('needles');const hs=k5Heroes();for(let i=0;i<n;i++){const h=around?null:hs[i%Math.max(1,hs.length)];const base=around||(h?h.pos:C);const p=inArena(base.clone().add(new V3(rand(-2.4,2.4),0,rand(-2.4,2.4))),0.8);
    later(i*0.16,()=>{if(!K5.fight)return;needlePortal(p,1.55);k5Zone(p,1.3,1.55,0xff4a5a,q=>{if(!K5.fight)return;needleFall(q);for(const x of k5Heroes())if(hd(x.pos,q)<1.45)k5Hurt(x,q);});});}}
  // над красным кругом в небе раскрывается лиловый знак — оттуда и падают иглы
  function needlePortal(p,dur){const g=k5Decal(K5TEX.rune,0xc080ff,1.5,new V3(p.x,9.5,p.z),0);g.rotation.x=Math.PI/2;const gl=k5Prop(k5Glow(0x9a60ff,3.2));gl.position.set(p.x,9.5,p.z);
    k5fx(dur+0.5,k=>{const u=k*(dur+0.5),a=u<0.3?u/0.3:u>dur?Math.max(0,1-(u-dur)/0.5):1;g.material.opacity=0.9*a;g.scale.setScalar(0.4+0.6*CE.outBack(Math.min(1,u/0.35)));g.rotation.z+=0.06;gl.material.opacity=0.7*a;},()=>{k5Del(g);k5Del(gl);});}
  function needleFall(q){for(let j=0;j<4;j++){const m=k5Prop(new THREE.Mesh(new THREE.ConeGeometry(0.07,0.95,5),MB(0xf0e8ff)));m.rotation.x=Math.PI;const o=new V3(q.x+rand(-0.8,0.8),10,q.z+rand(-0.8,0.8));m.position.copy(o);
    const str=new THREE.Mesh(new THREE.PlaneGeometry(0.22,2.6),k5Add(0xd8c0ff,{map:K5TEX.beam,opacity:0.9}));str.position.y=-1.5;m.add(str);   // светящийся след за иглой
    k5fx(0.28+j*0.04,k=>{m.position.y=lerp(10,0.4,k*k);str.lookAt(camS.position.x,m.position.y-1.5,camS.position.z);},()=>{const c=new V3(o.x,0.1,o.z);FX.sparks(c.clone().add(new V3(0,0.2,0)),7,0xe8d8ff);k5Ring(c,0xe0c8ff,0.15,1.3,0.32,0.18);
      if(j===0){const cr=k5Decal(K5TEX.crack,0x9a60ff,1.4,c,0.9);k5fx(1.4,kk=>{cr.material.opacity=0.9*(1-kk);},()=>k5Del(cr));k5Flash(c.clone().add(new V3(0,0.4,0)),0xd0b0ff,2.2,0.25);}
      m.remove(str);later(0.6,()=>k5Del(m));});}k5s('strike');}
  function vortex(){const hs=k5Heroes();if(!hs.length)return;const c=inArena(hs[Math.floor(rand(0,hs.length))].pos.clone().add(new V3(rand(-2,2),0,rand(-2,2))),2);k5s('vortex');K5.log.push('vortex');
    // по отзыву 2: светящаяся спираль на земле, тёмное «око» в центре, крутящаяся воронка-конус и искры, что по спирали уходят внутрь
    const g=k5Prop(new THREE.Group());g.position.set(c.x,0.05,c.z);const sp=new THREE.Mesh(new THREE.PlaneGeometry(11,11),k5Add(0x9a60ff,{map:K5TEX.spiral,opacity:0}));sp.rotation.x=-Math.PI/2;sp.position.y=0.06;g.add(sp);
    const eyeD=new THREE.Mesh(new THREE.CircleGeometry(0.9,24),MB(0x140a24,{transparent:true,opacity:0,depthWrite:false}));eyeD.rotation.x=-Math.PI/2;eyeD.position.y=0.08;g.add(eyeD);
    const fun=new THREE.Mesh(new THREE.CylinderGeometry(2.4,0.35,4.2,24,1,true),k5Add(0x7a4ad0,{map:K5TEX.beam,opacity:0}));fun.position.y=2.1;g.add(fun);
    const rings=[];for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(1.2+i*1.3,0.07,5,40),k5Add(0xb080ff,{opacity:0}));m.rotation.x=-Math.PI/2;m.position.y=0.12+i*0.2;g.add(m);rings.push(m);}
    const motes=[];for(let i=0;i<18;i++){const m=k5Glow(0xd0b0ff,0.35);g.add(m);motes.push({m,a:rand(0,6.28),r:rand(1,5.2),y:rand(0,0.4)});}
    k5fx(3.4,(k,dt)=>{const a=k<0.12?CE.outBack(k/0.12):k>0.85?1-(k-0.85)/0.15:1;g.rotation.y+=dt*4;sp.material.opacity=0.85*a;sp.scale.setScalar(Math.max(0.05,a));eyeD.material.opacity=0.8*a;fun.material.opacity=0.45*a;fun.rotation.y-=dt*7;
      rings.forEach((m,i)=>{m.scale.setScalar(1-0.35*((G.time*1.4+i*0.33)%1));m.material.opacity=0.7*a;});
      motes.forEach(q=>{q.a+=dt*(3+6/(q.r+0.5));q.r-=dt*2.2;q.y+=dt*0.9;if(q.r<0.25){q.r=rand(4,5.4);q.y=0;}q.m.position.set(Math.cos(q.a)*q.r,q.y,Math.sin(q.a)*q.r);q.m.material.opacity=a*Math.min(1,q.r/1.5);});
      if(!K5.fight)return;
      for(const h of k5Heroes()){const dx=c.x-h.pos.x,dz=c.z-h.pos.z,d=Math.hypot(dx,dz);if(d<5.5&&d>0.25&&h.rollT<=0){const f=(1-d/5.5)*4.8*dt;h.pos.x+=dx/d*f;h.pos.z+=dz/d*f;}if(d<0.9&&G.time>(h._vxT||0)){h._vxT=G.time+1.2;k5Hurt(h,c);}}},()=>k5Del(g));}
  function stage3Tick(dt){// полёт по кругу над поляной
    if(KB.state==='k5cast'||KB.state==='k5rise'){K5.ang=(K5.ang||0)+dt*0.28;const tx=C.x+Math.sin(K5.ang)*6,tz=C.z+Math.cos(K5.ang)*4.5;KB.pos.x=damp(KB.pos.x,tx,1.6,dt);KB.pos.z=damp(KB.pos.z,tz,1.6,dt);
      K5.dip=Math.max(0,(K5.dip||0)-dt);KB.pos.y=damp(KB.pos.y,5.4-(K5.dip>0?1.3:0)+0.3*Math.sin(G.time*1.3),KB.state==='k5rise'?1.5:3,dt);if(KB.state==='k5rise'&&KB.pos.y>4.8)KB.state='k5cast';
      const hs=k5Heroes();if(hs.length){const m=hs.reduce((a,h)=>a.add(h.pos),new V3()).multiplyScalar(1/hs.length);KB.face=Math.atan2(m.x-KB.pos.x,m.z-KB.pos.z);}
      K5.orbT=(K5.orbT==null?2.5:K5.orbT)-dt;if(K5.orbT<=0&&!K5.orbs.length&&KB.state==='k5cast'){K5.orbT=G.solo?5.2:4.2;const tg=G.solo?active(G.soloPi):active(K5.orbN=(K5.orbN||0)^1);if(tg&&!players[tg.player].downed)orbThrow(tg);else{const o=active(1-tg.player);if(o)orbThrow(o);}}
      K5.rainT=(K5.rainT==null?6:K5.rainT)-dt;if(K5.rainT<=0){K5.rainT=9.5+K5.fails[3];needleRain(G.solo?3:5);anim(0.7,k=>{KS.armR.rotation.x=-2.8*Math.sin(k*Math.PI);});}
      K5.vxT=(K5.vxT==null?12:K5.vxT)-dt;if(K5.vxT<=0){K5.vxT=16;vortex();}}
    // спесь сбита в воздухе — падает на землю
    if(KB.state==='broken'&&KB.pos.y>0.3&&!K5.crash){K5.crash=true;KB.state='k5crash';KB.k5k=0;k5s('flyUp');}
    if(KB.state==='k5crash'){KB.k5k+=dt;KB.pos.y=Math.max(0,KB.pos.y-dt*9);if(KB.pos.y<=0){KB.pos.y=0;k5s('land');shakeAll(0.08,0.4);FX.dust(KB.pos.clone(),18,0x8a7a6a);kosCrash();KB.state='broken';KB.t=0;KB._b=false;K5.crash=false;}}
    if(KB.state==='idle'&&K5.live){KB.state='k5rise';KB.embers=Math.max(2,Math.ceil(KB.maxEmb/2));floatText(kosTop(),'Спесь вернулась!','#c8a8ff');k5s('flyUp');}
    if(!K5.bones&&KB.embers<=Math.ceil(KB.maxEmb/2)&&KB.state==='k5cast'&&KB.pos.y>3&&K5.live)bonesRise(3);   // отзыв 4: и на этапе 3 встают щитники — трое
    const want=(G.solo?3:4);if(K5.adds.filter(e=>e.kind==='k5raven').length<want){K5.rvT=(K5.rvT==null?1:K5.rvT)-dt;if(K5.rvT<=0){K5.rvT=5;ravenMake();if(!K5.said.rav){K5.said.rav=true;say('koschei','Слетайтесь, вороны, ко мне!',1.7);}}}}
  // гроза: небо, туман и свет темнеют плавно (релизный рендер берёт небо из фона и тумана)
  const STORM={bg:scene.background?scene.background.clone():new THREE.Color(0x8aa0c8),fog:scene.fog?scene.fog.color.clone():null,amb:amb.intensity,sun:sun.intensity,sunC:sun.color.clone(),ambC:amb.color.clone()};
  window.k5StormSet=(v,now)=>{K5.stormTo=v;if(now)K5.storm=v;};
  let vig=document.getElementById('k5storm');if(!vig){vig=document.createElement('div');vig.id='k5storm';vig.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:3;opacity:0;background:radial-gradient(ellipse at 50% 45%,rgba(40,20,70,0) 45%,rgba(40,20,70,.55) 100%),linear-gradient(rgba(60,40,110,.18),rgba(30,20,60,.18))';document.body.appendChild(vig);}
  function stormTick(dt){K5.storm=damp(K5.storm,K5.stormTo,0.8,dt);const k=K5.storm;vig.style.opacity=(G.state==='play'&&!FIN.titleOn?k:0).toFixed(3);clouds.visible=k>0.05;clouds.rotation.y+=dt*0.03;clouds.children.forEach(c=>{c.material.opacity=0.85*k;});
    const dark=new THREE.Color(0x2a2440),B=K5L.B;   // основа неба — тема стадии (K5L.B), без неё — фон уровня
    if(scene.background&&scene.background.isColor)scene.background.copy(B?B.bg:STORM.bg).lerp(dark,k*0.8);if(scene.fog&&(B||STORM.fog))scene.fog.color.copy(B?B.bg:STORM.fog).lerp(dark,k*0.75);
    amb.intensity=(B?B.ai:STORM.amb)*(1-0.45*k);sun.intensity=(B?B.si:STORM.sun)*(1-0.65*k);sun.color.copy(B?B.sc:STORM.sunC).lerp(new THREE.Color(0xb8a8ff),k*0.5);
    if(k>0.5&&!G.cine){const s4=K5.st===4;K5.thT=(K5.thT==null?(s4?1.5:5):K5.thT)-dt;if(K5.thT<=0){K5.thT=s4?rand(1.7,3):rand(5,9);const f=$('flash');if(f&&FIN.set.flash!==false){f.style.transition='opacity .08s';f.style.opacity=s4?0.16:0.3;setTimeout(()=>{f.style.transition='opacity .5s';f.style.opacity=0;},90);}k5s('thunder');
        // молния бьёт за краем поляны — красиво и не опасно; туча над ней вспыхивает; на этапе 4 — втрое чаще и ближе (отзыв 4)
        const a=rand(0,6.28),rr=s4?rand(13,19):rand(17,24),bp=new V3(C.x+Math.cos(a)*rr,0,C.z+Math.sin(a)*rr);k5Bolt(bp,0xd8b0ff);const cl=clouds.children[Math.floor(rand(0,clouds.children.length))];if(cl){cl.material.color.setHex(0xb8a0ff);later(0.25,()=>cl.material.color.setHex(0x2a2438));}}}
    // тучи мерцают изнутри
    if(k>0.3&&Math.random()<dt*1.5){const cl=clouds.children[Math.floor(rand(0,clouds.children.length))];if(cl&&cl.material.color.getHex()===0x2a2438){cl.material.color.setHex(0x4a3a70);later(0.12,()=>cl.material.color.setHex(0x2a2438));}}}
  // дождь: тонкие косые струи вокруг поляны (инстансы); сила — по грозе
  const RAIN=(()=>{const N=260,m=new THREE.InstancedMesh(new THREE.BoxGeometry(0.025,0.9,0.025),k5Add(0xb8c8ff,{opacity:0.32,side:THREE.FrontSide}),N);m.frustumCulled=false;m.userData.noBatch=true;m.raycast=()=>{};
    const L=[];for(let i=0;i<N;i++)L.push(new V3(C.x+rand(-17,17),rand(0,14),C.z+rand(-17,17)));m.count=0;W.group.add(m);return {m,L,mt:new THREE.Matrix4(),q:new THREE.Quaternion().setFromEuler(new THREE.Euler(0.18,0,0.12)),s:new V3(1,1,1)};})();
  function rainTick(dt){const k=K5.storm||0,n=Math.round(RAIN.L.length*clamp((k-0.35)/0.65,0,1));RAIN.m.count=n;if(!n)return;
    for(let i=0;i<n;i++){const p=RAIN.L[i];p.y-=dt*16;p.z+=dt*2.8;p.x+=dt*1.6;if(p.y<0){p.y+=14;p.x=C.x+rand(-17,17);p.z=C.z+rand(-17,17);}RAIN.mt.compose(p,RAIN.q,RAIN.s);RAIN.m.setMatrixAt(i,RAIN.mt);}RAIN.m.instanceMatrix.needsUpdate=true;}
  function kosCrash(){const p=new V3(KB.pos.x,0.1,KB.pos.z);k5Ring(p,0xffffff,0.5,6,0.6,0.08);k5Ring(p,0xb080ff,0.3,4,0.8,0.18);k5Flash(p.clone().add(new V3(0,1,0)),0xd0b0ff,6,0.4);
    const cr=k5Decal(K5TEX.crack,0x9a60ff,3,p,1);k5fx(2.2,k=>{cr.material.opacity=1-k;},()=>k5Del(cr));FX.stars(p.clone().add(new V3(0,3.6,0)),12);G.hitstop=Math.max(G.hitstop||0,0.1);}
  // полёт: под Кощеем — светящаяся руна (видно, где он), у груди — лиловое сияние, в движении — шлейф искр
  const flyRune=k5Decal(K5TEX.rune,0xb070ff,2.4,new V3(0,0.07,0),0);const flyAura=k5Prop(k5Glow(0x9a50ff,4));flyAura.material.opacity=0;
  const kChest=()=>KS.rig.chest.getWorldPosition(new V3());let flyTrail=null;
  function flyFx(dt){const fly=K5.live&&KB.pos.y>0.6&&(K5.st===3||K5.st===5)&&!G.cine;const h=KB.pos.y;
    flyRune.material.opacity=damp(flyRune.material.opacity,fly?clamp(0.95-h*0.06,0.45,0.95):0,6,dt);flyRune.position.set(KB.pos.x,0.07,KB.pos.z);flyRune.rotation.z+=dt*0.8;flyRune.scale.setScalar(1+0.04*Math.sin(G.time*3));
    flyAura.material.opacity=damp(flyAura.material.opacity,fly?0.75+0.2*Math.sin(G.time*5):0,6,dt);if(fly)flyAura.position.copy(kChest());
    if(fly&&!flyTrail){flyTrail=k5Trail(()=>K5.live&&KB.pos.y>0.6&&(K5.st===3||K5.st===5)?kChest().add(new V3(0,-1.2,0)):null,0x8a40ff,{size:1.1,life:0.6,every:0.05});}
    if(flyTrail&&!flyTrail.on)flyTrail=null;}
  /* ---------- этап 4: меч, серии, прыжок с волной, око, костяные щитники ---------- */
  const COMBOS=[['yellow','yellow','red'],['yellow','delay'],['red','yellow'],['yellow','red','yellow'],['delay','red']];
  function pickSig(e,h,s){if(K5.st===4||K5.st===5){if(!K5.combo||!K5.combo.length){K5.combo=COMBOS[Math.floor(rand(0,K5.st===5?3:COMBOS.length))].slice();}const x=K5.combo.shift();if(x==='delay'){K5.delayNext=true;return 'yellow';}return x;}return s;}
  const eye=k5Prop(new THREE.Group());{const w=new THREE.Mesh(new THREE.SphereGeometry(0.26,12,8),MB(0xf4e8ff));w.scale.set(1.4,0.8,0.4);eye.add(w);const ir=new THREE.Mesh(new THREE.SphereGeometry(0.15,10,8),MB(0x8a3ad0));ir.position.z=0.08;eye.add(ir);
    const pu=new THREE.Mesh(new THREE.SphereGeometry(0.07,8,6),MB(0x1a0a2a));pu.position.z=0.15;eye.add(pu);}eye.visible=false;
  function leap(){const tg=active(K5.mark);if(!tg)return;KB.state='k5leap';KB.k5k=0;const from=KB.pos.clone(),to=inArena(tg.pos.clone(),1);K5.leapTo=to;K5.leapFrom=from;k5s('cast');K5.log.push('leap');
    k5Zone(to,1.9,1.35,0xff4a5a,null);}
  function leapTick(dt){KB.k5k+=dt;const k=KB.k5k,f=K5.leapFrom,t=K5.leapTo;if(k<0.25){KS.armR.rotation.x=-2.6*(k/0.25);return;}const u=Math.min(1,(k-0.25)/1.1);KB.pos.x=lerp(f.x,t.x,u);KB.pos.z=lerp(f.z,t.z,u);KB.pos.y=Math.sin(u*Math.PI)*4.5;KB.face=Math.atan2(t.x-f.x,t.z-f.z);
    if(u>=1){KB.pos.y=0;k5s('land');k5s('shock');shakeAll(0.09,0.45);FX.dust(KB.pos.clone(),22,0x8a7a6a);for(const h of k5Heroes())if(hd(h.pos,t)<1.9)k5Hurt(h,t);shockwave(t.clone());KB.state='recover';KB.t=-0.6;KB.dazeT=1.6;KS.armR.rotation.x=0.9;
      floatText(kosTop(),'Открыт!','#ffe36b');}}
  function shockwave(c){const m=k5Prop(new THREE.Mesh(new THREE.RingGeometry(0.8,1,48),MB(0xc090ff,{transparent:true,opacity:0.9,side:THREE.DoubleSide,depthWrite:false})));m.rotation.x=-Math.PI/2;m.position.set(c.x,0.12,c.z);const hitSet=new Set();
    k5fx(1.1,k=>{const r=0.6+k*7.5;m.scale.setScalar(r);m.material.opacity=0.9*(1-k*0.7);if(!K5.fight)return;for(const h of k5Heroes()){const d=hd(h.pos,c);if(Math.abs(d-r)<0.55&&h.pos.y<0.35&&!hitSet.has(h)){hitSet.add(h);if(h.rollT>0){floatText(h.pos.clone().add(new V3(0,2,0)),'Увернулся!','#9fe0ff');}else k5Hurt(h,c);}}},()=>k5Del(m));}
  function boneMake(x,z){const e=makeFoe('k5bone',x,z,{leash:30});e.k5=true;e.sideOpen=true;e.state='spawn';K5.adds.push(e);burst(new V3(x,0.4,z),0xe8e0c8,14,3);SFX.crash();
    if(G.solo){e.embers=e.maxEmb=2;}e.cd=rand(1.6,4.2);   // одному — щитники слабее и нападают вразнобой
    // встаёт из треснувшей земли в столбе лилового света; в стороны — обломки костей и пыль
    const p=new V3(x,0.08,z);const cr=k5Decal(K5TEX.crack,0xa070ff,1.9,p,1);k5fx(2.6,k=>{cr.material.opacity=1-k*k;cr.rotation.z+=0.002;},()=>k5Del(cr));
    k5Pillar(p,0x9a60ff,7,0.75,1.1);k5Ring(p,0xd0b0ff,0.3,2.6,0.6,0.16);FX.dust(p,12,0x8a7a6a,1.1);
    for(let i=0;i<8;i++){const a=rand(0,6.28);fxAdd('tetra',0xe8e0c8,p.clone().add(new V3(0,0.3,0)),new V3(Math.cos(a)*rand(1.5,3.5),rand(3,6),Math.sin(a)*rand(1.5,3.5)),{s:rand(0.06,0.11),life:rand(0.6,0.9),g:13,spin:10});}
    return e;}
  // «Кости, встаньте!» — щитники кольцом вокруг героев: на этапе 4 пятеро (отзыв 2: был один-два), на этапе 3 — трое (отзыв 4); короткий ролик: Кощей вскидывает
  // меч (в небе на этапе 3 — обе руки), земля трескается, кости встают по очереди
  function bonesRise(n){n=n||5;K5.bones=true;const air=K5.st===3,hs=k5Heroes(),cen=hs.length?hs.reduce((a,h)=>a.add(h.pos),new V3()).multiplyScalar(1/hs.length):C.clone();const pts=[];
    for(let i=0;i<n;i++){let best=null;for(let t=0;t<14;t++){const a=i/n*Math.PI*2+rand(-0.35,0.35)+0.3,r=rand(5.2,6.6);const q=inArena(new V3(cen.x+Math.cos(a)*r,0,cen.z+Math.sin(a)*r),1.4);
        if(HEROES.every(h=>hd(h.pos,q)>3)&&hd(q,KB.pos)>2.4&&pts.every(o=>hd(o,q)>2.6)){best=q;break;}if(!best)best=q;}pts.push(best);}
    const kp=KB.pos.clone(),face=KB.face,head=kp.clone().add(new V3(0,4.15,0)),pr=active(0),po=active(G.solo?G.soloPi:1)||pr;
    const F1=k5Face(head,face,0.5,5.2,-0.9),mid=pts.reduce((a,q)=>a.add(q),new V3()).multiplyScalar(1/n);
    play({dur:4.6,fov:48,camK:3,skip:true,k5:{mood:['#7a5cff',0.16],cues:[[0.05,()=>{KA.pose(air?'cast':'sword',{antic:0.18,snap:true});k5s('cast');}],[0.5,()=>{CINE.punch(-4);CINE.trauma(0.25);}],
        ...pts.map((q,i)=>[1.15+i*0.28,()=>{boneMake(q.x,q.z);CINE.trauma(0.18);}]),[1.3,()=>ACT.emoteAll('fear',null,0.08)],[2.3,()=>CINE.dutch(0.06)],[3.4,()=>{CINE.dutch(0);ACT.emoteAll('pride',null,0.1);}],[4.1,()=>KA.pose(air?'threat':'guard')]]},
      shots:[Object.assign(shot(0,F1.p,F1.l),{x:{fov:44,fov2:40,move:'push',amp:1}}),
        Object.assign(shot(1.0,[mid.x+Math.sin(face)*1+9,8.5,mid.z+9],[mid.x,0.8,mid.z],[mid.x+6,6.5,mid.z+10],[mid.x,1,mid.z],2.3),{x:{tr:'whip',ease:'inOutSine',fov:52,move:'none'}}),
        Object.assign(shot(3.3,[cen.x+3.2,1.4,cen.z+3.6],[cen.x,1.1,cen.z],[cen.x+2.6,1.6,cen.z+4.2],[cen.x,1.2,cen.z],1.3),{x:{tr:'cut',fov:46,move:'none'}})],
      says:[[0.15,2.6,'koschei','Кости старые, вставайте,<br>Мне щитами помогайте!']],end:()=>{KA.reset();}});}
  function stage4Tick(dt){if(KB.state==='k5leap'){leapTick(dt);return;}
    if(!G.solo&&players[K5.mark].downed)K5.mark=1-K5.mark;KB.pi=G.solo?G.soloPi:K5.mark;
    const mh=active(KB.pi);if(mh){eye.visible=true;eye.position.copy(headOf(mh)).add(new V3(0,0.35+0.08*Math.sin(G.time*5),0));eye.lookAt(camS.position);}
    if(KB.state==='wind'&&K5.delayNext&&KB.t<0.05){K5.delayNext=false;KB.wdur*=1.85;floatText(kosTop(),'…','#e0c8ff');}
    if(KB.state==='recover'&&KB.t>0.12&&KB.tgt&&K5.combo&&K5.combo.length){foeWind(KB);}
    else if(KB.state==='recover'&&KB.t>0.1&&(!K5.combo||!K5.combo.length)&&!KB._sw){KB._sw=true;if(!G.solo)K5.mark=1-K5.mark;}
    if(KB.state!=='recover')KB._sw=false;
    K5.leapT=(K5.leapT==null?9:K5.leapT)-dt;if(K5.leapT<=0&&KB.state==='idle'){K5.leapT=rand(10,13)+K5.fails[4];leap();}
    if(!K5.bones&&KB.embers<=Math.ceil(KB.maxEmb/2)&&KB.state!=='k5leap'&&KB.state!=='broken'){bonesRise();}}
  /* ---------- этап 5: игла, наковальня, кольцо цепей ---------- */
  const ANV=new V3(3.6,0,-22.2);
  const ringM=[0,1].map(pi=>{const m=new THREE.Mesh(new THREE.TorusGeometry(1,0.08,6,32),MB(COL.gold,{transparent:true,opacity:0.95}));m.rotation.x=Math.PI/2;m.visible=false;W.group.add(m);return m;});
  const RG={on:false,t:0,press:[null,null],tries:0};
  const fring=k5Prop(new THREE.Mesh(new THREE.TorusGeometry(1,0.06,6,28),MB(COL.gold,{transparent:true,opacity:0.9})));fring.rotation.x=Math.PI/2;fring.visible=false;
  // этап 5 (отзыв 3): «Все цепи острова — ко мне!» — у наковальни встают три чёрные цепи, сильный ветер дует от наковальни во все
  // стороны, земля трясётся, из трещин лезут костлявые руки; ковать нельзя, пока все три цепи не разбиты (тогда Кощей без сил);
  // не успели за 26 с (одному — 30) — буря утихает сама, цепи уходят под землю
  function ringStart(){RG.on=true;RG.t=-2.4;RG.chains=[];RG.handT=1.4;KB.state='k5cast';kosCast();
    say('koschei','Все цепи острова — ко мне!<br>Дуй, ветер! Дрогни, земля, во тьме!',3.6);k5s('ult');K5.log.push('ring');}
  function galeChain(i){const a=i/3*Math.PI*2+rand(-0.4,0.4)+Math.PI*0.5,r=rand(2.9,3.6);const p=inArena(new V3(ANV.x+Math.cos(a)*r,0,ANV.z+Math.sin(a)*r),1.2);
    const e=makeFoe('cep',p.x,p.z,{pi:G.solo?G.soloPi:i%2,leash:1});e.k5=true;e.noMove=true;e.noKill=true;e.k5chain=true;e.k5gale=true;if(G.solo)e.embers=e.maxEmb=2;K5.adds.push(e);RG.chains.push(e);
    burst(new V3(p.x,0.4,p.z),0x2a2230,14,3);SFX.crash();k5Ring(new V3(p.x,0.1,p.z),0x7a5cff,0.3,2.2,0.5,0.12);k5Pillar(p.clone(),0x5a3a9a,5,0.5,0.8);
    e.k5parryPost=(e,h)=>{linkToOak(e.pos,1);};e.onFinisher=h=>{linkToOak(e.pos,2);e.k5done=true;chainSink(e);floatText(e.pos.clone().add(new V3(0,2.2,0)),'Цепь разбита!','#ffe08a');};
    e.tick=(e,dt)=>{if(e.state==='k5sink'){e.k5k+=dt;e.g.position.y=-e.k5k*2.8;if(e.k5k>0.6)k5Kill(e);}};return e;}
  function ringTick(dt){if(!RG.on)return;RG.t+=dt;KB.pos.y=damp(KB.pos.y,3.4,2,dt);KB.pos.x=damp(KB.pos.x,ANV.x-4,1.2,dt);KB.pos.z=damp(KB.pos.z,ANV.z-1.5,1.2,dt);KB.face=Math.atan2(ANV.x-KB.pos.x,ANV.z-KB.pos.z);
    if(RG.t<0){KS.armR.rotation.x=-2.8;return;}
    if(!RG.chains.length){for(let i=0;i<3;i++)galeChain(i);windStart('rad',{c:ANV.clone(),dur:60,str:G.solo?2.8:3.6});quake(G.solo?1:2);k5Flash(ANV.clone().add(new V3(0,1.5,0)),0x9a70ff,4,0.5);
      }
    RG.handT-=dt;if(RG.handT<=0){RG.handT=G.solo?3.4:2.6;quake(1,true);if(Math.random()<0.4){k5s('quake');shakeAll(0.04,0.5);}}
    const left=RG.chains.filter(e=>e.alive&&!e.k5done).length;if(left===0)galeEnd(true);else if(RG.t>(G.solo?30:26))galeEnd(false);}
  function galeEnd(ok){RG.on=false;windStop();for(const e of RG.chains)if(e.alive&&!e.k5done){e.k5done=true;chainSink(e);}RG.chains=[];
    if(ok){SFX.horn();G.stats.shields++;for(const h of k5Heroes())burst(h.pos.clone().add(new V3(0,1,0)),0xffffff,14,4);floatText(ANV.clone().add(new V3(0,2.6,0)),'Цепи разбиты!','#ffe08a');KB.state='broken';KB.t=0;KB._b=false;K5.log.push('ringok');}
    else{banner('Буря утихла','#cfd8ff',1.8);KB.state='k5rise';K5.log.push('ringend');}}
  function needleHold(h){const N=K5.needle;N.holder=h;N.ground=null;N.t=0;if(ndl.g.parent!==W.group){const w=ndl.g.getWorldPosition(new V3());W.group.add(ndl.g);ndl.g.position.copy(w);}ndl.g.scale.setScalar(1);}
  function needleDrop(h){const N=K5.needle;if(!N||N.holder!==h)return;N.holder=null;N.ground=inArena(h.pos.clone().add(new V3(rand(-1,1),0,rand(-1,1))),1);N.t=0;floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Игла упала!','#ffe08a');SFX.clink();K5.log.push('drop');}
  function needlePass(pi){const N=K5.needle,h=active(pi),o=active(1-pi);if(!N||N.holder!==h||!o||players[1-pi].downed||hd(h.pos,o.pos)>13||k5Locked(o)){SFX.miss();return;}
    N.holder=null;N.fly=true;const f=ndl.g.position.clone();SFX.whoosh();anim(0.5,k=>{const t=headOf(o);ndl.g.position.lerpVectors(f,t,k);ndl.g.position.y+=Math.sin(k*Math.PI)*1.6;ndl.g.rotation.z+=0.4;if(k>=1){N.fly=false;needleHold(o);floatText(t,'Поймал!','#ffe08a');}});K5.log.push('pass');}
  function needleTick(dt){const N=K5.needle;if(!N)return;if(G.solo&&N.holder&&N.holder!==active(G.soloPi)&&!players[G.soloPi].downed)needleHold(active(G.soloPi));
    if(N.holder){const h=N.holder;if(players[h.player].downed||!h.active){needleDrop(h);return;}ndl.g.position.copy(headOf(h)).add(new V3(0,0.4+0.08*Math.sin(G.time*4),0));ndl.g.rotation.set(0,G.time*2,Math.PI/2);}
    else if(N.ground){N.t+=dt;ndl.g.position.set(N.ground.x,0.3+0.1*Math.sin(G.time*4),N.ground.z);ndl.g.rotation.set(0,G.time*2,Math.PI/2);if(N.t>0.6)for(const h of k5Heroes())if(hd(h.pos,N.ground)<1.2){needleHold(h);floatText(headOf(h),'Подобрал иглу!','#ffe08a');break;}}}
  const forging=()=>{const N=K5.needle,h=N&&N.holder;return !!(h&&h.kind==='proshka'&&hd(h.pos,ANV)<2.1&&!k5Locked(h)&&!RG.on&&!players[h.player].downed);};
  function forgeTick(dt){const Fg=K5.forge;if(!Fg)return;const on=forging();fring.visible=on;if(!on)return;Fg.c+=dt;const FB=0.75,u=Fg.c%FB,k=clamp(1-u/FB,0,1);fring.position.set(ANV.x,1.35,ANV.z);fring.scale.setScalar(lerp(0.3,1.6,k));fring.material.color.setHex((k<0.16||k>0.92)?0xffffff:COL.gold);
    if(Math.floor(Fg.c/FB)!==Fg.b){Fg.b=Math.floor(Fg.c/FB);tone(1760,0.04,'square',0.04);}}
  function forgeHit(h){const Fg=K5.forge;if(!Fg||!forging()||h!==K5.needle.holder)return false;const FB=0.75,u=Fg.c%FB,off=Math.min(u,FB-u);Fg.tries++;const ok=off<=0.2+(W.ladBonus||0);h.atkT=0.3;
    if(ok){Fg.n++;Fg.good++;k5s('forge');SFX.hammer?SFX.hammer():SFX.clink();FX.sparks(ANV.clone().add(new V3(0,1.3,0)),14,0xffe080);floatText(ANV.clone().add(new V3(0,2,0)),'Дзинь! '+Fg.n+' / '+Fg.need,'#ffe08a');K5.log.push('forge'+Fg.n);
      if((Fg.n===4||Fg.n===8)&&Fg.n<Fg.need&&!Fg.rings[Fg.n])later(0.6,()=>{if(K5.fight&&K5.st===5&&!RG.on){Fg.rings[Fg.n]=true;ringStart();}});
      if(Fg.n===6&&!K5.said.k24){K5.said.k24=true;later(0.4,()=>{say('koschei','Меня никто не слушал — никогда!<br>Один я был — один, всегда!',3.6);later(3.8,()=>bark(T.yosha,'yosha','А мы — тут! Мы слушаем — всегда!',2.8));});}
      if(Fg.n===Fg.need-2&&!K5.said.k26){K5.said.k26=true;bark(T.pelageya,'pelageya','Ещё удар, ещё чуток —<br>Скуём застёжку, мой дружок!',2.8);}
      if(Fg.n>=Fg.need){G.flags.claspQ=Fg.good/Math.max(Fg.need,Fg.tries);later(0.5,()=>{if(K5.fight)stageWin(5);});}}
    else{floatText(ANV.clone().add(new V3(0,1.8,0)),'тук — в такт!','#ffd0a0');SFX.clink();}return true;}
  function stage5Tick(dt){needleTick(dt);forgeTick(dt);ringTick(dt);if(RG.on)return;const N=K5.needle,hold=N&&N.holder;
    // Кощей: кружит над иглой и пикирует на того, у кого она
    if(KB.state==='k5cast'||KB.state==='k5rise'){const tg=hold||active(G.solo?G.soloPi:0);K5.ang=(K5.ang||0)+dt*0.6;const tx=tg.pos.x+Math.sin(K5.ang)*5,tz=tg.pos.z+Math.cos(K5.ang)*4;const p=inArena(new V3(tx,0,tz),1);
      KB.pos.x=damp(KB.pos.x,p.x,1.8,dt);KB.pos.z=damp(KB.pos.z,p.z,1.8,dt);KB.pos.y=damp(KB.pos.y,3.2+0.3*Math.sin(G.time*1.4),2,dt);if(KB.state==='k5rise'&&KB.pos.y>2.6)KB.state='k5cast';KB.face=Math.atan2(tg.pos.x-KB.pos.x,tg.pos.z-KB.pos.z);
      K5.diveT=(K5.diveT==null?2.5:K5.diveT)-dt*(forging()&&G.solo?0.6:1);if(K5.diveT<=0&&KB.state==='k5cast'){K5.diveT=(G.solo?5:3.6)+K5.fails[5]*0.5;KB.state='k5dive';KB.k5tg=tg;if(!K5.said.k23){K5.said.k23=true;say('koschei','Отдай иглу! Она — моя!',1.4);}}}
    if(KB.state==='k5dive'){const tg=KB.k5tg;const dx=tg.pos.x-KB.pos.x,dz=tg.pos.z-KB.pos.z,d=Math.hypot(dx,dz)||1;const s=Math.min(Math.max(0,d-2),10*dt);KB.pos.x+=dx/d*s;KB.pos.z+=dz/d*s;KB.pos.y=Math.max(0,KB.pos.y-dt*6);KB.face=Math.atan2(dx,dz);
      if(d<2.4&&KB.pos.y<0.3){KB.pos.y=0;KB.state='ready';KB.t=0;KB.tgt=tg;KB.pi=tg.player;}}
    if(KB.state==='idle'&&K5.live){KB.state='k5rise';k5s('flyUp');}
    if(KB.state==='broken'&&KB.pos.y>0.3&&!K5.crash){K5.crash=true;KB.state='k5crash';}
    if(KB.state==='k5crash'){KB.pos.y=Math.max(0,KB.pos.y-dt*9);if(KB.pos.y<=0){k5s('land');shakeAll(0.07,0.35);FX.dust(KB.pos.clone(),16,0x8a7a6a);kosCrash();KB.state='broken';KB.t=0;KB._b=false;K5.crash=false;}}
    // помощники: ключи (на того, кто без иглы), вороны, иглы у наковальни
    K5.keyT=(K5.keyT==null?7:K5.keyT)-dt;if(K5.keyT<=0){K5.keyT=G.solo?16:12;const t2=G.solo?null:(hold?active(1-hold.player):active(1));if(t2&&!players[t2.player].downed&&!k5Locked(t2)&&!K5.adds.some(e=>e.kind==='k5key'))keyMake(t2);}
    if(K5.adds.filter(e=>e.kind==='k5raven').length<(G.solo?1:2)){K5.rvT=(K5.rvT==null?4:K5.rvT)-dt;if(K5.rvT<=0){K5.rvT=9;ravenMake();}}
    K5.rainT=(K5.rainT==null?8:K5.rainT)-dt;if(K5.rainT<=0){K5.rainT=11;needleRain(G.solo?3:4,forging()?ANV:null);}}
  /* ---------- Кощей: попадания, отбивы, «золотая нить» ---------- */
  function bossHit(e,h){if(!K5.fight||!K5.live)return;
    if(e.state==='broken'){if(K5.st===5){floatText(kosTop(),'Куй, пока он без сил!','#ffe08a');return;}bindTap(h);return;}
    if(e.pos.y>1.2){floatText(kosTop(),'не достать','#cfd8dc');return;}
    // окна: после отбива (шатается) и после кувырка от красного (закружился) — не больше двух ударов вдвоём / одного одному;
    // этап 4 — ещё и со спины, пока Кощей занят замахом или ударом (раз в 0,9 с)
    const side=hitSide(e,h),back=side!=='f',win=e.dazeT>0||e.state==='stagger',busy=e.state==='wind'||e.state==='strike'||e.state==='recover';
    const cap=K5.listen?(G.solo?2:3):(G.solo?1:2),open=(win&&(K5.winN||0)<cap)||(K5.st===4&&back&&busy);
    if(open){if(G.time<(e._hitCd||0))return;e._hitCd=G.time+(win?0.3:0.9);if(win)K5.winN=(K5.winN||0)+1;e.flashT=0.12;shake(h.player,0.03,0.12);burst(e.pos.clone().add(new V3(0,2,0)),0xffffff,6,3);emberOut(e,1,!win?'Со спины!':'Удар!');K5.log.push('bhit');return;}
    if(win){SFX.clink();floatText(kosTop(),'опомнился — отбей следующий удар','#cfd8dc');return;}
    SFX.clink();floatText(kosTop(),back?'закрылся':'в лоб не пробить — отбей удар щитом','#cfd8dc');}
  function bossParried(e,h){K5.log.push('bparry');K5.combo=null;if(K5.st===2){const pi=h.player,sp=K5.spark;if(sp&&sp.pi===pi&&sp.t>0){emberOut(e,1,'Искорка!');FX.stars(e.pos.clone().add(new V3(0,3,0)),10,0xffe08a);K5.log.push('sparkx3');}sparkTo(G.solo?pi:1-pi,h.pos);}}
  function bossHitHero(e,h){if(K5.st===5&&K5.needle&&h===K5.needle.holder){if(h.kind==='proshka'&&!G.solo){const g=active(1-h.player);if(g&&g.guard&&!players[1-h.player].downed&&hd(g.pos,h.pos)<2.6){shieldBlock(g);floatText(g.pos.clone().add(new V3(0,g.d.height+0.8,0)),'Заслонил Прошку!','#ffe08a');K5.log.push('cover');return true;}}
      later(0,()=>needleDrop(h));}return false;}
  function bindTap(h){const pi=h.player;K5.bind=K5.bind||[-9,-9];K5.bind[pi]=G.time;k5Thread(()=>headOf(h).add(new V3(0,-0.6,0)),()=>KS.g.position.clone().add(new V3(0,2.4,0)));k5s('bind');floatText(h.pos.clone().add(new V3(0,h.d.height+0.9,0)),'Нить сказа!','#ffe08a');
    const other=1-pi,both=G.solo||players[other].downed||Math.abs(K5.bind[other]-G.time)<1.6;if(both){K5.log.push('bind'+K5.st);stageWin(K5.st);}else floatText(kosTop(),'Второй — тоже!','#ffe08a');}
  /* ---------- отзыв 3: природа, которой повелевает Кощей (этап 2; на этапе 5 — вместе с цепями) ----------
     Ветер: дует 5 с вдоль поляны — то слева направо, то справа налево — и сносит героев (щит или удар — в три раза слабее, Потапа —
     меньше). Молния — в красный круг под героем. Землетрясение: земля дрожит, под героями трескается земля, через секунду вылезает
     костлявая рука и хватает того, кто не ушёл и не кувыркнулся: урон и секунду не двинуться. Пока спесь сбита — затишье. */
  const NAT={wind:null,hands:[],grab:new Map(),said:{},wdir:1,windT:null,boltT:null,quakeT:null};K5.nat=NAT;
  function kosCast(){anim(0.6,k=>{KS.armR.rotation.x=-2.6*Math.sin(k*Math.PI);});k5s('cast');}
  function natBark(key,text,dur,chance){if(!NAT.said[key]||Math.random()<(chance==null?0.35:chance)){NAT.said[key]=true;say('koschei',text,dur);}}
  function windStart(mode,o){NAT.wind={mode,dir:o.dir||new V3(1,0,0),c:o.c||C.clone(),k:0,t:0,dur:o.dur||5,str:o.str||3};K5WIND.mode=mode;K5WIND.dir.copy(NAT.wind.dir);K5WIND.c.copy(NAT.wind.c);k5s(mode==='rad'?'gale':'wind');}
  function windStop(){if(NAT.wind)NAT.wind.dur=Math.min(NAT.wind.dur,NAT.wind.t+0.9);}
  function windTick(dt){const w=NAT.wind;if(!w){K5WIND.k=Math.max(0,K5WIND.k-dt*2.5);k5WindTick(dt,C);return;}
    w.t+=dt;const live=K5.fight&&!G.cine,up=Math.min(1,w.t/0.7),down=Math.min(1,Math.max(0,(w.dur-w.t)/0.9));w.k=live?up*down:Math.max(0,w.k-dt*3);
    K5WIND.k=w.k;k5WindTick(dt,C);if(w.t>=w.dur||(!live&&w.k<=0)){NAT.wind=null;return;}if(!live)return;
    for(const h of [active(0),active(1)]){if(!h||!h.active||players[h.player].downed||NAT.grab.has(h)||k5Locked(h))continue;let vx=w.dir.x,vz=w.dir.z;
      if(w.mode==='rad'){const dx=h.pos.x-w.c.x,dz=h.pos.z-w.c.z,d=Math.hypot(dx,dz);if(d>0.3){vx=dx/d;vz=dz/d;}else{vx=1;vz=0;}}
      let f=w.str*w.k*((h.guard||h.atkT>0)?0.3:1)*(h.kind==='potap'?0.6:1);if(w.mode==='rad')f*=clamp(1.25-hd(h.pos,w.c)/12,0.4,1);
      h.pos.x+=vx*f*dt;h.pos.z+=vz*f*dt;inArena(h.pos,0.6);if(f>1.2&&Math.random()<dt*3)FX.dust(h.pos.clone().add(new V3(0,0.1,0)),3,0xc8b898,0.5);}}
  function natBolt(h){const p=inArena(h.pos.clone(),0.8);kosCast();k5Zone(p,1.6,G.solo?1.6:1.35,0xff4a5a,q=>{if(!K5.fight)return;k5Bolt(q,0xd8b0ff);k5s('strike');k5s('bolt');shakeAll(0.05,0.25);FX.dust(q.clone(),12,0x6a5a7a);for(const x of k5Heroes())if(hd(x.pos,q)<1.7)k5Hurt(x,q);});}
  function handWarn(p,delay){const q=p.clone();k5s('crack');const cr=k5Decal(K5TEX.crack,0x3a2410,1.5,new V3(q.x,0.07,q.z),0);k5fx(delay+0.3,k=>{cr.material.opacity=Math.min(1,k*3)*0.95;},()=>k5Del(cr));
    k5Zone(q,1.2,delay,0x9a5a2a,()=>{if(K5.fight)handUp(q);});FX.dust(q.clone().add(new V3(0,0.1,0)),6,0x7a6a5a,0.8);}
  function handUp(q){const H=k5HandMake(q);NAT.hands.push(H);k5s('handUp');FX.dust(q.clone().add(new V3(0,0.2,0)),14,0x6a5a4a,1.3);k5Ring(new V3(q.x,0.1,q.z),0xc8b090,0.3,2.0,0.45,0.12);shakeAll(0.04,0.2);
    for(const h of k5Heroes()){if(hd(h.pos,q)<1.15&&!NAT.grab.has(h)){if(k5Hurt(h,q)){NAT.grab.set(h,{t:1.1,p:h.pos.clone(),H});H.grab=h;k5s('grab');floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Схватила!','#e8dcc0');K5.log.push('grab');
        }break;}}}
  function handsTick(dt){for(let i=NAT.hands.length-1;i>=0;i--){const H=NAT.hands[i];H.t+=dt;const t=H.t;
      if(t<0.22)H.g.position.y=lerp(-2.2,0,CE.outBack(t/0.22));else if(t<1.5){H.g.position.y=0;H.set(t<0.34?1:clamp(1-(t-0.34)/0.18,0,1));if(H.grab)H.g.rotation.y+=Math.sin(t*30)*0.01;}
      else{H.set(clamp((t-1.5)/0.2,0,1)*0.6);H.g.position.y=-(t-1.5)*4.5;if(t>2.0){k5Del(H.g);NAT.hands.splice(i,1);}}}
    for(const [h,g] of NAT.grab){g.t-=dt;if(g.t<=0||players[h.player].downed||!K5.fight){NAT.grab.delete(h);continue;}h.pos.x=g.p.x;h.pos.z=g.p.z;h.vel.x=0;h.vel.z=0;}}
  function quake(n,quiet){if(!quiet){k5s('quake');shakeAll(0.06,1.0);for(let i=0;i<4;i++){const a=rand(0,6.28),r=rand(2,9);FX.dust(new V3(C.x+Math.cos(a)*r,0.1,C.z+Math.sin(a)*r),8,0x8a7a6a,1);}}
    const hs=k5Heroes();if(!hs.length)return;for(let i=0;i<n;i++){const h=hs[i%hs.length],a=rand(0,6.28),r=i<hs.length?rand(0,0.5):rand(1.2,2.4);const p=inArena(new V3(h.pos.x+Math.cos(a)*r,0,h.pos.z+Math.sin(a)*r),1);
      later((quiet?0:0.5)+i*0.3,()=>{if(K5.fight)handWarn(p,G.solo?1.15:0.95);});}}
