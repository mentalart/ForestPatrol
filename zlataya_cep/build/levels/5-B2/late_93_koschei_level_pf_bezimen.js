// ---- продолжение build5B2 (k5epic, часть 15): СТАДИЯ 11 «БЕЗ ИМЁН» (новая; отзвук терема 5-Б1) ----
  // Кощей вычёркивает в тетрадке вернувшиеся имена: мир блёкнет, друзья замирают. Чернильная страница-стена делит поляну: каждый
  // игрок один, против чернильных теней. «Ко мне!» — золотая рябь; обе ряби встретились — стена тоньше: удар обоих в одно место — стена
  // падает, имена возвращаются. Потом «Все сказки разом»: Кощей берёт приёмы четырёх боссов; герои бегут к замершему другу из той сказки
  // и держат щит вместе — друг вспоминает себя и оборачивает приём против Кощея: Кощей открыт, удары гасят спесь.
  // Глубже: мир блёкнет — в воздухе плавают вычеркнутые имена, кружат чистые листы, сыплются чернильные хлопья. Стена хлещет
  // чернильными плетьми (красная дорожка от стены к герою), Кощей роняет «Чёрное слово». Стена пала — имена золотеют и летят к героям.
  // Все четверо вспомнили себя — «Все сказки разом»: ряды ёлок, свист и огненные лучи одновременно (выжить 9 с), потом Кощей выдохся —
  // длинное окно. Атлас: separation + co-op call, lane-whip, letter strikes, mimic (приёмы боссов), counter, enrage/survival. Бот — tk5e_s11.
  const WALL=k5Prop(new THREE.Group());{const c=document.createElement('canvas');c.width=512;c.height=256;const g=c.getContext('2d');g.fillStyle='#120a1c';g.fillRect(0,0,512,256);g.strokeStyle='rgba(170,110,255,0.55)';g.lineWidth=3;g.font='italic 34px Georgia,serif';g.fillStyle='rgba(190,150,255,0.5)';
    for(let i=0;i<14;i++){g.fillText(['Потап','Йоша','Прошка','Пелагея','Леший','Яга'][i%6],rand(10,400),rand(30,250));const y=rand(20,240);g.beginPath();g.moveTo(rand(0,200),y);g.lineTo(rand(300,512),y+rand(-10,10));g.stroke();}
    const m=new THREE.Mesh(new THREE.BoxGeometry(0.9,7,22),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),transparent:true,opacity:0.92}));m.position.set(0,3.5,0);WALL.add(m);WALL.userData.m=m;
    const glow=new THREE.Mesh(new THREE.PlaneGeometry(2.4,22),k5Add(0x9a50ff,{opacity:0.55}));glow.rotation.x=-Math.PI/2;glow.position.y=0.06;WALL.add(glow);const top=new THREE.Mesh(new THREE.BoxGeometry(1.0,0.12,22),k5Add(0xc890ff,{opacity:0.9}));top.position.y=7.05;WALL.add(top);}   // плита с ребра видна узкой — светящаяся полоса на земле и кромка сверху
  WALL.position.set(C.x,0,C.z);WALL.visible=false;K5L.noRay(WALL);const wallBox={minx:C.x-0.3,maxx:C.x+0.3,miny:-1,maxy:8,minz:C.z-11,maxz:C.z+11,on:false,occ:false};W.boxes.push(wallBox);
  const crack=k5Glow(0xffd76a,3);k5Prop(crack);crack.visible=false;
  const NAMES=['Потап','Йоша','Прошка','Пелагея','Леший','Водяной','Соловей','Горыныч','Яга','Кот','Кикимора','Жар-птица'];
  const nameSp=NAMES.map((n,i)=>{const c=document.createElement('canvas');c.width=256;c.height=64;const g=c.getContext('2d');g.font='italic 40px Georgia,serif';g.textAlign='center';g.textBaseline='middle';
    const tex=new THREE.CanvasTexture(c);const draw=gold=>{g.clearRect(0,0,256,64);g.fillStyle=gold?'#ffd76a':'rgba(200,170,255,0.85)';g.fillText(n,128,34);if(!gold){g.strokeStyle='rgba(30,10,50,0.95)';g.lineWidth=6;g.beginPath();g.moveTo(14,30);g.lineTo(242,38);g.stroke();}tex.needsUpdate=true;};draw(false);
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false,opacity:0.85}));sp.scale.set(3.2,0.8,1);k5Prop(sp);sp.visible=false;sp.raycast=()=>{};return {sp,draw,a:i/NAMES.length*Math.PI*2,r:rand(8,12),y:rand(3,6.5),sp0:rand(0.08,0.16)};});
  const sheets=[];for(let i=0;i<14;i++){const m=k5Prop(new THREE.Mesh(new THREE.PlaneGeometry(0.7,0.95),new THREE.MeshBasicMaterial({color:0xf4ecd8,side:THREE.DoubleSide,transparent:true,opacity:0.9})));m.visible=false;m.raycast=()=>{};sheets.push({m,a:rand(0,6.28),r:rand(4,12),y:rand(1,7),w:rand(0.2,0.5),ph:rand(0,6)});}
  function inkWorld(on){nameSp.forEach(N=>{N.sp.visible=on;N.draw(false);N.gone=false;});sheets.forEach(S0=>{S0.m.visible=on;});}
  function namesHome(){nameSp.forEach((N,i)=>{N.draw(true);const f=N.sp.position.clone();const hs=HEROES.filter(h=>h.active);const h=hs[i%Math.max(1,hs.length)];later(i*0.08,()=>{k5fx(1.0,k=>{if(h)N.sp.position.lerpVectors(f,h.pos.clone().add(new V3(0,2.4,0)),CE.inOutSine(k));N.sp.material.opacity=0.95*(1-k*0.9);},()=>{N.sp.visible=false;N.gone=true;if(h)K5L.gold(h.pos.clone().add(new V3(0,2.2,0)),6);});});});}
  // плеть из стены: красная дорожка от стены к герою
  function whip(){const hs=k5Heroes();if(!hs.length)return;const h=hs[Math.floor(rand(0,hs.length))];const side=h.pos.x<C.x?-1:1;const a=new V3(C.x+side*0.5,0.05,clamp(h.pos.z,C.z-10,C.z+10)),b=new V3(h.pos.x+(h.pos.x-a.x)*0.3,0.05,h.pos.z);
    if(FIN.k2fx)FIN.k2fx.lane(a,b,1.2,G.solo?1.3:1.0,'red');later(G.solo?1.3:1.0,()=>{if(E.cur!==11||ES.ph!=='wall')return;const L=k5Prop(new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.3,1,6),M(0x140a20,{emissive:0x4a1a7a,emissiveIntensity:0.6})));
      const m=a.clone().lerp(b,0.5);m.y=0.5;L.position.copy(m);L.scale.y=a.distanceTo(b);L.quaternion.setFromUnitVectors(new V3(0,1,0),b.clone().sub(a).normalize());k5fx(0.4,k=>{L.material.opacity=1-k;},()=>k5Del(L));K5L.ink(b.clone().add(new V3(0,0.6,0)),10);k5s('whooshBig');
      for(const q of k5Heroes()){const ab=b.clone().sub(a),ap=q.pos.clone().sub(a);ab.y=0;ap.y=0;const t=clamp(ap.dot(ab)/ab.lengthSq(),0,1);if(hd(q.pos,a.clone().addScaledVector(ab,t))<0.8&&q.rollT<=0&&q.pos.y<1.2)k5Hurt(q,a);}});E.log('whip');}
  // «Все сказки разом»: ряды ёлок, свист и огненные лучи одновременно
  function rageStart(){ES.rage={t:0,wh:1.5,a:0,beams:[]};KS.g.visible=true;KS.g.position.set(C.x,0,C.z-2);try{KA.pose('castR',{antic:0.25});}catch(e){}k5s('ult');shakeAll(0.1,0.6);K5X.screen('#3a1a5a',0.35,0.6);
    barkS(KS,'koschei','Ах, вспомнили?! Так получайте — все сказки разом!',2.4,true);E.log('rage');
    for(const s0 of[-1,1])for(let j=0;j<5;j++){const g=k5Prop(new THREE.Group());const m=M(0x1e1a2a,{emissive:0x2a1048,emissiveIntensity:0.4});addMesh(new THREE.CylinderGeometry(0.15,0.2,1,6),M(0x3a2a1a),0,0.5,0,g);
      for(let q=0;q<3;q++)addMesh(new THREE.ConeGeometry(1-q*0.25,1.3,7),m,0,1+q*0.75,0,g);g.position.set(C.x+s0*11,0,C.z-8+j*4);g.userData.s=s0;K5L.noRay(g);rows.push(g);}
    ES.rage.beams=[0,1].map(()=>{const m=k5Prop(new THREE.Mesh(new THREE.BoxGeometry(0.9,0.5,10),k5Add(0xff7a20,{opacity:0.75})));rows.push(m);return m;});}
  function rageTick(dt){const R=ES.rage,kp=KS.g.position;R.t+=dt;R.a+=dt*0.45;
    for(const g of rows){if(g.userData.s==null)continue;const tx=g.userData.s*2.4;g.position.x+=(tx-(g.position.x-C.x))*dt*0.12;for(const h of k5Heroes())if(hd(h.pos,g.position)<1.0&&h.pos.y<2)k5Hurt(h,g.position);}
    R.beams.forEach((m,q)=>{const a=R.a+q*Math.PI;m.position.set(kp.x+Math.sin(a)*5.4,0.5,kp.z+Math.cos(a)*5.4);m.rotation.y=a;for(const h of k5Heroes()){const dx=h.pos.x-kp.x,dz=h.pos.z-kp.z,along=dx*Math.sin(a)+dz*Math.cos(a),side=Math.abs(dx*Math.cos(a)-dz*Math.sin(a));if(along>0.6&&along<10.4&&side<0.7&&h.pos.y<1.2)k5Hurt(h,kp);}});
    R.wh-=dt;if(R.wh<=0){R.wh=G.solo?3.4:2.6;for(let q=0;q<3;q++)later(q*0.1,()=>k5Ring(new V3(kp.x,1.4,kp.z),0xfff4d0,0.6,13,0.8,0.05,new THREE.Euler(Math.PI/2,0,0)));k5s('gale');
      for(const h of k5Heroes()){const dx=h.pos.x-kp.x,dz=h.pos.z-kp.z,d=Math.hypot(dx,dz)||1;const f=h.guard?2.5:7;h.vel.x+=dx/d*f;h.vel.z+=dz/d*f;h.vel.y=Math.max(h.vel.y,2);if(!h.guard)k5Hurt(h,kp);}}
    if(R.t>=9){ES.rage=null;for(const g of rows.splice(0))k5Del(g);ES.raged=true;ES.win=G.solo?12:11;ES.wh=-99;try{KA.pose('slump');}catch(e){}floatText(kosTop(),'Выдохся! Бейте!','#ffe08a');E.log('rageEnd');}}
  // где стоят замершие друзья в «Все сказки разом» (внутри поляны)
  const MEM=[{k:'leshy',p:new V3(-8.4,0,-8.6),n:'Путаник'},{k:'vod',p:new V3(8.4,0,-8.6),n:'Водяной'},{k:'solo',p:new V3(-6.6,0,-19.6),n:'Соловей'},{k:'gor',p:new V3(6.6,0,-19.6),n:'Горыныч'}];
  const memRings=MEM.map(M0=>{const r=new THREE.Mesh(new THREE.RingGeometry(2.0,2.5,40),k5Add(0xffd76a,{opacity:0.9}));r.rotation.x=-Math.PI/2;r.position.set(M0.p.x,0.07,M0.p.z);k5Prop(r);r.visible=false;
    const fill=new THREE.Mesh(new THREE.CircleGeometry(2.0,40),k5Add(0xffd76a,{opacity:0.18}));fill.position.z=-0.01;r.add(fill);return r;});
  const memMods=[FR.leshy.m,FR.vod.m,(()=>{const s=makeSolovei();s.g.scale.setScalar(0.8);s.g.visible=false;K5L.noRay(s.g);return s;})(),(()=>{const g=makeGorynych5(0.55);g.g.scale.setScalar(0.55);g.g.visible=false;K5L.noRay(g.g);return g;})()];
  const fog=MEM.map(()=>{const s=k5Glow(0x6a5a8a,4);k5Prop(s);s.visible=false;return s;});
  function satur(v){try{renderer.domElement.style.filter=v<1?'saturate('+v+')':'';}catch(e){}}
  function wallUp(){inkWorld(true);ES.whipT=4;ES.letT=6;WALL.visible=true;wallBox.on=true;WALL.userData.m.material.opacity=0.92;satur(0.25);ES.saved=Object.assign({},G.flags.names||{});G.flags.names={};ES.call=[-9,-9];ES.crackT=0;ES.wallHit=[-9,-9];
    const pos=G.solo?[[-5,-8],[-6.5,-6]]:[[-5,-8],[5,-8]];for(const pi of[0,1]){const p=players[pi];p.heroes.forEach((h,k)=>{const side=G.solo?(h.active&&pi===G.soloPi?-1:1):(pi?1:-1);placeOnGround(h,side*(5+k*1.4),-8+k*1.6,0);h.face=Math.PI;h.vel.set(0,0,0);});}snapCams();
    ES.shadows=[];for(const [x,z] of(G.solo?[[-6,-14],[-7,-4]]:[[-6,-14],[-7,-4],[6,-14],[7,-4]])){const e=boneMake(C.x+x,z);e.k5=false;const halo=k5Glow(0x3a1a5a,3.6);e.g.add(halo);halo.position.y=1.3;ES.shadows.push(e);}}
  function wallDown(){E.log('wallDown');k5s('shatter');shakeAll(0.08,0.5);K5L.ink(crack.position.clone(),30);K5L.gold(crack.position.clone(),24);crack.visible=false;wallBox.on=false;
    k5fx(0.8,k=>{WALL.userData.m.material.opacity=0.92*(1-k);WALL.scale.y=1-k*0.5;},()=>{WALL.visible=false;WALL.scale.y=1;});satur(1);
    for(const e of ES.shadows||[]){K5L.ink(e.pos.clone().add(new V3(0,1,0)),10);k5Kill(e);}ES.shadows=[];
    G.flags.names=Object.assign({},ES.saved);namesHome();sheets.forEach(S0=>{S0.m.visible=false;});for(const h of HEROES)if(G.flags.names[h.kind])nameBurst(h,0xffd76a);say('pelageya','Потап! Йоша! Прошка! Я помню вас — всех!<br>И Лешего, и Водяного, и Соловья, и Горыныча!',4,true);
    ES.ph='moves';ES.mi=0;ES.moveT=0;ES.mv=null;later(2.2,()=>{if(E.cur===11)moveStart(0);});}
  /* ---------- «Все сказки разом» ---------- */
  const rows=[];
  function moveStart(i){const M0=MEM[i%4];ES.mv={i:i%4,t:0,done:!!ES.mem[i%4]};ES.atkT=0;KS.g.visible=true;KS.g.position.set(C.x,0,C.z-2);try{KA.pose('castR',{antic:0.25});}catch(e){}k5s('cast');
    barkS(KS,'koschei',['Я — Путаник! Лес, сомкнись!','Я — Водяной! Омут, крути!','Я — Соловей! Фью-у-у!','Я — Горыныч! Огонь!'][i%4],1.8,true);
    if(i%4===0){for(const s of[-1,1])for(let j=0;j<5;j++){const g=k5Prop(new THREE.Group());const m=M(0x1e1a2a,{emissive:0x2a1048,emissiveIntensity:0.4});addMesh(new THREE.CylinderGeometry(0.15,0.2,1,6),M(0x3a2a1a),0,0.5,0,g);
        for(let q=0;q<3;q++)addMesh(new THREE.ConeGeometry(1-q*0.25,1.3,7),m,0,1+q*0.75,0,g);g.position.set(C.x+s*11,0,C.z-8+j*4);g.userData.s=s;K5L.noRay(g);rows.push(g);}}
    E.log('move'+i%4);}
  function moveEnd(){const mv=ES.mv;if(!mv)return;memRings[mv.i].visible=false;for(const g of rows.splice(0))k5Del(g);ES.mv=null;}
  function counter(i){if(ES.mv){if(ES.mv.countered)return;ES.mv.countered=true;}ES.mem[i]=true;E.log('mem'+i);const M0=MEM[i];fog[i].visible=false;const p=M0.p.clone().add(new V3(0,2.4,0));K5L.gold(p,24);k5Pillar(M0.p.clone(),0xffd76a,6,0.6,1);
    say(['leshy','vod','solovei','gorM'][i],['Я — Леший! Ёлки мои — ко мне, на Кощея!','Я — Водяной! Омут мой — тебя и закрутит!','Я — Соловей-Разбойник! Пересвищу!','Мы — Горыныч! Крыльями укроем, огнём — обратно!'][i],2.6,true);
    const kp=KS.g.position.clone();if(i===0)for(const g of rows){const f=g.position.clone();k5fx(0.7,k=>{g.position.lerpVectors(f,kp.clone().add(new V3(rand(-1.5,1.5),0,rand(-1.5,1.5))),k);});}
    if(i===1)k5fx(1.4,k=>{KS.g.rotation.y+=0.4;});if(i===2)for(let q=0;q<4;q++)later(q*0.12,()=>k5Ring(new V3(M0.p.x,1.6,M0.p.z),0xfff4d0,0.5,12,0.7,0.06,new THREE.Euler(Math.PI/2,0,0)));
    if(i===3)k5Pillar(kp.clone(),0xff8a30,8,1.6,1);later(0.8,()=>{moveEnd();winOpen();});music();}
  function winOpen(){ES.win=G.solo?6:7;ES.wh=0;try{KA.pose('slump');}catch(e){}floatText(kosTop(),'Открыт! Бейте!','#ffe08a');}
  W.hittables.push({pos:new V3(),r:1.4,alive:()=>E.cur===11&&ES.fight&&ES.ph==='moves'&&(ES.win>0||ES.spes<=0),onHit:h=>{if(ES.spes<=0){bindHit(h);return;}const cap=Math.floor((ES.spesMax-2)/4);if(ES.wh>=cap&&(ES.mem.some(m=>!m)||!ES.raged))return;if(G.time<(ES.hcd||0))return;ES.hcd=G.time+0.3;ES.wh++;ES.spes--;burst(KS.g.position.clone().add(new V3(0,2,0)),0xffffff,6,3);SFX.hit&&SFX.hit();
      floatText(kosTop(),ES.spes>0?'Удар!':'Спесь сбита!','#ffe08a');if(ES.spes<=0){ES.win=99;banner('Спесь сбита!','#ffd76a',2.4);}else if(ES.wh>=Math.floor((ES.spesMax-2)/4)&&(ES.mem.some(m=>!m)||!ES.raged))ES.win=Math.min(ES.win,0.3);}});
  const b11=W.hittables[W.hittables.length-1];
  function bindHit(h){const pi=h.player;ES.bind=ES.bind||[-9,-9];ES.bind[pi]=G.time;k5Thread(()=>hH(h),()=>KS.g.position.clone().add(new V3(0,2.4,0)));k5s('bind');if(G.solo||players[1-pi].downed||Math.abs(ES.bind[1-pi]-G.time)<1.6){ES.fight=false;bindBeat();E.won(11);}else floatText(kosTop(),'Второй — тоже!','#ffe08a');}
  const music=()=>K5L.music(ES.ph==='wall'?'ink':'song',ES.ph==='wall'?0:Math.max(1,E.freeCount()-4+ES.mem.filter(Boolean).length));
  // помощники живые: замершие покачиваются серыми, вспомнившие подпрыгивают, смотрят на Кощея, Водяной и Горыныч — со своей мимикой
  function helpersTick(dt){if(E.cur!==11)return;const t=G.time,kp=KS.g.position;MEM.forEach((M0,i)=>{const m=memMods[i];if(!m||!m.g||!m.g.visible)return;const on=ES.mem&&ES.mem[i],act=ES.mv&&ES.mv.i===i;
      const hop=on?Math.max(0,Math.sin(t*4.2+i))*0.35:0;m.g.position.set(M0.p.x,M0.p.y+hop+Math.sin(t*1.6+i)*0.05,M0.p.z);
      const look=Math.atan2(kp.x-M0.p.x,kp.z-M0.p.z);m.g.rotation.y=on?angDamp(m.g.rotation.y,look,4,dt):look+Math.sin(t*0.7+i)*(act?0.35:0.12);m.g.rotation.z=on?Math.sin(t*3+i)*0.06:Math.sin(t*0.9+i)*0.04;
      if(m.R&&FIN.k2v&&FIN.k2v.anim){try{FIN.k2v.set(m.R,on?'conduct':act?'dazed':'sleep',on?'neutral':'tired');FIN.k2v.anim(m.R,dt);}catch(e){}}
      if(m.heads)m.heads.forEach((h,k)=>{const q=h&&(h.g||h.hg||h);if(!q||!q.rotation)return;q.rotation.x=Math.sin(t*(on?3:1.2)+k*1.7)*(on?0.25:0.1);q.rotation.y=Math.sin(t*0.8+k)*0.2;});
      if(m.wings)m.wings.forEach(w=>{const q=w.wp||w;if(q&&q.rotation)q.rotation.z=(w.s||1)*Math.sin(t*(on?6:1.5))*(on?0.4:0.12);});});}
  E.stage[11]={start(o){E.hub(11);K5L.themeTo('night',1);K5.fight=false;liveBoss(false);dome.visible=false;candles.forEach(c=>{c.g.visible=false;});KS.g.visible=true;KS.g.position.set(C.x,0,C.z-12);KS.g.rotation.y=0;sword.visible=false;
      W.clampR={x:C.x,z:C.z,r:R};Object.assign(ES,{ph:'wall',fight:false,spes:10,spesMax:10,mem:[false,false,false,false],win:0,prog:0});
      MEM.forEach((M0,i)=>{const m=memMods[i];if(m&&m.g){m.g.visible=true;m.g.position.copy(M0.p);m.g.rotation.y=Math.atan2(C.x-M0.p.x,C.z-M0.p.z);}fog[i].visible=true;fog[i].position.copy(M0.p).add(new V3(0,1.6,0));});
      ES.rage=null;ES.raged=false;K5X.motes('ink',new V3(C.x,0,C.z),13,160,8);K5X.tint('rgba(20,0,40,.85)',0.55);wallUp();music();E.lesson(11,()=>{ES.fight=true;});},
    tick(dt){b11.pos.copy(KS.g.position);helpersTick(dt);if(!ES.fight)return;ES.prog=ES.ph==='wall'?0.1:0.25+0.75*(1-ES.spes/ES.spesMax);
      for(let i=0;i<4;i++)if(fog[i].visible){fog[i].material.opacity=0.5+0.2*Math.sin(G.time*2+i);}
      nameSp.forEach(N=>{if(!N.sp.visible||N.gone||ES.ph!=='wall')return;N.a+=dt*N.sp0;N.sp.position.set(C.x+Math.cos(N.a)*N.r,N.y+Math.sin(G.time+N.a)*0.3,C.z+Math.sin(N.a)*N.r*0.8);});
      sheets.forEach(S0=>{if(!S0.m.visible)return;S0.a+=dt*S0.w;S0.m.position.set(C.x+Math.cos(S0.a)*S0.r,S0.y+Math.sin(G.time*1.3+S0.ph)*0.6,C.z+Math.sin(S0.a)*S0.r*0.8);S0.m.rotation.set(Math.sin(G.time*2+S0.ph),S0.a*2,Math.cos(G.time*1.7+S0.ph)*0.6);});
      if(ES.ph==='wall'){KS.g.rotation.y=Math.sin(G.time*0.5)*0.4;
        ES.whipT-=dt;if(ES.whipT<=0){ES.whipT=G.solo?5.5:4;whip();}ES.letT-=dt;if(ES.letT<=0){ES.letT=G.solo?8:6;const hs=k5Heroes();const h=hs[Math.floor(rand(0,hs.length))];if(h&&E.letterAt)E.letterAt(Math.random()<0.5?'Ч':'Т',h);}
        // зовущий: рябь; обе ряби (в одиночку — одна, спутник откликнется) — стена тоньше там, где встретились
        if(ES.crackT>0){ES.crackT-=dt;crack.material.opacity=0.6+0.4*Math.sin(G.time*10);if(ES.crackT<=0)crack.visible=false;}
        return;}
      // «Все сказки разом»
      if(ES.win>0){ES.win-=dt;KS.g.rotation.y=Math.sin(G.time*1.4)*0.2;if(ES.win<=0&&ES.spes>0){floatText(kosTop(),'Опомнился!','#c8a8ff');if(ES.mem.every(Boolean)&&!ES.raged){later(1.0,()=>{if(E.cur===11&&ES.spes>0&&!ES.rage)rageStart();});return;}ES.mi++;later(1.2,()=>{if(E.cur===11&&ES.spes>0)moveStart(ES.mi);});}return;}
      if(ES.rage){rageTick(dt);return;}
      const mv=ES.mv;if(!mv||mv.countered)return;mv.t+=dt;ES.atkT-=dt;const kp=KS.g.position;
      // помощник уже вспомнил себя — отвечает сам через 4 с
      if(mv.done&&mv.t>4){counter(mv.i);return;}
      // щит вместе в кругу замершего друга
      const ring=MEM[mv.i].p,inR=k5Heroes().filter(h=>hd(h.pos,ring)<2.4&&h.guard);const safe=h=>hd(h.pos,ring)<2.6;/* в кругу друга его приём не бьёт */if(inR.length>=(G.solo?1:Math.min(2,k5Heroes().length))){mv.g=(mv.g||0)+dt;if(mv.g>0.6){counter(mv.i);return;}}else mv.g=0;
      if(mv.i===0){for(const g of rows){const tx=g.userData.s*1.6;g.position.x+=(tx-(g.position.x-C.x))*dt*0.18;g.rotation.z=Math.sin(G.time*10)*0.03;for(const h of k5Heroes())if(!safe(h)&&hd(h.pos,g.position)<1.0&&h.pos.y<2)k5Hurt(h,g.position);}}
      else if(mv.i===1){for(const h of k5Heroes()){if(safe(h))continue;const dx=kp.x-h.pos.x,dz=kp.z-h.pos.z,d=Math.hypot(dx,dz)||1;h.pos.x+=dx/d*dt*(h.guard?1:2.4);h.pos.z+=dz/d*dt*(h.guard?1:2.4);if(d<2.4)k5Hurt(h,kp);}
        if(Math.random()<dt*6)k5Ring(new V3(kp.x,0.1,kp.z),0x7ad8ff,7,1,0.8,0.05);}
      else if(mv.i===2){if(ES.atkT<=0){ES.atkT=G.solo?3:2.4;for(let q=0;q<3;q++)later(q*0.1,()=>k5Ring(new V3(kp.x,1.4,kp.z),0xfff4d0,0.6,13,0.8,0.05,new THREE.Euler(Math.PI/2,0,0)));k5s('gale');
          for(const h of k5Heroes()){if(safe(h))continue;const dx=h.pos.x-kp.x,dz=h.pos.z-kp.z,d=Math.hypot(dx,dz)||1;const f=h.guard?2.5:8;h.vel.x+=dx/d*f;h.vel.z+=dz/d*f;h.vel.y=Math.max(h.vel.y,2);if(!h.guard)k5Hurt(h,kp);}}}
      else if(mv.i===3){mv.a=(mv.a||0)+dt*0.55;if(!mv.beams){mv.beams=[0,1,2].map(()=>{const m=k5Prop(new THREE.Mesh(new THREE.BoxGeometry(0.9,0.5,10),k5Add(0xff7a20,{opacity:0.75})));rows.push(m);return m;});}
        mv.beams.forEach((m,q)=>{const a=mv.a+q*Math.PI*2/3;m.position.set(kp.x+Math.sin(a)*5.4,0.5,kp.z+Math.cos(a)*5.4);m.rotation.y=a;for(const h of k5Heroes()){if(safe(h)||h.guard)continue;const dx=h.pos.x-kp.x,dz=h.pos.z-kp.z,along=dx*Math.sin(a)+dz*Math.cos(a),side=Math.abs(dx*Math.cos(a)-dz*Math.sin(a));if(along>0.6&&along<10.4&&side<0.7&&h.pos.y<1.2)k5Hurt(h,kp);}});}},
    end(){inkWorld(false);if(ES.rage){for(const g of rows.splice(0))k5Del(g);ES.rage=null;}wallBox.on=false;WALL.visible=false;crack.visible=false;satur(1);moveEnd();memRings.forEach(r=>{r.visible=false;});fog.forEach(f=>{f.visible=false;});memMods[2].g.visible=false;memMods[3].g.visible=false;
      if(FR.leshy.m)FR.leshy.m.g.position.copy(FR.leshy.home);if(FR.vod.m)FR.vod.m.g.position.copy(FR.vod.home);if(ES.saved&&ES.ph==='wall')G.flags.names=Object.assign({},ES.saved);for(const e of ES.shadows||[])k5Kill(e);},
    attack(h,pi){if(E.cur!==11||ES.ph!=='wall'||!crack.visible)return;if(hd(h.pos,crack.position)>2.2)return;ES.wallHit[h.player]=G.time;FX.sparks(crack.position.clone(),10,0xffd76a);
      if(G.solo||Math.abs(ES.wallHit[0]-ES.wallHit[1])<1.4)wallDown();else floatText(crack.position.clone().add(new V3(0,1.6,0)),'Вместе — с двух сторон!','#ffe08a');}};
  E.stage[11].bot={counter:i=>counter(i),names:()=>nameSp,whip:()=>whip(),hit:h=>b11.onHit(h)};
  // «Ко мне!» в стадии 11: золотая рябь; две ряби — трещина на стене между вами
  {const _pc=W.pingCall;W.pingCall=(pi,h)=>{if(E.cur===11&&ES.fight&&ES.ph==='wall'){ES.call[pi]=G.time;k5Ring(new V3(h.pos.x,0.2,h.pos.z),PCOL[pi],0.5,8,0.9,0.08);E.log('call'+pi);
      const both=G.solo||Math.abs(ES.call[0]-ES.call[1])<3;if(both){const a=active(0),b=G.solo?a:active(1);const z=(a.pos.z+b.pos.z)/2;later(G.solo?1.0:0.4,()=>{if(G.solo){const c=active(1-pi);floatText(c.pos.clone().add(new V3(0,2,0)),'Я здесь!','#ffe08a');}
        crack.visible=true;crack.position.set(C.x,1.4,clamp(z,C.z-9,C.z+9));ES.crackT=7;k5s('reveal');floatText(crack.position.clone().add(new V3(0,1.8,0)),'Слышу тебя!','#ffe08a');});}
      else floatText(h.pos.clone().add(new V3(0,2,0)),'…кто там?','#d8d0ff');return;}
    if(_pc)_pc(pi,h);};}
  /* ---------- обучающая катсцена стадии 11: вычеркнутые имена, стена и трещина, приёмы сказок и замершие друзья, «все сказки разом» ---------- */
  E.LES[11]=L=>{const po=T.potap,pr=T.proshka,pe=T.pelageya,yo=T.yosha,H=(x,z)=>[x,0.9,z],kc=()=>KS.g.position.clone().add(new V3(0,2.4,0)),pips=L.pips(6);pips.g.visible=false;
    L.on(()=>{inkWorld(false);WALL.visible=false;WALL.scale.y=1;WALL.userData.m.material.opacity=0.92;wallBox.on=false;crack.visible=false;satur(1);for(const o of L.props)k5Del(o);nameSp.forEach(N=>{N.sp.visible=false;});memRings.forEach(r=>{r.visible=false;});});
    L.put(po,-5,-10);L.put(pr,-6.4,-10.6);L.put(pe,5,-10);L.put(yo,6.4,-10.6);KS.g.visible=true;KS.g.position.set(C.x,0,C.z-12);KS.g.rotation.y=0;
    L.beat(7,{cam:[[0,11,4],[0,2.4,-13],[0,9.5,2],[0,2.4,-13]],need:[H(-5,-10),H(5,-10),[0,2.4,-13]],says:[['zven','Кощей вычёркивает имена — мир блёкнет,',0.2,3.0],['zven','а друзья замирают, как будто забыты.',3.4,3.0]],
      ev:[[0,()=>{inkWorld(true);satur(0.3);nameSp.forEach(N=>{N.sp.visible=true;N.draw(false);});const fx=k5fx(60,(k,dt)=>{nameSp.forEach(N=>{N.a+=dt*N.sp0;N.sp.position.set(C.x+Math.cos(N.a)*N.r,N.y+Math.sin(G.time+N.a)*0.3,C.z+Math.sin(N.a)*N.r*0.8);});sheets.forEach(S0=>{S0.a+=dt*S0.w;S0.m.position.set(C.x+Math.cos(S0.a)*S0.r,S0.y+Math.sin(G.time*1.3+S0.ph)*0.6,C.z+Math.sin(S0.a)*S0.r*0.8);S0.m.rotation.set(Math.sin(G.time*2+S0.ph),S0.a*2,Math.cos(G.time*1.7+S0.ph)*0.6);});},()=>{});L.on(()=>{fx.t=fx.dur;});}],[1.0,()=>L.pose('cast',{antic:0.3})],[1.6,()=>k5s('cast')]]});
    // стена и трещина
    L.beat(11,{cam:[[0,10.5,3],[0,2,-12]],need:[H(-5,-8),H(5,-8),[0,3,-13]],says:[['zven','Чернильная страница-стена делит поляну: каждый — один против теней.',0.2,4.2],['zven','«Ко мне!» '+kbd('call')+' — обоим: золотая рябь найдёт трещину в стене.',4.6,3.8],['zven','Ударьте оба в трещину с двух сторон — стена падёт!',8.5,2.4]],
      ev:[[0,()=>{WALL.visible=true;WALL.scale.y=1;WALL.userData.m.material.opacity=0.92;L.put(po,-5,-8);L.put(pe,5,-8);L.look(po,new V3(0,0,-8));L.look(pe,new V3(0,0,-8));}],[1.0,()=>{L.later(0.01,()=>{});const f=new V3(-1,0,-17);const e=K5L.ink(f.clone().add(new V3(0,0.6,0)),10);L.pose('castR',{antic:0.2});k5s('whooshBig');}],
        [5.0,()=>{k5Ring(new V3(po.pos.x,0.2,po.pos.z),COL.p1,0.5,8,0.9,0.08);k5Ring(new V3(pe.pos.x,0.2,pe.pos.z),COL.p2,0.5,8,0.9,0.08);SFX.call&&SFX.call();L.emo(po,'hop');L.emo(pe,'hop');}],
        [6.2,()=>{crack.visible=true;crack.position.set(0,1.4,-8);k5s('reveal');const fx=k5fx(5,()=>{crack.material.opacity=0.6+0.4*Math.sin(G.time*10);},()=>{crack.visible=false;});L.on(()=>{fx.t=fx.dur;crack.visible=false;});}],
        [7.4,()=>{L.walk(po,-1.4,-8,0.8);L.walk(pe,1.4,-8,0.8);}],[9.2,()=>{L.hit(po,crack.position);L.hit(pe,crack.position);FX.sparks(crack.position.clone(),12,0xffd76a);}],
        [9.7,()=>{k5s('shatter');shakeAll(0.08,0.5);K5L.ink(crack.position.clone(),30);K5L.gold(crack.position.clone(),24);crack.visible=false;anim(0.8,k=>{WALL.userData.m.material.opacity=0.92*(1-k);WALL.scale.y=1-k*0.5;});satur(1);nameSp.forEach((N,i)=>{N.draw(true);const f=N.sp.position.clone();const hh=[po,pe][i%2];anim(1.0,k=>{N.sp.position.lerpVectors(f,hh.pos.clone().add(new V3(0,2.4,0)),CE.inOutSine(k));N.sp.material.opacity=0.95*(1-k*0.9);});});sheets.forEach(S0=>{S0.m.visible=false;});}]]});
    // приёмы сказок и замершие друзья
    L.beat(11,{cam:[[-2,9,0],[-4,1.8,-12]],need:[H(-2,-9),[-8.4,2,-8.6],[0,2.4,-15]],says:[['zven','Кощей берёт приёмы четырёх сказок — вот Путаник: ёлки смыкаются!',0.2,4.4],['zven','Беги к замершему другу той сказки и держите щит '+kbd('guard')+' вместе —',4.8,3.6],['zven','друг вспомнит себя и вернёт приём Кощею!',8.6,2.2]],
      ev:[[0,()=>{L.put(po,-2.4,-6);L.put(pe,2.4,-6);pips.g.visible=true;KS.g.position.set(0,0,-15);memMods[0].g.visible=true;memMods[0].g.position.copy(MEM[0].p);fog[0].visible=true;fog[0].position.copy(MEM[0].p).add(new V3(0,1.6,0));}],[0.6,()=>{L.pose('castR',{antic:0.25});k5s('cast');const gs=[];for(const s of[-1,1])for(let j=0;j<5;j++){const g=L.add(new THREE.Group());const m=M(0x1e1a2a,{emissive:0x2a1048,emissiveIntensity:0.4});addMesh(new THREE.CylinderGeometry(0.15,0.2,1,6),M(0x3a2a1a),0,0.5,0,g);for(let q=0;q<3;q++)addMesh(new THREE.ConeGeometry(1-q*0.25,1.3,7),m,0,1+q*0.75,0,g);g.position.set(C.x+s*11,0,C.z-8+j*4);gs.push([g,s]);}
          const fx=k5fx(8,(k,dt)=>{const kk=k*8;gs.forEach(([g,s])=>{if(g.visible===false)return;if(kk<5.4){g.position.x+= (s*3.2-(g.position.x-C.x))*dt*0.4;g.rotation.z=Math.sin(G.time*10)*0.03;}});},()=>{});L.on(()=>{fx.t=fx.dur;});L.later(5.6,()=>{gs.forEach(([g])=>{const f=g.position.clone(),to=KS.g.position.clone().add(new V3(rand(-1.5,1.5),0,rand(-1.5,1.5)));anim(0.7,k=>{g.position.lerpVectors(f,to,k);});L.later(0.75,()=>{g.visible=false;});});});}],
        [2.2,()=>{L.walk(po,MEM[0].p.x+1.0,MEM[0].p.z+1.2,1.6);L.walk(pe,MEM[0].p.x+2.0,MEM[0].p.z+0.4,1.6);}],[4.6,()=>{L.look(po,MEM[0].p);L.look(pe,MEM[0].p);L.guard(po,2.2);L.guard(pe,2.2);}],
        [5.6,()=>{const M0=MEM[0],p=M0.p.clone().add(new V3(0,2.4,0));fog[0].visible=false;K5L.gold(p,24);k5Pillar(M0.p.clone(),0xffd76a,6,0.6,1);npcEm(memMods[0],'cheer')();SFX.ok();}],[7.4,()=>{L.pose('recoil',{snap:true});pips.out();pips.out();FX.sparks(kc(),14,0xffd76a);}]]});
    // все сказки разом
    L.beat(10,{cam:[[0,10,-1],[0,1.6,-14]],need:[H(-2,-10),H(2,-10),[0,2,-14]],says:[['zven','Все четыре — и «Все сказки разом»: ёлки, свист и огненные лучи.',0.2,4.2],['zven','Держи щит и продержись девять секунд —',4.6,2.8],['zven','потом Кощей выдохнется: бейте!',7.6,2.2]],
      ev:[[0,()=>{L.put(po,-2,-10);L.put(pe,2,-10);memMods.forEach(m=>{if(m&&m.g)m.g.visible=true;});KS.g.position.set(0,0,-14);KS.g.rotation.y=0;pips.g.visible=true;}],[0.4,()=>{L.pose('castR',{antic:0.25});k5s('ult');shakeAll(0.1,0.6);K5X.screen('#3a1a5a',0.35,0.6);const bs=[0,1].map(()=>{const m=L.add(new THREE.Mesh(new THREE.BoxGeometry(0.9,0.5,10),k5Add(0xff7a20,{opacity:0.75})));return m;});
          const fx=k5fx(7,(k,dt)=>{const a=k*7*0.6,kp=KS.g.position;bs.forEach((m,q)=>{const aa=a+q*Math.PI;m.position.set(kp.x+Math.sin(aa)*5.4,0.5,kp.z+Math.cos(aa)*5.4);m.rotation.y=aa;});},()=>{bs.forEach(k5Del);});L.on(()=>{fx.t=fx.dur;});}],
        [1.2,()=>{L.guard(po,3);L.guard(pe,3);}],[1.5,()=>{for(let q=0;q<3;q++)L.later(q*0.1+0.01,()=>k5Ring(new V3(0,1.4,-14),0xfff4d0,0.6,13,0.8,0.05,new THREE.Euler(Math.PI/2,0,0)));k5s('gale');}],[3.6,()=>{for(let q=0;q<3;q++)L.later(q*0.1+0.01,()=>k5Ring(new V3(0,1.4,-14),0xfff4d0,0.6,13,0.8,0.05,new THREE.Euler(Math.PI/2,0,0)));k5s('gale');}],
        [7.4,()=>{L.pose('slump');L.dizzy(2.6);}],[8.2,()=>{L.hit(po,KS.g.position);L.hit(pe,KS.g.position);pips.all();}],[8.8,()=>{SFX.mah();L.bind();}]]});
  };
