  /* ---------- хозяйство Лукоморья: огород Дедки и курятник Рябы (подробно — wiki/Лукоморье.md) ---------- */
  // Дедка ходит меж грядок и после похода просит урожай — заказ (вдвое орешков; за три — соломенная шляпа). У каждой культуры свой сбор:
  // морковку выдернуть (держи удар; через раз её хватает заяц — догони), горох раскатывается горошинами (их клюют и цыплята), с подсолнуха —
  // семечки Рябе, репка растёт на поход дольше и тянется вдвоём (не выходит — кличут мышку). Грачи клюют всходы — гоните их; наряженное
  // пугало их отпугивает. Дождик поливает сам, в засуху — поливать вдвое; цыплята рыхлят землю — политая грядка держит влагу ещё поход.
  // Ряба просит то зёрнышек, то водицы, то червячка, то ласки (гладить — держать удар, не тискать). Исполнишь два желания — снесёт золотое
  // яичко: его несут Дедке в лукошке, а друг гоняет мышек. Цыплята иногда разбегаются по Лукоморью — найти по писку и привести во двор.
  // Чудо-горошина (спрятана на 1-4, модуль late_99zf_pea14) за три похода вырастает до неба: по листьям — на облако, там жерновцы.
  const CROPS={morkov:{name:'Морковка',nuts:2,ripe:3,icon:SV('<path d="M32 58 L22 20 H42Z" fill="#ff8a2a"/><path d="M26 22 L20 6 M32 20 L32 4 M38 22 L44 6" stroke="#3f8a3a" stroke-width="4"/>')},
    goroh:{name:'Горох',nuts:2,ripe:3,icon:SV('<path d="M10 40 Q32 10 54 40 Q32 54 10 40Z" fill="#6ac04a"/><circle cx="22" cy="36" r="5" fill="#9ae07a"/><circle cx="32" cy="34" r="5" fill="#9ae07a"/><circle cx="42" cy="36" r="5" fill="#9ae07a"/>')},
    podsolnuh:{name:'Подсолнух',nuts:2,ripe:3,icon:SV('<path d="M32 40 V60" stroke="#3f8a3a" stroke-width="4"/><circle cx="32" cy="26" r="18" fill="#ffd23a"/><circle cx="32" cy="26" r="9" fill="#7a4a1a"/>')},
    repka:{name:'Репка',nuts:8,ripe:4,icon:SV('<path d="M32 60 Q8 50 12 32 Q18 18 32 18 Q46 18 52 32 Q56 50 32 60Z" fill="#f4ecf4"/><path d="M14 30 Q32 22 50 30 Q46 18 32 18 Q18 18 14 30Z" fill="#b06ab0"/><path d="M28 18 L20 2 M32 18 V2 M36 18 L44 2" stroke="#3f8a3a" stroke-width="4"/>')}};
  const ripeOf=b=>b.crop?CROPS[b.crop].ripe:3,pk=a=>a[Math.floor(Math.random()*a.length)],defs=(o,d)=>{for(const k in d)if(o[k]===undefined)o[k]=d[k];return o;};
  if(!G.garden)G.garden={beds:[0,1,2,3].map(()=>({crop:null,stage:0,wet:false})),trip:G.trips||0};
  if(!G.hen)G.hen={food:0.7,joy:0.6,eggs:1,gold:0,chicks:0,trip:G.trips||0,happy:0};
  const GD=defs(G.garden,{order:'morkov',orders:0,carrots:0,seeds:0,dry:false,scare:{},hare:false,pea:0,peaSt:0,mill:false}),HN=defs(G.hen,{wish:null,wishN:0,hide:false,golds:0});
  const scareN=()=>['hat','neck','back'].filter(s=>GD.scare[s]&&own(GD.scare[s])).length;
  // поход прошёл: грядки растут, погода, грачи, заказ Дедки, чудо-горох, жерновцы; Ряба несёт яички
  const NEWS={},nG=Math.min(3,Math.max(0,(G.trips||0)-GD.trip)),nH=Math.min(3,Math.max(0,(G.trips||0)-HN.trip));
  if(nG){for(let i=0;i<nG;i++)for(const b of GD.beds)if(b.crop&&b.wet&&b.stage<ripeOf(b)&&!b.rook){b.stage++;b.grew=true;b.water=0;if(HN.chicks>=2&&!b.kept){b.kept=true;NEWS.kept=true;}else{b.wet=false;b.kept=false;}}
    const r=Math.random();GD.dry=r>=0.25&&r<0.4;if(r<0.25){for(const b of GD.beds)if(b.crop&&b.stage<ripeOf(b)){b.wet=true;NEWS.rain=true;}}else if(GD.dry)NEWS.dry=true;
    let nr=Math.max(0,2-scareN());for(const b of GD.beds)if(nr>0&&b.crop&&b.stage<ripeOf(b)&&!b.rook&&Math.random()<0.5){b.rook=true;nr--;NEWS.rooks=true;}
    if(!GD.order){GD.order=pk(Object.keys(CROPS));NEWS.order=true;}if(GD.pea===2&&GD.peaSt<3){GD.peaSt=Math.min(3,GD.peaSt+nG);NEWS.pea=true;}
    if(GD.mill){G.nutsHub=(G.nutsHub||0)+3*nG;NEWS.mill=3*nG;}GD.trip=G.trips;}
  if(nH){for(let i=0;i<nH;i++){const gold=HN.wishN>=2&&HN.joy>0.6,egg=gold||HN.wishN>=1||(HN.food>0.45&&HN.joy>0.45);if(gold)HN.gold++;else if(egg)HN.eggs++;
      if(egg){HN.happy++;if(HN.happy%2===0&&HN.chicks<4){HN.chicks++;HN.newChick=true;}}HN.food=Math.max(0,HN.food-0.4);HN.joy=Math.max(0,HN.joy-0.35);HN.wishN=0;}
    HN.trip=G.trips;HN.wish=null;if(HN.chicks>=2&&Math.random()<0.5)HN.hide=true;}
  HN.eggs=Math.min(HN.eggs,6);HN.gold=Math.min(HN.gold,3);
  const BEDC=[-17,-14.8,-12.6,-10.4].map(x=>new V3(x,0,1.7));const beds=G.garden.beds;
  const BARREL=new V3(-8.3,0,3.3),DEDKA=new V3(-8.2,0,0.9);
  const bedG=BEDC.map((c,i)=>{const g=new THREE.Group();g.position.copy(c);W.group.add(g);const soil=addMesh(new THREE.BoxGeometry(1.8,0.16,1.4),M(0x4a2e18),0,0.08,0,g);
    for(const[x,z,w,d]of[[0,0.72,1.9,0.1],[0,-0.72,1.9,0.1],[0.93,0,0.1,1.4],[-0.93,0,0.1,1.4]])addMesh(new THREE.BoxGeometry(w,0.22,d),M(0x8a5a32),x,0.11,z,g);
    for(let k=-1;k<=1;k++)addMesh(new THREE.BoxGeometry(1.6,0.05,0.16),M(0x3a2410),0,0.17,k*0.4,g);const pl=new THREE.Group();g.add(pl);const drop=dropMesh(0x4aa8ff);drop.scale.setScalar(0.38);g.add(drop);
    const star=new THREE.Mesh(new THREE.OctahedronGeometry(0.12),MB(0xfff2b0));g.add(star);return {g,pl,drop,star,soil,sun:null};});
  const soilCol=b=>b.wet?0x2c1a0c:GD.dry?0x9a7a52:0x4a2e18;
  function plantDraw(i){const b=beds[i],P=bedG[i].pl;while(P.children.length)P.remove(P.children[0]);bedG[i].soil.material.color.setHex(soilCol(b));bedG[i].sun=null;const gr=M(0x3f8a3a),lg=M(0x6ac04a);if(!b.crop)return;const c=b.crop,big=c==='repka'&&b.stage>=4,s=Math.min(3,b.stage);
    if(s===0){for(let k=0;k<3;k++)part(P,new THREE.SphereGeometry(0.05,6,4),M(0xd8c08a),(k-1)*0.3,0.2,0);return;}
    if(s===1){for(let k=-1;k<=1;k+=2){const l=part(P,new THREE.SphereGeometry(0.08,6,4),lg,k*0.06,0.3,0);l.scale.set(1.4,0.4,0.8);}part(P,new THREE.CylinderGeometry(0.015,0.015,0.14,4),gr,0,0.24,0);return;}
    if(c==='morkov'){for(let k=0;k<3;k++){const x=(k-1)*0.45;for(let j=0;j<4;j++){const l=part(P,new THREE.ConeGeometry(0.04,s===3?0.5:0.34,4),gr,x+rand(-0.05,0.05),s===3?0.42:0.34,rand(-0.05,0.05));l.rotation.z=rand(-0.4,0.4);}
      if(s===3){const cr=part(P,new THREE.ConeGeometry(0.08,0.3,8),M(0xff8a2a),x,0.2,0);cr.rotation.x=Math.PI;}}}
    else if(c==='goroh'){part(P,new THREE.CylinderGeometry(0.02,0.02,s===3?1.1:0.7,4),M(0x8a6a44),0,s===3?0.7:0.5,0);for(let k=0;k<(s===3?5:3);k++){const l=part(P,new THREE.SphereGeometry(0.09,6,4),lg,Math.sin(k*2)*0.1,0.35+k*0.15,Math.cos(k*2)*0.1);l.scale.set(1.3,0.5,1);}
      if(s===3)for(let k=0;k<4;k++){const p=part(P,new THREE.SphereGeometry(0.07,8,6),M(0x9ae07a),Math.sin(k*1.7)*0.16,0.5+k*0.14,Math.cos(k*1.7)*0.16);p.scale.set(0.8,1.9,0.8);}}
    else if(c==='podsolnuh'){const h2=s===3?1.3:0.75;part(P,new THREE.CylinderGeometry(0.035,0.045,h2,6),gr,0,0.18+h2/2,0);for(let k=-1;k<=1;k+=2){const l=part(P,new THREE.SphereGeometry(0.12,6,4),lg,k*0.13,0.2+h2*0.45,0);l.scale.set(1.4,0.3,0.8);}
      if(s===3){const fl=new THREE.Group();fl.position.set(0,0.2+h2,0.05);fl.rotation.x=-0.3;P.add(fl);bedG[i].sun=fl;for(let k=0;k<12;k++){const a=k/12*Math.PI*2;const pt=part(fl,new THREE.SphereGeometry(0.09,6,4),M(0xffd23a),Math.cos(a)*0.24,Math.sin(a)*0.24,0);pt.scale.set(1.5,0.6,0.3);pt.rotation.z=a;}
        part(fl,new THREE.CylinderGeometry(0.17,0.17,0.06,14),M(0x7a4a1a),0,0,0.02).rotation.x=Math.PI/2;}else part(P,new THREE.SphereGeometry(0.1,8,6),lg,0,0.25+h2,0);}
    else{const r=big?0.66:s===3?0.42:0.24;const tb=part(P,new THREE.SphereGeometry(r,14,10),M(0xf4ecf4),0,0.14+r*0.55,0);tb.scale.y=0.9;const tp=part(P,new THREE.SphereGeometry(r*0.98,14,8,0,Math.PI*2,0,Math.PI/2.4),M(0xb06ab0),0,0.14+r*0.62,0);
      for(let k=0;k<5;k++){const a=k/5*Math.PI*2;const l=part(P,new THREE.SphereGeometry(0.16*(big?2:s===3?1.4:1),6,4),gr,Math.cos(a)*0.12,0.18+r*1.4+0.12,Math.sin(a)*0.12);l.scale.set(0.5,1.6,0.3);l.rotation.z=Math.cos(a)*0.5;l.rotation.x=Math.sin(a)*0.5;}}}
  beds.forEach((b,i)=>plantDraw(i));
  /* ---------- Дедка: ходит меж грядок, полет, к гостям оборачивается; над головой — заказ ---------- */
  const ded=new THREE.Group();ded.position.copy(DEDKA);ded.rotation.y=-Math.PI/2;W.group.add(ded);
  {const sh=M(0xe8e0d0),bl=M(0x5a6a9a),sk=M(0xe8c0a0),wh=M(0xf8f8f8);part(ded,new THREE.CylinderGeometry(0.3,0.36,0.9,10),bl,0,0.45,0);part(ded,new THREE.CylinderGeometry(0.32,0.3,0.55,10),sh,0,1.15,0);part(ded,new THREE.SphereGeometry(0.24,10,8),sk,0,1.62,0);
    const bd=new THREE.ConeGeometry(0.2,0.5,8);bd.rotateX(Math.PI);part(ded,bd,wh,0,1.34,0.14);part(ded,new THREE.CylinderGeometry(0.27,0.27,0.08,12),M(0x3a3a4a),0,1.82,0);part(ded,new THREE.CylinderGeometry(0.2,0.22,0.16,12),M(0x3a3a4a),0,1.92,0);
    part(ded,new THREE.CylinderGeometry(0.025,0.025,1.4,5),M(0x6b4a2b),0.38,0.7,0.1);for(const s of[-1,1])part(ded,new THREE.SphereGeometry(0.03,6,5),MAT.dark,s*0.08,1.67,0.21);}
  const dedCyl={x:DEDKA.x,z:DEDKA.z,r:0.4,miny:-1,maxy:2,on:true};W.cyls.push(dedCyl);
  const DPTS=[{p:DEDKA},{p:new V3(-16.1,0,0.45),weed:1},{p:new V3(-14.8,0,0.4),weed:1},{p:new V3(-10.3,0,0.45),weed:1},{p:new V3(-12.5,0,0.4),weed:1}],DD={mode:'stand',t:2,tgt:DPTS[0],bend:0};
  const ORDER_LINE={morkov:'Бабке на пирог морковки бы — принеси, внучек!',goroh:'Гороху бы стручок — на кашу да на щи!',podsolnuh:'Подсолнух бы к празднику — солнышко на стол!',repka:'Репку бы — да побольше! Всем миром тянуть.'};
  const DED_H={proshka:'Ай да Прошка, рыжий хвост — урожай-то в полный рост!',potap:'Потапушка-силач — и на грядке не плошает!',pelageya:'Пелагеюшка-умница — всё по тетрадке, всё к порядку!',yosha:'Йоша хоть и мал, а урожай собрал!'};
  // картинка урожая: над Дедкой (заказ), в лапах, у зайца; каждый раз новая (clone() мешей в релизе нельзя — в userData ссылки)
  function cropIcon(c){const g=new THREE.Group();
    if(c==='morkov'){const k=part(g,new THREE.ConeGeometry(0.1,0.36,8),MB(0xff8a2a),0,0,0);k.rotation.x=Math.PI;for(const s of[-1,0,1]){const l=part(g,new THREE.ConeGeometry(0.03,0.16,4),MB(0x4aa040),s*0.04,0.24,0);l.rotation.z=s*0.4;}}
    else if(c==='goroh'){const p=part(g,new THREE.SphereGeometry(0.14,10,8),MB(0x6ac04a),0,0,0);p.scale.set(1.8,0.6,0.7);for(let k=-1;k<=1;k++)part(g,new THREE.SphereGeometry(0.055,8,6),MB(0x9ae07a),k*0.12,0.03,0.07);}
    else if(c==='podsolnuh'){for(let k=0;k<10;k++){const a=k/10*Math.PI*2;const pt=part(g,new THREE.SphereGeometry(0.06,6,4),MB(0xffd23a),Math.cos(a)*0.15,Math.sin(a)*0.15,0);pt.scale.set(1.5,0.6,0.4);pt.rotation.z=a;}part(g,new THREE.CylinderGeometry(0.1,0.1,0.04,12),MB(0x7a4a1a),0,0,0.01).rotation.x=Math.PI/2;}
    else{part(g,new THREE.SphereGeometry(0.15,12,10),MB(0xf4ecf4),0,0,0);part(g,new THREE.SphereGeometry(0.152,12,8,0,Math.PI*2,0,Math.PI/2.4),MB(0xb06ab0),0,0.02,0);for(const s of[-1,0,1]){const l=part(g,new THREE.SphereGeometry(0.05,6,4),MB(0x4aa040),s*0.05,0.2,0);l.scale.set(0.5,1.8,0.3);l.rotation.z=s*0.5;}}return g;}
  const ordIc={};for(const c of Object.keys(CROPS)){const g=cropIcon(c);g.visible=false;W.group.add(g);ordIc[c]=g;}
  // жерновцы с облака: стоят у бочки, мелют сами
  const mill=new THREE.Group();mill.position.set(-6.9,0,1.5);W.group.add(mill);{const st=M(0x9a9a9a);addMesh(new THREE.CylinderGeometry(0.42,0.45,0.2,16),st,0,0.1,0,mill);mill.top=addMesh(new THREE.CylinderGeometry(0.4,0.42,0.18,16),M(0xb0b0b0),0,0.3,0,mill);
    addMesh(new THREE.CylinderGeometry(0.03,0.03,0.4,5),M(0x6b4a2b),0.28,0.5,0,mill.top);}mill.visible=GD.mill;if(GD.mill)W.cyls.push({x:-6.9,z:1.5,r:0.45,miny:-1,maxy:0.4,on:true});
  {const bg=new THREE.Group();bg.position.copy(BARREL);W.group.add(bg);addMesh(new THREE.CylinderGeometry(0.42,0.36,0.7,12),M(0x8a5a32),0,0.35,0,bg);for(const y of[0.15,0.55])addMesh(new THREE.TorusGeometry(0.4,0.025,5,16),M(0x4a4a50),0,y,0,bg).rotation.x=Math.PI/2;
    addMesh(new THREE.CylinderGeometry(0.37,0.37,0.02,14),MB(0x4aa8ff),0,0.66,0,bg);W.cyls.push({x:BARREL.x,z:BARREL.z,r:0.45,miny:-1,maxy:0.7,on:true});}
  const can=new THREE.Group();W.group.add(can);{const cm=M(0x5a9ac0);part(can,new THREE.CylinderGeometry(0.13,0.15,0.26,10),cm,0,0,0);const sp=part(can,new THREE.CylinderGeometry(0.02,0.035,0.3,6),cm,0.17,0.04,0);sp.rotation.z=-1.0;
    part(can,new THREE.TorusGeometry(0.1,0.02,5,10,Math.PI),cm,-0.02,0.14,0).rotation.y=Math.PI/2;}
  const CAN={h:null,water:0};const canHome=()=>{can.position.set(BARREL.x+0.12,0.84,BARREL.z);can.rotation.set(0,0,0);};canHome();
  /* ---------- пугало у грядок: наряды из лавки (шапка, на шею, за спину) — чем наряднее, тем меньше грачей ---------- */
  const SCARE=new V3(-13.7,0,5.0),PFIT={hat:0,hs:1.15,neck:[0,0.2],back:[0,0],bs:1.1,waist:[0,0.3],feet:[0,0]};
  const scG=new THREE.Group();scG.position.copy(SCARE);W.group.add(scG);
  {const wd=M(0x8a6a44),sh=M(0x6a8ac0);addMesh(new THREE.CylinderGeometry(0.06,0.07,2.0,6),wd,0,1.0,0,scG);const arm=addMesh(new THREE.CylinderGeometry(0.045,0.045,1.5,6),wd,0,1.45,0,scG);arm.rotation.z=Math.PI/2;
    addMesh(new THREE.CylinderGeometry(0.22,0.34,0.8,8),sh,0,1.25,0,scG);for(const s of[-1,1]){const sl=addMesh(new THREE.CylinderGeometry(0.09,0.12,0.5,6),sh,s*0.45,1.45,0,scG);sl.rotation.z=s*Math.PI/2;
      for(let k=0;k<3;k++){const st=addMesh(new THREE.ConeGeometry(0.025,0.2,4),M(0xe8c86a),s*(0.74+k*0.02),1.45+(k-1)*0.06,0,scG);st.rotation.z=-s*Math.PI/2;}}
    addMesh(new THREE.SphereGeometry(0.24,10,8),M(0xd8c08a),0,1.88,0,scG);for(const s of[-1,1])addMesh(new THREE.SphereGeometry(0.03,6,5),MAT.dark,s*0.08,1.92,0.21,scG);
    const mo=addMesh(new THREE.TorusGeometry(0.07,0.015,5,10,Math.PI),MAT.dark,0,1.82,0.215,scG);mo.rotation.z=Math.PI;}
  W.cyls.push({x:SCARE.x,z:SCARE.z,r:0.25,miny:-1,maxy:2.1,on:true});
  const scSlot={hat:new THREE.Group(),neck:new THREE.Group(),back:new THREE.Group()};scSlot.hat.position.y=2.05;scSlot.neck.position.y=1.66;scSlot.back.position.set(0,1.4,-0.25);for(const s in scSlot)scG.add(scSlot[s]);
  function scareDraw(){for(const s in scSlot){const g=scSlot[s];while(g.children.length)g.remove(g.children[0]);const id=GD.scare[s];if(!id||!WEAR[id]||!own(id))continue;const w=new THREE.Group();g.add(w);
      if(s!=='neck')w.scale.setScalar(s==='hat'?PFIT.hs:PFIT.bs);WEAR[id].build(w,PFIT);}}
  scareDraw();
  function scarePick(pi){const opts=[null].concat(Object.keys(WEAR).filter(id=>['hat','neck','back'].includes(WEAR[id].slot)&&own(id)));
    if(opts.length<2){tip(pi,'Нарядить пугало нечем — шапки да бусы у Векши в лавке.',2.6);SFX.miss();return;}
    G.ui='scare';let sel=0;const el=$('mapui');el.style.display='flex';
    const draw=()=>{const a=clamp(sel-2,0,Math.max(0,opts.length-5));el.innerHTML='<div class="tet seed"><h2>Нарядим пугало!</h2><div class="seeds">'+opts.slice(a,a+5).map((id,j)=>'<div class="sd'+(a+j===sel?' sel':'')+'">'+(id?WEAR[id].icon+'<b>'+WEAR[id].name+'</b><small>'+(GD.scare[WEAR[id].slot]===id?'надето':SLOT_NAME[WEAR[id].slot])+'</small>':'<b>Снять всё</b>')+'</div>').join('')+'</div>'+
      '<div class="tale">Чем наряднее пугало, тем меньше грачей: шапка да на шею — ни одного!</div><div class="hint">'+K(pi,'left')+K(pi,'right')+' · '+K(pi,'jump')+' надеть / снять · '+K(pi,'guard')+' готово</div></div>';};
    draw();G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dx){sel=(sel+n.dx+opts.length)%opts.length;SFX.swap();draw();}if(tap(q,'guard')||pressed.has('Escape')){closePanel();return;}
      if(tap(q,'jump')){const id=opts[sel];if(!id)GD.scare={};else{const sl=WEAR[id].slot;GD.scare[sl]=GD.scare[sl]===id?null:id;}scareDraw();SFX.plate();draw();}}};}
  // грачи на грядках: клюют всходы — грядка не растёт, пока их не прогонят
  function makeRook(i){const g=new THREE.Group();W.group.add(g);const bk=M(0x2a2a34);const b=part(g,new THREE.SphereGeometry(0.16,8,6),bk,0,0.2,0);b.scale.set(0.8,0.8,1.3);const hd2=part(g,new THREE.SphereGeometry(0.1,8,6),bk,0,0.33,0.16);
    const bkk=part(g,new THREE.ConeGeometry(0.035,0.12,5),M(0xd8d0c0),0,0.31,0.3);bkk.rotation.x=Math.PI/2;const w=[];for(const s of[-1,1]){const x=part(g,new THREE.SphereGeometry(0.1,6,4),bk,s*0.14,0.24,-0.02);x.scale.set(0.3,0.7,1.3);w.push(x);}
    part(g,new THREE.BoxGeometry(0.14,0.03,0.2),bk,0,0.22,-0.24);g.position.set(BEDC[i].x+rand(-0.5,0.5),0.15,BEDC[i].z+rand(-0.35,0.35));g.rotation.y=rand(0,6.3);return {g,w,hd:hd2,i,t:rand(0,3),fly:0};}
  const rooks=[];beds.forEach((b,i)=>{if(b.rook)rooks.push(makeRook(i));});
  function shooRook(i){for(const r of rooks)if(r.i===i&&!r.fly)r.fly=0.01;beds[i].rook=false;G.nutsHub=(G.nutsHub||0)+1;SFX.whoosh();floatText(BEDC[i].clone().add(new V3(0,1.2,0)),'Кыш, грачи! +1 орешек','#ffd060');}
  /* ---------- чудо-грядка: чудо-горошина растёт три похода — и стебель до неба; по листьям — на облако, там сундучок ---------- */
  const PEA=new V3(-4.2,0,9.4),PEA_TOP=12;
  {const g=new THREE.Group();g.position.copy(PEA);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.75,0.85,0.18,16),M(0x4a2e18),0,0.09,0,g);addMesh(new THREE.TorusGeometry(0.8,0.07,6,20),M(0x8a5a32),0,0.16,0,g).rotation.x=Math.PI/2;
    addMesh(new THREE.CylinderGeometry(0.05,0.05,0.9,5),M(0x6b4a2b),0.95,0.45,-0.6,g);const sg=addMesh(new THREE.BoxGeometry(0.7,0.3,0.05),M(0xc8b080),0.95,0.95,-0.6,g);sg.rotation.y=-0.4;}
  W.cyls.push({x:PEA.x,z:PEA.z,r:0.85,miny:-1,maxy:0.18,on:true});
  const LEAVES=[];if(GD.pea>=2&&GD.peaSt>=3){for(let k=0;k<14;k++){const out=k>=11,a=out?10*1.05+0.45+(k-11)*0.56:k*1.05,r=out?2.35:1.3;LEAVES.push({x:PEA.x+Math.cos(a)*r,z:PEA.z+Math.sin(a)*r,y:0.75+k*0.8});}
    LEAVES.forEach(L=>W.cyls.push({x:L.x,z:L.z,r:0.58,miny:L.y-0.14,maxy:L.y,on:true}));W.cyls.push({x:PEA.x,z:PEA.z,r:0.2,miny:-1,maxy:PEA_TOP-0.36,on:true},{x:PEA.x,z:PEA.z,r:1.75,miny:PEA_TOP-0.35,maxy:PEA_TOP,on:true});}
  const peaG=new THREE.Group();peaG.position.copy(PEA);W.group.add(peaG);let chest=null;const CHEST=new V3(PEA.x+0.55,PEA_TOP,PEA.z+0.2);
  function peaDraw(){while(peaG.children.length)peaG.remove(peaG.children[0]);chest=null;if(GD.pea<2)return;const st=GD.peaSt,gr=M(0x3f9a3a),lg=M(0x6ac04a);
    if(st===0){part(peaG,new THREE.SphereGeometry(0.1,8,6),M(0x9ae07a,{emissive:0x3a8a20,emissiveIntensity:0.6}),0,0.26,0);return;}
    const H=st===1?0.9:st===2?3.6:PEA_TOP+0.3,n=Math.max(2,Math.ceil(H/0.7));
    for(let k=0;k<n;k++){const a=k*0.7;part(peaG,new THREE.CylinderGeometry(0.12,0.15,H/n+0.06,7),gr,Math.sin(a)*0.06,0.18+(k+0.5)*H/n,Math.cos(a)*0.06);}
    if(st<3){for(let k=0;k<(st===1?2:6);k++){const l=part(peaG,new THREE.SphereGeometry(0.24,8,5),lg,Math.cos(k*2.1)*0.32,0.5+k*H/7,Math.sin(k*2.1)*0.32);l.scale.set(1.3,0.25,0.8);}return;}
    for(const L of LEAVES){const dx=L.x-PEA.x,dz=L.z-PEA.z,l=part(peaG,new THREE.SphereGeometry(0.62,12,6),lg,dx,L.y-0.1,dz);l.scale.set(1,0.2,1);
      const v=part(peaG,new THREE.CylinderGeometry(0.04,0.04,Math.hypot(dx,dz),4),gr,dx/2,L.y-0.1,dz/2);v.rotation.z=Math.PI/2;v.rotation.y=-Math.atan2(dz,dx);}
    for(let k=0;k<6;k++){const pod=part(peaG,new THREE.SphereGeometry(0.12,8,6),M(0x9ae07a),Math.cos(k*1.9)*0.35,2+k*1.6,Math.sin(k*1.9)*0.35);pod.scale.set(0.6,1.7,0.6);}
    for(let k=0;k<9;k++){const a=k/9*Math.PI*2,r=k?1.25:0;const c=part(peaG,new THREE.SphereGeometry(k?0.75:1.05,12,8),M(0xffffff,{emissive:0xdde8ff,emissiveIntensity:0.35}),Math.cos(a)*r,PEA_TOP-0.22,Math.sin(a)*r);c.scale.y=0.42;}
    chest=new THREE.Group();chest.position.set(CHEST.x-PEA.x,PEA_TOP,CHEST.z-PEA.z);chest.rotation.y=-0.5;peaG.add(chest);part(chest,new THREE.BoxGeometry(0.6,0.36,0.42),M(0x8a5a32),0,0.18,0);part(chest,new THREE.BoxGeometry(0.64,0.06,0.46),M(0xffd23a),0,0.2,0);
    const lid=new THREE.Group();lid.position.set(0,0.36,-0.21);chest.add(lid);part(lid,new THREE.BoxGeometry(0.62,0.12,0.44),M(0xa86a3a),0,0.06,0.21);chest.lid=lid;if(GD.pea>=3)lid.rotation.x=-1.7;}
  peaDraw();
  function peaPlant(pi){GD.pea=2;GD.peaSt=0;peaDraw();SFX.grow();burst(PEA.clone().add(new V3(0,0.4,0)),0x9ae07a,16,2.5);floatText(PEA.clone().add(new V3(0,1.2,0)),'Чудо-горошина посажена!','#b8f0a0');
    later(0.8,()=>bark({g:ded},'dedka','Посадил дед горошину — выросла до неба, сказывают! Три похода — и поглядим.',3));}
  function peaTalk(pi){tip(pi,GD.pea<1?'Чудо-грядка пустая. Чудо-горошина, сказывают,<br>у Лешего в лесу водится — по тропке, где он водит.':GD.peaSt<3?'Чудо-горох растёт: ещё '+(3-GD.peaSt)+' '+(3-GD.peaSt===1?'поход':'похода')+' — и до неба!':'Прыгай по листьям — до самого неба!<br>Наверху облако, а на нём сундучок.',3);}
  function openChest(h,pi){GD.pea=3;GD.mill=true;mill.visible=true;W.cyls.push({x:-6.9,z:1.5,r:0.45,miny:-1,maxy:0.4,on:true});const p=15;G.nutsHub=(G.nutsHub||0)+p;if(chest)anim(0.6,q=>{chest.lid.rotation.x=-1.7*q;});SFX.horn();SFX.ok();
    burst(CHEST.clone().add(new V3(0,0.6,0)),0xffd76a,30,4);banner('Жерновцы!','#ffd76a',3.2,'сами мелют: после каждого похода — +3 орешка · сейчас +'+p);later(1.2,()=>floatText(CHEST.clone().add(new V3(0,1.2,0)),'Дедке у бочки поставим!','#ffe080'));}
  /* ---------- курятник Курочки Рябы ---------- */
  hut(-14.2,9.2,3.0,2.6,0xa03a2a,false);
  const YARD={x0:-12.2,x1:-6.6,z0:6.8,z1:11.4},YC=new V3(-9.4,0,9.1),NEST=new V3(-12.1,0,10.6),SACK=new V3(-12.1,0,7.4);
  {const fm=M(0x9a7a4a);for(const[a,b,c,d]of[[YARD.x0-0.2,YARD.x1+0.2,YARD.z1+0.1,YARD.z1+0.25],[YARD.x1+0.1,YARD.x1+0.25,YARD.z0-0.2,YARD.z1+0.2],[YARD.x0-0.2,-10.4,YARD.z0-0.25,YARD.z0-0.1],[-8.4,YARD.x1+0.2,YARD.z0-0.25,YARD.z0-0.1]]){
      box(a,b,0,0.55,c,d,fm,{occ:false});}
    const ng=new THREE.Group();ng.position.copy(NEST);W.group.add(ng);addMesh(new THREE.BoxGeometry(0.8,0.3,0.7),M(0x8a5a32),0,0.15,0,ng);addMesh(new THREE.CylinderGeometry(0.3,0.22,0.12,12),M(0xe0c060),0,0.34,0,ng);
    const sg=new THREE.Group();sg.position.copy(SACK);W.group.add(sg);const sk=addMesh(new THREE.SphereGeometry(0.34,10,8),M(0xc8b080),0,0.32,0,sg);sk.scale.set(1,1.2,0.9);addMesh(new THREE.ConeGeometry(0.14,0.2,6),M(0xb09a6a),0,0.76,0,sg);
    for(let k=0;k<6;k++)addMesh(new THREE.SphereGeometry(0.03,5,4),M(0xffd23a),rand(-0.15,0.15),0.72,rand(-0.1,0.1),sg);W.cyls.push({x:SACK.x,z:SACK.z,r:0.36,miny:-1,maxy:0.9,on:true},{x:NEST.x,z:NEST.z,r:0.4,miny:-1,maxy:0.34,on:true});}
  const TROUGH=new V3(-7.25,0,10.8),TW={lvl:0};
  {const tg=new THREE.Group();tg.position.copy(TROUGH);W.group.add(tg);addMesh(new THREE.BoxGeometry(0.9,0.22,0.4),M(0x8a5a32),0,0.11,0,tg);TW.m=addMesh(new THREE.BoxGeometry(0.76,0.02,0.28),MB(0x4aa8ff),0,0.2,0,tg);TW.m.visible=false;W.cyls.push({x:TROUGH.x,z:TROUGH.z,r:0.42,miny:-1,maxy:0.22,on:true});}
  function makeHen(){const g=new THREE.Group();W.group.add(g);const wh=M(0xf4efe4),sp=M(0x8a7a6a),rd=M(0xd8302a),yl=M(0xf0b030);const body=new THREE.Group();g.add(body);
    const b=part(body,new THREE.SphereGeometry(0.32,12,10),wh,0,0.42,0);b.scale.set(0.9,0.85,1.15);for(let i=0;i<12;i++)part(body,new THREE.SphereGeometry(0.035,5,4),sp,rand(-0.26,0.26),rand(0.3,0.62),rand(-0.32,0.2));
    const head=new THREE.Group();head.position.set(0,0.72,0.26);body.add(head);part(head,new THREE.SphereGeometry(0.15,10,8),wh,0,0,0);const bk=part(head,new THREE.ConeGeometry(0.045,0.12,6),yl,0,-0.02,0.16);bk.rotation.x=Math.PI/2;
    for(let i=0;i<3;i++)part(head,new THREE.SphereGeometry(0.045,6,5),rd,0,0.14,0.06-i*0.05);part(head,new THREE.SphereGeometry(0.035,6,5),rd,0,-0.1,0.12);for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.025,6,5),MAT.dark,s*0.08,0.03,0.1);
    const tl=part(body,new THREE.ConeGeometry(0.14,0.3,6),wh,0,0.62,-0.34);tl.rotation.x=-0.8;const wings=[];for(const s of[-1,1]){const w=part(body,new THREE.SphereGeometry(0.16,8,6),wh,s*0.27,0.45,-0.02);w.scale.set(0.35,0.8,1.1);wings.push(w);}
    for(const s of[-1,1])part(g,new THREE.CylinderGeometry(0.02,0.02,0.2,4),yl,s*0.09,0.1,0);return {g,body,head,wings};}
  function makeChick(){const g=new THREE.Group();W.group.add(g);part(g,new THREE.SphereGeometry(0.11,10,8),M(0xffe060),0,0.12,0);part(g,new THREE.SphereGeometry(0.075,8,6),M(0xffe060),0,0.25,0.05);const bk=part(g,new THREE.ConeGeometry(0.025,0.06,5),M(0xf09020),0,0.24,0.13);bk.rotation.x=Math.PI/2;
    for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.015,5,4),MAT.dark,s*0.035,0.27,0.11);return g;}
  const hen=makeHen();hen.g.position.copy(YC);const HS={tgt:YC.clone(),mode:'walk',t:0,flap:0,parade:null,paradeT:0,taps:[],met:{},petBy:null};
  const chicks=[];for(let i=0;i<HN.chicks;i++){const c=makeChick();c.position.set(YC.x-0.5-i*0.35,0,YC.z+0.3);c.userData={st:'home'};chicks.push(c);}
  // прятки: после похода цыплята иногда разбегаются по Лукоморью
  const HIDE=[new V3(-16.3,0,3.2),new V3(-2.8,0,-4.3),new V3(4.5,0,-13.5),new V3(11,0,8.7),new V3(-18.6,0,10.4),new V3(-4.4,0,3.9)];
  let hideOn=false;if(HN.hide&&hubMode&&chicks.length>=2){hideOn=true;const sp=HIDE.slice().sort(()=>Math.random()-0.5);chicks.forEach((c,k)=>{c.userData={st:'hid',peep:rand(0,2)};c.position.copy(sp[k]);});}HN.hide=false;
  const henIc={grain:new THREE.Group(),heart:new THREE.Group(),water:dropMesh(0x4aa8ff),worm:new THREE.Group(),seeds:new THREE.Group(),done:new THREE.Group()};henIc.water.scale.setScalar(0.4);for(const k in henIc)W.group.add(henIc[k]);
  {for(let k=0;k<5;k++)part(henIc.grain,new THREE.SphereGeometry(0.05,6,5),MB(0xffd23a),Math.cos(k*1.3)*0.08,Math.sin(k*2)*0.04,Math.sin(k*1.3)*0.08);part(henIc.grain,new THREE.TorusGeometry(0.14,0.03,6,14),MB(0xc8a060),0,-0.03,0).rotation.x=Math.PI/2;
    const hm=MB(0xff6a9a);part(henIc.heart,new THREE.SphereGeometry(0.09,8,6),hm,-0.07,0.05,0);part(henIc.heart,new THREE.SphereGeometry(0.09,8,6),hm,0.07,0.05,0);const hc=part(henIc.heart,new THREE.ConeGeometry(0.125,0.17,8),hm,0,-0.07,0);hc.rotation.z=Math.PI;}
  {const wm=MB(0xe88a9a);for(let k=0;k<5;k++)part(henIc.worm,new THREE.SphereGeometry(0.05,6,5),wm,(k-2)*0.07,Math.sin(k*1.4)*0.04,0);
    for(let k=0;k<5;k++){const s=part(henIc.seeds,new THREE.SphereGeometry(0.045,6,5),MB(0x2a2a30),Math.cos(k*1.26)*0.08,Math.sin(k*2.3)*0.03,Math.sin(k*1.26)*0.08);s.scale.set(0.6,0.5,1.2);}
    const ge=part(henIc.done,new THREE.SphereGeometry(0.11,10,8),MB(0xffd23a),0,0,0);ge.scale.y=1.3;}
  const WISH_T={grain:'зёрнышек',water:'водицы',worm:'червячка',pet:'ласки',seeds:'семечек'};
  function newWish(prev){const o=['grain','water','pet','worm'];if(GD.seeds>0)o.push('seeds');HN.wish=pk(o.filter(w=>w!==prev));}
  if(!HN.wish)newWish();
  let EGG=null;const MICE=[];   // золотое яичко в лукошке: {h,pi,t,next,n}; мышки бегут к лукошку
  const eggMeshes=[];function eggsDraw(){eggMeshes.forEach(m=>W.group.remove(m));eggMeshes.length=0;const gl=HN.gold-(EGG?1:0),n=HN.eggs+gl;for(let i=0;i<Math.min(n,6);i++){const gold=i<gl;const m=new THREE.Mesh(new THREE.SphereGeometry(0.085,10,8),gold?M(0xffd23a,{emissive:0xb07a10,emissiveIntensity:0.7}):M(0xf8f4ea));
      m.scale.y=1.3;m.position.set(NEST.x+Math.cos(i*2.1)*0.12,0.44,NEST.z+Math.sin(i*2.1)*0.12);W.group.add(m);eggMeshes.push(m);}}
  eggsDraw();
  function makeMouse(){const m=new THREE.Group();W.group.add(m);part(m,new THREE.SphereGeometry(0.1,8,6),M(0x8a8a90),0,0.08,0).scale.set(0.8,0.7,1.4);for(const s of[-1,1])part(m,new THREE.SphereGeometry(0.045,6,5),M(0xd8a0a8),s*0.06,0.15,0.08);
    const tl=part(m,new THREE.CylinderGeometry(0.008,0.008,0.3,4),M(0xd8a0a8),0,0.06,-0.26);tl.rotation.x=Math.PI/2;return m;}
  function makeHare(){const g=new THREE.Group();W.group.add(g);const fur=M(0xb8a890);const b=part(g,new THREE.SphereGeometry(0.22,10,8),fur,0,0.28,0);b.scale.set(0.85,0.9,1.2);part(g,new THREE.SphereGeometry(0.15,10,8),fur,0,0.52,0.2);
    for(const s of[-1,1]){const e=part(g,new THREE.SphereGeometry(0.05,6,5),fur,s*0.06,0.78,0.16);e.scale.set(0.7,3.2,0.6);part(g,new THREE.SphereGeometry(0.02,5,4),MAT.dark,s*0.06,0.55,0.33);}
    part(g,new THREE.SphereGeometry(0.07,6,5),M(0xf0ece4),0,0.3,-0.27);const ca=part(g,new THREE.ConeGeometry(0.05,0.22,6),M(0xff8a2a),0.1,0.42,0.32);ca.rotation.x=Math.PI/2+0.4;return {g,ca};}
  let HARE=null;const WORMS=[],PEAS=[],DROPS=[],FEATH=[];let HOLD=null;
  function spawnWorm(c){const g=new THREE.Group();W.group.add(g);const wm=M(0xe88a9a),segs=[];for(let k=0;k<5;k++)segs.push(part(g,new THREE.SphereGeometry(0.045,6,5),wm,(k-2)*0.06,0.05,0));
    g.position.set(c.x+rand(-0.5,0.5),0.02,c.z+1.05);WORMS.push({g,segs,t:0});floatText(g.position.clone().add(new V3(0,0.6,0)),'Червячок!','#ffb0c0');}
  function wormMaybe(c){if(WORMS.length<2&&Math.random()<(HN.wish==='worm'?1:0.3))later(0.5,()=>spawnWorm(c));}
  function spawnPeas(c){for(let k=0;k<5;k++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.08,8,6),M(0x8ad05a,{emissive:0x2a6a10,emissiveIntensity:0.4}));m.position.set(c.x,0.45,c.z);W.group.add(m);
    const to=new V3(c.x+(k-2)*0.5+rand(-0.2,0.2),0.08,c.z+rand(1.1,2.3)),fr=m.position.clone();anim(0.6,q=>{m.position.lerpVectors(fr,to,q);m.position.y=0.08+Math.sin(q*Math.PI)*0.5+(1-q)*0.37;m.rotation.x+=0.3;});PEAS.push({m,pos:m.position,t:0,by:null,taken:false});}}
  function takePea(P,h){if(P.taken)return;P.taken=true;W.group.remove(P.m);PEAS.splice(PEAS.indexOf(P),1);G.nutsHub=(G.nutsHub||0)+1;SFX.nut();floatText(P.pos.clone().add(new V3(0,0.6,0)),h?'Горошина! +1 орешек':'Цыплёнок склевал — +1 орешек','#ffd060');}
  function dropFeather(){const f=new THREE.Group();W.group.add(f);const m=part(f,new THREE.SphereGeometry(0.1,8,6),M(0xf4efe4),0,0,0);m.scale.set(0.4,0.12,1.6);part(f,new THREE.SphereGeometry(0.02,5,4),M(0x8a7a6a),0,0.012,0.05);
    const p=hen.g.position,fr=new V3(p.x,1.0,p.z),to=new V3(clamp(p.x+rand(-0.8,0.8),YARD.x0+0.3,YARD.x1-0.3),0.03,clamp(p.z+rand(-0.8,0.8),YARD.z0+0.3,YARD.z1-0.3));f.position.copy(fr);
    anim(1.6,q=>{f.position.lerpVectors(fr,to,q);f.position.x+=Math.sin(q*12)*0.15*(1-q);f.rotation.z=Math.sin(q*10)*0.6*(1-q);});FEATH.push({g:f,t:0});later(0.4,()=>floatText(fr.clone().add(new V3(0,0.4,0)),'Пёрышко обронила!','#f4efe4'));}
  function takeFeather(F2){W.group.remove(F2.g);FEATH.splice(FEATH.indexOf(F2),1);SFX.ok();if(!own('pero')){buyWard('pero');banner('Пёрышко Рябы!','#fff4d0',2.6,'бусы с пёрышком — в примерочной, «На шею»');}
    else{G.nutsHub=(G.nutsHub||0)+1;floatText(F2.g.position.clone().add(new V3(0,0.6,0)),'Пёрышко! +1 орешек','#ffd060');}}
  /* ---------- что в лапах: зерно (h.grain), лейка (h.can9) или h.hand — червячок, лукошко, урожай для Дедки ---------- */
  const handOf=h=>h.grain?'grain':h.can9?'can':h.hand||null;
  const HAND_N={grain:'зерно',can:'лейка',worm:'червячок',basket:'лукошко'};
  const full=(h,pi)=>{const k=handOf(h);if(!k)return false;tip(pi,'Лапы заняты: '+(HAND_N[k]||CROPS[k].name.toLowerCase())+'.',1.8);SFX.miss();return true;};
  function handMesh(k){const g=new THREE.Group();W.group.add(g);
    if(k==='grain'){part(g,new THREE.CylinderGeometry(0.14,0.1,0.08,10),M(0xc8a060),0,0,0);for(let i=0;i<5;i++)part(g,new THREE.SphereGeometry(0.03,5,4),M(0xffd23a),rand(-0.07,0.07),0.05,rand(-0.07,0.07));}
    else if(k==='worm'){for(let i=0;i<5;i++)part(g,new THREE.SphereGeometry(0.045,6,5),M(0xe88a9a),(i-2)*0.06,Math.sin(i*1.5)*0.04,0);}
    else if(k==='basket'){part(g,new THREE.CylinderGeometry(0.2,0.15,0.16,12),M(0xb08a50),0,0,0);part(g,new THREE.TorusGeometry(0.18,0.02,5,14,Math.PI),M(0x8a6a3a),0,0.08,0);const e=part(g,new THREE.SphereGeometry(0.1,10,8),M(0xffd23a,{emissive:0xb07a10,emissiveIntensity:0.7}),0,0.12,0);e.scale.y=1.3;}
    else if(CROPS[k])g.add(cropIcon(k));
    return g;}
  const near=(h,p,r)=>hd(h.pos,p)<r&&h.pos.y<1.6;
  /* ---------- Ряба: желания, кормёжка, ласка ---------- */
  let henSayT=0;const henSay=(t,c)=>{const d=Math.max(0,henSayT-G.time),f=()=>floatText(hen.g.position.clone().add(new V3(0,1.1,0)),t,c||'#fff4d0');henSayT=G.time+d+1.3;if(d>0)later(d,f);else f();};   // фразы — по очереди, не наслаиваются
  const GREET={proshka:['Ко-ко, лисонька! Только чур — без хитростей!','Ко-ко! Лисонька в шапке — ну и модница!'],potap:['Ко-ко! Мишенька, ступай тихонечко!','Ко-ко! Мишка в шапке — вот потеха!'],
    pelageya:['Ко-ко, совушка-умница!','Ко-ко! Совушка в шапке — учёная!'],yosha:['Ко-ко! Ёжик, не колись!','Ко-ко! Ёжик в шапке — колючки спрятал!']};
  function wishHit(w){if(!HN.wish||HN.wish==='done')return false;if(HN.wish!==w){const want=WISH_T[HN.wish];later(1.1,()=>henSay('Ко-ко… а мне бы '+want+'!','#ffe0b0'));return false;}
    HN.wishN++;SFX.ok();if(HN.wishN>=2){HN.wish='done';later(1.0,()=>{henSay('Ко-ко-ко! Довольна-предовольна!','#ffd76a');for(const q of[0,1])tip(q,'Ряба довольна — к походу снесёт яичко,<br>да не простое — золотое!',2.8);});}
    else{HN.wish=null;later(2.4,()=>{newWish(w);henSay('Ко-ко! А теперь бы '+WISH_T[HN.wish]+'…','#fff4d0');});}return true;}
  function feedHen(h,pi,kind){if(kind==='grain')h.grain=false;else if(kind==='worm')h.hand=null;else GD.seeds=Math.max(0,GD.seeds-1);SFX.plate();const spot=hen.g.position.clone().add(new V3(rand(-0.4,0.4),0,rand(-0.4,0.4)));
    if(kind==='grain')for(let k=0;k<10;k++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.03,5,4),M(0xffd23a));m.position.set(spot.x+rand(-0.35,0.35),0.03,spot.z+rand(-0.35,0.35));W.group.add(m);later(4,()=>W.group.remove(m));}
    HS.mode='eat';HS.t=0;HS.tgt.copy(spot);HN.food=1;henSay(kind==='worm'?'Ко-ко! Червячок — объеденье!':kind==='seeds'?'Ко-ко! Семечки — лакомство!':'Ко-ко-ко! Сыта, довольна!','#ffd060');tone(700,0.12,'square',0.08,500);later(0.2,()=>tone(760,0.1,'square',0.08,520));wishHit(kind);}
  function fillTrough(h,pi){if(CAN.water<=0){tip(pi,'Лейка пуста — в бочке воды набери.',2);SFX.miss();return;}CAN.water--;TW.lvl=1;TW.m.visible=true;SFX.water();for(let k=0;k<5;k++)later(k*0.06,()=>burst(TROUGH.clone().add(new V3(rand(-0.3,0.3),0.3,0)),0x7ac8ff,4,1.5,0.5));
    HS.mode='drink';HS.t=0;HS.tgt.set(TROUGH.x-0.6,0,TROUGH.z-0.1);henSay('Ко-ко! Водица студёная!','#9fd8ff');wishHit('water');}
  function petHold(h,pi){return {need:1.1,ok:()=>near(h,hen.g.position,2.1),start:()=>{HS.mode='pet';HS.t=0;HS.petBy=h;},
    tick:(dt,t)=>{HN.joy=Math.min(1,HN.joy+dt*0.25);if(Math.floor(t*4)!==Math.floor((t-dt)*4))burst(hen.g.position.clone().add(new V3(0,0.9,0)),0xff9ac0,2,1.2);},
    done:()=>{HS.mode='peck';HS.t=0;HS.flap=0.6;SFX.flower();HN.joy=Math.min(1,HN.joy+0.3);tone(880,0.1,'square',0.06,640);for(let k=0;k<4;k++)later(k*0.12,()=>burst(hen.g.position.clone().add(new V3(0,0.9,0)),0xff9ac0,3,1.5));
      const parade=HN.joy>=1&&chicks.length&&!hideOn;if(!wishHit('pet'))henSay(parade?'Ко-ко! Цыплятки — за тобой гурьбой!':'Ко-ко! Ласково-то как!','#ffb0d0');if(parade){HS.parade=h;HS.paradeT=9;}if(Math.random()<0.35)later(0.5,dropFeather);},
    cancel:t=>{HS.mode='peck';HS.t=0;if(t>=0.35)return;const now=G.time;HS.taps=HS.taps.filter(x=>now-x<2.5);HS.taps.push(now);if(HS.taps.length>=3){HS.taps.length=0;fluster(h);}else henSay('Ко-ко? Погладь подольше — подержи!','#ffd0e0');}};}
  function fluster(h){HN.joy=Math.max(0,HN.joy-0.15);HS.mode='flee';HS.t=0;HS.flap=1.6;const p=hen.g.position,a=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);
    HS.tgt.set(clamp(p.x+Math.sin(a)*2.5,YARD.x0+0.5,YARD.x1-0.5),0,clamp(p.z+Math.cos(a)*2.5,YARD.z0+0.5,YARD.z1-0.5));SFX.miss();henSay('Ко-ко-ко! Не тискай меня — гладь ласково!','#ffb0b0');
    for(let k=0;k<5;k++)later(k*0.08,()=>burst(hen.g.position.clone().add(new V3(0,0.6,0)),0xf4efe4,3,2.5));}
  function takeEggs(h){const p=HN.eggs*2;G.nutsHub=(G.nutsHub||0)+p;eggMeshes.forEach((m,k)=>{if(k<HN.gold-(EGG?1:0))return;const from=m.position.clone();anim(0.5,q=>{m.position.lerpVectors(from,h.pos.clone().add(new V3(0,h.d.height,0)),q);});});
    later(0.55,()=>{HN.eggs=0;eggsDraw();});SFX.ok();floatText(NEST.clone().add(new V3(0,1,0)),'Яички! +'+p+' орешков','#ffd060');}
  /* ---------- золотое яичко: в лукошке к Дедке; мышки бегут к лукошку, друг их гоняет (в одиночку и с напарником — гоняют спутники) ---------- */
  const human=o=>G.solo?ctrl(o):(o.active&&!(o.player===1&&typeof CMP!=='undefined'&&CMP.live&&CMP.live()));
  const autoShoo=()=>G.solo||(typeof CMP!=='undefined'&&CMP.live&&CMP.live());
  const MSPAWN=[new V3(-12.5,0,6.5),new V3(-6.3,0,7.2),new V3(-6.3,0,11.1),new V3(-12.9,0,8.4),new V3(-11,0,4.1),new V3(-6.2,0,2.6),new V3(-7.4,0,-0.6),new V3(-16.8,0,2.9)];
  function eggStart(h,pi){EGG={h,pi,t:0,next:1.2,n:0,jw:false};h.hand='basket';eggsDraw();SFX.ok();banner('Яичко золотое — в лукошко!','#ffd76a',2.6,'неси Дедке тихонечко · мышек гоняет друг');
    if(!G.solo)tip(1-pi,'Друг несёт яичко золотое Дедке —<br>гони мышек '+K(1-pi,'attack')+'!',3);}
  function eggEnd(){if(!EGG)return;EGG.h.hand=null;EGG=null;MICE.forEach(m=>{m.run=m.run||1;});eggsDraw();}
  function shooMouse(m,from){m.run=1;m.turned=true;m.g.rotation.y=Math.atan2(m.g.position.x-from.pos.x,m.g.position.z-from.pos.z);G.nutsHub=(G.nutsHub||0)+1;SFX.whoosh();floatText(m.g.position.clone().add(new V3(0,0.8,0)),'Кыш! +1 орешек','#ffd060');}
  function eggDeliver(){const h=EGG.h;eggEnd();HN.gold=Math.max(0,HN.gold-1);G.ui='egg';ded.rotation.y=Math.atan2(h.pos.x-ded.position.x,h.pos.z-ded.position.z);
    const at=ded.position.clone().add(new V3(Math.sin(ded.rotation.y)*0.75,0,Math.cos(ded.rotation.y)*0.75));
    const egg=new THREE.Mesh(new THREE.SphereGeometry(0.16,12,10),M(0xffd23a,{emissive:0xb07a10,emissiveIntensity:0.8}));egg.scale.y=1.3;egg.position.copy(at).add(new V3(0,0.21,0));W.group.add(egg);
    bark({g:ded},'dedka','Яичко золотое! А ну-ка — крепкое ли?',1.8);
    for(let k=0;k<3;k++)later(1.0+k*0.55,()=>{anim(0.25,q=>{ded.scale.y=1-Math.sin(q*Math.PI)*0.12;});later(0.12,()=>{SFX.hammer();burst(egg.position.clone(),0xffd76a,8,2);shakeAll(0.02,0.12);anim(0.2,q=>{egg.position.y=0.21+Math.sin(q*Math.PI)*0.15;});});});
    later(2.9,()=>{const p=12;G.nutsHub=(G.nutsHub||0)+p;HN.golds++;SFX.horn();SFX.ok();banner('Бил-бил — не разбил!','#ffd76a',2.6,'яичко золотое · +'+p+' орешков');bark({g:ded},'dedka','Бил-бил — не разбил! Крепкое — знать, к добру.',2.6);
      later(1.4,()=>{W.group.remove(egg);G.ui=null;});});}
  function eggBreak(){const h=EGG.h,p=h.pos.clone().add(new V3(0,h.d.height*0.6,0));eggEnd();HN.gold=Math.max(0,HN.gold-1);eggsDraw();
    const egg=new THREE.Mesh(new THREE.SphereGeometry(0.15,12,10),M(0xffd23a,{emissive:0xb07a10,emissiveIntensity:0.8}));egg.scale.y=1.3;egg.position.copy(p);W.group.add(egg);anim(0.45,q=>{egg.position.y=p.y+(0.1-p.y)*q*q;});
    later(0.45,()=>{W.group.remove(egg);for(const s of[-1,1]){const half=new THREE.Mesh(new THREE.SphereGeometry(0.15,10,8,0,Math.PI*2,0,Math.PI/2),M(0xffd23a,{side:THREE.DoubleSide}));half.position.set(p.x+s*0.18,s>0?0.16:0.02,p.z);if(s>0)half.rotation.x=Math.PI;W.group.add(half);later(8,()=>W.group.remove(half));}
      SFX.miss();burst(new V3(p.x,0.2,p.z),0xffd76a,14,2.5);banner('Мышка бежала, хвостиком махнула —','#e0e0ff',2.8,'яичко упало и разбилось!');});
    later(2.6,()=>bark({g:ded},'dedka','Ох, яичко… Дед плачет, баба плачет…',2.4));
    later(5.0,()=>{HN.eggs++;eggsDraw();henSay('Не плачь, дед! Снесу я тебе яичко — не золотое, а простое!','#fff4d0');});}
  /* ---------- урожай ---------- */
  function cropDone(i,h,pi,kind){burst(BEDC[i].clone().add(new V3(0,0.6,0)),0xffd76a,16,3);beds[i]={crop:null,stage:0,wet:false};plantDraw(i);wormMaybe(BEDC[i]);
    if(GD.order===kind&&!handOf(h)){h.hand=kind;SFX.ok();floatText(BEDC[i].clone().add(new V3(0,1.3,0)),CROPS[kind].name+' — Дедке по заказу! Отнеси ему.','#ffe080');return true;}
    if(Math.random()<0.5)later(0.6,()=>bark({g:ded},'dedka',Math.random()<0.5?'Хороша! За такую Векша орешками платит сполна.':DED_H[h.kind],2.2));return false;}
  function harvest(i,h,pi){const kind=beds[i].crop,C=CROPS[kind];SFX.ok();
    if(kind==='podsolnuh'){GD.seeds+=3;later(0.7,()=>floatText(BEDC[i].clone().add(new V3(0,1.7,0)),'Семечки — Рябе лакомство!','#f0e0a0'));}
    if(cropDone(i,h,pi,kind))return;
    if(kind==='goroh'){spawnPeas(BEDC[i]);floatText(BEDC[i].clone().add(new V3(0,1.2,0)),'Стручки лопнули — горошины покатились!','#b8f0a0');return;}
    G.nutsHub=(G.nutsHub||0)+C.nuts;floatText(BEDC[i].clone().add(new V3(0,1.2,0)),C.name+'! +'+C.nuts+' орешка','#ffd060');}
  function pullHold(i,h,pi){return {need:0.6,ok:()=>near(h,BEDC[i],1.7)&&beds[i].crop==='morkov',tick:(dt,t)=>{bedG[i].pl.position.y=t*0.3;bedG[i].pl.rotation.z=Math.sin(t*40)*0.06;},
    cancel:()=>{bedG[i].pl.position.y=0;bedG[i].pl.rotation.z=0;},done:()=>{bedG[i].pl.position.y=0;bedG[i].pl.rotation.z=0;GD.carrots++;
      if(!GD.hare&&!HARE&&GD.carrots%2===0){hareSteal(i);return;}SFX.ok();if(cropDone(i,h,pi,'morkov'))return;G.nutsHub=(G.nutsHub||0)+2;floatText(BEDC[i].clone().add(new V3(0,1.2,0)),'Морковка! +2 орешка','#ffd060');}};}
  // заяц: хватает морковку и удирает к лесу; догонишь — отдаст; угостишь его морковкой — подружится и больше не тронет
  function hareSteal(i){beds[i]={crop:null,stage:0,wet:false};plantDraw(i);HARE=Object.assign(makeHare(),{st:'run',t:0,from:i});HARE.g.position.set(BEDC[i].x-0.6,0,BEDC[i].z-1.0);SFX.whoosh();
    floatText(BEDC[i].clone().add(new V3(0,1.4,0)),'Ой! Заяц морковку утащил! Догоняй!','#ffd0a0');for(const q of[0,1])tip(q,'Заяц морковку утащил — догони косого!',2.4);}
  function feedHare(h,pi){h.hand=null;GD.hare=true;SFX.ok();floatText(HARE.g.position.clone().add(new V3(0,1,0)),'Спасибо! Больше не трону — честное заячье!','#fff4d0');HARE.st='bye';HARE.t=0;HARE.ca.visible=true;}
  function giveDed(h,pi){const kind=h.hand,C=CROPS[kind];h.hand=null;SFX.ok();ded.rotation.y=Math.atan2(h.pos.x-ded.position.x,h.pos.z-ded.position.z);
    if(GD.order!==kind){G.nutsHub=(G.nutsHub||0)+C.nuts;floatText(ded.position.clone().add(new V3(0,2.4,0)),'+'+C.nuts+' орешка','#ffd060');bark({g:ded},'dedka','Спасибо, внучек! Векше снесу — орешками отплатит.',2.2);return;}
    orderDone(C.nuts*2+3);}
  function orderDone(p){GD.order=null;GD.orders++;G.nutsHub=(G.nutsHub||0)+p;SFX.horn();banner('Заказ Дедки!','#ffd76a',2.4,'вдвое орешков · +'+p);bark({g:ded},'dedka','Уважил! Вот тебе за то орешки — вдвойне.',2.4);
    if(GD.orders>=3&&!own('solomka'))later(2.8,()=>{buyWard('solomka');SFX.ok();banner('Соломенная шляпа Дедки!','#ffd76a',2.8,'в примерочной — «Шапки»');bark({g:ded},'dedka','Держи шляпу соломенную — от солнышка, от дождичка!',2.8);});}
  function dedTalk(h,pi){const L=GD.order&&Math.random()<0.6?ORDER_LINE[GD.order]:GD.pea<1&&Math.random()<0.25?'Чудо-горошина, сказывают, у Лешего водится… Посадишь — до неба вырастет!':
      ['Посадил дед репку… а тянуть-потянуть — всем миром!','Посадил — полей скорей. Сходишь в поход — подрастёт, ей-ей.','Урожай — Векше за орешки, а мне — репку, да покрепче!'][Math.floor(rand(0,3))];bark({g:ded},'dedka',L,2.8);}
  /* ---------- что рядом: одно действие на кнопку удара (hold — держать кнопку) ---------- */
  function hubAction(h,pi){if(!hubMode||F.stage!=='free'||G.ui||G.cine||F.danceT>0)return null;const hk=handOf(h);
    if(near(h,PODIUM,1.9))return {note:'примерочная',fn:()=>dressOpen(pi,'ward')};
    if(chest&&GD.pea<3&&hd(h.pos,CHEST)<1.5&&h.pos.y>PEA_TOP-0.6)return {note:'открыть сундучок',fn:()=>openChest(h,pi)};
    if(EGG){const m=MICE.find(m=>!m.run&&hd(h.pos,m.g.position)<1.9);if(h===EGG.h)return m?{note:'лапы заняты',fn:()=>tip(pi,'Лапы заняты лукошком — пусть друг мышку гонит!',2)}:null;if(m)return {note:'кыш!',fn:()=>shooMouse(m,h)};}
    if(!hk){const w=WORMS.find(w=>near(h,w.g.position,1.1));if(w)return {note:'взять червячка',fn:()=>{WORMS.splice(WORMS.indexOf(w),1);W.group.remove(w.g);h.hand='worm';SFX.plate();}};
      const d=DROPS.find(d=>near(h,d.g.position,1.1));if(d)return {note:'поднять',fn:()=>{DROPS.splice(DROPS.indexOf(d),1);W.group.remove(d.g);h.hand=d.kind;SFX.plate();}};}
    if(HARE&&HARE.st==='sad'&&hk==='morkov'&&near(h,HARE.g.position,1.8))return {note:'угостить зайку',fn:()=>feedHare(h,pi)};
    if(near(h,NEST,1.5)){if(HN.eggs>0&&!hk)return {note:'собрать яички',fn:()=>takeEggs(h)};if(HN.gold>0&&!EGG&&!hk)return {note:'золотое — в лукошко',fn:()=>eggStart(h,pi)};}
    if(near(h,SACK,1.4)&&!h.grain)return {note:'взять зерно',fn:()=>{if(h.can9){tip(pi,'В лапах лейка у тебя — у бочки с водой её поставь.',2);return;}if(full(h,pi))return;h.grain=true;SFX.plate();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Зерно!','#ffd060');}};
    if(near(h,TROUGH,1.3)&&CAN.h===h)return {note:'налить водицы',fn:()=>fillTrough(h,pi)};
    if(near(h,hen.g.position,1.8)){if(h.grain)return {note:'покормить',fn:()=>feedHen(h,pi,'grain')};if(hk==='worm')return {note:'дать червячка',fn:()=>feedHen(h,pi,'worm')};
      if(!hk&&GD.seeds>0&&HN.wish==='seeds')return {note:'угостить семечками',fn:()=>feedHen(h,pi,'seeds')};if(!hk)return {note:'погладить · держи',hold:petHold(h,pi)};}
    if(near(h,BARREL,1.5))return CAN.h===h?{note:'поставить лейку',fn:()=>{CAN.h=null;h.can9=false;canHome();SFX.plate();}}:!CAN.h?{note:'взять лейку',fn:()=>{if(h.grain){tip(pi,'Сперва зерно Рябе отнеси.',2);return;}if(full(h,pi))return;CAN.h=h;h.can9=true;CAN.water=4;SFX.water();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Лейка полна!','#9fd8ff');}}:null;
    if(hk&&CROPS[hk]&&near(h,ded.position,1.8))return {note:'отдать Дедке',fn:()=>giveDed(h,pi)};   // урожай в лапах — Дедке, даже если он полет у грядки
    for(let i=0;i<4;i++){if(!near(h,BEDC[i],1.45))continue;const b=beds[i];
      if(b.rook)return {note:'кыш, грачи!',fn:()=>shooRook(i)};
      if(!b.crop)return {note:'посадить',fn:()=>seedPick(i,pi)};
      if(b.stage>=ripeOf(b)){if(b.crop==='repka')return {note:'тянем-потянем!',fn:()=>repkaGame(i,pi)};if(hk&&GD.order===b.crop)return {note:'лапы заняты',fn:()=>full(h,pi)};
        return b.crop==='morkov'?{note:'выдернуть · держи',hold:pullHold(i,h,pi)}:{note:'собрать урожай',fn:()=>harvest(i,h,pi)};}
      if(!b.wet)return {note:CAN.h===h?(GD.dry&&b.water?'ещё полить':'полить'):'нужна лейка',fn:()=>water(i,h,pi)};
      return {note:'полито',fn:()=>{floatText(BEDC[i].clone().add(new V3(0,1,0)),'Полито уж — подрастёт, пока вы в пути.','#9fd8ff');}};}
    if(near(h,ded.position,1.8))return hk&&CROPS[hk]?{note:'отдать Дедке',fn:()=>giveDed(h,pi)}:{note:'Дедка',fn:()=>dedTalk(h,pi)};
    if(near(h,SCARE,1.6))return {note:'нарядить пугало',fn:()=>scarePick(pi)};
    if(near(h,PEA,1.5))return GD.pea===1?{note:'посадить чудо-горошину',fn:()=>peaPlant(pi)}:{note:'чудо-грядка',fn:()=>peaTalk(pi)};
    return null;}
  const SEED_TALE={morkov:'Морковку выдернуть — держи кнопку! Да гляди: заяц рядом бродит.',goroh:'Стручки лопнут — горошины покатятся: собирай, цыплята подсобят!',podsolnuh:'Подсолнух за солнышком глядит, а семечки — Рябе лакомство.',repka:'Репку вытянуть можно только вдвоём! Растёт на поход дольше — зато большая-пребольшая.'};
  function seedPick(i,pi){G.ui='seed';let sel=0;const ks=Object.keys(CROPS);const el=$('mapui');el.style.display='flex';
    const draw=()=>{el.innerHTML='<div class="tet seed"><h2>Что посадим?</h2><div class="seeds">'+ks.map((k,j)=>'<div class="sd'+(j===sel?' sel':'')+'">'+CROPS[k].icon+'<b>'+CROPS[k].name+'</b><small>'+CROPS[k].nuts+' '+ICO_NUT+'</small></div>').join('')+'</div>'+
      '<div class="tale">'+SEED_TALE[ks[sel]]+'</div><div class="hint">'+K(pi,'left')+K(pi,'right')+' · '+K(pi,'jump')+' посадить · '+K(pi,'guard')+' отмена</div></div>';};
    draw();G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dx){sel=(sel+n.dx+ks.length)%ks.length;SFX.swap();draw();}if(tap(q,'guard')||pressed.has('Escape')){closePanel();return;}
      if(tap(q,'jump')){beds[i]={crop:ks[sel],stage:0,wet:false};plantDraw(i);closePanel();SFX.grow();wormMaybe(BEDC[i]);burst(BEDC[i].clone().add(new V3(0,0.4,0)),0x8a6a44,10,2);floatText(BEDC[i].clone().add(new V3(0,1,0)),CROPS[ks[sel]].name+' посажена! Полить бы теперь.','#b8f0a0');return;}}};}
  function water(i,h,pi){if(CAN.h!==h){tip(pi,'Лейка у бочки с водой стоит.',2.2);SFX.miss();return;}if(CAN.water<=0){tip(pi,'Лейка пуста — в бочке воды набери.',2);SFX.miss();return;}CAN.water--;const b=beds[i];SFX.water();
    for(let k=0;k<6;k++)later(k*0.06,()=>burst(BEDC[i].clone().add(new V3(rand(-0.6,0.6),0.5,rand(-0.4,0.4))),0x7ac8ff,4,2,0.6));
    if(GD.dry&&!b.water){b.water=1;floatText(BEDC[i].clone().add(new V3(0,1,0)),'Засуха — земля сухая! Ещё разок полей.','#ffd0a0');return;}
    b.wet=true;b.water=0;bedG[i].soil.material.color.setHex(soilCol(b));wormMaybe(BEDC[i]);
    if(b.stage===0){b.stage=1;later(0.4,()=>{plantDraw(i);SFX.grow();floatText(BEDC[i].clone().add(new V3(0,1,0)),'Проклюнулся!','#b8f0a0');});}else floatText(BEDC[i].clone().add(new V3(0,1,0)),'Полито! Подрастёт, пока вы в пути.','#9fd8ff');}
  function repkaGame(i,pi){const a=[active(0),active(1)];if(a.some(h=>(!G.solo||ctrl(h))&&hd(h.pos,BEDC[i])>3.2)){tip(pi,'Одному репку не вытянуть — друга кличь!',2.6);tip(1-pi,'Друг тянет репку — беги подсоблять!',2.6);SFX.miss();return;}
    G.ui='repka';const c=BEDC[i],order=[HERO.proshka,HERO.pelageya,HERO.potap,HERO.yosha];const d0=ded.position.clone();ded.position.set(c.x+0.95,0,c.z);ded.rotation.y=-Math.PI/2;
    order.forEach((h,k)=>{placeOnGround(h,c.x+1.7+k*0.72,c.z,0);h.face=-Math.PI/2;h.following=false;});const R={t:-0.6,pulls:0,k:0,p:[null,null],miss:0,rise:0};
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.05,6,28),MB(0xffd76a,{transparent:true,opacity:0.9}));ring.rotation.x=Math.PI/2;ring.position.set(c.x,0.5,c.z);W.group.add(ring);const B=1.3;
    banner('Тянем-потянем!','#ffd76a',2,'жмите оба '+K(0,'attack')+' / '+K(1,'attack')+' разом, как сожмётся кольцо');
    G.uiTick=()=>{R.t+=1/60;const beat=(R.k+1)*B,u=clamp((beat-R.t)/B,0,1);ring.scale.setScalar(lerp(0.4,1.8,u));ring.material.color.setHex(u<0.18?0xffffff:0xffd76a);
      for(const q of[0,1])if(tap(q,'attack')&&R.p[q]===null&&Math.abs(R.t-beat)<0.45){R.p[q]=R.t;active(q).atkT=0.28;if(G.solo){R.p[1-q]=R.t;active(1-q).atkT=0.28;}}
      if(R.t>beat+0.45){const ok=R.p[0]!==null&&R.p[1]!==null;R.k++;R.p=[null,null];
        if(ok||R.mouse){R.pulls++;R.rise=R.pulls;SFX.hammer();shakeAll(0.03,0.2);floatText(c.clone().add(new V3(0,1.6,0)),['Тянут!','Потянут!','Вытянули!'][Math.min(2,R.pulls-1)],'#ffd76a');order.forEach(h=>{h.pos.x+=0.22;});ded.position.x+=0.22;if(R.mouse)R.mouse.position.x+=0.22;
          anim(0.4,q=>{bedG[i].pl.position.y=(R.pulls/3)*0.35*q+((R.pulls-1)/3)*0.35*(1-q);});}
        else{R.miss++;SFX.miss();floatText(c.clone().add(new V3(0,1.6,0)),'Тянут-потянут — вытянуть не могут! Вместе!','#ffd0d0');
          if(R.miss>=3&&!R.mouse){R.mouse=makeMouse();R.mouse.position.set(c.x+1.7+4*0.72,0,c.z);R.mouse.rotation.y=-Math.PI/2;SFX.ok();banner('Кликнули мышку!','#e0e0ff',2.2,'мышка за Йошу, Йоша за Потапа… — тянем-потянем!');}}}
      if(R.pulls>=3){G.uiTick=null;W.group.remove(ring);const pl=bedG[i].pl,from=pl.position.clone();anim(0.9,q=>{pl.position.set(from.x+q*1.8,from.y+Math.sin(q*Math.PI)*2.2,from.z);pl.rotation.z=-q*2;});
        later(0.2,()=>{order.forEach((h,k)=>{h.vel.set(4+k,4,0);h.grounded=false;h.knockT=0.4;});});SFX.ok();SFX.horn();burst(c.clone().add(new V3(0,1,0)),0xffd76a,30,5);
        later(1.2,()=>{const ord=GD.order==='repka';if(R.mouse)W.group.remove(R.mouse);if(ord)orderDone(CROPS.repka.nuts*2+3);else{G.nutsHub=(G.nutsHub||0)+CROPS.repka.nuts;banner('Вытянули репку!','#ffd76a',2.6,'всем миром · +'+CROPS.repka.nuts+' орешков в лукошко');}beds[i]={crop:null,stage:0,wet:false};pl.position.set(0,0,0);pl.rotation.set(0,0,0);plantDraw(i);ded.position.copy(d0);G.ui=null;
          if(!ord)bark({g:ded},'dedka','Тянут-потянут — вытянули репку!<br>Вот что значит — вместе, крепко!',3);});}};}
  /* ---------- погода по возвращении: дождик с радугой ---------- */
  let rain=null;if(hubMode&&NEWS.rain){rain={t:6,g:new THREE.Group(),drops:[]};W.group.add(rain.g);const dm=MB(0x9fd0ff,{transparent:true,opacity:0.6});
    for(let k=0;k<70;k++){const d=new THREE.Mesh(new THREE.BoxGeometry(0.02,0.4,0.02),dm);d.position.set(rand(-18.5,-6),rand(0,9),rand(-1,6));rain.g.add(d);rain.drops.push(d);}}
  let rainbow=null;function rainbowOn(){rainbow={t:9,g:new THREE.Group()};rainbow.g.position.set(-12.5,-0.5,-2.5);W.group.add(rainbow.g);[0xff5a4a,0xffb43a,0xfff05a,0x6ad06a,0x5aa8ff,0x9a6ad8].forEach((c,k)=>{
    const a=new THREE.Mesh(new THREE.TorusGeometry(6.4-k*0.22,0.11,6,40,Math.PI),MB(c,{transparent:true,opacity:0,depthWrite:false}));rainbow.g.add(a);});}
  /* ---------- жизнь огорода и двора ---------- */
  {const sz=W.slowZone;W.slowZone=h=>h.hand==='basket'||(sz?sz(h):false);}   // с лукошком — тихим шагом
  W.updates.push(dt=>{
    // лейка и что в лапах
    can.visible=!DZ.on;if(CAN.h){const h=CAN.h,f=h.face;can.position.set(h.pos.x+Math.sin(f)*0.3+Math.cos(f)*0.28,h.pos.y+h.d.height*0.55,h.pos.z+Math.cos(f)*0.3-Math.sin(f)*0.28);can.rotation.set(0,f-Math.PI/2,h.atkT>0?-0.9:0);if(!h.active&&hd(h.pos,BARREL)>30){CAN.h=null;h.can9=false;canHome();}}
    for(const h of HEROES){const k=h.grain?'grain':h.hand||null;if(k!==h.handK){if(h.handM)W.group.remove(h.handM);h.handM=k?handMesh(k):null;h.handK=k;}
      if(h.handM){h.handM.visible=!DZ.on;h.handM.position.set(h.pos.x+Math.sin(h.face)*0.35,h.pos.y+h.d.height*0.6,h.pos.z+Math.cos(h.face)*0.35);h.handM.rotation.y=h.face;}}
    // грядки: капля — хочет пить, звёздочка — спело; подсолнухи за солнышком
    beds.forEach((b,i)=>{const B=bedG[i];B.drop.visible=!!b.crop&&!b.wet&&b.stage<ripeOf(b)&&!b.rook;B.drop.position.set(0,1.05+Math.sin(G.time*3+i)*0.08,0);B.star.visible=!!b.crop&&b.stage>=ripeOf(b);B.star.position.set(0,b.crop==='podsolnuh'?1.9:b.crop==='repka'?1.6:1.3,0);B.star.rotation.y+=dt*3;
      if(B.sun)B.sun.rotation.y=Math.sin(G.time*0.12+i)*0.5;});
    // грачи: клюют; прогнали — улетают
    for(let k=rooks.length-1;k>=0;k--){const r=rooks[k];r.t+=dt;if(r.fly){r.fly+=dt;r.g.position.y+=dt*(2+r.fly*2);r.g.position.x+=dt*4;r.w.forEach((w,j)=>{w.rotation.z=(j?-1:1)*Math.sin(G.time*30)*0.9;});if(r.fly>2.5){W.group.remove(r.g);rooks.splice(k,1);}continue;}
      r.hd.position.y=0.33-Math.max(0,Math.sin(r.t*5))*0.08;if(Math.sin(r.t*0.7)>0.97)r.g.rotation.y+=dt*4;}
    // дождик, радуга, чудо-горох качается, жерновцы мелют
    if(rain){rain.t-=dt;for(const d of rain.drops){d.position.y-=dt*12;if(d.position.y<0)d.position.y+=9;}if(rain.t<=0){W.group.remove(rain.g);rain=null;rainbowOn();}}
    if(rainbow){rainbow.t-=dt;const o=clamp(Math.min(9-rainbow.t,rainbow.t)/1.5,0,1)*0.55;rainbow.g.children.forEach(a=>{a.material.opacity=o;});if(rainbow.t<=0){W.group.remove(rainbow.g);rainbow=null;}}
    peaG.rotation.y=Math.sin(G.time*0.5)*0.02;if(mill.visible)mill.top.rotation.y+=dt*1.2;
    if(TW.lvl>0&&HS.mode!=='drink'&&TW.drank){TW.lvl=0;TW.m.visible=false;TW.drank=false;}
    // Дедка: ходит меж грядок, полет; к гостям оборачивается
    if(!G.ui){const dp=ded.position,hn=[active(0),active(1)].find(h=>hd(h.pos,dp)<2.6&&h.pos.y<1.6);
      if(hn){ded.rotation.y=angDamp(ded.rotation.y,Math.atan2(hn.pos.x-dp.x,hn.pos.z-dp.z),5,dt);DD.bend=Math.max(0,DD.bend-dt*3);}
      else{DD.t-=dt;if(DD.mode==='walk'){const d=hd(dp,DD.tgt.p);if(d<0.1){DD.mode=DD.tgt.weed?'weed':'stand';DD.t=rand(3,6);}else{dp.x+=(DD.tgt.p.x-dp.x)/d*dt*0.8;dp.z+=(DD.tgt.p.z-dp.z)/d*dt*0.8;ded.rotation.y=angDamp(ded.rotation.y,Math.atan2(DD.tgt.p.x-dp.x,DD.tgt.p.z-dp.z),5,dt);}}
        else if(DD.t<=0){DD.mode='walk';DD.tgt=pk(DPTS.filter(q=>hd(q.p,dp)>0.5));}
        if(DD.mode==='weed'){ded.rotation.y=angDamp(ded.rotation.y,0,4,dt);if(Math.random()<dt*0.7)burst(dp.clone().add(new V3(0,0.25,0.65)),0x6ac04a,3,1.2);}
        DD.bend=DD.mode==='weed'?Math.min(1,DD.bend+dt*2):Math.max(0,DD.bend-dt*3);}
      ded.scale.y=1-DD.bend*0.1;dedCyl.x=dp.x;dedCyl.z=dp.z;}
    for(const c in ordIc){const g=ordIc[c];g.visible=hubMode&&c===GD.order&&!G.ui&&!G.cine;if(g.visible){g.position.set(ded.position.x,2.55+Math.sin(G.time*3)*0.06,ded.position.z);g.rotation.y+=dt*1.5;}}
    // Ряба гуляет по двору, клюёт; поела — довольна; погладили — хлопает крыльями; затискали — убегает
    HS.t+=dt;const hp=hen.g.position;HS.flap=Math.max(0,HS.flap-dt);
    const mv=sp=>{const d=hd(hp,HS.tgt);if(d>0.15){hp.x+=(HS.tgt.x-hp.x)/d*dt*sp;hp.z+=(HS.tgt.z-hp.z)/d*dt*sp;hen.g.rotation.y=angDamp(hen.g.rotation.y,Math.atan2(HS.tgt.x-hp.x,HS.tgt.z-hp.z),8,dt);}return d;};
    if(HS.mode==='walk'){if(mv(hideOn?1.8:0.9)<0.15){HS.mode='peck';HS.t=0;}}
    else if(HS.mode==='eat'||HS.mode==='drink'){mv(2.2);if(HS.t>4){if(HS.mode==='drink')TW.drank=true;HS.mode='peck';HS.t=0;}}
    else if(HS.mode==='flee'){mv(3.6);if(HS.t>2){HS.mode='peck';HS.t=0;}}
    else if(HS.mode==='pet'){const ph=HS.petBy;if(ph)hen.g.rotation.y=angDamp(hen.g.rotation.y,Math.atan2(ph.pos.x-hp.x,ph.pos.z-hp.z),8,dt);if(!HOLD){HS.mode='peck';HS.t=0;}}
    else if(HS.t>(hideOn?0.6:1.6)){HS.mode='walk';HS.tgt.set(rand(YARD.x0+0.5,YARD.x1-0.5),0,rand(YARD.z0+0.5,YARD.z1-0.5));}
    const peck=HS.mode==='peck'||((HS.mode==='eat'||HS.mode==='drink')&&hd(hp,HS.tgt)<=0.2);hen.head.rotation.x=peck?(Math.sin(G.time*14)>0?0.9:0.2):0;hen.head.position.y=peck?0.62:0.72;
    hen.g.position.y=HS.flap>0?Math.abs(Math.sin(HS.flap*10))*0.3:0;hen.wings.forEach((w,k)=>{w.rotation.z=(k?-1:1)*(HS.flap>0?Math.sin(G.time*30)*0.9:0.05);});
    hen.body.rotation.z=HS.mode==='pet'?Math.sin(G.time*8)*0.08:HN.food<0.3&&HN.joy<0.3?0.25:0;
    {const w=!hubMode||hideOn||G.ui||G.cine?null:HN.wish;for(const k in henIc){const m=henIc[k];m.visible=k===(w==='pet'?'heart':w);if(m.visible){m.position.set(hp.x,1.35+Math.sin(G.time*3)*0.06,hp.z);m.rotation.y+=dt*2;}}}
    // Ряба здоровается с каждым героем (и замечает шапку из примерочной)
    if(hubMode&&F.stage==='free'&&!G.ui)for(const pi of[0,1]){const h=active(pi);if(HS.met[h.kind]||!near(h,hp,2.8))continue;HS.met[h.kind]=true;const hat=WARD.wear[h.kind]&&WARD.wear[h.kind].hat;henSay(GREET[h.kind][hat&&own(hat)?1:0],'#fff4d0');}
    // цыплята: дома — гуськом за Рябой (после ласки — за героем); в прятках — сидят, пищат; нашли — за нашедшим, во двор — домой; горошины клюют
    HS.paradeT=Math.max(0,HS.paradeT-dt);let lead=HS.paradeT>0&&HS.parade?HS.parade.pos:hp;const leadOf=new Map();
    chicks.forEach((c,k)=>{const u=c.userData;let tx=lead.x,tz=lead.z,sp=HS.paradeT>0?5:2.2,stop=0.45;
      if(u.st==='hid'){c.position.y=Math.abs(Math.sin(G.time*3+k))*0.04;u.peep-=dt;if(u.peep<=0&&HEROES.some(h=>hd(h.pos,c.position)<6)){u.peep=2.6;floatText(c.position.clone().add(new V3(0,0.6,0)),'пи-пи!','#ffe060');tone(1900,0.05,'sine',0.05,2100);}
        const f=hubMode&&F.stage==='free'?[active(0),active(1)].find(h=>near(h,c.position,1.4)):null;if(f){u.st='follow';u.h=f;SFX.ok();floatText(c.position.clone().add(new V3(0,0.7,0)),'Пи-пи! Нашёлся! Веди к маме!','#ffe060');}return;}
      if(u.st==='follow'){const L=leadOf.get(u.h)||u.h.pos;tx=L.x;tz=L.z;sp=5;leadOf.set(u.h,c.position);
        if(c.position.x>YARD.x0&&c.position.x<YARD.x1&&c.position.z>YARD.z0&&c.position.z<YARD.z1){u.st='home';SFX.ok();floatText(c.position.clone().add(new V3(0,0.7,0)),'Цыплёнок дома!','#ffe060');
          if(hideOn&&!chicks.some(x=>x.userData.st==='hid'||x.userData.st==='follow')){hideOn=false;HN.joy=1;G.nutsHub=(G.nutsHub||0)+3;SFX.horn();banner('Все цыплятки дома!','#ffe060',2.6,'Ряба рада-радёшенька · +3 орешка');henSay('Ко-ко! Все мои цыплятки дома!','#ffe060');}}}
      else if(u.st==='pea'){const P=u.pea;if(P.taken)u.st='home';else{tx=P.pos.x;tz=P.pos.z;sp=3.2;stop=0.2;if(Math.hypot(tx-c.position.x,tz-c.position.z)<0.3){u.peck=(u.peck||0)+dt;if(u.peck>0.7){takePea(P,null);u.st='home';u.peck=0;}}}}
      const d=Math.hypot(tx-c.position.x,tz-c.position.z);if(d>stop){const s2=Math.min(d*2.4,sp);c.position.x+=(tx-c.position.x)/d*s2*dt;c.position.z+=(tz-c.position.z)/d*s2*dt;c.rotation.y=Math.atan2(tx-c.position.x,tz-c.position.z);}
      c.position.y=Math.abs(Math.sin(G.time*10+k))*0.05;if(u.st==='home')lead=c.position;});
    // горошины: лежат 40 с; подбирают герои, а свободные цыплята бегут клевать
    for(let k=PEAS.length-1;k>=0;k--){const P=PEAS[k];P.t+=dt;if(P.t>40){W.group.remove(P.m);PEAS.splice(k,1);continue;}if(P.t<0.7)continue;const h=HEROES.find(h=>hd(h.pos,P.pos)<0.75&&h.pos.y<1.6);if(h){takePea(P,h);continue;}
      if(!P.by&&!hideOn){const c=chicks.find(c=>c.userData.st==='home');if(c){c.userData.st='pea';c.userData.pea=P;P.by=c;}}}
    // червячки извиваются (25 с), пёрышки ждут, кто подберёт
    for(let k=WORMS.length-1;k>=0;k--){const w=WORMS[k];w.t+=dt;w.segs.forEach((s,j)=>{s.position.z=Math.sin(G.time*8+j)*0.04;});if(w.t>25){W.group.remove(w.g);WORMS.splice(k,1);}}
    for(let k=FEATH.length-1;k>=0;k--){const f=FEATH[k];f.t+=dt;if(f.t<1.7)continue;if(f.t>40){W.group.remove(f.g);FEATH.splice(k,1);continue;}if(hubMode&&HEROES.some(h=>h.active&&near(h,f.g.position,0.8)))takeFeather(f);}
    // заяц: удирает к лесу зигзагом; догнали — отдаёт морковку и сидит, повесив уши; угостили — уходит другом
    if(HARE){const R=HARE,p=R.g.position;R.t+=dt;
      if(R.st==='run'){const tx=-19.3,tz=-1+Math.sin(R.t*2.5)*2.5,d=Math.hypot(tx-p.x,tz-p.z);if(d>0.2){p.x+=(tx-p.x)/d*dt*3.2;p.z+=(tz-p.z)/d*dt*3.2;R.g.rotation.y=Math.atan2(tx-p.x,tz-p.z);}p.y=Math.abs(Math.sin(R.t*9))*0.25;
        const c=R.t>0.6&&[active(0),active(1)].find(h=>near(h,p,1.3));if(c){R.st='sad';R.t=0;R.ca.visible=false;p.y=0;const g=new THREE.Group();W.group.add(g);g.add(cropIcon('morkov'));g.position.set(p.x+0.5,0.2,p.z);g.rotation.z=Math.PI/2;DROPS.push({g,kind:'morkov'});
          SFX.ok();floatText(p.clone().add(new V3(0,1,0)),'Ой! Отдаю, отдаю!','#fff4d0');later(1.2,()=>{if(HARE&&HARE.st==='sad')floatText(p.clone().add(new V3(0,1,0)),'Угостил бы морковкой — я б подружился…','#fff4d0');});}
        else if(R.t>8||p.x<-19){floatText(p.clone().add(new V3(0,1,0)),'Ушёл косой с морковкой!','#ffd0a0');W.group.remove(R.g);HARE=null;}}
      else if(R.st==='sad'){R.g.rotation.x=0.25;if(R.t>14){W.group.remove(R.g);HARE=null;}}
      else{R.g.rotation.x=0;p.x-=dt*2.5;p.y=Math.abs(Math.sin(R.t*9))*0.3;R.g.rotation.y=-Math.PI/2;if(R.t>4){W.group.remove(R.g);HARE=null;}}}
    // золотое яичко в лукошке: мышки бегут к нему; донесли до Дедки — «бил-бил, не разбил»
    if(EGG){const E=EGG,h=E.h;E.t+=dt;
      if(!h.active||(G.solo&&!ctrl(h))||!hubMode){eggEnd();}
      else{if(E.t>=E.next&&E.n<4&&MICE.filter(m=>!m.run).length<2){E.next=E.t+2.4;E.n++;const sp=MSPAWN.filter(q=>{const d=hd(q,h.pos);return d>3&&d<9;});const q=sp.length?pk(sp):MSPAWN[0];
          const m={g:makeMouse(),run:0,t:0};m.g.position.copy(q);MICE.push(m);SFX.miss();if(E.n===1)for(const q2 of[0,1])if(G.solo||q2!==E.pi)tip(q2,'Мышка к яичку золотому бежит!<br>Прогони её '+K(q2,'attack')+' — пусть прочь спешит!',3);}
        if(h.vel.y>3&&!E.jw){E.jw=true;floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Тише, тише — яичко золотое!','#ffd76a');}if(h.grounded)E.jw=false;
        if(near(h,ded.position,2.1)&&!G.ui)eggDeliver();}}
    for(let k=MICE.length-1;k>=0;k--){const m=MICE[k],p=m.g.position;m.t+=dt;
      if(m.run){if(!m.turned){m.turned=true;m.g.rotation.y+=Math.PI;}m.run+=dt;const a=m.g.rotation.y;p.x+=Math.sin(a)*dt*5;p.z+=Math.cos(a)*dt*5;if(m.run>1.6){W.group.remove(m.g);MICE.splice(k,1);}continue;}
      if(!EGG){m.run=1;continue;}const h=EGG.h,d=hd(p,h.pos),sp=h.d.speed*0.4*0.85;if(d>0.01){p.x+=(h.pos.x-p.x)/d*dt*sp;p.z+=(h.pos.z-p.z)/d*dt*sp;m.g.rotation.y=Math.atan2(h.pos.x-p.x,h.pos.z-p.z);}
      if(autoShoo()){const o=HEROES.find(o=>o!==h&&!human(o)&&hd(o.pos,p)<1.5);if(o&&m.t>0.6){shooMouse(m,o);continue;}}
      if(d<0.55&&!G.ui){eggBreak();break;}}
    // кнопка удара: что рядом; «держи» — пока держат кнопку
    if(HOLD){const H=HOLD,a=H.a;if(!btn(H.pi,'attack')||!a.ok()||G.ui||G.cine){HOLD=null;if(a.cancel)a.cancel(H.t);}else{H.t+=dt;if(a.tick)a.tick(dt,H.t);if(H.t>=a.need){HOLD=null;a.done();}}}
    if(!hubMode||F.stage!=='free'||G.ui||G.cine)return;
    for(const pi of[0,1]){const h=active(pi);if(!tap(pi,'attack'))continue;const a=hubAction(h,pi);if(!a)continue;if(a.hold){if(!HOLD){HOLD={pi,a:a.hold,t:0};if(a.hold.start)a.hold.start();}}else a.fn();break;}});
  // рисунки кнопок и таблички
  for(const pi of[0,1]){prompt(pi,'attack',()=>headOf(active(pi)),()=>!!hubAction(active(pi),pi),()=>{const a=hubAction(active(pi),pi);return a?a.note:'';});
    prompt(pi,'attack',()=>headOf(active(pi)),()=>G.ui==='repka','тянем!');
    const lab=(pos,dist,r,text)=>prompt(pi,'label',pos,()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,pos())<dist&&!near(active(pi),pos(),r),text);
    prompt(pi,'label',()=>new V3(-13.7,2.4,1.7),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,new V3(-13.7,0,1.7))<9&&!beds.some((b,i)=>near(active(pi),BEDC[i],1.45)),()=>'Огород Дедки');
    lab(()=>hen.g.position.clone().add(new V3(0,1.8,0)),8,1.8,()=>hideOn?'Курочка Ряба: где мои цыплятки?':'Курочка Ряба');
    lab(()=>PODIUM.clone().add(new V3(0,3.4,0)),9,1.9,()=>'Примерочная');
    lab(()=>SCARE.clone().add(new V3(0,2.9,0)),6,1.6,()=>'Пугало');
    lab(()=>PEA.clone().add(new V3(0,GD.pea>=2&&GD.peaSt>=3?2.2:1.6,0)),7,1.5,()=>GD.pea>=2&&GD.peaSt>=3?'Чудо-горох — до неба!':'Чудо-грядка');}
  // вернулись из похода — что выросло, что снесла Ряба, что стряслось
  if(hubMode){const msgs=[],g=beds.filter(b=>b.grew).length;beds.forEach(b=>{delete b.grew;});
    if(NEWS.rain)msgs.push(()=>banner('Прошёл дождик!','#9fd8ff',2.2,'грядки политы сами'));if(NEWS.dry)msgs.push(()=>banner('Засуха!','#ffc080',2.2,'земля сухая — каждую грядку поливать дважды'));
    if(g)msgs.push(()=>floatText(new V3(-13.7,1.6,1.7),NEWS.kept?'Огород подрос! Цыплята землю рыхлили — влага держится.':'Огород подрос!','#b8f0a0'));
    if(NEWS.rooks)msgs.push(()=>{for(const q of[0,1])tip(q,'Грачи прилетели — всходы клюют!<br>Прогони их '+K(q,'attack')+' — а пугало наряди.',3);});
    if(HN.newChick){HN.newChick=false;msgs.push(()=>floatText(YC.clone().add(new V3(0,1.4,0)),'Вылупился цыплёнок!','#ffe060'));}else if(HN.eggs+HN.gold>0)msgs.push(()=>floatText(NEST.clone().add(new V3(0,1.2,0)),HN.gold>0?'Ряба яичко снесла — да не простое, золотое!':'Ряба яичко снесла — вот дела!','#fff4d0'));
    if(hideOn)msgs.push(()=>banner('Цыплятки разбежались!','#ffe060',2.8,'найди их по писку — и приведи во двор'));
    if(NEWS.order&&GD.order)msgs.push(()=>bark({g:ded},'dedka',ORDER_LINE[GD.order],2.8));
    if(NEWS.pea)msgs.push(()=>GD.peaSt>=3?banner('Горох вырос до неба!','#b8f0a0',2.8,'по листьям — на облако'):floatText(PEA.clone().add(new V3(0,1.6,0)),'Чудо-горох подрос!','#b8f0a0'));
    if(NEWS.mill)msgs.push(()=>floatText(mill.position.clone().add(new V3(0,1.2,0)),'Жерновцы намололи: +'+NEWS.mill+' орешков','#ffd060'));
    msgs.forEach((f,k)=>later(2.2+k*1.6,f));}
  W.farm={GD,HN,HS,ded,hen,chicks,rooks,MICE,PEAS,WORMS,FEATH,DROPS,LEAVES,PEA,CHEST,SCARE,TROUGH,NEST,SACK,BEDC,YARD,get egg(){return EGG;},get hare(){return HARE;},get hideOn(){return hideOn;},own,buyWard};   // для ботов
  { const leave=W.onLeave;W.onLeave=()=>{CAN.h=null;EGG=null;HOLD=null;HEROES.forEach(h=>{if(h.hand&&CROPS[h.hand])G.nutsHub=(G.nutsHub||0)+CROPS[h.hand].nuts;h.can9=false;h.grain=false;h.hand=null;h.handM=null;h.handK=null;});if(leave)leave();};}
