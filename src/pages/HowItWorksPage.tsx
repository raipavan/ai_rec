import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { SkCtaBanner, SkHero, SkVectorArt } from '../components/SeekOutUI';

const workflow = [
  { title: 'Create job requisition', owner: 'Your hiring team', body: 'Agree on the role, the must-have skills and what good looks like before applications arrive. Set the scorecard and approval owners together.', output: 'An approved role and a shared evaluation rubric', href: '/products/recruiter-workspace' },
  { title: 'AI talent sourcing', owner: 'AI-assisted', body: 'Search your existing talent pool and connected sources. Build a relevant longlist instead of starting from an empty search every time.', output: 'A candidate longlist with its source recorded', href: '/products/talent-sourcing' },
  { title: 'Candidate screening', owner: 'AI-assisted, recruiter checked', body: 'Parse experience and skills against the agreed requirements. Review the evidence behind matches before moving a shortlist forward.', output: 'A reviewed shortlist, not a black-box ranking', href: '/products/candidate-screening' },
  { title: 'AI assessment', owner: 'Consistent evaluation', body: 'Use job-relevant exercises to see what people can do. Offer appropriate accommodations and check any flags before reaching a conclusion.', output: 'Skills evidence against the same assessment criteria', href: '/products/ai-assessments' },
  { title: 'AI interview', owner: 'Structured conversation', body: 'Run a structured video, voice or coding interview. Give candidates clear instructions and use an agreed rubric to keep evaluation focused.', output: 'Interview evidence for the recruiter to review', href: '/products/ai-interviews' },
  { title: 'Recruiter review', owner: 'Human decision', body: 'Bring the application, assessment and interview into one view. Check missing context, discuss exceptions and decide who should meet the team.', output: 'A documented recommendation for the panel', href: '/products/recruiter-workspace' },
  { title: 'Final panel interview', owner: 'Your hiring team', body: 'Meet the person behind the evidence. Collect independent feedback before the panel discussion, then resolve differences against the role requirements.', output: 'A considered hiring decision and recorded feedback', href: '/products/hiring-offer-management' },
  { title: 'Offer release', owner: 'Approved by your team', body: 'Align compensation, obtain approvals and prepare the offer. Keep the candidate informed while signatures and final checks are completed.', output: 'An approved, accepted offer', href: '/products/hiring-offer-management' },
  { title: 'Onboarding', owner: 'A warm handover', body: 'Pass the agreed details to your HR team. Coordinate pre-joining tasks, keep communication open and make the first day feel like a beginning, not another form.', output: 'A prepared new hire and a clear HR handover', href: '/products/hiring-offer-management#pre-onboarding' },
];

export function HowItWorksPage() {
  return (
    <main className="sk-page">
      <SkHero
        eyebrow="NINE-STEP WORKFLOW"
        eyebrowIcon="sliders"
        title="From an open role to a first day"
        subtitle="One connected workflow, nine clear steps. AI handles the repetitive busywork while your recruiting team and hiring managers own every human decision."
        primaryCta={{ label: 'Walk through your process →', href: '/get-started' }}
        secondaryCta={{ label: 'Explore products', href: '/products' }}
        aside={<SkVectorArt kind="how-it-works" />}
      />

      <section className="sk-band sk-band--cream">
        <div className="container">
          <ol className="workflow-list">
            {workflow.map((step, index) => (
              <Reveal
                as="li"
                className="workflow-step"
                variant={index % 2 ? 'right' : 'left'}
                key={step.title}
              >
                <span className="workflow-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="workflow-copy">
                  <span className="sk-pill-tag" style={{ marginBottom: 8 }}>{step.owner}</span>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                  <div className="workflow-output">
                    <Icon name="file-check" />
                    <span>{step.output}</span>
                  </div>
                  <a className="sk-card-link" href={step.href}>
                    Explore the product <span className="sr-only">for {step.title}</span>
                    <Icon name="arrow-right" />
                  </a>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <SkCtaBanner />
    </main>
  );
}
