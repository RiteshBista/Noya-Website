import { motion } from "framer-motion";
import HlsBackground from "./HlsBackground";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <HlsBackground poster="/images/hero-exterior-night.jpg" />
      <div className="absolute inset-0 bg-[var(--color-ink)]/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/10 to-[var(--color-ink)]/40" />
      <div className="grain absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.9, ease }}
        >
          Gairidhara, Kathmandu &middot; Restored 18th-Century Home
        </motion.span>

        <h1 className="max-w-3xl text-[var(--color-paper)]">
          <motion.span
            className="block font-sans font-light text-[clamp(30px,5vw,54px)] leading-[1.08]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 1, ease }}
          >
            A house that was
          </motion.span>
          <motion.span
            className="block font-display text-[clamp(38px,7vw,76px)] leading-[1.1] text-[var(--color-sage)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.9, duration: 1, ease }}
          >
            restored, not renovated.
          </motion.span>
        </h1>

        <motion.p
          className="mt-7 max-w-md text-[15px] leading-relaxed text-[var(--color-paper-dim)]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.9, ease }}
        >
          Six rooms, a courtyard, and the original stone of a house that has
          stood in Gairidhara since long before the neighbourhood grew up
          around it.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.9, ease }}
        >
          <a
            href="#stay"
            className="bg-[var(--color-sage)] text-[var(--color-ink)] px-7 py-3 text-xs uppercase tracking-[0.22em] font-medium hover:bg-[var(--color-paper)] transition-colors"
          >
            Check rates &amp; rooms
          </a>
          <a
            href="#restoration"
            className="border border-[var(--color-paper)]/30 text-[var(--color-paper)] px-7 py-3 text-xs uppercase tracking-[0.22em] hover:border-[var(--color-paper)] transition-colors"
          >
            The restoration
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 h-10 w-[1px] bg-[var(--color-paper)]/25"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 3.6, duration: 0.8 }}
      />
    </section>
  );
}
