// ---- продолжение build5B2 (k5epic, часть 9b): ПОЛЁТЫ ДОМОЙ — ступа Яги (после стадии 4) и Горыныч (после стадии 7) ----
  // Сначала ролик — почему летим (Яга сажает в ступу, Горыныч подставляет спину), потом обучающая катсцена (E.LES.fly_stupa / fly_gor):
  // как рулить, какие буквы ловить, что облетать, кого бить и что делать в конце. Полёт: ведёте ступу / Горыныча стрелками (вдвоём в одну
  // сторону — быстрее); золотая дорожка из букв — лети по ней и лови; чёрные ели / огненные столбы — облетай (красный круг видно заранее);
  // мыши / змеи-коршуны с кольцом твоего цвета — твой удар (летит сам; у Горыныча бьёт твоя голова: левая — Игрок 1, правая — Игрок 2);
  // ворота и пасть Чудо-юда — удар разом (средняя голова); в конце ступы — туча-паутина: удар разом, Яга метёт метлой.
  // Проиграть нельзя: задел — буква выпала. Шкала сверху: от листа до дуба.
  const FL5={on:false,obs:[],dec:[]};E.fly=FL5;
  {const el=document.getElementById('k5fly');if(el)el.style.display='none';}   // уровень перезапущен посреди полёта (прыжок к стадии) — шкала не остаётся
  const flyPis=()=>G.solo?[G.soloPi]:[0,1];
  const flyAx=pi=>{let x=0;if(btn(pi,'right'))x+=1;if(btn(pi,'left'))x-=1;const pa=padAx(pi);if(pa.x)x+=pa.x;return clamp(x,-1,1);};
  const flyCol=pi=>G.solo?0xffd76a:(pi?COL.p2:COL.p1);
  const LETTERS='ЛУКОМОРЬЕДУБЗЕЛЁНЫЙЗЛАТАЯЦЕПЬ';
  const flX=vx=>RIDE_X+(vx-FL5.x);                    // виртуальная x (поперёк полёта) → мировая: мир едет под ступой
  const ribbon=t=>6*Math.sin(t*0.5)+2.2*Math.sin(t*1.25+1);   // золотая дорожка: где будут буквы
  // ---------- шкала пути и счёт букв (без слов) ----------
  function flyHud(on){let el=document.getElementById('k5fly');if(!el){el=document.createElement('div');el.id='k5fly';
      el.style.cssText='position:fixed;left:50%;top:96px;transform:translateX(-50%);z-index:30;pointer-events:none;display:none;align-items:center;gap:10px;padding:8px 16px;border-radius:18px;background:rgba(20,14,30,.55)';document.body.appendChild(el);}
    el.style.display=on?'flex':'none';if(!on)return;
    el.innerHTML=K5PIC.one('book',34)+'<div style="position:relative;width:300px;height:10px;border-radius:6px;background:rgba(255,255,255,.18)"><div id="k5flyBar" style="position:absolute;left:0;top:0;bottom:0;border-radius:6px;background:linear-gradient(90deg,#ffd76a,#fff4c0);width:0"></div>'+
      '<div id="k5flyMv" style="position:absolute;top:-24px;left:0;transform:translateX(-50%)">'+K5PIC.one(FL5.kind==='gor'?'dragon':'stupa',46)+'</div></div>'+K5PIC.one('oak',38)+
      '<span style="display:inline-flex;align-items:center;gap:4px;margin-left:12px;font:800 26px system-ui;color:#ffe9a8;text-shadow:0 2px 3px rgba(0,0,0,.6)">'+K5PIC.one('star',32)+'<b id="k5flyN">0</b></span>';}
  function flyHudTick(){const F=FL5,k=F.ph==='fly'?0.04+0.76*clamp(F.t/F.dur,0,1):F.ph==='final'?0.82+0.1*clamp(F.ft/12,0,1):1;
    const b=document.getElementById('k5flyBar'),m=document.getElementById('k5flyMv'),n=document.getElementById('k5flyN');if(b)b.style.width=(k*100)+'%';if(m)m.style.left=(k*100)+'%';if(n&&n.textContent!==String(F.got))n.textContent=F.got;}
  // ---------- транспорт ----------
  const ST_SEATS=[[-0.8,0,0.5],[0.8,0,0.5],[-0.45,0,1.35],[0.45,0,1.35]];
  function seatW(i){const F=FL5;if(F.kind==='gor'){const g=F.m.g;g.updateMatrixWorld(true);const s=GOR_SEATS[i%4];return new V3(s[0],s[1],s[2]).applyMatrix4(g.matrixWorld);}
    F.v.updateMatrixWorld(true);const s=ST_SEATS[i%4];return new V3(s[0],s[1],s[2]).applyMatrix4(F.v.matrixWorld);}
  // голова Горыныча игрока: в мире Горыныч смотрит в −z, поэтому левая (−x) голова — heads[2]
  const flHead=pi=>FL5.m.heads[pi==null?1:(pi?0:2)];
  const headW=pi=>flHead(pi).g.getWorldPosition(new V3());
  function flyBuild(kind){const F=FL5,v=new THREE.Group();k5Prop(v);v.position.set(RIDE_X,0,0);F.v=v;
    if(kind==='stupa'){const s=makeStupa();W.group.remove(s.g);v.add(s.g);s.g.position.set(0,-1.0,0.6);s.stupa.scale.set(3.4,1.5,3.4);
      s.yaga.g.scale.setScalar(1.45);s.yaga.g.position.set(0,0.95,-1.45);s.yaga.g.rotation.y=Math.PI;s.broom.scale.setScalar(1.8);s.broom.position.set(0.9,1.9,-1.6);F.m=s;
      // метла метёт позади — искристый след
      F.trail=0;}
    else{const g5=makeGorynych5(1);W.group.remove(g5.g);v.add(g5.g);g5.g.scale.setScalar(1.5);g5.g.rotation.y=Math.PI;g5.g.position.set(0,-7.5,0.6);F.m=g5;
      // у голов — кольца хозяев: левая — Игрока 1, правая — Игрока 2, средняя — общая (золото)
      F.halo=[0,1,null].map(pi=>{const h=flHead(pi),r=new THREE.Mesh(new THREE.TorusGeometry(1.05,0.13,8,28),MB(pi==null?0xffd76a:flyCol(pi)));r.rotation.x=Math.PI/2;r.position.y=-0.1;h.g.add(r);r.raycast=()=>{};return r;});}
    K5L.noRay(v);}
  function seatHeroes(){const F=FL5;HEROES.forEach((h,i)=>{if(F.hop&&F.hop[i]!==true)return;h.pos.copy(seatW(i));h.vel.set(0,0,0);h.knockT=Math.max(h.knockT||0,0.08);h.grounded=true;h.face=Math.PI;});}
  // ---------- декор: лес внизу / огненная река ----------
  function flyDecor(kind){const F=FL5;F.dec=[];const add=(m,vx,par)=>{k5Prop(m);K5L.noRay(m);m.userData.vx=vx;m.userData.par=par||1;F.dec.push(m);return m;};
    if(kind==='stupa'){const greens=[M(0x1e4a2e),M(0x2a5a34),M(0x173a26)];for(let i=0;i<70;i++){const m=new THREE.Mesh(new THREE.ConeGeometry(rand(2.2,4.2),rand(6,11),7),greens[i%3]);m.position.set(0,rand(-11,-7),rand(-300,24));add(m,rand(-70,70));}
      const fl=new THREE.Mesh(new THREE.PlaneGeometry(200,420),M(0x10261a));fl.rotation.x=-Math.PI/2;fl.position.set(0,-11.5,-170);add(fl,0,1).userData.stat=true;
      const moon=new THREE.Mesh(new THREE.SphereGeometry(14,20,14),MB(0xfff4d0));moon.position.set(RIDE_X+60,46,-320);k5Prop(moon);K5L.noRay(moon);F.moon=moon;}
    else{const lavaM=(typeof g4Mat==='function')?g4Mat('g4fall',0x8a2004,0xff7a1a,1.25,{side:THREE.DoubleSide}):MB(0xff5a20);const lava=new THREE.Mesh(new THREE.PlaneGeometry(170,560),lavaM);lava.rotation.x=-Math.PI/2;lava.position.set(0,-9,-200);add(lava,0,1).userData.stat=true;
      const rk=[M(0x2a1410),M(0x3a1a12,{emissive:0x401008,emissiveIntensity:0.6})];for(let i=0;i<46;i++){const s=i%2?1:-1;const m=new THREE.Mesh(new THREE.ConeGeometry(rand(3,6),rand(14,28),6),rk[i%2]);m.position.set(0,rand(-8,-3),rand(-300,24));add(m,s*rand(24,48));}}
    F.ground=new THREE.Group();k5Prop(F.ground);F.ground.position.set(RIDE_X,kind==='gor'?-7.5:0,0);
    if(kind==='stupa'){addMesh(new THREE.CylinderGeometry(14,15,1,28),M(0x3a5a2a),0,-0.5,0,F.ground);for(let i=0;i<14;i++){const a=i/14*6.28,r=rand(9,13);addMesh(new THREE.ConeGeometry(rand(1.6,2.4),rand(5,8),7),M(0x1e4a2e),Math.cos(a)*r,3,Math.sin(a)*r,F.ground);}
      for(let i=0;i<6;i++)addMesh(new THREE.SphereGeometry(rand(0.3,0.5),8,6),M(0xd04040),rand(-6,6),0.2,rand(2,7),F.ground);}
    else{addMesh(new THREE.CylinderGeometry(16,18,1.2,24),M(0x3a2a24),0,-0.6,0,F.ground);for(let i=0;i<10;i++){const a=i/10*6.28;addMesh(new THREE.ConeGeometry(rand(1.5,2.6),rand(4,9),6),M(0x2a1410),Math.cos(a)*14,2,Math.sin(a)*14,F.ground);}}
    K5L.noRay(F.ground);}
  function decorTick(dt){const F=FL5;for(const m of F.dec){if(!m.userData.stat){m.position.z+=F.spd*dt;if(m.position.z>30){m.position.z-=330;m.userData.vx=rand(-70,70)*(F.kind==='gor'?0:1)+(F.kind==='gor'?(Math.random()<0.5?-1:1)*rand(24,48):0);}}
      m.position.x=RIDE_X+m.userData.vx-F.x*m.userData.par;}
    if(F.kind==='stupa'&&Math.random()<dt*10)FX.sparkle(new V3(RIDE_X+rand(-14,14),rand(-3,6),rand(-40,-10)),1,0xc8ff8a);
    if(F.kind==='gor'&&Math.random()<dt*14)FX.sparkle(new V3(RIDE_X+rand(-16,16),rand(-8,2),rand(-50,-6)),1,0xffa040);}
  // ---------- то, что летит навстречу ----------
  function obsAdd(o){o.dead=false;o.t=0;o.g.position.set(flX(o.x),o.y||0,o.z);k5Prop(o.g);K5L.noRay(o.g);FL5.obs.push(o);return o;}
  function obsDel(o){if(o.dead)return;o.dead=true;k5Del(o.g);if(o.w)k5Del(o.w);}
  function mkGold(x,z){const g=new THREE.Group();const s=K5L.textSpr(LETTERS[FL5.li++%LETTERS.length],1.5,{w:128,h:128,col:'#ffd76a',glow:'#ffb030',weight:'italic 700 '});g.add(s);
    const r=new THREE.Mesh(new THREE.TorusGeometry(1.0,0.08,6,24),k5Add(0xffd76a,{opacity:0.75}));g.add(r);return obsAdd({kind:'gold',x,y:1.5,z,r:2.1,g,ring:r});}
  function mkTree(x,z){const g=new THREE.Group();const dk=M(0x140c1c,{emissive:0x2a0a3a,emissiveIntensity:0.6});addMesh(new THREE.CylinderGeometry(0.35,0.55,4,6),dk,0,1,0,g);
    for(let i=0;i<4;i++)addMesh(new THREE.ConeGeometry(2.4-i*0.42,3.2,7),dk,0,3+i*2.1,0,g);
    for(let i=0;i<5;i++){const e=addMesh(new THREE.SphereGeometry(0.12,6,5),MB(0xc070ff),rand(-1.6,1.6),rand(3,9),rand(-1.6,1.6),g);e.castShadow=false;}
    const w=new THREE.Mesh(new THREE.RingGeometry(1.8,2.4,36),k5Add(0xff3030,{opacity:0.85}));w.rotation.x=-Math.PI/2;k5Prop(w);K5L.noRay(w);
    return obsAdd({kind:'tree',x,y:-16,z,r:2.2,g,w});}
  function mkPillar(x,z){const g=new THREE.Group();const col=new THREE.Mesh(new THREE.CylinderGeometry(1.5,2.3,30,12,1,true),k5Add(0xff6a18,{opacity:0.85}));col.position.y=15;g.add(col);
    const core=new THREE.Mesh(new THREE.CylinderGeometry(0.8,1.3,30,10,1,true),k5Add(0xffe080,{opacity:0.9}));core.position.y=15;g.add(core);g.userData.col=[col,core];col.visible=core.visible=false;
    const disc=new THREE.Mesh(new THREE.CircleGeometry(2.6,28),k5Add(0xff3010,{opacity:0.7}));disc.rotation.x=-Math.PI/2;disc.position.y=0.15;g.add(disc);g.userData.disc=disc;
    const w=new THREE.Mesh(new THREE.RingGeometry(1.8,2.4,36),k5Add(0xff3030,{opacity:0.85}));w.rotation.x=-Math.PI/2;k5Prop(w);K5L.noRay(w);w.visible=false;
    return obsAdd({kind:'pillar',x,y:-8.8,z,r:2.3,g,w,up:false});}
  // враг: мышь (ступа) / змей-коршун (Горыныч); кольцо цвета хозяина — бьёт только он (в одиночку — ты)
  function mkFoe(owner,side){const F=FL5,g=new THREE.Group();const ink=K5L.INKM;
    if(F.kind==='stupa'){addMesh(new THREE.SphereGeometry(0.55,10,8),ink,0,0,0,g);const wl=[-1,1].map(s=>{const p=new THREE.Group();p.position.x=s*0.45;g.add(p);addMesh(new THREE.BoxGeometry(1.5,0.08,0.7),M(0x1a1020),s*0.75,0,0,p);return p;});g.userData.wings=wl;
      for(const s of[-1,1])for(const e of[0])addMesh(new THREE.ConeGeometry(0.16,0.4,4),ink,s*0.28,0.55,0,g);}
    else{const k=addMesh(new THREE.OctahedronGeometry(1.1,0),ink,0,0,0,g);k.scale.set(1,1.3,0.25);for(let i=0;i<5;i++)addMesh(new THREE.BoxGeometry(0.22,0.22,0.1),M(0x3a1060),0,-1.5-i*0.45,0,g).rotation.z=i*0.5;g.userData.tail=true;}
    for(const s of[-1,1])addMesh(new THREE.SphereGeometry(0.11,6,5),MB(0xff3a3a),s*0.22,0.12,-0.5,g);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.25,0.14,8,28),MB(flyCol(owner)));g.add(ring);ring.raycast=()=>{};g.scale.setScalar(1.5);
    return obsAdd({kind:'foe',x:F.x+side*rand(3,5.5),y:2.6,z:-125,r:1.4,g,owner,side,st:'come',ht:0,ring});}
  function killFoe(o,pi){if(o.dead)return;const p=o.g.position.clone();K5L.ink(p,12);K5L.gold(p,8);k5s('orbHit');FL5.got++;FL5.kills++;obsDel(o);E.log('flyFoe');if(FL5.learnFoe)FL5.learnFoe=FL5.obs.some(x=>!x.dead&&x.kind==='foe'&&x.learn);}
  // ---------- удары ----------
  const ownFoe=pi=>{let b=null,bd=1e9;for(const o of FL5.obs){if(o.dead||(o.kind!=='foe'&&o.kind!=='eye')||o.z<-75)continue;if(!G.solo&&o.owner!==pi)continue;if(o.kind==='eye'&&!o.open)continue;const d=-o.z+(o.st==='dive'?-50:0);if(d<bd){bd=d;b=o;}}return b;};
  const flyBig=()=>{const B=FL5.big;return B&&!B.dead&&B.ready?B:null;};
  function shotFx(from,tgt,col,end){const b=new THREE.Mesh(new THREE.SphereGeometry(FL5.kind==='gor'?0.6:0.42,10,8),k5Add(col,{opacity:0.95}));b.position.copy(from);k5Prop(b);
    const tp=()=>tgt&&tgt.g?tgt.g.position.clone():from.clone().add(new V3(0,0,-40));k5fx(0.32,k=>{b.position.lerpVectors(from,tp(),k);if(Math.random()<0.6)FX.sparkle(b.position.clone(),1,col);},()=>{k5Del(b);if(end)end();});}
  function headFire(pi,tp){if(FL5.kind!=='gor')return;const h=flHead(pi);h.jaw.rotation.x=0.7;later(0.35,()=>{h.jaw.rotation.x=0;});if(tp){h.g.lookAt(tp);h.lookT=0.5;}}
  function flyShoot(pi){const F=FL5,o=ownFoe(pi);const col=F.kind==='gor'?0xff8a2a:flyCol(pi);
    const from=F.kind==='gor'?headW(pi):active(pi).pos.clone().add(new V3(0,1.6,-0.4));headFire(pi,o?o.g.position:null);k5s('whoosh');
    shotFx(from,o,col,()=>{if(!o||o.dead)return;if(o.kind==='eye'){o.hp--;FX.sparks(o.g.position.clone(),10,0xffd060);if(o.hp<=0){o.open=false;eyeShut(o);}}else killFoe(o,pi);});}
  function onAtk(pi){const F=FL5;if(!F.on||G.cine||(F.ph!=='fly'&&F.ph!=='final'))return;F.atk[pi]=G.time;
    if(ownFoe(pi)){flyShoot(pi);return;}
    const B=flyBig();if(B){const both=G.solo||Math.abs(F.atk[0]-F.atk[1])<0.7;if(both){F.atk=[-9,-9];bigHit(B);}return;}
    flyShoot(pi);}
  // ---------- большие цели: туча-паутина (ступа), ворота и Чудо-юдо (Горыныч) ----------
  function mkWeb(){const g=new THREE.Group();for(let i=0;i<14;i++){const a=i/14*6.28,r=rand(2,6);addMesh(new THREE.SphereGeometry(rand(2,3.4),10,8),K5L.INKM,Math.cos(a)*r,Math.sin(a)*r*0.6+3,rand(-1,1),g);}
    for(let i=0;i<8;i++){const l=addMesh(new THREE.BoxGeometry(18,0.12,0.12),MB(0xb070ff),0,3,0.8,g);l.rotation.z=i/8*Math.PI;}
    return obsAdd({kind:'web',x:FL5.x,y:0,z:-140,r:0,g,hp:G.solo?2:3,ready:false});}
  function mkGate(){const g=new THREE.Group();const w=addMesh(new THREE.BoxGeometry(40,9,0.8),K5L.INKM,0,1.5,0,g);w.material=K5L.INKM;
    for(let i=0;i<9;i++)addMesh(new THREE.SphereGeometry(rand(1.2,2),8,6),K5L.INKM,rand(-18,18),rand(-2,6),0.3,g);
    return obsAdd({kind:'gate',x:FL5.x,y:0,z:-150,r:0,g,ready:false,hp:1});}
  function mkSerp(){const F=FL5,g=new THREE.Group();const seg=[];for(let i=0;i<10;i++){const s=addMesh(new THREE.SphereGeometry(2.2-i*0.1,12,10),K5L.INKM,0,-14+i*1.7,i*1.2,g);seg.push(s);}
    const hd=new THREE.Group();hd.position.set(0,4,-0.5);g.add(hd);addMesh(new THREE.SphereGeometry(2.8,16,12),K5L.INKM,0,0,0,hd).scale.set(1.2,0.9,1.1);
    const jaw=new THREE.Group();jaw.position.set(0,-1.2,-1.6);hd.add(jaw);addMesh(new THREE.BoxGeometry(3.2,0.5,2.4),M(0x2a1440),0,0,-0.6,jaw);
    const mouth=new THREE.Mesh(new THREE.SphereGeometry(1.1,12,10),k5Add(0xffd060,{opacity:0}));mouth.position.set(0,-0.8,-2.4);hd.add(mouth);
    g.rotation.y=Math.PI;   // лицом к игрокам: глаза и пасть видны, тело уходит за голову
    const S=obsAdd({kind:'serp',x:F.x,y:0,z:-160,r:0,g,seg,hd,jaw,mouth,ready:false,hp:1,spitT:3});g.scale.setScalar(1.5);
    S.eyes=[0,1].map(i=>{const pi=G.solo?G.soloPi:i;const sx=i?1:-1;const m=new THREE.Mesh(new THREE.SphereGeometry(0.75,12,10),MB(0xffe060));m.position.set(sx*1.5,0.9,-2.3);hd.add(m);
      const r=new THREE.Mesh(new THREE.TorusGeometry(1.1,0.12,8,28),k5Add(flyCol(pi),{opacity:0.95}));r.position.copy(m.position);hd.add(r);
      // глаз — цель «своей» головы (как враг с кольцом)
      const o={kind:'eye',owner:pi,open:true,hp:G.solo?1:2,g:new THREE.Object3D(),m,ring:r,dead:false,z:-160,x:0};FL5.obs.push(o);return o;});
    return S;}
  function eyeShut(o){o.m.scale.set(1,0.15,1);o.ring.visible=false;k5s('crack');FX.sparks(o.m.getWorldPosition(new V3()),14,0xffd060);E.log('flyEye');
    const S=FL5.big;if(S&&S.eyes.every(e=>!e.open)){S.mouthOpen=true;S.jaw.rotation.x=0.6;S.mouth.material.opacity=0.85;S.ready=true;k5s('reveal');}}
  function bigHit(B){const F=FL5;k5s('strike');shakeAll(0.08,0.3);E.log('flyBig');
    if(F.kind==='stupa'){const br=F.m.broom;const r0=br.rotation.z;anim(0.5,k=>{br.rotation.z=r0-Math.sin(k*Math.PI)*1.6;});
      const wv=new THREE.Mesh(new THREE.TorusGeometry(3,0.35,6,32,Math.PI),k5Add(0xffe8a0,{opacity:0.9}));wv.position.set(RIDE_X,2,-2);k5Prop(wv);const z0=-2;
      k5fx(0.5,k=>{wv.position.z=z0+(B.g.position.z-z0)*k;wv.scale.setScalar(1+k*1.5);wv.material.opacity=0.9*(1-k*0.5);},()=>{k5Del(wv);webHurt(B);});}
    else{const from=headW(null),to=B.kind==='serp'?B.mouth.getWorldPosition(new V3()):B.g.position.clone().add(new V3(0,3,0));const h=flHead(null);h.jaw.rotation.x=0.8;h.g.lookAt(to);h.lookT=0.9;later(0.8,()=>{h.jaw.rotation.x=0;});
      for(let i=0;i<7;i++)later(i*0.07,()=>shotFx(from.clone(),{g:{position:to}},i%2?0xffe080:0xff7a20,null));
      later(0.6,()=>{FX.sparks(to,24,0xffa040);k5Flash(to,0xffa040,5,0.4);if(B.kind==='gate'){B.hp=0;gateBurn(B);}else serpBurn(B);});}}
  function webHurt(B){B.hp--;K5L.ink(B.g.position.clone().add(new V3(0,3,0)),20);K5L.gold(B.g.position.clone().add(new V3(0,3,0)),12);B.g.scale.multiplyScalar(0.72);if(B.hp<=0){obsDel(B);FL5.big=null;flyHome();}}
  function gateBurn(B){if(B.dead)return;K5L.ink(B.g.position.clone().add(new V3(0,2,0)),30);K5L.gold(B.g.position.clone().add(new V3(0,3,0)),14);FL5.got+=2;const g=B.g;B.ready=false;
    k5fx(0.6,k=>{g.scale.set(1,1-k,1);g.position.y=-k*4;},()=>obsDel(B));if(FL5.big===B)FL5.big=null;}
  function serpBurn(B){K5L.ink(B.hd.getWorldPosition(new V3()),40);K5L.gold(B.hd.getWorldPosition(new V3()),24);FL5.got+=3;B.ready=false;FL5.big=null;
    for(const e of B.eyes)e.dead=true;const g=B.g;k5fx(1.2,k=>{g.position.y=-k*18;g.rotation.z=k*0.5;},()=>obsDel(B));later(0.6,()=>flyHome());}
  function flBump(o,n){const F=FL5;if(F.bumpCd>G.time)return;F.bumpCd=G.time+0.8;F.got=Math.max(0,F.got-(n||1));shakeAll(0.12,0.4);k5s('stomp');const s=o&&o.x>F.x?-1:1;F.vx+=s*7;F.bank=s*0.35;
    K5L.ink(new V3(RIDE_X,1.5,-1.5),12);E.log('flyBump');}
  // ---------- конец: дуб Лукоморья впереди ----------
  function flyHome(){const F=FL5;if(F.ph==='home')return;F.ph='home';F.ht=0;const g=new THREE.Group();addMesh(new THREE.CylinderGeometry(2.2,3.4,22,12),M(0x6a5a4a),0,-3,0,g);
    for(const [x,y,z,r] of[[0,10,0,8],[-5,7,1,5.5],[5,7.5,-1,5.5],[0,14,-1,5]])addMesh(new THREE.SphereGeometry(r,14,10),M(0x3a7a3a),x,y,z,g);
    for(let i=0;i<14;i++){const a=i*0.9;addMesh(new THREE.TorusGeometry(0.5,0.12,6,12),MB(0xffd76a),Math.cos(a)*3.3,i*0.9-2,Math.sin(a)*3.3,g);}
    g.position.set(RIDE_X,-4,-170);k5Prop(g);K5L.noRay(g);F.oak=g;k5s('reveal');say('zven',F.kind==='gor'?'Вон он, дуб! Домой!':'Лукоморье! Дуб видно!',2.4,true);}
  function flyFinish(){const F=FL5;if(F.fin)return;F.fin=true;banner('Лукоморье!','#ffd76a',2.4,K5PIC.h(['star'],30)+' '+F.got);E.log('flyDone');later(1.8,()=>{const d=F.done;F.done=null;if(d)d();});}
  // ---------- ролики: почему мы летим ----------
  function introStupa(){const F=FL5,R0=RIDE_X;const gp=HEROES.map((h,i)=>new V3(R0-4.2+i*2.8,0,5.2));F.gp=gp;F.hop=HEROES.map(()=>false);F.v.position.y=16;F.m.yaga.g.visible=true;
    HEROES.forEach((h,i)=>{h.pos.copy(gp[i]);h.face=Math.PI;});
    const hopIn=i=>{const h=HEROES[i],f=gp[i].clone();F.hop[i]='air';k5s('step');anim(0.7,k=>{const to=seatW(i);h.pos.lerpVectors(f,to,k);h.pos.y+=Math.sin(k*Math.PI)*3.2;h.vel.set(0,0,0);},()=>{F.hop[i]=true;FX.dust(seatW(i),6,0x9a8a6a,1);});};
    play({dur:9.2,fov:46,camK:2.4,skip:true,k5:{mood:['#ffd9a0',0.1]},
      shots:[SH(0,[R0+8,3.4,10],[R0,1.6,0],{fov:46}),MV(6.2,[R0+8,3.4,10],[R0,1.6,0],[R0,7.2,11.5],[R0,0.6,-24],2.8,{ease:'inOutSine',fov:52})],
      says:[[0.8,2.6,'yaga','Спасли старую! Полезайте в ступу, касатики!'],[3.5,2.6,'yaga','Домчу до Лукоморья, пока Кощей лес не запер!'],[6.4,2.4,'proshka','Полетели-и-и!']],
      events:[{t:0.2,fn:()=>{const y0=F.v.position.y;anim(1.7,k=>{F.v.position.y=y0*(1-CE.outBack(k));});later(1.6,()=>{FX.dust(new V3(R0,0.2,0),24,0x9a8a6a,2);k5s('land');shakeAll(0.06,0.3);});}},
        {t:4.0,fn:()=>hopIn(0)},{t:4.35,fn:()=>hopIn(1)},{t:4.7,fn:()=>hopIn(2)},{t:5.05,fn:()=>hopIn(3)},
        {t:6.2,fn:()=>{k5s('flyUp');const g=F.ground,y0=g.position.y;anim(2.6,k=>{g.position.y=y0-40*k*k;});F.m.broom.rotation.z=-0.6;}}],
      end:()=>{W.anims.length=0;HEROES.forEach((h,i)=>{F.hop[i]=true;});F.ground.visible=false;F.v.position.y=0;F.m.broom.rotation.z=0;E.lesson('fly_stupa',flyGo);}});}
  function introGor(){const F=FL5,R0=RIDE_X;const gp=HEROES.map((h,i)=>new V3(R0-6+i*1.6+(i>1?7.4:0),-7.5,6.5));F.gp=gp;F.hop=HEROES.map(()=>false);
    HEROES.forEach((h,i)=>{h.pos.copy(gp[i]);h.face=Math.PI;});
    const g5=F.m;g5.heads.forEach(h=>{h.g.rotation.y=0;});
    const hopIn=i=>{const h=HEROES[i],f=gp[i].clone();F.hop[i]='air';k5s('step');anim(0.9,k=>{const to=seatW(i);h.pos.lerpVectors(f,to,k);h.pos.y+=Math.sin(k*Math.PI)*4.5;h.vel.set(0,0,0);},()=>{F.hop[i]=true;});};
    play({dur:10.4,fov:46,camK:2.4,skip:true,k5:{mood:['#ffb070',0.12]},
      shots:[SH(0,[R0+12,-2,16],[R0,-1,0],{fov:48}),SH(3.6,[R0+5,1.5,-12],[R0,1.5,-3.5],{fov:44}),MV(7.4,[R0+10,0,14],[R0,-1,0],[R0,9,14],[R0,0.6,-24],3,{ease:'inOutSine',fov:54})],
      says:[[0.6,2.8,null,'<i>Горыныч свободен — и подставил спину: «Садитесь! Домчу!»</i>',true],[3.8,3.2,null,'<i>Левая голова — за Игрока 1, правая — за Игрока 2. Средняя дышит, когда оба — разом!</i>',true],[7.6,2.4,'potap','Держитесь крепче!']],
      events:[{t:0.8,fn:()=>{k5s('whooshBig');}},{t:1.4,fn:()=>hopIn(0)},{t:1.75,fn:()=>hopIn(1)},{t:2.1,fn:()=>hopIn(2)},{t:2.45,fn:()=>hopIn(3)},
        {t:4.0,fn:()=>{const h=flHead(0);h.jaw.rotation.x=0.6;k5Flash(headW(0),flyCol(0),4,0.4);later(0.5,()=>{h.jaw.rotation.x=0;});}},
        {t:4.9,fn:()=>{const h=flHead(1);h.jaw.rotation.x=0.6;k5Flash(headW(1),flyCol(1),4,0.4);later(0.5,()=>{h.jaw.rotation.x=0;});}},
        {t:5.8,fn:()=>{const h=flHead(null);h.jaw.rotation.x=0.8;const p=headW(null);for(let i=0;i<6;i++)later(i*0.08,()=>shotFx(p.clone(),{g:{position:p.clone().add(new V3(0,6,-14))}},0xff8a2a,null));later(0.7,()=>{h.jaw.rotation.x=0;});}},
        {t:7.4,fn:()=>{k5s('flyUp');const g=F.ground,y0=g.position.y;anim(2.8,k=>{g.position.y=y0-40*k*k;});}}],
      end:()=>{W.anims.length=0;HEROES.forEach((h,i)=>{F.hop[i]=true;});F.ground.visible=false;E.lesson('fly_gor',flyGo);}});}
  // ---------- взлёт: сразу в полёт (правила — в обучающей катсцене перед ним) ----------
  function flyGo(){const F=FL5;F.ph='fly';F.t=0;W.camFn=()=>flyCam();flyHud(true);for(let i=0;i<6;i++){mkGold(-6+(i%2)*12,-60-i*10);}}
  function flyCam(){const F=FL5,gor=F.kind==='gor';return {pos:new V3(RIDE_X+F.vx*0.12,gor?9.5:7.4,gor?15:11.5),look:new V3(RIDE_X+F.vx*0.08,0.6,-24),k:3};}
  // ---------- запуск / конец ----------
  function flyStart(kind,done){const F=FL5;flyEndClean();Object.assign(F,{on:true,kind,done,ph:'intro',t:0,ft:0,dur:G.solo?26:28,x:0,vx:0,bank:0,got:0,kills:0,obs:[],atk:[-9,-9],li:0,fo:0,
      sg:0,sf:2.5,so:2,sb:0,gates:0,big:null,fin:false,hop:null,learnFoe:false,bumpCd:0,spd:kind==='gor'?26:24,oak:null});
    K5L.theme(kind==='gor'?'smorodina':'forest',1);W.clampR={x:RIDE_X,z:0,r:4};W.fallY=-999;W.camX=4000;
    for(const pi of[0,1]){players[pi].downed=false;players[pi].petals=Math.max(2,players[pi].petals);}
    // небо полёта: туман дальше (лес и река видны), океан Лукоморья (следует за камерой) — спрятать
    F.fog0=scene.fog?[scene.fog.near,scene.fog.far]:null;if(scene.fog){scene.fog.near=kind==='gor'?34:30;scene.fog.far=kind==='gor'?170:160;}F.ocean=(typeof ATMO!=='undefined'&&ATMO.ocean)?ATMO.ocean:null;if(F.ocean)F.ocean.visible=false;
    flyBuild(kind);flyDecor(kind);flyHud(false);snapCams();(kind==='gor'?introGor:introStupa)();E.log('fly_'+kind);}
  function flyEndClean(){const F=FL5;for(const o of F.obs||[])if(!o.dead&&o.g){o.dead=true;k5Del(o.g);if(o.w)k5Del(o.w);}F.obs=[];for(const m of F.dec||[])k5Del(m);F.dec=[];
    for(const k of['v','ground','moon','oak'])if(F[k]){k5Del(F[k]);F[k]=null;}}
  function flyEnd(){const F=FL5;F.on=false;flyEndClean();if(F.fog0&&scene.fog){scene.fog.near=F.fog0[0];scene.fog.far=F.fog0[1];}F.fog0=null;if(F.ocean){F.ocean.visible=true;F.ocean=null;}flyHud(false);W.camFn=null;if(RIDE.g)RIDE.g.visible=false;W.fallY=-12;}
  E.fly.start=flyStart;E.fly.end=flyEnd;
  {const _rs=rideStart,_re=rideEnd;rideStart=function(kind,done){if(kind==='stupa'||kind==='gor')return flyStart(kind,done);return _rs(kind,done);};
    rideEnd=function(){if(FL5.on)return flyEnd();return _re();};}
  // ---------- шаг ----------
  W.updates.push(dt=>{const F=FL5;if(!F.on)return;
    if(F.ph==='intro'){HEROES.forEach((h,i)=>{if(F.hop&&F.hop[i]===false){h.pos.copy(F.gp[i]);h.vel.set(0,0,0);h.knockT=Math.max(h.knockT||0,0.08);h.grounded=true;}});seatHeroes();
      if(F.kind==='gor'){F.m.wings.forEach(w=>{w.wp.rotation.z=Math.sin(G.time*2)*0.2*w.s;});}return;}
    if(G.cine||G.state!=='play'){seatHeroes();return;}
    const pis=flyPis();
    // руль: среднее направление; вдвоём в одну сторону — разгон с искрами
    let ax=0;const axs=pis.map(pi=>flyAx(pi));ax=axs.reduce((a,b)=>a+b,0)/axs.length;const sync=!G.solo&&axs.length===2&&Math.sign(axs[0])===Math.sign(axs[1])&&Math.abs(axs[0])>0.4&&Math.abs(axs[1])>0.4;
    const tv=ax*(sync?11.5:8.5);F.vx+=(tv-F.vx)*Math.min(1,dt*5);F.x=clamp(F.x+F.vx*dt,-11,11);if(Math.abs(F.x)>=11)F.vx*=0.5;
    if(sync&&Math.random()<dt*20)FX.sparkle(new V3(RIDE_X+rand(-2,2),rand(0,2),rand(0,2)),1,0xfff4c0);
    F.bank+=(-F.vx*0.035-F.bank)*Math.min(1,dt*4);F.v.rotation.z=F.bank;F.v.position.y=Math.sin(G.time*1.7)*0.22;F.v.rotation.x=Math.sin(G.time*1.1)*0.03;
    if(F.kind==='gor'){F.m.wings.forEach(w=>{w.wp.rotation.z=Math.sin(G.time*3.4)*0.55*w.s;});F.m.heads.forEach((h,i)=>{if(h.lookT>0){h.lookT-=dt;if(h.lookT<=0)h.g.rotation.set(0,0,0);}else{h.g.rotation.y=Math.sin(G.time*1.3+i)*0.15;h.g.rotation.x=Math.sin(G.time*1.7+i*2)*0.08;}});
      if(F.m.tail)F.m.tail.forEach((t,i)=>{t.position.x=Math.sin(G.time*3-i*0.6)*0.25*i;});}
    else{F.m.broom.rotation.x=Math.sin(G.time*5)*0.25;if(Math.random()<dt*24)FX.sparkle(new V3(RIDE_X+rand(-1.4,1.4),rand(-1,0.5),rand(1.5,3.5)),1,0xfff0a0);}
    seatHeroes();decorTick(dt);flyHudTick();
    for(const pi of pis)if(tap(pi,'attack')||tap(pi,'item'))onAtk(pi);
    if(F.ph==='fly'){F.t+=dt*(F.learnFoe?0.35:1);spawnTick(dt);if(F.t>=F.dur&&!F.obs.some(o=>!o.dead&&o.kind==='gate')){F.ph='final';F.ft=0;F.big=F.kind==='gor'?mkSerp():mkWeb();E.log('flyFinal');}}
    else if(F.ph==='final'){F.ft+=dt;const B=F.big;if(B&&!B.dead){
        // большая цель подлетает и ждёт впереди; через 14–18 с Яга / Горыныч справятся и сами
        const hold=B.kind==='serp'?-24:-20;if(B.g.position.z<hold){B.g.position.z=Math.min(hold,B.g.position.z+22*dt);B.z=B.g.position.z;}else{B.ready=B.kind==='web'?true:B.ready;}
        B.x+=(F.x-B.x)*Math.min(1,dt*1.2);B.g.position.x=flX(B.x);B.g.position.y=Math.sin(G.time*1.2)*0.6;
        if(B.kind==='serp'){B.hd.rotation.y=Math.sin(G.time*0.9)*0.25;B.seg.forEach((s,i)=>{s.position.x=Math.sin(G.time*2-i*0.5)*0.8;});
          for(const e of B.eyes){e.g.position.copy(e.m.getWorldPosition(new V3()));e.z=B.g.position.z;}
          if(B.g.position.z>=hold-0.5){B.spitT-=dt;if(B.spitT<=0){B.spitT=G.solo?3.4:2.8;spit(B);}}}
        if(F.ft>(B.kind==='serp'?20:15)&&!B.auto){B.auto=true;E.log('flyAuto');if(B.kind==='serp'){for(const e of B.eyes)if(e.open){e.open=false;eyeShut(e);}}const go=()=>{if(B.dead||F.big!==B)return;bigHit(B);later(1.4,go);};go();}}
      F.spd+=((F.big?6:F.kind==='gor'?26:24)-F.spd)*Math.min(1,dt*1.5);}
    else if(F.ph==='home'){F.ht+=dt;F.spd+=(30-F.spd)*Math.min(1,dt);if(F.oak){F.oak.position.z+=F.spd*0.5*dt;F.oak.position.x=flX(0);}F.x+=(0-F.x)*Math.min(1,dt*1.5);if(F.ht>3.2)flyFinish();}
    // всё летящее
    for(const o of F.obs){if(o.dead)continue;o.t+=dt;
      if(o.kind==='gold'){o.z+=F.spd*dt;o.g.position.set(flX(o.x),1.5+Math.sin(G.time*3+o.x)*0.2,o.z);o.ring.rotation.z+=dt*2;
        if(o.z>-0.6&&!o.passed){o.passed=true;if(Math.abs(o.x-F.x)<o.r){F.got++;K5L.gold(o.g.position.clone(),8);k5s('tink');obsDel(o);continue;}}if(o.z>14)obsDel(o);}
      else if(o.kind==='tree'||o.kind==='pillar'){o.z+=F.spd*dt;const px=flX(o.x);
        if(o.kind==='tree'){const k=clamp((o.z+105)/45,0,1);o.g.position.set(px,-16+13.5*(k*k*(3-2*k)),o.z);o.w.position.set(px,0.15,o.z);o.w.material.opacity=0.45+0.4*Math.sin(G.time*10);}
        else{o.g.position.set(px,-8.8,o.z);o.g.userData.disc.material.opacity=0.45+0.35*Math.sin(G.time*(o.z>-80?14:6));if(!o.up&&o.z>-62){o.up=true;o.g.userData.col.forEach(c=>{c.visible=true;c.scale.y=0.01;});k5s('quake');}
          if(o.up){o.g.userData.col.forEach((c,i)=>{c.scale.y=Math.min(1,c.scale.y+dt*3);c.position.y=15*c.scale.y;c.material.opacity=0.7+0.25*Math.sin(G.time*20+i);});o.w.visible=true;o.w.position.set(px,0.15,o.z);o.w.material.opacity=0.45+0.4*Math.sin(G.time*10);if(Math.random()<dt*20)FX.sparks(new V3(px,rand(-4,6),o.z),1,0xffa040);}}
        if(o.z>-0.8&&!o.passed){o.passed=true;if(Math.abs(o.x-F.x)<o.r)flBump(o,1);}if(o.z>16)obsDel(o);}
      else if(o.kind==='foe'){if(o.g.userData.wings)o.g.userData.wings.forEach((w,j)=>{w.rotation.z=Math.sin(G.time*16)*0.7*(j?1:-1);});o.ring.rotation.z+=dt*3;
        if(o.st==='come'){o.z+=F.spd*1.2*dt;if(o.z>=-11){o.st='hover';o.ht=0;}}
        else if(o.st==='hover'){o.ht+=dt*(o.learn?0.15:1);o.x+=((F.x+o.side*3.6)-o.x)*Math.min(1,dt*2);o.z=-11+Math.sin(o.ht*2)*0.6;if(o.ht>(G.solo?5.5:4.5)){o.st='dive';o.dt0=0;o.f=o.g.position.clone();}}
        else if(o.st==='dive'){o.dt0+=dt;const k=Math.min(1,o.dt0/0.7);o.z=-11+11*k;o.x+=(F.x-o.x)*Math.min(1,dt*6);if(k>=1){flBump(o,1);obsDel(o);continue;}}
        o.g.position.set(flX(o.x),o.y+Math.sin(G.time*4+o.side)*0.3,o.z);o.g.rotation.y=Math.PI;}
      else if(o.kind==='gate'){o.z+=F.spd*0.55*dt;o.x=F.x;o.g.position.set(flX(o.x),0,o.z);o.ready=o.z>-55;if(o.z>-3){flBump(o,2);gateBurn(o);if(F.big===o)F.big=null;}}}
    F.obs=F.obs.filter(o=>!o.dead);
    if(F.ph==='fly'&&!F.big){const gt=F.obs.find(o=>o.kind==='gate'&&!o.dead);if(gt)F.big=gt;}});
  // плевок Чудо-юда: красный круг на пути — уведи Горыныча
  function spit(B){const F=FL5,tx=F.x+rand(-2.5,2.5);const w=new THREE.Mesh(new THREE.RingGeometry(1.6,2.3,36),k5Add(0xff3030,{opacity:0.9}));w.rotation.x=-Math.PI/2;k5Prop(w);K5L.noRay(w);
    const b=new THREE.Mesh(new THREE.SphereGeometry(0.9,10,8),K5L.INKM);k5Prop(b);const from=B.mouth.getWorldPosition(new V3());k5s('raven');
    k5fx(1.3,k=>{w.position.set(flX(tx),0.2,-1.2);w.material.opacity=0.5+0.4*Math.sin(G.time*14);const to=new V3(flX(tx),1.2,-1.2);b.position.lerpVectors(from,to,k);b.position.y+=Math.sin(k*Math.PI)*5;},
      ()=>{k5Del(w);k5Del(b);K5L.ink(new V3(flX(tx),1.2,-1.2),10);if(Math.abs(F.x-tx)<2.1)flBump({x:tx},1);});}
  // расписание: дорожка букв; препятствия — в стороне от дорожки (держись букв — цел); враги — по очереди каждому игроку
  function spawnTick(dt){const F=FL5,t=F.t,gor=F.kind==='gor';
    F.sg-=dt;if(F.sg<=0){F.sg=0.5;mkGold(ribbon(t+5),-125);}
    F.sf-=dt;if(F.sf<=0&&t>(gor?2:6)){F.sf=(t<14?2.2:1.6)*(G.solo?1.2:1);const rx=ribbon(t+5),s=Math.random()<0.5?-1:1;const x=clamp(rx+s*rand(4.6,6.5),-12,12);(gor?mkPillar:mkTree)(x,-125);
      if(t>12&&Math.abs(F.x-rx)>4&&Math.random()<0.5)(gor?mkPillar:mkTree)(clamp(F.x,-11,11),-125);}
    F.so-=dt;if(F.so<=0&&t>(gor?4:5)){const first=!F.firstFoe;F.firstFoe=true;F.so=(t<16?4:3)*(G.solo?1.25:1);
      if(first){for(const pi of flyPis()){const o=mkFoe(pi,G.solo?-1:(pi?1:-1));o.learn=true;}if(G.solo){}F.learnFoe=true;}
      else{const pi=G.solo?G.soloPi:(F.fo++%2);mkFoe(pi,G.solo?(F.fo++%2?1:-1):(pi?1:-1));}}
    if(gor&&((F.gates===0&&t>11)||(F.gates===1&&t>20))){F.gates++;mkGate();}}
  // для ботов
  E.fly.bot={foes:()=>FL5.obs.filter(o=>!o.dead&&o.kind==='foe'),gold:(x,z)=>mkGold(x,z),tree:(x,z)=>(FL5.kind==='gor'?mkPillar:mkTree)(x,z),foe:(pi,s)=>mkFoe(pi,s),shoot:pi=>onAtk(pi),
    big:()=>FL5.big,eyes:()=>FL5.big&&FL5.big.eyes,gate:()=>{FL5.gates=9;return mkGate();}};
