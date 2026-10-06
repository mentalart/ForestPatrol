// ---- продолжение build5B2 (k5epic, часть 12): СТРАНИЦА 3 «В ТЕМНИЦЕ ТАМ ЦАРЕВНА ТУЖИТ» (стадия 6, мир 3, свет) ----
  // Небесная темница: облачные острова над морем облаков в сумерках, рвущиеся облака кругом, звёзды. Посередине — островок с
  // золотой клеткой Жар-птицы; к нему ведут мостики света (мира 3): твёрдые, только пока рядом свет. Сирин (синий свет печали)
  // и Алконост (золотой свет радости) — на западном и восточном крыле; Соловей прикован на северном острове, на клюве — чёрное
  // кольцо; Кощей на грозовой туче шарит фонарём. Свист Соловья — видимый звук 3-Б, цвет — язык игры: синий — за щит Потапа (или за
  // облачный камень), фиолетовый — гасит свет, белый — прыжок.
  // 1 «Два света»: свет у птиц (несущий медленнее, фонарь ищет его; высветил — Соловей свистит); замки клетки — разом, каждый своим
  //   светом (одному — оба замка подряд любым светом). Свет — другу: предмет рядом.
  // 2 «Ночь»: Кощей наводит ночь; тени крадутся к несущим свет и крадут его (бей тень в свете — свет вернётся); клетка крутится,
  //   вторые замки — сзади и выше; свист гасит свет.
  // 3 «Клюв»: Жар-птица свободна — рассвет, мостики горят сами. Кощей заставляет Соловья дуть без продыху: ветер сносит с облаков,
  //   укрытия — облачные камни и щит Потапа; порывы — прыжок; молнии Кощея в красные круги. У Соловья — удар по кольцу на клюве
  //   разом, дважды: кольцо лопнуло — Соловей свистит в Кощея, туча рвётся.
  // Атлас: scanning beam + target-lock, shockwave/knockback (цвета 3-Б), conditional platforms (свет), summon + steal (тени),
  // rotating target (клетка), environment (ночь), wind push + cover, marked-area-strike (молнии), co-op sync, weak-point. Бот — tk5e_p3.
  {const X=700;const A={theme:'heaven',face:Math.PI,clamp:{x:X,z:0,r:12.5},fallY:-14};AR[3]=A;
    A.spawn=i=>new V3(X-1.5+i*3,0,9.2);
    const CAGE=new V3(X,0,-1.3),SOL=new V3(X,0,-10.9),KZ=new V3(X+5.2,8.4,-11.4),BIRD=[new V3(X-10.2,0,1.2),new V3(X+10.2,0,1.2)],LCOL=[0x6a8aff,0xffc840],LR=4.6;
    const STONES=[[X-10.4,-6.4],[X+10.4,-6.4],[X-5,-10.6],[X+5,-10.6],[X-1.9,-3.7],[X+1.9,-3.7]].map(([x,z])=>new V3(x,0,z));
    const hexS=c=>'#'+c.toString(16).padStart(6,'0');let tiles=[];
    A.g=E.capture(()=>{
      // облачные острова: юг, два крыла, север; посередине островок клетки; между ними — пропасть
      const top=M(0xece8ff),side=M(0xb8b0e8);
      cloudIsle(X-12.5,X+12.5,6,12.6,0,{topMat:top,sideMat:side});cloudIsle(X-12.6,X-8,-9.4,6,0,{topMat:top,sideMat:side});cloudIsle(X+8,X+12.6,-9.4,6,0,{topMat:top,sideMat:side});
      cloudIsle(X-12.5,X+12.5,-12.6,-9.4,0,{topMat:top,sideMat:side});cloudIsle(X-2.8,X+2.8,-4.2,1.6,0,{topMat:M(0xfff4d8),sideMat:side});
      // море облаков внизу, дальние облачные горы, закатное солнце, звёзды
      W.puffs=W.puffs||[];for(let i=0;i<90;i++){const a=rand(0,6.28),r=rand(17,70);W.puffs.push({x:X+Math.cos(a)*r,y:rand(-18,-6),z:Math.sin(a)*r,s:rand(3,7),far:true});}
      for(let i=0;i<16;i++)W.puffs.push({x:X+rand(-90,90),y:rand(-6,10),z:-rand(60,100),s:rand(7,13),far:true});flushPuffs();
      {const s=new THREE.Mesh(new THREE.CircleGeometry(10,32),MB(0xff9a60,{fog:false,transparent:true,opacity:0.85}));s.position.set(X+55,5,-170);s.lookAt(X,0,0);W.group.add(s);
        const n=360,pos=new Float32Array(n*3);for(let i=0;i<n;i++){const a=rand(0,6.28),e=rand(0.15,1.3),r=200;pos[i*3]=X+Math.cos(a)*Math.cos(e)*r;pos[i*3+1]=Math.sin(e)*r;pos[i*3+2]=Math.sin(a)*Math.cos(e)*r;}
        const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.BufferAttribute(pos,3));W.group.add(new THREE.Points(gg,new THREE.PointsMaterial({color:0xfff8e0,size:1.6,sizeAttenuation:false,fog:false,transparent:true,opacity:0.5})));}
      // мостики света к островку клетки
      tiles=[].concat(mostki('light',[[X,0,6],[X,0,1.6]],{w:1.7}),mostki('light',[[X-8,0,-1.3],[X-2.8,0,-1.3]],{w:1.7}),mostki('light',[[X+8,0,-1.3],[X+2.8,0,-1.3]],{w:1.7}),mostki('light',[[X,0,-4.2],[X,0,-9.4]],{w:1.7}));
      // облачные камни — укрытия от свиста и ветра
      for(const s of STONES){const g=new THREE.Group();g.position.copy(s);W.group.add(g);const m=M(0xd8d0f4,{emissive:0x403a70,emissiveIntensity:0.2});
        for(const[dx,dy,dz,r]of[[0,0.9,0,1.05],[0.35,1.8,0.1,0.75],[-0.3,1.6,-0.2,0.7],[0.05,2.4,0,0.5]])addMesh(PUFF_GEO,m,dx,dy,dz,g).scale.setScalar(r);
        W.cyls.push({x:s.x,z:s.z,r:1.05,miny:-1,maxy:2.6,on:true});}
      // насесты птиц и Соловья
      for(const p of BIRD){addMesh(new THREE.CylinderGeometry(0.9,1.25,1.0,12),M(0xfff4e0),p.x,0.5,p.z);addMesh(new THREE.TorusGeometry(1.0,0.08,6,24),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),p.x,1.0,p.z).rotation.x=Math.PI/2;}
      addMesh(new THREE.CylinderGeometry(1.3,1.6,0.6,14),M(0xfff4e0),SOL.x,0.3,SOL.z);for(const s of[-1,1])addMesh(new THREE.CylinderGeometry(0.22,0.28,2.2,8),M(0x2a2430),SOL.x+s*2.3,1.1,SOL.z-0.4);
      addMesh(new THREE.CylinderGeometry(1.7,1.9,0.3,18),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.45}),CAGE.x,0.15,CAGE.z);
      // тёмные шпили темницы по краю
      for(let i=0;i<14;i++){const a=i/14*Math.PI*2+0.2,r=14.2,x=X+Math.cos(a)*r,z=Math.sin(a)*r;if(Math.sin(a)>0.6)continue;const h=rand(5,9);
        addMesh(new THREE.CylinderGeometry(0.12,0.3,h,6),M(0x2a2238,{emissive:0x2a0a4a,emissiveIntensity:0.3}),x,h/2-1.5,z);addMesh(new THREE.ConeGeometry(0.32,0.9,6),M(0x2a2238),x,h-1.0,z);}});
    const tileSolid=(t,s)=>{if(s!==t.solid){t.solid=s;t.m.material=TILE_M.light[s?0:1];}};
    // клетка: прутья, купол, кольца; замки — на клетке (крутится вместе с ней)
    const cage=new THREE.Group();cage.position.copy(CAGE);A.g.add(cage);const gm=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.5});const bars=[];
    for(let i=0;i<16;i++){const a=i/16*Math.PI*2;bars.push(addMesh(new THREE.CylinderGeometry(0.05,0.05,3.4,5),gm,Math.cos(a)*1.45,2.0,Math.sin(a)*1.45,cage));}
    for(const y of[0.35,1.8,3.6])addMesh(new THREE.TorusGeometry(1.45,0.06,6,32),gm,0,y,0,cage).rotation.x=Math.PI/2;addMesh(new THREE.SphereGeometry(1.5,16,8,0,Math.PI*2,0,Math.PI/2),gm,0,3.6,0,cage);
    addMesh(new THREE.ConeGeometry(0.25,0.6,8),gm,0,5.3,0,cage);K5L.noRay(cage);W.cyls.push({x:CAGE.x,z:CAGE.z,r:1.55,miny:-1,maxy:4,on:true});
    const chainUp=chainLine(new V3(CAGE.x,5.5,CAGE.z),new V3(KZ.x-1,KZ.y-1.4,KZ.z+0.5),0x2a1a34);W.group.remove(chainUp);A.g.add(chainUp);
    const zh=makeFirebird({});W.group.remove(zh.g);A.g.add(zh.g);zh.g.position.set(CAGE.x,1.4,CAGE.z);K5L.noRay(zh.g);const zhGl=k5Glow(0xffa040,4);zhGl.position.y=1;zh.g.add(zhGl);
    const locks=[[0,1,-0.42,1.05],[1,1,0.42,1.05],[0,2,Math.PI+0.5,2.5],[1,2,Math.PI-0.5,2.5]].map(([i,pair,a,y])=>{const g=K5L.lock();g.scale.setScalar(1.3);g.position.set(Math.sin(a)*1.62,y,Math.cos(a)*1.62);g.rotation.y=a;
      g.children.forEach(c=>{if(c.material&&c.material.emissive)c.material=c.material.clone();});const gl=k5Glow(LCOL[i],2.4);g.add(gl);cage.add(g);return {g,gl,i,pair,open:false,t:-9,pos:new V3()};});
    const birds=[makeSirin('sirin'),makeSirin('alkonost')].map((b,i)=>{W.group.remove(b.g);A.g.add(b.g);b.g.position.set(BIRD[i].x,1.0,BIRD[i].z);b.g.rotation.y=Math.atan2(X-BIRD[i].x,0-BIRD[i].z);
      const gl=k5Glow(LCOL[i],3.6);gl.position.y=1.6;b.g.add(gl);K5L.noRay(b.g);return b;});
    // Соловей (облик 3-Б), чёрное кольцо на клюве
    const solG=new THREE.Group();A.g.add(solG);solG.position.set(SOL.x,0.6,SOL.z);K5L.noRay(solG);const K3S=FIN.k3s;const sol=K3S&&K3S.rig?{R:K3S.rig(solG,{seed:3})}:(()=>{const m=makeSolovei();W.group.remove(m.g);solG.add(m.g);return {};})();
    const SOLA={g:solG};const sset=(p,e)=>{if(sol.R&&K3S.set)K3S.set(sol.R,p,e);};
    const ring=new THREE.Mesh(new THREE.TorusGeometry(0.24,0.07,8,18),M(0x16101e,{emissive:0x5a1a9a,emissiveIntensity:0.7}));if(sol.R&&sol.R.head){ring.position.set(0,0.01,0.92);sol.R.head.add(ring);}else{ring.position.set(0,3.2,0.9);solG.add(ring);}
    const ringGl=k5Glow(0x9a40ff,1.2);ring.add(ringGl);
    const solChains=[-1,1].map(s=>{const g=chainLine(new V3(SOL.x,1.6,SOL.z),new V3(SOL.x+s*2.3,1.8,SOL.z-0.4),0x2a1a34);W.group.remove(g);A.g.add(g);return g;});
    // туча Кощея и фонарь
    const cloud=new THREE.Group();A.g.add(cloud);for(let i=0;i<9;i++)addMesh(new THREE.SphereGeometry(rand(1.2,2.1),9,7),new THREE.MeshLambertMaterial({color:0x2a2438,emissive:0x1a0a2a}),KZ.x+rand(-2.6,2.6),KZ.y-1.7+rand(-0.4,0.3),KZ.z+rand(-1.3,1.3),cloud);K5L.noRay(cloud);
    const lamp=new THREE.Group();A.g.add(lamp);addMesh(new THREE.BoxGeometry(0.34,0.46,0.34),M(0x2a2030,{emissive:0x806010,emissiveIntensity:0.6}),0,0,0,lamp);const lampGl=k5Glow(0xfff0a0,2.4);lamp.add(lampGl);K5L.noRay(lamp);
    const spot=new THREE.Mesh(new THREE.CircleGeometry(2.1,32),k5Add(0xfff0a0,{opacity:0.3}));spot.rotation.x=-Math.PI/2;spot.position.set(X,0.1,0);A.g.add(spot);
    const spotRing=new THREE.Mesh(new THREE.RingGeometry(1.9,2.1,40),k5Add(0xfff8c0,{opacity:0.7}));spotRing.rotation.x=-Math.PI/2;spot.add(spotRing);spotRing.rotation.x=0;
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(0.22,2.1,1,20,1,true),k5Add(0xfff0a0,{opacity:0.16,map:K5TEX.beam}));A.g.add(beam);K5L.noRay(beam);
    const windArrows=[];for(let q=0;q<9;q++){const z=1.2-q*1.25;const m=new THREE.Mesh(new THREE.ConeGeometry(0.42,0.9,3),k5Add(0xffd76a,{opacity:0}));m.rotation.x=-Math.PI/2;m.position.set(X,0.12,z);m.visible=false;m.raycast=()=>{};A.g.add(m);windArrows.push(m);}
    const coverRings=STONES.map(st=>{const m=new THREE.Mesh(new THREE.RingGeometry(1.5,1.8,32),k5Add(0x9fe0ff,{opacity:0}));m.rotation.x=-Math.PI/2;const d=hd(st,SOL)||1;m.position.set(st.x+(st.x-SOL.x)/d*1.6,0.1,st.z+(st.z-SOL.z)/d*1.6);m.visible=false;m.raycast=()=>{};A.g.add(m);return m;});
    const S={};A.S=S;A.STONES=STONES;A.BIRD=BIRD;A.SOL=SOL;A.CAGE=CAGE;const orbs=new Map();
    const K3=()=>FIN.k3fx;
    function setLight(h,c){const o=orbs.get(h);if(o){k5Del(o);orbs.delete(h);}h.k5lt=c;if(c==null)return;const m=k5Glow(LCOL[c],1.5);k5Prop(m);orbs.set(h,m);}
    const carriers=()=>k5Heroes().filter(h=>h.k5lt!=null);
    const litK=(x,z)=>S.dawn||carriers().some(h=>Math.hypot(h.pos.x-x,h.pos.z-z)<LR)||S.shadows.some(s=>s.lt!=null&&Math.hypot(s.g.position.x-x,s.g.position.z-z)<2.5);
    // укрытие: щит Потапа (за ним) или облачный камень между героем и Соловьём
    function sheltered(h){if(h.kind==='potap'&&h.guard)return true;const dh=hd(h.pos,SOL);
      const P=k5Heroes().find(q=>q.kind==='potap'&&q.guard&&q!==h);if(P&&hd(P.pos,h.pos)<2.3&&hd(P.pos,SOL)<dh)return true;
      for(const s of STONES){const ds=hd(s,SOL);if(dh<=ds||dh-ds>5)continue;const ux=(s.x-SOL.x)/ds,uz=(s.z-SOL.z)/ds,px=h.pos.x-SOL.x,pz=h.pos.z-SOL.z;if(px*ux+pz*uz>0&&Math.abs(px*uz-pz*ux)<1.35)return true;}return false;}
    function knock(h,f,hurt){if(hurt)k5Hurt(h,SOL);const dx=h.pos.x-SOL.x,dz=h.pos.z-SOL.z,d=Math.hypot(dx,dz)||1;h.vel.x+=dx/d*f;h.vel.z+=dz/d*f;h.vel.y=Math.max(h.vel.y,4.5);h.grounded=false;h.knockT=Math.max(h.knockT||0,0.4);}
    // ---------- свист: видимый звук 3-Б ----------
    function wave(kind,sp,maxR,onPass){const Wv=K3()&&K3().wave?K3().wave(kind,2.6):null;const o={Wv,r:0.6,sp,maxR,hit:new Set(),kind,onPass};if(Wv)Wv.set(SOL,0.6);S.waves.push(o);return o;}
    function whistle(tgt,kind){if(S.wh)return;S.wh={t:0,kind,tgt};sset('inhale','angry');barkS(SOLA,'solovei','(против воли) Фью-у-у!',1.2,true);
      if(AUD.ready())AUD.nz({type:'bandpass',f0:1800,q:3,d:1.1,v:0.05,a:0.6});}
    function whBlow(kind){sset('whistle','angry');k5s('gale');if(K3()&&K3().cl)K3().cl.tear(0.5,1.2);
      wave(kind,10,16,(h,d)=>{if(kind==='white'){if(!h.grounded&&h.pos.y>0.5)return;knock(h,7,false);floatText(h.pos.clone().add(new V3(0,2.2,0)),'Порыв!','#e8f4ff');return;}
        if(sheltered(h)){floatText(h.pos.clone().add(new V3(0,2.2,0)),'Устоял!','#9fd0ff');return;}
        knock(h,h.kind==='potap'?3.5:6.5,h.kind!=='potap'&&!h.guard);if(kind==='purple'&&h.k5lt!=null){setLight(h,null);floatText(h.pos.clone().add(new V3(0,2.6,0)),'Свет погас!','#c8a8ff');E.log('lightOut');}});}
    // ---------- тени: крадут свет ----------
    function shadowMake(){const g=new THREE.Group();const m=M(0x140c24,{emissive:0x2a0a4a,emissiveIntensity:0.4});const b=part(g,new THREE.SphereGeometry(0.5,10,8),m,0,1.0,0);b.scale.set(1,1.6,1);
      part(g,new THREE.SphereGeometry(0.34,10,8),m,0,2.0,0);for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.07,6,5),MB(0xd08aff),s*0.12,2.05,0.3);
      const arms=[-1,1].map(s=>{const a=part(g,new THREE.ConeGeometry(0.12,1.0,5),m,s*0.55,1.3,0);a.rotation.z=s*2.4;return a;});const gl=k5Glow(0xffffff,1.8);gl.position.y=1.2;gl.material.opacity=0;g.add(gl);
      A.g.add(g);K5L.noRay(g);return {g,gl,arms};}
    function spawnShadow(){const a=rand(0,6.28);const o=shadowMake();o.g.position.set(X+Math.cos(a)*12.5,0,Math.sin(a)*12.5);K5L.ink(o.g.position.clone().add(new V3(0,1,0)),14);
      const s=Object.assign(o,{st:'chase',lt:null,flat:1,t:0});S.shadows.push(s);E.log('shadow');return s;}
    function shadowPop(s,h){K5L.ink(s.g.position.clone().add(new V3(0,1,0)),20);k5s('shatter');
      if(s.lt!=null){const to=h&&h.k5lt==null?h:null;if(to){setLight(to,s.lt);floatText(to.pos.clone().add(new V3(0,2.4,0)),'Свет вернулся!','#ffe08a');}else floatText(s.g.position.clone().add(new V3(0,2.4,0)),'Свет — к птице','#ffe08a');}
      k5Del(s.g);S.shadows.splice(S.shadows.indexOf(s),1);E.log('shadowPop');}
    // ---------- замки ----------
    function lockHit(L,h){if(L.open||L.pair!==S.pair||(S.ph!=='p1'&&S.ph!=='night'))return;
      if(!G.solo&&h.k5lt!==L.i){floatText(L.pos.clone().add(new V3(0,1,0)),L.i?'нужен золотой свет':'нужен синий свет','#d8d0ff');SFX.clink();return;}
      if(G.solo&&h.k5lt==null){floatText(L.pos.clone().add(new V3(0,1,0)),'нужен свет птицы','#d8d0ff');SFX.clink();return;}
      L.t=G.time;FX.sparkle(L.pos.clone(),12,LCOL[L.i]);SFX.clink();L.gl.material.opacity=1;const O=locks.find(q=>q.pair===L.pair&&q!==L);
      if(Math.abs(O.t-G.time)<(G.solo?3:1.5)){[L,O].forEach(q=>{q.open=true;const f=q.g.position.clone();k5fx(0.7,k=>{q.g.position.y=f.y-k*2;q.g.rotation.z=k*2;},()=>{q.g.visible=false;});});k5Flash(L.pos.clone(),LCOL[L.i],3,0.4);pairOpen();}
      else floatText(L.pos.clone().add(new V3(0,1,0)),G.solo?'И второй замок — скорей!':'Разом! И второй замок!','#ffe08a');}
    function pairOpen(){E.log('pair'+S.pair);k5s('keyBreak');K5L.gold(CAGE.clone().add(new V3(0,2,0)),18);
      if(S.pair===1){ES.prog=0.33;bars.forEach((b,i)=>{if(i%2)anim(0.6,k=>{b.position.y=2.0+k*1.0;b.scale.y=1-k*0.6;});});barkS(zh,'zhar','Ещё замки — сзади, повыше! Скорее!',2.4,true);
        later(1.6,()=>barkS(KS,'koschei','Ах так? Ночь на вас! Тени — гасите их свет!',2.4,true));later(2.4,startNight);}
      else openCage();}
    function startNight(){if(E.cur!==6||S.ph!=='p1')return;S.ph='night';S.pair=2;S.shT=1.5;locks.forEach(L=>{if(L.pair===2)L.g.visible=true;});if(K3()&&K3().nightOn){K3().nightOn(new V3(X,0,0));K3().nightSet(1);}
      K5L.themeTo('night',2);K5X.tint('rgba(10,0,30,.85)',0.6);E.log('night');}
    function openCage(){S.ph='free';ES.prog=0.66;E.log('cage');k5s('reveal');bars.forEach(b=>{const y0=b.position.y;anim(0.8,k=>{b.position.y=y0+k*6;});later(0.8,()=>{b.visible=false;});});
      S.shadows.slice().forEach(s=>shadowPop(s,null));barkS(zh,'zhar','Свобода! Встань, заря!',2,true);const f=zh.g.position.clone();anim(1.6,k=>{zh.g.position.set(f.x,f.y+k*5,f.z);});
      later(1.0,()=>{S.dawn=true;if(K3()&&K3().nightSet)K3().nightSet(0);K5L.themeTo('gold',2.5);K5X.tint(null);K5X.rays(new V3(X,0,-2),0xffd8a0,6,{spread:12,op:0.24});K5L.gold(new V3(X,6,-1.3),30);});
      later(2.6,()=>{barkS(KS,'koschei','Свисти, Соловей! Сдуй их с облаков!',2.2,true);later(1.4,startWind);});}
    function startWind(){if(E.cur!==6||S.ph!=='free')return;S.ph='wind';S.gustT=3;S.boltT=4;S.ring=0;S.wc=0;S.blowing=null;S.blowN=0;const W3=K3();if(W3&&W3.windOn){W3.windOn(new V3(X,0,0),13);W3.windSet('blow',1,SOL);}sset('whistle','angry');E.log('wind');
      later(1.2,()=>barkS(zh,'zhar','За облачные камни — и к нему! Кольцо на клюве — разом!',2.8,true));}
    function ringHit(h){if(S.ph!=='wind'||hd(h.pos,SOL)>3.4)return;S.rt[h.player]=G.time;
      const both=G.solo||Math.abs(S.rt[0]-S.rt[1])<0.8;if(!both){if(G.time>(S.rtTip||0)){S.rtTip=G.time+1;floatText(SOL.clone().add(new V3(0,3.8,0)),'Разом! Второй — тоже!','#ffe08a');}return;}
      if(G.time<S.rCd)return;S.rCd=G.time+1.2;S.ring++;E.log('ring'+S.ring);ES.prog=0.66+0.17*S.ring;sset('choke','hurt');later(0.8,()=>{if(S.ph==='wind')sset('whistle','angry');});
      const p=new V3();ring.getWorldPosition(p);burst(p,0xffffff,12,3);FX.sparks(p,12,0xffd76a);ringGl.material.color.set(0xffd76a);later(0.4,()=>ringGl.material.color.set(0x9a40ff));
      floatText(p.clone().add(new V3(0,1,0)),S.ring>=2?'Кольцо лопнуло!':'Треснуло! Ещё разом!','#ffe08a');if(S.ring>=2)ringBreak();}
    function ringBreak(){S.ph='won';const p=new V3();ring.getWorldPosition(p);ring.visible=false;k5Flash(p,0xffc840,3,0.5);K5L.gold(p,24);solChains.forEach(c=>{c.visible=false;});
      const W3=K3();if(W3&&W3.windSet)W3.windSet('blow',0);sset('cheer','neutral');barkS(SOLA,'solovei','Ох… Свободен! А ну, Кощей, — держись, свистну!',2.4,true);
      later(2.2,()=>{sset('whistle','angry');solG.rotation.y=Math.atan2(KZ.x-SOL.x,KZ.z-SOL.z);wave('gold',14,22,()=>{});k5s('gale');if(W3&&W3.cl)W3.cl.tear(1,3);
        const c0=cloud.position.clone(),k0=KS.g.position.clone();anim(1.4,k=>{cloud.position.set(c0.x+k*30,c0.y+k*10,c0.z-k*20);KS.g.position.set(k0.x+k*30,k0.y+k*10,k0.z-k*20);});
        later(0.6,()=>say('koschei','А-а-а! Сдуло-о-о!',1.4));later(1.5,()=>{KS.g.visible=false;});later(2.4,()=>E.won(6));});}
    // ---------- старт / конец ----------
    function reset(){Object.assign(S,{ph:'p1',pair:1,whT:5,spotA:0,seenT:0,wh:null,waves:[],shadows:[],shT:0,dawn:false,gustT:0,boltT:0,ring:0,rt:[-9,-9],rCd:0,lt:[0,0]});
      locks.forEach(L=>{L.open=false;L.t=-9;L.g.visible=L.pair===1;L.gl.material.opacity=0.5;L.g.rotation.z=0;});locks.forEach((L,i)=>{L.g.position.y=[1.05,1.05,2.5,2.5][i];});
      bars.forEach(b=>{b.position.y=2.0;b.scale.y=1;b.visible=true;});cage.rotation.y=0;zh.g.position.set(CAGE.x,1.4,CAGE.z);ring.visible=true;solChains.forEach(c=>{c.visible=true;});solG.rotation.y=0;
      cloud.position.set(0,0,0);for(const h of HEROES)setLight(h,null);tiles.forEach(t=>tileSolid(t,false));sset('dazed','hurt');}
    A.start=q=>{reset();KS.g.visible=true;KS.g.position.copy(KZ);KS.g.rotation.y=-0.5;dome.visible=false;ES.prog=0;ES.fight=false;
      const W3=K3();if(W3){if(W3.cloudRing&&!W3.cl)W3.cloudRing(new V3(X,0,0),{r0:16,r1:26,y0:-8,y1:0.5,n:22});if(W3.nightSet)W3.nightSet(0);if(W3.windSet)W3.windSet('blow',0);}
      K5X.motes('gold',new V3(X,0,0),13,90,5);K5X.tint('rgba(30,20,70,.7)',0.4);
      // под облаками — пропасть: живой океан уровня (ходит за камерой) на этой странице прячем
      if(FIN.atmo&&FIN.atmo.ocean)FIN.atmo.ocean.visible=false;
      W.fallHook=h=>{if(E.cur!==6)return false;const sp=A.spawn(h.player);placeOnGround(h,sp.x,sp.z,1);h.iT=1;h.vel.set(0,0,0);burst(h.pos.clone().add(new V3(0,0.6,0)),0xffffff,10,3);
        floatText(h.pos.clone().add(new V3(0,2.4,0)),'Упал с облака!','#e8f4ff');if(h.k5lt!=null)setLight(h,null);return true;};
      W.camFn=()=>{const hs=k5Heroes();const a=hs[0]?hs[0].pos:CAGE,b=hs[1]?hs[1].pos:a;const mid=new V3((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2),sp=hd(a,b),F=S.ph==='wind'?SOL:CAGE;
        return {pos:new V3(lerp(mid.x,X,0.45),mid.y+10+sp*0.3,Math.max(mid.z,-5)+12.5+sp*0.3),look:new V3(lerp(mid.x,F.x,0.35),1.2,lerp(mid.z,F.z,0.35)),k:3};};
      E.cards(6,()=>{ES.fight=true;if(!q)later(0.4,()=>barkS(KS,'koschei','Посвечу-ка фонарём — кто тут по облакам бродит?',2.4,true));later(3,()=>barkS(zh,'zhar','Свет печали и свет радости — у птиц! Замки — разом!',2.8,true));});};
    A.end=()=>{if(FIN.atmo&&FIN.atmo.ocean)FIN.atmo.ocean.visible=true;for(const h of HEROES)setLight(h,null);KS.g.visible=false;W.fallHook=null;W.camFn=null;for(const o of S.waves||[])if(o.Wv)o.Wv.del();S.waves=[];(S.shadows||[]).forEach(s=>k5Del(s.g));S.shadows=[];
      const W3=K3();if(W3){if(W3.nightSet)W3.nightSet(0);if(W3.windSet)W3.windSet('blow',0);}};
    A.item=pi=>{if(E.cur!==6||!ES.fight)return null;const h=active(pi),f=active(1-pi);if(G.solo||!f||hd(h.pos,f.pos)>2.4||h.k5lt==null)return null;
      return ()=>{const a=h.k5lt,b=f.k5lt;setLight(f,a);setLight(h,b==null?null:b);floatText(f.pos.clone().add(new V3(0,2,0)),'Держи свет!','#ffe08a');E.log('pass');};};
    A.attack=h=>{if(E.cur!==6)return;for(const s of S.shadows.slice()){if(hd(h.pos,s.g.position)>2.3)continue;const lit=s.lt!=null||litK(s.g.position.x,s.g.position.z);
        if(lit)shadowPop(s,h);else floatText(s.g.position.clone().add(new V3(0,2.4,0)),'насквозь! тень плоская — нужен свет','#c8a8ff');return;}};
    // ---------- шаг ----------
    A.tick=dt=>{if(sol.R&&K3S.anim)try{K3S.anim(sol.R,dt);}catch(e){}
      for(const [h,o] of orbs){o.position.copy(h.pos).add(new V3(0,h.d.height+0.9,0));o.material.opacity=0.7+0.3*Math.sin(G.time*8);}
      zh.g.rotation.y+=dt*(S.ph==='p1'||S.ph==='night'?0.8:1.6);if(zh.wings)zh.wings.forEach(w=>{const q=w.wp||w;if(q&&q.rotation)q.rotation.z=(w.s||1)*Math.sin(G.time*(S.dawn?9:3))*0.5;});
      birds.forEach((b,i)=>{b.g.position.y=1.0+Math.sin(G.time*1.4+i*2)*0.12;});
      for(const L of locks){L.g.getWorldPosition(L.pos);if(!L.open&&L.pair===S.pair)L.gl.material.opacity=Math.max(0.45,L.gl.material.opacity-dt*1.5)+0.1*Math.sin(G.time*5);}
      // мостики: твёрдые в свете
      for(const t of tiles)tileSolid(t,litK(t.x,t.z));
      for(const h of k5Heroes())if(h.groundRef&&h.groundRef.tile)h.safeT=G.time;   // со светящегося мостика место возврата не берём
      if(!ES.fight)return;
      KS.g.position.y=KZ.y+cloud.position.y+Math.sin(G.time*1.2)*0.3;if(S.ph!=='won')KS.g.position.x=KZ.x+cloud.position.x;cloud.rotation.y+=dt*0.08;
      // свет у птиц; несущий медленнее
      for(const h of k5Heroes()){if(S.ph==='p1'||S.ph==='night')for(let i=0;i<2;i++)if(hd(h.pos,BIRD[i])<1.9&&h.k5lt!==i&&h.pos.y<1.6){setLight(h,i);floatText(h.pos.clone().add(new V3(0,2.2,0)),i?'Свет радости!':'Свет печали!',hexS(LCOL[i]));E.log('light'+i);}
        if(h.k5lt!=null&&h.grounded){h.vel.x*=0.95;h.vel.z*=0.95;}}
      // волны свиста
      for(const o of S.waves.slice()){o.r+=o.sp*dt;if(o.Wv){o.Wv.set(SOL,o.r);o.Wv.tick(dt,SOL);o.Wv.fade(Math.max(0,1-o.r/o.maxR));}
        for(const h of k5Heroes()){if(o.hit.has(h))continue;if(Math.abs(hd(h.pos,SOL)-o.r)<0.8){o.hit.add(h);o.onPass(h);}}
        if(o.r>=o.maxR){if(o.Wv)o.Wv.del();S.waves.splice(S.waves.indexOf(o),1);}}
      if(S.wh){S.wh.t+=dt;if(S.wh.t>1.2&&!S.wh.blown){S.wh.blown=true;whBlow(S.wh.kind);}if(S.wh.t>2.2){S.wh=null;if(S.ph!=='wind')sset('dazed','hurt');}}
      // фонарь Кощея: пятно ходит, тянется к несущим свет; высветил 0,6 с — Соловей свистит
      const lampP=KS.g.position.clone().add(new V3(-0.9,1.5,0.8));lamp.position.copy(lampP);const look=(S.ph==='p1'||S.ph==='night');spot.visible=beam.visible=look;lamp.visible=S.ph!=='won';
      if(look){S.spotA+=dt*(S.ph==='night'?0.75:0.5);const car=carriers().sort((a,b)=>hd(a.pos,spot.position)-hd(b.pos,spot.position))[0];let tx=X+Math.cos(S.spotA)*7,tz=Math.sin(S.spotA*1.3)*6;
        if(car){const k=S.ph==='night'?0.6:0.4;tx=lerp(tx,car.pos.x,k);tz=lerp(tz,car.pos.z,k);}const sp=S.ph==='night'?2.2:1.5;spot.position.x+=(tx-spot.position.x)*Math.min(1,dt*sp);spot.position.z+=(tz-spot.position.z)*Math.min(1,dt*sp);
        const bot=spot.position.clone();beam.position.copy(lampP).lerp(bot,0.5);beam.scale.y=lampP.distanceTo(bot);beam.quaternion.setFromUnitVectors(new V3(0,-1,0),bot.clone().sub(lampP).normalize());
        const lit=k5Heroes().find(h=>hd(h.pos,spot.position)<2.1);spotRing.material.opacity=lit?0.7+0.3*Math.sin(G.time*20):0.6;
        if(lit){S.seenT+=dt;if(S.seenT>0.6&&!S.wh){S.seenT=0;floatText(lit.pos.clone().add(new V3(0,2.6,0)),'Вижу!','#c8a8ff');S.whT=Math.min(S.whT,0.4);}}else S.seenT=0;
        S.whT-=dt;if(S.whT<=0&&!S.wh){S.whT=G.solo?8.5:6.2;whistle(lit||null,S.ph==='night'?'purple':'blue');}}
      // ночь: клетка крутится, тени крадутся к несущим свет
      if(S.ph==='night'){cage.rotation.y+=dt*0.35;S.shT-=dt;if(S.shT<=0&&S.shadows.length<(G.solo?1:2)){S.shT=G.solo?9:6.5;spawnShadow();}}
      for(const s of S.shadows.slice()){s.t+=dt;const p=s.g.position;s.arms.forEach((a,i)=>{a.rotation.x=Math.sin(G.time*6+i*3)*0.5;});
        const lit=s.lt!=null||litK(p.x,p.z);s.flat=damp(s.flat,lit?0:1,6,dt);s.g.scale.set(1,1,lerp(1,0.12,s.flat));
        if(s.st==='chase'){const car=carriers().sort((a,b)=>hd(a.pos,p)-hd(b.pos,p))[0];if(!car){p.x+=(X-p.x)*dt*0.2;continue;}const dx=car.pos.x-p.x,dz=car.pos.z-p.z,d=Math.hypot(dx,dz)||1;
          s.g.rotation.y=Math.atan2(dx,dz);const v=G.solo?2.4:3.0;p.x+=dx/d*v*dt;p.z+=dz/d*v*dt;p.y=damp(p.y,car.pos.y,4,dt);
          if(d<1.0&&car.rollT<=0){s.lt=car.k5lt;setLight(car,null);s.gl.material.color.set(LCOL[s.lt]);s.gl.material.opacity=1;s.st='flee';const a=Math.atan2(p.z,p.x-X);s.to=new V3(X+Math.cos(a)*14,0,Math.sin(a)*14);
            floatText(car.pos.clone().add(new V3(0,2.4,0)),'Тень украла свет!','#c8a8ff');E.log('steal');}}
        else if(s.st==='flee'){const dx=s.to.x-p.x,dz=s.to.z-p.z,d=Math.hypot(dx,dz)||1;s.g.rotation.y=Math.atan2(dx,dz);p.x+=dx/d*3.6*dt;p.z+=dz/d*3.6*dt;
          if(d<0.6){K5L.ink(p.clone().add(new V3(0,1,0)),10);k5Del(s.g);S.shadows.splice(S.shadows.indexOf(s),1);}}}
      // ветер: сносит с облаков; укрытия — камни и щит Потапа; порывы — прыжок; молнии Кощея
      if(S.ph==='wind'){S.wc+=dt;const cyc=G.solo?6:5.4,blowT=G.solo?2.2:2.6,ph=S.wc%cyc,blowing=ph<blowT,inh=ph>cyc-1.0;
        // порывы с затишьями: вдох — дует — тихо (беги!)
        if(blowing!==S.blowing){S.blowing=blowing;const W3=K3();if(W3&&W3.windSet)W3.windSet('blow',blowing?1:0.06,SOL);sset(blowing?'whistle':'dazed',blowing?'angry':'hurt');
          if(blowing){k5s('gale');if(W3&&W3.cl)W3.cl.tear(0.4,1);S.blowN=(S.blowN||0)+1;if(S.blowN%2===0)whBlow('white');}}
        if(inh&&!S.inh){S.inh=true;sset('inhale','angry');}if(!inh)S.inh=false;
        if(blowing){const f=G.solo?2.2:2.6;for(const h of k5Heroes()){if(sheltered(h))continue;const dx=h.pos.x-SOL.x,dz=h.pos.z-SOL.z,d=Math.hypot(dx,dz)||1;if(d>15)continue;const k=(h.kind==='potap'?0.4:1)*f*dt;
          const nx=h.pos.x+dx/d*k,nz=h.pos.z+dz/d*k;if(groundAt(nx,nz,h.pos.y+0.6).y>h.pos.y-0.8){h.pos.x=nx;h.pos.z=nz;}}}   // с облака ветер не сдувает
        // дорожка к Соловью и укрытия
        windArrows.forEach((m,q)=>{m.visible=!E.noHint();m.material.opacity=(blowing?0.25:0.95)*(0.35+0.65*Math.max(0,Math.sin(G.time*6-q*0.9)));});
        coverRings.forEach(c=>{c.visible=!E.noHint();c.material.opacity=blowing?0.85+0.15*Math.sin(G.time*10):0.35;});
        if(!G.solo){S.boltT-=dt;if(S.boltT<=0){S.boltT=6.5;const hs=k5Heroes().filter(h=>hd(h.pos,SOL)>5);const h=hs[Math.floor(rand(0,hs.length))];if(h){const at=new V3(h.pos.x+h.vel.x*0.3,0,h.pos.z+h.vel.z*0.3);if(FIN.k2fx)FIN.k2fx.tele(at.x,0,at.z,1.6,1.4,'red');try{KA.pose('cast',{snap:true});later(0.4,()=>KA.reset());}catch(e){}
            later(1.4,()=>{if(S.ph!=='wind')return;if(FIN.k2fx)FIN.k2fx.lightning(at.clone());shakeAll(0.06,0.25);for(const q of k5Heroes())if(hd(q.pos,at)<1.6&&q.rollT<=0)k5Hurt(q,at);});}}}}
      else{windArrows.forEach(m=>{m.visible=false;});coverRings.forEach(c=>{c.visible=false;});}};
    // ---------- удары ----------
    locks.forEach(L=>W.hittables.push({pos:L.pos,r:1.0,alive:()=>E.cur===6&&ES.fight&&!L.open&&L.pair===S.pair&&L.g.visible,onHit:h=>lockHit(L,h)}));
    {const rp=new V3();W.updates.push(()=>{if(E.cur===6)ring.getWorldPosition(rp);});W.hittables.push({pos:rp,r:1.6,alive:()=>E.cur===6&&ES.fight&&S.ph==='wind',onHit:h=>ringHit(h)});}
    A.pics=pi=>S.ph==='won'?['star']:S.ph==='wind'||S.ph==='free'?['wind','>','stone','+','bird','@attack']:['bird','>','light','>','lock','@attack'];
    A.goal=pi=>{const q=G.solo?0:pi;if(S.ph==='won')return 'Соловей свободен!';
      if(S.ph==='wind'||S.ph==='free')return '<b>Ветер!</b> Укрытия — облачные камни и щит Потапа '+K(q,'guard')+'; порыв — прыжок. У Соловья — удар '+K(q,'attack')+' по <b>кольцу на клюве</b>'+(G.solo?'':' разом')+', дважды.';
      return 'Свет у птиц: <b>Сирин — синий</b>, <b>Алконост — золотой</b>; мостики к клетке светятся только при свете. Замки — <b>разом</b>, каждый своим светом'+(S.ph==='night'?' (вторые — сзади, клетка крутится). <b>Тени</b> крадут свет — бей их в свете.':'.')+
        ' Синий свист — за щит Потапа или облачный камень'+(S.ph==='night'?'; фиолетовый гасит свет.':'.')+(G.solo?'':' Свет другу — '+K(q,'item')+' рядом.');};
    A.targets=pi=>{const h=active(G.solo?G.soloPi:pi);if(S.ph==='wind')return [solG];if(S.ph!=='p1'&&S.ph!=='night')return [];if(h.k5lt==null)return birds.map(b=>b.g);return locks.filter(L=>L.pair===S.pair&&!L.open&&(G.solo||L.i===h.k5lt)).map(L=>L.g);};
    A.bot={light:(h,i)=>setLight(h,i),lock:(i,h)=>lockHit(locks.find(L=>L.pair===S.pair&&L.i===i),h),whistle:k=>whistle(null,k||'blue'),shadow:()=>spawnShadow(),ring:h=>ringHit(h),
      sheltered:h=>sheltered(h),tiles:()=>tiles,lockPos:i=>locks.find(L=>L.pair===S.pair&&L.i===i).pos};
    // ---------- подсказки в мире ----------
    for(const pi of[0,1]){const me=()=>G.solo?active(G.soloPi):active(pi),st6=()=>E.cur===6&&ES.step==='fight'&&ES.fight&&!G.cine&&(!G.solo||pi===0),top=()=>headOf(me()).add(new V3(0,0.4,0));
      const lockPh=()=>S.ph==='p1'||S.ph==='night';
      prompt(pi,'label',()=>{const i=hd(me().pos,BIRD[0])<hd(me().pos,BIRD[1])?0:1;return BIRD[i].clone().add(new V3(0,3.4,0));},()=>st6()&&lockPh()&&me().k5lt==null&&!S.shadows.some(s=>hd(s.g.position,me().pos)<3),'возьми свет у птицы');
      prompt(pi,'label',top,()=>st6()&&lockPh()&&me().k5lt==null&&!litK(me().pos.x,me().pos.z)&&tiles.some(t=>hd(t,me().pos)<2.6),'мостик горит только при свете');
      prompt(pi,'attack',()=>{const L=locks.find(L=>L.pair===S.pair&&!L.open&&(G.solo||L.i===me().k5lt));return L?L.pos.clone().add(new V3(0,1.2,0)):me().pos;},()=>st6()&&lockPh()&&me().k5lt!=null&&hd(me().pos,CAGE)<6&&locks.some(L=>L.pair===S.pair&&!L.open&&(G.solo||L.i===me().k5lt)),G.solo?'замки — подряд!':'разом!');
      prompt(pi,'guard',top,()=>st6()&&S.wh&&!S.wh.blown&&S.wh.kind!=='white'&&(me().kind==='potap'||G.solo),'щит!');
      prompt(pi,'label',top,()=>st6()&&S.wh&&!S.wh.blown&&S.wh.kind!=='white'&&me().kind!=='potap'&&!G.solo&&!sheltered(me()),'свист! — за щит Потапа или за камень');
      prompt(pi,'attack',top,()=>st6()&&S.shadows.some(s=>hd(s.g.position,me().pos)<3.2),'тень — бей!');
      prompt(pi,'jump',top,()=>st6()&&S.ph==='wind'&&S.waves.some(o=>o.kind==='white'&&!o.hit.has(me())&&hd(me().pos,SOL)-o.r<3&&hd(me().pos,SOL)>o.r),'порыв — прыжок!');
      prompt(pi,'label',top,()=>st6()&&S.ph==='wind'&&!sheltered(me())&&hd(me().pos,SOL)>4.5&&!S.waves.some(o=>o.kind==='white'),'ветер! — за облачный камень');
      prompt(pi,'attack',()=>{const p=new V3();ring.getWorldPosition(p);return p.add(new V3(pi?0.8:-0.8,1.4,0));},()=>st6()&&S.ph==='wind'&&hd(me().pos,SOL)<4.5,G.solo?'по кольцу!':'разом — по кольцу!');}
  }
  E.pageStage(6,3,{call:'Третья страница — Небесное царство! Там Жар-птица в клетке тужит.'});
  E.CARDS[6]=[{p:[700,13,15],l:[700,1,-3],card:{tag:'Как победить',title:'Стадия 6 из 12 · В темнице там царевна тужит',icon:'lock',text:'Жар-птица в золотой клетке на облачном островке. Замки клетки открываются только <b>разом</b>, и каждый — <b>своим светом</b>. Потом — кольцо на клюве Соловья.'}},
    {p:[700,5,9],l:[700,0.5,1],card:{tag:'Вместе',title:'Свет и мостики',icon:'spark',text:'Коснись <b>Сирин</b> — синий свет печали, <b>Алконоста</b> — золотой свет радости. <b>Мостики</b> к клетке твёрдые, только пока рядом свет. Свет можно отдать другу (предмет рядом).'}},
    {p:[700,6,-4],l:[700,1.4,-10.9],card:{tag:'Берегись',title:'Фонарь и свист',icon:'wind',text:'Кощей шарит <b>фонарём</b>: высветил — Соловей свистит против воли. <b>Синий</b> свист — за <b>щит Потапа</b> или облачный камень; ночью <b>фиолетовый</b> — гасит свет, а <b>тени</b> крадут его: бей их в свете.'}},
    {p:[700,7,-3],l:[700,2,-10.9],card:{tag:'Вместе',title:'Кольцо на клюве',icon:'hand',text:'Жар-птица свободна — Кощей велит Соловью дуть. Ветер сносит: прячьтесь за <b>камни</b> и <b>щит Потапа</b>, порыв — <b>прыжок</b>. У Соловья — удар по кольцу <b>разом</b>, дважды.'}}];
