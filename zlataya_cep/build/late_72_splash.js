/* ============================== РЕЛИЗ · ЗАСТАВКА СТУДИИ «АбадзехLAB · Лаборатория творчества» ============================== */
// Логотип воссоздан кодом (SVG + CSS, без картинок). Сценарий ≈ 4,4 с:
//  0,15 — колба рисуется одной линией; 1,0 — пружинит, как желе; волшебная жидкость поднимается и застывает волной логотипа;
//  1,4 — буква «А» выпрыгивает из жидкости (squash & stretch); 1,55 — пять пузырьков по одному взлетают на свои места, лишние лопаются искрами;
//  1,85 — буквы «АбадзехLAB» выпрыгивают по очереди, «LAB» — в цветах жидкости; 2,35 — «Лаборатория творчества» поднимается волной;
//  3,0 — блик по стеклу; 4,4 — выход: пузырь из колбы раскрывает титульный экран. Любая клавиша или щелчок — пропуск.
// final06: голос — Кот Учёный: «Абадзех-Лаб! Лаборатория творчества.» (запись splash_001 из каталога озвучки) — с 1,8 с, когда выпрыгивают буквы;
// с голосом заставка длится 5,4 с. Браузер включает звук только после первого нажатия, поэтому, если звук ещё не разрешён, сначала
// экран «Нажмите любую кнопку» (как на консолях): клавиша, щелчок, касание или кнопка джойстика включают звук, и заставка идёт со звуком.
// Шрифт — Comfortaa (SIL OFL 1.1), встроен в страницу сборкой.
const SPL={el:null,raf:0,t0:0,live:false,bub:[],fx:[],spawnT:0,exitT:-1,still:false};
(function(){const el=$('finSplash');if(!el)return;SPL.el=el;
  const name=el.querySelector('.fs-name'),txt=name.textContent,LC=['#5ee8d0','#b49aff','#ff8ac0'];name.textContent='';
  [...txt].forEach((ch,i)=>{const s=document.createElement('span');s.textContent=ch;s.style.setProperty('--i',i);if(i>=txt.length-3){s.className='fs-lab';s.style.setProperty('--lc',LC[i-txt.length+3]);}name.appendChild(s);});
  let k=0;el.querySelectorAll('.fs-sub').forEach(d=>{const tt=d.textContent;d.textContent='';[...tt].forEach(ch=>{const s=document.createElement('span');s.textContent=ch;s.style.setProperty('--i',k++);d.appendChild(s);});});
  SPL.q=c=>el.querySelector(c);})();
const SVGNS='http://www.w3.org/2000/svg';
const splEl=(tag,attrs,par)=>{const e=document.createElementNS(SVGNS,tag);for(const a in attrs)e.setAttribute(a,attrs[a]);(par||SPL.q('.fs-bub')).appendChild(e);return e;};
// пузырьки логотипа: снизу вверх, в порядке вылета
const SPL_BUB=[{x:187,y:140,r:13.7},{x:157,y:100,r:7},{x:202,y:88,r:10.3},{x:151,y:57,r:9.5},{x:210,y:26,r:24}];
const sEase={oc:k=>1-Math.pow(1-k,3),ob:k=>{const c1=1.9,c3=c1+1;return 1+c3*Math.pow(k-1,3)+c1*Math.pow(k-1,2);},io:k=>k<0.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2};
function splSound(fn){try{if(AC&&AC.state==='running'&&typeof AUD!=='undefined'&&AUD.ready())fn();}catch(e){}}
function splReset(){SPL.freeze=null;SPL.exitK=null;const g=SPL.q('.fs-bub');while(g.firstChild)g.removeChild(g.firstChild);SPL.bub=SPL_BUB.map((b,i)=>({...b,i,t0:1.55+i*0.15,e:splEl('circle',{cx:180,cy:330,r:0,class:'fs-solid'}),ph:i*1.7,done:false}));SPL.fx=[];SPL.spawnT=1.35;SPL.exitT=-1;
  SPL.el.style.webkitMaskImage=SPL.el.style.maskImage='';SPL.q('.fs-lock').style.transform='';SPL.q('.fs-lock').style.opacity='';}
// поверхность жидкости: волна при подъёме → застывший «плеск» логотипа
function splSurface(t){const up=sEase.oc(clamp((t-1.0)/0.8,0,1)),lvl=452-134*up,amp=16*(1-up)+4.5+1.5*Math.sin(t*2.1),ph=t*5.2,s=sEase.io(clamp((t-1.55)/0.9,0,1));const pts=[];
  for(let x=36;x<=324;x+=12){const w=amp*(Math.sin(x*0.045+ph)+0.45*Math.sin(x*0.09-ph*1.6)),tt=(x-40)/280,sw=20*Math.sin(Math.PI*(tt*1.5-0.25))-2;pts.push([x,lvl+(1-s)*w+s*(sw+0.3*w)]);}
  const line='M'+pts.map(p=>p[0]+','+p[1].toFixed(1)).join(' L');return {line,fill:line+' L324,470 L36,470 Z',vis:t>1.0};}
function splTick(now){if(!SPL.live)return;SPL.raf=requestAnimationFrame(splTick);SPL.ticks=(SPL.ticks||0)+1;const t=SPL.freeze!=null?SPL.freeze:(now-SPL.t0)/1000;
  // голос: запускает таймер на 1,8 с (кадры бывают редкими — фоновая вкладка, браузер ботов); не зазвучал — новая попытка из кадра через 0,6 с
  if(SPL.voiced&&!SPL.voxOn&&SPL.freeze==null&&!SPL.still&&FIN.splashOn&&t<SPL_VOX_T+2.8&&now>=(SPL.voxTry||0))splVoice(true);
  const sf=splSurface(SPL.still?9:t);SPL.q('.fs-liq').setAttribute('d',sf.vis||SPL.still?sf.fill:'M30,470 Z');const o=sf.vis||SPL.still?1:0;
  SPL.q('.fs-surf').setAttribute('d',sf.line);SPL.q('.fs-cut').setAttribute('d',sf.line);SPL.q('.fs-surf').style.opacity=o;SPL.q('.fs-cut').style.opacity=o;
  // пузырьки логотипа: вылет из жидкости по дуге с перелётом, «плюх» на месте и лёгкое покачивание
  for(const b of SPL.bub){const k=SPL.still?1:clamp((t-b.t0)/0.62,0,1);if(k<=0){b.e.setAttribute('r',0);continue;}
    const y=330+(b.y-330)*sEase.ob(k),x=180+(b.x-180)*sEase.oc(k)+Math.sin(k*Math.PI*2)*6*(1-k),bob=k>=1?Math.sin(t*2.4+b.ph)*1.6:0;
    const sq=k<1?1:1+0.12*Math.exp(-(t-b.t0-0.62)*7)*Math.sin((t-b.t0-0.62)*26);b.e.setAttribute('cx',x.toFixed(1));b.e.setAttribute('cy',(y+bob).toFixed(1));b.e.setAttribute('r',(b.r*Math.min(1,k*1.4)*sq).toFixed(2));
    if(k>=1&&!b.done){b.done=true;splSound(()=>AUD.osc({f0:500+b.i*140,f1:900+b.i*180,d:0.12,v:0.04,glide:0.08}));}}
  // лишние пузырьки: всплывают из горлышка и лопаются искрами
  if(!SPL.still&&t>SPL.spawnT&&t<3.9&&SPL.exitT<0){SPL.spawnT=t+rand(0.18,0.34);const r=rand(2.5,6.5);SPL.fx.push({k:'b',x:rand(150,210),y:318,r,vy:rand(120,175),ph:rand(0,6),popY:rand(-20,70),e:splEl('circle',{cx:180,cy:318,r,'stroke-width':2.2})});}
  const dt=Math.min(0.05,(now-(SPL.last||now))/1000);SPL.last=now;
  for(let i=SPL.fx.length-1;i>=0;i--){const f=SPL.fx[i];
    if(f.k==='b'){f.y-=f.vy*dt;f.x+=Math.sin(t*6+f.ph)*0.6;f.e.setAttribute('cx',f.x.toFixed(1));f.e.setAttribute('cy',f.y.toFixed(1));
      if(f.y<f.popY){f.e.remove();SPL.fx.splice(i,1);splSound(()=>AUD.nz({type:'highpass',f0:3000,d:0.03,v:0.05,a:0.001}));
        for(let j=0;j<5;j++){const a=j/5*Math.PI*2+rand(-0.3,0.3),s=rand(0.5,0.9);SPL.fx.push({k:'s',x:f.x,y:f.y,vx:Math.cos(a)*90,vy:Math.sin(a)*90,t:0,life:0.42,
          e:splEl('path',{d:'M0,-6 L1.6,-1.6 L6,0 L1.6,1.6 L0,6 L-1.6,1.6 L-6,0 L-1.6,-1.6 Z',class:'fs-spark',transform:'translate('+f.x+','+f.y+') scale('+s+')'}),s});}}}
    else{f.t+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vx*=0.9;f.vy*=0.9;const a=1-f.t/f.life;if(a<=0){f.e.remove();SPL.fx.splice(i,1);continue;}f.e.setAttribute('transform','translate('+f.x.toFixed(1)+','+f.y.toFixed(1)+') scale('+(f.s*a).toFixed(2)+') rotate('+(f.t*400).toFixed(0)+')');}}
  // выход: пузырь из колбы раскрывает титул
  if(SPL.exitT>=0){const k=SPL.exitK!=null?SPL.exitK:clamp((now-SPL.exitT)/700,0,1),e=k*k*(3-2*k),R=e*Math.hypot(innerWidth,innerHeight)*1.05;
    const m='radial-gradient(circle at '+SPL.cx.toFixed(0)+'px '+SPL.cy.toFixed(0)+'px,transparent '+R.toFixed(1)+'px,#000 '+(R+2).toFixed(1)+'px)';SPL.el.style.webkitMaskImage=m;SPL.el.style.maskImage=m;
    if(k>=1)splStop();}}
function splStop(){clearTimeout(SPL.stopT);clearTimeout(SPL.vt);SPL.live=false;cancelAnimationFrame(SPL.raf);SPL.el.classList.add('fin-hide');SPL.el.classList.remove('fs-play','fs-still');splReset();}
// голос заставки: строка — как в каталоге озвучки (сборка проверяет, что она есть в игре)
const SPL_VOX_T=1.8,SPL_VOX_TEXT='Абадзех-Лаб! Лаборатория творчества.';
const splVoxLine=()=>{try{const e=FIN.vox&&FIN.vox.find('kot',SPL_VOX_TEXT);return e&&!e.bad&&voxOn()?e:null;}catch(err){return null;}};
FIN.audioState=()=>AC?AC.state:null;   // для ботов: разрешён ли звук
FIN.splDbg=()=>({live:SPL.live,ticks:SPL.ticks||0,t:+((performance.now()-(SPL.t0||0))/1000).toFixed(2),voiced:!!SPL.voiced,voxOn:!!SPL.voxOn,gating:!!SPL.gating,still:!!SPL.still,freeze:SPL.freeze});
function splVoice(retry){SPL.voxTry=performance.now()+600;const e=splVoxLine();if(!e)return;if(retry&&!e.buf)e.pending=null;   // повтор: раскодировать заново
  voxDecode(e).then(b=>{if(b&&FIN.splashOn&&!SPL.voxOn){voxStart(e,b);SPL.voxOn=true;}});}
// «Нажмите любую кнопку»: ждём первое нажатие, включаем звук и только тогда начинаем заставку
function splGate(done){const el=SPL.el;let g=el.querySelector('.fs-gate');
  if(!g){g=document.createElement('div');g.className='fs-gate';g.innerHTML='<i class="fs-gate-bub"></i><b>Нажмите любую кнопку</b><small>клавиша, мышь или джойстик</small>';el.appendChild(g);}
  el.classList.add('fs-gating');SPL.gating=true;let fin=false,pi=0;
  const on=()=>{if(fin)return;fin=true;removeEventListener('keydown',on,true);removeEventListener('pointerdown',on,true);clearInterval(pi);
    try{initAudio();if(AC&&AC.state!=='running')AC.resume();}catch(err){}SPL.gating=false;SPL.quietT=performance.now()+450;SPL.eat=true;el.classList.remove('fs-gating');done();};
  addEventListener('keydown',on,true);addEventListener('pointerdown',on,true);
  pi=setInterval(()=>{let ps=[];try{ps=(FIN.padSrc?FIN.padSrc():navigator.getGamepads&&navigator.getGamepads())||[];}catch(err){}
    for(const p of ps)if(p&&p.buttons&&p.buttons.some(b=>b&&(b.pressed||b.value>0.5))){on();break;}},40);}
// пока ждём нажатия (и миг после него) клавиши не пропускают заставку; само нажатие, открывшее заставку, съедает первый же кадр —
// даже если он пришёл позже 450 мс (подвисание при включении звука, редкие кадры): иначе оно пропускало заставку вместе с голосом
{const _mi=menuInput;menuInput=function(){if(FIN.splashOn&&SPL.eat){SPL.eat=false;pressed.clear();return;}if(FIN.splashOn&&(SPL.gating||performance.now()<(SPL.quietT||0)))return;_mi();};}
FIN.splash=function(opt){const el=SPL.el;if(!el)return FIN.openTitle(true);splReset();el.classList.remove('fin-hide','fs-play','fs-still');el.style.opacity=1;FIN.splashOn=true;
  SPL.still=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
  const go=()=>{if(!FIN.splashOn||SPL.live)return;void el.offsetWidth;el.classList.add(SPL.still?'fs-still':'fs-play');SPL.live=true;SPL.t0=performance.now();SPL.last=0;SPL.raf=requestAnimationFrame(splTick);
    splSound(()=>{AUD.nz({f0:300,f1:2400,d:0.9,v:0.03,a:0.4,q:0.8,wet:0.4});AUD.osc({f0:420,f1:980,d:0.3,v:0.05,glide:0.25,at:1.42});[1046,1318,1568,2093].forEach((f,i)=>AUD.bell(f,{v:0.03,d:0.9,at:1.9+i*0.08,wet:0.6}));});
    SPL.voiced=false;SPL.voxOn=false;SPL.voxTry=0;const e=splVoxLine();if(e)voxDecode(e);   // запись раскодируется заранее — к 1,8 с готова
    clearTimeout(SPL.vt);SPL.vt=setTimeout(()=>{if(SPL.live&&FIN.splashOn&&SPL.freeze==null&&!SPL.still&&!SPL.voxOn){SPL.voiced=true;splVoice(false);}},SPL_VOX_T*1000);
    clearTimeout(SPL.tm);SPL.tm=setTimeout(FIN.splashEnd,SPL.still?2400:e?5400:4400);};
  // ждём встроенный шрифт (обычно мгновенно), но не дольше 300 мс
  const fonts=()=>{try{Promise.race([Promise.all([document.fonts.load("600 40px ZCComfortaa"),document.fonts.load("300 40px ZCComfortaa")]),new Promise(r=>setTimeout(r,300))]).then(go,go);}catch(e){go();}};
  // звук ещё не разрешён браузером — сначала «Нажмите любую кнопку» (боты с ?debug — только если попросили: FIN.splash({gate:true}))
  const needGate=opt&&opt.gate!=null?!!opt.gate:!/[?&]debug/.test(location.search)&&!(AC&&AC.state==='running');
  if(needGate)splGate(fonts);else fonts();
  FIN.splashEnd=()=>{if(!FIN.splashOn)return;FIN.splashOn=false;clearTimeout(SPL.tm);clearTimeout(SPL.vt);const r=SPL.q('.fs-flask').getBoundingClientRect();SPL.cx=r.left+r.width/2;SPL.cy=r.top+r.height*(324/494);
    SPL.q('.fs-lock').style.transform='scale(1.1)';SPL.q('.fs-lock').style.opacity='0';SPL.exitT=performance.now();
    clearTimeout(SPL.stopT);SPL.stopT=setTimeout(()=>{if(SPL.live&&SPL.exitK==null)splStop();},1000);   // страховка: вкладка в фоне или медленный кадр — заставка всё равно уйдёт
    if(!SPL.live){SPL.el.classList.add('fs-still');SPL.live=true;SPL.t0=performance.now()-9000;SPL.raf=requestAnimationFrame(splTick);}
    if(SPL.voxOn&&FIN.vox.cur==='splash_001')voxStop(0.35);splSound(()=>AUD.osc({f0:300,f1:900,d:0.3,v:0.05,glide:0.25}));FIN.openTitle(true);};
  el.onclick=()=>FIN.splashEnd&&FIN.splashEnd();};
// для тестов и снимков: остановить заставку на секунде t (CSS-анимации и частицы)
FIN.splashSeek=function(t,exitK){if(!SPL.live)return false;if(exitK!=null){SPL.exitK=exitK;if(FIN.splashOn)FIN.splashEnd();return true;}clearTimeout(SPL.tm);SPL.freeze=t;try{SPL.el.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=t*1000;});}catch(e){}
  SPL.spawnT=99;return true;};
