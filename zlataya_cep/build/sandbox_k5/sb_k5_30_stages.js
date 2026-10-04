/* ============================== ПОЛИГОН КОЩЕЯ · ЭТАПЫ 1–4: арена по этапам (шаг 2), друзья и инструменты миров (шаг 3) ============================== */
// Флажок «Арена» выключен — простая поляна (как сейчас); «Друзья» выключен — этап проходится прежним способом (свечи бить, шар отбить, щитников бить).
const K5C=new V3(0,0,-6);
// герой только что ударил (atkT вырос)
function k5Swing(h){const a=h.atkT||0,p=h._k5a||0;h._k5a=a;return a>p+0.05;}
function k5Plain(){setTheme('buyan');ground(-17,17,-20,14,0);}
function k5Item(fn){W.itemSign=pi=>fn?(q=>fn(q)):null;}
function k5Tip(pi,html,t){try{tip(pi,html,t||2.6);}catch(e){}}
// ель-морок
function k5Spruce(x,z,s,solid){const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const m=M(0x1e1630,{emissive:0x2a1048,emissiveIntensity:0.35});
  addMesh(new THREE.CylinderGeometry(0.15,0.2,1,6),M(0x2a1c18),0,0.5,0,g);for(let i=0;i<3;i++)addMesh(new THREE.ConeGeometry(1.3*s-i*0.3*s,1.6*s,7),m,0,1+i*1.0*s,0,g);
  const c=solid?{x,z,r:0.9*s,miny:-1,maxy:5,on:true}:null;if(c)W.cyls.push(c);return {g,c,x,z};}

/* ---------------- этап 1 «Чёрные свечи»: морок-лес, Леший + клубок ---------------- */
K5SB.scenes.s1={goal:pi=>'Этап 1. Погаси все свечи (удар у свечи), купол лопнет — бей Кощея в окно.'+(k5on('friends')?' <b>Ко мне!</b> '+K(pi,'call')+' — Леший раздвинет ели; '+K(pi,'item')+' — клубок покатится к свече.':''),
  build(){const A=k5on('arena'),F=k5on('friends');
    if(A){setTheme('dark');scene.fog=new THREE.Fog(0x1a1028,10,42);ground(-17,17,-20,14,0,M(0x2a3a2a));for(let i=0;i<34;i++){const a=i/34*Math.PI*2;k5Spruce(K5C.x+Math.cos(a)*rand(13,15),K5C.z+Math.sin(a)*rand(12,14),rand(1,1.5),false);}}else k5Plain();
    const S=this;S.c=[];for(let i=0;i<6;i++){const a=i/6*Math.PI*2+0.3,x=K5C.x+Math.cos(a)*8,z=K5C.z+Math.sin(a)*7;const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);
      addMesh(new THREE.CylinderGeometry(0.22,0.26,1.6,8),M(0x1a1420),0,0.8,0,g);const fl=k5noRay(addMesh(new THREE.ConeGeometry(0.22,0.6,8),MB(0xb070ff),0,1.9,0,g));
      const c={g,fl,x,z,hp:2,lit:true,sp:[]};if(A)for(let j=0;j<4;j++){const b=j/4*Math.PI*2+0.4;c.sp.push(k5Spruce(x+Math.cos(b)*1.9,z+Math.sin(b)*1.9,0.85,true));}S.c.push(c);}
    const dome=k5noRay(new THREE.Mesh(new THREE.SphereGeometry(3.4,24,16),new THREE.MeshBasicMaterial({color:0x9a50ff,transparent:true,opacity:0.22,depthWrite:false})));dome.position.copy(K5C);W.group.add(dome);S.dome=dome;
    S.B=k5Boss({stage:1,pos:K5C.clone(),attacks:['bolt','hands','orb'],base:'smug',guard:()=>S.c.some(c=>c.lit)});k5ArenaCam(S.B);k5Music(1);
    if(F){S.L=makeLeshy?makeLeshy(1.4):null;if(S.L){S.L.g.position.set(12,0,6);S.L.g.rotation.y=-1.9;}k5Label('Леший',12,4.6,6,'#a8e08a',3);
      k5Item(pi=>{const h=active(pi),c=S.c.filter(c=>c.lit).sort((a,b)=>hd(a,h.pos)-hd(b,h.pos))[0];if(!c)return;k5Clew(h.pos.clone(),c);});}else k5Item(null);
    S.part=0;},
  update(dt){const S=this;const F=k5on('friends');
    // зов → Леший раздвигает ели у ближней к зовущему свечи
    for(const pi of [0,1]){if(G.solo&&pi===1)continue;if(F&&tap(pi,'call')&&S.L){const h=active(pi),c=S.c.filter(c=>c.lit&&c.sp.length).sort((a,b)=>hd(a,h.pos)-hd(b,h.pos))[0];
        if(c&&!c.open){c.open=8;ringFx(new V3(c.x,0.1,c.z),0x8ae06a,2.6);if(S.L.hands&&S.L.hands.forEach)S.L.hands.forEach(x=>{if(x&&x.rotation)x.rotation.z=1;});k5Say(new V3(c.x,2.6,c.z),'Леший!','#a8e08a');AUD.ready()&&AUD.nz({type:'lowpass',f0:600,f1:200,d:0.8,v:0.12});}}}
    for(const c of S.c){if(c.open>0){c.open-=dt;for(const s of c.sp){const out=Math.min(1,c.open>7?(8-c.open):c.open<1?c.open:1);s.g.position.y=-out*4.5;if(s.c)s.c.on=out<0.5;}}else if(c.open!==undefined&&c.open<=0){c.open=undefined;for(const s of c.sp){s.g.position.y=0;if(s.c)s.c.on=true;}}
      if(!c.lit)continue;c.fl.scale.setScalar(1+0.15*Math.sin(G.time*12+c.x));
      for(const pi of [0,1]){const h=active(pi);if(k5Swing(h)&&hd(h.pos,c)<1.9){c.hp--;burst(new V3(c.x,1.9,c.z),0xb070ff,6,3);if(c.hp<=0){c.lit=false;c.fl.visible=false;if(FIN.fx)FIN.fx.dust(new V3(c.x,1.8,c.z),8,0x4a3a5a,0.6);
          k5Say(new V3(c.x,2.6,c.z),'Свеча погасла!','#d8b8ff');k5Mood(S.B,'angry',1.6);SFX.ember&&SFX.ember();if(!S.c.some(q=>q.lit)){anim(0.5,k=>S.dome.scale.setScalar(1+k*0.6));later(0.5,()=>{S.dome.visible=false;});ringFx(K5C,0x9a50ff,4);k5Mood(S.B,'surprise',2);SFX.crash&&SFX.crash();}}}}}}};
function k5Clew(from,c){const ball=k5noRay(new THREE.Mesh(new THREE.SphereGeometry(0.25,10,8),M(0xffd76a,{emissive:0xb07a10,emissiveIntensity:0.8})));ball.position.copy(from).add(new V3(0,0.25,0));W.group.add(ball);
  const pts=[ball.position.clone()];const line=k5noRay(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0xffd76a})));W.group.add(line);SFX.toss&&SFX.toss();
  const S={t:0};K5SB.tick.push(dt=>{S.t+=dt;const to=new V3(c.x,0.25,c.z),d=ball.position.distanceTo(to);if(d>0.4){ball.position.add(to.clone().sub(ball.position).normalize().multiplyScalar(Math.min(d,7*dt)));ball.rotation.x+=dt*12;pts.push(ball.position.clone());line.geometry.setFromPoints(pts);}
    if(S.t>7){W.group.remove(ball);W.group.remove(line);return true;}});}

/* ---------------- этап 2 «Ключ и искорка»: ливень и лужи, Водяной + гусли ---------------- */
K5SB.scenes.s2={goal:pi=>'Этап 2. Кощей зовёт ветер, молнии и руки. Отбей шар щитом в последний миг — окно.'+(k5on('friends')?' У лужи '+K(pi,'item')+' — гусли: Водяной смоет руки и молнии, ветер стихнет.':''),
  build(){const A=k5on('arena'),F=k5on('friends'),S=this;
    if(A){setTheme('evening');scene.fog=new THREE.Fog(0x2a3048,14,60);ground(-17,17,-20,14,0,M(0x3e5a46));k5Rain();}else k5Plain();
    S.pud=[];if(A||F)for(let i=0;i<5;i++){const a=i/5*Math.PI*2+0.6,x=K5C.x+Math.cos(a)*9,z=K5C.z+Math.sin(a)*8+2;const d=k5noRay(addMesh(new THREE.CircleGeometry(1.6,24),M(0x3a7ac8,{emissive:0x10304a,emissiveIntensity:0.5}),x,0.03,z));d.rotation.x=-Math.PI/2;S.pud.push({x,z,d});}
    S.B=k5Boss({stage:2,pos:K5C.clone(),attacks:['wind','bolt','hands','orb'],base:'focus'});k5ArenaCam(S.B);k5Music(2);K5SB.windStop=0;S.cd=0;
    k5Item(F?(pi=>{const h=active(pi),p=S.pud.sort((a,b)=>hd(a,h.pos)-hd(b,h.pos))[0];if(!p||hd(p,h.pos)>3){k5Tip(pi,'Гусли — у лужи: Водяной живёт в воде.');return;}if(S.cd>0){k5Tip(pi,'Водяной ещё не отдохнул…');return;}S.cd=12;k5Vod(S,p);}):null);
    S.ft=rand(4,8);},
  update(dt){const S=this;S.cd=Math.max(0,S.cd-dt);K5SB.windStop=Math.max(0,(K5SB.windStop||0)-dt);
    if(k5on('arena')){S.ft-=dt;if(S.ft<=0){S.ft=rand(5,10);const f=$('flash');if(f&&jxFl()>0){f.style.transition='none';f.style.background='#dfe8ff';f.style.opacity=String(0.35*jxFl());setTimeout(()=>{f.style.transition='opacity .5s';f.style.opacity='0';},70);}
      later(rand(0.4,1.2),()=>AUD.ready()&&(AUD.nz({type:'lowpass',f0:700,f1:80,d:2.2,v:0.18,a:0.05,wet:0.6}),AUD.osc({f0:60,f1:30,d:1.8,v:0.2})));}}}};
function k5Rain(){const N=420,pos=new Float32Array(N*6);for(let i=0;i<N;i++){const x=rand(-20,20),y=rand(0,16),z=rand(-22,16);pos.set([x,y,z,x+0.08,y-0.7,z],i*6);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));const L=k5noRay(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0xbfd0ff,transparent:true,opacity:0.5})));W.group.add(L);
  K5SB.tick.push(dt=>{const a=g.attributes.position.array;for(let i=0;i<N;i++){const o=i*6;a[o+1]-=dt*22;a[o+4]-=dt*22;if(a[o+4]<0){const y=16+rand(0,2);a[o+1]=y;a[o+4]=y-0.7;}}g.attributes.position.needsUpdate=true;});}
function k5Vod(S,p){[0,2,4,7,4,9].forEach((n,i)=>later(i*0.12,()=>{AUD.ready()&&AUD.bell(330*Math.pow(2,n/12)*2,{v:0.05,d:0.8,wet:0.5});}));
  const g=new THREE.Group();g.position.set(p.x,-3,p.z);W.group.add(g);const wm=new THREE.MeshLambertMaterial({color:0x4aa0c8,transparent:true,opacity:0.8,emissive:0x103048});
  addMesh(new THREE.SphereGeometry(1.4,14,10),wm,0,1.6,0,g);addMesh(new THREE.SphereGeometry(1.0,12,10),wm,0,3.2,0.1,g);for(let i=0;i<6;i++){const a=i/6*6.28;addMesh(new THREE.SphereGeometry(0.22,8,6),M(0xf2f0ff,{emissive:0xffffff,emissiveIntensity:0.2}),Math.cos(a)*0.7,4.1,Math.sin(a)*0.7,g);}
  addMesh(new THREE.ConeGeometry(0.8,2.2,8),M(0x5a8a5a),0,1.6,0.9,g).rotation.x=Math.PI;g.traverse(o=>k5noRay(o));
  k5Label('Водяной',p.x,6.4,p.z,'#9fe6ff',3);anim(0.8,k=>g.position.y=-3+k*3);k5Mood(S.B,'surprise',1.8);
  later(0.8,()=>{const r=k5noRay(new THREE.Mesh(new THREE.TorusGeometry(1,0.3,6,48),new THREE.MeshBasicMaterial({color:0x9fe6ff,transparent:true,opacity:0.8})));r.rotation.x=Math.PI/2;r.position.set(p.x,0.4,p.z);W.group.add(r);SFX.splash&&SFX.splash();
    const st={r:1};K5SB.tick.push(dt=>{st.r+=dt*12;r.scale.setScalar(st.r);r.material.opacity=Math.max(0,0.8-st.r/20);if(st.r>18){W.group.remove(r);return true;}});
    // волна смывает руки и молнии, ветер стихает
    for(const T of K5SB.teles||[])T.cancel();K5SB.teles=[];K5SB.windStop=8;k5Say(new V3(p.x,3,p.z),'Вместе! Водяной смыл!','#9fe6ff');});
  later(4,()=>anim(0.9,k=>{g.position.y=-k*3.5;if(k>=1)W.group.remove(g);}));}
// реестр телеграфов (чтобы волна могла их смыть)
{const _t=k5Tele;k5Tele=function(){const T=_t.apply(this,arguments);(K5SB.teles=K5SB.teles||[]).push(T);return T;};}

/* ---------------- этап 3 «Буря»: облака и тень-великан, Жар-птица + перо ---------------- */
K5SB.scenes.s3={goal:pi=>'Этап 3. Кощей в туче — не пробить. Отбей шар обратно в тучу — окно.'+(k5on('friends')?' '+K(pi,'item')+' — перо: Жар-птица выжжет тучу.':''),
  build(){const A=k5on('arena'),F=k5on('friends'),S=this;
    if(A){setTheme('heaven');ground(-10,10,-14,10,0,M(0xf2f4ff));W.fallY=-14;
      for(const [x,z,y] of [[-15,-8,0.6],[15,-8,0.8],[-14,6,0.3],[14,6,0.5]]){ground(x-3.5,x+3.5,z-3.5,z+3.5,y,M(0xe8ecff));}
      for(const [x0,x1,z] of [[-11.5,-10,-8],[10,11.5,-8],[-10.5,-10,6],[10,10.5,6]])ground(x0,x1,z-1,z+1,0,M(0xffffff));
      for(let i=0;i<40;i++)k5noRay(addMesh(new THREE.SphereGeometry(rand(2,5),10,8),new THREE.MeshLambertMaterial({color:0xffffff,transparent:true,opacity:0.85}),rand(-50,50),rand(-14,-6),rand(-60,30))).castShadow=false;
      S.sh=makeKoschei();S.sh.g.scale.setScalar(4.2);S.sh.g.position.set(0,-10,-48);S.sh.g.traverse(o=>{if(o.isMesh){o.material=new THREE.MeshBasicMaterial({color:0x1a0a2a,transparent:true,opacity:0.55,depthWrite:false});k5noRay(o);}});}
    else k5Plain();
    S.B=k5Boss({stage:3,pos:K5C.clone(),hover:3.4,attacks:['orb','bolt','orb'],base:'angry',guard:()=>S.cloud>0});k5ArenaCam(S.B,{h:1.5});k5Music(3);
    S.cg=new THREE.Group();W.group.add(S.cg);for(let i=0;i<9;i++)k5noRay(addMesh(new THREE.SphereGeometry(rand(1.2,1.9),10,8),new THREE.MeshLambertMaterial({color:0x3a3248,transparent:true,opacity:0.8,emissive:0x1a0a2a}),rand(-1.6,1.6),rand(3,6),rand(-1.6,1.6),S.cg));
    S.cloud=1;S.cd=0;
    // отбитый шар разгоняет тучу (прежний способ)
    const _w=k5Window;k5Window=function(B,t){if(B===S.B)S.cloud=0,S.back=t+0.5;return _w.apply(this,arguments);};S.unhook=()=>{k5Window=_w;};
    k5Item(F?(pi=>{if(S.cd>0){k5Tip(pi,'Жар-птица ещё летит…');return;}if(S.cloud<=0)return;S.cd=10;k5Bird(S,active(pi));}):null);},
  leave(){if(this.unhook)this.unhook();},
  update(dt){const S=this;S.cd=Math.max(0,S.cd-dt);S.cg.position.copy(S.B.A.g.position);S.cg.visible=S.cloud>0;
    if(S.cloud<=0&&S.back>0){S.back-=dt;if(S.back<=0&&!S.B.done)S.cloud=1;}
    // Кощей кружит над поляной
    const a=K5SB.t*0.35;S.B.A.g.position.x=K5C.x+Math.cos(a)*4;S.B.A.g.position.z=K5C.z+Math.sin(a)*3;
    // тень повторяет позу
    if(S.sh){const R=S.B.R,Q=S.sh.rig||{};for(const k of ['armR','armL2','chest','hips','head'])if(R[k]&&Q[k])Q[k].rotation.copy(R[k].rotation);S.sh.g.rotation.y=S.B.A.g.rotation.y;S.sh.g.position.y=-10+Math.sin(G.time*0.8)*0.6;}}};
function k5Bird(S,h){const beam=k5noRay(new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.4,14,10,1,true),new THREE.MeshBasicMaterial({color:0xffc060,transparent:true,opacity:0.7,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide})));
  beam.position.copy(h.pos).add(new V3(0,7,0));W.group.add(beam);anim(0.8,k=>{beam.material.opacity=0.7*(1-k);if(k>=1)W.group.remove(beam);});AUD.ready()&&AUD.bell(1568,{v:0.06,d:1,wet:0.6});
  const fb=makeFirebird?makeFirebird({}):null;if(!fb)return;fb.g.scale.setScalar(1.6);const from=new V3(-30,9,-2),to=new V3(30,9,-12);fb.g.position.copy(from);fb.g.traverse(o=>k5noRay(o));k5Label('Жар-птица',0,12,-6,'#ffd27a',3.4);
  anim(2.4,k=>{fb.g.position.lerpVectors(from,to,k);fb.g.position.y=9-Math.sin(k*Math.PI)*4.5;fb.g.rotation.y=Math.PI/2;if(Math.random()<0.5)juSprk(fb.g.position);
    if(k>0.45&&S.cloud>0){S.cloud=0;S.back=6;ringFx(S.B.A.g.position.clone(),0xffb040,4);k5Say(S.B.A.g.position.clone().add(new V3(0,5,0)),'Вместе! Туча сгорела!','#ffd27a');k5Mood(S.B,'surprise',1.6);k5Window(S.B,5.5);}
    if(k>=1)W.group.remove(fb.g);});}
const juSprk=p=>{if(FIN.fx)FIN.fx.sparkle(p.clone(),2,0xffc060);};

/* ---------------- этап 4 «Меч Бессмертного»: трещины и костяной мост, Горыныч + клещи ---------------- */
K5SB.scenes.s4={goal:pi=>'Этап 4. Пока стоят костяные щитники — Кощей закрыт. Волну меча — перепрыгни, прыжок — уйди.'+(k5on('friends')?' <b>Ко мне!</b> '+K(pi,'call')+' — Горыныч раскалит щит, Потап '+K(pi,'item')+' — сорвёт клещами.':' Щитника — бить (4 удара).'),
  build(){const A=k5on('arena'),F=k5on('friends'),S=this;
    if(A){setTheme('forgein');ground(-17,17,2,14,0,M(0x5a4a3a));ground(-17,17,-20,-2,0,M(0x4a3a30));ground(-1.3,1.3,-2,2,0,M(0xece4cc));
      for(let x=-1.2;x<=1.2;x+=0.6)k5noRay(addMesh(new THREE.BoxGeometry(0.12,0.3,4.2),M(0xd8d0b8),x,0.15,0));
      for(let i=0;i<10;i++)k5noRay(addMesh(new THREE.DodecahedronGeometry(rand(0.4,1),0),M(0xff6a20,{emissive:0xff4a00,emissiveIntensity:0.9}),rand(-16,16),-3.5,rand(-1.5,1.5)));
      S.cr=[];for(let i=0;i<4;i++){const x=rand(-11,11),z=rand(-16,-6),cw=rand(3,6);const m=k5noRay(addMesh(new THREE.BoxGeometry(cw,0.05,0.35),M(0xff7a20,{emissive:0xff5a00,emissiveIntensity:1}),x,0.04,z));m.rotation.y=rand(0,3);m.userData.w=cw;S.cr.push(m);}
      W.fallY=-8;}else k5Plain();
    S.B=k5Boss({stage:4,pos:K5C.clone().add(new V3(0,0,-3)),attacks:['sword','leap','bolt'],base:'focus',guard:()=>S.sb.some(b=>b.alive)});k5ArenaCam(S.B);k5Music(4);
    S.sb=[];for(let i=0;i<3;i++){const x=-4+i*4,z=-5;const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const bm=M(0xe8e0cc);
      addMesh(new THREE.CylinderGeometry(0.25,0.3,1.4,6),bm,0,1.1,0,g);addMesh(new THREE.SphereGeometry(0.32,8,6),bm,0,2.1,0,g);const sh=addMesh(new THREE.BoxGeometry(1.4,1.6,0.18),M(0x6a6a74),0,1.2,0.5,g);
      g.traverse(o=>k5noRay(o));const c={x,z,r:0.9,miny:-1,maxy:3,on:true};W.cyls.push(c);S.sb.push({g,sh,x,z,c,alive:true,hp:4,hot:0});}
    S.cd=0;if(F){S.gor=makeGorynych?makeGorynych():null;if(S.gor){S.gor.g.position.set(13,0,8);S.gor.g.rotation.y=-2.3;S.gor.g.scale.setScalar(0.8);S.gor.g.traverse(o=>k5noRay(o));}k5Label('Горыныч',13,6,8,'#a8e08a',3);
      k5Item(pi=>{const h=active(pi),b=S.sb.filter(b=>b.alive).sort((a,c)=>hd(a,h.pos)-hd(c,h.pos))[0];if(!b||hd(b,h.pos)>2.4)return;if(h.kind!=='potap'){k5Tip(pi,'Клещи — у Потапа: смени героя '+K(pi,'swap'));return;}
        if(b.hot<=0){k5Tip(pi,'Щит холодный — пусть Горыныч его раскалит: «Ко мне!» '+K(pi,'call'));return;}k5Rip(S,b);});}else k5Item(null);},
  update(dt){const S=this,F=k5on('friends');S.cd=Math.max(0,S.cd-dt);
    if(S.cr)for(const m of S.cr)for(const pi of [0,1]){const h=active(pi);const lp=m.worldToLocal(h.pos.clone());if(Math.abs(lp.x)<m.userData.w/2&&Math.abs(lp.z)<0.5&&h.pos.y<0.4){h.vel.z+=(h.pos.z>m.position.z?6:-6);h.vel.y=3;h.grounded=false;}}
    for(const pi of [0,1]){if(G.solo&&pi===1)continue;if(F&&S.gor&&tap(pi,'call')&&S.cd<=0){const b=S.sb.filter(b=>b.alive&&b.hot<=0).sort((a,c)=>hd(a,active(pi).pos)-hd(c,active(pi).pos))[0];if(b){S.cd=4;k5Fire(S,b);}}}
    for(const b of S.sb){if(!b.alive)continue;b.hot=Math.max(0,b.hot-dt);b.sh.material.emissive&&b.sh.material.emissive.setHex(b.hot>0?0xff4a00:0x000000);if(b.sh.material.emissiveIntensity!==undefined)b.sh.material.emissiveIntensity=b.hot>0?0.6+0.4*Math.sin(G.time*10):0;
      if(!F)for(const pi of [0,1]){const h=active(pi);if(k5Swing(h)&&hd(h.pos,b)<2){b.hp--;burst(new V3(b.x,1.4,b.z),0xffffff,5,3);SFX.clink&&SFX.clink();if(b.hp<=0)k5Crumble(S,b);}}}}};
function k5Fire(S,b){const g=S.gor.g,from=g.position.clone().add(new V3(0,3,0)),to=new V3(b.x,1.2,b.z);k5Label('Огонь!',b.x,3.4,b.z,'#ffb060',2.4);AUD.ready()&&AUD.nz({f0:300,f1:1200,d:1,v:0.16,q:0.7});
  anim(1,k=>{for(let i=0;i<4;i++){const p=from.clone().lerp(to,Math.random()*k);if(FIN.fx)FIN.fx.sparks(p,1,0xff8a20);}if(k>=1){b.hot=6;ringFx(to,0xff6a20,1.6);}});}
function k5Rip(S,b){b.sh.visible=false;SFX.brk&&SFX.brk();k5Say(new V3(b.x,2.6,b.z),'Вместе! Клещами!','#ffd76a');later(0.3,()=>k5Crumble(S,b));}
function k5Crumble(S,b){b.alive=false;b.c.on=false;if(FIN.fx)FIN.fx.dust(new V3(b.x,0.8,b.z),16,0xe8e0cc,1.4);anim(0.5,k=>{b.g.scale.set(1,Math.max(0.01,1-k),1);if(k>=1)W.group.remove(b.g);});
  if(!S.sb.some(q=>q.alive)){k5Mood(S.B,'angry',2);k5Say(S.B.A.g.position.clone().add(new V3(0,5,0)),'Открыт!','#ffe36b');}}
