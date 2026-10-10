# final06: 1-Б «Леший-Путаник» — облик и арена (docs/29_leshy_proposals.md, шаги 1–2) (текстовые замены, как в rep_10/rep_20; не нашлась строка — сборка останавливается).
# ---- 1-Б «Леший-Путаник»: Леший с трофеями на голове, большие руки-коряги от плеча, двойники в нарядах, мост-рука, зрители, свет и камера арены ----
# Модули `late_99x_k1b_leshy.js` (облик) и `late_99y_k1b_fx.js` (арена, эффекты) — FIN.k1b; части уровня, закрытые в build1B, передаются в FIN.k1b.init.
rep("const L=makeLeshy(2.2);","const L=FIN.k1b.boss(2.2);")
rep("const m=makeLeshy(1.05);","const m=FIN.k1b.double(i,n,i===real,F.round||0);")
rep("{leash:10,signals:[s<0?'yellow':'red'],scale:1});e.side=s;e.noKill=true;","{leash:6.5,signals:[s<0?'yellow':'red'],scale:2.5});e.side=s;e.r=1.3;FIN.k1b.hand(e);e.noKill=true;")   # ладонь втрое крупнее на вид, зона удара прежняя, привязь 6,5 м, поза → удар → окно (late_99z_k1b_hands.js)
rep("ramps.push({g,cols,sh,hand,t:9});","ramps.push({g,cols,sh,hand,t:10});")   # рука-мост держится 10 с (было 9)
rep("function headHit(h){F.head++;","function headHit(h){F.head++;FIN.k1b.onHead(F.head);")
rep("const arm=new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.75,len,8),M(0x3d5a2a));arm.position.copy(from).add(to).multiplyScalar(0.5);arm.quaternion.setFromUnitVectors(new V3(0,1,0),to.clone().sub(from).normalize());g.add(arm);","FIN.k1b.bridge(g,from,to,len,hand);")
rep("const top=new THREE.Mesh(new THREE.BoxGeometry(1.1,0.1,len),MAT.moss);top.position.copy(arm.position).add(new V3(0,0.55,0));top.lookAt(to.clone().add(new V3(0,0.55,0)));g.add(top);","")
rep("W.onStart=()=>intro();","W.onStart=()=>intro();FIN.k1b.init({L,hands,doubles,shoulders,headPos,C,R,carousel,F,bb,ending,setBoss:b=>{boss3=b;}});")
# ---- этап 2 «Ищи-свищи»: прятки (late_99za_k1b_hide.js, шаг 4 плана) ----
rep("state:'walk',t:0,pos:m.g.position});}\n    smokePuff();}","state:'walk',t:0,pos:m.g.position});}\n    FIN.k1b.hideInit(doubles,n,F.round||0,C);smokePuff();}")   # слоты хороводов, настоящий — со следами
rep("if(d.state==='walk'){d.a+=dt*0.32;d.pos.set(C.x+Math.cos(d.a)*7,0,C.z+Math.sin(d.a)*7);d.m.g.rotation.y=-d.a;d.m.body.rotation.z=Math.sin(G.time*5+d.a)*0.06;","if(d.state==='walk'){FIN.k1b.hideStep(d,dt,C);")   # вместо ровного круга — перебежки, приседы, обмен местами
rep("else if(d.state==='fallen'&&d.t>5){","else if(d.state==='fallen'&&d.t>6){")   # упавший настоящий лежит 6 с (было 5)
# ---- этап 3 «Хоровод»: Леший на пне, скакалка, ленты, «Тяни-потяни» (late_99zb_k1b_hoorovod.js, шаг 5 плана) — вместо карусели с кружком над героями ----
rep("L.g.visible=false;boss3=makeFoe('leshyBoss',C.x,C.z-1,{leash:0.6});boss3.needBoth=true;boss3.onDeath=()=>{F.won=true;later(1.4,ending);};","boss3=FIN.k1b.s3.start();")   # невидимый враг-носитель Пробоя и Маха; ролик и хоровод — в модуле
rep("banner('Леший лес каруселью крутит!','#b8e070',2.6,'над обоими один кружок — щитом закройтесь вместе, в такт: Богатырский щит');say('leshy','А ну-ка, закружу, заверчу!',2.2);cring.next=4;}","cring.next=1e9;}")   # кружок над героями больше не включается; «А ну-ка, закружу, заверчу!» — в FIN.k1b.s3.start
rep("'Вместе! Кружок над обоими — щитом '+K(pi,'guard')+' в такт закройтесь. Кору бей сбоку.<br>Синяя полоска полна — богатырский выход включится сам. Леший оглушён — бейте '+K(pi,'attack')+' вдвоём, без проволочек, без сроку.'","FIN.k1b.s3.hint(pi)")
rep("'Леший-Путаник: руки-коряги, четыре двойника да карусель.<br>Настоящего Совиный взор покажет, а двойников струна запутает в кудель.'","'Леший-Путаник: руки-коряги, двойники-прятки да хоровод со скакалкой.<br>Настоящего видно по тени и мох-следам, а двойников струна запутает в кудель.'")
# ---- шаг 6: ролики — вход (великан проснулся), переход к прятками (смех, дым), финал (Леший с одним цветущим рогом, листопад); выход на хоровод — в FIN.k1b.s3.start (late_99zb), музыка — FIN.k1b.music
rep("function intro(){F.phase=0;play({dur:9,fov:50,","function intro(){F.phase=0;play(FIN.k1b.cine.intro({dur:9,fov:50,")
rep("жёлтая — щит · красная — кувырок');}});}","жёлтая — щит · красная — кувырок');}}));}")
rep("later(1.2,()=>{play({dur:6,fov:50,shots:[shot(0,[0,4,0],[0,5,-22])],","later(1.2,()=>{play(FIN.k1b.cine.mid({dur:6,fov:50,shots:[shot(0,[0,4,0],[0,5,-22])],")
rep("мох-следы');}});});}}","мох-следы');}}));});}}")
rep("const lz=makeLeshy(1.3);","const lz=FIN.k1b.finale(1.3);")
rep("    play({dur:16,fov:48,shots:[shot(0,[0,3.4,-8],[0,3,-16])","    play(FIN.k1b.cine.end({dur:16,fov:48,shots:[shot(0,[0,3.4,-8],[0,3,-16])")
rep("later(2.2,()=>{F.out=true;finishLevel();});}});}","later(2.2,()=>{F.out=true;finishLevel();});}}));}")
