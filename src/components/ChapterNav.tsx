import { Link } from "react-router-dom";

/**
 * Cross-links Art, History, and Heritage as three chapters of one NOYA
 * story rather than three unrelated pages. Rendered near the bottom of
 * each of those three pages, always omitting the current page.
 */
const chapters = [
  { label: "Art", href: "/art", mark: "I" },
  { label: "History", href: "/history", mark: "II" },
  { label: "Heritage", href: "/heritage", mark: "III" },
] as const;

export default function ChapterNav({ current }: { current: "Art" | "History" | "Heritage" }) {
  const others = chapters.filter((c) => c.label !== current);

  return (
    <section className="relative bg-[var(--color-background-secondary)] border-t border-[var(--color-border)] px-6 md:px-10 py-16 md:py-20">
      <div className="mx-auto max-w-editorial">
        <span className="eyebrow">Art &middot; History &middot; Heritage</span>
        <p className="mt-4 max-w-xl text-small text-[var(--color-text-secondary)]">
          Three chapters of one story: the valley, and the house within it.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          {others.map((c) => (
            <Link
              key={c.href}
              to={c.href}
              className="group flex items-center gap-4 border border-[var(--color-border)] px-6 py-5 hover:border-[var(--color-primary)] transition-colors"
            >
              <span className="font-display text-lg text-[var(--color-text-muted)]">{c.mark}</span>
              <span className="flex-1 font-display text-title text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                {c.label}
              </span>
              <span
                aria-hidden="true"
                className="text-[var(--color-text-secondary)] transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-[var(--color-primary)]"
              >
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
