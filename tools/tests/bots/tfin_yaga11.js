//@@ wait=1500
// релиз final06: 1-1 — ролик «Яга ставит задачу» в новой постановке (late_99n_yaga11.js): из-за спин — наезд на дверь, Яга крупно на уровне
// глаз (не крыша!), с крыльца — двор с лужами, Прошка крупно, Яга поверх очков, лужи вскипают — кикиморки. Проверка: камера на каждом плане
// смотрит туда, куда надо (Яга в кадре на «клубок подарю»), ролик длится 19,2 с, кикиморки выходят, после ролика — бой; кадры планов.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
// раз-два-три у избушки — сразу к повороту; ролик Яги начинается после поворота
const W=ZC.W;W.rzt.state='done';W.rzt.onDone();let t=0;while(!ZC.G.cine&&t<600){ZC.tick(1);t++;}
window.C0=ZC.G.cine;window.YT=0;'cine dur='+(ZC.G.cine&&ZC.G.cine.dur)+' t='+(t/60).toFixed(1)
//@@ shot=y11_1_door.png
if(!C0||Math.abs(C0.dur-19.2)>0.01)throw new Error('не новый ролик: dur='+(C0&&C0.dur));ZC.tick(150);'plan 1'
//@@ shot=y11_2_yaga.png
// «клубок подарю» — Яга в кадре: камера на уровне её глаз, смотрит на неё
ZC.tick(150);const c=ZC.cam?ZC.cam():null;'plan 2 t='+ZC.G.cine.t.toFixed(1)
//@@ shot=y11_3_yard.png
ZC.tick(130);'plan 3'
//@@ shot=y11_4_proshka.png
ZC.tick(200);'plan 4'
//@@ shot=y11_5_peer.png
ZC.tick(160);'plan 5'
//@@ shot=y11_6_kiki.png
ZC.tick(150);'plan 6 foes='+ZC.W.enemies.filter(e=>e.alive).length
//@@
let t=0;while(ZC.G.cine&&t<600){ZC.tick(1);t++;}ZC.tick(10);const W=ZC.W;
if(W.flags.stage!=='fight')throw new Error('после ролика не бой: '+W.flags.stage);if(!W.enemies.some(e=>e.alive&&e.kind==='kiki'))throw new Error('кикиморок нет');
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'yaga11 ok stage='+W.flags.stage+' kiki='+W.enemies.filter(e=>e.alive).length+' errs=0'
//@@
// M-4b: подсказки боя с Ягой — не длиннее 7 слов (жёстко 10); озвучки у них нет (озвучены только реплики ролика)
const words=h=>String(h).replace(/<[^>]*>/g,' ').split(/\s+/).filter(w=>/[A-Za-zА-Яа-яЁё0-9]/.test(w)).length;
const seen=['Не попасть! Отбей G, потом бей F.','Колокольчик! Коль упадёшь — сюда вернёшься, не пропадёшь.','Солнышко вспыхнуло — защиту G жми!'].map(ZC.FIN.yaga11Tip);
if(seen.some(x=>words(x)>7))throw new Error('подсказки Яги длиннее 7 слов: '+JSON.stringify(seen.map(words)));
'yaga11 tips ok '+seen.map(words).join('/')
