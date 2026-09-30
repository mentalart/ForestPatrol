// Документ Word для сценариста: node tools/script/make_doc.js тексты.json документ.docx [предложения.json]
// Берёт вывод extract.js и пишет таблицы по разделам: № (не менять) · Кто / что · Сейчас в игре · Новый вариант · Комментарий.
// С файлом предложений ({rows:{номер: текст}}, например verse_final06.json — стихотворные варианты) столбец «Новый вариант»
// заполнен ими: сценарист оставляет, правит или стирает предложение.
// Разметка текста: <i> — курсив (ремарка), <b> — жирный, <br> — перенос строки, {…} — вставка игры (на сером фоне).
// Правки обратно читает read_doc.js — по номеру строки.
const fs=require('fs'),path=require('path');
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,WidthType,ShadingType,AlignmentType,HeadingLevel,PageOrientation,
  Header,Footer,PageNumber,BorderStyle,VerticalAlign,TableLayoutType,LevelFormat}=require('docx');
const [IN,OUT,PROP]=process.argv.slice(2);if(!IN||!OUT){console.error('node make_doc.js тексты.json документ.docx [предложения.json]');process.exit(1);}
const D=JSON.parse(fs.readFileSync(IN,'utf8'));
const PR=PROP?JSON.parse(fs.readFileSync(PROP,'utf8')).rows:null;   // номер строки → предложение для «Нового варианта»
const FONT='Arial',SZ=19,SMALL=15;   // половинки пункта: 9,5 pt текст, 7,5 pt пометки
const GREY='6B6B6B',LINE='BFBFBF',HEADBG='E7E1D3',NEWBG='FFFBEA';
// A4 альбомная, поля 1,5 см: ширина текста 15137 DXA
const W=[760,1980,4740,4740,2917];const TW=W.reduce((a,b)=>a+b,0);
const COLS=['№','Кто / что','Сейчас в игре','Новый вариант','Комментарий'];

// цвета персонажей в игре светлые (для тёмного фона) — для бумаги темнее
function dark(hex){if(!hex)return '404040';let r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;
  const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h=0,s=0,l=(mx+mn)/2;if(mx!==mn){const d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h/=6;}
  l=0.33;s=Math.min(1,s*0.9+0.1);const q=l<0.5?l*(1+s):l+s-l*s,p=2*l-q,f=t=>{t=(t+1)%1;return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p;};
  return [f(h+1/3),f(h),f(h-1/3)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('').toUpperCase();}
const WHOC={};for(const w of D.who)WHOC[w.name]=dark(w.color);

// разметка → куски TextRun
function runs(text,base){base=base||{};const out=[];let i=false,b=false;
  for(const tok of String(text).split(/(<\/?[ib]>|<br>|\{[^}]*\})/)){if(!tok)continue;
    if(tok==='<i>'){i=true;continue;}if(tok==='</i>'){i=false;continue;}if(tok==='<b>'){b=true;continue;}if(tok==='</b>'){b=false;continue;}
    if(tok==='<br>'){out.push(new TextRun({break:1,font:FONT,size:base.size||SZ}));continue;}
    const ph=/^\{.*\}$/.test(tok);
    out.push(new TextRun({text:tok,font:FONT,size:base.size||SZ,italics:i||base.italics,bold:b||base.bold,color:ph?'4A4A4A':base.color,
      shading:ph?{type:ShadingType.CLEAR,color:'auto',fill:'E3E3E3'}:undefined}));}
  return out;}
const P=(children,o)=>new Paragraph({children,spacing:{before:0,after:0,line:250},...(o||{})});
const T=(text,o)=>new TextRun({text,font:FONT,size:SZ,...(o||{})});
const small=(text,o)=>new TextRun({text,font:FONT,size:SMALL,color:GREY,...(o||{})});
const border={style:BorderStyle.SINGLE,size:4,color:LINE};const borders={top:border,bottom:border,left:border,right:border};
function cell(children,wi,o){return new TableCell({children,width:{size:W[wi],type:WidthType.DXA},borders,margins:{top:50,bottom:50,left:80,right:80},...(o||{})});}

const SPEECH=new Set(['cine','say','bark','read']);
const fmtT=t=>{const m=Math.floor(t/60),s=t-m*60;return m+':'+(s<10?'0':'')+num(+s.toFixed(1));};
const num=x=>String(x).replace('.',',');
function whoCell(r){const lines=[];
  if(SPEECH.has(r.type)&&(r.whoName||r.voiceWho)){const nm=r.whoName||('без имени (голос: '+r.voiceWho+')');lines.push(P([T(nm,{bold:true,color:WHOC[r.whoName]||'303030'})]));}
  else if(SPEECH.has(r.type)&&!r.who)lines.push(P([T('ремарка',{italics:true,color:GREY})]));
  else lines.push(P([T(r.typeName,{bold:true,color:'505050',size:17})]));
  const sub=[];
  if(r.type==='cine'&&r.t!=null)sub.push(fmtT(r.t)+(r.d?' · на экране '+num(r.d)+' с':''));
  else if(r.t!=null)sub.push(r.t===r.cineDur?'в конце ролика':fmtT(r.t)+' — в ролике');
  if(r.type==='bark')sub.push('реплика + надпись над головой');else if(r.type==='say')sub.push(r.who||r.voiceWho?'реплика в игре':'субтитр в игре');else if(r.type==='read')sub.push('читает подсказку вслух');
  if(r.var)sub.push('вариант '+r.var);if(r.cond)sub.push(r.cond);
  if(r.n>1)sub.push('встречается '+r.n+' раз'+(r.n%10>=2&&r.n%10<=4&&(r.n<12||r.n>14)?'а':''));
  if(r.voice)sub.push('🎙 голос');
  for(const s of sub)lines.push(P([small(s)]));
  return lines;}
const headRow=new TableRow({tableHeader:true,cantSplit:true,children:COLS.map((c,i)=>cell([P([T(c,{bold:true,size:17})])],i,{shading:{type:ShadingType.CLEAR,color:'auto',fill:HEADBG}}))});
function table(rows){return new Table({width:{size:TW,type:WidthType.DXA},columnWidths:W,layout:TableLayoutType.FIXED,rows:[headRow].concat(rows.map(r=>new TableRow({cantSplit:true,children:[
  cell([P([T(r.id,{size:15,color:GREY})])],0),
  cell(whoCell(r),1),
  cell([P(runs(r.text))],2),
  cell([P(PR&&PR[r.id]?runs(PR[r.id]):[T('')])],3,{shading:{type:ShadingType.CLEAR,color:'auto',fill:NEWBG}}),
  cell([P([T('')])],4)]})))});}

// ---------- вступление ----------
const H=(level,text)=>new Paragraph({heading:level,children:[new TextRun({text,font:FONT})],spacing:{before:240,after:120}});
const para=(parts,o)=>new Paragraph({children:(Array.isArray(parts)?parts:[parts]).map(x=>typeof x==='string'?T(x,{size:21}):x),spacing:{before:0,after:100,line:276},...(o||{})});
const bullet=(parts)=>para(parts,{numbering:{reference:'dots',level:0}});
const step=(parts)=>para(parts,{numbering:{reference:'steps',level:0}});
const B=(t)=>T(t,{bold:true,size:21}),I=(t)=>T(t,{italics:true,size:21});
const PH=(t)=>T(t,{size:21,color:'4A4A4A',shading:{type:ShadingType.CLEAR,color:'auto',fill:'E3E3E3'}});
const all=D.sections.flatMap(s=>s.groups.flatMap(g=>g.rows));
const nCine=D.sections.reduce((a,s)=>a+s.groups.filter(g=>g.kind==='cine').length,0),nVoice=all.filter(r=>r.voice).length;
const intro=[
  new Paragraph({children:[new TextRun({text:'Златая цепь',font:FONT,size:56,bold:true,color:'8A1A14'})],spacing:{after:60}}),
  new Paragraph({children:[new TextRun({text:'Все тексты игры: ролики, реплики, подсказки, задачи, надписи',font:FONT,size:30})],spacing:{after:PR?40:120}}),
  ...(PR?[new Paragraph({children:[new TextRun({text:'«Новый вариант» — стихотворные варианты в духе сказок А. С. Пушкина',font:FONT,size:26,italics:true,color:'8A1A14'})],spacing:{after:120}})]:[]),
  para([T('Версия игры: '+D.release.replace(/^.*\//,'').replace(/\.html$/,'')+' · снимок текста от '+D.made+' · строк: '+all.length+' · роликов: '+nCine+' · озвученных реплик: '+nVoice,{size:19,color:GREY})]),
  para([T('Меню, настройки, титры и сохранения в документ не входят. Приложения А–Г в конце — имена, названия и надписи интерфейса.',{size:19,color:GREY})]),
  H(HeadingLevel.HEADING_1,'Как работать с документом'),
  step(['Каждая строка таблицы — один текст из игры. В первом столбце — ',B('номер строки'),'. Не меняйте его: по номеру мы найдём этот текст в игре.']),
  ...(PR?[step(['В столбце ',B('«Новый вариант»'),' (он подкрашен) уже стоит предложение — ',B('стихотворный вариант'),' той же реплики. ',B('Оставьте'),' его, если нравится, ',B('поправьте'),' или ',B('сотрите'),'. Пустой «Новый вариант» — в игре остаётся текст из «Сейчас в игре». Свой вариант пишите ',B('целиком'),' вместо предложения. Столбец «Сейчас в игре» не трогайте.'])]
    :[step(['Чтобы изменить текст, напишите новый вариант ',B('целиком'),' в столбце ',B('«Новый вариант»'),' (он подкрашен). Столбец «Сейчас в игре» не трогайте. Пустой «Новый вариант» — текст остаётся как есть.'])]),
  step(['Чтобы убрать текст из игры, напишите в «Новом варианте» слово ',B('УДАЛИТЬ'),'.']),
  step(['Чтобы добавить новую реплику, вставьте в таблицу строку (Вставка → Строку ниже) сразу после той, за которой она должна звучать. Номер оставьте пустым, в «Кто / что» напишите, кто говорит, а текст — в «Новый вариант».']),
  step(['Вопросы, пояснения и пожелания — в столбец ',B('«Комментарий»'),' или обычными примечаниями Word. Если правка затрагивает несколько строк («поменять везде Звенышко на …») — напишите это в комментарии к одной из них.']),
  step(['Режим исправлений Word включать можно — мы учтём. Строки таблицы не удаляйте и не переставляйте: чтобы убрать текст, пишите «УДАЛИТЬ».']),
  ...(PR?[H(HeadingLevel.HEADING_1,'О стихотворных вариантах'),
    para(['Варианты написаны в духе сказок Пушкина — «О царе Салтане», «О рыбаке и рыбке», «О золотом петушке» и пролога «У лукоморья»: где можно — ',B('хорей и парная рифма'),', сказочные слова («молвит», «тотчас», «диво»), но так, чтобы понял ребёнок 7–9 лет. Смысл реплики, кто говорит и что нужно сделать в игре — те же.']),
    bullet([B('Перенос строки'),' в варианте — это две строчки субтитра: так стих виден на экране.']),
    bullet(['Вставки игры ',PH('{кнопка …}'),', ',PH('{число}'),' сохранены во всех вариантах. Привычки героев тоже: у Пелагеи — «Тут написано…», у Звенышка — «Дзинь!».']),
    bullet([B('Стих обычно длиннее'),' прозы. В роликах смотрите на «на экране … с»: если вариант заметно длиннее, его лучше сократить, иначе ролик замедлится.']),
    bullet(['В подсказках и задачах главное — чтобы ребёнок понял, ',B('что сделать и какой кнопкой'),'. Если рифма мешает — смело упрощайте.']),
    bullet(['Одинаковые по смыслу реплики в разных местах (Сказы, концовки, присказка Кота «Звено куют руками…») переложены ',B('одинаково'),' — если меняете одну, поменяйте и другие.']),
    bullet([B('Пусто'),' там, где стих не нужен или уже есть: имена и названия, счётчики и куски составных строк, междометия («Хэк!», «Мяу», «Ух!»), счёт Потапа, пушкинские строки, которые шепчет Кот, колыбельная Тишки и народные песни («Эй, ухнем», «Я от бабушки ушёл…»). Приложения А–Г не заполнены.']),
    para([T('Предложений в документе: '+Object.keys(PR).length+'.',{size:19,color:GREY})])]:[]),
  H(HeadingLevel.HEADING_1,'Обозначения'),
  bullet([I('Курсив'),' — ремарка: действие или интонация. Она показывается в субтитрах, но не произносится. Например: ',I('(шёпотом)'),', ',I('Кощей опускает руку.'),' Курсив в вашем варианте тоже станет курсивом в игре.']),
  bullet([B('Жирный'),' — выделение в подсказке (кнопка, главное слово).']),
  bullet([PH('{кнопка «прыжок»}'),', ',PH('{имя героя}'),', ',PH('{число}'),' — слова в фигурных скобках на сером фоне игра подставляет сама: кнопку игрока (у каждого игрока своя), имя, число. Их можно переставить внутри фразы или убрать, но не переписывать. ',PH('{вставка}'),' — другой текст, который игра собирает сама.']),
  bullet(['🎙 голос — реплика озвучена голосом персонажа. Если вы её меняете, голос перезапишем мы — это не мешает правкам.']),
  bullet(['«встречается 3 раза» — один и тот же текст звучит или показывается в нескольких местах; правка изменит его везде.']),
  bullet(['«вариант 1 из 2» — игра выбирает одну из фраз: в зависимости от героя, игрока (1 или 2) или ситуации. Условие, если оно простое, написано рядом.']),
  bullet(['«часть составной строки» — игра склеивает эту строку с другими кусками и числами. Правьте кусок так, чтобы склейка читалась.']),
  bullet(['В роликах: ',B('0:05'),' — секунда ролика, когда появляется реплика; ',B('на экране 2,6 с'),' — сколько она висит. Старайтесь не делать реплику ролика заметно длиннее: ролик рассчитан по времени. Если голос длиннее паузы, ролик чуть замедляется (не больше чем на 20 %), но длинная реплика всё равно тормозит сцену.']),
  H(HeadingLevel.HEADING_1,'Для кого пишем'),
  para(['Игра — кооперативная сказка для всей семьи: играют вдвоём (часто ребёнок со взрослым) или один. Главный читатель субтитров и подсказок — ',B('ребёнок 7–9 лет'),'. Сейчас тексты уже упрощены под него: короткие фразы, простые слова, без загадок, которые ребёнок не разгадает; кто говорит и о чём — ясно из самой фразы.']),
  para(['В подсказках и задачах — сначала ',B('что сделать'),', потом ',B('какой кнопкой'),', потом ',B('зачем'),'. Подсказка висит внизу экрана 2–3 секунды, пока игрок бежит, — её нужно успеть прочитать. Надписи над героями и крупные надписи — одно-три слова.']),
  para(['«Тут написано…» — привычка Пелагеи: она читает подсказки из своей тетрадки. Её лучше сохранить.']),
  H(HeadingLevel.HEADING_1,'Какие бывают тексты'),
];
const TYPES=[['ремарка','Курсивная строка без имени в ролике: что происходит в кадре. Показывается субтитром, не озвучивается.'],
  ['реплика в ролике','Имя персонажа и его фраза в ролике. Почти все озвучены.'],
  ['реплика в игре','Персонаж говорит во время игры (субтитр внизу экрана); «+ надпись над головой» — фраза ещё и всплывает над героем.'],
  ['задача','Строка внизу экрана: что делать сейчас. У каждого игрока своя. Прячется, пока идёт реплика.'],
  ['Пелагея читает подсказку','В Огненной Смородине и дальше Пелагея вслух читает подсказку, когда Звенышко показывает цель.'],
  ['подсказка','Короткая подсказка игроку в особых местах и ситуациях: висит 2–3 секунды.'],
  ['крупная надпись','Большая надпись посреди экрана: «Распутали!», «Морок!». Под ней — «строка под крупной надписью».'],
  ['надпись над героем','Всплывает над героем или предметом на секунду: «Отбил!», «+звено».'],
  ['подпись у кнопки-подсказки','Кружок с кнопкой над предметом, к которому можно подойти, и короткая подпись: «держи лапку», «ковать».'],
  ['надпись в мире','Надпись на табличке, песке или стене в самом уровне.'],
  ['название уровня · подзаголовок','Показываются на старте уровня; «название в главах и на рушнике» — на карте-рушнике и в меню глав.'],
  ['пауза: «Что мы делаем»','Строка в меню паузы: напоминание о сюжете и цели уровня.'],
  ['Сказ','Сказку-Сказ игроки собирают из кусков: начало, помощник, конец. Каждый кусок должен сочетаться с любым другим.'],
  ['сказка Кота / лубок','Сказки-лубки Кота Учёного на Лукоморье и концовки в эпилоге.'],
  ['текст на экране · строка на экране','Прочие надписи: полоска босса, счёт, экран испытания.']];
intro.push(new Table({width:{size:TW,type:WidthType.DXA},columnWidths:[3400,TW-3400],layout:TableLayoutType.FIXED,rows:TYPES.map(([a,b])=>new TableRow({cantSplit:true,children:[
  new TableCell({children:[P([T(a,{bold:true})])],width:{size:3400,type:WidthType.DXA},borders,margins:{top:50,bottom:50,left:80,right:80}}),
  new TableCell({children:[P([T(b)])],width:{size:TW-3400,type:WidthType.DXA},borders,margins:{top:50,bottom:50,left:80,right:80}})]}))}));
// персонажи
intro.push(H(HeadingLevel.HEADING_1,'Персонажи'));
intro.push(para(['Имена — как в субтитрах. Сколько строк у персонажа — по всему документу. Характер — как его сейчас играет голос.',]));
const cnt={};for(const r of all)if(SPEECH.has(r.type)&&r.whoName)for(const n of r.whoName.split(' / '))cnt[n]=(cnt[n]||0)+1;
const PW=[2600,1100,TW-3700];
intro.push(new Table({width:{size:TW,type:WidthType.DXA},columnWidths:PW,layout:TableLayoutType.FIXED,rows:[new TableRow({tableHeader:true,children:['Персонаж','Строк','Какой он'].map((c,i)=>new TableCell({children:[P([T(c,{bold:true,size:17})])],width:{size:PW[i],type:WidthType.DXA},borders,margins:{top:50,bottom:50,left:80,right:80},shading:{type:ShadingType.CLEAR,color:'auto',fill:HEADBG}}))})]
  .concat(D.who.filter(w=>cnt[w.name]).sort((a,b)=>cnt[b.name]-cnt[a.name]).map(w=>new TableRow({cantSplit:true,children:[
    new TableCell({children:[P([T(w.name,{bold:true,color:WHOC[w.name]})])],width:{size:PW[0],type:WidthType.DXA},borders,margins:{top:50,bottom:50,left:80,right:80}}),
    new TableCell({children:[P([T(String(cnt[w.name]))])],width:{size:PW[1],type:WidthType.DXA},borders,margins:{top:50,bottom:50,left:80,right:80}}),
    new TableCell({children:[P([T(w.about||'')])],width:{size:PW[2],type:WidthType.DXA},borders,margins:{top:50,bottom:50,left:80,right:80}})]})))}));
// содержание
intro.push(H(HeadingLevel.HEADING_1,'Содержание'));
{let h1=null;for(const s of D.sections){if(s.h1!==h1){h1=s.h1;intro.push(new Paragraph({children:[T(h1,{bold:true,size:21})],spacing:{before:120,after:40}}));}
  const n=s.groups.reduce((a,g)=>a+g.rows.length,0),nc=s.groups.filter(g=>g.kind==='cine').length,first=s.groups[0].rows[0].id,last=s.groups[s.groups.length-1].rows.slice(-1)[0].id;
  intro.push(new Paragraph({children:[T(s.title,{size:19}),T('   строки '+first+'–'+last+' · текстов: '+n+(nc?' · роликов: '+nc:''),{size:17,color:GREY})],indent:{left:360},spacing:{after:20}}));}}

// ---------- тело ----------
const body=[];let h1=null;
for(const s of D.sections){
  if(s.h1!==h1){h1=s.h1;body.push(new Paragraph({heading:HeadingLevel.HEADING_1,pageBreakBefore:true,children:[new TextRun({text:h1,font:FONT})],spacing:{after:120}}));}
  else body.push(new Paragraph({children:[],spacing:{after:0}}));
  body.push(new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun({text:s.title,font:FONT})],spacing:{before:200,after:80}}));
  for(const g of s.groups){
    if(g.title)body.push(new Paragraph({heading:HeadingLevel.HEADING_3,keepNext:true,children:[new TextRun({text:g.title,font:FONT})],spacing:{before:160,after:60}}));
    body.push(table(g.rows));}}

const doc=new Document({creator:'Златая цепь',title:'Златая цепь — тексты игры'+(PR?' (стихотворные варианты)':''),description:'Снимок текстов '+D.release+' от '+D.made,
  styles:{default:{document:{run:{font:FONT,size:SZ}}},paragraphStyles:[
    {id:'Heading1',name:'Heading 1',basedOn:'Normal',next:'Normal',quickFormat:true,run:{size:34,bold:true,color:'8A1A14',font:FONT},paragraph:{spacing:{before:240,after:120},outlineLevel:0}},
    {id:'Heading2',name:'Heading 2',basedOn:'Normal',next:'Normal',quickFormat:true,run:{size:28,bold:true,color:'2F3A56',font:FONT},paragraph:{spacing:{before:200,after:80},outlineLevel:1}},
    {id:'Heading3',name:'Heading 3',basedOn:'Normal',next:'Normal',quickFormat:true,run:{size:21,bold:true,color:'5A4A2A',font:FONT},paragraph:{spacing:{before:160,after:60},outlineLevel:2}}]},
  numbering:{config:[{reference:'dots',levels:[{level:0,format:LevelFormat.BULLET,text:'•',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:500,hanging:260}}}}]},
    {reference:'steps',levels:[{level:0,format:LevelFormat.DECIMAL,text:'%1.',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:500,hanging:320}}}}]}]},
  sections:[{properties:{page:{size:{width:11906,height:16838,orientation:PageOrientation.LANDSCAPE},margin:{top:850,bottom:850,left:850,right:850,header:420,footer:420}}},
    headers:{default:new Header({children:[new Paragraph({alignment:AlignmentType.RIGHT,children:[small('Златая цепь · тексты игры · '+D.release.replace(/^.*\//,'').replace(/\.html$/,'')+' · снимок '+D.made)]})]})},
    footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({children:['стр. ',PageNumber.CURRENT,' из ',PageNumber.TOTAL_PAGES],font:FONT,size:SMALL,color:GREY})]})]})},
    children:intro.concat(body)}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync(OUT,b);console.log('docx',OUT,b.length,'bytes ·',all.length,'строк');});
