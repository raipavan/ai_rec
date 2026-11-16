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
import { useScrollProgress } from '../lib/useScrollProgress';

export function ProductPage({ product }: { product: ProductData }) {
  // The capability list fills a rail as the page scrolls, like "How it works" on the home page
  const ledger = useScrollProgress<HTMLDivElement>('.ledger-row');

  const position = productPages.indexOf(product);
  const previous = productPages[position - 1];
  const next = productPages[position + 1];

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Products', href: '/products' }, { label: product.title }]}
        title={product.headline}
        lede={product.lede}
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
            <ProductMock index={product.mock} title={product.title} />
            <BotBuddy role={product.bot} gesture="wave" size={168} className="page-hero-bot" />
          </>
        }
      />

      <section className="section section--light" id="capabilities">
        <div className="container">
          <SectionHead
            title={`What ${product.title} *does*`}
            body={product.summary}
          />

          <div className="ledger">
            <nav className="ledger-index" aria-label={`${product.title} capabilities`}>
              <ul>
                {product.capabilities.map((capability, index) => (
                  <li key={capability.id}>
                    <a
                      href={`#${capability.id}`}
                      aria-current={ledger.active === index ? 'location' : undefined}
                    >
                      {capability.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className="ledger-rows"
              ref={ledger.ref}
              style={{ '--rail': ledger.progress } as CSSProperties}
            >
              {product.capabilities.map((capability, index) => (
                <article
                  className={`ledger-row${index <= ledger.active ? ' is-reached' : ''}${index === ledger.active ? ' is-current' : ''}`}
                  id={capability.id}
                  key={capability.id}
                >
                  <div>
                    <h3>{capability.title}</h3>
                    <p>{capability.body}</p>
                  </div>
                  <ul className="ticks">
                    {capability.points.map((point, i) => (
                      <li key={point} style={{ '--i': i } as CSSProperties}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section className="section" id="platform">
        <div className="container">
          <SectionHead
            title="Where it sits in the *hiring line*"
            body="Every product shares one candidate record, so nothing is re-entered between steps."
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
                <span>Previous</span>
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
                <span>Next</span>
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

      <CtaBand />
    </>
  );
}
