/* ============================== РЕЛИЗ final06 · 3-Б «СОЛОВЕЙ-РАЗБОЙНИК» — ГНЕЗДО НА СЕМИ ДУБАХ И БОЙ ПО БЫЛИНЕ (docs/26_solovei_boss.md) ============================== */
// Подход «Прямоезжая дорожка» — late_99w_k3b_road.js; облик Соловья, дочек и зверей-теней — late_99t_k3b_sol.js; эффекты — late_99u_k3b_fx.js.
// Былина: Соловей «свистит по-соловьиному, кричит по-звериному, шипит по-змеиному» — бой по трём голосам, потом все три разом.
// Гнездо-кладовая: прутья, пух, скорлупа, добыча с дорожки (шапки, лапти, самовар, колёса, узелки). Насесты — кроны трёх дубов над ободом.
//  1 «Свист соловьиный»: трель — белая низкая волна (прыжок), вдох — щёки дуются, потом синяя высокая (за широкий щит Потапа; свой щит держит,
//    но отбрасывает). Йоша под щитом Потапа подходит к дубу и, пока Соловей набирает воздух, плещет ему в клюв — «Кхе-кхе!», кубарем вниз: окно.
//    Второе дыхание: «Дубы — кланяйтесь!» — Богатырский щит вдвоём, дуб с Соловьём кланяется; Йоша поливает корни — дуб клонится ниже,
//    другой дёргает Соловья за хвост — тот срывается. Внизу, очухавшись, Соловей замахивается посохом-свистулькой (жёлтое — щит: отбил — оглушён).
//  2 «Крик звериный»: ночь, звёзды, светлячки. Рык — фиолетовая волна гасит перо (прыжок), из тьмы бегут звери-тени (в свете тают, удар — рассыпаются).
//    «Солнечный зайчик»: свет пера одного отражается от щита другого — пятно бежит по стволу дуба, на который смотрит щит; добежало до Соловья —
//    «Ай, глаза!», ослеп и падает: в свете пера он пёстрый — бей. Он слышит зайчик и перескакивает; Совиный взор показывает, куда.
//  3 «Шип змеиный»: Соловей в небе, по гнезду ползут ветряные змеи (красная дорожка), перья-стрелы, пике. Посреди гнезда вихрь: Потап подкидывает
//    друга в вихрь (или войти самому — дольше), вихрь поднимает — Соловей хватает «птенчика» и катает: родео. Кренится — наклонись в другую сторону;
//    три удачных — шапку сорвали, Соловей кувырком вниз: окно. Мёртвая петля — внизу на «БОМ» ударь в колокол: оглох — выровнялся.
//  4 «Полный свист»: на вершине самого высокого дуба Соловей раздулся втрое; выдох — ветер к краю (стой в тени щита Потапа), вдох — ветер тянет
//    к нему, у клюва три жёлудя: Совиный взор видит золотой, Прошка стреляет. Каждый верный выстрел выбивает голос (перо хвоста), гнездо
//    разматывается (край улетает). Три голоса — Соловей «сдулся», падает: Богатырский мах вдвоём.
// Сквозное: шкала запала, окно — не больше трёх ударов («Очухался!»), второе дыхание на половине силы этапа, вдвоём рассыпались — этап сначала,
// музыка по этапам, одна табличка над Соловьём вместо надписей, своя камера арены.
build3B=function(){
  W.zvenAway=true;W.world=3;setTheme('heaven');W.name='3-Б · «Соловей-Разбойник»';W.sub='Босс мира 3 · прямоезжая дорожка и гнездо на семи дубах · свист, крик, шип и полный свист';W.camX=16;
  const F=W.flags;F.phase=0;F.fin=[-9,-9];HEROES.forEach(h=>{h.k3ride=null;h.slowT=0;h.tangleT=0;});
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.pero=true;W.fallY=-40;W.k2fx=true;
  const C={x:0,z:-14},R=12,T=HERO,SL=FIN.k3s,FX=FIN.k3fx,FX2=FIN.k2fx,SOLO=()=>!!G.solo,ft=FIN.k2ft||floatText;
  const BG0=new THREE.Color(0x5a54a0),BG1=new THREE.Color(0x0a0a20),BG3=new THREE.Color(0x3a3a6c),BG4=new THREE.Color(0x8a4c6c),BG5=new THREE.Color(0xe8a070);
  scene.background=BG0.clone();scene.fog=new THREE.Fog(0x5a54a0,45,160);const AMB0=amb.intensity,SUN0=sun.intensity;
  heavenDecor(-70,190,{xw:16,sunY:14});
  const at=(a,r,y)=>new V3(C.x+Math.cos(a)*r,y||0,C.z+Math.sin(a)*r);
  const faceTo=(p,q)=>Math.atan2(q.x-p.x,q.z-p.z);
  /* ---------- гнездо: дно (три кольца — разматывается с края), обод, добыча ---------- */
  W.cyls.push({x:C.x,z:C.z,r:R+1.4,miny:-8,maxy:0,on:true});
  const NEST={parts:[]};
  {const tw=[hp(0x9a7a48),hp(0x6a4a2a),hp(0x7e5e36),hp(0xb08a54)];
    const ring=(r0,r1,seed)=>{const g=k3G(W.group,C.x,0,C.z);fk(g,K=>{K.add(KP.lathe([[Math.max(0.01,r0),-1.3],[r1,-1.1],[r1+0.2,-0.4],[r1,0],[Math.max(0.01,r0),0]],40),hp(0x6e5030),null,{noise:0.04,kG:0.1});
        const nr=Math.max(1,Math.round((r1-r0)/1.25));for(let i=0;i<nr;i++)K.add(KP.tor(r0+0.6+i*1.25,0.13,3,48),tw[i%2],tm(0,0.04,0,Math.PI/2,0,0),{kN:0.3});
        const nt=Math.round((r1*r1-r0*r0)*0.18);for(let i=0;i<nt;i++){const a=rand(0,6.28),r=rand(r0+0.4,r1-0.3),len=rand(1,2.8);K.add(KP.cyl(0.05,0.06,len,4),tw[i%4],tm(Math.cos(a)*r,0.07,Math.sin(a)*r,0,rand(0,6.28),0).multiply(tm(0,0,0,Math.PI/2,0,0)),{kN:0.3});}
        // пух, перья, скорлупа
        for(let i=0;i<Math.round(nt*0.15);i++){const a=rand(0,6.28),r=rand(r0+0.5,r1-0.5);K.add(hSph(rand(0.25,0.5),7,5),hp(0xfaf6ff),tm(Math.cos(a)*r,0.08,Math.sin(a)*r,0,0,0,1,0.3,1),{kN:0.5});}
        for(let i=0;i<Math.round(nt*0.08);i++){const a=rand(0,6.28),r=rand(r0+0.5,r1-0.5);K.add(hSph(0.3,6,4),i%2?hp(0x9a6a3e):hp(0xf2dfb4),tm(Math.cos(a)*r,0.06,Math.sin(a)*r,0,rand(0,6),0).multiply(tm(0,0,0,0,0,0,0.25,0.04,0.9)),{kN:0.5});}},{seed});
        k3Dyn(g);NEST.parts.push(g);return g;};
    NEST.inner=ring(0,8.6,3);NEST.mid=ring(8.6,10.2,5);NEST.outer=ring(10.2,R+1.3,7);
    // обод: три жгута прутьев и перекрестья; спереди — проход, его загораживает плетёная калитка
    NEST.rim=k3G(W.group,C.x,0,C.z);const g0=Math.PI/2+0.16;
    fk(NEST.rim,K=>{for(let l=0;l<3;l++)K.add(KP.tor(R+0.75,0.36-l*0.05,5,64,Math.PI*2-0.32),tw[l%2],tm(0,0.35+l*0.38,0,Math.PI/2,0,g0),{noise:0.04,kN:0.3});
      for(let i=0;i<120;i++){const a=g0+(i+0.5)/120*(Math.PI*2-0.32),r=R+0.75+rand(-0.3,0.3);K.add(KP.cyl(0.05,0.06,1.9,4),tw[i%4],tm(Math.cos(a)*r,0.7,Math.sin(a)*r,0,-a,0).multiply(tm(0,0,0,0,0,(i%2?1:-1)*0.75)),{kN:0.3});}});
    k3Dyn(NEST.rim);NEST.parts.push(NEST.rim);}
  const gate=k3G(W.group,C.x,0,C.z+R+0.75);fk(gate,K=>{const tw=[hp(0x9a7a48),hp(0x6a4a2a)];for(let i=0;i<14;i++)K.add(KP.cyl(0.06,0.07,1.6,4),tw[i%2],tm(-1.7+i*0.26,0.75,0,0,0,(i%2?1:-1)*0.3));
    for(let l=0;l<3;l++)K.add(KP.cyl(0.08,0.08,3.8,5),tw[l%2],tm(0,0.35+l*0.4,0,0,0,Math.PI/2),{kN:0.3});});k3Dyn(gate);
  const gateCol=colBox(C.x-1.9,C.x+1.9,0,1.5,C.z+R+0.1,C.z+R+1.4,true);
  colBox(C.x-7,C.x-1.9,0,1.3,C.z+R-0.6,C.z+R+1.4,true);colBox(C.x+1.9,C.x+7,0,1.3,C.z+R-0.6,C.z+R+1.4,true);
  W.gateOpen=(h)=>{if(!gateCol.on)return;gateCol.on=false;SFX.brk();bark(h||T.potap,'potap','Эх, ухнем! Раздвинулись прутики!',2,true);const L=gate.children[0];FX.twigs(gate.position.clone().setY(1),10,new V3(0,0,1));
    FIN.k3fx.anim(0.7,k=>{L.scale.set(1-0.85*k,1,1);L.position.y=-k*0.4;});};
  // добыча разбойника вдоль обода
  {const spots=[2.35,2.75,3.3,0.95,0.55,0.12,-0.25,-2.9];const ld=k3G(W.group,0,0,0);fk(ld,K=>{spots.forEach((a,i)=>{const r=rand(10.2,10.9),x=C.x+Math.cos(a)*r,z=C.z+Math.sin(a)*r,ry=rand(0,6.28),k=i%6;
      if(k===0){K.add(KP.cyl(0.38,0.42,0.42,10),hp(0x4a6ab0),tm(x,0.21,z,0.1,ry,0.3));K.add(KP.tor(0.44,0.1,4,12),hp(0xb08a54),tm(x+0.05,0.06,z,Math.PI/2+0.1,0,0));}            // шапка
      else if(k===1){for(const s of[-1,1])K.add(hSph(0.3,7,5),hp(0xc8a860),tm(x+s*0.3,0.13,z,0,ry+s*0.3,0,0.55,0.38,1),{noise:0.02});}                                                // лапти
      else if(k===2){K.add(KP.lathe([[0,0],[0.32,0.05],[0.42,0.4],[0.36,0.75],[0.18,0.88],[0.14,1.1],[0,1.12]],10),hp(0xd8a040),tm(x,0,z,0.08,ry,0),{s:0.2});K.add(KP.cyl(0.04,0.04,0.3,5),hp(0xd8a040),tm(x+0.35,0.45,z,0,0,1.2));}   // самовар
      else if(k===3){K.add(KP.tor(0.62,0.07,4,16),hp(0x7a5432),tm(x,0.62,z,0.25,ry,0));for(let s=0;s<6;s++)K.add(KP.cyl(0.035,0.035,1.2,4),hp(0x7a5432),tm(x,0.62,z,0.25,ry,s*Math.PI/6));}   // колесо телеги
      else if(k===4){K.add(hSph(0.42,8,6),hp(0xc84a4a),tm(x,0.36,z,0,ry,0,1,0.85,1),{noise:0.03});K.add(KP.cone(0.12,0.3,5),hp(0xc84a4a),tm(x,0.82,z));for(let s=0;s<5;s++)K.add(hSph(0.05,4,3),hp(0xfaf2e0),tm(x+Math.cos(s*1.3)*0.38,0.4+Math.sin(s*2.1)*0.15,z+Math.sin(s*1.3)*0.38));}   // узелок
      else{for(let s=0;s<5;s++){K.add(KP.lathe([[0,0],[0.14,0.02],[0.12,0.18],[0.06,0.26],[0,0.28]],8),hp(0xe0b040),tm(x+s*0.28-0.56,0.06+Math.sin(s)*0.04,z,Math.PI/2*0.8,ry,0),{s:0.3});}K.add(KP.cyl(0.02,0.02,1.4,4),hp(0xc4302a),tm(x,0.12,z,0,0,Math.PI/2));}   // связка колокольцев
    });});}
  /* ---------- семь дубов: стволы уходят в облака; на трёх — насесты-ветви; кроны клонятся (ветер, «дубы кланяются») ---------- */
  const OAKS=[];
  for(let i=0;i<7;i++){const a=-Math.PI/2+(i-3)*0.5,x=C.x+Math.cos(a)*15.2,z=C.z+Math.sin(a)*15.2,big=i===3,H=big?11.5:10;
    fk(W.group,K=>{K.add(KP.cyl(1.4,1.8,20,10),hp(0x5a3d22),tm(x,-10,z),{noise:0.06});for(let k=0;k<4;k++){const b=k*1.6+a;K.add(KP.cone(0.6,2.4,5),hp(0x4a321c),tm(x+Math.cos(b)*1.3,-1.6,z+Math.sin(b)*1.3,0,-b,Math.PI/2-0.35),{noise:0.04});}});
    const pv=k3G(W.group,x,0,z);pv.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a));
    fk(pv,K=>{K.add(KP.cyl(0.95,1.35,H,10),hp(0x5e4026),tm(0,H/2,0),{noise:0.05,kG:0.15});
      for(let k=0;k<3;k++){const s=k%2?1:-1;K.add(KP.cyl(0.18,0.34,4.2,6),hp(0x6b4a2b),tm(s*1.4,7.4+k*1.3,-1.1,-0.5,0,-s*1.0),{noise:0.03});}
      if(i>=1&&i<=5){K.add(KP.cyl(0.3,0.46,3.6,7),hp(0x6b4a2b),tm(0,5.1,1.5,Math.PI/2-0.06,0,0),{noise:0.03});K.add(hSph(0.42,7,5),hp(0x6b4a2b),tm(0,5.2,3.1),{noise:0.03});}
      if(big){K.add(KP.cyl(0.34,0.5,3.0,7),hp(0x6b4a2b),tm(0,7.2,1.2,Math.PI/2-0.25,0,0),{noise:0.03});K.add(hSph(0.5,7,5),hp(0x6b4a2b),tm(0,7.5,2.4),{noise:0.03});}});
    fk(pv,K=>{for(let k=0;k<7;k++)K.add(KP.ico(rand(2.2,3.3),1),hp(k%2?0x4f7a2c:0x5f8a34),tm(rand(-2.6,2.6),H+rand(-0.6,2.6),rand(-3.4,-0.4)),{noise:0.2});},{mat:KMAT.wind});
    k3Dyn(pv);
    const O={i,a,x,z,pv,big,perch:i>=1&&i<=5,bend:0,tb:0,src:at(a,12.0),root:at(a,11.6),H};
    if(O.perch&&i>=2&&i<=4){fk(W.group,K=>{for(let k=0;k<3;k++){const b=a+(k-1)*0.16;const p0=at(b,14.2,0.2),p1=at(b,12.75,1.15),p2=at(b,11.7,0.1);
        for(const[u,v]of[[p0,p1],[p1,p2]]){const d=new V3().subVectors(v,u),L=d.length();const m=new THREE.Matrix4().compose(u.clone().addScaledVector(d,0.5),new THREE.Quaternion().setFromUnitVectors(new V3(0,1,0),d.normalize()),new V3(1,1,1));
          K.add(KP.cyl(0.16,0.22,L,6),hp(0x5a3d22),m,{noise:0.02});}}});}
    OAKS.push(O);}
  const perchL=new V3(0,5.45,2.85),topL=new V3(0,7.75,2.25);
  const perchOf=(O,top)=>{O.pv.updateMatrixWorld(true);return O.pv.localToWorld((top?topL:perchL).clone());};
  // облака вокруг гнезда — рвутся на большом свисте
  FX.cloudRing(C,{n:24,r0:19,r1:33,y0:-9,y1:2});
  const WIND=FX.windOn(C,R);
  // колокол этапа 3 — на краю гнезда справа
  const BELL={a:0.5};{const p=at(BELL.a,10.3);BELL.x=p.x;BELL.z=p.z;const fr=new THREE.Group();fr.position.set(p.x,0,p.z);fr.rotation.y=-BELL.a;W.group.add(fr);const wm=M(0x6a4a2a);
    for(const s of[-1,1])addMesh(new THREE.CylinderGeometry(0.12,0.16,4.2,8),wm,0,2.1,s*1.0,fr);addMesh(new THREE.BoxGeometry(0.26,0.22,2.4),wm,0,4.2,0,fr);
    BELL.b=bigBell(p.x,4.1,p.z,0.85,{pitch:1.26});BELL.fr=fr;
    BELL.ring=new THREE.Mesh(new THREE.TorusGeometry(1.5,0.08,6,36),MB(COL.gold,{transparent:true,opacity:0.9}));BELL.ring.rotation.x=Math.PI/2;BELL.ring.position.set(p.x,0.1,p.z);BELL.ring.visible=false;W.group.add(BELL.ring);}
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,2);W.zvenFree=true;
  const arena={x:C.x,z:C.z+2,r:R-1,camActive:()=>!G.cine&&F.phase>=1};W.camZones.push(arena);
  bell(C.x,C.z+R-1.8,0);
  const bb=$('bossbar');bb.style.display='none';
  let sg=$('solsign');if(!sg){sg=document.createElement('div');sg.id='solsign';sg.style.cssText='position:absolute;display:none;padding:7px 18px;border-radius:12px;border:3px solid #fff3c0;color:#fff;font:800 22px system-ui;white-space:nowrap;text-shadow:0 2px 3px rgba(0,0,0,0.6);box-shadow:0 6px 18px rgba(0,0,0,0.35);pointer-events:none;z-index:6';document.body.appendChild(sg);}
  W.onLeave=()=>{bb.style.display='none';sg.style.display='none';scene.background=BG0.clone();amb.intensity=AMB0;sun.intensity=SUN0;try{FIN.music.play(null);}catch(e){}try{FIN.U.wind.value=1;}catch(e){}};
  let sol=null;
  /* ---------- общее ---------- */
  const BS={zap:0,winHits:0,cap:3,lastEmb:0,idleT:0,half:false,zoom:0,signT:0};F.bs=BS;
  const live=()=>HEROES.filter(h=>h.active&&!h.cling&&!h.k3ride&&!players[h.player].downed);
  const pick=()=>{const L=live();return L[Math.floor(Math.random()*L.length)]||active(0);};
  const tell=()=>(SOLO()||genPath()==='easy')?0.3:0;   // запас на телеграф: Лёгкий путь и одиночка
  const winDur=()=>(SOLO()?7:5)+(genPath()==='easy'?1.5:0);
  const hurt=(h,p)=>{if(h.rollT>0||h.iT>0||h.k3ride)return false;return damageHero(h,{kind:'hazard',ref:{pos:p}});};
  const key=(p,text,col)=>ft(p.clone(),text,col||'#ffe9a0');
  const solTop=()=>sol.pos.clone().add(new V3(0,sol.L.top*sol.s+0.4,0));
  const beak=()=>{const p=new V3();sol.k3.jaw.getWorldPosition(p);return p;};
  const QUIET=/Уголёк|искра|закрылся|Щит!|не достать|не пробить|насквозь|Свет!|Тьма|Перепрыгнул|Отбил!|лепесток|Ой! Не больно|Увернулся|Открыт|Сверху|Удар!|Одним махом|Добивающий|Щёлк|Живая вода|Совиный взор|Глаза отдыхают|Держусь|Спасибо|Оп!/;
  W.k2quiet=t=>F.phase>=1&&!F.out&&QUIET.test(t);
  const sayS=(text,dur,emo,pose)=>{if(!sol)return;say('solovei',text,dur||1.8,!/^(Хи-хи! Не тот|Один звон|Фью! Проморгался)/.test(text));SL.say(sol.k3,Math.min(2.2,(dur||1.8)*0.8));if(emo||pose)SL.set(sol.k3,pose||null,emo);};   // реплики — субтитром, без надписи над головой
  const LINES={tease:['Фью-ить! Не поймаете!','Хи-хи! Пташки-неваляшки!','Фью! Кто без спросу на мою дорожку?','Ой, умора — на ногах не стоят!'],hurt:['Ой, пёрышко!','Ай-ай, хвостик!','Кхе-кхе… ой…','Не щиплись!'],
    angry:['Ну, держитесь!','Сейчас как свистну!','Фью-у! Сдую всех!']};
  const line=k=>{const L=LINES[k];return L[Math.floor(Math.random()*L.length)];};
  const MUS=()=>{try{const TR=FIN.music.TR;if(!TR||TR.sol1)return;const B=TR.boss;
      TR.sol1=Object.assign({},B,{bpm:120,root:45});TR.sol2=Object.assign({},B,{bpm:104,root:41,sc:'aeo',v:B.v.filter(v=>v.i!=='kick').concat([{i:'frame',drum:'x.....x.....x...',vol:0.04}])});
      TR.sol3=Object.assign({},B,{bpm:132,root:47,v:B.v.concat([{i:'tamb',drum:'x.x.x.x.x.x.x.x.',vol:0.02}])});
      TR.sol4=Object.assign({},B,{bpm:84,root:45,v:B.v.concat([{i:'kick',drum:'x...x...x...x...',vol:0.12},{i:'frame',drum:'x.x.x.x.x.x.x.x.',vol:0.05}])});}catch(e){}};
  const music=n=>{MUS();try{FIN.music.play(n);}catch(e){}};
  const STN=['','Свист соловьиный','Крик звериный','Шип змеиный','Полный свист'];
  const setBar=()=>{if(bb.style.display!=='block')return;const e=sol,ph=Math.max(1,Math.min(4,Math.floor(F.phase||1)));const hp=e&&e.alive?Math.max(0,e.embers)/e.maxEmb:0;const v=ph===4?S4.voices/3:hp;
    bb.innerHTML='<b>Соловей-Разбойник</b> · '+ph+' / 4 · '+STN[ph]+' <span class="seg"><i style="width:'+Math.round((F.won?0:v)*100)+'%"></i></span>'+
      (ph<4?' <span class="seg" style="width:70px;background:#26303a"><i style="width:'+Math.round(BS.zap*100)+'%;background:linear-gradient(90deg,#ffe08a,#fff)"></i></span>':'');};
  /* ---------- табличка над Соловьём: одна строка — что делать сейчас ---------- */
  let sgKey='';const fl={txt:'',bg:'',t:0};
  function flash(txt,bg,dur){fl.txt=txt;fl.bg=bg;fl.t=dur||1.4;}
  function showSign(txt,bg){if(!txt||G.cine||!sol||G.state!=='play'||G.ui||BS.signT>0){sg.style.display='none';return;}sg.style.display='block';const k=txt+'|'+bg;if(sgKey!==k){sgKey=k;sg.textContent=txt;sg.style.background=bg||'#3a2a6a';}
    const v=sol.pos.clone().add(new V3(0,sol.L.top*sol.s+0.8,0)).project(camS),Wd=innerWidth,H=innerHeight;let x=(v.x+1)/2*Wd,y=(1-v.y)/2*H;if(v.z>1){x=Wd/2;y=H*0.3;}
    x=clamp(x,Wd*0.3,Wd*0.7);y=clamp(y,H*0.2,H*0.6);sg.style.left=x.toFixed(0)+'px';sg.style.top=y.toFixed(0)+'px';sg.style.transform='translate(-50%,-100%) scale('+(fl.t>0?(1+0.05*Math.sin(G.time*14)).toFixed(3):1)+')';}
  function stateSign(){const e=sol;if(!e||F.phase<1||F.phase>4.6||F.won)return null;
    if(F.phase===4.5)return['СДУЛСЯ — БЕЙТЕ РАЗОМ, ВДВОЁМ!','#8a6a10'];
    if(e.state==='broken')return['ПРОБОЙ — ДОБЕЙ!','#8a6a10'];if(e.dazeT>0)return F.phase===2&&!e.litNow?['УПАЛ — ПОСВЕТИ ПЕРОМ И БЕЙ!','#4a2a7a']:['БЕЙ!','#8a6a10'];
    if(cring.on)return['ЩИТ ВДВОЁМ — КАК КРУЖОК СОЖМЁТСЯ!','#8a6a10'];
    if(F.phase===1){if(S1.sw)return['ЖЁЛТЫЙ ПОСОХ — ЩИТ!','#6a4a1a'];if(S1.bow&&S1.bow.k>0.2)return S1.bow.k>=0.85?['ЗА ХВОСТ ЕГО!','#8a6a10']:['ЙОША — ПОЛЕЙ КОРНИ!','#2a6a5a'];
      if(S1.inh)return['ЩЁКИ ДУЕТ — ЙОША, В КЛЮВ!','#2a4a8a'];return null;}
    if(F.phase===2){if(S2.tilt>0)return['ПЕРЕСКОЧИТ!','#4a2a7a'];return['ЗАЙЧИК — ЩИТОМ ЕМУ В ГЛАЗА!','#4a2a7a'];}
    if(F.phase===3){if(S3.ride){const Rd=S3.ride;if(Rd.loop)return['ПЕТЛЯ — БЕЙ В КОЛОКОЛ НА «БОМ»!','#8a1a1a'];if(Rd.bank)return[Rd.bank.dir>0?'НАКЛОНИСЬ →':'← НАКЛОНИСЬ!','#8a6a10'];return['ДЕРЖИСЬ!','#3a4a7a'];}
      if(S3.dive&&S3.dive.t<2.2)return['ПИКЕ — С КРАСНОЙ ПОЛОСЫ УЙДИ!','#8a1a1a'];return['В ВИХРЬ — ПОТАП ПОДКИНЕТ!','#3a4a7a'];}
    if(F.phase===4){if(S4.st==='inhale')return W.owlT>0?['ЗОЛОТОЙ ЖЁЛУДЬ — ОН НАСТОЯЩИЙ!','#8a6a10']:['КАКОЙ ЖЁЛУДЬ НАСТОЯЩИЙ?','#4a2a7a'];return['ВЫДОХ — ЗА ЩИТ ПОТАПА!','#2a4a8a'];}
    return null;}
  /* ---------- окно уязвимости, запал ---------- */
  function winStart(dur,pose){const e=sol;BS.zoom=1;e.dazeT=dur;e.state='recover';BS.winHits=0;BS.cap=3;BS.lastEmb=e.embers;SL.set(e.k3,pose||'dazed','hurt');e.spin.visible=true;}
  function winTick(){const e=sol;if(!e)return;if(e.embers<BS.lastEmb){const n=BS.lastEmb-e.embers;BS.winHits+=n;FX.feathers(e.pos.clone().add(new V3(0,1.6*e.s,0)),5*n);if(Math.random()<0.4)sayS(line('hurt'),1.2,'hurt');
      if(e.dazeT>0&&BS.winHits>=BS.cap&&e.state!=='broken'){e.dazeT=0.01;key(solTop(),'Очухался!','#cfe8ff');}}
    BS.lastEmb=e.embers;}
  function zapAdd(k){if(!(F.phase>=1&&F.phase<4)||!sol)return;BS.zap=Math.min(1,BS.zap+k*(SOLO()?1.4:1));if(BS.zap>=1&&!(sol.dazeT>0)&&sol.state!=='broken')zapStun();}
  function zapStun(){BS.zap=0;SFX.crash&&SFX.crash();shakeAll(0.07,0.5);F.slow=0.3;key(solTop(),'Запал погас — оглушён!','#ffe9a0');sayS(line('hurt'),1.6,'hurt');
    if(F.phase===1)s1Fall('stun');else if(F.phase===2)s2Fall();else if(F.phase===3)s3Fall();}
  /* ---------- волны свиста ---------- */
  const waves=[];
  function wave(kind,src,o){o=o||{};const h=kind==='high'?2.6:kind==='big'?3.4:0.6;const Wv=FX.wave(kind==='low'?'white':kind==='high'?'blue':kind==='dark'?'purple':'gold',h);
    const q={kind,Wv,src:new V3(src.x,0,src.z),r:1.2,sp:(o.sp||8)+(BS.half?1.2:0),hit:new Set(o.skip||[])};Wv.set(q.src,q.r);waves.push(q);SFX.whoosh();
    tone(kind==='low'?1500:kind==='dark'?520:kind==='high'?900:600,0.6,'sine',0.13,kind==='low'?2200:kind==='dark'?260:400);if(kind!=='low')FX.cl.tear(kind==='big'?1:0.45,kind==='big'?1.6:0.6);return q;}
  function behindPotap(h,src){const P=T.potap;if(!P.active||!P.guard||players[0].downed||h===P)return false;const ax=h.pos.x-src.x,az=h.pos.z-src.z,bx=P.pos.x-src.x,bz=P.pos.z-src.z;const da=Math.hypot(ax,az),db=Math.hypot(bx,bz);
    if(da<db)return false;return (ax*bx+az*bz)/(da*db||1)>0.92;}
  function updateWaves(dt){for(let i=waves.length-1;i>=0;i--){const w=waves[i];w.r+=dt*w.sp;w.Wv.set(w.src,w.r);w.Wv.tick(dt,w.src);if(w.r>R+1)w.Wv.fade(Math.max(0,1-(w.r-R-1)/2));
      for(const h of HEROES){if(!h.active||w.hit.has(h)||h.cling||h.k3ride||players[h.player].downed)continue;const d=Math.hypot(h.pos.x-w.src.x,h.pos.z-w.src.z);if(Math.abs(d-w.r)>0.55)continue;w.hit.add(h);const pi=h.player,air=h.pos.y>0.42;
        if(w.kind==='low'){if(!air){hurt(h,w.src);if(!BS['jt'+pi]){BS['jt'+pi]=1;tip(pi,'Белая волна низкая — прыгни '+K(pi,'jump')+', как подкатит.',2.6);}}}
        else if(w.kind==='dark'){if(air){}else if(h.lit){h.lit=false;featherFx(h);}else hurt(h,w.src);}
        else if(w.kind==='high'){if(behindPotap(h,w.src)||(h===T.potap&&h.guard)){FX.sparks(h.pos.clone().add(new V3(0,1.4,0)),5,0x9fd0ff);}
          else if(h.guard){shieldBlock(h);const dx=h.pos.x-w.src.x,dz=h.pos.z-w.src.z,dd=Math.hypot(dx,dz)||1;h.vel.x+=dx/dd*8;h.vel.z+=dz/dd*8;h.vel.y=3;h.knockT=0.3;}
          else{hurt(h,w.src);if(!BS['ht'+pi]){BS['ht'+pi]=1;tip(pi,'Синяя волна высокая — встань в синюю тень за Потапом (щит '+K(0,'guard')+').',3);}}}}
      if(w.r>R+3.2){w.Wv.del();waves.splice(i,1);}}}
  function clearWaves(){waves.forEach(w=>w.Wv.del());waves.length=0;}
  // синяя тень за широким щитом Потапа
  const wedge=new THREE.Group();W.group.add(wedge);{const m=new THREE.Mesh(new THREE.CircleGeometry(3.6,24,-Math.PI/2-0.4,0.8),MB(0x7ab0ff,{transparent:true,opacity:0.3,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.y=0.07;m.renderOrder=2;wedge.add(m);wedge.userData.m=m;}
  // Богатырский щит: самая большая волна по всему гнезду — щит вдвоём в одну долю
  const cring={on:false,t:0,press:[null,null],src:null};const ringM=[0,1].map(()=>{const m=new THREE.Mesh(new THREE.TorusGeometry(1,0.08,6,32),MB(COL.yellow,{transparent:true,opacity:0.9}));m.rotation.x=Math.PI/2;m.visible=false;W.group.add(m);return m;});
  W.onGuardTap=(pi,h)=>{if(cring.on&&cring.press[pi]===null)cring.press[pi]=cring.t;};
  function startCring(src){cring.on=true;cring.t=0;cring.press=[null,null];cring.src=src.clone();SFX.yellow&&SFX.yellow();}
  function ringStrike(){cring.on=false;ringM.forEach(m=>{m.visible=false;});const wv=wave('big',cring.src);const win=TIMING[genPath()].parry+0.06;const hit=[0,1].map(pi=>cring.press[pi]!==null&&Math.abs(cring.press[pi]-1.3)<=win);
    if(hit[0]&&(hit[1]||SOLO())){G.stats.shields++;SFX.horn();key(solTop(),'Богатырский щит!','#ffd76a');wv.hit=new Set(HEROES);for(const pi of[0,1]){const h=active(pi);FX.sparks(h.pos.clone().add(new V3(0,1,0)),10,0xffe08a);}zapAdd(0.34);}
    else{for(const pi of[0,1]){const h=active(pi);wv.hit.add(h);if(players[pi].downed||h.cling)continue;if(cring.press[pi]!==null||h.guard)shieldBlock(h);else hurt(h,cring.src);}}
    shakeAll(0.05,0.35);}
  /* ---------- Соловей ---------- */
  function spawnSol(){sol=SL.boss(C.x,C.z-10,{scale:1.5});sol.embers=sol.maxEmb=8;BS.lastEmb=8;sol.state='idle';sol.dazeT=0;
    sol.guardAll=()=>!(sol.dazeT>0)&&sol.state!=='broken';sol.guardText='не достать';
    sol.onFinisher=h=>{if(F.phase===1){F.phase=1.5;later(0.4,scene2);return;}if(F.phase===2){F.phase=2.5;later(0.4,scene3);return;}if(F.phase===3){F.phase=3.5;later(0.4,scene4);return;}
      if(F.phase===4.5&&!F.won){F.fin[h.player]=G.time;if(SOLO())F.fin[1-h.player]=G.time;SFX.finisher();ringFx(sol.pos,COL.gold,3);FX.feathers(sol.pos.clone().add(new V3(0,1,0)),10);
        if(Math.abs(F.fin[0]-F.fin[1])<0.6)win();else if(!F.finTold){F.finTold=true;for(const pi of[0,1])tip(pi,'Ударьте '+K(pi,'attack')+' ОБА РАЗОМ — Богатырский мах!',3);}}};
    sol.tick=(e,dt)=>{if(G.cine)return;if(e.state!=='broken'&&!(e.dazeT>0)){e.cd=Math.max(e.cd,1);if(e.state==='ready'||e.state==='wind'||e.state==='strike'||e.state==='stagger'||e.state==='recover')e.state='idle';}
      if(e.state==='broken'&&F.phase<5)e.t=Math.min(e.t,0.5);};   // пробой ждёт добивающего — не гаснет сам
    sol.k3post=(e,dt)=>{const R2=e.k3;const h=live()[0];if(h){const a=Math.atan2(h.pos.x-e.pos.x,h.pos.z-e.pos.z)-e.face;R2.st.look[0]=clamp(Math.sin(a),-1,1);}
      // ночью: во тьме — плоская тень, в свете пера — пёстрый
      const flat=F.phase===2&&!e.litNow&&!(e.dazeT>0);e.flatK=damp(e.flatK||0,flat?1:0,6,dt);R2.g.scale.set(1,1,lerp(1,0.16,e.flatK));SL.pestry(R2,F.phase===2&&e.litNow?0.6+0.4*Math.sin(G.time*8):0);
      SL.voiceGlow(R2,F.phase===4?1:0.25);if(!(e.dazeT>0)&&e.state!=='broken')e.spin.visible=false;};}
  const placeSol=(p,face)=>{sol.pos.copy(p);sol.face=face!=null?face:faceTo(p,C);};
  // перескок с дуба на дуб: присел, хлопок крыльями, дуга
  function hopTo(O,top,done){const e=sol,from=e.pos.clone();SL.set(e.k3,'hop');SFX.jump();const st={done:false};
    later(0.42,()=>{if(!sol)return;SL.set(e.k3,'fly');SFX.whoosh();FX.feathers(from.clone().add(new V3(0,1.5,0)),4);const to=()=>perchOf(O,top);
      anim(1.0,k=>{const p=new V3().lerpVectors(from,to(),smooth(k));p.y+=Math.sin(k*Math.PI)*2.4;e.pos.copy(p);e.face=faceTo(from,to());
        if(k>=1&&!st.done){st.done=true;SL.set(e.k3,'idle');e.face=faceTo(e.pos,C);FX.feathers(e.pos.clone().add(new V3(0,1.2,0)),3);if(done)done();}});});}
  // кубарем вниз: в гнездо, к середине
  function tumble(to,dur,then){const e=sol,from=e.pos.clone();anim(dur||0.9,k=>{e.pos.lerpVectors(from,to,k);e.pos.y=lerp(from.y,to.y,k*k)+Math.sin(k*Math.PI)*1.2;e.face+=0.3;});
    later((dur||0.9)+0.02,()=>{if(!sol)return;e.pos.copy(to);e.face=faceTo(to,C);SFX.thud();shakeAll(0.04,0.3);FX.down(to.clone().add(new V3(0,0.4,0)),20);FX.feathers(to.clone().add(new V3(0,1,0)),8);if(then)then();});}
  /* ================= ЭТАП 1 «СВИСТ СОЛОВЬИНЫЙ» ================= */
  const S1={st:'off',perch:3,q:[],cd:0,inh:null,bow:null,sw:null,swDone:false,bowDone:false};BS.s1=S1;
  const P1=[2,3,4];
  function s1Start(){F.phase=1;S1.st='perch';S1.perch=3;S1.q=[];S1.cd=1.8;S1.inh=null;S1.bow=null;S1.sw=null;S1.bowDone=false;BS.half=false;const e=sol;e.embers=e.maxEmb=8;BS.lastEmb=8;BS.zap=0;e.setScale(1.5);e.dazeT=0;e.state='idle';
    SL.hat(e.k3,true);placeSol(perchOf(OAKS[S1.perch]));SL.set(e.k3,'idle','cocky');music('sol1');OAKS.forEach(O=>{O.tb=0;});
    card('Этап 1 · Свист соловьиный','белая волна — прыгай · синяя — за щит Потапа · щёки дует — Йоша, воду в клюв!',p=>p===0?'Белая волна низкая — прыгай '+K(0,'jump')+'. Синяя высокая — Потап, щит '+K(0,'guard')+': кто за ним — стоит.<br>Веди Йошу под щитом к дубу, где сидит Соловей.':
      'Соловей дует щёки — набирает воздух. Йоша, подойди к его дубу и плесни в клюв '+K(1,'skill')+'!<br>Белая волна — прыгай '+K(1,'jump')+', синяя — за Потапа.');}
  function s1Plan(){const p=['trill'];if(BS.half||Math.random()<0.4)p.push('trill2');p.push('inhale');if(BS.half&&!S1.bowDone)p.push('bow');else if(Math.random()<0.5)p.push('hop');if(BS.half&&S1.bowDone&&Math.random()<0.5)S1.bowDone=false;return p;}
  function chirps(d){for(let i=0;i<5;i++)later(i*d/5,()=>tone(1800+i*160,0.08,'sine',0.07,2400));}
  function s1Tick(dt){const e=sol,O=OAKS[S1.perch];
    if(S1.st==='perch'){if(!S1.bow)placeSol(perchOf(O));
      if(S1.inh){const I=S1.inh;I.t+=dt;if(!I.wet&&I.t>=I.dur){S1.inh=null;SL.set(e.k3,'whistle','angry');wave('high',O.src);F.tellHigh=0.8;later(0.7,()=>{if(F.phase===1&&S1.st==='perch'&&!S1.inh)SL.set(sol.k3,'idle');});S1.cd=1.6;}return;}
      if(S1.bow){bowTick(dt);return;}
      S1.cd-=dt;if(S1.cd>0)return;if(!S1.q.length)S1.q=s1Plan();const a=S1.q.shift();
      if(a==='trill'||a==='trill2'){SL.set(e.k3,'trill','cocky');const d=0.75+tell();chirps(d);S1.cd=d+(a==='trill2'?0.5:1.0);flash('БЕЛАЯ ВОЛНА — ПРЫГ!','#4a4a5a',d+0.3);
        later(d,()=>{if(F.phase===1&&S1.st==='perch'&&!S1.bow){wave('low',OAKS[S1.perch].src);if(!S1.inh)SL.set(sol.k3,'idle');}});}
      else if(a==='inhale'){S1.inh={t:0,dur:1.0+tell(),wet:false};SL.set(e.k3,'inhale','angry');SFX.blue&&SFX.blue();tone(300,1.0,'sine',0.08,900);F.tellHigh=S1.inh.dur+0.6;}
      else if(a==='hop'){const nx=P1.filter(i=>i!==S1.perch);const ni=nx[Math.random()<0.5?0:1];S1.st='hop';hopTo(OAKS[ni],false,()=>{S1.perch=ni;S1.st='perch';S1.cd=1.0;});}
      else if(a==='bow')bowStart();}
    else if(S1.st==='down'){if(S1.sw){swingTick(dt);return;}
      if(!(e.dazeT>0)){if(!S1.swDone&&Math.random()<0.65){swingStart();return;}S1.swDone=false;e.spin.visible=false;S1.st='hop';const ni=P1[Math.floor(Math.random()*3)];
        sayS(line('tease'),1.6,'cocky');hopTo(OAKS[ni],false,()=>{S1.perch=ni;S1.st='perch';S1.cd=1.4;});}}}
  // вода в клюв: Йоша рядом с дубом, пока Соловей набирает воздух
  function waterArc(h,to){const from=h.pos.clone().add(new V3(0,0.6,0));const T0=0.4;for(let i=0;i<22;i++){const p=from.clone().add(new V3(rand(-0.15,0.15),rand(0,0.2),rand(-0.15,0.15)));const tt=T0*rand(0.85,1.1);
      const v=new V3((to.x-p.x)/tt,(to.y-p.y)/tt+0.5*13*tt,(to.z-p.z)/tt);FX2.drop(p,v,rand(0.08,0.14),{noRing:true,life:tt+0.3});}SFX.water&&SFX.water();}
  function choke(){const e=sol;S1.inh=null;F.tellHigh=0;FX2.crown(beak(),0.7,{noRing:true});SL.set(e.k3,'choke','hurt');sayS('Кхе-кхе! Не лей в клюв!',1.8);key(solTop(),'Поперхнулся!','#9fe6ff');later(0.5,()=>{if(F.phase===1)s1Fall('choke');});}
  function s1Fall(why){const e=sol,O=OAKS[S1.perch];S1.inh=null;S1.st='fall';if(S1.bow){S1.bow=null;}OAKS.forEach(q=>{q.tb=0;});const to=at(O.a,8.4);SL.set(e.k3,why==='tail'?'cling':'choke','hurt');
    tumble(to,0.9,()=>{if(F.phase!==1)return;S1.st='down';winStart(winDur(),why==='choke'?'choke':'dazed');later(1.6,()=>{if(sol&&sol.dazeT>0)SL.set(sol.k3,'dazed','hurt');});});}
  // посох-свистулька: жёлтое — щит; отбил — оглушён
  function swingStart(){const e=sol,h=pick();S1.sw={t:0,dur:0.85+tell(),h};S1.swDone=true;SL.set(e.k3,'swing','angry');e.face=faceTo(e.pos,h.pos);FX2.tele(h.pos.x,0,h.pos.z,1.2,S1.sw.dur,'yellow',{follow:()=>h.pos});sayS('А посошком!',1.2);}
  function swingTick(dt){const S=S1.sw,e=sol;S.t+=dt;e.face=angDamp(e.face,faceTo(e.pos,S.h.pos),6,dt);if(S.t<S.dur)return;S1.sw=null;
    const h=S.h,d=hd(h.pos,e.pos);if(h.guard){SFX.parry&&SFX.parry();key(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Отбил!','#ffe08a');FX.sparks(h.pos.clone().add(new V3(0,1.2,0)),12,0xffe08a);zapAdd(0.34);winStart(2.2,'dazed');BS.cap=1;}
    else{if(d<6)hurt(h,e.pos);SL.set(e.k3,'laugh','cocky');}}
  // дуб кланяется: сперва Богатырский щит, потом крона клонится; Йоша поливает корни — ниже, хвост достать
  function bowStart(){const O=OAKS[S1.perch];S1.bow={O,t:0,k:0,wet:SOLO(),hold:0,tug:false};S1.bowDone=true;sayS('Ах так?! Дубы — кланяйтесь!',2,'angry','roar');startCring(O.src);
    if(!BS.bowTold){BS.bowTold=true;later(1.8,()=>{tip(1,'Дуб клонится! Йоша, полей корни '+K(1,'skill')+' — он поклонится ниже.',3.4);tip(0,'Дуб с Соловьём клонится — подбеги и дёрни его за хвост '+K(0,'attack')+'!',3.4);});}}
  function bowTick(dt){const B=S1.bow,O=B.O,e=sol;B.t+=dt;if(cring.on||B.t<1.8){placeSol(perchOf(O));return;}
    const tgt=B.wet?1:0.62;if(B.hold<=0||B.k<tgt-0.01){B.k=Math.min(tgt,B.k+dt*0.32);}
    if(B.k>=tgt-0.01){B.hold+=dt;}const lim=B.wet?(SOLO()?8:6):1.4;
    if(B.k>0.15&&!B.said){B.said=true;SL.set(e.k3,'cling','scared');sayS('Ой-ой, дубок! Не клонись!',1.8);}
    O.tb=B.k;placeSol(perchOf(O));e.face=faceTo(e.pos,C);
    if(B.hold>lim){S1.bow=null;O.tb=0;SFX.toss();SL.set(e.k3,'laugh','cocky');sayS('Фью! Выпрямился, выпрямился!',1.6);S1.cd=1.5;}}
  W.hittables.push({pos:new V3(),r:1.1,alive:()=>F.phase===1&&!!S1.bow&&S1.bow.k>=0.85,onHit:h=>{if(!S1.bow||S1.bow.tug)return;S1.bow.tug=true;SFX.latch&&SFX.latch();FX.feathers(sol.pos.clone().add(new V3(0,1.2*sol.s,0)),10);
    sayS('Хвост не трожь!',1.4,'hurt');key(solTop(),'За хвост!','#ffd76a');s1Fall('tail');}});
  const tailHit=W.hittables[W.hittables.length-1];
  for(const O of OAKS)if(O.perch)W.waterTargets.push({pos:O.root,pri:0.5,active:()=>F.phase===1&&!!S1.bow&&S1.bow.O===O&&!S1.bow.wet&&!cring.on,onWater:()=>{const B=S1.bow;if(!B)return;B.wet=true;B.hold=0;SFX.ok();key(O.root.clone().add(new V3(0,1.4,0)),'Корни напоились — дуб ниже!','#9fe6a0');
    for(let i=0;i<10;i++)FX.part(O.root.clone().add(new V3(rand(-0.6,0.6),0.2,rand(-0.6,0.6))),new V3(0,rand(1,2.5),0),'leaf',0x7ad86a,{life:1.4,wind:false});}});
  /* ================= ЭТАП 2 «КРИК ЗВЕРИНЫЙ» ================= */
  const S2={st:'off',perch:3,roarT:4,hopCd:2,tilt:0,next:2,beasts:[],spotOak:-1,spotK:0};BS.s2=S2;const P2=[1,2,3,4,5];
  const SPOT=FX.spot();const owlMark=new THREE.Mesh(new THREE.TorusGeometry(1.2,0.08,6,30),MB(0xc8a0ff,{transparent:true,opacity:0,depthWrite:false}));owlMark.rotation.x=Math.PI/2;W.group.add(owlMark);
  function s2Start(){F.phase=2;S2.st='perch';S2.perch=3;S2.roarT=3.5;S2.hopCd=2;S2.tilt=0;S2.spotK=0;S2.spotOak=-1;S2.next=pickNext(3);BS.half=false;const e=sol;e.embers=e.maxEmb=8;BS.lastEmb=8;BS.zap=0;e.dazeT=0;e.state='idle';
    placeSol(perchOf(OAKS[3]));SL.set(e.k3,'idle','cocky');music('sol2');e.guardAll=()=>!(e.dazeT>0&&e.litNow)&&e.state!=='broken';e.guardText='во тьме не видно — посвети';
    card('Этап 2 · Крик звериный','свет пера отрази щитом — «солнечный зайчик» ему в глаза · фиолетовая волна гасит перо — прыгай',p=>p===0?'Пусть друг зажжёт перо '+K(1,'item')+' и встанет рядом. Потап, подними щит '+K(0,'guard')+' и смотри на дуб с Соловьём —<br>зайчик побежит вверх по стволу. Добежит — Соловей ослепнет и упадёт: в свете пера бей!':
      'Зажги перо '+K(1,'item')+' и встань рядом с Потапом — его щит отразит свет «зайчиком».<br>Совиный взор '+K(1,'skill')+' покажет, на какой дуб Соловей перескочит. Тени тают в свете, а удар '+K(1,'attack')+' их рассыпает.');}
  function pickNext(cur){const L=P2.filter(i=>i!==cur);return L[Math.floor(Math.random()*L.length)];}
  function s2Tick(dt){const e=sol;e.litNow=litAt(e.pos.x,e.pos.y+1.5,e.pos.z,0.8);
    if(S2.st==='perch'){const O=OAKS[S2.perch];placeSol(perchOf(O));S2.hopCd-=dt;
      S2.roarT-=dt;if(S2.roarT<=0){S2.roarT=BS.half?5:6.5;SL.set(e.k3,'roar','angry');const d=0.9+tell();tone(160,d,'sawtooth',0.07,90);flash('ФИОЛЕТОВЫЙ РЫК — ПРЫГ!','#4a2a7a',d+0.4);
        later(d,()=>{if(F.phase!==2||S2.st!=='perch')return;wave('dark',OAKS[S2.perch].src);spawnBeasts(BS.half?2:1);later(0.6,()=>{if(F.phase===2&&S2.st==='perch')SL.set(sol.k3,'idle','cocky');});});}
      spotTick(dt);
      if(S2.spotOak===S2.perch&&S2.spotK>=1){dazzle();}   // зайчик добежал — ослеп, даже если уже собрался перескочить
      else if(S2.tilt>0){S2.tilt-=dt;if(S2.tilt<=0){const ni=S2.next;S2.st='hop';SPOT.set(null,null,0);hopTo(OAKS[ni],false,()=>{S2.perch=ni;S2.st='perch';S2.next=pickNext(ni);S2.hopCd=BS.half?3.2:4.5;S2.spotK=0;});}}
      else if(S2.spotOak===S2.perch){if(S2.spotK>(BS.half?0.35:0.5)&&S2.hopCd<=0){S2.tilt=0.9+tell();SL.set(e.k3,'idle','surprise');e.k3.st.look[1]=0.6;tone(900,0.3,'sine',0.08,1300);sayS('Фью? Кто там светит?',1.2);}}}
    else if(S2.st==='down'){SPOT.set(null,null,0);if(!(e.dazeT>0)){e.spin.visible=false;S2.st='hop';sayS('Фью! Проморгался, прозрел!',1.8,'angry');const ni=pickNext(-1);later(0.8,()=>{if(F.phase!==2)return;hopTo(OAKS[ni],false,()=>{S2.perch=ni;S2.st='perch';S2.next=pickNext(ni);S2.hopCd=2.5;S2.spotK=0;S2.roarT=2;});});}}
    else SPOT.set(null,null,0);
    // Совиный взор: куда перескочит
    const owl=W.owlT>0&&S2.st==='perch';owlMark.material.opacity=owl?0.6+0.3*Math.sin(G.time*8):0;if(owl){const p=perchOf(OAKS[S2.next]);owlMark.position.set(p.x,p.y+0.2,p.z);owlMark.scale.setScalar(1+0.1*Math.sin(G.time*6));}
    beastsTick(dt);}
  // зайчик: щит одного в свете пера другого; пятно бежит по стволу дуба, на который смотрит щит
  function spotTick(dt){let best=null;
    for(const S of live()){if(!S.guard)continue;const L=HEROES.find(q=>q!==S&&heroLight(q)&&hd(q.pos,S.pos)<3.4);if(!L)continue;const fx=Math.sin(S.face),fz=Math.cos(S.face);let bo=null,bc=0.92;
      for(const O of OAKS){const dx=O.x-S.pos.x,dz=O.z-S.pos.z,d=Math.hypot(dx,dz);const c=(dx*fx+dz*fz)/d;if(c>bc){bc=c;bo=O;}}if(bo){best={S,O:bo};break;}}
    if(!best){S2.spotK=Math.max(0,S2.spotK-dt*1.5);if(S2.spotK<=0)S2.spotOak=-1;SPOT.set(null,null,0);return;}
    if(best.O.i!==S2.spotOak){S2.spotOak=best.O.i;S2.spotK=0;}const rate=best.S===T.potap?1/1.2:best.S.kind==='yosha'?1/1.7:1/1.5;S2.spotK=Math.min(1,S2.spotK+dt*rate);
    const O=best.O,p=at(O.a,13.9,lerp(0.8,5.9,S2.spotK)),from=best.S.pos.clone().add(new V3(Math.sin(best.S.face)*0.5,1.0,Math.cos(best.S.face)*0.5));SPOT.set(from,p,1,best.S===T.potap?1.9:1.2);
    if(!BS.spotTold){BS.spotTold=1;SFX.ok();}}
  function dazzle(){const e=sol,O=OAKS[S2.perch];S2.st='fall';S2.spotK=0;SPOT.set(null,null,0);SL.set(e.k3,'blind','hurt');sayS('Ай, глаза! Зайчик!',1.6);key(solTop(),'Ослеп!','#fff2b0');FX.sparks(beak(),16,0xfff2b0);s2Fall();}
  function s2Fall(){const e=sol,O=OAKS[S2.perch];S2.st='fall';S2.tilt=0;tumble(at(O.a,8.6),0.9,()=>{if(F.phase!==2)return;S2.st='down';winStart(winDur()+1,'blind');later(1.4,()=>{if(sol&&sol.dazeT>0)SL.set(sol.k3,'dazed','hurt');});
    if(!BS.litTold){BS.litTold=1;for(const pi of[0,1])tip(pi,'Соловей упал! Во тьме он — плоская тень: подойдите с горящим пером '+K(pi,'item')+' — станет пёстрым, бей '+K(pi,'attack')+'!',3.6);}});}
  // звери-тени: бегут к свету; в свете медленнее и тают; удар — рассыпаются; коснулись — гасят перо и ранят
  function spawnBeasts(n){for(let i=0;i<n;i++){if(S2.beasts.filter(b=>b.alive).length>=3)break;const kinds=['wolf','lynx','bear'];const B=SL.beast(kinds[(S2.bn=(S2.bn||0)+1)%3]);const a=OAKS[S2.perch].a+(i-0.5)*0.5;const p=at(a,10.6);
    B.g.position.copy(p);B.alive=true;B.melt=0;B.k=0;B.pos=B.g.position;S2.beasts.push(B);FX.flies(p.clone().add(new V3(0,0.4,0)),6);
    const ht={pos:B.pos,r:0.8,alive:()=>B.alive&&B.k>0.6,onHit:()=>beastGone(B,true)};W.hittables.push(ht);B.ht=ht;}}
  function beastGone(B,hit){if(!B.alive)return;B.alive=false;FX.flies(B.pos.clone().add(new V3(0,0.6,0)),14);if(hit)FX.sparks(B.pos.clone().add(new V3(0,0.8,0)),8,0xe0ff7a);tone(1200,0.3,'sine',0.06,1800);
    FX.anim(0.5,k=>{B.fade(1-k);B.g.scale.setScalar(1-0.6*k);},()=>{B.g.visible=false;const i=W.hittables.indexOf(B.ht);if(i>=0)W.hittables.splice(i,1);});}
  function beastsTick(dt){for(const B of S2.beasts){if(!B.alive)continue;B.k=Math.min(1,B.k+dt*1.5);B.fade(B.k);const L=live();if(!L.length)continue;
      let tgt=null,bd=1e9;for(const h of(SOLO()?[active(G.soloPi)]:L)){const d=hd(h.pos,B.pos)-(heroLight(h)?4:0);if(d<bd){bd=d;tgt=h;}}const dx=tgt.pos.x-B.pos.x,dz=tgt.pos.z-B.pos.z,d=Math.hypot(dx,dz)||1;
      const lit=litAt(B.pos.x,0.8,B.pos.z,0);if(lit){B.melt+=dt;if(B.melt>=1.5){beastGone(B,false);continue;}}const sp=(lit?1.0:3.2)*(BS.half?1.15:1);
      B.pos.x+=dx/d*sp*dt*B.k;B.pos.z+=dz/d*sp*dt*B.k;B.g.rotation.y=Math.atan2(dx,dz);B.tick(dt,sp/3);B.fade(B.k*(1-B.melt/1.6));
      if(d<0.9){if(tgt.lit){tgt.lit=false;featherFx(tgt);}hurt(tgt,B.pos);beastGone(B,false);}}}
  function clearBeasts(){S2.beasts.forEach(B=>{if(B.alive){B.alive=false;B.g.visible=false;const i=W.hittables.indexOf(B.ht);if(i>=0)W.hittables.splice(i,1);}});S2.beasts.length=0;}
  /* ================= ЭТАП 3 «ШИП ЗМЕИНЫЙ» ================= */
  const S3={st:'off',ang:0,thrT:2,diveT:6,snakes:[],darts:[],dive:null,lift:null,ride:null,banksKept:0};BS.s3=S3;
  const orbit=a=>new V3(C.x+Math.cos(a)*7.5,7.4+Math.sin(G.time*1.7)*0.4,C.z+Math.sin(a)*7.5);
  function s3Start(){F.phase=3;S3.st='fly';S3.thrT=2.5;S3.diveT=6;S3.lift=null;S3.ride=null;S3.banksKept=0;BS.half=false;const e=sol;e.embers=e.maxEmb=6;BS.lastEmb=6;BS.zap=0;e.dazeT=0;e.state='idle';
    S3.ang=Math.atan2(e.pos.z-C.z,e.pos.x-C.x);SL.set(e.k3,'fly','cocky');music('sol3');e.guardAll=()=>!(e.dazeT>0)&&e.state!=='broken';e.guardText='в небе не достать';FX.vortexOn(C);FX.vortexSet(1);FX.windSet('swirl',0.55);
    card('Этап 3 · Шип змеиный','в вихрь — и верхом на Соловья! · кренится — наклонись в другую сторону · петля — бей в колокол',p=>p===0?'Посреди гнезда — вихрь. Потап, подкинь друга '+K(0,'skill')+' в вихрь (или войди сам) — Соловей схватит «птенчика».<br>Верхом: кренится — жми в другую сторону '+K(0,'left')+K(0,'right')+'. Красная дорожка — змей ползёт: прыгай!':
      'Кто внизу — у колокола справа: Соловей уходит в мёртвую петлю — ударь '+K(1,'attack')+' в колокол, как кружок сойдётся.<br>Верхом на Соловье: наклоняйся против крена '+K(1,'left')+K(1,'right')+'. Три раза — и шапку сорвёшь!');}
  function s3Tick(dt){const e=sol;
    // вихрь поднимает того, кто вошёл
    if(!S3.lift&&!S3.ride&&S3.st==='fly'){for(const h of live()){if(hd(h.pos,C)<1.7&&h.pos.y<3){liftStart(h);break;}}}
    if(S3.lift)liftTick(dt);
    if(S3.st==='fly'){S3.ang+=dt*(BS.half?0.75:0.55);const p=orbit(S3.ang);placeSol(p,S3.ang+Math.PI);if(e.k3.st.pose!=='fly')SL.set(e.k3,'fly');
      if(!S3.lift){S3.thrT-=dt;if(S3.thrT<=0){S3.thrT=BS.half?1.7:2.3;const n=BS.half&&Math.random()<0.6?2:1;const used=new Set();for(let k=0;k<n;k++){const ty=Math.random()<0.55&&!used.has('snake')?'snake':'dart';used.add(ty);if(ty==='snake')snakeStart();else dartStart();}}
        S3.diveT-=dt;if(S3.diveT<=0&&!S3.dive){S3.diveT=BS.half?5.5:7.5;diveStart();}}}
    else if(S3.st==='come'){const Rh=S3.come;Rh.t+=dt;const k=Math.min(1,Rh.t/1.0);const top=new V3(C.x,7.4,C.z+0.3);e.pos.lerpVectors(Rh.from,top,smooth(k));e.face=faceTo(Rh.from,top);if(k>=1)rideStart(Rh.h);}
    else if(S3.st==='ride')rideTick(dt);
    else if(S3.st==='down'){if(!(e.dazeT>0)){e.spin.visible=false;S3.st='up';sayS('Ничего — у меня шапок много!',2,'cocky','laugh');later(1.2,()=>{if(F.phase!==3)return;SL.hat(sol.k3,true);FX.feathers(sol.pos.clone().add(new V3(0,3,0)),6);
        const from=sol.pos.clone();S3.ang=Math.atan2(from.z-C.z,from.x-C.x);SL.set(sol.k3,'fly');FX.anim(1.0,k=>{sol.pos.lerpVectors(from,orbit(S3.ang),smooth(k));},()=>{if(F.phase===3){S3.st='fly';S3.thrT=2;}});});}}
    snakesTick(dt);dartsTick(dt);diveTick(dt);
    // ветер кружит героев по гнезду
    if(S3.st!=='down')for(const h of live()){if(!h.grounded||h.guard)continue;const dx=h.pos.x-C.x,dz=h.pos.z-C.z,d=Math.hypot(dx,dz)||1;if(d<2)continue;h.pos.x+=-dz/d*1.0*dt;h.pos.z+=dx/d*1.0*dt;}}
  function liftStart(h){S3.lift={h,t:0,dur:h.tossT>0?0.9:1.6,a:rand(0,6.28)};h.k3ride='lift';h.following=false;SFX.whoosh();key(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Вихрь подхватил!','#cfe8ff');}
  function liftTick(dt){const L=S3.lift,h=L.h;L.t+=dt;const k=Math.min(1,L.t/L.dur);L.a+=dt*8;const r=0.7*(1-k)+0.2;h.pos.set(C.x+Math.cos(L.a)*r,lerp(0.3,7.0,smooth(k)),C.z+Math.sin(L.a)*r);h.vel.set(0,0,0);h.grounded=true;h.knockT=0.1;h.face=L.a;
    if(k>=1&&S3.st==='fly'){S3.st='come';S3.come={h,t:0,from:sol.pos.clone()};sayS('Ага, птенчик! Покатаю!',1.6,'cocky');}
    if(S3.st==='come'||S3.st==='ride')return;if(k>=1&&S3.st!=='fly'){S3.lift=null;h.k3ride=null;h.iT=1.2;}}
  const saddle=()=>{const p=new V3();sol.k3.body.getWorldPosition(p);return p.add(new V3(0,0.95*sol.s,0));};
  function rideStart(h){S3.lift=null;S3.st='ride';S3.ride={h,banks:S3.banksKept,t:0,next:1.4,bank:null,loopT:BS.half?2.6:3.4,loop:null};h.k3ride='ride';SFX.toss();SL.set(sol.k3,'fly','surprise');
    if(!BS.rideTold){BS.rideTold=1;tip(h.player,'Ты верхом! Кренится — наклонись в другую сторону ('+K(h.player,'left')+' / '+K(h.player,'right')+') — стрелка подскажет.',3.4);}}
  const inX=pi=>{let x=(btn(pi,'right')?1:0)-(btn(pi,'left')?1:0);const a=padAx(pi);if(a&&Math.abs(a.x)>0.4)x+=a.x;return x;};
  function rideTick(dt){const Rd=S3.ride,e=sol,h=Rd.h;Rd.t+=dt;S3.ang+=dt*0.85;const p=orbit(S3.ang);if(Rd.loop)p.y+=Math.sin(Math.min(1,Rd.loop.t/Rd.loop.dur)*Math.PI)*2.5;placeSol(p,S3.ang+Math.PI);
    sol.k3.g.updateMatrixWorld(true);const sp=saddle();h.pos.copy(sp);h.vel.set(0,0,0);h.grounded=true;h.knockT=0.1;h.face=e.face;h.iT=Math.max(h.iT,0.2);
    if(players[h.player].downed){throwOff();return;}
    if(Rd.loop){loopTick(dt);return;}
    if(!Rd.bank){Rd.next-=dt;e.k3.st.roll=0;if(Rd.next<=0){Rd.bank={dir:Math.random()<0.5?-1:1,t:0,dur:0.8+tell(),ok:false};tone(700,0.25,'square',0.05,500);}
      Rd.loopT-=dt;if(Rd.loopT<=0&&Rd.banks<3){loopStart();}return;}
    const B=Rd.bank;B.t+=dt;e.k3.st.roll=-B.dir*0.6*Math.min(1,B.t/0.3);const x=inX(h.player);if(x*B.dir>0.5)B.ok=true;   // крен влево — жми вправо: dir — куда жать
    if(B.t>=B.dur){Rd.bank=null;e.k3.st.roll=0;if(B.ok){Rd.banks++;S3.banksKept=Rd.banks;SFX.ok();FX.feathers(h.pos.clone(),4);if(Rd.banks>=3){hatOff();return;}Rd.next=BS.half?rand(1.0,1.5):rand(1.4,2.0);}else throwOff();}}
  function loopStart(){const Rd=S3.ride;Rd.loop={t:0,dur:1.3+tell()*1.5,done:false};SL.set(sol.k3,'whistle','angry');tone(400,Rd.loop.dur,'sawtooth',0.05,1600);BELL.ring.visible=true;sayS('А мёртвую петельку?!',1.4);
    if(!BS.loopTold){BS.loopTold=1;for(const pi of[0,1])tip(pi,'Мёртвая петля! Кто внизу — у колокола справа: ударь '+K(pi,'attack')+', как кружок сойдётся — «БОМ!»',3.4);}}
  function loopTick(dt){const Rd=S3.ride,L=Rd.loop;L.t+=dt;const u=clamp(L.t/L.dur,0,1);BELL.ring.scale.setScalar(lerp(2.4,0.4,u));BELL.ring.material.color.setHex(u>0.85?0xffffff:COL.gold);
    if(SOLO()&&!L.done&&L.t>=L.dur){const left=HEROES.find(q=>q!==active(G.soloPi)&&!q.k3ride&&Math.hypot(q.pos.x-BELL.x,q.pos.z-BELL.z)<3.6);if(left){bellOk(left);return;}}
    const win=genPath()==='easy'?0.5:0.35;if(L.t>L.dur+win&&!L.done){L.done=true;BELL.ring.visible=false;Rd.loop=null;Rd.loopT=BS.half?5:6.5;sayS('Фью-у-у! Кувырок!',1.2,'cocky','laugh');throwOff();}}
  function bellOk(h){const Rd=S3.ride;if(!Rd||!Rd.loop)return;Rd.loop.done=true;BS.bells=(BS.bells||0)+1;BELL.b.ring();BELL.ring.visible=false;key(new V3(BELL.x,3.6,BELL.z),'БОМ!','#ffe08a');sayS('Ай, уши! Оглох!',1.4,'hurt','dazed');
    Rd.loop=null;Rd.loopT=BS.half?5:6.5;Rd.banks++;S3.banksKept=Rd.banks;Rd.next=1.2;zapAdd(0.2);if(Rd.banks>=3)later(0.3,()=>{if(S3.ride)hatOff();});}
  W.hittables.push({pos:new V3(0,1.2,0),r:1.5,alive:()=>F.phase===3,onHit:h=>{const Rd=S3.ride;if(Rd&&Rd.loop&&!Rd.loop.done){const d=Rd.loop.t-Rd.loop.dur,win=genPath()==='easy'?0.5:0.35;
      if(Math.abs(d)<=win)bellOk(h);else{BELL.b.ring();key(new V3(BELL.x,3.6,BELL.z),d<0?'рано':'поздно','#dddddd');}return;}
    if(BELL.b.swing>0.8)return;BELL.b.ring();if(!BS.oneTold||G.time-BS.oneTold>6){BS.oneTold=G.time;sayS('Один звон — не звон, а ползвона! Фью-ить!',1.8);}}});
  W.hittables[W.hittables.length-1].pos.set(BELL.x,1.2,BELL.z);
  function throwOff(){const Rd=S3.ride;if(!Rd)return;const h=Rd.h;S3.ride=null;h.k3ride=null;h.iT=2;h.grounded=false;const dx=C.x-h.pos.x,dz=C.z-h.pos.z,d=Math.hypot(dx,dz)||1;h.vel.set(dx/d*2.5,4,dz/d*2.5);h.knockT=0;
    BELL.ring.visible=false;sol.k3.st.roll=0;S3.st='fly';S3.thrT=2.6;key(h.pos.clone(),'Ух!','#ffe9a0');if(Math.random()<0.6)sayS(line('tease'),1.4,'cocky','laugh');}
  function hatOff(){const Rd=S3.ride,h=Rd.h,e=sol;S3.ride=null;h.k3ride=null;h.iT=2;h.grounded=false;h.vel.set(rand(-1.5,1.5),3,rand(-1.5,1.5));sol.k3.st.roll=0;BELL.ring.visible=false;S3.banksKept=0;
    SL.hat(e.k3,false);key(solTop(),'Шапку сорвали!','#ffd76a');sayS('Шапка! Моя шапка!',1.6,'hurt');FX.feathers(e.pos.clone().add(new V3(0,3,0)),12,[0xd8402e,0xffd34a,0x6a2a4a]);
    const hat=new THREE.Group();W.group.add(hat);fk(hat,K=>{K.add(KP.cyl(0.42,0.5,0.56,10),hp(0x6a2a4a),tm(0,0.28,0));K.add(KP.tor(0.52,0.13,5,14),hp(0x8a6a4a),tm(0,0.04,0,Math.PI/2,0,0));});hat.scale.setScalar(1.1);
    const hp0=e.pos.clone().add(new V3(0,3.4*sol.s,0)),hp1=at(rand(0,6.28),rand(3,7),0.02);FX.anim(1.4,k=>{hat.position.lerpVectors(hp0,hp1,k);hat.position.y=lerp(hp0.y,0.02,k)+Math.sin(k*Math.PI)*1.5;hat.rotation.set(k*6,k*3,0);},()=>{hat.rotation.set(0,0,0.3);});
    s3Fall();}
  function s3Fall(){const e=sol;S3.st='fall';if(S3.ride){const h=S3.ride.h;h.k3ride=null;h.iT=2;S3.ride=null;}SL.set(e.k3,'dazed','hurt');tumble(at(rand(0,6.28),2.5),1.0,()=>{if(F.phase!==3)return;S3.st='down';winStart(winDur(),'dazed');});}
  // ветряной змей: красная дорожка, потом змей ползёт по ней
  function snakeStart(){const h=pick();const a=Math.atan2(h.pos.z-C.z,h.pos.x-C.x)+Math.PI+rand(-0.5,0.5);const A=at(a,R-0.8),dir=new V3(h.pos.x-A.x,0,h.pos.z-A.z).normalize(),B=A.clone().addScaledVector(dir,2*R-2);
    const d=0.9+tell();FX2.lane(A,B,1.6,d,'red',0);SL.set(sol.k3,'hiss','angry');tone(2600,0.5,'sawtooth',0.03,1800);later(d,()=>{if(F.phase!==3)return;S3.snakes.push(mkSnake(A,B));});}
  function mkSnake(A,B){const g=new THREE.Group();W.group.add(g);const m=new THREE.MeshBasicMaterial({color:0xd8ffe8,transparent:true,opacity:0.75,depthWrite:false});const segs=[];
    for(let i=0;i<9;i++){const s=new THREE.Mesh(KP.sph(1,7,5),m);s.scale.setScalar(0.32-i*0.025);g.add(s);segs.push(s);}const hd=new THREE.Mesh(KP.cone(0.32,0.7,6),m);hd.rotation.x=Math.PI/2;segs[0].add(hd);hd.position.z=0.5;hd.scale.setScalar(1/0.32);
    return {g,m,segs,A,B,u:0,len:A.distanceTo(B),hit:new Set(),dead:false};}
  function snakesTick(dt){for(let i=S3.snakes.length-1;i>=0;i--){const S=S3.snakes[i];S.u+=dt*12;const dir=new V3().subVectors(S.B,S.A).normalize(),side=new V3(-dir.z,0,dir.x);
      S.segs.forEach((s,k)=>{const u=Math.max(0,S.u-k*0.45);const p=S.A.clone().addScaledVector(dir,u).addScaledVector(side,Math.sin(u*1.1-G.time*6)*0.5);s.position.set(p.x,0.35,p.z);if(!k)s.lookAt(p.x+dir.x,0.35,p.z+dir.z);});
      if(Math.random()<dt*20)FX.part(S.segs[0].position.clone(),new V3(rand(-1,1),rand(1,2),rand(-1,1)),'leaf',Math.random()<0.5?0x7aa04a:0xc0a050,{life:0.8});
      const hp=S.segs[0].position;for(const h of live()){if(S.hit.has(h))continue;if(Math.hypot(h.pos.x-hp.x,h.pos.z-hp.z)>0.9)continue;S.hit.add(h);if(h.pos.y>0.5)continue;if(h.guard){shieldBlock(h);continue;}hurt(h,hp);}
      if(S.u>S.len+4){S.m.opacity-=dt*3;if(S.m.opacity<=0){W.group.remove(S.g);S3.snakes.splice(i,1);}}}}
  // перья-стрелы: красный круг под героем — сверху падает перо
  function dartStart(){const h=pick();if(!h)return;const d=0.8+tell();const spot=new V3(h.pos.x,0,h.pos.z);FX2.tele(spot.x,0,spot.z,1.2,d,'red');later(d-0.3,()=>{if(F.phase!==3||!sol)return;const f=featherMesh(2.2);W.group.add(f);const from=sol.pos.clone().add(new V3(0,1.5,0));
      S3.darts.push({f,from,spot,t:0});tone(1500,0.2,'sine',0.08,700);});}
  function dartsTick(dt){for(let i=S3.darts.length-1;i>=0;i--){const D=S3.darts[i];D.t+=dt;const k=Math.min(1,D.t/0.3);D.f.position.lerpVectors(D.from,D.spot,k);D.f.lookAt(D.spot);
      if(k>=1&&!D.hit){D.hit=true;FX.sparks(D.spot.clone().add(new V3(0,0.3,0)),6,0xffb040);SFX.knock&&SFX.knock();for(const h of live()){if(hd(h.pos,D.spot)<1.3&&h.pos.y<1.4)hurt(h,D.spot);}}
      if(D.t>1.4){W.group.remove(D.f);S3.darts.splice(i,1);}}}
  // пике по красной полосе
  function diveStart(){const h=pick();const a=Math.atan2(h.pos.z-C.z,h.pos.x-C.x),P0=at(a+Math.PI,10.5,1.2),dir=new V3(h.pos.x-P0.x,0,h.pos.z-P0.z).normalize(),P1=P0.clone().addScaledVector(dir,20);P1.y=1.2;
    const d=(BS.half?1.1:1.3)+tell();FX2.lane(P0,P1,2.6,d,'red',0);SL.set(sol.k3,'dive','angry');SFX.blue&&SFX.blue();tone(500,0.9,'sawtooth',0.05,1400);S3.dive={t:0,d,P0,P1,hit:new Set(),from:null};S3.st='dive';}
  function diveTick(dt){const D=S3.dive;if(!D)return;D.t+=dt;const e=sol;
    if(D.t<D.d){if(!D.from)D.from=e.pos.clone();e.pos.lerpVectors(D.from,D.P0,smooth(Math.min(1,D.t/D.d)));e.face=faceTo(D.P0,D.P1);return;}
    const k=(D.t-D.d)/0.9;if(k<=1){e.pos.lerpVectors(D.P0,D.P1,k);if(!D.woosh){D.woosh=true;SFX.whoosh();}
      for(const h of live()){if(D.hit.has(h))continue;const ax=h.pos.x-D.P0.x,az=h.pos.z-D.P0.z,bx=D.P1.x-D.P0.x,bz=D.P1.z-D.P0.z;const u=clamp((ax*bx+az*bz)/(bx*bx+bz*bz),0,1);
        if(Math.hypot(ax-bx*u,az-bz*u)<1.3&&h.pos.y<1.8&&hd(h.pos,e.pos)<2.4){D.hit.add(h);hurt(h,e.pos.clone());}}return;}
    S3.dive=null;S3.ang=Math.atan2(e.pos.z-C.z,e.pos.x-C.x);const from=e.pos.clone();SL.set(e.k3,'fly');FX.anim(0.8,k2=>{if(F.phase!==3||S3.st!=='dive')return;e.pos.lerpVectors(from,orbit(S3.ang),smooth(k2));},()=>{if(F.phase===3&&S3.st==='dive')S3.st='fly';});}
  function clearStorm(){S3.snakes.forEach(S=>W.group.remove(S.g));S3.snakes.length=0;S3.darts.forEach(D=>W.group.remove(D.f));S3.darts.length=0;S3.dive=null;if(S3.lift){S3.lift.h.k3ride=null;S3.lift=null;}if(S3.ride){S3.ride.h.k3ride=null;S3.ride=null;}BELL.ring.visible=false;}
  /* ================= ЭТАП 4 «ПОЛНЫЙ СВИСТ» ================= */
  const S4={st:'off',t:0,voices:3,miss:0,inCur:1.6,acorns:[],real:0,trill:false};BS.s4=S4;const BIG=OAKS[3];
  const acorns=[0,1,2].map(i=>{const g=acornMesh(3.4);g.visible=false;W.group.add(g);const halo=new THREE.Mesh(new THREE.SphereGeometry(0.55,12,8),MB(COL.gold,{transparent:true,opacity:0,depthWrite:false}));g.add(halo);
    const A={i,g,halo,pos:new V3(),gone:0};A.mk={pos:A.pos,active:()=>F.phase===4&&S4.st==='inhale'&&A.gone<=0,onHit:()=>acornHit(A)};return A;});S4.acorns=acorns;
  const aim=markMesh(1.1);aim.visible=false;W.group.add(aim);
  const S4R=[R,10.2,8.6];
  function s4Start(){F.phase=4;S4.st='exhale';S4.t=0;S4.voices=3;S4.miss=0;BS.half=false;const e=sol;e.dazeT=0;e.state='idle';e.embers=e.maxEmb=1;e.setScale(2.3);for(let i=0;i<3;i++)SL.voice(e.k3,i,true);SL.hat(e.k3,true);
    placeSol(perchOf(BIG,true));SL.set(e.k3,'roar','angry');music('sol4');e.guardAll=()=>e.state!=='broken';e.guardText='высоко — рогаткой по жёлудю!';nestRadius(0,true);players.forEach(p=>{p.owlCd=0;});
    card('Этап 4 · Полный свист','выдох — за щит Потапа · вдох — Совиный взор и рогатка в золотой жёлудь',p=>p===0?'Выдох — ветер к краю: Потап, щит '+K(0,'guard')+' — все за тобой. Вдох — смени героя '+K(0,'swap')+':<br>Прошка, стреляй '+K(0,'skill')+', когда колечко прицела на золотом жёлуде!':
      'Вдох — у клюва три жёлудя: Совиный взор '+K(1,'skill')+' — настоящий засветится золотом, скажи Прошке!<br>Выдох — прячься за щит Потапа. Каждый верный выстрел выбивает Соловью голос.');
    later(3.4,()=>{if(F.phase===4)say('zven','Пелагея, Совиный взор включи — какой жёлудь настоящий?<br>Прошка, стреляй в золотой, в блестящий!',3.6,true);});}
  function nestRadius(n,instant){const r=S4R[n];W.clampR={x:C.x,z:C.z,r:r-0.7};const fly=(g,on)=>{if(instant){g.visible=on;g.position.y=0;g.scale.setScalar(1);return;}if(!on&&g.visible){FX.twigs(at(rand(0,6.28),r+1,0.5),14);
      FIN.k3fx.anim(1.6,k=>{g.position.y=-k*k*6;g.scale.setScalar(1+k*0.25);},()=>{g.visible=false;});for(let i=0;i<10;i++)later(i*0.08,()=>FX.twigs(at(rand(0,6.28),r+1.2,0.4),3,null));}};
    fly(NEST.rim,n<1);fly(NEST.outer,n<1);fly(NEST.mid,n<2);}
  function s4Tick(dt){const e=sol,src=BIG.src;placeSol(perchOf(BIG,true));e.face=faceTo(e.pos,C);
    if(S4.st==='exhale'){S4.t+=dt;const exDur=BS.half?4:3;FX.windSet('blow',1,src);F.tellHigh=0.3;if(e.k3.st.pose!=='whistle'&&e.k3.st.pose!=='roar')SL.set(e.k3,'whistle','angry');
      for(const h of live()){if(behindPotap(h,src)||(h===T.potap&&h.guard))continue;const dx=h.pos.x-src.x,dz=h.pos.z-src.z,d=Math.hypot(dx,dz)||1;const sp=h.guard?1.5:3.0;h.pos.x+=dx/d*sp*dt;h.pos.z+=dz/d*sp*dt;}
      if(!S4.trill&&S4.t>1.1){S4.trill=true;wave('low',src);}
      if(S4.t>=exDur){S4.st='inhale';S4.t=0;S4.trill=false;S4.inCur=Math.max(1.2,1.6+tell()*2-S4.miss*0.2);S4.real=Math.floor(Math.random()*3);acorns.forEach(A=>{A.gone=0;});SL.set(e.k3,'inhale','angry');FX.windSet('pull',0.5,src);
        tone(260,S4.inCur,'sine',0.08,700);players.forEach(p=>{p.owlCd=0;});}}   // во вдох Совиный взор всегда готов
    else if(S4.st==='inhale'){S4.t+=dt;FX.windSet('pull',0.5,src);for(const h of live()){const dx=src.x-h.pos.x,dz=src.z-h.pos.z,d=Math.hypot(dx,dz)||1;if(d>4){h.pos.x+=dx/d*1.3*dt;h.pos.z+=dz/d*1.3*dt;}}
      if(S4.t>=S4.inCur){S4.st='exhale';S4.t=0;acorns.forEach(A=>{A.g.visible=false;});aim.visible=false;floatText(e.pos.clone().add(new V3(0,e.L.top*e.s,0)),'ФЬЮ-У-У-УИТЬ!','#ffe08a');FX.cl.tear(1,1.4);shakeAll(0.04,0.4);}}
    // жёлуди у клюва
    const bp=beak(),spd=1.2+(3-S4.voices)*0.35,on=S4.st==='inhale',owl=W.owlT>0;
    acorns.forEach((A,i)=>{A.gone=Math.max(0,A.gone-dt);const a=G.time*spd+i*Math.PI*2/3,rr=1.2*e.s;A.pos.set(bp.x+Math.cos(a)*rr,bp.y+0.3+Math.sin(G.time*3+i)*0.2,bp.z+Math.sin(a)*rr*0.6+0.8);A.g.position.copy(A.pos);A.g.rotation.y+=dt*3;
      const real=i===S4.real;A.g.visible=on&&A.gone<=0;A.halo.material.color.setHex(real?COL.gold:0xa080ff);A.halo.material.opacity=on&&owl?(real?0.55+0.25*Math.sin(G.time*10):0.3):on&&real&&SOLO()?0.22+0.1*Math.sin(G.time*8):0;A.g.scale.setScalar(on&&owl&&!real?0.75:1);});
    {const pr=T.proshka;const A=on&&pr.active&&!players[0].downed?nearAcorn(pr):null;aim.visible=!!A;if(A){aim.position.copy(A.pos);aim.lookAt(camS.position);aim.scale.setScalar(1.1+0.15*Math.sin(G.time*10));}}}
  function nearAcorn(h){let best=null,bd=1e9;for(const A of acorns){if(!A.g.visible)continue;const d=A.pos.distanceTo(h.pos);if(d<bd){bd=d;best=A;}}return best;}
  function acornHit(A){const e=sol;if(S4.st!=='inhale')return;
    if(A.i!==S4.real){A.gone=9;A.g.visible=false;FX.sparks(A.pos.clone(),12,0xb08aff);SFX.miss();key(A.pos.clone().add(new V3(0,0.8,0)),'Пусто! Жёлудь-морок','#c8b0ff');S4.miss++;sayS('Хи-хи! Не тот, не тот!',1.6,'cocky');
      if(!BS.fakeTold){BS.fakeTold=1;tip(1,'Жёлудь был ненастоящий! Совиный взор '+K(1,'skill')+' — настоящий засветится золотом.',3.2);tip(0,'Прошка попал в ненастоящий! Жди, пока Пелагея посмотрит взором — и в золотой!',3.2);}return;}
    S4.st='exhale';S4.t=0;acorns.forEach(q=>{q.g.visible=false;});aim.visible=false;const i=3-S4.voices;S4.voices--;S4.miss=0;
    const tp=new V3();e.k3.voice[i].getWorldPosition(tp);SL.voice(e.k3,i,false);FX.feathers(tp,16,[SL.VOX[i],0xffffff]);FX.sparks(tp,14,SL.VOX[i]);tone(1800,0.5,'sine',0.22,3000);SFX.brk();shakeAll(0.06,0.5);
    key(solTop(),['Соловьиный голос выбит!','Звериный голос выбит!','Змеиный голос выбит!'][i],'#ffe08a');sayS(S4.voices?'Голосок… мой голосок!':'Ой… сдулся я…',2,'hurt','choke');
    const sc=[1.8,2.05][S4.voices-1];if(sc)FIN.k3fx.anim(0.8,k=>{e.setScale(lerp(e.s,sc,k));});if(S4.voices===1)BS.half=true;
    if(S4.voices>0){nestRadius(3-S4.voices);return;}
    // все три голоса — сдулся и падает
    S4.st='fall';FX.windSet('swirl',0);F.slow=1.2;SL.set(e.k3,'deflated','sad');FIN.k3fx.anim(1.2,k=>{e.setScale(lerp(1.8,1.4,k));});later(0.6,()=>{if(F.phase!==4)return;const to=at(BIG.a,6.6);
      tumble(to,1.2,()=>{if(F.phase!==4)return;F.phase=4.5;e.state='broken';e.t=0;e.bdur=999;e.embers=0;e.spin.visible=true;SL.set(e.k3,'deflated','sad');banner('Сдулся!','#ffd76a',2.2,'ударьте '+K(0,'attack')+' и '+K(1,'attack')+' разом — Богатырский мах');
        for(const p of[0,1])tip(p,'Соловей сдулся! Подбегите и ударьте '+K(p,'attack')+' ОБА РАЗОМ.',4);});});}
  /* ---------- шаг боя ---------- */
  function arenaCam(){const a=G.solo?active(G.soloPi):active(0),b=G.solo?a:active(1),mid=new V3((a.pos.x+b.pos.x)/2,0,(a.pos.z+b.pos.z)/2);let look,off;
    if(F.phase>=4&&F.phase<4.5){look=new V3(lerp(C.x,mid.x,0.25),5.6,C.z-3.5);off=new V3(0,8,27);}
    else if(F.phase>=3&&F.phase<4){look=new V3(lerp(C.x,mid.x,0.3),4.2,lerp(C.z,mid.z,0.25));off=new V3(0,9.5,20.5);}
    else if(F.phase>=4.5){look=new V3(lerp(C.x,mid.x,0.4),1.2,lerp(C.z-4,mid.z,0.4));off=new V3(0,7,15);}
    else{look=new V3(lerp(C.x,mid.x,0.3),3.6,lerp(C.z+1,mid.z,0.3));off=new V3(0,9,21);}
    off.multiplyScalar(1-0.18*BS.zoom);return {pos:look.clone().add(off),look,k:3};}
  W.skillHook=(pi,h)=>{
    if(h.kind==='yosha'&&F.phase===1&&S1.st==='perch'&&S1.inh&&!S1.inh.wet){if(h.skillCd>0)return true;const src=OAKS[S1.perch].src;if(hd(h.pos,src)<8.6){h.skillCd=0.8;h.atkT=0.28;S1.inh.wet=true;waterArc(h,beak());later(0.4,()=>{if(F.phase===1)choke();});return true;}
      key(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Ближе к дубу!','#9fe6ff');return false;}
    if(h.kind==='proshka'&&F.phase===4&&S4.st==='inhale'){if(h.skillCd>0)return true;const A=nearAcorn(h);if(!A)return false;h.skillCd=0.5;shootAcorn(h,A.mk);return true;}
    return false;};
  W.updates.push(dt=>{setBar();BS.zoom=Math.max(0,BS.zoom-dt*0.8);BS.signT=Math.max(0,BS.signT-dt);updateWaves(dt);if(SG.on&&!G.cine)songTick(dt);
    fl.t=Math.max(0,fl.t-dt);{const s=fl.t>0?[fl.txt,fl.bg]:stateSign();showSign(s&&s[0],s&&s[1]);}
    // небо по этапам
    {const tgt=F.phase>=5?BG5:F.phase>=4?BG4:F.phase>=3?BG3:F.phase>=2?BG1:BG0;scene.background.lerp(tgt,Math.min(1,dt*0.8));scene.fog.color.copy(scene.background);
      const nk=F.phase>=2&&F.phase<3?1:0;amb.intensity=damp(amb.intensity,nk?AMB0*0.4:AMB0,1.5,dt);sun.intensity=damp(sun.intensity,nk?SUN0*0.25:SUN0,1.5,dt);}
    // дубы: крен (поклон) и качание на ветру
    for(const O of OAKS){O.bend=damp(O.bend,O.tb,O.tb>O.bend?3:7,dt);O.pv.rotation.x=O.bend*0.72+Math.sin(G.time*1.3+O.i)*0.015*(1+(WIND.k||0)*3);}
    // синяя тень за Потапом
    {const P=T.potap;const src=F.phase===4?BIG.src:OAKS[S1.perch].src;const on=(F.phase===1||F.phase===4)&&P.active&&!players[0].downed&&((F.tellHigh||0)>0||waves.some(w=>w.kind==='high')||(F.phase===4&&S4.st==='exhale'));wedge.visible=on;
      if(on){wedge.position.set(P.pos.x,0,P.pos.z);wedge.rotation.y=Math.atan2(P.pos.x-src.x,P.pos.z-src.z);wedge.userData.m.material.opacity=P.guard?0.45:0.14+0.1*Math.sin(G.time*8);}}
    F.tellHigh=Math.max(0,(F.tellHigh||0)-dt);
    // одиночка: сменил героя, пока Потап держал щит, — оставленный Потап держит его и дальше
    if(SOLO()){const P=T.potap;if(active(G.soloPi)===P){BS.pHold=P.guard;}else if(BS.pHold&&F.phase>=1&&F.phase<=4){P.guard=true;}else BS.pHold=false;}
    if(cring.on){cring.t+=dt;const u=clamp(cring.t/1.3,0,1);ringM.forEach((m,pi)=>{const h=active(pi);m.visible=!(SOLO()&&pi!==G.soloPi);m.position.set(h.pos.x,h.pos.y+0.08,h.pos.z);m.scale.setScalar(lerp(2.2,0.5,u));m.material.color.setHex(u>0.85?0xffffff:COL.yellow);});if(cring.t>=1.3+0.25)ringStrike();}
    if(S1.bow){const p=sol.pos.clone(),O=S1.bow.O;tailHit.pos.set(lerp(p.x,O.x,0.12),1,lerp(p.z,O.z,0.12));}
    if(!sol||G.cine||F.out)return;const e=sol;e.dazeT=e.dazeT||0;
    if(F.phase>=1&&F.phase<4)winTick();
    if(F.phase===1)s1Tick(dt);else if(F.phase===2)s2Tick(dt);else if(F.phase===3)s3Tick(dt);else if(F.phase===4)s4Tick(dt);
    if(F.phase!==3&&F.phase!==4)FX.windSet(null,0);
    // эмоции по силе
    if(F.phase>=1&&F.phase<4&&!(e.dazeT>0)&&e.state!=='broken'){const k=e.embers/e.maxEmb;const st=e.k3.st;if(st.emo!=='surprise'&&st.emo!=='scared')st.emo=k>0.6?'cocky':k>0.3?'angry':'hurt';
      if(!BS.half&&k<=0.5){BS.half=true;secondWind();}}
    if(e.state==='broken'&&F.phase<4){SL.set(e.k3,'dazed','hurt');e.spin.visible=true;if(BS.brTold!==F.phase){BS.brTold=F.phase;key(solTop(),'Пробой! Добивай!','#fff2b0');}}
    // рассыпался — подсказка этапа; вдвоём рассыпались разом — этап сначала
    for(const p of[0,1]){if(players[p].downed&&BS.downTold!==F.phase+':'+p&&W.k3hint){BS.downTold=F.phase+':'+p;tip(p,W.k3hint(p),5);}}
    if(!SOLO()&&F.phase>=1&&F.phase<=4&&players[0].downed&&players[1].downed&&!BS.wiped){BS.wiped=true;stageRestart();}
    if(BS.wiped&&!players[0].downed&&!players[1].downed)BS.wiped=false;
    BS.idleT+=dt;if(BS.idleT>28){BS.idleT=0;for(const p of[0,1])tip(p,W.k3hint?W.k3hint(p):'',4);}});
  function secondWind(){shakeAll(0.05,0.5);if(F.phase===1){sayS('Ах так?! Ну, держитесь!',1.8,'angry');}else if(F.phase===2){sayS('Р-р-р! Все звери — ко мне!',1.8,'angry','roar');
      later(1.6,()=>{for(const p of[0,1])tip(p,p?'Поменяйтесь! Теперь светит первый игрок, а ты держи щит '+K(1,'guard')+' — зайчик поменьше, да тоже слепит.':'Поменяйтесь! Теперь ты зажги перо '+K(0,'item')+', а друг пусть держит щит.',4);});}
    else if(F.phase===3){sayS('Фью-у! Быстрее, выше!',1.6,'angry');later(1.4,()=>{for(const p of[0,1])tip(p,'Теперь в вихрь — другой! Кто катался — к колоколу.',3.4);});}}
  function stageRestart(){const e=sol;clearWaves();cring.on=false;ringM.forEach(m=>{m.visible=false;});banner('Этап сначала!','#cfe8ff',2.4,'отметка у входа — и снова в гнездо');sayS(line('tease'),1.8,'cocky','laugh');
    if(F.phase===1){S1.bow=null;S1.inh=null;S1.sw=null;OAKS.forEach(O=>{O.tb=0;});s1Start();}else if(F.phase===2){clearBeasts();s2Start();}else if(F.phase===3){clearStorm();s3Start();}else if(F.phase===4){s4Start();}}
  // ---------- карточка этапа: баннер + одна подсказка на игрока ----------
  function card(title,sub,tipFn){banner(title,'#d8b070',3,sub);BS.signT=3.9;W.k3hint=tipFn;BS.idleT=0;later(0.8,()=>{for(const p of[0,1])tip(p,tipFn(p),5.5);});}
  /* ---------- ролики ---------- */
  const play2=def=>{play(def);try{const cd=CINE.CD&&CINE.CD();if(cd&&cd.S===G.cine){cd.inserts=false;cd.cover=[];}}catch(err){}};
  function intro(){bb.style.display='block';W.gateOpen&&W.gateOpen();HEROES.forEach((h,i)=>{placeOnGround(h,-3.6+i*2.4,C.z+R-3,0);h.face=Math.PI;h.following=false;});if(!sol)spawnSol();sol.state='idle';const O=OAKS[3];
    placeSol(perchOf(O,true));SL.set(sol.k3,'idle','cocky');const top=perchOf(O,true);
    play2({dur:14,fov:50,camK:2.6,shots:[shot(0,[0,7,4],[0,8,-30]),shot(4.4,[5.5,7.6,-12.5],[0,9.2,-26.5]),shot(7.6,[0,3.4,-6],[0,6,-24],[0,2.6,-4],[0,5.4,-24],3),shot(11.2,[7,9,2],[0,2,-16])],
      says:[[0.3,4,null,'<i>Соловей-Разбойник на семи дубах сидит, свитых гнездом,</i><br><i>И свистит так, что облака рвутся кругом.</i>',true],[4.6,2.6,'solovei','Фью-у-ить! Кто там звенит, кто спать не даёт?'],[7.6,2.6,'solovei','А ну — сдуло! Прочь, народ!'],[10.6,2.8,'zven','На табличку над ним глядите — там написано, что делать!']],
      events:[{t:0.2,fn:()=>{SL.set(sol.k3,'sing','cocky');}},{t:4.4,fn:()=>{SL.set(sol.k3,'idle','cocky');sol.k3.st.look[0]=0.3;}},
        {t:6.2,fn:()=>{SL.set(sol.k3,'hop');}},{t:6.6,fn:()=>{const from=sol.pos.clone(),to=at(O.a,7.5);SL.set(sol.k3,'glide');FX.anim(1.0,k=>{sol.pos.lerpVectors(from,to,smooth(k));sol.pos.y=lerp(from.y,0,smooth(k))+Math.sin(k*Math.PI)*1.5;sol.face=faceTo(from,to);},()=>{sol.face=faceTo(sol.pos,C);SL.set(sol.k3,'roar','angry');SFX.thud();shakeAll(0.05,0.4);});}},
        {t:7.8,fn:()=>{SL.set(sol.k3,'whistle','angry');wave('big',at(O.a,7.5),{skip:HEROES});FX.cl.tear(1,2.2);OAKS.forEach((q,i)=>{q.tb=0.18;later(1.6,()=>{q.tb=0;});});FX.windSet('blow',1,at(O.a,7.5));later(2,()=>FX.windSet(null,0));HEROES.forEach(h=>{h.vel.z+=3;});}},
        {t:10.4,fn:()=>{SL.set(sol.k3,'hop');}},{t:10.8,fn:()=>{hopTo(O,false,()=>{});}}],
      end:()=>{if(!sol)spawnSol();clearWaves();HEROES.forEach((h,i)=>{placeOnGround(h,-3.6+i*2.4,C.z+7,0);h.face=Math.PI;h.following=false;});W.clampR={x:C.x,z:C.z,r:R-0.7};W.camFn=arenaCam;snapCams();FX.windSet(null,0);s1Start();}});}
  function scene2(){const e=sol;e.dazeT=0;e.state='idle';S1.st='off';S1.bow=null;S1.inh=null;S1.sw=null;OAKS.forEach(O=>{O.tb=0;});clearWaves();FX.nightOn(C);
    play2({dur:8,fov:50,shots:[shot(0,[4,3,-4],[0,2,-14]),shot(3.4,[0,9,0],[0,4,-26],[2,10,-2],[0,5,-26],4)],
      says:[[0.3,2.8,'solovei','А я вам солнышко — свистом погашу!'],[3.6,3.4,null,'<i>Соловей крикнул по-звериному — и солнце погасло. Из тьмы глядят глаза.</i>',true]],
      events:[{t:0.3,fn:()=>{SL.set(e.k3,'roar','angry');tone(140,1.4,'sawtooth',0.1,80);shakeAll(0.06,1);}},{t:1.4,fn:()=>{FX.nightSet(1);F.phase=2;}},{t:2.2,fn:()=>{hopTo(OAKS[3],false,()=>{});}}],
      end:()=>{s2Start();}});}
  function scene3(){const e=sol;e.dazeT=0;e.state='idle';S2.st='off';clearBeasts();SPOT.set(null,null,0);clearWaves();
    play2({dur:7,fov:52,shots:[shot(0,[0,3,-4],[0,4,-14]),shot(3,[9,6,-4],[0,7,-14],[7,8,-2],[0,8,-14],4)],
      says:[[0.3,2.4,'solovei','Ну держитесь — я в небо, ввысь!'],[3.2,3.2,null,'<i>Зашипел Соловей по-змеиному — и закрутился посреди гнезда вихрь.</i>',true]],
      events:[{t:0.3,fn:()=>{FX.nightSet(0);F.phase=3;SL.set(e.k3,'hiss','angry');}},{t:1.2,fn:()=>{SL.set(e.k3,'fly');const from=e.pos.clone();S3.ang=Math.atan2(from.z-C.z,from.x-C.x);anim(1.4,k=>{e.pos.lerpVectors(from,orbit(S3.ang),smooth(k));});}},
        {t:3,fn:()=>{FX.vortexOn(C);FX.vortexSet(1);FX.windSet('swirl',0.6);}}],
      end:()=>{s3Start();}});}
  function scene4(){const e=sol;e.dazeT=0;e.state='idle';clearStorm();S3.st='off';FX.vortexSet(0);
    play2({dur:9,fov:52,shots:[shot(0,[0,4,-2],[0,8,-26]),shot(4.2,[6,5,6],[0,10,-27],[4,4,8],[0,11,-27],4)],
      says:[[0.3,2.6,'solovei','А теперь — главный свист, держитесь!'],[3.4,3.6,null,'<i>Сел Соловей на самый высокий дуб — и раздулся втрое. Все три голоса — разом.</i>',true]],
      events:[{t:0.3,fn:()=>{SL.hat(e.k3,true);SL.set(e.k3,'fly');F.phase=4;const from=e.pos.clone();anim(1.6,k=>{e.pos.lerpVectors(from,perchOf(BIG,true),smooth(k));e.face=faceTo(e.pos,C);});}},
        {t:2.4,fn:()=>{SL.set(e.k3,'inhale','angry');FIN.k3fx.anim(2.2,k=>{e.setScale(lerp(1.5,2.3,smooth(k)));});tone(200,2,'sine',0.1,600);}},
        {t:5,fn:()=>{SL.set(e.k3,'roar','angry');FX.cl.tear(1,2);shakeAll(0.07,1.2);OAKS.forEach(q=>{q.tb=0.12;later(1.4,()=>{q.tb=0;});});}}],
      end:()=>{s4Start();}});}
  // Ctrl+Alt+B (late_95_dev.js): следующая стадия босса — для проверки и показа; вернуть true, если перешли
  W.bossNext=()=>{if(G.cine||F.won)return false;const p=F.phase;
    if(p===1){F.phase=1.5;later(0.4,scene2);return true;}if(p===2){F.phase=2.5;later(0.4,scene3);return true;}if(p===3){F.phase=3.5;later(0.4,scene4);return true;}
    if(p===4||p===4.5){win();return true;}return false;};
  function win(){F.won=true;F.phase=5;SFX.horn();banner('Богатырский мах!','#ffd76a',2,'вместе — вдвое сильней');G.stats.bogatyr++;F.slow=0.9;shakeAll(0.09,0.8);FX2.flash(1);try{CINE.moodFlash('#ffe08a',0.3,1.4);}catch(err){}
    FX.feathers(sol.pos.clone().add(new V3(0,1,0)),24);FX.down(sol.pos.clone().add(new V3(0,1,0)),30);later(1.4,ending);}
  function ending(){const e=sol,pe=T.pelageya;bb.style.display='none';FIN.music.play(null);F.phase=5;FX.windSet(null,0);clearWaves();acorns.forEach(q=>{q.g.visible=false;});aim.visible=false;
    play2({dur:13,fov:48,camK:2.4,shots:[shot(0,[e.pos.x+3.4,2.4,e.pos.z+4.6],[e.pos.x,1.6,e.pos.z]),shot(6.6,[pe.pos.x+2,1.6,pe.pos.z+2],[e.pos.x,1.6,e.pos.z])],
      says:[[0.3,3,null,'<i>Соловей садится и горло трёт.</i>',true],[3.4,3,'solovei','Я не хотел свистеть, не хотел…'],[6.6,3,'solovei','Я петь разучился — вот беда.'],[9.8,3,null,'<i>Пелагея к нему подходит и тихо запевает</i><br><i>Ту самую песню, что Сирин с Алконостом знают.</i>',true]],
      events:[{t:0,fn:()=>{e.harmless=true;e.state='idle';e.dazeT=0;e.spin.visible=false;e.setScale(1.4);SL.set(e.k3,'sit','sad');e.face=faceTo(e.pos,C);}},
        {t:9.8,fn:()=>{if(players[1].act!==0)doSwap(1);placeOnGround(pe,lerp(e.pos.x,C.x,0.3),lerp(e.pos.z,C.z,0.3)+1.2,0);pe.face=faceTo(pe.pos,e.pos);}}],
      end:()=>{startSong();}});}
  // песня с Соловьём: Пелагея прыгает в долю — Соловей подхватывает. Провалить нельзя
  const SG={on:false,t:0,k:-1,B:60/84,hits:0,judged:{}};W.song=null;
  function startSong(){SG.on=true;SG.t=-4*SG.B;SG.k=-5;SG.hits=0;SG.judged={};W.song={t:SG.t,B:SG.B,show:true,state:'play',pulse:0};banner('Подпой, Пелагея!','#d7a6ec',2.4,'прыгай '+K(1,'jump')+' в такт — Соловей подпоёт, подхватит');
    W.custom=(pi,h,dt,c)=>{for(const q of players[pi].heroes){q.vel.x=damp(q.vel.x,0,10,dt);q.vel.z=damp(q.vel.z,0,10,dt);}
      if(pi===1&&(tap(1,'jump')||SOLO()&&tap(G.soloPi,'jump'))&&h.grounded&&SG.on){h.vel.y=6.4;h.grounded=false;SFX.jump();const k=Math.round(rT(SG.t)/SG.B);if(k>=0&&k<8&&!SG.judged[k]){const d=rT(SG.t)-k*SG.B;const ok=Math.abs(d)<=(LADWIN[players[1].path]||0.1)+0.05+(W.ladBonus||0);SG.judged[k]=1;
        if(ok){SG.hits++;const m=BER[0][k][0];if(m)tone(mf(m+12),0.4,'sine',0.2);floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'В долю!','#e7c3ff');if(SG.hits>=3){const mm=BER[0][k][0];if(mm)tone(mf(mm),0.5,'triangle',0.16);}}
        else floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),d<0?'рано':'поздно','#dddddd');}}};}
  function songTick(dt){SG.t+=dt;W.song.t=SG.t;const k=Math.floor(SG.t/SG.B+1e-6);while(SG.k<k){SG.k++;const n=SG.k;if(n<0){tone(1760,0.06,'square',0.05);banner(['Раз','Два','Три','Четыре!'][n+4],'#ffe7a0',0.5);}
      else if(n<8){const l=BER[0][n];gusli(l[0]?l[0]-12:0,0,0.08);tone(mf(BER_BASS[n]),0.5,'sine',0.14);W.song.pulse=1;if(SG.hits>=3&&l[0])tone(mf(l[0]),0.5,'triangle',0.13);if(n===4&&SG.hits>=2){key(sol.pos.clone().add(new V3(0,3.4,0)),'Соловей подхватывает!','#ffe08a');SL.set(sol.k3,'sing','happy');}}}
    W.song.pulse=Math.max(0,(W.song.pulse||0)-dt*4);
    if(SG.t>8*SG.B+0.3){SG.on=false;W.custom=null;W.song=null;finale();}}
  function finale(){const e=sol;const D=W.k3daughters||[];
    play2({dur:16,fov:46,camK:2.4,shots:[shot(0,[e.pos.x+3,2.2,e.pos.z+4],[e.pos.x,2,e.pos.z]),shot(5.4,[0,9,4],[0,1,-16]),shot(10.4,[e.pos.x-2,2.4,e.pos.z+5],[e.pos.x,2.2,e.pos.z])],
      says:[[0.3,3.4,null,'<i>Соловей подхватывает. Голос у него — настоящий.</i>',true],[3.8,3,'solovei','Спасибо, маленькая. С тобою — поётся.'],[7,3.2,null,'<i>Перья голосов вернулись на хвост, гнездо снова сплелось, а дочки-соловушки подпевают.</i>',true],
        [10.4,3.2,null,'<i>Соловей звено выплёвывает — звенит, как колокольчик.</i>',true],[13.8,2,'zven','Третий виток цепи готов! Дзинь-дзинь!']],
      events:[{t:0.3,fn:()=>{SL.set(e.k3,'sing','happy');for(let r=0;r<2;r++)BER[0].concat(BER[2]).forEach((l,i)=>later(r*4.8+i*0.3,()=>{if(l[0]){tone(mf(l[0]),0.5,'triangle',0.16);tone(mf(l[0]+12),0.3,'sine',0.1);}}));}},
        {t:5.4,fn:()=>{for(let i=0;i<3;i++){SL.voice(e.k3,i,true);FX.sparks(e.pos.clone().add(new V3(0,1.5,0)),8,SL.VOX[i]);}SL.hat(e.k3,true);nestRadius(0,true);NEST.parts.forEach(g=>{g.scale.setScalar(0.96);FIN.k3fx.anim(1.2,k=>{g.scale.setScalar(0.96+0.04*k);});});
          D.forEach((d,i)=>{d.g.visible=true;d.g.position.copy(at(BIG.a+(i-1)*0.35,6.5,0));d.g.rotation.y=faceTo(d.g.position,e.pos);d.set('sing');});FX.cl.tear(0,0);}},
        {t:10.4,fn:()=>{const L=linkItem(e.pos.x,3,e.pos.z);const to=T.pelageya.pos.clone();anim(1.2,k=>{L.base=3+Math.sin(k*Math.PI)*2;L.pos.x=lerp(e.pos.x,to.x,k);L.pos.z=lerp(e.pos.z,to.z,k);});later(1.3,()=>takeItem(L,T.pelageya));}}],
      tick:(t,dt)=>{D.forEach(d=>d.tick(dt));},
      end:()=>{F.out=true;W.camFn=null;banner('Соловей снова поёт!','#ffd76a',2.4,'звенья мира — ваши · на Лукоморье праздник-пир');later(2.2,finishLevel);}});}
  /* ---------- подход «Прямоезжая дорожка» (late_99w) ---------- */
  const RD=FIN.k3road?FIN.k3road({C,R,intro,at,OAKS,gateCol}):null;
  /* ---------- рисунки кнопок ---------- */
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'jump',()=>headOf(h()),()=>waves.some(w=>(w.kind==='low'||w.kind==='dark')&&Math.abs(Math.hypot(h().pos.x-w.src.x,h().pos.z-w.src.z)-w.r)<3&&Math.hypot(h().pos.x-w.src.x,h().pos.z-w.src.z)>w.r),'');
    prompt(pi,'guard',()=>headOf(h()),()=>cring.on||(F.phase===1&&!!S1.sw&&S1.sw.h===h()),'');
    prompt(pi,'attack',()=>headOf(h()),()=>sol&&(sol.state==='broken'||(sol.dazeT>0&&(F.phase!==2||sol.litNow)))&&hd(sol.pos,h().pos)<4+sol.r,()=>F.phase===4.5?'разом!':'бей!');
    prompt(pi,'attack',()=>headOf(h()),()=>F.phase===1&&!!S1.bow&&S1.bow.k>=0.85&&hd(tailHit.pos,h().pos)<4,'за хвост!');
    prompt(pi,'attack',()=>new V3(BELL.x,2.6,BELL.z),()=>F.phase===3&&!!S3.ride&&!!S3.ride.loop&&S3.ride.h!==h()&&Math.hypot(h().pos.x-BELL.x,h().pos.z-BELL.z)<6,'на «БОМ»!');
    prompt(pi,'left',()=>headOf(h()),()=>F.phase===3&&!!S3.ride&&S3.ride.h===h()&&!!S3.ride.bank&&S3.ride.bank.dir<0,'наклонись!');
    prompt(pi,'right',()=>headOf(h()),()=>F.phase===3&&!!S3.ride&&S3.ride.h===h()&&!!S3.ride.bank&&S3.ride.bank.dir>0,'наклонись!');
    prompt(pi,'item',()=>headOf(h()),()=>F.phase===2&&!h().lit&&!HEROES.some(q=>heroLight(q))&&!G.cine,'свет!');
    prompt(pi,'guard',()=>headOf(h()),()=>F.phase===2&&S2.st==='perch'&&!h().guard&&!heroLight(h())&&HEROES.some(q=>q!==h()&&heroLight(q)&&hd(q.pos,h().pos)<3.4),'щит — зайчик!');
    prompt(pi,'item',()=>headOf(h()),()=>F.phase===2&&sol&&sol.dazeT>0&&!sol.litNow&&!heroLight(h())&&hd(sol.pos,h().pos)<7,'посвети!');}
  prompt(0,'guard',()=>headOf(T.potap),()=>(F.phase===1&&((F.tellHigh||0)>0)||F.phase===4&&S4.st==='exhale')&&T.potap.active&&!T.potap.guard,'широкий щит');
  prompt(0,'skill',()=>headOf(T.potap),()=>F.phase===3&&S3.st==='fly'&&!S3.ride&&!S3.lift&&T.potap.active&&HEROES.some(q=>q!==T.potap&&q.active&&hd(q.pos,T.potap.pos)<2.4)&&hd(T.potap.pos,C)<3,'подкинь в вихрь!');
  prompt(0,'skill',()=>headOf(T.proshka),()=>F.phase===4&&S4.st==='inhale'&&T.proshka.active,()=>W.owlT>0?'в золотой!':'в жёлудь');
  prompt(0,'swap',()=>headOf(T.potap),()=>F.phase===4&&S4.st==='inhale'&&T.potap.active,'Прошка — рогатка');
  prompt(0,'swap',()=>headOf(T.proshka),()=>F.phase===4&&S4.st==='exhale'&&S4.t>0.4&&T.proshka.active,'Потап — щит');
  prompt(1,'skill',()=>headOf(T.yosha),()=>F.phase===1&&!!S1.inh&&!S1.inh.wet&&T.yosha.active&&hd(T.yosha.pos,OAKS[S1.perch].src)<8.6,'в клюв!');
  prompt(1,'skill',()=>headOf(T.yosha),()=>F.phase===1&&!!S1.bow&&!S1.bow.wet&&!cring.on&&T.yosha.active&&hd(T.yosha.pos,S1.bow.O.root)<3.4,'полей корни!');
  prompt(1,'swap',()=>headOf(T.pelageya),()=>F.phase===1&&!!S1.inh&&T.pelageya.active,'Йоша — вода');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>(F.phase===4&&S4.st==='inhale'||F.phase===2&&S2.st==='perch')&&T.pelageya.active&&W.owlT<=0&&players[1].owlCd<=0,'совиный взор');
  prompt(1,'swap',()=>headOf(T.yosha),()=>F.phase===4&&S4.st==='inhale'&&T.yosha.active,'Пелагея — взор');
  prompt(1,'jump',()=>headOf(T.pelageya),()=>SG.on,'в такт');
  /* ---------- задачи ---------- */
  const OF=[O(()=>'Свист соловьиный: белая волна — прыгай, синяя — за щит Потапа. Щёки дует — Йоша, воду ему в клюв! Дуб кланяется — полей корни и дёрни за хвост.',()=>F.phase>=1.5,()=>[]),
    O(()=>'Крик звериный: ночь. Свет пера — щитом «зайчиком» в глаза Соловью. Упал — в свете пера бей. Тени тают в свете.',()=>F.phase>=2.5,()=>[]),
    O(()=>'Шип змеиный: в вихрь — и верхом на Соловья. Кренится — наклонись в другую сторону. Петля — в колокол на «БОМ».',()=>F.phase>=3.5,()=>[]),
    O(()=>'Полный свист: выдох — за щит Потапа, вдох — Совиный взор и рогатка в золотой жёлудь. Три голоса — и Богатырский мах.',()=>F.phase>=5,()=>[])];
  for(const pi of[0,1])W.objectives[pi]=[...(RD?RD.objectives.map(f=>f(pi)):[]),O('Гнездо Соловья…',()=>F.phase>=1,()=>[]),...OF,O(pi?()=>'Соловей петь разучился. Подпой ему: прыгай '+K(1,'jump')+' в такт, от души.':'Соловей петь разучился…',()=>false,()=>[])];
  W.spawns=RD?RD.spawns:[[new V3(-3,0,4),new V3(-5,0,5)],[new V3(3,0,4),new V3(5,0,5)]];W.startAct=[0,0];
  W.pauseLine='Прямоезжая дорожка: свист издалека — прячься за укрытия и щит Потапа. Гнездо: свист соловьиный (вода в клюв, дуб кланяется), крик звериный («солнечный зайчик»),<br>шип змеиный (вихрь и родео, колокол на «БОМ»), полный свист (выдох — за щит, вдох — золотой жёлудь). Потом Соловью подпеть.';
  W.onStart=()=>{later(0.4,()=>{if(F.warped)return;if(RD)RD.start();else intro();});};   // телепорт бота отменяет начало
  W.dbg3b=()=>({F,BS,S1,S2,S3,S4,sol,OAKS,BELL,NEST,acorns,waves,cring,RD,SPOT,tailHit,perchOf,choke,dazzle,hatOff,rideStart,throwOff,bellOk,s1Start,s2Start,s3Start,s4Start,intro,scene2,scene3,scene4,win,winStart,acornHit,bowStart});
  // для ботов: W.warp3b('boss'|'boss1'…'boss4'|участок подхода)
  W.warp3b=(where)=>{F.warped=true;if(where==='boss'){if(RD)RD.skip();intro();return W.dbg3b();}
    const m=/^boss([1-4])$/.exec(where);if(m){if(RD)RD.skip();const n=+m[1];if(W.gateOpen)W.gateOpen();W.camFn=arenaCam;bb.style.display='block';if(!sol)spawnSol();W.clampR={x:C.x,z:C.z,r:R-0.7};
      HEROES.forEach((h,i)=>{placeOnGround(h,-3.6+i*2.4,C.z+7,0);h.face=Math.PI;h.following=false;h.k3ride=null;});for(const pi of[0,1])players[pi].cp.set(C.x,0,C.z+8);snapCams();clearWaves();
      if(n===1)s1Start();else if(n===2){FX.nightOn(C);FX.nightSet(1);placeSol(perchOf(OAKS[3]));s2Start();}else if(n===3){placeSol(orbit(0));FX.nightSet(0);s3Start();}else{FX.vortexSet(0);s4Start();}return W.dbg3b();}
    if(RD)RD.warp(where);return W.dbg3b();};
  flushDecor();flushPuffs();};
// замедление (удар запала, падение Соловья, общий мах): W.flags.slow — сколько ещё секунд
{const _st=step;step=function(dt){if(W&&W.levelId==='3-B'&&W.flags&&W.flags.slow>0&&!G.cine){W.flags.slow-=dt;dt*=0.35;}_st(dt);};}
