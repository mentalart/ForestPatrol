// ---- продолжение build5B2 (k5epic, часть 7): ЛУКОМОРЬЕ — постройки, друзья в чёрных цепях, Кот-часы, помощь друзей ----
  /* ---------- Лукоморье вокруг поляны: кузня, лавка Векши, огород Дедки, изба Рябы, песчаный берег ---------- */
  K5L.sand(-22,22,6,16);const WAVES=K5L.waves(-40,40,16.6);
  K5L.forge(15.5,-27,-Math.PI/2);const kuzma=makeKuzma();kuzma.g.position.set(13.2,0,-25.6);kuzma.g.rotation.y=-2.2;
  K5L.stall(17,-15,-Math.PI/2);const belka=makeBelka5();belka.g.position.set(16.6,1.0,-13.8);belka.g.rotation.y=-Math.PI/2;
  K5L.garden(-17,-14);const ded=makeStarik();ded.g.position.set(-14.4,0,-11.4);ded.g.rotation.y=1.9;
  K5L.izba(-18,-33,Math.PI/2);
  for(const o of[kuzma,belka,ded])K5L.noRay(o.g);
  /* ---------- друзья: где стоят на Лукоморье; пока в чёрной цепи — скованы (ошейник), освобождён — помогает ---------- */
  const findM=(...ks)=>{if(DB[ks[0]])return DB[ks[0]];const h=HM.find(q=>ks.indexOf(q.k)>=0);return h?h.m:null;};
  const FR={};E.fr=FR;
  const fr=(k,m,x,z,y,col)=>{if(!m)return null;m.g.position.set(x,y||0,z);m.g.rotation.y=Math.atan2(C.x-x,C.z-z);const c=K5L.collar(m.g,col||1.6,0.42);
    FR[k]={k,m,c,home:new V3(x,y||0,z),free:false};return FR[k];};
  fr('leshy',findM('leshy','leshy4')||(()=>{const m=makeLeshy(1);return m;})(),15.2,-5.5,0,2.4);
  fr('kiki',findM('kiki','kiki4')||makeKikimora(),14.2,1.6,0,1.3);
  fr('yaga',findM('yaga')||makeYaga(),-15.4,-3.6,0,1.3);
  {const c=K5L.collar(gor.g,2.2,1.4);FR.gor={k:'gor',m:gor,c,home:gor.g.position.clone(),free:false};}
  // друзья из миров приходят на Лукоморье после своей страницы (до того их тут нет)
  const vodM=FIN.k2v&&FIN.k2v.rig?(()=>{const g=k5Prop(new THREE.Group());const R0=FIN.k2v.rig(g,{scale:0.9});return {g,R:R0};})():makeStarik();
  vodM.g.position.set(-6,-0.3,12.5);vodM.g.visible=false;FR.vod={k:'vod',m:vodM,home:new V3(-6,0,12.5),free:false};
  const zhar=makeFirebird({});zhar.g.visible=false;K5L.noRay(zhar.g);FR.zhar={k:'zhar',m:zhar,free:false};
  const solo=makeSolovei();solo.g.visible=false;solo.g.position.set(-2.6,6.2,-25.4);K5L.noRay(solo.g);FR.solo={k:'solo',m:solo,free:false};
  const bell=k5Prop(new THREE.Group());bell.position.set(-2.4,0,-23.6);addMesh(new THREE.CylinderGeometry(0.06,0.06,2.6,6),M(0x6a4a2a),0,1.3,0,bell);
  {const b=addMesh(new THREE.CylinderGeometry(0.35,0.6,0.8,12,1,true),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.5,side:THREE.DoubleSide}),0,2.3,0,bell);bell.userData.cup=b;}bell.visible=false;K5L.noRay(bell);
  for(const k in FR)if(FR[k].m&&FR[k].m.g)K5L.noRay(FR[k].m.g);
  // освободить: ошейник разлетается золотом, друг радуется; quiet — без эффектов (прыжок к стадии)
  E.freeF=(k,quiet)=>{const f=FR[k];if(!f||f.free)return;f.free=true;E.free[k]=true;if(f.c){if(quiet){k5Del(f.c.g);f.c.on=false;}else f.c.break();}
    if(f.m&&f.m.g)f.m.g.visible=true;if(!quiet){const p=f.m.g.position.clone().add(new V3(0,2,0));K5L.gold(p,20);k5Ring(new V3(p.x,0.1,p.z),0xffd76a,0.4,3,0.7,0.12);npcEm(f.m,'cheer')();}};
  E.hubFree=()=>{for(const k of['leshy','kiki','yaga','gor'])if(E.free[k]&&FR[k]&&!FR[k].free)E.freeF(k,true);
    FR.vod.m.g.visible=!!E.free.vod;FR.zhar.m.g.visible=!!E.free.zhar;FR.solo.m.g.visible=!!E.free.solo;bell.visible=!!E.free.solo;
    if(E.free.kot&&leaves[0]&&!leaves[0].visible){const n=E.cur>=12?16:E.cur>=8?12:E.cur>=4?8:4;leaves.forEach((l,i)=>{if(i<n){l.visible=true;l.scale.setScalar(1);}});}};
  // дуб зеленеет понемногу: k — доля листвы (0…1)
  E.oakGreen=(k,fx)=>{const n=Math.round(leaves.length*k);leaves.forEach((l,i)=>{if(i<n&&!l.visible){l.visible=true;if(fx){l.scale.setScalar(0.01);anim(0.8,q=>l.scale.setScalar(Math.max(0.01,CE.outBack(q))));K5L.gold(l.position.clone(),6);}else l.scale.setScalar(1);}});};
  // на Лукоморье: границы поляны и свет
  E.hub=n=>{W.camX=18;K5L.theme(n>=10&&n<=11?'sunset':n===8?'storm':'dawn',1);W.clampR={x:C.x,z:C.z,r:R};W.fallY=-12;E.hubFree();};
  /* ---------- Кот-часы: «Идёт направо — песнь заводит, налево — сказку говорит» ---------- */
  // Кот ходит по цепи вокруг дуба. Направо (правая половина) — песнь: Кощей бьёт в такт и вешает на цепь замки; Кот упрётся в замок —
  // стоит, песнь тянется. Налево — сказка: Кощей заслушался (бывший ученик Кота) — опустил руки, открыт; удары гасят спесь.
  const RING=K5L.catRing(OAK,3.5,2.7,kot);RING.g.visible=false;
  const theatre=k5Prop(new THREE.Mesh(new THREE.PlaneGeometry(12,15.6),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,fog:false,side:THREE.DoubleSide})));theatre.position.set(OAK.x,15,OAK.z-2);theatre.visible=false;K5L.noRay(theatre);
  const TEX={};const lub=w=>TEX[w]||(TEX[w]=K5L.lubok(w));
  const note=K5L.textSpr('♪',1.2,{w:128,h:128,col:'#ffd76a',glow:'#ffb030',weight:'700 '});k5Prop(note);note.visible=false;
  const CK={live:false,n:0,ph:'song',t:0,locks:[],said:{}};E.clock=CK;
  const ringPt=(a,dy,rr)=>new V3(OAK.x+Math.cos(a)*(rr||3.5),2.7+(dy||0),OAK.z+Math.sin(a)*(rr||3.5));
  function lockMake(a){const g=K5L.lock();k5Prop(g);const p=ringPt(a,-1.2,4.1);g.position.copy(p);g.scale.setScalar(1.25);
    const line=k5Prop(new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,1,4),M(0x1a1420)));const a0=ringPt(a);line.position.copy(a0).lerp(p,0.5);line.scale.y=a0.distanceTo(p);line.lookAt(p);line.rotateX(Math.PI/2);
    const L={a,g,line,hp:G.solo?1:2,alive:true,pos:p};
    L.ht={pos:p,r:1.0,alive:()=>L.alive&&CK.live&&!G.cine,onHit:h=>lockHit(L,h,1)};W.hittables.push(L.ht);
    L.mk={pos:p,active:()=>L.alive&&CK.live,onHit:()=>lockHit(L,null,2)};W.marks.push(L.mk);
    g.scale.setScalar(0.01);anim(0.4,k=>g.scale.setScalar(Math.max(0.01,1.25*CE.outBack(k))));K5L.ink(p,8);k5s('lock');CK.locks.push(L);return L;}
  function lockHit(L,h,dmg){if(!L.alive)return;L.hp-=dmg;SFX.clink();FX.sparks(L.pos.clone(),8,0xc080ff);if(L.hp>0){floatText(L.pos.clone().add(new V3(0,0.8,0)),'ещё раз!','#e0c8ff');return;}
    L.alive=false;k5s('keyBreak');K5L.gold(L.pos.clone(),12);k5Flash(L.pos.clone(),0xffd76a,2,0.3);floatText(L.pos.clone().add(new V3(0,0.8,0)),'Замок сбит!','#ffe08a');lockDrop(L);E.log('lock');}
  function lockDrop(L){const f=L.g.position.clone();k5Del(L.line);k5fx(0.6,k=>{L.g.position.set(f.x,f.y-k*k*1.6,f.z);L.g.scale.setScalar(1.25*(1-k));},()=>k5Del(L.g));
    const i=W.hittables.indexOf(L.ht);if(i>=0)W.hittables.splice(i,1);const j=W.marks.indexOf(L.mk);if(j>=0)W.marks.splice(j,1);}
  function locksClear(){for(const L of CK.locks)if(L.alive){L.alive=false;lockDrop(L);}CK.locks.length=0;}
  const fighting=()=>(E.OLD[CK.n]?K5.fight:ES.fight)&&!G.cine;
  CK.on=n=>{CK.live=true;CK.n=n;CK.ph='song';CK.t=0;CK.a=Math.PI/2+0.2;RING.g.visible=true;CK.started=false;locksClear();RING.set(CK.a);};
  CK.off=()=>{CK.live=false;K5.listen=false;locksClear();RING.g.visible=false;theatre.visible=false;note.visible=false;if(CK.ph==='tale'&&E.cur!=null)E.music();CK.ph='song';};
  function songStart(){CK.ph='song';CK.t=0;K5.listen=false;theatre.visible=false;const n=G.solo||CK.n===1?1:2;for(let i=0;i<n;i++)lockMake(Math.PI/2-0.6-i*0.5);E.music();
    if(!CK.said.song){CK.said.song=true;say('zven','Кот направо — песнь заводит:<br>Кощей в такт с неё колдует! Замки на цепи — сбейте!',3.6,true);}}
  function taleStart(){CK.ph='tale';CK.t=0;K5.listen=true;theatre.material.map=lub([1,1,1,1,1,2,3,4,4,4,4,4,4][CK.n]||1);theatre.material.needsUpdate=true;theatre.visible=true;
    K5L.music('tale',E.freeCount());if(K5.live&&KB.pos.y<1.2){KB.dazeT=Math.max(KB.dazeT||0,CK.taleDur());KB.state=KB.state==='broken'?'broken':KB.state;}
    try{KA.pose('slump');}catch(e){}if(!CK.said.tale){CK.said.tale=true;say('zven','Кот налево — сказку говорит!<br>Кощей заслушался — бейте, пока стоит!',3.6,true);}E.log('tale'+CK.n);}
  CK.taleDur=()=>G.solo?11:9;
  CK.tick=dt=>{if(!CK.live)return;if(!fighting()){if(K5.listen&&CK.ph==='tale'){/* ролик — сказка ждёт */}return;}
    if(!CK.started){CK.started=true;songStart();}CK.t+=dt;
    if(CK.ph==='song'){const blk=CK.locks.find(L=>L.alive&&CK.a-L.a<0.32&&CK.a>L.a);if(!blk){CK.a-=dt*Math.PI/13;}else if(G.time>(CK.mrT||0)){CK.mrT=G.time+5;floatText(kot.g.position.clone().add(new V3(0,1.4,0)),'мр-р… замок!','#d2d8e8');}
      note.visible=true;note.position.copy(ringPt(CK.a,1.6));note.material.opacity=0.6+0.4*Math.abs(Math.sin(G.time*4));
      if(CK.a<=-Math.PI/2){locksClear();taleStart();}}
    else{CK.a-=dt*Math.PI/CK.taleDur();note.visible=false;theatre.material.opacity=Math.min(0.85,theatre.material.opacity+dt*1.5);theatre.position.y=15+Math.sin(G.time*0.8)*0.3;
      if(K5.live&&KB.pos.y<1.2&&KB.state!=='broken')KB.dazeT=Math.max(KB.dazeT||0,0.3);
      if(K5.st===1){K5.castT=(K5.castT||4)+dt;K5.cs0=(K5.cs0||1.5)+dt;K5.cs1=(K5.cs1||1.5)+dt;}
      if(CK.a<=-1.5*Math.PI){CK.a+=2*Math.PI;theatre.material.opacity=0;songStart();}}
    RING.set(CK.a);};
  /* ---------- помощь освобождённых друзей на Лукоморье ---------- */
  // Леший: «Ко мне!» у ёлки — ёлка встаёт рядом с героем: заслон от ветра и молний (красный круг у ёлки — молния бьёт в ёлку)
  const SPR=[];E.spruces=SPR;
  function spruceMake(x,z){const g=k5Prop(new THREE.Group());g.position.set(x,0,z);const m=M(0x2e5a2e),dk=M(0x5a3a1e);addMesh(new THREE.CylinderGeometry(0.15,0.22,1,6),dk,0,0.5,0,g);
    for(let i=0;i<3;i++)addMesh(new THREE.ConeGeometry(1.25-i*0.3,1.6,7),m,0,1.2+i*0.9,0,g);K5L.noRay(g);const c={x,z,r:0.75,miny:-1,maxy:4,on:true};W.cyls.push(c);
    const S={g,c,pos:g.position};SPR.push(S);return S;}
  function spruceTo(S,x,z){const f=S.g.position.clone();anim(0.8,k=>{const e=CE.inOutCubic(k);S.g.position.set(lerp(f.x,x,e),Math.sin(k*Math.PI)*0.6,lerp(f.z,z,e));S.c.x=S.g.position.x;S.c.z=S.g.position.z;});FX.dust(new V3(x,0.1,z),10,0x5a4a3a);}
  const sheltered=h=>SPR.some(S=>hd(S.pos,h.pos)<1.9);E.sheltered=sheltered;
  W.pingCall=(pi,h)=>{if(!E.isHub(E.cur)||G.cine)return;
    if(E.free.leshy&&SPR.length){const kz=KS.g.position,dx=h.pos.x-kz.x,dz=h.pos.z-kz.z,d=Math.hypot(dx,dz)||1;let S=SPR[0];for(const q of SPR)if(hd(q.pos,h.pos)>hd(S.pos,h.pos))S=q;   // дальнюю ёлку — к герою, между ним и Кощеем
      spruceTo(S,h.pos.x-dx/d*1.3,h.pos.z-dz/d*1.3);npcEm(FR.leshy.m,'nod')();if(!E.said_l){E.said_l=true;barkS(FR.leshy.m,'leshy','Ёлочки — встаньте, укройте ребят!',2.2,true);}}
    if(E.free.zhar&&ES.dark){ES.lightT=5;}};
  // молния в красный круг рядом с ёлкой бьёт в ёлку, ветер не толкает того, кто за ёлкой
  {const _wt=windTick;windTick=function(dt){const keep=[];if(NAT.wind)for(const h of [active(0),active(1)])if(h&&sheltered(h))keep.push([h,h.pos.clone()]);_wt(dt);for(const [h,p] of keep){h.pos.x=p.x;h.pos.z=p.z;}};}
  function zonesTick(){if(!SPR.length||!K5.zones)return;for(const z of K5.zones){if(z.userData.dead||z.userData.spr)continue;const S=SPR.find(q=>hd(q.pos,z.position)<1.9);if(!S)continue;z.userData.spr=true;z.userData.dead=true;
      later(0.9,()=>{k5Bolt(new V3(S.pos.x,0,S.pos.z),0xd8b0ff);k5s('strike');FX.sparks(S.pos.clone().add(new V3(0,3,0)),14,0xffd060);anim(0.5,k=>{S.g.rotation.z=Math.sin(k*Math.PI*3)*0.15*(1-k);});});}}
  // Яга: упавшего героя ступа подбирает и ставит рядом с другом (раз в 20 с)
  const stupa=makeStupa();stupa.g.visible=false;K5L.noRay(stupa.g);let stupaT=0;
  function stupaTick(dt){stupaT-=dt;if(!E.free.yaga||G.solo||stupaT>0||!E.isHub(E.cur))return;for(const pi of[0,1]){const p=players[pi],q=players[1-pi];if(!p.downed||q.downed||p.downT>8.4)continue;const h=active(pi),f=active(1-pi);if(hd(h.pos,f.pos)<3)continue;
      stupaT=20;const to=f.pos.clone().add(new V3(1.2,0,0.6));stupa.g.visible=true;const a=h.pos.clone().add(new V3(0,6,0));stupa.g.position.copy(a);E.log('stupa');
      anim(0.7,k=>{stupa.g.position.lerpVectors(a,h.pos.clone().add(new V3(0,1,0)),CE.outCubic(k));});
      later(0.75,()=>{const b=stupa.g.position.clone();anim(1.0,k=>{stupa.g.position.lerpVectors(b,to.clone().add(new V3(0,1.4,0)),CE.inOutSine(k));stupa.g.position.y+=Math.sin(k*Math.PI)*3;});
        later(1.0,()=>{placeOnGround(h,to.x,to.z,to.y);FX.dust(to.clone(),10,0xd8c8a8);barkS(stupa,'yaga','Держи своего! Подшивай!',1.6,true);const c=stupa.g.position.clone();anim(0.8,k=>{stupa.g.position.set(c.x+k*6,c.y+k*8,c.z-k*4);if(k>=1)stupa.g.visible=false;});});});break;}}
  // Соловей на ветке: колокол под дубом — удар или рогатка; свист сдувает тучу (стадия 8) или сбивает Кощея с ног (9, 12)
  let bellCd=0;E.bellCd=()=>bellCd;
  W.hittables.push({pos:new V3(bell.position.x,1.2,bell.position.z),r:1.0,alive:()=>E.free.solo&&E.isHub(E.cur)&&!G.cine&&bellCd<=0,onHit:()=>bellRing()});
  W.marks.push({pos:new V3(bell.position.x,2.3,bell.position.z),active:()=>E.free.solo&&E.isHub(E.cur)&&bellCd<=0,onHit:()=>bellRing()});
  function bellRing(){if(bellCd>0)return;bellCd=G.solo?14:20;SFX.bell?SFX.bell():AUD.ready()&&AUD.bell(660,{v:0.08,d:1.5,wet:0.5});anim(0.6,k=>{bell.userData.cup.rotation.z=Math.sin(k*Math.PI*4)*0.4*(1-k);});
    later(0.4,()=>{barkS(solo,'solovei','Фью-у-у-у-ить!',1.4,true);const p=solo.g.position.clone();for(let i=0;i<4;i++)later(i*0.12,()=>k5Ring(new V3(p.x,p.y-1,p.z+2),0xfff4d0,0.5,9,0.7,0.06,new THREE.Euler(0,0,0)));
      if(E.onWhistle)E.onWhistle();else if(K5.live&&KB.pos.y<1.2&&KB.state!=='broken'){KB.dazeT=Math.max(KB.dazeT||0,2.6);K5.winN=0;floatText(kosTop(),'Сдуло!','#fff4d0');KB.pos.z-=0.6;}});E.log('bell');}
  // Жар-птица: кружит над полем; где темно (стадия 8) — подсвечивает Кощея по «Ко мне!»
  function zharTick(dt){if(!E.free.zhar)return;const a=G.time*0.6;zhar.g.position.set(C.x+Math.cos(a)*9,9+Math.sin(a*2)*0.8,C.z+Math.sin(a)*7);zhar.g.rotation.y=-a;if(ES.lightT>0){ES.lightT-=dt;zhar.g.position.lerp(KS.g.position.clone().add(new V3(0,6,0)),0.6);}}
  // Горыныч освобождён — дремлет у корней, по «Ко мне!» … (полёт — стадии 7–8)
  E.hubTick=dt=>{WAVES.userData.tick(dt);if(bellCd>0)bellCd-=dt;CK.tick(dt);zonesTick();stupaTick(dt);zharTick(dt);
    if(E.free.solo&&solo.g.visible&&solo.body){solo.body.rotation.z=Math.sin(G.time*2)*0.05;}};
  // ёлки Лешего появляются, когда он свободен
  E.sprucesOn=()=>{if(SPR.length)return;for(const [x,z] of[[-6.5,-9],[6.5,-9],[0,-17.5]]){const S=spruceMake(FR.leshy.home.x,FR.leshy.home.z);spruceTo(S,x,z);}};
