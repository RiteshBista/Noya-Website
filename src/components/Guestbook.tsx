import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { guestNotes } from "../data/site";

export default function Guestbook() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-[var(--color-ink)] py-24 md:py-32 px-6 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14">
          <span className="eyebrow" style={{ color: "var(--color-rose)" }}>
            The Guestbook
          </span>
          <h2 className="mt-4 font-display text-[clamp(28px,4vw,44px)] text-[var(--color-paper)] max-w-xl">
            Notes left by people who stayed.
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-hairline)]">
          {guestNotes.map((note, i) => (
            <motion.figure
              key={note.name}
              className="bg-[var(--color-ink)] p-8 md:p-10"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <blockquote className="font-display text-lg md:text-xl leading-snug text-[var(--color-paper)]">
                &ldquo;{note.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  className="h-[3px] w-6"
                  style={{ backgroundColor: "var(--color-rose)" }}
                  aria-hidden="true"
                />
                <span className="text-xs tracking-[0.15em] uppercase text-[var(--color-paper-faint)]">
                  {note.name} &middot; {note.stay}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
