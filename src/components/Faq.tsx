import { useId, useState } from 'react';
import { faqs, type FaqItem } from '../data/content';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

interface FaqProps {
  items?: FaqItem[];
  eyebrow?: string;
  title?: string;
  body?: string;
  contactHref?: string;
}

export function Faq({
  items = faqs,
  eyebrow = 'Questions, answered',
  title = 'What hiring teams ask *before the trial*',
  body = "No discovery call required to get an answer. If yours isn't here, send it over — a product specialist replies within one business day.",
  contactHref = '#contact',
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="section" id="faq">
      <div className="container faq-layout">
        <div className="faq-intro">
          <SectionHead
            variant="left"
            eyebrow={eyebrow}
            title={title}
            body={body}
          />
          <Reveal variant="left" delay={1}>
            <a className="faq-link" href={contactHref}>
              Ask us something else
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        <div className="faq-list">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const questionId = `${baseId}-q-${index}`;
            const answerId = `${baseId}-a-${index}`;

            return (
              <Reveal
                key={item.question}
                className={`faq-item${isOpen ? ' is-open' : ''}`}
                variant={index % 2 === 0 ? 'left' : 'right'}
                delay={Math.min(index, 3)}
              >
                <h3 className="faq-q">
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-plus" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="faq-a"
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                >
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
