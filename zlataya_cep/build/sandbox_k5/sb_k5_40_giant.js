/* ============================== ПОЛИГОН КОЩЕЯ · ЭТАП 5 «ИГЛА»: ЦЕПНОЙ ВЕЛИКАН, «МАТРЁШКА», КОВКА В ТАКТ (шаг 4) ============================== */
// Великан 15 м из цепных звеньев, Кощей виден в груди. Кулак бьёт в красный круг и лежит 6 с — по руке можно взбежать на плечо.
// На плече сундук: сундук (удар; Потапу — с одного) → заяц (догнать) → утка (ударить, когда низко) → яйцо (поймать в круге) → игла.
// Игла — к наковальне: ковка в такт — один бьёт по наковальне, другой — по цепи на ноге великана, оба на «бом». Друзья держат великана.
const K5G_C=new V3(0,0,-11);
const K5LINK=new THREE.TorusGeometry(0.42,0.11,6,12),K5LM=M(0x2a2630,{emissive:0x2a0a3a,emissiveIntensity:0.5});
function k5Chain(parent,a,b,n){const links=[];for(let i=0;i<n;i++){const k=(i+0.5)/n;const m=k5noRay(new THREE.Mesh(K5LINK,K5LM));m.position.lerpVectors(a,b,k);m.lookAt(b);m.rotateY(Math.PI/2);if(i%2)m.rotateX(Math.PI/2);parent.add(m);links.push(m);}return links;}
K5SB.scenes.s5={goal:pi=>{const S=K5SB.scenes.s5;return ({slam:'Этап 5. Кулак великана лежит — взбеги по руке на плечо!',chest:'На плече сундук: бей его (Потапу хватит одного удара).',hare:'Заяц выскочил — догони его!',duck:'Утка! Ударь её, когда снизится.',egg:'Яйцо падает — встань в золотой круг!',forge:'Ковка в такт: '+(G.solo?'бей у наковальни':(pi===0?'бей у наковальни':'бей цепь на ноге великана'))+' на «бом» (кольцо сошлось).',done:'Великан рассыпался. N — страница сказки.'})[S.ph]||'';},
  build(){const S=this;setTheme('dark');scene.fog=new THREE.Fog(0x140c20,18,70);ground(-18,18,-24,14,0,M(0x2e2a36));S.ph='slam';S.links=[];
    const g=new THREE.Group();g.position.copy(K5G_C);W.group.add(g);S.g=g;
    for(const s of [-1,1])S.links.push(...k5Chain(g,new V3(s*2.2,0,0),new V3(s*2.0,6.5,0),9));
    for(let y=6.5;y<=11.5;y+=1.25)for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const m=k5noRay(new THREE.Mesh(K5LINK,K5LM));m.position.set(Math.cos(a)*2.6,y,Math.sin(a)*1.6);m.rotation.y=-a;g.add(m);S.links.push(m);}
    const head=k5noRay(new THREE.Mesh(new THREE.DodecahedronGeometry(1.6,0),M(0x24202c,{emissive:0x1a0828})));head.position.set(0,13.6,0);g.add(head);S.head=head;
    for(const s of [-1,1]){const e=k5noRay(new THREE.Mesh(new THREE.SphereGeometry(0.25,8,6),MB(0xb070ff)));e.position.set(s*0.6,13.9,1.35);g.add(e);}
    S.links.push(...k5Chain(g,new V3(-2.8,11,0),new V3(-4.2,5.5,1.5),7));
    // правая рука — шарнир у плеча
    const arm=new THREE.Group();arm.position.set(3.2,10.5,0);g.add(arm);S.arm=arm;S.armLinks=k5Chain(arm,new V3(0,0,0),new V3(0,-10,0),12);S.links.push(...S.armLinks);
    const fist=k5noRay(new THREE.Mesh(new THREE.DodecahedronGeometry(1.1,0),K5LM));fist.position.set(0,-10.4,0);arm.add(fist);S.fist=fist;
    // Кощей в груди
    S.K=makeKoschei();S.K.g.scale.setScalar(0.55);S.K.g.position.set(K5G_C.x,7.3,K5G_C.z+0.3);if(S.K.rig&&S.K.rig.mouth)S.K.rig.mouth.userData.hold=true;
    // плечо: площадка и сундук
    S.sh=new V3(K5G_C.x+3.2,10.5,K5G_C.z);colBox(S.sh.x-1.6,S.sh.x+1.6,S.sh.y-0.5,S.sh.y,S.sh.z-1.6,S.sh.z+1.6,false);
    const plat=k5noRay(addMesh(new THREE.BoxGeometry(3.2,0.5,3.2),M(0x3a3444),S.sh.x,S.sh.y-0.25,S.sh.z));plat.castShadow=false;
    S.chest=new THREE.Group();S.chest.position.set(S.sh.x,S.sh.y,S.sh.z);W.group.add(S.chest);addMesh(new THREE.BoxGeometry(1.2,0.8,0.8),M(0x7a4a24),0,0.4,0,S.chest);
    S.lid=new THREE.Group();S.lid.position.set(0,0.8,-0.4);S.chest.add(S.lid);addMesh(new THREE.BoxGeometry(1.24,0.22,0.84),M(0x9a5a2a),0,0.11,0.4,S.lid);S.chest.traverse(o=>k5noRay(o));S.chestHp=3;
    k5Label('сундук',S.sh.x,S.sh.y+2,S.sh.z,'#ffd76a',2.6);
    // рука лежит — по ней можно идти (поверхность по отрезку от кулака к плечу)
    S.ramp=null;W.surfs.push((x,z,reach)=>{const R=S.ramp;if(!R)return null;const dx=R.b.x-R.a.x,dz=R.b.z-R.a.z,L2=dx*dx+dz*dz;let t=((x-R.a.x)*dx+(z-R.a.z)*dz)/L2;if(t<-0.05||t>1.02)return null;t=clamp(t,0,1);
      const px=R.a.x+dx*t,pz=R.a.z+dz*t;if(Math.hypot(x-px,z-pz)>1.25)return null;const y=R.a.y+(R.b.y-R.a.y)*t;if(y>reach+0.001)return null;return {y};});
    // друзья держат великана
    const L=makeLeshy?makeLeshy(1.3):null;if(L){L.g.position.set(K5G_C.x-5,0,K5G_C.z+2);L.g.rotation.y=0.8;L.g.traverse(o=>k5noRay(o));}k5Label('Леший держит корнями',K5G_C.x-5,4.6,K5G_C.z+2,'#a8e08a',3.6);
    for(let i=0;i<5;i++){const c=k5noRay(addMesh(new THREE.CylinderGeometry(0.12,0.18,3,5),M(0x5a3a1a),K5G_C.x-2.2+Math.cos(i)*0.7,1.2,K5G_C.z+Math.sin(i)*0.7));c.rotation.z=0.5*Math.cos(i*2);}
    const gor=makeGorynych?makeGorynych():null;if(gor){gor.g.position.set(13,0,2);gor.g.rotation.y=-2;gor.g.scale.setScalar(0.8);gor.g.traverse(o=>k5noRay(o));S.gor=gor;}k5Label('Горыныч жжёт цепи',13,6.2,2,'#ffb060',3.4);
    const fb=makeFirebird?makeFirebird({}):null;if(fb){fb.g.scale.setScalar(1.4);fb.g.traverse(o=>k5noRay(o));S.fb=fb;}
    S.anv=makeAnvil?makeAnvil(7,6,0,1.4):null;if(S.anv&&S.anv.g&&!S.anv.g.parent)W.group.add(S.anv.g);k5Label('наковальня',7,3,6,'#ffd76a',2.8);colBox(6.2,7.8,0,1.2,5.3,6.7,false);
    S.legP=new V3(K5G_C.x-2.2,0,K5G_C.z+1.4);
    const bb=$('bossbar');bb.style.display='block';bb.innerHTML='<b>Кощей Бессмертный</b> · этап 5 из 5 — Игла: Цепной великан';
    k5Music(5);S.t=0;S.at=2.5;S.armA=0;S.ok=[0,0];
    W.camFn=()=>{const a=G.solo?active(G.soloPi):active(0),b=G.solo?a:active(1),mid=new V3((a.pos.x+b.pos.x)/2,(a.pos.y+b.pos.y)/2,(a.pos.z+b.pos.z)/2);
      const up=Math.max(a.pos.y,b.pos.y)>4;return {pos:mid.clone().add(new V3(up?6:2,up?7:7.5,up?11:17)),look:new V3(mid.x*0.6+K5G_C.x*0.4,up?mid.y+1:5,mid.z*0.5+K5G_C.z*0.5),k:3};};
    W.spawns=[[new V3(-2,0,9),new V3(-4,0,10)],[new V3(2,0,9),new V3(4,0,10)]];},
  update(dt){const S=this;S.t+=dt;const g=S.g;
    // дыхание великана, взгляд, огонь Горыныча, Жар-птица у головы
    if(S.ph!=='done'){g.position.y=Math.sin(S.t*1.1)*0.15;S.head.rotation.y=Math.sin(S.t*0.6)*0.3;if(S.fb){const a=S.t*0.8;S.fb.g.position.set(K5G_C.x+Math.cos(a)*5,14+Math.sin(a*2),K5G_C.z+Math.sin(a)*4);S.fb.g.rotation.y=-a;}
      if(S.gor&&Math.random()<dt*0.8&&FIN.fx)FIN.fx.sparks(new V3(K5G_C.x+rand(-2,2),rand(3,9),K5G_C.z+1.5),3,0xff8a20);}
    if(S.K&&S.K.rig&&S.K.rig.mouth){S.K.rig.mouth.scale.y=S.ph==='done'?0.25:0.6+0.3*Math.sin(S.t*3);}
    if(S.ph==='done')return;
    // удар кулаком: замах (1,2 с) → удар в красный круг → рука лежит 6 с (по ней — на плечо) → подъём
    if(S.arm.userData.st==null){S.arm.userData.st='rest';}
    const st=S.arm.userData.st;S.at-=dt;const shW=new V3(K5G_C.x+3.2,10.5,K5G_C.z),Q0=new THREE.Quaternion();
    if(st==='rest'&&S.at<=0&&(S.ph==='slam'||S.ph==='chest')){const h=k5Near(K5G_C);let dx=h.pos.x-shW.x,dz=h.pos.z-shW.z;const L=Math.hypot(dx,dz)||1;if(L>10){dx*=10/L;dz*=10/L;}
      S.F=new V3(shW.x+dx,0,shW.z+dz);S.arm.userData.st='raise';S.at=1.3;k5Tele(S.F.clone(),2.3,1.3,0xff3030,()=>{});AUD.ready()&&AUD.nz({f0:200,f1:900,d:1.2,v:0.08,q:0.8});}
    else if(st==='raise'){const q=new THREE.Quaternion().setFromUnitVectors(new V3(0,-1,0),new V3(0,0.75,-0.66).normalize());S.arm.quaternion.slerp(q,Math.min(1,dt*3));
      if(S.at<=0){const dir=S.F.clone().add(new V3(0,0.6,0)).sub(shW);S.arm.quaternion.setFromUnitVectors(new V3(0,-1,0),dir.clone().normalize());S.arm.scale.set(1,dir.length()/10.4,1);
        S.arm.userData.st='down';S.at=6;S.ramp={a:new V3(S.F.x,0.6,S.F.z),b:new V3(S.sh.x,S.sh.y,S.sh.z)};shakeAll(0.14,0.45);k5sHurt(S.F,2.3,0);if(FIN.fx)FIN.fx.dust(new V3(S.F.x,0.2,S.F.z),22,0x6a6070,2);
        AUD.ready()&&AUD.osc({f0:110,f1:30,d:0.7,v:0.45});k5Say(new V3(S.F.x,2.5,S.F.z),'По руке — на плечо!','#ffe36b');}}
    else if(st==='down'){if(S.at<=0){S.arm.userData.st='up';S.at=1;S.ramp=null;}}
    else if(st==='up'){S.arm.quaternion.slerp(Q0,Math.min(1,dt*4));S.arm.scale.y+=(1-S.arm.scale.y)*Math.min(1,dt*4);if(S.at<=0){S.arm.quaternion.copy(Q0);S.arm.scale.y=1;S.arm.userData.st='rest';S.at=S.ph==='slam'||S.ph==='chest'?2.2:99;}}
    // на плече — сундук
    const onSh=[0,1].map(pi=>active(pi)).filter(h=>hd(h.pos,S.sh)<2&&h.pos.y>S.sh.y-0.6);
    if(S.ph==='slam'&&onSh.length){S.ph='chest';k5Say(S.sh.clone().add(new V3(0,2.4,0)),'Сундук!','#ffd76a');}
    if(S.ph==='chest')for(const h of onSh){if(k5Swing(h)){S.chestHp-=h.kind==='potap'?3:1;burst(S.chest.position.clone().add(new V3(0,0.8,0)),0xffd76a,6,3);SFX.knock&&SFX.knock();
        if(S.chestHp<=0){S.ph='hare';anim(0.4,k=>S.lid.rotation.x=-k*1.8);k5Say(S.sh.clone().add(new V3(0,2.4,0)),'Заяц!','#ffffff');S.hare=k5Hare(S.sh.clone().add(new V3(0,0.5,0)));}}}
    if(S.ph==='hare'&&S.hare){const H=S.hare;H.t+=dt;if(H.jump<1){H.jump=Math.min(1,H.jump+dt/0.9);H.g.position.lerpVectors(H.from,H.to,H.jump);H.g.position.y=H.from.y*(1-H.jump)+Math.sin(H.jump*Math.PI)*3;}
      else{H.tt-=dt;if(H.tt<=0){H.tt=rand(0.8,1.6);H.dir=rand(0,6.28);}const sp=4.2;H.g.position.x=clamp(H.g.position.x+Math.sin(H.dir)*sp*dt,-15,15);H.g.position.z=clamp(H.g.position.z+Math.cos(H.dir)*sp*dt,-6,12);H.g.rotation.y=H.dir;H.g.position.y=Math.abs(Math.sin(H.t*9))*0.4;
        for(const pi of [0,1]){const h=active(pi);if(hd(h.pos,H.g.position)<1){S.ph='duck';k5Say(H.g.position.clone().add(new V3(0,1.6,0)),'Поймал! Утка!','#ffffff');S.duck=k5Duck(H.g.position.clone());W.group.remove(H.g);S.hare=null;SFX.ok&&SFX.ok();break;}}}}
    if(S.ph==='duck'&&S.duck){const D=S.duck;D.t+=dt;const cyc=D.t%4.5,low=cyc>3.2;const a=D.t*0.9;D.g.position.set(Math.cos(a)*6,low?1.3:4.2,Math.sin(a)*5+2);D.g.rotation.y=-a;D.wing.rotation.z=Math.sin(D.t*18)*0.8;
      if(low)for(const pi of [0,1]){const h=active(pi);if(k5Swing(h)&&hd(h.pos,D.g.position)<2.3){S.ph='egg';const p=D.g.position.clone();W.group.remove(D.g);S.duck=null;burst(p,0xffffff,10,4);S.egg=k5Egg(p);k5Say(p.clone().add(new V3(0,1.5,0)),'Яйцо! Лови!','#ffd76a');break;}}}
    if(S.ph==='egg'&&S.egg){const E=S.egg;E.t+=dt;const k=Math.min(1,E.t/1.6);E.g.position.y=E.y0*(1-k*k);E.g.rotation.z+=dt*6;
      if(k>=1){const got=[0,1].map(pi=>active(pi)).find(h=>hd(h.pos,E.g.position)<1.5);W.group.remove(E.ring);
        if(got){S.ph='forge';W.group.remove(E.g);S.egg=null;k5Say(got.pos.clone().add(new V3(0,2,0)),'Игла!','#ffd76a');SFX.ok&&SFX.ok();S.needle=true;k5ForgeStart(S);}
        else{k5Say(E.g.position.clone().add(new V3(0,1,0)),'Покатилось… ещё раз!','#ffffff');W.group.remove(E.g);S.egg=null;S.ph='duck';S.duck=k5Duck(E.g.position.clone().add(new V3(0,3,0)));}}}
    if(S.ph==='forge')k5ForgeTick(S,dt);}};
function k5Hare(p){const g=new THREE.Group();W.group.add(g);const m=M(0xd8c8a8);addMesh(new THREE.SphereGeometry(0.4,10,8),m,0,0.4,0,g);addMesh(new THREE.SphereGeometry(0.26,8,6),m,0,0.75,0.3,g);
  for(const s of [-1,1])addMesh(new THREE.CylinderGeometry(0.06,0.08,0.55,5),m,s*0.1,1.15,0.25,g);g.traverse(o=>k5noRay(o));const to=new V3(rand(-4,4),0,rand(-2,4));g.position.copy(p);return {g,from:p.clone(),to,jump:0,t:0,tt:0,dir:0};}
function k5Duck(p){const g=new THREE.Group();W.group.add(g);addMesh(new THREE.SphereGeometry(0.45,10,8),M(0x6a8a5a),0,0,0,g);addMesh(new THREE.SphereGeometry(0.25,8,6),M(0x3a7a4a),0,0.3,0.4,g);addMesh(new THREE.ConeGeometry(0.1,0.3,6),M(0xf0a020),0,0.28,0.7,g).rotation.x=Math.PI/2;
  const wing=new THREE.Group();g.add(wing);addMesh(new THREE.BoxGeometry(1.4,0.06,0.4),M(0x5a7a4a),0,0.1,0,wing);g.traverse(o=>k5noRay(o));g.position.copy(p);return {g,wing,t:0};}
function k5Egg(p){const g=k5noRay(new THREE.Mesh(new THREE.SphereGeometry(0.3,10,8),M(0xfff4e0,{emissive:0x806020,emissiveIntensity:0.3})));g.scale.set(1,1.3,1);g.position.copy(p);W.group.add(g);
  const ring=k5noRay(new THREE.Mesh(new THREE.RingGeometry(1.1,1.4,32),new THREE.MeshBasicMaterial({color:0xffd76a,transparent:true,opacity:0.9,depthWrite:false})));ring.rotation.x=-Math.PI/2;ring.position.set(p.x,0.06,p.z);W.group.add(ring);
  return {g,ring,t:0,y0:p.y};}
// ковка в такт: «раз — два — три — бом»; один бьёт по наковальне, другой — по цепи на ноге (в одиночку цепь бьёт оставленный сам)
function k5ForgeStart(S){S.beat=0;S.bt=0;S.ok=[0,0];S.need=4;const mk=(p,c)=>{const r=k5noRay(new THREE.Mesh(new THREE.RingGeometry(1,1.15,40),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:0.9,depthWrite:false})));r.rotation.x=-Math.PI/2;r.position.set(p.x,0.08,p.z);W.group.add(r);return r;};
  S.r0=mk(new V3(7,0,6),COL.p1);S.r1=mk(S.legP,COL.p2);S.legGlow=k5noRay(addMesh(new THREE.SphereGeometry(0.6,10,8),MB(0xffb040,{transparent:true,opacity:0.6}),S.legP.x,1.5,S.legP.z));
  k5Label('цепь на ноге',S.legP.x,3.2,S.legP.z,'#9fe0ff',2.8);k5Music(5);}
function k5ForgeTick(S,dt){const per=0.75;S.bt+=dt;const ph=(S.bt%(per*4))/(per*4);const k=1-ph;for(const r of [S.r0,S.r1])r.scale.setScalar(0.6+k*2.4);
  const nb=Math.floor(S.bt/per);if(nb!==S.beat){S.beat=nb;const bom=nb%4===3;AUD.ready()&&(bom?AUD.bell(523,{v:0.07,d:1,wet:0.5}):AUD.osc({f0:880,d:0.05,v:0.03}));if(bom)S.bomT=S.bt;}
  const win=Math.abs(S.bt-(Math.floor(S.bt/(per*4))*per*4+per*3))<0.22||(S.bomT&&S.bt-S.bomT<0.22);
  const pts=[new V3(7,0,6),S.legP];for(const pi of [0,1]){if(G.solo&&pi===1)continue;const h=active(pi);if(!k5Swing(h))continue;
    let tgt=G.solo?(hd(h.pos,pts[0])<2.6?0:hd(h.pos,pts[1])<2.6?1:-1):(hd(h.pos,pts[pi])<2.6?pi:-1);if(tgt<0)continue;
    if(win){S.ok[tgt]++;if(tgt===0){if(FIN.fx)FIN.fx.sparks(new V3(7,1.4,6),16,0xffd060);SFX.hammer&&SFX.hammer();}else{const l=S.links.find(m=>m.parent&&m.position.y<6&&!m.userData.off);if(l){l.userData.off=true;l.visible=false;}if(FIN.fx)FIN.fx.sparks(new V3(S.legP.x,1.5,S.legP.z),14,0x9fe0ff);SFX.clink&&SFX.clink();}
      k5Say(h.pos.clone().add(new V3(0,2,0)),'Ковка '+Math.min(S.need,S.ok[tgt])+'/'+S.need,'#ffd76a');}else{k5Say(h.pos.clone().add(new V3(0,2,0)),'не в такт','#cccccc');}}
  if(G.solo&&win&&S.bomT===S.bt)S.ok[1]=Math.min(S.need,S.ok[1]+1);   // в одиночку цепь бьёт оставленный
  if(S.ok[0]>=S.need&&S.ok[1]>=S.need)k5GiantFall(S);}
function k5GiantFall(S){S.ph='done';for(const r of [S.r0,S.r1])W.group.remove(r);W.group.remove(S.legGlow);banner('Великан рассыпался!','#ffd76a',3,'Кощей без сил · N — страница сказки');shakeAll(0.15,0.8);
  const parts=S.links.map(m=>{const p=new V3();m.getWorldPosition(p);W.group.attach(m);return {m,v:new V3(rand(-4,4),rand(2,6),rand(-4,4))};});W.group.attach(S.head);parts.push({m:S.head,v:new V3(0,3,2)});
  K5SB.tick.push(dt=>{let any=false;for(const P of parts){if(P.m.position.y>0.3){P.v.y-=12*dt;P.m.position.addScaledVector(P.v,dt);P.m.rotation.x+=dt*3;any=true;}else P.m.position.y=0.3;}return !any;});
  if(S.K){anim(1.2,k=>{S.K.g.position.y=7.3*(1-k);S.K.g.scale.setScalar(0.55+k*0.35);});const R=S.K.rig||{};if(R.chest)R.chest.rotation.x+=0.7;}
  if(FIN.fx)later(1.2,()=>{FIN.fx.stars(new V3(K5G_C.x,2,K5G_C.z+1),18,0xffd76a);if(FIN.fx.confetti)FIN.fx.confetti(new V3(K5G_C.x,3,K5G_C.z),30,0.8);});
  const bb=$('bossbar');bb.style.display='none';}
