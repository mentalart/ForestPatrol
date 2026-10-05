//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic), стадия 8 «Колдун несёт богатыря»: ливень и тучи кругом; молния бьёт в красный круг; Кощей
// уносит героя — удары схваченного: вырвался; снова уносит — друг в золотом круге Жар-птицы: клюнула кулак; Яга на ступе
// сметает круги игл; Водяной — родник живой воды (+лепесток). Одним игроком: унёс — вырвался ударами.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.KB=[{a:'KeyF',g:'KeyG',i:'KeyR'},{a:'Comma',g:'Period',i:'Semicolon'}];
window.H=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.PIS=()=>ZC.G.solo?[ZC.G.soloPi]:[0,1];window.KEY=(pi,k)=>KB[ZC.G.solo?0:pi][k];
window.PUT=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.05,z);h.vel.set(0,0,0);};
window.FULL=()=>{for(const pi of[0,1])ZC.players[pi].petals=3;};
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0)ZC.press('Space');FULL();ZC.tick(1);}};
window.VIS=()=>ZC.W.prompts.filter(p=>{try{return p.cond();}catch(e){return false;}}).map(p=>{const n=typeof p.note==='function'?p.note():p.note;return n||p.action;});
window.GO8=solo=>{ZC.setSolo(!!solo);FULL();E5.goStage(8);ZC.G.manual=true;ZC.tick(20);E5.free=E5.free||{};for(const k of['yaga','vod','zhar','gor','solo'])E5.free[k]=true;window.ES=E5.es;
  let i=0;for(;i<60*90&&!(E5.cur===8&&K5.fight&&!ZC.G.cine&&!ZC.G.ui);i++)TK(1);window.ES=E5.es;return 'cur='+E5.cur+' fight='+K5.fight+' через '+(i/60).toFixed(0)+' с';};
// дождаться, пока Кощей в небе колдует, и унести героя
window.GRAB=()=>{for(let i=0;i<60*20&&ZC.FIN.k5e.es&&!ES.grab;i++){if(ES.grabT>0.5&&ZC.W.dbg5e().KB.state==='k5cast')ES.grabT=0.01;PIS().forEach((pi,j)=>PUT(H(pi),-1.5+j*3,-9));ZC.tick(1);}return !!ES.grab;};
'ok'
//@@
// вдвоём: ливень и тучи; молния в красный круг
const r=[GO8(false)];r.push('ливень='+!!(ZC.FIN.k2fx.rainO&&ZC.FIN.k2fx.rainO.on)+' тучи='+!!(ZC.FIN.k3fx&&ZC.FIN.k3fx.cl));
K5.storm=0.8;ES.boltT=0.01;for(let i=0;i<120&&!(E5.logs||[]).includes('bolt8');i++)TK(1);r.push('молния='+(E5.logs||[]).includes('bolt8'));if(!(E5.logs||[]).includes('bolt8'))throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// унёс — схваченный бьёт: вырвался
const r=[];if(!GRAB())throw new Error('не унёс: grabT='+ES.grabT+' st='+ZC.W.dbg5e().KB.state);const cap=ES.grab.h;r.push('унёс '+cap.kind+' | подсказки: '+VIS().filter(v=>/вырыв|круг/.test(v)).join(' / '));
const g0=ES.grab;for(let i=0;i<40&&ES.grab;i++){ZC.press(KEY(cap.player,'a'));ZC.tick(6);}r.push('mash='+g0.mash.toFixed(1)+' t='+g0.t.toFixed(1)+' вырвался='+!ES.grab+' лог='+(E5.logs||[]).slice(-3));if(ES.grab||!(E5.logs||[]).includes('caught'))throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_s8_storm.png
ZC.tick(1);
//@@
// снова унёс — друг в золотом круге Жар-птицы: клюнула
const r=[];TK(120);if(!GRAB())throw new Error('не унёс второй раз');const cap=ES.grab.h,fr=H(1-cap.player);r.push('круг='+!!ES.zh);if(!ES.zh)throw new Error('нет круга Жар-птицы');
for(let i=0;i<60*4&&ES.grab;i++){PUT(fr,ES.zh.p.x,ES.zh.p.z);ZC.tick(1);}r.push('клюнула='+(E5.logs||[]).includes('zhPeck'));if(!(E5.logs||[]).includes('zhPeck'))throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// Яга сметает круги игл; родник Водяного — лепесток
const r=[];for(let i=0;i<60*15&&!(K5.zones||[]).length;i++)TK(1);r.push('кругов='+(K5.zones||[]).length);ES.yagaT=0.01;for(let i=0;i<30;i++)TK(1);r.push('Яга='+(E5.logs||[]).includes('yaga8'));
TK(150);r.push('сметено='+(K5.zones||[]).every(z=>z.userData.dead||!z.visible));if(!(E5.logs||[]).includes('yaga8'))throw new Error(r.join(' | '));
ES.spT=0.01;ES.sp=null;TK(2);const P=ES.sp;r.push('родник='+!!P);if(!P)throw new Error(r.join(' | '));ZC.players[0].petals=2;PUT(H(0),P.p.x,P.p.z);ZC.tick(3);r.push('лепестки='+ZC.players[0].petals);if(ZC.players[0].petals!==3)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// одним игроком: унёс — вырвался ударами
const r=[GO8(true)];if(!GRAB())throw new Error('соло: не унёс');const cap=ES.grab.h;for(let i=0;i<40&&ES.grab;i++){ZC.press(KEY(cap.player,'a'));ZC.tick(6);}
r.push('вырвался='+!ES.grab);if(ES.grab)throw new Error(r.join(' | '));CHK(r.join(' | '))
