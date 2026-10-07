/* ============================== РЕЛИЗ · ДЕТИ 7–11 · БОЙ: СИНЯЯ КАПЛЯ, «ЖАЛОСТЬ», КРАСНЫЙ ЗНАК ============================== */
// По симулированному плейтесту (docs/31, этап 2): «две щуки-стрелка» — выигрыш за минуту 4 % (7–8 лет) и 20 % (9–10) даже с детскими настройками; ребёнок держит щит
// в ~80 % замахов, отбить пытается в 19 %, кувырок на красный — в 6 %, а без отбива, кувырка или Пробоя морок не открывается. Всё — только там, где идут детские
// ступени (kst(): пролог, мир 1 — полностью, миры 2–3 — слабее; W.kidsK), и только на Лёгком и Среднем пути; Богатырский путь как в прототипе.
//  1) Синяя капля летит медленнее (6,5 → 5,5 на Лёгком; на Среднем — вдвое меньше поправка), окно отбива капли шире (+0,05 → +0,12 с).
//  2) У игрока на Лёгком пути не больше двух стрелков (в замахе и капель в полёте) одновременно.
//  3) «Жалость» на Лёгком пути: щит три раза подряд без отбива — морок выдыхается и открывается (как после отбива).
//  4) Красный знак: пока у игрока не удался первый кувырок, подсказка «кувырок» повторяется на каждом красном замахе (раз в 6 с), замах идёт в замедлении, кнопка рядом.
const KFX=FIN.kidsFight={pity:3,boltV:5.5,parryPlus:0.07,redTipGap:6};
const kidPath=pi=>{const p=players[pi];return p&&p.path!=='hard'&&kst()?p.path:null;};
// 1) капля медленнее
{const _sb=spawnBolt;spawnBolt=function(e,h){_sb(e,h);const pa=kidPath(h.player),b=W.bolts[W.bolts.length-1];
  if(pa&&b&&b.from===e&&!b.refl)b.v=6.5-(6.5-KFX.boltV)*W.kidsK*(pa==='easy'?1:0.5);};}
// 1) окно отбива капли: во время updateBolts отбив у Лёгкого и Среднего пути шире на parryPlus·k (сам расчёт — внутри прототипа: left <= parry + 0,05)
{const _ub=updateBolts;updateBolts=function(dt){const st=kst();if(!st||!W.bolts.length){_ub(dt);return;}
  const add=KFX.parryPlus*W.kidsK,sv={easy:TIMING.easy.parry,mid:TIMING.mid.parry};TIMING.easy.parry+=add;TIMING.mid.parry+=add*0.5;
  try{_ub(dt);}finally{TIMING.easy.parry=sv.easy;TIMING.mid.parry=sv.mid;}};}
// 2) не больше двух стрелков на игрока (Лёгкий путь): считаем и тех, кто в замахе, и капли в полёте
{const _cw=canWind;canWind=function(e,h){if(!_cw(e,h))return false;
  if(e.def&&e.def.ranged&&kidPath(h.player)==='easy'){let n=W.bolts.filter(b=>!b.refl&&b.tgt===h).length;
    for(const o of W.enemies)if(o!==e&&o.alive&&o.def&&o.def.ranged&&(o.state==='wind'||o.state==='ready')&&o.tgt&&o.tgt.player===h.player)n++;
    if(n>=2)return false;}
  return true;};}
// 3) «жалость»: три щита подряд без отбива, кувырка и удара по тебе — морок выдыхается
{const _fs=foeStrike;foeStrike=function(e){const h=e.tgt,p=h&&players[h.player],s0=G.stats.shields;_fs(e);
  if(!p||kidPath(h.player)!=='easy'||(e.def&&e.def.ranged)||e.sig==='blue')return;
  if(G.stats.shields>s0){p.blockRun=(p.blockRun||0)+1;
    if(p.blockRun>=KFX.pity&&e.alive&&e.state!=='stagger'&&e.state!=='broken'&&e.state!=='dying'){p.blockRun=0;e.state='stagger';e.t=0;e.openHit=false;e.left=null;
      spawnSpark(e.pos.clone().add(new V3(0,1.2,0)),0x6ad0ff);floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+0.6,0)),'Выдохся! Бей!','#ffe36b');
      if(!p.pityTold){p.pityTold=true;tip(h.player,'Морок выдохся от твоего щита — бей его '+K(h.player,'attack')+'!',3);}}}
  else p.blockRun=0;};}
// 4) красный знак: подсказка «кувырок» не гаснет, пока не удался первый кувырок
{const _fd=foeDodge;foeDodge=function(e,h){_fd(e,h);players[h.player].rollOk=true;};}
{const _fw=foeWind;foeWind=function(e){_fw(e);const h=e.tgt;if(!h||e.sig!=='red')return;const pa=kidPath(h.player),p=players[h.player];
  if(pa&&!p.rollOk){e.help=true;if(pa==='easy')e.slow=0.5;
    if(G.time-(p.redTipAt||-99)>KFX.redTipGap){p.redTipAt=G.time;tip(h.player,'<i class="sg r"></i> Красный зубец — кувырок '+K(h.player,'roll')+'!',2.4);}}};}
