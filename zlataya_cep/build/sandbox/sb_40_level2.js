/* ============================== ПОЛИГОН · ЗАХОД 2: ЛОКАЦИИ (луг, перо, колокольчик, плиты на двоих, арена босса) ============================== */
// Только сборка --sandbox. Эффекты — sb_30_juice2.js (J2), здесь — места, где их пробовать, и босс-манекен с тремя этапами.
const j2NB=o=>{o.traverse(m=>{m.userData.noBatch=true;});return o;};   // подвижное — мимо пачек статики (late_26_batch)
{const _b=buildSandbox;buildSandbox=function(){_b();try{j2Build();}catch(e){console.error('sandbox build2',e);}};
 LEVELS[LV('sb')].build=buildSandbox;}
function j2Build(){J2.ticks.length=0;
  /* --- 7.1 луг: трава и цветы приминаются, кусты качаются и шуршат --- */
  sbLabel('ЛУГ: ТРАВА И КУСТЫ',-16,3.2,3.4);
  const N=1100,NF=90,x0=-26,x1=-6,z0=3,z1=11;
  const bg=new THREE.ConeGeometry(0.06,0.55,3);bg.translate(0,0.275,0);const blades=new THREE.InstancedMesh(bg,M(0x6fae4a),N);
  const fg=new THREE.IcosahedronGeometry(0.1,0);const heads=new THREE.InstancedMesh(fg,MB(0xffffff),NF);
  const P=[],q=new THREE.Quaternion(),m4=new THREE.Matrix4(),ax=new V3(),one=new V3(1,1,1),col=new THREE.Color();
  const FC=[0xffe066,0xff9ab8,0xffffff,0xb79cff,0x9fd8ff];
  for(let i=0;i<N;i++){const p={x:rand(x0,x1),z:rand(z0,z1),s:rand(0.7,1.3),tx:0,tz:0,ry:rand(0,6.28)};P.push(p);
    col.setHSL(0.27+rand(-0.04,0.04),0.45,0.32+rand(-0.06,0.08));blades.setColorAt(i,col);if(i<NF)heads.setColorAt(i,col.setHex(FC[i%FC.length]));}
  const put=(i)=>{const p=P[i],t=Math.hypot(p.tx,p.tz);if(t>1e-4){ax.set(p.tz,0,-p.tx).normalize();q.setFromAxisAngle(ax,t);}else q.set(0,0,0,1);
    m4.compose(new V3(p.x,0,p.z),q,new V3(p.s,p.s,p.s));blades.setMatrixAt(i,m4);
    if(i<NF){const tip=new V3(0,0.55*p.s,0).applyQuaternion(q);m4.compose(new V3(p.x+tip.x,tip.y,p.z+tip.z),q,one);heads.setMatrixAt(i,m4);}};
  for(let i=0;i<N;i++)put(i);blades.instanceColor.needsUpdate=true;heads.instanceColor.needsUpdate=true;blades.castShadow=heads.castShadow=false;W.group.add(blades);W.group.add(heads);
  const bushes=[[-22,5],[-17,9.2],[-12,4.4],[-8,8.6]].map(([x,z])=>{const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const bm=M(0x4c7f3a);
    for(let i=0;i<6;i++)addMesh(new THREE.IcosahedronGeometry(rand(0.45,0.65),0),bm,rand(-0.5,0.5),rand(0.45,0.95),rand(-0.5,0.5),g);j2NB(g);return {g,x,z,sw:0,ph:0,snd:-9};});
  const ME=J2.meadow={P,bent:0,bush:bushes};
  J2.ticks.push(dt=>{const on=juOn('grass')&&!G.cine,HS=HEROES.filter(h=>h.body&&h.body.visible!==false&&h.pos.x<x1+2&&h.pos.x>x0-2&&h.pos.z>z0-2&&h.pos.z<z1+2);
    let dirty=false,bent=0;
    for(let i=0;i<N;i++){const p=P[i];let gx=0,gz=0;if(on)for(const h of HS){const dx=p.x-h.pos.x,dz=p.z-h.pos.z,d=Math.hypot(dx,dz);if(d<1.3&&h.pos.y<0.8){const k=(1-d/1.3)*1.15/(d||1);gx+=dx*k;gz+=dz*k;}}
      const press=gx||gz,r=Math.min(1,dt*(press?14:2.6));const nx=p.tx+(gx-p.tx)*r,nz=p.tz+(gz-p.tz)*r;
      if(Math.abs(nx-p.tx)+Math.abs(nz-p.tz)>1e-4||(!on&&(p.tx||p.tz))){p.tx=on?nx:0;p.tz=on?nz:0;put(i);dirty=true;}if(Math.hypot(p.tx,p.tz)>0.25)bent++;}
    if(dirty){blades.instanceMatrix.needsUpdate=true;heads.instanceMatrix.needsUpdate=true;}ME.bent=bent;if(bent)J2.cnt.bentMax=Math.max(J2.cnt.bentMax||0,bent);
    for(const b of bushes){let push=0;if(on)for(const h of HS){const d=hd(h.pos,b);const sp=Math.hypot(h.vel.x,h.vel.z);if(d<1.5&&sp>0.5)push=Math.max(push,(1-d/1.5)*Math.min(1,sp/5));}
      if(push>0.1){b.sw=Math.min(1,b.sw+push*dt*6);if(G.time-b.snd>0.35){b.snd=G.time;J2.cnt.rustle=(J2.cnt.rustle||0)+1;J2S.rustle(juPan(b.g.position,0),0.5+push*0.5);if(FIN.fx&&Math.random()<0.5)burst(new V3(b.x,1,b.z),0x6fae4a,3,1.5);}}
      b.sw=Math.max(0,b.sw-dt*0.7);b.ph+=dt*9;b.g.rotation.z=Math.sin(b.ph)*0.16*b.sw;b.g.rotation.x=Math.cos(b.ph*0.8)*0.1*b.sw;}});
  /* --- 7.2 волшебные вещи: перо летает по кругу, гусли на пне --- */
  sbLabel('ВОЛШЕБНЫЕ ВЕЩИ',0,3.6,4.2);
  const fe=new THREE.Group();W.group.add(fe);{const fm=M(0xff8a2a,{emissive:0xff5a00,emissiveIntensity:0.6});const c=new THREE.ConeGeometry(0.16,0.9,6);c.scale(1,1,0.3);addMesh(c,fm,0,0,0,fe).rotation.z=Math.PI/2;
    addMesh(new THREE.CylinderGeometry(0.02,0.02,0.5,4),M(0xffe0a0),-0.55,0,0,fe).rotation.z=Math.PI/2;}j2NB(fe);
  const gs=new THREE.Group();gs.position.set(3,0,5.2);W.group.add(gs);addMesh(new THREE.CylinderGeometry(0.5,0.6,0.7,8),M(0x7a5232),0,0.35,0,gs);
  {const gm=M(0xc8955a,{emissive:0x804010,emissiveIntensity:0.3});const b=addMesh(new THREE.BoxGeometry(0.9,0.12,0.5),gm,0,0.78,0,gs);b.rotation.y=0.3;for(let i=0;i<5;i++)addMesh(new THREE.BoxGeometry(0.8,0.015,0.015),M(0xfff0c0),0,0.85,-0.15+i*0.07,gs).rotation.y=0.3;}j2NB(gs);
  const glow=(c,s)=>{const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:juTex('dot'),color:c,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));sp.scale.setScalar(s);sp.visible=false;sp.renderOrder=9;W.group.add(sp);return sp;};
  const MG={fe,gs,feG:glow(0xffb060,1.9),gsG:glow(0xffe2a0,2.2),pT:0,t:0,pollen:0};J2.magic=MG;
  J2.ticks.push(dt=>{MG.t+=dt;const a=MG.t*0.9,c=new V3(-2,0,7.2);fe.position.set(c.x+Math.cos(a)*2.6,1.5+Math.sin(MG.t*2.1)*0.35,c.z+Math.sin(a)*2.0);fe.rotation.y=-a;fe.rotation.x=Math.sin(MG.t*3)*0.3;
    const on=juOn('magic');MG.feG.visible=MG.gsG.visible=on;if(!on)return;const pu=0.85+0.15*Math.sin(MG.t*4);
    MG.feG.position.copy(fe.position);MG.feG.scale.setScalar(1.9*pu);MG.feG.material.opacity=0.55*j2FlashK();MG.gsG.position.set(gs.position.x,1.05,gs.position.z);MG.gsG.scale.setScalar(2.2*(0.9+0.1*Math.sin(MG.t*2.6)));MG.gsG.material.opacity=0.45;
    MG.pT-=dt;if(MG.pT<=0){MG.pT=0.06;MG.pollen++;juSprite('dot',Math.random()<0.5?0xffd76a:0xfff2c0,fe.position.clone().add(new V3(rand(-0.15,0.15),rand(-0.1,0.1),rand(-0.15,0.15))),rand(0.18,0.32),1.1,{op:0.9});}
    if(Math.random()<dt*0.6&&FIN.fx)FIN.fx.sparkle(new V3(gs.position.x,1.1,gs.position.z),2,0xfff2b0);});
  /* --- 4.4 колокольчик: можно звонить снова, отойдя на 5 м --- */
  sbLabel('КОЛОКОЛЬЧИК',9.5,3.6,6);const bl=bell(9,6.5);
  J2.ticks.push(()=>{for(const pi of [0,1]){if(!bl.act[pi])continue;if(hd(active(pi).pos,bl)>6){bl.act[pi]=false;if(bl._jA)bl._jA[pi]=false;if(!bl.act[0]&&!bl.act[1]){bl.bm.emissiveIntensity=0;bl.bm.color.setHex(0xb89a50);}}}});
  /* --- 6.1 уголок на двоих: две плиты и сундучок; манекен «бейте вдвоём» --- */
  sbLabel('ВДВОЁМ: ПЛИТЫ',22,3.6,4.4);const pA=plate(18,6.5,'sbco'),pB=plate(26,6.5,'sbco');
  const ch=new THREE.Group();ch.position.set(22,0,9.5);W.group.add(ch);addMesh(new THREE.BoxGeometry(1.2,0.7,0.8),M(0x8a5a2c),0,0.35,0,ch);const lid=new THREE.Group();lid.position.set(0,0.7,-0.4);ch.add(lid);
  addMesh(new THREE.BoxGeometry(1.24,0.18,0.84),M(0xa06a34),0,0.09,0.4,lid);addMesh(new THREE.BoxGeometry(0.2,0.25,0.06),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.5}),0,-0.05,0.83,lid);j2NB(ch);
  const CO=J2.co={pA,pB,lid,done:false,n:0};
  J2.ticks.push(dt=>{const both=pA.pressed&&pB.pressed;
    if(both&&!CO.done){CO.done=true;CO.n++;j2c('coPlate');const hs=HEROES.filter(h=>hd(h.pos,pA)<pA.r+0.3||hd(h.pos,pB)<pB.r+0.3);
      if(juOn('coChord')){j2c('coChord');J2S.chord(hs.length?hs:[active(0),active(1)],0);J2.cap('аккорд вдвоём',null);for(const p of [pA,pB])ringFx(new V3(p.x,0.2,p.z),COL.gold,2);
        floatText(new V3(22,2.4,9.5),'Вместе!','#ffe08a');if(FIN.fx)FIN.fx.stars(new V3(22,1.2,9.5),10,0xffd76a);}else SFX.ok();}
    if(!pA.pressed&&!pB.pressed)CO.done=false;lid.rotation.x=damp(lid.rotation.x,CO.done?-1.6:0,6,dt);});
  sbLabel('бейте вдвоём',22,2.9,0.6,'#ffe08a');const cd={e:null,t:0};const mkCo=()=>{cd.e=makeFoe('kiki',22,-0.5,{harmless:true,leash:0.5});cd.e.sbDummy=true;cd.e.sbCo=true;};mkCo();
  J2.ticks.push(dt=>{if(cd.e&&cd.e.alive){cd.e.cd=99;if(cd.e.state==='idle'||cd.e.state==='recover')cd.e.open=0.5;}else if(!cd.e||W.enemies.indexOf(cd.e)<0){cd.t+=dt;if(cd.t>1.2){cd.t=0;mkCo();}}});
  /* --- раздел 5: босс-манекен --- */
  j2BossArena();}

/* ---------- босс-манекен: три этапа по три удара, слабое место открывается само ---------- */
const J2BC=[0x9fe07a,0xffa040,0xff5ac8],J2BN=['','спокойный','сердитый','яростный'];
function j2BossArena(){const C=new V3(18,0,-26),R=7;
  sbLabel('АРЕНА: БОСС-МАНЕКЕН',C.x,4.6,C.z+R+0.6);
  for(let i=0;i<18;i++){const a=i/18*Math.PI*2;addMesh(new THREE.DodecahedronGeometry(rand(0.3,0.5),0),M(0x8c8c94),C.x+Math.cos(a)*R,0.2,C.z+Math.sin(a)*R).castShadow=false;}
  const B=J2.boss={C,R,state:'sleep',stage:1,hp:0,e:null,t:0,ot:0,open:false,zv:0,seq:null,parts:[],glow:null,name:null,auraC:new THREE.Color(J2BC[0])};
  const spawn=()=>{const e=makeFoe('stump',C.x,C.z,{harmless:true,scale:1.6,leash:0.3});e.shell=null;e.sbBoss=true;e.face=0;B.e=e;B.emb=e.embers;};
  B.reset=(force)=>{if(B.e){B.e.alive=false;if(B.e.g.parent)B.e.g.parent.remove(B.e.g);const i=W.enemies.indexOf(B.e);if(i>=0)W.enemies.splice(i,1);}
    B.state='sleep';B.stage=1;B.hp=0;B.t=0;B.seq=null;B.open=false;spawn();if(FIN.music)FIN.music.play(null);if(force)B.armed=true;};
  spawn();B.armed=true;
  B.glow=new THREE.Sprite(new THREE.SpriteMaterial({map:juTex('dot'),color:0xffd040,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));B.glow.visible=false;B.glow.renderOrder=9;W.group.add(B.glow);
  for(let i=0;i<12;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:juTex('dot'),color:J2BC[0],transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));s.visible=false;s.renderOrder=9;W.group.add(s);B.parts.push({s,a:i/12*Math.PI*2,h:rand(0.4,3.2),r:rand(2,2.8),sp:rand(0.6,1.2)});}
  J2.ticks.push(dt=>j2BossTick(B,dt));}
function j2BossName(on){const B=J2.boss;if(!B.name){const d=document.createElement('div');d.style.cssText='position:fixed;left:50%;top:16%;transform:translateX(-50%);z-index:44;pointer-events:none;text-align:center;color:#ffe8b0;font:700 40px/1.1 Georgia,serif;letter-spacing:3px;text-shadow:0 2px 12px rgba(0,0,0,.8);opacity:0;transition:opacity .45s';
    d.innerHTML='<div style="font-size:22px;letter-spacing:10px;color:#d8a84a">❦ ─── ✥ ─── ❦</div><div>ПЕНЬ-ВЕЛИКАН</div><div style="font:500 16px system-ui;letter-spacing:2px;color:#e8dcc0;margin-top:4px">манекен полигона · три этапа</div><div style="font-size:22px;letter-spacing:10px;color:#d8a84a">❦ ─── ✥ ─── ❦</div>';document.body.appendChild(d);B.name=d;}
  B.name.style.opacity=on?'1':'0';}
function j2BossTick(B,dt){const e=B.e;if(!e)return;const near=Math.min(...[0,1].filter(pi=>!(G.solo&&pi===1)).map(pi=>hd(active(pi).pos,B.C)));
  // уход с арены — бой сбрасывается
  if(B.state!=='sleep'&&B.state!=='dead'&&near>B.R+9){B.reset();j2BossName(false);return;}
  if(B.state==='dead'){B.t+=dt;if(near>B.R+6||B.t>8&&B.armed)B.reset();return;}
  if(B.state==='sleep'){if(near>B.R+6)B.armed=true;if(!B.armed||near>B.R+1)return;B.armed=false;B.state='intro';B.t=0;j2c('bossStart');
    if(juOn('bossIntro')){j2c('bossIntro');j2BossName(true);J2S.sub();J2.hushT=1.4;if(FIN.music)FIN.music.play('sbHush');shake(null,0.05,0.4);J2.cap('гул: босс',juPan(e.pos,0));}
    else if(FIN.music)FIN.music.play('boss');return;}
  if(e.alive)e.cd=99;
  if(B.state==='intro'){B.t+=dt;if(B.t>1.4&&B.t-dt<=1.4&&juOn('bossIntro')&&FIN.music)FIN.music.play(juOn('bossPhase')?'sbBoss1':'boss');if(B.t>2.6){j2BossName(false);B.state='fight';B.ot=0;}return;}
  if(B.state==='fight'){B.ot+=dt;const cyc=B.ot%5.4,open=cyc<2.6;
    if(open!==B.open){B.open=open;if(open){j2c('weakOpen');if(juOn('weak'))J2.cap('звяк: слабое место',juPan(e.pos,0));}}
    e.open=open?1:0;if(e.state==='stagger')e.state='idle';
    // попадание: угольки убыли — засчитываем и возвращаем, чтобы манекен не ломался
    if(e.embers<B.emb){B.hp++;j2c('bossHit');e.embers=e.maxEmb;B.emb=e.embers;const st=1+Math.floor(B.hp/3);
      if(B.hp>=9){j2BossLast(B);return;}if(st!==B.stage){B.stage=st;j2BossPhase(B);}}
    B.emb=e.embers;
    // слабое место: золотое пульсирующее свечение и «звяк», пока открыто
    const wk=juOn('weak')&&open;B.glow.visible=wk;if(wk){const top=e.L&&e.L.top||1.4,ph=G.time*7;B.glow.position.set(e.pos.x,e.pos.y+top*e.s*0.5,e.pos.z+e.r*0.7);B.glow.scale.setScalar((1.6+0.5*Math.sin(ph))*(0.7+0.3*j2FlashK()));B.glow.material.opacity=0.6+0.3*Math.sin(ph);
      B.zv-=dt;if(B.zv<=0){B.zv=0.7;j2c('zvyak');J2S.zvyak(juPan(e.pos,0));}}else B.zv=0;}
  // аура: частицы вокруг босса, цвет — по этапу
  const pv=juOn('bossPhase')&&(B.state==='fight'||B.state==='last');for(const p of B.parts){p.s.visible=pv;if(!pv)continue;p.a+=dt*p.sp;p.s.position.set(e.pos.x+Math.cos(p.a)*p.r,e.pos.y+p.h+Math.sin(p.a*2)*0.2,e.pos.z+Math.sin(p.a)*p.r);
    p.s.material.color.lerp(B.auraC,Math.min(1,dt*4));p.s.scale.setScalar(0.35+0.1*Math.sin(p.a*3));}
  if(B.state==='last')j2BossSeq(B,dt);}
function j2BossPhase(B){const e=B.e,st=B.stage;j2c('bossPhase');
  if(!juOn('bossPhase')){floatText(e.pos.clone().add(new V3(0,4,0)),'этап '+st,'#ffffff');return;}
  j2c('stinger');J2S.stinger(st);B.auraC.setHex(J2BC[st-1]);if(FIN.music)FIN.music.play('sbBoss'+st);
  const c=J2BC[st-1],top=e.pos.clone().add(new V3(0,2,0));juSprite('dot',c,top,9*(0.6+0.4*JU.s.fx),0.5,{op:0.85*JU.s.fx,shape:'flash'});ringFx(new V3(e.pos.x,0.2,e.pos.z),c,3.5);later(0.15,()=>ringFx(new V3(e.pos.x,0.2,e.pos.z),c,5));
  for(const p of B.parts)p.s.material.color.setHex(0xffffff);shake(null,0.08,0.35);
  floatText(e.pos.clone().add(new V3(0,4.2,0)),'Этап '+st+' — '+J2BN[st],'#'+c.toString(16).padStart(6,'0'));J2.cap('стингер: этап '+st,juPan(e.pos,0));}
function j2BossLast(B){const e=B.e;B.state='last';B.t=0;B.open=false;B.glow.visible=false;j2c('bossDown');
  if(!juOn('lastHit')){burst(e.pos.clone().add(new V3(0,1.5,0)),0xffffff,14,4);SFX.ok();j2BossGone(B);return;}
  j2c('lastHit');J2.slowT=0.7;B.seq=0;juSprite('dot',0xfff2c0,e.pos.clone().add(new V3(0,2,0)),7*(0.6+0.4*JU.s.fx),0.35,{op:0.9*JU.s.fx,shape:'flash'});juTH({f0:150,f1:40,d:0.6,v:0.45});}
function j2BossSeq(B,dt){const e=B.e;B.t+=dt;   // по реальному времени (замедление на игру не действует)
  if(B.seq===0&&B.t>0.7){B.seq=1;J2.hushT=0.9;if(FIN.music)FIN.music.play('sbHush');j2c('silence');}
  if(B.seq===1&&B.t>1.5){B.seq=2;j2c('shower');J2S.shower(juPan(e.pos,0));J2.cap('колокола: победа',null);const p=e.pos.clone().add(new V3(0,2.2,0));
    if(FIN.fx){FIN.fx.stars(p,18,0xffd76a);FIN.fx.sparkle(p,24,0xffffff);if(FIN.fx.confetti)FIN.fx.confetti(p,30,0.8);}ringFx(new V3(e.pos.x,0.2,e.pos.z),COL.gold,5);
    anim(0.8,k=>{if(e.g)e.g.scale.setScalar(Math.max(0.01,1-k));});}
  if(B.seq===2&&B.t>2.4){B.seq=3;j2BossGone(B);}}
function j2BossGone(B){const e=B.e;e.alive=false;if(e.g.parent)e.g.parent.remove(e.g);const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);B.state='dead';B.t=0;B.armed=false;
  for(const p of B.parts)p.s.visible=false;floatText(B.C.clone().add(new V3(0,2.5,0)),'Повержен! Отойди — и он вернётся','#ffe08a');later(2.5,()=>{if(FIN.music&&B.state==='dead')FIN.music.play(null);});}
