import { Link } from "react-router-dom";
import type { ReactNode } from "react";

/**
 * NOYA's one primary-action button — the solid green fill, reserved for
 * Reserve / Send an Enquiry / Call to Reserve. The fill and color
 * transition are unchanged from before; this adds the same quiet
 * secondary cue as `ArrowLink` — the arrow nudges right on hover —
 * instead of a rounded/scaled/bouncing button treatment.
 */
export default function SolidCta({
  to,
  href,
  type,
  onClick,
  children,
  className = "",
  target,
  rel,
  current = false,
  size = "md",
  showArrow = true,
}: {
  to?: string;
  href?: string;
  type?: "submit" | "button";
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  /** The link points at the page being viewed: exposes aria-current for
   * assistive tech, with no visual change (no underline on the label). */
  current?: boolean;
  /** "md" (56px) for page actions; "sm" (40px) for the header and hero. Set
   * here rather than with padding classes, which would compete with these. */
  size?: "sm" | "md";
  showArrow?: boolean;
}) {
  const pad = size === "sm" ? "px-5 py-3" : "px-8 py-4";
  const cls = `group inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-[var(--color-text-on-dark)] ${pad} text-button ${children === "Book a Stay" ? "normal-case" : "uppercase"} font-medium transition-colors duration-200 hover:bg-[var(--color-primary-hover)] ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      {showArrow && <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
      >
        &rarr;
      </span>}
    </>
  );

  if (type) {
    return (
      <button type={type} onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  }

  if (to) {
    return (
      <Link to={to} className={cls} aria-current={current ? "page" : undefined}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} target={target} rel={rel} className={cls}>
      {inner}
    </a>
  );
}
