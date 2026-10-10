//@@
// 1-2 «Кикиморино болото», туман после свадьбы Журавля и Цапли: нить над трясиной тонет — одной нитью в 15 м с берега на первый островок не перебраться
// (раньше groundAt считал опорой саму летящую нить, и туман проходили без огоньков); подсказка второго игрока по ходу тумана: пока тропа не открыта — «жди»,
// есть неполитая засохшая кочка — «Полей…», тропа открыта и поливать нечего — «прыгай по кочкам»; кнопки в строке — свои у каждого игрока
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(3);ZC.tick(30);ZC.skip();ZC.tick(20);
window.H=ZC.HERO;window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
window.SW=()=>ZC.W.sw12;window.F=()=>ZC.W.flags;
// закладки по пути (как в t12long): за толстой струной, у избушки Журавля, берег Цапли; свадьба «сыграна», камыши расступились
['proshka','potap'].forEach((k,i)=>put(H[k],-1.2-i*1.2,-77.5));['pelageya','yosha'].forEach((k,i)=>put(H[k],1.2+i*1.2,-77.5));ZC.tick(60);
['proshka','potap'].forEach((k,i)=>put(H[k],-2.6-i*1.2,-87.5));['pelageya','yosha'].forEach((k,i)=>put(H[k],-1.2+i*1.2,-87.0));ZC.tick(60);
F().wed.stage='done';SW().reedCol.on=false;
['proshka','potap'].forEach((k,i)=>put(H[k],-2.6-i*1.2,-145));['pelageya','yosha'].forEach((k,i)=>put(H[k],-1.2+i*1.2,-145));ZC.tick(60);
['proshka','potap'].forEach((k,i)=>put(H[k],-2.6-i*1.2,-154.6));['pelageya','yosha'].forEach((k,i)=>put(H[k],-1.2+i*1.2,-154.6));ZC.tick(60);
window.st=()=>U.st()+' falls='+ZC.G.stats.falls+' errs='+_errs.length+(_errs[0]?' '+_errs[0]:'');
const S=SW(),h=H.proshka,r=[];
// Прошка у самой кромки берега, нить вперёд — через туман до первого островка 14,7 м, а нить 15 м
put(h,0,-155.6);ZC.tick(20);r.push('edge z='+h.pos.z.toFixed(2)+' g='+h.grounded);
h.face=Math.PI;ZC.press('KeyR');ZC.tick(60);
const t=ZC.W.threads.filter(q=>q.owner===0);r.push('threads='+t.length+' '+t.map(q=>'len='+q.len.toFixed(1)).join(';'));
const short=t.length===0||t[0].len<3;r.push('нить утонула (короче 3 м)='+short,'tip='+!!F().fogTold);
const f0=ZC.G.stats.falls;r.push(U.walkTo(0,0,-171.8,6));
const over=h.pos.z<-170.7&&h.pos.z>-173.7&&h.pos.y>-0.5;r.push('перебрался на островок='+over,'falls+'+(ZC.G.stats.falls-f0));
r.push(short&&!over?'ТУМАН НЕ ПРОЙТИ НИТЬЮ: ok':'БАГ: туман пройден нитью');
r.join(' ')+' | '+st()
//@@
// подсказка второго игрока по ходу тумана (краткая строка карточки и полный текст): ждёт, пока Прошка щёлкнет огонёк; тропа открыта — прыгай;
// на открытой тропе есть неполитая засохшая кочка — полей; перешёл на островок — снова ждёт следующей развилки
const S=SW(),fk=S.forks,r=[];const FIN=ZC.FIN;
const o=ZC.W.objectives[1].find(x=>x&&FIN.taskShort.guard(typeof x.text==='function'?x.text():x.text)==='туман огоньки манят в трясину прошка щёлкнет');
const plain=s=>String(s).replace(/<kbd>[\s\S]*?<\/kbd>|<span class="pb [^"]*">[\s\S]*?<\/span>/g,'[К]').replace(/<[^>]*>/g,'').replace(/\s+/g,' ');
const ok=(c,m)=>{r.push((c?'ok ':'FAIL ')+m);};
const at=z=>['pelageya','yosha'].forEach(k=>put(H[k],0,z));
const sh=()=>plain(o.short(1)),tx=()=>plain(o.text());
ok(!!o&&typeof o.short==='function','задача тумана второго игрока найдена, краткая строка есть');
fk.forEach(f=>{f.open=false;if(f.dry)f.dry.dry=true;});at(-154.6);
ok(/Прошка щёлкает огонёк/.test(sh())&&!/засохшую/.test(sh()),'на берегу, тропы закрыты: «жди», про кочку ни слова — «'+sh()+'»');
ok(/не бросай/.test(tx())&&!/полей/i.test(tx()),'полный текст: нить тонет, поливать пока нечего — «'+tx()+'»');
fk[0].open=true;
ok(/Тропка всплыла/.test(sh())&&/прыгай по кочкам/.test(tx()),'первая тропа открыта (засохшей кочки нет): «прыгай» — «'+sh()+'» / «'+tx()+'»');
at(-172.0);
ok(/Прошка щёлкает огонёк/.test(sh()),'перешёл на первый островок, вторая тропа закрыта: снова «жди» — «'+sh()+'»');
fk[1].open=true;
ok(/Полей засохшую кочку/.test(sh())&&/\[К\]/.test(sh())&&/засохшую кочку полей/.test(tx()),'вторая тропа открыта, кочка засохла: «Полей» с кнопкой — «'+sh()+'» / «'+tx()+'»');
fk[1].dry.dry=false;
ok(/Тропка всплыла/.test(sh()),'кочка полита, герой ещё на берегу тропы: «прыгай» — «'+sh()+'»');
at(-190.0);
ok(/Прошка щёлкает огонёк/.test(sh()),'перешёл на второй островок, третья тропа закрыта: «жди» — «'+sh()+'»');
fk[2].open=true;fk[3].open=true;fk[3].dry.dry=true;at(-207.5);
ok(/Полей засохшую кочку/.test(sh()),'четвёртая тропа открыта, кочка засохла: «Полей» — «'+sh()+'»');
fk[3].dry.dry=false;at(-222.5);
ok(/Тропка всплыла/.test(sh()),'все тропы открыты, всё полито: «прыгай» — «'+sh()+'»');
// кнопки в строке — того игрока, кому показана карточка: Йоша (;) отличается от Прошки (R/E)
fk[3].dry.dry=true;at(-207.5);const kb1=o.short(1),kb0=o.short(0);ok(kb1!==kb0,'кнопка в «Полей» своя у каждого игрока');
// у первого игрока — своя строка про огоньки и тоже без лишнего
const o0=ZC.W.objectives[0].find(x=>x&&x.short&&FIN.taskShort.guard(typeof x.text==='function'?x.text():x.text)==='туман огоньки манят в трясину который настоящий');
ok(!!o0&&/огонёк/.test(plain(o0.short(0)))&&/рогаткой/.test(plain(o0.short(0))),'первый игрок: «'+(o0?plain(o0.short(0)):'нет')+'»');
const o8=ZC.W.objectives[0].find(x=>x&&x.short&&/Найди стрелу/.test(plain(x.short(0))));
ok(!!o8&&/ольхе/.test(plain(o8.short(0))),'первый игрок, стрела: «'+(o8?plain(o8.short(0)):'нет')+'»');
r.join(' ; ')+' | errs='+_errs.length+(_errs[0]?' '+_errs[0]:'')
