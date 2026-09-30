/* ============================== РЕЛИЗ final06 · ПРОЛОГ: ПРОШКА НЕСЁТ САМОКАТ ТИШКЕ ============================== */
// В ролике «Колыбельная» Прошка предлагал бельчонку самокат, а самокат сам подъезжал к Тишке и рассыпался. Теперь это сценка:
// Прошка подходит к самокату, поднимает его и гордо несёт Тишке через всю комнату, из-за самоката не видит пола, наступает
// на шишку, спотыкается и падает плашмя, самокат вылетает из лап, врезается в ступеньку и разваливается. Смеются все:
// Йоша (запись «Ха-ха-ха!» с субтитром), Тишка, Потап и Пелагея (их смех звучит поверх, без субтитров), а Прошка
// поднимается и смеётся над собой: «Ха-ха! Вот это я прокатился!».
// Ролик прототипа не переписывается: rep_30_gameplay.py оборачивает его определение в FIN.lulGag(def,ctx). Всё, что в ролике
// шло с момента краха самоката (16,3 с), сдвигается на LG_D секунд, прежние события самоката и смех Йоши заменяются сценкой.
// Позы Прошки — добавочный канал поверх тела (как в late_83): снимается в начале кадра, кладётся в конце.
const LG_D=4.4,LG_T0=16.3;
const LG={on:false,c:null,s:null};
// смех «хором»: запись звучит поверх текущего голоса и не обрывает его (субтитр — только у реплики Йоши)
function lgLaugh(who,text,gain){try{const e=VOX.map.get(voxKey(who,text));if(!e||e.bad||!voxOn())return;
  voxDecode(e).then(b=>{if(!b||!G.cine||!AC)return;const s=AC.createBufferSource();s.buffer=b;const g=AC.createGain();g.gain.value=(e.gain||1)*(gain||0.8);
    s.connect(g);g.connect(voxBus());s.start();LG.layers=(LG.layers||0)+1;if(FIN.voxEv)try{FIN.voxEv(e.id,'layer',gain||0.8);}catch(err){}});}catch(err){}
  const h=HERO[who];if(h)h._talk=Math.max(h._talk||0,1.3);else{const n=npcByWho(who);if(n)n.talk=Math.max(n.talk||0,1.3);}}
function lgNpcLaugh(who,d){const n=npcByWho(who);if(n)n.em={type:'laugh',t:0,d:d||1.2};}
{const _st=step;step=function(dt){if(LG.c)aRestore(LG.c);_st(dt);if(LG.c&&LG.on)aApply(LG.c);};}
// лапы вперёд, пока несёт самокат (holding прототип сбрасывает каждый кадр — ставим перед расчётом позы)
{const _hp=heroPose;heroPose=function(h,dt){if(LG.carry&&h===HERO.proshka)h.holding=true;return _hp(h,dt);};}
{const _ll=loadLevel;loadLevel=function(i){LG.on=false;LG.carry=false;LG.s=null;_ll(i);};}
FIN.lulState=()=>({on:LG.on,layers:LG.layers||0,broke:!!(LG.s&&LG.s.broke)});   // для ботов
FIN.lulGag=function(def,ctx){
  const D=LG_D,T0=LG_T0,sc=ctx.sc,H=HERO,pr=H.proshka;
  // ---------- сдвиг ролика: всё после краха — позже на D; прежние самокат, «Ха-ха-ха!» и общий план краха — убрать ----------
  def.dur+=D;
  def.shots=def.shots.filter(s=>s.t!==16.4).map(s=>(s.t>=T0?Object.assign({},s,{t:s.t+D}):s));
  def.says=def.says.filter(y=>y[3]!=='Ха-ха-ха!').map(y=>(y[0]>=T0?[y[0]+D].concat(y.slice(1)):y));
  def.events=def.events.filter(e=>e.t!==14.3&&e.t!==16.3&&e.t!==16.7).map(e=>(e.t>=T0?{t:e.t+D,fn:e.fn}:e));
  // ---------- точки сценки ----------
  const P0=new V3(-4.0,0,0.3),PK=new V3(-4.45,0,-0.4),PT=new V3(-4.5,0,-2.05),SC0=sc.g.position.clone(),SCR=sc.g.rotation.y,LAND=new V3(-4.55,0,-3.28);
  const FACE_SC=Math.atan2(SC0.x-PK.x,SC0.z-PK.z),FACE_GO=Math.atan2(PT.x-PK.x,PT.z-PK.z),FACE_UP=0.6;
  // шишка на полу — на неё Прошка и наступит
  const cone=new THREE.Mesh(new THREE.ConeGeometry(0.075,0.2,7),M(0x7a4a22));cone.rotation.z=Math.PI/2;cone.rotation.y=0.4;cone.position.set(-4.47,0.075,-2.22);cone.castShadow=true;W.group.add(cone);
  const C0=cone.position.clone(),C1=new V3(-4.2,0.075,-3.1);
  // самокат стоял на месте с загрузки уровня — пачки статики (late_26) могли склеить его: расклеить, в пачки больше не брать
  for(const o of[sc.g,cone])o.traverse(c=>{c.userData.batchNo=true;c.userData.noBatchL=true;if(c.userData.bat)try{batUnglue(c);}catch(e){}});
  if(!LG.c)LG.c=aChan(pr.body);
  const S={broke:false,rel:null,fwd:new V3()};LG.s=S;
  const live=t=>G.cine&&G.cine.t>=t-0.3;   // событие наступило само, а не при пропуске ролика
  // несёт перед собой вдоль хода, руль вверх и вперёд — выше мордочки: пола не видно
  const carry=()=>{const a=pr.g.rotation.y;return new V3(pr.pos.x+Math.sin(a)*0.3,0.44+Math.abs(Math.sin(G.time*9))*0.03,pr.pos.z+Math.cos(a)*0.3);};
  const crash=()=>{if(S.broke)return;S.broke=true;sc.parts.slice().forEach(m=>debris(m,new V3(rand(-2.4,2.4),rand(2,4.2),rand(-0.4,2.6)),0));};
  // ---------- кадры ----------
  def.shots.push(shot(14.75,[-1.0,1.55,-0.9],[-4.4,0.72,-1.2],[-1.15,1.45,-1.8],[-4.5,0.62,-2.5],2.4),
    shot(17.8,[-3.6,2.0,-4.4],[0.6,0.6,-0.2]),             // от лежащего Прошки — друзья хохочут
    shot(18.7,[-2.6,1.0,-1.4],[-4.4,0.45,-3.2]),           // Тишка смеётся на лесенке над Прошкой
    shot(19.6,[-3.35,1.3,-0.55],[-4.5,0.72,-2.25]));
  def.shots.sort((a,b)=>a.t-b.t);
  // ---------- реплики ----------
  def.says.push([17.9,1.8,'yosha','Ха-ха-ха!'],[19.7,3.2,'proshka','Ха-ха! Вот это я прокатился!']);
  def.says.sort((a,b)=>a[0]-b[0]);
  // ---------- события ----------
  def.events.push(
    {t:14.1,fn:()=>{LG.on=true;pr.face=FACE_SC;}},
    {t:14.8,fn:()=>{pr.face=FACE_GO;}},
    {t:15.0,fn:()=>{if(live(15.0))SFX.swish();}},
    {t:15.35,fn:()=>{if(live(15.35))ACT.emote(pr,'pride');}},
    {t:16.9,fn:()=>{if(live(16.9)){SFX.toss();ACT.emote(pr,'surprise');}}},
    {t:17.0,fn:()=>{S.rel=sc.g.position.clone();if(live(17.0))SFX.whoosh();}},
    {t:17.45,fn:()=>{if(live(17.45))SFX.crash();crash();}},
    {t:17.5,fn:()=>{if(!live(17.5))return;SFX.thud();FX.dust(new V3(pr.pos.x,0.05,pr.pos.z-0.5),10,0xe6dcc4,0.9);}},
    {t:17.65,fn:()=>{if(live(17.65))FX.stars(new V3(pr.pos.x,0.45,pr.pos.z-0.95),6);}},
    // смеются все
    {t:17.9,fn:()=>{if(!live(17.9))return;ACT.emote(H.yosha,'laugh');}},
    {t:18.75,fn:()=>{if(!live(18.75))return;lgNpcLaugh('tishka',2.2);lgLaugh('tishka','Хи-хи-хи!',0.9);}},
    {t:18.2,fn:()=>{if(!live(18.2))return;ACT.emote(H.potap,'laugh');lgLaugh('potap','Хо-хо-хо!',0.8);}},
    {t:18.45,fn:()=>{if(!live(18.45))return;ACT.emote(H.pelageya,'laugh');lgLaugh('pelageya','Ха-ха-ха!',0.75);}},
    {t:18.95,fn:()=>{if(live(18.95))floatText(new V3(pr.pos.x,0.9,pr.pos.z-0.6),'Э-э…','#ff9a66');}},
    {t:19.1,fn:()=>{if(live(19.1))ACT.emote(H.yosha,'laugh');}},
    {t:19.35,fn:()=>{if(live(19.35))ACT.emote(H.potap,'laugh');pr.face=FACE_UP;}},
    {t:19.6,fn:()=>{if(live(19.6))ACT.emote(H.pelageya,'laugh');}},
    {t:19.8,fn:()=>{if(!live(19.8))return;ACT.emote(pr,'laugh');FX.dust(new V3(pr.pos.x,0.05,pr.pos.z),6,0xe6dcc4,0.6);}},
    {t:20.6,fn:()=>{if(!live(20.6))return;for(const k of['yosha','potap','pelageya'])ACT.emote(H[k],'laugh',k==='yosha'?0:k==='potap'?0.15:0.3);lgNpcLaugh('tishka',2.0);}},
    {t:21.4,fn:()=>{if(!live(21.4))return;ACT.emote(pr,'laugh');ACT.emote(H.potap,'laugh');}},
    {t:22.1,fn:()=>{if(!live(22.1))return;ACT.emote(H.yosha,'laugh');ACT.emote(H.pelageya,'laugh');lgNpcLaugh('tishka',1.0);}});
  // ---------- тик: прежний ролик видит «своё» время, сценка — время ролика ----------
  const tk=def.tick;
  def.tick=(t,dt)=>{tk(t<T0?t:t<T0+D?T0:t-D,dt);lgTick(t,dt||0);};
  function lgTick(t){const c=LG.c;
    if(t<14.1)return;
    LG.carry=t>=15.0&&t<17.0;
    if(t>=20.2){LG.on=false;
      if(t>=def.dur-0.01&&!S.broke)crash();   // пропуск ролика: самокат всё равно разбит
      return;}
    LG.on=true;let pitch=0,ly=0;
    // Прошка
    if(t<14.8){const k=smooth((t-14.1)/0.7);pr.pos.x=lerp(P0.x,PK.x,k);pr.pos.z=lerp(P0.z,PK.z,k);}
    else if(t<15.2){pr.pos.x=PK.x;pr.pos.z=PK.z;pitch=0.45*Math.sin(Math.PI*(t-14.8)/0.4);}
    else if(t<16.9){const k=smooth((t-15.2)/1.7);pr.pos.x=lerp(PK.x,PT.x,k);pr.pos.z=lerp(PK.z,PT.z,k);pitch=-0.08;ly=Math.abs(Math.sin(t*9))*0.04;}
    else{pr.pos.x=PT.x;pr.pos.z=PT.z;
      if(t<17.0)pitch=0.35*(t-16.9)/0.1;
      else if(t<17.5){const k=(t-17.0)/0.5;pitch=0.35+(1.52-0.35)*k*k;ly=0.1*k;}
      else if(t<17.75){const k=(t-17.5)/0.25;pitch=1.52-0.1*Math.sin(Math.PI*k);ly=0.1+0.08*Math.sin(Math.PI*k);}
      else if(t<18.9){pitch=1.52;ly=0.1;}
      else if(t<19.3){const k=smooth((t-18.9)/0.4);pitch=1.52-0.24*k;ly=0.1;}
      else{const k=smooth((t-19.3)/0.65);pitch=1.28*(1-k);ly=0.1*(1-k);}}
    c.nr.x+=pitch;c.np.y+=ly;
    // самокат
    if(t<14.8){}
    else if(t<15.2){const k=smooth((t-14.8)/0.4),to=carry();sc.g.position.lerpVectors(SC0,to,k);sc.g.rotation.set(0,SCR+angN(pr.g.rotation.y-SCR)*k,0);}
    else if(t<17.0){sc.g.position.copy(carry());sc.g.rotation.set(0,pr.g.rotation.y,0);}
    else if(t<17.45&&!S.broke){const k=(t-17.0)/0.45,R=S.rel||carry();sc.g.position.set(lerp(R.x,LAND.x,k),lerp(R.y,LAND.y,k)+0.75*Math.sin(Math.PI*k),lerp(R.z,LAND.z,k));
      sc.g.rotation.set(1.6*k,pr.g.rotation.y,0.5*k);}
    // шишка отлетает из-под лапы
    if(t>=16.9&&t<17.5){const k=smooth((t-16.9)/0.6);cone.position.lerpVectors(C0,C1,k);cone.rotation.x=-k*9;}
    // Йоша подпрыгивает от смеха (прежний тик каждый кадр опускает его на место)
    if(t>=17.9&&t<19.5)H.yosha.extraY=Math.abs(Math.sin((t-17.9)*12))*0.25;
    else if(t>=20.6&&t<21.8)H.yosha.extraY=Math.abs(Math.sin((t-20.6)*11))*0.18;}
  return def;};
