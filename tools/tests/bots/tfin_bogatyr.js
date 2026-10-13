//@@
// Богатырский выход — подача (late_91g_bogatyr.js) и правила прототипа (06_damage_clew.js). Застава Добрыни (мороки рядом), шкала включена
// как на уровнях с клубком: предвкушение (near), вспышка (столбы, хит-стоп, волна оглушает ближних), знаки сил на ОБОИХ героях игрока,
// клинок Прошки, Потап крупнее и «Не берёт!», Кладенец рубит у Прошки, который идёт следом, рамки портретов и строка у друга,
// Йоша — капли и запасной лепесток, «Богатырская дружина» (+2 с обоим), голубые мороки с часами, конец — знаки убраны, рост прежний.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.addEventListener('error',e=>window._errs.push(String(e.message).slice(0,200)));
U.go();ZC.G.manual=true;ZC.startFrom(ZC.LV('z-d'));ZC.tick(60);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(30);
ZC.W.abil.clew=true;
window.BG=ZC.FIN.bogatyr;window.H=ZC.HERO;window.P=ZC.players;window.r=[];window.ok=(c,m)=>r.push((c?'ok ':'FAIL ')+m);
window.ui=()=>ZC.FIN.ui(0.001);window.foes=()=>ZC.W.enemies.filter(e=>e.alive);
window.SAFE=n=>{for(let i=0;i<n;i++){for(const h of ZC.HEROES||Object.values(H))h.iT=Math.max(h.iT,0.5);ZC.tick(1);}};
window.PUT=(o,x,z)=>{o.pos.set(x,o.pos.y,z);if(o.vel)o.vel.set(0,0,0);};
window.FLOATS=()=>document.getElementById('floats').textContent;
for(let i=0;i<60*20&&foes().some(e=>e.state==='spawn');i++)SAFE(1);   // мороки Заставы выходят не сразу
P[0].blue=0.7;SAFE(2);ui();
ok(document.querySelector('#hud0 .blue').classList.contains('near'),'шкала 70% дрожит (near)');
JSON.stringify({lvl:ZC.W.levelId,foes:foes().map(e=>[e.kind,e.state,!!e.tick,!!e.big]),r})
//@@
// включение: столбы над обоими героями, хит-стоп, наезд, волна оглушает ближнего морока
r.length=0;{const a=H.proshka,e=foes()[0];PUT(e,a.pos.x+3,a.pos.z);e.dazeT=0;
  P[0].blue=1;SAFE(1);
  ok(BG.fx.filter(f=>f.kind==='beam').length>=2,'столбы света над Прошкой и Потапом: '+BG.fx.filter(f=>f.kind==='beam').length);
  ok(ZC.G.hitstop>=0.29,'хит-стоп 0,3 с: '+ZC.G.hitstop);ok(BG.pv<-40,'наезд камеры (пружина): '+BG.pv.toFixed(1));
  ok(e.dazeT>0,'морок в 3 м отшатнулся (оглушён): '+e.dazeT.toFixed(2)+' '+e.state);
  ok(/Кладенец, руби!|Ну-ка, разойдись!/.test(FLOATS()),'возглас героя');ZC.G.hitstop=0;}
SAFE(30);ui();
ok(H.proshka._bg&&H.potap._bg&&H.proshka._bg.emb.visible&&H.potap._bg.emb.visible,'знак силы над обоими героями игрока');
ok(H.proshka._bg.dec.material.opacity>0.5&&!H.proshka.aura.visible,'круг-оберег у ног, старый обруч скрыт: '+H.proshka._bg.dec.material.opacity.toFixed(2));
ok(!H.pelageya._bg&&!H.yosha._bg,'у героев второго игрока знаков нет');
ok(H.proshka._bg.blade&&H.proshka._bg.blade.visible,'светящийся клинок в руке Прошки');
ok([...document.querySelectorAll('#hud0 .port')].every(p=>p.classList.contains('bgpow')),'оба портрета игрока 1 в рамке силы');
{const n=document.querySelector('#hud1 .bgnote');ok(n&&n.classList.contains('on')&&/Прошка/.test(n.textContent),'строка у друга: '+(n&&n.textContent));}
SAFE(60);ok(Math.abs(H.potap.g.scale.x-1.18)<0.02,'Потап крупнее: '+H.potap.g.scale.x.toFixed(3));
r.join('\n')
//@@
// Кладенец рубит и у Прошки, который идёт следом; Потап — «Не берёт!»
r.length=0;{const a0=P[0].act;ZC.press('KeyQ');SAFE(3);ok(P[0].act!==a0&&!H.proshka.active,'Смена: Прошка идёт вторым');
  const e=foes()[0];const k0=BG.kladT;let hit=false;for(let i=0;i<90&&!hit;i++){if(e.alive)PUT(e,H.proshka.pos.x+1.4,H.proshka.pos.z);SAFE(1);hit=BG.kladT!==k0;}
  ok(hit,'Кладенец рубит у неактивного Прошки');ok(/Кладенец!/.test(FLOATS()),'надпись «Кладенец!»');
  const f=foes()[0]||e;H.potap.iT=0;const pet=P[0].petals,res=BG.dbg.hurt(H.potap,f);
  ok(res===false&&P[0].petals===pet,'Потап неуязвим, лепесток цел: '+P[0].petals);ok(/Не берёт!/.test(FLOATS()),'«Не берёт!»');}
r.join('\n')
//@@
// второй игрок, пока сила первого идёт: «Богатырская дружина», Йоша — капли и запасной лепесток, мороки голубеют
r.length=0;{P[0].petals=3;P[1].petals=3;const t0=H.potap.power.t;P[1].blue=1;SAFE(1);
  ok(/дружина/i.test(document.getElementById('banner').textContent),'плашка «Богатырская дружина»');
  ok(H.potap.power.t>t0+1.9&&H.pelageya.power.t>11.9,'обоим +2 с: '+t0.toFixed(2)+' → '+H.potap.power.t.toFixed(2)+', Пелагея '+H.pelageya.power.t.toFixed(2));
  ok(P[0].spare===1&&P[1].spare===1,'лепестки полны — запасной лепесток обоим');
  ok(BG.fx.filter(f=>f.kind==='drop').length>=4,'капли летят к каждому герою: '+BG.fx.filter(f=>f.kind==='drop').length);
  SAFE(30);ui();
  ok(getComputedStyle(document.querySelector('#hud1 .bgspare')).display!=='none','запасной лепесток в HUD');
  ok(BG.foes.size>=1&&[...BG.foes.values()].every(o=>o.clk.material.opacity>0.5),'мороки голубеют, над ними часы: '+BG.foes.size);
  ok(H.pelageya._bg&&H.pelageya._bg.crown&&H.pelageya._bg.crown.visible,'венец Пелагеи');
  const a=U.act(1);a.iT=0;const e=foes()[0];if(e){const res=BG.dbg.hurt(a,e);ok(res===true&&P[1].petals===3&&!P[1].spare&&a.iT>1,'удар сжёг запасной лепесток, свои целы, герой мигает: '+P[1].petals+' / '+P[1].spare+' iT='+a.iT.toFixed(2));}}
// кадр: все четверо рядом, знаки над головами
{const a=H.proshka;[['potap',1.6,0],['pelageya',-1.6,0.6],['yosha',0,1.8]].forEach(([k,dx,dz])=>{PUT(H[k],a.pos.x+dx,a.pos.z+dz);H[k].pos.y=a.pos.y;});SAFE(20);}
r.join('\n')
//@@ shot=tfin_bogatyr.png wait=300
'кадр'
//@@
// конец: знаки убраны, Потап прежнего роста, мороки обычные, рамки погасли
r.length=0;{let gone=false;for(let i=0;i<60*16;i++){SAFE(1);if(/Сила ушла/.test(FLOATS()))gone=true;}ui();
  ok(['proshka','potap','pelageya','yosha'].every(k=>!H[k]._bg),'знаки сил убраны у всех');
  ok(H.potap.g.scale.x===1,'Потап прежнего роста');ok(BG.foes.size===0,'мороки снова обычные');ok(gone,'«Сила ушла»');
  ok(![...document.querySelectorAll('.port')].some(p=>p.classList.contains('bgpow')),'рамки силы погасли');}
r.push('errs='+_errs.length+(_errs[0]?' '+_errs[0]:''));
if(_errs.length||r.some(x=>/^FAIL/.test(x)))throw new Error(r.filter(x=>/^FAIL|^errs=[1-9]/.test(x)).join(' | '));
r.join('\n')
