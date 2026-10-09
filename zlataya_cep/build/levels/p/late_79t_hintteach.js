/* ============================== РЕЛИЗ final06 · ПРОЛОГ: УРОК «ПОДСКАЗКИ — НА КНОПКЕ» ============================== */
// Подсказки по умолчанию выключены (late_79_hints.js): их показывает и прячет LB джойстика / H клавиатуры. В прологе этому учит отдельная крупная
// карточка #hnTeach (её не прячет «Подсказки: выкл» и она не считается подсказкой — LB её не трогает), три шага:
//  1) через 2 с игры: «Подсказки спрятаны. Нужна подсказка — нажми LB» — ждёт нажатия (HNS.taps);
//  2) «Вот она! Ещё раз LB — и подсказка спрячется» — ждёт второго нажатия или пока подсказка уйдёт сама;
//  3) «Получилось! …» — 5 с, конец. Не нажали за 40 с — карточка уходит (урок не держит игру).
// Урок идёт только при «Подсказки: выкл»; включили подсказки — урок кончается. Каждый заход в пролог — заново. В роликах, паузе и окнах карточка ждёт.
const HT={W:null,st:0,t:0,taps:0,el:null};
const htKeys=()=>{const a=K(0,'help');if(G.solo)return a;const b=K(1,'help');return a===b?a:a+' / '+b;};
const HT_TXT=[null,
  k=>'Подсказки спрятаны.<br>Нужна подсказка — нажми '+k+'.',
  k=>'Вот она! Нажми '+k+' ещё раз —<br>и подсказка спрячется.',
  k=>'Получилось! Подсказка — всегда на '+k+'.<br>Показывать сразу — пауза → «Подсказки».'];
function htDom(){if(HT.el&&HT.el.isConnected)return HT.el;const d=document.createElement('div');d.id='hnTeach';d.className='hn-card';
  d.innerHTML='<div class="hn-body"></div>';($('tip0')?$('tip0').parentNode:document.body).appendChild(d);return HT.el=d;}
function htTick(){const el=htDom();
  if(!W||W.levelId!=='p'){if(HT.st){HT.st=0;}el.classList.remove('on');return;}
  if(HT.W!==W){HT.W=W;HT.st=0;HT.t=0;}
  const lv=$('level'),off=!!G.cine||G.ui||G.state!=='play'||document.body.classList.contains('fin-title')||(lv&&lv.style.opacity==='1'&&G.time-HN.titleT<4.2);
  const dt=HNS.dt||0;
  if(HT.st>=0&&!off){
    if(HT.st>0&&HT.st<3&&hnOn())HT.st=-1;                                   // подсказки включили — учить нечему
    else if(HT.st===0){if(!hnOn()&&(HT.t+=dt)>2){HT.st=1;HT.t=0;HT.taps=HNS.taps;}}
    else if(HT.st===1){if(HNS.taps>HT.taps){HT.st=2;HT.t=0;HT.taps=HNS.taps;}else if((HT.t+=dt)>40)HT.st=-1;}
    else if(HT.st===2){HT.t+=dt;if(HNS.taps>HT.taps||(HT.t>1&&!HN.shown.some(Boolean))){HT.st=3;HT.t=0;}else if(HT.t>40)HT.st=-1;}
    else if(HT.st===3){if((HT.t+=dt)>5)HT.st=-1;}}
  const on=!off&&HT.st>0;
  if(on){const h=HT_TXT[HT.st](htKeys());const b=el.firstChild;if(b.innerHTML!==h){b.innerHTML=h;el.classList.remove('hn-pop');void el.offsetWidth;el.classList.add('hn-pop');}}
  el.classList.toggle('on',on);}
{const _ui=updateUI;updateUI=function(dt){_ui(dt);try{htTick();}catch(e){console.error('hintteach',e);}};}
FIN.hintTeach={state:()=>({st:HT.st,t:HT.t,on:!!(HT.el&&HT.el.classList.contains('on')),text:HT.el?HT.el.textContent:''})};   // для ботов
