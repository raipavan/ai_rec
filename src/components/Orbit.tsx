import { useEffect, useRef } from 'react';
import { integrations } from '../data/content';
import { prefersReducedMotion } from '../lib/motion';

/**
 * 3D integration orbit: the systems a customer already runs circle a turning
 * hub on three tilted rings, with data pulses travelling both ways. Drawn on
 * a 2D canvas with a hand-rolled perspective projection, so there is no 3D
 * library to load. Decorative: the tile grid beside it carries the names.
 */

const RINGS = [
  { radius: 0.29, incline: 0.52, roll: -0.38, speed: 0.34 },
  { radius: 0.39, incline: 0.44, roll: 0.3, speed: -0.26 },
  { radius: 0.48, incline: 0.6, roll: 0.95, speed: 0.2 },
];

interface Point {
  x: number;
  y: number;
  z: number;
  scale: number;
}

export function Orbit() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    let size = 0;
    let frame = 0;
    let visible = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.getBoundingClientRect().width;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (still) draw(0);
    };

    const project = (ring: (typeof RINGS)[number], theta: number): Point => {
      const r = ring.radius * size;
      const x0 = r * Math.cos(theta);
      const y0 = r * Math.sin(theta) * Math.sin(ring.incline);
      const z = r * Math.sin(theta) * Math.cos(ring.incline);
      const x = x0 * Math.cos(ring.roll) - y0 * Math.sin(ring.roll);
      const y = x0 * Math.sin(ring.roll) + y0 * Math.cos(ring.roll);
      const focal = size * 2.2;
      const scale = focal / (focal + z);
      return { x: size / 2 + x * scale, y: size / 2 + y * scale, z, scale };
    };

    const drawRing = (ring: (typeof RINGS)[number], front: boolean) => {
      const steps = 72;
      ctx.lineWidth = 1.2;
      for (let i = 0; i < steps; i += 1) {
        const a = project(ring, (i / steps) * Math.PI * 2);
        const b = project(ring, ((i + 1) / steps) * Math.PI * 2);
        if (a.z < 0 !== front) continue;
        ctx.strokeStyle = `rgba(165, 180, 252, ${front ? 0.7 : 0.3})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    };

    const drawChip = (p: Point, mark: string, front: boolean) => {
      const r = Math.max(14, size * 0.054) * p.scale;
      ctx.globalAlpha = front ? 1 : 0.6;
      const fill = ctx.createRadialGradient(p.x - r * 0.3, p.y - r * 0.4, r * 0.1, p.x, p.y, r);
      fill.addColorStop(0, '#3B4FA8');
      fill.addColorStop(1, '#1B2B60');
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = front ? '#06B6D4' : 'rgba(6, 182, 212, .6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `600 ${Math.round(r * (mark.length > 2 ? 0.62 : 0.78))}px "Plus Jakarta Sans", system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(mark, p.x, p.y + r * 0.04);
      ctx.globalAlpha = 1;
    };

    const draw = (now: number) => {
      frame = 0;
      const time = still ? 2.4 : now / 1000;
      const c = size / 2;
      const hub = size * 0.14;
      ctx.clearRect(0, 0, size, size);

      const chips = integrations.map((integration, i) => {
        const ring = RINGS[i % RINGS.length];
        const slot = Math.floor(i / RINGS.length);
        const perRing = Math.ceil(integrations.length / RINGS.length);
        const theta = time * ring.speed + (slot / perRing) * Math.PI * 2 + (i % RINGS.length) * 0.5;
        return { point: project(ring, theta), mark: integration.mark, index: i };
      });

      /* Back half: rings and chips behind the hub */
      RINGS.forEach((ring) => drawRing(ring, false));

      /* Two-way sync: a pulse runs along each link, alternating direction */
      for (const chip of chips) {
        const p = chip.point;
        ctx.strokeStyle = 'rgba(6, 182, 212, .14)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(c, c);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        const travel = (time * 0.55 + chip.index * 0.37) % 1;
        const k = chip.index % 2 ? travel : 1 - travel;
        ctx.fillStyle = `rgba(34, 211, 238, ${0.9 * Math.sin(Math.PI * travel)})`;
        ctx.beginPath();
        ctx.arc(c + (p.x - c) * k, c + (p.y - c) * k, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      chips.filter((chip) => chip.point.z >= 0).forEach((chip) => drawChip(chip.point, chip.mark, false));

      /* Hub: a lit sphere with turning meridians */
      const halo = ctx.createRadialGradient(c, c, hub * 0.6, c, c, hub * 2.1);
      halo.addColorStop(0, 'rgba(79, 70, 229, .55)');
      halo.addColorStop(1, 'rgba(79, 70, 229, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(c, c, hub * 2.1, 0, Math.PI * 2);
      ctx.fill();
      const ball = ctx.createRadialGradient(c - hub * 0.4, c - hub * 0.45, hub * 0.1, c, c, hub);
      ball.addColorStop(0, '#8B90FA');
      ball.addColorStop(0.55, '#4F46E5');
      ball.addColorStop(1, '#1E1B6B');
      ctx.fillStyle = ball;
      ctx.beginPath();
      ctx.arc(c, c, hub, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(c, c);
      ctx.rotate(-0.32);
      ctx.beginPath();
      ctx.arc(0, 0, hub, 0, Math.PI * 2);
      ctx.clip();
      ctx.lineWidth = 1;
      for (let m = 0; m < 6; m += 1) {
        const turn = time * 0.5 + (m * Math.PI) / 6;
        const width = Math.cos(turn);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 + Math.abs(width) * 0.2})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.abs(width) * hub, hub, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (const lat of [-0.55, 0, 0.55]) {
        ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
        ctx.beginPath();
        ctx.ellipse(0, lat * hub, Math.sqrt(1 - lat * lat) * hub, Math.sqrt(1 - lat * lat) * hub * 0.22, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
      ctx.strokeStyle = 'rgba(6, 182, 212, .7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(c, c, hub, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `italic 700 ${Math.round(hub * 0.52)}px "Plus Jakarta Sans", system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('365', c, c + hub * 0.03);

      /* Front half */
      RINGS.forEach((ring) => drawRing(ring, true));
      chips
        .filter((chip) => chip.point.z < 0)
        .sort((a, b) => b.point.z - a.point.z)
        .forEach((chip) => drawChip(chip.point, chip.mark, true));

      if (!still && visible) frame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver((entries) => {
      visible = Boolean(entries[0]?.isIntersecting);
      if (visible && !frame && !still) frame = requestAnimationFrame(draw);
    });
    const sizeObserver = new ResizeObserver(resize);

    resize();
    observer.observe(canvas);
    sizeObserver.observe(canvas);
    return () => {
      observer.disconnect();
      sizeObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas className="orbit" ref={ref} aria-hidden="true" />;
}
