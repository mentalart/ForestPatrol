# final06: правки геймплея прототипа, уровень epi (раньше — часть rep_30_gameplay.py) (текстовые замены, как в rep_10/rep_20; не нашлась строка — сборка останавливается).
# ---- Эпилог: «Театр теней» (late_39_epi_shadows.js) — после ролика e1 мини-игра с живыми тенями вместо теней-картинок по кнопке ----
# Модулю — части эпилога (W.epiL); конец ролика e1 зовёт FIN.epiTh.start, конец театра — e2 (колыбельная Тишки). Без модуля — прежние тени.
rep("W.spawns=[[new V3(1.6,0,-0.4),new V3(-3.2,0,-0.6)],[new V3(-0.4,0,-2),new V3(0.4,0,0.9)]];W.startAct=[0,0];",
    "W.epiL={e2,SH,room,tish,kot,nb,blanket,place,F};W.spawns=[[new V3(1.6,0,-0.4),new V3(-3.2,0,-0.6)],[new V3(-0.4,0,-2),new V3(0.4,0,0.9)]];W.startAct=[0,0];")
rep("end:()=>{W.anims.length=0;F.stage='shadows';F.shT=0;banner('Тени на стене пляшут'",
    "end:()=>{W.anims.length=0;if(FIN.epiTh&&FIN.epiTh.start(W.epiL))return;F.stage='shadows';F.shT=0;banner('Тени на стене пляшут'")
