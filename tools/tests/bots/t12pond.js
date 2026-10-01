//@@
// 1-2 «Кикиморино болото», пруд Царевны-лягушки: пруд глубокий — упал мимо кувшинки (или она ушла под воду) — сразу «Плюх!» и снова у колокольчика,
// по воде не пропрыгать; колокольчик у пруда звенит для каждого, кто вышел на берег, даже мимо него; завядшая кувшинка видна на воде, но не держит,
// пока Йоша не польёт её живой водой, — потом всплывает и держит всегда
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(3);ZC.tick(30);ZC.skip();ZC.tick(20);
window.SW=()=>ZC.W.sw12;window.F=()=>ZC.W.flags;window.H=ZC.HERO;F().noChudo=true;
window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
window.faceTo=(pi,x,z)=>{const h=U.act(pi);h.face=Math.atan2(x-h.pos.x,z-h.pos.z);};
window.st=()=>U.st()+' falls='+ZC.G.stats.falls+' errs='+_errs.length+(_errs[0]?' '+_errs[0]:'');
// на берег пруда — правее колокольчика (в 5 м от него): колокольчик всё равно звенит для обоих
['proshka','potap'].forEach((k,i)=>put(H[k],5.5+i*1.2,-236));['pelageya','yosha'].forEach((k,i)=>put(H[k],7.5+i*1.2,-236.5));ZC.tick(30);
const S=SW(),P6=S.PADS[6],cp=ZC.players.map(p=>p.cp.z.toFixed(1));
window.R={bell:ZC.players.every(p=>Math.abs(p.cp.z+224.6)<0.3)};
// завядшая — на воде (у самой глади), видна, без опоры
R.wilt=P6.wil&&P6.g.visible&&P6.g.position.y>-0.45&&P6.g.position.y<-0.3&&!P6.col.on&&!!P6.dead&&P6.dead.visible;
['cp='+cp.join(','),'wilt y='+P6.g.position.y.toFixed(2)+' col='+P6.col.on+' dead='+(P6.dead&&P6.dead.visible),JSON.stringify(R),st()]
//@@ shot=t12p_wilt.png
const P6=SW().PADS[6];put(H.proshka,-2.0,-239.0);put(H.pelageya,0.5,-239.0);faceTo(0,P6.col.x,P6.col.z);ZC.tick(20);st()
//@@
// на завядшую кувшинку не встать: падает сквозь неё — плюх — у колокольчика
const S=SW(),P6=S.PADS[6],P=H.proshka,f0=ZC.G.stats.falls;put(P,P6.col.x,P6.col.z,0.1);let n=0;
for(;n<40&&P.pos.z<-230;n++)ZC.tick(1);
R.wiltFall=ZC.G.stats.falls===f0+1&&Math.abs(P.pos.z+224.6)<1.5;
// в воду между кувшинками до песни (все под водой): сразу плюх, не стоит и не прыгает в воде
const f1=ZC.G.stats.falls;put(P,-6.5,-262,-0.2);let m=0;for(;m<40&&P.pos.z<-230;m++)ZC.tick(1);
R.water=ZC.G.stats.falls===f1+1&&m<20&&Math.abs(P.pos.z+224.6)<1.5;
['wilt fall frames='+n+' water frames='+m,JSON.stringify(R),st()].join(' | ')
//@@
// лягушка запела (стрелу сбили); стоим на кувшинке — она уходит под воду: плюх и к колокольчику
const S=SW(),P=H.proshka,FG=F().frog;FG.drop=true;FG.sing=true;FG.t=0;ZC.tick(30);
const T=3,up=P0=>P0.grp===0?Math.sin(FG.t*Math.PI*2/T)>-0.3:Math.sin(FG.t*Math.PI*2/T)<0.3;const P0=S.PADS[0];
const fresh=()=>{const t0=FG.t;for(let d=0;d<=0.8;d+=0.05){FG.t=t0+d;const u=up(P0);FG.t=t0;if(!u)return false;}return true;};
U.until(()=>fresh()&&P0.cur>-0.1,4);const f0=ZC.G.stats.falls;put(P,P0.col.x,P0.col.z,0.1);ZC.tick(20);const on=P.grounded&&P.pos.y>-0.1;
U.until(()=>P.pos.z>-230,4);R.sink=on&&ZC.G.stats.falls===f0+1;
['stood='+on,'sink fall='+(ZC.G.stats.falls-f0),JSON.stringify(R),st()].join(' | ')
//@@
// Йоша поливает завядшую с пятой кувшинки — та оживает, всплывает и держит; Прошка встаёт на неё
const S=SW(),FG=F().frog,P5=S.PADS[5],P6=S.PADS[6],Y=H.yosha;if(U.act(1).kind!=='yosha'){ZC.press('KeyK');ZC.tick(5);}
const T=3,up=t=>Math.sin(t*Math.PI*2/T)<0.3;   // пятая — вторая группа
U.until(()=>{let ok=true;for(let d=0;d<=1.2;d+=0.05)if(!up(FG.t+d))ok=false;return ok&&P5.cur>-0.1;},5);
put(Y,P5.col.x,P5.col.z,0.1);ZC.tick(3);faceTo(1,P6.col.x,P6.col.z);ZC.press('KeyL');U.until(()=>FG.lily,1.5);const ly=FG.lily;
put(Y,-1.2,-239.2);ZC.tick(60);
R.lily=ly&&!P6.wil&&P6.col.on&&P6.cur>-0.1&&!P6.dead.visible;
const P=H.proshka,f0=ZC.G.stats.falls;put(P,P6.col.x,P6.col.z,0.3);ZC.tick(90);R.stand=P.grounded&&P.pos.y>-0.1&&ZC.G.stats.falls===f0&&Math.hypot(P.pos.x-P6.col.x,P.pos.z-P6.col.z)<1.4;
['lily='+ly+' y='+P6.cur.toFixed(2)+' col='+P6.col.on,'stand='+R.stand,JSON.stringify(R),st()].join(' | ')
//@@ shot=t12p_lily.png
ZC.tick(2);
//@@
const ok=R.bell&&R.wilt&&R.wiltFall&&R.water&&R.sink&&R.lily&&R.stand&&_errs.length===0;[JSON.stringify(R),'errs='+_errs.length,ok?'ok':'FAIL']
