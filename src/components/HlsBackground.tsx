import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

/**
 * Full-bleed background video via hls.js, with a graceful still-image
 * fallback when no stream is configured (or playback fails). NOYA does
 * not currently host a public HLS stream, so `src` is left undefined by
 * default and the component falls back to `poster`.
 */
export default function HlsBackground({
  src,
  poster,
}: {
  src?: string;
  poster: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useImage, setUseImage] = useState(!src);

  useEffect(() => {
    if (!src || !videoRef.current) return;
    const video = videoRef.current;
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_evt, data) => {
        if (data.fatal) setUseImage(true);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      setUseImage(true);
    }

    return () => {
      hls?.destroy();
    };
  }, [src]);

  if (useImage) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      onError={() => setUseImage(true)}
      aria-hidden="true"
    />
  );
}
