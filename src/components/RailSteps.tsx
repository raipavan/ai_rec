import type { CSSProperties } from 'react';
import { useScrollProgress } from '../lib/useScrollProgress';
import { SectionHead } from './SectionHead';

interface RailStepsProps {
  steps: { title: string; body: string }[];
  className?: string;
}

/**
 * Numbered steps on a rail that fills as the page scrolls, lighting each step
 * as it passes the middle of the screen. Same behaviour as "How it works" on
 * the home page.
 */
export function RailSteps({ steps, className = '' }: RailStepsProps) {
  const { ref, progress, active } = useScrollProgress<HTMLOListElement>('.step');

  return (
    <ol
      className={`steps steps--rail ${className}`.trim()}
      ref={ref}
      style={{ '--rail': progress } as CSSProperties}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={`step${index <= active ? ' is-reached' : ''}${index === active ? ' is-current' : ''}`}
        >
          <div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

interface RailLayoutProps extends RailStepsProps {
  title: string;
  body: string;
}

/** Sticky heading with a large "02 of 05" counter on the left, the rail on the right. */
export function RailLayout({ title, body, steps }: RailLayoutProps) {
  const { ref, progress, active } = useScrollProgress<HTMLOListElement>('.step');

  return (
    <div className="container how-layout">
      <div className="how-intro">
        <SectionHead title={title} body={body} />
        <p className="how-count" aria-hidden="true">
          <b key={active}>{String(active + 1).padStart(2, '0')}</b>
          <span>of {String(steps.length).padStart(2, '0')}</span>
        </p>
      </div>
      <ol className="steps steps--rail" ref={ref} style={{ '--rail': progress } as CSSProperties}>
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`step${index <= active ? ' is-reached' : ''}${index === active ? ' is-current' : ''}`}
          >
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
