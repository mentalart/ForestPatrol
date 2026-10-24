// Серия 1 v4, сцены 1–2: «Ревун» и «Учебная тревога» (51_ser01_v4_plan.md, раздел 3; панели раскадровки 1–12).
// Сосна в разрезе: каждый этаж — своя картина (cherdak, razrez, lestnica, dver), провал у каждого героя по характеру,
// внизу давно стоит Пелагея. Свет — тёплые лампы (LIGHT.lamp), ночь за окнами.
'use strict';
(() => {
const {seg, ease, lerp, clamp, twos} = MD, SP = MD.spr, K = MD.K, S = MD.s4;
const {shot, cue, D, play, listen, A, plate, at, glowAt, flash} = S;
const prop = MD.s4prop;

// =================== 1. Ревун: в темноте луч фонарика на шлеме, лапа дёргает рычаг ===================
const s1 = shot(1.2, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 560, y: 820, z: 1.9}], [L, {x: 540, y: 860, z: 2.05}]], [[.55, 1]]);
  plate(ctx, t, cam, 'v4_cherdak', .9);
  MD.grade(ctx, 'rgba(8,10,32,1)', .82);   // темнота: свет только от фонарика
  MD.layer(ctx, t, cam, 1, c => {
    const pull = MD.anticip(lt, .3, .55, .25, .2);
    A(c, 'proshka', {x: 520, y: 1360, s: .62, light: 'lamp'}, play('proshka', t, {armR: 1.2 + pull * 1.3, elbowR: .4, armL: .5, brow: 1, look: [1, 0], lean: .06 * pull}));
    prop(c, 'helmet', 530, 1360 - 980 * .62 + 70, {w: 230, rot: .08});
    // луч фонарика
    c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(560, 700, 1050, 520); g.addColorStop(0, 'rgba(255,236,170,.55)'); g.addColorStop(1, 'rgba(255,236,170,0)');
    c.fillStyle = g; c.beginPath(); c.moveTo(560, 690); c.lineTo(1150, 380); c.lineTo(1150, 760); c.closePath(); c.fill(); c.restore();
    glowAt(c, 560, 690, 120, .7, '255,236,170');
    prop(c, 'lever', 830, 1180 + pull * 30, {w: 200, rot: -.5 + pull * .9});
  });
}, [[101, .05]]);
cue(s1, .55, 'lever');

// =================== 2. Ревун воет на крыше, шишки летят ===================
const s2 = shot(1.4, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 420, y: 820, z: 1.35}], [L, {x: 430, y: 800, z: 1.42}]], [[.05, 1.4], [.5, .8]]);
  plate(ctx, t, cam, 'v4_krysha', .9);
  MD.layer(ctx, t, cam, 1, c => {
    const [hx, hy] = at(330, 280);   // раструб Ревуна
    for (let i = 0; i < 4; i++) { const u = (lt * 2.2 + i / 4) % 1; c.save(); c.globalAlpha = 1 - u; c.strokeStyle = '#FFE6A0'; c.lineWidth = 10 * (1 - u) + 2;
      c.beginPath(); c.arc(hx + 30, hy, 60 + u * 420, -.9, .5); c.stroke(); c.restore(); }   // звуковые дуги
    const R = MD.rng(5); for (let i = 0; i < 9; i++) { const x0 = 100 + R() * 900, d = R() * .4, u = seg(lt, d, d + .9); if (u <= 0) continue;
      prop(c, 'cone', x0 + Math.sin(i) * 80 * u, 200 + u * u * 1500, {w: 70, rot: u * 8 + i}); }
  });
});
cue(s2, .05, 'siren');

// =================== 3. Гамак лопается — Потап проваливается в люк ===================
const HATCH = {x: 540, y: 1330, w: 480};   // проём люка на картине cherdak (мир)
const s3 = shot(1.3, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 900, z: 1.15}], [L, {x: 540, y: 1000, z: 1.2}]], [[.55, 1.2]]);
  plate(ctx, t, cam, 'v4_cherdak', .92);
  MD.layer(ctx, t, cam, 1, c => {
    const snap = .35, fall = seg(lt, snap, snap + .45), y = lerp(760, HATCH.y + 420, ease.in(fall));
    if (lt < snap) prop(c, 'hammock', 540, 700, {w: 820});
    else { prop(c, 'hammock_l', 230, 620, {w: 380, rot: .6 + MD.spring(lt, snap, 2, 4) * .3}); prop(c, 'hammock_r', 850, 620, {w: 380, rot: -.6 - MD.spring(lt, snap, 2, 4) * .3}); }
    c.save(); if (fall > .5) { c.beginPath(); c.rect(-500, -500, 2100, HATCH.y + 10 + 500); c.clip(); }   // ниже кромки люка — не видно
    A(c, 'potap', {x: 540, y, s: .5, light: 'lamp', shadow: lt < snap}, lt < snap ? {t, eyes: 'shut', mouth: 'X'} : {t, pose: 'startle'});
    c.restore();
    MD.dust(c, lt, snap + .45, 540, HATCH.y, 12);
  });
});
cue(s3, .35, 'snap'); cue(s3, .8, 'thud');

// =================== 4. Прошка висит вниз головой на заевшем блоке ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 470, y: 820, z: 2.3}], [L, {x: 520, y: 840, z: 2.4}]]);
  plate(ctx, t, cam, 'v4_razrez', .92);
  MD.layer(ctx, t, cam, 1, c => {
    const [px, py] = at(430, 470), sw = Math.sin(lt * 3.2) * .16 * Math.exp(-lt * .3);
    c.save(); c.translate(px, py); c.rotate(sw);
    c.strokeStyle = '#7A5A3A'; c.lineWidth = 7; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 120); c.stroke();
    A(c, 'proshka', {x: 0, y: 130, s: .26, light: 'lamp', shadow: false, rot: Math.PI}, play('proshka', t, {armL: 2.6, armR: 2.3, legL: .3, legR: -.3, brow: 1}));
    c.restore();
  });
}, [[102, .1]]);

// =================== 5. Потап застрял в люке вместе с кроваткой, Тишка храпит ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1000, z: 1.25}], [L, {x: 540, y: 1020, z: 1.3}]], [[.15, .6]]);
  plate(ctx, t, cam, 'v4_razrez', .9, {y: 1500});
  MD.layer(ctx, t, cam, 1, c => {
    const wob = Math.sin(twos(t) * 14) * 6;
    A(c, 'potap', {x: 540 + wob, y: 1240, s: .55, light: 'lamp'}, {t, pose: 'stuck', sy: 1 + Math.sin(twos(t) * 7) * .02});
    prop(c, 'bed', 600, 760 + wob * .5, {w: 380, rot: -.12});
    A(c, 'tishka', {x: 600, y: 760, s: .32, light: 'lamp', shadow: false, rot: -.12}, {t, pose: 'sleep'});
    MD.s4.zzz(c, t, 700, 620);
  });
}, [[103, .1]]);

// =================== 6. Йоша волчком по перилам ===================
const s6 = shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 400, y: 700, z: 1.25}], [L, {x: 780, y: 1120, z: 1.3}, 'inOut']]);
  plate(ctx, t, cam, 'v4_lestnica', .92);
  MD.layer(ctx, t, cam, 1, c => {
    const u = ease.in(seg(lt, .1, L)), [x0, y0] = at(150, 260), [x1, y1] = at(760, 900);
    const x = lerp(x0, x1, u), y = lerp(y0, y1, u);
    A(c, 'yosha', {x, y, s: .5, light: 'lamp', shadow: false, blur: u > .1 ? [60, 40] : null}, {t, pose: 'ball', rotP: lt * 18});
  });
}, [[104, .05]]);
cue(s6, .1, 'whoosh');

// =================== 7. Йоша влетает в ведро — торчат иголки и пятки ===================
const s7 = shot(1, (ctx, t, lt, L) => {
  const [cx0, cy0] = at(900, 900); const cam = MD.cam(lt, [[0, {x: cx0, y: cy0, z: 1.6}], [L, {x: cx0, y: cy0 + 20, z: 1.66}]], [[.08, 1.3]]);
  plate(ctx, t, cam, 'v4_lestnica', .92);
  MD.layer(ctx, t, cam, 1, c => {
    const [bx, by] = at(920, 1010), w = MD.spring(lt, .08, 3, 5);
    c.save(); c.translate(bx, by); c.rotate(w * .12);
    A(c, 'yosha', {x: 0, y: -40, s: .42, light: 'lamp', shadow: false, rot: Math.PI}, {t, pose: 'ball'});
    prop(c, 'bucket', 0, 40, {w: 260});
    c.restore();
    MD.burst(c, lt, .08, bx, by - 120, '#FFE6A0', 10, 200);
  });
});
cue(s7, .08, 'bucket');

// =================== 8. Внизу у двери давно стоит Пелагея: «Я тут… уже давно» ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1060, z: 1.25}], [L, {x: 540, y: 1000, z: 1.4}]]);
  plate(ctx, t, cam, 'v4_dver', .92);
  MD.layer(ctx, t, cam, 1, c => {
    A(c, 'pelageya', {x: 540, y: 1520, s: .62, light: 'lamp'}, play('pelageya', t, {wing: .5, wingR: .2, look: [0, -1], tilt: -.04}));
    prop(c, 'lantern', 690, 1300, {w: 120}); glowAt(c, 690, 1300, 260, .4);
    prop(c, 'notebook_closed', 400, 1340, {w: 120, rot: -.2});
  });
}, [[105, .15]]);

// =================== 9. Прошка с секундомером: «Две минуты сорок! Позор, патруль!» ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 560, y: 860, z: 1.55}], [L, {x: 560, y: 840, z: 1.62}]]);
  plate(ctx, t, cam, 'v4_dver', .9);
  MD.layer(ctx, t, cam, 1, c => {
    A(c, 'proshka', {x: 560, y: 1600, s: .72, light: 'lamp'}, play('proshka', t, {armR: 2.2, elbowR: .9, armL: .3, brow: 1, look: [.5, -.5]}));
    prop(c, 'stopwatch', 760, 820, {w: 140, rot: Math.sin(t * 6) * .05});
    prop(c, 'helmet', 575, 1600 - 980 * .72 + 80, {w: 270, rot: .12});
  });
}, [[106, .1]]);

// =================== 10. Пелагея поднимает крыло — сверху валится кроватка с Потапом ===================
const s10 = shot(1.2, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1080, z: 1.1}], [L, {x: 540, y: 1100, z: 1.12}]], [[.55, 1.4]]);
  plate(ctx, t, cam, 'v4_dver', .92);
  MD.layer(ctx, t, cam, 1, c => {
    A(c, 'pelageya', {x: 380, y: 1520, s: .55, light: 'lamp'}, {t, wing: lt > .2 ? 1.6 : .4, mouth: lt > .25 && lt < .5 ? 'C' : 'X', look: [1, -1]});
    const u = ease.in(seg(lt, .2, .55)), y = lerp(-300, 1500, u);
    prop(c, 'bed', 620, y, {w: 520, rot: (1 - u) * .3});
    A(c, 'potap', {x: 640, y: y - 60, s: .4, light: 'lamp', shadow: false}, {t, pose: 'flop'});
    MD.dust(c, lt, .55, 600, 1520, 18);
  });
});
cue(s10, .55, 'thud');

// =================== 11. Журнал крупно: запись сорок вторая (голос Пелагеи за кадром) ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 960, z: 1}], [L, {x: 540, y: 940, z: 1.06}]]);
  MD.layer(ctx, t, cam, .9, c => { c.fillStyle = '#6A3A1E'; c.fillRect(-300, -300, 1700, 2600); glowAt(c, 760, 420, 700, .5); });
  MD.layer(ctx, t, cam, 1, c => {
    prop(c, 'notebook', 540, 980, {w: 980, rot: -.04});
    MD.s4.writing(c, t, lt, 560, 800, 400, ['Учебная тревога', '— Прошка: 2:40', '— Пелагея: первая ✓'], D(107) + D(108));
  });
}, [[107, .2], [108, .2 + D(107) + .2]]);

// =================== 12. Прошка зевает и суёт Пелагее свисток: «Пелагея — дежурная» ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1060, z: 1.2}], [L, {x: 560, y: 1040, z: 1.25}]]);
  plate(ctx, t, cam, 'v4_dver', .92);
  MD.layer(ctx, t, cam, 1, c => {
    const give = MD.anticip(lt, D(109) * .55, D(109) * .55 + .4);
    A(c, 'proshka', {x: 380, y: 1540, s: .6, light: 'lamp'}, play('proshka', t, {eyes: 'half', armR: .8 + give * .9, tilt: .1}));
    A(c, 'pelageya', {x: 760, y: 1540, s: .55, light: 'lamp'}, listen('pelageya', t, {look: [-1, 0], wing: .3 + give * .5}));
    prop(c, 'whistle', lerp(470, 640, give), 1130 + Math.sin(t * 5) * 6, {w: 90});
  });
}, [[109, .15]]);
})();
