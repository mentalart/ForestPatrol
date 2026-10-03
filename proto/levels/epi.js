/* ============================== ЭПИЛОГ — штаб-сосна, вечер: сказка без тетрадки ============================== */
// Пелагея рассказывает, не заглядывая · Игрок 2 жмёт A — тени от лампы складываются в картинки из наших выборов · Тишка допевает колыбельную
// Кот не умолкает: «А можно обратно… без голоса?» — «Руками…» — «…а держится словом» · открытка от Яги · хвост концовки лубком · титры · дальше можно ходить по Лукоморью
const TAILS={ushel:{t:'«Ушёл — и был таков»',lines:['Он ушёл — и был таков,<br>Не видали с тех пор его следов.','Лишь на ветке дуба в тишине<br>Перстень блещет при луне.','А Тишка колокольчик рядом повесил,<br>Чтоб звенел он, когда ветер весел.'],
    svg:()=>LB('<rect x="0" y="0" width="300" height="150" fill="#f4d8b8"/><rect x="0" y="92" width="300" height="58" fill="#4f8ab8"/><line x1="0" y1="92" x2="300" y2="92"/><rect x="18" y="40" width="16" height="70" fill="#7a5a3e"/><circle cx="26" cy="36" r="24" fill="#4f8a3a"/><path d="M34 60 L64 54" fill="none"/><circle cx="62" cy="58" r="4" fill="#ffd23a"/><path d="M50 56 L50 66 L46 72 L54 72 L50 66" fill="#e0b040"/><path d="M228 88 L232 58 L236 88 Z" fill="#1a1624"/><circle cx="232" cy="54" r="4" fill="#cfc7b0"/><path d="M226 60 Q210 92 196 94" fill="none" stroke-dasharray="4 5"/>')},
  proshen:{t:'«Простили — и прощенья он просил»',lines:['И простили его в тот же час,<br>И прощенья он попросил у нас.','На дальнем бреге — Кощеев дом-избушка,<br>Тишка мёд ему носит — и не страшно ни чуточки, ни на полушку.','А перстень — у Кота на лапе, вот:<br>Сверкает, как солнце, круглый год.'],
    svg:()=>LB('<rect x="0" y="0" width="300" height="150" fill="#f4e0c8"/><rect x="0" y="100" width="300" height="50" fill="#4f8ab8"/><path d="M170 100 Q230 70 300 90 L300 100 Z" fill="#8ab04a"/><rect x="236" y="68" width="34" height="24" fill="#8a5a36"/><polygon points="232,70 253,52 274,70" fill="#6b3f22"/><circle cx="196" cy="94" r="6" fill="#c8843a"/><rect x="200" y="88" width="8" height="8" fill="#e8b050"/><path d="M40 120 Q44 92 56 90 Q70 92 70 120 Z" fill="#d2d8e8"/><circle cx="56" cy="84" r="10" fill="#d2d8e8"/><circle cx="74" cy="104" r="4" fill="#ffd23a"/>')},
  slushat:{t:'«Позвали слушать — сел он в круг»',lines:['И позвали его в круг —<br>Сказки слушать, как друг.','С Котом Кощей сидит у корней, как свой,<br>И сказку новую первым слышит он порой.','А он чинит молоточек детский —<br>По-стариковски, по-соседски.'],
    svg:()=>LB('<rect x="0" y="0" width="300" height="150" fill="#f4e4c0"/><rect x="0" y="116" width="300" height="34" fill="#8ab04a"/><rect x="130" y="20" width="40" height="100" fill="#7a5a3e"/><circle cx="150" cy="22" r="46" fill="#4f8a3a"/><path d="M96 118 Q100 88 112 86 Q124 88 126 118 Z" fill="#d2d8e8"/><circle cx="112" cy="80" r="10" fill="#d2d8e8"/><path d="M180 118 L186 70 L200 70 L204 118 Z" fill="#1a1624"/><circle cx="193" cy="64" r="7" fill="#cfc7b0"/><rect x="206" y="96" width="14" height="4" fill="#c89a5a"/><rect x="218" y="92" width="6" height="10" fill="#6a4a2a"/>')}};
function hqRoom(){const R=7;colBox(-7.2,7.2,-4,0,-7.2,7.5,false);
  addMesh(new THREE.CylinderGeometry(R,R,0.3,48,1,false,Math.PI/2,Math.PI),MAT.plank,0,-0.15,0);addMesh(new THREE.BoxGeometry(2*R+0.4,0.3,7.5),MAT.plank,0,-0.15,3.75);
  addMesh(new THREE.CylinderGeometry(7.3,8.6,14,32),MAT.bark,0,-7.3,0);const wallM=M(0x8a5a36,{side:THREE.DoubleSide});
  const walls=[addMesh(new THREE.CylinderGeometry(R,R,4.2,28,1,true,Math.PI/2,Math.PI),wallM,0,2.1,0),addMesh(new THREE.CylinderGeometry(R*0.9,R,24,28,1,true,Math.PI/2,Math.PI),M(0x5e4128,{side:THREE.DoubleSide}),0,16.2,0)];walls.forEach(w=>{w.receiveShadow=true;});
  for(let a=Math.PI/2;a<=Math.PI*1.5+1e-3;a+=0.085)W.cyls.push({x:Math.sin(a)*(R+0.35),z:Math.cos(a)*(R+0.35),r:0.6,miny:-1,maxy:4.2,on:true});
  colBox(-7.3,7.3,0,1.1,7.3,7.6);colBox(-7.5,-7.2,0,1.1,0,7.6);colBox(7.2,7.5,0,1.1,0,7.6);
  {const rail=M(0x6b4424);addMesh(new THREE.BoxGeometry(14.7,0.1,0.12),rail,0,0.95,7.45);for(let x=-7.2;x<=7.21;x+=1.2)addMesh(new THREE.CylinderGeometry(0.06,0.07,0.95,6),rail,x,0.47,7.45);}
  const lampG=new THREE.Group();lampG.position.set(0.3,3.5,-1.0);W.group.add(lampG);addMesh(new THREE.CylinderGeometry(0.012,0.012,2.4,4),MAT.dark,0,1.2,0,lampG);addMesh(new THREE.SphereGeometry(0.22,12,10),M(0xffe0a0,{emissive:0xffc060,emissiveIntensity:1}),0,0,0,lampG).castShadow=false;addMesh(new THREE.ConeGeometry(0.32,0.22,10),M(0x5a3a20),0,0.2,0,lampG);
  const lampL=new THREE.PointLight(0xffc27a,1.4,18,1.5);lampL.position.set(0.3,3.2,-1.0);W.group.add(lampL);
  const rug=addMesh(new THREE.CylinderGeometry(2.3,2.3,0.03,32),M(0xa8483a),0.2,0.015,0.8);rug.castShadow=false;
  addMesh(new THREE.CylinderGeometry(0.58,0.58,0.06,20),M(0x9a6a3c),2.9,0.6,-2.1);addMesh(new THREE.CylinderGeometry(0.08,0.12,0.6,8),M(0x6b4424),2.9,0.3,-2.1);W.cyls.push({x:2.9,z:-2.1,r:0.6,miny:0,maxy:0.63,on:true});
  box(-6.4,-5.2,0,0.75,-1.6,0.0,M(0x8a5a32));for(let i=0;i<3;i++)box(-5.4,-3.8,0,0.32*(i+1),-3.4-0.6*(i+1),-3.4-0.6*i,M(0x9a6a3c));
  box(5.0,6.6,0,0.5,0.6,3.2,M(0x7a5232));addMesh(new THREE.BoxGeometry(1.5,0.12,2.2),M(0x4f7fb0),5.8,0.56,2.0);
  const wa=Math.PI-0.85,win=new THREE.Group();win.position.set(Math.sin(wa)*(R-0.1),2.55,Math.cos(wa)*(R-0.1));win.lookAt(0,2.55,0);W.group.add(win);addMesh(new THREE.TorusGeometry(0.95,0.12,8,32),M(0x5a3a20),0,0,0,win);win.add(new THREE.Mesh(new THREE.CircleGeometry(0.93,32),MB(0x1c2750)));
  {const md=new THREE.Mesh(new THREE.CircleGeometry(0.3,24),MB(0xfff2c0));md.position.set(0.2,0.24,0.01);win.add(md);}
  const ba=Math.PI+0.62,fl=new THREE.Group();fl.position.set(Math.sin(ba)*(R-0.12),2.4,Math.cos(ba)*(R-0.12));fl.lookAt(0,2.4,0);W.group.add(fl);fl.add(new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.5),M(0x3f7a44,{side:THREE.DoubleSide})));const pw=pawIcon();pw.scale.setScalar(1.1);pw.position.set(0,0.1,0.02);fl.add(pw);
  fadeable(walls);return {lampG,lampL};}
function buildEpi(){
  setTheme('evening');sky('evening');W.name='Эпилог';W.sub='вечер в штабе-сосне · сказка без тетрадки';W.camX=8;const F=W.flags;F.stage='e1';W.abil.toss=true;W.abil.roll=true;const T=HERO;
  const room=hqRoom();W.camZones.push({x:0,z:0.2,r:5.6,camActive:()=>true});
  const step=box(-2.4,-0.8,0,0.35,-3.4,-2.4,M(0x9a6a3c));const tish=makeTishka();tish.g.position.set(-1.6,0.35,-2.9);tish.g.rotation.y=0.2;
  const nb=makeNotebook();nb.g.position.set(2.9,0.63,-2.1);nb.g.rotation.y=0.25;const blanket=addMesh(new THREE.BoxGeometry(0.9,0.06,0.7),M(0x6a8ac8),-3.6,0.8,-1.2);blanket.visible=false;
  const kot=makeKot();kot.g.position.set(4.4,0,-3.4);kot.g.rotation.y=-0.7;W.cyls.push({x:4.4,z:-3.4,r:0.7,miny:-1,maxy:2,on:true});
  const Z=makeZven();W.zven=Z;Z.mode='script';Z.pos.set(0.4,2.6,-2.2);
  const E=(G.flags.ending&&G.flags.ending.length?G.flags.ending:['slushat']);const sk=G.flags.skaz5||['Жил-был мальчик — сказки сам сложить мечтал','Рыба-кит','И позвали его слушать — сел он в круг'];
  // тени на стене: помощники из Сказов и Кощей — там, где его оставила сказка
  const SH=helpers5().map(k=>({k,make:(HELPER5[k]||HELPER5.leshy)[1],name:(HELPER5[k]||HELPER5.leshy)[0]}));SH.push({k:'koschei',make:()=>makeKoschei(),name:'Кощей'});
  const shadowM=MB(0x1a1410,{transparent:true,opacity:0.82});let shI=0;const shadows=[];
  function nextShadow(){if(shI>=SH.length)return;const s=SH[shI];const m=s.make();m.g.traverse(o=>{if(o.isMesh){o.material=shadowM;o.castShadow=false;}if(o.isLight)o.visible=false;});
    const x=-4.2+shI*2.1;m.g.position.set(x,s.k==='kit'?1.2:0.6,-6.55+Math.abs(x)*0.18);m.g.scale.set(s.k==='kit'?0.18:0.9,s.k==='kit'?0.18:0.9,0.04);m.g.rotation.y=0;shadows.push(m);
    const f=m.g.scale.clone();m.g.scale.set(0.01,0.01,0.01);anim(0.6,k=>{m.g.scale.set(f.x*k,f.y*k,f.z);});floatText(new V3(x,3.2,-6),s.name,'#ffe0a0');SFX.flower();shI++;}
  function place(){const pe=T.pelageya,po=T.potap,pr=T.proshka,yo=T.yosha;placeOnGround(pe,-0.4,-2.0,0);placeOnGround(po,-3.2,-0.6,0);placeOnGround(pr,1.6,-0.4,0);placeOnGround(yo,0.4,0.9,0);
    faceTo(pe,-1.6,-2.9);faceTo(po,-1.6,-2.9);faceTo(pr,-0.4,-2);faceTo(yo,-1.6,-2.9);}
  function e1(){F.stage='e1c';place();
    play({dur:24,fov:44,camK:2.2,shots:[shot(0,[0,5,9],[0,1.6,-2]),shot(5,[-0.4,1.6,1.6],[-1.6,0.7,-2.9]),shot(10,[1.8,1.6,0.6],[-0.4,1,-2]),shot(16,[0,3.4,5],[-0.8,0.8,-1.4])],
      says:[[0.3,4.2,null,'<i>Мы возвращаемся в штаб-сосну Лесного патруля. Вечер — как в прологе.</i>',true],[4.8,2.6,'tishka','Расскажите сказку на ночь, на сон грядущий…'],
        [7.6,2.4,null,'<i>Пелагея тетрадку берёт — и откладывает.</i>',true],[10.2,4,'pelageya',sk[0]+'…'],[14.4,4.6,null,'<i>Сказывает, не заглядывая. Прошка уж не фыркает, молчит,</i><br><i>Потап Тишку укрывает. Йоша первым спит.</i>',true],
        [19.4,3.4,null,'<i>Варя жмёт A — и на стене сосны тени от лампы складываются в картинки.</i>',true]],
      events:[{t:7.6,fn:()=>{const f=nb.g.position.clone();anim(1.2,k=>{nb.g.position.set(f.x-k*1.6,f.y+Math.sin(k*Math.PI)*0.6+k*0.4,f.z+k*0.4);});later(1.4,()=>{anim(0.8,k=>{nb.g.position.lerp(f,k);});});}},
        {t:15,fn:()=>{blanket.visible=true;blanket.position.set(-1.6,0.66,-2.8);faceTo(T.potap,-1.6,-2.9);}},{t:16,fn:()=>{const yo=T.yosha;anim(1,k=>{yo.body.rotation.z=k*1.3;});floatText(yo.pos.clone().add(new V3(0,1.2,0)),'Хр-р…','#8fe0d4');}}],
      end:()=>{W.anims.length=0;F.stage='shadows';F.shT=0;banner('Тени на стене пляшут','#ffe0a0',3,'второй игрок — жми '+K(1,'jump')+': тени от лампы в картинки складываются из того, что вы выбирали');}});}
  function e2(){F.stage='e2c';
    play({dur:21,fov:44,camK:2.2,shots:[shot(0,[-0.6,1.4,0.2],[-1.6,0.7,-2.9]),shot(10,[0,3.4,5],[-1,1,-2])],
      says:[[0.3,3,'tishka','<i>(засыпая)</i> Баю-баю, за рекою…'],[3.4,2.8,'tishka','…серый волк живёт…'],[6.4,2.8,'tishka','— а дальше помню я!'],
        [9.4,2.8,'tishka','Он придёт — а мы не спим,'],[12.4,2.8,'tishka','сказку волку говорим.'],[15.4,2.8,'tishka','Волк послушает — и сам'],[18.2,2.6,'tishka','ляжет спать к своим лесам…']],
      events:[{t:0.3,fn:()=>{lullaby([67,71,74,72],0.5,0,0.1);}},{t:3.4,fn:()=>{lullaby([72,71,69,67],0.5,0,0.1);}},{t:9.4,fn:()=>{lullaby([67,69,71,72,74,72,71,69],0.36,0,0.1);}},{t:15.4,fn:()=>{lullaby([69,71,72,71,69,67,66,67],0.36,0,0.1);}}],
      tick:(t)=>{tish.head.rotation.x=Math.min(0.5,t*0.03);},end:()=>{W.anims.length=0;e3();}});}
  function e3(){F.stage='e3c';const pr=T.proshka,pe=T.pelageya;
    play({dur:24,fov:44,camK:2.2,shots:[shot(0,[4,1.8,-0.6],[4.4,1,-3.4]),shot(9.6,[pr.pos.x+1.4,1.4,pr.pos.z+2],[pr.pos.x,1,pr.pos.z]),shot(15,[0,2,2.4],[0.6,1,-1.2])],
      says:[[0.3,3,'kot','…а ещё была сказка про ежа, что сам по облаку гулял, и тогда, представляете…'],[3.4,3,'kot','…а Соловей-то, Соловей! А я ему — пой, мол, вместе, не робей…'],[6.6,2.8,'kot','…а третья, коротка, как миг, — про три головы и одно сердце на троих…'],
        [9.6,3.4,'proshka','А можно обратно… ненадолго… без голоса?'],[13.2,1.8,null,'<i>Кот будто не слышит — ухом не ведёт.</i>',true],[15.2,1.6,null,'<i>Прошка тяжко вздыхает.</i>',true],[17,2.2,'proshka','Руками куют…'],[19.4,3,'pelageya','<i>(улыбается)</i> …а держится — словами.']],
      tick:(t)=>{kot.head.rotation.y=Math.sin(t*3)*0.4;kot.body.rotation.z=Math.sin(t*5)*0.05;},
      events:[{t:17,fn:()=>{faceTo(pr,pe.pos.x,pe.pos.z);faceTo(pe,pr.pos.x,pr.pos.z);}}],end:()=>{W.anims.length=0;postcard();}});}
  // открытка от Яги, хвост концовки лубком, титры
  const el=$('mapui');
  function panel(html,dur,next){G.ui='lubok';el.style.display='flex';el.innerHTML=html;let tt=0;G.uiTick=()=>{tt+=1/60;if((tt>dur)||(tt>0.8&&(tap(0,'jump')||tap(1,'jump')))){G.ui=null;G.uiTick=null;el.style.display='none';next();}};}
  function postcard(){SFX.flower();const face=(x,c)=>'<rect x="'+(x-18)+'" y="30" width="36" height="44" fill="#f4e8c8" stroke="#8a5a2a"/><circle cx="'+x+'" cy="48" r="10" fill="'+c+'"/><rect x="'+(x-10)+'" y="58" width="20" height="12" fill="'+c+'"/>';
    panel('<div class="lubok"><div style="font:900 22px Georgia,serif;color:#8a1a14;margin-bottom:8px">Открытка от Бабы Яги</div>'+LB('<rect x="0" y="0" width="300" height="150" fill="#e8c88a"/><rect x="30" y="20" width="240" height="110" fill="#c8843a"/>'+face(80,'#b08060')+face(130,'#c0a070')+face(180,'#a07050')+face(230,'#d0b080')+'<rect x="0" y="130" width="300" height="20" fill="#8ab04a"/>')+
      '<div class="cap">В избушке у Яги в рамках снова лица богатырей. «Заходите, гости дорогие. Клубок не дам — свой есть. А пирожков — сколько хотите».</div><div class="hint" style="font:600 13px system-ui;opacity:.7">'+K(0,'jump')+' дальше</div></div>',7,()=>tails(0));}
  function tails(i){if(i>=E.length){credits();return;}const t=TAILS[E[i]]||TAILS.slushat;let li=0;
    const show=()=>{babble('kot',t.lines[li]);panel('<div class="lubok"><div style="font:900 22px Georgia,serif;color:#8a1a14;margin-bottom:8px">'+(i>0?'А иные сказывают… ':'')+t.t+'</div>'+t.svg()+'<div class="cap">'+t.lines[li]+'</div><div class="hint" style="font:600 13px system-ui;opacity:.7">голос Кота · '+(li+1)+' / '+t.lines.length+' · '+K(0,'jump')+' дальше</div></div>',4.6,()=>{li++;if(li<t.lines.length)show();else tails(i+1);});};show();}
  function credits(){const L=['<b style="font-size:30px">Златая цепь</b>','greybox-прототип по сценарию','','Лесной патруль: Прошка, Потап, Пелагея, Йоша','Бельчонок Тишка · Звенышко · Кот Учёный','Баба Яга · Леший · Кикимора · Колобок','Садко · Рыба-кит · Золотая рыбка · Водяной','Жар-птица · Сирин и Алконост · Соловей','Кузьма и Демьян · Змей Горыныч · Лихо Одноглазое','и Кощей — что сказку дочитал','','<i>Звено куют руками,</i><br><i>А держится оно словами.</i>','','Спасибо, что сказку сказывали вместе — всем миром, честь по чести.'];
    panel('<div class="lubok" style="min-width:min(560px,92vw);text-align:center;line-height:1.7;font:700 17px Georgia,serif;color:#2a1a10">'+L.join('<br>')+'<div class="hint" style="font:600 13px system-ui;opacity:.7;margin-top:10px">'+K(0,'jump')+' — на Лукоморье</div></div>',16,()=>{G.flags.epiDone=true;G.flags.showFinal=true;goLevel('luko');});}
  W.updates.push(dt=>{
    if(F.stage==='shadows'&&!G.cine&&!G.ui){F.shT+=dt;if(tap(1,'jump')||tap(0,'jump')&&F.shT>6){nextShadow();}if(shI>=SH.length&&!F.shDone){F.shDone=true;later(2.4,e2);}if(F.shT>28&&!F.shDone){while(shI<SH.length)nextShadow();}}
    room.lampG.rotation.z=Math.sin(G.time*0.8)*0.03;});
  W.custom=(pi,h,dt,c)=>{for(const q of players[pi].heroes){q.vel.x=damp(q.vel.x,0,10,dt);q.vel.z=damp(q.vel.z,0,10,dt);}};   // в эпилоге сидим и слушаем
  prompt(1,'jump',()=>new V3(0,3.4,-5.6),()=>F.stage==='shadows'&&!G.cine&&shI<SH.length,'тень на стене');
  const mk=pi=>[O(()=>pi?'Жми '+K(1,'jump')+' — тени на стене в картинки сложатся':'Слушаем сказку',()=>F.stage!=='e1'&&F.stage!=='e1c'&&F.stage!=='shadows',()=>[]),O('…',()=>false,()=>[])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.spawns=[[new V3(1.6,0,-0.4),new V3(-3.2,0,-0.6)],[new V3(-0.4,0,-2),new V3(0.4,0,0.9)]];W.startAct=[0,0];
  W.pauseLine='Эпилог. Вечер в штабе-сосне.<br>Пелагея сказку сказывает без тетрадки, как во сне.<br>Игрок второй жмёт A — тени на стене в картинки складываются<br>Из наших выборов — вот как сказка сбывается.';
  W.onStart=()=>{e1();};}

