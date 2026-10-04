// ---- продолжение build5B2 (k5epic, часть 12): СТРАНИЦА 3 «В ТЕМНИЦЕ ТАМ ЦАРЕВНА ТУЖИТ» (стадия 6, мир 3, свет) ----
  // Облачная площадка Небесного царства. Жар-птица в золотой клетке, у клетки два замка — синий и золотой. Сирин даёт синий свет печали,
  // Алконост — золотой свет радости: коснись птицы — свет над головой (несущий медленнее). Замки открываются только РАЗОМ, каждый — своим
  // светом. Скованный Соловей свистит (как в 3-Б: за щитом Потапа — устоять), Кощей с тучи шарит фонарём: кого высветил — в того свист.
  // Свет можно передать другу: предмет рядом с ним.
  {const X=700;const A={theme:'heaven',face:Math.PI,clamp:{x:X,z:0,r:12.5},fallY:-14};AR[3]=A;
    A.spawn=i=>new V3(X-3+i*2,0,8.5);
    const CAGE=new V3(X,0,-1.5),SOL=new V3(X,0,-10.5),KZ=new V3(X+3,7.2,-12.5),BIRD=[new V3(X-9.5,0,3),new V3(X+9.5,0,3)],LCOL=[0x6a8aff,0xffc840];
    A.g=E.capture(()=>{ground(X-13,X+13,-13,13,0,M(0xf4f2ff),M(0xe0dcf4));for(let i=0;i<26;i++){const a=i/26*Math.PI*2;addMesh(new THREE.SphereGeometry(rand(2,3.6),9,7),new THREE.MeshLambertMaterial({color:0xffffff}),X+Math.cos(a)*14,rand(-1.6,0.4),Math.sin(a)*14);}
      for(const p of BIRD)addMesh(new THREE.CylinderGeometry(0.9,1.2,1.2,10),M(0xffffff),p.x,0.6,p.z);addMesh(new THREE.CylinderGeometry(1.2,1.5,1.6,10),M(0xffffff),SOL.x,0.8,SOL.z);
      addMesh(new THREE.CylinderGeometry(1.6,1.8,0.3,16),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),CAGE.x,0.15,CAGE.z);});
    const cage=new THREE.Group();cage.position.copy(CAGE);A.g.add(cage);const bars=[];for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const b=addMesh(new THREE.CylinderGeometry(0.05,0.05,3.2,5),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.5}),Math.cos(a)*1.4,1.9,Math.sin(a)*1.4,cage);bars.push(b);}
    addMesh(new THREE.SphereGeometry(1.45,14,8,0,Math.PI*2,0,Math.PI/2),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.5}),0,3.4,0,cage);K5L.noRay(cage);W.cyls.push({x:CAGE.x,z:CAGE.z,r:1.5,miny:-1,maxy:4,on:true});
    const zh=makeFirebird({});W.group.remove(zh.g);A.g.add(zh.g);zh.g.position.set(CAGE.x,1.4,CAGE.z);K5L.noRay(zh.g);
    const locks=[0,1].map(i=>{const g=K5L.lock();g.scale.setScalar(1.4);g.position.set(CAGE.x+(i?1.65:-1.65),1.3,CAGE.z+0.6);g.children.forEach(c=>{if(c.material&&c.material.emissive)c.material=c.material.clone();});
      const gl=k5Glow(LCOL[i],2.2);g.add(gl);A.g.add(g);return {g,i,open:false,t:-9};});
    const birds=[makeSirin('sirin'),makeSirin('alkonost')].map((b,i)=>{W.group.remove(b.g);A.g.add(b.g);b.g.position.set(BIRD[i].x,1.2,BIRD[i].z);b.g.rotation.y=Math.atan2(X-BIRD[i].x,0-BIRD[i].z);const gl=k5Glow(LCOL[i],3.4);gl.position.y=1.6;b.g.add(gl);K5L.noRay(b.g);return b;});
    const sol=makeSolovei();W.group.remove(sol.g);A.g.add(sol.g);sol.g.position.set(SOL.x,1.6,SOL.z);K5L.noRay(sol.g);const beakRing=new THREE.Mesh(new THREE.TorusGeometry(0.32,0.08,6,14),M(0x16101e,{emissive:0x4a1a7a,emissiveIntensity:0.6}));beakRing.position.set(SOL.x,3.2,SOL.z+0.9);A.g.add(beakRing);
    const cloud=new THREE.Group();A.g.add(cloud);for(let i=0;i<7;i++)addMesh(new THREE.SphereGeometry(rand(1.2,2),9,7),new THREE.MeshLambertMaterial({color:0x2a2438,emissive:0x1a0a2a}),KZ.x+rand(-2.4,2.4),KZ.y-1.6+rand(-0.4,0.3),KZ.z+rand(-1.2,1.2),cloud);K5L.noRay(cloud);
    const spot=new THREE.Mesh(new THREE.CircleGeometry(2.0,28),k5Add(0xfff0a0,{opacity:0.28}));spot.rotation.x=-Math.PI/2;spot.position.set(X,0.08,0);A.g.add(spot);
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(0.2,2.0,1,16,1,true),k5Add(0xfff0a0,{opacity:0.12}));A.g.add(beam);
    const S={};A.S=S;const orbs=new Map();
    function setLight(h,c){const o=orbs.get(h);if(o){k5Del(o);orbs.delete(h);}h.k5lt=c;if(c==null)return;const m=k5Glow(LCOL[c],1.4);k5Prop(m);orbs.set(h,m);}
    function lockHit(L,h){if(L.open)return;if(h.k5lt!==L.i&&!G.solo){floatText(L.g.position.clone().add(new V3(0,1,0)),L.i?'нужен золотой свет':'нужен синий свет','#d8d0ff');SFX.clink();return;}
      L.t=G.time;FX.sparkle(L.g.position.clone(),12,LCOL[L.i]);SFX.clink();const O=locks[1-L.i];
      if(G.solo||Math.abs(O.t-G.time)<1.5){locks.forEach(q=>{q.open=true;q.g.visible=false;});openCage();}else floatText(L.g.position.clone().add(new V3(0,1,0)),'Разом! И второй замок!','#ffe08a');}
    locks.forEach(L=>W.hittables.push({pos:L.g.position,r:1.0,alive:()=>E.cur===6&&ES.step==='fight'&&!L.open,onHit:h=>lockHit(L,h)}));
    function openCage(){S.ph='free';ES.prog=1;E.log('cage');k5s('reveal');bars.forEach((b,i)=>{const f=b.position.clone();anim(0.8,k=>{b.position.y=f.y+k*6;b.material.opacity=1-k;});});
      bark(zh,'zhar','Свобода! Спасибо, родные!',2,true);const f=zh.g.position.clone();anim(1.4,k=>{zh.g.position.lerpVectors(f,SOL.clone().add(new V3(0,3.4,1.2)),CE.inOutSine(k));zh.g.position.y+=Math.sin(k*Math.PI)*3;});
      later(1.5,()=>{k5Flash(beakRing.position.clone(),0xffc840,3,0.5);K5L.gold(beakRing.position.clone(),20);beakRing.visible=false;bark(sol,'solovei','Ох… Свободен! А ну, Кощей, — держись, свистну!',2.6,true);
        later(1.6,()=>{for(let i=0;i<5;i++)later(i*0.12,()=>k5Ring(new V3(SOL.x,3,SOL.z),0xfff4d0,0.5,10,0.7,0.06,new THREE.Euler(Math.PI/2,0,0)));k5s('gale');
          const c0=cloud.position.clone();anim(1.2,k=>{cloud.position.set(c0.x+k*30,c0.y+k*10,c0.z-k*20);});later(0.4,()=>{KS.g.visible=false;});later(2.0,()=>E.won(6));});});}
    function whistle(tgt){S.wh={t:0,tgt:tgt?tgt.pos.clone():null};bark(sol,'solovei','(свист против воли) Фью-у-у!',1.2,true);}
    A.start=q=>{S.ph='go';S.whT=4;S.spotA=0;S.seen=null;S.seenT=0;S.wh=null;locks.forEach(L=>{L.open=false;L.t=-9;L.g.visible=true;});bars.forEach(b=>{b.position.y=1.9;b.material.opacity=1;});
      zh.g.position.set(CAGE.x,1.4,CAGE.z);beakRing.visible=true;cloud.position.set(0,0,0);KS.g.visible=true;KS.g.position.copy(KZ);KS.g.rotation.y=0;for(const h of HEROES)setLight(h,null);ES.prog=0;ES.fight=false;E.cards(6,()=>{ES.fight=true;});};
    A.end=()=>{for(const h of HEROES)setLight(h,null);KS.g.visible=false;};
    A.item=pi=>{if(E.cur!==6||!ES.fight)return null;const h=active(pi),f=active(1-pi);if(G.solo||!f||hd(h.pos,f.pos)>2.2||h.k5lt==null)return null;return ()=>{const a=h.k5lt,b=f.k5lt;setLight(f,a);setLight(h,b==null?null:b);floatText(f.pos.clone().add(new V3(0,2,0)),'Держи свет!','#ffe08a');E.log('pass');};};
    A.tick=dt=>{if(!ES.fight)return;KS.g.position.y=KZ.y+Math.sin(G.time*1.2)*0.3;KS.g.position.x=KZ.x+cloud.position.x;cloud.rotation.y+=dt*0.1;zh.g.rotation.y+=dt*0.8;
      for(const [h,o] of orbs){o.position.copy(h.pos).add(new V3(0,h.d.height+0.9,0));o.material.opacity=0.7+0.3*Math.sin(G.time*8);}
      for(const h of k5Heroes()){for(let i=0;i<2;i++)if(hd(h.pos,BIRD[i])<1.9&&h.k5lt!==i){setLight(h,i);floatText(h.pos.clone().add(new V3(0,2.2,0)),i?'Свет радости!':'Свет печали!','#'+LCOL[i].toString(16));E.log('light'+i);}
        if(h.k5lt!=null){h.vel.x*=0.94;h.vel.z*=0.94;}}
      if(S.ph!=='go')return;
      // фонарь Кощея: пятно ходит по облаку, тянется к несущим свет; кого высветил 0,6 с — в того свист
      S.spotA+=dt*0.5;const car=k5Heroes().find(h=>h.k5lt!=null);let tx=X+Math.cos(S.spotA)*7,tz=Math.sin(S.spotA*1.3)*6;if(car){tx=lerp(tx,car.pos.x,0.4);tz=lerp(tz,car.pos.z,0.4);}
      spot.position.x+=(tx-spot.position.x)*Math.min(1,dt*1.5);spot.position.z+=(tz-spot.position.z)*Math.min(1,dt*1.5);const top=KS.g.position.clone().add(new V3(0,1.4,0)),bot=spot.position.clone();
      beam.position.copy(top).lerp(bot,0.5);beam.scale.y=top.distanceTo(bot);beam.quaternion.setFromUnitVectors(new V3(0,-1,0),bot.clone().sub(top).normalize());
      const lit=k5Heroes().find(h=>hd(h.pos,spot.position)<2.0);if(lit){S.seenT+=dt;if(S.seenT>0.6&&!S.wh){S.seenT=0;floatText(lit.pos.clone().add(new V3(0,2.4,0)),'Вижу!','#c8a8ff');S.whT=Math.min(S.whT,1.0);S.seen=lit;}}else S.seenT=0;
      S.whT-=dt;if(S.whT<=0&&!S.wh){S.whT=G.solo?8:6;whistle(S.seen);S.seen=null;}
      if(S.wh){S.wh.t+=dt;if(S.wh.t>1.1&&!S.wh.done){S.wh.done=true;for(let i=0;i<4;i++)later(i*0.1,()=>k5Ring(new V3(SOL.x,1.2,SOL.z),0xfff4d0,0.5,14,0.8,0.05));k5s('gale');
          const po=k5Heroes().find(h=>h.kind==='potap'&&h.guard);for(const h of k5Heroes()){const dx=h.pos.x-SOL.x,dz=h.pos.z-SOL.z,d=Math.hypot(dx,dz)||1;
            const hid=po&&po!==h&&hd(po.pos,h.pos)<1.8&&hd(po.pos,SOL)<d;if(hid){floatText(h.pos.clone().add(new V3(0,2,0)),'Устоял!','#9fd0ff');continue;}
            const f=(h.guard?3:8)*(h.kind==='potap'?0.5:1);h.vel.x+=dx/d*f;h.vel.z+=dz/d*f;h.vel.y=Math.max(h.vel.y,2);h.grounded=false;if(!h.guard&&h.kind!=='potap')k5Hurt(h,SOL);}}
        if(S.wh.t>1.6)S.wh=null;}};
    A.goal=pi=>S.ph==='free'?'Жар-птица свободна!':'Возьми свет у птицы: <b>Сирин — синий</b>, <b>Алконост — золотой</b>. Замки клетки — <b>разом</b>, каждый своим светом. Свист — за щит Потапа '+K(pi,'guard')+'.'+(G.solo?'':' Свет другу — '+K(pi,'item')+' рядом.');
    A.targets=pi=>{const h=active(pi);if(S.ph==='free')return [];if(h.k5lt==null)return birds.map(b=>b.g);return [locks[h.k5lt].g];};
  }
  E.pageStage(6,3,{call:'Третья страница — Небесное царство! Там Жар-птица в клетке тужит.'});
  E.CARDS[6]=[{p:[700,12,14],l:[700,1,-3],card:{tag:'Как победить',title:'Стадия 6 из 12 · В темнице там царевна тужит',icon:'lock',text:'Жар-птица в золотой клетке. У клетки два замка — <b>синий</b> и <b>золотой</b>. Они открываются только <b>разом</b>, и каждый — своим светом.'}},
    {p:[700,4,10],l:[700,1,3],card:{tag:'Вместе',title:'Свет печали и свет радости',icon:'spark',text:'Коснись <b>Сирин</b> — над тобой синий свет, <b>Алконоста</b> — золотой. С ним ходишь медленнее, и фонарь Кощея ищет именно тебя. Свет можно передать другу (предмет рядом с ним).'}},
    {p:[700,5,-4],l:[700,1.4,-10.5],card:{tag:'Берегись',title:'Соловей свистит против воли',icon:'wind',text:'На клюве Соловья чёрное кольцо. Свистнет — прячьтесь <b>за щитом Потапа</b>. Кого высветит фонарь — в того свистнет сразу.'}}];
