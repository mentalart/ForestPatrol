// ---- продолжение late_99e_k21.js (внутри build21, часть 3 из 4): ролики и сцены уровня — части склеиваются сборкой по имени файла ----
  function giftScene(){F.stage='gift';const T=HERO,pe=T.pelageya;
    HEROES.forEach((h,i)=>{placeOnGround(h,-4.2+(i%2)*1.6,-12.6-Math.floor(i/2)*1.4,0);h.face=Math.atan2(-6.5-h.pos.x,-14.8-h.pos.z);});
    const gifts=[];
    play({dur:20.6,fov:48,shots:[shot(0,[-4.6,1.8,-12.1],[-6.4,1.3,-14.8]),shot(5.4,[-1.2,2.8,-9.6],[-5.2,1.1,-13.6]),shot(9,[-3.8,1.6,-12.2],[-6.4,1.7,-14.8]),shot(17.4,[-1.8,1.5,-10.8],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,2.2,null,'<i>Срастается струна — звенит.</i>',true],[2.3,3.0,'sadko','Ох, запела! Спасибо, малые, спасибо!'],[5.6,3.4,'sadko','Играйте на ходу. Вода любит, когда с нею речь ведут.'],
        [9.2,2.4,'sadko','Лишь в Китеже не молчите — говорю.'],[11.7,2.4,'sadko','Только в Китеже — не молчите.'],[14.2,3.2,'sadko','Только в Китеже не молчите: кто молчит — того вода унесёт.'],[17.6,2.8,null,'<i>Пелагея клюв в перья прячет —</i><br><i>Вслух говорить ей трудно, иначе.</i>',true]],
      events:[{t:0,fn:()=>{sadko.drop.visible=false;SFX.grow();burst(new V3(-6.1,1.4,-14.4),0x9fe6ff,16,3);}},
        {t:1.4,fn:()=>{[67,71,74,79,78,74,71,74].forEach((m,i)=>later(i*0.22,()=>{gusli(m,0,0.18);sadko.arms.forEach((a,k)=>{a.rotation.x=(i+k)%2?0.3:-0.2;});}));}},
        {t:6.0,fn:()=>{HEROES.forEach((h,i)=>{const g=new THREE.Group();gusliMesh(g,M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8}),0.9);W.group.add(g);gifts.push(g);const a=new V3(-6.2,1.6,-14.4),to=h.pos.clone().add(new V3(0,h.d.height*0.6,0));
          anim(1.0+i*0.15,k=>{g.position.lerpVectors(a,to,k);g.position.y+=Math.sin(k*Math.PI)*1.6;g.rotation.y+=0.2;if(k>=1){W.group.remove(g);burst(to,COL.gold,10,2);SFX.knot();}});});}},
        {t:17.6,fn:()=>{pe.parts.beak.visible=false;anim(0.6,k=>{pe.body.scale.set(1+0.12*k,1-0.12*k,1+0.12*k);});}}],
      tick:(t)=>{sadko.head.rotation.x=t<9?0.1:0.2;sadko.body.rotation.z=Math.sin(t*2)*0.03;},
      end:()=>{pe.parts.beak.visible=true;pe.body.scale.set(1,1,1);W.abil.gusli=true;F.stage='gusli';later(0.3,tuneScene);}});}
  // напев Садко: четыре звука — их Китеж вспомнит в 2-5, когда колокола будут подымать ярусы
  function tuneScene(){const T=HERO,notes=[];
    play({dur:8.2,fov:46,shots:[shot(0,[-3.6,1.7,-11.4],[-6.4,1.4,-14.8]),shot(4.4,[-1.4,2.6,-9.8],[-5,1.6,-13.4])],
      says:[[0.3,3.6,'sadko','А вот вам напев мой — четыре звука. Запомните: дзинь, дилинь, дон, дон.'],[4.1,3.6,'sadko','Китеж его помнит. Как будить станете — пригодится.']],
      events:[{t:0.6,fn:()=>{FIN.SADKO_TUNE.forEach((m,i)=>later(i*0.55,()=>{gusli(m,0,0.2);sadko.arms.forEach((a,k)=>{a.rotation.x=(i+k)%2?0.35:-0.25;});
          const s=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,transparent:true,depthWrite:false,color:[0xffe08a,0x9fe6ff,0xffb0d0,0xb8ffb0][i]}));s.scale.setScalar(0.5);s.raycast=()=>{};s.position.set(-6.2,2.2,-14.4);W.group.add(s);notes.push(s);
          const to=new V3(-4.6+i*0.9,2.6+(i%2)*0.4,-12.6);anim(1.2,k=>{s.position.lerpVectors(new V3(-6.2,2.2,-14.4),to,smooth(k));});}));}},
        {t:4.4,fn:()=>{notes.forEach((s,i)=>{const h=HEROES[i],from=s.position.clone();anim(1.4,k=>{s.position.lerpVectors(from,h.pos.clone().add(new V3(0,h.d.height,0)),smooth(k));s.material.opacity=1-k*0.6;if(k>=1){W.group.remove(s);burst(h.pos.clone().add(new V3(0,h.d.height,0)),COL.gold,6,2);}});});}}],
      tick:(t)=>{sadko.head.rotation.x=0.12;sadko.body.rotation.z=Math.sin(t*2.2)*0.04;},
      end:()=>{notes.forEach(s=>W.group.remove(s));banner('Гусли Садко!','#ffd76a',2.8,'кнопка R или ; (на джойстике RB): вода подымется или опустится там, где стоишь');
        for(const pi of[0,1])tip(pi,'У воды — рейка: поплавок у синей метки — прилив, у жёлтой — отлив. Играй '+K(pi,'item')+'!',4.2);}});}
  W.waterTargets.push({pos:new V3(-5.9,0,-14.5),active:()=>F.stage==='sadko',onWater:()=>{giftScene();}});
  function bookScene(){F.stage='book';const T=HERO,pr=T.proshka;const umb=new THREE.Group();W.group.add(umb);umb.visible=false;
    addMesh(new THREE.CylinderGeometry(0.02,0.02,0.9,5),M(0x6a4a2a),0,-0.45,0,umb);const can=addMesh(new THREE.ConeGeometry(0.75,0.35,10),M(0x4f9a3a),0,0.05,0,umb);can.scale.set(0.2,1,0.2);
    placeOnGround(pr,0,-35.25,0);pr.face=Math.PI;placeOnGround(T.potap,-1.7,-34.4,0);T.potap.face=Math.PI*0.9;placeOnGround(T.pelageya,1.6,-34.7,0);T.pelageya.face=-Math.PI*0.88;placeOnGround(T.yosha,0.9,-33.9,0);T.yosha.face=Math.PI;
    // смысловой моушн: книга сказок «дышит», щёлкает застёжка, крышка распахивается с золотым светом — сказки вот-вот встанут со страниц…
    // но страниц нет: картинки-раскладушки пустые, встают и никнут, пустая бумага рвётся и уплывает обрывками туда, где за водой звенят ключи
    const fx=new THREE.Group();W.group.add(fx);const pop=new THREE.Group();pop.position.set(0,0.07,0);book.add(pop);
    const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:K21_GLOW_TEX,color:0xffd76a,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));glow.position.set(0,1.25,-36.5);glow.scale.setScalar(0.1);glow.raycast=()=>{};fx.add(glow);
    const cards=[[0,0.42,0.5,0],[-0.21,0.28,0.3,1],[0.21,0.28,0.3,2]].map(([x,w,hh,kind],i)=>{const c=new THREE.Group();c.position.set(x,0,-0.08+i*0.07);pop.add(c);
      const m=new THREE.Mesh(new THREE.PlaneGeometry(w,hh),new THREE.MeshBasicMaterial({map:K21_CARD_TEX[kind],transparent:true,side:THREE.DoubleSide}));m.position.y=hh/2;c.add(m);c.rotation.x=-Math.PI/2;return {c,m,w,hh};});
    const scraps=[];
    const backOut=k=>{const c1=1.9,c3=c1+1;return 1+c3*Math.pow(k-1,3)+c1*Math.pow(k-1,2);};
    play({dur:28,fov:46,camK:3.4,shots:[shot(0,[3.6,3.2,-30.2],[0,1.2,-36.5]),shot(3.1,[0.95,2.05,-34.5],[0,1.05,-36.5]),shot(7.5,[-1.35,1.28,-36.2],[-0.4,1.12,-36.5]),shot(12.6,[2.2,2.3,-33.6],[-6.4,2.2,-38.4]),
        shot(17.4,[1.9,1.9,-31.6],[0,1.9,-35.3],[1.9,1.4,-31.9],[0,5,-35.6],3),shot(23,[2.6,1.2,-32.4],[0.9,0.55,-33.9])],
      says:[[0.3,3.2,null,'<i>В библиотеке терема на подставке</i><br><i>Лежит толстая книга сказок, без закладки.</i>',true],[3.3,3.6,null,'<i>Прошка её открывает — в лапах один переплёт:</i><br><i>Все страницы вырваны — вот тебе и переворот.</i>',true],
        [7.7,2.4,null,'<i>На корешке кто-то ключом слова нацарапал.</i>',true],[10.2,2.8,'proshka','Тут нацарапано: «Не… про… меня». Кто ж так обиделся, кто заплакал?'],[13,3.2,null,'<i>За стеной воды тихо ключи звенят.</i>',true],
        [17.6,2.6,'proshka','Зонт из лопуха — от воды, от дождя!'],[20.5,2.4,null,'<i>Зонт всплывает — да без Прошки.</i>',true],[23.1,1.6,'yosha','Ха-ха-ха! Вот потеха!'],[24.9,3,null,'<i>Йоша смеётся — да на звон оглянется.</i>',true]],
      events:[{t:0,fn:()=>{spineDraw(0);front.rotation.z=0;}},
        // книга дышит, как живая
        {t:0.5,fn:()=>{anim(2.8,k=>{const b=Math.sin(k*Math.PI*4)*0.035*(1-k*0.4);book.scale.set(1-b*0.5,1+b,1-b*0.5);clasp.rotation.z=Math.sin(k*Math.PI*8)*0.12*k;});}},
        // щёлк — застёжка отскакивает
        {t:3.35,fn:()=>{SFX.latch();anim(0.35,k=>{clasp.rotation.z=-1.6*backOut(k);});burst(new V3(0.36,1.3,-36.5),COL.gold,6,1.5,0.4);}},
        // крышка распахивается справа налево, с отскоком; из книги — золотой свет
        {t:3.6,fn:()=>{SFX.flower();anim(1.0,k=>{front.rotation.z=Math.PI*0.93*backOut(k);});
          anim(1.0,k=>{glow.material.opacity=0.9*Math.min(1,k*2);glow.scale.setScalar(0.3+1.6*k);glow.position.y=1.25+0.25*k;});for(let i=0;i<10;i++)later(0.05*i,()=>burst(new V3(rand(-0.3,0.3),1.15,-36.5+rand(-0.35,0.35)),[COL.gold,0xfff2c0][i%2],2,2,0.5));}},
        // картинки-раскладушки встают — а они пустые
        {t:4.2,fn:()=>{cards.forEach((C,i)=>later(i*0.16,()=>{SFX.flower();anim(0.55,k=>{C.c.rotation.x=-Math.PI/2*(1-backOut(k));});}));}},
        {t:4.9,fn:()=>{anim(1.0,k=>{cards.forEach((C,i)=>{C.c.rotation.z=Math.sin(k*Math.PI*3+i)*0.08*(1-k);});});}},
        // свет гаснет: страниц нет — сказки не встают
        {t:5.6,fn:()=>{tone(660,0.7,'sine',0.12,330);later(0.35,()=>tone(520,0.8,'sine',0.1,260));anim(0.9,k=>{glow.material.opacity=0.9*(1-k)*(0.6+0.4*Math.abs(Math.sin(k*20)));glow.scale.setScalar(1.9-0.9*k);});
          anim(1.0,k=>{cards.forEach((C,i)=>{if(i)C.c.rotation.x=-Math.PI/2*smooth(k);else C.c.rotation.x=-0.5*smooth(k);});});}},
        // пустая картинка рвётся пополам — обрывки уплывают рыбками туда, где звенят ключи
        {t:6.5,fn:()=>{const C=cards[0];C.m.visible=false;SFX.whoosh();for(const sd of[-1,1]){const half=new THREE.Mesh(new THREE.PlaneGeometry(C.w/2,C.hh),new THREE.MeshBasicMaterial({map:K21_CARD_TEX[0],transparent:true,side:THREE.DoubleSide}));
            half.position.set(sd*C.w/4,C.hh/2+0.07,-0.08);book.add(half);scraps.push(half);anim(0.9,k=>{half.position.x=sd*(C.w/4+0.25*k);half.position.y=C.hh/2+0.07-0.12*k;half.rotation.z=sd*1.2*k;half.material.opacity=1-k;if(k>=1)book.remove(half);});}
          for(let i=0;i<12;i++){const sc=new THREE.Mesh(new THREE.PlaneGeometry(0.07,0.09),MB(0xf4ecd8,{side:THREE.DoubleSide,transparent:true}));const o=new V3(rand(-0.25,0.25),1.12,-36.5+rand(-0.3,0.3));sc.position.copy(o);fx.add(sc);scraps.push(sc);const ph=rand(0,6),dl=rand(0,0.6);
            later(dl,()=>anim(3.4,k=>{sc.position.set(o.x-k*(1.8+ph*0.2)+Math.sin(k*9+ph)*0.12,o.y+k*1.6+Math.sin(k*6+ph)*0.15,o.z-k*0.9);sc.rotation.set(Math.sin(k*12+ph),k*6+ph,Math.cos(k*10+ph)*0.6);sc.material.opacity=1-Math.max(0,k-0.6)/0.4;
              if(k>=1){fx.remove(sc);burst(sc.position.clone(),0xcff8ff,2,1,0.4);}}));}}},
        // на корешке проступает надпись — будто кто-то царапает ключом
        {t:7.7,fn:()=>{anim(2.2,k=>{spineDraw(k);});for(let i=0;i<11;i++)later(i*0.2,()=>tone(1800+Math.random()*900,0.05,'square',0.025,1300));}},
        {t:10.0,fn:()=>{spineDraw(1);}},
        // звенят ключи за водой — обрывки страниц у корешка тянутся на звон
        {t:13,fn:()=>{SFX.keys();anim(4,k=>{shadow.material.opacity=Math.sin(k*Math.PI)*0.35;shadow.position.z=-39+k*5;});anim(3.6,k=>{stubs.forEach((st,i)=>{st.rotation.y=-0.5*Math.sin(k*Math.PI)+Math.sin(k*30+i)*0.08*Math.sin(k*Math.PI);st.position.x=-0.3-0.05*Math.sin(k*Math.PI);});});}},
        {t:15.4,fn:()=>SFX.keys()},
        {t:17.7,fn:()=>{umb.visible=true;umb.position.set(pr.pos.x+0.2,pr.pos.y+1.9,pr.pos.z);anim(0.5,k=>{can.scale.set(0.2+0.8*k,1,0.2+0.8*k);});SFX.flower();}},
        {t:20.3,fn:()=>{const from=umb.position.clone();anim(6,k=>{umb.position.set(from.x+Math.sin(k*5)*0.4,from.y+k*6,from.z-k*1.2);umb.rotation.z=Math.sin(k*9)*0.3;});}},
        {t:23.1,fn:()=>{anim(1.2,k=>{T.yosha.extraY=Math.abs(Math.sin(k*Math.PI*4))*0.2;});}},{t:25,fn:()=>{T.yosha.face=Math.atan2(-6.4-T.yosha.pos.x,-38-T.yosha.pos.z);SFX.keys();}}],
      tick:(t)=>{curtain.material.opacity=0.2+0.06*Math.sin(t*3);},
      end:()=>{F.book=true;F.stage='street';T.yosha.extraY=0;W.group.remove(umb);W.group.remove(fx);book.remove(pop);for(const sc of scraps)if(sc.parent)sc.parent.remove(sc);
        book.scale.set(1,1,1);front.rotation.z=Math.PI*0.93;clasp.rotation.z=-1.6;spineDraw(1);stubs.forEach(st=>{st.rotation.y=0;st.position.x=-0.3;});}});}
  // Переливная улица: короткий показ — вода одна, заслонка на дне
  function perelScene(){const P=HERO.potap;
    play({dur:9,fov:50,shots:[shot(0,[0,7.5,-76+PZ],[0,-1,-95+PZ]),shot(4.6,[-5,2.4,-88+PZ],[-2.8,-2,-95+PZ])],
      says:[[0.3,4,'zven','Улица в два канала, а вода у них одна! Отольёшь у себя — у друга прибудет.'],[4.5,4.2,'zven','Да заслонка на дне закрыта. Тяжёлый нужен — чтоб не всплыл и держал!']],
      events:[{t:5,fn:()=>{for(let i=0;i<3;i++)later(i*0.5,()=>ringFx(new V3(-2.8,-2.3,-95+PZ),0xffd9a0,1.6));}}],
      end:()=>{later(0.5,()=>bark(P,'potap','Тяжёлый? Это я. Как положено.',2,true));}});}
  // ---------- ворота Китежа: награда за длинный путь ----------
  // Водоросли срезаны — за аркой виден сам Китеж: башни и купола зажигаются один за другим, колокола вызванивают напев Садко
  // (тот самый, что Китеж вспомнит в 2-5). Город — за стеной уровня, только для ролика (без тумана, как корабли в палатах).
  function gateCity(){const g=new THREE.Group();g.visible=false;W.group.add(g);const wallC=MB(0x24485a,{fog:false}),win=MB(0xffe08a,{fog:false,transparent:true,opacity:0}),domes=[];
    const tower=(x,z,r,h,ds)=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(r*0.9,r,h,10),wallC);b.position.set(x,h/2-2,z);g.add(b);
      const dm=MB(0x4a3a18,{fog:false});const on=new THREE.Mesh(new THREE.SphereGeometry(r*1.1,12,10),dm);on.scale.set(1,1.25,1);on.position.set(x,h-2+r*0.9,z);g.add(on);
      const tip=new THREE.Mesh(new THREE.ConeGeometry(r*0.45,r*1.4,10),dm);tip.position.set(x,h-2+r*2.3,z);g.add(tip);
      for(let i=0;i<3;i++){const w=new THREE.Mesh(new THREE.PlaneGeometry(r*0.35,r*0.6),win);w.position.set(x+(i-1)*r*0.5,h*0.55-2,z+r*0.92);g.add(w);}domes.push({dm,ds});};
    [[-9,-370,1.6,9,0.6],[-5,-382,2.1,13,1.4],[0,-375,2.6,11,2.2],[5.5,-384,2.0,14,3.0],[9.5,-371,1.5,8,3.8],[-13,-392,1.8,12,4.4],[13,-394,1.9,13,5.0],[0,-398,3.2,18,5.6]].forEach(q=>tower(...q));
    const rays=[0,1,2].map(i=>{const m=new THREE.Mesh(new THREE.ConeGeometry(4,40,16,1,true),MB(0xffe8a0,{transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,fog:false}));
      m.position.set((i-1)*9,18,-384);m.rotation.z=(i-1)*0.18;g.add(m);return m;});
    g.traverse(c=>{c.userData.noBatch=true;c.castShadow=false;});return {g,domes,win,rays};}
  function gateScene(){const T=HERO,C=gateCity(),gold=new THREE.Color(0xffd76a),dark=new THREE.Color(0x4a3a18);
    const row=[[-2.6,-160.6],[-0.9,-161.2],[0.9,-161.2],[2.6,-160.6]];HEROES.forEach((h,i)=>{placeOnGround(h,row[i][0],row[i][1]+D3,0);h.face=Math.PI;});
    if(!endLink.taken)takeItem(endLink,active(0));
    play({dur:12.4,fov:54,shots:[shot(0,[0,4.6,-155.5+D3],[0,2.6,-167+D3]),shot(4.2,[0,2.0,-162.5+D3],[0,6,-200+D3],[0,2.8,-170+D3],[0,8.5,-205+D3],6.5)],
      says:[[0.3,3.6,null,'<i>Расступились водоросли — а за воротами спит Китеж-град.</i>',true],[4.2,3.4,'zven','Слышите? Колокола напев Садко помнят!'],
        [7.8,2.2,'proshka','Дошли! Вот он — Китеж!'],[10.1,2.2,'zven','Дзинь — дальше, в город!']],
      events:[{t:0,fn:()=>{C.g.visible=true;SFX.gate();}},
        {t:4.2,fn:()=>{FIN.SADKO_TUNE.forEach((m,i)=>later(i*0.6,()=>{gusli(m,0,0.24);gusli(m-12,0,0.18);SFX.bell();}));}},
        {t:7.0,fn:()=>{for(let i=0;i<24;i++)later(i*0.05,()=>burst(new V3(rand(-4,4),rand(1,5),-158+D3),[0xffd23a,0x5ab8ff,0xff7ab0,0x6ad86a][i%4],3,3));SFX.ok();}},
        {t:9.6,fn:()=>{for(const h of HEROES)if(ACT&&ACT.emote)ACT.emote(h,'joy');}}],
      tick:(t)=>{for(const D of C.domes){const k=clamp((t-4.2-D.ds*0.55)/0.8,0,1);D.dm.color.copy(dark).lerp(gold,k);}
        C.win.opacity=clamp((t-5)/3,0,1)*(0.8+0.2*Math.sin(t*9));C.rays.forEach((m,i)=>{m.material.opacity=clamp((t-6+i*0.4)/2,0,1)*0.16;m.rotation.y=t*0.1*(i-1);});},
      end:()=>{W.group.remove(C.g);F.out=true;finishLevel();}});}
  // ---------- Звонкая мостовая: осётр, плиты, ворота ----------
  function noteFly(T,from){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,color:T.c,transparent:true,depthWrite:false}));s.scale.setScalar(0.7);s.raycast=()=>{};const a=from.clone();s.position.copy(a);W.group.add(s);
    const to=new V3(T.x,1.6,T.z);anim(1.1,k=>{s.position.lerpVectors(a,to,smooth(k));s.position.y+=Math.sin(k*Math.PI)*1.2;if(k>=1){W.group.remove(s);T.lit=1;burst(to,T.c,10,3);ringFx(new V3(T.x,0.2,T.z),T.c,1.8);}});}
  function sturgeonPass(){const S=sturg;S.g.visible=true;const P0=new V3(17,7.4,-186),P1=new V3(-19,6.6,-204);const lit=[false,false,false];SFX.whoosh();
    say('proshka','Вот это осётр! С терем ростом!',2.4);
    anim(9,k=>{const p=new V3().lerpVectors(P0,P1,k);p.y-=Math.sin(k*Math.PI)*1.4;S.g.position.copy(p);S.g.rotation.y=Math.atan2(P1.x-P0.x,P1.z-P0.z)+Math.sin(k*14)*0.05;S.tail.rotation.y=Math.sin(G.time*5)*0.4;
      if(k>0.22&&!lit[0]){lit[0]=true;gusli(67,0,0.22);noteFly(TUNE[0],S.g.position);}
      if(k>0.38&&!lit[1]){lit[1]=true;gusli(71,0,0.22);noteFly(TUNE[1],S.g.position);}
      if(k>0.54&&!lit[2]){lit[2]=true;gusli(74,0,0.22);gusli(72,0,0.22);noteFly(TUNE[2],S.g.position);noteFly(TUNE[3],S.g.position);}
      if(Math.random()<0.35)burst(S.g.position.clone().add(new V3(rand(-1,1),-0.6,rand(-2,2))),0xcff8ff,1,1.2,0.6);
      for(const h of HEROES){if(!h.active||h.cling||h.sturgT)continue;if(Math.abs(h.pos.x-p.x)<3.2&&Math.abs(h.pos.z-p.z)<5){h.sturgT=1;h.vel.x-=3.2;h.vel.y=Math.max(h.vel.y,2.8);h.grounded=false;floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Ух! Течение!','#cff8ff');}}
      if(k>=1){S.g.visible=false;for(const h of HEROES)h.sturgT=0;}});
    later(5.8,()=>say('zven','Слышали? Напев Садко! Дзинь, дилинь — по очереди, а дон-дон — вместе!',4));
    later(8.6,()=>{for(const p of[0,1])tip(p,'Плиты: дзинь, дилинь — по очереди, дон-дон — вдвоём.',4.4);});}
  function tuneDone(){TS.done=true;F.tune=true;[67,71,74,72].forEach((m,i)=>later(i*0.14,()=>gusli(m,0,0.24)));later(0.7,()=>{gusli(67,0,0.2);gusli(74,0,0.2);gusli(79,0,0.2);});
    for(const T of TUNE){T.lit=1;burst(new V3(T.x,1.4,T.z),T.c,14,4);}tuneCol.on=false;SFX.gate();SFX.ok();
    anim(2.2,k=>{tuneGate.position.y=4.6*smooth(k);tgBells.forEach((b,i)=>{b.rotation.z=Math.sin(k*30+i)*0.4*(1-k);});});
    banner('Напев Садко!','#ffd76a',2.6,'звонкие ворота сами запели — и открылись');
    later(1.4,()=>{TS.guard=[crab(-7.5,-209,null,{leash:7}),crab(7.5,-209,null,{leash:7}),puzyr(0,-206.5,{leash:6})];SFX.red();
      banner('Стража ворот!','#ffb0a0',2.2,'раки щиплют красным — кувырком · пузырник надувается: рогатка Прошки его сдует');});}
  function tuneTick(dt){if(TS.done){for(const T of TUNE){T.lit=Math.max(0.35,T.lit-dt*0.5);T.mat.emissiveIntensity=0.15+T.lit*1.2;}return;}
    for(const T of TUNE){const occ=HEROES.some(h=>(h.active||!h.following)&&!h.cling&&Math.hypot(h.pos.x-T.x,h.pos.z-T.z)<1.3&&h.pos.y<0.8&&h.pos.y>-0.5);T.fresh=occ&&!T.on;T.on=occ;
      T.lit=Math.max(T.lit-dt*1.4,occ?0.5:0);T.mat.emissiveIntensity=0.15+T.lit*1.2;T.note.position.y=2.0+Math.sin(G.time*2+T.i)*0.15+T.lit*0.4;T.note.material.opacity=0.5+0.5*Math.min(1,T.lit+0.2);}
    const ok=i=>{const T=TUNE[i];T.lit=1;gusli(T.n,0,0.22);burst(new V3(T.x,1.2,T.z),T.c,10,3);ringFx(new V3(T.x,0.2,T.z),T.c,1.6);};
    const fail=()=>{TS.step=0;TS.t=0;TS.fails++;tone(233,0.5,'sawtooth',0.07,220);tone(247,0.5,'sawtooth',0.07,230);for(const T of TUNE){T.lit=0;burst(new V3(T.x,0.6,T.z),0xff6a6a,6,2,0.5);}
      floatText(new V3(0,2.8,-195),'Фальшь! Сначала: дзинь…','#ffb0a0');
      if(TS.fails===2)for(const p of[0,1])tip(p,'В одиночку: оставь героя на плите '+K(p,'swap')+'.',4.6);};
    if(TS.step>0){TS.t+=dt;if(TS.t>10){TS.step=0;TS.t=0;floatText(new V3(0,2.8,-195),'Напев стих — сначала!','#cfe8ff');}}
    const fr=TUNE.filter(T=>T.fresh).map(T=>T.i);
    if(TS.step===0){if(fr.includes(0)){ok(0);TS.step=1;TS.t=0;}else if(fr.length)fail();}
    else if(TS.step===1){if(fr.includes(1)){ok(1);TS.step=2;TS.t=0;}else if(fr.includes(2)||fr.includes(3))fail();}
    else if(TS.step===2){if(TUNE[2].on&&TUNE[3].on){ok(2);ok(3);tuneDone();}
      else if(fr.includes(2)||fr.includes(3)){const T=TUNE[fr.find(i=>i>=2)];gusli(T.n,0,0.12);T.lit=0.8;floatText(new V3(T.x,2.9,T.z),'дон-дон — ВМЕСТЕ!','#ffd9a0');}}}
