import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { industries } from '../data/content';
import { prefersReducedMotion } from '../lib/motion';
import { loopPeriod, useAutoDrift } from '../lib/useAutoDrift';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

/**
 * Side-scrolling rail that drifts left to right on its own in a seamless loop
 * (the cards are rendered three times over). Arrows, keyboard, touch / trackpad
 * swipe and mouse drag still work and pause the drift.
 */
function useRail() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [thumb, setThumb] = useState(1);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });

  const read = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const period = loopPeriod(el, '.industry-card');
    setProgress(period > 0 ? (((el.scrollLeft % period) + period) % period) / period : 0);
    setThumb(period > 0 ? Math.min(1, el.clientWidth / period) : 1);
  }, []);

  const { hold } = useAutoDrift(ref, '.industry-card', {
    isBusy: () => drag.current.active,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    read();
    return () => {
      el.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [read]);

  const go = useCallback((direction: number) => {
    const el = ref.current;
    const card = el?.querySelector<HTMLElement>('.industry-card');
    if (!el || !card) return;
    hold(1400);
    const gap = Number.parseFloat(getComputedStyle(card.parentElement as HTMLElement).columnGap) || 0;
    el.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, [hold]);

  // Mouse drag only; touch and pen keep the browser's native swipe.
  const dragProps = {
    onPointerDown: (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== 'mouse' || event.button !== 0 || !ref.current) return;
      drag.current = { active: true, moved: false, startX: event.clientX, startLeft: ref.current.scrollLeft };
    },
    onPointerMove: (event: PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      const state = drag.current;
      if (!state.active || !el) return;
      const delta = event.clientX - state.startX;
      if (!state.moved && Math.abs(delta) > 6) {
        state.moved = true;
        el.classList.add('is-dragging');
        el.setPointerCapture(event.pointerId);
      }
      if (state.moved) el.scrollLeft = state.startLeft - delta;
    },
    onPointerUp: () => {
      drag.current.active = false;
      ref.current?.classList.remove('is-dragging');
    },
    onPointerCancel: () => {
      drag.current.active = false;
      ref.current?.classList.remove('is-dragging');
    },
  };

  return { ref, progress, thumb, go, dragProps };
}

export function Solutions() {
  const rail = useRail();
  const scrollable = rail.thumb < 0.999;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      rail.go(1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      rail.go(-1);
    }
  };

  return (
    <section className="section" id="solutions">
      <div className="container">
        <div className="rail-head">
          <SectionHead
            eyebrow="Solutions by industry"
            title="Built for the way *your sector* hires"
            body="Compliance rules, licensing checks, seasonal spikes — every industry hires differently. These playbooks ship with the platform, not as a services upsell."
          />
          {scrollable ? (
            <div className="rail-nav">
              <button
                className="rail-btn"
                type="button"
                aria-controls="industry-rail"
                aria-label="Previous industries"
                onClick={() => rail.go(-1)}
              >
                <Icon name="chevron-left" />
              </button>
              <button
                className="rail-btn"
                type="button"
                aria-controls="industry-rail"
                aria-label="Next industries"
                onClick={() => rail.go(1)}
              >
                <Icon name="chevron-right" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="rail"
        id="industry-rail"
        ref={rail.ref}
        role="region"
        aria-label="Solutions by industry"
        tabIndex={0}
        onKeyDown={onKeyDown}
        {...rail.dragProps}
      >
        <div className="rail-track">
          {[...industries, ...industries, ...industries].map((industry, index) => (
            <Reveal
              as="article"
              key={index}
              className="card industry-card"
              aria-hidden={index >= industries.length ? true : undefined}
              delay={index < 4 ? index : 0}
            >
              <span className="icon-tile">
                <Icon name={industry.icon} />
              </span>
              <h3>{industry.title}</h3>
              <p>{industry.body}</p>
              <p className="stat">
                <strong>{industry.statValue}</strong>
                {industry.statLabel}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {scrollable ? (
        <div className="container">
          <div className="rail-progress" aria-hidden="true">
            <span
              style={{
                width: `${rail.thumb * 100}%`,
                left: `${rail.progress * (1 - rail.thumb) * 100}%`,
              }}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
