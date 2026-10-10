//@@
// final03: коллизии, триггеры и спавны не изменились — хеш по каждому уровню сравнивается с прототипом (эталон EXPECT снят с index.html)
window.__colHash=()=>{const W=ZC.W,r=v=>Math.round(v*100);let s='';const h=str=>{let x=5381;for(let i=0;i<str.length;i++)x=((x*33)^str.charCodeAt(i))>>>0;return x.toString(36);};
  for(const b of W.boxes)s+='b'+[b.minx,b.maxx,b.miny,b.maxy,b.minz,b.maxz].map(r).join(',')+(b.on?1:0)+(b.occ?1:0);
  const rndCyl=W.levelId==='5-2';   // в 5-2 прототип сажает деревья (цилиндры) случайно — сравниваются число и размеры
  for(const c of W.cyls)s+='c'+(rndCyl?[c.r,c.miny,c.maxy]:[c.x,c.z,c.r,c.miny,c.maxy]).map(r).join(',')+(c.on?1:0);
  for(const p of (W.ramps||[]))s+='r'+JSON.stringify(p,(k,v)=>typeof v==='number'?r(v):(v&&v.isObject3D?undefined:v)).length;
  for(const sp of (W.spawns||[]))for(const v of sp)if(v)s+='s'+[v.x,v.y,v.z].map(r).join(',');
  s+='f'+r(W.fallY||-9)+'|'+['plates','gates','bells','items','tipZones','camZones','waters','lavas','stakes','sockets','chests','enemies','hittables','lifts','movers'].map(k=>(W[k]||[]).length).join(',');
  for(const p of W.plates)s+='p'+[p.x,p.z,p.r].map(r).join(',');for(const g of W.gates)s+='g'+[g.minx,g.maxx,g.z].map(r).join(',');for(const b of W.bells)s+='l'+[b.x,b.z].map(r).join(',');
  return h(s)+':'+W.boxes.length;};
const out=[];for(const L of ZC.LEVELS){try{ZC.startFrom(ZC.LV(L.id));ZC.G.manual=true;ZC.tick(2);out.push(L.id+'='+__colHash());}catch(e){out.push(L.id+'=ERR');}}window.__col=out;out.join(' ')
//@@
const EXPECT='p=zgkzxx:52 luko=1rhy7t9:15 1-1=1sdpwwj:17 1-2=12ik6nh:36 1-3=px09lv:13 1-4=19ufykh:26 1-5=d0hkb3:9 1-B=1xh2e44:5 2-1=lpk7my:113 2-2=y4v344:34 2-3=1a3gbre:30 2-4=1eno768:36 2-5=1vgao0v:95 2-B=1umikcv:9 3-1=1t9galn:17 3-2=z6xee8:15 3-3=kxauf4:4 3-4=17n1y6u:11 3-5=1kkv1hb:12 3-B=3mebjh:2 4-1=vnz5hc:18 4-2=c7w640:19 4-3=13e8vqc:61 4-4=10d9kyc:17 4-5=1u9g1d0:17 4-B=17boi6a:2 5-1=80cw16:42 5-2=1jsrz12:5 5-3=l0qgut:0 5-4=1ay90r8:5 5-B1=1obr8vq:5 5-B2=1j8ua5y:5 epi=1orfreu:10 z-i=1bu9p1e:4 z-d=31yxzp:1 z-a=uecslv:3';// намеренные отличия релиза от прототипа (правки геймплея в rep_30_gameplay.py) — у них свой эталон:
// final06: Лукоморье — стан и берег отодвинуты от дуба на W.shoreDZ; 5-Б2 — новый финальный бой (свечи, Кощей в бою, late_93);
// пролог — мебель штаба с коллизиями (сундук, бочонок, корзина, столик с рассадой, подзорная труба; late_96b)
// мир 2 — уровни вдвое длиннее (late_99e…late_99j, docs/15_kitezh.md)
// 2-Б — погоня ≈190 м и бой в четыре этапа: мели, остров, плоты, колокола (late_99j, late_99s, docs/23_vodyanoy_boss.md)
const RELEASE={p:'cj1x5b:52',luko:'145umx4:15','5-B2':'gsazlt:67','2-1':'13q3gl9:199','2-2':'1eca5br:83','2-3':'1p3ohd:53','2-4':'1ki9wih:51','2-5':'9u122t:127','2-B':'xyr1nz:61','3-1':'6qp3bl:54','3-2':'1ns5tlk:32','3-B':'eejysl:28','1-4':'12stj0h:36'};   // 3-1, 3-2: втрое длиннее (late_99p_sky31, late_99o_sky32)   // 5-Б2: восемь свечей (final06, правки по отзыву)
const got=__col;if(EXPECT==='EXPECT'+'_TABLE')'эталон не задан';else{const E=EXPECT.split(' ').map(e=>{const id=e.split('=')[0];return RELEASE[id]?id+'='+RELEASE[id]:e;});const bad=got.filter((g,i)=>g!==E[i]);'col '+(bad.length?'DIFF '+bad.join(' '):'same='+got.length);}
