// ---- продолжение build5B2 (k5epic, часть 16): СТАДИЯ 12, «ТЯНЕМ-ПОТЯНЕМ», ПРОЛОГ-ПОГОНЯ, тексты паузы ----
  /* ================= стадия 12 «Златая цепь на дубе том»: прежняя игла + кузнецы, Векша, Курочка Ряба ================= */
  // Застёжку из иглы куют в такт у наковальни (как прежде), Кузьма и Демьян рядом. Векша бросает орешки — Кощей на миг замирает;
  // Курочка Ряба катит золотое яичко тому, у кого остался один лепесток.
  const dem12=makeSmith('demyan',false);dem12.g.visible=false;K5L.noRay(dem12.g);
  const ryaba=(()=>{const g=k5Prop(new THREE.Group());addMesh(new THREE.SphereGeometry(0.42,10,8),M(0xf4f0e8),0,0.5,0,g);addMesh(new THREE.SphereGeometry(0.24,8,6),M(0xf4f0e8),0,0.95,0.28,g);addMesh(new THREE.ConeGeometry(0.08,0.2,5),M(0xf0a020),0,0.95,0.55,g).rotation.x=Math.PI/2;
    addMesh(new THREE.BoxGeometry(0.06,0.18,0.2),M(0xd82a2a),0,1.2,0.28,g);g.visible=false;K5L.noRay(g);return {g};})();
  // Глубже: дуб — живой счётчик ковки: каждый верный удар — золотое звено летит к дубу и вплетается в цепь на стволе, дуб зеленеет.
  // Кот учёный ходит по цепи кругом: идёт направо — песнь заводит (у наковальни золотой круг — такт шире), налево — сказку говорит
  // (Кощей заслушался — 3 с стоит, бить можно больше). Кощей пишет «Чёрным пером»: лиловая черта по земле, через 1,6 с — чернильная
  // стена на 2,5 с. Атлас: progress-visual, ally buffs (окно такта, оглушение), delayed-activation line + lingering wall. Бот — tk5e_s12.
  const oakRing=k5Prop(new THREE.Group());oakRing.visible=false;const OAKL=[];{const gm=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6}),lg=new THREE.TorusGeometry(0.32,0.08,6,12);
    for(let i=0;i<24;i++){const a=i/24*Math.PI*2*3,y=4+i*0.32,r=2.75-i*0.012;const m=new THREE.Mesh(lg,gm);m.position.set(OAK.x+Math.cos(a)*r,y,OAK.z+Math.sin(a)*r);m.rotation.set(Math.PI/2,a,i%2?Math.PI/2:0);m.visible=false;oakRing.add(m);OAKL.push(m);}}
  K5L.noRay(oakRing);
  const songR=k5Prop(new THREE.Mesh(new THREE.RingGeometry(2.4,2.7,40),k5Add(0xffd76a,{opacity:0})));songR.rotation.x=-Math.PI/2;songR.raycast=()=>{};
  function linkFly(n){const m=OAKL[Math.min(OAKL.length-1,n-1)];if(!m)return;const to=m.position.clone();const f=ANV.clone().add(new V3(0,1.4,0));const L=k5Prop(new THREE.Mesh(new THREE.TorusGeometry(0.32,0.08,6,12),M(COL.gold,{emissive:0xffa020,emissiveIntensity:1})));
    k5fx(0.9,k=>{L.position.lerpVectors(f,to,CE.inOutSine(k));L.position.y+=Math.sin(k*Math.PI)*3;L.rotation.x+=0.3;},()=>{k5Del(L);for(let i=0;i<Math.max(1,Math.round(OAKL.length/((K5.forge&&K5.forge.need)||12)));i++){const q=OAKL[ES.linkN++];if(q)q.visible=true;}K5L.gold(to,8);
      E.oakGreen(Math.min(0.9,0.2+0.7*(K5.forge?K5.forge.n/Math.max(1,K5.forge.need):0)),true);});E.log('link');}
  function penLine(){const hs=k5Heroes();if(!hs.length)return;const h=hs[Math.floor(rand(0,hs.length))];const a=rand(0,Math.PI);const d=new V3(Math.cos(a),0,Math.sin(a));const c=new V3(h.pos.x,0.07,h.pos.z);
    const A0=c.clone().addScaledVector(d,-7),B0=c.clone().addScaledVector(d,7);const ln=k5Prop(new THREE.Mesh(new THREE.PlaneGeometry(0.35,14),k5Add(0x9a50ff,{opacity:0.2})));ln.rotation.x=-Math.PI/2;ln.rotation.z=-a+Math.PI/2;ln.position.copy(c);ln.raycast=()=>{};
    try{KA.pose('cast',{snap:true});later(0.4,()=>KA.reset());}catch(e){}k5s('magic');ES.pens.push({ln,c,d,t:0,wall:null,hit:new Set()});E.log('pen');}
  function penTick(dt){for(const P of ES.pens.slice()){P.t+=dt;if(P.t<1.6){P.ln.material.opacity=0.2+0.6*(P.t/1.6)*(0.6+0.4*Math.sin(G.time*18));continue;}
      if(!P.wall){P.wall=k5Prop(new THREE.Mesh(new THREE.BoxGeometry(0.5,2.2,14),M(0x140a20,{emissive:0x4a1a7a,emissiveIntensity:0.6,transparent:true,opacity:0.9})));P.wall.position.copy(P.c).setY(1.1);P.wall.rotation.y=Math.atan2(P.d.x,P.d.z);
        P.ln.material.opacity=0.8;K5L.ink(P.c.clone().add(new V3(0,1,0)),20);shakeAll(0.05,0.25);k5s('crack');}
      for(const h of k5Heroes()){if(P.hit.has(h))continue;const v=h.pos.clone().sub(P.c);v.y=0;const along=v.dot(P.d),side=Math.abs(v.x*P.d.z-v.z*P.d.x);if(Math.abs(along)<7&&side<0.6&&h.pos.y<2.2&&h.rollT<=0){P.hit.add(h);k5Hurt(h,P.c);}}
      if(P.t>4.1){k5Del(P.wall);k5Del(P.ln);ES.pens.splice(ES.pens.indexOf(P),1);}}}
  function kotTick(dt){if(!kot||!kot.g)return;ES.kotA+=dt*0.35;const a=ES.kotA,r=3.0;kot.g.position.set(OAK.x+Math.cos(a)*r,5.6,OAK.z+Math.sin(a)*r);kot.g.rotation.y=-a;
    const right=Math.sin(a)>0;if(right!==ES.kotRight){ES.kotRight=right;if(right){ES.song=5;W.ladBonus=0.12;songR.material.opacity=0.8;barkS(kot,'kot','Иду направо — песнь завожу!',2,true);E.log('song');}
      else{ES.tale=3;K5.listen=true;if(K5.live&&KB.state!=='broken')KB.dazeT=Math.max(KB.dazeT||0,3);barkS(kot,'kot','Иду налево — сказку говорю… Кощей, слушай!',2,true);E.log('tale');}}
    if(ES.song>0){ES.song-=dt;songR.position.set(ANV.x,0.08,ANV.z);songR.scale.setScalar(1+0.06*Math.sin(G.time*6));if(Math.random()<dt*5)FX.sparkle(ANV.clone().add(new V3(rand(-2,2),rand(1,3),rand(-2,2))),1,0xffd76a);if(ES.song<=0){W.ladBonus=0;songR.material.opacity=0;}}
    if(ES.tale>0){ES.tale-=dt;if(Math.random()<dt*4)FX.sparkle(KS.g.position.clone().add(new V3(rand(-1,1),3,rand(-1,1))),1,0xfff4c0);if(ES.tale<=0)K5.listen=false;}}
  E.layer[12]={start(){dem12.g.visible=true;dem12.g.position.set(ANV.x-2.2,0,ANV.z-1.2);dem12.g.rotation.y=0.6;kuzma.g.position.set(ANV.x+2.2,0,ANV.z-1.0);kuzma.g.rotation.y=-0.6;
      ryaba.g.visible=true;ryaba.g.position.set(-10,0,-8);belka.g.position.set(10.5,0,-7.5);ES.nutT=9;ES.eggT=0;oakRing.visible=true;OAKL.forEach(m=>{m.visible=false;});Object.assign(ES,{linkN:0,fN:0,pens:[],penT:8,kotA:Math.PI*0.5,kotRight:null,song:0,tale:0});ES.kot0=kot&&kot.g?{p:kot.g.position.clone(),r:kot.g.rotation.y}:null;K5X.motes('gold',new V3(C.x,0,C.z),13,120,7);K5X.rays(new V3(C.x,0,C.z-6),0xffd8a0,5,{spread:12,op:0.2});
      },
    tick(dt){if(!K5.fight)return;kotTick(dt);penTick(dt);if(K5.forge&&K5.forge.n>ES.fN){for(let n=ES.fN+1;n<=K5.forge.n;n++)linkFly(n);ES.fN=K5.forge.n;}
      if(K5.live&&KB.state!=='broken'){ES.penT-=dt;if(ES.penT<=0){ES.penT=G.solo?9:6.5;penLine();}}
      ES.nutT-=dt;ryaba.g.rotation.y=Math.sin(G.time*2)*0.4;
      if(ES.nutT<=0&&K5.live&&KB.state!=='broken'){ES.nutT=G.solo?10:13;const f=belka.g.position.clone().add(new V3(0,1.4,0)),to=KS.g.position.clone().add(new V3(0,2.4,0));const n=k5Prop(new THREE.Mesh(new THREE.SphereGeometry(0.2,8,6),M(0x7ad06a,{emissive:0x2a8a30})));
        k5fx(0.8,k=>{n.position.lerpVectors(f,to,k);n.position.y+=Math.sin(k*Math.PI)*3;},()=>{k5Del(n);KB.dazeT=Math.max(KB.dazeT||0,1.6);K5L.gold(to,10);floatText(to.clone().add(new V3(0,1,0)),'Орешек-изумруд!','#9fe0a0');});E.log('nut');}
      ES.eggT-=dt;if(ES.eggT<=0)for(const pi of[0,1]){const p=players[pi];if(p.downed||p.petals>1)continue;const h=active(pi);ES.eggT=25;const e=k5Prop(new THREE.Mesh(new THREE.SphereGeometry(0.3,10,8),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.7})));e.scale.set(1,1.3,1);
        const f=ryaba.g.position.clone().add(new V3(0,0.4,0));k5fx(1.0,k=>{e.position.lerpVectors(f,h.pos.clone().add(new V3(0,0.4,0)),k);e.rotation.z+=0.3;},()=>{k5Del(e);p.petals=Math.min(3,p.petals+1);K5L.gold(h.pos.clone().add(new V3(0,1,0)),12);floatText(h.pos.clone().add(new V3(0,2,0)),'Золотое яичко! +лепесток','#ffe08a');});
        barkS(ryaba,'ryaba','Ко-ко! Держи яичко — не простое, золотое!',1.8,true);E.log('egg');break;}},
    end(){W.ladBonus=0;K5.listen=false;songR.material.opacity=0;oakRing.visible=false;(ES.pens||[]).forEach(P=>{k5Del(P.ln);if(P.wall)k5Del(P.wall);});ES.pens=[];if(ES.kot0&&kot&&kot.g){kot.g.position.copy(ES.kot0.p);kot.g.rotation.y=ES.kot0.r;}}};
  E.layer[12].bot={pen:()=>penLine(),pens:()=>ES.pens,links:()=>OAKL.filter(m=>m.visible).length,kot:()=>({song:ES.song,tale:ES.tale,a:ES.kotA}),turnKot:a=>{ES.kotA=a;}};
  /* ---------- обучающая катсцена стадии 12: игла и ковка в такт, звенья на дуб, Кот-песнь и сказка, «Чёрное перо», друзья, все цепи ---------- */
  E.LES[12]=L=>{const po=T.potap,pr=T.proshka,pe=T.pelageya,yo=T.yosha,H=(x,z)=>[x,0.9,z],AN=ANV.clone(),pips=L.pips(5);pips.g.visible=false;const lv0=leaves.filter(l=>l.visible).length;
    L.on(()=>{leaves.forEach((l,i)=>{if(i>=lv0&&l.visible){l.visible=false;l.scale.setScalar(0.01);}});OAKL.forEach(m=>{m.visible=false;});ES.linkN=0;fring.visible=false;songR.material.opacity=0;W.ladBonus=0;K5.listen=false;K5WIND.k=0;if(K5WIND.mesh)K5WIND.mesh.visible=false;if(kot&&kot.g&&ES.kot0){kot.g.position.copy(ES.kot0.p);kot.g.rotation.y=ES.kot0.r;}});
    L.put(po,-4,-12);L.put(pr,AN.x-1.4,AN.z+1.6,Math.PI);L.put(pe,3.4,-16);L.put(yo,2,-12);KS.g.visible=true;KS.g.position.set(C.x,3.2,C.z-6);
    L.beat(7,{cam:[[0,11,2],[3,1.8,-19],[3,9,0],[3,2,-20]],need:[[AN.x,1,AN.z],[0,6,-28]],says:[['zven','Кощея силой не сломить — его можно расковать.',0.2,3.4],['zven','Из иглы Прошка куёт застёжку у наковальни.',3.8,3.0]],ev:[[1.0,()=>{L.emo(pr,'effort');}],[3.5,()=>{k5Flash(AN.clone().add(new V3(0,1.4,0)),0xffd76a,3,0.5);}]]});
    // игла и ковка
    L.beat(11,{cam:[[AN.x-1,5,-12],[AN.x,1.4,AN.z]],need:[[AN.x,1.4,AN.z],H(AN.x-1.4,AN.z+1.6)],says:[['zven','Иглу несёт герой со свечением — передай другу '+kbd('item')+',',0.2,3.8],['zven','Прошка с иглой у наковальни: бей '+kbd('attack')+' в такт!',4.2,3.6],['zven','Каждый верный удар — золотое звено на дуб.',8.2,2.6]],
      ev:[[0,()=>{L.put(pe,AN.x-3.4,AN.z+4.6);L.put(pr,AN.x-1.4,AN.z+1.6,Math.PI);const nd=makeNeedle(0.9);L.add(nd.g);const g=nd.g;const hold=k5fx(5,()=>{g.position.copy(pe.pos).add(new V3(0.3,pe.d.height*0.9,0.2));},()=>{});L.on(()=>{hold.t=hold.dur;});L.later(2.4,()=>{hold.t=hold.dur;const f=g.position.clone(),to=pr.pos.clone().add(new V3(0.3,pr.d.height*0.9,0.2));anim(0.8,k=>{g.position.lerpVectors(f,to,k);g.position.y+=Math.sin(k*Math.PI)*1.2;if(k>=1){const h2=k5fx(9,()=>{g.position.copy(pr.pos).add(new V3(0.3,pr.d.height*0.9,0.2));},()=>{});L.on(()=>{h2.t=h2.dur;});SFX.ok();}});});}],
        [3.6,()=>{fring.visible=true;fring.position.set(AN.x,1.35,AN.z);const fx=k5fx(6,(k)=>{const u=((k*6)%0.75)/0.75;fring.scale.setScalar(lerp(2.6,0.6,u));},()=>{fring.visible=false;});L.on(()=>{fx.t=fx.dur;fring.visible=false;});}],
        ...[4.35,5.1,5.85,6.6,7.35].map((t,i)=>[t,()=>{L.hit(pr,AN);FX.sparks(AN.clone().add(new V3(0,1.3,0)),18,0xffd060);if(SFX.hammer)SFX.hammer();else SFX.clink();linkFly(i+1);}])]});
    // Кот: песня и сказка
    L.beat(8.4,{cam:[[-4,5,-13],[1,3.4,-24]],need:[[0,5,-25],[AN.x,1,AN.z]],says:[['zven','Кот ходит по цепи на дубе. Направо — песнь:',0.2,3.4],['zven','у наковальни золотой круг — такт шире. Налево — сказка:',3.8,3.4],['zven','Кощей заслушался — бейте!',7.2,1.2]],
      ev:[[0,()=>{L.put(pr,AN.x-1.4,AN.z+1.6,Math.PI);if(kot&&kot.g)kot.g.position.set(OAK.x+Math.cos(1.6)*3,5.6,OAK.z+Math.sin(1.6)*3);}],[0.5,()=>{const fx=k5fx(8,(k)=>{const a=1.6-k*3.2;if(kot&&kot.g){kot.g.position.set(OAK.x+Math.cos(a)*3.0,5.6,OAK.z+Math.sin(a)*3.0);kot.g.rotation.y=-a;}},()=>{});L.on(()=>{fx.t=fx.dur;});}],
        [1.4,()=>{songR.material.opacity=0.8;songR.position.set(AN.x,0.08,AN.z);const fx=k5fx(3,()=>{songR.scale.setScalar(1+0.06*Math.sin(G.time*6));if(Math.random()<0.1)FX.sparkle(AN.clone().add(new V3(rand(-2,2),rand(1,3),rand(-2,2))),1,0xffd76a);},()=>{songR.material.opacity=0;});L.on(()=>{fx.t=fx.dur;songR.material.opacity=0;});}],
        ...[1.6,2.2,2.8].map(t=>[t,()=>{L.hit(pr,AN);FX.sparks(AN.clone().add(new V3(0,1.3,0)),12,0xffd060);SFX.clink();}]),
        [4.6,()=>{K5.listen=true;L.pose('listen');const fx=k5fx(3,()=>{if(Math.random()<0.15)FX.sparkle(KS.g.position.clone().add(new V3(rand(-1,1),3,rand(-1,1))),1,0xfff4c0);},()=>{K5.listen=false;});L.on(()=>{fx.t=fx.dur;K5.listen=false;});}],[6.2,()=>{pips.g.visible=true;L.hit(po,KS.g.position);pips.out();}]]});
    // Чёрное перо
    L.beat(6.6,{cam:[[0,8,-5],[0,0.5,-14]],need:[H(0,-11)],says:[['zven','Лиловая черта по земле — «Чёрное перо»:',0.2,3.2],['zven','сейчас встанет стена — уйди с черты!',3.6,2.6]],
      ev:[[0,()=>{pips.g.visible=false;L.put(po,0,-11);L.pose('idle');}],[0.4,()=>{L.pose('cast',{antic:0.2});k5s('magic');const a=0.5,d=new V3(Math.cos(a),0,Math.sin(a)),c=new V3(0,0.07,-11);const ln=L.add(new THREE.Mesh(new THREE.PlaneGeometry(0.35,14),k5Add(0x9a50ff,{opacity:0.2})));ln.rotation.x=-Math.PI/2;ln.rotation.z=-a+Math.PI/2;ln.position.copy(c);
          const fx=k5fx(1.6,k=>{ln.material.opacity=0.2+0.6*k*(0.6+0.4*Math.sin(G.time*18));},()=>{const w=L.add(new THREE.Mesh(new THREE.BoxGeometry(0.5,2.2,14),M(0x140a20,{emissive:0x4a1a7a,emissiveIntensity:0.6,transparent:true,opacity:0.9})));w.position.copy(c).setY(1.1);w.rotation.y=Math.atan2(d.x,d.z);K5L.ink(c.clone().add(new V3(0,1,0)),20);shakeAll(0.05,0.25);k5s('crack');L.later(2.6,()=>{k5Del(w);k5Del(ln);});});}],[1.4,()=>L.roll(po,-2.4,2.4,0.4)],[3.2,()=>L.ok(po)]]});
    // друзья-помощники
    L.beat(6.4,{cam:[[0,9,8],[0,1.2,-8]],need:[[10.5,1.2,-7.5],[-10,1,-8]],says:[['zven','Белка бросает орешек — Кощей замирает.',0.2,2.8],['zven','Курочка Ряба катит золотое яичко — лепесток!',3.2,3.0]],
      ev:[[0,()=>{L.put(po,1,-10);L.pose('idle');ryaba.g.visible=true;ryaba.g.position.set(-10,0,-8);belka.g.position.set(10.5,0,-7.5);}],[0.6,()=>{const f=belka.g.position.clone().add(new V3(0,1.4,0)),to=KS.g.position.clone().add(new V3(0,2.4,0));const n=L.add(new THREE.Mesh(new THREE.SphereGeometry(0.2,8,6),M(0x7ad06a,{emissive:0x2a8a30})));anim(0.9,k=>{n.position.lerpVectors(f,to,k);n.position.y+=Math.sin(k*Math.PI)*3;if(k>=1){k5Del(n);K5L.gold(to,10);L.pose('listen');}});}],
        [3.4,()=>{const e=L.add(new THREE.Mesh(new THREE.SphereGeometry(0.3,10,8),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.7})));e.scale.set(1,1.3,1);const f=ryaba.g.position.clone().add(new V3(0,0.4,0));anim(1.4,k=>{e.position.lerpVectors(f,po.pos.clone().add(new V3(0,0.4,0)),k);e.rotation.z+=0.3;if(k>=1){k5Del(e);K5L.gold(po.pos.clone().add(new V3(0,1,0)),12);SFX.ok();L.emo(po,'cheer');}});}]]});
    // все цепи — ко мне
    L.beat(12,{cam:[[AN.x-8,5.5,-10],[AN.x,1.6,AN.z]],need:[H(AN.x-1.8,AN.z+1.6),[AN.x,2,AN.z]],says:[['zven','Щит держи — и ветер не снесёт!<br>Цепи бейте — Прошка дальше скуёт!',0.2,5.5],['zven','Все три цепи разбиты — Кощей без сил.',6.2,3.0]],
      ev:[[0,()=>{L.put(po,AN.x-2.6,AN.z+2.4);L.put(pe,AN.x+0.4,AN.z+2.6);L.put(pr,AN.x-1.0,AN.z+1.2,Math.PI);L.pose('cast',{antic:0.3});}],[0.4,()=>{k5s('quake');shakeAll(0.12,0.6);k5Flash(AN.clone().add(new V3(0,1.5,0)),0x9a70ff,5,0.6);
          const cs=[0,1,2].map(i=>{const g=L.add(new THREE.Group());const m=M(0x2a1a34,{emissive:0x5a2a9a,emissiveIntensity:0.5});for(let j=0;j<8;j++){const l=new THREE.Mesh(new THREE.TorusGeometry(0.32,0.09,6,12),m);l.position.y=0.3+j*0.5;l.rotation.set(j%2?Math.PI/2:0,0,0);g.add(l);}const a=i/3*Math.PI*2+0.5;g.position.set(AN.x+Math.cos(a)*3.6,-3,AN.z+Math.sin(a)*3.6);return g;});
          cs.forEach((g,i)=>anim(0.6,k=>{g.position.y=-3*(1-CE.outBack(k));}));L.on(()=>{});L.cs=cs;
          const fx=k5fx(10,(k,dt)=>{K5WIND.mode='rad';K5WIND.c.copy(AN);K5WIND.k=0.9*(k*10<0.8?k*10/0.8:k*10>5?Math.max(0,1-(k*10-5)/0.8):1);k5WindTick(dt,C);},()=>{K5WIND.k=0;});L.on(()=>{fx.t=fx.dur;});L.guard(po,5);L.guard(pe,5);}],
        [2.4,()=>L.hand(new V3(AN.x-1.4,0,AN.z+4.4),1.0)],
        [4.6,()=>{L.walk(po,AN.x+0.6,AN.z+3.2,0.8);}],...[5.6,6.2,6.8].map((t,i)=>[t,()=>{const g=L.cs&&L.cs[i];if(g){L.hit(i%2?pe:po,g.position);K5L.gold(g.position.clone().add(new V3(0,1.6,0)),12);SFX.clink();anim(0.5,k=>{g.scale.setScalar(Math.max(0.01,1-k));});}}]),
        [8.6,()=>{L.pose('slump');pips.g.visible=true;pips.all();L.dizzy(3);L.bind();}]]});
  };
  /* ================= «Тянем-потянем»: последняя чёрная цепь вросла в корни дуба ================= */
  // Встают все, как в «Репке»: Дедка за цепь, Яга за Дедку, Пелагея за Ягу, Потап за Пелагею, Кот за Потапа — и мышка Йоша последней.
  // Прошка считает: «Раз — два — ТЯНИ!» — оба удар в такт; Кощей дёргает — оба щит. Последний рывок — самый маленький: Йоша.
  E.repka=done=>{K5.fight=false;ES.fight=false;if(E.clock)E.clock.off();E.log('repka');const root=new V3(OAK.x,0.6,OAK.z+3.2),endP=new V3(C.x,1.0,C.z+2);
    KS.g.visible=true;KS.g.position.set(OAK.x+1.6,0,OAK.z+4.2);KS.g.rotation.y=Math.PI*0.8;sword.visible=false;try{KA.pose('threat');}catch(e){}
    let ch=chainLine(root,endP,0x1a1020);const team=[['ded',ded],['yaga',FR.yaga.m],['pelageya',T.pelageya],['potap',T.potap],['kot',kot],['yosha',T.yosha]];
    k5force(0,'potap');k5force(1,'yosha');if(G.solo)k5force(0,'yosha');
    const slot=i=>new V3(lerp(root.x,endP.x,0.18+i*0.15),0,lerp(root.z,endP.z,0.18+i*0.15)+0.0);
    team.forEach(([k,o],i)=>{const g=o.g||o;const s=slot(i);if(o.pos){placeOnGround(o,s.x+0.5,s.z,0);o.face=Math.PI;}else{g.position.set(s.x+0.5,0,s.z);g.rotation.y=Math.PI;}});
    placeOnGround(T.proshka,endP.x+2.6,endP.z+1.6,0);T.proshka.face=-Math.PI/2;
    const R0={k:0,beat:0,t:0,pull:[-9,-9],surge:null,surgeT:6,last:false,done:false};ES.rp=R0;ES.prog=0.95;
    // по отзыву «механика невнятная»: ритм виден — кольцо сходится к центру и вспыхивает зелёным на «ТЯНИ!»; над героями в этот миг —
    // кнопка удара и значок «тянем»; рывок Кощея — значок щита; ряд из шести звеньев над корнями — сколько уже вытянули
    const per0=0.7,nextPull=t=>{const bar=per0*4;const n=Math.round((t-per0*3)/bar);return per0*3+n*bar;};R0.next=nextPull;R0.per=per0;
    const tgtR=k5Prop(new THREE.Mesh(new THREE.RingGeometry(0.75,1.0,40),k5Add(0x9ff0a8,{opacity:0.9})));tgtR.rotation.x=-Math.PI/2;tgtR.position.copy(endP).setY(0.11);
    R0.vis=[tgtR];
    const beatR=k5Prop(new THREE.Mesh(new THREE.RingGeometry(0.9,1.05,40),k5Add(0xffd76a,{opacity:0.9})));beatR.rotation.x=-Math.PI/2;
    K5L.music('gold',E.freeCount());
    // обучающая катсцена «Тянем-потянем»: ряд друзей, счёт «раз-два-и-ТЯНИ», рывок Кощея, последний рывок мышки
    E.LES.repka=L=>{const pro=T.proshka,po=T.potap,pe=T.pelageya,yo=T.yosha,tm=()=>team.map(([k,o])=>(o.g||o).position.clone());
      const pose0=team.map(([k,o])=>({o,p:(o.pos||o.g.position).clone()}));
      L.on(()=>{pose0.forEach(s=>{if(s.o.pos){s.o.pos.copy(s.p);}else s.o.g.position.copy(s.p);const g=s.o.g||s.o;g.rotation.x=0;});});
      const lean=(k)=>team.forEach(([kk,o],i)=>{const g=o.g||o;const s=slot(i);const f=o.pos||g.position;f.x=s.x+0.5;f.z=s.z+k*1.0;g.rotation.x=-0.35*Math.min(1,k);});
      const pull=(t0,n)=>[[t0,()=>{AUD.ready()&&AUD.osc({f0:880,d:0.05,v:0.02});}],[t0+0.7,()=>{AUD.ready()&&AUD.osc({f0:880,d:0.05,v:0.02});}],[t0+1.4,()=>{AUD.ready()&&AUD.osc({f0:880,d:0.05,v:0.02});}],
        [t0+2.1,()=>{AUD.ready()&&AUD.bell(523,{v:0.08,d:0.8});L.hit(po,root);L.hit(pe,root);k5s('pSoft');FX.dust(root.clone(),10,0x5a4a3a);anim(0.8,k=>lean(n*0.9+Math.sin(k*Math.PI)*0.4));}]];
      L.beat(7.4,{cam:[[root.x-9,5,root.z+6],[(root.x+endP.x)/2,1.4,(root.z+endP.z)/2]],need:[],says:[['zven','Последняя чёрная цепь вросла в корни дуба.',0.2,3.2],['zven','Тянем-потянем, как в «Репке»: все встали друг за дружкой!',3.6,3.6]],ev:[[0.5,()=>{L.thread(()=>root.clone().add(new V3(0,1,0)),()=>endP.clone().add(new V3(0,1,0)),6,0x1a1020);}]]});
      L.beat(11.4,{cam:[[endP.x+7,4.5,endP.z+3],[(root.x+endP.x)/2,1.5,(root.z+endP.z)/2]],need:[],says:[['zven','Прошка считает: раз — два — и — ТЯНИ!',0.2,3.2],['zven','На «ТЯНИ!» оба — удар '+kbd('attack')+' разом, в такт.',3.6,3.6],['zven','Тянем-потянем — и цепь ползёт!',7.6,3.0]],
        ev:[[0.2,()=>{pro.pos.set(endP.x+2.6,pro.pos.y,endP.z+1.6);L.look(pro,root);}],[0.4,()=>{L.later(0.01,()=>{});}],...pull(1.0,1),...pull(5.4,2)]});
      L.beat(6.4,{cam:[[endP.x+6,4,endP.z+4],[(root.x+endP.x)/2,1.5,(root.z+endP.z)/2]],need:[],says:[['zven','Кощей дёрнет цепь — оба щит '+kbd('guard')+'!',0.2,3.0],['zven','Удержите — и ничего не потеряем.',3.2,2.8]],
        ev:[[0.2,()=>{L.pose('threat',{antic:0.2});KS.g.visible=true;KS.g.position.set(OAK.x+1.6,0,OAK.z+4.2);KS.g.rotation.y=Math.PI*0.8;k5s('crack');}],[1.4,()=>{L.guard(po,2);L.guard(pe,2);L.later(0.01,()=>{});k5Flash(root.clone().add(new V3(0,1,0)),0x9a50ff,4,0.4);}],[3.4,()=>{L.ok(po);L.ok(pe);}]]});
      L.beat(7.4,{cam:[[endP.x+8,5,endP.z+2],[(root.x+endP.x)/2,1.5,(root.z+endP.z)/2]],need:[],says:[['zven','Шесть рывков — и силы вышли. Последний — самый маленький:',0.2,3.6],['zven','мышка Йоша — один '+kbd('attack')+'!',3.9,2.6]],
        ev:[[0.6,()=>{L.walk(yo,yo.pos.x,yo.pos.z+1.2,0.5);}],[3.4,()=>{L.hit(yo,root);k5s('shatter');shakeAll(0.12,0.8);k5Flash(root.clone(),0xffe0a0,8,0.6);K5L.gold(root.clone().add(new V3(0,1,0)),40);}],[4.4,()=>{E.oakGreen(1,true);}]]});
    };
    const per=per0;const tickF=dt=>{if(R0.done||G.cine||E.cur!==12)return;R0.t+=dt;const nb=Math.floor(R0.t/per),ph=(R0.t%(per*4))/(per*4);beatR.position.copy(endP).setY(0.1);beatR.scale.setScalar(0.9+(1-ph)*3.2);
      const near=Math.abs(R0.t-nextPull(R0.t))<0.45;beatR.material.color.set(near?0x9ff0a8:0xffd76a);beatR.visible=false;tgtR.visible=false;tgtR.scale.setScalar(near?1.25+0.15*Math.sin(G.time*20):1);R0.near=near&&!R0.surge;
      if(nb!==R0.beat){R0.beat=nb;const pull=nb%4===3;if(AUD.ready())(pull?AUD.bell(523,{v:0.06,d:0.8}):AUD.osc({f0:880,d:0.05,v:0.02}));floatText(T.proshka.pos.clone().add(new V3(0,1.8,0)),pull?'ТЯНИ!':['раз','два','и…'][nb%4],pull?'#ffd76a':'#ffffff');if(pull)R0.pullAt=R0.t;}
      // все держат свои места
      R0.lean=Math.max(0,(R0.lean||0)-dt*2.2);const fwd=R0.surge?Math.min(0.6,R0.surge.t*0.6):0;
      team.forEach(([k,o],i)=>{const s=slot(i);const back=R0.k*1.4+R0.lean*0.5-fwd;if(o.pos){o.pos.x=s.x+0.5;o.pos.z=s.z+back;o.vel.set(0,0,0);o.face=Math.PI;}else{const g=o.g||o;g.position.set(s.x+0.5,0,s.z+back);g.rotation.x=-0.35*R0.lean+0.25*fwd;}});
      // рывок Кощея: щит обоих
      R0.surgeT-=dt;if(!R0.surge&&R0.surgeT<=0&&!R0.last){R0.surge={t:0};R0.surgeT=G.solo?7:5.5;barkS(KS,'koschei','Не отдам!',1,true);try{KA.pose('threat',{antic:0.2});}catch(e){}}
      if(R0.surge){R0.surge.t+=dt;const ok=G.solo?active(G.soloPi).guard:(active(0).guard&&active(1).guard);if(R0.surge.t>1.0){if(!ok&&R0.k>0){R0.k=Math.max(0,R0.k-1);floatText(endP.clone().add(new V3(0,2.4,0)),'Перетянул! Щиты!','#ff9ab8');shakeAll(0.06,0.3);}
          else if(ok)floatText(endP.clone().add(new V3(0,2.4,0)),'Удержали!','#9fe0ff');R0.surge=null;}else K5L.ink(root.clone().add(new V3(rand(-1,1),0.4,rand(-1,1))),1);}
      ES.prog=0.95;K5L.hud.show(12,0.7+0.3*R0.k/6,0,0,'тянем-потянем '+R0.k+' / 6');};
    E.lesson('repka',()=>{W.updates.push(tickF);});
    ES.repkaAtk=(h,pi)=>{if(R0.done||R0.surge)return;const np=nextPull(R0.t),win=Math.abs(R0.t-np)<0.45;R0.pullAt=np;
      if(R0.last){if(h.kind==='yosha'||G.solo){finish();}return;}
      if(!win){floatText(h.pos.clone().add(new V3(0,1.8,0)),'не в такт','#cccccc');return;}R0.pull[pi]=R0.t;const both=G.solo||Math.abs(R0.pull[0]-R0.pull[1])<0.6;
      if(both&&R0.lastPullAt!==np){R0.lastPullAt=np;R0.k++;R0.lean=1;k5s('pSoft');FX.dust(root.clone(),10,0x5a4a3a);floatText(endP.clone().add(new V3(0,2.6,0)),'Тянем-потянем! '+R0.k+' / 6','#ffe08a');E.log('pull');
        if(R0.k>=5){R0.last=true;say('pelageya','Вытянуть не можем… Позвали мышку!',3,true);}}};
    function finish(){R0.done=true;E.log('repkaDone');k5s('shatter');shakeAll(0.12,0.8);k5Flash(root.clone(),0xffe0a0,8,0.6);K5L.gold(root.clone().add(new V3(0,1,0)),40);k5Del(ch);ch=chainLine(root,endP,COL.gold);
      const i=W.updates.indexOf(tickF);if(i>=0)W.updates.splice(i,1);k5Del(beatR);(R0.vis||[]).forEach(o=>k5Del(o));try{KA.pose('slump');}catch(e){}const f=KS.g.position.clone();anim(0.8,k=>{KS.g.position.set(f.x,Math.sin(k*Math.PI)*1.2,f.z+k*1.5);});
      E.oakGreen(1,true);later(1.4,()=>{barkS(kot,'kot','…И там я был, и мёд я пил; у моря видел дуб зелёный…',4,true);});later(5.6,()=>{k5Del(ch);ES.repkaAtk=null;done();});}};
  // удар во время «Репки»
  {const _oa=W.onAttack;W.onAttack=(pi,h)=>{if(E.cur===12&&ES.repkaAtk){ES.repkaAtk(h,pi);return;}if(_oa)_oa(pi,h);};}
  /* ---------- тексты паузы по стадиям ---------- */
  E.PAUSE=[];for(let n=0;n<=12;n++)E.PAUSE[n]='<b>'+K5E.NAMES[n]+'</b><br><i>'+K5L.LINES[n]+'</i><br>Битва с Кощеем: двенадцать строк пролога — двенадцать стадий. Tab — панель стадий и оценок.';
