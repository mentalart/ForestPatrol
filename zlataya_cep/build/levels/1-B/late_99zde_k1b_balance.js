/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: БАЛАНС ПО АУДИТУ — ТРИ ТРОФЕЯ НА ВСЕХ ПУТЯХ, «ХЛОП-ХЛОП», ЕЩЁ РАЗОК, ЗВЁЗДЫ МАСТЕРСТВА ============================== */
// Аудит 1-Б, пункты В1, В2, Е1–Е4 (Ж3 — громкость тем этапов — здесь же: темы музыки в FIN.music.TR).
// В1 + Е2. Три удара по макушке на всех путях (замена в rep_30_leshy1b.py: HEADDMG 1/1/1): раньше на Лёгком этап 1 кончался одним ударом — короче урока к нему.
//     Пути отличаются окнами, а не числом ударов: мост держится 13 / 10 / 9 с (Лёгкий / Средний / Трудный), пауза «Хлоп-хлоп» после второго трофея —
//     0,6 / 0,25 / 0,25 с, обманки — только на Среднем и Трудном (как было), окно ладони 2,2 / 1,5 / 1,2 с (как было).
// В2. Третий трофей — новый ход: после второго трофея жёлтая «Хлоп», промахнувшись, тут же вскидывается снова и хлопает ещё раз — туда, где теперь герой
//     («Хлоп-хлоп!», замах короче на четверть). Вторая попытка тоже мимо — ладонь увязает, как обычно.
// Е1. Этап 2 короче и ровнее: второй круг — те же четыре двойника двумя хороводами навстречу (на Трудном — пять), колышков шесть; не пять двойников.
// Е3. «Ещё разок!»: оба героя рассыпались — через 1,5 с оба снова на ногах у входа на поляну, все лепестки на месте; этап продолжается с того же места
//     (трофеи, круги и витки сохраняются; руки и двойники на 2 с успокаиваются). Раньше — общее правило: 10 с ожидания.
// Е4. Звёзды мастерства: щит в последний миг («Одним махом!»), прыжок через смахивание, жёлудь по когтю, «Сова села», «Держу — не шелохнётся!»,
//     корни Йоши, сорока сбита, Йоша под смахиванием, настоящий найден без единой ошибки («Зоркий глаз!») — по звезде. После финального ролика — сколько звёзд
//     и «без царапины!», если ни один лепесток не потерян (подпись к «Леший-Путаник распутан!»); лучший счёт — G.flags.k1bStars.
// Ж3. Громкость тем: этап 2 (пиццикато) был на 23 дБ тише этапа 3, этап 1 — на 12 дБ. Голоса тем: 1 — ×1,5, 2 — ×2 и басовый гул, 3 — ×1,6; замер
//     tools/boss_audit (music_w1_w4, RMS): 1 / 2 / 3 / финал — в пределах ±6 дБ (до правки разброс 23 дБ).
const K1BL={stars:0,lost:0,best:0,downT:0,round:{fakes:0,snaps:0},st:{dbl:0,again:0,starTexts:{}}};K1B.bal=K1BL;
const k1blPath=()=>{try{return genPath();}catch(e){return 'mid';}};
/* ---------- В1 + Е2: мост по пути, пауза «Хлоп-хлоп» ---------- */
{const _cw=canWind;canWind=function(e,h){if(e&&e.k1&&W&&W.levelId==='1-B'&&k1blPath()==='easy'&&(W.flags.head||0)>=2&&G.time-K1N.atkAt<0.6)return false;return _cw(e,h);};}
function k1blRamps(){for(const r of K1B.cur.ramps||[]){if(r.k1bl)continue;r.k1bl=true;if(K1N.demo)continue;r.t=({easy:13,mid:10,hard:9})[k1blPath()]||10;}}
/* ---------- В2: «Хлоп-хлоп» ---------- */
K1N.stuckRaw=k1nStuck;
k1nStuck=function(e){if(e&&e.k1&&(e.sig||e.signals[0])==='yellow'&&!K1N.demo&&(W.flags.head||0)>=2&&W.flags.phase===1&&!e.k1.dbl&&e.state==='recover'&&e.tgt&&e.alive){
    e.k1.dbl=true;K1BL.st.dbl++;e.dazeT=0;e.k1.stuck=false;e.state='wind';e.t=0;e.wdur0=e.wdur0||e.wdur;e.wdur=e.wdur0*0.75;e.k1.prev='recover';
    floatText(e.pos.clone().add(new V3(0,(e.L.top||1.2)*e.s+1.0,0)),'Хлоп-хлоп!','#ffe36b');K1B.emo(K1B.cur.L,'mock',1.2);return;}
  if(e&&e.k1){e.k1.dbl=false;if(e.wdur0){e.wdur=e.wdur0;}}return K1N.stuckRaw(e);};
K1BL.stuck=e=>k1nStuck(e);   // для ботов: «увязла» с «Хлоп-хлоп»
/* ---------- Е3: «Ещё разок!» ---------- */
function k1blAgain(dt){if(G.cine||F1().won)return;const both=players[0].downed&&(G.solo||players[1].downed);if(!both){K1BL.downT=0;return;}
  K1BL.downT+=dt;if(K1BL.downT<1.5)return;K1BL.downT=0;K1BL.st.again++;const C=K1B.cur.C;
  [[0,-2.5],[1,2.5]].forEach(([pi,x])=>{const p=players[pi],h=active(pi);p.downed=false;p.downT=0;p.revT=0;p.petals=3;placeOnGround(h,C.x+x,C.z+10.5,0);h.iT=2.5;h.vel.set(0,0,0);});
  for(const e of W.enemies)if(e.k1&&e.alive&&e.state!=='broken'){e.state='idle';e.t=0;e.tgt=null;e.cd=2;}K1N.atkAt=G.time+1;
  for(const d of(W.doubles||[]))if(d.k2&&d.state==='walk')d.k2.nextHide=Math.max(d.k2.nextHide||0,2);
  banner('Ещё разок!','#b8e070',2.4,'этап продолжается с того же места');try{SFX.ok();}catch(e){}snapCams();}
const F1=()=>W.flags;
/* ---------- Е4: звёзды мастерства ---------- */
const K1BL_STAR={'Одним махом!':1,'Перепрыгнул!':1,'Перепрыгнула!':1,'Жёлудем по когтю!':1,'Сова села — рука замерла!':1,'Держу — не шелохнётся!':1,'Корни держат!':1,'Отбил! Блестяшки!':1,'Пронесло! Мал, да удал!':1,'Жёлудем — да в лоб!':1,'Жёлудем — с ветки!':1,'Мёртвая вода — срослась!':1,'Мёртвая вода — лента срослась!':1};
function k1blStar(p,label){K1BL.stars++;K1BL.st.starTexts[label]=(K1BL.st.starTexts[label]||0)+1;
  const q=(p||new V3()).clone().add(new V3(0,0.9,0));for(let i=0;i<5;i++)spawnSpark(q.clone().add(new V3(rand(-0.4,0.4),rand(0,0.6),rand(-0.4,0.4))),COL.gold);
  try{tone(1180,0.08,'triangle',0.05,1560);tone(1560,0.12,'triangle',0.05,2080,0.08);}catch(e){}}
{const _ft=floatText;floatText=function(p,t,c){const r=_ft.apply(this,arguments);if(W&&W.levelId==='1-B'&&K1B.cur&&!G.cine&&typeof t==='string'&&K1BL_STAR[t])k1blStar(p,t);return r;};}
{const _dh=damageHero;damageHero=function(h,src){const r=_dh.apply(this,arguments);if(r&&W&&W.levelId==='1-B'&&K1B.cur)K1BL.lost++;return r;};}
// раунд пряток без ошибок: ни удара по ложному, ни порванной струны — «Зоркий глаз!»
function k1blRound(){const H2=K1B.hide2;if(!H2)return;const F=W.flags,r=F.round||0;
  if(K1BL.lastRound!==r){if(K1BL.lastRound!=null&&r>K1BL.lastRound&&H2.st.fakeHits===K1BL.round.fakes&&H2.st.snaps===K1BL.round.snaps){const L=K1B.cur.L;floatText(new V3(K1B.cur.C.x,4,K1B.cur.C.z),'Зоркий глаз!','#ffd76a');k1blStar(new V3(K1B.cur.C.x,3,K1B.cur.C.z),'Зоркий глаз!');}
    K1BL.lastRound=r;K1BL.round.fakes=H2.st.fakeHits;K1BL.round.snaps=H2.st.snaps;}}
function k1blWin(){if(K1BL.shown)return;K1BL.shown=true;const n=K1BL.stars;G.flags.k1bStars=Math.max(G.flags.k1bStars||0,n);K1BL.best=G.flags.k1bStars;}
// подпись к итогу боя (late_99zdg_k1b_finale.js — после финального ролика)
K1BL.winSub=()=>'мастерство: ★ '+K1BL.stars+(K1BL.lost===0?' · без царапины!':' · лучший счёт ★ '+K1BL.best);
/* ---------- Ж3: громкость тем этапов ---------- */
function k1blMusic(){const TR=FIN.music&&FIN.music.TR;if(!TR||!TR.k1b1||TR.k1b1.k1bl)return;
  const boost=(t,k)=>{t.v=t.v.map(v=>Object.assign({},v,{vol:v.vol*k}));t.k1bl=true;};
  boost(TR.k1b1,1.5);boost(TR.k1b2,2);if(TR.k1b3)boost(TR.k1b3,1.6);if(TR.k1b3b)boost(TR.k1b3b,1.6);TR.k1b2.v=TR.k1b2.v.concat([{i:'drone',drone:[0],oct:-12,vol:0.05}]);}
{const _m=K1B.music;K1B.music=function(n){try{k1nMusInit();}catch(e){}k1blMusic();return _m.apply(this,arguments);};}
function k1nMusInit(){if(typeof k1cMus==='function')k1cMus();}
/* ---------- подключение ---------- */
{const _in=K1B.init;K1B.init=function(ctx){_in(ctx);K1BL.stars=0;K1BL.lost=0;K1BL.downT=0;K1BL.shown=false;K1BL.lastRound=null;K1BL.st={dbl:0,again:0,starTexts:{}};};}
{const _st=step;step=function(dt){_st(dt);if(!K1B.cur||!W||W.levelId!=='1-B')return;try{k1blRamps();k1blAgain(dt);if(W.flags.phase===2)k1blRound();if(W.flags.won)k1blWin();}catch(e){console.error('k1bl',e);}};}
