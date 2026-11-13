import { metrics, type Metric } from '../data/content';
import { useCountUp } from '../lib/useCountUp';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const { ref, current } = useCountUp(metric.value);
  const decimals = metric.decimals ?? 0;

  return (
    <Reveal className="metric" delay={index}>
      <strong>
        <span ref={ref}>
          {current.toFixed(decimals)}
          {metric.suffix}
        </span>
      </strong>
      <span>{metric.label}</span>
    </Reveal>
  );
}

export function Metrics() {
  return (
    <section className="section metrics on-dark" id="metrics">
      <span className="grain" aria-hidden="true" />
      <div className="container">
        <SectionHead
          title="What changes in the *first quarter*"
          style={{ marginBottom: 0 }}
        />

        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
