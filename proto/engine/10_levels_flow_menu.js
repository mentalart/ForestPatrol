// Все уровни игры: из меню можно начать с любого
const LEVELS=[
 {id:'p',name:'Пролог «Звенышко»',build:buildPrologue},
 {id:'luko',name:'Лукоморье',build:buildLukomorye},
 {id:'1-1',name:'1-1 · Избушка, повернись',build:()=>build11(),links:4,nuts:5,world:1},
 {id:'1-2',name:'1-2 · Кикиморино болото',build:()=>build12(),links:4,nuts:11,world:1},
 {id:'1-3',name:'1-3 · Колобок',build:()=>build13(),links:3,nuts:3,world:1},
 {id:'1-4',name:'1-4 · Леший водит',build:()=>build14(),links:4,nuts:7,world:1},
 {id:'1-5',name:'1-5 · Кикиморина прялка',build:()=>build15(),links:4,nuts:5,world:1},
 {id:'1-B',name:'1-Б · Леший-Путаник',build:()=>build1B(),boss:true,world:1},
 {id:'2-1',name:'2-1 · Гусли Садко',build:()=>build21(),links:4,nuts:5,world:2},
 {id:'2-2',name:'2-2 · Чудо-юдо Рыба-кит',build:()=>build22(),links:4,nuts:5,world:2},
 {id:'2-3',name:'2-3 · Невод',build:()=>build23(),links:3,nuts:3,world:2},
 {id:'2-4',name:'2-4 · В брюхе у кита',build:()=>build24(),links:5,nuts:5,world:2},
 {id:'2-5',name:'2-5 · Китеж звонит',build:()=>build25(),links:4,nuts:5,world:2},
 {id:'2-B',name:'2-Б · Водяной',build:()=>build2B(),boss:true,world:2},
 {id:'3-1',name:'3-1 · Сад молодильных яблок',build:()=>build31(),links:4,nuts:5,world:3},
 {id:'3-2',name:'3-2 · Облачные пастбища',build:()=>build32(),links:4,nuts:5,world:3},
 {id:'3-3',name:'3-3 · Сирин и Алконост',build:()=>build33(),links:3,nuts:3,world:3},
 {id:'3-4',name:'3-4 · Летучий корабль',build:()=>build34(),links:4,nuts:5,world:3},
 {id:'3-5',name:'3-5 · Гуси-лебеди',build:()=>build35(),links:5,nuts:5,world:3},
 {id:'3-B',name:'3-Б · Соловей-Разбойник',build:()=>build3B(),boss:true,world:3},
 {id:'4-1',name:'4-1 · Кузня Кузьмы и Демьяна',build:()=>build41(),links:4,nuts:5,world:4},
 {id:'4-2',name:'4-2 · Река Смородина',build:()=>build42(),links:4,nuts:5,world:4},
 {id:'4-3',name:'4-3 · Эй, ухнем',build:()=>build43(),links:3,nuts:3,world:4},
 {id:'4-4',name:'4-4 · Змиевы валы',build:()=>build44(),links:4,nuts:5,world:4},
 {id:'4-5',name:'4-5 · Калинов мост',build:()=>build45(),links:5,nuts:5,world:4},
 {id:'4-B',name:'4-Б · Змей Горыныч',build:()=>build4B(),boss:true,world:4},
 {id:'5-1',name:'5-1 · Сундук на дубе',build:()=>build51(),links:5,nuts:9,world:5},
 {id:'5-2',name:'5-2 · Заяц',build:()=>build52(),links:3,nuts:3,world:5},
 {id:'5-3',name:'5-3 · Утка',build:()=>build53(),links:4,nuts:5,world:5},
 {id:'5-4',name:'5-4 · Яйцо',build:()=>build54(),links:3,nuts:3,world:5},
 {id:'5-B1',name:'5-Б1 · Кощей в тереме',build:()=>build5B1(),boss:true,world:5},
 {id:'5-B2',name:'5-Б2 · Кощей Бессмертный и Златая цепь',build:()=>build5B2(),boss:true,final:true,world:5},
 {id:'epi',name:'Эпилог',build:()=>buildEpi()},
 {id:'z-i',name:'Застава · Илья Муромец: крен Калинова моста',build:()=>buildZast('i'),zast:true},
 {id:'z-d',name:'Застава · Добрыня Никитич: семерых одним махом',build:()=>buildZast('d'),zast:true},
 {id:'z-a',name:'Застава · Алёша Попович: колокольная перекличка',build:()=>buildZast('a'),zast:true}];
const LV=id=>LEVELS.findIndex(l=>l.id===id);
const W1=['1-1','1-2','1-3','1-4','1-5'],W2=['2-1','2-2','2-3','2-4','2-5'],W3=['3-1','3-2','3-3','3-4','3-5'],W4=['4-1','4-2','4-3','4-4','4-5'],W5=['5-1','5-2','5-3','5-4'],WL={1:W1,2:W2,3:W3,4:W4,5:W5},WORLDN=['Дремучий лес','Подводный Китеж','Небесное царство','Огненная Смородина','Остров Буян'];
const curWorld=()=>G.flags.w4done?5:G.flags.w3done?4:G.flags.w2done?3:G.flags.voiceDone?2:1;
const worldLinks=w=>(WL[w||curWorld()]||W1).reduce((a,id)=>a+(G.got[id]||0),0);
const worldNuts=w=>(WL[w]||W1).reduce((a,id)=>a+(G.nutsGot[id]||0),0);
const pendingLinks=()=>G.flags.w4done?Math.max(0,worldLinks(5)-(G.forgedW[5]||0)):G.flags.w3done?Math.max(0,worldLinks(4)-(G.forgedW[4]||0)):[1,2,3].reduce((a,w)=>a+Math.max(0,worldLinks(w)-(G.forgedW[w]||0)),0);
const GATE=w=>w===5?9:12;const gemsTotal=()=>Object.keys(G.gems||{}).length,gemsAvail=()=>gemsTotal()-(G.gemsSpent||0);
function goLevel(id){if(G.trans)return;G.nextLevel=id;G.trans={t:0,done:false};}
// уровень мира пройден: звенья в копилку, дальше — Лукоморье
function finishLevel(){const id=LEVELS[G.levelIdx].id;G.done[id]=true;if(LEVELS[G.levelIdx].boss||(W.linkTotal>0&&W.links>=W.linkTotal))G.gems[id]=true;G.trips=(G.trips||0)+1;G.got[id]=Math.max(G.got[id]||0,W.links);G.nutsGot[id]=Math.max(G.nutsGot[id]||0,W.nuts);G.hub=true;goLevel('luko');}

/* ============================== ПОТОК ИГРЫ ============================== */
function autoFade(){const skip=new Set(W.enemies.map(e=>e.g));if(W.zven&&W.zven.g)skip.add(W.zven.g);const have=new Set(W.fadeMeshes);const sph=new THREE.Sphere();
  const walk=o=>{if(skip.has(o))return;if(o.isMesh&&!o.isInstancedMesh&&!have.has(o)&&!Array.isArray(o.material)){const m=o.material;
      if(!(m.transparent&&m.opacity<0.9)&&!m.userData.noFade&&o.geometry&&(typeof W.autoFade!=='function'||W.autoFade(o))){if(!o.geometry.boundingSphere)o.geometry.computeBoundingSphere();o.updateWorldMatrix(true,false);sph.copy(o.geometry.boundingSphere).applyMatrix4(o.matrixWorld);
        if(sph.radius>0.3&&sph.radius<70)fadeable(o);}}for(const c of o.children)walk(c);};
  for(const c of W.group.children)walk(c);}
function loadLevel(i){G.levelIdx=i;G.soloPi=0;applyOutfits();$('bossbar').style.display='none';floats.forEach(f=>f.els.forEach(e=>e.remove()));floats.length=0;newWorld();W.levelId=LEVELS[i].id;LEVELS[i].build();if(LEVELS[i].world===2||W.autoFade)autoFade();if(LEVELS[i].world>=2)applyVest();
  for(const pi of[0,1]){const p=players[pi];p.act=W.startAct[pi];p.petals=3;p.obj=0;p.idle=0;p.pulsed=[];p.tipT=0;p.clingOffer=false;p.falls=[];p.spirit=1;p.spiritLock=0;p.cpBell=null;
    p.downed=false;p.downT=0;p.revT=0;p.yarnCd=0;p.owlCd=0;
    p.heroes.forEach((h,k)=>{h.active=k===p.act;h.following=false;h.cling=false;h.iT=0;h.knockT=0;h.guard=false;h.glide=false;h.extraY=0;h.body.position.set(0,0,0);
      h.rollT=0;h.hang=false;h.hurtT=0;h.power=null;h.firefly=25;h.hatOn=false;h.inRing=false;h.body.visible=true;h.g.scale.setScalar(1);h.lit=false;h.litK=0;h.hidden=false;h.noFeather=false;h.carry=null;h.heatK=0;if(h.skin){h.g.remove(h.skin);h.skin=null;}h.jumpK=null;h.inFlock=false;h.likhoSafe=false;
      h.face=W.spawnFace?W.spawnFace[pi][k]:Math.PI;const s=W.spawns[pi][k];placeOnGround(h,s.x,s.z,s.y||0);});
    const s0=W.spawns[pi][p.act];p.cp.set(s0.x,s0.y||0,s0.z);hideGhost(pi);}
  G.split=0;G.splitTarget=0;Object.assign(SPLIT,{focus:null,share:0.5,o:0,hold:0,outT:0,leashT:0,glow:null});G.cine=null;G.skipT=0;subT=0;bannerT=0;snapCams();$('flash').style.opacity=0;
  if(G.state==='play')showTitle();
  if(W.zvenAway&&W.zven){const Z=W.zven;Z.shown=true;Z.vis=true;Z.summonT=Math.max(Z.summonT||0,2.6);const a=active(0).pos,b=active(1).pos;Z.pos.set((a.x+b.x)/2,a.y+2.4,(a.z+b.z)/2-2.5);}
  if(W.onStart)W.onStart();}
function completeLevel(){if(G.trans)return;G.trans={t:0,done:false};}
// вышитое полотно: лён, красный крест, ромбы-обереги и «ёлочки»; у каждого мира свой второй цвет
const RUSH_ACC=['#c89a20','#2f7a3a','#2a62c8','#8a5ad0','#d8561a','#16907e'],RUSH_TEX={};
function rushnikTex(w,W0,H0,key){const k=key+'|'+w;if(RUSH_TEX[k])return RUSH_TEX[k];const c=document.createElement('canvas');c.width=W0;c.height=H0;const x=c.getContext('2d');const acc=RUSH_ACC[w]||RUSH_ACC[0],red='#b0201a';
  x.fillStyle='#f2e8d2';x.fillRect(0,0,W0,H0);x.globalAlpha=0.06;x.strokeStyle='#7a6040';for(let i=0;i<W0;i+=4){x.beginPath();x.moveTo(i,0);x.lineTo(i,H0);x.stroke();}for(let j=0;j<H0;j+=4){x.beginPath();x.moveTo(0,j);x.lineTo(W0,j);x.stroke();}x.globalAlpha=1;
  const X=(cx,cy,s,col)=>{x.strokeStyle=col;x.lineWidth=Math.max(1.4,s*0.7);x.beginPath();x.moveTo(cx-s,cy-s);x.lineTo(cx+s,cy+s);x.moveTo(cx+s,cy-s);x.lineTo(cx-s,cy+s);x.stroke();};
  const rhomb=(cx,cy,r,g,col,col2)=>{for(let i=-r;i<=r;i++)for(let j=-r;j<=r;j++){const d=Math.abs(i)+Math.abs(j);if(d===r)X(cx+i*g,cy+j*g,g*0.38,col);else if(d===Math.max(0,r-2)||d===0)X(cx+i*g,cy+j*g,g*0.38,col2);}};
  const tree=(cx,cy,g,col)=>{for(let j=0;j<6;j++)for(let i=-(5-j);i<=5-j;i+=2)X(cx+i*g,cy+j*g,g*0.36,col);for(let j=6;j<8;j++)X(cx,cy+j*g,g*0.36,col);};
  if(key==='flap'){const g=8;for(let cx=g*2;cx<W0;cx+=g*9)rhomb(cx,H0*0.35,4,g,red,acc);for(let cx=g*4;cx<W0;cx+=g*12)tree(cx,H0*0.58,g*0.8,acc);
    x.fillStyle=red;x.fillRect(0,8,W0,5);x.fillRect(0,H0-26,W0,5);for(let i=0;i<W0;i+=8){x.fillStyle=i%16?red:acc;x.fillRect(i+2,H0-20,3,18);}}
  else{const g=11,band=W0*0.2;x.fillStyle=red;x.fillRect(W0-band-10,0,4,H0);x.fillRect(W0-14,0,4,H0);for(let cy=g*3;cy<H0;cy+=g*9)rhomb(W0-band/2-12,cy,4,g,red,acc);
    for(let cy=g*6;cy<H0;cy+=g*22){for(let cx=g*3;cx<W0-band-g*3;cx+=g*12)tree(cx,cy,g*0.9,cy%(g*44)<g*22?acc:red);}
    for(let cy=g*16;cy<H0;cy+=g*22)for(let cx=g*6;cx<W0-band-g*4;cx+=g*9)rhomb(cx,cy,3,g*0.8,red,acc);
    x.fillStyle=acc;x.fillRect(0,0,W0,6);x.fillRect(0,H0-6,W0,6);}
  const t=key==='flap'?new THREE.CanvasTexture(c):c.toDataURL();RUSH_TEX[k]=t;return t;}
const RT={};
function rtInit(){if(RT.el)return RT;const el=document.createElement('div');el.id='rtrans';el.innerHTML='<div class="rth rtl"></div><div class="rth rtr"></div><div class="rtm"><div class="rtw"></div><div class="rtt"><span></span><i></i></div></div>'+'<b class="rts"></b>'.repeat(10);
  $('ui').appendChild(el);RT.el=el;RT.L=el.querySelector('.rtl');RT.R=el.querySelector('.rtr');RT.m=el.querySelector('.rtm');RT.w=el.querySelector('.rtw');RT.t=el.querySelector('.rtt span');RT.n=el.querySelector('.rtt i');RT.sp=[...el.querySelectorAll('.rts')];return RT;}
function rtInfo(){const idx=G.nextLevel?LV(G.nextLevel):G.levelIdx+1;const L=LEVELS[idx]||{name:''};const w=L.world||0;
  return {w,name:L.id==='luko'?'Лукоморье':L.name,line:L.id==='luko'?'у лукоморья дуб зелёный…':L.zast?'Застава богатырей':w?'Мир '+w+' · '+WORLDN[w-1]:''};}
function rtShow(T){const R=rtInit();if(!T.info){T.info=rtInfo();const img='url('+rushnikTex(T.info.w,420,1000,'half')+')';R.L.style.backgroundImage=img;R.R.style.backgroundImage=img;R.R.style.transform='scaleX(-1)';R.w.textContent=T.info.line;R.t.textContent=T.info.name;}
  const t=T.t,eob=q=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(q-1,3)+c1*Math.pow(q-1,2);};
  const ci=clamp(t/0.55,0,1),co=clamp((t-1.55)/0.6,0,1),off=(1-eob(ci))*108+smooth(co)*108,wav=Math.sin(t*10)*2.4*((1-ci)+co);
  R.L.style.transform='translateX('+(-off).toFixed(2)+'%) skewY('+wav.toFixed(2)+'deg)';R.R.style.transform='translateX('+off.toFixed(2)+'%) scaleX(-1) skewY('+wav.toFixed(2)+'deg)';
  const mi=t<0.45?0:t<0.85?eob((t-0.45)/0.4):1,mo=clamp((t-1.45)/0.35,0,1),sc=(0.3+0.7*mi)*(1+0.25*mo);
  R.m.style.opacity=(t<0.45?0:1-mo).toFixed(3);R.m.style.transform='translate(-50%,-50%) scale('+sc.toFixed(3)+') rotate('+((1-mi)*-6).toFixed(2)+'deg)';
  const rv=clamp((t-0.7)/0.6,0,1);R.t.style.clipPath='inset(0 '+((1-rv)*100).toFixed(1)+'% 0 0)';R.n.style.left=(rv*100).toFixed(1)+'%';R.n.style.opacity=rv>0&&rv<1?1:0;
  R.sp.forEach((s,i)=>{const a=i/10*Math.PI*2+t*1.6,r=150+40*Math.sin(t*3+i);s.style.left='calc(50% + '+(Math.cos(a)*r*1.6).toFixed(0)+'px)';s.style.top='calc(50% + '+(Math.sin(a)*r*0.7).toFixed(0)+'px)';s.style.opacity=(mi*(1-mo)*(0.5+0.5*Math.sin(t*8+i))).toFixed(2);});
  R.el.style.display='block';if(t<0.05||(t>0.54&&t<0.58&&!T.snd)){if(t>0.5){T.snd=true;tone(mf(62),0.5,'triangle',0.08);tone(mf(69),0.5,'triangle',0.06,null,0.1);}else tone(mf(74),0.3,'sine',0.04,mf(62));}}
function updateTrans(dt){const T=G.trans;if(!T)return;T.t+=dt;$('fade').style.opacity=0;rtShow(T);
  if(T.t>0.8&&!T.done){T.done=true;if(G.nextLevel){const id=G.nextLevel;G.nextLevel=null;loadLevel(LV(id));}else if(G.levelIdx+1<LEVELS.length)loadLevel(G.levelIdx+1);else endGame();}if(T.t>2.15){G.trans=null;$('fade').style.opacity=0;if(RT.el)RT.el.style.display='none';}}
function step(dt){G.time+=dt;G.playTime+=dt;if(G.uiTick&&!G.cine&&!G.trans)G.uiTick();
  if(G.cine){const c=G.cine;c.t+=dt;c.update(c.t,dt);
    if(c.skippable&&c.t>0.8){if(G.solo?btn(G.soloPi,'jump'):(btn(0,'jump')&&btn(1,'jump')))G.skipT+=dt;else G.skipT=Math.max(0,G.skipT-dt*2);if(G.skipT>=1){G.skipT=0;c.skip();c.t=c.dur;}}
    if(c.t>=c.dur&&G.cine===c){G.cine=null;G.skipT=0;c.end();}}
  HEROES.forEach(h=>tickHero(h,dt));
  for(const pi of[0,1])updatePlayer(pi,dt);
  updateLight(dt);
  for(const h of HEROES)if(!h.cling)integrate(h,dt);
  updateWaters(dt);updateChests(dt);updateW3(dt);updateW4(dt);updateSigns(dt);updateLikhos(dt);updateFlocks5(dt);
  updateMovers(dt);updateThreads(dt);updateWorldObjects(dt);updateRZT(dt);for(const e of W.enemies.slice())updateFoe(e,dt);
  updateBolts(dt);updateShots(dt);updateSparks(dt);updateItems(dt);updatePowers(dt);updateTimers(dt);updateAnims(dt);updateDebris(dt);W.owlT=Math.max(0,W.owlT-dt);
  for(const u of W.updates)u(dt);
  updateZven(dt);updateObjectives(dt);updateGhosts(dt);updateFx(dt);updateFade(dt);
  for(const h of HEROES)animHero(h,dt);wearTick(dt);
  updateRig(0,dt);updateRig(1,dt);updateShared(dt);decideSplit(dt);updateTrans(dt);}
function menuHTML(mode){const row=(pi,a,t,later)=>'<tr'+(later?' class="later"':'')+'><td>'+t+'</td><td>'+(a==='move'?MOVEK(pi):K(pi,a))+'</td></tr>';
  const col=pi=>'<div class="col p'+(pi+1)+'"><h2 style="color:'+PCSS[pi]+'">Игрок '+(pi+1)+' · '+(pi?'Пелагея и Йоша':'Прошка и Потап')+'</h2><table>'+
   row(pi,'move','Ходьба')+row(pi,'jump',pi?'Прыжок (держи — Пелагея планирует)':'Прыжок (Прошка — выше всех)')+row(pi,'swap','Смена героя')+
   row(pi,'skill',pi?'Свой приём (Йоша — ковшик живой воды)':'Свой приём (Прошка — рогатка)')+row(pi,'guard','Защита')+row(pi,'attack','Удар')+row(pi,'call','«Ко мне!»')+
   row(pi,'item','Чудо-вещь: клубок (мир 1), гусли (мир 2), перо (мир 3), клещи (мир 4); на Буяне — вещь по знаку',true)+row(pi,'roll','Кувырок — откроется в 1-2',true)+'</table></div>';
  let top='<h1>Златая цепь</h1><div class="sub">Пролог, пять миров и эпилог: «Дремучий лес», «Подводный Китеж», «Небесное царство», «Огненная Смородина», «Остров Буян» · Застава трёх богатырей · 3D greybox · кооператив на двоих (клавиатура и/или два джойстика) или одиночный режим — один игрок и все четверо героев</div><div class="epi">У лукоморья дуб зелёный; златая цепь на дубе том…</div>';
  if(mode==='end'&&G.flags.w5done){const s=G.stats,m=Math.floor(G.playTime/60),sec=Math.floor(G.playTime%60),t=G.flags.skaz5,allL=[1,2,3,4,5].reduce((a,w)=>a+worldLinks(w),0),allN=[1,2,3,4,5].reduce((a,w)=>a+worldNuts(w),0);
    const EN={ushel:'Кощей ушёл по воде, перстень остался на ветке',proshen:'Кощея простили, и он попросил прощения — живёт на дальнем берегу',slushat:'Кощея позвали слушать — он сидит у корней рядом с Котом'};const med=Object.values(G.medals||{});
    return top+'<h2 style="color:#ffd76a">Златая цепь скована!</h2><div class="res">Звенья всех миров: '+allL+' · Орешки: '+allN+' · Время: '+m+' мин '+sec+' с'+(s.skips?' · пропущено роликов: '+s.skips:'')+
      (t?'<br>Пятый Сказ, который услышал Кощей: <i>'+t[0]+'. И помогал ему '+String(t[1]).replace(/^./,c=>c.toLowerCase())+'. '+t[2]+'.</i>':'')+
      '<br>Концовка: '+(G.flags.ending||[]).map(k=>EN[k]).join(' · а иные сказывают: ')+
      '<br>Щитов: '+s.shields+' · Отбивов: '+s.parries+' · «Одним махом»: '+s.mahs+' · Добивающих махов: '+s.finishers+' · Богатырских махов: '+s.bogatyr+(G.stats.likho?' · Лихо на плечах: '+G.stats.likho:'')+
      '<br>Смен героя: '+s.swaps+' · Падений (без урона): '+s.falls+' · Подшили друга: '+s.revives+(Object.keys(G.zbest||{}).length?' · испытаний Заставы: '+Object.keys(G.zbest).length:'')+
      '<br><span style="opacity:.8">Звено сковано руками Прошки и держится словом Пелагеи. Кот Учёный идёт по цепи кругом — направо песнь заводит, налево сказку говорит. И первая сказка у него — наша. Лукоморье открыто: Кощей там, где его оставила сказка, в избе Кота — тетрадка с пятым Сказом, у Заставы ждут испытания богатырей.</span></div><div class="go">Enter или Start — гулять по Лукоморью</div>';}
  if(mode==='end'&&G.flags.w4done){const s=G.stats,m=Math.floor(G.playTime/60),sec=Math.floor(G.playTime%60),nuts=worldNuts(4),t=G.flags.skaz4;
    return top+'<h2 style="color:#ff9a50">Мир 4 «Огненная Смородина» пройден!</h2><div class="res">Звенья мира: '+worldLinks(4)+' / 20 · Орешки: '+nuts+' / 23 · Время: '+m+' мин '+sec+' с'+(s.skips?' · пропущено роликов: '+s.skips:'')+
      (t?'<br>Сказ «Одно сердце»: <i>'+t[0]+'. И помог им '+t[1]+'. '+t[2]+'.</i>':'')+
      '<br>Щитов: '+s.shields+' · Отбивов: '+s.parries+' · «Одним махом»: '+s.mahs+' · Добивающих махов: '+s.finishers+' · Богатырских махов: '+s.bogatyr+
      '<br>Смен героя: '+s.swaps+' · Падений (без урона): '+s.falls+' · Подшили друга: '+s.revives+
      '<br><span style="opacity:.8">Горыныч в узде и по уговору возит нас. Головы рассказали про ученика Кота — мальчишку с молотом, который вырос и стал костью да ключами. Пелагея начала новую сказку: «Жил-был мальчишка, который хотел сочинять сказки…» — и остановилась. Цепь на дубе снова наполовину. Горыныч проснулся — на карте-рушнике открылся Мир 5 «Остров Буян».</span></div><div class="go">Enter или Start — вернуться на Лукоморье</div>';}
  if(mode==='end'&&G.flags.w3done){const s=G.stats,m=Math.floor(G.playTime/60),sec=Math.floor(G.playTime%60),nuts=worldNuts(3),t=G.flags.skaz3;
    return top+'<h2 style="color:#ffb060">Мир 3 «Небесное царство» пройден!</h2><div class="res">Звенья мира: '+worldLinks(3)+' / 20 · Орешки: '+nuts+' / 23 · Время: '+m+' мин '+sec+' с'+(s.skips?' · пропущено роликов: '+s.skips:'')+
      (t?'<br>Сказ «Соловьиная песня»: <i>'+t[0]+'. И помог им '+t[1].replace(/^./,c=>c.toLowerCase())+'. '+t[2]+'.</i>':'')+
      '<br>Щитов: '+s.shields+' · Отбивов: '+s.parries+' · «Одним махом»: '+s.mahs+' · Добивающих махов: '+s.finishers+' · Богатырских махов: '+s.bogatyr+' · Перо зажигали: '+(s.feathers||0)+
      '<br>Смен героя: '+s.swaps+' · Падений (без урона): '+s.falls+' · Подшили друга: '+s.revives+' · Гуси уносили: '+(s.geese||0)+
      '<br><span style="opacity:.8">Соловей снова поёт — с ним запела Пелагея. А на празднике пришёл Кощей, порвал цепь на дубе и забрал Звенышко: «Сказок не будет». Дуб стоит голым, звенья у нас в горсти. Прошка сказал: «Скуём заново». На карте-рушнике открылся Мир 4 «Огненная Смородина» — уже без Звенышка.</span></div><div class="go">Enter или Start — вернуться на Лукоморье</div>';}
  if(mode==='end'&&G.flags.w2done){const s=G.stats,m=Math.floor(G.playTime/60),sec=Math.floor(G.playTime%60),nuts=worldNuts(2),t=G.flags.skaz2;
    return top+'<h2 style="color:#7ad0f0">Мир 2 «Подводный Китеж» пройден!</h2><div class="res">Звенья мира: '+worldLinks(2)+' / 20 · Орешки: '+nuts+' / 23 · Время: '+m+' мин '+sec+' с'+(s.skips?' · пропущено роликов: '+s.skips:'')+
      (t?'<br>Сказ «Колокола Китежа»: <i>'+t[0]+'. И помог им '+t[1].replace(/^./,c=>c.toLowerCase())+'. '+t[2]+'.</i>':'')+
      '<br>Щитов: '+s.shields+' · Отбивов: '+s.parries+' · «Одним махом»: '+s.mahs+' · Добивающих махов: '+s.finishers+' · Богатырских махов: '+s.bogatyr+
      '<br>Смен героя: '+s.swaps+' · Падений (без урона): '+s.falls+' · Подшили друга: '+s.revives+' · Звенышко подтянуло оставленных: '+s.carries+
      '<br><span style="opacity:.8">Водяного убаюкали колокола Китежа. Йоша научился просить, Прошка молча отдал Пелагее звено, а Пелагея впервые рассказала Сказ сама — шёпотом. Цепь на дубе стала длиннее. На карте-рушнике открылся Мир 3 «Небесное царство».</span></div><div class="go">Enter или Start — вернуться на Лукоморье</div>';}
  if(mode==='end'&&G.flags.voiceDone){const s=G.stats,m=Math.floor(G.playTime/60),sec=Math.floor(G.playTime%60),nuts=W1.reduce((a,id)=>a+(G.nutsGot[id]||0),0),t=G.flags.skaz;
    return top+'<h2 style="color:#ffc93c">Мир 1 «Дремучий лес» пройден!</h2><div class="res">Звенья мира: '+worldLinks()+' / 19 · Орешки: '+nuts+' / 23 · Время: '+m+' мин '+sec+' с'+(s.skips?' · пропущено роликов: '+s.skips:'')+
      (t?'<br>Сказ «Леший-проводник»: <i>'+t[0]+'. И помог им '+t[1].replace(/^./,c=>c.toLowerCase())+'. '+t[2]+'.</i>':'')+
      '<br>Щитов: '+s.shields+' · Отбивов: '+s.parries+' · «Одним махом»: '+s.mahs+' · Добивающих махов: '+s.finishers+' · Богатырских махов: '+s.bogatyr+' · Нитей склеено: '+s.glue+
      '<br>Смен героя: '+s.swaps+' · Падений (без урона): '+s.falls+' · Подшили друга: '+s.revives+' · Звенышко подтянуло оставленных: '+s.carries+
      '<br><span style="opacity:.8">Кощей унёс голос Кота. Кот теперь мяукает, а следующие Сказы рассказывает Пелагея. На карте-рушнике открылся Мир 2 «Подводный Китеж».</span></div><div class="go">Enter или Start — вернуться на Лукоморье</div>';}
  if(mode==='end'){const s=G.stats,m=Math.floor(G.playTime/60),sec=Math.floor(G.playTime%60);
    return top+'<h2 style="color:#ffc93c">Пролог пройден! Звенья: '+Math.max(1,G.links)+' (Звенышко)</h2><div class="res">Время: '+m+' мин '+sec+' с'+(s.skips?' · пропущено роликов: '+s.skips:'')+
      '<br>Щитов: '+s.shields+' · Отбивов: '+s.parries+' · «Одним махом»: '+s.mahs+' · Добивающих махов: '+s.finishers+' · Искр собрано: '+s.sparks+
      '<br>Смен героя: '+s.swaps+' · Падений (без урона): '+s.falls+' · Звенышко подтянуло оставленных: '+s.carries+
      '<br><span style="opacity:.8">Дальше по сценарию — Мир 1 «Дремучий лес», уровень 1-1 «Избушка, повернись» (он есть в вертикальном срезе).</span></div><div class="go">Enter или Start — сыграть снова</div>';}
  const padRows=[[STICK,'Ходьба'],[padGlyph('jump'),'Прыжок (держать — планировать)'],[padGlyph('swap'),'Смена героя'],[padGlyph('skill'),'Свой приём'],[padGlyph('guard'),'Защита'],[padGlyph('attack'),'Удар'],
    [padGlyph('call'),'«Ко мне!»'],['<span class="pb T">Start</span>','Пауза / начать'],[padGlyph('item')+padGlyph('roll'),'<span style="opacity:.5">Чудо-вещь: клубок / гусли / перо / клещи / по знаку · Кувырок (1-2)</span>']];
  const padCol='<div class="col" style="border:3px solid #56607a;margin-top:14px"><h2>Джойстики · раскладка по сценарию v4 (Xbox / PlayStation)</h2><div class="padgrid">'+padRows.map(r=>'<div>'+r[0]+' '+r[1]+'</div>').join('')+'</div><div style="margin-top:8px;font-size:13px;opacity:.85">'+padStatus()+'</div></div>';
  const pbtn=pi=>{const p=players[pi];return '<button id="e'+pi+'" class="'+p.path+'">Игрок '+(pi+1)+': '+PATHNAME[p.path]+' <kbd>'+(pi?'K':'Q')+'</kbd></button>';};
  // одиночный режим: одна колонка управления (любая половина клавиатуры или любой джойстик) и одна сложность на всех
  const srow=(a,t,later)=>'<tr'+(later?' class="later"':'')+'><td>'+t+'</td><td>'+(PADS.gp[0]||PADS.gp[1]?(a==='move'?STICK:padGlyph(a)):a==='move'?'<kbd>WASD</kbd> <kbd>↑←↓→</kbd>':'<kbd>'+KEYNAME[BIND[0][a]]+'</kbd> <kbd>'+KEYNAME[BIND[1][a]]+'</kbd>')+'</td></tr>';
  const colS='<div class="col p1" style="flex:1"><h2 style="color:#ffd76a">Одиночный режим · все четверо героев</h2><table>'+srow('move','Ходьба')+srow('jump','Прыжок (Прошка — выше всех, Пелагея — держи, и она планирует)')+
   srow('swap','Выбрать героя — по кругу: Прошка → Потап → Пелагея → Йоша')+srow('skill','Свой приём (рогатка Прошки, ковшик живой воды Йоши…)')+srow('guard','Защита')+srow('attack','Удар')+srow('call','«Ко мне!» — зовёт всех троих')+
   srow('item','Чудо-вещь: клубок (мир 1), гусли (мир 2), перо (мир 3), клещи (мир 4); на Буяне — вещь по знаку',true)+srow('roll','Кувырок — откроется в 1-2',true)+'</table>'+
   '<div style="font-size:14px;opacity:.85;margin-top:8px">Играй на любой половине клавиатуры или любым джойстиком. Уровни те же. Где нужно «вдвоём» (мах, щит, ковка, репка, пляски) — второй герой помогает сам.</div></div>';
  const modeRow='<div class="mode"><button id="coopb" class="'+(G.solo?'':'on')+'">Вдвоём<small>кооператив на двоих</small></button><button id="solob" class="'+(G.solo?'on':'')+'">Одиночный режим <kbd>O</kbd><small>один игрок · все четверо</small></button></div>';
  const sbtn='<button id="e0" class="'+players[0].path+'">Сложность: '+PATHNAME[players[0].path]+' <kbd>Q</kbd></button>';
  return top+(mode==='pause'&&W&&W.pauseLine?'<div class="legend"><div style="flex:1"><b>Что мы делаем:</b> '+W.pauseLine+'</div></div>':'')+modeRow+'<div class="cols">'+(G.solo?colS:col(0)+col(1))+'</div>'+padCol+
   '<div class="legend"><div><i class="sg y"></i> солнышко над мороком — Защита: раньше — щит, позже — отбив, в самый миг — «Одним махом»</div><div>угольки <i class="sg e"></i> погасли — Пробой → Удар: Добивающий мах</div>'+
   '<div><i class="sg o"></i> жёлтая плита с лапкой — встать любому; ворота открыты, пока плиту держат</div><div>над героем картинка кнопки — жми её этим героем</div><div>ролик: '+(G.solo?'держи прыжок':'оба держат прыжок')+' — пропуск</div></div>'+
   '<div class="diff">'+(G.solo?sbtn:pbtn(0)+pbtn(1))+'<button id="subsb">Субтитры: '+(G.subs?'вкл':'выкл')+' <kbd>C</kbd></button></div>'+
   (mode==='menu'?'<div class="lvsel"><button id="lvp">‹</button><span class="nm">Начать с: '+LEVELS[G.startIdx||0].name+'</span><button id="lvn">›</button></div><div style="text-align:center;font-size:13px;opacity:.7">выбор уровня — <kbd>←</kbd><kbd>→</kbd> / <kbd>A</kbd><kbd>D</kbd> / крестовина</div>':'')+
   '<div class="go">'+(mode==='pause'?'Enter / Esc / Start — продолжить':'Enter или Start — начать')+'</div>';}
function cyclePath(pi){const p=players[pi];p.path=PATHS[(PATHS.indexOf(p.path)+1)%3];if(G.solo)players[1-pi].path=p.path;}
function showMenu(mode){G.state=mode;const card=$('card');card.innerHTML=menuHTML(mode);$('menu').classList.remove('hide');
  for(const pi of[0,1]){const b=$('e'+pi);if(b)b.onclick=()=>{cyclePath(pi);showMenu(mode);};}const sb=$('subsb');if(sb)sb.onclick=()=>{G.subs=!G.subs;showMenu(mode);};const cb=$('coopb'),ob=$('solob');if(cb)cb.onclick=()=>{setSolo(false);SFX.swap();showMenu(mode);};if(ob)ob.onclick=()=>{setSolo(true);SFX.swap();showMenu(mode);};
  const lp=$('lvp'),ln=$('lvn');if(lp)lp.onclick=()=>{pickLevel(-1);};if(ln)ln.onclick=()=>{pickLevel(1);};}
function pickLevel(d){G.startIdx=((G.startIdx||0)+d+LEVELS.length)%LEVELS.length;SFX.swap();showMenu('menu');}
// начать с любого уровня: всё, что раньше, считается пройденным со всеми звеньями
function startFrom(i){for(const k in G.stats)G.stats[k]=0;G.playTime=0;G.links=0;G.flags={};G.done={};G.got={};G.nutsGot={};G.forgedLinks=0;G.forgedW={1:0,2:0,3:0,4:0,5:0};G.zbest={};G.gems={};G.gemsSpent=0;G.nutsSpent=0;G.nutsHub=0;G.trips=0;G.garden=null;G.hen=null;G.owned={};G.secrets={};G.tales={};document.body.classList.remove('photo');
  players.forEach(p=>{p.enc={};p.shieldTaught=false;p.closedTaught=false;p.staggerSeen=0;p.blue=0;p.act=0;});
  const L=LEVELS[i];G.hub=i>=LV('1-1');if(i>=LV('luko'))G.links=1;if(i>LV('luko'))G.flags.map1=true;
  LEVELS.forEach((l,k)=>{if(l.world&&!l.boss&&k<i){G.done[l.id]=true;G.got[l.id]=l.links;G.nutsGot[l.id]=l.nuts;G.gems[l.id]=true;G.trips++;}if(l.world&&l.boss&&k<i&&l.id!=='5-B2')G.gems[l.id]=true;});
  if(i>LV('1-B')){G.done['1-B']=true;G.flags.forged=true;G.flags.voiceDone=true;G.flags.coils=1;G.flags.w2intro=true;G.flags.map2=true;G.forgedW[1]=19;G.flags.skaz=['Жили-были звери во лесу','Леший со светлячком-огоньком','И стал Леший дорогу казать'];}
  if(i>LV('2-B')){G.done['2-B']=true;G.flags.forged2=true;G.flags.w2done=true;G.flags.coils=2;G.flags.w3intro=true;G.flags.map3=true;G.forgedW[2]=20;G.flags.skaz2=['В граде, где все крепко спали','Рыба-кит, что издалёка подшивает','И кит корабли глотать не стал: зуб у него болеть перестал'];}
  if(i>LV('3-B')){G.done['3-B']=true;G.flags.forged3=true;G.flags.w3done=true;G.flags.coils=3;G.flags.w4intro=true;G.flags.map4=true;G.forgedW[3]=20;G.flags.skaz3=['Над облаками темень легла','Жар-птица с пёрышком тёплым','И Соловей запел опять: с ним первым кто-то стал подпевать'];
    G.flags.w4c=['4-1','4-2','4-4'].filter(id=>G.done[id]).length;}
  if(i>LV('4-B')){G.done['4-B']=true;G.flags.forged4=true;G.flags.w4done=true;G.flags.coils=4;G.flags.w4c=3;G.flags.w5intro=true;G.flags.map5=true;G.forgedW[4]=20;G.flags.skaz4=['Три головы всё спорили — не сговорились','Демьян с молотом тяжёлым','И понял Змей: у трёх голов — одно сердце'];}
  if(i>LV('5-3'))G.flags.sand=true;if(i>LV('5-4'))G.flags.zvenBack=true;
  if(i>LV('5-B1')){G.done['5-B1']=true;G.flags.forged5=true;G.forgedW[5]=15;G.flags.bezImen=true;G.flags.nameless=true;G.flags.names={};}
  if(i>LV('5-B2')){G.done['5-B2']=true;G.flags.w5done=true;G.flags.epiDone=i>LV('epi');G.flags.coils=5;G.flags.nameless=false;G.flags.names={potap:true,yosha:true,proshka:true,pelageya:true};G.flags.kotVoice=true;G.flags.ending=['slushat'];G.flags.claspQ=0.8;
    G.flags.skaz5=['Жил-был мальчик — сказки сам сложить мечтал','Рыба-кит','И позвали его слушать — сел он в круг'];}
  if(L.boss){if(L.world===5){G.flags.forged5=true;G.forgedW[5]=Math.max(G.forgedW[5]||0,15);if(L.id==='5-B2'){G.done['5-B1']=true;G.flags.bezImen=true;G.flags.nameless=true;G.flags.names={};}}else if(L.world===4){G.flags.forged4=true;G.forgedW[4]=12;}else if(L.world===3){G.flags.forged3=true;G.forgedW[3]=12;}else if(L.world===2){G.flags.forged2=true;G.forgedW[2]=12;}else{G.flags.forged=true;G.forgedW[1]=12;}}
  G.forgedLinks=G.forgedW[1]+G.forgedW[2]+G.forgedW[3]+G.forgedW[4]+G.forgedW[5];loadLevel(i);hideMenu();}
function showTitle(){const lv=$('level');lv.innerHTML=W.name+'<br><span style="font-size:18px;font-weight:600;opacity:.85">'+W.sub+'</span>';lv.style.opacity=1;clearTimeout(showTitle.t);showTitle.t=setTimeout(()=>{lv.style.opacity=0;},3600);}
function hideMenu(){const first=G.state!=='pause';$('menu').classList.add('hide');G.state='play';initAudio();if(first)showTitle();}
function endGame(){showMenu('end');}
function restart(){startFrom(0);}
function menuInput(){if(G.state==='end'){if(pressed.has('Enter')){if(G.flags.voiceDone){$('menu').classList.add('hide');G.state='play';}else restart();}return;}
  if(G.state==='menu'){const a=uiNav(0),b=uiNav(1),d=a.dx||b.dx;if(d||pressed.has('ArrowLeft')&&!d||pressed.has('ArrowRight')&&!d){pickLevel(d||(pressed.has('ArrowLeft')?-1:1));return;}
    if(pressed.has('Enter')){const i=G.startIdx||0;if(i===0&&W.levelId==='p'&&!G.playTime)hideMenu();else startFrom(i);return;}}
  if(pressed.has('Tab')||pressed.has('PadBack')){PADS.swap=!PADS.swap;showMenu(G.state);}if(pressed.has('KeyQ')){cyclePath(0);showMenu(G.state);}if(pressed.has('KeyK')){cyclePath(1);showMenu(G.state);}
  if(pressed.has('KeyC')){G.subs=!G.subs;showMenu(G.state);}if(pressed.has('KeyO')){setSolo(!G.solo);SFX.swap();showMenu(G.state);}
  if(pressed.has('Enter')||(G.state==='pause'&&pressed.has('Escape')))hideMenu();}
let last=performance.now();
function frame(now){requestAnimationFrame(frame);let dt=Math.min(0.05,(now-last)/1000);last=now;pollPads();
  if(G.state==='play'&&(pressed.has('KeyP')||pressed.has('PadBack')))togglePhoto();
  if(G.state==='play'&&G.manual){}else if(G.state==='play'){if(pressed.has('Escape')){showMenu('pause');}else{if(G.hitstop>0){G.hitstop-=dt;dt*=0.15;}step(dt);}}else menuInput();
  render();updateUI(Math.min(0.05,G.state==='play'?dt:0));pressed.clear();}
hudInit();loadLevel(0);showMenu('menu');requestAnimationFrame(frame);
window.ZC={G,players,loadLevel,HERO,get W(){return W;},step,completeLevel,finishLevel,goLevel,startFrom,LEVELS,LV,worldLinks,setSolo,menuKey(c){pressed.add(c);menuInput();pressed.clear();},
  sim(sec){const n=Math.round(sec*60);for(let i=0;i<n;i++){if(G.state!=='play')break;step(1/60);if(i%30===0)updateUI(1/60);pressed.clear();}render();updateUI(1/60);},
  start(){hideMenu();},menu:showMenu,tick(n){for(let i=0;i<(n||1);i++){step(1/60);pressed.clear();}},press(c){pressed.add(c);},hold(c,on){if(on)down.add(c);else down.delete(c);},skip(){if(G.cine){G.cine.skip();G.cine.t=G.cine.dur;}}};
})();
