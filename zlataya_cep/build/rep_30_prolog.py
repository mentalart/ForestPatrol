# final06: правки геймплея прототипа, уровень p (раньше — часть rep_30_gameplay.py) (текстовые замены, как в rep_10/rep_20; не нашлась строка — сборка останавливается).
# ---- Пролог «Колыбельная»: сценка с самокатом — Прошка несёт его Тишке, спотыкается о шишку, самокат разваливается, все смеются ----
# Ролик не переписывается: его определение оборачивается в FIN.lulGag (late_96_prolog_scooter.js), который вставляет сценку
# и сдвигает всё, что шло после краха самоката; самокат и Тишка передаются из buildPrologue.
rep("play({dur:39,fov:48,","play(FIN.lulGag({dur:39,fov:48,")
# Комната штаба, окно в ночь и интерактивная тетрадка (late_96b_prolog_night.js): после постройки комнаты buildPrologue передаёт
# модулю окно, лампу, тетрадку, Звенышко и прочее.
rep("const Z=makeZven();W.zven=Z;Z.mode='script';Z.vis=false;Z.pos.set(2.9,9,-2.1);","const Z=makeZven();W.zven=Z;Z.mode='script';Z.vis=false;Z.pos.set(2.9,9,-2.1);if(FIN.proRoom)FIN.proRoom({win,winPos,walls,R,lampG,lampL,nb,NB_TABLE,NB_WING,tish,sc,spots,door,Z,F,shadow});")
rep("banner('За Звенышком!','#ffd76a',2,'По веткам — вперёд, бегом!');}});}","banner('За Звенышком!','#ffd76a',2,'По веткам — вперёд, бегом!');}},{sc,tish}));}")
