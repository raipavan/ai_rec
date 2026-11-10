import type { CSSProperties } from 'react';
import { Reveal, type RevealVariant } from './Reveal';

interface SectionHeadProps {
  eyebrow?: string;
  title: string;
  body?: string;
  center?: boolean;
  className?: string;
  style?: CSSProperties;
  variant?: RevealVariant;
}

export function SectionHead({
  eyebrow,
  title,
  body,
  center,
  className,
  style,
  variant,
}: SectionHeadProps) {
  const classes = [
    'section-head',
    center ? 'section-head--center' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Reveal className={classes} style={style} variant={variant}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </Reveal>
  );
}
