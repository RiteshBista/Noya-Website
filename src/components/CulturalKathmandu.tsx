import { culturalKathmandu } from "../data/site";
import ResponsiveImage from "./ResponsiveImage";

/**
 * "Kathmandu, In Season" — situates NOYA within the valley's recurring
 * festival calendar (Indra Jatra, Khat Jatra) without claiming NOYA hosts,
 * films, or otherwise participates in either. The photographs are openly
 * licensed ones from Wikimedia Commons, not NOYA's own and not AI-generated,
 * each credited on its card (author, licence, source) as its licence asks.
 *
 * Two equal columns from md, tops aligned: a hairline, then a 3:2 photograph,
 * the title, the text and the credit. Stacked on phones.
 *
 * From lg the whole section is sized to fit one screen under the header
 * (1440×900 and similar): the intro sits beside the heading, and the
 * padding and photograph height follow the viewport height (svh), so
 * shorter laptops tighten too. Tablets and phones keep the natural,
 * scrolling layout.
 */
export default function CulturalKathmandu() {
  return (
    <section id="culture" className="relative bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section lg:py-[clamp(2.25rem,6.5svh,4rem)] px-6 md:px-10">
      <div className="mx-auto max-w-page">
        {/* The same two columns and gap as the photographs below (from lg), so
            the intro starts and ends exactly on the right-hand photograph. */}
        <div className="lg:grid lg:grid-cols-2 lg:items-end lg:gap-x-14">
          <div className="max-w-xl">
            <span className="eyebrow">{culturalKathmandu.eyebrow}</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              {culturalKathmandu.title}
            </h2>
          </div>
          <p className="mt-6 lg:mt-0 max-w-xl lg:max-w-none text-body text-justify hyphens-none text-[var(--color-text-secondary)]">
            {culturalKathmandu.intro}
          </p>
        </div>

        <div className="mt-14 lg:mt-10 grid grid-cols-1 md:grid-cols-2 items-start gap-12 md:gap-8 lg:gap-14">
          {culturalKathmandu.events.map((event) => (
            <figure key={event.name} className="m-0 border-t border-[var(--color-border)] pt-6 lg:pt-5">
              <div className="relative aspect-[3/2] lg:aspect-auto lg:h-[clamp(220px,31svh,300px)] overflow-hidden bg-[var(--color-surface)]">
                <ResponsiveImage
                  src={event.image}
                  sizes="(min-width: 1100px) 523px, (min-width: 768px) 46vw, 100vw"
                  coverAspect={3 / 2}
                  alt={event.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: event.imagePosition }}
                />
              </div>
              <h3 className="mt-6 lg:mt-5 font-display text-title text-[var(--color-text)]">{event.name}</h3>
              <p className="mt-3 lg:mt-2 text-body text-[var(--color-text-secondary)]">
                {event.body}
              </p>
              <figcaption className="mt-4 lg:mt-3 text-caption text-[var(--color-text-muted)]">
                Photo:{" "}
                <a href={event.credit.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--color-primary)] transition-colors">
                  {event.credit.author}
                </a>
                ,{" "}
                <a href={event.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--color-primary)] transition-colors">
                  {event.credit.license}
                </a>
                , via Wikimedia Commons
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
