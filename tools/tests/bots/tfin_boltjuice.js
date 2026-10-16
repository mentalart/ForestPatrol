//@@
// релиз: «сочный выстрел» морока-стрелка (late_91i_bolt_juice) — 8 шагов «make a magic attack» на синей капле.
// Морок-стрелок (безвредный, только синий сигнал) в 5,8 м от героя: капля в героя, в щит, отбив — у каждого исхода свой отклик;
// заряд, шлейф, вспышки, реакция, тление и «−1» считаются; после всех исходов в W.group не копятся меши; BFX.on=false — счётчики стоят.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(90);ZC.setSolo(true);
window.BF=ZC.FIN.boltFx;window.P0=ZC.players[0];window.hero=()=>P0.heroes[P0.act];
window.H0=hero().pos.clone();
window.spawn=()=>{const h=hero(),e=ZC.FIN.dbgFoe('thread',H0.x+5.8,H0.z,{y:H0.y,harmless:true,signals:['blue'],pi:0});e.noMove=true;e.cd=0.8;return e;};
window.E=spawn();
// один выстрел: how = 'hit' | 'shield' | 'parry'; ждём заряд, полёт и исход
window.home=()=>{for(let i=0;i<400&&ZC.W.bolts.length;i++)ZC.tick(1);const h=hero();h.pos.copy(H0);h.vel.set(0,0,0);h.face=Math.PI/2;};   // warpTo ставит героя в 1,2 м вбок — стрелку (6,5 м) уже не достать
window.shot=how=>{home();const r={how,bad:[]},s0=Object.assign({},BF.stats);let ch=BF.ch.size?1:0,fly=0,gh=0;ZC.hold('KeyG',false);
  for(let i=0;i<600&&!ZC.W.bolts.length;i++){ZC.tick(1);if(BF.ch.size)ch=1;}
  if(!ZC.W.bolts.length)return how+' BAD[нет выстрела; морок '+E.state+']';
  if(how==='shield')ZC.hold('KeyG',true);
  for(let i=0;i<400&&ZC.W.bolts.length;i++){const b=ZC.W.bolts[0],D=BF.known.get(b);if(D){fly=1;gh=Math.max(gh,D.gh.length);}
    if(how==='parry'&&!b.refl&&b.left===null&&b.eta<=0.15)ZC.press('KeyG');ZC.tick(1);}
  ZC.hold('KeyG',false);ZC.tick(90);
  const d=k=>BF.stats[k]-s0[k];r.st={charges:d('charges'),shots:d('shots'),bursts:d('bursts'),sounds:d('sounds'),heroHits:d('heroHits'),shields:d('shields'),parries:d('parries'),foeHits:d('foeHits'),reacts:d('reacts'),afters:d('afters'),nums:d('nums')};
  if(!ch)r.bad.push('нет заряда');if(!fly)r.bad.push('капля без ядра/следа');if(!gh)r.bad.push('нет шлейфа');
  const want={hit:'heroHits',shield:'shields',parry:'parries'}[how];if(r.st[want]!==1)r.bad.push(want+'='+r.st[want]);
  if(how==='parry'&&(r.st.foeHits!==1||!r.st.reacts||!r.st.nums||!r.st.afters))r.bad.push('отбив без отклика морока');
  if(!r.st.bursts)r.bad.push('нет вспышки');
  return how+' '+JSON.stringify(r.st)+(r.bad.length?' BAD['+r.bad.join('; ')+']':'');};
window.OUT=[];'ok '+E.kind
//@@
OUT.push(shot('hit'));OUT.push(shot('shield'));OUT.push(shot('parry'));OUT
//@@ shot=boltjuice_fly.png wait=200
for(let i=0;i<600&&!(ZC.W.bolts.length&&ZC.W.bolts[0].t>0.3);i++)ZC.tick(1);'bolts='+ZC.W.bolts.length+' gh='+(ZC.W.bolts[0]&&BF.known.get(ZC.W.bolts[0])?BF.known.get(ZC.W.bolts[0]).gh.length:0)
//@@
// хвосты: после всех исходов эффекты убраны, мешей в W.group не прибавилось
for(let i=0;i<400&&ZC.W.bolts.length;i++)ZC.tick(1);ZC.tick(120);
window.cnt=()=>{let n=0;ZC.W.group.traverse(()=>n++);return n;};window.N0=cnt();
OUT.push(shot('hit'));OUT.push(shot('parry'));ZC.tick(120);
const left=BF.pt.length+BF.fl.length+BF.dy.length+BF.af.length+BF.known.size+BF.ch.size,grow=cnt()-N0;
OUT.push('left='+left+' grow='+grow+(left||grow>40?' BAD':''));OUT
//@@
// BFX.on=false — прежнее поведение: счётчики стоят, капля как раньше; ошибок нет
BF.on=false;const s0=JSON.stringify(BF.stats);const r=shot('hit');const fired=!/нет выстрела/.test(r);const same=JSON.stringify(BF.stats)===s0;BF.on=true;
[r.replace(/ BAD\[.*\]/,''),'off fired='+fired+' same='+same+(same&&fired?'':' BAD'),'bad='+OUT.filter(s=>/BAD/.test(s)).length,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')]
//@@
