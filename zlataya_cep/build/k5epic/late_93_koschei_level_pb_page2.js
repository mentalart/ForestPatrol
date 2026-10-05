// ---- продолжение build5B2 (k5epic, часть 11): СТРАНИЦА 2 «ТАМ О ЗАРЕ ПРИХЛЫНУТ ВОЛНЫ» (стадия 5, мир 2, гусли) ----
  // Подводный Китеж на заре: белокаменная площадь-чаша, арки, храмы с золотыми главами, водоросли, косяки рыб, лучи зари сквозь
  // толщу, пузырьки. Колокольня; Кощей — чёрный звонарь; Водяной прикован к ней тремя цепями. Вода — омут 2-Б (свой шейдер).
  // Перекличка (цепь за цепью): Кощей бьёт в чёрные колокола по порядку — каждый удар — волна цвета колокола (прыжок), а на дне
  //   откликается золотом колокол того же цвета. Со 2-й цепи — фальшивый удар: чернильный, золото не откликается — не повторять.
  // Ответ: гусли у раковины (предмет) — прилив: вода держит героев, золотые колокола всплывают и плавают; звонить в том же порядке.
  //   Ошибка или долго — чернильная волна, заново. Верно — цепь лопнула. Долго думаете — Водяной пузырями показывает следующий.
  // Помехи: волны с колокольни; со 2-й цепи — чернильные щуки прыгают из воды (красный круг на месте падения; удар на подлёте —
  //   щука летит в Кощея: «сбился» — перекличка короче, на ответ больше времени); с 3-й — Кощей роняет чёрный колокол на звонящего
  //   и крутит воронку посреди площади (тянет к середине). Рогатка Прошки по Кощею — тоже «сбился».
  // Финал: Водяной свободен, Кощей бьёт в набат — с севера ползёт чёрная вода (кто в ней — больно). Со дна встаёт Благовест: удар
  //   вдвоём разом (одному — просто удар), трижды — водяные кони, вал Водяного смывает чёрную воду и Кощея с колокольни.
  // Атлас: telegraph + secondary-cue, ring-volley/shockwave, decoy, landing-jump, attack-reflection, interruptible-wind-up,
  // marked-area-strike, pull, moving-hazard, co-op sync, survival-phase. Бот — tk5e_p2.
  {const X=500;const A={theme:'kitezh',face:Math.PI,clamp:{x:X,z:0,r:13.5},fallY:-12};AR[2]=A;
    A.spawn=i=>new V3(X-1.5+i*3,0,10.8);
    const BC=[0xff6a6a,0x6aff9a,0x6aa8ff,0xffd76a],BN=[523,659,784,1047],BP=[[-7.5,-2.5],[7.5,-2.5],[-6,5.5],[6,5.5]].map(([x,z])=>new V3(X+x,0,z));
    const SHELL=new V3(X,0,9.4),VOD=new V3(X,0,-5.4),TOW=new V3(X,0,-10.4),KZ=new V3(X,4.6,-10.4),BLAG=new V3(X,0,2.4),C=new V3(X,0,0),LV=1.2;
    const hexS=c=>'#'+c.toString(16).padStart(6,'0');
    // колокол: литой (токарный профиль), язык качается
    const bellGeo=(()=>{const p=[];for(let i=0;i<=10;i++){const t=i/10;p.push(new THREE.Vector2(0.18+Math.pow(t,1.6)*0.82+(t>0.9?(t-0.9)*1.2:0),-t*1.6));}return new THREE.LatheGeometry(p,20);})();
    const BELLS=[];
    function kbell(par,s,col,em,ei){const g=new THREE.Group();par.add(g);g.scale.setScalar(s);const piv=new THREE.Group();g.add(piv);
      const mat=new THREE.MeshLambertMaterial({color:col,emissive:em,emissiveIntensity:ei||0.2,side:THREE.DoubleSide});const sh=new THREE.Mesh(bellGeo,mat);piv.add(sh);
      part(piv,new THREE.SphereGeometry(0.2,10,8),mat,0,0.05,0);part(piv,new THREE.TorusGeometry(0.16,0.05,6,12),mat,0,0.28,0);part(piv,new THREE.TorusGeometry(0.9,0.05,6,24),mat,0,-1.3,0).rotation.x=Math.PI/2;const tg=new THREE.Group();tg.position.y=-0.1;piv.add(tg);part(tg,new THREE.CylinderGeometry(0.04,0.04,1.2,6),M(0x3a3a40),0,-0.6,0);
      part(tg,new THREE.SphereGeometry(0.15,10,8),M(0x3a3a40),0,-1.25,0);const B={g,piv,tg,mat,sw:0,ei:ei||0.2};BELLS.push(B);return B;}
    const weeds=[],schools=[];let zone=null,OM=null;
    A.g=E.capture(()=>{
      // чаша площади: белый камень, кольца плит, золотая звезда посередине
      ground(X-17,X+17,-17,17,0,M(0xa8b8b0));
      for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.RingGeometry(2.1+i*2,3.1+i*2,56),M(i%2?0xd8dccc:0xb0beb4));m.rotation.x=-Math.PI/2;m.position.set(X,0.012,0);m.receiveShadow=true;W.group.add(m);}
      {const sh=new THREE.Shape();for(let i=0;i<16;i++){const a=i/16*Math.PI*2,r=i%2?0.75:2.0;i?sh.lineTo(Math.cos(a)*r,Math.sin(a)*r):sh.moveTo(Math.cos(a)*r,Math.sin(a)*r);}
        const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.45}));m.rotation.x=-Math.PI/2;m.position.set(X,0.03,0);W.group.add(m);}
      // край чаши: ступени и арки по кругу
      for(let k=0;k<2;k++){const R=14.2+k*1.5;const w=new THREE.Mesh(new THREE.CylinderGeometry(R,R,0.5,72,1,true),M(0xd8d4c4,{side:THREE.DoubleSide}));w.position.set(X,0.25+k*0.5,0);W.group.add(w);
        const t=new THREE.Mesh(new THREE.RingGeometry(R,R+1.5,72),M(0xe2ddcc));t.rotation.x=-Math.PI/2;t.position.set(X,0.5+k*0.5,0);W.group.add(t);}
      for(let i=0;i<18;i++){const a=i/18*Math.PI*2+0.09;if(Math.sin(a)>0.5)continue;const x=X+Math.cos(a)*16.4,z=Math.sin(a)*16.4;const g=new THREE.Group();g.position.set(x,1,z);g.rotation.y=-a-Math.PI/2;W.group.add(g);
        for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.5,3.4,0.5),M(0xe8e4d4),s*1.15,1.7,0,g);
        if(i%5!==3){addMesh(new THREE.TorusGeometry(1.15,0.24,6,14,Math.PI),M(0xe8e4d4),0,3.4,0,g);addMesh(new THREE.SphereGeometry(0.22,8,6),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),0,4.8,0,g);}
        else{const b=addMesh(new THREE.BoxGeometry(0.5,1.6,0.5),M(0xd0ccbc),0.5,0.2,1.1,g);b.rotation.z=1.4;}
        for(let k=0;k<3;k++)weeds.push({g:seaweed(x+rand(-1,1),z+rand(-1,1),rand(1.2,3),1),ph:rand(0,6)});}
      // храмы с золотыми главами за площадью
      for(let i=0;i<11;i++){const a=i/11*Math.PI*2+0.3,r=rand(21,27);kdome(X+Math.cos(a)*r,Math.sin(a)*r,rand(1.1,1.8),1);}
      for(const [dx,dz,s] of[[-6,24,2.1],[-2,25.5,2.6],[2.5,24,2.1]])kdome(X+dx,dz,s,1);
      // водоросли и камни по краю чаши
      for(let i=0;i<34;i++){const a=rand(0,6.28),r=rand(12.6,13.6);weeds.push({g:seaweed(X+Math.cos(a)*r,Math.sin(a)*r,rand(0.8,2.4)),ph:rand(0,6)});}
      for(let i=0;i<16;i++){const a=rand(0,6.28),r=rand(12.4,13.8);const m=addMesh(new THREE.DodecahedronGeometry(rand(0.25,0.6)),M(0x8a9488),X+Math.cos(a)*r,0.15,Math.sin(a)*r);m.rotation.set(rand(0,3),rand(0,3),0);}
      // колокольня: восьмерик, звонница на столбах, шатёр, золотая глава
      {const g=new THREE.Group();g.position.copy(TOW);W.group.add(g);const wh=M(0xece6d6),gd=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4});
        addMesh(new THREE.CylinderGeometry(2.3,2.7,4.4,8),wh,0,2.2,0,g);addMesh(new THREE.CylinderGeometry(2.8,2.8,0.35,8),M(0xd0c8b4),0,4.45,0,g);
        for(let i=0;i<8;i++){const a=i/8*Math.PI*2+Math.PI/8;addMesh(new THREE.BoxGeometry(0.34,3.0,0.34),wh,Math.cos(a)*2.35,6.1,Math.sin(a)*2.35,g);}
        addMesh(new THREE.CylinderGeometry(2.7,2.7,0.4,8),M(0xd0c8b4),0,7.8,0,g);addMesh(new THREE.ConeGeometry(2.5,3.4,8),M(0x2f6a5a),0,9.7,0,g);
        addMesh(new THREE.CylinderGeometry(0.5,0.5,0.8,10),wh,0,11.7,0,g);const on=addMesh(new THREE.SphereGeometry(0.78,14,10),gd,0,12.6,0,g);on.scale.set(1,1.2,1);
        addMesh(new THREE.ConeGeometry(0.32,0.8,10),gd,0,13.5,0,g);addMesh(new THREE.BoxGeometry(0.06,0.9,0.06),gd,0,14.3,0,g);addMesh(new THREE.BoxGeometry(0.5,0.06,0.06),gd,0,14.4,0,g);
        addMesh(new THREE.BoxGeometry(1.1,1.9,0.1),M(0x2a1e14),0,0.95,2.62,g);for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.42,0.8,0.1),M(0x1e3038),s*1.2,2.9,2.5,g);
        for(let k=0;k<9;k++){const a=rand(0,6.28);const w=addMesh(new THREE.ConeGeometry(0.07,rand(1,2.2),4),M(0x3f7a3a),Math.cos(a)*2.4,4.1,Math.sin(a)*2.4,g);w.rotation.x=Math.PI;}}
      W.cyls.push({x:TOW.x,z:TOW.z,r:2.7,miny:-1,maxy:4.6,on:true});
      // помост Водяного и столбы для цепей
      addMesh(new THREE.CylinderGeometry(1.7,1.9,0.5,14),M(0xc8c0b0),VOD.x,0.25,VOD.z);
      for(const s of[-1,1]){addMesh(new THREE.CylinderGeometry(0.28,0.34,1.6,8),M(0x2a2430),VOD.x+s*4.3,0.8,VOD.z-1.4);addMesh(new THREE.TorusGeometry(0.3,0.08,6,12),M(0x3a3440),VOD.x+s*4.3,1.5,VOD.z-1.1);}
      // пьедесталы золотых колоколов: цветной венец — какой колокол лежит
      BP.forEach((p,i)=>{addMesh(new THREE.CylinderGeometry(1.15,1.3,0.4,16),M(0xd8d0c0),p.x,0.2,p.z);const r=new THREE.Mesh(new THREE.RingGeometry(0.85,1.05,32),MB(BC[i]));r.rotation.x=-Math.PI/2;r.position.set(p.x,0.42,p.z);W.group.add(r);});
      // заря над толщей: солнце у поверхности, ореол
      {const s=new THREE.Mesh(new THREE.CircleGeometry(6,32),MB(0xfff0d0,{fog:false,transparent:true,opacity:0.85}));s.position.set(X+8,46,-60);s.lookAt(X,0,0);W.group.add(s);
        const h=new THREE.Mesh(new THREE.CircleGeometry(20,32),MB(0xffc8a0,{fog:false,transparent:true,opacity:0.16,depthWrite:false}));h.position.set(X+8,45.8,-59.6);h.lookAt(X,0,0);W.group.add(h);}
      // косяки рыб над площадью
      const fg=new THREE.ConeGeometry(0.12,0.55,5);fg.rotateZ(-Math.PI/2);const tg=new THREE.ConeGeometry(0.1,0.2,3);tg.rotateZ(Math.PI/2);
      for(let k=0;k<3;k++){const g=new THREE.Group();g.position.set(X,5.5+k*1.6,0);W.group.add(g);const R=8+k*2.4,mt=M([0xd8e8f0,0xf0c890,0xa8d0e8][k],{emissive:0x204050,emissiveIntensity:0.3});
        for(let i=0;i<16;i++){const a=i/16*Math.PI*2+rand(-0.15,0.15),f=new THREE.Group();f.position.set(Math.cos(a)*(R+rand(-0.8,0.8)),rand(-0.6,0.6),Math.sin(a)*(R+rand(-0.8,0.8)));f.rotation.y=-a+(k%2?Math.PI:0);
          f.add(new THREE.Mesh(fg,mt));const t=new THREE.Mesh(tg,mt);t.position.x=-0.36;f.add(t);g.add(f);}schools.push({g,sp:(k%2?-1:1)*rand(0.12,0.2)});}
      // вода площади: участок мира 2 (держит героев), гладь — омут 2-Б; раковина гуслей
      zone=waterZone(X-13.8,X+13.8,-13.8,13.8,0,LV,{floor:0,curb:false,noGusli:true,dur:1.6,shell:{x:SHELL.x,z:SHELL.z,y:0,ry:Math.PI}});
      if(FIN.k2fx&&FIN.k2fx.omut){OM=FIN.k2fx.omut(C,13.9,zone);OM.chop=0.35;}else zone.k2hide=false;
      // затонувшие лодки: в прилив всплывают — на них можно встать
      floater(zone,X-11.6,X-10.2,0.6,4.4,0.7,{rest:0});floater(zone,X+9.8,X+11.2,-7,-3.4,0.7,{rest:0});});
    // чёрные колокола звонницы
    const black=[0,1,2,3].map(i=>{const B=kbell(A.g,0.55,0x1a1420,0x2a0a3a,0.3);B.g.position.set(KZ.x-1.8+i*1.2,KZ.y+2.7,KZ.z+1.25);const gl=k5Glow(BC[i],2.2);gl.position.y=-0.8;gl.material.opacity=0;B.g.add(gl);B.gl=gl;return B;});
    // золотые колокола: лежат на дне у пьедестала; в прилив всплывают и плавают
    const gold=BP.map((p,i)=>{const B=kbell(A.g,0.85,0xe8c060,0x805010,0.3);const band=new THREE.Mesh(new THREE.TorusGeometry(0.98,0.07,6,24),MB(BC[i]));band.rotation.x=Math.PI/2;band.position.y=-0.85;band.scale.setScalar(0.5);B.piv.add(band);
      const gl=k5Glow(BC[i],2.6);gl.position.y=-0.9;gl.material.opacity=0.25;B.g.add(gl);Object.assign(B,{i,p,gl,up:0,ph:i*1.7,lit:0});return B;});
    const vodG=new THREE.Group();A.g.add(vodG);vodG.position.set(VOD.x,0.5,VOD.z);vodG.scale.setScalar(0.8);const vod=FIN.k2v&&FIN.k2v.rig?{g:vodG,R:FIN.k2v.rig(vodG,{})}:(()=>{const m=makeStarik();W.group.remove(m.g);vodG.add(m.g);return {g:vodG};})();K5L.noRay(vodG);
    const vset=(p,e)=>{if(vod.R&&FIN.k2v.set)FIN.k2v.set(vod.R,p,e);};
    const chains=[[VOD.x-4.3,1.5,VOD.z-1.1],[VOD.x+4.3,1.5,VOD.z-1.1],[TOW.x,1.4,TOW.z+2.6]].map(a=>{const g=chainLine(new V3(VOD.x,2.0,VOD.z),new V3(a[0],a[1],a[2]),0x2a1a34);W.group.remove(g);A.g.add(g);return g;});
    const sadko=makeSadko();W.group.remove(sadko.g);A.g.add(sadko.g);sadko.g.position.set(SHELL.x+2.2,0,SHELL.z+0.6);sadko.g.rotation.y=Math.PI*1.2;sadko.g.visible=false;K5L.noRay(sadko.g);
    // Благовест: встаёт со дна в финале
    const blagG=new THREE.Group();A.g.add(blagG);blagG.position.set(BLAG.x,-8,BLAG.z);blagG.visible=false;
    for(const s of[-1,1])addMesh(new THREE.CylinderGeometry(0.22,0.28,5.6,8),M(0x6a4a2a),s*2.3,2.8,0,blagG);addMesh(new THREE.BoxGeometry(5.2,0.4,0.4),M(0x7a5a34),0,5.6,0,blagG);
    addMesh(new THREE.ConeGeometry(0.5,0.6,8),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),0,6.1,0,blagG);
    const blag=kbell(blagG,1.45,0xf0c860,0x906010,0.35);blag.g.position.y=5.4;const blagGl=k5Glow(0xffe08a,6);blagGl.position.y=3.4;blagGl.material.opacity=0;blagG.add(blagGl);K5L.noRay(blagG);
    // чёрная вода: диск со своим шейдером, край — светящаяся кромка
    const inkU={uT:{value:0},uF:{value:-14}};
    const ink=new THREE.Mesh(new THREE.CircleGeometry(14.2,72),new THREE.ShaderMaterial({uniforms:inkU,transparent:true,depthWrite:false,
      vertexShader:'varying vec3 vW;void main(){vec4 w=modelMatrix*vec4(position,1.0);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
      fragmentShader:'uniform float uT;uniform float uF;varying vec3 vW;float hs(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hs(i),hs(i+vec2(1.0,0.0)),f.x),mix(hs(i+vec2(0.0,1.0)),hs(i+vec2(1.0,1.0)),f.x),f.y);}'+
        'void main(){float e=uF+sin(vW.x*0.9+uT*2.0)*0.35+sin(vW.x*0.37-uT)*0.5;if(vW.z>e)discard;float n=vn(vW.xz*0.45+vec2(uT*0.25,uT*0.4))*0.6+vn(vW.xz*1.3-vec2(uT*0.5,0.0))*0.4;'+
        'float k=smoothstep(e-1.6,e,vW.z);vec3 c=mix(vec3(0.06,0.02,0.11),vec3(0.32,0.12,0.5),n*0.6+k*0.8);c+=vec3(0.7,0.4,1.0)*pow(k,6.0)*0.8;gl_FragColor=vec4(c,0.86+0.1*n);}'}));
    ink.rotation.x=-Math.PI/2;ink.position.set(X,0.1,0);ink.renderOrder=6;ink.visible=false;ink.raycast=()=>{};A.g.add(ink);
    // мелодия картинкой: над площадью ряд цветных колоколов (собирается, пока Кощей звонит; сыгранные гаснут, следующий пульсирует);
    // над следующим золотым колоколом — столб его цвета и прыгающая стрелка (по отзыву: «какой колокол бить» — видно сразу)
    for(let i=0;i<4;i++)K5PIC.SVG['bell'+i]=K5PIC.SVG.bell.replace('#ffd76a',hexS(BC[i]));
    const melRow=new THREE.Group();A.g.add(melRow);melRow.position.set(X,6.2,-1.5);let melSp=[];
    const nextCol=new THREE.Mesh(new THREE.CylinderGeometry(0.9,1.1,8,20,1,true),k5Add(0xffffff,{opacity:0,map:K5TEX.beam}));A.g.add(nextCol);nextCol.raycast=()=>{};
    const nextAr=t4Arrow(0xffffff);A.g.add(nextAr);nextAr.visible=false;
    function melSet(show){melSp.forEach(sp=>melRow.remove(sp));melSp=[];const n=S.seq.length;S.seq.forEach((b,j)=>{const sp=K5PIC.spr(['bell'+b],1.25);sp.position.set((j-(n-1)/2)*1.55,0,0);sp.visible=!!show;melRow.add(sp);melSp.push(sp);});}
    const S={};A.S=S;A.BP=BP;A.SHELL=SHELL;A.BLAG=BLAG;
    const lvl=()=>zone?Math.max(0,zone.level):0,high=()=>zone&&zone.level>LV*0.7;
    const swirlFx=p=>{if(FIN.k2fx)FIN.k2fx.mist(p,1,0.6);};
    function bellSound(i,v,f){if(AUD.ready())AUD.bell((f||1)*BN[i],{v:v||0.08,d:1.6,wet:0.6});}
    function tideUp(d){S.tide=Math.max(S.tide,d);if(zone&&zone.state!=='high')setWater(zone,'high');}
    function setLow(){if(!zone)return;zone.level=zone.low;zone.from=zone.to=zone.low;zone.t=1;zone.state='low';drawWater(zone);}
    // ---------- перекличка ----------
    function seqNew(){const c=S.chain,L=G.solo?[3,3,4][c]:[3,4,5][c];S.seq=[];for(let i=0;i<L;i++){let b;do{b=Math.floor(rand(0,4));}while(S.seq.length&&S.seq[S.seq.length-1]===b);S.seq.push(b);}
      S.notes=S.seq.map(b=>({b,fake:false}));if(c>=1){const k=1+Math.floor(rand(0,S.notes.length-1));let fb;do{fb=Math.floor(rand(0,4));}while(fb===S.notes[k-1].b||fb===S.notes[k].b);S.notes.splice(k,0,{b:fb,fake:true});}
      S.pos=0;S.ph='show';S.t=0;S.si=0;S.ansT=G.solo?24:18;S.idle=0;S.hint=false;melSet(false);try{KA.pose('threat');later(0.8,()=>KA.reset());}catch(e){}}
    function strike(n){const B=black[n.b];B.sw=1.5;B.gl.material.color.set(n.fake?0x8a30d0:BC[n.b]);B.gl.material.opacity=1;later(0.55,()=>{B.gl.material.opacity=0;});
      try{KA.pose('cast',{snap:true});later(0.3,()=>KA.reset());}catch(e){}
      if(n.fake){bellSound(n.b,0.07,0.93);if(AUD.ready())AUD.thump({f0:90,f1:40,d:0.4,v:0.16});K5L.ink(B.g.position.clone(),12);floatText(B.g.position.clone().add(new V3(0,0.6,0)),'✕','#b070ff');}
      else{bellSound(n.b,0.08);const real=S.notes.slice(0,S.notes.indexOf(n)+1).filter(q=>!q.fake).length;floatText(B.g.position.clone().add(new V3(0,0.6,0)),String(real),hexS(BC[n.b]));
        const Gb=gold[n.b];Gb.lit=1;k5Pillar(Gb.p.clone(),BC[n.b],7,0.9,1.0);const sp=melSp[real-1];if(sp){sp.visible=true;const s0=sp.scale.x;anim(0.4,k=>{sp.scale.set(s0*(1+0.6*Math.sin(k*Math.PI)),s0*(1+0.6*Math.sin(k*Math.PI)),1);});}}
      K5X.shock(TOW,16,7.5,n.fake?0x6a2aa0:BC[n.b],{y:lvl(),h:0.8,fx:n.fake?null:swirlFx});}
    function ring(i){const B=gold[i];if(B.up<0.7)return;B.sw=1.6;bellSound(i,0.1);FX.sparkle(B.g.position.clone().add(new V3(0,0.4,0)),12,BC[i]);k5Ring(B.g.position.clone().setY(lvl()+0.08),BC[i],0.4,2.6,0.5,0.12);
      if(FIN.k2fx)FIN.k2fx.rip(B.g.position.x,B.g.position.z,0.7);if(S.ph!=='answer')return;
      if(S.seq[S.pos]===i){S.pos++;S.idle=0;S.hint=false;floatText(B.g.position.clone().add(new V3(0,1.6,0)),S.pos+' / '+S.seq.length,'#ffe08a');const K=black[i];K.mat.emissive.set(0xffc040);later(0.4,()=>K.mat.emissive.set(0x2a0a3a));
        if(S.pos>=S.seq.length)chainBreak();}
      else{floatText(B.g.position.clone().add(new V3(0,1.6,0)),'Не тот!','#ff9ab8');barkS(KS,'koschei','Не в лад! Снова слушай!',1.4,true);K5L.ink(B.g.position.clone(),18);
        K5X.shock(B.g.position.clone(),7,7,0x6a2aa0,{y:lvl(),h:0.8});S.ph='wait';S.t=0;E.log('wrong');}}
    function chainBreak(){const c=chains[S.chain];const mid=VOD.clone().add(new V3(0,2,0));K5L.gold(mid,22);k5s('keyBreak');c.visible=false;S.chain++;E.log('chain'+S.chain);ES.prog=S.chain/3*0.7;
      gold.forEach(B=>{const L=new THREE.Line(new THREE.BufferGeometry().setFromPoints([B.g.position.clone(),mid]),new THREE.LineBasicMaterial({color:BC[B.i],transparent:true,blending:THREE.AdditiveBlending}));A.g.add(L);
        k5fx(0.8,k=>{L.material.opacity=1-k;},()=>k5Del(L));});
      K5X.shock(VOD,12,10,0xffd76a,{y:lvl(),h:1.2,onHit:()=>{}});vset('roar','angry');later(1.6,()=>vset('dazed','tired'));if(FIN.k2fx)FIN.k2fx.crown(VOD.clone().setY(lvl()),1.2);shakeAll(0.1,0.4);
      if(S.chain>=3){freeVod();return;}
      barkS(vod,'vod',S.chain===1?'Ох! Одна цепь долой! Звоните, ребятки, — я подскажу пузырями!':'Вторая! Держись, Кощей, — вода моя просыпается!',2.6,true);
      later(1.2,()=>barkS(KS,'koschei',S.chain===1?'Ах так? Щуки мои — кусай их!':'Ну, держитесь! Сверху — да с воронкой!',2.2,true));S.ph='wait';S.t=-1.5;}
    // ---------- помехи ----------
    function pikeMesh(){const g=new THREE.Group();const m=M(0x2a3a30,{emissive:0x3a1060,emissiveIntensity:0.5});const b=part(g,new THREE.SphereGeometry(0.32,10,8),m,0,0,0);b.scale.set(1,0.8,2.6);
      const h=new THREE.ConeGeometry(0.26,0.9,8);h.rotateX(Math.PI/2);part(g,h,m,0,0,1.15);const t=new THREE.ConeGeometry(0.34,0.6,4);t.rotateX(-Math.PI/2);part(g,t,m,0,0,-1.05).scale.set(0.3,1,1);
      const d=part(g,new THREE.ConeGeometry(0.12,0.5,4),m,0,0.3,-0.2);d.rotation.x=-0.6;for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.06,6,5),MB(0xc8ff6a),s*0.16,0.1,1.0);
      A.g.add(g);K5L.noRay(g);return g;}
    function pikeLeap(h,from){const y=lvl();let f;if(from)f=from;else{const a=Math.atan2(h.pos.z-C.z,h.pos.x-C.x)+rand(-0.9,0.9);f=new V3(X+Math.cos(a)*12.6,y-0.4,Math.sin(a)*12.6);}
      const to=new V3(h.pos.x+h.vel.x*0.25,y,h.pos.z+h.vel.z*0.25);const m=pikeMesh();m.position.copy(f);const dur=G.solo?1.5:1.25;
      if(FIN.k2fx){FIN.k2fx.tele(to.x,y+0.05,to.z,1.5,dur,'red');FIN.k2fx.crown(f.clone().setY(y),0.6);}k5s('whoosh');S.pikes.push({m,f,to,t:0,dur,bat:false,tgt:h,land:0});}
    function bellDrop(h){const y=lvl(),to=new V3(h.pos.x,y,h.pos.z);if(FIN.k2fx)FIN.k2fx.tele(to.x,y+0.05,to.z,1.7,1.3,'red');const B=kbell(A.g,0.8,0x1a1420,0x2a0a3a,0.3);B.g.position.set(to.x,y+12,to.z);
      K5L.ink(KZ.clone().add(new V3(0,2.4,0)),8);try{KA.pose('cast',{snap:true});later(0.4,()=>KA.reset());}catch(e){}S.drops.push({B,to,t:0,col:null});}
    function kHit(txt){if(G.time<S.kCd||!ES.fight)return;S.kCd=G.time+1.4;E.log('kHit');try{KA.pose('recoil',{snap:true});later(0.5,()=>KA.reset());}catch(e){}
      burst(KS.g.position.clone().add(new V3(0,2,0)),0xffffff,10,3);FX.sparks(KS.g.position.clone().add(new V3(0,2,0)),10,0x9fe8ff);if(FIN.k2fx)FIN.k2fx.crown(KS.g.position.clone().add(new V3(0,1.6,0)),0.7);
      let what='Сбился!';if(S.ph==='show'){const done=S.notes.slice(0,S.si).filter(n=>!n.fake).map(n=>n.b);if(done.length>=2){S.seq=done;S.notes=S.notes.slice(0,S.si);S.si=S.notes.length;S.t=0.95*S.si+1.5;melSet(true);what='Сбился! Перекличка короче';}else{S.t=-0.6;S.si=0;}}
      else if(S.ph==='answer'){S.ansT+=5;S.waveT+=3;S.pikeT+=3;S.dropT+=3;what='Сбился! +5 с';}else if(S.ph==='final'){S.front=Math.max(-14,S.front-4);what='Чёрная вода отступила!';}
      floatText(KS.g.position.clone().add(new V3(0,3.4,0)),(txt?txt+' ':'')+what,'#ffe08a');barkS(KS,'koschei',['Ай! Мокро!','Тьфу ты, рыба!','Сбили, окаянные!'][Math.floor(rand(0,3))],1.2,true);}
    // ---------- финал ----------
    function freeVod(){S.ph='free';S.t=0;E.log('free');ES.prog=0.72;vset('roar','angry');if(FIN.k2fx)FIN.k2fx.column(VOD.x,lvl(),VOD.z,8,1.6,1.4);
      anim(1.2,k=>{vodG.scale.setScalar(0.8+0.35*CE.outBack(k));});barkS(vod,'vod','Свободен! Ну, Кощеюшка, — теперь моя волна!',2.6,true);
      later(2.8,()=>{if(E.cur!==5||S.ph!=='free')return;black.forEach(B=>{B.sw=2;B.gl.material.color.set(0x8a30d0);B.gl.material.opacity=1;later(0.7,()=>{B.gl.material.opacity=0;});K5L.ink(B.g.position.clone(),10);});K5X.shock(TOW,18,6,0x4a1a80,{y:lvl(),h:1.4});shakeAll(0.12,0.6);
        if(AUD.ready())AUD.thump({f0:70,f1:28,d:1.2,v:0.32});barkS(KS,'koschei','На-а-абат! Чёрная вода — топи их!',2.2,true);startFinal();});}
    function startFinal(){S.ph='final';S.t=0;S.fin=0;S.front=-14;S.tide=999;tideUp(999);ink.visible=true;inkU.uF.value=-14;blagG.visible=true;blagG.position.y=-8;anim(1.6,k=>{blagG.position.y=-8+8*CE.outBack(k);});
      K5L.gold(BLAG.clone().add(new V3(0,3,0)),24);vset('conduct','neutral');later(1.4,()=>{if(S.ph==='final')say('vod','Благовест! Бейте разом — я волну подыму!',3);});
      if(!S.horses){S.horses=[];if(FIN.k2v&&FIN.k2v.horse)for(let i=0;i<4;i++){const H=FIN.k2v.horse();W.group.remove(H.g);A.g.add(H.g);H.g.visible=false;K5L.noRay(H.g);S.horses.push(H);}}
      S.horses.forEach(H=>{H.g.visible=false;});E.log('final');}
    function blagHit(h){if(S.ph!=='final'||blagG.position.y<-0.5)return;S.blag[h.player]=G.time;blag.sw=1.2;
      const both=G.solo||Math.abs(S.blag[0]-S.blag[1])<0.8;if(!both){if(G.time>(S.blagTip||0)){S.blagTip=G.time+1;floatText(BLAG.clone().add(new V3(0,6.6,0)),'Разом! Второй — тоже!','#ffe08a');}return;}
      if(G.time<S.blagCd)return;S.blagCd=G.time+(G.solo?1.4:1.0);S.fin++;E.log('blag'+S.fin);ES.prog=0.72+0.28*S.fin/3;blag.sw=2.4;
      if(AUD.ready()){AUD.bell(262,{v:0.14,d:3,wet:0.7});AUD.bell(392,{v:0.08,d:2.6,wet:0.7});}blagGl.material.opacity=1;later(0.8,()=>{blagGl.material.opacity=0;});
      K5X.shock(BLAG,16,10,0xffd76a,{y:lvl(),h:1.4,onHit:()=>{}});K5L.gold(BLAG.clone().add(new V3(0,4,0)),20);K5X.screen('#fff4c0',0.25,0.5);S.front=Math.max(-14,S.front-3);
      const H=S.horses&&S.horses[S.fin-1];if(H){H.g.visible=true;H.g.position.set(X-6+(S.fin-1)*4,lvl()-1.6,11.5);H.g.rotation.y=Math.PI;if(FIN.k2fx){FIN.k2fx.column(H.g.position.x,lvl(),H.g.position.z,4,1.0,1.0);FIN.k2fx.crown(H.g.position.clone().setY(lvl()),1);}
        anim(0.8,k=>{H.g.position.y=lvl()-1.6+1.6*CE.outBack(k);});}
      vset('roar','angry');later(0.9,()=>{if(S.ph==='final')vset('conduct','neutral');});
      floatText(BLAG.clone().add(new V3(0,6.6,0)),'Благовест! '+S.fin+' / 3','#ffe08a');if(S.fin>=3)finale();}
    function finale(){S.ph='won';E.log('wave');say('vod','Ну-ка, волна, — гуляй!',2);vset('conduct','angry');k5s('gale');
      if(!S.val&&FIN.k2fx&&FIN.k2fx.val){S.val=FIN.k2fx.val(30,6.5,{alpha:0.9});W.group.remove(S.val.root);A.g.add(S.val.root);}const VA=S.val;
      if(VA){VA.root.visible=true;VA.set(X,lvl()-0.3,17,Math.PI);VA.groundY=lvl();}
      (S.horses||[]).forEach((H,i)=>{H.g.visible=true;H.g.position.set(X-6+i*4,lvl(),13);H.g.rotation.y=Math.PI;H.gallop=1;});
      k5fx(2.6,(k,dt)=>{const z=17-k*36;if(VA)VA.root.position.z=z;(S.horses||[]).forEach((H,i)=>{H.g.position.z=z-4+Math.sin(i*2+k*9)*0.6;});
        if(z<S.front){S.front=z;}if(z<-8&&!S.washed){S.washed=true;K5L.ink(KS.g.position.clone().add(new V3(0,2,0)),30);k5s('shatter');shakeAll(0.16,0.7);const f=KS.g.position.clone();
          anim(0.9,q=>{KS.g.position.set(f.x+q*3,f.y+Math.sin(q*Math.PI)*4,f.z-q*8);KS.g.rotation.x=-q*2;});black.forEach(B=>{B.sw=2.5;});}},
        ()=>{if(VA)VA.root.visible=false;ink.visible=false;(S.horses||[]).forEach(H=>{H.g.visible=false;});KS.g.visible=false;KS.g.rotation.x=0;barkS(vod,'vod','Вот так-то! Спасибо, ребятки, — век не забуду!',2.6,true);
          later(0.6,()=>say('koschei','Мокро… Ну, погодите!',1.6));later(1.6,()=>E.won(5));});}
    // ---------- старт / конец ----------
    function reset(){Object.assign(S,{ph:'wait',t:0,chain:0,tide:0,waveT:5,pikeT:4,dropT:5,seq:[],notes:[],pos:0,si:0,idle:0,hint:false,fin:0,front:-14,kCd:0,slCd:0,pikes:[],drops:[],blag:[-9,-9],blagCd:0,washed:false,inkCd:new Map(),poolCd:new Map()});
      chains.forEach(c=>{c.visible=true;});gold.forEach(B=>{B.up=0;B.lit=0;});setLow();ink.visible=false;blagG.visible=false;blagG.position.y=-8;vodG.scale.setScalar(0.8);vset('dazed','tired');
      (S.horses||[]).forEach(H=>{H.g.visible=false;});if(S.val)S.val.root.visible=false;if(OM){OM.swirl=0;OM.U.uDeep.value.set(0x0e4a5e);}}
    A.start=q=>{reset();KS.g.visible=true;KS.g.position.copy(KZ);KS.g.rotation.set(0,0,0);dome.visible=false;sadko.g.visible=G.solo;ES.fight=false;ES.prog=0;
      K5X.motes('bubble',new V3(X,0,0),14,180,10);K5X.rays(new V3(X+2,0,-1),0xffe0b8,6,{spread:11,op:0.2});K5X.fog(new V3(X,0,0),15,0x6ac0c8,16,{op:0.22,y0:0.2,y1:1.4});K5X.tint('rgba(0,40,60,.8)',0.45);
      // камера: оба героя и звонница; пока Кощей звонит — ближе к колокольне
      W.camFn=()=>{const hs=k5Heroes();const a=hs[0]?hs[0].pos:C,b=hs[1]?hs[1].pos:a;const mid=new V3((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2),sp=hd(a,b),w=S.ph==='show'?0.45:0.22;
        return {pos:new V3(lerp(mid.x,X,0.4),mid.y+9.5+sp*0.3,Math.max(mid.z,-4)+12.5+sp*0.35),look:new V3(lerp(mid.x,X,0.3),lerp(mid.y+1.2,5.5,w),lerp(mid.z,-9,w)),k:3};};
      E.cards(5,()=>{ES.fight=true;S.t=0;if(!q)later(0.4,()=>barkS(KS,'koschei','Слушайте, как звонит Кощей! Повторите — коли сумеете!',2.6,true));later(3,()=>barkS(vod,'vod','Гусли у раковины — прилив! Тогда золото со дна и всплывёт…',3,true));});};
    A.end=()=>{W.camFn=null;KS.g.visible=false;KS.g.rotation.x=0;for(const p of S.pikes||[])k5Del(p.m);for(const d of S.drops||[]){k5Del(d.B.g);if(d.col)d.col.on=false;}S.pikes=[];S.drops=[];ink.visible=false;
      if(S.val)S.val.root.visible=false;(S.horses||[]).forEach(H=>{H.g.visible=false;});setLow();if(OM)OM.swirl=0;};
    A.item=pi=>{if(E.cur!==5||!ES.fight||S.ph==='final'||S.ph==='won'||S.ph==='free')return null;const h=active(pi);if(hd(h.pos,SHELL)>2.6)return null;
      return ()=>{tideUp(S.chain>=1?14:10);if(typeof gusliFx==='function')gusliFx(h,'high');floatText(h.pos.clone().add(new V3(0,2.2,0)),'Прилив!','#9fe8ff');E.log('tide');};};
    A.attack=h=>{if(E.cur!==5)return;const hp=h.pos.clone().add(new V3(0,1,0));
      for(const p of S.pikes){if(p.bat||p.land)continue;const k=p.t/p.dur;if(k<0.45||p.m.position.distanceTo(hp)>2.9)continue;p.bat=true;p.bt=0;p.bf=p.m.position.clone();E.log('pikeBat');
        floatText(h.pos.clone().add(new V3(0,2.4,0)),'Отбил щуку!','#9fe8ff');SFX.parry&&SFX.parry();return;}};
    // ---------- шаг ----------
    A.tick=dt=>{S.t+=dt;const y=lvl();
      for(const B of BELLS){B.sw=Math.max(0,B.sw-dt*0.8);B.piv.rotation.z=Math.sin(G.time*6)*0.4*B.sw;B.tg.rotation.z=Math.sin(G.time*6-0.8)*0.55*B.sw;}
      for(const w of weeds)w.g.rotation.z=Math.sin(G.time*1.2+w.ph)*0.16;for(const s of schools)s.g.rotation.y+=s.sp*dt;
      if(vod.R&&FIN.k2v.anim)try{FIN.k2v.anim(vod.R,dt);}catch(e){}
      (S.horses||[]).forEach(H=>{if(H.g.visible&&H.tick)H.tick(dt);});if(S.val&&S.val.root.visible)S.val.tick(dt);inkU.uT.value=G.time;
      // золотые: на дне лежат на боку, в прилив всплывают и плавают кругами у пьедестала
      for(const B of gold){B.up+=((high()?1:0)-B.up)*Math.min(1,dt*2.2);const a=G.time*0.45+B.ph,r=B.up*0.9;B.g.position.set(B.p.x+Math.cos(a)*r,lerp(0.55,y+1.5,B.up)+Math.sin(G.time*1.7+B.ph)*0.08*B.up,B.p.z+Math.sin(a)*r);
        B.g.rotation.z=lerp(1.35,0,B.up)+(B.sw?0:Math.sin(G.time*1.3+B.ph)*0.06*B.up);B.lit=Math.max(0,B.lit-dt*0.9);B.gl.material.opacity=0.2+0.8*B.lit+(S.hint&&S.seq[S.pos]===B.i?0.4+0.4*Math.sin(G.time*8):0);}
      melRow.visible=ES.fight&&(S.ph==='show'||S.ph==='answer');melSp.forEach((sp,j)=>{const cur=S.ph==='answer'&&j===S.pos,done=S.ph==='answer'&&j<S.pos;const k=cur?1.25*(1.25+0.2*Math.sin(G.time*8)):done?0.85:1.25;sp.scale.set(k,k,1);sp.material.opacity=done?0.35:1;sp.position.y=cur?0.35+0.15*Math.sin(G.time*8):0;});
      {const B=S.ph==='answer'&&high()?gold[S.seq[S.pos]]:null;nextAr.visible=!!B;if(B){nextCol.position.set(B.g.position.x,lvl()+4,B.g.position.z);nextCol.material.color.set(BC[B.i]);nextCol.material.opacity=0.28+0.12*Math.sin(G.time*6);
          nextAr.position.set(B.g.position.x,B.g.position.y+1.6+0.35*Math.abs(Math.sin(G.time*5)),B.g.position.z);nextAr.userData.mat.color.set(BC[B.i]);}else nextCol.material.opacity=0;}
      if(!ES.fight)return;
      if(S.ph!=='won'&&S.ph!=='free')KS.g.rotation.y=Math.sin(G.time*0.7)*0.35;
      // вода: прилив держится, потом сходит (одному — Садко играет сам, пока ответ)
      if(G.solo&&S.ph==='answer'&&S.tide<2)tideUp(16);S.tide-=dt;if(S.tide<=0&&zone&&zone.state==='high'&&S.ph!=='final'&&S.ph!=='won')setWater(zone,'low');
      if(OM){const sw=S.ph==='answer'&&S.chain>=2&&high();OM.swirl=sw?1:0;OM.chop=S.ph==='final'?0.7:0.35;if(S.ph==='final')OM.U.uDeep.value.lerpColors(new THREE.Color(0x0e4a5e),new THREE.Color(0x1a0a2a),clamp((S.front+14)/24,0,1));}
      if(S.ph==='wait'&&S.t>2.2){seqNew();}
      else if(S.ph==='show'){if(S.t>0.95*S.si+0.8&&S.si<S.notes.length){strike(S.notes[S.si]);S.si++;}
        if(S.si>=S.notes.length&&S.t>0.95*S.notes.length+1.3){S.ph='answer';S.t=0;floatText(SHELL.clone().add(new V3(0,2.6,0)),G.solo?'Ваш черёд! Садко — прилив!':'Ваш черёд! Гусли — прилив!','#ffe08a');}}
      else if(S.ph==='answer'){S.idle+=dt;if(!S.hint&&high()&&S.idle>(S.chain>=1?5:8)){S.hint=true;if(!S.hintSaid){S.hintSaid=true;barkS(vod,'vod','Тот, что пузырится, — следующий!',2,true);}}
        if(S.hint&&Math.random()<dt*6){const B=gold[S.seq[S.pos]];if(B)burst(B.g.position.clone().add(new V3(rand(-0.4,0.4),-0.4,rand(-0.4,0.4))),0xcff8ff,2,1.5,0.6);}
        if(S.t>S.ansT){floatText(KZ.clone().add(new V3(0,3,0)),'Долго! Ещё раз!','#c8a8ff');S.ph='wait';S.t=0;E.log('slow');}}
      // помехи
      const live=S.ph==='answer'||S.ph==='final';
      if(live){S.waveT-=dt;if(S.waveT<=0){S.waveT=G.solo?5.6:4.2;K5X.shock(TOW,17,7,0x6a2aa0,{y,h:0.8});try{KA.pose('cast',{snap:true});later(0.3,()=>KA.reset());}catch(e){}black[Math.floor(rand(0,4))].sw=1.2;}
        if(S.chain>=1||S.ph==='final'){S.pikeT-=dt;if(S.pikeT<=0&&high()){S.pikeT=G.solo?5.2:3.6;const hs=k5Heroes();if(hs.length){const h=hs[Math.floor(rand(0,hs.length))];pikeLeap(h,S.ph==='final'?new V3(X+rand(-8,8),y-0.4,Math.max(-13,S.front)):null);}}}
        if(S.chain>=2&&S.ph==='answer'){S.dropT-=dt;if(S.dropT<=0){S.dropT=G.solo?7:5.4;const nb=gold[S.seq[S.pos]];const hs=k5Heroes();if(hs.length&&nb){const h=hs.slice().sort((a,b)=>hd(a.pos,nb.g.position)-hd(b.pos,nb.g.position))[0];bellDrop(h);}}}}
      // воронка: тянет к середине, в самой середине — больно
      if(OM&&OM.swirl>0.5)for(const h of k5Heroes()){const d=hd(h.pos,C);if(d>11||h.pos.y>y+0.9)continue;if(d>0.3){h.pos.x+=(C.x-h.pos.x)/d*1.6*dt;h.pos.z+=(C.z-h.pos.z)/d*1.6*dt;}
        if(d<1.8&&(S.poolCd.get(h)||-9)<G.time-1.2){S.poolCd.set(h,G.time);k5Hurt(h,C);}if(Math.random()<dt*2)swirlFx(new V3(C.x+rand(-3,3),y+0.2,C.z+rand(-3,3)));}
      // щуки: дуга из воды, круг на месте падения; отбитая — летит в Кощея
      for(const p of S.pikes.slice()){p.t+=dt;const m=p.m;
        if(p.bat){p.bt+=dt;const k=Math.min(1,p.bt/0.55),to=KS.g.position.clone().add(new V3(0,1.8,0));const q=p.bf.clone().lerp(to,k);q.y+=Math.sin(k*Math.PI)*1.5;m.lookAt(q);m.position.copy(q);m.rotation.z+=dt*12;
          if(k>=1){kHit('Щукой — в звонаря!');k5Del(m);S.pikes.splice(S.pikes.indexOf(p),1);}continue;}
        if(p.land){p.land+=dt;m.rotation.z=Math.sin(G.time*20)*0.6;if(p.land>0.9){if(FIN.k2fx)FIN.k2fx.crown(m.position.clone().setY(y),0.5);k5Del(m);S.pikes.splice(S.pikes.indexOf(p),1);}continue;}
        const k=Math.min(1,p.t/p.dur),q=p.f.clone().lerp(p.to,k);q.y=lerp(p.f.y,p.to.y,k)+Math.sin(k*Math.PI)*3.2;const nx=p.f.clone().lerp(p.to,Math.min(1,k+0.04));nx.y=lerp(p.f.y,p.to.y,Math.min(1,k+0.04))+Math.sin(Math.min(1,k+0.04)*Math.PI)*3.2;
        m.position.copy(q);if(k<1)m.lookAt(nx);if(Math.random()<0.4&&FIN.k2fx)FIN.k2fx.drop(q.clone(),new V3(rand(-1,1),rand(0,1.5),rand(-1,1)),0.1,{noRing:true,life:0.8});
        if(k>=1){p.land=0.01;m.position.y=y+0.3;if(FIN.k2fx)FIN.k2fx.crown(p.to.clone(),0.9);k5s('stomp');for(const h of k5Heroes())if(hd(h.pos,p.to)<1.5&&h.pos.y<y+0.7&&h.rollT<=0)k5Hurt(h,p.to);}}
      // чёрный колокол сверху: падает в круг, стоит преградой, тонет
      for(const d of S.drops.slice()){d.t+=dt;const B=d.B;if(d.t<1.3){B.g.position.y=d.to.y+12-Math.max(0,(d.t-0.9)/0.4)*10.6;}
        else if(!d.col){B.g.position.y=d.to.y+1.4;d.col={x:d.to.x,z:d.to.z,r:0.95,miny:-1,maxy:d.to.y+1.4,on:true};W.cyls.push(d.col);shakeAll(0.1,0.35);k5s('stomp');if(AUD.ready())AUD.bell(180,{v:0.1,d:1.4,wet:0.5});
          if(FIN.k2fx)FIN.k2fx.crown(d.to.clone(),1.2);K5X.shock(d.to,5,7,0x6a2aa0,{y:d.to.y,h:0.7});for(const h of k5Heroes())if(hd(h.pos,d.to)<1.7&&h.rollT<=0)k5Hurt(h,d.to);B.sw=1;}
        else if(d.t>7){B.g.position.y-=dt*1.5;if(d.t>8.2){d.col.on=false;const i=W.cyls.indexOf(d.col);if(i>=0)W.cyls.splice(i,1);k5Del(B.g);BELLS.splice(BELLS.indexOf(B),1);S.drops.splice(S.drops.indexOf(d),1);}}}
      // финал: чёрная вода ползёт с севера; дошла до Благовеста — всех в ней ударит и откатится
      if(S.ph==='final'){S.front+=dt*28/(G.solo?34:27);inkU.uF.value=S.front;ink.position.y=y+0.06;
        if(Math.random()<dt*10){const x=X+rand(-12,12);if(Math.hypot(x-X,S.front)<13.5)K5L.ink(new V3(x,y+0.3,S.front),1,0.7);}
        for(const h of k5Heroes()){if(h.pos.z>S.front-0.3||h.pos.y>y+1.2)continue;if((S.inkCd.get(h)||-9)<G.time-1.4){S.inkCd.set(h,G.time);k5Hurt(h,new V3(h.pos.x,y,S.front-2));}}
        if(S.front>=BLAG.z-1.2){E.log('inkReset');floatText(BLAG.clone().add(new V3(0,6.6,0)),'Чёрная вода! Снова!','#c8a8ff');for(const h of k5Heroes())if(h.pos.z<S.front+2)k5Hurt(h,new V3(h.pos.x,y,S.front-2));
          S.fin=Math.max(0,S.fin-1);const H=S.horses&&S.horses[S.fin];if(H)H.g.visible=false;const f0=S.front;S.front=-30;anim(1.2,k=>{S.front=lerp(f0,-14,k);});later(1.25,()=>{if(S.ph==='final')S.front=-14;});barkS(KS,'koschei','Ха! Захлебнулись!',1.4,true);}}};
    // ---------- удары и рогатка ----------
    gold.forEach(B=>{W.hittables.push({pos:B.g.position,r:1.0,alive:()=>E.cur===5&&ES.fight&&B.up>0.7,onHit:()=>ring(B.i)});W.marks.push({pos:B.g.position,active:()=>E.cur===5&&ES.fight&&B.up>0.7,onHit:()=>ring(B.i)});});
    W.hittables.push({pos:BLAG.clone().setY(3),r:1.9,alive:()=>E.cur===5&&ES.fight&&S.ph==='final',onHit:h=>blagHit(h)});
    {const kp=new V3();W.updates.push(()=>{if(E.cur===5)kp.copy(KS.g.position).add(new V3(0,1.8,0));});W.marks.push({pos:kp,active:()=>E.cur===5&&ES.fight&&(S.ph==='show'||S.ph==='answer'||S.ph==='final')&&G.time>S.slCd,onHit:()=>{S.slCd=G.time+4;kHit('Рогатка!');}});}
    A.pics=pi=>S.ph==='won'?['star']:S.ph==='final'||S.ph==='free'?['two','bell','>','@attack']:S.ph==='show'?['bellK','notes','+','wave','@jump']:
      S.ph==='answer'?(high()?['bell','notes','>','@attack']:['gusli','@item','>','water']):['chain','no'];
    A.goal=pi=>{const q=G.solo?0:pi;if(S.ph==='won')return 'Вал Водяного!';
      if(S.ph==='final'||S.ph==='free')return 'Водяной свободен! <b>Благовест</b> посреди площади — удар '+K(q,'attack')+(G.solo?'':' <b>вдвоём разом</b>')+', трижды. Чёрная вода ползёт с севера — не стой в ней.';
      if(S.ph==='show')return 'Слушайте Кощеевы колокола — <b>какой за каким</b>. Откликается золото на дне; <b>чернильный удар (✕) — фальшивый</b>. Волна — прыжок.';
      if(S.ph==='answer')return 'Повторите золотыми колоколами: '+S.seq.map((b,j)=>'<b style="color:'+hexS(BC[b])+'">'+(j<S.pos?'✓':'●')+'</b>').join(' ')+'. '+(G.solo?'Садко держит воду.':'Колокола на дне? <b>Гусли</b> '+K(q,'item')+' у раковины — прилив.')+(S.chain>=1?' Щука — удар на подлёте: в Кощея!':'');
      return 'Цепи Водяного: '+S.chain+' / 3';};
    A.targets=pi=>S.ph==='final'?[blag.g]:S.ph==='answer'?(high()?(S.hint&&gold[S.seq[S.pos]]?[gold[S.seq[S.pos]].g]:[]):[]):[];
    A.bot={tide:()=>tideUp(14),ring:i=>ring(i),answer:()=>{tideUp(14);for(const B of gold)B.up=1;for(let n=0;n<8&&S.ph==='answer';n++)ring(S.seq[S.pos]);},pike:h=>pikeLeap(h),drop:h=>bellDrop(h),kHit:t=>kHit(t),blag:h=>blagHit(h),
      gold:i=>gold[i].g.position,zone:()=>zone,om:()=>OM,ink:()=>S.front};
    // ---------- подсказки в мире ----------
    for(const pi of[0,1]){const me=()=>G.solo?active(G.soloPi):active(pi),st5=()=>E.cur===5&&ES.step==='fight'&&ES.fight&&!G.cine&&(!G.solo||pi===0),top=()=>headOf(me()).add(new V3(0,0.4,0));
      const nearShell=()=>G.solo||k5Heroes().slice().sort((a,b)=>hd(a.pos,SHELL)-hd(b.pos,SHELL))[0]===me();
      prompt(pi,'item',()=>SHELL.clone().add(new V3(0,1.8,0)),()=>st5()&&!G.solo&&S.ph==='answer'&&(!high()||S.tide<2.5)&&nearShell(),'гусли — прилив!');
      prompt(pi,'jump',top,()=>st5()&&K5X.owned.some(o=>o.r!=null&&o.hit&&!o.dead&&o.g&&Math.abs(Math.hypot(me().pos.x-o.g.position.x,me().pos.z-o.g.position.z)-o.r)<2.4),'волна — прыжок!');
      prompt(pi,'attack',top,()=>st5()&&S.pikes&&S.pikes.some(p=>p.tgt===me()&&!p.bat&&!p.land&&p.t/p.dur>0.45),'щука — бей!');
      prompt(pi,'attack',()=>{const B=gold[S.seq[S.pos]];return B?B.g.position.clone().add(new V3(0,1.8,0)):me().pos;},()=>st5()&&S.ph==='answer'&&high()&&!!gold[S.seq[S.pos]]&&k5Heroes().slice().sort((a,b)=>hd(a.pos,gold[S.seq[S.pos]].g.position)-hd(b.pos,gold[S.seq[S.pos]].g.position))[0]===me(),'этот!');
      prompt(pi,'attack',()=>BLAG.clone().add(new V3(pi?1.4:-1.4,7.2,0)),()=>st5()&&S.ph==='final'&&blagG.position.y>-0.5,G.solo?'в Благовест!':'разом — в Благовест!');
      prompt(pi,'label',top,()=>st5()&&S.ph==='final'&&me().pos.z<S.front,'прочь из чёрной воды!');}
  }
  E.pageStage(5,2,{call:'Вторая страница — Подводный Китеж! Колокола молчат, Водяной в цепях.'});
  E.CARDS[5]=[{p:[500,13,17],l:[500,2,-4],card:{tag:'Как победить',title:'Стадия 5 из 12 · Там о заре прихлынут волны',icon:'lock',text:'Кощей — чёрный звонарь на колокольне, Водяной прикован к ней тремя цепями. Повторите перекличку Кощея <b>золотыми колоколами</b> — цепь лопнет. Три цепи — Водяной свободен.'}},
    {p:[500,6,6],l:[500,4,-10],card:{tag:'Слушай',title:'Перекличка',icon:'wave',text:'Кощей бьёт в чёрные колокола <b>по порядку</b>; каждый удар — волна: <b>прыжок</b>. Какой ударил — на дне откликается золотом колокол того же цвета. <b>Чернильный удар (✕)</b> — фальшивый, его не повторяйте.'}},
    {p:[500,4,15],l:[500,0.5,8],card:{tag:'Вместе',title:'Гусли и прилив',icon:'spark',text:'Золотые колокола лежат на дне. <b>Гусли</b> (предмет) у раковины — прилив: вода держит вас, колокола всплывают. Один играет, второй звонит <b>в том же порядке</b>. Щука из воды — <b>удар на подлёте</b>: полетит в Кощея, он собьётся.'}},
    {p:[500,7,12],l:[500,2,2],card:{tag:'Вместе',title:'Благовест',icon:'candle',text:'Водяной свободен — Кощей бьёт в набат, с севера ползёт <b>чёрная вода</b>. Со дна встанет <b>Благовест</b>: бейте в него <b>разом</b>, трижды — вал Водяного смоет Кощея.'}}];
