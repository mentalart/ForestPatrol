/* ============================== РЕЛИЗ · ДЛЯ БОТОВ И РАЗРАБОТКИ: ЕДИНАЯ ТЕЛЕПОРТАЦИЯ FIN.warp, ПОСЛЕДНИЙ РОЛИК FIN.lastCine ============================== */
// Раньше у одних уровней был свой W.warpNN('участок') (2-1…2-Б, 5-1), у других — ничего, и бот каждый раз искал, как дойти до места.
// Теперь везде одинаково:
//   FIN.warp(n)        — к n-му колокольчику-закладке уровня (0 — первый; колокольчики есть на всех уровнях);
//   FIN.warp('имя')    — к именованному участку, если у уровня есть свой W.warpNN (например FIN.warp('crown') на 2-2);
//   FIN.warp(x,z[,y])  — в точку;  FIN.warpList() — что умеет текущий уровень: колокольчики и имена участков.
// Герои встают рядом друг с другом, перестают следовать, точки возрождения обоих игроков — там же, камеры — сразу на месте.
// Игру не меняет: зовут только боты и отладка (window.ZC.FIN — только с ?debug).
FIN.warpFn=()=>{if(!W)return null;for(const k of Object.keys(W))if(/^warp[0-9a-z]+$/i.test(k)&&typeof W[k]==='function')return W[k];return null;};
FIN.warpList=()=>{const f=FIN.warpFn(),src=f?String(f):'',names=[];
  // имена участков — ключи объекта точек внутри W.warpNN ({tail:[…],yard:[…]} или where==='boss')
  for(const m of src.matchAll(/([a-zA-Z]+)\s*:\s*\[/g))if(!names.includes(m[1]))names.push(m[1]);for(const m of src.matchAll(/where===['"]([a-zA-Z0-9]+)['"]/g))if(!names.includes(m[1]))names.push(m[1]);
  return {level:W&&W.levelId,bells:(W&&W.bells||[]).map((b,i)=>i+': '+b.x.toFixed(1)+','+b.z.toFixed(1)),names};};
FIN.warpTo=(x,z,y)=>{const hy=y!=null?y:0;HEROES.forEach((h,i)=>{placeOnGround(h,x+(i%2?1.2:-1.2)*(i>1?1.8:1),z+(i>1?0.9:0),hy);h.following=false;h.vel.set(0,0,0);});
  for(const pi of[0,1])players[pi].cp.set(x,hy,z);if(typeof snapCams==='function')snapCams();return 'warp '+x.toFixed(1)+','+z.toFixed(1);};
FIN.warp=(where,z,y)=>{if(typeof where==='number'&&typeof z==='number')return FIN.warpTo(where,z,y);
  if(typeof where==='number'){const b=(W.bells||[])[where];if(!b)throw new Error('нет колокольчика '+where+' на уровне '+W.levelId+' (их '+(W.bells||[]).length+')');return FIN.warpTo(b.x,b.z+1.6,b.y||0);}
  const f=FIN.warpFn();if(!f)throw new Error('у уровня '+W.levelId+' нет именованных участков — FIN.warp(номер колокольчика)');f(where);return 'warp '+where;};
// последний запущенный ролик (его планы shots[].t, реплики, длительность) — для tools/tests/cine_frames.js: кадр на каждый план
{const _pl=play;play=function(def){FIN.lastCine=def;return _pl(def);};}
