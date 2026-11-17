import type { CSSProperties } from 'react';
import { AnimatedValue } from '../components/AnimatedValue';
import { Icon } from '../components/Icon';
import { Metrics } from '../components/Metrics';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { SkCtaBanner, SkHero, SkVectorArt } from '../components/SeekOutUI';
import { SubNav } from '../components/SubNav';
import { productBySlug } from '../data/products';
import {
  industrySolutions,
  sizeSolutions,
  solutionSections,
  useCaseSolutions,
} from '../data/solutions';
import { useActiveSection } from '../lib/useActiveSection';

const sectionIds = solutionSections.map((section) => section.id);
const sectionLinks = solutionSections.map((section) => ({ label: section.label, href: `#${section.id}` }));

export function SolutionsPage() {
  const active = useActiveSection(sectionIds);

  return (
    <main className="sk-page">
      <SkHero
        eyebrow="INDUSTRY & SIZE SOLUTIONS"
        eyebrowIcon="building"
        title="Built for the way your sector hires"
        subtitle="A hospital, a bank, and a fast-growing startup do not hire the same way. Find your industry, company size, or hiring scenario and see how TalentPool365 fits."
        primaryCta={{ label: 'Talk to a specialist →', href: '/company/contact' }}
        secondaryCta={{ label: 'See the platform', href: '/products' }}
        aside={<SkVectorArt kind="solutions" />}
      />

      <SubNav
        label="Solutions sections"
        links={sectionLinks}
        current={`#${active}`}
        currentKind="location"
      />

      <section className="section section--light" id="by-industry">
        <div className="container">
          <SectionHead
            title="By *industry*"
            body="Compliance rules, licensing checks and seasonal spikes differ by sector. These playbooks ship with the platform rather than as a services project."
          />

          <div className="grid sol-grid">
            {industrySolutions.map((industry, index) => (
              <Reveal as="article" className="card sol-card" id={industry.id} key={industry.id} delay={index % 3}>
                <span className="icon-tile">
                  <Icon name={industry.icon} />
                </span>
                <h3>{industry.title}</h3>
                {industry.tagline && <p className="sol-tagline">{industry.tagline}</p>}
                <p>{industry.body}</p>
                <div className="sol-points-wrap">
                  <span className="how-help-lbl">How we help:</span>
                  <ul className="ticks">
                    {industry.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <p className="sol-stat">
                  <strong>
                    <AnimatedValue value={industry.statValue} />
                  </strong>
                  {industry.statLabel}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="by-company-size">
        <div className="container">
          <SectionHead
            title="By *company size*"
            body="The same platform at every size. What changes is how much of it you switch on, and how much control you need around it."
          />

          <div className="size-grid">
            {sizeSolutions.map((size, index) => (
              <Reveal
                as="article"
                className="size-col"
                id={size.id}
                key={size.id}
                delay={index}
                style={{ '--grow': (index + 1) / sizeSolutions.length } as CSSProperties}
              >
                <span className="icon-tile">
                  <Icon name={size.icon} />
                </span>
                <h3>{size.title}</h3>
                {size.tagline && <p className="sol-tagline">{size.tagline}</p>}
                <p className="size-profile">{size.profile}</p>
                <p>{size.body}</p>
                <div className="sol-points-wrap">
                  <span className="how-help-lbl">How we help:</span>
                  <ul className="ticks">
                    {size.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <a className="more-link" href="/pricing">
                  Usually on {size.plan}
                  <Icon name="arrow-right" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light" id="by-use-case">
        <div className="container">
          <SectionHead
            title="By *use case*"
            body="Different kinds of hiring lean on different parts of the platform. Each one below lists the products that do most of the work."
          />

          <div className="use-list">
            {useCaseSolutions.map((useCase, index) => (
              <Reveal
                as="article"
                className="use-row"
                id={useCase.id}
                key={useCase.id}
                variant={index % 2 === 0 ? 'left' : 'right'}
              >
                <span className="icon-tile">
                  <Icon name={useCase.icon} />
                </span>
                <div className="use-row-main">
                  <h3>{useCase.title}</h3>
                  {useCase.tagline && <p className="sol-tagline">{useCase.tagline}</p>}
                  <p>{useCase.body}</p>
                  <div className="sol-points-wrap">
                    <span className="how-help-lbl">How we help:</span>
                    <ul className="ticks">
                      {useCase.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="use-row-products">
                  <p>Products used most</p>
                  <ul className="chip-list">
                    {useCase.products.map((slug, i) => {
                      const product = productBySlug(slug);
                      return product ? (
                        <li key={slug} style={{ '--i': i } as CSSProperties}>
                          <a className="chip" href={`/products/${slug}`}>
                            {product.title}
                          </a>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Metrics />
      <SkCtaBanner />
    </main>
  );
}
