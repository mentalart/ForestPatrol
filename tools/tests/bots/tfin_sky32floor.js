//@@ wait=1500
// релиз final06: 3-2 — пол не пропадает после ролика Пушка. Ролик растворял нить Пушка (material.opacity у всех детей группы), а нить
// была склеена в локальную пачку с общим на весь уровень материалом — прозрачным становился весь пол из пачек (видны только клинья-юбки
// и пухи под островами). Теперь Пушок не склеивается, а прозрачность материала пачек заперта (late_26_batch.js, batLockMat).
// Шаги с паузами: между ними страница рисует кадры, как в игре.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(5);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}0
//@@ wait=400
U.nocine();ZC.tick(10);U.nocine();ZC.FIN.warp('lamb');const H=ZC.HERO;H.proshka.pos.set(-1.5,15,-104.5);H.pelageya.pos.set(1.5,15,-104.5);for(const h of Object.values(H)){h.vel.set(0,0,0);h.lit=false;}ZC.tick(5);U.tap('KeyR');ZC.tick(20);U.tap('Semicolon');0
//@@ wait=400
let t=0;while(!ZC.G.cine&&t<1800){ZC.tick(1);t++;}if(!ZC.G.cine)throw new Error('нет ролика Пушка');while(ZC.G.cine&&ZC.G.cine.t<6.2)ZC.tick(1);0
//@@ wait=300
while(ZC.G.cine)ZC.tick(1);ZC.tick(120);
const B=ZC.FIN.batch;if(!B.on)throw new Error('пачки выключены');let n=0;const bad=[];
for(const c of B.cells.values()){if(!c.mesh||c.local)continue;n++;const m=c.mesh.material;if(m.opacity<0.99||m.transparent||!c.mesh.visible||!c.mesh.parent)bad.push(c.key+' op='+m.opacity+' tr='+m.transparent+' vis='+c.mesh.visible);}
if(!n)throw new Error('нет пачек статики');if(bad.length)throw new Error('пол из пачек невидим: '+bad.slice(0,4).join(' | '));
let lb=0;ZC.W.lamb32.g.traverse(o=>{if(o.isMesh&&(o.userData.bat||o.userData.batchMesh))lb++;});if(lb)throw new Error('Пушок склеен в пачку: '+lb);
// островам «Высокого уступа» есть кто рисовать: оригинал на слое 31 — только при живой пачке
for(const g of (ZC.W.finG||[]).filter(g=>g.minz<=-110&&g.minz>=-150)){const p=g.mesh.userData.batP;if(g.mesh.userData.bat&&!(p&&p.cell&&p.cell.mesh&&p.cell.mesh.parent))throw new Error('остров z'+g.minz+' спрятан без пачки');}
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'floor ok cells='+n+' locks='+(B.stats.matLock||0)
