/**
 * A single, restrained architectural mark — two hairlines flanking a small
 * diamond, in the proportion of a carved window mullion cross found in
 * Kathmandu Valley woodwork. Used as a quiet chapter/section separator in a
 * handful of places (About's founder section, a couple of chapter
 * transitions) rather than as a design element repeated everywhere —
 * intentionally too plain to read as "ethnic pattern" or a cultural-tourism
 * graphic, closer to something a visitor might notice on a doorframe and
 * not immediately clock as decoration.
 */
export default function Motif({
  tone = "default",
  className = "",
}: {
  tone?: "default" | "onDark";
  className?: string;
}) {
  const colorClass =
    tone === "onDark" ? "text-[var(--color-border-dark)]" : "text-[var(--color-border)]";

  return (
    <svg
      width="72"
      height="16"
      viewBox="0 0 72 16"
      fill="none"
      aria-hidden="true"
      className={`${colorClass} ${className}`}
    >
      <line x1="0" y1="8" x2="27" y2="8" stroke="currentColor" strokeWidth="1" />
      <rect
        x="32"
        y="3"
        width="8"
        height="8"
        stroke="currentColor"
        strokeWidth="1"
        transform="rotate(45 36 8)"
      />
      <line x1="45" y1="8" x2="72" y2="8" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
