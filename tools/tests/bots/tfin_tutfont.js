//@@ wait=400
// релиз final06, F-2f: карточка урока #finTut — шрифт каждого текстового узла ≥ 3 % высоты окна и без пересечений с #bossbar, #vest, #banner, #finBossHint.
// Раскладку подсказок (FIN.hints.layout) зовём явно: «весточку» и баннер включаем руками после последнего кадра. Урок открывается на 1-Б и 3-Б в окнах 1280×720 и 1920×1080 (шаг vp=...) общим слоем FIN.lesson, «весточка» и баннер включаются принудительно.
{const st=document.createElement('style');st.textContent='#finTut,#finBossHint{transition:none!important}';document.head.appendChild(st);}
window.L=ZC.FIN.lesson;window.BAD=[];window.OUT=[];
window.R=id=>{const e=document.getElementById(id);if(!e)return null;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<0.05)return null;const r=e.getBoundingClientRect();return r.width&&r.height?r:null;};
window.hit=(a,b)=>!!a&&!!b&&a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom;
window.mkL=()=>[{dur:30,p:[0,7.8,10],l:[0,2.4,-9.5],card:{tag:'Урок',title:'Щит',icon:'heads',text:'Нажми <b>щит</b>, когда синяя волна рядом',keys:[{pi:0,a:'guard',wait:true},{pi:1,a:'guard',wait:true}]},wait:{who:0,a:'guard'}}];
window.MEAS=(id,vp)=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(20);for(let k=0;k<8;k++){if(ZC.G.cine)ZC.skip();ZC.tick(5);}
  if(id==='3-B'){try{ZC.W.warp3b('boss');}catch(e){}ZC.tick(5);}
  L.run(mkL());ZC.tick(80);
  const vest=document.getElementById('vest');if(vest){vest.textContent='Весточка: держитесь вместе, ребята!';vest.style.display='block';vest.classList.add('on');}
  const bn=document.getElementById('banner');if(bn){bn.innerHTML='Баннер<small>событие</small>';bn.style.display='block';bn.style.opacity='1';bn.classList.add('on');}
  ZC.tick(3);try{ZC.FIN.hints.layout();}catch(e){OUT.push('layout err '+e.message);}
  const c=document.getElementById('finTut'),H=innerHeight;let min=1e9,who='';
  if(!c||!c.classList.contains('on')){BAD.push(vp+' '+id+': карточка урока не открылась');return;}
  const w=document.createTreeWalker(c,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(!n.textContent.trim())continue;const px=parseFloat(getComputedStyle(n.parentElement).fontSize);if(px<min){min=px;who=n.parentElement.className||n.parentElement.tagName;}}
  const pct=100*min/H;OUT.push(vp+' '+id+' шрифт '+min.toFixed(1)+'px='+pct.toFixed(2)+'% ('+who+')');
  if(pct<3-1e-3)BAD.push(vp+' '+id+': шрифт '+pct.toFixed(2)+' % < 3 % ('+who+')');
  const F=R('finTut');if(!F){BAD.push(vp+' '+id+': карточка не видна');return;}
  if(F.left<0||F.right>innerWidth||F.bottom>H)BAD.push(vp+' '+id+': карточка выходит за окно '+[F.left,F.right,F.bottom].map(Math.round));
  for(const o of['bossbar','vest','banner','finBossHint'])if(hit(F,R(o)))BAD.push(vp+' '+id+': #finTut пересекает #'+o);
  window.GEO=window.GEO||[];GEO.push(vp+' '+id+' top='+c.style.top+' cls='+c.className+' ui='+(typeof ZC.FIN.hints)+' '+['finTut','bossbar','vest','banner'].map(o=>{const r=R(o);return o+(r?'['+[r.left,r.top,r.right,r.bottom].map(Math.round)+']':'-');}).join(' '));ZC.skip();ZC.tick(5);};
MEAS('1-B','720');MEAS('3-B','720');(BAD.length&&(()=>{throw new Error('tfin_tutfont: '+BAD.join(' | ')+' GEO '+GEO.join(' ; '));})(),OUT.concat(GEO))
//@@ vp=1920x1080
innerHeight+'px'
//@@
BAD.length=0;MEAS('1-B','1080');MEAS('3-B','1080');(BAD.length&&(()=>{throw new Error('tfin_tutfont: '+BAD.join(' | ')+' GEO '+GEO.join(' ; '));})(),OUT.concat(['ok']))
