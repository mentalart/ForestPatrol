//@@
// F-2c: табличка 3-Б, подсказка и урок 4-Б — карточки общего слоя: нет своего z-index-окна, шрифт ≥ 3 % высоты окна, «Размер текста» меняет размер, не ПРОПИСНЫЕ, читаются вслух
{const st=document.createElement('style');st.textContent='#finTut,#finBossHint{transition:none!important}';document.head.appendChild(st);}
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));
window.SAID=[];const F=ZC.FIN;F.readAloud.mock=t=>SAID.push(t);F.set.readAloud=true;F.set.vox=0;F.set.readAloudAll=true;
window.chk=(el,name)=>{const cs=getComputedStyle(el),fs=parseFloat(cs.fontSize),z=cs.zIndex;
  if(z!=='6'&&z!=='auto')throw new Error(name+': z-index '+z);
  if(fs<innerHeight*0.03-0.5)throw new Error(name+': шрифт '+fs+' < 3 % ('+(innerHeight*0.03).toFixed(1)+')');return fs;};
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(3);
let c=document.getElementById('finTut'),n=0;while(!(c.classList.contains('on'))&&n<600){ZC.tick(1);n++;}
const r=['tut on='+c.classList.contains('on')];
const t=c.querySelector('.ft-text');const f1=chk(t,'finTut .ft-text');
if(/[А-ЯЁ]{4,}/.test(c.querySelector('.ft-tag').textContent)||getComputedStyle(c.querySelector('.ft-tag')).textTransform==='uppercase')throw new Error('тег прописными');
document.documentElement.style.setProperty('--fts','1.4');const f2=parseFloat(getComputedStyle(t).fontSize);if(!(f2>f1*1.3))throw new Error('«Размер текста» не меняет: '+f1+' → '+f2);
document.documentElement.style.setProperty('--fts','1');
ZC.press('KeyH');ZC.sim(0.3);
r.push('fs='+f1.toFixed(1)+'→'+f2.toFixed(1),'said='+JSON.stringify(SAID.slice(0,3)),'errs='+_errs.length);
if(!SAID.length)throw new Error('урок 4-Б не прочитан вслух');
r
//@@
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.G.flags.tut4b={1:true,2:true,3:true};ZC.tick(60);ZC.skip();ZC.tick(3);let g=0;while(ZC.G.cine&&g<60*30){ZC.tick(1);g++;}
const r=[];let n=0;const hint=document.getElementById('finBossHint');
while(!hint.classList.contains('on')&&n<60*20){ZC.tick(1);n++;}
const f=chk(hint.querySelector('.fh-text'),'finBossHint .fh-text');
SAID.length=0;ZC.press('KeyH');ZC.sim(0.3);
r.push('hint on='+hint.classList.contains('on'),'fs='+f.toFixed(1),'said='+JSON.stringify(SAID.slice(0,2)));
if(hint.classList.contains('on')&&!SAID.length)throw new Error('подсказка Горыныча не прочитана вслух');
r
//@@
// табличка Соловья: тот же слой, не прописными
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);const D=ZC.W.warp3b('boss1');ZC.tick(5);U.nocine();ZC.tick(30);
const sg=document.getElementById('solsign');const r=[];let seen='';
for(let i=0;i<60*40&&!seen;i++){Object.values(ZC.HERO).forEach(h=>{h.iT=Math.max(h.iT,0.5);});ZC.tick(1);if(sg.style.display==='block')seen=sg.textContent;}
if(!seen)throw new Error('табличка не показана');
const f=chk(sg,'solsign');if(/[А-ЯЁ]{4,}/.test(seen))throw new Error('табличка прописными: '+seen);
SAID.length=0;ZC.press('KeyH');ZC.sim(0.3);if(!SAID.length)throw new Error('табличка не прочитана вслух');
r.push('sign='+seen,'fs='+f.toFixed(1),'said='+JSON.stringify(SAID.slice(0,2)));r
