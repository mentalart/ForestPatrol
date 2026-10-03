//@@ wait=1500
// релиз final06: 3-1 «Сад молодильных яблок» втрое больше (late_99p_sky31.js), вдвоём — сюжет и новые участки до босса:
// ролик у гнезда (про молодильные яблоки), Дед-Садовник (яблочко — помолодел, ворота открыл), трухлявый мост (яблочко — новый),
// передай яблочко через лиловые мостки (с яблочком на них не пройти — бросок, друг ловит), Дуб-старик → дубок, спящая стража
// (Йоша под струнами, Прошка прыгает — тихо, орешек; свет рядом — просыпается), ступени, тени-воришки. Проверки — исключением.
window._errs=[];window.SEGHIT=(ax,az,bx,bz,o,m)=>{let t0=0,t1=1;const dx=bx-ax,dz=bz-az,P=[-dx,dx,-dz,dz],Q=[ax-(o.minx-m),(o.maxx+m)-ax,az-(o.minz-m),(o.maxz+m)-az];
  for(let i=0;i<4;i++){if(P[i]===0){if(Q[i]<0)return false;}else{const r=Q[i]/P[i];if(P[i]<0){if(r>t1)return false;if(r>t0)t0=r;}else{if(r<t0)return false;if(r<t1)t1=r;}}}return true;};
window.CHASE=(pi,t)=>{const h=U.hero(pi);let tx=t.pos.x,tz=t.pos.z;for(const o of ZC.W.obs31){if(!SEGHIT(h.pos.x,h.pos.z,tx,tz,o,0.5))continue;const L=o.minx-1.3,R=o.maxx+1.3;
  const ex=Math.abs(h.pos.x-L)+Math.abs(tx-L)<Math.abs(h.pos.x-R)+Math.abs(tx-R)?L:R,up=h.pos.z>(o.minz+o.maxz)/2;tx=ex;tz=Math.abs(h.pos.x-ex)>0.5?(up?o.maxz+0.3:o.minz-0.3):(up?o.minz-1.2:o.maxz+1.2);break;}return U.step(pi,tx,tz,0.3);};
{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(20);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
U.nocine();ZC.tick(5);U.walkTo(0,-1,-2,5);ZC.tick(3);const W=ZC.W;if(!W.warp31)throw new Error('нет W.warp31 — модуль не подключён');
const c=ZC.G.cine,says=(ZC.FIN.lastCine&&ZC.FIN.lastCine.says||[]).map(s=>String(s[3]));if(!says.some(s=>/молодильных яблок/.test(s)))throw new Error('в ролике у гнезда нет слов про молодильные яблоки: '+says.length);
U.nocine();ZC.tick(5);if(!W.abil.pero)throw new Error('перо не выдано');'gift ok says='+says.length+' links='+W.linkTotal+' nuts='+W.nutTotal
//@@
// Ж: садовник — ролик; оживить яблоню, яблочко в руки, к садовнику — молодеет, ворота настежь
const W=ZC.W,H=ZC.HERO,F=W.flags,AP=W.apples31;ZC.FIN.warp('gardener');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('proshka',0);U.goto(0,0,-178,4);ZC.tick(10);if(!F.metGardener)throw new Error('нет ролика садовника');U.nocine();ZC.tick(5);
const Pr=H.proshka;U.tap('KeyR');U.goto(0,-5.4,-168.4,5);ZC.tick(240);const T=AP.trees[0];if(!T.revived)throw new Error('яблоня не ожила');ZC.tick(60);
const r=[U.goto(0,T.pos.x+1.0,T.pos.z+0.4,4)];ZC.tick(10);if(!Pr.apple31)throw new Error('яблочко не в руках: apples='+AP.list.length+' '+U.st());
U.tap('KeyR');r.push(U.goto(0,2.4,-189.2,6));ZC.tick(20);if(!ZC.G.cine)throw new Error('садовник не взял яблочко: '+U.st()+' young='+F.young);U.nocine();ZC.tick(10);
if(!F.young)throw new Error('садовник не помолодел');r.push(U.goto(0,0,-199,5));if(Pr.pos.z>-197)throw new Error('ворота закрыты: '+U.st());'gardener ok '+r
//@@ shot=sky31_young.png
ZC.tick(1);
//@@
// З: трухлявый мост — без яблочка падаешь; с яблочком — мост молодеет, переходим
const W=ZC.W,H=ZC.HERO,F=W.flags,AP=W.apples31;ZC.FIN.warp('bridge');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('proshka',0);const Pr=H.proshka;Pr.pos.set(0,0,-205.4);ZC.tick(3);U.goto(0,0,-210,2);ZC.tick(60);const fell=Pr.pos.z>-205&&Pr.pos.z<-196;
const T=AP.trees.find(t=>Math.abs(t.pos.z+201)<0.5);Pr.pos.set(T.pos.x+2,0,T.pos.z);Pr.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(240);ZC.tick(60);U.goto(0,T.pos.x+1.0,T.pos.z+0.4,4);ZC.tick(5);
if(!Pr.apple31)throw new Error('яблочко у моста не в руках');U.tap('KeyR');U.goto(0,0.4,-204.6,4);ZC.tick(30);if(!F.bridge)throw new Error('мост не помолодел');ZC.tick(100);
const r=[U.goto(0,0,-231,8)];if(Pr.pos.z>-229)throw new Error('по мосту не перешёл: '+r+' '+U.st());'bridge ok fellBefore='+fell+' '+r
//@@
// И: с яблочком на лиловые мостки нельзя; Потап на островке, Пелагея за мостками — бросок, ловля, бросок, ловля; дуб → дубок
const W=ZC.W,H=ZC.HERO,F=W.flags,AP=W.apples31;ZC.FIN.warp('pass');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('potap',0);const P=H.potap;P.pos.set(0,0,-244);P.vel.set(0,0,0);ZC.tick(3);const r=[U.goto(0,0,-254,8)];if(P.pos.z>-252.4||P.pos.y<-0.5)throw new Error('Потап без света не дошёл до островка: '+U.st());
U.toKind('pelageya',1);const Pe=H.pelageya;Pe.pos.set(0.5,0,-244);Pe.vel.set(0,0,0);ZC.tick(3);r.push(U.goto(1,0,-264.4,10));if(Pe.pos.z>-263)throw new Error('Пелагея не дошла: '+U.st());
U.toKind('proshka',0);const Pr=H.proshka;const T=AP.trees.find(t=>Math.abs(t.pos.z+240)<0.5);Pr.pos.set(T.pos.x+2,0,T.pos.z);Pr.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(300);U.goto(0,T.pos.x+1.0,T.pos.z+0.4,4);ZC.tick(5);U.tap('KeyR');ZC.tick(3);
if(!Pr.apple31)throw new Error('яблочко не в руках');
// проверка: с яблочком на лиловых мостках проваливаешься
const sv=Pr.pos.clone();Pr.pos.set(0,0.05,-247.5);Pr.vel.set(0,0,0);ZC.tick(30);const sank=Pr.pos.y<-0.5||!Pr.apple31;if(!sank)throw new Error('с яблочком лиловые мостки держат');ZC.tick(120);
if(!Pr.apple31){const T2=T;ZC.tick(200);Pr.pos.set(T2.pos.x+1.0,0,T2.pos.z+0.4);ZC.tick(10);}if(!Pr.apple31)throw new Error('яблочко не вернулось в руки');
Pr.pos.set(0,0,-245.2);Pr.vel.set(0,0,0);Pr.face=Math.PI;ZC.tick(3);U.tap('KeyF');ZC.tick(60);if(!P.apple31)throw new Error('Потап не поймал: '+U.st()+' apples='+W.apples31.list.map(a=>a.state).join());
U.toKind('potap',0);P.face=Math.PI;ZC.tick(3);U.goto(0,0,-255.8,2);P.face=Math.PI;U.tap('KeyF');ZC.tick(60);if(!Pe.apple31)throw new Error('Пелагея не поймала: '+W.apples31.list.map(a=>a.state).join()+' '+U.st());
U.goto(1,0,-273.2,6);ZC.tick(40);if(!F.oak)throw new Error('дуб не помолодел: '+U.st());r.push(U.goto(1,0,-284,6));if(Pe.pos.z>-282)throw new Error('мимо дубка не прошла '+U.st());'pass ok sank='+sank+' '+r
//@@ shot=sky31_oak.png
ZC.tick(1);
//@@
// К: спящая стража — Йоша под струнами, Прошка без света прыгает через струны: никто не проснулся — орешек; свет рядом — просыпается
const W=ZC.W,H=ZC.HERO,F=W.flags;ZC.FIN.warp('guards');ZC.tick(60);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('yosha',1);const Y=H.yosha;Y.pos.set(1.2,0,-304);Y.vel.set(0,0,0);ZC.tick(3);const r=[U.goto(1,1.2,-356,14)];const woke1=F.woke||0;
U.toKind('proshka',0);const Pr=H.proshka;Pr.pos.set(-1.2,0,-304);Pr.vel.set(0,0,0);ZC.tick(3);
for(let i=0;i<60*14;i++){const near=[-316,-328,-340,-352].some(z=>Pr.pos.z-z<1.4&&Pr.pos.z-z>0.6);if(near&&Pr.grounded)ZC.press('Space');if(U.step(0,-1.2,-358,0.5))break;ZC.tick(1);}U.rel(0);ZC.tick(30);
if(F.woke)throw new Error('стража проснулась: woke='+F.woke+' (Йоша '+woke1+') '+U.st());if(!F.quiet)throw new Error('нет орешка за тишину: passed='+F.passed);
const G0=W.enemies.filter(e=>e.kind==='pugalo');Pr.pos.set(-1.4,0,-346);Pr.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(90);const awake=G0.filter(e=>!e.sleep).length;if(!awake)throw new Error('свет рядом стражу не разбудил');
'guards ok quiet='+F.quiet+' woke after light='+awake+' '+r
//@@
// ступени: яблочко — ступени новые, наверх; тени-воришки: свет — ловим
const W=ZC.W,H=ZC.HERO,F=W.flags,AP=W.apples31;ZC.FIN.warp('steps');ZC.tick(10);W.enemies.filter(e=>e.kind==='pugalo').forEach(e=>{e.alive=false;W.group.remove(e.g);});for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('proshka',0);const Pr=H.proshka;const T=AP.trees.find(t=>Math.abs(t.pos.z+359.5)<0.5);Pr.pos.set(T.pos.x+2,0,T.pos.z);Pr.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(300);U.goto(0,T.pos.x+1.0,T.pos.z+0.4,4);ZC.tick(5);
if(!Pr.apple31)throw new Error('яблочко у ступеней не в руках');U.goto(0,0,-362.4,4);ZC.tick(30);if(!F.steps)throw new Error('ступени не помолодели');ZC.tick(90);U.goto(0,0,-374,6);if(Pr.pos.y<2.6)throw new Error('по ступеням не поднялся: '+U.st());
U.toKind('yosha',1);const Y=H.yosha;Y.pos.set(1,3,-373);Y.vel.set(0,0,0);ZC.tick(5);if(!Pr.lit)U.tap('KeyR');U.tap('Semicolon');ZC.tick(5);
const ts=W.thieves31;let n=0;
for(let i=0;i<60*150&&!F.thieves;i++){const t=ts.filter(q=>!q.caught).sort((a,b)=>Math.hypot(a.pos.x-Pr.pos.x,a.pos.z-Pr.pos.z)-Math.hypot(b.pos.x-Pr.pos.x,b.pos.z-Pr.pos.z))[0];if(!t)break;
  CHASE(0,t);const dx=t.pos.x-Pr.pos.x,dz=t.pos.z-Pr.pos.z,d=Math.hypot(dx,dz)||1;U.step(1,t.pos.x+dx/d*2.2,t.pos.z+dz/d*2.2,0.3);ZC.tick(1);}
U.rel(0);U.rel(1);if(!F.thieves)throw new Error('тени-воришки не пойманы: '+F.thiefCount+' '+U.st());ZC.tick(60);
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'steps+thieves ok n='+F.thiefCount+' errs=0'
