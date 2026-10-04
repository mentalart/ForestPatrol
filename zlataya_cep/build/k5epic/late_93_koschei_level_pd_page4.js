// ---- продолжение build5B2 (k5epic, часть 13): СТРАНИЦА 4 «ТАМ НА НЕВЕДОМЫХ ДОРОЖКАХ…» (стадия 7, мир 4, клещи) ----
  // Калинов мост над Смородиной. На том берегу — Горыныч в чёрной узде (зеркало 4-Б: теперь узду надел Кощей), Кощей верхом. Головы
  // дышат огнём по дорожкам моста (полоса краснеет — уйди на другую); доски прогорают — прыгай. На том берегу Лихо Одноглазое:
  // открылся глаз — кто смотрит в его сторону, засыпает (отвернись или за щит Потапа). На этом берегу Демьян: Прошка бьёт по наковальне
  // три раза в такт — золотая узда готова. Узду несут двое клещами за два конца (предмет у конца) — разошлись далеко — уронили.
  // У головы Горыныча — «раз-два-три»: удар разом — чёрная узда долой, золотая — на место.
  {const X=900;const A={theme:'smorodina',face:Math.PI,fallY:-6};AR[4]=A;A.clamp={x:X,z:-3,r:22};
    A.spawn=i=>new V3(X-3+i*2,0,12.5);
    const ANV4=new V3(X+4,0,11),GOR=new V3(X,0,-20),LIKHO=new V3(X-6.5,0,-17.5),LANES=[-2,0,2],PL=1.6;
    const planks=[];
    A.g=E.capture(()=>{ground(X-9,X+9,8,16,0,M(0x5a4a44));ground(X-10,X+10,-28,-14,0,M(0x5a4a44));
      for(let li=0;li<3;li++)for(let j=0;j<14;j++){const z0=-14+j*PL;const m=addMesh(new THREE.BoxGeometry(1.95,0.3,PL-0.08),M(0x7a5634),X+LANES[li],-0.15,z0+PL/2);const c=colBox(X+LANES[li]-0.98,X+LANES[li]+0.98,-1.5,0,z0,z0+PL,false);planks.push({m,c,li,j,t:0});}
      const lava=addMesh(new THREE.PlaneGeometry(120,80),MB(0xff5a20),X,-3,-4);lava.rotation.x=-Math.PI/2;for(let i=0;i<10;i++)addMesh(new THREE.SphereGeometry(rand(0.6,1.4),8,6),MB(0xffa040),X+rand(-30,30),-2.8,rand(-30,20));
      for(const s of[-1,1])for(let j=0;j<8;j++)addMesh(new THREE.CylinderGeometry(0.12,0.12,1.1,6),M(0x5a3a1a),X+s*3.05,0.4,-13+j*3);});
    const gor=makeGorynych();W.group.remove(gor.g);A.g.add(gor.g);gor.g.position.copy(GOR);gor.g.scale.setScalar(1.2);K5L.noRay(gor.g);W.cyls.push({x:GOR.x,z:GOR.z,r:3,miny:-1,maxy:4,on:true});
    const bridleB=K5L.collar(gor.g,4.2,0.9);   // чёрная узда на шее
    const likho=makeLikho();W.group.remove(likho.g);A.g.add(likho.g);likho.g.position.copy(LIKHO);likho.g.rotation.y=Math.atan2(X-LIKHO.x,10-LIKHO.z);likho.g.scale.setScalar(1.2);K5L.noRay(likho.g);
    const dem=makeSmith('demyan',false);W.group.remove(dem.g);A.g.add(dem.g);dem.g.position.set(ANV4.x+1.6,0,ANV4.z-0.4);dem.g.rotation.y=-1.6;K5L.noRay(dem.g);
    const anv=makeAnvil(ANV4.x,ANV4.z,0,1.2);if(anv&&anv.g&&anv.g.parent){anv.g.parent.remove(anv.g);A.g.add(anv.g);}
    const beatR=new THREE.Mesh(new THREE.RingGeometry(0.9,1.05,40),k5Add(0xffd76a,{opacity:0.9}));beatR.rotation.x=-Math.PI/2;beatR.position.set(ANV4.x,0.1,ANV4.z);A.g.add(beatR);
    // золотая узда: дуга с двумя ручками
    const bridle=new THREE.Group();A.g.add(bridle);const arc=new THREE.Mesh(new THREE.TorusGeometry(1.1,0.09,6,24,Math.PI),M(COL.gold,{emissive:0xff8a20,emissiveIntensity:0.9}));arc.rotation.x=-Math.PI/2;bridle.add(arc);
    const ends=[-1,1].map(s=>{const m=new THREE.Mesh(new THREE.SphereGeometry(0.18,8,6),MB(0xffd060));m.position.set(s*1.1,0,0);bridle.add(m);return m;});const bGlow=k5Glow(0xffa040,3);bridle.add(bGlow);bridle.visible=false;K5L.noRay(bridle);
    const lanesT=[0,1,2].map(li=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(1.9,22.4),k5Add(0xff3a20,{opacity:0}));m.rotation.x=-Math.PI/2;m.position.set(X+LANES[li],0.05,-14+11.2);A.g.add(m);return m;});
    const S={};A.S=S;
    function plankTick(dt){for(const P of planks){if(P.t>0){P.t-=dt;if(P.t<=0){P.c.on=true;P.m.visible=true;P.m.material=M(0x7a5634);}}}}
    function burn(li){for(const P of planks)if(P.li===li&&(P.j%3===1||P.j%4===0)&&P.t<=0){P.t=G.solo?5:7;P.c.on=false;P.m.visible=false;FX.sparks(P.m.position.clone().add(new V3(0,0.4,0)),4,0xff8a20);}}
    function fire(li){S.fire={li,t:0};k5s('pSoft');bark(gor.g?{g:gor.g}:KS,['gorL','gorM','gorR'][li],['Ой… дышу! Левую — прочь!','Не хочу, а дышу! Середина!','Правая! Берегись!'][li],1.4,true);}
    function fireTick(dt){const F=S.fire;if(!F)return;F.t+=dt;const tele=G.solo?1.6:1.25;lanesT[F.li].material.opacity=F.t<tele?0.12+0.25*Math.abs(Math.sin(G.time*12)):Math.max(0,0.55-(F.t-tele));
      if(F.t>=tele&&!F.hit){F.hit=new Set();burn(F.li);k5s('strike');for(let i=0;i<10;i++)later(i*0.04,()=>FX.sparks(new V3(X+LANES[F.li],0.6,-12+i*2.2),6,0xff8a20));}
      if(F.hit&&F.t<tele+0.7)for(const h of k5Heroes())if(!F.hit.has(h)&&Math.abs(h.pos.x-(X+LANES[F.li]))<1.0&&h.pos.z<8.2&&h.pos.z>-14){F.hit.add(h);k5Hurt(h,new V3(X+LANES[F.li],0,h.pos.z-2));if(S.carry&&S.carry.indexOf(h)>=0)drop('Уронили!');}
      if(F.t>tele+1)S.fire=null;}
    function drop(t){if(!S.carry)return;S.carry=null;floatText(bridle.position.clone().add(new V3(0,1.2,0)),t||'Уронили!','#ffb070');bridle.position.y=0.25;E.log('drop');}
    A.start=q=>{S.ph='forge';S.beat=0;S.bt=0;S.good=0;S.carry=null;S.grab=[null,null];S.fire=null;S.fireT=3;S.eyeT=6;S.eye=0;S.sleep=new Map();S.rdt=[-9,-9];bridle.visible=false;bridleB.g.visible=true;
      planks.forEach(P=>{P.t=0;P.c.on=true;P.m.visible=true;});KS.g.visible=true;KS.g.position.copy(GOR).add(new V3(0,4.2,0.4));KS.g.rotation.y=0;ES.prog=0;ES.fight=false;
      for(const pi of[0,1])players[pi].cp=new V3(X-1+pi*2,0,12);E.cards(7,()=>{ES.fight=true;});};
    A.end=()=>{KS.g.visible=false;planks.forEach(P=>{P.c.on=true;});};
    A.attack=(h)=>{if(E.cur!==7||!ES.fight)return;
      if(S.ph==='forge'&&hd(h.pos,ANV4)<2.4){const per=0.8,ph=(S.bt%(per*3))/(per*3),win=ph>0.86||ph<0.06;if(win){S.good++;FX.sparks(ANV4.clone().add(new V3(0,1.3,0)),16,0xffd060);SFX.hammer?SFX.hammer():SFX.clink();floatText(ANV4.clone().add(new V3(0,2.4,0)),'В такт! '+S.good+' / 3','#ffe08a');
          if(S.good>=3){S.ph='carry';bridle.visible=true;bridle.position.set(ANV4.x-1.6,0.25,ANV4.z-1.2);beatR.visible=false;bark(dem,'demyan','Готова узда! Горячая — берите клещами, вдвоём!',2.4,true);E.log('forged');ES.prog=1/3;}}
        else{floatText(ANV4.clone().add(new V3(0,2.4,0)),'не в такт','#cccccc');SFX.clink();}return;}
      if(S.ph==='carry'&&S.carry&&hd(bridle.position,GOR)<4.6){const pi=h.player;S.rdt[pi]=G.time;const both=G.solo||Math.abs(S.rdt[0]-S.rdt[1])<1.0;
        if(both){S.ph='done';ES.prog=1;swap();}else floatText(h.pos.clone().add(new V3(0,2,0)),'Раз-два-три — разом!','#ffe08a');}};
    A.item=pi=>{if(E.cur!==7||!ES.fight||S.ph!=='carry'||S.carry)return null;const h=active(pi);const wp=i=>ends[i].getWorldPosition(new V3());let ei=-1;for(let i=0;i<2;i++)if(hd(h.pos,wp(i))<1.6)ei=i;if(ei<0)return null;
      return ()=>{S.grab[ei]=h;FX.sparkle(wp(ei),8,0xffd060);floatText(h.pos.clone().add(new V3(0,2,0)),'Клещи — взял!','#ffe08a');
        if(G.solo||(S.grab[1-ei]&&S.grab[1-ei]!==h&&hd(S.grab[1-ei].pos,wp(1-ei))<2.2)){S.carry=G.solo?[h]:[S.grab[0],S.grab[1]];S.grab=[null,null];E.log('carry');bark(dem,'demyan',G.solo?'Второй конец — мой! Неси!':'Подняли! Шагайте в ногу!',1.6,true);}};};
    function swap(){E.log('swap');bridleB.break();k5Flash(GOR.clone().add(new V3(0,4,0)),0xffd76a,4,0.5);bridle.visible=false;const gb=K5L.collar(gor.g,4.2,0.9);gb.g.children.forEach(c=>{if(c.material)c.material=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.7});});
      bark({g:gor.g},'gorM','Уговор есть уговор — возить буду! А тебя, Кощей, — вон!',2.6,true);
      later(1.2,()=>{K5L.ink(KS.g.position.clone().add(new V3(0,2,0)),26);const f=KS.g.position.clone();anim(0.9,k=>{KS.g.position.set(f.x-k*8,f.y+Math.sin(k*Math.PI)*4,f.z-k*6);});later(1,()=>{KS.g.visible=false;E.won(7);});});}
    A.tick=dt=>{if(!ES.fight)return;plankTick(dt);fireTick(dt);if(gor.necks)gor.necks.forEach((n,i)=>{if(n&&n.rotation)n.rotation.z=Math.sin(G.time*1.4+i)*0.15+(S.fire&&S.fire.li===i?0.3:0);});
      // ковка: кольцо сходится в такт
      if(S.ph==='forge'){S.bt+=dt;const per=0.8,ph=(S.bt%(per*3))/(per*3);beatR.visible=true;beatR.scale.setScalar(0.6+(1-ph)*2.2);beatR.material.opacity=ph>0.86||ph<0.06?1:0.5;
        const nb=Math.floor(S.bt/per);if(nb!==S.beat){S.beat=nb;if(AUD.ready())(nb%3===2?AUD.bell(523,{v:0.05,d:0.8}):AUD.osc({f0:880,d:0.05,v:0.02}));}
        if(G.solo&&false)S.good=0;}
      // перенос: середина между носильщиками; разошлись — уронили
      if(S.carry){const a=S.carry[0],b=S.carry[1]||dem;const pa=a.pos,pb=b===dem?a.pos.clone().add(new V3(1.8,0,0.6)):b.pos;if(b===dem){dem.g.position.lerp(pb,Math.min(1,dt*6));}
        const mid=pa.clone().add(pb).multiplyScalar(0.5);bridle.position.set(mid.x,Math.max(pa.y,pb.y)+1.0,mid.z);bridle.rotation.y=Math.atan2(pb.x-pa.x,pb.z-pa.z)+Math.PI/2;
        if(b!==dem&&(hd(pa,pb)>4.4||players[a.player].downed||players[b.player].downed))drop('Разошлись — уронили!');ES.prog=1/3+Math.min(1,(12-bridle.position.z)/30)/3;}
      if(S.ph==='done')return;
      // огонь по дорожкам
      S.fireT-=dt;if(S.fireT<=0&&!S.fire){S.fireT=G.solo?4.6:3.4;const hs=k5Heroes();const tgt=hs.find(h=>h.pos.z<8.5&&h.pos.z>-14);const li=tgt?LANES.reduce((b,x,i)=>Math.abs(tgt.pos.x-(X+x))<Math.abs(tgt.pos.x-(X+LANES[b]))?i:b,0):Math.floor(rand(0,3));fire(li);}
      // Лихо: веко поднимается 1,6 с, глаз открыт 1,2 с — кто смотрит в его сторону, засыпает
      S.eyeT-=dt;if(S.eyeT<=0&&S.eye===0){S.eye=0.001;bark({g:likho.g},'likho','Хр-р… кто тут?..',1.2,true);}
      if(S.eye>0){S.eye+=dt;const k=Math.min(1,S.eye/1.6);if(likho.lid)likho.lid.scale.y=1-k;if(likho.iris)likho.iris.material&&likho.iris.material.emissive&&likho.iris.material.emissive.set(k>=1?0xff4020:0x000000);
        if(S.eye>=1.6&&!S.gaze){S.gaze=true;const po=k5Heroes().find(h=>h.kind==='potap'&&h.guard);for(const h of k5Heroes()){const dx=LIKHO.x-h.pos.x,dz=LIKHO.z-h.pos.z,d=Math.hypot(dx,dz)||1,dot=(Math.sin(h.face)*dx+Math.cos(h.face)*dz)/d;
            const hid=po&&po!==h&&hd(po.pos,h.pos)<1.8&&hd(po.pos,LIKHO)<d;if(dot>0.25&&!hid&&!(h===po)){S.sleep.set(h,3);floatText(h.pos.clone().add(new V3(0,2.2,0)),'Zzz… заснул!','#c8b8ff');if(S.carry&&S.carry.indexOf(h)>=0)drop('Заснул — уронили!');E.log('sleep');}
            else floatText(h.pos.clone().add(new V3(0,2.2,0)),'Не смотрю!','#9fe0ff');}}
        if(S.eye>2.8){S.eye=0;S.gaze=false;S.eyeT=G.solo?11:8.5;if(likho.lid)likho.lid.scale.y=1;}}
      for(const [h,t] of S.sleep){const r=t-dt;h.vel.x*=0.2;h.vel.z*=0.2;if(r<=0)S.sleep.delete(h);else S.sleep.set(h,r);}};
    A.goal=pi=>S.ph==='forge'?(pi===0||G.solo?'У наковальни Демьяна — удар '+K(pi,'attack')+' <b>в такт</b>, когда кольцо сошлось: три раза.':'Прошка куёт узду. Огонь по дорожкам — уходи; Лихо открыло глаз — <b>отвернись</b>.'):
      S.ph==='carry'?(S.carry?'Несите узду к Горынычу. Огонь — другая дорожка, доска пропала — прыжок, глаз Лиха — отвернитесь. У головы — удар '+K(pi,'attack')+' <b>разом</b>.':'Узда готова: <b>клещи</b> '+K(pi,'item')+' у конца узды'+(G.solo?'.':' — каждый за свой конец.')):'Горыныч свободен!';
    A.targets=pi=>S.ph==='forge'?[anv&&anv.g?anv.g:dem.g]:S.ph==='carry'?(S.carry?[gor.g]:[bridle]):[];
  }
  E.pageStage(7,4,{call:'Четвёртая страница — Огненная Смородина! Горыныча Кощей взнуздал.'});
  E.CARDS[7]=[{p:[900,10,20],l:[900,1,-6],card:{tag:'Как победить',title:'Стадия 7 из 12 · Там на неведомых дорожках',icon:'wave',text:'Калинов мост. Горыныч в чёрной узде дышит огнём <b>по дорожкам</b>: полоса покраснела — уйди на другую. Доски прогорают — прыгай.'}},
    {p:[905,4,15],l:[904,1,11],card:{tag:'Вместе',title:'Золотая узда',icon:'anvil',text:'У наковальни Демьяна — три удара <b>в такт</b>. Горячую узду несут <b>двое клещами</b> за два конца (предмет). У головы Горыныча — удар <b>разом</b>.'}},
    {p:[898,5,-8],l:[893.5,1.6,-17.5],card:{tag:'Берегись',title:'Лихо Одноглазое',icon:'orb',text:'Веко Лиха поднимается — <b>отвернись</b> или встань за щит Потапа. Кто посмотрит в глаз — заснёт и выронит узду.'}}];
