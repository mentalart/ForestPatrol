/* ============================== МИР 4 · НЕВИДИМЫЕ ПРАВИЛА — ВСЛУХ (docs/39, УР.3) ============================== */
// 1) Что даёт весточка из Сказа 3 — одной подсказкой в начале уровня (мелкая строка «весточка · …» в углу есть всегда, её не замечают).
// 2) Над лавой Пелагея планирует втрое хуже (горячий воздух, 04_physics_actions.js), если весточка — не перо Жар-птицы: в первый раз — «Жар крылья не держит!».
{const VTXT={zhar:'Перо Жар-птицы греет крылья — над лавой Пелагея парит, как над травой.',sirin:'Сирин и Алконост поют в такт — окно удара в ковке и в «ух-нем» шире.',
  yaga3:'Ступа Яги рядом: раз за уровень упавший встанет на месте.'};
const R={w:null,calm:0,told:false,heat:false};FIN.w4rules=R;
{const _st=step;step=function(dt){_st(dt);if(!W||W.world!==4||W.levelId==='4-B'||G.state!=='play')return;
  if(W!==R.w){R.w=W;R.calm=0;R.told=false;R.heat=false;}
  R.calm=G.cine||G.trans?0:R.calm+dt;
  if(!R.told&&R.calm>2.5&&!(FIN.lesson&&FIN.lesson.on)){R.told=true;const t=VTXT[W.vest];if(t)for(const pi of[0,1])tip(pi,'<b>Весточка.</b> '+t,4.5);}
  const pe=HERO.pelageya;
  if(!R.heat&&!G.cine&&pe&&pe.glide&&!W.noHeatSink&&W.lavas.length&&overLava(pe)&&pe.vel.y<-3){R.heat=true;
    floatText(pe.pos.clone().add(new V3(0,pe.d.height+0.7,0)),'Жар крылья не держит!','#ffb070');for(let i=0;i<3;i++)later(i*0.15,()=>burst(pe.pos.clone().add(new V3(0,pe.d.height*0.8,0)),0x8a8a90,4,1.5));
    if(pe.active)tip(pe.player,'Над лавой горячий воздух — Пелагея снижается быстро. Перелетай коротко.',3.6);}};}}
