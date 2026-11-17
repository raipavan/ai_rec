import { useEffect, useRef, useState, type ReactNode } from 'react';
import { accent } from '../lib/accent';
import { enterDelay, prefersReducedMotion, useSceneDepth } from '../lib/motion';
import { Network } from './Network';

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  /** Trail from the site root to this page; the last entry is the page itself. */
  crumbs: Crumb[];
  /** Wrap the accent phrase in asterisks, as in SectionHead. */
  title: string;
  /** Words that take turns in place of the accent phrase, like the home page headline. */
  rotate?: string[];
  lede: string;
  actions?: ReactNode;
  /** Visual on the right at desktop widths. It floats and leans toward the pointer. */
  aside?: ReactNode;
  compact?: boolean;
}

/** Swaps the accent word every few seconds. Static under reduced motion. */
function useRotatingWord(count: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (count < 2 || prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [count]);

  return index;
}

/**
 * Opening band of every inner page, built like the home hero: photo backdrop,
 * connected-points canvas, staged entrance and a visual that floats in 3D.
 */
export function PageHero({ crumbs, title, rotate, lede, actions, aside, compact }: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useSceneDepth(sectionRef);
  const word = useRotatingWord(rotate?.length ?? 0);
  const [before, , after] = title.split('*');

  // 3D: the visual leans toward the pointer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !aside || prefersReducedMotion()) return;
    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty('--px', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
      section.style.setProperty('--py', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
    };
    section.addEventListener('pointermove', onMove, { passive: true });
    return () => section.removeEventListener('pointermove', onMove);
  }, [aside]);

  return (
    <section className={`page-hero on-dark${compact ? ' page-hero--compact' : ''}`} ref={sectionRef}>
      <span className="page-hero-bg" aria-hidden="true" />
      <span className="grain" aria-hidden="true" />
      <Network />
      <div className={`container page-hero-grid${aside ? ' page-hero-grid--aside' : ''}`}>
        <div className="page-hero-copy">
          <nav className="crumbs enter" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href="/">Home</a>
              </li>
              {crumbs.map((crumb, index) => (
                <li key={crumb.label}>
                  {crumb.href && index < crumbs.length - 1 ? (
                    <a href={crumb.href}>{crumb.label}</a>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {rotate?.length ? (
            <h1 className="enter" style={enterDelay(1)}>
              <span className="sr-only">{title.replace(/\*/g, '')}</span>
              <span aria-hidden="true">
                {before}
                <span className="role-swap">
                  <span className="accent role-word" key={word}>
                    {rotate[word]}
                  </span>
                </span>
                {after}
              </span>
            </h1>
          ) : (
            <h1 className="enter" style={enterDelay(1)}>
              {accent(title)}
            </h1>
          )}
          <p className="lede enter" style={enterDelay(2)}>
            {lede}
          </p>
          {actions ? (
            <div className="hero-cta enter" style={enterDelay(3)}>
              {actions}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className="page-hero-aside enter" style={enterDelay(2, 120)}>
            <div className="page-hero-float">{aside}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
