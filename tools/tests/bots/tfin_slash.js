//@@ shot=fin_slash_proshka.png wait=200
// релиз final05: удар героев — лента-полумесяц с почерком героя, звёздочки, «бах» при попадании; старый плоский сектор выключен; виден в свете пера
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
const O=ZC.FIN.occ;O.fdt=0.05;window.gsync=()=>{const gl=O.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.hit=(n)=>{ZC.press(ZC.G.solo?'KeyF':'KeyF');ZC.tick(n||5);O.frame();gsync();};
ZC.setSolo(true);ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(60);
const P=ZC.players,h=P[ZC.G.soloPi].heroes[P[ZC.G.soloPi].act];h.face=Math.PI*0.8;hit(5);
['hero='+h.kind,'live='+ZC.FIN.slash.live.length,'oldArc='+h.arc.visible,'errs='+window._errs.length]
//@@ shot=fin_slash_potap.png wait=200
O=ZC.FIN.occ;ZC.tick(40);ZC.press('KeyQ');ZC.tick(10);const P=ZC.players,h=P[ZC.G.soloPi].heroes[P[ZC.G.soloPi].act];h.face=Math.PI*0.8;hit(6);'hero='+h.kind+' live='+ZC.FIN.slash.live.length
//@@ shot=fin_slash_pelageya.png wait=200
ZC.tick(40);ZC.press('KeyQ');ZC.tick(10);const P=ZC.players,h=P[ZC.G.soloPi].heroes[P[ZC.G.soloPi].act];h.face=Math.PI*0.8;hit(6);'hero='+h.kind+' live='+ZC.FIN.slash.live.length
//@@ shot=fin_slash_yosha.png wait=200
ZC.tick(40);ZC.press('KeyQ');ZC.tick(10);const P=ZC.players,h=P[ZC.G.soloPi].heroes[P[ZC.G.soloPi].act];h.face=Math.PI*0.8;hit(6);'hero='+h.kind+' live='+ZC.FIN.slash.live.length
//@@ shot=fin_slash_hit.png wait=200
// попадание: враг перед героем — «бах»
ZC.tick(40);const P=ZC.players,h=P[ZC.G.soloPi].heroes[P[ZC.G.soloPi].act];h.face=Math.PI;const e=ZC.FIN.dbgFoe('kiki',h.pos.x,h.pos.z-1.3,{y:h.pos.y});e.state='idle';e.g.position.y=h.pos.y;ZC.tick(4);
ZC.press('KeyF');ZC.tick(3);ZC.FIN.occ.frame();gsync();['stars='+ZC.FIN.slash.stars.length,'foe alive='+e.alive]
//@@ shot=fin_slash_light.png wait=200
// свет пера жар-птицы (мир 3): удар виден
ZC.setSolo(false);ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(60);
const P=ZC.players,h=P[0].heroes[P[0].act];h.lit=true;ZC.tick(30);h.face=Math.PI*0.8;hit(6);['hero='+h.kind,'lit='+h.lit,'live='+ZC.FIN.slash.live.length,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')]
