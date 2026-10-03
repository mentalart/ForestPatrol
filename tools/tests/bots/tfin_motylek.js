//@@ wait=1500
// релиз final06: 3-1 — двусветный мотылёк раскрывается в свете ЛЮБЫХ двух героев рядом (rep_32_motylek.py). Вдвоём: свет двух героев
// одного игрока (Прошка зажёг и уступил Потапу, тот зажёг) — раскрыт, бьётся; один свет — закрыт; свет обоих игроков — раскрыт.
// В одиночку: Прошка зажигает перо, Q — Потап зажигает своё — раскрыт; бьём до конца.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.SETUP=(solo)=>{ZC.setSolo(!!solo);ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(10);ZC.skip();ZC.tick(5);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}
  const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
  // тёмные аллеи: ворота открыты, герои у входа — выходят тени и мотылёк; тени убираем, остаётся мотылёк
  const W=ZC.W,H=ZC.HERO;W.flags.gateOpen=true;H.proshka.pos.set(-1.4,0,-124.6);H.potap.pos.set(-0.4,0,-124.2);H.pelageya.pos.set(1.4,0,-124.6);H.yosha.pos.set(0.4,0,-124.2);
  for(const h of Object.values(H)){h.vel.set(0,0,0);h.following=false;h.lit=false;}ZC.tick(3);H.proshka.pos.z=-126;ZC.tick(60);
  W.enemies.filter(x=>x.kind==='ten').forEach(x=>{x.alive=false;W.group.remove(x.g);});const e=W.enemies.find(x=>x.alive&&x.kind==='motylek');
  if(e){e.pos.set(0,e.pos.y,-126.2);}for(const h of Object.values(H))h.lit=false;ZC.tick(30);return e;};
window.LIGHT=(key)=>{U.tap(key);ZC.tick(4);};
window.HITS=(e,pi,n)=>{const h=U.act(pi),k=pi?'Comma':'KeyF';const e0=e.embers;for(let i=0;i<n*20&&e.alive;i++){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);if(Math.hypot(e.pos.x-h.pos.x,e.pos.z-h.pos.z)>1.4){h.pos.x+=(e.pos.x-h.pos.x)*0.2;h.pos.z+=(e.pos.z-h.pos.z)*0.2;}if(i%20===0)ZC.press(k);ZC.tick(1);}return e0+'→'+e.embers+(e.alive?'':' dead');};
const e=SETUP(false);'motylek='+!!e+' both='+e.both
//@@
// вдвоём: один свет — закрыт
const H=ZC.HERO,e=ZC.W.enemies.find(q=>q.alive&&q.kind==='motylek');LIGHT('KeyR');ZC.tick(20);if(e.both)throw new Error('раскрылся от одного света');
// Прошка уступает Потапу (свет у Прошки остаётся), Потап зажигает — два героя одного игрока
U.tap('KeyQ');ZC.tick(10);const k=U.act(0).kind;LIGHT('KeyR');ZC.tick(20);const lit=[H.proshka.lit,H.potap.lit];
if(!e.both)throw new Error('не раскрылся в свете двух героев первого игрока: act='+k+' lit='+lit+' lp='+e.lp);const r=HITS(e,0,4);if(!/→/.test(r)||e.embers>=3&&e.alive)throw new Error('удары не прошли: '+r);
'coop same-player ok lit='+lit+' hits '+r
//@@
// вдвоём: свет обоих игроков — раскрыт (как раньше)
const e=SETUP(false);LIGHT('KeyR');LIGHT('Semicolon');ZC.tick(20);if(!e.both)throw new Error('не раскрылся в свете обоих игроков');const r=HITS(e,1,4);'coop two-players ok hits '+r
//@@
// одиночный: Прошка зажигает, Q — Потап зажигает — раскрыт; бьём до конца
const e=SETUP(true),H=ZC.HERO;LIGHT('KeyR');ZC.tick(10);if(e.both)throw new Error('одиночный: раскрылся от одного');ZC.press('KeyQ');ZC.tick(10);const k=U.act(ZC.G.soloPi).kind;LIGHT('KeyR');ZC.tick(20);
if(!e.both)throw new Error('одиночный: не раскрылся: act='+k+' lit='+[H.proshka.lit,H.potap.lit]);const r=HITS(e,ZC.G.soloPi,12);if(e.alive&&e.embers>0)throw new Error('одиночный: не добили: '+r);
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'solo ok act='+k+' hits '+r+' errs=0'
