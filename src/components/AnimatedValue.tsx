import { useCountUp } from '../lib/useCountUp';

const PATTERN = /^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/;

function Counter({ prefix, digits, suffix }: { prefix: string; digits: string; suffix: string }) {
  const target = Number(digits.replace(/,/g, ''));
  const decimals = digits.includes('.') ? digits.split('.')[1].length : 0;
  const grouped = digits.includes(',');
  const { ref, current } = useCountUp(target);
  const shown = grouped
    ? Math.round(current).toLocaleString('en-US')
    : current.toFixed(decimals);

  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

/**
 * A figure such as "3.4×", "12,000+" or "Day 19" that counts up to its number
 * when it scrolls into view. Values without a number ("Same day") render as text.
 */
export function AnimatedValue({ value }: { value: string }) {
  const match = PATTERN.exec(value);
  if (!match) return <span>{value}</span>;
  return <Counter prefix={match[1]} digits={match[2]} suffix={match[3]} />;
}
