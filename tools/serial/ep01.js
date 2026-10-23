// ============================== МУЛЬТСЕРИАЛ · СЕРИЯ 1 «ЗВЕНЫШКО» ==============================
// Сценарий — zlataya_cep/docs/46_multserial.md (раздел 5). Монтаж: куски роликов «Присказки» (сцены 3–6) и «Колыбельной» пролога
// с вертикальными планами, свои сцены — титр, финал на сосне, Кощей, карточка конца. Время в сегменте — время ролика игры (from…to).
// Реплики — записи игры (FIN.vox по тексту).
{const PR=()=>PRK.P,LL=()=>PRK.L,OP=PRO.P,OL=PRO.L;
const sayK=(t,dur,who,text,vo)=>[t,dur,who,text,!!vo];
const CARD_T='<div class="lg">ЗЛАТАЯ<br>ЦЕПЬ</div><div class="ln"></div><div class="ep">Серия 1</div><div class="nm">Звенышко</div>';
const CARD_END='<div class="sm" style="font-size:30px;letter-spacing:.2em;text-transform:uppercase;color:#e8c060">Продолжение следует</div>'+
  '<div class="ep" style="margin-top:34px">Серия 2</div><div class="nm" style="font-size:54px">Кот, проснись!</div><div class="ln"></div>'+
  '<div class="lg" style="font-size:60px;margin-top:40px">ЗЛАТАЯ ЦЕПЬ</div><div class="sm">сказочная игра для двоих<br>Прошка, Потап, Пелагея и Йоша ждут тебя</div>'+
  '<div class="cta">Играй — ссылка в группе</div>';
SER.eps[1]={title:'Звенышко',segs:[
  // ---- 1. Колыбельная за рекой: Кот сказывает, Кощей слышит
  {id:'a1_proigral',from:2.4,to:6.2,setup:()=>{SER.prkScene(3);}},
  {id:'a2_kolyb',from:8.0,to:19.8,setup:()=>{SER.prkScene(3);}},
  // ---- туча, Колобок, «Кто там?!», рука, разрыв
  {id:'a3_dovolno',from:0,to:4.8,setup:()=>{SER.prkScene(4,{fresh:true,reshot:{0:KS(0,prLA(-4.3,7.9,-64.6),prLA(-6,10.4,-70.5),{p2:prLA(-4.1,8.3,-63.2),l2:prLA(-6,13.2,-76),dur:2.8,move:'none'})}});}},
  {id:'a4_kolobok',from:4.8,to:7.0,setup:()=>{SER.prkScene(4);}},
  {id:'a5_razryv',from:9.0,to:22.6,setup:()=>{SER.prkScene(4);}},
  // ---- 2. Пять сторон и каменный Кот
  {id:'b1_miry',from:0,to:9.2,setup:()=>{SER.prkScene(5);}},
  {id:'b2_kamen',carry:true,from:9.2,to:13.0,setup:()=>{SER.prkScene(5);}},
  // ---- титр
  {id:'t_titr',from:0,to:3.6,setup:()=>{SER.own({dur:6,fov:46,mood:['#8a9ad0',0.12],
      shots:[KS(0,prA(OL,1.6,1.2,5.6),prA(OL,1.3,1.6,3.5),{p2:prA(OL,2.2,6.0,11.0),l2:prA(OL,0.5,7.5,-8),dur:3.6,move:'none'})],
      events:[{t:0,fn:()=>{PRK.only('L');PRK.look('grey');}}],cues:[[0.25,()=>{SER.card(CARD_T);psfx('dzin')();}]]});}},
  // ---- 3. Лесной патруль
  {id:'c_patrul',from:0,to:24.2,setup:()=>{SER.prkScene(2);}},
  // ---- 4. Искра: Пелагея одна видит, что летит к ним
  {id:'d_iskra',from:13.0,to:18.4,setup:()=>{SER.prkScene(5,{reshot:{13.0:KS(13.0,prPA(-1.0,11.9,6.55),prPA(12,12.3,5.9),{trk:KC.look(()=>prkWP(PR().zv),0.1),move:'push',amp:0.25})}});}},
  // ---- 5. Колыбельная в комнате штаба
  {id:'e1_zabyl',from:0,to:8.0,setup:()=>SER.lullaby({reshot:{1.2:KS(1.2,[-3.65,1.5,-2.75],[-4.59,1.02,-4.28],{p2:[-3.95,1.38,-3.25],l2:[-4.59,1.0,-4.28],dur:6.6,move:'none'})}})},
  {id:'e2_samokat',from:11.4,to:22.9,setup:()=>SER.lullaby({})},
  {id:'e3_pogonya',from:23.0,to:33.6,setup:()=>SER.lullaby({reshot:{26.8:KS(26.8,[0.7,1.9,1.9],[3.0,1.0,-2.4],{move:'push',amp:0.25})}})},
  {id:'e4_zven',from:36.8,to:40.6,setup:()=>SER.lullaby({})},
  // ---- 6. Присказка: финал на сосне, Кощей, карточка
  {id:'f_final',from:0,to:11.0,setup:()=>{SER.prkEnv();SER.own(SER.ep1Final());}},
  {id:'g_koschei',from:17.4,to:20.4,setup:()=>{SER.prkScene(3,{says:[sayK(18.0,1.9,'koschei','Сказок больше не бывать.')]});}},
  {id:'h_konec',from:0,to:5.5,setup:()=>{SER.own({dur:8,fov:46,shots:[KS(0,prA(OP,7,-2.5,24),prA(OP,0,7,0),{p2:prA(OP,5,1.5,22),l2:prA(OP,0,9,0),dur:6,move:'none'})],
      events:[{t:0,fn:()=>{PRK.only('P');PRK.look('pnight');FIN.music.play('hub');PR().cloud.visible=true;}}],cues:[[0.2,()=>SER.card(CARD_END)]]});}},
]};
// финал: четверо на настиле, Тишка машет из двери; Звенышко кружит над ними и садится на тетрадку Пелагеи (выбрало её — ту, кого не слышали);
// кран вверх: Звенышко взлетает над лесом, Пелагея летит за ним первой, мальчишки прыгают и машут
SER.ep1Final=function(){const P=PR(),O=OP,T=HERO,pr=T.proshka,po=T.potap,pe=T.pelageya,yo=T.yosha;const Z=W.zven;
  const at=(x,y,z)=>SERV(O.x+x,y,O.z+z);
  const spots={pr:[-2.0,8.6],pe:[-1.1,9.4],yo:[-0.35,9.9],po:[0.5,8.3]};
  const hd=h=>SERV(h.pos.x,h.pos.y+h.d.height*0.75,h.pos.z);
  return {dur:13,fov:46,mood:['#8a9ad0',0.1],
    shots:[KS(0,prA(O,-0.8,1.35,15.0),prA(O,-0.8,1.0,9.0),{move:'push',amp:0.3}),
      KS(4.2,prA(O,-0.8,1.05,12.6),prA(O,-1.1,0.8,9.4),{move:'push',amp:0.25}),
      KS(6.8,prA(O,-0.8,1.8,15.5),prA(O,-1.0,1.4,9.0),{p2:prA(O,3.5,12,30),l2:prA(O,-3,9,-12),dur:4.6,move:'none'})],
    says:[sayK(0.3,1.9,'kot','Кто соберёт звено к звену?',true),sayK(2.3,1.9,'kot','Кто сказку вспомнит — не одну?',true),sayK(7.0,3.6,'kot','Это присказка, не сказка.<br>Сказка — будет впереди!',true)],
    events:[{t:0,fn:()=>{PRK.only('P');PRK.look('pnight');FIN.music.play('hub');prkHeroesOff();
        for(const [h,k] of[[pr,'pr'],[po,'po'],[pe,'pe'],[yo,'yo']]){const s=spots[k];prPl(h,O.x+s[0],O.z+s[1],0,at(s[0],0,s[1]+5));h.g.visible=true;h.glide=false;}
        prkAttach(pe.g,P.book,0,pe.d.height*0.46,0.6).rotation.set(0.75,0,0);P.book.visible=true;P.page.k=null;P.page(0,0);P.ball.visible=false;
        P.g.add(P.tish.g);P.tish.g.visible=true;P.tish.g.position.copy(P.doorPos).sub(O);P.tish.g.position.y=0;P.tish.g.rotation.set(0,0.3,0);
        P.zv.visible=false;P.rv.g.visible=false;P.rain.forEach(r=>{r.s.visible=false;r.t=-1;});P.cloud.visible=false;P.star.material.opacity=0.9;
        if(Z){Z.mode='script';Z.vis=true;Z.g.visible=true;if(Z.g.parent!==W.group)W.group.add(Z.g);}}}],
    cues:[[0.4,()=>psfx('dzin')()],[1.2,KC.emo('yosha','surprise')],[2.6,KC.emo('potap','joy')],[4.65,()=>{psfx('dzin')();FX.sparkle(prkWP(P.book),12,0xffe08a);PSN.trill(0);}],
      [4.8,KC.emo('pelageya','joy')],[5.3,KC.emo('proshka','surprise')],[5.6,KC.emo('yosha','hop')],[5.9,KC.emo('potap','nod')],
      [6.9,()=>{PSN.flaps(0);psfx('whoosh')();}],[7.2,()=>KC.all('cheer',0.08)()],[8.4,KC.emo('yosha','hop')],[9.2,KC.emo('proshka','cheer')]],
    tick:(t,dt)=>{prkHeroesOff();const bk=prkWP(P.book).add(SERV(0,0.0,0.28));if(Z)Z.g.scale.setScalar(t>4.3&&t<6.9?0.72:1);
      // Звенышко: кружит над четвёркой → садится на тетрадку → взлетает над лесом
      if(Z){let p;const orb=u=>at(-0.7+Math.sin(u*2.0)*1.5,1.9+Math.sin(u*3.1)*0.22,9.1+Math.cos(u*2.0)*0.8);
        if(t<4.3)p=orb(t);else if(t<6.8){const k=prkE.io(clamp((t-4.3)/0.5,0,1));p=orb(4.3).lerp(bk,k);p.y+=Math.sin(t*6)*0.03;}
        else{const k=prkE.i(clamp((t-6.8)/4.2,0,1));p=bk.clone().lerp(at(-6,16,-40),k);p.y+=Math.sin(k*Math.PI)*3;}
        Z.pos.copy(p);Z.g.rotation.y=t*3;}
      // герои смотрят на Звенышко
      const zp=Z?Z.pos:bk;for(const h of[pr,po,yo]){h.face=Math.atan2(zp.x-h.pos.x,zp.z-h.pos.z);}
      if(t<6.9){pe.face=t<4.3?Math.atan2(zp.x-pe.pos.x,zp.z-pe.pos.z)*0.6:0;pe.pos.y=0;pe.glide=false;}
      else{// Пелагея взлетает следом — первая
        const k=prkE.io(clamp((t-7.0)/4.0,0,1)),a=at(spots.pe[0],0,spots.pe[1]),b=at(-5,12,-30),q=a.clone().lerp(b,k);q.y+=Math.sin(k*Math.PI)*2.5;
        pe.pos.copy(q);pe.vel.set(0,0,0);pe.glide=k>0&&k<1;pe.face=Math.atan2(b.x-a.x,b.z-a.z);}
      // мальчишки: подпрыгивают и машут вслед
      if(t>7.0){pr._armUp=0.6+0.4*Math.sin(t*11);yo._armUp=0.6+0.4*Math.sin(t*13);po._armUp=0.5+0.3*Math.sin(t*7);
        yo.pos.y=Math.abs(Math.sin((t-7)*7))*0.25;pr.pos.y=Math.abs(Math.sin((t-7.2)*6))*0.18;}
      if(P.tish&&P.tish.g)P.tish.g.rotation.z=Math.sin(t*5)*0.08;},
    end:()=>{for(const h of[pr,po,yo,pe]){h._armUp=0;h.glide=false;h.pos.y=0;}}};};
}
