//@@
// релиз final06: 5-Б2, правки по отзыву 2 — эффекты этапа 3 «Буря» ярче (шар копится в руке и тянет шлейф, отбив — золотая вспышка,
// ворон: красные глаза, прицел-линия и пике, промах — удар о землю и звёздочки; иглы — знак в небе, след и трещина; воронка — спираль
// и конус; гроза — молнии за поляной и дождь; руна под летящим Кощеем) и «Кости, встаньте!» — пятеро щитников встают из земли. Кадры для просмотра.
window.K5=ZC.FIN.k5;window.H=ZC.HERO;window.A=pi=>ZC.players[pi].heroes[ZC.players[pi].act];window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));
{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.hideUI=()=>{for(const id of['banner','bubs','floats','subs','subsb','tip0','tip1','obj0','obj1','level','skip','bossbar'])if(document.getElementById(id))document.getElementById(id).style.visibility='hidden';};
ZC.startFrom(ZC.LV('5-B2'));ZC.G.manual=true;ZC.tick(20);for(let i=0;i<6&&ZC.G.cine;i++){ZC.skip();ZC.tick(3);}K5.auto=false;for(const pi of[0,1])ZC.players[pi].petals=99;
K5.stageStart(3);ZC.tick(240);['st='+K5.st,'fight='+K5.fight,'storm='+K5.storm.toFixed(2),'kb y='+K5.KB.pos.y.toFixed(1),'errs='+ERR.length]
//@@
// шар копится в руке (0,5 с), затем летит к герою со шлейфом
for(const pi of[0,1])ZC.players[pi].petals=99;K5.orbs.slice().forEach(o=>{});const o=K5.orbThrow(A(0));ZC.tick(20);const r=['hold='+o.hold.toFixed(2)];ZC.tick(40);r.push('flying d='+o.p.distanceTo(A(0).pos).toFixed(1));hideUI();r
//@@ shot=kvfx_orb.png
ZC.tick(1);
//@@
// отбив в последний миг — золотая вспышка, шар к другу
const o=K5.orbs[0];const r=[];if(o){for(let i=0;i<400&&o.st==='in'&&K5.orbs.includes(o);i++){if(o.left===null&&o.eta<0.28)ZC.W.onGuardTap(0,A(0));ZC.tick(1);}r.push('st='+o.st);ZC.tick(8);}hideUI();r
//@@ shot=kvfx_parry.png
ZC.tick(1);
//@@
// иглы: знак в небе и красные круги; затем падение и трещины
const r=[];K5.rainT=0.01;ZC.tick(40);r.push('zones='+(K5.zones||[]).length);hideUI();r
//@@ shot=kvfx_needles.png
ZC.tick(60);hideUI();'fall'
//@@ shot=kvfx_needles2.png
ZC.tick(1);
//@@
// воронка
K5.vxT=0.01;ZC.tick(60);hideUI();'vortex log='+K5.log.filter(x=>x==='vortex').length
//@@ shot=kvfx_vortex.png
ZC.tick(1);
//@@
// ворон пикирует: прицел-линия; промах — удар о землю и звёздочки
const rv=ZC.W.enemies.filter(e=>e.kind==='k5raven'&&e.alive);const r=['ravens='+rv.length];const e=rv[0]||K5.ravenMake();e.cd=0.05;
for(let i=0;i<300&&!(e.state==='wind');i++)ZC.tick(1);r.push('raven state='+e.state+' line='+(e.k5line?e.k5line.material.opacity.toFixed(2):'-'));hideUI();r
//@@ shot=kvfx_raven.png
ZC.tick(1);
//@@
const e=ZC.W.enemies.find(x=>x.kind==='k5raven'&&x.alive);const r=[];if(e){const h=ZC.players[e.pi].heroes[ZC.players[e.pi].act];for(let i=0;i<200&&e.state!=='strike';i++){ZC.tick(1);}h.rollT=0.4;h.lastRoll=ZC.G.time;for(let i=0;i<80;i++)ZC.tick(1);r.push('after strike state='+e.state+' daze='+(e.dazeT||0).toFixed(2)+' stars='+!!e.k5stars);}hideUI();r
//@@ shot=kvfx_ravencrash.png
ZC.tick(1);
//@@
// падение Кощея с неба (спесь сбита)
const kb=K5.KB;kb.embers=0;kb.state='broken';kb.t=0;for(let i=0;i<120;i++)ZC.tick(1);hideUI();['kb y='+kb.pos.y.toFixed(2)+' state='+kb.state]
//@@ shot=kvfx_crash.png
ZC.tick(1);
//@@
// этап 4: «Кости, встаньте!» — ролик, пятеро щитников
K5.stageStart(4);ZC.tick(180);const kb=K5.KB;kb.embers=Math.ceil(kb.maxEmb/2);ZC.tick(10);const r=['cine='+!!ZC.G.cine];ZC.tick(95);hideUI();r.push('bones so far='+ZC.W.enemies.filter(e=>e.kind==='k5bone').length);r
//@@ shot=kvfx_bones1.png
ZC.tick(70);hideUI();'bones='+ZC.W.enemies.filter(e=>e.kind==='k5bone').length
//@@ shot=kvfx_bones2.png
for(let i=0;i<300&&ZC.G.cine;i++)ZC.tick(1);ZC.tick(60);const n=ZC.W.enemies.filter(e=>e.kind==='k5bone'&&e.alive).length;hideUI();['bones='+n,'cine='+!!ZC.G.cine,'errs='+ERR.length+(ERR[0]?' '+ERR[0]:''),n===5&&ERR.length===0?'ok':'FAIL']
//@@ shot=kvfx_bones3.png
ZC.tick(1);
