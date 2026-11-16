import { LeadForm } from './LeadForm';
import { Reveal } from './Reveal';

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container split" style={{ alignItems: 'start' }}>
        <Reveal className="split-copy" variant="left">
          <h2>Talk to a human <em className="accent">who knows hiring.</em></h2>
          <p>Tell us about the roles you are filling, the tools you use and what is slowing your team down. We will help you explore a more connected way to hire.</p>
          <ul className="ticks"><li>A conversation built around your hiring workflow</li><li>A walkthrough of the products you actually need</li><li>Clear next steps for evaluating the platform</li></ul>
          <p><strong>Prefer email?</strong><br /><a href="mailto:sales@talentpool365.com">sales@talentpool365.com</a></p>
        </Reveal>
        <Reveal variant="right" delay={1}>
          <LeadForm subject="Sales enquiry" fields={[
            { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
            { name: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'email' },
            { name: 'company', label: 'Company', required: true, autoComplete: 'organization' },
            { name: 'volume', label: 'Hiring volume', type: 'select', options: ['Under 10 hires / year', '10–100 hires / year', '100–1,000 hires / year', '1,000+ hires / year'] },
            { name: 'message', label: 'What are you hiring for?', type: 'textarea', placeholder: 'Roles, current tools and what is slowing you down', wide: true },
          ]} submitLabel="Prepare sales enquiry" hint="Creates an email draft. Nothing is sent until you send it from your email app." />
        </Reveal>
      </div>
    </section>
  );
}
