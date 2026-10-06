//@@
// Битва с Кощеем (k5epic): кадры каждой новой стадии — прыжком, 4 с боя (для глаз, без проверок)
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);}};
window.IN=w=>{const P=E5.pages[w];const A=pi=>ZC.players[pi].heroes[ZC.players[pi].act];for(let i=0;i<300&&E5.es.step!=='fight';i++){for(const pi of[0,1]){A(pi).pos.set(P.pos.x+(pi?0.5:-0.5),0.05,P.pos.z);}TK(1);}TK(300);};
window.ST=n=>{E5.goStage(n);ZC.G.manual=true;TK(400);return 'st'+n+' cur='+E5.cur;};ST(1)
//@@ shot=k5s_01.png
ZC.tick(1);
//@@
ST(4);IN(1);'p1'
//@@ shot=k5s_04.png
ZC.tick(1);
//@@
ST(5);IN(2);'p2'
//@@ shot=k5s_05.png
ZC.tick(1);
//@@
ST(6);IN(3);'p3'
//@@ shot=k5s_06.png
ZC.tick(1);
//@@
ST(7);IN(4);'p4'
//@@ shot=k5s_07.png
ZC.tick(1);
//@@
ST(9)
//@@ shot=k5s_09.png
ZC.tick(1);
//@@
ST(10)
//@@ shot=k5s_10.png
ZC.tick(1);
//@@
ST(11)
//@@ shot=k5s_11.png
ZC.tick(1);
