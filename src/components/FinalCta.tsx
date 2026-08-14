import { contact } from "../data/site";

const marqueeText = "18TH-CENTURY RESTORATION · GAIRIDHARA, KATHMANDU · SLOW HOSPITALITY · ";

export default function FinalCta() {
  return (
    <section className="relative bg-[var(--color-ink-2)] overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 bottom-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-[100px] opacity-20"
        style={{ backgroundColor: "var(--color-sage)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 md:px-10 py-28 md:py-40 text-center">
        <span className="eyebrow">Ready When You Are</span>
        <h2 className="mt-6 font-sans font-light text-[clamp(28px,5vw,48px)] leading-[1.1] text-[var(--color-paper)]">
          Ready to stay?
        </h2>
        <h2 className="font-display text-[clamp(34px,6.5vw,64px)] leading-[1.1] text-[var(--color-sage)]">
          Or still reading the reviews?
        </h2>

        <a
          href={contact.phoneHref}
          className="mt-10 inline-block bg-[var(--color-sage)] text-[var(--color-ink)] px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium hover:bg-[var(--color-paper)] transition-colors"
        >
          Call to reserve &rarr;
        </a>
      </div>

      <div className="relative z-10 border-t border-[var(--color-hairline-2)] py-5 overflow-hidden">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-2xl md:text-3xl text-[var(--color-paper-faint)] pr-8 whitespace-nowrap"
            >
              {marqueeText.repeat(4)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
