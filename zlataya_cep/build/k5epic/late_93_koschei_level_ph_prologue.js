// ---- продолжение build5B2 (k5epic, часть ph): ПРОЛОГ «Через леса, через моря» — погоня на Горыныче за чёрной тучей Кощея ----
  // Управление — как в 5-3 «Утка»: у каждого игрока своя голова (Игрок 1 — левая, Игрок 2 — правая), Горыныч летит посерёдке;
  // тянете в одну сторону дольше секунды — разгон. В одиночку игрок ведёт обе головы (W.soloMirror). Четыре отрезка — по одной задаче:
  //   1 «Через леса» — Кощей вычёркивает буквы из тетрадки: ловить золотые буквы (каждая — рывок), облетать чернильные ели
  //     (красный столб над лесом — там вырастет ель; её можно облететь сбоку или поверху);
  //   2 «Через моря» — вороны из тучи: ворон с кольцом твоего цвета — твой (огонь сам летит в него), чернильная капля — щит в
  //     последний миг, и она возвращается в ворона;
  //   3 «Почерк Кощея» — Кощей пишет в воздухе буквы-стены Ш, О, Х, Н: пролететь в просвет, где золотые кольца;
  //   4 «Раз-два-три!» — туча рядом: на «три» оба — умение, средняя голова прожигает тучу, Кощей падает к дубу Лукоморья.
  // Проиграть пролог нельзя: удар только тормозит Горыныча, туча уходит дальше. Бот — tk5e_prolog.
  {const PRO={on:false,built:false,leg:''};E.pro=PRO;{const el=document.getElementById('k5eInk');if(el)el.style.opacity=0;}   // уровень перезапущен посреди клякс
   const PX=-900;                                         // коридор полёта — далеко от поляны (x≈0), страниц (x≈±400) и поездок (x=−600)
   const XL=14,YL=[9,25],PY=4,HR=3.2;                     // пределы руления; точка полёта — на 4 м выше основания Горыныча; задевание буквы
   const V0=(YL[0]+YL[1])/2+PY;                           // середина коридора по высоте точки полёта
   const GP=new V3(),GV={x:0,y:0,sp:11,agreeT:0,fight:0,bump:0,rush:0,boostOn:false},IN=[{x:0,y:0},{x:0,y:0}];
   let pg=null,HEADS=null,MIDH=null,sc=null,CL=null,LK=null,OAKW=null,DG=null;const decs=[];
   let pages=[],spires=[],crows=[],drops=[],fires=[],letters=[];
   const LET='ЧЕРЕЗЛЕСАЧЕРЕЗМОРЯКОЛДУННЕСЁТБОГАТЫРЯ';
   const SKY={bg:new THREE.Color(),amb:new THREE.Color(),sun:new THREE.Color(),ai:0.6,si:0.7};
   const skyTick=(dt,snap)=>{const T=K5L.TH[PRO.th]||K5L.TH.forest,k=snap?1:1-Math.exp(-0.9*dt);SKY.bg.lerp(new THREE.Color(T[0]),k);SKY.amb.lerp(new THREE.Color(T[3]),k);SKY.sun.lerp(new THREE.Color(T[5]),k);SKY.ai+=(T[4]-SKY.ai)*k;SKY.si+=(T[6]-SKY.si)*k;
     if(scene.background&&scene.background.isColor)scene.background.copy(SKY.bg);if(scene.fog){scene.fog.color.copy(SKY.bg);scene.fog.near=45;scene.fog.far=240;}amb.color.copy(SKY.amb);amb.intensity=SKY.ai;sun.color.copy(SKY.sun);sun.intensity=SKY.si;};
   const hpos=hh=>{const p=new V3();hh.g.getWorldPosition(p);return p;};
   const fp=()=>new V3(PX+GP.x,GP.y+PY,GP.z);
   const ft=(p,t,c)=>floatText(p.clone().add(new V3(0,0,-GV.sp*0.7)),t,c);   // надпись у места события — с упреждением по ходу полёта
   const KP_=pi=>G.solo?0:pi;                             // чьи клавиши показывать
   /* ---------- мир полёта: лес Буяна, берег, море, Лукоморье впереди; Горыныч; туча ---------- */
   const proBuild=()=>{if(PRO.built)return;PRO.built=true;const g=new THREE.Group();
     // мир стоит над «живым океаном» уровня (ATMO.ocean ходит за камерой на высоте ≈ −0,7): лес Буяна — остров, море за берегом — тот океан
     const fl=new THREE.Mesh(new THREE.PlaneGeometry(300,380),MB(0x16301e));fl.rotation.x=-Math.PI/2;fl.position.set(PX,-0.4,-140);g.add(fl);
     {const n=360,cg=new THREE.ConeGeometry(1,1,7);cg.translate(0,0.5,0);const im=new THREE.InstancedMesh(cg,M(0x23502c),n),m4=new THREE.Matrix4(),q=new THREE.Quaternion(),s=new V3(),p=new V3();
       for(let i=0;i<n;i++){const h=rand(7,13),r=rand(1.8,3);p.set(PX+rand(-130,130),-0.5,rand(40,-318));s.set(r,h,r);m4.compose(p,q,s);im.setMatrixAt(i,m4);}im.instanceMatrix.needsUpdate=true;g.add(im);}
     const sh=new THREE.Mesh(new THREE.PlaneGeometry(300,18),M(0xcbb486));sh.rotation.x=-Math.PI/2;sh.position.set(PX,-0.35,-324);g.add(sh);
     const sea=new THREE.Mesh(new THREE.PlaneGeometry(460,1300),M(0x2a6a98,{emissive:0x0a2a40,emissiveIntensity:0.25}));sea.rotation.x=-Math.PI/2;sea.position.set(PX,-1.0,-980);g.add(sea);   // запасное море под океаном уровня
     // Лукоморье: песок и почерневший дуб — группа ставится впереди, когда начинается «Почерк Кощея» (путь до неё у всех разный)
     LK=new THREE.Group();g.add(LK);const sd=new THREE.Mesh(new THREE.PlaneGeometry(340,240),M(0xdcc48e));sd.rotation.x=-Math.PI/2;sd.position.set(0,-0.3,-60);LK.add(sd);
     addMesh(new THREE.CylinderGeometry(2.6,4.2,34,10),M(0x2a2030),0,16.5,0,LK);
     for(let i=0;i<7;i++){const a=i/7*6.28;addMesh(new THREE.SphereGeometry(rand(7,10),10,8),M(0x1e1a2a,{emissive:0x2a0a40,emissiveIntensity:0.5}),Math.cos(a)*8,33.5+rand(-2,4),Math.sin(a)*6,LK);}
     LK.position.set(PX,0,-1400);OAKW=LK.position;
     for(let i=0;i<16;i++){const c=new THREE.Group();c.position.set(PX+(i%2?1:-1)*rand(26,70),rand(14,40),rand(20,-240));for(let k=0;k<3;k++)addMesh(new THREE.SphereGeometry(rand(3,6),9,7),MB(0xffffff,{transparent:true,opacity:0.7}),rand(-5,5),rand(-1,1),rand(-3,3),c);g.add(c);decs.push(c);}
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
   const inkSplat=()=>{let el=document.getElementById('k5eInk');if(!el){el=document.createElement('div');el.id='k5eInk';el.style.cssText='position:fixed;inset:0;z-index:29;pointer-events:none;opacity:0';document.body.appendChild(el);}
     const b=[];for(let i=0;i<5;i++)b.push('radial-gradient(circle at '+rand(8,92).toFixed(0)+'% '+rand(8,92).toFixed(0)+'%,rgba(28,10,46,.9) 0,rgba(70,26,120,.55) '+rand(4,8).toFixed(0)+'%,transparent '+rand(10,15).toFixed(0)+'%)');
     el.style.background=b.join(',');el.style.transition='none';el.style.opacity=1;PRO.splT=1.3;};
   const bump=(txt,p)=>{GV.bump=0.9;CL.gap=Math.min(CL.gap+6,100);PRO.hits++;if(SFX.crash)SFX.crash();shakeAll(0.12,0.4);p=p||fp();K5L.ink(p,14,1.4);ft(p.clone().add(new V3(0,2.6,0)),txt,'#d8b0ff');inkSplat();};
   /* ---------- 1. золотые буквы и чернильные ели ---------- */
   const pageSpawn=()=>{const ch=LET[PRO.li++%LET.length];const s=K5L.textSpr(ch,3.8,{w:128,h:128,col:'#ffd76a',glow:'#ffb030',weight:'italic 700 '});k5Prop(s);
     const from=CL.pos.clone().add(new V3(rand(-2,2),1.5,0)),to=new V3(PX+rand(-12,12),rand(YL[0]+2,YL[1]+3),CL.pos.z+6);s.position.copy(from);pages.push({s,from,to,t:0,ph:rand(0,6)});};
   const pageGot=p=>{PRO.got++;GV.rush=0.9;K5L.gold(p.s.position.clone(),12);if(AUD.ready())AUD.bell(660+(PRO.got%5)*110,{v:0.05,d:0.5});
     if(PRO.got===1)say('gorM','Буква! Ещё лови — быстрее полетим!',2);else if(PRO.got%6===0)ft(fp().add(new V3(0,3,0)),'букв: '+PRO.got,'#ffd76a');};
   const spireMake=s=>{const g=new THREE.Group();const c=new THREE.Mesh(new THREE.ConeGeometry(2.2,23,8),K5L.INKM);c.position.y=11.5;g.add(c);const gl=new THREE.Mesh(new THREE.ConeGeometry(2.8,24,8,1,true),k5Add(0xa060ff,{opacity:0.22}));gl.position.y=12;g.add(gl);
     g.position.set(PX+s.u,-0.5,s.z);g.scale.set(1,0.01,1);k5Prop(g);K5L.noRay(g);s.m=g;
     const mk=new THREE.Mesh(new THREE.CylinderGeometry(2.6,2.6,40,14,1,true),k5Add(0xff4a6a,{opacity:0.0}));mk.position.set(PX+s.u,20,s.z);k5Prop(mk);K5L.noRay(mk);s.mk=mk;};
   const spiresTick=dt=>{for(const s of spires){const dz=GP.z-s.z;
       if(s.st===0&&dz<100){s.st=1;s.t=0;spireMake(s);if(s.wall&&!PRO.wallTold){PRO.wallTold=true;say('gorM','Стена из елей! Вверх тяните — поверху!',2.2);}}
       if(s.st===1){s.t+=dt;s.mk.material.opacity=0.18+0.22*Math.sin(G.time*14);if(s.t>1.3){s.st=2;s.t=0;k5Del(s.mk);if(AUD.ready())AUD.thump({f0:90,f1:40,d:0.4,v:0.18});K5L.ink(new V3(PX+s.u,2,s.z),16,2);}}
       if(s.st===2){s.t+=dt;const k=Math.min(1,s.t/0.7);s.m.scale.y=Math.max(0.01,1-Math.pow(1-k,3));if(k>=1)s.st=3;}
       if(s.st>=2&&!s.hit&&Math.abs(GP.z-s.z)<2.8&&Math.abs(GP.x-s.u)<4&&GP.y<-1.5+23*s.m.scale.y){s.hit=true;GP.x+=(GP.x>=s.u?1:-1)*2;GV.x=(GP.x>=s.u?1:-1)*9;bump('Бум! Чернильная ель');}
       if(s.m&&dz<-20){k5Del(s.m);s.m=null;s.st=9;}}};
   /* ---------- 2. вороны, чернильные капли, огонь и щит ---------- */
   const crowMake=pi=>{const g=new THREE.Group(),bk=M(0x1e1e26);part(g,new THREE.SphereGeometry(0.6,10,8),bk,0,0,0).scale.set(0.9,0.85,1.3);part(g,new THREE.SphereGeometry(0.36,10,8),bk,0,0.3,0.62);
     const bg=new THREE.ConeGeometry(0.1,0.5,6);bg.rotateX(Math.PI/2);part(g,bg,M(0x4a4a50),0,0.26,1.0);for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.09,6,5),MB(0xd8b0ff),s*0.17,0.42,0.86);
     const wings=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*0.5,0.12,0);g.add(w);part(w,new THREE.BoxGeometry(1.5,0.06,0.7),M(0x2e2e3a),s*0.75,0,0);wings.push({w,s});}
     const ring=new THREE.Mesh(new THREE.TorusGeometry(1.35,0.13,6,28),k5Add(PCOL[G.solo?0:pi],{opacity:0.95}));g.add(ring);g.scale.setScalar(1.3);k5Prop(g);K5L.noRay(g);return {g,wings,ring};};
   const crowWave=n=>{for(let i=0;i<n;i++){const pi=i%2,m=crowMake(pi);const c={m,pi,hp:2,pos:CL.pos.clone().add(new V3(rand(-3,3),rand(-1,2),2)),off:new V3((pi?1:-1)*rand(4,10),rand(1,6),-rand(15,21)),t:0,cd:rand(1.8,2.6)+i*0.6,throws:0,alive:true,leave:false};m.g.position.copy(c.pos);crows.push(c);}
     say('koschei',['Вороны мои — ко мне!','Клюйте их, клюйте!','Все — на Горыныча!'][PRO.wave%3],1.6);};
   const crowKill=(c,how)=>{if(!c.alive)return;c.alive=false;PRO.crows++;if(SFX.brk)SFX.brk();burst(c.pos.clone(),0x2a2a34,14,4);K5L.gold(c.pos.clone(),8);k5Del(c.m.g);ft(c.pos.clone().add(new V3(0,1.4,0)),how==='refl'?'Капля — обратно!':'Кар-р!','#ffe0a0');};
   const dropThrow=c=>{const g=new THREE.Group();addMesh(new THREE.SphereGeometry(0.55,10,8),K5L.INKM,0,0,0,g);addMesh(new THREE.SphereGeometry(0.95,10,8),k5Add(0xa060ff,{opacity:0.35}),0,0,0,g);k5Prop(g);K5L.noRay(g);g.position.copy(c.pos);
     drops.push({g,c,pi:c.pi,from:c.pos.clone(),t:0,dur:G.solo?1.8:1.5,refl:false});if(SFX.thwip)SFX.thwip();};
   const shieldFx=pi=>{const m=new THREE.Mesh(new THREE.CircleGeometry(1.3,20),k5Add(0x9fe0ff,{opacity:0.7}));k5Prop(m);k5fx(0.3,k=>{m.material.opacity=0.7*(1-k);m.scale.setScalar(1+k*0.5);m.position.copy(hpos(HEADS[pi])).add(new V3(0,0,-1.3));},()=>k5Del(m));};
   const fire=pi=>{const hp=hpos(HEADS[pi]);const m=new THREE.Mesh(new THREE.SphereGeometry(0.5,10,8),MB(0xffa040));m.position.copy(hp);k5Prop(m);
     const tg=crows.filter(c=>c.alive&&!c.leave&&(G.solo||c.pi===pi)).sort((a,b)=>a.pos.distanceTo(hp)-b.pos.distanceTo(hp))[0];
     fires.push({m,tg:tg||null,vel:new V3(IN[pi].x*7,IN[pi].y*3+0.5,-(GV.sp+46)),t:0});if(SFX.whoosh)SFX.whoosh();const hh=HEADS[pi];anim(0.25,k=>{hh.jaw.rotation.x=Math.sin(k*Math.PI)*0.6;});};
   const crowsTick=dt=>{for(const c of crows){if(!c.alive)continue;c.t+=dt;
       const tgt=c.leave?c.pos.clone().add(new V3(c.off.x>0?20:-20,10,-GV.sp*0.6)):new V3(PX+GP.x,GP.y,GP.z).add(c.off);c.pos.lerp(tgt,1-Math.exp(-(c.leave?1.2:2.4)*dt));
       c.m.g.position.copy(c.pos);c.m.g.lookAt(PX+GP.x,GP.y+4,GP.z);c.m.wings.forEach(q=>{q.w.rotation.z=q.s*Math.sin(G.time*14+c.t)*0.5;});c.m.ring.rotation.z+=dt*2;
       c.cd-=dt;if(!c.leave&&c.cd<=0&&c.t>1.4){c.cd=rand(2.6,3.4)*(G.solo?1.25:1);dropThrow(c);c.throws++;if(c.throws>=3)later(1.6,()=>{c.leave=true;});}
       if(c.leave&&c.pos.distanceTo(fp())>60){c.alive=false;k5Del(c.m.g);}}
     for(const d of drops){d.t+=dt;
       if(!d.refl){const hp=hpos(HEADS[d.pi]),k=Math.min(1,d.t/d.dur);d.g.position.lerpVectors(d.from,hp,k);d.g.position.y+=Math.sin(k*Math.PI)*1.5;d.g.scale.setScalar(1+0.25*Math.sin(G.time*20));if(d.t>=d.dur){d.dead=true;bump('Ай! Чернила!',hp);}}
       else{const to=d.c.alive?d.c.pos:d.g.position.clone().add(new V3(0,2,-8));d.g.position.lerp(to,Math.min(1,dt*7));if(d.c.alive&&d.g.position.distanceTo(d.c.pos)<1.6){crowKill(d.c,'refl');d.dead=true;}if(d.t>1.2)d.dead=true;}}
     drops=drops.filter(d=>{if(d.dead)k5Del(d.g);return !d.dead;});
     for(const f of fires){f.t+=dt;if(f.tg&&f.tg.alive){const v=f.tg.pos.clone().sub(f.m.position);const L=v.length();f.m.position.addScaledVector(v,Math.min(1,dt*60/Math.max(L,0.01)));if(L<1.8){f.t=9;f.tg.hp--;burst(f.tg.pos.clone(),0xff8a30,10,3);
           if(f.tg.hp<=0)crowKill(f.tg,'fire');else{f.tg.m.g.scale.setScalar(1.6);later(0.12,()=>f.tg.m.g.scale.setScalar(1.3));}}}
       else f.m.position.addScaledVector(f.vel,dt);if(Math.random()<0.5)burst(f.m.position.clone(),0xffa040,1,1,0.4);}
     fires=fires.filter(f=>{if(f.t>1.2){k5Del(f.m);return false;}return true;});};
   /* ---------- 3. буквы-стены: штрихи [u1,w1,u2,w2] в плоскости полёта (u — вбок от середины, w — вверх от середины) ---------- */
   const GLY={'Ш':{s:[[-14,-10,-14,11],[0,-10,0,11],[14,-10,14,11],[-15.6,-8.6,15.6,-8.6]],safe:[[-7,1],[7,1]]},
     'О':{o:[10,8],safe:[[0,0]]},
     'Х':{s:[[-17,-10,17,10],[-17,10,17,-10]],safe:[[-11,0],[11,0],[0,7],[0,-7]]},
     'Н':{s:[[-14,-10,-14,11],[14,-10,14,11],[-14,0,14,0]],safe:[[0,6],[0,-6]]}};
   const segD=(px,py,ax,ay,bx,by)=>{const dx=bx-ax,dy=by-ay,L2=dx*dx+dy*dy;let k=L2?((px-ax)*dx+(py-ay)*dy)/L2:0;k=Math.max(0,Math.min(1,k));return Math.hypot(px-ax-dx*k,py-ay-dy*k);};
   const glyHit=(ch,u,w)=>{const S=GLY[ch];if(S.o)return (u/(S.o[0]-HR))**2+(w/(S.o[1]-HR))**2>=1;return S.s.some(([a,b,c,d])=>segD(u,w,a,b,c,d)<HR);};
   const inkM=()=>M(0x170a24,{emissive:0x4a1a7a,emissiveIntensity:0.75,transparent:true,opacity:1});
   const letterMake=ch=>{const S=GLY[ch],g=new THREE.Group(),parts=[],mi=inkM(),gm=k5Add(0xb070ff,{opacity:0.25});
     if(S.o){const [rx,ry]=S.o;const r=new THREE.Mesh(new THREE.TorusGeometry(rx,1.6,10,40),mi);r.scale.y=ry/rx;g.add(r);parts.push(r);
       const sh=new THREE.Shape();sh.moveTo(-22,-13);sh.lineTo(22,-13);sh.lineTo(22,14);sh.lineTo(-22,14);sh.lineTo(-22,-13);const ho=new THREE.Path();ho.absellipse(0,0,rx,ry,0,Math.PI*2,true);sh.holes.push(ho);
       const hz=new THREE.Mesh(new THREE.ShapeGeometry(sh,32),new THREE.MeshBasicMaterial({color:0x1a0c2a,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));hz.position.z=-0.4;g.add(hz);parts.push(hz);g.userData.haze=hz;}
     else for(const [a,b,c,d] of S.s){const L=Math.hypot(c-a,d-b),ang=Math.atan2(d-b,c-a);const m=new THREE.Mesh(new THREE.BoxGeometry(L,3.2,1.2),mi);m.position.set((a+c)/2,(b+d)/2,0);m.rotation.z=ang;g.add(m);
       const o=new THREE.Mesh(new THREE.BoxGeometry(L+0.6,4.2,0.5),gm);o.position.copy(m.position);o.rotation.z=ang;g.add(o);parts.push(m,o);}
     const marks=S.safe.map(([u,w])=>{const r=new THREE.Mesh(new THREE.TorusGeometry(1.8,0.28,8,28),new THREE.MeshBasicMaterial({color:0xffb820,transparent:true,opacity:0,depthWrite:false,fog:false,toneMapped:false}));r.position.set(u,w,0.6);g.add(r);return r;});
     g.position.set(PX,V0,CL.pos.z+5);k5Prop(g);K5L.noRay(g);parts.forEach(p=>{p.scale.x=0.01;});
     const spr=new THREE.Sprite(new THREE.SpriteMaterial({map:K5L.letterT(ch),transparent:true,depthWrite:false,fog:false,toneMapped:false,opacity:0}));spr.raycast=()=>{};k5Prop(spr);spr.position.copy(KS.g.position).add(new V3(0,8,2));
     letters.push({g,ch,parts,marks,spr,mi,gm,t:0,z:g.position.z,passed:false});try{KA.pose('castR',{antic:0.15});}catch(e){}
     if(AUD.ready()){AUD.nz({type:'bandpass',f0:2600,f1:1400,d:0.6,v:0.06,q:4,a:0.01});}ft(KS.g.position.clone().add(new V3(0,9.5,0)),'«'+ch+'»','#c8a0ff');};
   const lettersTick=dt=>{for(const L of letters){L.t+=dt;const k=Math.min(1,L.t/0.9),n=L.parts.length;
       L.parts.forEach((p,i)=>{const a=i/n*0.75,b=a+0.25;p.scale.x=Math.max(0.01,Math.min(1,(k-a)/(b-a)));});if(L.g.userData.haze&&!L.passed)L.g.userData.haze.material.opacity=0.6*k;
       L.marks.forEach((r,i)=>{r.material.opacity=L.passed?0:Math.min(0.95,Math.max(0,(L.t-0.7)*2))*(0.7+0.3*Math.sin(G.time*8+i));r.rotation.z+=dt*2;});
       L.spr.material.opacity=k<1?Math.min(1,k*4):Math.max(0,1-(L.t-0.9)*3);L.spr.scale.setScalar(1+k*5);
       if(!L.passed&&GP.z<=L.z+0.3){L.passed=true;const f=fp(),u=f.x-PX,w=f.y-V0;
         if(glyHit(L.ch,u,w))bump('Задели «'+L.ch+'»!');else{PRO.clean++;K5L.gold(f.clone().add(new V3(0,0,-2)),16);if(AUD.ready())AUD.bell(880,{v:0.06,d:0.7});ft(f.clone().add(new V3(0,3,0)),'Сквозь «'+L.ch+'»!','#ffd76a');}}
       if(L.passed){L.pt=(L.pt||0)+dt;const o=Math.max(0,1-L.pt*2.5);L.mi.opacity=o;L.gm.opacity=0.25*o;if(L.g.userData.haze)L.g.userData.haze.material.opacity=0.6*o;}}
     letters=letters.filter(L=>{if(L.passed&&L.pt>0.5){k5Del(L.g);k5Del(L.spr);return false;}return true;});};
   /* ---------- отрезки ---------- */
   const legSea=()=>{PRO.leg='sea';PRO.wave=0;PRO.wT=1.2;PRO.th='storm';if(window.k5StormSet)k5StormSet(0.6);banner('Через моря!','#9fe0ff',2.4,'ворон твоего цвета — твой');
     later(0.6,()=>say('koschei','Догоняете? Вороны мои — ко мне!',2.2));};
   const legWrite=()=>{PRO.leg='write';LK.position.z=GP.z-430;for(const c of crows)c.leave=true;CL.gapTo=40;PRO.wi=0;PRO.wT=2.6;PRO.th='sunset';if(window.k5StormSet)k5StormSet(0);
     banner('Почерк Кощея!','#c8a0ff',2.4,'в просвет — к золотым кольцам');later(0.4,()=>say('koschei','Ах так? Я вас самих перепишу!',2.4));
     later(3.2,()=>say('gorM','Рулим вместе — в просвет!',1.8));};
   const legThree=()=>{PRO.leg='three';CL.gapTo=18;PRO.cnt=null;PRO.cT=1.8;banner('Догнали тучу!','#ffd76a',2.2,'на «три» — вместе '+K(0,'skill')+(G.solo?'':' и '+K(1,'skill')));
     say('gorM','Моя очередь! Вы — «раз-два-три», я — огонь!',2.4);};
   const midFire=()=>{PRO.cnt=null;DG.visible=false;PRO.leg='burn';const hp=hpos(MIDH),to=CL.pos.clone();if(SFX.whoosh)SFX.whoosh();if(SFX.ok)SFX.ok();
     for(let i=0;i<26;i++)later(i*0.03,()=>{burst(hp.clone().lerp(to,i/26),0xff8a30,5,3);});anim(0.8,k=>{MIDH.jaw.rotation.x=Math.sin(k*Math.PI)*0.7;});E.log('proBurn');
     later(0.8,()=>{shakeAll(0.15,0.6);k5Flash(CL.pos.clone(),0xffb060,10,0.5);anim(1.2,k=>{CL.cm.opacity=1-k;CL.g.scale.setScalar(1+k*0.5);});if(SFX.brk)SFX.brk();
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
     if(tap(pi,'guard')){shieldFx(pi);const d=drops.find(q=>q.pi===pi&&!q.refl);if(d){if(d.dur-d.t<=0.85){d.refl=true;d.t=0;if(SFX.parry)SFX.parry();G.stats.parries++;ft(hpos(HEADS[pi]).add(new V3(0,1.4,0)),'Отбил!',PCSS[pi]);}
         else ft(hpos(HEADS[pi]).add(new V3(0,1.4,0)),'Рано — подпусти поближе','#dddddd');}}
     if(tap(pi,'skill')){if(PRO.cnt){if(PRO.cnt.press[pi]===null)PRO.cnt.press[pi]=PRO.cnt.t;}else ft(hpos(MIDH).add(new V3(0,1.6,0)),'Средней голове нужен счёт «раз-два-три»','#ffe0a0');}};
   /* ---------- шаг полёта ---------- */
   W.updates.push(dt=>{if(!PRO.on)return;skyTick(dt);
     if(PRO.splT>0){PRO.splT-=dt;const el=document.getElementById('k5eInk');if(el)el.style.opacity=Math.max(0,Math.min(1,PRO.splT)).toFixed(2);}
     for(const c of decs)if(c.position.z>GP.z+40){c.position.z-=280;c.position.x=PX+(Math.random()<0.5?1:-1)*rand(26,70);}
     if(G.cine||G.state!=='play'){place();clPlace(dt);return;}
     PRO.t+=dt;const fly=PRO.leg==='forest'||PRO.leg==='sea'||PRO.leg==='write'||PRO.leg==='three';
     if(fly){const a=IN[0],b=G.solo?IN[0]:IN[1],la=Math.hypot(a.x,a.y),lb=Math.hypot(b.x,b.y),dot=(la>0.3&&lb>0.3)?(a.x*b.x+a.y*b.y)/(la*lb):0;
       GV.agreeT=dot>0.75?GV.agreeT+dt:0;GV.fight=dot<-0.3?GV.fight+dt:0;const chase=PRO.leg==='forest'||PRO.leg==='sea';
       const want=chase?(GV.agreeT>1?17:GV.fight>0.3?8:11)+(GV.rush>0?5:0):10;GV.sp=damp(GV.sp,want-(GV.bump>0?6:0),2.5,dt);GV.bump=Math.max(0,GV.bump-dt);GV.rush=Math.max(0,GV.rush-dt);
       if(chase&&GV.agreeT>1&&!GV.boostOn){GV.boostOn=true;if(SFX.whoosh)SFX.whoosh();if((PRO.boosts=(PRO.boosts||0)+1)<=2)ft(hpos(MIDH).add(new V3(0,1.8,0)),'Вместе — разгон!','#ffd76a');if(!PRO.boostTold){PRO.boostTold=true;say('gorM','Вот! Вместе — вот так!',1.6);}}
       if(GV.agreeT<=1)GV.boostOn=false;
       if(!G.solo&&GV.fight>0.3&&!PRO.grumble){PRO.grumble=true;say(Math.random()<0.5?'gorL':'gorR',['Мне налево, налево!','Мне направо, направо!','Тянут в разные стороны — ох, беда!'][Math.floor(rand(0,3))],1.4);later(3,()=>{PRO.grumble=false;});}
       const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;GV.x=damp(GV.x,mx*9,3,dt);GV.y=damp(GV.y,my*6,3,dt);GP.x=clamp(GP.x+GV.x*dt,-XL,XL);GP.y=clamp(GP.y+GV.y*dt,YL[0],YL[1]);GP.z-=GV.sp*dt;
       if(chase){CL.gap=clamp(CL.gap+(13-GV.sp)*dt,26,100);}}
     else if(PRO.leg==='burn'||PRO.leg==='end'){GV.sp=damp(GV.sp,8,2,dt);GP.z-=GV.sp*dt;GP.x=damp(GP.x,0,1.5,dt);GV.x=damp(GV.x,0,3,dt);}
     place();if(!PRO.fall)clPlace(dt);
     // золотые буквы
     if(PRO.leg==='forest'||PRO.leg==='sea'){PRO.pT-=dt;if(PRO.pT<=0){PRO.pT=PRO.leg==='forest'?rand(0.9,1.4):rand(2.0,2.6);pageSpawn();}}
     for(const p of pages){p.t+=dt;const k=Math.min(1,p.t/1.1);if(k<1){p.s.position.lerpVectors(p.from,p.to,smooth(k));p.s.position.y+=Math.sin(k*Math.PI)*3;}else{p.to.y=Math.max(YL[0]+1,p.to.y-dt*0.5);p.s.position.set(p.to.x+Math.sin(G.time*2+p.ph)*0.6,p.to.y,p.to.z);}
       p.s.material.rotation=Math.sin(G.time*3+p.ph)*0.3;const f=fp();if(Math.abs(p.s.position.z-f.z)<2.8&&Math.hypot(p.s.position.x-f.x,p.s.position.y-f.y)<3.9){p.dead=true;pageGot(p);}else if(p.s.position.z>GP.z+6)p.dead=true;}
     pages=pages.filter(p=>{if(p.dead)k5Del(p.s);return !p.dead;});
     spiresTick(dt);crowsTick(dt);lettersTick(dt);
     if(PRO.leg==='forest'&&GP.z<-300)legSea();
     if(PRO.leg==='sea'){PRO.wT-=dt;if(PRO.wave<PRO.WV.length&&PRO.wT<=0&&crows.every(c=>!c.alive||c.leave)){crowWave(PRO.WV[PRO.wave]);PRO.wave++;PRO.wT=1.8;}
       if((PRO.wave>=PRO.WV.length&&crows.every(c=>!c.alive)&&GP.z<-600)||GP.z<-780)legWrite();}
     if(PRO.leg==='write'){PRO.wT-=dt;if(PRO.wi<PRO.WQ.length&&PRO.wT<=0&&CL.gap>34){letterMake(PRO.WQ[PRO.wi]);PRO.wi++;PRO.wT=PRO.wi>=PRO.WQ.length-1&&!G.solo?3.9:4.6;}
       if(PRO.wi>=PRO.WQ.length&&!letters.length)legThree();}
     if(PRO.leg==='three')countTick(dt);
     // строка пролога над полем — сколько пути пройдено; заметка — до тучи и пойманные буквы
     const z=-GP.z;ES.prog=PRO.leg==='forest'?0.35*z/300:PRO.leg==='sea'?0.35+0.3*Math.min(1,(z-300)/320):PRO.leg==='write'?0.65+0.25*PRO.wi/PRO.WQ.length:PRO.leg==='three'?0.92:1;
     ES.note=(PRO.leg==='forest'||PRO.leg==='sea'?'до тучи '+Math.round(CL.gap)+' м · ':'')+'букв '+PRO.got;});
   W.custom0=W.custom;
   PRO.dbg=()=>({GP,GV,CL,pages,spires,crows,drops,letters,GLY,V0,PX,PY,YL,LK,sc});   // для ботов (tk5e_prolog)
   /* ---------- цели и рисунки кнопок ---------- */
   E.note=n=>n===0?(ES.note||''):'';
   E.stage[0]={goal:pi=>{const q=KP_(pi),hd=G.solo?'Обе головы — твои: ':(pi?'Правая голова — твоя: ':'Левая голова — твоя: ');
       if(PRO.leg==='forest')return hd+MOVEK(q)+'. Ловите <b>золотые буквы</b> — Горыныч прибавит ходу.<br>'+(G.solo?'Держи направление — разгон':'Тяните в одну сторону — разгон')+'. <b>Красный столб</b> — там вырастет чёрная ель: облетай сбоку или поверху.';
       if(PRO.leg==='sea')return '<b>Вороны Кощея!</b> '+(G.solo?'Огонь':'Ворон с кольцом твоего цвета — твой: огонь')+' '+K(q,'attack')+' сам летит в ворона.<br>Чернильная капля — <b>щит '+K(q,'guard')+' в последний миг</b>: капля вернётся в ворона.';
       if(PRO.leg==='write')return '<b>Почерк Кощея:</b> пролетите сквозь букву — туда, где <b>золотые кольца</b>.<br>'+(G.solo?'':'Рулите вместе: Горыныч летит посерёдке между вашими головами.');
       if(PRO.leg==='three')return 'На «три» — вместе '+K(q,'skill')+': средняя голова прожжёт тучу.';
       return K5L.LINES[0];},targets:()=>[],end:()=>{proEnd();}};
   for(const pi of[0,1]){
     prompt(pi,'guard',()=>{const d=drops.find(q=>!q.refl&&(G.solo||q.pi===pi));return hpos(HEADS[d?d.pi:pi]).add(new V3(0,1.8,0));},()=>PRO.on&&(!G.solo||pi===0)&&drops.some(d=>!d.refl&&(G.solo||d.pi===pi)&&d.dur-d.t<0.95));
     prompt(pi,'attack',()=>{const c=crows.find(q=>q.alive&&!q.leave&&(G.solo||q.pi===pi));return c?c.pos.clone().add(new V3(0,2.2,0)):fp();},
       ()=>PRO.on&&PRO.leg==='sea'&&(!G.solo||pi===0)&&crows.some(q=>q.alive&&!q.leave&&(G.solo||q.pi===pi))&&!drops.some(d=>!d.refl&&(G.solo||d.pi===pi)&&d.dur-d.t<0.95));
     prompt(pi,'skill',()=>hpos(MIDH).add(new V3(G.solo?0:pi?1:-1,2,0)),()=>PRO.on&&PRO.leg==='three'&&!!PRO.cnt&&(!G.solo||pi===0),'на «три»');}
   E.PAUSE[0]='<b>'+K5E.NAMES[0]+'</b><br><i>'+K5L.LINES[0]+'</i><br>Погоня на Горыныче: Игрок 1 ведёт левую голову, Игрок 2 — правую, Горыныч летит посерёдке; вместе в одну сторону — разгон.<br>'+
     'Удар — огонь своей головы, щит в последний миг — капля летит обратно, умение на «три» — огонь средней головы. Tab — панель стадий и оценок.';
   /* ---------- начало и конец ---------- */
   const proEnd=()=>{if(!PRO.on)return;PRO.on=false;PRO.done=null;W.custom=W.custom0||null;W.soloMirror=PRO.mirror0;W.camFn=null;W.fallY=-12;
     for(const a of[pages.map(p=>p.s),spires.map(s=>s.m),spires.map(s=>s.mk),crows.map(c=>c.m.g),drops.map(d=>d.g),fires.map(f=>f.m),letters.map(L=>L.g),letters.map(L=>L.spr)])a.forEach(o=>{if(o)k5Del(o);});
     pages=[];spires=[];crows=[];drops=[];fires=[];letters=[];sc.visible=false;pg.g.visible=false;CL.g.visible=false;DG.visible=false;PRO.fall=false;
     KS.g.rotation.z=0;try{KA.reset();}catch(e){}if(window.k5StormSet)k5StormSet(0,true);const el=document.getElementById('k5eInk');if(el)el.style.opacity=0;delete ES.prog;delete ES.note;};
   E.prologue=done=>{proBuild();K5.fight=false;liveBoss(false);dome.visible=false;candles.forEach(c=>{c.g.visible=false;});E.cur=0;K5E.cur=0;try{K5E.badge&&K5E.badge();}catch(e){}
     Object.assign(PRO,{on:true,leg:'intro',done,t:0,got:0,li:0,hits:0,crows:0,clean:0,tries:0,wave:0,wi:0,pT:0.5,wT:0,cnt:null,cT:0,fall:false,splT:0,boosts:0,boostTold:false,grumble:false,wallTold:false,
       WV:G.solo?[2,2,3]:[2,4,4],WQ:G.solo?['Ш','О','Х','Н']:['Ш','О','Х','Н','О'],mirror0:!!W.soloMirror});
     GP.set(0,(YL[0]+YL[1])/2,30);Object.assign(GV,{x:0,y:0,sp:11,agreeT:0,fight:0,bump:0,rush:0,boostOn:false});IN.forEach(q=>{q.x=0;q.y=0;});CL.gap=70;CL.gapTo=null;CL.cm.opacity=1;CL.g.scale.setScalar(1);
     spires=[-62,-92,-120,-148,-176,-232,-258,-284].map((z,i)=>({z,u:i===4||i===6?0:(i%2?1:-1)*rand(3,9),st:0,t:0,m:null,mk:null}));
     for(const u of[-10,0,10])spires.push({z:-205,u,wall:true,st:0,t:0,m:null,mk:null});   // на 205 м — стена из трёх елей: только поверху
     W.custom0=W.custom;W.custom=proCustom;W.soloMirror=true;W.pauseLine=E.PAUSE[0];W.fallY=-1e4;W.clampR=null;sc.visible=true;pg.g.visible=true;CL.g.visible=true;
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
       end:()=>{W.anims.length=0;try{KA.reset();}catch(e){}PRO.leg='forest';GP.z=zt(9.6);place();snapCams();
         banner('Через леса!','#ffd76a',3,'ловите золотые буквы · '+(G.solo?'держи направление':'тяните вместе')+' — разгон');}});
     E.log('prologue');};}
