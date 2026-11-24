import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import ArrowLink from "./ArrowLink";
import { coverScaledSizes, webpSrcSet } from "./imageSources";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Homepage preview block — used for the About / Hotels /
 * Rooms / Dining / Wellness / Events / Shop previews.
 *
 * Supports either:
 * - image: string — a single static image
 * - images: string[] — an automatically cycling image slideshow
 */
export default function SectionPreview({
  id,
  eyebrow,
  title,
  body,
  image,
  images,
  imageAlt,
  imageAlts,
  cta,
  reverse = false,
  accent = "primary",
  dense = false,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  image?: string;
  images?: string[];
  imageAlt: string;
  /** Per-slide alt text for `images` (falls back to `imageAlt`), so each
   * photo is described as what it actually shows. */
  imageAlts?: string[];
  cta: { label: string; href: string };
  reverse?: boolean;
  accent?: "primary" | "rose";
  /** Tighter vertical padding — for a preview with little body copy, where
   * the section's usual generous whitespace reads as unfinished rather
   * than luxurious. */
  dense?: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeImage, setActiveImage] = useState(0);

  const slideshowImages = images?.length ? images : image ? [image] : [];
  const isSlideshow = slideshowImages.length > 1;

  // Auto-advance, with the controls WCAG 2.2.2 asks of anything that moves
  // on its own: an explicit Pause/Play button, a pause while the visitor is
  // pointing at or tabbed into the slideshow, no movement while it is off
  // screen, and no auto-advance at all under reduced motion (Play opts in).
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const frameVisible = useInView(frameRef, { amount: 0.3 });
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [interacting, setInteracting] = useState(false);
  const paused = userPaused ?? Boolean(reduced);
  const running = isSlideshow && !paused && !interacting && frameVisible;

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % slideshowImages.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [running, slideshowImages.length]);

  const accentVar =
    accent === "rose"
      ? "var(--color-rose)"
      : "var(--color-primary)";

  return (
    <section
      id={id}
      ref={ref}
      className={`relative bg-[var(--color-background)] px-6 md:px-10 ${
        dense ? "py-16 md:py-24" : "py-section"
      }`}
    >
      <div className="mx-auto max-w-page">
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 ${children ? "md:items-start" : "items-center"} ${
            reverse ? "md:[direction:rtl]" : ""
          }`}
        >
          <motion.div
            // With long copy beside it, the photograph holds its place while
            // the text scrolls, rather than floating mid-column.
            className={`md:col-span-7 md:[direction:ltr] ${children ? "md:sticky md:top-[calc(var(--nav-height)+2.5rem)]" : ""}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease }}
          >
            <div
              ref={frameRef}
              className="relative aspect-[4/3] overflow-hidden"
              {...(isSlideshow && {
                role: "group",
                "aria-roledescription": "slideshow",
                "aria-label": imageAlt,
                onMouseEnter: () => setInteracting(true),
                onMouseLeave: () => setInteracting(false),
                onFocus: () => setInteracting(true),
                onBlur: (e: React.FocusEvent) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setInteracting(false);
                },
              })}
            >
              {slideshowImages.map((src, index) => (
                // Same WebP width variants as ResponsiveImage; `contents`
                // keeps the absolutely positioned slides laid out as before.
                // Scaled for the 4:3 frame: wide panoramas are cropped at
                // the sides and drawn wider than the column.
                <picture key={src} className="contents">
                <source
                  type="image/webp"
                  srcSet={webpSrcSet(src)}
                  sizes={coverScaledSizes(src, "(min-width: 1280px) 720px, (min-width: 768px) 58vw, 100vw", 4 / 3)}
                />
                <motion.img
                  src={src}
                  alt={imageAlts?.[index] ?? imageAlt}
                  // Only the slide on screen is exposed to assistive tech.
                  aria-hidden={index !== activeImage}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover select-none"
                  draggable={false}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: index === activeImage ? 1 : 0,
                  }}
                  transition={{
                    duration: reduced ? 0 : 1.2,
                    ease: "easeInOut",
                  }}
                />
                </picture>
              ))}

              {isSlideshow && (
                // Pause/Play and one thin line per photo (each a button that
                // shows that photo), on a translucent charcoal-brown pill —
                // the same treatment as the Home hero's control bar.
                <div className="focus-on-dark absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-[var(--bar-edge)] bg-[var(--bar-ground)] p-[3px] pr-2 shadow-[0_2px_14px_rgba(0,0,0,0.10)] backdrop-blur-[6px] md:bottom-4 md:left-4 md:gap-2 md:p-1 md:pr-2.5 [--bar-edge:rgba(214,190,156,0.24)] [--bar-ground:rgba(38,31,25,0.45)] [--bar-ivory:var(--color-text-on-green)] [--bar-rest:rgba(214,204,188,0.38)]">
                  <button
                    type="button"
                    onClick={() => setUserPaused(!paused)}
                    aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--bar-ivory)]/35 text-[var(--bar-ivory)] transition-colors hover:border-[var(--bar-ivory)]/75 hover:bg-[var(--bar-ivory)]/10 md:h-9 md:w-9"
                  >
                    {paused ? (
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                        <path d="M7 4.5l12 7.5-12 7.5v-15z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                        <rect x="5.5" y="4" width="4" height="16" rx="0.75" />
                        <rect x="14.5" y="4" width="4" height="16" rx="0.75" />
                      </svg>
                    )}
                  </button>
                  <div className="flex items-center">
                    {slideshowImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`Show photo ${index + 1} of ${slideshowImages.length}`}
                        aria-current={index === activeImage ? "true" : undefined}
                        className="group/dot flex h-8 items-center px-1 md:h-9"
                      >
                        <span
                          className={`block h-[2px] w-5 rounded-full transition-colors duration-500 md:w-6 ${
                            index === activeImage
                              ? "bg-[var(--bar-ivory)]"
                              : "bg-[var(--bar-rest)] group-hover/dot:bg-[var(--bar-ivory)]/70"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-5 md:[direction:ltr] [&_p]:text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.9, ease }}
          >
            <span className="eyebrow" style={{ color: accentVar }}>
              {eyebrow}
            </span>

            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              {title}
            </h2>

            <p className="mt-6 max-w-md text-body text-[var(--color-text-secondary)]">
              {body}
            </p>

            {children}

            <ArrowLink to={cta.href} className="mt-8">
              {cta.label}
            </ArrowLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}