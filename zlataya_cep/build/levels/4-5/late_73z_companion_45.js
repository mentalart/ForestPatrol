/* ============================== РЕЛИЗ final06 · 4-5 «КАЛИНОВ МОСТ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из proto/levels/4-5.js (W.SLOTS — восемь досок, W.SEC — шесть участков второй половины, W.HD, флаги chains / half / across). Крюки жёлудями, цепь к вороту, лапа и «держать мост» — человек (Прошка, Потап).
// Бот: стройка — берёт горячую доску клещами (горн у берега), кладёт на край моста, Йоша срастает стык мёртвой водой; переход — Йоша ведёт: стык поливает с края, пролёт перепрыгивает на плиту (доска опускается),
// потом Пелагея идёт по готовому; прогоревший стык срастает снова; бег Потапа — Йоша встаёт у треснувших досок перед ним и срастает их по очереди от дальнего берега.
const K45={w:null,t:{}};
CMP.k45=K45;
const k45=()=>{if(K45.w!==W){K45.w=W;K45.t={};}return K45;};
const k45Tap=(K,k,gap,act)=>{if(!(K.t[k]>G.time-gap)){K.t[k]=G.time;cmpTap(act);return true;}return false;};
const K45_FORGE={x:-3.6,z:-2};
const k45Spd=h=>Math.hypot(h.vel.x,h.vel.z);
const k45Car=h=>{const c=h.carry&&!h.carry.gone?h.carry:null;return c&&c.kind==='doska'?c:null;};
const k45Far=h=>h.pos.z<-52.2&&h.grounded;
CMP.route('4-5',[
  {id:'bridge',first:true,done:()=>['end'].includes(W.flags.stage)||!!W.flags.out,run:(h,hh)=>{const K=k45(),F=W.flags,st=F.stage;if(G.cine)return 'follow';
    const Y=HERO.yosha,P=HERO.pelageya,SEC=W.SEC;
    // ---------- стройка первой половины ----------
    if(st==='build'){
      if(!F.chains)return 'follow';
      const S=W.SLOTS.find(q=>!q.fused);if(!S)return 'follow';
      if(S.placed){                                                                    // доска легла — стык срастить
        if(!cmpWant('yosha'))return;h.following=false;
        const sp={x:0.8,z:S.z0-1.2};if(hd(h.pos,sp)>0.45||k45Spd(h)>1.0){cmpGoto(h,sp.x,sp.z,0.2);return;}
        h.face=Math.PI;if(h.skillCd<=0)k45Tap(K,'water',0.8,'skill');return;}
      h.following=false;const car=k45Car(h);
      if(!car){                                                                       // за доской в горн
        if(hd(h.pos,K45_FORGE)>0.5){cmpGoto(h,K45_FORGE.x,K45_FORGE.z,0.3);return;}
        h.face=-Math.PI/2;k45Tap(K,'take',0.6,'item');return;}
      const sp={x:0,z:S.z0+0.45};
      if(h.pos.z>-7&&Math.abs(h.pos.x)>0.6){cmpGoto(h,0,-6.4,0.3);return;}              // на мост — по оси
      if(hd(h.pos,sp)>0.4||k45Spd(h)>1.0){cmpGoto(h,sp.x,sp.z,0.2);return;}
      h.face=Math.PI;k45Tap(K,'drop',0.6,'item');return;}
    // ---------- переход Игрока 2 и бег Потапа ----------
    if(st!=='hold'&&st!=='run')return 'follow';
    const broken=SEC.filter(S=>!S.span&&!S.ok&&!S.gone);                                 // треснувшие / прогоревшие стыки
    const spot=S=>({x:0.3,z:S.z1-0.5});                                                 // с южного края (бег Потапа)
    if(st==='run'){
      if(!cmpWant('yosha'))return;h.following=false;
      const S=[...broken].sort((a,b)=>a.z0-b.z0)[0];                                     // ближний к дальнему берегу (Йоша идёт от него к Потапу)
      if(!S){const bank={x:0.5,z:-53.2};if(hd(h.pos,bank)>0.5)cmpGoto(h,bank.x,bank.z,0.3);return;}
      const sp=spot(S);if(hd(h.pos,sp)>0.4||k45Spd(h)>1.0){cmpGoto(h,sp.x,sp.z,0.2);return;}
      h.face=0;if(h.skillCd<=0)k45Tap(K,'water',0.8,'skill');return;}
    // hold: Йоша ведёт; Пелагея — по готовому
    const farY=k45Far(Y),farP=k45Far(P);
    const aheadP=broken.filter(S=>S.z1<P.pos.z+0.3);                                    // прогоревшие впереди Пелагеи
    const who=!farY?'yosha':!farP?(aheadP.length?'yosha':'pelageya'):'yosha';
    if(!cmpWant(who))return;h.following=false;
    if(h===Y){
      if(!farY){
        const S=SEC.find(q=>q.z1<Y.pos.z-0.3&&!q.gone);
        if(!S){cmpGoto(h,0.4,-53.2,0.3);return;}
        if(!S.span){
          if(!S.ok){const sp={x:0.3,z:S.z0+0.6};if(Y.pos.z>S.z0+1.2||hd(h.pos,sp)>0.5){cmpGoto(h,sp.x,sp.z,0.25);return;}
            h.face=Math.PI;if(h.skillCd<=0)k45Tap(K,'water',0.8,'skill');return;}
          cmpGoto(h,0.3,S.z1-0.3,0.3);return;}
        // пролёт: прыжок с края на плиту посадки — доска опустится
        if(!S.ok){const edge={x:-0.2,z:S.z0+0.35};
          if(Y.pos.z>S.z0+0.2&&hd(h.pos,edge)>0.4){cmpGoto(h,edge.x,edge.z,0.2);return;}
          if(h.grounded&&Y.pos.z>S.plate.z+1.5){cmpGoto(h,-0.2,S.plate.z,0.1);if(Y.pos.z<S.z0+0.4)k45Tap(K,'j',0.4,'jump');return;}
          cmpGoto(h,-0.2,S.plate.z,0.1);return;}
        cmpGoto(h,0.3,S.z1-0.3,0.3);return;}
      // Йоша на том берегу, Пелагее впереди прогоревший стык — подойти и срастить
      const S=[...aheadP].sort((a,b)=>a.z0-b.z0)[0];if(!S){cmpGoto(h,0.5,-53.2,0.4);return;}
      const sp=spot(S);if(hd(h.pos,sp)>0.4||k45Spd(h)>1.0){cmpGoto(h,sp.x,sp.z,0.2);return;}
      h.face=0;if(h.skillCd<=0)k45Tap(K,'water',0.8,'skill');return;}
    // Пелагея идёт по готовому мосту до первого непочиненного участка
    const bad=SEC.find(S=>!S.ok&&S.z1<P.pos.z+0.3&&!S.gone);
    const tz=bad?bad.z0+0.5:-53;if(Math.abs(P.pos.z-tz)>0.4||Math.abs(P.pos.x+0.2)>0.5)cmpGoto(h,-0.2,tz,0.3);}}
]);
