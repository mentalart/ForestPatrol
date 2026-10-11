//@@
// экран на двоих (proto/engine/08 SPLIT + late_89b_split): стороны по кадру, порог, бой, потолок отъезда, раскладки, наклонная линия,
// доля экрана, «всегда вместе» и «всегда свой», «Ко мне!», иконка напарника с расстоянием, поворот камеры правым стиком
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(a.map(x=>x&&x.stack?x.stack.slice(0,200):String(x)).join(' '));ce(...a);};}
window.F=ZC.FIN;window.X=F.split;window.S=X.spl;F.set.splitMode='auto';F.set.splitLayout='vertical';
// 2-1 у старта — ровное дно без врагов, боевых зон и сценарной камеры: герои стоят там, где их поставили
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);for(let k=0;k<4&&ZC.G.cine;k++){ZC.skip();ZC.tick(5);}ZC.tick(120);
const a=ZC.players[0],b=ZC.players[1],h0=a.heroes[a.act],h1=b.heroes[b.act];window.B={x:h0.pos.x,y:h0.pos.y,z:h0.pos.z};
// поставить героев на землю: Игрок 1 в (dx0,dz0), Игрок 2 в (dx1,dz1) от C (середина ровной площадки у старта 2-1: x −6…+14, z −14…+2 от старта);
// n кадров шага, затем кадр отрисовки. putAt — то же от любой точки
window.C={x:B.x+4,z:B.z-6};
window.putAt=(o,d0,d1,n)=>{const p=ZC.players.map(p=>p.heroes[p.act]),g=X.ground;[d0,d1].forEach((d,i)=>{const x=o.x+d[0],z=o.z+d[1],y=g(x,z);p[i].pos.set(x,(y>-50?y:B.y)+0.2,z);p[i].vel.set(0,0,0);});
  ZC.tick(n||60);X.frame();ZC.tick(1);X.frame();};   // кадр, шаг и ещё кадр: стрелки к другу считаются в шаге по панелям последнего кадра
window.put=(d0,d1,n)=>putAt(C,d0,d1,n);
window.st=()=>{const P=X.panes();return {split:+ZC.G.split.toFixed(2),n:[+S.n.x.toFixed(3),+S.n.y.toFixed(3)],share:+S.share.toFixed(2),panes:P.length,A:P.map(q=>q.A.map(v=>Math.round(v)))};};
['start','enemies near='+ZC.W.enemies.filter(e=>e.alive&&Math.hypot(e.pos.x-B.x,e.pos.z-B.z)<40).length,'camZones='+ZC.W.camZones.length,JSON.stringify(st())]
//@@ shot=fin_split_sides.png wait=300
// 1. стороны по кадру: Игрок 1 правее на экране — его панель справа (раньше всегда слева, и камера ехала через весь экран)
put([2,0],[-2,0],150);const c=X.panes()[0].cam,p=ZC.players.map(p=>p.heroes[p.act].pos.clone().project(c).x);put([7,0],[-7,0],150);const r=st(),W=innerWidth,right=p[0]>p[1];
['P1 screen x='+p[0].toFixed(2)+' P2 '+p[1].toFixed(2),'split n.x='+r.n[0]+' A0.x='+r.A[0][0],r.split===1&&r.n[0]===(right?-1:1)&&(r.A[0][0]>W/2)===right?'ok':'FAIL sides','errs='+window._errs.length]
//@@
// слились и снова разошлись, теперь Игрок 1 левее — панель слева
const n0=S.n.x;put([-1,0],[1,0],150);const m=st();put([-7,0],[7,0],150);const r=st();
['merged split='+m.split,'resplit n.x='+r.n[0]+' A0.x='+r.A[0][0],m.split===0&&r.split===1&&r.n[0]===-n0?'ok':'FAIL resplit']
//@@
// 2. порог: 7 м по земле — общий; 4 м по земле и 5 м по высоте (√(4²+6,5²)=7,6) — тоже общий; расстояние для решения считает высоту
put([0,0],[0,0],150);put([3.5,0],[-3.5,0],120);const r1=st();
['7 m apart split='+r1.split,'sep(4 m, 5 m up)='+X.sep({pos:{x:0,y:0,z:0}},{pos:{x:4,y:5,z:0}}).toFixed(1),r1.split===0?'ok':'FAIL 7m']
//@@ shot=fin_split_horizontal.png wait=300
// 3. сверху и снизу: кто выше на экране (дальше от камеры), тот сверху
F.set.splitLayout='horizontal';put([0,0],[0,0],150);put([0,-7],[0,7],150);const r=st();
['horizontal n='+r.n,'A0.y='+r.A[0][1]+' A1.y='+r.A[1][1],r.split===1&&r.n[1]===1&&r.A[0][1]<r.A[1][1]?'ok':'FAIL horizontal']
//@@ shot=fin_split_dynamic.png wait=300
// 4. наклонная линия: поперёк направления между героями; панель Игрока 2 — из текстуры
F.set.splitLayout='dynamic';put([0,0],[0,0],150);const d0=X.draws;put([-6,-6],[6,6],150);const r=st(),ang=Math.round(Math.atan2(r.n[1],r.n[0])*180/Math.PI);
['dynamic n='+r.n+' angle='+ang+'°','draws='+(X.draws-d0),'rt='+(X.rt()?X.rt().width+'x'+X.rt().height:'none'),r.split===1&&Math.abs(r.n[0])<0.98&&Math.abs(r.n[1])<0.98&&X.draws>d0?'ok':'FAIL dynamic']
//@@
// линия не дрожит: поворот направления на 3° — угол тот же; на 30° — доворачивает плавно (за ~0,3 с)
const S=ZC.FIN.split.spl,a0=Math.atan2(S.n.y,S.n.x);put([-6,-6.6],[6,6.6],30);const a1=Math.atan2(S.n.y,S.n.x);
put([-8,-2],[8,2],6);const a2=Math.atan2(S.n.y,S.n.x);ZC.tick(90);X.frame();const a3=Math.atan2(S.n.y,S.n.x);
const dg=v=>Math.round(v*1800/Math.PI)/10;
['small turn Δ='+dg(a1-a0)+'°','big turn after 0.1 s Δ='+dg(a2-a1)+'°, after 1.6 s Δ='+dg(a3-a1)+'°',Math.abs(a1-a0)<0.004&&Math.abs(a2-a1)<Math.abs(a3-a1)?'ok':'FAIL smooth']
//@@
// повернул камеру правым стиком больше чем на 25° — линия уходит к прямой
const C=ZC.FIN.cam;C.fdt=1/30;C.stick[0]={x:1,y:0};ZC.tick(25);const yw=C.p[0].yaw;C.stick[0]=null;ZC.tick(60);X.frame();const r=st();
['orbit yaw='+Math.round(yw*180/Math.PI)+'° n='+r.n,Math.abs(yw)>0.5&&(Math.abs(r.n[0])>0.999||Math.abs(r.n[1])>0.999)?'ok':'FAIL orbit']
//@@ shot=fin_split_focus.png wait=300
// 5. доля экрана: уровень отдал Игроку 1 65 % — линия сдвинулась к Игроку 2
ZC.FIN.camReturnAll();ZC.tick(60);F.set.splitLayout='vertical';put([0,0],[0,0],150);put([-7,0],[7,0],150);X.focus(0,0.65,4);ZC.tick(150);X.frame();const r=st(),P=X.panes();
['focus share='+r.share,'pane0 box w='+P[0].box[2]+' pane1 box w='+P[1].box[2],r.share>0.6&&P[0].box[2]>P[1].box[2]?'ok':'FAIL focus']
//@@
// 6. «Ко мне!» в раздельном экране: линия светится цветом позвавшего, иконка позвавшего у напарника пульсирует; у иконки напарника — метры
ZC.tick(200);X.frame();put([-9,0],[9,0],30);ZC.press('Digit1');ZC.tick(2);X.frame();ZC.FIN.occ.frame();
const g=X.spl.glow,dv=document.getElementById('divider'),ds=[...document.querySelectorAll('.icon .dist')].filter(e=>e.style.display==='block').map(e=>e.textContent);
['glow='+(g?g.pi+'/'+g.t.toFixed(2):'none'),'divider shadow='+(dv.style.boxShadow?'yes':'no'),'dist labels='+JSON.stringify(ds),g&&g.pi===0&&dv.style.boxShadow?'ok':'FAIL call']
//@@
// 7. «всегда свой»: рядом, а экран разделён; «всегда вместе»: разошлись на 25 м — стоявшего подтянуло к другу, экран общий
F.set.splitMode='apart';put([-1,0],[1,0],150);const r1=st();
F.set.splitMode='together';put([0,0],[0,0],120);const p=ZC.players.map(p=>p.heroes[p.act]),c0=ZC.G.stats.carries;put([-9,-7],[9,7],150);
const r2=st(),d=Math.hypot(p[0].pos.x-p[1].pos.x,p[0].pos.z-p[1].pos.z);
['apart split='+r1.split,'together split='+r2.split+' distance after leash='+d.toFixed(1)+' carries +'+(ZC.G.stats.carries-c0),r1.split===1&&r2.split===0&&d<4&&ZC.G.stats.carries>c0?'ok':'FAIL modes']
//@@
// 8. бой рядом сводит экран, только если герои ближе 16 м; потолок отъезда общей камеры (W.noSplit, 40 м — не дальше 27 м)
F.set.splitMode='auto';ZC.W.noSplit=true;S.cfg.sepCap=12;put([0,0],[0,0],120);put([-9,-7],[9,7],240);const sh=X.shared,dist=Math.hypot(sh.pos.x-sh.look.x,sh.pos.y-sh.look.y,sh.pos.z-sh.look.z);ZC.W.noSplit=false;S.cfg.sepCap=24;
// 22,8 м между героями, потолок на время проверки 12 м: камера в √(16,8²+10²) ≈ 19,5 м от точки взгляда (без потолка — ≈ 29,7 м)
['noSplit 22.8 m, cap 12: split='+st().split+' camera dist='+dist.toFixed(1),st().split===0&&dist<21&&dist>18?'ok':'FAIL cap']
//@@ shot=fin_split_fight.png wait=300
// 8. бой рядом сводит экран, только если герои ближе 16 м (раньше — на любом расстоянии, и камера отъезжала за 30 м)
const e=ZC.W.enemies.filter(q=>q.alive).sort((a,b)=>Math.hypot(a.pos.x-B.x,a.pos.z-B.z)-Math.hypot(b.pos.x-B.x,b.pos.z-B.z))[0];let rf='no enemies';
if(e){const o={x:e.pos.x+2,z:e.pos.z},sk=()=>{for(let k=0;k<6&&ZC.G.cine;k++){ZC.skip();ZC.tick(10);}};   // у жемчужницы начинается ролик — досмотреть
  putAt(o,[0,-11],[0,11],10);sk();putAt(o,[0,-11],[0,11],150);const n2=ZC.G.split,f2=X.spl.ft.join('/');putAt(o,[0,-6],[0,6],10);sk();putAt(o,[0,-6],[0,6],120);const n1=ZC.G.split;
  rf='fight 22 m split='+n2.toFixed(2)+' (fight '+f2+'), 12 m split='+n1.toFixed(2)+' to foe '+ZC.players.map(p=>{const h=p.heroes[p.act];return Math.round(Math.hypot(h.pos.x-e.pos.x,h.pos.z-e.pos.z));})+(n1===0&&n2===1&&ZC.G.fightT>0?' ok':' FAIL fight');}
[rf,'errs='+window._errs.length+(window._errs.length?' '+window._errs[0]:'')]
