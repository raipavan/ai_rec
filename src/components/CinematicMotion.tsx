import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode, type RefObject } from 'react';
import { prefersReducedMotion } from '../lib/motion';

interface CinematicCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'left' | 'right' | 'zoom';
  tilt?: number;
  id?: string;
  style?: CSSProperties;
  as?: 'div' | 'article' | 'li';
}

/**
 * Interactive card wrapper with IntersectionObserver scroll-reveal
 * and GPU-accelerated 3D pointer tilt + radial cursor spotlight.
 */
export function CinematicCard({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  tilt = 1,
  id,
  style,
  as = 'article',
}: CinematicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion() || tilt === 0) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    el.style.setProperty('--mx', `${x.toFixed(1)}px`);
    el.style.setProperty('--my', `${y.toFixed(1)}px`);
    el.style.setProperty('--rx', `${(-py * 5 * tilt).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 6 * tilt).toFixed(2)}deg`);
  };

  const handlePointerLeave = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const Tag = as;
  const mergedStyle = {
    '--cin-delay': `${delay * 85}ms`,
    ...style,
  } as CSSProperties;

  return (
    <Tag
      ref={ref as RefObject<never>}
      id={id}
      className={`cin-card cin-card--${variant}${visible ? ' is-in' : ''} ${className}`.trim()}
      style={mergedStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </Tag>
  );
}

/**
 * Tracks scroll progress (0..1) across a section and writes `--scroll-p`
 * for scroll-lit spines, progress bars, and parallax layers.
 */
export function useScrollProgressTrack(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let frame = 0;
    let inView = false;

    const measure = () => {
      frame = 0;
      if (!inView) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const total = rect.height + vh * 0.4;
      const progressed = vh * 0.75 - rect.top;
      const p = Math.max(0, Math.min(1, progressed / Math.max(total, 1)));
      el.style.setProperty('--scroll-p', p.toFixed(4));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      if (inView) schedule();
    });

    observer.observe(el);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    measure();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ref]);
}
