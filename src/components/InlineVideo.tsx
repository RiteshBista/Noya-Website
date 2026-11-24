import { useEffect, useRef, useState } from "react";

/**
 * A small, in-page looping clip (not a hero). Nothing downloads until the
 * clip nears the viewport (`preload="none"`); it then plays muted and
 * inline while on screen, and pauses when scrolled away. Under reduced
 * motion it never autoplays: the poster shows with native controls, so the
 * visitor can still choose to play it.
 *
 * With `sound`, a speaker button lets the visitor hear the clip's own
 * audio. It always starts muted (the only autoplay browsers allow, and no
 * sound the visitor didn't ask for); only the button or the native
 * controls ever unmute it. The choice survives scrolling away and back.
 */
export default function InlineVideo({
  src,
  poster,
  label,
  className = "",
  sound = false,
}: {
  src: string;
  /** Frame-0 still, shown until playback starts. */
  poster: string;
  /** Accessible description of what the clip shows. */
  label: string;
  className?: string;
  /** Show a sound on/off button. Only for clips with a real audio track. */
  sound?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    video.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playKeepingSoundHonest(video);
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reducedMotion]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      // The click is the user gesture browsers need for audible playback.
      // Under reduced motion it only unmutes; playing stays the visitor's call.
      if (!reducedMotion && video.paused) playKeepingSoundHonest(video);
    } else {
      video.muted = true;
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={label}
        preload="none"
        muted
        loop
        playsInline
        controls={reducedMotion}
        // Keeps the button truthful whatever changed mute: our toggle, the
        // native controls (reduced motion), or the fallback below.
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        className={className}
      />

      {sound && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          title={muted ? "Sound on" : "Sound off"}
          // Top-right under reduced motion so it clears the native controls.
          className={`absolute z-10 right-3 ${reducedMotion ? "top-3" : "bottom-3"} flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-[var(--color-text-on-dark)] backdrop-blur-sm hover:bg-black/65 transition-colors`}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 9v6h4l5 5V4L8 9H4z" strokeLinejoin="round" />
              <path d="M17 9l5 6M22 9l-5 6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 9v6h4l5 5V4L8 9H4z" strokeLinejoin="round" />
              <path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" strokeLinecap="round" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}

/**
 * play(), but if the browser refuses audible playback (e.g. iOS Safari
 * resuming an unmuted clip on scroll, with no fresh tap), fall back to
 * muted playback rather than leave the clip frozen; `volumechange` then
 * flips the button back to "Sound on".
 */
function playKeepingSoundHonest(video: HTMLVideoElement) {
  video.play().catch((err: unknown) => {
    // AbortError just means a scroll-away pause() interrupted this play().
    if (video.muted || (err as DOMException)?.name !== "NotAllowedError") return;
    video.muted = true;
    video.play().catch(() => {});
  });
}
