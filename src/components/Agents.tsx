import { useEffect, useRef, useState } from 'react';
import { agents, heroStages, products } from '../data/content';
import { drawBot } from '../lib/bot';
import { Icon } from './Icon';
import { ProductMock } from './ProductMock';

const headlines = [
  'The right people.\nNot another pile of resumes.',
  'A shortlist you\ncan explain.',
  'See the skill.\nNot just the claim.',
  'Listen first.\nDecide with evidence.',
  'Your team makes\nthe final call.',
];
const productIndexes = [0, 1, 2, 3, 5];
const mockIndexes = [0, 1, 2, 3, 7];
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

export function Agents() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [eligible, setEligible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [current, setCurrent] = useState(0);
  const cinematic = eligible && !paused;

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const measure = () => {
      const minimumHeight = window.innerWidth >= 900 ? 580 : window.innerWidth >= 560 ? 500 : 680;
      setEligible(!motion.matches && window.innerHeight >= minimumHeight &&
        parseFloat(getComputedStyle(document.documentElement).fontSize) <= 20);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    motion.addEventListener('change', measure);
    window.addEventListener('resize', measure);
    measure();
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    if (!cinematic) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section) return;
    const ctx = canvas?.getContext('2d');
    let frame = 0;
    let visible = false;
    let shown = 0;
    let active = -1;
    let canvasWidth = 0;
    let canvasHeight = 0;
    const target = () => {
      const rect = section.getBoundingClientRect();
      const pin = section.querySelector<HTMLElement>('.film-pin');
      const header = parseFloat(getComputedStyle(section).getPropertyValue('--header-h'));
      return clamp((header - rect.top) / Math.max(1, rect.height - (pin?.offsetHeight ?? 0))) * agents.length;
    };
    const resize = () => {
      screenRefs.current.forEach((screen) => {
        const visual = screen?.parentElement;
        if (!screen || !visual) return;
        const style = getComputedStyle(visual);
        const available = visual.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
        screen.style.scale = String(Math.min(1, available / (screen.offsetHeight + 20)));
      });
      if (!canvas || !ctx) return;
      canvasWidth = canvas.clientWidth;
      canvasHeight = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.round(canvasWidth * dpr);
      canvas.height = Math.round(canvasHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      frame = 0;
      if (!visible || document.hidden) return;
      const desired = target();
      shown += (desired - shown) * 0.2;
      if (Math.abs(desired - shown) < 0.002) shown = desired;
      const chapter = Math.min(agents.length - 1, Math.floor(shown));
      const within = Math.min(1, shown - chapter);
      const camera = chapter + (chapter < agents.length - 1 ? ease((within - 0.62) / 0.38) : 0);
      section.style.setProperty('--film-progress', String(clamp(shown / agents.length)));
      section.style.setProperty('--camera-turn', `${Math.sin(camera * Math.PI) * 8}deg`);
      section.style.setProperty('--film-camera', String(camera / (agents.length - 1)));
      section.dataset.chapter = String(chapter);
      section.dataset.travelling = String(chapter < agents.length - 1 && within > 0.62);
      agents.forEach((_, i) => {
        const screen = screenRefs.current[i];
        const copy = copyRefs.current[i];
        const distance = i - camera;
        if (screen) {
          screen.style.transform = `translate3d(${distance * 128}%, ${Math.abs(distance) * 56}px, ${-Math.abs(distance) * 480}px) rotateY(${-8 - distance * 36}deg) rotateX(3deg)`;
          screen.style.opacity = String(clamp(1 - Math.abs(distance) * 0.9));
        }
        if (copy) {
          const enter = chapter === 0 ? 1 : ease(within / 0.12);
          const leave = chapter === agents.length - 1 ? 1 : 1 - ease((within - 0.5) / 0.12);
          copy.style.opacity = String(i === chapter ? enter * leave : 0);
          copy.style.transform = `translateY(${i === chapter ? (1 - enter) * 12 : 12}px)`;
          copy.style.visibility = i === chapter ? 'visible' : 'hidden';
        }
      });
      if (active !== chapter) {
        active = chapter;
        setCurrent(chapter);
      }
      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        const unit = Math.min(canvasWidth / 3.6, canvasHeight / 4.6);
        drawBot(ctx, canvasWidth * (0.48 + Math.sin(camera * 0.9) * 0.07), canvasHeight * 0.39, unit, shown * 2, {
          role: chapter,
          lookX: -0.6,
          tilt: Math.sin(camera * Math.PI) * 0.05,
          work: 0.4,
          wave: chapter === 0 ? 0.35 : 0,
          happy: chapter === agents.length - 1 ? ease(within / 0.5) : 0,
        });
      }
      if (shown !== desired) frame = requestAnimationFrame(draw);
    };
    const schedule = () => {
      if (visible && !document.hidden && !frame) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const sizeObserver = new ResizeObserver(() => { resize(); schedule(); });
    shown = target();
    resize();
    observer.observe(section);
    if (canvas) sizeObserver.observe(canvas);
    screenRefs.current.forEach((screen) => { if (screen) sizeObserver.observe(screen); });
    const visual = section.querySelector('.film-visual');
    if (visual) sizeObserver.observe(visual);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    return () => {
      observer.disconnect();
      sizeObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
      section.style.removeProperty('--film-progress');
      section.style.removeProperty('--film-camera');
      section.style.removeProperty('--camera-turn');
      copyRefs.current.forEach((copy) => copy?.removeAttribute('style'));
      screenRefs.current.forEach((screen) => screen?.removeAttribute('style'));
    };
  }, [cinematic]);

  const jumpTo = (index: number) => {
    const section = sectionRef.current;
    const pin = section?.querySelector<HTMLElement>('.film-pin');
    if (!section || !pin) return;
    const header = parseFloat(getComputedStyle(section).getPropertyValue('--header-h'));
    const top = section.getBoundingClientRect().top + window.scrollY - header;
    const travel = section.offsetHeight - pin.offsetHeight;
    window.scrollTo({ top: top + ((index + 0.28) / agents.length) * travel, behavior: 'smooth' });
  };

  return (
    <section className={`agents hiring-film on-dark${cinematic ? ' is-cinematic' : ' is-static'}`} id="agents" ref={sectionRef} aria-labelledby="film-title">
      <div className="film-pin">
        <div className="container film-header">
          <div>
            <p className="film-eyebrow">Inside TalentPool365</p>
            <h2 id="film-title">One role. Five handoffs. <span>Your call.</span></h2>
          </div>
          <div className="film-tools">
            {eligible ? <button type="button" onClick={() => {
              setPaused((value) => !value);
              sectionRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
            }}><Icon name={paused ? 'play' : 'pause'} />{paused ? 'Play scroll story' : 'Read without motion'}</button> : null}
            <a href="#products">Skip to products <Icon name="arrow-right" /></a>
          </div>
        </div>

        <div className="container film-chapters">
          <div className="film-set" aria-hidden="true">
            <img src="/assets/hero-bg.jpg" width="1536" height="1024" loading="lazy" alt="" />
            <div className="film-floor" />
          </div>
          {agents.map((agent, i) => {
            const product = products[productIndexes[i]];
            return (
              <article className="film-chapter" key={agent.station} aria-hidden={cinematic && current !== i ? true : undefined} inert={cinematic && current !== i}>
                <div className="film-copy" ref={(node) => { copyRefs.current[i] = node; }}>
                  <p className="film-kicker"><span>{String(i + 1).padStart(2, '0')}</span> / {agent.station}</p>
                  <h3>{headlines[i]}</h3>
                  <p className="film-body">{agent.body}</p>
                  <p className="film-result"><strong>{heroStages[i].value}</strong><span>{heroStages[i].note}</span></p>
                  <a className="film-link" href={product.href}>Explore {product.title}<Icon name="arrow-right" /></a>
                </div>
                <div className="film-visual" aria-hidden="true">
                  <div className="film-screen" ref={(node) => { screenRefs.current[i] = node; }}>
                    <div className="film-screen-top"><span>TalentPool365</span><span>{agent.station}</span></div>
                    <ProductMock index={mockIndexes[i]} title={product.title} />
                    <div className="film-evidence"><Icon name="shield" /><span>{i === 4 ? 'Approved by your hiring team' : 'Evidence stays with the candidate'}</span></div>
                  </div>
                </div>
              </article>
            );
          })}
          <canvas className="film-guide" ref={canvasRef} aria-hidden="true" />
        </div>

        <div className="container film-footer">
          {cinematic ? <nav aria-label="Hiring story chapters">
            <ol>{agents.map((agent, i) => <li key={agent.station}><button type="button" aria-current={current === i ? 'step' : undefined} onClick={() => jumpTo(i)}><span>{String(i + 1).padStart(2, '0')}</span>{agent.station}</button></li>)}</ol>
            <span className="film-timeline" aria-hidden="true"><i /></span>
          </nav> : null}
          <p>{cinematic ? 'Scroll to move forward. Scroll back to rewind. ' : ''}<span>Illustrative workflow, not guaranteed results.</span></p>
        </div>
      </div>
    </section>
  );
}
