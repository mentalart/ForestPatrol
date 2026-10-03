  function festival(){F.stage='fest';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-1.6,0);h.face=Math.PI;});snapCams();
    play({dur:7,fov:48,shots:[shot(0,[0,3,5],[0,1.2,-3])],says:[[0.4,3,null,'<i>Пелагея открывает тетрадку. Первый Сказ — сказку рассказываем мы сами.</i>',true],[3.6,3,'zven','Выбирайте: начало, помощник, конец!']],
      end:()=>skaz()});}
  function skaz(){G.ui='skaz';const el=$('skaz');el.style.display='flex';
    const steps=[{who:1,title:'Начало выбирает Игрок второй.',opts:['Жили-были звери во лесу','В некотором царстве, во дремучем лесу','Раз четверо друзей в лесу заплутали']},
      {who:0,title:'Помощника выбирает Игрок первый.',opts:['Леший со светлячком-огоньком','Баба Яга с клубочком','Колобок с пружинкой волшебной']},
      {who:2,title:'Конец — вместе: оба на одной строке, и оба жмите разом.',opts:['И стал Леший дорогу казать','И все воротились домой — к самовару, к чаю','И лес с тех пор тропинок не путал']}];
    let st=0;const sel=[0,0,0],both=[0,0],ok=[false,false];
    const draw=()=>{const s=steps[st];el.innerHTML='<div class="tet"><h2>Сказ · «Леший-проводник»</h2><div class="step">'+s.title+'</div>'+
      s.opts.map((o,i)=>'<div class="opt'+((s.who<2?sel[st]===i:false)?' sel':'')+'">'+(s.who===2?[0,1].map(q=>both[q]===i?'<b style="color:'+PCSS[q]+'">'+(ok[q]?'●':'○')+'</b>':'<b></b>').join(''):'')+o+'</div>').join('')+
      '<div class="hint">'+(s.who===2?'оба: '+K(0,'left')+K(0,'right')+' / '+K(1,'left')+K(1,'right')+' · '+K(0,'jump')+' + '+K(1,'jump'):K(s.who,'up')+K(s.who,'down')+' · '+K(s.who,'jump'))+'</div>'+
      '<div class="tale">'+[steps[0].opts[sel[0]],st>0?'помощник — '+steps[1].opts[sel[1]]:''].filter(x=>x).join(' · ')+'</div></div>';};
    draw();
    G.uiTick=()=>{const s=steps[st];
      if(s.who<2){const n=uiNav(UW(s.who));if(n.dy||n.dx){sel[st]=(sel[st]+(n.dy||n.dx)+3)%3;SFX.swap();draw();}if(tap(UW(s.who),'jump')){SFX.ok();st++;draw();}}
      else{for(const q of[0,1]){const n=uiNav(q);if(n.dy||n.dx){both[q]=(both[q]+(n.dy||n.dx)+3)%3;ok[q]=false;SFX.swap();draw();}if(tap(q,'jump')){ok[q]=true;if(G.solo){ok[1-q]=true;both[1-q]=both[q];}SFX.plate();draw();}}
        if(ok[0]&&ok[1]){if(both[0]===both[1]){sel[2]=both[0];SFX.ok();G.ui=null;G.uiTick=null;el.style.display='none';tell(steps.map((x,i)=>x.opts[sel[i]]));}
          else{ok[0]=ok[1]=false;SFX.miss();banner('Конец — одной строкой!','#ffd0d0',1.4,'договоритесь — и нажмите вдвоём');draw();}}}};}
  function tell(t){const T=HERO,pe=T.pelageya;G.flags.skaz=t;
    play({dur:15,fov:46,shots:[shot(0,[3.4,1.9,-1.2],[2.3,1.6,-4.6]),shot(7.6,[-1.4,1.6,0.4],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.4,3.4,'kot',t[0]+'.'],[3.9,3.4,'kot','И помог им в том '+t[1].replace(/^./,c=>c.toLowerCase())+'.'],[7.6,3.6,'kot',t[2]+'.'],[11.4,3.4,null,'<i>Кот нашу сказку сказывает своим голосом,</i><br><i>А Пелагея клювом шевелит вслед — тихо, волосом.</i>',true]],
      tick:(tt)=>{pe.body.position.y=tt>0.4&&tt<11?Math.abs(Math.sin(tt*9))*0.04:0;kot.head.rotation.x=Math.sin(tt*2)*0.05;},
      end:()=>{banner('Сказ «Леший-проводник»','#ffd76a',2.4,'весточка: помощник с вами в новый мир пойдёт');later(2.6,voiceScene);}});}
  function voiceScene(){const T=HERO;const ko=makeKoschei();ko.g.position.set(-9,-0.2,-26);ko.g.visible=false;const coil=addCoil(0,false);
    const thread=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.025,1,6),MB(0xffd76a));thread.visible=false;W.group.add(thread);
    const kotHead=()=>{const v=new V3();kot.head.getWorldPosition(v);return v;};
    HEROES.forEach((h,i)=>{placeOnGround(h,-2.6+i*1.6,-1.2,0);h.face=Math.PI;});
    play({dur:50,fov:46,camK:2.2,
      shots:[shot(0,[0,4,6],[0,3,-7]),shot(3.2,[3.6,2.2,-1],[0,2.2,-7]),shot(9,[5,2.6,-2.4],[2.3,1.9,-5.6]),shot(14,[-2,3.2,2],[-7,1.4,-20],[-2,2.6,0.5],[-4,1.6,-10],5),
        shot(21,[4.6,2.4,-2],[2.3,2.0,-5.4]),shot(29,[3.8,2.1,-3],[2.3,2.1,-5]),shot(34,[-1,3,2],[-5,1,-18],[0,3.4,4],[-10,1,-40],7),shot(42,[3.4,1.8,-2.2],[2.3,1.9,-4.8]),shot(46,[0,2.2,3.6],[0,1.2,-1.2])],
      says:[[0.4,3,null,'<i>На Лукоморье — пир да праздник.</i>',true],[3.4,3.4,null,'<i>Кузьма на дуб первую цепь вешает.</i>',true],[9.2,3.6,null,'<i>Кот на первую ступень цепи восходит,</i><br><i>Рот открывает — песню заводит…</i>',true],
        [13.6,2.6,null,'<i>…и вдруг — тишина.</i>',true],[16.8,4.2,null,'<i>Как пришёл он — не видал никто:</i><br><i>Высок, сух, в кафтане чёрном, звенит, как ключей решето.</i>',true],
        [22,4.4,null,'<i>На нас Кощей не глядит. К Коту руку тянет — перстень тяжёл —</i><br><i>И голос снимает с него, золотую ниточку, как шапку, — и прочь пошёл.</i>',true],
        [30,3.2,null,'<i>Ниточку в карман кладёт —</i><br><i>И по воде уходит, не оглянётся вперёд.</i>',true],[42.4,1.6,'kot','Мяу.'],[44.4,2.4,null,'<i>Прошка впервые за всю игру — ни слова.</i>',true],[47,2.8,null,'<i>Варя берёт меня за рукав.</i>',true]],
      events:[{t:0.3,fn:()=>{SFX.ok();for(let i=0;i<5;i++)later(i*0.5,()=>burst(new V3(rand(-6,6),3,rand(-6,2)),[0xff9ad0,0xfff08a,0x9ad0ff][i%3],10,3));}},
        {t:3.6,fn:()=>{coil.visible=true;coil.scale.setScalar(0.01);anim(1.4,k=>coil.scale.setScalar(Math.max(0.01,smooth(k))));SFX.link();G.flags.coils=Math.max(1,G.flags.coils||0);}},
        {t:9.2,fn:()=>{const from=kot.g.position.clone();anim(2,k=>{kot.g.position.set(lerp(from.x,1.7,k),Math.sin(k*Math.PI)*0.3+k*0.9,lerp(from.z,-5.4,k));});kot.lids.forEach(l=>{l.rotation.x=-0.5;});}},
        {t:11.8,fn:()=>{kot.head.rotation.x=-0.35;lullaby([67,71,74],0.35,0,0.12);}},
        {t:16.4,fn:()=>{ko.g.visible=true;SFX.keys();anim(5,k=>{ko.g.position.set(lerp(-9,0.2,k),-0.2+Math.min(1,k*3)*0.2,lerp(-26,-3.6,k));ko.body.rotation.z=Math.sin(k*20)*0.03;});ko.g.rotation.y=0.4;}},
        {t:22.2,fn:()=>{ko.g.rotation.y=Math.atan2(2.3-0.2,-4.6+3.6)+0.2;anim(1.2,k=>{ko.armR.rotation.x=-1.3*smooth(k);});}},
        {t:24.4,fn:()=>{thread.visible=true;SFX.keys();}},
        {t:28.6,fn:()=>{anim(1.2,k=>{ko.armR.rotation.x=-1.3*(1-smooth(k));});}},{t:29.8,fn:()=>{thread.visible=false;}},
        {t:30.2,fn:()=>{ko.g.rotation.y=Math.PI*0.95;SFX.keys();anim(11,k=>{ko.g.position.set(lerp(0.2,-6,k),0,lerp(-3.6,-60,k));});}},
        {t:41.6,fn:()=>{ko.g.visible=false;kot.head.rotation.x=0;}},{t:42.4,fn:()=>{tone(700,0.4,'sine',0.3,520);}},
        {t:44.4,fn:()=>{T.proshka.face=Math.PI*0.5;}},{t:47,fn:()=>{T.pelageya.face=Math.atan2(T.proshka.pos.x-T.pelageya.pos.x,T.proshka.pos.z-T.pelageya.pos.z);}}],
      tick:(t)=>{if(thread.visible){const a=kotHead(),b=new V3();ko.hand.getWorldPosition(b);const k=clamp((t-24.4)/3,0,1);const end=a.clone().lerp(b,k);
          thread.position.copy(a).add(end).multiplyScalar(0.5);thread.scale.y=Math.max(0.01,a.distanceTo(end));thread.quaternion.setFromUnitVectors(new V3(0,1,0),end.clone().sub(a).normalize());}},
      end:()=>{G.flags.voiceDone=true;F.stage='free';ko.g.visible=false;later(1.2,()=>showMenu('end'));}});}}
function lukoScene(){const Z=W.zven,kot=W.kot,F=W.flags,T=HERO;const faceTo=(h,x,z)=>{h.face=Math.atan2(x-h.pos.x,z-h.pos.z);};
  play({dur:24.5,fov:50,
   shots:[shot(0,[0,5.2,17],[0,2.4,3]),shot(3.0,[-4.2,2.4,4.4],[0,7,-7],[-2.8,2.0,2.8],[0,3.4,-7],2.4),shot(5.4,[3.9,1.9,-1.3],[2.3,1.75,-4.6]),
     shot(11.6,[0.3,2.1,10.4],[0,1.0,4.6]),shot(16.2,[4.1,2.0,-1.0],[2.3,1.7,-4.6]),shot(20.2,[0,4.6,9.5],[0,3.6,-7])],
   says:[[7.0,4.6,'kot','Звено куют руками,<br>А держится оно словами.'],[12.2,2.4,'proshka','<i>(шёпотом)</i> Это он про что, скажи?'],[16.6,3.6,'kot','Присказка кузнечная, старая. Не берите в голову, право.']],
   events:[{t:0,fn:()=>{HEROES.forEach((h,i)=>{h.pos.y=6.5+i*0.7;h.vel.set(0,0,0);h.grounded=false;h.face=Math.PI;});kot.head.rotation.x=0.4;kot.lids.forEach(l=>{l.rotation.x=1.3;});}},
     {t:1.1,fn:()=>{SFX.thud();shakeAll(0.03,0.2);HEROES.forEach(h=>burst(new V3(h.pos.x,0.2,h.pos.z),0xd8c8a0,6,2));}},
     {t:3.0,fn:()=>HEROES.forEach(h=>faceTo(h,0,-7))},
     {t:5.4,fn:()=>{F.eyes=true;kot.lids.forEach(l=>anim(1.2,k=>{l.rotation.x=lerp(1.3,-0.5,smooth(k));}));}},
     {t:11.6,fn:()=>HEROES.forEach(h=>faceTo(h,2.3,-4.6))},
     {t:12.2,fn:()=>faceTo(T.proshka,T.potap.pos.x,T.potap.pos.z)},
     {t:14.6,fn:()=>{SFX.wave();faceTo(T.potap,T.proshka.pos.x,T.proshka.pos.z);faceTo(T.pelageya,T.yosha.pos.x,T.yosha.pos.z);faceTo(T.yosha,T.pelageya.pos.x,T.pelageya.pos.z);
       floatText(T.pelageya.pos.clone().add(new V3(0,1.7,0)),'?','#e7c3ff');floatText(T.potap.pos.clone().add(new V3(0,2.2,0)),'?','#e0b27a');floatText(T.yosha.pos.clone().add(new V3(0,1.3,0)),'?','#8fe0d4');}},
     {t:20.4,fn:()=>{zvenRing();G.links=1;banner('Звено 1 — Звенышко','#ffd76a',2.6,'первое звено цепи — самим Котом скованное');}}],
   tick:(t,dt)=>{kot.head.rotation.x=lerp(0.4,-0.05,smooth((t-5.4)/1.6));
     if(t<4)Z.pos.lerpVectors(new V3(0,9,3),new V3(0.8,2.4,1.6),smooth(t/4));
     else if(t<20.2)Z.pos.set(0.8+Math.sin(t*0.9)*0.3,2.4,1.6);
     else{const a=(t-20.2)*2.2;Z.pos.set(Math.sin(a)*2.6,3.2+Math.sin(a*0.5)*0.4,-7+Math.cos(a)*2.6);}},
   end:()=>{F.stage='free';Z.mode='lead';kot.head.rotation.x=-0.05;kot.lids.forEach(l=>{l.rotation.x=-0.5;});snapCams();}});}

