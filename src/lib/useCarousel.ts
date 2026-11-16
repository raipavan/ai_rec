import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './motion';
import { useAutoDrift } from './useAutoDrift';

/**
 * Story carousel that drifts left to right on its own in a seamless loop.
 * The track renders the cards three times over; `index` is the story nearest
 * the middle, counted within one set.
 */
export function useCarousel(cardCount: number) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [nearestCard, setNearestCard] = useState(0);

  const readState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>('.quote-card'));
    if (!cards.length) return;

    const middle = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - middle);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = i;
      }
    });

    setNearestCard(nearest);
  }, []);

  const { hold } = useAutoDrift(scrollerRef, '.quote-card', { speed: 0.04, onTick: readState });

  const go = useCallback(
    (direction: number) => {
      const el = scrollerRef.current;
      if (!el) return;

      const cards = Array.from(el.querySelectorAll<HTMLElement>('.quote-card'));
      if (!cards.length) return;

      hold(1400);
      const target = cards[Math.max(0, Math.min(cards.length - 1, nearestCard + direction))];
      const max = el.scrollWidth - el.clientWidth;
      const left = target.offsetLeft + target.offsetWidth / 2 - el.clientWidth / 2;

      el.scrollTo({
        left: Math.max(0, Math.min(left, max)),
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    },
    [nearestCard, hold],
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let settle = 0;
    const onScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(readState, 90);
    };
    const onResize = () => readState();

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    readState();

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(settle);
    };
  }, [cardCount, readState]);

  const index = cardCount > 0 ? nearestCard % cardCount : 0;
  return { scrollerRef, index, go };
}
