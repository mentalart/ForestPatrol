//@@ shot=fin_guard_proshka.png wait=200
// релиз final06: щит (B) у каждого героя свой — Прошка: шестерёнка, Потап: медовые соты, Пелагея: крылья, Йоша: иголки; блок — вспышка;
// удар Потапа («когти») хорошо виден со спины. Кадры — как видит игровая камера (сзади-сверху).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.O=ZC.FIN.occ;O.fdt=0.05;window.gsync=()=>{const gl=O.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.cur=()=>{const P=ZC.players;return P[ZC.G.soloPi].heroes[P[ZC.G.soloPi].act];};
window.guardShot=(n)=>{ZC.hold('KeyG',true);ZC.tick(n||14);O.frame();gsync();const h=cur();return h;};
window.nextHero=()=>{ZC.hold('KeyG',false);ZC.tick(20);ZC.press('KeyQ');ZC.tick(12);const h=cur();h.face=Math.PI;return h;};
ZC.setSolo(true);ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(60);
cur().face=Math.PI;const h=guardShot();const gd=ZC.FIN.guard;['hero='+h.kind,'guard='+h.guard,'fx='+(gd?gd.visible(h):'-'),'errs='+window._errs.length]
//@@ shot=fin_guard_potap.png wait=200
const h=nextHero();guardShot();const gd=ZC.FIN.guard;'hero='+h.kind+' guard='+h.guard+' fx='+(gd?gd.visible(h):'-')
//@@ shot=fin_guard_pelageya.png wait=200
const h=nextHero();guardShot();const gd=ZC.FIN.guard;'hero='+h.kind+' guard='+h.guard+' fx='+(gd?gd.visible(h):'-')
//@@ shot=fin_guard_yosha.png wait=200
const h=nextHero();guardShot();const gd=ZC.FIN.guard;'hero='+h.kind+' guard='+h.guard+' fx='+(gd?gd.visible(h):'-')
//@@ shot=fin_guard_block.png wait=200
// блок: капля врага в щит — вспышка и волна по щиту
const h=cur();ZC.hold('KeyG',true);ZC.tick(10);const gd=ZC.FIN.guard;if(gd)gd.hit(h,false);ZC.tick(3);O.frame();gsync();
['hero='+h.kind,'hitFx='+(gd?gd.hitT(h).toFixed(2):'-')]
//@@ shot=fin_guard_potap_slash_a.png wait=200
// удар Потапа со спины (камера сзади-сверху): когти видны
ZC.hold('KeyG',false);ZC.tick(20);for(let k=0;k<4&&cur().kind!=='potap';k++){ZC.press('KeyQ');ZC.tick(12);}const h=cur();h.face=Math.PI;ZC.tick(30);
ZC.press('KeyF');ZC.tick(4);O.frame();gsync();'hero='+h.kind+' live='+ZC.FIN.slash.live.length
//@@ shot=fin_guard_potap_slash_b.png wait=200
ZC.tick(30);ZC.press('KeyF');ZC.tick(6);O.frame();gsync();['live='+ZC.FIN.slash.live.length,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')].join(' ')
