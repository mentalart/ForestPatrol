//@@ wait=1500
// релиз final06: 1-4 «Леший водит» — Аука-Перекличка вдвоём (late_99zg_auka14.js): мирная игра «повтори за мной», без боя.
// Ролик-знакомство → песенка 1: нарочно ошибаемся (не то дупло) — «Хи-хи! Не так!», Аука поёт снова; ещё одна ошибка — следующее дупло
// подсказывается; потом повторяем верно, по очереди: Прошка (Игрок 1) — нечётные «ау», Пелагея (Игрок 2) — чётные. Песенки 2–3 — верно.
// Ролик-дружба, ворота открыты, выход — уровень пройден. Проверяется и то, что «ау» во время показа не засчитывается.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.setSolo(false);ZC.startFrom(ZC.LV('1-4'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(5);ZC.FIN.warp('arena');ZC.tick(10);
window.A=()=>ZC.W.k14.auka;window.D=()=>A().dbg();
// подойти героем игрока pi в круг дупла i и аукнуть
window.NOTE=(pi,i)=>{const q=D().HL[i];let ok=false;for(let k=0;k<60*10;k++){if(U.step(pi,q.mx,q.mz,0.5)){ok=true;break;}ZC.tick(1);}U.rel(pi);ZC.tick(2);ZC.press(pi?'Digit0':'Digit1');ZC.tick(6);return ok;};
window.SONG=()=>{const d=D();for(let k=d.pos;k<d.need;k++){NOTE(k%2,D().seq[k]);}ZC.tick(10);return D().st;};
U.goto(0,0,-196,5);ZC.tick(5);const c=!!ZC.G.cine;U.nocine();ZC.tick(10);
['cine='+c,'ph='+A().ph,'st='+D().st,A().ph===1?'intro ok':'FAIL intro']
//@@
// песенка 1: «ау» во время показа — «Тсс!» (не считается); ошибка — Аука поёт снова; две ошибки — подсказка; потом верно
const r=[];r.push('show '+U.until(()=>D().st==='show',4));const p0=D().pos;ZC.press('Digit1');ZC.tick(6);r.push('pos during show='+D().pos);
r.push('play '+U.until(()=>D().st==='play',15),'seq='+D().seq.join(''),'need='+D().need);
const wrong=(D().seq[0]+1)%4;NOTE(0,wrong);r.push('st='+D().st,'miss='+D().miss);const m1=D().miss===1;
r.push('replay '+U.until(()=>D().st==='play',15));NOTE(0,(D().seq[0]+2)%4);const m2=D().miss===2;r.push('play2 '+U.until(()=>D().st==='play',15));
const hint=D().HL.findIndex(q=>q.hint);r.push('hint='+hint+' want='+D().seq[0]);
const st=SONG();r.push('song1 st='+st,'r='+D().r);
r.push(m1&&m2&&hint===D().seq[0]&&(st==='ok'||D().r===1)?'song1 ok':'FAIL song1');r
//@@
// песенки 2 и 3 — верно, по очереди
const r=[];for(let s=0;s<2;s++){r.push('play '+U.until(()=>D().st==='play',25),'need='+D().need);const st=SONG();r.push('st='+st+' r='+D().r);}
r.push(U.until(()=>ZC.G.cine,6));const c=!!ZC.G.cine;U.nocine();ZC.tick(20);
r.push('cine='+c,'ph='+A().ph,'cleared='+ZC.W.k14.arena.cleared,A().ph===4&&ZC.W.k14.arena.cleared?'songs ok':'FAIL songs ph='+A().ph+' st='+D().st);r
//@@
// выход из леса
const u=U.goto(0,0,-220,12,0.5);ZC.tick(20);['out '+u,'out='+!!ZC.W.flags.out,'lv='+ZC.W.levelId,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(ZC.W.flags.out||ZC.W.levelId!=='1-4')&&!_errs.length?'auka14 ok':'FAIL auka14']
