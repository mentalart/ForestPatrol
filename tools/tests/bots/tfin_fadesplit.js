//@@
// релиз: большие «прозрачные стены» растворяются кусками. Раньше забор у калитки в прологе (одна группа) шёл узором целиком,
// стоило ему заслонить одного героя, — и дальняя его часть, никого не заслоняющая, тоже. Проверки: группы шире 4 м поделены;
// за правой частью забора — Йоша: растворяется кусок перед ним, левая часть забора (в 7 м) — нет; герои ушли — всё вернулось.
// Кадры — не чаще, чем их дорисовывает GPU. У калитки два экрана и кадр в SwiftShader стоит 3–6 с, а headless-браузер не притормаживает
// цикл requestAnimationFrame: недорисованные кадры копились очередью (до полуторы минуты работы), снимок ждал всю очередь и под нагрузкой
// (несколько ботов параллельно, как в CI) не укладывался в 120 с. Следующий кадр — только когда GPU закончил предыдущий (fence WebGL2);
// все колбэки requestAnimationFrame ждут в одной очереди и выполняются вместе, как в одном кадре браузера.
{const gl=[...document.querySelectorAll('canvas')].map(c=>c.getContext('webgl2')).find(Boolean),raf=window.requestAnimationFrame.bind(window);
  if(gl){let fence=null,q=[],id=0,on=false;
    const pump=t=>{if(fence){if(gl.getSyncParameter(fence,gl.SYNC_STATUS)!==gl.SIGNALED){raf(pump);return;}gl.deleteSync(fence);fence=null;}
      const run=q;q=[];on=false;for(const [,cb] of run)cb(t);fence=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0);gl.flush();};
    window.requestAnimationFrame=cb=>{q.push([++id,cb]);if(!on){on=true;raf(pump);}return id;};
    const caf=window.cancelAnimationFrame.bind(window);window.cancelAnimationFrame=k=>{q=q.filter(e=>e[0]!==k);caf(k);};}}
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.O=ZC.FIN.occ;O.fdt=0.05;
window.lv=id=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(10);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}const W=ZC.W;
  const box=new Map(),cnt=new Map();for(const m of W.fadeMeshes){const f=m.userData.fadeRef;const b=new THREE.Box3().setFromObject(m);cnt.set(f,(cnt.get(f)||0)+1);if(!box.has(f))box.set(f,b.clone());else box.get(f).union(b);}
  let wide=0;for(const [f,b] of box)if(cnt.get(f)>1&&(b.max.x-b.min.x>4.5||b.max.z-b.min.z>4.5))wide++;return id+':'+W.fades.length+'/'+(O.fadeParts||0)+(wide?' wide='+wide:'');};
const r=ZC.LEVELS.map(L=>L.id).map(lv);[r.filter(s=>!/:\d+\/0$/.test(s)).join(' '),r.some(s=>/wide/.test(s))?'FAIL wide':'ok']
//@@
// FS.settle(n): n кадров детекции «прозрачных стен» (она идёт при отрисовке, лучами — пиксели не нужны) на холсте 128×72: в SwiftShader кадр у калитки
// стоит ~0,6 с вместо ~3 с; потом полное разрешение и ожидание, пока GPU всё дорисует, — снимок после шага ждёт только свой кадр.
window.FS={put(h,x,z){h.pos.set(x,h.pos.y+3,z);h.vel.set(0,0,0);},
  settle(n){const R=O.dbg.renderer,pr=R.getPixelRatio();R.setPixelRatio(0.1);for(let i=0;i<n;i++){ZC.tick(1);O.frame();}R.setPixelRatio(pr);const gl=R.getContext();gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(4));},
  part(x){const W=ZC.W;for(const m of W.fadeMeshes){const b=new THREE.Box3().setFromObject(m);if(b.min.x<=x&&b.max.x>=x&&b.min.z<-41.5&&b.max.z>-42.5&&b.max.y>1)return m.userData.fadeRef;}return null;}};
ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<6&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(30);const W=ZC.W;W.flags.stage='chase';
FS.put(U.act(0),-4.6,-36.8);FS.put(U.act(1),0.2,-45.5);ZC.tick(400);FS.settle(30);
const L=FS.part(-8.6),Rt=FS.part(0.2);window.FSp={L,Rt};
['a1='+U.act(1).kind+' '+U.act(1).pos.toArray().map(v=>v.toFixed(1)).join(','),'left='+(L?L.w.toFixed(2):'none'),'right='+(Rt?Rt.w.toFixed(2):'none'),'same='+(L===Rt),
 (L&&Rt&&Rt.w>0.5&&L.w<0.05)?'ok':'FAIL']
//@@ shot=fadesplit_gate.png
ZC.tick(2);
//@@
FS.put(U.act(1),-4.8,-38.5);ZC.tick(60);FS.settle(40);const {L,Rt}=FSp;
['back: left='+L.w.toFixed(2)+' right='+Rt.w.toFixed(2),(Rt.w<0.05&&L.w<0.05)?'ok':'FAIL','errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:'')]
