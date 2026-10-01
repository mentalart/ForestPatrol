//@@
// релиз final06: эпилог — «Театр теней» (late_39). После ролика e1 Пелагея ставит фонарь, у героев — живые тени на стене.
// Вдвоём проходим четыре сценки: «Великаны» (тенью до звёзд), «Змей о трёх головах» (трое в круги + огонь по удару, оба игрока),
// «Жар-птица» (в ладошки — две тени с двух сторон, три пера), «Хоровод» (четверо вокруг Кощея, прыжок на хлопок — оба разом);
// затем — колыбельная Тишки (e2). Ни одна сценка не засчитана Тишкой по времени, ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.O=ZC.FIN.occ;O.fdt=0.05;window.gsync=()=>{const gl=O.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.E=ZC.FIN.epiTh;window.H=ZC.HERO;window.pk={};window.R=()=>E.dbg.rd();
window.put=(k,u,y)=>{const p=E.dbg.ideal(k,u,y),h=H[k];h.pos.set(p.x,0,p.z);h.vel.set(0,0,0);return p;};
window.till=(f,n)=>{let i=0;while(!f()&&i<(n||600)){ZC.tick(1);i++;}return i;};
window.snap=()=>{O.frame();gsync();};
// какие записи озвучки прозвучали (по кадрам)
window._vox=[];{const _t=ZC.tick;ZC.tick=n=>{for(let i=0;i<(n||1);i++){_t(1);const v=ZC.FIN.vox&&ZC.FIN.vox.cur;if(v&&v!==_vox[_vox.length-1])_vox.push(v);}};}
ZC.startFrom(ZC.LV('epi'));ZC.G.manual=true;ZC.G.flags.ending=['slushat'];ZC.FIN.vox.audio();ZC.tick(30);'lvl='+ZC.W.levelId
//@@ wait=800
// записи озвучки уровня декодируются между шагами — ролик e1 пропускаем уже после паузы
ZC.skip();ZC.tick(10);pk.intro=E.st;
['stage='+ZC.W.flags.stage,'intro='+pk.intro,'shadows='+E.px.length,'errs='+_errs.length+' '+(_errs[0]||'')]
//@@ shot=fin_epi_intro.png wait=300
// вступление: Пелагея поставила фонарь, свет притух, тени героев — на стене
till(()=>!ZC.G.cine||ZC.G.cine.t>6.0,600);snap();pk.introA=+E.uni.uA.value.toFixed(2);'uA='+pk.introA
//@@
ZC.skip();ZC.tick(100);['st='+E.st,'uA='+E.uni.uA.value.toFixed(2)]
//@@ shot=fin_epi_giant.png wait=300
// «Великаны»: Прошка и Потап — тенью до звёзд (встают ближе к фонарю)
const st=R().stars;put('pelageya',0,4.4);ZC.tick(10);pk.giantSay=E.stats.giant;put('pelageya',-2.4,1.2);put('yosha',2.0,1.0);put('proshka',st[0].u,st[0].y+0.25);ZC.tick(20);pk.star1=st.filter(s=>s.lit).length;put('potap',st[1].u,st[1].y+0.25);ZC.tick(12);snap();
pk.giant=st.filter(s=>s.lit).length;['lit after one='+pk.star1,'lit='+pk.giant,'S='+JSON.stringify(E.S.map(s=>[s.h.kind,+s.u.toFixed(1),+s.top.toFixed(1)]))]
//@@ shot=fin_epi_zmei_form.png wait=300
// «Змей о трёх головах»: трое — в круги, тени — головы
till(()=>E.st==='zmei',400);ZC.tick(30);const sl=R().slots;put('proshka',sl[0].u,sl[0].y);put('potap',sl[1].u,sl[1].y);put('pelageya',sl[2].u,sl[2].y);put('yosha',-5,4.5);
till(()=>R().formed,120);ZC.tick(20);snap();pk.formed=R().formed;['formed='+pk.formed,'held='+sl.map(s=>s.held?s.held.h.kind:'-').join(',')]
//@@ shot=fin_epi_zmei_fire.png wait=300
// огонь: оба игрока по два удара
ZC.press('KeyF');ZC.tick(14);ZC.press('Comma');ZC.tick(14);ZC.press('KeyF');ZC.tick(6);snap();pk.fire1=R().fire.slice();'fire='+pk.fire1
//@@ shot=fin_epi_zmei_fly.png wait=300
ZC.tick(10);ZC.press('Comma');ZC.tick(40);snap();pk.fly=R().fly;'fly='+pk.fly.toFixed(2)+' fire='+R().fire
//@@
till(()=>E.st==='bird',600);pk.rounds2=E.stats.rounds.join(',');['st='+E.st,'rounds='+pk.rounds2]
//@@ shot=fin_epi_bird_flee.png wait=300
// «Жар-птица»: все отошли за фонарь (теней нет) — птица садится; одна тень накрыла — вспорхнула и села у тени друга
window.away=()=>{['proshka','potap','pelageya','yosha'].forEach((k,i)=>{H[k].pos.set(-1.6+i*1.1,0,4.6);H[k].vel.set(0,0,0);});};away();
let B=R().B;till(()=>B.st==='perch',400);ZC.tick(55);pk.n0=R().n;const fu=B.u>0?B.u-2.6:B.u+2.6;put('pelageya',fu,2.9);ZC.tick(2);const f0=B.fl;put('potap',B.u,B.y+0.4);till(()=>B.fl>f0,90);till(()=>B.st==='perch',90);ZC.tick(4);snap();
const pel=E.dbg.shadow('pelageya');pk.flee=B.fl-f0;pk.fleeNear=+Math.abs(B.u-pel.u).toFixed(2);pk.fleeW=+pel.w.toFixed(2);
['n0='+pk.n0,'flees='+pk.flee,'bird u='+B.u.toFixed(1)+' y='+B.y.toFixed(1),'pel u='+pel.u.toFixed(1)+' w='+pel.w.toFixed(2)]
//@@ shot=fin_epi_bird_catch.png wait=300
// в ладошки: две тени с двух сторон — три пера
const r=[];for(let c=0;c<3&&R().n<3;c++){const B=R().B;till(()=>B.st==='perch',400);ZC.tick(5);put('potap',B.u-1.0,Math.min(3.4,B.y+0.7));put('pelageya',B.u+1.0,Math.min(3.4,B.y+0.7));const n0=R().n;till(()=>R().n>n0,60);r.push(R().n);if(c===0){ZC.tick(4);snap();}else ZC.tick(20);away();ZC.tick(2);}
pk.feathers=R().n;'catches='+r.join(',')
//@@ shot=fin_epi_bird_big.png wait=300
pk.catches=E.stats.catches;till(()=>R().def.id!=='bird'||!!R().big,200);ZC.tick(60);snap();pk.big=R().def.id==='bird'&&!!R().big;'catches='+pk.catches+' big bird='+pk.big
//@@
till(()=>E.st==='horo',600);pk.rounds3=E.stats.rounds.join(',');['st='+E.st,'rounds='+pk.rounds3]
//@@ shot=fin_epi_horo_form.png wait=300
// «Хоровод»: четверо в круги вокруг Кощея
ZC.tick(70);const sl=R().slots;put('proshka',sl[0].u,sl[0].y);put('potap',sl[1].u,sl[1].y);put('pelageya',sl[2].u,sl[2].y);put('yosha',sl[3].u,sl[3].y);ZC.tick(60);snap();
['ph='+R().ph,'held='+sl.map(s=>s.held?s.held.h.kind:'-').join(','),'ku='+R().ku.toFixed(2)]
//@@ shot=fin_epi_horo_beat.png wait=300
// на хлопок — оба прыгают разом (первый раз — один игрок: не засчитано)
const R4=R();const ev=()=>R4.n+R4.miss;let e0=ev();
till(()=>ZC.G.time>=R4.next-0.03,200);ZC.press('Space');till(()=>ev()>e0,90);pk.solo1=R4.n;pk.miss1=R4.miss;
for(let b=0;b<3;b++){e0=ev();till(()=>ZC.G.time>=R4.next-0.05,200);ZC.press('Space');ZC.press('KeyM');if(b===1){ZC.tick(10);snap();}till(()=>ev()>e0,90);}
['n='+R4.n,'one-player beat='+pk.solo1+' miss='+pk.miss1]
//@@ shot=fin_epi_horo_boy.png wait=300
ZC.tick(150);snap();const k=R().K;pk.boyScale=k.g.scale.y;['tr='+(R().tr||0).toFixed(1),'scale='+k.g.scale.y.toFixed(2),'ghosts='+E.ghosts.length]
//@@ shot=fin_epi_e2.png wait=300
// конец театра — колыбельная Тишки
till(()=>ZC.W.flags.stage==='e2c',900);ZC.tick(40);snap();pk.e2=ZC.W.flags.stage;pk.on=E.on;
['stage='+pk.e2,'on='+E.on,'camFn='+!!ZC.W.camFn,'custom='+!!ZC.W.custom,'forced='+E.stats.forced.join(','),'stats='+JSON.stringify(E.stats)]
//@@
const vn=[];for(let i=15;i<=29;i++)vn.push('epi_0'+i);pk.voxMiss=vn.filter(v=>!_vox.includes(v)).join(',');
const ok=pk.voxMiss===''&&pk.giantSay===1&&pk.intro==='intro'&&pk.introA>0.9&&pk.star1===1&&pk.giant===2&&pk.formed&&pk.fire1[0]===2&&pk.fire1[1]===1&&pk.fly>=0&&pk.n0===0&&pk.flee>=1&&pk.fleeNear<pk.fleeW+0.8&&pk.catches===3&&pk.big&&pk.solo1===0&&pk.miss1===1&&pk.boyScale<0.5&&pk.e2==='e2c'&&!pk.on&&!E.stats.forced.length&&E.stats.rounds.length===4;
[JSON.stringify(pk),'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),ok&&!_errs.length?'epitheatre ok':'FAIL epitheatre']
