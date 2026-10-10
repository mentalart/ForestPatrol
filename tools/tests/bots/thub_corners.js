//@@
// Лукоморье, углы у моря (proto/levels/luko_4b_corners.js): рыбалка с причала Садко (и Золотая рыбка), рыбий альбом, загадки русалки,
// вышка-дозор и «Книга невиданных зверей», «Избушка, повернись!» и кухня Яги, ягоды и грибы, восходящий поток и гнездо на шпиле,
// воздушный змей на Скале Ветрила, сохранение. LV('luko')
window.__e=[];addEventListener('error',e=>window.__e.push(String(e.message)));
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;['1-4','1-5','2-1','2-2','2-3','3-1','3-2','3-5'].forEach(id=>ZC.G.done[id]=true);ZC.tick(20);ZC.goLevel('luko');ZC.tick(120);
U.until(()=>!ZC.G.cine&&ZC.W.flags.stage==='free',20);ZC.skip();ZC.tick(60);
window.L=ZC.W.lc;window.P=(x,y,z)=>{const h=U.act(0);h.pos.set(x,y,z);h.vel.set(0,0,0);ZC.tick(4);return h;};window.nuts=()=>ZC.G.nutsHub||0;window.R={};
[ZC.W.name,ZC.W.flags.mode,ZC.W.flags.stage,'beasts='+L.beasts.map(b=>b.id).join(','),'err='+__e.length]
//@@
// рыбалка: навести кружок на тень рыбы, приманить (прыжок), подсечь на поклёвке, вывести на натяге — держать удар, пока леска
// не звенит, тянуть против рывков, подсекать в прыжке — и подсачек, когда кольцо сожмётся
window.FS=L.FS;
window.fCast=()=>{if(!FS.on){P(L.PE.x,0.35,L.PE.z);U.tap('KeyF');}const s=L.SH.filter(q=>q.st==='roam').sort((a,b)=>Math.hypot(a.x-L.PE.x,a.z-L.PEZ)-Math.hypot(b.x-L.PE.x,b.z-L.PEZ))[0];
  if(s){FS.aimD=Math.min(11,Math.max(2.5,L.PEZ-s.z));FS.aimX=s.x-L.PE.x;}ZC.tick(2);U.tap('KeyF');return 'cast '+U.until(()=>FS.ph==='wait',3)+' d='+FS.aimD.toFixed(1);};
window.fBite=force=>{let i=0;while(FS.ph!=='bite'&&i<60*40){if(FS.ph==='aim'){ZC.tick(2);U.tap('KeyF');}if(i%90===0&&FS.ph==='wait'&&!FS.taken)ZC.press('Space');ZC.tick(1);i++;}
  if(FS.ph!=='bite')return 'bite TIMEOUT';if(force)FS.forceSp=force;U.tap('KeyF');return 'bite t='+(i/60).toFixed(1)+' ph='+FS.ph+' '+(FS.hook?FS.hook.f.id+' '+FS.hook.kg.toFixed(2):'');};
window.fFight=max=>{let i=0;window.LEAPS=window.LEAPS||0;while(FS.ph==='fight'&&i<max){ZC.hold('KeyF',FS.T<0.7);ZC.hold('KeyA',FS.rd>0);ZC.hold('KeyD',FS.rd<0);if(FS.leap>0.3&&!FS.leapHit){ZC.press('Space');LEAPS++;}ZC.tick(1);i++;}
  ZC.hold('KeyF',false);ZC.hold('KeyA',false);ZC.hold('KeyD',false);return 'fight '+(i/60).toFixed(1)+'s T='+FS.T.toFixed(2)+' St='+FS.St.toFixed(2)+' D='+FS.D.toFixed(1)+' ph='+FS.ph;};
window.fNet=()=>{let i=0;while(FS.ph==='net'&&i<60*8){if(FS.netK<0.5)ZC.press('KeyF');ZC.tick(1);i++;}const r='net → '+FS.ph;U.until(()=>FS.ph==='aim'||ZC.G.ui==='wish',5);return r;};
window.fishOne=()=>{const r=[fCast(),fBite()];for(let k=0;k<3&&FS.ph!=='net'&&FS.ph!=='show';k++){r.push(fFight(60*90));if(FS.ph==='aim')r.push(fCast(),fBite());}r.push(fNet());return r;};
const n0=nuts();const r=fishOne().concat(fishOne());R.fish=Object.values(L.LC.fish).reduce((a,b)=>a+b,0);R.bag=L.LC.bag.fish;R.kg=Object.keys(L.LC.kg).length;
r.concat(['fish='+JSON.stringify(L.LC.fish),'kg='+JSON.stringify(L.LC.kg),'bag='+R.bag,'leaps='+LEAPS,'nuts+'+(nuts()-n0),'ph='+FS.ph])
//@@ shot=hc_fish_aim.png
// снимок: прицел — кружок на воде, тени рыб
ZC.tick(40);'ph='+FS.ph+' shadows='+L.SH.length
//@@
// Золотая рыбка (после 2-3): подсечь, вывести, подсачек — желание «орешков лукошко»
const r=[fCast(),fBite('zolotaya'),fFight(150)];r
//@@ shot=hc_fish_fight.png
// снимок: вываживание — удилище согнуто, натяжение лески, силы рыбы
ZC.tick(1);'T='+FS.T.toFixed(2)
//@@
const r=[fFight(60*90),fNet(),'ui='+ZC.G.ui,(document.querySelector('#mapui h2')||{}).innerText];const n0=nuts();U.tap('Space');ZC.tick(120);R.gold=L.LC.gold||0;R.wish=nuts()-n0;
r.concat(['gold='+R.gold,'wish nuts+'+R.wish,'ui='+ZC.G.ui,'fishing='+FS.on])
//@@
// рыбий альбом у доски на входе
P(L.BOARD.x+0.6,0.05,L.BOARD.z+0.6);U.tap('KeyF');const r=['ui='+ZC.G.ui,(document.querySelector('#mapui .step')||{}).innerText];R.album=ZC.G.ui==='album';U.tap('KeyG');ZC.tick(5);r.concat(['ui='+ZC.G.ui])
//@@
// загадки русалки: первая — сначала неверно, потом верно; ещё две — сразу верно
const i0=L.LC.ri||0;P(L.RIDP.x,0.05,L.RIDP.z);U.tap('KeyF');const r=['ui='+ZC.G.ui];const n0=nuts();
window.answer=(id,wrong)=>{const opts=[...document.querySelectorAll('#mapui .opt')].map(o=>o.innerText.trim());const right=L.RID[id][1];let k=opts.indexOf(right);if(wrong)k=(k+1)%3;
  for(let s=0;s<k;s++)U.tap('KeyS');U.tap('Space');ZC.tick(4);for(let s=0;s<k;s++)U.tap('KeyW');ZC.tick(2);return k;};
r.push('wrong@'+answer(i0%L.RID.length,true),'crossed='+document.querySelectorAll('#mapui .opt[style*="line-through"]').length);
for(let j=0;j<3;j++){r.push('ok@'+answer((i0+j)%L.RID.length));ZC.tick(80);}
ZC.tick(100);R.rid=Object.keys(L.LC.rd).length;R.ridNuts=nuts()-n0;r.concat(['solved='+R.rid,'nuts+'+R.ridNuts,'ui='+ZC.G.ui])
//@@ shot=hc_rid.png
// снимок окна загадки
P(L.RIDP.x,0.05,L.RIDP.z);U.tap('KeyF');ZC.tick(30);'ui='+ZC.G.ui
//@@
U.tap('KeyG');ZC.tick(5);
// вышка-дозор: подняться, навести трубу на зверя, зарисовать
P(L.TWB.x,0.05,L.TWB.z);U.tap('KeyF');ZC.tick(70);const h=U.act(0),r=['ui='+ZC.G.ui,'y='+h.pos.y.toFixed(1)];
const b=L.beasts.find(q=>q.id==='zayac')||L.beasts[0];const v=b.o.g.position.clone();v.y+=b.aim;v.sub(L.EYE);const n0=nuts();
for(let i=0;i<90;i++){const w=b.o.g.position.clone();w.y+=b.aim;w.sub(L.EYE);L.DZ2.yaw=Math.atan2(w.x,w.z);L.DZ2.pitch=Math.atan2(w.y,Math.hypot(w.x,w.z));ZC.tick(1);}
R.beast=L.LC.beasts[b.id]||0;r.concat(['aim '+b.id,'seen='+R.beast,'nuts+'+(nuts()-n0)])
//@@ shot=hc_dozor.png
// Совиный взор в трубе
U.tap('KeyE');ZC.tick(20);R.owl=L.beasts.filter(b=>b.mark&&b.mark.visible).length;'owl marks='+R.owl
//@@ shot=hc_book.png
U.tap('Space');ZC.tick(10);R.book=ZC.G.ui==='book';['ui='+ZC.G.ui,(document.querySelector('#mapui .step')||{}).innerText]
//@@
U.tap('KeyG');ZC.tick(5);const r=['back='+ZC.G.ui];U.tap('KeyG');ZC.tick(70);r.concat(['ui='+ZC.G.ui,'y='+U.act(0).pos.y.toFixed(1)])
//@@
// избушка, повернись! и кухня Яги: каша из топора, потом уха из двух рыб
P(L.HUTF.x,0.05,L.HUTF.z);const r=['front0='+L.hutFront(),'note='+(L.lcAction(U.act(0),0)||{}).note];U.tap('KeyF');ZC.tick(260);r.push('front='+L.hutFront(),'ui='+ZC.G.ui);
window.cook=(name)=>{U.tap('KeyF');ZC.tick(4);const opts=[...document.querySelectorAll('#mapui .opt span')].map(o=>o.innerText.replace(' ✓','').trim());const k=opts.indexOf(name);for(let s=0;s<k;s++)U.tap('KeyS');U.tap('Space');ZC.tick(2);
  const out=['k='+k,'ui='+ZC.G.ui];let i=0;while(L.CK.on&&i<600){const t=L.CK.t;ZC.hold('KeyA',(i>>3)%2===0);ZC.hold('KeyD',(i>>3)%2===1);if([1.8,3.9,6.0].some(c=>Math.abs(t-c)<0.009))ZC.press('KeyF');ZC.tick(1);i++;}
  ZC.hold('KeyA',false);ZC.hold('KeyD',false);ZC.tick(30);return out.concat(['stir='+L.CK.stir.toFixed(2),'hits='+L.CK.hits]);};
const n0=nuts();r.push(...cook('Каша из топора'));P(L.HUTF.x,0.05,L.HUTF.z);r.push(...cook('Уха'));R.dish=Object.keys(L.LC.dish).length;r.concat(['dishes='+JSON.stringify(L.LC.dish),'bag='+JSON.stringify(L.LC.bag),'nuts+'+(nuts()-n0)])
//@@ shot=hc_cook.png
// снимок: варим кисель из ягод с куста у скалы (ягоды — сначала собрать)
const B=L.BUSH[0];P(B.x-1.2,0.05,B.z);U.tap('KeyF');ZC.tick(5);const B2=L.BUSH[1];P(B2.x-1.2,0.05,B2.z);U.tap('KeyF');ZC.tick(5);R.berry=L.LC.bag.berry;
P(L.HUTF.x,0.05,L.HUTF.z);U.tap('KeyF');ZC.tick(4);const opts=[...document.querySelectorAll('#mapui .opt span')].map(o=>o.innerText.replace(' ✓','').trim());const k=opts.indexOf('Ягодный кисель');for(let s=0;s<k;s++)U.tap('KeyS');U.tap('Space');ZC.tick(100);
['berry='+R.berry,'ui='+ZC.G.ui]
//@@
let i=0;while(L.CK.on&&i<600){ZC.hold('KeyA',(i>>3)%2===0);ZC.hold('KeyD',(i>>3)%2===1);ZC.tick(1);i++;}ZC.hold('KeyA',false);ZC.hold('KeyD',false);ZC.tick(20);
// грибы: наступить на гриб — в лукошко
const m=L.MUSH.findIndex((p,j)=>!L.LC.mushGot.includes(j)&&((j*5+(ZC.G.trips||0)*3)%7)<4);const p=L.MUSH[m];P(p.x,0.05,p.z);ZC.tick(5);R.mush=L.LC.bag.mush;
['kisel='+(L.LC.dish.kisel||0),'mush#'+m+'='+R.mush]
//@@
// восходящий поток подымает к шпилю, в гнезде — орешки
const h=P(L.UPD.x,0.05,L.UPD.z);ZC.tick(150);const y=h.pos.y;const n0=nuts();h.pos.x=L.SPIRE.x;h.pos.z=L.SPIRE.z;ZC.tick(40);R.nest=L.LC.nestT===(ZC.G.trips||0);
['updraft y='+y.toFixed(1),'on spire y='+h.pos.y.toFixed(1),'nest='+R.nest,'nuts+'+(nuts()-n0)]
//@@
// воздушный змей на вершине Скалы Ветрила: вести к облачкам
P(L.TOP.x,L.TOP.y+0.1,L.TOP.z);ZC.tick(10);const r=['note='+(L.lcAction(U.act(0),0)||{}).note];U.tap('KeyF');r.push('ui='+ZC.G.ui);const n0=nuts();
window.kiteSteer=n=>{for(let i=0;i<n&&L.KT.on;i++){const K=L.KT;ZC.hold('KeyA',K.u>K.ru+0.3);ZC.hold('KeyD',K.u<K.ru-0.3);if(K.v<K.rv-0.4&&i%20===0)ZC.press('Space');ZC.tick(1);}ZC.hold('KeyA',false);ZC.hold('KeyD',false);};
kiteSteer(600);r.concat(['rings='+L.KT.rings])
//@@ shot=hc_kite.png
kiteSteer(1);'kite on='+L.KT.on
//@@
const n0=nuts();kiteSteer(2400);ZC.tick(30);R.kite=L.LC.kite.best;['rings='+L.KT.rings,'best='+R.kite,'on='+L.KT.on,'ui='+ZC.G.ui]
//@@
// сохранение: состояние углов едет в G.flags.lc
ZC.G.hub=true;ZC.FIN.saveGame();const d=ZC.FIN.readSave(),lc=d&&d.G.flags&&d.G.flags.lc;R.save=!!lc&&Object.keys(lc.fish||{}).length>0&&Object.keys(lc.dish||{}).length>=2;
const ok=R.fish>=2&&R.kg>=1&&R.bag>=0&&R.gold>=1&&R.wish>=10&&R.album&&R.rid>=3&&R.ridNuts>=4&&R.beast>=1&&R.owl>=1&&R.book&&R.dish>=2&&R.berry>=2&&R.mush>=1&&R.nest&&R.kite>=3&&R.save&&__e.length===0;
if(!ok)throw new Error('FAIL thub_corners '+JSON.stringify(R)+' err='+__e.join(';'));
[JSON.stringify(R),'thub_corners ok']
