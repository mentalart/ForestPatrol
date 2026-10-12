/* ============================== 4-Б «ЗМЕЙ ГОРЫНЫЧ»: КОРКА ЧЕРЕЗ ЛАВОВЫЕ ТРЕЩИНЫ (docs/39, 4Б.2) ============================== */
// «Горыныч помнит мир»: после рыка (FIN.gor4.roared, фаза 2) у краёв арены, слева и справа, раскрываются огненные трещины-подковы,
// а за ними — каменные уступы с огненным цветком: дотронься — лепесток и искры. Ступить в трещину нельзя: жар отталкивает назад, к арене. Перепрыгнуть или
// перелететь можно. Живая вода Йоши (как в 4-2) кладёт на трещину корку-мостик: держится столько же, сколько корка в мире 4 (W4K),
// последние 3 с трескается со звуком. С уступа назад выходят свободно. Только удобство: бой от трещин не зависит.
// Вода Йоши уходит на трещину, только если рядом нет сытой головы (её гасить важнее). FIN.rift4b — состояние для ботов (tfin_w4rift).
const RF4={open:false,sides:[],told:false,log:[]};FIN.rift4b=RF4;
{const C={x:0,z:-6};
  // подкова справа (s=1) и слева (s=-1): вдоль края (x 7,6…9), сверху и снизу до обода; уступ — x 9…11
  const rectsOf=s=>[[7.6,9.0,-5.2,-0.8],[7.6,10.4,-0.8,0.6],[7.6,11.6,-6.6,-5.2]].map(([a,b,z0,z1])=>s>0?{x0:a,x1:b,z0,z1}:{x0:-b,x1:-a,z0,z1});
  const inR=(r,x,z)=>x>r.x0&&x<r.x1&&z>r.z0&&z<r.z1;
  const pocketOf=s=>(x,z)=>s*x>9.0&&z>-5.2&&z<-0.8;
  const crustT=()=>typeof W4K!=='undefined'?W4K.t('crust'):10;
  function build(s){const g=new THREE.Group();g.visible=false;W.group.add(g);const lavaM=MB(0xff6a18),rimM=M(0x2a1c18);
    const rs=rectsOf(s);for(const r of rs){const w=r.x1-r.x0,d=r.z1-r.z0;const p=new THREE.Mesh(new THREE.PlaneGeometry(w,d),lavaM);p.rotation.x=-Math.PI/2;p.position.set((r.x0+r.x1)/2,0.04,(r.z0+r.z1)/2);g.add(p);
      for(const e of[-1,1]){const b=addMesh(new THREE.BoxGeometry(w+0.1,0.12,0.12),rimM,(r.x0+r.x1)/2,0.06,(r.z0+r.z1)/2+e*(d/2),g);b.castShadow=false;}}
    // уступ: круглая плита с красным узором и лепестковый огонёк над ней
    const lx=s*10.2,lz=-3;const pl=addMesh(new THREE.CylinderGeometry(1.1,1.2,0.14,14),M(0x5a4a40),lx,0.07,lz,g);pl.castShadow=false;
    const ring=addMesh(new THREE.TorusGeometry(0.8,0.05,6,24),MB(0xc83c28),lx,0.16,lz,g);ring.rotation.x=Math.PI/2;
    const gf=new THREE.Group();gf.position.set(lx,0.9,lz);g.add(gf);for(let i=0;i<5;i++){const pt=addMesh(new THREE.SphereGeometry(0.16,8,6),MB(0xff6a8a),Math.cos(i*1.257)*0.18,0,Math.sin(i*1.257)*0.18,gf);pt.scale.set(1,0.5,1);}
    addMesh(new THREE.SphereGeometry(0.1,8,6),MB(0xffd23a),0,0.03,0,gf);
    // корка-мостик поперёк средней полосы подковы
    const bx=s*8.3,bz=-3;const cr=new THREE.Group();cr.position.set(bx,0.06,bz);cr.visible=false;W.group.add(cr);const crM=M(0x2a2226,{emissive:0xff4a00,emissiveIntensity:0.25});
    addMesh(new THREE.BoxGeometry(2.0,0.18,1.3),crM,0,0.09,0,cr);
    const S={s,g,rs,pocket:pocketOf(s),lx,lz,cr,crM,bx,bz,bridge:0,gift:false,gf,hits:0};
    W.waterTargets.push({pos:new V3(bx,0,bz),pri:-0.6,active:()=>RF4.open&&S.bridge<=0&&!W.enemies.some(e=>e.alive&&e.sat>0&&hd(e.pos,HERO.yosha.pos)<3.4),
      onWater:()=>{S.bridge=crustT();cr.visible=true;SFX.water();burst(new V3(bx,0.4,bz),0xe8f4ff,18,3);burst(new V3(bx,0.6,bz),0x9a9aa4,10,2.4,1.2);floatText(new V3(bx,1.2,bz),'Корка-мостик!','#cfe8ff');
        RF4.log.push('bridge'+s);if(!RF4.bridgeTold){RF4.bridgeTold=true;later(0.3,()=>bark(HERO.yosha,'yosha','Как на реке — корку сделаю!',2.4));}}});
    return S;}
  function open(){RF4.open=true;RF4.log.push('open');for(const S of RF4.sides){S.g.visible=true;burst(new V3(S.s*8.3,0.4,-3),0xff7a20,24,4);
}
    SFX.whoosh();floatText(new V3(0,2.4,-1),'У краёв — огненные трещины!','#ffb070');
    later(1.2,()=>{for(const pi of[0,1])tip(pi,pi?'Трещина у края: живая вода '+K(1,'skill')+' — корка-мостик, как на реке.':'За трещиной — лепесток. Йоша положит корку-мостик.',3.4);});}
  const _b=build4B;build4B=function(){_b.apply(this,arguments);Object.assign(RF4,{open:false,sides:[],told:false,bridgeTold:false,log:[]});RF4.sides=[build(1),build(-1)];
    prompt(1,'skill',()=>headOf(HERO.yosha),()=>HERO.yosha.active&&RF4.open&&RF4.sides.some(S=>S.bridge<=0&&hd(HERO.yosha.pos,{x:S.bx,z:S.bz})<2.6),'корка-мостик');
    W.updates.push(dt=>{const F=W.flags;if(!RF4.open){if(FIN.gor4&&FIN.gor4.roared&&F.phase>=2&&!G.cine)open();return;}
      for(const S of RF4.sides){
        if(S.bridge>0){S.bridge-=dt;const late=S.bridge<3;S.crM.emissiveIntensity=late&&Math.sin(G.time*14)>0?0.9:0.25;
          if(late&&!S.crk){S.crk=true;SFX.knock();burst(new V3(S.bx,0.3,S.bz),0x9a9aa4,6,1.6,0.8);}
          if(S.bridge<=0){S.cr.visible=false;S.crk=false;SFX.splash();burst(new V3(S.bx,0.3,S.bz),0xff6a20,12,3);}}
        if(!S.gift){S.gf.rotation.y+=dt*1.6;S.gf.position.y=0.9+0.12*Math.sin(G.time*3);const hh=[0,1].map(active).find(h=>Math.hypot(h.pos.x-S.lx,h.pos.z-S.lz)<1.0);
          if(hh){S.gift=true;S.gf.visible=false;RF4.log.push('gift'+S.s);for(const c of[0xff6a8a,COL.gold,COL.gold,COL.gold])spawnSpark(hh.pos.clone().add(new V3(0,0.8,0)),c);floatText(hh.pos.clone().add(new V3(0,hh.d.height+0.8,0)),'Лепесток с уступа!','#ff9ab8');}}
        for(const h of HEROES){const x=h.pos.x,z=h.pos.z,k=S.s>0?'_rfR':'_rfL',inS=S.rs.some(r=>inR(r,x,z));if(S.pocket(x,z))h[k]=true;else if(!inS)h[k]=false;
          if(!inS||h[k]||h.pos.y>0.35||G.cine)continue;                        // с уступа — свободно; в прыжке и в полёте — над трещиной
          if(S.bridge>0&&Math.abs(z-S.bz)<0.75&&inR(S.rs[0],x,z))continue;     // по корке-мостику
          const dx=x-C.x,dz=z-C.z,dd=Math.hypot(dx,dz)||1;h.pos.x-=dx/dd*0.25;h.pos.z-=dz/dd*0.25;h.vel.x=-dx/dd*4;h.vel.z=-dz/dd*4;h.vel.y=Math.max(h.vel.y,3);h.grounded=false;h.knockT=0.25;
          S.hits++;if(h.active&&G.time-(S.hT||-9)>1.2){S.hT=G.time;SFX.knock();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Горячо! Йоша — корку!','#ffb070');}}}});};
}
