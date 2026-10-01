//@@ wait=1500
// релиз final06: пролог, комната штаба и ролик «Колыбельная» (late_96b_prolog_night.js) — ночь за окном, пролёт Кощея, Звенышко
// влетает в окно и прячется в тетрадку, иней и Кощей заглядывает, книжка-раскладушка с историей цепи, обставленная комната.
// Проверки: еловые лапы снаружи стен штаба; комната обставлена; окно — своя сцена (портал); раскладушка встаёт у героя и играет
// на прыжок/удар; игрушки откликаются; по ходу ролика — Кощей, искра Звенышка, погоня по комнате, иней, книжка, рывок цепи; без ошибок.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.SNAP=()=>{ZC.FIN.occ.frame();const gl=ZC.FIN.occ.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(60);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const PN=ZC.FIN.proDbg(),c=PN.ctx;if(!c)throw new Error('комната не передана модулю (FIN.proRoom)');
// еловые лапы — снаружи стен штаба (вершины конусов дальше радиуса стены)
const THREE=window.THREE;let nd=null;ZC.W.group.traverse(o=>{if(o.isInstancedMesh&&o.geometry.type==='ConeGeometry'&&Math.abs(o.geometry.parameters.radius-0.45)<1e-3&&Math.abs(o.geometry.parameters.height-1.5)<1e-3)nd=o;});
if(!nd)throw new Error('еловые лапы не найдены');
const m4=new THREE.Matrix4(),v=new THREE.Vector3(),pos=nd.geometry.attributes.position;let rmin=1e9;
for(let i=0;i<nd.count;i++){nd.getMatrixAt(i,m4);for(let k=0;k<pos.count;k++){v.fromBufferAttribute(pos,k).applyMatrix4(m4).applyMatrix4(nd.matrixWorld);rmin=Math.min(rmin,Math.hypot(v.x,v.z));}}
if(rmin<c.R)throw new Error('еловая лапа внутри штаба: r='+rmin.toFixed(2)+' < R='+c.R);
const dec={toys:PN.toys.length,bunting:PN.bunting.length,herbs:PN.herbs.length,candles:PN.candles.length,curtains:PN.curtains.length,clock:!!PN.clock,beam:!!PN.beam};
if(dec.toys<4||dec.bunting<16||dec.herbs<2||dec.candles<2||dec.curtains<2||!dec.clock)throw new Error('комната не обставлена: '+JSON.stringify(dec));
'needles='+nd.count+' rmin='+rmin.toFixed(2)+' R='+c.R+' '+JSON.stringify(dec)
//@@ shot=pn_room.png
SNAP();const s=ZC.FIN.proNight();if(!s.portal||!s.rt)throw new Error('окно не рисует ночь (портал): '+JSON.stringify(s));JSON.stringify(s)
//@@ shot=pn_pop.png
// раскладушка: активный герой подходит к столу — друзья встают со страницы; прыжок — прыгают волной, удар — кружатся
const P=ZC.players,h=P[1].heroes[P[1].act];h.pos.set(2.3,0,-1.3);ZC.tick(80);const k1=ZC.FIN.proNight().pop;if(k1<0.9)throw new Error('раскладушка не встала: '+k1);
const pop=ZC.FIN.proDbg().nbPop;ZC.press('KeyM');ZC.tick(1);ZC.tick(14);const hop=Math.max(...pop.cards.map(cd=>cd.card.position.y));
ZC.tick(60);ZC.press('Comma');ZC.tick(1);ZC.tick(12);const spin=Math.max(...pop.cards.map(cd=>cd.card.rotation.y));
if(pop.taps<2||hop<0.02||spin<0.5)throw new Error('книжка не играет: taps='+pop.taps+' hop='+hop.toFixed(3)+' spin='+spin.toFixed(2));
for(let i=0;i<10;i++)ZC.FIN.ui(0.2);SNAP();'pop='+k1+' taps='+pop.taps+' hop='+hop.toFixed(3)+' spin='+spin.toFixed(2)
//@@
// игрушки откликаются на героя; раскладушка складывается, когда герой отошёл
const P=ZC.players,h=P[1].heroes[P[1].act];h.pos.set(3.2,0,2.9);ZC.tick(30);const t=ZC.FIN.proNight().toys;h.pos.set(2.2,0,1.4);ZC.tick(90);const k2=ZC.FIN.proNight().pop;
if(!(t[0]<1))throw new Error('мяч не откликнулся: '+t.join());if(k2>0.05)throw new Error('раскладушка не сложилась: '+k2);'toys='+t.join()+' pop='+k2
//@@
const P=ZC.players;P[0].heroes[P[0].act].pos.set(-2,0,1.4);P[1].heroes[P[1].act].pos.set(2.2,0,1.4);let n=0;while(!ZC.G.cine&&n<300){ZC.tick(1);n++;}
if(!ZC.G.cine)throw new Error('ролик не начался');
window.LOG=[];window.T=t=>{for(let i=0;i<6000&&ZC.G.cine&&ZC.G.cine.t<t;i++){ZC.tick(1);if(i%6==0&&ZC.FIN.ui)ZC.FIN.ui(0.1);}SNAP();const s=ZC.FIN.proNight(),Z=ZC.W.zven;
  s.T=ZC.G.cine?+ZC.G.cine.t.toFixed(2):-1;s.zv=!!(Z&&Z.g.visible);s.zr=Z?+Math.hypot(Z.pos.x,Z.pos.z).toFixed(2):0;LOG.push(s);return s;};
'cine dur='+ZC.G.cine.dur
//@@ shot=pn_k1_ko_far.png
const s=T(24.4);if(!s.ko)throw new Error('24,4: Кощея нет за окном');JSON.stringify(s)
//@@ shot=pn_k2_zven_out.png
const s=T(26.2);if(!s.ko||!s.zg)throw new Error('26,2: нет Кощея или искры Звенышка за окном: '+JSON.stringify(s));JSON.stringify(s)
//@@ shot=pn_k3_chase.png
const s=T(27.6);if(s.zg||!s.zv||s.zr>ZC.FIN.proDbg().ctx.R)throw new Error('27,6: Звенышко не в комнате: '+JSON.stringify(s));JSON.stringify(s)
//@@ shot=pn_k4_frost.png
const s=T(28.8);if(s.frost<0.99||!s.ko||s.zv)throw new Error('28,8: нет инея/Кощея или Звенышко не спряталось: '+JSON.stringify(s));JSON.stringify(s)
//@@ shot=pn_k5_story.png
const s=T(33.4);if(!s.story||!s.zv)throw new Error('33,4: книжка не открыта: '+JSON.stringify(s));JSON.stringify(s)
//@@ shot=pn_k6_rip.png
const s=T(35.3);if(s.fly<9)throw new Error('35,3: цепь не порвалась: '+JSON.stringify(s));JSON.stringify(s)
//@@
const s=T(37.2);if(s.story||s.ko||s.frost>0)throw new Error('37,2: книжка/Кощей/иней не убраны: '+JSON.stringify(s));JSON.stringify(s)
//@@ shot=pn_k7_door.png
const s=T(40.6);const Z=ZC.W.zven;if(Z.pos.z>-5)throw new Error('40,6: Звенышко не у двери: '+Z.pos.z.toFixed(2));JSON.stringify(s)
//@@
T(99);const s=ZC.FIN.proNight();if(ZC.G.cine)throw new Error('ролик не закончился');if(s.ct!==-1||s.frost!==0)throw new Error('состояние ролика не сброшено: '+JSON.stringify(s));
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));
['stage='+ZC.W.flags.stage,'fly='+s.fly,'errs='+_errs.length].join(' · ')
