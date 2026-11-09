import type { KeyboardEvent } from 'react';
import { stories } from '../data/content';
import { useCarousel } from '../lib/useCarousel';
import { useReveal } from '../lib/useReveal';
import { Icon } from './Icon';
import { SectionHead } from './SectionHead';

export function Stories() {
  const { scrollerRef, index, atStart, atEnd, go } = useCarousel(stories.length);
  const reveal = useReveal(scrollerRef);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  };

  return (
    <section className="section section--tint" id="stories">
      <div className="container">
        <SectionHead
          center
          eyebrow="Customer stories"
          title="Teams that stopped chasing candidates"
        />

        <div
          className={`quotes reveal${reveal.visible ? ' is-visible' : ''}`}
          id="quote-scroller"
          ref={scrollerRef}
          role="region"
          aria-label="Customer stories"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div className="quote-track">
            {stories.map((story) => (
              <figure className="quote-card" key={story.name}>
                <blockquote>{story.quote}</blockquote>
                <figcaption>
                  <span className="quote-name">{story.name}</span>
                  <span className="quote-role">{story.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="quote-controls">
          <button
            className="quote-btn"
            type="button"
            aria-controls="quote-scroller"
            aria-label="Previous story"
            disabled={atStart}
            onClick={() => go(-1)}
          >
            <Icon name="chevron-left" />
          </button>
          <span className="quote-count" aria-live="polite">
            {index + 1} / {stories.length}
          </span>
          <button
            className="quote-btn"
            type="button"
            aria-controls="quote-scroller"
            aria-label="Next story"
            disabled={atEnd}
            onClick={() => go(1)}
          >
            <Icon name="chevron-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
