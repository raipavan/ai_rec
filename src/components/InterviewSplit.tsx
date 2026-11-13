import { interviewSplit } from '../data/content';
import { accent } from '../lib/accent';
import { DemoVideo } from './DemoVideo';
import { Reveal } from './Reveal';

export function InterviewSplit() {
  return (
    <section className="section section--dark section--video on-dark">
      <span className="grain" aria-hidden="true" />
      <div className="container">
        <div className="split split--video">
          <Reveal className="split-media" variant="left">
            <DemoVideo />
          </Reveal>
          <Reveal className="split-copy" variant="right" delay={1}>
            <p className="eyebrow">{interviewSplit.eyebrow}</p>
            <h2>{accent(interviewSplit.title)}</h2>
            <p>{interviewSplit.body}</p>
            <ul className="ticks">
              {interviewSplit.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <a className="btn btn-accent" href="#contact">
              {interviewSplit.cta}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
