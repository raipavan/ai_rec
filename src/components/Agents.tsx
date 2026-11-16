import { useEffect, useRef, useState } from 'react';
import { agents } from '../data/content';
import { accent } from '../lib/accent';
import { box, check, drawBot } from '../lib/bot';
import { prefersReducedMotion } from '../lib/motion';

/* ------------------------------------------------------------------
   Scroll-driven scene. The section is several screens tall and its
   content is pinned; scrolling scrubs one requisition down a line of
   five AI agents. Candidates are particles: each agent passes some on
   and the rest sink into the talent pool at the bottom, kept for the
   next role. A bot flies from station to station and does that
   agent's job there (searching, scanning resumes, grading, interviewing,
   signing the offer) on its own clock, so the scene is alive even when the
   page is still.
   ------------------------------------------------------------------ */

const STAGES = agents.length;
const HOLD = 0.35; // extra scroll at the end so the last frame can be read
const CLUSTER = [1, 0.85, 0.55, 0.38, 0];

const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const ease = (x: number) => {
  const c = clamp(x);
  return c * c * (3 - 2 * c);
};
const mix = (a: number, b: number, k: number) => a + (b - a) * k;

interface Particle {
  sx: number;
  sy: number;
  ox: number;
  oy: number;
  lag: number;
  reach: number;
  px: number;
  py: number;
  size: number;
  phase: number;
  dir: number;
}

function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeParticles(total: number): Particle[] {
  const random = seeded(365);
  const top = agents[0].count;
  // How many particles get at least as far as each station.
  const reachAtLeast = agents.map((agent, k) =>
    k === 0 ? total : Math.max(STAGES - k, Math.round((agent.count / top) * total)),
  );

  return Array.from({ length: total }, (_, i) => {
    let reach = 0;
    for (let k = 1; k < STAGES; k += 1) if (i < reachAtLeast[k]) reach = k;
    const angle = random() * Math.PI * 2;
    const radius = Math.sqrt(random());
    return {
      sx: random(),
      sy: random(),
      ox: Math.cos(angle) * radius,
      oy: Math.sin(angle) * radius,
      lag: random(),
      reach,
      px: random() - 0.5,
      py: random(),
      size: 1.1 + random() * 1.5,
      phase: random() * Math.PI * 2,
      dir: random() > 0.5 ? 1 : -1,
    };
  });
}

/* ---------- Canvas drawing: what the bot is doing at each station ---------- */

type Ctx = CanvasRenderingContext2D;

/** Scan cone from the bot's visor down onto the candidates it is working on. */
function drawBeam(ctx: Ctx, bx: number, by: number, sx: number, cy: number, radius: number, time: number, strength: number) {
  if (strength <= 0.02) return;
  const sweep = sx + Math.sin(time * 1.7) * radius * 0.75;
  const spread = Math.max(14, radius * 0.5);
  const beam = ctx.createLinearGradient(bx, by, sweep, cy);
  beam.addColorStop(0, `rgba(6, 182, 212, ${0.5 * strength})`);
  beam.addColorStop(1, 'rgba(6, 182, 212, 0)');
  ctx.fillStyle = beam;
  ctx.beginPath();
  ctx.moveTo(bx - 4, by);
  ctx.lineTo(bx + 4, by);
  ctx.lineTo(sweep + spread, cy + radius * 0.4);
  ctx.lineTo(sweep - spread, cy + radius * 0.4);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = `rgba(255, 255, 255, ${0.7 * strength})`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(sweep - spread, cy);
  ctx.lineTo(sweep + spread, cy);
  ctx.stroke();
}

/** A sheet of paper with a few lines on it; the base of several task props. */
function sheet(ctx: Ctx, x: number, y: number, w: number, h: number, u: number) {
  ctx.fillStyle = '#FFFFFF';
  box(ctx, x, y, w, h, u * 0.1);
  ctx.fill();
}

function lines(ctx: Ctx, x: number, y: number, w: number, gap: number, widths: number[], u: number) {
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = u * 0.06;
  ctx.lineCap = 'round';
  widths.forEach((share, i) => {
    ctx.beginPath();
    ctx.moveTo(x, y + i * gap);
    ctx.lineTo(x + w * share, y + i * gap);
    ctx.stroke();
  });
}

/** What the bot is doing at each station, drawn beside it. */
function drawTask(ctx: Ctx, stage: number, x: number, y: number, u: number, time: number) {
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (stage === 0) {
    /* Sourcing: radar pings and a magnifier sweeping over profiles */
    for (let ring = 0; ring < 3; ring += 1) {
      const grow = (time * 0.6 + ring / 3) % 1;
      ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - grow) * 0.7})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, u * (0.3 + grow * 0.9), 0, Math.PI * 2);
      ctx.stroke();
    }
    const mx = x + Math.cos(time * 1.6) * u * 0.3;
    const my = y + Math.sin(time * 1.6) * u * 0.22;
    ctx.fillStyle = 'rgba(6, 182, 212, .22)';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = u * 0.09;
    ctx.beginPath();
    ctx.arc(mx, my, u * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mx + u * 0.22, my + u * 0.22);
    ctx.lineTo(mx + u * 0.46, my + u * 0.46);
    ctx.stroke();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(mx, my - u * 0.07, u * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(mx, my + u * 0.16, u * 0.15, Math.PI, 0);
    ctx.fill();
    return;
  }

  if (stage === 1) {
    /* Screening: resumes come in one by one, get scanned and marked */
    const turn = time * 0.9;
    const cycle = turn % 1;
    const pass = Math.floor(turn) % 3 !== 2;
    const enter = ease(cycle / 0.18);
    const leave = ease((cycle - 0.84) / 0.16);
    const w = u * 0.95;
    const h = u * 1.2;
    const dx = x - w / 2 + (1 - enter) * u * 0.5;
    const dy = y - h / 2 + leave * u * 0.5 * (pass ? -1 : 1);
    ctx.save();
    ctx.globalAlpha *= enter * (1 - leave);
    sheet(ctx, dx, dy, w, h, u);
    ctx.fillStyle = '#C7D2FE';
    ctx.beginPath();
    ctx.arc(dx + u * 0.24, dy + u * 0.26, u * 0.12, 0, Math.PI * 2);
    ctx.fill();
    lines(ctx, dx + u * 0.44, dy + u * 0.2, w - u * 0.58, u * 0.13, [1, 0.6], u);
    lines(ctx, dx + u * 0.14, dy + u * 0.52, w - u * 0.28, u * 0.15, [1, 0.85, 0.95, 0.55], u);
    const scan = clamp((cycle - 0.18) / 0.42);
    if (scan > 0 && scan < 1) {
      const sy = dy + scan * h;
      const glow = ctx.createLinearGradient(0, sy - u * 0.3, 0, sy);
      glow.addColorStop(0, 'rgba(6, 182, 212, 0)');
      glow.addColorStop(1, 'rgba(6, 182, 212, .45)');
      ctx.fillStyle = glow;
      ctx.fillRect(dx, Math.max(dy, sy - u * 0.3), w, Math.min(u * 0.3, sy - dy));
      ctx.strokeStyle = '#06B6D4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(dx - u * 0.06, sy);
      ctx.lineTo(dx + w + u * 0.06, sy);
      ctx.stroke();
    }
    if (cycle > 0.62) {
      const pop = ease((cycle - 0.62) / 0.1);
      if (pass) check(ctx, dx + w - u * 0.04, dy + u * 0.04, u * 0.2 * pop);
      else {
        ctx.fillStyle = '#C7D2FE';
        ctx.beginPath();
        ctx.arc(dx + w - u * 0.04, dy + u * 0.04, u * 0.2 * pop, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#172554';
        ctx.lineWidth = u * 0.05;
        ctx.beginPath();
        ctx.moveTo(dx + w - u * 0.04, dy - u * 0.05);
        ctx.lineTo(dx + w - u * 0.04, dy + u * 0.13);
        ctx.moveTo(dx + w - u * 0.11, dy + u * 0.06);
        ctx.lineTo(dx + w - u * 0.04, dy + u * 0.13);
        ctx.lineTo(dx + w + u * 0.03, dy + u * 0.06);
        ctx.stroke();
      }
    }
    ctx.restore();
    return;
  }

  if (stage === 2) {
    /* Assessment: a test sheet being ticked off, with the score filling in */
    const cycle = (time * 0.42) % 1;
    const w = u * 1.0;
    const h = u * 1.25;
    const dx = x - w / 2;
    const dy = y - h / 2;
    sheet(ctx, dx, dy, w, h, u);
    ctx.fillStyle = '#4F46E5';
    box(ctx, x - u * 0.2, dy - u * 0.07, u * 0.4, u * 0.16, u * 0.05);
    ctx.fill();
    for (let row = 0; row < 3; row += 1) {
      const ry = dy + u * 0.32 + row * u * 0.26;
      const ticked = ease((cycle - (row + 0.6) / 5) / 0.08);
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = u * 0.04;
      box(ctx, dx + u * 0.13, ry - u * 0.08, u * 0.16, u * 0.16, u * 0.04);
      ctx.stroke();
      if (ticked > 0) check(ctx, dx + u * 0.21, ry, u * 0.1 * ticked);
      lines(ctx, dx + u * 0.4, ry, w - u * 0.55, 0, [row === 1 ? 0.7 : 1], u);
    }
    const score = ease((cycle - 0.15) / 0.6);
    ctx.lineWidth = u * 0.07;
    ctx.strokeStyle = '#E2E8F0';
    ctx.beginPath();
    ctx.arc(x, dy + h - u * 0.05, u * 0.26, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#06B6D4';
    ctx.beginPath();
    ctx.arc(x, dy + h - u * 0.05, u * 0.26, Math.PI, Math.PI * (1 + 0.86 * score));
    ctx.stroke();
    return;
  }

  if (stage === 3) {
    /* Interview: a video call with the candidate, voice level and the bot's questions */
    const w = u * 1.35;
    const h = u * 0.95;
    const dx = x - w / 2;
    const dy = y - h / 2 + u * 0.1;
    ctx.fillStyle = '#0F1A45';
    ctx.strokeStyle = '#06B6D4';
    ctx.lineWidth = 2;
    box(ctx, dx, dy, w, h, u * 0.12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(dx + u * 0.4, dy + u * 0.36, u * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(dx + u * 0.4, dy + u * 0.82, u * 0.27, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#06B6D4';
    for (let bar = 0; bar < 6; bar += 1) {
      const level = u * (0.1 + Math.abs(Math.sin(time * 5 + bar * 1.3)) * 0.34);
      box(ctx, dx + u * 0.76 + bar * u * 0.085, dy + h / 2 - level / 2, u * 0.05, level, u * 0.02);
      ctx.fill();
    }
    ctx.fillStyle = '#FFFFFF';
    box(ctx, dx - u * 0.1, dy - u * 0.42, u * 0.62, u * 0.34, u * 0.14);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(dx, dy - u * 0.12);
    ctx.lineTo(dx - u * 0.12, dy + u * 0.02);
    ctx.lineTo(dx + u * 0.14, dy - u * 0.12);
    ctx.fill();
    ctx.fillStyle = '#4F46E5';
    for (let dot = 0; dot < 3; dot += 1) {
      const hop = Math.max(0, Math.sin(time * 5 - dot * 0.9)) * u * 0.05;
      ctx.beginPath();
      ctx.arc(dx + u * 0.07 + dot * u * 0.14, dy - u * 0.25 - hop, u * 0.04, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }

  /* Offer: the letter gets signed and sealed */
  const cycle = Math.min(1, (time % 3.4) / 1.7);
  const w = u * 1.0;
  const h = u * 1.25;
  const dx = x - w / 2;
  const dy = y - h / 2;
  sheet(ctx, dx, dy, w, h, u);
  ctx.fillStyle = '#4F46E5';
  box(ctx, dx + u * 0.14, dy + u * 0.14, u * 0.34, u * 0.1, u * 0.04);
  ctx.fill();
  lines(ctx, dx + u * 0.14, dy + u * 0.42, w - u * 0.28, u * 0.15, [1, 0.9, 0.65], u);
  const length = u * 1.1;
  ctx.strokeStyle = '#172554';
  ctx.lineWidth = u * 0.05;
  ctx.setLineDash([length, length]);
  ctx.lineDashOffset = length * (1 - ease(cycle / 0.75));
  ctx.beginPath();
  ctx.moveTo(dx + u * 0.14, dy + h - u * 0.24);
  ctx.bezierCurveTo(dx + u * 0.26, dy + h - u * 0.5, dx + u * 0.32, dy + h - u * 0.02, dx + u * 0.44, dy + h - u * 0.26);
  ctx.bezierCurveTo(dx + u * 0.5, dy + h - u * 0.4, dx + u * 0.56, dy + h - u * 0.12, dx + u * 0.68, dy + h - u * 0.24);
  ctx.stroke();
  ctx.setLineDash([]);
  const seal = ease((cycle - 0.75) / 0.2);
  if (seal > 0) check(ctx, dx + w - u * 0.04, dy + h - u * 0.2, u * 0.24 * seal);
}

export function Agents() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countRefs = useRef<(HTMLElement | null)[]>([]);
  const stationRefs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsStatic(true);
      return;
    }

    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!section || !stage || !canvas || !ctx) {
      setIsStatic(true);
      return;
    }

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let visible = false;
    let shown = 0;
    let lastStage = -1;
    let lastStarted = false;

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const total = width < 700 ? 150 : 300;
      if (particles.length !== total) particles = makeParticles(total);
    };

    const target = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      return clamp(-rect.top / Math.max(travel, 1)) * (STAGES + HOLD);
    };

    const draw = (now: number) => {
      frame = 0;
      if (!visible) return;
      frame = requestAnimationFrame(draw);

      const time = now / 1000;
      shown += (Math.min(target(), STAGES) - shown) * 0.14;
      const t = shown;

      const stationX = (k: number) => width * (0.1 + 0.2 * k);
      const cy = height * 0.52;
      const base = Math.min(width * 0.09, height * 0.16);
      const unit = Math.max(30, Math.min(84, height * 0.14, width * 0.1));
      const poolTop = height * 0.87;

      ctx.clearRect(0, 0, width, height);

      /* Talent pool */
      ctx.beginPath();
      ctx.moveTo(0, poolTop);
      for (let x = 0; x <= width; x += 16) {
        ctx.lineTo(x, poolTop + Math.sin(x * 0.012 + time * 0.9) * 4 + Math.sin(x * 0.031 - time * 0.6) * 2);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const water = ctx.createLinearGradient(0, poolTop, 0, height);
      water.addColorStop(0, 'rgba(79, 70, 229, .34)');
      water.addColorStop(1, 'rgba(79, 70, 229, .06)');
      ctx.fillStyle = water;
      ctx.fill();

      /* Line between stations: dim track, lit and flowing once the hand-off starts */
      ctx.lineWidth = 1.5;
      for (let k = 0; k < STAGES - 1; k += 1) {
        const x0 = stationX(k);
        const x1 = stationX(k + 1);
        ctx.setLineDash([]);
        ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
        ctx.beginPath();
        ctx.moveTo(x0, cy);
        ctx.lineTo(x1, cy);
        ctx.stroke();

        const lit = clamp((t - (k + 1)) / 0.5);
        if (lit > 0) {
          ctx.setLineDash([5, 9]);
          ctx.lineDashOffset = -time * 34;
          ctx.strokeStyle = 'rgba(6, 182, 212, .7)';
          ctx.beginPath();
          ctx.moveTo(x0, cy);
          ctx.lineTo(mix(x0, x1, lit), cy);
          ctx.stroke();
        }
      }
      ctx.setLineDash([]);

      /* Candidates */
      let winnerX = 0;
      let winnerY = 0;
      for (const p of particles) {
        let x = p.sx * width + Math.sin(time * 0.4 + p.phase) * 7;
        let y = height * 0.03 + p.sy * height * 0.78 + Math.cos(time * 0.33 + p.phase) * 7;
        const gather = ease((t - p.lag * 0.45) / 0.55);
        x = mix(x, stationX(0) + p.ox * base * CLUSTER[0], gather);
        y = mix(y, cy + p.oy * base * CLUSTER[0], gather);

        for (let k = 1; k <= p.reach && t > k; k += 1) {
          const move = ease((t - k - p.lag * 0.45) / 0.55);
          x = mix(x, stationX(k) + p.ox * base * CLUSTER[k], move);
          y = mix(y, cy + p.oy * base * CLUSTER[k], move) - Math.sin(Math.PI * move) * base * 0.55 * p.dir;
        }

        let pooled = 0;
        if (p.reach < STAGES - 1 && t > p.reach + 1) {
          pooled = ease((t - (p.reach + 1) - p.lag * 0.4) / 0.6);
          const poolX = Math.min(width - 12, Math.max(12, stationX(p.reach) + p.px * width * 0.17));
          const poolY = poolTop + 14 + p.py * (height - poolTop - 26) + Math.sin(time * 0.8 + p.phase) * 3;
          x = mix(x, poolX, pooled);
          y = mix(y, poolY, pooled);
        }

        if (p.reach === STAGES - 1) {
          winnerX = x;
          winnerY = y;
        }

        const twinkle = 0.75 + Math.sin(time * 1.7 + p.phase) * 0.25;
        if (pooled > 0.5) ctx.fillStyle = `rgba(199, 210, 254, ${0.5 * twinkle})`;
        else if (gather > 0.5) ctx.fillStyle = `rgba(6, 182, 212, ${0.95 * twinkle})`;
        else ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * twinkle})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      /* The hire */
      const hired = clamp((t - (STAGES - 1) - 0.45) / 0.45);
      if (hired > 0) {
        for (let ring = 0; ring < 3; ring += 1) {
          const grow = (time * 0.45 + ring / 3) % 1;
          ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - grow) * 0.55 * hired})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(winnerX, winnerY, 8 + grow * base * 0.9, 0, Math.PI * 2);
          ctx.stroke();
        }
        const glow = ctx.createRadialGradient(winnerX, winnerY, 0, winnerX, winnerY, 22);
        glow.addColorStop(0, `rgba(255, 255, 255, ${hired})`);
        glow.addColorStop(0.35, `rgba(6, 182, 212, ${0.8 * hired})`);
        glow.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(winnerX, winnerY, 22, 0, Math.PI * 2);
        ctx.fill();
      }

      /* Station markers on the line */
      for (let k = 0; k < STAGES; k += 1) {
        const reached = t > k + 0.05;
        ctx.fillStyle = reached ? '#06B6D4' : '#172554';
        ctx.strokeStyle = reached ? 'rgba(6, 182, 212, .35)' : 'rgba(255, 255, 255, .4)';
        ctx.lineWidth = reached ? 6 : 1.5;
        ctx.beginPath();
        ctx.arc(stationX(k), cy, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      /* The bot: flies to each station in the first part of a phase, then works there */
      const phase = Math.min(STAGES - 1, Math.floor(t));
      const within = Math.min(1, t - phase);
      const fly = phase === 0 ? 1 : ease(within / 0.42);
      const leaving = phase < STAGES - 1 ? 1 - ease((within - 0.9) / 0.1) : 1;
      const work = (phase === 0 ? ease(t / 0.2 + 0.4) : ease((within - 0.36) / 0.2)) * leaving;
      const fromX = stationX(Math.max(0, phase - 1));
      const botX = mix(fromX, stationX(phase), fly);
      const lift = Math.sin(Math.PI * fly) * unit * 0.35;
      const botY = cy - base - unit * 1.2 - (phase === 0 ? 0 : lift) + Math.sin(time * 2.1) * unit * 0.05;
      const tilt = phase === 0 ? 0 : Math.sin(Math.PI * fly) * 0.2;
      const side = phase === STAGES - 1 ? -1 : 1;

      drawBeam(ctx, botX, botY, stationX(phase), cy, base * Math.max(CLUSTER[phase], 0.3), time, work * (hired > 0.5 ? 0 : 1));
      drawBot(ctx, botX, botY, unit, time, {
        // the bot swaps its gear mid-flight, between two stations
        role: phase > 0 && fly < 0.5 ? phase - 1 : phase,
        tilt,
        work,
        side,
        happy: hired,
        flying: phase === 0 ? 0 : 1 - Math.abs(fly * 2 - 1),
      });
      if (work > 0.02) {
        ctx.save();
        ctx.globalAlpha = work;
        drawTask(ctx, phase, botX + side * unit * 1.75, botY - unit * 0.1 + (1 - work) * unit * 0.3, unit, time);
        ctx.restore();
      }

      /* Text that follows the scene, written straight to the DOM */
      agents.forEach((agent, k) => {
        const arrived = ease(t - k);
        const node = countRefs.current[k];
        const value = String(Math.round(agent.count * arrived));
        if (node && node.textContent !== value) node.textContent = value;
        stationRefs.current[k]?.classList.toggle('is-on', t > k + 0.05);
      });

      const stageNow = Math.min(STAGES - 1, Math.floor(t + 0.02));
      if (stageNow !== lastStage) {
        lastStage = stageNow;
        setCurrent(stageNow);
      }
      const startedNow = t > 0.12;
      if (startedNow !== lastStarted) {
        lastStarted = startedNow;
        setStarted(startedNow);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      visible = Boolean(entries[0]?.isIntersecting);
      if (visible && !frame) frame = requestAnimationFrame(draw);
    });
    const sizeObserver = new ResizeObserver(resize);

    resize();
    shown = target();
    observer.observe(section);
    sizeObserver.observe(stage);

    return () => {
      observer.disconnect();
      sizeObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const jumpTo = (k: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((k + 0.96) / (STAGES + HOLD)) * travel, behavior: 'smooth' });
  };

  return (
    <section
      className={`agents on-dark${isStatic ? ' agents--static' : ''}`}
      id="agents"
      ref={sectionRef}
    >
      <div className="agents-pin">
        <div className="container agents-head">
          <div>
            <h2>{accent('Five *AI agents* work every requisition')}</h2>
            <p className="agents-sub">
              Each one finishes its part and hands the candidates on. Your recruiters step in where
              judgment matters.
            </p>
          </div>

          <ol className="agents-captions">
            {agents.map((agent, k) => (
              <li key={agent.name} className={k === current ? 'is-current' : undefined}>
                <h3>{agent.name}</h3>
                <p>{agent.body}</p>
                <p className="agents-result">
                  <b>{agent.count}</b> {agent.countLabel}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="agents-stage" ref={stageRef}>
          <canvas ref={canvasRef} aria-hidden="true" />

          <ul className="agents-stations">
            {agents.map((agent, k) => (
              <li
                key={agent.station}
                ref={(node) => {
                  stationRefs.current[k] = node;
                }}
                className={k === current ? 'is-current' : undefined}
                style={{ left: `${10 + 20 * k}%` }}
              >
                <button type="button" onClick={() => jumpTo(k)} aria-label={`Jump to the ${agent.name.toLowerCase()}`}>
                  <b
                    ref={(node) => {
                      countRefs.current[k] = node;
                    }}
                  >
                    0
                  </b>
                  {agent.station}
                </button>
              </li>
            ))}
          </ul>

          <p className="agents-pool">Talent pool: every other profile stays warm for the next role</p>
          <p className={`agents-hint${started ? ' is-hidden' : ''}`} aria-hidden="true">
            <span />
            Scroll to run the requisition
          </p>
        </div>
      </div>
    </section>
  );
}
