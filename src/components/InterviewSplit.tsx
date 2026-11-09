import { interviewSplit } from '../data/content';
import { Reveal } from './Reveal';

export function InterviewSplit() {
  return (
    <section className="section section--dark on-dark">
      <span className="grain" aria-hidden="true" />
      <div className="container">
        <div className="split">
          <Reveal className="split-media" variant="left">
            <img
              src="/assets/workspace-analytics.jpg"
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
              alt="TalentPool365 AI interview review screen with transcript, skills radar and candidate score"
            />
          </Reveal>
          <Reveal className="split-copy" variant="right" delay={1}>
            <p className="eyebrow">{interviewSplit.eyebrow}</p>
            <h2>{interviewSplit.title}</h2>
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
