/* ============================== РЕЛИЗ final06 · 2-4 «В БРЮХЕ У КИТА»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Внутри кита у Игрока 2 свои дела: у озера — живая вода Йоши на больной клапан (ворота друга) и просьба «позвони в колокол» (зов), в заливе тридцати кораблей — прилив Пелагеи (и течение, если друг
// не успел), в сердце — нотки Игрока 2 в долю, Йоша на розовом клапане («тук» подкидывает на уступ) и ковшик на пузырь с Пелагеей, у ресничек — удар вместе с человеком.
// Положения — из build/levels/2-4/late_99h_k24.js.
const K24={w:null,t:0,ow:0,cl:0,tg:0,rh:0};
const k24=()=>{if(K24.w!==W){K24.w=W;K24.t=0;K24.ow=0;K24.cl=0;K24.tg=0;K24.rh=0;}return K24;};
const K24_RB=[[6,-34.8],[7.5,-40.5],[7.6,-47.5]];
const K24_BAY=[[8,-46.3],[12.2,-46.3],[13.2,-42]];
const K24_LEDGE=[6.6,-98.4];
CMP.route('2-4',[
  // желудочное озеро, правый берег: просит Прошку позвонить в колокол (зов) и поливает больной клапан — левые ворота друга; свои (правые) откроет человек
  {id:'valve',done:()=>{const D=W.dbg24();return D.gates[0].open&&D.F.ask;},run:(h,hh)=>{k24();const D=W.dbg24();if(!D.F.go||h.pos.z>-30||h.pos.z<-62)return 'follow';
    if(h.pos.x<4.5&&h.pos.z>-37){cmpPath(h,K24_RB,0.5,0.8);return;}                                               // на правый берег через северную полосу
    if(h.pos.x<4.5){cmpGoto(h,7.5,h.pos.z,0.5);return;}
    if(!D.F.ask){if(Math.hypot(h.pos.x-7.5,h.pos.z+47.5)>1.2){cmpGoto(h,7.5,-47.5,0.5);return;}if(!(K24.cl>G.time-1)){K24.cl=G.time;cmpTap('call');}return;}
    if(!D.gates[0].open){if(!cmpWant('yosha'))return;if(Math.hypot(h.pos.x-7.5,h.pos.z+50)>1.2){cmpGoto(h,7.5,-50,0.5);return;}h.face=Math.PI/2;if(!(K24.ow>G.time-1.2)){K24.ow=G.time;cmpTap('skill');}}}},
  // залив: Пелагея играет прилив у ракушки (корабли всплывают); течение — человек, а не успел — бот
  {id:'bay',done:()=>!!W.dbg24().F.jamOpen,run:(h,hh)=>{k24();const D=W.dbg24(),B=D.BAY,F=D.F;if(!F.ask||!D.gates[0].open)return 'follow';
    if(B.state==='low'){if(!cmpWant('pelageya'))return;if(Math.hypot(h.pos.x-13.2,h.pos.z+41)>1.0&&!(h.pos.x>10.6)){cmpPath(h,K24_BAY,0.5,0.8);return;}
      if(Math.hypot(h.pos.x-13.2,h.pos.z+41)>1.0){cmpGoto(h,13.2,-41,0.4);return;}if(!(K24.t>G.time-1)){K24.t=G.time;cmpTap('item');}return;}
    const R=D.SHIPS;if(B.t>=1&&!R[1].stuck&&F.tongue&&!R.every(r=>r.out)&&D.CB.dir===0){                            // корабли освобождены, язык найден — течение должно идти
      if(!K24.tg)K24.tg=G.time;if(G.time-K24.tg>8){if(!cmpWant('pelageya'))return;if(Math.hypot(h.pos.x-12.6,h.pos.z+59.6)>0.9){cmpGoto(h,12.6,-59.6,0.4);return;}
        h.face=Math.PI/2;if(!(K24.t>G.time-1)){K24.t=G.time;cmpTap('item');}return;}}else K24.tg=0;
    return 'follow';}},
  // сердце: нотки Игрока 2 — гусли в долю
  {id:'rhythm',done:()=>!!W.dbg24().RH.done||!!W.dbg24().F.caught,run:h=>{k24();const D=W.dbg24(),RH=D.RH;if(!RH.on)return 'follow';
    const n=RH.notes.find(q=>q.pi===1&&q.st===0&&!q.pr2&&RH.t>=q.tb-0.04&&RH.t<=q.tb+0.12);if(n){n.pr2=1;cmpTap('item');}}},
  // пузырь с Пелагеей: Йоша на розовый клапан — на «тук» подбросит, на уступ и ковшик на тёмную каплю
  {id:'bubble',done:()=>!!W.dbg24().F.freed,run:h=>{k24();const D=W.dbg24();if(!D.F.caught)return 'follow';if(!cmpWant('yosha'))return;
    if(h.pos.y>3.4){if(Math.hypot(h.pos.x-6.6,h.pos.z+98.8)>0.8){cmpGoto(h,6.6,-98.8,0.3);return;}h.face=Math.PI;if(!(K24.ow>G.time-1.2)){K24.ow=G.time;cmpTap('skill');}return;}   // на уступе — ковшик
    if(!h.grounded){cmpGoto(h,K24_LEDGE[0],K24_LEDGE[1],0.1);return;}                                            // летит вверх — к уступу
    if(Math.hypot(h.pos.x-6.2,h.pos.z+93.2)>0.4){cmpGoto(h,6.2,-93.2,0.15);return;}}},                              // ждёт «тук» на клапане
  // реснички: бить вместе с человеком — по очереди каждую, около той, где он
  {id:'cilia',done:()=>!!W.dbg24().F.final,run:(h,hh)=>{k24();const D=W.dbg24();if(!D.F.freed)return 'follow';
    const xs=[-5,0,5],x=xs.slice().sort((a,b)=>Math.abs(a-hh.pos.x)-Math.abs(b-hh.pos.x))[0];
    if(Math.hypot(h.pos.x-(x+1.1),h.pos.z+112.4)>0.7){cmpGoto(h,x+1.1,-112.4,0.3);return;}
    h.face=Math.atan2(x-h.pos.x,-114-h.pos.z);if(!(K24.t>G.time-0.9)){K24.t=G.time;cmpTap('attack');}}},
]);
