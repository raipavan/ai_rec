import { products } from '../data/content';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function Products() {
  return (
    <section className="section" id="products">
      <div className="container">
        <SectionHead
          title="Everything between requisition and offer letter"
          body={'Most teams stitch together five tools to move a candidate from "applied" to "signed." TalentPool365 runs the whole workflow — with the evidence trail to back every decision.'}
        />

        <div className="grid grid-3">
          {products.map((product, index) => (
            <Reveal as="article" key={product.title} className="card" delay={index % 3}>
              <span className="icon-tile">
                <Icon name={product.icon} />
              </span>
              <h3>{product.title}</h3>
              <p>{product.body}</p>
              <ul className="ticks">
                {product.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
