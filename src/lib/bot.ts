/* ------------------------------------------------------------------
   The TalentPool365 mascot, rendered on 2D canvas with 2.5D head parallax,
   PBR pearl-ceramic & anodized titanium shading, recessed glass chest
   core, curved optical visor, smooth eyelid kinematics, and Mach-diamond
   plasma thrusters.

   One chassis, five roles:
     0 sourcing   - radar dish and targeting-lens eyes
     1 screening  - scanner visor with a sweeping read bar
     2 assessment - examiner's cap and round glasses
     3 interview  - headset band with a boom microphone
     4 offer      - tie, and a smile once the letter is signed
   `u` is the unit size in CSS pixels (the head is about 1.3u wide).
   ------------------------------------------------------------------ */

type Ctx = CanvasRenderingContext2D;

const mix = (a: number, b: number, k: number) => a + (b - a) * k;
const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

const BLUE = '#38BDF8';
const EMERALD = '#34D399';
const CORE = '#E6FFFA';
const INK = '#041214';

export function box(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function check(ctx: Ctx, x: number, y: number, r: number, mark = '#062825') {
  ctx.fillStyle = EMERALD;
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
  /** Where the eyes & head look, each -1 to 1. */
  lookX?: number;
  lookY?: number;
}

function glow(ctx: Ctx, blur: number, color = 'rgba(56, 189, 248, .92)') {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
}

/**
 * 5-stop PBR studio pearl-ceramic solid shader with underside slate-teal
 * ambient occlusion, emerald-cyan Fresnel rim light, and sharp softbox glint.
 */
function solid(ctx: Ctx, path: () => void, cx: number, cy: number, rx: number, ry: number, dim = 0) {
  const r = Math.max(rx, ry);
  ctx.save();

  // Base 5-stop pearl-ceramic falloff from upper-left key light
  const base = ctx.createRadialGradient(
    cx - rx * 0.42,
    cy - ry * 0.52,
    r * 0.04,
    cx - rx * 0.08,
    cy - ry * 0.08,
    r * 1.48,
  );
  base.addColorStop(0, '#FFFFFF');
  base.addColorStop(0.28, dim ? '#E5ECEB' : '#F4F8F7');
  base.addColorStop(0.58, dim ? '#B6CBC7' : '#CFE0DC');
  base.addColorStop(0.84, dim ? '#73908B' : '#8CA8A2');
  base.addColorStop(1, dim ? '#405A55' : '#52706B');
  ctx.fillStyle = base;
  path();
  ctx.fill();
  ctx.clip();

  // Deep slate-teal underside ambient occlusion
  const under = ctx.createLinearGradient(0, cy - ry * 0.08, 0, cy + ry);
  under.addColorStop(0, 'rgba(15, 38, 36, 0)');
  under.addColorStop(0.6, `rgba(15, 38, 36, ${0.18 + dim * 0.12})`);
  under.addColorStop(1, `rgba(8, 24, 24, ${0.42 + dim * 0.22})`);
  ctx.fillStyle = under;
  ctx.fillRect(cx - rx * 1.25, cy - ry * 1.25, rx * 2.5, ry * 2.5);

  // Fresnel rim light: softbox white upper-left, emerald-cyan lower-right bounce
  const rim = ctx.createLinearGradient(cx - rx, cy - ry, cx + rx, cy + ry);
  rim.addColorStop(0, 'rgba(255, 255, 255, .95)');
  rim.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
  rim.addColorStop(0.62, 'rgba(52, 211, 153, 0)');
  rim.addColorStop(0.86, 'rgba(52, 211, 153, .65)');
  rim.addColorStop(1, 'rgba(56, 189, 248, .9)');
  ctx.strokeStyle = rim;
  ctx.lineWidth = r * 0.14;
  path();
  ctx.stroke();

  // Studio softbox specular sheen + pinpoint glint
  ctx.translate(cx - rx * 0.38, cy - ry * 0.5);
  ctx.rotate(-0.36);
  ctx.scale(1, Math.max(0.28, (ry / rx) * 0.44));
  const sheen = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * 0.42);
  sheen.addColorStop(0, 'rgba(255, 255, 255, .96)');
  sheen.addColorStop(0.45, 'rgba(255, 255, 255, .42)');
  sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sheen;
  ctx.beginPath();
  ctx.arc(0, 0, rx * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** Anodized carbon-titanium ball joint with brushed specular arc and micro-LED ring. */
function joint(ctx: Ctx, x: number, y: number, r: number) {
  const g = ctx.createRadialGradient(x - r * 0.38, y - r * 0.44, r * 0.05, x, y, r);
  g.addColorStop(0, '#647B78');
  g.addColorStop(0.36, '#182928');
  g.addColorStop(0.8, '#081415');
  g.addColorStop(1, '#030809');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  // Brushed metallic bevel & emerald-cyan micro-LED arc
  ctx.strokeStyle = 'rgba(255, 255, 255, .32)';
  ctx.lineWidth = Math.max(1, r * 0.12);
  ctx.beginPath();
  ctx.arc(x, y, r * 0.82, Math.PI * 1.05, Math.PI * 1.72);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(52, 211, 153, .75)';
  ctx.lineWidth = Math.max(1, r * 0.14);
  ctx.beginPath();
  ctx.arc(x, y, r * 0.88, Math.PI * 0.08, Math.PI * 0.65);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, .9)';
  ctx.beginPath();
  ctx.arc(x - r * 0.36, y - r * 0.4, r * 0.15, 0, Math.PI * 2);
  ctx.fill();
}

/** Ceramic cylinder limb segment shaded from upper-left key light with cyan-emerald rim. */
function limb(ctx: Ctx, ax: number, ay: number, bx: number, by: number, w: number, dim = 0) {
  const len = Math.hypot(bx - ax, by - ay) || 1;
  let nx = -(by - ay) / len;
  let ny = (bx - ax) / len;
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
  line(0, w, dim ? '#4B6661' : '#65857F');
  line(0, w * 0.86, dim ? '#B6CBC7' : '#E7F0EE');
  line(-w * 0.2, w * 0.34, dim ? 'rgba(22, 50, 48, .55)' : 'rgba(35, 68, 65, .42)');
  line(w * 0.17, w * 0.28, dim ? '#EAF2F0' : '#FFFFFF');
  line(-w * 0.37, w * 0.09, 'rgba(52, 211, 153, .8)');
}

/** Articulated two-segment arm with titanium elbow, wrist ball joint, and palm. */
function arm(
  ctx: Ctx,
  sx: number,
  sy: number,
  hx: number,
  hy: number,
  u: number,
  bend: number,
  open = 0,
  thumb = 0,
  dim = 0,
) {
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
    limb(ctx, hx, hy - u * 0.06, hx, hy - u * 0.27, u * 0.11, dim);
  } else {
    const spread = mix(0.26, 0.42, open);
    const reach = u * mix(0.17, 0.25, open);
    for (const k of [-1.5, -0.5, 0.5, 1.5]) {
      const a = angle + k * spread;
      const rootX = hx + cos * u * 0.05;
      const rootY = hy + sin * u * 0.05;
      limb(ctx, rootX, rootY, rootX + Math.cos(a) * reach, rootY + Math.sin(a) * reach, u * 0.078, dim);
    }
  }

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
    ctx.strokeStyle = 'rgba(22, 50, 48, .48)';
    ctx.lineWidth = u * 0.02;
    for (const row of [-0.03, 0.035, 0.095]) {
      ctx.beginPath();
      ctx.moveTo(hx - u * 0.07, hy + u * row);
      ctx.quadraticCurveTo(hx, hy + u * (row + 0.02), hx + u * 0.085, hy + u * row);
      ctx.stroke();
    }
  }
}

/** Articulated leg with anodized knee joint and glowing thruster sole. */
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

  const sole = ctx.createLinearGradient(0, footY, 0, footY + u * 0.13);
  sole.addColorStop(0, '#16282A');
  sole.addColorStop(1, '#030809');
  ctx.fillStyle = sole;
  ctx.beginPath();
  ctx.ellipse(footX, footY + u * 0.04, u * 0.21, u * 0.088, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  glow(ctx, u * 0.24, 'rgba(52, 211, 153, .9)');
  ctx.strokeStyle = EMERALD;
  ctx.lineWidth = u * 0.026;
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

/** Smooth cosine eyelid blink curve with occasional natural double-blinks. */
function computeBlink(time: number): number {
  const period = 4.2;
  const tCycle = time % period;
  // Primary blink at 0.0..0.18s
  if (tCycle < 0.18) {
    const p = tCycle / 0.18;
    return 1 - 0.9 * Math.sin(Math.PI * p);
  }
  // Occasional double-blink every second period
  const cycleIndex = Math.floor(time / period);
  if (cycleIndex % 2 === 1 && tCycle >= 0.25 && tCycle < 0.41) {
    const p = (tCycle - 0.25) / 0.16;
    return 1 - 0.85 * Math.sin(Math.PI * p);
  }
  return 1;
}

export function drawBot(ctx: Ctx, x: number, y: number, u: number, time: number, pose: BotPose) {
  const role = pose.role;
  const work = pose.work ?? 0;
  const side = pose.side ?? 1;
  const happy = pose.happy ?? 0;
  const flying = pose.flying ?? 0;
  const wave = pose.wave ?? 0;
  const thumb = pose.thumb ?? 0;

  // 2.5D head perspective parameters
  const yaw = clamp(pose.lookX ?? side * work * 0.85, -1, 1);
  const pitch = clamp(pose.lookY ?? 0, -1, 1);

  // Secondary overlap physics (head lags ~90ms, hands lag ~150ms behind torso)
  const headOverlapY = Math.sin((time - 0.09) * 2.1) * u * 0.028;
  const handOverlapY = Math.sin((time - 0.15) * 2.1) * u * 0.036;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(pose.tilt ?? 0);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  /* Floor: ambient emerald-cyan light pool + dual per-foot contact shadows */
  const pulse = 0.5 + Math.sin(time * 3) * 0.5;
  const grounded = 1 - flying * 0.78;
  ctx.save();
  ctx.translate(0, u * 1.43);
  ctx.scale(1, 0.17);
  const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, u * 0.88);
  pool.addColorStop(0, `rgba(52, 211, 153, ${(0.45 + pulse * 0.14) * grounded})`);
  pool.addColorStop(0.45, `rgba(56, 189, 248, ${0.26 * grounded})`);
  pool.addColorStop(1, 'rgba(14, 165, 233, 0)');
  ctx.fillStyle = pool;
  ctx.beginPath();
  ctx.arc(0, 0, u * 0.88, 0, Math.PI * 2);
  ctx.fill();

  for (const dir of [-1, 1]) {
    const fx = dir * u * 0.21;
    const contact = ctx.createRadialGradient(fx, -u * 0.08, 0, fx, -u * 0.08, u * 0.26);
    contact.addColorStop(0, `rgba(2, 10, 12, ${0.68 * grounded})`);
    contact.addColorStop(1, 'rgba(2, 10, 12, 0)');
    ctx.fillStyle = contact;
    ctx.beginPath();
    ctx.arc(fx, -u * 0.08, u * 0.26, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  /* Mach-Diamond Plasma Thrusters during flight */
  if (flying > 0.02) {
    const flicker = 1 + Math.sin(time * 28) * 0.09;
    for (const dir of [-1, 1]) {
      const fx = dir * u * 0.2;
      const top = u * 1.26;
      const len = u * 0.58 * flying * flicker;

      // Outer exhaust plume
      const jet = ctx.createLinearGradient(0, top, 0, top + len * 1.5);
      jet.addColorStop(0, `rgba(255, 255, 255, ${0.95 * flying})`);
      jet.addColorStop(0.28, `rgba(56, 189, 248, ${0.85 * flying})`);
      jet.addColorStop(0.65, `rgba(52, 211, 153, ${0.42 * flying})`);
      jet.addColorStop(1, 'rgba(52, 211, 153, 0)');
      ctx.fillStyle = jet;
      ctx.beginPath();
      ctx.moveTo(fx - u * 0.125, top);
      ctx.quadraticCurveTo(fx, top + len * 1.7, fx + u * 0.125, top);
      ctx.closePath();
      ctx.fill();

      // Inner white-hot plasma core + Mach shock diamonds
      ctx.fillStyle = `rgba(230, 255, 250, ${0.92 * flying})`;
      ctx.beginPath();
      ctx.moveTo(fx - u * 0.055, top);
      ctx.quadraticCurveTo(fx, top + len * 0.9, fx + u * 0.055, top);
      ctx.closePath();
      ctx.fill();

      for (const ring of [0.35, 0.72]) {
        const dy = top + len * ring;
        const rw = u * (0.075 - ring * 0.035) * flying;
        ctx.fillStyle = `rgba(255, 255, 255, ${(1 - ring * 0.5) * flying})`;
        ctx.beginPath();
        ctx.moveTo(fx, dy - rw * 0.7);
        ctx.lineTo(fx + rw, dy);
        ctx.lineTo(fx, dy + rw * 0.7);
        ctx.lineTo(fx - rw, dy);
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  leg(ctx, -1, u, flying);
  leg(ctx, 1, u, flying);

  /* Arm positions with phase-delayed secondary overlap */
  const shoulderY = u * 0.45;
  const nearX = side * u * 0.42;
  const farX = -side * u * 0.42;
  let handX = side * u * mix(0.66, 1.02, work);
  let handY = mix(u * 0.86, u * 0.3 + Math.sin(time * 6) * u * 0.04 * work, work) + handOverlapY;
  let restX = -side * u * 0.66;
  let restY = u * 0.86 + handOverlapY * 0.7;
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

  /* Anodized Waist Belt with Glowing Telemetry Strip */
  const waist = ctx.createLinearGradient(-u * 0.25, 0, u * 0.25, 0);
  waist.addColorStop(0, '#364F4D');
  waist.addColorStop(0.35, '#112224');
  waist.addColorStop(1, '#040B0C');
  ctx.fillStyle = waist;
  box(ctx, -u * 0.25, u * 0.64, u * 0.5, u * 0.16, u * 0.06);
  ctx.fill();
  ctx.save();
  glow(ctx, u * 0.22, 'rgba(52, 211, 153, .85)');
  ctx.strokeStyle = EMERALD;
  ctx.lineWidth = u * 0.026;
  ctx.beginPath();
  ctx.moveTo(-u * 0.17, u * 0.75);
  ctx.lineTo(u * 0.17, u * 0.75);
  ctx.stroke();
  ctx.restore();

  /* Chest Shell */
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

  // Soft head cast shadow across top of chest
  ctx.save();
  chest();
  ctx.clip();
  const cast = ctx.createLinearGradient(0, u * 0.3, 0, u * 0.47);
  cast.addColorStop(0, 'rgba(8, 24, 24, .52)');
  cast.addColorStop(1, 'rgba(8, 24, 24, 0)');
  ctx.fillStyle = cast;
  ctx.fillRect(-u * 0.5, u * 0.28, u, u * 0.22);
  ctx.restore();

  /* Recessed Glass Chest Core with TalentPool365 Emblem */
  if (role !== 4) {
    ctx.save();
    // Outer metallic bevel bezel
    ctx.fillStyle = '#061517';
    box(ctx, -u * 0.22, u * 0.415, u * 0.44, u * 0.22, u * 0.09);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, .28)';
    ctx.lineWidth = u * 0.012;
    ctx.stroke();

    // Inner glowing energy chamber synchronized with work pulse
    const corePulse = 0.25 + (0.2 + work * 0.3) * (0.5 + 0.5 * Math.sin(time * 3.4));
    const coreGrad = ctx.createRadialGradient(0, u * 0.525, 0, 0, u * 0.525, u * 0.22);
    coreGrad.addColorStop(0, `rgba(52, 211, 153, ${corePulse})`);
    coreGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.14)');
    coreGrad.addColorStop(1, 'rgba(2, 10, 12, 0.85)');
    ctx.fillStyle = coreGrad;
    box(ctx, -u * 0.2, u * 0.43, u * 0.4, u * 0.19, u * 0.075);
    ctx.fill();

    const person = (px: number, py: number, k: number, fill: string) => {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(px, py - u * 0.055 * k, u * 0.03 * k, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(px - u * 0.052 * k, py + u * 0.06 * k);
      ctx.quadraticCurveTo(px - u * 0.052 * k, py - u * 0.014 * k, px, py - u * 0.014 * k);
      ctx.quadraticCurveTo(px + u * 0.052 * k, py - u * 0.014 * k, px + u * 0.052 * k, py + u * 0.06 * k);
      ctx.closePath();
      ctx.fill();
    };
    person(-u * 0.078, u * 0.53, 0.82, 'rgba(255, 255, 255, 0.65)');
    person(u * 0.078, u * 0.53, 0.82, 'rgba(255, 255, 255, 0.65)');
    person(0, u * 0.52, 1, CORE);
    ctx.strokeStyle = EMERALD;
    ctx.lineWidth = u * 0.022;
    ctx.beginPath();
    ctx.ellipse(0, u * 0.56, u * 0.16, u * 0.055, -0.28, Math.PI * 0.04, Math.PI * 1.1);
    ctx.stroke();
    ctx.restore();
  }

  /* Offer bot wears an executive tie */
  if (role === 4) {
    const tie = ctx.createLinearGradient(-u * 0.08, 0, u * 0.08, 0);
    tie.addColorStop(0, '#34D399');
    tie.addColorStop(0.5, '#0D9488');
    tie.addColorStop(1, '#115E59');
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
    ctx.fillStyle = 'rgba(4, 18, 20, .35)';
    ctx.beginPath();
    ctx.moveTo(-u * 0.07, u * 0.33);
    ctx.lineTo(u * 0.07, u * 0.33);
    ctx.lineTo(u * 0.03, u * 0.42);
    ctx.lineTo(-u * 0.03, u * 0.42);
    ctx.closePath();
    ctx.fill();
  }

  /* Neck: dark anodized collar between head and body */
  const neck = ctx.createLinearGradient(-u * 0.2, 0, u * 0.2, 0);
  neck.addColorStop(0, '#364F4D');
  neck.addColorStop(0.35, '#112224');
  neck.addColorStop(1, '#040B0C');
  ctx.fillStyle = neck;
  box(ctx, -u * 0.2, u * 0.2, u * 0.4, u * 0.13, u * 0.06);
  ctx.fill();

  /* ==================================================================
     HEAD GROUP — 2.5D perspective shift + phase-delayed secondary bob
     ================================================================== */
  ctx.save();
  ctx.translate(0, headOverlapY);
  const headShiftX = yaw * u * 0.07;
  const headShiftY = pitch * u * 0.035;
  const visorShiftX = yaw * u * 0.11;
  const visorShiftY = pitch * u * 0.055;

  /* Sourcing bot: rotating radar dish atop crown */
  if (role === 0) {
    const turn = Math.cos(time * 1.8);
    limb(ctx, headShiftX * 0.6, -u * 0.56 + headShiftY, headShiftX * 0.7, -u * 0.74 + headShiftY, u * 0.07);
    ctx.save();
    ctx.translate(headShiftX * 0.7, -u * 0.82 + headShiftY);
    ctx.scale(Math.max(0.25, Math.abs(turn)), 1);
    const dish = ctx.createLinearGradient(-u * 0.26, -u * 0.1, u * 0.26, u * 0.2);
    dish.addColorStop(0, '#FFFFFF');
    dish.addColorStop(0.6, '#CFE0DC');
    dish.addColorStop(1, '#6D8B86');
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
    ctx.arc(headShiftX * 0.7, -u * 0.94 + headShiftY, u * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    for (let ring = 0; ring < 2; ring += 1) {
      const grow = (time * 0.9 + ring / 2) % 1;
      ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - grow) * 0.8})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(headShiftX * 0.7, -u * 0.94 + headShiftY, u * (0.1 + grow * 0.4), Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
    }
  }

  /* Headphone band drawn behind the head */
  const bandW = u * (role === 3 ? 0.1 : 0.07);
  ctx.strokeStyle = '#040B0C';
  ctx.lineWidth = bandW;
  ctx.beginPath();
  ctx.arc(headShiftX * 0.35, -u * 0.15 + headShiftY * 0.5, u * 0.7, Math.PI * 1.05, Math.PI * 1.95);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(140, 168, 162, .55)';
  ctx.lineWidth = bandW * 0.25;
  ctx.beginPath();
  ctx.arc(headShiftX * 0.35, -u * 0.15 + headShiftY * 0.5, u * 0.7 + bandW * 0.22, Math.PI * 1.1, Math.PI * 1.6);
  ctx.stroke();

  const drawEarCup = (dir: number) => {
    const foreshorten = 1 + dir * yaw * 0.14;
    const cx = dir * u * 0.66 - yaw * u * 0.08 + headShiftX * 0.3;
    const cy = -u * 0.15 + headShiftY * 0.6;
    const r = u * (role === 3 ? 0.25 : 0.22) * foreshorten;
    const isFar = dir * yaw < -0.15;

    solid(
      ctx,
      () => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * (0.78 - Math.abs(yaw) * 0.12), r, 0, 0, Math.PI * 2);
        ctx.closePath();
      },
      cx,
      cy,
      r * 0.8,
      r,
      isFar ? 0.65 : dir > 0 ? 0.1 : 0.45,
    );
    const capX = cx + dir * r * 0.16;
    const cup = ctx.createRadialGradient(capX - r * 0.25, cy - r * 0.4, r * 0.05, capX, cy, r * 0.9);
    cup.addColorStop(0, '#5A7672');
    cup.addColorStop(0.42, '#182928');
    cup.addColorStop(1, '#030809');
    ctx.fillStyle = cup;
    ctx.beginPath();
    ctx.ellipse(capX, cy, r * 0.58, r * 0.82, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    glow(ctx, u * 0.26);
    ctx.strokeStyle = EMERALD;
    ctx.lineWidth = u * 0.042;
    ctx.beginPath();
    ctx.ellipse(
      capX,
      cy,
      r * 0.4,
      r * 0.6,
      0,
      dir > 0 ? -Math.PI * 0.42 : Math.PI * 0.58,
      dir > 0 ? Math.PI * 0.42 : Math.PI * 1.42,
    );
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = CORE;
    ctx.lineWidth = u * 0.015;
    ctx.stroke();
    ctx.restore();
  };

  // Draw far ear cup behind the head shell when turning in 2.5D
  const farDir = yaw >= 0 ? 1 : -1;
  drawEarCup(farDir);

  /* Head shell */
  const headPath = () => box(ctx, -u * 0.64 + headShiftX * 0.35, -u * 0.6 + headShiftY * 0.4, u * 1.28, u * 0.86, u * 0.4);
  solid(ctx, headPath, headShiftX * 0.35, -u * 0.17 + headShiftY * 0.4, u * 0.64, u * 0.43);

  // Moulded faceplate seam shifted with head rotation
  ctx.strokeStyle = 'rgba(82, 112, 107, .42)';
  ctx.lineWidth = u * 0.012;
  box(ctx, -u * 0.56 + visorShiftX * 0.85, -u * 0.5 + visorShiftY * 0.85, u * 1.12, u * 0.68, u * 0.3);
  ctx.stroke();

  // Draw near ear cup on top of head edge
  drawEarCup(-farDir);

  /* Crown telemetry light */
  if (role !== 0 && role !== 2) {
    ctx.save();
    glow(ctx, u * (0.24 + Math.sin(time * 5) * 0.1), 'rgba(52, 211, 153, .9)');
    ctx.fillStyle = EMERALD;
    box(ctx, -u * 0.15 + visorShiftX * 0.7, -u * 0.645 + visorShiftY * 0.6, u * 0.3, u * 0.075, u * 0.037);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = CORE;
    box(ctx, -u * 0.11 + visorShiftX * 0.7, -u * 0.63 + visorShiftY * 0.6, u * 0.22, u * 0.028, u * 0.014);
    ctx.fill();
    ctx.restore();
  }

  /* Recessed Multi-Layer Optical Visor */
  const vx = -u * 0.5 + visorShiftX;
  const vy = -u * 0.42 + visorShiftY;
  // Outer titanium housing
  ctx.fillStyle = '#03080A';
  box(ctx, vx - u * 0.025, vy - u * 0.025, u * 1.05, u * 0.57, u * 0.265);
  ctx.fill();
  // Chamfered metallic inner rim
  ctx.strokeStyle = 'rgba(255, 255, 255, .18)';
  ctx.lineWidth = u * 0.012;
  box(ctx, vx - u * 0.012, vy - u * 0.012, u * 1.024, u * 0.544, u * 0.252);
  ctx.stroke();

  // Curved obsidian optical glass
  const glass = ctx.createRadialGradient(-u * 0.2 + visorShiftX, -u * 0.36 + visorShiftY, u * 0.02, visorShiftX, -u * 0.12 + visorShiftY, u * 0.65);
  glass.addColorStop(0, '#1C3946');
  glass.addColorStop(0.45, '#0A1821');
  glass.addColorStop(1, '#02060A');
  ctx.fillStyle = glass;
  box(ctx, vx, vy, u * 1.0, u * 0.52, u * 0.24);
  ctx.fill();

  ctx.save();
  ctx.clip();

  // Subtle horizontal optical micro-scanlines inside glass
  ctx.fillStyle = 'rgba(56, 189, 248, .035)';
  for (let sy = vy; sy < vy + u * 0.52; sy += Math.max(2, u * 0.032)) {
    ctx.fillRect(vx, sy, u * 1.0, Math.max(1, u * 0.01));
  }

  // Curved glass counter-reflections (shift opposite head yaw like real convex lens)
  const reflShiftX = -yaw * u * 0.06;
  ctx.fillStyle = 'rgba(255, 255, 255, .11)';
  ctx.beginPath();
  ctx.moveTo(-u * 0.32 + visorShiftX + reflShiftX, vy - u * 0.02);
  ctx.lineTo(-u * 0.1 + visorShiftX + reflShiftX, vy - u * 0.02);
  ctx.lineTo(-u * 0.38 + visorShiftX + reflShiftX, vy + u * 0.54);
  ctx.lineTo(-u * 0.6 + visorShiftX + reflShiftX, vy + u * 0.54);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, .06)';
  ctx.beginPath();
  ctx.moveTo(-u * 0.04 + visorShiftX + reflShiftX, vy - u * 0.02);
  ctx.lineTo(u * 0.03 + visorShiftX + reflShiftX, vy - u * 0.02);
  ctx.lineTo(-u * 0.25 + visorShiftX + reflShiftX, vy + u * 0.54);
  ctx.lineTo(-u * 0.32 + visorShiftX + reflShiftX, vy + u * 0.54);
  ctx.closePath();
  ctx.fill();

  // Lower visor emerald bounce light
  const bounce = ctx.createLinearGradient(0, vy + u * 0.36, 0, vy + u * 0.52);
  bounce.addColorStop(0, 'rgba(52, 211, 153, 0)');
  bounce.addColorStop(1, 'rgba(52, 211, 153, .26)');
  ctx.fillStyle = bounce;
  ctx.fillRect(vx, vy + u * 0.36, u, u * 0.16);

  /* Expressive LED Eyes with Iris Rings, Specular Pinpoints & Smooth Blinking */
  const lookX = visorShiftX + (pose.lookX ?? side * work) * u * 0.05;
  const lookY = visorShiftY + (pose.lookY ?? 0) * u * 0.035;
  const blink = computeBlink(time);
  const smiling = happy > 0.5 || wave > 0.5 || thumb > 0.5;

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
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.moveTo(-u * 0.36 + lookX, -u * 0.17 + lookY);
    ctx.lineTo(u * 0.36 + lookX, -u * 0.17 + lookY);
    neon(u * 0.045);
    ctx.globalAlpha = 1;
    const sweep = Math.sin(time * 3.2) * u * 0.3 + lookX;
    glow(ctx, u * 0.34);
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(sweep, -u * 0.17 + lookY, u * 0.11, u * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();
  } else {
    for (const ex of [-u * 0.21, u * 0.21]) {
      const cx = ex + lookX;
      const cyEye = -u * 0.19 + lookY;
      if (smiling) {
        ctx.beginPath();
        ctx.arc(cx, -u * 0.12 + lookY, u * 0.115, Math.PI * 1.14, Math.PI * 1.86);
        neon(u * 0.085);
      } else if (role === 0) {
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
        // Outer luminous glow
        glow(ctx, u * 0.36);
        ctx.fillStyle = BLUE;
        ctx.beginPath();
        ctx.ellipse(cx, cyEye, u * 0.084, u * 0.118 * blink, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Iris ring
        ctx.strokeStyle = EMERALD;
        ctx.lineWidth = Math.max(1, u * 0.016);
        ctx.beginPath();
        ctx.ellipse(cx, cyEye, u * 0.064, u * 0.092 * blink, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Bright core
        ctx.fillStyle = CORE;
        ctx.beginPath();
        ctx.ellipse(cx - u * 0.01, cyEye - u * 0.014 * blink, u * 0.044, u * 0.072 * blink, 0, 0, Math.PI * 2);
        ctx.fill();

        // Optical lens specular glint
        if (blink > 0.45) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(cx - u * 0.022, cyEye - u * 0.038 * blink, u * 0.016, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  /* Mouth */
  ctx.beginPath();
  if (role === 3 && !smiling) {
    const talk = Math.abs(Math.sin(time * 7)) * u * 0.035 * (0.3 + work);
    ctx.ellipse(lookX * 0.55, u * 0.0 + lookY * 0.7, u * 0.06, u * 0.012 + talk, 0, 0, Math.PI * 2);
  } else {
    const wide = smiling ? 0.085 : 0.06;
    ctx.arc(lookX * 0.55, -u * 0.06 + lookY * 0.7, u * wide, Math.PI * 0.18, Math.PI * 0.82);
  }
  neon(u * 0.038);
  ctx.restore();

  // Visor edge rim catching key & bounce light
  const edge = ctx.createLinearGradient(vx, vy, vx + u, vy + u * 0.52);
  edge.addColorStop(0, 'rgba(255, 255, 255, .58)');
  edge.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
  edge.addColorStop(0.65, 'rgba(52, 211, 153, 0)');
  edge.addColorStop(1, 'rgba(52, 211, 153, .72)');
  ctx.strokeStyle = edge;
  ctx.lineWidth = u * 0.016;
  box(ctx, vx, vy, u * 1.0, u * 0.52, u * 0.24);
  ctx.stroke();

  /* Assessment bot: round glasses & examiner's cap */
  if (role === 2) {
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = u * 0.03;
    for (const ex of [-u * 0.21, u * 0.21]) {
      ctx.beginPath();
      ctx.arc(ex + lookX, -u * 0.19 + lookY, u * 0.16, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(-u * 0.05 + lookX, -u * 0.19 + lookY);
    ctx.lineTo(u * 0.05 + lookX, -u * 0.19 + lookY);
    ctx.stroke();

    ctx.fillStyle = INK;
    box(ctx, -u * 0.36 + headShiftX * 0.5, -u * 0.7 + headShiftY * 0.5, u * 0.72, u * 0.14, u * 0.04);
    ctx.fill();
    const cap = ctx.createLinearGradient(-u * 0.78, -u * 0.98, u * 0.78, -u * 0.64);
    cap.addColorStop(0, '#364F4D');
    cap.addColorStop(0.5, '#132829');
    cap.addColorStop(1, '#040B0C');
    ctx.fillStyle = cap;
    ctx.beginPath();
    ctx.moveTo(headShiftX * 0.5, -u * 0.98 + headShiftY * 0.5);
    ctx.lineTo(u * 0.78 + headShiftX * 0.5, -u * 0.8 + headShiftY * 0.5);
    ctx.lineTo(headShiftX * 0.5, -u * 0.64 + headShiftY * 0.5);
    ctx.lineTo(-u * 0.78 + headShiftX * 0.5, -u * 0.8 + headShiftY * 0.5);
    ctx.closePath();
    ctx.fill();
    const swing = Math.sin(time * 2.4) * u * 0.06;
    ctx.strokeStyle = EMERALD;
    ctx.lineWidth = u * 0.03;
    ctx.beginPath();
    ctx.moveTo(headShiftX * 0.5, -u * 0.81 + headShiftY * 0.5);
    ctx.lineTo(u * 0.56 + headShiftX * 0.5, -u * 0.76 + headShiftY * 0.5);
    ctx.lineTo(u * 0.58 + swing + headShiftX * 0.5, -u * 0.48 + headShiftY * 0.5);
    ctx.stroke();
    ctx.fillStyle = EMERALD;
    ctx.beginPath();
    ctx.arc(u * 0.58 + swing + headShiftX * 0.5, -u * 0.46 + headShiftY * 0.5, u * 0.05, 0, Math.PI * 2);
    ctx.fill();
  }

  /* Interview bot: boom microphone */
  if (role === 3) {
    ctx.strokeStyle = '#040B0C';
    ctx.lineWidth = u * 0.045;
    ctx.beginPath();
    ctx.moveTo(-side * u * 0.7 + headShiftX * 0.3, u * 0.02 + headShiftY * 0.4);
    ctx.quadraticCurveTo(
      -side * u * 0.64 + headShiftX * 0.5,
      u * 0.36 + headShiftY * 0.5,
      -side * u * 0.22 + lookX * 0.5,
      u * 0.2 + lookY * 0.5,
    );
    ctx.stroke();
    joint(ctx, -side * u * 0.19 + lookX * 0.5, u * 0.19 + lookY * 0.5, u * 0.07);
    ctx.fillStyle = EMERALD;
    ctx.beginPath();
    ctx.arc(-side * u * 0.19 + lookX * 0.5, u * 0.19 + lookY * 0.5, u * 0.022, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore(); // End head 2.5D group

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

  /* Thumbs-up sparks */
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
      glow(ctx, u * 0.2, 'rgba(52, 211, 153, .9)');
      ctx.strokeStyle = EMERALD;
      ctx.lineWidth = u * 0.038;
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.restore();
}
