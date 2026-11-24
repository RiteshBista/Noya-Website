import { useCallback, useEffect, useRef, useState } from "react";
import type Hls from "hls.js";
import VideoControls from "./VideoControls";
import { useVideoPlayback } from "./useVideoPlayback";

/**
 * Full-bleed background video, with a graceful still-image fallback.
 * Three tiers, in order of preference:
 *  1. `src` — an HLS (.m3u8) stream, loaded via hls.js. NOYA does not
 *     currently host one, so this is left undefined by default.
 *  2. `videoSrc` — a plain, self-hosted mp4 loop.
 *  3. `poster` — a static image, used on failure, reduced-motion, or
 *     when neither video source is configured.
 *
 * Autoplay always starts muted — the only form of autoplay browsers
 * reliably allow, and the only one that respects WCAG 1.4.2 (no sound the
 * visitor didn't ask for). Sound is turned on solely by the visitor
 * pressing the Sound button; nothing else on the page ever unmutes it.
 * Pass `controls` to render that minimal play/pause + mute/unmute overlay
 * (the shared VideoControls, driven by useVideoPlayback) — the underlying
 * <video> element is never unmounted or reloaded when either is toggled.
 */
export default function HlsBackground({
  src,
  videoSrc,
  videoSrcMobile,
  poster,
  controls = false,
  videoClassName = "",
  loopEnd,
  silent = false,
}: {
  src?: string;
  videoSrc?: string;
  /** Optional — a smaller/lower-bitrate derivative served to narrow viewports via a `<source media>` query, so phones on slower connections never fetch the desktop file. */
  videoSrcMobile?: string;
  /** Optional — omit when no fallback/poster image should ever be shown (reduced-motion and load-error states then just fall through to the page's own background instead of an image). Also used as the video's `poster` attribute for an instant first paint before the video buffers. */
  poster?: string;
  controls?: boolean;
  /** Optional extra classes on the <video> itself — e.g. a colour grade — kept off the controls so they stay unfiltered and clickable. */
  videoClassName?: string;
  /** Seconds: loop back to the start here instead of at the file's end — for
   * a supplied film that closes on a title card the hero shouldn't show. */
  loopEnd?: number;
  /** The film has no audio track: the Sound control is disabled and says so. */
  silent?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Reduced motion is read up front (not only in the effect below) so the
  // <video> never mounts, fetches, or gets a play() call for a visitor who
  // asked the OS for less motion.
  const [useImage, setUseImage] = useState(
    () =>
      (!src && !videoSrc) ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches),
  );
  // The element in state too, so the controls' hook subscribes to it.
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const playback = useVideoPlayback(videoEl);

  // A callback ref (not the JSX `muted` attribute) so the DOM node's
  // `.muted` property is initialized to match our own `muted` state the
  // instant the node exists, before the browser's own `autoplay` handling
  // or our effects below ever run — React special-cases a literal `muted`
  // prop by re-applying it as a live DOM property on every single
  // re-render, which would fight with the visitor's own mute/unmute
  // choice. Setting it once here, then managing `.muted` ourselves in the
  // effect below, keeps it under our control for the life of the element.
  const setVideoNode = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node) node.muted = true;
    setVideoEl(node);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setUseImage(true);
      return;
    }
    if (!src || !videoRef.current) return;
    const video = videoRef.current;
    let hls: Hls | null = null;
    let cancelled = false;

    // Loaded on demand — NOYA doesn't currently host an HLS stream, so no
    // page passes `src`, and hls.js (a ~200kb chunk) should never ship to a
    // visitor who never needed it.
    import("hls.js").then(({ default: HlsLib }) => {
      if (cancelled) return;
      if (HlsLib.isSupported()) {
        hls = new HlsLib();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(HlsLib.Events.ERROR, (_evt, data) => {
          if (data.fatal) setUseImage(true);
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else if (!videoSrc) {
        setUseImage(true);
      }
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src, videoSrc]);

  // Explicitly attempt (muted) playback as soon as the element exists
  // (covers the plain `videoSrc` path here; the HLS path above attaches its
  // own source first, then this picks it up). If it's refused (e.g. Low
  // Power Mode), the controls' hook reads the paused element and offers Play.
  useEffect(() => {
    if (useImage) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, [useImage, src, videoSrc]);

  if (useImage) {
    // No poster to fall back to (e.g. reduced-motion or a load error with no
    // fallback image supplied) — render nothing and let the page's own
    // background show through, rather than an invalid/blank image layer.
    if (!poster) return null;
    return (
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <video
        ref={setVideoNode}
        className={`absolute inset-0 h-full w-full object-cover ${videoClassName}`}
        autoPlay
        loop
        playsInline
        preload="auto"
        poster={poster}
        src={!src && !videoSrcMobile ? videoSrc : undefined}
        // onError={() => setUseImage(true)}
        onError={(e) => {
          console.error("NOYA VIDEO ERROR", {
            code: e.currentTarget.error?.code,
            message: e.currentTarget.error?.message,
            currentSrc: e.currentTarget.currentSrc,
            networkState: e.currentTarget.networkState,
            readyState: e.currentTarget.readyState,
          });

          setUseImage(true);
        }}
        onTimeUpdate={
          loopEnd
            ? (e) => {
                if (e.currentTarget.currentTime >= loopEnd) e.currentTarget.currentTime = 0;
              }
            : undefined
        }
        aria-hidden="true"
      >
        {!src && videoSrcMobile && (
          <>
            <source src={videoSrcMobile} media="(max-width: 768px)" type="video/mp4" />
            <source src={videoSrc} type="video/mp4" />
          </>
        )}
      </video>

      {controls && (
        <VideoControls
          playing={playback.playing}
          muted={playback.muted}
          available={playback.available}
          hasSound={!silent}
          audioBlocked={playback.audioBlocked}
          onTogglePlay={playback.togglePlay}
          onToggleMute={playback.toggleMute}
        />
      )}
    </>
  );
}
