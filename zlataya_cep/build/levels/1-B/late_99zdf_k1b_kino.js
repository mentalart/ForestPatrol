/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: РОЛИКИ ПО АУДИТУ — БЕЗ ДВОЙНЫХ СЦЕН, ХОРОВОД — ИГРОЙ, ЛЕШИЙ ПОКАЗЫВАЕТ ДОРОГУ ============================== */
// Аудит 1-Б, пункты А9, Б1, Б3, Б4 (Б2 — ролик-урок этапа 2 переставлен под новые правила в late_99zce_k1b_tut2.js).
// Б1. Вход и урок 1 идут одной сценой: во входе нет закадровой строки «Леший ростом с ель…» (её показывает сам кадр), урок начинается сразу с показа
//     красной руки — без второго подряд крупного плана говорящего Лешего и без строки «Ну-ка, поглядим…» (Леший только что сказал «Опять заблудились?»).
//     Было 14 + 24,8 с с двумя одинаковыми началами, стало 14 + 21,7 с одной сценой.
// Б3. Урок «Хоровода» (35,8 с показа без голоса) больше не включается сам — хоровод сразу играется: первый виток каждого героя учебный (скакалка
//     не отнимает лепесток — «Прыгай!»), Сказительница подсказывает голосом в нужный миг: начало, первая скакалка, первое «Тяни-потяни»,
//     первый раз «закружился». Урок остаётся в паузе: «Показать урок ещё раз».
// Б4. Финал — отдельный модуль late_99zdg_k1b_finale.js.
const K1K={hint:{},st:{trainHits:0,hints:0}};K1B.kino=K1K;
/* ---------- Б1: вход без лишней строки, урок без повтора начала ---------- */
{const _in=K1B.cine.intro;K1B.cine.intro=function(d){d=_in(d);d.says=(d.says||[]).filter(q=>!/ростом с ель/.test(String(q[3])));return d;};}
const K1K_SKIP=3.0;
{const _pl=play;play=function(def){
  if(W&&W.levelId==='1-B'&&def&&def.kino&&def.dur===24.8&&K1B.tut&&K1B.tut.on&&!def.k1k){def.k1k=true;
    def.says=def.says.filter(q=>q[0]>=K1K_SKIP);def.cues=(def.cues||[]).filter(c=>c[0]>=K1K_SKIP);
    const sh=def.shots.filter(s=>s.t>=K1K_SKIP-0.05);if(sh.length){sh[0].t=K1K_SKIP;def.shots=sh;}
    const r=_pl.apply(this,arguments);if(G.cine)G.cine.t=K1K_SKIP+0.02;return r;}
  return _pl.apply(this,arguments);};}
/* ---------- Б3: хоровод сразу игрой, учебный первый виток, подсказки голосом ---------- */
K1B.les.auto=false;   // урок — только из паузы («Показать урок ещё раз»)
const K1K_H={start:'<i>Бегите вокруг Лешего — ленты его обмотают!</i>',rope:'<i>Скакалка идёт — прыгай!</i>',pull:'<i>Ленты натянулись! На «три» — бейте вместе!</i>',mah:'<i>Закружился! Бейте вдвоём!</i>'};
function k1kHint(k,dur){if(K1K.hint[k])return;K1K.hint[k]=1;K1K.st.hints++;try{say(null,K1K_H[k],dur||3);}catch(e){}}
const k1kTrain=()=>{const S=K1B.s3;return !!(S&&S.on&&S.round===1&&S.st==='run'&&Math.min(S.laps[0],G.solo?S.laps[0]:S.laps[1])<1);};
{const _dh=damageHero;damageHero=function(h,src){
  if(W&&W.levelId==='1-B'&&W.flags.phase===3&&src&&src.kind==='hazard'&&k1kTrain()){K1K.st.trainHits++;
    if(h){const dx=h.pos.x-src.ref.pos.x,dz=h.pos.z-src.ref.pos.z,dd=Math.hypot(dx,dz)||1;h.vel.x=dx/dd*3;h.vel.z=dz/dd*3;h.vel.y=3;h.grounded=false;h.knockT=0.25;
      floatText(h.pos.clone().add(new V3(0,2.2,0)),'Прыгай!','#fff3c0');}k1kHint('rope',2.6);return false;}
  return _dh.apply(this,arguments);};}
function k1kTick(){const S=K1B.s3;if(!S||!S.on||G.cine)return;const C=K1B.cur.C;
  if(S.st==='run'&&S.round===1)k1kHint('start',3.4);
  if(S.st==='run'&&!K1K.hint.rope)for(const rp of S.ropes)for(const pi of[0,1]){const h=active(pi),a=Math.atan2(h.pos.z-C.z,h.pos.x-C.x);let d=-rp.th-a;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;if(d>0&&d<0.9&&K1K.hint.start){k1kHint('rope',2.6);break;}}
  if(S.st==='pull')k1kHint('pull',3.4);if(S.st==='mah')k1kHint('mah',2.6);}
/* ---------- Б4: финал — late_99zdg_k1b_finale.js (переписан целиком) ---------- */
/* ---------- «Ку-ку!» двойников — три озвученных варианта (А6) ---------- */
const K1K_KU=['Ку-ку!','Ку-ку! Не найдёте!','Ау-у! Ищи-свищи!'];
{const _sy=say;say=function(who,text,dur,nv){if(W&&W.levelId==='1-B'&&who==='leshy'&&text==='Ку-ку!'){K1K.ku=((K1K.ku||0)+1+Math.floor(Math.random()*2))%3;text=K1K_KU[K1K.ku];dur=Math.max(dur||0,1.6);}return _sy.call(this,who,text,dur,nv);};}
/* ---------- подключение ---------- */
{const _in=K1B.init;K1B.init=function(ctx){_in(ctx);K1K.hint={};K1K.st={trainHits:0,hints:0};};}
{const _st=step;step=function(dt){_st(dt);if(!K1B.cur||!W||W.levelId!=='1-B'||W.flags.phase!==3)return;try{k1kTick();}catch(e){console.error('k1k',e);}};}
