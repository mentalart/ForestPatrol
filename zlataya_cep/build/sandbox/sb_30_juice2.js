/* ============================== ПОЛИГОН · ЗАХОД 2: ЧЕКПОИНТ, БОССЫ, КООПЕРАТИВ, МИР, МИКС, ДОСТУПНОСТЬ (docs/23_vfx_sfx.md) ============================== */
// Только для сборки --sandbox. Предложения — в общей панели (JU.feats, группа 2), всё вместе выключает та же Ё (JU.all).
// Выключено — как в релизе: обёртки зовут исходные функции, микшер пропускает звук без изменений (усиление 1, лимитер в обход).
// Локации захода 2 (луг, колокольчик, уголок на двоих, арена босса-манекена) — sb_40_level2.js.
JU.round=2;
[['bell','4.4','Колокольчик как «костёр»','вспышка, кольца, музыкальная фраза; музыка на миг затихает — «покой»'],
 ['bossIntro','5.1','Представление босса','имя с орнаментом, удар суббаса, секунда тишины перед темой'],
 ['bossPhase','5.2','Смена этапа','стингер, тема выше и быстрее, вспышка ауры, частицы меняют цвет'],
 ['weak','5.3','Слабое место','золотое пульсирующее свечение и «звяк», пока открыто'],
 ['lastHit','5.4','Последний удар','замедление → тишина → колокольная россыпь'],
 ['coChord','6.1','Общий аккорд','плита на двоих и удар вместе — по ноте от каждого героя'],
 ['friendArrow','6.2','Где друг','стрелка его цвета у края экрана, если друг за кадром'],
 ['callPan','6.3','Зов со стороны друга','«Ко мне!» звучит с той стороны, где зовущий; свой мотив вместо писка'],
 ['grass','7.1','Трава и кусты','трава и цветы приминаются вокруг героя, кусты качаются и шуршат'],
 ['magic','7.2','Волшебные вещи светятся','ореол и «пыльца» за летящим пером, гусли мерцают'],
 ['pickup','7.3','Звено летит к герою','по дуге к герою, счётчик звеньев подпрыгивает'],
 ['amb','7.4','Эмбиент','ветер, птицы, капель и редкие звуки по сторонам (дятел, кукушка)'],
 ['layers','8.1','Музыка «спокойно / бой»','рядом морок — ударные и остинато; после боя гаснут за 2,5 с'],
 ['sameLimit','8.2','Не больше трёх одинаковых','одинаковый звук — не больше 3 за 0,1 с (пять звонов не дают кашу)'],
 ['limiter','8.3','Лимитер на выходе','компрессор-лимитер на общем выходе — без клиппинга'],
 ['shakeK','9.1','Тряска 0 / 50 / 100 %','три ступени вместо «вкл / слабая» (выбор — ниже на панели)'],
 ['flashK','9.2','Вспышки 0 / 50 / 100 %','яркость вспышек экрана и спрайтов (выбор — ниже на панели)'],
 ['captions','9.3','Подписи к звукам','«[бубенец справа]» внизу экрана: сигналы, зов, колокольчик, босс'],
 ['rumble','9.4','Вибрация геймпада','удар, урон, сигнал «на тебя» (нужен геймпад)'],
 ['calm','9.5','Без резких вспышек','вспышки не ярче 25 % и гаснут плавно, без мигания']
].forEach(f=>{f[4]=2;JU.feats.push(f);JU.f[f[0]]=true;});
const J2={s:{shake:1,flash:1},cnt:{},slowK:1,slowT:0,calmT:0,hushT:0,bat:0,arrows:[],caps:[],orig:{},sameT:{},amb:{on:false,t:{}},boss:null,co:null,meadow:null,magic:[]};
FIN.ju2=J2;J2.T={SFX,shake:(...a)=>shake(...a),audio:()=>initAudio()};   // для бота tsb_juice2
const j2c=k=>{J2.cnt[k]=(J2.cnt[k]||0)+1;};
{const _ld=JU.load;JU.load=()=>{_ld();try{const o=JSON.parse(localStorage.getItem('zc_sandbox_v2')||'null');if(o&&o.s2)Object.assign(J2.s,o.s2);}catch(e){}};
 const _sv=JU.save;JU.save=()=>{_sv();try{const o=JSON.parse(localStorage.getItem('zc_sandbox_v2')||'{}');o.s2=J2.s;localStorage.setItem('zc_sandbox_v2',JSON.stringify(o));}catch(e){}};}

/* ---------- микшер: шины музыки, голосов и эффектов → лимитер → выход ---------- */
// Всё, что прототип и модули подключают к AC.destination, идёт через шины полигона: музыка (FIN.music), голоса (voxBus), остальное — эффекты.
// Выключено — усиление шин 1, лимитер в обход: звук тот же, что в релизе.
const MIX={ready:false,route:null};J2.mix=MIX;
const j2Con=AudioNode.prototype.connect;
function j2MixInit(){if(MIX.ready||!AC)return;MIX.ready=true;const c=(a,b)=>j2Con.call(a,b);
  MIX.out=AC.createGain();MIX.dry=AC.createGain();MIX.wet=AC.createGain();MIX.wet.gain.value=0;
  MIX.lim=AC.createDynamicsCompressor();MIX.lim.threshold.value=-6;MIX.lim.knee.value=2;MIX.lim.ratio.value=20;MIX.lim.attack.value=0.002;MIX.lim.release.value=0.12;
  c(MIX.out,MIX.dry);c(MIX.out,MIX.lim);c(MIX.lim,MIX.wet);c(MIX.dry,AC.destination);c(MIX.wet,AC.destination);
  for(const k of ['mus','vox','sfx']){MIX[k]=AC.createGain();c(MIX[k],MIX.out);}MIX.amb=AC.createGain();}   // amb подключается к master (громкость «Эффекты»)
AudioNode.prototype.connect=function(d){if(AC&&d===AC.destination&&this.context===AC){j2MixInit();if(this!==MIX.dry&&this!==MIX.wet){const r=MIX[MIX.route||'sfx'];arguments[0]=r;}}
  return j2Con.apply(this,arguments);};
if(FIN.music){const _s=FIN.music.start;FIN.music.start=function(){MIX.route='mus';try{return _s.apply(this,arguments);}finally{MIX.route=null;}};}
{const _vb=voxBus;voxBus=function(){MIX.route='vox';try{return _vb.apply(this,arguments);}finally{MIX.route=null;}};}
function j2MixTick(dt){if(!MIX.ready)return;const t=AC.currentTime,set=(g,v,k)=>g.gain.setTargetAtTime(v,t,k||0.05);
  J2.calmT=Math.max(0,J2.calmT-dt);J2.hushT=Math.max(0,J2.hushT-dt);
  let m=1;if(JU.duckT>0&&juOn('hurt'))m*=0.45;                                  // заход 1: музыка приседает при уроне
  if(J2.calmT>0&&juOn('bell'))m*=0.3;if(J2.hushT>0)m*=0;                         // «покой» у колокольчика, тишина босса
  set(MIX.mus,m,J2.hushT>0?0.03:0.12);set(MIX.amb,J2.calmT>0&&juOn('bell')?0.35:J2.hushT>0?0.2:1,0.2);
  const L=juOn('limiter');MIX.limOn=L;set(MIX.dry,L?0:1,0.01);set(MIX.wet,L?1:0,0.01);}

/* ---------- 8.2: не больше трёх одинаковых звуков за 0,1 с ---------- */
function j2Same(key){if(!juOn('sameLimit'))return true;const now=performance.now(),a=(J2.sameT[key]=(J2.sameT[key]||[]).filter(t=>now-t<100));
  if(a.length>=3){j2c('dropped');return false;}a.push(now);return true;}
function j2LimitAll(){for(const k of Object.keys(SFX)){const o=SFX[k];if(typeof o!=='function'||o._j2)continue;const f=function(){if(!j2Same('sfx:'+k))return;return o.apply(this,arguments);};f._j2=true;SFX[k]=f;}
  for(const k of Object.keys(JU.snd)){const o=JU.snd[k];if(typeof o!=='function'||o._j2||k==='step'||k==='note'||k==='stitch')continue;const f=function(){if(!j2Same('ju:'+k))return;return o.apply(this,arguments);};f._j2=true;JU.snd[k]=f;}}

/* ---------- звуки захода 2 ---------- */
const j2Pan=p=>p<-0.2?'слева':p>0.2?'справа':'рядом';
const J2S={
  bell(p){[0,2,4,7].forEach((n,i)=>juBL(ladHz(n+7)/2,{v:0.06,d:1.4,at:i*0.13,wet:0.6,pan:p}));juBL(ladHz(14)/2,{v:0.05,d:2.2,at:0.62,wet:0.7,pan:p});
    for(let i=0;i<7;i++)juOS({type:'triangle',f0:ladHz(i)*1,d:0.5,v:0.03,at:0.05+i*0.045,wet:0.5,pan:p+(i-3)*0.08});juTH({f0:90,f1:50,d:0.6,v:0.12});},
  sub(){juTH({f0:62,f1:30,d:1.6,v:0.5});juNZ({type:'lowpass',f0:220,f1:60,d:1.4,v:0.12,a:0.01});juBL(ladHz(0)/4,{v:0.05,d:2.4,wet:0.7});},
  stinger(st){const b=st*2;[0,3,7].forEach((n,i)=>juOS({type:'sawtooth',f0:ladHz(b+n)/2,d:0.55,v:0.035,lp:1800,lp1:600,at:i*0.02,wet:0.3}));
    juTH({f0:120,f1:38,d:0.5,v:0.4});juNZ({f0:400,f1:4000,d:0.45,v:0.07,q:0.9,a:0.3});juBL(ladHz(b+7),{v:0.06,d:1.2,at:0.45,wet:0.5});},
  zvyak(p){juBL(2637,{v:0.035,d:0.35,wet:0.35,pan:p});juOS({type:'square',f0:1318,f1:1240,d:0.04,v:0.012,lp:3500,pan:p});},
  shower(p){for(let i=0;i<14;i++){const n=[7,9,11,12,14,11,9,7,4,7,9,12,14,16][i];juBL(ladHz(n),{v:0.045,d:1.6,at:i*0.075+Math.random()*0.02,wet:0.65,pan:clamp(p+Math.sin(i*1.7)*0.6,-0.9,0.9)});}
    juBL(ladHz(0)/2,{v:0.07,d:3,at:1.1,wet:0.8});},
  chord(heroes,p){const deg=[0,4,7,2];heroes.forEach((h,i)=>{const f=ladHz(deg[i%4]+(h.kind==='potap'?0:7)),pan=h?juPan(h.pos,h.player):p;
      if(h.kind==='potap')juOS({type:'triangle',f0:f/2,d:1.1,v:0.09,a:0.01,wet:0.4,pan});
      else if(h.kind==='pelageya')juBL(f,{v:0.07,d:1.4,wet:0.5,pan});
      else if(h.kind==='yosha')juOS({f0:f*2,d:0.9,v:0.05,a:0.02,vib:0.01,vibF:6,wet:0.5,pan});
      else juOS({type:'triangle',f0:f,d:0.7,v:0.07,a:0.004,wet:0.4,pan});});
    juBL(ladHz(14),{v:0.03,d:1.6,at:0.12,wet:0.7,pan:p});},
  call(p,kind){const k=juK({kind}),f=660*k;juOS({type:'triangle',f0:f,f1:f*1.34,d:0.22,v:0.07,glide:0.12,a:0.01,wet:0.35,pan:p});juOS({type:'triangle',f0:f*1.34,f1:f,d:0.42,v:0.06,at:0.22,glide:0.3,wet:0.45,pan:p});
    juBL(f*2,{v:0.02,d:0.6,at:0.05,wet:0.5,pan:p});},
  rustle(p,w){juNZ({f0:rand(2800,4200),f1:rand(1500,2400),d:0.28*w+0.1,v:0.05*w,q:0.8,a:0.03,pan0:p-0.1,pan1:p+0.1});},
  bird(p){const f=rand(2400,3400),n=2+Math.floor(Math.random()*3);for(let i=0;i<n;i++)juOS({f0:f,f1:f*rand(1.15,1.4),d:0.08,v:0.022,glide:0.06,at:i*0.11,wet:0.35,pan:p});},
  drop(p){const f=rand(1100,1900);juOS({f0:f,f1:f*0.55,d:0.07,v:0.025,glide:0.05,wet:0.6,pan:p});},
  pecker(p){for(let i=0;i<9;i++)juNZ({f0:1400,q:5,d:0.02,v:0.05*(1-i*0.07),a:0.001,at:i*0.055,wet:0.4,pan:p});},
  cuckoo(p){juOS({type:'triangle',f0:784,d:0.28,v:0.04,a:0.02,wet:0.5,pan:p});juOS({type:'triangle',f0:622,d:0.42,v:0.04,a:0.02,at:0.34,wet:0.5,pan:p});},
  pollen(){juBL(rand(3000,4200),{v:0.008,d:0.4,wet:0.6});}};
J2.snd=J2S;
// звуки эмбиента — в свою шину перед master (её глушит «покой» колокольчика): на время вызова AUD.out пишет в неё
function j2Amb(fn){if(!MIX.ambOn){j2Con.call(MIX.amb,master);MIX.ambOn=true;}const m=master;master=MIX.amb;try{fn();}finally{master=m;}}

/* ---------- 9.3: подписи к звукам ---------- */
const J2CAP=document.createElement('div');J2CAP.style.cssText='position:fixed;left:50%;bottom:84px;transform:translateX(-50%);z-index:45;pointer-events:none;display:flex;flex-direction:column;align-items:center;gap:4px;font:600 15px/1.25 system-ui,sans-serif';document.body.appendChild(J2CAP);
function j2Cap(text,p){if(!juOn('captions'))return;j2c('caption');const d=document.createElement('div');d.textContent='['+text+(p==null?'':' '+j2Pan(p))+']';
  d.style.cssText='background:rgba(14,12,20,.78);color:#fff;padding:3px 10px;border-radius:8px;transition:opacity .4s';J2CAP.appendChild(d);while(J2CAP.children.length>3)J2CAP.firstChild.remove();
  setTimeout(()=>{d.style.opacity='0';setTimeout(()=>d.remove(),450);},2200);}
J2.cap=j2Cap;

/* ---------- 9.4: вибрация, 9.1: тряска, 9.2/9.5: вспышки ---------- */
{const _r=rumble;rumble=function(pi,amp,dur){j2c('rumble');return _r.apply(this,arguments);};}
const j2Rum=(pi,amp,dur)=>{if(juOn('rumble')&&pi!=null){j2c('rumbleNew');rumble(pi,amp,dur);}};
{const _sh=shake;shake=function(pi,amp,dur){if(juOn('shakeK'))amp*=J2.s.shake;J2.lastShake=amp;return _sh(pi,amp,dur);};}
const j2FlashK=()=>(juOn('flashK')?J2.s.flash:1)*(juOn('calm')?0.25:1);
{const st=document.createElement('style');st.textContent='body.j2-flk #flash{filter:opacity(var(--j2flk,1))}body.j2-calm #flash{transition:opacity .35s ease-out !important}';document.head.appendChild(st);}
function j2FlashCss(){const on=juOn('flashK')||juOn('calm');document.body.classList.toggle('j2-flk',on);document.body.classList.toggle('j2-calm',juOn('calm'));document.documentElement.style.setProperty('--j2flk',String(j2FlashK()));}
if(CINE.flashDip){const _fd=CINE.flashDip;CINE.flashDip=function(col,a){if(JU.all&&(juOn('flashK')||juOn('calm')))a=Math.min((a||0.5)*j2FlashK(),juOn('calm')?0.25:1);return _fd.call(this,col,a);};}
// вспышки-спрайты полигона (заход 1 и 2) — тоже по регулятору
{const _sp=juSprite;juSprite=function(kind,col,pos,size,life,o){o=o||{};if(JU.all&&(juOn('flashK')||juOn('calm'))){const k=j2FlashK();o.op=(o.op==null?1:o.op)*k;if(juOn('calm')&&o.shape==='flash')life=Math.max(life,0.3);}return _sp(kind,col,pos,size,life,o);};}

/* ---------- 4.4: колокольчик-«костёр» ---------- */
J2.orig.bell=SFX.bell;
SFX.bell=function(){let hit=null,pi=0;for(const b of W.bells){b._jA=b._jA||[false,false];for(const q of [0,1])if(b.act[q]&&!b._jA[q]){hit=b;pi=q;}}
  for(const b of W.bells)b._jA=b.act.slice();
  if(!hit||!juOn('bell'))return J2.orig.bell.apply(this,arguments);
  j2c('bell');const top=new V3(hit.x+0.55,hit.y+1.9,hit.z),h=active(pi),p=juPan(top,pi);J2S.bell(p);J2.calmT=1.8;j2Cap('колокольчик-закладка',p);
  juSprite('dot',0xffe2a0,top.clone(),5.5*(0.6+0.4*JU.s.fx),0.45,{op:0.9*JU.s.fx,shape:'flash'});juSprite('star',0xfff4c0,top.clone(),2.4,0.6,{spin:3});
  const g=new V3(hit.x,hit.y+0.08,hit.z);ringFx(g,COL.gold,3.2);later(0.18,()=>ringFx(g,0xfff2b0,4.6));
  if(FIN.fx){FIN.fx.sparkle(top,16,0xfff2b0);FIN.fx.stars(top,8,0xffd76a);}
  if(h)hit.bm.emissiveIntensity=1.2;J2.bellGlow={b:hit,t:0};};

/* ---------- 6.3: зов со стороны друга ---------- */
J2.orig.call=SFX.call;
{const _dc=doCall;doCall=function(pi){J2.callPi=pi;try{return _dc.apply(this,arguments);}finally{J2.callPi=null;}};}
SFX.call=function(){if(!juOn('callPan')||J2.callPi==null)return J2.orig.call.apply(this,arguments);const pi=J2.callPi,h=active(pi);
  // где зовущий: в раздельном экране — его половина, в общем — место на экране
  const p=PANES.length>1?(pi?0.65:-0.65):juPan(h.pos,pi);j2c('call');J2.lastCallPan=p;J2S.call(p,h.kind);j2Cap('зов: '+(h.d&&h.d.name||'друг'),p);};

/* ---------- удары: общий аккорд при одновременном, вибрация, сигнал на тебя ---------- */
{const _eh=enemyHit;enemyHit=function(e,h){const emb=e&&e.embers;const r=_eh.apply(this,arguments);
  try{if(e&&h&&JU.all){if(e.embers<emb||!e.alive)j2Rum(h.player,0.025,0.08);
    const T=e._j2T||(e._j2T=[-9,-9]);T[h.player]=G.time;
    if(!G.solo&&Math.abs(T[0]-T[1])<0.3&&G.time-(e._j2Co||-9)>0.6){e._j2Co=G.time;j2CoHit(e);}}}catch(err){console.error('sandbox co',err);}
  return r;};}
function j2CoHit(e){j2c('coHit');if(!juOn('coChord'))return;j2c('coChord');const hs=[active(0),active(1)];J2S.chord(hs,juPan(e.pos,0));
  floatText(e.pos.clone().add(new V3(0,2.4,0)),'Вместе!','#ffe08a');ringFx(e.pos,COL.gold,2.4);if(FIN.fx)FIN.fx.stars(e.pos.clone().add(new V3(0,1.2,0)),8,0xffd76a);}
{const _dh=damageHero;damageHero=function(h){const ok=_dh.apply(this,arguments);if(ok&&JU.all){j2Rum(h.player,0.06,0.25);if(juOn('captions'))j2Cap('ой! — '+(h.d&&h.d.name||'герой'),juPan(h.pos,h.player));}return ok;};}
{const _fw=foeWind;foeWind=function(e){const r=_fw.apply(this,arguments);   // зовётся один раз в начале замаха
  try{if(JU.all&&e.tgt&&e.sig){j2Rum(e.tgt.player,0.012,0.12);
    const L={yellow:'бубенец — щит',red:'рык — уходи',blue:'вжух — летит'}[e.sig];if(L&&(J2.capT||0)<G.time-0.5){J2.capT=G.time;j2Cap(L,juPan(e.pos,e.tgt.player));}}}catch(err){console.error('sandbox wind',err);}
  return r;};}

/* ---------- 7.3: звено летит к герою по дуге, счётчик подпрыгивает ---------- */
{const _ti=takeItem;takeItem=function(it,h){const was=it.taken;const r=_ti.apply(this,arguments);
  try{if(!was&&it.taken&&juOn('pickup')&&h&&it.g){j2c('pickup');const g=it.g,from=it.pos.clone();W.group.add(g);
    anim(0.42,k=>{const to=h.pos.clone().add(new V3(0,heroHeight(h)*0.65,0)),p=from.clone().lerp(to,k*k);p.y+=Math.sin(k*Math.PI)*1.3;g.position.copy(p);g.scale.setScalar(Math.max(0.05,1-k*0.7));g.rotation.y+=0.4;
      if(k>=1){W.group.remove(g);const el=$(it.kind==='link'?'links':'links');if(el&&el.animate){j2c('hudBump');el.animate([{transform:'scale(1)'},{transform:'scale(1.32)',offset:0.35},{transform:'scale(1)'}],{duration:320,easing:'ease-out'});}
        if(FIN.fx)FIN.fx.sparkle(to,5,0xffe08a);}});}}catch(err){console.error('sandbox pickup',err);}
  return r;};}

/* ---------- 6.2: стрелка к другу у края экрана ---------- */
for(let i=0;i<2;i++){const d=document.createElement('div');d.style.cssText='position:fixed;left:0;top:0;width:0;height:0;z-index:42;pointer-events:none;display:none;border-left:16px solid transparent;border-right:16px solid transparent;border-bottom:30px solid #fff;filter:drop-shadow(0 0 4px rgba(0,0,0,.6))';document.body.appendChild(d);J2.arrows.push(d);}
function j2Arrows(){const show=juOn('friendArrow')&&G.state==='play'&&!G.cine&&!G.solo;
  for(let i=0;i<2;i++){const el=J2.arrows[i];el.style.display='none';if(!show)continue;
    const split=PANES.length>1,P=split?PANES[i]:PANES[0];if(!P)continue;const f=active(1-i);if(!split&&i===1)continue;
    // в общем экране — стрелка к тому, кто вышел за кадр (камера обычно держит обоих)
    const tgts=split?[f]:[active(0),active(1)];
    for(const t of tgts){const v=t.pos.clone().add(new V3(0,1,0)).project(P.cam);const behind=v.z>1;let x=v.x,y=v.y;if(behind){x=-x;y=-y;}
      if(!behind&&Math.abs(x)<0.95&&Math.abs(y)<0.95)continue;const m=Math.max(Math.abs(x),Math.abs(y))||1;x/=m;y/=m;
      const H=P.h,px=P.x+(x*0.9+1)/2*P.w,py=(1-(y*0.9+1)/2)*H,ang=Math.atan2(x,y);
      el.style.display='block';el.style.borderBottomColor=PCSS[t.player];el.style.transform='translate('+(px-16)+'px,'+(py-15)+'px) rotate('+ang+'rad)';j2c('arrowFrame');break;}}}

/* ---------- 8.1: музыка «спокойно / бой» ---------- */
// голоса треков: громкость ударных зависит от J2.bat (спокойно — тише, бой — полностью), добавлены бочка, рамочный бубен и остинато.
// Флажок выключен — ударные как в релизе, добавленные голоса молчат (громкость 0,0001).
if(FIN.music&&FIN.music.TR){const TR=FIN.music.TR;const B=TR.boss;
  const cl=(o,root,bpm)=>{const c=JSON.parse(JSON.stringify(o));c.root=root;c.bpm=bpm;return c;};
  TR.sbBoss1=cl(B,B.root,B.bpm);TR.sbBoss2=cl(B,B.root+2,B.bpm+12);TR.sbBoss3=cl(B,B.root+5,B.bpm+24);TR.sbHush={bpm:60,root:60,sc:'aeo',len:16,v:[]};
  const lay=()=>juOn('layers');
  for(const k in TR){const T=TR[k];if(k==='title'||k==='sbHush'||!T.v)continue;const boss=k==='boss'||k.indexOf('sbBoss')===0;
    for(const v of T.v){if(!v.drum)continue;const b=v.vol;Object.defineProperty(v,'vol',{configurable:true,get:()=>lay()&&!boss?Math.max(0.0001,b*(0.15+0.85*J2.bat)):b});}
    if(boss)continue;
    const add=(v,b)=>{Object.defineProperty(v,'vol',{configurable:true,get:()=>lay()?Math.max(0.0001,b*J2.bat):0.0001});T.v.push(v);};
    add({i:'kick',drum:'x.......x..x....'},0.07);add({i:'frame',drum:'....x.......x.x.'},0.035);
    add({i:'pluck',oct:-12,seq:[[[0,.25],[0,.25],[4,.25],[0,.25],[2,.25],[0,.25],[4,.25],[3,.25]]]},0.04);}}
function j2Battle(dt){let near=false;const bs=J2.boss;if(bs&&bs.state==='fight')near=true;
  if(!near)for(const e of W.enemies){if(!e.alive||e.sbDummy||e.state==='spawn'||e.state==='dying')continue;for(const pi of [0,1]){if(G.solo&&pi===1)continue;if(hd(active(pi).pos,e.pos)<10){near=true;break;}}if(near)break;}
  J2.near=near;J2.bat=near?Math.min(1,J2.bat+dt/0.6):Math.max(0,J2.bat-dt/2.5);}

/* ---------- 7.4: эмбиент ---------- */
function j2AmbTick(dt){const A=J2.amb,on=juOn('amb')&&G.state==='play'&&W.levelId==='sb';
  if(!MIX.ready||!AUD.ready()){return;}
  if(!A.wind){j2Amb(()=>{const s=AC.createBufferSource();s.buffer=AUD.noise;s.loop=true;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=420;f.Q.value=0.6;
    const g=AC.createGain(),g2=AC.createGain();g.gain.value=0;g2.gain.value=1;const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=0.13;lg.gain.value=0.45;l.connect(lg);lg.connect(g2.gain);   // порывы
    const lf=AC.createOscillator(),lfg=AC.createGain();lf.frequency.value=0.07;lfg.gain.value=180;lf.connect(lfg);lfg.connect(f.frequency);
    s.connect(f);f.connect(g2);g2.connect(g);g.connect(master);s.start();l.start();lf.start();A.wind={g};});}
  A.wind.g.gain.setTargetAtTime(on?0.12*JU.s.vol:0,AC.currentTime,0.6);
  if(!on)return;A.on=true;const T=A.t;
  for(const [k,a,b] of [['bird',2,6],['drop',0.6,1.8],['rare',9,18]]){T[k]=(T[k]==null?rand(a,b)*0.5:T[k])-dt;if(T[k]>0)continue;T[k]=rand(a,b);const p=rand(-0.85,0.85);j2c('amb_'+k);
    const pk=Math.random()<0.5;j2Amb(()=>{if(k==='bird')J2S.bird(p);else if(k==='drop')J2S.drop(p);else (pk?J2S.pecker:J2S.cuckoo)(p);});
    if(k==='rare')j2Cap(pk?'дятел стучит':'кукушка',p);}}

/* ---------- кадр ---------- */
{const _st=step;step=function(dt){
  // 5.4: замедление последнего удара — игра идёт медленнее, эффекты по реальному времени
  if(J2.slowT>0){J2.slowT-=dt;J2.slowK=J2.slowT>0?0.25:1;}else J2.slowK=1;
  _st(dt*J2.slowK);try{j2Tick(dt);}catch(e){console.error('sandbox tick2',e);}};}
function j2Tick(dt){j2MixTick(dt);j2Battle(dt);j2Arrows();j2FlashCss();j2AmbTick(dt);
  if(J2.bellGlow){const B=J2.bellGlow;B.t+=dt;if(B.t>1.5){B.b.bm.emissiveIntensity=0.5;J2.bellGlow=null;}else B.b.bm.emissiveIntensity=0.5+0.7*(1-B.t/1.5)*(0.6+0.4*Math.sin(B.t*20));}
  for(const f of J2.ticks)f(dt);}
J2.ticks=[];

/* ---------- панель: доступность, громкости, «было / стало» ---------- */
const J2AB=[['Колокольчик','bell'],['Суббас представления','sub'],['Стингер этапа','stinger'],['Звяк слабого места','zvyak'],['Колокольная россыпь','shower'],
  ['Общий аккорд','chord'],['Зов («Ко мне!»)','call'],['Шорох куста','rustle'],['Птица','bird'],['Капель','drop'],['Дятел','pecker'],['Кукушка','cuckoo']];
JU.ext.push({
  html(){const b=(k,v)=>'<button data-j2="'+k+'" data-j2v="'+v+'" class="'+(J2.s[k]===v?'sel y':'')+'">'+Math.round(v*100)+'%</button>';
    const sl=(k,l)=>'<div class="sl"><span>'+l+'</span><input type="range" min="0" max="1" step="0.05" value="'+(FIN.set[k]!=null?FIN.set[k]:1)+'" data-j2vol="'+k+'"><span data-j2vv="'+k+'">'+Math.round((FIN.set[k]!=null?FIN.set[k]:1)*100)+'%</span></div>';
    return '<h4>Доступность и микс (заход 2)</h4><div class="help">Музыка / эффекты / голоса — это регуляторы релиза (меню «Настройки»), здесь — для удобства. '+
      'Проверка 8: late_91_voice приглушает музыку до 45 % (≈ −7 дБ), пока звучит реплика; в полигоне озвучки нет.</div>'+
      sl('mus','Музыка')+sl('sfx','Эффекты')+sl('vox','Голоса')+
      '<div class="ab"><span>Тряска (9.1)</span><span class="rt">'+[0,0.5,1].map(v=>b('shake',v)).join('')+'</span><span></span></div>'+
      '<div class="ab"><span>Вспышки (9.2)</span><span class="rt">'+[0,0.5,1].map(v=>b('flash',v)).join('')+'</span><span></span></div>'+
      '<div class="act"><button data-j2act="boss">Босс заново</button><button data-j2act="shake">Встряхнуть</button><button data-j2act="flash">Вспышка</button></div>';},
  input(t){if(t.dataset.j2vol){FIN.set[t.dataset.j2vol]=+t.value;FIN.saveSettings&&FIN.saveSettings();FIN.applySettings();if(t.dataset.j2vol==='vox'&&VOX.bus)VOX.bus.gain.value=0.9*FIN.set.vox;
    JP.panel.querySelector('[data-j2vv="'+t.dataset.j2vol+'"]').textContent=Math.round(t.value*100)+'%';}},
  click(t){if(t.dataset.j2){J2.s[t.dataset.j2]=+t.dataset.j2v;JP.panel.querySelectorAll('[data-j2="'+t.dataset.j2+'"]').forEach(x=>x.className=(+x.dataset.j2v===J2.s[t.dataset.j2]?'sel y':''));JU.save();}
    if(t.dataset.j2act==='boss'&&J2.boss)J2.boss.reset(true);
    if(t.dataset.j2act==='shake')shake(null,0.12,0.4);
    if(t.dataset.j2act==='flash'){const f=$('flash');if(f){f.style.transition='none';f.style.background='#fff';f.style.opacity='0.8';setTimeout(()=>{f.style.transition='opacity .25s';f.style.opacity='0';},60);}}},
  ab:J2AB,
  play(k,fresh){if(!J2AB.some(x=>x[1]===k))return false;
    if(!fresh){if(k==='bell'){J2.orig.bell();return true;}if(k==='call'){J2.orig.call();return true;}if(k==='chord'){SFX.ok();return true;}
      floatText(active(0).pos.clone().add(new V3(0,2.4,0)),'в релизе звука нет','#dddddd');return true;}
    if(k==='chord'){J2S.chord([HERO.proshka,HERO.potap,HERO.pelageya,HERO.yosha],0);return true;}if(k==='stinger'){J2S.stinger(1);return true;}
    if(k==='call'){J2S.call(-0.6,'proshka');return true;}if(k==='rustle'){J2S.rustle(0,1);return true;}J2S[k](0);return true;},
  report(){return 'Доступность: тряска '+Math.round(J2.s.shake*100)+'%, вспышки '+Math.round(J2.s.flash*100)+'%; громкость: музыка '+Math.round(FIN.set.mus*100)+'%, эффекты '+Math.round(FIN.set.sfx*100)+'%, голоса '+Math.round((FIN.set.vox!=null?FIN.set.vox:1)*100)+'%\n';},
  toggle(on){if(!on){for(const a of J2.arrows)a.style.display='none';J2CAP.innerHTML='';}},
  ready(){j2LimitAll();}});
