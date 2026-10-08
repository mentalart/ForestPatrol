//@@ wait=1500
// релиз final06: 2-2 «Рыба-кит» — подсказка «Трещина в хвостовом плавнике!» не зависает. Трещину можно перепрыгнуть без сосны-мостика
// (Прошка, Пелагея); раньше задача ждала поваленную сосну и висела до конца уровня, а следующие подсказки не появлялись.
// Одиночный режим: оставленные у хвоста герои задачу не держат — она идёт за тем, кем играешь. Кооператив: оба перепрыгивают сами.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
window.OBJ=pi=>{const o=ZC.W.objectives[pi][ZC.players[pi].obj];return o?String(typeof o.text==='function'?o.text():o.text):'';};
window.CARDS=()=>{ZC.sim(0.3);return ZC.FIN.hints.state().html.join(' ');};
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',swap:'KeyQ'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',swap:'KeyK'}];
window.GO=(pi,x,z,max)=>{const K=KEYS[pi];for(let i=0;i<(max||8)*60;i++){const h=U.act(pi),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.45)break;ZC.hold(K.left,dx<-0.25);ZC.hold(K.right,dx>0.25);ZC.hold(K.up,dz<-0.25);ZC.hold(K.down,dz>0.25);ZC.tick(1);}
  [K.left,K.right,K.up,K.down].forEach(k=>ZC.hold(k,false));ZC.tick(1);return U.act(pi).pos.z.toFixed(1);};
// разбег от края трещины и прыжок на тот берег (сосна стоит); Пелагея долетает, только если держать прыжок — планирует
window.LEAP=pi=>{const K=KEYS[pi];GO(pi,pi?1.5:-1.5,31.6,6);let j=-1;for(let i=0;i<120;i++){const h=U.act(pi);ZC.hold(K.up,true);if(j<0&&h.grounded&&h.pos.z<30.0){ZC.press(K.jump);j=i;}else if(j>=0&&i>j+10)ZC.hold(K.jump,i<j+70);ZC.tick(1);}ZC.hold(K.up,false);ZC.hold(K.jump,false);ZC.tick(40);return U.act(pi).pos.z.toFixed(1)+(j<0?'(no jump)':'');};
window.LO=()=>{const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}};
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);NOCINE();ZC.tick(30);NOCINE();LO();'solo='+ZC.G.solo
//@@
// одиночный: Прошка перепрыгивает трещину; Потап, Пелагея и Йоша стоят у хвоста; сосна не повалена
const D=ZC.W.dbg22();const r=['leap z='+LEAP(0),'log='+!!D.F.log];if(D.F.log)throw new Error('сосна повалена — проверка не о том');
if(!(U.act(ZC.G.soloPi).pos.z<25))throw new Error('не перепрыгнули: '+r.join());r.push('go z='+GO(0,0,12,6));ZC.tick(120);
const c=CARDS();if(/Трещина/.test(OBJ(0)+OBJ(1)+c))throw new Error('подсказка про трещину висит: obj0='+OBJ(0).slice(0,40)+' obj1='+OBJ(1).slice(0,40)+' | '+c.slice(0,200));
if(!/Вода тут одна|у ракушки посередине/.test(c))throw new Error('следующая задача не показана: '+c.slice(0,240));'solo ok '+r.join()+' errs='+_errs.length
//@@
// одиночный: сменить героя на того, кто остался у хвоста, — задача не откатывается к трещине
ZC.press('KeyQ');ZC.tick(6);ZC.press('KeyQ');ZC.tick(6);const k=U.act(ZC.G.soloPi).kind,z=U.act(ZC.G.soloPi).pos.z;ZC.tick(60);const c=CARDS();
if(/Трещина/.test(c))throw new Error('после смены героя ('+k+' z='+z.toFixed(1)+') — снова трещина: '+c.slice(0,200));'swap ok '+k+' z='+z.toFixed(1)
//@@
// кооператив: оба игрока перепрыгивают трещину сами — Прошка и Пелагея; у каждого задача дальше
ZC.setSolo(false);ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);NOCINE();ZC.tick(30);NOCINE();LO();
for(const pi of[0,1])for(let i=0;i<3&&U.act(pi).kind!==(pi?'pelageya':'proshka');i++){U.tap(KEYS[pi].swap);ZC.tick(6);}
const D=ZC.W.dbg22();const r=['p1 '+U.act(1).kind+' z='+LEAP(1),'p0 '+U.act(0).kind+' z='+LEAP(0),'p1 after z='+U.act(1).pos.z.toFixed(1),'log='+!!D.F.log];if(D.F.log)throw new Error('сосна повалена');
r.push(GO(0,-2,12,6),GO(1,2,12,6));ZC.tick(120);const c=CARDS();
if(/Трещина/.test(OBJ(0)+OBJ(1)+c))throw new Error('кооператив: трещина висит: '+r.join()+' obj0='+OBJ(0).slice(0,40)+' obj1='+OBJ(1).slice(0,40));
if(!/Вода тут одна|у ракушки посередине/.test(c))throw new Error('кооператив: следующая задача не показана: '+c.slice(0,240));'coop ok '+r.join()+' errs='+_errs.length
//@@
// кооператив, как задумано: Потап валит сосну, оба идут по стволу — задача тоже закрывается
ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);NOCINE();ZC.tick(30);NOCINE();LO();
for(let i=0;i<3&&U.act(0).kind!=='potap';i++){U.tap('KeyQ');ZC.tick(6);}const D=ZC.W.dbg22();const r=[GO(0,4.2,33.8,6)];U.tap('KeyE');ZC.tick(100);if(!D.F.log)throw new Error('сосна не повалена');
r.push(GO(0,0,31,5),GO(0,0,23.5,6),GO(1,0,31,6),GO(1,0,23.5,6));ZC.tick(60);if(/Трещина/.test(OBJ(0)+OBJ(1)))throw new Error('по сосне — трещина висит: '+r.join());
if(_errs.length)throw new Error('ошибки: '+_errs.join(' | '));'log ok '+r.join()
