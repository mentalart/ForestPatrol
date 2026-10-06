/* ============================== k5epic · ПОДСКАЗКИ БЕЗ ТЕКСТА: ПИКТОГРАММЫ (K5PIC) ============================== */
// По отзыву: подсказки должны понимать дети, которые ещё не читают. Значит, никаких фраз — только картинки и кнопки:
//  • K5PIC.SVG — набор крупных цветных значков (герой, двое, щит, удар, прыжок, кувырок, предмет, свет, колокол, огонь, глаз, замок…);
//  • K5PIC.h(list, size) — значки строкой для подсказки над героем (prompt): ['two','+','hit'] — «двое + удар»; '>' — стрелка, '+' — плюс;
//  • K5PIC.spr(list, size) — те же значки спрайтом в мире (над целью, над другом, над кругом); K5PIC.float(pos, list) — значок всплывает
//    вместо текстовой всплывашки;
//  • карточки начала стадии (t4Run) рисуются без текста: значки-«фраза» и большая кнопка, которую надо нажать, чтобы пойти дальше;
//  • текстовые всплывашки-указания («Разом!», «не в такт», «нужен синий свет»…) сами превращаются в значки (таблица K5PIC.RX).
// Работает только в «Битве с Кощеем» (k5epic); остальная игра не меняется.
const K5PIC={};FIN.k5pic=K5PIC;
{const S=(b)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'+b+'</svg>',ST='stroke="#2a1a10" stroke-width="3" stroke-linejoin="round"';
  const kid=(x,c,s)=>{s=s||1;return '<g transform="translate('+x+' 0) scale('+s+')"><circle cx="0" cy="18" r="9" fill="#ffd8b0" '+ST+'/><path d="M-13 58 Q-12 31 0 31 Q12 31 13 58Z" fill="'+c+'" '+ST+'/></g>';};
  K5PIC.SVG={
    kid:S(kid(32,'#e0784a')),
    two:S(kid(20,'#e0784a',0.82)+kid(44,'#3fa8a0',0.82)),
    sync:S('<circle cx="32" cy="32" r="22" fill="none" stroke="#ffd76a" stroke-width="6"/><path d="M18 32 H46 M32 18 V46" stroke="#ffd76a" stroke-width="6" stroke-linecap="round"/>'),
    shield:S('<path d="M32 5 L55 13 V30 Q55 49 32 59 Q9 49 9 30 V13Z" fill="#6aa8ff" '+ST+'/><path d="M32 13 V51 M17 27 H47" stroke="#e8f2ff" stroke-width="4" opacity=".75"/>'),
    hit:S('<path d="M32 3 L38 21 L58 17 L44 31 L59 46 L38 42 L32 61 L26 42 L5 46 L20 31 L6 17 L26 21Z" fill="#ffd76a" '+ST+'/><circle cx="32" cy="32" r="8" fill="#fff4c0"/>'),
    jump:S('<path d="M32 4 L50 24 H39 V42 H25 V24 H14Z" fill="#9ff0a8" '+ST+'/><path d="M8 56 H56" stroke="#2a1a10" stroke-width="5" stroke-linecap="round"/><path d="M20 50 Q32 44 44 50" stroke="#2a1a10" stroke-width="3" fill="none" stroke-dasharray="3 4"/>'),
    roll:S('<path d="M50 34 A18 18 0 1 1 33 15" fill="none" stroke="#ff9a6a" stroke-width="9" stroke-linecap="round"/><path d="M27 3 L43 15 L27 27Z" fill="#ff9a6a" '+ST+'/>'),
    item:S('<circle cx="32" cy="34" r="21" fill="#ffd76a" '+ST+'/><path d="M14 28 Q32 42 50 25 M16 42 Q34 28 52 41 M24 15 Q31 34 22 53" stroke="#b07a20" stroke-width="3" fill="none"/>'),
    yarn:S('<circle cx="30" cy="34" r="20" fill="#ffd76a" '+ST+'/><path d="M14 28 Q30 42 46 25 M16 42 Q32 28 48 41" stroke="#b07a20" stroke-width="3" fill="none"/><path d="M48 46 Q60 54 52 60" stroke="#ffd76a" stroke-width="4" fill="none"/>'),
    light:S('<circle cx="32" cy="32" r="26" fill="#fff0a0" opacity=".45"/><circle cx="32" cy="32" r="15" fill="#ffd76a" '+ST+'/>'),
    lightB:S('<circle cx="32" cy="32" r="26" fill="#9ab8ff" opacity=".45"/><circle cx="32" cy="32" r="15" fill="#6a8aff" '+ST+'/>'),
    lightG:S('<circle cx="32" cy="32" r="26" fill="#ffe08a" opacity=".5"/><circle cx="32" cy="32" r="15" fill="#ffc840" '+ST+'/>'),
    bell:S('<path d="M32 7 Q14 11 16 40 L10 48 H54 L48 40 Q50 11 32 7Z" fill="#ffd76a" '+ST+'/><circle cx="32" cy="53" r="5" fill="#7a4a10"/>'),
    bellK:S('<path d="M32 7 Q14 11 16 40 L10 48 H54 L48 40 Q50 11 32 7Z" fill="#2a2030" '+ST+'/><circle cx="32" cy="53" r="5" fill="#9a50ff"/>'),
    wave:S('<path d="M2 42 Q12 24 22 42 T42 42 T62 42" stroke="#7ad8ff" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M2 54 Q12 40 22 54 T42 54 T62 54" stroke="#3a98c8" stroke-width="5" fill="none"/>'),
    ring:S('<circle cx="32" cy="32" r="22" fill="none" stroke="#ffd76a" stroke-width="7"/><circle cx="32" cy="32" r="29" fill="none" stroke="#ffd76a" stroke-width="2" stroke-dasharray="4 5"/>'),
    redring:S('<circle cx="32" cy="32" r="24" fill="#ff3a30" opacity=".35"/><circle cx="32" cy="32" r="24" fill="none" stroke="#ff3a30" stroke-width="6"/>'),
    fire:S('<path d="M32 3 Q47 21 43 33 Q51 29 49 21 Q61 40 47 56 Q32 64 17 56 Q3 40 19 22 Q19 34 25 34 Q19 17 32 3Z" fill="#ff8a30" '+ST+'/><path d="M32 30 Q40 42 36 50 Q32 56 27 50 Q24 42 32 30Z" fill="#ffd76a"/>'),
    eye:S('<path d="M3 32 Q32 5 61 32 Q32 59 3 32Z" fill="#fff" '+ST+'/><circle cx="32" cy="32" r="11" fill="#d8401a"/><circle cx="32" cy="32" r="4" fill="#200"/>'),
    lock:S('<rect x="13" y="28" width="38" height="29" rx="5" fill="#ffd76a" '+ST+'/><path d="M21 28 V20 Q21 7 32 7 Q43 7 43 20 V28" fill="none" stroke="#2a1a10" stroke-width="6"/><circle cx="32" cy="41" r="4" fill="#2a1a10"/>'),
    chain:S('<rect x="6" y="20" width="28" height="18" rx="9" fill="none" stroke="#3a3040" stroke-width="7"/><rect x="30" y="26" width="28" height="18" rx="9" fill="none" stroke="#3a3040" stroke-width="7"/>'),
    gchain:S('<rect x="6" y="20" width="28" height="18" rx="9" fill="none" stroke="#e8b830" stroke-width="7"/><rect x="30" y="26" width="28" height="18" rx="9" fill="none" stroke="#e8b830" stroke-width="7"/>'),
    clock:S('<path d="M15 6 H49 M15 58 H49" stroke="#2a1a10" stroke-width="5" stroke-linecap="round"/><path d="M19 6 Q19 26 32 32 Q19 38 19 58 H45 Q45 38 32 32 Q45 26 45 6Z" fill="#ffe8b0" '+ST+'/><path d="M24 54 Q32 44 40 54Z" fill="#e0a040"/>'),
    stone:S('<path d="M9 52 Q3 37 17 33 Q16 16 33 18 Q47 9 53 26 Q63 34 55 52Z" fill="#e8e4ff" stroke="#5a5090" stroke-width="3"/>'),
    wind:S('<path d="M6 22 H40 Q50 22 50 14 Q50 7 43 8" stroke="#9fd8ff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M6 34 H52 Q60 34 60 42 Q60 50 52 49" stroke="#9fd8ff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M6 46 H30" stroke="#9fd8ff" stroke-width="6" stroke-linecap="round"/>'),
    oak:S('<rect x="27" y="34" width="10" height="26" fill="#6a4a2a" '+ST+'/><circle cx="32" cy="24" r="18" fill="#4a8a3a" '+ST+'/><circle cx="18" cy="32" r="10" fill="#4a8a3a" '+ST+'/><circle cx="46" cy="32" r="10" fill="#4a8a3a" '+ST+'/>'),
    hut:S('<path d="M12 30 L32 12 L52 30Z" fill="#8a5a30" '+ST+'/><rect x="16" y="30" width="32" height="18" fill="#c08a50" '+ST+'/><path d="M24 48 L20 60 M40 48 L44 60" stroke="#e0a040" stroke-width="5" stroke-linecap="round"/>'),
    run:S('<circle cx="40" cy="12" r="8" fill="#ffd8b0" '+ST+'/><path d="M38 22 L30 38 L40 46 L36 60 M30 38 L18 46 M36 26 L48 34 M34 28 L20 26" stroke="#e0784a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M4 30 H14 M2 40 H12" stroke="#9fd8ff" stroke-width="4" stroke-linecap="round"/>'),
    no:S('<circle cx="32" cy="32" r="25" fill="none" stroke="#ff3a30" stroke-width="7"/><path d="M14 14 L50 50" stroke="#ff3a30" stroke-width="7"/>'),
    check:S('<circle cx="32" cy="32" r="27" fill="#9ff0a8" '+ST+'/><path d="M17 33 L28 44 L48 21" stroke="#1a5a2a" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
    star:S('<path d="M32 4 L40 23 L60 24 L44 37 L50 58 L32 46 L14 58 L20 37 L4 24 L24 23Z" fill="#ffd76a" '+ST+'/>'),
    heart:S('<path d="M32 56 Q6 38 10 20 Q14 8 26 10 Q32 12 32 20 Q32 12 38 10 Q50 8 54 20 Q58 38 32 56Z" fill="#ff8ab0" '+ST+'/>'),
    call:S('<path d="M8 12 H56 V42 H30 L18 54 V42 H8Z" fill="#fff4c0" '+ST+'/><circle cx="22" cy="27" r="4" fill="#e0784a"/><circle cx="32" cy="27" r="4" fill="#e0784a"/><circle cx="42" cy="27" r="4" fill="#e0784a"/>'),
    water:S('<path d="M32 5 Q50 30 50 40 Q50 58 32 58 Q14 58 14 40 Q14 30 32 5Z" fill="#7ad8ff" '+ST+'/><path d="M24 40 Q24 48 32 50" stroke="#fff" stroke-width="4" fill="none"/>'),
    gusli:S('<path d="M8 50 L24 10 L56 22 L44 54Z" fill="#c08a50" '+ST+'/><path d="M20 44 L30 16 M27 46 L36 19 M34 48 L42 21 M41 50 L48 24" stroke="#fff4c8" stroke-width="2"/>'),
    fish:S('<path d="M6 32 Q22 14 44 26 L58 16 L54 32 L58 48 L44 38 Q22 50 6 32Z" fill="#4a6a5a" '+ST+'/><circle cx="16" cy="29" r="3" fill="#c8ff6a"/>'),
    notes:S('<path d="M22 46 V12 L50 6 V40" stroke="#2a1a10" stroke-width="5" fill="none"/><ellipse cx="16" cy="47" rx="8" ry="6" fill="#ffd76a" '+ST+'/><ellipse cx="44" cy="41" rx="8" ry="6" fill="#ffd76a" '+ST+'/>'),
    book:S('<path d="M4 14 Q18 8 32 16 Q46 8 60 14 V52 Q46 46 32 54 Q18 46 4 52Z" fill="#fff4dc" '+ST+'/><path d="M32 16 V54" stroke="#2a1a10" stroke-width="3"/><path d="M10 22 Q18 19 26 23 M10 30 Q18 27 26 31 M38 23 Q46 19 54 22 M38 31 Q46 27 54 30" stroke="#b08a60" stroke-width="2"/>'),
    pen:S('<path d="M50 6 Q60 18 36 40 L26 44 L30 34 Q40 14 50 6Z" fill="#2a2030" '+ST+'/><path d="M26 44 L10 58" stroke="#9a50ff" stroke-width="5" stroke-linecap="round"/>'),
    coins:S('<ellipse cx="32" cy="48" rx="20" ry="7" fill="#e8b830" '+ST+'/><ellipse cx="32" cy="38" rx="20" ry="7" fill="#ffd76a" '+ST+'/><ellipse cx="32" cy="28" rx="20" ry="7" fill="#ffe08a" '+ST+'/>'),
    flag:S('<path d="M14 6 V60" stroke="#6a4a2a" stroke-width="5"/><path d="M16 8 H54 L46 20 L54 32 H16Z" fill="#b83a2a" '+ST+'/><circle cx="32" cy="20" r="5" fill="#ffd76a"/>'),
    pull:S('<path d="M56 32 H14" stroke="#e8b830" stroke-width="8" stroke-linecap="round"/><path d="M24 18 L8 32 L24 46" stroke="#e8b830" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
    bone:S('<path d="M14 22 L50 42" stroke="#e8e0c8" stroke-width="9" stroke-linecap="round"/><circle cx="12" cy="18" r="6" fill="#e8e0c8" '+ST+'/><circle cx="18" cy="26" r="6" fill="#e8e0c8" '+ST+'/><circle cx="46" cy="46" r="6" fill="#e8e0c8" '+ST+'/><circle cx="52" cy="38" r="6" fill="#e8e0c8" '+ST+'/>'),
    hammer:S('<rect x="10" y="10" width="34" height="16" rx="3" fill="#8a8a96" '+ST+'/><path d="M30 26 L48 58" stroke="#8a5a30" stroke-width="8" stroke-linecap="round"/>'),
    anvil:S('<path d="M6 20 H52 Q58 20 58 26 H42 V36 H50 V46 H14 V36 H22 V28 H6Z" fill="#5a5a66" '+ST+'/><path d="M30 6 L34 14 L40 8" stroke="#ffd76a" stroke-width="3" fill="none"/>'),
    stairs:S('<path d="M6 58 V46 H20 V34 H34 V22 H48 V10 H58 V58Z" fill="#c08a50" '+ST+'/>'),
    ink:S('<path d="M32 8 Q44 18 50 14 Q58 24 50 32 Q60 42 48 50 Q42 60 32 54 Q20 62 14 50 Q4 44 12 34 Q4 22 16 18 Q22 6 32 8Z" fill="#2a1040" stroke="#9a50ff" stroke-width="3"/>'),
    shadow:S('<path d="M32 6 Q44 6 44 20 Q52 28 50 58 H14 Q12 28 20 20 Q20 6 32 6Z" fill="#1a1028" stroke="#9a50ff" stroke-width="3"/><circle cx="27" cy="18" r="3" fill="#d08aff"/><circle cx="37" cy="18" r="3" fill="#d08aff"/>'),
    lantern:S('<rect x="20" y="18" width="24" height="32" rx="4" fill="#fff0a0" '+ST+'/><path d="M26 18 V10 H38 V18 M18 50 H46" stroke="#2a1a10" stroke-width="4"/>'),
    bird:S('<path d="M8 36 Q22 18 40 26 Q52 18 60 22 Q52 30 48 34 Q44 50 24 50 Q12 48 8 36Z" fill="#ffb040" '+ST+'/><circle cx="44" cy="28" r="3" fill="#2a1a10"/><path d="M58 22 L64 20 L58 26Z" fill="#e05020"/>'),
    giant:S('<circle cx="32" cy="14" r="9" fill="#2a2230" '+ST+'/><rect x="18" y="24" width="28" height="22" rx="6" fill="#ffd76a" '+ST+'/><path d="M22 46 V60 M42 46 V60 M18 28 L8 44 M46 28 L56 44" stroke="#e8b830" stroke-width="7" stroke-linecap="round"/><circle cx="32" cy="35" r="5" fill="#9a40ff"/>'),
    dragon:S('<path d="M12 50 Q14 34 32 34 Q50 34 52 50Z" fill="#4a8a3a" '+ST+'/><path d="M22 36 Q16 22 14 12 M32 34 V8 M42 36 Q48 22 50 12" stroke="#4a8a3a" stroke-width="7" stroke-linecap="round"/><circle cx="14" cy="10" r="6" fill="#5aa04a" '+ST+'/><circle cx="32" cy="7" r="6" fill="#5aa04a" '+ST+'/><circle cx="50" cy="10" r="6" fill="#5aa04a" '+ST+'/>'),
    koschei:S('<circle cx="32" cy="16" r="10" fill="#e8e0d8" '+ST+'/><path d="M22 10 L26 2 L30 8 L34 2 L38 8 L42 2" stroke="#ffd76a" stroke-width="3" fill="none"/><path d="M14 60 Q16 28 32 28 Q48 28 50 60Z" fill="#2a1a3a" '+ST+'/>'),
    friend:S('<circle cx="32" cy="22" r="14" fill="#9ff0a8" '+ST+'/><circle cx="27" cy="20" r="2.5" fill="#2a1a10"/><circle cx="37" cy="20" r="2.5" fill="#2a1a10"/><path d="M25 27 Q32 33 39 27" stroke="#2a1a10" stroke-width="3" fill="none"/><path d="M14 60 Q16 38 32 38 Q48 38 50 60Z" fill="#6ab06a" '+ST+'/>'),
    stupa:S('<path d="M14 26 H50 L44 56 H20Z" fill="#8a6a4a" '+ST+'/><path d="M46 10 L30 44" stroke="#c0a070" stroke-width="5" stroke-linecap="round"/><path d="M26 44 L36 50 L30 56 L22 50Z" fill="#d8c090"/>'),
    letter:S('<rect x="10" y="8" width="44" height="48" rx="6" fill="#fff4dc" '+ST+'/><path d="M22 46 L32 16 L42 46 M26 36 H38" stroke="#7a4a20" stroke-width="5" fill="none" stroke-linecap="round"/>'),
    cloud:S('<path d="M12 44 Q2 44 4 34 Q6 24 18 26 Q20 12 34 14 Q48 10 50 24 Q62 24 60 36 Q58 46 48 44Z" fill="#f4f0ff" stroke="#5a5090" stroke-width="3"/>'),
    lightning:S('<path d="M38 2 L14 34 H30 L22 62 L50 26 H34Z" fill="#ffe860" '+ST+'/>'),
    up:S('<path d="M32 6 L54 30 H40 V58 H24 V30 H10Z" fill="#9ff0a8" '+ST+'/>'),
    hand:S('<path d="M20 58 V30 Q20 24 25 24 V12 Q25 7 29 7 Q33 7 33 12 V24 Q33 8 37 8 Q41 8 41 13 V26 Q41 12 45 12 Q49 12 49 17 V40 Q49 58 34 58Z" fill="#ffd8b0" '+ST+'/>'),
    spark:S('<path d="M32 4 L36 28 L60 32 L36 36 L32 60 L28 36 L4 32 L28 28Z" fill="#fff4a0" '+ST+'/>'),
    wolf:S('<path d="M8 40 Q14 24 30 26 L36 14 L40 26 Q56 26 58 38 L50 40 L46 54 H40 L38 44 H24 L20 54 H14 L14 42Z" fill="#2a1a3a" stroke="#9a50ff" stroke-width="3"/><circle cx="46" cy="32" r="3" fill="#c8ff6a"/>')};
  // операторы «фразы»: плюс, стрелка, равно
  K5PIC.OP={'!':S('<path d="M32 6 V40" stroke="#ffd76a" stroke-width="11" stroke-linecap="round"/><circle cx="32" cy="54" r="6" fill="#ffd76a"/>'),'+':S('<path d="M32 12 V52 M12 32 H52" stroke="#fff4c0" stroke-width="9" stroke-linecap="round"/>'),
    '>':S('<path d="M8 32 H46 M32 14 L52 32 L32 50" stroke="#9ff0a8" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
    '=':S('<path d="M12 24 H52 M12 40 H52" stroke="#fff4c0" stroke-width="8" stroke-linecap="round"/>')};
  const one=(n,sz)=>{const svg=K5PIC.OP[n]||K5PIC.SVG[n]||'';return svg.replace('<svg ','<svg width="'+sz+'" height="'+sz+'" class="k5i'+(K5PIC.OP[n]?' k5op':'')+'" ');};
  K5PIC.h=(list,sz,pi)=>{if(!list)return '';if(typeof list==='string')list=[list];return '<span class="k5pics">'+list.map(n=>n[0]==='@'?'<span class="k5kc">'+K(pi||0,n.slice(1))+'</span>':one(n,sz||34)).join('')+'</span>';};
  K5PIC.one=one;
  // ---------- значок в мире: спрайт из SVG (картинка грузится сама, текстура обновится) ----------
  const TEXC={};
  K5PIC.tex=list=>{if(typeof list==='string')list=[list];const key=list.join('|');if(TEXC[key])return TEXC[key];const n=list.length,c=document.createElement('canvas');c.width=128*n;c.height=128;const tex=new THREE.CanvasTexture(c);TEXC[key]=tex;
    const g=c.getContext('2d');list.forEach((nm,i)=>{const svg=K5PIC.OP[nm]||K5PIC.SVG[nm];if(!svg)return;const img=new Image();img.onload=()=>{g.drawImage(img,i*128+6,6,116,116);tex.needsUpdate=true;};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});return tex;};
  K5PIC.spr=(list,size)=>{if(typeof list==='string')list=[list];const n=list.length;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:K5PIC.tex(list),transparent:true,depthTest:false,depthWrite:false,fog:false}));
    sp.scale.set((size||1.4)*n,size||1.4,1);sp.renderOrder=12;sp.raycast=()=>{};sp.userData.noBatch=true;return sp;};
  // всплывает значок (вместо текстовой всплывашки)
  K5PIC.float=(pos,list,size)=>{if(!W||!W.group||K5PIC.mute&&K5PIC.mute())return null;const sp=K5PIC.spr(list,size||1.1);sp.position.copy(pos);W.group.add(sp);const y0=pos.y;
    let t=0;const life=1.6;W.updates.push(function f(dt){t+=dt;sp.position.y=y0+t*0.9;sp.material.opacity=t<life-0.5?1:Math.max(0,(life-t)/0.5);if(t>=life){if(sp.parent)sp.parent.remove(sp);const i=W.updates.indexOf(f);if(i>=0)W.updates.splice(i,1);}});return sp;};}
// стиль значков в подсказках и карточках
{const st=document.createElement('style');st.textContent=
  '.k5pics{display:inline-flex;gap:4px;align-items:center;vertical-align:middle;margin-left:4px}.k5kc{display:inline-flex;align-items:center;margin:0 4px;transform:scale(1.15)}.obj .k5pics{margin:0;gap:6px}.k5pics .k5i{filter:drop-shadow(0 2px 2px rgba(0,0,0,.45))}.k5pics .k5op{opacity:.9}'+
  '.k5pc{display:flex;flex-direction:column;align-items:center;gap:14px;padding:6px 4px}.k5pc-row{display:flex;gap:10px;align-items:center;justify-content:center}'+
  '.k5pc-row .k5i{animation:k5bob 1.4s ease-in-out infinite;filter:drop-shadow(0 4px 4px rgba(0,0,0,.45))}.k5pc-row .k5i:nth-child(2){animation-delay:.2s}.k5pc-row .k5i:nth-child(3){animation-delay:.4s}.k5pc-row .k5i:nth-child(4){animation-delay:.6s}.k5pc-row .k5i:nth-child(5){animation-delay:.8s}'+
  '.k5pc-keys{display:flex;gap:14px;align-items:center;justify-content:center;font-size:30px}.k5pc-key{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:14px;background:rgba(255,255,255,.08)}'+
  '.k5pc-key.wait{animation:k5pulse .7s ease-in-out infinite}.k5pc-key.done{background:rgba(159,240,168,.35)}.k5pc-dot{width:18px;height:18px;border-radius:50%;display:inline-block;border:2px solid #fff}'+
  '@keyframes k5bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes k5pulse{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(255,215,106,.7)}50%{transform:scale(1.18);box-shadow:0 0 0 10px rgba(255,215,106,0)}}';
  document.head.appendChild(st);}
const k5On=()=>!!(FIN.k5e&&FIN.k5e.on&&W&&W.levelId==='5-B2');
// стадия без подсказок (FIN.k5e.noHint, p6): ни значков, ни слов во всплывашках, ни кнопок-подсказок над героями и целями
K5PIC.mute=()=>{const E=FIN.k5e;return k5On()&&!!(E&&E.noHint&&E.noHint());};
// ---------- карточки (t4Run) без текста: «фраза» значками и кнопка ----------
// card.pics — значки ('+', '>' — знаки); нет pics — значок карточки; card.key — кнопка, которую надо нажать (карточка ждёт её)
const K5ICONMAP={candle:['fire'],key:['lock'],lock:['lock'],spark:['spark'],orb:['light'],sword:['hit'],needle:['pen'],anvil:['anvil'],wave:['wave'],wind:['wind'],hand:['hand'],raven:['bird'],red:['redring'],yellow:['shield'],blue:['shield'],shield:['shield'],hit:['hit'],eye:['eye'],drop:['water'],clock:['clock'],go:['>'],ring:['ring'],n123:['notes']};
{const _ch=t4CardHTML;t4CardHTML=function(c,got,st){if(!k5On()||!c)return _ch(c,got,st);const pics=c.pics||K5ICONMAP[c.icon]||['star'];
  const keys=(c.keys||[]).map(k=>{const s=got&&got[k.pi]?'done':(st==='wait'?'wait':'');return '<span class="k5pc-key '+s+'">'+(G.solo?'':'<span class="k5pc-dot" style="background:'+(k.pi?'#3fa8a0':'#e0784a')+'"></span>')+K(k.pi,k.a)+(got&&got[k.pi]?K5PIC.one('check',30):'')+'</span>';}).join('');
  const tail=st==='ok'?K5PIC.one('star',64):st==='auto'?K5PIC.one('check',52):'';
  return '<div class="k5pc"><div class="k5pc-row">'+pics.map(n=>K5PIC.one(n,n.length===1?56:96)).join('')+tail+'</div>'+(keys?'<div class="k5pc-keys">'+keys+'</div>':'')+'</div>';};}
// текстовые всплывашки-указания → значки (только в битве)
K5PIC.RX=[[/^\s*[+-]?\d+\s*\/\s*\d+\s*$/,null],[/^-?\d+ лепест/i,null],
  [/ваш черёд.*гусли|ваш черёд.*садко/i,['gusli','>','water']],[/прилив/i,['water','up']],[/не тот/i,['bell','no']],[/долго|ещё раз|снова/i,['clock']],
  [/разом|вместе|второй.*тоже|вдвоём|с двух сторон|и второй замок/i,['two','sync']],[/не в такт|слабо/i,['notes','no']],[/в такт/i,['notes','check']],[/ух! жару/i,['fire','up']],[/остыло|меха/i,['fire','>','anvil']],
  [/нужен синий/i,['lightB']],[/нужен золотой/i,['lightG']],[/нужен свет/i,['light']],[/свет печали/i,['lightB','check']],[/свет радости/i,['lightG','check']],[/свет погас|украла свет/i,['light','no']],
  [/свет вернулся|держи свет/i,['light','check']],[/свет — к птице/i,['light','>','bird']],[/голова поднята|ждите/i,['dragon','clock']],[/голова опустилась/i,['dragon','>','two','hit']],
  [/сначала заманите|бегает/i,['hut','>','oak']],[/нить!|нога спутана/i,['yarn','check']],[/распуталась|вырвалась/i,['yarn','no']],[/насквозь|тень плоская/i,['light','>','shadow']],
  [/знамя лежит|строй не пойд|строй отходит/i,['flag','no']],[/знамя поднято/i,['flag','check']],[/знамя упало|рубят древко/i,['flag','no']],[/рог! к знамёнам|к знамени/i,['flag','!']],
  [/перекличка короче|сбился/i,['koschei','star']],[/открыт|выдохся|бейте/i,['koschei','>','hit']],[/опомнился/i,['koschei','clock']],[/спесь сбита/i,['koschei','star']],
  [/великан на колене/i,['giant','>','up','>','two','hit']],[/нога замерла|заклёпк/i,['lock','hit']],[/аркан|подтянул/i,['chain','hand']],[/цепь разрублена/i,['chain','check']],[/кольцо лопнуло/i,['ring','check']],[/треснуло/i,['ring','two','hit']],
  [/клещи — взял/i,['hand','check']],[/уронили/i,['hand','no']],[/отбил щуку/i,['fish','check']],[/перепрыгнул|увернулся/i,['jump','check']],[/устоял|удержали|не смотрю/i,['shield','check']],[/заслушался/i,['book','koschei']],
  [/перетянул! щиты/i,['shield','!']],[/тяни|тянем/i,['pull','!']],[/упал с облака|назад к кузне|горячо/i,['heart']],[/жар-птица поймала/i,['bird','check']],[/унёс|бросил/i,['koschei','hand']],
  [/пусти/i,['hand','!']],[/порыв/i,['wind']],[/вижу/i,['lantern','eye']],[/золотое яичко/i,['heart','up']],[/орешек/i,['star']],[/натяни кудель|разойдитесь/i,['two','>','gchain']],[/крутится — жди/i,['clock']],
  [/слышу тебя|я здесь/i,['call','check']],[/чёрная вода/i,['ink','no']],[/благовест/i,['bell','check']],[/это же/i,['friend','!']],[/мимо/i,['no']],[/морок/i,['shadow','no']],[/слово сбито/i,['letter','no']],
  [/удар!|ещё!?$/i,['hit']],[/прочь|уйди/i,['run']],[/подними/i,['flag','up']],[/подсказк|нажми|держи/i,['hand']],[/^(раз|два|и…)$/i,['notes']],
  [/[А-Яа-яЁё]{3,}.*!|^[А-ЯЁ]/,['star']]];
{const _ft=floatText;floatText=function(pos,txt,col){if(k5On()&&typeof txt==='string'){const m=/^\s*([+-]?\d+)\s*лепест/i.exec(txt);if(m)return _ft.call(this,pos,m[1],col);   // «-1 лепесток» → «-1»
    if(K5PIC.mute()&&/[А-Яа-яЁё]/.test(txt))return;   // стадия без подсказок: слова и значки не всплывают (числа — да)
    for(const [rx,pics] of K5PIC.RX)if(rx.test(txt)){if(pics){K5PIC.float(pos,pics);return;}break;}}return _ft.apply(this,arguments);};}
// «весточка» (бонус друга мира 2) — строка текста вверху: в битве не показываем
// подпись пропуска ролика («Пропуск — оба держат») — значком ⏭ (класс k5pic на body, пока идёт битва)
{const st=document.createElement('style');st.textContent='body.k5pic #skip>span:first-child{font-size:0;display:inline-block;width:46px;height:26px;background:url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32"><path d="M4 4 L24 16 L4 28Z M26 4 L46 16 L26 28Z" fill="#fff4c0"/><rect x="49" y="4" width="7" height="24" rx="2" fill="#fff4c0"/></svg>')+'") center/contain no-repeat}';document.head.appendChild(st);}
{const _hw=hudW2;hudW2=function(cine){const r=_hw.apply(this,arguments);const on=k5On();if(document.body.classList.contains('k5pic')!==on)document.body.classList.toggle('k5pic',on);if(on){const v=$('vest');if(v&&v.style.display!=='none')v.style.display='none';}return r;};}
// ---------- карточки стадий: «фраза» значками и кнопка (по заголовку карточки) ----------
// p — значки; k — кнопка, которую карточка просит нажать (герой тут же показывает приём), иначе карточка просто показывает
K5PIC.CARD={
  'Стадия 1 из 12 · У лукоморья дуб зелёный':{p:['koschei','ring','>','fire','no']},'Все восемь — вместе!':{p:['two','+','fire','no']},'Гасите свечи!':{p:['>','fire','no']},
  'Стадия 2 из 12 · Там леший бродит':{p:['friend','chain','>','lightning','>','chain','no']},'Ветер, молнии и костлявые руки':{p:['wind','lightning','hand','>','run']},'Сбейте с него спесь!':{p:['>','koschei','hit']},
  'Стадия 3 из 12 · Там лес и дол видений полны':{p:['koschei','shadow','shadow','>','eye']},'Тень и пар':{p:['koschei','+','eye']},'Щит в последний миг':{p:['ink','>','shield','>','koschei'],k:'guard'},
  'Веретено и кудель':{p:['two','gchain','>','koschei'],k:'item'},
  'Красный зубец — кувырок':{p:['bird','>','roll'],k:'roll'},'Иглы и воронка':{p:['redring','>','run']},'Три костяных щитника':{p:['bone','shield','>','hit']},'Отбивайте шары!':{p:['light','>','shield','>','kid']},
  'Стадия 4 из 12 · Избушка там на курьих ножках':{p:['hut','>','oak','>','yarn']},'Разбег — в дуб':{p:['hut','>','kid','>','oak']},'Клубок — на ноги':{p:['oak','hut','+','yarn'],k:'item'},
  '«Повернись!» и крыша':{p:['two','ring','hit','>','stairs'],k:'attack'},
  'Стадия 5 из 12 · Там о заре прихлынут волны':{p:['bellK','>','bell','>','chain','no']},'Перекличка':{p:['bellK','wave','>','jump'],k:'jump'},'Гусли и прилив':{p:['gusli','>','water','bell'],k:'item'},
  'Благовест':{p:['two','+','bell','>','wave'],k:'attack'},
  'Стадия 6 из 12 · В темнице там царевна тужит':{p:['lightB','lightG','>','lock','lock']},'Свет и мостики':{p:['bird','>','light','>','cloud']},'Фонарь и свист':{p:['lantern','wind','>','shield','stone'],k:'guard'},
  'Кольцо на клюве':{p:['wind','stone','>','two','hit'],k:'attack'},
  'Стадия 7 из 12 · Там на неведомых дорожках':{p:['anvil','>','gchain','>','dragon']},'Меха и молот':{p:['fire','+','hammer','notes'],k:'attack'},'Мост':{p:['fire','>','run','+','eye','no']},
  'Раз-два-три':{p:['dragon','clock','>','two','hit'],k:'attack'},
  'Стадия 9 из 12 · И тридцать витязей прекрасных':{p:['koschei','>','shield','+','hit']},'Волна по земле — прыгай!':{p:['wave','>','jump'],k:'jump'},'Пятеро щитников':{p:['bone','shield','>','hit']},'Щит — и со спины!':{p:['shield','+','run','hit']},
  'Стадия 10 из 12 · Там царь Кащей над златом чахнет':{p:['giant','>','redring','run']},'Леший и заклёпки':{p:['friend','>','lock','hit'],k:'attack'},'На плечо — и в сердце':{p:['dragon','up','>','two','hit','heart'],k:'attack'},
  'Стадия 11 из 12 · Без имён':{p:['two','call','>','hit'],k:'call'},'Все сказки разом':{p:['friend','ring','>','two','shield'],k:'guard'},
  'Стадия 12 из 12 · Златая цепь на дубе том':{p:['pen','>','anvil','>','gchain']},'Куй в такт':{p:['hammer','notes'],k:'attack'},'Заслони Прошку':{p:['shield','>','kid']},'Три цепи и ветер':{p:['chain','hit','wind']},'Куём застёжку!':{p:['>','anvil']}};
{const _ch=t4CardHTML;t4CardHTML=function(c,got,st){if(k5On()&&c&&!c.pics){const m=K5PIC.CARD[c.title];if(m)c.pics=m.p;}return _ch(c,got,st);};}
// ---------- подписи подсказок над героями: текст → значки (кнопка остаётся главной) ----------
K5PIC.NRX=[[/лихо|отвернись/i,['eye','no']],[/жар-птиц/i,['bird','ring']],[/ветер|облачн.*камень/i,['wind','>','stone']],[/свист|щит потапа/i,['wind','>','shield']],[/волна|порыв/i,['wave']],
  [/вырывайся|пусти/i,['hand']],[/гусли|прилив/i,['gusli','water']],[/живая вода/i,['water','heart']],[/золотая нить/i,['gchain']],[/меха/i,['fire','notes']],[/молот/i,['hammer','notes']],[/мостик/i,['light','>','cloud']],
  [/на «три»|раз-два/i,['notes']],[/ступен|наверх/i,['stairs','up']],[/огонь|дорожк/i,['fire','>','run']],[/иглу/i,['pen','>','kid']],[/чёрн.*вод/i,['ink','>','run']],[/разбег|вбок/i,['hut','>','run']],
  [/кости|рубак/i,['bone']],[/смени героя/i,['two']],[/жди молнию/i,['lightning','clock']],[/тень/i,['shadow']],[/лужа/i,['ink','>','run']],[/щука/i,['fish']],[/благовест/i,['bell','two']],
  [/клубок|на ногу/i,['yarn']],[/дуб/i,['oak']],[/на круг/i,['ring','two']],[/этот/i,['bell','star']],[/к знамени/i,['flag']],[/подними знамя/i,['flag','up']],[/черта/i,['pen','>','run']],
  [/свет у птиц|возьми свет/i,['bird','>','light']],[/замки/i,['lock','lock']],[/клещи/i,['hand']],[/к лешему/i,['friend']],[/разом|вместе|по кольцу|вдвоём/i,['two','sync']],[/уходи|уйди|прочь/i,['run']],
  [/щит/i,['shield']],[/бей|руби|удар/i,['hit']]];
K5PIC.NC=new Map();
K5PIC.note=t=>{if(K5PIC.mute())return '';if(typeof t!=='string'||!t||t.indexOf('<svg')>=0||!/[А-Яа-яЁё]/.test(t))return t;let r=K5PIC.NC.get(t);if(r!==undefined)return r;r='';for(const [rx,p] of K5PIC.NRX)if(rx.test(t)){r=K5PIC.h(p,30);break;}K5PIC.NC.set(t,r);return r;};
{const _up=updatePrompts;updatePrompts=function(){if(K5PIC.mute()){for(const b of document.querySelectorAll('#bubs .bub'))b.style.display='none';return;}   // стадия без подсказок — кнопок над героями нет
    if(k5On())for(const pr of W.prompts){if(pr._k5n)continue;pr._k5n=1;let raw=pr.note;
      Object.defineProperty(pr,'note',{configurable:true,get(){return typeof raw==='function'?()=>K5PIC.note(raw()):K5PIC.note(raw);},set(v){raw=v;}});}
    return _up.apply(this,arguments);};}
// баннеры: заголовок события оставляем, подпись-указание (мелкий текст) — значками или убираем
{const _bn=banner;banner=function(text,color,dur,sub){if(k5On()&&sub&&typeof sub==='string'&&/[А-Яа-яЁё]/.test(sub))sub=K5PIC.note(sub)||'';return _bn.call(this,text,color,dur,sub);};}
