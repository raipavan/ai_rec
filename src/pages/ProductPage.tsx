import type { CSSProperties } from 'react';
import { BotBuddy } from '../components/BotBuddy';
import { Icon } from '../components/Icon';
import { ProductMock } from '../components/ProductMock';
import { SkCtaBanner, SkHero, SkLogoMarquee } from '../components/SeekOutUI';
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

  // Talent Sourcing keeps its full dedicated SeekOut Recruit page layout
  if (product.slug === 'talent-sourcing') {
    return (
      <main className="product-page-main">
        <SourcingExperience product={product} />

        <section
          className="section product-pager-section"
          id="platform"
          style={{ padding: '40px 0', background: '#f8fafc', borderTop: '1px solid var(--color-border)' }}
        >
          <div className="container">
            <nav className="product-pager" aria-label="Adjacent products">
              {previous ? (
                <a className="product-pager-link product-pager-link--prev" href={productPath(previous)}>
                  <span className="pager-direction">← Previous product</span>
                  <span className="pager-title">{previous.title}</span>
                </a>
              ) : (
                <span />
              )}
              {next ? (
                <a className="product-pager-link product-pager-link--next" href={productPath(next)}>
                  <span className="pager-direction">Next product →</span>
                  <span className="pager-title">{next.title}</span>
                </a>
              ) : (
                <span />
              )}
            </nav>
          </div>
        </section>
      </main>
    );
  }

  const renderUniqueProductExperience = () => {
    switch (product.slug) {
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
    <main className="sk-page">
      <SkHero
        eyebrow={`TALENTPOOL365 · ${product.title.toUpperCase()}`}
        eyebrowIcon={product.icon}
        title={product.headline.replace(/\*/g, '')}
        subtitle={product.lede}
        primaryCta={{ label: 'Book a live demo →', href: '/get-started#book-meeting' }}
        secondaryCta={{ label: 'See pricing', href: '/pricing' }}
        stats={product.outcomes.slice(0, 3).map((o) => ({ value: o.value, label: o.label }))}
        aside={
          <div style={{ position: 'relative', width: '100%' }}>
            <ProductMock index={product.mock} title={product.title} />
            <BotBuddy role={product.bot} gesture="wave" size={148} className="page-hero-bot" />
          </div>
        }
      />

      <SkLogoMarquee />

      {/* Unique Bespoke Interactive Experience for this specific product */}
      {renderUniqueProductExperience()}

      {/* Sits in hiring line track & pagination */}
      <section className="sk-band sk-band--cream" id="platform">
        <div className="container">
          <div className="sk-section-head">
            <span className="sk-pill-tag">UNIFIED WORKFLOW</span>
            <h2 className="sk-serif-h2">Where it sits in the hiring line</h2>
            <p className="sk-section-sub">
              Every product shares one unified candidate record, so nothing is re-entered between steps.
            </p>
          </div>

          <ol className="track">
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
          </ol>

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

      <SkCtaBanner />
    </main>
  );
}
