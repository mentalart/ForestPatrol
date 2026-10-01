//@@
// релиз final06, 4-Б «Змей Горыныч»: кадры арены и рыка для просмотра арта (не в регрессе; запускать с URLQ='&hq=1'). Камера — W.camFn, интерфейс спрятан.
window.cam=(p,l)=>{ZC.W.camFn=()=>({pos:new THREE.Vector3(...p),look:new THREE.Vector3(...l),k:30});};window.uncam=()=>{ZC.W.camFn=null;};
window.heads=()=>ZC.W.enemies.filter(e=>e.kind==='golova').sort((a,b)=>a.idx-b.idx);window.ui=on=>{document.getElementById('ui').style.visibility=on?'':'hidden';};
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.G.flags.tut4b={1:true,2:true,3:true};ZC.FIN.boss4b.auto=false;ZC.tick(60);ZC.skip();ZC.tick(30);
const W=ZC.W;ui(false);[W.name,'phase='+W.flags.phase,JSON.stringify(ZC.FIN.gor4Debug())]
//@@ shot=gorart_1_play.png
ZC.tick(20);ZC.FIN.occ.frame();'play cam'
//@@ shot=gorart_2_wide.png
// ракурс как у референса: высоко за героями, на Горыныча
cam([0,13,12],[0,1.5,-11]);ZC.tick(30);ZC.FIN.occ.frame();'wide'
//@@ shot=gorart_3_side.png
cam([-15,7,4],[0,1,-10]);ZC.tick(30);ZC.FIN.occ.frame();'side'
//@@ shot=gorart_4_back.png
cam([10,9,-4],[-6,2,-30]);ZC.tick(30);ZC.FIN.occ.frame();'back: falls'
//@@ shot=gorart_5_roar.png
// рык: левая и правая — в Пробое; кадр на секунде 1.6 ролика
uncam();const hs=heads();for(const e of[hs[0],hs[2]]){e.state='broken';e.t=0;e.bdur=99;e._b=true;}ZC.tick(2);const r=['cine='+!!ZC.G.cine];let n=0;while(ZC.G.cine&&ZC.G.cine.t<1.6&&n<300){ZC.tick(1);n++;}ZC.FIN.occ.frame();r.push('t='+(ZC.G.cine?ZC.G.cine.t.toFixed(2):'-'));r
//@@ shot=gorart_6_cracks.png
let n=0;while(ZC.G.cine&&ZC.G.cine.t<3.4&&n<300){ZC.tick(1);n++;}ZC.FIN.occ.frame();'t='+(ZC.G.cine?ZC.G.cine.t.toFixed(2):'-')+' '+JSON.stringify(ZC.FIN.gor4Debug())
//@@ shot=gorart_7_geysers.png
let n=0;while(ZC.G.cine&&ZC.G.cine.t<5.2&&n<300){ZC.tick(1);n++;}ZC.FIN.occ.frame();'t='+(ZC.G.cine?ZC.G.cine.t.toFixed(2):'-')
//@@ shot=gorart_8_after.png
let n=0;while(ZC.G.cine&&n<1200){ZC.tick(1);n++;}ZC.tick(30);while(ZC.G.cine&&n<2400){ZC.skip();ZC.tick(2);n++;}ZC.tick(60);cam([0,13,12],[0,1.5,-11]);ZC.tick(20);ZC.FIN.occ.frame();'phase='+ZC.W.flags.phase+' '+JSON.stringify(ZC.FIN.gor4Debug())
//@@ shot=gorart_9_inhale.png
// большой вдох: струи к пастям, герои с щитом едут к средней
uncam();const W=ZC.W,F=W.flags,G4=ZC.FIN.gor4;heads().forEach(e=>{e.state='idle';e.t=0;e.cd=99;});G4.cyc=9;G4.big=1;F.inhale=0;F.inhT=0.001;ZC.hold('KeyG',true);let n=0;while(G4.pull<=0&&n<120){ZC.tick(1);n++;}ZC.tick(80);ZC.FIN.occ.frame();'pull='+G4.pull.toFixed(2)
//@@ shot=gorart_10_weak.png
ZC.hold('KeyG',false);let n=0;while(ZC.FIN.gor4.pull>0&&n<300){ZC.tick(1);n++;}ZC.tick(60);const hs=heads(),L=hs[0];const p1=ZC.players[1];if(p1.heroes[p1.act].kind!=='pelageya'){ZC.press('KeyK');ZC.tick(40);}const Pe=p1.heroes[p1.act];Pe.pos.set(L.pos.x+1.6,0,L.pos.z+5.5);Pe.face=Math.atan2(L.pos.x-Pe.pos.x,L.pos.z-Pe.pos.z);p1.owlCd=0;ZC.press('KeyL');ZC.tick(14);ZC.FIN.occ.frame();'weak='+ZC.FIN.gor4.weak.length
