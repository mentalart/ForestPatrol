// ---- продолжение build5B2 (k5epic, часть 9): АКТ II «НЕВЕДОМЫЕ ДОРОЖКИ» — страницы-двери, переход в сказку, поездки домой ----
  // Четыре листа из тетрадки стоят дверями по краям Лукоморья. Стадии 4–7: дойти вдвоём до порога своей страницы → бумажная вспышка →
  // арена мира (построена в том же уровне далеко в стороне, x = 300…900; без загрузки) → друг свободен → поездка домой (30 с) → Лукоморье.
  const PPOS=[null,[-13.5,-9.5],[13.5,-9.5],[-12,-20.5],[12,-20.5]];
  const PAGES=[null];for(let w=1;w<=4;w++){const [x,z]=PPOS[w];const P=K5L.page(new V3(x,0,z),Math.atan2(C.x-x,C.z-z),w);P.g.visible=false;PAGES.push(P);}E.pages=PAGES;
  E.pagesShow=(on,fx)=>{for(let w=1;w<=4;w++){const P=PAGES[w],show=on&&!E.done[w+3];P.g.visible=show;if(show&&fx){P.g.scale.setScalar(0.01);later(0.2+w*0.3,()=>{anim(0.6,k=>P.g.scale.setScalar(Math.max(0.01,CE.outBack(k))));K5L.gold(P.g.position.clone().add(new V3(0,2.4,0)),12);k5s('book');});}}};
  // всё, что построено в fn (меши в W.group), — в отдельную группу: арена скрыта, пока герои не в ней
  E.capture=fn=>{const n0=W.group.children.length;fn();const g=new THREE.Group();for(const o of W.group.children.slice(n0)){W.group.remove(o);g.add(o);}k5Prop(g);g.visible=false;return g;};
  // бумажная вспышка: лист перелистывается через весь экран
  E.paper=(mid,dur)=>{let el=document.getElementById('k5ePaper');if(!el){el=document.createElement('div');el.id='k5ePaper';el.style.cssText='position:fixed;inset:0;z-index:40;pointer-events:none;background:linear-gradient(90deg,#efe2c0,#f8f0dc 40%,#e8d8b0);opacity:0;transform-origin:left center';document.body.appendChild(el);}
    dur=dur||1.4;el.style.transition='none';el.style.opacity=1;el.style.transform='perspective(900px) rotateY(80deg)';k5s('book');
    requestAnimationFrame(()=>{el.style.transition='transform '+(dur*0.45)+'s ease-in';el.style.transform='perspective(900px) rotateY(0deg)';});
    later(dur*0.5,()=>{if(mid)mid();el.style.transition='opacity '+(dur*0.5)+'s ease-out';el.style.opacity=0;});};
  const AR={};E.ar=AR;   // арены страниц: AR[w]={g,c,enter(),exit(),...}
  E.pageOff=()=>{for(const w in AR){AR[w].g.visible=false;}if(ES.inPage){ES.inPage=false;}};
  /* ---------- стадия-страница: Лукоморье → порог → арена ---------- */
  E.pageStage=(n,w,o)=>{E.stage[n]={start(op){E.hub(n);W.clampR={x:C.x,z:C.z,r:16};K5.fight=false;liveBoss(false);KS.g.visible=false;dome.visible=false;candles.forEach(c=>{c.g.visible=false;});
      E.pagesShow(true,false);ES.fight=false;ES.step='walk';ES.sill=0;heroesHome(n);ES.prog=0;
      if(op&&op.retry&&ES.retryIn){/* повтор — сразу в арену */}
      E.music('ink');const P=PAGES[w];if(!E.saidPage||!E.saidPage[w]){E.saidPage=E.saidPage||{};E.saidPage[w]=true;later(0.6,()=>say('zven',o.call,3.4,true));}
      if(op&&op.retry){ES.step='in';enterPage(n,w,true);}},
    tick(dt){const P=PAGES[w];P.tick(dt);if(ES.step==='walk'){const hs=k5Heroes();const need=G.solo?1:2;const at=hs.filter(h=>hd(h.pos,P.pos)<1.9).length;
        P.sill.material.color.set(at>0?0xfff4c0:0xffd76a);if(at>=Math.min(need,hs.length)&&hs.length){ES.sill+=dt;if(ES.sill>0.6){ES.step='in';enterPage(n,w,false);}}else ES.sill=0;return;}
      if(ES.step==='fight'&&AR[w].tick)AR[w].tick(dt);},
    end(){if(AR[w].end)AR[w].end();AR[w].g.visible=false;},
    goal:pi=>ES.step==='walk'?'Вдвоём — на <b>порог страницы</b> «'+['','Дремучий лес','Подводный Китеж','Небесное царство','Огненная Смородина'][w]+'».':(AR[w].goal?AR[w].goal(pi):''),
    targets:pi=>ES.step==='walk'?[PAGES[w].g]:(AR[w].targets?AR[w].targets(pi):[])};};
  function enterPage(n,w,quick){const A=AR[w];E.log('enter'+w);E.paper(()=>{E.pagesShow(false);A.g.visible=true;ES.inPage=true;if(A.theme)K5L.theme(A.theme,1);
      W.clampR=A.clamp||null;W.fallY=A.fallY!=null?A.fallY:-12;W.camX=4000;   // камера уровня держится в ±18 м по X — арены страниц далеко
      HEROES.forEach((h,i)=>{const s=A.spawn(i);placeOnGround(h,s.x,s.z,s.y||0);h.face=A.face||Math.PI;h.vel.set(0,0,0);h._down=false;});
      for(const pi of[0,1]){const p=players[pi];p.downed=false;p.petals=3;const s=A.spawn(pi*2);p.cp=new V3(s.x,s.y||0,s.z);}snapCams();if(FIN.music)FIN.music.play(['','w1','w2','w3','w4'][w]);
      ES.step='fight';E.hintReset();A.start(quick);},quick?0.8:1.4);}
  /* ---------- поездка домой: роль «рулить» и роль «отбиваться»; 30 с ---------- */
  // Мир летит навстречу по трём дорожкам: тёмное A гасит удар игрока 1, тёмное B — удар/предмет игрока 2 (в одиночку — удар гасит всё);
  // золотые буквы ловит та дорожка, где стоит метка игрока. Не погасили — −лепесток (без клубков: поездку не проиграть).
  const RIDE_X=-600,RLANES=[-5,0,5];
  const RIDE={g:null,on:false};E.ride=RIDE;
  function rideBuild(){if(RIDE.g)return;RIDE.g=E.capture(()=>{colBox(RIDE_X-2.4,RIDE_X+2.4,-1,0,-2.4,2.4,false);});RIDE.g.visible=false;}
  // kind: stupa · kit · geese · gor;  done — по прилёте
  E.pageHome=(n,done)=>{const w=n-3,kind=['','stupa','kit','geese','gor'][w];rideBuild();K5.fight=false;ES.fight=false;
    E.paper(()=>{E.pageOff();RIDE.g.visible=true;rideStart(kind,()=>{E.paper(()=>{rideEnd();if(E.freeF)E.freeF(['','yaga','vod','zhar','gor'][w],false);if(w===3)E.freeF('solo',false);
        E.hub(n+1);heroesHome(n+1);snapCams();done();},1.2);});},1.2);};
  function rideStart(kind,done){const R=RIDE;R.on=true;R.kind=kind;R.t=0;R.dur=G.solo?26:30;R.th=[];R.spawn=1.4;R.lane=[0,2];R.jumpT=[-9,-9];R.done=done;R.got=0;
    const TH={stupa:'forest',kit:'kitezh',geese:'heaven',gor:'smorodina'}[kind];K5L.theme(TH,1);W.clampR={x:RIDE_X,z:0,r:2.0};W.fallY=-999;W.camX=4000;
    HEROES.forEach((h,i)=>{placeOnGround(h,RIDE_X+(i%2?0.8:-0.8),i<2?-0.6:0.9,0);h.face=Math.PI;h.vel.set(0,0,0);});for(const pi of[0,1]){players[pi].downed=false;players[pi].petals=Math.max(2,players[pi].petals);}snapCams();
    const v=new THREE.Group();k5Prop(v);v.position.set(RIDE_X,0,0);R.v=v;
    if(kind==='stupa'){const s=makeStupa();W.group.remove(s.g);v.add(s.g);s.g.scale.setScalar(3.2);s.g.position.set(0,-3.4,0.4);R.m=s;}
    else if(kind==='kit'){const k=makeWhale(14);W.group.remove(k.g);v.add(k.g);k.g.position.set(0,-2.8,1);k.g.rotation.y=Math.PI;R.m=k;}
    else if(kind==='geese'){for(const s of[-1,1]){const gs=makeGoose(3.2);W.group.remove(gs.g);v.add(gs.g);gs.g.position.set(s*1.3,-1.6,0.4);gs.g.rotation.y=Math.PI;(R.gs=R.gs||[]).push(gs);}}
    else{const g5=makeGorynych();W.group.remove(g5.g);v.add(g5.g);g5.g.scale.setScalar(1.5);g5.g.rotation.y=Math.PI;g5.g.position.set(0,-6.2,0.5);R.m=g5;}
    K5L.noRay(v);
    // декор: летящие навстречу облака/кроны/водоросли/искры
    R.dec=[];const dm={stupa:M(0x2e5a3a),kit:M(0x2a6a6a,{emissive:0x0a3030}),geese:new THREE.MeshLambertMaterial({color:0xffffff,transparent:true,opacity:0.85}),gor:M(0x5a2a1a,{emissive:0x401008})}[kind];
    for(let i=0;i<34;i++){const m=new THREE.Mesh(kind==='stupa'?new THREE.ConeGeometry(rand(2,4),rand(5,9),7):new THREE.SphereGeometry(rand(2,5),9,7),dm);m.position.set(RIDE_X+rand(-40,40),kind==='stupa'?rand(-14,-9):rand(-18,-6),rand(-260,20));k5Prop(m);K5L.noRay(m);R.dec.push(m);}
    R.mk=[0,1].map(pi=>{const r=new THREE.Mesh(new THREE.RingGeometry(1.0,1.3,32),k5Add(pi?COL.p2:COL.p1,{opacity:0.85}));r.rotation.x=-Math.PI/2;k5Prop(r);return r;});
    W.camFn=()=>({pos:new V3(RIDE_X,8,11),look:new V3(RIDE_X,-1,-20),k:3});
    say('zven',{stupa:'Ступа сама бредёт! Ведите — да бейте мышей летучих!',kit:'Кит нас домой! Чернильные медузы — гасите!',geese:'Гуси-лебеди — свои! Вороны и тучи — прочь!',gor:'Горыныч несёт! Вороны — огнём, тучи — светом!'}[kind],3.2,true);E.log('ride_'+kind);}
  function rideEnd(){const R=RIDE;R.on=false;for(const T of R.th)k5Del(T.g);R.th=[];for(const m of R.dec)k5Del(m);R.dec=[];for(const m of R.mk)k5Del(m);k5Del(R.v);R.gs=null;W.camFn=null;RIDE.g.visible=false;W.fallY=-12;}
  function rideFire(lane,kind){const p=new V3(RIDE_X+RLANES[lane],0.6,-3);const b=new THREE.Mesh(new THREE.SphereGeometry(0.5,8,6),k5Add(kind==='B'?0xffe08a:0xff9a40,{opacity:0.95}));b.position.copy(p);k5Prop(b);
    AUD.ready()&&AUD.nz({f0:300,f1:1400,d:0.35,v:0.1,q:0.8});k5fx(1.2,(k,dt)=>{b.position.z-=dt*70;for(const T of RIDE.th){if(T.dead||T.lane!==lane)continue;if((T.kind===kind||G.solo)&&T.kind!=='L'&&Math.abs(T.g.position.z-b.position.z)<3){T.dead=true;K5L.ink(T.g.position.clone(),8);k5Del(T.g);}}},()=>k5Del(b));}
  W.updates.push(dt=>{const R=RIDE;if(!R.on||G.cine||G.state!=='play')return;R.t+=dt;const k=Math.min(1,R.t/R.dur);
    for(const m of R.dec){m.position.z+=dt*26;if(m.position.z>30){m.position.z-=290;m.position.x=RIDE_X+rand(-40,40);}}
    R.v.position.y=Math.sin(R.t*1.6)*0.25;if(R.gs)R.gs.forEach((g,i)=>{if(g.wings)g.wings.forEach?g.wings.forEach((x,j)=>{if(x&&x.rotation)x.rotation.z=Math.sin(R.t*6+i)*0.6*(j?1:-1);}):0;});
    if(R.m&&R.m.wings&&R.m.wings.forEach)R.m.wings.forEach((x,i)=>{if(x&&x.rotation)x.rotation.z=Math.sin(R.t*4)*0.5*(i?1:-1);});
    for(const h of HEROES){if(h.pos.y<-1||hd(h.pos,new V3(RIDE_X,0,0))>2.6){placeOnGround(h,RIDE_X,0,0);h.vel.set(0,0,0);}}
    const pis=G.solo?[0]:[0,1];for(const pi of pis){if(tap(pi,'left'))R.lane[pi]=Math.max(0,R.lane[pi]-1);if(tap(pi,'right'))R.lane[pi]=Math.min(2,R.lane[pi]+1);R.mk[pi].position.set(RIDE_X+RLANES[R.lane[pi]],-0.4,-12);R.mk[pi].visible=true;}
    if(G.solo)R.mk[1].visible=false;
    if(G.solo){if(tap(0,'attack')||tap(0,'item'))rideFire(R.lane[0],'A');}else{if(tap(0,'attack'))rideFire(R.lane[0],'A');if(tap(1,'attack')||tap(1,'item'))rideFire(R.lane[1],'B');}
    R.spawn-=dt;if(R.spawn<=0&&R.t<R.dur-3){R.spawn=rand(0.9,1.6)*(1-k*0.3)*(G.solo?1.25:1);const lane=Math.floor(rand(0,3)),r=Math.random(),kind=r<0.18?'L':r<0.6?'A':'B';const g=new THREE.Group();g.position.set(RIDE_X+RLANES[lane],kind==='B'?2.2:1.0,-120);k5Prop(g);
      if(kind==='L'){const s=K5L.textSpr('Ж',1.6,{w:128,h:128,col:'#ffd76a',glow:'#ffb030',weight:'italic 700 '});g.add(s);}
      else if(kind==='A'){addMesh(new THREE.SphereGeometry(0.5,8,6),K5L.INKM,0,0,0,g);const wg=new THREE.Group();g.add(wg);addMesh(new THREE.BoxGeometry(2.2,0.08,0.6),M(0x101014),0,0.1,0,wg);g.userData.w=wg;}
      else{for(let i=0;i<4;i++)addMesh(new THREE.SphereGeometry(rand(0.9,1.5),8,6),new THREE.MeshLambertMaterial({color:0x3a3448,emissive:0x1a0a2a}),rand(-1.2,1.2),rand(-0.4,0.6),rand(-0.8,0.8),g);}
      K5L.noRay(g);R.th.push({g,lane,kind,dead:false});}
    for(const T of R.th){if(T.dead)continue;T.g.position.z+=dt*(T.kind==='A'?28:T.kind==='L'?22:20);if(T.g.userData.w)T.g.userData.w.rotation.z=Math.sin(G.time*16)*0.6;
      if(T.g.position.z>-1){T.dead=true;k5Del(T.g);if(T.kind==='L'){const pi=pis.find(q=>R.lane[q]===T.lane);if(pi!=null){R.got++;K5L.gold(new V3(RIDE_X+RLANES[T.lane],1,0),10);SFX.ok&&SFX.ok();}}
        else{const h=active(G.solo?G.soloPi:Math.random()<0.5?0:1);if(players[h.player].petals>1)damageHero(h,{kind:'hazard',ref:{pos:T.g.position.clone()}});else{h.iT=1;floatText(h.pos.clone().add(new V3(0,1.8,0)),'Ох!','#ff9ab8');}}}}
    R.th=R.th.filter(T=>!T.dead);
    if(R.t>=R.dur&&!R.fin){R.fin=true;banner('Лукоморье!','#ffd76a',2.2,R.got?'поймано букв: '+R.got:'');later(1.6,()=>{R.fin=false;const d=R.done;R.done=null;if(d)d();});}});
  // кнопки «предмет» и «удар»: сначала — у текущей стадии или страницы, потом — как в прежнем бою
  const curL=()=>{const n=E.cur;if(n==null)return null;if(n>=4&&n<=7)return ES.step==='fight'?AR[n-3]:null;return OLD[n]?E.layer[n]:E.stage[n];};
  {const _is=W.itemSign;W.itemSign=pi=>{const L=curL();if(L&&L.item){const f=L.item(pi);if(f)return f;}return _is?_is(pi):null;};}
  {const _oa=W.onAttack;W.onAttack=(pi,h)=>{const L=curL();if(L&&L.attack)L.attack(h,pi);if(_oa)_oa(pi,h);};}
  {const _og=W.onGuardTap;W.onGuardTap=(pi,h)=>{const L=curL();if(L&&L.guard)L.guard(h,pi);if(_og)_og(pi,h);};}
