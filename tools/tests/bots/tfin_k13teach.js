//@@ wait=1500
// 1-3 «Колобок»: части 4–5 по 48 долей с уроком (PS=[0,32,64,96,144], END=192); за две доли до первого волка Звенышко называет его;
// значок на дорожке (кнопка над зверем) на Лёгком пути — за 1,3–3,2 доли до встречи; каждое спотыкание снимает лепесток,
// без лепестков — 8 долей отдыха (искры не собираются), потом снова три. Герой Игрока 1 стоит на месте (не уворачивается), Игрок 2 — тоже.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.startFrom(ZC.LV('1-3'));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);ZC.players.forEach(p=>{p.path='easy';});
window.S=()=>ZC.W.song;window.SAYS=[];{const sy=ZC.FIN&&ZC.FIN.vox;}
const fz=S().foes.filter(q=>q.type!=='duo');const k4=fz.filter(q=>q.ph===3).map(q=>q.k),k5=fz.filter(q=>q.ph===4).map(q=>q.k);
['state='+S().state,'foes4 '+Math.min(...k4)+'…'+Math.max(...k4),'foes5 '+Math.min(...k5)+'…'+Math.max(...k5),(Math.min(...k4)>=96&&Math.max(...k4)<144&&Math.min(...k5)>=144&&Math.max(...k5)<192)?'layout ok':'FAIL layout']
//@@
// лепестки: в начале части 1 стоим — коряга на доле 8 и пни снимают лепестки; без лепестков — отдых 8 долей, потом три
const P=ZC.players[0],r=[];let minP=3,restSeen=false,restK=0;
for(let i=0;i<60*40&&S().lastK<40;i++){ZC.tick(1);minP=Math.min(minP,P.petals);if(S().rest&&S().rest[0]>S().lastK&&!restSeen){restSeen=true;restK=S().rest[0];}}
r.push('minPetals='+minP,'rest='+restSeen+'@'+restK,'k='+S().lastK,'stumbles='+(S().stumbles||0));
r.push(U.until(()=>!(S().rest&&S().rest[0]>S().lastK)&&P.petals===3,30),'petals now='+P.petals);
r.push(minP===0&&restSeen&&P.petals===3?'petals ok':'FAIL petals');r
//@@
// часть 4: перескок на долю 96; урок — волк на 100 один; на 98 Звенышко «Волк — уходи вбок!»; значок над волком (Лёгкий путь)
S().jump(96);const r=[];let saw=false,said=false,part=-1;const pr=ZC.W.prompts.filter(p=>p.pi===0&&p.note==='вбок');
const _say=window.say;
for(let i=0;i<60*6&&S().lastK<101;i++){ZC.tick(1);part=S().part;if(pr.some(p=>p.cond())){saw=true;}
  if(document.body.innerText.includes('Волк — уходи вбок!'))said=true;}
r.push('part='+part,'k='+S().lastK,'laneIcon='+saw,'teach='+said,'prompts='+pr.length);
r.push(part===3&&saw?'teach ok':'FAIL teach');r
//@@
// до конца: перескок на 186, уровень кончается на 192 (пляска)
S().jump(186);const r=[];r.push(U.until(()=>S().state!=='play',20),'state='+S().state,'k='+S().lastK,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''));
r.push(S().state!=='play'&&!_errs.length?'k13teach ok':'FAIL k13teach');r
