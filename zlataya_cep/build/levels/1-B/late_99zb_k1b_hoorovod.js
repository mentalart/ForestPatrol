/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 3 — «ХОРОВОД»: БЕГ ВОКРУГ ЛЕШЕГО, СКАКАЛКА, ЛЕНТЫ, «ТЯНИ-ПОТЯНИ» ============================== */
// docs/29_leshy_proposals.md, шаг 5. Вместо карусели с кружком над героями: Леший встаёт на пень посреди поляны, руки-ветви держат скакалку, герои бегут хороводом по стрелкам.
// • Витки: за каждым героем — лента цвета игрока к рогу Лешего; виток считается по накопленному углу вокруг центра (вперёд по стрелкам, 3,2–10,5 м от пня): колечко на стволе, фонарик на ёлке, звон.
// • Скакалка: золотой веер впереди, лиана длиной 8 м идёт навстречу бегущим (оборот ≈ 10 с, встреча каждые ≈ 4 с); прыжок (выше 0,5 м) или кувырок — мимо; задела — мягкий кувырок вбок и минус лепесток, витки целы.
//   Дальше 8 м — безопасный «карман». Круг 2: вторая скакалка (напротив) выходит на втором витке, шарманка быстрее.
// • «Тяни-потяни»: по 2 витка каждому — ленты натянулись, счёт «раз… два… ТРИ!», оба жмут удар (окно щедрое: Лёгкий ±0,9 с, Средний ±0,75, Богатырский ±0,6); не вышло — счёт снова, без наказания.
//   Леший закружился — Пробой (невидимый носитель — враг `leshyBoss`, он уже требует обоих) — Богатырский мах вдвоём. Круг 1 — мах «распутывает» ленты и начинает круг 2, круг 2 — победа.
// • Одиночный режим: бежит выбранный герой, второй «оставленный держит» ленту (скакалка его не трогает); витки считаются на одну ленту, «Тяни-потяни» — одно нажатие.
// FIN.k1b.s3: start() → носитель Маха (из startPhase3) · hint(pi) → текст задачи · tick() — в step. Состояние: st = idle | run | pull | mah | between | done.
const K1S={on:false,st:'idle',round:1,need:2,prog:[0,0],base:[0,0],last:[null,null],ids:[null,null],laps:[0,0],lapCount:0,rings:0,ropes:[],rb:[],lane:null,stump:null,pt:0,press:[null,null],beat:0,
  hits:0,jumps:0,pulls:0,fails:0,pend:false,win:0.75,boss:null,msgT:0};K1B.s3=K1S;
const k1sWrap=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a;};
const K1S_COL=[0xff8a3a,0x4ab0ff],K1S_LANE=6,K1S_ROPE=8;
const k1sPis=()=>G.solo?[G.soloPi]:[0,1];
const k1sIdx=pi=>G.solo?0:pi;
function k1sPath(){try{return genPath();}catch(e){return 'mid';}}
function k1sReset(){Object.assign(K1S,{on:false,st:'idle',round:1,need:2,prog:[0,0],base:[0,0],last:[null,null],ids:[null,null],laps:[0,0],lapCount:0,rings:0,ropes:[],rb:[],lane:null,stump:null,pt:0,press:[null,null],beat:0,hits:0,jumps:0,pulls:0,fails:0,pend:false,boss:null,msgT:0});}
{const _ll=loadLevel;loadLevel=function(i){k1sReset();_ll(i);};}
/* ---------- носитель Пробоя и Маха: невидимый враг в центре — он уже умеет требовать обоих игроков ---------- */
function k1sMakeBoss(){const C=K1B.cur.C,b=makeFoe('leshyBoss',C.x,C.z,{leash:0.1});b.noMove=true;b.harmless=true;b.needBoth=true;b.shell=null;b.guardAll=()=>b.state!=='broken';b.guardText='не пробить';b.g.visible=false;
  b.onDeath=()=>K1S.onMah();K1S.boss=b;return b;}
// никто в центре не нападает: враг-носитель только ждёт Пробоя
{const _cw=canWind;canWind=function(e,h){if(e.kind==='leshyBoss'&&W&&W.levelId==='1-B'&&K1B.cur)return false;return _cw(e,h);};}
// из startPhase3 (замена в rep_30_leshy1b.py): Леший возвращается на пень, герои выходят за пень, начинается ролик (шаг 6) и потом — хоровод
K1S.start=function(){const c=K1B.cur,C=c.C,L=c.L;k1sReset();
  L.g.visible=true;L.g.position.set(C.x,0.5,C.z);L.g.rotation.y=0;L.hands.forEach(h=>{h.sh.visible=true;});L.rig.shL.rotation.z=1.35;L.rig.shR.rotation.z=-1.35;K1B.emo(L,'laugh',0);K1B.bloom(L,true);
  const st=new THREE.Group();st.position.set(C.x,0,C.z);W.group.add(st);fk(st,K=>{K.add(KP.cyl(2.5,2.9,0.5,14),K1C.barkL,tm(0,0.25,0),{noise:0.04});K.add(KP.cyl(2.2,2.3,0.08,14),K1C.mossL,tm(0,0.52,0),{noise:0.02});
      for(let i=0;i<8;i++){const a=i/8*Math.PI*2;K.add(hSph(0.4,6,4),i%2?K1C.moss:K1C.mossL,tm(Math.sin(a)*2.5,0.55,Math.cos(a)*2.5,0,0,0,1.3,0.7,1.2),{noise:0.02});if(i%2)K.add(hIco(0.1),K1C.pink,tm(Math.sin(a)*2.3,0.78,Math.cos(a)*2.3),{s:0.2});}},{H:1.5});k1Dyn(st);K1S.stump=st;
  W.cyls.push({x:C.x,z:C.z,r:2.45,miny:-1,maxy:9,on:true});
  for(const pi of[0,1]){const h=active(pi),dx=h.pos.x-C.x,dz=h.pos.z-C.z,r=Math.hypot(dx,dz);if(r<4.2){const a=r<0.1?(pi?0.6:2.5):Math.atan2(dz,dx);h.pos.x=C.x+Math.cos(a)*4.4;h.pos.z=C.z+Math.sin(a)*4.4;h.vel.set(0,0,0);}}
  const b=k1sMakeBoss();K1S.solo=G.solo;K1S.win=({easy:0.9,mid:0.75,hard:0.6})[k1sPath()]||0.75;
  const go=()=>K1S.lesson(()=>K1S.begin());if(K1B.cine&&K1B.cine.s3intro)K1B.cine.s3intro(go);else{say('leshy','А ну-ка, закружу, заверчу!',2.2);go();}   // с роликом строку говорит он (late_99zc_k1b_cine.js)
  return b;};
// хоровод начался: дорожка, скакалка, ленты
K1S.begin=function(){const c=K1B.cur;if(!c||K1S.on)return;const C=c.C;K1S.on=true;K1S.st='run';K1S.round=1;K1S.need=2;K1S.base=K1S.prog.slice();K1S.last=[null,null];
  K1S.lane=K1B.fx.lane(C,K1S_LANE,2.2,1);k1sRopes(1);k1sRibbons();
  K1B.fx.mood('fair',2);K1B.music&&K1B.music('k1b3');
  banner('Хоровод!','#ffd76a',3.0,'бегите вокруг Лешего, как ёлки хороводом · скакалка — прыжок');
  for(const pi of k1sPis())tip(pi,'Бегом по стрелкам вокруг Лешего — ленты его обмотают! Скакалка — прыжок '+K(pi,'jump')+'.',3.8);
  if(G.solo)tip(G.soloPi,'Бежишь ты — второй держит ленту.',3.4);};
function k1sRopes(n){const C=K1B.cur.C;K1S.ropes.forEach(r=>W.group.remove(r.R.g));K1S.ropes=[];const w=K1S.round===1?0.63:0.55,ws=({easy:0.8,mid:1,hard:1.05})[k1sPath()]||1;
  for(let i=0;i<n;i++){const R=K1B.fx.rope(C,K1S_ROPE,1);K1S.ropes.push({R,th:i*Math.PI,w:w*ws,prev:[null,null],len:K1S_ROPE});}}
function k1sRibbons(){const c=K1B.cur;K1S.rb.forEach(r=>r.remove());K1S.rb=[];
  // у каждого героя своя лента: тянется за ним и мотается на ствол Лешего витками вверх (две — как двойная резьба); одиночный режим: у «оставленного» лента просто натянута
  [0,1].forEach(pi=>{K1S.rb.push(K1B.fx.coil(c.C,()=>{const h=active(pi);return {x:h.pos.x,y:h.pos.y,z:h.pos.z};},K1S_COL[pi],{y0:pi?1.9:1.6}));});}
/* ---------- витки, скакалка, «Тяни-потяни» — каждый кадр ---------- */
function k1sLap(idx){const c=K1B.cur,C=c.C;K1S.lapCount++;K1B.fx.pulse(C,K1S_COL[idx],1.9+0.5*(K1S.rings++%6));K1B.fx.lamp((K1S.lapCount-1)%14,true);
  try{tone(520+K1S.lapCount*40,0.18,'triangle',0.09,880+K1S.lapCount*40);tone(784,0.22,'sine',0.06,1175,0.12);}catch(e){}
  const h=active(G.solo?G.soloPi:idx);for(let i=0;i<5;i++)spawnSpark(h.pos.clone().add(new V3(0,1.4,0)),[COL.gold,0x6ad0ff,0xff6a8a][i%3]);
  K1B.cheer('hit');K1B.emo(c.L,'laugh',0);}
function k1sRun(dt){const c=K1B.cur,C=c.C,pis=k1sPis();
  for(const pi of pis){const h=active(pi),i=k1sIdx(pi);if(players[pi].downed||h.cling){K1S.last[i]=null;continue;}
    const dx=h.pos.x-C.x,dz=h.pos.z-C.z,r=Math.hypot(dx,dz),a=Math.atan2(dz,dx);if(K1S.ids[i]!==h){K1S.ids[i]=h;K1S.last[i]=null;}
    if(K1S.last[i]!=null&&r>3.2&&r<10.5){const d=k1sWrap(a-K1S.last[i]);if(d>0&&d<0.6)K1S.prog[i]+=d;}K1S.last[i]=a;
    const L2=Math.floor((K1S.prog[i]-K1S.base[i])/(Math.PI*2));if(L2>K1S.laps[i]){K1S.laps[i]=L2;k1sLap(i);}}
  // скакалка: идёт навстречу бегущим; прыжок выше 0,5 м или кувырок — мимо
  const lead=K1S.ropes[0];
  for(const rp of K1S.ropes){rp.th+=rp.w*dt;rp.R.set(rp.th,rp.w);const rha=-rp.th;
    for(const pi of pis){const h=active(pi),i=k1sIdx(pi),dx=h.pos.x-C.x,dz=h.pos.z-C.z,r=Math.hypot(dx,dz);if(players[pi].downed||h.cling){rp.prev[i]=null;continue;}
      const dn=k1sWrap(rha-Math.atan2(dz,dx));const pv=rp.prev[i];rp.prev[i]=dn;
      if(pv==null||r>rp.len+0.4||r<2.6)continue;
      if(pv*dn<0&&Math.abs(dn)<1.0&&Math.abs(pv)<1.0){const rolling=h.rollT>0||G.time-(h.lastRoll||-9)<0.4;
        if(rolling||h.pos.y>0.5){K1S.jumps++;try{tone(660,0.09,'sine',0.07,990);}catch(e){}spawnSpark(h.pos.clone().add(new V3(0,0.4,0)),0xffe36b);}
        else{const ha=Math.atan2(dz,dx);const src={kind:'hazard',ref:{pos:new V3(h.pos.x-Math.sin(ha)*1.0,0,h.pos.z+Math.cos(ha)*1.0)}};
          if(damageHero(h,src)){K1S.hits++;SFX.knock();}}}}}
  // Леший крутится со скакалкой: руки-ветви — по ходу лианы
  if(lead)c.L.g.rotation.y=lead.th;
  const need=K1S.need,okAll=G.solo?K1S.laps[0]>=need:(K1S.laps[0]>=need&&K1S.laps[1]>=need);
  // полоса: витки (круг 1 — первая половина, круг 2 — вторая)
  const done=(G.solo?K1S.laps[0]:(K1S.laps[0]+K1S.laps[1])/2)/need;k1sBar(Math.min(1,done));
  if(K1S.round===2&&K1S.ropes.length<2&&(G.solo?K1S.laps[0]>=1:Math.min(K1S.laps[0],K1S.laps[1])>=1)){k1sRope2();}
  if(okAll)k1sPull();}
function k1sBar(frac){const b=K1S.boss;if(b&&b.alive&&b.state!=='broken'){const P=(K1S.round-1)*0.5+0.5*frac;b.embers=Math.max(1,Math.ceil(9*(1-P)));}}
function k1sRope2(){const C=K1B.cur.C,w=K1S.ropes[0].w;const R=K1B.fx.rope(C,K1S_ROPE,1);K1S.ropes.push({R,th:K1S.ropes[0].th+Math.PI,w,prev:[null,null],len:K1S_ROPE});
  K1B.fx.leaves(new V3(C.x,4,C.z),14,{spd:2,up:1.2});try{tone(330,0.3,'sawtooth',0.07,220);}catch(e){}banner('Вторая скакалка!','#b8e070',1.6,'Леший взялся и другой рукой');}
// ленты натянулись — счёт «раз, два, три»
function k1sPull(){K1S.st='pull';K1S.pt=0;K1S.beat=0;K1S.press=[null,null];K1S.ropes.forEach(r=>{r.stop=true;});K1S.rb.forEach(r=>{r.tautTo=1;});
  banner('Тяни-потяни!','#ffd76a',2.2,(G.solo?'раз… два… ТРИ! — жми удар':'раз… два… ТРИ! — жмите вместе'));K1B.emo(K1B.cur.L,'mock',0);
  for(const pi of k1sPis())tip(pi,(G.solo?'Жми удар '+K(pi,'attack')+' на «три»!':'Вместе удар '+K(pi,'attack')+' на «три»!'),3);}
function k1sPullTick(dt){const c=K1B.cur,t3=2.3,Wd=K1S.win,pis=k1sPis();
  K1S.ropes.forEach(r=>{if(r.stop){r.w*=Math.max(0,1-dt*2.2);r.th+=r.w*dt;r.R.set(r.th,r.w);}});if(K1S.ropes[0])c.L.g.rotation.y=K1S.ropes[0].th;
  K1S.pt+=dt;const beats=[0.9,1.6,2.3];
  if(K1S.beat<3&&K1S.pt>=beats[K1S.beat]){const b=K1S.beat++;try{tone([440,550,880][b],0.16,'triangle',0.1);}catch(e){}floatText(c.L.g.position.clone().add(new V3(0,11.5+b*0.4,0)),['РАЗ…','ДВА…','ТРИ!'][b],b===2?'#ffd76a':'#fff3c0');
    K1B.fx.lamp(b*4,true);K1B.fx.lamp(b*4+1,true);}
  for(const pi of pis){const i=k1sIdx(pi);if(K1S.press[i]==null&&tap(pi,'attack')&&K1S.pt>=t3-Wd&&K1S.pt<=t3+Wd)K1S.press[i]=K1S.pt;}
  const need=G.solo?[0]:[0,1],ok=need.every(i=>K1S.press[i]!=null);
  if(ok&&(G.solo||Math.abs(K1S.press[0]-K1S.press[1])<=Wd*2)){k1sSnap();return;}
  if(K1S.pt>t3+Wd+0.25){K1S.fails++;K1S.pt=0;K1S.beat=0;K1S.press=[null,null];floatText(c.L.g.position.clone().add(new V3(0,11,0)),(G.solo?'Раз, два, три!':'Вместе — раз, два, три!'),'#ffd76a');}}
// вышло: Леший запутался в лентах и закружился — Пробой
function k1sSnap(){const c=K1B.cur,L=c.L,C=c.C,b=K1S.boss;K1S.st='mah';K1S.pulls++;K1B.emo(L,'dizzy',0);SFX.horn&&SFX.horn();G.hitstop=0.12;shakeAll(0.05,0.4);
  K1B.fx.leaves(new V3(C.x,6,C.z),40,{spd:2.4,up:1.4});for(let i=0;i<14;i++)K1B.fx.lamp(i,true);
  const y0=L.g.rotation.y;anim(2,k=>{L.g.rotation.y=y0+k*Math.PI*6*(1-k*0.5);});
  if(b&&b.alive){b.embers=1;emberOut(b,1,'');}
  for(const pi of k1sPis())tip(pi,'Леший закружился!',3.6);}
function k1sMahTick(dt){const b=K1S.boss;if(!b||!b.alive)return;
  if(b.state!=='broken'&&b.state!=='dying'){   // мах не вышел вдвоём или окно вышло — снова «Тяни-потяни»
    K1S.fails++;K1S.st='run';K1S.ropes.forEach(r=>{r.stop=false;});K1S.base=K1S.base.map((v,i)=>K1S.prog[i]-(K1S.need)*Math.PI*2);K1S.laps=[K1S.need,K1S.need];k1sPull();}}
// мах состоялся (onDeath врага-носителя)
K1S.onMah=function(){const c=K1B.cur,C=c.C,L=c.L;
  if(K1S.round===1){K1S.st='between';K1S.round=2;K1B.fx.unwrap();K1S.rb.forEach(r=>{r.tautTo=0;r.reel();});K1S.ropes.forEach(r=>{r.stop=true;});   // распутали: ленты сматываются к героям
    K1B.fx.leaves(new V3(C.x,7,C.z),70,{spd:3,up:1.6,size:1.3});K1B.emo(L,'laugh',0);K1B.cheer('clap',4);
    banner('Ещё круг!','#b8e070',2.4,'скакалок две, шарманка быстрее');
    later(2.6,()=>{if(!K1B.cur)return;const b=k1sMakeBoss();c.setBoss(b);b.embers=5;K1S.need=2;K1S.base=K1S.prog.slice();K1S.laps=[0,0];K1S.last=[null,null];k1sRopes(1);k1sRibbons();K1S.st='run';K1B.music&&K1B.music('k1b3b');K1B.emo(L,'mock',0);});}
  else{K1S.st='done';K1S.on=false;K1B.fx.unwrap();const rbs=K1S.rb;K1S.rb=[];rbs.forEach(r=>{r.tautTo=0;r.reel();});later(2,()=>rbs.forEach(r=>r.remove()));K1S.ropes.forEach(r=>W.group.remove(r.R.g));if(K1S.lane)K1S.lane.show(false);K1B.emo(L,'sheepish',0);
    K1B.fx.leaves(new V3(C.x,7,C.z),110,{spd:3.4,up:1.8,size:1.4});for(let i=0;i<14;i++)K1B.fx.lamp(i,true);
    const F=c.F;F.won=true;later(1.4,()=>{L.g.visible=false;if(K1S.stump)K1S.stump.visible=false;c.ending();});}};
// текст задачи по состоянию
K1S.hint=function(pi){const i=k1sIdx(pi),lap=Math.min(K1S.need,K1S.laps[i]||0);
  if(K1S.st==='pull')return (G.solo?'Раз… два… три — жми удар '+K(pi,'attack')+'!':'Раз… два… три — вместе удар '+K(pi,'attack')+'!');
  if(K1S.st==='mah')return (G.solo?'Беги к нему — бей '+K(pi,'attack')+': Богатырский мах!':'Бегите к нему, бейте '+K(pi,'attack')+' вдвоём — Богатырский мах!');
  if(K1S.st==='between')return 'Распутали! Круг второй — скакалок две.';
  return 'Бегом по стрелкам вокруг Лешего — ленты его обматывают ('+lap+' из '+K1S.need+'). Скакалка — прыжок '+K(pi,'jump')+'.';};
{const _st=step;step=function(dt){_st(dt);const c=K1B.cur;if(!c||!W||W.levelId!=='1-B'||!K1S.on||W.flags.phase!==3||G.cine)return;
    try{if(K1S.st==='run')k1sRun(dt);else if(K1S.st==='pull')k1sPullTick(dt);else if(K1S.st==='mah')k1sMahTick(dt);
      else if(K1S.st==='between'&&K1S.ropes[0]){const r=K1S.ropes[0];r.w*=Math.max(0,1-dt*1.5);r.th+=r.w*dt;r.R.set(r.th,r.w);c.L.g.rotation.y=r.th;}}
    catch(e){console.error('k1s',e);K1S.on=false;}};}

// «Добивающий мах» из общих подсказок и всплывашки — в 1-Б везде «Богатырский мах» (общий текст других уровней не трогаем)
{const _ct=contextTip;contextTip=function(pi){const r=_ct(pi);return r&&W&&W.levelId==='1-B'?r.replace('Добивающий мах','Богатырский мах'):r;};
 const _ft=floatText;floatText=function(pos,text,color){return _ft(pos,W&&W.levelId==='1-B'&&text==='Добивающий мах!'?'Богатырский мах!':text,color);};}
// общие подсказки боя в 1-Б — короче и без «оба»/дубля (в других уровнях тексты прежние)
{const _tp=tip;tip=function(pi,html,dur){if(W&&W.levelId==='1-B'&&typeof html==='string'){let m;
    if(m=/^Большой морок оглушён! Ударьте (.*?) оба разом/.exec(html))html='Бейте '+m[1]+' вдвоём — Богатырский мах!';
    else if(/^Увернулся — враг закружился!/.test(html))html='Враг закружился — бей, пока открыт!';
    else if(/^Не попасть! Отбей/.test(html))html='Не попасть — сначала отбей его удар.';}
  return _tp(pi,html,dur);};}

/* ---------- счёт «Раз · Два · ТРИ!» крупно: цифры над Лешим уходят из кадра — счёт дублируется кружками (как узда 4-Б) на экране — в бою и в уроке одинаково ---------- */
// n — сколько счётов прозвучало (0…3), hot — окно «ТРИ!» открыто: жми
function k1cRow(n,hot){if(!k1cRow.css){k1cRow.css=1;const st=document.createElement('style');
    st.textContent='.k1c{display:inline-block;margin:0 6px;border-radius:50%;border:4px solid;font:800 18px/1 system-ui;text-align:center;vertical-align:middle;transition:background .12s}'+
      '.k1c-hit{animation:k1cPop .35s ease-out}.k1c-hot{animation:k1cHot .22s ease-in-out infinite alternate}'+
      '@keyframes k1cPop{0%{transform:scale(1.4)}100%{transform:scale(1)}}@keyframes k1cHot{0%{transform:scale(1)}100%{transform:scale(1.14)}}';document.head.appendChild(st);}
  let s='';for(let i=0;i<3;i++){const on=i<n,tr=i===2,sz=tr?62:50;
    s+=(i?'<span style="display:inline-block;vertical-align:middle;color:#ffd76a;font:800 20px system-ui">›</span>':'')+
      '<span class="k1c'+(on&&i===n-1?' k1c-hit':'')+(tr&&hot?' k1c-hot':'')+'" style="width:'+sz+'px;height:'+sz+'px;line-height:'+sz+'px;'+(tr?'font-size:21px;':'')+
      'border-color:'+(on?'#fff6c0':'#ffd76a')+';background:'+(on?(tr?'radial-gradient(#fffbe0,#ff9a20)':'radial-gradient(#fff6c0,#ffb030)'):'#2a1608cc')+';color:'+(on?'#3a1606':'#ffe9a0')+
      ';box-shadow:0 0 '+(on?(tr?30:16):6)+'px #ffb030">'+['Раз','Два','ТРИ!'][i]+'</span>';}
  return s;}
// на экране, пока ленты натянуты (бой: st = pull; урок: шаг «Тяни-потяни», S — его состояние): кружки и кто уже ударил
const K1CNT={d:null};
function k1cHud(show,S){S=S||K1S;let d=K1CNT.d;if(!show){if(d)d.style.opacity='0';return;}
  if(!d||!d.isConnected){d=K1CNT.d=document.createElement('div');d.id='k1bCount';
    d.style.cssText='position:fixed;left:50%;top:38vh;transform:translate(-50%,0);z-index:34;pointer-events:none;font-family:system-ui;text-align:center;color:#fff6e0;opacity:0;transition:opacity .2s;text-shadow:0 2px 4px #000a';
    document.body.appendChild(d);}
  const t3=2.3,Wd=S.win,hot=S.pt>=t3-Wd&&S.pt<=t3+Wd,pis=k1sPis();
  const who=G.solo?'жми '+K(G.soloPi,'attack')+' на «ТРИ!»':pis.map(pi=>'Игрок '+(pi+1)+' '+(S.press[k1sIdx(pi)]!=null?'✓':K(pi,'attack'))).join(' &nbsp;·&nbsp; ');
  const h='<div>'+k1cRow(S.beat,hot)+'</div><div style="margin-top:8px;font-size:17px;font-weight:700">'+who+'</div>';
  if(d._h!==h){d._h=h;d.innerHTML=h;}d.style.opacity='1';
  // в уроке карточка стоит посреди экрана — счётчик над ней, вплотную (в бою — на 38vh)
  const ft=S!==K1S&&$('finTut'),r=ft&&ft.classList.contains('on')?ft.getBoundingClientRect():null;d.style.top=r&&r.height>0?Math.max(8,r.top-d.offsetHeight-8)+'px':'38vh';}
{const _st=step;step=function(dt){_st(dt);const on=!!(K1B.cur&&W&&W.levelId==='1-B'&&K1S.on&&K1S.st==='pull'&&W.flags.phase===3&&!G.cine&&G.state==='play'&&!FIN.titleOn);
  const les=K1LES.D&&K1LES.D.hud&&K1LES.D.hs&&W&&W.levelId==='1-B'?K1LES.D.hs:null;   // урок «Тяни-потяни» — тот же счётчик
  if(on||les||K1CNT.d)try{k1cHud(on||!!les,on?K1S:les);}catch(e){console.error('k1c',e);}};}
{const _ll=loadLevel;loadLevel=function(i){k1cHud(false);_ll(i);};}

/* ---------- урок «Хоровода» (общий шаблон FIN.lesson, late_79e_lesson.js): одна механика — один шаг; пропуск — держать прыжок ---------- */
// Урок выглядит, как бой: та же дорожка со стрелками, скакалка, ленты-витки, Леший крутится вслед за скакалкой, тот же счёт на экране (k1cHud) и фонарики на счёт.
// Шаг 0 «Хоровод»: герои сами бегут по стрелкам вокруг Лешего, ленты за ними мотаются на ствол (без нажатий).
// Шаг 1 «Прыжок»: скакалка идёт — прыгай (нажми прыжок; не нажал за 8 с — герои прыгают сами); под героями белый круг — встаёт корень-подножка, герои перепрыгивают (late_99zcd_k1b_mn3.js).
// Шаг 2 «Тяни-потяни»: как в бою (k1sPullTick) — скакалка стихает, ленты натянуты, «раз» 0,9 с · «два» 1,6 · «ТРИ!» 2,3; окно — как в бою (±K1S.win). Первый счёт — показ: герои бьют сами;
//   дальше — игроки: оба в окне — Леший закружился; нет — «Вместе — раз, два, три!» и счёт снова; три промаха — показ («Смотри — вот так!»).
// Шаг 3 «Богатырский мах»: Леший закружился — герои подбегают к пню, оба бьют разом — мах, ленты сматываются к героям (как после маха в бою).
// «Показать ещё раз» — LK.regLevel('1-B', …) (пауза и лестница подсказок F-3). Видели один раз — в этой игре не повторяем (G.flags.k1b[3]); FIN.k1b.les.auto=false — без урока (боты).
const LK1=FIN.lesson,K1LES=K1B.les={auto:true,runs:0};
LK1.icons.k1run='<svg viewBox="0 0 64 64"><rect x="26" y="8" width="12" height="34" rx="5" fill="#8a5a2a"/><path d="M26 18 H38 M26 25 H38 M26 32 H38" stroke="#ff8a3a" stroke-width="4"/><ellipse cx="32" cy="46" rx="25" ry="9" fill="none" stroke="#ffd76a" stroke-width="5" stroke-dasharray="44 9" stroke-linecap="round"/><path d="M55 38 L60 49 L48 48 Z" fill="#ffd76a"/></svg>';
LK1.icons.k1jump='<svg viewBox="0 0 64 64"><path d="M6 46 H58" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="32" cy="22" r="8" fill="#ffd9a0" stroke="#7a4a10" stroke-width="3"/><path d="M32 30 V40 M24 46 L32 40 L40 46" stroke="#7a4a10" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M32 4 V10 M26 8 L32 2 L38 8" stroke="#fff" stroke-width="3" fill="none"/></svg>';
LK1.icons.k1pull='<svg viewBox="0 0 64 64"><path d="M8 32 H26 M38 32 H56" stroke="#ffd76a" stroke-width="7" stroke-linecap="round"/><circle cx="32" cy="32" r="6" fill="#fff2b0" stroke="#c88a10" stroke-width="3"/></svg>';
LK1.icons.k1mah='<svg viewBox="0 0 64 64"><path d="M32 8 L37 24 L54 24 L40 34 L45 51 L32 41 L19 51 L24 34 L10 24 L27 24 Z" fill="#ffd76a" stroke="#c88a10" stroke-width="3" stroke-linejoin="round"/><path d="M4 58 L18 46 M60 58 L46 46" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>';
function k1lesInit(){const C=K1B.cur.C,pis=[0,1],again=K1S.on,L=K1B.cur.L,sv={ropes:K1S.ropes.map(r=>r.R.g.visible),rbs:K1S.rb.map(r=>r.m.visible),ys:[]};
  K1S.ropes.forEach(r=>{r.R.g.visible=false;});K1S.rb.forEach(r=>{r.m.visible=false;});   // повтор из паузы: настоящие ленты прячем, пока идёт показ
  if(!again)L.g.visible=true;
  const lane=K1B.fx.lane(C,K1S_LANE,2.2,1),rope=K1B.fx.rope(C,K1S_ROPE,1),ang=[],y0=[];
  // первый показ — герои встают на дорожку лицом к камере; повтор — остаются где были
  pis.forEach(pi=>{const h=active(pi);if(!again){const a=pi?0.74:2.4;h.pos.x=C.x+Math.cos(a)*K1S_LANE;h.pos.z=C.z+Math.sin(a)*K1S_LANE;h.vel.set(0,0,0);h.face=Math.PI;}
    ang[pi]=Math.atan2(h.pos.z-C.z,h.pos.x-C.x);y0[pi]=h.pos.y;});
  rope.g.visible=false;   // скакалка — со второго шага
  const rb=pis.map(pi=>K1B.fx.coil(C,()=>{const h=active(pi);return {x:h.pos.x,y:h.pos.y,z:h.pos.z};},K1S_COL[pi],{y0:pi?1.9:1.6}));   // ленты показа: мотаются на ствол, как в игре
  const D={C,lane,rope,rb,ang,y0,sv,th:-(ang[0]+1.8),w:1,w0:Math.PI*2/8.25,t:0,spin:-1,hop:[-9,-9],pv:[null,null],again,yL:L.g.rotation.y,pos:pis.map(pi=>active(pi).pos.clone()),
    hs:null,hud:false,s1t:0,roots:[],mah:false};K1LES.D=D;return D;}
function k1lesEnd(){const D=K1LES.D;if(!D)return;K1LES.D=null;
  {const L=K1B.cur&&K1B.cur.L;if(L){L.g.rotation.z=0;L.g.rotation.y=D.yL;K1B.emo(L,D.again?'mock':'laugh',0);}}
  [0,1].forEach(pi=>{const h=active(pi),p=D.pos[pi];h.pos.set(p.x,D.y0[pi],p.z);h.vel.set(0,0,0);h.atkT=0;});   // герои — где стояли до урока
  D.lane.show&&D.lane.show(false);D.lane.g.visible=false;W.group.remove(D.rope.g);D.rb.forEach(r=>r.remove());D.roots.forEach(r=>{k1Del(r.g);if(r.T)r.T.del();});
  for(let i=0;i<14;i++)K1B.fx.lamp(i,i<Math.min(14,K1S.lapCount));   // фонарики — как до урока (по набранным виткам)
  k1cHud(false);
  K1S.ropes.forEach((r,i)=>{r.R.g.visible=D.sv.ropes[i]!==false;});K1S.rb.forEach((r,i)=>{r.m.visible=D.sv.rbs[i]!==false;});}
function k1lesHop(D,pi){if(G.time-D.hop[pi]>0.7)D.hop[pi]=G.time;}
// скакалка крутится, Леший поворачивается вслед за ней (как в бою), герои прыгают в нужный миг (и по нажатию)
function k1lesRope(D,dt){D.th+=D.w*dt;D.rope.set(D.th,D.w);const rha=-D.th;if(D.spin<0&&D.rope.g.visible)K1B.cur.L.g.rotation.y=D.th;
  [0,1].forEach(pi=>{const dn=k1sWrap(rha-D.ang[pi]);const pv=D.pv[pi];D.pv[pi]=dn;if(pv!=null&&dn>0&&dn<D.w*0.3&&pv>dn)k1lesHop(D,pi);
    const k=(G.time-D.hop[pi])/0.65;active(pi).pos.y=D.y0[pi]+(k>=0&&k<=1?1.1*Math.sin(Math.PI*k):0);});}
// корень-подножка в уроке: белый круг под героем, через 1,2 с корень встаёт — герой уже в прыжке
function k1lesRoots(D,dt){D.s1t+=dt;const t=D.s1t;
  if(t>=1.0&&!D.roots.length&&K1M3&&K1M3.rootMesh)[0,1].forEach(pi=>{const h=active(pi);D.roots.push({pi,x:h.pos.x,z:h.pos.z,T:K1F.teleObj(h.pos.x,h.pos.z,1.0,'white'),g:K1M3.rootMesh(h.pos.x,h.pos.z),up:false});});
  for(const r of D.roots){if(t<2.2){if(r.T)r.T.set((t-1.0)/1.2);r.g.position.y=-2.1+0.1*Math.sin(t*30)*((t-1)/1.2);if(t>=2.05&&!r.hp){r.hp=1;if(G.time-D.hop[r.pi]>0.3)D.hop[r.pi]=G.time;}}
    else if(t<3.0){if(r.T){r.T.flash();r.T=null;}if(!r.up){r.up=true;try{SFX.whoosh();}catch(e){}K1F.leaves(new V3(r.x,0.3,r.z),8,{spd:1.4,up:0.8,cols:[0x6a4630,0x8c6644,0x9acb48]});
        floatText(new V3(r.x,2.4,r.z),'Перепрыгнул!','#b8e070');}r.g.position.y=-2.1+2.1*CINE.E.outBack(Math.min(1,(t-2.2)/0.22));}
    else r.g.position.y=-2.1*Math.min(1,(t-3.0)/0.45);}}
// герои бегут по стрелкам вокруг Лешего: разгон, ход, остановка; ленты за ними мотаются на ствол. Путь за шаг — w0·8,25 рад (разгон 0,9 с, ход, остановка 0,6 с): ровно круг, кончают там же, где начали
function k1lesRun0(D,u,dt){const k=Math.min(1,u/0.9),sp=D.w0*k*k*(3-2*k)*(u>8.4?Math.max(0,1-(u-8.4)/0.6):1);
  [0,1].forEach(pi=>{const h=active(pi),a=(D.ang[pi]+=sp*dt);h.pos.x=D.C.x+Math.cos(a)*K1S_LANE;h.pos.z=D.C.z+Math.sin(a)*K1S_LANE;h.pos.y=D.y0[pi];
    h.vel.set(-Math.sin(a)*sp*K1S_LANE,0,Math.cos(a)*sp*K1S_LANE);h.face=Math.atan2(-Math.sin(a),Math.cos(a));});}
// «Тяни-потяни» — тот же счёт и окно, что в бою (k1sPullTick); D.hs — состояние для счётчика на экране (k1cHud)
function k1lesPull(D,s,dt){const L=K1B.cur.L,P=D.hs,pis=k1sPis(),t3=2.3,Wd=P.win;D.w*=Math.max(0,1-dt*2.2);k1lesRope(D,dt);
  if(D.spin>=0)return;
  pis.forEach(pi=>{const h=active(pi);h.face=Math.atan2(D.C.x-h.pos.x,D.C.z-h.pos.z);});   // у натянутой ленты — лицом к Лешему
  P.pt+=dt;const beats=[0.9,1.6,2.3];
  if(P.beat<3&&P.pt>=beats[P.beat]){const b=P.beat++;try{tone([440,550,880][b],0.16,'triangle',0.1);}catch(e){}floatText(L.g.position.clone().add(new V3(0,11.5+b*0.4,0)),['РАЗ…','ДВА…','ТРИ!'][b],b===2?'#ffd76a':'#fff3c0');
    K1B.fx.lamp(b*4,true);K1B.fx.lamp(b*4+1,true);
    if(b===2&&P.demo){pis.forEach(pi=>{k1lesStrike(D,pi);P.press[k1sIdx(pi)]=P.pt;});const a=(D.ang[0]+D.ang[1])/2;floatText(new V3(D.C.x+Math.cos(a)*K1S_LANE,2.6,D.C.z+Math.sin(a)*K1S_LANE),'Вот так — вместе!','#ffd76a');}}
  if(P.demo){if(P.pt>3.4){P.demo=false;k1lesCount(D);s.got={};LK1.show(s.card,s.got,'wait');}return;}
  for(const pi of pis){const i=k1sIdx(pi);if(P.press[i]==null&&LK1.tap(pi,'attack')){k1lesStrike(D,pi);if(P.pt>=t3-Wd&&P.pt<=t3+Wd){P.press[i]=P.pt;s.got[pi]=true;LK1.show(s.card,s.got,'wait');}}}
  const need=G.solo?[0]:[0,1];
  if(need.every(i=>P.press[i]!=null)&&(G.solo||Math.abs(P.press[0]-P.press[1])<=Wd*2)){s.okAt=1;k1lesSpin(D);SFX.ok();LK1.show(s.card,s.got,'ok');k1lesFwd(s);return;}
  if(P.pt>t3+Wd+0.25){P.fails++;
    if(P.fails>=3){pis.forEach(pi=>{k1lesStrike(D,pi);s.got[pi]=true;});s.okAt=1;LK1.autos++;k1lesSpin(D);LK1.show(s.card,s.got,'auto');k1lesFwd(s);return;}
    k1lesCount(D);s.got={};LK1.show(s.card,s.got,'wait');floatText(L.g.position.clone().add(new V3(0,11,0)),(G.solo?'Раз, два, три!':'Вместе — раз, два, три!'),'#ffd76a');}}
function k1lesCount(D){const P=D.hs;P.pt=0;P.beat=0;P.press=[null,null];for(let i=0;i<14;i++)K1B.fx.lamp(i,false);}
// шаг без wait стоит на счёте, пока не вышло; вышло — досматриваем ~2,6 с и дальше (как у шагов с ожиданием)
function k1lesHold(s,u){if(G.cine&&s.okAt==null&&u>s.hold)G.cine.t=s.t0+s.hold;}
function k1lesFwd(s){if(G.cine&&s.t0+s.dur-G.cine.t>2.6)G.cine.t=s.t0+s.dur-2.6;}
// удар героя: замах, лицом к Лешему (как нажатие удара в бою)
function k1lesStrike(D,pi){const h=active(pi);h.atkT=0.28;h.face=Math.atan2(D.C.x-h.pos.x,D.C.z-h.pos.z);try{SFX.swish();}catch(e){}}
// вышло: Леший запутался в лентах и закружился — как k1sSnap в бою
function k1lesSpin(D){if(D.spin>=0)return;const L=K1B.cur.L;D.spin=0;L.g.rotation.z=0;K1B.emo(L,'dizzy',0);try{SFX.horn&&SFX.horn();}catch(e){}shakeAll(0.05,0.4);
  K1B.fx.leaves(new V3(D.C.x,6,D.C.z),40,{spd:2.4,up:1.4});for(let i=0;i<14;i++)K1B.fx.lamp(i,true);floatText(L.g.position.clone().add(new V3(0,9,0)),'Закружился!','#ffd76a');
  const y0=L.g.rotation.y;anim(2,k=>{if(K1LES.D===D)L.g.rotation.y=y0+k*Math.PI*6*(1-k*0.5);});}
// Богатырский мах: герои подбегают к пню (как в бою — бить надо вплотную), Леший покачивается оглушённый
function k1lesRunIn(D,u){const C=D.C,k=CINE.E.inOutSine(Math.min(1,u/0.9));[0,1].forEach(pi=>{const h=active(pi),p=D.m0[pi],a=Math.atan2(p.z-C.z,p.x-C.x),r=lerp(Math.hypot(p.x-C.x,p.z-C.z),3.1,k);
    h.pos.x=C.x+Math.cos(a)*r;h.pos.z=C.z+Math.sin(a)*r;h.face=Math.atan2(C.x-h.pos.x,C.z-h.pos.z);h.vel.set(0,0,0);});
  if(!D.mah)K1B.cur.L.g.rotation.z=Math.sin(G.time*6)*0.05;}
function k1lesMah(D){if(D.mah)return;D.mah=true;const C=D.C,L=K1B.cur.L;L.g.rotation.z=0;try{SFX.horn();SFX.finisher();}catch(e){}shakeAll(0.06,0.4);ringFx(new V3(C.x,0,C.z),COL.gold,3.5);
  floatText(L.g.position.clone().add(new V3(0,9,0)),'Богатырский мах!','#ffd76a');for(let i=0;i<10;i++)spawnSpark(new V3(C.x,2.4,C.z),[COL.gold,0x6ad0ff,0xff6a8a][i%3]);
  K1B.fx.leaves(new V3(C.x,7,C.z),70,{spd:3,up:1.6,size:1.3});K1B.emo(L,'laugh',0);K1B.cheer('clap',3);D.rb.forEach(r=>{r.tautTo=0;r.reel();});}
function k1lesSteps(){const D=k1lesInit(),C=D.C,keys=a=>[0,1].map(pi=>({pi,a,wait:true})),
    cam={p:[C.x,6.5,C.z+15.5],l:[C.x,2,C.z-2]},   // скакалка и «Тяни-потяни» — спереди и сверху: оба героя с лентами и скакалка под карточкой
    camRun={p:[C.x-7,13,C.z+19],l:[C.x,2,C.z-6],p2:[C.x+7,13,C.z+19],l2:[C.x,2,C.z-6]},   // сверху и издали, взгляд за пень: ствол с витками — под карточкой урока, герои у нижнего края
    camMah={p:[C.x+2,6,C.z+12],l:[C.x,2.6,C.z]};   // мах — ближе: пень, Леший и оба героя
  const s0=Object.assign({dur:9.4,card:{tag:'Урок',title:'Хоровод',icon:'k1run',text:'Бегите по стрелкам <b>вокруг Лешего</b> — ленты <b>обматывают</b> его: запутается!'},
    update:(s,u,dt)=>k1lesRun0(D,u,dt)},camRun);
  const s1=Object.assign({dur:11.6,enter:()=>{[0,1].forEach(pi=>active(pi).vel.set(0,0,0));D.rope.g.visible=true;D.th=-(D.ang[0]+1.8);D.s1t=0;},
    card:{tag:'Урок',title:'Прыжок',icon:'k1jump',text:'Скакалка идёт — <b>прыгай</b>! Белый круг под ногами — корень: тоже <b>прыгай</b>!',keys:keys('jump')},
    wait:{who:'both',a:'jump',timeout:8},each:(s,pi)=>k1lesHop(D,pi),update:(s,u,dt)=>{k1lesRope(D,dt);k1lesRoots(D,dt);},done:()=>{K1LES.ok=true;}},cam);
  const s2=Object.assign({dur:7,hold:4.2,enter:()=>{D.rb.forEach(r=>{r.tautTo=1;});D.hud=true;D.hs={pt:0,beat:0,press:[null,null],win:K1S.win||0.75,demo:true,fails:0};for(let i=0;i<14;i++)K1B.fx.lamp(i,false);},
    card:{tag:'Урок',title:'Тяни-потяни',icon:'k1pull',text:'Ленты натянулись. Раз… два… <b>ТРИ!</b> — бейте <b>вместе</b>!',keys:keys('attack')},
    update:(s,u,dt)=>{k1lesPull(D,s,dt);k1lesHold(s,u);}},cam);
  const s3=Object.assign({dur:7.5,at:1.0,enter:()=>{D.hud=false;D.m0=[0,1].map(pi=>active(pi).pos.clone());},
    card:{tag:'Урок',title:'Богатырский мах',icon:'k1mah',text:'Закружился! Бегите к нему — бейте <b>вдвоём</b> разом!',keys:keys('attack')},
    wait:{who:'both',a:'attack',timeout:8,sync:0.6},each:(s,pi)=>k1lesStrike(D,pi),done:(s,auto)=>{if(auto)[0,1].forEach(pi=>k1lesStrike(D,pi));k1lesMah(D);},update:(s,u)=>k1lesRunIn(D,u)},camMah);
  return [s0,s1,s2,s3];}
function k1lesRun(then){K1LES.runs++;K1LES.ok=false;const steps=k1lesSteps();
  LK1.run(steps,{fov:47,end:()=>{k1lesEnd();if(then)then();}});}
// перед первым кругом: после ролика этапа 3 (S.start → go)
K1S.lesson=function(go){if(!K1LES.auto||LK1.seen('k1b',3)){go();return;}LK1.mark('k1b',3);later(0.25,()=>{if(!K1B.cur){go();return;}k1lesRun(go);});};
LK1.regLevel('1-B',()=>{if(K1S.on)k1lesRun();},()=>!!K1B.cur&&K1S.on&&W.flags.phase===3&&(K1S.st==='run'||K1S.st==='pull'));
