//@@ wait=1500
// релиз final06: единый API вспышек боссов (late_84b_bossfx, FIN.bossfx) — «Вспышки» 100 / 50 / 0 % действуют на #flash и на молнию 2-Б;
// потолки: ≤ 3 вспышек в секунду, полноэкранных ≤ 1 за 8 с; тряска ≤ 0,09 (разово ≤ 0,15), hit-stop ≤ 0,16.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.BF=ZC.FIN.bossfx;window.KF=ZC.FIN.k2fx;window.FL=document.getElementById('flash');
window.SETK=k=>{ZC.FIN.set.flashK=k;ZC.FIN.applySettings&&ZC.FIN.applySettings();};
window.RESET=()=>{BF._t.length=0;BF._full=-99;ZC.G.time+=20;FL.style.opacity=0;};
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
U.cine(200);ZC.tick(30);'api='+!!BF+' k2fx='+!!(KF&&KF.lightning)+' flash='+!!FL
//@@
// #flash: 1 → a, 0,5 → a/2 (итоговая яркость с учётом CSS «мягких вспышек»), 0 → ничего
{const out={};for(const k of[1,0.5,0]){SETK(k);RESET();const r=BF.flash(0.3,{hold:5});const css=getComputedStyle(FL);const shown=(+FL.style.opacity)*(document.body.classList.contains('fin-softflash')?0.5:1);out['k'+k]={ret:+r.toFixed(3),op:+FL.style.opacity,shown:+shown.toFixed(3),none:getComputedStyle(FL).display==='none'};}
window.R1=out;}
JSON.stringify(R1)
//@@
// молния 2-Б: световой импульс (интенсивность направленного света) при 1 / 0,5 / 0
{const out={};for(const k of[1,0.5,0]){SETK(k);RESET();KF.flashK=0;KF.lightning();let mx=0;for(let i=0;i<40;i++){ZC.tick(1);mx=Math.max(mx,KF.flashL?KF.flashL.intensity:0);}out['k'+k]=+mx.toFixed(3);}window.R2=out;}
JSON.stringify(R2)
//@@
// потолки: 10 вспышек подряд → ≤ 3 за секунду; полноэкранные — не чаще раза в 8 с; тряска, hit-stop
{SETK(1);RESET();let ok=0;for(let i=0;i<10;i++){if(BF.flash(0.3)>0)ok++;ZC.tick(2);}const perSec=ok;
 RESET();const f1=BF.flash(1),f2=(ZC.G.time+=1,BF.flash(1)),f3=(ZC.G.time+=8,BF.flash(1));
 const sh=BF.shake(0.5,0.2),sh2=BF.shake(0.5,0.2,{once:true});BF.hitstop(0.5);
 window.R3={perSec,full:[f1,f2,f3].map(x=>+x.toFixed(2)),sh,sh2,hs:ZC.G.hitstop};}
JSON.stringify(R3)
//@@
// итог
const bad=[];const near=(a,b)=>Math.abs(a-b)<0.01;
if(!near(R1.k1.shown,0.3))bad.push('k1 #flash '+R1.k1.shown);if(!near(R1['k0.5'].shown,0.15))bad.push('k0.5 #flash '+R1['k0.5'].shown);if(R1.k0.op!==0||R1.k0.ret!==0)bad.push('k0 #flash '+JSON.stringify(R1.k0));
if(!(R2.k1>1))bad.push('молния k1 '+R2.k1);if(!near(R2['k0.5'],R2.k1/2)&&!(R2['k0.5']<R2.k1*0.6))bad.push('молния k0.5 '+R2['k0.5']);if(R2.k0!==0)bad.push('молния k0 '+R2.k0);
if(R3.perSec>3)bad.push('вспышек в секунду '+R3.perSec);if(R3.full[0]!==1||R3.full[1]>=0.5||R3.full[2]!==1)bad.push('полноэкранные '+R3.full);
if(R3.sh>0.09||R3.sh2>0.15||R3.sh2<=0.09)bad.push('тряска '+R3.sh+'/'+R3.sh2);if(R3.hs>0.16)bad.push('hit-stop '+R3.hs);if(_errs.length)bad.push('errs '+_errs[0]);
if(bad.length)throw new Error('FAIL '+bad.join(' | '));
JSON.stringify({R1,R2,R3,errs:_errs.length})
