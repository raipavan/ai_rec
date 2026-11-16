import { CtaBand } from '../components/CtaBand';
import { Faq } from '../components/Faq';
import { LeadForm, type LeadField } from '../components/LeadForm';
import { PageHero } from '../components/PageHero';
import { Pricing } from '../components/Pricing';
import { Reveal } from '../components/Reveal';
import { SubNav } from '../components/SubNav';
import { planBasics, pricingFaqs } from '../data/company';
import { useActiveSection } from '../lib/useActiveSection';

const quoteFields: LeadField[] = [
  { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'company', label: 'Company', required: true, autoComplete: 'organization' },
  {
    name: 'volume',
    label: 'Hires per year',
    type: 'select',
    options: ['Under 100', '100 to 1,000', '1,000 to 10,000', 'More than 10,000'],
  },
  {
    name: 'regions',
    label: 'Regions you hire in',
    placeholder: 'For example: EU, India, United States',
    wide: true,
  },
  {
    name: 'needs',
    label: 'What the quote should cover',
    type: 'textarea',
    placeholder: 'Products, integrations, SSO, data residency…',
    wide: true,
  },
];

const sectionLinks = [
  { label: 'Plans', href: '#pricing' },
  { label: 'Compare plans', href: '#compare-plans' },
  { label: 'Custom quote', href: '#custom-quote' },
  { label: 'Billing questions', href: '#faq' },
];
const sectionIds = sectionLinks.map((link) => link.href.slice(1));

export function PricingPage() {
  const active = useActiveSection(sectionIds);

  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: 'Pricing' }]}
        title="Pay *for hires*, not seats of software"
        lede="Three plans, priced by active job roles. Your whole hiring panel reviews candidates on one subscription."
        actions={
          <ul className="ticks ticks--inline">
            {planBasics.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        }
      />

      <SubNav label="Pricing sections" links={sectionLinks} current={`#${active}`} currentKind="location" />

      <Pricing showHead={false} trialHref="/get-started#start-free-trial" quoteHref="#custom-quote" />

      <section className="section section--light" id="custom-quote">
        <div className="container">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal className="split-copy" variant="left">
              <h2>
                Request a <em className="accent">custom quote</em>
              </h2>
              <p>
                Enterprise pricing depends on hiring volume, the regions you hire in and the systems
                you need connected. Tell us those three things and you get a written quote, not a
                sales sequence.
              </p>
              <ul className="ticks" style={{ marginTop: 20 }}>
                <li>Written quote within two business days</li>
                <li>Volume pricing across business units</li>
                <li>Security review and DPIA support included</li>
                <li>Pilot on your own data before you sign</li>
              </ul>
            </Reveal>

            <Reveal className="split-media" variant="right" delay={1}>
              <LeadForm
                fields={quoteFields}
                submitLabel="Request quote"
                hint="We use these details only to prepare your quote."
                subject="Custom quote request"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Faq
        items={pricingFaqs}
        eyebrow="Pricing questions"
        title="How billing *works*"
        body="The short answers. For anything about procurement or security review, write to us and a specialist replies within one business day."
        contactHref="/company/contact"
      />

      <CtaBand />
    </>
  );
}
