//@@
// мир 4, арт и эффекты (docs/39, АР.1–АР.9): палитры уровней, кромка у лавы и марево, вехи на горизонте, пузыри и полосы лавы,
// остывание по стадиям, пар и трещины корки, ковка (hit-stop), лямка 4-3, «голова» лавы 4-4, цепи 4-5, трещины на оживающих кузнецах.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};window.A=ZC.FIN.w4art;window.go=lv=>{ZC.startFrom(ZC.LV(lv));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(3);return ZC.W;};
const W=go('4-2');chk(A.log.includes('pal:4-2'),'4-2: палитра не применена');chk(!!W.w4rim&&W.w4haze&&W.w4haze.length>3,'4-2: нет кромки или марева у лавы');
chk(W.w4marks&&W.w4marks.length===2,'4-2: нет вех на горизонте');chk(W.w4strips&&W.w4strips.length>0,'4-2: нет полос течения на струе');
for(let i=0;i<60*8;i++)ZC.tick(1);chk((A.n.pop||0)>0,'4-2: пузыри на лаве не лопаются');
'4-2 rim='+(W.w4rim&&W.w4rim.geometry.attributes.position.count)+' haze='+W.w4haze.length+' strips='+W.w4strips.length+' pops='+(A.n.pop||0)
//@@
// корка: пар при появлении, трещины за 3 с до конца
const W=ZC.W,Y=ZC.HERO.yosha;U.walkTo(1,0,-1.6,3);Y.face=Math.PI;ZC.tick(2);U.tap('KeyL');ZC.tick(40);chk((A.n.steam||0)>0,'корка: нет пара при появлении');
const c=W.crusts.find(c=>!c.gone);if(c){c.t=3.3;ZC.tick(30);}chk((A.n.crack||0)>0,'корка: нет трещин в конце');'crust steam='+A.n.steam+' crack='+A.n.crack
//@@
// 4-1: свет корыта, остывание по стадиям, точный удар — hit-stop
const W=go('4-1');chk(!!A.trough&&A.trough.parent,'4-1: нет голубого света корыта');const far=i=>!W.forges.some(f=>Math.hypot(f.pos.x-i.pos.x,f.pos.z-i.pos.z)<f.r+1);const it=W.hots.find(i=>!i.gone&&!i.gold&&!i.socket&&!i.carrier);if(it&&!far(it))it.pos.set(-4,0.2,-4);
if(it){it.noCool=false;it.heat=0.24;for(let i=0;i<60*3&&!(A.n.tick>0);i++){it.heat=Math.max(0,it.heat-0.004);ZC.tick(1);}}chk((A.n.tick||0)>0,'остывание: нет «тика» на последней стадии: '+(it?it.kind+' heat='+it.heat.toFixed(2):'нет предмета'));
W.fx4('strike',new ZC.HERO.proshka.pos.constructor(0,1,-14));chk(ZC.G.hitstop>0,'ковка: нет hit-stop');'4-1 tick='+A.n.tick
//@@
// 4-3: палитра заката, лямка; 4-4: Демьян оживает трещинами, «голова» лавы; 4-5: цепи
let W=go('4-3');chk(ZC.W.levelId==='4-3'&&A.log.includes('pal:4-3'),'4-3: нет палитры заката');W.fx4('rope',W.BARGE?ZC.HERO.potap.pos:null);
W=go('4-4');chk(!!W.lavaHead,'4-4: нет «головы» лавы');if(W.demyan&&W.demyan.setStone){W.demyan.setStone(0.5);}chk((A.n.smithcrack||0)>0,'кузнец: нет трещин при оживлении');
W=go('4-5');chk(!!W.chainL,'4-5: цепи не видны модулю');W.flags.stage='hold';W.HD.sway=0.9;ZC.tick(3);W.flags.stage='build';chk((A.n['fx:chain']||0)>0,'4-5: цепи не скрипят на качании');
'misc '+Object.keys(A.n).join(',')
//@@
// звук: своя тема на уровнях 4-1, 4-3, 4-4, 4-5; подписи к звукам (настройка включена)
const T=ZC.FIN.music.TR;chk(['4-1','4-3','4-4','4-5'].every(l=>T['lv_'+l]&&T['lv_'+l].v.length>2),'нет своих тем уровней мира 4');
ZC.FIN.set.caps=true;const n0=document.body.innerText.split('[').length;ZC.W.fx4('chain',ZC.HERO.potap.pos.clone());ZC.FIN.w4cap('рык Горыныча вдали');ZC.tick(2);
chk(/\[цепи скрипят/.test(document.body.innerText)&&/\[рык Горыныча вдали/.test(document.body.innerText),'нет подписей к звукам');ZC.FIN.set.caps=false;'sound ok'
//@@
const ok=!BAD.length&&!_errs.length;(ok?'tfin_w4art ok':'FAIL tfin_w4art '+BAD.join(' | ')+' errs='+_errs.join(' | '))
