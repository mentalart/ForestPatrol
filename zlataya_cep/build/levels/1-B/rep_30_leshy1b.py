# final06: 1-Б «Леший-Путаник» — облик и арена (docs/29_leshy_proposals.md, шаги 1–2) (текстовые замены, как в rep_10/rep_20; не нашлась строка — сборка останавливается).
# ---- 1-Б «Леший-Путаник»: Леший с трофеями на голове, большие руки-коряги от плеча, двойники в нарядах, мост-рука, зрители, свет и камера арены ----
# Модули `late_99x_k1b_leshy.js` (облик) и `late_99y_k1b_fx.js` (арена, эффекты) — FIN.k1b; части уровня, закрытые в build1B, передаются в FIN.k1b.init.
rep("const L=makeLeshy(2.2);","const L=FIN.k1b.boss(2.2);")
rep("const m=makeLeshy(1.05);","const m=FIN.k1b.double(i,n,i===real,F.round||0);")
rep("{leash:10,signals:[s<0?'yellow':'red'],scale:1});e.side=s;e.noKill=true;","{leash:6.5,signals:[s<0?'yellow':'red'],scale:2.5});e.side=s;e.r=1.3;FIN.k1b.hand(e);e.noKill=true;")   # ладонь втрое крупнее на вид, зона удара прежняя, привязь 6,5 м, поза → удар → окно (late_99z_k1b_hands.js)
rep("ramp={g,cols,sh,t:9};","ramp={g,cols,sh,t:10};")   # рука-мост держится 10 с (было 9)
rep("function headHit(h){F.head++;","function headHit(h){F.head++;FIN.k1b.onHead(F.head);")
rep("const arm=new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.75,len,8),M(0x3d5a2a));arm.position.copy(from).add(to).multiplyScalar(0.5);arm.quaternion.setFromUnitVectors(new V3(0,1,0),to.clone().sub(from).normalize());g.add(arm);","FIN.k1b.bridge(g,from,to,len,hand);")
rep("const top=new THREE.Mesh(new THREE.BoxGeometry(1.1,0.1,len),MAT.moss);top.position.copy(arm.position).add(new V3(0,0.55,0));top.lookAt(to.clone().add(new V3(0,0.55,0)));g.add(top);","")
rep("W.onStart=()=>intro();","W.onStart=()=>intro();FIN.k1b.init({L,hands,doubles,shoulders,headPos,C,R,carousel,F,bb});")
