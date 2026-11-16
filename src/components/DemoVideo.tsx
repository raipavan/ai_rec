import { useEffect, useRef, useState } from 'react';
import { demoVideo } from '../data/content';
import { prefersReducedMotion } from '../lib/motion';
import { Icon } from './Icon';

/** Turns a YouTube or Vimeo link into a muted, autoplaying embed URL; null for a plain video file. */
function embedUrl(src: string): string | null {
  const youtube = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (youtube) {
    return `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&mute=1&loop=1&playlist=${youtube[1]}&rel=0`;
  }
  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&muted=1&loop=1`;
  return null;
}

/**
 * The demo starts by itself once it scrolls into view and pauses when it leaves.
 * Browsers only allow autoplay without sound, so it starts muted with a "Turn sound on"
 * button. Nothing is downloaded until the section is near the screen. Under reduced
 * motion it waits for the visitor to press play.
 */
export function DemoVideo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(false);
  const { src, poster, title, length } = demoVideo;
  const ready = src.trim().length > 0;
  const embed = ready ? embedUrl(src) : null;

  useEffect(() => {
    const box = boxRef.current;
    if (!box || !ready || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = Boolean(entries[0]?.isIntersecting);
        setInView(visible);
        if (visible && !prefersReducedMotion()) setStarted(true);
      },
      { threshold: 0.5 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, [ready]);

  // play while on screen, pause when scrolled away
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !started) return;
    if (inView) void video.play().catch(() => undefined);
    else video.pause();
  }, [inView, started]);

  const soundOn = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    void video.play().catch(() => undefined);
  };

  return (
    <div className="demo-video" id="demo" ref={boxRef}>
      {started && ready ? (
        embed ? (
          <iframe
            src={embed}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              muted
              loop
              playsInline
              preload="auto"
              onVolumeChange={(event) => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)}
            >
              Your browser cannot play this video.
            </video>
            {muted ? (
              <button className="demo-video__sound" type="button" onClick={soundOn}>
                <Icon name="play" />
                Turn sound on
              </button>
            ) : null}
          </>
        )
      ) : (
        <button
          className="demo-video__poster"
          type="button"
          disabled={!ready}
          onClick={() => setStarted(true)}
          aria-label={ready ? `Play: ${title} (${length})` : `${title} — coming soon`}
        >
          <img src={poster} width="1536" height="1024" loading="lazy" decoding="async" alt="" />
          <span className="demo-video__play" aria-hidden="true">
            <Icon name="play" />
          </span>
          <span className="demo-video__tag" aria-hidden="true">
            {ready ? `Watch the demo · ${length}` : 'Demo video coming soon'}
          </span>
        </button>
      )}
    </div>
  );
}
