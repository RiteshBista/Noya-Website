import { contact } from "../data/site";

const MAP_QUERY = "NOYA, 327 Gairidhara Rd, Kathmandu 44600, Nepal";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY
)}&z=16&output=embed`;
const MAP_DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  MAP_QUERY
)}`;

export default function Location() {
  return (
    <section className="relative bg-[var(--color-ink)] border-t border-[var(--color-hairline)] px-6 md:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">Find Us</span>
            <h2 className="mt-4 font-display italic text-[clamp(28px,4.5vw,44px)] leading-[1.1] text-[var(--color-paper)]">
              Gairidhara, Kathmandu
            </h2>
          </div>
          <a
            href={MAP_DIRECTIONS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 border border-[var(--color-hairline)] text-[var(--color-paper-dim)] px-6 py-3 text-xs uppercase tracking-[0.22em] hover:text-[var(--color-ink)] hover:bg-[var(--color-sage)] hover:border-[var(--color-sage)] transition-colors"
          >
            Get directions &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-px bg-[var(--color-hairline)] border border-[var(--color-hairline)]">
          <div className="relative bg-[var(--color-panel)] aspect-[4/3] md:aspect-auto md:min-h-[380px] grayscale-[0.4] contrast-[1.05] hover:grayscale-0 transition-[filter] duration-500">
            <iframe
              title="NOYA location map"
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          <div className="bg-[var(--color-panel)] p-8 md:p-10 flex flex-col justify-center">
            <span className="eyebrow">Address</span>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-paper-dim)]">
              {contact.address}
            </p>

            <span className="eyebrow mt-8 block">Reservations</span>
            <p className="mt-4 text-sm text-[var(--color-paper-dim)]">
              <a
                href={contact.phoneHref}
                className="hover:text-[var(--color-sage)] transition-colors"
              >
                {contact.phone}
              </a>
            </p>

            <span className="eyebrow mt-8 block">Arrival</span>
            <p className="mt-4 text-sm text-[var(--color-paper-dim)]">
              Check-in {contact.checkIn} &nbsp;/&nbsp; Check-out {contact.checkOut}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
