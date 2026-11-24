import { Link } from "react-router-dom";
import type { ReactNode } from "react";

/**
 * NOYA's secondary CTA language — "Explore →", underline on hover, arrow
 * nudging right — replacing the site's old 1px rectangular outline-box
 * button (border + fill-on-hover), which read closer to a generic
 * Webflow/hotel template than the rest of the design system. Used for
 * every secondary action; the solid green button (see index.css /
 * `.btn-solid`-style usages) stays reserved for primary actions like
 * Reserve.
 *
 * Renders a router `<Link>` when `to` is given, or a plain `<a>` when
 * `href` is given (external links, mailto/tel, etc.) — exactly one of the
 * two should be passed.
 */
export default function ArrowLink({
  to,
  href,
  children,
  className = "",
  tone = "default",
  target,
  rel,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  /** "default" — near-black text on a light section. "muted" — starts at
   * the softer secondary text color (for links embedded inline in body
   * copy or paired with a bolder sibling heading). "onDark" — for use
   * inside a dark section (Guestbook, FinalCta, etc.). "primary" — the
   * brand green, for a link closing an editorial text block. */
  tone?: "default" | "muted" | "onDark" | "primary";
  target?: string;
  rel?: string;
}) {
  const toneClass =
    tone === "onDark"
      ? "text-[var(--color-text-on-dark)] hover:text-[var(--color-primary-on-dark)]"
      : tone === "muted"
        ? "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
        : tone === "primary"
          ? "text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          : "text-[var(--color-text)] hover:text-[var(--color-primary)]";

  // The text box is only ~19px tall; the invisible ::before extends the
  // tap area to ~39px (WCAG 2.5.8 asks for 24px) without changing layout.
  const cls = `group relative inline-flex items-center gap-2 text-button uppercase transition-colors duration-200 before:absolute before:inset-x-0 before:-inset-y-2.5 before:content-[''] ${toneClass} ${className}`;

  const inner = (
    <>
      <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-current">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} target={target} rel={rel}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} className={cls} target={target} rel={rel}>
      {inner}
    </a>
  );
}
