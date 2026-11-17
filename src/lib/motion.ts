import { useEffect, type CSSProperties, type RefObject } from 'react';

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const enterDelay = (step: number, base = 0): CSSProperties =>
  ({ '--enter-delay': `${base + step * 90}ms` }) as CSSProperties;

export function useSceneDepth(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = false;
    const measure = () => {
      frame = 0;
      if (!visible || motion.matches) {
        section.style.removeProperty('--scene-depth');
        return;
      }
      const rect = section.getBoundingClientRect();
      const depth = Math.max(0, Math.min(1, -rect.top / rect.height));
      section.style.setProperty('--scene-depth', depth.toFixed(4));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
    observer.observe(section);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
    };
  }, [ref]);
}
