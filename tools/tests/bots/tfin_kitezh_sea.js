//@@ wait=1500
// релиз final06: мир 2 под водой (late_99c_kitezh_sea.js) — в Китеже (2-1, 2-5) дно без травы: ракушки, камешки, кораллы, актинии, губки,
// горгонарии, ежи; каустика на гранёных материалах, столбы света, морской снег, пузырьки со дна и от героев, стайки рыб, медузы;
// глубинный туман и рамка толщи; падение под водой медленнее. Над водой (мир 1, 2-2) — ничего этого нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.SNAP=()=>{ZC.FIN.occ.frame();const gl=ZC.FIN.occ.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.KITS=()=>{const c={};ZC.W.group.traverse(o=>{if(o.isInstancedMesh&&o.geometry.userData.kit){const k=o.geometry.userData.kit;c[k]=(c[k]||0)+o.count;}});return c;};
window.GO=(id,x,z,fl)=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
  if(fl)Object.assign(ZC.W.flags,fl);if(x!==undefined){const P=ZC.players;for(const pi of[0,1])for(const h of P[pi].heroes)h.pos.set(x+pi*2+(h.active?0:1),0.3,z+(h.active?0:1.2));}
  for(let i=0;i<4;i++){ZC.tick(30);ZC.skip();}for(let i=0;i<6;i++)ZC.FIN.ui&&ZC.FIN.ui(0.1);SNAP();return id;};
GO('2-1',-2,-9,{stage:'sadko'});const S=ZC.FIN.sea,k=KITS();
const r={tuft:k.tuft||0,flower:k.flower||0,decor:S.decorN,anem:k.anemone||0,sponge:k.sponge||0,coral:k.coral||0,shafts:S.shafts.length,schools:S.fish?S.fish.schools.length:0,jelly:S.jelly.length,
  vents:S.vents.length,caus:+S.U.caus.value.toFixed(2),fogNear:ZC.G&&window.ZC?0:0,vig:S.vig?+S.vig.style.opacity:0};
if(r.tuft||r.flower)throw new Error('в Китеже растёт трава/цветы: '+JSON.stringify(r));
if(r.decor<80||r.anem<5||r.sponge<5||r.coral<5)throw new Error('дно не одето: '+JSON.stringify(r));
if(r.shafts<5||r.schools<2||r.jelly<2||r.vents<3)throw new Error('нет света, рыб, медуз или пузырьков: '+JSON.stringify(r));
if(!(r.caus>1))throw new Error('каустика не включена: '+r.caus);if(!(r.vig>0.5))throw new Error('рамки толщи нет: '+r.vig);JSON.stringify(r)
//@@ shot=ksea_21_square.png
// пузырьки: со дна и от героев (дыхание)
ZC.tick(240);const B=ZC.FIN.sea.bub;const on=B.D.filter(d=>d.on).length;const fishMoved=(()=>{const F=ZC.FIN.sea.fish,m=new THREE.Matrix4(),a=new THREE.Vector3();F.im.getMatrixAt(0,m);a.setFromMatrixPosition(m);ZC.tick(30);F.im.getMatrixAt(0,m);const b=new THREE.Vector3().setFromMatrixPosition(m);return a.distanceTo(b);})();
if(on<6)throw new Error('пузырьков нет: '+on);if(!(fishMoved>0.05))throw new Error('рыбы стоят: '+fishMoved);'bubbles='+on+' fish moved='+fishMoved.toFixed(2)
//@@
// падение под водой медленнее: с 9 м вниз — скорость не больше 10,5 м/с
const h=ZC.HERO.proshka;h.pos.set(-6,9,-4);h.vel.set(0,0,0);h.grounded=false;let vmin=0,t=0;for(let i=0;i<300&&!h.grounded;i++){ZC.tick(1);vmin=Math.min(vmin,h.vel.y);t++;}
if(vmin<-10.6)throw new Error('падает как на суше: '+vmin.toFixed(2));if(!h.grounded)throw new Error('не приземлился');'fall vmin='+vmin.toFixed(2)+' frames='+t
//@@ shot=ksea_25_well.png
GO('2-5',0,2);const S=ZC.FIN.sea,k=KITS();if(k.tuft||k.flower)throw new Error('2-5: трава');if(!(S.U.caus.value>1)||S.shafts.length<4)throw new Error('2-5: нет каустики или света');'2-5 ok decor='+S.decorN
//@@
// над водой — как было: мир 1 и 2-2 (на спине кита) без каустики и рамки
GO('1-1');let c1=ZC.FIN.sea.U.caus.value,v1=ZC.FIN.sea.vig?+ZC.FIN.sea.vig.style.opacity:0;GO('2-2',0,-12);ZC.skip();ZC.tick(30);SNAP();const c2=ZC.FIN.sea.U.caus.value,v2=ZC.FIN.sea.vig?+ZC.FIN.sea.vig.style.opacity:0,k2=KITS();
if(c1||v1||c2||v2)throw new Error('над водой включилась подводная картинка: '+[c1,v1,c2,v2]);if(!(k2.tuft>0))throw new Error('на суше пропала трава');'surface ok tuft='+k2.tuft
//@@
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'errs=0'
