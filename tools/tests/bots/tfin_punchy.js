//@@
// релиз: «сочный удар» (late_91h_punch + хлопок в late_91e_foe_death) — шаги из ролика «make hits punchy», принятые по стенду «до/после».
// По каждому виду из FOE: открытый удар (морок «оглушён») — белый силуэт сразу после удара и материалы на месте через полсекунды, искры-штрихи,
// hit-stop ≥ 70 мс, морок на земле отъехал от героя; добивание — раздувание шариком (масштаб > 1,25), хлопок, ни один осколок не белый.
// Затем: «Вспышки 0 %» — без белого; шаги выключены (PUNCH.on=false) — счётчики стоят; настоящая схватка (U.brawl) — удары считаются, ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(90);
window.PN=ZC.FIN.punch;window.DX=ZC.FIN.deathFx;window.P0=ZC.players[0];window.hero=()=>P0.heroes[P0.act];
window.spawn=k=>{const h=hero(),e=ZC.FIN.dbgFoe(k,h.pos.x+1.2,h.pos.z-2.5,{y:h.pos.y});e.harmless=true;ZC.tick(60);return e;};
window.whiteLeft=()=>ZC.W.group.children.length&&(()=>{let n=0;ZC.W.group.traverse(o=>{if(o.isMesh&&o.material===PN.white)n++;});return n;})();
window.hitOne=k=>{const e=spawn(k),h=hero(),r={k,bad:[]},s0=Object.assign({},PN.stats),p0=e.pos.clone();
  e.dazeT=2;ZC.G.hitstop=0;ZC.FIN.dbgHit(e,h,false);
  r.w=e._pnW?e._pnW.length:0;r.hs=ZC.G.hitstop;r.sp=PN.stats.sparks-s0.sparks;r.kn=PN.stats.knocks-s0.knocks;
  if(PN.stats.hits===s0.hits){r.bad.push('удар не засчитан');}
  else{if(!r.w&&!e.g.getObjectByProperty('isSkinnedMesh',true))r.bad.push('нет белого');if(!r.sp)r.bad.push('нет искр');if(r.hs<0.07)r.bad.push('стоп '+r.hs.toFixed(3));}
  ZC.tick(30);r.mv=Math.hypot(e.pos.x-p0.x,e.pos.z-p0.z);if(e._pnW)r.bad.push('белый не снят');
  // добивание: бьём оглушённого, пока жив (большие без Пробоя не умирают — их хлопок проверяет tfin_foedeath)
  let n=0;while(e.alive&&n<12){e.dazeT=2;ZC.FIN.dbgHit(e,h,false);ZC.tick(4);n++;}
  if(e.alive){if(!e.big)r.bad.push('не добит');else r.k+='(большой: без Пробоя не добить)';}else{const D=e._dth;let sMax=0;
    for(let i=0;i<40;i++){ZC.tick(1);if(D&&!D.popped)sMax=Math.max(sMax,e.body.scale.x);}
    r.bal=D&&D.balloon;if(D&&D.balloon&&!e.big&&sMax<1.25)r.bad.push('не раздулся '+sMax.toFixed(2));
    if(D&&!D.popped)r.bad.push('не хлопнул');if(DX.sh.some(s=>s.m.material===PN.white))r.bad.push('белый осколок');}
  ZC.tick(150);const wl=whiteLeft();if(wl)r.bad.push('белых мешей '+wl);
  return r.k+' w='+r.w+' sp='+r.sp+' kn='+r.kn+' mv='+r.mv.toFixed(2)+' hs='+r.hs.toFixed(2)+(r.bal?' шар':'')+(r.bad.length?' BAD['+r.bad.join('; ')+']':'');};
window.KINDS=ZC.FIN.dbgFoeKinds().filter(k=>k!=='cep');window.OUT=[];KINDS.length
//@@
for(const k of KINDS.slice(0,15))OUT.push(hitOne(k));OUT
//@@
for(const k of KINDS.slice(15))OUT.push(hitOne(k));
OUT.concat(['stats='+JSON.stringify(PN.stats),'pops(death)='+DX.stats.pops,'knocked='+OUT.filter(s=>/kn=1/.test(s)).length,'bad='+OUT.filter(s=>/BAD/.test(s)).length,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')])
//@@ shot=punch_hit.png wait=200
ZC.tick(60);window.E1=spawn('morok');E1.dazeT=2;ZC.FIN.dbgHit(E1,hero(),false);ZC.tick(1);'w='+(E1._pnW?E1._pnW.length:0)+' st='+PN.st.length
//@@ shot=punch_pop.png wait=200
ZC.tick(60);let n=0;while(E1.alive&&n<12){E1.dazeT=2;ZC.FIN.dbgHit(E1,hero(),false);ZC.tick(4);n++;}ZC.tick(9);'alive='+E1.alive+' pops='+PN.stats.pops
//@@
// «Вспышки 0 %» — белого нет; PUNCH.on=false — шаги не работают
ZC.tick(150);const fk=ZC.FIN.set.flashK;ZC.FIN.set.flashK=0;const e2=spawn('morok');e2.dazeT=2;ZC.FIN.dbgHit(e2,hero(),false);const w0=e2._pnW?1:0;ZC.FIN.set.flashK=fk;
ZC.tick(30);PN.on=false;const h0=PN.stats.hits;e2.dazeT=2;ZC.FIN.dbgHit(e2,hero(),false);const off=PN.stats.hits-h0;PN.on=true;
['flash0 white='+w0,'off hits+='+off,(w0||off)?'BAD':'ok']
//@@
ZC.tick(150);window.E4=spawn('morok');E4.harmless=false;const h1=PN.stats.hits;U.brawl(25);ZC.tick(120);
['alive='+E4.alive,'hits+='+(PN.stats.hits-h1),'white='+whiteLeft(),'streaks='+PN.st.length,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')]
