import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Full-bleed local MP4 background video (homepage hero only).
 *
 * Deliberately NOT built on HlsBackground/hls.js: these are plain,
 * self-hosted .mp4 loops with no HLS manifest, so there's no reason to
 * route them through machinery meant for adaptive streaming or
 * YouTube's player. An optional `poster` (a frame-matched still) paints
 * instantly while the large mp4 buffers, and stands in for the video for
 * visitors who prefer reduced motion. On a real playback error the video
 * element just stays transparent (showing the poster, if any) and the
 * section's own background colour shows through.
 *
 * Autoplay always starts muted — the only form of autoplay browsers
 * reliably allow, and the only one that respects WCAG 1.4.2 (no sound the
 * visitor didn't ask for). This component draws no controls of its own:
 * it hands its <video> element to the parent through `onVideo`, and the
 * parent (the Home carousel) points its one shared Pause/Sound pair
 * (VideoControls + useVideoPlayback) at whichever slide is active.
 */
export default function VideoBackground({
  src,
  srcMobile,
  poster,
  videoClassName = "",
  active = true,
  onReady,
  onVideo,
}: {
  src: string;
  /** Optional — served instead of `src` under the mobile media query below. */
  srcMobile?: string;
  /** Optional still shown before the first frame decodes, and instead of the video under reduced motion. */
  poster?: string;
  /** Extra classes for the <video>, e.g. an `object-[x_y]` framing. */
  videoClassName?: string;
  /** False pauses and mutes the video (the Home carousel's outgoing slide). */
  active?: boolean;
  /** Called once, when there's something to show: the first played frame,
      the poster under reduced motion, or a load error (poster or nothing). */
  onReady?: () => void;
  /** Receives the <video> element when it mounts (and null when it unmounts). */
  onVideo?: (video: HTMLVideoElement | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Reduced motion: the <video> is never mounted (so it never downloads or
  // plays) — the poster still is shown instead.
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const onVideoRef = useRef(onVideo);
  onVideoRef.current = onVideo;
  const readyFired = useRef(false);
  const fireReady = useCallback(() => {
    if (readyFired.current) return;
    readyFired.current = true;
    onReadyRef.current?.();
  }, []);

  useEffect(() => {
    if (reducedMotion) fireReady();
  }, [reducedMotion, fireReady]);

  // A callback ref (not a literal JSX `muted` attribute) so the DOM
  // node's `.muted` property starts true the instant the node exists —
  // before the browser's own autoplay handling or the effect below ever
  // run — and stays under our control from then on rather than being
  // fought by React re-applying a literal prop on every render.
  const setVideoNode = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node) node.muted = true;
    onVideoRef.current?.(node);
  }, []);

  // Attempt muted playback as soon as the element exists.
  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;
    if (!active) {
      // Muted too: an outgoing film must never be heard under the new one.
      video.pause();
      video.muted = true;
      return;
    }
    let cancelled = false;

    video.muted = true;
    video.play().catch(() => {
      // Autoplay refused (e.g. Low Power Mode): the poster is all there
      // is to show, so don't keep a carousel waiting on a first frame.
      if (!cancelled) fireReady();
    });

    return () => {
      cancelled = true;
    };
  }, [reducedMotion, src, srcMobile, active, fireReady]);

  if (reducedMotion) {
    if (!poster) return null;
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      ref={setVideoNode}
      className={`absolute inset-0 h-full w-full object-cover ${videoClassName}`}
      loop
      playsInline
      preload="auto"
      poster={poster}
      onPlaying={fireReady}
      aria-hidden="true"
    >
      {srcMobile && (
        <source src={srcMobile} media="(max-width: 767px)" type="video/mp4" />
      )}
      {/* A failed <source> fires `error` on itself, not on the <video>. */}
      <source src={src} type="video/mp4" onError={fireReady} />
    </video>
  );
}
