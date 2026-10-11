/* ============================== РЕЛИЗ · ЛЕЙТМОТИВ КОЩЕЯ: ТЕРЕМ (5-Б1), «МОЁ» (5-4), ЗЕРКАЛЬЦЕ (5-2, 5-3), ФИНАЛ (5-Б2), ЭПИЛОГ ============================== */
// Один мотив на всю историю Кощея: шесть нот во фригийском ладу, с полутоном вниз в начале — «одиночество». Звучит:
//   5-Б1 — своя тема терема (вместо общей темы боссов): бурдон, колокол ведёт мотив, низкая балалайка, рамочный барабан;
//   5-4 — в ролике «Моё» колокол на «Моё. Моё.»; 5-2 и 5-3 — тихо, гуслями, в начале видения в зеркальце;
//   5-Б2 — колокол и жалейка в начале вступления к бою; эпилог — тот же мотив в мажоре, на гуслях (Кощей сел в круг).
// FIN.motifK(mode): 'minor' — колокол + жалейка, 'soft' — тихие гусли, 'major' — гусли в мажоре. Музыка не запущена — молчит.
const K5MOTIF=[[0,1.5],[1,0.5],[3,1],[2,1],[1,1],[0,3]];
FIN.music.TR.k5terem={bpm:84,root:45,sc:'phr',len:16,v:[
  {i:'drone',drone:[0],oct:-12,vol:0.05},
  {i:'bell',oct:12,vol:0.045,every:2,seq:[K5MOTIF.concat([[null,8]])]},
  {i:'pluck',oct:-12,vol:0.05,seq:[[[0,1],[null,1],[0,.5],[1,.5],[0,1],[4,1],[null,1],[3,1],[1,1]]]},
  {i:'flute',oct:0,vol:0.03,every:4,seq:[[[null,8],[4,2],[3,1],[1,1],[0,4]]]},
  {i:'frame',drum:'x...........x...',vol:0.035}]};
FIN.motifK=mode=>{try{const M=FIN.music;if(!M||!M.inst||!AC||AC.state!=='running')return false;const I=M.inst,T=mode==='major'?{root:60,sc:'ion'}:{root:57,sc:'phr'};
    let t=AC.currentTime+0.05;const spb=60/(mode==='major'?76:70);
    for(const [d,b] of K5MOTIF){const f=M.hz(M.midi(T,d,0));if(mode==='minor'){I.bell(f,t,b*spb,0.09);I.flute(f/2,t,b*spb*0.95,0.05);}else I.harp(f,t,b*spb,mode==='major'?0.08:0.05);t+=b*spb;}return true;}catch(e){return false;}};
{const _b=build5B1;build5B1=function(){_b();FIN.music.play('k5terem');const _ol=W.onLeave;W.onLeave=()=>{FIN.music.play(null);if(_ol)_ol();};};}
{const _mv=mirrorVision;mirrorVision=function(o,cb){later(0.4,()=>FIN.motifK('soft'));return _mv(o,cb);};}
{const _pl=play;play=function(def){if(W&&W.levelId==='5-4'&&def&&def.dur===25)later(9.3,()=>FIN.motifK('minor'));return _pl.apply(this,arguments);};}
{const _b=build5B2;build5B2=function(){_b();const E=FIN.k5e;if(!E)return;
  if(E.cine&&E.cine.intro){const _in=E.cine.intro;E.cine.intro=function(){later(0.6,()=>FIN.motifK('minor'));return _in.apply(this,arguments);};}
  // 5-Б1: Пелагея успела вырвать последнюю страницу — Кощей вспоминает о ней в начале боя
  if(E.go){const _go=E.go;E.go=function(n){const r=_go.apply(this,arguments);if(n===1&&G.flags.b1page&&!W.flags.b1said){W.flags.b1said=true;
      later(3,()=>say('koschei','<i>(листает)</i> Последней страницы нет… Ты спрятала, птица?',3.4));later(6.8,()=>bark(HERO.pelageya,'pelageya','Тут написано… не скажу.',2.2));}return r;};}};}
{const _b=buildEpi;buildEpi=function(){_b();later(1.5,()=>FIN.motifK('major'));};}
