// релиз final06: Сказы 1–4 на Лукоморье — три двустишия (беда · помощник · конец), помощник оживает у дуба, у конца — сувенир, эхо в следующем Сказе, «Наши сказки» у Кота.
// LV('luko')
//@@
// все 12 помощников узнаются по тексту (helperOf) — и старые сохранения с прежними строками тоже
ZC.startFrom(ZC.LV('1-B'));const G=ZC.G;G.manual=true;ZC.tick(10);const S=ZC.SKAZ,bad=[];
for(let n=1;n<=4;n++){const st=S[n].steps;if(st.length!==3||st.some(x=>x.opts.length!==3))bad.push('форма '+n);
  st[1].opts.forEach(o=>{G.flags[['','skaz','skaz2','skaz3','skaz4'][n]]=[st[0].opts[0].t,o.t,st[2].opts[0].t];const k=ZC.helperOf(n);if(k!==o.k)bad.push(n+':'+o.k+'->'+k);});}
G.flags.skaz=['Жили-были звери во лесу','баба Яга с клубочком','И лес с тех пор тропинок не путал'];if(ZC.helperOf(1)!=='yaga')bad.push('старая строка Яги');
G.flags.skaz=null;G.flags.skaz2=null;G.flags.skaz3=null;G.flags.skaz4=null;
bad.length?'FAIL '+bad.join(' | '):'helpers ok'
//@@ shot=skaz1_choose.png
// праздник 1: Сказ 1 — выбор (начало: Игрок 2, помощник: Игрок 1, конец: оба)
ZC.startFrom(ZC.LV('1-B'));const G=ZC.G;G.manual=true;ZC.tick(10);['1-1','1-2','1-3','1-4','1-5'].forEach(id=>{G.done[id]=true;G.got[id]=3;G.nutsGot[id]=3;});G.done['1-B']=true;
ZC.goLevel('luko');ZC.tick(120);const r=[ZC.W.levelId,ZC.W.flags.mode,!!G.cine];ZC.skip();ZC.tick(10);r.push('ui='+G.ui);
const html=document.getElementById('skaz').innerHTML;r.push(/Леший-проводник/.test(html)&&/ёлки хороводом|ёлки/i.test(html)?'шаг 1 ok':'FAIL шаг 1');r
//@@ shot=skaz1_helpers.png
U.tap('ArrowDown');U.tap('ArrowDown');U.tap('KeyM');ZC.tick(3);
const h2=document.getElementById('skaz').innerHTML;(/весточка в следующем мире/.test(h2)?'подсказка весточки ok':'FAIL нет подсказки весточки')+' | '+(/Колобок|Леший|Яга/.test(h2)?'помощники ok':'FAIL')
//@@ shot=skaz1_ends.png
U.tap('KeyS');U.tap('Space');ZC.tick(3);const h3=document.getElementById('skaz').innerHTML;(/смешной конец/.test(h3)&&/тёплый конец/.test(h3)&&/конец с загадкой/.test(h3)?'концы с настроением ok':'FAIL концы')
//@@
// несовпавший конец: красный промах, окно остаётся
U.tap('KeyD');U.tap('Space');U.tap('KeyM');ZC.tick(3);const a=ZC.G.ui;
U.tap('ArrowRight');U.tap('Space');U.tap('KeyM');ZC.tick(3);const b=ZC.G.ui;
a==='skaz'&&b===null?'вдвоём ok':'FAIL a='+a+' b='+b
//@@
const G=ZC.G,t=G.flags.skaz,S=ZC.SKAZ[1].steps,r=[];
r.push(t&&t[0]===S[0].opts[2].t&&t[1]===S[1].opts[1].t&&t[2]===S[2].opts[1].t?'сказ записан ok':'FAIL '+JSON.stringify(t));
r.push(ZC.helperOf(1)==='yaga'?'Яга ok':'FAIL helper '+ZC.helperOf(1),'cine='+!!G.cine);r
//@@ shot=skaz1_helper.png
// помощник появляется на 6-й секунде, сувенир — на 11-й
const r=[U.until(()=>ZC.W.skz.helper,12)];ZC.tick(50);const hf=ZC.W.skz.helper;r.push(hf&&hf.k==='yaga'&&hf.m.g.visible?'помощник ok':'FAIL помощник');r
//@@ shot=skaz1_souvenir.png
const r=[U.until(()=>ZC.W.skz.souv[1],12)];ZC.tick(60);r.push(ZC.W.skz.souv[1]&&ZC.W.skz.souv[1].visible?'сувенир ok':'FAIL сувенир');r
//@@
ZC.tick(5);'ok'
//@@
// дорассказ и «Голос»: сказ доиграл, мир 1 пройден
for(let i=0;i<40&&!ZC.G.flags.voiceDone;i++){ZC.skip();ZC.tick(120);}
const G=ZC.G;[G.flags.voiceDone===true?'voiceDone ok':'FAIL voiceDone',G.state]
//@@ shot=skaz1_hub.png
// возвращение на Лукоморье: помощник и сувенир на поляне, «Наши сказки» у Кота
ZC.start();ZC.G.hub=true;ZC.loadLevel(ZC.LV('luko'));ZC.tick(60);ZC.skip();ZC.tick(40);const W=ZC.W,r=[];
r.push(W.skz.helper&&W.skz.helper.k==='yaga'?'помощник на поляне ok':'FAIL помощник на поляне',W.skz.souv[1]?'сувенир на поляне ok':'FAIL сувенир на поляне');
const h=U.act(0);h.pos.set(1.0,0,-3.2);ZC.tick(2);U.tap('KeyF');ZC.tick(3);r.push('ui='+ZC.G.ui);r
//@@ shot=skaz1_book.png
const r=[];const tl=document.getElementById('mapui').innerHTML;r.push(/Наши сказки/.test(tl)?'книга в меню ok':'FAIL нет книги');
U.tap('Space');ZC.tick(3);r.push('ui='+ZC.G.ui);const bk=document.getElementById('mapui').innerHTML;r.push(/Леший-проводник/.test(bk)&&/Бабу|Яга/.test(bk)?'страница ok':'FAIL страница');r
//@@
U.tap('Escape');ZC.tick(3);'ui='+ZC.G.ui
//@@ shot=skaz2_choose.png
// праздник 2: эхо про прошлую сказку — в вводном ролике и в окне выбора; помощник Сказа 1 уходит, приходит помощник Сказа 2
const G=ZC.G;['2-1','2-2','2-3','2-4','2-5'].forEach(id=>{G.done[id]=true;G.got[id]=3;G.nutsGot[id]=3;});G.done['2-B']=true;G.hub=false;G.subs=true;ZC.start();
ZC.goLevel('luko');ZC.tick(60);const r=[ZC.W.flags.mode];let echo=false;for(let i=0;i<30&&G.cine;i++){ZC.sim(0.5);if(/прошлую сказку/.test(document.getElementById('subs').textContent))echo=true;}
r.push(echo?'эхо в ролике ok':'FAIL нет эха в ролике');if(G.cine)ZC.skip();ZC.tick(10);r.push('ui='+G.ui);r.push(/прошлый сказ — про Бабу Ягу/.test(document.getElementById('skaz').innerHTML)?'эхо в окне ok':'FAIL нет эха в окне');r
//@@
U.tap('Space');U.tap('Space');U.tap('Space');ZC.tick(2);const G=ZC.G,r=['ui='+G.ui];
U.tap('KeyM');U.tap('KeyM');ZC.tick(2);r.push('ui='+G.ui);U.tap('Space');U.tap('KeyM');ZC.tick(3);r.push('ui='+G.ui,G.flags.skaz2&&G.flags.skaz2.length===3?'сказ 2 записан ok':'FAIL skaz2='+JSON.stringify(G.flags.skaz2));r
//@@ shot=skaz2_helper.png
const r=[U.until(()=>ZC.W.skz.helper&&ZC.W.skz.helper.k===ZC.helperOf(2),12)];ZC.tick(60);r.push(ZC.helperOf(2)==='sadko'?'Садко ok':'FAIL helper '+ZC.helperOf(2));r
//@@
for(let i=0;i<40&&!ZC.G.flags.w2done;i++){ZC.skip();ZC.tick(120);}ZC.G.flags.w2done===true?'сказ 2 доигран ok':'FAIL w2done'
//@@
// все 12 помощников и все 12 концов собираются на поляне без ошибок: на каждый — помощник последней сказки и сувенир своего сказа
ZC.start();const G=ZC.G,S=ZC.SKAZ,F=['','skaz','skaz2','skaz3','skaz4'],bad=[];ZC.W&&0;G.flags.w5done=false;
for(let n=1;n<=4;n++)for(let k=0;k<3;k++){[1,2,3,4].forEach(m=>{G.flags[F[m]]=null;});G.flags[F[n]]=[S[n].steps[0].opts[k].t,S[n].steps[1].opts[k].t,S[n].steps[2].opts[k].t];
  G.hub=true;ZC.loadLevel(ZC.LV('luko'));ZC.tick(20);ZC.skip();ZC.tick(5);const W=ZC.W;
  if(!(W.skz.helper&&W.skz.helper.k===S[n].steps[1].opts[k].k))bad.push('помощник '+n+':'+k);if(!W.skz.souv[n]||!W.skz.souv[n].visible)bad.push('сувенир '+n+':'+k);}
bad.length?'FAIL '+bad.join(' | '):'12 помощников и 12 сувениров ok'
//@@ shot=skaz_all.png
// поляна со всеми четырьмя сказами: сувениры по кругу у дуба, помощник последней — слева
[1,2,3,4].forEach((m,i)=>{ZC.G.flags[['','skaz','skaz2','skaz3','skaz4'][m]]=[0,1,2].map(j=>ZC.SKAZ[m].steps[j].opts[j===2?i%3:1].t);});
ZC.G.hub=true;ZC.loadLevel(ZC.LV('luko'));ZC.tick(20);ZC.skip();ZC.tick(5);U.act(0).pos.set(0.5,0,-1.5);U.act(1).pos.set(-1.2,0,-1.0);ZC.tick(90);
const W=ZC.W;'helper='+(W.skz.helper&&W.skz.helper.k)+' souv='+Object.keys(W.skz.souv).join(',')
//@@ shot=skaz_kit.png
ZC.G.flags.skaz=null;ZC.G.flags.skaz3=null;ZC.G.flags.skaz4=null;ZC.G.flags.skaz2=[0,1,2].map(j=>ZC.SKAZ[2].steps[j].opts[1].t);
ZC.G.hub=true;ZC.loadLevel(ZC.LV('luko'));ZC.tick(20);ZC.skip();ZC.tick(5);U.act(0).pos.set(-2.5,0,0.5);U.act(1).pos.set(-3.5,0,1.0);ZC.tick(90);'helper='+ZC.W.skz.helper.k
//@@ shot=skaz_sirin.png
ZC.G.flags.skaz2=null;ZC.G.flags.skaz3=[0,1,2].map(j=>ZC.SKAZ[3].steps[j].opts[1].t);
ZC.G.hub=true;ZC.loadLevel(ZC.LV('luko'));ZC.tick(20);ZC.skip();ZC.tick(5);U.act(0).pos.set(-2.5,0,0.5);U.act(1).pos.set(-3.5,0,1.0);ZC.tick(90);'helper='+ZC.W.skz.helper.k
