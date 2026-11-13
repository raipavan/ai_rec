import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/**
 * Hero backdrop: a slow field of connected points, like candidates being
 * matched. Links brighten near the pointer. Draws one still frame under
 * reduced motion and stops when the hero is off screen.
 */
export function Network() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let pointerX = -9999;
    let pointerY = -9999;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, Math.max(24, (width * height) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.6,
      }));
      if (still) draw();
    };

    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      const reach = Math.min(170, width * 0.22);

      for (const node of nodes) {
        if (!still) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        const near = Math.max(0, 1 - Math.hypot(a.x - pointerX, a.y - pointerY) / 220);
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > reach) continue;
          const strength = 1 - distance / reach;
          ctx.strokeStyle = `rgba(6, 182, 212, ${strength * (0.24 + near * 0.6)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${0.35 + near * 0.6})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r + near * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!still && visible) frame = requestAnimationFrame(draw);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
    };
    const observer = new IntersectionObserver((entries) => {
      visible = Boolean(entries[0]?.isIntersecting);
      if (visible && !frame && !still) frame = requestAnimationFrame(draw);
    });
    const sizeObserver = new ResizeObserver(resize);

    resize();
    observer.observe(canvas);
    sizeObserver.observe(canvas);
    window.addEventListener('pointermove', onPointer, { passive: true });

    return () => {
      observer.disconnect();
      sizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas className="hero-net" ref={ref} aria-hidden="true" />;
}
