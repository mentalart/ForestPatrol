// ============================== МУЛЬТСЕРИАЛ «ЗЛАТАЯ ЦЕПЬ»: ОБЩИЙ КОД СЕРИЙ (съёмочная сборка, в игру не входит) ==============================
// Собирается в релиз командой tools/serial/build.js — в ту же область видимости, что модули late_*.js. Серия (ep*.js) — список сегментов:
// кусок ролика игры (сцена «Присказки», «Колыбельная» пролога) или своя сцена, с вертикальными планами (KS), своим монтажом и надписями.
// Съёмка (tools/serial/shoot.js) ведёт время сама: SER.seg(i) готовит сегмент и проматывает его к началу, SER.frame(t) — кадр.
// Звук не играет при съёмке: каждый вызов синтеза (tone, AUD, инструменты), смена музыки и реплика с записью голоса пишутся в SER.log
// со временем видео; tools/serial/audio.js потом проигрывает их в те же мгновения и пишет звуковую дорожку.
const SER={on:false,eps:{},ep:null,log:[],vt:0,rec:false,patch:null,sub:null,subK:0,ev:s=>eval(s)};FIN.serial=SER;
const SERV=(x,y,z)=>new V3(x,y,z);

/* ---------- кадр 9:16: интерфейс игры прочь, свои надписи ---------- */
SER.css=function(){if($('serCss'))return;const st=document.createElement('style');st.id='serCss';st.textContent=
  'body.ser #hud0,body.ser #hud1,body.ser #icons,body.ser #floats,body.ser #bubs,body.ser #links,body.ser #bossbar,body.ser #vest,body.ser #pbub,'+
  'body.ser #tip0,body.ser #tip1,body.ser #obj0,body.ser #obj1,body.ser #banner,body.ser #level,body.ser #owl,body.ser #stitch,body.ser #lbT,body.ser #lbB,'+
  'body.ser #subs,body.ser #skip,body.ser #mergebar,body.ser #edgeL,body.ser #edgeR,body.ser #divider,body.ser #beatbell,body.ser #finHint,body.ser #finVer,'+
  'body.ser #finSave,body.ser #prkTitle,body.ser #finPause,body.ser #menu,body.ser #card,body.ser #mapui{display:none!important}'+
  // лента с именем героя — сверху, в безопасном поле ленты ВК
  'body.ser #prkPlate{left:6%;top:11%;bottom:auto}body.ser #prkPlate b{font-size:44px}body.ser #prkPlate i{font-size:24px}body.ser #prkPlate s{font-size:18px}'+
  // субтитры: на 58–74 % высоты, имя говорящего — цветом героя
  '#serSub{position:fixed;left:6%;right:6%;top:64%;z-index:60;pointer-events:none;text-align:center;opacity:0;transition:opacity .18s;font-family:ZCComfortaa,system-ui,sans-serif}'+
  '#serSub.on{opacity:1}#serSub .n{display:inline-block;font:800 22px ZCComfortaa,system-ui,sans-serif;letter-spacing:.06em;color:#1b1222;background:var(--c);'+
  'padding:4px 14px 5px;border-radius:14px;margin-bottom:8px;box-shadow:0 3px 10px rgba(0,0,0,.35);text-transform:uppercase}'+
  '#serSub .t{font-weight:800;font-size:34px;line-height:1.22;color:#fffaf0;text-shadow:0 0 6px #1b1222,0 2px 0 #1b1222,0 0 16px rgba(20,10,30,.9),2px 0 0 #1b1222,-2px 0 0 #1b1222,0 -2px 0 #1b1222}'+
  '#serSub .r{display:block;font-weight:600;font-size:22px;font-style:italic;color:#e8dcf4;text-shadow:0 0 6px #1b1222,0 2px 0 #1b1222;margin-bottom:2px}'+
  '#serSub.vo .t{font-style:italic;color:#ffe9b0}'+
  // титр и карточки
  '#serCard{position:fixed;inset:0;z-index:70;pointer-events:none;opacity:0;transition:opacity .5s;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:Georgia,Palatino,serif}'+
  '#serCard.on{opacity:1}#serCard .bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(40,20,50,.15),rgba(18,8,26,.72) 75%)}'+
  '#serCard .in{position:relative;transform:scale(.9);transition:transform 1.1s cubic-bezier(.2,1.3,.4,1)}#serCard.on .in{transform:none}'+
  '#serCard .lg{font-size:86px;line-height:.95;font-weight:700;letter-spacing:.04em;color:#ffd968;text-shadow:0 3px 0 #7a4410,0 0 30px rgba(255,190,80,.75),0 0 4px #3a1a08}'+
  '#serCard .ep{margin-top:26px;font:700 30px ZCComfortaa,system-ui,sans-serif;letter-spacing:.18em;color:#fff3d6;text-transform:uppercase;text-shadow:0 2px 6px #000}'+
  '#serCard .nm{margin-top:10px;font-size:58px;color:#fff6e0;text-shadow:0 3px 0 #5a3410,0 0 22px rgba(255,200,90,.6)}'+
  '#serCard .ln{width:62%;height:3px;margin:22px auto 0;background:linear-gradient(90deg,transparent,#e8c060,transparent)}'+
  '#serCard .sm{margin-top:18px;font:600 26px ZCComfortaa,system-ui,sans-serif;color:#f0e4ff;line-height:1.35;text-shadow:0 2px 6px #000}'+
  '#serCard .cta{margin-top:34px;display:inline-block;padding:16px 30px;border-radius:40px;background:linear-gradient(180deg,#ffd968,#e8a830);color:#3a1a08;'+
  'font:800 30px ZCComfortaa,system-ui,sans-serif;box-shadow:0 6px 24px rgba(255,180,60,.5)}'+
  '#serFade{position:fixed;inset:0;z-index:65;pointer-events:none;background:#0e0814;opacity:0}';
  document.head.appendChild(st);for(const id of['serSub','serCard','serFade'])if(!$(id)){const d=document.createElement('div');d.id=id;document.body.appendChild(d);}};
SER.card=function(html){const el=$('serCard');if(!el)return;if(html){el.innerHTML='<div class="bg"></div><div class="in">'+html+'</div>';el.classList.add('on');}else el.classList.remove('on');};
SER.fade=function(a){const el=$('serFade');if(el)el.style.opacity=a;};

/* ---------- реплики: свои субтитры по времени игры и метка голоса для звуковой дорожки ---------- */
const SER_WHO={proshka:['Прошка','#f08a4a'],potap:['Потап','#e05a4a'],pelageya:['Пелагея','#c49af0'],yosha:['Йоша','#4ad8c8'],tishka:['Тишка','#e8b878'],
  kot:['Кот Учёный','#ffd968'],koschei:['Кощей','#9ab8ff'],zven:['Звенышко','#ffe14a'],kolobok:['Колобок','#f8d050'],kuzma:['Кузьма','#e8a060']};
SER.say=function(who,text,dur,vo){SER.lastSay={who,text,dur,vo,gt:G.time};const e=FIN.vox.find(who,text);const vd=e&&e.dur?e.dur:0;
  if(e&&SER.rec)SER.log.push({t:SER.vt,gt:G.time,k:'vox',id:e.id,kind:'main',g:1,d:vd});
  const W_=SER_WHO[who]||[who||'',  '#fff'];let s=String(text),rem='';const m=s.match(/^\s*<i>\(([^)]*)\)<\/i>\s*/);if(m){rem=m[1];s=s.slice(m[0].length);}
  s=s.replace(/<br>/g,'<br>').replace(/♪/g,'♪');const el=$('serSub');if(!el)return;
  el.innerHTML=(vo?'':'<span class="n" style="--c:'+W_[1]+'">'+W_[0]+'</span><br>')+(rem?'<span class="r">('+rem+')</span>':'')+'<span class="t">'+s+'</span>';
  el.classList.toggle('vo',!!vo);el.classList.add('on');SER.sub={until:G.time+Math.max(dur||2,vd)+0.15};};
{const _s=say;say=function(who,text,dur,nv){if(SER.on)return SER.say(who,text,dur,nv);return _s(who,text,dur,nv);};}
SER.subUntil0=ls=>{const e=FIN.vox.find(ls.who,ls.text);return ls.gt+Math.max(ls.dur||2,e&&e.dur||0)+0.15;};
SER.subTick=function(){const el=$('serSub');if(!el||!SER.sub)return;if(G.time>SER.sub.until){el.classList.remove('on');SER.sub=null;}};
SER.subOff=function(){const el=$('serSub');if(el){el.style.transition='none';el.classList.remove('on');void el.offsetWidth;el.style.transition='';}SER.sub=null;};

/* ---------- звук: запись вызовов синтеза, музыки и инструментов ---------- */
SER.hookSound=function(){if(SER.hooked)return;SER.hooked=true;
  FIN.toneEv=a=>{if(SER.rec)SER.log.push({t:SER.vt,k:'tone',a:Array.from(a)});};
  const A=FIN.aud;for(const k of['osc','nz']){const f=A[k];A[k]=function(o){if(SER.rec)SER.log.push({t:SER.vt,k,a:[Object.assign({},o)]});return f.apply(this,arguments);};}
  const M=FIN.music,mp=M.play;M.play=function(tr){if(SER.rec)SER.log.push({t:SER.vt,k:'mus',track:tr||null});return mp.apply(this,arguments);};
  // ноты самой музыки (секвенсор FIN.music.tick — из render) не пишутся: музыку дорожка играет сама по меткам 'mus'
  const tk=M.tick;M.tick=function(){SER.mtick=true;try{return tk.apply(this,arguments);}finally{SER.mtick=false;}};
  const I=M.inst;for(const k of Object.keys(I)){const f=I[k];if(typeof f!=='function')continue;
    I[k]=function(f0,t,d,v){if(SER.rec&&!SER.mtick){const now=(typeof AC!=='undefined'&&AC)?AC.currentTime:0;SER.log.push({t:SER.vt,k:'inst',i:k,a:[f0,Math.max(0,(t||now)-now),d,v]});}return f.apply(this,arguments);};}};

/* ---------- модели героев для крупных планов ---------- */
// В игре камера далеко, и глаза под тяжёлыми веками читаются; в вертикальном кадре крупно — сонно и хмуро. В сериале глаза крупнее
// (кости глаз и век ×SER.eyeK), веко в покое поднято выше — лицо открытое; моргание, эмоции и закрытые веки работают как в игре.
SER.eyeK=1.22;SER.lidUp=0.5;
{const _st=step;step=function(dt){_st(dt);if(!SER.on)return;const K=SER.eyeK;for(const h of HEROES){const M=h.rig;if(!M)continue;
  for(const n of['L','R']){const e=M['eye'+n],l=M['lid'+n];if(e){e.scale.x=e.scale.z=K;e.scale.y*=K;}if(l){l.scale.setScalar(K);if(l.rotation.x<-1.0)l.rotation.x-=SER.lidUp*Math.min(1,(-1.0-l.rotation.x)/0.85);}}}
  SER.subTick();};}

/* ---------- ролики: подмена планов и метки поверх ролика игры ---------- */
{const _p=play;play=function(def){SER.lastDef=def;if(SER.patch){const f=SER.patch;SER.patch=null;try{def=f(def)||def;}catch(e){console.error(e);}}return _p(def);};}
// поверх ролика: свои планы (KS во времени ролика), реплики, метки, тик; kino — ручная постановка (без автоматических врезок)
SER.over=function(def,o){if(o.shots)def.shots=o.shots;
  if(o.reshot)def.shots=(def.shots||[]).map(sh=>{const k=Object.keys(o.reshot).find(t=>Math.abs(sh.t-(+t))<0.02);return k!=null?o.reshot[k]:sh;});
  if(o.addShots)def.shots=(def.shots||[]).concat(o.addShots).sort((a,b)=>a.t-b.t);def.kino=true;if(o.fov)def.fov=o.fov;if(o.says)def.says=o.says;if(o.dropSays)def.says=(def.says||[]).filter(s=>!o.dropSays.some(t=>Math.abs(s[0]-t)<0.05));
  if(o.addSays)def.says=(def.says||[]).concat(o.addSays).sort((a,b)=>a[0]-b[0]);if(o.cues)def.cues=(def.cues||[]).concat(o.cues);if(o.mood)def.mood=o.mood;
  if(o.events)def.events=(def.events||[]).concat(o.events);
  if(o.tick){const tk=def.tick;def.tick=(t,dt)=>{if(tk)tk(t,dt);try{o.tick(t,dt);}catch(e){console.error(e);}};}
  if(o.noEnd){const en=def.end;def.end=()=>{};def._end0=en;}return def;};

/* ---------- сегменты серии ---------- */
SER.reset=function(){G.manual=true;SER.subOff();SER.card(null);SER.fade(0);if(window.ZC)ZC.setSolo(false);};
// уровень пролога заново (комната, герои на местах)
SER.loadP=function(){if(PRK.on){PRK.on=false;PRK.inRoom=false;PRK.showLevel();PRK.restoreLook();(PRK.att||[]).forEach(o=>{if(o.parent)o.parent.remove(o);});PRK.att=[];}
  if(PRK.root){try{PRK.dispose();}catch(e){PRK.root=null;}}if(G.cine)G.cine=null;
  startFrom(LV('p'));G.manual=true;for(let i=0;i<4;i++)step(1/60);$('level').style.opacity=0;};
// площадки «Присказки» построены, комната скрыта; ролики «Присказки» сами друг друга не запускают
SER.prkEnv=function(){if(!PRK.on||W.levelId!=='p'||!PRK.root){SER.loadP();PRK.start();}if(G.cine){const S=G.cine;G.cine=null;}PRK.hideLevel();};
// сцена «Присказки» i (0…6) с подменой
SER.prkScene=function(i,o){if(o&&o.fresh){SER.loadP();PRK.start();}SER.prkEnv();PRK.i=i;let def=PRK.scenes[i]();def=SER.over(def,Object.assign({noEnd:true},o||{}));play(def);return def;};
// своя сцена на площадках «Присказки»
SER.own=function(def){SER.prkEnv();def.kino=true;play(def);return def;};
// «Колыбельная» пролога: уровень заново, герои на жёлтых пятнах — ролик запускается сам; подмена — в play
SER.lullaby=function(o){SER.loadP();const P=players;const a=P[0].heroes[P[0].act],b=P[1].heroes[P[1].act];a.pos.set(-2,0,1.4);b.pos.set(2.2,0,1.4);
  SER.patch=def=>{const e=DIR.find(x=>x.lv==='p'&&Math.abs(x.dur-43.4)<0.01);if(e&&!o.noDirCues)def.cues=(e.cues||[]).slice();return SER.over(def,Object.assign({noEnd:true},o||{}));};
  let q=0;for(;q<600&&!G.cine;q++)step(1/60);return G.cine?'lullaby':'NO CINE';};
// подготовить сегмент i серии: построить, промотать до from (звуки и реплики перемотки — прочь; реплика, что ещё звучит, — с нужного места)
SER.seg=function(ep,i){SER.on=true;SER.css();document.body.classList.add('ser');SER.hookSound();SER.ep=SER.eps[ep];const S=SER.ep.segs[i];SER.reset();
  SER.rec=true;SER.log.length=0;SER.vt=0;SER.lastMus=undefined;SER.acc=0;SER.lastSay=null;SER.tilt=S.tilt!=null?S.tilt:SER.tilt0;let r='';try{r=S.setup()||'';}catch(e){console.error(e);r='SETUP ERROR '+e.message;}
  const from=S.from||0,n=Math.round(from*60);for(let k=0;k<n;k++)step(1/60);
  const now=G.time;let last=null;for(const e of SER.log){if(e.k==='vox')last=e;if(e.k==='mus')SER.lastMus=e.track;}
  SER.log.length=0;if(SER.lastMus!==undefined)SER.log.push({t:0,k:'mus',track:SER.lastMus});if(last&&S.carry&&now-last.gt<last.d)SER.log.push({t:0,k:'vox',id:last.id,kind:'main',g:1,d:last.d,off:now-last.gt});
  // субтитр перемотки: реплика, что ещё идёт, — на экране, остальное прочь; камера ролика — сразу на месте (без доводки с прошлого плана)
  SER.subOff();const ls=SER.lastSay;if(ls&&S.carry&&SER.subUntil0(ls)>G.time){SER.rec=false;SER.say(ls.who,ls.text,SER.subUntil0(ls)-G.time-0.15,ls.vo);SER.rec=true;}
  if(G.cine){G.cine.snap=true;}step(1/60);
  if(S.enter)try{S.enter();}catch(e){console.error(e);}
  return r+' cine='+(G.cine?G.cine.t.toFixed(2):'-');};
// кадр: время видео t (от начала сегмента), шаг — dt видео; тики игры по 1/60 (в среднем ровно dt)
SER.acc=0;SER.frame=function(i,t,dt){const S=SER.ep.segs[i];SER.vt=t;SER.acc+=dt*60;const k=Math.round(SER.acc);SER.acc-=k;
  for(let q=0;q<k;q++){step(1/60);if(S.tick)try{S.tick(t,1/60);}catch(e){console.error(e);}}
  if(S.ui)try{S.ui(t);}catch(e){console.error(e);}};
// вертикальный кадр: взгляд камеры чуть ниже цели — лица и действие поднимаются в верхние две трети, под ними место субтитрам
SER.tilt0=0.1;SER.tilt=0.1;
{const _bp=basePose;basePose=function(s,t,out){_bp(s,t,out);if(SER.on&&SER.tilt){const d=out.pos.distanceTo(out.look);out.look.y-=Math.min(d,12)*SER.tilt;}return out;};}
