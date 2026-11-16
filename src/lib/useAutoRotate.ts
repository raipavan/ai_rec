import { useCallback, useEffect, useRef, useState, type FocusEvent } from 'react';
import { prefersReducedMotion } from './motion';

/**
 * Cycles an index on a timer, the way the product showcases on the reference
 * sites do. It only runs while the element is on screen, stops while the
 * pointer or keyboard focus is inside it, never runs under reduced motion,
 * and hands control to the visitor as soon as they pick an item themselves.
 */
export function useAutoRotate<T extends HTMLElement>(count: number, interval: number) {
  const ref = useRef<T>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => setInView(Boolean(entries[0]?.isIntersecting)),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = !paused && !held && inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearTimeout(timer);
  }, [running, index, count, interval]);

  const select = useCallback((next: number) => {
    setIndex(next);
    setPaused(true);
  }, []);

  const holdProps = {
    onMouseEnter: () => setHeld(true),
    onMouseLeave: () => setHeld(false),
    onFocus: () => setHeld(true),
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
    },
  };

  return {
    ref,
    index,
    select,
    paused,
    togglePaused: () => setPaused((value) => !value),
    running,
    canAutoPlay: !reduced,
    holdProps,
  };
}
