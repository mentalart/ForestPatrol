  /* ============ ЛУКОМОРЬЕ · УГЛЫ У МОРЯ: Причал Садко (рыбалка), Русалка на ветвях (загадки), Вышка-дозор и «Книга невиданных зверей»,
     Избушка на курьих ножках (кухня Яги), Скала Ветрила (воздушный змей, восходящий поток, гнездо на шпиле) ============ */
  // Остров раздвинут до x ±30. У моря всё считается от берега: в релизе берег сдвинут к морю на W.shoreDZ (rep_30_luko.py).
  // Состояние — G.flags.lc: едет в сохранении вместе с флагами и сбрасывается «Новой игрой». Всё необязательно и на путь не влияет.
  {const SZ=-(W.shoreDZ||0),zS=-19.5+SZ,zW=-24+SZ,SEA=-0.45,PX=-22;
  const LC=G.flags.lc=G.flags.lc||{};for(const k of['fish','beasts','seenT','dish','rd'])LC[k]=LC[k]||{};
  LC.bag=LC.bag||{fish:0,mush:0,berry:0};LC.kite=LC.kite||{best:0,n:0};
  const trip=G.trips||0;if(LC.trip!==trip){LC.trip=trip;LC.mushGot=[];LC.berryGot=[];}LC.mushGot=LC.mushGot||[];LC.berryGot=LC.berryGot||[];
  WHO.rusalka=WHO.rusalka||['Русалка','#8fe0c8'];WHO.veter=WHO.veter||['Ветер-Ветрило','#cfe8ff'];
  const done=id=>!!G.done[id],lvN=id=>{const l=LEVELS.find(q=>q.id===id);return l?l.name.replace(/^[^·]*·\s*/,''):id;};
  const nutW=n=>n%10===1&&n%100!==11?'орешек':n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?'орешка':'орешков';
  const lcNuts=(n,pos,txt)=>{G.nutsHub=(G.nutsHub||0)+n;floatText(pos.clone().add(new V3(0,1.9,0)),(txt?txt+' · ':'')+'+'+n+' '+nutW(n),'#ffd060');};
  const lcNear=(h,p,r)=>hd(h.pos,p)<r&&h.pos.y<(p.y||0)+1.6;
  const lcKit=items=>{if(typeof instKit==='function')try{instKit(items);}catch(e){}};   // в релизе — готовый low-poly реквизит (камыш, кувшинки, бочки)
  const lcLine=(m,a,b)=>{const d=b.clone().sub(a),L=d.length();m.position.copy(a).addScaledVector(d,0.5);m.scale.set(1,Math.max(0.001,L),1);if(L>1e-4)m.quaternion.setFromUnitVectors(new V3(0,1,0),d.multiplyScalar(1/L));};
  const lcAxis=pi=>{const a=padAx(pi);let x=(btn(pi,'right')?1:0)-(btn(pi,'left')?1:0),y=(btn(pi,'down')?1:0)-(btn(pi,'up')?1:0);if(Math.abs(a.x)>0.25)x=a.x;if(Math.abs(a.y)>0.25)y=a.y;return {x,y};};
  const both=fn=>fn(0)||fn(1);
  const lcEl=$('mapui');let hud=document.getElementById('lchud');if(!hud){hud=document.createElement('div');hud.id='lchud';lcEl.parentNode.appendChild(hud);}
  hud.style.cssText='position:absolute;inset:0;pointer-events:none;display:none;font:800 17px system-ui;color:#fff;text-shadow:0 2px 6px #000c';
  const hudOff=()=>{hud.style.display='none';hud.innerHTML='';};
  const lcClose=()=>{G.ui=null;G.uiTick=null;lcEl.style.display='none';};
  const panel=html=>{lcEl.style.display='flex';lcEl.innerHTML='<div class="tet">'+html+'</div>';};
  const navKeys=pi=>K(pi,'up')+K(pi,'down')+' · '+K(pi,'jump');
  const RAD=Math.PI/180;

  /* ---------- данные ---------- */
  const FISH=[{id:'yorsh',name:'Ёрш-ершишка',sz:0,col:0x9a8a4a,nuts:1,line:'Колючий, да свой: в Китеже дорогу кажет.'},
    {id:'peskar',name:'Пескарь',sz:0,col:0xb8b0a0,nuts:1,line:'Премудрый: из-под коряги не высовывается.'},
    {id:'karas',name:'Карась',sz:1,col:0xd8a840,nuts:2,line:'Золотистый, круглый — что пятак.'},
    {id:'okun',name:'Окунь',sz:1,col:0x6a9a4a,nuts:2,line:'Полосатый, плавник колючий.'},
    {id:'leshch',name:'Лещ',sz:1,col:0xc0b8a8,nuts:3,lv:'2-1',line:'Широкий да плоский — как блин на Масленицу.'},
    {id:'shchuka',name:'Щука',sz:2,col:0x5a7a4a,nuts:4,line:'«По щучьему веленью…» — да это другая сказка!'},
    {id:'som',name:'Сом-усач',sz:2,col:0x4a4a40,nuts:5,lv:'2-3',line:'Старый, мудрый — усами дно метёт.'},
    {id:'osetr',name:'Осётр',sz:2,col:0x7a7a8a,nuts:6,lv:'2-B',line:'Царская рыба — в костяных щитках.'},
    {id:'zolotaya',name:'Золотая рыбка',sz:3,col:0xffc930,lv:'2-3',line:'«Чего тебе надобно?» — спросит да желанье исполнит.'}];
  const RID=[['Сидит дед, во сто шуб одет.<br>Кто его раздевает — тот слёзы проливает.','Лук','Капуста','Репка'],
    ['Красна девица сидит в темнице,<br>а коса — на улице.','Морковка','Свёкла','Редиска'],
    ['Зимой и летом — одним цветом.','Ёлка','Берёза','Дуб'],
    ['Без окон, без дверей —<br>полна горница людей.','Огурец','Избушка','Сундук'],
    ['Маленький, удаленький, сквозь землю прошёл,<br>красну шапочку нашёл.','Гриб','Жёлудь','Червячок'],
    ['Хвост пушистый, мех золотистый,<br>в лесу живёт, в деревне кур крадёт.','Лиса','Белка','Волк','proshka'],
    ['Течёт, течёт — не вытечет;<br>бежит, бежит — не выбежит.','Река','Дождь','Тропинка'],
    ['Без рук, без ног,<br>а ворота отворяет.','Ветер','Кот','Ключ'],
    ['Летом ходит без дороги возле сосен и берёз,<br>а зимой он спит в берлоге, от мороза пряча нос.','Медведь','Ёж','Барсук','potap'],
    ['Не лает, не кусает,<br>а в дом не пускает.','Замок','Пёс','Забор'],
    ['Сердитый недотрога живёт в глуши лесной:<br>иголок очень много, а нитки — ни одной.','Ёж','Ёлка','Швея','yosha'],
    ['Маленькое, кругленькое,<br>а за хвост не поднять.','Клубок','Колобок','Яблоко','clew'],
    ['Днём спит, ночью летает,<br>глазами-плошками всё замечает.','Сова','Летучая мышь','Месяц','pelageya'],
    ['Не огонь, а жжётся.','Крапива','Перец','Солнце'],
    ['Кругла, а не месяц, желта, а не масло,<br>с хвостиком, а не мышь.','Репка','Тыква','Луна'],
    ['Стоит Алёна — платок зелёный,<br>тонкий стан, белый сарафан.','Берёза','Ромашка','Царевна'],
    ['Рассыпался горох<br>на тысячу дорог.','Звёзды','Град','Бусы'],
    ['Нос долог, голос тонок.<br>Кто его убьёт — тот свою кровь прольёт.','Комар','Дятел','Пчела'],
    ['Кто на себе свой дом носит?','Улитка','Медведь','Ёжик'],
    ['Золотое решето<br>чёрных домиков полно.','Подсолнух','Соты','Решето'],
    ['Висит сито —<br>не руками свито.','Паутина','Невод','Гнездо'],
    ['Два брата через дорогу живут,<br>а друг друга не видят.','Глаза','Уши','Ноги'],
    ['Конь стальной,<br>хвост льняной.','Иголка с ниткой','Плуг','Коса'],
    ['Кто приходит, кто уходит —<br>все её за ручку водят.','Дверь','Ложка','Метла'],
    ['Шёл долговяз —<br>в сыру землю увяз.','Дождь','Журавль','Цапля'],
    ['Летит — молчит, лежит — молчит,<br>когда умрёт, тогда заревёт.','Снег','Лист','Перо'],
    ['Сто одёжек —<br>и все без застёжек.','Капуста','Ёлка','Шуба'],
    ['Под землёй птица<br>гнездо свила, яиц нанесла.','Картошка','Крот','Муравей'],
    ['Шумит он в поле и в саду, а в дом не попадёт.<br>И никуда я не иду, покуда он идёт.','Дождь','Гром','Ветер'],
    ['Не рыба, не зверь — на ветвях сидит,<br>косы зелёные гребнем чешет.','Русалка','Кикимора','Водяной']];
  const RID_BARK={proshka:['proshka','Это про меня? Я кур не краду — я их пересчитываю!'],potap:['potap','Про меня! Только я зимой не сплю — у меня походы.'],
    yosha:['yosha','Ниток нет — зато ковшик есть!'],pelageya:['pelageya','Я не пугаю. Я присматриваю.'],clew:['proshka','Клубок Яги! Он и дорогу кажет.']};
  const RECIPES=[{id:'axe',name:'Каша из топора',need:{},nuts:3,once:true,line:'Солдатская хитрость: топор да вода — а каша вышла хоть куда!'},
    {id:'ukha',name:'Уха',need:{fish:2},nuts:5,line:'Наваристая, с дымком от костра.'},
    {id:'gribnaya',name:'Грибная похлёбка',need:{mush:2},nuts:4,line:'Лесом пахнет — до самого донышка.'},
    {id:'kisel',name:'Ягодный кисель',need:{berry:2},nuts:4,line:'Сладкий, густой — хоть ложкой режь.'},
    {id:'rybnik',name:'Рыбник',need:{fish:1,mush:1},nuts:7,pech:true,line:'Печка испекла — корочка румяная.'},
    {id:'pirog',name:'Пирог с ягодами',need:{berry:3},nuts:7,pech:true,line:'«Съешьте моего пирожка!» — Печка зовёт.'}];
  const ING={fish:'рыба',mush:'грибы',berry:'ягоды'};

  /* ---------- левый угол: причал Садко ---------- */
  {const pl=[M(0x9a7048),M(0x8a6240)],post=M(0x6b4a2b);
    for(let z=zS-0.6,i=0;z>zW-7;z-=0.55,i++)addMesh(new THREE.BoxGeometry(2.4,0.12,0.48),pl[i%2],PX,0.24,z-0.24);
    for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.22,0.2,zS-zW+6.6),post,PX+s*0.9,0.08,(zS+zW-7.6)/2);
    for(let z=zW+0.2;z>=zW-7.1;z-=2.3)for(const s of[-1,1]){addMesh(new THREE.CylinderGeometry(0.14,0.16,3.3,7),post,PX+s*1.18,-0.95,z);addMesh(new THREE.CylinderGeometry(0.07,0.07,0.75,6),post,PX+s*1.22,0.65,z);}
    for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.08,0.08,7.4),post,PX+s*1.22,0.98,zW-3.45);addMesh(new THREE.BoxGeometry(2.5,0.08,0.08),post,PX,0.98,zW-7.1);
    // фонарь в конце причала и доска «Рыбий альбом» у входа
    addMesh(new THREE.CylinderGeometry(0.06,0.07,2.2,6),post,PX+1.22,1.1,zW-7.0);addMesh(new THREE.SphereGeometry(0.2,10,8),MB(0xffe08a,{transparent:true,opacity:0.9}),PX+1.22,2.3,zW-7.0).castShadow=false;
    const bd=new THREE.Group();bd.position.set(PX-1.9,0,zS-0.7);bd.rotation.y=0.5;W.group.add(bd);addMesh(new THREE.CylinderGeometry(0.07,0.09,1.6,6),post,0,0.8,0,bd);
    addMesh(new THREE.BoxGeometry(1.3,0.7,0.07),M(0xc8a878),0,1.45,0.05,bd);for(let i=0;i<3;i++){const f=addMesh(new THREE.SphereGeometry(0.1,8,6),M([0xd8a840,0x6a9a4a,0x5a7a4a][i]),-0.38+i*0.38,1.47,0.1,bd);f.scale.set(1.6,0.8,0.4);}
    colBox(PX-1.2,PX+1.2,-3,0.3,zW-7.1,zS-0.4,false);
    colBox(PX-1.32,PX-1.12,-3,1.4,zW-7.25,zW+0.25,false);colBox(PX+1.12,PX+1.32,-3,1.4,zW-7.25,zW+0.25,false);colBox(PX-1.32,PX+1.32,-3,1.4,zW-7.35,zW-7.12,false);
    W.cyls.push({x:PX-1.9,z:zS-0.7,r:0.2,miny:-1,maxy:1.8,on:true});
    lcKit([{name:'reeds',v:0,x:PX-4.2,y:0,z:zW+0.6,s:1.1,ry:0.4},{name:'reeds',v:1,x:PX+3.6,y:0,z:zW+0.5,s:1,ry:2},{name:'reeds',v:0,x:PX-6.4,y:0,z:zW+0.9,s:0.9,ry:1},
      {name:'lily',v:0,x:PX-3.4,y:SEA+0.02,z:zW-2.2,s:1.2,ry:0},{name:'lily',v:1,x:PX+3.1,y:SEA+0.02,z:zW-4.4,s:1,ry:1},{name:'lily',v:0,x:PX-2.6,y:SEA+0.02,z:zW-6.2,s:0.9,ry:2},
      {name:'barrel',v:0,x:PX+1.9,y:0,z:zS-0.5,s:1,ry:0.3},{name:'crate',v:0,x:PX+2.2,y:0,z:zS+0.4,s:0.9,ry:0.8}]);}
  {const r=addMesh(new THREE.DodecahedronGeometry(1.3,0),M(0x9a8a74),-9,SEA+0.3,zW-9);r.scale.set(1.2,0.9,1);r.rotation.y=0.6;}
  // лодочка у причала — качается на волне
  const boat=new THREE.Group();boat.position.set(PX-3.3,SEA+0.05,zW-3.6);boat.rotation.y=0.25;W.group.add(boat);
  {const wd=M(0x8a5a32);addMesh(new THREE.BoxGeometry(1.1,0.36,2.4),wd,0,0.1,0,boat);const bw=new THREE.ConeGeometry(0.56,0.9,4);bw.rotateX(-Math.PI/2);bw.rotateZ(Math.PI/4);const b=addMesh(bw,wd,0,0.1,-1.62,boat);b.scale.set(1,0.48,1);
    addMesh(new THREE.BoxGeometry(1.0,0.06,0.3),M(0xb08050),0,0.3,0.2,boat);for(const s of[-1,1]){const o=addMesh(new THREE.BoxGeometry(0.06,0.06,1.7),M(0x6b4a2b),s*0.7,0.32,0.1,boat);o.rotation.y=s*0.35;}}
  // поплавок, леска, удочка, рыбка
  const flt=new THREE.Group();W.group.add(flt);addMesh(new THREE.SphereGeometry(0.11,10,8),M(0xd8302a,{emissive:0x601010,emissiveIntensity:0.3}),0,0.07,0,flt);addMesh(new THREE.SphereGeometry(0.1,10,8),M(0xf4f0e8),0,-0.05,0,flt);flt.visible=false;
  const lineM=new THREE.Mesh(new THREE.CylinderGeometry(0.008,0.008,1,4),MB(0xf0f0f0));lineM.castShadow=false;W.group.add(lineM);lineM.visible=false;
  const rodG=new THREE.CylinderGeometry(0.02,0.035,2.4,6);rodG.translate(0,1.2,0);const rod=new THREE.Mesh(rodG,M(0x8a6a3a));rod.castShadow=false;
  function makeFish(f){const g=new THREE.Group();W.group.add(g);const s=[0.55,0.8,1.15,0.8][f.sz],m=M(f.col,f.id==='zolotaya'?{emissive:0xc08000,emissiveIntensity:0.6}:{});
    const b=part(g,new THREE.SphereGeometry(0.2*s,10,8),m,0,0,0);b.scale.set(0.55,1,2.1);const t=new THREE.ConeGeometry(0.16*s,0.3*s,4);t.rotateX(-Math.PI/2);const tl=part(g,t,m,0,0,-0.5*s);tl.scale.set(0.3,1.2,1);
    for(const x of[-1,1])part(g,new THREE.SphereGeometry(0.03*s,6,5),MAT.dark,x*0.1*s,0.06*s,0.28*s);if(f.id==='som')for(const x of[-1,1]){const w=part(g,new THREE.CylinderGeometry(0.008,0.008,0.4*s,4),MAT.dark,x*0.12*s,-0.04*s,0.42*s);w.rotation.x=1.2;w.rotation.z=x*0.5;}
    return g;}
  let sadko=null;if(done('2-1')&&typeof makeSadko==='function'){try{sadko=makeSadko();sadko.g.position.set(PX+2.6,0,zS-1.5);sadko.g.rotation.y=-2.2;W.cyls.push({x:PX+2.6,z:zS-1.5,r:0.45,miny:-1,maxy:2,on:true});}catch(e){sadko=null;}}

  /* ---------- левый угол: ветла и русалка на ветвях ---------- */
  const TX=-27.2,TZ=zS+3.4,BR=new V3(0.78,0,-0.62).normalize(),MER=new V3(TX+BR.x*2.2,3.05,TZ+BR.z*2.2),RIDP=new V3(TX+BR.x*2.1,0,TZ+BR.z*2.1+1.2);
  {const wm=W.group.children.length,bark=M(0x6b4a30),lf=[M(0x6aa040),M(0x7ab850),M(0x5a9038)];const tr=addMesh(new THREE.CylinderGeometry(0.5,0.8,4.4,9),bark,TX,2.2,TZ);tr.rotation.z=0.06;
    const bg=new THREE.CylinderGeometry(0.2,0.32,3.4,8);bg.rotateZ(-Math.PI/2);bg.translate(1.7,0,0);const b=addMesh(bg,bark,TX,2.75,TZ);b.rotation.y=Math.atan2(-BR.z,BR.x);b.rotation.z=0.08;
    for(let i=0;i<7;i++){const a=i/7*Math.PI*2;addMesh(new THREE.SphereGeometry(rand(1.3,1.8),9,7),lf[i%3],TX+Math.cos(a)*1.5,rand(4.8,5.9),TZ+Math.sin(a)*1.5);}
    addMesh(new THREE.SphereGeometry(1.9,10,8),lf[0],TX,6.3,TZ);
    for(let i=0;i<16;i++){const a=i/16*Math.PI*2+0.2,r=rand(2.2,2.9);const c=new THREE.ConeGeometry(0.28,rand(1.8,2.8),5);c.rotateX(Math.PI);const m=addMesh(c,lf[(i+1)%3],TX+Math.cos(a)*r,rand(3.6,4.3),TZ+Math.sin(a)*r);m.castShadow=false;}
    W.cyls.push({x:TX,z:TZ,r:0.8,miny:-1,maxy:6.5,on:true});fadeable(since(wm));
    // камень-скамья под русалкой и кувшинки у берега
    const st=addMesh(new THREE.DodecahedronGeometry(0.55,0),M(0xa8a090),RIDP.x+0.9,0.25,RIDP.z+0.5);st.scale.set(1.5,0.55,1);
    lcKit([{name:'lily',v:1,x:TX+3.2,y:SEA+0.02,z:zW-1.4,s:1.1,ry:0.5},{name:'log',v:0,x:TX-1.6,y:0,z:TZ+2.4,s:1,ry:0.9},{name:'boletus',v:0,x:TX+0.9,y:0,z:TZ+1.1,s:1,ry:0}]);}
  function makeMermaid(){const g=new THREE.Group();W.group.add(g);const skin=M(0xf6d2b8),hair=M(0x3fa58c),tm=M(0x2fb0a8,{emissive:0x0a4a48,emissiveIntensity:0.35}),fin=M(0x7fe0d0,{emissive:0x1a6a60,emissiveIntensity:0.3}),top=M(0x9ad8f0),pearl=M(0xfff8f0,{emissive:0x605850,emissiveIntensity:0.4});
    const body=new THREE.Group();g.add(body);const tail=[];let par=body;
    for(let i=0;i<5;i++){const s=new THREE.Group();s.position.set(0,i?-0.27:0,0);par.add(s);const m=part(s,new THREE.SphereGeometry(0.17-i*0.024,10,8),tm,0,-0.14,0);m.scale.set(1,1.5,0.85);tail.push(s);par=s;}
    for(const s of[-1,1]){const f=new THREE.ConeGeometry(0.13,0.42,6);const m=part(par,f,fin,s*0.13,-0.4,0);m.rotation.z=s*2.5;m.scale.set(1,1,0.35);}
    tail[0].rotation.x=-0.9;
    part(body,new THREE.CylinderGeometry(0.13,0.17,0.42,10),top,0,0.23,0);for(let i=0;i<7;i++)part(body,new THREE.SphereGeometry(0.03,6,5),pearl,Math.cos(i/6*Math.PI)*0.12,0.42-Math.sin(i/6*Math.PI)*0.06,0.08);
    const head=new THREE.Group();head.position.set(0,0.62,0);body.add(head);part(head,new THREE.SphereGeometry(0.17,12,10),skin,0,0,0);
    for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.025,6,5),MAT.dark,s*0.06,0.02,0.15);part(head,new THREE.SphereGeometry(0.03,6,5),M(0xffa0a0),s*0.1,-0.04,0.12);}
    const hb=part(head,new THREE.SphereGeometry(0.2,10,8),hair,0,-0.18,-0.08);hb.scale.set(1.05,2.1,0.7);part(head,new THREE.SphereGeometry(0.18,10,8),hair,0,0.06,-0.02).scale.set(1.05,0.75,1.05);
    const wr=part(head,new THREE.TorusGeometry(0.16,0.03,6,16),M(0x5a9a48),0,0.11,0);wr.rotation.x=Math.PI/2;for(let i=0;i<5;i++){const a=i/5*Math.PI*2;part(head,new THREE.SphereGeometry(0.045,6,5),M(0xfff8f0),Math.cos(a)*0.16,0.14,Math.sin(a)*0.16);part(head,new THREE.SphereGeometry(0.02,5,4),M(0xffd23a),Math.cos(a)*0.17,0.17,Math.sin(a)*0.17);}
    const arms=[];for(const s of[-1,1]){const a=new THREE.Group();a.position.set(s*0.17,0.4,0);body.add(a);const m=part(a,new THREE.CylinderGeometry(0.035,0.04,0.36,6),skin,0,-0.17,0);arms.push(a);a.rotation.z=s*0.4;}
    const comb=part(arms[1],new THREE.BoxGeometry(0.14,0.05,0.03),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6}),0,-0.36,0.03);
    return {g,body,head,tail,arms,comb};}
  const mer=makeMermaid();mer.g.position.copy(MER);mer.g.scale.setScalar(1.35);mer.g.rotation.y=Math.atan2(RIDP.x-MER.x,RIDP.z-MER.z);

  /* ---------- правый угол: вышка-дозор ---------- */
  const TWX=25,TWZ=zW+2.2,EYE=new V3(TWX,7.1,TWZ),TWB=new V3(TWX,0,TWZ+2.4);
  {const tm0=W.group.children.length,lg=M(0x7a5634),dk=M(0x5a3a22);for(const sx of[-1,1])for(const sz of[-1,1]){addMesh(new THREE.CylinderGeometry(0.16,0.2,5.6,7),lg,TWX+sx*1.3,2.8,TWZ+sz*1.3);W.cyls.push({x:TWX+sx*1.3,z:TWZ+sz*1.3,r:0.24,miny:-1,maxy:5.6,on:true});
      addMesh(new THREE.CylinderGeometry(0.08,0.08,2.4,6),lg,TWX+sx*1.3,6.8,TWZ+sz*1.3);}
    for(const y of[1.6,3.6])for(const s of[-1,1]){const a=addMesh(new THREE.BoxGeometry(2.7,0.1,0.1),dk,TWX,y,TWZ+s*1.3);a.rotation.z=s*0.6;const b=addMesh(new THREE.BoxGeometry(0.1,0.1,2.7),dk,TWX+s*1.3,y,TWZ);b.rotation.x=s*0.6;}
    box(TWX-1.7,TWX+1.7,5.3,5.6,TWZ-1.7,TWZ+1.7,M(0x9a7048),{occ:false});
    for(const s of[-1,1]){addMesh(new THREE.BoxGeometry(3.4,0.08,0.08),dk,TWX,6.3,TWZ+s*1.66);addMesh(new THREE.BoxGeometry(0.08,0.08,3.4),dk,TWX+s*1.66,6.3,TWZ);}
    const rf=new THREE.ConeGeometry(2.6,1.5,4);rf.rotateY(Math.PI/4);addMesh(rf,M(0xb8401e),TWX,8.75,TWZ);addMesh(new THREE.CylinderGeometry(0.03,0.03,1.1,4),dk,TWX,10,TWZ);
    const fl=addMesh(new THREE.BoxGeometry(0.6,0.34,0.02),M(0xffd23a),TWX+0.3,10.35,TWZ);fl.castShadow=false;
    for(const s of[-0.36,0.36])addMesh(new THREE.BoxGeometry(0.07,5.6,0.07),dk,TWX+s,2.75,TWZ+1.75);for(let y=0.4;y<5.4;y+=0.45)addMesh(new THREE.BoxGeometry(0.72,0.06,0.07),dk,TWX,y,TWZ+1.75);
    const sg=addMesh(new THREE.CylinderGeometry(0.07,0.11,0.9,10),M(0xc8a040,{emissive:0x604010,emissiveIntensity:0.3}),TWX,6.25,TWZ-1.35);sg.rotation.x=Math.PI/2-0.3;
    fadeable(since(tm0));const bk=new THREE.Group();bk.position.set(TWX+2.6,0,TWZ+2.8);bk.rotation.y=-0.4;W.group.add(bk);addMesh(new THREE.CylinderGeometry(0.06,0.08,1.0,6),dk,0,0.5,0,bk);
    const bkb=addMesh(new THREE.BoxGeometry(0.6,0.08,0.45),M(0x8a2a20),0,1.05,0,bk);bkb.rotation.x=-0.4;addMesh(new THREE.BoxGeometry(0.5,0.02,0.38),M(0xf4ecd8),0,1.1,0.02,bk).rotation.x=-0.4;
    W.cyls.push({x:TWX+2.6,z:TWZ+2.8,r:0.3,miny:-1,maxy:1.1,on:true});}

  /* ---------- правый угол: Скала Ветрила, восходящий поток, шпиль с гнездом ---------- */
  const RZ=zS+8,TOP=new V3(28.9,5.2,RZ-4.0),UPD=new V3(21.9,0,RZ-3.0),SPIRE=new V3(21.7,0,RZ-5.9),SPH=8.0;
  {const rk=[M(0xa89880),M(0x9a8a74),M(0xb8a890),M(0x8a7a66)];
    [[23.6,30,RZ-2.5,RZ+2.5,1.3],[25.2,30,RZ-4.0,RZ+1.4,2.6],[26.6,30,RZ-5.4,RZ+0.2,3.9],[27.8,30,RZ-6.6,RZ-1.4,5.2]].forEach((r,i)=>{box(r[0],r[1],-0.5,r[4],r[2],r[3],rk[i],{occ:false});
      for(let k=0;k<3;k++){const b=addMesh(new THREE.DodecahedronGeometry(rand(0.35,0.6),0),rk[(i+k)%4],r[0]+rand(0.1,0.4),r[4]-rand(0.4,0.9),lerp(r[2],r[3],(k+0.5)/3));b.rotation.set(rand(0,3),rand(0,3),0);}});
    // лицо Ветрила на камне: щёки надуты (после 3-2 — просыпается и дует)
    const fc=new THREE.Group();fc.position.set(26.55,3.0,RZ-2.6);fc.rotation.y=-Math.PI/2;W.group.add(fc);W.vetFace=fc;
    const fm=M(0xc8b8a0);part(fc,new THREE.CircleGeometry(0.9,14),fm,0,0,0.02);for(const s of[-1,1]){part(fc,new THREE.SphereGeometry(0.32,10,8),M(0xd8b8a8),s*0.42,-0.18,0.12).scale.set(1,1,0.6);
      const e=part(fc,new THREE.SphereGeometry(0.1,8,6),MAT.dark,s*0.3,0.25,0.12);e.scale.y=0.3;e.name='eye';const br=part(fc,new THREE.BoxGeometry(0.34,0.06,0.05),M(0x6a5a4a),s*0.3,0.45,0.12);br.rotation.z=-s*0.25;}
    const mo=part(fc,new THREE.TorusGeometry(0.11,0.05,6,12),M(0x8a5a5a),0,-0.32,0.14);mo.name='mouth';
    // поток: прозрачный столб, вихрь листьев; у основания — круг камней и вертушка
    const col=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.2,9,18,1,true),MB(0xdff4ff,{transparent:true,opacity:0.12,side:THREE.DoubleSide,depthWrite:false}));col.position.set(UPD.x,4.5,UPD.z);col.castShadow=false;W.group.add(col);
    for(let i=0;i<9;i++){const a=i/9*Math.PI*2;const s=addMesh(new THREE.DodecahedronGeometry(0.22,0),rk[i%4],UPD.x+Math.cos(a)*1.45,0.1,UPD.z+Math.sin(a)*1.45);s.scale.y=0.5;}
    const pw=new THREE.Group();pw.position.set(UPD.x+1.6,1.1,UPD.z+0.8);W.group.add(pw);addMesh(new THREE.CylinderGeometry(0.03,0.03,1.1,4),M(0x6b4a2b),0,-0.55,0,pw);
    const wh=new THREE.Group();wh.position.z=0.05;pw.add(wh);for(let i=0;i<4;i++){const b=addMesh(new THREE.BoxGeometry(0.08,0.36,0.02),M([0xd8302a,0xffd23a,0x3a6ad0,0x3f8a45][i]),0,0.18,0,wh);b.parent.remove(b);const q=new THREE.Group();q.rotation.z=i*Math.PI/2;q.add(b);wh.add(q);}
    W.updraft={col,wh,leaves:[],rings:[]};for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(1.1,0.045,6,26),MB(0xffffff,{transparent:true,opacity:0.4,depthWrite:false}));r.rotation.x=Math.PI/2;r.castShadow=false;W.group.add(r);W.updraft.rings.push({m:r,y:i*2.2});}for(let i=0;i<10;i++){const l=addMesh(new THREE.PlaneGeometry(0.16,0.1),M([0x7ab850,0xffd23a,0xd8743a][i%3],{side:THREE.DoubleSide}),UPD.x,0,UPD.z);l.castShadow=false;W.updraft.leaves.push({m:l,a:rand(0,6.3),y:rand(0,8.5),r:rand(0.4,1.0),s:rand(1.6,2.6)});}
    // шпиль и гнездо
    {const sm=W.group.children.length;for(let i=0;i<5;i++){const r=0.92-i*0.09,b=addMesh(new THREE.CylinderGeometry(r*0.82,r,1.62,7),rk[(i+2)%4],SPIRE.x+Math.sin(i*1.7)*0.07,0.8+i*1.6,SPIRE.z+Math.cos(i*1.3)*0.07);b.rotation.y=i*0.7;}
      for(let i=0;i<7;i++){const a=i*0.9,b=addMesh(new THREE.DodecahedronGeometry(rand(0.22,0.38),0),rk[i%4],SPIRE.x+Math.cos(a)*(0.82-i*0.05),0.4+i*1.05,SPIRE.z+Math.sin(a)*(0.82-i*0.05));b.rotation.set(rand(0,3),rand(0,3),0);}fadeable(since(sm));}W.cyls.push({x:SPIRE.x,z:SPIRE.z,r:0.95,miny:-1,maxy:SPH,on:true});
    const ns=addMesh(new THREE.TorusGeometry(0.42,0.14,6,12),M(0x8a6a3a),SPIRE.x,SPH+0.1,SPIRE.z);ns.rotation.x=Math.PI/2;
    W.nest=[];for(let i=0;i<3;i++){const n=addMesh(new THREE.SphereGeometry(0.13,8,6),M(0xc8843a,{emissive:0x603010,emissiveIntensity:0.3}),SPIRE.x+Math.cos(i*2.1)*0.15,SPH+0.22,SPIRE.z+Math.sin(i*2.1)*0.15);W.nest.push(n);}
    lcKit([{name:'rock',v:0,x:23.0,y:0,z:RZ+3.6,s:1.3,ry:0.4},{name:'rock',v:1,x:29.2,y:0,z:RZ+4.0,s:1.1,ry:2},{name:'boulders',v:0,x:24.4,y:0,z:zW+0.8,s:0.9,ry:1.2}]);}
  // воздушный змей: в мини-игре летает над скалой, после первого полёта остаётся привязан на вершине
  const kite=new THREE.Group();W.group.add(kite);
  {const sh=new THREE.Shape();sh.moveTo(0,0.85);sh.lineTo(0.62,0.12);sh.lineTo(0,-0.95);sh.lineTo(-0.62,0.12);sh.lineTo(0,0.85);
    kite.add(new THREE.Mesh(new THREE.ShapeGeometry(sh),M(0xd8302a,{side:THREE.DoubleSide,emissive:0x400800,emissiveIntensity:0.25})));
    const sun=new THREE.Mesh(new THREE.CircleGeometry(0.26,14),M(0xffd23a,{side:THREE.DoubleSide,emissive:0x806010,emissiveIntensity:0.4}));sun.position.set(0,0.05,0.01);kite.add(sun);
    for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.CircleGeometry(0.035,6),MB(0x2a1a10));e.position.set(s*0.09,0.1,0.02);kite.add(e);}
    const cr=new THREE.Mesh(new THREE.BoxGeometry(1.24,0.03,0.02),M(0x6b4a2b));cr.position.y=0.12;kite.add(cr);const cr2=new THREE.Mesh(new THREE.BoxGeometry(0.03,1.8,0.02),M(0x6b4a2b));cr2.position.y=-0.05;kite.add(cr2);}
  const kTail=[];for(let i=0;i<6;i++){const b=addMesh(new THREE.BoxGeometry(0.22,0.1,0.04),M([0x3a6ad0,0xffd23a,0x3f8a45][i%3],{side:THREE.DoubleSide}),0,0,0);b.castShadow=false;kTail.push(b);}
  const kLine=new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.01,1,4),MB(0xf4ecd8));kLine.castShadow=false;W.group.add(kLine);
  const kitePark=()=>{const on=(LC.kite.n||0)>0;kite.visible=on;kLine.visible=on;kTail.forEach(b=>b.visible=on);};kitePark();

  /* ---------- правый угол: избушка на курьих ножках, кухня Яги, ягодные кусты ---------- */
  const HX=19.6,HZ=zS+16,FACE=Math.atan2(0-HX,-7-HZ),FW=new V3(Math.sin(FACE),0,Math.cos(FACE)),SD=new V3(Math.cos(FACE),0,-Math.sin(FACE));
  const at=(f,s)=>new V3(HX+FW.x*f+SD.x*s,0,HZ+FW.z*f+SD.z*s);
  const hutO=makeHut();hutO.g.position.set(HX,0,HZ);fadeable(hutO.g);const hutLegC=[{x:0,z:0,r:0.26,miny:-1,maxy:2.3,on:true},{x:0,z:0,r:0.26,miny:-1,maxy:2.3,on:true}];
  W.cyls.push(hutLegC[0],hutLegC[1],{x:HX,z:HZ,r:1.9,miny:1.95,maxy:6.2,on:true});
  const hutFront=()=>LC.hutT===trip;let hutAng=hutFront()?FACE:FACE+Math.PI;hutO.g.rotation.y=hutAng;
  const hutLegs=()=>{hutO.legs.forEach((l,i)=>{const p=new V3();l.getWorldPosition(p);hutLegC[i].x=p.x;hutLegC[i].z=p.z;});};hutLegs();
  if(hutFront()){hutO.door.rotation.y=-1.2;}
  const KIT_C=at(2.7,-1.6);let yagaC=null;
  let yaga=null;if(typeof makeYaga==='function'){try{yaga=makeYaga();const p=at(2.2,1.3);yaga.g.position.copy(p);yaga.g.rotation.y=FACE;yaga.g.visible=hutFront();yagaC={x:p.x,z:p.z,r:0.42,miny:-1,maxy:1.9,on:hutFront()};W.cyls.push(yagaC);}catch(e){yaga=null;}}
  let pech=null;if(done('3-5')&&typeof makePechka==='function'){try{pech=makePechka();const p=at(0.6,-3.2);pech.g.position.copy(p);pech.g.rotation.y=FACE+0.5;W.cyls.push({x:p.x,z:p.z,r:0.8,miny:-1,maxy:1.8,on:true});}catch(e){pech=null;}}
  const pot={};{const g=new THREE.Group();g.position.copy(KIT_C);W.group.add(g);pot.g=g;const ir=M(0x3a3a40);
    for(let i=0;i<3;i++){const a=i/3*Math.PI*2;const l=addMesh(new THREE.CylinderGeometry(0.03,0.03,1.5,4),ir,Math.cos(a)*0.45,0.7,Math.sin(a)*0.45,g);l.rotation.set(Math.sin(a)*0.3,0,-Math.cos(a)*0.3);}
    const k=new THREE.SphereGeometry(0.42,12,8,0,Math.PI*2,Math.PI*0.42,Math.PI*0.58);addMesh(k,ir,0,0.72,0,g);pot.soup=addMesh(new THREE.CircleGeometry(0.36,14),M(0xc89a4a,{emissive:0x402008,emissiveIntensity:0.3}),0,0.86,0,g);pot.soup.rotation.x=-Math.PI/2;
    pot.fire=[];for(let i=0;i<3;i++){const f=addMesh(new THREE.ConeGeometry(0.16,0.5,5),MB([0xff8a20,0xffc040,0xff5a10][i],{transparent:true,opacity:0.9}),Math.cos(i*2.1)*0.14,0.22,Math.sin(i*2.1)*0.14,g);f.castShadow=false;pot.fire.push(f);}
    for(let i=0;i<4;i++){const l=addMesh(new THREE.CylinderGeometry(0.06,0.06,0.7,5),M(0x6b4a2b),0,0.05,0,g);l.rotation.set(Math.PI/2,i*0.8,0);}
    pot.ladle=new THREE.Group();pot.ladle.position.set(0,0.9,0);g.add(pot.ladle);const ld=addMesh(new THREE.CylinderGeometry(0.025,0.025,0.9,5),M(0x8a6a3a),0.18,0.25,0,pot.ladle);ld.rotation.z=-0.35;
    W.cyls.push({x:KIT_C.x,z:KIT_C.z,r:0.55,miny:-1,maxy:1.0,on:true});
    lcKit([{name:'firewood',v:0,...at(-0.4,2.6),s:0.9,ry:FACE},{name:'pot',v:0,...at(1.6,2.7),s:1,ry:0},{name:'basket',v:0,...at(2.0,2.4),s:0.9,ry:1}]);}
  const BUSH=[new V3(24.4,0,RZ+4.6),new V3(27.6,0,RZ+5.2),new V3(17.4,0,RZ+0.6)],bushB=[];
  BUSH.forEach((p,i)=>{const g=new THREE.Group();g.position.copy(p);W.group.add(g);for(let k=0;k<4;k++)addMesh(new THREE.SphereGeometry(rand(0.38,0.52),8,6),M([0x4a8a3a,0x5a9a44][k%2]),Math.cos(k*1.7)*0.35,0.4+k%2*0.15,Math.sin(k*1.7)*0.35,g);
    const bb=[];for(let k=0;k<7;k++)bb.push(addMesh(new THREE.SphereGeometry(0.07,6,5),M(0xd8203a,{emissive:0x500010,emissiveIntensity:0.3}),Math.cos(k*2.4)*0.5,0.45+Math.sin(k*1.3)*0.25,Math.sin(k*2.4)*0.5,g));bushB.push(bb);
    W.cyls.push({x:p.x,z:p.z,r:0.65,miny:-1,maxy:0.9,on:true});});
  const berryOn=i=>!LC.berryGot.includes(i);const berryDraw=()=>bushB.forEach((bb,i)=>bb.forEach(b=>{b.visible=berryOn(i);}));berryDraw();
  // грибы: каждый поход вырастают в четырёх местах из семи
  const MUSH=[new V3(-28.6,0,zS+8),new V3(-25.4,0,zS+11.5),new V3(-18.2,0,zS+4.6),new V3(-29,0,zS+16),new V3(16.4,0,zS+4.4),new V3(28.6,0,zS+17),new V3(23.6,0,zS+21.5)];
  const mushOn=i=>((i*5+trip*3)%7)<4&&!LC.mushGot.includes(i);
  const mushM=MUSH.map((p,i)=>{const g=new THREE.Group();g.position.copy(p);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.06,0.08,0.22,6),M(0xf4ecd8),0,0.11,0,g);
    const c=addMesh(new THREE.SphereGeometry(0.16,8,6,0,Math.PI*2,0,Math.PI/2),M(0x8a4a20),0,0.2,0,g);c.scale.y=0.8;addMesh(new THREE.CylinderGeometry(0.04,0.06,0.16,5),M(0xf4ecd8),0.17,0.08,0.06,g);
    const c2=addMesh(new THREE.SphereGeometry(0.1,8,6,0,Math.PI*2,0,Math.PI/2),M(0x9a5a28),0.17,0.15,0.06,g);c2.scale.y=0.8;g.visible=mushOn(i);return g;});

  /* ---------- невиданные звери: по одному на место, места меняются от похода к походу ---------- */
  const BEASTS=[
    {id:'zayac',name:'Заяц-побегаец',where:'в траве',line:'Уши торчком, хвостик клочком — скок да поскок.',mk:()=>typeof makeHare==='function'&&makeHare(),aim:0.5,
      spots:[[-6,0,9],[14,0,10],[-24,0,zS+13],[26,0,zS+20]],tick:(o,t,p)=>{const k=(t*0.8)%4;o.g.position.set(p.x+Math.sin(t*0.4)*1.5,Math.abs(Math.sin(t*5))*0.25,p.z+Math.cos(t*0.4)*1.5);o.g.rotation.y=t*0.4+Math.PI/2;}},
    {id:'utka',name:'Уточка',where:'на воде',line:'Плывёт, ныряет — в Буяне иглу стережёт.',mk:()=>typeof makeDuck==='function'&&makeDuck(),aim:0.3,
      spots:[[8,SEA,zW-6],[-12,SEA,zW-5],[16,SEA,zW-8]],tick:(o,t,p)=>{o.g.position.set(p.x+Math.cos(t*0.35)*1.8,SEA+Math.sin(t*2)*0.03,p.z+Math.sin(t*0.35)*1.8);o.g.rotation.y=-t*0.35;}},
    {id:'kolobok',lv:'1-3',name:'Колобок',where:'на песке у моря',line:'Я от бабушки ушёл… а в Лукоморье — пришёл!',mk:()=>typeof makeKolobok==='function'&&makeKolobok(),aim:0.4,
      spots:[[0,0,(zS+zW)/2]],tick:(o,t,p)=>{const x=Math.sin(t*0.22)*15;o.g.position.set(x,0,p.z+2.4*Math.max(0,1-Math.abs(x)/5.5));o.g.rotation.y=Math.cos(t*0.22)>0?Math.PI/2:-Math.PI/2;}},
    {id:'kiki',lv:'1-5',name:'Кикимора',where:'в камышах',line:'Прялку отдала — теперь камыши расчёсывает.',mk:()=>typeof makeKikimora==='function'&&makeKikimora(),aim:1.0,
      spots:[[PX-5.2,0,zW+0.9],[TX-1.4,0,TZ+2.6]],tick:(o,t,p)=>{o.g.position.set(p.x,Math.max(0,Math.sin(t*0.5))*0.15-0.1,p.z);o.g.rotation.y=Math.sin(t*0.3)*0.8;}},
    {id:'leshy',lv:'1-B',name:'Леший',where:'за деревьями',line:'Ёлкой прикинется — поди разгляди.',mk:()=>typeof makeLeshy==='function'&&makeLeshy(0.8),aim:1.6,
      spots:[[TX-1.3,0,TZ-0.9],[29.2,0,zS+19],[-29.2,0,-2]],tick:(o,t,p)=>{o.g.position.set(p.x+Math.sin(t*0.3)*0.4,0,p.z);o.g.rotation.y=Math.atan2(TWX-p.x,TWZ-p.z)+Math.sin(t*0.6)*0.4;}},
    {id:'kit',lv:'2-2',name:'Чудо-юдо Рыба-кит',where:'далеко в море',line:'Поперёк моря лежит — на спине деревня стоит.',mk:()=>typeof makeWhale==='function'&&makeWhale(14,{awake:true}),aim:1.0,
      spots:[[0,SEA-0.6,zW-58],[-42,SEA-0.6,zW-46],[38,SEA-0.6,zW-50]],tick:(o,t,p,b)=>{o.g.position.set(p.x+Math.sin(t*0.05)*6,p.y+Math.sin(t*0.4)*0.5,p.z);o.g.rotation.y=Math.PI/2+Math.sin(t*0.05)*0.3;
        if((b.spT=(b.spT||0)-1/60)<0){b.spT=rand(3,5);for(let i=0;i<10;i++)later(i*0.05,()=>burst(o.g.position.clone().add(new V3(0,1.8+i*0.4,0)),0xdff4ff,4,2));SFX.water();}}},
    {id:'zhar',lv:'3-1',name:'Жар-птица',where:'на крыше избы',line:'Перо обронит — светло, как днём.',mk:()=>typeof makeFirebird==='function'&&makeFirebird(),aim:0.5,
      spots:[[-12,4.25,-4],[12.5,4.25,-3],[TOP.x,TOP.y,TOP.z]],tick:(o,t,p)=>{o.g.position.set(p.x,p.y+Math.abs(Math.sin(t*1.3))*0.1,p.z);o.g.rotation.y=Math.sin(t*0.5)*1.2;}},
    {id:'pushok',lv:'3-2',name:'Пушок-ягнёнок',where:'на лугу',line:'Облачный барашек — на пружинке прыг!',mk:()=>typeof makeSheep==='function'&&makeSheep(),aim:0.6,
      spots:[[-4,0,9.5],[-22,0,zS+15],[26.2,2.6,RZ-1.2]],tick:(o,t,p)=>{o.g.position.set(p.x,p.y+Math.max(0,Math.sin(t*3))*0.3,p.z);o.g.rotation.y=t*0.2;}},
    {id:'sirin',lv:'3-3',name:'Сирин',where:'на морском камне',line:'Запоёт — заслушаешься до вечера.',mk:()=>typeof makeSirin==='function'&&makeSirin('sirin'),aim:0.8,
      spots:[[-9,1.4,zW-9],[PX+1.22,2.45,zW-7.0]],tick:(o,t,p)=>{o.g.position.set(p.x,p.y+Math.sin(t*1.4)*0.05,p.z);o.g.rotation.y=Math.atan2(TWX-p.x,TWZ-p.z);}},
    {id:'gusi',lv:'3-5',name:'Гуси-лебеди',where:'в небе над морем',line:'Летят, крыльями машут — малышей не трогают больше.',mk:()=>{if(typeof makeGoose!=='function')return null;const g=new THREE.Group();W.group.add(g);const fl=[0,1,2].map(i=>{const q=makeGoose(0.8);g.add(q.g);q.g.position.set(i*1.6-1.6,i===1?0.6:0,i===1?-1.2:0);return q;});return {g,fl};},aim:0.3,
      spots:[[0,9,zW-22]],tick:(o,t,p)=>{const a=t*0.12;o.g.position.set(p.x+Math.cos(a)*18,p.y+Math.sin(t*0.5),p.z+Math.sin(a)*10);o.g.rotation.y=-a;}},
    {id:'gorynych',lv:'4-B',name:'Змей Горыныч',where:'высоко в небе',line:'Был грозой — стал другом: катает, кто попросит.',mk:()=>typeof makeGorynych==='function'&&makeGorynych(),aim:1.5,
      spots:[[10,18,zW-75]],tick:(o,t,p)=>{const a=t*0.06;o.g.scale.setScalar(0.6);o.g.position.set(p.x+Math.cos(a)*26,p.y+Math.sin(t*0.4)*2,p.z+Math.sin(a)*14);o.g.rotation.y=-a;}},
    {id:'lebed',lv:'5-1',name:'Царевна-Лебедь',where:'у причала',line:'Белая, гордая — сундук на дубе указала.',mk:()=>typeof makeSwan5==='function'&&makeSwan5(),aim:0.5,
      spots:[[-14,SEA,zW-9],[PX-4.6,SEA,zW-8]],tick:(o,t,p)=>{o.g.position.set(p.x+Math.sin(t*0.25)*1.4,SEA+0.05,p.z+Math.cos(t*0.25)*0.8);o.g.rotation.y=t*0.25+Math.PI/2;}}];
  const beastOpen=b=>!b.lv||done(b.lv);
  const beasts=[];BEASTS.forEach((b,i)=>{if(!beastOpen(b))return;let o=null;try{o=b.mk();}catch(e){o=null;}if(!o||!o.g)return;const s=b.spots[(trip+i)%b.spots.length];b.p=new V3(s[0],s[1],s[2]);b.o=o;o.g.position.copy(b.p);beasts.push(b);});
  const beastAim=b=>b.o.g.position.clone().add(new V3(0,b.aim,0));

  /* ---------- рыбалка ---------- */
  const FS={on:false};
  const fishOK=f=>!f.lv||done(f.lv);
  function fishStart(pi){const h=active(pi);G.ui='fish';FS.on=true;FS.pi=pi;FS.h=h;FS.ph='cast';FS.t=0;FS.hits=0;FS.beat=-1;FS.fake=0;
    placeOnGround(h,clamp(h.pos.x,PX-0.6,PX+0.6),Math.min(h.pos.z,zW-6.2),0.3);h.face=Math.PI;h.vel.set(0,0,0);h.following=false;
    rod.position.set(0.3,heroHeight(h)*0.55,0.15);rod.rotation.set(0.7,0,0);h.g.add(rod);lineM.visible=true;flt.visible=true;FS.fp=new V3(PX+rand(-0.6,0.6),SEA,zW-9.6);
    const tip0=new V3();rod.updateMatrixWorld(true);rod.localToWorld(tip0.set(0,2.4,0));const from=tip0.clone();anim(0.6,k=>{flt.position.lerpVectors(from,FS.fp,k);flt.position.y+=Math.sin(k*Math.PI)*1.2;});
    later(0.6,()=>{if(!FS.on)return;FS.ph='wait';FS.t=rand(1.6,3.6);FS.fake=rand(0.5,1.2);SFX.water();burst(FS.fp,0xdff4ff,6,1.4);});SFX.whoosh();
    if(sadko)bark(sadko,'sadko',['Рыба на песню идёт — подыграю!','Тихо… клюёт — тяни в лад!','Держи удочку крепче, гость!'][Math.floor(rand(0,3))],2);
    W.camFn=()=>({pos:h.pos.clone().add(new V3(1.7,2.5,3.3)),look:FS.fp.clone().lerp(h.pos,0.4).add(new V3(0,0.5,0)),k:3});G.uiTick=fishTick;hud.style.display='block';hudFish('Ждём поклёвку… '+K(pi,'attack')+' — подсечь, когда поплавок нырнёт · '+K(pi,'guard')+' — смотать удочку');}
  const hudFish=t=>{hud.innerHTML='<div style="position:absolute;left:0;right:0;bottom:22%;text-align:center">'+t+'</div>';};
  function fishEnd(){FS.on=false;if(G.ui==='fish'){G.ui=null;G.uiTick=null;W.camFn=null;}if(rod.parent)rod.parent.remove(rod);lineM.visible=false;flt.visible=false;hudOff();if(FS.ring)FS.ring.visible=false;}
  function fishTick(){const dt=1/60;if(!FS.on)return;const h=FS.h;if(FS.ph==='wait'||FS.ph==='bite')FS.t-=dt;const tip=new V3();rod.updateMatrixWorld(true);rod.localToWorld(tip.set(0,2.4,0));
    if(both(q=>tap(q,'guard'))||pressed.has('Escape')){fishEnd();return;}
    const hit=both(q=>tap(q,'attack'));
    if(FS.ph==='wait'){FS.fake-=dt;let dip=0;if(FS.fake<0&&FS.fake>-0.18)dip=0.06;if(FS.fake<-0.18)FS.fake=rand(0.8,1.6);
      flt.position.set(FS.fp.x,SEA+Math.sin(G.time*3)*0.025-dip,FS.fp.z);
      if(hit){SFX.miss();floatText(FS.fp.clone().add(new V3(0,0.8,0)),'Рано! Рыбка спугнулась','#dddddd');FS.t=rand(1.4,3);}
      if(FS.t<=0){FS.ph='bite';FS.t=0.8;SFX.water();burst(FS.fp,0xdff4ff,10,2);floatText(FS.fp.clone().add(new V3(0,0.9,0)),'Клюёт!','#ffe36b');hudFish('Клюёт! Жми '+K(FS.pi,'attack')+'!');}}
    else if(FS.ph==='bite'){flt.position.set(FS.fp.x,SEA-0.22+Math.sin(G.time*20)*0.04,FS.fp.z);
      if(hit){FS.ph='reel';FS.t=0;FS.beat=-1;FS.res=[];FS.pressed={};SFX.ok();
        if(!FS.ring){FS.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.05,6,28),MB(COL.gold,{transparent:true,opacity:0.9}));FS.ring.rotation.x=Math.PI/2;FS.ring.castShadow=false;W.group.add(FS.ring);}
        FS.ring.visible=true;hudFish((sadko?'Садко играет — ':'')+'тяни в лад: '+K(FS.pi,'attack')+', когда кольцо сожмётся к поплавку'+(G.solo?'':' · вдвоём можно'));}
      else if(FS.t<=0){FS.ph='wait';FS.t=rand(1.6,3.2);SFX.miss();floatText(FS.fp.clone().add(new V3(0,0.8,0)),'Сорвалась!','#dddddd');hudFish('Ждём поклёвку… '+K(FS.pi,'attack')+' — подсечь');}}
    else if(FS.ph==='reel'){const B=0.8;FS.t+=dt;const k=Math.floor(FS.t/B);
      while(FS.beat<k&&FS.beat<3){FS.beat++;if(FS.beat>=1&&FS.beat<=3){const n=[67,71,74][FS.beat-1];if(sadko){gusli(n,0.0,0.18);}else tone(mf(n),0.3,'sine',0.12);}}
      const next=[1,2,3].find(b=>!FS.pressed[b]&&FS.t<b*B+0.3);
      flt.position.set(FS.fp.x,SEA-0.12+Math.sin(G.time*14)*0.05,FS.fp.z);
      if(next!==undefined){const u=clamp((next*B-FS.t)/B,0,1);FS.ring.position.set(FS.fp.x,SEA+0.1,FS.fp.z);FS.ring.scale.setScalar(lerp(0.25,1.8,u));FS.ring.material.color.setHex(u<0.18?0xffffff:COL.gold);}
      if(hit){const b=[1,2,3].find(x=>!FS.pressed[x]&&Math.abs(FS.t-x*B)<0.42);if(b!==undefined){const ok=Math.abs(FS.t-b*B)<=0.22;FS.pressed[b]=true;if(ok){FS.hits++;burst(FS.fp,0xffe060,10,3);FS.fp.lerp(new V3(PX,SEA,zW-7.4),0.3);}else SFX.clink();}}
      for(const b of[1,2,3])if(!FS.pressed[b]&&FS.t>b*B+0.3)FS.pressed[b]=true;
      if(FS.t>3*B+0.5){FS.ring.visible=false;fishLand();}}
    lcLine(lineM,tip,flt.position.clone().add(new V3(0,0.1,0)));}
  function fishLand(){const h=FS.h,n=FS.hits;FS.ph='done';
    if(n===0){SFX.miss();floatText(FS.fp.clone().add(new V3(0,1,0)),'Ушла рыбка… в другой раз!','#dddddd');if(sadko)later(0.4,()=>bark(sadko,'sadko','Не беда — море большое.',1.6));later(1.0,fishEnd);return;}
    const gold=n===3&&done('2-3')&&Math.random()<0.14+0.08*Math.min(3,LC.kind||0);
    const pool=FISH.filter(f=>f.sz===n-1&&fishOK(f));const f=gold?FISH.find(q=>q.id==='zolotaya'):pool[Math.floor(Math.random()*pool.length)];
    if(gold){goldFish();return;}
    const first=!LC.fish[f.id];LC.fish[f.id]=(LC.fish[f.id]||0)+1;LC.bag.fish=Math.min(9,(LC.bag.fish||0)+1);
    const fm=makeFish(f),from=FS.fp.clone(),to=h.pos.clone().add(new V3(0,heroHeight(h)+0.5,0));SFX.water();burst(from,0xdff4ff,14,3);
    anim(0.7,k=>{fm.position.lerpVectors(from,to,k);fm.position.y+=Math.sin(k*Math.PI)*2;fm.rotation.x=k*Math.PI*2;});
    later(0.75,()=>{anim(0.9,k=>{fm.rotation.z=Math.sin(k*20)*0.4;});SFX.ok();banner(f.name+'!','#ffd76a',2.2,(first?'новая рыба в альбоме · ':'')+'в лукошко для Яги · +'+f.nuts+' '+nutW(f.nuts));G.nutsHub=(G.nutsHub||0)+f.nuts;
      if(f.id==='shchuka'&&first)later(0.6,()=>bark(h,h.kind,'Щука! Сейчас как скажет: «По щучьему веленью…»',2.4));else if(sadko)later(0.5,()=>bark(sadko,'sadko',n===3?'Вот это улов!':'Ладно поймана!',1.4));});
    later(2.0,()=>{W.group.remove(fm);fishEnd();});}
  // Золотая рыбка: три желания на выбор (после «Невода», 2-3)
  function goldFish(){const p=FS.fp.clone();let rb=null;try{rb=typeof makeRybka==='function'?makeRybka():null;}catch(e){rb=null;}
    if(rb){rb.g.position.set(p.x,SEA-0.6,p.z);rb.g.scale.setScalar(0.7);rb.g.rotation.y=0;anim(0.8,k=>{rb.g.position.y=lerp(SEA-0.6,SEA+0.35,smooth(k));});}
    SFX.bell();burst(p,0xffd23a,24,4);ringFx(p,COL.gold,2.4);LC.gold=(LC.gold||0)+1;LC.fish.zolotaya=(LC.fish.zolotaya||0)+1;
    later(0.9,()=>{if(rb)bark(rb,'rybka','Отпусти ты, гость, меня в море — дорогой за себя дам откуп!',3);wishOpen(FS.pi,rb);});}
  function wishOpen(pi,rb){if(rod.parent)rod.parent.remove(rod);lineM.visible=false;flt.visible=false;hudOff();FS.on=false;G.ui='wish';let sel=0;
    const pick=()=>{const L=Object.keys(WEAR).filter(id=>!WEAR[id].earn&&!own(id)&&(!WEAR[id].lv||done(WEAR[id].lv))&&(WEAR[id].cost||99)<=15);return L.length?L[Math.floor(Math.random()*L.length)]:null;};
    const opts=['Орешков — полное лукошко!','Обновку из лавки Векши!','Ничего не надо — плыви, рыбка, на волю!'];
    const draw=()=>panel('<h2>Золотая рыбка</h2><div class="step">«Чего тебе надобно?»</div>'+opts.map((o,i)=>'<div class="opt'+(i===sel?' sel':'')+'">'+o+'</div>').join('')+'<div class="hint">'+navKeys(pi)+' — пожелать</div>');
    draw();G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dy){sel=(sel+n.dy+3)%3;SFX.swap();draw();}
      if(tap(q,'jump')){lcClose();W.camFn=null;const P=p0=>(rb?rb.g.position:FS.fp).clone();
        if(sel===0){lcNuts(10,P(),'Золотая рыбка');banner('Орешков — полное лукошко!','#ffd76a',2.2,'+10 '+nutW(10));}
        else if(sel===1){const id=pick();if(id){buyWard(id);banner('Обновка: '+WEAR[id].name+'!','#ffd76a',2.6,'уже в гардеробе — примерочная у лавки Векши');}else{lcNuts(10,P());banner('Всё у вас есть — вот орешки!','#ffd76a',2.2,'+10 '+nutW(10));}}
        else{LC.kind=(LC.kind||0)+1;lcNuts(3,P(),'доброе сердце');if(rb)bark(rb,'rybka','Добрая душа! Буду к вам чаще заплывать.',2.4);}
        SFX.ok();if(rb)later(1.4,()=>{anim(0.8,k=>{rb.g.position.y=lerp(SEA+0.35,SEA-1.2,k);});burst(rb.g.position.clone(),0xffd23a,16,3);later(0.9,()=>W.group.remove(rb.g));});return;}}};}
  function albumOpen(pi){G.ui='album';const L=FISH;
    panel('<h2>Рыбий альбом</h2><div class="step">Поймано рыб: '+L.reduce((a,f)=>a+(LC.fish[f.id]||0),0)+' · в лукошке для Яги: '+(LC.bag.fish||0)+'</div>'+
      L.map(f=>{const n=LC.fish[f.id]||0;return '<div class="opt" style="justify-content:space-between'+(n?'':';opacity:.55')+'"><span>'+(n?'<b style="width:auto">'+f.name+'</b> — '+f.line:fishOK(f)?'??? · '+['мелкая — один раз в лад','средняя — два раза в лад','крупная — три раза в лад','редкая — в лад три раза, да с удачей'][f.sz]:'🔒 после «'+lvN(f.lv)+'»')+'</span><small>'+(n?'× '+n:'')+'</small></div>';}).join('')+
      '<div class="hint">'+K(pi,'guard')+' / '+K(pi,'jump')+' — закрыть</div>');
    G.uiTick=()=>{if(both(q=>tap(q,'guard')||tap(q,'jump'))||pressed.has('Escape'))lcClose();};}

  /* ---------- загадки русалки ---------- */
  function ridOpen(pi){G.ui='rid';const seq=[];let i0=LC.ri||0;for(let k=0;k<3;k++)seq.push((i0+k)%RID.length);LC.ri=(i0+3)%RID.length;
    const S={k:0,sel:0,tries:0,crossed:[],got:0,wait:0};bark({g:mer.g},'rusalka',['Ой, гости! Садитесь под ветлу — загадаю загадку.','Отгадаете три — дам по жемчужинке… то есть по орешку!','Слушайте да думайте!'][Math.floor(rand(0,3))],2.4);
    const PERM=[[0,1,2],[1,2,0],[2,0,1],[1,0,2],[2,1,0],[0,2,1]],order=idx=>PERM[(idx*5+3)%6];
    const draw=()=>{const r=RID[seq[S.k]],ord=order(seq[S.k]);panel('<h2>Русалка загадывает</h2><div class="step">Загадка '+(S.k+1)+' из 3</div><div style="text-align:center;font:700 19px Georgia,serif;margin:6px 0 10px;color:#2a4a44">'+r[0]+'</div>'+
      ord.map((j,i)=>'<div class="opt'+(i===S.sel?' sel':'')+'"'+(S.crossed.includes(j)?' style="opacity:.4;text-decoration:line-through"':'')+'>'+r[1+j]+'</div>').join('')+'<div class="hint">'+navKeys(UW(pi))+' — ответить · '+K(pi,'guard')+' — уйти</div>');};
    draw();
    G.uiTick=()=>{if(S.wait>0){S.wait-=1/60;if(S.wait<=0){if(S.k>=3){lcClose();return;}draw();}return;}
      for(const q of[0,1]){const n=uiNav(q);if(n.dy){S.sel=(S.sel+n.dy+3)%3;SFX.swap();draw();}
        if(tap(q,'guard')||pressed.has('Escape')){lcClose();return;}
        if(tap(q,'jump')){const id=seq[S.k],r=RID[id],j=order(id)[S.sel];if(S.crossed.includes(j)){SFX.miss();return;}
          if(j===0){const first=!LC.rd[id],nuts=first?(S.tries?1:2):0;LC.rd[id]=1;SFX.bell();burst(MER.clone(),0x9ff0e0,14,3);mer.body.position.y=0.12;anim(0.6,k=>{mer.body.position.y=Math.sin(k*Math.PI)*0.18;});
            if(nuts)lcNuts(nuts,MER.clone().add(new V3(0,-1.5,0)),'Угадали!');else floatText(MER.clone().add(new V3(0,0.6,0)),'Угадали!','#9ff0e0');
            bark({g:mer.g},'rusalka',['Угадали!','Умники!','Верно-верно!','Ох, хитрецы!'][Math.floor(rand(0,4))],1.4);
            if(r[4]&&RID_BARK[r[4]]){const [k2,txt]=RID_BARK[r[4]];later(1.2,()=>bark(HERO[k2],k2,txt,2.4));}
            S.k++;S.sel=0;S.tries=0;S.crossed=[];S.got++;S.wait=1.1;
            if(S.k>=3){S.wait=2.2;later(0.9,()=>bark({g:mer.g},'rusalka',Object.keys(LC.rd).length>=RID.length?'Все мои загадки отгаданы! Приходите — повторим.':'Приходите ещё — новых загадок у меня полный пруд!',2.6));}
            panel('<h2>Русалка загадывает</h2><div class="step" style="font-size:20px">«'+r[1]+'» — угадали!</div>');}
          else{S.tries++;S.crossed.push(j);SFX.miss();bark({g:mer.g},'rusalka',['Не угадали! Подумайте ещё…','Ха-ха! Нет-нет!','Холодно, холодно!'][Math.floor(rand(0,3))],1.4);draw();}}}};}

  /* ---------- вышка-дозор: подзорная труба и «Книга невиданных зверей» ---------- */
  const DZ2={on:false};
  function dozorOpen(pi){const h=active(pi);G.ui='dozor';DZ2.on=true;DZ2.pi=pi;DZ2.h=h;DZ2.t0=G.time;DZ2.yaw=Math.PI+0.15;DZ2.pitch=-0.12;DZ2.zoom=0;DZ2.aim=null;DZ2.aimT=0;DZ2.owl=0;DZ2.owlCd=0;DZ2.got=0;
    h.following=false;h.vel.set(0,0,0);const from=h.pos.clone();anim(0.9,k=>{h.pos.set(lerp(from.x,TWX,k),lerp(from.y,5.6,smooth(k)),lerp(from.z,TWZ+0.6,k));});h.face=Math.PI;SFX.whoosh();
    W.camFn=()=>{const d=new V3(Math.sin(DZ2.yaw)*Math.cos(DZ2.pitch),Math.sin(DZ2.pitch),Math.cos(DZ2.yaw)*Math.cos(DZ2.pitch));return {pos:EYE.clone().addScaledVector(d,DZ2.zoom*16),look:EYE.clone().addScaledVector(d,60),k:9};};
    hud.style.display='block';G.uiTick=dozorTick;dozorHud();
    if(!LC.dozorTold){LC.dozorTold=true;later(0.6,()=>bark(h,h.kind,'Ух, далеко видать! Кто тут у нас прячется?',2.2));}}
  const dozorHud=()=>{const n=beasts.filter(b=>LC.seenT[b.id]!==trip).length,pi=DZ2.pi;
    hud.innerHTML='<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,transparent 0,transparent 33vmin,rgba(24,16,6,.55) 34vmin,rgba(12,8,2,.93) 36vmin)"></div>'+
      '<div style="position:absolute;left:50%;top:50%;width:2px;height:6vmin;margin:-3vmin 0 0 -1px;background:#fff8"></div><div style="position:absolute;left:50%;top:50%;width:6vmin;height:2px;margin:-1px 0 0 -3vmin;background:#fff8"></div>'+
      '<svg id="lcAim" viewBox="0 0 100 100" style="position:absolute;left:50%;top:50%;width:12vmin;height:12vmin;margin:-6vmin 0 0 -6vmin"><circle cx="50" cy="50" r="44" fill="none" stroke="#fff4" stroke-width="5"/><circle id="lcAimC" cx="50" cy="50" r="44" fill="none" stroke="#ffd23a" stroke-width="7" stroke-dasharray="276.5" stroke-dashoffset="276.5" transform="rotate(-90 50 50)"/></svg>'+
      '<div style="position:absolute;left:0;right:0;top:7%;text-align:center;font-size:20px">Дозор · невиданных зверей сегодня: '+n+'</div><div id="lcAimT" style="position:absolute;left:0;right:0;top:62%;text-align:center;color:#ffd23a"></div>'+
      '<div style="position:absolute;left:0;right:0;bottom:20%;text-align:center;font-size:15px">'+K(pi,'left')+K(pi,'right')+K(pi,'up')+K(pi,'down')+' смотреть · держи '+K(pi,'attack')+' — приблизить · '+K(pi,'skill')+' — Совиный взор · '+K(pi,'jump')+' — книга · '+K(pi,'guard')+' — слезть</div>';};
  function dozorEnd(){DZ2.on=false;G.ui=null;G.uiTick=null;W.camFn=null;hudOff();DZ2.h.g.visible=true;const h=DZ2.h,from=h.pos.clone();anim(0.8,k=>{h.pos.set(lerp(from.x,TWB.x,k),lerp(from.y,0.05,smooth(k)),lerp(from.z,TWB.z,k));});h.face=0;beasts.forEach(b=>{if(b.mark)b.mark.visible=false;});}
  function dozorTick(){const dt=1/60;if(!DZ2.on)return;if(G.time-DZ2.t0>0.85)DZ2.h.g.visible=false;
    if(both(q=>tap(q,'guard'))||pressed.has('Escape')){dozorEnd();return;}
    if(both(q=>tap(q,'jump'))){bookOpen(DZ2.pi,true);return;}
    let ax=0,ay=0;for(const q of[0,1]){const a=lcAxis(q);ax+=a.x;ay+=a.y;}ax=clamp(ax,-1,1);ay=clamp(ay,-1,1);const sp=DZ2.zoom>0.5?0.55:1.15;
    DZ2.yaw-=ax*dt*sp;DZ2.pitch=clamp(DZ2.pitch-ay*dt*sp*0.8,-0.55,0.45);DZ2.zoom=damp(DZ2.zoom,both(q=>btn(q,'attack'))?1:0,5,dt);
    DZ2.owlCd=Math.max(0,DZ2.owlCd-dt);if(both(q=>tap(q,'skill'))){if(!done('1-4')){SFX.miss();tip(DZ2.pi,'Совиный взор у Пелагеи — после уровня 1-4.',2.4);}else if(DZ2.owlCd<=0){DZ2.owl=3;DZ2.owlCd=5;SFX.owl();}}
    DZ2.owl=Math.max(0,DZ2.owl-dt);
    const d=new V3(Math.sin(DZ2.yaw)*Math.cos(DZ2.pitch),Math.sin(DZ2.pitch),Math.cos(DZ2.yaw)*Math.cos(DZ2.pitch));let best=null,ba=1e9;
    for(const b of beasts){const v=beastAim(b).sub(EYE),L=v.length();const a=Math.acos(clamp(v.dot(d)/L,-1,1));const thr=(DZ2.zoom>0.5?5:7.5)*RAD*Math.max(0.6,Math.min(1.4,24/L))+Math.atan(b.aim*0.5/L);
      if(!b.mark){b.mark=new THREE.Mesh(new THREE.TorusGeometry(1,0.08,6,24),MB(0xe7c3ff,{transparent:true,opacity:0.85,depthTest:false}));b.mark.renderOrder=9;W.group.add(b.mark);}
      b.mark.visible=DZ2.owl>0&&LC.seenT[b.id]!==trip;if(b.mark.visible){b.mark.position.copy(beastAim(b));b.mark.scale.setScalar(Math.max(0.6,L*0.035)*(1+0.15*Math.sin(G.time*6)));b.mark.lookAt(EYE);}
      if(a<thr&&a<ba&&LC.seenT[b.id]!==trip){ba=a;best=b;}}
    if(best!==DZ2.aim){DZ2.aim=best;DZ2.aimT=0;}if(best)DZ2.aimT+=dt;
    const c=document.getElementById('lcAimC'),tt=document.getElementById('lcAimT');if(c)c.setAttribute('stroke-dashoffset',String(276.5*(1-clamp(DZ2.aimT/0.9,0,1))));if(tt)tt.innerHTML=best?(LC.beasts[best.id]?best.name:'Кто это?..'):'';
    if(best&&DZ2.aimT>=0.9){const b=best,first=!LC.beasts[b.id];LC.beasts[b.id]=(LC.beasts[b.id]||0)+1;LC.seenT[b.id]=trip;DZ2.aim=null;DZ2.aimT=0;const n=first?3:1;G.nutsHub=(G.nutsHub||0)+n;SFX.bell();
      banner((first?'В книгу! ':'')+b.name,'#e7c3ff',2.4,(first?'новая страница «Книги невиданных зверей» · ':'снова повстречали · ')+'+'+n+' '+nutW(n));dozorHud();
      if(beasts.every(q=>LC.seenT[q.id]===trip))later(2.4,()=>banner('Всех сегодня видели!','#ffd76a',2,'после похода звери переберутся на новые места'));}}
  function bookOpen(pi,fromDozor){const prev=G.uiTick;G.ui='book';const L=BEASTS;let page=0;const per=6;
    const draw=()=>{const list=L.slice(page*per,page*per+per);panel('<h2>Книга невиданных зверей</h2><div class="step">Зарисовано: '+L.filter(b=>LC.beasts[b.id]).length+' из '+L.length+' · стр. '+(page+1)+' / '+Math.ceil(L.length/per)+'</div>'+
      list.map(b=>{const n=LC.beasts[b.id]||0,op=beastOpen(b);return '<div class="opt" style="justify-content:space-between'+(n?'':';opacity:.6')+'"><span>'+(n?'<b style="width:auto">'+b.name+'</b> — '+b.line:op?'??? — ищите '+b.where:'🔒 после «'+lvN(b.lv)+'»')+'</span><small>'+(n?'видели: '+n:'')+'</small></div>';}).join('')+
      '<div class="hint">'+K(pi,'left')+K(pi,'right')+' — листать · '+K(pi,'guard')+' / '+K(pi,'jump')+' — закрыть</div>');};
    draw();if(fromDozor)hud.style.display='none';
    G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dx){const np=page+n.dx;if(np>=0&&np*per<L.length){page=np;SFX.swap();draw();}}}
      if(both(q=>tap(q,'guard')||tap(q,'jump'))||pressed.has('Escape')){lcEl.style.display='none';if(fromDozor){G.ui='dozor';G.uiTick=prev;hud.style.display='block';dozorHud();}else lcClose();}};}

  /* ---------- избушка, повернись! кухня Яги ---------- */
  function hutTurn(pi){const h=active(pi);G.ui='hut';bark(h,h.kind,'Избушка, избушка! Встань к лесу задом, ко мне передом!',2.4);
    later(1.2,()=>{const a0=hutAng,a1=FACE;SFX.thud();anim(1.6,k=>{hutAng=lerp(a0,a1,smooth(k));hutO.g.rotation.y=hutAng;hutO.house.position.y=2.3+Math.abs(Math.sin(k*Math.PI*4))*0.18;hutO.legs.forEach((l,i)=>{l.rotation.x=Math.sin(k*Math.PI*4+i*Math.PI)*0.5;});hutLegs();});
      for(let i=0;i<4;i++)later(i*0.4,()=>{SFX.thud();shakeAll(0.015,0.12);burst(hutO.g.position.clone(),0xd8c8a0,6,2);});
      later(1.7,()=>{hutO.legs.forEach(l=>l.rotation.x=0);hutO.house.position.y=2.3;anim(0.5,k=>{hutO.door.rotation.y=-1.2*k;});LC.hutT=trip;if(yaga){yaga.g.visible=true;if(yagaC)yagaC.on=true;}
        const first=!LC.hutOnce;LC.hutOnce=true;if(first)lcNuts(2,hutO.g.position.clone().add(new V3(0,2,0)),'Избушка послушалась');
        later(0.4,()=>{if(yaga)bark(yaga,'yaga',first?'Фу-фу! Русским духом пахнет… А, это вы! Заходите, гости дорогие — кухня открыта.':'Опять отвернулась, вертихвостка! Ну, что варить будем?',3);G.ui=null;});});});}
  const have=r=>Object.keys(r.need).every(k=>(LC.bag[k]||0)>=r.need[k]);
  const rOpen=r=>!r.pech||!!pech;
  function kitchenOpen(pi){G.ui='kitchen';let sel=0;const L=RECIPES.filter(r=>!(r.once&&LC.dish[r.id]));
    const bagTxt='В лукошке: рыба '+(LC.bag.fish||0)+' · грибы '+(LC.bag.mush||0)+' · ягоды '+(LC.bag.berry||0);
    const needTxt=r=>Object.keys(r.need).length?Object.keys(r.need).map(k=>ING[k]+' '+Math.min(LC.bag[k]||0,r.need[k])+'/'+r.need[k]).join(' · '):'топор (есть!)';
    const draw=()=>panel('<h2>Кухня Бабы Яги</h2><div class="step">'+bagTxt+'</div>'+L.map((r,i)=>{const ok=rOpen(r)&&have(r);return '<div class="opt'+(i===sel?' sel':'')+'" style="justify-content:space-between'+(ok?'':';opacity:.55')+'"><span>'+r.name+(LC.dish[r.id]?' ✓':'')+'</span><small>'+(rOpen(r)?needTxt(r)+' · +'+r.nuts:'🔒 испечёт Печка — после «'+lvN('3-5')+'»')+'</small></div>';}).join('')+
      '<div class="tale">Рыба — с причала Садко, грибы — под деревьями, ягоды — на кустах у скалы. После похода всё вырастает снова.</div><div class="hint">'+navKeys(UW(pi))+' — варить · '+K(pi,'guard')+' — уйти</div>');
    draw();if(yaga)bark(yaga,'yaga','Что варить будем, гости дорогие?',1.8);
    G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dy){sel=(sel+n.dy+L.length)%L.length;SFX.swap();draw();}
      if(tap(q,'guard')||pressed.has('Escape')){lcClose();return;}
      if(tap(q,'jump')){const r=L[sel];if(!rOpen(r)){SFX.miss();return;}if(!have(r)){SFX.miss();if(yaga)bark(yaga,'yaga',r.need.fish?'Без рыбы ухи не сваришь — ступай на причал!':r.need.mush?'Грибов-то нет! Поищи под деревьями.':'Ягод маловато — у скалы кусты красные.',2.4);return;}
        lcEl.style.display='none';cookStart(q,r);return;}}};}
  const CK={on:false};
  function cookStart(pi,r){for(const k in r.need)LC.bag[k]-=r.need[k];G.ui='cook';Object.assign(CK,{on:true,pi,r,t:0,stir:0,last:[0,0],hits:0,win:{},dur:7.4});
    if(r.id==='axe'&&yaga)bark(yaga,'yaga','Каша из топора? Ну, солдатская хитрость… Ладно, сварим!',2.4);else if(r.pech&&pech)bark(pech,'pechka','Пирожка моего отведайте!',2);
    W.camFn=()=>({pos:KIT_C.clone().addScaledVector(FW,3.2).addScaledVector(SD,1.2).add(new V3(0,2.4,0)),look:KIT_C.clone().add(new V3(0,0.7,0)),k:5});hud.style.display='block';G.uiTick=cookTick;}
  function cookTick(){const dt=1/60;if(!CK.on)return;CK.t+=dt;
    for(const q of[0,1]){const a=lcAxis(q),s=a.x>0.5?1:a.x<-0.5?-1:0;if(s&&s!==CK.last[q]){if(CK.last[q])CK.stir=Math.min(1.2,CK.stir+0.07);CK.last[q]=s;pot.ladle.rotation.y+=0.9;}}
    pot.ladle.rotation.y+=dt*0.6;pot.soup.material.emissiveIntensity=0.3+CK.stir*0.4;if(Math.random()<0.3)burst(KIT_C.clone().add(new V3(rand(-0.2,0.2),0.95,rand(-0.2,0.2))),0xf4ecd8,1,0.8);
    const WIN=[1.8,3.9,6.0];let ring=1;for(let i=0;i<3;i++){const c=WIN[i];if(CK.t>c-0.9&&CK.t<c+0.35&&!CK.win[i]){ring=clamp((c-CK.t)/0.9,0,1);if(both(q=>tap(q,'attack'))){const ok=Math.abs(CK.t-c)<0.3;CK.win[i]=ok?1:2;if(ok){CK.hits++;SFX.ok();burst(KIT_C.clone().add(new V3(0,0.4,0)),0xffa020,14,3);}else SFX.clink();}}
      if(CK.t>=c+0.35&&!CK.win[i])CK.win[i]=2;}
    pot.fire.forEach((f,i)=>{f.scale.set(1,0.7+ring*0.2+Math.sin(G.time*12+i)*0.15+(CK.hits*0.15),1);});
    const pi=CK.pi;hud.innerHTML='<div style="position:absolute;left:0;right:0;top:9%;text-align:center;font-size:22px">'+CK.r.name+'</div>'+
      '<div style="position:absolute;left:50%;bottom:21%;width:min(420px,70vw);transform:translateX(-50%)"><div style="margin-bottom:4px">Помешивай: '+K(pi,'left')+' '+K(pi,'right')+' по очереди</div><div style="height:16px;border-radius:8px;background:#0006;overflow:hidden"><div style="height:100%;width:'+Math.round(clamp(CK.stir,0,1)*100)+'%;background:#ffd23a"></div></div>'+
      '<div style="margin-top:10px">Поддай жару: '+K(pi,'attack')+', когда огонёк сожмётся · '+'●'.repeat(CK.hits)+'○'.repeat(Math.max(0,[0,1,2].filter(i=>CK.win[i]).length-CK.hits))+'</div></div>'+
      (ring<1?'<div style="position:absolute;left:50%;top:44%;width:'+(4+ring*14)+'vmin;height:'+(4+ring*14)+'vmin;transform:translate(-50%,-50%);border:4px solid '+(ring<0.2?'#fff':'#ffa020')+';border-radius:50%"></div>':'');
    if(CK.t>=CK.dur)cookEnd();}
  function cookEnd(){CK.on=false;G.ui=null;G.uiTick=null;W.camFn=null;hudOff();const r=CK.r,st=Math.max(1,(CK.stir>=1?1:0)+(CK.hits>=2?1:0)+(CK.stir>=1&&CK.hits===3?1:0));
    const n=Math.round(r.nuts*(0.6+0.2*st));LC.dish[r.id]=(LC.dish[r.id]||0)+1;G.nutsHub=(G.nutsHub||0)+n;SFX.bell();
    banner(r.name+' '+'★'.repeat(st)+'☆'.repeat(3-st),'#ffd76a',2.8,r.line+' · +'+n+' '+nutW(n));
    if(yaga)later(0.5,()=>bark(yaga,'yaga',st===3?'Объеденье! Сама бы лучше не сварила.':st===2?'Пальчики оближешь!':'Съедобно! Мешать-то надо живее.',2.2));
    if(typeof ACT!=='undefined'&&ACT.emote)HEROES.forEach((h,i)=>ACT.emote(h,'joy',i*0.1));
    if(Object.keys(LC.dish).length===RECIPES.length&&!LC.allDish){LC.allDish=true;later(3,()=>{lcNuts(10,KIT_C.clone(),'все рецепты Яги');banner('Все рецепты Бабы Яги!','#ffd76a',2.6,'Яга дарит лукошко орешков');});}}

  /* ---------- воздушный змей на Скале Ветрила ---------- */
  const KT={on:false};const KDIR=new V3(0.35,0,-1).normalize(),KR=new V3().crossVectors(KDIR,new V3(0,1,0)).normalize();
  function kiteStart(pi){const h=active(pi);G.ui='kite';h.following=false;h.vel.set(0,0,0);h.face=Math.atan2(KDIR.x,KDIR.z);
    Object.assign(KT,{on:true,pi,h,t:0,u:0,v:-1.5,vu:0,vv:0,rings:0,ring:null,lift:0,gust:0,gT:3,hist:[]});KT.C=TOP.clone().addScaledVector(KDIR,13).add(new V3(0,5.5,0));
    kite.visible=true;kLine.visible=true;kTail.forEach(b=>b.visible=true);kiteRing();
    W.camFn=()=>({pos:TOP.clone().addScaledVector(KDIR,-3.4).add(new V3(0,2.4,0)),look:KT.C.clone().add(new V3(0,0.5,0)),k:4});hud.style.display='block';G.uiTick=kiteTick;
    if(W.vetFace&&done('3-2'))later(0.4,()=>bark({g:W.vetFace},'veter','Эх, задую! Держи змея крепче!',2));}
  function kiteRing(){if(!KT.ringM){KT.ringM=new THREE.Mesh(new THREE.TorusGeometry(0.9,0.09,6,24),MB(0xffd23a,{transparent:true,opacity:0.95}));KT.ringM.castShadow=false;W.group.add(KT.ringM);}
    KT.ru=rand(-4.5,4.5);KT.rv=rand(-0.5,3.6);KT.ringM.visible=true;}
  function kiteTick(){const dt=1/60;if(!KT.on)return;KT.t+=dt;
    if(both(q=>tap(q,'guard'))||pressed.has('Escape')){kiteEnd();return;}
    let ax=0;for(const q of[0,1])ax+=lcAxis(q).x;ax=clamp(ax,-1,1);
    KT.gT-=dt;if(KT.gT<0){KT.gT=rand(3.5,5.5);KT.gust=(Math.random()<0.5?-1:1)*(done('3-2')?2.6:1.8);if(W.vetFace)W.vetFace.userData.puff=0.8;SFX.whoosh();}KT.gust=damp(KT.gust,0,0.9,dt);
    const wind=Math.sin(KT.t*0.8)*0.8+KT.gust;KT.vu+=(ax*7+wind*1.6-KT.vu*1.8)*dt;KT.u=clamp(KT.u+KT.vu*dt,-6.5,6.5);
    if(both(q=>tap(q,'jump')||tap(q,'attack')))KT.lift=1.4;KT.lift=Math.max(0,KT.lift-dt*1.4);
    const tv=1.4+Math.sin(KT.t*0.6)*1.2+KT.lift*2.2-Math.abs(KT.u)*0.12;KT.v=damp(KT.v,tv,1.6,dt);
    const kp=KT.C.clone().addScaledVector(KR,KT.u).add(new V3(0,KT.v,0));kite.position.copy(kp);kite.lookAt(TOP.clone().add(new V3(0,1,0)));kite.rotateZ(-KT.vu*0.08+Math.sin(KT.t*3)*0.08);
    KT.hist.unshift(kp.clone());if(KT.hist.length>40)KT.hist.pop();kTail.forEach((b,i)=>{const p=KT.hist[Math.min(KT.hist.length-1,3+i*5)]||kp;b.position.copy(p).add(new V3(0,-0.9-i*0.28,0));b.rotation.z=Math.sin(KT.t*6+i)*0.6;});
    const hand=KT.h.pos.clone().add(new V3(0,heroHeight(KT.h)*0.7,0));lcLine(kLine,hand,kp.clone().add(new V3(0,-0.1,0)));
    const rp=KT.C.clone().addScaledVector(KR,KT.ru).add(new V3(0,KT.rv,0));KT.ringM.position.copy(rp);KT.ringM.lookAt(TOP.clone().add(new V3(0,1,0)));KT.ringM.rotation.z+=dt;
    if(rp.distanceTo(kp)<1.1){KT.rings++;SFX.bell();burst(rp,0xffd23a,14,3);floatText(rp.clone().add(new V3(0,0.8,0)),'Облачко '+KT.rings+' из 6','#ffe36b');if(KT.rings>=6){kiteEnd(true);return;}kiteRing();}
    const left=Math.max(0,40-KT.t),pi=KT.pi;hud.innerHTML='<div style="position:absolute;left:0;right:0;top:8%;text-align:center;font-size:21px">Воздушный змей · облачков '+KT.rings+' из 6 · '+Math.ceil(left)+' с</div>'+
      (Math.abs(KT.gust)>0.6?'<div style="position:absolute;left:0;right:0;top:15%;text-align:center;font-size:30px;color:#cfe8ff">'+(KT.gust>0?'ветер →→→':'←←← ветер')+'</div>':'')+
      '<div style="position:absolute;left:0;right:0;bottom:20%;text-align:center;font-size:15px">'+K(pi,'left')+K(pi,'right')+' — вести змея · '+K(pi,'jump')+' — подёрнуть вверх · '+K(pi,'guard')+' — смотать</div>';
    if(left<=0)kiteEnd(true);}
  function kiteEnd(fin){KT.on=false;G.ui=null;G.uiTick=null;W.camFn=null;hudOff();if(KT.ringM)KT.ringM.visible=false;
    if(fin){const n=KT.rings+(KT.rings>=6?3:0);LC.kite.n=(LC.kite.n||0)+1;LC.kite.best=Math.max(LC.kite.best||0,KT.rings);if(n>0){G.nutsHub=(G.nutsHub||0)+n;SFX.ok();}
      banner(KT.rings>=6?'Все облачка — змей под самым небом!':'Змей налетался','#cfe8ff',2.6,'облачков: '+KT.rings+' из 6'+(n?' · +'+n+' '+nutW(n):'')+' · лучший полёт: '+LC.kite.best);}
    kitePark();}

  /* ---------- что делать рядом: кнопка над героем ---------- */
  const onPier=h=>Math.abs(h.pos.x-PX)<1.15&&h.pos.z<zW-4.4&&h.pos.y<1;
  const BOARD=new V3(PX-1.9,0,zS-0.7),HUTF=at(2.9,0);
  function lcAction(h,pi){if(!hubMode)return null;
    if(onPier(h))return {note:'рыбачить',fn:()=>fishStart(pi)};
    if(lcNear(h,BOARD,1.7))return {note:'рыбий альбом',fn:()=>albumOpen(pi)};
    if(sadko&&lcNear(h,sadko.g.position,1.8))return {note:'Садко',fn:()=>bark(sadko,'sadko',['Ступай на край причала — да закидывай!','Рыба на песню идёт, гость.','В Китеже на дне — и то так не клевало!'][Math.floor(rand(0,3))],2.2)};
    if(lcNear(h,RIDP,2.6))return {note:'загадки русалки',fn:()=>ridOpen(pi)};
    if(lcNear(h,TWB,1.6))return {note:'дозор',fn:()=>dozorOpen(pi)};
    if(lcNear(h,new V3(TWX+2.6,0,TWZ+2.8),1.4))return {note:'книга зверей',fn:()=>bookOpen(pi,false)};
    if(lcNear(h,HUTF,2.4)||lcNear(h,KIT_C,1.6))return hutFront()?{note:'кухня Яги',fn:()=>kitchenOpen(pi)}:{note:'«Избушка, повернись!»',fn:()=>hutTurn(pi)};
    for(let i=0;i<BUSH.length;i++)if(berryOn(i)&&lcNear(h,BUSH[i],1.6))return {note:'ягоды',fn:()=>{LC.berryGot.push(i);berryDraw();LC.bag.berry=Math.min(9,(LC.bag.berry||0)+2);SFX.flower();floatText(BUSH[i].clone().add(new V3(0,1.4,0)),'Ягоды в лукошко! (+2)','#ff8aa0');}};
    if(hd(h.pos,TOP)<1.6&&h.pos.y>TOP.y-0.4)return {note:'запустить змея',fn:()=>kiteStart(pi)};
    return null;}

  /* ---------- ход: поток, гнездо, грибы, анимации ---------- */
  W.updates.push(dt=>{const t=G.time;
    boat.position.y=SEA+0.05+Math.sin(t*1.3)*0.05;boat.rotation.z=Math.sin(t*1.1)*0.05;boat.rotation.x=Math.sin(t*0.9)*0.03;
    mer.tail.forEach((s,i)=>{s.rotation.x=(i?0.1:-0.9)+Math.sin(t*1.6-i*0.6)*0.12;});mer.arms[1].rotation.z=0.9+Math.sin(t*2.2)*0.35;mer.head.rotation.z=Math.sin(t*0.7)*0.12;
    const U=W.updraft;U.wh.rotation.z-=dt*8;U.rings.forEach(r=>{r.y=(r.y+dt*2.4)%8.8;r.m.position.set(UPD.x,r.y,UPD.z);r.m.material.opacity=0.45*Math.sin(r.y/8.8*Math.PI);r.m.scale.setScalar(0.85+r.y*0.03);});U.leaves.forEach(l=>{l.a+=dt*l.s;l.y+=dt*2.2;if(l.y>8.8)l.y=0;l.m.position.set(UPD.x+Math.cos(l.a)*l.r,l.y,UPD.z+Math.sin(l.a)*l.r);l.m.rotation.set(l.a,l.a*0.7,0);});
    if(W.vetFace){const awake=done('3-2'),fc=W.vetFace;fc.children.forEach(c=>{if(c.name==='eye')c.scale.y=awake?1:0.3;if(c.name==='mouth')c.scale.setScalar(1+(fc.userData.puff||0)*0.8);});
      if(fc.userData.puff>0){fc.userData.puff-=dt;if(Math.random()<0.4)burst(new V3(26.2,2.7,RZ-2.6),0xdff4ff,2,3);}else if(awake&&Math.random()<0.004)fc.userData.puff=0.6;}
    if(sadko&&sadko.body)sadko.body.rotation.z=Math.sin(t*1.8)*0.04;
    if(yaga&&yaga.g.visible&&yaga.body)yaga.body.rotation.y=Math.sin(t*0.9)*0.25;
    if(!CK.on)pot.fire.forEach((f,i)=>{f.scale.set(1,0.8+Math.sin(t*10+i*2)*0.15,1);});
    if(kite.visible&&!KT.on){const kp=TOP.clone().addScaledVector(KDIR,6).add(new V3(Math.sin(t*0.7)*1.2,6+Math.sin(t*0.9)*0.6,0));kite.position.copy(kp);kite.lookAt(TOP);kite.rotateZ(Math.sin(t*2)*0.15);
      lcLine(kLine,TOP.clone().add(new V3(0,0.3,0)),kp);kTail.forEach((b,i)=>{b.position.copy(kp).add(new V3(Math.sin(t*2-i*0.6)*0.2*i,-0.9-i*0.28,0));b.rotation.z=Math.sin(t*5+i)*0.6;});}
    beasts.forEach(b=>{try{b.tick(b.o,t,b.p,b);}catch(e){}});
    if(F.stage!=='free')return;
    // поток поднимает всякого, кто в него шагнёт, до вершины шпиля
    for(const h of HEROES){if(hd(h.pos,UPD)<1.25&&h.pos.y<9.2&&!G.cine){const want=clamp((8.9-h.pos.y)*2.6,-1.2,7.5);if(h.vel.y<want){h.vel.y=want;h.grounded=false;}if(Math.random()<0.15)burst(h.pos.clone(),0xdff4ff,1,1.2);
        if(ctrl(h)&&!LC.updTold){LC.updTold=true;tip(h.player,'Ветрило дует снизу вверх — подымет до самого шпиля!<br>Шагни к шпилю — там гнездо.',3);}}}
    if(LC.nestT!==trip&&hubMode){for(const h of HEROES)if(hd(h.pos,SPIRE)<1.25&&h.pos.y>SPH-0.4){LC.nestT=trip;W.nest.forEach(n=>n.visible=false);lcNuts(3,SPIRE.clone().add(new V3(0,SPH,0)),'Гнездо на шпиле');SFX.bell();ringFx(SPIRE.clone().add(new V3(0,SPH+0.1,0)),COL.gold,1.4);break;}}
    MUSH.forEach((p,i)=>{if(!mushM[i].visible||!hubMode)return;for(const h of HEROES)if(hd(h.pos,p)<0.85&&h.pos.y<1){mushM[i].visible=false;LC.mushGot.push(i);LC.bag.mush=Math.min(9,(LC.bag.mush||0)+1);SFX.flower();floatText(p.clone().add(new V3(0,1,0)),'Гриб в лукошко!','#f0d0a0');break;}});
    if(G.ui||G.cine||!hubMode)return;
    for(const pi of[0,1]){if(!tap(pi,'attack'))continue;const a=lcAction(active(pi),pi);if(a){a.fn();break;}}});
  if(LC.nestT===trip)W.nest.forEach(n=>n.visible=false);
  for(const pi of[0,1]){prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&!!lcAction(active(pi),pi),()=>{const a=lcAction(active(pi),pi);return a?a.note:'';});
    const lab=(pos,dist,text,cond)=>prompt(pi,'label',()=>pos,()=>hubMode&&F.stage==='free'&&!G.ui&&hd(active(pi).pos,pos)<dist&&!lcAction(active(pi),pi)&&(!cond||cond()),text);
    lab(new V3(PX,2.4,zS-0.6),11,'Причал Садко · рыбалка');lab(new V3(RIDP.x,4.4,RIDP.z),10,'Русалка · загадки');lab(new V3(TWX,9.6,TWZ+1),12,'Вышка-дозор');
    lab(new V3(HX,7.2,HZ),11,'Избушка Яги · кухня');lab(new V3(27.4,6.6,RZ-1),10,'Скала Ветрила · воздушный змей');}
  { const leave=W.onLeave;W.onLeave=()=>{if(FS.on)fishEnd();if(DZ2.on){DZ2.on=false;W.camFn=null;DZ2.h.g.visible=true;}if(CK.on){CK.on=false;W.camFn=null;}if(KT.on){KT.on=false;W.camFn=null;}hudOff();if(rod.parent)rod.parent.remove(rod);if(leave)leave();};}
  W.lc={LC,FISH,RID,BEASTS,RECIPES,beasts,PX,zS,zW,SEA,TWB,RIDP,BOARD,HUTF,KIT_C,TOP,UPD,SPIRE,SPH,BUSH,MUSH,hutFront,onPier,lcAction,fishStart,FS,DZ2,CK,KT,EYE};   // для ботов
  }
