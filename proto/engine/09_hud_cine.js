/* ============================== HUD / UI ============================== */
function spikes(){let s='';for(let i=0;i<18;i++){const a=i/18*Math.PI*2,r=i%2?9:15;s+=(20+Math.cos(a)*r).toFixed(1)+','+(23+Math.sin(a)*r*0.85).toFixed(1)+' ';}return s;}
const SIL={proshka:'<ellipse cx="20" cy="27" rx="7" ry="11"/><polygon points="12,15 14,2 19,13"/><polygon points="21,13 26,2 28,15"/><polygon points="16,17 20,30 24,17"/>',
 potap:'<ellipse cx="20" cy="25" rx="14" ry="13"/><circle cx="9" cy="11" r="5.5"/><circle cx="31" cy="11" r="5.5"/>',
 pelageya:'<ellipse cx="20" cy="23" rx="9" ry="12"/><polygon points="11,17 1,31 12,29"/><polygon points="29,17 39,31 28,29"/><polygon points="12,12 14,3 18,11"/><polygon points="22,11 26,3 28,12"/>',
 yosha:'<polygon points="'+spikes()+'"/>'};
const EYE='<svg viewBox="0 0 20 20" width="15" height="15"><path d="M1 10Q10 1 19 10Q10 19 1 10Z" fill="#fff6c8" stroke="#222" stroke-width="1.6"/><circle cx="10" cy="10" r="3.3" fill="#222"/></svg>';
const LOCK='<svg viewBox="0 0 20 20" width="15" height="15"><rect x="4" y="9" width="12" height="9" rx="2" fill="#222"/><path d="M7 9V6a3 3 0 0 1 6 0v3" fill="none" stroke="#222" stroke-width="2.2"/></svg>';
const sil=(k,c)=>'<svg class="sil" viewBox="0 0 40 40" fill="'+c+'">'+SIL[k]+'</svg>';
const hudEls=[];
function hudInit(){for(const pi of[0,1]){const el=$('hud'+pi);el.innerHTML='<div class="petals"><div class="petal"></div><div class="petal"></div><div class="petal"></div></div><div class="ports"></div><div class="yarn">'+KEYNAME[BIND[pi].item]+'</div><div class="blue"><i></i></div><span class="tag pathtag"></span><span class="down"></span>';
  const ports=el.querySelector('.ports');players[pi].heroes.forEach(h=>{const d=document.createElement('div');d.className='port';d.innerHTML=sil(h.kind,h.d.css)+'<span class="pn"></span>';ports.appendChild(d);});
  hudEls[pi]={el,petals:[...el.querySelectorAll('.petal')],ports:[...el.querySelectorAll('.port')],tag:el.querySelector('.pathtag'),yarn:el.querySelector('.yarn'),blue:el.querySelector('.blue'),blueI:el.querySelector('.blue i'),down:el.querySelector('.down'),cache:{}};}}
const iconEls=[];for(let i=0;i<8;i++){const d=document.createElement('div');d.className='icon';d.innerHTML='<span class="s"></span><div class="lock">'+LOCK+'</div><div class="eye">'+EYE+'</div><div class="q">?</div>';$('icons').appendChild(d);iconEls.push({el:d,s:d.querySelector('.s'),lock:d.querySelector('.lock'),eye:d.querySelector('.eye'),q:d.querySelector('.q'),k:null});}
const floats=[];
function floatText(pos,text,color){const els=[0,1].map(()=>{const d=document.createElement('div');d.className='float';d.textContent=text;d.style.color=color||'#fff';$('floats').appendChild(d);return d;});floats.push({p:pos.clone(),t:0,life:1.3,els});
  if(floats.length>24){const f=floats.shift();f.els.forEach(e=>e.remove());}}
let bannerT=0;function banner(text,color,dur,sub){const b=$('banner');b.innerHTML=text+(sub?'<small>'+sub+'</small>':'');b.style.color=color||'#fff';b.style.opacity=1;bannerT=(dur||1.5)*(W&&W.tipMul||1);}
function tip(pi,html,dur){players[pi].tipHTML=html;players[pi].tipT=(dur||2)*(W&&W.tipMul||1);}
// Субтитры (отключаемы). Голос — placeholder-бормотание
const WHO={likho:['Лихо','#c8a878'],tishka:['Тишка','#f2b36a'],proshka:['Прошка','#ff9a66'],potap:['Потап','#e0b27a'],pelageya:['Пелагея','#d7a6ec'],yosha:['Йоша','#8fe0d4'],zven:['Звенышко','#ffd76a'],kot:['Кот Учёный','#d2d8e8'],yaga:['Баба Яга','#e08a8a'],kiki:['Кикимора','#a8c090'],leshy:['Леший','#b8e070'],
  kolobok:['Колобок','#f0c050'],vek:['Векша','#f0a060'],kuzma:['Кузьма','#c8c8d0'],koschei:['Кощей','#a0ffb8'],sadko:['Садко','#f0b060'],vod:['Водяной','#7ad0a0'],starik:['Старик','#e0d8c8'],rybka:['Золотая рыбка','#ffd23a'],zhar:['Жар-птица','#ffb040'],sirin:['Сирин','#a8a0f0'],alkonost:['Алконост','#ffb070'],solovei:['Соловей-Разбойник','#d8b070'],kuzst:['Кузьма-старший','#d8c8b0'],demyan:['Демьян','#e8905a'],gorL:['Левая голова','#9ad07a'],gorM:['Средняя голова','#d8e060'],gorR:['Правая голова','#e0b060'],lebed:['Лебедь','#f4f4ff'],golova:['Голова','#e0c8a0'],belka:['Белка','#f0a060'],zerk:['Зеркальце','#cfe8ff'],pechka:['Печка','#f0e4d4'],yablonka:['Яблонька','#b8e070'],rechka:['Молочная речка','#f4f0ff'],all:['Все','#ffffff'],dedka:['Дедка','#e8d8b0']};
let subT=0,subHTML='';function say(who,text,dur,noVoice){if(who==='zven'&&W&&W.zven&&W.zvenAway)W.zven.summonT=Math.max(W.zven.summonT||0,(dur||2.5)+0.8);const w=WHO[who];const wn=w?(HERO_KINDS5.includes(who)?heroName(who):w[0]):'';subHTML=(w?'<b style="color:'+w[1]+'">'+(wn||'<span style="display:inline-block;width:54px;height:13px;border:1.5px dashed '+w[1]+';border-radius:3px;vertical-align:middle"></span>')+':</b>':'')+text;subT=dur||2.5;if(!noVoice)babble(who,text);}
function bark(h,who,text,dur,noVoice){say(who,text,dur||2,noVoice);const pos=h.pos||h.g.position,ht=(h.d&&h.d.height)||2.0;floatText(pos.clone().add(new V3(0,ht+0.8,0)),String(text).replace(/<br\s*\/?>/g,' ').replace(/<[^>]*>/g,''),WHO[who][1]);}
const tv=new V3();
function project(p,pane){tv.copy(p).applyMatrix4(pane.cam.matrixWorldInverse);const behind=tv.z>0;tv.copy(p).project(pane.cam);return {x:tv.x,y:tv.y,behind};}
function updateUI(dt){
  bannerT-=dt;if(bannerT<=0)$('banner').style.opacity=0;const cine=!!G.cine;
  for(const pi of[0,1]){const p=players[pi],E=hudEls[pi];E.petals.forEach((el,i)=>el.classList.toggle('off',i>=p.petals));
    p.heroes.forEach((h,i)=>{E.ports[i].classList.toggle('act',p.act===i);const pn=E.ports[i].querySelector('.pn'),nm=heroName(h.kind);if(pn._t!==nm){pn._t=nm;pn.textContent=nm;pn.classList.toggle('empty',!nm);}});E.el.style.opacity=cine?0:(G.solo&&pi!==G.soloPi?0.5:1);
    const pt=PATHNAME[p.path];if(E.cache.path!==pt){E.cache.path=pt;E.tag.textContent=pt;}E.tag.style.display=p.path!=='mid'?'inline':'none';E.yarn.style.display=(W.abil.clew||W.abil.gusli||W.abil.pero||W.abil.kleshi)?'block':'none';E.yarn.classList.toggle('kl',!!W.abil.kleshi);E.yarn.classList.toggle('gus',!!W.abil.gusli&&!W.abil.clew);E.yarn.classList.toggle('pero',!!W.abil.pero);E.yarn.classList.toggle('off',W.abil.kleshi?false:W.abil.pero?!active(pi).lit:W.abil.gusli&&!W.abil.clew?(p.gusCd||0)>0:(W.threads.some(t=>t.owner===pi&&!t.ret&&!t.string)||p.yarnCd>0));
    if(W.world===5){const si=(signNear(active(pi))||{}).item;E.yarn.classList.toggle('kl',si==='kleshi');E.yarn.classList.toggle('gus',si==='gusli');E.yarn.classList.toggle('pero',si==='pero');E.yarn.classList.toggle('off',!si);}
    E.blue.style.display=(W.abil.clew||W.abil.gusli||W.abil.pero||W.abil.kleshi)?'block':'none';const bl=bogatyrLeft(pi);E.blueI.style.height=Math.round((bl>0?bl:p.blue)*100)+'%';E.blue.classList.toggle('power',bl>0);E.blue.classList.toggle('end',bl>0&&bl*p.exitDur<2);E.blue.classList.toggle('full',bl<=0&&p.blue>=1);
    E.down.style.display=p.downed?'inline':'none';if(p.downed)E.down.textContent='Ждём помощи… '+Math.ceil(p.downT);
    p.tipT-=dt;let html=cine?'':(p.tipT>0?p.tipHTML:contextTip(pi));const te=$('tip'+pi);if(E.cache.tip!==html){E.cache.tip=html;te.innerHTML=html||'';te.style.display=html?'block':'none';}
    const o=W.objectives[pi][p.obj];const oh=cine||!o?'':(typeof o.text==='function'?o.text():o.text);const oe=$('obj'+pi);if(E.cache.obj!==oh){E.cache.obj=oh;oe.innerHTML=oh;oe.style.display=oh?'block':'none';}}
  // субтитры, пропуск ролика, «вышитый» кадр, киношные поля
  subT-=dt;const se=$('subs');const sv=G.subs&&subT>0;if(se._h!==subHTML){se._h=subHTML;se.innerHTML=subHTML;}se.style.display=sv?'block':'none';if(document.body.classList.contains('subs-on')!==!!sv)document.body.classList.toggle('subs-on',!!sv);
  const sk=$('skip');const skv=cine&&G.cine.skippable&&G.cine.t>0.8;sk.style.display=skv?'flex':'none';
  if(skv){const st=sk.firstElementChild,stt=G.solo?'Пропуск — держи':'Пропуск — оба держат';if(st.textContent!==stt)st.textContent=stt;sk.querySelector('.k1').style.display=$('sk1').style.display=G.solo?'none':'';const k0=sk.querySelector('.k0'),k1=sk.querySelector('.k1');const g0=K(0,'jump'),g1=K(1,'jump');if(k0._h!==g0){k0._h=g0;k0.innerHTML=g0;}if(k1._h!==g1){k1._h=g1;k1.innerHTML=g1;}
    $('sk0').style.background=btn(G.solo?G.soloPi:0,'jump')?PCSS[0]:'transparent';$('sk1').style.background=btn(1,'jump')?PCSS[1]:'transparent';$('skbar').style.width=Math.round(G.skipT*100)+'%';}
  stitchT=Math.max(0,stitchT-dt);$('stitch').style.opacity=stitchT>0?Math.min(1,stitchT/0.2):0;
  const lb=cine&&G.cine.cam?'7vh':'0';$('lbT').style.height=lb;$('lbB').style.height=lb;
  const lk=$('links');const lvl=W.linkTotal>0;lk.style.display=(G.links>0||lvl)&&!cine?'flex':'none';const ll=W.linkLabel?W.linkLabel():null;if(ll)lk.style.display=cine?'none':'flex';const lt=ll||(lvl?'Звенья '+W.links+' / '+W.linkTotal+(W.nutTotal?'  ·  '+ICO_NUT+' '+W.nuts+' / '+W.nutTotal:'')+(W.links>=W.linkTotal?'  ·  '+ICO_GEM+' самоцвет':''):'Звенья: '+G.links);if(lk._t!==lt){lk._t=lt;lk.querySelector('span').innerHTML=lt;}
  $('owl').style.opacity=W.owlT>0?Math.min(1,W.owlT/0.4):0;hudW2(cine);
  {const bb=$('beatbell'),S=W.song,on=!!(S&&S.show&&!cine&&(S.state==='play'||S.state==='final'));bb.style.display=on?'block':'none';
    if(on){const ph=S.state==='final'?((S.ft/S.B2)%1+1)%1:(typeof S.bph==='number'?S.bph:((S.t/S.B)%1+1)%1);bb.style.transform='translateY('+(-Math.sin(ph*Math.PI)*20).toFixed(1)+'px) scale('+(1+0.25*(S.pulse||0)).toFixed(2)+')';}}   // бубенец прыгает в долю
  // иконки героев вне кадра (замочек — держит плиту)
  let ii=0;const H=innerHeight;
  if(!cine)for(const pane of PANES){for(const h of HEROES){if(h.cling)continue;const pr=project(new V3(h.pos.x,h.pos.y+h.d.height*0.6,h.pos.z),pane);
      if(!pr.behind&&Math.abs(pr.x)<0.96&&Math.abs(pr.y)<0.93)continue;let x=pr.x,y=pr.y;if(pr.behind){x=-x;y=-Math.abs(y)-0.5;}
      const s=Math.max(Math.abs(x)/0.86,Math.abs(y)/0.8,1);x/=s;y/=s;const ic=iconEls[ii++];if(!ic)break;
      if(ic.k!==h.kind){ic.k=h.kind;ic.s.innerHTML=sil(h.kind,h.d.css);ic.el.style.borderColor=PCSS[h.player];}
      ic.el.style.display='flex';ic.el.style.transform='translate('+(pane.x+(x*0.5+0.5)*pane.w).toFixed(1)+'px,'+((1-(y*0.5+0.5))*H).toFixed(1)+'px)';
      ic.el.style.opacity=h.active?1:0.7;ic.lock.style.display=h.held?'flex':'none';const watch=W.gaze&&!h.active&&!h.inRing&&h.firefly>0;ic.eye.style.display=watch?'flex':'none';if(watch)ic.eye.style.opacity=h.firefly<5&&Math.sin(G.time*14)<0?0.25:1;ic.q.style.display=h.inRing?'flex':'none';}}
  for(;ii<iconEls.length;ii++)iconEls[ii].el.style.display='none';
  for(let i=floats.length-1;i>=0;i--){const f=floats[i];f.t+=dt;f.p.y+=dt*0.9;const a=1-f.t/f.life;
    f.els.forEach((el,k)=>{const pane=PANES[k];if(!pane||a<=0){el.style.display='none';return;}const pr=project(f.p,pane);
      if(pr.behind||Math.abs(pr.x)>1||Math.abs(pr.y)>1){el.style.display='none';return;}el.style.display='block';el.style.opacity=a;
      el.style.transform='translate('+(pane.x+(pr.x*0.5+0.5)*pane.w).toFixed(1)+'px,'+((1-(pr.y*0.5+0.5))*H).toFixed(1)+'px) translate(-50%,-50%)';});
    if(f.t>=f.life){f.els.forEach(e=>e.remove());floats.splice(i,1);}}
  updatePrompts();}
function contextTip(pi){const h=active(pi),p=players[pi];
  let best=null,bd=99;for(const e of W.enemies){if(!e.alive)continue;const d=hd(e.pos,h.pos);
    if(e.state==='broken'&&d<6&&d<bd){best='<b>ПРОБОЙ!</b> Бей '+K(pi,'attack')+' — Добивающий мах!';bd=d;}
    else if(e.state==='stagger'&&e.tgt===h&&!e.openHit&&d<bd){best='Морок шатается — бей '+K(pi,'attack')+', пока открыт, не мешкай!';bd=d;}
    else if(e.state==='wind'&&e.tgt===h&&d<bd){bd=d;best=e.sig==='red'?'<i class="sg r"></i> Красный зубец — кувырок '+K(pi,'roll')+'!':e.sig==='blue'?'<i class="sg b"></i> Синяя капля — защита '+K(pi,'guard')+', в последний миг — назад.':'<i class="sg y"></i> Солнышко! Защита '+K(pi,'guard')+(p.shieldTaught?' — в последний миг.':'');}}
  if(best)return best;
  if(p.downed)return 'Рассыпался клубком — друг подошьёт, коль рядом постоит.';
  if(canContinue(pi))return 'Брось клубок '+K(pi,'item')+' — твоя нить к нити друга пристегнётся!';
  if(p.clingOffer)return 'Колечко над героем: прыжок '+K(pi,'jump')+' — за друга уцепиться до колокольчика.';
  for(const z of W.tipZones){if(z.pi!==undefined&&z.pi!==pi)continue;if(z.cond(pi,h))return z.text(pi,h);}return null;}

/* ============================== ОБНОВЛЕНИЕ ГЕРОЕВ (визуал) ============================== */
function tickHero(h,dt){['iT','atkT','atkCd','skillCd','knockT','rollT','rollCd','hurtT','tossT','aimT','gusT'].forEach(k=>{if(h[k]>0)h[k]=Math.max(0,h[k]-dt);});h.held=h.holding;h.holding=false;}
/* Ромбик цвета игрока над героем, которым управляет человек (в одиночку — только над своим, не над героем помощника).
   Загорается на W.markShow с (2,5) — в начале уровня, после ролика, после смены героя и после переноса (упал, вернули) —
   и когда игрок стоит без дела дольше W.markIdle с (5); потом тает. Над запасными героями меток нет. */
function heroMarker(h,dt){const me=ctrl(h)&&!h.cling&&!G.cine,show=W.markShow||2.5,m=h.marker;
  if(h.mkW!==W||(me&&!h.mkMe)||(me&&h.mkP&&h.mkP.distanceToSquared(h.pos)>9))h.mkT=show;   // новый уровень, ролик кончился или герой сменился, перенос
  h.mkW=W;h.mkMe=me;(h.mkP||(h.mkP=new V3())).copy(h.pos);
  h.mkIdle=me&&!h.moving?h.mkIdle+dt:0;if(h.mkIdle>(W.markIdle||5))h.mkT=Math.max(h.mkT,0.4);
  h.mkT=me?Math.max(0,h.mkT-dt):0;h.mkA=damp(h.mkA,h.mkT>0?1:0,h.mkT>0?10:5,dt);
  m.visible=me&&h.mkA>0.02;if(!m.visible)return;
  m.position.y=heroHeight(h)+0.85+Math.sin(G.time*4)*0.08;m.rotation.y+=dt*2;h.markerMat.opacity=h.mkA;m.scale.setScalar(0.6+0.4*h.mkA);}
function animHero(h,dt){const g=h.g;g.position.copy(h.pos);g.rotation.y=h.face;const sp=Math.hypot(h.vel.x,h.vel.z);h.walkT+=dt*sp*(h.kind==='potap'?1.5:2.3);
  const b=h.body,p=players[h.player],f=Math.min(1,sp/3);
  const down=h.active&&p.downed;b.visible=!down&&!h.skin;h.yarn.visible=down;if(down){h.yarn.rotation.y+=dt*2;}
  if(h.cling){b.rotation.set(-0.5,0,Math.sin(G.time*3)*0.1);b.position.set(0,0,0);}
  else if(h.rollT>0){b.rotation.set((1-h.rollT/0.38)*Math.PI*2,0,0);b.position.set(0,0.15,0);}
  else if(h.hang){b.rotation.set(0.25,0,Math.sin(G.time*8)*0.12);b.position.set(0,-h.d.height*0.85,0);}   // съезжает по струне, повиснув на лапах
  else{b.rotation.x=damp(b.rotation.x,clamp(sp*0.035,0,0.3)+(h.guard?-0.2:0),10,dt);b.rotation.z=h.kind==='yosha'?0:Math.sin(h.walkT)*0.08*f;b.rotation.y=h.atkT>0?Math.sin((1-h.atkT/0.28)*Math.PI)*0.9:0;
    const sw=h.grounded&&h.groundRef&&h.groundRef.water;b.position.set(0,Math.abs(Math.sin(h.walkT))*(h.kind==='potap'?0.05:0.08)*f*(sw?0.3:1)+(h.extraY||0)+(sw?-h.d.height*0.38+Math.sin(G.time*3+h.pos.x)*0.05:0),0);}
  if(h.kind==='yosha'){const bl=h.parts.ball;if(sp>0.6&&h.grounded&&!h.guard){h.rollAng+=dt*sp*3.3;}else{const tg=Math.round(h.rollAng/(Math.PI*2))*Math.PI*2;h.rollAng=damp(h.rollAng,tg,8,dt);}
    bl.rotation.x=h.rollAng;const cur=sp>0.6&&h.grounded;bl.scale.set(1,cur?0.9:1,1);}                       // Йоша катится шариком
  if(h.kind==='pelageya'){const spread=!h.grounded?(h.glide?1.45:0.8):0.12;h.parts.wings.forEach(w=>{w.rotation.z=damp(w.rotation.z,w.userData.s*spread,12,dt);const s=h.glide?1.6:1;w.scale.set(1,damp(w.scale.y,s,10,dt),damp(w.scale.z,s,10,dt));});}
  if(h.kind==='potap')h.parts.legs.forEach((l,i)=>{l.rotation.x=Math.sin(h.walkT+(i%2?Math.PI:0)+(i>1?Math.PI:0))*0.45*f;});
  if(h.kind==='proshka')h.parts.tail.rotation.y=Math.sin(G.time*5)*0.3;
  heroMarker(h,dt);
  h.shield.visible=h.guard&&h.active;if(h.shield.visible)h.shieldMat.opacity=0.2+0.4*p.spirit;h.arc.visible=h.atkT>0;if(h.arc.visible)h.arcMat.opacity=h.atkT/0.28*0.7;
  h.clingRing.visible=h.active&&p.clingOffer&&!G.cine;if(h.clingRing.visible){h.clingRing.position.y=heroHeight(h)+1.0;h.clingRing.rotation.y+=dt*3;}
  const ffOn=W.gaze&&!h.active&&h.firefly>0&&!G.cine,ffk=Math.min(1,Math.max(0,h.firefly)/5);h.ff.visible=ffOn;h.ff.position.set(Math.sin(G.time*2)*0.2,heroHeight(h)+0.85,Math.cos(G.time*2)*0.2);h.ffMat.emissiveIntensity=2*ffk;h.ff.scale.setScalar(0.5+0.5*ffk);
  const gz=W.gaze&&(!G.cine||h.inRing)&&!down&&(h.active||h.firefly>0||h.inRing);h.cone.visible=gz;h.coneMat.opacity=h.active?0.04:0.11*ffk;h.coneMat.color.setHex(h.active?0xffffff:0xfff0a0);
  h.hat.visible=h.hatOn&&!down;if(h.hatOn){h.hatMat.color.setHex(h.hatOn==='in'?0x9ac27a:0x2e5a2a);h.hat.position.y=heroHeight(h)+(h.hatOn==='nose'?-0.35:0.02);}
  h.aura.visible=!!(h.power&&h.power.t>0);if(h.aura.visible){h.aura.rotation.z+=dt*4;h.aura.scale.setScalar(1+0.15*Math.sin(G.time*12));}
  heroW2(h,dt);heroW3(h,dt);heroW4(h,dt);
  g.visible=!(h.hurtT>0&&Math.floor(G.time*16)%2===0);}

/* ============================== РОЛИКИ В ДВИЖКЕ (кадры, реплики, события; пропуск — оба держат A) ============================== */
function play(def){const S={t:0,dur:def.dur,cam:true,camPos:new V3(),camLook:new V3(),snap:true,camK:def.camK||4.5,fov:def.fov||50,skippable:def.skip!==false,ei:0,si:-1,yi:0};
  const ev=(def.events||[]).slice().sort((a,b)=>a.t-b.t),shots=def.shots||[],says=def.says||[];
  const P=v=>new V3(v[0],v[1],v[2]);
  const setCam=t=>{let i=-1;for(let k=0;k<shots.length;k++)if(shots[k].t<=t)i=k;if(i<0)return;const s=shots[i];if(i!==S.si){S.si=i;if(s.cut!==false)S.snap=true;}
    S.camPos.copy(P(s.p));S.camLook.copy(P(s.l));if(s.p2){const k=smooth((t-s.t)/(s.dur||2));S.camPos.lerp(P(s.p2),k);S.camLook.lerp(P(s.l2||s.l),k);}};
  S.update=(t,dt)=>{while(S.ei<ev.length&&ev[S.ei].t<=t){ev[S.ei].fn();S.ei++;}
    while(S.yi<says.length&&says[S.yi][0]<=t){const y=says[S.yi];say(y[2],y[3],y[1],y[4]);S.yi++;}
    setCam(t);if(def.tick)def.tick(t,dt||0);};
  S.skip=()=>{G.stats.skips++;while(S.ei<ev.length){ev[S.ei].fn();S.ei++;}S.yi=says.length;subT=0;if(def.tick)def.tick(def.dur,0);};
  S.end=()=>{subT=0;if(def.end)def.end();};
  G.cine=S;S.update(0,0);}
const shot=(t,p,l,p2,l2,dur,cut)=>({t,p,l,p2,l2,dur,cut});

