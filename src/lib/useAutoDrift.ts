import { useCallback, useEffect, useRef, type RefObject } from 'react';
import { prefersReducedMotion } from './motion';

interface AutoDriftOptions {
  /** Pixels per millisecond. Cards travel left to right. */
  speed?: number;
  /** Extra reason to stand still, e.g. a mouse drag in progress. */
  isBusy?: () => boolean;
  /** Called a few times a second while running, to refresh derived state. */
  onTick?: () => void;
}

/** Width of one set of cards, when the track holds `copies` identical sets. */
export function loopPeriod(el: HTMLElement, cardSelector: string, copies = 3): number {
  const cards = el.querySelectorAll<HTMLElement>(cardSelector);
  if (cards.length < copies) return 0;
  return cards[cards.length / copies].offsetLeft - cards[0].offsetLeft;
}

/**
 * Drifts a horizontal scroller on its own, in a seamless loop.
 * The track must render its cards three times over. Pauses on hover, and for a
 * moment after touch, wheel, keyboard or a call to `hold`. Stands still under
 * prefers-reduced-motion, where the loop still works by hand.
 */
export function useAutoDrift(
  ref: RefObject<HTMLElement | null>,
  cardSelector: string,
  { speed = 0.045, isBusy, onTick }: AutoDriftOptions = {},
) {
  const holdUntil = useRef(0);
  const busyRef = useRef(isBusy);
  const tickRef = useRef(onTick);
  busyRef.current = isBusy;
  tickRef.current = onTick;

  const hold = useCallback((ms = 2500) => {
    holdUntil.current = performance.now() + ms;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const pace = prefersReducedMotion() ? 0 : speed;
    let frame = 0;
    let last = 0;
    let lastTick = 0;
    let position: number | null = null;
    let hovered = false;

    const onEnter = () => { hovered = true; };
    const onLeave = () => { hovered = false; };
    const onTouch = () => hold();

    const step = (time: number) => {
      const period = loopPeriod(el, cardSelector);
      const elapsed = last ? Math.min(64, time - last) : 0;
      last = time;

      if (period > 0) {
        if (position === null) {
          // start one set in, so there is room to scroll either way
          position = period;
          el.scrollLeft = position;
        } else if (Math.abs(position - el.scrollLeft) > 2) {
          position = el.scrollLeft; // the visitor moved it
        }

        const paused = hovered || busyRef.current?.() || holdUntil.current > performance.now();
        if (!paused) {
          position -= pace * elapsed;
          if (position <= 0 || position > period) {
            position = (((position % period) + period) % period) || period;
          }
          el.scrollLeft = position;
        }
      }

      if (time - lastTick > 250) {
        lastTick = time;
        tickRef.current?.();
      }
      frame = requestAnimationFrame(step);
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchstart', onTouch, { passive: true });
    el.addEventListener('touchmove', onTouch, { passive: true });
    el.addEventListener('wheel', onTouch, { passive: true });
    el.addEventListener('keydown', onTouch);
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('touchstart', onTouch);
      el.removeEventListener('touchmove', onTouch);
      el.removeEventListener('wheel', onTouch);
      el.removeEventListener('keydown', onTouch);
    };
  }, [ref, cardSelector, speed, hold]);

  return { hold };
}
