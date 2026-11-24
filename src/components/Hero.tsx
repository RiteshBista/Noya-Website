import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import SolidCta from "./SolidCta";
import VideoBackground from "./VideoBackground";
import VideoControls from "./VideoControls";
import { useVideoPlayback } from "./useVideoPlayback";
import ArrowLink from "./ArrowLink";
import ResponsiveImage from "./ResponsiveImage";
import HeroScrim, { type HeroScrimStrength } from "./HeroScrim";
import { loaderRemainingSeconds } from "./loaderTiming";
import { beirut } from "../data/site";
import beirutLogo from "../assets/beirut_logo.jpg";
// The wordmark from ameya_logo.jpg with its black ground made transparent
// (Home hero only; the Local Artisan page keeps the original file).
import ameyaWordmark from "../assets/ameya-logo-wordmark-transparent.png";
import ananyaLogo from "../assets/ananya-holidays-logo.png";
// Used whole (24.1s, no title card), so imported rather than copied.
import ananyaVideo from "../assets/ananya-holidays-videos.mp4";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Five slides: the Home film, then the hero film of four pages, each with
 * a short invitation to that page (the page's own scrim and framing).
 * The three partner slides carry the partner's own logo, small, above the
 * text: none of the supplied logos has a transparent version, so each is
 * kept to one modest height (no frame or shadow) and the film stays the
 * subject. Restaurant's heading is the logo, so its text heading is
 * screen-reader only.
 * The clips are 25s edits of the page films (Restaurant 22.2s and Travel &
 * Tour 24.1s: all the usable footage those films have); see
 * docs/media-optimization.md.
 */
type Slide = {
  key: string;
  label: string;
  src: string;
  srcMobile?: string;
  poster: string;
  videoClassName?: string;
  /** The film has no audio track: the Sound button is disabled and says so. */
  silent?: boolean;
  scrim: HeroScrimStrength;
  eyebrow?: string;
  title?: string;
  /** Keep `title` for screen readers only (the logo stands in for it). */
  titleHidden?: boolean;
  /** The partner's logo, linked to `cta.to`. `frame` sets its displayed size (each frame matches its logo's proportions). */
  logo?: { src: string; label: string; frame: string; sizes: string };
  subtitle?: string;
  cta?: { label: string; to: string };
};

const slides: Slide[] = [
  {
    key: "home",
    label: "NOYA",
    src: "/videos/home-hero-25s.mp4",
    srcMobile: "/videos/home-hero-25s-mobile.mp4",
    poster: "/images/noya-loop-poster.jpg",
    scrim: "medium",
  },
  {
    key: "events",
    label: "Events",
    src: "/videos/events-hero-25s.mp4",
    poster: "/images/events-hero-25s-poster.jpg",
    // Portrait film: the same band the Events hero shows on wide screens.
    videoClassName: "object-[50%_30%]",
    scrim: "strong",
    eyebrow: "Culture & Celebration",
    title: "Gather for Something Meaningful",
    subtitle: "Art, conversation, and cultural experiences at NOYA.",
    cta: { label: "Explore Events", to: "/events" },
  },
  {
    key: "restaurant",
    label: "Restaurant",
    src: "/videos/restaurant-hero-22s.mp4",
    poster: "/images/restaurant-hero-22s-poster.jpg",
    scrim: "medium",
    title: `${beirut.name}, ${beirut.category}`,
    titleHidden: true,
    // Square mark on its own sandstone ground; a little larger than the
    // others, as its cedar and lettering fill less of the frame.
    logo: { src: beirutLogo, label: "Explore Beirut Restaurant", frame: "h-15 w-15 md:h-20 md:w-20", sizes: "80px" },
    subtitle: beirut.tagline,
    cta: { label: "Explore Restaurant", to: "/restaurant" },
  },
  {
    key: "local-artisan",
    label: "Local Artisan",
    src: "/videos/local-artisan-hero-25s.mp4",
    poster: "/images/local-artisan-hero-25s-poster.jpg",
    scrim: "medium",
    // The wordmark alone, white on transparent, cropped to its letters
    // at the sides (2.613:1) so it starts on the text's left edge.
    logo: {
      src: ameyaWordmark,
      label: "Explore Ameya Local Artisan",
      frame: "h-10 w-[6.53rem] md:h-12 md:w-[7.84rem]",
      sizes: "126px",
    },
    eyebrow: "Craft & Tradition",
    title: "Made by Hand. Rooted in Heritage.",
    subtitle: "Discover the artisans and traditions behind Nepal's living craft.",
    cta: { label: "Discover Local Artisan", to: "/local-artisan" },
  },
  {
    key: "travel-tour",
    label: "Travel & Tour",
    src: ananyaVideo,
    poster: "/images/travel-tour-hero-poster.jpg",
    // The supplied film carries no audio track (Chrome decodes 0 audio
    // bytes from it; the other four slides all have sound).
    silent: true,
    scrim: "light",
    // Whole, at its own 223×108 proportions (2.065:1).
    logo: { src: ananyaLogo, label: "Explore Ananya Holidays", frame: "h-10 w-[5.16rem] md:h-12 md:w-[6.19rem]", sizes: "100px" },
    eyebrow: "Beyond the Courtyard",
    title: "Discover Nepal, One Journey at a Time",
    subtitle: "Explore the places, culture, and landscapes beyond Kathmandu.",
    cta: { label: "Explore Travel & Tour", to: "/travel-tour" },
  },
];

/** A mounted video layer. `id` is new on every navigation, so returning to a slide remounts it and the film starts from the beginning. */
type Layer = { slide: number; id: number };

/**
 * The real headline is rendered from first paint — it's the page's SEO and
 * screen-reader H1, so it is never swapped out for an intro line. The
 * "ART · HERITAGE · HISTORY" brand moment lives in the Loader just before
 * it; the hero's staggered entrance starts as that loader fades, rather
 * than after a fixed multi-second delay (and immediately on client-side
 * navigations, or not at all under reduced motion).
 *
 * Carousel: at most two videos exist at once. On an arrow press the
 * outgoing film pauses on its frame, the new one mounts transparent on top
 * and fades in once its first frame plays, and only then is the old one
 * unmounted. A press during loading replaces the pending film,
 * so rapid presses never leave several videos playing. No autoplay advance.
 *
 * One Pause/Play + Sound pair (the hero's original controls) drives
 * whichever film is active: the incoming one from the moment it is chosen.
 * Sound stays the visitor's choice across slides — once they turn it on,
 * each new film starts audible (their arrow press is the user gesture that
 * permits it), and only one film is ever heard: an outgoing film is paused
 * and muted.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const [delay] = useState(loaderRemainingSeconds);
  const nextId = useRef(1);
  const [base, setBase] = useState<Layer>({ slide: 0, id: 0 });
  const [target, setTarget] = useState<Layer>({ slide: 0, id: 0 });
  const [targetReady, setTargetReady] = useState(true);
  const [navigated, setNavigated] = useState(false);

  const switching = target.id !== base.id;
  // What's on screen: the incoming slide once its first frame is up.
  const shown = switching && targetReady ? target.slide : base.slide;
  const slide = slides[shown];

  // The <video> of each mounted layer, by layer id. The controls act on the
  // active layer: the incoming one as soon as it is chosen.
  const [videos, setVideos] = useState<Record<number, HTMLVideoElement | null>>({});
  const activeLayer = switching ? target : base;
  const activeVideo = videos[activeLayer.id] ?? null;
  const activeSilent = !!slides[activeLayer.slide].silent;
  const playback = useVideoPlayback(activeVideo);

  // The visitor's sound choice, carried from film to film.
  const soundWanted = useRef(false);
  useEffect(() => {
    if (playback.audioBlocked) soundWanted.current = false;
  }, [playback.audioBlocked]);
  useEffect(() => {
    const video = activeVideo;
    if (!video || !soundWanted.current || activeSilent) return;
    video.muted = false;
    video.volume = 1;
    video.play().catch(() => {
      // Audible playback refused: stay muted, and stop asking.
      video.muted = true;
      soundWanted.current = false;
      video.play().catch(() => {});
    });
  }, [activeVideo, activeSilent]);
  const toggleMute = () => {
    soundWanted.current = playback.muted;
    playback.toggleMute();
  };

  const go = (step: number) => {
    // A finished (or fading) switch becomes the new base first.
    const from = switching && targetReady ? target : base;
    if (from !== base) setBase(from);
    const next = (target.slide + step + slides.length) % slides.length;
    setTarget({ slide: next, id: nextId.current++ });
    setTargetReady(false);
    setNavigated(true);
  };

  // Once the incoming film has faded in, drop the outgoing one.
  useEffect(() => {
    if (!switching || !targetReady) return;
    const t = setTimeout(() => setBase(target), reduced ? 0 : 750);
    return () => clearTimeout(t);
  }, [switching, targetReady, target, reduced]);

  // Never wait on a slow or stalled film for long: show its poster.
  useEffect(() => {
    if (!switching || targetReady) return;
    const t = setTimeout(() => setTargetReady(true), 3000);
    return () => clearTimeout(t);
  }, [switching, targetReady, target.id]);

  const enter = (offset: number, y: number) =>
    reduced
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { delay: (navigated ? 0 : delay) + offset, duration: 0.9, ease },
        };

  const layers = switching ? [base, target] : [base];

  return (
    <section
      id="top"
      className="relative hero-viewport w-full overflow-hidden bg-[var(--color-background-dark)]"
      aria-roledescription="carousel"
      aria-label="NOYA highlights"
    >
      {layers.map((layer) => {
        const s = slides[layer.slide];
        const isTarget = switching && layer.id === target.id;
        const isActive = !switching || isTarget;
        return (
          <div
            key={layer.id}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: isTarget && !targetReady ? 0 : 1 }}
          >
            <VideoBackground
              src={s.src}
              srcMobile={s.srcMobile}
              poster={s.poster}
              videoClassName={s.videoClassName}
              // The outgoing film pauses as soon as another is chosen.
              active={isActive}
              onReady={isTarget ? () => setTargetReady(true) : undefined}
              onVideo={(video) =>
                setVideos((all) => {
                  const next = { ...all };
                  if (video) next[layer.id] = video;
                  else delete next[layer.id];
                  return next;
                })
              }
            />
          </div>
        );
      })}
      <HeroScrim strength={slide.scrim} />

      {/* Anchored to the lower left of the content column: the film's subject
          (a hand lighting candles) stays clear in the upper two-thirds. */}
      <div
        key={shown}
        role="group"
        aria-roledescription="slide"
        aria-label={`${shown + 1} of ${slides.length}: ${slide.label}`}
        className="focus-on-dark relative z-10 mx-auto flex h-full w-full max-w-wide flex-col items-start justify-end px-6 md:px-10 pb-14 md:pb-20 text-left"
      >
        {shown === 0 ? (
          <>
            {/* The client's line about the property, set as a quiet dateline
                (sentence case, a short rule before it) rather than a long run
                of tracked capitals. */}
            <motion.p
              className="flex max-w-[40rem] items-baseline gap-3 text-caption text-[var(--color-text-on-dark)]/85 text-pretty"
              {...enter(0, 10)}
            >
              <span aria-hidden="true" className="relative -top-[0.25em] h-px w-8 shrink-0 bg-current" />
              Family-run boutique property set in an architectural haven.
            </motion.p>

            <h1 className="mt-6 font-display text-display-xl tracking-display text-[var(--color-text-on-dark)]">
              <motion.span className="block" {...enter(0.1, 18)}>
                A House Reimagined.
              </motion.span>{" "}
              <motion.span className="block" {...enter(0.3, 18)}>
                A New Life Begun.
              </motion.span>
            </h1>

            <motion.p
              className="mt-5 max-w-xl font-display-italic text-title leading-snug text-[var(--color-text-on-dark)] text-pretty"
              {...enter(0.5, 14)}
            >
              Where history finds new life, and every detail tells a story.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
              {...enter(0.7, 14)}
            >
              <SolidCta to="/reserve" showArrow={false}>
                Book a Stay
              </SolidCta>
              <ArrowLink to="/discover" tone="onDark" className="px-1 py-3">
                Discover NOYA
              </ArrowLink>
            </motion.div>
          </>
        ) : (
          <>
            {/* The page H1 stays in the document whichever slide shows. */}
            <h1 className="sr-only">A House Reimagined. A New Life Begun.</h1>
            {slide.logo && slide.cta && (
              <motion.div className="mb-6" {...enter(0, 10)}>
                <Link
                  to={slide.cta.to}
                  aria-label={slide.logo.label}
                  className={`block overflow-hidden opacity-90 transition-[opacity,translate] duration-300 hover:opacity-100 hover:-translate-y-px focus-visible:opacity-100 ${slide.logo.frame}`}
                >
                  <ResponsiveImage
                    src={slide.logo.src}
                    sizes={slide.logo.sizes}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </Link>
              </motion.div>
            )}
            {/* The page heroes' own type styles (PageHero). */}
            {slide.eyebrow && (
              <motion.span className="eyebrow text-balance text-[var(--color-text-on-dark)]" {...enter(0, 10)}>
                {slide.eyebrow}
              </motion.span>
            )}
            {slide.titleHidden ? (
              <h2 className="sr-only">{slide.title}</h2>
            ) : (
              <motion.h2
                className="mt-5 font-display tracking-display text-display-lg text-[var(--color-text-on-dark)] max-w-[14ch]"
                {...enter(0.1, 18)}
              >
                {slide.title}
              </motion.h2>
            )}
            <motion.p
              className={`${slide.titleHidden ? "" : "mt-6"} max-w-[34rem] text-lead text-pretty text-[var(--color-text-on-dark)]`}
              {...enter(0.25, 14)}
            >
              {slide.subtitle}
            </motion.p>
            {slide.cta && (
              <motion.div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" {...enter(0.4, 14)}>
                <ArrowLink to={slide.cta.to} tone="onDark" className="px-1 py-3">
                  {slide.cta.label}
                </ArrowLink>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Arrows at the hero's edges. Below 1440px the side gutter is
          narrower than a button, so they're centred in the picture above the
          text (which is pinned to the bottom and is at most ~470px tall on
          any slide) rather than in the whole hero, where they would sit on
          the headings. From 1440px they clear the text column: true centre. */}
      <div className="focus-on-dark pointer-events-none absolute inset-x-0 top-[max(calc((100%-470px)/2),1.75rem)] min-[1440px]:top-1/2 z-20 flex -translate-y-1/2 justify-between px-2 sm:px-3 lg:px-5">
        <HeroArrow direction="previous" onClick={() => go(-1)} />
        <HeroArrow direction="next" onClick={() => go(1)} />
      </div>

      {/* The hero's own Pause/Play and Sound controls, in the frame's lower
          right (where they have always sat), for whichever film is active.
          On phones they sit lower and tighter to the corner, below the text
          column's CTA row. */}
      <VideoControls
        playing={playback.playing}
        muted={playback.muted}
        available={playback.available}
        hasSound={!activeSilent}
        audioBlocked={playback.audioBlocked}
        onTogglePlay={playback.togglePlay}
        onToggleMute={toggleMute}
        className="absolute z-20 bottom-2 right-2 md:bottom-6 md:right-6"
      />

      {/* Announces the new slide to screen readers after an arrow press. */}
      <p className="sr-only" aria-live="polite">
        {navigated ? `Slide ${shown + 1} of ${slides.length}: ${slide.label}` : ""}
      </p>
    </section>
  );
}

function HeroArrow({ direction, onClick }: { direction: "previous" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-controls="top"
      aria-label={direction === "previous" ? "Previous slide" : "Next slide"}
      className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-[var(--color-background-dark)]/25 text-[var(--color-text-on-dark)] backdrop-blur-[2px] transition-colors hover:border-white/70 hover:bg-[var(--color-background-dark)]/45 md:h-12 md:w-12"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        {direction === "previous" ? (
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}
