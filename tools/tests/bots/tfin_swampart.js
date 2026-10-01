//@@
// кадры новых участков 1-2 «Кикиморино болото» для просмотра арта (не в регрессе; лучше с URLQ='&hq=1'): Журавль идёт по гати, Паутинник грызёт струну;
// огоньки в тумане и всплывшая тропа; Царевна-лягушка и кувшинки в лад; бесёнок у омута; Потап поднимает колоду
U.go();ZC.loadLevel(3);ZC.tick(30);ZC.skip();ZC.tick(20);window.H=ZC.HERO;window.SW=()=>ZC.W.sw12;window.F=()=>ZC.W.flags;
window.put=(k,x,z,y)=>{H[k].pos.set(x,(y||0)+0.3,z);H[k].vel.set(0,0,0);H[k].following=false;};window.face=(k,x,z)=>{H[k].face=Math.atan2(x-H[k].pos.x,z-H[k].pos.z);};
// гать: четыре струны (вручную — как будто перекинули), Журавль на второй, у второй кочки Паутинник
const S=SW(),G=S.GS;const mk=(pi,from,st)=>{const h=ZC.players[pi].heroes[ZC.players[pi].act];h.pos.set(from[0],from[1]+0.3,from[2]);h.vel.set(0,0,0);ZC.tick(2);h.face=Math.atan2(st.x-h.pos.x,st.z-h.pos.z);ZC.press(pi?'Semicolon':'KeyR');ZC.tick(40);return !!st.used;};
const r=[mk(0,[-1.6,0,-89.6],G[0]),mk(0,[-1.4,0.3,-102.6],G[1]),mk(0,[1.4,0.3,-115.1],G[2]),mk(1,[-1.4,0.3,-127.6],G[3])];
put('proshka',-1.2,-120.5,0.3);put('potap',-2,-121.5,0.3);put('pelageya',0.6,-143,0);put('yosha',1.6,-143.5,0);ZC.tick(120);
r.push('stage='+F().wed.stage);put('proshka',-1.0,-102.6,0.3);put('potap',-2.2,-101.4,0.3);put('pelageya',-0.4,-101.2,0.3);put('yosha',-2.4,-102.8,0.3);ZC.tick(10);
let n=0;while(F().wed.seg<1&&n<60*40){ZC.tick(1);n++;}for(let i=0;i<200;i++)ZC.tick(1);face('proshka',2.6,-108);face('pelageya',2.6,-108);ZC.tick(60);r.push('seg='+F().wed.seg,'falls='+ZC.G.stats.falls);r
//@@ shot=swamp_crane.png
ZC.tick(2);
//@@
// туман: ложный огонёк уже лопнул, настоящий поднял тропу
const S=SW(),f=S.forks[0];F().wed.stage='done';put('proshka',0.5,-154.5);put('potap',-1.2,-153.8);put('pelageya',2.2,-153.6);put('yosha',3.2,-154);face('proshka',6,-163);ZC.tick(30);
const fake=f.wisps.find(w=>!w.real);H.proshka.face=Math.atan2(fake.base.x-H.proshka.pos.x,fake.base.z-H.proshka.pos.z);ZC.press('KeyE');ZC.tick(50);
const real=f.wisps.find(w=>w.real);H.proshka.face=Math.atan2(real.base.x-H.proshka.pos.x,real.base.z-H.proshka.pos.z);ZC.press('KeyE');ZC.tick(150);['open='+f.open]
//@@ shot=swamp_fog.png
ZC.tick(2);
//@@
// пруд: стрела сбита, кувшинки в лад
const S=SW();put('proshka',-5.5,-238.4);put('potap',-6.5,-237.4);put('pelageya',0.5,-238.6);put('yosha',1.6,-238.6);ZC.tick(20);face('proshka',S.arrow.position.x,S.arrow.position.z);ZC.press('KeyE');ZC.tick(150);
put('pelageya',PD=S.PADS[2].col.x,S.PADS[2].col.z,0.1);ZC.tick(80);['sing='+F().frog.sing]
//@@ shot=swamp_frog.png
ZC.tick(2);
//@@
// омут: бесёнок зовёт наперегонки, струна через омут
const S=SW();put('proshka',0,-294.4);put('potap',-1.5,-292.5);put('pelageya',2.5,-296.5);put('yosha',3.5,-295.5);ZC.tick(60);
const h=H.pelageya;ZC.players[1].act=ZC.players[1].heroes.indexOf(h);put('pelageya',0,-297.8);face('pelageya',S.finStake.x,S.finStake.z);ZC.press('Semicolon');ZC.tick(60);put('pelageya',0.3,-303,0.3);ZC.tick(20);['string='+!!S.finStake.used]
//@@ shot=swamp_imp.png
ZC.tick(2);
