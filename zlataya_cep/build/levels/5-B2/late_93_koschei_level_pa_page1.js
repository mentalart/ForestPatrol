// ---- продолжение build5B2 (k5epic, часть 10): СТРАНИЦА 1 «ИЗБУШКА ТАМ НА КУРЬИХ НОЖКАХ» (стадия 4, мир 1, клубок) ----
  // Ночная поляна Дремучего леса: лунные лучи, светлячки, туман, три старых дуба, грибные кольца, забор Яги с фонарями.
  // Яга заперта в избушке без окон и дверей, Кощей погоняет её с крыши. Избушка: бродит; разбег по красной дорожке (дорожка
  // заполняется — уходи вбок); прыжок — две ударные волны (перепрыгни или кувырок); кто сзади — лягнёт. Из чащи — «следы невиданных
  // зверей»: светящиеся отпечатки, по ним бежит чернильный волк.
  // 1 «Заманить в дуб»: разбег, который упёрся в старый дуб, — избушка застряла (листва сыплется, звёздочки): только тогда ноги
  //   можно спутать — клубок (предмет) у ноги; ногу держат две нити (от каждого; одному — две). Спутаны обе — избушка села.
  // 2 «Повернись!»: двое на золотых кругах с двух сторон — удар разом; Кощей шлёт волков на тех, кто на кругах; не успели — нити лопнули.
  // 3 «Кощей на крыше»: избушка повернулась, у неё выросло крыльцо-лестница; по ступеням — на галерею к крыше, бить Кощея (или
  //   подкидка Потапа; отбитая капля — тоже удар). Спесь сбита — Кощей слетает, Яга на ступе.
  // Атлас: charge (+ в препятствие — stagger), ground-slam/shockwave, rear kick (wide-swing сзади), secondary-cues, entity-tether,
  // tower-soak, summon, platform climb, attack-reflection. Бот — tk5e_p1.
  {const X=300,HC=new V3(X,0,-5.5);const A={theme:'forest',face:Math.PI,clamp:{x:X,z:0,r:14},fallY:-12};AR[1]=A;
    A.spawn=i=>new V3(X-3+i*2,0,9);
    const OAKS=[[X-10.2,-6.5],[X+10.4,-5],[X+0.5,-12.6]].map(([x,z])=>new V3(x,0,z)),OAK_R=1.5;
    const STEPS=[[X+5.1,1.0,-2.6],[X+6.0,2.0,-5.8],[X+4.6,3.0,-8.8],[X+2.4,4.0,-9.6]],BALC=[X+1.9,4.6,-6.9];
    A.g=E.capture(()=>{ground(X-16,X+16,-16,16,0,M(0x2c4a2a));
      for(let i=0;i<22;i++){const m=new THREE.Mesh(new THREE.CircleGeometry(rand(1.4,3.2),12),M(i%2?0x24401f:0x3a5a2e));m.rotation.x=-Math.PI/2;m.position.set(X+rand(-13,13),0.02,rand(-13,13));W.group.add(m);}
      // ёлки вокруг
      for(let i=0;i<40;i++){const a=i/40*Math.PI*2,r=rand(15,20);const g=new THREE.Group();g.position.set(X+Math.cos(a)*r,0,Math.sin(a)*r);W.group.add(g);const s=rand(0.9,1.4);
        addMesh(new THREE.CylinderGeometry(0.3*s,0.45*s,2*s,6),M(0x3a2a1a),0,1*s,0,g);for(let j=0;j<4;j++)addMesh(new THREE.ConeGeometry((2.4-j*0.5)*s,3*s,7),M(j%2?0x1e3a28:0x24442e),0,(2.4+j*1.5)*s,0,g);}
      // старые дубы — в них избушка застревает
      for(const o of OAKS){const g=new THREE.Group();g.position.copy(o);W.group.add(g);addMesh(new THREE.CylinderGeometry(1.0,OAK_R,7,10),M(0x4a3420),0,3.5,0,g);
        for(let k=0;k<6;k++){const a=k/6*6.28,r=addMesh(new THREE.CylinderGeometry(0.18,0.32,2.2,6),M(0x4a3420),Math.cos(a)*1.4,0.3,Math.sin(a)*1.4,g);r.rotation.set(-Math.sin(a)*1.1,0,Math.cos(a)*1.1);}
        for(let k=0;k<7;k++)addMesh(new THREE.SphereGeometry(rand(2.2,3.2),10,8),M(k%2?0x2a5a2a:0x335f30),rand(-2.4,2.4),7+rand(-0.5,1.8),rand(-2.4,2.4),g);
        const hole=addMesh(new THREE.CircleGeometry(0.42,14),MB(0x140c06),0,2.4,OAK_R*0.86,g);hole.rotation.y=Math.atan2(X-o.x,0-o.z);}
      // забор Яги: колья с фонарями
      for(let i=0;i<12;i++){const a=Math.PI*(1.12+i/11*0.76),r=13.6;const x=X+Math.cos(a)*r,z=Math.sin(a)*r;addMesh(new THREE.CylinderGeometry(0.1,0.14,2.2,6),M(0x5a4430),x,1.1,z);
        const l=addMesh(new THREE.SphereGeometry(0.26,10,8),M(0xe8dcc0,{emissive:0x6a4a10,emissiveIntensity:0.4}),x,2.4,z);for(const s of[-1,1])addMesh(new THREE.SphereGeometry(0.06,6,5),MB(0xffb040),x+s*0.09*Math.cos(a+Math.PI/2),2.45,z+s*0.09*Math.sin(a+Math.PI/2));}
      // грибные кольца
      for(const [cx,cz,r] of[[X-6,4.5,1.4],[X+7,6,1.1],[X-2,-9,1.2]])for(let k=0;k<9;k++){const a=k/9*6.28;addMesh(new THREE.CylinderGeometry(0.05,0.07,0.25,6),M(0xe8e0d0),cx+Math.cos(a)*r,0.12,cz+Math.sin(a)*r);
        addMesh(new THREE.SphereGeometry(0.16,8,6,0,6.28,0,1.6),M(0x6af0e0,{emissive:0x2aa8a0,emissiveIntensity:0.9}),cx+Math.cos(a)*r,0.25,cz+Math.sin(a)*r);}
      // луна
      {const m=new THREE.Mesh(new THREE.CircleGeometry(9,32),MB(0xf0f4ff,{fog:false}));m.position.set(X-30,48,-120);m.lookAt(X,0,0);W.group.add(m);const h=new THREE.Mesh(new THREE.CircleGeometry(18,32),MB(0xb8c8ff,{fog:false,transparent:true,opacity:0.18,depthWrite:false}));h.position.set(X-29.9,47.9,-119.6);h.lookAt(X,0,0);W.group.add(h);}});
    const oakCyl=OAKS.map(o=>{const c={x:o.x,z:o.z,r:OAK_R+0.2,miny:-1,maxy:8,on:false};W.cyls.push(c);return c;});
    const hut=makeHut();W.group.remove(hut.g);A.g.add(hut.g);hut.g.scale.setScalar(1.25);K5L.noRay(hut.g);const roofY=(new THREE.Box3().setFromObject(hut.g)).max.y+0.1;
    const hutCyl={x:X,z:-4,r:1.9,miny:-1,maxy:roofY-0.4,on:false};W.cyls.push(hutCyl);
    // нить клубка на ноге и золотые круги «Повернись!»
    const tieM=new THREE.TorusGeometry(0.42,0.07,5,16),tieMat=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.7});
    const legW=i=>{const p=new V3();(hut.legs&&hut.legs[i]?hut.legs[i]:hut.g).getWorldPosition(p);p.y=0;return p;};
    const circles=[0,1].map(()=>{const m=new THREE.Mesh(new THREE.RingGeometry(0.9,1.2,32),k5Add(0xffd76a,{opacity:0.9}));m.rotation.x=-Math.PI/2;m.visible=false;A.g.add(m);return m;});
    // крыльцо-лестница и галерея (видны и твёрдые — после поворота)
    const stepBox=STEPS.map(([x,y,z])=>colBox(x-0.9,x+0.9,y-0.35,y,z-0.9,z+0.9,false)),balBox=colBox(BALC[0]-1.1,BALC[0]+1.1,BALC[1]-0.35,BALC[1],BALC[2]-1.1,BALC[2]+1.1,false);
    const stairs=new THREE.Group();A.g.add(stairs);STEPS.forEach(([x,y,z])=>{const g=new THREE.Group();g.position.set(x,y-0.17,z);stairs.add(g);const lg=new THREE.CylinderGeometry(0.3,0.3,1.9,8);lg.rotateZ(Math.PI/2);
      for(let k=0;k<3;k++)addMesh(lg,M(0x7a5230),0,0,-0.6+k*0.6,g);const p=addMesh(new THREE.CylinderGeometry(0.12,0.14,y,6),M(0x5a3a20),0,-y/2,0,g);p.castShadow=false;});
    {const g=new THREE.Group();g.position.set(BALC[0],BALC[1]-0.17,BALC[2]);stairs.add(g);addMesh(new THREE.BoxGeometry(2.2,0.34,2.2),M(0x7a5230),0,0,0,g);for(const s of[-1,1])addMesh(new THREE.BoxGeometry(2.2,0.6,0.1),M(0x5a3a20),0,0.45,s*1.05,g);}
    stairs.visible=false;K5L.noRay(stairs);
    // чернильный волк
    function wolfMake(){const g=new THREE.Group();const ink=M(0x1a1026,{emissive:0x3a1060,emissiveIntensity:0.45});part(g,new THREE.SphereGeometry(0.55,10,8),ink,0,0.85,0).scale.set(0.8,0.75,1.5);
      const head=new THREE.Group();head.position.set(0,1.15,0.85);g.add(head);part(head,new THREE.SphereGeometry(0.34,10,8),ink,0,0,0);const sn=new THREE.ConeGeometry(0.18,0.5,6);sn.rotateX(Math.PI/2);part(head,sn,ink,0,-0.06,0.38);
      for(const s of[-1,1]){const e=part(head,new THREE.ConeGeometry(0.1,0.3,4),ink,s*0.17,0.3,-0.05);e.rotation.z=-s*0.2;part(head,new THREE.SphereGeometry(0.06,6,5),MB(0xc8ff6a),s*0.13,0.08,0.25);}
      const legs=[];for(const [x,z] of[[-0.25,0.45],[0.25,0.45],[-0.25,-0.45],[0.25,-0.45]]){const l=new THREE.Group();l.position.set(x,0.75,z);g.add(l);part(l,new THREE.CylinderGeometry(0.08,0.06,0.75,6),ink,0,-0.37,0);legs.push(l);}
      const tail=part(g,new THREE.ConeGeometry(0.14,0.8,6),ink,0,1.0,-0.85);tail.rotation.x=-2.2;A.g.add(g);K5L.noRay(g);return {g,legs,head};}
    const S={};A.S=S;A.legW=i=>legW(i);A.hut=hut;A.OAKS=OAKS;A.STEPS=STEPS;A.BALC=BALC;
    function reset(){S.st='walk';S.t=0;S.cd=3;S.tgt=new V3(X,0,-4);S.ties=[[],[]];S.tied=[false,false];S.sitT=0;S.turn=[-9,-9];S.done=false;S.beasts=[];S.beastT=5;S.letT=4;S.stuckN=0;S.phase=1;S.spes=G.solo?2:3;S.bolts=0;
      hut.g.position.set(X,0,-4);hut.g.rotation.set(0,0,0);if(hut.door)hut.door.visible=false;if(hut.house)hut.house.position.y=hut.house.userData.y0==null?(hut.house.userData.y0=hut.house.position.y):hut.house.userData.y0;
      (S.tieMs||[]).forEach(k5Del);S.tieMs=[];circles.forEach(c=>{c.visible=false;});hutCyl.on=true;oakCyl.forEach(c=>{c.on=true;});stairs.visible=false;stepBox.forEach(b=>{b.on=false;});balBox.on=false;if(S.wolves)S.wolves.forEach(w=>k5Del(w.m.g));S.wolves=[];}
    A.start=q=>{reset();KS.g.visible=true;dome.visible=false;KS.g.rotation.y=Math.PI;ES.fight=false;ES.prog=0;
      K5X.fog(new V3(X,0,0),15,0x9ab8d8,20,{op:0.35,y0:0.3,y1:1.8});K5X.motes('fire',new V3(X,0,0),14,150,5);K5X.rays(new V3(X-3,0,-2),0xd8e8ff,5,{spread:9,op:0.22});K5X.tint('rgba(10,20,50,.85)',0.5);
      E.lesson(4,()=>{ES.fight=true;if(!q)later(0.4,()=>say('koschei','Ну-ка, избушка, — побегай! Пусть ловят!',2.4));});};
    A.end=()=>{hutCyl.on=false;oakCyl.forEach(c=>{c.on=false;});stepBox.forEach(b=>{b.on=false;});balBox.on=false;KS.g.visible=false;for(const B of S.beasts||[]){B.ms.forEach(k5Del);if(B.w)k5Del(B.w.g);}S.beasts=[];if(S.lane)S.lane.cancel();(S.wolves||[]).forEach(w=>k5Del(w.m.g));S.wolves=[];};
    const hutP=()=>hut.g.position;
    /* ---------- приёмы избушки ---------- */
    function charge(h){const p=hutP().clone(),d=new V3(h.pos.x-p.x,0,h.pos.z-p.z).normalize();S.st='aim';S.t=0;S.dir=d;S.from=p;
      // куда упрётся: дуб на пути — до него, иначе до края
      let L=16;for(const o of OAKS){const v=new V3(o.x-p.x,0,o.z-p.z),k=v.dot(d);if(k<=0)continue;const side=Math.hypot(v.x-d.x*k,v.z-d.z*k);if(side<OAK_R+1.2&&k-OAK_R-1.4<L)L=Math.max(2,k-OAK_R-1.4);}S.L=L;
      if(FIN.k2fx)S.lane=FIN.k2fx.lane(p.clone(),p.clone().addScaledVector(d,L),2.6,G.solo?1.6:1.3,'red');k5s('pSoft');if(Math.random()<0.5)say('koschei',['Н-но, пошла!','Топчи их!','Вперёд, курья нога!'][Math.floor(rand(0,3))],1.2);}
    function stomp(){S.st='crouch';S.t=0;}
    function kick(){S.st='kick';S.t=0;const P=hutP(),b=new V3(-Math.sin(hut.g.rotation.y),0,-Math.cos(hut.g.rotation.y));S.kdir=b;if(FIN.k2fx)FIN.k2fx.tele(P.x+b.x*2.6,0,P.z+b.z*2.6,2.4,0.6,'red');}
    function stuck(o){S.st='stuck';S.t=0;S.stuckT=G.solo?8.5:7;S.stuckN++;if(S.lane){S.lane.cancel();S.lane=null;}shakeAll(0.14,0.5);k5s('stomp');if(AUD.ready())AUD.thump({f0:80,f1:30,d:0.6,v:0.3});
      FX.leaves&&FX.leaves(o.clone().add(new V3(0,6,0)),26);FX.dust(hutP().clone(),20,0x6a5a3a,2);K5X.screen('#fff',0.15,0.3);E.log('hutStuck');
      if(S.stuckN>1)say('koschei','Эх, глупая изба! Вылезай!',2.6);
      const t0=G.time;anim(0.5,k=>{if(S.st==='stuck')hut.g.rotation.x=-0.25*Math.sin(Math.min(1,k)*Math.PI*0.5);});}
    // следы невиданных зверей → чернильный волк бежит по ним
    function beast(h){const f=new V3(X+(h.pos.x>X?-15:15),0,h.pos.z+rand(-4,4)),to=h.pos.clone();to.y=0;const d=to.clone().sub(f),L=d.length()+6;d.normalize();const ms=[];
      for(let i=0;i<9;i++){const m=new THREE.Mesh(new THREE.CircleGeometry(0.26,10),k5Add(0xb8ff8a,{opacity:0}));m.rotation.x=-Math.PI/2;const q=f.clone().addScaledVector(d,(i+1)*L/10);m.position.set(q.x+(i%2?0.25:-0.25),0.06,q.z);A.g.add(m);ms.push(m);
        later(i*0.14,()=>{m.material.opacity=0.95;k5s('step');});}
      S.beasts.push({ms,f,d,L,t:0,w:null});}
    function wolfGuard(h){const w=wolfMake();const a=rand(0,6.28);w.g.position.set(h.pos.x+Math.cos(a)*9,0,h.pos.z+Math.sin(a)*9);K5L.ink(w.g.position.clone().add(new V3(0,0.6,0)),14);S.wolves.push({m:w,tgt:h,t:0,cd:1.4,lunge:null,hp:2});}
    W.hittables.push({pos:new V3(),r:0.9,alive:()=>false,onHit:()=>{}});   // место под волков (их бьют через A.attack)
    /* ---------- шаг ---------- */
    A.tick=dt=>{if(!ES.fight)return;S.t+=dt;const P=hutP();hutCyl.x=P.x;hutCyl.z=P.z;
      if(S.phase<3){KS.g.position.set(P.x,roofY+(hut.house?hut.house.position.y-hut.house.userData.y0:0),P.z);if(!S.done)KS.g.rotation.y=hut.g.rotation.y+Math.PI;}
      const moving=S.st==='walk'||S.st==='dash',kicking=S.st==='stuck';if(hut.legs)hut.legs.forEach((l,i)=>{l.rotation.x=moving?Math.sin(S.t*(S.st==='dash'?16:8)+i*Math.PI)*0.5:kicking?Math.sin(S.t*20+i*2)*0.7:0;});
      ES.prog=S.phase===1?(S.tied[0]+S.tied[1])/6:S.phase===2?0.4:0.6+0.4*(1-S.spes/(G.solo?2:3));
      if(S.st==='walk'){S.cd-=dt;const d=S.tgt.clone().sub(P);d.y=0;if(d.length()<1)S.tgt.set(X+rand(-8,8),0,rand(-8,6));else{d.normalize();P.addScaledVector(d,2.4*dt);hut.g.rotation.y=angDamp(hut.g.rotation.y,Math.atan2(d.x,d.z),4,dt);}
        if(S.cd<=0&&!K5.listen){S.cd=G.solo?4.4:3.4;const h=nearH(P);if(h){const back=new V3(-Math.sin(hut.g.rotation.y),0,-Math.cos(hut.g.rotation.y)),v=new V3(h.pos.x-P.x,0,h.pos.z-P.z);
            if(v.length()<4.5&&v.normalize().dot(back)>0.5)kick();else if(Math.random()<0.62)charge(h);else stomp();}}}
      else if(S.st==='aim'){if(Math.random()<0.5)FX.dust(P.clone(),1,0x6a5a3a);hut.g.rotation.y=angDamp(hut.g.rotation.y,Math.atan2(S.dir.x,S.dir.z),8,dt);if(S.t>(G.solo?1.6:1.3)){S.st='dash';S.t=0;S.hit=new Set();S.run=0;}}
      else if(S.st==='dash'){const st=13*dt;P.addScaledVector(S.dir,st);S.run+=st;hut.g.rotation.y=Math.atan2(S.dir.x,S.dir.z);if(Math.random()<0.6)FX.dust(P.clone(),1,0x6a5a3a);
        for(const h of k5Heroes())if(!S.hit.has(h)&&hd(h.pos,P)<2.0&&h.pos.y<2&&h.rollT<=0){S.hit.add(h);k5Hurt(h,P);}
        const oak=OAKS.find(o=>hd(o,P)<OAK_R+1.6);if(oak){stuck(oak);}
        else if(S.run>=S.L||Math.abs(P.x-X)>13||Math.abs(P.z)>13){P.x=clamp(P.x,X-13,X+13);P.z=clamp(P.z,-13,13);S.st='walk';S.cd=G.solo?3:2;if(S.lane){S.lane.cancel();S.lane=null;}shakeAll(0.04,0.2);}}
      else if(S.st==='stuck'){S.stuckT-=dt;if(Math.random()<dt*3)FX.stars&&FX.stars(P.clone().add(new V3(0,roofY+0.6,0)),1,0xfff4a0);if(S.stuckT<=0){S.st='walk';S.cd=1.2;hut.g.rotation.x=0;
          const back=new V3(-Math.sin(hut.g.rotation.y),0,-Math.cos(hut.g.rotation.y));anim(0.4,k=>{P.addScaledVector(back,0.08);});floatText(P.clone().add(new V3(0,roofY+1,0)),'Вырвалась!','#c8a8ff');}}
      else if(S.st==='crouch'){if(hut.house)hut.house.position.y=hut.house.userData.y0-Math.min(1,S.t/0.6)*0.6;if(S.t>0.7){S.st='air';S.t=0;}}
      else if(S.st==='air'){const k=S.t/0.8;hut.g.position.y=Math.sin(Math.min(1,k)*Math.PI)*4;if(hut.house)hut.house.position.y=hut.house.userData.y0;if(k>=1){hut.g.position.y=0;S.st='walk';S.cd=G.solo?3.5:2.5;k5s('stomp');shakeAll(0.08,0.35);
          FX.dust(P.clone(),22,0x6a5a3a,2.2);const c=P.clone();K5X.shock(c,10,9,0xff8a5a,{h:0.8});later(0.45,()=>{if(E.cur===4&&ES.fight)K5X.shock(c,10,8,0xff8a5a,{h:0.8});});}}
      else if(S.st==='kick'){if(S.t>0.6&&!S.kicked){S.kicked=true;const b=S.kdir,c=P.clone().addScaledVector(b,2.6);FX.dust(c.clone(),12,0x6a5a3a,1.6);k5s('stomp');
          for(const h of k5Heroes())if(hd(h.pos,c)<2.4&&h.pos.y<1.5&&h.rollT<=0){k5Hurt(h,P);h.vel.x+=b.x*9;h.vel.z+=b.z*9;}}if(S.t>1.0){S.st='walk';S.kicked=false;S.cd=1.6;}}
      else if(S.st==='sit'){S.sitT-=dt;if(hut.house)hut.house.position.y=hut.house.userData.y0-1.1;
        const fw=new V3(Math.sin(hut.g.rotation.y),0,Math.cos(hut.g.rotation.y));const cp=[P.clone().addScaledVector(fw,3.4),P.clone().addScaledVector(fw,-3.4)];circles.forEach((c,i)=>{c.visible=true;c.position.set(cp[i].x,0.07,cp[i].z);c.scale.setScalar(1+0.08*Math.sin(G.time*6));});
        if(S.sitT<=0){S.st='walk';S.phase=1;S.tied=[false,false];S.ties=[[],[]];S.tieMs.forEach(k5Del);S.tieMs=[];circles.forEach(c=>{c.visible=false;});floatText(P.clone().add(new V3(0,roofY+1,0)),'Распуталась!','#c8a8ff');
          (S.wolves||[]).forEach(w=>{K5L.ink(w.m.g.position.clone().add(new V3(0,0.6,0)),10);k5Del(w.m.g);});S.wolves=[];}}
      else if(S.st==='turn'){if(S.t>1.4){S.st='open';S.t=0;}}
      // волки-сторожа: бегут к своим, бросаются по дорожке
      for(const w of S.wolves.slice()){const g=w.m.g,p=g.position,h=w.tgt;w.t+=dt;w.m.legs.forEach((l,i)=>{l.rotation.x=Math.sin(G.time*14+i*1.7)*0.6;});
        if(w.lunge){w.lunge.t+=dt;if(w.lunge.t>0.8){const k=Math.min(1,(w.lunge.t-0.8)/0.3);p.lerpVectors(w.lunge.f,w.lunge.to,k);if(!w.lunge.hit)for(const q of k5Heroes())if(hd(q.pos,p)<1.1&&q.rollT<=0&&!q.guard){w.lunge.hit=true;k5Hurt(q,p);}
            if(k>=1){w.lunge=null;w.cd=G.solo?2.8:2;}}continue;}
        const dx=h.pos.x-p.x,dz=h.pos.z-p.z,d=Math.hypot(dx,dz)||1;g.rotation.y=angDamp(g.rotation.y,Math.atan2(dx,dz),6,dt);w.cd-=dt;if(d>3){p.x+=dx/d*4.2*dt;p.z+=dz/d*4.2*dt;}
        if(w.cd<=0&&d<5.5){const to=new V3(p.x+dx/d*Math.min(5,d+1.2),0,p.z+dz/d*Math.min(5,d+1.2));w.lunge={t:0,f:p.clone(),to,hit:false};if(FIN.k2fx)FIN.k2fx.lane(p.clone(),to,1.3,0.8,'red');}}
      // Кощей с крыши: буквы
      if(S.phase===1&&S.st!=='stuck'&&!K5.listen){S.letT-=dt;if(S.letT<=0){S.letT=G.solo?8:6;const h=nearH(P);if(h)E.letterAt(Math.random()<0.5?'Л':'О',h);}}
      // следы невиданных зверей
      if(!S.done&&S.phase!==2){S.beastT-=dt;if(S.beastT<=0){S.beastT=G.solo?9:6.5;const hs=k5Heroes();if(hs.length)beast(hs[Math.floor(rand(0,hs.length))]);}}
      for(const B of S.beasts.slice()){B.t+=dt;if(B.t>1.5&&!B.w){B.w=wolfMake();B.w.g.position.copy(B.f);B.w.g.rotation.y=Math.atan2(B.d.x,B.d.z);B.hit=new Set();k5s('whoosh');}
        if(B.w){const p=B.w.g.position;p.addScaledVector(B.d,15*dt);B.w.legs.forEach((l,i)=>{l.rotation.x=Math.sin(G.time*22+i*1.7)*0.8;});if(Math.random()<0.5)K5L.ink(p.clone().add(new V3(0,0.6,0)),1,0.5);
          for(const h of k5Heroes())if(!B.hit.has(h)&&hd(h.pos,p)<1.2&&h.pos.y<1.5&&h.rollT<=0){B.hit.add(h);k5Hurt(h,p);}}
        if(B.t>3.6){B.ms.forEach(k5Del);if(B.w){K5L.ink(B.w.g.position.clone().add(new V3(0,0.6,0)),10);k5Del(B.w.g);}S.beasts.splice(S.beasts.indexOf(B),1);}else B.ms.forEach(m=>{m.material.opacity=Math.max(0,m.material.opacity-dt*0.22);});}
      // повернулась: дверь, крыльцо-лестница; Кощей на крыше
      if(S.st==='open'&&S.phase===2){S.phase=3;S.st='roof';if(hut.door)hut.door.visible=true;E.log('hutOpen');stairs.visible=true;stepBox.forEach(b=>{b.on=true;});balBox.on=true;
        stairs.position.y=-6;anim(0.9,k=>{stairs.position.y=-6*(1-CE.outBack(k));});K5L.gold(new V3(BALC[0],BALC[1],BALC[2]),20);
        say('koschei','Не подходи! Крыша моя!',1.8);banner('Крыльцо!','#ffd76a',2.2);S.roofT=2;}
      if(S.phase===3&&!S.done){S.roofT-=dt;const top=k5Heroes().filter(h=>h.pos.y>2.5);
        if(S.roofT<=0){S.roofT=G.solo?3.6:2.8;const h=top.sort((a,b)=>b.pos.y-a.pos.y)[0]||nearH(P);if(h){if(h.pos.y>2.5)K5X.bolt({pos:KS.g.position,onReflect:()=>{if(E.cur===4&&!S.done)roofHit(null,'Капля — в него!');}},h,{col:0x9a40ff,y:1.6,speed:G.solo?5.5:6.5});
            else E.letterAt(Math.random()<0.5?'Л':'О',h);}}
        // подкидка Потапа к крыше — тоже удар
        for(const h of k5Heroes())if(h.pos.y>3.2&&hd(h.pos,KS.g.position)<2.2&&G.time>(S.tossCd||0)&&!h.grounded){S.tossCd=G.time+1;roofHit(h,'Подкидка!');}}
      if(S.done&&!S.wonSent){S.wonSent=true;}};
    function roofHit(h,txt){if(S.done||S.phase!==3)return;if(G.time<(S.hitCd||0))return;S.hitCd=G.time+0.35;S.spes--;burst(KS.g.position.clone().add(new V3(0,2,0)),0xffffff,10,3);FX.sparks(KS.g.position.clone().add(new V3(0,2,0)),10,0xffd76a);
      try{KA.pose('recoil',{snap:true});later(0.4,()=>KA.reset());}catch(e){}if(txt)floatText(KS.g.position.clone().add(new V3(0,3.2,0)),txt,'#ffe08a');
      if(S.spes>0)return;S.done=true;ES.prog=1;const P=hutP();const st=makeStupa();W.group.remove(st.g);A.g.add(st.g);st.g.position.copy(P).add(new V3(0,1.2,0));
      barkS(st,'yaga','Ох, спасибо, голубчики! А ну, Кощеюшка, — слезай с моей крыши!',3,true);
      anim(1.0,k=>{st.g.position.set(P.x+Math.sin(k*Math.PI)*2,1.2+k*(roofY-0.6),P.z+Math.cos(k*Math.PI)*2);});
      later(1.0,()=>{K5L.ink(KS.g.position.clone().add(new V3(0,2,0)),26);k5s('shatter');const f=KS.g.position.clone();anim(0.7,k=>{KS.g.position.set(f.x+k*4,f.y+Math.sin(k*Math.PI)*2-k*f.y,f.z-k*3);});
        later(0.8,()=>{KS.g.visible=false;say('koschei','Ничего! Ещё не вечер!',1.6);E.won(4);});});}
    // удары: по Кощею на крыше (только сверху — с галереи), по волкам-сторожам
    W.hittables.push({pos:new V3(),r:2.2,alive:()=>E.cur===4&&ES.fight&&S.phase===3&&!S.done,onHit:h=>{if(h.pos.y<3.2)return;roofHit(h);}});const roofHt=W.hittables[W.hittables.length-1];
    W.updates.push(()=>{if(E.cur===4)roofHt.pos.copy(KS.g.position);});
    // клубок: нить на ногу (предмет у ноги) — только когда избушка застряла в дубе
    A.item=pi=>{if(E.cur!==4||!ES.fight||S.done||S.phase!==1)return null;const h=active(pi);let li=-1,bd=2.8;for(let i=0;i<2;i++){const d=hd(h.pos,legW(i));if(d<bd){bd=d;li=i;}}if(li<0)return null;
      if(S.st!=='stuck')return ()=>floatText(legW(li).add(new V3(0,2.4,0)),'бегает — сначала заманите в дуб!','#ffe08a');
      return ()=>{const ties=S.ties[li];ties.push({pi,t:G.time});SFX.thwip&&SFX.thwip();
        const m=new THREE.Mesh(tieM,tieMat);m.rotation.x=Math.PI/2;m.position.set(0,-0.6-ties.length*0.25,0);(hut.legs[li]||hut.g).add(m);S.tieMs.push(m);K5L.gold(legW(li).add(new V3(0,1,0)),8);
        const ok=G.solo?ties.length>=2:new Set(ties.map(q=>q.pi)).size>=2;floatText(legW(li).add(new V3(0,2.4,0)),ok?'Нога спутана!':'нить! теперь — второй','#ffe08a');
        if(ok&&!S.tied[li]){S.tied[li]=true;E.log('tie'+li);if(S.tied[0]&&S.tied[1]){S.st='sit';S.phase=2;S.sitT=G.solo?17:14;if(S.lane){S.lane.cancel();S.lane=null;}hut.g.position.y=0;hut.g.rotation.x=0;k5s('stomp');say('koschei','Стой! Куда?! Ноги… спутаны! Волки — ко мне!',1.8);
            for(const q of k5Heroes())later(1.2,()=>{if(S.st==='sit')wolfGuard(q);});later(0.6,()=>say('yaga','Избушка, избушка! Повернись к лесу задом, ко мне — передом!',3,true));}}};};
    // удар: на круге — «повернись!»; рядом с волком-сторожем — по волку
    A.attack=h=>{if(E.cur!==4)return;for(const w of S.wolves.slice()){if(hd(h.pos,w.m.g.position)<2.2){w.hp--;burst(w.m.g.position.clone().add(new V3(0,0.8,0)),0x9a60ff,10,3);if(w.hp<=0){K5L.ink(w.m.g.position.clone().add(new V3(0,0.6,0)),16);k5Del(w.m.g);S.wolves.splice(S.wolves.indexOf(w),1);}return;}}
      if(S.st!=='sit')return;const i=circles.findIndex(c=>c.visible&&hd(h.pos,c.position)<1.4);if(i<0)return;S.turn[i]=G.time;FX.sparkle(circles[i].position.clone().add(new V3(0,0.5,0)),8,0xffd76a);
      const both=G.solo?true:Math.abs(S.turn[0]-S.turn[1])<1.0;if(both){S.st='turn';S.t=0;circles.forEach(c=>{c.visible=false;});(S.wolves||[]).forEach(w=>{K5L.ink(w.m.g.position.clone().add(new V3(0,0.6,0)),10);k5Del(w.m.g);});S.wolves=[];
        const r0=hut.g.rotation.y,p0=hutP().clone();anim(1.3,k=>{hut.g.rotation.y=r0+Math.PI*CE.inOutCubic(k);hut.g.position.lerpVectors(p0,HC,CE.inOutCubic(k));});k5s('reveal');E.log('turn');}
      else floatText(h.pos.clone().add(new V3(0,2,0)),'Разом! Второй — тоже!','#ffe08a');};
    A.bot={stuck:()=>{const o=OAKS[0];hut.g.position.set(o.x+OAK_R+1.6,0,o.z);stuck(o);},roofHit:h=>roofHit(h)};   // для ботов
    /* ---------- обучающая катсцена стадии 4: дуб, клубок, волна, «Повернись!», крыльцо и крыша ---------- */
    E.LES[4]=L=>{const po=T.potap,pr=T.proshka,pe=T.pelageya,yo=T.yosha,H=(x,z)=>[x,0.9,z],hp0=hut.g.position.clone(),hr0=hut.g.rotation.clone(),hy0=hut.house?(hut.house.userData.y0==null?hut.house.position.y:hut.house.userData.y0):0;
      const O0=OAKS[0],ties=[],pips=L.pips(3);pips.g.visible=false;const roofAt=()=>KS.g.position.set(hut.g.position.x,roofY+(hut.house?hut.house.position.y-hy0:0)+hut.g.position.y,hut.g.position.z);
      L.on(()=>{hut.g.position.copy(hp0);hut.g.rotation.copy(hr0);if(hut.house)hut.house.position.y=hy0;if(hut.door)hut.door.visible=false;stairs.visible=false;stepBox.forEach(b=>{b.on=false;});balBox.on=false;circles.forEach(c=>{c.visible=false;});ties.forEach(k5Del);KS.g.rotation.x=0;});
      const rfx=k5fx(999,()=>{if(KS.g.visible)roofAt();});L.on(()=>{rfx.t=rfx.dur;});
      L.put(po,X-4.2,-1.2);L.put(pr,X-2.2,-0.6);L.put(pe,X+2.2,-0.6);L.put(yo,X+4.2,-1.2);KS.g.visible=true;KS.g.rotation.y=Math.PI;roofAt();
      // 1. что за стадия
      L.beat(5.4,{cam:[[X,12,17],[X,1.5,-3],[X,9,13],[X,2,-3]],need:[H(X-4.2,-1.2),H(X+4.2,-1.2),[X,5,-4]],says:[['zven','Яга заперта в избушке без окон, без дверей.',0.2,3.0],['zven','Кощей погоняет избушку с крыши!',3.3,2.0]],ev:[[1.0,()=>{L.pose('point');}],[2.6,()=>{hut.legs&&hut.legs.forEach((l,i)=>{anim(1.2,k=>{l.rotation.x=Math.sin(k*20+i*Math.PI)*0.5;});});}]]});
      // 2. разбег — в дуб
      L.beat(9.4,{cam:[[X-1,9,10],[X-5.5,1.2,-5]],need:[H(X-7.2,-6),[O0.x,3,O0.z]],says:[['zven','Красная дорожка — избушка разбежится по ней.',0.2,3.4],['zven','Встань спиной к старому дубу и уйди вбок в последний миг —',3.8,3.4],['zven','избушка врежется и застрянет!',7.0,2.3]],
        ev:[[0,()=>{L.put(po,X-7.2,-6.0);hut.g.position.set(X,0,-4);hut.g.rotation.y=Math.atan2(po.pos.x-X,po.pos.z+4);L.look(po,hut.g.position);}],
          [0.8,()=>{const from=hut.g.position.clone(),to=new V3(O0.x+OAK_R+1.6,0,O0.z+0.4);const ln=FIN.k2fx&&FIN.k2fx.lane(from,to,2.6,2.2,'red');L.on(()=>{if(ln&&ln.cancel)ln.cancel();});k5s('pSoft');L.pose('cast',{antic:0.2});
            L.later(2.4,()=>{const f=hut.g.position.clone();FX.dust(f,8,0x6a5a3a,1.5);anim(1.25,k=>{hut.g.position.lerpVectors(f,to,CE.inOutCubic(k));if(Math.random()<0.5)FX.dust(hut.g.position.clone(),1,0x6a5a3a);if(k>=1){shakeAll(0.14,0.5);k5s('stomp');FX.leaves&&FX.leaves(O0.clone().add(new V3(0,6,0)),26);FX.dust(to.clone(),20,0x6a5a3a,2);anim(0.5,q=>{hut.g.rotation.x=-0.25*Math.sin(Math.min(1,q)*Math.PI*0.5);});}});});}],
          [4.0,()=>L.roll(po,0.4,2.6,0.4)],[5.6,()=>{k5fx(3,()=>{if(Math.random()<0.1)FX.stars&&FX.stars(hut.g.position.clone().add(new V3(0,roofY+0.6,0)),1,0xfff4a0);});}]]});
      // 3. клубок на ноги
      L.beat(7.4,{cam:[[X-5,4.4,1.5],[X-1.8,1,-4.2]],need:[H(X-3.0,-1.6),[X-2,0.5,-4.2]],says:[['zven','Застряла! Клубок '+kbd('item')+' — у ноги, нить от каждого:',0.2,3.8],['zven','избушка не сможет убежать.',4.2,2.6]],
        ev:[[0,()=>{L.put(po,X-3.0,-1.6);L.put(pe,X+0.6,-1.6);L.look(po,legW(0));L.look(pe,legW(1));}],...[0,1,2,3].map(i=>[0.8+i*0.75,()=>{const li=i%2,m=new THREE.Mesh(tieM,tieMat);m.rotation.x=Math.PI/2;m.position.set(0,-0.6-Math.floor(i/2)*0.25-0.25,0);(hut.legs[li]||hut.g).add(m);ties.push(m);SFX.thwip&&SFX.thwip();K5L.gold(legW(li).add(new V3(0,1,0)),8);}]),
          [4.6,()=>{if(hut.house){const y1=hut.house.position.y;anim(0.6,k=>{hut.house.position.y=y1-1.1*k;});}hut.g.rotation.x=0;k5s('stomp');FX.dust(hut.g.position.clone(),14,0x6a5a3a,1.8);}]]});
      // 4. волна по земле
      L.beat(4.6,{cam:[[X,7,9],[X,0.8,-3]],need:[H(X-1.6,-0.4),[X,3,-4]],says:[['zven','Прыгнула — по земле бежит волна.',0.2,2.6],['zven','Перепрыгни её!',2.9,1.6]],
        ev:[[0,()=>{L.put(pe,X+1.6,-0.4);L.put(po,X-1.6,-0.4);if(hut.house)hut.house.position.y=hy0;ties.forEach(k5Del);ties.length=0;hut.g.position.set(X,0,-4);hut.g.rotation.set(0,0,0);}],[0.3,()=>{const f=0;anim(0.8,k=>{hut.g.position.y=Math.sin(k*Math.PI)*4;if(k>=1){hut.g.position.y=0;shakeAll(0.08,0.35);k5s('stomp');FX.dust(hut.g.position.clone(),22,0x6a5a3a,2.2);k5Ring(new V3(X,0.15,-4),0xff8a5a,0.6,9,1.4,0.5);}});}],[1.6,()=>{L.jump(pe,1.5);L.jump(po,1.5);}],[2.6,()=>L.ok(pe)]]});
      // 5. «Повернись!»
      L.beat(8.4,{cam:[[X+6,17,5],[X,0,-4.5]],fov:50,need:[H(X,-0.6),H(X,-7.4),[X,4,-4]],says:[['zven','Избушка села. Встаньте на золотые круги с двух сторон —',0.2,3.8],['zven','и ударьте разом '+kbd('attack')+'! Волков-сторожей — бей.',4.2,3.0],['zven','Повернулась!',7.1,1.2]],
        ev:[[0,()=>{if(hut.house)hut.house.position.y=hy0-1.1;hut.g.position.set(X,0,-4);hut.g.rotation.set(0,0,0);L.put(po,X+3.4,-1.6);L.put(pe,X+3.4,-6.4);circles.forEach((c,i)=>{c.visible=true;c.position.set(X,0.07,i?-7.4:-0.6);});}],
          [1.0,()=>{L.walk(po,X,-0.6,0.8,Math.PI);L.walk(pe,X,-7.4,0.8,0);}],[3.4,()=>{L.look(po,hut.g.position);L.look(pe,hut.g.position);}],[5.2,()=>{L.hit(po,hut.g.position);L.hit(pe,hut.g.position);circles.forEach(c=>FX.sparkle(c.position.clone().add(new V3(0,0.5,0)),8,0xffd76a));}],
          [5.7,()=>{circles.forEach(c=>{c.visible=false;});const r0=hut.g.rotation.y,p0=hut.g.position.clone();anim(1.3,k=>{hut.g.rotation.y=r0+Math.PI*CE.inOutCubic(k);hut.g.position.lerpVectors(p0,HC,CE.inOutCubic(k));});k5s('reveal');}]]});
      // 6. крыльцо и крыша
      L.beat(10.2,{cam:[[X+3.5,8.5,8],[X+3.5,3,-6]],need:[[X+5.1,1.5,-2.6],[X+2.4,5,-9.6],[X,5,-5.5]],says:[['zven','Выросло крыльцо — по ступеням наверх, на галерею!',0.2,3.4],['zven','Бей Кощея на крыше '+kbd('attack')+'.',3.8,2.4],['zven','Капля сверху — щит в последний миг: она вернётся в него!',6.4,3.6]],
        ev:[[0,()=>{hut.g.position.copy(HC);hut.g.rotation.set(0,Math.PI,0);if(hut.house)hut.house.position.y=hy0;if(hut.door)hut.door.visible=true;stairs.visible=true;stepBox.forEach(b=>{b.on=true;});balBox.on=true;L.put(po,X+6.6,-0.2);L.put(pe,X+8.2,1.2);K5L.gold(new V3(BALC[0],BALC[1],BALC[2]),20);pips.g.visible=true;}],
          [0.5,()=>{const pts=[po.pos.clone(),...STEPS.map(q=>new V3(q[0],q[1],q[2])),new V3(BALC[0]+0.3,BALC[1],BALC[2])];anim(2.6,k=>{const u=k*(pts.length-1),i=Math.min(pts.length-2,Math.floor(u));po.pos.lerpVectors(pts[i],pts[i+1],u-i);po.vel.set(0,0,0);po.face=Math.atan2(pts[i+1].x-pts[i].x,pts[i+1].z-pts[i].z);});}],
          [3.2,()=>{L.look(po,KS.g.position);}],
          ...L.parry(4.6,po,KS.g.position.clone().add(new V3(0,1.8,0)),{dur:1.8,back:0.7,col:0x9a40ff,then:()=>{pips.out();L.pose('recoil',{snap:true});}}),
          [7.6,()=>{L.hit(po,KS.g.position);pips.out();FX.sparks(KS.g.position.clone().add(new V3(0,2,0)),10,0xffd76a);}],[8.2,()=>{L.hit(po,KS.g.position);pips.out();FX.sparks(KS.g.position.clone().add(new V3(0,2,0)),10,0xffd76a);L.ok(po);}]]});
    };
  }
  E.pageStage(4,1,{});
