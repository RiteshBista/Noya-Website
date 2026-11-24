import { Link, NavLink } from "react-router-dom";
import { contact, social } from "../data/site";

import ResponsiveImage from "./ResponsiveImage";
import SolidCta from "./SolidCta";

/**
 * Closing page band in the deepest brand green, with warm ivory type: the
 * one place the green is used as a ground rather than an accent.
 *
 * Desktop: brand · two link groups · Visit, then one legal row.
 * Phones: brand, then Visit (contact and Reserve before the link lists),
 * then the two link groups side by side.
 */

const linkGroups = [
  {
    heading: "The House",
    links: [
      { label: "About", href: "/about" },
      { label: "Hotel", href: "/hotel" },
      { label: "Rooms", href: "/rooms" },
      { label: "Restaurant", href: "/restaurant" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Discover NOYA", href: "/discover" },
      { label: "Art", href: "/art" },
      { label: "History", href: "/history" },
      { label: "Heritage", href: "/heritage" },
      { label: "Local Artisan", href: "/local-artisan" },
      { label: "Travel & Tour", href: "/travel-tour" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

// Same destination as the "Get directions" link in Location.tsx.
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "NOYA, 327 Gairidhara Road, Kathmandu 44600, Nepal",
)}`;

const linkCls =
  "inline-block py-1 text-small text-[var(--color-text-on-green-secondary)] hover:text-[var(--color-text-on-green)] transition-colors duration-200";

const NewTab = () => <span className="sr-only"> (opens in a new tab)</span>;

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-background-footer)] text-[var(--color-text-on-green)] px-6 md:px-10">
      <div className="mx-auto max-w-page grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-14 pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Brand */}
        <div className="col-span-2 md:col-span-12 lg:col-span-4">
          <Link to="/" aria-label="NOYA home" className="inline-block">
            <ResponsiveImage
              src="/images/noya-logo.png" sizes="112px"
              alt="NOYA"
              className="h-7 w-auto"
            />
          </Link>
          <p className="mt-8 max-w-[22ch] font-display text-title text-[var(--color-text-on-green)]">
            A mid-18th-century house in Gairidhara, restored rather than renovated.
          </p>
          <p className="mt-4 max-w-[36ch] text-small text-[var(--color-text-on-green-secondary)]">
            Six individually restored rooms and Beirut, a Lebanese restaurant, held together in the same space — NOYA.
          </p>

          <ul className="mt-8 flex items-center gap-3" aria-label="NOYA on social media">
            <li>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram, ${social.instagramHandle} (opens in a new tab)`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-divider-on-green)] text-[var(--color-text-on-green-secondary)] hover:border-[var(--color-text-on-green-secondary)] hover:text-[var(--color-text-on-green)] transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="3.75" />
                  <circle cx="17.1" cy="6.9" r="0.6" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={social.facebook327}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook (opens in a new tab)"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-divider-on-green)] text-[var(--color-text-on-green-secondary)] hover:border-[var(--color-text-on-green-secondary)] hover:text-[var(--color-text-on-green)] transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13.75 21.5v-8h2.9l.45-3.4h-3.35V8c0-1 .3-1.65 1.7-1.65h1.8V3.3a24 24 0 0 0-2.6-.13c-2.6 0-4.35 1.6-4.35 4.5v2.43H7.4v3.4h2.9v8" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Link groups */}
        {linkGroups.map((group, i) => (
          <nav
            key={group.heading}
            aria-labelledby={`footer-${i}`}
            className={`order-3 md:order-none col-span-1 md:col-span-3 lg:col-span-2 ${i === 0 ? "lg:col-start-6" : ""}`}
          >
            <h2 id={`footer-${i}`} className="eyebrow text-[var(--color-text-on-green-label)]">{group.heading}</h2>
            <ul className="mt-5 flex flex-col gap-1.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    end
                    className={({ isActive }) =>
                      `${linkCls} ${isActive ? "!text-[var(--color-text-on-green)] underline decoration-1 underline-offset-[5px]" : ""}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Visit */}
        <div className="order-2 md:order-none col-span-2 md:col-span-6 lg:col-span-3 lg:col-start-10">
          <h2 className="eyebrow text-[var(--color-text-on-green-label)]">Visit</h2>
          <address className="mt-5 not-italic text-small text-[var(--color-text-on-green)] max-w-[24ch]">
            {contact.address}
          </address>
          <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={`${linkCls} mt-1`}>
            Get directions <span aria-hidden="true">&#8599;</span>
            <NewTab />
          </a>

          <ul className="mt-4 flex flex-col gap-1.5">
            <li>
              <a href={contact.phoneHref} className={linkCls}>{contact.phone}</a>
            </li>
            <li>
              <a href={contact.emailHref} className={linkCls}>{contact.email}</a>
            </li>
          </ul>

          <p className="mt-4 text-small text-[var(--color-text-on-green-secondary)]">
            Check-in {contact.checkIn} <span aria-hidden="true">&middot;</span> Check-out {contact.checkOut}
          </p>

          <SolidCta to="/reserve" className="mt-8" showArrow={false}>
            Book a Stay
          </SolidCta>
        </div>
      </div>

      {/* Legal */}
      <div className="mx-auto max-w-page border-t border-[var(--color-divider-on-green)] py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-caption text-[var(--color-text-on-green-secondary)]">
        <p>
          Copyright &copy; {new Date().getFullYear()} — Powered by{" "}
          <a
            href="https://amplify.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--color-brass-on-green)] underline-offset-4 hover:text-[var(--color-text-on-green)] hover:underline transition-colors duration-200"
          >
            Amplify Digital
            <NewTab />
          </a>
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link to={link.href} className="inline-block py-1 hover:text-[var(--color-text-on-green)] transition-colors duration-200">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
