//@@ wait=1500
// релиз final06: 2-Б «Водяной» — погоня с валом вдвое длиннее (late_99s_k2b_chase.js, docs/23_vodyanoy_boss.md), вдвоём настоящими нажатиями:
// ролик — река встаёт валом, камера лицом к героям; деревня на сваях — котёнок прыгает на голову; дуб — Потап; мельница — Потап держит колесо,
// Пелагея по лопастям и на тормозную плиту, Потап следом; кувшинки — Пелагея играет у раковины, оба по кувшинкам; ручей — прилив и вплавь;
// развилка — Прошка по уступу к рычагу шлюза, Пелагея в русле — вода несёт; камыш — Йоша поливает гребешок; лодка Садко — Прошка рулит мимо коряг,
// Пелагея гребёт гуслями; обрыв — полёт; плетень — две верёвки разом; к омуту — ролик и начало боя. Отдельно: вал догоняет стоящего.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.KEYS=[{swap:'KeyQ',sk:'KeyE',it:'KeyR',at:'KeyF',j:'Space',B:['KeyA','KeyD','KeyW','KeyS']},{swap:'KeyK',sk:'KeyL',it:'Semicolon',at:'Comma',j:'KeyM',B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}];
window.ACT=(pi,kind)=>{for(let i=0;i<3&&U.act(pi).kind!==kind;i++){U.tap(KEYS[pi].swap);ZC.tick(6);}return U.act(pi).kind===kind;};
// в погоне камера впереди, лицом к героям (W.camYaw=π): «вверх» — к валу, «вниз» — от него; WALK — к точке по повороту камеры (оба игрока — разом, если pts[1])
window.HOLD=(pi,dx,dz)=>{const inv=Math.abs(ZC.W.camYaw)>1,B=KEYS[pi].B;ZC.hold(B[0],inv?dx>0.25:dx<-0.25);ZC.hold(B[1],inv?dx<-0.25:dx>0.25);ZC.hold(B[2],inv?dz>0.25:dz<-0.25);ZC.hold(B[3],inv?dz<-0.25:dz>0.25);};
window.REL=pi=>KEYS[pi].B.forEach(k=>ZC.hold(k,false));
window.WALK2=(pts,max,extra)=>{const n=Math.round((max||8)*60),done=[!pts[0],!pts[1]];let r='TIMEOUT';
  for(let i=0;i<n;i++){for(const pi of[0,1]){if(done[pi])continue;const h=U.act(pi),[x,z]=pts[pi],dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.5){done[pi]=true;REL(pi);continue;}HOLD(pi,dx,dz);if(extra)extra(h,i,pi);}
    if(done[0]&&done[1]){r='t='+(i/60).toFixed(2);break;}ZC.tick(1);}REL(0);REL(1);ZC.tick(1);return r;};
window.WALK=(pi,x,z,max,extra)=>WALK2(pi?[null,[x,z]]:[[x,z],null],max,extra);
window.PATH=(pi,pts,max)=>pts.map(p=>WALK(pi,p[0],p[1],max||6)).join('/');
window.SWIM=(h,i,pi)=>{if(h.grounded&&h.groundRef&&h.groundRef.water&&i%20===0)ZC.press(KEYS[pi].j);};
window.D2=()=>ZC.W.dbg2b();window.st=()=>U.st()+' wave='+D2().WV.z.toFixed(1)+' ck='+D2().WV.ck+' errs='+_errs.length;
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
if(!U.cine(200))throw new Error('нет ролика погони');ZC.tick(5);const D=D2();if(!D.WV.on)throw new Error('вал не пошёл');if(Math.abs(ZC.W.camYaw-Math.PI)>0.01)throw new Error('камера не развернулась');'chase on wave='+D.WV.z.toFixed(1)
//@@ shot=k2b_wave.png
// деревня: котёнок прыгает на голову пробегающему; дуб — Потап поднимает
const D=D2(),F=ZC.W.flags;const r=[ACT(0,'potap'),ACT(1,'pelageya')];r.push(WALK2([[-1.5,183],[1.2,184]],8),WALK2([[0,168.2],[1.6,170]],8));U.tap('KeyE');ZC.tick(20);
if(!F.oak)throw new Error('дуб не поднят: '+r.join()+' '+st());if(!F.kitten)throw new Error('котёнок не прыгнул: '+st());'village kitten='+F.kitten+' oak '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@ shot=k2b_village.png
// мельница: Потап держит колесо у ступицы; Пелагея по лопастям — на тормозную плиту; Потап следом
const D=D2(),CH=D.CH,MZ=CH.MZ;const r=[WALK2([[2.6,MZ+2.7],[0,MZ+3.2]],8)];U.tap('KeyE');ZC.tick(30);if(!CH.mill.potap)throw new Error('Потап не держит колесо: '+r.join()+' '+st());
r.push(PATH(1,[[0,MZ+2],[0,MZ-2.4],[2.6,MZ-2.9]],6));ZC.tick(20);if(!CH.mill.held||!CH.millPlate.pressed)throw new Error('плита не держит: '+r.join()+' '+st());
r.push(PATH(0,[[0.2,MZ+2.4],[0.2,MZ-2.6],[-1.5,MZ-4.5]],7));if(U.act(0).pos.z>MZ-2.2)throw new Error('Потап не перешёл: '+r.join()+' '+st());
r.push(WALK(1,1.5,MZ-5,4));ZC.tick(10);if(!CH.millDone)throw new Error('мельница не пройдена: '+st());'mill '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@ shot=k2b_mill.png
// кувшинки: Пелагея играет у раковины — ряды всплывают; оба по кувшинкам на тот берег
const D=D2(),CH=D.CH;const r=[WALK2([[-1.5,CH.LZ0+2.4],[-5.2,CH.LZ0+2.5]],8)];ZC.press('Semicolon');ZC.tick(140);const up=CH.rows.filter(q=>q.up>0.6).length;if(up<CH.rows.length)throw new Error('кувшинки не всплыли: '+up+'/'+CH.rows.length+' '+st());
r.push(WALK2([[0,CH.LZ1-1.6],[-0.4,CH.LZ1-1.4]],8));if(!CH.lilyDone)throw new Error('пруд не пройден: '+r.join()+' '+st());'lily up='+up+' '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@ shot=k2b_lily.png
// ручей: Пелагея — прилив у ракушки; оба вплавь и на берег
const D=D2();const r=[WALK2([[-3,113.4],[-6.2,112.6]],8)];ZC.press('Semicolon');ZC.tick(130);if(D.STR.state!=='high')throw new Error('ручей не в приливе: '+r.join()+' '+st());
r.push(WALK2([[-2,102.4],[0,102.4]],10,SWIM));if(!D.CH.streamDone)throw new Error('не переплыли: '+r.join()+' '+st());'stream '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@
// развилка: Прошка — по уступу к рычагу шлюза; Пелагея — в русле у заслонки; вода несёт вперёд
const D=D2(),F=ZC.W.flags,CH=D.CH;ACT(0,'proshka');const r=[WALK2([[-4.1,97.4],[4,98]],8)];r.push(WALK2([[-4.1,92.4],[4,CH.sluiceZ+1.4]],8),WALK(0,-2.8,CH.FZ0-11,6));
U.act(0).face=Math.atan2(-1.9-U.act(0).pos.x,(CH.FZ0-11)-U.act(0).pos.z);ZC.press('KeyF');ZC.tick(20);if(!F.sluice)throw new Error('шлюз не открыт: '+r.join()+' y='+U.act(0).pos.y.toFixed(2)+' '+st());
ZC.tick(150);const pz=U.act(1).pos.z;r.push(PATH(0,[[-4.1,CH.FZ1+5.6],[-4.1,CH.FZ1+0.6],[-1,CH.FZ1-2]],7),WALK(1,1,CH.FZ1-2,6));if(!CH.forkDone)throw new Error('развилка не пройдена: '+r.join()+' '+st());
'fork flush z='+pz.toFixed(1)+' '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@ shot=k2b_fork.png
// скалы: оба за скалы; Йоша поливает гребешок — камыш держит вал
const D=D2(),F=ZC.W.flags,CH=D.CH;ACT(1,'yosha');const r=[WALK2([[0,CH.RZ+3],[0.4,CH.RZ+3.4]],6),WALK2([[-1.4,CH.RZ-5.6],[0.6,CH.RZ-5.4]],6)];ZC.HERO.yosha.face=0;U.tap('KeyL');ZC.tick(40);
if(!F.reeds)throw new Error('камыш не вырос: '+r.join()+' '+st());'reeds '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@ shot=k2b_reeds.png
// лодка Садко: оба в лодку; Прошка рулит мимо коряг, Йоша гребёт гуслями; обрыв — полёт; на берегу у плетня
const D=D2(),F=ZC.W.flags,CH=D.CH,B=CH.boat;ACT(1,'pelageya');const r=[WALK2([[-0.6,CH.BZ0+0.6],[0.6,CH.BZ0+0.8]],6),WALK2([[-0.5,B.z],[0.5,B.z-0.4]],5)];ZC.tick(10);if(!B.on)throw new Error('лодка не отплыла: '+r.join()+' '+st());
let rows=0,bumps=0,i=0;for(;i<60*20&&F.boat!==2;i++){const nx=CH.snags.filter(s=>!s.hit&&s.z<B.z&&s.z>B.z-7).sort((a,b)=>b.z-a.z)[0];let tx=0;if(nx)tx=nx.x>0?nx.x-3.2:nx.x+3.2;tx=Math.max(-4.4,Math.min(4.4,tx));
  ZC.hold('KeyA',tx>B.x+0.3);ZC.hold('KeyD',tx<B.x-0.3);if(i%24===0){ZC.press('Semicolon');rows++;}if(B.bump>0.69)bumps++;ZC.tick(1);}
REL(0);if(F.boat!==2)throw new Error('лодка не долетела: z='+B.z.toFixed(1)+' '+st());const hz=U.act(0).pos.z;if(!(hz<23&&hz>18))throw new Error('не на берегу: '+hz.toFixed(1));
'boat t='+(i/60).toFixed(1)+' rows='+rows+' bumps='+bumps+' '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@ shot=k2b_cliff.png
// плетень: две верёвки разом; к омуту
const D=D2(),F=ZC.W.flags;const r=[WALK2([[-5.2,18.2],[5.2,18.2]],6)];U.act(0).face=Math.PI;U.act(1).face=Math.PI;ZC.press('KeyF');ZC.press('Comma');ZC.tick(20);
if(!F.gate)throw new Error('плетень не открылся: '+r.join()+' RP='+D.RP.map(v=>v.toFixed(2))+' '+st());r.push(WALK2([[-1,9.6],[1,9.6]],6));ZC.tick(20);if(!F.chaseDone)throw new Error('погоня не кончилась: '+r.join()+' '+st());if(ZC.W.camYaw!==0)throw new Error('камера не вернулась');
'gate '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@
// у омута: ролик — и начинается бой (этап 1 «Сом-перевозчик»: Водяной верхом на соме); весь бой — в tfin_k2bboss / tfin_k2bbosssolo
if(!U.cine(200))throw new Error('нет ролика у омута');ZC.tick(30);const F=ZC.W.flags,D=D2();if(F.phase!==1)throw new Error('бой не начался: '+F.phase);
if(D.S1.st!=='circle')throw new Error('сом не кружит: '+D.S1.st);ZC.tick(300);if(!ZC.W.bolts.length&&D.S1.st==='circle'&&!D.S1.tw)throw new Error('Водяной не кидает шары');
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'boss start ok phase=1 kitten='+F.kitten
//@@ shot=k2b_boss.png
// вал догоняет стоящего: все к отметке, вал позади
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);U.cine(200);ZC.tick(5);const D=D2();let t=0,caught=false;while(t<60*40){if(D.WV.hold>1.0){caught=true;break;}ZC.tick(1);t++;}
if(!caught)throw new Error('вал не догнал за 40 с');const a=U.act(0).pos.z;if(!(D.WV.z>a+10&&Math.abs(a-196)<2))throw new Error('не к отметке: '+a.toFixed(1)+' wave='+D.WV.z.toFixed(1));
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'caught t='+(t/60).toFixed(1)+' → ck '+a.toFixed(1)+' wave='+D.WV.z.toFixed(1)+' errs=0'
