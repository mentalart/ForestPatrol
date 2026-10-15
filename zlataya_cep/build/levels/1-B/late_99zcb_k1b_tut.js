/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: РОЛИК-УРОК ПЕРЕД ЭТАПОМ 1 «КАК ОДОЛЕТЬ ЛЕШЕГО» ============================== */
// Ручная постановка (def.kino, docs/40_kino_pravila.md): 24,8 с, 8 планов — после ролика входа, перед боем с руками. Руки и герои показывают весь этап вживую:
//   1 Леший крупно — «Ну-ка, поглядим, как вы с моими руками сладите!»; 2 красная «Сгреб» отводит руку низко, заливает веер — Пелагея кувыркается,
//   ладонь метёт дугой мимо (борозда); 3 жёлтая «Хлоп» вскидывает ладонь, тень растёт — Прошка закрывается щитом в последний миг, хлоп с пылью,
//   ладонь увязла и светится; 4 крупно: Прошка и Потап бьют увязшую ладонь — Пробой, рука ложится мостом; 5 общий: Пелагея взбегает по мосту
//   (Прошка держит ладонь — «держи — беги»), красная тянется смахнуть — Потап бьёт её: «Отвлёк!»; 6 сбоку: красная снова проносится поперёк
//   моста — Пелагея перепрыгивает; 7 удар по макушке — трофеи слетят; 8 Леший крупно — «Ай! Ну, это мы ещё поглядим!».
//   Пояснения — голосом Сказительницы (ремарки). Смахивание — настоящее (K1S1.start / K1S1.step / K1S1.distract, late_99zca), без удара по героям.
// Руки в ролике ведёт K1N.demo (состояние 'demo', поза e.k1.dp/dk — late_99z_k1b_hands.js); пробитая рука — настоящий Пробой (мост тот же, что в бою).
// Конец и пропуск: руки — по домам, целые; мост убран; герои — где стояли; надпись «Фаза 1 · руки» — после урока.
// Один раз за игру (G.flags.k1b[1]); «Показать урок ещё раз» в паузе — на этапе 1, пока нет моста. FIN.k1b.tut.auto=false — без урока (боты; helpers.js).
const K1T=K1B.tut={auto:true,on:false,runs:0,mute:false,D:null};
const k1tE=()=>CINE.E,k1tR=(t,a,b)=>clamp((t-a)/(b-a),0,1);
// руки урока неуязвимы: удар игрока в ролике не гасит угольков и не пробивает
{const _eo=emberOut;emberOut=function(e,n,label){if(K1N.demo&&e&&e.k1)return;return _eo.apply(this,arguments);};}
// надписи во время урока молчат (Пробой, «Рука на землю легла!», «Фаза 1» — её покажем после)
{const _b=banner;banner=function(){if((K1T.mute||K1N.demo)&&W&&W.levelId==='1-B')return;return _b.apply(this,arguments);};}
const K1T_POS={Y:new V3(-4.5,0,-14),R:new V3(4.5,0,-14),pr:new V3(-4.5,0,-11.2),pe:new V3(4.5,0,-9.8),pt:new V3(-2.2,0,-6.2),yo:new V3(2.2,0,-6.2)};
function k1tHand(s){return W.enemies.find(e=>e.kind==='hand'&&e.alive&&e.side===s);}
// руки в ролике: поза по времени ролика (dp — wind/strike/stuck/idle, dk — доля), телеграфы — те же, что в бою
function k1tHandsTick(e){const D=K1T.D;if(!D)return;const s=e.side,t=D.t,F=K1B.fx,k1=e.k1;
  if(e.state==='broken'&&!(s<0&&D.brk)){e.state='demo';e.embers=e.maxEmb;}   // Пробой в уроке — только по сценарию
  if(e.state!=='broken'){e.state='demo';e.tgt=null;e.dazeT=0;e.embers=e.maxEmb;}else e.t=0;
  if(e.state==='broken')return;
  const P=s<0?K1T_POS.Y:K1T_POS.R;
  if(k1.sweep)return;   // смахивает с моста — место и позу ставит K1S1
  if(k1.back){const dx=P.x-e.pos.x,dz=P.z-e.pos.z,d=Math.hypot(dx,dz),m=Math.min(d,9/60);if(d>0.05){e.pos.x+=dx/d*m;e.pos.z+=dz/d*m;}else k1.back=0;k1.dp='idle';k1.dk=0;e.face=0;return;}
  e.pos.x=P.x;e.pos.z=P.z;
  const ph=s>0?[3.25,4.3,4.55]:[6.1,7.15,7.4];   // замах, удар, конец удара
  if(s>0){e.sig='red';e.face=0;}else{e.sig='yellow';e.face=Math.PI*0.02;}
  if(t<ph[0]){k1.dp=t<0.6?'idle':'idle';k1.dk=0;}
  else if(t<ph[1]){k1.dp='wind';k1.dk=k1tR(t,ph[0],ph[1]);}
  else if(t<ph[2]){k1.dp='strike';k1.dk=k1tR(t,ph[1],ph[2]);}
  else if(s<0&&t<10.7){k1.dp='stuck';k1.dk=0;}
  else{k1.dp='idle';k1.dk=0;}
  // телеграфы
  const tk=s>0?'tr':'ty';if(k1.dp==='wind'){if(!D[tk])D[tk]=s>0?F.sectorObj(e.pos.x,e.pos.z,0,K1N.fanHalf,e.r+K1N.fanExtra,'red'):F.teleObj(e.pos.x,e.pos.z,e.r+2.0,'yellow');
      if(s>0)D[tk].g.rotation.y=e.face;D[tk].set(k1.dk);}
  else if(D[tk]){D[tk].flash();D[tk]=null;}}
// герои в ролике: места, кувырок, щит, удары, бег по мосту, «Отвлёк!», прыжок через руку (после физики — W.updates)
function k1tHeroTick(){const D=K1T.D;if(!D)return;const t=D.t,E=k1tE(),H=HERO,pr=H.proshka,pe=H.pelageya,pt=H.potap,yo=H.yosha,Y=k1tHand(-1),Rh=k1tHand(1);
  const put=(h,x,z,y,face)=>{if(!h)return;const ox=h.pos.x,oz=h.pos.z;h.pos.set(x,y==null?0:y,z);const dt=1/60;h.vel.set((x-ox)/dt*0.2,0,(z-oz)/dt*0.2);if(face!=null)h.face=face;};
  const toward=(h,p)=>Math.atan2(p.x-h.pos.x,p.z-h.pos.z);
  // Пелагея: стоит перед красной → кувырок влево → к мосту → вверх по мосту (замирает, пока Потап отвлекает красную) → прыжок через руку → по плечу к голове
  if(pe){const A=K1T_POS.pe,B=new V3(2.3,0,-9.6),rp=D.rp;
    if(t<4.0)put(pe,A.x,A.z,0,Math.PI);
    else if(t<4.45){const k=E.outCubic(k1tR(t,4.0,4.45));if(!D.rolled){D.rolled=1;pe.rollT=0.38;pe.lastRoll=G.time;pe.rollDir.set(-1,0,0);}put(pe,lerp(A.x,B.x,k),lerp(A.z,B.z,k),0,-Math.PI/2);}
    else if(!rp||t<11.2)put(pe,B.x,B.z,0,t<5.9?Math.PI:toward(pe,K1T_POS.Y));
    else{const u0=-0.9/rp.len,at=u=>[rp.x0+rp.dx*rp.len*u,Math.max(0,rp.y0+(rp.y1-rp.y0)*u)+0.02,rp.z0+rp.dz*rp.len*u],fa=Math.atan2(rp.dx,rp.dz),foot=at(u0);
      if(t<12.0){const k=E.inOutSine(k1tR(t,11.2,12.0));put(pe,lerp(B.x,foot[0],k),lerp(B.z,foot[2],k),0,Math.atan2(foot[0]-pe.pos.x,foot[2]-pe.pos.z));}
      else if(t<17.9){const U=[[12.0,u0],[13.7,0.36],[14.6,0.36],[16.5,0.6],[17.3,0.72],[17.9,1]];let u=1;
        for(let i=1;i<U.length;i++)if(t<U[i][0]){const a=U[i-1],b=U[i];u=lerp(a[1],b[1],E.inOutSine(k1tR(t,a[0],b[0])));break;}
        const p=at(u);let y=p[1];if(t>=16.5&&t<17.3){const q=t-16.5;y+=Math.max(0,10.6*q-12.5*q*q);}   // прыжок через руку: ладонь проносится под ногами
        put(pe,p[0],p[2],y,t>13.0&&t<14.6&&Rh?toward(pe,Rh.pos):fa);}
      else{const top=at(1),fp=D.fp,end=fp?new V3(fp.x0+fp.dx*fp.len*0.2,0,fp.z0+fp.dz*fp.len*0.2):new V3(top[0],0,top[2]),k=E.inOutSine(k1tR(t,17.9,18.5)),hp=K1B.cur.headPos;
        put(pe,lerp(top[0],end.x,k),lerp(top[2],end.z,k),rp.y1+0.02,Math.atan2(hp.x-pe.pos.x,hp.z-pe.pos.z));
        if(t>=18.8&&!D.hit1){D.hit1=1;pe.atkT=0.28;SFX.swish();}if(t>=19.4&&!D.hit2){D.hit2=1;pe.atkT=0.28;SFX.swish();}}}}
  // Прошка: стоит под жёлтой → щит в последний миг → подходит и бьёт увязшую → держит упавшую ладонь («держи — беги»)
  if(pr){const A=K1T_POS.pr,C=new V3(-7.1,0,-12.3),Hd=new V3(-5.2,0,-10.2);
    pr.guard=t>=6.85&&t<7.55;
    if(t<8.7)put(pr,A.x,A.z,0,Math.PI);
    else if(t<9.0){const k=E.inOutSine(k1tR(t,8.7,9.0));put(pr,lerp(A.x,C.x,k),lerp(A.z,C.z,k),0,Math.PI);}
    else if(t<11.2)put(pr,C.x,C.z,0,Y?toward(pr,Y.pos):Math.PI*0.6);
    else{const k=E.inOutSine(k1tR(t,11.2,11.7));put(pr,lerp(C.x,Hd.x,k),lerp(C.z,Hd.z,k),0,Y?toward(pr,Y.pos):Math.PI);}
    for(const[q,n]of[[9.05,'a'],[9.55,'b'],[10.05,'c']])if(t>=q&&!D['pr'+n]){D['pr'+n]=1;pr.atkT=0.28;}}
  // Потап: смотрит, прибегает помочь бить ладонь; потом бежит к красной, что тянется к мосту, и бьёт её — «Отвлёк!»
  if(pt){const A=K1T_POS.pt,C=new V3(-2.0,0,-11.6),SP=D.sp||C;
    if(t<9.1)put(pt,A.x,A.z,0,toward(pt,t<5.9?K1T_POS.R:K1T_POS.Y));
    else if(t<9.7){const k=E.inOutSine(k1tR(t,9.1,9.7));put(pt,lerp(A.x,C.x,k),lerp(A.z,C.z,k),0,-Math.PI/2-0.6);}
    else if(t<12.2)put(pt,C.x,C.z,0,-Math.PI/2-0.6);
    else if(t<13.0){const k=E.inOutSine(k1tR(t,12.2,13.0));put(pt,lerp(C.x,SP.x,k),lerp(C.z,SP.z,k),0,toward(pt,SP));}
    else if(t<14.8)put(pt,SP.x,SP.z,0,Rh?toward(pt,Rh.pos):0);
    else{const k=E.inOutSine(k1tR(t,14.8,15.6)),B=new V3(-0.6,0,-12.2);put(pt,lerp(SP.x,B.x,k),lerp(SP.z,B.z,k),0,toward(pt,pe?pe.pos:K1T_POS.Y));}
    for(const[q,n]of[[9.8,'a'],[10.3,'b'],[13.15,'c'],[13.5,'d']])if(t>=q&&!D['pt'+n]){D['pt'+n]=1;pt.atkT=0.28;}}
  if(yo)put(yo,K1T_POS.yo.x,K1T_POS.yo.z,0,toward(yo,t<5.9?K1T_POS.R:t<11?K1T_POS.Y:(pe?pe.pos:K1T_POS.Y)));}
// ролик
function k1tPlay(then){const c=K1B.cur;if(!c){if(then)then();return;}const L=c.L,E=k1tE(),hp=c.headPos,F=K1B.fx;K1T.runs++;K1T.on=true;
  const D=K1T.D={t:0,from:new Map(HEROES.map(h=>[h,h.pos.clone()])),face:new Map(HEROES.map(h=>[h,h.face])),rp:null,fp:null,then};
  // руки — в показ; герои — по местам урока
  K1N.demo={hand:k1tHandsTick};for(const s of[-1,1]){const e=k1tHand(s);if(e){e.state='demo';e.t=0;e.k1.dp='idle';e.k1.dk=0;}}
  W.updates.push(k1tHeroTick);
  if(!ACT.npcs.some(n=>n.o===L))D.npc=regNpc(L,'leshy')&&ACT.npcs[ACT.npcs.length-1];   // Леший — актёр ролика (говорящий в кадре; кит late_83)
  const spark=(x,y,z,c)=>()=>{SFX.ember();spawnSpark(new V3(x,y,z),c);};
  const def={kino:true,dur:24.8,fov:50,mood:['#c8f0a0',0.06],
    says:[[0.25,3.0,'leshy','Ну-ка, поглядим, как вы с моими руками сладите!'],
      [3.3,2.7,null,'<i>Красная метёт — кувырок в сторону.</i>',true],
      [6.05,3.05,null,'<i>Жёлтая хлопнет — щит в последний миг.</i>',true],
      [9.15,3.17,null,'<i>Промахнулась — увязла. Бей её!</i>',true],
      [12.35,3.37,null,'<i>Пробитая рука ложится мостом — беги наверх!</i>',true],
      [15.75,2.92,null,'<i>Вторая рука смахнёт — бей её или прыгай!</i>',true],
      [18.72,2.65,null,'<i>Бей по макушке — трофеи слетят!</i>',true],
      [21.42,3.15,'leshy','Ай! Ну, это мы ещё поглядим!']],
    shots:[KS(0,[0,8.6,-16],[0,7.9,-24.2],{trk:KC.fcam(L,8.2,0,0.1,0.25)}),                                        // 1 Леший крупно
      KS(3.1,[10.5,3.6,-6.2],[3.6,1.2,-12.2],{move:'truck',amp:0.6}),                                                 // 2 красная отводит руку, Пелагея — сбоку
      KS(5.9,[-10.5,4.6,-6.6],[-4.2,2.6,-12.6],{move:'push',amp:0.6,tr:'whip'}),                                       // 3 жёлтая вскинута над Прошкой — с другой стороны
      KS(8.6,[-6.2,1.6,-15.3],[-7.0,1.0,-12.4],{move:'push',amp:0.3}),                                                  // 4 бьют увязшую ладонь (ладонь — на земле, высотой с Потапа: камера сзади-сверху, не внутри неё)
      KS(11.0,[-7.5,6.5,-4.5],[-2.4,2.6,-16.2],{p2:[-5.8,8.0,-6.2],l2:[-1.6,3.8,-17.2],dur:3.2}),                         // 5 общий: мост, Пелагея взбегает, Потап отвлекает красную
      KS(14.2,[-12.3,5.0,-16.0],[-3.0,3.6,-18.8],{move:'push',amp:0.5,tr:'whip'}),                                       // 6 сбоку: рука проносится поперёк моста — прыжок
      KS(18.3,[-7.4,11.2,-19.6],[-1.3,7.3,-23.6],{move:'push',amp:0.5,tr:'dip'}),                                        // 7 плечо и макушка
      KS(21.2,[0,8.6,-16.5],[0,7.9,-24.2],{trk:KC.fcam(L,7.6,0.18,0.05,0.3),tr:'whip'})],                              // 8 Леший крупно
    cues:[[0.3,()=>{K1B.emo(L,'mock',2.4);KSND.creak(0);}],[1.4,()=>{F.leaves(new V3(0,9.5,-24),12,{spd:1.2,up:0.4});}],
      [3.25,()=>K1S1.wind({sig:'red',wdur:1.05})],[3.45,KC.emo('pelageya','surprise')],
      [4.5,()=>floatText(HERO.pelageya.pos.clone().add(new V3(0,2.3,0)),'Увернулась!','#b8e070')],[4.9,KC.emo('pelageya','joy')],
      [6.1,()=>K1S1.wind({sig:'yellow',wdur:1.05})],[6.3,KC.emo('proshka','effort')],
      [7.2,()=>{SFX.shield();SFX.crash();CINE.trauma(0.07);const p=HERO.proshka.pos;burst(p.clone().add(new V3(0,1.2,0)),0x6ad0ff,14,4);}],
      [7.55,()=>{SFX.knock();floatText(new V3(K1T_POS.Y.x,3.4,K1T_POS.Y.z),'Открыт! Бей!','#ffe36b');K1B.emo(L,'surprise',1.2);}],[7.9,KC.emo('proshka','pride')],
      [9.05,spark(-4.5,1.2,-13.4,0x6ad0ff)],[9.55,spark(-4.3,1.3,-13.6,0xffd76a)],[9.8,spark(-3.9,1.1,-13.5,0x6ad0ff)],[10.05,spark(-4.6,1.4,-13.8,0xffd76a)],[10.3,spark(-4.0,1.2,-13.7,0x6ad0ff)],
      [10.7,()=>{SFX.brk();CINE.punch(-3);CINE.trauma(0.08);burst(new V3(-4.5,1.4,-14),0xfff2b0,18,5);K1B.emo(L,'hurt',1.4);}],[10.9,KC.all('cheer')],
      [11.5,KC.emo('proshka','nod')],[12.0,()=>KSND.steps(0,8,0.28)],[12.7,KC.emo('pelageya','surprise')],[12.9,KC.emo('potap','effort')],
      [13.15,()=>{const R=k1tHand(1);if(R)burst(R.pos.clone().add(new V3(0,1.2,0)),0xffd76a,12,4);CINE.trauma(0.05);}],[13.5,()=>{const R=k1tHand(1);if(R){SFX.ember();burst(R.pos.clone().add(new V3(0,1.4,0)),0x6ad0ff,10,4);}}],   // искры не бросаем: несобранную рука «съест» — Прошка заговорит посреди урока
      [13.9,KC.emo('potap','pride')],[14.3,KC.emo('pelageya','nod')],[15.8,KC.emo('pelageya','effort')],[16.5,()=>{SFX.whoosh();}],[17.0,KC.emo('potap','surprise')],[17.4,KC.emo('pelageya','joy')],
      [18.8,()=>{SFX.finisher();CINE.trauma(0.1);CINE.punch(-4);ringFx(hp,COL.gold,3);for(let i=0;i<6;i++)spawnSpark(hp.clone(),[COL.gold,0x6ad0ff,0xff6a8a][i%3]);
          floatText(hp.clone().add(new V3(0,1,0)),'По макушке!','#ffd76a');K1B.emo(L,'surprise',1.6);}],
      [19.4,()=>{SFX.ember();spawnSpark(hp.clone(),COL.gold);}],[19.6,KC.emo('proshka','cheer')],[19.8,KC.emo('potap','cheer')],[20.0,KC.emo('yosha','joy')],
      [21.4,()=>K1B.emo(L,'hurt',1.0)],[22.6,()=>K1B.emo(L,'sly',0)],[23.0,()=>KSND.sting(0)]],
    tick:(t,dt)=>{D.t=t;
      // Пробой жёлтой на 10,7 с — настоящий: ладонь падает к тропе, рука ложится мостом
      const Y=k1tHand(-1),R=k1tHand(1);if(Y&&t>=10.7&&!D.brk){D.brk=1;Y.embers=0;Y.state='broken';Y.t=0;Y.bdur=99;Y.k1.dp=null;}
      if(!D.rp&&Y&&Y.k1bridge){const r=c.ramps.find(q=>q.hand===Y);if(r){D.r=r;D.rp=r.cols[0];D.fp=r.cols[1]||null;r.t=99;r.k1swDone=true;
        const rp=D.rp,u=0.38;let nx=rp.dz,nz=-rp.dx;if(nx>0){nx=-nx;nz=-nz;}D.sp=new V3(rp.x0+rp.dx*rp.len*u-3.6*nx,0,rp.z0+rp.dz*rp.len*u-3.6*nz);}}   // где Потап встретит красную
      // красная тянется смахнуть Пелагею: первый раз Потап её отвлекает, второй — Пелагея перепрыгивает
      if(D.r&&R){if(t>=12.6&&!D.sw1)D.sw1=K1S1.start(D.r,R,true,0.38,1.2);
        if(t>=13.15&&!D.dis){D.dis=1;K1S1.distract(R);}
        if(t>=15.6&&!D.sw2){D.sw2=K1S1.start(D.r,R,true,0.62,1.0);D.sw2.onHit=()=>{const p=HERO.pelageya;if(p)floatText(p.pos.clone().add(new V3(0,2.3,0)),'Перепрыгнула!','#b8e070');};}
        K1S1.step(dt||1/60,true);}},
    end:()=>k1tEnd()};
  play(def);}
function k1tEnd(){const D=K1T.D;if(!D)return;K1T.D=null;K1T.on=false;K1N.demo=null;const c=K1B.cur;
  const i=W.updates.indexOf(k1tHeroTick);if(i>=0)W.updates.splice(i,1);
  if(D.npc){const j=ACT.npcs.indexOf(D.npc);if(j>=0)ACT.npcs.splice(j,1);}
  if(D.ty)D.ty.del();if(D.tr)D.tr.del();for(const S of K1S1.sw.slice())if(S.demo)k1sSwEnd(S,true);
  for(const h of HEROES){const p=D.from.get(h);if(p){placeOnGround(h,p.x,p.z,0);h.face=D.face.get(h);}h.vel.set(0,0,0);h.guard=false;h.atkT=0;h.rollT=0;}
  for(const e of W.enemies)if(e.k1&&e.alive){e.state='idle';e.t=0;e.cd=1.2;e.embers=e.maxEmb;e.dazeT=0;e.tgt=null;e.k1.dp=null;e.k1.dk=0;e.k1.fall=null;e.k1.prev='idle';e.k1.stuck=false;e.k1.sweep=null;e.k1.swS=null;e.k1.back=0;e.k1.ly=0;e.k1.th=0;
    e.pos.set(e.home.x,0,e.home.z);e.k1bridge=null;}
  if(c&&c.ramps)for(const r of c.ramps.slice()){r.t=0;}   // мост урока: рука уже не в Пробое — W.updates уберёт его в этот же кадр
  K1N.atkAt=G.time;snapCams();K1T.mute=false;
  banner('Фаза 1 · руки','#b8e070',2.6,'жёлтая — щит, как от кикиморок · красная — кувырок, как от пня');
  const th=D.then;if(th)th();}
// после ролика входа: урок (один раз за игру), потом бой
{const _in=K1B.cine.intro;K1B.cine.intro=function(d){d=_in(d);const oe=d.end;d.end=()=>{const go=K1T.auto&&!FIN.lesson.seen('k1b',1);if(go)K1T.mute=true;oe();K1T.mute=false;
    if(go){FIN.lesson.mark('k1b',1);K1T.mute=true;later(0.05,()=>{if(K1B.cur&&W.flags.phase===1)k1tPlay();else K1T.mute=false;});}};return d;};}
K1T.play=k1tPlay;
// «Показать урок ещё раз» (пауза): на этапе 1, пока нет моста; на хороводе — урок хоровода, как раньше
{const LK=FIN.lesson,prev=LK.reg['1-B'];const can1=()=>!!K1B.cur&&W.flags.phase===1&&!G.cine&&!K1T.on&&!(K1B.cur.ramps&&K1B.cur.ramps.length)&&!W.enemies.some(e=>e.k1&&e.state==='broken');
  LK.regLevel('1-B',()=>{if(can1()){K1T.mute=true;k1tPlay();}else if(prev)prev.fn();},()=>can1()||(prev?prev.can():false));}
{const _ll=loadLevel;loadLevel=function(i){if(K1T.D){K1T.D=null;K1N.demo=null;}K1T.on=false;K1T.mute=false;_ll(i);};}
