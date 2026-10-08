//@@
// единая полоса босса: «<b>Имя</b> · этап N / M …» на всех боссах 1-Б…5-Б2, имя босса выводится при появлении
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.RE=/^\s*<b[^>]*>([^<]+)<\/b>\s*·\s*(?:фаза |стадия |этап )?(\d+)\s*(?:\/|из)\s*(\d+)/;
window.CHK=(id,go)=>{document.querySelectorAll('div').forEach(d=>{if(d.textContent.indexOf('❦')>=0&&d.style.position==='fixed')d.style.opacity='0';});
  {const b0=document.getElementById('bossbar');b0.style.display='none';b0.innerHTML='';}
  if(go)go();else ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);let k=0;while(ZC.G.cine&&k<80){ZC.skip();ZC.tick(5);k++;}
  let bb=document.getElementById('bossbar'),m=null;for(let i=0;i<40&&!(m=bb.style.display==='block'&&RE.exec(bb.innerHTML));i++){if(ZC.G.cine)ZC.skip();ZC.tick(30);}
  for(let k2=0;k2<80&&ZC.G.cine;k2++){ZC.skip();ZC.tick(5);}ZC.tick(60);const nm=[...document.querySelectorAll('div')].some(d=>d.style.position==='fixed'&&d.textContent.indexOf('❦')>=0&&d.style.opacity==='1');
  const r=id+' bar='+(m?m[1]+' '+m[2]+'/'+m[3]:'НЕТ')+' name='+nm+' fs='+getComputedStyle(bb).fontSize+' errs='+_errs.length;
  if(!m||!nm||_errs.length)throw new Error(r);return r;};
'ok'
//@@
CHK('1-B')
//@@
CHK('2-B',()=>{ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);U.cine(200);ZC.tick(5);ZC.W.warp2b('boss');U.cine(300);ZC.tick(30);})
//@@
CHK('3-B',()=>{ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);ZC.W.warp3b('boss1');ZC.tick(5);U.nocine();ZC.tick(30);})
//@@
CHK('4-B')
//@@
CHK('5-B1')
//@@
CHK('5-B2',()=>ZC.FIN.k5e.goStage(2))
