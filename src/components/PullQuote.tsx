/**
 * A large editorial pull-quote — used to break up the longer-form prose on
 * Art/History/Heritage without resorting to a repeated card grid. Every
 * current usage sits on the site's light background, so `theme` now
 * defaults to (and in practice always resolves to) "light" — the "dark"
 * branch is kept only in case a future dark accent section ever needs this
 * component again.
 */
export default function PullQuote({
  quote,
  attribution,
  theme = "light",
}: {
  quote: string;
  attribution?: string;
  theme?: "dark" | "light";
}) {
  const isDark = theme === "dark";
  return (
    <blockquote
      className={`max-w-2xl border-l-2 pl-6 md:pl-8 ${
        isDark ? "border-[var(--color-text-on-dark)]" : "border-[var(--color-primary)]"
      }`}
    >
      <p
        className={`font-display text-title leading-snug ${
          isDark ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-text)]"
        }`}
      >
        &ldquo;{quote}&rdquo;
      </p>
      {attribution && (
        <footer className={`mt-4 eyebrow ${isDark ? "text-[var(--color-text-on-dark-secondary)]" : ""}`}>
          {attribution}
        </footer>
      )}
    </blockquote>
  );
}
