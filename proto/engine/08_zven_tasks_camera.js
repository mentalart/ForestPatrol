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
  const look=new V3(h.pos.x+r.la.x,h.pos.y+1.1,h.pos.z+r.la.z);const dist=7.2+(h.kind==='potap'?0.6:0),hgt=4.0;
  const des=look.clone().addScaledVector(back,dist);des.y+=hgt;des.x=clamp(des.x,-W.camX,W.camX);r.pos.lerp(des,1-Math.exp(-4.5*dt));r.look.lerp(look,1-Math.exp(-7*dt));
  const right=new V3(back.z,0,-back.x),lat=h.vel.x*right.x+h.vel.z*right.z;r.roll=damp(r.roll,clamp(-lat*0.012,-0.07,0.07),3,dt);shakeUpd(r,dt);}
function activeCamZone(){for(const z of W.camZones)if(z.camActive())return z;return null;}
function updateShared(dt){shakeUpd(shared,dt);
  if(G.cine&&G.cine.cam){const c=G.cine;if(c.snap){shared.pos.copy(c.camPos);shared.look.copy(c.camLook);c.snap=false;}
    else{shared.pos.lerp(c.camPos,1-Math.exp(-c.camK*dt));shared.look.lerp(c.camLook,1-Math.exp(-c.camK*1.3*dt));}shared.roll=damp(shared.roll,0,3,dt);return;}
  if(W.camFn){const c=W.camFn();shared.pos.lerp(c.pos,1-Math.exp(-(c.k||4)*dt));shared.look.lerp(c.look,1-Math.exp(-(c.k||4)*1.4*dt));shared.roll=damp(shared.roll,c.roll||0,3,dt);return;}
  const back=camBack(),a=G.solo?active(G.soloPi):active(0),b=G.solo?a:active(1),mid=new V3((a.pos.x+b.pos.x)/2,(a.pos.y+b.pos.y)/2,(a.pos.z+b.pos.z)/2);let look,dist,hgt;const z=activeCamZone();
  if(z){const zy=(z.y||0)+0.8;look=new V3(z.x,zy,z.z).lerp(new V3(mid.x,zy,mid.z),0.25);dist=z.r*1.05+4;hgt=z.r*0.85+3.5;}
  else{const sep=hd(a.pos,b.pos),la=G.solo?rigs[G.soloPi].la.clone():rigs[0].la.clone().add(rigs[1].la).multiplyScalar(0.5);look=new V3(mid.x+la.x,mid.y+1.1,mid.z+la.z);const sc=G.fightMerge?Math.min(sep,CAM_SEP_CAP):sep;dist=7.2+sc*0.8;hgt=4.0+sc*0.5;}   // общий экран драки: камера не отъезжает дальше, чем на разлёт CAM_SEP_CAP, иначе герои в кадре — точки

  const des=look.clone().addScaledVector(back,dist);des.y+=hgt;if(!z)des.x=clamp(des.x,-W.camX,W.camX);shared.pos.lerp(des,1-Math.exp(-3.5*dt));shared.look.lerp(look,1-Math.exp(-5*dt));
  const right=new V3(back.z,0,-back.x),lat=((a.vel.x+b.vel.x)*right.x+(a.vel.z+b.vel.z)*right.z)*0.5;shared.roll=damp(shared.roll,clamp(-lat*0.008,-0.05,0.05),3,dt);}
function fightNear(dt){const a=active(0),b=active(1);let f=false;if(!W.noFightCam)for(const e of W.enemies){if(!e.alive||e.state==='hide'||e.noCam)continue;if(hd(e.pos,a.pos)<14||hd(e.pos,b.pos)<14){f=true;break;}}
  G.fightT=f?1.8:Math.max(0,(G.fightT||0)-dt);return G.fightT>0;}
// Общий экран в драке: камера отъезжает от героев на 0,8 м за каждый метр разлёта (updateShared). Уровни идут вдоль взгляда камеры,
// поэтому дальний герой оказывается ещё на полразлёта дальше центра кадра: при разлёте 20 м Йоша — 16 px на кадре 720p (2,2 %), а
// ближний герой уходит за нижний край (docs/29_full_audit.md, 7.4). В драке отъезд ограничен разлётом CAM_SEP_CAP, а при разлёте от
// CAM_SEP_SPLIT экран делится даже в драке (обратно сливается ниже CAM_SEP_SPLIT − 4): камера с потолком держит обоих в кадре до ≈ 17 м.
const CAM_SEP_CAP=9,CAM_SEP_SPLIT=16;
function decideSplit(dt){const fight=fightNear(dt);G.fightMerge=false;
  const sepNow=hd(active(0).pos,active(1).pos);G.farSplit=fight&&(G.farSplit?sepNow>=CAM_SEP_SPLIT-4:sepNow>=CAM_SEP_SPLIT);
  if(G.cine&&G.cine.cam)G.splitTarget=0;else if(G.solo||activeCamZone()||W.camFn)G.splitTarget=0;else if(W.noSplit)G.splitTarget=0;else if(W.forceSplit)G.splitTarget=1;else if(fight&&!G.farSplit){G.splitTarget=0;G.fightMerge=true;}
  else{const a=active(0),b=active(1),d=hd(a.pos,b.pos);if(G.splitTarget<0.5){if(d>8)G.splitTarget=1;}else if(d<6&&!occluded(a,b))G.splitTarget=0;}
  const rate=dt/0.5;G.split=G.split<G.splitTarget?Math.min(G.splitTarget,G.split+rate):Math.max(G.splitTarget,G.split-rate);}
function snapCams(){for(const i of[0,1]){const h=active(i),r=rigs[i];r.look.set(h.pos.x,h.pos.y+1.1,h.pos.z);r.pos.copy(r.look).addScaledVector(camBack(),7.2);r.pos.y+=4;r.la.set(0,0,0);}
  const m=rigs[0].look.clone().add(rigs[1].look).multiplyScalar(0.5);shared.look.copy(m);shared.pos.copy(m).addScaledVector(camBack(),10);shared.pos.y+=6;}
const dcam=new THREE.PerspectiveCamera(),poseS={pos:new V3(),quat:new THREE.Quaternion()},poseA={pos:new V3(),quat:new THREE.Quaternion()};
function composePose(src,out){dcam.position.copy(src.pos).add(src.shOff);dcam.up.set(0,1,0);dcam.lookAt(src.look.x+src.shOff.x,src.look.y+src.shOff.y,src.look.z+src.shOff.z);dcam.rotateZ(src.roll);out.pos.copy(dcam.position);out.quat.copy(dcam.quaternion);}
let PANES=[];
function render(){const Wd=innerWidth,H=innerHeight;renderer.shadowMap.needsUpdate=true;
  const a=active(0).pos,b=active(1).pos,foc=G.cine&&G.cine.cam?shared.look:new V3((a.x+b.x)/2,0,(a.z+b.z)/2);sun.target.position.set(foc.x,0,foc.z);sun.position.copy(sun.target.position).add(W.sunOff);
  {const want=Math.round(clamp(hd(a,b)*0.6+16,18,40));const sc=sun.shadow.camera;if(sc.right!==want){sc.left=-want;sc.right=want;sc.top=want;sc.bottom=-want;sc.updateProjectionMatrix();}}
  composePose(shared,poseS);const e=smooth(G.split);PANES=[];const fov=G.cine&&G.cine.cam?G.cine.fov:55;
  if(e<0.002){camS.position.copy(poseS.pos);camS.quaternion.copy(poseS.quat);camS.fov=fov;camS.aspect=Wd/H;camS.clearViewOffset();camS.updateProjectionMatrix();camS.updateMatrixWorld();
    renderer.setViewport(0,0,Wd,H);renderer.setScissor(0,0,Wd,H);renderer.render(scene,camS);PANES.push({cam:camS,x:0,w:Wd,h:H});}
  else for(let i=0;i<2;i++){composePose(rigs[i],poseA);const cam=cams[i];cam.position.lerpVectors(poseS.pos,poseA.pos,e);cam.quaternion.copy(poseS.quat).slerp(poseA.quat,e);
    cam.fov=lerp(55,60,e);cam.aspect=Wd/H;const off=i===0?lerp(0,Wd/4,e):lerp(Wd/2,Wd/4,e);cam.setViewOffset(Wd,H,off,0,Wd/2,H);cam.updateProjectionMatrix();cam.updateMatrixWorld();
    const x=i*Wd/2;renderer.setViewport(x,0,Wd/2,H);renderer.setScissor(x,0,Wd/2,H);renderer.render(scene,cam);PANES.push({cam,x,w:Wd/2,h:H});}
  $('divider').style.opacity=e;$('edgeL').style.opacity=e;$('edgeR').style.opacity=e;$('mergebar').style.opacity=G.cine?0:1-e;}

