/* ============================== РЕЛИЗ final04 · 4-Б «ЗМЕЙ ГОРЫНЫЧ»: обучающие ролики по этапам и живые подсказки ============================== */
// После вступления и после каждой смены фазы — интерактивный ролик: крупные карточки «что делать», камера на нужной голове,
// шаг ждёт, пока игрок нажмёт показанную кнопку (герой тут же показывает приём: щит, удар, кувырок, рогатка, живая вода…).
// Нажал — «Отбил!», «ПРОБОЙ!»; не нажал за 8 с — ролик показывает сам. Пропуск — как у всех роликов (оба держат прыжок).
// В бою — живые подсказки: по событию (жёлудь над средней, сытая голова, огонь, одна голова уже в Пробое, проснулась, узда)
// и по времени без успехов; стрелка над целью, мигающая кнопка, «✓ Молодец!» на правильное нажатие.
// Логику боя модуль не меняет: во время роликов головы не нападают, после — всё возвращается как было.
const T4={on:false,auto:true,card:null,hint:null,props:[],arrows:[],ph:-1,h:null};FIN.boss4b=T4;   // auto=false — без обучающих роликов (боты, меряющие вступление)
const t4Heads=()=>W.enemies.filter(e=>e.kind==='golova').sort((a,b)=>a.idx-b.idx);
const t4P=h=>h.pos.clone();
const T4SPOT=new V3(0,1.4,-12.6);
function t4Dom(){if(T4.card&&T4.card.isConnected)return;const mk=id=>{const d=document.createElement('div');d.id=id;document.body.appendChild(d);return d;};T4.card=mk('finTut');T4.hint=mk('finBossHint');}
// ---------- значки ----------
const T4I={
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
  go:'<svg viewBox="0 0 64 64"><path d="M10 32 H44 M32 16 L50 32 L32 48" stroke="#9ff0a8" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'};
const T4WHO=[{n:'Игрок 1',c:'#e0784a'},{n:'Игрок 2',c:'#6cc4b8'}];
function t4Keys(keys,got){if(!keys||!keys.length)return '';return '<div class="ft-keys">'+keys.map(k=>{const w=T4WHO[k.pi];const st=got&&got[k.pi]?'done':k.wait?'wait':'';
  return '<span class="ft-key '+st+'">'+(G.solo?'':'<span class="ft-who" style="background:'+w.c+'">'+w.n+'</span>')+K(k.pi,k.a)+(k.label?' '+k.label:'')+'</span>';}).join('')+'</div>';}
function t4CardHTML(c,got,st){return '<div class="ft-head"><span class="ft-tag">'+c.tag+'</span>'+c.title+'</div><div class="ft-body"><div class="ft-ico">'+(T4I[c.icon]||'')+'</div><div class="ft-text">'+c.text+'</div></div>'+
  t4Keys(c.keys,got)+(st==='wait'?'<div class="ft-go">'+(c.go||'Нажми!')+'</div>':st==='ok'?'<div class="ft-go okt">'+(c.okText||'Получилось!')+'</div>':st==='auto'?'<div class="ft-go okt">Смотри — вот так!</div>':'')+'<div class="ft-skip">пропустить — оба держат прыжок</div>';}
function t4Card(c,got,st){t4Dom();if(!c){T4.card.classList.remove('on','ok');return;}T4.card.innerHTML=t4CardHTML(c,got,st);T4.card.classList.add('on');T4.card.classList.toggle('ok',st==='ok');}
// ---------- реквизит роликов и подсказок ----------
function t4Prop(o){o.userData.noBatch=true;o.userData.dress=true;o.traverse(q=>{q.userData.noBatch=true;q.userData.sty=true;q.castShadow=false;});W.group.add(o);T4.props.push(o);return o;}
function t4Clear(){for(const o of T4.props)if(o.parent)o.parent.remove(o);T4.props.length=0;}
function t4Ring(col,r){const g=new THREE.Group();const m=new THREE.Mesh(new FIN.orig.Torus(r||0.9,0.1,6,32),MB(col,{transparent:true,opacity:0.95,depthTest:false,fog:false}));m.renderOrder=9;g.add(m);return g;}
function t4Arrow(col){const g=new THREE.Group(),mt=MB(col,{transparent:true,opacity:0.95,depthTest:false,fog:false});const c=new THREE.Mesh(new FIN.orig.Cone(0.42,0.8,4),mt);c.rotation.x=Math.PI;c.renderOrder=10;g.add(c);
  const r=new THREE.Mesh(new FIN.orig.Torus(0.5,0.07,5,20),mt);r.rotation.x=Math.PI/2;r.position.y=0.62;r.renderOrder=10;g.add(r);g.userData.mat=mt;return g;}
const t4HeadTop=e=>{const p=new V3();(e.L&&e.L.head?e.L.head:e.g).getWorldPosition(p);return p;};
function t4Tap(pi,a){return G.solo?(tap(0,a)||tap(1,a)):tap(pi,a);}
function t4Who(w){if(G.solo)return [G.soloPi];return w==='both'||w==='any'?[0,1]:[w];}
function t4Broken(e,on){if(on){e.state='broken';e.t=0;e.bdur=99;e._b=true;}else{e.state='idle';e.t=0;e._b=false;e.embers=e.maxEmb||4;}}
// ---------- движок интерактивного ролика ----------
// шаг: {dur, p, l (камера), card:{tag,title,icon,text,keys,go,okText}, wait:{who,a,timeout,sync}, at (когда ждать), enter(s), done(s,auto), each(s,pi), update(s,u,dt)}
function t4Run(steps,opt){opt=opt||{};T4.on=true;t4Dom();const hs=t4Heads();hs.forEach(e=>{e._cd4=e.cd;e.cd=99;});$('banner').style.opacity=0;
  let T=0;const shots=[];for(const s of steps){s.t0=T;shots.push(shot(T,s.p,s.l,s.p2,s.l2,s.dur,s.cut!==false));T+=s.dur;}
  const st={i:-1,wt:0};
  play({dur:T+0.25,fov:opt.fov||47,camK:3.4,shots,
    tick:(t,dt)=>{const i=t>=T?-1:steps.findIndex(s=>t>=s.t0&&t<s.t0+s.dur);
      if(i!==st.i){st.i=i;if(i<0)return;const s=steps[i];s.got={};s.okAt=null;s.auto=false;s.first=null;st.wt=0;if(s.enter)s.enter(s);t4Card(s.card,s.got,s.wait?'':null);}
      if(i<0)return;const s=steps[i];
      if(s.wait&&s.okAt==null){const at=s.t0+(s.at!=null?s.at:0.8);if(t>=at){if(G.cine)G.cine.t=at;st.wt+=dt;if(st.wt<dt*1.5)t4Card(s.card,s.got,'wait');
          const need=t4Who(s.wait.who);
          for(const pi of need)if(!s.got[pi]&&t4Tap(pi,s.wait.a)){
            if(s.wait.sync&&s.first!=null&&G.time-s.first>s.wait.sync){s.got={};s.first=null;floatText(t4P(active(pi)).add(new V3(0,2.2,0)),'Ещё раз — вместе!','#ffd9a0');SFX.miss();}
            s.got[pi]=true;if(s.first==null)s.first=G.time;if(s.each)s.each(s,pi);tone(900+pi*200,0.08,'triangle',0.2);t4Card(s.card,s.got,'wait');}
          if(s.wait.sync&&s.first!=null&&G.time-s.first>s.wait.sync&&!need.every(pi=>s.got[pi])){s.got={};s.first=null;t4Card(s.card,s.got,'wait');}
          if(need.every(pi=>s.got[pi])){s.okAt=t;if(s.done)s.done(s,false);SFX.ok();t4Card(s.card,s.got,'ok');}
          else if(st.wt>(s.wait.timeout||8)){s.okAt=t;s.auto=true;need.forEach(pi=>{s.got[pi]=true;});if(s.done)s.done(s,true);t4Card(s.card,s.got,'auto');}
          // получилось — досматриваем результат ~2.6 с и дальше, без пустого ожидания
          if(s.okAt!=null&&G.cine&&s.t0+s.dur-t>2.6)G.cine.t=s.t0+s.dur-2.6;}}
      if(s.update)s.update(s,t-s.t0,dt);},
    end:()=>{T4.on=false;t4Card(null);t4Clear();if(T4.h){T4.h.prog=G.time;T4.h.grace=G.time+3;}t4Heads().forEach(e=>{e.cd=e._cd4!=null&&e._cd4<50?e._cd4:1.5;});if(opt.end)opt.end();}});
  const cd=CINE.CD&&CINE.CD();if(cd&&cd.S===G.cine){cd.inserts=false;cd.cover=[];cd.calm=true;}}
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
    t4S('wide',4.2,{tag:'Как победить',title:'Этап 1 из 3 · Три запала',icon:'heads',text:'У каждой головы свой «запал». Оглушите <b>левую</b> и <b>правую</b> голову <b>одновременно</b> — и Горыныч ослабнет. Смотрите, как это делается!'},
      {enter:()=>{sayP('Тут написано, как его одолеть! Смотрите!',2.6);}}),
    t4S('L',9,{tag:'Игрок 1 · левая голова',title:'Сонная голова — жёлтый кружок',icon:'yellow',text:'Над головой <b>жёлтый кружок</b> — она бьёт медленно. Подними <b>щит</b> и отбей удар!',keys:[{pi:0,a:'guard',label:'щит',wait:true}],go:'Нажми щит!',okText:'Отбил!'},
      {wait:{who:0,a:'guard'},at:1.2,enter:()=>{sigL=t4Prop(t4Ring(0xffd23a,0.55));},update:(s,u)=>{if(sigL){const p=t4HeadTop(L);sigL.position.copy(p).add(new V3(0,0.95,0));sigL.lookAt(camS.position);sigL.scale.setScalar(1+0.25*Math.sin(G.time*6));}},
       done:()=>{a0()._demoGuard=G.time+0.9;SFX.parry();const p=t4HeadTop(L);FX.sparks(p.clone().add(new V3(1,0,1.4)),14);floatText(p.clone().add(new V3(0,1.6,0)),'Отбил!','#ffe08a');if(sigL)sigL.visible=false;CINE.punch(-2);}}),
    t4S('L',7,{tag:'Игрок 1 · левая голова',title:'Теперь бей!',icon:'hit',text:'Удар отбит — голова открыта. <b>Бей</b>, пока не опомнилась!',keys:[{pi:0,a:'attack',label:'удар',wait:true}],go:'Бей!',okText:'ПРОБОЙ!'},
      {wait:{who:0,a:'attack'},at:0.6,cut:false,done:()=>{a0().atkT=0.28;SFX.brk();const p=t4HeadTop(L);FX.stars(p,12);t4Broken(L,true);floatText(p.clone().add(new V3(0,1.8,0)),'ПРОБОЙ!','#fff2b0');CINE.hitstop&&CINE.hitstop(4);}}),
    t4S('R',9,{tag:'Игрок 2 · правая голова',title:'Голодная голова — красный зубец',icon:'red',text:'<b>Красный зубец</b> — это хватка, щит не спасёт! <b>Кувыркнись</b> в сторону.',keys:[{pi:1,a:'roll',label:'кувырок',wait:true}],go:'Кувырок!',okText:'Увернулся!'},
      {wait:{who:1,a:'roll'},at:1.2,enter:()=>{sigR=t4Prop(t4Ring(0xff5a4a,0.55));},update:(s,u)=>{if(sigR){const p=t4HeadTop(R);sigR.position.copy(p).add(new V3(0,0.95,0));sigR.lookAt(camS.position);sigR.scale.setScalar(1+0.25*Math.sin(G.time*9));}},
       done:()=>{const h=a1();if(h.grounded)h.vel.y=5.5;FX.dust(t4P(h),10);SFX.swish();floatText(t4P(h).add(new V3(0,2,0)),'Увернулся!','#9fe0ff');if(sigR)sigR.visible=false;}}),
    t4S('R',7,{tag:'Игрок 2 · правая голова',title:'Бей сбоку!',icon:'hit',text:'Промахнулась и открыла бок — <b>бей</b>!',keys:[{pi:1,a:'attack',label:'удар',wait:true}],go:'Бей!',okText:'ПРОБОЙ!'},
      {wait:{who:1,a:'attack'},at:0.6,cut:false,done:()=>{a1().atkT=0.28;SFX.brk();const p=t4HeadTop(R);FX.stars(p,12);t4Broken(R,true);floatText(p.clone().add(new V3(0,1.8,0)),'ПРОБОЙ!','#fff2b0');}}),
    t4S('wide',5.2,{tag:'Главное',title:'Вместе — за 6 секунд!',icon:'clock',text:'Оглушённая голова спит <b>6 секунд</b>. Одну оглушили — она проснётся. Бейте <b>левую и правую вместе</b>, чтобы обе были в Пробое сразу!'},
      {enter:()=>{for(const e of[L,R]){const r=t4Prop(t4Ring(0xfff2b0,0.8));r.userData.e=e;}},update:(s,u)=>{for(const o of T4.props)if(o.userData.e){const p=t4HeadTop(o.userData.e);o.position.copy(p).add(new V3(0,1.2,0));o.lookAt(camS.position);o.scale.setScalar(Math.max(0.05,1-u/5));}}}),
    t4S('M',4.4,{tag:'А средняя?',title:'Средняя плюётся синим',icon:'blue',text:'Синие капли <b>отбивай щитом</b>. Среднюю оглушим на следующем этапе.'}),
    t4S('team',2.6,{tag:'Вперёд!',title:'Теперь — по-настоящему',icon:'go',text:'Подсказки будут рядом. Удачи, богатыри!'},{enter:()=>{FX.confettiCam(30);SFX.ok();}})],
    {end:()=>{t4Broken(L,false);t4Broken(R,false);t4SeenSet(1);}});}
// ---------- этап 2: вдох ----------
function t4Stage2(){const H=t4Heads(),L=H[0],Mi=H[1],R=H[2];if(!Mi)return;const P=HERO.proshka,Po=HERO.potap,Y=HERO.yosha,Pe=HERO.pelageya;let ac=null,fb=null,glow=null;
  const who=(h,pi,sw)=>h.active?'':' (переключись '+K(pi,'swap')+')';
  t4Run([
    t4S('wide',4,{tag:'Как победить',title:'Этап 2 из 3 · Вдох',icon:'heads',text:'Теперь нужно оглушить <b>все три</b> головы разом. У каждой — своя хитрость, и у каждого героя — своё умение.'},{enter:()=>{sayP('Каждому — своё дело!',2);}}),
    t4S('M',9,{tag:'Прошка',title:'Долгий вдох средней',icon:'acorn',text:'Средняя надолго вдыхает — над ней загорается <b>жёлудь</b>. Прошка, стреляй в него из <b>рогатки</b>'+who(P,0)+'!',keys:[{pi:0,a:'skill',label:'рогатка',wait:true}],go:'Стреляй!',okText:'Кха-кха! ПРОБОЙ!'},
      {wait:{who:0,a:'skill'},at:1.2,enter:()=>{ac=t4Prop(new THREE.Group());const a=acornMesh(2.4);ac.add(a);const r=t4Ring(0xffd76a,0.45);ac.add(r);},
       update:()=>{if(ac&&ac.visible){const p=t4HeadTop(Mi);ac.position.copy(p).add(new V3(0,0.3,1.1));ac.children[1].lookAt(camS.position);ac.scale.setScalar(1+0.15*Math.sin(G.time*10));}},
       done:()=>{P._skT=G.time;SFX.thwip&&SFX.thwip();const a=acornMesh(1.4);t4Prop(a);const from=t4P(P).add(new V3(0,1,0)),to=ac.position.clone();anim(0.35,k=>{a.position.lerpVectors(from,to,k);a.position.y+=Math.sin(k*Math.PI)*0.8;if(k>=1){a.visible=false;ac.visible=false;FX.stars(to,10);SFX.brk();t4Broken(Mi,true);floatText(to.clone().add(new V3(0,1,0)),'Кха-кха! ПРОБОЙ!','#ffe08a');}});}}),
    t4S('team',8,{tag:'Потап',title:'Огненный выдох',icon:'shield',text:'Средняя дует огнём! Потап, подними <b>широкий щит</b>'+who(Po,0)+' — он закрывает всех, кто стоит за спиной.',keys:[{pi:0,a:'guard',label:'широкий щит',wait:true}],go:'Щит!',okText:'Отбил!'},
      {wait:{who:0,a:'guard'},at:1.4,enter:()=>{fb=t4Prop(new THREE.Mesh(new FIN.orig.Icosa(0.35,1),MB(0x6ad0ff,{transparent:true,opacity:0.95})));fb.position.copy(t4HeadTop(Mi));},
       update:(s,u,dt)=>{if(fb&&fb.visible){const tg=t4P(Po).add(new V3(0,1.1,0.9)),d=tg.clone().sub(fb.position),L2=d.length();if(L2>1.6)fb.position.addScaledVector(d.normalize(),Math.min(L2-1.6,dt*9));fb.rotation.y+=dt*6;fb.scale.setScalar(1+0.2*Math.sin(G.time*12));}},
       done:()=>{Po._demoGuard=G.time+1;SFX.shield();if(fb){FX.sparks(fb.position,16,0x9fe0ff);fb.visible=false;}floatText(t4P(Po).add(new V3(0,2.4,0)),'Отбил!','#9fe0ff');}}),
    t4S('R',8,{tag:'Йоша',title:'Сытая голова',icon:'drop',text:'Голова наелась искр и <b>светится</b> — удар её не берёт. Йоша, потуши её <b>живой водой</b>'+who(Y,1)+'!',keys:[{pi:1,a:'skill',label:'живая вода',wait:true}],go:'Полей!',okText:'Потушил!'},
      {wait:{who:1,a:'skill'},at:1.2,enter:()=>{glow=t4Prop(t4Ring(0xff9a3a,1.1));},update:()=>{if(glow&&glow.visible){const p=t4HeadTop(R);glow.position.copy(p);glow.lookAt(camS.position);glow.scale.setScalar(1+0.12*Math.sin(G.time*8));}},
       done:()=>{Y._skT=G.time;SFX.water&&SFX.water();const p=t4HeadTop(R);FX.drops(p,16);FX.dust(p,8,0xdfe8ee);if(glow)glow.visible=false;t4Broken(R,true);floatText(p.clone().add(new V3(0,1.6,0)),'Потушил! ПРОБОЙ!','#9fe0ff');}}),
    t4S('L',7,{tag:'Пелагея',title:'Совиный взор',icon:'eye',text:'Не видно, куда бить? Пелагея, включи <b>Совиный взор</b>'+who(Pe,1)+' — слабое место засветится.',keys:[{pi:1,a:'skill',label:'Совиный взор',wait:true}],go:'Взор!',okText:'Слабое место!'},
      {wait:{who:1,a:'skill'},at:1,done:()=>{Pe._skT=G.time;const p=t4HeadTop(L);FX.sparkle(p,14,0xe7c3ff);t4Broken(L,true);floatText(p.clone().add(new V3(0,1.6,0)),'Слабое место!','#e7c3ff');}}),
    t4S('wide',4,{tag:'Главное',title:'Все три — в Пробой!',icon:'hit',text:'Когда оглушены <b>все три</b> головы — Горыныч без сил. Тогда — волшебная узда!'},{enter:()=>{t4Heads().forEach(e=>FX.stars(t4HeadTop(e),8));}}),
    t4S('team',2.4,{tag:'Вперёд!',title:'Каждый — своё дело',icon:'go',text:'Жёлудь — Прошка, щит — Потап, вода — Йоша, взор — Пелагея.'},{enter:()=>{SFX.ok();}})],
    {end:()=>{t4Heads().forEach(e=>{t4Broken(e,false);});t4SeenSet(2);}});}
// ---------- этап 3: узда ----------
function t4Stage3(){const gr=W.grabs[0];if(!gr)return;const bp=gr.pos(),saved=bp.clone();let ring=null;
  // герои показывают сами: подходят к узде с двух сторон и несут её к шее; в конце (на склейке) — обратно на свои места
  const A=[active(0),active(1)],home=A.map(h=>({p:h.pos.clone(),f:h.face}));
  const walk=(to,dur,look)=>A.forEach((h,i)=>{const f=h.pos.clone(),t=to(i);anim(dur,k=>{const q=smooth(k);h.pos.x=f.x+(t.x-f.x)*q;h.pos.z=f.z+(t.z-f.z)*q;h.face=Math.atan2(look.x-h.pos.x,look.z-h.pos.z);});});
  const restore=()=>A.forEach((h,i)=>{placeOnGround(h,home[i].p.x,home[i].p.z,home[i].p.y);h.face=home[i].f;});
  const vB=t4View([saved.x,1.7,saved.z],[[-5.6,3.3,-3.4],[-2.2,3.1,6.2],[-6.4,3,9],[-11.8,3.2,5.4],[-2.6,3.4,0.2],[-11,3.4,-0.6]]),
        vS=t4View([0,1.5,-12],[[3.4,4.4,-5.2],[-3.4,4.4,-5.2],[0,5.2,-4.6],[5,3.8,-8],[-5,3.8,-8]],1.6);
  t4Run([
    t4S('wide',4,{tag:'Как победить',title:'Этап 3 из 3 · Узда',icon:'ring',text:'Головы без сил! Наденьте на Змея <b>волшебную узду</b>. Она горячая — только <b>клещами</b>, и только <b>вдвоём</b>.'},{enter:()=>{sayP('Кузьма сказал: клещами возьмёте!',2.4);}}),
    t4S('bridle',9,{tag:'Оба игрока',title:'Возьмите узду',icon:'tongs',text:'Подойдите к узде с <b>двух сторон</b> и возьмите её <b>клещами</b>.',keys:[{pi:0,a:'item',label:'клещи',wait:true},{pi:1,a:'item',label:'клещи',wait:true}],go:'Берите вдвоём!',okText:'Взяли!'},
      {p:vB.p,l:vB.l,wait:{who:'both',a:'item'},at:1.6,enter:()=>{walk(i=>new V3(saved.x+(i?1.2:-1.1),0,saved.z+(i?0.3:-0.8)),1.4,saved);},each:(s,pi)=>{FX.sparks(bp.clone().add(new V3(0,0.5,0)),8);floatText(t4P(active(pi)).add(new V3(0,2,0)),'Взял!','#ffb070');},
       done:()=>{const f=bp.clone();anim(0.8,k=>{bp.y=f.y+smooth(k)*1.3;});}}),
    t4S('spot',5,{tag:'Несите к шее',title:'Светящееся кольцо на шее',icon:'ring',text:'Несите узду <b>вдвоём</b> к светящемуся кольцу на шее Змея. Не расходитесь далеко — иначе уроните!'},
      {p:vS.p,l:vS.l,enter:()=>{ring=t4Prop(t4Ring(0xffd76a,0.95));ring.position.copy(T4SPOT);const f=bp.clone(),to=new V3(T4SPOT.x,1.9,T4SPOT.z+1.8);anim(2.6,k=>{const q=smooth(k);bp.lerpVectors(f,to,q);bp.y+=Math.sin(q*Math.PI)*0.4;});
         walk(i=>new V3(T4SPOT.x+(i?0.95:-0.95),0,T4SPOT.z+1.8),2.6,T4SPOT);},update:()=>{if(ring){ring.rotation.y+=0.03;ring.scale.setScalar(1+0.12*Math.sin(G.time*6));}}}),
    t4S('spot',10,{tag:'Оба игрока',title:'«Раз-два-три» — вместе!',icon:'n123',text:'Узда у шеи — нажмите <b>умение вместе</b>, в одну секунду!',keys:[{pi:0,a:'skill',label:'',wait:true},{pi:1,a:'skill',label:'',wait:true}],go:'Раз… два… ТРИ!',okText:'Узда на Змее!'},
      {p:vS.p,l:vS.l,wait:{who:'both',a:'skill',sync:0.8,timeout:10},at:1,cut:false,update:(s,u)=>{if(s.okAt==null){const k=Math.floor((G.time*1.6)%3);const el=T4.card.querySelector('.ft-go');if(el)el.textContent=['Раз…','Два…','ТРИ — жмите!'][k];}},
       done:()=>{SFX.horn&&SFX.horn();FX.confetti(T4SPOT.clone(),40);CINE.punch(-3);floatText(T4SPOT.clone().add(new V3(0,1.5,0)),'Узда на Змее!','#ffd76a');}}),
    t4S('team',3,{tag:'Вперёд!',title:'Теперь — по-настоящему',icon:'go',text:'Пока головы без сил, у вас <b>25 секунд</b>. Вперёд!'},{enter:()=>{SFX.ok();bp.copy(saved);restore();}})],
    {end:()=>{bp.copy(saved);restore();t4SeenSet(3);}});}
// короткое напоминание, если этап уже объясняли (повторная попытка)
function t4Short(n){const txt={1:['Этап 1 · Три запала','heads','Жёлтый кружок — <b>щит</b>, красный зубец — <b>кувырок</b>, потом бей. Левую и правую — <b>вместе</b>, за 6 секунд!'],
  2:['Этап 2 · Вдох','heads','Жёлудь — <b>рогатка Прошки</b>, огонь — <b>щит Потапа</b>, сытая — <b>вода Йоши</b>, слабое место — <b>взор Пелагеи</b>. Все три — в Пробой!'],
  3:['Этап 3 · Узда','ring','Узду — <b>клещами вдвоём</b> к кольцу на шее, и <b>умение вместе</b>!']}[n];
  t4Run([t4S('wide',4.5,{tag:'Напоминание',title:txt[0],icon:txt[1],text:txt[2]})]);}
function t4SeenSet(n){G.flags.tut4b=G.flags.tut4b||{};G.flags.tut4b[n]=true;}
function t4Seen(n){return !!(G.flags.tut4b&&G.flags.tut4b[n]);}
FIN.boss4bStage=n=>{if(n===1)t4Stage1();else if(n===2)t4Stage2();else if(n===3)t4Stage3();};   // для ботов и отладки
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
  for(const e of hs){if(e._t4b&&e.state!=='broken'&&F.phase<3&&!G.cine)t4Ctx('wake',()=>t4HintShow('wake',{tag:'Не успели',title:'Голова проснулась!',icon:'clock',text:'Оглушайте головы <b>вместе</b> — Пробой держится всего 6 секунд.',col:0xff9a8a},[e],null,5),9);e._t4b=e.state==='broken';}
  H.nb=nb;
  // стрелки следуют за целями
  for(const a of T4.arrows){const p=t4TgtPos(a.userData.tgt);a.position.copy(p).add(new V3(0,0.35*Math.abs(Math.sin(now*4)),0));a.rotation.y+=dt*2.5;}
  // правильное нажатие — «Молодец!»
  if(H.cur&&!T4.hint.classList.contains('ok')){for(const [pi,a] of H.cur.expect)if(t4Tap(pi,a)){t4HintHide(true);break;}}
  if(H.cur&&now>H.until)t4HintHide(false);
  const idle=now-Math.max(H.prog,H.last);
  if(F.phase===1){const L=hs[0],R=hs[2];
    if(L.state==='broken'&&R.state!=='broken')t4Ctx('one',()=>t4HintShow('one',{tag:'Быстрее!',title:'Правая голова — скорее!',icon:'clock',text:'Левая в Пробое! Оглушите <b>правую</b>, пока левая не проснулась.',col:0xfff2b0},[R],[[1,'attack','удар']],5),7);
    else if(R.state==='broken'&&L.state!=='broken')t4Ctx('one',()=>t4HintShow('one',{tag:'Быстрее!',title:'Левая голова — скорее!',icon:'clock',text:'Правая в Пробое! Оглушите <b>левую</b>, пока правая не проснулась.',col:0xfff2b0},[L],[[0,'attack','удар']],5),7);
    else if(L.state==='wind'&&L.sig==='yellow'&&H.n.y<3)t4Ctx('yel',()=>{H.n.y++;t4HintShow('yel',{tag:'Игрок 1',title:'Жёлтый кружок — щит!',icon:'yellow',text:'Отбей щитом, потом бей.',col:0xffd23a},[L],[[0,'guard','щит']],3.5);},5);
    else if(R.state==='wind'&&R.sig==='red'&&H.n.r<3)t4Ctx('red',()=>{H.n.r++;t4HintShow('red',{tag:'Игрок 2',title:'Красный зубец — кувырок!',icon:'red',text:'Щит не спасёт — кувыркнись, потом бей сбоку.',col:0xff5a4a},[R],[[1,'roll','кувырок']],3.5);},5);
    else if(idle>12)t4Cycle([
      ()=>t4HintShow('g1',{tag:'Подсказка',title:'Левая голова — щит и удар',icon:'yellow',text:'Жёлтый кружок — отбей <b>щитом</b>, затем <b>бей</b>.'},[L],[[0,'guard','щит'],[0,'attack','удар']]),
      ()=>t4HintShow('g2',{tag:'Подсказка',title:'Правая голова — кувырок и удар',icon:'red',text:'Красный зубец — <b>кувырок</b>, затем <b>бей сбоку</b>.'},[R],[[1,'roll','кувырок'],[1,'attack','удар']]),
      ()=>t4HintShow('g3',{tag:'Подсказка',title:'Вместе!',icon:'clock',text:'Левую и правую — <b>одновременно</b>: Пробой держится 6 секунд.'},[L,R],null)]);}
  if(F.phase===2){const Mi=hs[1];const acorn=W.marks.some(m=>m.active&&m.active()),sated=hs.find(e=>e.sat>0&&e.state!=='broken'),fire=W.bolts.some(b=>!b.refl&&b.from===Mi);
    if(acorn)t4Ctx('acorn',()=>t4HintShow('acorn',{tag:'Прошка',title:'Жёлудь! Стреляй!',icon:'acorn',text:'Средняя вдыхает — выстрели из <b>рогатки</b> в жёлудь'+(HERO.proshka.active?'':' (переключись '+K(0,'swap')+')')+'.',col:0xffd76a},[Mi],[[0,'skill','рогатка']],4),6);
    else if(fire)t4Ctx('fire',()=>t4HintShow('fire',{tag:'Потап',title:'Огонь! Щит!',icon:'shield',text:'Подними <b>широкий щит</b> — закроешь всех за спиной.',col:0x9fe0ff},[HERO.potap],[[0,'guard','щит']],3.5),6);
    else if(sated)t4Ctx('sated',()=>t4HintShow('sated',{tag:'Йоша · Пелагея',title:'Голова сытая!',icon:'drop',text:'Йоша — <b>живая вода</b>, Пелагея — <b>Совиный взор</b>: так голову снова можно бить.',col:0xff9a3a},[sated],[[1,'skill','умение']],5),8);
    else if(idle>12)t4Cycle([
      ()=>t4HintShow('h1',{tag:'Подсказка',title:'Все три — в Пробой',icon:'heads',text:'Оглушите <b>все три</b> головы разом. Средняя — только <b>жёлудем</b> на её долгом вдохе.'},hs.filter(e=>e.state!=='broken'),null),
      ()=>t4HintShow('h2',{tag:'Подсказка',title:'Каждому — своё',icon:'hit',text:'Жёлудь — Прошка, огонь — щит Потапа, сытая — вода Йоши или взор Пелагеи.'},null,[[0,'swap','сменить героя'],[1,'swap','сменить героя']])]);}
  if(F.phase===3){const gr=W.grabs[0],bp=gr?gr.pos():null;const ha=[0,1].map(pi=>active(pi));const near=bp?bp.distanceTo(T4SPOT)<3.2:false;const lifted=bp&&bp.y>0.8;
    if(bp&&!lifted&&idle>4)t4Ctx('grab',()=>t4HintShow('grab',{tag:'Оба игрока',title:'Узда — клещами вдвоём',icon:'tongs',text:'Подойдите к узде с двух сторон и возьмите её <b>клещами</b>.',col:0xffb070},[gr],[[0,'item','клещи'],[1,'item','клещи']],6),8);
    else if(bp&&lifted&&!near)t4Ctx('carry',()=>t4HintShow('carry',{tag:'Оба игрока',title:'К светящемуся кольцу!',icon:'ring',text:'Несите узду <b>вдвоём</b> к кольцу на шее. Не расходитесь!',col:0xffd76a},[T4SPOT.clone().add(new V3(0,1.3,0))],null,5),8);
    else if(bp&&near)t4Ctx('123',()=>t4HintShow('123',{tag:'Оба игрока',title:'Раз-два-три — вместе!',icon:'n123',text:'Нажмите <b>умение</b> в одну секунду!',col:0xffd76a},[T4SPOT.clone().add(new V3(0,1.3,0))],[[0,'skill',''],[1,'skill','']],5),6);}}
function t4Ctx(key,fn,cd){const H=T4.h;if(H.cur&&H.until>G.time&&H.cur.key!=='g1'&&H.cur.key!=='g2'&&H.cur.key!=='g3'&&H.cur.key!=='h1'&&H.cur.key!=='h2')return;if(G.time-(H.cd[key]||-99)<(cd||6))return;fn();}
function t4Cycle(list){const H=T4.h;if(H.cur)return;list[H.cycle%list.length]();H.cycle++;}
// ---------- этапы: ролик сразу после смены фазы ----------
{const _ll=loadLevel;loadLevel=function(i){_ll(i);T4.on=false;T4.ph=-1;T4.props.length=0;T4.arrows=[];if(T4.card)t4Card(null);if(T4.hint)T4.hint.classList.remove('on');
  T4.h=W&&W.levelId==='4-B'?{ph:0,nb:0,prog:0,last:-99,cd:{},cur:null,until:0,cycle:0,n:{y:0,r:0}}:null;};}
{const _step=step;step=function(dt){_step(dt);if(!W||W.levelId!=='4-B')return;const F=W.flags;
  if(T4.auto&&!G.cine&&!G.trans&&F.phase!==T4.ph&&F.phase>=1&&F.phase<=3&&!T4.on){const n=F.phase,prev=T4.ph;T4.ph=n;
    if(!(n===2&&prev===3)){if(t4Seen(n))t4Short(n);else FIN.boss4bStage(n);}   // 3→2 (головы очнулись) — ролик не повторяем
    if(T4.h){T4.h.prog=G.time;T4.h.ph=n;}}
  try{t4HintTick(dt);}catch(e){console.error('boss4b hint',e);}};}
