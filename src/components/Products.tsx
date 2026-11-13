import { useEffect, useRef, type KeyboardEvent } from 'react';
import { products } from '../data/content';
import { useAutoRotate } from '../lib/useAutoRotate';
import { Icon } from './Icon';
import { ProductMock } from './ProductMock';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function Products() {
  const rotate = useAutoRotate<HTMLDivElement>(products.length, 2000);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabListRef = useRef<HTMLDivElement>(null);
  const product = products[rotate.index];

  // On narrow screens the tabs scroll sideways; keep the active one in view
  // without moving the page itself.
  useEffect(() => {
    const list = tabListRef.current;
    const tab = tabRefs.current[rotate.index];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: 'smooth',
    });
  }, [rotate.index]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = products.length - 1;
    let next = -1;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = rotate.index === last ? 0 : rotate.index + 1;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = rotate.index === 0 ? last : rotate.index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next < 0) return;

    event.preventDefault();
    rotate.select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section section--light" id="products">
      <div className="container">
        <SectionHead
          title="Everything between requisition and *offer letter*"
          body={'Most teams stitch together five tools to move a candidate from "applied" to "signed." TalentPool365 runs the whole workflow — with the evidence trail to back every decision.'}
        />

        <Reveal className="showcase">
          <div className="showcase-inner" ref={rotate.ref} {...rotate.holdProps}>
            <div className="showcase-side">
              <div
                className="showcase-tabs"
                ref={tabListRef}
                role="tablist"
                aria-label="Products"
                aria-orientation="vertical"
                onKeyDown={onKeyDown}
              >
                {products.map((item, i) => {
                  const selected = i === rotate.index;
                  return (
                    <button
                      key={item.title}
                      ref={(node) => {
                        tabRefs.current[i] = node;
                      }}
                      type="button"
                      role="tab"
                      id={`product-tab-${i}`}
                      className="showcase-tab"
                      aria-selected={selected}
                      aria-controls="product-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => rotate.select(i)}
                    >
                      <span className="icon-tile">
                        <Icon name={item.icon} />
                      </span>
                      {item.title}
                      {selected ? (
                        <span
                          className={`showcase-progress${rotate.running ? ' is-running' : ''}`}
                          key={`${i}-${rotate.running}`}
                          aria-hidden="true"
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {rotate.canAutoPlay ? (
                <button className="auto-toggle auto-toggle--text" type="button" onClick={rotate.togglePaused}>
                  <Icon name={rotate.paused ? 'play' : 'pause'} />
                  {rotate.paused ? 'Play product tour' : 'Pause product tour'}
                </button>
              ) : null}
            </div>

            <div
              className="showcase-panel"
              role="tabpanel"
              id="product-panel"
              aria-labelledby={`product-tab-${rotate.index}`}
              tabIndex={0}
            >
              <div className="showcase-stage" key={rotate.index}>
                <ProductMock index={rotate.index} title={product.title} />
              </div>
              <div className="showcase-copy" key={`copy-${rotate.index}`}>
                <h3>{product.title}</h3>
                <p>{product.body}</p>
                <ul className="ticks">
                  {product.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
