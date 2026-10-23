// Съёмочная сборка мультсериала «Златая цепь»: релиз final06 + код серий (в игру не входит).
//   node tools/serial/build.js            → tools/serial/out/serial.html
// Код серий (core.js и ep*.js) вставляется в релиз перед запуском игры — в ту же область видимости, что модули late_*.js:
// серии пользуются площадками «Присказки» (PRK), героями, роликами play/KS/KC, эффектами FX/CINE и звуком игры.
// Сначала соберите релиз: python3 zlataya_cep/build/build_final.py
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..','..');const REL=path.join(ROOT,'zlataya_cep','zlataya_cep_final06.html');
const OUT=path.join(__dirname,'out');fs.mkdirSync(OUT,{recursive:true});
const ANCHOR='\nhudInit();finBoot();requestAnimationFrame(frame);';
let s=fs.readFileSync(REL,'utf8');if(s.split(ANCHOR).length!==2)throw new Error('нет якоря запуска в релизе: '+ANCHOR.trim());
const mods=['core.js'].concat(fs.readdirSync(__dirname).filter(f=>/^ep\d+.*\.js$/.test(f)).sort());
const code=mods.map(f=>'/* ---- serial/'+f+' ---- */\n'+fs.readFileSync(path.join(__dirname,f),'utf8').replace(/<\/script/gi,'<\\/script')).join('\n');
s=s.replace(ANCHOR,()=>'\n'+code+ANCHOR);
fs.writeFileSync(path.join(OUT,'serial.html'),s);console.log('serial.html',(s.length/1e6).toFixed(1)+' MB, модули:',mods.join(' '));
