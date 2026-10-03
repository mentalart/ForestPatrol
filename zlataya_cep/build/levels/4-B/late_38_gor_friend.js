/* ============================== РЕЛИЗ final06 · 4-Б «ЗМЕЙ ГОРЫНЫЧ»: РОЛИК ПОСЛЕ ПОБЕДЫ — ГОРЫНЫЧ СТАЛ ДРУГОМ ============================== */
// По отзыву: прежний ролик (головы лежат на земле, средняя крупно, героев не видно, узда висит за головой) не радовал.
// Новый ролик (~32 с), шесть сцен:
//  1) узда на шее средней головы вспыхивает золотом — головы поднимаются с земли, отряхиваются;
//  2) головы переглядываются и впервые кивают вместе («три головы — одно сердце»), герои переглядываются;
//  3) средняя опускается к героям — герои отпрыгивают, — фыркает дымом: кольца дыма, одно садится Прошке на голову;
//  4) «Уговор есть уговор»; сонная голова зевает и кладёт подбородок к Потапу, голодная обнюхивает Прошку — смех;
//  5) салют: три головы встают к небу и пускают огненные ракеты своих цветов, конфетти, герои ликуют;
//  6) общий кадр «на память»: герои лицом к камере, головы над ними улыбаются.
// Позы голов — добавочно к прототипу, после его шага (как g4Pose в late_98); шеи и промежуточные шары пересчитываются.
// Пропуск ролика (оба держат прыжок) ставит конечную расстановку. Подключение — rep_30 (win → FIN.gor4End).
const GF={on:false,done:false,S:null,t:0,ring:[],rk:[],fl:[],stats:{plays:0,rockets:0,rings:0,hat:false}};FIN.gor4End=null;FIN.gorFriend=GF;
const gfK=(t,a,b)=>clamp((t-a)/(b-a),0,1),gfS=(t,a,b)=>smooth(gfK(t,a,b));
const gfBack=k=>{const c=1.6;k=clamp(k,0,1);return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2);};   // с небольшим перелётом
const gfBell=(t,a,b)=>{const k=gfK(t,a,b);return Math.sin(k*Math.PI);};
const GF_HP=[[-5.4,-9.6],[0,-10.8],[5.4,-9.6]];
// места героев: Потап и Йоша — слева (к сонной голове), Прошка и Пелагея — справа (к голодной)
const GF_SPOT={potap:[-2.1,-5.5],yosha:[-0.75,-4.9],proshka:[0.85,-4.9],pelageya:[2.2,-5.5]};
const GF_PHOTO={potap:[-2.4,-5.0],yosha:[-0.8,-4.6],proshka:[0.8,-4.6],pelageya:[2.4,-5.0]};
const GF_COL=[0xffd23a,0xffb84a,0xff5a3a];   // салют: сонная — жёлтый, средняя — золотой, голодная — красный
// ---------- поза голов по времени ролика ----------
function gfHead(i,t){const P={dx:0,dz:0,lift:0,yaw:0,pitch:0,roll:0,jaw:0.1,mood:'happy'};
  // 1) поднимаются с земли: из «лежит» (-0,5) вверх с перелётом; морда снизу вверх; на 1,9–2,9 с — отряхиваются
  const up=gfBack(gfK(t,0.35+i*0.12,1.5+i*0.12));P.lift=-0.5+1.4*up;P.pitch=0.45-0.65*up;P.roll=Math.sin((t-1.9)*26)*0.12*gfBell(t,1.9,2.9);
  P.mood=t<3.6?'surprise':'happy';
  // 2) переглядываются: боковые — к средней, средняя — влево, вправо; затем все трое кивают дважды вместе
  if(i===0)P.yaw=1.15*gfS(t,4.0,4.6)*(1-gfS(t,6.0,6.5));
  if(i===2)P.yaw=-1.15*gfS(t,4.2,4.8)*(1-gfS(t,6.0,6.5));
  if(i===1)P.yaw=-0.75*gfS(t,4.3,4.8)*(1-gfS(t,4.9,5.3))+0.75*gfS(t,4.9,5.4)*(1-gfS(t,5.6,6.1));
  P.pitch+=0.32*Math.max(0,Math.sin((t-6.6)*Math.PI/0.45))*gfK(t,6.6,6.7)*(1-gfK(t,7.5,7.6));
  // 3) средняя опускается к героям, фыркает (рывок вверх), смотрит на героев; боковые глядят на героев
  if(i===1){const c=gfS(t,8.4,9.6)*(1-gfS(t,12.8,13.6));P.dz+=3.0*c;P.lift-=0.75*c;P.pitch+=0.28*c;
    const sn=gfBell(t,9.9,10.4);P.pitch-=0.35*sn;P.jaw+=0.25*sn;P.dz+=1.4*gfS(t,12.8,13.6)*(1-gfS(t,22.2,23.0));}
  else{const s=i===0?1:-1;P.yaw+=0.45*s*gfS(t,8.6,9.4)*(1-gfS(t,i===0?14.0:18.2,i===0?14.6:18.8));P.lift-=0.25*gfS(t,8.6,9.4);}
  // 4) сонная — к Потапу: тянется, опускает подбородок, зевает; голодная — к Прошке: тянется, нюхает
  if(i===0){const c=gfS(t,14.4,15.6)*(1-gfS(t,22.2,23.0));P.dx+=2.9*c;P.dz+=2.3*c;P.lift-=0.55*c;P.pitch+=0.32*c;P.yaw+=0.5*c;
    const yawn=gfBell(t,15.4,16.6);P.jaw+=1.0*yawn;P.pitch-=0.45*yawn;if(t>14.4&&t<22.2)P.mood='sleepy';}
  if(i===2){const c=gfS(t,18.6,19.6)*(1-gfS(t,22.2,23.0));P.dx-=2.9*c;P.dz+=2.5*c;P.lift-=0.5*c;P.pitch+=0.28*c;P.yaw-=0.5*c;
    const sn=gfK(t,19.5,21.0)*(1-gfK(t,21.0,21.1));P.pitch+=Math.sin(t*34)*0.06*sn;P.jaw+=Math.max(0,Math.sin(t*34))*0.12*sn;}
  // 5) салют: все к небу; пасть открыта на залп
  const sky=gfS(t,22.8,23.6)*(1-gfS(t,27.2,28.0));P.lift+=1.1*sky;P.pitch-=0.6*sky;
  for(const v of[0,1])P.jaw+=0.95*gfBell(t,23.5+v*1.6+i*0.35,24.1+v*1.6+i*0.35);
  // 6) общий кадр: головы над героями, слегка наклонены к ним
  const ph=gfS(t,27.4,28.6);if(ph>0){const T=[[2.0,2.2,0.55,0.35],[0,2.8,0.75,0],[-2.0,2.2,0.55,-0.35]][i];
    P.dx=lerp(P.dx,T[0],ph);P.dz=lerp(P.dz,T[1],ph);P.lift=lerp(P.lift,T[2],ph);P.yaw=lerp(P.yaw,T[3],ph);P.pitch=lerp(P.pitch,0.08,ph);P.roll=Math.sin(t*2.2+i)*0.06*ph;}
  return P;}
function gfApply(t){const L=W.gor4L;if(!L)return;const hs=L.heads();
  hs.forEach((e,i)=>{if(!e||!e.L)return;const P=gfHead(i,t),b=GF_HP[i];e.pos.x=b[0]+P.dx;e.pos.z=b[1]+P.dz;
    e.pos.y=Math.sin(G.time*1.5+i)*0.12+P.lift;e.face=P.yaw;e.g.rotation.y=P.yaw;
    if(e.L.head){e.L.head.rotation.x=P.pitch;e.L.head.rotation.z=P.roll;}if(e.L.jaw)e.L.jaw.rotation.x=P.jaw;
    // лицо: удивление — глаза шире и брови вверх; радость — прищур; сонная — веки полуприкрыты
    const F=e.ff;if(F&&F.lids){const lid=P.mood==='sleepy'?0.62:P.mood==='happy'?0.3:0;const bl=F.bt>=0?Math.max(0,1-Math.abs(F.bt/0.16-0.5)*2):0;
      F.lids.forEach(l=>{l.rotation.x=-2.3+Math.max(lid,bl)*3.5;});
      F.brows.forEach(bw=>{bw.m.rotation.z=bw.s*(P.mood==='surprise'?-0.35:P.mood==='happy'?-0.18:0.1);bw.m.position.y=F.r*(1.25+(P.mood==='surprise'?0.3:P.mood==='happy'?0.12:-0.05));});
      F.eyes.forEach(E=>{E.pu.position.set(0,P.mood==='happy'?0.05*F.r:0,E.pu.position.z);E.ir.position.set(0,0,E.ir.position.z);});}});
  if(L.updNecks)L.updNecks();const E=FIN.gor4&&FIN.gor4.env;if(E&&E.mids)for(const q of E.mids)q.m.position.lerpVectors(q.a.position,q.b.position,0.5);}
// ---------- герои по времени ролика ----------
function gfHeroes(t){const lookM=(h)=>{const m=W.gor4L.heads()[1];return m?Math.atan2(m.pos.x-h.pos.x,m.pos.z-h.pos.z):Math.PI;};
  for(const k in GF_SPOT){const h=HERO[k];if(!h||!h.g.visible)continue;const s=GF_SPOT[k],ph=GF_PHOTO[k];
    // 3) отпрыгивают, когда средняя опускается; 4) Потап шагает к сонной голове, Прошка — к голодной
    let x=s[0],z=s[1];const back=gfS(t,8.7,9.2)*(1-gfS(t,10.8,11.6));z+=0.9*back;
    if(k==='potap'){const c=gfS(t,15.2,16.0)*(1-gfS(t,22.2,22.8));x-=0.5*c;z-=0.9*c;}
    if(k==='proshka'){const c=gfS(t,19.2,19.8)*(1-gfS(t,22.2,22.8));x+=0.5*c;z-=0.7*c;}
    const p=gfS(t,27.2,28.2);x=lerp(x,ph[0],p);z=lerp(z,ph[1],p);
    if(Math.hypot(h.pos.x-x,h.pos.z-z)>0.004){h.pos.x=x;h.pos.z=z;}
    let f=lookM(h);if(k==='potap'&&t>14.8&&t<22.6){const l=W.gor4L.heads()[0];if(l)f=Math.atan2(l.pos.x-h.pos.x,l.pos.z-h.pos.z);}
    if(k==='proshka'&&t>18.8&&t<22.6){const r=W.gor4L.heads()[2];if(r)f=Math.atan2(r.pos.x-h.pos.x,r.pos.z-h.pos.z);}
    if(t>=27.7)f=0;   // общий кадр — лицом к камере
    h.face=f;}}
// ---------- кольца дыма и салют ----------
const GF_RING=new THREE.TorusGeometry(0.34,0.1,8,28);
function gfSmokeRings(from){const hat=HERO.proshka&&HERO.proshka.g.visible?HERO.proshka:null;
  for(let i=0;i<3;i++){const m=new THREE.Mesh(GF_RING,new THREE.MeshLambertMaterial({color:i?0xb8b2aa:0xd8d2ca,transparent:true,opacity:0,depthWrite:false}));m.userData.noBatch=true;m.userData.occEx=true;m.castShadow=false;
    m.position.copy(from);W.group.add(m);GF.ring.push({m,t:-i*0.32,from:from.clone(),hat:i===1&&hat?hat:null,v:new V3(rand(-0.4,0.4),1.0+i*0.25,rand(0.6,1.0))});GF.stats.rings++;}
  if(FX.dust)FX.dust(from.clone(),10,0xc8c2b8,0.8);}
function gfRingTick(dt){for(let k=GF.ring.length-1;k>=0;k--){const R=GF.ring[k];R.t+=dt;const m=R.m;if(R.t<0){m.material.opacity=0;continue;}
    if(R.hat){// это кольцо летит Прошке на голову и сидит там, как нимб
      const top=R.hat.pos.clone().add(new V3(0,heroHeight(R.hat)+0.12,0)),k2=smooth(Math.min(1,R.t/1.6));m.position.lerpVectors(R.from,top,k2);m.position.y+=Math.sin(k2*Math.PI)*1.1;
      m.rotation.set(Math.PI/2*(0.4+0.6*k2),0,0);m.scale.setScalar(1-0.35*k2);m.material.opacity=Math.min(0.9,R.t*3)*(R.t>5.5?Math.max(0,1-(R.t-5.5)/1.2):1);
      if(k2>=1&&!R.landed){R.landed=true;GF.stats.hat=true;if(FX.sparkle)FX.sparkle(top,6,0xffffff);ACT.emote(R.hat,'pride');}
      if(R.t>6.8){if(m.parent)m.parent.remove(m);GF.ring.splice(k,1);}continue;}
    m.position.addScaledVector(R.v,dt);m.rotation.x=Math.PI/2*0.7;m.scale.setScalar(1+R.t*0.9);m.material.opacity=Math.min(0.85,R.t*3)*Math.max(0,1-R.t/2.6);
    if(R.t>2.6){if(m.parent)m.parent.remove(m);GF.ring.splice(k,1);}}}
function gfMouth(e){const p=new V3();(e.L&&e.L.head?e.L.head:e.g).getWorldPosition(p);p.y+=0.1;p.x+=Math.sin(e.face)*1.0;p.z+=Math.cos(e.face)*1.0;return p;}
function gfRocket(i){const e=W.gor4L.heads()[i];if(!e)return;const from=gfMouth(e),col=GF_COL[i];
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:UZ_GLOW,color:col,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,toneMapped:false}));sp.raycast=()=>{};
  sp.scale.setScalar(0.9);sp.position.copy(from);sp.userData.noBatch=true;sp.userData.occEx=true;W.group.add(sp);
  GF.rk.push({sp,t:0,from,to:new V3(from.x+(i-1)*1.8+rand(-0.5,0.5),rand(5.8,6.6),from.z+rand(-0.6,0.4)),col,tr:0});GF.stats.rockets++;tone(300+i*80,0.35,'sawtooth',0.06,900+i*120);}
function gfRocketTick(dt){for(let k=GF.rk.length-1;k>=0;k--){const R=GF.rk[k];R.t+=dt;const q=Math.min(1,R.t/0.75),e=1-Math.pow(1-q,2);R.sp.position.lerpVectors(R.from,R.to,e);
    R.tr-=dt;if(R.tr<=0&&FX.sparkle){R.tr=0.03;FX.sparkle(R.sp.position.clone(),1,R.col);}
    if(q>=1){const p=R.to;R.sp.position.copy(p);R.sp.scale.setScalar(4.5);GF.fl.push({sp:R.sp,t:0});R.sp=null;if(FX.sparks)FX.sparks(p,34,R.col);if(FX.stars)FX.stars(p,8,0xfff2b0);if(FX.sparkle)FX.sparkle(p,14,0xffffff);if(CINE.rimPulse)CINE.rimPulse(0.5);
      tone(140,0.3,'triangle',0.12,60);tone(1200+R.col%400,0.18,'sine',0.05,null,0.05);GF.rk.splice(k,1);}}
  // вспышка разрыва: большое пятно цвета ракеты, гаснет за 0,5 с
  for(let k=GF.fl.length-1;k>=0;k--){const f=GF.fl[k];f.t+=dt;const q=f.t/0.5;f.sp.scale.setScalar(4.5+3*q);f.sp.material.opacity=Math.max(0,1-q);if(q>=1){if(f.sp.parent)f.sp.parent.remove(f.sp);GF.fl.splice(k,1);}}}
// ---------- ролик ----------
function gfPlay(fallback){const L=W.gor4L,F=W.flags;if(!L||!L.heads||L.heads().length<3){fallback();return;}
  const hs=L.heads();F.phase=5;GF.on=true;const bn=$('banner');if(bn)bn.style.opacity=0;   // баннер «Узда на Змее» не висит поверх ролика
 GF.t=0;GF.stats.plays++;hs.forEach(e=>{e.harmless=true;e.cd=99;e.state='idle';e.t=0;e.tgt=null;});
  for(const k in GF_SPOT){const h=HERO[k];if(h&&h.g.visible){placeOnGround(h,GF_SPOT[k][0],GF_SPOT[k][1],0);h.face=Math.PI;}}
  const em=(who,type,d)=>()=>{const h=HERO[who];if(h&&h.g.visible)ACT.emote(h,type,d||0);};
  const all=(type,st)=>()=>ACT.emoteAll(type,new V3(0,0,-5),st);
  const midE=()=>L.heads()[1];
  play({dur:32.5,fov:48,camK:2.6,
    shots:[shot(0,[2.3,1.3,-5.0],[0,2.2,-10.4],[0.9,2.0,-6.6],[0,2.9,-10.6],3.6),
           shot(3.8,[0,6.6,3.2],[0,1.2,-8.2],[0,5.6,1.6],[0,1.4,-8.4],4.4),
           shot(8.4,[0.8,2.2,1.4],[-0.1,0.9,-7.6],[0.4,2.0,0.7],[0,1.0,-7.6],4.2),
           shot(12.8,[-0.8,3.3,0.2],[0,1.5,-7.6],[0.6,3.1,-0.4],[0,1.6,-7.6],1.6),
           shot(14.4,[-6.6,3.0,-0.8],[-2.3,0.9,-6.2],[-5.9,2.8,-1.4],[-2.3,0.9,-6.4],3.6),
           shot(18.4,[6.6,3.0,-0.8],[2.0,0.9,-6.1],[5.9,2.8,-1.4],[2.0,0.9,-6.3],3.6),
           shot(22.8,[0,1.7,2.6],[0,3.3,-9],[0,1.9,1.8],[0,3.8,-9],4.4),
           shot(27.4,[0,2.6,2.2],[0,1.9,-6.6],[0,2.5,1.0],[0,2.0,-6.6],4.8)],
    says:[[0.4,3.2,null,'<i>Узда засияла золотом — и Змей притих…</i>',true],
          [4.0,4.0,null,'<i>Три головы друг на друга глядят — не спорят,</i><br><i>и вместе кивнули, впервые за триста лет.</i>',true],
          [9.7,2.8,'gorM','<i>(фыркает дымом)</i> Ну, поймали. Так и быть.'],
          [13.0,3.4,'gorM','Уговор есть уговор — возить буду, не тужить.'],
          [16.8,2.9,'gorL','Дружить — так дружить… Только чур, не будить.'],
          [20.0,2.7,'gorR','А с пирожками дружба — вдвое вкусней!'],
          [23.4,2.4,'proshka','Ура! Был Змеем — стал нам другом!'],
          [26.0,2.6,'gorM','Садитесь, друзья, — прокачу над лугом!'],
          [28.9,3.2,'pelageya','Три головы — а сердце одно. Вот и славно!']],
    events:[
      // 1) узда на шее вспыхивает
      {t:0.15,fn:()=>{const p=midE()?gfMouth(midE()).add(new V3(0,0.6,-1.2)):new V3(0,2.4,-11);if(FX.sparks)FX.sparks(p,30,0xffd76a);if(FX.stars)FX.stars(p,10,0xfff2b0);
        if(FIN.uzda)FIN.uzda.flash=1.6;CINE.punch(-4);CINE.slowmo&&CINE.slowmo(0.5,0.6);CINE.mood&&CINE.mood('#ffd27a',0.16);tone(880,0.5,'triangle',0.18);tone(1320,0.6,'triangle',0.14,null,0.12);SFX.horn&&SFX.horn();}},
      {t:0.6,fn:all('surprise',0.08)},{t:2.0,fn:()=>{for(const e of L.heads())if(FX.dust)FX.dust(e.pos.clone(),8,0x8a7a6a,0.9);}},
      // 2) герои переглядываются, улыбаются; на дружном кивке — радость
      {t:4.4,fn:em('yosha','tilt')},{t:4.9,fn:em('potap','tilt')},{t:5.3,fn:em('pelageya','tilt')},{t:6.7,fn:all('joy',0.12)},{t:6.75,fn:()=>{CINE.rimPulse&&CINE.rimPulse(0.6);}},
      // 3) средняя опускается — отпрыгнули; фырк — кольца дыма; смех
      {t:8.8,fn:all('surprise',0.06)},{t:10.0,fn:()=>{const m=midE();if(m)gfSmokeRings(gfMouth(m).add(new V3(0,0.25,0)));CINE.punch(-2);}},
      {t:11.4,fn:em('yosha','laugh')},{t:11.6,fn:em('pelageya','laugh')},{t:11.9,fn:em('potap','laugh')},
      // 4) сонная — к Потапу, голодная — к Прошке
      {t:16.1,fn:em('potap','nod')},{t:17.4,fn:em('yosha','hop')},{t:21.0,fn:em('proshka','laugh')},{t:21.4,fn:em('pelageya','laugh')},{t:21.8,fn:em('potap','laugh')},
      // 5) салют: три головы, два залпа; конфетти; ликование
      ...[0,1].flatMap(v=>[0,1,2].map(i=>({t:23.55+v*1.6+i*0.35,fn:()=>gfRocket(i)}))),
      {t:23.9,fn:all('joy',0.12)},{t:25.1,fn:()=>{const p=new V3(0,3.5,-6);FX.confetti&&FX.confetti(p,40,1.2);FX.confettiCam&&FX.confettiCam(36);CINE.mood&&CINE.mood('#ffb870',0.14);}},{t:26.2,fn:all('cheer',0.1)},
      // 6) общий кадр
      {t:30.4,fn:all('joy',0.1)},{t:30.6,fn:()=>{const p=new V3(0,2.6,-4.5);FX.confetti&&FX.confetti(p,46,1.0);FX.stars&&FX.stars(p,10,0xfff2b0);CINE.punch(-3);CINE.rimPulse&&CINE.rimPulse(0.9);}}],
    tick:(t,dt)=>{GF.t=t;gfHeroes(t);},
    end:()=>{GF.done=true;W.anims.length=0;F.out=true;banner('Горыныч — наш друг!','#ffd76a',2.6,'звенья мира — ваши · на Лукоморье праздник-пир');later(2.2,finishLevel);}});
  GF.S=G.cine;const cd=CINE.CD&&CINE.CD();if(cd&&cd.S===G.cine){cd.inserts=false;}}
FIN.gor4End=gfPlay;
// ---------- подключение: позы голов — после шага прототипа (поверх его idle), кольца и ракеты ----------
{const _step=step;step=function(dt){_step(dt);if(!W||W.levelId!=='4-B')return;try{if(GF.on)gfApply(G.cine===GF.S?GF.S.t:32.5);   // после ролика — конечная расстановка до смены уровня
  gfRingTick(dt||0);gfRocketTick(dt||0);}catch(e){console.error('gor friend',e);}};}
{const _ll=loadLevel;loadLevel=function(i){GF.on=false;GF.done=false;GF.S=null;GF.ring.length=0;GF.rk.length=0;GF.fl.length=0;_ll(i);};}
