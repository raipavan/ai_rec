import type { CSSProperties } from 'react';
import { AnimatedValue } from '../components/AnimatedValue';
import { BotBuddy } from '../components/BotBuddy';
import { CtaBand } from '../components/CtaBand';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { ProductMock } from '../components/ProductMock';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { productPages, productPath, type ProductPage as ProductData } from '../data/products';
import {
  SourcingExperience,
  ScreeningExperience,
  AssessmentsExperience,
  InterviewsExperience,
  WorkspaceExperience,
  EngagementExperience,
  OfferManagementExperience,
  AnalyticsExperience,
  ComplianceExperience,
} from '../components/ProductUniqueExperiences';

export function ProductPage({ product }: { product: ProductData }) {
  const position = productPages.indexOf(product);
  const previous = productPages[position - 1];
  const next = productPages[position + 1];

  // Talent Sourcing has a dedicated SeekOut Recruit replicated experience as full page layout
  if (product.slug === 'talent-sourcing') {
    return (
      <main className="product-page-main">
        <SourcingExperience product={product} />

        {/* Adjacent product pagination */}
        <section className="section product-pager-section" id="platform" style={{ padding: '40px 0', background: '#f8fafc', borderTop: '1px solid var(--color-border)' }}>
          <div className="container">
            <nav className="product-pager" aria-label="Adjacent products">
              {previous ? (
                <a className="product-pager-link product-pager-link--prev" href={productPath(previous)}>
                  <span className="pager-direction">← Previous product</span>
                  <span className="pager-title">{previous.title}</span>
                </a>
              ) : <span />}
              {next ? (
                <a className="product-pager-link product-pager-link--next" href={productPath(next)}>
                  <span className="pager-direction">Next product →</span>
                  <span className="pager-title">{next.title}</span>
                </a>
              ) : <span />}
            </nav>
          </div>
        </section>
      </main>
    );
  }

  // Helper to render the unique bespoke interactive layout for each product
  const renderUniqueProductExperience = () => {
    switch (product.slug) {
      case 'talent-sourcing':
        return <SourcingExperience product={product} />;
      case 'candidate-screening':
        return <ScreeningExperience product={product} />;
      case 'ai-assessments':
        return <AssessmentsExperience product={product} />;
      case 'ai-interviews':
        return <InterviewsExperience product={product} />;
      case 'recruiter-workspace':
        return <WorkspaceExperience product={product} />;
      case 'candidate-engagement':
        return <EngagementExperience product={product} />;
      case 'hiring-offer-management':
        return <OfferManagementExperience product={product} />;
      case 'analytics-reporting':
        return <AnalyticsExperience product={product} />;
      case 'compliance-security':
        return <ComplianceExperience product={product} />;
      default:
        return null;
    }
  };

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Products', href: '/products' }, { label: product.title }]}
        title={product.headline}
        lede={product.lede}
        actions={
          <>
            <a className="btn btn-primary" href="/get-started#book-meeting">
              Book a live demo
            </a>
            <a className="btn btn-outline" href="/pricing">
              See pricing
            </a>
          </>
        }
        aside={
          <>
            <ProductMock index={product.mock} title={product.title} />
            <BotBuddy role={product.bot} gesture="wave" size={168} className="page-hero-bot" />
          </>
        }
      />

      {/* Unique Bespoke Interactive Experience for this specific product */}
      {renderUniqueProductExperience()}

      {/* Metrics outcome band */}
      <section className="section metrics on-dark" id="outcomes">
        <span className="grain" aria-hidden="true" />
        <div className="container">
          <SectionHead title="What it *changes*" style={{ marginBottom: 0 }} />
          <div className="metrics-grid metrics-grid--3">
            {product.outcomes.map((outcome, index) => (
              <Reveal className="metric" key={outcome.label} delay={index}>
                <strong>
                  <AnimatedValue value={outcome.value} />
                </strong>
                <span>{outcome.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sits in hiring line track & pagination */}
      <section className="section" id="platform">
        <div className="container">
          <SectionHead
            title="Where it sits in the *hiring line*"
            body="Every product shares one unified candidate record, so nothing is re-entered between steps."
          />

          <Reveal as="ol" className="track">
            {productPages.map((item, index) => (
              <li
                key={item.slug}
                className={item.kind === 'layer' ? 'track-layer' : undefined}
                style={{ '--i': index } as CSSProperties}
              >
                <a href={productPath(item)} aria-current={item === product ? 'page' : undefined}>
                  <Icon name={item.icon} />
                  {item.title}
                </a>
              </li>
            ))}
          </Reveal>

          <div className="pager">
            {previous ? (
              <a className="pager-link" href={productPath(previous)} rel="prev">
                <span>Previous Product</span>
                {previous.title}
              </a>
            ) : (
              <a className="pager-link" href="/products" rel="prev">
                <span>Back to</span>
                Platform overview
              </a>
            )}
            {next ? (
              <a className="pager-link pager-link--next" href={productPath(next)} rel="next">
                <span>Next Product</span>
                {next.title}
              </a>
            ) : (
              <a className="pager-link pager-link--next" href="/solutions" rel="next">
                <span>Next</span>
                Solutions
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Product-Specific Closing CTA */}
      <CtaBand />
    </>
  );
}