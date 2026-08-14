import { motion } from "framer-motion";
import { stayTiers, contact } from "../data/site";

export default function Rates() {
  return (
    <section id="stay" className="relative bg-[var(--color-panel)] py-24 md:py-36 px-6 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 text-center md:text-left">
          <span className="eyebrow">Rates</span>
          <h2 className="mt-4 font-display text-[clamp(28px,4vw,44px)] text-[var(--color-paper)]">
            Three rooms, three ways to stay.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stayTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`relative flex flex-col p-8 border ${
                tier.highlighted
                  ? "border-[var(--color-sage)] bg-[var(--color-ink)] md:-translate-y-4 shadow-[0_0_60px_-15px_var(--color-sage)]"
                  : "border-[var(--color-hairline)] bg-[var(--color-ink)]/40"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-8 bg-[var(--color-sage)] text-[var(--color-ink)] text-[10px] uppercase tracking-[0.2em] px-3 py-1">
                  Most Requested
                </span>
              )}
              <span className="eyebrow">{tier.eyebrow}</span>
              <h3 className="mt-3 font-display text-2xl text-[var(--color-paper)]">
                {tier.name}
              </h3>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-light text-[var(--color-paper)]">{tier.price}</span>
                <span className="text-xs text-[var(--color-paper-faint)]">{tier.unit}</span>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[var(--color-paper-dim)]">
                    <span className="mt-[3px] text-[var(--color-sage)]">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={contact.phoneHref}
                className={`mt-8 text-center py-3 text-xs uppercase tracking-[0.2em] transition-colors ${
                  tier.highlighted
                    ? "bg-[var(--color-sage)] text-[var(--color-ink)] hover:bg-[var(--color-paper)]"
                    : "border border-[var(--color-hairline)] text-[var(--color-paper)] hover:border-[var(--color-sage)] hover:text-[var(--color-sage)]"
                }`}
              >
                Enquire to reserve
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-[var(--color-paper-faint)]">
          Rates shown per night, subject to season. No booking platform commission — reserve directly.
        </p>
      </div>
    </section>
  );
}
