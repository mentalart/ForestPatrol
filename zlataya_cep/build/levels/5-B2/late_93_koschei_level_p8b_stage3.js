// ---- продолжение build5B2 (k5epic, часть 8b): СТАДИЯ 3 «ТАМ ЛЕС И ДОЛ ВИДЕНИЙ ПОЛНЫ» ----
  // Лукоморье в чернильном тумане: слои тумана, чернильные хлопья, деревья-видения проступают и тают, в тумане мигают глаза.
  // Кощей и трое мороков стоят на чернильных пнях. Настоящего выдают тень и пар изо рта (у мороков их нет), Совиный взор Пелагеи
  // и сказка Кота (заслушивается только он). Все четверо бросают чернильные капли: щит в последний миг — капля летит обратно;
  // вернулась в морока — он лопнул, в настоящего — Кощей сбит с пня. Настоящий пишет «Чёрное слово» (кольцо над ним заполняется):
  // не сбили — чернильный дождь (лужи) и густой туман. Сбить: капля обратно, подкидка Потапа, рогатка Прошки (сбивает слово),
  // кудель-рогатка. Сбитый — на земле: бейте; спесь — угольки; сбита — оба удар рядом (нить сказа).
  // Кикимора в цепи у края: веретено бросает нитки и замирает с золотым свечением — тогда бить (Потапу хватит одного удара; отбитая
  // нитка — тоже удар). Свободна — связывает героев золотой куделью (одному — себя с ним): нить режет мороков, натянутая — рогатка:
  // Кощей между вами — предмет, и летишь сквозь него. С половины спеси мороки сходят с пней и идут на героев, пни переставляются.
  // Атлас: decoy, secondary-cues, homing/single-shot + attack-reflection, interruptible-wind-up, lingering-hazard, entity-tether,
  // summon, recovery-window. Бот — tk5e_s3.
  const S3={};E.s3=S3;
  const S3_A=[[-6.5,-15],[6.5,-15],[-5,-7],[5,-7]],S3_B=[[-8.2,-11.5],[8.2,-11.5],[0,-17.6],[0,-6]],S3_KIKI=new V3(-9.4,0,-9.4),S3_SPIN=new V3(-7.9,0,-8.4);
  const S3_TIE=10.5,S3_TAUT=7;   // кудель: дальше не пустит; натянута — рогатка
  /* ---------- модели: мороки, пни, веретено, кудель ---------- */
  const s3D=[];for(let i=0;i<3;i++){const d=makeKoschei();d.g.scale.setScalar(0.9);d.g.visible=false;d.g.traverse(o=>{o.castShadow=false;});K5L.noRay(d.g);let a=null;try{a=k5Actor(d);}catch(e){}s3D.push({m:d,a});}
  const s3St=[0,1,2,3].map(()=>{const g=k5Prop(new THREE.Group());addMesh(new THREE.CylinderGeometry(1.0,1.35,1.6,12),K5L.INKM,0,0.8,0,g);
    for(let k=0;k<6;k++){const a=k/6*6.28,r=addMesh(new THREE.ConeGeometry(0.28,1.5,6),K5L.INKM,Math.cos(a)*1.3,0.25,Math.sin(a)*1.3,g);r.rotation.set(-Math.sin(a)*1.25,0,Math.cos(a)*1.25);}
    const rune=new THREE.Mesh(new THREE.RingGeometry(0.72,0.95,32),k5Add(0xa060ff,{opacity:0.8}));rune.rotation.x=-Math.PI/2;rune.position.y=1.63;g.add(rune);
    const sh=new THREE.Mesh(new THREE.CircleGeometry(0.62,24),new THREE.MeshBasicMaterial({color:0x0a0410,transparent:true,opacity:0,depthWrite:false}));sh.rotation.x=-Math.PI/2;sh.scale.set(1,0.7,1);sh.position.y=1.64;g.add(sh);
    const gl=k5Glow(0x8a40ff,3);gl.position.y=1.7;g.add(gl);g.visible=false;K5L.noRay(g);const c={x:0,z:0,r:1.3,miny:-1,maxy:1.6,on:false};W.cyls.push(c);return {g,c,rune,sh,gl,x:0,z:0};});
  const s3Spin=k5Prop(new THREE.Group());{const sp=new THREE.Group();s3Spin.add(sp);addMesh(new THREE.CylinderGeometry(0.16,0.16,1.5,10),M(0x6a4a2a),0,0,0,sp);for(const s of[-1,1]){const c=addMesh(new THREE.ConeGeometry(0.17,0.5,10),M(0x6a4a2a),0,s*1.0,0,sp);if(s<0)c.rotation.x=Math.PI;}
    addMesh(new THREE.SphereGeometry(0.45,12,10),M(0x2a2034,{emissive:0x3a1060,emissiveIntensity:0.6}),0,0,0,sp);sp.position.y=1.2;s3Spin.userData.sp=sp;
    const gl=k5Glow(0xffd76a,2.6);gl.position.y=1.2;gl.material.opacity=0;s3Spin.add(gl);s3Spin.userData.gl=gl;const ring=new THREE.Mesh(new THREE.RingGeometry(0.9,1.1,32),k5Add(0x9a50ff,{opacity:0.6}));ring.rotation.x=-Math.PI/2;ring.position.y=0.05;s3Spin.add(ring);s3Spin.userData.ring=ring;}
  s3Spin.visible=false;K5L.noRay(s3Spin);
  // кудель: 14 отрезков-нитей, провисает, натянутая — золотая
  const S3N=14,s3Tie=k5Prop(new THREE.Group());const s3TieM=new THREE.MeshBasicMaterial({color:0xfff0c0,transparent:true,opacity:0.95,toneMapped:false,fog:false});
  const s3Seg=[];for(let i=0;i<S3N;i++){const m=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,1,5,1,true),s3TieM);s3Tie.add(m);s3Seg.push(m);}const s3TieG=k5Glow(0xffd76a,0.9);s3Tie.add(s3TieG);s3Tie.visible=false;K5L.noRay(s3Tie);
  // видения: деревья-тени и глаза в тумане (по краю поляны)
  const s3Vis=k5Prop(new THREE.Group());const s3Ghost=[],s3Eyes=[];
  for(let i=0;i<16;i++){const a=Math.PI*(-0.62+i/15*1.24)+rand(-0.08,0.08),r=R+rand(3,10),g=new THREE.Group();g.position.set(C.x+Math.sin(a)*r,0,C.z-Math.cos(a)*r);const h=rand(7,12);
    const m=new THREE.MeshBasicMaterial({color:0x2a1840,transparent:true,opacity:0,depthWrite:false});for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(h*0.24-k*0.4,h*0.42,7),m);c.position.y=h*0.25+k*h*0.24;g.add(c);}
    const tr=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.3,h*0.3,6),m);tr.position.y=h*0.15;g.add(tr);s3Vis.add(g);s3Ghost.push({g,m,ph:rand(0,6.28),sp:rand(0.15,0.3)});}
  for(let i=0;i<10;i++){const a=Math.PI*(-0.55+i/9*1.1)+rand(-0.1,0.1),r=R+rand(5,9),g=new THREE.Group();g.position.set(C.x+Math.sin(a)*r,rand(1,3.2),C.z-Math.cos(a)*r);g.lookAt(C.x,1.5,C.z);
    for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(0.11,8,6),new THREE.MeshBasicMaterial({color:0xd0a0ff,transparent:true,opacity:0,fog:false,toneMapped:false}));e.position.x=s*0.22;e.scale.set(1,0.55,1);g.add(e);}
    s3Vis.add(g);s3Eyes.push({g,ph:rand(0,20),k:0});}
  s3Vis.visible=false;K5L.noRay(s3Vis);
  /* ---------- тела: настоящий и мороки ---------- */
  const s3Body=i=>i===ES.real?{m:KS,a:KA,real:true}:Object.assign({real:false},s3D[ES.map[i]]);
  const s3Pos=i=>s3Body(i).m.g.position;
  function s3Layout(L){L.forEach(([x,z],i)=>{const S=s3St[i];S.x=x;S.z=z;S.g.position.set(x,0,z);S.c.x=x;S.c.z=z;});}
  function s3Seat(){ES.map=[];let k=0;for(let i=0;i<4;i++){if(i===ES.real)continue;ES.map[i]=k++;}
    for(let i=0;i<4;i++){const B=s3Body(i),S=s3St[i];B.m.g.visible=!ES.gone[i];if((ES.walk&&!B.real)||(B.real&&ES.down))continue;B.m.g.position.set(S.x,1.6,S.z);B.m.g.rotation.set(0,Math.atan2(C.x-S.x,C.z-S.z),0);}}
  function s3Shuffle(){ES.real=Math.floor(rand(0,4));ES.gone=[false,false,false,false];for(let i=0;i<4;i++){K5L.ink(new V3(s3St[i].x,3,s3St[i].z),10);FIN.k2fx&&FIN.k2fx.mist(new V3(s3St[i].x,2,s3St[i].z),2,1.2);}s3Seat();k5s('blink');}
  function s3Pop(i,why){if(i===ES.real||ES.gone[i])return;const B=s3Body(i),p=B.m.g.position.clone();ES.gone[i]=true;B.m.g.visible=false;K5L.ink(p.clone().add(new V3(0,1.6,0)),18,1.4);k5Flash(p.clone().add(new V3(0,1.8,0)),0x9a60ff,3,0.4);
    if(FIN.k2fx)FIN.k2fx.mist(p.clone().add(new V3(0,1.4,0)),3,1.3);ES.popN=(ES.popN||0)+1;if(ES.popN<=3)floatText(p.clone().add(new V3(0,4.2,0)),why||'морок!','#c8a8ff');if(AUD.ready())AUD.bell(392,{v:0.04,d:0.4});E.log('s3pop');
    later(ES.walk?8:6.5,()=>{if(E.cur!==3||!ES.fight||!ES.gone[i])return;ES.gone[i]=false;const S=s3St[i];B.m.g.visible=!ES.down;B.m.g.position.set(S.x,ES.walk?0:1.6,S.z);K5L.ink(new V3(S.x,1.8,S.z),12);if(ES.walk)ES.wk[i]={hp:2,cd:2,lunge:null};});}
  /* ---------- сбит и окно ---------- */
  function s3Down(how){if(ES.down||!ES.fight||ES.walkJump)return;ES.down=true;s3CastStop(false);const S=s3St[ES.real],f=KS.g.position.clone(),to=new V3(S.x+(C.x-S.x)*0.22,0,S.z+(C.z-S.z)*0.22);
    anim(0.5,k=>{KS.g.position.lerpVectors(f,to,k);KS.g.position.y=f.y*(1-k)+Math.sin(k*Math.PI)*0.9;});try{KA.pose('recoil',{snap:true});}catch(e){}k5s('shatter');shakeAll(0.07,0.3);k5Flash(f.clone().add(new V3(0,2,0)),0xffe08a,4,0.4);
    floatText(f.clone().add(new V3(0,2.6,0)),how,'#ffe08a');ES.winT=G.solo?7:6;ES.hits=0;for(let i=0;i<4;i++)if(i!==ES.real&&!ES.gone[i]){const B=s3Body(i);K5L.ink(B.m.g.position.clone().add(new V3(0,1.6,0)),10);B.m.g.visible=false;}
    say('koschei',['Ах ты! С пня — меня?!','Как вы меня нашли?!','Туман, не выдавай!'][Math.floor(rand(0,3))],2);E.log('s3down');}
  function s3Up(){ES.down=false;try{KA.reset();}catch(e){}s3Shuffle();ES.castT=ES.walk?4.5:5.5;floatText(kosTop(),'Опомнился!','#c8a8ff');
    if(ES.walk){ES.wk=[];for(let i=0;i<4;i++){if(i===ES.real)continue;ES.wk[i]={hp:2,cd:2+i*0.5,lunge:null};s3Body(i).m.g.position.set(s3St[i].x,0,s3St[i].z);}}}
  function s3Hit(h){if(!ES.down||!ES.fight)return;if(ES.spes<=0){s3Bind(h);return;}if(G.time<(ES.hcd||0))return;ES.hcd=G.time+0.3;ES.hits++;ES.spes--;
    burst(KS.g.position.clone().add(new V3(0,2,0)),0xffffff,8,3);FX.sparks(KS.g.position.clone().add(new V3(0,2,0)),8,0xffd76a);shake(h.player,0.03,0.12);SFX.hit&&SFX.hit();
    if(ES.spes<=0){banner('Спесь сбита!','#ffd76a',2.4,G.solo?'ударь рядом с ним — золотая нить':'оба — удар рядом с ним: золотая нить сказа');ES.winT=99;}
    else{if(ES.hits>=(G.solo?2:3))ES.winT=Math.min(ES.winT,0.5);if(!ES.walk&&ES.spes<=Math.ceil(ES.spesMax/2))ES.walkNext=true;}}
  function s3Bind(h){const pi=h.player;ES.bind=ES.bind||[-9,-9];ES.bind[pi]=G.time;k5Thread(()=>hH(h),()=>KS.g.position.clone().add(new V3(0,2.4,0)));k5s('bind');
    if(G.solo||players[1-pi].downed||Math.abs(ES.bind[1-pi]-G.time)<1.6){ES.fight=false;bindBeat();E.won(3);}else floatText(kosTop(),'Второй — тоже!','#ffe08a');}
  W.hittables.push({pos:new V3(),r:1.4,alive:()=>E.cur===3&&ES.fight&&ES.down,onHit:h=>s3Hit(h)});const s3Ht=W.hittables[W.hittables.length-1];
  /* ---------- «Чёрное слово»: кольцо над настоящим заполняется, буквы кружат; мороки иногда притворяются ---------- */
  function s3CastStart(){const dur=G.solo?5.6:ES.walk?4.2:4.6;const mk=i=>{const B=s3Body(i),g=new THREE.Group();k5Prop(g);const real=B.real;
      const rim=new THREE.Mesh(new THREE.RingGeometry(0.92,1.05,40),k5Add(0xb070ff,{opacity:0.9}));g.add(rim);const fill=new THREE.Mesh(new THREE.CircleGeometry(0.92,40),k5Add(0x2a1040,{opacity:0.55,blending:THREE.NormalBlending}));fill.scale.setScalar(0.02);g.add(fill);
      const L=[];for(let k=0;k<7;k++){const s=K5L.textSpr('ЧЁРНОЕСЛОВО'[k%11],0.9,{w:128,h:128,col:'#1c0a2e',glow:'#b070ff',weight:'italic 700 '});g.add(s);L.push(s);}
      K5L.noRay(g);try{(B.a||{pose(){}}).pose('castR',{antic:0.2});}catch(e){}return {i,g,rim,fill,L,real,fake:!real};};
    const C0={t:0,dur,parts:[]};for(let i=0;i<4;i++){if(ES.gone[i]||(ES.walk&&i!==ES.real))continue;if(i!==ES.real&&Math.random()<0.45)continue;C0.parts.push(mk(i));}ES.cast=C0;k5s('cast');
    if(AUD.ready())AUD.nz({type:'bandpass',f0:300,f1:900,d:dur,v:0.04,q:3,a:0.4});if(!ES.wordTold){ES.wordTold=true;say('kot','Пишет «Чёрное слово»! Сбейте его, пока кольцо не полное!',2.6);}}
  function s3CastStop(done){const C0=ES.cast;if(!C0)return;ES.cast=null;for(const P of C0.parts){k5Del(P.g);}ES.castT=ES.walk?5:G.solo?8:6.5;try{KA.reset();}catch(e){}s3D.forEach(d=>{try{d.a&&d.a.reset();}catch(e){}});
    if(done)s3Rain();else{floatText(kosTop(),'Слово сбито!','#ffe08a');k5s('keyBreak');E.log('s3word_broken');}}
  function s3CastTick(dt){const C0=ES.cast;if(!C0)return;C0.t+=dt;const k=Math.min(1,C0.t/C0.dur);
    for(const P of C0.parts){const B=s3Body(P.i);if(!B.m.g.visible){continue;}const top=B.m.g.position.clone().add(new V3(0,5.4,0));P.g.position.copy(top);
      const kk=P.fake?Math.min(k,0.45+0.1*Math.sin(G.time*3)):k;P.fill.scale.setScalar(Math.max(0.02,kk));P.rim.material.opacity=0.6+0.35*Math.abs(Math.sin(G.time*(6+k*14)));
      P.L.forEach((s,j)=>{const a=G.time*2.2+j/P.L.length*6.283;s.position.set(Math.cos(a)*1.9,-2.6+Math.sin(G.time*1.7+j)*0.5-(1-k)*0.6,Math.sin(a)*0.3);s.material.opacity=0.4+0.6*k;});}
    if(k>=1)s3CastStop(true);}
  // чернильный дождь: круги — потом лужи; туман густеет
  function s3Rain(){say('koschei','Чёрное слово — чёрный дождь!',2);K5X.screen('#2a1040',0.35,0.8);if(ES.fogF)ES.fogF.set(0.8);later(8,()=>{if(E.cur===3&&ES.fogF)ES.fogF.set(0.45);});
    const pts=[];for(const h of k5Heroes())pts.push(new V3(h.pos.x,0,h.pos.z));for(let i=0;i<(G.solo?4:6);i++){const a=rand(0,6.28),d=rand(2,R-2);pts.push(new V3(C.x+Math.cos(a)*d,0,C.z+Math.sin(a)*d));}
    pts.forEach((p,i)=>later(i*0.12,()=>{if(E.cur!==3||!ES.fight)return;const T=FIN.k2fx?FIN.k2fx.tele(p.x,0,p.z,1.7,1.3,'red'):null;later(1.3,()=>{if(E.cur!==3||!ES.fight)return;K5L.ink(p.clone().add(new V3(0,0.4,0)),10,1);K5X.puddle(p,1.7,7.5,{hurt:false,slow:0.86});});}));E.log('s3rain');}
  /* ---------- капли: все четверо бросают; отбил — обратно ---------- */
  function s3Throw(i){const B=s3Body(i);if(!B.m.g.visible)return;const hs=k5Heroes().filter(h=>!h._down);if(!hs.length)return;const h=hs[Math.floor(rand(0,hs.length))];
    try{(B.a||{pose(){}}).pose('cast',{antic:0.15});}catch(e){}later(0.25,()=>{try{(B.a||{reset(){}}).reset();}catch(e){}});
    K5X.bolt({pos:B.m.g.position,onReflect:()=>{if(E.cur!==3||!ES.fight)return;if(i===ES.real){if(!ES.down&&!ES.walkJump)s3Down('Капля — в него!');}else s3Pop(i,'капля вернулась!');}},h,{col:0x9a40ff,y:B.real||!ES.walk?3.2:1.6,speed:G.solo?5.4:6.2});}
  /* ---------- веретено Кикиморы: крутится — бросает нитки; замерло (золото) — бить ---------- */
  function s3SpinHit(n,h){if(E.free.kiki||!ES.fight)return;if(ES.spinSt!=='rest'&&n<3&&!(h&&h.kind==='potap')){if(G.time>(ES.spinSay||0)){ES.spinSay=G.time+4;floatText(s3Spin.position.clone().add(new V3(0,2.4,0)),'крутится — жди золото','#d8c8a0');}return;}
    if(h&&h.kind==='potap')n=3;ES.spool=(ES.spool||0)+n;SFX.clink&&SFX.clink();FX.sparks(s3Spin.position.clone().add(new V3(0,1.2,0)),10,0xffd76a);
    if(ES.spool>=3){s3KikiFree();return;}floatText(s3Spin.position.clone().add(new V3(0,2.4,0)),'ещё '+(3-ES.spool),'#ffe08a');}
  W.hittables.push({pos:S3_SPIN.clone(),r:1.1,alive:()=>E.cur===3&&ES.fight&&!E.free.kiki,onHit:h=>s3SpinHit(1,h)});const s3SpinHt=W.hittables[W.hittables.length-1];
  function s3SpinTick(dt){if(E.free.kiki||!s3Spin.visible)return;const sp=s3Spin.userData.sp,gl=s3Spin.userData.gl;ES.spinT-=dt;
    if(ES.spinSt==='spin'){sp.rotation.y+=dt*14;gl.material.opacity=Math.max(0,gl.material.opacity-dt*3);ES.yarnT-=dt;
      if(ES.yarnT<=0){ES.yarnT=G.solo?2.6:1.9;const hs=k5Heroes().filter(h=>!h._down&&hd(h.pos,S3_SPIN)<12);if(hs.length){const h=hs[Math.floor(rand(0,hs.length))];
          K5X.bolt({pos:s3Spin.position,onReflect:()=>{if(E.cur===3)s3SpinHit(1);}},h,{col:0xf0e0b0,y:1.2,speed:5.2,trail:true});}}
      if(ES.spinT<=0){ES.spinSt='rest';ES.spinT=G.solo?2.4:1.8;if(AUD.ready())AUD.bell(988,{v:0.05,d:0.6});k5Ring(s3Spin.position.clone().setY(0.1),0xffd76a,0.6,2.2,0.5);}}
    else{sp.rotation.y+=dt*0.6;gl.material.opacity=0.7+0.3*Math.sin(G.time*10);if(ES.spinT<=0){ES.spinSt='spin';ES.spinT=G.solo?3.6:4.2;ES.yarnT=0.6;}}}
  function s3KikiFree(){E.freeF('kiki');s3Spin.visible=false;K5L.gold(s3Spin.position.clone().add(new V3(0,1.2,0)),26);k5Flash(s3Spin.position.clone().add(new V3(0,1.2,0)),0xffd76a,5,0.5);
    barkS(FR.kiki.m,'kiki','Должна была — отдаю! Кудель моя — вас свяжет, морок разрежет!',3,true);banner('Кикимора свободна!','#e0d0a0',2.6,G.solo?'золотая кудель — от неё к тебе':'золотая кудель связала вас');E.log('kiki');later(0.6,()=>{s3Tie.visible=true;});}
  /* ---------- кудель: нить между героями (одному — от Кикиморы); режет мороков; натянута — рогатка ---------- */
  const s3Ends=()=>{const a=active(G.solo?G.soloPi:0),b=G.solo?null:active(1);return [a,b];};
  const s3EP=h=>h?new V3(h.pos.x,h.pos.y+1.0,h.pos.z):FR.kiki.m.g.position.clone().add(new V3(0,1.3,0));
  const s3SegD=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,L2=dx*dx+dz*dz;let k=L2?((p.x-a.x)*dx+(p.z-a.z)*dz)/L2:0;k=Math.max(0,Math.min(1,k));return {d:Math.hypot(p.x-a.x-dx*k,p.z-a.z-dz*k),k};};
  // что на линии рогатки (от того, кто летит, к другому концу): ближнее тело
  function s3OnLine(from,to){let best=null,bk=9;for(let i=0;i<4;i++){if(ES.gone[i])continue;const B=s3Body(i);if(!B.m.g.visible)continue;const p=B.m.g.position,q=s3SegD(p,from,to);if(q.d<1.5&&q.k>0.08&&q.k<0.95&&q.k<bk){bk=q.k;best=i;}}return best;}
  // одним игроком второй конец кудели у Кикиморы: она забегает за пень, ближний к герою (кудель — через него), — иначе дальние пни
  // рогаткой не достать (за ними нет земли, а дальше 10,5 кудель не пускает)
  function s3KikiRun(dt,A){if(!G.solo||ES.fly||!A)return;let best=null,bd=7.5;for(let i=0;i<4;i++){if(ES.gone[i])continue;const B=s3Body(i);if(!B.m.g.visible)continue;const d=hd(B.m.g.position,A.pos);if(d<bd){bd=d;best=B.m.g.position;}}
    let t;if(best){const dir=new V3(best.x-A.pos.x,0,best.z-A.pos.z).normalize();t=new V3(best.x+dir.x*4.5,0,best.z+dir.z*4.5);}else{const dir=new V3(C.x-A.pos.x,0,C.z-A.pos.z).normalize();t=new V3(A.pos.x+dir.x*7.8,0,A.pos.z+dir.z*7.8);}
    const v=new V3(t.x-C.x,0,t.z-C.z);if(v.length()>R-1.2)v.setLength(R-1.2);t.set(C.x+v.x,0,C.z+v.z);const K=FR.kiki.m.g.position,dx=t.x-K.x,dz=t.z-K.z,dd=Math.hypot(dx,dz);
    if(dd>0.05){const st=Math.min(dd,7*dt);K.x+=dx/dd*st;K.z+=dz/dd*st;K.y=Math.abs(Math.sin(G.time*12))*0.15*Math.min(1,dd);}FR.kiki.m.g.rotation.y=Math.atan2(A.pos.x-K.x,A.pos.z-K.z);}
  function s3TieTick(dt){if(!E.free.kiki||!s3Tie.visible)return;const [A,Bh]=s3Ends();s3KikiRun(dt,A);const a=s3EP(A),b=s3EP(Bh),d=hd(a,b);
    // дальше S3_TIE не пустит: подтягивает того, кто тянет
    if(d>S3_TIE&&!ES.fly){const pull=(d-S3_TIE);const dir=new V3(b.x-a.x,0,b.z-a.z).normalize();if(Bh&&Bh.pos){Bh.pos.x-=dir.x*pull*0.5;Bh.pos.z-=dir.z*pull*0.5;A.pos.x+=dir.x*pull*0.5;A.pos.z+=dir.z*pull*0.5;}else{A.pos.x+=dir.x*pull;A.pos.z+=dir.z*pull;}}
    const taut=d>=(G.solo?5.5:S3_TAUT),sag=Math.max(0,(S3_TAUT+1-d))*0.22;ES.taut=taut;s3TieM.color.set(taut?0xffd040:0xfff0c0);
    for(let i=0;i<S3N;i++){const k0=i/S3N,k1=(i+1)/S3N,p0=a.clone().lerp(b,k0),p1=a.clone().lerp(b,k1);p0.y-=Math.sin(k0*Math.PI)*sag*2;p1.y-=Math.sin(k1*Math.PI)*sag*2;if(taut){const w=Math.sin(G.time*30+i)*0.03;p0.y+=w;p1.y+=w;}
      const m=s3Seg[i],dv=p1.clone().sub(p0),L=dv.length()||0.01;m.position.copy(p0).addScaledVector(dv,0.5);m.scale.set(taut?1.6:1,L,taut?1.6:1);m.quaternion.setFromUnitVectors(new V3(0,1,0),dv.normalize());}
    s3TieG.position.copy(a.clone().lerp(b,0.5));s3TieG.material.opacity=taut?0.8+0.2*Math.sin(G.time*12):0.25;
    // нить режет мороков (и на пнях, и идущих)
    for(let i=0;i<4;i++){if(i===ES.real||ES.gone[i])continue;const B=s3Body(i);if(!B.m.g.visible)continue;const q=s3SegD(B.m.g.position,a,b);if(q.d<1.15&&q.k>0.05&&q.k<0.95)s3Pop(i,'кудель разрезала!');}
    // и чернильные капли в полёте
    for(const bo of W.bolts){if(bo.refl||!bo.g)continue;const q=s3SegD(bo.p,a,b);if(q.d<0.6&&q.k>0.05&&q.k<0.95&&Math.abs(bo.p.y-a.y)<1.4){bo.t=99;K5L.gold(bo.p.clone(),6);}}}
  function s3Sling(pi){if(!E.free.kiki||ES.fly||!ES.fight||ES.down)return null;const [A,Bh]=s3Ends();const me=G.solo?A:active(pi),other=G.solo?null:(me===A?Bh:A);
    if(!ES.taut){return ()=>floatText(me.pos.clone().add(new V3(0,me.d.height+0.8,0)),'натяни кудель — разойдитесь шире','#fff0c0');}
    return ()=>{ES.fly=true;const f=me.pos.clone(),end=s3EP(other).setY(0),dir=end.clone().sub(f).setY(0),L=dir.length();dir.normalize();const hit=s3OnLine(f,end);let stop=end.clone().addScaledVector(dir,-1.6);
      if(hit!=null){const p=s3Pos(hit);stop=new V3(p.x,0,p.z).addScaledVector(dir,-1.3);}k5s('whoosh');SFX.thwip&&SFX.thwip();E.log('sling');const T=Math.min(0.85,0.25+hd(f,stop)*0.06);
      anim(T,k=>{me.pos.lerpVectors(f,stop,k);me.pos.y=Math.sin(k*Math.PI)*2.6+(hit!=null?k*1.2:0);me.vel.set(0,0,0);me.grounded=false;me.face=Math.atan2(dir.x,dir.z);});
      if(typeof k5Trail==='function'){const tr=k5Trail(me.g||{position:me.pos},0xffd76a,{life:0.35,size:0.6});later(T+0.1,()=>{tr.on=false;});}
      later(T+0.02,()=>{ES.fly=false;placeOnGround(me,stop.x,stop.z,0);if(!ES.fight)return;if(hit==null){floatText(stop.clone().add(new V3(0,2,0)),'мимо!','#fff0c0');E.log('slingMiss');return;}
        E.log(hit===ES.real?'slingReal':'slingPop');if(hit===ES.real)s3Down('Кудель-рогатка!');else s3Pop(hit,'рогаткой — морок!');});};}
  /* ---------- мороки сходят с пней (вторая половина): идут к героям, бросаются по красной дорожке ---------- */
  function s3WalkStart(){ES.walk=true;ES.walkNext=false;ES.wk=[];banner('Мороки сошли с пней!','#c8a8ff',2.6,'кудель режет их, удары и капли — тоже');say('koschei','Мороки мои — ступайте! Найдите их в тумане!',2.4);
    if(ES.fogF)ES.fogF.set(0.62);ES.walkJump=true;for(let i=0;i<4;i++)K5L.ink(new V3(s3St[i].x,1,s3St[i].z),20,1.5);k5s('blink');
    later(0.6,()=>{s3Layout(S3_B);ES.wk=[];for(let i=0;i<4;i++){if(i===ES.real)continue;ES.wk[i]={hp:2,cd:2+i*0.6,lunge:null};const B=s3Body(i);B.m.g.position.set(s3St[i].x,0,s3St[i].z);}s3Seat();
      for(let i=0;i<4;i++)if(i!==ES.real){const B=s3Body(i);B.m.g.position.set(s3St[i].x,0,s3St[i].z);}ES.walkJump=false;E.log('s3walk');});}
  for(let i=0;i<4;i++){W.hittables.push({pos:new V3(),r:1.0,alive:()=>E.cur===3&&ES.fight&&ES.walk&&!ES.down&&i!==ES.real&&!ES.gone[i],onHit:h=>{const w=ES.wk&&ES.wk[i];if(!w)return;w.hp--;burst(s3Pos(i).clone().add(new V3(0,1.4,0)),0x9a60ff,8,3);if(w.hp<=0)s3Pop(i,'морок рассыпался!');}});}
  const s3WkHt=W.hittables.slice(-4);
  function s3WalkTick(dt){if(!ES.walk||ES.down||!ES.wk)return;for(let i=0;i<4;i++){if(i===ES.real||ES.gone[i])continue;const w=ES.wk[i];if(!w)continue;const B=s3Body(i),p=B.m.g.position;s3WkHt[i].pos.copy(p);
      const h=nearH(p);if(!h)continue;const dx=h.pos.x-p.x,dz=h.pos.z-p.z,d=Math.hypot(dx,dz);B.m.g.rotation.y=angDamp(B.m.g.rotation.y,Math.atan2(dx,dz),4,dt);
      if(w.lunge){w.lunge.t+=dt;if(w.lunge.t>0.9){const k=Math.min(1,(w.lunge.t-0.9)/0.35);p.lerpVectors(w.lunge.f,w.lunge.to,k);if(!w.lunge.hit)for(const q of k5Heroes())if(hd(q.pos,p)<1.1&&q.rollT<=0&&!q.guard){w.lunge.hit=true;k5Hurt(q,p);}
          if(k>=1){w.lunge=null;w.cd=G.solo?3.4:2.6;}}continue;}
      w.cd-=dt;if(d>3.2){const sp=G.solo?1.5:1.9;p.x+=dx/d*sp*dt;p.z+=dz/d*sp*dt;p.y=0;}
      if(w.cd<=0&&d<6){const to=new V3(p.x+dx/d*Math.min(5,d+1),0,p.z+dz/d*Math.min(5,d+1));w.lunge={t:0,f:p.clone(),to,hit:false};if(FIN.k2fx)FIN.k2fx.lane(p.clone(),to,1.4,0.9,'red');try{B.a&&B.a.pose('threat',{antic:0.2});}catch(e){}}}}
  /* ---------- окружение стадии ---------- */
  function s3EnvOn(){s3Vis.visible=true;ES.fogF=K5X.fog(C,R+5,0xb8a8e8,26,{op:0.45,y0:0.4,y1:2.4,min:7,max:14});K5X.motes('ink',C,R+4,170,9);K5X.tint('rgba(40,12,70,.8)',0.5);
    K5X.own({off(){s3Vis.visible=false;}});}
  function s3EnvTick(dt){if(!s3Vis.visible)return;for(const q of s3Ghost){const k=Math.max(0,Math.sin(G.time*q.sp+q.ph));q.m.opacity=0.42*k*k;}
    for(const q of s3Eyes){q.ph-=dt;if(q.ph<=0){q.ph=rand(3,9);q.k=1;}q.k=Math.max(0,q.k-dt*0.6);const o=q.k>0.85?(1-q.k)*6:q.k;q.g.children.forEach(e=>{e.material.opacity=Math.min(1,o*1.4);e.scale.y=0.55*(q.k>0.97?0.2:1);});}}
  /* ---------- стадия ---------- */
  E.stage[3]={start(o){E.hub(3);K5L.themeTo('ink',1.2);K5.fight=false;liveBoss(false);dome.visible=false;ES.fight=false;ES.spes=ES.spesMax=G.solo?4:6;ES.down=false;ES.castT=5;ES.blobT=2.5;ES.spool=0;ES.fly=false;ES.walk=false;ES.walkNext=false;
      ES.spinSt='spin';ES.spinT=3.5;ES.yarnT=1.2;ES.breathT=1;ES.gone=[false,false,false,false];W.clampR={x:C.x,z:C.z,r:R};s3Layout(S3_A);s3St.forEach(s=>{s.g.visible=true;s.c.on=true;});heroesHome(3);KS.g.scale.setScalar(0.9);s3Shuffle();E.arenaCam(true,1);
      s3EnvOn();if(!E.free.kiki){FR.kiki.m.g.position.copy(S3_KIKI);FR.kiki.m.g.rotation.y=Math.atan2(C.x-S3_KIKI.x,C.z-S3_KIKI.z);s3Spin.visible=true;s3Spin.position.copy(S3_SPIN);s3SpinHt.pos.copy(S3_SPIN);}else s3Tie.visible=true;
      const go=()=>{ES.fight=true;E.log('s3go');};E.cards(3,go);},
    tick(dt){s3EnvTick(dt);if(!ES.fight)return;s3Ht.pos.copy(KS.g.position);for(let i=0;i<4;i++)s3Mk[i].pos.copy(s3Pos(i)).add(new V3(0,2.4,0));
      // кто настоящий: тень на пне и пар изо рта; Совиный взор и сказка Кота — золотое свечение
      const reveal=(W.owlT>0||K5.listen)&&!ES.down;aura.color.set(reveal?0xffd76a:0xa070ff);aura.intensity=reveal?2.4:0.5;aura.position.copy(KS.g.position).add(new V3(0,3,0));
      for(let i=0;i<4;i++){const S=s3St[i],real=i===ES.real&&!ES.down;S.sh.material.opacity=real?0.6:0;S.rune.material.color.set(real&&reveal?0xffd76a:0xa060ff);S.rune.rotation.z+=dt*(real&&reveal?3:0.6);}
      ES.breathT-=dt;if(ES.breathT<=0&&!ES.down){ES.breathT=G.solo?1.8:2.4;const hp=KS.head.getWorldPosition(new V3());if(FIN.k2fx)FIN.k2fx.mist(hp.add(new V3(0,-0.1,0.25)),1,0.45);}
      for(let i=0;i<4;i++){const B=s3Body(i);if(!B.m.g.visible||(ES.down&&B.real)||(ES.walk&&!B.real))continue;B.m.g.position.y=1.6+Math.sin(G.time*1.6+i)*0.1;const t=nearH(B.m.g.position);if(t)B.m.g.rotation.y=angDamp(B.m.g.rotation.y,Math.atan2(t.pos.x-B.m.g.position.x,t.pos.z-B.m.g.position.z),3,dt);}
      if(K5.listen&&!ES.down){KS.head.rotation.z=Math.sin(G.time*1.2)*0.15;}
      s3SpinTick(dt);s3TieTick(dt);s3WalkTick(dt);s3CastTick(dt);
      // подкидка Потапа: подброшенный рядом с телом на пне — сбил / лопнул
      if(!ES.down&&!ES.fly)for(const h of k5Heroes()){if(h.pos.y<1.8)continue;for(let i=0;i<4;i++){if(ES.gone[i])continue;const B=s3Body(i);if(!B.m.g.visible||(ES.walk&&!B.real)||hd(h.pos,B.m.g.position)>1.9)continue;if(i===ES.real)s3Down('Подкидка!');else s3Pop(i,'подкидкой — морок!');}}
      if(ES.down){ES.winT-=dt;if(ES.winT<=0&&ES.spes>0){s3Up();if(ES.walkNext)s3WalkStart();}return;}
      if(K5.listen)return;   // сказка Кота: Кощей заслушался — не колдует
      if(!ES.cast){ES.castT-=dt;if(ES.castT<=0)s3CastStart();}
      ES.blobT-=dt;if(ES.blobT<=0){ES.blobT=(G.solo?3.4:2.4)*(ES.walk?1.3:1);const vis=[0,1,2,3].filter(i=>!ES.gone[i]&&s3Body(i).m.g.visible&&(!ES.walk||i===ES.real||Math.random()<0.3));if(vis.length)s3Throw(vis[Math.floor(rand(0,vis.length))]);}},
    end(){s3St.forEach(s=>{s.g.visible=false;s.c.on=false;});s3D.forEach(d=>{d.m.g.visible=false;});s3Spin.visible=false;s3Tie.visible=false;s3Vis.visible=false;aura.intensity=0;KS.g.scale.setScalar(1.15);W.camFn=null;
      if(ES.cast)for(const P of ES.cast.parts)k5Del(P.g);ES.cast=null;if(!E.free.kiki)FR.kiki.m.g.position.copy(FR.kiki.home);else FR.kiki.m.g.position.copy(FR.kiki.home);KS.head.rotation.z=0;try{KA.reset();}catch(e){}},
    item:pi=>E.cur===3?s3Sling(pi):null,
    pics:pi=>ES.down?(ES.spes>0?['koschei','>','@attack']:['two','hit','>','gchain']):!E.free.kiki?['friend','chain','>','@attack']:['eye','koschei','+','ink','@guard'],
    goal:pi=>{const q=G.solo?0:pi;if(ES.down)return ES.spes>0?'Кощей сбит — <b>бейте</b> '+K(q,'attack')+', пока не опомнился!':'Спесь сбита — '+(G.solo?'удар':'оба удар')+' рядом: <b>золотая нить</b>!';
      const find='Настоящий — с <b>тенью</b> на пне и <b>паром</b> изо рта'+(pi===1||G.solo?'; Совиный взор '+K(q,'skill'):'')+'. Капля — <b>щит '+K(q,'guard')+' в последний миг</b>: вернётся в бросившего.';
      if(!E.free.kiki)return find+'<br>Кикимора в цепи: веретено замерло <b>золотом</b> — бей '+K(q,'attack')+' (Потапу — одного удара).';
      return find+'<br><b>Кудель</b>: нить режет мороков; натянули — '+K(q,'item')+' <b>рогатка</b>: Кощей между вами — и летишь в него.';},
    targets:pi=>ES.down?[KS.g]:!E.free.kiki?[s3Spin]:[]};
  // рогатка Прошки — в настоящего, пока он пишет: слово сбито; в морока — лопнул
  for(let i=0;i<4;i++){W.marks.push({pos:new V3(),active:()=>E.cur===3&&ES.fight&&!ES.down&&!ES.gone[i]&&s3Body(i).m.g.visible,onHit:()=>{if(i===ES.real){if(ES.cast)s3CastStop(false);else floatText(kosTop(),'Ха!','#c8a8ff');}else s3Pop(i,'рогаткой — морок!');}});}
  const s3Mk=W.marks.slice(-4);
  /* ---------- подсказки в мире ---------- */
  for(const pi of[0,1]){const me=()=>G.solo?active(G.soloPi):active(pi),st3=()=>E.cur===3&&ES.fight&&!G.cine&&(!G.solo||pi===0),top=()=>headOf(me()).add(new V3(0,0.4,0));
    // капля летит в тебя — щит в последний миг
    {prompt(pi,'guard',top,()=>false);const pr=W.prompts[W.prompts.length-1];pr.cond=()=>{if(!st3())return false;const b=W.bolts.find(b=>!b.refl&&b.tgt===me()&&b.eta<1.1);if(!b)return false;pr.note=b.eta<0.35?'СЕЙЧАС!':'щит — в последний миг';return true;};}
    // веретено замерло — бей
    prompt(pi,'attack',()=>s3Spin.position.clone().add(new V3(pi?0.6:-0.6,2.6,0)),()=>st3()&&!E.free.kiki&&ES.spinSt==='rest'&&hd(me().pos,S3_SPIN)<9,'веретено — бей!');
    // кудель натянута — рогатка; на линии тело — «в него!»
    {prompt(pi,'item',top,()=>false);const pr=W.prompts[W.prompts.length-1];pr.cond=()=>{if(!st3()||!E.free.kiki||!ES.taut||ES.down||ES.fly)return false;const [A,Bh]=s3Ends();const m=G.solo?A:me(),o=G.solo?null:(m===A?Bh:A);
      const hit=s3OnLine(m.pos,s3EP(o).setY(0));pr.note=hit==null?'рогатка (на линии никого)':'рогатка — в того, кто на линии!';return true;};}
    // Кощей сбит — бей
    prompt(pi,'attack',()=>KS.g.position.clone().add(new V3(pi?0.8:-0.8,3,0)),()=>st3()&&ES.down,()=>ES.spes>0?'бей!':'вместе!');
    // лужа или круг дождя под тобой — уходи
    prompt(pi,'roll',top,()=>st3()&&K5X.owned.some(o=>o.g&&o.t!=null&&o.t>0.4&&Math.hypot(o.g.position.x-me().pos.x,o.g.position.z-me().pos.z)<1.8),'чернильная лужа — уходи');}
  // цель на линии рогатки — золотой знак над ней
  const s3Aim=k5Prop(t4Arrow(0xffd76a));s3Aim.visible=false;K5L.noRay(s3Aim);
  W.updates.push(dt=>{if(E.cur!==3||!ES.fight||!ES.taut||ES.down||!E.free.kiki){s3Aim.visible=false;return;}const [A,Bh]=s3Ends();let best=null;for(const m of(G.solo?[A]:[A,Bh])){const o=G.solo?null:(m===A?Bh:A);const hit=s3OnLine(m.pos,s3EP(o).setY(0));if(hit!=null){best=hit;break;}}
    s3Aim.visible=best!=null;if(best!=null){s3Aim.position.copy(s3Pos(best)).add(new V3(0,5.6+0.3*Math.sin(G.time*5),0));s3Aim.rotation.y+=dt*3;}});
  Object.assign(S3,{stump:i=>({x:s3St[i].x,z:s3St[i].z}),body:i=>s3Pos(i),spin:S3_SPIN,kiki:S3_KIKI,TAUT:S3_TAUT,down:how=>s3Down(how)});   // для ботов (tk5e_s3)
  E.CARDS[3]=[{p:[0,10,6],l:[0,1,-13],card:{tag:'Как победить',title:'Стадия 3 из 12 · Там лес и дол видений полны',icon:'orb',text:'Кощей и трое <b>мороков</b> на чернильных пнях. Найдите настоящего, сбейте его с пня и бейте, пока он не опомнился. Спесь сбита — удар рядом с ним вдвоём.'}},
    {p:[2,5,-6],l:[-5,2,-7],card:{tag:'Кто настоящий',title:'Тень и пар',icon:'orb',text:'У настоящего на пне <b>тень</b> и <b>пар</b> изо рта — у мороков их нет. Совиный взор Пелагеи и сказка Кота светят на него золотом.'}},
    {p:[-2,5,-2],l:[-6.5,2,-15],card:{tag:'Капли',title:'Щит в последний миг',icon:'yellow',text:'Все четверо бросают чернильные капли. Отбей <b>щитом в последний миг</b> — капля вернётся: морок лопнет, настоящий слетит с пня. Кольцо над ним — «Чёрное слово»: сбей, пока не полное, иначе чернильный дождь.'}},
    {p:[-4,4,-3],l:[-8,1,-9],card:{tag:'Кикимора',title:'Веретено и кудель',icon:'lock',text:'Веретено Кикиморы крутится и бросает нитки. Замерло <b>золотом</b> — бей. Свободная Кикимора свяжет вас <b>золотой куделью</b>: нить режет мороков, а натянутая — <b>рогатка</b>: Кощей между вами — '+K(0,'item')+', и летишь в него.'}}];
