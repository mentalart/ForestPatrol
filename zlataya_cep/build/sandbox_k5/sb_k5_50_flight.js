/* ============================== ПОЛИГОН КОЩЕЯ · ВСТУПЛЕНИЕ «НА БУЯН»: ПОЛЁТ НА ГОРЫНЫЧЕ (шаг 5) ============================== */
// Герои на спине Горыныча. Впереди три дорожки; навстречу летят вороны и грозовые тучи. Игрок 1 — левая голова: ←/→ выбирает
// дорожку, удар — огонь по ворону. Игрок 2 — правая голова: свет пера по туче (предмет). Прыжок обоих разом — большой огонь по всем
// дорожкам. В одиночку: удар — и огонь, и свет. 55 с — Буян на горизонте, посадка.
const K5F_LANES=[-6,0,6];
K5SB.scenes.flight={goal:pi=>G.solo?'Полёт на Буян: '+K(0,'left')+'/'+K(0,'right')+' — дорожка, '+K(0,'attack')+' — огонь и свет. Прыжок — большой огонь.':
    (pi===0?'Левая голова: '+K(0,'left')+'/'+K(0,'right')+' — дорожка, '+K(0,'attack')+' — огонь по ворону.':'Правая голова: '+K(1,'left')+'/'+K(1,'right')+' — дорожка, '+K(1,'item')+' — свет пера по туче.')+' Прыжок обоих разом — большой огонь!',
  build(){const S=this;setTheme('skyday');scene.fog=new THREE.Fog(0xbfd8ff,40,260);W.fallY=-999;
    colBox(-2.2,2.2,-1,0,-3,3,false);W.clampR={x:0,z:0,r:2.2};
    const sea=k5noRay(addMesh(new THREE.PlaneGeometry(900,900),M(0x3a7ab8,{emissive:0x0a2040,emissiveIntensity:0.3}),0,-40,-200));sea.rotation.x=-Math.PI/2;sea.castShadow=false;
    S.gor=makeGorynych?makeGorynych():null;if(S.gor){S.gor.g.scale.setScalar(1.6);S.gor.g.rotation.y=Math.PI;S.gor.g.traverse(o=>{k5noRay(o);o.userData.noOcc=true;});S.gy=K5SB.flyY!=null?K5SB.flyY:-6.4;S.gor.g.position.set(0,S.gy,0.5);}
    S.cl=[];for(let i=0;i<26;i++){const m=k5noRay(addMesh(new THREE.SphereGeometry(rand(3,8),10,8),new THREE.MeshLambertMaterial({color:0xffffff,transparent:true,opacity:0.85}),rand(-90,90),rand(-25,-8),rand(-300,20)));m.castShadow=false;S.cl.push(m);}
    const isl=new THREE.Group();isl.position.set(0,-40,-420);W.group.add(isl);addMesh(new THREE.SphereGeometry(40,16,10,0,Math.PI*2,0,Math.PI/2),M(0x5a8a4a),0,0,0,isl);
    addMesh(new THREE.CylinderGeometry(2,3,30,8),M(0x6a4a2a),0,40,0,isl);addMesh(new THREE.DodecahedronGeometry(10,0),M(0x4a6a3a),0,52,0,isl);isl.traverse(o=>k5noRay(o));S.isl=isl;
    S.lane=[1,1];S.th=[];S.t=0;S.spawn=1.5;S.jumpT=[-9,-9];S.dur=55;S.done=false;S.score=0;
    S.mk=[0,1].map(pi=>{const r=k5noRay(new THREE.Mesh(new THREE.RingGeometry(1.1,1.4,32),new THREE.MeshBasicMaterial({color:pi?COL.p2:COL.p1,transparent:true,opacity:0.85,depthWrite:false})));W.group.add(r);return r;});
    W.spawns=[[new V3(-0.8,0,-0.5),new V3(-0.8,0,1.5)],[new V3(0.8,0,-0.5),new V3(0.8,0,1.5)]];
    W.camFn=()=>({pos:new V3(0,8.5,12),look:new V3(0,-0.5,-22),k:3});
    const M_=FIN.music;if(M_&&M_.TR){if(k5on('music')){if(!M_.TR.k5fly&&M_.TR.w3){const T=JSON.parse(JSON.stringify(M_.TR.w3));T.bpm=(T.bpm||84)+28;M_.TR.k5fly=T;}M_.play('k5fly');}else M_.play('boss');}
    const bb=$('bossbar');bb.style.display='none';k5Item(null);},
  update(dt){const S=this;if(S.done)return;S.t+=dt;const k=Math.min(1,S.t/S.dur);
    // мир летит навстречу
    for(const c of S.cl){c.position.z+=dt*22;if(c.position.z>40){c.position.z=-300;c.position.x=rand(-90,90);}}
    S.isl.position.z=-420+k*330;S.isl.position.y=-40+k*12;
    if(S.gor){S.gor.g.position.y=S.gy+Math.sin(S.t*1.6)*0.25;const w=S.gor.wings;if(w&&w.forEach)w.forEach((x,i)=>{if(x&&x.rotation)x.rotation.z=Math.sin(S.t*4)*0.5*(i?1:-1);});}
    // дорожки игроков
    const pis=G.solo?[0]:[0,1];for(const pi of pis){if(tap(pi,'left'))S.lane[pi]=Math.max(0,S.lane[pi]-1);if(tap(pi,'right'))S.lane[pi]=Math.min(2,S.lane[pi]+1);
      S.mk[pi].position.set(K5F_LANES[S.lane[pi]],-0.3,-14);S.mk[pi].rotation.x=-Math.PI/2;S.mk[pi].visible=true;
      if(tap(pi,'jump'))S.jumpT[pi]=G.time;}
    if(G.solo)S.mk[1].visible=false;
    // всех героев держим на спине
    for(const h of HEROES){if(h.pos.y<-1){h.pos.set(0,0.1,0);h.vel.set(0,0,0);}}
    const fire=(pi,lane,big)=>{const p=new V3(K5F_LANES[lane],0.5,-3);const b=k5noRay(new THREE.Mesh(new THREE.SphereGeometry(big?1.2:0.5,8,6),MB(0xff8a20)));b.position.copy(p);W.group.add(b);
      AUD.ready()&&AUD.nz({f0:300,f1:1400,d:0.4,v:0.12,q:0.8});K5SB.tick.push(dt=>{b.position.z-=dt*60;if(FIN.fx&&Math.random()<0.5)FIN.fx.sparks(b.position.clone(),1,0xffa040);
        for(const T of S.th){if(T.dead||T.kind!=='raven'||T.lane!==lane)continue;if(Math.abs(T.g.position.z-b.position.z)<2.5){T.dead=true;burst(T.g.position.clone(),0x202020,10,4);W.group.remove(T.g);S.score++;}}
        if(b.position.z<-80){W.group.remove(b);return true;}});};
    const light=(pi,lane)=>{const p=new V3(K5F_LANES[lane],2,-30);const beam=k5noRay(new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,60,8,1,true),new THREE.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:0.6,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide})));
      beam.rotation.x=Math.PI/2;beam.position.copy(p);W.group.add(beam);anim(0.5,k=>{beam.material.opacity=0.6*(1-k);if(k>=1)W.group.remove(beam);});AUD.ready()&&AUD.bell(1568,{v:0.05,d:0.8,wet:0.5});
      for(const T of S.th){if(T.dead||T.kind!=='cloud'||T.lane!==lane||T.g.position.z<-60)continue;T.dead=true;anim(0.4,k=>{T.g.scale.setScalar(Math.max(0.01,1-k));if(k>=1)W.group.remove(T.g);});S.score++;}};
    if(G.solo){if(tap(0,'attack')){fire(0,S.lane[0]);light(0,S.lane[0]);}}else{if(tap(0,'attack'))fire(0,S.lane[0]);if(tap(1,'item')||tap(1,'attack'))light(1,S.lane[1]);}
    const both=G.solo?G.time-S.jumpT[0]<0.05:Math.abs(S.jumpT[0]-S.jumpT[1])<0.4&&G.time-Math.max(S.jumpT[0],S.jumpT[1])<0.05;
    if(both&&G.time-(S.bigT||-9)>4){S.bigT=G.time;S.jumpT=[-9,-9];k5Say(new V3(0,3,-6),'Вместе! Большой огонь!','#ffb060');for(let l=0;l<3;l++){fire(0,l,true);light(1,l);}}
    // угрозы
    S.spawn-=dt;if(S.spawn<=0&&S.t<S.dur-4){S.spawn=rand(1.0,1.8)*(1-k*0.35);const lane=Math.floor(rand(0,3)),kind=Math.random()<0.55?'raven':'cloud';const g=new THREE.Group();g.position.set(K5F_LANES[lane],kind==='raven'?1.2:3,-110);W.group.add(g);
      if(kind==='raven'){addMesh(new THREE.SphereGeometry(0.5,8,6),M(0x1a1a20),0,0,0,g);const w=new THREE.Group();g.add(w);addMesh(new THREE.BoxGeometry(2.2,0.08,0.6),M(0x101014),0,0.1,0,w);g.userData.w=w;}
      else{for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(rand(1,1.8),8,6),new THREE.MeshLambertMaterial({color:0x3a3448,emissive:0x1a0a2a}),rand(-1.5,1.5),rand(-0.5,0.8),rand(-1,1),g);}
      g.traverse(o=>k5noRay(o));S.th.push({g,lane,kind,dead:false});}
    for(const T of S.th){if(T.dead)continue;T.g.position.z+=dt*(T.kind==='raven'?28:20);if(T.g.userData.w)T.g.userData.w.rotation.z=Math.sin(G.time*16)*0.6;
      if(T.kind==='cloud'&&T.g.position.z>-40&&Math.random()<dt*0.6)k5sBolt(new V3(T.g.position.x,-6,T.g.position.z));
      if(T.g.position.z>-1){T.dead=true;W.group.remove(T.g);const h=active(Math.random()<0.5||G.solo?0:1);if(T.kind==='cloud')k5sBolt(h.pos.clone());damageHero(h,{kind:'hazard',ref:{pos:T.g.position.clone()}});}}
    S.th=S.th.filter(T=>!T.dead);
    if(S.t>=S.dur){S.done=true;banner('Буян!','#ffd76a',3,'посадка у сухого дуба · дальше — этап 1 (N)');later(3.2,()=>{if(W.levelId==='k5sb'&&K5SB.mode==='flight')K5SB.go('s1');});}}};
