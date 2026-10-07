/* ============================== РЕЛИЗ · ДЕТИ 7–11 · ПРАВКИ УРОВНЕЙ (пролог и миры 1–5) ============================== */
// Действуют на пролог и уровни миров 1–5 (FIN.kids.worlds, late_74): W.kids выставляет loadLevel; Лукоморье, эпилог и Застава — как прежде.
// (Имя файла осталось от первой версии, когда правки были только у мира 1; docs/29_full_audit.md, 2.1.)
// Остальные правки мира 1 — в самих уровнях: 1-1 (калитка остаётся открытой после секунды на двух лапках) и 1-3 (окно ритма шире, тон подсказок).
//  1) Мягче Лёгкий путь (у Среднего — только дольше Пробой): замах до удара 0,9 с (было 0,7), окно отбива 0,40 (было 0,35), Пробой 9 с (был 6).
//  2) Красный сигнал — только кувырок — идёт дольше: замах ×1,5 на Лёгком и ×1,2 на Среднем; кувырок за 0,8 с до удара засчитывается (на Богатырском — прежние 0,45).
//  3) Подсказки и баннеры живут в 2,5 раза дольше (W.tipMul): медленно читающий ребёнок успевает.
//  4) «Помощь по задаче» приходит быстрее: время без успеха считается вдвое (Лёгкий) или в полтора раза (Средний) — ореол цели не через 20 с, а через 10 / 13,
//     призрачный показ не через 40, а через 20 / 27.
//  5) Упавший игрок получает подсказку и надпись «Отдыхаю…»: ему сказано, что друг идёт, а не просто «выключили».
//  6) Над активным героем — стрелка цвета игрока, кольцо крупнее: видно, кем ты водишь.
const K1=FIN.kids;
const TIM0=JSON.parse(JSON.stringify(TIMING));
const KIDS_TIM={easy:{lead:0.9,parry:0.4,broken:9},mid:{broken:5}},HINTK={easy:2,mid:1.5,hard:1};
{const _ll=loadLevel;loadLevel=function(i){_ll(i);const on=K1.isKidsLevel(i);W.kids=on;
  for(const k of['easy','mid','hard'])Object.assign(TIMING[k],TIM0[k]);
  if(on){Object.assign(TIMING.easy,KIDS_TIM.easy);Object.assign(TIMING.mid,KIDS_TIM.mid);W.tipMul=Math.max(W.tipMul||1,2.5);}};}
// красный сигнал: дольше замах
{const _fw=foeWind;foeWind=function(e){_fw(e);const h=e.tgt;if(W.kids&&h&&e.sig==='red'){const pa=players[h.player].path;if(pa==='easy')e.wdur*=1.5;else if(pa==='mid')e.wdur*=1.2;}};}
// красный сигнал: кувырок за 0,8 с до удара засчитывается (в прототипе — 0,45 с)
{const _fs=foeStrike;foeStrike=function(e){const h=e.tgt;
  if(W.kids&&h&&e.sig==='red'&&players[h.player].path!=='hard'&&!(h.rollT>0)&&G.time-(h.lastRoll||-9)<0.8){const r=h.rollT;h.rollT=1;try{_fs(e);}finally{h.rollT=r;}return;}
  _fs(e);};}
// упавший игрок: что с ним и что дальше
{const _dh=damageHero;damageHero=function(h,src){const p=players[h.player],was=p.downed,r=_dh(h,src);
  if(W.kids&&!was&&p.downed){K1.lv().downs++;tip(h.player,'Ты отдыхаешь — не страшно!<br>Друг идёт на помощь, постоит рядом — и ты снова в бою.',3);floatText(h.pos.clone().add(new V3(0,h.d.height+0.9,0)),'Отдыхаю…','#ffd0e0');}
  return r;};}
// стрелка над активным героем + быстрее подсказки
const KARR=new Map();
function kidsArrow(h){let a=KARR.get(h);if(!a){a=new THREE.Mesh(new THREE.ConeGeometry(0.17,0.38,4),MB(PCOL[h.player]));a.rotation.x=Math.PI;a.castShadow=false;a.visible=false;a.userData.kidsArrow=true;KARR.set(h,a);}
  if(a.parent!==h.g)h.g.add(a);return a;}
{const _st=step;step=function(dt){_st(dt);
  for(const h of HEROES){const a=kidsArrow(h),on=!!(W&&W.kids&&ctrl(h)&&!h.cling&&!G.cine&&G.state==='play');
    a.visible=on;if(on){a.position.y=heroHeight(h)+1.0+Math.sin(G.time*4)*0.08;a.rotation.y+=dt*2;}h.marker.scale.setScalar(on?1.4:1);}
  if(!W||!W.kids||G.cine||G.trans||G.state!=='play'||!W.objectives)return;
  for(const pi of[0,1]){const p=players[pi],k=HINTK[p.path]||1;if(k>1&&W.objectives[pi]&&W.objectives[pi][p.obj])p.idle+=dt*(k-1);}};}
// для ботов
K1.timing=()=>JSON.parse(JSON.stringify(TIMING));K1.dbgHurt=h=>{h.iT=0;return damageHero(h,{kind:'hazard',ref:null});};
