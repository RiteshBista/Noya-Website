import { contact } from "../data/site";
import ReserveCta from "./ReserveCta";

const marqueeText = "AN 18TH-CENTURY HOUSE, RESTORED · GAIRIDHARA, KATHMANDU · ART · HISTORY · HERITAGE · ";

/**
 * Home's closing band: the shared light ReserveCta (keeping Home's own
 * two-line question and its phone action), then the marquee as a quiet
 * strip in faint type before the green footer.
 */
export default function FinalCta() {
  return (
    <>
      <ReserveCta
        heading={
          <>
            <span className="block">Ready to stay?</span>
            <span className="block">Or still exploring the house?</span>
          </>
        }
        action={{ label: "Book a Stay", href: contact.phoneHref }}
      />

      <div className="relative bg-[var(--color-background)] border-t border-[var(--color-divider)] py-6 overflow-hidden">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              className="font-display-italic text-heading leading-none text-[var(--color-text-muted)] pr-8 whitespace-nowrap"
            >
              {marqueeText.repeat(4)}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
