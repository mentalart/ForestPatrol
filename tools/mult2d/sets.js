// Общие декорации 2D-сериала: ночное небо, книжка-разворот, лак, палехская рамка, ледяная пыль, моргание, жест сказителя.
'use strict';
(() => {
const {seg, twos, PAL} = MD;
const sky = (ctx, t, a = '#1A2148', b = '#3B4C8E', seed = 11) => {
  const g = ctx.createLinearGradient(0, 0, 0, 1500); g.addColorStop(0, a); g.addColorStop(1, b);
  ctx.fillStyle = g; ctx.fillRect(-400, -600, 1880, 3100);
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .35; ctx.fillStyle = MD.grain(ctx); ctx.fillRect(-400, -600, 1880, 3100); ctx.restore();
  MD.stars(ctx, seed, 34, t, '#F7E7B5', [-100, -300, 1280, 1500], 7);
};
const book = ctx => {
  MD.paper(ctx, MD.P('M-60,1500 L540,1462 L540,2000 L-60,2040 Z'), PAL.paper, {shadow: 1.2});
  MD.paper(ctx, MD.P('M1140,1500 L540,1462 L540,2000 L1140,2040 Z'), '#F3E7CE', {shadow: 1.2});
  ctx.save(); ctx.strokeStyle = 'rgba(160,140,110,.45)'; ctx.lineWidth = 3;
  for (let i = 1; i < 7; i++) { const y = 1462 + i * 64; ctx.beginPath(); ctx.moveTo(-40, y + 38 - i * 2); ctx.lineTo(520, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(560, y); ctx.lineTo(1120, y + 38 - i * 2); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(120,95,60,.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(540, 1462); ctx.lineTo(540, 2000); ctx.stroke(); ctx.restore();
};
const lacquer = (ctx, t, seed = 21) => {
  ctx.fillStyle = PAL.lac; ctx.fillRect(-400, -600, 1880, 3100);
  MD.radial(ctx, 560, 760, 1100, 'rgba(80,30,95,.75)', 'rgba(14,10,16,0)', 'source-over');
  MD.stars(ctx, seed, 26, t, '#E8B84A', [-100, -300, 1280, 1600], 6);
};
const border = ctx => {   // золотая орнаментная рамка палехской шкатулки — в экранных координатах
  const r1 = new Path2D(); r1.roundRect(34, 34, 1012, 1852, 14); MD.glow(ctx, r1, '#D9A93A', 3, 8);
  const r2 = new Path2D(); r2.roundRect(52, 52, 976, 1816, 10); ctx.save(); ctx.setLineDash([3, 14]); MD.glow(ctx, r2, '#D9A93A', 4, 4); ctx.restore();
  for (const [x, y] of [[34, 34], [1046, 34], [34, 1886], [1046, 1886]]) MD.glow(ctx, MD.circle(x, y, 18), '#D9A93A', 3, 8);
};
const frost = (ctx, t, seed, n, box) => {  // ледяная пыль Кощея
  const R = MD.rng(seed); ctx.save(); ctx.fillStyle = 'rgba(200,250,255,.7)';
  for (let i = 0; i < n; i++) { const x = box[0] + R() * box[2], sp = 30 + R() * 60, y = box[1] + box[3] - ((R() * box[3] + t * sp) % box[3]), r = 2 + R() * 4;
    ctx.globalAlpha = .3 + .5 * R(); ctx.beginPath(); ctx.arc(x + Math.sin(t + i) * 12, y, r, 0, 7); ctx.fill(); }
  ctx.restore();
};
const blinkAt = (t, list) => list.some(b => t >= b && t < b + .12);
// Взмах сказителя «на двойках»: правый рукав поднимается на ударных словах.
const gesture = (t, a, b) => { const k = seg(t, a, a + .4) * (1 - seg(t, b - .4, b)); return k * (.55 + .12 * Math.sin(twos(t) * 5)); };

MD.set = {sky, book, lacquer, border, frost, blinkAt, gesture};
})();
