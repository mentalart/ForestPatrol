//@@ wait=1500
// релиз final06: 3-2 — ролики Громового Барана (late_99y_sky32_cine.js): вступление и «Тучей обернулся» играются без пропуска;
// каждые 0,5 с по позе камеры режиссёра проверяется, что ни один герой в 18 м от камеры не стоит к ней спиной (больше 100°),
// баннер не висит поверх ролика, в полоске босса — целый номер этапа (раньше «1.5 / 3»).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
ZC.FIN.tut32.auto=false;ZC.FIN.warp('boss');ZC.tick(10);for(const h of Object.values(ZC.HERO))h.following=false;U.goto(0,0,-307,5);
window.WATCH=()=>{const bad=[];let n=0,prev=new Set();const an=a=>{while(a>Math.PI)a-=Math.PI*2;while(a<-Math.PI)a+=Math.PI*2;return a;};
  for(let i=0;i<60*25&&ZC.G.cine;i++){ZC.tick(1);if(!ZC.G.cine)break;if(i%30!==29)continue;n++;const cd=typeof CINE!=="undefined"&&CINE.CD?CINE.CD():null;const cp=cd&&cd.S===ZC.G.cine&&cd.pose&&cd.pose.pos||ZC.G.cine.camPos;if(!cp)continue;window.CDN=(window.CDN||0)+(cd&&cd.S===ZC.G.cine?1:0);
    const cur=new Set();for(const h of Object.values(ZC.HERO)){const d=Math.hypot(h.pos.x-cp.x,h.pos.z-cp.z);if(d>18||!h.g.visible)continue;const to=Math.atan2(cp.x-h.pos.x,cp.z-h.pos.z),a=Math.abs(an(h.face-to));
      if(a>1.75&&ZC.G.cine.t>0.6){cur.add(h.kind);if(prev.has(h.kind))bad.push(h.kind+'@'+ZC.G.cine.t.toFixed(1)+':'+(a*57).toFixed(0)+'°');}}prev=cur;   // спиной два замера подряд (на склейке разворот занимает кадр)
    const bn=document.getElementById('banner');if(bn&&bn.style.opacity!==''&&+bn.style.opacity>0.05&&ZC.G.cine&&ZC.G.cine.t>0.8)bad.push('banner@'+ZC.G.cine.t.toFixed(1));
    const bb=document.getElementById('bossbar');if(bb&&/\d\.\d \/ 3/.test(bb.textContent))bad.push('bossbar '+bb.textContent.trim().slice(0,30));}
  return {n,bad};};
if(!ZC.G.cine)throw new Error('нет вступления Барана: '+U.st());const r=WATCH();if(r.bad.length)throw new Error('вступление: '+r.bad.slice(0,6).join(' | '));
'intro ok checks='+r.n+' cd='+window.CDN
//@@
const W=ZC.W,B=W.ram32;B.e.onFinisher(ZC.HERO.proshka);ZC.tick(2);if(!ZC.G.cine)throw new Error('нет ролика этапа 2');const r=WATCH();if(r.bad.length)throw new Error('этап 2: '+r.bad.slice(0,6).join(' | '));
ZC.tick(5);if(B.phase!==2)throw new Error('не этап 2: '+B.phase);
B.e.onFinisher(ZC.HERO.proshka);ZC.tick(2);if(!ZC.G.cine)throw new Error('нет ролика этапа 3');const r3=WATCH();if(r3.bad.length)throw new Error('этап 3: '+r3.bad.slice(0,6).join(' | '));
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'phase cines ok checks='+r.n+'+'+r3.n+' turns='+ZC.FIN.cine32.turns
