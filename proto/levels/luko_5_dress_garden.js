  function dressOpen(pi,mode){if(G.ui)return;G.ui='dress';DZ.on=true;DZ.mode=mode;DZ.pi=pi;DZ.kind=active(pi).kind;DZ.tab=0;DZ.sel=0;DZ.row=0;
    DZ.saved=HEROES.map(h=>({h,p:h.pos.clone(),f:h.face,fo:h.following}));document.body.classList.add('dressing');dz.style.display='block';placeDress();
    W.camFn=()=>{const hh=HERO[DZ.kind].d.height,D=Math.max(2.3,hh*2.6),ox=0.46*D;return {pos:new V3(PODIUM.x+ox,0.23+hh*0.7+0.35,PODIUM.z+D),look:new V3(PODIUM.x+ox,0.23+hh*0.5,PODIUM.z),k:5};};
    bark({g:vek},'vek',mode==='shop'?['Орешки есть? Милости просим, гости дорогие!','Примерь, не робей — будешь всех милей!','Всё лучшее — героям, как в сказке положено!'][Math.floor(rand(0,3))]:'Покрутись-ка, свет мой, перед зеркальцем!',2);dressDraw();G.uiTick=dressTick;}
  function placeDress(){let i=0;for(const s of DZ.saved){const h=s.h;if(h.kind===DZ.kind){placeOnGround(h,PODIUM.x,PODIUM.z,0.3);h.face=0.35;}else{placeOnGround(h,PODIUM.x-4.6+i*0.9,PODIUM.z+1.6,0);i++;}h.following=false;h.vel.set(0,0,0);}}
  function dressClose(){WEAR_PREVIEW=null;applyWear();DZ.on=false;G.ui=null;G.uiTick=null;W.camFn=null;dz.style.display='none';document.body.classList.remove('dressing');
    if(DZ.saved)for(const s of DZ.saved){placeOnGround(s.h,s.p.x,s.p.z,s.p.y);s.h.face=s.f;s.h.following=s.fo;}DZ.saved=null;F.danceT=0;HEROES.forEach(h=>{h.extraY=0;});SFX.plate();}
  const curGoods=()=>goods(TABS[DZ.tab].id);
  function setPreview(){const g=curGoods()[DZ.sel];WEAR_PREVIEW=(DZ.mode==='shop'&&g&&g.kind==='wear')?{kind:DZ.kind,slot:g.slot,id:g.id}:null;applyWear();}
  const wearOpts=(slot)=>[null].concat(Object.keys(WEAR).filter(id=>WEAR[id].slot===slot&&own(id)));
  const danceOpts=()=>[null].concat(Object.keys(DANCES).filter(own));
  function dressDraw(){const kind=DZ.kind,head='<div class="dz-top">'+WEAR_KINDS.map(k=>'<div class="dav'+(k===kind?' on':'')+'" style="border-color:'+HERO[k].d.css+'">'+sil(k,HERO[k].d.css)+'</div>').join('')+'</div>'+
      '<div class="dz-name">'+HNAME[kind]+'<small>'+K(0,'swap')+' / '+K(1,'swap')+' — другой герой</small></div>';
    const mt='<div class="mtabs"><span class="'+(DZ.mode==='shop'?'on':'')+'">Лавка Векши</span><span class="'+(DZ.mode==='ward'?'on':'')+'">Примерочная</span><small>'+K(DZ.pi,'item')+' переключить</small></div>';
    let body='';
    if(DZ.mode==='shop'){const list=curGoods();DZ.sel=clamp(DZ.sel,0,list.length-1);const g=list[DZ.sel];
      body='<div class="dtabs">'+TABS.map((t,i)=>'<div class="dtab'+(i===DZ.tab?' on':'')+'">'+t.icon+t.name+'</div>').join('')+'</div><div class="dlist">'+
        list.map((it,i)=>{const open=lvOpen(it),has=own(it.id),worn=it.kind==='wear'&&WARD.wear[kind][it.slot]===it.id,sel=WARD.dance===it.id&&it.kind==='dance';
          const pr=!open?'<span class="dprice lock">после '+lvName(it.lv)+'</span>':worn||sel?'<span class="dprice wear">надето</span>':has?'<span class="dprice own">есть</span>':'<span class="dprice'+(nutsAvail()<it.cost?' poor':'')+'">'+it.cost+' '+ICO_NUT+'</span>';
          return '<div class="dcard'+(i===DZ.sel?' sel':'')+(open?'':' lock')+'"><div class="dic">'+it.icon+'</div><div class="dnm">'+it.name+'</div>'+pr+'</div>';}).join('')+'</div>';
        const has=g&&own(g.id),open=g&&lvOpen(g);let act='';
        if(g){if(!open)act='Появится в лавке после уровня '+lvName(g.lv);
          else if(!has)act=(nutsAvail()>=g.cost?K(DZ.pi,'jump')+' купить за '+g.cost+' '+ICO_NUT:'Не хватает '+(g.cost-nutsAvail())+' '+ICO_NUT+' — собирайте орешки в походах, в огороде и у Рябы');
          else if(g.kind==='wear')act=K(DZ.pi,'jump')+(WARD.wear[kind][g.slot]===g.id?' снять':' надеть на '+HACC[kind]);
          else if(g.kind==='dance')act=K(DZ.pi,'jump')+(WARD.dance===g.id?' пляска выбрана — «Ко мне!» в Лукоморье':' выбрать для «Ко мне!»');
          else act='Уже в Лукоморье';}
        body+='<div class="ddetail">'+(g?'<b>'+g.name+'</b><div>'+g.desc+(g.kind==='wear'?' <i>Идёт всем четверым.</i>':'')+'</div><div class="dact">'+act+'</div>':'')+'</div>'+
          '<div class="dhint">'+K(DZ.pi,'left')+K(DZ.pi,'right')+' полка · '+K(DZ.pi,'up')+K(DZ.pi,'down')+' товар · '+K(DZ.pi,'guard')+' уйти</div>';}
    else{const rows=WEAR_SLOTS.map(sl=>{const o=wearOpts(sl),cur=WARD.wear[kind][sl]&&own(WARD.wear[kind][sl])?WARD.wear[kind][sl]:null,it=cur&&WEAR[cur];return {sl,name:SLOT_NAME[sl],n:o.length-1,i:o.indexOf(cur),label:it?it.name:'— без —',icon:it?it.icon:''};});
      const dO=danceOpts(),dc=WARD.dance&&own(WARD.dance)?WARD.dance:null;rows.push({sl:'dance',name:'Пляска',n:dO.length-1,i:dO.indexOf(dc),label:dc?DANCES[dc].name:'— без пляски —',icon:dc?DANCE_IC:''});
      DZ.row=clamp(DZ.row,0,rows.length-1);
      body='<div class="dlist">'+rows.map((r,i)=>'<div class="drow'+(i===DZ.row?' sel':'')+'"><div class="dsl">'+r.name+'</div><div class="dval"><span class="darr">◀</span><span class="dic">'+r.icon+'</span><span class="dlbl">'+r.label+'</span><span class="darr">▶</span></div><div class="dcnt">'+(r.n?Math.max(0,r.i)+' / '+r.n:'нет вещей')+'</div></div>').join('')+'</div>'+
        '<div class="ddetail"><b>'+(rows[DZ.row].sl==='dance'?'Пляшут все вместе':'Надето на '+HACC[kind])+'</b><div>Всё купленное у Векши — навсегда: надевай, снимай, меняй сколько хочешь.'+(rows.every(r=>!r.n)?' <i>Пока пусто — загляни в лавку.</i>':'')+'</div></div>'+
        '<div class="dhint">'+K(DZ.pi,'up')+K(DZ.pi,'down')+' что · '+K(DZ.pi,'left')+K(DZ.pi,'right')+' вещь · '+K(DZ.pi,'skill')+' сюрприз! · '+K(DZ.pi,'guard')+' готово</div>';}
    dz.innerHTML=head+'<div class="dz-panel"><div class="dz-head"><h2>'+(DZ.mode==='shop'?'Лавка Векши':'Примерочная')+'</h2><span class="dnuts">'+ICO_NUT+' '+nutsAvail()+'</span></div>'+mt+body+'</div>';
    setPreview();}
  function dressTick(){const h=HERO[DZ.kind];h.face+=1/60*0.8;h.vel.set(0,0,0);if(hd(h.pos,PODIUM)>0.3)placeOnGround(h,PODIUM.x,PODIUM.z,0.3);
    for(const q of[0,1]){const n=uiNav(q);
      if(tap(q,'guard')||pressed.has('Escape')){dressClose();return;}
      if(tap(q,'item')){DZ.mode=DZ.mode==='shop'?'ward':'shop';SFX.swap();dressDraw();return;}
      if(tap(q,'swap')){const i=WEAR_KINDS.indexOf(DZ.kind);DZ.kind=WEAR_KINDS[(i+1)%4];placeDress();SFX.swap();dressDraw();return;}
      if(DZ.mode==='shop'){if(n.dx){DZ.tab=(DZ.tab+n.dx+TABS.length)%TABS.length;DZ.sel=0;SFX.swap();dressDraw();}
        if(n.dy){const L=curGoods().length;DZ.sel=(DZ.sel+n.dy+L)%L;SFX.swap();dressDraw();const g=curGoods()[DZ.sel];if(g&&g.kind==='dance'&&lvOpen(g))danceStart(g.id,true);}
        if(tap(q,'jump')){const g=curGoods()[DZ.sel];if(!g)return;if(!lvOpen(g)){SFX.miss();return;}
          if(!own(g.id)){if(nutsAvail()<g.cost){SFX.miss();return;}G.nutsSpent+=g.cost;buyWard(g.id);SFX.ok();burst(PODIUM.clone().add(new V3(0,1.2,0)),0xffd76a,20,3);
            if(g.kind==='wear')putOn(DZ.kind,g.id);else if(g.kind==='decor')buildDecor(g.id);else if(g.kind==='dance'&&!WARD.dance){WARD.dance=g.id;saveWard();}
            floatText(PODIUM.clone().add(new V3(0,HERO[DZ.kind].d.height+0.9,0)),g.kind==='wear'?'Обновка!':'Куплено!','#ffd76a');}
          else if(g.kind==='wear'){if(WARD.wear[DZ.kind][g.slot]===g.id){WARD.wear[DZ.kind][g.slot]=null;saveWard();}else putOn(DZ.kind,g.id);SFX.plate();}
          else if(g.kind==='dance'){WARD.dance=g.id;saveWard();SFX.plate();}else SFX.miss();
          dressDraw();}}
      else{if(n.dy){DZ.row=(DZ.row+n.dy+5)%5;SFX.swap();dressDraw();}
        if(n.dx){if(DZ.row<4){const sl=WEAR_SLOTS[DZ.row],o=wearOpts(sl);const cur=WARD.wear[DZ.kind][sl]&&own(WARD.wear[DZ.kind][sl])?WARD.wear[DZ.kind][sl]:null;const ni=(o.indexOf(cur)+n.dx+o.length)%o.length;WARD.wear[DZ.kind][sl]=o[ni];saveWard();applyWear();}
          else{const o=danceOpts(),cur=WARD.dance&&own(WARD.dance)?WARD.dance:null;WARD.dance=o[(o.indexOf(cur)+n.dx+o.length)%o.length];saveWard();if(WARD.dance)danceStart(WARD.dance,true);}
          SFX.plate();burst(PODIUM.clone().add(new V3(0,0.9,0)),0xfff2b0,8,2);dressDraw();}
        if(tap(q,'skill')){for(const sl of WEAR_SLOTS){const o=wearOpts(sl);WARD.wear[DZ.kind][sl]=o.length>1&&Math.random()<0.85?o[1+Math.floor(Math.random()*(o.length-1))]:null;}saveWard();applyWear();SFX.ok();burst(PODIUM.clone().add(new V3(0,1,0)),0xff9ad0,18,3);
          floatText(PODIUM.clone().add(new V3(0,HERO[DZ.kind].d.height+0.9,0)),'Сюрприз!','#ff9ad0');dressDraw();}
        if(tap(q,'jump')){dressClose();return;}}}}
  /* ---------- пляски ---------- */
  function danceStart(id,preview){const d=DANCES[id];if(!d)return;F.danceT=3.4;F.danceKind=id;F.dancePrev=!!preview;d.notes.forEach((m,i)=>later(i*0.22,()=>gusli(m,0,0.16)));}
  function danceTick(dt){if(!(F.danceT>0))return;F.danceT-=dt;const st=(DANCES[F.danceKind]||DANCES.barynya).st,t=G.time;
    const hs=F.dancePrev&&DZ.on?[HERO[DZ.kind]]:HEROES;
    hs.forEach((h,i)=>{if(st==='spin'){h.face+=dt*7;h.extraY=Math.abs(Math.sin(t*9+h.player))*0.35;}
      else if(st==='sway'){h.face+=Math.sin(t*3+i)*dt*2;h.extraY=Math.abs(Math.sin(t*3+i))*0.12;h.body.rotation.z=Math.sin(t*3+i)*0.3;}
      else if(st==='lean'){h.extraY=Math.abs(Math.sin(t*4+i*0.5))*0.2;h.body.rotation.x=0.35+Math.sin(t*4+i*0.5)*0.2;}
      else if(st==='wave'){h.extraY=Math.max(0,Math.sin(t*6-i*1.2))*0.45;h.face+=dt*2;}
      else{h.extraY=Math.abs(Math.sin(t*12+i))*0.28-0.12;h.face+=Math.sin(t*6)*dt*4;}});
    if(F.danceT<=0)HEROES.forEach(h=>{h.extraY=0;});}
  const danceSel=()=>WARD.dance&&own(WARD.dance)?WARD.dance:(Object.keys(DANCES).find(own)||null);   // не выбрана — первая купленная
  function hubDance(pi){const id=danceSel();if(!id||F.danceT>0)return false;danceStart(id,false);floatText(active(pi).pos.clone().add(new V3(0,2,0)),DANCES[id].name.replace(/^[^«]*/,'')+'!','#ffd76a');SFX.ok();return true;}
  const danceOwned=()=>!!danceSel();
  /* ---------- огород Дедки у избы: посадить, полить, подрастёт, пока вы в походе, собрать; репку тянут вместе ---------- */
  const CROPS={morkov:{name:'Морковка',nuts:2,icon:SV('<path d="M32 58 L22 20 H42Z" fill="#ff8a2a"/><path d="M26 22 L20 6 M32 20 L32 4 M38 22 L44 6" stroke="#3f8a3a" stroke-width="4"/>')},
    goroh:{name:'Горох',nuts:2,icon:SV('<path d="M10 40 Q32 10 54 40 Q32 54 10 40Z" fill="#6ac04a"/><circle cx="22" cy="36" r="5" fill="#9ae07a"/><circle cx="32" cy="34" r="5" fill="#9ae07a"/><circle cx="42" cy="36" r="5" fill="#9ae07a"/>')},
    podsolnuh:{name:'Подсолнух',nuts:3,icon:SV('<path d="M32 40 V60" stroke="#3f8a3a" stroke-width="4"/><circle cx="32" cy="26" r="18" fill="#ffd23a"/><circle cx="32" cy="26" r="9" fill="#7a4a1a"/>')},
    repka:{name:'Репка',nuts:8,icon:SV('<path d="M32 60 Q8 50 12 32 Q18 18 32 18 Q46 18 52 32 Q56 50 32 60Z" fill="#f4ecf4"/><path d="M14 30 Q32 22 50 30 Q46 18 32 18 Q18 18 14 30Z" fill="#b06ab0"/><path d="M28 18 L20 2 M32 18 V2 M36 18 L44 2" stroke="#3f8a3a" stroke-width="4"/>')}};
  if(!G.garden)G.garden={beds:[0,1,2,3].map(()=>({crop:null,stage:0,wet:false})),trip:G.trips||0};
  if((G.trips||0)>G.garden.trip){for(const b of G.garden.beds)if(b.crop&&b.wet&&b.stage<3){b.stage++;b.wet=false;b.grew=true;}G.garden.trip=G.trips;}
  const BEDC=[-17,-14.8,-12.6,-10.4].map(x=>new V3(x,0,1.7));const beds=G.garden.beds;
  const BARREL=new V3(-8.3,0,3.3),DEDKA=new V3(-8.2,0,0.9);
  const bedG=BEDC.map((c,i)=>{const g=new THREE.Group();g.position.copy(c);W.group.add(g);addMesh(new THREE.BoxGeometry(1.8,0.16,1.4),M(0x4a2e18),0,0.08,0,g);
    for(const[x,z,w,d]of[[0,0.72,1.9,0.1],[0,-0.72,1.9,0.1],[0.93,0,0.1,1.4],[-0.93,0,0.1,1.4]])addMesh(new THREE.BoxGeometry(w,0.22,d),M(0x8a5a32),x,0.11,z,g);
    for(let k=-1;k<=1;k++)addMesh(new THREE.BoxGeometry(1.6,0.05,0.16),M(0x3a2410),0,0.17,k*0.4,g);const pl=new THREE.Group();g.add(pl);const drop=dropMesh(0x4aa8ff);drop.scale.setScalar(0.38);g.add(drop);
    const star=new THREE.Mesh(new THREE.OctahedronGeometry(0.12),MB(0xfff2b0));g.add(star);return {g,pl,drop,star};});
  function plantDraw(i){const b=beds[i],P=bedG[i].pl;while(P.children.length)P.remove(P.children[0]);const gr=M(0x3f8a3a),lg=M(0x6ac04a);if(!b.crop)return;const c=b.crop,s=b.stage;
    if(s===0){for(let k=0;k<3;k++)part(P,new THREE.SphereGeometry(0.05,6,4),M(0xd8c08a),(k-1)*0.3,0.2,0);return;}
    if(s===1){for(let k=-1;k<=1;k+=2){const l=part(P,new THREE.SphereGeometry(0.08,6,4),lg,k*0.06,0.3,0);l.scale.set(1.4,0.4,0.8);}part(P,new THREE.CylinderGeometry(0.015,0.015,0.14,4),gr,0,0.24,0);return;}
    if(c==='morkov'){for(let k=0;k<3;k++){const x=(k-1)*0.45;for(let j=0;j<4;j++){const l=part(P,new THREE.ConeGeometry(0.04,s===3?0.5:0.34,4),gr,x+rand(-0.05,0.05),s===3?0.42:0.34,rand(-0.05,0.05));l.rotation.z=rand(-0.4,0.4);}
      if(s===3){const cr=part(P,new THREE.ConeGeometry(0.08,0.3,8),M(0xff8a2a),x,0.2,0);cr.rotation.x=Math.PI;}}}
    else if(c==='goroh'){part(P,new THREE.CylinderGeometry(0.02,0.02,s===3?1.1:0.7,4),M(0x8a6a44),0,s===3?0.7:0.5,0);for(let k=0;k<(s===3?5:3);k++){const l=part(P,new THREE.SphereGeometry(0.09,6,4),lg,Math.sin(k*2)*0.1,0.35+k*0.15,Math.cos(k*2)*0.1);l.scale.set(1.3,0.5,1);}
      if(s===3)for(let k=0;k<4;k++){const p=part(P,new THREE.SphereGeometry(0.07,8,6),M(0x9ae07a),Math.sin(k*1.7)*0.16,0.5+k*0.14,Math.cos(k*1.7)*0.16);p.scale.set(0.8,1.9,0.8);}}
    else if(c==='podsolnuh'){const h2=s===3?1.3:0.75;part(P,new THREE.CylinderGeometry(0.035,0.045,h2,6),gr,0,0.18+h2/2,0);for(let k=-1;k<=1;k+=2){const l=part(P,new THREE.SphereGeometry(0.12,6,4),lg,k*0.13,0.2+h2*0.45,0);l.scale.set(1.4,0.3,0.8);}
      if(s===3){const fl=new THREE.Group();fl.position.set(0,0.2+h2,0.05);fl.rotation.x=-0.3;P.add(fl);for(let k=0;k<12;k++){const a=k/12*Math.PI*2;const pt=part(fl,new THREE.SphereGeometry(0.09,6,4),M(0xffd23a),Math.cos(a)*0.24,Math.sin(a)*0.24,0);pt.scale.set(1.5,0.6,0.3);pt.rotation.z=a;}
        part(fl,new THREE.CylinderGeometry(0.17,0.17,0.06,14),M(0x7a4a1a),0,0,0.02).rotation.x=Math.PI/2;}else part(P,new THREE.SphereGeometry(0.1,8,6),lg,0,0.25+h2,0);}
    else{const r=s===3?0.5:0.24;const tb=part(P,new THREE.SphereGeometry(r,14,10),M(0xf4ecf4),0,0.14+r*0.55,0);tb.scale.y=0.9;const tp=part(P,new THREE.SphereGeometry(r*0.98,14,8,0,Math.PI*2,0,Math.PI/2.4),M(0xb06ab0),0,0.14+r*0.62,0);
      for(let k=0;k<5;k++){const a=k/5*Math.PI*2;const l=part(P,new THREE.SphereGeometry(0.16*(s===3?1.6:1),6,4),gr,Math.cos(a)*0.12,0.18+r*1.4+0.12,Math.sin(a)*0.12);l.scale.set(0.5,1.6,0.3);l.rotation.z=Math.cos(a)*0.5;l.rotation.x=Math.sin(a)*0.5;}}}
  beds.forEach((b,i)=>plantDraw(i));
  // Дедка, кадка с лейкой
  const ded=new THREE.Group();ded.position.copy(DEDKA);ded.rotation.y=-Math.PI/2;W.group.add(ded);
  {const sh=M(0xe8e0d0),bl=M(0x5a6a9a),sk=M(0xe8c0a0),wh=M(0xf8f8f8);part(ded,new THREE.CylinderGeometry(0.3,0.36,0.9,10),bl,0,0.45,0);part(ded,new THREE.CylinderGeometry(0.32,0.3,0.55,10),sh,0,1.15,0);part(ded,new THREE.SphereGeometry(0.24,10,8),sk,0,1.62,0);
    const bd=new THREE.ConeGeometry(0.2,0.5,8);bd.rotateX(Math.PI);part(ded,bd,wh,0,1.34,0.14);part(ded,new THREE.CylinderGeometry(0.27,0.27,0.08,12),M(0x3a3a4a),0,1.82,0);part(ded,new THREE.CylinderGeometry(0.2,0.22,0.16,12),M(0x3a3a4a),0,1.92,0);
    part(ded,new THREE.CylinderGeometry(0.025,0.025,1.4,5),M(0x6b4a2b),0.38,0.7,0.1);for(const s of[-1,1])part(ded,new THREE.SphereGeometry(0.03,6,5),MAT.dark,s*0.08,1.67,0.21);}
  W.cyls.push({x:DEDKA.x,z:DEDKA.z,r:0.4,miny:-1,maxy:2,on:true});
  {const bg=new THREE.Group();bg.position.copy(BARREL);W.group.add(bg);addMesh(new THREE.CylinderGeometry(0.42,0.36,0.7,12),M(0x8a5a32),0,0.35,0,bg);for(const y of[0.15,0.55])addMesh(new THREE.TorusGeometry(0.4,0.025,5,16),M(0x4a4a50),0,y,0,bg).rotation.x=Math.PI/2;
    addMesh(new THREE.CylinderGeometry(0.37,0.37,0.02,14),MB(0x4aa8ff),0,0.66,0,bg);W.cyls.push({x:BARREL.x,z:BARREL.z,r:0.45,miny:-1,maxy:0.7,on:true});}
  const can=new THREE.Group();W.group.add(can);{const cm=M(0x5a9ac0);part(can,new THREE.CylinderGeometry(0.13,0.15,0.26,10),cm,0,0,0);const sp=part(can,new THREE.CylinderGeometry(0.02,0.035,0.3,6),cm,0.17,0.04,0);sp.rotation.z=-1.0;
    part(can,new THREE.TorusGeometry(0.1,0.02,5,10,Math.PI),cm,-0.02,0.14,0).rotation.y=Math.PI/2;}
  const CAN={h:null,water:0};const canHome=()=>{can.position.set(BARREL.x+0.12,0.84,BARREL.z);can.rotation.set(0,0,0);};canHome();
  /* ---------- курятник Курочки Рябы: покормить, погладить, яички в гнезде; цыплята растут, пока вы в походе ---------- */
  hut(-14.2,9.2,3.0,2.6,0xa03a2a,false);
  const YARD={x0:-12.2,x1:-6.6,z0:6.8,z1:11.4},YC=new V3(-9.4,0,9.1),NEST=new V3(-12.1,0,10.6),SACK=new V3(-12.1,0,7.4);
  {const fm=M(0x9a7a4a);for(const[a,b,c,d]of[[YARD.x0-0.2,YARD.x1+0.2,YARD.z1+0.1,YARD.z1+0.25],[YARD.x1+0.1,YARD.x1+0.25,YARD.z0-0.2,YARD.z1+0.2],[YARD.x0-0.2,-10.4,YARD.z0-0.25,YARD.z0-0.1],[-8.4,YARD.x1+0.2,YARD.z0-0.25,YARD.z0-0.1]]){
      box(a,b,0,0.55,c,d,fm,{occ:false});}
    const ng=new THREE.Group();ng.position.copy(NEST);W.group.add(ng);addMesh(new THREE.BoxGeometry(0.8,0.3,0.7),M(0x8a5a32),0,0.15,0,ng);addMesh(new THREE.CylinderGeometry(0.3,0.22,0.12,12),M(0xe0c060),0,0.34,0,ng);
    const sg=new THREE.Group();sg.position.copy(SACK);W.group.add(sg);const sk=addMesh(new THREE.SphereGeometry(0.34,10,8),M(0xc8b080),0,0.32,0,sg);sk.scale.set(1,1.2,0.9);addMesh(new THREE.ConeGeometry(0.14,0.2,6),M(0xb09a6a),0,0.76,0,sg);
    for(let k=0;k<6;k++)addMesh(new THREE.SphereGeometry(0.03,5,4),M(0xffd23a),rand(-0.15,0.15),0.72,rand(-0.1,0.1),sg);W.cyls.push({x:SACK.x,z:SACK.z,r:0.36,miny:-1,maxy:0.9,on:true},{x:NEST.x,z:NEST.z,r:0.4,miny:-1,maxy:0.34,on:true});}
  if(!G.hen)G.hen={food:0.7,joy:0.6,eggs:1,gold:0,chicks:0,trip:G.trips||0,happy:0};const HN=G.hen;
  if((G.trips||0)>HN.trip){const n=Math.min(3,G.trips-HN.trip);for(let i=0;i<n;i++){if(HN.food>0.45&&HN.joy>0.45){HN.happy++;if(HN.happy%3===0)HN.gold++;else HN.eggs++;if(HN.happy%2===0&&HN.chicks<4){HN.chicks++;HN.newChick=true;}}HN.food=Math.max(0,HN.food-0.4);HN.joy=Math.max(0,HN.joy-0.35);}HN.trip=G.trips;}
  function makeHen(){const g=new THREE.Group();W.group.add(g);const wh=M(0xf4efe4),sp=M(0x8a7a6a),rd=M(0xd8302a),yl=M(0xf0b030);const body=new THREE.Group();g.add(body);
    const b=part(body,new THREE.SphereGeometry(0.32,12,10),wh,0,0.42,0);b.scale.set(0.9,0.85,1.15);for(let i=0;i<12;i++)part(body,new THREE.SphereGeometry(0.035,5,4),sp,rand(-0.26,0.26),rand(0.3,0.62),rand(-0.32,0.2));
    const head=new THREE.Group();head.position.set(0,0.72,0.26);body.add(head);part(head,new THREE.SphereGeometry(0.15,10,8),wh,0,0,0);const bk=part(head,new THREE.ConeGeometry(0.045,0.12,6),yl,0,-0.02,0.16);bk.rotation.x=Math.PI/2;
    for(let i=0;i<3;i++)part(head,new THREE.SphereGeometry(0.045,6,5),rd,0,0.14,0.06-i*0.05);part(head,new THREE.SphereGeometry(0.035,6,5),rd,0,-0.1,0.12);for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.025,6,5),MAT.dark,s*0.08,0.03,0.1);
    const tl=part(body,new THREE.ConeGeometry(0.14,0.3,6),wh,0,0.62,-0.34);tl.rotation.x=-0.8;const wings=[];for(const s of[-1,1]){const w=part(body,new THREE.SphereGeometry(0.16,8,6),wh,s*0.27,0.45,-0.02);w.scale.set(0.35,0.8,1.1);wings.push(w);}
    for(const s of[-1,1])part(g,new THREE.CylinderGeometry(0.02,0.02,0.2,4),yl,s*0.09,0.1,0);return {g,body,head,wings};}
  function makeChick(){const g=new THREE.Group();W.group.add(g);part(g,new THREE.SphereGeometry(0.11,10,8),M(0xffe060),0,0.12,0);part(g,new THREE.SphereGeometry(0.075,8,6),M(0xffe060),0,0.25,0.05);const bk=part(g,new THREE.ConeGeometry(0.025,0.06,5),M(0xf09020),0,0.24,0.13);bk.rotation.x=Math.PI/2;
    for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.015,5,4),MAT.dark,s*0.035,0.27,0.11);return g;}
  const hen=makeHen();hen.g.position.copy(YC);const HS={tgt:YC.clone(),mode:'walk',t:0,eat:null,flap:0,parade:null,paradeT:0};
  const chicks=[];for(let i=0;i<HN.chicks;i++){const c=makeChick();c.position.set(YC.x-0.5-i*0.35,0,YC.z+0.3);chicks.push(c);}
  const henIc={grain:new THREE.Group(),heart:new THREE.Group()};W.group.add(henIc.grain,henIc.heart);
  {for(let k=0;k<5;k++)part(henIc.grain,new THREE.SphereGeometry(0.05,6,5),MB(0xffd23a),Math.cos(k*1.3)*0.08,Math.sin(k*2)*0.04,Math.sin(k*1.3)*0.08);part(henIc.grain,new THREE.TorusGeometry(0.14,0.03,6,14),MB(0xc8a060),0,-0.03,0).rotation.x=Math.PI/2;
    const hm=MB(0xff6a9a);part(henIc.heart,new THREE.SphereGeometry(0.09,8,6),hm,-0.07,0.05,0);part(henIc.heart,new THREE.SphereGeometry(0.09,8,6),hm,0.07,0.05,0);const hc=part(henIc.heart,new THREE.ConeGeometry(0.125,0.17,8),hm,0,-0.07,0);hc.rotation.z=Math.PI;}
  const eggMeshes=[];function eggsDraw(){eggMeshes.forEach(m=>W.group.remove(m));eggMeshes.length=0;const n=HN.eggs+HN.gold;for(let i=0;i<Math.min(n,6);i++){const gold=i<HN.gold;const m=new THREE.Mesh(new THREE.SphereGeometry(0.085,10,8),gold?M(0xffd23a,{emissive:0xb07a10,emissiveIntensity:0.7}):M(0xf8f4ea));
      m.scale.y=1.3;m.position.set(NEST.x+Math.cos(i*2.1)*0.12,0.44,NEST.z+Math.sin(i*2.1)*0.12);W.group.add(m);eggMeshes.push(m);}}
  eggsDraw();
  let mouse=null;if(HN.gold>0&&hubMode){mouse=new THREE.Group();W.group.add(mouse);part(mouse,new THREE.SphereGeometry(0.1,8,6),M(0x8a8a90),0,0.08,0).scale.set(0.8,0.7,1.4);for(const s of[-1,1])part(mouse,new THREE.SphereGeometry(0.045,6,5),M(0xd8a0a8),s*0.06,0.15,0.08);
    const tl=part(mouse,new THREE.CylinderGeometry(0.008,0.008,0.3,4),M(0xd8a0a8),0,0.06,-0.26);tl.rotation.x=Math.PI/2;mouse.position.set(YARD.x0+0.3,0,YARD.z1-0.2);mouse.userData={t:0,done:false};}
  /* ---------- что рядом: одно действие на кнопку удара ---------- */
  const near=(h,p,r)=>hd(h.pos,p)<r&&h.pos.y<1.6;
  function hubAction(h,pi){if(!hubMode||F.stage!=='free'||G.ui||G.cine||F.danceT>0)return null;
    if(near(h,PODIUM,1.9))return {note:'примерочная',fn:()=>dressOpen(pi,'ward')};
    if(mouse&&!mouse.userData.done&&near(h,mouse.position,1.7))return {note:'кыш!',fn:()=>{mouse.userData.done=true;mouse.userData.run=1;G.nutsHub=(G.nutsHub||0)+1;SFX.whoosh();floatText(mouse.position.clone().add(new V3(0,0.8,0)),'Кыш! +1 орешек','#ffd060');}};
    if(near(h,NEST,1.5)&&HN.eggs+HN.gold>0)return {note:'собрать яички',fn:()=>takeEggs(h)};
    if(near(h,SACK,1.4)&&!h.grain)return {note:'взять зерно',fn:()=>{if(h.can9){tip(pi,'В лапах лейка у тебя — у бочки с водой её поставь.',2);return;}h.grain=true;SFX.plate();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Зерно!','#ffd060');}};
    if(near(h,hen.g.position,1.8))return h.grain?{note:'покормить',fn:()=>feedHen(h)}:{note:'погладить',fn:()=>petHen(h,pi)};
    if(near(h,BARREL,1.5))return CAN.h===h?{note:'поставить лейку',fn:()=>{CAN.h=null;h.can9=false;canHome();SFX.plate();}}:!CAN.h?{note:'взять лейку',fn:()=>{if(h.grain){tip(pi,'Сперва зерно Рябе отнеси.',2);return;}CAN.h=h;h.can9=true;CAN.water=4;SFX.water();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Лейка полна!','#9fd8ff');}}:null;
    for(let i=0;i<4;i++){if(!near(h,BEDC[i],1.45))continue;const b=beds[i];
      if(!b.crop)return {note:'посадить',fn:()=>seedPick(i,pi)};
      if(b.stage>=3)return {note:b.crop==='repka'?'тянем-потянем!':'собрать урожай',fn:()=>harvest(i,pi)};
      if(!b.wet)return {note:CAN.h===h?'полить':'нужна лейка',fn:()=>water(i,h,pi)};
      return {note:'полито',fn:()=>{floatText(BEDC[i].clone().add(new V3(0,1,0)),'Полито уж — подрастёт, пока вы в пути.','#9fd8ff');}};}
    if(near(h,DEDKA,1.8))return {note:'Дедка',fn:()=>bark({g:ded},'dedka',['Посадил дед репку… а тянуть-потянуть — всем миром!','Посадил — полей скорей. Сходишь в поход — подрастёт, ей-ей.','Урожай — Векше за орешки, а мне — репку, да покрепче!'][Math.floor(rand(0,3))],2.6)};
    return null;}
  function seedPick(i,pi){G.ui='seed';let sel=0;const ks=Object.keys(CROPS);const el=$('mapui');el.style.display='flex';
    const draw=()=>{el.innerHTML='<div class="tet seed"><h2>Что посадим?</h2><div class="seeds">'+ks.map((k,j)=>'<div class="sd'+(j===sel?' sel':'')+'">'+CROPS[k].icon+'<b>'+CROPS[k].name+'</b><small>'+CROPS[k].nuts+' '+ICO_NUT+'</small></div>').join('')+'</div>'+
      '<div class="tale">'+(ks[sel]==='repka'?'Репку вытянуть можно только вдвоём!':'Посади, полей — и подрастёт, пока вы в походе')+'</div><div class="hint">'+K(pi,'left')+K(pi,'right')+' · '+K(pi,'jump')+' посадить · '+K(pi,'guard')+' отмена</div></div>';};
    draw();G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dx){sel=(sel+n.dx+ks.length)%ks.length;SFX.swap();draw();}if(tap(q,'guard')||pressed.has('Escape')){closePanel();return;}
      if(tap(q,'jump')){beds[i]={crop:ks[sel],stage:0,wet:false};plantDraw(i);closePanel();SFX.grow();burst(BEDC[i].clone().add(new V3(0,0.4,0)),0x8a6a44,10,2);floatText(BEDC[i].clone().add(new V3(0,1,0)),CROPS[ks[sel]].name+' посажена! Полить бы теперь.','#b8f0a0');return;}}};}
  function water(i,h,pi){if(CAN.h!==h){tip(pi,'Лейка у бочки с водой стоит.',2.2);SFX.miss();return;}if(CAN.water<=0){tip(pi,'Лейка пуста — в бочке воды набери.',2);SFX.miss();return;}CAN.water--;const b=beds[i];b.wet=true;SFX.water();
    for(let k=0;k<6;k++)later(k*0.06,()=>burst(BEDC[i].clone().add(new V3(rand(-0.6,0.6),0.5,rand(-0.4,0.4))),0x7ac8ff,4,2,0.6));
    if(b.stage===0){b.stage=1;later(0.4,()=>{plantDraw(i);SFX.grow();floatText(BEDC[i].clone().add(new V3(0,1,0)),'Проклюнулся!','#b8f0a0');});}else floatText(BEDC[i].clone().add(new V3(0,1,0)),'Полито! Подрастёт, пока вы в пути.','#9fd8ff');}
  function harvest(i,pi){const b=beds[i];if(b.crop==='repka'){repkaGame(i,pi);return;}const C=CROPS[b.crop];G.nutsHub=(G.nutsHub||0)+C.nuts;SFX.ok();burst(BEDC[i].clone().add(new V3(0,0.6,0)),0xffd76a,16,3);
    floatText(BEDC[i].clone().add(new V3(0,1.2,0)),C.name+'! +'+C.nuts+' орешка','#ffd060');beds[i]={crop:null,stage:0,wet:false};plantDraw(i);if(Math.random()<0.5)later(0.5,()=>bark({g:ded},'dedka','Хороша! За такую Векша орешками платит сполна.',2.2));}
  // репка: всем миром — Дедка и четверо за ним; «тянем-потянем» в такт, удар обоих игроков вместе
  function repkaGame(i,pi){const a=[active(0),active(1)];if(a.some(h=>(!G.solo||ctrl(h))&&hd(h.pos,BEDC[i])>3.2)){tip(pi,'Одному репку не вытянуть — друга кличь!',2.6);tip(1-pi,'Друг тянет репку — беги подсоблять!',2.6);SFX.miss();return;}
    G.ui='repka';const c=BEDC[i],order=[HERO.proshka,HERO.pelageya,HERO.potap,HERO.yosha];const d0=ded.position.clone();ded.position.set(c.x+0.95,0,c.z);ded.rotation.y=-Math.PI/2;
    order.forEach((h,k)=>{placeOnGround(h,c.x+1.7+k*0.72,c.z,0);h.face=-Math.PI/2;h.following=false;});const R={t:-0.6,pulls:0,k:0,p:[null,null],miss:0,rise:0};
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.05,6,28),MB(0xffd76a,{transparent:true,opacity:0.9}));ring.rotation.x=Math.PI/2;ring.position.set(c.x,0.5,c.z);W.group.add(ring);const B=1.3;
    banner('Тянем-потянем!','#ffd76a',2,'жмите оба '+K(0,'attack')+' / '+K(1,'attack')+' разом, как сожмётся кольцо');
    G.uiTick=()=>{R.t+=1/60;const beat=(R.k+1)*B,u=clamp((beat-R.t)/B,0,1);ring.scale.setScalar(lerp(0.4,1.8,u));ring.material.color.setHex(u<0.18?0xffffff:0xffd76a);
      for(const q of[0,1])if(tap(q,'attack')&&R.p[q]===null&&Math.abs(R.t-beat)<0.45){R.p[q]=R.t;active(q).atkT=0.28;if(G.solo){R.p[1-q]=R.t;active(1-q).atkT=0.28;}}
      if(R.t>beat+0.45){const ok=R.p[0]!==null&&R.p[1]!==null;R.k++;R.p=[null,null];
        if(ok||R.miss>=6){R.pulls++;R.rise=R.pulls;SFX.hammer();shakeAll(0.03,0.2);floatText(c.clone().add(new V3(0,1.6,0)),['Тянут!','Потянут!','Вытянули!'][Math.min(2,R.pulls-1)],'#ffd76a');order.forEach(h=>{h.pos.x+=0.22;});ded.position.x+=0.22;
          anim(0.4,q=>{bedG[i].pl.position.y=(R.pulls/3)*0.35*q+((R.pulls-1)/3)*0.35*(1-q);});}
        else{R.miss++;SFX.miss();floatText(c.clone().add(new V3(0,1.6,0)),'Тянут-потянут — вытянуть не могут! Вместе!','#ffd0d0');}}
      if(R.pulls>=3){G.uiTick=null;W.group.remove(ring);const pl=bedG[i].pl,from=pl.position.clone();anim(0.9,q=>{pl.position.set(from.x+q*1.8,from.y+Math.sin(q*Math.PI)*2.2,from.z);pl.rotation.z=-q*2;});
        later(0.2,()=>{order.forEach((h,k)=>{h.vel.set(4+k,4,0);h.grounded=false;h.knockT=0.4;});});SFX.ok();SFX.horn();burst(c.clone().add(new V3(0,1,0)),0xffd76a,30,5);
        later(1.2,()=>{G.nutsHub=(G.nutsHub||0)+CROPS.repka.nuts;banner('Вытянули репку!','#ffd76a',2.6,'всем миром · +'+CROPS.repka.nuts+' орешков в лукошко');beds[i]={crop:null,stage:0,wet:false};pl.position.set(0,0,0);pl.rotation.set(0,0,0);plantDraw(i);ded.position.copy(d0);G.ui=null;
          bark({g:ded},'dedka','Тянут-потянут — вытянули репку!<br>Вот что значит — вместе, крепко!',3);});}};}
  function feedHen(h){h.grain=false;SFX.plate();const spot=hen.g.position.clone().add(new V3(rand(-0.4,0.4),0,rand(-0.4,0.4)));for(let k=0;k<10;k++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.03,5,4),M(0xffd23a));m.position.set(spot.x+rand(-0.35,0.35),0.03,spot.z+rand(-0.35,0.35));W.group.add(m);later(4,()=>W.group.remove(m));}
    HS.mode='eat';HS.t=0;HS.tgt.copy(spot);HN.food=1;floatText(hen.g.position.clone().add(new V3(0,1.1,0)),'Ко-ко-ко! Сыта, довольна!','#ffd060');tone(700,0.12,'square',0.08,500);later(0.2,()=>tone(760,0.1,'square',0.08,520));}
  function petHen(h,pi){HN.joy=Math.min(1,HN.joy+0.35);HS.flap=0.9;SFX.flower();for(let k=0;k<4;k++)later(k*0.12,()=>burst(hen.g.position.clone().add(new V3(0,0.9,0)),0xff9ac0,3,1.5));
    floatText(hen.g.position.clone().add(new V3(0,1.1,0)),HN.joy>=1?'Ко-ко! Цыплятки — за тобой гурьбой!':'Ко-ко!','#ffb0d0');tone(880,0.1,'square',0.06,640);if(HN.joy>=1&&chicks.length){HS.parade=h;HS.paradeT=9;}}
  function takeEggs(h){const p=HN.eggs*2+HN.gold*6,gold=HN.gold>0;G.nutsHub=(G.nutsHub||0)+p;eggMeshes.forEach((m,k)=>{const from=m.position.clone();anim(0.5,q=>{m.position.lerpVectors(from,h.pos.clone().add(new V3(0,h.d.height,0)),q);});});
    later(0.55,()=>{HN.eggs=0;HN.gold=0;eggsDraw();});SFX.ok();if(gold){banner('Яичко не простое — золотое!','#ffd76a',2.6,'+'+p+' орешков · Векша так и ахнет');SFX.horn();}else floatText(NEST.clone().add(new V3(0,1,0)),'Яички! +'+p+' орешков','#ffd060');}
  /* ---------- жизнь огорода и двора ---------- */
  // крона дуба: камера рядом или внутри — листва становится прозрачной (герои у моря не прячутся за дубом)
  const leafMats=[],barkMats=[];oak.traverse(o=>{if(!o.isMesh)return;o.material=o.material.clone();o.material.transparent=true;(o.geometry.type==='SphereGeometry'?leafMats:barkMats).push(o.material);});const CROWN=new V3(0,8.8,-7);
  W.updates.push(dt=>{danceTick(dt);{const cp=G.split>0.5?cams[0].position:camS.position,d=Math.min(cp.distanceTo(CROWN),G.split>0.5?cams[1].position.distanceTo(CROWN):99),op=clamp((d-5.5)/4,0.18,1);leafMats.forEach(m=>{m.opacity=op;m.depthWrite=op>0.95;});const dh=Math.hypot(cp.x,cp.z+7),ob=cp.y<9?clamp((dh-2.4)/2.6,0.22,1):1;barkMats.forEach(m=>{m.opacity=ob;m.depthWrite=ob>0.95;});}
    // лейка и зерно в лапах
    can.visible=!DZ.on;if(CAN.h){const h=CAN.h,f=h.face;can.position.set(h.pos.x+Math.sin(f)*0.3+Math.cos(f)*0.28,h.pos.y+h.d.height*0.55,h.pos.z+Math.cos(f)*0.3-Math.sin(f)*0.28);can.rotation.set(0,f-Math.PI/2,h.atkT>0?-0.9:0);if(!h.active&&hd(h.pos,BARREL)>30){CAN.h=null;h.can9=false;canHome();}}
    for(const h of HEROES){if(!h.grain)continue;if(!h.grainM){h.grainM=new THREE.Group();part(h.grainM,new THREE.CylinderGeometry(0.14,0.1,0.08,10),M(0xc8a060),0,0,0);for(let k=0;k<5;k++)part(h.grainM,new THREE.SphereGeometry(0.03,5,4),M(0xffd23a),rand(-0.07,0.07),0.05,rand(-0.07,0.07));W.group.add(h.grainM);}
      h.grainM.visible=true;h.grainM.position.set(h.pos.x+Math.sin(h.face)*0.35,h.pos.y+h.d.height*0.6,h.pos.z+Math.cos(h.face)*0.35);}
    for(const h of HEROES)if(!h.grain&&h.grainM)h.grainM.visible=false;
    // грядки: капля — хочет пить, звёздочка — спело
    beds.forEach((b,i)=>{const B=bedG[i];B.drop.visible=!!b.crop&&!b.wet&&b.stage<3;B.drop.position.set(0,1.05+Math.sin(G.time*3+i)*0.08,0);B.star.visible=!!b.crop&&b.stage>=3;B.star.position.set(0,b.crop==='podsolnuh'?1.9:1.3,0);B.star.rotation.y+=dt*3;});
    // Ряба гуляет по двору, клюёт; поела — довольна; погладили — хлопает крыльями
    HS.t+=dt;const hp=hen.g.position;HS.flap=Math.max(0,HS.flap-dt);
    if(HS.mode==='walk'){const d=hd(hp,HS.tgt);if(d<0.15){HS.mode='peck';HS.t=0;}else{hp.x+=(HS.tgt.x-hp.x)/d*dt*0.9;hp.z+=(HS.tgt.z-hp.z)/d*dt*0.9;hen.g.rotation.y=angDamp(hen.g.rotation.y,Math.atan2(HS.tgt.x-hp.x,HS.tgt.z-hp.z),6,dt);}}
    else if(HS.mode==='eat'){const d=hd(hp,HS.tgt);if(d>0.2){hp.x+=(HS.tgt.x-hp.x)/d*dt*2.2;hp.z+=(HS.tgt.z-hp.z)/d*dt*2.2;hen.g.rotation.y=Math.atan2(HS.tgt.x-hp.x,HS.tgt.z-hp.z);}if(HS.t>4){HS.mode='peck';HS.t=0;}}
    else if(HS.t>1.6){HS.mode='walk';HS.tgt.set(rand(YARD.x0+0.5,YARD.x1-0.5),0,rand(YARD.z0+0.5,YARD.z1-0.5));}
    const peck=HS.mode==='peck'||(HS.mode==='eat'&&hd(hp,HS.tgt)<=0.2);hen.head.rotation.x=peck?(Math.sin(G.time*14)>0?0.9:0.2):0;hen.head.position.y=peck?0.62:0.72;
    hen.g.position.y=HS.flap>0?Math.abs(Math.sin(HS.flap*10))*0.3:0;hen.wings.forEach((w,k)=>{w.rotation.z=(k?-1:1)*(HS.flap>0?Math.sin(G.time*30)*0.9:0.05);});hen.body.rotation.z=HN.food<0.3&&HN.joy<0.3?0.25:0;
    henIc.grain.visible=HN.food<0.5;henIc.heart.visible=!henIc.grain.visible&&HN.joy>0.7;[henIc.grain,henIc.heart].forEach(m=>{m.position.set(hp.x,1.35+Math.sin(G.time*3)*0.06,hp.z);m.rotation.y+=dt*2;});
    // цыплята: за Рябой гуськом, а после ласки — за героем
    HS.paradeT=Math.max(0,HS.paradeT-dt);let lead=HS.paradeT>0&&HS.parade?HS.parade.pos:hp;chicks.forEach((c,k)=>{const tx=lead.x,tz=lead.z,d=Math.hypot(tx-c.position.x,tz-c.position.z);if(d>0.45){const sp2=Math.min(d*2.4,HS.paradeT>0?5:2.2);c.position.x+=(tx-c.position.x)/d*sp2*dt;c.position.z+=(tz-c.position.z)/d*sp2*dt;c.rotation.y=Math.atan2(tx-c.position.x,tz-c.position.z);}
      c.position.y=Math.abs(Math.sin(G.time*10+k))*0.05;lead=c.position;});
    // мышка бежит к золотому яичку
    if(mouse&&F.stage==='free'&&!G.cine){const M2=mouse.userData;if(M2.run){mouse.position.x-=dt*4;mouse.rotation.y=-Math.PI/2;if(mouse.position.x<YARD.x0-3){W.group.remove(mouse);mouse=null;}}
      else if(!M2.done){M2.t+=dt;const d=hd(mouse.position,NEST);if(d>0.4){mouse.position.x+=(NEST.x-mouse.position.x)/d*dt*0.35;mouse.position.z+=(NEST.z-mouse.position.z)/d*dt*0.35;mouse.rotation.y=Math.atan2(NEST.x-mouse.position.x,NEST.z-mouse.position.z);}
        else{M2.done=true;M2.run=1;SFX.miss();floatText(NEST.clone().add(new V3(0,1,0)),'Мышка бежала, хвостиком махнула… яичко не разбилось!','#e0e0ff');}
        if(M2.t>1.5&&!M2.told){M2.told=true;for(const q of[0,1])tip(q,'Мышка к яичку золотому бежит!<br>Прогони её '+K(q,'attack')+' — пусть прочь спешит!',3);}}}
    if(!hubMode||F.stage!=='free'||G.ui||G.cine)return;
    for(const pi of[0,1]){const h=active(pi);if(!tap(pi,'attack'))continue;const a=hubAction(h,pi);if(a){a.fn();break;}}});
  // рисунки кнопок и таблички
  for(const pi of[0,1]){prompt(pi,'attack',()=>headOf(active(pi)),()=>!!hubAction(active(pi),pi),()=>{const a=hubAction(active(pi),pi);return a?a.note:'';});
    prompt(pi,'attack',()=>headOf(active(pi)),()=>G.ui==='repka','тянем!');
    prompt(pi,'label',()=>new V3(-13.7,2.4,1.7),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,new V3(-13.7,0,1.7))<9&&!beds.some((b,i)=>near(active(pi),BEDC[i],1.45)),()=>'Огород Дедки');
    prompt(pi,'label',()=>hen.g.position.clone().add(new V3(0,1.8,0)),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,hen.g.position)<8&&!near(active(pi),hen.g.position,1.8),()=>'Курочка Ряба');
    prompt(pi,'label',()=>PODIUM.clone().add(new V3(0,3.4,0)),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,PODIUM)<9&&!near(active(pi),PODIUM,1.9),()=>'Примерочная');}
  // вернулись из похода — что выросло, что снесла Ряба
  if(hubMode&&(beds.some(b=>b.grew)||HN.eggs+HN.gold>0||HN.newChick))later(2.2,()=>{const g=beds.filter(b=>b.grew).length;beds.forEach(b=>{delete b.grew;});
    if(g)floatText(new V3(-13.7,1.6,1.7),'Огород подрос!','#b8f0a0');if(HN.newChick){HN.newChick=false;floatText(YC.clone().add(new V3(0,1.4,0)),'Вылупился цыплёнок!','#ffe060');}
    else if(HN.eggs+HN.gold>0)floatText(NEST.clone().add(new V3(0,1.2,0)),'Ряба яичко снесла — вот дела!','#fff4d0');});
  { const leave=W.onLeave;W.onLeave=()=>{if(DZ.on)dressClose();CAN.h=null;HEROES.forEach(h=>{h.can9=false;h.grain=false;if(h.grainM){W.group.remove(h.grainM);h.grainM=null;}});if(leave)leave();};}
  /* ---------- праздник: Сказ 1, первый виток, ролик «Голос» ---------- */
