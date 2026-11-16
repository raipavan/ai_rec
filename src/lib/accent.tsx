import type { ReactNode } from 'react';

/**
 * Headline accent: wrap a phrase in asterisks ("Do more *with less*") and it
 * renders in the bold italic accent style used across the site.
 */
export function accent(text: string): ReactNode {
  return text.split('*').map((part, i) =>
    i % 2 === 1 ? (
      <em className="accent" key={i}>
        {part}
      </em>
    ) : (
      part
    ),
  );
}
