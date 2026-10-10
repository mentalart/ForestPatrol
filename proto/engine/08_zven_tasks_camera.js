/* ============================== ЗВЕНЫШКО: проводник и подсказчик ============================== */
function makeZven(){const g=new THREE.Group();W.group.add(g);const gm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.9});
  const body=new THREE.Group();g.add(body);const link=new THREE.Mesh(new THREE.TorusGeometry(0.15,0.055,10,24),gm);link.scale.set(1,1.45,1);link.castShadow=true;body.add(link);
  for(const s of[-1,1])part(body,new THREE.SphereGeometry(0.03,8,6),MAT.dark,s*0.07,0.185,0.06);
  const halo=new THREE.Mesh(new THREE.SphereGeometry(0.42,14,10),MB(0xffd76a,{transparent:true,opacity:0.18,depthWrite:false}));g.add(halo);
  const light=new THREE.PointLight(0xffc860,1.1,7,2);g.add(light);
  return {g,body,link,halo,light,pos:g.position,target:new V3(),mode:'lead',ringT:0,vis:true,spin:0,spinRate:1.5,scale:1};}
function zvenRing(){const Z=W.zven;if(!Z)return;SFX.dzin();burst(Z.pos.clone(),COL.gold,6,2,0.6);floatText(Z.pos.clone().add(new V3(0,0.55,0)),'Дзинь!','#ffe08a');}   // только в роликах
const ZWAVE_GEO=new THREE.TorusGeometry(0.3,0.022,6,40);
function zvenWave(big){const Z=W.zven;if(!Z||!Z.vis)return;const m=new THREE.Mesh(ZWAVE_GEO,MB(0xffd76a,{transparent:true,opacity:big?0.75:0.45,depthWrite:false}));
  m.position.copy(Z.pos);m.position.y+=Z.body.position.y;if(Math.random()<0.5)m.rotation.x=Math.PI/2;W.group.add(m);W.fx.push({m,t:0,life:big?1.3:1.1,ring:big?4.2:2.6,keepRot:true});}
function hintPos(pi){const o=W.objectives[pi][players[pi].obj];if(!o)return null;if(o.hint)return o.hint();
  for(const x of o.targets()){if(!x)continue;const v=new V3();if(x.getWorldPosition)x.getWorldPosition(v);else v.copy(x);return v;}return null;}
function updateZven(dt){const Z=W.zven;if(!Z)return;
  if(Z.mode!=='script'){let tgt=null,bi=-1,best=-1;
    // 20 секунд без продвижения — подлетает к нужному месту и звенит
    for(const pi of[0,1]){const p=players[pi];if(p.idle>20&&p.idle>best&&W.objectives[pi][p.obj]){best=p.idle;bi=pi;}}
    if(bi>=0){const hp=hintPos(bi);if(hp){tgt=hp.clone().add(new V3(0,1.2,0));Z.hint=Z.pos.distanceTo(tgt)<1.6;if(Z.hint&&(W.world===4||W.readHints)){const o=W.objectives[bi][players[bi].obj];if(o&&o.read&&!o.readT){o.readT=1;sayP(o.read,3.4);}}}}else Z.hint=false;
    // ведёт вперёд и назад не возвращается: при смене героя Звенышко ждёт там, где было
    if(W.zvenAway){ // в мирах Звенышко улетает вперёд и возвращается, только когда оно нужно: подсказка, реплика, ролик
      const act=HEROES.filter(h=>h.active),lead=act.reduce((m,h)=>h.pos.z<m.pos.z?h:m,act[0]);Z.summonT=Math.max(0,(Z.summonT||0)-dt);const want=bi>=0||Z.summonT>0;
      if(want&&!Z.shown){Z.shown=true;Z.vis=true;Z.pos.set(lead.pos.x+rand(-3,3),lead.pos.y+5,lead.pos.z-13);}
      if(want&&!tgt){tgt=new V3((act[0].pos.x+act[1].pos.x)/2,Math.max(act[0].pos.y,act[1].pos.y)+2.3,(act[0].pos.z+act[1].pos.z)/2-2.2);}
      if(!want){tgt=new V3(lead.pos.x*0.3,lead.pos.y+7,lead.pos.z-28);if(Z.shown&&act.every(h=>h.pos.distanceTo(Z.pos)>15)){Z.shown=false;}}
      Z.vis=!!Z.shown;Z.target.copy(tgt);Z.pos.lerp(Z.target,1-Math.exp(-(want?3.2:1.6)*dt));}
    else{if(!tgt&&W.zvenGoal){tgt=W.zvenGoal();if(!W.zvenFree){Z.leadZ=Math.min(Z.leadZ===undefined?1e9:Z.leadZ,tgt.z);tgt.z=Z.leadZ;}}if(tgt)Z.target.copy(tgt);
    Z.pos.lerp(Z.target,1-Math.exp(-(bi>=0?3.2:2.2)*dt));}}
  Z.body.position.y=Math.sin(G.time*2.6)*0.12;Z.spin+=dt*Z.spinRate;
  if(Z.mode!=='script'){Z.body.position.x=Math.sin(G.time*57)*0.012+Math.sin(G.time*31)*0.01;Z.body.position.z=Math.cos(G.time*49)*0.01;   // лёгкая дрожь
    Z.waveT=(Z.waveT||0)-dt;if(Z.waveT<=0){Z.waveT=Z.hint?0.55:1.5;zvenWave(Z.hint);}}else Z.body.position.x=Z.body.position.z=0;Z.body.rotation.y=Math.sin(Z.spin)*0.7;Z.body.rotation.z=Math.sin(G.time*1.7)*0.15;Z.body.scale.setScalar(Z.scale);
  Z.halo.scale.setScalar(Z.scale*(1+0.15*Math.sin(G.time*5)));Z.light.intensity=Z.vis?1.1+0.3*Math.sin(G.time*5):0;Z.g.visible=Z.vis;}

/* ============================== ЗАДАЧИ, ПОДСКАЗКИ 20/40 с, ПРИЗРАК ============================== */
function O(text,done,targets,ghost,hint){return {text,done,targets:targets||(()=>[]),ghost:ghost||null,hint:hint||null};}
const ghosts=[{g:null,kind:null,spec:null,t:0},{g:null,kind:null,spec:null,t:0}];
function setPulse(pi,list){const p=players[pi];for(const m of p.pulsed)restoreEm(m);p.pulsed=list||[];}
function restoreEm(m){const mat=m.material;if(mat&&mat.userData&&mat.userData.baseEm){mat.emissive.copy(mat.userData.baseEm);mat.emissiveIntensity=mat.userData.baseEi;delete mat.userData.baseEm;}}
function pulseEm(m){const mat=m.material;if(!mat||!mat.emissive||mat.userData.shared)return;if(!mat.userData.baseEm){mat.userData.baseEm=mat.emissive.clone();mat.userData.baseEi=mat.emissiveIntensity;}
  const k=0.5+0.5*Math.sin(G.time*6);mat.emissive.setRGB(1,0.9,0.45);mat.emissiveIntensity=0.15+0.75*k;}
function hideGhost(pi){const gh=ghosts[pi];if(gh.g)gh.g.visible=false;gh.spec=null;}
function showGhost(pi,spec){if(!spec)return;const gh=ghosts[pi];if(gh.spec)return;
  if(gh.kind!==spec.kind){if(gh.g)scene.remove(gh.g);gh.g=buildHeroMesh(spec.kind,true).g;scene.add(gh.g);gh.kind=spec.kind;}
  gh.spec=spec;gh.t=0;gh.g.visible=true;}
function updateGhosts(dt){for(const gh of ghosts){if(!gh.spec||!gh.g)continue;gh.t+=dt;const s=gh.spec,u=(gh.t%2.8)/2.2,k=smooth(u);
  const from=s.from,to=s.to||s.from,g=gh.g;g.rotation.y=Math.atan2(to.x-from.x,to.z-from.z)||Math.PI;
  if(s.action==='walk'){g.position.lerpVectors(from,to,k);g.position.y=from.y+Math.abs(Math.sin(gh.t*9))*0.08;}
  else if(s.action==='jump'){g.position.lerpVectors(from,to,k);g.position.y=lerp(from.y,to.y,k)+4*k*(1-k)*2.2;}
  else if(s.action==='glide'){g.position.lerpVectors(from,to,k);g.position.y=lerp(from.y,to.y,k)+1.4*Math.sin(Math.min(1,k*1.6)*Math.PI*0.5)*(1-k*0.8);}
  else{g.position.copy(from);g.position.y=from.y+Math.abs(Math.sin(gh.t*5))*0.35;g.rotation.y=Math.PI+Math.sin(gh.t*3)*0.4;}}}
function updateObjectives(dt){for(const pi of[0,1]){const p=players[pi],list=W.objectives[pi];let o=list[p.obj];
  let guard=0;while(o&&o.done()&&guard++<12){p.obj++;p.idle=0;setPulse(pi,[]);hideGhost(pi);o=list[p.obj];tone(880,0.08,'sine',0.15);}
  if(!o)continue;if(!G.cine&&!G.trans)p.idle+=dt;
  if(p.idle>20){if(!p.pulsed.length){const ms=[];for(const t of o.targets())meshesOf(t).forEach(m=>ms.push(m));setPulse(pi,ms);}p.pulsed.forEach(pulseEm);}
  if(p.idle>(W.vest==='rybka'?12:40)&&o.ghost)showGhost(pi,o.ghost());}}

/* ============================== КАМЕРА (демпфирование, lookahead, крен, тряска, слияние, ролики) ============================== */
function mkRig(){return {pos:new V3(0,5,10),look:new V3(),la:new V3(),roll:0,shT:0,shAmp:0,shOff:new V3(),shTick:0};}
const rigs=[mkRig(),mkRig()],shared=mkRig();
function shake(pi,amp,dur){const r=pi===null?null:rigs[pi];for(const x of r?[r,shared]:[rigs[0],rigs[1],shared]){x.shAmp=Math.max(x.shAmp,amp);x.shT=Math.max(x.shT,dur);}if(pi===null){rumble(0,amp,dur);rumble(1,amp,dur);}else rumble(pi,amp,dur);}
function shakeAll(a,d){shake(null,a,d);}
function shakeUpd(r,dt){if(r.shT>0){r.shT-=dt;r.shTick-=dt;if(r.shTick<=0){r.shTick=0.1;r.shOff.set(rand(-1,1),rand(-1,1),rand(-1,1)).normalize().multiplyScalar(r.shAmp*rand(0.6,1));}}else{r.shOff.multiplyScalar(0.8);r.shAmp=0;}}
function updateRig(i,dt){const h=active(i),r=rigs[i],back=camBack();
  r.la.x=damp(r.la.x,clamp(h.vel.x*0.45,-2.5,2.5),2.2,dt);r.la.z=damp(r.la.z,clamp(h.vel.z*0.45,-2.5,2.5),2.2,dt);
  const look=new V3(h.pos.x+r.la.x,h.pos.y+1.1,h.pos.z+r.la.z);const dist=7.2+SPLIT.rigK+(h.kind==='potap'?0.6:0),hgt=4.0+SPLIT.rigK*0.4;
  const des=look.clone().addScaledVector(back,dist);des.y+=hgt;des.x=clamp(des.x,-W.camX,W.camX);r.pos.lerp(des,1-Math.exp(-4.5*dt));r.look.lerp(look,1-Math.exp(-7*dt));
  const right=new V3(back.z,0,-back.x),lat=h.vel.x*right.x+h.vel.z*right.z;r.roll=damp(r.roll,clamp(-lat*0.012,-0.07,0.07),3,dt);shakeUpd(r,dt);}
function activeCamZone(){for(const z of W.camZones)if(z.camActive())return z;return null;}
function updateShared(dt){shakeUpd(shared,dt);
  if(G.cine&&G.cine.cam){const c=G.cine;if(c.snap){shared.pos.copy(c.camPos);shared.look.copy(c.camLook);c.snap=false;}
    else{shared.pos.lerp(c.camPos,1-Math.exp(-c.camK*dt));shared.look.lerp(c.camLook,1-Math.exp(-c.camK*1.3*dt));}shared.roll=damp(shared.roll,0,3,dt);return;}
  if(W.camFn){const c=W.camFn();shared.pos.lerp(c.pos,1-Math.exp(-(c.k||4)*dt));shared.look.lerp(c.look,1-Math.exp(-(c.k||4)*1.4*dt));shared.roll=damp(shared.roll,c.roll||0,3,dt);return;}
  const back=camBack(),a=G.solo?active(G.soloPi):active(0),b=G.solo?a:active(1),mid=new V3((a.pos.x+b.pos.x)/2,(a.pos.y+b.pos.y)/2,(a.pos.z+b.pos.z)/2);let look,dist,hgt;const z=activeCamZone();
  if(z){const zy=(z.y||0)+0.8;look=new V3(z.x,zy,z.z).lerp(new V3(mid.x,zy,mid.z),0.25);dist=z.r*1.05+4;hgt=z.r*0.85+3.5;}
  else{const sep=hd(a.pos,b.pos),la=G.solo?rigs[G.soloPi].la.clone():rigs[0].la.clone().add(rigs[1].la).multiplyScalar(0.5);look=new V3(mid.x+la.x,mid.y+1.1,mid.z+la.z);const sc=Math.min(sep,SPLIT.cfg.sepCap);dist=7.2+sc*0.8;hgt=4.0+sc*0.5;}
  const des=look.clone().addScaledVector(back,dist);des.y+=hgt;if(!z)des.x=clamp(des.x,-W.camX,W.camX);shared.pos.lerp(des,1-Math.exp(-3.5*dt));shared.look.lerp(look,1-Math.exp(-5*dt));
  const right=new V3(back.z,0,-back.x),lat=((a.vel.x+b.vel.x)*right.x+(a.vel.z+b.vel.z)*right.z)*0.5;shared.roll=damp(shared.roll,clamp(-lat*0.008,-0.05,0.05),3,dt);}
/* ------------------------------ раздельный экран: когда делить, как делить ------------------------------
   Режим G.splitMode: 'auto' — делится, когда герои разошлись (дальше SPLIT.cfg.split по земле и высоте) или не влезают в кадр общей камеры;
   'together' — всегда общий, отставшего Звенышко подтягивает к другу; 'apart' — всегда раздельный. Ролик, сценарная камера (W.camFn),
   боевая зона и W.noSplit — общий в любом режиме, W.forceSplit — раздельный. Бой рядом сводит экран, только если герои ближе SPLIT.cfg.fightMax.
   Раскладка G.splitLayout: 'auto' | 'vertical' | 'horizontal' | 'dynamic'. Линия раздела — нормаль SPLIT.n (экран, y вниз; от панели Игрока 1
   к панели Игрока 2) и сдвиг SPLIT.o от центра (px вдоль нормали). Прямая линия: стороны — по кадру общей камеры в миг разделения (кто левее
   или выше, у того левая или верхняя панель) и держатся до слияния; 'auto' на узком экране (меньше 1,25 : 1) — по горизонтали.
   'dynamic' (как в LEGO): линия поперёк направления между героями, сглажена и не дрожит от мелких поворотов; рисует её SPLIT.diag (модуль
   релиза), без него — прямая. Повернул кто-то свою камеру правым стиком (SPLIT.orbitDev) — линия уходит к прямой: у камер разный «вперёд».
   Доля экрана: splitFocus(pi,share,dur) — уровню (у кого своё событие); сама — бьётся только один из двоих: у него SPLIT.cfg.autoFocus. */
const SPLIT={n:{x:1,y:0},tgt:0,o:0,share:0.5,focus:null,hold:0,outT:0,lay:'v',rigK:0.8,fov:64,leashT:0,mv:[0,0],ft:[0,0],glow:null,
  diag:null,autoDyn:false,orbitDev:null,paneShadow:null,
  cfg:{split:8,merge:6,dy:1.3,fightMax:16,sepCap:24,leash:18,autoFocus:0.6,dz:6*Math.PI/180}};
function splitFocus(pi,share,dur){SPLIT.focus={pi,share:clamp(share||0.62,0.5,0.7),t:dur||3};}
function fightNear(dt){const a=active(0),b=active(1);let fa=false,fb=false;
  if(!W.noFightCam)for(const e of W.enemies){if(!e.alive||e.state==='hide'||e.noCam)continue;if(!fa&&hd(e.pos,a.pos)<14)fa=true;if(!fb&&hd(e.pos,b.pos)<14)fb=true;if(fa&&fb)break;}
  SPLIT.ft[0]=fa?1.8:Math.max(0,SPLIT.ft[0]-dt);SPLIT.ft[1]=fb?1.8:Math.max(0,SPLIT.ft[1]-dt);
  G.fightT=fa||fb?1.8:Math.max(0,(G.fightT||0)-dt);return G.fightT>0;}
// «далеко» — по земле и по высоте: герой на уступе над другом тоже далеко
function splitSep(a,b){return Math.hypot(hd(a.pos,b.pos),(a.pos.y-b.pos.y)*SPLIT.cfg.dy);}
// влезают ли оба в кадр общей камеры: наибольшая |координата| ног и макушек на экране (за камерой — 9)
const SPLV=new V3(),splCam=new THREE.PerspectiveCamera(55,1,0.1,320);
function splitFrame(){splCam.position.copy(shared.pos);splCam.up.set(0,1,0);splCam.lookAt(shared.look);splCam.aspect=innerWidth/Math.max(1,innerHeight);splCam.updateProjectionMatrix();splCam.updateMatrixWorld();
  let m=0;for(const pi of[0,1]){const h=active(pi);for(const y of[0.1,heroHeight(h)]){SPLV.set(h.pos.x,h.pos.y+y,h.pos.z).applyMatrix4(splCam.matrixWorldInverse);if(SPLV.z>-0.3)return 9;
    SPLV.applyMatrix4(splCam.projectionMatrix);m=Math.max(m,Math.abs(SPLV.x),Math.abs(SPLV.y));}}return m;}
function decideSplit(dt){const fight=fightNear(dt),C=SPLIT.cfg,md=G.splitMode||'auto';SPLIT.hold=Math.max(0,SPLIT.hold-dt);let t=G.splitTarget;
  if(G.cine&&G.cine.cam||G.solo||activeCamZone()||W.camFn||W.noSplit){t=0;SPLIT.outT=0;}
  else if(W.forceSplit||md==='apart')t=1;
  else if(md==='together')t=0;
  else{const a=active(0),b=active(1),d=splitSep(a,b),fr=splitFrame(),near=fight&&hd(a.pos,b.pos)<C.fightMax;SPLIT.outT=fr>1?SPLIT.outT+dt:0;
    if(G.splitTarget<0.5){if(!near&&SPLIT.hold<=0&&(d>C.split||SPLIT.outT>0.5))t=1;}
    else if(near)t=0;
    else if(SPLIT.hold<=0&&d<C.merge&&fr<0.85&&!occluded(a,b))t=0;}
  if(t!==G.splitTarget){G.splitTarget=t;SPLIT.hold=1;}
  if(md==='together')splitLeash(dt);else SPLIT.leashT=0;
  const rate=dt/0.5;G.split=G.split<G.splitTarget?Math.min(G.splitTarget,G.split+rate):Math.max(G.splitTarget,G.split-rate);
  splitLayout(dt);}
// «всегда вместе»: разошлись дальше SPLIT.cfg.leash — через 1,2 с того, кто стоит (меньше ходил последние секунды), переносит к другу
function splitLeash(dt){for(const pi of[0,1]){const h=active(pi);SPLIT.mv[pi]=damp(SPLIT.mv[pi],Math.hypot(h.vel.x,h.vel.z),1.2,dt);}
  const a=active(0),b=active(1),d=hd(a.pos,b.pos);
  if(G.solo||G.cine||G.trans||W.camFn||G.state!=='play'||d<=SPLIT.cfg.leash){SPLIT.leashT=0;return;}
  SPLIT.leashT+=dt;if(SPLIT.leashT<1.2)return;
  const pi=SPLIT.mv[0]<=SPLIT.mv[1]?0:1,o=active(pi),h=active(1-pi);
  if(players[pi].downed||o.cling||o.held||h.cling||!h.grounded||(W.pullMax&&d>W.pullMax)||pathBlocked(o.pos,h.pos))return;
  SPLIT.leashT=0;teleportBehind(o,h);G.stats.carries++;floatText(o.pos.clone().add(new V3(0,o.d.height+0.6,0)),(W.world===4||W.vestPull?'Весточка подтянула!':'Звенышко подтянуло!'),'#ffd76a');}
// направление от Игрока 1 к Игроку 2 на экране общей камеры (px, y вниз; без перспективы — для угла хватает). Камера — без поворота
// правым стиком: при разделении все камеры сами возвращаются к нему, и стороны должны совпасть с тем, что будет на экране
const SPLQ=new V3(),SPLR=new V3(),SPLU=new V3(),SPLF=new V3(),SPLY=new V3(0,1,0);
function splitScr(){const a=active(0).pos,b=active(1).pos;SPLQ.set(b.x-a.x,b.y-a.y,b.z-a.z);SPLF.subVectors(shared.look,shared.pos).normalize();
  SPLR.crossVectors(SPLF,SPLY).normalize();SPLU.crossVectors(SPLR,SPLF);return {x:SPLQ.dot(SPLR),y:-SPLQ.dot(SPLU)};}
const angW=a=>Math.atan2(Math.sin(a),Math.cos(a));
function splitLayout(dt){const L=G.splitLayout||'auto',C=SPLIT.cfg,Wd=innerWidth,H=Math.max(1,innerHeight),narrow=Wd/H<1.25,merged=G.split<0.01;
  const lay=SPLIT.diag&&(L==='dynamic'||L==='auto'&&SPLIT.autoDyn)?'d':L==='horizontal'||L!=='vertical'&&narrow?'h':'v';SPLIT.lay=lay;
  SPLIT.rigK=lay==='v'?0.8:0.4;SPLIT.fov=lay==='v'?64:lay==='h'?70:58;
  const v=splitScr();let ang=Math.atan2(SPLIT.n.y,SPLIT.n.x),tgt;
  if(lay==='d'){tgt=Math.hypot(v.x,v.y)>1e-3?Math.atan2(v.y,v.x):ang;
    const dev=SPLIT.orbitDev?SPLIT.orbitDev():0,w=1-smooth((dev-0.26)/0.18);
    if(w<1){const ax=narrow?(Math.sin(tgt)>=0?Math.PI/2:-Math.PI/2):(Math.cos(tgt)>=0?0:Math.PI);tgt=ax+angW(tgt-ax)*w;}}
  else if(merged)tgt=lay==='v'?(v.x>=0?0:Math.PI):(v.y>=0?Math.PI/2:-Math.PI/2);   // стороны по кадру
  else tgt=lay==='v'?(Math.cos(ang)>=0?0:Math.PI):(Math.sin(ang)>=0?Math.PI/2:-Math.PI/2);   // разделён — сторона прежняя
  if(merged||!SPLIT.diag){ang=tgt;SPLIT.tgt=tgt;}
  else{if(lay!=='d'||Math.abs(angW(tgt-SPLIT.tgt))>C.dz)SPLIT.tgt=tgt;ang+=angW(SPLIT.tgt-ang)*(1-Math.exp(-dt/0.3));if(lay!=='d'&&Math.abs(angW(SPLIT.tgt-ang))<0.002)ang=SPLIT.tgt;}
  SPLIT.n.x=Math.cos(ang);SPLIT.n.y=Math.sin(ang);
  let sh=0.5;   // доля Игрока 1
  if(SPLIT.focus){SPLIT.focus.t-=dt;if(SPLIT.focus.t<=0)SPLIT.focus=null;else sh=SPLIT.focus.pi?1-SPLIT.focus.share:SPLIT.focus.share;}
  else if(C.autoFocus&&G.split>0.5&&(SPLIT.ft[0]>0)!==(SPLIT.ft[1]>0))sh=SPLIT.ft[0]>0?C.autoFocus:1-C.autoFocus;
  SPLIT.share+=(sh-SPLIT.share)*(1-Math.exp(-dt/0.5));SPLIT.o=(SPLIT.share-0.5)*(Math.abs(SPLIT.n.x)*Wd+Math.abs(SPLIT.n.y)*H);
  if(SPLIT.glow){SPLIT.glow.t-=dt/1.2;if(SPLIT.glow.t<=0)SPLIT.glow=null;}}
function snapCams(){for(const i of[0,1]){const h=active(i),r=rigs[i];r.look.set(h.pos.x,h.pos.y+1.1,h.pos.z);r.pos.copy(r.look).addScaledVector(camBack(),7.2);r.pos.y+=4;r.la.set(0,0,0);}
  const m=rigs[0].look.clone().add(rigs[1].look).multiplyScalar(0.5);shared.look.copy(m);shared.pos.copy(m).addScaledVector(camBack(),10);shared.pos.y+=6;}
const dcam=new THREE.PerspectiveCamera(),poseS={pos:new V3(),quat:new THREE.Quaternion()},poseA={pos:new V3(),quat:new THREE.Quaternion()};
function composePose(src,out){dcam.position.copy(src.pos).add(src.shOff);dcam.up.set(0,1,0);dcam.lookAt(src.look.x+src.shOff.x,src.look.y+src.shOff.y,src.look.z+src.shOff.z);dcam.rotateZ(src.roll);out.pos.copy(dcam.position);out.quat.copy(dcam.quaternion);}
// PANES — панели кадра для интерфейса: {cam,x,w,h,pi,poly,A,box,real}. cam — камера проекции на весь экран (точка мира → px экрана:
// pane.x+(ndc.x·0,5+0,5)·pane.w, (1−(ndc.y·0,5+0,5))·H), poly — многоугольник панели (null — общий экран), A — её центр (px),
// box — рамка [x,y,w,h], real — камера, которой панель нарисована. Видна ли точка в панели — paneHas, край по лучу из центра — paneEdge.
let PANES=[];
const pcams=[new THREE.PerspectiveCamera(),new THREE.PerspectiveCamera()];
// панель — часть экрана по одну сторону линии (s=−1 — Игрок 1, +1 — Игрок 2): многоугольник, рамка, центр тяжести
function splitPoly(Wd,H,s,o){const n=SPLIT.n,cx=Wd/2,cy=H/2,f=p=>s*((p[0]-cx)*n.x+(p[1]-cy)*n.y-o),R=[[0,0],[Wd,0],[Wd,H],[0,H]],q=[];
  for(let i=0;i<4;i++){const p=R[i],r=R[(i+1)%4],fp=f(p),fr=f(r);if(fp>=0)q.push(p);if((fp>=0)!==(fr>=0)){const t=fp/(fp-fr);q.push([p[0]+(r[0]-p[0])*t,p[1]+(r[1]-p[1])*t]);}}
  let a=0,gx=0,gy=0,x0=Wd,y0=H,x1=0,y1=0;
  for(let i=0;i<q.length;i++){const p=q[i],r=q[(i+1)%q.length],c=p[0]*r[1]-r[0]*p[1];a+=c;gx+=(p[0]+r[0])*c;gy+=(p[1]+r[1])*c;x0=Math.min(x0,p[0]);y0=Math.min(y0,p[1]);x1=Math.max(x1,p[0]);y1=Math.max(y1,p[1]);}
  const c=Math.abs(a)>1e-6?[gx/(3*a),gy/(3*a)]:[cx,cy];x0=Math.floor(x0);y0=Math.floor(y0);
  return {pts:q,c,box:[x0,y0,Math.ceil(x1)-x0,Math.ceil(y1)-y0]};}
function paneDist(q,i,x,y){const a=q[i],b=q[(i+1)%q.length],ex=b[0]-a[0],ey=b[1]-a[1];return ((y-a[1])*ex-(x-a[0])*ey)/(Math.hypot(ex,ey)||1);}
function paneHas(P,x,y,m){m=m||0;if(!P.poly)return x>=m&&x<=P.w-m&&y>=m&&y<=P.h-m;for(let i=0;i<P.poly.length;i++)if(paneDist(P.poly,i,x,y)<m)return false;return true;}
function paneEdge(P,x,y,m){m=m||0;const ax=P.A[0],ay=P.A[1];let t=1;
  if(P.poly)for(let i=0;i<P.poly.length;i++){const dA=paneDist(P.poly,i,ax,ay),dS=paneDist(P.poly,i,x,y);if(dS<m)t=Math.min(t,dA>m?(dA-m)/(dA-dS):0);}
  else{const W2=P.w,H2=P.h;for(const [d0,d1] of[[ax,x],[W2-ax,W2-x],[ay,y],[H2-ay,H2-y]])if(d1<m)t=Math.min(t,d0>m?(d0-m)/(d0-d1):0);}
  return [ax+(x-ax)*t,ay+(y-ay)*t];}
// панорама звука панели: −0,5 — левая половина, 0,5 — правая (общий экран — 0)
function panePan(pi){const P=PANES.length>1?PANES[pi]:null;return P&&P.poly?clamp(P.A[0]/P.w*2-1,-1,1):0;}
function render(){const Wd=innerWidth,H=innerHeight;renderer.shadowMap.needsUpdate=true;
  const a=active(0).pos,b=active(1).pos,foc=G.cine&&G.cine.cam?shared.look:new V3((a.x+b.x)/2,0,(a.z+b.z)/2);sun.target.position.set(foc.x,0,foc.z);sun.position.copy(sun.target.position).add(W.sunOff);
  {const want=Math.round(clamp(hd(a,b)*0.6+16,18,40));const sc=sun.shadow.camera;if(sc.right!==want){sc.left=-want;sc.right=want;sc.top=want;sc.bottom=-want;sc.updateProjectionMatrix();}}
  composePose(shared,poseS);const e=smooth(G.split);PANES=[];const fov=G.cine&&G.cine.cam?G.cine.fov:55;let o=SPLIT.o;
  if(e<0.002){camS.position.copy(poseS.pos);camS.quaternion.copy(poseS.quat);camS.fov=fov;camS.aspect=Wd/H;camS.clearViewOffset();camS.updateProjectionMatrix();camS.updateMatrixWorld();
    renderer.setViewport(0,0,Wd,H);renderer.setScissor(0,0,Wd,H);renderer.render(scene,camS);PANES.push({cam:camS,x:0,w:Wd,h:H,pi:-1,poly:null,A:[Wd/2,H/2],box:[0,0,Wd,H],real:camS});}
  else{const n=SPLIT.n,axis=Math.abs(n.x)>0.9999||Math.abs(n.y)>0.9999;
    if(axis)o=Math.abs(n.x)>0.5?(Math.round(Wd/2+n.x*o)-Wd/2)*n.x:(Math.round(H/2+n.y*o)-H/2)*n.y;   // прямая линия — по целому пикселю
    for(let i=0;i<2;i++){const P=splitPoly(Wd,H,i?1:-1,o),A=[lerp(Wd/2,P.c[0],e),lerp(H/2,P.c[1],e)];
      composePose(rigs[i],poseA);const cam=cams[i];cam.position.lerpVectors(poseS.pos,poseA.pos,e);cam.quaternion.copy(poseS.quat).slerp(poseA.quat,e);
      cam.fov=lerp(55,SPLIT.fov,e);cam.aspect=Wd/H;cam.updateMatrixWorld();
      // в переходе центр панели едет из центра экрана в её центр тяжести: в начале обе половины — ровно кадр общей камеры
      const pc=pcams[i];pc.position.copy(cam.position);pc.quaternion.copy(cam.quaternion);pc.fov=cam.fov;pc.near=cam.near;pc.far=cam.far;pc.aspect=Wd/H;
      pc.setViewOffset(Wd,H,Wd/2-A[0],H/2-A[1],Wd,H);pc.updateProjectionMatrix();pc.updateMatrixWorld();
      PANES.push({cam:pc,x:0,w:Wd,h:H,pi:i,poly:P.pts,A,box:P.box,real:cam});}
    if(axis||!SPLIT.diag)for(const P of PANES){const bx=P.box,cam=P.real;cam.setViewOffset(Wd,H,bx[0]+Wd/2-P.A[0],bx[1]+H/2-P.A[1],bx[2],bx[3]);cam.updateProjectionMatrix();
      if(SPLIT.paneShadow)SPLIT.paneShadow(P.pi);renderer.setViewport(bx[0],H-bx[1]-bx[3],bx[2],bx[3]);renderer.setScissor(bx[0],H-bx[1]-bx[3],bx[2],bx[3]);renderer.render(scene,cam);}
    else SPLIT.diag(PANES,Wd,H,o);}
  splitDom(e,Wd,H,o);}
// линия раздела (толще, когда герои далеко; светится цветом позвавшего «Ко мне!») и рамки панелей
const SPLD={dv:'',e:['','']};
function splitDom(e,Wd,H,o){const dv=$('divider');dv.style.opacity=e;$('edgeL').style.opacity=e;$('edgeR').style.opacity=e;$('mergebar').style.opacity=G.cine?0:1-e;
  if(e<0.002)return;const n=SPLIT.n,g=SPLIT.glow,w=6+Math.round(clamp((hd(active(0).pos,active(1).pos)-8)/30,0,1)*6);
  const k=[(Wd/2+n.x*o).toFixed(1),(H/2+n.y*o).toFixed(1),w,Math.ceil(Math.hypot(Wd,H))+40,Math.atan2(n.y,n.x).toFixed(4),g?g.pi+':'+g.t.toFixed(2):''].join('|');
  if(SPLD.dv!==k){SPLD.dv=k;const q=k.split('|');Object.assign(dv.style,{left:q[0]+'px',top:q[1]+'px',bottom:'auto',marginLeft:'0',width:q[2]+'px',height:q[3]+'px',
    transform:'translate(-50%,-50%) rotate('+q[4]+'rad)',boxShadow:g?'0 0 '+Math.round(14+30*g.t)+'px '+Math.round(4+8*g.t)+'px '+PCSS[g.pi]:''});}
  ['edgeL','edgeR'].forEach((id,i)=>{const P=PANES[i];if(!P||!P.poly)return;const cp='polygon('+P.poly.map(p=>Math.round(p[0])+'px '+Math.round(p[1])+'px').join(',')+')';
    if(SPLD.e[i]!==cp){SPLD.e[i]=cp;Object.assign($(id).style,{left:'0',right:'auto',width:'100%',clipPath:cp});}});}

