//@@ shot=fin_dash_proshka.png wait=200
// релиз: уворот (LT / Shift) — рывок со своей позой и следом у каждого героя (late_91e_dash); путь тот же, что у старого кувырка (~3,3 м с докатом),
// герой разворачивается по направлению рывка, после рывка поза и масштаб тела возвращаются. Кадр — в середине рывка вбок (герой в профиль).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.O=ZC.FIN.occ;O.fdt=0.05;window.gsync=()=>{const gl=O.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.cur=()=>{const P=ZC.players;return P[ZC.G.soloPi].heroes[P[ZC.G.soloPi].act];};
window.res=[];
// рывок вправо от камеры: кадр на ~40 % рывка, затем — до конца и проверки
window.dash=()=>{const h=cur();ZC.W.abil.roll=true;h.rollCd=0;h.face=Math.PI;ZC.hold('KeyD',true);ZC.tick(2);const x0=h.pos.clone();ZC.press('ShiftLeft');ZC.tick(1);ZC.hold('KeyD',false);
  const ok0=h.rollT>0,fd=Math.abs(Math.atan2(Math.sin(h.face-Math.atan2(h.rollDir.x,h.rollDir.z)),Math.cos(h.face-Math.atan2(h.rollDir.x,h.rollDir.z))));
  ZC.tick(5);const tr=ZC.FIN.dash.trails.filter(t=>t.h===h&&t.m.visible).length,flip=Math.abs(h.body.rotation.x)>2;O.frame();gsync();
  window._dh={h,x0,ok0,fd,tr,flip};return h.kind+' rolling='+ok0+' trails='+tr;};
window.after=()=>{const d=window._dh,h=d.h;ZC.tick(40);const dist=Math.hypot(h.pos.x-d.x0.x,h.pos.z-d.x0.z),sc=h.body.scale,rx=Math.abs(h.body.rotation.x);
  const good=d.ok0&&d.fd<0.05&&d.tr>0&&!d.flip&&dist>2.9&&dist<3.7&&Math.abs(sc.x-1)<0.02&&Math.abs(sc.z-1)<0.02&&rx<0.35;
  window.res.push(h.kind+(good?'':'!')+' d='+dist.toFixed(2));ZC.press('KeyQ');ZC.tick(12);return good;};
ZC.setSolo(true);ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(60);
dash()
//@@ shot=fin_dash_potap.png wait=200
after();dash()
//@@ shot=fin_dash_pelageya.png wait=200
after();dash()
//@@ shot=fin_dash_yosha.png wait=200
after();dash()
//@@
after();const bad=window.res.filter(s=>s.includes('!'));(bad.length||window._errs.length?'FAIL dash ':'dash ok ')+window.res.join(' ')+' errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')
