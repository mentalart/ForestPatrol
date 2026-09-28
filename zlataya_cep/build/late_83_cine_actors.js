/* ============================== РЕЛИЗ · КИНО 2: ЖИВЫЕ ГЕРОИ И ПЕРСОНАЖИ ============================== */
// Процедурная анимация поверх прототипа (все смещения добавочные: в начале кадра снимаются, в конце кладутся заново — логика уровней их не видит).
//  · idle-жизнь: дыхание, покачивание, взгляды по сторонам; в роликах — повороты к говорящему («обмен взглядами»);
//  · эмоции по 12 принципам: anticipation → действие → follow-through, squash & stretch с сохранением объёма, дуги, overshoot;
//    joy (прыжок с вращением), hop, surprise (вытянуться и отпрыгнуть), fear (сжаться и дрожать), pride (грудь вперёд), nod, tilt, flinch, laugh, effort, droop, cheer;
//  · вторичное движение на пружинах: уши, хвост, крылья Пелагеи, лапы Потапа; глаза шире от удивления, «улыбка-щёлочка» от радости;
//  · в роликах: плавные развороты вместо рывков, шаг при скриптовом перемещении, реакции на реплики, награды и удары;
//  · у персонажей (Кот, Яга, Леший, Кощей, Горыныч…) — дыхание, кивки и подпрыгивания на репликах.
const ACT={npcs:[],speaker:null};FIN.actors=ACT;
// ---------- добавочные каналы трансформаций ----------
function aChan(obj){return {obj,p:new V3(),r:new V3(),s:new V3(1,1,1),on:false,np:new V3(),nr:new V3(),ns:new V3(1,1,1)};}
function aRestore(c){if(!c||!c.on)return;const o=c.obj;o.position.sub(c.p);o.rotation.x-=c.r.x;o.rotation.y-=c.r.y;o.rotation.z-=c.r.z;o.scale.x/=c.s.x;o.scale.y/=c.s.y;o.scale.z/=c.s.z;c.on=false;}
function aApply(c){if(!c)return;const o=c.obj;c.p.copy(c.np);c.r.copy(c.nr);c.s.set(Math.max(0.05,c.ns.x),Math.max(0.05,c.ns.y),Math.max(0.05,c.ns.z));
  o.position.add(c.p);o.rotation.x+=c.r.x;o.rotation.y+=c.r.y;o.rotation.z+=c.r.z;o.scale.x*=c.s.x;o.scale.y*=c.s.y;o.scale.z*=c.s.z;c.on=true;c.np.set(0,0,0);c.nr.set(0,0,0);c.ns.set(1,1,1);}
// шарнир: переносит деталь в группу-шарнир с осью в точке pivot (координаты родителя)
function aPivot(mesh,pivot){const par=mesh.parent;if(!par)return null;const g=new THREE.Group();g.position.copy(pivot);par.add(g);g.attach(mesh);return g;}
const angN=a=>{while(a>Math.PI)a-=Math.PI*2;while(a<-Math.PI)a+=Math.PI*2;return a;};
const dampAng=(a,b,k,dt)=>a+angN(b-a)*(1-Math.exp(-k*dt));
// ---------- риги героев (final03: скелетные меши — кости ушей, хвоста, крыльев, клюва, головы, бровей, век и рта) ----------
function rigHero(h){const b=h.body,B=h.rig||{},R={body:aChan(b),ears:[],arms:[],ear:{x:0,v:0,z:0,vz:0},tail:{x:0,v:0,y:0,vy:0},sprY:0,sprV:0,pyPrev:0,pyV:0};
  for(const[n,sg]of[['L',1],['R',-1]])if(B['ear'+n])R.ears.push({g:B['ear'+n],s:sg});
  if(h.parts.tail)R.tailC=aChan(h.parts.tail);
  if(h.kind==='pelageya'){R.wings=(h.parts.wings||[]).map(w=>aChan(w));if(h.parts.beak)R.beak=aChan(h.parts.beak);}
  if(h.kind==='yosha'&&h.parts.ball)R.ball=aChan(h.parts.ball);
  if(B.head&&h.kind!=='yosha')R.headC=aChan(B.head);
  R.face={browL:B.browL,browR:B.browR,lidL:B.lidL,lidR:B.lidR,mouth:B.mouth&&B.mouth!==B.beak?B.mouth:null};
  h._rig=R;h._em=null;h._talk=0;h._yaw=0;h._yawT=0;h._glT=rand(1,3);h._vf=h.face;h._ph=Math.random()*6.28;h._pp=h.pos.clone();h._walk=0;h._eyeS=1;
  h._fc={by:0,bz:0,lid:0,mo:0.32};}
HEROES.forEach(rigHero);
// ---------- эмоции ----------
// каждая: длительность и функция u∈[0,1] → смещения (hs — масштаб героя, sg — сторона для зеркальных реакций)
const EMO={
  joy:{d:0.95,f(u,o,hs,sg){if(u<0.15){const k=CE.outCubic(u/0.15);o.sy-=0.22*k;o.eyeY=1-0.4*k;}
    else if(u<0.62){const k=(u-0.15)/0.47;o.py+=0.5*hs*Math.sin(Math.PI*k);o.sy+=0.18*(1-k)-0.04;o.ry+=sg*Math.PI*2*CE.inOutCubic(k);o.eyeY=0.45;o.arms=1;o.wing=1;}
    else if(u<0.78){const k=(u-0.62)/0.16;o.sy-=0.2*Math.sin(Math.PI*k);o.eyeY=0.5;o.arms=0.6;}
    else{const k=(u-0.78)/0.22;o.sy+=0.06*Math.sin(k*Math.PI*2)*(1-k);o.eyeY=0.5+0.5*k;}}},
  hop:{d:0.55,f(u,o,hs){if(u<0.2){o.sy-=0.14*CE.outCubic(u/0.2);}else if(u<0.7){const k=(u-0.2)/0.5;o.py+=0.22*hs*Math.sin(Math.PI*k);o.sy+=0.1*(1-k);o.eyeY=0.6;o.arms=0.5;o.wing=0.6;}
    else{const k=(u-0.7)/0.3;o.sy-=0.1*Math.sin(Math.PI*k)*(1-k*0.5);}}},
  surprise:{d:0.8,f(u,o,hs){if(u<0.1){o.sy-=0.1*(u/0.1);}else if(u<0.38){const k=CE.outBack((u-0.1)/0.28);o.sy+=0.28*k;o.sx-=0.1*k;o.pz-=0.28*hs*k;o.py+=0.16*hs*Math.sin(Math.PI*Math.min(1,(u-0.1)/0.28));o.eye=1.45;o.arms=0.8;o.wing=1;o.earK=1;}
    else{const k=(u-0.38)/0.62,e=Math.exp(-4*k);o.sy+=0.28*e*Math.cos(k*12);o.pz-=0.28*hs*(1-CE.inOutCubic(k));o.rz+=0.09*e*Math.sin(k*18);o.eye=1+0.45*(1-k);}}},
  fear:{d:1.15,f(u,o){const a=u<0.12?CE.outCubic(u/0.12):u>0.85?1-CE.inOutCubic((u-0.85)/0.15):1;o.sy-=0.2*a;o.sx+=0.1*a;o.sz+=0.1*a;o.rz+=Math.sin(u*120)*0.06*a;o.px+=Math.sin(u*97)*0.02*a;o.eye=1+0.3*a;o.earK=-0.8*a;}},
  pride:{d:1.3,f(u,o){const a=u<0.15?-0.4*CE.outCubic(u/0.15):u<0.8?CE.outBack(Math.min(1,(u-0.15)/0.3)):1-CE.inOutCubic((u-0.8)/0.2);o.rx-=0.22*Math.max(0,a);o.sy+=0.07*a;o.sx+=0.03*Math.max(0,a);o.eyeY=a>0.5?0.7:1;o.arms=0.35*Math.max(0,a);}},
  nod:{d:0.55,f(u,o){o.rx+=0.2*Math.sin(Math.PI*Math.min(1,u*1.6))*(u<0.62?1:0)-0.05*Math.sin(Math.PI*clamp((u-0.62)/0.38,0,1));}},
  tilt:{d:0.9,f(u,o,hs,sg){const a=u<0.3?CE.outBack(u/0.3):u>0.75?1-CE.inOutCubic((u-0.75)/0.25):1;o.rz+=0.24*sg*a;o.eye=1+0.12*a;}},
  flinch:{d:0.42,f(u,o,hs){const a=u<0.2?CE.outCubic(u/0.2):Math.exp(-5*(u-0.2))*Math.cos((u-0.2)*14);o.sy-=0.14*a;o.pz-=0.12*hs*a;o.rx-=0.16*a;o.eye=1+0.3*Math.max(0,a);o.earK=-0.6*a;}},
  laugh:{d:1.1,f(u,o,hs){const a=Math.sin(Math.PI*u);o.sy+=0.07*Math.abs(Math.sin(u*28))*a;o.py+=0.05*hs*Math.abs(Math.sin(u*28))*a;o.rz+=0.07*Math.sin(u*20)*a;o.rx-=0.1*a;o.eyeY=1-0.55*a;o.wing=0.5*a;}},
  effort:{d:0.7,f(u,o){if(u<0.3){const k=CE.outCubic(u/0.3);o.rx-=0.2*k;o.sy+=0.05*k;o.arms=0.6*k;}else if(u<0.5){const k=(u-0.3)/0.2;o.rx+=-0.2+0.5*CE.outBack(k);o.sy-=0.12*k;o.armF=1;}
    else{const k=(u-0.5)/0.5;o.rx+=0.3*(1-CE.inOutCubic(k));o.sy-=0.12*(1-k);}}},
  droop:{d:1.6,f(u,o){const a=u<0.3?CE.inOutSine(u/0.3):u>0.8?1-CE.inOutSine((u-0.8)/0.2):1;o.rx+=0.16*a;o.sy-=0.05*a;o.eyeY=1-0.3*a;o.earK=-0.7*a;}},
  cheer:{d:1.5,f(u,o,hs,sg){const k=u<0.5?u/0.5:(u-0.5)/0.5;EMO.hop.f(k,o,hs);o.arms=1;o.wing=1;o.rz+=0.08*sg*Math.sin(u*Math.PI*4);}}};
ACT.emote=function(h,type,delay){if(!h||!EMO[type])return;const go=()=>{h._em={type,t:0,d:EMO[type].d,sg:h._sg||(h.player?-1:1)};CINE.emit('emote',{who:h.kind||h.who,type,pos:h.pos||h.g.position});};
  if(delay>0&&W&&W.timers)later(delay,go);else go();};
ACT.emoteAll=function(type,near,stagger){const c=near||shared.look;let k=0;for(const h of HEROES){if(!h.g.visible||hd(h.pos,c)>14)continue;h._sg=(k%2?-1:1)*(h.player?-1:1);ACT.emote(h,type,(stagger==null?0.07:stagger)*k++);}};
// ---------- реплики: эмоция по тексту, говорящий, взгляды, камера ----------
function emoOf(text){const t=String(text||'').replace(/<[^>]*>/g,'');const low=t.toLowerCase();
  if(/ха-ха|хи-хи/.test(low))return 'laugh';if(/ура|дзинь!|полетели/.test(low))return 'joy';if(/^\(?(тихо|шёпотом|вполголоса|очень тихо)/.test(low)||/^\(засыпая/.test(low))return 'droop';
  if(/хэк|ну-ка|эй, ухнем/.test(low))return 'effort';if(/\?!|!\?|^ой|ой!/.test(low))return 'surprise';if(/спасибо/.test(low))return 'nod';if(/я же говорил|предусмотрел|конструкция/.test(low))return 'pride';
  if(/!/.test(t))return 'hop';if(/\?/.test(t))return 'tilt';if(/…\s*$/.test(t))return 'droop';return null;}
function npcByWho(who){const id=/^gor[LMR]$/.test(who)?'gor':who;for(let i=ACT.npcs.length-1;i>=0;i--){const n=ACT.npcs[i];if(n.who===id&&n.o.g&&n.o.g.parent&&n.o.g.visible!==false)return n;}return null;}
CINE.locate=function(who){const h=HERO[who];if(h){if(!h.g.visible||(h.body&&!h.body.visible))return null;return {size:h.d.height,obj:h,hero:true,head:()=>new V3(h.pos.x,h.pos.y+h.d.height*0.78,h.pos.z)};}
  if(who==='zven'&&W&&W.zven&&W.zven.g&&W.zven.g.visible)return {size:0.7,head:()=>W.zven.g.getWorldPosition(new V3())};
  if(/^gor[LMR]$/.test(who)&&W&&W.enemies){const hs=W.enemies.filter(e=>e.kind==='golova'&&e.g&&e.g.visible!==false);if(hs.length>=3){const e=hs[who==='gorL'?0:who==='gorR'?2:1];
      return {size:1.4*(e.s||1),head:()=>{const p=e.g.getWorldPosition(new V3());p.y+=1.1*(e.s||1);return p;}};}}   // головы-противники в бою 4-Б
  const n=npcByWho(who);if(!n)return null;if(!n.size){try{const bx=new THREE.Box3().setFromObject(n.o.g),sz=bx.getSize(new V3());n.size=clamp(sz.y,0.6,7);n.top=bx.max.y-n.o.g.getWorldPosition(new V3()).y;}catch(e){n.size=1.6;n.top=1.4;}}
  if(n.who==='gor'&&n.o.necks){const k=who==='gorL'?0:who==='gorR'?2:1,nk=n.o.necks[k];return {size:3,head:()=>nk.localToWorld(new V3(0,1.9,0))};}
  return {size:n.size,obj:n,head:()=>{if(n.o.head)return n.o.head.getWorldPosition(new V3());const p=n.o.g.getWorldPosition(new V3());p.y+=n.top*0.85;return p;}};};
function cineSay(who,text,dur){dur=dur||2.5;const emo=emoOf(text),inCine=!!G.cine;ACT.speaker={who,until:G.time+dur};
  const h=HERO[who];if(h){h._talk=Math.max(h._talk,Math.min(dur,4));const still=Math.hypot(h.vel.x,h.vel.z)<0.25&&h.grounded;if(emo&&(inCine||still))ACT.emote(h,emo,0.08);}
  const n=npcByWho(who);if(n){n.talk=Math.max(n.talk||0,Math.min(dur,4));if(emo&&emo!=='droop')n.em={type:emo==='laugh'?'laugh':emo==='surprise'?'surprise':emo==='nod'?'nod':'hop',t:0,d:0.6};}
  if(inCine){CINE.onSay(who,text,dur);CINE.emit('say',{who,text,dur,emo});
    // слушатели: «спасибо» — кивают; восклицание персонажа — удивляются
    if(!h&&n){if(/спасибо/i.test(text))HEROES.forEach((x,i)=>{if(x.g.visible&&hd(x.pos,n.o.g.position)<9)ACT.emote(x,'nod',0.3+i*0.08);});
      else if(/!/.test(text)&&!/\?/.test(text)&&Math.random()<0.5)HEROES.forEach((x,i)=>{if(x.g.visible&&hd(x.pos,n.o.g.position)<9)ACT.emote(x,'flinch',0.15+i*0.06);});}}}
{const _say=say;say=function(who,text,dur,noVoice){_say(who,text,dur,noVoice);try{cineSay(who,text,dur);}catch(e){console.error(e);}};}
// ---------- персонажи: реестр по конструкторам ----------
function regNpc(o,who){try{if(o&&o.g)ACT.npcs.push({o,who,ph:Math.random()*6.28,body:o.body?aChan(o.body):null,head:o.head&&o.head!==o.body?aChan(o.head):null,talk:0,em:null});}catch(e){}return o;}
{const wr=(f,id)=>function(){return regNpc(f.apply(this,arguments),typeof id==='function'?id(arguments[0]):id);};
  makeKot=wr(makeKot,'kot');makeYaga=wr(makeYaga,'yaga');makeKikimora=wr(makeKikimora,'kiki');makeLeshy=wr(makeLeshy,'leshy');makeKolobok=wr(makeKolobok,'kolobok');
  makeKoschei=wr(makeKoschei,'koschei');makeKuzma=wr(makeKuzma,'kuzma');makeSadko=wr(makeSadko,'sadko');makeStarik=wr(makeStarik,'starik');makeRybka=wr(makeRybka,'rybka');
  makeFirebird=wr(makeFirebird,'zhar');makeSolovei=wr(makeSolovei,'solovei');makeTishka=wr(makeTishka,'tishka');makePechka=wr(makePechka,'pechka');makeYablonka=wr(makeYablonka,'yablonka');
  makeGorynych=wr(makeGorynych,'gor');makeGorynych5=wr(makeGorynych5,'gor');makeLikho=wr(makeLikho,'likho');makeBogatyr=wr(makeBogatyr,'bogatyr');
  makeHare=wr(makeHare,'hare');makeDuck=wr(makeDuck,'duck');
  makeSirin=wr(makeSirin,a=>a==='alkonost'?'alkonost':'sirin');makeSmith=wr(makeSmith,a=>a==='demyan'?'demyan':'kuzst');}
{const _ll=loadLevel;loadLevel=function(i){ACT.npcs.length=0;ACT.speaker=null;_ll(i);};}
// ---------- кадр ----------
function aRestoreAll(){for(const h of HEROES){const R=h._rig;aRestore(R.body);aRestore(R.headC);aRestore(R.tailC);if(R.wings)R.wings.forEach(aRestore);aRestore(R.beak);aRestore(R.ball);}
  for(const n of ACT.npcs){aRestore(n.body);aRestore(n.head);}}
const AO={px:0,py:0,pz:0,rx:0,ry:0,rz:0,sx:1,sy:1,sz:1,eye:1,eyeY:1,arms:0,armF:0,wing:0,earK:0};
function aoReset(){AO.px=AO.py=AO.pz=AO.rx=AO.ry=AO.rz=0;AO.sx=AO.sy=AO.sz=1;AO.eye=1;AO.eyeY=1;AO.arms=0;AO.armF=0;AO.wing=0;AO.earK=0;}
function heroLife(h,dt){const R=h._rig,b=h.body,cine=!!G.cine,hs=h.d.height/1.25,sp=Math.hypot(h.vel.x,h.vel.z),still=sp<0.25&&h.grounded&&!h.atkT&&!h.rollT&&!h.cling&&!h.hang;aoReset();
  if(!b.visible||!h.g.visible){h._pp.copy(h.pos);return;}
  // дыхание и покачивание (объём сохраняется)
  const br=Math.sin(G.time*2.3+h._ph)*(still?0.024:0.01);AO.sy+=br;AO.sx-=br*0.5;AO.sz-=br*0.5;if(cine&&still)AO.rz+=Math.sin(G.time*1.25+h._ph)*0.028;
  // скриптовое перемещение в роликах — шаг, а не скольжение
  if(cine){const mv=h._pp.distanceTo(h.pos)/Math.max(dt,1e-3);if(mv>0.5&&mv<14&&sp<0.3){h._walk+=dt*mv*(h.kind==='potap'?1.5:2.3);AO.py+=Math.abs(Math.sin(h._walk))*0.08*hs;AO.rz+=Math.sin(h._walk)*0.07;
      if(FIN.heroWalk)FIN.heroWalk(h,h._walk,1);}}
  h._pp.copy(h.pos);
  // плавный разворот вместо рывка
  if(cine){h._vf=dampAng(h._vf,h.face,9,dt);h.g.rotation.y=h._vf;}else h._vf=h.face;
  // взгляд: на говорящего в ролике, иначе иногда по сторонам
  let yt=0;const S=ACT.speaker;if(S&&S.until>G.time&&S.who!==h.kind&&(cine||still)){const L=CINE.locate(S.who);if(L){const p=L.head();if(hd(p,h.pos)<10){yt=clamp(angN(Math.atan2(p.x-h.pos.x,p.z-h.pos.z)-h._vf),-0.8,0.8)*0.85;}}}
  else if(still){h._glT-=dt;if(h._glT<=0){h._glT=rand(1.6,4.2);h._yawT=Math.random()<0.45?0:rand(-0.45,0.45);}yt=h._yawT;}
  h._yaw=damp(h._yaw,yt,h._em?9:4.5,dt);if(R.headC){R.headC.nr.y+=h._yaw*0.6;AO.ry+=h._yaw*0.4;}else AO.ry+=h._yaw;
  // речь
  if(h._talk>0){h._talk-=dt;const s=Math.max(0,Math.sin(G.time*15+h._ph)),e=Math.min(1,h._talk*3);AO.sy+=0.045*s*e;AO.rx-=0.05*s*e;AO.wing=Math.max(AO.wing,0.15*e);
    if(R.beak)R.beak.nr.x+=0.35*s*e;}
  // эмоция
  if(h._em){const E0=h._em;E0.t+=dt;const u=Math.min(1,E0.t/E0.d);EMO[E0.type].f(u,AO,hs,E0.sg);if(u>=1)h._em=null;}
  if(h.kind==='pelageya'&&W.owlT>0)AO.eye=Math.max(AO.eye,1.28);   // Совиный взор — глаза шире
  // пружины: уши и хвост отстают от тела
  const pyV=(AO.py-R.pyPrev)/Math.max(dt,1e-3);R.pyPrev=AO.py;const acc=(pyV-R.pyV)/Math.max(dt,1e-3);R.pyV=pyV;const drive=clamp(-acc*0.004+(h.grounded?0:-h.vel.y*0.03),-0.9,0.9);
  const E1=R.ear;E1.v+=((drive+AO.earK*0.5)-E1.x)*140*dt-E1.v*9*dt;E1.x+=E1.v*dt;
  for(const e of R.ears){e.g.rotation.x=clamp(E1.x,-0.8,0.8);e.g.rotation.z=-e.s*clamp(E1.x*0.4+AO.earK*0.15,-0.5,0.5);}
  if(R.tailC){const T=R.tail;const yawV=angN(h.face-(h._fPrev==null?h.face:h._fPrev))/Math.max(dt,1e-3);h._fPrev=h.face;
    T.v+=(-drive*0.8-T.x)*90*dt-T.v*7*dt;T.x+=T.v*dt;T.vy+=(-yawV*0.12-T.y)*80*dt-T.vy*6*dt;T.y+=T.vy*dt;R.tailC.nr.x+=clamp(T.x,-0.7,0.7);R.tailC.nr.y+=clamp(T.y,-0.8,0.8)+(h._em||h._talk>0?Math.sin(G.time*14)*0.25:0);}
  if(R.wings&&AO.wing>0)R.wings.forEach(w=>{w.nr.z+=w.obj.userData.s*Math.sin(G.time*28)*0.55*AO.wing;});
  h._armUp=damp(h._armUp||0,AO.arms,14,dt);h._armF=damp(h._armF||0,AO.armF,16,dt);
  // лицо: удивление — брови вверх и рот «О», радость — рот открыт, страх и грусть — брови домиком, усилие — брови нахмурены, гордость и сонливость — веки прикрыты, речь — рот
  {const F=R.face,fc=h._fc,em=h._em?h._em.type:null;let by=0,bz=0,lid=0,mo=0.32;
    if(AO.eye>1){by+=(AO.eye-1)*0.1;mo=Math.max(mo,0.32+(AO.eye-1)*1.5);}if(AO.eyeY<1)mo=Math.max(mo,0.32+(1-AO.eyeY)*1.2);
    if(AO.earK<0)bz-=AO.earK*0.45;if(em==='effort'){bz-=0.45;mo=0.18;}if(em==='droop'){lid=0.55;}if(em==='pride'){lid=0.35;by-=0.01;}if(em==='flinch')lid=Math.max(lid,0.7);if(em==='tilt')by+=0.03;
    if(h._talk>0){const e=Math.min(1,h._talk*3);mo=Math.max(mo,0.32+0.85*Math.abs(Math.sin(G.time*14+h._ph))*e);}
    fc.by=damp(fc.by,by,14,dt);fc.bz=damp(fc.bz,bz,12,dt);fc.lid=damp(fc.lid,lid,12,dt);fc.mo=damp(fc.mo,mo,20,dt);const hs2=h.d.height/1.25;
    for(const[n,sg]of[['L',1],['R',-1]]){const bw=F['brow'+n];if(bw){if(bw.userData.y0==null)bw.userData.y0=bw.position.y;bw.position.y=bw.userData.y0+fc.by*hs2;bw.rotation.z=-sg*fc.bz;}
      const ld=F['lid'+n];if(ld)ld.rotation.x=-1.85+fc.lid*3.25;}
    if(F.mouth){F.mouth.scale.y=fc.mo;F.mouth.scale.x=1-Math.max(0,fc.mo-0.9)*0.3;}}
  // глаза: шире от удивления, щёлочкой от радости
  h._eyeS=damp(h._eyeS,AO.eye,14,dt);h._eyeY=damp(h._eyeY==null?1:h._eyeY,AO.eyeY,14,dt);if(h.eyes)for(const e of h.eyes){e.scale.x=h._eyeS;e.scale.z=h._eyeS;e.scale.y*=h._eyeS*h._eyeY;}
  if(R.ball){const j=Math.sin(G.time*18)*0.04*(h._em?1:0);R.ball.ns.y*=1+j;}
  const c=R.body;c.np.set(AO.px,AO.py,AO.pz);c.nr.set(AO.rx,AO.ry,AO.rz);c.ns.set(AO.sx,AO.sy,AO.sz);}
function npcLife(n,dt){const o=n.o;if(!o.g.parent||!n.body)return;const t=G.time+n.ph,c=n.body;
  const br=Math.sin(t*2.1)*0.018;c.ns.set(1-br*0.5,1+br,1-br*0.5);c.nr.z+=Math.sin(t*1.1)*0.015;
  if(n.talk>0){n.talk-=dt;const s=Math.max(0,Math.sin(t*13)),e=Math.min(1,n.talk*3);c.ns.y*=1+0.035*s*e;c.np.y+=0.02*s*e*(n.size||1.5)*0.3;if(n.head){n.head.nr.x+=0.09*Math.sin(t*9)*e;n.head.nr.z+=0.06*Math.sin(t*5.3)*e;}else c.nr.x+=0.04*s*e;}
  if(n.em){n.em.t+=dt;const u=Math.min(1,n.em.t/n.em.d),sz=(n.size||1.5)/1.5;
    if(n.em.type==='nod'){if(n.head)n.head.nr.x+=0.25*Math.sin(Math.PI*u);else c.nr.x+=0.12*Math.sin(Math.PI*u);}
    else if(n.em.type==='laugh'){c.ns.y*=1+0.06*Math.abs(Math.sin(u*25));c.nr.z+=0.06*Math.sin(u*18);}
    else if(n.em.type==='surprise'){const k=Math.sin(Math.PI*Math.min(1,u*1.6));c.ns.y*=1+0.18*k;c.ns.x*=1-0.07*k;c.np.z-=0.15*sz*k;}
    else{if(u<0.2)c.ns.y*=1-0.12*(u/0.2);else{const k=(u-0.2)/0.8;c.np.y+=0.18*sz*Math.sin(Math.PI*k);c.ns.y*=1+0.08*(1-k);}}
    if(u>=1)n.em=null;}}
{const _step=step;step=function(dt){aRestoreAll();_step(dt);const ad=dt*CINE.timeScale();
  for(const h of HEROES){heroLife(h,ad);const R=h._rig;aApply(R.body);if(R.headC)aApply(R.headC);if(R.tailC)aApply(R.tailC);if(R.wings)R.wings.forEach(aApply);if(R.beak)aApply(R.beak);if(R.ball)aApply(R.ball);}
  for(let i=ACT.npcs.length-1;i>=0;i--){const n=ACT.npcs[i];if(!n.o.g.parent){ACT.npcs.splice(i,1);continue;}npcLife(n,ad);if(n.body)aApply(n.body);if(n.head)aApply(n.head);}};}
// ---------- реакции на акценты ролика ----------
CINE.on('accent',d=>{if(d.type==='reward')ACT.emoteAll(d.bad?'surprise':'joy');else if(d.type==='flash')ACT.emoteAll('surprise',null,0.05);});
CINE.on('impact',d=>{ACT.emoteAll(d.amp>=0.3?'fear':'flinch',null,0.04);});
