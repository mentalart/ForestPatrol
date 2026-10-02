/* ============================== РЕЛИЗ final06 · 2-1: МИНИ-БОСС «РАК-ОТШЕЛЬНИК» ============================== */
// После Сада Китежа, перед воротами города. Рак-Отшельник сидит в огромной витой раковине, облепленной мороком, и не пускает
// к воротам: «Это МОЙ дом!». Он не злодей — ему просто тесно и одиноко в чужой тёмной раковине.
//   Этап 1 «В раковине»: раковину не пробить. Но рак любит музыку: кто-то играет на гуслях у ракушки-музыкалки — рак заслушается,
//      выглянет и запляшет; тут его и бить (один играет, другой бьёт; в одиночку — сыграл, сменил героя: оставленный доигрывает).
//      Пробой — Потап тянет рака за клешню из раковины (бить может любой, а вытянет только Потап).
//   Этап 2 «Без домика»: голенький рак стесняется и удирает, кидается песком, зарывается. Поймать: зажать с двух сторон
//      (в одиночку — оставленный герой стоит «стенкой»), отбить песок назад или найти Совиным взором Пелагеи, когда зарылся.
//   Конец: Потап дарит раку золотой купол упавшей башенки — новый домик с колокольчиком; рак пляшет и срезает клешнями
//      водоросли с ворот Китежа.
WHO.otshel=['Рак-Отшельник','#ffa070'];VOICE.otshel={f:170,w:'square',sp:0.1};
FOE.otshel={r:1.55,emb:6,sig:['yellow','red'],sp:1.25,look:'hermit',big:true};
FOE.otshel2={r:0.9,emb:3,sig:['blue'],sp:3.0,look:'hermit2',ranged:true};
// тело рака: панцирь, глаза на стебельках, большая и малая клешни, ножки
function hermitBody(inner,o){const red=M(0xe06a3a),dk=M(0x9a3a22),pale=M(0xffc7a0),body=new THREE.Group();inner.add(body);
  const shell=new THREE.Mesh(new THREE.SphereGeometry(0.62,12,9),red);shell.scale.set(1.25,0.62,1.0);shell.position.set(0,0.62,0.25);body.add(shell);
  for(let i=0;i<4;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(0.55-i*0.1,0.035,4,14,Math.PI),dk);t.rotation.set(0,0,0);t.position.set(0,0.72,0.1+i*0.12);t.rotation.x=-0.25;body.add(t);}
  const stalks=[];for(const sd of[-1,1]){const st=new THREE.Group();st.position.set(sd*0.26,0.9,0.62);body.add(st);addMesh(new THREE.CylinderGeometry(0.05,0.06,0.6,6),dk,0,0.3,0,st);stalks.push(st);}
  const claws=[];for(const sd of[-1,1]){const big=sd>0,s=big?1.35:0.85,c=new THREE.Group();c.position.set(sd*0.72,0.6,0.62);body.add(c);
    const arm=new THREE.Mesh(new THREE.CylinderGeometry(0.09*s,0.11*s,0.5*s,7),red);arm.rotation.x=Math.PI/2;arm.position.z=0.2*s;c.add(arm);
    const palm=new THREE.Mesh(new THREE.SphereGeometry(0.24*s,9,7),red);palm.scale.set(0.85,0.7,1.25);palm.position.z=0.55*s;c.add(palm);
    const fix=new THREE.Mesh(new THREE.ConeGeometry(0.1*s,0.42*s,6),red);fix.rotation.x=Math.PI/2;fix.position.set(0,0.06*s,0.86*s);c.add(fix);
    const mov=new THREE.Group();mov.position.set(0,-0.06*s,0.66*s);c.add(mov);const mv=new THREE.Mesh(new THREE.ConeGeometry(0.08*s,0.38*s,6),pale);mv.rotation.x=Math.PI/2;mv.position.z=0.18*s;mov.add(mv);
    claws.push({g:c,mov,s});}
  const legs=[];for(const sd of[-1,1])for(let i=0;i<3;i++){const l=new THREE.Group();l.position.set(sd*0.62,0.42,0.42-i*0.28);body.add(l);const a=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.03,0.6,5),dk);a.position.set(sd*0.24,-0.08,0);a.rotation.z=-sd*1.0;l.add(a);
    const b=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.02,0.5,5),dk);b.position.set(sd*0.5,-0.3,0);b.rotation.z=-sd*0.25;l.add(b);legs.push(l);}
  const mouth=new THREE.Mesh(new THREE.TorusGeometry(0.1,0.025,4,10,Math.PI),MAT.dark);mouth.position.set(0,0.55,0.88);mouth.rotation.z=Math.PI;body.add(mouth);
  return {body,stalks,claws,legs,mouth};}
// витая раковина в мороке
function hermitShellMesh(){const g=new THREE.Group();const cream=M(0xf2dcc0),pink=M(0xe8a8a0),spots=[];
  for(let i=0;i<7;i++){const r=0.95-i*0.12,t=new THREE.Mesh(new THREE.TorusGeometry(r,0.32-i*0.035,8,18),i%2?pink:cream);t.rotation.x=Math.PI/2;t.position.set(Math.sin(i*1.1)*0.12,0.25+i*0.27,Math.cos(i*1.1)*0.12);g.add(t);}
  const tip=new THREE.Mesh(new THREE.ConeGeometry(0.28,0.7,10),cream);tip.position.y=2.25;g.add(tip);
  const mo=M(0x3a1450,{emissive:0x6a2a9a,emissiveIntensity:0.9});
  for(let i=0;i<6;i++){const a=i*1.05,y=0.35+i*0.3,r=0.98-i*0.1;const sp=new THREE.Mesh(new THREE.SphereGeometry(0.2,8,6),mo);sp.scale.set(1,0.55,1);sp.position.set(Math.cos(a)*r,y,Math.sin(a)*r);sp.lookAt(0,y,0);g.add(sp);spots.push(sp);
    for(let k=0;k<3;k++){const v=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.015,0.45,4),mo);v.position.copy(sp.position).add(new V3(rand(-0.15,0.15),rand(-0.2,0.2),rand(-0.15,0.15)));v.rotation.set(rand(0,3),rand(0,3),rand(0,3));g.add(v);sp.add(v.clone());}}
  return {g,spots};}
FL.hermit=(inner)=>{const B=hermitBody(inner);const S=hermitShellMesh();S.g.position.set(0,0.35,-0.45);S.g.rotation.x=-0.55;S.g.scale.setScalar(1.15);B.body.add(S.g);
  return Object.assign(B,{shellG:S.g,spots:S.spots,eyeY:1.52,eyeZ:0.62,eyeX:0.26,eyeS:1.35,top:2.7,lid:hp(0xe06a3a),noThreads:true});};
FL.hermit2=(inner)=>{const B=hermitBody(inner);const pk=M(0xffb4b8),bl=MB(0xff7a8a,{transparent:true,opacity:0.55});
  const tail=new THREE.Group();tail.position.set(0,0.55,-0.35);B.body.add(tail);for(let i=0;i<5;i++){const sp=new THREE.Mesh(new THREE.SphereGeometry(0.4-i*0.06,10,8),pk);sp.position.set(Math.sin(i*0.9)*0.2,0.1+i*0.18,-i*0.24);tail.add(sp);}
  for(const sd of[-1,1]){const c=new THREE.Mesh(new THREE.CircleGeometry(0.1,10),bl);c.position.set(sd*0.42,0.66,0.93);B.body.add(c);}
  return Object.assign(B,{tail,eyeY:1.52,eyeZ:0.62,eyeX:0.26,eyeS:1.35,top:1.9,lid:hp(0xe06a3a),noThreads:true});};
// песок вместо капли: летит та же «синяя капля», отбил вовремя — рак сам себя песком
{const _sb=spawnBolt;spawnBolt=function(e,h){_sb(e,h);if(!e||e.kind!=='otshel2')return;const b=W.bolts[W.bolts.length-1];if(!b)return;W.group.remove(b.g);
  const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(0.22,0),M(0xe8cc8a,{emissive:0x6a5020,emissiveIntensity:0.5})));
  g.add(new THREE.Mesh(new THREE.SphereGeometry(0.42,10,8),MB(0x9fd0ff,{transparent:true,opacity:0.25,depthWrite:false})));g.position.copy(b.p);W.group.add(g);b.g=g;b.p=g.position;};}
// золотой купол — новый домик рака (луковка с колокольчиком)
function hermitDome(){const g=new THREE.Group();const gold=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.45}),rim=M(0xd8c090);
  const onion=new THREE.Mesh(new THREE.SphereGeometry(1.0,14,10,0,Math.PI*2,0,Math.PI*0.62),gold);onion.scale.set(1,1.05,1);onion.position.y=0.25;g.add(onion);
  const tip=new THREE.Mesh(new THREE.ConeGeometry(0.42,1.0,12),gold);tip.position.y=1.42;g.add(tip);addMesh(new THREE.SphereGeometry(0.11,8,6),gold,0,1.98,0,g);
  const band=new THREE.Mesh(new THREE.TorusGeometry(0.82,0.07,6,20),rim);band.rotation.x=Math.PI/2;band.position.y=-0.1;g.add(band);
  const bell=new THREE.Group();bell.position.y=-0.18;g.add(bell);addMesh(new THREE.ConeGeometry(0.16,0.24,10),gold,0,0,0,bell);addMesh(new THREE.SphereGeometry(0.05,6,5),gold,0,-0.14,0,bell);
  g.userData.bell=bell;g.traverse(c=>{c.userData.noBatch=true;});return g;}
FIN.hermitBoss=function(o){const F=W.flags,z0=o.z0,z1=o.z1,X0=-10,X1=10,mid=(z0+z1)/2;
  const sand=M(0xd8c89a),stone=M(0xb8b4a4),coral=[0xff8a8a,0xffb07a,0xd08ae0,0x8ad0e0];
  ground(-11,11,z1,z0,0,sand);
  for(let i=0;i<9;i++){const sd=i%2?1:-1,z=z0-3-i*4.6;const c=new THREE.Group();c.position.set(sd*rand(8.6,10.2),0,z);W.group.add(c);const cm=M(coral[i%4]);
    for(let k=0;k<5;k++){const b=addMesh(new THREE.CylinderGeometry(0.08,0.14,rand(1.2,2.6),5),cm,rand(-0.5,0.5),0.9,rand(-0.5,0.5),c);b.rotation.set(rand(-0.4,0.4),0,rand(-0.4,0.4));}}
  // обломок башенки и золотой купол на песке — будущий домик
  addMesh(new THREE.CylinderGeometry(1.1,1.3,2.4,10),M(0xe8e0cc),8.2,1.2,mid+6);W.cyls.push({x:8.2,z:mid+6,r:1.3,miny:-1,maxy:2.4,on:true});
  const dome=hermitDome();dome.position.set(6.6,0.5,mid+3.2);dome.rotation.z=1.1;dome.rotation.y=0.6;W.group.add(dome);const domeCyl={x:6.6,z:mid+3.2,r:0.9,miny:-1,maxy:1.6,on:true};W.cyls.push(domeCyl);
  // стена водорослей с мороком перед воротами Китежа
  const weed=new THREE.Group();W.group.add(weed);const wm=M(0x2f5a3a),mo=M(0x3a1450,{emissive:0x6a2a9a,emissiveIntensity:0.7});
  for(let x=-10.6;x<=10.6;x+=0.55){const h=rand(4,6.4);const b=addMesh(new THREE.ConeGeometry(0.22,h,4),Math.random()<0.25?mo:wm,x,h/2,z1+0.9+rand(-0.25,0.25),weed);b.rotation.z=rand(-0.12,0.12);}
  const weedCol=colBox(-11,11,0,6,z1+0.4,z1+1.4,false);
  // ракушка-музыкалка: сыграешь — рак заслушается
  const LURE={hum:0,ring(h){const was=LURE.hum;LURE.hum=6;if(was<=0){[72,76,79,84].forEach((m,i)=>gusli(m,i*0.1,0.12));}}};
  const LP={x:0,z:z0-7};const lureShell=kwShell('dance',LP.x,LP.z,0,LURE,{say:'Послушай, рак!'});
  box(LP.x-0.55,LP.x+0.55,0,0.5,LP.z-0.55,LP.z+0.55,M(0x8a5a2e),{occ:false});
  const HB={phase:0,e:null,lure:LURE,dome,weed,weedCol,LP,friend:null,danceT:0,digT:0,stunCd:0};
  // ---- этап 1 ----
  function spawn1(){const e=makeFoe('otshel',0,mid,{leash:14});HB.e=e;e.noKill=true;e.dance=false;e.dazeT=0;
    e.guardAll=()=>!e.dance&&e.state!=='broken'&&e.state!=='dying';e.darkGuard=()=>!e.dance;e.guardText='В раковине — не пробить! Сыграй на гуслях у ракушки-музыкалки — заслушается, выглянет';
    e.onFinisher=h=>{if(h.kind!=='potap'){floatText(e.pos.clone().add(new V3(0,3.2,0)),'Потап — тяни его за клешню!','#ffd9a0');if(!F.hbPullTold){F.hbPullTold=true;for(const p of[0,1])tip(p,'Пробой! Вытянуть рака из раковины может только Потап — подойди им и бей '+K(p,'attack')+'.<br>В одиночку смени героя '+K(p,'swap')+'.',3.6);}return;}pullOut(h);};
    e.tick=(e,dt)=>{const near=hd(e.pos,LP)<22,ok=e.state!=='broken'&&e.state!=='dying'&&e.state!=='spawn';
      if(LURE.hum>0&&near&&ok){if(!e.dance){e.dance=true;SFX.ok();floatText(e.pos.clone().add(new V3(0,3.4,0)),'Ой, музыка! Пляшу!','#ffe08a');if(!F.hbDanceTold){F.hbDanceTold=true;for(const p of[0,1])tip(p,'Заслушался! Пока играют гусли — рак выглянул и пляшет: бей '+K(p,'attack')+'!',3);}}
        e.dazeT=Math.max(e.dazeT,0.3);e.cd=Math.max(e.cd,1.0);e.face=angDamp(e.face,Math.atan2(LP.x-e.pos.x,LP.z-e.pos.z),3,dt);}
      else if(e.dance){e.dance=false;floatText(e.pos.clone().add(new V3(0,3.4,0)),'Хм! Опять шумите?','#ffb0a0');}
      if(e.state==='broken'&&!e.bset){e.bset=true;e.bdur=12;}if(e.state!=='broken')e.bset=false;};
    e.post=(e,dt)=>{const L=e.L,st=e.state,w=st==='wind'||st==='ready';const t=G.time;
      L.spots.forEach((sp,i)=>{sp.visible=i<e.embers;});
      // в раковине — только кончики клешней; пляшет — весь наружу
      const out=e.dance||st==='broken'?1:w||st==='strike'?0.6:0.15;e.outK=damp(e.outK||0,out,6,dt||0.016);
      L.body.position.y=-0.35*(1-e.outK)+(e.dance?Math.abs(Math.sin(t*6))*0.18:0);L.shellG.position.y=0.35+0.35*(1-e.outK);
      L.body.rotation.z=e.dance?Math.sin(t*3)*0.18:0;L.stalks.forEach((s,i)=>{s.scale.y=0.4+0.6*e.outK;s.rotation.z=Math.sin(t*4+i)*0.15;});
      L.claws.forEach((c,i)=>{c.g.rotation.x=e.dance?-0.9+Math.sin(t*6+i*Math.PI)*0.5:w?-0.4:0;c.mov.rotation.x=e.dance||w?Math.abs(Math.sin(t*12+i))*0.6:0.1;});
      L.legs.forEach((l,i)=>{l.rotation.x=Math.sin(t*(e.dance?10:4)+i)*0.2;});};
    return e;}
  // ---- переход: Потап тянет рака из раковины ----
  function pullOut(h){const e=HB.e;if(HB.phase!==1)return;HB.phase=1.5;const P=HERO.potap,at=e.pos.clone();
    const shellProp=new THREE.Group();W.group.add(shellProp);const SM=hermitShellMesh();SM.g.scale.setScalar(1.15*1.55);shellProp.add(SM.g);shellProp.position.set(at.x,0.2,at.z-0.6);shellProp.visible=false;
    play({dur:6.4,fov:46,shots:[shot(0,[at.x+5,3.4,at.z+5.5],[at.x,1.4,at.z]),shot(3.2,[at.x-4,2.4,at.z+4.2],[at.x,1.2,at.z])],
      says:[[0.2,2.4,'potap','А ну-ка, вылезай! Раз-два — взяли!'],[3.4,2.8,'otshel','Ой-ой! Без домика… стыдно-то как!']],
      events:[{t:0,fn:()=>{placeOnGround(P,at.x+0.4,at.z+2.4,0);P.face=Math.PI;for(const q of HEROES)if(q!==P&&hd(q.pos,at)<3)placeOnGround(q,q.pos.x+(q.pos.x<at.x?-2:2),q.pos.z+2,0);}},
        {t:0.4,fn:()=>{anim(2.2,k=>{P.pos.z=at.z+2.4+Math.sin(k*Math.PI*6)*0.15+k*0.6;e.g.position.z=at.z+Math.sin(k*Math.PI*6)*0.2;});}},
        {t:2.6,fn:()=>{SFX.crash();shakeAll(0.06,0.3);e.alive=false;e.state='dying';W.group.remove(e.g);const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);
          shellProp.visible=true;anim(2.4,k=>{shellProp.position.set(at.x-k*5.5,0.2+Math.abs(Math.sin(k*Math.PI*3))*0.6*(1-k),at.z-0.6-k*2);shellProp.rotation.z=-k*7;});
          later(2.5,()=>{burst(shellProp.position.clone().add(new V3(0,1,0)),0x6a2a9a,26,4);burst(shellProp.position.clone().add(new V3(0,1,0)),0xf2dcc0,18,3);SFX.brk();W.group.remove(shellProp);});
          spawn2(at.x,at.z+0.4);HB.e.state='idle';HB.e.pos.y=0;HB.e.dazeT=2.5;}},
        {t:3.2,fn:()=>{const e2=HB.e;anim(2.6,k=>{e2.L.claws.forEach(c=>{c.g.rotation.x=-1.5;});e2.L.body.rotation.z=Math.sin(k*30)*0.05;});}}],
      end:()=>{HB.phase=2;banner('Рак без домика!','#ffb0a0',2.4,'удирает и стесняется: зажмите его с двух сторон, отбейте песок, а зароется — Совиный взор');
        for(const p of[0,1])tip(p,'Рак удирает! Зажмите его с двух сторон — замрёт.<br>Песок отбей щитом '+K(p,'guard')+' в последний миг, а зароется — Совиный взор Пелагеи найдёт.',4.2);}});}
  // ---- этап 2 ----
  function unearth(e,txt){e.dug=false;e.g.visible=true;HB.mound.visible=false;burst(e.pos.clone().add(new V3(0,0.4,0)),0xd8c89a,10,2);if(txt)floatText(e.pos.clone().add(new V3(0,1.8,0)),txt,'#e8d8a8');}
  function stun(e,dur,txt){if(HB.stunCd>0||!e.alive||e.state==='broken')return;HB.stunCd=dur+0.8;e.dazeT=dur;e.dug=false;e.g.visible=true;HB.mound.visible=false;SFX.ok();
    floatText(e.pos.clone().add(new V3(0,2.4,0)),txt,'#ffe08a');for(let i=0;i<6;i++)burst(e.pos.clone().add(new V3(0,1.2,0)),0xfff2b0,3,2,0.5);}
  function spawn2(x,z){const e=makeFoe('otshel2',x,z,{leash:30});HB.e=e;e.noKill=true;e.noMove=true;e.dug=false;e.digCd=9;e.dazeT=0;
    e.guardAll=()=>!(e.dazeT>0)&&e.state!=='broken'&&e.state!=='dying';e.guardText='Удирает! Зажмите с двух сторон — или песок его отбей назад!';
    e.onReflect=b=>{stun(e,3,'Сам себя песком! Ой!');};
    e.onFinisher=h=>homeScene();
    e.tick=(e,dt)=>{HB.stunCd=Math.max(0,HB.stunCd-dt);if(e.state==='spawn'||e.state==='dying')return;e.pos.y=0;e.baseY=0;
      const ctl=HEROES.filter(q=>q.active&&!players[q.player].downed&&!q.cling);let h=null,bd=99;for(const q of ctl){const d=hd(q.pos,e.pos);if(d<bd){bd=d;h=q;}}
      // зажали: двое по разные стороны, оба близко
      const posts=HEROES.filter(q=>(q.active||!q.following)&&!q.cling&&hd(q.pos,e.pos)<4.2&&Math.abs(q.pos.y-e.pos.y)<1.5);
      if(!(e.dazeT>0)&&e.state!=='broken'&&posts.length>=2){for(let i=0;i<posts.length&&!(e.dazeT>0);i++)for(let j=i+1;j<posts.length;j++){const a=posts[i].pos,b=posts[j].pos;
        const ax=a.x-e.pos.x,az=a.z-e.pos.z,bx=b.x-e.pos.x,bz=b.z-e.pos.z,c=(ax*bx+az*bz)/((Math.hypot(ax,az)*Math.hypot(bx,bz))||1);if(c<-0.35){stun(e,3.2,'Окружили! Попался!');break;}}}
      // зарылся в песок
      if(e.dug){e.digT-=dt;if(e.digT<=0)unearth(e,'Вылез!');}
      else if(!(e.dazeT>0)&&e.state==='idle'){e.digCd-=dt;if(e.digCd<=0){e.dug=true;e.digT=5;e.digCd=rand(10,13);e.g.visible=false;HB.mound.visible=true;SFX.water();burst(e.pos.clone().add(new V3(0,0.4,0)),0xd8c89a,16,2.5);
        floatText(e.pos.clone().add(new V3(0,1.4,0)),'Зарылся в песок!','#e8d8a8');if(!F.hbDigTold){F.hbDigTold=true;tip(1,'Рак зарылся! Совиный взор Пелагеи '+K(1,'skill')+' найдёт его под песком.',3.2);}}}
      HB.mound.position.set(e.pos.x,0.05,e.pos.z);HB.mound.rotation.y+=dt*2;
      // удирает от ближнего: вбок и прочь, вдоль стенок арены
      if(h&&!(e.dazeT>0)&&e.state!=='broken'&&(e.state==='idle'||e.state==='recover')&&bd<7.5){const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz)||1;let vx=dx/d,vz=dz/d;
        const sx=-vz,sz=vx,sd=Math.sin(G.time*0.7+e.home.x)>0?1:-1;vx+=sx*0.5*sd;vz+=sz*0.5*sd;
        if(e.pos.x<X0+1.5)vx+=1.2;if(e.pos.x>X1-1.5)vx-=1.2;if(e.pos.z>z0-2)vz-=1.2;if(e.pos.z<z1+3)vz+=1.2;const n=Math.hypot(vx,vz)||1,sp=(e.dug?1.4:3.0)*(G.slowFoes>0?0.5:1);
        const nx=clamp(e.pos.x+vx/n*sp*dt,X0,X1),nz=clamp(e.pos.z+vz/n*sp*dt,z1+2,z0-1.5);const r=collideXZ(nx,nz,e.r,0,1.2,true);e.pos.x=r.x;e.pos.z=r.z;e.face=angDamp(e.face,Math.atan2(vx,vz),8,dt);e.runT=0.2;}
      else e.runT=Math.max(0,(e.runT||0)-dt);
      if(e.dug)e.cd=Math.max(e.cd,0.5);};
    e.post=(e,dt)=>{const L=e.L,t=G.time,run=e.runT>0,dz=e.dazeT>0;L.legs.forEach((l,i)=>{l.rotation.x=Math.sin(t*(run?22:5)+i*1.3)*(run?0.5:0.15);});
      L.claws.forEach((c,i)=>{c.g.rotation.x=dz?-1.3+Math.sin(t*8+i)*0.2:run?-0.2:-1.2;c.mov.rotation.x=0.2;});L.body.rotation.z=dz?Math.sin(t*9)*0.15:0;L.tail.rotation.x=Math.sin(t*3)*0.1;
      L.stalks.forEach((s,i)=>{s.rotation.z=dz?Math.sin(t*10+i*2)*0.5:Math.sin(t*3+i)*0.1;});};
    return e;}
  HB.mound=new THREE.Group();W.group.add(HB.mound);HB.mound.visible=false;{const mm=M(0xd8c89a);addMesh(new THREE.SphereGeometry(0.8,10,6,0,Math.PI*2,0,Math.PI/2),mm,0,0,0,HB.mound).scale.y=0.45;}
  // ---- конец: новый домик ----
  function homeScene(){if(HB.phase>=3)return;HB.phase=3;const e=HB.e,at=e.pos.clone(),P=HERO.potap,T=HERO;e.alive=false;e.state='dying';W.group.remove(e.g);{const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);}
    const fr=new THREE.Group();fr.position.set(at.x,0,at.z);W.group.add(fr);const inner=new THREE.Group();fr.add(inner);const L=FL.hermit2(inner);fr.traverse(c=>{c.userData.noBatch=true;});
    for(const sd of[-1,1]){const ey=new THREE.Group();ey.position.set(sd*0.26,1.52,0.62);inner.add(ey);addMesh(new THREE.SphereGeometry(0.13,10,8),M(0xfff3a0,{emissive:0xfff3a0,emissiveIntensity:0.8}),0,0,0,ey);addMesh(new THREE.SphereGeometry(0.06,8,6),MAT.dark,0,0,0.1,ey);}
    HB.friend={g:fr,L};const d0=dome.position.clone(),r0=dome.rotation.clone();
    play({dur:16,fov:46,shots:[shot(0,[at.x+3.8,2.6,at.z+5],[at.x,1,at.z]),shot(3.4,[at.x-4.6,3.4,at.z+4.6],[(at.x+d0.x)/2,1.6,(at.z+d0.z)/2]),shot(7,[at.x+2.6,2.2,at.z+3.6],[at.x,1.6,at.z]),shot(11.2,[at.x*0.5,4.2,z1+9],[0,2.4,z1+1])],
      says:[[0.3,2.8,'yosha','Ему просто домика нет! Вот и сердился.'],[3.5,3.0,'potap','Вот тебе терем! Золотой, с колокольчиком!'],[7.4,3.4,'otshel','Ой, какой домик! Звонкий! Спасибо, малые!'],[11.4,3.2,'zven','Вот и подружились! А Китеж — за воротами!']],
      events:[{t:0,fn:()=>{const pl=[[at.x-2.2,at.z+1.6],[at.x+2.2,at.z+1.6],[at.x-1.2,at.z+2.8],[at.x+1.2,at.z+2.8]];HEROES.forEach((q,i)=>{placeOnGround(q,clamp(pl[i][0],-9,9),pl[i][1],0);q.face=Math.atan2(at.x-q.pos.x,at.z-q.pos.z);});
          anim(3,k=>{L.claws.forEach(c=>{c.g.rotation.x=-1.4;});L.body.rotation.z=Math.sin(k*40)*0.04;});}},
        {t:3.6,fn:()=>{placeOnGround(P,d0.x-1.2,d0.z+0.6,0);P.face=Math.atan2(d0.x-P.pos.x,d0.z-P.pos.z);SFX.toss();
          domeCyl.on=false;anim(3.2,k=>{const kk=smooth(k);dome.position.set(lerp(d0.x,at.x,kk),lerp(d0.y,1.0,kk)+Math.sin(k*Math.PI)*3.2,lerp(d0.z,at.z-0.75,kk));dome.rotation.set(lerp(r0.x,-0.45,kk),lerp(r0.y,0,kk)+k*6.28,lerp(r0.z,0,kk));});}},
        {t:6.8,fn:()=>{SFX.thud();gusli(84,0,0.25);later(0.25,()=>gusli(88,0,0.2));for(let i=0;i<14;i++)burst(new V3(at.x+rand(-1,1),rand(0.5,2.5),at.z+rand(-1,1)),i%2?COL.gold:0xffe8b0,3,3);
          for(let i=0;i<10;i++)burst(new V3(at.x+rand(-1.2,1.2),1,at.z+rand(-1.2,1.2)),0x6a2a9a,2,2,0.6);}},
        {t:7.2,fn:()=>{fr.add(dome);dome.position.set(0,1.0,-0.75);dome.rotation.set(-0.45,0,0);anim(4,k=>{fr.position.y=Math.abs(Math.sin(k*Math.PI*6))*0.35;fr.rotation.y=Math.sin(k*Math.PI*4)*0.6;
          L.claws.forEach((c,i)=>{c.g.rotation.x=-1.2+Math.sin(k*40+i*Math.PI)*0.5;});dome.userData.bell.rotation.z=Math.sin(k*30)*0.5;});
          for(const q of HEROES)anim(3,k=>{q.extraY=Math.abs(Math.sin(k*Math.PI*4))*0.3;});}},
        {t:11.2,fn:()=>{SFX.gate();anim(2.2,k=>{weed.scale.y=Math.max(0.01,1-k);weed.position.y=-0.2*k;});later(2.2,()=>{weed.visible=false;});weedCol.on=false;
          fr.position.set(-6.5,0,z1+4);fr.rotation.y=0;for(let i=0;i<8;i++)burst(new V3(rand(-10,10),rand(1,4),z1+1),0x8ad08a,3,3);}}],
      end:()=>{F.hermitWon=true;for(const q of HEROES)q.extraY=0;weed.visible=false;weedCol.on=false;if(dome.parent!==fr){fr.add(dome);}dome.position.set(0,1.0,-0.75);dome.rotation.set(-0.45,0,0);fr.position.set(-6.5,0,z1+4);
        banner('Подружились!','#ffd76a',2.4,'у рака новый домик — ворота Китежа открыты');}});}
  // ---- вход на арену ----
  function introScene(){HB.phase=0.5;const e=spawn1();
    play({dur:8.2,fov:46,shots:[shot(0,[0,3.8,z0-1],[0,1.6,mid],[0,2.6,mid+7],[0,1.6,mid],3.4),shot(4.2,[3.4,2.2,mid+4.6],[0,1.8,mid])],
      says:[[0.4,3.2,null,'<i>Перед воротами Китежа — огромная витая раковина, вся в тёмном мороке.</i>',true],[4.3,3.4,'otshel','Кто тут шумит? Это МОЙ дом! Уходите!']],
      events:[{t:1.5,fn:()=>{SFX.thud();shakeAll(0.04,0.4);}},{t:4.2,fn:()=>{anim(1.2,k=>{e.outK=Math.sin(k*Math.PI)*0.7;});}}],
      end:()=>{HB.phase=1;banner('Рак-Отшельник!','#ffb07a',2.6,'в раковине его не пробить — а музыку он любит');
        for(const p of[0,1])tip(p,'Раковину не пробить. Сыграй на гуслях '+K(p,'item')+' у ракушки-музыкалки — рак заслушается и выглянет.<br>Один играет — другой бьёт! В одиночку: сыграй и смени героя '+K(p,'swap')+' — оставленный доиграет.',4.6);}});}
  W.updates.push(dt=>{LURE.hum=Math.max(0,LURE.hum-dt);
    if(HB.phase===0&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<z0-3&&active(pi).pos.y>-1))introScene();
    if(HB.friend&&F.hermitWon){const t=G.time;HB.friend.g.rotation.y=Math.sin(t*1.2)*0.4;HB.friend.L.claws.forEach((c,i)=>{c.g.rotation.x=-0.8+Math.sin(t*4+i*Math.PI)*0.4;});}
    dome.userData.bell.rotation.z=Math.sin(G.time*2)*0.15;});
  {const prev=W.onOwl;W.onOwl=h=>{if(prev)prev(h);const e=HB.e;if(HB.phase===2&&e&&e.alive&&e.dug&&hd(h.pos,e.pos)<16)later(0.3,()=>{if(e.dug){unearth(e,null);stun(e,3.2,'Нашли! Вот ты где!');}});};}
  HB.dbg=()=>({phase:HB.phase,e:HB.e,LURE,lureShell,dome,weedCol,LP});
  HB.skip=()=>{HB.phase=3;if(HB.e){HB.e.alive=false;W.group.remove(HB.e.g);const i=W.enemies.indexOf(HB.e);if(i>=0)W.enemies.splice(i,1);}weed.visible=false;weedCol.on=false;F.hermitWon=true;};
  HB.phase1=()=>HB.phase===1;
  return HB;};
