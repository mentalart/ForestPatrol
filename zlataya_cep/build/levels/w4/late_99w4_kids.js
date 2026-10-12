/* ============================== МИР 4 · ДЕТСКИЕ ТАЙМЕРЫ ГОЛОВОЛОМОК ============================== */
// Детские настройки мира 4 (late_75_kids_w1.js) мягчат бой и подсказки; здесь — то, что раньше было одинаково на всех путях:
// сколько держит корка, сколько ждёт плита запруды, сколько остывшие латы болвана, как быстро остывает горячее и сколько горит печник.
// Путь — «щедрый» (genPath): хоть один идёт Ёжиком — Лёгкий. Значения: Лёгкий (Ёжик) / Средний (Лисёнок) / Богатырский (как было).
const W4K={T:{crust:[11,10,8],dam:[9,8,6],armor:[14,12,10],cool:[30,25,20],pechnik:[8,6.5,5]},
  t(kind){const v=W4K.T[kind],p=genPath();return v[p==='easy'?0:p==='mid'?1:2];}};
// корка из живой воды
{const _ca=crustAt;crustAt=function(x,z,y,ang,o){if(W.world===4&&!(o&&o.t))o=Object.assign({},o,{t:W4K.t('crust')});return _ca(x,z,y,ang,o);};}
// латы болвана: полил — остыли надолго
{const _bf=bolvanFoe;bolvanFoe=function(x,z,o){const e=_bf(x,z,o);if(W.world!==4)return e;const wt=W.waterTargets.find(w=>w.pos===e.pos&&w.onWater);
  if(wt){const _ow=wt.onWater;wt.onWater=function(){const r=_ow.apply(this,arguments);if(e.armor==='cool')e.coolT=W4K.t('armor');return r;};}return e;};}
// печник: сколько горит, когда накормили
{const _pf=pechnikFoe;pechnikFoe=function(x,z,o){if(W.world===4&&!(o&&o.window))o=Object.assign({},o,{window:W4K.t('pechnik')});return _pf(x,z,o);};}
// горячее остывает дольше: прототип снимает dt/20 за кадр — заменяем на dt/T
{const _uh=updateHots;updateHots=function(dt){if(W.world!==4||!W.hots.length)return _uh(dt);const T=W4K.t('cool');if(T===20)return _uh(dt);
  const pre=W.hots.map(it=>it.heat);_uh(dt);const q=dt/20;
  W.hots.forEach((it,i)=>{const b=pre[i],d=b-it.heat;if(it.gone||d<=0||d>q+1e-6)return;if(d<q-1e-6&&it.heat>0)return;it.heat=Math.max(0,b-dt/T);heatVis(it);});};}
