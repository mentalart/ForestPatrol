//@@ wait=1500
// релиз final06: напарник-бот проходит 5-2 «Заяц» за Игрока 2: на каждом круге оба его героя (Пелагея, Йоша) встают на свои кольца — активный идёт на своё, смена, второй на своё, оставленный стоит столбом;
// когда оба на местах, а оставленный друг человека ещё нет, бот зовёт «Ко мне!». Человека (Игрок 1) играет скрипт: тот же обход колец Прошкой и Потапом, в конце подкидка Прошки.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.RESET52=()=>{for(let t=0;t<4;t++){ZC.startFrom(ZC.LV('5-2'));ZC.G.manual=true;ZC.tick(30);if(ZC.W.levelId==='5-2')break;}for(let i=0;i<30&&ZC.G.cine;i++){ZC.skip();ZC.tick(10);}U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(20);window.H=ZC.HERO;window.S={sw:0};return F().stage;};
// человек: активный идёт на своё кольцо, потом смена на второго (клавиши Игрока 1)
window.HUM=()=>{const W=ZC.W,F2=W.flags;if(ZC.G.cine||!W.k52)return;
  if(F2.stage==='toss'){if(me().kind!=='potap'){if(ZC.G.time>S.sw){S.sw=ZC.G.time+0.5;ZC.press('KeyQ');}}else{ZC.press('KeyE');}return;}
  if(F2.stage!=='hunt')return;const k=Math.min(2,W.k52.circle()),mine=[H.proshka,H.potap],on=x=>Math.hypot(x.pos.x-W.k52.spot(k,x.kind).x,x.pos.z-W.k52.spot(k,x.kind).z)<0.6;
  const need=mine.filter(x=>!on(x)),h=me();const B=['KeyA','KeyD','KeyW','KeyS'];
  const go=(tx,tz)=>{const dx=tx-h.pos.x,dz=tz-h.pos.z,far=Math.hypot(dx,dz)>0.2;ZC.hold(B[0],far&&dx<-0.2);ZC.hold(B[1],far&&dx>0.2);ZC.hold(B[2],far&&dz<-0.2);ZC.hold(B[3],far&&dz>0.2);};
  if(!need.length){B.forEach(b=>ZC.hold(b,false));return;}
  if(need.includes(h)){const p=W.k52.spot(k,h.kind);go(p.x,p.z);}else{B.forEach(b=>ZC.hold(b,false));if(ZC.G.time>S.sw){S.sw=ZC.G.time+0.5;ZC.press('KeyQ');}}};
window.HSTOP=()=>['KeyA','KeyD','KeyW','KeyS'].forEach(b=>ZC.hold(b,false));
RESET52();
['stage='+F().stage,'bot='+pos(bot()),'me='+pos(me()),CO.mode,!!CO.routes['5-2']]
//@@
// три круга: оба героя Игрока 2 каждый раз на своих кольцах; круги смыкаются; заяц садится в середине
if(!CO.routes['5-2'])throw new Error('нет маршрута 5-2');const W=ZC.W,F2=F();const L=[];let lc=-1;
for(let i=0;i<60*240&&F2.stage==='hunt';i++){HUM();ZC.tick(1);const c=W.k52.circle();if(c!==lc){lc=c;L.push((i/60).toFixed(0)+'s круг '+c+' '+CO.mode);}}
HSTOP();if(F2.stage==='hunt')throw new Error('круги не сомкнулись: круг '+W.k52.circle()+' bot='+pos(bot())+' me='+pos(me())+' '+CO.mode+' '+L.join(' | '));
'circles ok stage='+F2.stage+' '+L.join(' | ')
//@@
// финал: Потап подкидывает Прошку — заяц, утка улетает, уровень пройден
const F3=F();for(let i=0;i<60*60&&!F3.out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}HUM();ZC.tick(1);}
if(!F3.out)throw new Error('уровень не завершён: stage='+F3.stage+' '+CO.mode);if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'end ok out='+F3.out
