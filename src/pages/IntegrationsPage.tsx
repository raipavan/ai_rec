import { useState } from 'react';
import { CtaBand } from '../components/CtaBand';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { SectionHead } from '../components/SectionHead';

const connectors = [
  { name: 'Workday', category: 'ATS', mark: 'W', description: 'Align open requisitions, candidate records and hiring outcomes.' },
  { name: 'SAP SuccessFactors', category: 'ATS', mark: 'SAP', description: 'Keep enterprise recruiting workflows connected to your HR system.' },
  { name: 'Oracle HCM', category: 'ATS', mark: 'O', description: 'Plan candidate and requisition data exchange with your HCM team.' },
  { name: 'Greenhouse', category: 'ATS', mark: 'g', description: 'Bring sourcing and assessment evidence into your hiring pipeline.' },
  { name: 'Lever', category: 'ATS', mark: 'L', description: 'Connect candidate activity with your existing recruiting process.' },
  { name: 'Your HRMS', category: 'HRMS', mark: 'HR', description: 'Map approved hires and onboarding fields to your HR system of record.' },
  { name: 'Microsoft Teams', category: 'Video', mark: 'T', description: 'Coordinate panel interviews around the meetings your team already uses.' },
  { name: 'Zoom', category: 'Video', mark: 'Z', description: 'Include interview meeting links in your scheduling workflow.' },
  { name: 'Google Meet', category: 'Video', mark: 'M', description: 'Keep interview invitations and meeting access in one place.' },
  { name: 'WhatsApp', category: 'Communication', mark: 'WA', description: 'Plan opt-in reminders and candidate updates for mobile-first hiring.' },
  { name: 'Outlook', category: 'Communication', mark: 'O', description: 'Coordinate recruiter availability, calendar invitations and email.' },
  { name: 'Gmail', category: 'Communication', mark: 'G', description: 'Keep candidate communication connected to your recruiting inbox.' },
  { name: 'Slack', category: 'Communication', mark: 'S', description: 'Discuss hiring updates without losing the underlying candidate context.' },
];
const categories = ['All integrations', 'ATS', 'HRMS', 'Video', 'Communication'];

export function IntegrationsPage() {
  const [category, setCategory] = useState(categories[0]);
  const [query, setQuery] = useState('');
  const shown = connectors.filter((item) => (category === categories[0] || item.category === category) && `${item.name} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <>
      <PageHero crumbs={[{ label: 'Integrations' }]} title="A better hiring flow. *Not another silo.*" lede="Keep the tools your team knows. Connect sourcing, conversations and decisions to the systems you already work in." actions={<a className="btn btn-primary" href="#directory">Find your tools <Icon name="arrow-right" /></a>} aside={<div className="connection-map" aria-label="Your hiring tools connected through TalentPool365"><span>ATS & HRMS</span><span>Calendar & video</span><strong>TalentPool<span>365</span></strong><span>Candidate communication</span><span>Your hiring team</span></div>} />
      <section className="section section--light" id="directory">
        <div className="container">
          <SectionHead title="Your stack. *Working together.*" body="Explore integration options with our team. Availability, data access and setup depend on your plan and the provider; this directory is not a live connection status." />
          <div className="catalog-toolbar">
            <div className="filter" role="group" aria-label="Integration categories">{categories.map((item) => <button className="filter-opt" type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item === 'ATS' ? 'ATS integrations' : item === 'HRMS' ? 'HRMS integrations' : item}</button>)}</div>
            <div className="field search-field"><label htmlFor="integration-search">Search integrations</label><input id="integration-search" type="search" placeholder="Try Workday or Slack" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          </div>
          <p className="result-count" role="status">{shown.length} integration {shown.length === 1 ? 'option' : 'options'}</p>
          <div className="integration-grid">{shown.map((item) => <article className="card integration-card" key={item.name}><div className="integration-card-top"><span className="integration-mark" aria-hidden="true">{item.mark}</span><span className="resource-meta">{item.category}</span></div><h2>{item.name}</h2><p>{item.description}</p><a className="more-link" href="/company/contact#contact">Discuss setup <span className="sr-only">for {item.name}</span><Icon name="arrow-right" /></a></article>)}</div>
          {!shown.length && <div className="empty-state"><h3>No matching integrations</h3><p>Try another name, or ask us about your system.</p><button className="btn btn-outline" type="button" onClick={() => { setQuery(''); setCategory(categories[0]); }}>Clear filters</button></div>}
        </div>
      </section>
      <section className="section" id="api-documentation"><div className="container split"><div className="split-copy"><span className="eyebrow">For your technical team</span><h2>Make the connection <em className="accent">your own.</em></h2><p>Start with the data you need to exchange, not an API key. Our team can walk through the current API documentation and the integration approach for your environment.</p><a className="btn btn-primary" href="/company/contact#contact">Request API documentation</a></div><div className="card integration-checklist"><h3>Bring these to the conversation</h3><ul className="ticks"><li>Your system of record and its version</li><li>Fields to sync and who owns each record</li><li>Authentication, access and data residency requirements</li><li>Update frequency and error recovery expectations</li><li>A sandbox and a named technical owner</li></ul></div></div></section>
      <CtaBand />
    </>
  );
}
