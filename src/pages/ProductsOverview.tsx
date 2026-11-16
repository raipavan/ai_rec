import type { CSSProperties } from 'react';
import { CtaBand } from '../components/CtaBand';
import { Icon } from '../components/Icon';
import { LogoMarquee } from '../components/LogoMarquee';
import { Metrics } from '../components/Metrics';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { productPages, productPath } from '../data/products';
import { useScrollProgress } from '../lib/useScrollProgress';

const stages = productPages.filter((product) => product.kind === 'stage');
const layers = productPages.filter((product) => product.kind === 'layer');

export function ProductsOverview() {
  const line = useScrollProgress<HTMLOListElement>('.line-row');

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Products' }]}
        title="One platform, from requisition to *signed offer*"
        lede="Most teams stitch together five tools to move a candidate from applied to hired. TalentPool365 runs the whole line, so the evidence behind every decision travels with the candidate."
        actions={
          <>
            <a className="btn btn-primary" href="/company/contact">
              Book a live demo
            </a>
            <a className="btn btn-outline" href="/pricing">
              See pricing
            </a>
          </>
        }
        aside={
          <>
            <img
              className="page-hero-shot"
              src="/assets/dashboard-hero.jpg"
              width="1536"
              height="1024"
              decoding="async"
              alt="TalentPool365 hiring dashboard showing a candidate pipeline, funnel chart and KPI cards"
            />
            <div className="hero-chip page-hero-chip">
              <span className="dot" aria-hidden="true">
                <Icon name="layers" />
              </span>
              <span>
                <strong>9 products</strong>one candidate record
              </span>
            </div>
          </>
        }
      />

      <LogoMarquee />

      <section className="section section--light" id="stages">
        <div className="container">
          <SectionHead
            title="Seven products, *one requisition*"
            body="Each product does one job and hands the candidate to the next. Start with the step that hurts most and add the rest when you are ready."
          />

          <ol className="line" ref={line.ref} style={{ '--rail': line.progress } as CSSProperties}>
            {stages.map((product, index) => (
              <li
                className={`line-row${index <= line.active ? ' is-reached' : ''}${index === line.active ? ' is-current' : ''}`}
                key={product.slug}
              >
                <span className="icon-tile">
                  <Icon name={product.icon} />
                </span>
                <div className="line-main">
                  <h3>
                    <a href={productPath(product)}>{product.title}</a>
                  </h3>
                  <p>{product.summary}</p>
                </div>
                <ul className="chip-list" aria-label={`${product.title} capabilities`}>
                  {product.capabilities.map((capability, i) => (
                    <li key={capability.id} style={{ '--i': i } as CSSProperties}>
                      <a className="chip" href={`${productPath(product)}#${capability.id}`}>
                        {capability.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="layers">
        <div className="container">
          <SectionHead
            title="Two layers under *every stage*"
            body="Reporting and compliance are not steps in the process. They run underneath all of it, from the first search to the signed offer."
          />

          <div className="grid layer-grid">
            {layers.map((product, index) => (
              <Reveal as="article" className="card layer-card" key={product.slug} delay={index}>
                <span className="icon-tile">
                  <Icon name={product.icon} />
                </span>
                <h3>{product.title}</h3>
                <p>{product.lede}</p>
                <ul className="ticks">
                  {product.capabilities.map((capability) => (
                    <li key={capability.id}>{capability.title}</li>
                  ))}
                </ul>
                <a className="more-link" href={productPath(product)}>
                  Explore {product.title}
                  <Icon name="arrow-right" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Metrics />
      <CtaBand />
    </>
  );
}
