/* ============================== РЕЛИЗ final06 · 4-4 «ЗМИЕВЫ ВАЛЫ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из proto/levels/4-4.js (W.PLOW, W.plowBy, W.furrowAt, W.lavaCell, флаги bowlA / doorOpen / drained / cleared). Плуг может вести любой; первым берёт человек.
// Если плуг свободен несколько секунд, а борозды нет — бот пашет сам по проверенному пути (поле А — к чаше, Б — к двери, арена — от жерла в яму); Пелагея раз на поле подсказывает Совиным взором.
// Дверь вышибает только Потап (человек). Арена: от замаха — щит/кувырок; болван — Йоша поливает, срывает клещами остывшее, бьёт открытого; печник — клещами уголь из жаровни, бить, пока горит.
// Змеёнышей в лаве (неуязвимы) не трогает, на сухом — бьёт; через борозду с лавой прыгает.
const K44={w:null,t:{},idle:0,owl:{},rst:null,ri:0,fin:{},wait:0};
CMP.k44=K44;
const k44=()=>{if(K44.w!==W){Object.assign(K44,{w:W,t:{},idle:0,owl:{},rst:null,ri:0,fin:{},wait:0});}return K44;};
const k44Tap=(K,k,gap,act)=>{if(!(K.t[k]>G.time-gap)){K.t[k]=G.time;cmpTap(act);return true;}return false;};
const K44_R={A:[[-4.2,-4.5],[-5.2,-6.5],[-5.2,-9],[-3,-12],[-1.5,-15.5],[-1.2,-17.5],[2.5,-17.5],[4.5,-20],[6,-22.8],[6,-26]],
  B:[[2,-35.6],[7.6,-35.6],[7.6,-37.6],[1,-40],[-5,-42.5],[-5,-48],[-2.5,-52],[0,-56.2]],
  C:[[-6.6,-62.4],[-6.6,-61.6],[9,-61.6]]};
const K44_G={A:{x:-3,z:-3.2},B:{x:-2,z:-34.4},C:{x:-4,z:-62.4}};   // откуда берут плуг
// змеёныши в лаве неуязвимы — к ним не подходят
{const _ig=CMP.ignore;CMP.ignore=e=>(_ig&&_ig(e))||(e.kind==='zmeenysh'&&e.hot);}
const k44Share=()=>{const p=W.PLOW.g.position,a=W.PLOW.g.rotation.y;return {x:p.x-Math.sin(a)*1.2,z:p.z-Math.cos(a)*1.2};};
// идти к точке; впереди борозда с лавой — прыжок
const k44Go=(K,h,x,z,stop)=>{const d=cmpGoto(h,x,z,stop);if(d>stop&&h.grounded&&W.lavaCell){const dx=x-h.pos.x,dz=z-h.pos.z,l=Math.hypot(dx,dz)||1;if(W.lavaCell(h.pos.x+dx/l*0.9,h.pos.z+dz/l*0.9))k44Tap(K,'lj',0.4,'jump');}return d;};
// чего ещё ждут от стадии
const k44Need=st=>{const F=W.flags;return st==='A'?!F.bowlA:st==='B'?!F.doorOpen:st==='C'?!F.drained&&!F.cleared:false;};
CMP.route('4-4',[
  {id:'valy',first:true,done:()=>['end'].includes(W.flags.stage)||!!W.flags.out,run:(h,hh,dt)=>{const K=k44(),F=W.flags,st=F.stage;if(G.cine||!['A','B','C'].includes(st))return 'follow';
    const T=TIMING[players[1].path]||TIMING.mid,holder=W.plowBy?W.plowBy():null,mine=holder&&holder.player===1,theirs=holder&&holder.player===0;
    const al=W.enemies.filter(e=>cmpAlive(e)||(e.alive&&e.kind==='zmeenysh'&&e.state!=='dying'&&e.state!=='spawn'));
    // ---- защита: от замаха на себя — щит / кувырок (на месте) ----
    const wind=al.filter(e=>e.state==='wind'&&e.tgt===h&&hd(e.pos,h.pos)<7);
    if(wind.length){cmpFight(h,hh,wind,T);return 'x';}
    // ---- арена: болван и печник (змеёныши на суше — общий бой) ----
    if(st==='C'&&F.fight&&!F.cleared){
      const bo=al.find(e=>e.kind==='bolvan'),pc=al.find(e=>e.kind==='pechnik');
      if(bo&&!theirs&&!mine){                                            // болван
        if(!cmpWant('yosha'))return;h.following=false;
        const nr=l=>l.sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos))[0],bl=al.filter(e=>e.kind==='bolvan');
        const cool=bl.filter(e=>e.armor==='cool'),hot=bl.filter(e=>e.armor==='hot'),off=bl.filter(e=>e.armor==='off');
        if(cool.length){const e=nr(cool);k44Go(K,h,e.pos.x,e.pos.z,1.5);if(hd(h.pos,e.pos)<2.1)k44Tap(K,'tear',0.5,'item');return;}
        if(hot.length&&!off.length){const e=nr(hot);k44Go(K,h,e.pos.x,e.pos.z,2.2);if(hd(h.pos,e.pos)<2.8)k44Tap(K,'wt',0.9,'skill');return;}
        if(off.length){cmpFight(h,hh,[nr(off)],T);return 'x';}}
      else if(al.some(e=>e.kind==='zmeenysh'&&!e.hot&&hd(e.pos,h.pos)<10))return 'follow';       // змеёныши на суше мешают и ленивы — общий бой
      else if(pc&&!mine){                                                // печник
        h.following=false;const car=heroCarry(h);
        if(pc.fed<=0&&pc.state!=='broken'){
          if(car&&car.kind==='ugol'){k44Go(K,h,pc.pos.x,pc.pos.z,1.2);return;}
          const co=W.hots.find(i=>i.kind==='ugol'&&!i.gone&&!i.carrier&&!i.flying&&i.heat>0.3);
          if(co){if(hd(co.pos,h.pos)>1.0){k44Go(K,h,co.pos.x+0.6,co.pos.z,0.4);return;}h.face=Math.atan2(co.pos.x-h.pos.x,co.pos.z-h.pos.z);k44Tap(K,'take',0.5,'item');return;}}
        else{cmpFight(h,hh,[pc],T);return 'x';}}}
    // ---- плуг: человек ведёт — бот подсказывает Совиным взором; свободен — пашет сам ----
    if(theirs&&!K.owl[st]&&k44Need(st)){if(!cmpWant('pelageya'))return;K.owl[st]=true;h.following=false;cmpTap('skill');return;}
    if(theirs||(holder&&!mine)){K.idle=0;return 'follow';}
    if(!k44Need(st)){K.idle=0;K.fin[st]=false;return 'follow';}
    if(!mine){K.idle+=dt||1/60;if(K.idle<(st==='C'?6:8))return 'follow';}
    if(K.fin[st]&&G.time-K.fin[st]<28)return 'follow';                                     // допахал — лава течёт к цели
    // автопашня
    h.following=false;
    if(!mine){const sh=k44Share(),g=K44_G[st];K.fin[st]=false;CMP.wp=null;
      if(hd(h.pos,sh)>1.9){k44Go(K,h,Math.abs(sh.x-g.x)<4&&Math.abs(sh.z-g.z)<4?g.x:sh.x,Math.abs(sh.x-g.x)<4&&Math.abs(sh.z-g.z)<4?g.z:sh.z,0.5);return;}
      k44Tap(K,'plow',0.6,'item');return;}
    const R=K44_R[st];if(!R)return;
    if(cmpPath(h,R,0.5,0.9)){if(k44Tap(K,'rel',0.6,'item'))K.fin[st]=G.time;return;}
  }}
]);
