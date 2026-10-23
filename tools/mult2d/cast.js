// Куклы и декорации 2D-сериала (стиль — docs/47_mult2d_stil.md). Каждая кукла — функция (ctx, st), рисует от своей точки опоры.
// Детали — бумага (MD.paper) на шарнирах; позы двигаются «на двойках» (MD.twos) в сценах.
'use strict';
MD.cast = {};
const PAL = MD.PAL = {
  ink: '#171012', paper: '#FBF3E2', gold: '#F0C04A', goldDeep: '#C8901E', lac: '#0E0A10', plum: '#4B1F52',
  lilac: '#A77BD8', lilacDeep: '#8D62C2', lilacLight: '#C7A6EC', cream: '#F3E3C3', orange: '#E8743B',
  moss: '#3E8E5E', mossDeep: '#2D6B4A', mossLight: '#5DB37A', night: '#24305E', bone: '#DDD5C8', ice: '#9FF6FF', red: '#D23B3B',
};

// ---------- Звенышко: живое звено, глаза в просвете кольца ----------
MD.cast.zven = (ctx, st = {}) => {
  const sx = st.sx ?? 1, sy = st.sy ?? 1, s = st.s ?? 1;
  ctx.save(); ctx.scale(s * sx, s * sy); ctx.rotate(st.r || 0);
  if (st.glow) MD.radial(ctx, 0, 0, 190, `rgba(255,214,110,${.55 * st.glow})`);
  const ring = new Path2D(); ring.ellipse(0, 0, 60, 80, 0, 0, Math.PI * 2); ring.ellipse(0, 0, 34, 54, 0, 0, Math.PI * 2);
  ctx.save(); ctx.shadowColor = 'rgba(10,10,32,.5)'; ctx.shadowBlur = 14; ctx.shadowOffsetX = 4; ctx.shadowOffsetY = 8;
  ctx.fillStyle = PAL.gold; ctx.fill(ring, 'evenodd'); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .45; ctx.fillStyle = MD.grain(ctx); ctx.fill(ring, 'evenodd'); ctx.restore();
  ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = PAL.goldDeep; ctx.stroke(ring); ctx.restore();
  ctx.save(); ctx.strokeStyle = 'rgba(255,255,240,.85)'; ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.ellipse(0, 0, 47, 67, 0, 3.6, 4.4); ctx.stroke(); ctx.restore();
  if (st.face !== false) {
    const lx = (st.look?.[0] || 0) * 4, ly = (st.look?.[1] || 0) * 4, bl = st.blink || 0;
    for (const ex of [-14, 14]) {
      ctx.save(); ctx.translate(ex, -8); ctx.scale(1, 1 - bl * .9);
      ctx.fillStyle = '#FFF8EA'; ctx.beginPath(); ctx.arc(0, 0, 13, 0, 7); ctx.fill();
      ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.arc(lx + 1, ly + 1, 6.5, 0, 7); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(lx + 3.5, ly - 2.5, 2.2, 0, 7); ctx.fill(); ctx.restore();
    }
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); if (st.oh) ctx.ellipse(0, 22, 6, 8, 0, 0, 7); else ctx.arc(0, 14, 10, .3, Math.PI - .3); ctx.stroke();
  }
  ctx.restore();
};

// ---------- Пелагея: совушка-яйцо, кокошник-обруч, крыло с карандашом на шарнире ----------
MD.cast.pelageya = (ctx, st = {}) => {
  const look = st.look || [0, 0], eye = st.eye ?? 1, bl = st.blink || 0, ru = st.ruffle || 0, hap = st.happy || 0;
  ctx.save();
  // лапки
  for (const fx of [-70, 70]) MD.paper(ctx, MD.P(`M${fx - 34},250 L${fx + 34},250 L${fx + 22},280 L${fx},268 L${fx - 22},280 Z`), PAL.orange, {shadow: .5});
  // дальнее крыло
  ctx.save(); ctx.translate(190, -30); ctx.rotate(.25 + Math.sin((st.t || 0) * 2) * .03);
  MD.paper(ctx, MD.ellipse(10, 110, 62, 140), PAL.lilacDeep, {shadow: .6}); ctx.restore();
  // тело-яйцо, грудка с пёрышками
  MD.paper(ctx, MD.P('M0,-262 C142,-262 216,-110 216,40 C216,182 122,264 0,264 C-122,264 -216,182 -216,40 C-216,-110 -142,-262 0,-262Z'), PAL.lilac);
  MD.paper(ctx, MD.ellipse(0, 120, 132, 122), PAL.lilacLight, {shadow: .35});
  ctx.save(); ctx.strokeStyle = 'rgba(110,70,160,.55)'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  for (let r = 0; r < 3; r++) for (let i = -2 + (r % 2) * .5; i <= 2; i++) { const x = i * 46, y = 60 + r * 52; ctx.beginPath(); ctx.arc(x, y, 20, .4, Math.PI - .4); ctx.stroke(); }
  ctx.restore();
  // ушки-пёрышки
  for (const sgn of [-1, 1]) { ctx.save(); ctx.translate(sgn * 140, -205); ctx.rotate(sgn * (.25 + ru * .35));
    MD.paper(ctx, MD.P(`M${-30 * sgn},20 L${8 * sgn},-62 L${34 * sgn},16 Z`), PAL.lilacDeep, {shadow: .5}); ctx.restore(); }
  // лицевой диск
  const disc = new Path2D(); disc.arc(-74, -96, 94, 0, 7); disc.moveTo(168, -96); disc.arc(74, -96, 94, 0, 7); disc.moveTo(124, -40); disc.ellipse(0, -40, 124, 82, 0, 0, 7);
  MD.paper(ctx, disc, PAL.cream, {shadow: .45});
  // щёчки
  MD.radial(ctx, -128, -22, 46, 'rgba(240,120,140,.45)', 'rgba(240,120,140,0)', 'source-over');
  MD.radial(ctx, 128, -22, 46, 'rgba(240,120,140,.45)', 'rgba(240,120,140,0)', 'source-over');
  // глаза
  for (const ex of [-74, 74]) {
    ctx.save(); ctx.translate(ex, -100); ctx.scale(eye, eye);
    if (hap > .5) { ctx.strokeStyle = PAL.ink; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 18, 36, Math.PI + .5, -.5); ctx.stroke(); ctx.restore(); continue; }
    MD.paper(ctx, MD.circle(0, 0, 62), PAL.gold, {shadow: .3, grain: .3});
    ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.arc(look[0] * 20, look[1] * 20, 31, 0, 7); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(look[0] * 20 + 11, look[1] * 20 - 12, 10, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(look[0] * 20 - 10, look[1] * 20 + 12, 4, 0, 7); ctx.fill();
    if (bl > 0) { ctx.beginPath(); ctx.rect(-70, -70, 140, 140 * bl); ctx.clip(); MD.paper(ctx, MD.circle(0, 0, 64), PAL.lilacDeep, {shadow: 0}); }
    ctx.restore();
  }
  // клюв
  MD.paper(ctx, MD.P('M-20,-52 L20,-52 L0,-6 Z'), PAL.orange, {shadow: .4});
  if (st.oh) { ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.ellipse(0, 6, 9, 12, 0, 0, 7); ctx.fill(); }
  // кокошник-обруч с тремя бусинами
  ctx.save(); ctx.lineCap = 'round'; ctx.shadowColor = 'rgba(10,10,32,.45)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 6;
  ctx.strokeStyle = PAL.gold; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(-176, -196); ctx.quadraticCurveTo(0, -400, 176, -196); ctx.stroke(); ctx.restore();
  for (const [bx, by] of [[-58, -282], [0, -300], [58, -282]]) MD.paper(ctx, MD.circle(bx, by, 16), PAL.red, {shadow: .4, grain: .3});
  // ближнее крыло с карандашом — на шарнире-гвоздике
  ctx.save(); ctx.translate(-186, -40); ctx.rotate(st.wing ?? .3);
  MD.paper(ctx, MD.ellipse(-6, 120, 64, 146), PAL.lilacDeep);
  if (st.pencil) { ctx.save(); ctx.translate(-6, 250); ctx.rotate(-.9);
    MD.paper(ctx, MD.P('M-12,0 L12,0 L12,120 L0,150 L-12,120 Z'), '#F2B100', {shadow: .5}); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.moveTo(-4, 140); ctx.lineTo(4, 140); ctx.lineTo(0, 150); ctx.fill(); ctx.restore(); }
  MD.paper(ctx, MD.circle(0, 0, 11), PAL.gold, {shadow: .3, grain: .2});
  ctx.restore();
  ctx.restore();
};

// ---------- тетрадка Пелагеи ----------
MD.cast.notebook = (ctx, st = {}) => {
  ctx.save();
  MD.paper(ctx, MD.P('M-250,0 L0,-26 L250,0 L250,150 L0,124 L-250,150 Z'), '#7A3A16', {shadow: .8});
  MD.paper(ctx, MD.P('M-236,-6 L0,-30 L0,116 L-236,138 Z'), PAL.paper, {shadow: .3});
  MD.paper(ctx, MD.P('M236,-6 L0,-30 L0,116 L236,138 Z'), '#F3E7CE', {shadow: .3});
  ctx.strokeStyle = 'rgba(80,90,150,.35)'; ctx.lineWidth = 3;
  for (let i = 0; i < 5; i++) { const y = 2 + i * 24; ctx.beginPath(); ctx.moveTo(-216, y + 20 - i * 1.5); ctx.lineTo(-20, y - 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(20, y - 2); ctx.lineTo(216, y + 20 - i * 1.5); ctx.stroke(); }
  // строчки сказки, которые пишет Пелагея (длина — st.write 0…1)
  ctx.strokeStyle = 'rgba(60,40,90,.85)'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  const w = st.write ?? 1;
  for (let i = 0; i < 4; i++) { const k = MD.clamp(w * 4 - i); if (k <= 0) break; const y = -2 + i * 24;
    ctx.beginPath(); ctx.moveTo(-206, y + 18 - i * 1.5); for (let x = 0; x <= 170 * k; x += 10) ctx.lineTo(-206 + x, y + 18 - i * 1.5 - x * .1 + Math.sin(x * .3 + i) * 3); ctx.stroke(); }
  if (st.glow) MD.radial(ctx, 0, 40, 320, `rgba(255,214,110,${.8 * st.glow})`);
  ctx.restore();
};

// ---------- Кощей: крупный план в палехском регистре ----------
MD.cast.koscheiFace = (ctx, st = {}) => {
  const open = st.open ?? 1, flare = st.flare || 0;
  ctx.save();
  // волосы за лицом
  MD.paper(ctx, MD.P('M-210,-250 C-300,0 -300,260 -250,560 L-120,560 C-170,300 -190,60 -150,-200Z M210,-250 C300,0 300,260 250,560 L120,560 C170,300 190,60 150,-200Z'), '#26102C', {shadow: .6, grain: .3, edgeColor: 'rgba(217,169,58,.5)'});
  // воротник-стойка
  MD.paper(ctx, MD.P('M-460,640 C-420,360 -300,250 -150,230 L150,230 C300,250 420,360 460,640 L460,900 L-460,900Z'), PAL.plum, {grain: .35, edgeColor: 'rgba(217,169,58,.7)'});
  ctx.save(); ctx.strokeStyle = 'rgba(217,169,58,.85)'; ctx.lineWidth = 3;
  for (let i = 0; i < 9; i++) { const x = -360 + i * 90; ctx.beginPath(); ctx.arc(x, 560, 30, Math.PI, 0); ctx.stroke(); ctx.beginPath(); ctx.arc(x, 560, 12, 0, 7); ctx.stroke(); }
  ctx.restore();
  // лицо
  const face = MD.P('M0,-330 C150,-330 200,-200 190,-40 C180,120 92,262 0,300 C-92,262 -180,120 -190,-40 C-200,-200 -150,-330 0,-330Z');
  MD.paper(ctx, face, PAL.bone, {grain: .5, edgeColor: 'rgba(217,169,58,.9)', edgeW: 4});
  MD.radial(ctx, -118, 80, 80, 'rgba(90,40,100,.4)', 'rgba(90,40,100,0)', 'source-over');
  MD.radial(ctx, 118, 80, 80, 'rgba(90,40,100,.4)', 'rgba(90,40,100,0)', 'source-over');
  // борода-клин
  MD.paper(ctx, MD.P('M-70,220 C-36,330 -12,430 0,500 C12,430 36,330 70,220 C30,260 -30,260 -70,220Z'), '#8E8698', {shadow: .5, grain: .4});
  // брови, нос, рот
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#2A1230'; ctx.lineWidth = 16;
  ctx.beginPath(); ctx.moveTo(-160, -150 + flare * 14); ctx.lineTo(-44, -96); ctx.stroke(); ctx.beginPath(); ctx.moveTo(160, -150 + flare * 14); ctx.lineTo(44, -96); ctx.stroke();
  ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(60,30,70,.7)'; ctx.beginPath(); ctx.moveTo(0, -60); ctx.quadraticCurveTo(14, 40, 0, 70); ctx.stroke();
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-50, 160); ctx.quadraticCurveTo(0, 140 + (st.speak || 0) * 20, 50, 160); ctx.stroke(); ctx.restore();
  // глазницы и светящиеся зрачки
  for (const ex of [-82, 82]) {
    MD.paper(ctx, MD.ellipse(ex, -48, 58, 36 * (.35 + .65 * open)), '#2A1230', {shadow: 0, grain: .2, edge: false});
    if (open > .05) {
      MD.radial(ctx, ex, -48, 70 + flare * 90, `rgba(159,246,255,${.35 + flare * .5})`);
      ctx.save(); ctx.shadowColor = PAL.ice; ctx.shadowBlur = 20 + flare * 30; ctx.fillStyle = '#E8FFFF';
      ctx.beginPath(); ctx.ellipse(ex + (st.lookX || 0) * 16, -46, 13, 13 * open, 0, 0, 7); ctx.fill(); ctx.restore();
    }
  }
  // корона
  const crown = MD.P('M-210,-292 L-200,-420 L-150,-330 L-110,-520 L-62,-350 L0,-590 L62,-350 L110,-520 L150,-330 L200,-420 L210,-292 C120,-320 -120,-320 -210,-292Z');
  MD.paper(ctx, crown, '#D9A93A', {grain: .4, edgeColor: 'rgba(255,240,190,.6)'});
  for (const [jx, jy, r] of [[0, -400, 22], [-110, -360, 15], [110, -360, 15], [-200, -330, 10], [200, -330, 10]]) MD.paper(ctx, MD.circle(jx, jy, r), '#B3203A', {shadow: .3, grain: .2});
  ctx.restore();
};

// ---------- рука Кощея: рукав справа, длинные пальцы; grip 0…1 сжимает ----------
MD.cast.koscheiHand = (ctx, st = {}) => {
  const g = st.grip || 0;
  ctx.save();
  MD.radial(ctx, 0, 0, 260, `rgba(150,70,200,${.45 * (st.aura ?? 1)})`);
  MD.paper(ctx, MD.P('M60,-70 L900,-230 L900,230 L60,70 C90,30 90,-30 60,-70Z'), PAL.plum, {grain: .35, edgeColor: 'rgba(217,169,58,.8)'});
  ctx.save(); ctx.strokeStyle = 'rgba(217,169,58,.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(80, -50); ctx.lineTo(80, 50); ctx.stroke(); ctx.beginPath(); ctx.moveTo(110, -60); ctx.lineTo(110, 60); ctx.stroke(); ctx.restore();
  MD.paper(ctx, MD.ellipse(10, 0, 70, 58), PAL.bone, {grain: .4, edgeColor: 'rgba(217,169,58,.8)'});
  const fingers = [[-30, -48, 1.0], [-50, -16, 1.15], [-50, 16, 1.1], [-34, 46, .9]];
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const [fx, fy, L] of fingers) {
    const a1 = Math.PI + (fy * .004) - g * .9, a2 = a1 - (.3 + g * 1.4);
    const x1 = fx + Math.cos(a1) * 80 * L, y1 = fy + Math.sin(a1) * 80 * L, x2 = x1 + Math.cos(a2) * 70 * L, y2 = y1 + Math.sin(a2) * 70 * L;
    const p = new Path2D(); p.moveTo(fx, fy); p.lineTo(x1, y1); p.lineTo(x2, y2);
    ctx.save(); ctx.shadowColor = 'rgba(10,10,32,.5)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 6; ctx.strokeStyle = PAL.bone; ctx.lineWidth = 24; ctx.stroke(p); ctx.restore();
    ctx.save(); ctx.strokeStyle = 'rgba(217,169,58,.75)'; ctx.lineWidth = 2; ctx.stroke(p); ctx.restore();
  }
  ctx.restore();
};

// ---------- дуб у Лукоморья: бумажный и палехский (золотая линия на лаке) ----------
MD.OAK = {base: 1480, top: 770, cx: 540};
const OAK_TRUNK = 'M462,1480 C490,1300 500,1100 490,900 C486,830 515,785 540,772 C565,785 594,830 590,900 C580,1100 590,1300 618,1480 Z';
const OAK_BR = ['M500,980 C440,930 380,900 300,880 L306,850 C390,866 450,890 510,940Z', 'M582,940 C640,880 720,850 800,840 L804,872 C730,880 650,910 590,990Z', 'M520,820 C500,760 470,700 430,650 L455,636 C495,686 528,750 545,812Z'];
const OAK_CROWN = [[540, 560, 190], [370, 640, 150], [710, 640, 150], [300, 780, 110], [780, 780, 110], [450, 450, 130], [640, 450, 130], [540, 700, 140]];
MD.cast.oakPaper = (ctx, t, popT) => {
  MD.pop(ctx, t, popT, MD.OAK.base, () => {
    MD.paper(ctx, MD.P(OAK_TRUNK), '#7A4A2A');
    ctx.save(); ctx.strokeStyle = 'rgba(60,30,15,.5)'; ctx.lineWidth = 5; for (const x of [500, 530, 560, 585]) { ctx.beginPath(); ctx.moveTo(x, 1460); ctx.bezierCurveTo(x + 6, 1250, x - 6, 1050, x, 880); ctx.stroke(); } ctx.restore();
    for (const b of OAK_BR) MD.paper(ctx, MD.P(b), '#6A3F22', {shadow: .6});
  });
  MD.pop(ctx, t, popT + .25, 900, () => {
    const cols = ['#2E7D4F', '#3E8E5E', '#4AA06A', '#2D6B4A'];
    OAK_CROWN.forEach(([x, y, r], i) => MD.paper(ctx, MD.circle(x, y + Math.sin(t * 1.2 + i) * 4, r), cols[i % 4], {shadow: .9}));
  }, .8);
};
MD.cast.oakGold = (ctx, t, k, o = {}) => {
  const fall = o.fall || 0;
  OAK_CROWN.forEach(([x, y, r], i) => {
    const R = MD.rng(i * 13 + 5), fy = fall * (300 + R() * 700) * fall, a = 1 - fall * .9;
    ctx.save(); ctx.globalAlpha = MD.clamp(k * 1.5 - .3) * a; ctx.translate(x + fall * (R() - .5) * 300, y + fy);
    MD.paper(ctx, MD.circle(0, 0, r), '#1E5A48', {shadow: .4, grain: .3, edgeColor: 'rgba(217,169,58,.8)', edgeW: 3});
    ctx.strokeStyle = 'rgba(217,169,58,.55)'; ctx.lineWidth = 2; for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.arc(0, 0, r * (.35 + j * .2), -2.6 + j, -1 + j); ctx.stroke(); }
    ctx.restore();
  });
  MD.drawOn(ctx, MD.P('M462,1480 C490,1300 500,1100 490,900 C486,830 515,785 540,772'), '#E8B84A', 7, k, 900);
  MD.drawOn(ctx, MD.P('M618,1480 C590,1300 580,1100 590,900 C594,830 565,785 540,772'), '#E8B84A', 7, k, 900);
  for (const b of ['M500,980 C440,930 380,900 300,880', 'M582,940 C640,880 720,850 800,840', 'M520,820 C500,760 470,700 430,650', 'M300,1500 C420,1470 660,1470 800,1500'])
    MD.drawOn(ctx, MD.P(b), '#E8B84A', 5, MD.clamp(k * 1.3 - .3), 700);
};

// Цепь по спирали вокруг ствола. Возвращает звенья {x,y,rot,front} — для разрыва.
MD.chainLinks = () => {
  const out = [];
  for (let i = 0; i < 26; i++) { const y = 1430 - i * 25, ph = i * .62, w = 64 + (1430 - y) * -.012;
    out.push({x: 540 + Math.sin(ph) * w, y: y + Math.cos(ph) * 10, rot: i % 2 ? Math.PI / 2 : 0, front: Math.cos(ph) > 0, i}); }
  return out;
};
MD.cast.link = (ctx, l, o = {}) => {
  ctx.save(); ctx.translate(l.x, l.y); ctx.rotate(l.rot + (o.spin || 0)); const sc = o.s ?? 1; ctx.scale(sc, sc);
  const hot = o.hot || 0, col = hot > 0 ? `rgb(${240 + 15 * hot},${192 + 63 * hot},${74 + 181 * hot})` : PAL.gold;
  if (o.glow) MD.radial(ctx, 0, 0, 60, `rgba(255,214,110,${o.glow * .7})`);
  const back = l.front === false && !o.free;
  ctx.globalAlpha = back ? .55 : 1;
  ctx.save(); ctx.shadowColor = o.lac ? col : 'rgba(10,10,32,.5)'; ctx.shadowBlur = o.lac ? 16 + hot * 20 : 8; ctx.shadowOffsetY = o.lac ? 0 : 4;
  ctx.strokeStyle = col; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(0, 0, 13, 21, 0, 0, 7); ctx.stroke(); ctx.restore();
  ctx.strokeStyle = 'rgba(255,255,230,.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, 13, 21, 0, 3.7, 4.5); ctx.stroke();
  ctx.restore();
};
