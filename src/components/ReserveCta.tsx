import type { ReactNode } from "react";
import SolidCta from "./SolidCta";

/**
 * Light closing reservation band, shared by every page that ends on a
 * reservation or enquiry CTA. Warm white, so the page closes light and the
 * green footer below is the one strong colour change. A hairline marks the
 * start when the section above shares the background; pass
 * `divider={false}` when it already ends on its own border or tone.
 * Pages may keep their own eyebrow, supporting line and action (e.g. Home's
 * "Call to reserve" phone link); the default action is Reserve → /reserve.
 */
export default function ReserveCta({
  heading,
  id,
  eyebrow = "Ready When You Are",
  action = { label: "Book a Stay", to: "/reserve" },
  divider = true,
  children,
}: {
  heading: ReactNode;
  id?: string;
  eyebrow?: string;
  action?: { label: string; to?: string; href?: string };
  divider?: boolean;
  /** Optional supporting line between the heading and the button. */
  children?: ReactNode;
}) {
  return (
    <section id={id} className="relative bg-[var(--color-background)] px-6 md:px-10 text-center">
      <div className={`mx-auto max-w-page py-section ${divider ? "border-t border-[var(--color-divider)]" : ""}`}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-6 font-display text-heading-lg text-[var(--color-text)]">
          {heading}
        </h2>
        {children && (
          <p className="mx-auto mt-5 max-w-xl text-body text-[var(--color-text-secondary)]">
            {children}
          </p>
        )}
        <SolidCta to={action.to} href={action.href} showArrow={action.label !== "Book a Stay"} className="mt-10">
          {action.label}
        </SolidCta>
      </div>
    </section>
  );
}
