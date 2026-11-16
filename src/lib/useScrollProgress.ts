import { useEffect, useRef, useState } from 'react';

/**
 * Reports how far the middle of the viewport has travelled through an element
 * (0 at its top edge, 1 at its bottom edge) and which child is the last one
 * the middle has passed. Drives the scroll-linked "how it works" rail.
 */
export function useScrollProgress<T extends HTMLElement>(itemSelector: string) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const middle = window.innerHeight * 0.55;
      const next = Math.max(0, Math.min(1, (middle - rect.top) / Math.max(rect.height, 1)));
      setProgress(next);

      let current = 0;
      el.querySelectorAll<HTMLElement>(itemSelector).forEach((item, i) => {
        if (item.getBoundingClientRect().top <= middle) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [itemSelector]);

  return { ref, progress, active };
}
