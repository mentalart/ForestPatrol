//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник», урок «Хоровода» выглядит, как бой: шаг «Прыжок» — скакалка и корни-подножки; шаг «Тяни-потяни» — тот же счётчик на экране, что в бою
// (кружки «Раз · Два · ТРИ!», кто ударил), «раз» 0,9 с · «два» 1,6 · «ТРИ!» 2,3, окно как в бою; первый счёт — показ, удар не в окно не считается; шаг «Богатырский мах» — подбегают, бьют вдвоём.
// Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.KB=ZC.FIN.k1b;window.S=KB.s3;window.L=ZC.FIN.lesson;
W.bossNext();ZC.tick(60*3);ZC.skip();ZC.tick(60*3);
window.find=()=>{const real=W.doubles.find(d=>d.real),dh=W.hittables.find(q=>q.r===20);real.state='fallen';U.act(0).pos.set(real.pos.x+1,0,real.pos.z);dh.onHit({d:{range:2},pos:U.act(0).pos,player:0});return real;};
find();ZC.tick(60*4);find();ZC.tick(60*4);window.s0=L.steps;window.tillStep=n=>{let k=0;while(L.steps<s0+n&&k<60*40){ZC.tick(1);k++;}return k;};
window.hp=()=>{const C=KB.cur.C;return [0,1].map(pi=>{const h=U.act(pi);return (h.pos.x-C.x).toFixed(1)+','+(h.pos.z-C.z).toFixed(1);}).join(' / ');};
window.ks=[0,1].map(pi=>U.K[U.pk(pi)].a);window.hud=()=>{const d=document.getElementById('k1bCount');return d&&d.style.opacity==='1'?d:null;};
'phase='+W.flags.phase+' lesson='+L.on
//@@ shot=k1blp_s1.png
// шаг «Прыжок»: под героями белый круг — корень встаёт, герои в прыжке
tillStep(2);ZC.tick(Math.round(60*2.4));const D=KB.les.D;
if(!D||D.roots.length!==2||!D.roots.every(r=>r.up))throw new Error('FAIL: корней-подножек в уроке нет: '+(D&&D.roots.map(r=>r.up)));
const ys=[0,1].map(pi=>U.act(pi).pos.y-D.y0[pi]);if(!ys.every(y=>y>0.2))throw new Error('FAIL: герои не прыгнули над корнем '+ys);
's1: корни='+D.roots.length+' прыжок='+ys.map(y=>y.toFixed(2))+' heroes '+hp()
//@@ shot=k1blp_s2a.png
// «Тяни-потяни»: счётчик на экране, как в бою; на первое «ТРИ!» (2,3 с) герои бьют сами — показ, оба ✓, фонарики на счёт
tillStep(3);ZC.tick(Math.round(60*2.45));const D=KB.les.D,h=hud(),lit=h?[...h.querySelectorAll('.k1c')].filter(e=>/gradient/.test(e.style.background)).length:-1,atk=[0,1].map(pi=>U.act(pi).atkT.toFixed(2));
if(!D.hs||!D.hs.demo||!(U.act(0).atkT>0&&U.act(1).atkT>0))throw new Error('FAIL: нет показа удара на «ТРИ!» atk='+atk);
if(!h||h.querySelectorAll('.k1c').length!==3||lit!==3||(h.textContent.match(/✓/g)||[]).length!==2)throw new Error('FAIL: счётчика на экране нет или не горит: lit='+lit+' '+(h&&h.textContent));
if(document.querySelector('#finTut .k1c-row'))throw new Error('FAIL: кружки в карточке — должно быть как в бою, на экране');
const lamps=(KB.fx.lamps||[]).length;
's2 показ: lit='+lit+' text='+h.textContent.slice(0,50)+' фонарики='+lamps
//@@
// счёт для игроков: удар рано («раз») не считается — как в бою
let k=0;while(KB.les.D.hs.demo&&k<300){ZC.tick(1);k++;}const P=KB.les.D.hs;while(P.pt<1.0)ZC.tick(1);ks.forEach(c=>ZC.press(c));ZC.tick(2);
if(P.press[0]!=null||P.press[1]!=null)throw new Error('FAIL: удар на «раз» засчитан '+P.press);
while(P.pt>0.5)ZC.tick(1);'рано — мимо, счёт снова: fails='+P.fails
//@@ shot=k1blp_s2b.png
// оба жмут на «ТРИ!» — Леший закружился
const P=KB.les.D.hs;while(P.pt<2.3)ZC.tick(1);ks.forEach(c=>ZC.press(c));ZC.tick(3);const D=KB.les.D;if(D.spin<0)throw new Error('FAIL: удар вдвоём на «ТРИ!» не сработал press='+P.press);
ZC.tick(40);'spin='+D.spin.toFixed(2)+' autos='+L.autos
//@@ shot=k1blp_s3.png
// шаг «Богатырский мах»: герои у пня, оба бьют — мах, ленты сматываются
tillStep(4);ZC.tick(70);const D=KB.les.D,C=KB.cur.C,rr=[0,1].map(pi=>Math.hypot(U.act(pi).pos.x-C.x,U.act(pi).pos.z-C.z));if(!rr.every(r=>r<3.6))throw new Error('FAIL: герои не подбежали к пню '+rr);
ks.forEach(c=>ZC.press(c));ZC.tick(4);if(!D.mah)throw new Error('FAIL: мах не случился');ZC.tick(40);'mah ok r='+rr.map(r=>r.toFixed(1))
//@@
ZC.tick(60*4);if(L.on)throw new Error('FAIL: урок не кончился');const C=KB.cur.C,rr=[0,1].map(pi=>Math.hypot(U.act(pi).pos.x-C.x,U.act(pi).pos.z-C.z));
if(!rr.every(r=>r>4))throw new Error('FAIL: герои после урока не на дорожке '+rr);if(hud())throw new Error('FAIL: счётчик остался после урока');
'lesson='+L.on+' st='+S.st+' Lrot.z='+KB.cur.L.g.rotation.z+' r='+rr.map(r=>r.toFixed(1))+' errs='+_errs.length
//@@ shot=k1blp_game.png wait=600
// бой: витки набраны — ленты натянулись, на экране кружки «Раз · Два · ТРИ!»; к «ТРИ!» окно открыто
S.prog=S.base.map(b=>b+S.need*Math.PI*2+0.05);ZC.tick(3);if(S.st!=='pull')throw new Error('FAIL: нет «Тяни-потяни» st='+S.st);
ZC.tick(Math.round(60*2.0));const h=hud();
if(!h||h.querySelectorAll('.k1c').length!==3)throw new Error('FAIL: счётчика на экране нет');
'pull: beat='+S.beat+' pt='+S.pt.toFixed(2)+' hot='+!!h.querySelector('.k1c-hot')+' text='+h.textContent.slice(0,60)
//@@
// оба жмут удар на «ТРИ!» — Леший закружился (мах), счётчик спрятан
while(S.pt<2.3)ZC.tick(1);ks.forEach(k=>ZC.press(k));ZC.tick(2);ZC.tick(30);const d=document.getElementById('k1bCount');
if(S.st!=='mah')throw new Error('FAIL: удар вдвоём на «ТРИ!» не сработал st='+S.st);if(d.style.opacity!=='0')throw new Error('FAIL: счётчик не спрятался');
if(_errs.length)throw new Error('ошибки: '+_errs.join(' | '));
'st='+S.st+' pulls='+S.pulls+' errs='+_errs.length