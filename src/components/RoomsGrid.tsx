import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { rooms } from "../data/site";

type Room = (typeof rooms)[number] & { featured?: boolean };

const spanClass: Record<string, string> = {
  wide: "md:col-span-8",
  normal: "md:col-span-4",
};

function Tile({ room, index }: { room: Room; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.a
      ref={ref}
      href="#stay"
      className={`group relative block overflow-hidden border ${
        room.featured
          ? "border-[var(--color-sage)]/40"
          : "border-[var(--color-hairline)]"
      } ${spanClass[room.span] ?? "md:col-span-4"} min-h-[260px] md:min-h-[280px]`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <img
        src={room.image}
        alt={room.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/10 to-transparent transition-opacity" />
      {room.featured && (
        <span className="absolute top-4 right-4 eyebrow bg-[var(--color-ink)]/60 px-2 py-1 backdrop-blur-sm">
          Featured
        </span>
      )}
      <div className="absolute bottom-0 left-0 p-5 md:p-6">
        <h3 className="font-display text-2xl md:text-3xl text-[var(--color-paper)]">
          {room.title}
        </h3>
        <p className="mt-1 text-xs text-[var(--color-paper-dim)] tracking-wide">
          {room.subtitle}
        </p>
      </div>
    </motion.a>
  );
}

export default function RoomsGrid() {
  return (
    <section
      id="rooms"
      className="relative bg-[var(--color-ink)] py-24 md:py-36 px-6 md:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">The House</span>
            <h2 className="mt-4 font-display italic text-[clamp(28px,4vw,44px)] text-[var(--color-paper)] max-w-lg">
              Eight rooms, one restoration.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--color-paper-dim)]">
            Every room was restored on its own terms — the same stone floors
            and hand-plastered walls, dressed differently in each. Nothing
            here is a backdrop; it's simply how the house looks.
          </p>
        </div> */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">The House</span>
            <h2 className="mt-4 font-display text-[clamp(28px,4vw,44px)] text-[var(--color-paper)] max-w-lg">
              A house shaped by time.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-[var(--color-paper-dim)]">
            Restored with care and lived in slowly, each room carries its own
            character through stone, wood, textiles, light, and the traces of
            another time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {rooms.map((room, i) => (
            <Tile key={room.id} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
