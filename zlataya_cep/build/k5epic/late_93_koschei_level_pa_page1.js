// ---- продолжение build5B2 (k5epic, часть 10): СТРАНИЦА 1 «ИЗБУШКА ТАМ НА КУРЬИХ НОЖКАХ» (стадия 4, мир 1, клубок) ----
  // Избушка без окон и дверей бегает по поляне Дремучего леса; Яга заперта внутри, Кощей погоняет с крыши. Избушка разбегается по
  // прямой (красная полоса) и топает кольцами. Из чащи — «следы невиданных зверей»: светящиеся отпечатки, по ним бежит чернильный волк.
  // Вместе: клубок (предмет) у ноги — нить на ногу; ногу держат две нити от разных игроков; обе ноги — избушка села. Потом двое на
  // золотых кругах с двух сторон — удар разом: «Избушка, повернись!» — дверь, Яга на свободе.
  {const X=300;const A={theme:'forest',face:Math.PI,clamp:{x:X,z:0,r:14},fallY:-12};AR[1]=A;
    A.spawn=i=>new V3(X-3+i*2,0,9);
    A.g=E.capture(()=>{ground(X-16,X+16,-16,16,0,M(0x3a5a34));for(let i=0;i<34;i++){const a=i/34*Math.PI*2,r=rand(15,19);const g=new THREE.Group();g.position.set(X+Math.cos(a)*r,0,Math.sin(a)*r);W.group.add(g);
        addMesh(new THREE.CylinderGeometry(0.3,0.4,2,6),M(0x3a2a1a),0,1,0,g);for(let j=0;j<3;j++)addMesh(new THREE.ConeGeometry(2.2-j*0.5,3,7),M(0x1e3a28),0,2.6+j*1.6,0,g);}
      for(let i=0;i<40;i++)addMesh(new THREE.SphereGeometry(0.05,6,4),MB(0xd8ff8a),X+rand(-14,14),rand(0.5,4),rand(-14,14));});
    const hut=makeHut();W.group.remove(hut.g);A.g.add(hut.g);hut.g.scale.setScalar(1.25);K5L.noRay(hut.g);const roofY=(new THREE.Box3().setFromObject(hut.g)).max.y+0.1;
    const hutCyl={x:X,z:-4,r:1.9,miny:-1,maxy:roofY-0.4,on:false};W.cyls.push(hutCyl);
    const tieM=new THREE.TorusGeometry(0.42,0.06,5,16),tieMat=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6});
    const legW=i=>{const p=new V3();(hut.legs&&hut.legs[i]?hut.legs[i]:hut.g).getWorldPosition(p);p.y=0;return p;};
    const circles=[0,1].map(i=>{const m=new THREE.Mesh(new THREE.RingGeometry(0.9,1.2,32),k5Add(0xffd76a,{opacity:0.9}));m.rotation.x=-Math.PI/2;m.visible=false;A.g.add(m);return m;});
    const S={};A.S=S;
    function reset(){S.st='walk';S.t=0;S.cd=3;S.tgt=new V3(X,0,-4);S.ties=[[],[]];S.tied=[false,false];S.sitT=0;S.turn=[-9,-9];S.done=false;S.beasts=[];S.beastT=5;S.letT=4;
      hut.g.position.set(X,0,-4);hut.g.rotation.y=0;if(hut.door)hut.door.visible=false;if(hut.house)hut.house.position.y=hut.house.userData.y0==null?(hut.house.userData.y0=hut.house.position.y):hut.house.userData.y0;
      (S.tieMs||[]).forEach(k5Del);S.tieMs=[];circles.forEach(c=>{c.visible=false;});hutCyl.on=true;}
    A.start=q=>{reset();KS.g.visible=true;dome.visible=false;KS.g.rotation.y=Math.PI;ES.fight=false;ES.prog=0;
      E.cards(4,()=>{ES.fight=true;if(!q)later(0.4,()=>bark(KS,'koschei','Ну-ка, избушка, — побегай! Пусть ловят!',2.4,true));});};
    A.end=()=>{hutCyl.on=false;KS.g.visible=false;for(const B of S.beasts||[]){B.ms.forEach(k5Del);if(B.w)k5Del(B.w);}S.beasts=[];if(S.line)k5Del(S.line);};
    const hutP=()=>hut.g.position;
    function charge(h){const p=hutP().clone(),d=new V3(h.pos.x-p.x,0,h.pos.z-p.z).normalize(),L=14;S.st='aim';S.t=0;S.dir=d;S.from=p;
      const m=new THREE.Mesh(new THREE.PlaneGeometry(2.4,L),k5Add(0xff4a3a,{opacity:0.3}));m.rotation.x=-Math.PI/2;m.rotation.z=-Math.atan2(d.x,d.z);m.position.set(p.x+d.x*L/2,0.07,p.z+d.z*L/2);A.g.add(m);S.line=m;
      k5s('pSoft');bark(KS,'koschei','Н-но, пошла!',1.2,true);}
    function stomp(){S.st='crouch';S.t=0;}
    function beast(h){const f=new V3(X+(h.pos.x>X?-15:15),0,h.pos.z+rand(-4,4)),to=h.pos.clone();to.y=0;const d=to.clone().sub(f),L=d.length();d.normalize();const ms=[];
      for(let i=0;i<7;i++){const m=new THREE.Mesh(new THREE.CircleGeometry(0.28,10),k5Add(0xb8ff8a,{opacity:0}));m.rotation.x=-Math.PI/2;const q=f.clone().addScaledVector(d,(i+1)*L/8);m.position.set(q.x+(i%2?0.25:-0.25),0.06,q.z);A.g.add(m);ms.push(m);
        later(i*0.16,()=>{m.material.opacity=0.9;k5s('step');});}
      S.beasts.push({ms,f,d,L,t:0,w:null});}
    A.tick=dt=>{if(!ES.fight)return;S.t+=dt;const P=hutP();hutCyl.x=P.x;hutCyl.z=P.z;
      KS.g.position.set(P.x,roofY,P.z);if(!S.done)KS.g.rotation.y=hut.g.rotation.y+Math.PI;
      // ноги идут
      const moving=S.st==='walk'||S.st==='dash';if(hut.legs)hut.legs.forEach((l,i)=>{l.rotation.x=moving?Math.sin(S.t*(S.st==='dash'?16:8)+i*Math.PI)*0.5:0;});
      ES.prog=(S.tied[0]+S.tied[1])/3+(S.done?1/3:0);
      if(S.st==='walk'){S.cd-=dt;const d=S.tgt.clone().sub(P);d.y=0;if(d.length()<1)S.tgt.set(X+rand(-9,9),0,rand(-9,7));else{d.normalize();P.addScaledVector(d,2.2*dt);hut.g.rotation.y=angDamp(hut.g.rotation.y,Math.atan2(d.x,d.z),4,dt);}
        if(S.cd<=0&&!K5.listen){S.cd=G.solo?5:3.8;const h=nearH(P);if(h){if(Math.random()<0.6)charge(h);else stomp();}}}
      else if(S.st==='aim'){FX.dust(P.clone(),1,0x6a5a3a);if(S.t>(G.solo?1.6:1.3)){S.st='dash';S.t=0;S.hit=new Set();}}
      else if(S.st==='dash'){P.addScaledVector(S.dir,12*dt);hut.g.rotation.y=Math.atan2(S.dir.x,S.dir.z);if(S.line)S.line.material.opacity=Math.max(0,0.3-S.t);
        for(const h of k5Heroes())if(!S.hit.has(h)&&hd(h.pos,P)<2.0&&h.pos.y<2){S.hit.add(h);k5Hurt(h,P);}
        if(S.t>1.15||Math.abs(P.x-X)>13||Math.abs(P.z)>13){P.x=clamp(P.x,X-13,X+13);P.z=clamp(P.z,-13,13);S.st='walk';S.cd=G.solo?3:2;if(S.line){k5Del(S.line);S.line=null;}shakeAll(0.04,0.2);}}
      else if(S.st==='crouch'){if(hut.house)hut.house.position.y=hut.house.userData.y0-Math.min(1,S.t/0.6)*0.6;if(S.t>0.7){S.st='air';S.t=0;}}
      else if(S.st==='air'){const k=S.t/0.7;hut.g.position.y=Math.sin(Math.min(1,k)*Math.PI)*3;if(hut.house)hut.house.position.y=hut.house.userData.y0;if(k>=1){hut.g.position.y=0;S.st='walk';S.cd=G.solo?3.5:2.5;k5s('stomp');shakeAll(0.07,0.35);
          FX.dust(P.clone(),18,0x6a5a3a,2);const c=P.clone();for(let i=0;i<2;i++)later(i*0.35,()=>{k5Ring(new V3(c.x,0.1,c.z),0xff7a5a,1,7,0.6,0.08);for(const h of k5Heroes()){const r=hd(h.pos,c);if(r>1.5+i*2.5&&r<3.6+i*2.5&&h.pos.y<0.6)k5Hurt(h,c);}});}}
      else if(S.st==='sit'){S.sitT-=dt;if(hut.house)hut.house.position.y=hut.house.userData.y0-1.1;
        // «Избушка, повернись!»: двое на кругах — удар разом
        const fw=new V3(Math.sin(hut.g.rotation.y),0,Math.cos(hut.g.rotation.y));const cp=[P.clone().addScaledVector(fw,3.2),P.clone().addScaledVector(fw,-3.2)];circles.forEach((c,i)=>{c.visible=true;c.position.set(cp[i].x,0.07,cp[i].z);});
        if(S.sitT<=0){S.st='walk';S.tied=[false,false];S.ties=[[],[]];S.tieMs.forEach(k5Del);S.tieMs=[];circles.forEach(c=>{c.visible=false;});floatText(P.clone().add(new V3(0,roofY+1,0)),'Распуталась!','#c8a8ff');}}
      else if(S.st==='turn'){if(S.t>1.4){S.st='open';S.t=0;}}
      // Кощей с крыши: буквы
      if(S.st!=='sit'&&S.st!=='turn'&&S.st!=='open'&&!K5.listen){S.letT-=dt;if(S.letT<=0){S.letT=G.solo?8:6;const h=nearH(P);if(h)E.letterAt(Math.random()<0.5?'Л':'О',h);}}
      // следы невиданных зверей
      if(!S.done){S.beastT-=dt;if(S.beastT<=0){S.beastT=G.solo?9:6.5;const hs=k5Heroes();if(hs.length)beast(hs[Math.floor(rand(0,hs.length))]);}}
      for(const B of S.beasts.slice()){B.t+=dt;if(B.t>1.4&&!B.w){B.w=new THREE.Mesh(new THREE.DodecahedronGeometry(0.7,0),K5L.INKM);B.w.scale.set(1,0.7,1.6);B.w.position.copy(B.f).setY(0.6);A.g.add(B.w);B.hit=new Set();k5s('whoosh');}
        if(B.w){B.w.position.addScaledVector(B.d,16*dt);B.w.rotation.y=Math.atan2(B.d.x,B.d.z);for(const h of k5Heroes())if(!B.hit.has(h)&&hd(h.pos,B.w.position)<1.2&&h.pos.y<1.5){B.hit.add(h);k5Hurt(h,B.w.position);}}
        if(B.t>3.4){B.ms.forEach(k5Del);if(B.w){K5L.ink(B.w.position.clone(),8);k5Del(B.w);}S.beasts.splice(S.beasts.indexOf(B),1);}else B.ms.forEach(m=>{m.material.opacity=Math.max(0,m.material.opacity-dt*0.25);});}
      // повернулась: дверь, Яга на ступе сбивает Кощея с крыши
      if(S.st==='open'&&!S.done){S.done=true;ES.prog=1;if(hut.door)hut.door.visible=true;E.log('hutOpen');const st=makeStupa();W.group.remove(st.g);A.g.add(st.g);st.g.position.copy(P).add(new V3(0,1.2,0));
        bark(st,'yaga','Ох, спасибо, голубчики! А ну, Кощеюшка, — слезай с моей крыши!',3,true);
        anim(1.0,k=>{st.g.position.set(P.x+Math.sin(k*Math.PI)*2,1.2+k*(roofY-0.6),P.z+Math.cos(k*Math.PI)*2);});
        later(1.0,()=>{K5L.ink(KS.g.position.clone().add(new V3(0,2,0)),26);k5s('shatter');const f=KS.g.position.clone();anim(0.7,k=>{KS.g.position.set(f.x+k*4,f.y+Math.sin(k*Math.PI)*2-k*f.y,f.z-k*3);});
          later(0.8,()=>{KS.g.visible=false;bark(KS,'koschei','Ничего! Ещё не вечер!',1.6,true);E.won(4);});});}};
    // клубок: нить на ногу (предмет у ноги)
    A.item=pi=>{if(E.cur!==4||!ES.fight||S.st==='sit'||S.done)return null;const h=active(pi);let li=-1;for(let i=0;i<2;i++)if(hd(h.pos,legW(i))<2.6)li=i;if(li<0)return null;
      return ()=>{const ties=S.ties[li];ties.push({pi,t:G.time});while(ties.length&&G.time-ties[0].t>8)ties.shift();SFX.thwip&&SFX.thwip();
        const m=new THREE.Mesh(tieM,tieMat);m.rotation.x=Math.PI/2;m.position.set(0,0.6+ties.length*0.25,0);(hut.legs[li]||hut.g).add(m);S.tieMs.push(m);
        const ok=G.solo?ties.length>=2:new Set(ties.map(q=>q.pi)).size>=2;floatText(legW(li).add(new V3(0,2.4,0)),ok?'Нога спутана!':'нить! теперь — второй','#ffe08a');
        if(ok&&!S.tied[li]){S.tied[li]=true;E.log('tie'+li);if(S.tied[0]&&S.tied[1]){S.st='sit';S.sitT=G.solo?16:13;if(S.line){k5Del(S.line);S.line=null;}hut.g.position.y=0;k5s('stomp');bark(KS,'koschei','Стой! Куда?! Ноги… спутаны!',1.8,true);
            later(0.6,()=>say('yaga','Избушка, избушка! Повернись к лесу задом, ко мне — передом!<br>Вставайте с двух сторон — и разом!',4,true));}}};};
    // удар на круге: «повернись!»
    A.attack=h=>{if(E.cur!==4||S.st!=='sit')return;const i=circles.findIndex(c=>c.visible&&hd(h.pos,c.position)<1.3);if(i<0)return;S.turn[i]=G.time;FX.sparkle(circles[i].position.clone().add(new V3(0,0.5,0)),8,0xffd76a);
      const both=G.solo?true:Math.abs(S.turn[0]-S.turn[1])<1.0;if(both){S.st='turn';S.t=0;circles.forEach(c=>{c.visible=false;});const r0=hut.g.rotation.y;anim(1.3,k=>{hut.g.rotation.y=r0+Math.PI*CE.inOutCubic(k);});k5s('reveal');E.log('turn');}
      else floatText(h.pos.clone().add(new V3(0,2,0)),'Разом! Второй — тоже!','#ffe08a');};
    A.goal=pi=>S.done?'Яга на свободе!':S.st==='sit'?'Избушка села! Двое — на <b>золотые круги</b> с двух сторон, удар '+K(pi,'attack')+' разом: «Повернись!»':
      'Спутайте избушке ноги: <b>клубок</b> '+K(pi,'item')+' у ноги'+(G.solo?' — дважды':' — нить от каждого')+'. Полоса — разбег, уходи; следы на земле — по ним бежит зверь.';
    A.targets=pi=>S.st==='sit'?circles.filter(c=>c.visible):[hut.g];
  }
  E.pageStage(4,1,{call:'Первая страница — Дремучий лес! Там Яга заперта.<br>Встаньте вдвоём на порог — и в сказку!'});
  E.CARDS[4]=[{p:[300,12,16],l:[300,1,-2],card:{tag:'Как победить',title:'Стадия 4 из 12 · Избушка там на курьих ножках',icon:'lock',text:'Яга заперта в избушке без окон, без дверей. Кощей погоняет её с крыши. Красная полоса — избушка разбежится: уходи. Следы на земле — по ним пробежит чернильный зверь.'}},
    {p:[296,4,4],l:[300,1,-4],card:{tag:'Вместе',title:'Клубок — на ноги',icon:'spark',text:'Встань у ноги избушки и брось <b>клубок</b> (предмет). Ногу держат <b>две нити — от каждого из вас</b>. Обе ноги спутаны — избушка сядет.'}},
    {p:[304,4,4],l:[300,1,-4],card:{tag:'Вместе',title:'«Повернись!»',icon:'candle',text:'Встаньте на <b>золотые круги</b> с двух сторон и ударьте <b>разом</b> — избушка повернётся, откроется дверь.'}}];
