/* ============================== РЕЛИЗ final05 · ДЖОЙСТИКИ В МЕНЮ: два джойстика, Start на паузе, нестандартные раскладки ============================== */
// 1) Число джойстиков изменилось (второй проснулся после первого нажатия, Bluetooth моргнул) — прототип вызывал showMenu(G.state), и меню
//    открывалось заново: выбор прыгал на первый пункт, подменю закрывалось, а при «моргающем» джойстике меню сбрасывалось каждый кадр и
//    выбрать пункт было нельзя. Теперь открытое меню только перерисовывается.
// 2) Start на паузе закрывает паузу (в подменю — шаг назад), а не нажимает выделенный пункт (раньше Start = Enter + Escape, и Enter побеждал).
// 3) Одиночный режим: крестовина вверх работает с любого джойстика (раньше — только если подключён джойстик «своего» игрока).
// 4) Джойстики без стандартной раскладки: крестовина берётся с осей 6/7 или со «шляпки» (ось 9), если кнопок 12–15 нет.
// 5) Джойстики опрашиваются и между кадрами (каждые 8 мс): короткое нажатие не теряется, если кадр долгий (тяжёлый титул, слабая видеокарта).
{const _sm=showMenu;showMenu=function(mode){
  if(FIN.menu&&!FIN.splashOn&&((mode==='pause'&&G.state==='pause'&&!FIN.titleOn)||(mode==='menu'&&G.state==='menu'&&FIN.titleOn))){finDraw();return;}
  _sm(mode);};}
// нажатие Start опрос отдаёт как Enter + Escape сразу — «свежий» Start только в кадре самого нажатия (удержанный Start, открывший паузу, её не закрывает)
{const _fmi=finMenuInput;finMenuInput=function(){const scr=FIN.menu;let st=false;for(const c of PADS.down)if(c.indexOf('PadStart')===0){st=true;break;}
  const fresh=st&&pressed.has('Enter')&&pressed.has('Escape');
  if(fresh&&scr&&G.state==='pause'){pressed.delete('Enter');pressed.delete('Escape');SFX.swap();if(FIN.menuStack.length)finBack();else hideMenu();return;}
  _fmi();};}
{const _ui=uiNav;uiNav=function(pi){const r=_ui(pi);if(!r.dy&&G.solo&&soloHears(pi)&&!PADS.gp[pi]&&(PADS.gp[0]||PADS.gp[1])&&tap(pi,'call'))r.dy=-1;return r;};}
// нестандартная раскладка: крестовина с осей
if(navigator.getGamepads){const _gg=navigator.getGamepads.bind(navigator);const HAT=[[-1,0,-1],[-0.714,1,-1],[-0.428,1,0],[-0.143,1,1],[0.143,0,1],[0.428,-1,1],[0.714,-1,0],[1,-1,-1]];   // [значение оси 9, x, y]: вверх = −1, дальше по часовой; покой ≈ 3,28
  const fix=g=>{if(!g||g.mapping==='standard'||!g.axes||(g.buttons&&g.buttons.length>=16))return g;let x=0,y=0;const a=g.axes;
    if(a.length>9&&Math.abs(a[9])<=1.01){let best=null,bd=0.1;for(const h of HAT){const d=Math.abs(a[9]-h[0]);if(d<bd){bd=d;best=h;}}if(best){x=best[1];y=best[2];}}
    else if(a.length>7){x=Math.abs(a[6])>0.5?Math.sign(a[6]):0;y=Math.abs(a[7])>0.5?Math.sign(a[7]):0;}
    const B=[];for(let i=0;i<17;i++){const b=g.buttons&&g.buttons[i];B.push(b?{pressed:b.pressed,value:b.value}:{pressed:false,value:0});}
    const set=(i,on)=>{if(on)B[i]={pressed:true,value:1};};set(12,y<0);set(13,y>0);set(14,x<0);set(15,x>0);
    return {id:g.id,index:g.index,connected:g.connected,mapping:g.mapping,timestamp:g.timestamp,axes:g.axes,buttons:B,vibrationActuator:g.vibrationActuator};};
  try{navigator.getGamepads=function(){return Array.from(FIN.padSrc?FIN.padSrc():_gg()).map(fix);};}catch(e){}}   // FIN.padSrc — подмена для ботов
setInterval(()=>{try{if(!document.hidden)pollPads();}catch(e){}},8);
