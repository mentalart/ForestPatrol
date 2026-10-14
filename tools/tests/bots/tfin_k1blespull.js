//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник», урок «Хоровод», шаг «Тяни-потяни» — счёт «раз… два… ТРИ!» виден в кадре, герои бьют на «три».
// Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.KB=ZC.FIN.k1b;window.S=KB.s3;window.L=ZC.FIN.lesson;
W.bossNext();ZC.tick(60*3);ZC.skip();ZC.tick(60*3);
window.find=()=>{const real=W.doubles.find(d=>d.real),dh=W.hittables.find(q=>q.r===20);real.state='fallen';U.act(0).pos.set(real.pos.x+1,0,real.pos.z);dh.onHit({d:{range:2},pos:U.act(0).pos,player:0});return real;};
find();ZC.tick(60*4);find();ZC.tick(60*4);window.s0=L.steps;window.tillStep=n=>{let k=0;while(L.steps<s0+n&&k<60*40){ZC.tick(1);k++;}return k;};
'phase='+W.flags.phase+' lesson='+L.on
//@@ shot=k1blp_s1.png
window.hp=()=>{const C=KB.cur.C;return [0,1].map(pi=>{const h=U.act(pi);return (h.pos.x-C.x).toFixed(1)+','+(h.pos.z-C.z).toFixed(1);}).join(' / ');};
tillStep(2);ZC.tick(60*2.5);'s1: steps='+(L.steps-s0)+' t='+ZC.G.cine.t.toFixed(2)+' heroes '+hp()
//@@ shot=k1blp_s2a.png
// «Тяни-потяни»: на первое «ТРИ!» (через 1,9 с) герои бьют сами — показ; в карточке строка из трёх кружков, все горят
tillStep(3);ZC.tick(60*2.0);const D=KB.les.D,row=document.querySelector('#finTut .k1c-row'),lit=row?[...row.querySelectorAll('.k1c')].filter(e=>/gradient/.test(e.style.background)).length:-1,atk=[0,1].map(pi=>U.act(pi).atkT.toFixed(2));
if(!D||!D.demo||!(U.act(0).atkT>0&&U.act(1).atkT>0))throw new Error('FAIL: нет показа удара на «ТРИ!» demo='+(D&&D.demo)+' atk='+atk);
if(!row||row.querySelectorAll('.k1c').length!==3||lit!==3)throw new Error('FAIL: кружков счёта в карточке нет: lit='+lit);
's2: demo='+D.demo+' atk='+atk+' lit='+lit+' heroes '+hp()
//@@ shot=k1blp_s2b.png
// никто не жмёт: через 8 с ожидания — показ («Смотри — вот так!»), Леший закружился
ZC.tick(60*9.5);const D=KB.les.D;if(!D||D.spin<0)throw new Error('FAIL: Леший не закружился после показа spin='+(D&&D.spin));'spin='+D.spin.toFixed(2)+' autos='+L.autos
//@@
ZC.tick(60*4);if(L.on)throw new Error('FAIL: урок не кончился');'lesson='+L.on+' st='+S.st+' Lrot.z='+KB.cur.L.g.rotation.z+' errs='+_errs.length
//@@ shot=k1blp_game.png wait=600
// бой: витки набраны — ленты натянулись, на экране кружки «Раз · Два · ТРИ!»; к «ТРИ!» окно открыто
S.prog=S.base.map(b=>b+S.need*Math.PI*2+0.05);ZC.tick(3);if(S.st!=='pull')throw new Error('FAIL: нет «Тяни-потяни» st='+S.st);
ZC.tick(Math.round(60*2.0));const hud=document.getElementById('k1bCount');
if(!hud||hud.style.opacity!=='1'||hud.querySelectorAll('.k1c').length!==3)throw new Error('FAIL: счётчика на экране нет');
'pull: beat='+S.beat+' pt='+S.pt.toFixed(2)+' hot='+!!hud.querySelector('.k1c-hot')+' text='+hud.textContent.slice(0,60)
//@@
// оба жмут удар на «ТРИ!» — Леший закружился (мах), счётчик спрятан
const ks=[0,1].map(pi=>U.K[U.pk(pi)].a);while(S.pt<2.3)ZC.tick(1);ks.forEach(k=>ZC.press(k));ZC.tick(2);ZC.tick(30);const hud=document.getElementById('k1bCount');
if(S.st!=='mah')throw new Error('FAIL: удар вдвоём на «ТРИ!» не сработал st='+S.st);if(hud.style.opacity!=='0')throw new Error('FAIL: счётчик не спрятался');
'st='+S.st+' pulls='+S.pulls+' errs='+_errs.length+' '+(_errs[0]||'')
