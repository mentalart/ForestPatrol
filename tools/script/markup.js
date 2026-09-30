// Разметка текстов для документа сценариста: видимый текст строки игры и обратно.
// visible(html) — то, что видно игроку, в разметке документа: <i>, <b>, <br>, значки {значок: …}; прочие теги убираются.
// toValue(newVisible, oldValue) — новый видимый текст обратно в строку кода: значки и атрибуты тегов <b …>/<i …> берутся из
// старой строки по порядку. Возвращает null, если старая строка сложнее (div, span, small…) и вернуть разметку нельзя.
const ICON={r:'{значок: красный зубец}',y:'{значок: жёлтый кружок}',b:'{значок: синяя капля}',o:'{значок: золотой кружок}',e:'{значок}'};
const ENT={'&nbsp;':' ','&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'",'&laquo;':'«','&raquo;':'»','&mdash;':'—','&hellip;':'…','&times;':'×'};
function visible(h){let s=String(h);
  s=s.replace(/<i class="sg (\w)"><\/i>/g,(_,k)=>ICON[k]||'{значок}').replace(/<svg[\s\S]*?<\/svg>/g,'{значок}');
  s=s.replace(/<kbd>([^<]*)<\/kbd>/g,'[$1]');
  s=s.replace(/<(br|\/?(div|p|h\d|li|tr|table|small))\b[^>]*>/gi,'<br>');
  s=s.replace(/<b\b[^>]*>/gi,'<b>').replace(/<i\b[^>]*>/gi,'<i>');
  s=s.replace(/<(?!\/?[bi]>|br>)[^>]*>/g,'');
  s=s.replace(/&[a-z#0-9]+;/gi,e=>ENT[e]||e);
  for(const t of ['i','b'])if((s.match(new RegExp('<'+t+'>','g'))||[]).length!==(s.match(new RegExp('</'+t+'>','g'))||[]).length)s=s.replace(new RegExp('</?'+t+'>','g'),'');   // кусок строки: тег открыт в одном куске, закрыт в другом
  s=s.replace(/<i><\/i>|<b><\/b>/g,'').replace(/[ \t]*<br>[ \t]*/g,'<br>').replace(/(<br>)+/g,'<br>').replace(/^(<br>)+|(<br>)+$/g,'');
  return s.replace(/[ \t]+/g,' ').trim();}
// в старой строке только простая разметка — её можно восстановить
const SIMPLE=v=>!/<(?!\/?[bi][ >]|\/?[bi]>|br\s*\/?>|i class="sg \w"><\/i>)[^>]*>/.test(v)&&!/&[a-z#0-9]+;/i.test(v);
function toValue(nv,old){if(!SIMPLE(old))return null;
  const icons=[...old.matchAll(/<i class="sg (\w)"><\/i>/g)].map(m=>({html:m[0],lab:ICON[m[1]]||'{значок}'}));
  const bOpen=[...old.matchAll(/<b\b[^>]*>/g)].map(m=>m[0]),iOpen=[...old.matchAll(/<i\b(?! class="sg)[^>]*>/g)].map(m=>m[0]);
  let v=String(nv);
  for(const ic of icons){const k=v.indexOf(ic.lab);if(k<0)return null;v=v.slice(0,k)+'\u0001'+JSON.stringify(ic.html).slice(1,-1)+'\u0002'+v.slice(k+ic.lab.length);}
  if(/\{значок[^}]*\}/.test(v.replace(/\u0001[^\u0002]*\u0002/g,'')))return null;   // новый значок, которого не было
  v=v.replace(/\u0001([^\u0002]*)\u0002/g,(_,h)=>JSON.parse('"'+h+'"'));
  let bi=0,ii=0;v=v.replace(/<b>/g,()=>bOpen[bi++]||'<b>').replace(/<i>/g,()=>iOpen[ii++]||'<i>');
  return v;}
module.exports={visible,toValue,ICON,SIMPLE};
