//@@ wait=1500
// релиз final06: напарник-бот проходит погоню в 2-Б «Водяной» за Игрока 2 (Пелагея и Йоша): мельница (по лопастям на плиту, пока Потап держит колесо), кувшинки (играет и бежит следом),
// ручей (прилив и вплавь), развилка (в русле у заслонки; если человек тоже в русле — на уступ к рычагу), камыш (Йоша поливает гребешок, когда все прошли), лодка Садко (гребёт гуслями),
// плетень (вторая верёвка разом). Человека (Игрок 1: Прошка и Потап) играет скрипт. Бой с Водяным — в tfin_companion_2bboss.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;
window.KEYS=[{swap:'KeyQ',B:['KeyA','KeyD','KeyW','KeyS']},{swap:'KeyK'}];
window.ACT=(kind)=>{for(let i=0;i<3&&U.act(0).kind!==kind;i++){U.tap('KeyQ');ZC.tick(6);}return U.act(0).kind===kind;};
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.D2=()=>ZC.W.dbg2b();window.CHS=()=>D2().CH;
// в погоне камера впереди, лицом к героям (W.camYaw=π): «вверх» — к валу; HOLD/WALK — к точке по повороту камеры (человек, Игрок 1)
window.HOLD=(dx,dz)=>{const inv=Math.abs(ZC.W.camYaw)>1,B=KEYS[0].B;ZC.hold(B[0],inv?dx>0.25:dx<-0.25);ZC.hold(B[1],inv?dx<-0.25:dx>0.25);ZC.hold(B[2],inv?dz>0.25:dz<-0.25);ZC.hold(B[3],inv?dz<-0.25:dz>0.25);};
window.REL0=()=>KEYS[0].B.forEach(k=>ZC.hold(k,false));
window.WALK=(x,z,max,extra)=>{const n=Math.round((max||8)*60);for(let i=0;i<n;i++){const h=U.act(0),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.5){REL0();return 't='+(i/60).toFixed(1);}HOLD(dx,dz);if(extra)extra(h,i);ZC.tick(1);}REL0();return 'TIMEOUT@'+pos(U.act(0));};
window.PATH=(pts,max)=>pts.map(p=>WALK(p[0],p[1],max||6)).join('/');
window.SWIM=(h,i)=>{if(h.grounded&&h.groundRef&&h.groundRef.water&&i%20===0)ZC.press('Space');};
window.st=()=>'me='+pos(me())+' bot='+pos(bot())+' '+CO.mode+' wave='+D2().WV.z.toFixed(1)+' ck='+D2().WV.ck+' errs='+_errs.length;
// ждать, пока cond (или max секунд); true — дождались
window.UNTIL=(cond,max)=>{for(let i=0;i<(max||10)*60;i++){if(cond())return true;ZC.tick(1);}return cond();};
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
CO.set(true);CO.skill=1;
if(!U.cine(200))throw new Error('нет ролика погони');ZC.tick(5);const D=D2();if(!D.WV.on)throw new Error('вал не пошёл');if(!CO.routes['2-B'])throw new Error('нет маршрута 2-Б');'chase on wave='+D.WV.z.toFixed(1)+' bot='+pos(bot())+' '+CO.mode
//@@ shot=cmp2b_village.png
// деревня и дуб: человек — Потап поднимает дуб; бот идёт следом (ведомый), котёнок прыгает на кого-то из героев
const D=D2(),F0=F();ACT('potap');const r=[WALK(-1.5,183,8),WALK(1.2,184,8),WALK(0,168.2,8)];U.tap('KeyE');ZC.tick(20);
if(!F0.oak)throw new Error('дуб не поднят: '+r.join()+' '+st());if(!F0.kitten)throw new Error('котёнок не прыгнул: '+st());ZC.tick(40);
const d=Math.hypot(bot().pos.x-me().pos.x,bot().pos.z-me().pos.z);if(d>14)throw new Error('бот отстал от человека: '+d.toFixed(1)+' '+st());
'village kitten='+F0.kitten+' oak '+r.join()+' d='+d.toFixed(1)+' '+CO.mode
//@@ shot=cmp2b_mill.png
// мельница: Потап держит колесо у ступицы; бот по лопастям — на тормозную плиту (держит для Потапа); Потап следом
const D=D2(),CH=CHS(),MZ=CH.MZ;const r=[WALK(2.6,MZ+2.7,8)];U.tap('KeyE');ZC.tick(20);if(!CH.mill.potap)throw new Error('Потап не держит колесо: '+r.join()+' '+st());
const L=[];let last='';for(let i=0;i<60*20&&!CH.millPlate.pressed;i++){ZC.tick(1);if(CO.mode!==last){L.push((i/60).toFixed(1)+'s '+CO.mode+' '+pos(bot()));last=CO.mode;}}
if(!CH.millPlate.pressed)throw new Error('бот не встал на плиту: '+L.join(' | ')+' '+st());
r.push(PATH([[0.2,MZ+2.4],[0.2,MZ-2.6],[-1.5,MZ-4.5]],7));if(U.act(0).pos.z>MZ-2.2)throw new Error('Потап не перешёл: '+r.join()+' '+st());
ZC.tick(20);if(!CH.millDone)throw new Error('мельница не пройдена: '+r.join()+' '+st());'mill '+r.join()+' '+L.join(' | ')+' wave='+D.WV.z.toFixed(1)
//@@ shot=cmp2b_lily.png
// кувшинки: человек подошёл к пруду — бот играет у раковины и бежит по всплывшим рядам; человек следом (напев девять секунд)
const D=D2(),CH=CHS();const r=[WALK(-1.5,CH.LZ0+2.4,8)];
if(!UNTIL(()=>CH.lily.hum>0.5,15))throw new Error('бот не сыграл у раковины: '+r.join()+' '+st());
r.push(PATH([[-4.8,139.4],[-4.8,126.6],[-4.6,124.6]],8));ZC.tick(20);
if(!CH.lilyDone)throw new Error('пруд не пройден: '+r.join()+' '+st());if(bot().pos.z>CH.LZ1)throw new Error('бот не переправился: '+st());'lily '+r.join()+' bot='+pos(bot())+' wave='+D.WV.z.toFixed(1)
//@@ shot=cmp2b_stream.png
// ручей: бот играет прилив у ракушки; человек вплавь, бот тоже
const D=D2(),CH=CHS();const r=[WALK(-3,113.4,8)];
if(!UNTIL(()=>D.STR.state==='high'&&D.STR.t>=1,15))throw new Error('бот не сделал прилив: '+D.STR.state+' '+r.join()+' '+st());
r.push(WALK(0,102.4,10,SWIM));if(!UNTIL(()=>CH.streamDone,8))throw new Error('не переплыли: '+r.join()+' '+st());'stream '+r.join()+' bot='+pos(bot())+' wave='+D.WV.z.toFixed(1)
//@@ shot=cmp2b_fork.png
// развилка: человек — Прошка по уступу к рычагу шлюза; бот в русле у заслонки — вода несёт вперёд
const D=D2(),F0=F(),CH=CHS();ACT('proshka');const r=[WALK(-4.1,97.4,8),WALK(-4.1,92.4,8),WALK(-2.8,CH.FZ0-11,6)];
const h=U.act(0);h.face=Math.atan2(-1.9-h.pos.x,(CH.FZ0-11)-h.pos.z);ZC.press('KeyF');ZC.tick(20);
if(!F0.sluice)throw new Error('шлюз не открыт: '+r.join()+' y='+h.pos.y.toFixed(2)+' '+st());
ZC.tick(150);const pz=bot().pos.z;r.push(PATH([[-4.1,CH.FZ1+5.6],[-4.1,CH.FZ1+0.6],[-1,CH.FZ1-2]],7));
if(!UNTIL(()=>CH.forkDone,6))throw new Error('развилка не пройдена: '+r.join()+' '+st());'fork flush bot z='+pz.toFixed(1)+' '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@ shot=cmp2b_reeds.png
// скалы: человек прошёл за скалы; бот становится Йошей у гребешка и поливает его — камыш встаёт
const D=D2(),F0=F(),CH=CHS();const r=[WALK(0,CH.RZ+3,6),WALK(0,CH.RZ-9,6)];
if(!UNTIL(()=>F0.reeds,14))throw new Error('камыш не вырос: '+r.join()+' '+st());'reeds '+r.join()+' bot='+pos(bot())+' wave='+D.WV.z.toFixed(1)
//@@ shot=cmp2b_boat.png
// лодка Садко: оба в лодку; человек рулит мимо коряг, бот гребёт гуслями; обрыв — полёт; на берегу у плетня
const D=D2(),F0=F(),CH=CHS(),B=CH.boat;const r=[WALK(-0.6,CH.BZ0+0.6,6),WALK(-0.5,B.z,5)];
if(!UNTIL(()=>B.on,6))throw new Error('лодка не отплыла: '+r.join()+' '+st());
let bumps=0,maxSp=0,i=0;for(;i<60*25&&F0.boat!==2;i++){const nx=CH.snags.filter(s=>!s.hit&&s.z<B.z&&s.z>B.z-7).sort((a,b)=>b.z-a.z)[0];let tx=0;if(nx)tx=nx.x>0?nx.x-3.2:nx.x+3.2;tx=Math.max(-4.4,Math.min(4.4,tx));
  ZC.hold('KeyA',tx>B.x+0.3);ZC.hold('KeyD',tx<B.x-0.3);if(B.bump>0.69)bumps++;maxSp=Math.max(maxSp,B.sp);ZC.tick(1);}
REL0();if(F0.boat!==2)throw new Error('лодка не долетела: z='+B.z.toFixed(1)+' '+st());if(maxSp<5)throw new Error('бот не гребёт: maxSp='+maxSp.toFixed(1));
'boat t='+(i/60).toFixed(1)+' maxSp='+maxSp.toFixed(1)+' bumps='+bumps+' '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@ shot=cmp2b_fence.png
// плетень: человек у правой верёвки; бот — у левой; дёргают разом; к омуту
const D=D2(),F0=F();const r=[WALK(5.2,18.2,6)];U.act(0).face=Math.PI;
let n=0;for(let i=0;i<60*14&&!F0.gate;i++){if(i%40===0){U.act(0).face=Math.PI;ZC.press('KeyF');n++;}ZC.tick(1);}
if(!F0.gate)throw new Error('плетень не открылся: '+r.join()+' RP='+D.RP.map(v=>v.toFixed(2))+' '+st());
r.push(WALK(1,9.6,6));if(!UNTIL(()=>F0.chaseDone,6))throw new Error('погоня не кончилась: '+r.join()+' '+st());if(ZC.W.camYaw!==0)throw new Error('камера не вернулась');
'gate swings='+n+' '+r.join()+' bot='+pos(bot())
//@@
// у омута: ролик — и начинается бой (этап 1); бот сходит на свою позицию и держит щит
if(!U.cine(300))throw new Error('нет ролика у омута');ZC.tick(60);const F0=F(),D=D2();if(F0.phase!==1)throw new Error('бой не начался: '+F0.phase);
ZC.tick(600);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'boss start phase=1 bot='+pos(bot())+' '+CO.mode+' st='+D.S1.st+' errs=0'
//@@
// вал догоняет стоящих: человек стоит, бот идёт следом — оба догнаны (назад к отметке), не застревают
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);U.cine(200);ZC.tick(5);const D=D2();let t=0,caught=false;while(t<60*40){if(D.WV.hold>1.0){caught=true;break;}ZC.tick(1);t++;}
if(!caught)throw new Error('вал не догнал за 40 с: '+st());const a=U.act(0).pos.z;if(!(D.WV.z>a+10&&Math.abs(a-196)<2))throw new Error('не к отметке: '+a.toFixed(1)+' wave='+D.WV.z.toFixed(1));
ZC.tick(120);const d=Math.hypot(bot().pos.x-me().pos.x,bot().pos.z-me().pos.z);if(d>12)throw new Error('бот далеко от человека после возврата: '+d.toFixed(1));'caught ok d='+d.toFixed(1)+' '+CO.mode
//@@
// развилка наоборот: человек полез в русло — бот идёт на уступ и бьёт рычаг шлюза; вода несёт человека вперёд
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);U.cine(200);ZC.tick(5);const D=D2(),F0=F(),CH=CHS();CH.warp('fork');D.WV.hold=9;ZC.tick(20);ACT('proshka');
const r=[WALK(4,96,8),WALK(4,CH.sluiceZ+1.4,8)];const L=[];let last='';
for(let i=0;i<60*40&&!F0.sluice;i++){ZC.tick(1);if(CO.mode!==last){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));last=CO.mode;}}
if(!F0.sluice)throw new Error('бот не открыл шлюз: '+r.join()+' '+L.join(' | ')+' '+st());
ZC.tick(150);r.push(WALK(3.5,CH.FZ1-3,8));if(!UNTIL(()=>CH.forkDone,12))throw new Error('развилка не пройдена: '+r.join()+' '+st());'fork reversed '+r.join()+' '+L.join(' | ')
