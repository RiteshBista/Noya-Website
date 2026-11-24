import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Playback state for one background <video>, read from the element itself.
 *
 * Every value is derived from the media element's own events (play, pause,
 * volumechange, error…), never from what a button last asked for, so the
 * controls stay truthful when the browser acts on its own: autoplay refused,
 * OS media keys, a source that fails to load, or a new element swapped in
 * (the Home carousel's slides) — passing a different element re-subscribes
 * and resyncs at once, and the old listeners are removed.
 *
 * Off screen the video is paused (no decoding, no sound from a hero the
 * visitor has scrolled past) and resumed on return, unless the visitor
 * paused it themselves. Pausing keeps the playback position; muting never
 * pauses; neither changes the other.
 *
 * Sound only ever comes on from the visitor's own press of the Sound button
 * (a user gesture, so browsers allow it). If the browser still refuses
 * audible playback, the video goes back to muted playback and `audioBlocked`
 * is set, rather than showing sound as on while nothing is heard.
 */
export function useVideoPlayback(video: HTMLVideoElement | null) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [available, setAvailable] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(false);
  // Paused by the visitor (as opposed to by scrolling off screen).
  const userPaused = useRef(false);

  useEffect(() => {
    userPaused.current = false;
    setAudioBlocked(false);
    if (!video) {
      setPlaying(false);
      return;
    }
    const sync = () => {
      setPlaying(!video.paused && !video.ended);
      setMuted(video.muted);
      // NETWORK_NO_SOURCE: no <source> could be loaded.
      setAvailable(!video.error && video.networkState !== HTMLMediaElement.NETWORK_NO_SOURCE);
    };
    sync();
    const events = ["play", "playing", "pause", "ended", "volumechange", "loadstart", "emptied", "loadeddata"];
    events.forEach((e) => video.addEventListener(e, sync));
    // A failed <source> fires `error` on itself without bubbling: a
    // capture listener on the <video> still sees it.
    video.addEventListener("error", sync, true);

    let offscreenPaused = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!video.paused) {
            offscreenPaused = true;
            video.pause();
          }
        } else if (offscreenPaused) {
          offscreenPaused = false;
          if (!userPaused.current) {
            video.play().catch(() => {
              // Audible resume refused: carry on muted rather than stall.
              if (!video.muted) {
                video.muted = true;
                setAudioBlocked(true);
                video.play().catch(() => {});
              }
            });
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);

    return () => {
      events.forEach((e) => video.removeEventListener(e, sync));
      video.removeEventListener("error", sync, true);
      observer.disconnect();
    };
  }, [video]);

  const togglePlay = useCallback(() => {
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {
        // Refused even on a press (e.g. an unplayable source): the
        // `pause` state stays, so the button keeps offering Play.
      });
    } else {
      userPaused.current = true;
      video.pause();
    }
  }, [video]);

  const toggleMute = useCallback(() => {
    if (!video) return;
    if (!video.muted) {
      video.muted = true;
      setAudioBlocked(false);
      return;
    }
    video.muted = false;
    video.volume = 1;
    setAudioBlocked(false);
    // Confirm audible playback actually continues (only when it's meant to
    // be playing: unmuting never resumes a video the visitor paused).
    if (!video.paused) {
      video.play().catch(() => {
        video.muted = true;
        setAudioBlocked(true);
        video.play().catch(() => {});
      });
    }
  }, [video]);

  return { playing, muted, available, audioBlocked, togglePlay, toggleMute };
}
