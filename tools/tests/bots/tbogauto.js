//@@
// Богатырский выход (полная синяя шкала) включается сам, без Смены героя, сразу у обоих героев игрока; длительность вдвое больше прежней:
// Прошка и Потап — 12 с (было 6), Пелагея — 10 с (было 5), Йоша — вспышка 2 с (было 1). 1-2 (клубок есть) вдвоём, потом одним игроком
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(ZC.LV('1-2'));ZC.tick(30);ZC.skip();ZC.tick(20);
const H=ZC.HERO,P=ZC.players,W=ZC.W,G=ZC.G,r=[];
const ok=(c,m)=>{r.push((c?'ok ':'FAIL ')+m);};
const pw=h=>h.power&&h.power.t>0?h.power.t:0;
const near=(v,a,e)=>Math.abs(v-a)<=(e||0.2);
const bn=()=>document.getElementById('banner').innerHTML.replace(/<br\s*\/?>/g,' / ').replace(/<[^>]*>/g,'');
ok(W.abil.clew,'на уровне есть клубок, шкала включена');
ok(!P.some(p=>p.blue>0)&&HEROES4().every(h=>!pw(h)),'в начале шкала пуста, сил нет');
function HEROES4(){return['proshka','potap','pelageya','yosha'].map(k=>H[k]);}
// шкала первого игрока набралась — выход сам, на Прошку И Потапа; шкала второго не тронута
P[1].blue=0.5;P[0].blue=1;ZC.tick(3);
ok(P[0].blue===0,'шкала игрока 1 сброшена сама, Смену никто не жал: blue='+P[0].blue);
ok(near(pw(H.proshka),12)&&near(pw(H.potap),12),'Прошка и Потап — по 12 с: '+pw(H.proshka).toFixed(2)+' / '+pw(H.potap).toFixed(2));
ok(!pw(H.pelageya)&&!pw(H.yosha)&&P[1].blue===0.5,'второй игрок не задет, шкала 0.5');
ok(/Богатырский выход/.test(bn())&&/Прошка/.test(bn())&&/Потап/.test(bn()),'плашка называет обоих: «'+bn()+'»');
// смена героя силу не сбрасывает и не включает ничего заново: сила — и у того, кто вышел, и у того, кто ушёл
const a0=P[0].act;ZC.press('KeyQ');ZC.tick(5);
ok(P[0].act!==a0&&near(pw(H.proshka),pw(H.potap),0.2)&&pw(H.potap)>11.4,'после Смены сила у обоих на месте: '+pw(H.proshka).toFixed(2)+' / '+pw(H.potap).toFixed(2));
ZC.tick(60*6);
ok(pw(H.proshka)>5.2&&pw(H.proshka)<6.3,'через 6 с ещё около 6 с (раньше уже конец): '+pw(H.proshka).toFixed(2));
ZC.tick(60*6.5);
ok(pw(H.proshka)===0&&pw(H.potap)===0,'к 12,5 с силы вышли');
// шкала второго игрока: Пелагея 10 с и мороки медленнее 10 с, Йоша — лепесток всем
P[0].petals=1;P[1].petals=2;P[1].blue=1;ZC.tick(3);
ok(P[1].blue===0&&near(pw(H.pelageya),10)&&pw(H.yosha)>1.5&&pw(H.yosha)<=2,'Пелагея 10 с, Йоша 2 с: '+pw(H.pelageya).toFixed(2)+' / '+pw(H.yosha).toFixed(2));
ok(near(G.slowFoes,10,0.2),'мороки медленнее 10 с: '+G.slowFoes.toFixed(2));
ok(P[0].petals===2&&P[1].petals===3,'Йошин родник — по лепестку всем: '+P.map(p=>p.petals).join('/'));
ok(!pw(H.proshka)&&!pw(H.potap),'силы первого игрока вторым выходом не включились');
r.push('errs='+_errs.length+(_errs[0]?' '+_errs[0]:''));
r.join('\n')
//@@ reload=1
// одиночный режим: выход тоже сам и тоже на обоих героев того игрока, чья шкала полна
ZC.setSolo(true);ZC.startFrom(ZC.LV('1-2'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(20);
const H=ZC.HERO,P=ZC.players,r=[];const ok=(c,m)=>{r.push((c?'ok ':'FAIL ')+m);};
const pw=h=>h.power&&h.power.t>0?h.power.t:0;
P[0].blue=1;ZC.tick(3);
ok(P[0].blue===0&&pw(H.proshka)>11.5&&pw(H.potap)>11.5,'соло: Прошка и Потап по 12 с без Смены: '+pw(H.proshka).toFixed(2)+' / '+pw(H.potap).toFixed(2));
ok(!pw(H.pelageya)&&!pw(H.yosha),'герои второго игрока без силы');
ZC.setSolo(false);
r.join('\n')
