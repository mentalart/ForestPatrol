// ---- продолжение late_93_koschei_level.js (внутри build5B2, часть 4 из 5): сказы и переходы между этапами — части склеиваются сборкой по имени файла ----
  const skOpt=(t,d)=>'<div style="text-align:left;line-height:1.25">'+t+'<div style="font:600 13px system-ui;opacity:.72;margin-top:3px">'+d+'</div></div>';
  const SK1=['Жил-был мальчик — сказки сам сложить мечтал','Жил у Кота Учёного ученик','Жил-был мальчишка с молоточком деревянным'],
    SK1D=['про мечту: он хотел сам придумывать сказки','про то, как было: он учился сказкам у Кота Учёного','про умелые руки: он всё мастерил своим молоточком'],
    SK1P=['…а рядом с ним стоял Потап: держал — не отпускал.','…а рядом с ним — Потап: держать он крепко привык.','…а рядом с ним — Потап, плечом надёжным, постоянным.'];
  const K5HELP={leshy:['тропинку в лесу светлячком осветил','И Леший с ним по лесу шёл — светлячком тропинку вёл.'],yaga:['клубок дала — дорогу показать','И Яга клубок дала: куда катится — туда дорога и вела.'],
    kolobok:['катился впереди и пел, чтоб не грустил','И Колобок катился впереди, напевая: «Не грусти, иди!»'],sadko:['на гуслях играл, чтоб не скучал','И Садко ему играл — чтоб мальчишка не скучал.'],
    kit:['на спине через море перевёз','И Рыба-кит его катал — через море, через вал.'],rybka:['исполнила желанье — чтоб был друг','И Рыбка золотая желанье исполнила одно: «Пусть будет друг!» — и сбылось оно.'],
    zhar:['пером тьму разогнала','И Жар-птица прилетала — пером во тьме ему сияла.'],sirin:['песней грусть прогнали','И Сирин с Алконостом пели — грусть прогнать сумели.'],
    yaga3:['в ступе над лесом покатала','И Яга в ступе с ним летала — над лесом звёзды показала.'],demyan:['ковать научил','И Демьян-кузнец учил ковать — молоточком в лад стучать.'],
    kiki4:['крепкую нитку спряла','И Кикимора кудель пряла — нитку крепкую ему дала.'],leshy4:['светлячков созвал — весь лес засиял','И Леший светлячков созвал — весь лес мальчишке засиял.']};
  const ENDD=['уйдёт за море свободным, а перстень оставит на дубе — на память','попросит прощенья у Кота и будет жить на дальнем берегу','останется у дуба и будет слушать сказки вместе со всеми'];
  function skaz1(){F.stage='skaz1';skazClouds({who:1,title:'Сказ про мальчишку · начало',sub:'Пелагея досказывает сказку из тетрадки — про мальчишку, каким Кощей был давным-давно. Пусть Кощей услышит: в этой сказке он не один. С чего она начнётся? Выбирает Игрок 2.',
      opts:SK1.map((t,i)=>skOpt(t,SK1D[i]))},i=>{const t=SK1[i],t2=SK1P[i];F.sk1=t;F.skaz=1;
      heroLine(-11);const pe=T.pelageya,po=T.potap,pr=T.proshka,yo=T.yosha;placeOnGround(po,-1,-12.3,0);po.face=Math.PI;KS.g.position.copy(KP);KS.g.rotation.y=0;KA.pose('castR',{snap:true});
      const PEs=new V3(1,0,-11.8),C1=new V3(PEs.x,1.15,PEs.z),orb=a=>[C1.x+Math.sin(a)*2.6,1.3,C1.z+Math.cos(a)*2.6],F3=k5Face(hH(pr),Math.PI,-0.35,1.8,0),F5=k5Face(new V3(po.pos.x,1.35,po.pos.z),Math.PI,0.3,2.0,-0.1);
      const two=k5Two(new V3(PEs.x,1.1,PEs.z),new V3(po.pos.x,1.3,po.pos.z),Math.PI+0.1,3.4,0.25,-0.1),F1s=k5Face(new V3(PEs.x,1.15,PEs.z),Math.PI,0.4,2.0,0.05);
      play({dur:15.2,fov:44,camK:2.4,k5:{mood:[STORY,0.16],cues:[[6.8,()=>CINE.punch(-3)],[10.6,()=>{CINE.slowmo(0.5,0.6);CINE.rimPulse(0.9);CINE.mood(GOLD,0.18);}],[13.0,emAll('cheer',0.08)]]},
        shots:[MV(0,orb(Math.PI+0.55),[C1.x,1.1,C1.z],orb(Math.PI+0.12),[C1.x,1.15,C1.z],4.2,{pts:[orb(Math.PI+0.33)],ease:'inOutSine',fov:40,move:'none'}),
          MV(4.2,[KP.x+1.4,3.0,KP.z+6.2],[KP.x,3.2,KP.z],[KP.x+1.1,3.3,KP.z+5.2],[KP.x,3.4,KP.z],2.4,{ease:'inOutSine',fov:42,move:'none'}),
          SH(6.6,F3.p,F3.l,{fov:40,move:'push',amp:1.3}),
          SH(8.8,F1s.p,F1s.l,{fov:40,move:'push',amp:1.2}),
          MV(10.6,two.p,two.l,[two.p[0]+0.5,two.p[1]+0.1,two.p[2]-0.3],two.l,2.0,{fov:42,move:'none'}),
          MV(12.6,[3.5,2.4,-15.2],[0,1.2,-11.6],[7,7,-20.5],[0,1,-11],2.6,{ease:'inOutSine',fov:48,move:'none'})],
        says:[[0.4,3.8,'pelageya',t+'…'],[4.3,2.4,null,'<i>Кощей руку опускает — и слушает, не дыша:</i><br><i>Сказка-то — про него самого, про мальчишку-малыша.</i>',true],[6.8,1.9,'proshka','Дальше, дальше! Не томи —<br>Что там было? Говори!'],[8.9,4.2,'pelageya',t2]],
        events:[{t:0,fn:()=>{hWalk(pe,PEs.x,PEs.z,0.8,Math.PI);k5s('story');storyMotes(()=>pe.pos.clone().add(new V3(0,0.2,0)),4.4,18);}},{t:4.3,fn:()=>{KA.pose('listen',{k:60,c:11});}},
          {t:10.5,fn:()=>{G.flags.names.potap=true;k5s('name');nameBurst(po,0xe0b27a);floatText(po.pos.clone().add(new V3(0,2.6,0)),'Потап','#e0b27a');banner('Имя вернулось: Потап','#e0b27a',2.4);}},{t:10.8,fn:em(po,'joy')}],
        end:()=>{W.anims.length=0;KA.reset();FIN.k5e.flow('skaz1');}});});}
  function trans2(){F.stage='t2';liveBoss(false);KS.g.position.copy(KC);KS.g.rotation.y=0;heroLine(-9);const pr=T.proshka,po=T.potap,yo=T.yosha,pe=T.pelageya;
    const KH=new V3(KC.x,4.15,KC.z),F2=k5Face(KH,0,0.3,3.3,-0.4),F2b=k5Face(KH,0,0.3,2.8,-0.35);
    play({dur:9.4,fov:44,camK:2.4,k5:{iris:true,mood:[COLD,0.12],cues:[[0.15,()=>{CINE.hitstop(3);CINE.punch(-4);CINE.flashDip('#ffe8a0',0.35);}],[4.9,()=>{CINE.flashDip('#e8e0ff',0.4);CINE.trauma(0.3);CINE.mood(DARK,0.18);}],[5.8,()=>CINE.trauma(0.2)]]},
      shots:[MV(0,[KC.x+3.2,2.6,KC.z+4.6],[KC.x,2.8,KC.z],[KC.x+3.8,2.9,KC.z+5.6],[KC.x,2.9,KC.z],1.6,{fov:44,move:'none'}),
        MV(1.6,F2.p,F2.l,F2b.p,F2b.l,2.8,{ease:'inOutSine',fov:42,fov2:38,move:'none'}),
        MV(4.4,[KC.x+4,1.0,KC.z+7],[KC.x,4,KC.z],[KC.x+4.4,1.2,KC.z+7.6],[C.x,13,C.z-6],2.2,{ease:'outCubic',fov:56,move:'none'}),
        MV(6.6,[0.8,0.9,-12.4],[0,1.35,-9],[-0.6,0.95,-12.5],[-0.3,1.35,-9],2.8,{ease:'inOutSine',fov:44,move:'none'})],
      says:[[1.8,3.0,'koschei','Из сказок воротились? Не беда!<br>Так буря грянет! Тучи, все — сюда!'],[4.6,3.6,null,'<i>Потемнело небо. С моря тучи ползут, как дым,</i><br><i>И над Буяном ветер воет — злым-презлым.</i>',true]],
      events:[{t:0.1,fn:()=>{bindBeat();KA.pose('recoil',{snap:true});}},{t:1.7,fn:pose('proud',{antic:0.15})},{t:3.6,fn:pose('castR',{antic:0.25})},
        {t:4.4,fn:()=>{k5StormSet(1);K5.storm=Math.max(K5.storm,0.55);k5s('thunder');}},{t:4.9,fn:()=>{k5Bolt(new V3(C.x+14,0,C.z-10),0xd8b0ff);k5s('bolt');}},{t:5.8,fn:()=>{k5Bolt(new V3(C.x-15,0,C.z-6),0xd8b0ff);k5s('bolt');}},
        {t:6.8,fn:emAll('fear',0.1)},{t:7.4,fn:()=>{hWalk(po,po.pos.x+0.8,po.pos.z-0.8,0.5,Math.PI);ACT.emote(po,'effort',0.1);later(0.5,()=>k5s('stomp'));}},{t:7.6,fn:()=>hWalk(yo,po.pos.x+1.2,po.pos.z+0.6,0.6,Math.PI)}],
      end:()=>{W.anims.length=0;KA.reset();skaz2();}});}
  function skaz2(){F.stage='skaz2';const names=HM.map(h=>skOpt(h.name,(K5HELP[h.k]||K5HELP.leshy)[0]));skazClouds({who:0,title:'Сказ про мальчишку · помощник',sub:'В каждой сказке у героя есть помощник. Кто помогал мальчишке? Это друзья, которых вы выручили в своих Сказах, — они стоят у дуба. Выбирает Игрок 1.',opts:names},i=>{const h=HM[i];F.sk2=h.name;F.sk2k=h.k;F.skaz=2;
      heroLine(-8);const pe=T.pelageya,yo=T.yosha,f=h.m.g.position.clone(),hf=Math.atan2(C.x-f.x,C.z-f.z),to=f.clone().add(new V3(Math.sin(hf)*2,0,Math.cos(hf)*2));
      const hbb=new THREE.Box3().setFromObject(h.m.g),hy=h.k==='kit'?0.2:Math.max(1.0,hbb.max.y-0.6),FH=k5Face(new V3(to.x,hy,to.z),hf,f.x<0?-0.5:0.5,h.k==='kit'?6:clamp(hy*1.1+1.8,3.2,7),h.k==='kit'?0.4:-0.2),F1=k5Face(hH(pe),Math.PI,0.4,2.0,0.05),F1b=k5Face(hH(pe),Math.PI,-0.45,2.3,0.05),F6=k5Face(hH(yo),Math.PI,-0.3,1.6,0.05);
      const ST=new V3(-3.5,0,-20.1),KSH=new V3(ST.x,3.0,ST.z),F4=k5Face(KSH,0.4,0.45,2.6,-0.25);
      const ya=yagaM?yagaM.g.position.clone():null,yf=yagaM?yagaM.g.rotation.y:0,FY=ya?k5Face(ya.clone().add(new V3(0,1.3,0)),yf,0.35,2.6,0.1):null;
      play({dur:25.7,fov:44,camK:2.2,k5:{mood:[STORY,0.14],cues:[[6.0,()=>CINE.mood(WARM,0.14)],[19.7,()=>{CINE.slowmo(0.5,0.55);CINE.rimPulse(0.9);CINE.mood(GOLD,0.16);}],[23.8,emAll('cheer',0.08)]]},
        shots:[SH(0,F1.p,F1.l,{fov:40,move:'orbit',amp:1}),
          MV(3.6,FH.p,FH.l,[FH.p[0]*0.92+to.x*0.08,FH.p[1],FH.p[2]*0.92+to.z*0.08],FH.l,2.2,{fov:44,move:'none'}),
          MV(5.8,[-0.6,2.6,-16.4],[ST.x,2.2,ST.z],[-1.1,2.8,-17.2],[ST.x,2.4,ST.z],2.2,{fov:44,move:'none'}),
          SH(8.0,F4.p,F4.l,{fov:40,move:'push',amp:1}),
          ya?SH(10.2,FY.p,FY.l,{fov:42,move:'orbit',amp:0.8}):SH(10.2,[-1.4,2,-15.6],[ST.x,2.6,ST.z],{fov:42,move:'push'}),
          SH(14.6,F1b.p,F1b.l,{fov:40,move:'push',amp:1.0}),
          SH(19.7,F6.p,F6.l,{fov:40,move:'push',amp:1.4}),
          MV(23.9,[3.4,2.4,-11.8],[0,1.1,-8.4],[7,7.5,-16.5],[0,1,-8],1.8,{ease:'inOutSine',fov:48,move:'none'})],
        says:[[0.3,3.3,'pelageya',(K5HELP[h.k]||K5HELP.leshy)[1]],[5.9,4.6,null,'<i>Помощник шаг вперёд шагнул. Кощей на камень садится —</i><br><i>Руки на колени кладёт и слушает, не шевелится.</i>',true],
          [10.4,4.2,null,'<i>Яга на краю поляны глаз метлой утирает —</i><br><i>Мол, от пыли это, никто не узнает.</i>',true],[14.8,5.0,'pelageya','…а с ними ёжик воду нёс — живую, чтоб садик у мальчишки рос.'],[20.0,3.7,'yosha','Это ж я! Я — Йоша! Вот кто я!']],
        events:[{t:0,fn:()=>{k5s('story');storyMotes(()=>pe.pos.clone().add(new V3(0,0.2,0)),3.6,16);}},
          {t:3.6,fn:()=>{if(h.k!=='kit'){anim(1.4,k=>{const e=CE.inOutSine(k);h.m.g.position.lerpVectors(f,to,e);h.m.g.position.y=Math.abs(Math.sin(k*Math.PI*3))*0.12;});later(1.5,npcEm(h.m,'hop'));}else{anim(1.6,k=>{h.m.g.position.y=-1.2+Math.sin(k*Math.PI)*1.5;});}
            HM.forEach(o=>{if(o!==h)later(0.4,npcEm(o.m,'nod'));});}},
          {t:5.8,fn:()=>{KS.g.position.copy(ST);KS.g.position.y=-0.45;KS.g.rotation.y=0.4;KA.pose('sit',{antic:0.2,k:70,c:12});}},
          {t:10.4,fn:()=>{if(yagaM){anim(2.2,k=>{yagaM.g.rotation.z=Math.sin(k*Math.PI*3)*0.12;});later(0.6,npcEm(yagaM,'nod'));}}},
          {t:14.6,fn:()=>{k5s('story');storyMotes(()=>pe.pos.clone().add(new V3(0,0.2,0)),5.0,14);ACT.emote(yo,'tilt');}},
          {t:19.8,fn:()=>{k5s('name');if(!G.flags.names.yosha){G.flags.names.yosha=true;banner('Имя вернулось: Йоша','#8fe0d4',2.4);}nameBurst(yo,0x8fe0d4);ACT.emote(yo,'joy');}}],
        end:()=>{W.anims.length=0;KA.reset();if(yagaM)yagaM.g.rotation.z=0;KS.g.position.copy(KP);KS.g.rotation.y=0;trans2b();}});});}
  function trans2b(){F.stage='t2b';heroLine(-8);KS.g.position.copy(KP);KS.g.rotation.y=0;const pr=T.proshka,pe=T.pelageya;
    const FLY=new V3(C.x,5.4,C.z-4),FH=FLY.clone().add(new V3(0,4.15,0)),F2=k5Face(hH(pr),Math.PI,-0.35,1.7,-0.35),two=k5Two(hH(pr),hH(pe),Math.PI+0.2,3.4,0.15,-0.1);
    const ghost=k5Prop(new THREE.Group());ghost.add(k5Glow(0xffd060,1.1));ghost.add(new THREE.Mesh(new THREE.SphereGeometry(0.16,10,8),MB(0xfff4c0)));ghost.visible=false;
    play({dur:11.8,fov:46,camK:2.2,k5:{mood:[DARK,0.14],cues:[[0.45,()=>{CINE.punch(-4);CINE.trauma(0.2);FX.speed(0.6);}],[2.8,()=>CINE.dollyZoom(0.14,0.8,0.5)],[9.4,()=>CINE.punch(-3)]]},
      shots:[MV(0,[KP.x+4.5,1.2,KP.z+7],[KP.x,2.6,KP.z],[KP.x+5.5,1.6,KP.z+9],[FLY.x,6.5,FLY.z],2.4,{lf:()=>KS.rig.chest.getWorldPosition(new V3()),lk:5,fov:50,fov2:54,move:'none'}),
        SH(2.5,F2.p,F2.l,{fov:40,move:'push',amp:1.3}),
        MV(5.6,two.p,two.l,[two.p[0]-0.5,two.p[1]+0.1,two.p[2]+0.3],two.l,3.4,{fov:42,move:'none'}),
        MV(9.1,[FLY.x+1.8,8.6,FLY.z+3.6],[FH.x,FH.y-0.1,FH.z],[FLY.x-1.4,8.8,FLY.z+3.7],[FH.x,FH.y-0.15,FH.z],2.6,{pts:[[FLY.x+0.2,8.7,FLY.z+4.1]],ease:'inOutSine',fov:42,move:'none'})],
      says:[[2.7,2.9,'proshka','Взлетел! Ну как его теперь достать?<br>Рогаткой, что ли, в тучу попадать?'],[5.8,3.3,'pelageya','Шар отбей дружку, а он — наверх, назад, —<br>Вернётся шар к Кощею: то-то будет рад!'],[9.3,2.4,'koschei','Достаньте, коль сумеете! Я — выше туч!']],
      events:[{t:0.1,fn:()=>KA.pose('kneel',{snap:true})},
        {t:0.45,fn:()=>{KA.pose('cast',{snap:true});k5s('flyUp');kFly(FLY,2.0,'outCubic');const p=new V3(KP.x,0.1,KP.z);FX.dust(p,16,0x9a8a6a,1.3);k5Ring(p,0xd0b0ff,0.5,4.5,0.6,0.12);
          const rn=k5Decal(K5TEX.rune,0xb070ff,2.6,p,1);k5fx(1.4,k=>{rn.material.opacity=1-k;rn.rotation.z+=0.05;},()=>k5Del(rn));}},{t:2.6,fn:em(pr,'surprise')},
        {t:6.2,fn:()=>{pe.face=Math.atan2(pr.pos.x-pe.pos.x,pr.pos.z-pe.pos.z);ACT.emote(pe,'hop');}},
        {t:6.7,fn:()=>{ghost.visible=true;const a=hH(pe),b=hH(pr);anim(0.7,k=>{ghost.position.lerpVectors(a,b,k);ghost.position.y+=Math.sin(k*Math.PI)*1.2;});k5s('orbPass');later(0.7,()=>{k5s('orbHit');k5Flash(b,0xffe08a,1.6,0.3);ACT.emote(pr,'hop');
          const c=b.clone();anim(0.8,k=>{ghost.position.set(c.x,c.y+k*6,c.z);});later(0.8,()=>{FX.sparkle(ghost.position.clone(),10,0xffe08a);ghost.visible=false;});});}},
        {t:8.0,fn:()=>{pe.face=Math.PI;ACT.emote(pr,'nod');}},{t:9.3,fn:()=>{KA.pose('proud');KA.laugh=2.2;later(0.3,()=>k5s('laugh'));}}],
      end:()=>{W.anims.length=0;KA.reset();k5Del(ghost);FIN.k5e.flow('trans2b');}});}
  function trans3(){F.stage='t3';liveBoss(false);KS.g.position.copy(KC);KS.g.rotation.y=0;heroLine(-9);const po=T.potap,pr=T.proshka,yo=T.yosha;
    const KH=new V3(KC.x,4.15,KC.z),hand=()=>KS.hand.getWorldPosition(new V3()),POs=new V3(po.pos.x+0.6,0,po.pos.z-1.4),F3=k5Face(hH(pr),Math.PI,0.35,1.7,0),F4=k5Face(new V3(POs.x,1.3,POs.z),Math.PI,-0.5,2.8,-0.1);
    const P2a=[KC.x+2.4,2.2,KC.z+1.6],P2b=[KC.x+1.0,3.4,KC.z+3.3],mid=new V3(0,0,(KC.z-9)/2);
    play({dur:12.6,fov:44,camK:2.4,k5:{iris:true,mood:[DARK,0.14],cues:[[0.15,()=>{CINE.hitstop(3);CINE.punch(-4);CINE.flashDip('#ffe8a0',0.3);}],[2.2,()=>{CINE.punch(-6);CINE.hitstop(3);CINE.flashDip('#c8a0ff',0.3);}],
        [6.0,()=>CINE.dollyZoom(0.2,0.8,0.6)],[8.7,()=>{CINE.punch(-4);CINE.rimPulse(0.9);CINE.mood(WARM,0.12);}]]},
      shots:[MV(0,[KC.x+3.4,2.4,KC.z+4.6],[KC.x,2.6,KC.z],[KC.x+3.9,2.7,KC.z+5.4],[KC.x,2.7,KC.z],1.4,{fov:44,move:'none'}),
        MV(1.4,P2a,[KC.x+0.3,2.0,KC.z],P2b,[KH.x,KH.y-0.1,KH.z],2.4,{lf:(t,k)=>hand().lerp(kH(),clamp(k,0,1)),lk:9,ease:'inOutCubic',fov:42,move:'none'}),
        SH(5.6,F3.p,F3.l,{fov:40,move:'push',amp:1.3}),
        MV(8.2,F4.p,F4.l,[F4.p[0],F4.p[1]-0.1,F4.p[2]-0.4],F4.l,2.4,{ease:'outCubic',fov:42,move:'none'}),
        MV(10.6,[mid.x+10,3.2,mid.z+2],[mid.x,1.8,mid.z],[mid.x+10.4,3.8,mid.z-1.5],[mid.x,1.9,mid.z],2.0,{ease:'inOutSine',fov:46,move:'none'})],
      says:[[2.6,2.9,'koschei','Довольно сказок! Меч — в руке:<br>Ваш сказ я кончу на первой строке!'],[5.7,2.4,'proshka','Меч! Настоящий! Ой-ой-ой…<br>Я не боюсь! Я… тут, за спиной!'],[8.4,2.2,'potap','Все за спину! Мой щит — стена,<br>И буря мне не страшна!']],
      events:[{t:0.1,fn:()=>{bindBeat();KA.pose('recoil',{snap:true});FX.dust(new V3(KC.x,0.05,KC.z),12,0x9a8a6a,1.1);}},{t:1.5,fn:pose('guard',{antic:0.25})},
        {t:2.1,fn:()=>{sword.visible=true;k5s('draw');KA.pose('sword',{snap:true});FX.sparkle(hand(),16,0xd0b0ff);k5Flash(hand(),0xb070ff,2.4,0.35);k5Trail(()=>sword.parent&&sword.visible&&G.cine?sword.userData.edge.getWorldPosition(new V3()):null,0xb070ff,{size:0.4,life:0.25,every:0.02,max:20});}},
        {t:4.4,fn:pose('threat')},{t:6.6,fn:em(pr,'fear')},{t:6.4,fn:()=>hWalk(yo,po.pos.x+0.5,po.pos.z+1.0,0.6,Math.PI)},
        {t:8.2,fn:()=>{hWalk(po,POs.x,POs.z,0.5,Math.PI);later(1.5,()=>{T.potap._demoGuard=G.time+2.4;FX.dust(new V3(POs.x,0.05,POs.z),8,0xd8c8a8,0.9);k5s('stomp');});}},{t:9.0,fn:em(po,'pride')},
        {t:10.4,fn:()=>{hWalk(pr,POs.x-1.2,POs.z+1.2,0.6,Math.PI);hWalk(T.pelageya,POs.x+1.2,POs.z+1.1,0.6,Math.PI);}}],
      end:()=>{W.anims.length=0;KA.reset();KS.armR.rotation.x=0;FIN.k5e.flow('trans3');}});}
  function trans4(){F.stage='t4';liveBoss(false);KS.g.position.copy(KC);KS.g.rotation.y=0;heroLine(-9);const pr=T.proshka,pe=T.pelageya;
    const hand=()=>KS.hand.getWorldPosition(new V3()),ZP=new V3(0.2,2.2,-11.6),F4=k5Face(hH(pr),Math.PI,-0.3,1.8,0),AF=new V3(6,1.2,-19);
    KS.g.updateMatrixWorld(true);const NW=ndl.g.getWorldPosition(new V3()),NG=new V3(NW.x+0.4,0.3,NW.z+1.2);   // куда упадёт игла
    play({dur:14.2,fov:44,camK:2.4,k5:{iris:true,mood:[DARK,0.18],cues:[[0.5,()=>{CINE.trauma(0.5);CINE.dutch(0.08);}],[2.4,()=>CINE.dutch(0)],[2.95,()=>CINE.slowmo(0.4,0.6)],[4.2,()=>CINE.mood(WARM,0.12)],
        [7.0,em(pr,'pride')],[12.4,()=>{CINE.rimPulse(0.9);CINE.punch(-3);}]]},
      shots:[MV(0,[KC.x+1.6,3.0,KC.z+4.6],[KC.x,4.4,KC.z],[KC.x+1.2,3.4,KC.z+3.8],[KC.x,5.2,KC.z],2.8,{ease:'outCubic',fov:44,fov2:40,move:'none'}),
        SH(2.8,[NG.x+0.9,0.35,NG.z+1.1],[NG.x,0.25,NG.z],{lf:()=>ndl.g.getWorldPosition(new V3()).lerp(NG,0.5),lk:8,fov:44,move:'push',amp:0.5}),
        MV(4.0,[1.4,1.4,-14.8],[0.1,1.6,-10.4],[1.0,1.5,-14.0],[0.1,1.6,-10.2],5.0,{ease:'inOutSine',fov:44,move:'none'}),
        SH(9.0,F4.p,F4.l,{fov:40,move:'push',amp:1.3}),
        MV(12.0,[15,6.5,-9],[AF.x,AF.y,AF.z],[13,5.5,-11.5],[AF.x,AF.y+0.1,AF.z],2.2,{tr:'whip',ease:'outCubic',fov:42,move:'none'})],
      says:[[0.6,2.2,'koschei','Бессмертного не одолеть вовек —<br>Ни зверь, ни меч, ни человек!'],[4.2,4.8,'zven','Не победить — так расковать!<br>Из той иглы застёжку, Прошка, нам ковать!'],[9.2,2.8,'proshka','Несите мне иглу — к наковальне я бегом!<br>Скую застёжку — ахнете потом!']],
      events:[{t:0.2,fn:()=>KA.pose('cast',{antic:0.3,snap:true})},
        {t:0.5,fn:()=>{k5s('ult');k5s('whooshBig');shakeAll(0.05,0.8);kFly(KC.clone().add(new V3(0,1.2,0)),1.4,'outCubic');for(let i=0;i<3;i++)later(i*0.35,()=>{const c=KS.g.position.clone().add(new V3(0,2.4,0));k5Ring(c,0x9a50ff,0.6,5,0.7,0.1,new THREE.Euler(Math.PI/2,0,0));k5Flash(c,0x8a40ff,4,0.35);});}},
        {t:2.9,fn:()=>{const w=ndl.g.getWorldPosition(new V3());W.group.add(ndl.g);ndl.g.position.copy(w);ndl.g.scale.setScalar(1);const g0=new V3(w.x+0.4,0.15,w.z+1.2);if(SFX.dzin)SFX.dzin();
          anim(0.7,k=>{ndl.g.position.lerpVectors(w,g0,k*k);ndl.g.rotation.z+=0.35;});later(0.72,()=>{k5s('tink');k5Flash(g0.clone().add(new V3(0,0.3,0)),0xffffff,1.6,0.3);FX.sparks(g0.clone(),8,0xfff0c0);});}},
        {t:3.9,fn:()=>{zvenTo(ZP,0.8);k5s('zven');}},
        {t:5.0,fn:()=>{const w=ndl.g.position.clone(),tg=()=>headOf(active(1)).add(new V3(0,0.4,0));if(SFX.dzin)SFX.dzin();anim(1.1,k=>{ndl.g.position.lerpVectors(w,tg(),CE.inOutSine(k));ndl.g.position.y+=Math.sin(k*Math.PI)*2;ndl.g.rotation.z+=0.3;});
          k5Trail(()=>ndl.g.parent?ndl.g.position.clone():null,0xffe08a,{size:0.35,life:0.3,every:0.03,max:24});}},
        {t:6.4,fn:em(pr,'surprise')},{t:9.6,fn:()=>{pr.face=Math.atan2(AF.x-pr.pos.x,AF.z-pr.pos.z);ACT.emote(pr,'effort');}},{t:12.4,fn:()=>{k5s('magic');k5Flash(AF.clone().add(new V3(0,0.4,0)),0xffe08a,2.8,0.5);FX.sparkle(AF.clone().add(new V3(0,0.6,0)),12,0xffe08a);}}],
      end:()=>{W.anims.length=0;KA.reset();Z.mode='lead';liftScene();}});}
  function liftScene(){F.stage='lift';const pr=T.proshka;k5force(0,'proshka');placeOnGround(pr,2.2,-14.4,0);KS.g.position.set(C.x,3.2,C.z-6);KS.g.rotation.y=0;
    const AF=anvil.position.clone(),PRs=new V3(5.2,0,-17.2),F3=k5Face(new V3(PRs.x,1.05,PRs.z),0.3,-0.3,1.9,-0.1);
    play({dur:10.2,fov:44,camK:2.4,k5:{mood:[WARM,0.12],cues:[[0.2,()=>FX.speed(0.5)],[4.85,()=>{CINE.hitstop(2);CINE.trauma(0.25);CINE.punch(-3);}],[5.6,()=>CINE.rimPulse(0.8)],[7.4,em(pr,'joy')]]},
      shots:[SH(0,[5.0,1.3,-15.1],[2.2,1,-14.4],{pf:()=>pr.pos.clone().add(new V3(2.8,1.2,-0.7)),lf:()=>hH(pr),lk:7,fov:46,move:'none'}),
        MV(1.6,[9.5,2.6,-14.5],[AF.x,1.4,AF.z],[8.4,4.4,-16.6],[ANV.x,1.6,ANV.z],3.4,{lf:()=>anvil.position.clone().add(new V3(0,0.6,0)),lk:6,ease:'inOutSine',fov:48,move:'none'}),
        SH(5.0,F3.p,F3.l,{fov:40,move:'push',amp:1.2}),
        MV(8.8,[8,2.4,-14],[ANV.x,1.2,ANV.z],[10,5.4,-12],[ANV.x,1.2,ANV.z],1.4,{ease:'inOutSine',fov:48,move:'none'})],
      says:[[0.3,4.6,null,'<i>Прошка к наковальне бежит — и изобретение его впервые не подвело:</i><br><i>Подъёмник из клещей да цепи наковальню к самым корням подняло.</i>',true],[5.2,3.8,'proshka','Я ж говорил: заработает! А кто не верил — вот:<br>Изобретенье Прошкино и тянет, и несёт!']],
      events:[{t:0,fn:()=>hWalk(pr,PRs.x,PRs.z,1.3,Math.PI*0.8)},{t:1.2,fn:()=>ACT.emote(pr,'effort')},
        {t:1.8,fn:()=>{const f=anvil.position.clone(),to=new V3(ANV.x,0.9,ANV.z);anim(3,k=>{anvil.position.lerpVectors(f,to,CE.inOutSine(k));anvil.position.y+=Math.sin(k*Math.PI)*1.2;anvil.rotation.z=Math.sin(k*Math.PI*2)*0.06;});SFX.latch();
          later(0.6,()=>{k5s('chain');FX.sparks(anvil.position.clone().add(new V3(0,1,0)),10);});later(1.6,()=>{k5s('chain');FX.sparks(anvil.position.clone().add(new V3(0,1,0)),10);});}},
        {t:4.8,fn:()=>{anvil.rotation.z=0;const p=new V3(ANV.x,0.05,ANV.z);FX.dust(p,14,0x9a8a6a,1.2);k5Ring(p,0xffe0a0,0.4,2.6,0.5,0.14);k5s('land');k5s('anvil');}},
        {t:5.0,fn:()=>{pr.face=0.3;}},{t:5.3,fn:()=>{ACT.emote(pr,'pride');FX.sparkle(hH(pr),8,0xffd23a);}}],
      end:()=>{W.anims.length=0;anvil.position.set(ANV.x,0.9,ANV.z);anvil.rotation.z=0;anvilCyl.x=ANV.x;anvilCyl.z=ANV.z;anvilCyl.maxy=2;FIN.k5e.flow('lift');}});}
  function finale(){F.stage='needle';liveBoss(false);const pr=T.proshka,pe=T.pelageya;k5force(0,'proshka');placeOnGround(pr,ANV.x,ANV.z+1.8,0);pr.face=Math.PI;
    const KS0=new V3(ANV.x-2.4,0,ANV.z+0.4);KS.g.position.copy(KS0);KS.g.rotation.y=Math.PI*0.4;k5StormSet(0.35);sword.visible=true;
    const PEs=new V3(ANV.x+1.4,0,ANV.z+3.6),peF=Math.atan2(KS0.x-PEs.x,KS0.z-PEs.z);placeOnGround(pe,PEs.x,PEs.z,0);pe.face=peF;
    HEROES.forEach(h=>{if(h!==pr&&h!==pe){placeOnGround(h,PEs.x+(h.kind==='potap'?1.6:-1.0),PEs.z+1.2,0);h.face=peF;}});
    const KS1=new V3(ANV.x-1.2,0,ANV.z+1.0),kf1=Math.atan2(pr.pos.x-KS1.x,pr.pos.z-KS1.z),F1=k5Face(new V3(KS0.x,3.05,KS0.z),Math.PI*0.4,-0.3,3.0,-0.2),F2=k5Face(hH(pe),peF,0.35,2.0,0.05),F5=k5Face(hH(pr),Math.PI,0.3,1.8,0);
    const good=G.flags.claspQ||0.7;
    play({dur:22.8,fov:42,camK:2.4,k5:{calm:true,mood:[COLD,0.1],cues:[[3.4,()=>{CINE.mood(WARM,0.14);CINE.rimPulse(0.6);}],[13.0,()=>{CINE.hitstop(2);CINE.punch(-2);}],[14.4,()=>{CINE.hitstop(2);CINE.punch(-2);}],[15.4,()=>{CINE.hitstop(2);CINE.punch(-3);}],
        [16.6,()=>{CINE.slowmo(0.45,0.6);CINE.rimPulse(1);CINE.mood(GOLD,0.18);FX.confettiCam(30);}],[19.6,()=>CINE.mood(GOLD,0.2)]]},
      shots:[MV(0,F1.p,F1.l,[F1.p[0]-0.25,F1.p[1],F1.p[2]-0.25],F1.l,3.0,{ease:'inOutSine',fov:40,fov2:37,move:'none'}),
        SH(3.0,F2.p,F2.l,{fov:40,move:'push',amp:1.2}),
        MV(7.6,[ANV.x+7.2,3.8,ANV.z+1.8],[ANV.x-0.9,2.5,ANV.z+1.4],[ANV.x+6.4,4.7,ANV.z+2.4],[ANV.x-0.9,2.5,ANV.z+1.4],4.6,{ease:'inOutSine',fov:44,move:'none'}),
        MV(12.2,[ANV.x+7.4,3.0,ANV.z+4.0],[ANV.x-0.8,2.6,ANV.z+1.2],[ANV.x+6.8,2.9,ANV.z+3.6],[ANV.x-0.8,2.6,ANV.z+1.2],4.2,{nofocus:true,ease:'inOutSine',fov:40,move:'none'}),
        SH(16.4,F5.p,F5.l,{fov:40,move:'push',amp:1.3}),
        SH(17.8,[ANV.x-2.0,3.4,ANV.z-1.0],[ANV.x,1.5,ANV.z+0.1],{fov:36,move:'push',amp:1}),
        MV(20.0,[ANV.x+4,2.2,ANV.z+5],[ANV.x-0.6,1.4,ANV.z],[ANV.x+9,7,ANV.z+11],[ANV.x-1,1.6,ANV.z-1],2.8,{ease:'inOutSine',fov:46,move:'none'})],
      says:[[0.6,2.2,'koschei','…Что ж вы не бьёте? Ведь я — злодей…'],[3.2,4.4,'pelageya','А в нашей сказке не бьют — в ней можно по-другому:<br>Не бить, а руку дать — и проводить до дому.'],
        [7.8,4.4,null,'<i>Кощей на молот в лапах Прошки глядит, глядит —</i><br><i>И вдруг подходит: руку на застёжке поправить спешит.</i>',true],[12.4,4.0,'koschei','Держи ровней. Вот так. Не торопись —<br>Я тоже так ковал, когда был мал… Учись.'],
        [17.9,3.6,null,good>=0.8?'<i>Тонок узор на застёжке — будто Кузьма ковал!</i>':'<i>Застёжка скована — сам Прошка её сковал!</i>',true]],
      events:[{t:0,fn:()=>KA.pose('kneel',{k:60,c:11})},
        {t:0.4,fn:()=>{const w=sword.getWorldPosition(new V3());W.group.add(sword);sword.position.copy(w);const g0=new V3(w.x+0.8,0.12,w.z+0.4);anim(0.5,k=>{sword.position.lerpVectors(w,g0,k*k);sword.rotation.z=k*1.45;});later(0.52,()=>{SFX.clink();FX.dust(g0.clone(),8,0x9a8a6a,0.8);});}},
        {t:5.6,fn:()=>HEROES.forEach((h,i)=>{if(h!==pr&&h!==pe)ACT.emote(h,'nod',i*0.12);})},
        {t:7.6,fn:()=>{KA.pose('idle',{k:70,c:12});later(0.4,()=>kWalk(KS1.x,KS1.z,2.2,kf1));}},{t:10.4,fn:pose('help',{antic:0.15})},
        {t:13.0,fn:()=>{pr.atkT=0.3;k5s('forge');k5s('anvil');FX.sparks(ANV.clone().add(new V3(0,1.3,0)),16,0xffe080);}},{t:14.4,fn:()=>{pr.atkT=0.3;k5s('forge');k5s('anvil');FX.sparks(ANV.clone().add(new V3(0,1.3,0)),16,0xffe080);}},
        {t:15.4,fn:()=>{pr.atkT=0.3;k5s('forge');k5s('anvil');FX.sparks(ANV.clone().add(new V3(0,1.3,0)),22,0xffe080);k5Flash(ANV.clone().add(new V3(0,1.4,0)),0xffe08a,2.4,0.4);}},
        {t:16.5,fn:()=>{G.flags.names.proshka=true;k5s('name');banner('Имя вернулось: Прошка','#ff9a66',2.4);nameBurst(pr,0xff9a66);ACT.emote(pr,'joy');}},
        {t:17.6,fn:()=>{k5s('magic');ndl.g.position.set(ANV.x,1.3,ANV.z);ndl.g.rotation.set(0,0,Math.PI/2);k5Flash(ANV.clone().add(new V3(0,1.4,0)),0xffd060,2,0.6);FX.sparkle(ANV.clone().add(new V3(0,1.5,0)),10,0xffe08a);}},
        {t:19.6,fn:()=>k5StormSet(0)}],
      tick:(t)=>{if(t>17.6)ndl.g.rotation.y=Math.sin(t*2)*0.15;},
      end:()=>{W.anims.length=0;KA.reset();KS.armR.rotation.x=0;KS.hand.add(sword);sword.position.set(0,-0.05,0.05);sword.rotation.set(-0.35,0,0);sword.visible=false;KS.g.position.copy(KP);KS.g.rotation.set(0,0,0);k5StormSet(0);skaz3();}});}
