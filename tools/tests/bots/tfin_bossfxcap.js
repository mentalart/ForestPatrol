//@@ wait=1500
// релиз final06: потолки тряски и hit-stop на боссовых уровнях (late_84b_bossfx): shake() ≤ 0,09 (толчок ≤ 0,5 с — ≤ 0,15), G.hitstop ≤ 0,16;
// «Тряска» 0 / 50 / 100 % продолжает действовать; вне боссов (1-1) потолков нет. Детерминированно через ZC.tick.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.BF=ZC.FIN.bossfx;window.GOT=[];BF.onshake=(pi,a,d)=>GOT.push([a,d]);
window.SETSH=k=>{ZC.FIN.set.shakeK=k;ZC.FIN.applySettings&&ZC.FIN.applySettings();};
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.tick(10);'on='+BF.on()
//@@
{const out={};ZC.G.hitstop=0.4;out.hs4=ZC.G.hitstop;ZC.G.hitstop=0;ZC.G.hitstop=0.12;out.hs12=ZC.G.hitstop;
 ZC.G.hitstop=0.25;ZC.tick(3);out.hsDec=ZC.G.hitstop;
 GOT.length=0;BF.raw(null,0.3,2);BF.raw(null,0.3,0.3);BF.raw(0,0.05,0.35);out.sh=GOT.slice();out.on=BF.on();window.R1=out;}
JSON.stringify(R1)
//@@
// настройки «Тряска»: 0 → тряски нет, 0,5 → не больше половины потолка
{const o={};for(const k of[1,0.5,0]){SETSH(k);ZC.tick(200);BF.raw(null,0.3,2);o['k'+k]=+BF.shAmp().toFixed(3);}SETSH(1);window.R2=o;}
JSON.stringify(R2)
//@@
// вне боссов потолков нет
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(10);{ZC.G.hitstop=0.4;window.R3={on:BF.on(),hs:ZC.G.hitstop};}
JSON.stringify(R3)
//@@
const bad=[];
if(!R1.on)bad.push('4-Б не боссовый');if(R1.hs4>0.16)bad.push('hit-stop '+R1.hs4);if(Math.abs(R1.hs12-0.12)>0.001)bad.push('короткий hit-stop срезан '+R1.hs12);if(!(R1.hsDec<0.25))bad.push('hit-stop не убывает '+R1.hsDec);
if(R1.sh.length!==3)bad.push('вызовов shake '+R1.sh.length);else{if(R1.sh[0][0]>0.0901)bad.push('длинная тряска '+R1.sh[0][0]);if(R1.sh[1][0]>0.1501||R1.sh[1][0]<0.09)bad.push('толчок '+R1.sh[1][0]);if(Math.abs(R1.sh[2][0]-0.05)>0.001)bad.push('малая тряска срезана '+R1.sh[2][0]);}
if(R2.k0>0.001)bad.push('Тряска 0: '+R2.k0);if(!(R2.k1>0.05)||R2['k0.5']>R2.k1*0.55)bad.push('Тряска 50 %: '+JSON.stringify(R2));
if(R3.on||R3.hs<0.39)bad.push('вне боссов потолок сработал '+JSON.stringify(R3));if(_errs.length)bad.push('errs '+_errs[0]);
if(bad.length)throw new Error('FAIL '+bad.join(' | '));
JSON.stringify({R1,R2,R3})
