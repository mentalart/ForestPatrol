//@@
// релиз: смерть морока — вдох, нарезка на осколки, эффекты по семействам (нить/вода/лес/огонь/свет), большой враг (late_91e_foe_death.js).
// Проверки по каждому виду из FOE: после unravel осколки появляются (или запасной путь), тело до хлопка не «расплющено», через ~2 с осколков и
// колец нет, враг убран из W.enemies (виды с костями — Соловей, Двойник — идут запасным путём без осколков), ошибок в консоли нет;
// отдельный шаг — настоящая схватка (U.brawl): добивающий мах доходит до смерти с осколками. Кадры: клубок (нить), болван (огонь), пень (большой).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(90);
window.DX=ZC.FIN.deathFx;window.P0=ZC.players[0];window.hero=()=>P0.heroes[P0.act];
window.spawn=k=>{const h=hero(),e=ZC.FIN.dbgFoe(k,h.pos.x+1.2,h.pos.z-4,{y:h.pos.y});ZC.tick(60);return e;};
window.die=k=>{const e=spawn(k),sh0=DX.stats.shards,r={k,bad:[]};e.harmless=true;ZC.FIN.dbgUnravel(e);const D=e._dth;
  if(!D){r.bad.push('нет _dth');return r;}r.fam=D.fam||'-';r.big=D.big;
  let sy0=9,sy1=0;for(let i=0;i<30;i++){ZC.tick(1);if(!D.popped){sy0=Math.min(sy0,e.body.scale.y);sy1=Math.max(sy1,e.body.scale.y);}}
  r.shards=DX.stats.shards-sh0;if(!D.popped)r.bad.push('не хлопнул');if(sy0<0.9||sy1>1.35)r.bad.push('тело '+sy0.toFixed(2)+'..'+sy1.toFixed(2));
  const skin=['solovei','dvoynik'].includes(k);if(r.shards===0&&!skin)r.bad.push('осколков нет');if(r.shards>0&&skin)r.bad.push('кости, а рассыпался');
  ZC.tick(150);if(DX.sh.length||DX.loops.length)r.bad.push('остались '+DX.sh.length+'+'+DX.loops.length);if(ZC.W.enemies.includes(e))r.bad.push('враг не убран');
  return r.k+':'+r.fam+(r.big?'/big':'')+' sh='+r.shards+(r.bad.length?' BAD['+r.bad.join('; ')+']':'');};
window.KINDS=ZC.FIN.dbgFoeKinds().filter(k=>k!=='cep');
window.OUT=[];KINDS.length
//@@
for(const k of KINDS.slice(0,15))OUT.push(die(k));OUT
//@@
for(const k of KINDS.slice(15))OUT.push(die(k));OUT.concat(['pops='+DX.stats.pops+' deaths='+DX.stats.deaths+' shards='+DX.stats.shards+' maxMs='+DX.stats.maxMs.toFixed(1),'bad='+OUT.filter(s=>/BAD/.test(s)).length,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')])
//@@ shot=death_thread.png wait=200
window.E1=spawn('morok');ZC.FIN.dbgUnravel(E1);ZC.tick(12);'sh='+DX.sh.length+' loops='+DX.loops.length
//@@ shot=death_fire.png wait=200
ZC.tick(80);window.E2=spawn('bolvan');ZC.FIN.dbgUnravel(E2);ZC.tick(13);'sh='+DX.sh.length
//@@ shot=death_big.png wait=200
ZC.tick(80);window.E3=spawn('stump');ZC.FIN.dbgUnravel(E3);ZC.tick(24);'sh='+DX.sh.length+' errs='+window._errs.length
//@@
ZC.tick(80);window.E4=spawn('morok');E4.harmless=false;const d0=DX.stats.deaths,s0=DX.stats.shards;U.brawl(25);ZC.tick(120);
['alive='+E4.alive,'deaths+='+(DX.stats.deaths-d0),'shards+='+(DX.stats.shards-s0),'left='+(DX.sh.length+DX.loops.length),'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')]
