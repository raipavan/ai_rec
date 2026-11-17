import { useEffect, useRef } from 'react';
import { drawBot } from '../lib/bot';
import { prefersReducedMotion } from '../lib/motion';

interface BotBuddyProps {
  /** Which specialist it is dressed as: 0 sourcing, 1 screening, 2 assessment, 3 interview, 4 offer. */
  role?: number;
  /** `thumb` gives a thumbs-up, `wave` waves hello. */
  gesture?: 'thumb' | 'wave';
  /** Canvas size in CSS pixels. */
  size?: number;
  className?: string;
}

/** The bot, hovering beside a call-to-action or a page hero: it gestures and watches the pointer. */
export function BotBuddy({ role = 1, gesture = 'thumb', size = 240, className = '' }: BotBuddyProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let frame = 0;
    let visible = false;
    let targetX = 0;
    let targetY = 0;
    let lookX = 0;
    let lookY = 0;

    const draw = (now: number) => {
      frame = 0;
      const time = still ? 1 : now / 1000;
      lookX += (targetX - lookX) * 0.12;
      lookY += (targetY - lookY) * 0.12;
      ctx.clearRect(0, 0, size, size);
      drawBot(ctx, size * 0.42, size * 0.4 + (still ? 0 : Math.sin(time * 2) * 3), size * 0.3, time, {
        role,
        side: 1,
        thumb: gesture === 'thumb' ? 1 : 0,
        wave: gesture === 'wave' ? 1 : 0,
        lookX,
        lookY,
      });
      if (!still && visible) frame = requestAnimationFrame(draw);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / 320));
      targetY = Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / 320));
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
  }, [role, gesture, size]);

  return (
    <canvas
      className={`bot-buddy ${className}`.trim()}
      style={{ width: size, height: size }}
      ref={ref}
      aria-hidden="true"
    />
  );
}
