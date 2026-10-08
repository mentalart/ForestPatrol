/* ============================== БИТВА С КОЩЕЕМ (k5epic) · БИБЛИОТЕКА: пролог, Лукоморье, Кот на цепи, буквы-удары, страницы, оркестр ============================== */
// Модели и эффекты без логики боя (логика — в частях build5B2: late_93_koschei_level_p6…). Всё Кощеево — чернила (чёрно-фиолетовое,
// блестящее, с почерком), всё сказочное — золото (буквы, цепь, свет): опасность читается без слов (docs/27, §2).
const K5L={};FIN.k5l=K5L;
// двенадцать строк пушкинского пролога: стадия пройдена — строка встаёт золотом над дубом; ink — как переписал Кощей
K5L.LINES=['Через леса, через моря колдун несёт богатыря…','У лукоморья дуб зелёный;','Там чудеса: там леший бродит,','Там лес и дол видений полны;',
  'Избушка там на курьих ножках','Там о заре прихлынут волны','В темнице там царевна тужит,','Там на неведомых дорожках','Через леса, через моря колдун несёт богатыря;',
  'И тридцать витязей прекрасных','Там царь Кащей над златом чахнет;','Там русский дух… там Русью пахнет!','Златая цепь на дубе том!'];
K5L.INK=['','У лукоморья дуб засохший;','Там пусто: леший не бродит,','Там лес и дол — одни мороки;','Избушка там — на замке навеки,','Там на заре застыли волны,',
  'В темнице там — и нет ключа,','Там на дорожках — ни следа,','Колдун унёс богатыря — и не вернёт;','И тридцать витязей — костями,','Там царь Кащей над златом — царь!','Там без имён — никто не помнит,','Чёрная цепь на дубе том.'];
K5L.noRay=o=>{o.raycast=()=>{};o.traverse&&o.traverse(q=>{q.raycast=()=>{};});return o;};
const k5eMB=(c,o)=>MB(c,Object.assign({transparent:true,depthWrite:false},o||{}));

/* ---------- текст на холсте ---------- */
K5L.textTex=(text,o)=>{o=o||{};const w=o.w||1024,h=o.h||128,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');
  let fs=o.fs||Math.round(h*0.56);g.font=(o.weight||'italic 700 ')+fs+'px Georgia,serif';while(g.measureText(text).width>w-24&&fs>14){fs-=2;g.font=(o.weight||'italic 700 ')+fs+'px Georgia,serif';}
  g.textAlign='center';g.textBaseline='middle';if(o.glow){g.shadowColor=o.glow;g.shadowBlur=h*0.18;}
  if(o.stroke){g.lineWidth=Math.max(2,fs*0.1);g.strokeStyle=o.stroke;g.strokeText(text,w/2,h/2+2);}g.fillStyle=o.col||'#ffd76a';g.fillText(text,w/2,h/2+2);
  const t=new THREE.CanvasTexture(c);t.anisotropy=2;return t;};
K5L.textSpr=(text,width,o)=>{o=o||{};const t=K5L.textTex(text,o);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false,fog:false,toneMapped:false,opacity:o.op==null?1:o.op}));
  s.scale.set(width,width*(o.h||128)/(o.w||1024),1);s.raycast=()=>{};return s;};

/* ---------- свет и небо стадий: только цвета (setTheme добавляет плоскости — второй раз за уровень его не зовём) ---------- */
K5L.TH={dawn:[0xf0b8a8,40,150,0xffe4e0,0.64,0xffc8a0,0.82],ink:[0x5a4a78,30,120,0xd8c8f0,0.56,0xffb8a0,0.6],forest:[0x23384a,14,58,0x9ab8d0,0.58,0xc8d8ff,0.62],
  kitezh:[0x0e4654,16,72,0xa8e4e8,0.68,0xfff0c8,0.72],heaven:[0x3a3470,26,100,0xb8b0ec,0.56,0xd8c8ff,0.55],smorodina:[0x3a1a18,22,85,0xf0b098,0.56,0xffb070,0.7],
  storm:[0x2a2440,24,90,0xa8a0d8,0.5,0xc8b8ff,0.48],sunset:[0xf0a070,40,140,0xffd8c0,0.62,0xffa060,0.8],night:[0x141228,18,70,0x8c84c0,0.46,0xa8a0ff,0.36],
  gold:[0xffd8a0,40,160,0xfff0d8,0.7,0xffe0a0,0.9],page:[0xf4ecd8,60,200,0xffffff,0.9,0xfff4e0,0.5]};
// основа неба (K5L.B): тема стадии меняет основу, а гроза уровня (stormTick в p2_storm) каждый кадр затемняет именно её —
// раньше гроза возвращала фон уровня (рассвет) и темы стадий не держались
K5L.B=null;
K5L.base=()=>{if(!K5L.B)K5L.B={bg:(scene.background&&scene.background.isColor?scene.background:new THREE.Color(0xf0b8a8)).clone(),ac:amb.color.clone(),ai:amb.intensity,sc:sun.color.clone(),si:sun.intensity};return K5L.B;};
K5L.applyBase=()=>{const B=K5L.B;if(!B)return;if(scene.background&&scene.background.isColor)scene.background.copy(B.bg);else scene.background=B.bg.clone();if(scene.fog)scene.fog.color.copy(B.bg);amb.color.copy(B.ac);amb.intensity=B.ai;sun.color.copy(B.sc);sun.intensity=B.si;};
K5L.theme=(n,k)=>{const T=K5L.TH[n]||K5L.TH.dawn;k=k==null?1:k;const B=K5L.base();B.bg.lerp(new THREE.Color(T[0]),k);B.ac.lerp(new THREE.Color(T[3]),k);B.ai+=(T[4]-B.ai)*k;B.sc.lerp(new THREE.Color(T[5]),k);B.si+=(T[6]-B.si)*k;
  if(scene.fog){scene.fog.near+=(T[1]-scene.fog.near)*k;scene.fog.far+=(T[2]-scene.fog.far)*k;}K5L.applyBase();};
// плавный переход за dur секунд
K5L.themeTo=(n,dur)=>{const B=K5L.base(),T0={bg:B.bg.clone(),fn:scene.fog?scene.fog.near:0,ff:scene.fog?scene.fog.far:0,ac:B.ac.clone(),ai:B.ai,sc:B.sc.clone(),si:B.si};
  const T=K5L.TH[n]||K5L.TH.dawn;k5fx(dur||1.5,k=>{const e=k*k*(3-2*k);B.bg.copy(T0.bg).lerp(new THREE.Color(T[0]),e);if(scene.fog){scene.fog.near=lerp(T0.fn,T[1],e);scene.fog.far=lerp(T0.ff,T[2],e);}
    B.ac.copy(T0.ac).lerp(new THREE.Color(T[3]),e);B.ai=lerp(T0.ai,T[4],e);B.sc.copy(T0.sc).lerp(new THREE.Color(T[5]),e);B.si=lerp(T0.si,T[6],e);K5L.applyBase();});};

/* ---------- чернила и золото: частицы ---------- */
K5L.INKM=M(0x1c1028,{emissive:0x3a1060,emissiveIntensity:0.55});
K5L.ink=(p,n,sp)=>{n=Math.round((n||12)*FXQ());for(let i=0;i<n;i++){const a=rand(0,6.28),s=rand(1.5,4)*(sp||1);fxAdd('tetra',i%3?0x2a1440:0x7a40c0,p.clone().add(new V3(rand(-0.3,0.3),rand(0,0.4),rand(-0.3,0.3))),new V3(Math.cos(a)*s,rand(2,6),Math.sin(a)*s),{s:rand(0.08,0.2),life:rand(0.6,1.1),g:12,spin:6});}};
K5L.gold=(p,n,sp)=>{if(FX.stars)FX.stars(p,n||12,0xffd76a);if(FX.sparkle)FX.sparkle(p,Math.round((n||12)*0.7),0xfff4c0);};
// чернильная лужа: тёмное пятно с фиолетовым краем, гаснет (не бьёт — следы удара)
K5L.pool=(p,r,dur)=>{const g=k5Prop(new THREE.Group());g.position.set(p.x,0.05,p.z);const m=new THREE.Mesh(new THREE.CircleGeometry(r,24),k5eMB(0x14081e,{opacity:0.7}));m.rotation.x=-Math.PI/2;g.add(m);
  const e=new THREE.Mesh(new THREE.RingGeometry(r*0.86,r,28),k5Add(0x8a40ff,{opacity:0.6}));e.rotation.x=-Math.PI/2;e.position.y=0.01;g.add(e);
  k5fx(dur||3,k=>{const f=k<0.7?1:1-(k-0.7)/0.3;m.material.opacity=0.7*f;e.material.opacity=0.6*f*(0.6+0.4*Math.sin(G.time*6));},()=>k5Del(g));return g;};

/* ---------- удары-буквы: Кощей пишет букву в воздухе — она ложится на землю формой удара ---------- */
K5L.letterTex={};
K5L.letterT=ch=>{if(K5L.letterTex[ch])return K5L.letterTex[ch];const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');g.font='italic 700 210px Georgia,serif';g.textAlign='center';g.textBaseline='middle';
  g.shadowColor='#b070ff';g.shadowBlur=26;g.lineWidth=12;g.strokeStyle='#2a0a48';g.strokeText(ch,128,140);g.fillStyle='#e8d0ff';g.fillText(ch,128,140);return K5L.letterTex[ch]=new THREE.CanvasTexture(c);};
// формы: о — кольцо вокруг точки; х — два луча крест-накрест; ш — три полосы; л — клин от Кощея; ж — шесть лучей
K5L.SHAPES={
  'О':{tele:1.4,make:(c,d)=>{const g=new THREE.Group();const m=new THREE.Mesh(new THREE.RingGeometry(2.3,3.6,40),null);g.add(m);return {g,fills:[m],hit:p=>{const r=hd(p,c);return r>2.2&&r<3.7;}};}},
  'Х':{tele:1.3,make:(c,d)=>{const g=new THREE.Group(),f=[];for(const a of[Math.PI/4,-Math.PI/4]){const m=new THREE.Mesh(new THREE.PlaneGeometry(1.4,16),null);m.rotation.z=a+Math.atan2(d.x,d.z);g.add(m);f.push(m);}
      const ax=[Math.PI/4,-Math.PI/4].map(a=>a+Math.atan2(d.x,d.z));return {g,fills:f,hit:p=>ax.some(a=>{const dx=p.x-c.x,dz=p.z-c.z,u=Math.abs(dx*Math.cos(a)-dz*Math.sin(a)),v=Math.abs(dx*Math.sin(a)+dz*Math.cos(a));return u<0.8&&v<8;})};}},
  'Ш':{tele:1.5,make:(c,d)=>{const g=new THREE.Group(),f=[];const a=Math.atan2(d.x,d.z);for(const o of[-3,0,3]){const m=new THREE.Mesh(new THREE.PlaneGeometry(1.3,18),null);m.rotation.z=a;m.position.set(Math.cos(a)*o,Math.sin(a)*o,0);g.add(m);f.push(m);}
      return {g,fills:f,hit:p=>{const dx=p.x-c.x,dz=p.z-c.z,s=Math.sin(a),co=Math.cos(a),u=dx*co-dz*s,v=dx*s+dz*co;return Math.abs(v)<9&&[-3,0,3].some(o=>Math.abs(u-o)<0.75);}};}},
  'Л':{tele:1.2,make:(c,d)=>{const g=new THREE.Group();const m=new THREE.Mesh(new THREE.CircleGeometry(12,24,-0.45,0.9),null);m.rotation.z=Math.atan2(d.x,d.z)-Math.PI/2;g.add(m);const a0=Math.atan2(d.x,d.z);
      return {g,fills:[m],hit:p=>{const dx=p.x-c.x,dz=p.z-c.z,r=Math.hypot(dx,dz);if(r>12||r<0.8)return false;let da=Math.atan2(dx,dz)-a0;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;return Math.abs(da)<0.45;}};}},
  'Ж':{tele:1.4,make:(c,d)=>{const g=new THREE.Group(),f=[],ax=[];for(let i=0;i<6;i++){const a=i/6*Math.PI+Math.atan2(d.x,d.z);const m=new THREE.Mesh(new THREE.PlaneGeometry(1.1,14),null);m.rotation.z=a;g.add(m);f.push(m);ax.push(a);}
      return {g,fills:f,hit:p=>ax.some(a=>{const dx=p.x-c.x,dz=p.z-c.z,u=Math.abs(dx*Math.cos(a)-dz*Math.sin(a)),v=Math.abs(dx*Math.sin(a)+dz*Math.cos(a));return u<0.6&&v<7;})};}}};
// ch — буква, from — где пишет Кощей (рука), c — центр формы на земле, d — направление; onHit(h) — по каждому задетому герою
K5L.letter=(ch,from,c,d,o)=>{o=o||{};const S=K5L.SHAPES[ch]||K5L.SHAPES['О'];const tele=(o.tele||S.tele)*(G.solo?1.2:1);
  const spr=new THREE.Sprite(new THREE.SpriteMaterial({map:K5L.letterT(ch),transparent:true,depthWrite:false,fog:false,toneMapped:false,opacity:0}));spr.raycast=()=>{};k5Prop(spr);spr.position.copy(from);spr.scale.setScalar(0.1);
  if(AUD.ready()){AUD.nz({type:'bandpass',f0:2600,f1:1400,d:0.5,v:0.05,q:4,a:0.01});AUD.nz({type:'bandpass',f0:1800,f1:3200,d:0.35,v:0.04,q:5,a:0.02});}
  const sh=S.make(c,d);const tm=k5Add(0xff4a6a,{opacity:0.0});sh.fills.forEach(m=>{m.material=tm;});sh.g.rotation.x=-Math.PI/2;sh.g.position.set(c.x,0.07,c.z);k5Prop(sh.g);
  const dec=k5Prop(new THREE.Mesh(new THREE.PlaneGeometry(3.2,3.2),k5Add(0xc890ff,{map:K5L.letterT(ch),opacity:0})));dec.rotation.x=-Math.PI/2;dec.position.set(c.x,0.09,c.z);
  k5fx(tele,k=>{spr.material.opacity=Math.min(1,k*4)*(k>0.8?(1-k)*5:1);spr.scale.setScalar(0.1+Math.min(1,k*3)*2.4);spr.position.y=from.y+k*0.6;
    tm.opacity=0.12+0.45*k+0.15*Math.sin(G.time*(8+k*20));dec.material.opacity=Math.min(0.9,k*2);dec.rotation.z+=0.01;},
  ()=>{k5Del(spr);k5Del(dec);tm.color.set(0xd8b0ff);tm.opacity=0.95;k5fx(0.45,k=>{tm.opacity=0.95*(1-k);},()=>k5Del(sh.g));
    if(o.cancel&&o.cancel())return;if(AUD.ready()){AUD.thump({f0:120,f1:40,d:0.4,v:0.3});AUD.nz({type:'lowpass',f0:1800,f1:200,d:0.6,v:0.12,a:0.003});}
    shakeAll(0.05,0.25);K5L.ink(new V3(c.x,0.4,c.z),10,1.2);for(const h of k5Heroes())if(sh.hit(h.pos)&&h.pos.y<c.y+1.6){if(o.onHit)o.onHit(h);else k5Hurt(h,c);}if(o.done)o.done();});
  return sh;};

/* ---------- Лукоморье: постройки вокруг поляны ---------- */
const K5LOG=M(0x8a5a34),K5LOG2=M(0x6e4528),K5ROOF=M(0x7a3a2a),K5ROOF2=M(0x3a5a3a),K5WIN=M(0xffd890,{emissive:0xffa040,emissiveIntensity:0.6});
K5L.izba=(x,z,ry,o)=>{o=o||{};const g=k5Prop(new THREE.Group());g.position.set(x,0,z);g.rotation.y=ry||0;const w=o.w||4.2,d=o.d||3.6,h=o.h||2.6;
  for(let i=0;i<6;i++){const y=0.25+i*h/6;for(const s of[-1,1]){const l=addMesh(new THREE.CylinderGeometry(0.22,0.22,w+0.5,8),i%2?K5LOG:K5LOG2,0,y,s*d/2,g);l.rotation.z=Math.PI/2;
      const l2=addMesh(new THREE.CylinderGeometry(0.22,0.22,d+0.5,8),i%2?K5LOG2:K5LOG,s*w/2,y+0.2,0,g);l2.rotation.x=Math.PI/2;}}
  const roof=new THREE.Group();roof.position.y=h+0.2;g.add(roof);for(const s of[-1,1]){const r=addMesh(new THREE.BoxGeometry(w+1,0.18,d*0.72),o.roof||K5ROOF,0,0.9,s*d*0.3,roof);r.rotation.x=s*0.62;}
  addMesh(new THREE.BoxGeometry(0.9,1.0,0.12),K5WIN,0,1.4,d/2+0.24,g);addMesh(new THREE.BoxGeometry(1.2,0.12,0.3),K5LOG2,0,0.8,d/2+0.3,g);
  W.boxes.push({minx:x-Math.max(w,d)/2-0.3,maxx:x+Math.max(w,d)/2+0.3,miny:-1,maxy:h+1.6,minz:z-Math.max(w,d)/2-0.3,maxz:z+Math.max(w,d)/2+0.3,on:true,occ:false});return g;};
K5L.forge=(x,z,ry)=>{const g=k5Prop(new THREE.Group());g.position.set(x,0,z);g.rotation.y=ry||0;const st=M(0x7a7470),dk=M(0x2a2420);
  for(const [px,pz] of[[-2,-1.6],[2,-1.6],[-2,1.6],[2,1.6]])addMesh(new THREE.CylinderGeometry(0.18,0.2,3,6),K5LOG2,px,1.5,pz,g);
  const r=addMesh(new THREE.BoxGeometry(5,0.2,4),K5ROOF,0,3.1,0,g);r.rotation.x=0.12;addMesh(new THREE.BoxGeometry(1.6,1.2,1.4),st,-1.1,0.6,-1,g);addMesh(new THREE.CylinderGeometry(0.35,0.45,2.4,8),st,-1.1,2.6,-1,g);
  const fire=addMesh(new THREE.SphereGeometry(0.35,8,6),MB(0xff8a30),-1.1,1.25,-0.3,g);g.userData.fire=fire;addMesh(new THREE.BoxGeometry(0.9,0.6,0.5),dk,1,0.3,0.6,g);
  W.boxes.push({minx:x-2.6,maxx:x+2.6,miny:-1,maxy:3.4,minz:z-2.2,maxz:z+2.2,on:false,occ:false});return g;};
K5L.stall=(x,z,ry)=>{const g=k5Prop(new THREE.Group());g.position.set(x,0,z);g.rotation.y=ry||0;addMesh(new THREE.BoxGeometry(3.2,1,1.2),K5LOG,0,0.5,0,g);
  for(const s of[-1,1])addMesh(new THREE.CylinderGeometry(0.08,0.08,2.4,6),K5LOG2,s*1.5,1.6,-0.4,g);const aw=addMesh(new THREE.BoxGeometry(3.6,0.08,1.8),M(0xd84a3a),0,2.8,0.1,g);aw.rotation.x=0.25;
  for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(0.14,8,6),M([0xffc93c,0x7ad06a,0xd8743a,0xb07ad8,0x6ac4f0][i]),-1.2+i*0.6,1.1,0.2,g);W.cyls.push({x,z,r:1.4,miny:-1,maxy:1.2,on:true});return g;};
K5L.garden=(x,z)=>{const g=k5Prop(new THREE.Group());g.position.set(x,0,z);for(let i=0;i<4;i++){addMesh(new THREE.BoxGeometry(1.1,0.25,4),M(0x6a4a2a),-1.8+i*1.2,0.12,0,g);
    for(let j=0;j<4;j++)addMesh(new THREE.SphereGeometry(0.22,6,5),M(i%2?0x5aa040:0x8ac060),-1.8+i*1.2,0.35,-1.4+j*0.95,g);}return g;};
K5L.sand=(x0,x1,z0,z1)=>{const m=k5Prop(new THREE.Mesh(new THREE.PlaneGeometry(x1-x0,z1-z0),M(0xe8d4a0)));m.rotation.x=-Math.PI/2;m.position.set((x0+x1)/2,0.02,(z0+z1)/2);m.receiveShadow=true;return m;};
// волны у берега: белые гребни бегут к песку
K5L.waves=(x0,x1,z)=>{const g=k5Prop(new THREE.Group());const L=[];for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(x1-x0,0.35),k5eMB(0xffffff,{opacity:0.5}));m.rotation.x=-Math.PI/2;m.position.set((x0+x1)/2,-0.55,z+i*2.4);g.add(m);L.push(m);}
  g.userData.tick=dt=>{for(let i=0;i<L.length;i++){const m=L[i];m.position.z-=dt*1.6;if(m.position.z<z-0.4)m.position.z+=L.length*2.4;m.material.opacity=0.5*Math.min(1,(m.position.z-z)/3);}};return g;};

/* ---------- цепь вокруг дуба и Кот на ней ---------- */
K5L.LINKG=new THREE.TorusGeometry(0.2,0.06,5,10);
K5L.catRing=(c,r,y,kot)=>{const g=k5Prop(new THREE.Group());g.position.set(c.x,y,c.z);const n=46,gm=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.5});
  const im=new THREE.InstancedMesh(K5L.LINKG,gm,n),mm=new THREE.Matrix4(),q=new THREE.Quaternion(),e=new THREE.Euler();
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2;e.set(0,-a,i%2?Math.PI/2:0);q.setFromEuler(e);mm.compose(new V3(Math.cos(a)*r,Math.sin(a*3)*0.05,Math.sin(a)*r),q,new V3(1,1,1));im.setMatrixAt(i,mm);}
  g.add(im);const glow=k5Glow(0xffd76a,1.6);g.add(glow);
  // Кот — свой (makeKot) или прежний уровня; стоит в мировых координатах (ролики двигают его сами)
  if(!kot){kot=makeKot();kot.g.scale.setScalar(0.85);}
  const R={g,im,gm,kot,glow,a:Math.PI/2,r,c,y,on:true,set(a){R.a=a;const x=Math.cos(a)*r,z=Math.sin(a)*r;kot.g.position.set(c.x+x,y+0.12,c.z+z);kot.g.rotation.y=Math.PI-a;glow.position.set(x,0.1,z);}};
  return R;};
// чёрный замок на цепи Кота: сбить ударом снизу или рогаткой
K5L.lock=()=>{const g=new THREE.Group();const ir=M(0x1a1420,{emissive:0x4a1a7a,emissiveIntensity:0.6});addMesh(new THREE.BoxGeometry(0.55,0.5,0.22),ir,0,0,0,g);
  const sh=addMesh(new THREE.TorusGeometry(0.2,0.06,5,12,Math.PI),ir,0,0.26,0,g);addMesh(new THREE.CylinderGeometry(0.05,0.05,0.12,6),MB(0xc080ff),0,-0.02,0.12,g).rotation.x=Math.PI/2;
  const gl=k5Glow(0x9a50ff,1.4);g.add(gl);g.userData.glow=gl;K5L.noRay(g);return g;};
// чёрный ошейник-цепь на друге: кольцо звеньев с фиолетовым отсветом; break() — звенья разлетаются золотом
K5L.collar=(parent,y,r)=>{const g=new THREE.Group();g.position.y=y;parent.add(g);const n=12,ir=M(0x16101e,{emissive:0x3a1060,emissiveIntensity:0.6});
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2;const l=new THREE.Mesh(K5L.LINKG,ir);l.position.set(Math.cos(a)*r,0,Math.sin(a)*r);l.rotation.set(0,-a,i%2?Math.PI/2:0);l.scale.setScalar(1.3);g.add(l);}
  const pad=K5L.lock();pad.scale.setScalar(0.9);pad.position.set(0,-0.3,r+0.1);g.add(pad);const gl=k5Glow(0x8a40ff,r*3);g.add(gl);K5L.noRay(g);
  const C={g,pad,on:true,break(){if(!C.on)return;C.on=false;const p=g.getWorldPosition(new V3());K5L.gold(p,18);k5Flash(p,0xffd76a,3,0.4);K5L.ink(p,10);k5s('keyBreak');
    g.children.forEach((l,i)=>{const f=l.position.clone(),v=new V3(rand(-2,2),rand(1,3),rand(-2,2));k5fx(0.8,k=>{l.position.copy(f).addScaledVector(v,k);l.position.y-=k*k*3;l.scale.setScalar(1.3*(1-k));});});later(0.85,()=>k5Del(g));}};return C;};

/* ---------- страница-портал: лубочная картинка мира в рамке; open(k) — раскрывается ---------- */
K5L.lubok=w=>{const c=document.createElement('canvas');c.width=512;c.height=680;const g=c.getContext('2d');
  const bgc=['#f4e8c8','#e8f0d0','#d0e8f0','#e8e0f8','#f8dcc8'][w]||'#f4e8c8';g.fillStyle=bgc;g.fillRect(0,0,512,680);
  g.strokeStyle='#8a2a1a';g.lineWidth=14;g.strokeRect(16,16,480,648);g.strokeStyle='#c89a20';g.lineWidth=4;g.strokeRect(34,34,444,612);
  const ink='#2a1a3a';g.lineWidth=6;g.strokeStyle=ink;g.fillStyle=ink;
  if(w===1){for(let i=0;i<5;i++){const x=70+i*95,y=520;g.beginPath();g.moveTo(x,y);g.lineTo(x-40,y);g.lineTo(x,y-200);g.lineTo(x+40,y);g.closePath();g.fillStyle='#3a6a3a';g.fill();g.stroke();}
    g.fillStyle='#8a5a34';g.fillRect(190,250,140,110);g.strokeRect(190,250,140,110);g.beginPath();g.moveTo(170,255);g.lineTo(260,190);g.lineTo(350,255);g.closePath();g.fillStyle='#7a3a2a';g.fill();g.stroke();
    for(const s of[-1,1]){g.beginPath();g.moveTo(260+s*40,360);g.lineTo(260+s*55,440);g.lineTo(260+s*80,450);g.stroke();}}
  else if(w===2){g.fillStyle='#4a90b8';g.fillRect(40,300,432,340);for(let i=0;i<4;i++){const x=110+i*95;g.fillStyle='#f4f0e0';g.fillRect(x-25,330,50,150);g.strokeRect(x-25,330,50,150);g.fillStyle='#e8b830';g.beginPath();g.arc(x,320,26,Math.PI,0);g.fill();g.stroke();}
    g.strokeStyle='#ffffff';for(let i=0;i<6;i++){g.beginPath();g.arc(80+i*70,290,22,Math.PI,0);g.stroke();}}
  else if(w===3){for(let i=0;i<6;i++){g.fillStyle='#ffffff';g.beginPath();g.arc(90+i*70,470+Math.sin(i)*30,50,0,7);g.fill();}g.strokeStyle='#c89a20';g.lineWidth=8;g.strokeRect(190,180,130,170);for(let i=1;i<4;i++){g.beginPath();g.moveTo(190+i*33,180);g.lineTo(190+i*33,350);g.stroke();}
    g.fillStyle='#ff8a20';g.beginPath();g.ellipse(255,265,34,22,0,0,7);g.fill();g.fillStyle='#ffd030';g.beginPath();g.moveTo(280,265);g.lineTo(330,240);g.lineTo(330,290);g.fill();}
  else if(w===4){g.fillStyle='#c84a20';g.fillRect(40,420,432,220);g.fillStyle='#8a5a34';g.fillRect(60,380,392,30);for(let i=0;i<8;i++)g.fillRect(70+i*48,410,12,40);
    g.fillStyle='#3a7a3a';for(let i=0;i<3;i++){g.beginPath();g.arc(190+i*65,200,34,0,7);g.fill();g.stroke();g.fillRect(180+i*65,230,22,120);}g.fillRect(150,320,220,70);}
  g.fillStyle='#8a2a1a';g.font='italic 700 40px Georgia,serif';g.textAlign='center';g.fillText(['','Дремучий лес','Подводный Китеж','Небесное царство','Огненная Смородина'][w]||'',256,110);
  // чернила Кощея поверх: потёки сверху
  g.fillStyle='rgba(30,10,50,0.85)';for(let i=0;i<9;i++){const x=40+i*52+Math.random()*20,l=60+Math.random()*180;g.fillRect(x,30,14,l);g.beginPath();g.arc(x+7,30+l,9,0,7);g.fill();}
  return new THREE.CanvasTexture(c);};
K5L.page=(p,face,w)=>{const g=k5Prop(new THREE.Group());g.position.set(p.x,0,p.z);g.rotation.y=face;
  const tex=K5L.lubok(w);const leaf=new THREE.Mesh(new THREE.PlaneGeometry(3.2,4.25),new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide,transparent:true,fog:false}));leaf.position.y=2.35;g.add(leaf);
  const back=new THREE.Mesh(new THREE.PlaneGeometry(3.3,4.35),MB(0xe8dcc0,{side:THREE.BackSide}));back.position.set(0,2.35,-0.01);g.add(back);
  const halo=k5Glow(0xffd76a,6);halo.position.set(0,2.35,-0.3);halo.material.opacity=0.5;g.add(halo);
  const sill=new THREE.Mesh(new THREE.RingGeometry(1.5,1.8,40),k5Add(0xffd76a,{opacity:0.7}));sill.rotation.x=-Math.PI/2;sill.position.set(0,0.06,1.2);g.add(sill);
  K5L.noRay(g);const P={g,leaf,halo,sill,w,pos:new V3(p.x,0,p.z).add(new V3(Math.sin(face)*1.2,0,Math.cos(face)*1.2)),
    tick(dt){leaf.rotation.y=Math.sin(G.time*1.3+w)*0.05;leaf.position.y=2.35+Math.sin(G.time*1.7+w)*0.08;halo.material.opacity=0.35+0.2*Math.sin(G.time*2+w);sill.material.opacity=0.45+0.3*Math.sin(G.time*4);}};return P;};

/* ---------- «оркестр собирается»: тема Лукоморья, к которой каждый освобождённый друг добавляет свой инструмент ---------- */
// n — сколько друзей уже в оркестре (0…12); mode: 'ink' — минор, барабан; 'song' — Кот направо; 'tale' — Кот налево (тише, гусли);
// 'storm', 'gold'. Темы кэшируются в FIN.music.TR под ключом k5e_<mode>_<n>.
K5L.INSTR=[
  {i:'pluck',oct:12,vol:0.03,seq:[[[0,.5],[2,.5],[4,1],[2,.5],[0,.5],[null,1]]]},                                        // Кот — балалайка
  {i:'flute',oct:12,vol:0.035,every:2,seq:[[[4,2],[5,1],[4,1],[2,2],[0,2],[null,8]]]},                                 // Леший — свирель
  {i:'tamb',drum:'x.x.x.x.x.x.x.x.',vol:0.012},                                                                     // Кикимора — прялка
  {i:'frame',drum:'x...x..xx...x...',vol:0.035},                                                                    // Яга — бубен
  {i:'bell',oct:0,vol:0.02,every:2,seq:[[[0,4],[4,4],[2,4],[0,4]]]},                                                    // Водяной — колокола
  {i:'harp',oct:0,vol:0.03,seq:[[[0,.25],[2,.25],[4,.25],[7,.25],[4,.25],[2,.25],[0,.5],[null,2]]]},                    // Садко — гусли
  {i:'bell',oct:24,vol:0.012,seq:[[[4,1],[7,1],[9,2],[null,4]]]},                                                       // Жар-птица — челеста
  {i:'flute',oct:24,vol:0.022,every:2,seq:[[[7,.5],[9,.5],[7,.5],[9,.5],[11,1],[null,5]]]},                             // Соловей — свист
  {i:'drone',oct:-12,vol:0.03,every:4,seq:[[[0,8],[4,8]]]},                                                            // Горыныч — три трубы
  {i:'kick',drum:'x.......x.......',vol:0.06},                                                                       // богатыри — шаг
  {i:'drone',oct:0,vol:0.02,every:4,seq:[[[2,8],[4,8]]]},                                                             // хор витязей
  {i:'pluck',oct:-12,vol:0.04,seq:[[[0,1],[4,1],[0,1],[4,1]]]}];                                                       // кузнецы — наковальня
K5L.music=(mode,n)=>{const MU=FIN.music;if(!MU||!MU.TR)return;const TR=MU.TR,key='k5e_'+mode+'_'+n;
  if(!TR[key]&&TR.hub){const T=JSON.parse(JSON.stringify(TR.hub));T.v=T.v.filter(v=>!v.drum);
    if(mode==='ink'||mode==='song'||mode==='storm'){T.sc='aeo';T.root=(TR.hub.root||55)-7;T.bpm=mode==='storm'?124:mode==='song'?112:100;T.v.push({i:'kick',drum:'x...x...x...x.x.',vol:0.07},{i:'drone',oct:-12,vol:0.03,every:4,seq:[[[0,16]]]});}
    else if(mode==='tale'){T.sc='dor';T.bpm=84;T.v.forEach(v=>{v.vol=(v.vol||0.04)*0.7;});T.v.push({i:'harp',oct:0,vol:0.03,seq:[[[0,.5],[4,.5],[7,.5],[4,.5]]]});}
    else if(mode==='gold'){T.sc='ion';T.bpm=96;}
    for(let i=0;i<Math.min(n,K5L.INSTR.length);i++)T.v.push(JSON.parse(JSON.stringify(K5L.INSTR[i])));TR[key]=T;}
  MU.play(key);};

/* ---------- строка пролога: над полем (DOM) и золотые строки в небе над дубом ---------- */
K5L.hud=(()=>{let el=null,last='';const H={};
  H.show=(n,k,spes,max,note)=>{if(!el){el=document.createElement('div');el.id='k5eLine';el.style.cssText='position:fixed;left:50%;top:10px;transform:translateX(-50%);z-index:30;margin-top:44px;text-align:center;pointer-events:none;font:italic 700 clamp(15px,2.2vw,24px) Georgia,serif;text-shadow:0 2px 6px rgba(0,0,0,.6);max-width:92vw';document.body.appendChild(el);}
    el.style.display='block';const t=K5L.LINES[n]||'';const m=Math.round(t.length*Math.max(0,Math.min(1,k)));
    const pips=max?' <span style="font:600 13px system-ui;letter-spacing:2px;color:#ff9a3a;font-style:normal">'+'●'.repeat(Math.max(0,spes))+'<span style="opacity:.3">'+'●'.repeat(Math.max(0,max-spes))+'</span></span>':'';
    const bb=document.getElementById('bossbar');
    if(bb){if(n>0){const nm=String((K5E.NAMES||[])[n]||'').replace(/^\d+ · /,'');const bh='<b style="color:#ffd76a">Кощей</b> · стадия '+n+' / 12 · '+nm+' <span style="font-style:normal">⏳</span> <span class="seg"><i style="width:'+Math.round(Math.max(0,Math.min(1,k))*100)+'%;background:#c8a8ff"></i></span>';
        bb.style.cssText='display:block;border-color:#c8a8ff;font-size:22px';if(bb.innerHTML!==bh)bb.innerHTML=bh;}else bb.style.display='none';}
    // строка — сразу под полосой стадии, а не поверх неё (у полосы шрифт 22px — она выше, чем рассчитано в стиле)
    {const r=bb&&bb.style.display!=='none'?bb.getBoundingClientRect():null;el.style.marginTop=r&&r.height?'0':'44px';el.style.top=(r&&r.height?Math.round(r.bottom+6):10)+'px';}
    const html=(note?'<div style="font:600 22px system-ui;letter-spacing:1px;color:#c8a8ff;font-style:normal">'+note+'</div>':'')+
      '<span style="color:#ffd76a">'+t.slice(0,m)+'</span><span style="color:#3a1c58;-webkit-text-stroke:0.6px #a070e0;filter:blur(0.3px)">'+t.slice(m)+'</span>'+pips;
    if(html!==last){el.innerHTML=html;last=html;}};
  H.hide=()=>{if(el)el.style.display='none';last='';const bb=document.getElementById('bossbar');if(bb&&bb.style.fontSize==='22px'){bb.style.display='none';bb.style.fontSize='';}};return H;})();
// золотые строки над дубом: add(n) — строка встаёт со вспышкой
K5L.sky=(oak)=>{const g=k5Prop(new THREE.Group());g.position.set(oak.x,0,oak.z);const S={g,lines:{},add(n,fx){if(S.lines[n])return;const s=K5L.textSpr(K5L.LINES[n],13,{col:'#ffe08a',glow:'#ffb030',stroke:'#5a3a08'});
    const i=Object.keys(S.lines).length;s.position.set(0,24-i*1.35,-3);g.add(s);S.lines[n]=s;if(fx){s.material.opacity=0;k5fx(1.2,k=>{s.material.opacity=k;s.scale.set(13*(0.6+0.4*k),13*(0.6+0.4*k)/8,1);});K5L.gold(s.getWorldPosition(new V3()),24);}}};return S;};
