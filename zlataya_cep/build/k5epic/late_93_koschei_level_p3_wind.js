// ---- продолжение late_93_koschei_level.js (внутри build5B2, часть 3 из 5): ветер, анимация Кощея, помощники героев — части склеиваются сборкой по имени файла ----
  function natReset(){NAT.wind=null;K5WIND.k=0;if(K5WIND.mesh)K5WIND.mesh.visible=false;for(const H of NAT.hands)k5Del(H.g);NAT.hands.length=0;NAT.grab.clear();NAT.windT=NAT.boltT=NAT.quakeT=null;}
  function nature2(dt){if(KB.state==='broken'&&NAT.wind&&NAT.wind.mode==='lin')windStop();   // спесь сбита — ветер стихает, бейте
    if(!K5.fight||K5.st!==2||KB.state==='broken'||KB.state==='k5wait')return;const sm=G.solo?1.25:1;
    NAT.windT=(NAT.windT==null?6:NAT.windT)-dt;if(NAT.windT<=0&&!NAT.wind){NAT.windT=rand(13,17)*sm;NAT.wdir=-NAT.wdir;windStart('lin',{dir:new V3(NAT.wdir,0,0),dur:5.2,str:G.solo?2.6:3.3});kosCast();
      natBark('wind','Ветер буйный, налетай —<br>С ног их всех, гуляй, сбивай!',3.0);if(!NAT.said.windTip){NAT.said.windTip=true;later(3.4,()=>{if(K5.fight)say('zven','Ветер! Щит держи — не сдует!<br>Пусть Кощей сколько хочет дует!',3.6,true);});}K5.log.push('wind');}
    NAT.boltT=(NAT.boltT==null?3.5:NAT.boltT)-dt;if(NAT.boltT<=0){NAT.boltT=rand(6.5,8.5)*sm;const hs=k5Heroes();if(hs.length){natBolt(hs[Math.floor(rand(0,hs.length))]);if(!NAT.wind)natBark('bolt','Гром, греми, гроза, сверкай —<br>В красный круг огнём стреляй!',3.0,0.2);K5.log.push('bolt');}}
    NAT.quakeT=(NAT.quakeT==null?10:NAT.quakeT)-dt;if(NAT.quakeT<=0&&!(NAT.wind&&NAT.wind.t<1.5)){NAT.quakeT=rand(15,19)*sm;kosCast();quake(G.solo?2:3);natBark('quake','Задрожи, земля сырая, —<br>Руки, лезьте, всех хватая!',3.0);K5.log.push('quake');}}
  function bossTick(dt){if(!K5.live)return;
    // новое окно — снова можно ударить; после кувырка Кощей опоминается быстрее мелких мороков
    if(KB.state==='stagger'&&!K5.pStag)K5.winN=0;K5.pStag=KB.state==='stagger';if(KB.dazeT>1.6&&!K5.listen)KB.dazeT=1.6;if(KB.dazeT>(K5.pDaze||0)+0.3)K5.winN=0;K5.pDaze=KB.dazeT;
    if(KB.state==='broken'&&!KB._b){KB._b=true;KB.bdur=K5.st===5?6:(G.solo?10:9);if(K5.st!==5){banner('Спесь сбита!','#ffd76a',2.4,G.solo?'ударь рядом с ним '+K(G.soloPi,'attack')+' — золотая нить сказа':'оба — удар '+K(0,'attack')+' + '+K(1,'attack')+' рядом с ним: золотая нить сказа');
        if(!K5.said['b'+K5.st]){K5.said['b'+K5.st]=true;say('zven','Он без сил! Не мешкай, друг, —<br>Нитью сказа — вкруг да вкруг!',3.6,true);}}else banner('Кощей без сил!','#ffd76a',2,'куй, Прошка!');}
    if(KB.state!=='broken'&&KB._b){KB._b=false;if(K5.fight){KB.embers=K5.st===5?KB.maxEmb:Math.max(2,Math.ceil(KB.maxEmb/2));if(K5.st!==3)floatText(kosTop(),'Спесь вернулась!','#c8a8ff');}}
    if(K5.st===2){if(G.solo)KB.pi=G.soloPi;else if(K5.spark)KB.pi=K5.spark.pi;else if(KB.state==='recover'&&!KB._sw){KB._sw=true;KB.pi=1-(KB.pi||0);}if(KB.state!=='recover'&&K5.st===2)KB._sw=false;if(KB.pi!=null&&players[KB.pi].downed)KB.pi=1-KB.pi;
      K5.keyT=(K5.keyT==null?5:K5.keyT)-dt;const nk=K5.adds.filter(e=>e.kind==='k5key').length;if(K5.keyT<=0&&nk<(G.solo?1:2)&&KB.state!=='broken'){K5.keyT=rand(8,11)+(G.solo?3:0);const tgp=G.solo?G.soloPi:1-(KB.pi||0);const th=active(tgp);if(th&&!players[tgp].downed&&!k5Locked(th)){keyMake(th);if(!K5.said.k9){K5.said.k9=true;bark(KS,'koschei','Лети, мой ключ, — замкни, запри!',1.4);}anim(0.6,k=>{KS.armR.rotation.x=-2.2*Math.sin(k*Math.PI);});}}}
    if(K5.st===2)nature2(dt);if(K5.st===3)stage3Tick(dt);if(K5.st===4)stage4Tick(dt);if(K5.st===5)stage5Tick(dt);}
  // поза и меч: замах, удар, полёт
  function kosAnim(dt){if(!K5.live||KA.on)return;const s=KB.state;if(s!==K5.prevS){if(s==='strike'){k5s('swing');KS.armR.rotation.x=0.9;}if(s==='wind')k5s('warn');K5.prevS=s;}
    if(s==='wind'){const k=clamp(KB.t/Math.max(0.1,KB.wdur),0,1);KS.armR.rotation.x=damp(KS.armR.rotation.x,-2.6,10,dt);if(sword.visible)sword.userData.edge.material.opacity=0.5+0.5*k;}
    else if(s==='strike'){}else if(s==='k5cast'||s==='k5rise'){KS.armR.rotation.x=damp(KS.armR.rotation.x,-1.1+0.3*Math.sin(G.time*2),3,dt);}else if(s!=='k5leap')KS.armR.rotation.x=damp(KS.armR.rotation.x,0,5,dt);
    KS.g.rotation.x=damp(KS.g.rotation.x,s==='broken'?0.25:s==='k5dive'?0.4:0,5,dt);if(sword.visible&&s!=='wind')sword.userData.edge.material.opacity=0.55+0.25*Math.sin(G.time*5);}
  /* ---------- этапы: начало, проигрыш, победа ---------- */
  const PAUSE={1:'Этап 1 «Чёрные свечи». Купол держат восемь свечей: погасите все — отбей синюю каплю обратно в свечу, полей водой Йоши или ударь пять раз. Погасшая через 12 секунд (одному — через 30) горит снова. Красный круг — сюда ударит молния.',
    2:'Этап 2 «Ключ и искорка». Отбивайте удары Кощея в последний миг: над другом загорается искорка — отбил с искоркой, спесь гаснет вдвое. Ключ падает сверху — отбей его щитом. Скованного сам замок не отпустит: друг сбивает его пятью ударами (одному — переключись на другого героя). Скуют всех четверых — этап заново. Спесь сбита — оба ударьте рядом с ним. Кощей зовёт непогоду: ветер сдувает — держи щит, и устоишь; красный круг — молния, уходи; земля трещит — из трещины вылезет костлявая рука: уходи или кувыркнись.',
    3:'Этап 3 «Буря». Тёмный шар отбей в последний миг — он полетит к другу; друг отбивает его в небо, в Кощея. Воронов четверо: ворон пикирует — кувырок, застрял — бей. Красные круги — иглы, воронка тянет — выбегай. Собьёте полспеси — из земли встанут три костяных щитника: спереди у них щит, бейте сбоку или сзади.',
    4:'Этап 4 «Меч Бессмертного». Над кем горит око — того Кощей выбрал: держи щит и отбивай серию. Второй заходит со спины и бьёт. Волна по земле — прыгай. После прыжка Кощей открыт. Собьёте полспеси — встанут пятеро костяных щитников: бейте сбоку или сзади. Молнии бьют за краем поляны — они не опасны.',
    5:'Этап 5 «Игла». Иглу несёт герой со свечением — передай другу '+K(0,'item')+'. Прошка с иглой у наковальни — бей в такт. Второй встаёт рядом с Прошкой и держит щит. «Все цепи острова — ко мне!» — у наковальни встают три чёрные цепи, ветер гонит всех прочь, лезут костлявые руки: держи щит против ветра и разбейте все три цепи — тогда Кощей без сил.'};
  function stageStart(n,retry){K5.st=n;F.stage='s'+n;K5.fight=false;clearAdds();natReset();RG.on=false;eye.visible=false;fring.visible=false;K5.combo=null;K5.delayNext=false;K5.bind=[-9,-9];K5.crash=false;K5.bones=false;RG.tries=0;
    ['castT','keyT','orbT','rainT','vxT','rvT','leapT','diveT','cs0','cs1'].forEach(k=>{K5[k]=null;});heroesHome(n);W.pauseLine=PAUSE[n];dome.visible=n===1;sword.visible=n>=4;
    const f=K5.fails[n];
    if(n===1){liveBoss(false);KS.g.position.copy(KP);KS.g.rotation.y=0;candles.forEach(c=>{c.g.visible=true;candleSet(c,true);});}   // свечи могли спрятать пролог и другие стадии
    else candles.forEach(c=>{candleSet(c,false);c.relT=1e9;c.g.visible=false;});
    if(n===2){KS.g.position.set(KP.x,0,KP.z+3);liveBoss(true);bossCfg((G.solo?10:12)-2*f,['yellow','yellow','red'],2.4);sword.visible=false;KB.pi=0;}
    if(n===3){KS.g.position.set(C.x,5.4,C.z-4);liveBoss(true,true);bossCfg((G.solo?5:8)-(f?1:0)-(f>2?1:0),['yellow'],2.4);KB.pos.y=5.4;k5StormSet(1);}
    if(n===4){KS.g.position.set(C.x,0,C.z-5);liveBoss(true);bossCfg((G.solo?12:14)-2*f,['yellow','red'],3.0);sword.visible=true;K5.mark=0;K5.bones=false;k5StormSet(1);}
    if(n===5){KS.g.position.set(C.x,3.2,C.z-6);liveBoss(true,true);bossCfg(6-f,['yellow','red'],3.0);sword.visible=true;KB.pos.y=3.2;k5StormSet(1);anvil.position.set(ANV.x,0.9,ANV.z);anvilCyl.x=ANV.x;anvilCyl.z=ANV.z;anvilCyl.maxy=2;
      K5.needle={holder:null,ground:null,t:0};needleHold(G.solo?active(G.soloPi):active(1));K5.forge={n:0,need:12-2*Math.min(2,f),c:0,b:-1,good:0,tries:0,rings:{}};}
    K5.wake=K5.live?KB.state:null;if(K5.live)KB.state='k5wait';   // пока идут карточки — Кощей ждёт
    setBar();const go=()=>{if(FIN.k5e.cur!=null&&FIN.k5e.OLD&&FIN.k5e.OLD[FIN.k5e.cur]!==n)return;   // карточки прежней стадии досмотрели уже на другой
      K5.fight=true;K5.t0=G.time;K5.hint0=G.time;if(K5.live&&KB.state==='k5wait')KB.state=K5.wake;setBar();if(n===1&&!K5.said.k01){K5.said.k01=true;later(0.4,()=>say('pelageya','Восемь чёрных свеч — смотрите! —<br>Купол держат. Погасите!',4.4));}
      if(n===4&&!G.solo&&!K5.said.k18){K5.said.k18=true;later(0.6,()=>say('zven','Кого око выбрало — щит держи!<br>А второй — со спины: бей, не дрожи!',4.4,true));}};
    if(!K5.auto)go();else if(K5.seen[n]||retry)k5Short(n,go);else{K5.seen[n]=true;k5Tut(n,go);}}
  // герой выбыл: клубок или рассыпался тот, кем играют; «Сбился сказ» — только когда выбыли все четверо (отзыв 4): пока цел второй герой — «Смена» и в бой
  const k5Down=h=>!!h._down||(h.active&&players[h.player].downed);
  function stageLose(){if(!K5.fight)return;K5.fight=false;K5.fails[K5.st]++;K5.log.push('lose'+K5.st);const f=$('flash');if(f){f.style.transition='opacity .6s';f.style.opacity=1;}
    say('zven','Сбился сказ — беда невелика:<br>Начнём сначала, с этого листка!',3.6,true);later(1.4,()=>{if(f)f.style.opacity=0;stageStart(K5.st,true);});}
  function stageWin(n){if(!K5.fight||K5.st!==n)return;K5.fight=false;clearAdds();natReset();RG.on=false;eye.visible=false;fring.visible=false;K5.log.push('win'+n);SFX.horn();
    FIN.k5e.oldWin(n);}
  function setBar(){if(FIN.k5e.bar)return FIN.k5e.bar();bb.style.display='block';bb.style.borderColor='#b58cff';const e=KB,st=K5.st;const pips=st>=2?' · спесь '+'<b style="color:#ff9a3a">'+'●'.repeat(Math.max(0,e.embers))+'</b>'+'○'.repeat(Math.max(0,e.maxEmb-e.embers)):'';
    let note='';if(st===1)note='свечи '+candles.map(c=>c.lit?'🕯':'·').join('');else if(st===2)note=K5.spark?'искорка у '+(G.solo?'тебя':'Игрока '+(K5.spark.pi+1)):'отбей — искорка другу';else if(st===3)note='шар — другу, друг — в небо';
    else if(st===4)note=G.solo?'око на тебе':'око на Игроке '+(K5.mark+1);else if(st===5&&RG.on&&RG.chains&&RG.chains.length)note='цепи разбиты '+RG.chains.filter(e=>e.k5done).length+' / 3';else if(st===5&&K5.forge)note='застёжка '+K5.forge.n+' / '+K5.forge.need;
    const html='<b style="color:#d8b8ff">Кощей Бессмертный</b> · этап '+st+' из 5 — '+K5N[st]+pips+(note?' <small style="opacity:.85">· '+note+'</small>':'');if(bb.innerHTML!==html)bb.innerHTML=html;}
  /* ---------- ролики (по отзыву 2 — режиссура заново) ----------
     Каждый ролик — мини-история из 4–8 шотов разной крупности (общий, средний, крупный, деталь); камера движется по сплайнам
     с easing (наезд, отъезд, проезд, кран, облёт, слежение), говорящего видно в лицо; правило 180° — камеры по одну сторону
     линии «герои — Кощей». Кощей играет позами на пружинах (замах → действие → доводка, K5POSE в late_92), герои — эмоциями
     (late_83); акценты — hit-stop, slow-mo, FOV-punch, dolly-zoom, голландский угол, вспышки, кольца, столбы света, настроение. */
  const hH=h=>new V3(h.pos.x,h.pos.y+h.d.height*0.82,h.pos.z);
  const kH=()=>KS.head.getWorldPosition(new V3());
  const SH=(t,p,l,x)=>Object.assign(shot(t,p,l),{x:x||{}});
  const MV=(t,p,l,p2,l2,dur,x)=>Object.assign(shot(t,p,l,p2,l2,dur),{x:x||{}});
  const em=(h,type)=>()=>{if(h&&h.g.visible)ACT.emote(h,type);};
  const emAll=(type,st)=>()=>ACT.emoteAll(type,null,st==null?0.09:st);
  const npcEm=(o,type)=>()=>{const n=ACT.npcs.find(q=>q.o===o);if(n)n.em={type,t:0,d:0.7};};
  const pose=(n,o)=>()=>KA.pose(n,o);
  const COLD='#6f86ff',WARM='#ffb870',GOLD='#ffd27a',STORY='#a8b0ff',DARK='#7a5cff';
  const KC=new V3(0,0,-17.5);   // где Кощей стоит в роликах между этапами (лицом к героям)
  const heroLine=(z,face)=>HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,z,0);h.face=face==null?Math.PI:face;h.vel.set(0,0,0);});
  const hWalk=(h,x,z,dur,face)=>{const f=h.pos.clone();h.face=Math.atan2(x-f.x,z-f.z);anim(dur,k=>{const e=CE.inOutSine(k);h.pos.x=lerp(f.x,x,e);h.pos.z=lerp(f.z,z,e);h.vel.set(0,0,0);if(k>=1&&face!=null)h.face=face;});};
  const kTurn=(face,dur)=>{const f=KS.g.rotation.y;let d=face-f;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;anim(dur||0.45,k=>{KS.g.rotation.y=f+d*CE.outBack(k);});};
  const kWalk=(x,z,dur,face)=>{const f=KS.g.position.clone();KS.g.rotation.y=Math.atan2(x-f.x,z-f.z);let st=0;anim(dur,k=>{const e=CE.inOutSine(k);KS.g.position.x=lerp(f.x,x,e);KS.g.position.z=lerp(f.z,z,e);const n=Math.floor(k*dur*5.2/Math.PI);if(n>st&&k<1){st=n;k5s('step');}
      KS.g.position.y=f.y+Math.abs(Math.sin(k*dur*5.2))*0.07;if(k>=1){KS.g.position.y=f.y;if(face!=null)kTurn(face,0.45);}});};
  const kFly=(to,dur,ease)=>{const f=KS.g.position.clone();anim(dur,k=>{KS.g.position.lerpVectors(f,to,(CE[ease]||CE.inOutCubic)(k));});};
  const lHand=new THREE.Object3D();lHand.position.set(0,-1.25,0.12);KS.rig.armL2.add(lHand);
  const zvenTo=(p,dur)=>{Z.mode='script';Z.vis=true;Z.shown=true;const f=Z.pos.clone();anim(dur||0.8,k=>{const e=CE.inOutCubic(k);Z.pos.lerpVectors(f,p,e);Z.pos.y+=Math.sin(Math.PI*e)*0.8;});};
  // золотые искорки сказа поднимаются вокруг рассказчика
  function storyMotes(c,dur,n,col){const parts=[];for(let i=0;i<(n||16);i++){const s=k5Prop(k5Glow(col||0xffe08a,rand(0.16,0.3)));parts.push({s,a:rand(0,6.28),r:rand(0.45,1.5),y:rand(0,2.4),v:rand(0.35,0.8),w:rand(-1.4,1.4)});}
    k5fx(dur,(k,dt)=>{const C0=typeof c==='function'?c():c;const fa=k<0.1?k/0.1:k>0.85?(1-k)/0.15:1;for(const q of parts){q.a+=q.w*dt;q.y+=q.v*dt;if(q.y>2.6){q.y=0;q.r=rand(0.45,1.5);}
      q.s.position.set(C0.x+Math.cos(q.a)*q.r,C0.y+q.y,C0.z+Math.sin(q.a)*q.r);q.s.material.opacity=Math.sin(Math.min(1,q.y/2.6)*Math.PI)*fa;}},()=>parts.forEach(q=>k5Del(q.s)));}
  // имя вернулось: столб света за героем (от камеры), кольцо, звёзды
  function nameBurst(h,col){const p=h.pos.clone(),bk=new V3(p.x-shared.pos.x,0,p.z-shared.pos.z).normalize();k5Pillar(new V3(p.x+bk.x*0.9,0,p.z+bk.z*0.9),col,6,0.32,1.1);k5Ring(new V3(p.x,0.1,p.z),col,0.3,3,0.9,0.12);k5Flash(hH(h).add(new V3(0,0.9,0)),col,1.6,0.4);FX.stars(hH(h),12,col);FX.sparkle(hH(h),12,0xffffff);}
  // золотая нить сказа обвивает Кощея: нити от героев, кольца сжимаются, вспышка
  function bindBeat(){const c=KS.g.position.clone().add(new V3(0,2.4,0));for(const h of HEROES){if(!h.g.visible)continue;k5Thread(()=>hH(h),()=>KS.g.position.clone().add(new V3(0,2.4,0)));}k5s('bind');
    k5Flash(c,0xffe08a,5,0.5);k5Ring(c,0xffd060,0.4,3.4,0.6,0.1,new THREE.Euler(Math.PI/2,0,0));FX.sparks(c,20,0xffd060);
    for(let i=0;i<3;i++)later(0.08+i*0.12,()=>{const r=k5Prop(new THREE.Mesh(new THREE.TorusGeometry(1,0.05,5,32),k5Add(0xffd060)));r.rotation.x=Math.PI/2;r.position.copy(KS.g.position).add(new V3(0,1.2+i*1.1,0));
      k5fx(0.7,k=>{r.scale.setScalar(lerp(2.2,0.55,CE.outCubic(k)));r.material.opacity=1-k*k;},()=>k5Del(r));});}
  function intro(){F.stage='introCine';heroLine(6.5);KS.g.position.set(10,0,-16.5);KS.g.rotation.y=-Math.PI/2;KS.g.visible=false;book.g.visible=false;gor.g.position.y=0.5;
    const ksA=new V3(-2.4,0,-18),PE=new V3(-4.4,0,-17.4),BK=new V3(-3.5,1.0,-19),pe=T.pelageya,pr=T.proshka,po=T.potap,yo=T.yosha;
    const cen=()=>HEROES.reduce((a,h)=>a.add(h.pos),new V3()).multiplyScalar(0.25);
    const O=new V3(0,1.8,-27.5),orb=a=>[O.x+Math.sin(a)*10.5,3.2,O.z+Math.cos(a)*10.5];
    const F8=k5Face(new V3(ksA.x,4.15,ksA.z),Math.PI*0.2,-0.3,3.4,-0.45),F8b=k5Face(new V3(ksA.x,4.15,ksA.z),Math.PI*0.2,-0.3,2.8,-0.35);
    const pd=new V3(BK.x-PE.x,0,BK.z-PE.z).normalize(),peF=Math.atan2(pd.x,pd.z),F10=k5Face(new V3(PE.x,1.1,PE.z),peF,0.5,1.9,0.08);
    const KH=new V3(KP.x,4.15,KP.z);
    play({dur:40.2,fov:46,camK:2,k5:{mood:[WARM,0.1],cues:[[3.4,()=>CINE.trauma(0.12)],[11.7,()=>CINE.mood(COLD,0.12)],[17.0,()=>CINE.mood(COLD,0.16)],[18.9,()=>{KA.shake=1.3;}],[19.3,()=>CINE.dollyZoom(0.16,1.2,0.8)],
        [26.1,()=>CINE.dutch(0.04)],[30.6,()=>CINE.dutch(0)],[31.15,()=>{CINE.hitstop(4);CINE.punch(-6);CINE.trauma(0.35);CINE.flashDip('#c8a0ff',0.35);}],[33.0,emAll('fear',0.08)],
        [36.0,()=>{CINE.mood(WARM,0.14);CINE.rimPulse(0.7);}],[36.3,emAll('pride',0.12)],[38.0,emAll('nod',0.1)]]},
      shots:[MV(0,[30,26,34],[0,10,-28],[16,11,12],[0,4,-22],3.4,{pts:[[24,19,25]],ease:'inOutSine',fov:52,fov2:46,move:'none'}),
        MV(3.4,[-3.2,4.6,-14.8],[-13,3.4,-25],[-5.0,3.6,-16.8],[-13,2.6,-25.2],3.2,{ease:'outCubic',fov:46,move:'none'}),
        MV(6.6,orb(-0.95),[O.x,1.6,O.z],orb(0.25),[O.x,1.8,O.z],2.8,{pts:[orb(-0.35)],ease:'inOutSine',fov:46,move:'none'}),
        SH(9.4,[1,1.3,-0.5],[0,0.9,4],{pf:()=>cen().add(new V3(1.0,1.3,-4.4)),lf:()=>cen().add(new V3(0,0.95,0)),lk:6,fov:42,move:'none'}),
        SH(11.6,[3.6,2.1,0.6],[10,2.4,-16.5],{lf:()=>KS.g.position.clone().add(new V3(0,2.4,0)),lk:4,fov:46,move:'push',amp:0.6}),
        SH(13.8,[6,3.4,-14],[6,3,-16],{pf:()=>KS.g.position.clone().add(new V3(-3.4,3.2,3.6)),lf:()=>lHand.getWorldPosition(new V3()).lerp(kH(),0.72),lk:5,fov:44,move:'none'}),
        SH(15.4,[-5.6,2.0,-16.6],[BK.x+0.2,1.3,BK.z],{fov:40,move:'push',amp:1}),
        MV(17.0,F8.p,F8.l,F8b.p,F8b.l,3.6,{ease:'inOutSine',fov:40,fov2:37,move:'none'}),
        SH(20.6,[PE.x-pd.x*1.2+0.39,1.45,PE.z-pd.z*1.2+0.22],[BK.x,1.05,BK.z],{fov:38,move:'push',amp:0.8}),
        SH(22.4,F10.p,F10.l,{fov:40,move:'push',amp:1.2}),
        MV(24.2,[4.2,2.6,-17.6],[-2.2,2.6,-19.6],[3.8,3.0,-21.0],[-1.8,2.8,-22.6],1.9,{lf:()=>KS.g.position.clone().add(new V3(0,2.6,0)),lk:6,fov:46,move:'none'}),
        MV(26.0,[KP.x+1.5,2.3,KP.z+4.8],[KH.x,3.85,KH.z],[KP.x+1.05,2.7,KP.z+3.9],[KH.x,3.95,KH.z],4.6,{ease:'inOutSine',fov:42,fov2:38,move:'none'}),
        MV(30.8,[KP.x+5.5,1.0,KP.z+6.5],[KP.x,2.6,KP.z],[KP.x+6.8,3.6,KP.z+8.2],[KP.x,2.8,KP.z],1.8,{ease:'outCubic',fov:50,move:'none'}),
        MV(32.6,[13,12,5],[0,0.6,-12],[5,13.5,8.5],[0,0.6,-13],2.0,{pts:[[9.5,13,7.4]],ease:'inOutSine',fov:54,move:'none',tr:'whip'}),
        SH(34.6,[1.4,1.7,0.8],[0.6,2.0,-3.4],{fov:44,move:'push',amp:0.8})],
      says:[[0.3,4.6,null,'<i>За морем — остров Буян, на Буяне — дуб сухой.</i><br><i>Наковальню принёс Горыныч — и лёг у корней горой.</i>',true],
        [6.6,4.6,null,'<i>Собрались вокруг поляны все, кого мы выручали,</i><br><i>А помощники из Сказов к дубу встали — и молчали.</i>',true],
        [11.7,4.4,null,'<i>Тут и Кощей идёт — один, без войска и без свиты,</i><br><i>Тетрадку Пелагеи на камень кладёт: «Возьмите».</i>',true],
        [17.2,3.4,'koschei','Я дочитал. Да только сказка — без конца:<br>Пустой листок — ни слова, ни лица.'],[20.7,3.4,null,'<i>Глядит Пелагея: на последнем листке — «Жил-был мальчишка…»,</i><br><i>А дальше пусто — ни строчки. Не дописана книжка.</i>',true],
        [26.3,4.4,'koschei','Не будет сказок больше — ни одной!<br>В них я всегда один — и всякий мне чужой.'],[30.8,3.4,null,'<i>Взмахнул Кощей рукой — и восемь чёрных свеч зажглись,</i><br><i>Над ним волшебный купол встал — и тучи поднялись.</i>',true],
        [34.8,4.9,'zven','Сегодня мы не деремся. Защищайтесь —<br>И сказку вспоминайте, не сдавайтесь!']],
      events:[{t:0.2,fn:()=>k5s('dawn')},{t:3.4,fn:()=>{const y0=gor.g.position.y;anim(1.6,k=>{gor.g.position.y=lerp(y0,-0.6,CE.outBack(k));gor.g.scale.y=0.75*(1-0.06*Math.sin(Math.PI*Math.min(1,k*1.6)));});later(1.0,()=>{FX.dust(new V3(-13,0,-23.5),14,0x9a8a6a,1.4);if(SFX.thud)SFX.thud();});}},
        {t:6.8,fn:()=>HM.forEach((h,i)=>later(i*0.35,()=>{const n=ACT.npcs.find(q=>q.o===h.m);if(n)n.em={type:'nod',t:0,d:0.7};}))},
        {t:8.6,fn:()=>HEROES.forEach((h,i)=>hWalk(h,-3+i*2,-2.6,4.0,Math.PI))},{t:10.2,fn:em(pr,'hop')},{t:10.6,fn:em(yo,'tilt')},{t:11.0,fn:em(po,'nod')},
        {t:11.6,fn:()=>{KS.g.visible=true;book.g.visible=true;kWalk(ksA.x,ksA.z,3.8);k5s('reveal');}},{t:12.0,fn:emAll('fear',0.1)},{t:12.6,fn:()=>hWalk(yo,po.pos.x+0.4,po.pos.z+1.0,0.7,Math.PI)},
        {t:15.4,fn:()=>{kTurn(Math.atan2(BK.x-ksA.x,BK.z-ksA.z),0.4);KA.pose('offer',{antic:0.2});}},
        {t:15.9,fn:()=>{const f=book.g.position.clone();book.g.userData.free=true;anim(0.6,k=>{book.g.position.lerpVectors(f,BK,CE.inOutSine(k));book.g.position.y+=Math.sin(k*Math.PI)*0.4;});later(0.62,()=>{k5s('book');FX.dust(BK.clone(),6,0xd8c8a8,0.6);k5Flash(BK.clone().add(new V3(0,0.2,0)),0xffe0a0,1.4,0.4);});}},
        {t:16.7,fn:()=>{kTurn(Math.PI*0.2,0.5);KA.pose('slump');}},{t:20.6,fn:()=>{placeOnGround(pe,PE.x,PE.z,0);pe.face=peF;}},{t:21.0,fn:()=>FX.sparkle(BK.clone().add(new V3(0,0.3,0)),8,0xffe08a)},
        {t:22.6,fn:em(pe,'surprise')},{t:23.6,fn:em(pe,'droop')},{t:24.2,fn:()=>{KA.pose('idle');kWalk(KP.x,KP.z,1.8,0);}},{t:26.1,fn:pose('proud')},{t:28.6,fn:pose('slump')},
        {t:30.8,fn:()=>{KA.pose('cast',{antic:0.32,anticK:0.45,snap:true});k5s('cast');k5Gather(()=>KS.hand.getWorldPosition(new V3()),0xc090ff,0.35,14,2);}},
        {t:31.15,fn:()=>{dome.visible=true;dome.scale.setScalar(0.01);anim(0.9,k=>dome.scale.setScalar(Math.max(0.01,CE.outBack(k))));const p=KP.clone();p.y=0.08;const rn=k5Decal(K5TEX.rune,0xb070ff,3.6,p,1);k5fx(1.6,k=>{rn.material.opacity=1-k;rn.rotation.z+=0.04;rn.scale.setScalar(1+k*0.6);},()=>k5Del(rn));
          k5Pillar(KP.clone(),0x9a60ff,9,1.2,1.2);k5Ring(new V3(KP.x,0.1,KP.z),0xd0b0ff,0.5,6,0.7,0.1);k5s('barrier');}},
        {t:32.7,fn:()=>candles.forEach((c,i)=>later(i*0.16,()=>{candleSet(c,true);k5s('candleOn');const p=c.pos.clone().add(new V3(0,1.8,0));FX.sparkle(p,10,0xb070ff);k5Flash(p,0xb070ff,2.2,0.35);k5Ring(new V3(c.pos.x,0.1,c.pos.z),0xb070ff,0.2,1.6,0.5,0.15);}))},
        {t:34.2,fn:()=>{zvenTo(new V3(0.8,2.2,-3.4),0.9);k5s('zven');}}],
      tick:(t)=>{if(book.g.visible&&!book.g.userData.free){lHand.getWorldPosition(book.g.position);book.g.rotation.set(0,KS.g.rotation.y,0.2);}},
      end:()=>{W.anims.length=0;KA.reset();KS.g.visible=true;KS.g.position.copy(KP);KS.g.rotation.y=0;KS.armR.rotation.x=0;book.g.visible=true;book.g.userData.free=true;book.g.position.set(-3.5,1.0,-19);book.g.rotation.set(0,0,0);
        dome.visible=true;dome.scale.setScalar(1);gor.g.position.y=-0.6;gor.g.scale.y=0.75;W.clampR={x:C.x,z:C.z,r:R};Z.mode='lead';FIN.k5e.flow('intro');}});}
  function trans1(){F.stage='t1';heroLine(-11);const po=T.potap,pr=T.proshka,yo=T.yosha,pe=T.pelageya;KS.g.position.copy(KP);KS.g.rotation.y=0;
    const KH=new V3(KP.x,4.15,KP.z),F2=k5Face(KH,0,0.35,3.3,-0.4),F2b=k5Face(KH,0,0.35,2.8,-0.35),POs=new V3(-1,0,-12.3),F5=k5Face(new V3(POs.x,1.3,POs.z),Math.PI,0.4,3.0,-0.25);
    const keys=new THREE.Group();keys.visible=false;W.group.add(keys);for(let i=0;i<4;i++){const k=blackKey(1.0);keys.add(k);}
    play({dur:15,fov:44,camK:2.4,k5:{iris:true,mood:[COLD,0.12],cues:[[0.2,()=>{CINE.hitstop(4);CINE.slowmo(0.35,0.5);CINE.trauma(0.4);CINE.punch(-5);}],[3.7,()=>CINE.dollyZoom(0.15,0.9,0.6)],
        [6.6,()=>CINE.mood(DARK,0.16)],[7.7,()=>CINE.punch(-3)],[11.5,()=>{CINE.punch(-4);CINE.trauma(0.15);}],[12.2,()=>{CINE.mood(WARM,0.14);CINE.rimPulse(0.8);}]]},
      shots:[MV(0,[KP.x+2.6,1.8,KP.z+3.8],[KP.x,2.6,KP.z],[KP.x+6.0,7.5,KP.z+9.0],[KP.x,2.0,KP.z],1.5,{ease:'outCubic',fov:44,fov2:52,move:'none'}),
        MV(1.5,F2.p,F2.l,F2b.p,F2b.l,3.6,{ease:'inOutSine',fov:42,fov2:38,move:'none'}),
        SH(5.1,[1.6,1.5,-14.8],[0,1.05,-11],{fov:44,move:'push',amp:0.8}),
        MV(6.6,[KP.x+2.2,1.6,KP.z+5.4],[KP.x,3.5,KP.z],[KP.x+1.5,1.9,KP.z+4.4],[KP.x,3.7,KP.z],4.8,{ease:'inOutSine',fov:42,fov2:37,roll:0,roll2:0.07,move:'none'}),
        MV(11.4,F5.p,F5.l,[F5.p[0]-1.0,F5.p[1]+0.05,F5.p[2]],[F5.l[0]-0.3,F5.l[1],F5.l[2]],3.6,{ease:'inOutSine',fov:42,move:'none'})],
      says:[[1.7,3.4,'koschei','Мои свечи?.. Все задули — до одной?..'],[6.8,4.6,'koschei','Тогда запру! Ключей у Кощея — не счесть:<br>Для каждого из вас и свой замок, и ключ свой есть!'],[11.9,2.8,'potap','Не запрёшь! Хоть сто замков навесь —<br>Мы друг дружку отопрём: мы вместе здесь!']],
      events:[{t:0.15,fn:()=>{k5s('shatter');shakeAll(0.06,0.5);KA.pose('recoil',{snap:true});const c=KP.clone().add(new V3(0,2,0));k5Flash(c,0xd0b0ff,7,0.5);k5Ring(new V3(KP.x,0.1,KP.z),0xd0b0ff,1,7,0.8,0.1);FX.sparkle(c,40,0xd0b0ff);
          for(let i=0;i<22;i++){const a=rand(0,6.28),e=rand(0.2,1.2);fxAdd('tetra',i%2?0xb080ff:0xe8d8ff,c.clone().add(new V3(Math.cos(a)*2.4,rand(-1,1.2),Math.sin(a)*2.4)),new V3(Math.cos(a)*rand(3,7),rand(2,6)*e,Math.sin(a)*rand(3,7)),{s:rand(0.09,0.18),life:rand(0.8,1.3),g:9,spin:8});}
          anim(0.6,k=>{dome.scale.setScalar(1+k*0.5);dome.children.forEach(m=>{if(m.material)m.material.opacity*=0.85;});});later(0.6,()=>{dome.visible=false;});}},
        {t:1.6,fn:()=>KA.pose('shrug',{antic:0.18})},{t:2.3,fn:()=>{KA.set('hRy',0.55);k5s('pSoft');}},{t:3.0,fn:()=>{KA.set('hRy',-0.55);k5s('pSoft');}},{t:3.7,fn:()=>KA.set('hRy',0)},{t:4.3,fn:pose('point',{antic:0.2})},
        {t:5.3,fn:()=>{pr.face=Math.atan2(po.pos.x-pr.pos.x,po.pos.z-pr.pos.z);ACT.emote(pr,'tilt');}},{t:5.6,fn:em(yo,'laugh')},{t:5.9,fn:em(pe,'pride')},{t:6.1,fn:em(po,'nod')},{t:6.4,fn:()=>{pr.face=Math.PI;}},
        {t:6.6,fn:pose('threat',{antic:0.25})},{t:7.7,fn:()=>{keys.visible=true;keys.scale.setScalar(0.01);anim(0.5,k=>keys.scale.setScalar(Math.max(0.01,CE.outBack(k))));k5s('keyFly');if(SFX.keys)SFX.keys();FX.sparkle(KS.hand.getWorldPosition(new V3()),12,0xc080ff);}},
        {t:9.2,fn:pose('castR',{antic:0.2})},{t:11.0,fn:()=>{const c=keys.position.clone();FX.sparkle(c,16,0xc080ff);k5Flash(c,0xb070ff,2.4,0.3);keys.visible=false;k5s('blink');}},
        {t:11.4,fn:()=>{ACT.emote(po,'effort');hWalk(po,POs.x,POs.z,0.5,Math.PI);later(0.5,()=>{FX.dust(new V3(POs.x,0.05,POs.z),10,0xd8c8a8,1.1);k5Ring(new V3(POs.x,0.1,POs.z),0xffe0a0,0.3,2,0.4,0.15);k5s('stomp');});}},
        {t:12.3,fn:em(po,'pride')},{t:13.3,fn:()=>[pr,pe,yo].forEach((h,i)=>ACT.emote(h,'nod',i*0.15))}],
      tick:(t)=>{if(keys.visible){const c=KS.hand.getWorldPosition(new V3()).add(new V3(0,0.5,0));keys.position.copy(c);const sp=t>9.2?9:4;keys.children.forEach((k,i)=>{const a=G.time*sp+i*Math.PI/2;k.position.set(Math.cos(a)*0.7,Math.sin(a*1.3)*0.15,Math.sin(a)*0.7);k.rotation.y=a;});}},
      end:()=>{W.anims.length=0;KA.reset();k5Del(keys);dome.visible=false;FIN.k5e.flow('trans1');}});}
  /* Сказ про мальчишку (отзыв 3): Пелагея досказывает сказку из своей тетрадки — про мальчишку, каким Кощей был давным-давно
     (в 5-1 — его игрушки и зеркальце «да только ты — один», у Кота — ученик с молотком, «просил переписать»). Три выбора — три рамки
     сказки: с чего начнётся, кто помогал, чем кончится. В каждом варианте герои и помощник встают рядом с мальчишкой — он не один,
     и за этим к героям возвращаются имена. Пояснение под каждым облачком — про что этот вариант. */
