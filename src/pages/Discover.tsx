import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import HlsBackground from "../components/HlsBackground";
import HeroScrim from "../components/HeroScrim";
import Seo from "../components/Seo";
import ReserveCta from "../components/ReserveCta";
import { navigationMenu, pageSeo } from "../data/site";

import ResponsiveImage from "../components/ResponsiveImage";
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Cinematic video hero, local to the Discover page, filling the viewport
 * beneath the sticky navbar (`.hero-viewport`, see index.css). Deliberately
 * not routed through the shared PageHero — it has no eyebrow and its film
 * keeps its own light colour grade. Sizing is the same `.hero-viewport`
 * rule every hero uses.
 */
function DiscoverHero() {
  // Under reduced motion the heading and intro render in their final state.
  const reduced = useReducedMotion();
  const enter = (delay: number, y: number) =>
    reduced
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.9, ease },
        };

  return (
    <section className="relative hero-viewport w-full overflow-hidden">
      <HlsBackground
        videoSrc="/videos/discover-loop.mp4"
        controls
        videoClassName="saturate-[0.92] contrast-[1.04] brightness-[0.97]"
      />
      <HeroScrim strength="medium" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-wide flex-col items-start justify-end px-6 md:px-10 pb-14 md:pb-20 text-left text-[var(--color-text-on-dark)]">
        <div className="flex flex-col items-start">
          <motion.h1
            className="max-w-[14em] font-display text-display-lg tracking-display text-[var(--color-text-on-dark)] text-balance"
            {...enter(0.1, 18)}
          >
            Discover NOYA.
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl font-display-italic text-title leading-snug text-[var(--color-text-on-dark)] text-pretty"
            {...enter(0.25, 14)}
          >
            An introduction to the house, its art, history, and heritage, and the city around it, each with a page of its own.
          </motion.p>
        </div>
      </div>

    </section>
  );
}

// Focal points for photos whose subject sits off-centre in a cropped card.
const cardFocus: Record<string, string> = {
  "Travel & Tour": "50% 20%", // the peak, near the top of the frame
  Heritage: "50% 35%",
  Events: "50% 25%", // the dancer's mask
};

function DiscoverCard({
  group,
  index,
  wideSm = false,
  wideLg = false,
}: {
  group: (typeof navigationMenu)[number];
  index: number;
  /** Spans two columns on the 2-column (sm) and/or 4-column (lg) grid — used
   * sparingly to give the collection an editorial rhythm instead of a flat,
   * evenly-sized directory grid, and so every row fills edge to edge. Only
   * landscape photographs are given the wide slot on the 4-column grid. */
  wideSm?: boolean;
  wideLg?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`${wideSm ? "sm:col-span-2" : ""} ${wideLg ? "lg:col-span-2" : wideSm ? "lg:col-span-1" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease }}
    >
      <Link
        to={group.href}
        // Single cards are square from sm up (the set is half portrait, half
        // landscape photographs, and 4:3 cut the portraits to half their
        // height). A wide card on the 4-column grid fills its row (~2:1)
        // rather than setting a taller height of its own.
        className={`group relative block overflow-hidden aspect-[4/3] ${
          wideSm ? "sm:aspect-[16/10]" : "sm:aspect-square"
        } ${wideLg ? "lg:aspect-auto lg:h-full" : "lg:aspect-square"}`}
      >
        <ResponsiveImage
          src={group.image}
          sizes={wideLg ? "(min-width: 1280px) 640px, (min-width: 640px) 50vw, 100vw" : wideSm ? "(min-width: 1024px) 25vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
          coverAspect={wideLg ? 2 : wideSm ? 16 / 10 : 1}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          style={cardFocus[group.label] ? { objectPosition: cardFocus[group.label] } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-dark)]/90 via-[var(--color-background-dark)]/15 to-transparent" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="font-display text-title text-[var(--color-text-on-dark)]">{group.label}</h3>
          <p className="mt-2 max-w-[26ch] text-small text-[var(--color-text-on-dark-secondary)]">
            {group.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-button uppercase text-[var(--color-primary-on-dark)] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Explore &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Discover() {
  return (
    <>
      <Seo {...pageSeo.discover} />
      <DiscoverHero />

      <section className="relative bg-[var(--color-surface)] border-y border-[var(--color-border)] py-section px-6 md:px-10 text-center">
        <span className="eyebrow">Art &middot; History &middot; Heritage</span>
        <h2 className="mt-6 font-display text-heading text-[var(--color-text)] max-w-2xl mx-auto">
          Three chapters of the same house.
        </h2>
        <p className="mt-5 max-w-lg mx-auto text-body text-[var(--color-text-secondary)]">
          The objects, the timeline, and the architecture that make NOYA what it is, each with a page of its own.
        </p>

        <ul className="mt-12 md:mt-14 mx-auto max-w-[1180px] flex flex-wrap justify-center gap-6 xl:gap-8 text-left">
          {[
            {
              number: "01",
              label: "Art",
              note: "The objects",
              href: "/art",
              image: "/images/carved-wooden-guardian-mask.jpg",
              position: "50% 30%", // the guardian's face, in the shorter frame
              alt: "A carved wooden guardian figure fixed beside a doorway at NOYA",
            },
            {
              number: "02",
              label: "History",
              note: "The timeline",
              href: "/history",
              image: "/images/restoration-facade-rubble.jpg",
              alt: "NOYA during its restoration, the house standing behind piles of brick rubble",
            },
            {
              number: "03",
              label: "Heritage",
              note: "The architecture",
              href: "/heritage",
              image: "/images/turquoise-wall-shuttered-window.jpg",
              position: "50% 28%", // the carved arch above the shutters
              alt: "A tall white-shuttered window set in NOYA's turquoise wall, a flowering climber beside it",
            },
          ].map((c) => (
            <li key={c.href} className="w-full md:w-[calc((100%-1.5rem)/2)] xl:w-[calc((100%-4rem)/3)]">
              <Link
                to={c.href}
                aria-label={`Explore ${c.label}: ${c.note}`}
                className="group relative block aspect-square overflow-hidden bg-[var(--color-background-dark)]"
              >
                <ResponsiveImage
                  src={c.image}
                  sizes="(min-width: 1280px) 372px, (min-width: 768px) 47vw, 100vw"
                  coverAspect={1}
                  alt={c.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]"
                  style={"position" in c ? { objectPosition: c.position } : undefined}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-dark)]/80 from-0% via-[var(--color-background-dark)]/45 via-40% to-transparent to-75%" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-6">
                  <div>
                    <span className="block text-label tracking-[0.2em] font-medium text-[var(--color-text-on-dark-secondary)]">{c.number}</span>
                    <h3 className="mt-1 font-display text-title text-[var(--color-text-on-dark)]">{c.label}</h3>
                    <span className="mt-0.5 block text-small text-[var(--color-text-on-dark-secondary)]">{c.note}</span>
                    <span className="mt-3 inline-block border-b border-[var(--color-text-on-dark)]/60 pb-0.5 text-button uppercase text-[var(--color-text-on-dark)]">
                      Explore {c.label}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-text-on-dark)]/50 text-[var(--color-text-on-dark)] transition-[background-color,border-color,transform] duration-300 ease-out group-hover:border-[var(--color-text-on-dark)] motion-safe:group-hover:translate-x-1 group-focus-visible:border-[var(--color-text-on-dark)] motion-safe:group-focus-visible:translate-x-1"
                  >
                    &rarr;
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        {/* The card grid's own 4 columns and gap, so the paragraph spans
            exactly the two columns of the Rooms card beneath it. */}
        <div className="mx-auto max-w-page mb-14 md:mb-16 grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-6 lg:items-end">
          <div className="lg:col-span-2">
          <span className="eyebrow">Where to Begin</span>
          <h2 className="mt-5 font-display text-heading-lg text-[var(--color-text)] max-w-[14ch]">
            One house, seen from every side.
          </h2>
          </div>
          <p className="lg:col-span-2 text-body text-[var(--color-text-secondary)] max-w-xl lg:max-w-none">
            NOYA is a restored 18th-century heritage home in Gairidhara, Kathmandu, and each of the pages below is its own way into it. Choose the one that matches what you're
            looking for.
          </p>
        </div>

        <div className="mx-auto max-w-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {navigationMenu.map((group, i) => (
            <DiscoverCard
              key={group.label}
              group={group}
              index={i}
              // Two wider "chapter" cards break the run of ten into 3 / 4 / 3
              // on the 4-column grid (Rooms, Travel & Tour) and into full
              // pairs on the 2-column grid (Rooms, Events), so no row ends
              // half-empty. Local Artisan's photo is a small, tall portrait
              // and no longer takes a wide slot.
              wideSm={i === 2 || i === 9}
              wideLg={i === 2 || i === 8}
            />
          ))}
        </div>
      </section>

      <ReserveCta heading="Or simply come and see it." />
    </>
  );
}
