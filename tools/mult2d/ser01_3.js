// Серия 1, сцена 3 «Погоня» (сценарий 49_ser01_zvenyshko.md): Пелагея видит искру — её не слышат; погоня ворон по лесу;
// Звенышко влетает в окно и носится по комнате; вороны и глаза Кощея за окном; прятки в тетрадке; рука Кощея ищет в тишине;
// тетрадка-раскладушка; друзья впервые слушают Пелагею.
'use strict';
(() => {
const B0 = MD.ser01.all.length;   // первый план файла — для звуковых меток
const {seg, ease, lerp, clamp, twos, PAL} = MD, SP = MD.spr, K = MD.K, S = MD.ser01;
const {shot, D, play, A, grain, paint, KOM, spark, zvenFace, flash, ribbon} = S;
const WIN = {x: 165, y: 250, r: 205}, FL = 1640;
// что за стеклом круглого окна (поверх картины): o.storm, o.frost, o.fn(c) — рисунок внутри
const inWindow = (c, t, o = {}) => {
  c.save(); c.beginPath(); c.ellipse(WIN.x, WIN.y, WIN.r, WIN.r * 1.05, 0, 0, 7); c.clip();
  if (o.storm) { c.fillStyle = `rgba(20,14,40,${.85 * o.storm})`; c.fillRect(WIN.x - 300, WIN.y - 300, 600, 600); }
  if (o.fn) o.fn(c);
  if (o.frost) { c.fillStyle = `rgba(225,250,255,${.5 * o.frost})`; c.fillRect(WIN.x - 300, WIN.y - 300, 600, 600);
    MD.frostGrow(c, o.frost, 7, WIN.x, WIN.y + WIN.r, -Math.PI / 2, 300, 9); MD.frostGrow(c, o.frost, 8, WIN.x, WIN.y - WIN.r, Math.PI / 2, 300, 9);
    MD.frostGrow(c, o.frost, 9, WIN.x - WIN.r, WIN.y, 0, 260, 7); MD.frostGrow(c, o.frost, 10, WIN.x + WIN.r, WIN.y, Math.PI, 260, 7); }
  c.restore();
};
const room = (ctx, t, cam, o = {}) => {
  paint(ctx, t, cam, 'komnata', .92, {over: c => inWindow(c, t, o)});
  if (o.dark) MD.grade(ctx, 'rgba(20,26,80,1)', .55 * o.dark);
};
const PEL = {x: 470, s: .44}, POT = {x: 760, s: .48}, PRO = {x: 600, s: .44}, YO = {x: 900, s: .52}, TI = {x: 250, y: 1320, s: .62};

// =================== 3-1a. Пелагея у окна: звёздный дождь, одна звезда сворачивает к сосне, за ней — стая ===================
shot(1, (ctx, t, lt, L) => {
  const turn = 1.4, a1 = turn + .25;
  const cam = MD.cam(lt, [[0, {x: 200, y: 380, z: 2.3}], [turn, {x: 210, y: 420, z: 2.2}], [L, {x: 240, y: 440, z: 2.35}]], [[turn, .4]]);
  room(ctx, t, cam, {fn: c => {
    for (let i = 0; i < 10; i++) { const st = (i * .41) % 2.2, u = seg(lt, st, st + .8); if (u <= 0 || u >= 1) continue;
      const x = WIN.x - 150 + (i * 71) % 300, y = WIN.y - 200 + u * 300; c.strokeStyle = `rgba(255,240,190,${1 - u})`; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 30, y - 90); c.stroke(); }
    const k = seg(lt, .5, L), sx = WIN.x + 120 - k * 150 + Math.sin(k * 10) * 30, sy = WIN.y - 150 + k * 170;
    spark(c, sx, sy, .02 + k * .04, lt * 6, d => [WIN.x + 120 - (k - d) * 150 + Math.sin((k - d) * 10) * 30, WIN.y - 150 + (k - d) * 170]);
    if (k > .3) MD.crows(c, t, sx + 100 - k * 40, sy - 70, 6, .08 + k * .05, 40, 6, true);
  }});
  MD.layer(ctx, t, cam, 1, c => {   // Пелагея на подоконнике: смотрит в окно — оборачивается к нам
    A(c, 'pelageya', {x: 220, y: 560, s: .36, shadow: false}, lt < turn ? {t, pose: 'window'} :
      play('pelageya', t, {eyes: 'wow', eyeScale: 1 + .15 * ease.back(seg(lt, turn, turn + .25)), wing: .6, wingR: .6, look: [.6, -.3], brow: 1}));
  });
}, [['ser01_026', 1.65]], {dur: .5, type: 'page'});
// 3-1b. Пробует крикнуть «Летит!» — писк; позади друзья хохочут и не слышат
shot(2.4, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 560, y: 1150, z: 1.15}], [L, {x: 540, y: 1170, z: 1.2}]]);
  room(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => {
    A(c, 'potap', {x: 820, y: FL - 120, s: .42}, {t, pose: 'laugh', sy: 1 + Math.abs(Math.sin(twos(t) * 9)) * .05});
    A(c, 'yosha', {x: 640, y: FL - 100, s: .48, rot: Math.sin(lt * 3) * .5}, {t, pose: 'ball'});
    A(c, 'tishka', {x: TI.x, y: TI.y, s: TI.s, shadow: false}, {t, pose: 'giggle'});
    A(c, 'pelageya', {x: 380, y: FL + 40, s: .52}, lt > .35 && lt < .35 + D('ser01_042') + .2 ? {t, pose: 'squeak', ...MD.jump(lt, .3, .25, 30)} : {t, pose: 'whisper'});
  });
}, [['ser01_042', .4]], {dur: .2, type: 'cut'});

// =================== 3-2. Погоня по ночному лесу: искра петляет между стволами, вороны щёлкают клюв, одна врезается в сосну ===================
const crowPath = (u) => [lerp(-300, 1500, u), 900 + Math.sin(u * 9) * 260];
shot(4.6, (ctx, t, lt, L) => {
  const u = seg(lt, 0, L), smack = 2.4;
  const cam = MD.cam(lt, [[0, {x: 300, y: 950, z: 1.3}], [L, {x: 800, y: 900, z: 1.35}]], [[smack, .6]]);
  paint(ctx, t, cam, 'les_pogonya', .6, {over: c => MD.frostGrow(c, seg(lt, 0, L), 3, 980, 1800, -Math.PI / 2, 900, 6)});
  MD.layer(ctx, t, cam, 1, c => {
    const zp = k => [lerp(-100, 1700, k), 880 + Math.sin(k * 11) * 220];
    const [zx, zy] = zp(u);
    spark(c, zx, zy, .17, lt * 7, d => zp(Math.max(0, u - d * 1.2)));
    MD.crows(c, t, zx - 330, zy + 40, 6, .62, 140, 8);
    if (lt < smack) MD.spr(c, MD.cycle(lt, 'vorony/fly'), zx - 520, zy - 90, {s: .7});   // отставшая ворона летит прямо в ствол
    else { const k = seg(lt, smack, smack + 1.4); MD.spr(c, 'vorony/dizzy', 620, 1180 + k * 260, {s: .65, rot: Math.sin(lt * 8) * .1});
      for (let i = 0; i < 8; i++) { const v = seg(lt, smack, smack + 1.6); c.save(); c.translate(620 + Math.sin(i * 2 + v * 4) * 90, 1080 + v * 320 + i * 12); c.rotate(v * 6 + i);
        MD.paper(c, MD.ellipse(0, 0, 9, 22), '#141020', {shadow: .2}); c.restore(); } }
    MD.burst(c, lt, smack, 600, 1060, '#9FF6FF', 12, 180, .4);
  });
  MD.layer(ctx, t, cam, 1.35, c => {   // ветки переднего плана проносятся мимо
    for (let i = 0; i < 4; i++) { const x = ((i * 520 - lt * 900) % 2400 + 2400) % 2400 - 400; MD.paper(c, MD.P(`M${x},${300 + i * 380} C${x + 120},${280 + i * 380} ${x + 260},${330 + i * 380} ${x + 420},${290 + i * 380} L${x + 430},${320 + i * 380} C${x + 260},${360 + i * 380} ${x + 120},${320 + i * 380} ${x},${340 + i * 380}Z`), '#0E1328', {shadow: .3}); }
  });
}, [], {dur: .5, type: 'lacquer', x: 540, y: 900});

// =================== 3-3. Влёт: окно — бумажными осколками, Звенышко носится по комнате, друзья ловят и все мимо ===================
const BREAK = .35;
const zvenRoute = [[0, [WIN.x, WIN.y]], [BREAK, [WIN.x + 40, WIN.y + 60]], [.9, [TI.x + 20, 980]], [1.4, [576, 230]], [1.9, [POT.x + 20, 1290]], [2.4, [980, 700]],
  [2.9, [PRO.x + 60, 1100]], [3.4, [380, 760]], [3.9, [YO.x - 40, 1330]], [4.5, [540, 760]]];
shot(1, (ctx, t, lt, L) => {
  const say = 4.6, cam = MD.cam(lt, [[0, {x: 420, y: 700, z: 1.35}], [1, {x: 540, y: 960, z: 1.05}], [say, {x: 540, y: 900, z: 1.1}], [L, {x: 540, y: 820, z: 1.6}, 'inOut']],
    [[BREAK, 1.2], [1.4, .4], [1.9, .6], [3.4, .8]]);
  room(ctx, t, cam, {storm: .6, fn: c => MD.crows(c, t, WIN.x + 40, WIN.y, 4, .12, 60, 3)});
  MD.layer(ctx, t, cam, 1, c => {
    const R = MD.rng(12), b = lt - BREAK;   // осколки стекла — бумажные треугольники
    if (b > 0 && b < 1.6) for (let i = 0; i < 16; i++) { const a = R() * 6.28, sp = 300 + R() * 600, x = WIN.x + Math.cos(a) * sp * b, y = WIN.y + Math.sin(a) * sp * b + 900 * b * b;
      c.save(); c.globalAlpha = 1 - b / 1.6; c.translate(x, y); c.rotate(b * 9 + i); MD.paper(c, MD.P('M0,-18 L16,12 L-14,10Z'), '#CDEFFF', {shadow: .3}); c.restore(); }
    // друзья: Тишка в кроватке (колпак слетает), Потап получает в лоб, Прошка и Йоша прыгают ловить — и сталкиваются
    A(c, 'tishka', {x: TI.x, y: TI.y, s: TI.s, shadow: false}, lt > .9 ? {t, pose: 'duck'} : {t, pose: 'bedsad'});
    A(c, 'potap', {x: POT.x, y: FL, s: POT.s}, lt < 1.9 ? {t, pose: 'walk'} : lt < 2.6 ? {t, pose: 'startle', ...MD.jump(lt, 1.9, .4, 60)} : {t, pose: 'flop'});
    A(c, 'proshka', {x: K(lt, [[2.4, PRO.x], [2.9, PRO.x + 80]]), y: FL - 20, s: PRO.s}, lt < 2.4 ? {t, pose: 'point'} : lt < 3.5 ? {t, pose: 'reach', ...MD.jump(lt, 2.4, .5, 140)} : {t, pose: 'fall'});
    A(c, 'yosha', {x: YO.x, y: FL, s: YO.s}, lt < 3.4 ? {t, pose: 'cheer'} : lt < 4.2 ? {t, pose: 'jump', ...MD.jump(lt, 3.4, .5, 120)} : {t, pose: 'dizzy'});
    A(c, 'pelageya', {x: PEL.x - 100, y: FL - 40, s: PEL.s}, {t, pose: 'startle'});
    if (lt > 4.2) MD.dust(c, lt, 4.2, YO.x - 120, FL, 12);
    // Звенышко: маршрут рикошетов, на остановке — лицо и «Спрячьте!»
    const p = MD.K(lt, zvenRoute, 'inOut');
    if (lt < BREAK) spark(c, p[0], p[1], .14, lt * 8);
    else if (lt < 4.5) { spark(c, p[0], p[1], .16, lt * 9, d => MD.K(lt - d * 2, zvenRoute, 'inOut'));
      for (const [hit] of zvenRoute.slice(2)) MD.burst(c, lt, hit, ...MD.K(hit, zvenRoute), '#FFE6A0', 10, 140, .35); }
    else zvenFace(c, 540, 760 + Math.sin(lt * 9) * 10, .42, {mouth: MD.mouth('zven', t), eyes: 'open', r: Math.sin(lt * 20) * .08, sx: 1 + Math.sin(lt * 30) * .04});
  });
  flash(ctx, lt, BREAK, .25, '220,245,255');
}, [['ser01_043', 4.65]], {dur: .4, type: 'cut'});

// =================== 3-4. За окном — вороны бьются в стекло, иней, ледяные глаза Кощея; лампа гаснет; Звенышко ныряет в тетрадку ===================
const DIVE = 1.9, SHUT = 2.6;
shot(3.4, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 220, y: 380, z: 2.0}], [1.2, {x: 260, y: 520, z: 1.6}], [L, {x: 420, y: 820, z: 1.5}]], [[.3, .5], [.8, .5], [SHUT, .7]]);
  const dark = seg(lt, 1.0, 1.4);
  room(ctx, t, cam, {storm: 1, frost: seg(lt, .4, 2.4), dark, fn: c => {
    for (let i = 0; i < 3; i++) { const k = (lt * 2.2 + i * .33) % 1; MD.spr(c, 'vorony/knock', WIN.x - 140 + i * 130, WIN.y + 40 - Math.abs(Math.sin(k * Math.PI)) * 30, {s: .38, flip: i === 2}); }
    const ey = seg(lt, 1.1, 1.4); if (ey > 0) for (const ex of [-50, 50]) { MD.radial(c, WIN.x + ex + Math.sin(t * 2) * 40, WIN.y - 60, 80, `rgba(159,246,255,${ey})`);
      c.fillStyle = `rgba(235,255,255,${ey})`; c.beginPath(); c.ellipse(WIN.x + ex + Math.sin(t * 2) * 40, WIN.y - 60, 22, 11, 0, 0, 7); c.fill(); }
  }});
  MD.layer(ctx, t, cam, 1, c => {
    const nx = 420, ny = 900;   // Пелагея с раскрытой тетрадкой — Звенышко ныряет — хлоп, прижимает к груди
    A(c, 'pelageya', {x: nx, y: ny + 300, s: .46}, lt < SHUT ? {t, pose: 'write'} : {t, pose: 'hug', sy: 1 - MD.spring(lt, SHUT, 3, 5) * .08});
    const u = seg(lt, 1.5, DIVE);
    if (u > 0 && u < 1) spark(c, lerp(560, nx + 10, ease.in(u)), lerp(760, ny + 120, ease.in(u)), .14 * (1 - u * .5), lt * 9, d => [lerp(560, nx + 10, ease.in(Math.max(0, u - d * 3))), lerp(760, ny + 120, ease.in(Math.max(0, u - d * 3)))]);
    if (lt > DIVE && lt < SHUT + .3) MD.radial(c, nx + 10, ny + 110, 240, `rgba(255,214,110,${.8 * (1 - seg(lt, DIVE, SHUT + .3))})`);
    MD.burst(c, lt, SHUT, nx, ny + 100, '#FFF1D6', 10, 160, .35);
  });

}, [], {dur: .3, type: 'cut'});

// =================== 3-5. Тишина: ледяная рука шарит по комнате — все замерли, зажав рты; рука уходит, иней тает ===================
shot(6.2, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1050, z: 1.1}], [L, {x: 520, y: 1080, z: 1.2}]]);
  const back = seg(lt, 4.3, 5.4), dark = 1 - seg(lt, 5.2, 6.0);
  room(ctx, t, cam, {storm: dark, frost: 1 - back, dark});
  MD.layer(ctx, t, cam, 1, c => {
    const shiver = k => Math.sin(twos(t) * 30 + k) * .006;
    A(c, 'tishka', {x: TI.x, y: TI.y, s: TI.s, shadow: false, rot: shiver(1)}, {t, pose: 'hush'});
    A(c, 'potap', {x: 840, y: FL, s: .46, rot: shiver(2)}, {t, pose: 'hush'});
    A(c, 'yosha', {x: 980, y: FL + 20, s: .5, rot: shiver(3)}, {t, pose: 'hush'});
    A(c, 'proshka', {x: 650, y: FL, s: .42, rot: shiver(4)}, {t, pose: 'hush'});
    A(c, 'pelageya', {x: 420, y: FL - 20, s: .48, rot: shiver(5)}, {t, pose: 'hug', sx: 1 + .03 * Math.sin(lt * 2), sy: 1 + .03 * Math.sin(lt * 2)});   // не дышит
    // рука: из окна по дуге над всеми, пальцы шевелятся, проходит в сантиметре от тетрадки и уходит
    const u = seg(lt, .4, 4.3) * (1 - back), hx = lerp(WIN.x, 760, ease.inOut(Math.min(1, u * 1.2))) - Math.sin(u * Math.PI) * 220, hy = lerp(WIN.y + 60, 1180, ease.inOut(u)) - Math.sin(u * Math.PI * 2) * 80;
    if (u > 0) { MD.radial(c, hx, hy, 260, `rgba(120,200,255,${.35 * u})`);
      c.save(); c.globalAlpha = Math.min(1, u * 3); SP(c, 'koschei/ruka_reach', hx, hy, {w: 820, ax: .85, ay: .45, rot: Math.atan2(hy - WIN.y, hx - WIN.x) + Math.PI + Math.sin(lt * 5) * .06, rim: 'rgba(159,246,255,.7)', rimBlur: 22}); c.restore();
      MD.frostGrow(c, u, 4, hx, hy, Math.PI / 2, 120, 5); }
  });
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = .9 * seg(lt, 1.2, 1.6) * (1 - seg(lt, 4.0, 4.4));   // «тсс…» шёпотом на экране
  ctx.fillStyle = '#E8F8FF'; ctx.font = `64px ${MD.FONT.display}`; ctx.textAlign = 'center'; ctx.fillText('т-с-с…', 540, 330); ctx.restore();
}, [], {dur: .3, type: 'cut'});

// =================== 3-6. Тетрадка сама раскрывается: рисунок оживает, звенья выпрыгивают — Звенышко: «Дзинь-дзинь! За мной — бегом!» ===================
shot(1, (ctx, t, lt, L) => {
  const pop = .2, jump = 1.4;
  const cam = MD.cam(lt, [[0, {x: 540, y: 1150, z: 1.15}], [L, {x: 540, y: 1050, z: 1.3}]], [[jump, .6]]);
  room(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => {
    MD.radial(c, 540, 1300, 700, 'rgba(255,214,110,.45)');
    MD.pop(c, t, t - lt + pop, 1560, () => SP(c, 'bg/tetrad_risunok', 540, 1560, {w: 1000, ay: .92}), .7);
    for (let i = 0; i < 4; i++) { const u = seg(lt, .8 + i * .2, 1.5 + i * .2); if (u <= 0 || u >= 1) continue; MD.cast.link(c, {x: 700 + i * 50, y: 1140 - Math.sin(u * Math.PI) * 260, rot: u * 6, front: true}, {glow: .6, s: 1.2}); }
    const j = seg(lt, jump, jump + .5), hover = lt > jump + .5 ? Math.sin((lt - jump - .5) * 5) * 12 : 0, y = lerp(1300, 960, ease.back(j, 2.2)) + hover;
    if (lt > jump) zvenFace(c, 560, y, .5, {sx: j < .15 ? 1.3 : j < .55 ? .82 : 1, sy: j < .15 ? .7 : j < .55 ? 1.22 : 1, mouth: MD.mouth('zven', t), eyes: MD.blinkAuto(t, 10) ? 'half' : 'happy'});
    for (let i = 0; i < 4; i++) MD.stars(c, 900 + Math.floor(t * 8) * 7 + i, 1, t, '#FFE6A0', [400, y - 160, 320, 280], 9);
  });
}, [['ser01_035', 1.9]], {dur: .4, type: 'cut'});

// =================== 3-7. Её услышали: все поворачиваются к Пелагее; Потап: «ты ведь первая увидела?»; Йоша: «Ведёшь — ты!» ===================
shot(1, (ctx, t, lt, L) => {
  const a1 = .4, a2 = a1 + D('ser01_044') + .5, raise = a2 - .3;
  const cam = MD.cam(lt, [[0, {x: 560, y: 1150, z: 1.2}], [a2, {x: 540, y: 1100, z: 1.3}], [L, {x: 470, y: 1000, z: 1.6}]]);
  room(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => {
    A(c, 'potap', {x: 800, y: FL, s: .48}, play('potap', t, {look: [-1, 0], eyes: 'open', tilt: .1, armL: .4}));
    A(c, 'yosha', {x: 980, y: FL + 10, s: .52}, lt > a2 - .1 ? {t, pose: 'cheer', ...MD.jump(lt, a2, .4, 80)} : play('yosha', t, {look: [-1, 0]}));
    A(c, 'proshka', {x: 620, y: FL - 10, s: .44}, lt > raise ? {t, pose: 'point', poseFlip: true} : play('proshka', t, {look: [-1, 0], armR: .2}));
    A(c, 'tishka', {x: 300, y: FL + 20, s: .5}, {t, pose: lt > a2 ? 'jump' : 'hush'});
    zvenFace(c, 470, 1050 + Math.sin(lt * 4) * 12, .26, {eyes: 'happy', mouth: 'X'});
    A(c, 'pelageya', {x: 450, y: FL - 30, s: .5}, lt > a2 + .3 ? {t, pose: 'happy', sy: 1 + MD.spring(lt, a2 + .3, 3, 5) * .06} : play('pelageya', t, {eyes: 'wow', look: [1, 0], wing: .3, wingR: .3}));
  });
  ribbon(ctx, 'ПЕЛАГЕЯ ВЕДЁТ', '#A77BD8', seg(lt, a2 + .6, a2 + 1.0), 300);
}, [['ser01_044', .4], ['ser01_045', .4 + D('ser01_044') + .5]]);
// ---------- звуковые метки (audio_ser01.py) ----------
const Q = (i, lt, n) => S.cue(S.all[B0 + i], lt, n);
Q(0, 0, 'night'); Q(0, 1.4, 'owl_turn'); Q(1, .4, 'squeak'); Q(2, 0, 'chase'); Q(2, 2.4, 'smack'); Q(3, BREAK, 'glass');
for (const [h] of zvenRoute.slice(2)) Q(3, h, 'ricochet'); Q(3, 4.2, 'thud');
Q(4, .3, 'knock'); Q(4, .8, 'knock'); Q(4, 1.1, 'eyes'); Q(4, DIVE, 'dive'); Q(4, SHUT, 'shut'); Q(5, .4, 'hand'); Q(5, 5.2, 'relief'); Q(6, .2, 'popup'); Q(6, 1.4, 'boing'); Q(7, 0, 'warm');
})();
