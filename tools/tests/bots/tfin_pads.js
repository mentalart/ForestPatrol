//@@
// релиз final05: меню с двумя джойстиками (эмуляция Gamepad API). Нажатие держится 2 кадра игры и отпускается на 2 кадра — без зависимости от скорости кадров.
window.mkPad=i=>({id:'Fake pad '+i,index:i,connected:true,mapping:'standard',timestamp:0,axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))});
window.PADSIM={list:[null,null],polls:0};ZC.FIN.padSrc=()=>{PADSIM.polls++;return PADSIM.list.slice();};   // источник под обёрткой релиза (нестандартная раскладка работает)
// ждём кадры игры (не опросы: джойстики опрашиваются и между кадрами)
window.FR=0;{const raf=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=cb=>raf(t=>{FR++;cb(t);});}
window.polled=n=>new Promise(res=>{const f0=FR;const t0=performance.now();const chk=()=>{if(FR-f0>=n||performance.now()-t0>30000)res();else setTimeout(chk,5);};chk();});
window.setB=(i,b,on)=>{const p=PADSIM.list[i];p.buttons[b].pressed=on;p.buttons[b].value=on?1:0;p.timestamp++;};
window.tapB=async(i,b)=>{setB(i,b,true);await polled(2);setB(i,b,false);await polled(2);};
window.stick=async(i,ax,v)=>{PADSIM.list[i].axes[ax]=v;await polled(2);PADSIM.list[i].axes[ax]=0;await polled(2);};
window.sel=()=>{const s=ZC.FIN.menu;return s?s.sel+':'+(s.items[s.sel]&&s.items[s.sel].label):'FIN.menu=null state='+ZC.G.state;};
PADSIM.list=[mkPad(0),mkPad(1)];'pads on, state='+ZC.G.state
//@@
(async()=>{const r=[];await polled(3);const s0=sel();await tapB(0,13);const s1=sel();await tapB(1,13);const s2=sel();await stick(1,1,0.9);const s3=sel();await stick(0,1,-0.9);const s4=sel();
  r.push('title nav p0↓ p1↓ p1stick↓ p0stick↑: '+[s0,s1,s2,s3,s4].join(' → '));return r;})()
//@@
(async()=>{const r=[];ZC.setSolo(false);ZC.startFrom(ZC.LV('1-1'));ZC.skip();await polled(20);await tapB(1,9);r.push('p1 Start → state='+ZC.G.state+' '+sel());
  const a=sel();await tapB(0,13);const b=sel();await tapB(1,13);const c=sel();await tapB(0,12);const d=sel();await stick(1,1,0.9);const e=sel();
  r.push('pause nav p0↓ p1↓ p0↑ p1stick↓: '+[a,b,c,d,e].join(' → '));
  await tapB(0,1);r.push('p0 B → state='+ZC.G.state);await polled(4);await tapB(0,9);r.push('p0 Start → state='+ZC.G.state+' '+sel());
  const f=sel();await tapB(1,13);await tapB(0,13);const g=sel();r.push('second pause nav: '+f+' → '+g);await tapB(1,9);r.push('p1 Start on '+g+' → state='+ZC.G.state+' '+sel());return r;})()
//@@
// джойстики появляются по очереди: сначала только второй (индекс 1), потом первый
(async()=>{const r=[];if(ZC.G.state!=='play'){ZC.start();}await polled(4);PADSIM.list=[null,mkPad(1)];await polled(4);await tapB(1,9);r.push('only pad#1: Start → '+ZC.G.state+' '+sel());
  const a=sel();await tapB(1,13);r.push('nav: '+a+' → '+sel());PADSIM.list=[mkPad(0),PADSIM.list[1]];await polled(4);const b=sel();await tapB(1,13);const c=sel();await tapB(0,13);r.push('pad#0 appears: '+b+' → (pad#1↓) '+c+' → (pad#0↓) '+sel());return r;})()
//@@
// «моргающий» джойстик: второй пропадает на один опрос и возвращается — меню не сбрасывается (выбор и подменю на месте)
(async()=>{const r=[];if(ZC.G.state!=='play')ZC.start();await polled(4);PADSIM.list=[mkPad(0),mkPad(1)];await polled(4);await tapB(0,9);r.push('pause '+ZC.G.state);
  await tapB(0,13);await tapB(0,13);const a=sel();const keep=PADSIM.list[1];for(let k=0;k<3;k++){PADSIM.list=[PADSIM.list[0],null];await polled(1);PADSIM.list=[PADSIM.list[0],keep];await polled(1);}
  r.push('flap x3: '+a+' → '+sel());await tapB(0,0);const sub=ZC.FIN.menuStack.length;r.push('A → submenu depth '+sub+' '+sel());PADSIM.list=[PADSIM.list[0],null];await polled(2);PADSIM.list=[PADSIM.list[0],keep];await polled(2);
  r.push('flap in submenu: depth '+ZC.FIN.menuStack.length+' '+sel());
  // Start в подменю — назад, на паузе — продолжить
  await tapB(1,9);r.push('Start in submenu → depth '+ZC.FIN.menuStack.length+' state='+ZC.G.state);await tapB(1,13);await tapB(1,9);r.push('Start on '+sel()+'? → state='+ZC.G.state);return r;})()
//@@
// одиночный режим: крестовина вверх с любого джойстика; нестандартный джойстик: крестовина со «шляпки» (ось 9)
(async()=>{const r=[];ZC.setSolo(true);await polled(4);await tapB(1,9);r.push('solo pause '+ZC.G.state);await tapB(0,13);await tapB(0,13);const a=sel();await tapB(1,12);await tapB(0,12);r.push('solo nav ↓↓ ↑(p1) ↑(p0): '+a+' → '+sel());
  const hp={id:'Generic hat pad',index:0,connected:true,mapping:'',timestamp:0,axes:[0,0,0,0,0,0,0,0,0,3.28],buttons:Array.from({length:12},()=>({pressed:false,value:0}))};PADSIM.list=[hp,null];await polled(4);
  const b=sel();hp.axes[9]=0.143;await polled(2);hp.axes[9]=3.28;await polled(2);const c=sel();hp.axes[9]=-1;await polled(2);hp.axes[9]=3.28;await polled(2);r.push('hat ↓ ↑: '+b+' → '+c+' → '+sel());
  ZC.setSolo(false);return r;})()
