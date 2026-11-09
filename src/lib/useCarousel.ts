import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './motion';

export function useCarousel(cardCount: number) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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

    const max = el.scrollWidth - el.clientWidth;
    setIndex(nearest);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  const go = useCallback(
    (direction: number) => {
      const el = scrollerRef.current;
      if (!el) return;

      const cards = Array.from(el.querySelectorAll<HTMLElement>('.quote-card'));
      if (!cards.length) return;

      const target = cards[Math.max(0, Math.min(cards.length - 1, index + direction))];
      const max = el.scrollWidth - el.clientWidth;
      const left = target.offsetLeft + target.offsetWidth / 2 - el.clientWidth / 2;

      el.scrollTo({
        left: Math.max(0, Math.min(left, max)),
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    },
    [index],
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

  return { scrollerRef, index, atStart, atEnd, go };
}
