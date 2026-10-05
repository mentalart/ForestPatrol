// ---- продолжение build5B2 (k5epic, часть ph): ПРОЛОГ «Через леса, через моря» — погоня на Горыныче за чёрной тучей Кощея ----
  // Управление — как в 5-3 «Утка»: у каждого игрока своя голова (Игрок 1 — левая, Игрок 2 — правая), Горыныч летит посерёдке;
  // тянете в одну сторону дольше секунды — разгон. В одиночку игрок ведёт обе головы (W.soloMirror). Шесть отрезков (≈150 с):
  //   1 «Через леса» — золотые буквы из тетрадки и золотые обручи (рывок, обручи подряд — комбо), чернильные ели (красный столб —
  //     вырастет; облететь сбоку или поверху), стена елей — только поверху;
  //   2 «Чернильная волна» — ущелье: за спиной катится волна чернил; уйти можно только вместе (разгон) и сквозь обручи; скалы —
  //     облететь, мосты — под ними или поверху; догнала — кляксы и толчок;
  //   3 «Через моря» — вороны из тучи: ворон с кольцом твоего цвета — твой (огонь сам летит в него), капля — щит в последний миг,
  //     и она летит обратно в ворона; в конце вожак — огонь обеих голов;
  //   4 «Над облаками» — Кощей бросает шары: кольцо твоего цвета — твой огонь, золотой — огонь обеих голов разом;
  //   5 «Почерк Кощея» — буквы-стены Ш, О, Х, Н, Ж и плывущая О: пролететь в просвет, где золотые кольца;
  //   6 «Раз-два-три!» — на «три» оба — умение, средняя голова прожигает тучу, Кощей падает к дубу Лукоморья.
  // Проиграть пролог нельзя: удар только тормозит Горыныча, туча уходит дальше. Бот — tk5e_prolog.
  {const PRO={on:false,built:false,leg:''};E.pro=PRO;{const el=document.getElementById('k5eInk');if(el)el.style.opacity=0;}   // уровень перезапущен посреди клякс
   const PX=-900;                                         // коридор полёта — далеко от поляны (x≈0), страниц (x≈±400) и поездок (x=−600)
   const XL=14,YL=[9,25],PY=4,HR=3.2;                     // пределы руления; точка полёта — на 4 м выше основания Горыныча; задевание буквы
   const V0=(YL[0]+YL[1])/2+PY;                           // середина коридора по высоте точки полёта
   const GP=new V3(),GV={x:0,y:0,sp:11,agreeT:0,fight:0,bump:0,rush:0,boostOn:false},IN=[{x:0,y:0},{x:0,y:0}];
   let pg=null,HEADS=null,MIDH=null,sc=null,CL=null,LK=null,OAKW=null,DG=null,WV=null,CS=null;const decs=[],streaks=[],puffs=[];
   let pages=[],spires=[],crows=[],drops=[],fires=[],letters=[],hoops=[],rocks=[],orbs=[];
   const GZ=[-380,-780];                                  // ущелье «Чернильная волна» — от и до (z)
   const LET='ЧЕРЕЗЛЕСАЧЕРЕЗМОРЯКОЛДУННЕСЁТБОГАТЫРЯ';
   // небо отрезка: фон и туман, цвет и сила рассеянного света, цвет и сила солнца
   const PAL={forest:[0x6a92c8,0xe0e8ff,0.78,0xffd8a8,0.95],gorge:[0xffd6a8,0xfff0e0,0.78,0xffc080,0.95],sea:[0x52508e,0xc8c0f0,0.66,0xd0c0ff,0.62],
     sky:[0x8cc8f4,0xffffff,0.84,0xfff2d8,1.0],write:[0xf7b48c,0xffe6d8,0.72,0xffc890,0.9]};
   const SKY={bg:new THREE.Color(),amb:new THREE.Color(),sun:new THREE.Color(),ai:0.6,si:0.7};
   const skyTick=(dt,snap)=>{const T=PAL[PRO.th]||PAL.forest,k=snap?1:1-Math.exp(-0.9*dt);SKY.bg.lerp(new THREE.Color(T[0]),k);SKY.amb.lerp(new THREE.Color(T[1]),k);SKY.sun.lerp(new THREE.Color(T[3]),k);SKY.ai+=(T[2]-SKY.ai)*k;SKY.si+=(T[4]-SKY.si)*k;
     if(scene.background&&scene.background.isColor)scene.background.copy(SKY.bg);if(scene.fog){scene.fog.color.copy(SKY.bg);scene.fog.near=PRO.th==='sky'?70:45;scene.fog.far=PRO.th==='sky'?320:240;}amb.color.copy(SKY.amb);amb.intensity=SKY.ai;sun.color.copy(SKY.sun);sun.intensity=SKY.si;};
   const hpos=hh=>{const p=new V3();hh.g.getWorldPosition(p);return p;};
   const fp=()=>new V3(PX+GP.x,GP.y+PY,GP.z);
   const ft=(p,t,c)=>floatText(p.clone().add(new V3(0,0,-GV.sp*0.7)),t,c);   // надпись у места события — с упреждением по ходу полёта
   const KP_=pi=>G.solo?0:pi;                             // чьи клавиши показывать
   /* ---------- мир полёта: лес Буяна, берег, море, Лукоморье впереди; Горыныч; туча ---------- */
   const proBuild=()=>{if(PRO.built)return;PRO.built=true;const g=new THREE.Group();
     // мир стоит над «живым океаном» уровня (ATMO.ocean ходит за камерой на высоте ≈ −0,7): лес Буяна — остров, море за берегом — тот океан
     const fl=new THREE.Mesh(new THREE.PlaneGeometry(300,460),MB(0x2a5a30));fl.rotation.x=-Math.PI/2;fl.position.set(PX,-0.4,-170);g.add(fl);
     {const n=420,cg=new THREE.ConeGeometry(1,1,7);cg.translate(0,0.5,0);const im=new THREE.InstancedMesh(cg,M(0x2f7a3a),n),m4=new THREE.Matrix4(),q=new THREE.Quaternion(),s=new V3(),p=new V3();
       for(let i=0;i<n;i++){const h=rand(7,13),r=rand(1.8,3);p.set(PX+rand(-130,130),-0.5,rand(40,-372));s.set(r,h,r);m4.compose(p,q,s);im.setMatrixAt(i,m4);}im.instanceMatrix.needsUpdate=true;g.add(im);}
     // ущелье: песчаные стены с полосами, дно, река
     {const L=GZ[0]-GZ[1],zc=(GZ[0]+GZ[1])/2;for(const sd of[-1,1]){addMesh(new THREE.BoxGeometry(10,44,L),M(0x8e4a30),PX+sd*(XL+9),19,zc,g);for(let k=0;k<3;k++)addMesh(new THREE.BoxGeometry(10.4,2.2,L),M([0xb86a40,0x6e3622,0xd08850][k]),PX+sd*(XL+9),6+k*11,zc,g);}
       const fl2=new THREE.Mesh(new THREE.PlaneGeometry(2*(XL+4),L),MB(0xb87a52));fl2.rotation.x=-Math.PI/2;fl2.position.set(PX,-0.3,zc);g.add(fl2);
       const rv=new THREE.Mesh(new THREE.PlaneGeometry(9,L),MB(0x3a9ad8));rv.rotation.x=-Math.PI/2;rv.position.set(PX,-0.25,zc);g.add(rv);}
     const sea=new THREE.Mesh(new THREE.PlaneGeometry(460,2000),M(0x2a6a98,{emissive:0x0a2a40,emissiveIntensity:0.25}));sea.rotation.x=-Math.PI/2;sea.position.set(PX,-1.0,-1300);g.add(sea);   // запасное море под океаном уровня
     // Лукоморье: песок и почерневший дуб — группа ставится впереди, когда начинается «Почерк Кощея» (путь до неё у всех разный)
     LK=new THREE.Group();g.add(LK);const sd=new THREE.Mesh(new THREE.PlaneGeometry(340,240),M(0xdcc48e));sd.rotation.x=-Math.PI/2;sd.position.set(0,-0.3,-60);LK.add(sd);
     addMesh(new THREE.CylinderGeometry(2.6,4.2,34,10),M(0x2a2030),0,16.5,0,LK);
     for(let i=0;i<7;i++){const a=i/7*6.28;addMesh(new THREE.SphereGeometry(rand(7,10),10,8),M(0x1e1a2a,{emissive:0x2a0a40,emissiveIntensity:0.5}),Math.cos(a)*8,33.5+rand(-2,4),Math.sin(a)*6,LK);}
     LK.position.set(PX,0,-1400);OAKW=LK.position;
     for(let i=0;i<16;i++){const c=new THREE.Group();c.position.set(PX+(i%2?1:-1)*rand(26,70),rand(14,40),rand(20,-240));for(let k=0;k<3;k++)addMesh(new THREE.SphereGeometry(rand(3,6),9,7),MB(0xffffff,{transparent:true,opacity:0.7}),rand(-5,5),rand(-1,1),rand(-3,3),c);g.add(c);decs.push(c);}
     // полосы скорости: белые чёрточки вокруг пути, видны на разгоне
     for(let i=0;i<34;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.07,3.2),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthWrite:false,fog:false}));m.position.set(PX+rand(-18,18),rand(4,30),rand(-60,20));g.add(m);streaks.push(m);}
     // облачное море («Над облаками»): клубы под Горынычем, ходят за ним
     CS=new THREE.Group();g.add(CS);CS.visible=false;for(let i=0;i<34;i++){const c=new THREE.Group();c.position.set(PX+rand(-70,70),rand(1,6),rand(-200,30));for(let k=0;k<3;k++)addMesh(new THREE.SphereGeometry(rand(5,9),9,7),MB(0xfdfcff,{transparent:true,opacity:0.92}),rand(-6,6),rand(-1,1),rand(-5,5),c);CS.add(c);puffs.push(c);}
     // волна чернил («Чернильная волна»): стена позади и два «рукава» по стенам ущелья — их видно по краям, когда догоняет
     WV={g:new THREE.Group(),d:50};const wm=M(0x1c1028,{emissive:0x4a1a7a,emissiveIntensity:0.6});addMesh(new THREE.BoxGeometry(2*(XL+6),46,4),wm,0,21,0,WV.g);
     WV.crest=[];for(let i=0;i<12;i++){const b=addMesh(new THREE.SphereGeometry(rand(2.5,4),9,7),wm,-(XL+4)+i*(2*(XL+4))/11,44,rand(-1,1),WV.g);WV.crest.push(b);}
     WV.arms=[-1,1].map(sd=>{const a=new THREE.Group();a.position.set(sd*(XL+3.5),0,0);WV.g.add(a);addMesh(new THREE.BoxGeometry(5,40,30),wm,0,20,-15,a);for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(rand(2.4,3.4),9,7),wm,-sd*rand(0,1.5),rand(4,36),-29,a);return a;});
     g.add(WV.g);WV.g.visible=false;
     sc=k5Prop(g);K5L.noRay(sc);sc.visible=false;
     pg=makeGorynych5(0.8);pg.g.rotation.y=Math.PI;k5Prop(pg.g);K5L.noRay(pg.g);pg.g.visible=false;HEADS=[pg.heads[2],pg.heads[0]];MIDH=pg.heads[1];
     const cg=new THREE.Group(),cm=M(0x221c30,{emissive:0x2a0e44,emissiveIntensity:0.6,transparent:true,opacity:1});
     for(let i=0;i<16;i++)addMesh(new THREE.SphereGeometry(rand(1.8,3.2),10,8),cm,rand(-5.5,5.5),rand(-1.2,1),rand(-2.5,2.5),cg);
     const bolts=[];for(let i=0;i<4;i++){const b=addMesh(new THREE.BoxGeometry(0.18,rand(2.5,4),0.18),k5Add(0xc8a0ff,{opacity:0}),rand(-4,4),-3.4,rand(-1,1),cg);b.rotation.z=rand(-0.5,0.5);bolts.push(b);}
     CL={g:k5Prop(cg),cm,bolts,pos:new V3(),gap:70,gapTo:null};K5L.noRay(cg);cg.visible=false;
     DG=makeDigit(2.2,MB(0xffd23a));k5Prop(DG);DG.visible=false;};
   /* ---------- Горыныч, седоки, туча с Кощеем ---------- */
   const seat=()=>{pg.g.updateMatrixWorld(true);['proshka','potap','pelageya','yosha'].forEach((k,i)=>{const h=T[k];if(!h)return;h.pos.copy(pg.g.localToWorld(new V3(...GOR_SEATS[i])));h.vel.set(0,0,0);h.grounded=true;h.face=Math.PI;});};
   const place=()=>{pg.g.position.set(PX+GP.x,GP.y,GP.z);pg.g.rotation.z=-GV.x*0.03;pg.g.rotation.x=GV.y*0.02+(GV.agreeT>1?0.08:0);
     pg.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(G.time*(GV.agreeT>1?7:4))*0.45;});[0,1].forEach(pi=>{const hh=HEADS[pi];hh.g.rotation.y=-IN[pi].x*0.5;hh.g.rotation.x=-IN[pi].y*0.3;});seat();};
   const clPlace=dt=>{if(CL.gapTo!=null)CL.gap=damp(CL.gap,CL.gapTo,1.6,dt);CL.pos.set(PX+Math.sin(G.time*0.5)*5,YL[1]+Math.sin(G.time*0.8)*1.2,GP.z-CL.gap);CL.g.position.copy(CL.pos);
     if(!PRO.fall){KS.g.position.set(CL.pos.x,CL.pos.y+0.6,CL.pos.z);KS.g.rotation.y=0;}
     CL.bolts.forEach((b,i)=>{b.material.opacity=Math.sin(G.time*7+i*2.1)>0.93?0.9:0;});
     if(book.g.visible&&!book.g.userData.free){lHand.getWorldPosition(book.g.position);book.g.rotation.set(0,KS.g.rotation.y,0.2);}};
   /* ---------- удар по Горынычу: тормозит, туча уходит дальше; кляксы на экране ---------- */
   const domFx=(id,css)=>{let el=document.getElementById(id);if(!el){el=document.createElement('div');el.id=id;el.style.cssText='position:fixed;inset:0;pointer-events:none;opacity:0;'+css;document.body.appendChild(el);}return el;};
   const inkSplat=()=>{const el=domFx('k5eInk','z-index:29');
     const b=[];for(let i=0;i<5;i++)b.push('radial-gradient(circle at '+rand(8,92).toFixed(0)+'% '+rand(8,92).toFixed(0)+'%,rgba(28,10,46,.9) 0,rgba(70,26,120,.55) '+rand(4,8).toFixed(0)+'%,transparent '+rand(10,15).toFixed(0)+'%)');
     el.style.background=b.join(',');el.style.transition='none';el.style.opacity=1;PRO.splT=1.3;};
   const bump=(txt,p)=>{GV.bump=0.9;CL.gap=Math.min(CL.gap+6,100);PRO.hits++;PRO.combo=0;if(SFX.crash)SFX.crash();shakeAll(0.12,0.4);p=p||fp();K5L.ink(p,14,1.4);ft(p.clone().add(new V3(0,2.6,0)),txt,'#d8b0ff');inkSplat();};
   /* ---------- 1. золотые буквы, золотые обручи, чернильные ели ---------- */
   const pageSpawn=()=>{const ch=LET[PRO.li++%LET.length];const s=K5L.textSpr(ch,3.8,{w:128,h:128,col:'#ffd76a',glow:'#ffb030',weight:'italic 700 '});k5Prop(s);
     const from=CL.pos.clone().add(new V3(rand(-2,2),1.5,0)),to=new V3(PX+rand(-12,12),rand(YL[0]+2,YL[1]+3),CL.pos.z+6);s.position.copy(from);pages.push({s,from,to,t:0,ph:rand(0,6)});};
   const pageGot=p=>{PRO.got++;GV.rush=Math.max(GV.rush,0.9);K5L.gold(p.s.position.clone(),12);if(AUD.ready())AUD.bell(660+(PRO.got%5)*110,{v:0.05,d:0.5});
     if(PRO.got===1)say('gorM','Буква! Ещё лови — быстрее полетим!',2);else if(PRO.got%6===0)ft(fp().add(new V3(0,3,0)),'букв: '+PRO.got,'#ffd76a');};
   // золотой обруч: пролетел — рывок; обручи подряд — комбо (выше звон)
   const hoopMake=(u,y,z)=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.TorusGeometry(3,0.32,8,32),new THREE.MeshBasicMaterial({color:0xffc030,transparent:true,fog:false,toneMapped:false})));
     g.add(new THREE.Mesh(new THREE.TorusGeometry(3,0.85,8,32),k5Add(0xffe080,{opacity:0.35})));g.position.set(PX+u,y,z);k5Prop(g);K5L.noRay(g);hoops.push({g,u,y,z,done:false,t:0});};
   const hoopsTick=dt=>{for(const H of hoops){if(H.done){H.t+=dt;H.g.scale.setScalar(1+H.t*1.2);H.g.children.forEach(c=>{c.material.opacity=Math.max(0,1-H.t*4);});continue;}
       H.g.rotation.z+=dt*1.5;if(GP.z-H.z<0.3){H.done=true;const f=fp();
         if(Math.hypot(f.x-PX-H.u,f.y-H.y)<3.4){PRO.hoops++;PRO.combo++;GV.rush=1.2;K5L.gold(new V3(PX+H.u,H.y,H.z),18);if(AUD.ready())AUD.bell(523*Math.pow(1.122,Math.min(8,PRO.combo)),{v:0.06,d:0.5});
           if(PRO.combo>=2)ft(new V3(PX+H.u,H.y+3.6,H.z),'обручи ×'+PRO.combo,'#ffd76a');if(PRO.hoops===1)say('gorM','Обруч! Ух, как понесло!',1.8);}
         else{PRO.combo=0;H.g.visible=false;}}}
     hoops=hoops.filter(H=>{if(H.done&&H.t>0.3||GP.z<H.z-30){k5Del(H.g);return false;}return true;});};
   const spireMake=s=>{const g=new THREE.Group();const c=new THREE.Mesh(new THREE.ConeGeometry(2.2,23,8),K5L.INKM);c.position.y=11.5;g.add(c);const gl=new THREE.Mesh(new THREE.ConeGeometry(2.8,24,8,1,true),k5Add(0xa060ff,{opacity:0.22}));gl.position.y=12;g.add(gl);
     g.position.set(PX+s.u,-0.5,s.z);g.scale.set(1,0.01,1);k5Prop(g);K5L.noRay(g);s.m=g;
     const mk=new THREE.Mesh(new THREE.CylinderGeometry(2.6,2.6,40,14,1,true),k5Add(0xff4a6a,{opacity:0.0}));mk.position.set(PX+s.u,20,s.z);k5Prop(mk);K5L.noRay(mk);s.mk=mk;};
   const spiresTick=dt=>{for(const s of spires){const dz=GP.z-s.z;
       if(s.st===0&&dz<100){s.st=1;s.t=0;spireMake(s);if(s.wall&&!PRO.wallTold){PRO.wallTold=true;say('gorM','Стена из елей! Вверх тяните — поверху, сквозь обруч!',2.4);}}
       if(s.st===1){s.t+=dt;s.mk.material.opacity=0.18+0.22*Math.sin(G.time*14);if(s.t>1.3){s.st=2;s.t=0;k5Del(s.mk);if(AUD.ready())AUD.thump({f0:90,f1:40,d:0.4,v:0.18});K5L.ink(new V3(PX+s.u,2,s.z),16,2);}}
       if(s.st===2){s.t+=dt;const k=Math.min(1,s.t/0.7);s.m.scale.y=Math.max(0.01,1-Math.pow(1-k,3));if(k>=1)s.st=3;}
       if(s.st>=2&&!s.hit&&Math.abs(GP.z-s.z)<2.8&&Math.abs(GP.x-s.u)<4&&GP.y<-1.5+23*s.m.scale.y){s.hit=true;GP.x+=(GP.x>=s.u?1:-1)*2;GV.x=(GP.x>=s.u?1:-1)*9;bump('Бум! Чернильная ель');}
       if(s.m&&dz<-20){k5Del(s.m);s.m=null;s.st=9;}}};
   /* ---------- 2. ущелье: скалы, мосты, волна чернил за спиной ---------- */
   const rockMake=R=>{const g=new THREE.Group();if(R.arch){addMesh(new THREE.BoxGeometry(2*(XL+8),5,4),M(0xb0683e),0,19.5,0,g);addMesh(new THREE.BoxGeometry(2*(XL+8),1.2,4.4),M(0x8e4a30),0,17.4,0,g);}
     else{addMesh(new THREE.CylinderGeometry(2.2,2.8,38,9),M(0xa86040),0,18.7,0,g);addMesh(new THREE.ConeGeometry(2.6,4,9),M(0x5a9a3a),0,39.5,0,g);}
     g.position.set(PX+(R.u||0),-0.3,R.z);k5Prop(g);K5L.noRay(g);R.g=g;};
   const rocksTick=()=>{for(const R of rocks){if(!R.g&&GP.z-R.z<240)rockMake(R);
       if(R.arch&&!PRO.archTold&&GP.z-R.z<70){PRO.archTold=true;say('gorM','Мост! Ныряем под него — вниз! Или поверху!',2.2);}
       if(R.hit||Math.abs(GP.z-R.z)>2.6)continue;
       if(R.arch?(GP.y>11&&GP.y<21):Math.abs(GP.x-R.u)<4.1){R.hit=true;if(!R.arch){GP.x+=(GP.x>=R.u?1:-1)*2;GV.x=(GP.x>=R.u?1:-1)*9;}bump(R.arch?'Бум! Мост':'Бум! Скала');}}
     rocks=rocks.filter(R=>{if(GP.z<R.z-30){if(R.g)k5Del(R.g);return false;}return true;});};
   const waveTick=dt=>{const el=domFx('k5eWave','z-index:28;background:radial-gradient(ellipse at 50% 55%,rgba(40,12,70,0) 52%,rgba(40,12,70,.88) 100%)');
     if(PRO.leg!=='gorge'){if(!WV.out){el.style.opacity=0;return;}}
     else{const vw=G.solo?12.6:13.6;WV.d=Math.min(60,WV.d+(GV.sp-vw)*dt);if(WV.d<2.5){WV.d=24;PRO.caught++;bump('Волна догнала!');}
       if(WV.d<17&&!PRO.waveTold){PRO.waveTold=true;say('gorM',G.solo?'Волна догоняет! Держи направление — разгон!':'Волна догоняет! Тяните вместе — разгон, и в обручи!',2.4);}
       if(WV.d<22){PRO.rT=(PRO.rT||0)-dt;if(PRO.rT<=0){PRO.rT=0.55;if(AUD.ready())AUD.thump({f0:70,f1:35,d:0.5,v:0.05+0.12*(1-WV.d/22)});}}
       el.style.opacity=clamp((28-WV.d)/22,0,0.9).toFixed(2);}
     WV.g.position.set(PX,0,GP.z+WV.d);WV.crest.forEach((b,i)=>{b.position.y=44+Math.sin(G.time*5+i)*1.6;});WV.arms.forEach((a,i)=>{a.scale.z=1+0.15*Math.sin(G.time*3+i*2);});
     if(WV.out){WV.ot+=dt;WV.g.scale.y=Math.max(0.01,1-WV.ot/1.4);el.style.opacity=Math.max(0,0.6-WV.ot).toFixed(2);if(WV.ot>1.5){WV.out=false;WV.g.visible=false;WV.g.scale.y=1;}}};
   /* ---------- 3. вороны и вожак, чернильные капли, огонь и щит ---------- */
   const crowMake=pi=>{const g=new THREE.Group(),bk=M(0x1e1e26);part(g,new THREE.SphereGeometry(0.6,10,8),bk,0,0,0).scale.set(0.9,0.85,1.3);part(g,new THREE.SphereGeometry(0.36,10,8),bk,0,0.3,0.62);
     const bg=new THREE.ConeGeometry(0.1,0.5,6);bg.rotateX(Math.PI/2);part(g,bg,M(0x4a4a50),0,0.26,1.0);for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.09,6,5),MB(0xd8b0ff),s*0.17,0.42,0.86);
     const wings=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*0.5,0.12,0);g.add(w);part(w,new THREE.BoxGeometry(1.5,0.06,0.7),M(0x2e2e3a),s*0.75,0,0);wings.push({w,s});}
     const ring=new THREE.Mesh(new THREE.TorusGeometry(1.35,0.13,6,28),k5Add(PCOL[G.solo?0:pi],{opacity:0.95}));g.add(ring);g.scale.setScalar(1.3);k5Prop(g);K5L.noRay(g);return {g,wings,ring};};
   const crowWave=n=>{for(let i=0;i<n;i++){const pi=i%2,m=crowMake(pi);const c={m,pi,hp:2,pos:CL.pos.clone().add(new V3(rand(-3,3),rand(-1,2),2)),off:new V3((pi?1:-1)*rand(4,10),rand(1,6),-rand(15,21)),t:0,cd:rand(1.8,2.6)+i*0.6,throws:0,alive:true,leave:false};m.g.position.copy(c.pos);crows.push(c);}
     say('koschei',['Вороны мои — ко мне!','Клюйте их, клюйте!','Все — на Горыныча!'][PRO.wave%3],1.6);};
   // вожак: большой, два кольца — его бьют обе головы, каждая по два раза (одному — четыре удара); отбитая капля — за два
   const leaderWave=()=>{const m=crowMake(0);const r2=new THREE.Mesh(new THREE.TorusGeometry(1.35,0.13,6,28),k5Add(PCOL[G.solo?0:1],{opacity:0.95}));r2.rotation.y=Math.PI/2;m.g.add(r2);m.ring2=r2;m.g.scale.setScalar(2.5);
     crows.push({m,pi:-1,lead:true,hp:4,hits:[0,0],pos:CL.pos.clone().add(new V3(0,1,2)),off:new V3(0,6,-20),t:0,cd:1.8,throws:0,alive:true,leave:false});
     say('koschei','Вожак, вперёд! Склюй их!',1.8);banner('Вожак воронов!','#ffd0a0',2.2,G.solo?'четыре огня — или капля обратно':'огонь обеих голов — каждой по два');};
   const crowKill=(c,how)=>{if(!c.alive)return;c.alive=false;PRO.crows++;if(SFX.brk)SFX.brk();burst(c.pos.clone(),0x2a2a34,c.lead?30:14,c.lead?6:4);K5L.gold(c.pos.clone(),c.lead?30:8);k5Del(c.m.g);
     if(c.lead){banner('Вожак сбит!','#ffd76a',1.8);GV.rush=1.2;}else ft(c.pos.clone().add(new V3(0,1.4,0)),how==='refl'?'Капля — обратно!':'Кар-р!','#ffe0a0');};
   const crowDmg=(c,pi,n,how)=>{if(!c.alive)return;const pop=()=>{c.m.g.scale.multiplyScalar(1.25);later(0.12,()=>{if(c.alive)c.m.g.scale.multiplyScalar(0.8);});};
     if(!c.lead){c.hp-=n;if(c.hp<=0)crowKill(c,how);else pop();return;}
     if(G.solo)c.hp-=n;else c.hits[pi]=Math.min(2,c.hits[pi]+n);
     if(G.solo?c.hp<=0:(c.hits[0]>=2&&c.hits[1]>=2))crowKill(c,how);
     else{pop();if(!G.solo){const need=c.hits[0]<2?(c.hits[1]<2?-1:0):1;if(need>=0)ft(c.pos.clone().add(new V3(0,3.4,0)),need?'теперь правая голова!':'теперь левая голова!',PCSS[need]);}}};
   const dropThrow=c=>{const g=new THREE.Group();addMesh(new THREE.SphereGeometry(0.55,10,8),K5L.INKM,0,0,0,g);addMesh(new THREE.SphereGeometry(0.95,10,8),k5Add(0xa060ff,{opacity:0.35}),0,0,0,g);k5Prop(g);K5L.noRay(g);g.position.copy(c.pos);
     drops.push({g,c,pi:c.lead?c.throws%2:c.pi,from:c.pos.clone(),t:0,dur:G.solo?1.8:1.5,refl:false});if(SFX.thwip)SFX.thwip();};
   const shieldFx=pi=>{const m=new THREE.Mesh(new THREE.CircleGeometry(1.3,20),k5Add(0x9fe0ff,{opacity:0.7}));k5Prop(m);k5fx(0.3,k=>{m.material.opacity=0.7*(1-k);m.scale.setScalar(1+k*0.5);m.position.copy(hpos(HEADS[pi])).add(new V3(0,0,-1.3));},()=>k5Del(m));};
   /* ---------- 4. шары Кощея над облаками ---------- */
   // кольцо цвета игрока — его огонь; золотой (два кольца) — огонь обеих голов разом, в пределах 0,8 с (одному — два огня)
   const orbMake=(gold,pi)=>{const g=new THREE.Group(),col=gold?0xffd23a:PCOL[G.solo?0:pi];addMesh(new THREE.SphereGeometry(1.1,12,10),K5L.INKM,0,0,0,g);
     const r=new THREE.Mesh(new THREE.TorusGeometry(1.75,0.2,6,28),new THREE.MeshBasicMaterial({color:col,fog:false,toneMapped:false}));g.add(r);if(gold){const r2=r.clone();r2.rotation.y=Math.PI/2;g.add(r2);}
     g.add(new THREE.Mesh(new THREE.SphereGeometry(1.7,10,8),k5Add(col,{opacity:0.25})));const from=CL.pos.clone().add(new V3(rand(-3,3),1,2));g.position.copy(from);k5Prop(g);K5L.noRay(g);
     orbs.push({g,isOrb:true,gold,pi,from,t:0,dur:G.solo?3.9:3.2,hits:[-9,-9],hp:2,alive:true,ph:rand(0,6),pos:g.position});try{KA.pose('castR',{antic:0.1});}catch(e){}if(SFX.thwip)SFX.thwip();};
   const orbPop=o=>{o.alive=false;PRO.orbs++;if(SFX.brk)SFX.brk();K5L.gold(o.g.position.clone(),o.gold?30:14);burst(o.g.position.clone(),o.gold?0xffd23a:0xb070ff,o.gold?24:12,o.gold?6:4);k5Del(o.g);
     if(o.gold){GV.rush=1.2;PRO.got+=3;ft(o.g.position.clone().add(new V3(0,2.6,0)),'Золотой — разом! +3 буквы','#ffd76a');}};
   const orbHit=(o,pi)=>{if(!o.alive)return;if(!o.gold){orbPop(o);return;}
     if(G.solo){o.hp--;if(o.hp<=0)orbPop(o);else ft(o.g.position.clone().add(new V3(0,2.4,0)),'ещё огонь!','#ffe08a');return;}
     o.hits[pi]=PRO.t;if(Math.abs(o.hits[0]-o.hits[1])<0.8)orbPop(o);else ft(o.g.position.clone().add(new V3(0,2.4,0)),pi?'а левая?':'а правая?','#ffe08a');};
   const orbsTick=dt=>{for(const o of orbs){if(!o.alive)continue;o.t+=dt;const k=Math.min(1,o.t/o.dur),hp=hpos(o.gold?MIDH:HEADS[G.solo?o.pi%2:o.pi]);
       o.g.position.lerpVectors(o.from,hp,k);o.g.position.y+=Math.sin(k*Math.PI)*4;o.g.position.x+=Math.sin(o.t*3+o.ph)*1.2*(1-k);o.g.children[1].rotation.z+=dt*3;if(o.gold)o.g.children[2].rotation.x+=dt*3;
       if(k>=1){o.alive=false;k5Del(o.g);bump('Чернильный шар!',hp);}}
     orbs=orbs.filter(o=>o.alive);};
   /* ---------- огонь: сам летит в своего ворона или свой шар ---------- */
   const fireTgt=(pi,hp)=>{const L=[];for(const c of crows)if(c.alive&&!c.leave&&(G.solo||c.pi===pi||c.lead))L.push(c);for(const o of orbs)if(o.alive&&(o.gold||G.solo||o.pi===pi))L.push(o);
     L.sort((a,b)=>a.pos.distanceTo(hp)-b.pos.distanceTo(hp));return L[0]||null;};
   const fire=pi=>{const hp=hpos(HEADS[pi]);const m=new THREE.Mesh(new THREE.SphereGeometry(0.5,10,8),MB(0xffa040));m.position.copy(hp);k5Prop(m);
     fires.push({m,pi,tg:fireTgt(pi,hp),vel:new V3(IN[pi].x*7,IN[pi].y*3+0.5,-(GV.sp+46)),t:0});if(SFX.whoosh)SFX.whoosh();const hh=HEADS[pi];anim(0.25,k=>{hh.jaw.rotation.x=Math.sin(k*Math.PI)*0.6;});};
   const crowsTick=dt=>{for(const c of crows){if(!c.alive)continue;c.t+=dt;
       const tgt=c.leave?c.pos.clone().add(new V3(c.off.x>0?20:-20,10,-GV.sp*0.6)):new V3(PX+GP.x,GP.y,GP.z).add(c.off);c.pos.lerp(tgt,1-Math.exp(-(c.leave?1.2:2.4)*dt));
       c.m.g.position.copy(c.pos);c.m.g.lookAt(PX+GP.x,GP.y+4,GP.z);c.m.wings.forEach(q=>{q.w.rotation.z=q.s*Math.sin(G.time*(c.lead?9:14)+c.t)*0.5;});c.m.ring.rotation.z+=dt*2;if(c.m.ring2)c.m.ring2.rotation.x+=dt*2;
       c.cd-=dt;if(!c.leave&&c.cd<=0&&c.t>1.4){c.cd=c.lead?(G.solo?2.4:1.7):rand(2.6,3.4)*(G.solo?1.25:1);dropThrow(c);c.throws++;if(c.throws>=(c.lead?8:3))later(1.6,()=>{c.leave=true;});}
       if(c.leave&&c.pos.distanceTo(fp())>60){c.alive=false;k5Del(c.m.g);}}
     for(const d of drops){d.t+=dt;
       if(!d.refl){const hp=hpos(HEADS[d.pi]),k=Math.min(1,d.t/d.dur);d.g.position.lerpVectors(d.from,hp,k);d.g.position.y+=Math.sin(k*Math.PI)*1.5;d.g.scale.setScalar(1+0.25*Math.sin(G.time*20));if(d.t>=d.dur){d.dead=true;bump('Ай! Чернила!',hp);}}
       // отбитая капля летит в своего ворона за 0,3 с ровно — и сбивает его (раньше догоняла плавно и не догоняла летящего ворона)
       else{const k=Math.min(1,d.t/0.3);if(d.c.alive){d.g.position.lerpVectors(d.rf,d.c.pos,k);d.g.position.y+=Math.sin(k*Math.PI)*0.8;if(k>=1){crowDmg(d.c,d.pi,2,'refl');d.dead=true;}}else{d.g.position.z-=40*dt;if(d.t>0.6)d.dead=true;}}}
     drops=drops.filter(d=>{if(d.dead)k5Del(d.g);return !d.dead;});
     for(const f of fires){f.t+=dt;const tg=f.tg&&f.tg.alive?f.tg:null;
       if(tg){const v=tg.pos.clone().sub(f.m.position);const L=v.length();f.m.position.addScaledVector(v,Math.min(1,dt*60/Math.max(L,0.01)));if(L<1.9){f.t=9;burst(tg.pos.clone(),0xff8a30,10,3);if(tg.isOrb)orbHit(tg,f.pi);else crowDmg(tg,f.pi,1,'fire');}}
       else f.m.position.addScaledVector(f.vel,dt);if(Math.random()<0.5)burst(f.m.position.clone(),0xffa040,1,1,0.4);}
     fires=fires.filter(f=>{if(f.t>1.2){k5Del(f.m);return false;}return true;});};
   /* ---------- 5. буквы-стены: штрихи [u1,w1,u2,w2] в плоскости полёта (u — вбок от середины, w — вверх от середины) ---------- */
   const GLY={'Ш':{s:[[-14,-10,-14,11],[0,-10,0,11],[14,-10,14,11],[-15.6,-8.6,15.6,-8.6]],safe:[[-7,1],[7,1]]},
     'О':{o:[10,8],safe:[[0,0]]},
     'Х':{s:[[-17,-10,17,10],[-17,10,17,-10]],safe:[[-11,0],[11,0],[0,7],[0,-7]]},
     'Н':{s:[[-14,-10,-14,11],[14,-10,14,11],[-14,0,14,0]],safe:[[0,6],[0,-6]]},
     'Ж':{s:[[0,-10,0,11],[-2,0,-17,10],[-2,0,-17,-10],[2,0,17,10],[2,0,17,-10]],safe:[[-12,0],[12,0]]}};
   const segD=(px,py,ax,ay,bx,by)=>{const dx=bx-ax,dy=by-ay,L2=dx*dx+dy*dy;let k=L2?((px-ax)*dx+(py-ay)*dy)/L2:0;k=Math.max(0,Math.min(1,k));return Math.hypot(px-ax-dx*k,py-ay-dy*k);};
   const glyHit=(ch,u,w)=>{const S=GLY[ch];if(S.o)return (u/(S.o[0]-HR))**2+(w/(S.o[1]-HR))**2>=1;return S.s.some(([a,b,c,d])=>segD(u,w,a,b,c,d)<HR);};
   const inkM=()=>M(0x170a24,{emissive:0x4a1a7a,emissiveIntensity:0.75,transparent:true,opacity:1});
   // «О~» — плывущая О: просвет ходит вбок, лети за ним
   const letterMake=ch0=>{const ch=ch0==='О~'?'О':ch0,S=GLY[ch],g=new THREE.Group(),parts=[],mi=inkM(),gm=k5Add(0xb070ff,{opacity:0.25});
     if(S.o){const [rx,ry]=S.o;const r=new THREE.Mesh(new THREE.TorusGeometry(rx,1.6,10,40),mi);r.scale.y=ry/rx;g.add(r);parts.push(r);
       const sh=new THREE.Shape();sh.moveTo(-40,-13);sh.lineTo(40,-13);sh.lineTo(40,14);sh.lineTo(-40,14);sh.lineTo(-40,-13);const ho=new THREE.Path();ho.absellipse(0,0,rx,ry,0,Math.PI*2,true);sh.holes.push(ho);
       const hz=new THREE.Mesh(new THREE.ShapeGeometry(sh,32),new THREE.MeshBasicMaterial({color:0x1a0c2a,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));hz.position.z=-0.4;g.add(hz);parts.push(hz);g.userData.haze=hz;}
     else for(const [a,b,c,d] of S.s){const L=Math.hypot(c-a,d-b),ang=Math.atan2(d-b,c-a);const m=new THREE.Mesh(new THREE.BoxGeometry(L,3.2,1.2),mi);m.position.set((a+c)/2,(b+d)/2,0);m.rotation.z=ang;g.add(m);
       const o=new THREE.Mesh(new THREE.BoxGeometry(L+0.6,4.2,0.5),gm);o.position.copy(m.position);o.rotation.z=ang;g.add(o);parts.push(m,o);}
     const marks=S.safe.map(([u,w])=>{const r=new THREE.Mesh(new THREE.TorusGeometry(1.8,0.28,8,28),new THREE.MeshBasicMaterial({color:0xffb820,transparent:true,opacity:0,depthWrite:false,fog:false,toneMapped:false}));r.position.set(u,w,0.6);g.add(r);return r;});
     g.position.set(PX,V0,CL.pos.z+5);k5Prop(g);K5L.noRay(g);parts.forEach(p=>{p.scale.x=0.01;});
     const spr=new THREE.Sprite(new THREE.SpriteMaterial({map:K5L.letterT(ch),transparent:true,depthWrite:false,fog:false,toneMapped:false,opacity:0}));spr.raycast=()=>{};k5Prop(spr);spr.position.copy(KS.g.position).add(new V3(0,8,2));
     letters.push({g,ch,slide:ch0==='О~',ox:0,parts,marks,spr,mi,gm,t:0,z:g.position.z,passed:false});try{KA.pose('castR',{antic:0.15});}catch(e){}
     if(AUD.ready()){AUD.nz({type:'bandpass',f0:2600,f1:1400,d:0.6,v:0.06,q:4,a:0.01});}ft(KS.g.position.clone().add(new V3(0,9.5,0)),'«'+ch+'»','#c8a0ff');};
   const lettersTick=dt=>{for(const L of letters){L.t+=dt;const k=Math.min(1,L.t/0.9),n=L.parts.length;
       if(L.slide&&!L.passed){L.ox=Math.sin(L.t*1.15)*7;L.g.position.x=PX+L.ox;}
       L.parts.forEach((p,i)=>{const a=i/n*0.75,b=a+0.25;p.scale.x=Math.max(0.01,Math.min(1,(k-a)/(b-a)));});if(L.g.userData.haze&&!L.passed)L.g.userData.haze.material.opacity=0.6*k;
       L.marks.forEach((r,i)=>{r.material.opacity=L.passed?0:Math.min(0.95,Math.max(0,(L.t-0.7)*2))*(0.7+0.3*Math.sin(G.time*8+i));r.rotation.z+=dt*2;});
       L.spr.material.opacity=k<1?Math.min(1,k*4):Math.max(0,1-(L.t-0.9)*3);L.spr.scale.setScalar(1+k*5);
       if(!L.passed&&GP.z<=L.z+0.3){L.passed=true;const f=fp(),u=f.x-PX-L.ox,w=f.y-V0;
         if(glyHit(L.ch,u,w))bump('Задели «'+L.ch+'»!');else{PRO.clean++;K5L.gold(f.clone().add(new V3(0,0,-2)),16);if(AUD.ready())AUD.bell(880,{v:0.06,d:0.7});ft(f.clone().add(new V3(0,3,0)),'Сквозь «'+L.ch+'»!','#ffd76a');}}
       if(L.passed){L.pt=(L.pt||0)+dt;const o=Math.max(0,1-L.pt*2.5);L.mi.opacity=o;L.gm.opacity=0.25*o;if(L.g.userData.haze)L.g.userData.haze.material.opacity=0.6*o;}}
     letters=letters.filter(L=>{if(L.passed&&L.pt>0.5){k5Del(L.g);k5Del(L.spr);return false;}return true;});};
   /* ---------- отрезки ---------- */
   const LEGS=['forest','gorge','sea','sky','write','three'];
   const legGorge=()=>{PRO.leg='gorge';E.hintReset(7);PRO.th='gorge';WV.d=50;WV.out=false;WV.g.visible=true;WV.g.scale.y=1;banner('Чернильная волна!','#ffb070',2.4,'за спиной — уходим вместе, сквозь обручи');
     later(0.4,()=>say('koschei','Чернила мои, за ними — залейте!',2.2));};
   const legSea=()=>{PRO.leg='sea';E.hintReset(7);WV.out=true;WV.ot=0;K5L.ink(new V3(PX,8,GP.z+WV.d),30,3);PRO.wave=0;PRO.wT=1.2;PRO.th='sea';if(window.k5StormSet)k5StormSet(0.5);banner('Через моря!','#9fe0ff',2.4,'вырвались! ворон твоего цвета — твой');
     later(0.6,()=>say('koschei','Ушли от волны? Вороны мои — ко мне!',2.2));};
   const legSky=()=>{PRO.leg='sky';E.hintReset(7);for(const c of crows)c.leave=true;PRO.th='sky';if(window.k5StormSet)k5StormSet(0);CS.visible=true;CL.gapTo=36;PRO.vi=0;PRO.vT=2.6;
     banner('Над облаками!','#ffffff',2.4,'шар твоего цвета — твой огонь, золотой — оба разом');later(0.5,()=>say('koschei','Высоко забрались? Ловите-ка шары мои!',2.2));};
   const legWrite=()=>{PRO.leg='write';E.hintReset(7);LK.position.z=GP.z-560;for(const c of crows)c.leave=true;CL.gapTo=40;PRO.wi=0;PRO.wT=2.6;PRO.th='write';if(window.k5StormSet)k5StormSet(0);
     banner('Почерк Кощея!','#c8a0ff',2.4,'в просвет — к золотым кольцам');later(0.4,()=>say('koschei','Ах так? Я вас самих перепишу!',2.4));
     later(3.2,()=>say('gorM','Рулим вместе — в просвет!',1.8));};
   const legThree=()=>{PRO.leg='three';E.hintReset(7);CL.gapTo=18;PRO.cnt=null;PRO.cT=1.8;banner('Догнали тучу!','#ffd76a',2.2,'на «три» — вместе '+K(0,'skill')+(G.solo?'':' и '+K(1,'skill')));
     say('gorM','Моя очередь! Вы — «раз-два-три», я — огонь!',2.4);};
   // туча прожжена: золотой салют — буквы пролога разлетаются из тучи
   const salute=()=>{const c=CL.pos.clone();for(let i=0;i<26;i++){const s=K5L.textSpr(LET[i%LET.length],2.6,{w:128,h:128,col:'#ffe08a',glow:'#ffb030',weight:'italic 700 '});k5Prop(s);s.position.copy(c);
       const v=new V3(rand(-1,1),rand(0.4,1.2),rand(-1,0.6)).normalize().multiplyScalar(rand(10,18));k5fx(1.8,(k,dt)=>{s.position.addScaledVector(v,dt);v.y-=dt*6;s.material.opacity=1-k;},()=>k5Del(s));}
     for(let i=0;i<6;i++)later(i*0.25,()=>{const q=c.clone().add(new V3(rand(-12,12),rand(2,12),rand(-6,6)));k5Flash(q,[0xffd76a,0xff9ad0,0x9fe0ff][i%3],6,0.4);K5L.gold(q,20);if(AUD.ready())AUD.bell(660+i*110,{v:0.05,d:0.6});});};
   const midFire=()=>{PRO.cnt=null;DG.visible=false;PRO.leg='burn';const hp=hpos(MIDH),to=CL.pos.clone();if(SFX.whoosh)SFX.whoosh();if(SFX.ok)SFX.ok();
     for(let i=0;i<26;i++)later(i*0.03,()=>{burst(hp.clone().lerp(to,i/26),0xff8a30,5,3);});anim(0.8,k=>{MIDH.jaw.rotation.x=Math.sin(k*Math.PI)*0.7;});E.log('proBurn');
     later(0.8,()=>{shakeAll(0.15,0.6);k5Flash(CL.pos.clone(),0xffb060,10,0.5);salute();anim(1.2,k=>{CL.cm.opacity=1-k;CL.g.scale.setScalar(1+k*0.5);});if(SFX.brk)SFX.brk();
       banner('Туча прожжена!','#ffd76a',2.6,'Кощей падает к дубу Лукоморья');try{KA.pose('recoil');}catch(e){}PRO.fall=true;say('koschei','А-а-а! Ничего… Лукоморье — моё! Перепишу!',2.6);
       const f=KS.g.position.clone(),to2=OAKW.clone().add(new V3(0,35,8));anim(3.0,k=>{KS.g.position.lerpVectors(f,to2,smooth(k));KS.g.position.y+=Math.sin(k*Math.PI)*6;KS.g.rotation.z=Math.sin(k*9)*0.3;if(Math.random()<0.3)K5L.ink(KS.g.position.clone(),2);});
       later(3.4,()=>{if(!PRO.on)return;PRO.leg='end';KS.g.rotation.z=0;E.paper(()=>{const d=PRO.done;proEnd();if(d)d();},1.4);});});};
   const countTick=dt=>{const C0=PRO.cnt;if(!C0){PRO.cT-=dt;if(PRO.cT<=0&&CL.gap<24){PRO.cnt={t:-0.3,press:[null,null],last:-1};}return;}
     const B=G.solo?0.85:0.75,k=Math.floor(C0.t/B);C0.t+=dt;DG.visible=k>=0&&k<3;DG.position.copy(CL.pos).add(new V3(0,8.5,4));
     if(k!==C0.last&&k>=0&&k<3){C0.last=k;setDigit(DG,k+1);tone(k===2?1320:880,0.12,'square',0.08);banner(['Раз…','Два…','ТРИ — вместе!'][k],k===2?'#ffd76a':'#ffe8b0',0.6);}
     const T3=2*B,win=PRO.tries>=2?0.6:0.42,ok=pi=>C0.press[pi]!==null&&Math.abs(C0.press[pi]-T3)<win;
     if(ok(0)&&(G.solo||ok(1)))midFire();
     else if(C0.t>T3+win+0.1){PRO.cnt=null;DG.visible=false;PRO.tries++;PRO.cT=2.2;CL.gap=30;if(SFX.miss)SFX.miss();shakeAll(0.1,0.4);
       banner('Не вместе!','#ffd0d0',1.6,'туча отлетела — ещё раз: на «три», разом');}};
   /* ---------- управление: каждый ведёт свою голову ---------- */
   const proCustom=(pi,h,dt,c)=>{if(c.lock||!PRO.on||G.cine||PRO.leg==='end'||PRO.leg==='burn'){IN[pi].x=0;IN[pi].y=0;return;}IN[pi].x=clamp(c.ix,-1,1);IN[pi].y=clamp(c.iz,-1,1);
     const p=players[pi];p.fireCd=Math.max(0,(p.fireCd||0)-dt);
     if(tap(pi,'attack')&&p.fireCd<=0){p.fireCd=0.4;fire(pi);}
     if(tap(pi,'guard')){shieldFx(pi);const d=drops.find(q=>q.pi===pi&&!q.refl);if(d){if(d.dur-d.t<=0.85){d.refl=true;d.t=0;d.rf=d.g.position.clone();if(SFX.parry)SFX.parry();G.stats.parries++;ft(hpos(HEADS[pi]).add(new V3(0,1.4,0)),'Отбил!',PCSS[pi]);}
         else ft(hpos(HEADS[pi]).add(new V3(0,1.4,0)),'Рано — подпусти поближе','#dddddd');}}
     if(tap(pi,'skill')){if(PRO.cnt){if(PRO.cnt.press[pi]===null)PRO.cnt.press[pi]=PRO.cnt.t;}else ft(hpos(MIDH).add(new V3(0,1.6,0)),'Средней голове нужен счёт «раз-два-три»','#ffe0a0');}};
   /* ---------- шаг полёта ---------- */
   W.updates.push(dt=>{if(!PRO.on)return;skyTick(dt);
     if(PRO.splT>0){PRO.splT-=dt;const el=document.getElementById('k5eInk');if(el)el.style.opacity=Math.max(0,Math.min(1,PRO.splT)).toFixed(2);}
     for(const c of decs)if(c.position.z>GP.z+40){c.position.z-=280;c.position.x=PX+(Math.random()<0.5?1:-1)*rand(26,70);}
     if(CS.visible)for(const c of puffs)if(c.position.z>GP.z+40){c.position.z-=240;c.position.x=PX+rand(-70,70);}
     // полосы скорости и золотой шлейф на разгоне
     const sk=clamp((GV.sp-11.5)/6,0,1);for(const m of streaks){if(m.position.z>GP.z+22||m.position.z<GP.z-90)m.position.set(PX+GP.x+rand(-18,18),GP.y+rand(-6,14),GP.z-rand(40,80));m.material.opacity=sk*0.55;}
     if((GV.agreeT>1||GV.rush>0)&&!G.cine){PRO.trT=(PRO.trT||0)-dt;if(PRO.trT<=0){PRO.trT=0.06;burst(pg.g.localToWorld(new V3(rand(-4.5,4.5),5,2)),0xffd76a,1,1.5,0.6);}}
     if(G.cine||G.state!=='play'){place();clPlace(dt);return;}
     PRO.t+=dt;const fly=LEGS.indexOf(PRO.leg)>=0;
     if(fly){const a=IN[0],b=G.solo?IN[0]:IN[1],la=Math.hypot(a.x,a.y),lb=Math.hypot(b.x,b.y),dot=(la>0.3&&lb>0.3)?(a.x*b.x+a.y*b.y)/(la*lb):0;
       GV.agreeT=dot>0.75?GV.agreeT+dt:0;GV.fight=dot<-0.3?GV.fight+dt:0;const chase=PRO.leg==='forest'||PRO.leg==='gorge'||PRO.leg==='sea';
       const want=(chase?(GV.agreeT>1?17:GV.fight>0.3?8:11):PRO.leg==='sky'?11:10)+(GV.rush>0?5:0);GV.sp=damp(GV.sp,want-(GV.bump>0?6:0),2.5,dt);GV.bump=Math.max(0,GV.bump-dt);GV.rush=Math.max(0,GV.rush-dt);
       if(chase&&GV.agreeT>1&&!GV.boostOn){GV.boostOn=true;if(SFX.whoosh)SFX.whoosh();if((PRO.boosts=(PRO.boosts||0)+1)<=2)ft(hpos(MIDH).add(new V3(0,1.8,0)),'Вместе — разгон!','#ffd76a');if(!PRO.boostTold){PRO.boostTold=true;say('gorM','Вот! Вместе — вот так!',1.6);}}
       if(GV.agreeT<=1)GV.boostOn=false;
       if(!G.solo&&GV.fight>0.3&&!PRO.grumble){PRO.grumble=true;say(Math.random()<0.5?'gorL':'gorR',['Мне налево, налево!','Мне направо, направо!','Тянут в разные стороны — ох, беда!'][Math.floor(rand(0,3))],1.4);later(3,()=>{PRO.grumble=false;});}
       const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;GV.x=damp(GV.x,mx*9,3,dt);GV.y=damp(GV.y,my*6,3,dt);GP.x=clamp(GP.x+GV.x*dt,-XL,XL);GP.y=clamp(GP.y+GV.y*dt,YL[0],YL[1]);GP.z-=GV.sp*dt;
       if(chase){CL.gap=clamp(CL.gap+(13-GV.sp)*dt,26,100);}}
     else if(PRO.leg==='burn'||PRO.leg==='end'){GV.sp=damp(GV.sp,8,2,dt);GP.z-=GV.sp*dt;GP.x=damp(GP.x,0,1.5,dt);GV.x=damp(GV.x,0,3,dt);}
     place();if(!PRO.fall)clPlace(dt);
     // золотые буквы
     if(PRO.leg==='forest'||PRO.leg==='gorge'||PRO.leg==='sea'){PRO.pT-=dt;if(PRO.pT<=0){PRO.pT=PRO.leg==='forest'?rand(0.9,1.4):rand(1.9,2.6);pageSpawn();}}
     for(const p of pages){p.t+=dt;const k=Math.min(1,p.t/1.1);if(k<1){p.s.position.lerpVectors(p.from,p.to,smooth(k));p.s.position.y+=Math.sin(k*Math.PI)*3;}else{p.to.y=Math.max(YL[0]+1,p.to.y-dt*0.5);p.s.position.set(p.to.x+Math.sin(G.time*2+p.ph)*0.6,p.to.y,p.to.z);}
       p.s.material.rotation=Math.sin(G.time*3+p.ph)*0.3;const f=fp();if(Math.abs(p.s.position.z-f.z)<2.8&&Math.hypot(p.s.position.x-f.x,p.s.position.y-f.y)<3.9){p.dead=true;pageGot(p);}else if(p.s.position.z>GP.z+6)p.dead=true;}
     pages=pages.filter(p=>{if(p.dead)k5Del(p.s);return !p.dead;});
     hoopsTick(dt);spiresTick(dt);rocksTick();waveTick(dt);crowsTick(dt);orbsTick(dt);lettersTick(dt);
     if(PRO.leg==='forest'&&GP.z<GZ[0])legGorge();
     if(PRO.leg==='gorge'&&GP.z<GZ[1])legSea();
     if(PRO.leg==='sea'){PRO.wT-=dt;const all=PRO.WV.length;if(PRO.wave<=all&&PRO.wT<=0&&crows.every(c=>!c.alive||c.leave)){if(PRO.wave<all)crowWave(PRO.WV[PRO.wave]);else leaderWave();PRO.wave++;PRO.wT=1.8;}
       if((PRO.wave>all&&crows.every(c=>!c.alive)&&GP.z<GZ[1]-300)||GP.z<GZ[1]-560)legSky();}
     if(PRO.leg==='sky'){PRO.vT-=dt;if(PRO.vi<PRO.VQ.length&&PRO.vT<=0&&!orbs.length){const V=PRO.VQ[PRO.vi++];V.forEach((k,i)=>later(i*0.5,()=>{if(PRO.leg==='sky')orbMake(k==='g',k==='2'?1:0);}));PRO.vT=1.6+V.length*0.5;
         if(PRO.vi===2&&!G.solo)later(0.8,()=>say('gorM','Золотой — огонь обеих голов разом!',2));}
       if(PRO.vi>=PRO.VQ.length&&!orbs.length&&PRO.vT<=0)legWrite();}
     if(PRO.leg==='write'){PRO.wT-=dt;if(PRO.wi<PRO.WQ.length&&PRO.wT<=0&&CL.gap>34){letterMake(PRO.WQ[PRO.wi]);PRO.wi++;PRO.wT=G.solo?4.8:4.2;}
       if(PRO.wi>=PRO.WQ.length&&!letters.length)legThree();}
     if(PRO.leg==='three')countTick(dt);
     // строка пролога над полем — доля пути; заметка — что важно сейчас
     const li=LEGS.indexOf(PRO.leg),fr=PRO.leg==='forest'?-GP.z/-GZ[0]:PRO.leg==='gorge'?(GZ[0]-GP.z)/(GZ[0]-GZ[1]):PRO.leg==='sea'?PRO.wave/(PRO.WV.length+1):PRO.leg==='sky'?PRO.vi/PRO.VQ.length:PRO.leg==='write'?PRO.wi/PRO.WQ.length:0.5;
     ES.prog=li<0?1:Math.min(1,(li+clamp(fr,0,1))/LEGS.length);
     ES.note=(PRO.leg==='gorge'?'волна в '+Math.max(0,Math.round(WV.d))+' м · ':PRO.leg==='forest'||PRO.leg==='sea'?'до тучи '+Math.round(CL.gap)+' м · ':'')+'букв '+PRO.got+(PRO.hoops?' · обручей '+PRO.hoops:'');});
   W.custom0=W.custom;
   PRO.dbg=()=>({GP,GV,CL,WV,pages,spires,crows,drops,letters,hoops,rocks,orbs,GLY,V0,PX,PY,YL,GZ,LK,sc});   // для ботов (tk5e_prolog)
   /* ---------- цели и рисунки кнопок ---------- */
   E.note=n=>n===0?(ES.note||''):'';
   E.stage[0]={pics:pi=>({forest:['dragon','>','ring','+','letter'],gorge:['wave','>','dragon','>','ring'],sea:['bird','@attack','+','ink','@guard'],sky:['koschei','light','>','@attack'],
       write:['letter','>','ring','dragon'],three:['two','sync','@skill','>','cloud']})[PRO.leg]||null,goal:pi=>{const q=KP_(pi),hd=G.solo?'Обе головы — твои: ':(pi?'Правая голова — твоя: ':'Левая голова — твоя: ');
       if(PRO.leg==='forest')return hd+MOVEK(q)+'. Ловите <b>золотые буквы</b> и летите сквозь <b>золотые обручи</b> — рывок.<br>'+(G.solo?'Держи направление — разгон':'Тяните в одну сторону — разгон')+'. <b>Красный столб</b> — вырастет чёрная ель: облетай.';
       if(PRO.leg==='gorge')return '<b>Чернильная волна за спиной!</b> '+(G.solo?'Держи направление':'Тяните вместе')+' — разгон, и сквозь <b>обручи</b> — рывок.<br><b>Скалы</b> — облетай, <b>мост</b> — под ним или поверху.';
       if(PRO.leg==='sea')return '<b>Вороны Кощея!</b> '+(G.solo?'Огонь':'Ворон с кольцом твоего цвета — твой: огонь')+' '+K(q,'attack')+' сам летит в ворона.<br>Капля — <b>щит '+K(q,'guard')+' в последний миг</b>: летит обратно и сбивает ворона.';
       if(PRO.leg==='sky')return '<b>Шары Кощея!</b> '+(G.solo?'Огонь':'Шар с кольцом твоего цвета — твой огонь')+' '+K(q,'attack')+'.<br><b>Золотой</b> — '+(G.solo?'два огня подряд':'огонь обеих голов разом')+'.';
       if(PRO.leg==='write')return '<b>Почерк Кощея:</b> пролетите сквозь букву — туда, где <b>золотые кольца</b>. Плывущая «О» — лети за просветом.<br>'+(G.solo?'':'Рулите вместе: Горыныч летит посерёдке между вашими головами.');
       if(PRO.leg==='three')return 'На «три» — вместе '+K(q,'skill')+': средняя голова прожжёт тучу.';
       return K5L.LINES[0];},targets:()=>[],end:()=>{proEnd();}};
   for(const pi of[0,1]){const mine=()=>PRO.on&&(!G.solo||pi===0),dropNear=()=>drops.some(d=>!d.refl&&(G.solo||d.pi===pi)&&d.dur-d.t<0.95);
     prompt(pi,'guard',()=>{const d=drops.find(q=>!q.refl&&(G.solo||q.pi===pi));return hpos(HEADS[d?d.pi:pi]).add(new V3(0,1.8,0));},()=>mine()&&dropNear());
     prompt(pi,'attack',()=>{const t=fireTgt(pi,hpos(HEADS[pi]));return t?t.pos.clone().add(new V3(0,t.lead?4.4:2.6,0)):fp();},()=>mine()&&(PRO.leg==='sea'||PRO.leg==='sky')&&!!fireTgt(pi,hpos(HEADS[pi]))&&!dropNear(),
       ()=>{const t=fireTgt(pi,hpos(HEADS[pi]));return t&&(t.gold||t.lead)&&!G.solo?'вместе!':'';});
     prompt(pi,'skill',()=>hpos(MIDH).add(new V3(G.solo?0:pi?1:-1,2,0)),()=>mine()&&PRO.leg==='three'&&!!PRO.cnt,'на «три»');}
   // подсказки в мире над Горынычем: волна близко, мост впереди
   prompt(0,'label',()=>hpos(MIDH).add(new V3(0,2.6,0)),()=>PRO.on&&PRO.leg==='gorge'&&WV.d<16,()=>G.solo?'волна! держи направление — разгон':'волна! тяните вместе — разгон');
   prompt(0,'label',()=>hpos(MIDH).add(new V3(0,2.6,0)),()=>PRO.on&&PRO.leg==='gorge'&&rocks.some(R=>R.arch&&GP.z-R.z>0&&GP.z-R.z<45)&&GP.y>10.8&&GP.y<21,'мост! вниз — под него');
   E.PAUSE[0]='<b>'+K5E.NAMES[0]+'</b><br><i>'+K5L.LINES[0]+'</i><br>Погоня на Горыныче: Игрок 1 ведёт левую голову, Игрок 2 — правую, Горыныч летит посерёдке; вместе в одну сторону — разгон.<br>'+
     'Лес — буквы и обручи, ущелье — уйти от чернильной волны, море — вороны, над облаками — шары Кощея, потом буквы-стены и «раз-два-три».<br>'+
     'Удар — огонь своей головы, щит в последний миг — капля летит обратно, умение на «три» — огонь средней головы. Tab — панель стадий и оценок.';
   /* ---------- начало и конец ---------- */
   const proEnd=()=>{if(!PRO.on)return;PRO.on=false;PRO.done=null;W.custom=W.custom0||null;W.soloMirror=PRO.mirror0;W.camFn=null;W.fallY=-12;
     for(const a of[pages.map(p=>p.s),spires.map(s=>s.m),spires.map(s=>s.mk),crows.map(c=>c.m.g),drops.map(d=>d.g),fires.map(f=>f.m),letters.map(L=>L.g),letters.map(L=>L.spr),hoops.map(H=>H.g),rocks.map(R=>R.g),orbs.map(o=>o.g)])a.forEach(o=>{if(o)k5Del(o);});
     pages=[];spires=[];crows=[];drops=[];fires=[];letters=[];hoops=[];rocks=[];orbs=[];sc.visible=false;pg.g.visible=false;CL.g.visible=false;DG.visible=false;WV.g.visible=false;WV.out=false;CS.visible=false;PRO.fall=false;
     KS.g.rotation.z=0;try{KA.reset();}catch(e){}if(window.k5StormSet)k5StormSet(0,true);for(const id of['k5eInk','k5eWave']){const el=document.getElementById(id);if(el)el.style.opacity=0;}delete ES.prog;delete ES.note;};
   {const el=document.getElementById('k5eWave');if(el)el.style.opacity=0;}
   E.prologue=done=>{proBuild();K5.fight=false;liveBoss(false);dome.visible=false;candles.forEach(c=>{c.g.visible=false;});E.cur=0;K5E.cur=0;try{K5E.badge&&K5E.badge();}catch(e){}
     Object.assign(PRO,{on:true,leg:'intro',done,t:0,got:0,li:0,hits:0,crows:0,orbs:0,hoops:0,combo:0,caught:0,clean:0,tries:0,wave:0,wi:0,vi:0,pT:0.5,wT:0,vT:0,cnt:null,cT:0,fall:false,splT:0,boosts:0,
       boostTold:false,grumble:false,wallTold:false,archTold:false,waveTold:false,
       WV:G.solo?[2,2,3]:[2,4,4],VQ:G.solo?[['1'],['1','2'],['g','1'],['2','g'],['1','2','g']]:[['1','2'],['1','2','g'],['1','1','2','2'],['g','g'],['g','1','2','g'],['1','2','1','2','g']],
       WQ:G.solo?['Ш','О','Х','Н','Ж','О~']:['Ш','О','Х','Н','Ж','О~','Х','Ж'],mirror0:!!W.soloMirror});
     GP.set(0,(YL[0]+YL[1])/2,30);Object.assign(GV,{x:0,y:0,sp:11,agreeT:0,fight:0,bump:0,rush:0,boostOn:false});IN.forEach(q=>{q.x=0;q.y=0;});CL.gap=70;CL.gapTo=null;CL.cm.opacity=1;CL.g.scale.setScalar(1);WV.d=50;WV.out=false;
     spires=[-62,-92,-120,-148,-176,-232,-258,-284,-312,-344].map((z,i)=>({z,u:i===4||i===6?0:(i%2?1:-1)*rand(3,9),st:0,t:0,m:null,mk:null}));
     for(const u of[-10,0,10])spires.push({z:-205,u,wall:true,st:0,t:0,m:null,mk:null});   // на 205 м — стена из трёх елей: только поверху (над ней — обруч)
     [-45,-78,-106,-134,-162,-245,-272,-300,-330,-360].forEach((z,i)=>hoopMake(Math.round(8*Math.sin(i*0.9)),17+Math.round(5*Math.sin(i*1.3+1)),z));hoopMake(0,25.5,-212);
     // ущелье: скалы-ворота (обруч — с другой стороны от скалы), мосты (обруч под первым, над вторым)
     // [скала u, z, обруч u] — обруч в 8 м от скалы, змейкой без резких бросков
     const GT=[[-7,-420,1],[6,-455,-2],[0,-490,-8],[-9,-520,-1],[8,-550,0],[-3,-610,5],[5,-640,-3],[-6,-670,2],[7,-700,-1],[-4,-730,4]];
     rocks=GT.map(([u,z])=>({u,z}));rocks.push({arch:true,z:-580},{arch:true,z:-765});for(const [,z,h] of GT)hoopMake(h,17,z);hoopMake(0,13.4,-580);hoopMake(0,27,-765);
     W.custom0=W.custom;W.custom=proCustom;W.soloMirror=true;W.pauseLine=E.PAUSE[0];W.fallY=-1e4;W.clampR=null;sc.visible=true;pg.g.visible=true;CL.g.visible=true;CS.visible=false;WV.g.visible=false;
     KS.g.visible=true;KS.g.rotation.set(0,0,0);book.g.visible=true;book.g.userData.free=false;PRO.th='forest';skyTick(0,true);if(window.k5StormSet)k5StormSet(0,true);K5L.music('storm',0);place();clPlace(0.016);
     W.camFn=()=>{const w=PRO.leg==='write'||PRO.leg==='three';
       return w?{pos:new V3(PX+GP.x*0.55,GP.y+10,GP.z+21),look:new V3(PX+GP.x*0.45,V0-1,GP.z-24),roll:-GV.x*0.01,k:4}:{pos:new V3(PX+GP.x*0.8,GP.y+9.5,GP.z+19),look:new V3(PX+GP.x*0.9,GP.y+4.5,GP.z-26),roll:-GV.x*0.012,k:5};};
     // вступление 9,6 с: туча с Кощеем → Кощей крупно → Горыныч сбоку → вид из-за голов, как в полёте; камера считается от Горыныча и тучи
     const z0=GP.z,zt=t=>z0-11*t,TC=[0,3,5.1,7.6];
     const says=G.solo?[[5.2,3.4,'gorM','Обе головы — твои! Держи курс — догоним!']]:[[5.2,1.3,'gorL','Левая голова — Игрока 1!'],[6.5,1.2,'gorR','Правая — Игрока 2!'],[7.7,1.9,'gorM','Тяните дружно — догоним!']];
     const Y=GP.y,dP=t=>[PX,Y,zt(t)],kP=t=>[PX,YL[1]+4,zt(t)-CL.gap],ad=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
     const CAM=[[t=>ad(dP(t),[7,8.5,20]),t=>ad(dP(t),[0,4,-35])],[t=>ad(kP(t),[6,1.5,14]),kP],[t=>ad(dP(t),[12,5,-8]),t=>ad(dP(t),[0,4.5,0])],[t=>ad(dP(t),[0,9.5,19]),t=>ad(dP(t),[0,4.5,-26])]];
     play({dur:9.6,fov:48,camK:6,shots:TC.map((t,i)=>{const t2=i<3?TC[i+1]:9.6;return shot(t,CAM[i][0](t),CAM[i][1](t),CAM[i][0](t2),CAM[i][1](t2),t2-t);}),
       says:[[0.2,2.8,null,'<i>Унёс Кощей тетрадку с Буяна — на Лукоморье. За ним — на Горыныче!</i>',true],[3.0,2.1,'koschei','Не догоните! Перепишу сказку — по-своему!'],...says],
       events:[{t:3.0,fn:()=>{try{KA.pose('proud');}catch(e){}}}],
       tick:t=>{GP.z=zt(t);place();clPlace(0.016);const S=G.cine;if(!S||!S.camPos)return;const kp=CL.pos.clone().add(new V3(0,4,0)),d=new V3(PX+GP.x,GP.y,GP.z);
         const cams=[[d.clone().add(new V3(7,8.5,20)),d.clone().add(new V3(0,4,-35))],[kp.clone().add(new V3(6,1.5,14)),kp],[d.clone().add(new V3(12,5,-8)),d.clone().add(new V3(0,4.5,0))],[d.clone().add(new V3(0,9.5,19)),d.clone().add(new V3(0,4.5,-26))]];
         let i=0;while(i<3&&t>=TC[i+1])i++;S.camPos.copy(cams[i][0]);S.camLook.copy(cams[i][1]);},
       end:()=>{W.anims.length=0;try{KA.reset();}catch(e){}PRO.leg='forest';E.hintReset(8);GP.z=zt(9.6);place();snapCams();
         banner('Через леса!','#ffd76a',3,'ловите золотые буквы · '+(G.solo?'держи направление':'тяните вместе')+' — разгон');}});
     E.log('prologue');};}
