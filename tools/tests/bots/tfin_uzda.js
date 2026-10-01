//@@
// релиз final06: 4-Б «Змей Горыныч», фаза 3 — узда. Огненная узда видна издалека (и упавшая в поле), место на шее — золотой ореол
// со столбом света и кругом на полу, к нему от узды бежит дорожка; у шеи «раз-два-три» — три нажатия умения (вдвоём — оба на каждый счёт),
// узда поднимается к ореолу и надевается. После оглушения всех трёх голов — 50 секунд (было 25).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.O=ZC.FIN.occ;O.fdt=0.05;window.gsync=()=>{const gl=O.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.heads=()=>ZC.W.enemies.filter(e=>e.kind==='golova').sort((a,b)=>a.idx-b.idx);window.act=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.L4=()=>ZC.W.gor4L;window.UZ=ZC.FIN.uzda||null;window.skipC=()=>{for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(3);}};
window.put=(h,x,z)=>{h.pos.set(x,Math.max(0,h.pos.y),z);h.vel&&h.vel.set(0,0,0);};
window.pk={};
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.G.flags.tut4b={1:true,2:true,3:true};ZC.tick(60);skipC();ZC.tick(30);skipC();
// фаза 2 → все три головы в Пробое — настоящий переход в фазу 3
const F=ZC.W.flags;F.phase=2;heads().forEach(e=>{e.state='broken';e.t=0;e.bdur=99;e._b=true;});ZC.tick(3);skipC();ZC.tick(5);pk.stun=F.stun;
['phase='+F.phase,'stun='+(F.stun||0).toFixed(1),'cine='+!!ZC.G.cine,'errs='+window._errs.length]
//@@ shot=fin_uzda_start.png wait=300
// начало фазы 3: узда на подставке, ореол на шее
for(const pi of[0,1])put(act(pi),pi?2:-2,2);ZC.tick(20);O.frame();gsync();const B=L4().BR;'bridle='+B.pos.toArray().map(v=>v.toFixed(1)).join(',')
//@@ shot=fin_uzda_drop.png wait=300
// узда упала в поле — видна издалека
const B=L4().BR;B.pos.set(5.5,0.5,-3);for(const pi of[0,1])put(act(pi),pi?-3:-5,4);ZC.tick(40);O.frame();gsync();'dropped y='+B.pos.y.toFixed(2)
//@@ shot=fin_uzda_carry.png wait=300
// берут вдвоём (клещи), несут к шее
const B=L4().BR;put(act(0),B.pos.x-1.2,B.pos.z);put(act(1),B.pos.x+1.2,B.pos.z);ZC.tick(2);ZC.press('KeyR');ZC.tick(2);ZC.press('Semicolon');ZC.tick(10);
pk.held=B.holders.filter(Boolean).length;for(let i=0;i<40;i++){const k=i/40;put(act(0),5.5-1.2+(-1.2-4.3)*k*0.5,-3+(-9.5+3)*k*0.5);put(act(1),5.5+1.2+(1.2-6.7)*k*0.5,-3+(-9.5+3)*k*0.5);ZC.tick(1);}
ZC.tick(10);O.frame();gsync();pk.path=UZ?UZ.pathN():0;const P0=UZ&&UZ.vis.path;'held='+pk.held+' bridle='+B.pos.toArray().map(v=>v.toFixed(1)).join(',')+' path='+pk.path+(P0?' p0='+P0.position.toArray().map(v=>v.toFixed(2)).join(','):'')
//@@ shot=fin_uzda_spot.png wait=300
// у шеи
const B=L4().BR;for(let i=0;i<40;i++){put(act(0),-1.2,-10.6);put(act(1),1.2,-10.6);ZC.tick(1);}ZC.tick(10);O.frame();gsync();'near d='+B.pos.distanceTo(L4().neckSpot).toFixed(2)+' held='+B.holders.filter(Boolean).length
//@@ shot=fin_uzda_beat1.png wait=300
// «раз»: оба нажали умение
ZC.press('KeyE');ZC.tick(4);ZC.press('KeyL');ZC.tick(8);O.frame();gsync();pk.b1=UZ?UZ.beat:null;'beat='+pk.b1+' won='+!!ZC.W.flags.won
//@@ shot=fin_uzda_beat2.png wait=300
ZC.press('KeyL');ZC.tick(10);ZC.press('KeyE');ZC.tick(8);O.frame();gsync();pk.b2=UZ?UZ.beat:null;'beat='+pk.b2+' won='+!!ZC.W.flags.won
//@@ shot=fin_uzda_beat3.png wait=300
ZC.press('KeyE');ZC.press('KeyL');ZC.tick(14);O.frame();gsync();pk.won=!!ZC.W.flags.won;'won='+pk.won+' phase='+ZC.W.flags.phase
//@@
ZC.tick(60);const ok=pk.stun>=49&&pk.held===2&&pk.path>2&&pk.b1===1&&pk.b2===2&&pk.won;
['stun='+pk.stun.toFixed(1),'held='+pk.held,'path='+pk.path,'beats='+pk.b1+','+pk.b2,'won='+pk.won,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:''),ok&&!window._errs.length?'uzda ok':'FAIL uzda']
