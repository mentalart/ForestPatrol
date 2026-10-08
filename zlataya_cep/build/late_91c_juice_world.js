/* ============================== РЕЛИЗ · МИР, БОССЫ, ВДВОЁМ, МИКС, ДОСТУПНОСТЬ (docs/23_vfx_sfx.md, полигон заход 2) ============================== */
// Перенесено из «Полигона эффектов» (заход 2), привязано к настоящим уровням:
// микшер — шины «музыка / голоса / эффекты» → лимитер; музыка приседает при уроне (late_91b), затихает у колокольчика и перед боссом;
// не больше трёх одинаковых звуков за 0,1 с; музыка «спокойно / бой» (ударные и остинато, пока рядом морок);
// колокольчик-закладка как «костёр»; боссы — по полоске bossbar («<b>Имя</b> · фаза N / M»): представление, смена этапа
// (стингер, тема выше и быстрее, аура), слабое место у крупного морока, последний удар (замедление → тишина → колокола);
// вдвоём — общий аккорд (удар вместе, две плиты разом), стрелка к другу за кадром, зов со стороны друга;
// мир — трава и кусты приминаются (шейдер ветра late_12), кусты шуршат, перо и гусли светятся и сыплют «пыльцу»,
// звено летит к герою, эмбиент по мирам; доступность — подписи к звукам, вибрация джойстика (меню «Настройки»).
const JW={bat:0,calmT:0,hushT:0,slowT:0,slowK:1,sameT:{},arrows:[],w:null,bw:null,parts:[],magic:[],amb:{t:{},wind:null},plates:0};FIN.juiceW=JW;
JW.T={damage:(h,src)=>damageHero(h,src),plate:(x,z)=>plate(x,z)};   // для бота tfin_juice

/* ---------- микшер: всё, что идёт в AC.destination, — через шины → лимитер ---------- */
const JM={ready:false,route:null};JW.mix=JM;
const jwCon=AudioNode.prototype.connect;
function jwMixInit(){if(JM.ready||!AC)return;JM.ready=true;const c=(a,b)=>jwCon.call(a,b);
  JM.out=AC.createGain();JM.lim=AC.createDynamicsCompressor();JM.lim.threshold.value=-6;JM.lim.knee.value=2;JM.lim.ratio.value=20;JM.lim.attack.value=0.002;JM.lim.release.value=0.12;
  c(JM.out,JM.lim);c(JM.lim,AC.destination);for(const k of ['mus','vox','sfx']){JM[k]=AC.createGain();c(JM[k],JM.out);}JM.amb=AC.createGain();}
AudioNode.prototype.connect=function(d){if(AC&&d===AC.destination&&this.context===AC){jwMixInit();if(this!==JM.lim)arguments[0]=JM[JM.route||'sfx'];}return jwCon.apply(this,arguments);};
if(FIN.music){const _s=FIN.music.start;FIN.music.start=function(){JM.route='mus';try{return _s.apply(this,arguments);}finally{JM.route=null;}};}
if(typeof voxBus==='function'){const _vb=voxBus;voxBus=function(){JM.route='vox';try{return _vb.apply(this,arguments);}finally{JM.route=null;}};}
function jwMixTick(dt){if(!JM.ready)return;const t=AC.currentTime;JW.calmT=Math.max(0,JW.calmT-dt);JW.hushT=Math.max(0,JW.hushT-dt);
  const m=(FIN.juice&&FIN.juice.duckT>0?0.45:1)*(JW.calmT>0?0.3:1)*(JW.hushT>0?0:1);
  JM.mus.gain.setTargetAtTime(m,t,JW.hushT>0?0.03:0.12);JM.amb.gain.setTargetAtTime(JW.calmT>0?0.35:JW.hushT>0?0.2:G.state==='pause'?0:G.cine?0.5:1,t,0.2);}

/* ---------- не больше трёх одинаковых звуков за 0,1 с ---------- */
function jwSame(key){const now=performance.now(),a=(JW.sameT[key]=(JW.sameT[key]||[]).filter(t=>now-t<100));if(a.length>=3)return false;a.push(now);return true;}
function jwLimitAll(){for(const k of Object.keys(SFX)){const o=SFX[k];if(typeof o!=='function'||o._jw)continue;const f=function(){if(!jwSame('sfx:'+k))return;return o.apply(this,arguments);};f._jw=true;SFX[k]=f;}
  const S=FIN.juice&&FIN.juice.snd;if(S)for(const k of Object.keys(S)){const o=S[k];if(typeof o!=='function'||o._jw||k==='note'||k==='stitch'||k==='step')continue;const f=function(){if(!jwSame('jx:'+k))return;return o.apply(this,arguments);};f._jw=true;S[k]=f;}}

/* ---------- звуки ---------- */
const JWS={
  // колокольчик-закладка: тихое «динь-дилинь» для ребёнка — две ноты (основная и квинта лада мира) с чистым звонким тембром «музыкальной шкатулки»: октавные обертоны и едва слышное короткое «тинь», без долгого металлического дребезга и удара
  bell(p){[0,4].forEach((n,i)=>{const f=jxLad(n+7)/2,at=i*0.16;jxOS({f0:f,d:0.95,v:0.032,a:0.012,at,wet:0.3,pan:p});jxOS({f0:f*2,d:0.6,v:0.014,a:0.01,at,wet:0.35,pan:p});
      jxOS({f0:f*4,d:0.3,v:0.006,a:0.006,at,wet:0.35,pan:p});jxOS({f0:f*2.76,d:0.2,v:0.004,a:0.004,at,wet:0.3,pan:p});});},
  sub(){jxTH({f0:62,f1:30,d:1.6,v:0.5});jxNZ({type:'lowpass',f0:220,f1:60,d:1.4,v:0.12,a:0.01});jxBL(jxLad(0)/4,{v:0.05,d:2.4,wet:0.7});},
  stinger(st){const b=st*2;[0,3,7].forEach((n,i)=>jxOS({type:'sawtooth',f0:jxLad(b+n)/2,d:0.55,v:0.035,lp:1800,lp1:600,at:i*0.02,wet:0.3}));
    jxTH({f0:120,f1:38,d:0.5,v:0.4});jxNZ({f0:400,f1:4000,d:0.45,v:0.07,q:0.9,a:0.3});jxBL(jxLad(b+7),{v:0.06,d:1.2,at:0.45,wet:0.5});},
  zvyak(p){jxBL(2637,{v:0.035,d:0.35,wet:0.35,pan:p});jxOS({type:'square',f0:1318,f1:1240,d:0.04,v:0.012,lp:3500,pan:p});},
  shower(p){for(let i=0;i<14;i++){const n=[7,9,11,12,14,11,9,7,4,7,9,12,14,16][i];jxBL(jxLad(n),{v:0.045,d:1.6,at:i*0.075+Math.random()*0.02,wet:0.65,pan:clamp(p+Math.sin(i*1.7)*0.6,-0.9,0.9)});}
    jxBL(jxLad(0)/2,{v:0.07,d:3,at:1.1,wet:0.8});},
  chord(heroes,p){const deg=[0,4,7,2];heroes.forEach((h,i)=>{const f=jxLad(deg[i%4]+(h.kind==='potap'?0:7)),pan=h?jxPan(h.pos,h.player):p;
      if(h.kind==='potap')jxOS({type:'triangle',f0:f/2,d:1.1,v:0.09,a:0.01,wet:0.4,pan});
      else if(h.kind==='pelageya')jxBL(f,{v:0.07,d:1.4,wet:0.5,pan});
      else if(h.kind==='yosha')jxOS({f0:f*2,d:0.9,v:0.05,a:0.02,vib:0.01,vibF:6,wet:0.5,pan});
      else jxOS({type:'triangle',f0:f,d:0.7,v:0.07,a:0.004,wet:0.4,pan});});
    jxBL(jxLad(14),{v:0.03,d:1.6,at:0.12,wet:0.7,pan:p});},
  call(p,kind){const k=jxK({kind}),f=660*k;jxOS({type:'triangle',f0:f,f1:f*1.34,d:0.22,v:0.07,glide:0.12,a:0.01,wet:0.35,pan:p});jxOS({type:'triangle',f0:f*1.34,f1:f,d:0.42,v:0.06,at:0.22,glide:0.3,wet:0.45,pan:p});
    jxBL(f*2,{v:0.02,d:0.6,at:0.05,wet:0.5,pan:p});},
  rustle(p,w){jxNZ({f0:rand(2800,4200),f1:rand(1500,2400),d:0.28*w+0.1,v:0.05*w,q:0.8,a:0.03,pan0:p-0.1,pan1:p+0.1});},
  bird(p,hi){const f=rand(2400,3400)*(hi?1.25:1),n=2+Math.floor(Math.random()*3);for(let i=0;i<n;i++)jxOS({f0:f,f1:f*rand(1.15,1.4),d:0.08,v:0.022,glide:0.06,at:i*0.11,wet:0.35,pan:p});},
  drop(p){const f=rand(1100,1900);jxOS({f0:f,f1:f*0.55,d:0.07,v:0.025,glide:0.05,wet:0.6,pan:p});},
  bubble(p){const f=rand(300,520);jxOS({f0:f,f1:f*2.2,d:0.12,v:0.03,glide:0.1,wet:0.5,pan:p});},
  crackle(p){for(let i=0;i<3+Math.floor(Math.random()*4);i++)jxNZ({f0:rand(1500,3500),q:4,d:0.02,v:0.04,a:0.001,at:i*rand(0.03,0.09),pan:p});},
  pecker(p){for(let i=0;i<9;i++)jxNZ({f0:1400,q:5,d:0.02,v:0.05*(1-i*0.07),a:0.001,at:i*0.055,wet:0.4,pan:p});},
  cuckoo(p){jxOS({type:'triangle',f0:784,d:0.28,v:0.04,a:0.02,wet:0.5,pan:p});jxOS({type:'triangle',f0:622,d:0.42,v:0.04,a:0.02,at:0.34,wet:0.5,pan:p});}};
JW.snd=JWS;
// эмбиент — своя шина перед master (громкость «Звуки»); её глушит «покой» колокольчика и пауза
function jwAmb(fn){if(!JM.ambOn){jwCon.call(JM.amb,master);JM.ambOn=true;}const m=master;master=JM.amb;try{fn();}finally{master=m;}}

/* ---------- подписи к звукам, вибрация ---------- */
const JWCAP=document.createElement('div');JWCAP.style.cssText='position:fixed;left:50%;bottom:84px;transform:translateX(-50%);z-index:45;pointer-events:none;display:flex;flex-direction:column;align-items:center;gap:4px;font:600 15px/1.25 system-ui,sans-serif';document.body.appendChild(JWCAP);
const jwSide=p=>p<-0.2?'слева':p>0.2?'справа':'рядом';
function jwCap(text,p){if(!FIN.set.caps)return;const d=document.createElement('div');d.textContent='['+text+(p==null?'':' '+jwSide(p))+']';
  d.style.cssText='background:rgba(14,12,20,.78);color:#fff;padding:3px 10px;border-radius:8px;transition:opacity .4s';JWCAP.appendChild(d);while(JWCAP.children.length>3)JWCAP.firstChild.remove();
  setTimeout(()=>{d.style.opacity='0';setTimeout(()=>d.remove(),450);},2200);}
JW.cap=jwCap;
{const _r=rumble;rumble=function(){if(FIN.set.rumble===false)return;return _r.apply(this,arguments);};}
const jwRum=(pi,amp,dur)=>{if(pi!=null)rumble(pi,amp,dur);};

/* ---------- колокольчик-закладка как «костёр» ---------- */
JW.origBell=SFX.bell;
SFX.bell=function(){let hit=null,pi=0;for(const b of W.bells){b._jwA=b._jwA||[false,false];for(const q of [0,1])if(b.act[q]&&!b._jwA[q]){hit=b;pi=q;}}
  for(const b of W.bells)b._jwA=b.act.slice();
  if(!hit||G.cine)return JW.origBell.apply(this,arguments);
  const top=new V3(hit.x+0.55,hit.y+1.9,hit.z),p=jxPan(top,pi),fl=jxFl();JWS.bell(p);JW.calmT=1.2;jwCap('колокольчик-закладка',p);
  if(fl>0)jxSprite('dot',0xffe2a0,top.clone(),5.5*(0.6+0.4*fl),0.45,{op:0.9*fl,shape:'flash'});jxSprite('star',0xfff4c0,top.clone(),2.4,0.6,{spin:3});
  const g=new V3(hit.x,hit.y+0.08,hit.z);ringFx(g,COL.gold,3.2);later(0.18,()=>ringFx(g,0xfff2b0,4.6));
  if(FIN.fx){FIN.fx.sparkle(top,16,0xfff2b0);FIN.fx.stars(top,8,0xffd76a);}JW.bellGlow={b:hit,t:0};};

/* ---------- зов со стороны друга ---------- */
JW.origCall=SFX.call;
{const _dc=doCall;doCall=function(pi){JW.callPi=pi;try{return _dc.apply(this,arguments);}finally{JW.callPi=null;}};}
SFX.call=function(){if(JW.callPi==null)return JW.origCall.apply(this,arguments);const pi=JW.callPi,h=active(pi);
  const p=PANES.length>1?(pi?0.65:-0.65):jxPan(h.pos,pi);JWS.call(p,h.kind);jwCap('зов: '+(typeof HNAME!=='undefined'&&HNAME[h.kind]||'друг'),p);};

/* ---------- удар вместе: аккорд; вибрация на удар, урон и замах на тебя ---------- */
{const _eh=enemyHit;enemyHit=function(e,h){const emb=e&&e.embers;const r=_eh.apply(this,arguments);
  try{if(e&&h){if(e.embers<emb||!e.alive)jwRum(h.player,0.025,0.08);
    const T=e._jwT||(e._jwT=[-9,-9]);T[h.player]=G.time;
    if(!G.solo&&Math.abs(T[0]-T[1])<0.3&&G.time-(e._jwCo||-9)>0.6){e._jwCo=G.time;JWS.chord([active(0),active(1)],jxPan(e.pos,0));
      floatText(e.pos.clone().add(new V3(0,2.4,0)),'Вместе!','#ffe08a');ringFx(e.pos,COL.gold,2.4);if(FIN.fx)FIN.fx.stars(e.pos.clone().add(new V3(0,1.2,0)),8,0xffd76a);}}}catch(err){console.error('juice co',err);}
  return r;};}
{const _dh=damageHero;damageHero=function(h){const ok=_dh.apply(this,arguments);if(ok){jwRum(h.player,0.06,0.25);jwCap('ой! — '+(typeof HNAME!=='undefined'&&HNAME[h.kind]||'герой'),jxPan(h.pos,h.player));}return ok;};}
{const _fw=foeWind;foeWind=function(e){const r=_fw.apply(this,arguments);
  try{if(e.tgt&&e.sig){jwRum(e.tgt.player,0.012,0.12);const L={yellow:'бубенец — щит',red:'рык — уходи',blue:'вжух — летит'}[e.sig];if(L&&(JW.capT||0)<G.time-0.5){JW.capT=G.time;jwCap(L,jxPan(e.pos,e.tgt.player));}}}catch(err){console.error('juice wind',err);}
  return r;};}
// две плиты разом: когда нажатых плит становится две и больше и на них герои разных игроков — общий аккорд
function jwPlates(){const pr=W.plates.filter(p=>p.pressed);let hs=[];for(const p of pr)for(const h of HEROES)if(hd(h.pos,p)<(p.r||1)+0.4&&Math.abs(h.pos.y-(p.y||0))<1.5&&hs.indexOf(h)<0)hs.push(h);
  const both=pr.length>=2&&new Set(hs.map(h=>h.player)).size>=2;
  if(both&&!JW.plates&&G.time-(JW.plT||-9)>3&&!G.cine){JW.plT=G.time;JWS.chord(hs,0);jwCap('аккорд вдвоём',null);for(const p of pr)ringFx(new V3(p.x,(p.y||0)+0.2,p.z),COL.gold,2);}
  JW.plates=both?1:0;}

/* ---------- звено летит к герою по дуге, счётчик подпрыгивает ---------- */
{const _ti=takeItem;takeItem=function(it,h){const was=it.taken;const r=_ti.apply(this,arguments);
  try{if(!was&&it.taken&&h&&it.g&&!G.cine){const g=it.g,from=it.pos.clone();W.group.add(g);
    anim(0.42,k=>{const to=h.pos.clone().add(new V3(0,heroHeight(h)*0.65,0)),p=from.clone().lerp(to,k*k);p.y+=Math.sin(k*Math.PI)*1.3;g.position.copy(p);g.scale.setScalar(Math.max(0.05,1-k*0.7));g.rotation.y+=0.4;
      if(k>=1){W.group.remove(g);const el=$('links');if(el&&el.animate)el.animate([{transform:'scale(1)'},{transform:'scale(1.32)',offset:0.35},{transform:'scale(1)'}],{duration:320,easing:'ease-out'});
        if(FIN.fx)FIN.fx.sparkle(to,5,0xffe08a);}});}}catch(err){console.error('juice pickup',err);}
  return r;};}

/* ---------- стрелка к другу у края экрана ---------- */
for(let i=0;i<2;i++){const d=document.createElement('div');d.style.cssText='position:fixed;left:0;top:0;width:0;height:0;z-index:42;pointer-events:none;display:none;border-left:16px solid transparent;border-right:16px solid transparent;border-bottom:30px solid #fff;filter:drop-shadow(0 0 4px rgba(0,0,0,.6))';document.body.appendChild(d);JW.arrows.push(d);}
function jwArrows(){const show=G.state==='play'&&!G.cine&&!G.solo&&!G.trans;
  for(let i=0;i<2;i++){const el=JW.arrows[i];el.style.display='none';if(!show)continue;
    const split=PANES.length>1,P=split?PANES[i]:PANES[0];if(!P||(!split&&i===1))continue;
    const tgts=split?[active(1-i)]:[active(0),active(1)];
    for(const t of tgts){if(players[t.player].downed)continue;const v=t.pos.clone().add(new V3(0,1,0)).project(P.cam);const behind=v.z>1;let x=v.x,y=v.y;if(behind){x=-x;y=-y;}
      if(!behind&&Math.abs(x)<0.95&&Math.abs(y)<0.95)continue;const m=Math.max(Math.abs(x),Math.abs(y))||1;x/=m;y/=m;
      const px=P.x+(x*0.9+1)/2*P.w,py=(1-(y*0.9+1)/2)*P.h,ang=Math.atan2(x,y);
      el.style.display='block';el.style.borderBottomColor=PCSS[t.player];el.style.transform='translate('+(px-16)+'px,'+(py-15)+'px) rotate('+ang+'rad)';break;}}}

/* ---------- музыка «спокойно / бой» и темы этапов босса ---------- */
if(FIN.music&&FIN.music.TR){const TR=FIN.music.TR,B=TR.boss;
  if(B){const cl=(root,bpm)=>{const c=JSON.parse(JSON.stringify(B));c.root=root;c.bpm=bpm;return c;};TR.jxBoss2=cl(B.root+2,B.bpm+12);TR.jxBoss3=cl(B.root+5,B.bpm+24);}
  for(const k in TR){const T=TR[k];if(k==='title'||!T||!T.v||k==='boss'||k.indexOf('jxBoss')===0)continue;
    for(const v of T.v){if(!v.drum)continue;const b=v.vol;Object.defineProperty(v,'vol',{configurable:true,get:()=>Math.max(0.0001,b*(0.15+0.85*JW.bat))});}
    const add=(v,b)=>{Object.defineProperty(v,'vol',{configurable:true,get:()=>Math.max(0.0001,b*JW.bat)});T.v.push(v);};
    add({i:'kick',drum:'x.......x..x....'},0.07);add({i:'frame',drum:'....x.......x.x.'},0.035);
    add({i:'pluck',oct:-12,seq:[[[0,.25],[0,.25],[4,.25],[0,.25],[2,.25],[0,.25],[4,.25],[3,.25]]]},0.04);}}
function jwBattle(dt){let near=false;
  for(const e of W.enemies){if(!e.alive||e.harmless||e.state==='spawn'||e.state==='dying'||e.state==='hide')continue;for(const pi of [0,1]){if(G.solo&&pi===1)continue;if(hd(active(pi).pos,e.pos)<10){near=true;break;}}if(near)break;}
  JW.bat=near?Math.min(1,JW.bat+dt/0.6):Math.max(0,JW.bat-dt/2.5);}

/* ---------- боссы: по полоске bossbar ---------- */
const JWBC=[0x9fe07a,0xffa040,0xff5ac8];
const JWBOSS=/^\s*<b[^>]*>([^<]+)<\/b>\s*·\s*(?:фаза |стадия |этап )?(\d+)\s*(?:\/|из)\s*(\d+)/;
function jwBossAnchor(){let b=null,bd=1e9;const c=active(0).pos;for(const e of W.enemies){if(!e.alive||!e.big)continue;const d=hd(e.pos,c);if(d<bd){bd=d;b=e;}}return b;}
function jwBossName(name){let d=JW.nameEl;if(!d){d=JW.nameEl=document.createElement('div');d.style.cssText='position:fixed;left:50%;top:16%;transform:translateX(-50%);z-index:44;pointer-events:none;text-align:center;color:#ffe8b0;font:700 40px/1.1 Georgia,serif;letter-spacing:3px;text-shadow:0 2px 12px rgba(0,0,0,.8);opacity:0;transition:opacity .45s';document.body.appendChild(d);}
  if(name){d.innerHTML='<div style="font-size:22px;letter-spacing:10px;color:#d8a84a">❦ ─── ✥ ─── ❦</div><div>'+name.toUpperCase()+'</div><div style="font-size:22px;letter-spacing:10px;color:#d8a84a">❦ ─── ✥ ─── ❦</div>';d.style.opacity='1';clearTimeout(JW.nameT);JW.nameT=setTimeout(()=>{d.style.opacity='0';},2600);}
  else d.style.opacity='0';}
function jwBoss(dt){const bb=$('bossbar');if(!bb)return;const B=JW.bw;const vis=bb.style.display==='block';const m=vis?JWBOSS.exec(bb.innerHTML):null;
  if(m&&!G.cine){const name=m[1].trim(),ph=+m[2],max=+m[3];
    if(!B.seen){B.seen=true;B.ph=ph;B.max=max;jwBossName(name);JWS.sub();JW.hushT=1.4;jwCap('гул: '+name,null);}
    else if(ph>B.ph){B.ph=ph;jwBossPhase(Math.min(3,ph),max);}
    const ws=bb.innerHTML.match(/width:(\d+)%/g),w=ws&&ws[ws.length-1];B.hp0=B.ph>=B.max&&!!w&&parseInt(w.slice(6))===0;
    if(B.hp0&&!B.done)jwBossLast();}
  else if(B.seen&&!vis&&B.ph>=B.max&&!B.done&&!G.cine&&!G.trans)jwBossLast();
  // аура этапа и последовательность последнего удара
  const e=B.anchor&&B.anchor.alive?B.anchor:null;for(const p of JW.parts){p.s.visible=!!e&&B.ph>1&&!B.done;if(!p.s.visible)continue;p.a+=dt*p.sp;p.s.position.set(e.pos.x+Math.cos(p.a)*p.r*e.r,e.pos.y+p.h+Math.sin(p.a*2)*0.2,e.pos.z+Math.sin(p.a)*p.r*e.r);p.s.material.color.lerp(B.auraC,Math.min(1,dt*4));}
  if(B.seq!=null)jwBossSeq(dt);}
function jwAura(){if(JW.parts.length)return;for(let i=0;i<12;i++){const s=jxNoRay(new THREE.Sprite(new THREE.SpriteMaterial({map:jxTex('dot'),color:JWBC[0],transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false})));s.visible=false;s.renderOrder=9;s.scale.setScalar(0.4);W.group.add(s);JW.parts.push({s,a:i/12*Math.PI*2,h:rand(0.4,3.2),r:rand(1.2,1.6),sp:rand(0.6,1.2)});}}
function jwBossPhase(st,max){const B=JW.bw;B.anchor=jwBossAnchor();const c=JWBC[st-1]||JWBC[2];B.auraC=new THREE.Color(c);JWS.stinger(st);jwCap('стингер: этап '+st,null);
  const M=FIN.music;if(M&&(M.cur==='boss'||String(M.cur).indexOf('jxBoss')===0)&&M.TR['jxBoss'+st]){M.play('jxBoss'+st);B.music=true;}
  const pos=B.anchor?B.anchor.pos.clone():active(0).pos.clone(),fl=jxFl();jwAura();for(const p of JW.parts)p.s.material.color.setHex(0xffffff);
  if(fl>0)jxSprite('dot',c,pos.clone().add(new V3(0,2,0)),9*(0.6+0.4*fl),0.5,{op:0.85*fl,shape:'flash'});ringFx(new V3(pos.x,pos.y+0.2,pos.z),c,3.5);later(0.15,()=>ringFx(new V3(pos.x,pos.y+0.2,pos.z),c,5));shakeAll(0.05,0.3);}
function jwBossLast(){const B=JW.bw;B.done=true;B.seq=0;B.t=0;B.anchor=B.anchor&&B.anchor.alive?B.anchor:jwBossAnchor();B.pos=(B.anchor?B.anchor.pos:active(0).pos).clone();
  if(!G.manual)JW.slowT=0.7;const fl=jxFl();if(fl>0)jxSprite('dot',0xfff2c0,B.pos.clone().add(new V3(0,2,0)),7*(0.6+0.4*fl),0.35,{op:0.9*fl,shape:'flash'});jxTH({f0:150,f1:40,d:0.6,v:0.45});}
function jwBossSeq(dt){const B=JW.bw;B.t+=dt;   // по реальному времени (замедление на игру, не на эффекты)
  if(B.seq===0&&B.t>0.7){B.seq=1;JW.hushT=0.9;}
  if(B.seq===1&&B.t>1.5){B.seq=null;JWS.shower(jxPan(B.pos,0));jwCap('колокола: победа',null);const p=B.pos.clone().add(new V3(0,2.2,0));
    if(FIN.fx){FIN.fx.stars(p,18,0xffd76a);FIN.fx.sparkle(p,24,0xffffff);if(FIN.fx.confetti)FIN.fx.confetti(p,30,0.8);}ringFx(new V3(B.pos.x,B.pos.y+0.2,B.pos.z),COL.gold,5);
    if(B.music&&FIN.music)FIN.music.play(null);}}
// слабое место: крупный морок открыт (пробой, оглушён, открыт, шатается) — золотое свечение и «звяк»
function jwWeak(dt){for(const e of W.enemies){const open=e.alive&&e.big&&e.kind!=='golova'&&!G.cine&&(e.state==='broken'||e.dazeT>0||e.open>0||e.state==='stagger');
    if(!open){if(e._jwW)e._jwW.visible=false;e._jwZ=0;continue;}
    if(!e._jwW){e._jwW=jxNoRay(new THREE.Sprite(new THREE.SpriteMaterial({map:jxTex('dot'),color:0xffd040,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false})));e._jwW.renderOrder=9;W.group.add(e._jwW);}
    const g=e._jwW,top=(e.L&&e.L.top||1.4)*(e.s||1),ph=G.time*7;g.visible=true;g.position.set(e.pos.x,e.pos.y+top*0.5,e.pos.z);g.scale.setScalar(e.r*(2+0.6*Math.sin(ph))*(0.7+0.3*jxFl()));g.material.opacity=0.45+0.25*Math.sin(ph);
    e._jwZ=(e._jwZ||0)-dt;if(e._jwZ<=0){e._jwZ=0.7;JWS.zvyak(jxPan(e.pos,0));}}}

/* ---------- трава и кусты приминаются: шейдер ветра (late_12) + толчок от героев ---------- */
JW.push={value:[0,1,2,3,4,5].map(()=>new THREE.Vector4(0,-99,0,0))};
if(FIN.fxHook&&FIN.fxHook.wind){const _w=FIN.fxHook.wind;FIN.fxHook.wind=(sh,m)=>{_w(sh,m);
  sh.uniforms.uPush=JW.push;sh.uniforms.uPushK={value:(m.userData.wind||0)>=0.04?1:0};   // трава и кусты — да, деревья — нет
  sh.vertexShader=sh.vertexShader.replace('uniform float uGust;','uniform float uGust;\nuniform vec4 uPush[6];\nuniform float uPushK;').replace('transformed.z += wS * 0.55 * wH * wH * uWindK * uGust;',
  `transformed.z += wS * 0.55 * wH * wH * uWindK * uGust;
	if ( uPushK > 0.0 ) {
	#ifdef USE_INSTANCING
		mat4 jM4 = modelMatrix * instanceMatrix;
	#else
		mat4 jM4 = modelMatrix;
	#endif
		vec3 jWp = jM4[3].xyz; vec2 jPu = vec2( 0.0 );
		for ( int i = 0; i < 6; i ++ ) { vec4 P = uPush[i]; vec2 d = jWp.xz - P.xz; float L = length( d );
			float k = P.w * ( 1.0 - smoothstep( 0.15, 1.25, L ) ) * step( abs( jWp.y - P.y ), 1.2 ); jPu += ( L > 0.001 ? d / L : vec2( 0.0 ) ) * k; }
		float jL = length( jPu ); if ( jL > 0.9 ) jPu *= 0.9 / jL;
		vec3 jw = vec3( jPu.x, 0.0, jPu.y ); float jS = max( dot( jM4[0].xyz, jM4[0].xyz ), 1e-4 );
		vec3 jLoc = vec3( dot( jM4[0].xyz, jw ), dot( jM4[1].xyz, jw ), dot( jM4[2].xyz, jw ) ) / jS;
		transformed.xz += jLoc.xz * wH * 1.5 * uPushK; transformed.y -= length( jPu ) * wH * 0.35 * uPushK;
	}`);};}
// кусты, папоротники и камыш — по расстановке kit (late_24/25): запоминаем, где стоят, чтобы шуршать
if(typeof instKit==='function'){const _ik=instKit;instKit=function(items){try{for(const it of items||[])if(/bush|berry|fern|reeds/.test(it.name||''))(W._jwBush=W._jwBush||[]).push({x:it.x,y:it.y||0,z:it.z,t:-9});}catch(e){}return _ik.apply(this,arguments);};FIN.instKit=instKit;}
function jwGrass(dt){const P=JW.push.value;let n=0;const tr=JW.trail||(JW.trail=[]);
  for(const h of HEROES){if(n>=4)break;const v=P[n++];if(!h.body||h.body.visible===false||G.cine){v.set(0,-99,0,0);continue;}v.set(h.pos.x,h.pos.y,h.pos.z,1);}
  for(;n<4;n++)P[n].set(0,-99,0,0);
  // след двух активных героев — трава встаёт не сразу
  for(const pi of [0,1]){const h=active(pi),q=tr[pi]||(tr[pi]=[]);q.push({x:h.pos.x,y:h.pos.y,z:h.pos.z,t:G.time});while(q.length&&G.time-q[0].t>0.45)q.shift();const o=q[0],v=P[4+pi];if(o&&!G.cine)v.set(o.x,o.y,o.z,0.6);else v.set(0,-99,0,0);}
  const B=W._jwBush;if(!B||G.cine)return;
  // шорох — не чаще раза в 0,7 с на всех и только у героев, которыми играют (чтобы не было «шагов» от четверых)
  if(G.time-(JW.rusT||-9)<0.7)return;
  for(const pi of [0,1]){if(G.solo&&pi===1)continue;const h=active(pi);if(!h.body||h.body.visible===false)continue;const sp=Math.hypot(h.vel.x,h.vel.z);if(sp<2.5)continue;
    for(const b of B){if(Math.abs(b.x-h.pos.x)>1||Math.abs(b.z-h.pos.z)>1||Math.abs(b.y-h.pos.y)>1.2)continue;if(G.time-b.t<1.5)continue;b.t=G.time;JW.rusT=G.time;
      JWS.rustle(jxPan(new V3(b.x,b.y,b.z),h.player),0.45+Math.min(0.35,sp/14));if(Math.random()<0.5)burst(new V3(b.x,b.y+0.5,b.z),0x6fae4a,3,1.5);return;}}}

/* ---------- перо и гусли светятся, в полёте сыплют «пыльцу» ---------- */
{const tag=(fn,kind,minS,maxS)=>function(){const g=fn.apply(this,arguments);try{const s=kind==='pero'?arguments[0]:arguments[2];if(g&&(s==null||(s>=minS&&s<=maxS)))JW.magic.push({g,kind,last:null});}catch(e){}return g;};
  if(typeof featherMesh==='function')featherMesh=tag(featherMesh,'pero',0,2.4);       // хвост Жар-птицы (2,6) — без ореола
  if(typeof gusliMesh==='function')gusliMesh=tag(gusliMesh,'gusli',0,9);}
const JW_HG=new Set();
function jwMagic(dt){const wp=new V3();if(!JW_HG.size)for(const h of HEROES)if(h.g)JW_HG.add(h.g);
  for(let i=JW.magic.length-1;i>=0;i--){const M=JW.magic[i],g=M.g;let o=g,inScene=false,shown=true,onHero=false;for(let k=0;k<14&&o;k++){if(o===scene){inScene=true;break;}if(o.visible===false)shown=false;if(JW_HG.has(o))onHero=true;o=o.parent;}
    if(onHero)inScene=false;   // перо за спиной и гусли-наряд у героя — без ореола
    if(!inScene){if(M.sp&&M.sp.parent)M.sp.parent.remove(M.sp);if(!g.parent||M.dead>3){JW.magic.splice(i,1);continue;}M.dead=(M.dead||0)+dt;continue;}M.dead=0;
    if(!M.sp){M.sp=jxNoRay(new THREE.Sprite(new THREE.SpriteMaterial({map:jxTex('dot'),color:M.kind==='pero'?0xffb060:0xffe2a0,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false})));M.sp.renderOrder=9;M.sp.userData.noBatch=true;W.group.add(M.sp);}
    if(M.sp.parent!==W.group)W.group.add(M.sp);
    g.getWorldPosition(wp);M.sp.visible=shown&&jxFl()>0;const ws=g.getWorldScale(new V3()).x||1;
    M.sp.position.copy(wp);M.sp.scale.setScalar((M.kind==='pero'?1.5:1.8)*Math.min(2,ws)*(0.85+0.15*Math.sin(G.time*4+i)));M.sp.material.opacity=(M.kind==='pero'?0.5:0.4)*jxFl();
    const sp=M.last?wp.distanceTo(M.last)/Math.max(dt,1e-3):0;M.last=(M.last||new V3()).copy(wp);
    if(sp>2.5&&shown){M.pT=(M.pT||0)-dt;if(M.pT<=0){M.pT=0.06;jxSprite('dot',Math.random()<0.5?0xffd76a:0xfff2c0,wp.clone().add(new V3(rand(-0.15,0.15),rand(-0.1,0.1),rand(-0.15,0.15))),rand(0.18,0.32),1.1,{op:0.9});}}}}

/* ---------- эмбиент по мирам ---------- */
const JWAMB={forest:{wind:[420,0.12],ev:[['bird',2,6],['drop',4,9],['rare',12,24]]},sea:{wind:[180,0.1],ev:[['bubble',0.8,2.2]]},
  sky:{wind:[600,0.16],ev:[['birdHi',4,9]]},fire:{wind:[160,0.1],ev:[['crackle',1.2,3]]},isle:{wind:[380,0.14],ev:[['bird',3,7],['rare',14,26]]}};
function jwAmbProfile(){const id=W.levelId||'';if(id==='p'||id==='epi'||!G||G.state!=='play')return null;const wd=W.world||0;
  return wd===2?JWAMB.sea:wd===3?JWAMB.sky:wd===4?JWAMB.fire:wd===5?JWAMB.isle:JWAMB.forest;}
function jwAmbTick(dt){const A=JW.amb;if(!JM.ready||!AUD.ready())return;const P=jwAmbProfile();
  if(!A.wind){jwAmb(()=>{const s=AC.createBufferSource();s.buffer=AUD.noise;s.loop=true;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=420;f.Q.value=0.6;
    const g=AC.createGain(),g2=AC.createGain();g.gain.value=0;g2.gain.value=1;const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=0.13;lg.gain.value=0.45;l.connect(lg);lg.connect(g2.gain);
    const lf=AC.createOscillator(),lfg=AC.createGain();lf.frequency.value=0.07;lfg.gain.value=120;lf.connect(lfg);lfg.connect(f.frequency);
    s.connect(f);f.connect(g2);g2.connect(g);g.connect(master);s.start();l.start();lf.start();A.wind={g,f};});}
  const boss=(LEVELS[G.levelIdx]||{}).boss?0.5:1;A.wind.g.gain.setTargetAtTime(P?P.wind[1]*boss:0,AC.currentTime,0.6);if(P)A.wind.f.frequency.setTargetAtTime(P.wind[0],AC.currentTime,0.5);
  if(!P||G.cine)return;const T=A.t;
  for(const [k,a,b] of P.ev){T[k]=(T[k]==null?rand(a,b)*0.5:T[k])-dt;if(T[k]>0)continue;T[k]=rand(a,b);const p=rand(-0.85,0.85),pk=Math.random()<0.5;
    jwAmb(()=>{if(k==='bird')JWS.bird(p);else if(k==='birdHi')JWS.bird(p,true);else if(k==='drop')JWS.drop(p);else if(k==='bubble')JWS.bubble(p);else if(k==='crackle')JWS.crackle(p);else (pk?JWS.pecker:JWS.cuckoo)(p);});
    if(k==='rare')jwCap(pk?'дятел стучит':'кукушка',p);}}

/* ---------- кадр ---------- */
{const _st=step;step=function(dt){
  // последний удар по боссу: игра на 0,7 с в четверть скорости, эффекты — по реальному времени
  if(JW.slowT>0){JW.slowT-=dt;JW.slowK=JW.slowT>0?0.25:1;}else JW.slowK=1;
  _st(dt*JW.slowK);try{jwTick(dt);}catch(e){console.error('juice world',e);}};}
function jwTick(dt){
  if(JW.w!==W){JW.w=W;JW.bw={seen:false,ph:0,max:0,done:false,seq:null,anchor:null,auraC:new THREE.Color(JWBC[0])};JW.parts.length=0;JW.trail=null;JW.plates=0;JW.slowT=0;
    if(JW.nameEl)JW.nameEl.style.opacity='0';const M=FIN.music;if(M&&String(M.cur||'').indexOf('jxBoss')===0)M.play(null);}
  jwMixTick(dt);jwBattle(dt);jwArrows();jwAmbTick(dt);jwBoss(dt);jwWeak(dt);jwGrass(dt);jwMagic(dt);if(W.plates&&W.plates.length)jwPlates();
  if(JW.bellGlow){const B=JW.bellGlow;B.t+=dt;if(B.t>1.5){JW.bellGlow=null;}else if(B.b.bm)B.b.bm.emissiveIntensity=Math.max(B.b.bm.emissiveIntensity,0.5+0.7*(1-B.t/1.5)*(0.6+0.4*Math.sin(B.t*20)));}}
// одинаковые звуки ограничиваются после того, как все модули назначили свои
setTimeout(jwLimitAll,0);
