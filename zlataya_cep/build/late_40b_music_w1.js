/* ============================== РЕЛИЗ · МУЗЫКА МИРА 1: СВОЯ ВЕРСИЯ ТЕМЫ НА КАЖДОМ УРОВНЕ И КОРОТКИЕ ВСТАВКИ ============================== */
// Раньше 1-1, 1-2, 1-4 и 1-5 играли одну тему `w1` (весь мотив ≈ 19 с): за уровень у ребёнка она повторялась 30–45 раз. Теперь у каждого
// уровня своя аранжировка того же мотива (ля дорийский — узнаётся мир), а на важных местах — короткие вставки поверх темы.
//   1-1 «Избушка» — двор Яги: балалайка бойче (104), бубен на каждую долю;
//   1-2 «Болото» — бурдон, жалейка медленно (84), редкий низкий щипок, глухой барабан «лягушкой»;
//   1-4 «Леший водит» — лес: тихо (92), колокольчики-светлячки, бурдон, без барабанов;
//   1-5 «Прялка» — остинато по три ноты (прялка крутится), жалейка, барабан по три доли поперёк такта.
// Тема уровня выбирается в pick() (late_40_music.js): есть FIN.music.TR['lv_'+id] — играет она, иначе тема мира.
// Вставки: FIN.music.sting(имя) — короткий мотив поверх темы (тема на время приглушается): 'crows' (вороны Кощея, 1-1), 'fog' (туман
// Кикиморы, 1-2), 'auka' (Аука, 1-4), 'vereten' (Веретенник, 1-5). Вызываются из уровней: смотри обёртки внизу.
{const T=FIN.music&&FIN.music.TR;if(T){
  const MEL=T.w1.v[0].seq,FL=T.w1.v[1].seq;   // мотив мира 1: та же мелодия в каждой версии
  T['lv_1-1']={bpm:104,root:57,sc:'dor',len:16,v:[
    {i:'pluck',oct:0,vol:0.06,seq:MEL},
    {i:'flute',oct:12,vol:0.03,every:2,seq:FL},
    {i:'pluck',oct:-12,vol:0.05,seq:[[[0,.5],[null,.5],[4,.5],[null,.5],[6,.5],[null,.5],[4,.5],[null,.5]]]},
    {i:'frame',drum:'x...x...x...x...',vol:0.035},{i:'tamb',drum:'..x...x...x...x.',vol:0.025}]};
  T['lv_1-2']={bpm:84,root:57,sc:'dor',len:16,v:[
    {i:'drone',drone:[0],oct:-12,vol:0.045},
    {i:'flute',oct:12,vol:0.045,seq:[MEL[0]]},
    {i:'pluck',oct:-12,vol:0.045,seq:[[[0,2],[null,2],[4,2],[null,2]]]},
    {i:'frame',drum:'x.......x...x...',vol:0.025}]};
  T['lv_1-4']={bpm:92,root:57,sc:'dor',len:16,v:[
    {i:'drone',drone:[0],oct:-24,vol:0.035},
    {i:'bell',oct:12,vol:0.04,seq:[MEL[1]]},
    {i:'harp',arp:[0,3,4,0],per:4,pat:[0,4,7,4],st:0.5,oct:0,vol:0.03}]};
  T['lv_1-5']={bpm:100,root:57,sc:'dor',len:16,v:[
    {i:'harp',arp:[0,0,3,4],per:4,pat:[0,2,4],st:0.5,oct:0,vol:0.045},
    {i:'flute',oct:12,vol:0.04,every:2,seq:[MEL[0]]},
    {i:'pluck',oct:-12,vol:0.045,seq:[[[0,1.5],[4,1.5],[0,1],[3,1.5],[4,1.5],[0,1]]]},
    {i:'frame',drum:'x..x..x..x..x..x',vol:0.03}]};}}
// вставки: несколько нот поверх темы; тема на 2,5 с тише (не молчит)
{const SG={
  crows:[[220,0.18,'sawtooth',0.06],[208,0.18,'sawtooth',0.06,0.2],[196,0.42,'sawtooth',0.06,0.4],[147,0.6,'triangle',0.05,0.8]],         // тревожно вниз: «Карр!»
  fog:[[440,0.9,'sine',0.035],[523,0.9,'sine',0.03,0.5],[494,1.4,'sine',0.03,1.0],[330,1.8,'triangle',0.025,1.4]],                        // зыбко, плывёт
  auka:[[392,0.25,'triangle',0.05],[440,0.25,'triangle',0.05,0.28],[523,0.25,'triangle',0.05,0.56],[587,0.5,'triangle',0.05,0.84]],      // четыре голоса дупел
  vereten:[[294,0.12,'square',0.04],[330,0.12,'square',0.04,0.12],[349,0.12,'square',0.04,0.24],[392,0.12,'square',0.04,0.36],[440,0.5,'sawtooth',0.04,0.48]]};   // веретено раскручивается
 FIN.music.sting=function(n){const s=SG[n];if(!s||typeof tone!=='function')return;try{for(const[f,d,w,v,dl]of s)tone(f,d,w,v,f,dl||0);}catch(e){}
   try{const m=FIN.music,v0=FIN.set.mus;if(m.setVol){m.setVol(v0*0.45);clearTimeout(m._stT);m._stT=setTimeout(()=>{m.setVol(FIN.set.mus);},2500);}}catch(e){}};
 // где звучат: прилёт ворон (1-1), туман (1-2), знакомство с Аукой (1-4), Веретенник (1-5) — по баннерам этих мест
 const STB={'Вороны Кощея!':'crows','Аука-Перекличка':'auka','Веретенник!':'vereten'};
 const _bn=banner;banner=function(t){const r=_bn.apply(this,arguments);try{if(W&&/^1-/.test(W.levelId)&&STB[t])FIN.music.sting(STB[t]);}catch(e){}return r;};
 {const _b12=build12;build12=function(){_b12.apply(this,arguments);let told=false;W.updates.push(()=>{if(told)return;if(HEROES.some(h=>h.active&&h.pos.z<-152)){told=true;FIN.music.sting('fog');}});};}}
