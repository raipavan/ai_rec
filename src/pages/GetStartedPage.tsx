import { navigate, useHash } from '../lib/router';
import { DemoVideo } from '../components/DemoVideo';
import { LeadForm } from '../components/LeadForm';
import { PageHero } from '../components/PageHero';
import { Icon } from '../components/Icon';

const intents = [
  {
    id: 'request-demo',
    label: 'Request demo',
    title: 'See it with your own role.',
    body: 'Bring a job description and the questions your team wants answered. We will help you prepare a focused product walkthrough.',
  },
  {
    id: 'book-meeting',
    label: 'Book meeting',
    title: 'Make time for a useful conversation.',
    body: 'Tell us your timezone and a few preferred times. This is a meeting request, not an instant calendar booking.',
  },
  {
    id: 'start-free-trial',
    label: 'Start free trial',
    title: 'Explore a pilot for your team.',
    body: 'Tell us what you want to evaluate. Our team will confirm trial availability, scope and access; this form does not create an account.',
  },
  {
    id: 'contact-sales',
    label: 'Contact sales',
    title: 'Talk through the practical details.',
    body: 'Hiring volume, integrations, procurement or rollout. Give us the context and we will route your email to the sales team.',
  },
];

export function GetStartedPage() {
  const hash = useHash();
  const intent = intents.find((item) => `#${item.id}` === hash) ?? intents[0];

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Get started' }]}
        title="Your next great hire *starts here.*"
        lede="See the product, plan a pilot or talk through your hiring challenge. Choose the conversation that works for you."
        actions={
          <a className="btn btn-outline" href="#watch-product-tour">
            <Icon name="play" /> Watch the product tour
          </a>
        }
      />
      <section className="section section--light" id="request">
        <div className="container">
          <div className="intent-options" role="group" aria-label="Choose your next step">
            {intents.map((item) => (
              <button
                className="intent-option"
                id={item.id}
                type="button"
                aria-pressed={intent.id === item.id}
                onClick={() => navigate(`/get-started#${item.id}`)}
                key={item.id}
              >
                {item.label}<Icon name="arrow-right" />
              </button>
            ))}
          </div>
          <div className="split request-layout">
            <div className="split-copy" aria-live="polite">
              <span className="resource-meta">Let's make it relevant</span>
              <h2>{intent.title}</h2>
              <p>{intent.body}</p>
              <ul className="ticks">
                <li>Your role and hiring goals set the agenda</li>
                <li>Review your email before anything is sent</li>
                <li>No payment details needed to enquire</li>
              </ul>
              <p className="caption">
                Prefer to write directly? <a href="mailto:sales@talentpool365.com">sales@talentpool365.com</a>
              </p>
            </div>
            <LeadForm
              key={intent.id}
              subject={intent.label}
              fields={[
                { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
                { name: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'email' },
                { name: 'company', label: 'Company', required: true, autoComplete: 'organization' },
                { name: 'volume', label: 'Annual hiring volume', type: 'select', options: ['Under 100 hires', '100–1,000 hires', 'More than 1,000 hires'] },
                {
                  name: 'message',
                  label: intent.id === 'book-meeting' ? 'Preferred times, timezone and what you want to discuss' : 'What would you like to explore?',
                  type: 'textarea',
                  wide: true,
                },
              ]}
              submitLabel="Prepare my enquiry"
              hint="Creates an email draft. Review and send it from your email app."
            />
          </div>
        </div>
      </section>
      <section className="section" id="watch-product-tour">
        <div className="container split">
          <div className="split-copy">
            <h2>A first look. <em className="accent">On your time.</em></h2>
            <p>Follow the product from candidate pipeline to hiring insights in this short walkthrough.</p>
            <a className="more-link" href="/products">
              Explore the full platform <Icon name="arrow-right" />
            </a>
          </div>
          <DemoVideo />
        </div>
      </section>
    </>
  );
}
