//@@
// релиз final06: эпилог «Театр теней» в одиночку. Смена героя (Q) оставляет прежнего на месте — героев расставляют по одному;
// Змей дышит огнём на четыре удара одного игрока; Жар-птицу ловят своей тенью и тенью оставленного героя; хоровод — один прыжок
// на хлопок (стоящие на кругах прыгают сами). Долго не выходит — сценку засчитывает Тишка (проверка на «Жар-птице»).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.O=ZC.FIN.occ;O.fdt=0.05;window.gsync=()=>{const gl=O.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.E=ZC.FIN.epiTh;window.H=ZC.HERO;window.pk={};window.R=()=>E.dbg.rd();window.A=()=>ZC.players[ZC.G.soloPi].heroes[ZC.players[ZC.G.soloPi].act];
window.put=(k,u,y)=>{const p=E.dbg.ideal(k,u,y),h=H[k];h.pos.set(p.x,0,p.z);h.vel.set(0,0,0);return p;};
window.till=(f,n)=>{let i=0;while(!f()&&i<(n||600)){ZC.tick(1);i++;}return i;};
window.snap=()=>{O.frame();gsync();};
ZC.setSolo(true);ZC.startFrom(ZC.LV('epi'));ZC.G.manual=true;ZC.G.flags.ending=['slushat'];ZC.tick(30);ZC.skip();ZC.tick(10);ZC.skip();ZC.tick(100);
['solo='+ZC.G.solo,'st='+E.st,'active='+A().kind]
//@@
// «Великаны»: одному герою — обе звезды по очереди
const st=R().stars;put('proshka',st[0].u,st[0].y+0.25);ZC.tick(15);put('proshka',st[1].u,st[1].y+0.25);ZC.tick(15);pk.giant=st.filter(s=>s.lit).length;till(()=>E.st==='zmei',400);ZC.tick(30);
['lit='+pk.giant,'st='+E.st]
//@@ shot=fin_episolo_zmei.png wait=300
// «Змей»: ставим героя в круг, Q — следующий, прежний стоит на месте
const sl=R().slots;const k0=A().kind;put(k0,sl[0].u,sl[0].y);ZC.tick(10);const p0=H[k0].pos.clone();ZC.press('KeyQ');ZC.tick(30);const k1=A().kind;pk.swapped=k1!==k0;pk.stay=H[k0].pos.distanceTo(p0)<0.05;
put(k1,sl[1].u,sl[1].y);ZC.tick(5);ZC.press('KeyQ');ZC.tick(20);const k2=A().kind;put(k2,sl[2].u,sl[2].y);till(()=>R().formed,120);pk.formed=R().formed;
for(let i=0;i<4;i++){ZC.press('KeyF');ZC.tick(i===2?6:14);if(i===2)snap();}pk.fire=R().fire[0];pk.fly=R().fly;
['heroes='+[k0,k1,k2].join('>'),'stay='+pk.stay,'formed='+pk.formed,'fire='+pk.fire,'fly='+pk.fly]
//@@
// «Жар-птица»: долго не ловим — Тишка засчитывает
till(()=>E.st==='bird',600);ZC.tick(60);E.dbg.force();till(()=>E.st==='horo',900);pk.forced=E.stats.forced.join(',');['st='+E.st,'forced='+pk.forced]
//@@ shot=fin_episolo_horo.png wait=300
// «Хоровод»: четверо в кругах, один прыжок на хлопок — стоящие на кругах прыгают сами
ZC.tick(70);const sl=R().slots;const ks=['proshka','potap','pelageya','yosha'];ks.forEach((k,i)=>put(k,sl[i].u,sl[i].y));till(()=>R().ph==='beat',120);
const R4=R();const ev=()=>R4.n+R4.miss;let jumped=0;
for(let b=0;b<3;b++){const e0=ev();till(()=>ZC.G.time>=R4.next-0.05,200);ZC.press('Space');till(()=>ev()>e0,90);if(b===0){ZC.tick(4);jumped=ks.filter(k=>!H[k].grounded).length;snap();}}
pk.beats=R4.n;pk.jumped=jumped;['beats='+R4.n,'miss='+R4.miss,'airborne after beat='+jumped]
//@@
till(()=>ZC.W.flags.stage==='e2c',900);pk.e2=ZC.W.flags.stage;
const ok=pk.giant===2&&pk.swapped&&pk.stay&&pk.formed&&pk.fire===4&&pk.fly>=0&&pk.forced==='bird'&&pk.beats===3&&pk.jumped>=3&&pk.e2==='e2c'&&E.stats.rounds.length===4;
[JSON.stringify(pk),'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),ok&&!_errs.length?'episolo ok':'FAIL episolo']
