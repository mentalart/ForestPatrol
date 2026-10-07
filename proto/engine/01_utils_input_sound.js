(function(){
'use strict';
if(!window.THREE){document.getElementById('card').innerHTML='<h1>Златая цепь</h1><p>Не удалось загрузить Three.js (r128) с CDN. Проверьте подключение к интернету и обновите страницу.</p>';return;}

/* ============================== УТИЛИТЫ ============================== */
const V3=THREE.Vector3;
const clamp=(v,a,b)=>v<a?a:v>b?b:v, lerp=(a,b,t)=>a+(b-a)*t, rand=(a,b)=>a+Math.random()*(b-a);
const damp=(a,b,k,dt)=>a+(b-a)*(1-Math.exp(-k*dt));
const smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
const hd=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function angDamp(a,b,k,dt){let d=b-a;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;return a+d*(1-Math.exp(-k*dt));}
const $=id=>document.getElementById(id);
const GRAV=25, STEP=0.36;
const COL={p1:0xd9774a,p2:0x2fb3aa,yellow:0xffd23a,red:0xff3b30,blue:0x2f7bff,gold:0xffc93c,wood:0x8a5a32};
const PCOL=[COL.p1,COL.p2], PCSS=['#d9774a','#2fb3aa'];
// Три пути сложности (v4): вспышка до удара, окна отбива и маха, длина Пробоя, цена щита в «духе»
const PATHS=['easy','mid','hard'],PATHNAME={easy:'Лёгкий путь',mid:'Средний путь',hard:'Богатырский путь'};
const TIMING={easy:{lead:0.7,parry:0.35,mah:0.15,broken:6,cost:0.17},mid:{lead:0.5,parry:0.25,mah:0.1,broken:4,cost:0.34},hard:{lead:0.35,parry:0.15,mah:0.06,broken:4,cost:0.34}};

/* ============================== ВВОД ============================== */
const BIND=[
 {up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',attack:'KeyF',guard:'KeyG',swap:'KeyQ',roll:'ShiftLeft',skill:'KeyE',item:'KeyR',call:'Digit1'},
 {up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',attack:'Comma',guard:'Period',swap:'KeyK',roll:'Slash',skill:'KeyL',item:'Semicolon',call:'Digit0'}];
const KEYNAME={KeyW:'W',KeyA:'A',KeyS:'S',KeyD:'D',Space:'Пробел',KeyF:'F',KeyG:'G',KeyQ:'Q',ShiftLeft:'Shift',KeyE:'E',KeyR:'R',Digit1:'1',ArrowUp:'↑',ArrowDown:'↓',ArrowLeft:'←',ArrowRight:'→',KeyM:'M',Comma:',',Period:'.',KeyK:'K',Slash:'/',KeyL:'L',Semicolon:';',Digit0:'0'};
const PADG={up:['✚↑','D'],down:['✚↓','D'],left:['✚←','D'],right:['✚→','D'],jump:['A','A'],guard:['B','B'],attack:['X','X'],swap:['Y','Y'],skill:['RT','T'],item:['RB','T'],roll:['LT','T'],call:['✚↑','D']};
const padGlyph=a=>'<span class="pb '+PADG[a][1]+'">'+PADG[a][0]+'</span>';
const STICK='<span class="stick"></span>';
const K=(pi,a)=>{if(G.solo){if(PADS.gp[0]||PADS.gp[1])return padGlyph(a);pi=0;}return PADS.gp[pi]?padGlyph(a):'<kbd>'+KEYNAME[BIND[pi][a]]+'</kbd>';};
const MOVEK=pi=>{if(G.solo)return (PADS.gp[0]||PADS.gp[1])?STICK:'<kbd>WASD</kbd>';return PADS.gp[pi]?STICK:(pi?'<kbd>↑←↓→</kbd>':'<kbd>WASD</kbd>');};
const ALL=new Set(); BIND.forEach(b=>Object.values(b).forEach(c=>ALL.add(c)));
const down=new Set(), pressed=new Set();
addEventListener('keydown',e=>{
  if(ALL.has(e.code)||e.code==='Enter'||e.code==='Escape'||e.code==='Tab') e.preventDefault();
  if(!e.repeat) pressed.add(e.code);
  down.add(e.code); initAudio();
});
addEventListener('keyup',e=>down.delete(e.code));
addEventListener('blur',()=>down.clear());
// одиночный режим: слушается только тот игрок, чьим героем сейчас управляешь, — с любой половины клавиатуры и любого джойстика;
// в «зеркальных» уровнях (раннер 1-3, полёт 5-3 — у обоих одна и та же дорожка) второй повторяет те же нажатия
const soloHears=pi=>pi===G.soloPi||!!(W&&W.soloMirror&&!G.ui);
const btn=(pi,a)=>G.solo?(soloHears(pi)&&(down.has(BIND[0][a])||down.has(BIND[1][a])||PADS.down.has(BIND[0][a])||PADS.down.has(BIND[1][a]))):(down.has(BIND[pi][a])||PADS.down.has(BIND[pi][a]));
const tap=(pi,a)=>G.solo?(soloHears(pi)&&(pressed.has(BIND[0][a])||pressed.has(BIND[1][a]))):pressed.has(BIND[pi][a]);
// ритм-уровни (1-3, 3-3, 4-3, 3-B, 5-4): время нажатия в «песенном» времени уровня за вычетом поправки на задержку звука и ввода (G.rLat, с;
// настройка «Калибровка ритма», в прототипе 0): беспроводные наушники и телевизоры слышат долю позже, чем игра её сыграла
const rT=t=>t-(G.rLat||0);
const AUTO=pi=>G.solo&&pi!==G.soloPi;             // одиночный режим: за этого игрока «играет» помощник
const ctrl=h=>G.solo?h===active(G.soloPi):h.active;   // этим героем сейчас управляет человек
const UW=pi=>G.solo?G.soloPi:pi;                    // чей выбор в окне: в одиночку — всегда твой
const ZAX={x:0,y:0};
const padAx=pi=>{if(!G.solo)return PADS.axes[pi];if(!soloHears(pi))return ZAX;const a=PADS.axes[0],b=PADS.axes[1];return Math.hypot(a.x,a.y)>=Math.hypot(b.x,b.y)?a:b;};
// меню и рушник: стрелки/WASD, крестовина и рывок стика — по одному шагу
const UIS=[{x:0,y:0},{x:0,y:0}];
function uiNav(pi){const a=padAx(pi),sx=a.x>0.6?1:a.x<-0.6?-1:0,sy=a.y>0.6?1:a.y<-0.6?-1:0,r={dx:0,dy:0};if(sx&&sx!==UIS[pi].x)r.dx=sx;if(sy&&sy!==UIS[pi].y)r.dy=sy;UIS[pi].x=sx;UIS[pi].y=sy;
  if(tap(pi,'left'))r.dx=-1;if(tap(pi,'right'))r.dx=1;if(tap(pi,'up')||(PADS.gp[pi]&&tap(pi,'call')))r.dy=-1;if(tap(pi,'down'))r.dy=1;return r;}

/* ============================== ДЖОЙСТИКИ (Gamepad API, стандартная раскладка, раскладка v4) ============================== */
const PADS={down:new Set(),axes:[{x:0,y:0},{x:0,y:0}],gp:[null,null],slots:[false,false],swap:false,count:0};
// A=прыжок, B=защита, X=удар, Y=смена, RB=чудо-вещь, LT=кувырок, RT=свой приём, крестовина ↑=«Ко мне!», Back=поменять джойстики (в меню), Start=пауза
const PADMAP=[[0,'jump'],[1,'guard'],[2,'attack'],[3,'swap'],[5,'item'],[6,'roll'],[7,'skill'],[12,'call'],[13,'down'],[14,'left'],[15,'right']];
function pollPads(){let list=[];try{if(navigator.getGamepads)list=Array.from(navigator.getGamepads()).filter(g=>g&&g.connected!==false);}catch(e){list=[];}
  list.sort((a,b)=>a.index-b.index);const nd=new Set();PADS.gp=[null,null];
  for(let slot=0;slot<2;slot++){const gp=list[slot];PADS.slots[slot]=!!gp;const pi=PADS.swap?1-slot:slot;PADS.axes[pi]={x:0,y:0};if(!gp)continue;PADS.gp[pi]=gp;
    const bt=i=>{const b=gp.buttons&&gp.buttons[i];return !!b&&(b.pressed||b.value>0.5);};
    for(const[i,a]of PADMAP)if(bt(i))nd.add(BIND[pi][a]);
    let ax=(gp.axes&&gp.axes[0])||0,ay=(gp.axes&&gp.axes[1])||0;if(Math.hypot(ax,ay)<0.22){ax=0;ay=0;}PADS.axes[pi]={x:ax,y:ay};
    if(bt(9))nd.add('PadStart'+slot);if(bt(8))nd.add('PadBack'+slot);}
  for(const c of nd)if(!PADS.down.has(c)){if(c.indexOf('PadStart')===0){pressed.add('Enter');pressed.add('Escape');}else if(c.indexOf('PadBack')===0)pressed.add('PadBack');else pressed.add(c);}
  PADS.down=nd;
  if(list.length!==PADS.count){const was=PADS.count;PADS.count=list.length;if(list.length>was)banner('Джойстик подключён','#ffffff',1.6,list.length+' из 2');if(G.state!=='play')showMenu(G.state);}}
function rumble(pi,amp,dur){const gp=PADS.gp[pi];if(!gp||!gp.vibrationActuator||!gp.vibrationActuator.playEffect)return;
  try{const r=gp.vibrationActuator.playEffect('dual-rumble',{duration:Math.round(dur*1000),strongMagnitude:clamp(amp*12,0,1),weakMagnitude:clamp(amp*18,0,1)});if(r&&r.catch)r.catch(()=>{});}catch(e){}}
function padStatus(){const s=i=>PADS.slots[i]?'<b style="color:#7ee08a">подключён</b>':'<span style="opacity:.6">нет</span>';
  return 'Джойстик 1 → Игрок '+(PADS.swap?2:1)+' ('+s(0)+') · Джойстик 2 → Игрок '+(PADS.swap?1:2)+' ('+s(1)+') · <kbd>Tab</kbd> или Back — поменять местами. Клавиатура работает одновременно с джойстиками.';}

/* ============================== ЗВУК (placeholder) ============================== */
let AC=null, master=null;
function initAudio(){ if(AC) return; try{ AC=new (window.AudioContext||window.webkitAudioContext)(); master=AC.createGain(); master.gain.value=0.22; master.connect(AC.destination);}catch(e){AC=null;} }
function tone(f,d,type,v,f2,delay){ if(!AC) return; d=d||0.12; const t=AC.currentTime+(delay||0); const o=AC.createOscillator(), g=AC.createGain();
  o.type=type||'sine'; o.frequency.setValueAtTime(f,t); if(f2) o.frequency.exponentialRampToValueAtTime(f2,t+d);
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(v||0.3,t+0.012); g.gain.exponentialRampToValueAtTime(0.0001,t+d);
  o.connect(g); g.connect(master); o.start(t); o.stop(t+d+0.03); }
const SFX={
 jump:()=>tone(380,0.12,'triangle',0.25,620), land:()=>tone(150,0.09,'sine',0.3,80),
 yellow:()=>{tone(880,0.2,'triangle',0.4);tone(1320,0.2,'triangle',0.3,null,0.09);},            // бубенец — жёлтый сигнал
 parry:()=>{tone(1400,0.08,'square',0.25);tone(2100,0.14,'triangle',0.3,null,0.03);},
 shield:()=>{tone(300,0.1,'square',0.18,200);tone(160,0.16,'sine',0.3);},
 mah:()=>{tone(1600,0.5,'triangle',0.3,2400);tone(800,0.6,'sine',0.25,1200,0.05);tone(2400,0.7,'sine',0.12,null,0.12);},
 clink:()=>tone(950,0.05,'square',0.12), swish:()=>tone(300,0.08,'triangle',0.12,700),
 ember:()=>tone(620,0.16,'sine',0.3,260), brk:()=>{tone(500,0.25,'square',0.25,1000);tone(1000,0.3,'triangle',0.3,1500,0.1);},
 finisher:()=>{tone(220,0.45,'sawtooth',0.35,70);tone(1200,0.5,'triangle',0.3,1800,0.05);},
 bell:()=>{tone(1046,0.7,'sine',0.35);tone(1568,0.7,'sine',0.2,null,0.02);},
 ok:()=>[523,659,784,1046].forEach((f,i)=>tone(f,0.25,'triangle',0.3,null,i*0.09)),
 miss:()=>tone(320,0.28,'sine',0.3,200), swap:()=>tone(700,0.08,'sine',0.3,950), call:()=>{tone(600,0.1,'triangle',0.3);tone(820,0.13,'triangle',0.3,null,0.12);},
 plate:()=>tone(420,0.1,'triangle',0.25,560), gate:()=>tone(200,0.5,'triangle',0.25,120), knock:()=>tone(180,0.18,'triangle',0.3,120),
 dzin:()=>{tone(2093,0.35,'sine',0.25);tone(3136,0.3,'sine',0.14,null,0.03);tone(2637,0.25,'triangle',0.1,null,0.12);},  // Звенышко
 keys:()=>{for(let i=0;i<7;i++)tone(rand(2600,3900),0.05,'square',0.045,null,i*rand(0.06,0.13));},                      // далёкий звон ключей
 thwip:()=>tone(900,0.12,'triangle',0.25,300), latch:()=>{tone(700,0.08,'square',0.2);tone(260,0.3,'triangle',0.3,140,0.08);},
 water:()=>{for(let i=0;i<5;i++)tone(rand(900,1500),0.08,'sine',0.12,rand(400,700),i*0.04);},
 grow:()=>{[392,494,587,784].forEach((f,i)=>tone(f,0.3,'triangle',0.18,null,i*0.12));tone(90,1.2,'sawtooth',0.08,140);},
 spark:()=>tone(1400+rand(0,500),0.1,'sine',0.14,2200), flower:()=>tone(1200,0.12,'sine',0.12,1800),
 crash:()=>{for(let i=0;i<6;i++)tone(rand(120,400),0.12,'square',0.14,rand(60,120),i*0.05);},
 unravel:()=>{for(let i=0;i<8;i++)tone(600+i*120,0.1,'triangle',0.1,null,i*0.03);},
 whoosh:()=>tone(200,0.9,'sawtooth',0.12,1200), thud:()=>tone(110,0.2,'sine',0.35,60),
 rip:()=>{tone(900,0.08,'square',0.12,300);tone(400,0.25,'sawtooth',0.12,120,0.06);}, wave:()=>tone(90,1.6,'sine',0.06,60),
 red:()=>tone(150,0.4,'sawtooth',0.3,105), blue:()=>{tone(640,0.1,'sine',0.45,540);tone(470,0.15,'sine',0.45,380,0.1);},     // рожок · свист
 hurt:()=>tone(240,0.3,'sawtooth',0.3,110), roll:()=>tone(260,0.12,'sine',0.2,520), beat:i=>tone(i<2?660:990,0.22,'triangle',0.45),
 horn:()=>{tone(233,0.7,'sawtooth',0.25);tone(349,0.7,'sawtooth',0.2,null,0.05);tone(466,0.9,'triangle',0.2,null,0.12);},     // богатырский рожок
 thread:()=>tone(500,0.35,'sine',0.25,1200), knot:()=>{tone(990,0.3,'sine',0.35,1480);tone(1480,0.3,'sine',0.25,null,0.12);},
 splash:()=>{for(let i=0;i<6;i++)tone(rand(200,500),0.14,'sine',0.14,rand(80,160),i*0.03);}, toss:()=>tone(300,0.3,'triangle',0.3,900),
 link:()=>[784,988,1318].forEach((f,i)=>tone(f,0.3,'triangle',0.22,null,i*0.07)), nut:()=>{tone(1320,0.08,'square',0.12);tone(1760,0.1,'square',0.1,null,0.06);},
 owl:()=>{tone(420,0.3,'sine',0.25,380);tone(380,0.4,'sine',0.25,300,0.3);}, hammer:()=>{tone(1800,0.12,'square',0.2,900);tone(120,0.2,'sine',0.35,70);}
};
// Колыбельная Тишки — синтез-мелодия (placeholder вокала)
const LUL1=[64,67,64,67,69,67,64,62];   // «Баю-баю, за рекою…»
const LUL2=[62,64,67,65,64];            // «…серый волк живёт…»
function lullaby(notes,beat,delay,vol){notes.forEach((m,i)=>{const f=440*Math.pow(2,(m-69)/12),t=(delay||0)+i*beat,d=i===notes.length-1?beat*2.4:beat*1.5;
  tone(f,d,'triangle',vol||0.17,f*0.997,t);tone(f*2,d*0.8,'sine',(vol||0.17)*0.25,null,t);});}
// Голоса — «бормотание» под субтитры (placeholder озвучки)
const VOICE={likho:{f:90,w:'sawtooth',sp:0.18},proshka:{f:520,w:'square',sp:0.07},potap:{f:165,w:'triangle',sp:0.11},pelageya:{f:760,w:'sine',sp:0.085},yosha:{f:920,w:'square',sp:0.055},
  tishka:{f:980,w:'sine',sp:0.075},kot:{f:200,w:'sine',sp:0.15},zven:{f:1560,w:'triangle',sp:0.05},yaga:{f:330,w:'square',sp:0.09},kiki:{f:260,w:'sawtooth',sp:0.1},
  leshy:{f:120,w:'sawtooth',sp:0.13},vek:{f:840,w:'triangle',sp:0.06},kolobok:{f:700,w:'triangle',sp:0.07},kuzma:{f:140,w:'triangle',sp:0.12},koschei:{f:95,w:'sine',sp:0.2},sadko:{f:230,w:'triangle',sp:0.1},vod:{f:85,w:'sawtooth',sp:0.15},starik:{f:190,w:'sine',sp:0.12},rybka:{f:1180,w:'sine',sp:0.06},zhar:{f:880,w:'sine',sp:0.08},sirin:{f:520,w:'sine',sp:0.13},alkonost:{f:1040,w:'triangle',sp:0.06},solovei:{f:310,w:'sawtooth',sp:0.09},kuzst:{f:130,w:'triangle',sp:0.13},demyan:{f:150,w:'sawtooth',sp:0.12},gorL:{f:110,w:'sine',sp:0.18},gorM:{f:170,w:'sawtooth',sp:0.1},gorR:{f:140,w:'square',sp:0.08},lebed:{f:720,w:'sine',sp:0.09},golova:{f:92,w:'sawtooth',sp:0.17},belka:{f:900,w:'triangle',sp:0.055},zerk:{f:1300,w:'sine',sp:0.08},pechka:{f:170,w:'triangle',sp:0.13},yablonka:{f:720,w:'sine',sp:0.1},rechka:{f:600,w:'sine',sp:0.11}};
function babble(who,text){const v=VOICE[who];if(!v||!AC)return;const n=Math.min(14,Math.max(2,Math.round(String(text).replace(/<[^>]*>/g,'').replace(/[^А-Яа-яЁёA-Za-z]/g,'').length/3)));
  for(let i=0;i<n;i++){const f=v.f*(1+0.18*Math.sin(i*1.7)+rand(-0.06,0.06));tone(f,v.sp*0.9,v.w,0.07,f*0.92,i*v.sp);}}

