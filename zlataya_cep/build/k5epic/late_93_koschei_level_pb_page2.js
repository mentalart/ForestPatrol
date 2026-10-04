// ---- продолжение build5B2 (k5epic, часть 11): СТРАНИЦА 2 «ТАМ О ЗАРЕ ПРИХЛЫНУТ ВОЛНЫ» (стадия 5, мир 2, гусли) ----
  // Площадь Китежа под водой. Водяной прикован к колокольне тремя чёрными цепями. Кощей — чёрный звонарь: бьёт в чёрные колокола по
  // порядку (каждый удар — кольцевая волна: перепрыгнуть или кувырок). Ответ — золотые колокола в том же порядке. Золотые колокола
  // лежат на дне, пока вода низкая: гусли у раковины (предмет) поднимают воду на 9 с — колокола всплывают. Один играет, второй звонит.
  // Верная перекличка рвёт цепь; три цепи — Водяной свободен.
  {const X=500;const A={theme:'kitezh',face:Math.PI,clamp:{x:X,z:0,r:13.5},fallY:-12};AR[2]=A;
    A.spawn=i=>new V3(X-3+i*2,0,9);
    const BC=[0xff6a6a,0x6aff9a,0x6aa8ff,0xffd76a],BN=[523,659,784,1047],BP=[[-7,-5],[7,-5],[-7,4],[7,4]].map(([x,z])=>new V3(X+x,0,z));
    const SHELL=new V3(X,0,8.5),VOD=new V3(X,0,-3),KZ=new V3(X,3.6,-9.5);
    A.g=E.capture(()=>{ground(X-15,X+15,-15,15,0,M(0x6a8a7a));for(let i=0;i<10;i++){const a=i/10*Math.PI*2;addMesh(new THREE.BoxGeometry(2.6,rand(6,10),2.6),M(0xe8e0d0),X+Math.cos(a)*16,3,Math.sin(a)*16);
        addMesh(new THREE.SphereGeometry(1.4,10,8,0,Math.PI*2,0,Math.PI/2),M(0xe8b830,{emissive:0x604010,emissiveIntensity:0.3}),X+Math.cos(a)*16,8,Math.sin(a)*16);}
      for(const p of BP){addMesh(new THREE.CylinderGeometry(1.1,1.3,0.5,12),M(0xc8c0b0),p.x,0.25,p.z);}addMesh(new THREE.CylinderGeometry(1.6,2,3.6,12),M(0xd8d0c0),KZ.x,1.8,KZ.z);
      addMesh(new THREE.CylinderGeometry(1.5,1.7,0.6,12),M(0xc8c0b0),VOD.x,0.3,VOD.z);addMesh(new THREE.CylinderGeometry(0.9,1.0,0.12,16),MB(0x7ad8ff,{transparent:true,opacity:0.8}),SHELL.x,0.07,SHELL.z);});
    const watr=new THREE.Mesh(new THREE.PlaneGeometry(30,30),k5eMB(0x40a8c0,{opacity:0.0}));watr.rotation.x=-Math.PI/2;watr.position.set(X,0.05,0);A.g.add(watr);
    const gold=BP.map((p,i)=>{const g=new THREE.Group();g.position.set(p.x,-1.4,p.z);A.g.add(g);addMesh(new THREE.CylinderGeometry(0.35,0.75,1,12,1,true),M(BC[i],{emissive:BC[i],emissiveIntensity:0.35,side:THREE.DoubleSide}),0,0.6,0,g);
      addMesh(new THREE.SphereGeometry(0.16,8,6),M(0x8a6a20),0,0.15,0,g);const gl=k5Glow(BC[i],2.4);gl.position.y=0.8;g.add(gl);K5L.noRay(g);return {g,i,p,up:0};});
    const black=[0,1,2,3].map(i=>{const g=new THREE.Group();A.g.add(g);addMesh(new THREE.CylinderGeometry(0.25,0.5,0.7,10,1,true),M(0x1a1420,{emissive:0x2a0a3a,side:THREE.DoubleSide}),0,0,0,g);const gl=k5Glow(BC[i],1.6);gl.material.opacity=0;g.add(gl);g.userData.gl=gl;
      const a=-Math.PI*0.75+i*Math.PI/6;g.position.set(KZ.x+Math.cos(a)*1.8,KZ.y+2.2,KZ.z+Math.sin(a)*0.8);K5L.noRay(g);return g;});
    const vod=FIN.k2v&&FIN.k2v.rig?(()=>{const g=new THREE.Group();A.g.add(g);const R0=FIN.k2v.rig(g,{});return {g,R:R0};})():(()=>{const m=makeStarik();W.group.remove(m.g);A.g.add(m.g);return m;})();
    vod.g.position.set(VOD.x,0.6,VOD.z);vod.g.scale.setScalar(0.8);K5L.noRay(vod.g);
    const chains=[0,1,2].map(i=>{const a=Math.PI*0.25+i*Math.PI*0.5,to=new V3(VOD.x+Math.cos(a)*4,0,VOD.z+Math.sin(a)*3);const g=chainLine(new V3(VOD.x,2.2,VOD.z),to,0x2a1a34);W.group.remove(g);A.g.add(g);return g;});
    const sadko=makeSadko();W.group.remove(sadko.g);A.g.add(sadko.g);sadko.g.position.set(SHELL.x+2.2,0,SHELL.z+0.8);sadko.g.rotation.y=Math.PI*1.2;sadko.g.visible=false;K5L.noRay(sadko.g);
    const S={};A.S=S;
    // золотые колокола: удар рядом или рогатка — только когда всплыли
    gold.forEach(B=>{W.hittables.push({pos:B.p.clone().setY(1),r:1.0,alive:()=>E.cur===5&&ES.step==='fight'&&B.up>0.7,onHit:()=>ring(B.i)});W.marks.push({pos:B.p.clone().setY(1.2),active:()=>E.cur===5&&ES.step==='fight'&&B.up>0.7,onHit:()=>ring(B.i)});});
    function seqNew(){const L=[3,4,4][S.chain]||4;S.seq=[];for(let i=0;i<L;i++){let b;do{b=Math.floor(rand(0,4));}while(S.seq.length&&S.seq[S.seq.length-1]===b);S.seq.push(b);}S.pos=0;S.ph='show';S.t=0;S.si=0;S.ansT=G.solo?20:15;}
    function bellSound(i,v){if(AUD.ready())AUD.bell(BN[i],{v:v||0.08,d:1.6,wet:0.6});}
    function wave(from,dark){const c=from.clone();c.y=0;const S0={r:1.4,hit:new Set()};const m=new THREE.Mesh(new THREE.RingGeometry(0.85,1,48),k5Add(dark?0x8a50ff:0x7ad8ff,{opacity:0.85}));m.rotation.x=-Math.PI/2;m.position.set(c.x,0.12,c.z);A.g.add(m);
      k5fx(2.6,(k,dt)=>{S0.r+=dt*6.5;m.scale.setScalar(S0.r);m.material.opacity=0.85*(1-k);for(const h of k5Heroes()){if(S0.hit.has(h))continue;const d=hd(h.pos,c);if(Math.abs(d-S0.r)<0.55&&h.pos.y<0.55&&h.rollT<=0){S0.hit.add(h);k5Hurt(h,c);}}},()=>A.g.remove(m));}
    function ring(i){if(S.ph!=='answer')return;const B=gold[i];bellSound(i,0.1);FX.sparkle(B.p.clone().add(new V3(0,1.4,0)),12,BC[i]);k5Ring(B.p.clone().setY(0.1),BC[i],0.4,2.4,0.5,0.12);
      if(S.seq[S.pos]===i){S.pos++;floatText(B.p.clone().add(new V3(0,2.2,0)),S.pos+' / '+S.seq.length,'#ffe08a');if(S.pos>=S.seq.length)chainBreak();}
      else{floatText(B.p.clone().add(new V3(0,2.2,0)),'Не тот!','#ff9ab8');bark(KS,'koschei','Не в лад! Снова слушай!',1.4,true);wave(KZ,true);S.ph='wait';S.t=0;E.log('wrong');}}
    function chainBreak(){const c=chains[S.chain];K5L.gold(VOD.clone().add(new V3(0,2,0)),18);k5s('keyBreak');c.visible=false;S.chain++;E.log('chain'+S.chain);ES.prog=S.chain/3;
      if(S.chain>=3){S.ph='free';freeVod();return;}bark(vod,'vod','Ох! Одна цепь долой! Звоните, ребятки, звоните!',2.2,true);S.ph='wait';S.t=0;}
    function freeVod(){bark(vod,'vod','Ну, Кощеюшка, — теперь моя волна!',2.4,true);const big=new THREE.Mesh(new THREE.BoxGeometry(30,6,1.4),k5eMB(0x7ad8ff,{opacity:0.7}));big.position.set(X,3,14);A.g.add(big);
      later(1.0,()=>{k5s('gale');k5fx(1.6,k=>{big.position.z=14-k*26;big.scale.y=0.6+Math.sin(k*Math.PI)*0.6;},()=>A.g.remove(big));later(1.2,()=>{K5L.ink(KS.g.position.clone().add(new V3(0,2,0)),30);KS.g.visible=false;bark(KS,'koschei','Мокро!.. Ну, погодите!',1.6,true);});
        later(2.2,()=>E.won(5));});}
    A.start=q=>{S.chain=0;S.tide=0;S.waveT=5;chains.forEach(c=>{c.visible=true;});gold.forEach(B=>{B.up=0;B.g.position.y=-1.4;});KS.g.visible=true;KS.g.position.copy(KZ);KS.g.rotation.y=0;dome.visible=false;sadko.g.visible=G.solo;
      ES.fight=false;ES.prog=0;S.ph='wait';S.t=0;E.cards(5,()=>{ES.fight=true;});};
    A.end=()=>{KS.g.visible=false;};
    A.item=pi=>{if(E.cur!==5||!ES.fight)return null;const h=active(pi);if(hd(h.pos,SHELL)>2.2)return null;return ()=>{S.tide=G.solo?16:9;if(typeof playGusli==='function'&&AUD.ready())AUD.bell(392,{v:0.05,d:1.2,wet:0.6});FX.sparkle(SHELL.clone().add(new V3(0,1,0)),14,0x7ad8ff);floatText(h.pos.clone().add(new V3(0,2,0)),'Прилив!','#9fe8ff');E.log('tide');};};
    A.tick=dt=>{if(!ES.fight)return;S.t+=dt;KS.g.rotation.y=Math.sin(G.time*0.7)*0.4;
      // вода: прилив держится 9 с (в одиночку Садко играет сам)
      if(G.solo&&S.ph==='answer'&&S.tide<2)S.tide=16;S.tide=Math.max(0,S.tide-dt);const hi=S.tide>0;watr.material.opacity+=((hi?0.32:0.0)-watr.material.opacity)*Math.min(1,dt*3);watr.position.y=hi?1.0:0.05;
      for(const B of gold){B.up+=((hi?1:0)-B.up)*Math.min(1,dt*2.5);B.g.position.y=-1.4+B.up*2.2;B.g.rotation.y+=dt*0.6;}
      if(S.ph==='wait'&&S.t>2){seqNew();bark(KS,'koschei','Слушайте — да повторяйте, коли сумеете!',1.6,true);}
      else if(S.ph==='show'){if(S.t>0.9*S.si+0.6&&S.si<S.seq.length){const i=S.seq[S.si];const b=black[i];b.userData.gl.material.opacity=1;later(0.5,()=>{b.userData.gl.material.opacity=0;});bellSound(i,0.07);anim(0.5,k=>{b.rotation.z=Math.sin(k*Math.PI*3)*0.5*(1-k);});
          floatText(b.position.clone().add(new V3(0,1,0)),String(S.si+1),'#'+BC[i].toString(16).padStart(6,'0'));wave(KZ,true);S.si++;}
        if(S.si>=S.seq.length&&S.t>0.9*S.seq.length+1.2){S.ph='answer';S.t=0;floatText(SHELL.clone().add(new V3(0,2.4,0)),'Ваш черёд! Гусли — прилив!','#ffe08a');}}
      else if(S.ph==='answer'){S.waveT-=dt;if(S.waveT<=0){S.waveT=G.solo?5.5:4;wave(KZ,true);}if(S.t>S.ansT){floatText(KZ.clone().add(new V3(0,3,0)),'Долго! Ещё раз!','#c8a8ff');S.ph='wait';S.t=0;}}
      if(vod.R&&FIN.k2v.anim)try{FIN.k2v.anim(vod.R,dt);}catch(e){}};
    A.goal=pi=>S.ph==='show'?'Слушайте Кощеевы колокола — <b>какой за каким</b>. Волна — прыжок или кувырок.':S.ph==='answer'?
      ('Повторите золотыми колоколами: '+S.seq.map((b,j)=>'<b style="color:#'+BC[b].toString(16).padStart(6,'0')+'">'+(j<S.pos?'✓':'●')+'</b>').join(' ')+'. '+(G.solo?'Садко держит воду.':'Колокола на дне? <b>Гусли</b> '+K(pi,'item')+' у раковины — прилив.')):'Цепи Водяного: '+S.chain+' / 3';
    A.targets=pi=>S.ph==='answer'?(S.tide>0?[gold[S.seq[S.pos]]&&gold[S.seq[S.pos]].g].filter(Boolean):[]):[];
  }
  E.pageStage(5,2,{call:'Вторая страница — Подводный Китеж! Колокола молчат, Водяной в цепях.'});
  E.CARDS[5]=[{p:[500,12,16],l:[500,1,-3],card:{tag:'Как победить',title:'Стадия 5 из 12 · Там о заре прихлынут волны',icon:'wave',text:'Кощей бьёт в чёрные колокола <b>по порядку</b>. Каждый удар — кольцевая волна: <b>перепрыгни</b> или кувырок.'}},
    {p:[500,5,14],l:[500,0.5,8],card:{tag:'Вместе',title:'Гусли и золотые колокола',icon:'spark',text:'Золотые колокола лежат на дне. <b>Гусли</b> (предмет) у раковины поднимают воду — колокола всплывают. Один играет, второй звонит <b>в том же порядке</b>. Три верные переклички — три цепи Водяного долой.'}}];
