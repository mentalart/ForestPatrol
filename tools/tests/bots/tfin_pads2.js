//@@
// релиз final06: пауза с джойстика на «живом» пути — заставка → титул → «Новая игра» кнопкой A → игра → Start → навигация по паузе.
// (tfin_pads начинает уровень через ZC.startFrom; здесь — как играет человек.) Эмуляция Gamepad API, нажатие держится 2 кадра игры.
window.mkPad=i=>({id:'Fake pad '+i,index:i,connected:true,mapping:'standard',timestamp:0,axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))});
window.PADSIM={list:[mkPad(0),null],polls:0};ZC.FIN.padSrc=()=>{PADSIM.polls++;return PADSIM.list.slice();};
window.FR=0;{const raf=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=cb=>raf(t=>{FR++;cb(t);});}
window.polled=n=>new Promise(res=>{const f0=FR;const t0=performance.now();const chk=()=>{if(FR-f0>=n||performance.now()-t0>30000)res();else setTimeout(chk,5);};chk();});
window.setB=(i,b,on)=>{const p=PADSIM.list[i];p.buttons[b].pressed=on;p.buttons[b].value=on?1:0;p.timestamp++;};
window.tapB=async(i,b,hold)=>{setB(i,b,true);await polled(hold||2);setB(i,b,false);await polled(2);};
window.sel=()=>{const s=ZC.FIN.menu;return s?s.sel+':'+(s.items[s.sel]&&s.items[s.sel].label):'FIN.menu=null state='+ZC.G.state;};
window.waitFor=(f,n)=>new Promise(res=>{const f0=FR;const chk=()=>{if(f()||FR-f0>=(n||600))res(f());else setTimeout(chk,10);};chk();});
'state='+ZC.G.state+' splash='+!!ZC.FIN.splashOn
//@@ wait=500
(async()=>{const r=[];await polled(3);if(ZC.FIN.splashOn){await tapB(0,0);}await waitFor(()=>ZC.FIN.titleOn&&ZC.FIN.menu,400);r.push('title '+sel());
  // до «Новой игры» и A
  for(let k=0;k<6&&!/Новая/.test(sel());k++)await tapB(0,13);r.push('on '+sel());await tapB(0,0);await polled(4);
  if(ZC.FIN.menu&&/Да/.test(JSON.stringify(ZC.FIN.menu.items.map(i=>i.label)))){for(let k=0;k<3&&!/Да/.test(sel());k++)await tapB(0,12);await tapB(0,0);}
  await waitFor(()=>ZC.G.state==='play'&&!ZC.FIN.titleOn,600);r.push('play='+(ZC.G.state==='play')+' title='+ZC.FIN.titleOn+' menu='+(ZC.FIN.menu?'yes':'null'));return r;})()
//@@
(async()=>{const r=[];await polled(30);if(ZC.G.cine){ZC.skip();await polled(10);}
  // держим стик и A/X, как в игре, потом Start
  PADSIM.list[0].axes[1]=-0.8;await polled(20);PADSIM.list[0].axes[1]=0;await tapB(0,2);await polled(5);
  await tapB(0,9);r.push('Start → state='+ZC.G.state+' '+sel());const a=sel();await tapB(0,13);const b=sel();await tapB(0,13);const c=sel();await tapB(0,12);const d=sel();
  r.push('pause nav ↓ ↓ ↑: '+[a,b,c,d].join(' → '));const moved=b!==a&&c!==b;
  // A на «Настройки» — подменю, B — назад, Start — продолжить
  for(let k=0;k<6&&!/Настройки/.test(sel());k++)await tapB(0,13);await tapB(0,0);r.push('A → depth '+ZC.FIN.menuStack.length+' '+sel());await tapB(0,1);r.push('B → depth '+ZC.FIN.menuStack.length+' '+sel());
  await tapB(0,9);r.push('Start → state='+ZC.G.state);if(!moved)throw new Error('навигация по паузе с джойстика не работает: '+r.join(' | '));return r;})()
//@@
// вторая пауза после игры: снова работает (ходим стиком, бьём, прыгаем)
(async()=>{const r=[];PADSIM.list[0].axes[0]=0.9;await polled(30);PADSIM.list[0].axes[0]=0;await tapB(0,0);await tapB(0,2);await polled(20);
  await tapB(0,9);const a=sel();await tapB(0,13);const b=sel();r.push('pause#2 '+ZC.G.state+' nav: '+a+' → '+b);await tapB(0,9);r.push('Start → '+ZC.G.state);
  if(a===b)throw new Error('вторая пауза: навигация не работает');return r;})()
//@@ mouse=640,360
// курсор мыши стоит над панелью паузы (пауза — по центру экрана): джойстик всё равно ходит по пунктам — наведение без движения мыши не перехватывает выбор
(async()=>{const r=[];await tapB(0,9);await polled(6);const a=sel();await tapB(0,13);await polled(6);const b=sel();await tapB(0,13);await polled(6);const c=sel();
  r.push('mouse over panel, pause nav ↓ ↓: '+[a,b,c].join(' → '));await tapB(0,9);r.push('Start → '+ZC.G.state);if(a===b||b===c)throw new Error('курсор над паузой перехватывает выбор: '+r.join(' | '));return r;})()
