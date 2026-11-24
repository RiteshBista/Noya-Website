import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { guestNotes } from "../data/site";

export default function Guestbook() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-[var(--color-background-dark)] py-section px-6 md:px-10 overflow-hidden">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-page">
        <div className="mb-14">
          <span className="eyebrow" style={{ color: "var(--color-rose)" }}>
            The Guestbook
          </span>
          <h2 className="mt-4 font-display text-heading text-[var(--color-text-on-dark)] max-w-xl">
            Notes left by people who stayed.
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border-dark)]">
          {guestNotes.map((note, i) => (
            <motion.figure
              key={note.name}
              className="bg-[var(--color-background-dark)] p-8 md:p-10"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <blockquote className="font-display text-title leading-snug text-[var(--color-text-on-dark)]">
                &ldquo;{note.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  className="h-[3px] w-6"
                  style={{ backgroundColor: "var(--color-rose)" }}
                  aria-hidden="true"
                />
                <span className="text-caption tracking-[0.15em] uppercase text-[var(--color-text-on-dark-faint)]">
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
