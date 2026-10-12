//@@
// мир 4, сюжет (docs/39, СЮ.1–СЮ.4): рык Горыныча во вступлении 4-1, силуэт над лавопадом 4-2, Демьян у плуга 4-4, Кузьма на берегу 4-5,
// осколки лубка 4-2 … 4-5 (G.flags.w4shards), Пелагея читает громко в 4-3 и командует в бою 4-Б.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};window.S=ZC.FIN.w4story;window.V=(w,t)=>ZC.FIN.vox.find(w,t);
ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(30);U.act(0).pos.set(0,0,-7.4);for(let i=0;i<60*14&&!S.log.includes('roar');i++)ZC.tick(1);
chk(S.log.includes('roar'),'4-1: во вступлении нет рыка Горыныча');U.nocine();
'roar='+S.log.includes('roar')
//@@
// осколки лубка: уровень за уровнем (флаги не сбрасываются), а заодно — силуэт, Демьян, Кузьма
const shard={'4-2':[-11.2,5.9,-22.6],'4-3':[-6.4,0.9,14.2],'4-4':[9,0.9,-56.4],'4-5':[-8,0.9,12.4]};const r=[];
for(const lv of['4-2','4-3','4-4','4-5']){ZC.loadLevel(ZC.LV(lv));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(3);const W=ZC.W;
  if(lv==='4-4')chk(!!W.demyan,'4-4: нет Демьяна у плуга');if(lv==='4-5')chk(!!W.kuzma,'4-5: нет Кузьмы на берегу');
  const [x,y,z]=shard[lv],h=U.act(0);h.pos.set(x,y-0.9+0.05,z);h.vel.set(0,0,0);ZC.tick(20);r.push(lv+':'+!!(ZC.G.flags.w4shards||{})[lv]);}
chk(Object.keys(ZC.G.flags.w4shards||{}).length===4,'осколков лубка не 4: '+r.join(' '));
chk(V('demyan','Эти валы мы с Кузьмой на Змее пахали.')&&V('kuzst','Мост наш ковали — не подведёт.'),'нет записей кузнецов');
const e=V('pelageya','Бревно — прыжком! Лямку не бросать!');chk(e&&e.gain>1.2,'4-3: Пелагея читает не громко');
chk(V('pelageya','Потап, беги — я вижу целые доски!'),'4-5: нет своих слов Пелагеи');
'shards '+r.join(' ')
//@@
// 4-2: тень Горыныча проносится над лавопадом в начале ролика
ZC.startFrom(ZC.LV('4-2'));ZC.G.manual=true;ZC.tick(30);U.nocine();const W2=ZC.W;W2.flags.stage='d';for(const n of['proshka','yosha'])ZC.HERO[n].pos.set(0,0,-48);ZC.tick(3);let sh=false;
for(let i=0;i<60*4;i++){ZC.tick(1);const m=W2.gorShadow;if(m&&m.parent&&m.material.opacity>0.2)sh=true;}chk(sh,'4-2: нет тени Горыныча над лавопадом');U.nocine();'shadow='+sh
//@@
// 4-4: в ролике легенду рассказывает Демьян
ZC.startFrom(ZC.LV('4-4'));ZC.G.manual=true;let dm=false;for(let i=0;i<60*12&&!dm;i++){ZC.tick(1);const c=ZC.G.cine;if(c&&(c._says||[]).some(s=>s[2]==='demyan'))dm=true;}
chk(dm,'4-4: Демьян не говорит во вступлении');U.nocine();'demyan='+dm
//@@
// 4-Б: Пелагея командует — этап 2, сытая голова, этап 3
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(3);const W=ZC.W,F=W.flags;W.enemies.forEach(e=>{e.cd=1e9;});
F.phase=2;for(let i=0;i<60*3;i++){ZC.tick(1);U.nocine();}const hd=W.enemies.find(e=>e.alive);if(hd)hd.sat=8;for(let i=0;i<60*3;i++){ZC.tick(1);U.nocine();}
F.phase=3;for(let i=0;i<60*3;i++){ZC.tick(1);U.nocine();}
chk(['p2','sat','p3'].every(k=>S.log.includes(k)),'4-Б: Пелагея не командует: '+S.log.join(','));'cmd '+S.log.join(',')
//@@
const ok=!BAD.length&&!_errs.length;(ok?'tfin_w4story ok':'FAIL tfin_w4story '+BAD.join(' | ')+' errs='+_errs.join(' | '))
