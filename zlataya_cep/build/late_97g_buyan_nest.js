/* ============================== РЕЛИЗ · МИР 5: ИНДИКАТОР-МАТРЁШКА «СУНДУК → ЗАЯЦ → УТКА → ЯЙЦО → ИГЛА» ============================== */
// Мир 5 устроен как сама сказка: дуб — сундук — заяц — утка — яйцо — игла. Полоска из пяти ячеек показывает, где мы в этой матрёшке:
// пройденная ступень — золотая, текущая — мигает, впереди — тусклая. Где видна: под названием уровня на заставке (уровни мира 5)
// и на карте-рушнике у списка Острова Буяна. Ступени: 5-1 — сундук, 5-2 — заяц, 5-3 — утка, 5-4 — яйцо, 5-Б1/5-Б2 — игла.
const NEST5=[['5-1','сундук','#c89048'],['5-2','заяц','#d8c8a8'],['5-3','утка','#7ac0a0'],['5-4','яйцо','#f4ecd8'],['5-B2','игла','#cfe4ff']];
const nest5Glyph=(i,col)=>{const c=col;return ['<svg viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="9" width="18" height="11" rx="2" fill="'+c+'"/><path d="M3 10 Q12 2 21 10" fill="'+c+'"/><rect x="10.5" y="12" width="3" height="4" fill="#5a3a1a"/></svg>',
  '<svg viewBox="0 0 24 24" width="22" height="22"><ellipse cx="12" cy="15" rx="7" ry="5.5" fill="'+c+'"/><ellipse cx="9" cy="5.5" rx="1.6" ry="5" fill="'+c+'"/><ellipse cx="14" cy="5.5" rx="1.6" ry="5" fill="'+c+'"/></svg>',
  '<svg viewBox="0 0 24 24" width="22" height="22"><ellipse cx="11" cy="15" rx="8" ry="5" fill="'+c+'"/><circle cx="17" cy="8" r="3.4" fill="'+c+'"/><path d="M20 8 L23.5 9 L20 10z" fill="#f0a020"/></svg>',
  '<svg viewBox="0 0 24 24" width="22" height="22"><ellipse cx="12" cy="13" rx="6.5" ry="8.5" fill="'+c+'"/></svg>',
  '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 20 L19 4" stroke="'+c+'" stroke-width="2.4" stroke-linecap="round"/><circle cx="18" cy="5" r="1.6" fill="none" stroke="'+c+'" stroke-width="1.2"/></svg>'][i];};
FIN.nest5=cur=>{const done=id=>id==='5-B2'?!!G.done['5-B2']:!!G.done[id];const curI=cur==='5-B1'?4:NEST5.findIndex(n=>n[0]===cur);
  return '<div class="fin-nest5" style="display:flex;gap:6px;align-items:center;justify-content:center;margin-top:8px;font:600 calc(12px*var(--fts,1)) system-ui">'+
    NEST5.map((n,i)=>{const d=done(n[0]),c=i===curI;const op=d||c?1:0.35;const col=d?'#ffd76a':c?n[2]:'#9aa0b0';
      return (i?'<span style="opacity:.5">→</span>':'')+'<span style="display:inline-flex;flex-direction:column;align-items:center;opacity:'+op+(c?';animation:finNest 1.2s ease-in-out infinite':'')+'">'+nest5Glyph(i,col)+'<span style="color:'+col+'">'+n[1]+'</span></span>';}).join('')+'</div>';};
{const st=document.createElement('style');st.textContent='@keyframes finNest{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}';document.head.appendChild(st);}
{const _st=showTitle;showTitle=function(){_st();if(W&&W.world===5&&W.levelId!=='epi'){const lv=$('level');if(lv&&!lv.querySelector('.fin-nest5'))lv.insertAdjacentHTML('beforeend',FIN.nest5(W.levelId));}};}
// карта-рушник: список Острова Буяна — полоска сверху (карта перерисовывает себя; проверяем раз в 15 кадров)
{let n=0;const _r=render;render=function(){_r();if(G.ui!=='map'||++n%15)return;const el=$('mapui');if(!el||el.style.display==='none')return;
  const buyan=/Остров Буян/.test(el.textContent)&&/Сундук на дубе/.test(el.textContent);const has=el.querySelector('.fin-nest5');
  if(buyan&&!has){const box=document.createElement('div');box.innerHTML=FIN.nest5('');const first=el.firstElementChild;(first||el).insertAdjacentElement('afterbegin',box.firstChild);}
  else if(!buyan&&has)has.remove();};}
