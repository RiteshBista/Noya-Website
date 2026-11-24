import type { MouseEvent } from "react";

/**
 * The background-video Pause/Play and Sound pair, shared by the Home hero
 * and the page heroes: two quiet line icons in the frame's lower right, the
 * same buttons the hero has always used. State comes from
 * `useVideoPlayback`, so each icon and label shows what the video is
 * actually doing.
 *
 * Each button is a 44px target around a 14–16px icon; a soft shadow keeps
 * the white icons legible on bright frames without adding a visible plate.
 * Clicks stop here, so they never reach a parent's own click handling.
 */
export default function VideoControls({
  playing,
  muted,
  available = true,
  hasSound = true,
  audioBlocked = false,
  onTogglePlay,
  onToggleMute,
  className = "absolute z-20 bottom-6 right-6",
}: {
  playing: boolean;
  muted: boolean;
  /** False when the video couldn't load: both buttons are disabled. */
  available?: boolean;
  /** False for a film with no audio track: the Sound button is disabled and says so. */
  hasSound?: boolean;
  /** The browser refused audible playback after an unmute. */
  audioBlocked?: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  /** Positioning of the pair within its frame. */
  className?: string;
}) {
  const press = (handler: () => void) => (e: MouseEvent) => {
    e.stopPropagation();
    handler();
  };
  const button =
    "flex h-11 w-11 items-center justify-center text-[var(--color-text-on-dark)] [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.55))] transition-colors hover:text-[var(--color-primary-on-dark-hover)] disabled:cursor-default disabled:opacity-45 disabled:hover:text-[var(--color-text-on-dark)]";
  const soundOff = !hasSound || muted;
  const soundLabel = !hasSound
    ? "This background video has no sound"
    : muted
      ? audioBlocked
        ? "Unmute background video (sound was blocked by the browser)"
        : "Unmute background video"
      : "Mute background video";

  return (
    <div className={`focus-on-dark flex items-center gap-1 ${className}`}>
      <button
        type="button"
        onClick={press(onTogglePlay)}
        disabled={!available}
        aria-label={!available ? "Background video unavailable" : playing ? "Pause background video" : "Play background video"}
        title={!available ? "Video unavailable" : playing ? "Pause" : "Play"}
        className={button}
      >
        {playing && available ? (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
            <rect x="5" y="4" width="4.5" height="16" />
            <rect x="14.5" y="4" width="4.5" height="16" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path d="M6 4l14 8-14 8V4z" />
          </svg>
        )}
      </button>

      <button
        type="button"
        onClick={press(onToggleMute)}
        disabled={!available || !hasSound}
        aria-label={soundLabel}
        title={!hasSound ? "No sound" : muted ? "Sound on" : "Sound off"}
        className={button}
      >
        {soundOff ? (
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
    </div>
  );
}
