//@@
// 4-5 (docs/39, 45.1–45.4): вступление ≈ 14 с; колокольчиков 4; мост держат до переправы, но не меньше 25 с (было 40);
// перешедшая Йоша гасит капли живой водой; в беге Потапа живая вода кладёт корку на лаву.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
ZC.startFrom(ZC.LV('4-5'));ZC.G.manual=true;ZC.tick(40);const d=ZC.G.cine?ZC.G.cine.dur:0;chk(d>12&&d<15,'вступление '+d);U.nocine();
chk(ZC.W.bells.length===4,'колокольчиков '+ZC.W.bells.length);'intro='+d+' bells='+ZC.W.bells.length
//@@
const W=ZC.W,F=W.flags,H=ZC.HERO,HD=W.HD;F.stage='hold';H.pelageya.pos.set(-0.3,0,-53.4);H.yosha.pos.set(0.4,0,-53.4);ZC.tick(5);
// капля: ждём её и гасим водой Йоши
let t=0,dd=null;while(!dd&&t<60*8){ZC.tick(1);t++;dd=HD.drops.find(x=>!x.cool);}
const wt=dd&&W.waterTargets.find(w=>w.pos===dd.mk.position);chk(wt&&wt.active(),'капля: нет цели для воды');if(wt&&wt.active())wt.onWater();ZC.tick(2);chk(dd&&dd.cool,'капля не погасла');
t=0;while(F.stage==='hold'&&t<60*40){H.pelageya.pos.set(-0.3,0,-53.4);H.yosha.pos.set(0.4,0,-53.4);ZC.tick(1);t++;}
chk(F.stage==='run','после переправы не побежали: '+F.stage);chk(HD.t>=24.9&&HD.t<26,'держали '+HD.t.toFixed(1)+' с');
// бег: корка на открытой лаве перед Йошей
const Y=H.yosha;Y.pos.set(3.2,0,-53.4);Y.face=0;const o=W.noLavaWater(3.2,-51.6);'hold='+HD.t.toFixed(1)+' stage='+F.stage+' noLavaWater(run,сбоку)='+o
//@@
(BAD.length||_errs.length)?'FAIL tfin_w45 '+BAD.join(' || ')+' errs='+_errs.join(' | '):'tfin_w45 ok'
