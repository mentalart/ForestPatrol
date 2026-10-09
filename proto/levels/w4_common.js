/* ============================== МИР 4 · ОГНЕННАЯ СМОРОДИНА: клещи, горячее, лава, корка, пар ============================== */
// Мир без Звенышка: подсказки вслух читает Пелагея, по тетрадке; место показывает весточка помощника из Сказа 3.
// RB — клещи: рядом с горячим (светится оранжевым) — взять; с предметом — положить (стоя) или бросить на 4 м (на ходу).
// Горячее вне горна остывает за 20 секунд; живая вода остужает сразу. Руками горячее не взять — отдёрнешь лапу.
function sayP(text,dur){if(W.zven&&W.zvenAway)W.zven.summonT=Math.max(W.zven.summonT||0,(dur||2.8)+0.8);say('pelageya',text,dur||2.8);tone(1320,0.12,'triangle',0.07);tone(1760,0.16,'sine',0.05,null,0.06);}
// весточка вместо Звенышка: перо Жар-птицы, птичка Сирин или ступа Яги — летит туда, где нужна подсказка
function makeVestZ(kind){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);let link;
  if(kind==='demyan'){const hm=M(0x5a5a66,{emissive:0x302830,emissiveIntensity:0.4});link=new THREE.Group();body.add(link);part(link,new THREE.BoxGeometry(0.26,0.14,0.16),hm,0,0.1,0);part(link,new THREE.CylinderGeometry(0.025,0.025,0.36,6),M(0xa07a4a),0,-0.1,0);}
  else if(kind==='kiki4'){const km=M(0xc8c0a8,{emissive:0x505040,emissiveIntensity:0.4});link=new THREE.Mesh(new THREE.SphereGeometry(0.16,10,8),km);body.add(link);for(let i=0;i<5;i++){const t=part(body,new THREE.ConeGeometry(0.05,0.2,4),km,Math.cos(i*1.3)*0.13,Math.sin(i*1.3)*0.13,0.02);t.rotation.z=i*1.3-Math.PI/2;}part(body,new THREE.CylinderGeometry(0.012,0.012,0.44,4),M(0x9a6a3a),0.12,-0.05,0).rotation.z=0.4;}
  else if(kind==='leshy4'){const lm=M(0xe0ff9a,{emissive:0xb8ff40,emissiveIntensity:1.4});link=new THREE.Mesh(new THREE.SphereGeometry(0.12,10,8),lm);body.add(link);const lf=part(body,new THREE.SphereGeometry(0.12,8,6),M(0x5a9a3a),0.1,0.12,0);lf.scale.set(1.2,0.3,0.7);}
  else if(kind==='sirin'){const pm=M(0x8a7ae0,{emissive:0x4a3aa0,emissiveIntensity:0.6});link=new THREE.Mesh(new THREE.SphereGeometry(0.15,10,8),pm);body.add(link);part(body,new THREE.SphereGeometry(0.08,8,6),M(0xf0d8c0),0,0.14,0.06);
    for(const s of[-1,1]){const w=part(body,new THREE.BoxGeometry(0.22,0.02,0.12),pm,s*0.16,0.02,0);w.rotation.z=-s*0.3;}}
  else if(kind==='yaga3'){const wm=M(0x9a6a3a,{emissive:0x4a2a10,emissiveIntensity:0.4});link=new THREE.Mesh(new THREE.CylinderGeometry(0.14,0.1,0.22,10),wm);body.add(link);part(body,new THREE.CylinderGeometry(0.01,0.01,0.4,4),M(0xc8a860),0.1,0.1,0).rotation.z=0.5;}
  else{link=featherMesh(0.55);link.position.y=-0.14;body.add(link);link.userData.mats.forEach(m=>{m.emissiveIntensity=1.2;});}
  const halo=new THREE.Mesh(new THREE.SphereGeometry(0.42,14,10),MB(kind==='sirin'?0xc0b0ff:kind==='yaga3'?0xffc890:kind==='demyan'?0xffc890:kind==='kiki4'?0xd8e0b0:kind==='leshy4'?0xd8ff8a:0xffb060,{transparent:true,opacity:0.18,depthWrite:false}));g.add(halo);
  const light=new THREE.PointLight(0xffb060,1.0,6,2);g.add(light);
  return {g,body,link,halo,light,pos:g.position,target:new V3(),mode:'lead',ringT:0,vis:true,spin:0,spinRate:1.5,scale:1,vestKind:kind};}
function vestW4(){const v=W.vest;if(v==='zhar')W.noHeatSink=true;if(v==='sirin')W.ladBonus=0.04;}
// звено в подарок: летит герою в лапы; пропуск ролика всё равно отдаёт его (flushGifts в конце сцены)
function giveLink(from,h,y,dur){const it=linkItem(from.x,y,from.z);W.linkTotal--;(W.gifts=W.gifts||[]).push([it,h]);const f=new V3(from.x,y,from.z);
  anim(dur||1.2,k=>{if(it.taken)return;it.base=y;it.pos.lerpVectors(f,h.pos.clone().add(new V3(0,1.2,0)),smooth(k));if(k>=1)takeItem(it,h);});return it;}
function flushGifts(){(W.gifts||[]).forEach(([it,h])=>{if(!it.taken)takeItem(it,h);});W.gifts=[];}
/* ---------- горячие предметы, клещи, горн, гнёзда ---------- */
const HOT_C=new THREE.Color(0xff7a20),COLD_C=new THREE.Color(0x3e3c44);
function hotLook(kind,g){const m=M(0xff7a20,{emissive:0xff4a00,emissiveIntensity:0.8});let r=0.35,hh=0.25;
  if(kind==='slitok'){addMesh(new THREE.BoxGeometry(0.62,0.22,0.3),m,0,0.11,0,g);hh=0.22;}
  else if(kind==='ugol'){for(let i=0;i<3;i++)addMesh(new THREE.DodecahedronGeometry(0.17),m,(i-1)*0.14,0.14+(i%2)*0.08,rand(-0.06,0.06),g);r=0.35;}
  else if(kind==='gvozd'){const c=addMesh(new THREE.CylinderGeometry(0.06,0.04,0.9,6),m,0,0.08,0,g);c.rotation.z=Math.PI/2;addMesh(new THREE.CylinderGeometry(0.14,0.14,0.05,8),m,-0.45,0.08,0,g).rotation.z=Math.PI/2;hh=0.16;}
  else if(kind==='kamen'){addMesh(new THREE.DodecahedronGeometry(0.32),m,0,0.3,0,g);hh=0.6;}
  else if(kind==='doska'){addMesh(new THREE.BoxGeometry(0.5,0.12,2.1),m,0,0.06,0,g);r=0.9;hh=0.12;}
  else if(kind==='korka'){addMesh(new THREE.BoxGeometry(1.2,0.18,2.0),m,0,0.09,0,g);r=0.9;hh=0.18;}
  else if(kind==='uzda'){const t=addMesh(new THREE.TorusGeometry(0.42,0.07,8,24),m,0,0.45,0,g);addMesh(new THREE.BoxGeometry(0.2,0.2,0.2),m,0,0.05,0,g);hh=0.9;}
  else if(kind==='kleshi'){const a=addMesh(new THREE.BoxGeometry(0.08,0.06,0.9),m,-0.05,0.05,0,g);a.rotation.y=0.12;const b=addMesh(new THREE.BoxGeometry(0.08,0.06,0.9),m,0.05,0.05,0,g);b.rotation.y=-0.12;hh=0.1;}
  else if(kind==='kluch'){const rg=addMesh(new THREE.TorusGeometry(0.16,0.05,6,14),m,-0.32,0.1,0,g);rg.rotation.x=Math.PI/2;const sh=addMesh(new THREE.CylinderGeometry(0.045,0.045,0.6,6),m,0.02,0.1,0,g);sh.rotation.z=Math.PI/2;addMesh(new THREE.BoxGeometry(0.1,0.06,0.16),m,0.26,0.1,0.08,g);hh=0.2;}
  else if(kind==='zoloto'){addMesh(new THREE.BoxGeometry(0.6,0.26,0.32),m,0,0.13,0,g);addMesh(new THREE.BoxGeometry(0.46,0.08,0.22),m,0,0.3,0,g);hh=0.34;}
  else addMesh(new THREE.SphereGeometry(0.25,10,8),m,0,0.25,0,g);
  return {m,r,hh};}
function hotItem(kind,x,y,z,o){o=o||{};const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const L=hotLook(kind,g);
  const it={hotItem:true,kind,g,pos:g.position,home:new V3(x,y,z),m:L.m,r:L.r,hh:L.hh,heat:o.cold?0:1,carrier:null,flying:false,socket:null,noCool:!!o.noCool,gold:!!o.gold,coolable:o.coolable!==false,respawn:o.respawn!==false,gone:false,name:o.name||'',onLava:o.onLava||null,face:0};
  W.hots.push(it);heatVis(it);
  W.waterTargets.push({pos:it.pos,active:()=>!it.gone&&!it.carrier&&it.heat>0.05&&it.coolable,onWater:()=>{it.heat=0;heatVis(it);SFX.water();burst(it.pos.clone().add(new V3(0,0.4,0)),0xe8f4ff,12,2);floatText(it.pos.clone().add(new V3(0,0.8,0)),'Пш-ш-ш!','#cfe8ff');if(o.onCool)o.onCool(it);}});
  return it;}
function heatVis(it){if(it.gold){it.m.color.setHex(0xffd23a);it.m.emissive.setHex(0x806010);it.m.emissiveIntensity=0.35+0.15*Math.sin(G.time*4);return;}const k=clamp(it.heat,0,1);it.m.color.lerpColors(COLD_C,HOT_C,k);it.m.emissive.setHex(0xff4a00);it.m.emissiveIntensity=0.05+k*(0.8+0.2*Math.sin(G.time*6));}
function forgeZone(x,y,z,r,on){const f={pos:new V3(x,y,z),r:r||1.4,on:on||null};W.forges.push(f);return f;}
function hotSocket(x,y,z,o){o=o||{};const s={pos:new V3(x,y,z),r:o.r||1.1,accept:o.accept||(()=>true),onPut:o.onPut||null,keep:!!o.keep,item:null,active:o.active||null,name:o.name||''};W.sockets.push(s);return s;}
const heroCarry=h=>h.carry&&!h.carry.gone?h.carry:null;
function carryPoint(h){const f=h.face;return new V3(h.pos.x+Math.sin(f)*(h.d.radius+0.45),h.pos.y+h.d.height*0.55,h.pos.z+Math.cos(f)*(h.d.radius+0.45));}
function pickHot(h,it){if(it.socket){it.socket.item=null;it.socket=null;}it.carrier=h;h.carry=it;SFX.latch();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Взял клещами','#ffb070');if(W.onPick)W.onPick(h,it);}
function dropHot(h,thr){const it=heroCarry(h);if(!it)return;h.carry=null;it.carrier=null;const f=h.face;it.face=f;const from=it.pos.clone(),to=new V3(h.pos.x+Math.sin(f)*0.95,h.pos.y,h.pos.z+Math.cos(f)*0.95);
  // гнездо рядом — кладём туда, даже на ходу
  const sk=W.sockets.find(s=>!s.item&&(!s.active||s.active())&&(hd(s.pos,to)<s.r+0.6||hd(s.pos,h.pos)<s.r+0.9)&&Math.abs(s.pos.y-h.pos.y)<2.4&&s.accept(it));if(sk){to.copy(sk.pos);thr=false;}
  else if(thr){// бросок на 4 м — но не сквозь стену
    const y=h.pos.y+0.5;for(let d=0.25;d<=4.001;d+=0.25){const x=h.pos.x+Math.sin(f)*d,z=h.pos.z+Math.cos(f)*d;if(W.boxes.some(b=>b.on&&!b.pass&&x>b.minx-0.15&&x<b.maxx+0.15&&z>b.minz-0.15&&z<b.maxz+0.15&&b.miny<y+0.8&&b.maxy>y))break;to.set(x,h.pos.y,z);}
    const sk2=W.sockets.find(s=>!s.item&&(!s.active||s.active())&&hd(s.pos,to)<s.r+0.7&&Math.abs(s.pos.y-h.pos.y)<3&&s.accept(it));if(sk2){to.copy(sk2.pos);it.flying=true;SFX.swish();const top2=Math.max(from.y,to.y)+1.4;anim(0.5,k=>{it.pos.set(lerp(from.x,to.x,k),lerp(from.y,to.y,k)+Math.sin(k*Math.PI)*1.4,lerp(from.z,to.z,k));if(k>=1){it.flying=false;landHot(it,sk2);}});return;}}
  it.flying=true;SFX.swish();const top=Math.max(from.y,to.y)+(thr?1.4:0.3);
  anim(thr?0.5:0.22,k=>{it.pos.set(lerp(from.x,to.x,k),lerp(from.y,to.y,k)+(thr?Math.sin(k*Math.PI)*1.4:0),lerp(from.z,to.z,k));it.g.rotation.y+=thr?0.25:0;if(k>=1){it.flying=false;landHot(it,sk);}});}
function landHot(it,sk){if(sk&&!sk.item&&(!sk.active||sk.active())&&sk.accept(it)){it.pos.copy(sk.pos);if(sk.keep){sk.item=it;it.socket=sk;}SFX.plate();burst(sk.pos.clone().add(new V3(0,0.4,0)),0xffb040,10,3);if(sk.onPut)sk.onPut(it,sk);return;}
  const g=groundAt(it.pos.x,it.pos.z,it.pos.y+0.6);if(hotInLava(it,g)){if(it.onLava&&it.onLava(it))return;lostHot(it);return;}it.pos.y=g.y;}
function hotInLava(it,g){if(g.y<(W.fallY||-9)+0.3)return true;const L=lavaAt(it.pos.x,it.pos.z);return !!(L&&g.y<L.y-0.2);}
function lostHot(it){it.gone=true;it.g.visible=false;SFX.splash();burst(it.pos.clone(),0xff6a20,10,3);floatText(it.pos.clone().add(new V3(0,0.6,0)),'В огне утонуло','#ff9a60');
  if(it.respawn)later(1.2,()=>{it.gone=false;it.g.visible=true;it.pos.copy(it.home);it.heat=1;it.carrier=null;heatVis(it);});}
function consumeHot(it){it.gone=true;it.g.visible=false;if(it.carrier){it.carrier.carry=null;it.carrier=null;}if(it.socket){it.socket.item=null;it.socket=null;}
  if(it.respawn)later(1.6,()=>{it.gone=false;it.g.visible=true;it.pos.copy(it.home);it.heat=1;heatVis(it);burst(it.home.clone().add(new V3(0,0.4,0)),0xffb040,8,2);});}
function playTongs(pi){const p=players[pi],h=active(pi);if(p.downed||h.cling)return;
  if(!W.abil.kleshi){if(p.lockedTip<=0){p.lockedTip=4;tip(pi,W.kleshiLocked||'Клещей пока нет — их скуют в кузне.',2.4);}return;}
  if((p.tongCd||0)>0)return;p.tongCd=0.25;h.atkT=Math.max(h.atkT,0.15);
  if(heroCarry(h)){const mv=Math.hypot(h.vel.x,h.vel.z)>1.6;dropHot(h,mv);return;}
  for(const gb of W.grabs){if(!gb.active())continue;const gp=typeof gb.pos==='function'?gb.pos():gb.pos;if(hd(gp,h.pos)<(gb.r||1.6)&&Math.abs(gp.y-h.pos.y)<2){gb.onGrab(h);return;}}
  if(W.crusts.length&&grabCrust(h))return;
  const best=pickCand(h);
  if(!best){floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Клещи — к горячему, живо','#ffb070');return;}
  if(best.heat<=0.03){SFX.miss();floatText(best.pos.clone().add(new V3(0,0.7,0)),'Остыло — в горн опять','#c8c8d0');return;}
  pickHot(h,best);}
// что возьмут клещи: ближайшее — с поправкой на то, куда смотрит герой; над ним — колечко цвета игрока
function pickCand(h){let best=null,bs=99;for(const it of W.hots){if(it.gone||it.carrier||it.flying)continue;const d=hd(it.pos,h.pos);if(d>1.8+it.r*0.4||Math.abs(it.pos.y-h.pos.y)>=1.8)continue;const dot=((it.pos.x-h.pos.x)*Math.sin(h.face)+(it.pos.z-h.pos.z)*Math.cos(h.face))/(d||1);const sc=d*(1.7-dot);if(sc<bs){bs=sc;best=it;}}return best;}
function pickMarks(){if(!W.pickRing){W.pickRing=[0,1].map(pi=>{const m=new THREE.Mesh(new THREE.TorusGeometry(0.42,0.04,6,24),MB(pi?COL.p2:COL.p1,{transparent:true,opacity:0.9,depthTest:false}));m.rotation.x=Math.PI/2;m.renderOrder=5;m.visible=false;W.group.add(m);return m;});}
  for(const pi of[0,1]){const h=active(pi),m=W.pickRing[pi];const c=W.abil.kleshi&&!heroCarry(h)&&!players[pi].downed?pickCand(h):null;m.visible=!!c;if(c){m.position.set(c.pos.x,c.pos.y+c.hh+0.15+pi*0.08,c.pos.z);m.scale.setScalar(Math.max(1,c.r*1.6)*(1+0.08*Math.sin(G.time*6)));}}}
function updateHots(dt){if(W.hots.length)pickMarks();if(!W.hots.length&&!W.sockets.length)return;
  for(const it of W.hots){if(it.gone)continue;
    const inForge=W.forges.some(f=>(!f.on||f.on())&&hd(f.pos,it.pos)<f.r&&Math.abs(f.pos.y-it.pos.y)<2);
    if(inForge)it.heat=Math.min(1,it.heat+dt*1.5);else if(!it.noCool&&!it.socket)it.heat=Math.max(0,it.heat-dt/20);heatVis(it);
    // остывшее вдали от горна само возвращается в горн (чтобы задача не застряла)
    if(it.respawn&&!it.carrier&&!it.socket&&!it.flying&&it.heat<=0&&!inForge){it.coldT=(it.coldT||0)+dt;if(it.coldT>6){it.coldT=0;burst(it.pos.clone().add(new V3(0,0.3,0)),0x8a8a90,6,2);it.pos.copy(it.home);it.heat=1;floatText(it.home.clone().add(new V3(0,0.7,0)),'Снова в горне греется','#ffb070');}}else it.coldT=0;
    if(it.carrier){const h=it.carrier;if(h.active&&players[h.player].downed){h.carry=null;it.carrier=null;continue;}it.pos.copy(carryPoint(h));it.g.rotation.y=h.face;}
    else if(!it.flying&&!it.socket&&!it.fixed){const g=groundAt(it.pos.x,it.pos.z,it.pos.y+0.4);if(hotInLava(it,g)){if(!(it.onLava&&it.onLava(it)))lostHot(it);}else{it.pos.y=damp(it.pos.y,g.y,12,dt);if(g.ref&&g.ref.crust&&g.ref.raft){it.pos.x+=g.ref.raft.x*dt;it.pos.z+=g.ref.raft.z*dt;}}}}
  // без клещей горячее не взять: отдёрнешь лапу
  if(!W.abil.kleshi)for(const pi of[0,1]){const h=active(pi);if((h.burnT||0)>0){h.burnT-=dt;continue;}for(const it of W.hots){if(it.gone||it.heat<0.2)continue;if(hd(it.pos,h.pos)<0.8+h.d.radius&&Math.abs(it.pos.y-h.pos.y)<1.2){h.burnT=1.2;const dx=h.pos.x-it.pos.x,dz=h.pos.z-it.pos.z,d=Math.hypot(dx,dz)||1;h.vel.x=dx/d*4;h.vel.z=dz/d*4;h.vel.y=3;h.grounded=false;h.knockT=0.25;SFX.knock();floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Ай! Горячо!','#ff9a60');break;}}}}
/* ---------- лава: река огня; упавший — к колокольчику (или к страховке) ---------- */
const LAVA_M=M(0xff5a10,{emissive:0xff3000,emissiveIntensity:0.9});LAVA_M.userData.shared=true;
function lavaZone(minx,maxx,minz,maxz,y,o){o=o||{};const m=new THREE.Mesh(new THREE.PlaneGeometry(maxx-minx,maxz-minz,Math.max(2,Math.round((maxx-minx)/2)),Math.max(2,Math.round((maxz-minz)/2))),o.mat||LAVA_M);m.rotation.x=-Math.PI/2;m.position.set((minx+maxx)/2,y,(minz+maxz)/2);m.receiveShadow=false;W.group.add(m);
  const z={minx,maxx,minz,maxz,y,flow:o.flow||null,m,noCrust:!!o.noCrust};W.lavas.push(z);if(!W.waterTargets.some(w=>w.lava))lavaWaterTarget();return z;}
function lavaAt(x,z){for(const L of W.lavas)if(x>L.minx&&x<L.maxx&&z>L.minz&&z<L.maxz)return L;return null;}
// открытая лава: под точкой нет твёрдой земли (корка — не земля)
function lavaOpen(x,z){const L=lavaAt(x,z);if(!L)return null;const g=groundAt(x,z,L.y+3,0);if(g.y>L.y-0.2&&!(g.ref&&g.ref.crust))return null;return {L,crust:g.ref&&g.ref.crust?g.ref:null};}
function overLava(h){const L=lavaAt(h.pos.x,h.pos.z);if(!L||h.pos.y>L.y+7)return false;const g=groundAt(h.pos.x,h.pos.z,h.pos.y+0.1,0);return g.y<L.y+0.3;}
// живая вода по лаве: перед Йошей встаёт корка (на бурлящей струе не встаёт — туда её носят клещами)
// куда смотрит Йоша — то и поливает: цели впереди получают приоритет
function yFacePri(pos){const Y=HERO.yosha,dx=pos.x-Y.pos.x,dz=pos.z-Y.pos.z,d=Math.hypot(dx,dz)||1;return 2*Math.max(0,(dx*Math.sin(Y.face)+dz*Math.cos(Y.face))/d);}
function lavaWaterTarget(){const wt={pos:new V3(),pri:0.9,lava:true,x:0,z:0,L:null,
    active:()=>{const Y=HERO.yosha,f=Y.face;if(Y.groundRef&&Y.groundRef.crust&&Y.groundRef.raft)return false;for(const d of[1.3,1.8,2.3,1.0]){const x=Y.pos.x+Math.sin(f)*d,z=Y.pos.z+Math.cos(f)*d;const o=lavaOpen(x,z);if(!o||o.crust||Math.abs(Y.pos.y-o.L.y)>2.6)continue;
      const yy=Y.pos.y+0.6;if(W.boxes.some(b=>b.on&&b.miny<yy&&b.maxy>yy&&[0.5,1].some(q=>{const px=Y.pos.x+(x-Y.pos.x)*q,pz=Y.pos.z+(z-Y.pos.z)*q;return px>b.minx&&px<b.maxx&&pz>b.minz&&pz<b.maxz;})))continue;if(W.noLavaWater&&W.noLavaWater(x,z))continue;wt.x=x;wt.z=z;wt.L=o.L;wt.pos.set(x,o.L.y,z);return true;}return false;},
    onWater:()=>{const L=wt.L;if(!L)return;if(L.noCrust){SFX.water();burst(new V3(wt.x,L.y+0.4,wt.z),0xe8f4ff,14,3);floatText(new V3(wt.x,L.y+1.2,wt.z),'Бурлит — корка не встанет! Клещами её неси','#ffcfa0');if(W.onNoCrust)W.onNoCrust();return;}
      const Y=HERO.yosha;crustAt(wt.x+Math.sin(Y.face)*0.1,wt.z+Math.cos(Y.face)*0.1,L.y,Y.face);}};
  W.waterTargets.push(wt);return wt;}
// корка: живая вода по лаве — чёрная корка 1,2 × 2 м; держит 8 секунд (мигает последние 3), медленно тонет; горячая — клещи её носят
function crustAt(x,z,y,ang,o){o=o||{};const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ang||0;W.group.add(g);const mat=M(0x2a2226,{emissive:0xff4a00,emissiveIntensity:0.25});
  const slab=addMesh(new THREE.BoxGeometry(1.2,0.22,2.0),mat,0,0.02,0,g);for(let i=0;i<5;i++){const c=addMesh(new THREE.BoxGeometry(rand(0.05,0.1),0.02,rand(0.4,0.9)),MB(0xff7a20),rand(-0.4,0.4),0.14,rand(-0.7,0.7),g);c.rotation.y=rand(-1,1);}
  const c={crust:true,x,z,y,ang:ang||0,ca:Math.cos(ang||0),sa:Math.sin(ang||0),w:1.2,l:2,t:o.t||8,g,mat,raft:null,gone:false,age:0};W.crusts.push(c);if(W.surfs.indexOf(crustSurf)<0)W.surfs.push(crustSurf);
  const L=lavaAt(x,z);if(L&&L.flow){c.raft={x:L.flow.x,z:L.flow.z};c.flowL=L;}
  const cwt={pos:c.g.position,crust:c,pri:0,active:()=>{if(c.gone)return false;if(HERO.yosha.groundRef===c)return false;cwt.pri=yFacePri(c.g.position);return true;},onWater:()=>{c.t=Math.min(c.t+5,13);SFX.water();floatText(new V3(c.x,c.y+0.8,c.z),'+5 секунд','#cfe8ff');}};W.waterTargets.push(cwt);
  SFX.water();burst(new V3(x,y+0.3,z),0x3a3a40,14,3);for(let i=0;i<4;i++)burst(new V3(x+rand(-0.5,0.5),y+0.3,z+rand(-0.8,0.8)),0xe8f4ff,3,2);
  if(W.onCrust)W.onCrust(c);return c;}
function crustSurf(x,z,reach){let best=null;for(const c of W.crusts){if(c.gone)continue;const dx=x-c.x,dz=z-c.z;if(dx*dx+dz*dz>5)continue;const u=dx*c.sa+dz*c.ca,v=dx*c.ca-dz*c.sa;if(Math.abs(u)>c.l/2+0.3||Math.abs(v)>c.w/2+0.18)continue;const y=c.y+0.13;if(y>reach+0.001)continue;if(!best||y>best.y)best={y,ref:c};}return best;}
function sinkCrust(c,quiet){c.gone=true;if(!quiet){SFX.splash();burst(new V3(c.x,c.y+0.2,c.z),0xff6a20,10,3);}anim(0.5,k=>{c.g.position.y=c.y-k*0.6;if(k>=1)W.group.remove(c.g);});}
function updateCrusts(dt){for(const c of W.crusts){if(c.gone)continue;c.t-=dt*(c.raft&&HERO.yosha.groundRef===c?0.5:1);   // свой плот Йоша поливает понемногу — тонет вдвое медленнее
if(c.t<=0){sinkCrust(c);continue;}
    const blink=c.t<3&&Math.sin(G.time*14)>0;c.mat.emissiveIntensity=blink?0.9:0.2+0.1*Math.sin(G.time*3+c.x);c.g.position.y=c.y-(1-Math.min(1,c.t/8))*0.12;
    c.age+=dt;if(c.raft&&(c.age>1.6||HEROES.some(h=>h.groundRef===c))){const dx=c.raft.x*dt,dz=c.raft.z*dt;c.x+=dx;c.z+=dz;c.g.position.x=c.x;c.g.position.z=c.z;for(const h of HEROES)if(h.groundRef===c){h.pos.x+=dx;h.pos.z+=dz;}
      const sp=Math.hypot(c.raft.x,c.raft.z)||1,fx=c.x+c.raft.x/sp*1.05,fz=c.z+c.raft.z/sp*1.05,fo=lavaOpen(fx,fz);if(!fo||lavaAt(c.x,c.z)!==c.flowL){c.raft=null;SFX.plate();}}}
  W.crusts=W.crusts.filter(c=>!c.gone||c.g.parent);}
// корку можно взять клещами — и положить дальше по течению (время начинается снова); брошенная на струю плывёт плотом
// расстояние от героя до края корки (а не до середины): стоя на одной, дотянешься до соседней
function crustDist(c,h){const dx=h.pos.x-c.x,dz=h.pos.z-c.z,u=dx*c.sa+dz*c.ca,v=dx*c.ca-dz*c.sa;return Math.hypot(Math.max(0,Math.abs(u)-c.l/2),Math.max(0,Math.abs(v)-c.w/2));}
function crustNear(h){let best=null,bd=2.0;for(const c of W.crusts){if(c.gone||HEROES.some(q=>q.groundRef===c)||Math.abs(c.y-h.pos.y)>1.6)continue;const d=crustDist(c,h);if(d<bd){bd=d;best=c;}}return best;}
function grabCrust(h){const best=crustNear(h);
  if(!best)return false;best.gone=true;W.group.remove(best.g);for(const q of HEROES)if(q.groundRef===best){q.grounded=false;q.groundRef=null;}
  const it=hotItem('korka',best.x,best.y,best.z,{respawn:false,coolable:false,onLava:(it2)=>{const L=lavaAt(it2.pos.x,it2.pos.z);if(!L)return false;it2.gone=true;W.group.remove(it2.g);crustAt(it2.pos.x,it2.pos.z,L.y,it2.face);return true;}});
  it.noCool=true;pickHot(h,it);return true;}
/* ---------- паровые столбы: горячий камень в жерло — столб выше (лифт), живая вода — ниже (можно пройти) ---------- */
function steamVent(x,z,y,o){o=o||{};const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.9,1.2,0.5,12),M(0x3a3034),0,0.25,0,g);
  const ring=addMesh(new THREE.TorusGeometry(0.7,0.08,6,18),M(0xff6a20,{emissive:0xff4000,emissiveIntensity:0.8}),0,0.5,0,g);ring.rotation.x=Math.PI/2;
  const col=new THREE.Mesh(new THREE.CylinderGeometry(0.8,1.0,1,16,1,true),MB(0xf4eef0,{transparent:true,opacity:0.35,depthWrite:false,side:THREE.DoubleSide}));col.position.y=0.5;g.add(col);
  const v={x,z,y,g,col,ring,mode:'mid',t:0,top:o.top||y+6,r:o.r||1.0,mid:o.mid||3};W.vents.push(v);
  hotSocket(x,y+0.5,z,{r:1.2,accept:it=>it.kind==='kamen'&&!v.fixed,onPut:(it)=>{consumeHot(it);v.mode='high';v.t=14;SFX.whoosh();floatText(new V3(x,y+2,z),'Столб выше!','#f4eef0');}});
  const vwt={pos:new V3(x,y,z),pri:0,active:()=>{if(v.mode==='low'||v.fixed)return false;const fp=yFacePri(vwt.pos);vwt.pri=fp>1?fp+1.5:fp;return true;},onWater:()=>{v.mode='low';v.t=10;SFX.water();floatText(new V3(x,y+1.6,z),'Стих…','#cfe8ff');if(W.onVentCalm)W.onVentCalm(v);}};W.waterTargets.push(vwt);
  return v;}
function updateVents(dt){for(const v of W.vents){if(v.t>0){v.t-=dt;if(v.t<=0)v.mode='mid';}
    const H=v.mode==='high'?v.top-v.y+1:v.mode==='low'?0.6:v.mid;v.col.scale.y=damp(v.col.scale.y,H,4,dt);v.col.position.y=0.5+v.col.scale.y/2;v.col.material.opacity=v.mode==='low'?0.12:0.32+0.08*Math.sin(G.time*8);
    for(const h of HEROES){if(h.cling||h.active&&players[h.player].downed)continue;if(hd(h.pos,v)>v.r+h.d.radius*0.5)continue;const y0=v.y+0.4;
      if(v.mode==='high'){if(h.pos.y<v.top+0.2&&h.pos.y>y0-1){h.vel.y=Math.max(h.vel.y,h.pos.y<v.top-0.6?7:0.6);h.grounded=false;h.groundRef=null;}}
      else if(v.mode==='mid'&&h.pos.y<v.y+v.mid&&h.pos.y>y0-1&&h.active&&!(h.steamT>0)){h.steamT=0.8;const dx=h.pos.x-v.x,dz=h.pos.z-v.z,d=Math.hypot(dx,dz)||1;h.vel.x=dx/d*5;h.vel.z=dz/d*5;h.vel.y=4;h.grounded=false;h.knockT=0.3;SFX.knock();floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Пар!','#f4eef0');}}}
  for(const h of HEROES)if(h.steamT>0)h.steamT-=dt;}
/* ---------- шаг мира 4 ---------- */
function updateW4(dt){if(W.world!==4&&!W.tong5)return;updateHots(dt);updateCrusts(dt);updateVents(dt);
  // шерсть светится от жара у лавы
  for(const h of HEROES){const hot=W.lavas.length&&overLava(h)?1:0;h.heatK=damp(h.heatK||0,hot,3,dt);
    // упал в огонь — как в пропасть: к колокольчику (или к страховке)
    if(W.lavas.length&&!h.cling&&!(h.active&&players[h.player].downed)){const o=lavaOpen(h.pos.x,h.pos.z);if(o&&!o.crust&&h.pos.y<o.L.y-0.2&&!G.cine){burst(h.pos.clone().add(new V3(0,0.3,0)),0xff6a20,12,3);SFX.splash();const it=heroCarry(h);if(it){h.carry=null;it.carrier=null;if(it.kind==='korka'){it.gone=true;W.group.remove(it.g);}else lostHot(it);}onFall(h);}}}}
// визуал героя в Мире 4: клещи в лапах, свечение шерсти от жара
function heroW4(h,dt){const on4=W.world===4||W.tong5;
  if(on4&&!h.tongs&&W.abil.kleshi){const g=new THREE.Group();const m=M(0x3a3a44);for(const s of[-1,1]){const a=part(g,new THREE.BoxGeometry(0.05,0.04,0.55),m,s*0.04,0,0.2);a.rotation.y=-s*0.14;}g.position.set(h.d.radius*0.7,h.d.height*0.5,0.2);h.g.add(g);h.tongs=g;}
  if(h.tongs){h.tongs.visible=on4&&!!W.abil.kleshi&&!(h.active&&players[h.player].downed)&&(W.world!==5||!!heroCarry(h)||(signNear(h)||{}).item==='kleshi');if(h.tongs.visible)h.tongs.rotation.x=heroCarry(h)?-0.3:Math.sin(G.time*2)*0.05;}
  if(on4&&h.heatK>0.05&&Math.random()<h.heatK*0.08)burst(h.pos.clone().add(new V3(rand(-0.3,0.3),h.d.height*rand(0.4,1),rand(-0.3,0.3))),0xff9a40,1,1,0.5);}
/* ---------- мороки Мира 4: чугунный болван, жар-ящерка, змеёныш ---------- */
// «противник подсматривает»: три одинаковые защиты подряд — меняет сигнал (щитовику — красный, кувыркуну — жёлтый)
function peekSig(e,h,s){const L=(players[h.player].defLog||[]).slice(-3);if(L.length<3)return s;
  if(L.every(x=>x==='g')&&e.signals.includes('red')&&s!=='red'){players[h.player].defLog=[];floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+0.9,0)),'Подсмотрел!','#ff9a8a');if(!G.flags.peekTold){G.flags.peekTold=true;tip(h.player,'Враг подглядывает! Не повторяйся — меняй приёмы.',3.4);}return 'red';}
  if(L.every(x=>x==='r')&&e.signals.includes('yellow')&&s!=='yellow'){players[h.player].defLog=[];floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+0.9,0)),'Подсмотрел!','#ff9a8a');return 'yellow';}
  return s;}
// чугунный болван в раскалённых латах: полил — латы темнеют на 10 секунд; клещами сорвать нагрудник — и бить
function bolvanFoe(x,z,o){const e=makeFoe('bolvan',x,z,Object.assign({leash:7},o||{}));e.armor='hot';e.coolT=0;e.pickSig=peekSig;
  e.guardAll=()=>e.armor!=='off'&&e.state!=='broken';e.guardText='латы раскалены — живой водой полей!';e.darkGuard=()=>e.armor!=='off';   // в латах отбив не гасит уголёк
  const bwt={pos:e.pos,pri:0,active:()=>{if(!(e.alive&&e.armor==='hot'))return false;bwt.pri=yFacePri(e.pos)+0.6;return true;},onWater:()=>{e.armor='cool';e.coolT=10;e.guardText='латы остыли — клещами нагрудник сорви!';SFX.water();burst(e.pos.clone().add(new V3(0,1.2,0)),0xe8f4ff,16,3);floatText(e.pos.clone().add(new V3(0,2.4,0)),'Пш-ш-ш! Латы потемнели, остыли','#cfe8ff');}};W.waterTargets.push(bwt);
  W.grabs.push({pos:()=>e.pos,r:2.2,active:()=>e.alive&&e.armor==='cool',onGrab:(h)=>{e.armor='off';e.guardAll=null;SFX.latch();SFX.brk();const pl=e.L.plate;const wp=new V3();pl.getWorldPosition(wp);pl.visible=false;
      const fl=new THREE.Group();W.group.add(fl);addMesh(new THREE.BoxGeometry(1.1,0.9,0.18),M(0x3e3c44),0,0,0,fl);fl.position.copy(wp);const f0=wp.clone(),to=new V3(wp.x+Math.sin(h.face)*-3,0.2,wp.z+Math.cos(h.face)*-3);
      anim(0.7,k=>{fl.position.lerpVectors(f0,to,k);fl.position.y+=Math.sin(k*Math.PI)*1.2;fl.rotation.x+=0.3;});floatText(e.pos.clone().add(new V3(0,2.6,0)),'Нагрудник — долой!','#ffd76a');e.state='stagger';e.t=0;e.openHit=false;if(W.onArmorOff)W.onArmorOff(e,h);}});
  e.tick=(e,dt)=>{if(e.armor==='cool'){e.coolT-=dt;if(e.coolT<=0){e.armor='hot';e.guardText='латы раскалены — живой водой полей!';floatText(e.pos.clone().add(new V3(0,2.4,0)),'Латы опять раскалились!','#ff9a60');}}};
  e.post=(e)=>{const m=e.L.plateM;if(e.armor==='hot'){m.color.setHex(0xff6a20);m.emissive.setHex(0xff3000);m.emissiveIntensity=0.7+0.2*Math.sin(G.time*6);}else{m.color.setHex(0x3e3c44);m.emissiveIntensity=e.coolT<3&&Math.sin(G.time*12)>0?0.5:0;}};
  return e;}
// жар-ящерка на свае: плюёт синими огоньками; отбитый огонёк сбивает её со сваи — в огонь
function lizardFoe(x,z,y,o){const e=makeFoe('lizard',x,z,Object.assign({y,leash:0.5},o||{}));e.noMove=true;e.def=Object.assign({},e.def);
  addMesh(new THREE.CylinderGeometry(0.45,0.55,Math.max(1,y+2),8),M(0x4a3a30),x,y-Math.max(1,y+2)/2,z);
  e.onReflect=()=>{if(!e.alive)return;floatText(e.pos.clone().add(new V3(0,1.6,0)),'Бултых!','#ffb070');SFX.splash();e.alive=false;e.state='dying';e.t=0;const from=e.pos.clone();
    for(let i=0;i<4;i++)spawnSpark(from.clone().add(new V3(0,1,0)),[COL.gold,0x6ad0ff,0xff6a8a][i%3]);burst(from.clone().add(new V3(0,0.6,0)),0xff6a20,16,4);if(W.onLizard)W.onLizard(e);
    anim(0.6,k=>{e.g.position.set(from.x+k*1.2,from.y+Math.sin(k*Math.PI)*1-k*2,from.z);});later(0.62,()=>{W.group.remove(e.g);const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);});};
  e.post=(e)=>{e.L.tail.rotation.y=Math.sin(G.time*5+e.home.x)*0.4;};return e;}
// печник: морок-печка — остывший неуязвим; поднеси клещами горячее (или брось вплотную) — разгорится: дверца настежь, бей, пока горит
function pechnikFoe(x,z,o){o=o||{};const e=makeFoe('pechnik',x,z,Object.assign({leash:8},o));e.fed=0;e.signals=['yellow'];e.spMul=0.8;
  e.guardAll=()=>e.fed<=0&&e.state!=='broken';e.darkGuard=()=>e.fed<=0;e.guardText='остыл — горячим из клещей накорми!';
  const feed=it=>{consumeHot(it);e.fed=o.window||(genPath()==='easy'?6.5:5);e.signals=['red','yellow'];e.spMul=1.3;SFX.plate();burst(e.pos.clone().add(new V3(0,1.2,0)),0xffb040,16,3);
    floatText(e.pos.clone().add(new V3(0,1.9,0)),'Накормили! Горит!','#ffb070');if(W.onPechnik)W.onPechnik(e);};
  e.tick=(e,dt)=>{if(e.state==='spawn'||e.state==='dying')return;
    if(e.fed>0){e.fed-=dt;if(e.state!=='broken')e.open=Math.max(e.open,0.2);if(e.fed<=0){e.signals=['yellow'];e.spMul=0.8;SFX.miss();floatText(e.pos.clone().add(new V3(0,1.9,0)),'Остыл!','#c8c8d0');}return;}
    for(const h of HEROES){const it=heroCarry(h);if(it&&it.heat>0.3&&hd(h.pos,e.pos)<1.8&&Math.abs(h.pos.y-e.pos.y)<1.4){feed(it);return;}}
    for(const it of W.hots){if(it.gone||it.carrier||it.flying||it.socket||it.heat<=0.3)continue;if(hd(it.pos,e.pos)<1.3&&Math.abs(it.pos.y-e.pos.y)<1.4){feed(it);return;}}};
  e.post=e=>{const f=e.fed>0,L=e.L;L.slotM.emissiveIntensity=f?0.9+0.5*Math.sin(G.time*8):0.05+0.05*Math.sin(G.time*2);L.doorM.emissiveIntensity=f?1.0+0.3*Math.sin(G.time*11):0.08;};
  return e;}
// змеёныш: в борозде с лавой сильный и быстрый, на сухой земле ленивый
function snakeFoe(x,z,o){const e=makeFoe('zmeenysh',x,z,Object.assign({leash:9},o||{}));
  e.tick=(e,dt)=>{const hot=!!(W.lavaCell&&W.lavaCell(e.pos.x,e.pos.z));e.hot=hot;e.spMul=hot?1.5:0.45;e.guardAll=hot?(()=>e.state!=='broken'):null;e.darkGuard=hot?(()=>true):null;e.guardText='в лаве змеёныш силён — бороздой лаву уведи!';
    if(!hot&&e.state==='idle')e.cd=Math.max(e.cd,0.8);if(!hot&&e.state!=='broken'&&e.state!=='dying')e.open=Math.max(e.open,0.2);};
  e.post=(e)=>{e.L.segs.forEach((s,i)=>{s.position.x=Math.sin(G.time*(e.hot?9:3)+i*0.8)*0.12;});e.L.mat.emissiveIntensity=e.hot?1.1:0.2;};return e;}

/* ---------- жители и вещи Мира 4: кузнецы, горн, мехи, наковальня, баржа, плуг, ворот, Горыныч ---------- */
// кузнецы Кузьма-старший и Демьян: сначала — каменные истуканы
function makeSmith(kind,stone){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const dem=kind==='demyan';
  const shirt=M(dem?0xb0402a:0x5a6a8a),apron=M(0x6a4020),skin=M(0xe0b890),beardM=M(dem?0xc0602a:0xd8d8d0),hair=M(dem?0xa04a20:0xc8c8c0);const mats=[shirt,apron,skin,beardM,hair];
  const cap=capsule(0.5,0.9,shirt);cap.position.y=1.1;body.add(cap);part(body,new THREE.BoxGeometry(0.8,1.0,0.12),apron,0,0.95,0.46);
  for(const s of[-1,1])part(body,new THREE.CylinderGeometry(0.16,0.16,0.7,8),M(0x3a2a1a),s*0.22,0.3,0);
  const head=new THREE.Group();head.position.y=2.1;body.add(head);part(head,new THREE.SphereGeometry(0.34,12,10),skin,0,0,0);
  const bd=new THREE.ConeGeometry(0.3,0.7,10);bd.rotateX(Math.PI);part(head,bd,beardM,0,-0.38,0.18);part(head,new THREE.SphereGeometry(0.36,12,8,0,Math.PI*2,0,Math.PI*0.45),hair,0,0.06,-0.04);
  for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.04,6,5),MAT.dark,s*0.12,0.05,0.31);part(head,new THREE.SphereGeometry(0.07,8,6),skin,0,-0.04,0.34);
  const arm=new THREE.Group();arm.position.set(0.55,1.65,0.05);body.add(arm);part(arm,new THREE.CylinderGeometry(0.13,0.12,0.8,8),shirt,0,-0.35,0);
  const ham=new THREE.Group();ham.position.set(0,-0.75,0.1);arm.add(ham);part(ham,new THREE.CylinderGeometry(0.04,0.04,0.8,5),M(0x7a5634),0,0,0.3).rotation.x=Math.PI/2;part(ham,new THREE.BoxGeometry(0.3,0.22,0.22),M(0x55555e),0,0,0.7);
  const armL=new THREE.Group();armL.position.set(-0.55,1.65,0.05);body.add(armL);part(armL,new THREE.CylinderGeometry(0.13,0.12,0.8,8),shirt,0,-0.35,0);
  const S={g,body,head,arm,armL,mats,orig:mats.map(m=>m.color.getHex()),stoneK:0,
    setStone(k){S.stoneK=k;mats.forEach((m,i)=>{m.color.lerpColors(new THREE.Color(S.orig[i]),new THREE.Color(0x8a8680),k);});}};
  if(stone)S.setStone(1);return S;}
function makeAnvil(x,z,y,s){const g=new THREE.Group();g.position.set(x,y||0,z);g.scale.setScalar(s||1);W.group.add(g);addMesh(new THREE.BoxGeometry(0.6,0.7,0.6),M(0x5a3a1a),0,0.35,0,g);
  addMesh(new THREE.BoxGeometry(1.1,0.3,0.5),M(0x3a3a44),0,0.85,0,g);const horn=new THREE.ConeGeometry(0.2,0.5,8);horn.rotateZ(Math.PI/2);addMesh(horn,M(0x3a3a44),0.78,0.85,0,g);W.cyls.push({x,z,r:0.55*(s||1),miny:-1,maxy:(y||0)+1.0*(s||1),on:true});return g;}
// горн: каменная печь с углями и мехами; прыжок Пелагеи на рычаг — горн горит ярче
function makeForge(x,z,y,o){o=o||{};const g=new THREE.Group();g.position.set(x,y||0,z);g.rotation.y=o.ry||0;W.group.add(g);const st=M(0x6a5a52);
  addMesh(new THREE.BoxGeometry(2.2,1.1,1.6),st,0,0.55,0,g);addMesh(new THREE.BoxGeometry(0.9,2.6,0.9),st,0,2.4,-0.4,g);
  const coalM=M(0xff6a20,{emissive:0xff3000,emissiveIntensity:0.8});const coals=[];for(let i=0;i<9;i++)coals.push(addMesh(new THREE.DodecahedronGeometry(0.18),coalM,rand(-0.7,0.7),1.18,rand(-0.4,0.5),g));
  const fire=new THREE.PointLight(0xff7a30,1.2,8,2);fire.position.y=1.6;g.add(fire);
  const bel=new THREE.Group();bel.position.set(1.7,0,0.2);g.add(bel);const bag=addMesh(new THREE.BoxGeometry(0.9,0.5,0.9),M(0x8a5a32),0,0.5,0,bel);addMesh(new THREE.BoxGeometry(0.1,0.1,1.1),M(0x5a3a1a),0,0.8,0.4,bel);
  const lever=new THREE.Group();lever.position.set(0,0.9,0.9);bel.add(lever);addMesh(new THREE.BoxGeometry(0.16,0.08,1.4),M(0x5a3a1a),0,0,0.6,lever);
  W.boxes.push(...[]);const F={g,coalM,fire,bag,lever,k:0.4,pos:new V3(x,y||0,z)};return F;}
function makeTrough(x,z,y){const g=new THREE.Group();g.position.set(x,y||0,z);W.group.add(g);addMesh(new THREE.BoxGeometry(1.6,0.6,0.8),M(0x6a4a2a),0,0.3,0,g);
  const w=addMesh(new THREE.BoxGeometry(1.4,0.05,0.6),M(0x5ab0d0,{emissive:0x1a5a70,emissiveIntensity:0.3}),0,0.58,0,g);W.cyls.push({x,z,r:0.7,miny:-1,maxy:(y||0)+0.6,on:true});return {g,w};}
// лубок на стене: Кот Учёный и ученик с молотом — лицо ученика сколото
function lubokTex(){const c=document.createElement('canvas');c.width=512;c.height=256;const x=c.getContext('2d');x.fillStyle='#e8d8b0';x.fillRect(0,0,512,256);x.strokeStyle='#2a1a10';x.lineWidth=6;x.strokeRect(8,8,496,240);
  x.fillStyle='#8e8478';x.beginPath();x.ellipse(150,160,60,70,0,0,Math.PI*2);x.fill();x.beginPath();x.arc(150,80,42,0,Math.PI*2);x.fill();x.fillStyle='#ffc93c';x.beginPath();x.arc(135,76,9,0,Math.PI*2);x.arc(165,76,9,0,Math.PI*2);x.fill();
  x.fillStyle='#5a6a8a';x.fillRect(320,110,70,110);x.fillStyle='#d8c0a0';x.beginPath();x.arc(355,85,32,0,Math.PI*2);x.fill();x.fillStyle='#9a8a78';for(let i=0;i<14;i++){x.beginPath();x.arc(345+Math.random()*24,75+Math.random()*24,4+Math.random()*6,0,Math.PI*2);x.fill();}
  x.strokeStyle='#7a5634';x.lineWidth=8;x.beginPath();x.moveTo(390,140);x.lineTo(440,90);x.stroke();x.fillStyle='#55555e';x.fillRect(425,70,34,24);
  x.fillStyle='#8a1a14';x.font='bold 22px Georgia';x.fillText('Кот Учёный',85,240);x.fillText('ученик',318,240);return new THREE.CanvasTexture(c);}
// огненная баржа с углём для Кузьмы: топка, лямка на четверых
function makeBarge(){const g=new THREE.Group();W.group.add(g);const wood=M(0x6a4428),dk=M(0x3a2414);
  addMesh(new THREE.BoxGeometry(5,1.4,12),wood,0,0.2,0,g);addMesh(new THREE.BoxGeometry(5.2,0.14,12.2),dk,0,0.95,0,g);const bow=new THREE.CylinderGeometry(0.02,2.5,2.4,4,1);bow.rotateX(Math.PI/2);bow.rotateZ(Math.PI/4);bow.scale(1,0.5,1);addMesh(bow,wood,0,0.2,-7.2,g);
  for(let i=0;i<14;i++)addMesh(new THREE.DodecahedronGeometry(rand(0.35,0.6)),M(0x1a1a1e),rand(-1.8,1.8),1.2+rand(0,0.5),rand(-4,2),g);
  const box=addMesh(new THREE.BoxGeometry(1.8,1.4,1.6),M(0x4a4a50),0,1.6,4.2,g);addMesh(new THREE.CylinderGeometry(0.3,0.3,2.2,10),M(0x3a3a40),0.5,3,4.4,g);
  const fireM=M(0x5a2a1a,{emissive:0xff4000,emissiveIntensity:0});const mouth=addMesh(new THREE.BoxGeometry(0.9,0.6,0.1),fireM,0,1.5,3.38,g);const fl=new THREE.PointLight(0xff7a30,0,7,2);fl.position.set(0,2,3);g.add(fl);
  const mast=addMesh(new THREE.CylinderGeometry(0.12,0.14,5,8),dk,0,3.3,-2.4,g);
  return {g,fireM,fl,mouth};}
// плуг Змиевых валов: огромный, железный, с раскалённым лемехом
function makePlow(){const g=new THREE.Group();W.group.add(g);const iron=M(0x4a4850);const shareM=M(0xff6a20,{emissive:0xff3000,emissiveIntensity:0.8});
  addMesh(new THREE.BoxGeometry(0.4,0.4,3.2),iron,0,1.1,0.4,g);for(const s of[-1,1]){const h=addMesh(new THREE.BoxGeometry(0.14,0.14,1.6),iron,s*0.5,1.6,1.8,g);h.rotation.x=-0.5;}
  const sh=addMesh(new THREE.BoxGeometry(1.1,0.9,0.9),shareM,0,0.45,-1.2,g);sh.rotation.x=0.4;addMesh(new THREE.BoxGeometry(0.3,1.2,0.3),iron,0,0.8,-0.6,g);
  const wheel=addMesh(new THREE.TorusGeometry(0.5,0.08,6,16),iron,0.8,0.5,0.8,g);wheel.rotation.y=Math.PI/2;return {g,shareM};}
// ворот с цепью на том берегу
function makeWinch(){const g=new THREE.Group();W.group.add(g);const w=M(0x6a4a2a);for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.2,1.4,0.2),w,s*0.9,0.7,0,g);
  const drum=addMesh(new THREE.CylinderGeometry(0.3,0.3,1.8,12),w,0,1.2,0,g);drum.rotation.z=Math.PI/2;const handle=new THREE.Group();handle.position.set(1.05,1.2,0);g.add(handle);addMesh(new THREE.BoxGeometry(0.1,0.8,0.1),w,0,0.35,0,handle);return {g,drum,handle};}
// Змей Горыныч: туловище, крылья, хвост; три шеи — головы отдельно (мороки)
function makeGorynych(){const g=new THREE.Group();W.group.add(g);const sk=M(0x4a8a3a),belly=M(0xc8b060),dk=M(0x2a5a24);
  const b=addMesh(new THREE.SphereGeometry(2.4,16,12),sk,0,2.6,0,g);b.scale.set(1.2,1,1.4);addMesh(new THREE.SphereGeometry(1.8,14,10),belly,0,2.3,1.6,g).scale.set(1,1,0.6);
  const wings=[];for(const s of[-1,1]){const wp=new THREE.Group();wp.position.set(s*2.4,3.6,0);g.add(wp);const sh=new THREE.Shape();sh.moveTo(0,0);sh.lineTo(s*5,1.5);sh.lineTo(s*4.6,-1.4);sh.lineTo(s*2.6,-0.6);sh.lineTo(s*1.4,-1.8);sh.lineTo(0,-0.6);
    const wm=new THREE.Mesh(new THREE.ShapeGeometry(sh),new THREE.MeshLambertMaterial({color:0x3a6a2e,side:THREE.DoubleSide}));wm.rotation.x=-Math.PI/2;wp.add(wm);wings.push({wp,s});}
  const tail=[];for(let i=0;i<8;i++){const t=addMesh(new THREE.SphereGeometry(0.9-i*0.09,10,8),sk,0,1.2-i*0.1,-3-i*0.9,g);tail.push(t);}
  for(const s of[-1,1])for(const z of[-1.2,1.2])addMesh(new THREE.CylinderGeometry(0.4,0.5,1.4,8),sk,s*1.6,0.7,z,g);
  for(let i=0;i<7;i++)addMesh(new THREE.ConeGeometry(0.25,0.7,4),dk,0,4.8-i*0.1,1-i*0.8,g).rotation.x=-0.3;
  const necks=[];for(const[x,a]of[[-1.6,0.5],[0,0],[1.6,-0.5]]){const n=addMesh(new THREE.CylinderGeometry(0.42,0.6,3.6,10),sk,x+Math.sin(a)*-0.6,4.8,2.2,g);n.rotation.x=0.45;n.rotation.z=a*0.6;necks.push(n);}
  return {g,wings,tail,necks};}

