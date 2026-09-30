//@@
// релиз: большие «прозрачные стены» растворяются кусками. Раньше забор у калитки в прологе (одна группа) шёл узором целиком,
// стоило ему заслонить одного героя, — и дальняя его часть, никого не заслоняющая, тоже. Проверки: группы шире 4 м поделены;
// за правой частью забора — Йоша: растворяется кусок перед ним, левая часть забора (в 7 м) — нет; герои ушли — всё вернулось.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.O=ZC.FIN.occ;O.fdt=0.05;
window.lv=id=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(10);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}const W=ZC.W;
  const box=new Map(),cnt=new Map();for(const m of W.fadeMeshes){const f=m.userData.fadeRef;const b=new THREE.Box3().setFromObject(m);cnt.set(f,(cnt.get(f)||0)+1);if(!box.has(f))box.set(f,b.clone());else box.get(f).union(b);}
  let wide=0;for(const [f,b] of box)if(cnt.get(f)>1&&(b.max.x-b.min.x>4.5||b.max.z-b.min.z>4.5))wide++;return id+':'+W.fades.length+'/'+(O.fadeParts||0)+(wide?' wide='+wide:'');};
const r=ZC.LEVELS.map(L=>L.id).map(lv);[r.filter(s=>!/:\d+\/0$/.test(s)).join(' '),r.some(s=>/wide/.test(s))?'FAIL wide':'ok']
//@@
window.FS={put(h,x,z){h.pos.set(x,h.pos.y+3,z);h.vel.set(0,0,0);},
  part(x){const W=ZC.W;for(const m of W.fadeMeshes){const b=new THREE.Box3().setFromObject(m);if(b.min.x<=x&&b.max.x>=x&&b.min.z<-41.5&&b.max.z>-42.5&&b.max.y>1)return m.userData.fadeRef;}return null;}};
ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<6&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(30);const W=ZC.W;W.flags.stage='chase';
FS.put(U.act(0),-4.6,-36.8);FS.put(U.act(1),0.2,-45.5);ZC.tick(400);for(let i=0;i<30;i++){ZC.tick(1);O.frame();}
const L=FS.part(-8.6),Rt=FS.part(0.2);window.FSp={L,Rt};
['a1='+U.act(1).kind+' '+U.act(1).pos.toArray().map(v=>v.toFixed(1)).join(','),'left='+(L?L.w.toFixed(2):'none'),'right='+(Rt?Rt.w.toFixed(2):'none'),'same='+(L===Rt),
 (L&&Rt&&Rt.w>0.5&&L.w<0.05)?'ok':'FAIL']
//@@ shot=fadesplit_gate.png
ZC.tick(2);
//@@
FS.put(U.act(1),-4.8,-38.5);ZC.tick(60);for(let i=0;i<40;i++){ZC.tick(1);O.frame();}const {L,Rt}=FSp;
['back: left='+L.w.toFixed(2)+' right='+Rt.w.toFixed(2),(Rt.w<0.05&&L.w<0.05)?'ok':'FAIL','errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')]
