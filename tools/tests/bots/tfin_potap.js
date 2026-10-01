//@@
// релиз final06: удары Потапа по видео-референсу — огненные кулаки (разгораются рядом с врагом), мах лапой из-за головы с выпадом,
// лапы чередуются, огненный серп перед Потапом, при попадании — дым и огоньки. Кадры — как видит игровая камера (сзади-сверху) и спереди.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.O=ZC.FIN.occ;O.fdt=0.05;window.gsync=()=>{const gl=O.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.cur=()=>{const P=ZC.players;return P[ZC.G.soloPi].heroes[P[ZC.G.soloPi].act];};window.PF=ZC.FIN.potap;
ZC.setSolo(true);ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(60);
for(let k=0;k<4&&cur().kind!=='potap';k++){ZC.press('KeyQ');ZC.tick(12);}const h=cur();h.face=Math.PI;ZC.tick(90);
const calm=PF.fistK(h);window.pk={calm};['hero='+h.kind,'calm fists='+JSON.stringify(calm),'errs='+window._errs.length]
//@@ shot=fin_potap_ready.png wait=200
// враг рядом — кулаки разгораются
const h=cur();window.foe=ZC.FIN.dbgFoe('kiki',h.pos.x,h.pos.z-2.2,{y:h.pos.y});foe.state='idle';ZC.tick(60);O.frame();gsync();pk.fight=PF.fistK(h);'fight fists='+JSON.stringify(pk.fight)
//@@ shot=fin_potap_windup.png wait=200
// первый удар: замах (лапа за головой)
const h=cur();foe.state='idle';foe.open=9;ZC.press('KeyF');ZC.tick(5);O.frame();gsync();pk.s1=PF.side(h);'side='+pk.s1+' atkT='+h.atkT.toFixed(2)+' live='+PF.live.length
//@@ shot=fin_potap_strike.png wait=200
const h=cur();ZC.tick(4);O.frame();gsync();'strike live='+PF.live.length
//@@ shot=fin_potap_follow.png wait=200
const h=cur();ZC.tick(4);O.frame();gsync();'follow smoke='+PF.smoke.length+' foe='+foe.alive
//@@ shot=fin_potap_strike2.png wait=200
// второй удар — другой лапой
const h=cur();ZC.tick(20);foe.open=9;ZC.press('KeyF');ZC.tick(9);O.frame();gsync();pk.s2=PF.side(h);'side2='+pk.s2+' live='+PF.live.length
//@@ shot=fin_potap_front.png wait=200
// спереди: Потап лицом к камере, удар
const h=cur();ZC.tick(30);h.face=0.25;ZC.tick(4);ZC.press('KeyF');ZC.tick(9);O.frame();gsync();'front side='+PF.side(h)
//@@
const h=cur();ZC.tick(60);const ok=pk.calm&&pk.calm.every(v=>v<0.05)&&pk.fight&&pk.fight.every(v=>v>0.5)&&pk.s1!==0&&pk.s2===-pk.s1;
['calm='+JSON.stringify(pk.calm),'fight='+JSON.stringify(pk.fight),'sides='+pk.s1+','+pk.s2,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:''),ok&&!window._errs.length?'potap ok':'FAIL potap']
