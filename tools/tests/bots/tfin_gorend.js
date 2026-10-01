//@@
// релиз final06: 4-Б «Змей Горыныч» — ролик после победы (late_38): Горыныч стал другом. Кадры по ходу ролика (вспышка узды, головы встают,
// переглядываются и кивают вместе, фырк кольцами дыма — одно на голове у Прошки, сонная к Потапу, голодная к Прошке, салют, общий кадр);
// проверка: прозвучали все семь записей ролика (4-B_017, 018, 026–030), шесть ракет, три кольца, «нимб» у Прошки, выход на Лукоморье без ошибок.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.O=ZC.FIN.occ;O.fdt=0.05;window.gsync=()=>{const gl=O.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.heads=()=>ZC.W.enemies.filter(e=>e.kind==='golova').sort((a,b)=>a.idx-b.idx);window.skipC=()=>{for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(3);}};
window._vox=[];window.subRec=()=>{const v=ZC.FIN.vox&&ZC.FIN.vox.cur;if(v&&v!==window._vox[window._vox.length-1])window._vox.push(v);};   // какие записи прозвучали (субтитр в DOM обновляется только между шагами)
window.until=t=>{let n=0;while(ZC.G.cine&&ZC.G.cine.t<t&&n<60*30){ZC.tick(1);subRec();n++;}O.frame();gsync();return ZC.G.cine?ZC.G.cine.t.toFixed(1):'end';};
window.sub=()=>{const s=document.querySelector('#subs,.subs,#sub');return s?s.innerText.replace(/\s+/g,' ').slice(0,80):'';};
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.G.flags.tut4b={1:true,2:true,3:true};ZC.tick(60);skipC();ZC.tick(30);skipC();
const F=ZC.W.flags;F.phase=2;heads().forEach(e=>{e.state='broken';e.t=0;e.bdur=99;e._b=true;});ZC.tick(3);skipC();ZC.tick(5);
const L=ZC.W.gor4L;L.BR.on=true;L.win();let n=0;while(!ZC.G.cine&&n<200){ZC.tick(1);n++;}window.D=ZC.G.cine?ZC.G.cine.dur||(ZC.G.cine.S&&ZC.G.cine.S.dur):0;
const hs=heads();['phase='+F.phase,'won='+F.won,'cine='+!!ZC.G.cine,'dur='+D,'alias='+(hs[1].pos===hs[1].g.position),'gy='+hs.map(e=>e.g.position.y.toFixed(2)).join('/'),'st='+hs.map(e=>e.state).join('/'),'heroes='+Object.values(ZC.HERO).map(h=>h.kind+(h.g.visible?'+':'-')+h.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' '),'errs='+window._errs.length]
//@@ shot=fin_gorend_00.png wait=250
const r=until(0.8);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_01.png wait=250
const r=until(2.6);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_02.png wait=250
const r=until(5.0);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_03.png wait=250
const r=until(7.0);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_04.png wait=250
const r=until(9.2);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_05.png wait=250
const r=until(10.8);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_06.png wait=250
const r=until(12.6);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_07.png wait=250
const r=until(14.2);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_08.png wait=250
const r=until(16.6);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_09.png wait=250
const r=until(20.4);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_10.png wait=250
const r=until(24.45);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_11.png wait=250
const r=until(26.0);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_12.png wait=250
const r=until(29.2);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@ shot=fin_gorend_13.png wait=250
const r=until(31.8);[r,sub(),'hs='+heads().map(e=>e.pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')]
//@@
let n=0;while(ZC.G.cine&&n<60*40){ZC.tick(1);subRec();n++;}const r=['after cine sec='+(n/60).toFixed(1),'vox='+window._vox.join(',')];n=0;while(ZC.W.levelId==='4-B'&&n<60*20){ZC.tick(1);n++;}
const GF=ZC.FIN.gorFriend,st=GF?GF.stats:{};const need=['4-B_017','4-B_018','4-B_026','4-B_027','4-B_028','4-B_029','4-B_030'],miss=need.filter(w=>!window._vox.includes(w));r.push('missing='+miss.join(','));
const ok=GF&&st.plays===1&&st.rockets===6&&st.rings===3&&st.hat&&!miss.length&&ZC.W.levelId!=='4-B'&&!window._errs.length;
r.push('dur='+D,'stats='+JSON.stringify(st),'level='+ZC.W.levelId,'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:''),ok?'gorend ok':'FAIL gorend');r
