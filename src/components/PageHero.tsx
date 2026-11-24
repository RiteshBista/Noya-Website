import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import HlsBackground from "./HlsBackground";
import HeroScrim, { type HeroScrimStrength } from "./HeroScrim";
import ResponsiveImage from "./ResponsiveImage";
import { coverSizes, webpSrcSet, webpUrl } from "./imageSources";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Shared interior-page hero, built on the Home hero: a full-bleed
 * photograph or film filling `.hero-viewport`, the text anchored to the
 * lower part of the frame over a directional scrim. `align` sets the text
 * block to the left content margin (the editorial default) or centred (for
 * symmetrical subjects such as a single window or a mountain). Portrait
 * media is framed with `imagePosition` / `videoClassName` rather than a
 * different layout, so every page's hero has the same shape.
 *
 * Under reduced motion everything renders in its final state at once.
 */
export default function PageHero({
  eyebrow,
  title,
  titleImage,
  subtitle,
  image,
  videoSrc,
  controls = false,
  scrim = "medium",
  imagePosition,
  imageAlt,
  credit,
  videoClassName,
  videoLoopEnd,
  videoSilent = false,
  align = "left",
  compact = false,
}: {
  eyebrow: string;
  title: string;
  /** Render this image in place of the title text (title is kept as its alt text). */
  titleImage?: string;
  subtitle?: string;
  /** Still image: the hero itself when there's no video, and the video's poster (and reduced-motion still) otherwise. */
  image?: string;
  videoSrc?: string;
  /** Show the same mute/play overlay Home's and Discover's own video heroes use. Ignored when there's no videoSrc. */
  controls?: boolean;
  /** Overlay strength, chosen per page from measured text contrast on its media — see HeroScrim. */
  scrim?: HeroScrimStrength;
  /** CSS object-position for the still image's crop, e.g. "50% 35%". */
  imagePosition?: string;
  /** Describes the still image when it carries meaning of its own; without it the image is treated as decorative. */
  imageAlt?: string;
  /** Photo credit or licence line, shown small in the lower corner (required for Creative Commons images). */
  credit?: ReactNode;
  /** Extra classes on the background <video> — e.g. a static object-position
   * utility to frame portrait footage inside the landscape hero. */
  videoClassName?: string;
  /** Loop the film at this point (seconds) instead of its end — see HlsBackground. */
  videoLoopEnd?: number;
  /** The film has no audio track: the Sound control is disabled and says so. */
  videoSilent?: boolean;
  align?: "left" | "center";
  /** Shorter introduction for action pages, keeping the form close to the title. */
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  const centered = align === "center";
  const enter = (delay: number, y: number) =>
    reduced
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.9, ease },
        };

  const media = videoSrc ? (
    <HlsBackground
      videoSrc={videoSrc}
      // A width variant rather than the full-size original: the poster
      // can't take a srcset, and this covers a phone-sized hero.
      poster={image && webpUrl(image, 1000)}
      controls={controls}
      videoClassName={videoClassName}
      loopEnd={videoLoopEnd}
      silent={videoSilent}
    />
  ) : (
    image && (
      <picture className="contents">
        <source
          type="image/webp"
          srcSet={webpSrcSet(image)}
          sizes={coverSizes(image)}
        />
        <img
          src={image}
          alt={imageAlt ?? ""}
          aria-hidden={imageAlt ? undefined : true}
          // The hero is the first thing on the page: load it eagerly and
          // ahead of below-the-fold images.
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
      </picture>
    )
  );

  return (
    // Editorial pages retain the full-viewport hero; action pages can use
    // a compact introduction to bring the form into view sooner.
    // Dark base: only visible before the first video frame arrives, or
    // under reduced motion on a video hero without a poster.
    <section
      className={`relative w-full overflow-hidden bg-[var(--color-background-dark)] ${compact ? "flex items-end min-h-[18rem] md:min-h-[19rem]" : "hero-viewport"}`}
    >
      <div className="absolute inset-0">{media}</div>
      <HeroScrim strength={scrim} />

      {/* Same text column and bottom padding as the Home hero. */}
      <div
        className={`focus-on-dark relative z-10 flex flex-col justify-end px-6 md:px-10 ${compact ? "py-8 md:py-10" : "h-full pb-14 md:pb-20"} ${
          centered ? "items-center text-center" : "mx-auto w-full max-w-wide items-start text-left"
        }`}
      >
        <motion.span className="eyebrow text-balance text-[var(--color-text-on-dark)]" {...enter(0, 10)}>
          {eyebrow}
        </motion.span>
        <motion.h1
          className={`mt-5 font-display tracking-display text-display-lg text-[var(--color-text-on-dark)] ${
            centered ? "max-w-[16ch]" : "max-w-[14ch]"
          }`}
          {...enter(0.1, 18)}
        >
          {titleImage ? (
            // No aria-label: the logo's alt text (the page title) is the
            // H1's accessible name, rather than "Noya Home".
            <Link to="/" className={`block w-fit ${centered ? "mx-auto" : ""}`}>
              <ResponsiveImage
                src={titleImage}
                alt={title}
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 300px, 240px"
                className="block h-auto w-60 md:w-72 lg:w-[22rem]"
              />
            </Link>
          ) : (
            title
          )}
        </motion.h1>
        {subtitle && (
          <motion.p
            className={`mt-6 max-w-[34rem] text-lead text-pretty text-[var(--color-text-on-dark)] ${compact ? "text-left" : ""}`}
            {...enter(0.25, 14)}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {credit && (
        <p
          className="absolute bottom-3 right-4 z-10 max-w-[70%] text-right text-[0.6875rem] leading-snug text-[var(--color-text-on-dark-muted)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[var(--color-text-on-dark)]"
        >
          {credit}
        </p>
      )}
    </section>
  );
}
