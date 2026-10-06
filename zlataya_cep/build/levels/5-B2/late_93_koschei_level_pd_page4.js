// ---- продолжение build5B2 (k5epic, часть 13): СТРАНИЦА 4 «ТАМ НА НЕВЕДОМЫХ ДОРОЖКАХ…» (стадия 7, мир 4, клещи) ----
  // Калинов мост над огненной Смородиной: лава течёт (шейдер лавопада 4-Б), по ней плывёт корка, лавопады со скал, базальтовые
  // берега с огненными трещинами, дым, искры, гроздья калины на перилах. На этом берегу кузня Демьяна (горн, меха, наковальня),
  // на том — Горыныч в чёрной узде (Кощей верхом) и пещера Лиха.
  // 1 «Ковка»: меха держат жар (удар у мехов, когда кольцо сошлось); при жаре — удар по наковальне в такт (4; одному 3, меха качает
  //   Демьян). Кощей мечет головни через реку — красный круг, потом огненная лужа.
  // 2 «Мост»: золотую узду несут двое клещами за два конца (предмет у конца); разошлись, обожгло, заснул — уронили. Головы дышат огнём
  //   по дорожкам (дорожка заполняется красным — уйди на другую), доски прогорают и отрастают; капли лавы прожигают доски (красный
  //   круг); Лихо открывает глаз — кто смотрит в его сторону, засыпает (отвернись или за щит Потапа). Упал в лаву — назад к кузне.
  // 3 «Раз-два-три»: на том берегу средняя голова дышит в круг перед собой и опускается — над шеей золотой ореол: удар разом
  //   (одному — удар) — чёрная узда долой, золотая — на место. Пока голова поднята, боковые кусают (красная дорожка — уйди).
  // Атлас: rhythm/co-op station, lob + lingering-hazard, lane-breath (telegraph), platform-destruction + regrow, marked-area-strike,
  // gaze (look-away), tether-carry, recovery-window, side lunges. Бот — tk5e_p4.
  {const X=900;const A={theme:'smorodina',face:Math.PI,fallY:-6};AR[4]=A;A.clamp={x:X,z:-3,r:22};
    A.spawn=i=>new V3(X-3+i*2,0,12.5);
    const ANV4=new V3(X+4,0,11.4),BELL4=new V3(X+7.4,0,10.2),HEARTH=new V3(X+7.6,0,13.4),GOR=new V3(X,0,-20.5),LIKHO=new V3(X-7,0,-17.5),LANES=[-2,0,2],PL=1.6,HALO=new V3(X,3.4,-17.4);
    const planks=[],crusts=[],cracks=[];
    const lavaM=(typeof g4Mat==='function')?g4Mat('g4fall',0x8a2004,0xff7a1a,1.25,{side:THREE.DoubleSide}):MB(0xff5a20);
    A.g=E.capture(()=>{const bas=M(0x2e2624),bas2=M(0x3a302c);
      ground(X-13,X+13,8,17,0,M(0x4a3c36),bas);ground(X-13,X+13,-31,-14,0,M(0x4a3c36),bas);
      // мост: три дорожки досок, балки, перила с гроздьями калины
      for(let li=0;li<3;li++)for(let j=0;j<14;j++){const z0=-14+j*PL;const m=addMesh(new THREE.BoxGeometry(1.95,0.3,PL-0.08),M(0x7a5634),X+LANES[li],-0.15,z0+PL/2);
        const c=colBox(X+LANES[li]-0.98,X+LANES[li]+0.98,-1.5,0,z0,z0+PL,false);planks.push({m,c,li,j,t:0,mat:m.material});}
      for(const s of[-1,1]){addMesh(new THREE.BoxGeometry(0.3,0.4,22.6),M(0x4a3020),X+s*3.1,-0.35,-2.8);for(let j=0;j<9;j++){const z=-13.4+j*2.7;addMesh(new THREE.CylinderGeometry(0.11,0.13,1.2,6),M(0x5a3a1a),X+s*3.05,0.45,z);
          if(j%2===0)for(let k=0;k<7;k++)addMesh(new THREE.SphereGeometry(0.09,6,5),M(0xd8201a,{emissive:0x600808,emissiveIntensity:0.4}),X+s*3.05+rand(-0.15,0.15),0.95+rand(-0.2,0.05),z+rand(-0.18,0.18));}
        addMesh(new THREE.BoxGeometry(0.08,0.08,22.6),M(0x6a4a2a),X+s*3.05,1.0,-2.8);}
      // Смородина: течёт лава, корка плывёт; лавопады со скал; берега — базальт с огненными трещинами
      {const g=new THREE.PlaneGeometry(26,140,4,70);const m=new THREE.Mesh(g,lavaM);m.rotation.set(-Math.PI/2,0,Math.PI/2);m.position.set(X,-2.6,-3);W.group.add(m);}
      for(let i=0;i<14;i++){const c=addMesh(new THREE.CylinderGeometry(rand(0.6,1.6),rand(0.8,1.8),0.25,7),M(0x1e1614),X+rand(-40,40),-2.45,rand(-12,6));crusts.push({m:c,sp:rand(0.6,1.4)});}
      for(const [x,z,h] of[[X-16,-16,12],[X+17,-17,14],[X-22,7,9],[X+21,6,10]]){const m=new THREE.Mesh(new THREE.PlaneGeometry(3.4,h,2,20),lavaM);m.position.set(x,h/2-2.6,z);m.lookAt(X,h/2-2.6,-3);W.group.add(m);
        addMesh(new THREE.BoxGeometry(6,h+4,4),bas,x+(x>X?2.6:-2.6),h/2,z+(z>0?1:-1));}
      for(const zz of[8,-14])for(let i=0;i<9;i++){const x=X-12+i*3+rand(-0.6,0.6);const m=addMesh(new THREE.BoxGeometry(rand(2.2,3.4),rand(2.6,3.6),1.4),bas2,x,-1.4,zz+(zz>0?0.2:-0.2));m.rotation.y=rand(-0.2,0.2);
        const cr=addMesh(new THREE.BoxGeometry(0.12,rand(1.2,2.4),0.04),MB(0xff7a1a),x+rand(-0.8,0.8),-1.2,zz+(zz>0?-0.52:0.52));cracks.push(cr);}
      // дальний берег: валуны, кости, пещера Лиха
      for(let i=0;i<10;i++){const m=addMesh(new THREE.DodecahedronGeometry(rand(0.6,1.4)),bas2,X+rand(-12,12),0.3,rand(-30,-24));m.rotation.set(rand(0,3),rand(0,3),0);}
      for(let i=0;i<6;i++){const b=addMesh(new THREE.CylinderGeometry(0.08,0.1,rand(0.8,1.4),5),M(0xe8e0c8),X+rand(-10,10),0.1,rand(-26,-16));b.rotation.set(Math.PI/2,0,rand(0,3));}
      {const g=new THREE.Group();g.position.set(LIKHO.x-1.2,0,LIKHO.z-2.6);W.group.add(g);for(let i=0;i<9;i++){const a=i/8*Math.PI;addMesh(new THREE.DodecahedronGeometry(1.1),bas2,Math.cos(a)*2.6,Math.sin(a)*2.8,0,g);}
        const d=new THREE.Mesh(new THREE.CircleGeometry(2.2,20,0,Math.PI),MB(0x0a0606));d.position.z=-0.3;g.add(d);}
      // кузня Демьяна: горн с огнём и трубой, меха, бочка, инструменты
      {const g=new THREE.Group();g.position.copy(HEARTH);W.group.add(g);addMesh(new THREE.BoxGeometry(2.2,1.1,1.6),M(0x6a5a50),0,0.55,0,g);addMesh(new THREE.BoxGeometry(1.6,0.2,1.1),MB(0xff8a2a),0,1.12,0,g);
        addMesh(new THREE.CylinderGeometry(0.35,0.45,3.6,8),M(0x5a4a44),0.6,2.9,-0.4,g);addMesh(new THREE.CylinderGeometry(0.55,0.6,0.7,10),M(0x5a3a1a),-1.8,0.35,1.4,g);}
      W.cyls.push({x:HEARTH.x,z:HEARTH.z,r:1.2,miny:-1,maxy:1.1,on:true});
      for(let i=0;i<3;i++){const t=addMesh(new THREE.CylinderGeometry(0.05,0.05,1.3,5),M(0x4a4a50),X+9.4,0.65,11+i*0.4);t.rotation.z=0.2;}});
    const lavaGl=[];for(const [x,z] of[[X-8,-3],[X+8,-3],[X,-8],[X,2]]){const g=k5Glow(0xff6a20,9);g.position.set(x,-1.6,z);g.material.opacity=0.35;A.g.add(g);lavaGl.push(g);}
    // меха: гармошка с ручкой
    const bel=new THREE.Group();bel.position.copy(BELL4);A.g.add(bel);const belTop=new THREE.Group();bel.add(belTop);addMesh(new THREE.BoxGeometry(1.4,0.12,0.9),M(0x6a4a2a),0,0.3,0,bel);
    const belLeather=addMesh(new THREE.BoxGeometry(1.3,0.5,0.85),M(0x5a2a1a),0,0.6,0,bel);addMesh(new THREE.BoxGeometry(1.4,0.12,0.9),M(0x6a4a2a),0,0,0,belTop);belTop.position.y=0.9;
    addMesh(new THREE.CylinderGeometry(0.05,0.05,0.9,5),M(0x4a3020),0.9,0,0,belTop).rotation.z=Math.PI/2;K5L.noRay(bel);W.cyls.push({x:BELL4.x,z:BELL4.z,r:0.8,miny:-1,maxy:1,on:true});
    const heatBar=new THREE.Mesh(new THREE.BoxGeometry(0.22,1,0.22),MB(0xff8a2a));heatBar.position.set(HEARTH.x-1.4,2.0,HEARTH.z);A.g.add(heatBar);const heatGl=k5Glow(0xff8a2a,4);heatGl.position.set(HEARTH.x,1.6,HEARTH.z);A.g.add(heatGl);
    const belR=new THREE.Mesh(new THREE.RingGeometry(0.9,1.05,40),k5Add(0xff9a40,{opacity:0.9}));belR.rotation.x=-Math.PI/2;belR.position.set(BELL4.x,0.1,BELL4.z);A.g.add(belR);
    const gor=makeGorynych5(1);W.group.remove(gor.g);A.g.add(gor.g);gor.g.position.copy(GOR);gor.g.scale.setScalar(1.2);K5L.noRay(gor.g);W.cyls.push({x:GOR.x,z:GOR.z,r:3,miny:-1,maxy:4,on:true});
    const bridleB=K5L.collar(gor.g,4.2,0.9);
    const likho=makeLikho();W.group.remove(likho.g);A.g.add(likho.g);likho.g.position.copy(LIKHO);likho.g.rotation.y=Math.atan2(X-LIKHO.x,4-LIKHO.z);likho.g.scale.setScalar(1.2);K5L.noRay(likho.g);if(likho.lid)likho.lid.userData.lidHold=true;
    const gaze=new THREE.Mesh(new THREE.ConeGeometry(4.5,18,24,1,true),k5Add(0xb060ff,{opacity:0,map:K5TEX.beam}));gaze.geometry.rotateX(-Math.PI/2);gaze.geometry.translate(0,0,9);A.g.add(gaze);K5L.noRay(gaze);
    const dem=makeSmith('demyan',false);W.group.remove(dem.g);A.g.add(dem.g);dem.g.position.set(ANV4.x+1.6,0,ANV4.z-0.4);dem.g.rotation.y=-1.6;K5L.noRay(dem.g);
    const anv=makeAnvil(ANV4.x,ANV4.z,0,1.2);if(anv&&anv.g&&anv.g.parent){anv.g.parent.remove(anv.g);A.g.add(anv.g);}
    const beatR=new THREE.Mesh(new THREE.RingGeometry(0.9,1.05,40),k5Add(0xffd76a,{opacity:0.9}));beatR.rotation.x=-Math.PI/2;beatR.position.set(ANV4.x,0.1,ANV4.z);A.g.add(beatR);
    // золотая узда: огненная дуга с двумя ручками
    const bridle=new THREE.Group();A.g.add(bridle);const arc=new THREE.Mesh(new THREE.TorusGeometry(1.1,0.11,8,28,Math.PI),M(COL.gold,{emissive:0xff8a20,emissiveIntensity:0.9}));arc.rotation.x=-Math.PI/2;bridle.add(arc);
    const ends=[-1,1].map(s=>{const m=new THREE.Mesh(new THREE.SphereGeometry(0.2,8,6),MB(0xffd060));m.position.set(s*1.1,0,0);bridle.add(m);return m;});const bGlow=k5Glow(0xffa040,3);bridle.add(bGlow);bridle.visible=false;K5L.noRay(bridle);
    const halo=new THREE.Mesh(new THREE.TorusGeometry(1.3,0.09,8,40),k5Add(0xffd76a,{opacity:0}));halo.rotation.x=Math.PI/2;halo.position.copy(HALO);A.g.add(halo);
    const S={};A.S=S;A.ANV=ANV4;A.BEL=BELL4;A.GOR=GOR;A.LIKHO=LIKHO;A.LANES=LANES;A.X=X;
    const beatPh=(t,per)=>(t%(per*3))/(per*3),inWin=ph=>ph>0.86||ph<0.06;
    const burnM=M(0x2a0a04,{emissive:0xff4a10,emissiveIntensity:0.9,transparent:true,opacity:0.6});
    function plankSet(P,on){P.c.on=on;P.m.visible=true;P.m.material=on?P.mat:burnM;P.m.scale.y=on?1:0.4;}
    function plankTick(dt){for(const P of planks){if(P.t>0){P.t-=dt;if(P.t<1.2&&P.t>0)P.m.scale.y=0.4+0.3*Math.abs(Math.sin(G.time*14));if(P.t<=0)plankSet(P,true);}}}
    function burnP(P,t){if(P.t>0)return;P.t=t;plankSet(P,false);FX.sparks(P.m.position.clone().add(new V3(0,0.4,0)),5,0xff8a20);}
    function burn(li){for(const P of planks)if(P.li===li&&(P.j%3===1||P.j%4===0))burnP(P,G.solo?5:7);}
    // ---------- огонь по дорожкам ----------
    function fire(li){const tele=G.solo?1.6:1.25;S.fire={li,t:0,tele};k5s('pSoft');if(FIN.k2fx)FIN.k2fx.lane(new V3(X+LANES[li],0.05,-14),new V3(X+LANES[li],0.05,8.4),1.9,tele,'red');
      barkS({g:gor.g},['gorL','gorM','gorR'][li],['Ой… дышу! Левую — прочь!','Не хочу, а дышу! Середина!','Правая! Берегись!'][li],1.4,true);}
    function flameAt(p){const m=new THREE.Mesh(new THREE.ConeGeometry(0.5,1.6,7),k5Add(Math.random()<0.5?0xff8a20:0xffc040,{opacity:0.9}));m.position.copy(p);A.g.add(m);m.raycast=()=>{};
      k5fx(0.6,k=>{m.position.y=p.y+k*1.2;m.scale.setScalar(1+k*0.8);m.material.opacity=0.9*(1-k);},()=>k5Del(m));}
    function fireTick(dt){const F=S.fire;if(!F)return;F.t+=dt;
      if(F.t>=F.tele&&!F.hit){F.hit=new Set();burn(F.li);k5s('strike');for(let i=0;i<14;i++)later(i*0.035,()=>{const p=new V3(X+LANES[F.li]+rand(-0.5,0.5),0.4,-13+i*1.6);flameAt(p);FX.sparks(p,4,0xff8a20);});shakeAll(0.05,0.3);}
      if(F.hit&&F.t<F.tele+0.7)for(const h of k5Heroes())if(!F.hit.has(h)&&Math.abs(h.pos.x-(X+LANES[F.li]))<1.0&&h.pos.z<8.2&&h.pos.z>-14&&h.rollT<=0){F.hit.add(h);k5Hurt(h,new V3(X+LANES[F.li],0,h.pos.z-2));if(S.carry&&S.carry.indexOf(h)>=0)drop('Обожгло — уронили!');}
      if(F.t>F.tele+1)S.fire=null;}
    // ---------- головни Кощея и капли лавы ----------
    function brand(h){const to=new V3(h.pos.x,0,h.pos.z);const f=KS.g.position.clone().add(new V3(0,2.2,0));if(FIN.k2fx)FIN.k2fx.tele(to.x,0.02,to.z,1.4,1.4,'red');try{KA.pose('cast',{snap:true});later(0.4,()=>KA.reset());}catch(e){}
      const m=new THREE.Group();const core=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.16,0.9,6),M(0x2a1408,{emissive:0xff5a10,emissiveIntensity:0.9}));m.add(core);m.add(k5Glow(0xff7a20,1.8));m.position.copy(f);A.g.add(m);K5L.noRay(m);
      k5fx(1.4,k=>{m.position.lerpVectors(f,to,k);m.position.y+=Math.sin(k*Math.PI)*7;m.rotation.x+=0.3;if(Math.random()<0.5)FX.sparks(m.position.clone(),1,0xff8a20);},()=>{k5Del(m);if(E.cur!==7)return;FX.sparks(to.clone().add(new V3(0,0.4,0)),16,0xff8a20);k5s('stomp');
        for(const q of k5Heroes())if(hd(q.pos,to)<1.4&&q.rollT<=0){k5Hurt(q,to);if(S.carry&&S.carry.indexOf(q)>=0)drop('Обожгло — уронили!');}
        if(to.z>8)K5X.puddle(to,1.3,5,{col:0x3a0a04,rim:0xff6a20});else{const P=planks.find(P=>Math.abs(P.m.position.x-to.x)<1&&Math.abs(P.m.position.z-to.z)<0.9);if(P)burnP(P,6);}});}
    // ---------- узда ----------
    function drop(t){if(!S.carry)return;S.carry=null;const p=bridle.position;const onGround=groundAt(p.x,p.z,3,0).y>-1;if(!onGround||p.z<-14.5){bridle.position.set(ANV4.x-1.6,0.25,ANV4.z-1.2);t=(t||'Уронили!')+' Узда — снова у Демьяна';}else bridle.position.y=0.25;
      floatText(bridle.position.clone().add(new V3(0,1.2,0)),t||'Уронили!','#ffb070');E.log('drop');if(S.ph==='crown')S.ph='carry';}
    function swap(){S.ph='done';ES.prog=1;E.log('swap');bridleB.break();k5Flash(HALO.clone(),0xffd76a,4,0.5);bridle.visible=false;S.carry=null;halo.material.opacity=0;
      const gb=K5L.collar(gor.g,4.2,0.9);gb.g.children.forEach(c=>{if(c.material)c.material=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.7});});
      barkS({g:gor.g},'gorM','Уговор есть уговор — возить буду! А тебя, Кощей, — вон!',2.6,true);
      later(1.2,()=>{K5L.ink(KS.g.position.clone().add(new V3(0,2,0)),26);const f=KS.g.position.clone();anim(0.9,k=>{KS.g.position.set(f.x-k*8,f.y+Math.sin(k*Math.PI)*4,f.z-k*6);});later(1,()=>{KS.g.visible=false;E.won(7);});});}
    // ---------- старт / конец ----------
    A.start=q=>{Object.assign(S,{ph:'forge',beat:0,bt:0,bbt:0,good:0,heat:0.8,carry:null,grab:[null,null],fire:null,fireT:4,eyeT:7,eye:0,gaze:false,sleep:new Map(),rdt:[-9,-9],brT:3,blobT:4,hd:'up',hdT:2,biteT:2.5});
      bridle.visible=false;bridleB.g.visible=true;planks.forEach(P=>{P.t=0;plankSet(P,true);});KS.g.visible=true;KS.g.position.copy(GOR).add(new V3(0,4.2,0.4));KS.g.rotation.y=0;ES.prog=0;ES.fight=false;beatR.visible=true;belR.visible=!G.solo;
      for(const pi of[0,1])players[pi].cp=new V3(X-1+pi*2,0,12);K5X.motes('ember',new V3(X,0,-3),18,200,8);K5X.fog(new V3(X,0,-3),18,0x3a2a2a,18,{op:0.28,y0:-1,y1:1.6});K5X.tint('rgba(80,10,0,.8)',0.4);
      if(FIN.atmo&&FIN.atmo.ocean)FIN.atmo.ocean.visible=false;   // живой океан уровня выше лавы — на этой странице прячем
      W.fallHook=h=>{if(E.cur!==7)return false;k5Hurt(h,h.pos.clone());if(S.carry&&S.carry.indexOf(h)>=0)drop('Упал в Смородину — уронили!');const pi=h.player;placeOnGround(h,X-1+pi*2,12,1);h.iT=1;
        floatText(h.pos.clone().add(new V3(0,2.4,0)),'Ой, горячо! Назад к кузне','#ffb070');return true;};
      E.cards(7,()=>{ES.fight=true;if(!q)later(0.4,()=>barkS(KS,'koschei','Ну, кузнецы, — куйте! А я пока — огоньку подкину!',2.4,true));later(3,()=>barkS(dem,'demyan',G.solo?'Меха я сам качаю — бей в такт!':'Один — меха, другой — молот! В такт!',2.6,true));});};
    A.end=()=>{if(FIN.atmo&&FIN.atmo.ocean)FIN.atmo.ocean.visible=true;KS.g.visible=false;planks.forEach(P=>{P.c.on=false;});W.fallHook=null;gaze.material.opacity=0;halo.material.opacity=0;};
    A.attack=h=>{if(E.cur!==7||!ES.fight)return;
      if(S.ph==='forge'&&!G.solo&&hd(h.pos,BELL4)<2.2){const ok=inWin(beatPh(S.bbt,0.5));S.heat=Math.min(1,S.heat+(ok?0.34:0.1));belTop.position.y=0.55;later(0.2,()=>{belTop.position.y=0.9;});
        FX.sparks(HEARTH.clone().add(new V3(0,1.4,0)),ok?14:4,0xffa040);floatText(BELL4.clone().add(new V3(0,1.8,0)),ok?'Ух! Жару!':'слабо…',ok?'#ffb070':'#cccccc');return;}
      if(S.ph==='forge'&&hd(h.pos,ANV4)<2.4){if(S.heat<0.45){floatText(ANV4.clone().add(new V3(0,2.4,0)),'Остыло — раздуйте меха!','#ff9a60');SFX.clink();return;}
        if(inWin(beatPh(S.bt,0.8))){S.good++;FX.sparks(ANV4.clone().add(new V3(0,1.3,0)),18,0xffd060);SFX.hammer?SFX.hammer():SFX.clink();const need=G.solo?3:4;floatText(ANV4.clone().add(new V3(0,2.4,0)),'В такт! '+S.good+' / '+need,'#ffe08a');S.heat=Math.max(0,S.heat-0.12);
          if(S.good>=need)forged();}
        else{floatText(ANV4.clone().add(new V3(0,2.4,0)),'не в такт','#cccccc');SFX.clink();}return;}
      if((S.ph==='carry'||S.ph==='crown')&&S.carry&&hd(h.pos,GOR)<9){if(S.hd!=='low'){floatText(h.pos.clone().add(new V3(0,2,0)),'Голова поднята — ждите, пока опустит!','#ffb070');return;}
        S.rdt[h.player]=G.time;const both=G.solo||Math.abs(S.rdt[0]-S.rdt[1])<1.0;if(both)swap();else floatText(h.pos.clone().add(new V3(0,2,0)),'Раз-два-три — разом!','#ffe08a');}};
    function forged(){S.ph='carry';bridle.visible=true;bridle.position.set(ANV4.x-1.6,0.25,ANV4.z-1.2);beatR.visible=false;belR.visible=false;K5L.gold(bridle.position.clone().add(new V3(0,1,0)),16);
      barkS(dem,'demyan','Готова узда! Горячая — берите клещами, вдвоём!',2.4,true);E.log('forged');ES.prog=1/3;}
    A.item=pi=>{if(E.cur!==7||!ES.fight||(S.ph!=='carry')||S.carry)return null;const h=active(pi);const wp=i=>ends[i].getWorldPosition(new V3());let ei=-1;for(let i=0;i<2;i++)if(hd(h.pos,wp(i))<1.6)ei=i;if(ei<0)return null;
      return ()=>{S.grab[ei]=h;FX.sparkle(wp(ei),8,0xffd060);floatText(h.pos.clone().add(new V3(0,2,0)),'Клещи — взял!','#ffe08a');
        if(G.solo||(S.grab[1-ei]&&S.grab[1-ei]!==h&&hd(S.grab[1-ei].pos,wp(1-ei))<2.2)){S.carry=G.solo?[h]:[S.grab[0],S.grab[1]];S.grab=[null,null];E.log('carry');barkS(dem,'demyan',G.solo?'Второй конец — мой! Неси!':'Подняли! Шагайте в ногу!',1.6,true);}};};
    // ---------- шаг ----------
    A.tick=dt=>{for(const c of crusts){c.m.position.x-=c.sp*dt;if(c.m.position.x<X-42)c.m.position.x=X+42;}for(const [i,c] of cracks.entries())c.material.color.setHSL(0.06,1,0.45+0.15*Math.sin(G.time*2+i));
      lavaGl.forEach((g,i)=>{g.material.opacity=0.3+0.08*Math.sin(G.time*1.7+i);});if(Math.random()<dt*3)FX.sparks(new V3(X+rand(-14,14),-2.2,rand(-12,6)),2,0xff8a20);
      if(!ES.fight)return;plankTick(dt);fireTick(dt);
      if(gor.necks)gor.necks.forEach((n,i)=>{if(n&&n.rotation)n.rotation.z=Math.sin(G.time*1.4+i)*0.15+(S.fire&&S.fire.li===i?0.3:0)+(i===1&&S.hd==='low'?0.5:0);});
      // ковка: жар (меха), кольца сходятся в такт
      if(S.ph==='forge'){S.bt+=dt;S.bbt+=dt;S.heat=G.solo?Math.max(0.7,S.heat-dt*0.09):Math.max(0,S.heat-dt*0.09);if(G.solo&&Math.random()<dt*1.6){belTop.position.y=0.55;later(0.2,()=>{belTop.position.y=0.9;});}
        const ph=beatPh(S.bt,0.8);beatR.scale.setScalar(0.6+(1-ph)*2.2);beatR.material.opacity=inWin(ph)?1:0.5;beatR.material.color.set(S.heat>=0.45?0xffd76a:0x888888);
        const bp=beatPh(S.bbt,0.5);belR.scale.setScalar(0.6+(1-bp)*2);belR.material.opacity=inWin(bp)?1:0.45;
        const nb=Math.floor(S.bt/0.8);if(nb!==S.beat){S.beat=nb;if(AUD.ready())(nb%3===2?AUD.bell(523,{v:0.05,d:0.8}):AUD.osc({f0:880,d:0.05,v:0.02}));}
        S.brT-=dt;if(S.brT<=0){S.brT=G.solo?6:4.2;const hs=k5Heroes().filter(h=>h.pos.z>8);if(hs.length)brand(hs[Math.floor(rand(0,hs.length))]);}}
      heatBar.scale.y=Math.max(0.05,S.heat||0)*1.6;heatBar.position.y=1.2+heatBar.scale.y/2;heatGl.material.opacity=0.3+0.7*(S.heat||0);
      // перенос: середина между носильщиками; разошлись — уронили
      if(S.carry){const a=S.carry[0],b=S.carry[1]||dem;const pa=a.pos,pb=b===dem?a.pos.clone().add(new V3(1.8,0,0.6)):b.pos;if(b===dem){dem.g.position.lerp(pb,Math.min(1,dt*6));}
        const mid=pa.clone().add(pb).multiplyScalar(0.5);bridle.position.set(mid.x,Math.max(pa.y,pb.y)+1.0,mid.z);bridle.rotation.y=Math.atan2(pb.x-pa.x,pb.z-pa.z)+Math.PI/2;
        if(b!==dem&&(hd(pa,pb)>4.4||players[a.player].downed||players[b.player].downed))drop('Разошлись — уронили!');ES.prog=1/3+Math.min(1,(12-bridle.position.z)/30)/3;
        if(S.carry&&S.ph==='carry'&&bridle.position.z<-14.2){S.ph='crown';S.hd='up';S.hdT=0.8;E.log('crown');barkS(dem,'demyan','Дошли! Ждите, пока голова опустится, — и разом!',2.4,true);}}
      if(S.ph==='done')return;
      // огонь по дорожкам; капли лавы на доски
      if(S.ph!=='forge'){S.fireT-=dt;if(S.fireT<=0&&!S.fire&&S.ph==='carry'){S.fireT=G.solo?4.6:3.4;const hs=k5Heroes();const tgt=hs.find(h=>h.pos.z<8.5&&h.pos.z>-14);const li=tgt?LANES.reduce((b,x,i)=>Math.abs(tgt.pos.x-(X+x))<Math.abs(tgt.pos.x-(X+LANES[b]))?i:b,0):Math.floor(rand(0,3));fire(li);}
        S.blobT-=dt;if(S.blobT<=0&&S.ph==='carry'){S.blobT=G.solo?5.5:3.8;const hs=k5Heroes().filter(h=>h.pos.z<8.5&&h.pos.z>-14);const h=hs[Math.floor(rand(0,hs.length))];if(h){const at=new V3(X+LANES[Math.floor(rand(0,3))],0,clamp(h.pos.z-rand(1,4),-13.5,7.5));
            if(FIN.k2fx)FIN.k2fx.tele(at.x,0.02,at.z,1.0,1.3,'red');later(1.3,()=>{if(E.cur!==7)return;FX.sparks(at.clone().add(new V3(0,0.5,0)),14,0xff6a10);const P=planks.find(P=>Math.abs(P.m.position.x-at.x)<1&&Math.abs(P.m.position.z-at.z)<0.9);if(P)burnP(P,6);
              for(const q of k5Heroes())if(hd(q.pos,at)<1.1&&q.rollT<=0){k5Hurt(q,at);if(S.carry&&S.carry.indexOf(q)>=0)drop('Обожгло — уронили!');}});}}}
      // средняя голова: дышит в круг — опускается (ореол) — поднимается; пока поднята — боковые кусают
      if(S.ph==='crown'){S.hdT-=dt;if(S.hdT<=0){if(S.hd==='up'){S.hd='breath';S.hdT=1.6;const c=new V3(X,0,-15.6);if(FIN.k2fx)FIN.k2fx.tele(c.x,0.02,c.z,2.8,1.6,'red');barkS({g:gor.g},'gorM','Вдо-о-ох…',1.2,true);}
            else if(S.hd==='breath'){S.hd='low';S.hdT=G.solo?4:3.2;const c=new V3(X,0,-15.6);for(let i=0;i<12;i++)later(i*0.03,()=>flameAt(c.clone().add(new V3(rand(-2,2),0.3,rand(-2,2)))));k5s('strike');
              for(const q of k5Heroes())if(hd(q.pos,c)<2.8&&q.rollT<=0){k5Hurt(q,c);if(S.carry&&S.carry.indexOf(q)>=0)drop('Обожгло — уронили!');}floatText(HALO.clone().add(new V3(0,1.4,0)),'Голова опустилась — разом!','#ffe08a');}
            else{S.hd='up';S.hdT=G.solo?4.5:3.6;}}
        halo.material.opacity=S.hd==='low'?0.6+0.4*Math.sin(G.time*10):0;halo.scale.setScalar(S.hd==='low'?1+0.08*Math.sin(G.time*6):1);
        if(S.hd==='up'){S.biteT-=dt;if(S.biteT<=0){S.biteT=G.solo?3:2.2;const hs=k5Heroes();const h=hs[Math.floor(rand(0,hs.length))];if(h){const side=h.pos.x<X?0:2,from=new V3(X+(side?2.6:-2.6),0,GOR.z+2),to=new V3(h.pos.x,0,h.pos.z);
              if(FIN.k2fx)FIN.k2fx.lane(from,to,1.6,1.0,'red');later(1.0,()=>{if(E.cur!==7||S.ph!=='crown')return;k5s('whoosh');FX.sparks(to.clone().add(new V3(0,0.6,0)),8,0xffffff);
                for(const q of k5Heroes()){const t=clamp(((q.pos.x-from.x)*(to.x-from.x)+(q.pos.z-from.z)*(to.z-from.z))/Math.max(0.01,from.distanceToSquared(to)),0,1);const px=from.x+(to.x-from.x)*t,pz=from.z+(to.z-from.z)*t;
                  if(Math.hypot(q.pos.x-px,q.pos.z-pz)<0.9&&q.rollT<=0){k5Hurt(q,from);if(S.carry&&S.carry.indexOf(q)>=0)drop('Укусила — уронили!');}}});}}}}
      // Лихо: веко поднимается 1,6 с, глаз открыт 1,2 с — кто смотрит в его сторону, засыпает
      if(S.ph!=='forge')S.eyeT-=dt;if(S.eyeT<=0&&S.eye===0&&S.ph!=='forge'){S.eye=0.001;barkS({g:likho.g},'likho','Хр-р… кто тут?..',1.2,true);K5X.tint('rgba(80,20,120,.8)',0.55);}
      if(S.eye>0){S.eye+=dt;const k=Math.min(1,S.eye/1.6);if(likho.lid)likho.lid.rotation.x=lerp(0.6,-2.4,k);if(likho.iris&&likho.iris.material.emissive)likho.iris.material.emissiveIntensity=0.9+2*k;
        gaze.position.copy(LIKHO).add(new V3(0,2.6,0));gaze.lookAt(X,0.8,-2);gaze.material.opacity=k>=1?0.35+0.1*Math.sin(G.time*20):0.12*k;
        if(S.eye>=1.6&&!S.gaze){S.gaze=true;const po=k5Heroes().find(h=>h.kind==='potap'&&h.guard);for(const h of k5Heroes()){const dx=LIKHO.x-h.pos.x,dz=LIKHO.z-h.pos.z,d=Math.hypot(dx,dz)||1,dot=(Math.sin(h.face)*dx+Math.cos(h.face)*dz)/d;
            const hid=po&&po!==h&&hd(po.pos,h.pos)<1.8&&hd(po.pos,LIKHO)<d;if(dot>0.25&&!hid&&!(h===po)){S.sleep.set(h,3);floatText(h.pos.clone().add(new V3(0,2.2,0)),'Zzz… заснул!','#c8b8ff');if(S.carry&&S.carry.indexOf(h)>=0)drop('Заснул — уронили!');E.log('sleep');}
            else floatText(h.pos.clone().add(new V3(0,2.2,0)),'Не смотрю!','#9fe0ff');}}
        if(S.eye>2.8){S.eye=0;S.gaze=false;S.eyeT=G.solo?11:8.5;if(likho.lid)likho.lid.rotation.x=0.6;gaze.material.opacity=0;K5X.tint('rgba(80,10,0,.8)',0.4);}}
      for(const [h,t] of S.sleep){const r=t-dt;h.vel.x*=0.2;h.vel.z*=0.2;if(r<=0)S.sleep.delete(h);else S.sleep.set(h,r);}};
    A.pics=pi=>S.ph==='forge'?['fire','notes','+','hammer','@attack']:S.ph==='carry'&&!S.carry?['gchain','hand','@item']:S.ph==='carry'?['gchain','>','run','+','eye','no']:
      S.ph==='crown'?['dragon','clock','>','two','@attack']:['star'];
    A.goal=pi=>{const q=G.solo?0:pi;if(S.ph==='forge')return (G.solo?'Меха качает Демьян. ':'<b>Меха</b> — удар '+K(q,'attack')+', когда кольцо у мехов сошлось: держат жар. ')+'Жарко — удар по <b>наковальне в такт</b> ('+(G.solo?3:4)+'). Головни Кощея — уйди из красного круга.';
      if(S.ph==='carry'&&!S.carry)return 'Узда готова: <b>клещи</b> '+K(q,'item')+' у конца узды'+(G.solo?'.':' — каждый за свой конец.');
      if(S.ph==='carry')return 'Несите узду по мосту. Огонь — другая дорожка, доска пропала — прыжок, глаз Лиха — <b>отвернитесь</b>.';
      if(S.ph==='crown')return 'Средняя голова дохнёт в круг и <b>опустится</b> — над шеей ореол: удар '+K(q,'attack')+(G.solo?'':' <b>разом</b>')+'. Пока поднята — боковые кусают.';return 'Горыныч свободен!';};
    A.targets=pi=>S.ph==='forge'?[anv&&anv.g?anv.g:dem.g]:S.ph==='carry'?(S.carry?[gor.g]:[bridle]):S.ph==='crown'?[halo]:[];
    A.bot={forge:()=>{S.good=99;forged();},carry:hs=>{S.carry=hs;E.log('carry');},low:()=>{S.ph='crown';S.hd='low';S.hdT=3.2;},heat:()=>S.heat,bridle:()=>bridle.position,eye:()=>S.eye,fire:li=>fire(li),planks:()=>planks};
    // ---------- подсказки в мире ----------
    for(const pi of[0,1]){const me=()=>G.solo?active(G.soloPi):active(pi),st7=()=>E.cur===7&&ES.step==='fight'&&ES.fight&&!G.cine&&(!G.solo||pi===0),top=()=>headOf(me()).add(new V3(0,0.4,0));
      const nearest=p=>G.solo||k5Heroes().slice().sort((a,b)=>hd(a.pos,p)-hd(b.pos,p))[0]===me();
      prompt(pi,'attack',()=>BELL4.clone().add(new V3(0,2,0)),()=>st7()&&!G.solo&&S.ph==='forge'&&S.heat<0.6&&nearest(BELL4),'меха — в такт!');
      prompt(pi,'attack',()=>ANV4.clone().add(new V3(0,2.4,0)),()=>st7()&&S.ph==='forge'&&S.heat>=0.45&&inWin(beatPh(S.bt+0.15,0.8))&&nearest(ANV4),'молот — в такт!');
      prompt(pi,'item',()=>{const i=hd(me().pos,ends[0].getWorldPosition(new V3()))<hd(me().pos,ends[1].getWorldPosition(new V3()))?0:1;return ends[i].getWorldPosition(new V3()).add(new V3(0,1.4,0));},()=>st7()&&S.ph==='carry'&&!S.carry&&bridle.visible,'клещи!');
      prompt(pi,'label',top,()=>st7()&&S.fire&&!S.fire.hit&&Math.abs(me().pos.x-(X+LANES[S.fire.li]))<1.1&&me().pos.z<8.4&&me().pos.z>-14,'огонь! — на другую дорожку');
      prompt(pi,'label',top,()=>st7()&&S.eye>0&&S.eye<1.7,'Лихо! — отвернись');
      prompt(pi,'attack',()=>HALO.clone().add(new V3(pi?0.9:-0.9,1.2,0)),()=>st7()&&S.ph==='crown'&&S.hd==='low'&&!!S.carry,G.solo?'бей!':'разом!');}
  }
  E.pageStage(7,4,{call:'Четвёртая страница — Огненная Смородина! Горыныча Кощей взнуздал.'});
  E.CARDS[7]=[{p:[900,10,20],l:[900,1,-6],card:{tag:'Как победить',title:'Стадия 7 из 12 · Там на неведомых дорожках',icon:'anvil',text:'Калинов мост над огненной Смородиной. Скуйте у Демьяна <b>золотую узду</b>, пронесите её по мосту <b>вдвоём клещами</b> и наденьте Горынычу вместо чёрной.'}},
    {p:[905,4,16],l:[905,1,11],card:{tag:'Вместе',title:'Меха и молот',icon:'spark',text:'Один качает <b>меха</b> (удар, когда кольцо у мехов сошлось) — держит жар; другой бьёт по <b>наковальне в такт</b>. Кощей мечет <b>головни</b> — уходи из красного круга.'}},
    {p:[900,6,10],l:[900,0,-4],card:{tag:'Берегись',title:'Мост',icon:'wave',text:'Дорожка заполняется красным — сейчас дохнёт огнём: <b>на другую</b>. Доски прогорают — прыгай. Веко Лиха поднимается — <b>отвернись</b> или за щит Потапа: кто посмотрит — заснёт и выронит узду.'}},
    {p:[900,7,-8],l:[900,3,-18],card:{tag:'Вместе',title:'Раз-два-три',icon:'hand',text:'Средняя голова дохнёт в круг и <b>опустится</b> — над шеей золотой ореол: удар <b>разом</b>. Пока голова поднята — боковые кусают: красная дорожка — уйди.'}}];
