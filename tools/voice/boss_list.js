// Список строк боссов к записи голоса: node tools/voice/boss_list.js > zlataya_cep/docs/36_boss_voice_lines.md
// Строки (короткий текст, тег, приоритет) — в boss_voice_rows.tsv; исходный текст берётся из кода игры: extract.js --boss
// (tip / banner / O / карточки / реплики уроков и роликов). Падает, если якорь не найден в игре, текст длиннее 7 слов
// или id уже есть в lines.json. lines.json и звук не трогает — запись делает человек.
const fs=require('fs'),path=require('path'),cp=require('child_process');
const ROOT=path.join(__dirname,'..','..');
const ex=JSON.parse(cp.execFileSync('node',[path.join(__dirname,'extract.js'),'--boss'],{maxBuffer:1<<28}).toString());
const cat=JSON.parse(fs.readFileSync(path.join(ROOT,'zlataya_cep','build','voice','lines.json'),'utf8'));
const ids=new Set(cat.lines.map(l=>l.id)),cast=cat.cast;
const st=t=>String(t).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const words=t=>st(t).replace(/\[[^\]]*\]/g,'').split(/\s+/).filter(w=>/[\p{L}\d]/u.test(w)).length;
const pool=ex.boss.concat(ex.lines.map(l=>Object.assign({},l,{src:l.src==='cine'?'ролик':l.src})));
const rows=fs.readFileSync(path.join(__dirname,'boss_voice_rows.tsv'),'utf8').split('\n').filter(l=>l&&l[0]!=='#').map(l=>l.split('\t'));
const err=[],out=[];
for(const [id,group,who,text,anchor,tag,prio,less] of rows){
  const lv=id.split('_')[0];
  if(ids.has(id))err.push('id уже в lines.json: '+id);
  if(words(text)>7)err.push(id+': '+words(text)+' слов — '+text);
  const c=pool.filter(b=>(b.lv===lv||b.lv===null)&&st(b.text).includes(anchor)&&(!less||b.lesson===less));
  const hit=c.find(b=>!b.voiced)||c[0];
  if(!hit)err.push(id+': якорь не найден — '+anchor);
  out.push({id,group,who,text,tag,prio,src:hit?st(hit.text):'',kind:hit?(hit.src+(hit.who&&hit.src==='lesson'?'':'')):'',voiced:hit&&hit.voiced,cast:!!cast[who]});
}
const dup=new Set();out.forEach(o=>{if(dup.has(o.id))err.push('дубль id '+o.id);dup.add(o.id);});
if(err.length){console.error(err.join('\n'));process.exit(1);}
const lvName={'2-B':'2-Б','3-B':'3-Б','4-B':'4-Б','5-B1':'5-Б1','5-B2':'5-Б2','3-1':'Ворон 3-1','3-2':'Баран 3-2','2-1':'Рак 2-1','5-1':'Лихо 5-1'};
const cnt=(f)=>out.filter(f).length;
const zv=o=>o.who==='zven';
const cut=(t,n)=>t.length>n?t.slice(0,n-1)+'…':t;
const esc=t=>t.replace(/\|/g,'\\|');
let md='';
md+='# 36 · Строки боссов к записи голоса (F-10)\n\n';
md+='Что записать, чтобы озвучены были подсказки и уроки боссов, а не только ролики (`34_boss_audit.md` §4.1 X-8, §6.2 F-10). Звук здесь не генерируется и `lines.json` не менялся: запись делает человек (Eleven v4 через Higgsfield, `docs/09_final06.md`), после неё строки добавляет `tools/voice/plan.js`.\n\n';
md+='Список собран автоматически: `node tools/voice/boss_list.js > zlataya_cep/docs/36_boss_voice_lines.md`. Короткие тексты, теги и приоритеты — в `tools/voice/boss_voice_rows.tsv`; исходный текст генератор берёт из игры (`node tools/voice/extract.js --boss`: ключ `--boss` добавляет к выводу `tip`, `banner`, `O`, карточки, `floatText` и реплики уроков `L.beat`) и падает, если фраза пропала из кода, слов больше 7 или id уже занят.\n\n';
md+='## Сводка\n\n| Босс | строк | из них Звенышко | P0 |\n|---|---|---|---|\n';
const byLv={};out.forEach(o=>{const l=o.id.split('_')[0];(byLv[l]=byLv[l]||[]).push(o);});
for(const l of Object.keys(lvName)){const a=byLv[l]||[];md+='| '+lvName[l]+' | '+a.length+' | '+a.filter(zv).length+' | '+a.filter(o=>o.prio==='P0').length+' |\n';}
const bossLv=['2-B','3-B','4-B','5-B1','5-B2'],miniLv=['3-1','3-2','2-1','5-1'];
md+='\n**Одностроки Звенышка у боссов (2-Б, 3-Б, 4-Б, 5-Б1, 5-Б2): '+cnt(o=>zv(o)&&bossLv.includes(o.id.split('_')[0]))+'** (цель ≈ 70); **мини-боссы: '+cnt(o=>miniLv.includes(o.id.split('_')[0]))+'** (цель ≈ 50, из них P2 — '+cnt(o=>miniLv.includes(o.id.split('_')[0])&&o.prio==='P2')+', их можно записать последними).\n\n';
md+='## Как читать\n\n';
md+='- **id** — с префиксом уровня, как в `lines.json` (`2-B_z06`: `z` — одностроки Звенышка, у мини-боссов буква боя: `v` Ворон, `b` Баран, `r` Рак, `l` Лихо). Новый id в `lines.json` не пересекается с существующими (проверяет генератор).\n';
md+='- **текст** — ≤ 7 слов, это и есть `text` реплики в игре: после записи надо заменить в игре исходную фразу (подсказку, карточку, строку ролика) этим текстом дословно, иначе сборка остановится (её проверка — «озвученной строки нет в игре»). Поэтому правку текста игры делает задача уровня (B2-b, B3, B4, B6-b1…b3, M-1…M-4), а здесь — только список.\n';
md+='- **исходный текст** — как сейчас в игре (теги убраны; `[кнопка]` — клавиша героя). Если исходник уже ≤ 7 слов, текст совпадает с ним.\n';
md+='- **тег** — подсказка интонации для `tts` (в квадратных скобках, как в `lines.json`; не произносится). **P0** — ключевая механика этапа (без неё игрок не поймёт бой), **P1** — вторая по важности, **P2** — реплика-приправа, записывать последней.\n';
md+='- Знак ⚠ в колонке «кто» — такого голоса нет в `cast` (`lines.json`): сначала завести голос (`cast[...].voice_id`), потом записывать.\n\n';
let cur='';
for(const o of out){
  if(o.group!==cur){cur=o.group;md+='\n### '+cur+'\n\n| id | кто | текст (≤ 7 слов) | исходный текст в игре | тег | приор. |\n|---|---|---|---|---|---|\n';}
  const same=st(o.src)===o.text;
  md+='| `'+o.id+'` | '+o.who+(o.cast?'':' ⚠')+' | '+esc(o.text)+' ('+words(o.text)+') | '+(same?'= (без изменений)':esc(cut(o.src,170))+' ('+words(o.src)+')')+' | `'+o.tag+'` | '+o.prio+' |\n';
}
// не вошло
const stripN=t=>st(t);
const narr={};for(const l of ex.lines){if(l.who===null&&!l.voiced&&l.lv&&lvName[l.lv]&&l.src==='cine'){(narr[l.lv]=narr[l.lv]||new Set()).add(stripN(l.text));}}
md+='\n## Что в список не вошло\n\n';
md+='- **Стихи рассказчика** (ролики без говорящего: `says:[[t,d,null,«…»,true]]`) — голоса в `cast` нет, поэтому не записываются; решение по ним — «озвучить Котом или сократить» (`34_boss_audit.md`, 1Б-5, 2Б-5). Сейчас таких строк: '+Object.keys(lvName).map(l=>lvName[l]+' — '+(narr[l]?narr[l].size:0)).join(', ')+' (уровень целиком, не только бой с боссом).\n';
const les=['pro','pro_gorge','pro_sea','pro_sky','pro_write','pro_three','door','fly_stupa','fly_gor','ride','repka'];
md+='- **Общие уроки 5-Б2**, не привязанные к 12 стадиям (`E.LES.door`, `fly_stupa`, `fly_gor`, `ride`, `repka`, пролог `pro*`) — их сократит задача B6-b1…b3 (один шаблон на четыре страницы); строки в этот список добавятся после сокращения.\n';
md+='- Уже озвученные строки (в `lines.json` их '+cat.lines.length+') не повторяются.\n';
md+='- **Богатырский мах** одной строкой (`2-B_z15`) закрывает и 2-Б, и 3-Б, и 1-Б: подсказка у них одинаковая; в `lines.json` её достаточно записать один раз.\n';
process.stdout.write(md);
