//@@
// релиз final06: 5-Б2, отзыв 3 — Кощей повелевает природой. Этап 2: ветер слева направо и справа налево сдувает героев (щит —
// почти не сдувает), молния бьёт в красный круг, земля трясётся — трещины, из-под земли костлявая рука хватает героя (урон, секунду
// не двинуться). Этап 5 «Все цепи острова — ко мне!»: три чёрные цепи у наковальни, ветер дует от наковальни, руки из-под земли;
// цепи разбиты — Кощей открыт. Кадры: облачка Сказа с пояснениями и все эффекты природы.
window.K5=ZC.FIN.k5;window.H=ZC.HERO;window.A=pi=>ZC.players[pi].heroes[ZC.players[pi].act];window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));
{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.hideUI=()=>{for(const id of['banner','bubs','floats','subs','subsb','tip0','tip1','obj0','obj1','level','skip','bossbar'])if(document.getElementById(id))document.getElementById(id).style.visibility='hidden';};
window.showUI=()=>{for(const id of['banner','bubs','floats','subs','subsb','tip0','tip1','obj0','obj1','level','skip','bossbar'])if(document.getElementById(id))document.getElementById(id).style.visibility='';};
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.skipAll=n=>{for(let i=0;i<(n||6);i++){if(ZC.G.cine){ZC.skip();ZC.tick(3);}}};
window.place=(h,x,z)=>{h.pos.set(x,0,z);h.vel.set(0,0,0);};
ZC.startFrom(ZC.LV('5-B2'));ZC.G.manual=true;ZC.tick(20);skipAll();K5.auto=false;ZC.tick(5);
// этап 1 пройден → ролик → облачка «Сказ про мальчишку · начало»: у каждого варианта пояснение, про что он
K5.stageWin(1);ZC.tick(5);skipAll();ZC.tick(20);const sk=document.getElementById('skaz')||document.querySelector('.skaz,[id*=skaz]');
['ui='+ZC.G.ui,'stage='+ZC.W.flags.stage,'skaz text='+(sk?sk.innerText.replace(/\s+/g,' ').slice(0,160):'-')]
//@@ shot=knat_skaz1.png
ZC.tick(1);
//@@
chk(ZC.G.ui==='skaz','нет облачков Сказа');ZC.press('Space');ZC.press('KeyM');ZC.tick(5);skipAll(10);ZC.tick(10);skipAll(10);ZC.tick(30);
for(const pi of[0,1])ZC.players[pi].petals=99;['st='+K5.st,'fight='+K5.fight,'stage='+ZC.W.flags.stage]
//@@
// этап 2: ветер — герои стоят, один держит щит
const C=K5.C,N=K5.nat,kb=K5.KB;chk(K5.st===2&&K5.fight,'не этап 2');kb.pos.set(C.x,0,C.z-6);
place(A(0),C.x-1.5,C.z+1);place(A(1),C.x+1.5,C.z+1);ZC.tick(2);N.boltT=99;N.quakeT=99;N.windT=0.01;ZC.tick(2);const W0=N.wind;
const x0=[A(0).pos.x,A(1).pos.x];ZC.hold('KeyG',true);ZC.tick(90);
const dx=[A(0).pos.x-x0[0],A(1).pos.x-x0[1]],dir=W0?W0.dir.x:0;window._d2=dx;
chk(W0&&W0.mode==='lin','ветер не начался');chk(dx[1]*dir>0.9,'ветер не сдувает: '+dx[1].toFixed(2));chk(Math.abs(dx[0])<Math.abs(dx[1])*0.6,'щит не держит ветер');hideUI();
['wind dir='+dir+' k='+(W0?W0.k.toFixed(2):'-'),'сдуло: щит '+dx[0].toFixed(2)+' м, без щита '+dx[1].toFixed(2)+' м ('+A(1).kind+')','log='+K5.log.filter(x=>x==='wind').length]
//@@ shot=knat_wind.png
ZC.tick(1);
//@@
// молния — красный круг под героем, через миг удар
const N=K5.nat;ZC.hold('KeyG',false);for(let i=0;i<200&&N.wind;i++)ZC.tick(1);ZC.tick(60);const C=K5.C;place(A(0),C.x-1.5,C.z+1);place(A(1),C.x+1.5,C.z+1);
const p0=[ZC.players[0].petals,ZC.players[1].petals];N.boltT=0.01;ZC.tick(30);window._p0=p0;hideUI();['zones='+(K5.zones||[]).length,'log bolt='+K5.log.filter(x=>x==='bolt').length]
//@@ shot=knat_bolt.png
ZC.tick(70);const p1=[ZC.players[0].petals,ZC.players[1].petals],hit=(_p0[0]-p1[0])+(_p0[1]-p1[1]);chk(K5.log.includes('bolt'),'молнии не было');chk(hit>=1,'молния не ранила');hideUI();['petals '+_p0.join('/')+' → '+p1.join('/')]
//@@ shot=knat_bolt2.png
ZC.tick(1);
//@@
// землетрясение — трещины под героями, через секунду руки из-под земли
const N=K5.nat,C=K5.C;ZC.tick(150);for(const h of[A(0),A(1)])h.iT=0;place(A(0),C.x-2,C.z+2);place(A(1),C.x+2,C.z+2);window._q0=[ZC.players[0].petals,ZC.players[1].petals];
N.quakeT=0.01;ZC.tick(80);hideUI();['log quake='+K5.log.filter(x=>x==='quake').length,'zones='+(K5.zones||[]).length,'hands='+N.hands.length]
//@@ shot=knat_crack.png
ZC.tick(1);
//@@
window.grabT=()=>{const N=K5.nat;if(!N.grab.size)return;_held=Math.max(_held,N.grab.size);const h=[...N.grab.keys()][0];if(!_pin||_pin.h!==h)_pin={h,x:h.pos.x,z:h.pos.z};else _moved=Math.max(_moved,Math.hypot(h.pos.x-_pin.x,h.pos.z-_pin.z));};
window._held=0;window._pin=null;window._moved=0;const N=K5.nat;for(let i=0;i<24;i++){ZC.tick(1);grabT();}hideUI();['hands='+N.hands.length,'grab='+N.grab.size,'log grab='+K5.log.filter(x=>x==='grab').length]
//@@ shot=knat_hands.png
const N=K5.nat;for(let i=0;i<120;i++){ZC.tick(1);grabT();}const q1=[ZC.players[0].petals,ZC.players[1].petals],lost=(_q0[0]-q1[0])+(_q0[1]-q1[1]);
chk(K5.log.includes('quake'),'земля не тряслась');chk(K5.log.includes('grab'),'рука никого не схватила');chk(lost>=1,'рука не ранила');chk(_moved<0.05,'схваченный двигается: '+_moved.toFixed(2));
['схватила '+_held+', урон '+lost+', сдвиг схваченного '+_moved.toFixed(2)+' м','hands left='+N.hands.length]
//@@
// затишье, пока спесь сбита: ни ветра, ни рук
const N=K5.nat,kb=K5.KB;kb.embers=0;kb.state='broken';kb.t=0;kb._b=false;ZC.tick(3);N.windT=0.01;N.quakeT=0.01;N.boltT=0.01;ZC.tick(80);chk(!N.wind,'ветер при сбитой спеси');
const r=['broken: wind='+!!N.wind+' log wind='+K5.log.filter(x=>x==='wind').length];kb.state='idle';kb.embers=kb.maxEmb;r
//@@
// этап 5: «Все цепи острова — ко мне!» — три цепи, ветер от наковальни, руки
K5.stageStart(5);ZC.tick(120);skipAll();for(const pi of[0,1])ZC.players[pi].petals=99;const ANV=K5.ANV,N=K5.nat,RG=K5.RG;K5.ringStart();
for(let i=0;i<60*4&&!(RG.chains&&RG.chains.length);i++)ZC.tick(1);place(A(0),ANV.x+1.6,ANV.z+0.4);place(A(1),ANV.x-1.4,ANV.z+1.4);ZC.tick(2);
const d0=[A(0),A(1)].map(h=>Math.hypot(h.pos.x-ANV.x,h.pos.z-ANV.z));ZC.tick(60);const d1=[A(0),A(1)].map(h=>Math.hypot(h.pos.x-ANV.x,h.pos.z-ANV.z));
const near=RG.chains.filter(e=>Math.hypot(e.pos.x-ANV.x,e.pos.z-ANV.z)<4.5).length;
chk(RG.chains.length===3,'цепей не три: '+RG.chains.length);chk(near===3,'цепи не у наковальни');chk(N.wind&&N.wind.mode==='rad','нет ветра от наковальни');chk(!K5.forging(),'ковка во время бури');
chk(d1[0]-d0[0]>0.5||d1[1]-d0[1]>0.5,'ветер не относит от наковальни: '+d0.map(v=>v.toFixed(1))+' → '+d1.map(v=>v.toFixed(1)));hideUI();
['chains='+RG.chains.length+' у наковальни '+near,'от наковальни: '+d0.map(v=>v.toFixed(1)).join('/')+' → '+d1.map(v=>v.toFixed(1)).join('/'),'wind k='+(N.wind?N.wind.k.toFixed(2):'-')]
//@@ shot=knat_gale.png
const N=K5.nat,RG=K5.RG;let hs=0;for(let i=0;i<60*4;i++){ZC.tick(1);hs=Math.max(hs,N.hands.length);if(N.hands.length&&i>40)break;}window._hs=hs;hideUI();['hands='+N.hands.length+' max='+hs,'gale on='+RG.on+' t='+RG.t.toFixed(1)+' chains='+RG.chains.filter(e=>e.alive&&!e.k5done).length+' wind k='+(N.wind?N.wind.k.toFixed(2):'-')+' kb='+K5.KB.state]
//@@ shot=knat_gale2.png
const RG=K5.RG;chk(_hs>0,'в бурю нет рук');RG.chains.slice().forEach((e,i)=>{e.onFinisher(A(i%2));ZC.tick(30);});for(let i=0;i<120&&RG.on;i++)ZC.tick(1);
chk(K5.log.includes('ringok'),'буря не кончилась победой');chk(K5.KB.state==='broken','Кощей не открыт после цепей: '+K5.KB.state);ZC.tick(60);chk(!K5.nat.wind||K5.nat.wind.k<0.2,'ветер не утих');
['gale on='+RG.on,'state='+K5.KB.state,'log='+K5.log.slice(-4).join(','),'errs='+ERR.length+(ERR[0]?' '+ERR[0]:''),'замечания: '+(BAD.join('; ')||'нет'),BAD.length===0&&ERR.length===0?'ok':'FAIL']
