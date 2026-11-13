import { useEffect, useRef } from 'react';
import { drawBot } from '../lib/bot';
import { prefersReducedMotion } from '../lib/motion';

/** The bot, hovering beside the demo call-to-action: it gives a thumbs-up and watches the pointer. */
export function BotBuddy() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    const size = 240;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let frame = 0;
    let visible = false;
    let lookX = 0;
    let lookY = 0;

    const draw = (now: number) => {
      frame = 0;
      const time = still ? 1 : now / 1000;
      ctx.clearRect(0, 0, size, size);
      drawBot(ctx, size * 0.42, size * 0.4 + (still ? 0 : Math.sin(time * 2) * 3), 72, time, {
        role: 1,
        side: 1,
        thumb: 1,
        lookX,
        lookY,
      });
      if (!still && visible) frame = requestAnimationFrame(draw);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      lookX = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / 320));
      lookY = Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / 320));
    };
    const observer = new IntersectionObserver((entries) => {
      visible = Boolean(entries[0]?.isIntersecting);
      if (visible && !frame) frame = requestAnimationFrame(draw);
    });

    observer.observe(canvas);
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onPointer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas className="bot-buddy" ref={ref} aria-hidden="true" />;
}
