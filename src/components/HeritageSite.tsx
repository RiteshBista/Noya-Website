/**
 * Text-led "field note" entry for a place beyond NOYA itself — Kathmandu
 * Durbar Square, Patan, Bhaktapur, Swayambhunath, and so on. Deliberately
 * carries no photograph: none of these external sites have NOYA-owned or
 * rights-cleared photography in the project (see `externalMediaManifest`
 * in data/media.ts), so the typographic treatment — number, name,
 * location, a hairline rule — stands in for an image rather than reaching
 * for unlicensed/scraped photography. Used on both the Art page
 * ("Art Around Kathmandu") and the Heritage page (the fuller site
 * profiles), each passing its own distinctly-angled copy.
 */
export default function HeritageSite({
  mark,
  name,
  location,
  body,
}: {
  mark?: string;
  name: string;
  location: string;
  body: string;
}) {
  return (
    <div className="border-t border-[var(--color-border)] pt-8 md:pt-10">
      <div className="flex items-baseline gap-4 md:gap-6">
        {mark && (
          <span className="shrink-0 font-display text-xl md:text-2xl text-[var(--color-primary)]">
            {mark}
          </span>
        )}
        <div>
          <h3 className="font-display text-title text-[var(--color-text)]">{name}</h3>
          <p className="mt-1 eyebrow text-[var(--color-text-secondary)]">{location}</p>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-body text-[var(--color-text-secondary)]">{body}</p>
    </div>
  );
}
