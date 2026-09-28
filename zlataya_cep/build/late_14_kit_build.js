/* ============================== РЕЛИЗ final03 · КИТ: ПОСТРОЙКИ, РЕКВИЗИТ, ОСОБОЕ ДЛЯ МИРОВ ============================== */
const kPlank=(K,w,h,d,pal,m,o)=>K.box(w,h,d,pal||PAL.plank,m,Object.assign({b:Math.min(w,h,d)*0.22,kN:0.35,kJ:0.2},o||{}));
// ---------- ограды ----------
KIT.fence=v=>{const R=kRng(401+v*7),K=new KGeo(1.2,v*3+401);   // штакетник, 2 м
  for(const x of[-1,1])kPlank(K,0.14,1.15,0.14,PAL.log,tm(x,0.575,0,0,0,(R()-0.5)*0.06));
  for(const y of[0.35,0.8])kPlank(K,2.1,0.08,0.05,PAL.plank,tm(0,y,-0.08,0,0,(R()-0.5)*0.04));
  for(let i=0;i<6;i++){const x=-0.8+i*0.32,h=0.95+R()*0.1;kPlank(K,0.13,h,0.035,PAL.plank,tm(x,h/2,-0.12,0,0,(R()-0.5)*0.05),{s:(R()-0.5)*0.3});K.add(KP.cone(0.092,0.12,4),PAL.plank,tm(x,h+0.06,-0.12,0,Math.PI/4,0,1,1,0.28),{kN:0.4});}
  return K.build();};
KIT.wattle=v=>{const R=kRng(411+v*11),K=new KGeo(1.1,v*5+411);   // плетень
  for(let i=0;i<5;i++){const x=-1+i*0.5,h=1.05+R()*0.15;K.add(KP.cyl(0.035,0.045,h,5),PAL.log,tm(x,h/2,0,0,0,(R()-0.5)*0.08),{noise:0.01,kN:0.2,kG:0.4});}
  for(let j=0;j<6;j++){const y=0.18+j*0.14;for(let i=0;i<4;i++){const x=-0.75+i*0.5,c=KP.cyl(0.022,0.022,0.56,4);c.rotateZ(Math.PI/2);K.add(c,PAL.straw,tm(x,y,((i+j)%2?0.04:-0.04),0,((i+j)%2?0.14:-0.14),0),{kN:0.3,kJ:0.25,s:-0.15});}}
  return K.build();};
// ---------- фонарь: столб и рамка; стекло светится (отдельная геометрия) ----------
KIT.lanternPost=v=>{const K=new KGeo(2,v+421);kPlank(K,0.14,1.9,0.14,PAL.log,tm(0,0.95,0));kPlank(K,0.5,0.07,0.07,PAL.log,tm(0.2,1.85,0));
  K.box(0.32,0.05,0.32,PAL.iron,tm(0.4,1.84,0),{kN:0.4});  for(const[x,z]of[[-1,-1],[1,-1],[1,1],[-1,1]])K.box(0.03,0.3,0.03,PAL.iron,tm(0.4+x*0.13,1.66,z*0.13),{b:0.008,kN:0.2});K.box(0.3,0.04,0.3,PAL.iron,tm(0.4,1.5,0),{kN:0.4});
  K.add(KP.cone(0.2,0.16,4),PAL.iron,tm(0.4,1.9,0,0,Math.PI/4,0),{kN:0.5});return K.build();};
KIT.lanternGlass=v=>{const K=new KGeo(2,v+421);K.box(0.22,0.26,0.22,PAL.yellow,tm(0.4,1.66,0),{b:0.02,kN:0.2,kJ:0.05,s:0.2});return K.build();};
// ---------- бочка, ящик, сундук ----------
KIT.barrel=v=>{const R=kRng(431+v*13),K=new KGeo(0.9,v*7+431);const pr=[[0,0],[0.3,0],[0.36,0.2],[0.38,0.42],[0.36,0.64],[0.3,0.85],[0,0.85]];
  K.add(KP.lathe(pr,10),v%2?PAL.log:PAL.plank,tm(0,0,0,0,R()*6,0),{kN:0.35,kG:0.3,kJ:0.28});
  for(const y of[0.14,0.71])K.add(KP.tor(0.345,0.022,3,10),PAL.iron,tm(0,y,0,Math.PI/2,0,0),{kN:0.3,kJ:0.08});
  K.add(KP.cyl(0.27,0.27,0.02,10),PAL.plank,tm(0,0.855,0),{kN:0.2,s:0.1});return K.build();};
KIT.crate=v=>{const R=kRng(441+v*17),K=new KGeo(0.8,v*9+441);const s=0.7+(v%2)*0.15;K.box(s,s,s,PAL.plank,tm(0,s/2,0),{b:0.04,kN:0.35,kJ:0.25});
  for(const z of[-1,1])for(const y of[0.06,s-0.06]){kPlank(K,s+0.02,0.08,0.03,PAL.log,tm(0,y,z*(s/2+0.01)));kPlank(K,0.03,0.08,s+0.02,PAL.log,tm(z*(s/2+0.01),y,0));}
  kPlank(K,s*1.25,0.08,0.03,PAL.log,tm(0,s/2,s/2+0.015,0,0,Math.PI/4));return K.build();};
KIT.chest=v=>{const K=new KGeo(0.8,v*11+451);K.box(0.9,0.45,0.55,PAL.log,tm(0,0.225,0),{b:0.03,kN:0.35,kJ:0.22});
  const lid=new FIN.orig.Cylinder(0.275,0.275,0.9,8,1,false,0,Math.PI);lid.rotateZ(Math.PI/2);K.add(lid,PAL.roofR,tm(0,0.45,0),{kN:0.45,kJ:0.15});
  for(const x of[-0.3,0.3]){K.box(0.07,0.46,0.57,PAL.gold,tm(x,0.23,0),{b:0.01,kN:0.3});const b=KP.tor(0.28,0.03,3,8,Math.PI);b.rotateY(Math.PI/2);K.add(b,PAL.gold,tm(x,0.45,0),{kN:0.4});}
  K.box(0.12,0.14,0.04,PAL.gold,tm(0,0.42,0.29),{b:0.01,kN:0.4,s:0.2});return K.build();};
// ---------- указатель, колодец, телега ----------
KIT.sign=v=>{const R=kRng(461+v*19),K=new KGeo(1.6,v*13+461);kPlank(K,0.12,1.6,0.12,PAL.log,tm(0,0.8,0,0,0,(R()-0.5)*0.08));
  for(let i=0;i<2;i++){const y=1.35-i*0.34,dir=i?-1:1,g=new THREE.Shape();g.moveTo(-0.45,-0.1);g.lineTo(0.35,-0.1);g.lineTo(0.5,0);g.lineTo(0.35,0.1);g.lineTo(-0.45,0.1);g.lineTo(-0.45,-0.1);
    const eg=new THREE.ExtrudeGeometry(g,{depth:0.04,bevelEnabled:false});K.add(eg,PAL.plank,tm(dir*0.2,y,0.07,0,dir>0?0:Math.PI,(R()-0.5)*0.12),{kN:0.3,kJ:0.2,s:0.1});}
  K.add(KP.cone(0.1,0.14,4),PAL.roofR,tm(0,1.66,0,0,Math.PI/4,0),{kN:0.5});return K.build();};
KIT.well=v=>{const R=kRng(471+v*23),K=new KGeo(2.4,v*17+471);for(let i=0;i<10;i++){const a=i/10*6.283;K.box(0.42,0.6,0.26,PAL.stone,tm(Math.cos(a)*0.7,0.3,Math.sin(a)*0.7,0,-a+Math.PI/2,0),{b:0.06,amp:0.02,kN:0.5,kJ:0.2,s:(R()-0.5)*0.4});}
  K.add(KP.cyl(0.6,0.6,0.05,10),PAL.deep,tm(0,0.4,0),{kN:0,kJ:0.05,s:-0.2});
  for(const x of[-0.85,0.85])kPlank(K,0.12,1.9,0.12,PAL.log,tm(x,0.95,0));
  const cr=KP.cyl(0.07,0.07,1.8,6);cr.rotateZ(Math.PI/2);K.add(cr,PAL.log,tm(0,1.35,0),{kN:0.3});K.add(KP.cyl(0.03,0.03,0.4,4),PAL.plank,tm(0.2,1.15,0),{kN:0.2});
  const rf=v%2?PAL.roofB:PAL.roofR;for(const s of[-1,1])K.box(2.1,0.07,0.85,rf,tm(0,2.0,s*0.33,s*0.72,0,0),{b:0.02,kN:0.5,kJ:0.15});
  K.add(KP.lathe([[0,0],[0.14,0],[0.16,0.24],[0,0.24]],7),PAL.plank,tm(0,0.9,0),{kN:0.3});return K.build();};
KIT.cart=v=>{const R=kRng(481+v*29),K=new KGeo(1.2,v*19+481);K.box(1.5,0.12,0.9,PAL.plank,tm(0,0.62,0),{b:0.03});
  for(const z of[-1,1])kPlank(K,1.5,0.3,0.06,PAL.plank,tm(0,0.82,z*0.45));for(const x of[-1,1])kPlank(K,0.06,0.3,0.9,PAL.plank,tm(x*0.75,0.82,0));
  for(const z of[-1,1]){K.add(KP.tor(0.34,0.05,4,12),PAL.log,tm(-0.2,0.38,z*0.54),{kN:0.3,kJ:0.15});for(let i=0;i<4;i++){const a=i/4*Math.PI;K.box(0.62,0.04,0.04,PAL.log,tm(-0.2,0.38,z*0.54,0,0,a),{b:0.01});}
    K.add(KP.cyl(0.07,0.07,0.1,6),PAL.iron,tm(-0.2,0.38,z*0.54,Math.PI/2,0,0));}
  for(const z of[-1,1])kPlank(K,1.6,0.06,0.06,PAL.log,tm(1.4,0.55,z*0.3,0,0,-0.18));
  if(v%2){K.add(KP.ico(0.3,0),PAL.straw,tm(0,0.9,0,0,0,0,2,0.6,1.2),{noise:0.05,kN:0.5});}else for(let i=0;i<3;i++)K.add(KP.ico(0.16,0),PAL.autumn,tm(-0.4+i*0.35,0.8,(R()-0.5)*0.3),{kN:0.5});
  return K.build();};
// ---------- мелкий реквизит ----------
KIT.bucket=v=>{const K=new KGeo(0.4,v+491);K.add(KP.lathe([[0,0],[0.14,0],[0.18,0.32],[0,0.32]],8),v%2?PAL.iron:PAL.plank,tm(0,0,0),{kN:0.3,kJ:0.2});
  for(const y of[0.05,0.27])K.add(KP.tor(0.15+y*0.12,0.012,3,10),PAL.iron,tm(0,y,0,Math.PI/2,0,0));const hd=KP.tor(0.17,0.01,3,8,Math.PI);K.add(hd,PAL.iron,tm(0,0.32,0,0,0,0));
  K.add(KP.cyl(0.165,0.165,0.01,8),PAL.shallow,tm(0,0.28,0),{kN:0,s:0.2});return K.build();};
KIT.basket=v=>{const R=kRng(501+v*31),K=new KGeo(0.5,v*23+501);K.add(KP.lathe([[0,0],[0.18,0],[0.26,0.24],[0.27,0.26],[0,0.26]],9),PAL.straw,tm(0,0,0),{kN:0.3,kJ:0.3});
  const hd=KP.tor(0.24,0.018,3,9,Math.PI);K.add(hd,PAL.straw,tm(0,0.26,0,0,Math.PI/2,0),{kN:0.3});
  for(let i=0;i<5;i++)K.add(KP.ico(0.08,0),[PAL.red,PAL.mush,PAL.yellow][v%3],tm((R()-0.5)*0.26,0.27,(R()-0.5)*0.26),{kN:0.5,s:0.1});return K.build();};
KIT.rope=v=>{const K=new KGeo(0.3,v+511);for(let i=0;i<3;i++)K.add(KP.tor(0.2-i*0.015,0.035,4,12),PAL.straw,tm(0,0.035+i*0.06,0,Math.PI/2,0,0),{kN:0.4,kJ:0.2});return K.build();};
KIT.pot=v=>{const R=kRng(521+v*37),K=new KGeo(0.5,v*29+521);K.add(KP.lathe([[0,0],[0.12,0],[0.2,0.14],[0.2,0.24],[0.12,0.36],[0.13,0.42],[0,0.42]],9),v%2?PAL.cliff:PAL.roofR,tm(0,0,0,0,R()*6,0),{kN:0.35,kJ:0.15});
  K.add(KP.tor(0.2,0.012,3,10),PAL.cream,tm(0,0.2,0,Math.PI/2,0,0),{s:0.2});return K.build();};
KIT.firewood=v=>{const R=kRng(531+v*41),K=new KGeo(0.9,v*31+531);for(let r=0;r<3;r++)for(let i=0;i<4-r;i++){const g=KP.cyl(0.09,0.09,0.9,6);g.rotateX(Math.PI/2);const x=(i-(3-r)/2)*0.19,y=0.09+r*0.16;
    K.add(g,PAL.bark,tm(x,y,(R()-0.5)*0.08),{kN:0.3,kJ:0.2});for(const s of[-1,1]){const d=KP.cyl(0.075,0.075,0.02,6);d.rotateX(Math.PI/2);K.add(d,PAL.plank,tm(x,y,s*0.455),{kN:0,s:0.15});}}return K.build();};
KIT.haystack=v=>{const R=kRng(541+v*43),K=new KGeo(1.8,v*37+541);K.add(KP.lathe([[0,0],[0.9,0],[1.0,0.5],[0.85,1.1],[0.45,1.55],[0,1.7]],9),PAL.straw,tm(0,0,0,0,R()*6,0),{noise:0.07,kN:0.45,kG:0.4,kJ:0.25});
  K.add(KP.cyl(0.03,0.03,0.6,4),PAL.log,tm(0,1.85,0),{kN:0.2});return K.build();};
KIT.bench=v=>{const K=new KGeo(0.6,v+551);kPlank(K,1.4,0.07,0.36,PAL.plank,tm(0,0.45,0));for(const x of[-0.55,0.55])kPlank(K,0.08,0.43,0.3,PAL.log,tm(x,0.215,0));return K.build();};
KIT.bunting=v=>{const R=kRng(561+v*47),K=new KGeo(1,v*41+561);const L=4,sag=0.35,cols=[PAL.red,PAL.yellow,PAL.blue,PAL.green,PAL.pink];   // верёвка с флажками поперёк X, от −2 до 2 м
  const Y=x=>-sag*(1-(x/(L/2))*(x/(L/2)));for(let i=0;i<12;i++){const x0=-L/2+i*L/12,x1=x0+L/12,c=KP.cyl(0.01,0.01,L/12,3);c.rotateZ(Math.PI/2);K.add(c,PAL.straw,tm((x0+x1)/2,(Y(x0)+Y(x1))/2,0,0,0,Math.atan2(Y(x1)-Y(x0),L/12)),{kN:0});}
  for(let i=0;i<11;i++){const x=-L/2+(i+0.7)*L/12,y=Y(x);K.add(KP.tri([x-0.13,y,0],[x+0.13,y,0],[x,y-0.3,0]),cols[(i+v)%5],null,{kN:0,kJ:0.1,s:0.1});}return K.build();};
// ---------- мостки и лестница ----------
KIT.bridge=v=>{const R=kRng(591+v*61),K=new KGeo(1.2,v*71+591);const L=6;for(let i=0;i<12;i++){const z=-L/2+(i+0.5)*L/12;kPlank(K,1.6,0.08,0.46,PAL.plank,tm(0,0.9+(R()-0.5)*0.03,z,0,(R()-0.5)*0.05,(R()-0.5)*0.04),{s:(R()-0.5)*0.3});}
  for(const x of[-1,1]){for(const z of[-2.8,0,2.8]){kPlank(K,0.14,1.9,0.14,PAL.log,tm(x*0.72,0.5,z));}const r=KP.cyl(0.03,0.03,L,4);r.rotateX(Math.PI/2);K.add(r,PAL.straw,tm(x*0.72,1.45,0),{kN:0.2});}
  return K.build();};
KIT.stairs=v=>{const K=new KGeo(1.4,v*73+601);for(let i=0;i<6;i++)kPlank(K,1.4,0.1,0.34,PAL.plank,tm(0,0.12+i*0.24,-i*0.3),{s:(i%2?-0.1:0.05)});
  for(const x of[-1,1]){const g=new THREE.BoxGeometry(0.1,0.2,2.3);K.add(g,PAL.log,tm(x*0.72,0.75,-0.75,0.64,0,0),{kN:0.3});}return K.build();};
// ---------- изба, башенка, мельница (средний план) ----------
KIT.izba=v=>{const R=kRng(571+v*53),K=new KGeo(4.4,v*43+571);const W2=1.6,D2=1.3,Hh=2.0,roof=[PAL.roofG,PAL.roofB,PAL.straw,PAL.roofR][v%4];
  K.box(W2*2+0.4,0.3,D2*2+0.4,PAL.stone,tm(0,0.15,0),{b:0.06,amp:0.02,kN:0.5});
  for(let i=0;i<8;i++){const y=0.42+i*0.24;for(const s of[-1,1]){const gx=KP.cyl(0.13,0.13,W2*2+0.3,6);gx.rotateZ(Math.PI/2);K.add(gx,PAL.log,tm(0,y,s*D2,0,0,0),{noise:0.012,kN:0.3,kJ:0.18,s:(i%2?-0.08:0.04)});
      const gz=KP.cyl(0.13,0.13,D2*2+0.3,6);gz.rotateX(Math.PI/2);K.add(gz,PAL.log,tm(s*W2,y+0.12,0),{noise:0.012,kN:0.3,kJ:0.18,s:(i%2?0.04:-0.08)});}}
  for(const s of[-1,1])K.box(W2*2+0.7,0.12,D2*1.45,roof,tm(0,Hh+0.95,s*D2*0.62,s*0.78,0,0),{b:0.04,kN:0.55,kJ:0.14,cell:0.5});
  for(const s of[-1,1]){const t=new THREE.Shape();t.moveTo(-D2-0.05,0);t.lineTo(D2+0.05,0);t.lineTo(0,1.15);t.lineTo(-D2-0.05,0);const eg=new THREE.ExtrudeGeometry(t,{depth:0.12,bevelEnabled:false});eg.rotateY(Math.PI/2);
    K.add(eg,PAL.plank,tm(s*(W2-0.06)-0.06,Hh+0.3,0),{kN:0.3,kJ:0.15});
    for(const q of[-1,1])kPlank(K,0.06,0.18,1.45,PAL.plaster,tm(s*(W2+0.08),Hh+0.3+0.5,q*0.62,-q*0.72,0,0));}
  // окно с наличником и ставнями, дверь, труба
  K.box(0.7,0.62,0.06,PAL.night,tm(0.55,1.25,D2+0.14),{b:0.01,kN:0,kJ:0.05,s:-0.3});K.box(0.86,0.1,0.1,PAL.plaster,tm(0.55,1.6,D2+0.16),{b:0.02});K.box(0.86,0.08,0.1,PAL.plaster,tm(0.55,0.91,D2+0.16),{b:0.02});
  K.add(KP.cone(0.46,0.22,3),PAL.plaster,tm(0.55,1.76,D2+0.17,0,0,0,1,1,0.25),{kN:0.4});for(const x of[-1,1])K.box(0.2,0.62,0.05,PAL.blue,tm(0.55+x*0.47,1.25,D2+0.16),{b:0.015,kN:0.3});
  K.box(0.62,1.2,0.08,PAL.plank,tm(-0.75,0.9,D2+0.14),{b:0.02,kN:0.3});K.box(0.08,0.08,0.05,PAL.iron,tm(-0.55,0.95,D2+0.2));
  K.box(0.36,0.9,0.36,PAL.stone,tm(0.9,Hh+1.4,-0.3),{b:0.05,amp:0.015,kN:0.5});return K.build();};
KIT.tower=v=>{const R=kRng(581+v*59),K=new KGeo(7,v*47+581);K.box(1.8,0.4,1.8,PAL.stone,tm(0,0.2,0),{b:0.08,amp:0.03});
  for(let i=0;i<13;i++){const y=0.55+i*0.3;for(const s of[-1,1]){const gx=KP.cyl(0.15,0.15,1.8,6);gx.rotateZ(Math.PI/2);K.add(gx,PAL.log,tm(0,y+(i%2)*0.15,s*0.72),{noise:0.01,kN:0.3,kJ:0.18});
      const gz=KP.cyl(0.15,0.15,1.8,6);gz.rotateX(Math.PI/2);K.add(gz,PAL.log,tm(s*0.72,y+((i+1)%2)*0.15,0),{noise:0.01,kN:0.3,kJ:0.18});}}
  K.box(2.2,0.12,2.2,PAL.plank,tm(0,4.6,0),{b:0.03});K.add(KP.cone(1.45,2.2,4),v%2?PAL.roofG:PAL.roofR,tm(0,5.8,0,0,Math.PI/4,0),{kN:0.5,kJ:0.15});
  K.add(KP.sph(0.2,6,4),PAL.gold,tm(0,7.0,0),{kN:0.5,s:0.2});K.add(KP.cyl(0.03,0.03,0.5,4),PAL.gold,tm(0,7.3,0));return K.build();};
KIT.mill=v=>{const K=new KGeo(6,v*53+591);K.add(KP.cyl(0.9,1.3,3.6,8),PAL.plank,tm(0,1.8,0),{noise:0.02,kN:0.3,kJ:0.2});K.add(KP.cone(1.25,1.4,8),PAL.roofR,tm(0,4.3,0),{kN:0.5});
  K.box(0.5,0.9,0.1,PAL.log,tm(0,0.45,1.15),{b:0.02});return K.build();};
KIT.millBlades=v=>{const K=new KGeo(3,v+601);K.add(KP.cyl(0.14,0.14,0.3,6),PAL.log,tm(0,0,0,Math.PI/2,0,0));
  for(let i=0;i<4;i++){const a=i*Math.PI/2;K.box(0.1,2.4,0.06,PAL.log,tm(Math.sin(a)*1.2,Math.cos(a)*1.2,0.12,0,0,-a),{b:0.02});K.box(0.45,1.7,0.03,PAL.cloth,tm(Math.sin(a)*1.35+Math.cos(a)*0.25,Math.cos(a)*1.35-Math.sin(a)*0.25,0.15,0,0,-a),{b:0.01,kN:0.2});}
  return K.build();};
// ---------- особое для миров ----------
KIT.coral=v=>{const R=kRng(611+v*61),K=new KGeo(1.2,v*59+611);const p=[PAL.coral,PAL.pink,PAL.yellow,PAL.owl][v%4];
  const br=(x,y,z,l,r,a,e,d)=>{const dx=Math.cos(a)*Math.sin(e),dy=Math.cos(e),dz=Math.sin(a)*Math.sin(e);K.add(KP.cyl(r*0.7,r,l,5),p,tm(x+dx*l/2,y+dy*l/2,z+dz*l/2,0,0,0).multiply(new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new V3(0,1,0),new V3(dx,dy,dz)))),{kN:0.4,kG:0.5,kJ:0.15});
    K.add(KP.ico(r*0.9,0),p,tm(x+dx*l,y+dy*l,z+dz*l),{kN:0.4,s:0.25});if(d>0)for(let i=0;i<2;i++)br(x+dx*l,y+dy*l,z+dz*l,l*0.7,r*0.7,a+(i?1:-1)*(0.8+R()*0.6),0.4+R()*0.4,d-1);};
  for(let i=0;i<3;i++)br(0,0,0,0.5,0.08,i*2.1+R(),0.25+R()*0.3,2);return K.build();};
KIT.kelp=v=>{const R=kRng(621+v*67),K=new KGeo(3,v*61+621);for(let s=0;s<3;s++){const x=(R()-0.5)*0.4,z=(R()-0.5)*0.4,n=6+Math.floor(R()*4);let px=x,pz=z;
    for(let i=0;i<n;i++){const y=i*0.36;px+=(R()-0.5)*0.08;pz+=(R()-0.5)*0.08;K.add(KP.cone(0.12,0.5,3),PAL.kelp,tm(px,y+0.25,pz,0,R()*6,(i%2?0.3:-0.3),1,1,0.3),{kN:0.3,kG:0.8,kJ:0.15});}}return K.build();};
KIT.dome=v=>{const R=kRng(631+v*71),K=new KGeo(5,v*67+631);   // затонувший купол Китежа
  K.box(3.4,0.5,3.4,PAL.plaster,tm(0,0.25,0),{b:0.08,amp:0.03,kN:0.45});
  for(let i=0;i<8;i++){const a=i/8*6.283,h=2.0-(i===3||i===6?1.2*R():0);K.add(KP.bcyl(0.16,h,0.04,6),PAL.plaster,tm(Math.cos(a)*1.3,0.5+h/2,Math.sin(a)*1.3),{noise:0.02,kN:0.3,kG:0.4,flat:true});}
  K.add(KP.cyl(1.55,1.55,0.3,8),PAL.plaster,tm(0,2.65,0),{noise:0.03,kN:0.4});
  K.add(KP.lathe([[0,1.6],[0.5,1.5],[0.95,1.1],[1.2,0.6],[1.25,0]],8),v%2?PAL.gold:PAL.roofB,tm(0,2.8,0),{kN:0.5,kJ:0.12});
  K.add(KP.cyl(0.03,0.05,0.8,4),PAL.gold,tm(0,4.7,0));K.box(0.4,0.05,0.05,PAL.gold,tm(0,4.85,0),{b:0.01});return K.build();};
KIT.column=v=>{const R=kRng(641+v*73),K=new KGeo(2,v*71+641);const h=0.8+R()*1.4;K.box(0.7,0.2,0.7,PAL.plaster,tm(0,0.1,0),{b:0.04,amp:0.02});
  K.add(KP.bcyl(0.24,h,0.05,7),PAL.plaster,tm(0,0.2+h/2,0,(R()-0.5)*0.08,0,(R()-0.5)*0.08),{noise:0.025,kN:0.3,kG:0.5});K.add(KP.ico(0.2,0),PAL.kelp,tm(0.1,0.25,0.2,0,0,0,1.5,0.4,1.2),{kN:0.4});return K.build();};
KIT.shell=v=>{const K=new KGeo(0.2,v*73+651);for(let i=0;i<7;i++){const a=(i-3)*0.26;K.add(KP.cone(0.05,0.28,3),[PAL.pink,PAL.cream,PAL.coral][v%3],tm(Math.sin(a)*0.12,0.03,Math.cos(a)*0.12-0.08,Math.PI/2-0.15,a,0,1,1,0.4),{kN:0.4,kJ:0.15});}return K.build();};
KIT.starfish=v=>{const K=new KGeo(0.1,v*79+661);for(let i=0;i<5;i++){const a=i/5*6.283;K.add(KP.cone(0.06,0.3,3),[PAL.coral,PAL.yellow][v%2],tm(Math.cos(a)*0.13,0.025,Math.sin(a)*0.13,0,-a,-Math.PI/2,1,1,0.45),{kN:0.4});}return K.build();};
KIT.cloudPuff=v=>{const R=kRng(671+v*79),K=new KGeo(2.5,v*83+671);[[0,1.0,0,1.3],[1.3,0.7,0.2,1.0],[-1.25,0.72,-0.1,1.0],[0.5,0.6,1.0,0.8],[-0.5,0.62,-1.0,0.85],[0.2,1.6,0.1,0.8]].forEach(([x,y,z,r])=>K.add(KP.ico(r*(0.9+R()*0.2),1),PAL.cloud,tm(x,y,z,0,R()*6,0,1,0.72,1),{noise:0.08,kN:0.55,kG:0.4,kJ:0.06}));return K.build();};
// кристаллы — целиком светятся (материал свечения)
KIT.crystal=v=>{const R=kRng(681+v*83),K=new KGeo(1.4,v*89+681);const p=[PAL.crystal,PAL.owl,PAL.pink,PAL.gold][v%4];for(let i=0;i<5;i++){const a=R()*6.283,e=(i?0.35+R()*0.35:0),h=(i?0.5+R()*0.5:1.2),r=i?0.1+R()*0.06:0.18;
    const m=tm(Math.cos(a)*0.15*(i?1:0),0,Math.sin(a)*0.15*(i?1:0)).multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(Math.sin(a)*e,0,-Math.cos(a)*e)));
    K.add(KP.cyl(r,r*1.1,h,6),p,m.clone().multiply(tm(0,h/2,0)),{kN:0.4,kG:0.6,kJ:0.12,s:-0.2});K.add(KP.cone(r,r*2.2,6),p,m.clone().multiply(tm(0,h+r*1.1,0)),{kN:0.4,kJ:0.1,s:0.3});}return K.build();};
KIT.islet=v=>{const R=kRng(691+v*89),K=new KGeo(3,v*97+691);K.add(KP.cone(1.6,2.6,7),PAL.cliff,tm(0,-1.3,0,Math.PI,R()*6,0),{noise:0.15,kN:0.3,kG:0.6,kJ:0.18});
  K.add(KP.cyl(1.7,1.55,0.35,7),PAL.grass,tm(0,0.1,0,0,R()*6,0),{noise:0.06,kN:0.6,kJ:0.12,flat:true});
  for(let i=0;i<2;i++){const a=R()*6.3;K.add(KP.ico(0.45,0),v%2?PAL.leaf:PAL.cloud,tm(Math.cos(a)*0.8,0.6,Math.sin(a)*0.8,0,0,0,1,0.8,1),{kN:0.5});}K.add(KP.dod(0.35),PAL.stone,tm(-0.3,0.35,0.4),{noise:0.05,kN:0.5});return K.build();};
KIT.basalt=v=>{const R=kRng(701+v*97),K=new KGeo(3,v*101+701);for(let i=0;i<7;i++){const a=i/7*6.283+R(),r=i?0.55:0,h=1.2+R()*2.2;K.add(KP.cyl(0.32,0.34,h,6),PAL.basalt,tm(Math.cos(a)*r,h/2,Math.sin(a)*r,0,R(),0),{noise:0.02,kN:0.7,kG:0.5,kJ:0.14,flat:true});}return K.build();};
KIT.ember=v=>{const R=kRng(711+v*101),K=new KGeo(0.8,v*103+711);K.add(KP.dod(0.5),PAL.basalt,tm(0,0.25,0,R(),R()*6,R(),1.2,0.7,1),{noise:0.1,kN:0.5,kJ:0.16});return K.build();};
KIT.emberGlow=v=>{const R=kRng(711+v*101),K=new KGeo(0.8,v*103+711);for(let i=0;i<5;i++){const a=R()*6.283;K.add(KP.ico(0.06,0),PAL.lava,tm(Math.cos(a)*0.45,0.08+R()*0.2,Math.sin(a)*0.4),{kN:0.2,s:0.3});}return K.build();};
KIT.anvil=v=>{const K=new KGeo(0.9,v+721);K.box(0.5,0.35,0.5,PAL.log,tm(0,0.175,0),{b:0.04});K.box(0.24,0.25,0.22,PAL.iron,tm(0,0.47,0),{b:0.02});K.box(0.66,0.16,0.3,PAL.iron,tm(0.05,0.66,0),{b:0.03,kN:0.6});
  K.add(KP.cone(0.13,0.34,4),PAL.iron,tm(-0.43,0.66,0,0,Math.PI/4,Math.PI/2,1,1,0.8),{kN:0.5});return K.build();};
KIT.seaStack=v=>{const R=kRng(731+v*103),K=new KGeo(9,v*107+731);let y=0;const p=v%2?PAL.sandstone:PAL.cliff;
  for(let i=0;i<5;i++){const h=1.4+R()*1.2,r=2.4-i*0.32+R()*0.3;K.add(KP.cyl(r*0.9,r,h,7),p,tm((R()-0.5)*0.4,y+h/2,(R()-0.5)*0.4,0,R()*6,0),{noise:0.18,kN:0.6,kG:0.4,kJ:0.14,s:i%2?-0.12:0.06});y+=h;}
  K.add(KP.ico(1.3,0),PAL.grass,tm(0,y+0.1,0,0,R()*6,0,1.1,0.35,1.1),{noise:0.1,kN:0.6});K.add(KP.cone(0.5,1.6,6),PAL.fir,tm(0.4,y+0.9,0.2),{noise:0.05,kN:0.5});return K.build();};
// лодка: корпус — коробка, сжатая к носу и корме и сужающаяся ко дну; внутри тёмный настил
function hullGeo(L,H,Wd,seed){const g=sBoxGeo(L,H,Wd,{b:0.05,cell:0.35,seed});const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),t=Math.min(1,Math.abs(x)/(L/2));
    const pinch=1-Math.pow(t,2.2)*0.92,bot=0.55+0.45*(y/H+0.5);p.setZ(i,p.getZ(i)*pinch*bot);p.setY(i,y+Math.pow(t,2)*H*0.35*(y>0?1:0.4));}g.computeVertexNormals();return g;}
KIT.boat=v=>{const K=new KGeo(1.2,v*109+741);const pal=v%2?PAL.plank:PAL.log;K.add(hullGeo(3.2,0.6,1.2,v+3),pal,tm(0,0.3,0),{kN:0.35,kG:0.4,kJ:0.2});
  K.add(hullGeo(2.7,0.05,0.95,v+5),PAL.night,tm(0,0.52,0),{kN:0,kJ:0.08,s:0.3});K.box(0.18,0.06,1.0,PAL.plank,tm(0.3,0.6,0),{b:0.01});K.box(0.18,0.06,0.85,PAL.plank,tm(-0.6,0.6,0),{b:0.01});
  for(const z of[-1,1])K.box(2.6,0.07,0.05,PAL.red,tm(0,0.5,z*0.56),{b:0.01,s:0.1});
  if(v%2){K.add(KP.cyl(0.05,0.06,2.4,5),PAL.log,tm(0.3,1.7,0));K.add(KP.tri([0.36,2.8,0],[0.36,1.0,0],[1.45,1.1,0]),PAL.cloth,null,{kN:0,s:0.2});}return K.build();};
KIT.villager=v=>villagerGeo(v);   // генератор жителей — в модуле героев
