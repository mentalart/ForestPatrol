/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЛЕСТНИЦА ПОДСКАЗОК (щит, кувырок) ============================== */
// Образец подключения FIN.help (late_79d_help.js): жёлтая «Хлоп» — щит (guard), красная «Сгреб» — кувырок (roll). Удар руки в героя — промах приёма;
// щит или кувырок в последний миг — успех; пока рука с таким знаком жива и ждёт — идёт таймер «без успеха». Стрелка — на руку.
const K1H=FIN.help;
K1H.reg('guard',{act:'guard',word:'Щит',tail:'в последний миг',target:pi=>k1hHand('yellow',pi)});
K1H.reg('roll',{act:'roll',word:'Красный — кувырок',tail:'раньше удара',target:pi=>k1hHand('red',pi)});
const k1hKey=e=>e&&e.k1&&e.kind==='hand'?(e.sig==='yellow'?'guard':e.sig==='red'?'roll':null):null;
function k1hHand(sig,pi){const e=W.enemies.find(x=>x.kind==='hand'&&x.alive&&(x.signals||[]).includes(sig)&&(!x.tgt||x.tgt.player===pi))||W.enemies.find(x=>x.kind==='hand'&&x.alive&&(x.signals||[]).includes(sig));
  return e?new V3(e.pos.x,e.pos.y+(e.L&&e.L.top?e.L.top*e.s:2)+0.6,e.pos.z):null;}
// удар попал — промах приёма
{const _hh=hitHero;hitHero=function(e,h,t){const key=k1hKey(e),r=_hh(e,h,t);if(key&&W.levelId==='1-B'&&h)K1H.miss(h.player,key);return r;};}   // после удара: его подсказка уже показана, карточка лестницы идёт поверх
// удар отбит щитом / кувырком — успех (проверяем состояние героя до удара: кувырок и щит снимаются вместе с ним)
{const _fs=foeStrike;foeStrike=function(e){const key=W.levelId==='1-B'?k1hKey(e):null,h=e.tgt;
  const ok=key&&h&&(key==='roll'?(h.rollT>0||G.time-(h.lastRoll||-9)<0.45):!!h.guard);
  _fs(e);if(ok)K1H.ok(h.player,key);};}
// таймер «без успеха»: пока в бою есть живая рука с этим знаком
{const _ui=updateUI;updateUI=function(dt){_ui(dt);if(W&&W.levelId==='1-B'&&G.state==='play'&&!G.cine)for(const e of W.enemies)if(e.alive&&e.kind==='hand'){const key=k1hKey2(e);
  if(key)for(const pi of e.tgt?[e.tgt.player]:[0,1])if(!players[pi].downed&&(!G.solo||pi===G.soloPi))K1H.want(pi,key);}};}
const k1hKey2=e=>(e.signals||[]).includes('red')?'roll':(e.signals||[]).includes('yellow')?'guard':null;
