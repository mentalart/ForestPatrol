//@@
// 3-Б «Соловей-Разбойник»: подход «Прямоезжая дорожка» вдвоём настоящими нажатиями (docs/26_solovei_boss.md)
// свист сдувает стоящих на открытом (за щитом Потапа и за камнем — устоять); колода — Потап; травы — Йоша поливает тропку;
// лепестки и деревья — мосты после свиста; подворотня — Потап держит, плита держит для Потапа; облачка тают; уступы дуба-сторожа; калитка в ободе
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,200));_ce.apply(console,arguments);};}
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(40);window.D=ZC.W.dbg3b();window.RD=D.RD;window.H=ZC.HERO;window.Y=-8;
const r=['cine='+!!ZC.G.cine];U.cine(600);ZC.tick(5);r.push(U.toKind('potap',0),U.toKind('pelageya',1));
// идти обоим к точке; на трель свиста — Потап щит, друг за ним
window.WALK=(x,z,max,o)=>{o=o||{};let t=0;const n=(max||20)*60;for(;t<n;t++){const P=U.act(0),Q=U.act(1);
    if((RD.tellOn||RD.wave)&&!o.noHide){ZC.hold('KeyG',P.kind==='potap');U.rel(0);if(P.kind==='potap'){const dz=Q.pos.z-(P.pos.z+1.1);U.step(1,P.pos.x,P.pos.z+1.1,0.3);}else U.rel(1);ZC.tick(1);continue;}
    ZC.hold('KeyG',false);const a=U.step(0,x+(o.dx0||0),z,o.tol||0.6),b=U.step(1,x+(o.dx1||0),z+(o.dz1!=null?o.dz1:1.2),o.tol||0.6);
    for(const pi of[0,1]){const h=U.act(pi);for(const L of RD.logs){if(L.on&&Math.abs(h.pos.z-L.z)<2.2&&L.z<h.pos.z&&h.grounded)ZC.press(U.K[pi].j);}}
    if(a&&b)break;ZC.tick(1);}
  U.rel(0);U.rel(1);ZC.hold('KeyG',false);return t>=n?'TIMEOUT@'+U.act(0).pos.z.toFixed(1)+'/'+U.act(1).pos.z.toFixed(1):'ok';};
r.push(_errs.length);r.join(' ')
//@@
// 1 колода: Потап откатывает; 2 травы: Йоша поливает тропку
const r=[];r.push(WALK(0,153.9,25));r.push('log='+RD.bigLog.done);U.act(0).face=Math.PI;ZC.press('KeyE');ZC.tick(30);r.push('log='+RD.bigLog.done);
r.push(U.toKind('yosha',1));r.push(WALK(0,140,20,{dz1:0.4}));U.act(1).face=Math.PI;ZC.press('KeyL');ZC.tick(40);r.push('path='+RD.path);
r.push(WALK(0,122.4,30));r.push('z='+U.act(0).pos.z.toFixed(1)+'/'+U.act(1).pos.z.toFixed(1),'pushes='+RD.n,'errs='+_errs.length);if(!RD.bigLog.done||!RD.path)throw new Error('колода/тропка: '+r.join(' | '));r.join(' | ')
//@@ shot=k3b_1.png
ZC.tick(1);
//@@
// 3 лепестки: после свиста — по лепесткам; 4 деревья: после свиста — по стволам
const r=[];let t=0;r.push(U.toKind('pelageya',1));
for(let k=0;k<3&&(U.act(0).pos.z>109||U.act(1).pos.z>109);k++){r.push(WALK(0,122,8));r.push(U.until(()=>RD.petT>3.3,16));r.push(WALK(0,108.4,6,{noHide:true}));r.push('z='+U.act(0).pos.z.toFixed(1)+'/'+U.act(1).pos.z.toFixed(1));}
r.push(WALK(0,104.3,8));
for(let k=0;k<3&&(U.act(0).pos.z>96||U.act(1).pos.z>96);k++){r.push(WALK(-2.4,104.4,8,{dz1:0.6}));r.push(U.until(()=>RD.TREES[0].col.on,16));r.push(WALK(-2.4,93.6,6,{noHide:true,dx1:0,dz1:0.8,tol:0.5}));r.push('z='+U.act(0).pos.z.toFixed(1)+'/'+U.act(1).pos.z.toFixed(1));}
r.push('errs='+_errs.length);if(U.act(0).pos.z>95||U.act(1).pos.z>95)throw new Error('мосты: '+r.join(' | '));r.join(' | ')
//@@ shot=k3b_2.png
ZC.tick(1);
//@@
// 5 застава: Потап держит подворотню, друг проходит и встаёт на плиту — держит для Потапа
const r=[];r.push(WALK(-4.6,83.7,14,{dx1:4.6,dz1:2}));U.act(0).face=Math.PI;ZC.press('KeyE');ZC.tick(20);r.push('holder='+!!RD.gate.holder);ZC.tick(40);r.push('open='+RD.gate.open);
r.push(U.goto(1,4.4,79.8,10,0.4));ZC.tick(30);r.push('plate open='+RD.gate.open);r.push(U.goto(0,0,78,10,0.6));r.push('z='+U.act(0).pos.z.toFixed(1)+'/'+U.act(1).pos.z.toFixed(1),'pillows='+(RD.pilTold?1:0),'dau='+RD.dauGone);
if(U.act(0).pos.z>79)throw new Error('застава: '+r.join(' | '));r.join(' | ')
//@@
// 6 облачные островки: прыжками; растаяло — к колокольчику и снова
const r=[];const ISL=[[-1.4,67.2],[1.2,63.9],[-1.2,60.6],[1.4,57.3]];let tries=0;
for(const pi of[0,1]){for(let k=0;k<6&&U.act(pi).pos.z>53;k++){tries++;U.goto(pi,0,71,8,0.6);(U.until(()=>!!RD.wave,16),U.until(()=>!RD.wave,8));for(const[x,z]of ISL){const h=U.act(pi);for(let i=0;i<90;i++){const far=!U.step(pi,x,z,0.5);if(far&&h.grounded&&Math.hypot(h.pos.x-x,h.pos.z-z)<3.6&&Math.hypot(h.pos.x-x,h.pos.z-z)>1.6)ZC.press(U.K[pi].j);if(!far)break;ZC.tick(1);}U.rel(pi);if(h.pos.y<Y-1)break;}
    if(U.act(pi).pos.y>=Y-0.5){const h=U.act(pi);for(let i=0;i<90&&h.pos.z>52.5;i++){U.step(pi,0,51,0.5);if(h.grounded&&h.pos.z<56.6&&h.pos.z>55.4)ZC.press(U.K[pi].j);ZC.tick(1);}U.rel(pi);}
    if(U.act(pi).pos.z>53)ZC.tick(80);}}
r.push('cp='+ZC.players.map(p=>p.cp.z.toFixed(1)).join('/'),'y='+U.act(0).pos.y.toFixed(1)+'/'+U.act(1).pos.y.toFixed(1),'tries='+tries,'z='+U.act(0).pos.z.toFixed(1)+'/'+U.act(1).pos.z.toFixed(1),'errs='+_errs.length);if(U.act(0).pos.z>53||U.act(1).pos.z>53)throw new Error('островки: '+r.join(' | '));r.join(' | ')
//@@ shot=k3b_3.png
ZC.tick(1);
//@@
// 7 дуб-сторож: уступы зигзагом; середина уступа — за стволом: ждать там, пока свист пройдёт, потом — через открытый край на следующий
const r=[];const WP=[[-7.2,44.4],[0,42,1],[7.4,42],[7.6,39],[0,39,1],[-7.4,39],[-7.6,36],[0,36,1],[7.4,36],[7.6,33],[0,33,1],[-7.4,33],[-8,30],[-8,10],[0,3]];let falls=0,waits=0;
for(const pi of[0,1]){let wi=0;for(let s=0;s<60*120&&wi<WP.length;s++){const h=U.act(pi);const[x,z,wait]=WP[wi];
    if(h.pos.y<-7.6&&wi>1&&h.pos.z<44.5){falls++;wi=0;continue;}
    if(U.step(pi,x,z,0.45)){const md=Math.hypot(h.pos.x-0,h.pos.z+14);if(wait&&(RD.tellOn||(RD.wave&&RD.wave.r<md+1)||RD.whT<2.8)){U.rel(pi);waits++;ZC.tick(1);continue;}wi++;}ZC.tick(1);}U.rel(pi);r.push('p'+pi+' wi='+wi+' y='+U.act(pi).pos.y.toFixed(1));}
r.push('falls='+falls,'waits='+waits,U.st(),'cling='+U.act(1).cling,'errs='+_errs.length);if(U.act(0).pos.y<-0.5||U.act(1).pos.y<-0.5)throw new Error('дуб-сторож: '+r.join(' | '));r.join(' | ')
//@@
// 8 обод: Потап раздвигает калитку — в гнездо — ролик выхода Соловья — этап 1
const r=[];r.push(U.toKind('potap',0));r.push(U.goto(0,0,0.4,8,0.5));U.act(0).face=Math.PI;ZC.press('KeyE');ZC.tick(30);r.push('gate='+!D.F.phase);
r.push(U.goto(0,0,-5,6,0.6));r.push(U.cine(300));ZC.tick(30);r.push('phase='+D.F.phase,'errs='+_errs.length+' '+_errs.slice(0,3).join(' / '));if(D.F.phase!==1||_errs.length)throw new Error('обод: '+r.join(' | '));'3-B road ok '+r.join(' | ')
//@@ shot=k3b_4.png
ZC.tick(60);
