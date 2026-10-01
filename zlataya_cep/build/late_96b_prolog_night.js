/* ============================== РЕЛИЗ final06 · ПРОЛОГ: КОМНАТА ШТАБА, ОКНО В НОЧЬ, ПОГОНЯ КОЩЕЯ, ОЖИВШАЯ ТЕТРАДКА ============================== */
// Комната в штабе-сосне была пустоватой, окно — плоской картинкой (луна, звёзды), Кощей — плоская тень, медленно ползущая по луне,
// Звенышко падало сверху в тетрадку, а рисунок в тетрадке (дуб, цепь, рука) проступал невнятными значками.
// Теперь (всё — только в прологе, прототип не меняется):
//  · комната обставлена: полки с книгами и банками, карта леса, детские рисунки Тишки, часы с маятником, флажки и гирлянда
//    огоньков под краем стены, связки трав и грибов, занавески, сундук, бочонок мёда, корзина шишек, подушки, игрушки,
//    огород Йоши под окном, подзорная труба Пелагеи, свечи на столе, лунный луч из окна;
//    игрушки откликаются на героев (мяч подпрыгивает, лошадка качается, юла крутится), а тетрадка Пелагеи на столе,
//    если подойти к ней, раскрывается книжкой-раскладушкой: из страницы встают четверо друзей и машут; прыжок у стола — фигурки
//    прыгают волной (фигурка героя — выше всех), удар — кружатся;
//  · окно — настоящее: за стеклом своя маленькая сцена (ночное небо, луна, звёзды, тучи, верхушки елей), она рисуется той же
//    камерой в текстуру и видна в окне с правильной перспективой;
//  · ролик «Колыбельная»: налетают тучи, луна гаснет, вороны, молнии — вдали на туче Кощей; к окну, петляя, мчится золотая искра —
//    Звенышко, Кощей нагоняет и тянет руку; Звенышко влетает в окно, мечется по комнате и прячется в тетрадке Пелагеи;
//    по полу проносится тень Кощея, стекло затягивает инеем, Кощей заглядывает в окно горящими глазами, ищет — и улетает;
//  · рисунок в тетрадке — книжка-раскладушка с моушн-дизайном: из страницы встают холм и дуб, вокруг дуба звено за звеном
//    рисуется златая цепь, по ней идёт кот и поёт; наползает туча, из неё спускается костлявая рука в перстне, рвёт цепь —
//    звенья выпрыгивают из книжки и разлетаются по комнате, кот каменеет, дуб облетает; раскладушка складывается;
//    Звенышко выпрыгивает из тетрадки и смотрит книжку сбоку;
//  · в конце Звенышко зовёт за собой не в окно (там Кощей), а к двери.
// Ролик прототипа оборачивает late_96 (FIN.lulGag), здесь — вторая обёртка поверх неё (FIN.lulGag заменена); длина ролика та же,
// метки режиссуры late_86 для пролога поправлены под новые события. Комната и окно строятся из buildPrologue (FIN.proRoom,
// вызов вставляет rep_30_gameplay.py).
const PN={ctx:null,ps:null,rt:null,disc:null,discMat:null,discOld:null,painted:[],portal:false,want:false,t:-1,anim:[],toys:[],nbPop:null,bunting:[],bulbs:[],herbs:[],clock:null,curtains:[],candles:[],beam:null,frost:0,pop:null,scene:null};
const PNV=(x,y,z)=>new V3(x,y,z);
function pnNoBatch(o){o.traverse(c=>{c.userData.batchNo=true;c.userData.noBatchL=true;});return o;}
function pnMesh(geo,col,o){o=o||{};const m=new THREE.Mesh(geo,o.mat||new THREE.MeshLambertMaterial(Object.assign({color:col},o.m||{})));m.castShadow=!!o.shadow;m.receiveShadow=o.recv!==false;return m;}
function pnAdd(parent,geo,col,x,y,z,o){const m=pnMesh(geo,col,o);m.position.set(x,y,z);(parent||W.group).add(m);return m;}
// точка на стене штаба (угол a — как в buildPrologue: x=sin(a)·r, z=cos(a)·r), смотрит в комнату
function pnWall(a,y,R,off){const r=R-(off==null?0.12:off),g=new THREE.Group();g.position.set(Math.sin(a)*r,y,Math.cos(a)*r);g.lookAt(0,y,0);W.group.add(g);return g;}
function pnCanvas(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');draw(x,w,h);const t=new THREE.CanvasTexture(c);t.anisotropy=4;return t;}
// ---------- рисунки на холсте: карта леса, рисунки Тишки, циферблат ----------
function pnDrawMap(x,w,h){x.fillStyle='#ead6a6';x.fillRect(0,0,w,h);x.strokeStyle='#8a6a3a';x.lineWidth=10;x.strokeRect(5,5,w-10,h-10);
  x.fillStyle='rgba(120,80,30,.12)';for(let i=0;i<40;i++){x.beginPath();x.arc(Math.random()*w,Math.random()*h,Math.random()*30+8,0,7);x.fill();}
  x.strokeStyle='#4a86c8';x.lineWidth=12;x.beginPath();x.moveTo(20,h*0.75);x.bezierCurveTo(w*0.3,h*0.55,w*0.45,h*0.95,w-20,h*0.7);x.stroke();
  x.setLineDash([14,12]);x.strokeStyle='#8a4a2a';x.lineWidth=6;x.beginPath();x.moveTo(w*0.12,h*0.3);x.bezierCurveTo(w*0.35,h*0.15,w*0.55,h*0.5,w*0.8,h*0.28);x.stroke();x.setLineDash([]);
  const tree=(tx,ty,s)=>{x.fillStyle='#5a3a1a';x.fillRect(tx-3*s,ty,6*s,14*s);x.fillStyle='#3f8a44';x.beginPath();x.moveTo(tx,ty-26*s);x.lineTo(tx+14*s,ty+2);x.lineTo(tx-14*s,ty+2);x.fill();};
  for(let i=0;i<26;i++)tree(30+Math.random()*(w-60),40+Math.random()*(h*0.45),0.8+Math.random()*0.5);
  // дуб у Лукоморья с золотой цепью
  x.fillStyle='#5a3a1a';x.fillRect(w*0.8-8,h*0.28,16,40);x.fillStyle='#2f7a3a';x.beginPath();x.arc(w*0.8,h*0.24,34,0,7);x.fill();
  x.strokeStyle='#f0b020';x.lineWidth=5;x.beginPath();x.arc(w*0.8,h*0.3,24,0.2,2.9);x.stroke();
  x.fillStyle='#c02a2a';x.font='bold 60px sans-serif';x.fillText('✕',w*0.14,h*0.36);
  // роза ветров
  x.save();x.translate(w*0.88,h*0.82);x.fillStyle='#8a4a2a';for(let k=0;k<4;k++){x.rotate(Math.PI/2);x.beginPath();x.moveTo(0,-36);x.lineTo(8,0);x.lineTo(-8,0);x.fill();}x.restore();}
function pnDrawKid(n){return (x,w,h)=>{x.fillStyle='#fbf6ea';x.fillRect(0,0,w,h);x.lineCap='round';x.lineJoin='round';x.lineWidth=7;
  if(n===0){x.fillStyle='#ffcf30';x.beginPath();x.arc(w*0.72,h*0.26,34,0,7);x.fill();x.strokeStyle='#ffcf30';for(let k=0;k<10;k++){const a=k*0.63;x.beginPath();x.moveTo(w*0.72+Math.cos(a)*44,h*0.26+Math.sin(a)*44);x.lineTo(w*0.72+Math.cos(a)*62,h*0.26+Math.sin(a)*62);x.stroke();}
    x.fillStyle='#c0503a';x.fillRect(w*0.18,h*0.55,w*0.36,h*0.3);x.fillStyle='#8a3a2a';x.beginPath();x.moveTo(w*0.12,h*0.56);x.lineTo(w*0.36,h*0.36);x.lineTo(w*0.6,h*0.56);x.fill();
    x.fillStyle='#ffe08a';x.fillRect(w*0.3,h*0.64,w*0.1,h*0.1);x.strokeStyle='#3f8a44';x.beginPath();x.moveTo(0,h*0.88);x.lineTo(w,h*0.86);x.stroke();}
  else if(n===1){const cols=['#f08a30','#8a5a32','#b88ae0','#3ac0b8'];cols.forEach((c,i)=>{const cx=w*(0.16+i*0.23),cy=h*0.5;x.strokeStyle=c;x.fillStyle=c;x.beginPath();x.arc(cx,cy-30,20,0,7);x.fill();
      x.beginPath();x.moveTo(cx,cy-10);x.lineTo(cx,cy+40);x.moveTo(cx,cy+40);x.lineTo(cx-16,cy+74);x.moveTo(cx,cy+40);x.lineTo(cx+16,cy+74);x.moveTo(cx-22,cy+8);x.lineTo(cx+22,cy+8);x.stroke();
      x.fillStyle='#222';x.beginPath();x.arc(cx-7,cy-33,3,0,7);x.arc(cx+7,cy-33,3,0,7);x.fill();});
    x.strokeStyle='#e04a4a';x.beginPath();x.moveTo(w*0.3,h*0.18);x.bezierCurveTo(w*0.25,h*0.06,w*0.12,h*0.16,w*0.3,h*0.28);x.bezierCurveTo(w*0.48,h*0.16,w*0.35,h*0.06,w*0.3,h*0.18);x.stroke();}
  else{x.fillStyle='#5a3a1a';x.fillRect(w*0.45,h*0.5,w*0.1,h*0.4);x.fillStyle='#3f8a44';x.beginPath();x.arc(w*0.5,h*0.4,w*0.28,0,7);x.fill();
    x.strokeStyle='#f0b020';x.lineWidth=6;for(let k=0;k<7;k++){x.beginPath();x.ellipse(w*(0.24+k*0.087),h*(0.62+Math.sin(k*0.9)*0.03),9,6,0,0,7);x.stroke();}
    x.fillStyle='#8a8a92';x.beginPath();x.ellipse(w*0.62,h*0.56,18,12,0,0,7);x.arc(w*0.7,h*0.5,10,0,7);x.fill();}};}
function pnDrawClock(x,w,h){x.fillStyle='#f6ecd2';x.beginPath();x.arc(w/2,h/2,w*0.48,0,7);x.fill();x.strokeStyle='#6a4424';x.lineWidth=12;x.stroke();
  x.fillStyle='#4a2a14';x.font='bold 34px serif';x.textAlign='center';x.textBaseline='middle';for(let k=1;k<=12;k++){const a=k/12*Math.PI*2;x.fillText(String(k),w/2+Math.sin(a)*w*0.36,h/2-Math.cos(a)*h*0.36);}}
// ---------- мелочи: книги, банки, игрушки ----------
const PN_BOOK=[0xb0403a,0x3a6ab0,0x3f8a44,0xd0a030,0x7a4a9a,0xc06a2a,0x2a8a8a];
function pnBooks(parent,x0,y,z,n,dir){let x=x0;for(let i=0;i<n;i++){const h=rand(0.22,0.32),t=rand(0.04,0.07),b=pnAdd(parent,new THREE.BoxGeometry(t,h,0.18),PN_BOOK[(i*3+n)%PN_BOOK.length],x,y+h/2,z);
    if(i===n-1&&n>3)b.rotation.z=0.35*(dir||1);x+=t+0.008;}return x;}
function pnJar(parent,x,y,z,col,glow){const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);
  pnAdd(g,new THREE.CylinderGeometry(0.075,0.08,0.18,10),col,0,0.09,0,{m:{emissive:glow?col:0x000000,emissiveIntensity:glow?0.6:0,transparent:true,opacity:0.85}});
  pnAdd(g,new THREE.CylinderGeometry(0.06,0.06,0.04,10),0x8a5a32,0,0.2,0);return g;}
// ---------- обстановка ----------
function pnDress(c){const R=c.R,mark=W.group.children.length,wallDecor=[];
  const wall=(a,y,off)=>{const g=pnWall(a,y,R,off);wallDecor.push(g);return g;};
  // полка над столом Пелагеи: книги, банки (одна — со светлячками), шишка, кораблик
  {const s=wall(Math.PI-0.42,2.05);pnAdd(s,new THREE.BoxGeometry(1.5,0.05,0.3),0x8a5a32,0,0,0.15);for(const x of[-0.6,0.6])pnAdd(s,new THREE.BoxGeometry(0.04,0.22,0.24),0x6a4424,x,-0.12,0.12);
   const e=pnBooks(s,-0.68,0.025,0.15,6,1);pnJar(s,e+0.12,0.025,0.15,0x7ad0ff,false);const jf=pnJar(s,e+0.32,0.025,0.15,0xffe070,true);PN.anim.push(t=>{jf.children[0].material.emissiveIntensity=0.45+0.35*Math.sin(t*3.1);});
   pnAdd(s,new THREE.ConeGeometry(0.05,0.12,7),0x7a4a22,0.62,0.085,0.15);
   const s2=wall(Math.PI-0.42,2.75);pnAdd(s2,new THREE.BoxGeometry(1.2,0.05,0.28),0x8a5a32,0,0,0.14);const e2=pnBooks(s2,-0.52,0.025,0.14,4,-1);pnJar(s2,e2+0.15,0.025,0.14,0xe07a5a,false);
   const boat=new THREE.Group();boat.position.set(0.38,0.06,0.14);s2.add(boat);pnAdd(boat,new THREE.BoxGeometry(0.26,0.06,0.09),0xc0503a,0,0,0);pnAdd(boat,new THREE.CylinderGeometry(0.008,0.008,0.22,4),0x5a3a1a,0,0.12,0);
   const sail=new THREE.Shape();sail.moveTo(0,0);sail.lineTo(0,0.17);sail.lineTo(0.11,0.02);sail.lineTo(0,0);pnAdd(boat,new THREE.ShapeGeometry(sail),0xfff4e0,0.01,0.04,0,{m:{side:THREE.DoubleSide}});}
  // карта леса — над лесенкой Тишки
  {const s=wall(Math.PI+1.02,2.45);const tex=pnCanvas(512,384,pnDrawMap);pnAdd(s,new THREE.PlaneGeometry(1.6,1.2),0xffffff,0,0,0.02,{m:{map:tex}});
   for(const[x,y]of[[-0.72,0.52],[0.72,0.52]])pnAdd(s,new THREE.SphereGeometry(0.035,8,6),0xc02a2a,x,y,0.04);}
  // рисунки Тишки — пониже, у лесенки
  [[Math.PI+0.86,1.35,0.06],[Math.PI+0.98,1.55,-0.08],[Math.PI+1.14,1.3,0.1]].forEach(([a,y,r],i)=>{const s=wall(a,y);const tex=pnCanvas(256,256,pnDrawKid(i));
    const p=pnAdd(s,new THREE.PlaneGeometry(0.55,0.55),0xffffff,0,0,0.02,{m:{map:tex}});p.rotation.z=r;pnAdd(s,new THREE.SphereGeometry(0.025,6,5),[0xe0b020,0x3a8ae0,0x4ab04a][i],0,0.24,0.04);});
  // доска с инструментами над верстаком Прошки
  {const s=wall(Math.PI+1.45,1.75);pnAdd(s,new THREE.BoxGeometry(1.5,0.9,0.04),0xb08050,0,0,0.02);
   for(let i=0;i<5;i++)for(let j=0;j<3;j++)pnAdd(s,new THREE.CylinderGeometry(0.012,0.012,0.02,5),0x5a3a1a,-0.6+i*0.3,-0.3+j*0.3,0.05).rotation.x=Math.PI/2;
   const hm=new THREE.Group();hm.position.set(-0.45,0.05,0.08);s.add(hm);pnAdd(hm,new THREE.BoxGeometry(0.04,0.42,0.04),0x8a5a32,0,0,0);pnAdd(hm,new THREE.BoxGeometry(0.2,0.08,0.08),0x707078,0,0.22,0);
   const wr=new THREE.Group();wr.position.set(0,0.05,0.08);s.add(wr);pnAdd(wr,new THREE.BoxGeometry(0.035,0.4,0.02),0x9a9aa2,0,0,0);pnAdd(wr,new THREE.TorusGeometry(0.05,0.018,6,10,4.6),0x9a9aa2,0,0.22,0);
   for(const[x,y,r]of[[0.42,0.12,0.13],[0.55,-0.2,0.09],[0.3,-0.25,0.07]]){const gr=pnAdd(s,new THREE.CylinderGeometry(r,r,0.03,10),0xc89a3a,x,y,0.07);gr.rotation.x=Math.PI/2;
     for(let k=0;k<8;k++){const tth=pnAdd(gr,new THREE.BoxGeometry(r*0.32,0.03,r*0.32),0xc89a3a,Math.cos(k*0.785)*r,0,Math.sin(k*0.785)*r);tth.rotation.y=-k*0.785;}}
   // запасной деревянный щит с солнцем
   const sh=wall(Math.PI+1.3,2.95);pnAdd(sh,new THREE.CylinderGeometry(0.34,0.34,0.05,18),0x9a6a3c,0,0,0.04).rotation.x=Math.PI/2;pnAdd(sh,new THREE.CylinderGeometry(0.15,0.15,0.06,14),0xf0b020,0,0,0.05).rotation.x=Math.PI/2;
   for(let k=0;k<8;k++){const ray=pnAdd(sh,new THREE.BoxGeometry(0.04,0.11,0.06),0xf0b020,Math.sin(k*0.785)*0.22,Math.cos(k*0.785)*0.22,0.05);ray.rotation.z=-k*0.785;}}
  // часы с маятником над дверью
  {const s=wall(Math.PI,3.45);const tex=pnCanvas(256,256,pnDrawClock);pnAdd(s,new THREE.CylinderGeometry(0.36,0.36,0.08,24),0x6a4424,0,0,0.04).rotation.x=Math.PI/2;
   pnAdd(s,new THREE.CircleGeometry(0.31,24),0xffffff,0,0,0.085,{m:{map:tex}});
   const hh=new THREE.Group(),mh=new THREE.Group();hh.position.z=0.095;mh.position.z=0.1;s.add(hh,mh);pnAdd(hh,new THREE.BoxGeometry(0.03,0.16,0.01),0x2a1a0a,0,0.07,0);pnAdd(mh,new THREE.BoxGeometry(0.02,0.24,0.01),0x2a1a0a,0,0.11,0);
   const pend=new THREE.Group();pend.position.set(0,-0.3,0.02);s.add(pend);pnAdd(pend,new THREE.BoxGeometry(0.015,0.4,0.01),0xb08a3a,0,-0.2,0);pnAdd(pend,new THREE.CylinderGeometry(0.07,0.07,0.02,14),0xe0b030,0,-0.42,0).rotation.x=Math.PI/2;
   PN.clock={hh,mh,pend};}
  // флажки и гирлянда огоньков по краю стены, связки трав и грибов
  {const A0=Math.PI/2+0.14,A1=Math.PI*1.5-0.14,N=24,P=[];for(let i=0;i<=N;i++){const a=lerp(A0,A1,i/N);P.push(PNV(Math.sin(a)*(R-0.25),3.95,Math.cos(a)*(R-0.25)));}
   const FC=[0xd8483a,0xf0b020,0x3f9a4a,0x3a7ac8,0xf08a30,0xb06ad0];const tri=new THREE.Shape();tri.moveTo(-0.13,0);tri.lineTo(0.13,0);tri.lineTo(0,-0.26);tri.lineTo(-0.13,0);const triG=new THREE.ShapeGeometry(tri);
   const BM=[0xffd27a,0xff9a6a,0xa8e0ff].map(cc=>new THREE.MeshLambertMaterial({color:cc,emissive:cc,emissiveIntensity:1}));
   for(let i=0;i<N;i++){const a=P[i],b=P[i+1],mid=a.clone().lerp(b,0.5);mid.y-=0.12;
     for(const[p,q]of[[a,mid],[mid,b]]){const L=p.distanceTo(q),cy=pnMesh(new THREE.CylinderGeometry(0.008,0.008,L,4),0xf4e8d0);cy.position.copy(p).lerp(q,0.5);cy.lookAt(q);cy.rotateX(Math.PI/2);W.group.add(cy);}
     const fg=new THREE.Group();fg.position.copy(mid);fg.lookAt(0,mid.y,0);W.group.add(fg);const f=pnMesh(triG,FC[i%FC.length],{m:{side:THREE.DoubleSide}});fg.add(f);PN.bunting.push({g:fg,ph:i*0.7,ry:fg.rotation.y});
     // огоньки — чуть ниже, на своей нитке
     const lb=P[i].clone().lerp(P[i+1],0.5);lb.y=3.42+0.05*Math.sin(i);const bulb=new THREE.Mesh(new THREE.SphereGeometry(0.045,8,6),BM[i%3]);bulb.position.copy(lb).multiplyScalar(0.985);bulb.position.y=lb.y;W.group.add(bulb);}
   PN.bulbMats=BM;
   for(const a of[Math.PI-1.22,Math.PI+1.2,Math.PI-0.66]){const top=PNV(Math.sin(a)*(R-0.35),3.9,Math.cos(a)*(R-0.35)),g=new THREE.Group();g.position.copy(top);W.group.add(g);
     pnAdd(g,new THREE.CylinderGeometry(0.006,0.006,0.9,4),0xd8c8a0,0,-0.45,0);
     for(let k=0;k<6;k++){const y=-0.25-k*0.11;if(a>Math.PI-0.7&&a<Math.PI-0.6){const cap=pnAdd(g,new THREE.SphereGeometry(0.05,8,5,0,6.3,0,1.6),0xa0503a,0,y,0);pnAdd(g,new THREE.CylinderGeometry(0.015,0.02,0.05,5),0xf0e6d0,0,y-0.03,0);}
       else{const lf=pnAdd(g,new THREE.ConeGeometry(0.05,0.16,5),[0x5a7a3a,0x7a8a3a,0x8a6a3a][k%3],Math.sin(k*2)*0.04,y,Math.cos(k*2)*0.04);lf.rotation.x=Math.PI;}}
     PN.herbs.push({g,ph:a*3});}}
  // занавески у окна
  {const w=c.win;for(const sgn of[-1,1]){const g=new THREE.Group();g.position.set(sgn*1.08,0.95,0.06);w.add(g);const geo=new THREE.PlaneGeometry(0.42,2.0,4,10);geo.translate(0,-1.0,0);
     const m=pnMesh(geo,0xb83a3a,{m:{side:THREE.DoubleSide}});g.add(m);const trim=pnMesh(new THREE.BoxGeometry(0.44,0.06,0.02),0xf0b020);trim.position.set(0,-1.95,0.01);g.add(trim);
     PN.curtains.push({g,m,geo,base:geo.attributes.position.array.slice(),sgn});}
   pnAdd(w,new THREE.CylinderGeometry(0.025,0.025,2.6,6),0x6a4424,0,0.98,0.07).rotation.z=Math.PI/2;}
  // сундук, бочонок мёда, корзина шишек
  {const ch=new THREE.Group();ch.position.set(-5.85,0,-2.55);ch.rotation.y=1.2;W.group.add(ch);pnAdd(ch,new THREE.BoxGeometry(0.95,0.5,0.58),0x8a5232,0,0.25,0,{shadow:true});
   pnAdd(ch,new THREE.CylinderGeometry(0.29,0.29,0.95,10,1,false,0,Math.PI),0x9a6038,0,0.5,0).rotation.z=Math.PI/2;
   for(const x of[-0.33,0.33])pnAdd(ch,new THREE.BoxGeometry(0.06,0.82,0.6),0x3a3a40,x,0.4,0);pnAdd(ch,new THREE.BoxGeometry(0.12,0.12,0.04),0xe0b030,0,0.42,0.3);W.cyls.push({x:-5.85,z:-2.55,r:0.55,miny:-1,maxy:0.8,on:true});}
  {const b=new THREE.Group();b.position.set(3.55,0,-5.45);W.group.add(b);pnAdd(b,new THREE.CylinderGeometry(0.34,0.3,0.7,12),0x9a6a3c,0,0.35,0,{shadow:true});
   for(const y of[0.12,0.58])pnAdd(b,new THREE.TorusGeometry(0.33,0.025,5,16),0x3a3a40,0,y,0).rotation.x=Math.PI/2;
   pnAdd(b,new THREE.CylinderGeometry(0.3,0.3,0.03,12),0xf0a020,0,0.71,0,{m:{emissive:0xb06000,emissiveIntensity:0.35}});const dr=pnAdd(b,new THREE.SphereGeometry(0.05,8,6),0xf0a020,0.28,0.6,0.05,{m:{emissive:0xb06000,emissiveIntensity:0.4}});dr.scale.y=1.6;
   const sp=pnAdd(b,new THREE.CylinderGeometry(0.02,0.02,0.4,5),0x8a5a32,0.1,0.85,0);sp.rotation.z=0.4;W.cyls.push({x:3.55,z:-5.45,r:0.4,miny:-1,maxy:0.8,on:true});}
  {const k=new THREE.Group();k.position.set(-3.3,0,-5.6);W.group.add(k);pnAdd(k,new THREE.CylinderGeometry(0.36,0.28,0.32,12,1,true),0xc89a5a,0,0.16,0,{m:{side:THREE.DoubleSide}});
   for(let i=0;i<7;i++)pnAdd(k,new THREE.ConeGeometry(0.07,0.17,7),0x7a4a22,rand(-0.18,0.18),0.3+rand(0,0.08),rand(-0.18,0.18)).rotation.set(rand(-1,1),0,rand(-1,1));W.cyls.push({x:-3.3,z:-5.6,r:0.38,miny:-1,maxy:0.5,on:true});}
  // огород Йоши под окном: столик с горшками, грибы, лейка
  {const g=new THREE.Group();g.position.set(4.55,0,-3.75);g.rotation.y=-0.85;W.group.add(g);pnAdd(g,new THREE.BoxGeometry(1.3,0.06,0.5),0x8a5a32,0,0.62,0);
   for(const x of[-0.55,0.55])for(const z of[-0.2,0.2])pnAdd(g,new THREE.BoxGeometry(0.05,0.6,0.05),0x6a4424,x,0.3,z);
   [[-0.4,0x3f9a4a],[0,0xd8483a],[0.4,0x8ad04a]].forEach(([x,col],i)=>{pnAdd(g,new THREE.CylinderGeometry(0.13,0.1,0.18,10),0xb85a3a,x,0.74,0);
     if(i===1){pnAdd(g,new THREE.SphereGeometry(0.12,10,6,0,6.3,0,1.6),col,x,0.95,0);pnAdd(g,new THREE.CylinderGeometry(0.03,0.04,0.12,6),0xf4ecd8,x,0.88,0);}
     else for(let k=0;k<5;k++){const l=pnAdd(g,new THREE.ConeGeometry(0.04,0.22,5),col,x+Math.sin(k*1.3)*0.05,0.92,Math.cos(k*1.3)*0.05);l.rotation.set(Math.cos(k*1.3)*0.5,0,-Math.sin(k*1.3)*0.5);}});
   const can=new THREE.Group();can.position.set(0.85,0,0.1);g.add(can);pnAdd(can,new THREE.CylinderGeometry(0.12,0.13,0.24,10),0x3ac0b8,0,0.12,0);const sp=pnAdd(can,new THREE.CylinderGeometry(0.02,0.03,0.28,6),0x3ac0b8,0.14,0.22,0);sp.rotation.z=-0.9;
   W.cyls.push({x:4.55,z:-3.75,r:0.62,miny:-1,maxy:0.8,on:true});}
  // подзорная труба Пелагеи смотрит в окно
  {const g=new THREE.Group();g.position.set(5.6,0,-1.1);W.group.add(g);for(let k=0;k<3;k++){const l=pnAdd(g,new THREE.CylinderGeometry(0.02,0.025,1.15,5),0x6a4424,Math.sin(k*2.1)*0.18,0.55,Math.cos(k*2.1)*0.18);l.rotation.set(Math.cos(k*2.1)*0.3,0,-Math.sin(k*2.1)*0.3);}
   const tb=new THREE.Group();tb.position.y=1.15;g.add(tb);tb.lookAt(c.winPos.x-5.6,c.winPos.y,c.winPos.z+1.1);pnAdd(tb,new THREE.CylinderGeometry(0.06,0.08,0.7,10),0xc89a3a,0,0,0).rotation.x=Math.PI/2;
   pnAdd(tb,new THREE.CylinderGeometry(0.09,0.09,0.06,10),0x6a4424,0,0,0.35).rotation.x=Math.PI/2;W.cyls.push({x:5.6,z:-1.1,r:0.3,miny:-1,maxy:1.5,on:true});}
  // подушки, коврик, игрушки (откликаются на героев)
  for(const[x,z,col,r]of[[-1.5,3.4,0xe0b040,0.3],[1.9,3.5,0x5a8ad0,-0.4],[0.3,3.9,0xd05a7a,0.1]]){const p=pnAdd(null,new THREE.SphereGeometry(0.34,10,6),col,x,0.12,z);p.scale.set(1,0.32,0.82);p.rotation.y=r;}
  {const rug=pnAdd(null,new THREE.CylinderGeometry(0.9,0.9,0.02,20),0x3a7ab0,4.5,0.012,-1.2);rug.scale.z=0.62;pnAdd(null,new THREE.TorusGeometry(0.8,0.03,4,24),0xf0e0b0,4.5,0.026,-1.2).rotation.x=Math.PI/2;}
  const toy=(g,x,z,kind)=>{g.position.set(x,0,z);W.group.add(g);pnNoBatch(g);PN.toys.push({g,kind,x,z,t:9,base:g.rotation.y});};
  {const g=new THREE.Group();const ball=pnAdd(g,new THREE.SphereGeometry(0.2,14,10),0xe04a4a,0,0.2,0);for(let k=0;k<3;k++){const st=pnAdd(g,new THREE.TorusGeometry(0.2,0.025,4,16),[0xffffff,0xf0c020,0x3a7ac8][k],0,0.2,0);st.rotation.y=k*1.05;}toy(g,3.5,3.2,'ball');}
  {const g=new THREE.Group();const rk=new THREE.Group();g.add(rk);pnAdd(rk,new THREE.TorusGeometry(0.4,0.03,5,16,2.2),0x8a5a32,0,0.42,0).rotation.set(0,Math.PI/2,Math.PI*0.5+0.47);
   pnAdd(rk,new THREE.BoxGeometry(0.16,0.2,0.5),0xe8d0a0,0,0.36,0);pnAdd(rk,new THREE.BoxGeometry(0.12,0.24,0.14),0xe8d0a0,0,0.55,0.24);pnAdd(rk,new THREE.BoxGeometry(0.1,0.1,0.14),0xe8d0a0,0,0.62,0.34);
   pnAdd(rk,new THREE.BoxGeometry(0.04,0.18,0.18),0xc0503a,0,0.66,0.18);for(const x of[-0.06,0.06])for(const z of[-0.18,0.18])pnAdd(rk,new THREE.BoxGeometry(0.04,0.2,0.04),0xe8d0a0,x,0.2,z);
   g.rotation.y=0.8;toy(g,-3.1,3.3,'horse');PN.toys[PN.toys.length-1].rk=rk;}
  {const g=new THREE.Group();const top=new THREE.Group();g.add(top);pnAdd(top,new THREE.ConeGeometry(0.16,0.2,12),0x3ac0b8,0,0.12,0).rotation.x=Math.PI;pnAdd(top,new THREE.CylinderGeometry(0.16,0.16,0.06,12),0xf0c020,0,0.24,0);
   pnAdd(top,new THREE.CylinderGeometry(0.02,0.02,0.12,6),0x8a5a32,0,0.33,0);toy(g,-3.25,-2.35,'top');PN.toys[PN.toys.length-1].top=top;}
  {const g=new THREE.Group();[[0,0.1,0,0xd8483a],[0.2,0.1,0.02,0x3a7ac8],[0.1,0.3,0.01,0xf0b020],[0.02,0.1,0.22,0x3f9a4a]].forEach(([x,y,z,col])=>{const b=pnAdd(g,new THREE.BoxGeometry(0.18,0.18,0.18),col,x,y,z);b.rotation.y=x*3;});toy(g,-2.9,-3.4,'blocks');}
  // свечи на столе
  for(const[x,z]of[[3.3,-1.75],[2.5,-2.45]]){const g=new THREE.Group();g.position.set(x,0.63,z);W.group.add(g);pnAdd(g,new THREE.CylinderGeometry(0.035,0.035,0.16,8),0xf4ecd8,0,0.08,0);
   const fl=new THREE.Mesh(new THREE.ConeGeometry(0.025,0.07,8),new THREE.MeshBasicMaterial({color:0xffc860}));fl.position.y=0.2;fl.userData.ph=PN.candles.length*1.7;g.add(fl);pnNoBatch(g);PN.candles.push(fl);}
  fadeable(wallDecor);
  // лунный луч из окна в комнату
  {const w=c.winPos,tgt=PNV(2.1,0,-1.4),len=w.distanceTo(tgt),geo=new THREE.CylinderGeometry(0.75,1.5,len,20,1,true);geo.translate(0,-len/2,0);
   const m=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0x9fb8ff,transparent:true,opacity:0.07,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));
   m.position.copy(w);m.lookAt(tgt);m.rotateX(-Math.PI/2);m.renderOrder=3;W.group.add(m);PN.beam=m;}
  // всё, что шевелится, — вне пачек статики
  for(const o of[...PN.bunting.map(b=>b.g),...PN.herbs.map(h=>h.g),...PN.curtains.map(cu=>cu.g),PN.clock.hh,PN.clock.mh,PN.clock.pend,PN.beam])pnNoBatch(o);
  W.group.children.slice(mark).forEach(o=>{if(o.isMesh&&o.material&&o.material.emissive&&o.material.emissiveIntensity>=1)pnNoBatch(o);});}
// ---------- книжка-раскладушка: бумажные фигурки встают со страницы на «петле» ----------
const PN_PAPER=0xfffaf0;
function pnPart(g,geo,col,x,y,z,sx,sy,o){o=o||{};const m=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({color:col,side:THREE.DoubleSide,emissive:col,emissiveIntensity:o.glow==null?0.18:o.glow}));
  m.position.set(x,y,z||0);m.scale.set(sx||1,sy||1,1);if(o.rz)m.rotation.z=o.rz;m.userData.dress=true;g.add(m);   // dress: без ореола late_27 (он мерил бы плоскую фигурку по оси z — спрайт на 4 м)
  if(o.edge!==false){const e=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({color:PN_PAPER,side:THREE.DoubleSide,emissive:0xfff4e0,emissiveIntensity:0.15}));e.position.set(x,y,(z||0)-0.0016);
    e.scale.set((sx||1)*1.16,(sy||1)*1.16,1);e.rotation.z=m.rotation.z;e.userData.dress=true;g.add(e);m.userData.edge=e;}
  return m;}
const PN_G={c:new THREE.CircleGeometry(1,24),r:new THREE.PlaneGeometry(1,1)};
function pnTri(ax,ay,bx,by,cx,cy){const s=new THREE.Shape();s.moveTo(ax,ay);s.lineTo(bx,by);s.lineTo(cx,cy);s.lineTo(ax,ay);return new THREE.ShapeGeometry(s);}
// карточка на петле: поворот вокруг нижнего края (плашмя на странице -π/2 → стоит 0), «выпрыгивает» с перелётом
function pnCard(root,z){const hinge=new THREE.Group();hinge.position.set(0,0,z);root.add(hinge);const card=new THREE.Group();hinge.add(card);hinge.rotation.x=-Math.PI/2;hinge.scale.setScalar(0.001);return {hinge,card};}
function pnCardAt(cd,u){const k=clamp(u,0,1);cd.hinge.scale.setScalar(Math.max(0.001,Math.min(1,k*3)));cd.hinge.rotation.x=-Math.PI/2*(1-(k<=0?0:CE.outBack(k)));}
// четверо друзей на страничке (комната): встают по очереди, машут; порядок — как PN_KINDS
const PN_KINDS=['proshka','potap','pelageya','yosha'];
function pnPatrolPop(nb){const root=new THREE.Group();root.position.set(0.155,0.052,0);root.rotation.z=-0.06;nb.g.add(root);const cards=[];
  const heroes=[
    {col:0xf08a30,ears:'tri',x:-0.1},{col:0x8a5a32,ears:'round',x:-0.035},{col:0xb88ae0,ears:'tuft',x:0.035},{col:0x3ac0b8,ears:'spike',x:0.1}];
  heroes.forEach((h,i)=>{const cd=pnCard(root,0.04-((i%2)*0.03));const c=cd.card;c.position.x=h.x;
    pnPart(c,PN_G.c,h.col,0,0.07,0,0.028,0.028);pnPart(c,PN_G.r,h.col,0,0.025,0,0.034,0.05);
    if(h.ears==='tri'){pnPart(c,pnTri(-0.025,0.08,-0.012,0.11,-0.004,0.088),h.col,0,0,0.001);pnPart(c,pnTri(0.025,0.08,0.012,0.11,0.004,0.088),h.col,0,0,0.001);pnPart(c,PN_G.c,0xfff4e0,0,0.062,0.002,0.013,0.01,{edge:false});}
    else if(h.ears==='round'){for(const s of[-1,1])pnPart(c,PN_G.c,h.col,s*0.022,0.095,-0.0005,0.011,0.011);}
    else if(h.ears==='tuft'){for(const s of[-1,1])pnPart(c,pnTri(s*0.026,0.085,s*0.014,0.112,s*0.006,0.09),h.col,0,0,0.001);for(const s of[-1,1])pnPart(c,PN_G.c,0xfff4e0,s*0.011,0.073,0.002,0.009,0.009,{edge:false});}
    else{for(let k=0;k<5;k++){const a=-0.9+k*0.45;pnPart(c,pnTri(Math.sin(a)*0.024,0.07+Math.cos(a)*0.024,Math.sin(a+0.2)*0.045,0.07+Math.cos(a+0.2)*0.045,Math.sin(a+0.4)*0.024,0.07+Math.cos(a+0.4)*0.024),0x2a8a8a,0,0,-0.0008,1,1,{edge:false});}}
    for(const s of[-1,1])pnPart(c,PN_G.c,0x2a1a10,s*0.009,0.074,0.003,0.004,0.005,{edge:false});
    cards.push(cd);});
  return {root,cards,k:0};}
// ---------- комната: живые мелочи, отклики игрушек, тетрадка-раскладушка ----------
function pnRoomTick(dt){const c=PN.ctx;if(!c||!W||W.levelId!=='p')return;const t=G.time,gust=PN.gust||0;
  for(const b of PN.bunting){b.g.rotation.x=0.12*Math.sin(t*1.6+b.ph)+gust*0.9*Math.sin(t*14+b.ph);}
  for(const h of PN.herbs){h.g.rotation.z=0.05*Math.sin(t*1.1+h.ph)+gust*0.35*Math.sin(t*11+h.ph);h.g.rotation.x=0.03*Math.sin(t*0.9+h.ph)+gust*0.25*Math.sin(t*9);}
  if(PN.bulbMats)PN.bulbMats.forEach((m,i)=>{m.emissiveIntensity=(PN.lampK==null?1:PN.lampK)*(0.75+0.35*Math.sin(t*2.2+i*2.1));});
  for(const f of PN.candles){f.scale.set(1,1+0.18*Math.sin(t*17+f.userData.ph)+0.12*Math.sin(t*7.3),1);f.rotation.z=0.12*Math.sin(t*5+f.userData.ph)+gust*0.6*Math.sin(t*20);}
  if(PN.clock){const k=PN.clock;k.pend.rotation.z=0.32*Math.sin(t*3.1);k.mh.rotation.z=-t*0.35;k.hh.rotation.z=-t*0.03-1.2;}
  for(const cu of PN.curtains){const P=cu.geo.attributes.position,B=cu.base;for(let i=0;i<P.count;i++){const y=B[i*3+1],k=clamp(-y/2,0,1);
      P.array[i*3+2]=B[i*3+2]+k*(0.03*Math.sin(t*1.7+y*3)+gust*0.45*(0.6+0.4*Math.sin(t*13+y*5)));P.array[i*3]=B[i*3]+cu.sgn*k*gust*0.12*Math.sin(t*9+y*4);}P.needsUpdate=true;}
  // игрушки: подошёл герой — откликается
  for(const y of PN.toys){y.t+=dt;const near=HEROES.some(h=>h.active&&h.g.visible&&hd(h.pos,y.g.position)<0.95);if(near&&y.t>1.6){y.t=0;
      if(y.kind==='ball')tone(520,0.12,'sine',0.08,780);else if(y.kind==='horse')tone(330,0.18,'triangle',0.06,280);else if(y.kind==='top')tone(880,0.4,'sine',0.04,1320);else tone(260,0.08,'square',0.04);}
    const u=y.t;
    if(y.kind==='ball'){const k=u<1.2?Math.abs(Math.sin(u*Math.PI*2.5))*(1.2-u)*0.55:0;y.g.position.y=k;y.g.rotation.x=-u*4*(u<1.2?1:0);}
    else if(y.kind==='horse'&&y.rk){y.rk.rotation.x=u<1.6?0.28*Math.sin(u*9)*(1.6-u)/1.6:0;}
    else if(y.kind==='top'&&y.top){const k=u<1.6?(1.6-u)/1.6:0;y.top.rotation.y+=dt*(2+28*k);y.top.rotation.z=0.08*Math.sin(t*6)*(1-k)+0.02;}
    else if(y.kind==='blocks'){y.g.position.y=u<0.4?Math.sin(u/0.4*Math.PI)*0.06:0;}}
  // тетрадка-раскладушка: подошёл герой к столу — друзья встают из страницы и машут
  if(PN.nbPop&&c.F.stage==='room'){const P=PN.nbPop,near=HEROES.some(h=>h.active&&h.g.visible&&hd(h.pos,c.nb.g.position)<1.5);const was=P.k;P.k=clamp(P.k+(near?dt*1.4:-dt*2),0,1);
    if(near&&was<=0.01&&P.k>0.01){SFX.dzin&&[0,4,7,12].forEach((d,i)=>tone(523*Math.pow(2,d/12),0.18,'triangle',0.05,null,i*0.09));c.nb.pg.emissiveIntensity=0.35;
      if(!P.hinted){P.hinted=true;floatText(c.nb.g.position.clone().add(PNV(0,1.05,0)),'Прыгни — и они запрыгают!','#ffe08a');}}
    if(!near&&c.nb.pg.emissiveIntensity>0)c.nb.pg.emissiveIntensity=Math.max(0,c.nb.pg.emissiveIntensity-dt);
    // игра с книжкой: герой у стола прыгнул — фигурки прыгают волной от его фигурки (она — выше всех), ударил — кружатся; звенит арпеджио
    if(P.k>0.9)for(const pi of[0,1]){const h=active(pi);if(!h||!h.g.visible||hd(h.pos,c.nb.g.position)>=1.5)continue;const j=tap(pi,'jump'),a=!j&&tap(pi,'attack');if(!j&&!a)continue;
      const me=PN_KINDS.indexOf(h.kind);P.taps=(P.taps||0)+1;P.cards.forEach((cd,i)=>{cd.fx={t0:t+(me<0?i:Math.abs(i-me))*0.07,kind:a?'spin':'hop',big:i===me};});
      [0,4,7,12].forEach((d,i)=>tone((a?659:523)*Math.pow(2,d/12),0.14,'triangle',0.045,null,i*0.07));c.nb.pg.emissiveIntensity=0.6;
      try{FX.sparkle(c.nb.g.position.clone().add(PNV(0,0.3,0)),6,0xffd24a);}catch(e){}}
    P.cards.forEach((cd,i)=>{pnCardAt(cd,P.k*1.6-i*0.15);cd.card.rotation.z=P.k>0.9?0.12*Math.sin(t*6+i*1.3):0;let y=0,r=0;const f=cd.fx;
      if(f){const u=(t-f.t0)/(f.kind==='hop'?0.5:0.6);if(u>=1)cd.fx=null;else if(u>=0){if(f.kind==='hop')y=Math.sin(u*Math.PI)*(f.big?0.07:0.04);else r=CE.outCubic(u)*Math.PI*2;}}
      cd.card.position.y=y;cd.card.rotation.y=r;});}
  else if(PN.nbPop&&PN.nbPop.k>0){PN.nbPop.k=0;PN.nbPop.cards.forEach(cd=>{pnCardAt(cd,0);cd.fx=null;cd.card.position.y=0;cd.card.rotation.y=0;});}}
// ---------- окно: своя сцена за стеклом, рисуется той же камерой в текстуру и видна в окне с правильной перспективой ----------
const PN_DISC_VS='varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
// иней: гладкий шум, нарастает от рамы к центру; в середине стекло остаётся полупрозрачным — силуэт и глаза Кощея читаются сквозь него
const PN_DISC_FS='uniform sampler2D tex;uniform vec2 res;uniform float frost;varying vec2 vUv;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}'+
  'float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h(i),h(i+vec2(1.0,0.0)),f.x),mix(h(i+vec2(0.0,1.0)),h(i+vec2(1.0,1.0)),f.x),f.y);}'+
  'void main(){vec2 uv=gl_FragCoord.xy/res;vec3 c=texture2D(tex,uv).rgb;vec2 q=vUv-0.5;float r=length(q)*2.0;'+
  'float sh=smoothstep(0.07,0.0,abs(q.x+q.y-0.2))*0.12+smoothstep(0.04,0.0,abs(q.x+q.y-0.34))*0.07;'+
  'float n=vn(vUv*7.0)*0.55+vn(vUv*19.0)*0.3+vn(vUv*47.0)*0.15;float fr=frost*smoothstep(1.05-frost,1.3-frost,r+(n-0.5)*0.55);'+
  'float a=fr*(0.42+0.48*smoothstep(0.35,0.95,r))*(0.85+0.3*n);float sp=step(0.985,h(floor(vUv*140.0)))*fr;'+
  'c=mix(c,vec3(0.8,0.92,1.0),clamp(a,0.0,0.92))+sp*0.35;c+=sh*(1.0-fr);c*=1.0-0.28*smoothstep(0.72,1.0,r);gl_FragColor=vec4(c,1.0);}';
const PN_SKY_FS='uniform vec3 top,hor;uniform float flash,cover,green;varying vec3 vP;void main(){vec3 d=normalize(vP);float y=d.y;'+
  'vec3 c=mix(hor,top,smoothstep(-0.15,0.65,y));c*=1.0-0.5*cover;c=mix(c,vec3(0.25,0.55,0.35),green*0.35);c+=vec3(0.75,0.82,1.0)*flash;gl_FragColor=vec4(c,1.0);}';
function pnGlowTex(col){return pnCanvas(128,128,(x,w,h)=>{const g=x.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);g.addColorStop(0,col);g.addColorStop(0.35,col.replace(/[\d.]+\)$/,'0.35)'));g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});}
function pnPortal(c){const C=c.winPos.clone(),f=new V3(C.x,0,C.z).normalize(),rt=new V3(-f.z,0,f.x),up=new V3(0,1,0);
  const P=(a,b,d)=>C.clone().addScaledVector(rt,a).addScaledVector(up,b).addScaledVector(f,d);
  const S=new THREE.Scene();S.fog=new THREE.Fog(0x0c1532,40,210);const K={S,C,f,rt,P};
  K.skyU={top:{value:new THREE.Color(0x0a1438)},hor:{value:new THREE.Color(0x24507a)},flash:{value:0},cover:{value:0},green:{value:0}};
  const sky=new THREE.Mesh(new THREE.SphereGeometry(190,24,14),new THREE.ShaderMaterial({uniforms:K.skyU,vertexShader:'varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:PN_SKY_FS,side:THREE.BackSide,depthWrite:false,fog:false}));
  sky.position.copy(C);sky.renderOrder=-10;S.add(sky);
  {const N=300,pos=new Float32Array(N*3);for(let i=0;i<N;i++){let v;do{v=new V3(rand(-1,1),rand(-0.05,1),rand(-1,1));}while(v.lengthSq()>1||v.dot(f)<0.15);v.normalize().multiplyScalar(175).add(C);pos.set([v.x,v.y,v.z],i*3);}
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));K.starM=new THREE.PointsMaterial({color:0xfff8e0,size:2.2,sizeAttenuation:false,transparent:true,depthWrite:false,fog:false});S.add(new THREE.Points(g,K.starM));}
  K.moon=new THREE.Mesh(new THREE.CircleGeometry(7,32),new THREE.MeshBasicMaterial({color:0xfff2c0,fog:false}));K.moon.position.copy(P(7,15,85));K.moon.lookAt(C);S.add(K.moon);
  K.halo=new THREE.Mesh(new THREE.PlaneGeometry(40,40),new THREE.MeshBasicMaterial({map:pnGlowTex('rgba(255,240,190,0.9)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));
  K.halo.position.copy(K.moon.position).addScaledVector(f,-1);K.halo.lookAt(C);S.add(K.halo);
  S.add(new THREE.HemisphereLight(0x5a6ab0,0x101018,0.9));const ml=new THREE.DirectionalLight(0xc8d8ff,0.7);ml.position.copy(K.moon.position);ml.target.position.copy(C);S.add(ml,ml.target);
  K.flashL=new THREE.AmbientLight(0xdfe8ff,0);S.add(K.flashL);
  // тучи: спокойные — по сторонам; грозовые — наползают на луну
  const cm=new THREE.MeshLambertMaterial({color:0x2c3658,flatShading:true});K.cloudM=cm;K.clouds=[];
  for(let i=0;i<11;i++){const g=new THREE.Group();const n=4+(i%3);for(let k=0;k<n;k++){const m=new THREE.Mesh(new THREE.IcosahedronGeometry(1,1),cm);m.position.set((k-n/2)*2.2+rand(-0.5,0.5),rand(-0.6,0.8),rand(-1,1));m.scale.set(rand(2.2,3.4),rand(1.1,1.8),rand(1.6,2.4));g.add(m);}
    const rest=P(i%2?rand(-55,-22):rand(24,55),rand(4,24),rand(55,95)),storm=P(rand(-6,20),rand(8,24),rand(62,80));g.position.copy(rest);g.scale.setScalar(rand(1.1,1.7));S.add(g);K.clouds.push({g,rest,storm,ph:rand(0,6)});}
  for(let i=0;i<16;i++){const s=rand(0.8,1.4),m=new THREE.Mesh(new THREE.ConeGeometry(2.4*s,8*s,7),new THREE.MeshLambertMaterial({color:0x0b1622}));m.position.copy(P(rand(-24,24),rand(-17,-10),rand(9,40)));S.add(m);}
  // Кощей: модель релиза, плащ, горящие глаза, зелёный свет, туча под ногами
  const ko=makeKoschei();S.add(ko.g);ko.g.visible=false;const B=ko.rig||{};K.ko=ko;
  const eyeM=new THREE.MeshBasicMaterial({color:0xb8ffc8,fog:false});K.eyes=[];if(B.head)for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(0.05,10,8),eyeM);e.position.set(s*0.1,0.06,0.2);e.scale.set(1.3,0.8,0.6);B.head.add(e);K.eyes.push(e);
    const gl=new THREE.Mesh(new THREE.PlaneGeometry(0.42,0.42),new THREE.MeshBasicMaterial({map:K.eyeTex||(K.eyeTex=pnGlowTex('rgba(150,255,170,1)')),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));gl.position.z=0.02;gl.scale.set(1/1.3,1/0.8,1);e.add(gl);e.userData.gl=gl;}
  K.koL=new THREE.PointLight(0x7aff9a,0,9,2);(B.head||ko.g).add(K.koL);K.koL.position.set(0,0.1,0.6);
  {const geo=new THREE.PlaneGeometry(1.6,2.8,6,12);geo.translate(0,-1.4,0);const m=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({color:0x2a1438,side:THREE.DoubleSide}));
   m.position.set(0,0.1,-0.3);m.rotation.x=0.12;(B.chest||ko.g).add(m);K.cape={m,geo,base:geo.attributes.position.array.slice()};}
  K.koCloud=new THREE.Group();ko.g.add(K.koCloud);for(let k=0;k<6;k++){const m=new THREE.Mesh(new THREE.IcosahedronGeometry(1,1),new THREE.MeshLambertMaterial({color:0x1c2036,flatShading:true}));
    m.position.set(Math.sin(k*1.05)*1.3,0.1+rand(-0.2,0.2),Math.cos(k*1.05)*1.1);m.scale.set(rand(0.9,1.3),rand(0.5,0.8),rand(0.9,1.3));K.koCloud.add(m);}
  if(B.armR)K.armR0=B.armR.rotation.clone();
  // вороны
  K.ravens=[];const rbm=new THREE.MeshLambertMaterial({color:0x0c0c14,side:THREE.DoubleSide});const wingG=pnTri(0,0,1.0,0.25,0.15,0.5);
  for(let i=0;i<7;i++){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.ConeGeometry(0.16,0.75,6),rbm);b.rotation.x=Math.PI/2;g.add(b);
    const wl=new THREE.Group(),wr=new THREE.Group();g.add(wl,wr);const a=new THREE.Mesh(wingG,rbm),bb=new THREE.Mesh(wingG,rbm);a.rotation.x=-Math.PI/2;bb.rotation.x=-Math.PI/2;bb.scale.x=-1;wl.add(a);wr.add(bb);
    g.visible=false;S.add(g);K.ravens.push({g,wl,wr,ph:i*1.3,o:new V3(rand(-1,1),rand(-0.6,0.6),rand(-1,1)).normalize().multiplyScalar(rand(2.6,4.6))});}
  // золотая искра — Звенышко за окном
  K.zg=new THREE.Group();S.add(K.zg);K.zg.visible=false;{const gm=new THREE.MeshBasicMaterial({color:0xffd24a,fog:false});const l=new THREE.Mesh(new THREE.TorusGeometry(0.15,0.055,10,20),gm);l.scale.set(1.6,2.3,1.6);K.zg.add(l);
   const hl=new THREE.Mesh(new THREE.PlaneGeometry(2.6,2.6),new THREE.MeshBasicMaterial({map:pnGlowTex('rgba(255,215,90,1)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));K.zg.add(hl);K.zHalo=hl;
   K.zL=new THREE.PointLight(0xffc860,2,14,2);K.zg.add(K.zL);}
  K.trail=[];for(let i=0;i<10;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:pnGlowTex('rgba(255,220,120,1)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,opacity:0.6}));m.visible=false;S.add(m);K.trail.push(m);}
  // стекло: прежний «нарисованный» круг и его луна/звёзды/ели — запасной вид (два экрана)
  const w=c.win;PN.painted=[];w.children.forEach(ch=>{if(ch.isMesh&&ch.geometry&&ch.geometry.type==='CircleGeometry'&&ch.geometry.parameters.radius>0.9)PN.disc=ch;else if(!(ch.isMesh&&ch.geometry&&ch.geometry.type==='TorusGeometry')&&ch!==c.shadow&&!PN.curtains.some(cu=>cu.g===ch)&&!(ch.isMesh&&ch.geometry.type==='CylinderGeometry'))PN.painted.push(ch);});
  if(PN.disc){PN.discOld=PN.disc.material;PN.discMat=new THREE.ShaderMaterial({uniforms:{tex:{value:null},res:{value:new THREE.Vector2(1,1)},frost:{value:0}},vertexShader:PN_DISC_VS,fragmentShader:PN_DISC_FS});pnNoBatch(PN.disc);}
  PN.ps=K;return K;}
function pnPortalMode(on){if(!PN.disc||PN.portal===on)return;PN.portal=on;PN.disc.material=on?PN.discMat:PN.discOld;PN.painted.forEach(o=>{o.visible=!on;});if(PN.ctx&&PN.ctx.shadow)PN.ctx.shadow.visible=false;}
const PN_FR=new THREE.Frustum(),PN_PM=new THREE.Matrix4(),PN_SPH=new THREE.Sphere(),PN_V2=new THREE.Vector2();
function pnPortalRender(cam,rr){const K=PN.ps;if(!K||!PN.disc)return;PN_PM.multiplyMatrices(cam.projectionMatrix,cam.matrixWorldInverse);PN_FR.setFromProjectionMatrix(PN_PM);PN_SPH.set(K.C,1.2);if(!PN_FR.intersectsSphere(PN_SPH))return;
  renderer.getDrawingBufferSize(PN_V2);const w=Math.max(64,Math.round(PN_V2.x*0.5)),h=Math.max(64,Math.round(PN_V2.y*0.5));
  if(!PN.rt)PN.rt=new THREE.WebGLRenderTarget(w,h,{depthBuffer:true});else if(PN.rt.width!==w||PN.rt.height!==h)PN.rt.setSize(w,h);
  const prev=renderer.getRenderTarget(),sh=renderer.shadowMap.needsUpdate,ac=renderer.autoClear;renderer.autoClear=true;renderer.setRenderTarget(PN.rt);renderer.clear();rr(K.S,cam);
  renderer.setRenderTarget(prev);renderer.shadowMap.needsUpdate=sh;renderer.autoClear=ac;PN.discMat.uniforms.tex.value=PN.rt.texture;PN.discMat.uniforms.res.value.copy(PN_V2);}
{const _rr=renderer.render.bind(renderer);renderer.render=function(sc,cam){if(PN.portal&&sc===scene&&cam===camS)try{pnPortalRender(cam,_rr);}catch(e){console.error(e);}return _rr(sc,cam);};}
// ---------- рисунок в тетрадке: история цепи, книжка-раскладушка ----------
function pnNoteTex(){return PN.noteTex||(PN.noteTex=pnCanvas(64,64,(x,w,h)=>{x.fillStyle='#ffd24a';x.font='bold 54px serif';x.textAlign='center';x.textBaseline='middle';x.fillText('♪',w/2,h/2+2);}));}
function pnStoryBuild(nb){const root=new THREE.Group();root.position.set(0.155,0.052,0.02);root.rotation.z=-0.06;root.scale.setScalar(1.25);nb.g.add(root);root.visible=false;const S={root};
  S.sky=pnCard(root,-0.16);S.moon=pnPart(S.sky.card,PN_G.c,0xfff0b0,0.09,0.29,0,0.026,0.026,{glow:0.6});
  for(const[x,y]of[[-0.09,0.3],[-0.03,0.33],[0.04,0.27]])pnPart(S.sky.card,pnTri(-0.008,0,0.008,0,0,0.014),0xfff6c0,x,y,0,1,1,{glow:0.6});
  S.cloud=pnCard(root,-0.12);S.cloudG=new THREE.Group();S.cloud.card.add(S.cloudG);for(const[x,y,r]of[[-0.04,0.3,0.035],[0,0.315,0.045],[0.045,0.3,0.035],[0.02,0.285,0.03],[-0.02,0.285,0.03]])pnPart(S.cloudG,PN_G.c,0x4a4a66,x,y,0.001,r,r*0.85);
  S.oak=pnCard(root,-0.07);{const c=S.oak.card,hill=new THREE.Shape();hill.moveTo(-0.15,0);hill.quadraticCurveTo(0,0.1,0.15,0);hill.lineTo(-0.15,0);pnPart(c,new THREE.ShapeGeometry(hill),0x5aa848,0,0,0);
    pnPart(c,PN_G.r,0x7a4e2a,0,0.085,0.001,0.026,0.13);for(const s of[-1,1])pnPart(c,PN_G.r,0x7a4e2a,s*0.03,0.135,0.001,0.008,0.05,{rz:-s*0.8});
    S.crown=[];for(const[x,y,r,col]of[[-0.045,0.17,0.05,0x2f6a34],[0.045,0.17,0.05,0x2f6a34],[0,0.205,0.058,0x2f6a34],[-0.03,0.185,0.045,0x4f9a44],[0.03,0.19,0.045,0x4f9a44],[0,0.22,0.04,0x5aa84e]]){const m=pnPart(c,PN_G.c,col,x,y,0.002,r,r);S.crown.push({m,col:new THREE.Color(col)});}}
  S.grass=pnCard(root,0.09);for(let i=0;i<7;i++){const x=-0.13+i*0.043;pnPart(S.grass.card,pnTri(-0.012,0,0.012,0,0.002,0.03+(i%3)*0.008),0x4a9a3e,x,0,0,1,1,{edge:false});if(i%2)pnPart(S.grass.card,PN_G.c,[0xf06a7a,0xffe060,0x8ab0ff][i%3],x+0.01,0.03,0.001,0.008,0.008,{edge:false});}
  // цепь — объёмные звенья по дуге перед дубом
  S.chain=pnCard(root,-0.02);S.chainPts=[];S.links=[];const lm=new THREE.MeshLambertMaterial({color:0xf0b020,emissive:0xb07000,emissiveIntensity:0.7});const lg=new THREE.TorusGeometry(0.0085,0.0032,6,12);
  for(let i=0;i<9;i++){const s=i/8,x=-0.12+0.24*s,y=0.16-0.055*Math.sin(Math.PI*s);S.chainPts.push(new V3(x,y,0.006));const m=new THREE.Mesh(lg,lm);m.userData.dress=true;m.position.set(x,y,0.006);m.scale.set(1.45,1,1);m.rotation.set(i%2?Math.PI/2:0,0,Math.atan2(0.055*Math.PI*Math.cos(Math.PI*s)*-1,0.24));S.chain.card.add(m);m.scale.setScalar(0.001);S.links.push(m);}
  // кот — идёт по цепи и поёт
  S.cat=new THREE.Group();S.chain.card.add(S.cat);S.catParts=[];{const g=S.cat,col=0x9aa0ac;S.catParts.push(pnPart(g,PN_G.c,col,0,0.016,0.008,0.022,0.014),pnPart(g,PN_G.c,col,0.022,0.032,0.009,0.013,0.013),
    pnPart(g,pnTri(0.013,0.04,0.016,0.054,0.022,0.043),col,0,0,0.0095),pnPart(g,pnTri(0.024,0.043,0.03,0.055,0.033,0.041),col,0,0,0.0095),pnPart(g,PN_G.c,col,-0.026,0.03,0.0085,0.004,0.016,{rz:0.5}));
    for(const x of[0.018,0.027])pnPart(g,PN_G.c,0xffd24a,x,0.034,0.0105,0.0028,0.0032,{edge:false,glow:0.8});}
  S.cat.scale.setScalar(0.001);
  S.notes=[0,1,2].map(()=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(0.03,0.03),new THREE.MeshBasicMaterial({map:pnNoteTex(),transparent:true,depthWrite:false}));m.visible=false;S.chain.card.add(m);return m;});
  // костлявая рука в перстне — спускается из тучи
  S.hand=pnCard(root,0.025);S.handG=new THREE.Group();S.hand.card.add(S.handG);{const g=S.handG,col=0x1a1420;pnPart(g,PN_G.c,col,0,0,0,0.022,0.026);S.fingers=[];
    for(let i=0;i<4;i++){const fg=new THREE.Group();fg.position.set(-0.015+i*0.01,-0.02,0.001);g.add(fg);pnPart(fg,PN_G.r,col,0,-0.022,0,0.006,0.045);pnPart(fg,pnTri(-0.003,-0.044,0.003,-0.044,0,-0.054),col,0,0,0.0005);S.fingers.push(fg);}
    const th=new THREE.Group();th.position.set(0.02,-0.005,0.001);th.rotation.z=0.9;g.add(th);pnPart(th,PN_G.r,col,0,-0.018,0,0.006,0.036);S.fingers.push(th);
    pnPart(g,PN_G.r,col,0,0.04,0,0.016,0.06);pnPart(g,PN_G.c,0xf0c030,-0.005,-0.022,0.003,0.006,0.006,{glow:0.9,edge:false});}
  root.traverse(o=>{o.userData.batchNo=true;o.castShadow=false;});return S;}
function pnStory(S,T,live,nb){if(!S)return;const on=T>=31.15&&T<36.8;S.root.visible=on;if(!on){if(T>=36.8&&S.fly)S.fly.forEach(f=>{if(f.m.parent)f.m.parent.remove(f.m);});return;}
  const fold=T>36.35?clamp((T-36.35)/0.4,0,1):0,pk=(t0,d)=>clamp((T-t0)/(d||0.45),0,1)*(1-fold)+0*fold;
  for(const[cd,t0]of[[S.sky,31.3],[S.oak,31.35],[S.grass,31.5],[S.chain,31.6],[S.cloud,33.55],[S.hand,34.0]])pnCardAt(cd,fold>0?(1-fold)*(T>=t0?1:0):(T-t0)/0.45);
  // дуб покачивает кроной, после рывка цепи — облетает и сереет
  const dead=clamp((T-35.0)/0.6,0,1),grey=new THREE.Color(0x8a7a64);S.crown.forEach((c,i)=>{c.m.material.color.copy(c.col).lerp(grey,dead);c.m.material.emissive.copy(c.m.material.color);c.m.scale.setScalar((c.m.userData.r0||(c.m.userData.r0=c.m.scale.x))*(1+0.04*Math.sin(T*5+i)*(1-dead)-0.12*dead));});
  // звенья рисуются по одному
  S.links.forEach((m,i)=>{const k=clamp((T-31.75-i*0.09)/0.18,0,1),gone=T>=34.95;m.visible=!gone;m.scale.setScalar(Math.max(0.001,CE.outBack(k))*(k>0?1:0)+0.001);if(k>0)m.scale.x*=1.45;
    if(live&&k>0&&!m.userData.dinged){m.userData.dinged=true;tone(784*Math.pow(2,i/12*2),0.16,'triangle',0.045);}});
  // кот: встаёт, идёт по цепи, поёт; после рывка — каменеет
  const ck=clamp((T-32.55)/0.35,0,1);S.cat.scale.setScalar(Math.max(0.001,CE.outBack(ck)));const ws=clamp((T-32.7)/1.2,0,1),s=lerp(0.08,0.62,CE.inOutSine(ws)),i0=Math.min(7,Math.floor(s*8)),fr=s*8-i0,p=S.chainPts[i0].clone().lerp(S.chainPts[i0+1],fr);
  S.cat.position.set(p.x,p.y+0.006+(ws>0&&ws<1?Math.abs(Math.sin(T*14))*0.006:0),0.002);const stone=clamp((T-34.95)/0.45,0,1);S.cat.rotation.z=-0.35*stone;
  S.catParts.forEach(m=>{m.material.color.setHex(0x9aa0ac).lerp(new THREE.Color(0x6a6a6a),stone);m.material.emissive.copy(m.material.color);});
  if(live&&ck>0&&!S.meow){S.meow=1;AUD.osc&&AUD.osc({f0:760,f1:520,d:0.32,v:0.05,type:'triangle',glide:0.3});}
  S.notes.forEach((m,i)=>{const t0=32.9+i*0.4,u=(T-t0)/0.9;m.visible=u>0&&u<1&&stone<0.01;if(m.visible){m.position.set(S.cat.position.x+0.01+i*0.004,S.cat.position.y+0.05+u*0.07,0.012);m.material.opacity=1-u;m.rotation.z=0.3*Math.sin(u*6);}});
  // туча наползает, луна тускнеет; рука спускается, хватает цепь и рвёт
  S.cloudG.position.x=lerp(-0.26,0.0,CE.outCubic(clamp((T-33.6)/0.5,0,1)));S.moon.material.color.setHex(0xfff0b0).lerp(new THREE.Color(0x6a6a7a),clamp((T-33.8)/0.4,0,1));S.moon.material.emissive.copy(S.moon.material.color);
  const hy=T<34.6?lerp(0.36,0.19,CE.outCubic(clamp((T-34.1)/0.5,0,1))):T<34.95?0.19:0.19+0.1*CE.outCubic(clamp((T-34.95)/0.3,0,1));S.handG.position.set(0.002+(T>=34.95?0.03*clamp((T-34.95)/0.3,0,1):0),hy,0.004);
  const grip=clamp((T-34.6)/0.2,0,1);S.fingers.forEach((fg,i)=>{fg.rotation.x=0;fg.rotation.z=(i<4?0:0.9)+(i<4?(i-1.5)*-0.12*(1-grip)+grip*0.5:-grip*0.6);fg.scale.y=1-0.35*grip;});
  if(live&&T>=34.1&&!S.rum){S.rum=1;AUD.nz&&AUD.nz({f0:120,f1:80,d:0.9,q:0.8,v:0.08,type:'lowpass'});}
  if(T>=34.95&&!S.fly&&live){S.fly=[];SFX.rip();CINE.trauma&&CINE.trauma(0.25);const wp=new V3();
    S.links.forEach((m,i)=>{m.getWorldPosition(wp);const fm=new THREE.Mesh(new THREE.TorusGeometry(0.03,0.011,8,16),new THREE.MeshBasicMaterial({color:0xffd24a}));fm.scale.set(1.45,1,1);fm.position.copy(wp);W.group.add(fm);
      const v=new V3(rand(-1.2,1.2),rand(1.3,2.6),rand(-0.4,1.2));S.fly.push({m:fm,p0:wp.clone(),v,t0:T,rs:new V3(rand(-9,9),rand(-9,9),rand(-9,9))});});
    try{const cp=new V3();S.crown[2].m.getWorldPosition(cp);FX.leaves&&FX.leaves(cp,10);FX.sparkle&&FX.sparkle(cp,8,0xffd24a);}catch(e){}}
  if(S.fly)S.fly.forEach(f=>{const u=T-f.t0;f.m.position.copy(f.p0).addScaledVector(f.v,u);f.m.position.y-=0.7*u*u;f.m.rotation.set(f.rs.x*u,f.rs.y*u,f.rs.z*u);const sc=clamp(1.3-u*0.7,0,1);f.m.scale.set(1.45*sc,sc,sc);f.m.visible=sc>0.02;});
  if(nb)nb.pg.emissiveIntensity=Math.max(nb.pg.emissiveIntensity*0,T<31.6?0.7*(1-(T-31.15)/0.45):0.15+0.1*Math.sin(T*6));}
// ---------- ночь за окном: тучи, молнии, Кощей, вороны, Звенышко (время ролика; вне ролика — тихая ночь) ----------
const PN_LT=[24.3,25.55,26.75,28.15];
function pnFlashAt(T){let f=0;for(const t0 of PN_LT){const u=T-t0;if(u>=0&&u<0.6)f=Math.max(f,(u<0.08?1:u<0.14?0.35:u<0.22?0.8:Math.exp(-(u-0.22)*9))*(t0===28.15?0.45:1));}return f;}
function pnCurve(pts,k){const n=pts.length-1,x=clamp(k,0,1)*n,i=Math.min(n-1,Math.floor(x)),u=x-i,p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(n,i+2)];
  const u2=u*u,u3=u2*u;return new V3().addScaledVector(p0,-0.5*u3+u2-0.5*u).addScaledVector(p1,1.5*u3-2.5*u2+1).addScaledVector(p2,-1.5*u3+2*u2+0.5*u).addScaledVector(p3,0.5*u3-0.5*u2);}
function pnKoAt(K,T){const P=K.P;
  if(T<24.7)return P(14,9,90);
  if(T<26.75)return pnCurve([P(14,9,90),P(6,5,45),P(-4,0.5,20),P(-1.6,-2.2,6.5)],CE.inOutSine((T-24.7)/2.05));
  if(T<27.6)return P(-1.6,-2.2,6.5).lerp(P(-0.4,-3.0,2.2),CE.outCubic((T-26.75)/0.85));
  if(T<28.1)return P(-0.4,-3.0,2.2).lerp(P(0.15,-3.35,1.55),smooth((T-27.6)/0.5));
  if(T<29.1)return P(0.15+0.35*Math.sin((T-28.1)*2.4),-3.35,1.55);
  return pnCurve([P(0.15,-3.35,1.55),P(-3,0,8),P(-10,6,35),P(-30,14,85)],CE.inCubic(clamp((T-29.1)/1.3,0,1)));}
function pnZAt(K,T){const k=clamp((T-25.1)/1.65,0,1),e=CE.inOutSine(k),p=K.P(-14,4,40).lerp(K.P(0,0,0.25),e);const w=(1-k)*(1-k);
  return p.addScaledVector(K.rt,Math.sin(k*Math.PI*5)*3.2*w).addScaledVector(new V3(0,1,0),Math.sin(k*Math.PI*3.2)*1.6*w);}
function pnNight(T,dt){const K=PN.ps;if(!K)return;const t=G.time,inC=T>=0;
  const cover=!inC?0:T<23.0?0:T<24.4?smooth((T-23.0)/1.4):T<29.3?1:T<30.9?1-smooth((T-29.3)/1.6):0,fl=inC?pnFlashAt(T):0,near=inC&&T>25.9&&T<29.4?1:0;
  K.skyU.cover.value=cover;K.skyU.flash.value=fl*0.9;K.skyU.green.value=damp(K.skyU.green.value,near,4,dt||1);K.flashL.intensity=fl*2.5;
  K.starM.opacity=(1-cover)*(0.75+0.25*Math.sin(t*1.7));K.moon.material.color.setHex(0xfff2c0).multiplyScalar(1-0.7*cover+0.3*fl);K.halo.material.opacity=0.85*(1-0.8*cover)+fl*0.5;
  K.cloudM.color.setHex(0x2c3658).multiplyScalar(1+fl*2.2);
  K.clouds.forEach(c=>{c.g.position.copy(c.rest).lerp(c.storm,cover);c.g.position.addScaledVector(K.rt,Math.sin(t*0.05+c.ph)*3+(inC?(T-23)*0.4*cover:0));});
  // Кощей
  const ko=K.ko,kv=inC&&T>=24.25&&T<30.4;ko.g.visible=kv;
  if(kv){const p=pnKoAt(K,T);ko.g.position.copy(p);const look=T<29.1?K.C:pnKoAt(K,T+0.1);ko.g.rotation.y=Math.atan2(look.x-p.x,look.z-p.z);
    const reach=T>26.55&&T<29.3?clamp(Math.min((T-26.55)/0.5,(29.3-T)/0.3),0,1):0;if(ko.rig&&ko.rig.armR&&K.armR0){ko.rig.armR.rotation.x=K.armR0.x-1.35*reach;ko.rig.armR.rotation.z=K.armR0.z+0.25*reach;}
    const glow=T>25.0?1:fl;const peek=T>27.9&&T<29.2?1:0;K.eyes.forEach(e=>{e.scale.set(1.3*(0.8+0.4*glow),0.8*(peek?0.6+0.4*Math.abs(Math.sin(T*3)):1),0.6);if(e.userData.gl){e.userData.gl.material.opacity=glow*(0.55+0.45*peek)*(0.85+0.15*Math.sin(t*9));e.userData.gl.scale.setScalar(1+0.8*peek);}});K.koL.intensity=2.2*glow*(T>27.4&&T<29.2?1.6:1);
    if(K.cape){const Pa=K.cape.geo.attributes.position,Bc=K.cape.base;for(let i=0;i<Pa.count;i++){const y=Bc[i*3+1],x=Bc[i*3],k=clamp(-y/2.8,0,1);Pa.array[i*3+2]=Bc[i*3+2]-k*(0.5+0.35*Math.sin(t*9+y*2.2+x*1.5));Pa.array[i*3]=x*(1+0.25*k);}Pa.needsUpdate=true;}
    K.koCloud.children.forEach((m,i)=>{m.position.y=0.1+0.15*Math.sin(t*2+i);});K.koCloud.rotation.y=t*0.3;}
  // вороны
  K.ravens.forEach((r,i)=>{const T0=23.6+i*0.12,v=inC&&T>=T0&&T<30.8;r.g.visible=v;if(!v)return;let p;
    if(T<24.9)p=K.P(-28,12+i*0.9,70).lerp(K.P(32,16-i*0.6,72),(T-T0)/1.6);
    else{const c=pnKoAt(K,Math.min(T,30.3)),a=t*1.8+r.ph;p=c.clone().add(new V3(Math.cos(a)*r.o.x*1.4,2.4+Math.sin(a*1.3)*0.8+r.o.y,Math.sin(a)*r.o.z*1.4));}
    const prev=r.g.position.clone();r.g.position.copy(p);if(prev.distanceToSquared(p)>1e-6)r.g.lookAt(p.clone().add(p.clone().sub(prev)));r.g.scale.setScalar(1.3);
    const fl2=Math.sin(t*15+r.ph)*0.9;r.wl.rotation.z=fl2;r.wr.rotation.z=-fl2;});
  // искра Звенышка
  const zv=inC&&T>=25.1&&T<26.75;K.zg.visible=zv;if(zv){const p=pnZAt(K,T);K.zg.position.copy(p);K.zg.rotation.y=t*8;K.zHalo.lookAt(K.C);K.zHalo.scale.setScalar(1+0.3*Math.sin(t*20));}
  K.trail.forEach((m,i)=>{const tt=T-(i+1)*0.035,v=zv&&tt>25.1;m.visible=v;if(v){m.position.copy(pnZAt(K,tt));m.lookAt(K.C);m.scale.setScalar(0.9*(1-i/10));m.material.opacity=0.55*(1-i/10);}});}
// ---------- комната в ролике: Звенышко мечется и прячется, лампа, тень Кощея, иней, ветер, звуки ----------
function pnShadowMesh(){const s=new THREE.Shape();s.moveTo(0,-1.2);s.bezierCurveTo(0.9,-1.0,1.3,-0.2,1.0,0.5);s.lineTo(0.55,0.6);s.lineTo(2.3,1.3);s.lineTo(2.5,1.15);s.lineTo(2.35,1.45);s.lineTo(2.6,1.42);s.lineTo(2.3,1.6);
  s.lineTo(0.5,0.95);s.lineTo(0.35,1.15);s.lineTo(0.42,1.45);s.lineTo(0.22,1.3);s.lineTo(0.12,1.6);s.lineTo(0,1.32);s.lineTo(-0.12,1.6);s.lineTo(-0.22,1.3);s.lineTo(-0.42,1.45);s.lineTo(-0.35,1.15);
  s.lineTo(-0.55,0.6);s.lineTo(-1.0,0.5);s.bezierCurveTo(-1.3,-0.2,-0.9,-1.0,0,-1.2);const m=new THREE.Mesh(new THREE.ShapeGeometry(s,8),new THREE.MeshBasicMaterial({color:0x05040c,transparent:true,opacity:0,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));
  m.rotation.x=-Math.PI/2;m.position.y=0.03;m.renderOrder=2;m.visible=false;W.group.add(m);pnNoBatch(m);return m;}
function pnZPath(c){return [c.winPos.clone(),PNV(3.4,3.1,-2.4),PNV(0.6,3.5,-0.6),PNV(-2.6,2.6,-2.8),PNV(-4.4,1.9,-4.0),PNV(-3.2,1.2,0.4),PNV(-0.4,1.0,2.0),PNV(2.0,1.5,0.6),PNV(3.0,1.3,-1.4),PNV(2.9,0.75,-2.1)];}
function pnRoomScene(T,dt,live){const c=PN.ctx;if(!c)return;const H=HERO,Z=c.Z,inC=T>=23.0&&T<31.0;
  // ветер, лампа, иней, луч
  const fl=pnFlashAt(T),burst=T>=26.75?Math.exp(-(T-26.75)*2.2):0;PN.gust=inC?Math.max(T>23.4&&T<29.6?0.22:0,burst*1.1):0;
  PN.lampK=inC&&T>23.3&&T<29.8?clamp(0.45+0.3*Math.sin(T*23)*Math.sin(T*7.3)+0.35*fl-(T>27.4&&T<29.2?0.25:0),0.08,1.3):1;
  c.lampL.intensity=1.3*PN.lampK;if(c.lampG){c.lampG.rotation.z=inC?0.06*Math.sin(T*2.6)+0.22*burst*Math.sin(T*9):0;c.lampG.rotation.x=inC?0.05*Math.cos(T*2.1):0;}
  PN.frost=T<27.6?0:T<28.2?smooth((T-27.6)/0.6):T<29.1?1:T<30.8?1-smooth((T-29.1)/1.7):0;if(PN.discMat)PN.discMat.uniforms.frost.value=PN.frost;
  if(PN.beam){const near=T>25.9&&T<29.4;PN.beam.material.opacity=0.07*(inC?Math.max(0.15,1-0.85*(T<24.4?smooth((T-23)/1.4):T<29.3?1:1-smooth((T-29.3)/1.6))):1)+fl*0.12;
    PN.beam.material.color.setHex(near?0x9fffc0:0x9fb8ff);}
  if(c.win){const sh=(T>26.75&&T<27.05)||(T>27.55&&T<27.8)?1:0;c.win.position.copy(c.winBase).addScaledVector(new V3(rand(-1,1),rand(-1,1),rand(-1,1)),0.012*sh);}
  if(live&&$('flash')){const o=Math.max(fl*0.22,T>26.75&&T<26.9?0.32:0);if(o>0.01||PN.flashOn){$('flash').style.opacity=o.toFixed(3);PN.flashOn=o>0.01;}}
  // тень Кощея проносится по полу
  if(PN.shade){const u=(T-26.9)/1.1,v=u>0&&u<1;PN.shade.visible=v;if(v){PN.shade.position.set(lerp(4.6,-4.6,u),0.03,lerp(-3.6,1.8,u));PN.shade.rotation.z=Math.atan2(-5.4,9.2)+Math.PI/2;PN.shade.scale.set(2.4,3.2,1);PN.shade.material.opacity=0.55*Math.sin(Math.PI*u);}}
  // Звенышко влетает в окно, мечется по комнате и ныряет в тетрадку
  if(T>=26.75&&T<28.65){const k=clamp((T-26.75)/1.9,0,1),pts=pnZPath(c);pts[pts.length-1]=c.nb.g.position.clone().add(PNV(0,0.12,0));const p=pnCurve(pts,CE.inOutSine(k)*0.96+k*0.04);
    Z.vis=true;Z.g.visible=true;Z.pos.copy(p);Z.scale=0.8*(T>28.45?1-(T-28.45)/0.2:1);Z.spinRate=9;Z.body.rotation.x=0;
    if(live&&((T*12)|0)!==PN.zSpark){PN.zSpark=(T*12)|0;try{FX.sparkle(p.clone(),2,0xffd24a);}catch(e){}}
    for(const w of['proshka','potap','pelageya','yosha'])H[w].face=Math.atan2(p.x-H[w].pos.x,p.z-H[w].pos.z);}
  else if(T>=28.65&&T<30.6){Z.vis=false;Z.g.visible=false;Z.pos.set(2.72,0.8,-2.02);
    const nb=c.nb,jit=T>28.9?0.012*Math.sin(T*47)*(0.5+0.5*Math.sin(T*3.3)):0;if(T>28.9){nb.g.position.copy(c.NB_TABLE);nb.g.position.y+=Math.abs(jit);nb.g.rotation.z=jit*3;}
    for(const w of['proshka','potap','pelageya','yosha'])H[w].face=Math.atan2(nb.g.position.x-H[w].pos.x,nb.g.position.z-H[w].pos.z);}
  else if(T>=30.6&&T<37.4){Z.vis=true;Z.g.visible=true;if(T<30.7)c.nb.g.rotation.z=0;
    // выпрыгивает из тетрадки и смотрит книжку сбоку (не загораживает её); при разрыве цепи вздрагивает; к реплике — плавно туда, где его ведёт ролик
    const nb=c.nb,pp=Z.pos.clone(),hp=nb.g.localToWorld(PNV(-0.36,0.3,-0.02));hp.y+=Math.sin(T*3.2)*0.02;if(T>=34.95&&T<35.45)hp.x+=Math.sin(T*70)*0.012;
    const k=smooth((T-30.6)/0.45),kb=T>=36.8?smooth((T-36.8)/0.6):0;Z.pos.copy(nb.g.localToWorld(PNV(-0.12,0.05,0))).lerp(hp,k).lerp(pp,kb);
    Z.scale=lerp(0.3,Math.max(0.6,Z.scale),kb);Z.body.rotation.x=0;Z.spinRate=0;Z.spin=0;const cp=camS.position;Z.g.rotation.y=lerp(Math.atan2(cp.x-Z.pos.x,cp.z-Z.pos.z),0,kb);
    if(live&&k>0&&!PN.zPop){PN.zPop=1;try{FX.sparkle(Z.pos.clone(),6,0xffd24a);}catch(e){}}}
  else if(T>=23.3&&T<26.75){for(const w of['proshka','potap','pelageya','yosha'])H[w].face=Math.atan2(c.winPos.x-H[w].pos.x,c.winPos.z-H[w].pos.z);}
  // Звенышко зовёт к двери (а не в окно): подлетает к двери, звенит, дверь открывается — вылетает на ветку
  if(T>=39.0&&T<41.3){const d=PNV(0,1.7,-5.9);if(T<40.2){const k=smooth((T-39.0)/1.0);Z.pos.copy(PNV(2.9,1.7,-2.1).lerp(d,k));Z.pos.y+=Math.sin(T*9)*0.05;Z.scale=1;Z.spinRate=4;}
    else if(T<40.75){Z.pos.copy(d);Z.pos.y+=Math.sin(T*12)*0.06;Z.spinRate=6;}else{const k=smooth((T-40.75)/0.5);Z.pos.copy(d.clone().lerp(PNV(0,1.9,-11.5),k));Z.spinRate=3;}Z.vis=true;}
  // звуки (только при живом показе)
  if(live){const S=PN.snd||(PN.snd={});const at=(k,t0,f)=>{if(T>=t0&&!S[k]){S[k]=1;try{f();}catch(e){}}};
    at('wind',23.2,()=>{AUD.nz({f0:300,f1:900,f2:250,d:5.5,q:0.7,v:0.08,a:1.2,type:'bandpass',pan0:-0.6,pan1:0.6,wet:0.4});});
    at('caw',23.75,()=>{for(let i=0;i<3;i++)AUD.osc({f0:900,f1:520,d:0.18,v:0.035,type:'sawtooth',glide:0.16,at:i*0.32});});
    PN_LT.forEach((t0,i)=>at('th'+i,t0,()=>{AUD.nz({f0:180,f1:60,d:1.6,q:0.6,v:i===3?0.1:0.2,a:0.05,type:'lowpass',at:0.12});AUD.osc({f0:70,f1:40,d:1.2,v:0.08,type:'sawtooth'});}));
    at('keys1',25.3,SFX.keys);at('zfly',25.15,()=>{AUD.osc({f0:1500,f1:2600,d:1.5,v:0.02,type:'sine',glide:1.5});});
    at('zin',26.75,()=>{SFX.whoosh();SFX.dzin();SFX.clink();});at('slam',27.55,()=>{SFX.thud&&SFX.thud();SFX.clink();AUD.nz({f0:2500,f1:6000,d:0.5,q:2,v:0.04,type:'highpass'});});
    at('keys2',28.2,SFX.keys);at('frost',27.7,()=>{AUD.nz({f0:4000,f1:7000,d:0.9,q:1.5,v:0.03,type:'highpass'});});
    at('hide',28.6,()=>{tone(660,0.12,'triangle',0.06,440);});at('away',29.15,()=>{SFX.whoosh();for(let i=0;i<2;i++)AUD.osc({f0:850,f1:500,d:0.16,v:0.03,type:'sawtooth',glide:0.14,at:0.3+i*0.3});});
    at('zpop',30.65,()=>{tone(988,0.1,'triangle',0.05,1318);});at('door',39.9,()=>{for(let i=0;i<3;i++)tone(1568,0.1,'sine',0.05,null,i*0.16);});}}
// ---------- ролик «Колыбельная»: новая середина (поверх сценки с самокатом late_96; времена — ролика релиза) ----------
function pnLullaby(def,c){const near=(a,b)=>Math.abs(a-b)<0.02,C=c.winPos;
  // прежние: тень на луне, ключи, «звено падает сквозь листву», рисунок значками и разрыв цепи — заменены
  const drop=[23.2,23.8,25.3,26.8,28.3,28.4,31.8,32.1,32.9,34.0,35.3];def.events=def.events.filter(e=>!drop.some(d=>near(e.t,d)));
  def.events.push({t:22.9,fn:()=>{PN.snd={};PN.zPop=0;}},
    {t:28.4,fn:()=>{const nb=c.nb,a=nb.g.position.clone(),r=nb.g.rotation.x;anim(0.45,k=>{nb.g.position.lerpVectors(a,c.NB_TABLE,smooth(k));nb.g.rotation.x=r*(1-smooth(k));});}},
    {t:30.6,fn:()=>{c.Z.vis=true;c.Z.g.visible=true;c.nb.g.position.copy(c.NB_TABLE);c.nb.g.rotation.set(0,0.25,0);}});
  def.events.sort((a,b)=>a.t-b.t);
  // кадры: окно → вплотную к окну → комната от окна (Звенышко мечется) → окно снизу (Кощей заглядывает) → тетрадка дрожит → раскладушка
  // раскладушка: точки в осях тетрадки на столе (поворот 0,25 задаёт событие 30,6): камера чуть справа-спереди, медленный наезд;
  // слева от книжки — Звенышко, справа за ней — Пелагея
  const ry=0.25,L=(x,y,z)=>c.NB_TABLE.clone().add(PNV(Math.cos(ry)*x+Math.sin(ry)*z,y,-Math.sin(ry)*x+Math.cos(ry)*z)),A=v=>[v.x,v.y,v.z];
  def.shots=def.shots.filter(s=>!(s.t>22.95&&s.t<31.3)).map(s=>near(s.t,39.0)?shot(39.0,[1.6,2.0,-0.4],[0,1.5,-6.6]):s);
  def.shots.push(shot(23.0,[2.2,2.1,-1.5],A(C),[3.1,2.35,-2.55],null,2.9),shot(25.9,[3.75,2.32,-3.1],A(C)),shot(26.8,[0.4,3.4,4.6],[0.9,1.9,-2.4],[1.1,2.8,3.4],[1.8,1.3,-1.8],1.8),
    shot(28.0,[3.35,1.2,-2.05],[C.x-0.05,C.y+0.05,C.z]),shot(29.3,[1.3,1.55,0.9],[2.9,0.85,-2.1],[1.65,1.45,0.25],null,1.9),shot(31.2,A(L(0.27,0.66,1.36)),A(L(0.1,0.37,0)),A(L(0.3,0.57,1.08)),A(L(0.1,0.35,0)),5.6));
  def.shots.sort((a,b)=>a.t-b.t);
  const tk=def.tick;def.tick=(t,dt)=>{tk(t,dt);const live=dt>0&&dt<0.25;PN.ct=t;try{pnRoomScene(t,dt||0,live);pnStory(PN.story,t,live,c.nb);}catch(e){console.error(e);}};
  const end0=def.end;def.end=()=>{PN.ct=-1;PN.gust=0;PN.lampK=1;PN.frost=0;if(PN.discMat)PN.discMat.uniforms.frost.value=0;if(PN.shade)PN.shade.visible=false;if(c.win&&c.winBase)c.win.position.copy(c.winBase);
    c.nb.g.rotation.z=0;c.Z.g.rotation.y=0;PN.zPop=0;if($('flash'))$('flash').style.opacity=0;if(PN.story)pnStory(PN.story,99,false,null);if(end0)end0();};
  return def;}
{const _lg=FIN.lulGag;FIN.lulGag=function(def,ctx){def=_lg(def,ctx);try{if(PN.ctx)def=pnLullaby(def,PN.ctx);}catch(e){console.error(e);}return def;};}
// метки режиссуры ролика (late_86): середина — под новую погоню
{const e=DIR.find(x=>x.lv==='p'&&Math.abs(x.dur-43.4)<0.01);if(e){e.cues=e.cues.filter(q=>q[0]<23.0||(q[0]>=30.6&&!(q[0]>31.5&&q[0]<34)));
  e.cues.push([23.3,dMood(COLD,0.24)],[24.32,dAll('surprise',0.05)],[24.35,dTrauma(0.3)],[24.4,dDZ(0.2,0.9,0.5)],[25.6,dTrauma(0.15)],[26.78,dTrauma(0.55)],[26.8,dAll('fear',0.06)],[26.82,dSpeed(1)],
    [27.6,dPunch(-5)],[28.05,dDutch(0.08,1.2)],[28.2,dAll('fear',0.08)],[29.7,dMood(WARM,0.14)],[29.8,dAll('nod',0.1)]);e.cues.sort((a,b)=>a[0]-b[0]);}}
// ---------- подключение ----------
FIN.proRoom=function(c){try{Object.assign(PN,{ctx:c,anim:[],toys:[],bunting:[],herbs:[],curtains:[],candles:[],ct:-1,snd:{},portal:false,disc:null,discMat:null,discOld:null,painted:[],gust:0,lampK:1,frost:0});
  c.winBase=c.win.position.clone();pnDress(c);pnPortal(c);PN.nbPop=pnPatrolPop(c.nb);PN.story=pnStoryBuild(c.nb);PN.shade=pnShadowMesh();
  pnNoBatch(c.nb.g);if(c.lampG)pnNoBatch(c.lampG);pnNoBatch(c.win);
  // тетрадка с книжкой-раскладушкой снимается крупно (ближе 2 м) — не растворяется «у камеры» (late_88); общие материалы не трогаем
  c.nb.g.traverse(o=>{const m=o.material;if(!m||Array.isArray(m)||m.userData.noOcc||m.userData.shared||m.userData.kit||m.userData.batch)return;m.userData.noOcc=true;m.needsUpdate=true;});}catch(e){console.error(e);}};
FIN.proNight=()=>({room:!!PN.ctx,portal:PN.portal,rt:!!PN.rt,ct:PN.ct,frost:+(PN.frost||0).toFixed(2),ko:!!(PN.ps&&PN.ps.ko.g.visible),zg:!!(PN.ps&&PN.ps.zg.visible),
  story:!!(PN.story&&PN.story.root.visible),fly:PN.story&&PN.story.fly?PN.story.fly.length:0,pop:PN.nbPop?+PN.nbPop.k.toFixed(2):0,toys:PN.toys.map(y=>+y.t.toFixed(1))});   // для ботов
{const _st=step;step=function(dt){_st(dt);if(!PN.ctx||!W||W.levelId!=='p')return;try{pnPortalMode(smooth(G.split)<0.002);pnNight(G.cine&&PN.ct>=0?PN.ct:-1,dt);pnRoomTick(dt);for(const f of PN.anim)f(G.time);}catch(e){console.error(e);}};}
{const _ll=loadLevel;loadLevel=function(i){PN.ctx=null;PN.portal=false;PN.ps=null;PN.story=null;PN.nbPop=null;PN.shade=null;PN.disc=null;PN.ct=-1;_ll(i);};}
FIN.proDbg=()=>PN;   // для ботов: состояние модуля
