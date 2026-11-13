/* ------------------------------------------------------------------
   The TalentPool365 mascot, drawn on a 2D canvas and shaded to read as
   a 3D render: glossy white plastic lit from the upper left, a cool
   blue rim light from the lower right, soft occlusion where parts
   meet, glass reflections on the visor and a contact shadow below.

   One chassis, five roles. The role changes what it wears and how its
   eyes work, so it reads as the right specialist at each station:
     0 sourcing   - radar dish and targeting-lens eyes
     1 screening  - scanner visor with a sweeping read bar
     2 assessment - examiner's cap and round glasses
     3 interview  - headset band with a boom microphone
     4 offer      - tie, and a smile once the letter is signed
   `u` is the unit size in CSS pixels (the head is about 1.3u wide).
   ------------------------------------------------------------------ */

type Ctx = CanvasRenderingContext2D;

const mix = (a: number, b: number, k: number) => a + (b - a) * k;

const BLUE = '#38BDF8';
const BLUE_DEEP = '#2563EB';
const CORE = '#E0F7FF';
const INK = '#0B1230';

export function box(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function check(ctx: Ctx, x: number, y: number, r: number, mark = '#172554') {
  ctx.fillStyle = '#06B6D4';
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = mark;
  ctx.lineWidth = Math.max(1.5, r * 0.28);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x - r * 0.42, y + r * 0.02);
  ctx.lineTo(x - r * 0.1, y + r * 0.34);
  ctx.lineTo(x + r * 0.46, y - r * 0.3);
  ctx.stroke();
}

export interface BotPose {
  role: number;
  /** Lean while flying, in radians. */
  tilt?: number;
  /** 0-1: how far the working arm reaches toward the task. */
  work?: number;
  /** 1 = task on the right, -1 = on the left. */
  side?: number;
  /** 0-1: arms up, smiling. */
  happy?: number;
  /** 0-1: thruster boost. */
  flying?: number;
  /** 0-1: waving hello with the near arm. */
  wave?: number;
  /** 0-1: near arm raised in a thumbs-up. */
  thumb?: number;
  /** Where the eyes look, each -1 to 1. */
  lookX?: number;
  lookY?: number;
}

function glow(ctx: Ctx, blur: number) {
  ctx.shadowColor = 'rgba(56, 189, 248, .95)';
  ctx.shadowBlur = blur;
}

/**
 * Fills a closed shape as a glossy white solid. `path` must begin and close the
 * path; (cx, cy, rx, ry) is its rough bounding ellipse. `dim` (0-1) darkens
 * parts that sit further from the light.
 */
function solid(ctx: Ctx, path: () => void, cx: number, cy: number, rx: number, ry: number, dim = 0) {
  const r = Math.max(rx, ry);
  ctx.save();

  // base: light falls off from the upper left
  const base = ctx.createRadialGradient(cx - rx * 0.4, cy - ry * 0.5, r * 0.05, cx - rx * 0.1, cy - ry * 0.1, r * 1.45);
  base.addColorStop(0, '#FFFFFF');
  base.addColorStop(0.38, dim ? '#E4EAFB' : '#F4F7FF');
  base.addColorStop(0.72, dim ? '#B7C4EE' : '#CCD7F6');
  base.addColorStop(1, dim ? '#7284C8' : '#8FA1DE');
  ctx.fillStyle = base;
  path();
  ctx.fill();
  ctx.clip();

  // occlusion: the underside turns away from the light
  const under = ctx.createLinearGradient(0, cy - ry * 0.1, 0, cy + ry);
  under.addColorStop(0, 'rgba(60, 78, 160, 0)');
  under.addColorStop(1, `rgba(60, 78, 160, ${0.34 + dim * 0.2})`);
  ctx.fillStyle = under;
  ctx.fillRect(cx - rx * 1.2, cy - ry * 1.2, rx * 2.4, ry * 2.4);

  // rim light: cool blue along the lower right edge, white along the upper left
  const rim = ctx.createLinearGradient(cx - rx, cy - ry, cx + rx, cy + ry);
  rim.addColorStop(0, 'rgba(255, 255, 255, .9)');
  rim.addColorStop(0.42, 'rgba(255, 255, 255, 0)');
  rim.addColorStop(0.6, 'rgba(56, 189, 248, 0)');
  rim.addColorStop(1, 'rgba(56, 189, 248, .85)');
  ctx.strokeStyle = rim;
  ctx.lineWidth = r * 0.14;
  path();
  ctx.stroke();

  // specular: a soft sheen and a sharp glint
  ctx.translate(cx - rx * 0.4, cy - ry * 0.52);
  ctx.rotate(-0.35);
  ctx.scale(1, Math.max(0.3, (ry / rx) * 0.45));
  const sheen = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * 0.42);
  sheen.addColorStop(0, 'rgba(255, 255, 255, .95)');
  sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sheen;
  ctx.beginPath();
  ctx.arc(0, 0, rx * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** Glossy dark ball joint with a glint and a blue rim. */
function joint(ctx: Ctx, x: number, y: number, r: number) {
  const g = ctx.createRadialGradient(x - r * 0.4, y - r * 0.45, r * 0.05, x, y, r);
  g.addColorStop(0, '#7C8BD0');
  g.addColorStop(0.35, '#1E2859');
  g.addColorStop(1, '#04071A');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, .7)';
  ctx.lineWidth = r * 0.16;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.9, Math.PI * 0.05, Math.PI * 0.6);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255, 255, 255, .85)';
  ctx.beginPath();
  ctx.arc(x - r * 0.38, y - r * 0.42, r * 0.14, 0, Math.PI * 2);
  ctx.fill();
}

/** One limb segment shaded as a white cylinder: lit edge, shadow edge and a blue rim. */
function limb(ctx: Ctx, ax: number, ay: number, bx: number, by: number, w: number, dim = 0) {
  const len = Math.hypot(bx - ax, by - ay) || 1;
  let nx = -(by - ay) / len;
  let ny = (bx - ax) / len;
  // point the normal toward the light (upper left)
  if (nx * -0.6 + ny * -0.8 < 0) {
    nx = -nx;
    ny = -ny;
  }
  const line = (offset: number, width: number, style: string) => {
    ctx.strokeStyle = style;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(ax + nx * offset, ay + ny * offset);
    ctx.lineTo(bx + nx * offset, by + ny * offset);
    ctx.stroke();
  };
  line(0, w, dim ? '#6577BE' : '#7F91D2');
  line(0, w * 0.86, dim ? '#C3CEF1' : '#E6ECFC');
  line(-w * 0.2, w * 0.34, dim ? 'rgba(84, 102, 180, .6)' : 'rgba(118, 136, 208, .5)');
  line(w * 0.17, w * 0.3, dim ? '#E9EEFD' : '#FFFFFF');
  line(-w * 0.37, w * 0.09, 'rgba(56, 189, 248, .8)');
}

/** Two-segment arm with a dark elbow, a round wrist joint and a hand. `open` (0-1) spreads the fingers; `thumb` (0-1) makes a thumbs-up fist; `dim` shades the arm on the far side. */
function arm(ctx: Ctx, sx: number, sy: number, hx: number, hy: number, u: number, bend: number, open = 0, thumb = 0, dim = 0) {
  const mx = (sx + hx) / 2;
  const my = (sy + hy) / 2;
  const dx = hx - sx;
  const dy = hy - sy;
  const len = Math.hypot(dx, dy) || 1;
  const ex = mx + (-dy / len) * u * 0.16 * bend;
  const ey = my + (dx / len) * u * 0.16 * bend;

  limb(ctx, sx, sy, ex, ey, u * 0.21, dim);
  limb(ctx, ex, ey, hx, hy, u * 0.19, dim);
  joint(ctx, ex, ey, u * 0.1);

  const angle = Math.atan2(hy - ey, hx - ex);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  if (thumb > 0.5) {
    // thumb first, so the fist overlaps its root
    limb(ctx, hx, hy - u * 0.06, hx, hy - u * 0.27, u * 0.11, dim);
  } else {
    // fingers first, so the palm overlaps their roots
    const spread = mix(0.26, 0.42, open);
    const reach = u * mix(0.17, 0.25, open);
    for (const k of [-1.5, -0.5, 0.5, 1.5]) {
      const a = angle + k * spread;
      const rootX = hx + cos * u * 0.05;
      const rootY = hy + sin * u * 0.05;
      limb(ctx, rootX, rootY, rootX + Math.cos(a) * reach, rootY + Math.sin(a) * reach, u * 0.078, dim);
    }
  }

  // round wrist joint (same glossy ball as the elbow), then the palm over it
  joint(ctx, hx - cos * u * 0.14, hy - sin * u * 0.14, u * 0.105);
  const palm = u * (thumb > 0.5 ? 0.15 : 0.13);
  solid(
    ctx,
    () => {
      ctx.beginPath();
      ctx.arc(hx, hy, palm, 0, Math.PI * 2);
      ctx.closePath();
    },
    hx,
    hy,
    palm,
    palm,
    dim,
  );
  if (thumb > 0.5) {
    // curled fingers
    ctx.strokeStyle = 'rgba(40, 56, 130, .5)';
    ctx.lineWidth = u * 0.02;
    for (const row of [-0.03, 0.035, 0.095]) {
      ctx.beginPath();
      ctx.moveTo(hx - u * 0.07, hy + u * row);
      ctx.quadraticCurveTo(hx, hy + u * (row + 0.02), hx + u * 0.085, hy + u * row);
      ctx.stroke();
    }
  }
}

/** One short leg: thigh, dark knee, shin and a rounded foot with a glowing sole. `dir` is -1 left, 1 right. */
function leg(ctx: Ctx, dir: number, u: number, lift: number) {
  const dim = dir > 0 ? 0 : 0.6;
  const hipX = dir * u * 0.14;
  const kneeX = dir * u * 0.17;
  const kneeY = u * (1.04 - lift * 0.05);
  const footX = dir * u * 0.2;
  const footY = u * (1.3 - lift * 0.1);
  limb(ctx, hipX, u * 0.9, kneeX, kneeY, u * 0.21, dim);
  limb(ctx, kneeX, kneeY, dir * u * 0.18, footY - u * 0.08, u * 0.2, dim);
  joint(ctx, kneeX, kneeY, u * 0.09);

  // foot: dark sole under a white shell, with a light strip between them
  const sole = ctx.createLinearGradient(0, footY, 0, footY + u * 0.13);
  sole.addColorStop(0, '#1B2452');
  sole.addColorStop(1, '#04071A');
  ctx.fillStyle = sole;
  ctx.beginPath();
  ctx.ellipse(footX, footY + u * 0.04, u * 0.21, u * 0.088, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  glow(ctx, u * 0.22);
  ctx.strokeStyle = BLUE;
  ctx.lineWidth = u * 0.024;
  ctx.beginPath();
  ctx.ellipse(footX, footY + u * 0.04, u * 0.2, u * 0.082, 0, Math.PI * 0.1, Math.PI * 0.9);
  ctx.stroke();
  ctx.restore();
  solid(
    ctx,
    () => {
      ctx.beginPath();
      ctx.ellipse(footX, footY - u * 0.02, u * 0.195, u * 0.09, 0, 0, Math.PI * 2);
      ctx.closePath();
    },
    footX,
    footY - u * 0.02,
    u * 0.195,
    u * 0.09,
    dim,
  );
}

export function drawBot(ctx: Ctx, x: number, y: number, u: number, time: number, pose: BotPose) {
  const role = pose.role;
  const work = pose.work ?? 0;
  const side = pose.side ?? 1;
  const happy = pose.happy ?? 0;
  const flying = pose.flying ?? 0;
  const wave = pose.wave ?? 0;
  const thumb = pose.thumb ?? 0;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(pose.tilt ?? 0);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  /* Floor: a blue light pool with a dark contact shadow; in flight they fade and the soles fire */
  const pulse = 0.5 + Math.sin(time * 3) * 0.5;
  const grounded = 1 - flying * 0.75;
  ctx.save();
  ctx.translate(0, u * 1.43);
  ctx.scale(1, 0.16);
  const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, u * 0.8);
  pool.addColorStop(0, `rgba(56, 189, 248, ${(0.55 + pulse * 0.15) * grounded})`);
  pool.addColorStop(0.5, `rgba(37, 99, 235, ${0.28 * grounded})`);
  pool.addColorStop(1, 'rgba(37, 99, 235, 0)');
  ctx.fillStyle = pool;
  ctx.beginPath();
  ctx.arc(0, 0, u * 0.8, 0, Math.PI * 2);
  ctx.fill();
  const contact = ctx.createRadialGradient(0, -u * 0.1, 0, 0, -u * 0.1, u * 0.46);
  contact.addColorStop(0, `rgba(2, 6, 23, ${0.6 * grounded})`);
  contact.addColorStop(1, 'rgba(2, 6, 23, 0)');
  ctx.fillStyle = contact;
  ctx.beginPath();
  ctx.arc(0, -u * 0.1, u * 0.46, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  if (flying > 0.02) {
    const flicker = 1 + Math.sin(time * 23) * 0.08;
    for (const dir of [-1, 1]) {
      const fx = dir * u * 0.2;
      const top = u * 1.26;
      const len = u * 0.5 * flying * flicker;
      const jet = ctx.createLinearGradient(0, top, 0, top + len);
      jet.addColorStop(0, `rgba(255, 255, 255, ${0.9 * flying})`);
      jet.addColorStop(0.3, `rgba(56, 189, 248, ${0.8 * flying})`);
      jet.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = jet;
      ctx.beginPath();
      ctx.moveTo(fx - u * 0.12, top);
      ctx.quadraticCurveTo(fx, top + len * 1.6, fx + u * 0.12, top);
      ctx.closePath();
      ctx.fill();
    }
  }
  leg(ctx, -1, u, flying);
  leg(ctx, 1, u, flying);

  /* Arm positions */
  const shoulderY = u * 0.45;
  const nearX = side * u * 0.42;
  const farX = -side * u * 0.42;
  let handX = side * u * mix(0.66, 1.02, work);
  let handY = mix(u * 0.86, u * 0.3 + Math.sin(time * 6) * u * 0.04 * work, work);
  let restX = -side * u * 0.66;
  let restY = u * 0.86;
  if (happy > 0) {
    handX = mix(handX, side * u * 0.78, happy);
    handY = mix(handY, -u * 0.42 + Math.sin(time * 7) * u * 0.05, happy);
    restX = mix(restX, -side * u * 0.78, happy);
    restY = mix(restY, -u * 0.42 + Math.cos(time * 7) * u * 0.05, happy);
  }
  if (wave > 0) {
    handX = mix(handX, side * u * (0.9 + Math.sin(time * 5.5) * 0.14), wave);
    handY = mix(handY, -u * 0.46, wave);
  }
  if (thumb > 0) {
    handX = mix(handX, side * u * 0.95, thumb);
    handY = mix(handY, u * 0.2 + Math.sin(time * 3) * u * 0.03, thumb);
  }
  arm(ctx, farX, shoulderY, restX, restY, u, -side, happy, 0, 0.6);

  /* Hips */
  solid(ctx, () => box(ctx, -u * 0.28, u * 0.74, u * 0.56, u * 0.24, u * 0.11), 0, u * 0.86, u * 0.28, u * 0.12);

  /* Waist: a dark glossy band with a light strip */
  const waist = ctx.createLinearGradient(-u * 0.25, 0, u * 0.25, 0);
  waist.addColorStop(0, '#2A3572');
  waist.addColorStop(0.3, '#0F1638');
  waist.addColorStop(1, '#04071A');
  ctx.fillStyle = waist;
  box(ctx, -u * 0.25, u * 0.64, u * 0.5, u * 0.16, u * 0.06);
  ctx.fill();
  ctx.save();
  glow(ctx, u * 0.2);
  ctx.strokeStyle = BLUE;
  ctx.lineWidth = u * 0.026;
  ctx.beginPath();
  ctx.moveTo(-u * 0.17, u * 0.75);
  ctx.lineTo(u * 0.17, u * 0.75);
  ctx.stroke();
  ctx.restore();

  /* Chest shell */
  const chest = () => {
    ctx.beginPath();
    ctx.moveTo(-u * 0.3, u * 0.3);
    ctx.lineTo(u * 0.3, u * 0.3);
    ctx.quadraticCurveTo(u * 0.44, u * 0.31, u * 0.42, u * 0.46);
    ctx.quadraticCurveTo(u * 0.38, u * 0.7, u * 0.2, u * 0.71);
    ctx.lineTo(-u * 0.2, u * 0.71);
    ctx.quadraticCurveTo(-u * 0.38, u * 0.7, -u * 0.42, u * 0.46);
    ctx.quadraticCurveTo(-u * 0.44, u * 0.31, -u * 0.3, u * 0.3);
    ctx.closePath();
  };
  solid(ctx, chest, 0, u * 0.5, u * 0.43, u * 0.21);
  // the head throws a soft shadow across the top of the chest
  ctx.save();
  chest();
  ctx.clip();
  const cast = ctx.createLinearGradient(0, u * 0.3, 0, u * 0.46);
  cast.addColorStop(0, 'rgba(40, 56, 130, .55)');
  cast.addColorStop(1, 'rgba(40, 56, 130, 0)');
  ctx.fillStyle = cast;
  ctx.fillRect(-u * 0.5, u * 0.28, u, u * 0.2);
  ctx.restore();

  /* Chest logo: three people inside a swoosh */
  if (role !== 4) {
    const person = (px: number, py: number, k: number, fill: string) => {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(px, py - u * 0.062 * k, u * 0.036 * k, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(px - u * 0.062 * k, py + u * 0.07 * k);
      ctx.quadraticCurveTo(px - u * 0.062 * k, py - u * 0.018 * k, px, py - u * 0.018 * k);
      ctx.quadraticCurveTo(px + u * 0.062 * k, py - u * 0.018 * k, px + u * 0.062 * k, py + u * 0.07 * k);
      ctx.closePath();
      ctx.fill();
    };
    person(-u * 0.085, u * 0.53, 0.8, '#172554');
    person(u * 0.085, u * 0.53, 0.8, '#172554');
    person(0, u * 0.52, 1, BLUE_DEEP);
    ctx.strokeStyle = BLUE_DEEP;
    ctx.lineWidth = u * 0.028;
    ctx.beginPath();
    ctx.ellipse(0, u * 0.565, u * 0.2, u * 0.075, -0.3, Math.PI * 0.02, Math.PI * 1.12);
    ctx.stroke();
  }

  /* Offer bot wears a tie */
  if (role === 4) {
    const tie = ctx.createLinearGradient(-u * 0.08, 0, u * 0.08, 0);
    tie.addColorStop(0, '#60A5FA');
    tie.addColorStop(0.5, BLUE_DEEP);
    tie.addColorStop(1, '#1E3A8A');
    ctx.fillStyle = tie;
    ctx.beginPath();
    ctx.moveTo(-u * 0.07, u * 0.33);
    ctx.lineTo(u * 0.07, u * 0.33);
    ctx.lineTo(u * 0.03, u * 0.42);
    ctx.lineTo(u * 0.08, u * 0.66);
    ctx.lineTo(0, u * 0.76);
    ctx.lineTo(-u * 0.08, u * 0.66);
    ctx.lineTo(-u * 0.03, u * 0.42);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(11, 18, 48, .35)';
    ctx.beginPath();
    ctx.moveTo(-u * 0.07, u * 0.33);
    ctx.lineTo(u * 0.07, u * 0.33);
    ctx.lineTo(u * 0.03, u * 0.42);
    ctx.lineTo(-u * 0.03, u * 0.42);
    ctx.closePath();
    ctx.fill();
  }

  /* Neck: a dark collar between head and body */
  const neck = ctx.createLinearGradient(-u * 0.2, 0, u * 0.2, 0);
  neck.addColorStop(0, '#2A3572');
  neck.addColorStop(0.35, '#0F1638');
  neck.addColorStop(1, '#04071A');
  ctx.fillStyle = neck;
  box(ctx, -u * 0.2, u * 0.2, u * 0.4, u * 0.13, u * 0.06);
  ctx.fill();

  /* Sourcing bot: radar dish that turns, with a ping from the emitter */
  if (role === 0) {
    const turn = Math.cos(time * 1.8);
    limb(ctx, 0, -u * 0.56, 0, -u * 0.74, u * 0.07);
    ctx.save();
    ctx.translate(0, -u * 0.82);
    ctx.scale(Math.max(0.25, Math.abs(turn)), 1);
    const dish = ctx.createLinearGradient(-u * 0.26, -u * 0.1, u * 0.26, u * 0.2);
    dish.addColorStop(0, '#FFFFFF');
    dish.addColorStop(0.6, '#C3CEF1');
    dish.addColorStop(1, '#7F91D2');
    ctx.fillStyle = dish;
    ctx.beginPath();
    ctx.arc(0, -u * 0.06, u * 0.27, 0.15, Math.PI - 0.15);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.save();
    glow(ctx, u * 0.3);
    ctx.fillStyle = BLUE;
    ctx.beginPath();
    ctx.arc(0, -u * 0.94, u * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    for (let ring = 0; ring < 2; ring += 1) {
      const grow = (time * 0.9 + ring / 2) % 1;
      ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - grow) * 0.8})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, -u * 0.94, u * (0.1 + grow * 0.4), Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
    }
  }

  /* Headphone band, drawn behind the head so it arcs over the top */
  const bandW = u * (role === 3 ? 0.1 : 0.07);
  ctx.strokeStyle = '#04071A';
  ctx.lineWidth = bandW;
  ctx.beginPath();
  ctx.arc(0, -u * 0.15, u * 0.7, Math.PI * 1.05, Math.PI * 1.95);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(124, 139, 208, .7)';
  ctx.lineWidth = bandW * 0.25;
  ctx.beginPath();
  ctx.arc(0, -u * 0.15, u * 0.7 + bandW * 0.22, Math.PI * 1.1, Math.PI * 1.6);
  ctx.stroke();

  /* Headphone cups: a white housing, a dark glossy cap and a glowing blue arc */
  for (const dir of [-1, 1]) {
    const cx = dir * u * 0.66;
    const cy = -u * 0.15;
    const r = u * (role === 3 ? 0.25 : 0.22);
    solid(
      ctx,
      () => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * 0.8, r, 0, 0, Math.PI * 2);
        ctx.closePath();
      },
      cx,
      cy,
      r * 0.8,
      r,
      dir > 0 ? 0 : 0.5,
    );
    const capX = cx + dir * r * 0.16;
    const cup = ctx.createRadialGradient(capX - r * 0.25, cy - r * 0.4, r * 0.05, capX, cy, r * 0.9);
    cup.addColorStop(0, '#5868B8');
    cup.addColorStop(0.4, '#1B2452');
    cup.addColorStop(1, '#04071A');
    ctx.fillStyle = cup;
    ctx.beginPath();
    ctx.ellipse(capX, cy, r * 0.6, r * 0.82, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    glow(ctx, u * 0.26);
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = u * 0.045;
    ctx.beginPath();
    ctx.ellipse(capX, cy, r * 0.4, r * 0.6, 0, dir > 0 ? -Math.PI * 0.42 : Math.PI * 0.58, dir > 0 ? Math.PI * 0.42 : Math.PI * 1.42);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = CORE;
    ctx.lineWidth = u * 0.016;
    ctx.stroke();
    ctx.restore();
  }

  /* Head shell */
  const headPath = () => box(ctx, -u * 0.64, -u * 0.6, u * 1.28, u * 0.86, u * 0.4);
  solid(ctx, headPath, 0, -u * 0.17, u * 0.64, u * 0.43);
  // moulded seam around the faceplate
  ctx.strokeStyle = 'rgba(96, 114, 190, .4)';
  ctx.lineWidth = u * 0.012;
  box(ctx, -u * 0.56, -u * 0.5, u * 1.12, u * 0.68, u * 0.3);
  ctx.stroke();

  /* Status light on the crown (the dish and the cap take its place) */
  if (role !== 0 && role !== 2) {
    ctx.save();
    glow(ctx, u * (0.24 + Math.sin(time * 5) * 0.1));
    ctx.fillStyle = BLUE;
    box(ctx, -u * 0.15, -u * 0.645, u * 0.3, u * 0.075, u * 0.037);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = CORE;
    box(ctx, -u * 0.11, -u * 0.63, u * 0.22, u * 0.028, u * 0.014);
    ctx.fill();
    ctx.restore();
  }

  /* Visor: a dark bezel set into the head, then curved glass */
  ctx.fillStyle = '#02040F';
  box(ctx, -u * 0.52, -u * 0.44, u * 1.04, u * 0.56, u * 0.26);
  ctx.fill();
  const glass = ctx.createRadialGradient(-u * 0.2, -u * 0.36, u * 0.02, 0, -u * 0.12, u * 0.62);
  glass.addColorStop(0, '#27357A');
  glass.addColorStop(0.45, '#0C1233');
  glass.addColorStop(1, '#03050F');
  ctx.fillStyle = glass;
  box(ctx, -u * 0.5, -u * 0.42, u * 1.0, u * 0.52, u * 0.24);
  ctx.fill();
  ctx.save();
  ctx.clip();
  // reflections: a window streak, and blue bounce light along the lower edge
  ctx.fillStyle = 'rgba(255, 255, 255, .1)';
  ctx.beginPath();
  ctx.moveTo(-u * 0.32, -u * 0.44);
  ctx.lineTo(-u * 0.1, -u * 0.44);
  ctx.lineTo(-u * 0.38, u * 0.12);
  ctx.lineTo(-u * 0.6, u * 0.12);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, .06)';
  ctx.beginPath();
  ctx.moveTo(-u * 0.04, -u * 0.44);
  ctx.lineTo(u * 0.03, -u * 0.44);
  ctx.lineTo(-u * 0.25, u * 0.12);
  ctx.lineTo(-u * 0.32, u * 0.12);
  ctx.closePath();
  ctx.fill();
  const bounce = ctx.createLinearGradient(0, -u * 0.05, 0, u * 0.1);
  bounce.addColorStop(0, 'rgba(56, 189, 248, 0)');
  bounce.addColorStop(1, 'rgba(56, 189, 248, .28)');
  ctx.fillStyle = bounce;
  ctx.fillRect(-u * 0.5, -u * 0.05, u, u * 0.15);

  /* Eyes: a glowing tube with a bright core */
  const lookX = (pose.lookX ?? side * work) * u * 0.07;
  const lookY = (pose.lookY ?? 0) * u * 0.04;
  const blink = time % 3.7 < 0.13 ? 0.12 : 1;
  const smiling = happy > 0.5 || wave > 0.5 || thumb > 0.5;
  /** Strokes the current path as neon: blue with bloom, then a pale core. */
  const neon = (width: number) => {
    glow(ctx, u * 0.34);
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = CORE;
    ctx.lineWidth = width * 0.36;
    ctx.stroke();
  };

  if (role === 1 && !smiling) {
    // scanner: a read bar across the visor with a bright head sweeping along it
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(-u * 0.36, -u * 0.17);
    ctx.lineTo(u * 0.36, -u * 0.17);
    neon(u * 0.045);
    ctx.globalAlpha = 1;
    const sweep = Math.sin(time * 3.2) * u * 0.3;
    glow(ctx, u * 0.34);
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(sweep, -u * 0.17, u * 0.11, u * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();
  } else {
    for (const ex of [-u * 0.21, u * 0.21]) {
      const cx = ex + lookX;
      const cyEye = -u * 0.19 + lookY;
      if (smiling) {
        // happy eyes: two thick upward arcs
        ctx.beginPath();
        ctx.arc(cx, -u * 0.12 + lookY, u * 0.115, Math.PI * 1.14, Math.PI * 1.86);
        neon(u * 0.085);
      } else if (role === 0) {
        // targeting lens
        ctx.beginPath();
        ctx.arc(cx, cyEye, u * 0.11, 0, Math.PI * 2);
        neon(u * 0.032);
        glow(ctx, u * 0.3);
        ctx.fillStyle = BLUE;
        ctx.beginPath();
        ctx.arc(cx, cyEye, u * 0.045, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx - u * 0.15, cyEye);
        ctx.lineTo(cx - u * 0.11, cyEye);
        ctx.moveTo(cx + u * 0.11, cyEye);
        ctx.lineTo(cx + u * 0.15, cyEye);
        neon(u * 0.03);
      } else {
        glow(ctx, u * 0.34);
        ctx.fillStyle = BLUE;
        ctx.beginPath();
        ctx.ellipse(cx, cyEye, u * 0.08, u * 0.115 * blink, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = CORE;
        ctx.beginPath();
        ctx.ellipse(cx - u * 0.012, cyEye - u * 0.02 * blink, u * 0.042, u * 0.07 * blink, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  /* Mouth: a small smile, or a talking light for the interview bot */
  ctx.beginPath();
  if (role === 3 && !smiling) {
    const talk = Math.abs(Math.sin(time * 7)) * u * 0.035 * (0.3 + work);
    ctx.ellipse(lookX * 0.5, u * 0.0, u * 0.06, u * 0.012 + talk, 0, 0, Math.PI * 2);
  } else {
    const wide = smiling ? 0.085 : 0.06;
    ctx.arc(lookX * 0.5, -u * 0.06 + lookY * 0.5, u * wide, Math.PI * 0.18, Math.PI * 0.82);
  }
  neon(u * 0.038);
  ctx.restore();
  // glass edge catches the light
  const edge = ctx.createLinearGradient(-u * 0.5, -u * 0.42, u * 0.5, u * 0.1);
  edge.addColorStop(0, 'rgba(255, 255, 255, .55)');
  edge.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
  edge.addColorStop(0.65, 'rgba(56, 189, 248, 0)');
  edge.addColorStop(1, 'rgba(56, 189, 248, .7)');
  ctx.strokeStyle = edge;
  ctx.lineWidth = u * 0.016;
  box(ctx, -u * 0.5, -u * 0.42, u * 1.0, u * 0.52, u * 0.24);
  ctx.stroke();

  /* Assessment bot: round glasses and an examiner's cap */
  if (role === 2) {
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = u * 0.03;
    for (const ex of [-u * 0.21, u * 0.21]) {
      ctx.beginPath();
      ctx.arc(ex + lookX, -u * 0.19, u * 0.16, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(-u * 0.05 + lookX, -u * 0.19);
    ctx.lineTo(u * 0.05 + lookX, -u * 0.19);
    ctx.stroke();

    ctx.fillStyle = INK;
    box(ctx, -u * 0.36, -u * 0.7, u * 0.72, u * 0.14, u * 0.04);
    ctx.fill();
    const cap = ctx.createLinearGradient(-u * 0.78, -u * 0.98, u * 0.78, -u * 0.64);
    cap.addColorStop(0, '#4455A8');
    cap.addColorStop(0.5, '#1B2760');
    cap.addColorStop(1, '#0A1238');
    ctx.fillStyle = cap;
    ctx.beginPath();
    ctx.moveTo(0, -u * 0.98);
    ctx.lineTo(u * 0.78, -u * 0.8);
    ctx.lineTo(0, -u * 0.64);
    ctx.lineTo(-u * 0.78, -u * 0.8);
    ctx.closePath();
    ctx.fill();
    const swing = Math.sin(time * 2.4) * u * 0.06;
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = u * 0.03;
    ctx.beginPath();
    ctx.moveTo(0, -u * 0.81);
    ctx.lineTo(u * 0.56, -u * 0.76);
    ctx.lineTo(u * 0.58 + swing, -u * 0.48);
    ctx.stroke();
    ctx.fillStyle = BLUE;
    ctx.beginPath();
    ctx.arc(u * 0.58 + swing, -u * 0.46, u * 0.05, 0, Math.PI * 2);
    ctx.fill();
  }

  /* Interview bot: boom microphone */
  if (role === 3) {
    ctx.strokeStyle = '#04071A';
    ctx.lineWidth = u * 0.045;
    ctx.beginPath();
    ctx.moveTo(-side * u * 0.7, u * 0.02);
    ctx.quadraticCurveTo(-side * u * 0.64, u * 0.36, -side * u * 0.22, u * 0.2);
    ctx.stroke();
    joint(ctx, -side * u * 0.19, u * 0.19, u * 0.07);
    ctx.fillStyle = BLUE;
    ctx.beginPath();
    ctx.arc(-side * u * 0.19, u * 0.19, u * 0.022, 0, Math.PI * 2);
    ctx.fill();
  }

  /* Near arm goes on top, then a shoulder cap over each joint */
  arm(ctx, nearX, shoulderY, handX, handY, u, side, Math.max(wave, happy), thumb);
  for (const sx of [farX, nearX]) {
    joint(ctx, sx, shoulderY, u * 0.12);
    const capY = shoulderY - u * 0.03;
    solid(
      ctx,
      () => {
        ctx.beginPath();
        ctx.arc(sx, capY, u * 0.095, 0, Math.PI * 2);
        ctx.closePath();
      },
      sx,
      capY,
      u * 0.095,
      u * 0.095,
      sx === farX ? 0.5 : 0,
    );
  }

  /* Thumbs-up: two little sparks beside the thumb */
  if (thumb > 0.5) {
    ctx.save();
    const twinkle = 0.75 + Math.sin(time * 6) * 0.25;
    for (const [ax, ay, bx, by] of [
      [0.14, -0.3, 0.22, -0.42],
      [0.2, -0.18, 0.33, -0.25],
    ]) {
      ctx.beginPath();
      ctx.moveTo(handX + side * u * ax, handY + u * ay);
      ctx.lineTo(handX + side * u * mix(ax, bx, twinkle), handY + u * mix(ay, by, twinkle));
      glow(ctx, u * 0.2);
      ctx.strokeStyle = BLUE;
      ctx.lineWidth = u * 0.038;
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.restore();
}
