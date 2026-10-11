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
  /* ---------- крона дуба и пляска ---------- */
  // крона дуба: камера рядом или внутри — листва становится прозрачной (герои у моря не прячутся за дубом)
  const leafMats=[],barkMats=[];oak.traverse(o=>{if(!o.isMesh)return;o.material=o.material.clone();o.material.transparent=true;(o.geometry.type==='SphereGeometry'?leafMats:barkMats).push(o.material);});const CROWN=new V3(0,8.8,-7);
  W.updates.push(dt=>{danceTick(dt);{const cp=G.split>0.5?cams[0].position:camS.position,d=Math.min(cp.distanceTo(CROWN),G.split>0.5?cams[1].position.distanceTo(CROWN):99),op=clamp((d-5.5)/4,0.18,1);leafMats.forEach(m=>{m.opacity=op;m.depthWrite=op>0.95;});const dh=Math.hypot(cp.x,cp.z+7),ob=cp.y<9?clamp((dh-2.4)/2.6,0.22,1):1;barkMats.forEach(m=>{m.opacity=ob;m.depthWrite=ob>0.95;});}});
  { const leave=W.onLeave;W.onLeave=()=>{if(DZ.on)dressClose();if(leave)leave();};}
