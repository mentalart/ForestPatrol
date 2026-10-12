/* ============================== МИР 4 · ОДИНОЧНЫЙ РЕЖИМ ============================== */
// В одиночке второй активный герой стоит без дела, а враг бьёт ближайшего из двух. В мире 4 это ломает бой: змеёныш берёт целью
// оставленного героя, упирается в край поводка и сидит в борозде с лавой — неуязвимый, пока туда целится (tso44).
// Здесь в одиночке враг выбирает героя, которым управляешь, если видит его (до 12 м, тот же ярус); иначе — как раньше.
{const _ft=foeTarget;
foeTarget=function(e){const h=_ft(e);if(!G.solo||W.world!==4||!h||ctrl(h)||e.pi!==undefined)return h;
  const c=active(G.soloPi);if(players[G.soloPi].downed||c.cling)return h;
  return hd(c.pos,e.pos)<12&&Math.abs(c.pos.y-e.pos.y)<2.4?c:h;};}
// В 4-2 весточка не тянет оставленного через огонь (W.pullMax): в коопе каждый переводит своих. В одиночке это значит переводить
// всех четверых по каждой корке. Здесь в одиночке позванные «Все ко мне!» друзья подтягиваются и через лаву.
{const _ulb=updateLeftBehind;
updateLeftBehind=function(p,o,dt){if(!(G.solo&&W.world===4&&W.pullMax))return _ulb(p,o,dt);
  const pm=W.pullMax;W.pullMax=0;try{return _ulb(p,o,dt);}finally{W.pullMax=pm;}};}
