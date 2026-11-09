import {
  createElement,
  type CSSProperties,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from 'react';
import { useReveal } from '../lib/useReveal';

export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'fade';

interface RevealProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'style' | 'children'> {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Reveal({
  as = 'div',
  delay = 0,
  variant = 'up',
  className = '',
  style,
  children,
  ...rest
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  const classes = ['reveal', `reveal--${variant}`, visible ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ');

  return createElement(
    as,
    {
      ...rest,
      ref,
      className: classes,
      style: { ...style, '--reveal-delay': `${delay * 70}ms` } as CSSProperties,
    },
    children,
  );
}
