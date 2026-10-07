/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: МУЗЫКА ПО ЭТАПАМ И РОЛИКИ — ВХОД, ПЕРЕХОД, ВЫХОД НА ХОРОВОД, ФИНАЛ ============================== */
// docs/29_leshy_proposals.md, шаг 6. Музыка — своя тема на каждый этап (на этапе 3 — вальс-шарманка, на втором круге быстрее; в финале — колыбельная); темы добавлены в FIN.music.TR, как у 2-Б.
// Ролики уровня — те же `play({…})`, что в прототипе, обёрнутые FIN.k1b.cine.*: добавляются кадры, события, эмоции Лешего; озвученные строки и порядок событий — прежние (rep_30_leshy1b.py).
//   вход: великан с закрытыми глазами, мох осыпается, встаёт и открывает зелёные глаза → «Опять заблудились?…»; переход: Леший хохочет, дым там, где встанут двойники; выход на хоровод: пень растёт,
//   Леший встаёт на него, фонарики вспыхивают, руки-ветви вверх — «А ну-ка, закружу, заверчу!»; финал: листопад, лешачата хлопают, Леший с одним цветущим рогом, без бороды и гнезда, садится на пень.
// FIN.k1b: music(имя) · cine.intro / mid / s3intro / end · finale(scale).
K1B.musName=null;
const k1cMus=()=>{try{const TR=FIN.music.TR;if(!TR||TR.k1b1)return;
  // 1 — руки: тяжёлая, шаг 96; скрип басов и редкая флейта
  TR.k1b1={bpm:96,root:40,sc:'aeo',len:16,v:[{i:'drone',drone:[0],oct:-12,vol:0.045},
    {i:'pluck',oct:-12,vol:0.06,seq:[[[0,2],[null,1],[0,1],[3,2],[null,1],[2,1],[0,2],[null,1],[5,1],[4,2],[null,1],[3,1]]]},
    {i:'flute',oct:12,vol:0.04,every:2,seq:[[[null,4],[4,2],[3,1],[2,1],[0,4],[null,4]]]},
    {i:'frame',drum:'x.......x.......',vol:0.05},{i:'kick',drum:'x.......x.......',vol:0.08}]};
  // 2 — «ищу-свищу»: пиццикато, шаг 112
  TR.k1b2={bpm:112,root:43,sc:'dor',len:16,v:[
    {i:'pluck',oct:12,vol:0.05,seq:[[[0,.5],[2,.5],[4,.5],[2,.5],[0,.5],[null,.5],[4,.5],[5,.5],[4,.5],[2,.5],[0,.5],[null,.5],[-1,.5],[0,.5],[2,1]],
      [[4,.5],[5,.5],[7,.5],[5,.5],[4,.5],[null,.5],[2,.5],[0,.5],[2,.5],[4,.5],[2,.5],[null,.5],[0,.5],[-1,.5],[0,1]]]},
    {i:'pluck',oct:-12,vol:0.055,seq:[[[0,1],[null,1],[4,1],[null,1],[0,1],[null,1],[5,1],[null,1]]]},
    {i:'tamb',drum:'x.x.x.x.x.x.x.x.',vol:0.02},{i:'frame',drum:'....x.......x...',vol:0.04}]};
  // 3 — хоровод: вальс-шарманка 3/4 (круг 2 — быстрее и с арфой)
  const waltz={bpm:126,root:48,sc:'ion',len:12,v:[
    {i:'pluck',oct:-12,vol:0.06,seq:[[[0,1],[null,2],[0,1],[null,2],[3,1],[null,2],[4,1],[null,2]]]},
    {i:'pluck',oct:0,vol:0.032,seq:[[[null,1],[2,1],[4,1],[null,1],[2,1],[4,1],[null,1],[5,1],[7,1],[null,1],[6,1],[8,1]]]},
    {i:'flute',oct:12,vol:0.05,seq:[[[2,1],[4,1],[7,1],[6,1.5],[5,.5],[4,1],[3,1],[5,1],[7,1],[6,2],[4,1]],[[4,1],[5,1],[6,1],[7,2],[null,1],[9,1],[7,1],[5,1],[4,1],[2,1],[0,1]]]},
    {i:'kick',drum:'x...........',vol:0.07},{i:'tamb',drum:'....x...x...',vol:0.03}]};
  TR.k1b3=waltz;
  TR.k1b3b=Object.assign({},waltz,{bpm:150,v:waltz.v.concat([{i:'harp',arp:[0,0,3,4],per:3,pat:[0,2,4,7],st:0.75,oct:12,vol:0.035},{i:'tamb',drum:'x...x...x...',vol:0.025}])});
  // финал — колыбельная (по мотиву эпилога, ниже и медленнее)
  TR.k1b4=Object.assign({},TR.epi,{bpm:62,root:57});}catch(e){console.error('k1b music',e);}};
K1B.music=function(n){k1cMus();K1B.musName=n;try{FIN.music.play(n);}catch(e){}};
{const _ll=loadLevel;loadLevel=function(i){if(K1B.musName!==null){K1B.musName=null;try{FIN.music.play(null);}catch(e){}}_ll(i);};}   // другой уровень — снова музыка по умолчанию
const k1cSm=k=>k*k*(3-2*k);
K1B.cine={
  // вход: великан проснулся
  intro(d){const c=K1B.cur,L=c&&c.L;if(!L)return d;
    d.shots=d.shots.concat([shot(6.2,[0.7,8.6,-18.8],[0,7.9,-24.2],[-0.5,8.2,-20.6],[0,7.8,-24.2],2.7)]);
    d.events=(d.events||[]).concat([{t:0,fn:()=>{K1B.emo(L,'sleep',0);L.g.scale.setScalar(1.75);try{FIN.music.play('');}catch(e){}}},
      {t:0.6,fn:()=>{K1B.fx.leaves(new V3(0,10,-24.5),16,{spd:1.2,up:0.3,size:1.2,cols:[0x9acb48,0x6aa338,0x8c6644]});}},
      {t:1.8,fn:()=>{try{for(let i=0;i<5;i++)tone(rand(70,110),0.5,'sawtooth',0.08,rand(50,70),i*0.18);}catch(e){}shakeAll(0.03,0.8);}},
      {t:3.7,fn:()=>{K1B.emo(L,'sly',0);K1B.music('k1b1');K1B.fx.leaves(new V3(0,9,-24.5),30,{spd:2,up:1.2});try{tone(180,0.3,'triangle',0.1,360);}catch(e){}}}]);
    const tk=d.tick;d.tick=t=>{if(tk)tk(t);L.g.scale.setScalar(1.75+0.45*k1cSm(Math.min(1,t/3.8)));};
    const oe=d.end;d.end=()=>{L.g.scale.setScalar(2.2);K1B.emo(L,'sly',0);if(oe)oe();K1B.music('k1b1');};return d;},
  // из этапа 1 в этап 2: «четыре Лешего» — хохот и дым там, где встанут двойники
  mid(d){const c=K1B.cur,L=c&&c.L;if(!L)return d;const C=c.C;
    d.shots=[shot(0,[0,5,-6],[0,7,-24.5],[0,6.2,-9],[0,7.4,-24.5],3),shot(3,[0,12,-5],[0,0.5,-14],[0,14.5,-7],[0,0.5,-14],3)];
    d.events=(d.events||[]).concat([{t:0.3,fn:()=>{K1B.emo(L,'laugh',2.6);}},
      {t:3,fn:()=>{K1B.music('k1b2');}},
      {t:3.4,fn:()=>{for(let i=0;i<4;i++){const a=i/4*Math.PI*2+0.4;K1B.fx.puff(C.x+Math.cos(a)*7,1.2,C.z+Math.sin(a)*7,4);}}},
      {t:4.1,fn:()=>{for(let i=0;i<4;i++){const a=i/4*Math.PI*2+0.4+Math.PI/4;K1B.fx.puff(C.x+Math.cos(a)*5,1.2,C.z+Math.sin(a)*5,4);}}}]);
    return d;},
  // выход на хоровод: пень растёт, Леший встаёт на него, фонарики, руки-ветви вверх
  s3intro(go){const c=K1B.cur,C=c.C,L=c.L,S=K1B.s3;L.g.position.y=-3.4;L.rig.shL.rotation.z=0.3;L.rig.shR.rotation.z=-0.3;if(S.stump)S.stump.scale.setScalar(0.01);
    play({dur:6.6,fov:50,shots:[shot(0,[0,6,9],[0,4.2,-14],[0,5.2,4],[0,4.6,-14],3.8),shot(3.8,[-11,5,3],[0,6,-14],[8,5.6,2],[0,6.2,-14],2.8)],
      says:[[0.5,2.4,'leshy','А ну-ка, закружу, заверчу!']],
      events:[{t:0.1,fn:()=>{anim(1.8,k=>{const s=k1cSm(k);L.g.position.y=-3.4+3.9*s;if(S.stump)S.stump.scale.setScalar(0.01+0.99*s);});shakeAll(0.04,1.4);try{tone(90,0.9,'sawtooth',0.1,160);}catch(e){}}},
        {t:1.9,fn:()=>{for(let i=0;i<14;i++)later(i*0.1,()=>K1B.fx.lamp(i,true));K1B.fx.leaves(new V3(C.x,8,C.z),50,{spd:2.2,up:1.4});K1B.emo(L,'laugh',0);}},
        {t:2.6,fn:()=>{anim(0.8,k=>{L.rig.shL.rotation.z=lerp(0.3,1.35,k);L.rig.shR.rotation.z=lerp(-0.3,-1.35,k);});}},
        {t:3.2,fn:()=>{K1B.music('k1b3');}},
        {t:5.2,fn:()=>{for(let i=0;i<14;i++)later(i*0.05,()=>K1B.fx.lamp(i,false));}}],   // волна фонариков в ролике — и гаснут: дальше они зажигаются по виткам
      end:()=>{for(let i=0;i<14;i++)K1B.fx.lamp(i,false);L.g.position.y=0.5;if(S.stump)S.stump.scale.setScalar(1);L.rig.shL.rotation.z=1.35;L.rig.shR.rotation.z=-1.35;go();}});},
  // финал: листопад, лешачата хлопают
  end(d){d.events=(d.events||[]).concat([{t:0,fn:()=>{K1B.music('k1b4');}},{t:0.3,fn:()=>{K1B.fx.leaves(new V3(0,8,-16),60,{spd:2.2,up:1.4,size:1.3});K1B.cheer('clap',14);}},
      {t:6,fn:()=>{K1B.fx.leaves(new V3(0,7,-14),40,{spd:2,up:1.2});}}]);
    // Леший на пне крупнее прежнего: кадры шире, чем в прототипе
    d.shots=[shot(0,[0,4.4,-1],[0,3.4,-16],[0,4,-4],[0,3.6,-16],7.4),shot(7.4,[3.8,3,-6],[0,3.8,-16],[1.6,2.8,-8.2],[0,3.8,-16],4.6)].concat(d.shots.slice(2),[shot(14,[0,3.2,-5],[0,3,-16],[0,8,6],[0,4,-14],2)]);return d;}};
// Леший в финальной сцене: рог с цветами один (другой сбит), без гнезда и бороды — чешет мох
K1B.finale=function(scale){const o=K1B.boss(scale),D=o.parts;D.nest.visible=false;D.beard.visible=false;D.hornL.visible=false;D.stubL.visible=true;K1B.bloom(o,true);K1B.emo(o,'sheepish',0);return o;};
