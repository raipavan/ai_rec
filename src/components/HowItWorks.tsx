import { steps } from '../data/content';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function HowItWorks() {
  return (
    <section className="section section--tint" id="how-it-works">
      <div className="container">
        <SectionHead
          title="From requisition to signed offer in six moves"
          body="The same disciplined flow every time — with a human decision at every step that matters."
        />

        <div className="steps">
          {steps.map((step, index) => (
            <Reveal key={step.title} className="step" delay={Math.min(index, 3)}>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
