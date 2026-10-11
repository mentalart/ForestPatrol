//@@ wait=1500
// релиз final06: камера в режиме с ИИ напарником (late_89_camorbit.js, late_73_companion.js). Общий экран крутится полным кругом (вдвоём — ±55°:
// «вперёд» должно быть узнаваемым обоим живым игрокам, а за Игрока 2 — бот), а бот при повёрнутой камере идёт туда, куда собрался (стик — по камере Игрока 2).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.CO=ZC.FIN.co;window.C=ZC.FIN.cam;window.deg=r=>Math.round(r*180/Math.PI);window.bot=()=>U.act(1);window.me=()=>U.act(0);
window.hold=(pi,x,y,n)=>{C.stick[pi]={x,y};ZC.tick(n);C.stick[pi]=null;};
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(150);
// вдвоём: не дальше 55°
hold(0,1,0,120);ZC.tick(40);const two=Math.abs(C.s.yaw);ZC.FIN.camReturnAll();ZC.tick(60);
// с ИИ напарником: дальше 55°, вплоть до разворота
window.R11=CO.routes['1-1'];CO.routes['1-1']=[{id:'stay',fin:false,done:()=>false,run:()=>'follow'}];CO.rw=null;   // маршрут 1-1 увёл бы бота (и экран разделился бы)
const sp0=ZC.G.split;CO.set(true);ZC.tick(5);window.near=()=>{const m=me(),b=bot();b.pos.set(m.pos.x+1.5,m.pos.y,m.pos.z);b.vel.set(0,0,0);};near();ZC.tick(60);const sp1=ZC.G.split;hold(0,1,0,70);ZC.tick(40);const co=Math.abs(C.s.yaw);
['split='+sp0+'/'+sp1+'/'+ZC.G.split,'yawP0='+deg(C.p[0].yaw),'two yaw='+deg(two),'co yaw='+deg(co),'live='+CO.live(),(deg(two)<=56&&deg(co)>100)?'yaw ok':'FAIL yaw']
//@@
// бот при развёрнутой камере: свой маршрут ведёт его к точке в 5 м — дошёл и ни разу не уходил дальше от неё
const R=R11,h0=bot(),tx=h0.pos.x+3,tz=h0.pos.z-4,y0=C.s.yaw;let n=0,worse=0,last=Math.hypot(tx-h0.pos.x,tz-h0.pos.z),d=last;
me().pos.set(h0.pos.x-1,h0.pos.y,h0.pos.z+1);
CO.routes['1-1']=[{id:'camtest',fin:false,done:()=>false,run:h=>{d=CO.goto(h,tx,tz,0.4);}}];CO.rw=null;
for(;n<60*6;n++){ZC.tick(1);const h=bot(),dd=Math.hypot(tx-h.pos.x,tz-h.pos.z);if(dd>last+0.02)worse++;last=dd;if(dd<0.6)break;}
CO.routes['1-1']=R;CO.rw=null;
['yaw='+deg(y0)+'→'+deg(C.s.yaw),'split='+ZC.G.split,'mode='+CO.mode,'t='+(n/60).toFixed(1),'d='+last.toFixed(2),'worse='+worse,'errs='+_errs.length,(last<0.6&&worse<5&&Math.abs(C.s.yaw)>1.7&&!_errs.length)?'walk ok':'FAIL walk']
