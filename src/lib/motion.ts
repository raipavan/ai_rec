import type { CSSProperties } from 'react';

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const enterDelay = (step: number, base = 0): CSSProperties =>
  ({ '--enter-delay': `${base + step * 90}ms` }) as CSSProperties;
