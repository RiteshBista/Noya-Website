import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";

/**
 * Light closing band for the partner pages (Restaurant, Local Artisan,
 * Travel & Tour): "[partner] at NOYA", then the partner's own links. Same
 * warm white, hairline and type as ReserveCta, but it promotes the partner
 * rather than a reservation, so it keeps its own layout and outbound links.
 *
 * The partner logos are self-contained tiles with their own backgrounds
 * (beige, black, red), so they are shown as supplied, unfiltered, in a
 * hairline frame. The NOYA wordmark is the black original the header uses.
 */
export default function PartnerCta({
  id,
  logo,
  heading,
  headingClassName = "max-w-[20ch]",
  description,
  links,
  divider = true,
}: {
  id?: string;
  logo: { src: string; alt: string; sizes?: string; frameClassName: string };
  heading: ReactNode;
  /** Width of the heading: a ~20-character measure by default, which balances
   * the longer partner names over two lines. */
  headingClassName?: string;
  description: ReactNode;
  links: { label: string; href: string }[];
  /** Hairline at the top; turn off when the section above has its own border. */
  divider?: boolean;
}) {
  return (
    <section id={id} className="relative bg-[var(--color-background)] px-6 md:px-10 text-center">
      <div className={`mx-auto max-w-page py-section ${divider ? "border-t border-[var(--color-divider)]" : ""}`}>
        {/* One lockup on a single line: the partner's own mark, "at", then
            the NOYA wordmark, rather than three stacked identity marks. */}
        <div className="flex items-center justify-center gap-5 md:gap-6">
          <div className={`shrink-0 overflow-hidden border border-[var(--color-border)] ${logo.frameClassName}`}>
            <ResponsiveImage
              src={logo.src} sizes={logo.sizes}
              alt={logo.alt}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-display-italic text-title text-[var(--color-text-muted)]">at</span>
          <Link to="/" aria-label="NOYA home" className="inline-flex h-7 md:h-8 items-center">
            <ResponsiveImage
              src="/images/noya_logo.png" sizes="120px"
              alt="NOYA"
              className="h-full w-auto object-contain"
            />
          </Link>
        </div>

        <h2 className={`mt-10 font-display mx-auto ${headingClassName} text-heading-lg text-[var(--color-text)]`}>
          {heading}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-body text-[var(--color-text-secondary)]">
          {description}
        </p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-button uppercase text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                <span className="border-b border-[var(--color-border)] pb-1 transition-colors duration-300 group-hover:border-current">{link.label}</span>
                <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
