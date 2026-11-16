import { useState } from 'react';
import { CaseStudies } from '../components/CaseStudies';
import { CtaBand } from '../components/CtaBand';
import { DemoVideo } from '../components/DemoVideo';
import { PageHero } from '../components/PageHero';
import { SectionHead } from '../components/SectionHead';
import { Stories } from '../components/Stories';
import { SubNav } from '../components/SubNav';

export function CustomersPage() {
  const [hires, setHires] = useState(100);
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(40);
  const [reduction, setReduction] = useState(30);
  const savedHours = hires * hours * reduction / 100;
  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  return <><PageHero crumbs={[{ label: 'Customers' }]} title="Less chasing. *More connecting.*" lede="See how a connected hiring process can change a team's day, then model the time your own team could get back." actions={<a className="btn btn-primary" href="#roi-calculator">Calculate your potential savings</a>} />
    <SubNav label="Customer sections" links={[{ label: 'Success stories', href: '#case-studies' }, { label: 'Testimonials', href: '#stories' }, { label: 'ROI calculator', href: '#roi-calculator' }, { label: 'Customer videos', href: '#customer-videos' }]} />
    <div className="container"><p className="notice">The stories and testimonials below are illustrative examples, not verified customer endorsements. Ask our team for approved customer references.</p></div>
    <CaseStudies /><Stories />
    <section className="section section--light" id="roi-calculator"><div className="container"><SectionHead title="What could your team *get back?*" body="Set your own assumptions. This estimates the value of recruiter time saved, not guaranteed cash savings or a net return on investment." /><div className="roi-layout"><div className="card roi-inputs">
      {[{ id: 'hires', label: 'Hires per year', value: hires, set: setHires, min: 0, max: 10000, step: 1 }, { id: 'hours', label: 'Recruiter hours per hire', value: hours, set: setHours, min: 0, max: 200, step: 1 }, { id: 'rate', label: 'Hourly recruiting cost (USD)', value: rate, set: setRate, min: 0, max: 1000, step: 1 }].map((field) => <div className="field" key={field.id}><label htmlFor={`roi-${field.id}`}>{field.label}</label><input id={`roi-${field.id}`} type="number" min={field.min} max={field.max} step={field.step} value={field.value} onChange={(event) => field.set(Math.min(field.max, Math.max(field.min, Number(event.target.value))))} /></div>)}
      <div className="field"><label htmlFor="roi-reduction">Assumed time saved <strong>{reduction}%</strong></label><input id="roi-reduction" type="range" min="0" max="80" value={reduction} onChange={(event) => setReduction(Number(event.target.value))} /><p className="caption">Choose a conservative estimate for your workflow.</p></div></div>
      <div className="roi-result on-dark" aria-live="polite" aria-atomic="true"><span className="resource-meta">Your annual estimate</span><strong>{currency.format(savedHours * rate)}</strong><p>potential value of time saved</p><div className="roi-hours"><b>{Math.round(savedHours).toLocaleString('en-US')}</b><span>recruiter hours back</span></div><p className="caption">{hires} hires × {hours} hours × {reduction}% × {currency.format(rate)}/hour. Subscription and implementation costs are not included.</p><a className="btn btn-primary" href="/pricing">Compare with plan costs</a></div></div></div></section>
    <section className="section" id="customer-videos"><div className="container split"><div className="split-copy"><h2>See the workflow <em className="accent">in motion.</em></h2><p>Watch our product walkthrough. Customer interview recordings are not published here yet; our team can help with approved references.</p><a className="more-link" href="/company/contact">Ask for customer references</a></div><DemoVideo /></div></section><CtaBand /></>;
}
