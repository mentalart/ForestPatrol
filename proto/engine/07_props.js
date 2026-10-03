/* ============================== ПРЕДМЕТЫ: звенья и золотые орешки ============================== */
function linkItem(x,y,z){const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const gm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8});
  const a=new THREE.Mesh(new THREE.TorusGeometry(0.22,0.07,10,24),gm);a.scale.set(1,1.45,1);g.add(a);g.add(new THREE.Mesh(new THREE.SphereGeometry(0.5,12,10),MB(0xffd76a,{transparent:true,opacity:0.15,depthWrite:false})));
  const it={kind:'link',g,pos:g.position,base:y,taken:false};W.items.push(it);W.linkTotal++;return it;}
function nutItem(x,y,z,o){o=o||{};const g=acornMesh(2.2);g.position.set(x,y,z);
  if(G.secrets[W.levelId]){const bm=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.25,14,8,1,true),MB(0xffd76a,{transparent:true,opacity:0.35,depthWrite:false,side:THREE.DoubleSide}));bm.position.y=7;g.add(bm);}   // вышитая карта тайников: над орешком столб света
g.children.forEach(c=>{if(c.material)c.material=M(0xffc93c,{emissive:0xb07a10,emissiveIntensity:0.6});});W.group.add(g);
  const it={kind:'nut',g,pos:g.position,base:y,taken:false,owl:!!o.owl};if(it.owl)g.visible=false;W.items.push(it);W.nutTotal++;return it;}
function takeItem(it,h){if(it.taken)return;it.taken=true;W.group.remove(it.g);burst(it.pos.clone(),COL.gold,12,3);
  if(it.kind==='link'){W.links++;SFX.link();floatText(it.pos.clone().add(new V3(0,0.6,0)),'+звено','#ffe08a');
    if(W.links===W.linkTotal&&W.levelId&&LEVELS[G.levelIdx]&&LEVELS[G.levelIdx].world&&!G.gems[W.levelId])later(0.6,()=>banner('Все звенья уровня собраны!','#9fe0ff',2.4,'самоцветы — для сказок Кота да для Заставы'));}
  else{W.nuts++;SFX.nut();floatText(it.pos.clone().add(new V3(0,0.6,0)),'+орешек','#ffd060');}}
function updateItems(dt){for(const it of W.items){if(it.taken||it.locked)continue;if(it.fz)it.base=Math.max(it.rest,it.fz.level+(it.foff||0.35));it.g.rotation.y+=dt*2;it.pos.y=it.base+Math.sin(G.time*2.5+it.pos.x)*0.12;
    if(it.owl)it.g.visible=W.owlT>0;if(it.owl&&W.owlT<=0)continue;
    for(const h of HEROES){if(h.cling||(h.active&&players[h.player].downed))continue;if(hd(h.pos,it.pos)<1.05&&it.pos.y-h.pos.y<heroHeight(h)+0.9&&it.pos.y-h.pos.y>-0.6){takeItem(it,h);break;}}}}

/* ============================== КОЛЫШКИ, КАМНИ С ЛАПОЙ, КОЧКИ ============================== */
function stake(x,z,y,o){o=o||{};y=y||0;const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const h=o.h||1.0;
  addMesh(new THREE.CylinderGeometry(0.07,0.1,h+0.3,6),M(0x7a5634),0,(h+0.3)/2-0.3,0,g);addMesh(new THREE.ConeGeometry(0.1,0.18,6),M(0x7a5634),0,h+0.09,0,g);
  const rib=M(o.thick?0xc08a48:COL.yellow,{emissive:o.thick?0x402000:0x806000,emissiveIntensity:0.5});const r1=addMesh(new THREE.BoxGeometry(0.05,0.34,0.14),rib,0.07,h-0.12,0,g);r1.rotation.z=0.3;
  const r2=addMesh(new THREE.BoxGeometry(0.05,0.3,0.12),rib,-0.06,h-0.16,0.03,g);r2.rotation.z=-0.4;
  if(o.thick){const pw=pawIcon();pw.scale.setScalar(0.6);pw.position.set(0,h+0.7,0);g.add(pw);}
  const s={x,z,y:y+h-0.1,g,used:null,thickOnly:!!o.thick};W.stakes.push(s);return s;}
function pawStone(x,z,y){y=y||0;const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.95,1.05,0.22,9),MAT.stone,0,0.11,0,g);
  const pw=pawIcon();pw.rotation.x=-Math.PI/2;pw.position.y=0.235;pw.scale.setScalar(1.6);pw.children[0].material=MB(0x4a4640);g.add(pw);   // медвежья лапа на камне
  const ic=pawIcon();ic.position.y=2.3;ic.scale.setScalar(1.1);g.add(ic);
  W.cyls.push({x,z,r:1.0,miny:-2,maxy:y+0.22,on:true});const s={x,y:y+0.22,z,g,icon:ic};W.pawStones.push(s);return s;}
function hummock(x,z,r,top){top=top===undefined?0.3:top;addMesh(new THREE.CylinderGeometry(r*0.9,r,1.2,12),M(0x5d6b34),x,top-0.6,z);
  for(let i=0;i<4;i++)addMesh(new THREE.ConeGeometry(0.1,0.45,4),M(0x7a8a3a),x+rand(-r,r)*0.6,top+0.15,z+rand(-r,r)*0.6);
  W.cyls.push({x,z,r,miny:-3,maxy:top,on:true});W.hummocks.push({x,z,y:top});}
/* ============================== ВЗГЛЯД И ХОДЯЧИЕ ЁЛКИ (1-4) ============================== */
function walker(ax,bx,z,speed,phase,o){o=o||{};const g=new THREE.Group();W.group.add(g);const lm=M(0x3b7a44,{emissive:0x000000}),tm=M(0x6b4a2b);
  addMesh(GEO.trunk,tm,0,0.6,0,g);addMesh(GEO.cone1,lm,0,2.0,0,g);addMesh(GEO.cone2,lm,0,3.1,0,g);
  const em=M(0xfff3a0,{emissive:0xffe070,emissiveIntensity:0.9});for(const s of[-1,1])addMesh(new THREE.SphereGeometry(0.09,8,6),em,s*0.22,1.6,0.72,g);
  const feet=[];for(const s of[-1,1]){const f=addMesh(new THREE.ConeGeometry(0.16,0.5,5),tm,s*0.28,0.2,0,g);f.rotation.x=Math.PI;feet.push(f);}
  const ring=addMesh(new THREE.TorusGeometry(0.34,0.06,6,18),M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8}),0,0.9,0,g);ring.rotation.x=Math.PI/2;ring.visible=false;
  g.scale.setScalar(0.85);const az=o.az!==undefined?o.az:z,bz=o.bz!==undefined?o.bz:z;const col={x:ax,z:az,r:0.85,miny:0,maxy:5,on:true,mover:true,dx:0,dz:0};W.cyls.push(col);
  const m={kind:'walker',ax,az,bx,bz,u:phase,speed,pos:new V3(ax,0,az),g,col,lm,feet,ring,tied:null,frozen:false,trunkR:0.35,tieable:o.tieable||null,silverLock:false};W.movers.push(m);return m;}
function gazeSources(){const out=[];if(!W.gaze)return out;
  for(const h of HEROES){const p=players[h.player];if(h.active&&p.downed)continue;if(!h.active&&h.firefly<=0)continue;if(h.inRing&&h.ringLook===false)continue;
    out.push({x:h.pos.x,z:h.pos.z,fx:Math.sin(h.face),fz:Math.cos(h.face)});}return out;}
function gazeCovers(p,src){for(const s of src){const dx=p.x-s.x,dz=p.z-s.z,d=Math.hypot(dx,dz);if(d>10.6)continue;if(d<1.2)return true;if((dx*s.fx+dz*s.fz)/d>=0.866)return true;}return false;}  // конус 60° и 10 м
function updateMovers(dt){if(!W.movers.length)return;const src=gazeSources();
  for(const m of W.movers){m.frozen=(!m.noGaze&&gazeCovers(m.pos,src))||m.silverLock;const stop=m.frozen||!!m.tied;if(!stop)m.u+=dt*m.speed;
    const k=0.5-0.5*Math.cos(m.u),nx=lerp(m.ax,m.bx,k),nz=lerp(m.az,m.bz,k);const dx=nx-m.pos.x,dz=nz-m.pos.z;m.pos.set(nx,0,nz);
    m.col.x=nx;m.col.z=nz;m.col.dx=dx;m.col.dz=dz;m.g.position.set(nx,0,nz);m.lm.emissive.setHex(m.frozen?0x8fb8ff:0x000000);m.lm.emissiveIntensity=m.frozen?0.35:0;
    if(m.tied&&m.tied.tied!==m){m.tied=null;m.ring.visible=false;}
    const mv=!stop;m.g.rotation.z=mv?Math.sin(G.time*6+m.u)*0.06:0;m.feet.forEach((f,i)=>{f.position.z=mv?Math.sin(G.time*9+i*Math.PI)*0.25:0;});
    if(mv)for(const pi of[0,1]){const h=active(pi);if(h.knockT>0||players[pi].downed||h.cling)continue;const ddx=h.pos.x-nx,ddz=h.pos.z-nz,d=Math.hypot(ddx,ddz);
      if(d<m.col.r+h.d.radius+0.15&&h.pos.y<3){const n=d>0.01?1/d:0;h.vel.x=(d>0.01?ddx*n:0)*6;h.vel.z=(d>0.01?ddz*n:1)*6;h.vel.y=5;h.grounded=false;h.knockT=0.45;
        SFX.knock();shake(pi,0.04,0.2);floatText(h.pos.clone().add(new V3(0,1.8,0)),'Ёлка толкнула!','#bfe8ff');}}}}
/* ============================== ПЕНЬКИ «НА РАЗ-ДВА-ТРИ» ============================== */
const SEG={a:[0,1,1],b:[0.3,0.75,0],c:[0.3,0.25,0],d:[0,0,1],e:[-0.3,0.25,0],f:[-0.3,0.75,0],g:[0,0.5,1]};
const DIG={1:'bc',2:'abged',3:'abgcd',4:'fgbc'};const SEGH=new THREE.BoxGeometry(0.52,0.16,0.16),SEGV=new THREE.BoxGeometry(0.16,0.52,0.16);
function makeDigit(s,mat){const g=new THREE.Group();g.userData.seg={};for(const k in SEG){const[x,y,hz]=SEG[k];const m=new THREE.Mesh(hz?SEGH:SEGV,mat);m.position.set(x*s,(y-0.5)*s,0);m.scale.setScalar(s);g.add(m);g.userData.seg[k]=m;}setDigit(g,0);return g;}
function setDigit(g,n){const on=DIG[n]||'';for(const k in g.userData.seg)g.userData.seg[k].visible=on.indexOf(k)>=0;}
function stumpSeat(x,z){const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);
  addMesh(new THREE.CylinderGeometry(0.78,0.88,0.3,18),M(0x8a5a32),0,0.15,0,g);const tr=addMesh(new THREE.TorusGeometry(0.45,0.03,6,24),M(0xd2a870),0,0.31,0,g);tr.rotation.x=Math.PI/2;
  const pw=pawIcon();pw.rotation.x=-Math.PI/2;pw.position.y=0.32;pw.scale.setScalar(1.2);g.add(pw);
  const ringMat=MB(0xffffff,{transparent:true,opacity:0.85});const ring=addMesh(new THREE.TorusGeometry(0.55,0.08,8,26),ringMat,0,2.3,0,g);ring.castShadow=false;
  const dg=makeDigit(0.9,MB(0xffd23a));dg.position.set(0,3.2,0);g.add(dg);
  W.cyls.push({x,z,r:0.82,miny:-1,maxy:0.3,on:true});const s={x,z,g,ring,ringMat,dg,hero:null};W.stumps.push(s);return s;}
function rztWindow(){return Math.max(players[0].path==='easy'?1.0:0.7,players[1].path==='easy'?1.0:0.7);}   // закон щедрого окна
function updateRZT(dt){const R=W.rzt;if(!R)return;
  const used=new Set();for(const s of W.stumps){s.hero=null;for(const h of HEROES){if(used.has(h)||h.cling)continue;if(hd(h.pos,s)<0.85&&Math.abs(h.pos.y-0.3)<0.35){s.hero=h;used.add(h);h.holding=true;break;}}}
  const all=W.stumps.every(s=>s.hero),win=rztWindow();
  for(const s of W.stumps){s.ring.rotation.x=Math.PI/2;s.ring.rotation.y=Math.sin(G.time*2)*0.4;s.ring.rotation.z+=dt*2.5;s.dg.rotation.y=Math.sin(G.time*1.7+s.x)*0.7;
    const c=s.hero?PCOL[s.hero.player]:0xffffff;s.ringMat.color.setHex(R.state==='count'&&R.t>=2?(Math.sin(G.time*30)>0?0xffffff:COL.gold):c);
    s.ring.scale.setScalar(s.hero&&R.press&&R.press[s.hero.player]!==null?1.5:1);s.ring.visible=s.dg.visible=R.state!=='done';}
  if(R.state==='done')return;
  if(R.state==='wait'){W.stumps.forEach(s=>setDigit(s.dg,0));if(all){R.state='count';R.t=0;R.beat=-1;R.press=[null,null];}}
  else if(R.state==='count'){if(!all){R.state='wait';return;}R.t+=dt;const b=Math.min(2,Math.floor(R.t));
    if(b!==R.beat){R.beat=b;SFX.beat(b);W.stumps.forEach(s=>setDigit(s.dg,b+1));banner(['РАЗ','ДВА','ТРИ!'][b],b===2?'#ffc93c':'#ffffff',0.8,b===2?'Свой приём нажмите разом, вместе!':'');}
    if(R.press[0]!==null&&R.press[1]!==null){R.state='done';SFX.ok();W.stumps.forEach(s=>setDigit(s.dg,0));R.onDone();}
    else if(R.t>2+win)rztFail('Не вместе — ещё разок, дружней!');}
  else if(R.state==='retry'){R.t+=dt;if(R.t>0.9){R.state=all?'count':'wait';R.t=0;R.beat=-1;R.press=[null,null];}}}
function rztPress(pi){const R=W.rzt;if(R.t<2){rztFail('Рано! Жмите на «ТРИ», не раньше');return;}if(R.press[pi]===null){R.press[pi]=R.t;if(G.solo)R.press[1-pi]=R.t;tone(pi?880:660,0.1,'triangle',0.3);}}
function rztFail(msg){const R=W.rzt;R.state='retry';R.t=0;SFX.miss();banner('Ой! Ещё разок, ещё!','#ffd0d0',1,msg);W.stumps.forEach(s=>setDigit(s.dg,0));}

/* ============================== ПЛИТЫ, ВОРОТА, КОЛОКОЛЬЧИКИ ============================== */
function updateWorldObjects(dt){
  for(const p of W.plates){const was=p.pressed;p.pressed=false;for(const h of HEROES){if(h.cling)continue;if(hd(h.pos,p)<p.r&&Math.abs(h.pos.y-p.y-0.14)<0.5){p.pressed=true;h.holding=true;}}
    if(p.pressed!==was)SFX.plate();p.mat.emissiveIntensity=p.pressed?0.5+0.2*Math.sin(G.time*6):0;p.base.position.y=p.pressed?0.03:0.07;p.icon.position.y=2.2+Math.sin(G.time*2.4+p.x)*0.1;if(p.once&&p.pressed)p.done=true;if(p.done){p.mat.emissiveIntensity=0.6;p.base.position.y=0.03;}}
  for(const g of W.gates){const want=g.latched||g.forceOpen||W.plates.some(p=>p.link===g.link&&p.pressed);
    if(!want&&g.open){const inside=HEROES.some(h=>h.pos.x>g.minx-0.5&&h.pos.x<g.maxx+0.5&&Math.abs(h.pos.z-g.z)<0.9);if(inside)continue;}
    g.open=want;if(g.open&&!g.wasOpen)SFX.gate();g.wasOpen=g.open;
    g.g.position.y=damp(g.g.position.y,g.open?g.depth:0,5,dt);g.col.on=g.g.position.y>g.depth*0.55;g.mat.emissiveIntensity=g.open&&!g.latched?0.35:0;
    if(g.open&&!g.latched&&g.latchIf&&g.latchIf()){g.latched=true;SFX.ok();floatText(new V3((g.minx+g.maxx)/2,2.2,g.z),'Проход открыт навек','#ffffff');}}
  for(const b of W.bells){b.swing=Math.max(0,b.swing-dt);b.piv.rotation.z=Math.sin(G.time*14)*0.5*b.swing;
    for(const pi of[0,1]){if(b.act[pi])continue;const h=active(pi);if(hd(h.pos,b)<2.6&&Math.abs(h.pos.y-b.y)<2.5){b.act[pi]=true;const p=players[pi];
      const gy=groundAt(b.x,b.z+1.2,b.y+3).y;if(gy>-50)p.cp.set(b.x,gy,b.z+1.2);else p.cp.set(b.x,b.y,b.z);p.cpBell=b;p.petals=3;SFX.bell();b.swing=1.2;
      b.bm.emissiveIntensity=0.5;b.bm.color.setHex(0xffd060);tip(pi,'Колокольчик! Коль упадёшь — сюда вернёшься, не пропадёшь.',2.4);}}}}

/* ============================== РИСУНОК КНОПКИ НАД ГЕРОЕМ ============================== */
// Каждое действие впервые показывается картинкой кнопки над тем героем, которому оно нужно, когда без него не пройти
function prompt(pi,action,at,cond,note){W.prompts.push({pi,action,at,cond,note});}
const bubEls=[];for(let i=0;i<6;i++){const d=document.createElement('div');d.className='bub';$('bubs').appendChild(d);bubEls.push({el:d,html:null});}
function glyph(pi,a){if(a==='move')return MOVEK(pi);if(a==='label')return '';if(a==='warn')return '<span class="pb B">!</span>';if(a==='jumpHold')return K(pi,'jump')+'<small>держи в полёте</small>';return K(pi,a);}
function updatePrompts(){let n=0;const H=innerHeight;
  if(!G.cine&&!G.trans&&(!G.ui||G.ui==='forge')&&G.state==='play')for(const pr of W.prompts){if(n>=bubEls.length)break;if(!pr.cond())continue;
    const pane=PANES.length>1?PANES[pr.pi]:PANES[0];if(!pane)continue;const q=project(pr.at(),pane);if(q.behind||Math.abs(q.x)>1.05||Math.abs(q.y)>1.05)continue;
    const b=bubEls[n++];const nt=typeof pr.note==='function'?pr.note():pr.note;const html=glyph(pr.pi,pr.action)+(nt?'<small>'+nt+'</small>':'');if(b.html!==html){b.html=html;b.el.innerHTML='<div class="inner">'+html+'</div>';}
    b.el.style.borderColor=PCSS[pr.pi];b.el.style.display='block';b.el.style.transform='translate('+(pane.x+(q.x*0.5+0.5)*pane.w).toFixed(1)+'px,'+((1-(q.y*0.5+0.5))*H).toFixed(1)+'px) translate(-50%,-100%)';}
  for(;n<bubEls.length;n++)bubEls[n].el.style.display='none';}

