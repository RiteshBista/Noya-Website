import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowLink from "./ArrowLink";
import { rooms } from "../data/site";

import ResponsiveImage from "./ResponsiveImage";
type Room = (typeof rooms)[number] & { featured?: boolean };

// Tiles take their height from their proportions, not a fixed min-height
// (which left 3:1 slivers on the wide tiles). From md up, normal tiles are
// 4:3 and set the row height; a wide tile shares its row, so it simply
// fills it (~2.7:1, a cinematic band), keeping every row one even band.
// Square tiles made each row ~390px on a desktop and the eight-tile mosaic
// ~1200px tall; 4:3 keeps the mosaic at ~900px with every subject in view.
const spanClass: Record<string, string> = {
  wide: "md:col-span-8 md:aspect-auto",
  normal: "md:col-span-4 md:aspect-[4/3]",
};

function Tile({
  room,
  index,
  href,
}: {
  room: Room;
  index: number;
  href: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`group relative block overflow-hidden border ${
        room.featured
          ? "border-[var(--color-primary)]/40"
          : "border-[var(--color-border)]"
      } ${spanClass[room.span] ?? spanClass.normal} aspect-[4/3]`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        to={href}
        className="absolute inset-0 z-10"
        aria-label={room.title}
      />

      <ResponsiveImage
        src={room.image}
        sizes={room.span === "wide" ? "(min-width: 1280px) 850px, (min-width: 768px) 62vw, 100vw" : "(min-width: 1280px) 420px, (min-width: 768px) 31vw, 100vw"}
        coverAspect={room.span === "wide" ? 2.7 : 4 / 3}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={"position" in room ? { objectPosition: room.position } : undefined}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-dark)]/90 via-[var(--color-background-dark)]/10 to-transparent transition-opacity" />

      {room.featured && (
        <span className="absolute top-4 right-4 eyebrow text-[var(--color-text-on-dark)] bg-[var(--color-background-dark)]/60 px-2 py-1 backdrop-blur-sm">
          Featured
        </span>
      )}

      <div className="absolute bottom-0 left-0 p-5 md:p-6">
        <h3 className="font-display text-title text-[var(--color-text-on-dark)]">
          {room.title}
        </h3>

        {/* Room for two lines from md up, so titles sit on one line
            across a row whether or not a subtitle wraps. */}
        <p className="mt-1 md:min-h-[2lh] text-caption text-[var(--color-text-on-dark-secondary)] tracking-wide">
          {room.subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export default function RoomsGrid({
  id = "rooms",
  eyebrow = "The House",
  title = "A house shaped by time.",
  description = "Restored with care and lived in slowly, each room carries its own character through stone, wood, textiles, light, and the traces of another time.",
  linkTo = "/hotel",
  cta,
  followOn = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  linkTo?: string;
  cta?: { label: string; href: string };
  /** Set when the section directly above has the same background and no
   * divider: uses the short follow-on top step instead of full padding. */
  followOn?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative bg-[var(--color-background)] ${followOn ? "pt-section-follow" : "pt-section"} pb-section px-6 md:px-10`}
    >
      <div className="mx-auto max-w-page">
        {/* The same 12 columns and gap as the tiles below: from lg the
            description starts at the left edge of the right-hand tile. */}
        <div className="mb-10 md:mb-12 grid grid-cols-1 md:grid-cols-12 md:items-end gap-x-3 md:gap-x-4 gap-y-6">
          <div className="md:col-span-7 lg:col-span-8">
            <span className="eyebrow">{eyebrow}</span>

            <h2 className="mt-4 font-display text-heading text-[var(--color-text)] max-w-lg">
              {title}
            </h2>
          </div>

          <p className="md:col-span-5 lg:col-span-4 max-w-sm text-body text-pretty text-[var(--color-text-secondary)]">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {rooms.map((room, i) => (
            <Tile key={room.id} room={room} index={i} href={linkTo} />
          ))}
        </div>

        {cta && (
          <div className="mt-10 flex justify-center">
            <ArrowLink to={cta.href}>{cta.label}</ArrowLink>
          </div>
        )}
      </div>
    </section>
  );
}