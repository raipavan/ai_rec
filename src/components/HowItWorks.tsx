import type { CSSProperties } from 'react';
import { steps } from '../data/content';
import { useScrollProgress } from '../lib/useScrollProgress';
import { SectionHead } from './SectionHead';

export function HowItWorks() {
  const { ref, progress, active } = useScrollProgress<HTMLOListElement>('.step');

  return (
    <section className="section section--light" id="how-it-works">
      <div className="container how-layout">
        <div className="how-intro">
          <SectionHead
            title="From requisition to signed offer in *six moves*"
            body="The same disciplined flow every time — with a human decision at every step that matters."
          />
          <p className="how-count" aria-hidden="true">
            <b key={active}>{String(active + 1).padStart(2, '0')}</b>
            <span>of {String(steps.length).padStart(2, '0')}</span>
          </p>
          <a className="btn btn-outline" href="#contact">
            Walk through it live
          </a>
        </div>

        <ol
          className="steps steps--rail"
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
      </div>
    </section>
  );
}
