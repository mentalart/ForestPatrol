# final06 · ---- 1-1 «Избушка, повернись»: ролики с Ягой — постановка в late_99n_yaga11.js (FIN.yaga11, FIN.yaga11gift); без модуля — прежние ----
rep("function yagaTalk(){F.stage='yaga';const T=HERO;yaga.g.visible=true;hut.inner.visible=true;",
    "function yagaTalk(){if(FIN.yaga11)return FIN.yaga11({F,yaga,hut,spawnKiki,arena,puddles});F.stage='yaga';const T=HERO;yaga.g.visible=true;hut.inner.visible=true;")
# ---- ролик «Клубки в дар» (после уборки двора) — постановка в late_99n_yaga11.js (FIN.yaga11gift); без модуля — прежний ----
rep("function giveClews(){F.stage='gift';const T=HERO;",
    "function giveClews(){if(FIN.yaga11gift)return FIN.yaga11gift({F,yaga,hut,HEAP,porchLink});F.stage='gift';const T=HERO;")
