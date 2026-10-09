/* ============================== РЕЛИЗ · МИР 1 ДЛЯ ДЕТЕЙ 7–11 · ПРАВКИ УРОВНЕЙ ============================== */
// Полные детские настройки — на пролог и мир 1 (W.kids выставляет loadLevel); в мирах 2–3 они плавно сходят (ступени KIDS_W, W.kidsK 0,8 / 0,6); Лукоморье и миры 4–5 — ступень боссов (замах 0,9, красный ×1,5, кувырок 0,8, подсказки ×1,5; Средний — вдвое слабее).
// Остальные правки мира 1 — в самих уровнях: 1-1 (калитка остаётся открытой после секунды на двух лапках) и 1-3 (окно ритма шире, тон подсказок).
//  1) Мягче Лёгкий путь (у Среднего — только дольше Пробой): замах до удара 0,9 с (было 0,7), окно отбива 0,40 (было 0,35), Пробой 9 с (был 6).
//  2) Красный сигнал — только кувырок — идёт дольше: замах ×1,5 на Лёгком и ×1,2 на Среднем; кувырок за 0,8 с до удара засчитывается (на Богатырском — прежние 0,45).
//  3) Подсказки и баннеры живут в 2,5 раза дольше (W.tipMul): медленно читающий ребёнок успевает.
//  4) «Помощь по задаче» приходит быстрее: время без успеха считается вдвое (Лёгкий) или в полтора раза (Средний) — ореол цели не через 20 с, а через 10 / 13,
//     призрачный показ не через 40, а через 20 / 27.
//  5) Упавший игрок получает подсказку и надпись «Отдыхаю…»: ему сказано, что друг идёт, а не просто «выключили».
//  6) Над активным героем — стрелка цвета игрока, кольцо крупнее: видно, кем ты водишь.
//  7) Миры 2–3 — тот же набор, но слабее (KIDS_W): замах 0,82 / 0,76, отбив 0,38 / 0,37, Пробой 8 / 7 с, красный ×1,35 / ×1,2, подсказки ×2,2 / ×1,8, ореол и призрак быстрее на 80 % / 60 %.
//  8) На Лёгком пути первые 6 (было 3) встреч с каждым знаком идут в замедлении и с кнопкой рядом; в прологе щит на Лёгком пути не тратит «дух».
const K1=FIN.kids;
const TIM0=JSON.parse(JSON.stringify(TIMING));
// Ступени: мир 1 и пролог — полные детские настройки (k=1); миры 2–3 сходят плавно (по плейтесту: «те же дети — те же встречи», в мире 2 попаданий на 15–25 % больше);
// миры 4–5 — ступень боссов (замах 0,9, красный ×1,5, кувырок 0,8, подсказки ×1,5; Средний — вдвое слабее). W.kids (чтение, стрелка, «Отдыхаю») остаётся только на пролог и мир 1; W.kidsK (0…1) и W.kidsSt — ступень настроек.
const KIDS_W={
  1:{k:1,  easy:{lead:0.9,parry:0.4,broken:9},mid:{broken:5},   red:{easy:1.5,mid:1.2},roll:0.8, tip:2.5},
  2:{k:0.8,easy:{lead:0.82,parry:0.38,broken:8},mid:{broken:4.6},red:{easy:1.35,mid:1.12},roll:0.73,tip:2.2},
  3:{k:0.6,easy:{lead:0.76,parry:0.37,broken:7},mid:{broken:4.3},red:{easy:1.2,mid:1.06},roll:0.66,tip:1.8},
  4:{k:0.4,easy:{lead:0.9,parry:0.37,broken:7},mid:{lead:0.64,broken:4.3},red:{easy:1.5,mid:1.2},roll:0.8,tip:1.5},   // миры 4–5: норма docs/33 п. 6; у головы (big) замах ×1,25 → Лёгкий 1,125 / красная 1,69, Средний 0,8
  5:{k:0.4,easy:{lead:0.9,parry:0.37,broken:7},mid:{lead:0.64,broken:4.3},red:{easy:1.5,mid:1.2},roll:0.8,tip:1.5}},HINTK={easy:2,mid:1.5,hard:1};
K1.stage=i=>{const L=LEVELS[i];if(!L)return null;return K1.levels.includes(L.id)?KIDS_W[1]:KIDS_W[L.world]||null;};
const kst=()=>(W&&W.kidsSt)||null;
{const _ll=loadLevel;loadLevel=function(i){_ll(i);const on=K1.isKidsLevel(i),st=K1.stage(i);W.kids=on;W.kidsSt=st;W.kidsK=st?st.k:0;
  for(const k of['easy','mid','hard'])Object.assign(TIMING[k],TIM0[k]);
  if(st){Object.assign(TIMING.easy,st.easy);Object.assign(TIMING.mid,st.mid);W.tipMul=Math.max(W.tipMul||1,st.tip);}
  if(W.levelId==='p')TIMING.easy.cost=0;};}   // в учебном прологе щит на Лёгком пути не устаёт: ребёнок учится держать, а не беречь «дух»
// красный сигнал: дольше замах; первые 6 (было 3) встреч с каждым сигналом на Лёгком пути — замедление и кнопка рядом
{const _fw=foeWind;foeWind=function(e){_fw(e);const h=e.tgt,st=kst();if(!st||!h)return;const p=players[h.player];
  if(e.sig==='red'){if(p.path==='easy')e.wdur*=st.red.easy;else if(p.path==='mid')e.wdur*=st.red.mid;}
  const n=(p.enc[e.sig]||1)-1;if(p.path==='easy'&&n>=3&&n<6){e.slow=0.5;e.help=true;}};}
// красный сигнал: кувырок за 0,8 с (в мирах 2–3 — 0,73 / 0,66; в прототипе — 0,45 с) до удара засчитывается
{const _fs=foeStrike;foeStrike=function(e){const h=e.tgt,st=kst();
  if(st&&h&&e.sig==='red'&&players[h.player].path!=='hard'&&!(h.rollT>0)&&G.time-(h.lastRoll||-9)<st.roll){const r=h.rollT;h.rollT=1;try{_fs(e);}finally{h.rollT=r;}return;}
  _fs(e);};}
// упавший игрок: что с ним и что дальше
{const _dh=damageHero;damageHero=function(h,src){const p=players[h.player],was=p.downed,r=_dh(h,src);
  if(!was&&p.downed)K1.lv().downs++;
  if(W.kids&&!was&&p.downed){tip(h.player,'Отдыхаешь — не страшно! Друг подойдёт на помощь.',3);floatText(h.pos.clone().add(new V3(0,h.d.height+0.9,0)),'Отдыхаю…','#ffd0e0');}
  return r;};}
// стрелка над активным героем + быстрее подсказки
const KARR=new Map();
function kidsArrow(h){let a=KARR.get(h);if(!a){a=new THREE.Mesh(new THREE.ConeGeometry(0.17,0.38,4),MB(PCOL[h.player]));a.rotation.x=Math.PI;a.castShadow=false;a.visible=false;a.userData.kidsArrow=true;KARR.set(h,a);}
  if(a.parent!==h.g)h.g.add(a);return a;}
{const _st=step;step=function(dt){_st(dt);
  for(const h of HEROES){const a=kidsArrow(h),on=!!(W&&W.kids&&ctrl(h)&&!h.cling&&!G.cine&&G.state==='play');
    a.visible=on;if(on){a.position.y=heroHeight(h)+1.0+Math.sin(G.time*4)*0.08;a.rotation.y+=dt*2;}h.marker.scale.setScalar(on?1.4:1);}
  if(!W||!W.kidsK||G.cine||G.trans||G.state!=='play'||!W.objectives)return;
  for(const pi of[0,1]){const p=players[pi],k=1+((HINTK[p.path]||1)-1)*(W.kidsK||0);if(k>1&&W.objectives[pi]&&W.objectives[pi][p.obj])p.idle+=dt*(k-1);}};}
// для ботов
K1.timing=()=>JSON.parse(JSON.stringify(TIMING));K1.dbgHurt=h=>{h.iT=0;return damageHero(h,{kind:'hazard',ref:null});};
