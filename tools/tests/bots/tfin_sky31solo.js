//@@ wait=1500
// релиз final06: 3-1 «Сад молодильных яблок» — новые участки ОДНИМ игроком (Q — по кругу Прошка → Потап → Пелагея → Йоша):
// садовник и мост — одним героем; «передай яблочко» — Потап оставлен на островке, Пелагея за мостками, Прошка бросает, Q, Потап
// бросает дальше; стража — Йоша под струнами; тени-воришки — Йоша со светом оставлена в проходе, Прошка гонит. Проверки — исключением.
window._errs=[];window.SEGHIT=(ax,az,bx,bz,o,m)=>{let t0=0,t1=1;const dx=bx-ax,dz=bz-az,P=[-dx,dx,-dz,dz],Q=[ax-(o.minx-m),(o.maxx+m)-ax,az-(o.minz-m),(o.maxz+m)-az];
  for(let i=0;i<4;i++){if(P[i]===0){if(Q[i]<0)return false;}else{const r=Q[i]/P[i];if(P[i]<0){if(r>t1)return false;if(r>t0)t0=r;}else{if(r<t0)return false;if(r<t1)t1=r;}}}return true;};
window.CHASE=(pi,t)=>{const h=U.hero(pi);let tx=t.pos.x,tz=t.pos.z;for(const o of ZC.W.obs31){if(!SEGHIT(h.pos.x,h.pos.z,tx,tz,o,0.5))continue;const L=o.minx-1.3,R=o.maxx+1.3;
  const ex=Math.abs(h.pos.x-L)+Math.abs(tx-L)<Math.abs(h.pos.x-R)+Math.abs(tx-R)?L:R,up=h.pos.z>(o.minz+o.maxz)/2;tx=ex;tz=Math.abs(h.pos.x-ex)>0.5?(up?o.maxz+0.3:o.minz-0.3):(up?o.minz-1.2:o.maxz+1.2);break;}return U.step(pi,tx,tz,0.3);};
{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(20);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
U.nocine();ZC.tick(5);const W=ZC.W,H=ZC.HERO,F=W.flags,AP=W.apples31;ZC.FIN.warp('gardener');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('proshka');U.goto(0,0,-178,4);ZC.tick(10);U.nocine();ZC.tick(5);const Pr=H.proshka;U.tap('KeyR');U.goto(0,-5.4,-168.4,5);ZC.tick(300);const T=AP.trees[0];U.goto(0,T.pos.x+1.0,T.pos.z+0.4,4);ZC.tick(5);
if(!Pr.apple31)throw new Error('одиночный: яблочко не в руках');U.tap('KeyR');U.goto(0,2.4,-189.2,6);ZC.tick(20);U.nocine();ZC.tick(10);if(!F.young)throw new Error('одиночный: садовник не помолодел');'solo gardener ok'
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags,AP=W.apples31;ZC.FIN.warp('pass');ZC.tick(10);U.nocine();for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('potap');const P=H.potap;P.pos.set(0,0,-244);P.vel.set(0,0,0);ZC.tick(3);U.goto(0,0,-254,8);if(P.pos.z>-252.4)throw new Error('одиночный: Потап не на островке '+U.st());
U.toKind('pelageya');const Pe=H.pelageya;Pe.pos.set(0.5,0,-244);Pe.vel.set(0,0,0);ZC.tick(3);U.goto(0,0,-264.4,10);if(Pe.pos.z>-263)throw new Error('одиночный: Пелагея не дошла '+U.st());
U.toKind('proshka');const Pr=H.proshka;const T=AP.trees.find(t=>Math.abs(t.pos.z+240)<0.5);Pr.pos.set(T.pos.x+2,0,T.pos.z);Pr.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(300);U.goto(0,T.pos.x+1.0,T.pos.z+0.4,4);ZC.tick(5);U.tap('KeyR');ZC.tick(3);
if(!Pr.apple31)throw new Error('одиночный: яблочко не в руках');Pr.pos.set(0,0,-245.2);Pr.vel.set(0,0,0);Pr.face=Math.PI;ZC.tick(3);U.tap('KeyF');ZC.tick(60);if(!P.apple31)throw new Error('одиночный: Потап (оставленный) не поймал');
U.toKind('potap');P.face=Math.PI;U.goto(0,0,-255.8,2);P.face=Math.PI;U.tap('KeyF');ZC.tick(60);if(!Pe.apple31)throw new Error('одиночный: Пелагея (оставленная) не поймала');
U.toKind('pelageya');U.goto(0,0,-273.2,6);ZC.tick(40);if(!F.oak)throw new Error('одиночный: дуб не помолодел');'solo pass ok'
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;ZC.FIN.warp('guards');ZC.tick(60);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('yosha');const Y=H.yosha;Y.pos.set(1.2,0,-304);Y.vel.set(0,0,0);ZC.tick(3);U.goto(0,1.2,-358,14);ZC.tick(30);if(F.woke)throw new Error('одиночный: стража проснулась от Йоши');if(!F.quiet)throw new Error('одиночный: нет орешка за тишину');'solo guards ok'
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;ZC.FIN.warp('thieves');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
const TS=W.thieves31;TS.forEach(t=>{t.caught=false;if(!t.m.g.parent)W.group.add(t.m.g);});F.thieves=false;F.thiefRun=false;
U.toKind('yosha');ZC.tick(20);const Y=H.yosha;Y.pos.set(0,3,-406);Y.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');U.toKind('proshka');ZC.tick(20);const Pr=H.proshka;Pr.pos.set(0,3,-374);Pr.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(30);if(!Pr.lit||!Y.lit)throw new Error('перья не зажглись '+[Pr.lit,Y.lit]);
for(let i=0;i<60*150&&!F.thieves;i++){const t=TS.filter(q=>!q.caught).sort((a,b)=>Math.hypot(a.pos.x-Pr.pos.x,a.pos.z-Pr.pos.z)-Math.hypot(b.pos.x-Pr.pos.x,b.pos.z-Pr.pos.z))[0];if(!t)break;CHASE(0,t);ZC.tick(1);}U.rel(0);
if(!F.thieves)throw new Error('одиночный: воришки не пойманы '+F.thiefCount);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'solo thieves ok errs=0'
