// ---- продолжение build5B2 (k5epic, часть 15): СТАДИЯ 11 «БЕЗ ИМЁН» (новая; отзвук терема 5-Б1) ----
  // Кощей вычёркивает в тетрадке вернувшиеся имена: мир блёкнет, друзья замирают. Чернильная страница-стена делит поляну: каждый
  // игрок один, против чернильных теней. «Ко мне!» — золотая рябь; обе ряби встретились — стена тоньше: удар обоих в одно место — стена
  // падает, имена возвращаются. Потом «Все сказки разом»: Кощей берёт приёмы четырёх боссов; герои бегут к замершему другу из той сказки
  // и держат щит вместе — друг вспоминает себя и оборачивает приём против Кощея: Кощей открыт, удары гасят спесь.
  const WALL=k5Prop(new THREE.Group());{const c=document.createElement('canvas');c.width=512;c.height=256;const g=c.getContext('2d');g.fillStyle='#120a1c';g.fillRect(0,0,512,256);g.strokeStyle='rgba(170,110,255,0.55)';g.lineWidth=3;g.font='italic 34px Georgia,serif';g.fillStyle='rgba(190,150,255,0.5)';
    for(let i=0;i<14;i++){g.fillText(['Потап','Йоша','Прошка','Пелагея','Леший','Яга'][i%6],rand(10,400),rand(30,250));const y=rand(20,240);g.beginPath();g.moveTo(rand(0,200),y);g.lineTo(rand(300,512),y+rand(-10,10));g.stroke();}
    const m=new THREE.Mesh(new THREE.PlaneGeometry(22,7),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),side:THREE.DoubleSide,transparent:true,opacity:0.92}));m.rotation.y=Math.PI/2;m.position.set(0,3.5,0);WALL.add(m);WALL.userData.m=m;}
  WALL.position.set(C.x,0,C.z);WALL.visible=false;K5L.noRay(WALL);const wallBox={minx:C.x-0.3,maxx:C.x+0.3,miny:-1,maxy:8,minz:C.z-11,maxz:C.z+11,on:false,occ:false};W.boxes.push(wallBox);
  const crack=k5Glow(0xffd76a,3);k5Prop(crack);crack.visible=false;
  // где стоят замершие друзья в «Все сказки разом» (внутри поляны)
  const MEM=[{k:'leshy',p:new V3(-8.4,0,-8.6),n:'Путаник'},{k:'vod',p:new V3(8.4,0,-8.6),n:'Водяной'},{k:'solo',p:new V3(-6.6,0,-19.6),n:'Соловей'},{k:'gor',p:new V3(6.6,0,-19.6),n:'Горыныч'}];
  const memRings=MEM.map(M0=>{const r=new THREE.Mesh(new THREE.RingGeometry(2.0,2.4,40),k5Add(0xd8d0ff,{opacity:0.5}));r.rotation.x=-Math.PI/2;r.position.set(M0.p.x,0.07,M0.p.z);k5Prop(r);r.visible=false;return r;});
  const memMods=[FR.leshy.m,FR.vod.m,(()=>{const s=makeSolovei();s.g.scale.setScalar(0.8);s.g.visible=false;K5L.noRay(s.g);return s;})(),(()=>{const g=makeGorynych();g.g.scale.setScalar(0.55);g.g.visible=false;K5L.noRay(g.g);return g;})()];
  const fog=MEM.map(()=>{const s=k5Glow(0x6a5a8a,4);k5Prop(s);s.visible=false;return s;});
  function satur(v){try{renderer.domElement.style.filter=v<1?'saturate('+v+')':'';}catch(e){}}
  function wallUp(){WALL.visible=true;wallBox.on=true;WALL.userData.m.material.opacity=0.92;satur(0.25);ES.saved=Object.assign({},G.flags.names||{});G.flags.names={};ES.call=[-9,-9];ES.crackT=0;ES.wallHit=[-9,-9];
    const pos=G.solo?[[-5,-8],[-6.5,-6]]:[[-5,-8],[5,-8]];for(const pi of[0,1]){const p=players[pi];p.heroes.forEach((h,k)=>{const side=G.solo?(h.active&&pi===G.soloPi?-1:1):(pi?1:-1);placeOnGround(h,side*(5+k*1.4),-8+k*1.6,0);h.face=Math.PI;h.vel.set(0,0,0);});}snapCams();
    ES.shadows=[];for(const [x,z] of(G.solo?[[-6,-14],[-7,-4]]:[[-6,-14],[-7,-4],[6,-14],[7,-4]])){const e=boneMake(C.x+x,z);e.k5=false;const halo=k5Glow(0x3a1a5a,3.6);e.g.add(halo);halo.position.y=1.3;ES.shadows.push(e);}}
  function wallDown(){E.log('wallDown');k5s('shatter');shakeAll(0.08,0.5);K5L.ink(crack.position.clone(),30);K5L.gold(crack.position.clone(),24);crack.visible=false;wallBox.on=false;
    k5fx(0.8,k=>{WALL.userData.m.material.opacity=0.92*(1-k);WALL.scale.y=1-k*0.5;},()=>{WALL.visible=false;WALL.scale.y=1;});satur(1);
    for(const e of ES.shadows||[]){K5L.ink(e.pos.clone().add(new V3(0,1,0)),10);k5Kill(e);}ES.shadows=[];
    G.flags.names=Object.assign({},ES.saved);for(const h of HEROES)if(G.flags.names[h.kind])nameBurst(h,0xffd76a);say('pelageya','Потап! Йоша! Прошка! Я помню вас — всех!<br>И Лешего, и Водяного, и Соловья, и Горыныча!',4,true);
    ES.ph='moves';ES.mi=0;ES.moveT=0;ES.mv=null;later(2.2,()=>{if(E.cur===11)moveStart(0);});}
  /* ---------- «Все сказки разом» ---------- */
  const rows=[];
  function moveStart(i){const M0=MEM[i%4];ES.mv={i:i%4,t:0,done:!!ES.mem[i%4]};ES.atkT=0;KS.g.visible=true;KS.g.position.set(C.x,0,C.z-2);try{KA.pose('castR',{antic:0.25});}catch(e){}k5s('cast');
    barkS(KS,'koschei',['Я — Путаник! Лес, сомкнись!','Я — Водяной! Омут, крути!','Я — Соловей! Фью-у-у!','Я — Горыныч! Огонь!'][i%4],1.8,true);
    if(i%4===0){for(const s of[-1,1])for(let j=0;j<5;j++){const g=k5Prop(new THREE.Group());const m=M(0x1e1a2a,{emissive:0x2a1048,emissiveIntensity:0.4});addMesh(new THREE.CylinderGeometry(0.15,0.2,1,6),M(0x3a2a1a),0,0.5,0,g);
        for(let q=0;q<3;q++)addMesh(new THREE.ConeGeometry(1-q*0.25,1.3,7),m,0,1+q*0.75,0,g);g.position.set(C.x+s*11,0,C.z-8+j*4);g.userData.s=s;K5L.noRay(g);rows.push(g);}}
    memRings[i%4].visible=true;floatText(MEM[i%4].p.clone().add(new V3(0,3.6,0)),'Это же '+['Леший','Водяной','Соловей','Горыныч'][i%4]+'! Щит вместе рядом — вспомнит!','#ffe08a');E.log('move'+i%4);}
  function moveEnd(){const mv=ES.mv;if(!mv)return;memRings[mv.i].visible=false;for(const g of rows.splice(0))k5Del(g);ES.mv=null;}
  function counter(i){if(ES.mv){if(ES.mv.countered)return;ES.mv.countered=true;}ES.mem[i]=true;E.log('mem'+i);const M0=MEM[i];fog[i].visible=false;const p=M0.p.clone().add(new V3(0,2.4,0));K5L.gold(p,24);k5Pillar(M0.p.clone(),0xffd76a,6,0.6,1);
    say(['leshy','vod','solovei','gorM'][i],['Я — Леший! Ёлки мои — ко мне, на Кощея!','Я — Водяной! Омут мой — тебя и закрутит!','Я — Соловей-Разбойник! Пересвищу!','Мы — Горыныч! Крыльями укроем, огнём — обратно!'][i],2.6,true);
    const kp=KS.g.position.clone();if(i===0)for(const g of rows){const f=g.position.clone();k5fx(0.7,k=>{g.position.lerpVectors(f,kp.clone().add(new V3(rand(-1.5,1.5),0,rand(-1.5,1.5))),k);});}
    if(i===1)k5fx(1.4,k=>{KS.g.rotation.y+=0.4;});if(i===2)for(let q=0;q<4;q++)later(q*0.12,()=>k5Ring(new V3(M0.p.x,1.6,M0.p.z),0xfff4d0,0.5,12,0.7,0.06,new THREE.Euler(Math.PI/2,0,0)));
    if(i===3)k5Pillar(kp.clone(),0xff8a30,8,1.6,1);later(0.8,()=>{moveEnd();winOpen();});music();}
  function winOpen(){ES.win=G.solo?6:7;ES.wh=0;try{KA.pose('slump');}catch(e){}floatText(kosTop(),'Открыт! Бейте!','#ffe08a');}
  W.hittables.push({pos:new V3(),r:1.4,alive:()=>E.cur===11&&ES.fight&&ES.ph==='moves'&&(ES.win>0||ES.spes<=0),onHit:h=>{if(ES.spes<=0){bindHit(h);return;}const cap=Math.ceil(ES.spesMax/4);if(ES.wh>=cap&&ES.mem.some(m=>!m))return;if(G.time<(ES.hcd||0))return;ES.hcd=G.time+0.3;ES.wh++;ES.spes--;burst(KS.g.position.clone().add(new V3(0,2,0)),0xffffff,6,3);SFX.hit&&SFX.hit();
      floatText(kosTop(),ES.spes>0?'Удар!':'Спесь сбита!','#ffe08a');if(ES.spes<=0){ES.win=99;banner('Спесь сбита!','#ffd76a',2.4,G.solo?'ударь рядом — золотая нить':'оба — удар рядом: золотая нить сказа');}else if(ES.wh>=Math.ceil(ES.spesMax/4)&&ES.mem.some(m=>!m))ES.win=Math.min(ES.win,0.3);}});
  const b11=W.hittables[W.hittables.length-1];
  function bindHit(h){const pi=h.player;ES.bind=ES.bind||[-9,-9];ES.bind[pi]=G.time;k5Thread(()=>hH(h),()=>KS.g.position.clone().add(new V3(0,2.4,0)));k5s('bind');if(G.solo||players[1-pi].downed||Math.abs(ES.bind[1-pi]-G.time)<1.6){ES.fight=false;bindBeat();E.won(11);}else floatText(kosTop(),'Второй — тоже!','#ffe08a');}
  const music=()=>K5L.music(ES.ph==='wall'?'ink':'song',ES.ph==='wall'?0:Math.max(1,E.freeCount()-4+ES.mem.filter(Boolean).length));
  E.stage[11]={start(o){E.hub(11);K5L.themeTo('night',1);K5.fight=false;liveBoss(false);dome.visible=false;candles.forEach(c=>{c.g.visible=false;});KS.g.visible=true;KS.g.position.set(C.x,0,C.z-12);KS.g.rotation.y=0;sword.visible=false;
      W.clampR={x:C.x,z:C.z,r:R};Object.assign(ES,{ph:'wall',fight:false,spes:8,spesMax:8,mem:[false,false,false,false],win:0,prog:0});
      MEM.forEach((M0,i)=>{const m=memMods[i];if(m&&m.g){m.g.visible=true;m.g.position.copy(M0.p);m.g.rotation.y=Math.atan2(C.x-M0.p.x,C.z-M0.p.z);}fog[i].visible=true;fog[i].position.copy(M0.p).add(new V3(0,1.6,0));});
      wallUp();music();E.cards(11,()=>{ES.fight=true;});},
    tick(dt){b11.pos.copy(KS.g.position);if(!ES.fight)return;ES.prog=ES.ph==='wall'?0.1:0.25+0.75*(1-ES.spes/ES.spesMax);
      for(let i=0;i<4;i++)if(fog[i].visible){fog[i].material.opacity=0.5+0.2*Math.sin(G.time*2+i);}
      if(ES.ph==='wall'){KS.g.rotation.y=Math.sin(G.time*0.5)*0.4;
        // зовущий: рябь; обе ряби (в одиночку — одна, спутник откликнется) — стена тоньше там, где встретились
        if(ES.crackT>0){ES.crackT-=dt;crack.material.opacity=0.6+0.4*Math.sin(G.time*10);if(ES.crackT<=0)crack.visible=false;}
        return;}
      // «Все сказки разом»
      if(ES.win>0){ES.win-=dt;KS.g.rotation.y=Math.sin(G.time*1.4)*0.2;if(ES.win<=0&&ES.spes>0){floatText(kosTop(),'Опомнился!','#c8a8ff');ES.mi++;later(1.2,()=>{if(E.cur===11&&ES.spes>0)moveStart(ES.mi);});}return;}
      const mv=ES.mv;if(!mv||mv.countered)return;mv.t+=dt;ES.atkT-=dt;const kp=KS.g.position;
      // помощник уже вспомнил себя — отвечает сам через 4 с
      if(mv.done&&mv.t>4){counter(mv.i);return;}
      // щит вместе в кругу замершего друга
      const ring=MEM[mv.i].p,inR=k5Heroes().filter(h=>hd(h.pos,ring)<2.4&&h.guard);if(inR.length>=(G.solo?1:Math.min(2,k5Heroes().length))){mv.g=(mv.g||0)+dt;if(mv.g>0.6){counter(mv.i);return;}}else mv.g=0;
      if(mv.i===0){for(const g of rows){const tx=g.userData.s*1.6;g.position.x+=(tx-(g.position.x-C.x))*dt*0.18;g.rotation.z=Math.sin(G.time*10)*0.03;for(const h of k5Heroes())if(hd(h.pos,g.position)<1.0&&h.pos.y<2)k5Hurt(h,g.position);}}
      else if(mv.i===1){for(const h of k5Heroes()){const dx=kp.x-h.pos.x,dz=kp.z-h.pos.z,d=Math.hypot(dx,dz)||1;h.pos.x+=dx/d*dt*(h.guard?1:2.4);h.pos.z+=dz/d*dt*(h.guard?1:2.4);if(d<2.4)k5Hurt(h,kp);}
        if(Math.random()<dt*6)k5Ring(new V3(kp.x,0.1,kp.z),0x7ad8ff,7,1,0.8,0.05);}
      else if(mv.i===2){if(ES.atkT<=0){ES.atkT=G.solo?3:2.4;for(let q=0;q<3;q++)later(q*0.1,()=>k5Ring(new V3(kp.x,1.4,kp.z),0xfff4d0,0.6,13,0.8,0.05,new THREE.Euler(Math.PI/2,0,0)));k5s('gale');
          for(const h of k5Heroes()){const dx=h.pos.x-kp.x,dz=h.pos.z-kp.z,d=Math.hypot(dx,dz)||1;const f=h.guard?2.5:8;h.vel.x+=dx/d*f;h.vel.z+=dz/d*f;h.vel.y=Math.max(h.vel.y,2);if(!h.guard)k5Hurt(h,kp);}}}
      else if(mv.i===3){mv.a=(mv.a||0)+dt*0.55;if(!mv.beams){mv.beams=[0,1,2].map(()=>{const m=k5Prop(new THREE.Mesh(new THREE.BoxGeometry(0.9,0.5,10),k5Add(0xff7a20,{opacity:0.75})));rows.push(m);return m;});}
        mv.beams.forEach((m,q)=>{const a=mv.a+q*Math.PI*2/3;m.position.set(kp.x+Math.sin(a)*5.4,0.5,kp.z+Math.cos(a)*5.4);m.rotation.y=a;for(const h of k5Heroes()){const dx=h.pos.x-kp.x,dz=h.pos.z-kp.z,along=dx*Math.sin(a)+dz*Math.cos(a),side=Math.abs(dx*Math.cos(a)-dz*Math.sin(a));if(along>0.6&&along<10.4&&side<0.7&&h.pos.y<1.2)k5Hurt(h,kp);}});}},
    end(){wallBox.on=false;WALL.visible=false;crack.visible=false;satur(1);moveEnd();memRings.forEach(r=>{r.visible=false;});fog.forEach(f=>{f.visible=false;});memMods[2].g.visible=false;memMods[3].g.visible=false;
      if(FR.leshy.m)FR.leshy.m.g.position.copy(FR.leshy.home);if(FR.vod.m)FR.vod.m.g.position.copy(FR.vod.home);if(ES.saved&&ES.ph==='wall')G.flags.names=Object.assign({},ES.saved);for(const e of ES.shadows||[])k5Kill(e);},
    attack(h,pi){if(E.cur!==11||ES.ph!=='wall'||!crack.visible)return;if(hd(h.pos,crack.position)>2.2)return;ES.wallHit[h.player]=G.time;FX.sparks(crack.position.clone(),10,0xffd76a);
      if(G.solo||Math.abs(ES.wallHit[0]-ES.wallHit[1])<1.4)wallDown();else floatText(crack.position.clone().add(new V3(0,1.6,0)),'Вместе — с двух сторон!','#ffe08a');},
    goal:pi=>ES.ph==='wall'?(crack.visible?'Стена тонкая — <b>удар</b> '+K(pi,'attack')+' в золотую трещину'+(G.solo?'':' — вдвоём, с двух сторон')+'!':'Стена разделила вас. Позови друга по имени: <b>«Ко мне!»</b> '+K(pi,'call')+(G.solo?'':' — оба')+'.'):
      ES.win>0||ES.spes<=0?(ES.spes>0?'Кощей открыт — <b>бейте</b> '+K(pi,'attack')+'!':'Оба — удар рядом с ним: <b>золотая нить</b>!'):
      ES.mv?'Кощей взял приём: '+MEM[ES.mv.i].n+'. Беги к замершему другу — <b>щит вместе</b> '+K(pi,'guard')+' в его кругу: он вспомнит себя!':'',
    targets:pi=>ES.ph==='wall'?(crack.visible?[crack]:[]):ES.mv?[memRings[ES.mv.i]]:[KS.g]};
  // «Ко мне!» в стадии 11: золотая рябь; две ряби — трещина на стене между вами
  {const _pc=W.pingCall;W.pingCall=(pi,h)=>{if(E.cur===11&&ES.fight&&ES.ph==='wall'){ES.call[pi]=G.time;k5Ring(new V3(h.pos.x,0.2,h.pos.z),PCOL[pi],0.5,8,0.9,0.08);E.log('call'+pi);
      const both=G.solo||Math.abs(ES.call[0]-ES.call[1])<3;if(both){const a=active(0),b=G.solo?a:active(1);const z=(a.pos.z+b.pos.z)/2;later(G.solo?1.0:0.4,()=>{if(G.solo){const c=active(1-pi);floatText(c.pos.clone().add(new V3(0,2,0)),'Я здесь!','#ffe08a');}
        crack.visible=true;crack.position.set(C.x,1.4,clamp(z,C.z-9,C.z+9));ES.crackT=7;k5s('reveal');floatText(crack.position.clone().add(new V3(0,1.8,0)),'Слышу тебя!','#ffe08a');});}
      else floatText(h.pos.clone().add(new V3(0,2,0)),'…кто там?','#d8d0ff');return;}
    if(_pc)_pc(pi,h);};}
  E.CARDS[11]=[{p:[0,11,6],l:[0,1,-13],card:{tag:'Как победить',title:'Стадия 11 из 12 · Без имён',icon:'orb',text:'Кощей вычеркнул имена. Чернильная <b>стена</b> разделила вас. Позовите друг друга: <b>«Ко мне!»</b> — две золотые ряби найдут трещину. Ударьте в неё — с двух сторон.'}},
    {p:[0,11,4],l:[0,1,-14],card:{tag:'Вместе',title:'Все сказки разом',icon:'spark',text:'Кощей берёт приёмы четырёх боссов. Беги к <b>замершему другу</b> из той сказки и держите <b>щит вместе</b> в его кругу — друг вспомнит себя и обернёт приём против Кощея.'}}];
