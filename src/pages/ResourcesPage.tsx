import { useEffect, useState } from 'react';
import { scrollToHash, useHash } from '../lib/router';
import { DemoVideo } from '../components/DemoVideo';
import { Faq } from '../components/Faq';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { SectionHead } from '../components/SectionHead';
import { SubNav } from '../components/SubNav';
import { blogArticles, resources } from '../data/resources';

const glossary = [
  ['ATS', 'Applicant tracking system: the system used to manage applications and hiring stages.'],
  ['Structured interview', 'An interview using consistent, job-related questions and a shared evaluation rubric.'],
  ['Talent pool', 'A group of candidates who can be considered for relevant roles, subject to appropriate permissions.'],
  ['Time-to-hire', 'The elapsed time between a defined candidate entry point and offer acceptance. Define the starting point before comparing results.'],
  ['Explainability', 'The ability to describe the evidence and criteria behind a system recommendation.'],
  ['Human oversight', 'A meaningful opportunity for a qualified person to review, question and change an automated recommendation.'],
];

export function ResourcesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All resources');
  const hash = useHash();
  useEffect(() => {
    if (!resources.some((item) => `#${item.id}` === hash)) return;
    setQuery('');
    setCategory('All resources');
    const frame = requestAnimationFrame(() => scrollToHash(hash));
    return () => cancelAnimationFrame(frame);
  }, [hash]);
  const categories = ['All resources', 'Guide', 'White paper brief', 'Report framework', 'E-book checklist', 'Workshop outline'];
  const shown = resources.filter((item) => (category === categories[0] || item.type === category) && `${item.title} ${item.intro} ${item.type}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <><PageHero crumbs={[{ label: 'Resources' }]} title="A little less guesswork. *A better way to hire.*" lede="Practical guides, thoughtful questions and useful checklists for the people doing the hiring. Read everything here, without a form." actions={<><a className="btn btn-primary" href="#guides">Explore the library <Icon name="arrow-right" /></a><a className="btn btn-outline" href="/blog">Read the blog</a></>} />
    <SubNav label="Resource sections" links={[{ label: 'Learning library', href: '#guides' }, { label: 'Product videos', href: '#product-videos' }, { label: 'FAQs', href: '#faq' }, { label: 'Glossary', href: '#glossary' }]} />
    <section className="section section--light" id="guides"><div className="container"><SectionHead title="Useful on your *next hiring day.*" body="Short, original reading material. The briefs and frameworks are planning tools, not independent research reports or legal advice." /><div className="catalog-toolbar"><div className="filter" role="group" aria-label="Resource types">{categories.map((item) => <button className="filter-opt" type="button" aria-pressed={category === item} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="field search-field"><label htmlFor="resource-search">Search resources</label><input id="resource-search" type="search" value={query} placeholder="Try interviews or employer branding" onChange={(event) => setQuery(event.target.value)} /></div></div><p className="result-count" role="status">{shown.length} resources found</p><div className="resource-grid">{shown.map((item) => <article className="card resource-card" id={item.id} key={item.id}><span className="resource-meta">{item.type}</span><h2>{item.title}</h2><p>{item.intro}</p><details className="resource-details"><summary>Read the resource<span className="sr-only">: {item.title}</span></summary><div>{item.paragraphs.map((text) => <p key={text}>{text}</p>)}</div></details></article>)}</div>{!shown.length && <div className="empty-state"><h3>No resources match that search</h3><p>Try a broader term or clear the filters.</p><button className="btn btn-outline" type="button" onClick={() => { setQuery(''); setCategory(categories[0]); }}>Clear filters</button></div>}</div></section>
    <section className="section" id="product-videos"><div className="container split"><div className="split-copy"><span className="eyebrow">Product videos</span><h2>See the tools. <em className="accent">Follow the work.</em></h2><p>A short introduction to the TalentPool365 hiring workflow. For a detailed walkthrough of your own use case, book a conversation with our team.</p><a className="more-link" href="/how-it-works">Explore all nine hiring steps <Icon name="arrow-right" /></a></div><DemoVideo /></div></section>
    <Faq contactHref="/company/contact" />
    <section className="section section--light" id="glossary"><div className="container"><SectionHead title="Hiring terms, *in plain language.*" /><dl className="glossary-grid">{glossary.map(([term, meaning]) => <div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl></div></section></>;
}

export function BlogPage() {
  const [category, setCategory] = useState('All articles');
  const categories = ['All articles', ...blogArticles.map((item) => item.category)];
  const shown = blogArticles.filter((item) => category === categories[0] || item.category === category);
  return <><PageHero crumbs={[{ label: 'Resources', href: '/resources' }, { label: 'Blog' }]} title="Notes from *the hiring side.*" lede="Ideas for more considered decisions, clearer communication and a recruiting process that respects everyone's time." actions={<a className="btn btn-outline" href="/resources">Browse the resource library</a>} />
    <section className="section section--light"><div className="container"><div className="filter" role="group" aria-label="Blog topics">{categories.map((item) => <button className="filter-opt" type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><p className="result-count" role="status">{shown.length} {shown.length === 1 ? 'article' : 'articles'}</p><div className="article-list">{shown.map((item) => <article className="article-entry" id={item.id} key={item.id}><div className="article-art" aria-hidden="true"><Icon name={item.category === 'Responsible AI' ? 'shield' : item.category === 'Candidate experience' ? 'chat' : 'users'} /></div><div><span className="resource-meta">{item.category} · TalentPool365 editorial</span><h2>{item.title}</h2><p>{item.intro}</p><details className="resource-details"><summary>Read article<span className="sr-only">: {item.title}</span></summary><div>{item.paragraphs.map((text) => <p key={text}>{text}</p>)}</div></details></div></article>)}</div></div></section></>;
}
