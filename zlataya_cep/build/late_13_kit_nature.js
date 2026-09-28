/* ============================== РЕЛИЗ final03 · КИТ: ПРИРОДА ============================== */
// KIT[имя](вариант) → BufferGeometry с цветом в вершинах; kit(имя, вариант) кэширует. Размеры — в метрах, основание на y = 0.
const KIT={},KIT_CACHE=new Map();
function kit(name,v){v=v||0;const k=name+'|'+v;let g=KIT_CACHE.get(k);if(!g){g=KIT[name](v);g.userData.kit=name;KIT_CACHE.set(k,g);}return g;}
FIN.kit=kit;FIN.KIT=KIT;
const kTrunk=(K,r0,r1,h,pal,rx,rz,y0)=>K.add(KP.cyl(r1,r0,h,6),pal||PAL.bark,tm(0,(y0||0)+h/2,0,rx||0,0,rz||0),{noise:r0*0.16,kN:0.15,kG:0.6,kJ:0.22});
const kBlob=(K,r,x,y,z,pal,sx,sy,sz,o)=>K.add(KP.ico(r,o&&o.d||0),pal,tm(x,y,z,0,(x*7+z*3)%6,0,sx||1,sy||sx||1,sz||sx||1),Object.assign({noise:r*0.14,kN:0.6,kG:0.5,kJ:0.16},o||{}));
// ---------- деревья (высота ≈ 4 м при масштабе 1, как у елей прототипа) ----------
KIT.fir=v=>{const R=kRng(11+v*7),K=new KGeo(4.2,v*13);kTrunk(K,0.22,0.12,1.1);
  [[1.28,1.5,0.6],[1.02,1.35,1.42],[0.74,1.2,2.2],[0.44,0.98,2.92]].forEach(([r,h,y],i)=>K.add(KP.cone(r*(0.9+R()*0.2),h,7),PAL.fir,tm((R()-0.5)*0.1,y+h/2,(R()-0.5)*0.1,(R()-0.5)*0.12,R()*6,(R()-0.5)*0.12),{noise:0.07,kN:0.55,kG:0.6,kJ:0.16,s:-0.12+i*0.06}));
  return K.build();};
KIT.firTall=v=>{const R=kRng(21+v*5),K=new KGeo(5.4,v*7+3);kTrunk(K,0.2,0.1,1.3);
  [[0.98,1.2,0.8],[0.84,1.15,1.5],[0.68,1.1,2.2],[0.52,1.0,2.9],[0.34,0.9,3.55]].forEach(([r,h,y],i)=>K.add(KP.cone(r*(0.9+R()*0.2),h,6),PAL.fir,tm((R()-0.5)*0.08,y+h/2,(R()-0.5)*0.08,0,R()*6,0),{noise:0.06,kN:0.55,kG:0.6,kJ:0.16,s:-0.18+i*0.06}));
  return K.build();};
KIT.spruce=v=>{const R=kRng(31+v*3),K=new KGeo(4.4,v*11+5);kTrunk(K,0.2,0.1,1.2,PAL.bark);   // болотная: тёмная, растрёпанная
  for(let i=0;i<6;i++){const r=1.15-i*0.17,y=0.55+i*0.58;K.add(KP.cone(r*(0.85+R()*0.3),0.95+R()*0.2,5+(i%2)),PAL.firDk,tm((R()-0.5)*0.22,y+0.5,(R()-0.5)*0.22,(R()-0.5)*0.3,R()*6,(R()-0.5)*0.3),{noise:0.1,kN:0.5,kG:0.5,kJ:0.22,s:-0.1+i*0.05});}
  return K.build();};
KIT.pine=v=>{const R=kRng(41+v*9),K=new KGeo(4.4,v*5+7);const lean=(R()-0.5)*0.12;kTrunk(K,0.17,0.1,2.8,PAL.bark,0,lean);
  const top=[[0,3.0,0,0.9],[0.5,2.62,0.22,0.62],[-0.45,2.72,-0.28,0.58],[0.1,2.4,-0.45,0.5]];
  top.forEach(([x,y,z,r],i)=>kBlob(K,r,x+lean*-2.8,y,z,PAL.fir,1,0.55,1,{s:0.05-i*0.05}));
  for(let i=0;i<2;i++){const a=R()*6.3;K.add(KP.cyl(0.03,0.05,0.5,4),PAL.bark,tm(Math.cos(a)*0.18,2.0+i*0.3,Math.sin(a)*0.18,Math.sin(a)*1.1,0,-Math.cos(a)*1.1),{kN:0.1,kJ:0.2});}
  return K.build();};
KIT.birch=v=>{const R=kRng(51+v*13),K=new KGeo(4.2,v*3+11);const lean=(R()-0.5)*0.18;K.add(KP.cyl(0.08,0.12,2.9,6),PAL.birch,tm(0,1.45,0,0,0,lean),{noise:0.015,kN:0.1,kG:0.35,kJ:0.12});
  for(let i=0;i<7;i++){const y=0.25+R()*2.4,a=R()*6.3,rr=0.115-y*0.012;K.add(KP.cyl(0.004,0.004,0.1+R()*0.08,3),PAL.night,tm(Math.cos(a)*rr-y*lean*0.97,y,Math.sin(a)*rr,Math.PI/2,a,0,1,1,1),{kN:0,kJ:0.1,s:-0.2});
    K.add(new THREE.BoxGeometry(0.05+R()*0.05,0.02,0.04),PAL.night,tm(Math.cos(a)*rr-y*lean*0.97,y,Math.sin(a)*rr,0,-a,0),{kN:0,kJ:0.1,s:0.3});}
  const cx=-2.9*lean*0.95;[[0,3.35,0,0.62],[0.45,3.0,0.15,0.5],[-0.42,3.05,-0.12,0.5],[0.1,2.6,0.4,0.45],[-0.12,2.55,-0.42,0.44],[0.2,3.7,-0.1,0.36]].forEach(([x,y,z,r],i)=>kBlob(K,r*(0.9+R()*0.2),cx+x,y,z,PAL.leaf,1,0.85,1,{s:0.06-i*0.03}));
  return K.build();};
KIT.oak=v=>{const R=kRng(61+v*17),K=new KGeo(4.0,v*9+13);kTrunk(K,0.36,0.22,1.6,PAL.bark);
  for(const s of[-1,1]){K.add(KP.cyl(0.08,0.14,1.1,5),PAL.bark,tm(s*0.35,1.75,0,0,0,-s*0.85),{noise:0.02,kN:0.15,kJ:0.2});}
  [[0,2.85,0,1.05],[0.95,2.45,0.25,0.8],[-0.95,2.5,-0.2,0.82],[0.3,2.4,0.85,0.72],[-0.3,2.45,-0.85,0.72],[0.15,3.45,0.1,0.7]].forEach(([x,y,z,r],i)=>kBlob(K,r*(0.9+R()*0.2),x,y,z,PAL.leafDk,1,0.78,1,{s:0.04-i*0.02}));
  return K.build();};
KIT.round=v=>{const R=kRng(71+v*19),K=new KGeo(3.6,v*2+17);kTrunk(K,0.15,0.1,1.5,PAL.bark);K.add(KP.cyl(0.03,0.05,0.5,4),PAL.bark,tm(0.12,1.4,0,0,0,-0.9),{kN:0.1});
  kBlob(K,1.08*(0.92+R()*0.16),0,2.35,0,v%2?PAL.leaf:PAL.green,1,0.95,1,{d:1,noise:0.1,kN:0.65});return K.build();};
KIT.poplar=v=>{const R=kRng(81+v*23),K=new KGeo(4.8,v*4+19);kTrunk(K,0.13,0.09,1.1);kBlob(K,0.68*(0.9+R()*0.2),0,2.65,0,PAL.leafDk,1,2.5,1,{d:1,noise:0.07,kN:0.55,kG:0.8});return K.build();};
KIT.willow=v=>{const R=kRng(91+v*29),K=new KGeo(3.6,v*6+23);kTrunk(K,0.28,0.18,1.7,PAL.bark,0,(R()-0.5)*0.2);
  kBlob(K,1.25,0,2.45,0,PAL.moss,1,0.62,1,{d:1,noise:0.1,kN:0.6});
  for(let i=0;i<16;i++){const a=i/16*6.283+R()*0.3,r=1.0+R()*0.2,l=0.9+R()*0.7;K.add(KP.cone(0.07,l,3),PAL.moss,tm(Math.cos(a)*r,2.2-l/2,Math.sin(a)*r,Math.PI,a,0,1,1,0.4),{kN:0.2,kG:0.9,kJ:0.2,s:-0.1});}
  return K.build();};
KIT.apple=v=>{const R=kRng(101+v*31),K=new KGeo(3.5,v*8+29);kTrunk(K,0.16,0.11,1.3,PAL.bark);
  [[0,2.3,0,0.92],[0.55,2.05,0.2,0.62],[-0.5,2.1,-0.2,0.62]].forEach(([x,y,z,r])=>kBlob(K,r,x,y,z,PAL.leaf,1,0.85,1,{d:1,noise:0.08}));
  for(let i=0;i<10;i++){const a=R()*6.283,e=R()*1.2-0.2,r=0.95;K.add(KP.ico(0.09,0),PAL.red,tm(Math.cos(a)*Math.cos(e)*r,2.25+Math.sin(e)*r*0.8,Math.sin(a)*Math.cos(e)*r),{kN:0.5,kJ:0.1,s:0.1});}
  return K.build();};
KIT.autumn=v=>{const R=kRng(111+v*37),K=new KGeo(3.8,v*12+31);kTrunk(K,0.2,0.12,1.5,PAL.bark);
  [[0,2.6,0,0.95,PAL.autumn],[0.7,2.25,0.2,0.7,PAL.yellow],[-0.65,2.3,-0.25,0.7,PAL.autumn],[0.1,3.2,0,0.55,PAL.yellow]].forEach(([x,y,z,r,p])=>kBlob(K,r*(0.92+R()*0.16),x,y,z,p,1,0.85,1));
  return K.build();};
KIT.snag=v=>{const R=kRng(121+v*41),K=new KGeo(3.2,v*14+37);const pal=v%2?PAL.ash:PAL.bark;const lean=(R()-0.5)*0.3;
  K.add(KP.cyl(0.07,0.2,2.6,6),pal,tm(0,1.3,0,0,0,lean),{noise:0.04,kN:0.1,kG:0.5,kJ:0.25});
  for(let i=0;i<4;i++){const y=1.0+i*0.45+R()*0.2,a=R()*6.3,l=0.5+R()*0.6;K.add(KP.cyl(0.015,0.05,l,4),pal,tm(-y*lean*0.98+Math.cos(a)*l*0.4,y+l*0.25,Math.sin(a)*l*0.4,Math.sin(a)*0.9,0,-Math.cos(a)*0.9),{noise:0.01,kN:0.1,kJ:0.25});}
  K.add(KP.cone(0.1,0.3,5),pal,tm(-2.6*lean,2.7,0,0.3,0,0.2),{kN:0.1});return K.build();};
KIT.cloudTree=v=>{const R=kRng(131+v*43),K=new KGeo(3.6,v*15+41);K.add(KP.cyl(0.09,0.15,1.8,6),PAL.gold,tm(0,0.9,0,0,0,(R()-0.5)*0.2),{noise:0.02,kN:0.3,kG:0.5});
  [[0,2.3,0,0.8],[0.6,2.0,0.2,0.55],[-0.55,2.05,-0.2,0.55],[0.1,2.75,0.1,0.5]].forEach(([x,y,z,r])=>kBlob(K,r,x,y,z,PAL.cloud,1,0.8,1,{d:1,kN:0.5,kJ:0.08}));return K.build();};
// ---------- кусты, трава, цветы ----------
KIT.bush=v=>{const R=kRng(141+v*47),K=new KGeo(0.9,v*16+43);const p=[PAL.leafDk,PAL.leaf,PAL.moss][v%3];
  [[0,0.42,0,0.48],[0.4,0.32,0.12,0.36],[-0.38,0.33,-0.1,0.37],[0.08,0.3,0.4,0.33],[-0.1,0.3,-0.4,0.32]].forEach(([x,y,z,r],i)=>kBlob(K,r*(0.85+R()*0.3),x,y,z,p,1,0.8,1,{s:0.06-i*0.03,kG:0.7}));return K.build();};
KIT.berry=v=>{const R=kRng(151+v*53),K=new KGeo(0.9,v*17+47);[[0,0.4,0,0.45],[0.38,0.3,0.1,0.34],[-0.36,0.32,-0.1,0.35]].forEach(([x,y,z,r])=>kBlob(K,r,x,y,z,PAL.leafDk,1,0.8,1,{kG:0.7}));
  for(let i=0;i<9;i++){const a=R()*6.283,e=R()*1.2,r=0.45;K.add(KP.ico(0.05,0),v%2?PAL.blue:PAL.red,tm(Math.cos(a)*Math.cos(e)*r,0.35+Math.sin(e)*r*0.7,Math.sin(a)*Math.cos(e)*r),{kN:0.5,kJ:0.1,s:0.15});}return K.build();};
KIT.fern=v=>{const R=kRng(161+v*59),K=new KGeo(0.7,v*18+53);for(let i=0;i<8;i++){const a=i/8*6.283+R()*0.3,l=0.55+R()*0.25;
    K.add(KP.cone(0.09,l,3),PAL.fir,tm(Math.cos(a)*l*0.38,0.2+R()*0.06,Math.sin(a)*l*0.38,0,-a,Math.PI/2-0.55,1,1,0.35),{kN:0.5,kG:0.8,kJ:0.2,s:0.1});}
  return K.build();};
KIT.reeds=v=>{const R=kRng(171+v*61),K=new KGeo(1.4,v*19+59);for(let i=0;i<7;i++){const x=(R()-0.5)*0.4,z=(R()-0.5)*0.4,h=0.8+R()*0.6,rx=(R()-0.5)*0.2,rz=(R()-0.5)*0.2;
    K.add(KP.cyl(0.012,0.02,h,4),PAL.leafDk,tm(x,h/2,z,rx,0,rz),{kN:0.1,kG:0.6,kJ:0.1});if(i%2===0)K.add(KP.cyl(0.035,0.035,0.2,5),PAL.log,tm(x-rz*h,h-0.05,z+rx*h,rx,0,rz),{kN:0.3,kJ:0.1});
    else K.add(KP.cone(0.03,0.5,3),PAL.leaf,tm(x,0.35,z,rx*2,R()*6,rz*2+0.3,1,1,0.4),{kN:0.3,kG:0.8});}return K.build();};
KIT.lily=v=>{const R=kRng(181+v*67),K=new KGeo(0.2,v*20+61);K.add(KP.cyl(0.34,0.34,0.03,9),PAL.grass,tm(0,0.015,0,0,R()*6,0,1,1,1),{kN:0.4,kJ:0.15});
  if(v%2===0){for(let i=0;i<6;i++){const a=i/6*6.283;K.add(KP.cone(0.045,0.13,4),i%2?PAL.pink:PAL.white,tm(Math.cos(a)*0.05+0.08,0.08,Math.sin(a)*0.05,Math.sin(a)*0.5,0,-Math.cos(a)*0.5),{kN:0.3,kJ:0.1});}K.add(KP.ico(0.035,0),PAL.yellow,tm(0.08,0.07,0));}
  return K.build();};
// пучок травы: тонкие лезвия (двусторонний материал), у корня темнее
KIT.tuft=v=>{const R=kRng(191+v*71),K=new KGeo(0.4,v*21+67);const p=v%3===2?PAL.leaf:PAL.grass;for(let i=0;i<7;i++){const a=i/7*6.283+R()*0.4,w=0.035,h=0.2+R()*0.18,lx=Math.sin(a)*0.07,lz=Math.cos(a)*0.07,cx=Math.cos(a)*w,cz=-Math.sin(a)*w;
    K.add(KP.tri([lx-cx,0,lz-cz],[lx+cx,0,lz+cz],[lx*2.2,h,lz*2.2]),p,null,{kN:0,kG:1.4,kJ:0.12,s:0.05});}return K.build();};
KIT.flower=v=>{const R=kRng(201+v*73),K=new KGeo(0.4,v*22+71);const pc=[PAL.pink,PAL.bluefl,PAL.yellow,PAL.white,PAL.red][v%5];
  const h=0.22+R()*0.12;K.add(KP.cyl(0.01,0.012,h,3),PAL.leafDk,tm(0,h/2,0),{kN:0,kG:0.6});K.add(KP.cone(0.05,0.14,3),PAL.leaf,tm(0.04,0.08,0,0,0,-0.9,1,1,0.4),{kN:0.3});
  for(let i=0;i<5;i++){const a=i/5*6.283;K.add(KP.ico(0.045,0),pc,tm(Math.cos(a)*0.05,h,Math.sin(a)*0.05,0,a,0,1,0.45,1),{kN:0.4,kJ:0.12,s:0.1});}
  K.add(KP.ico(0.03,0),pc===PAL.yellow?PAL.bark:PAL.yellow,tm(0,h+0.015,0),{kN:0.4,s:0.2});return K.build();};
// ---------- камни ----------
KIT.rock=v=>{const R=kRng(211+v*79),K=new KGeo(0.8,v*23+73);const p=[PAL.stone,PAL.sandstone,PAL.stone][v%3];
  K.add(KP.dod(0.6),p,tm(0,0.28,0,R(),R()*6,R(),1.2,0.72,1),{noise:0.12,kN:0.55,kG:0.5,kJ:0.16});
  if(v%2)K.add(KP.dod(0.28),p,tm(0.55,0.12,0.2,R(),R()*6,R(),1,0.7,1),{noise:0.06,kN:0.55,kJ:0.16});
  K.add(KP.ico(0.22,0),PAL.moss,tm(-0.1,0.62,0,0,R()*6,0,1.6,0.3,1.3),{noise:0.04,kN:0.5,s:0.1});return K.build();};
KIT.rockFlat=v=>{const R=kRng(221+v*83),K=new KGeo(0.4,v*24+79);K.add(KP.dod(0.7),v%2?PAL.sandstone:PAL.stone,tm(0,0.14,0,R()*0.3,R()*6,R()*0.3,1.3,0.32,1.05),{noise:0.1,kN:0.55,kJ:0.16});return K.build();};
KIT.boulders=v=>{const R=kRng(231+v*89),K=new KGeo(1.6,v*25+83);const p=v%2?PAL.sandstone:PAL.stone;
  [[0,0.6,0,1.0],[1.1,0.4,0.3,0.7],[-0.9,0.35,-0.2,0.62],[0.3,0.25,-0.9,0.5]].forEach(([x,y,z,r])=>K.add(KP.dod(r),p,tm(x,y,z,R(),R()*6,R(),1.1,0.8,1),{noise:r*0.18,kN:0.55,kG:0.5,kJ:0.16}));
  K.add(KP.ico(0.35,0),PAL.moss,tm(0,1.25,0,0,R()*6,0,1.6,0.3,1.4),{noise:0.05,kN:0.5,s:0.1});return K.build();};
KIT.pebble=v=>{const R=kRng(241+v*97),K=new KGeo(0.15,v*26+89);K.add(KP.ico(0.1,0),[PAL.stone,PAL.sandstone,PAL.white][v%3],tm(0,0.04,0,R(),R()*6,R(),1.2,0.55,1),{noise:0.02,kN:0.5,kJ:0.12});return K.build();};
KIT.cliff=v=>{const R=kRng(251+v*101),K=new KGeo(4,v*27+97);const p=v%2?PAL.sandstone:PAL.cliff;   // скала-столб со слоями (средний план)
  let y=0;for(let i=0;i<4;i++){const h=0.8+R()*0.6,r=1.3-i*0.22+R()*0.2;K.add(KP.cyl(r*0.92,r,h,6+(i%2)),p,tm((R()-0.5)*0.2,y+h/2,(R()-0.5)*0.2,0,R()*6,0),{noise:0.1,kN:0.6,kG:0.4,kJ:0.14,s:(i%2?-0.1:0.08)});y+=h;}
  K.add(KP.ico(0.8,0),PAL.grass,tm(0,y,0,0,R()*6,0,1.1,0.3,1.1),{noise:0.08,kN:0.6,s:0.1});return K.build();};
// ---------- грибы, пни, брёвна ----------
KIT.amanita=v=>{const R=kRng(261+v*103),K=new KGeo(0.4,v*28+101);const s=0.8+R()*0.5;K.add(KP.cyl(0.035*s,0.05*s,0.2*s,5),PAL.cream,tm(0,0.1*s,0),{kN:0.1,kG:0.4});
  K.add(KP.lathe([[0,0.3],[0.12,0.28],[0.17,0.22],[0.16,0.19],[0,0.2]].map(p=>[p[0]*s,p[1]*s]),7),PAL.mush,tm(0,-0.02*s,0,0.1,R()*6,0),{kN:0.5,kJ:0.1});
  for(let i=0;i<5;i++){const a=R()*6.283,r=(0.05+R()*0.07)*s;K.add(KP.ico(0.018*s,0),PAL.white,tm(Math.cos(a)*r,(0.28-r*0.6)*s+0.005,Math.sin(a)*r),{kN:0.4,s:0.3});}return K.build();};
KIT.boletus=v=>{const R=kRng(271+v*107),K=new KGeo(0.35,v*29+103);const s=0.8+R()*0.4;K.add(KP.cyl(0.05*s,0.07*s,0.16*s,6),PAL.cream,tm(0,0.08*s,0),{kN:0.1,kG:0.4});
  K.add(KP.lathe([[0,0.24],[0.1,0.23],[0.14,0.18],[0.13,0.15],[0,0.15]].map(p=>[p[0]*s,p[1]*s]),7),PAL.bark,tm(0,0,0,0,R()*6,0),{kN:0.5,kJ:0.1,s:0.2});return K.build();};
// светящиеся грибы: ножки обычные, шляпки — отдельной геометрией для материала свечения
KIT.glowStems=v=>{const R=kRng(281+v*109),K=new KGeo(0.3,v*30+107);for(let i=0;i<4;i++){const x=(R()-0.5)*0.35,z=(R()-0.5)*0.35,h=0.1+R()*0.12;K.add(KP.cyl(0.015,0.022,h,4),PAL.cream,tm(x,h/2,z),{kN:0.1});}return K.build();};
KIT.glowCaps=v=>{const R=kRng(281+v*109),K=new KGeo(0.3,v*30+107);for(let i=0;i<4;i++){const x=(R()-0.5)*0.35,z=(R()-0.5)*0.35,h=0.1+R()*0.12;K.add(KP.lathe([[0,0.05],[0.05,0.04],[0.07,0.0],[0,0.005]],6),v%2?PAL.crystal:PAL.green,tm(x,h,z),{kN:0.3,kJ:0.1,s:0.3});}return K.build();};
KIT.stump=v=>{const R=kRng(291+v*113),K=new KGeo(0.5,v*31+109);const r=0.3+R()*0.12,h=0.35+R()*0.2;K.add(KP.bcyl(r,h,0.03,7),PAL.bark,tm(0,h/2,0,0,R()*6,0),{noise:0.03,kN:0.1,kG:0.5,kJ:0.2,flat:true});
  K.add(KP.cyl(r*0.84,r*0.84,0.02,7),PAL.plank,tm(0,h+0.005,0,0,R()*6,0),{kN:0.3,kJ:0.08,s:0.2});K.add(KP.cyl(r*0.45,r*0.45,0.02,6),PAL.plank,tm(0,h+0.012,0),{kN:0,kJ:0,s:-0.3});
  for(let i=0;i<3;i++){const a=i/3*6.283+R();K.add(KP.cone(0.1,0.5,4),PAL.bark,tm(Math.cos(a)*r*0.95,0.08,Math.sin(a)*r*0.95,Math.sin(a)*1.3,0,-Math.cos(a)*1.3,1,1,0.6),{noise:0.02,kN:0.2});}
  if(v%2)K.add(KP.ico(0.15,0),PAL.moss,tm(r*0.3,h+0.02,0,0,0,0,1.4,0.35,1.2),{kN:0.5,s:0.1});return K.build();};
KIT.log=v=>{const R=kRng(301+v*127),K=new KGeo(0.5,v*32+113);const r=0.2+R()*0.08,l=1.6+R()*0.8;const g=KP.bcyl(r,l,0.02,7);g.rotateZ(Math.PI/2);
  K.add(g,PAL.bark,tm(0,r,0,0,R()*6.28,0),{noise:0.025,kN:0.35,kJ:0.22});
  for(const s of[-1,1]){const d=KP.cyl(r*0.85,r*0.85,0.02,7);d.rotateZ(Math.PI/2);K.add(d,PAL.plank,tm(s*l/2,r,0),{kN:0,kJ:0.08,s:0.1});}
  K.add(KP.ico(0.15,0),PAL.moss,tm(0.2,r*1.9,0,0,0,0,1.8,0.4,1.1),{kN:0.5,s:0.1});
  const g2=K.build();g2.rotateY(R()*6.28);return g2;};
KIT.roots=v=>{const R=kRng(311+v*131),K=new KGeo(0.4,v*33+127);for(let i=0;i<5;i++){const a=R()*6.283,l=0.6+R()*0.5;K.add(KP.cone(0.07,l,4),PAL.bark,tm(Math.cos(a)*l*0.4,0.05,Math.sin(a)*l*0.4,0,-a,Math.PI/2+0.15,1,1,0.7),{noise:0.02,kN:0.3,kJ:0.2});}return K.build();};
