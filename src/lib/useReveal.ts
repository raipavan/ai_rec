import { useEffect, useRef, useState, type RefObject } from 'react';
import { prefersReducedMotion } from './motion';

const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callbacks.get(entry.target)?.();
          callbacks.delete(entry.target);
          observer?.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
  }
  return observer;
}

export function useReveal<T extends HTMLElement>(externalRef?: RefObject<T | null>) {
  const localRef = useRef<T>(null);
  const ref = externalRef ?? localRef;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const io = getObserver();
    callbacks.set(el, () => setVisible(true));
    io.observe(el);

    return () => {
      io.unobserve(el);
      callbacks.delete(el);
    };
  }, [ref]);

  return { ref, visible };
}
