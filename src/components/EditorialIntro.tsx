import type { ReactNode } from "react";

/**
 * A text-led section set as an editorial spread rather than a narrow
 * centred column: the eyebrow and heading hold the left five columns, the
 * copy reads in the right seven, every paragraph in the one body style (no
 * first-paragraph lead: a group of paragraphs reads as one voice).
 * Stacks on phones. For opening a page under its hero, or any section that
 * is mostly words.
 *
 * `columns="4/8"` instead sets it on the About founder section's grid (a
 * 4/8 split from md, the copy column inset past a 1px rule by pl-16), so a
 * section continuing that one starts its text on the same vertical line.
 */
export default function EditorialIntro({
  id,
  eyebrow,
  title,
  children,
  tone = "default",
  followOn = false,
  columns = "5/7",
  aside,
  className = "",
}: {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Paragraphs (and any closing link), all set as body copy. */
  children: ReactNode;
  tone?: "default" | "secondary";
  /** Directly continues a same-background section above: short top step
   * (see --spacing-section-follow) instead of full padding. */
  followOn?: boolean;
  /** Column split: the default 5/7 spread, or the founder section's 4/8 grid. */
  columns?: "5/7" | "4/8";
  /** Optional element (e.g. a photograph) under the heading in the left
   * column, so the column isn't left empty beside a long text. */
  aside?: ReactNode;
  className?: string;
}) {
  const founderGrid = columns === "4/8";
  return (
    <section
      id={id}
      className={`relative ${
        tone === "secondary" ? "bg-[var(--color-background-secondary)]" : "bg-[var(--color-background)]"
      } ${followOn ? "pt-section-follow pb-section" : "py-section"} px-6 md:px-10 ${className}`}
    >
      <div
        className={
          founderGrid
            ? "mx-auto max-w-page grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-16"
            : "mx-auto max-w-page grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-8"
        }
      >
        <div className={founderGrid ? "md:col-span-4" : "lg:col-span-5"}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className={`${eyebrow ? "mt-5 " : ""}font-display text-heading-lg text-[var(--color-text)] max-w-[15ch]`}>{title}</h2>
          {aside && <div className="mt-10">{aside}</div>}
        </div>
        <div
          className={
            founderGrid
              ? // The founder copy column's own box: its 1px rule (kept
                // transparent here, so no line is drawn) and pl-16 inset.
                "md:col-span-8 md:border-l md:border-transparent md:pl-16 lg:pt-10 [&>p]:max-w-2xl [&>p]:text-body [&>p]:text-[var(--color-text-secondary)] [&>p+p]:mt-4"
              : "lg:col-span-7 max-w-[44rem] lg:pt-10 [&>p]:text-body [&>p]:text-[var(--color-text-secondary)] [&>p+p]:mt-4"
          }
        >
          {children}
        </div>
      </div>
    </section>
  );
}
