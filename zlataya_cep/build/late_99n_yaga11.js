/* ============================== РЕЛИЗ final06 · 1-1 «ИЗБУШКА, ПОВЕРНИСЬ»: РОЛИК «ЯГА СТАВИТ ЗАДАЧУ» — НОВАЯ ПОСТАНОВКА ============================== */
// Было: камера с восьми метров смотрела на высоту 3,4–3,9 м — Яга говорила «клубок подарю», а в кадре была крыша избы; потом общий план
// сверху. Стало — понятная детская режиссура, план за планом:
//   1) из-за спин героев — наезд на дверь: тёплый свет, дверь отворяется, в дверях Яга (рассказчик);
//   2) Яга крупно, на уровне глаз: сердится, грозит пальцем — «Кикиморки весь двор мне замусорили!»;
//   3) на «Уберёте — клубок подарю» она указывает во двор — камера с крыльца смотрит на двор: грязные лужи, что-то булькает;
//   4) Прошка крупно, хорохорится — «Да я сам верёвку сплету»;
//   5) Яга крупно: молча глядит поверх очков, бровь вверх — пауза, герои переглядываются (комичный «наезд»);
//   6) лужи вскипают — кикиморки выскакивают; общий план из-за героев — «Кикиморки! Защищайтесь!»
// Ролик зовёт прототип: замена в rep_31_yaga11.py отдаёт сцену сюда (FIN.yaga11), без модуля — прежний ролик.
FIN.yaga11=function(c){const {F,yaga,hut,spawnKiki,arena,puddles}=c;F.stage='yaga';const T=HERO,B=yaga.rig||{};yaga.g.visible=true;hut.inner.visible=true;
  const YP=new V3(0,1.1,-26.4),EYE=2.85,spots=[[-2.6,-19.8],[-0.9,-19.3],[0.9,-19.3],[2.6,-19.8]],P=T.proshka,PI0=HEROES.indexOf(P),PX=spots[PI0<0?0:PI0][0],PZ=spots[PI0<0?0:PI0][1];
  const bone=n=>B[n]||null,rot=(n,x,y,z)=>{const b=bone(n);if(b)b.rotation.set(x,y,z);};
  const arm0={};for(const n of['shoulderR','elbowR','shoulderL','elbowL'])if(bone(n))arm0[n]=bone(n).rotation.clone();
  const armBack=()=>{for(const n in arm0)bone(n).rotation.copy(arm0[n]);};
  const emo=(h,t)=>{try{ACT.emote(h,t);}catch(e){}};
  const bubble=(n)=>{for(const [x,z] of puddles)for(let i=0;i<(n||3);i++)later(i*0.22+Math.random()*0.3,()=>{burst(new V3(x+rand(-0.5,0.5),0.15,z+rand(-0.5,0.5)),[0x6a8a3a,0x8aa850,0x4a6a2a][i%3],3,1.6,0.5);});};
  let wag=0,peer=0,point=0;
  play({dur:19.2,fov:46,
    shots:[shot(0,[1.5,1.5,-15.2],[0,2.4,-26.4],[0.7,2.0,-18.4],[0,2.6,-26.4],3.6),          // 1. из-за спин — наезд на дверь
      shot(3.6,[0.6,2.75,-22.4],[0,EYE-0.05,-26.4],[0.3,2.8,-23.1],[0,EYE,-26.4],2.8),          // 2. Яга крупно, на уровне глаз
      shot(6.4,[0.4,4.3,-24.4],[0,0.2,-18],[0,4.6,-23.8],[0,0.2,-17],2.6),                        // 3. с крыльца — двор: лужи
      shot(9.0,[PX+1.5,1.25,PZ-2.3],[PX,1.05,PZ],[PX+1.2,1.2,PZ-1.9],[PX,1.1,PZ],3.8),   // 4. Прошка
      shot(12.8,[0.25,EYE-0.45,-23.3],[0,EYE-0.05,-26.4],[0.15,EYE-0.4,-23.7],[0,EYE-0.05,-26.4],2.2),      // 5. Яга поверх очков — чуть снизу
      shot(15.0,[0,5.0,-10.4],[0,0.2,-23],[0,6.4,-9.0],[0,0.2,-24],4.2)],                         // 6. общий сверху: все лужи, кикиморки
    says:[[0.3,3.4,null,'<i>Из избушки Яга в очках глядит —</i><br><i>Сердитая-пресердитая. За ней — рамок пустых ряд висит.</i>',true],
      [3.8,5.0,'yaga','Кикиморки весь двор мне замусорили!<br>Уберёте — клубок подарю, чтоб вы не спорили.'],
      [9.1,3.6,'proshka','Клубок ниток? Да я сам верёвку сплету — и не такое могу!'],[13.0,1.8,'yaga','…'],[15.6,3.4,'zven','Кикиморки! Защищайтесь, не зевайте!']],
    events:[{t:0,fn:()=>{HEROES.forEach((h,i)=>{placeOnGround(h,spots[i][0],spots[i][1],0);h.face=Math.PI;h.vel.set(0,0,0);});yaga.g.position.copy(YP);yaga.g.rotation.y=0;
        anim(1.2,k=>{hut.doorMat.emissiveIntensity=k*0.7;});SFX.gate?SFX.gate():null;}},
      {t:0.9,fn:()=>{emo(T.yosha,'hop');emo(T.pelageya,'tilt');}},
      {t:4.0,fn:()=>{wag=1;}},{t:6.2,fn:()=>{wag=0;point=1;}},{t:6.5,fn:()=>bubble(3)},{t:7.6,fn:()=>bubble(2)},{t:8.4,fn:()=>{SFX.splash();}},
      {t:8.9,fn:()=>{point=0;armBack();}},{t:9.4,fn:()=>emo(P,'pride')},{t:11.4,fn:()=>{emo(T.potap,'tilt');}},
      {t:12.9,fn:()=>{peer=1;try{CINE.dollyZoom(0.18,1.0,0.8);}catch(e){}}},{t:14.0,fn:()=>{try{ACT.emoteAll('tilt',null,0.08);}catch(e){}}},{t:14.6,fn:()=>{peer=0;}},
      {t:15.0,fn:()=>{bubble(4);SFX.splash();}},{t:15.2,fn:spawnKiki},{t:15.5,fn:()=>{try{ACT.emoteAll('surprise',null,0.06);}catch(e){}}}],
    tick:(t)=>{yaga.body&&(yaga.body.position.y=Math.sin(G.time*2)*0.02);
      // грозит пальцем; указывает во двор; глядит поверх очков
      if(wag&&bone('shoulderR')){bone('shoulderR').rotation.x=-1.25;bone('shoulderR').rotation.z=-0.2;if(bone('elbowR'))bone('elbowR').rotation.x=-1.0+Math.sin(t*14)*0.25;}
      if(point&&bone('shoulderR')){bone('shoulderR').rotation.x=-1.45;bone('shoulderR').rotation.z=-0.55;if(bone('elbowR'))bone('elbowR').rotation.x=-0.1;}
      if(yaga.head)yaga.head.rotation.x=peer?0.24:Math.sin(t*1.7)*0.04;   // наклонила голову — глядит поверх очков
      for(const n of['browL','browR']){const b=bone(n);if(b)b.position.y=(b.userData.y0!=null?b.userData.y0:(b.userData.y0=b.position.y))+(peer&&n==='browL'?0.035:0);}
      for(const h of HEROES)if(t<15)h.vel.set(0,0,0);},
    end:()=>{armBack();if(yaga.head)yaga.head.rotation.x=0;if(!arena.started)spawnKiki();F.stage='fight';}});};
