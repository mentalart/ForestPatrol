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
  const go=()=>K1S.begin();if(K1B.cine&&K1B.cine.s3intro)K1B.cine.s3intro(go);else{say('leshy','А ну-ка, закружу, заверчу!',2.2);go();}   // с роликом строку говорит он (late_99zc_k1b_cine.js)
  return b;};
// хоровод начался: дорожка, скакалка, ленты
K1S.begin=function(){const c=K1B.cur;if(!c||K1S.on)return;const C=c.C;K1S.on=true;K1S.st='run';K1S.round=1;K1S.need=2;K1S.base=K1S.prog.slice();K1S.last=[null,null];
  K1S.lane=K1B.fx.lane(C,K1S_LANE,2.2,1);k1sRopes(1);k1sRibbons();
  K1B.fx.mood('fair',2);K1B.music&&K1B.music('k1b3');
  banner('Хоровод!','#ffd76a',2.4,'беги по стрелкам, через скакалку — прыжок');
  for(const pi of k1sPis())tip(pi,'Бегом по стрелкам! Скакалка — прыжок '+K(pi,'jump')+', кувырок '+K(pi,'roll')+'.',3.4);
  if(G.solo)tip(G.soloPi,'Бежишь ты — второй держит ленту.',3.4);};
function k1sRopes(n){const C=K1B.cur.C;K1S.ropes.forEach(r=>W.group.remove(r.R.g));K1S.ropes=[];const w=K1S.round===1?0.63:0.55,ws=({easy:0.8,mid:1,hard:1.05})[k1sPath()]||1;
  for(let i=0;i<n;i++){const R=K1B.fx.rope(C,K1S_ROPE,1);K1S.ropes.push({R,th:i*Math.PI,w:w*ws,prev:[null,null],len:K1S_ROPE});}}
function k1sRibbons(){const c=K1B.cur;K1S.rb.forEach(r=>r.remove());K1S.rb=[];
  [0,1].forEach(pi=>{const hh=c.L.rig.head,s=pi?-1:1;
    K1S.rb.push(K1B.fx.ribbon(()=>{const v=new V3();hh.getWorldPosition(v);v.y+=3.0;v.x+=s*1.1;return v;},()=>{const h=active(pi);return new V3(h.pos.x,h.pos.y+heroHeight(h)*0.6,h.pos.z);},K1S_COL[pi],{sag:1.7}));});}
/* ---------- витки, скакалка, «Тяни-потяни» — каждый кадр ---------- */
function k1sLap(idx){const c=K1B.cur,C=c.C;K1S.lapCount++;K1B.fx.wrap(C,K1S.rings++,K1S_COL[idx]);K1B.fx.lamp((K1S.lapCount-1)%14,true);
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
function k1sPull(){K1S.st='pull';K1S.pt=0;K1S.beat=0;K1S.press=[null,null];K1S.ropes.forEach(r=>{r.stop=true;});K1S.rb.forEach(r=>{r.sag=0.35;});
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
  if(K1S.round===1){K1S.st='between';K1S.round=2;K1B.fx.unwrap();K1S.rb.forEach(r=>r.remove());K1S.rb=[];K1S.ropes.forEach(r=>{r.stop=true;});
    K1B.fx.leaves(new V3(C.x,7,C.z),70,{spd:3,up:1.6,size:1.3});K1B.emo(L,'laugh',0);K1B.cheer('clap',4);
    banner('Ещё круг!','#b8e070',2.4,'скакалок две, шарманка быстрее');
    later(2.6,()=>{if(!K1B.cur)return;const b=k1sMakeBoss();c.setBoss(b);b.embers=5;K1S.need=2;K1S.base=K1S.prog.slice();K1S.laps=[0,0];K1S.last=[null,null];k1sRopes(1);k1sRibbons();K1S.st='run';K1B.music&&K1B.music('k1b3b');K1B.emo(L,'mock',0);});}
  else{K1S.st='done';K1S.on=false;K1B.fx.unwrap();K1S.rb.forEach(r=>r.remove());K1S.rb=[];K1S.ropes.forEach(r=>W.group.remove(r.R.g));if(K1S.lane)K1S.lane.show(false);K1B.emo(L,'sheepish',0);
    K1B.fx.leaves(new V3(C.x,7,C.z),110,{spd:3.4,up:1.8,size:1.4});for(let i=0;i<14;i++)K1B.fx.lamp(i,true);
    const F=c.F;F.won=true;later(1.4,()=>{L.g.visible=false;if(K1S.stump)K1S.stump.visible=false;c.ending();});}};
// текст задачи по состоянию
K1S.hint=function(pi){const i=k1sIdx(pi),lap=Math.min(K1S.need,K1S.laps[i]||0);
  if(K1S.st==='pull')return (G.solo?'Раз… два… три — жми удар '+K(pi,'attack')+'!':'Раз… два… три — вместе удар '+K(pi,'attack')+'!');
  if(K1S.st==='mah')return (G.solo?'Беги к нему — бей '+K(pi,'attack')+': Богатырский мах!':'Бегите к нему, бейте '+K(pi,'attack')+' вдвоём — Богатырский мах!');
  if(K1S.st==='between')return 'Распутали! Круг второй — скакалок две.';
  return 'Бегом по стрелкам ('+lap+' из '+K1S.need+'). Скакалка — прыжок '+K(pi,'jump')+'.';};
{const _st=step;step=function(dt){_st(dt);const c=K1B.cur;if(!c||!W||W.levelId!=='1-B'||!K1S.on||W.flags.phase!==3||G.cine)return;
    try{if(K1S.st==='run')k1sRun(dt);else if(K1S.st==='pull')k1sPullTick(dt);else if(K1S.st==='mah')k1sMahTick(dt);
      else if(K1S.st==='between'&&K1S.ropes[0]){const r=K1S.ropes[0];r.w*=Math.max(0,1-dt*1.5);r.th+=r.w*dt;r.R.set(r.th,r.w);c.L.g.rotation.y=r.th;}}
    catch(e){console.error('k1s',e);K1S.on=false;}};}

// «Добивающий мах» из общих подсказок и всплывашки — в 1-Б везде «Богатырский мах» (общий текст других уровней не трогаем)
{const _ct=contextTip;contextTip=function(pi){const r=_ct(pi);return r&&W&&W.levelId==='1-B'?r.replace('Добивающий мах','Богатырский мах'):r;};
 const _ft=floatText;floatText=function(pos,text,color){return _ft(pos,W&&W.levelId==='1-B'&&text==='Добивающий мах!'?'Богатырский мах!':text,color);};}
