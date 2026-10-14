# final06: правки геймплея прототипа, уровень p (раньше — часть rep_30_gameplay.py) (текстовые замены, как в rep_10/rep_20; не нашлась строка — сборка останавливается).
# ---- Пролог «Колыбельная»: сценка с самокатом — Прошка несёт его Тишке, спотыкается о шишку, самокат разваливается, все смеются ----
# Ролик не переписывается: его определение оборачивается в FIN.lulGag (late_96_prolog_scooter.js), который вставляет сценку
# и сдвигает всё, что шло после краха самоката; самокат и Тишка передаются из buildPrologue.
rep("play({dur:39,fov:48,","play(FIN.lulGag({dur:39,fov:48,")
# Комната штаба, окно в ночь и интерактивная тетрадка (late_96b_prolog_night.js): после постройки комнаты buildPrologue передаёт
# модулю окно, лампу, тетрадку, Звенышко и прочее.
rep("const Z=makeZven();W.zven=Z;Z.mode='script';Z.vis=false;Z.pos.set(2.9,9,-2.1);","const Z=makeZven();W.zven=Z;Z.mode='script';Z.vis=false;Z.pos.set(2.9,9,-2.1);if(FIN.proRoom)FIN.proRoom({win,winPos,walls,R,lampG,lampL,nb,NB_TABLE,NB_WING,tish,sc,spots,door,Z,F,shadow});")
rep("banner('За Звенышком!','#ffd76a',2,'По веткам — вперёд, бегом!');}});}","banner('За Звенышком!','#ffd76a',2,'По веткам — вперёд, бегом!');}},{sc,tish}));}")
# Ролики-уроки (late_96h_prolog_lessons.js): модулю — флаги, трещина, первый прыжок, кнопка лесенки, поляна; мороки поляны появляются
# после ролика «Бой с мороком» (FIN.proFight запускает его и зовёт spawnM в конце; без модуля или у ботов — сразу, как раньше).
rep("W.spawns=[[new V3(-4.0,0,0.3),","if(FIN.proLessons)FIN.proLessons({F,CRK0,CRK1,JH,ladderBtn,arena});W.spawns=[[new V3(-4.0,0,0.3),")
rep("arena.started=true;F.stage='arena';arena.list=[makeFoe('morok',-3,-86,{pi:0,harmless:true,tutorial:true}),makeFoe('morok',3,-86,{pi:1,harmless:true,tutorial:true})];SFX.gate();banner('Морок!','#e7b0ff',2,'Ниток спутанных клубок,<br>Колюч, как ёжиков бок!');}",
    "arena.started=true;F.stage='arena';const spawnM=()=>{if(arena.list.length)return;arena.list=[makeFoe('morok',-3,-86,{pi:0,harmless:true,tutorial:true}),makeFoe('morok',3,-86,{pi:1,harmless:true,tutorial:true})];SFX.gate();banner('Морок!','#e7b0ff',2,'Ниток спутанных клубок,<br>Колюч, как ёжиков бок!');};if(!(FIN.proFight&&FIN.proFight(spawnM)))spawnM();}")
rep("if(arena.started&&!arena.cleared&&arena.list.every(e=>!e.alive)){arena.cleared=true;arena.hold=2.4;","if(arena.started&&!arena.cleared&&arena.list.length&&arena.list.every(e=>!e.alive)){arena.cleared=true;arena.hold=2.4;")
