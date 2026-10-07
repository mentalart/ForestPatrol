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
   const GP=new V3(),GV={x:0,y:0,sp:11,agreeT:0,fight:0,bump:0,rush:0,kick:0,boostOn:false},IN=[{x:0,y:0},{x:0,y:0}];
   let pg=null,HEADS=null,MIDH=null,sc=null,CL=null,LK=null,OAKW=null,DG=null,WV=null,CS=null,AURA=null;const decs=[],streaks=[],puffs=[];
   let pages=[],spires=[],crows=[],drops=[],fires=[],letters=[],hoops=[],rocks=[],orbs=[],bonuses=[];
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
     for(let i=0;i<72;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.09,3.2),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthWrite:false,fog:false}));m.position.set(PX+rand(-18,18),rand(4,30),rand(-60,20));g.add(m);streaks.push(m);}
     // облачное море («Над облаками»): клубы под Горынычем, ходят за ним
     CS=new THREE.Group();g.add(CS);CS.visible=false;for(let i=0;i<34;i++){const c=new THREE.Group();c.position.set(PX+rand(-70,70),rand(1,6),rand(-200,30));for(let k=0;k<3;k++)addMesh(new THREE.SphereGeometry(rand(5,9),9,7),MB(0xfdfcff,{transparent:true,opacity:0.92}),rand(-6,6),rand(-1,1),rand(-5,5),c);CS.add(c);puffs.push(c);}
     // волна чернил («Чернильная волна»): стена позади и два «рукава» по стенам ущелья — их видно по краям, когда догоняет
     WV={g:new THREE.Group(),d:50};const wm=M(0x1c1028,{emissive:0x4a1a7a,emissiveIntensity:0.6});addMesh(new THREE.BoxGeometry(2*(XL+6),46,4),wm,0,21,0,WV.g);
     WV.crest=[];for(let i=0;i<12;i++){const b=addMesh(new THREE.SphereGeometry(rand(2.5,4),9,7),wm,-(XL+4)+i*(2*(XL+4))/11,44,rand(-1,1),WV.g);WV.crest.push(b);}
     WV.arms=[-1,1].map(sd=>{const a=new THREE.Group();a.position.set(sd*(XL+3.5),0,0);WV.g.add(a);addMesh(new THREE.BoxGeometry(5,40,30),wm,0,20,-15,a);for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(rand(2.4,3.4),9,7),wm,-sd*rand(0,1.5),rand(4,36),-29,a);return a;});
     g.add(WV.g);WV.g.visible=false;
     sc=k5Prop(g);K5L.noRay(sc);sc.visible=false;
     pg=makeGorynych5(0.8);pg.g.rotation.y=Math.PI;k5Prop(pg.g);K5L.noRay(pg.g);pg.g.visible=false;HEADS=[pg.heads[2],pg.heads[0]];MIDH=pg.heads[1];
     // жар-режим и оберег: светящийся шар вокруг Горыныча (огонь — оранжевый, оберег — голубой)
     AURA=new THREE.Mesh(new THREE.SphereGeometry(7,16,12),k5Add(0xff8a30,{opacity:0}));k5Prop(AURA);K5L.noRay(AURA);AURA.visible=false;
     const cg=new THREE.Group(),cm=M(0x221c30,{emissive:0x2a0e44,emissiveIntensity:0.6,transparent:true,opacity:1});
     for(let i=0;i<16;i++)addMesh(new THREE.SphereGeometry(rand(1.8,3.2),10,8),cm,rand(-5.5,5.5),rand(-1.2,1),rand(-2.5,2.5),cg);
     const bolts=[];for(let i=0;i<4;i++){const b=addMesh(new THREE.BoxGeometry(0.18,rand(2.5,4),0.18),k5Add(0xc8a0ff,{opacity:0}),rand(-4,4),-3.4,rand(-1,1),cg);b.rotation.z=rand(-0.5,0.5);bolts.push(b);}
     CL={g:k5Prop(cg),cm,bolts,pos:new V3(),gap:70,gapTo:null};K5L.noRay(cg);cg.visible=false;
     DG=makeDigit(2.2,MB(0xffd23a));k5Prop(DG);DG.visible=false;};
   /* ---------- Горыныч, седоки, туча с Кощеем ---------- */
   const seat=()=>{pg.g.updateMatrixWorld(true);['proshka','potap','pelageya','yosha'].forEach((k,i)=>{const h=T[k];if(!h)return;h.pos.copy(pg.g.localToWorld(new V3(...GOR_SEATS[i])));h.vel.set(0,0,0);h.grounded=true;h.face=Math.PI;});};
   const place=()=>{pg.g.position.set(PX+GP.x,GP.y,GP.z);pg.g.rotation.z=-GV.x*0.03;pg.g.rotation.x=GV.y*0.02+(GV.agreeT>1?0.08:0)+speedK()*0.07;
     pg.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(G.time*((GV.agreeT>1?7:4)+speedK()*6))*0.45;});[0,1].forEach(pi=>{const hh=HEADS[pi];hh.g.rotation.y=-IN[pi].x*0.5;hh.g.rotation.x=-IN[pi].y*0.3;});seat();};
   const clPlace=dt=>{if(CL.gapTo!=null)CL.gap=damp(CL.gap,CL.gapTo,1.6,dt);CL.pos.set(PX+Math.sin(G.time*0.5)*5,YL[1]+Math.sin(G.time*0.8)*1.2,GP.z-CL.gap);CL.g.position.copy(CL.pos);
     if(!PRO.fall){KS.g.position.set(CL.pos.x,CL.pos.y+0.6,CL.pos.z);KS.g.rotation.y=0;}
     CL.bolts.forEach((b,i)=>{b.material.opacity=Math.sin(G.time*7+i*2.1)>0.93?0.9:0;});
     if(book.g.visible&&!book.g.userData.free){lHand.getWorldPosition(book.g.position);book.g.rotation.set(0,KS.g.rotation.y,0.2);}};
   /* ---------- удар по Горынычу: тормозит, туча уходит дальше; кляксы на экране ---------- */
   const domFx=(id,css)=>{let el=document.getElementById(id);if(!el){el=document.createElement('div');el.id=id;el.style.cssText='position:fixed;inset:0;pointer-events:none;opacity:0;'+css;document.body.appendChild(el);}return el;};
   const inkSplat=()=>{const el=domFx('k5eInk','z-index:29');
     const b=[];for(let i=0;i<5;i++)b.push('radial-gradient(circle at '+rand(8,92).toFixed(0)+'% '+rand(8,92).toFixed(0)+'%,rgba(28,10,46,.9) 0,rgba(70,26,120,.55) '+rand(4,8).toFixed(0)+'%,transparent '+rand(10,15).toFixed(0)+'%)');
     el.style.background=b.join(',');el.style.transition='none';el.style.opacity=1;PRO.splT=1.3;};
   /* ---------- «бегун»: рывки от букв и обручей, цепочка, жар и жар-режим, оберег, магнит, «впритирку» ---------- */
   // Как в играх-бегах: подряд пойманные буквы и обручи растят цепочку (×1…×5) — рывок сильнее, очков больше; жар копится от цепочки и
   // «впритирку» и, когда шкала полна, включает жар-режим: Горыныч мчится и сквозь всё (ели, скалы, шары, волна — нипочём), буквы летят сами.
   // Удар обнуляет цепочку и сбивает жар. Бонусы на пути — магнит, оберег (гасит один удар), жар-перо. Проиграть по-прежнему нельзя.
   const mult=()=>Math.min(5,1+Math.floor(PRO.chain/3));
   const lgScale=()=>PRO.leg==='sea'?0.5:PRO.leg==='write'?0.35:1;   // над морем и в буквах-стенах рывки слабее: отрезок держится на воронах и на счёте, а не на длине пути
   const hyperOk=()=>['forest','gorge','sea','sky'].indexOf(PRO.leg)>=0;
   const scoreAdd=v=>{PRO.score+=Math.round(v*(PRO.hyper>0?2:1));};
   // рывок: base — прибавка к скорости (м/с), затухает за ≈1,3 с; цепочка усиливает
   const kick=(base,quiet)=>{const v=base*(1+0.12*(mult()-1))*lgScale();GV.kick=Math.min(20*Math.max(0.5,lgScale())+2,GV.kick+v);GV.rush=Math.max(GV.rush,1.4);PRO.fovPulse=1;
     if(!quiet&&G.time-(PRO.nzT||-9)>0.4){PRO.nzT=G.time;shakeAll(0.05,0.25);if(AUD.ready())AUD.nz({type:'bandpass',f0:500,f1:2600,d:0.55,v:0.06+0.015*mult(),q:1.6,a:0.02});}};   // свист ветра — не чаще раза в 0,4 с: дорожка из букв не должна шуметь
   const ring=(p,col,s)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(3,0.28,8,36),k5Add(col,{opacity:0.9}));m.position.copy(p);k5Prop(m);K5L.noRay(m);k5fx(0.55,k=>{m.scale.setScalar((s||1)*(0.6+k*2.6));m.material.opacity=0.9*(1-k);},()=>k5Del(m));};
   const chainUp=(n,p)=>{const m0=mult();PRO.chain+=n||1;PRO.chainT=3.6;PRO.best=Math.max(PRO.best,PRO.chain);const m=mult();
     if(m>m0){ft((p||fp()).clone().add(new V3(0,4.4,0)),'цепочка ×'+m+'!','#ffe08a');if(AUD.ready())AUD.bell(880*Math.pow(1.122,m),{v:0.07,d:0.7});
       if(!PRO.chainTold){PRO.chainTold=true;say('zven','Ловите подряд — цепочка растёт: рывок сильнее, очков больше!',2.8);}}};
   const heatUp=v=>{if(PRO.hyper>0)return;PRO.heat=Math.min(1,PRO.heat+v);if(PRO.heat>=1&&hyperOk())hyperOn();};
   const hyperOn=()=>{PRO.hyper=6.5;PRO.hypers++;PRO.heat=1;banner('ГОРЫНЫЧ В ЖАРУ!','#ffb040',2.4,'всё нипочём · буквы летят сами');if(SFX.whoosh)SFX.whoosh();if(SFX.ok)SFX.ok();shakeAll(0.14,0.6);
     const p=fp();K5L.gold(p,30);ring(p,0xff9a30,2.2);kick(14);say('gorM',['Пышу огнём — не удержать!','Ух, разгорелся! Жарко!','Огонь в груди — держитесь!'][PRO.hypers%3],1.8);};
   const hyperOff=()=>{PRO.hyper=0;PRO.heat=0;GV.kick=Math.min(GV.kick,6);};
   // удар гасят жар-режим (ломаем всё на пути) и оберег; иначе — настоящий удар
   const guard=p=>{if(PRO.hyper>0){PRO.smashed++;burst(p.clone(),0xffa040,14,6);K5L.gold(p.clone(),6);if(SFX.brk)SFX.brk();scoreAdd(15);if(PRO.smashed%3===1)ft(p.clone().add(new V3(0,2.6,0)),'Крушим!','#ffb040');return true;}
     if(PRO.ward>0){PRO.ward=0;PRO.wards++;K5L.gold(p.clone(),20);ring(p,0x9fe0ff,1.6);k5Flash(p,0x9fe0ff,6,0.4);if(SFX.parry)SFX.parry();shakeAll(0.06,0.3);ft(p.clone().add(new V3(0,2.8,0)),'Оберег выдержал!','#9fe0ff');return true;}return false;};
   const bump=(txt,p)=>{p=p||fp();if(guard(p))return;GV.bump=0.9;GV.kick=0;CL.gap=Math.min(CL.gap+6,100);PRO.hits++;PRO.combo=0;PRO.chain=0;PRO.chainT=0;PRO.heat=Math.max(0,PRO.heat-0.35);if(SFX.crash)SFX.crash();shakeAll(0.12,0.4);K5L.ink(p,14,1.4);ft(p.clone().add(new V3(0,2.6,0)),txt,'#d8b0ff');inkSplat();};
   // «впритирку»: пролетел в полутора метрах от ели, скалы, моста или буквы — награда
   const nearMiss=(o,txt)=>{o.near=true;PRO.near++;const p=fp();ft(p.clone().add(new V3(0,3.2,0)),txt||'Впритирку!','#9fe0ff');ring(p,0x9fe0ff,0.8);heatUp(0.12);chainUp(1,p);kick(6,true);scoreAdd(30*mult());if(AUD.ready())AUD.bell(1175,{v:0.05,d:0.4});
     if(!PRO.nearTold){PRO.nearTold=true;say('gorM','Впритирку! Лихо!',1.4);}};
   /* ---------- 1. золотые буквы, золотые обручи, чернильные ели ---------- */
   // золотая буква из тетрадки: текстура одна на букву (их сотни за полёт)
   const LTEX={};
   const goldLetter=ch=>{const t=LTEX[ch]||(LTEX[ch]=K5L.textTex(ch,{w:128,h:128,col:'#ffd76a',glow:'#ffb030',weight:'italic 700 '}));
     const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false,fog:false,toneMapped:false}));s.scale.set(3.8,3.8,1);s.raycast=()=>{};return s;};
   // буква вылетает из тучи и ложится на место: u — вбок, y — высота, z — вдоль пути; t0 < 0 — вылетит чуть позже (для дорожки)
   const pageSpawn=(u,y,z,t0)=>{const s=goldLetter(LET[PRO.li++%LET.length]);k5Prop(s);
     const from=CL.pos.clone().add(new V3(rand(-2,2),1.5,0)),to=u==null?new V3(PX+rand(-12,12),rand(YL[0]+2,YL[1]+3),CL.pos.z+6):new V3(PX+u,y,z);s.position.copy(from);s.visible=!(t0<0);pages.push({s,from,to,t:t0||0,ph:rand(0,6)});};
   // место для награды в полёте (u — вбок, y — мировая высота): не внутри ели и скалы, под мостом или над ним, над стеной елей
   const safePos=(u,y,z)=>{for(const q of spires){if(q.st>=9||Math.abs(z-q.z)>8)continue;if(q.wall)y=YL[1]+PY-2.5;else if(Math.abs(u-q.u)<6.5)u=q.u+(u>=q.u?8:-8);}
     for(const R of rocks){if(Math.abs(z-R.z)>8)continue;if(R.arch)y=y<20?13.8:25.5;else if(Math.abs(u-R.u)<6.5)u=R.u+(u>=R.u?8:-8);}
     return [clamp(u,-XL+2,XL-2),clamp(y,YL[0]+PY+0.5,YL[1]+PY)];};
   // дорожка из букв: Кощей рассыпает тетрадь — буквы ложатся волной, горкой, наискосок или витком и ведут в обход елей и скал
   const trailSpawn=()=>{const n=PRO.leg==='forest'?8:6,dz=PRO.leg==='forest'?5.5:6.5,pat=PRO.tr++%4,z0=GP.z-clamp(GV.sp*3.6,50,96),cx=rand(-6,6),cy=rand(17,24),ph=rand(0,6);
     for(let i=0;i<n;i++){const k=i/(n-1);let u,y;
       if(pat===0){u=cx+7*Math.sin(k*6.28+ph);y=cy;}else if(pat===1){u=cx;y=cy-3+8*Math.sin(k*Math.PI);}else if(pat===2){u=cx+(k-0.5)*18;y=cy+(k-0.5)*8;}else{const a=k*Math.PI*3+ph;u=cx+5*Math.cos(a);y=cy+3.5*Math.sin(a);}
       const z=z0-i*dz,q=safePos(u,y,z);pageSpawn(q[0],q[1],z,-i*0.09);}};
   const pageGot=p=>{PRO.got++;const m=mult();kick(5.5);scoreAdd(10*m);heatUp(0.045);chainUp(1,p.s.position);K5L.gold(p.s.position.clone(),12);if(AUD.ready())AUD.bell(660+(PRO.got%5)*110,{v:0.05,d:0.5});
     if(PRO.got%6===0)ft(fp().add(new V3(0,3,0)),'букв: '+PRO.got,'#ffd76a');};
   // золотой обруч: пролетел — рывок; обручи подряд — комбо (выше звон)
   const hoopMake=(u,y,z)=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.TorusGeometry(3,0.32,8,32),new THREE.MeshBasicMaterial({color:0xffc030,transparent:true,fog:false,toneMapped:false})));
     g.add(new THREE.Mesh(new THREE.TorusGeometry(3,0.85,8,32),k5Add(0xffe080,{opacity:0.35})));g.position.set(PX+u,y,z);k5Prop(g);K5L.noRay(g);hoops.push({g,u,y,z,done:false,t:0});};
   const hoopsTick=dt=>{for(const H of hoops){if(H.done){H.t+=dt;H.g.scale.setScalar(1+H.t*1.2);H.g.children.forEach(c=>{c.material.opacity=Math.max(0,1-H.t*4);});continue;}
       H.g.rotation.z+=dt*1.5;if(GP.z-H.z<0.3){H.done=true;const f=fp();
         if(Math.hypot(f.x-PX-H.u,f.y-H.y)<3.4){PRO.hoops++;PRO.combo++;const hp=new V3(PX+H.u,H.y,H.z);kick(13+Math.min(4,PRO.combo));scoreAdd(50*mult());heatUp(0.2);chainUp(2,hp);K5L.gold(hp,18);ring(hp,0xffc030,1.4);if(AUD.ready())AUD.bell(523*Math.pow(1.122,Math.min(8,PRO.combo)),{v:0.06,d:0.5});
           if(PRO.combo>=2)ft(new V3(PX+H.u,H.y+3.6,H.z),'обручи ×'+PRO.combo,'#ffd76a');if(PRO.hoops===1)say('gorM','Обруч! Ух, как понесло!',1.8);}
         else{PRO.combo=0;H.g.visible=false;}}}
     hoops=hoops.filter(H=>{if(H.done&&H.t>0.3||GP.z<H.z-30){k5Del(H.g);return false;}return true;});};
   const spireMake=s=>{const g=new THREE.Group();const c=new THREE.Mesh(new THREE.ConeGeometry(2.2,23,8),K5L.INKM);c.position.y=11.5;g.add(c);const gl=new THREE.Mesh(new THREE.ConeGeometry(2.8,24,8,1,true),k5Add(0xa060ff,{opacity:0.22}));gl.position.y=12;g.add(gl);
     g.position.set(PX+s.u,-0.5,s.z);g.scale.set(1,0.01,1);k5Prop(g);K5L.noRay(g);s.m=g;
     const mk=new THREE.Mesh(new THREE.CylinderGeometry(2.6,2.6,40,14,1,true),k5Add(0xff4a6a,{opacity:0.0}));mk.position.set(PX+s.u,20,s.z);k5Prop(mk);K5L.noRay(mk);s.mk=mk;};
   const spiresTick=dt=>{for(const s of spires){const dz=GP.z-s.z;
       if(s.st===0&&dz<100){s.st=1;s.t=0;spireMake(s);}
       if(s.st===1){s.t+=dt;s.mk.material.opacity=0.18+0.22*Math.sin(G.time*14);if(s.t>1.3){s.st=2;s.t=0;k5Del(s.mk);if(AUD.ready())AUD.thump({f0:90,f1:40,d:0.4,v:0.18});K5L.ink(new V3(PX+s.u,2,s.z),16,2);}}
       if(s.st===2){s.t+=dt;const k=Math.min(1,s.t/0.7);s.m.scale.y=Math.max(0.01,1-Math.pow(1-k,3));if(k>=1)s.st=3;}
       if(s.st>=2&&s.m&&!s.hit&&Math.abs(GP.z-s.z)<2.8&&Math.abs(GP.x-s.u)<4&&GP.y<-1.5+23*s.m.scale.y){s.hit=true;if(!guard(fp())){GP.x+=(GP.x>=s.u?1:-1)*2;GV.x=(GP.x>=s.u?1:-1)*9;bump('Бум! Чернильная ель');}}
       else if(s.st>=2&&s.m&&!s.hit&&!s.near&&Math.abs(GP.z-s.z)<2.8&&GP.y<-1.5+23*s.m.scale.y+(s.wall?1.8:0)&&(s.wall?GP.y>=-1.5+23*s.m.scale.y&&Math.abs(GP.x-s.u)<4:Math.abs(GP.x-s.u)<6.4))nearMiss(s,s.wall?'Над самыми ёлками!':'Впритирку!');
       if(s.m&&dz<-20){k5Del(s.m);s.m=null;s.st=9;}}};
   /* ---------- 2. ущелье: скалы, мосты, волна чернил за спиной ---------- */
   const rockMake=R=>{const g=new THREE.Group();if(R.arch){addMesh(new THREE.BoxGeometry(2*(XL+8),5,4),M(0xb0683e),0,19.5,0,g);addMesh(new THREE.BoxGeometry(2*(XL+8),1.2,4.4),M(0x8e4a30),0,17.4,0,g);}
     else{addMesh(new THREE.CylinderGeometry(2.2,2.8,38,9),M(0xa86040),0,18.7,0,g);addMesh(new THREE.ConeGeometry(2.6,4,9),M(0x5a9a3a),0,39.5,0,g);}
     g.position.set(PX+(R.u||0),-0.3,R.z);k5Prop(g);K5L.noRay(g);R.g=g;};
   const rocksTick=()=>{for(const R of rocks){if(!R.g&&GP.z-R.z<240)rockMake(R);
       
       if(R.hit||Math.abs(GP.z-R.z)>2.6)continue;
       if(R.arch?(GP.y>11&&GP.y<21):Math.abs(GP.x-R.u)<4.1){R.hit=true;if(!guard(fp())){if(!R.arch){GP.x+=(GP.x>=R.u?1:-1)*2;GV.x=(GP.x>=R.u?1:-1)*9;}bump(R.arch?'Бум! Мост':'Бум! Скала');}}
       else if(!R.near&&(R.arch?(GP.y>10.2&&GP.y<=11||GP.y>=21&&GP.y<22.6):Math.abs(GP.x-R.u)<6.4))nearMiss(R,R.arch?'Впритирку с мостом!':'Впритирку!');}
     rocks=rocks.filter(R=>{if(GP.z<R.z-30){if(R.g)k5Del(R.g);return false;}return true;});};
   const waveTick=dt=>{const el=domFx('k5eWave','z-index:28;background:radial-gradient(ellipse at 50% 55%,rgba(40,12,70,0) 52%,rgba(40,12,70,.88) 100%)');
     if(PRO.leg!=='gorge'){if(!WV.out){el.style.opacity=0;return;}}
     else{const vw=G.solo?12.6:13.6;WV.d=Math.min(60,WV.d+(GV.sp-vw)*dt);if(WV.d<2.5){WV.d=24;PRO.caught++;bump('Волна догнала!');}
       
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
     say('koschei','Вожак, вперёд! Склюй их!',1.8);banner('Вожак воронов!','#ffd0a0',2.2);};
   const crowKill=(c,how)=>{if(!c.alive)return;c.alive=false;PRO.crows++;if(SFX.brk)SFX.brk();burst(c.pos.clone(),0x2a2a34,c.lead?30:14,c.lead?6:4);K5L.gold(c.pos.clone(),c.lead?30:8);k5Del(c.m.g);
     scoreAdd(c.lead?200:40);chainUp(c.lead?3:1,c.pos);heatUp(c.lead?0.3:0.06);if(c.lead){banner('Вожак сбит!','#ffd76a',1.8);kick(12);}else ft(c.pos.clone().add(new V3(0,1.4,0)),how==='refl'?'Капля — обратно!':'Кар-р!','#ffe0a0');};
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
     scoreAdd(o.gold?120:30);chainUp(o.gold?3:1,o.g.position);heatUp(o.gold?0.25:0.05);
     if(o.gold){kick(10);PRO.got+=3;ft(o.g.position.clone().add(new V3(0,2.6,0)),'Золотой — разом! +3 буквы','#ffd76a');}};
   const orbHit=(o,pi)=>{if(!o.alive)return;if(!o.gold){orbPop(o);return;}
     if(G.solo){o.hp--;if(o.hp<=0)orbPop(o);else ft(o.g.position.clone().add(new V3(0,2.4,0)),'ещё огонь!','#ffe08a');return;}
     o.hits[pi]=PRO.t;if(Math.abs(o.hits[0]-o.hits[1])<0.8)orbPop(o);else ft(o.g.position.clone().add(new V3(0,2.4,0)),pi?'а левая?':'а правая?','#ffe08a');};
   const orbsTick=dt=>{for(const o of orbs){if(!o.alive)continue;o.t+=dt;const k=Math.min(1,o.t/o.dur),hp=hpos(o.gold?MIDH:HEADS[G.solo?o.pi%2:o.pi]);
       o.g.position.lerpVectors(o.from,hp,k);o.g.position.y+=Math.sin(k*Math.PI)*4;o.g.position.x+=Math.sin(o.t*3+o.ph)*1.2*(1-k);o.g.children[1].rotation.z+=dt*3;if(o.gold)o.g.children[2].rotation.x+=dt*3;
       if(k>=1){o.alive=false;k5Del(o.g);bump('Чернильный шар!',hp);}}
     orbs=orbs.filter(o=>o.alive);};
   /* ---------- бонусы на пути: магнит, оберег, жар-перо ---------- */
   const BON={magnet:{col:0xff5a5a,name:'Магнит'},ward:{col:0x7ad0ff,name:'Оберег'},feather:{col:0xff9a30,name:'Жар-перо'}};
   const bmat=c=>new THREE.MeshBasicMaterial({color:c,fog:false,toneMapped:false});
   const bonusMake=(kind,u,y,z)=>{const g=new THREE.Group(),B=BON[kind],c=new THREE.Group();g.add(c);
     if(kind==='magnet'){const a=new THREE.Mesh(new THREE.TorusGeometry(1.2,0.42,8,16,Math.PI/2),bmat(0xff4a4a)),b=new THREE.Mesh(new THREE.TorusGeometry(1.2,0.42,8,16,Math.PI/2),bmat(0x4a7aff));b.rotation.z=Math.PI/2;c.add(a,b);
       for(const sx of[-1,1]){const t=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.5,0.9),bmat(0xf4f4f8));t.position.set(sx*1.2,0,0);c.add(t);}c.rotation.z=Math.PI;c.position.y=0.5;}
     else if(kind==='ward'){c.add(new THREE.Mesh(new THREE.SphereGeometry(1.1,14,10),new THREE.MeshBasicMaterial({color:B.col,transparent:true,opacity:0.5,fog:false,toneMapped:false})));c.add(new THREE.Mesh(new THREE.TorusGeometry(1.55,0.14,6,26),bmat(0xffffff)));}
     else{c.add(new THREE.Mesh(new THREE.ConeGeometry(0.8,2.8,8),bmat(0xffc040)));const f=new THREE.Mesh(new THREE.ConeGeometry(0.45,1.8,8),bmat(0xff5a20));f.position.y=-0.3;c.add(f);}
     g.add(new THREE.Mesh(new THREE.SphereGeometry(2.6,12,10),k5Add(B.col,{opacity:0.2})));
     g.position.set(PX+u,y,z);k5Prop(g);K5L.noRay(g);bonuses.push({g,c,kind,u,y,z,ph:rand(0,6),t:0,done:false});};
   const bonusSpawn=()=>{const kind=['magnet','ward','feather'][PRO.bi++%3],z=GP.z-clamp(GV.sp*3.4,52,90),q=safePos(rand(-9,9),rand(16,25),z);bonusMake(kind,q[0],q[1],z);
     if(!PRO.bonSeen){PRO.bonSeen=true;later(1.2,()=>{if(PRO.on&&!G.cine)say('zven','Бонусы на пути: магнит, оберег, жар-перо — подберите!',2.6);});}};
   const bonusGot=b=>{const p=b.g.position.clone(),B=BON[b.kind];PRO.bonus++;K5L.gold(p,16);ring(p,B.col,1.2);if(AUD.ready())AUD.bell(988,{v:0.07,d:0.7});scoreAdd(100*mult());chainUp(1,p);
     const up=new V3(0,3,0);
     if(b.kind==='magnet'){PRO.magnet=9;ft(p.clone().add(up),'Магнит! Буквы сами летят','#ff9a9a');}
     else if(b.kind==='ward'){PRO.ward=1;ft(p.clone().add(up),'Оберег! Один удар — мимо','#9fe0ff');}
     else{heatUp(0.4);kick(16);ft(p.clone().add(up),'Жар-перо! Рывок!','#ffb040');}
     if(!PRO.bonTold[b.kind]){PRO.bonTold[b.kind]=true;say('zven',{magnet:'Магнит тянет золотые буквы к Горынычу.',ward:'Оберег принимает на себя один удар.',feather:'Жар-перо: рывок и жар!'}[b.kind],2.4);}};
   const bonusTick=dt=>{const f=fp();for(const b of bonuses){b.t+=dt;b.c.rotation.y+=dt*2.4;b.g.position.y=b.y+Math.sin(b.t*3+b.ph)*0.5;
       if(!b.done&&Math.abs(b.z-f.z)<3.2&&Math.hypot(PX+b.u-f.x,b.g.position.y-f.y)<4.4){b.done=true;bonusGot(b);}}
     bonuses=bonuses.filter(b=>{if(b.done||b.z>GP.z+8||b.z<GP.z-170){k5Del(b.g);return false;}return true;});};
   /* ---------- ощущение скорости: поле зрения, полосы, края экрана, шар жара/оберега, шкала ---------- */
   const speedK=()=>clamp((GV.sp-11)/22,0,1);
   const fxTick=dt=>{const kk=speedK();PRO.fov=damp(PRO.fov,kk*13+(PRO.hyper>0?3:0)+PRO.fovPulse*3,5,dt);PRO.fovPulse=Math.max(0,PRO.fovPulse-dt*3);PRO.pull=damp(PRO.pull,kk*5,3,dt);
     const el=domFx('k5eSpeed','z-index:27;background:radial-gradient(ellipse at 50% 52%,rgba(255,200,90,0) 46%,rgba(255,196,80,.5) 78%,rgba(255,140,40,.85) 100%)');el.style.opacity=(clamp((GV.kick+(PRO.hyper>0?9:0)-1)/16,0,1)*0.9).toFixed(2);
     const on=PRO.hyper>0||PRO.ward>0;AURA.visible=on;if(on){const f=fp(),hy=PRO.hyper>0;AURA.position.set(f.x,f.y-1.4,f.z);AURA.material.color.setHex(hy?0xff8a30:0x7ad0ff);AURA.material.opacity=(hy?0.2:0.16)+0.06*Math.sin(G.time*(hy?14:6));AURA.scale.setScalar(0.86+0.05*Math.sin(G.time*9));}};
   const runHud=()=>{let el=document.getElementById('k5eRun');if(!el){el=document.createElement('div');el.id='k5eRun';el.style.cssText='position:fixed;left:14px;top:34%;z-index:30;pointer-events:none;width:176px;font:700 13px system-ui,sans-serif;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.75)';document.body.appendChild(el);}
     const show=PRO.on&&!G.cine&&G.state==='play'&&['forest','gorge','sea','sky','write'].indexOf(PRO.leg)>=0;
     if(!show){if(el.style.display!=='none')el.style.display='none';return;}
     const hy=PRO.hyper>0,m=mult(),h=Math.round((hy?PRO.hyper/6.5:PRO.heat)*50)*2,ct=Math.round(clamp(PRO.chainT/3.6,0,1)*20)*5;
     const bar=(w,bg,hgt)=>'<div style="height:'+hgt+'px;background:rgba(0,0,0,.45);border-radius:5px;overflow:hidden;border:1px solid rgba(255,210,120,.45)"><div style="height:100%;width:'+w+'%;background:'+bg+'"></div></div>';
     const chip=(t,c)=>'<span style="display:inline-block;margin:4px 4px 0 0;padding:1px 7px;border-radius:9px;background:'+c+';font-size:11px">'+t+'</span>';
     const html='<div style="font-size:11px;letter-spacing:1.5px;color:'+(hy?'#ffb040':'#ffd76a')+'">'+(hy?'ЖАР-РЕЖИМ':'ЖАР')+'</div>'+bar(h,hy?'linear-gradient(90deg,#ff4a10,#ffb040)':'linear-gradient(90deg,#ff7a20,#ffd76a)',9)+
       '<div style="margin-top:7px;font:italic 700 24px Georgia,serif;color:'+(m>1?'#ffe08a':'#d8d8e8')+'">×'+m+' <span style="font:600 11px system-ui;color:#c8c8d8">цепочка '+PRO.chain+'</span></div>'+bar(ct,'linear-gradient(90deg,#9fe0ff,#ffe08a)',4)+
       '<div style="margin-top:5px;font-size:12px;color:#ffe9b0">очки '+PRO.score+'</div>'+
       (PRO.magnet>0?chip('магнит '+Math.ceil(PRO.magnet)+' с','#a02a2a'):'')+(PRO.ward>0?chip('оберег','#1f5f8f'):'');
     if(html!==PRO.hudHtml){PRO.hudHtml=html;el.innerHTML=html;}el.style.display='block';};
   if(!renderer._k5fov){renderer._k5fov=true;const _rr=renderer.render.bind(renderer);   // поле зрения растёт на разгоне: камера уровня — camS, общий движок не трогаем
     renderer.render=function(sc,cam){const P=FIN.k5e&&FIN.k5e.pro;if(P&&P.on&&P.fov>0.05&&cam===camS&&sc===scene&&!G.cine&&G.state==='play'){cam.fov=55+P.fov;cam.updateProjectionMatrix();}return _rr(sc,cam);};}
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
   const glyGap=(ch,u,w)=>{const S=GLY[ch];if(S.o)return (Math.sqrt((u/(S.o[0]-HR))**2+(w/(S.o[1]-HR))**2)-1)*Math.min(S.o[0],S.o[1]);return Math.min(...S.s.map(([a,b,c,d])=>segD(u,w,a,b,c,d)))-HR;};   // зазор до штриха (м): <1,4 — «впритирку»
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
         if(glyHit(L.ch,u,w))bump('Задели «'+L.ch+'»!');else{PRO.clean++;scoreAdd(60);K5L.gold(f.clone().add(new V3(0,0,-2)),16);if(AUD.ready())AUD.bell(880,{v:0.06,d:0.7});ft(f.clone().add(new V3(0,3,0)),'Сквозь «'+L.ch+'»!','#ffd76a');if(glyGap(L.ch,u,w)<1.4)nearMiss(L,'Впритирку с «'+L.ch+'»!');}}
       if(L.passed){L.pt=(L.pt||0)+dt;const o=Math.max(0,1-L.pt*2.5);L.mi.opacity=o;L.gm.opacity=0.25*o;if(L.g.userData.haze)L.g.userData.haze.material.opacity=0.6*o;}}
     letters=letters.filter(L=>{if(L.passed&&L.pt>0.5){k5Del(L.g);k5Del(L.spr);return false;}return true;});};
   /* ---------- отрезки ---------- */
   const LEGS=['forest','gorge','sea','sky','write','three'];
   const legGorge=()=>{PRO.leg='gorge';PRO.th='gorge';WV.d=50;WV.out=false;WV.g.visible=true;WV.g.scale.y=1;banner('Чернильная волна!','#ffb070',2.4);
     later(0.4,()=>say('koschei','Чернила мои, за ними — залейте!',2.2));E.lesson('pro_gorge',()=>{});};
   const legSea=()=>{PRO.leg='sea';WV.out=true;WV.ot=0;K5L.ink(new V3(PX,8,GP.z+WV.d),30,3);PRO.wave=0;PRO.wT=1.2;PRO.th='sea';if(window.k5StormSet)k5StormSet(0.5);banner('Через моря!','#9fe0ff',2.4);
     later(0.6,()=>say('koschei','Ушли от волны? Вороны мои — ко мне!',2.2));E.lesson('pro_sea',()=>{});};
   const legSky=()=>{PRO.leg='sky';for(const c of crows)c.leave=true;PRO.th='sky';if(window.k5StormSet)k5StormSet(0);CS.visible=true;CL.gapTo=36;PRO.vi=0;PRO.vT=2.6;
     banner('Над облаками!','#ffffff',2.4);later(0.5,()=>say('koschei','Высоко забрались? Ловите-ка шары мои!',2.2));E.lesson('pro_sky',()=>{});};
   const legWrite=()=>{PRO.leg='write';if(PRO.hyper>0)hyperOff();PRO.heat=0;PRO.chain=0;PRO.chainT=0;LK.position.z=GP.z-560;for(const c of crows)c.leave=true;CL.gapTo=40;PRO.wi=0;PRO.wT=2.6;PRO.th='write';if(window.k5StormSet)k5StormSet(0);
     banner('Почерк Кощея!','#c8a0ff',2.4);later(0.4,()=>say('koschei','Ах так? Я вас самих перепишу!',2.4));E.lesson('pro_write',()=>{});};
   const legThree=()=>{PRO.leg='three';CL.gapTo=18;PRO.cnt=null;PRO.cT=1.8;banner('Догнали тучу!','#ffd76a',2.2);
     E.lesson('pro_three',()=>{});};
   // туча прожжена: золотой салют — буквы пролога разлетаются из тучи
   const salute=()=>{const c=CL.pos.clone();for(let i=0;i<26;i++){const s=K5L.textSpr(LET[i%LET.length],2.6,{w:128,h:128,col:'#ffe08a',glow:'#ffb030',weight:'italic 700 '});k5Prop(s);s.position.copy(c);
       const v=new V3(rand(-1,1),rand(0.4,1.2),rand(-1,0.6)).normalize().multiplyScalar(rand(10,18));k5fx(1.8,(k,dt)=>{s.position.addScaledVector(v,dt);v.y-=dt*6;s.material.opacity=1-k;},()=>k5Del(s));}
     for(let i=0;i<6;i++)later(i*0.25,()=>{const q=c.clone().add(new V3(rand(-12,12),rand(2,12),rand(-6,6)));k5Flash(q,[0xffd76a,0xff9ad0,0x9fe0ff][i%3],6,0.4);K5L.gold(q,20);if(AUD.ready())AUD.bell(660+i*110,{v:0.05,d:0.6});});};
   const midFire=()=>{PRO.cnt=null;DG.visible=false;PRO.leg='burn';const hp=hpos(MIDH),to=CL.pos.clone();if(SFX.whoosh)SFX.whoosh();if(SFX.ok)SFX.ok();
     for(let i=0;i<26;i++)later(i*0.03,()=>{burst(hp.clone().lerp(to,i/26),0xff8a30,5,3);});anim(0.8,k=>{MIDH.jaw.rotation.x=Math.sin(k*Math.PI)*0.7;});E.log('proBurn');
     later(0.8,()=>{shakeAll(0.15,0.6);k5Flash(CL.pos.clone(),0xffb060,10,0.5);salute();anim(1.2,k=>{CL.cm.opacity=1-k;CL.g.scale.setScalar(1+k*0.5);});if(SFX.brk)SFX.brk();
       banner('Туча прожжена!','#ffd76a',2.8,'погоня: '+PRO.score+' очков · букв '+PRO.got+' · обручей '+PRO.hoops+' · впритирку '+PRO.near+' · лучшая цепочка '+PRO.best);try{KA.pose('recoil');}catch(e){}PRO.fall=true;say('koschei','А-а-а! Ничего… Лукоморье — моё! Перепишу!',2.6);
       const f=KS.g.position.clone(),to2=OAKW.clone().add(new V3(0,35,8));anim(3.0,k=>{KS.g.position.lerpVectors(f,to2,smooth(k));KS.g.position.y+=Math.sin(k*Math.PI)*6;KS.g.rotation.z=Math.sin(k*9)*0.3;if(Math.random()<0.3)K5L.ink(KS.g.position.clone(),2);});
       later(3.4,()=>{if(!PRO.on)return;PRO.leg='end';KS.g.rotation.z=0;E.paper(()=>{const d=PRO.done;proEnd();if(d)d();},1.4);});});};
   const countTick=dt=>{const C0=PRO.cnt;if(!C0){PRO.cT-=dt;if(PRO.cT<=0&&CL.gap<24){PRO.cnt={t:-0.3,press:[null,null],last:-1};}return;}
     const B=G.solo?0.85:0.75,k=Math.floor(C0.t/B);C0.t+=dt;DG.visible=k>=0&&k<3;DG.position.copy(CL.pos).add(new V3(0,8.5,4));
     if(k!==C0.last&&k>=0&&k<3){C0.last=k;setDigit(DG,k+1);tone(k===2?1320:880,0.12,'square',0.08);banner(['Раз…','Два…','ТРИ — вместе!'][k],k===2?'#ffd76a':'#ffe8b0',0.6);}
     const T3=2*B,win=PRO.tries>=2?0.6:0.42,ok=pi=>C0.press[pi]!==null&&Math.abs(C0.press[pi]-T3)<win;
     if(ok(0)&&(G.solo||ok(1)))midFire();
     else if(C0.t>T3+win+0.1){PRO.cnt=null;DG.visible=false;PRO.tries++;PRO.cT=2.2;CL.gap=30;if(SFX.miss)SFX.miss();shakeAll(0.1,0.4);
       banner('Не вместе!','#ffd0d0',1.6);}};
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
     const kk=speedK(),sk=clamp((GV.sp-11.5)/6,0,1),hot=GV.kick>2||PRO.hyper>0;for(const m of streaks){if(m.position.z>GP.z+22||m.position.z<GP.z-90)m.position.set(PX+GP.x+rand(-18,18),GP.y+rand(-6,14),GP.z-rand(40,80));
       m.scale.z=1+kk*3.5;m.material.opacity=Math.min(0.9,sk*0.55+kk*0.4);m.material.color.setHex(hot?0xffe2a0:0xffffff);}
     if((GV.agreeT>1||GV.rush>0||PRO.hyper>0)&&!G.cine){PRO.trT=(PRO.trT||0)-dt;if(PRO.trT<=0){PRO.trT=hot?0.025:0.06;burst(pg.g.localToWorld(new V3(rand(-4.5,4.5),5,2)),hot?0xffa040:0xffd76a,hot?2:1,hot?2.5:1.5,hot?0.8:0.6);}}
     if(G.cine||G.state!=='play'){place();clPlace(dt);runHud();return;}
     PRO.t+=dt;const fly=LEGS.indexOf(PRO.leg)>=0;if(PRO.legSeen!==PRO.leg){PRO.legSeen=PRO.leg;PRO.lt=0;}PRO.lt+=dt;
     if(PRO.chainT>0){PRO.chainT-=dt;if(PRO.chainT<=0)PRO.chain=0;}else if(PRO.hyper<=0)PRO.heat=Math.max(0,PRO.heat-0.03*dt);
     if(PRO.magnet>0)PRO.magnet=Math.max(0,PRO.magnet-dt);if(PRO.hyper>0){PRO.hyper-=dt;PRO.heat=Math.max(0,PRO.hyper/6.5);if(PRO.hyper<=0)hyperOff();}
     if(fly){const a=IN[0],b=G.solo?IN[0]:IN[1],la=Math.hypot(a.x,a.y),lb=Math.hypot(b.x,b.y),dot=(la>0.3&&lb>0.3)?(a.x*b.x+a.y*b.y)/(la*lb):0;
       GV.agreeT=dot>0.75?GV.agreeT+dt:0;GV.fight=dot<-0.3?GV.fight+dt:0;const chase=PRO.leg==='forest'||PRO.leg==='gorge'||PRO.leg==='sea';
       const pace=chase?1+Math.min(0.28,-GP.z/4200):1,hy=PRO.hyper>0;   // темп растёт с путём; рывок (GV.kick) — прибавка от букв, обручей и золота, жар-режим — ещё сверху
       const want=(chase?(GV.agreeT>1?17:GV.fight>0.3?8:11)*pace:PRO.leg==='sky'?11:10)+Math.min(GV.kick,hy?12:99)+(hy?8*Math.max(0.6,lgScale()):0);
       GV.sp=damp(GV.sp,want-(GV.bump>0?6:0),GV.kick>1||hy?6:2.5,dt);GV.kick=Math.max(0,GV.kick*Math.exp(-dt/1.3)-dt*1.5);GV.bump=Math.max(0,GV.bump-dt);GV.rush=Math.max(0,GV.rush-dt);
       if(chase&&GV.agreeT>1&&!GV.boostOn){GV.boostOn=true;if(SFX.whoosh)SFX.whoosh();if((PRO.boosts=(PRO.boosts||0)+1)<=2)ft(hpos(MIDH).add(new V3(0,1.8,0)),'Вместе — разгон!','#ffd76a');if(!PRO.boostTold){PRO.boostTold=true;say('gorM','Вот! Вместе — вот так!',1.6);}}
       if(GV.agreeT<=1)GV.boostOn=false;
       if(!G.solo&&GV.fight>0.3&&!PRO.grumble){PRO.grumble=true;say(Math.random()<0.5?'gorL':'gorR',['Мне налево, налево!','Мне направо, направо!','Тянут в разные стороны — ох, беда!'][Math.floor(rand(0,3))],1.4);later(3,()=>{PRO.grumble=false;});}
       const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;GV.x=damp(GV.x,mx*9,3,dt);GV.y=damp(GV.y,my*6,3,dt);GP.x=clamp(GP.x+GV.x*dt,-XL,XL);GP.y=clamp(GP.y+GV.y*dt,YL[0],YL[1]);GP.z-=GV.sp*dt;
       if(chase){CL.gap=clamp(CL.gap+(13-GV.sp)*dt,26,100);}}
     else if(PRO.leg==='burn'||PRO.leg==='end'){GV.sp=damp(GV.sp,8,2,dt);GP.z-=GV.sp*dt;GP.x=damp(GP.x,0,1.5,dt);GV.x=damp(GV.x,0,3,dt);}
     place();if(!PRO.fall)clPlace(dt);
     // золотые буквы
     if(PRO.leg==='forest'||PRO.leg==='gorge'||PRO.leg==='sea'){PRO.pT-=dt;if(PRO.pT<=0){PRO.pT=PRO.leg==='forest'?rand(4.2,5.6):PRO.leg==='gorge'?rand(5,6.4):rand(6,8);trailSpawn();}
       PRO.bT-=dt;if(PRO.bT<=0){PRO.bT=rand(12,17);bonusSpawn();}}
     const mg=PRO.magnet>0||PRO.hyper>0,f=fp();
     for(const p of pages){p.t+=dt;if(p.t<0)continue;p.s.visible=true;const k=Math.min(1,p.t/1.1);
       if(k<1){p.s.position.lerpVectors(p.from,p.to,smooth(k));p.s.position.y+=Math.sin(k*Math.PI)*3;}
       else{if(mg&&p.s.position.z<f.z&&f.z-p.s.position.z<(PRO.hyper>0?34:24))p.mg=true;   // магнит берёт весь коридор в ширину (он узкий), в длину — на 24 м (в жар-режиме на 34)
         if(p.mg)p.to.lerp(f,1-Math.exp(-10*dt));else p.to.y=Math.max(YL[0]+1,p.to.y-dt*0.5);
         p.s.position.set(p.to.x+(p.mg?0:Math.sin(G.time*2+p.ph)*0.6),p.to.y,p.to.z);}
       p.s.material.rotation=Math.sin(G.time*3+p.ph)*0.3;if(Math.abs(p.s.position.z-f.z)<2.8&&Math.hypot(p.s.position.x-f.x,p.s.position.y-f.y)<3.9){p.dead=true;pageGot(p);}else if(p.s.position.z>GP.z+6)p.dead=true;}
     pages=pages.filter(p=>{if(p.dead)k5Del(p.s);return !p.dead;});
     hoopsTick(dt);spiresTick(dt);rocksTick();waveTick(dt);crowsTick(dt);orbsTick(dt);lettersTick(dt);bonusTick(dt);fxTick(dt);runHud();
     if(PRO.leg==='forest'&&GP.z<GZ[0])legGorge();
     if(PRO.leg==='gorge'&&GP.z<GZ[1])legSea();
     if(PRO.leg==='sea'){PRO.wT-=dt;const all=PRO.WV.length;if(PRO.wave<=all&&PRO.wT<=0&&crows.every(c=>!c.alive||c.leave)){if(PRO.wave<all)crowWave(PRO.WV[PRO.wave]);else leaderWave();PRO.wave++;PRO.wT=1.8;}
       if((PRO.wave>all&&crows.every(c=>!c.alive)&&GP.z<GZ[1]-300)||PRO.lt>75)legSky();}
     if(PRO.leg==='sky'){PRO.vT-=dt;if(PRO.vi<PRO.VQ.length&&PRO.vT<=0&&!orbs.length){const V=PRO.VQ[PRO.vi++];V.forEach((k,i)=>later(i*0.5,()=>{if(PRO.leg==='sky')orbMake(k==='g',k==='2'?1:0);}));PRO.vT=1.6+V.length*0.5;
         }
       if(PRO.vi>=PRO.VQ.length&&!orbs.length&&PRO.vT<=0)legWrite();}
     if(PRO.leg==='write'){PRO.wT-=dt;if(PRO.wi<PRO.WQ.length&&PRO.wT<=0&&CL.gap>34){letterMake(PRO.WQ[PRO.wi]);PRO.wi++;PRO.wT=G.solo?4.8:4.2;}
       if(PRO.wi>=PRO.WQ.length&&!letters.length)legThree();}
     if(PRO.leg==='three')countTick(dt);
     // строка пролога над полем — доля пути; заметка — что важно сейчас
     const li=LEGS.indexOf(PRO.leg),fr=PRO.leg==='forest'?-GP.z/-GZ[0]:PRO.leg==='gorge'?(GZ[0]-GP.z)/(GZ[0]-GZ[1]):PRO.leg==='sea'?PRO.wave/(PRO.WV.length+1):PRO.leg==='sky'?PRO.vi/PRO.VQ.length:PRO.leg==='write'?PRO.wi/PRO.WQ.length:0.5;
     ES.prog=li<0?1:Math.min(1,(li+clamp(fr,0,1))/LEGS.length);
     ES.note=(PRO.leg==='gorge'?'волна в '+Math.max(0,Math.round(WV.d))+' м · ':PRO.leg==='forest'||PRO.leg==='sea'?'до тучи '+Math.round(CL.gap)+' м · ':'')+'букв '+PRO.got+(PRO.hoops?' · обручей '+PRO.hoops:'');});
   W.custom0=W.custom;
   PRO.dbg=()=>({GP,GV,CL,WV,pages,spires,crows,drops,letters,hoops,rocks,orbs,bonuses,GLY,V0,PX,PY,YL,GZ,LK,sc,run:{kick,chainUp,heatUp,bump,guard,bonusMake,trailSpawn,mult,nearMiss,fp}});   // для ботов (tk5e_prolog, tk5e_runner)
   /* ---------- полоса стадии ---------- */
   E.note=n=>n===0?(ES.note||''):'';
   E.stage[0]={targets:()=>[],end:()=>{proEnd();}};
   E.PAUSE[0]='<b>'+K5E.NAMES[0]+'</b><br><i>'+K5L.LINES[0]+'</i><br>Погоня на Горыныче за тучей Кощея: через леса, ущелье, море и облака — к «раз-два-три».<br>Буквы и обручи дают рывок; пойманные подряд — цепочка ×1…×5 и жар. Шкала жара полна — Горыныч в жару: сквозь всё. Бонусы: магнит, оберег, жар-перо; «впритирку» — награда. Удар сбивает цепочку и часть жара.';
   /* ---------- обучающие катсцены пролога ---------- */
   // Горыныч летит сам, по сценарию (автопилот по времени урока); реквизит — настоящие обручи, ели, скалы, вороны, шары и буквы-стены, но зачёта нет.
   // pro — после вступления (головы, руль, разгон, буквы, обручи, ели); pro_gorge / pro_sea / pro_sky / pro_write / pro_three — в начале отрезка.
   const proPilot=(L,o)=>{const z0=o.z0!=null?o.z0:GP.z,sv={gp:GP.clone(),gv:Object.assign({},GV),i0:Object.assign({},IN[0]),i1:Object.assign({},IN[1]),gap:CL.gap,gapTo:CL.gapTo,hv:hoops.map(H=>H.g.visible),wd:WV.d,wp:WV.g.position.clone()};
     const pw=(A,t)=>{const n=A.length;if(t<=A[0][0])return A[0].slice(1);if(t>=A[n-1][0])return A[n-1].slice(1);let j=0;while(t>A[j+1][0])j++;const u=smooth((t-A[j][0])/(A[j+1][0]-A[j][0]));return A[j].slice(1).map((v,i)=>v+(A[j+1][i+1]-v)*u);};
     const spAt=t=>pw(o.sp||[[0,11]],t)[0],xyAt=t=>pw(o.path||[[0,0,GP.y]],t);
     const DT=0.04,N=Math.ceil((o.dur+2)/DT),Zs=[z0];for(let i=0;i<N;i++)Zs.push(Zs[i]-spAt(i*DT)*DT);
     const zAt=t=>{const f=clamp(t/DT,0,N-1),i=Math.floor(f);return Zs[i]+(Zs[i+1]-Zs[i])*(f-i);};
     const fpAt=t=>{const a=xyAt(t);return new V3(PX+a[0],a[1]+PY,zAt(t));};          // точка полёта (там же — обручи и буквы)
     const agreeAt=t=>(o.agree||[]).some(r=>t>=r[0]&&t<r[1]);
     hoops.forEach(H=>{H.g.visible=false;});const pv=pages.map(q=>q.s.visible),bv=bonuses.map(b=>b.g.visible);pages.forEach(q=>{q.s.visible=false;});bonuses.forEach(b=>{b.g.visible=false;});const rv=rocks.map(R=>R.g?R.g.visible:true);rocks.forEach(R=>{if(R.g)R.g.visible=false;});   // настоящие обручи и скалы на пути — спрятать: урок летит сквозь свои
     L.tick((t)=>{const a=xyAt(t),b=xyAt(t+0.05);GP.set(a[0],a[1],zAt(t));GV.x=(b[0]-a[0])/0.05;GV.y=(b[1]-a[1])/0.05;GV.sp=spAt(t);GV.agreeT=agreeAt(t)?1.5:0;GV.bump=0;
       const m=o.heads?o.heads(t):null,ix=clamp(GV.x/9,-1,1),iy=clamp(GV.y/6,-1,1);IN[0].x=m?m[0]:ix;IN[0].y=m?m[1]:iy;IN[1].x=m?m[2]:ix;IN[1].y=m?m[3]:iy;
       if(o.gap)CL.gap=o.gap(t);if(o.wave)o.wave(t);place();clPlace(0.016);
       if(GV.agreeT>0&&Math.random()<0.6)burst(pg.g.localToWorld(new V3(rand(-4.5,4.5),5,2)),0xffd76a,1,1.5,0.6);});
     L.on(()=>{GP.copy(sv.gp);Object.assign(GV,sv.gv);Object.assign(IN[0],sv.i0);Object.assign(IN[1],sv.i1);CL.gap=sv.gap;CL.gapTo=sv.gapTo;hoops.forEach((H,i)=>{H.g.visible=sv.hv[i]!==false;});pages.forEach((q,i)=>{if(pv[i]!==undefined)q.s.visible=pv[i];});bonuses.forEach((b,i)=>{if(bv[i]!==undefined)b.g.visible=bv[i];});rocks.forEach((R,i)=>{if(R.g)R.g.visible=rv[i]!==false;});WV.d=sv.wd;WV.g.position.copy(sv.wp);place();clPlace(0.016);});
     return {zAt,fpAt,xyAt,spAt};};
   // камера по Горынычу: [от, до) секунд урока; po/lo — смещения камеры и точки взгляда от Горыныча (PX+x, y, z)
   const proCam=(L,t0,t1,po,lo)=>L.tick(t=>{const S=G.cine;if(!S||!S.camPos||t<t0||t>=t1)return;const b=new V3(PX+GP.x,GP.y,GP.z);S.camPos.copy(b).add(new V3(po[0],po[1],po[2]));S.camLook.copy(b).add(new V3(lo[0],lo[1],lo[2]));});
   const proBack=(L,t0,t1)=>L.tick(t=>{const S=G.cine;if(!S||!S.camPos||t<t0||t>=t1)return;S.camPos.set(PX+GP.x*0.8,GP.y+9.5,GP.z+19);S.camLook.set(PX+GP.x*0.9,GP.y+4.5,GP.z-26);});   // как в самом полёте
   const proTwo=()=>!G.solo;
   const proKeys=a=>G.solo?K(0,a):K(0,a)+' и '+K(1,a);
   const proHeadFlash=(pi,col)=>k5Flash(hpos(pi==null?MIDH:HEADS[pi]),col||PCOL[G.solo?0:pi],4,0.6);
   // золотой обруч (настоящий) в точке p: пролетели — вспышка и звон
   const proHoop=(L,A,t)=>{const p=A.fpAt(t);hoopMake(0,0,0);const H=hoops.pop();H.g.position.copy(p);L.props.push(H.g);L.tick(tt=>{H.g.rotation.z+=0.03;});
     L.atT(t,()=>{K5L.gold(p.clone(),18);if(AUD.ready())AUD.bell(660,{v:0.06,d:0.5});H.g.visible=false;});};
   // буква из тетрадки: вылетает из тучи за tAppear с, ловится в tGet с
   const proLetter=(L,A,tAppear,tGet,i)=>{const ch=LET[i%LET.length];const s=K5L.textSpr(ch,3.8,{w:128,h:128,col:'#ffd76a',glow:'#ffb030',weight:'italic 700 '});L.add(s);s.visible=false;const to=A.fpAt(tGet).add(new V3(0,0.2,0));let got=false;
     L.tick(t=>{if(got)return;if(t<tAppear){s.visible=false;return;}s.visible=true;const k=clamp((t-tAppear)/(tGet-tAppear),0,1),from=CL.pos.clone().add(new V3(0,1.5,0));s.position.lerpVectors(from,to,smooth(k));s.position.y+=Math.sin(k*Math.PI)*3;s.material.rotation=Math.sin(t*3+i)*0.3;
       if(t>=tGet){got=true;s.visible=false;K5L.gold(to.clone(),12);if(AUD.ready())AUD.bell(660+(i%5)*110,{v:0.05,d:0.5});}});};
   // чернильная ель (настоящая): красный столб за 1,3 с, потом вырастает за 0,7 с
   const proSpire=(L,x,z,tMark)=>{const s={u:x,z,m:null,mk:null};spireMake(s);L.props.push(s.m,s.mk);s.m.scale.set(1,0.01,1);s.mk.material.opacity=0;
     L.tick(t=>{if(t<tMark){s.mk.material.opacity=0;s.m.scale.y=0.01;return;}if(t<tMark+1.3){s.mk.material.opacity=0.18+0.22*Math.sin(t*14);s.m.scale.y=0.01;return;}s.mk.material.opacity=0;const k=Math.min(1,(t-tMark-1.3)/0.7);s.m.scale.y=Math.max(0.01,1-Math.pow(1-k,3));});
     L.atT(tMark+1.3,()=>{if(AUD.ready())AUD.thump({f0:90,f1:40,d:0.4,v:0.18});K5L.ink(new V3(PX+x,2,z),16,2);});return s;};

   E.LES.pro=L=>{const two=proTwo(),Y0=GP.y;
     const A=proPilot(L,{dur:41,z0:40,   // с начала леса: на весь урок хватает леса (до ущелья — 420 м)
       sp:[[0,8],[13,8],[14.4,13],[18.6,13],[19.8,8],[26.8,8],[27.2,12],[28,9],[28.4,9],[28.8,13],[29.6,9],[30,9],[30.4,14],[31.6,8],[41,8]],
       path:[[0,0,Y0],[6.4,0,Y0],[7.8,-8,Y0],[8.6,-8,Y0],[10,8,Y0],[10.8,8,Y0],[11.4,8,23],[12,8,23],[12.6,8,11.5],[13.2,0,Y0],[19,0,Y0],[20.5,5,19],[22,-5,15],[23.5,0,18],[25,0,Y0],[26.5,-6,20],[28,6,15],[29.5,-2,21],[31,0,Y0],[34,-6,Y0],[36,-6,Y0],[38,0,21.5],[40,0,21.5],[41,0,Y0]],
       agree:[[14.2,18.6]],heads:t=>{if(t<5.5)return [0,0,0,0];return null;}});
     // кадры: 1 — головы сбоку
     L.beat(5.5,{says:[['zven',two?'У Горыныча три головы: левая — Игрока 1, правая — Игрока 2.':'У Горыныча три головы — левая и правая слушаются тебя.',0.2,5.0]],
       ev:[[1.2,()=>proHeadFlash(0)],[2.6,()=>proHeadFlash(1)],[4.2,()=>proHeadFlash(null,0xffd76a)]]});
     proCam(L,0,5.5,[6,7.5,-13],[0,5.5,-1]);
     L.beat(7.5,{says:[['zven','Куда тянете — туда и летим:',0.2,2.6],['zven',two?'Игрок 1 — '+MOVEK(0)+', Игрок 2 — '+MOVEK(1)+'.':MOVEK(0)+'.',3.0,4.2]]});
     L.beat(6.0,{says:[['zven',two?'Тяните обе головы в одну сторону — разгон!':'Держи одно направление — разгон!',0.2,3.4],['zven','Чем дольше вместе, тем быстрее.',3.8,2.0]]});
     L.beat(6.0,{says:[['zven','Золотые буквы — ловите: они подгоняют.',0.2,3.4]]});
     for(let i=0;i<4;i++)proLetter(L,A,[19.2,20.2,21.2,22.4][i],[20.6,21.7,22.7,23.8][i],i);
     L.beat(7.0,{says:[['zven','Золотой обруч — пролетите сквозь: рывок!',0.2,3.2],['zven','Обручи подряд — всё быстрее.',3.6,2.6]]});
     for(const t of[27,28.6,30.2])proHoop(L,A,t);
     L.beat(9.0,{says:[['zven','Красный столб — здесь вырастет чёрная ель. Облетайте!',0.2,4.4],['zven','Стена из трёх елей — только поверху, сквозь обруч.',4.8,4.0]]});
     proSpire(L,3,A.zAt(35.2),32.4);
     for(const dx of[-10,0,10])proSpire(L,dx,A.zAt(39.6),36.6);
     proHoop(L,A,39.6);
     proBack(L,5.5,41);
     return L;};
   // огонь головы pi в движущуюся цель tgt() — и что сделать на месте
   const proFire=(L,pi,tgt,then)=>{const h=pi==null?MIDH:HEADS[pi],hp=hpos(h),m=new THREE.Mesh(new THREE.SphereGeometry(0.5,10,8),MB(0xffa040));m.position.copy(hp);L.add(m);if(SFX.whoosh)SFX.whoosh();
     anim(0.25,k=>{h.jaw.rotation.x=Math.sin(k*Math.PI)*0.6;});k5fx(0.4,k=>{m.position.lerpVectors(hp,tgt(),k);if(Math.random()<0.5)burst(m.position.clone(),0xffa040,1,1,0.4);},()=>{m.visible=false;burst(tgt(),0xff8a30,10,3);if(then)then();});};
   const proJaws=L=>L.on(()=>{HEADS.forEach(h=>{h.jaw.rotation.x=0;});MIDH.jaw.rotation.x=0;});
   const proPop=(g,col,n)=>{g.visible=false;burst(g.position.clone(),col,n||14,4);K5L.gold(g.position.clone(),8);if(SFX.brk)SFX.brk();};
   const proBase=()=>new V3(PX+GP.x,GP.y,GP.z);
   // вороны держатся впереди Горыныча на своих местах
   const proCrow=(L,pi,off,lead)=>{const m=crowMake(pi);L.props.push(m.g);if(lead){const r2=new THREE.Mesh(new THREE.TorusGeometry(1.35,0.13,6,28),k5Add(PCOL[G.solo?0:1],{opacity:0.95}));r2.rotation.y=Math.PI/2;m.g.add(r2);m.ring2=r2;m.g.scale.setScalar(2.5);}
     const C={m,g:m.g,off:off.clone(),pos:new V3(),alive:true};L.tick(t=>{if(!C.alive)return;C.pos.copy(proBase()).add(C.off);C.pos.y+=Math.sin(t*2+off.x)*0.4;m.g.position.copy(C.pos);m.g.lookAt(PX+GP.x,GP.y+4,GP.z);m.wings.forEach(q=>{q.w.rotation.z=q.s*Math.sin(t*14)*0.5;});m.ring.rotation.z+=0.03;if(m.ring2)m.ring2.rotation.x+=0.03;});return C;};

   E.LES.pro_gorge=L=>{const two=proTwo(),Y0=GP.y;
     const A=proPilot(L,{dur:20,sp:[[0,11],[6,11],[7.2,16.5],[12.5,16.5],[13.5,11],[20,11]],
       path:[[0,0,Y0],[6,0,Y0],[8.5,-5,17],[10.5,5,14],[12.5,0,Y0],[13.5,0,Y0],[15.6,7,Y0],[17,4,Y0],[18,0,Y0],[19.3,0,9.2],[20,0,Y0]],agree:[[7.2,12.5]],
       wave:t=>{const d=t<6?44-18*smooth(t/5.5):t<13?26+10*smooth((t-6)/5):36;WV.d=d;WV.g.visible=true;WV.g.position.set(PX,0,GP.z+d);}});
     L.on(()=>{WV.g.visible=true;});
     L.beat(6.0,{says:[['zven','Позади — чернильная волна! Она догоняет.',0.2,3.2],['zven','Догонит — собьёт с пути.',3.6,2.2]]});
     proCam(L,0,6,[0,9,-24],[0,7,12]);
     L.beat(6.5,{says:[['zven',two?'Тяните обе головы вместе — разгон, и волна отстанет.':'Держи направление — разгон, и волна отстанет.',0.2,4.2],['zven','Золотые обручи — рывок!',4.6,1.8]]});
     proHoop(L,A,8.5);proHoop(L,A,10.5);
     L.beat(7.5,{says:[['zven','Скалы — облетайте сбоку.',0.2,2.6],['zven','Мост — нырните под него или перелетите.',3.0,3.8]]});
     const R1={u:-4,z:A.zAt(15.4)},R2={arch:true,z:A.zAt(19.0)};rockMake(R1);rockMake(R2);L.props.push(R1.g,R2.g);
     proBack(L,6,20);
     return L;};

   E.LES.pro_sea=L=>{const two=proTwo(),Y0=GP.y;
     const A=proPilot(L,{dur:30,sp:[[0,11]],path:[[0,0,Y0]],gap:()=>26});proJaws(L);
     const c1=proCrow(L,0,new V3(-7,3.5,-17.5)),c2=two?proCrow(L,1,new V3(7,4.5,-18)):null;
     // 1. кто чей
     L.beat(6.0,{says:[['zven','Вороны Кощея!',0.2,2.0],['zven',two?'Ворон с кольцом вашего цвета — ваш.':'Бей любого ворона — все они твои.',2.4,3.4]]});
     // 2. огонь
     L.beat(7.0,{says:[['zven',two?'Огонь — '+K(0,'attack')+' и '+K(1,'attack')+': каждый бьёт своего ворона.':'Огонь — '+K(0,'attack')+'.',0.2,3.6],['zven','Он сам летит в ворона.',4.0,2.4]],
       ev:[[1.4,()=>proFire(L,0,()=>c1.pos.clone(),()=>{c1.alive=false;proPop(c1.g,0x2a2a34);})],[2.0,()=>{if(c2)proFire(L,1,()=>c2.pos.clone(),()=>{c2.alive=false;proPop(c2.g,0x2a2a34);});}]]});
     // 3. капля и щит
     const c3=proCrow(L,0,new V3(-6,3.5,-16.5));c3.g.visible=false;L.atT(13.4,()=>{c3.g.visible=true;});
     L.beat(9.0,{says:[['zven','Ворон бросает чернильную каплю.',0.4,2.8],['zven','Щит '+kbd('guard')+' в последний миг —',3.4,2.6],['zven','капля вернётся и собьёт ворона!',6.0,2.8]],
       ev:[[1.2,()=>{dropThrow({pos:c3.pos.clone(),lead:false,pi:0,throws:0});const d=drops.pop();L.props.push(d.g);const f=c3.pos.clone(),h=HEADS[0];let ph='go',t0=0;
           const tk=k5fx(5,(k,dt)=>{t0+=dt;if(ph==='go'){const kk=Math.min(1,t0/1.9),hp=hpos(h);d.g.position.lerpVectors(f,hp,kk);d.g.position.y+=Math.sin(kk*Math.PI)*1.5;d.g.scale.setScalar(1+0.25*Math.sin(t0*20));
             if(kk>=0.92){ph='back';t0=0;shieldFx(0);if(SFX.parry)SFX.parry();k5Flash(hpos(h),0xffe08a,3,0.3);}}
             else{const kk=Math.min(1,t0/0.3);d.g.position.lerpVectors(hpos(h),c3.pos,kk);if(kk>=1){d.g.visible=false;c3.alive=false;proPop(c3.g,0x2a2a34);tk.t=tk.dur;}}},()=>{});L.on(()=>{tk.t=tk.dur;});}]]});
     // 4. вожак
     const ld=proCrow(L,0,new V3(0,6,-19),true);ld.g.visible=false;L.atT(22.0,()=>{ld.g.visible=true;});
     L.beat(8.0,{says:[['zven','В конце — вожак: большой, с двумя кольцами.',0.2,3.4],['zven',two?'Бьют обе головы — каждая по два раза.':'Бей четыре раза.',3.8,3.4]],
       ev:[[4.0,()=>proFire(L,0,()=>ld.pos.clone())],[4.6,()=>proFire(L,two?1:0,()=>ld.pos.clone())],[5.2,()=>proFire(L,0,()=>ld.pos.clone())],[5.8,()=>proFire(L,two?1:0,()=>ld.pos.clone(),()=>{ld.alive=false;proPop(ld.g,0x2a2a34,30);})]]});
     proBack(L,0,30);
     return L;};

   E.LES.pro_sky=L=>{const two=proTwo(),Y0=GP.y;
     const A=proPilot(L,{dur:16,sp:[[0,11]],path:[[0,0,Y0]],gap:()=>36});proJaws(L);
     // шар летит от Кощея к голове по дуге, как в игре
     const orbTo=(gold,pi,t0,dur)=>{orbMake(gold,pi);const o=orbs.pop();L.props.push(o.g);o.g.visible=false;let dead=false;
       L.tick(t=>{if(dead)return;if(t<t0){o.g.visible=false;return;}o.g.visible=true;const k=Math.min(1,(t-t0)/dur),hp=hpos(gold?MIDH:HEADS[pi]),from=CL.pos.clone().add(new V3(0,1,2));o.g.position.lerpVectors(from,hp,k);o.g.position.y+=Math.sin(k*Math.PI)*4;o.g.children[1].rotation.z+=0.05;if(gold)o.g.children[2].rotation.x+=0.05;});
       return {g:o.g,pos:()=>o.g.position.clone(),pop:()=>{dead=true;proPop(o.g,gold?0xffd23a:0xb070ff,gold?24:12);if(gold){K5L.gold(o.g.position.clone(),30);}}};};
     const a=orbTo(false,0,0.8,3.2),b=two?orbTo(false,1,1.6,3.2):null;
     L.beat(7.5,{says:[['zven','Кощей бросает шары. Шар с кольцом вашего цвета — ваш.',0.2,4.2],['zven','Огонь '+kbd('attack')+' сам летит в шар.',4.6,2.6]],
       ev:[[2.4,()=>proFire(L,0,a.pos,()=>a.pop())],[3.1,()=>{if(b)proFire(L,1,b.pos,()=>b.pop());}]]});
     const g=orbTo(true,0,8.4,3.4);
     L.beat(8.5,{says:[['zven',two?'Золотой шар — огонь обеих голов разом!':'Золотой шар — два огня подряд!',0.4,3.6]],
       ev:[[3.2,()=>proFire(L,0,g.pos)],[3.7,()=>proFire(L,two?1:0,g.pos,()=>g.pop())]]});
     proBack(L,0,16);
     return L;};

   E.LES.pro_write=L=>{const Y0=GP.y,two=proTwo();
     const tp=11.6;
     const A=proPilot(L,{dur:15,sp:[[0,11]],path:[[0,0,Y0],[7,0,Y0],[10,-7,V0+1-PY],[13,-7,V0+1-PY],[14.5,0,Y0]],gap:()=>40});
     letterMake('Ш');const W0=letters.pop();L.props.push(W0.g,W0.spr);W0.g.position.set(PX,V0,A.zAt(tp));const tb=1.0;
     W0.spr.position.set(PX,V0+3,A.zAt(tp)+10);
     L.tick(t=>{const k=clamp((t-tb)/0.9,0,1),n=W0.parts.length;W0.parts.forEach((p,i)=>{const a=i/n*0.75,b=a+0.25;p.scale.x=Math.max(0.01,Math.min(1,(k-a)/(b-a)));});
       W0.marks.forEach((r,i)=>{r.material.opacity=t<tp?Math.min(0.95,Math.max(0,(t-tb-0.7)*2))*(0.7+0.3*Math.sin(t*8+i)):0;r.rotation.z+=0.03;});W0.spr.material.opacity=0;});
     L.beat(6.5,{says:[['zven','Кощей пишет в небе буквы-стены.',0.2,3.0],['zven','Сквозь чёрную букву не пролететь.',3.4,2.8]]});
     L.beat(8.5,{says:[['zven','Летите в просвет — туда, где золотые кольца!',0.2,4.2],['zven',two?'Рулите вместе.':'Держи курс на просвет.',4.6,2.4]]});
     L.atT(tp,()=>{K5L.gold(A.fpAt(tp).clone(),16);if(AUD.ready())AUD.bell(880,{v:0.06,d:0.7});});
     proBack(L,0,15);
     return L;};

   E.LES.pro_three=L=>{const two=proTwo(),Y0=GP.y;
     const A=proPilot(L,{dur:14,sp:[[0,10]],path:[[0,0,Y0]],gap:()=>18});proJaws(L);DG.visible=false;L.on(()=>{DG.visible=false;});
     L.tick(t=>{if(t>=6.6&&t<9.8){DG.visible=true;DG.position.copy(CL.pos).add(new V3(0,8.5,4));}else DG.visible=false;});
     L.beat(6.0,{says:[['zven','Догнали тучу!',0.2,1.8],['zven','Средняя голова прожжёт её огнём.',2.2,3.2]]});
     L.beat(8.0,{says:[['gorM','Моя очередь! Вы — «раз-два-три», я — огонь!',0.2,3.0],['zven','На «три» нажмите '+(two?K(0,'skill')+' и '+K(1,'skill')+' вместе!':K(0,'skill')+'!'),3.4,4.0]],
       ev:[[0.6,()=>{setDigit(DG,1);tone(880,0.12,'square',0.08);}],[1.4,()=>{setDigit(DG,2);tone(880,0.12,'square',0.08);}],[2.2,()=>{setDigit(DG,3);tone(1320,0.12,'square',0.08);}],
         [2.3,()=>{proHeadFlash(0);if(two)proHeadFlash(1);}],
         [2.6,()=>{const hp=hpos(MIDH),to=CL.pos.clone();if(SFX.whoosh)SFX.whoosh();for(let i=0;i<26;i++)L.later(i*0.03,()=>{burst(hp.clone().lerp(to,i/26),0xff8a30,5,3);});anim(0.8,k=>{MIDH.jaw.rotation.x=Math.sin(k*Math.PI)*0.7;});
           L.later(0.8,()=>{shakeAll(0.1,0.4);k5Flash(CL.pos.clone(),0xffb060,10,0.5);});}]]});
     proBack(L,0,14);
     return L;};
   /* ---------- начало и конец ---------- */
   const proEnd=()=>{if(!PRO.on)return;PRO.on=false;PRO.done=null;W.custom=W.custom0||null;W.soloMirror=PRO.mirror0;W.camFn=null;W.fallY=-12;
     for(const a of[pages.map(p=>p.s),spires.map(s=>s.m),spires.map(s=>s.mk),crows.map(c=>c.m.g),drops.map(d=>d.g),fires.map(f=>f.m),letters.map(L=>L.g),letters.map(L=>L.spr),hoops.map(H=>H.g),rocks.map(R=>R.g),orbs.map(o=>o.g),bonuses.map(b=>b.g)])a.forEach(o=>{if(o)k5Del(o);});
     pages=[];spires=[];crows=[];drops=[];fires=[];letters=[];hoops=[];rocks=[];orbs=[];bonuses=[];AURA.visible=false;PRO.fov=0;PRO.hyper=0;sc.visible=false;pg.g.visible=false;CL.g.visible=false;DG.visible=false;WV.g.visible=false;WV.out=false;CS.visible=false;PRO.fall=false;
     KS.g.rotation.z=0;try{KA.reset();}catch(e){}if(window.k5StormSet)k5StormSet(0,true);for(const id of['k5eInk','k5eWave','k5eSpeed']){const el=document.getElementById(id);if(el)el.style.opacity=0;}{const el=document.getElementById('k5eRun');if(el)el.style.display='none';}delete ES.prog;delete ES.note;};
   {for(const id of['k5eWave','k5eSpeed']){const el=document.getElementById(id);if(el)el.style.opacity=0;}const el=document.getElementById('k5eRun');if(el)el.style.display='none';}   // уровень перезапущен посреди полёта
   E.prologue=done=>{proBuild();K5.fight=false;liveBoss(false);dome.visible=false;candles.forEach(c=>{c.g.visible=false;});E.cur=0;K5E.cur=0;try{K5E.badge&&K5E.badge();}catch(e){}
     Object.assign(PRO,{on:true,leg:'intro',done,t:0,got:0,li:0,hits:0,crows:0,orbs:0,hoops:0,combo:0,caught:0,clean:0,tries:0,wave:0,wi:0,vi:0,pT:0.5,wT:0,vT:0,cnt:null,cT:0,fall:false,splT:0,boosts:0,
       boostTold:false,grumble:false,wallTold:false,archTold:false,waveTold:false,
       heat:0,hyper:0,hypers:0,chain:0,chainT:0,best:0,score:0,near:0,bonus:0,smashed:0,wards:0,magnet:0,ward:0,tr:0,bi:0,bT:8,lt:0,legSeen:'',fov:0,fovPulse:0,pull:0,
       chainTold:false,nearTold:false,bonSeen:false,bonTold:{},hudHtml:'',
       WV:G.solo?[2,2,3]:[2,4,4],VQ:G.solo?[['1'],['1','2'],['g','1'],['2','g'],['1','2','g']]:[['1','2'],['1','2','g'],['1','1','2','2'],['g','g'],['g','1','2','g'],['1','2','1','2','g']],
       WQ:G.solo?['Ш','О','Х','Н','Ж','О~']:['Ш','О','Х','Н','Ж','О~','Х','Ж'],mirror0:!!W.soloMirror});
     GP.set(0,(YL[0]+YL[1])/2,30);Object.assign(GV,{x:0,y:0,sp:11,agreeT:0,fight:0,bump:0,rush:0,kick:0,boostOn:false});IN.forEach(q=>{q.x=0;q.y=0;});CL.gap=70;CL.gapTo=null;CL.cm.opacity=1;CL.g.scale.setScalar(1);WV.d=50;WV.out=false;
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
       return w?{pos:new V3(PX+GP.x*0.55,GP.y+10,GP.z+21+PRO.pull*0.5),look:new V3(PX+GP.x*0.45,V0-1,GP.z-24),roll:-GV.x*0.01,k:4}:{pos:new V3(PX+GP.x*0.8,GP.y+9.5+PRO.pull*0.15,GP.z+19+PRO.pull),look:new V3(PX+GP.x*0.9,GP.y+4.5,GP.z-26),roll:-GV.x*0.012,k:5};};
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
       end:()=>{W.anims.length=0;try{KA.reset();}catch(e){}PRO.leg='forest';GP.z=zt(9.6);place();snapCams();
         E.lesson('pro',()=>banner('Через леса!','#ffd76a',3));}});
     E.log('prologue');};}
