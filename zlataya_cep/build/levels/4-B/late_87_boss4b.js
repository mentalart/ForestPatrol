/* ============================== РЕЛИЗ final04 · 4-Б «ЗМЕЙ ГОРЫНЫЧ»: обучающие ролики по этапам и живые подсказки ============================== */
// После вступления и после каждой смены фазы — интерактивный ролик: крупные карточки «что делать», камера на нужной голове,
// шаг ждёт, пока игрок нажмёт показанную кнопку (герой тут же показывает приём: щит, удар, кувырок, рогатка, живая вода…).
// Нажал — «Отбил!», «ПРОБОЙ!»; не нажал за 8 с — ролик показывает сам. Пропуск — как у всех роликов (оба держат прыжок).
// В бою — живые подсказки: по событию (жёлудь над средней, сытая голова, огонь, одна голова уже в Пробое, проснулась, узда)
// и по времени без успехов; стрелка над целью, мигающая кнопка, «✓ Молодец!» на правильное нажатие.
// Логику боя модуль не меняет: во время роликов головы не нападают, после — всё возвращается как было.
const L4=FIN.lesson;
const T4={auto:true,props:[],arrows:[],ph:-1,h:null,get on(){return L4.on;},set on(v){L4.on=v;},get card(){return L4.card;},get hint(){return L4.hint;}};FIN.boss4b=T4;   // on/card/hint — в общем шаблоне урока (late_79e_lesson.js)   // auto=false — без обучающих роликов (боты, меряющие вступление)
const t4Heads=()=>W.enemies.filter(e=>e.kind==='golova').sort((a,b)=>a.idx-b.idx);
const t4P=h=>h.pos.clone();
const T4SPOT=new V3(0,1.4,-12.6);
const t4Dom=()=>L4.dom();
// ---------- значки ----------
const T4I=Object.assign(L4.icons,{
  heads:'<svg viewBox="0 0 64 64"><g stroke="#1e3a14" stroke-width="2.5"><path d="M10 50 Q14 30 20 26" fill="none" stroke="#4a8a3a" stroke-width="7"/><path d="M32 52 V24" fill="none" stroke="#4a8a3a" stroke-width="7"/><path d="M54 50 Q50 30 44 26" fill="none" stroke="#4a8a3a" stroke-width="7"/>'+
    '<ellipse cx="18" cy="22" rx="9" ry="8" fill="#6ab04c"/><ellipse cx="32" cy="16" rx="9" ry="8" fill="#6ab04c"/><ellipse cx="46" cy="22" rx="9" ry="8" fill="#6ab04c"/></g>'+
    '<circle cx="18" cy="10" r="4" fill="none" stroke="#ffd23a" stroke-width="2.5"/><path d="M29 3 q3 4 6 0" stroke="#5ab8ff" stroke-width="2.5" fill="none"/><path d="M42 11 l2 -5 l2 5 l2 -5" stroke="#ff5a4a" stroke-width="2.2" fill="none"/></svg>',
  yellow:'<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="20" fill="none" stroke="#ffd23a" stroke-width="8"/><circle cx="32" cy="32" r="8" fill="#ffd23a"/></svg>',
  red:'<svg viewBox="0 0 64 64"><path d="M8 44 L18 18 L28 40 L38 16 L48 40 L56 20" fill="none" stroke="#ff5a4a" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  blue:'<svg viewBox="0 0 64 64"><path d="M32 8 C42 24 48 31 48 40 A16 16 0 0 1 16 40 C16 31 22 24 32 8Z" fill="#5ab8ff" stroke="#1a4a8a" stroke-width="3"/></svg>',
  shield:'<svg viewBox="0 0 64 64"><path d="M32 6 L54 14 V30 C54 44 44 54 32 58 C20 54 10 44 10 30 V14Z" fill="#ffd76a" stroke="#7a4a10" stroke-width="3"/><path d="M32 14 V50 M18 28 H46" stroke="#7a4a10" stroke-width="3"/></svg>',
  hit:'<svg viewBox="0 0 64 64"><path d="M32 4 L38 24 L58 22 L42 34 L52 54 L32 42 L12 54 L22 34 L6 22 L26 24Z" fill="#fff2b0" stroke="#c88a10" stroke-width="3" stroke-linejoin="round"/></svg>',
  roll:'<svg viewBox="0 0 64 64"><path d="M48 22 A18 18 0 1 0 50 38" fill="none" stroke="#7ad8ff" stroke-width="7" stroke-linecap="round"/><path d="M40 20 L50 22 L50 10" fill="none" stroke="#7ad8ff" stroke-width="6" stroke-linejoin="round"/></svg>',
  clock:'<svg viewBox="0 0 64 64"><circle cx="32" cy="34" r="22" fill="#fff6e0" stroke="#7a4a10" stroke-width="3"/><path d="M32 34 L32 18 M32 34 L44 40" stroke="#7a4a10" stroke-width="4" stroke-linecap="round"/><text x="32" y="60" font-size="0">6</text><rect x="26" y="4" width="12" height="6" rx="2" fill="#7a4a10"/></svg>',
  acorn:'<svg viewBox="0 0 64 64"><ellipse cx="32" cy="38" rx="14" ry="17" fill="#e8a84a" stroke="#6a3a10" stroke-width="3"/><path d="M14 30 Q32 10 50 30Z" fill="#8a5a2a" stroke="#6a3a10" stroke-width="3"/><path d="M32 8 V16" stroke="#6a3a10" stroke-width="4"/></svg>',
  fire:'<svg viewBox="0 0 64 64"><path d="M32 6 C38 20 50 24 48 40 A16 16 0 0 1 16 40 C14 28 26 24 24 12 C30 18 32 14 32 6Z" fill="#ff8a3a" stroke="#a2300a" stroke-width="3"/><path d="M32 30 C36 38 40 40 38 46 A6 6 0 0 1 26 46 C26 40 32 38 32 30Z" fill="#ffe08a"/></svg>',
  drop:'<svg viewBox="0 0 64 64"><path d="M32 6 C42 22 50 30 50 40 A18 18 0 0 1 14 40 C14 30 22 22 32 6Z" fill="#7ad8ff" stroke="#1a5a8a" stroke-width="3"/><path d="M24 40 A8 8 0 0 0 30 48" stroke="#fff" stroke-width="3" fill="none"/></svg>',
  eye:'<svg viewBox="0 0 64 64"><path d="M4 32 Q32 6 60 32 Q32 58 4 32Z" fill="#f4e8ff" stroke="#6a3a8a" stroke-width="3"/><circle cx="32" cy="32" r="11" fill="#b67ccc"/><circle cx="32" cy="32" r="5" fill="#2a1a3a"/><circle cx="36" cy="28" r="2.5" fill="#fff"/></svg>',
  tongs:'<svg viewBox="0 0 64 64"><path d="M14 58 L30 26 M50 58 L34 26" stroke="#5a6070" stroke-width="7" stroke-linecap="round"/><circle cx="32" cy="24" r="5" fill="#5a6070"/><path d="M24 16 Q32 2 40 16" stroke="#ff8a3a" stroke-width="6" fill="none" stroke-linecap="round"/></svg>',
  ring:'<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="20" fill="none" stroke="#ffd76a" stroke-width="7"/><circle cx="32" cy="32" r="28" fill="none" stroke="#ffd76a" stroke-width="2" stroke-dasharray="4 5"/></svg>',
  n123:'<svg viewBox="0 0 64 64"><circle cx="14" cy="32" r="11" fill="#ffd76a"/><circle cx="32" cy="32" r="11" fill="#ffb070"/><circle cx="50" cy="32" r="11" fill="#ff8a6a"/><g font-family="system-ui" font-weight="900" font-size="14" text-anchor="middle" fill="#3a2410"><text x="14" y="37">1</text><text x="32" y="37">2</text><text x="50" y="37">3</text></g></svg>',
  go:'<svg viewBox="0 0 64 64"><path d="M10 32 H44 M32 16 L50 32 L32 48" stroke="#9ff0a8" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'});
const t4Keys=(k,g)=>L4.keys(k,g),t4Card=(c,g,st)=>L4.show(c,g,st);
// ---------- реквизит роликов и подсказок ----------
function t4Prop(o){o.userData.noBatch=true;o.userData.dress=true;o.traverse(q=>{q.userData.noBatch=true;q.userData.sty=true;q.castShadow=false;});W.group.add(o);T4.props.push(o);return o;}
function t4Clear(){for(const o of T4.props)if(o.parent)o.parent.remove(o);T4.props.length=0;}
function t4Ring(col,r){const g=new THREE.Group();const m=new THREE.Mesh(new FIN.orig.Torus(r||0.9,0.1,6,32),MB(col,{transparent:true,opacity:0.95,depthTest:false,fog:false}));m.renderOrder=9;g.add(m);return g;}
function t4Arrow(col){const g=new THREE.Group(),mt=MB(col,{transparent:true,opacity:0.95,depthTest:false,fog:false});const c=new THREE.Mesh(new FIN.orig.Cone(0.42,0.8,4),mt);c.rotation.x=Math.PI;c.renderOrder=10;g.add(c);
  const r=new THREE.Mesh(new FIN.orig.Torus(0.5,0.07,5,20),mt);r.rotation.x=Math.PI/2;r.position.y=0.62;r.renderOrder=10;g.add(r);g.userData.mat=mt;return g;}
const t4HeadTop=e=>{const p=new V3();(e.L&&e.L.head?e.L.head:e.g).getWorldPosition(p);return p;};
const t4Tap=(pi,a)=>L4.tap(pi,a);
function t4Broken(e,on){if(on){e.state='broken';e.t=0;e.bdur=99;e._b=true;}else{e.state='idle';e.t=0;e._b=false;e.embers=e.maxEmb||4;}}
// ---------- ролик этапа: движок — общий шаблон урока FIN.lesson.run (late_79e_lesson.js); здесь — головы Змея на время ролика ----------
const T4HOOK={begin:()=>{t4Heads().forEach(e=>{e._cd4=e.cd;e.cd=99;});},cleanup:()=>{t4Clear();if(T4.h){T4.h.prog=G.time;T4.h.grace=G.time+3;}t4Heads().forEach(e=>{e.cd=e._cd4!=null&&e._cd4<50?e._cd4:1.5;});}};
const t4Run=(steps,opt)=>L4.run(steps,Object.assign({},T4HOOK,opt));
// общие кадры
const C4={wide:[[0,7.8,10],[0,2.4,-9.5]],L:[[-9.8,3.4,-1.6],[-5.4,2.6,-9.6]],R:[[9.8,3.4,-1.6],[5.4,2.6,-9.6]],M:[[1.5,3.2,-2.6],[0,2.7,-10.8]],
  team:[[-1,2.6,5.5],[0,1.2,-3]],bridle:[[-2.2,3.1,6.2],[-6.6,0.9,2.4]],spot:[[3.2,3.2,-5.6],[0,1.6,-12.6]]};
const t4S=(k,dur,card,o)=>Object.assign({dur,p:C4[k][0],l:C4[k][1],card},o||{});
// ракурс без помех: первый из кандидатов, откуда цель видна (камни и скалы арены не загораживают)
function t4View(tg,cands,skip){const T=new V3(tg[0],tg[1],tg[2]);for(const c of cands){const P=new V3(c[0],c[1],c[2]),d=P.clone().sub(T),L=d.length();d.normalize();
    const o=T.clone().addScaledVector(d,skip||0.9);if(clearDist(o,d,L-(skip||0.9))>=L-(skip||0.9)-0.3)return {p:c,l:tg};}return {p:cands[0],l:tg};}
// ---------- этап 1: три запала ----------
function t4Stage1(){const H=t4Heads(),L=H[0],Mi=H[1],R=H[2];if(!L||!R)return;const a0=()=>active(0),a1=()=>active(1);let sigL=null,sigR=null;
  t4Run([
    t4S('wide',4.2,{tag:'Как победить',title:'Этап 1 из 3 · Три запала',icon:'heads',text:'У каждой головы — свой «запал». Оглушите <b>левую</b> и <b>правую</b> <b>разом</b> —<br>Горыныч ослабнет. Глядите, как это делается, — сразу!'},
      {enter:()=>{sayP('Как его одолеть! Глядите!',2.6);}}),
    t4S('L',9,{tag:'Игрок 1 · левая голова',title:'Сонная голова — жёлтый кружок, медленный удар',icon:'yellow',text:'Над головой <b>жёлтый кружок</b> — бьёт она медленно, как во сне.<br>Подними <b>щит</b> — и отбей удар, как по весне!',keys:[{pi:0,a:'guard',label:'щит',wait:true}],go:'Нажми щит!',okText:'Отбил!'},
      {wait:{who:0,a:'guard'},at:1.2,enter:()=>{sigL=t4Prop(t4Ring(0xffd23a,0.55));},update:(s,u)=>{if(sigL){const p=t4HeadTop(L);sigL.position.copy(p).add(new V3(0,0.95,0));sigL.lookAt(camS.position);sigL.scale.setScalar(1+0.25*Math.sin(G.time*6));}},
       done:()=>{a0()._demoGuard=G.time+0.9;SFX.parry();const p=t4HeadTop(L);FX.sparks(p.clone().add(new V3(1,0,1.4)),14);floatText(p.clone().add(new V3(0,1.6,0)),'Отбил!','#ffe08a');if(sigL)sigL.visible=false;CINE.punch(-2);}}),
    t4S('L',7,{tag:'Игрок 1 · левая голова',title:'Теперь бей!',icon:'hit',text:'Удар отбит — голова открыта. <b>Бей</b>, пока не опомнилась, скорей!',keys:[{pi:0,a:'attack',label:'удар',wait:true}],go:'Бей!',okText:'ПРОБОЙ!'},
      {wait:{who:0,a:'attack'},at:0.6,cut:false,done:()=>{a0().atkT=0.28;SFX.brk();const p=t4HeadTop(L);FX.stars(p,12);t4Broken(L,true);floatText(p.clone().add(new V3(0,1.8,0)),'ПРОБОЙ!','#fff2b0');CINE.hitstop&&CINE.hitstop(4);}}),
    t4S('R',9,{tag:'Игрок 2 · правая голова',title:'Голодная голова — красный зубец, хватка',icon:'red',text:'<b>Красный зубец</b> — это хватка, щит не спасёт! <b>Кувыркнись</b> вбок — и вперёд.',keys:[{pi:1,a:'roll',label:'кувырок',wait:true}],go:'Кувырок!',okText:'Увернулся!'},
      {wait:{who:1,a:'roll'},at:1.2,enter:()=>{sigR=t4Prop(t4Ring(0xff5a4a,0.55));},update:(s,u)=>{if(sigR){const p=t4HeadTop(R);sigR.position.copy(p).add(new V3(0,0.95,0));sigR.lookAt(camS.position);sigR.scale.setScalar(1+0.25*Math.sin(G.time*9));}},
       done:()=>{const h=a1();if(h.grounded)h.vel.y=5.5;FX.dust(t4P(h),10);SFX.swish();floatText(t4P(h).add(new V3(0,2,0)),'Увернулся!','#9fe0ff');if(sigR)sigR.visible=false;}}),
    t4S('R',7,{tag:'Игрок 2 · правая голова',title:'Бей сбоку!',icon:'hit',text:'Промахнулась, бок открыла — <b>бей</b>!',keys:[{pi:1,a:'attack',label:'удар',wait:true}],go:'Бей!',okText:'ПРОБОЙ!'},
      {wait:{who:1,a:'attack'},at:0.6,cut:false,done:()=>{a1().atkT=0.28;SFX.brk();const p=t4HeadTop(R);FX.stars(p,12);t4Broken(R,true);floatText(p.clone().add(new V3(0,1.8,0)),'ПРОБОЙ!','#fff2b0');}}),
    t4S('wide',5.2,{tag:'Главное',title:'Вместе — за двенадцать секунд!',icon:'clock',text:'Оглушённая голова спит <b>двенадцать секунд</b>. Одну оглушили — проснётся опять.<br>Бейте <b>левую и правую вместе</b> — чтоб обе в Пробое разом стоять!'},
      {enter:()=>{for(const e of[L,R]){const r=t4Prop(t4Ring(0xfff2b0,0.8));r.userData.e=e;}},update:(s,u)=>{for(const o of T4.props)if(o.userData.e){const p=t4HeadTop(o.userData.e);o.position.copy(p).add(new V3(0,1.2,0));o.lookAt(camS.position);o.scale.setScalar(Math.max(0.05,1-u/5));}}}),
    t4S('M',4.4,{tag:'А средняя?',title:'Средняя синим плюётся',icon:'blue',text:'Синие капли <b>щитом отбивай</b>. Среднюю на следующем этапе оглушим, так и знай.'}),
    t4S('team',2.6,{tag:'Вперёд!',title:'Теперь — по-настоящему!',icon:'go',text:'Подсказки будут рядом. Удачи вам, богатыри!'},{enter:()=>{FX.confettiCam(30);SFX.ok();}})],
    {end:()=>{t4Broken(L,false);t4Broken(R,false);t4SeenSet(1);}});}
// ---------- этап 2: вдох — три коротких урока (≤ 25 с, одна механика), каждый перед тем, как механика понадобится ----------
//  1) жёлудь Прошки в среднюю — при входе в этап; 2) щит Потапа от огня и вода Йоши сытой голове — при первом огне/сытой голове;
//  3) большой вдох и Совиный взор — перед первым большим вдохом (или позже, если вдоха давно не было). Метки: G.flags.tut4b2 = {1,2,3}.
function t4Stage2(k){k=k||1;const H=t4Heads(),L=H[0],Mi=H[1],R=H[2];if(!Mi)return;const P=HERO.proshka,Po=HERO.potap,Y=HERO.yosha,Pe=HERO.pelageya;let ac=null,fb=null,glow=null;
  const who=(h,pi,sw)=>h.active?'':' (переключись '+K(pi,'swap')+')';
  const S2={1:[
    t4S('M',8,{tag:'Прошка',title:'Стреляй в жёлудь',icon:'acorn',text:'Стреляй из <b>рогатки</b>'+who(P,0)+' в жёлудь над средней головой!',keys:[{pi:0,a:'skill',label:'рогатка',wait:true}],go:'Стреляй!',okText:'Кха-кха! ПРОБОЙ!'},
      {wait:{timeout:5,who:0,a:'skill'},at:1.2,enter:()=>{sayP('Каждому — своё дело, своя стезя!',2);ac=t4Prop(new THREE.Group());const a=acornMesh(2.4);ac.add(a);const r=t4Ring(0xffd76a,0.45);ac.add(r);},
       update:()=>{if(ac&&ac.visible){const p=t4HeadTop(Mi);ac.position.copy(p).add(new V3(0,0.3,1.1));ac.children[1].lookAt(camS.position);ac.scale.setScalar(1+0.15*Math.sin(G.time*10));}},
       done:()=>{P._skT=G.time;SFX.thwip&&SFX.thwip();const a=acornMesh(1.4);t4Prop(a);const from=t4P(P).add(new V3(0,1,0)),to=ac.position.clone();anim(0.35,k=>{a.position.lerpVectors(from,to,k);a.position.y+=Math.sin(k*Math.PI)*0.8;if(k>=1){a.visible=false;ac.visible=false;FX.stars(to,10);SFX.brk();t4Broken(Mi,true);floatText(to.clone().add(new V3(0,1,0)),'Кха-кха! ПРОБОЙ!','#ffe08a');}});}})
  ],2:[
    t4S('team',7,{tag:'Потап',title:'Огонь — щит Потапа',icon:'shield',text:'Подними <b>широкий щит</b>'+who(Po,0)+' — он закроет всех.',keys:[{pi:0,a:'guard',label:'широкий щит',wait:true}],go:'Щит!',okText:'Отбил!'},
      {wait:{timeout:5,who:0,a:'guard'},at:1.4,enter:()=>{fb=t4Prop(new THREE.Mesh(new FIN.orig.Icosa(0.35,1),MB(0x6ad0ff,{transparent:true,opacity:0.95})));fb.position.copy(t4HeadTop(Mi));},
       update:(s,u,dt)=>{if(fb&&fb.visible){const tg=t4P(Po).add(new V3(0,1.1,0.9)),d=tg.clone().sub(fb.position),L2=d.length();if(L2>1.6)fb.position.addScaledVector(d.normalize(),Math.min(L2-1.6,dt*9));fb.rotation.y+=dt*6;fb.scale.setScalar(1+0.2*Math.sin(G.time*12));}},
       done:()=>{Po._demoGuard=G.time+1;SFX.shield();if(fb){FX.sparks(fb.position,16,0x9fe0ff);fb.visible=false;}floatText(t4P(Po).add(new V3(0,2.4,0)),'Отбил!','#9fe0ff');}}),
    t4S('R',7,{tag:'Йоша',title:'Сытая голова светится',icon:'drop',text:'Полей её <b>живой водой</b>'+who(Y,1)+'!',keys:[{pi:1,a:'skill',label:'живая вода',wait:true}],go:'Полей!',okText:'Потушил!'},
      {wait:{timeout:5,who:1,a:'skill'},at:1.2,enter:()=>{glow=t4Prop(t4Ring(0xff9a3a,1.1));},update:()=>{if(glow&&glow.visible){const p=t4HeadTop(R);glow.position.copy(p);glow.lookAt(camS.position);glow.scale.setScalar(1+0.12*Math.sin(G.time*8));}},
       done:()=>{Y._skT=G.time;SFX.water&&SFX.water();const p=t4HeadTop(R);FX.drops(p,16);FX.dust(p,8,0xdfe8ee);if(glow)glow.visible=false;t4Broken(R,true);floatText(p.clone().add(new V3(0,1.6,0)),'Потушил! ПРОБОЙ!','#9fe0ff');}}),
  ],3:[
    t4S('M',7,{tag:'Все',title:'Вдох тянет к пасти',icon:'shield',text:'Держите <b>щит</b> — тянет слабее.',keys:[{pi:0,a:'guard',label:'щит',wait:true},{pi:1,a:'guard',label:'щит',wait:true}],go:'Щит!',okText:'Устояли!'},
      {wait:{timeout:5,who:'both',a:'guard'},at:1.6,enter:()=>{if(FIN.gor4)FIN.gor4.demoT=8;},done:()=>{for(const pi of[0,1]){const h=active(pi);h._demoGuard=G.time+1.2;}SFX.shield();if(FIN.gor4)FIN.gor4.demoT=1.6;}}),
    t4S('L',7,{tag:'Пелагея',title:'Совиный взор',icon:'eye',text:'Включи <b>взор</b>'+who(Pe,1)+' — и ударь по чешуйке!',keys:[{pi:1,a:'skill',label:'Совиный взор',wait:true}],go:'Взор!',okText:'Слабое место — бей!'},
      {wait:{timeout:5,who:1,a:'skill'},at:1,done:()=>{Pe._skT=G.time;if(FIN.gor4&&FIN.gor4.weakDemo)FIN.gor4.weakDemo(L,Pe);else{const p=t4HeadTop(L);FX.sparkle(p,14,0xe7c3ff);t4Broken(L,true);}}}),
  ]};
  t4Run(S2[k]||S2[1],{end:()=>{t4Heads().forEach(e=>{t4Broken(e,false);});t4Mark2(k);}});}
const t4Mark2=k=>{G.flags.tut4b2=G.flags.tut4b2||{};G.flags.tut4b2[k]=true;t4SeenSet(2);if(T4.h)T4.h.t2b=T4.h.t2||0;},t4Seen2=k=>!!(G.flags.tut4b2&&G.flags.tut4b2[k]);
// ---------- этап 3: узда ----------
function t4Stage3(){const gr=W.grabs[0];if(!gr)return;const bp=gr.pos(),saved=bp.clone();let ring=null;
  // герои показывают сами: подходят к узде с двух сторон и несут её к шее; в конце (на склейке) — обратно на свои места
  const A=[active(0),active(1)],home=A.map(h=>({p:h.pos.clone(),f:h.face}));
  const walk=(to,dur,look)=>A.forEach((h,i)=>{const f=h.pos.clone(),t=to(i);anim(dur,k=>{const q=smooth(k);h.pos.x=f.x+(t.x-f.x)*q;h.pos.z=f.z+(t.z-f.z)*q;h.face=Math.atan2(look.x-h.pos.x,look.z-h.pos.z);});});
  const restore=()=>A.forEach((h,i)=>{placeOnGround(h,home[i].p.x,home[i].p.z,home[i].p.y);h.face=home[i].f;});
  const vB=t4View([saved.x,1.7,saved.z],[[-5.6,3.3,-3.4],[-2.2,3.1,6.2],[-6.4,3,9],[-11.8,3.2,5.4],[-2.6,3.4,0.2],[-11,3.4,-0.6]]),
        vS=t4View([0,1.5,-12],[[3.4,4.4,-5.2],[-3.4,4.4,-5.2],[0,5.2,-4.6],[5,3.8,-8],[-5,3.8,-8]],1.6);
  t4Run([
    t4S('wide',4,{tag:'Как победить',title:'Этап 3 из 3 · Узда',icon:'ring',text:'Головы без сил! Наденьте на Змея <b>волшебную узду</b>.<br>Горяча она — лишь <b>клещами</b>, и лишь <b>вдвоём</b>, на ходу.'},{enter:()=>{sayP('Кузьма сказал: клещами возьмёте — не рукой!',2.4);}}),
    t4S('bridle',9,{tag:'Оба игрока',title:'Возьмите узду',icon:'tongs',text:'К узде с <b>двух сторон</b> подойдите — и <b>клещами</b> её возьмите.',keys:[{pi:0,a:'item',label:'клещи',wait:true},{pi:1,a:'item',label:'клещи',wait:true}],go:'Берите вдвоём!',okText:'Взяли!'},
      {p:vB.p,l:vB.l,wait:{who:'both',a:'item'},at:1.6,enter:()=>{walk(i=>new V3(saved.x+(i?1.2:-1.1),0,saved.z+(i?0.3:-0.8)),1.4,saved);},each:(s,pi)=>{FX.sparks(bp.clone().add(new V3(0,0.5,0)),8);floatText(t4P(active(pi)).add(new V3(0,2,0)),'Взял!','#ffb070');},
       done:()=>{const f=bp.clone();anim(0.8,k=>{bp.y=f.y+smooth(k)*1.3;});}}),
    t4S('spot',5,{tag:'Несите к шее',title:'Кольцо на шее светится',icon:'ring',text:'Несите узду <b>вдвоём</b> к золотому ореолу на шее Змея — к кругу на полу.<br>Не расходитесь далеко — уроните, жалея!'},
      {p:vS.p,l:vS.l,enter:()=>{if(!FIN.uzda){ring=t4Prop(t4Ring(0xffd76a,0.95));ring.position.copy(T4SPOT);}   // с late_37 место показывает золотой ореол
         const f=bp.clone(),to=new V3(T4SPOT.x,1.9,T4SPOT.z+1.8);anim(2.6,k=>{const q=smooth(k);bp.lerpVectors(f,to,q);bp.y+=Math.sin(q*Math.PI)*0.4;});
         walk(i=>new V3(T4SPOT.x+(i?0.95:-0.95),0,T4SPOT.z+1.8),2.6,T4SPOT);},update:()=>{if(ring){ring.rotation.y+=0.03;ring.scale.setScalar(1+0.12*Math.sin(G.time*6));}}}),
    // «раз-два-три» (late_37): три счёта, на каждый — умение обоих; огоньки над ореолом зажигаются, узда поднимается к шее
    ...[0,1,2].map(k=>t4S('spot',k<2?4.5:7,{tag:'Оба игрока',title:'«Раз-два-три»: '+['раз…','два…','ТРИ!'][k],icon:'n123',text:'Узда у шеи — <b>умение</b> нажмите <b>трижды</b>, <b>оба</b> — на каждый счёт: на «раз», на «два», на «три»!',keys:[{pi:0,a:'skill',label:'',wait:true},{pi:1,a:'skill',label:'',wait:true}],go:['Раз!','Два!','Три!'][k],okText:['Раз!','Два!','Узда на Змее!'][k]},
      {p:vS.p,l:vS.l,wait:{who:'both',a:'skill',timeout:k?6:10},at:k?0.3:1,cut:false,enter:()=>{if(k===0&&FIN.uzda)FIN.uzda.demoBeat(0);},
       done:()=>{const f=bp.clone(),to=T4SPOT.clone().lerp(f,1-(k+1)/3);anim(0.35,q=>{bp.lerpVectors(f,to,smooth(q));});tone([523,659,784][k],0.22,'triangle',0.25);if(FIN.uzda)FIN.uzda.demoBeat(k+1);
         floatText(T4SPOT.clone().add(new V3(0,2.2,0)),['Раз!','Два!','ТРИ!'][k],'#ffe27a');if(k===2){SFX.horn&&SFX.horn();FX.confetti(T4SPOT.clone(),40);CINE.punch(-3);floatText(T4SPOT.clone().add(new V3(0,1.5,0)),'Узда на Змее!','#ffd76a');}}})),
    t4S('team',3,{tag:'Вперёд!',title:'Теперь — по-настоящему!',icon:'go',text:'Пока головы без сил — у вас <b>пятьдесят секунд</b>. Вперёд, богатыри!'},{enter:()=>{SFX.ok();bp.copy(saved);restore();if(FIN.uzda)FIN.uzda.demoBeat(-1);}})],
    {end:()=>{bp.copy(saved);restore();if(FIN.uzda)FIN.uzda.demoBeat(-1);t4SeenSet(3);}});}
// короткое напоминание, если этап уже объясняли (повторная попытка)
function t4Short(n){const txt={1:['Этап 1 · Три запала','heads','Жёлтый кружок — <b>щит</b>, красный зубец — <b>кувырок</b>, потом бей.<br>Левую и правую — <b>вместе</b>, за двенадцать секунд, дружней!'],
  2:['Этап 2 · Вдох','heads','Тянет к пасти — держи <b>щит</b>. Жёлудь — <b>рогатка Прошки</b>, огонь — <b>щит Потапа</b>, сытая — <b>вода Йоши</b>.<br><b>Взор Пелагеи</b> — слабое место: один удар, и Пробой!'],
  3:['Этап 3 · Узда','ring','Узду — <b>клещами вдвоём</b> к золотому ореолу на шее, и <b>умение трижды</b>, оба: раз, два, три!']}[n];
  L4.reminder(t4S('wide',4.5,{tag:'Напоминание',title:txt[0],icon:txt[1],text:txt[2]}),T4HOOK);}
const t4SeenSet=n=>L4.mark('tut4b',n),t4Seen=n=>L4.seen('tut4b',n);
FIN.boss4bLesson=k=>{T4.l2=k;t4Stage2(k);};   // урок этапа 2 по номеру (1 жёлудь · 2 огонь и вода · 3 вдох и взор)
FIN.boss4bStage=n=>{if(n===1)t4Stage1();else if(n===2)FIN.boss4bLesson(1);else if(n===3)t4Stage3();};   // для ботов и отладки
L4.regLevel('4-B',()=>W.flags.phase===2?FIN.boss4bLesson(T4.l2||1):FIN.boss4bStage(W.flags.phase),()=>W.flags.phase>=1&&W.flags.phase<=3);   // «Показать урок ещё раз» — полный урок текущего этапа
// ---------- живые подсказки в бою ----------
function t4HintShow(key,c,targets,expect,dur){const H=T4.h;if(!H)return;if(H.cur&&H.cur.key===key&&H.until>G.time)return;
  H.cur={key,c,expect:expect||[],got:{}};H.until=G.time+(dur||6);H.last=G.time;H.cd[key]=G.time;t4Dom();
  const kh=t4Keys((expect||[]).map(e=>({pi:e[0],a:e[1],label:e[2]||'',wait:true})),{}).replace('class="ft-keys"','class="fh-keys"');
  T4.hint.innerHTML='<div class="fh-row"><div class="ft-ico">'+(T4I[c.icon]||'')+'</div><div class="fh-main"><div class="fh-title"><span class="ft-tag">'+c.tag+'</span>'+c.title+'</div><div class="fh-text">'+c.text+'</div></div>'+kh+'</div>';
  T4.hint.classList.add('on');T4.hint.classList.remove('ok');tone(1320,0.1,'triangle',0.12);tone(1760,0.12,'sine',0.08,null,0.08);
  for(const a of T4.arrows)if(a.parent)a.parent.remove(a);T4.arrows=(targets||[]).map(t=>{const ar=t4Arrow(c.col||0xffd76a);ar.userData.tgt=t;ar.position.copy(t4TgtPos(t));t4Prop(ar);return ar;});}
function t4HintHide(ok){const H=T4.h;if(!H||!H.cur)return;if(ok){T4.hint.classList.add('ok');let k=T4.hint.querySelector('.fh-keys');if(!k){k=document.createElement('div');k.className='fh-keys';T4.hint.firstChild.appendChild(k);}k.innerHTML='<span class="fh-ok">✓ Молодец!</span>';H.until=Math.min(H.until,G.time+1.1);}
  else{T4.hint.classList.remove('on');H.cur=null;for(const a of T4.arrows)if(a.parent)a.parent.remove(a);T4.arrows=[];}}
const t4TgtPos=t=>t&&t.isVector3?t.clone():t&&t.kind==='golova'?t4HeadTop(t).add(new V3(0,1.6,0)):t&&t.pos?(typeof t.pos==='function'?t.pos():t.pos).clone().add(new V3(0,1.8,0)):new V3();
function t4HintTick(dt){const F=W.flags,H=T4.h;if(!H)return;
  if(G.cine||G.state!=='play'||F.phase<1||F.phase>3){if(H.cur)t4HintHide(false);return;}
  const hs=t4Heads();if(!hs.length)return;const now=G.time;if(now<(H.grace||0))return;   // сразу после ролика — пару секунд без подсказок
  // успехи сбрасывают таймер «без успехов»
  const nb=hs.filter(e=>e.state==='broken').length;if(nb>H.nb||F.phase!==H.ph){H.prog=now;if(H.cur&&nb>H.nb)t4HintHide(true);}
  if(F.phase!==H.ph){H.ph=F.phase;H.cycle=0;}
  // проснулась одна, пока вторая не в Пробое
  for(const e of hs){if(e._t4b&&e.state!=='broken'&&F.phase<3&&!G.cine)t4Ctx('wake',()=>t4HintShow('wake',{tag:'Не успели',title:'Голова проснулась!',icon:'clock',text:'Оглушайте головы <b>вместе</b> — Пробой двенадцать секунд держится.',col:0xff9a8a},[e],null,5),9);e._t4b=e.state==='broken';}
  H.nb=nb;
  // стрелки следуют за целями
  for(const a of T4.arrows){const p=t4TgtPos(a.userData.tgt);a.position.copy(p).add(new V3(0,0.35*Math.abs(Math.sin(now*4)),0));a.rotation.y+=dt*2.5;}
  // правильное нажатие — «Молодец!»
  if(H.cur&&!T4.hint.classList.contains('ok')){for(const [pi,a] of H.cur.expect)if(t4Tap(pi,a)){t4HintHide(true);break;}}
  if(H.cur&&now>H.until)t4HintHide(false);
  const idle=now-Math.max(H.prog,H.last);
  if(F.phase===1){const L=hs[0],R=hs[2];
    if(L.state==='broken'&&R.state!=='broken')t4Ctx('one',()=>t4HintShow('one',{tag:'Быстрее!',title:'Правая голова — скорей!',icon:'clock',text:'Левая в Пробое! <b>Правую</b> оглушите, пока левая не проснулась, — живей!',col:0xfff2b0},[R],[[1,'attack','удар']],5),7);
    else if(R.state==='broken'&&L.state!=='broken')t4Ctx('one',()=>t4HintShow('one',{tag:'Быстрее!',title:'Левая голова — скорей!',icon:'clock',text:'Правая в Пробое! <b>Левую</b> оглушите, пока правая не проснулась, — живей!',col:0xfff2b0},[L],[[0,'attack','удар']],5),7);
    else if(L.state==='wind'&&L.sig==='yellow'&&H.n.y<3)t4Ctx('yel',()=>{H.n.y++;t4HintShow('yel',{tag:'Игрок 1',title:'Жёлтый кружок — щит, щит!',icon:'yellow',text:'Щитом отбей, потом бей.',col:0xffd23a},[L],[[0,'guard','щит']],3.5);},5);
    else if(R.state==='wind'&&R.sig==='red'&&H.n.r<3)t4Ctx('red',()=>{H.n.r++;t4HintShow('red',{tag:'Игрок 2',title:'Красный зубец — кувырок, кувырок!',icon:'red',text:'Щит не спасёт — кувыркнись, потом сбоку бей.',col:0xff5a4a},[R],[[1,'roll','кувырок']],3.5);},5);
    else if(idle>12)t4Cycle([
      ()=>t4HintShow('g1',{tag:'Подсказка',title:'Левая голова — щит да удар',icon:'yellow',text:'Жёлтый кружок — <b>щитом</b> отбей, затем <b>бей</b>.'},[L],[[0,'guard','щит'],[0,'attack','удар']]),
      ()=>t4HintShow('g2',{tag:'Подсказка',title:'Правая голова — кувырок да удар',icon:'red',text:'Красный зубец — <b>кувырок</b>, а там <b>сбоку бей</b>.'},[R],[[1,'roll','кувырок'],[1,'attack','удар']]),
      ()=>t4HintShow('g3',{tag:'Подсказка',title:'Вместе, разом!',icon:'clock',text:'Левую и правую — <b>разом</b>: Пробой двенадцать секунд держится.'},[L,R],null),
      ()=>t4HintShow('g4',{tag:'Пелагея',title:'Совиный взор — слабое место',icon:'eye',text:'Взор '+K(1,'skill')+': засветится чешуйка. Один удар — Пробой!'},[L,R].filter(e=>e.state!=='broken'),[[1,'skill','взор']])]);}
  const G4h=FIN.gor4,weakOn=G4h&&G4h.weak.length?G4h.weak[0].e:null;
  if(weakOn&&F.phase<3&&!G4h.weak[0].demo)t4Ctx('weak',()=>t4HintShow('weak',{tag:'Все',title:'Слабое место светится — бей!',icon:'eye',text:'Подбегите и <b>ударьте</b> по светящейся чешуйке — голова сразу в Пробое!',col:0xd9a8ff},[weakOn],[[0,'attack','удар'],[1,'attack','удар']],4),7);
  if(F.phase===2){const Mi=hs[1];const acorn=W.marks.some(m=>m.active&&m.active()),sated=hs.find(e=>e.sat>0&&e.state!=='broken'),fire=W.bolts.some(b=>!b.refl&&b.from===Mi);
    if(G4h&&G4h.pull>0)t4Ctx('inhale',()=>t4HintShow('inhale',{tag:'Все',title:'Тянет к пасти — щит!',icon:'shield',text:'Держите щит — потянет слабее.',col:0xffd0a0},[Mi],[[0,'guard','щит'],[1,'guard','щит']],3.6),8);
    else if(acorn)t4Ctx('acorn',()=>t4HintShow('acorn',{tag:'Прошка',title:'Жёлудь! Стреляй!',icon:'acorn',text:'Средняя вдыхает — из <b>рогатки</b> в жёлудь стрельни'+(HERO.proshka.active?'':' (смени '+K(0,'swap')+')')+'.',col:0xffd76a},[Mi],[[0,'skill','рогатка']],4),6);
    else if(fire)t4Ctx('fire',()=>t4HintShow('fire',{tag:'Потап',title:'Огонь! Щит!',icon:'shield',text:'<b>Широкий щит</b> подними — закроешь всех за спиной.',col:0x9fe0ff},[HERO.potap],[[0,'guard','щит']],3.5),6);
    else if(sated)t4Ctx('sated',()=>t4HintShow('sated',{tag:'Йоша · Пелагея',title:'Голова сытая!',icon:'drop',text:'Вода Йоши, взор Пелагеи — один удар!',col:0xff9a3a},[sated],[[1,'skill','умение']],5),8);
    else if(idle>12)t4Cycle([
      ()=>t4HintShow('h1',{tag:'Подсказка',title:'Все три — в Пробой, разом',icon:'heads',text:'Оглушите три головы разом, среднюю — жёлудем.'},hs.filter(e=>e.state!=='broken'),null),
      ()=>t4HintShow('h2',{tag:'Подсказка',title:'Каждому — своё',icon:'hit',text:'Жёлудь, щит, вода, взор — и Пробой!'},null,[[0,'swap','сменить героя'],[1,'swap','сменить героя']])]);}
  if(F.phase===3){const gr=W.grabs[0],bp=gr?gr.pos():null;const ha=[0,1].map(pi=>active(pi));const near=bp?bp.distanceTo(T4SPOT)<3.2:false;const lifted=bp&&bp.y>0.8;
    if(bp&&!lifted&&idle>4)t4Ctx('grab',()=>t4HintShow('grab',{tag:'Оба игрока',title:'Узда — клещами, вдвоём',icon:'tongs',text:'К узде с двух сторон подойдите — и <b>клещами</b> её возьмите.',col:0xffb070},[gr],[[0,'item','клещи'],[1,'item','клещи']],6),8);
    else if(bp&&lifted&&!near)t4Ctx('carry',()=>t4HintShow('carry',{tag:'Оба игрока',title:'К кольцу светящемуся!',icon:'ring',text:'Несите узду вдвоём к кольцу.',col:0xffd76a},[T4SPOT.clone().add(new V3(0,1.3,0))],null,5),8);
    else if(bp&&near)t4Ctx('123',()=>t4HintShow('123',{tag:'Оба игрока',title:'Раз-два-три — вместе, дружно!',icon:'n123',text:'<b>Умение</b> — трижды, <b>оба</b>: на «раз», на «два», на «три»!',col:0xffd76a},[T4SPOT.clone().add(new V3(0,1.3,0))],[[0,'skill',''],[1,'skill','']],5),6);}}
function t4Ctx(key,fn,cd){const H=T4.h;if(H.cur&&H.until>G.time&&H.cur.key!=='g1'&&H.cur.key!=='g2'&&H.cur.key!=='g3'&&H.cur.key!=='h1'&&H.cur.key!=='h2')return;if(G.time-(H.cd[key]||-99)<(cd||6))return;fn();}
function t4Cycle(list){const H=T4.h;if(H.cur)return;list[H.cycle%list.length]();H.cycle++;}
// уроки 2 и 3 этапа 2 — на событии, перед тем как механика понадобится (огонь/сытая голова; большой вдох), с запасом по времени
function t4Lessons2(dt){const F=W.flags,H=T4.h;if(!H||!T4.auto||F.phase!==2||G.cine||G.trans||T4.on||G.state!=='play'||G.time<(H.grace||0)||!t4Seen2(1))return;
  H.t2=(H.t2||0)+dt;if(H.t2<4)return;const hs=t4Heads(),Mi=hs[1];if(!Mi)return;const G4h=FIN.gor4,pull=G4h&&G4h.pull>0;
  const fire=W.bolts.some(b=>!b.refl&&b.from===Mi),sated=hs.some(e=>e.sat>0&&e.state!=='broken');
  if(!t4Seen2(2)){if(fire||sated||H.t2>30)FIN.boss4bLesson(2);return;}
  if(!t4Seen2(3)&&!pull&&!fire&&H.t2>(H.t2b||0)+6){FIN.boss4bLesson(3);}}
// ---------- этапы: ролик сразу после смены фазы ----------
{const _ll=loadLevel;loadLevel=function(i){_ll(i);T4.on=false;T4.ph=-1;T4.props.length=0;T4.arrows=[];if(T4.card)t4Card(null);if(T4.hint)T4.hint.classList.remove('on');
  T4.h=W&&W.levelId==='4-B'?{ph:0,nb:0,prog:0,last:-99,cd:{},cur:null,until:0,cycle:0,n:{y:0,r:0}}:null;};}
{const _step=step;step=function(dt){_step(dt);if(!W||W.levelId!=='4-B')return;const F=W.flags;
  if(T4.auto&&!G.cine&&!G.trans&&F.phase!==T4.ph&&F.phase>=1&&F.phase<=3&&!T4.on){const n=F.phase,prev=T4.ph;T4.ph=n;
    if(!(n===2&&prev===3)){if(t4Seen(n))t4Short(n);else FIN.boss4bStage(n);}   // 3→2 (головы очнулись) — ролик не повторяем
    if(T4.h){T4.h.prog=G.time;T4.h.ph=n;T4.h.t2=0;T4.h.t2b=0;}}
  try{t4Lessons2(dt);}catch(e){console.error('boss4b lessons',e);}
  try{t4HintTick(dt);}catch(e){console.error('boss4b hint',e);}};}
// пауза, меню и титул — карточки не поверх них
{const _r=render;render=function(){_r();if(T4.card){const v=G.state==='play'&&!FIN.titleOn?'':'hidden';if(T4.card.style.visibility!==v){T4.card.style.visibility=v;T4.hint.style.visibility=v;}}};}
