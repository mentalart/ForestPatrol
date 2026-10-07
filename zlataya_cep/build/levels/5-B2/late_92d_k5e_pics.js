/* ============================== k5epic · ЗНАЧКИ ИНТЕРФЕЙСА И ТИШИНА В БИТВЕ (K5PIC) ============================== */
// Подсказок в битве нет — правила показывают обучающие катсцены (late_93_koschei_level_p6b_lesson.js, E.LES[n] в модулях стадий). Здесь остались:
//  • набор значков (K5PIC.SVG) для шкалы полёта домой и летящего замка: K5PIC.one(имя, размер) — значок в HTML, K5PIC.h(список, размер) — строкой,
//    K5PIC.spr(список, размер) — спрайтом в мире;
//  • «тишина» (K5PIC.mute): на любой стадии не всплывают слова-указания, не рисуются кнопки над героями, у баннеров нет мелкой подписи-указания;
//  • значок ⏭ вместо подписи пропуска ролика.
// Работает только в «Битве с Кощеем» (k5epic); остальная игра не меняется.
const K5PIC={};FIN.k5pic=K5PIC;
{const S=(b)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'+b+'</svg>',ST='stroke="#2a1a10" stroke-width="3" stroke-linejoin="round"';
  K5PIC.SVG={
    lock:S('<rect x="13" y="28" width="38" height="29" rx="5" fill="#ffd76a" '+ST+'/><path d="M21 28 V20 Q21 7 32 7 Q43 7 43 20 V28" fill="none" stroke="#2a1a10" stroke-width="6"/><circle cx="32" cy="41" r="4" fill="#2a1a10"/>'),
    oak:S('<rect x="27" y="34" width="10" height="26" fill="#6a4a2a" '+ST+'/><circle cx="32" cy="24" r="18" fill="#4a8a3a" '+ST+'/><circle cx="18" cy="32" r="10" fill="#4a8a3a" '+ST+'/><circle cx="46" cy="32" r="10" fill="#4a8a3a" '+ST+'/>'),
    star:S('<path d="M32 4 L40 23 L60 24 L44 37 L50 58 L32 46 L14 58 L20 37 L4 24 L24 23Z" fill="#ffd76a" '+ST+'/>'),
    book:S('<path d="M4 14 Q18 8 32 16 Q46 8 60 14 V52 Q46 46 32 54 Q18 46 4 52Z" fill="#fff4dc" '+ST+'/><path d="M32 16 V54" stroke="#2a1a10" stroke-width="3"/><path d="M10 22 Q18 19 26 23 M10 30 Q18 27 26 31 M38 23 Q46 19 54 22 M38 31 Q46 27 54 30" stroke="#b08a60" stroke-width="2"/>'),
    dragon:S('<path d="M12 50 Q14 34 32 34 Q50 34 52 50Z" fill="#4a8a3a" '+ST+'/><path d="M22 36 Q16 22 14 12 M32 34 V8 M42 36 Q48 22 50 12" stroke="#4a8a3a" stroke-width="7" stroke-linecap="round"/><circle cx="14" cy="10" r="6" fill="#5aa04a" '+ST+'/><circle cx="32" cy="7" r="6" fill="#5aa04a" '+ST+'/><circle cx="50" cy="10" r="6" fill="#5aa04a" '+ST+'/>'),
    stupa:S('<path d="M14 26 H50 L44 56 H20Z" fill="#8a6a4a" '+ST+'/><path d="M46 10 L30 44" stroke="#c0a070" stroke-width="5" stroke-linecap="round"/><path d="M26 44 L36 50 L30 56 L22 50Z" fill="#d8c090"/>')};
  const one=(n,sz)=>(K5PIC.SVG[n]||'').replace('<svg ','<svg width="'+sz+'" height="'+sz+'" class="k5i" ');
  K5PIC.h=(list,sz)=>{if(!list)return '';if(typeof list==='string')list=[list];return '<span class="k5pics">'+list.map(n=>one(n,sz||34)).join('')+'</span>';};
  K5PIC.one=one;
  // ---------- значок в мире: спрайт из SVG (картинка грузится сама, текстура обновится) ----------
  const TEXC={};
  K5PIC.tex=list=>{if(typeof list==='string')list=[list];const key=list.join('|');if(TEXC[key])return TEXC[key];const n=list.length,c=document.createElement('canvas');c.width=128*n;c.height=128;const tex=new THREE.CanvasTexture(c);TEXC[key]=tex;
    const g=c.getContext('2d');list.forEach((nm,i)=>{const svg=K5PIC.SVG[nm];if(!svg)return;const img=new Image();img.onload=()=>{g.drawImage(img,i*128+6,6,116,116);tex.needsUpdate=true;};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});return tex;};
  K5PIC.spr=(list,size)=>{if(typeof list==='string')list=[list];const n=list.length;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:K5PIC.tex(list),transparent:true,depthTest:false,depthWrite:false,fog:false}));
    sp.scale.set((size||1.4)*n,size||1.4,1);sp.renderOrder=12;sp.raycast=()=>{};sp.userData.noBatch=true;return sp;};}
{const st=document.createElement('style');st.textContent='.k5pics{display:inline-flex;gap:4px;align-items:center;vertical-align:middle;margin-left:4px}.k5pics .k5i{filter:drop-shadow(0 2px 2px rgba(0,0,0,.45))}';document.head.appendChild(st);}
const k5On=()=>!!(FIN.k5e&&FIN.k5e.on&&W&&W.levelId==='5-B2');
// тишина (FIN.k5e.noHint, p6): слова и значки-указания не всплывают, кнопок над героями и целями нет, подписей у баннеров нет
K5PIC.mute=()=>{const E=FIN.k5e;return k5On()&&!!(E&&E.noHint&&E.noHint());};
{const _ft=floatText;floatText=function(pos,txt,col){if(k5On()&&typeof txt==='string'){const m=/^\s*([+-]?\d+)\s*лепест/i.exec(txt);if(m)return _ft.call(this,pos,m[1],col);   // «-1 лепесток» → «-1»
    if(K5PIC.mute()&&/[А-Яа-яЁё]/.test(txt))return;}   // слова не всплывают (числа — да)
  return _ft.apply(this,arguments);};}
{const st=document.createElement('style');st.textContent='body.k5pic #skip>span:first-child{font-size:0;display:inline-block;width:46px;height:26px;background:url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32"><path d="M4 4 L24 16 L4 28Z M26 4 L46 16 L26 28Z" fill="#fff4c0"/><rect x="49" y="4" width="7" height="24" rx="2" fill="#fff4c0"/></svg>')+'") center/contain no-repeat}';document.head.appendChild(st);}
{const _hw=hudW2;hudW2=function(cine){const r=_hw.apply(this,arguments);const on=k5On();if(document.body.classList.contains('k5pic')!==on)document.body.classList.toggle('k5pic',on);if(on){const v=$('vest');if(v&&v.style.display!=='none')v.style.display='none';}return r;};}
{const _up=updatePrompts;updatePrompts=function(){if(K5PIC.mute()){for(const b of document.querySelectorAll('#bubs .bub'))b.style.display='none';return;}return _up.apply(this,arguments);};}
// баннеры: заголовок события оставляем, подпись-указание (мелкий текст) — убираем
{const _bn=banner;banner=function(text,color,dur,sub){if(k5On()&&sub&&typeof sub==='string'&&/[А-Яа-яЁё]/.test(sub))sub='';return _bn.call(this,text,color,dur,sub);};}
