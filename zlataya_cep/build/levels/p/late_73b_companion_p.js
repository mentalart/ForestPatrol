/* ============================== РЕЛИЗ final06 · ПРОЛОГ: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Бот за Игрока 2 (late_73_companion) проходит всё, что встаёт на пути Пелагеи и Йоши, как живой игрок: своё пятно в комнате → трещина →
// овраг (Пелагея планирует, держа прыжок) и лаз под корнем (Йоша) → ковшик поливает засохший корень → мосток → жёлтые плиты правых ворот
// (первый на плите, второй за воротами и держит, потом проходит первый) → поляна: бой с морочком → дупло. Числа — из proto/levels/p_prologue.js.
const PB={spot:[2.2,1.4],crk0:-15.4,crk1:-17.0,logX:7.1,ravX:3.8,farZ:-28.4,rootAt:[5.6,-39.3],
  bridge:[[5.6,-41.6],[5.6,-48.6],[6.4,-52.5],[6.4,-62.5]],ra:[3.2,-65.2],rb:[3.2,-71],thruZ:-68.9,arena:[3.2,-81],hollow:[1.4,-102]};
const PB_LOG=[[PB.logX,-19.6],[PB.logX,-30.5]],PB_SIDE=[[6.0,-33],[PB.rootAt[0],PB.rootAt[1]]],PB_RA=[[PB.ra[0],-63],PB.ra],PB_RB=[[3.2,-66.6],[3.2,-69.6],PB.rb];
const pbF=()=>W.flags,pbOK=h=>h.pos.z<PB.farZ&&h.pos.y>-1;
// «перешёл овраг» запоминается на заход в уровень (упавшего после перехода героя колокольчик вернёт назад — это не отмена)
const PBS={w:null,past:{},go:false,first:null},pbPast=k=>{if(PBS.w!==W){PBS.w=W;PBS.past={};PBS.go=false;PBS.first=null;}return PBS.past[k]||(PBS.past[k]=pbOK(HERO[k]));};
const pbPlate=(x,z)=>W.plates.find(q=>Math.abs(q.x-x)<0.1&&Math.abs(q.z-z)<0.1),pbGate=()=>W.gates.find(g=>g.link==='R');
const pbThru=()=>players[1].heroes.every(q=>q.pos.z<PB.thruZ);
CMP.route('p',[
  {id:'spot',done:()=>pbF().spot[1]||pbF().stage!=='room',run:h=>{cmpGoto(h,PB.spot[0],PB.spot[1],0.3);}},
  {id:'crack',done:()=>pbF().jump1&&pbF().jump1.done[1],run:h=>{if(pbF().stage!=='chase')return;   // комната: ждёт человека на пятне
    cmpGoto(h,0.9,PB.crk1-2.5,0.2);if(h.grounded&&h.pos.z<PB.crk0+0.6&&h.pos.z>PB.crk0-0.6)cmpTap('jump');}},
  // овраг: Йоша идёт под корнем, Пелагея перелетает, держа прыжок; второй герой тянется следом
  {id:'ravine',done:()=>pbPast('pelageya')&&pbPast('yosha'),run:h=>{if(pbF().stage!=='chase')return;
    const k=pbPast('yosha')?'pelageya':'yosha';if(!cmpWant(k))return;if(!pbPast(other(1).kind))cmpCall();
    if(k==='yosha'){cmpPath(h,PB_LOG);return;}
    pbPast('yosha');if(PBS.go&&h.grounded&&h.pos.z>-18.9)PBS.go=false;                    // упала и вернулась — заново с разбега
    if(!PBS.go){if(cmpGoto(h,PB.ravX,-19.2,0.3)<=0.45)PBS.go=true;return;}
    cmpGoto(h,PB.ravX,-31,0.2);if(h.grounded){if(h.pos.z<-22.3)cmpTap('jump');}else cmpKey('jump',true);}},
  // засохший корень: Йоша поливает живой водой из ковшика
  {id:'root',done:()=>pbF().rootGrowing||pbF().rootGrown,run:h=>{if(!cmpWant('yosha'))return;
    if(cmpPath(h,PB_SIDE,0.5)&&!(CMP.rootT>G.time-1)){CMP.rootT=G.time;cmpTap('skill');}}},
  {id:'bridge',done:()=>pbF().rootGrown&&players[1].heroes.every(q=>q.pos.z<-52),run:h=>{if(!pbF().rootGrown)return;cmpCall();cmpPath(h,PB.bridge,0.6);}},
  // ворота: первый герой встаёт на плиту — второй идёт в ворота и встаёт на плиту за ними — первый проходит; ворота запираются на засов
  {id:'plate1',done:()=>PBS.first||pbThru(),run:h=>{cmpCall();if(cmpPath(h,PB_RA,0.3)&&pbPlate(...PB.ra).pressed)PBS.first=h.kind;}},
  {id:'plate2',done:()=>pbPlate(...PB.rb).pressed||pbThru(),run:h=>{const k=PBS.first==='yosha'?'pelageya':'yosha';if(!cmpWant(k))return;cmpPath(h,PB_RB,0.3);}},
  {id:'pass',done:()=>pbThru(),run:h=>{if(!cmpWant(PBS.first))return;cmpGoto(h,PB.ra[0],-73,0.3);}},
  // поляна: дождаться за воротами; морок «учебный» — бой ведёт общий бой бота; потом к дуплу, где ждут человека
  {id:'arena',done:()=>pbF().stage==='hollow'||G.flags.proDone,run:h=>{cmpGoto(h,PB.arena[0],PB.arena[1],0.4);}},
  {id:'hollow',done:()=>!!G.flags.proDone,run:h=>{cmpGoto(h,PB.hollow[0],PB.hollow[1],0.4);}},
]);
