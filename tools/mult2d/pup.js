// Куклы-перекладки из деталей ChatGPT (sprites/<герой>/…, нарезка — cut.py). Координаты — в пикселях листа деталей,
// масштаб задаёт сцена. Рот — форма Rhubarb (A–H, X — покой), глаза — набор (open, half, shut, wow, side, happy).
'use strict';
MD.pup = {};
(() => {
const S = MD.spr, M = m => (!m || m === 'X') ? 'A' : m;
const OPEN = {X: 0, A: 0, B: .3, C: .6, D: 1, E: .7, F: .35, G: .2, H: .5};

// Пелагея: тело, голова с лицевым диском, глаза, клюв, кокошник, крылья на шарнирах (ближнее — с карандашом).
MD.pup.pelageya = (ctx, st = {}) => {
  const P = 'pelageya/', t = st.t || 0;
  const eyes = {open: ['eye_l', 'eye_r'], half: ['eye_half_l', 'eye_half_r'], shut: ['eye_shut_l', 'eye_shut_r'], happy: ['eye_shut_l', 'eye_shut_r'],
    wow: ['eye_wow_l', 'eye_wow_r'], side: ['eye_side_l', 'eye_side_r']}[st.eyes || 'open'];
  S(ctx, P + 'wing_r', 158, 0, {ax: .5, ay: .08, rot: -(st.wingR ?? .12)});
  S(ctx, P + 'foot_l', -70, 352, {s: .8, ay: .15}); S(ctx, P + 'foot_r', 70, 352, {s: .8, ay: .15});
  S(ctx, P + 'body', 0, 150);
  ctx.save(); ctx.translate(0, -112); ctx.rotate(st.tilt || 0);
  S(ctx, P + 'head', 0, 0);
  const es = st.eyeScale ?? 1;
  S(ctx, P + eyes[0], -78, -6, {s: .98 * es, shadow: .3}); S(ctx, P + eyes[1], 78, -6, {s: .98 * es, shadow: .3});
  S(ctx, P + 'mouth_' + M(st.mouth), 0, 92, {s: .5, shadow: .3});
  S(ctx, P + 'kokoshnik', 0, -170, {s: .95, ax: .5, ay: .5, shadow: .5});
  ctx.restore();
  ctx.save(); ctx.translate(-158, 0); ctx.rotate(st.wing ?? .12);
  S(ctx, P + 'wing_l', 0, 0, {ax: .5, ay: .08});
  if (st.pencil) { ctx.save(); ctx.translate(-10, 230); ctx.rotate(-.8);
    MD.paper(ctx, MD.P('M-12,0 L12,0 L12,120 L0,150 L-12,120 Z'), '#F2B100', {shadow: .5});
    ctx.fillStyle = MD.PAL.ink; ctx.beginPath(); ctx.moveTo(-4, 140); ctx.lineTo(4, 140); ctx.lineTo(0, 150); ctx.fill(); ctx.restore(); }
  ctx.restore();
};

// Звенышко: кольцо, в просвете — лицо (диск, глаза, рот); ореол — по желанию; без лица — просто звено (st.face=false).
MD.pup.zven = (ctx, st = {}) => {
  const Z = 'zvenyshko/';
  ctx.save(); ctx.scale((st.s ?? 1) * (st.sx ?? 1), (st.s ?? 1) * (st.sy ?? 1)); ctx.rotate(st.r || 0);
  if (st.glow) S(ctx, Z + 'halo', 0, 0, {s: 1.6, op: 'lighter', alpha: st.glow * .85, shadow: 0});
  if (st.face !== false) S(ctx, Z + 'face', 0, 4, {s: .62, shadow: 0});
  S(ctx, Z + 'ring', 0, 0);
  if (st.face !== false) {
    const e = {open: ['eye_l', 'eye_r'], half: ['eye_half_l', 'eye_half_r'], happy: ['eye_happy_l', 'eye_happy_r'], side: ['eye_side_l', 'eye_side_r']}[st.eyes || 'open'];
    S(ctx, Z + e[0], -27, -26, {s: .42, shadow: .2}); S(ctx, Z + e[1], 27, -26, {s: .42, shadow: .2});
    S(ctx, Z + 'mouth_' + (st.mouth && st.mouth !== 'X' ? st.mouth : 'X'), 0, 48, {s: .48, shadow: .2});
  }
  ctx.restore();
};

// Кот Учёный: хвост, лапы, кафтан, рукава (правый — жест сказителя), голова с очками и ртом.
MD.pup.kot = (ctx, st = {}) => {
  const K = 'kot/', t = st.t || 0;
  S(ctx, K + 'tail', 150, 440, {ax: .15, ay: .95, rot: .25 + .12 * Math.sin(t * 1.7)});
  S(ctx, K + 'leg', -78, 455, {ay: 0, s: .8}); S(ctx, K + 'leg', 78, 455, {ay: 0, s: .8, flip: true});
  S(ctx, K + 'robe', 0, 250);
  S(ctx, K + 'sleeve_l', -168, 50, {ax: .5, ay: .05, rot: st.armL ?? .15});
  S(ctx, K + 'sleeve_r', 168, 50, {ax: .5, ay: .05, rot: st.armR ?? -.15});
  ctx.save(); ctx.translate(0, -68); ctx.rotate(st.tilt || 0);
  S(ctx, K + 'head', 0, 0);
  const eyes = {open: 'eyes', half: 'eyes_half', shut: 'eyes_shut', left: 'eyes_side_l', right: 'eyes_side_r'}[st.eyes || 'open'];
  S(ctx, K + eyes, 0, -22, {s: .82, shadow: .3});
  S(ctx, K + 'brow_l', -58, -78 - (st.brow || 0) * 12, {s: .8, shadow: .2}); S(ctx, K + 'brow_r', 58, -78 - (st.brow || 0) * 12, {s: .8, shadow: .2});
  S(ctx, K + 'mouth_' + M(st.mouth), 0, 66, {s: .78, shadow: .2});
  ctx.restore();
};

// Кощей, бюст (стиль «лак»): глаза светятся льдом, рот открывается по форме Rhubarb.
MD.pup.koscheiBust = (ctx, st = {}) => {
  S(ctx, 'koschei/bust_sad', 0, 0, {rim: 'rgba(232,184,74,.9)', rimBlur: 26});
  const open = st.open ?? 1, fl = st.flare || 0;
  for (const ex of [-19, 19]) {
    MD.radial(ctx, ex, -40, 26 + fl * 40, `rgba(159,246,255,${(.25 + fl * .55) * open})`);
    if (open > .05) { ctx.save(); ctx.shadowColor = MD.PAL.ice; ctx.shadowBlur = 10 + fl * 16; ctx.fillStyle = `rgba(225,255,255,${.6 + .4 * fl})`;
      ctx.beginPath(); ctx.ellipse(ex, -40, 5.5, 3.2 * open, 0, 0, 7); ctx.fill(); ctx.restore(); }
  }
  const o = OPEN[st.mouth || 'X'] || 0;
  if (o > 0) { ctx.save(); ctx.fillStyle = '#2A1020'; ctx.beginPath(); ctx.ellipse(0, 30, 9, 2 + o * 7, 0, 0, 7); ctx.fill(); ctx.restore(); }
};
// Рука Кощея: рукав с кистью, плечо — точка опоры, rot=π/2 — рука тянется влево.
MD.pup.koscheiArm = (ctx, st = {}) => {
  S(ctx, 'koschei/arm_l', 0, 0, {ax: .5, ay: .02, rot: st.rot ?? Math.PI / 2, s: st.s ?? 1, rim: 'rgba(232,184,74,.85)', rimBlur: 22});
};
})();
