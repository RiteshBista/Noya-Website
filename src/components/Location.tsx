import { Link } from "react-router-dom";
import ArrowLink from "./ArrowLink";
import { contact } from "../data/site";

const MAP_QUERY = "NOYA, 327 Gairidhara Road, Kathmandu 44600, Nepal";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY
)}&z=16&output=embed`;
const MAP_DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  MAP_QUERY
)}`;

export default function Location({
  title = "Gairidhara, Kathmandu",
}: {
  /** Section heading; defaults to the address line used on Home. */
  title?: string;
} = {}) {
  return (
    <section className="relative bg-background border-t border-border px-6 md:px-10 py-section">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">Find Us</span>
            <h2 className="mt-4 font-display text-heading text-text">
              {title}
            </h2>
            <p className="mt-6 max-w-md text-body text-text-secondary">
              With Hadigaun and Bishalnagar just beyond it:{" "}
              <Link to="/heritage#neighbourhood" className="underline hover:text-primary transition-colors">
                more on the neighbourhood
              </Link>
              .
            </p>
          </div>
          <ArrowLink
            href={MAP_DIRECTIONS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            Get directions
          </ArrowLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-px bg-border border border-border">
          {/* Google's embed iframe renders its own control icons (zoom,
              search) as a bitmap font inside the frame. Applying a CSS
              `filter` (e.g. grayscale) to an ancestor of a cross-origin
              iframe forces Chrome into a software compositing path for that
              iframe, which corrupts those icon glyphs — the stray "("
              artifact reported in the map controls. To desaturate the map
              without touching the iframe's own rendering, two plain
              (non-filter) overlay layers sit on top of it instead and pull
              its colour toward the site's neutral cream/grey via
              mix-blend-mode, which composites only the already-rendered
              pixels and never triggers that bug. isolate scopes the blend
              to this stacking context so it can't bleed onto the page
              behind it; pointer-events-none keeps the map itself
              interactive (pan/zoom/click) under the overlays. */}
          <div className="group relative isolate bg-surface aspect-4/3 md:aspect-auto md:min-h-95 overflow-hidden">
            <iframe
              title="NOYA location map"
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 pointer-events-none mix-blend-saturation bg-[#8c8b81] opacity-90 transition-opacity duration-500 group-hover:opacity-0"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply bg-background-secondary opacity-35 transition-opacity duration-500 group-hover:opacity-0"
            />
          </div>

          <div className="bg-surface p-8 md:p-10 flex flex-col justify-center">
            <span className="eyebrow">Address</span>
            <p className="mt-4 text-small text-text-secondary">
              {contact.address}
            </p>

            <span className="eyebrow mt-8 block">Reservations</span>
            <p className="mt-4 text-small text-text-secondary">
              <a
                href={contact.phoneHref}
                className="hover:text-primary transition-colors"
              >
                {contact.phone}
              </a>
            </p>

            <span className="eyebrow mt-8 block">Arrival</span>
            <p className="mt-4 text-small text-text-secondary">
              Check-in {contact.checkIn} &nbsp;/&nbsp; Check-out {contact.checkOut}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
