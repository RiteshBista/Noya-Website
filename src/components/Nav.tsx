import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navEntries } from "../data/site";
import SolidCta from "./SolidCta";
import ResponsiveImage from "./ResponsiveImage";

const ease = [0.16, 1, 0.3, 1] as const;

/** Real pages a panel entry covers: its own href plus every hash-free link
 * inside it (hash links like "/#culture" point into other pages, so they
 * must never mark the panel as the current section). */
const panelPaths = (entry: Extract<(typeof navEntries)[number], { type: "panel" }>) => [
  entry.href,
  ...entry.groups.flatMap((g) => g.links.map((l) => l.href)).filter((href) => !href.includes("#")),
];

// Underline grows from center on hover — the same quiet, editorial cue the
// mega-panel's own links already use (see the arrow that slides in beside
// them below), brought up to the flat top-level nav links so both read as
// one quality level rather than the panel feeling more considered than the
// nav bar around it.
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-serif relative whitespace-nowrap pb-1 transition-colors duration-200 after:absolute after:left-1/2 after:bottom-0 after:h-px after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 after:ease-out hover:after:w-full ${
    isActive ? "text-[var(--color-primary)] after:w-full" : "text-[var(--color-text)]"
  } hover:text-[var(--color-primary)]`;

/** Id-safe form of a menu label ("Travel & Tour" -> "travel-tour"), for the
 * mobile accordion ids that aria-controls points at: an id with spaces would
 * be read as several ids. */
const groupSlug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type PanelLink = { label: string; href: string };

/** A mega-panel's link list: small label, then serif links between
 * hairlines, each with an arrow at the far right. Shared by every panel. */
function PanelList({
  heading,
  links,
  current,
  onNavigate,
}: {
  heading?: string;
  links: PanelLink[];
  current: (href: string) => boolean;
  onNavigate: () => void;
}) {
  return (
    <div className="border-x border-[var(--color-border)] px-10 2xl:px-14">
      {heading && <span className="eyebrow text-[var(--color-text-muted)]">{heading}</span>}
      <ul className="mt-6 border-t border-[var(--color-border)]">
        {links.map((link) => (
          <li key={link.href} className="border-b border-[var(--color-border)]">
            <Link
              to={link.href}
              aria-current={current(link.href) ? "page" : undefined}
              className={`group flex items-center justify-between gap-4 py-5 nav-serif text-[clamp(1.25rem,1.45vw,1.5rem)] leading-tight transition-colors duration-200 hover:text-[var(--color-primary)] ${
                current(link.href) ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"
              }`}
              onClick={onNavigate}
            >
              {link.label}
              <span aria-hidden="true" className="shrink-0 text-sm text-[var(--color-text-muted)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-primary)]">
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A mega-panel's call to action: olive, uppercase, arrow nudging right. */
function PanelCta({
  cta,
  onNavigate,
  className = "",
}: {
  cta: PanelLink;
  onNavigate: () => void;
  className?: string;
}) {
  return (
    <Link
      to={cta.href}
      className={`group inline-flex w-fit items-center gap-2 text-button uppercase text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors ${className}`}
      onClick={onNavigate}
    >
      {cta.label}
      <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
        &rarr;
      </span>
    </Link>
  );
}

/**
 * Primary navigation — the previous flat eight-item structure (Discover,
 * About, Hotel, Rooms, Events, Restaurant, Local Artisan, Travel & Tour),
 * restored as independent top-level destinations. Discover is the one entry
 * that still opens the editorial mega-panel (desktop hover/click, or an
 * accordion group in the mobile overlay); the rest render as plain links —
 * see `navEntries` in data/site.ts. The panel/dialog implementation itself
 * (interaction, animation, accessibility) is unchanged from before.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The navbar now sits in normal document flow (sticky, not fixed/overlay),
  // so every immersive hero needs to know exactly how tall it is to fill the
  // rest of the viewport beneath it (see `.hero-viewport` in index.css).
  // Rather than hardcoding that height in multiple places, measure the real
  // rendered header — which can vary slightly by breakpoint/font metrics —
  // and publish it once as `--nav-height` on the root element. `useLayoutEffect`
  // so it's set before first paint, and a `ResizeObserver` keeps it correct
  // across breakpoint changes without a resize listener.
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setNavHeight = () => {
      document.documentElement.style.setProperty(
        "--nav-height",
        `${el.getBoundingClientRect().height}px`,
      );
    };
    setNavHeight();
    const ro = new ResizeObserver(setNavHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenCategory(null);
    setOpenMobileGroup(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the full-screen mobile menu on Escape, returning focus to the menu
  // button (the menu's own links unmount as it closes). The listener exists
  // only while the menu is open.
  useEffect(() => {
    if (!mobileOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Close the open mega-panel on Escape or a click outside the header —
  // hover already closes it on mouse-leave; this covers keyboard and touch.
  useEffect(() => {
    if (!openCategory) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCategory(null);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenCategory(null);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [openCategory]);

  // A short delay on mouse-leave so moving diagonally from the trigger into
  // the panel doesn't momentarily close it — cleared on re-entry.
  const scheduleClose = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpenCategory((c) => (c === label ? null : c));
    }, 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  return (
    <>
      {/* =========================================================
          DESKTOP NAVBAR
      ========================================================= */}
      <motion.header
        ref={headerRef}
        className={`sticky top-0 inset-x-0 z-50 flex items-center justify-between gap-4 px-6 md:px-8 py-3.5 xl:py-4 border-b transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-background)]/95 backdrop-blur-md border-[var(--color-border)] shadow-sm"
            : "bg-[var(--color-background)] border-[var(--color-border)]"
        }`}
        // No entrance delay: the header carries the site's navigation, so it
        // must be in place by the time the first-load Loader fades (and is
        // simply static for visitors who prefer reduced motion).
        initial={reducedMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        {/* =====================================================
            LOGO
        ===================================================== */}
        <Link to="/" className="shrink-0" aria-label="NOYA home">
          <ResponsiveImage
            src="/images/noya_logo.png" sizes="120px"
            alt="NOYA"
            // Wordmark height only (width follows the 3:1 artwork): 24px on
            // phones, 28px on tablets, 32px on desktop — still inside the
            // header's existing height, so nothing below shifts.
            className="h-6 md:h-7 xl:h-8 w-auto object-contain"
          />
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION — eight top-level destinations;
            only "Discover" (type "panel") opens the mega-panel.
        ===================================================== */}
        <nav
          className="hidden xl:flex items-center gap-8 font-light text-nav"
          aria-label="Primary navigation"
        >
          {navEntries.map((entry) => {
            if (entry.type === "link") {
              return (
                <NavLink key={entry.href} to={entry.href} className={navLinkClass}>
                  {entry.label}
                </NavLink>
              );
            }

            const isOpen = openCategory === entry.label;
            // Active on /discover itself and on the pages its panel leads to
            // (Art, History, Heritage) — the same green + underline the plain
            // NavLinks use. aria-current is "page" only on the exact page.
            const isCurrentSection = panelPaths(entry).includes(location.pathname);

            return (
              <div
                key={entry.label}
                // `flex` (not a plain block) so the trigger is a flex item
                // exactly like the NavLink siblings — as an inline box in a
                // block it sat on the text baseline ~3px lower than them.
                className="relative flex items-center h-full"
                onMouseEnter={() => {
                  cancelClose();
                  setOpenCategory(entry.label);
                }}
                onMouseLeave={() => scheduleClose(entry.label)}
              >
                <Link
                  to={entry.href}
                  className={navLinkClass({ isActive: isOpen || isCurrentSection })}
                  aria-current={location.pathname === entry.href ? "page" : isCurrentSection ? "true" : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setOpenCategory(null)}
                  onFocus={() => {
                    cancelClose();
                    setOpenCategory(entry.label);
                  }}
                >
                  {entry.label}
                </Link>

                {/* =================================================
                    EDITORIAL MEGA-PANEL
                ================================================= */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="fixed left-0 right-0 top-(--nav-height) w-screen"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease }}
                      onMouseEnter={cancelClose}
                      onMouseLeave={() => scheduleClose(entry.label)}
                    >
                      {/* Three editorial columns divided by hairlines. Discover
                          (the panel whose links carry photographs): the story
                          of the house as image rows, an "Explore" list, the
                          featured house. Every other section: an intro, its
                          own sections, one large photograph. Full width with the header's own 32px
                          side padding, so the columns line up with the logo
                          and the Reserve button; scrolls inside itself on a
                          short window rather than running off screen. */}
                      <div className="w-full max-h-[calc(100svh-var(--nav-height))] overflow-y-auto bg-[var(--color-background)] border-t border-[var(--color-border)] border-b border-[var(--color-border)] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                        <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)_minmax(0,1.25fr)] px-8 py-12 2xl:py-14">
                          {(() => {
                            const story = entry.groups.find((g) => g.links.some((l) => l.image));
                            const listGroups = entry.groups.filter((g) => g !== story);
                            const listLinks = listGroups.flatMap((g) => g.links);
                            const listHeading = entry.listHeading ?? listGroups[0]?.heading;
                            const close = () => setOpenCategory(null);
                            const current = (href: string) => href === location.pathname;
                            const { feature } = entry;

                            // Discover: the story of the house as image rows | Explore | the
                            // featured house with its copy and CTA.
                            if (story) {
                              return (
                                <>
                                  <div className="pr-10 2xl:pr-14">
                                    {story.heading && (
                                      <span className="eyebrow text-[var(--color-text-muted)]">{story.heading}</span>
                                    )}
                                    <ul className="mt-6 flex flex-col gap-4 2xl:gap-5">
                                      {story.links.map((link) => (
                                        <li key={link.href}>
                                          <Link
                                            to={link.href}
                                            aria-current={current(link.href) ? "page" : undefined}
                                            className="group grid grid-cols-[minmax(0,min(64%,350px))_minmax(0,1fr)] items-center gap-6"
                                            onClick={close}
                                          >
                                            <div className="relative h-[clamp(110px,9vw,150px)] overflow-hidden bg-[var(--color-surface)]">
                                              {link.image && (
                                                <ResponsiveImage
                                                  src={link.image}
                                                  sizes="(min-width: 1760px) 340px, 22vw"
                                                  alt={link.imageAlt ?? ""}
                                                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                                  style={link.imagePosition ? { objectPosition: link.imagePosition } : undefined}
                                                />
                                              )}
                                            </div>
                                            <span
                                              className={`flex items-center justify-between gap-3 nav-serif text-[clamp(1.5rem,1.9vw,2rem)] leading-none transition-colors duration-200 group-hover:text-[var(--color-primary)] ${
                                                current(link.href) ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"
                                              }`}
                                            >
                                              {link.label}
                                              <span aria-hidden="true" className="text-base text-[var(--color-text-muted)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-primary)]">
                                                &rarr;
                                              </span>
                                            </span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <PanelList heading={listHeading} links={listLinks} current={current} onNavigate={close} />

                                  <div className="pl-10 2xl:pl-14 flex flex-col">
                                    <div className="relative w-full max-w-[640px] aspect-[3/2] overflow-hidden bg-[var(--color-surface)]">
                                      <ResponsiveImage
                                        src={feature.image}
                                        sizes="(min-width: 1840px) 640px, 33vw"
                                        alt={feature.imageAlt ?? ""}
                                        className="absolute inset-0 h-full w-full object-cover"
                                        style={feature.imagePosition ? { objectPosition: feature.imagePosition } : undefined}
                                      />
                                    </div>
                                    <p className="mt-6 max-w-md text-body text-[var(--color-text-secondary)]">{feature.body}</p>
                                    <PanelCta cta={feature.cta} onNavigate={close} className="mt-6" />
                                  </div>
                                </>
                              );
                            }

                            // Every other section: an intro (the page's own title, line and
                            // link) | its sections | one large photograph from the page. The same
                            // columns, dividers, list and CTA as Discover, in a different order.
                            return (
                              <>
                                <div className="pr-10 2xl:pr-14 flex flex-col">
                                  <span className="eyebrow text-[var(--color-text-muted)]">{feature.eyebrow ?? entry.label}</span>
                                  {feature.title && (
                                    <p className="mt-6 max-w-[15ch] nav-serif text-[clamp(2rem,2.6vw,2.875rem)] leading-[1.08] text-[var(--color-text)] text-balance">
                                      {feature.title}
                                    </p>
                                  )}
                                  <p className="mt-6 max-w-md text-body text-[var(--color-text-secondary)]">{feature.body}</p>
                                  <PanelCta cta={feature.cta} onNavigate={close} className="mt-8" />
                                </div>

                                <PanelList heading={listHeading} links={listLinks} current={current} onNavigate={close} />

                                <div className="pl-10 2xl:pl-14">
                                  <div className="relative w-full max-w-[640px] h-[clamp(300px,26vw,460px)] overflow-hidden bg-[var(--color-surface)]">
                                    <ResponsiveImage
                                      src={feature.image}
                                      sizes="(min-width: 1840px) 640px, 33vw"
                                      coverAspect={1.4}
                                      alt={feature.imageAlt ?? ""}
                                      className="absolute inset-0 h-full w-full object-cover"
                                      style={feature.imagePosition ? { objectPosition: feature.imagePosition } : undefined}
                                    />
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* =========================================================
            RESERVE BUTTON
        ========================================================= */}
        <SolidCta to="/reserve" current={location.pathname === "/reserve"} size="sm" className="max-xl:hidden shrink-0" showArrow={false}>
          Book a Stay
        </SolidCta>

        {/* =========================================================
            MOBILE / TABLET MENU BUTTON
        ========================================================= */}
        <button
          ref={menuButtonRef}
          type="button"
          className="xl:hidden flex flex-col items-center justify-center gap-[5px] h-9 w-9 text-[var(--color-text)]"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`block h-[1px] w-6 bg-current transition-transform duration-300 ${
              mobileOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1px] w-6 bg-current transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1px] w-6 bg-current transition-transform duration-300 ${
              mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </motion.header>

      {/* =========================================================
          MOBILE / TABLET FULL-SCREEN MENU — grouped accordion
      ========================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-40 xl:hidden bg-[var(--color-background)] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="relative px-6 pt-28 pb-16 flex flex-col gap-10 min-h-full">
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {navEntries.map((entry, i) => {
                  if (entry.type === "link") {
                    return (
                      <motion.div
                        key={entry.href}
                        className="border-b border-[var(--color-border)] py-4"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i, duration: 0.4, ease }}
                      >
                        <NavLink
                          to={entry.href}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `font-display text-title transition-colors ${
                              isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"
                            } hover:text-[var(--color-primary)]`
                          }
                        >
                          {entry.label}
                        </NavLink>
                      </motion.div>
                    );
                  }

                  const isOpen = openMobileGroup === entry.label;
                  const isCurrentSection = panelPaths(entry).includes(location.pathname);

                  return (
                    <motion.div
                      key={entry.label}
                      className="border-b border-[var(--color-border)]"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.4, ease }}
                    >
                      {/* Two separate targets on one row: the label is a real
                          link to the section's own page (/discover), and the
                          "+" is a 44px toggle for its sub-pages. Previously the
                          whole row was the toggle, so /discover itself was
                          unreachable from the mobile menu. */}
                      <div className="flex items-center justify-between gap-4 py-3">
                        <Link
                          to={entry.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={location.pathname === entry.href ? "page" : isCurrentSection ? "true" : undefined}
                          className={`flex-1 py-2 font-display text-title transition-colors ${
                            isCurrentSection ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"
                          } hover:text-[var(--color-primary)]`}
                        >
                          {entry.label}
                        </Link>
                        <button
                          type="button"
                          className="flex h-11 w-11 shrink-0 items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                          aria-expanded={isOpen}
                          aria-controls={`mobile-group-${groupSlug(entry.label)}`}
                          aria-label={`${isOpen ? "Hide" : "Show"} ${entry.label} pages`}
                          onClick={() => setOpenMobileGroup((g) => (g === entry.label ? null : entry.label))}
                        >
                          <span
                            className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                            aria-hidden="true"
                          >
                            +
                          </span>
                        </button>
                      </div>

                      {/* The padding lives on this inner-most div, not the
                          one .accordion-panel's CSS applies min-height:0 to
                          — a div with its own bottom padding can't actually
                          reach zero height (border-box clamps to at least
                          the padding), which silently defeats the collapse.
                          `inert` while collapsed keeps the visually hidden
                          links out of the tab order and the accessibility tree. */}
                      <div
                        id={`mobile-group-${groupSlug(entry.label)}`}
                        className={`accordion-panel ${isOpen ? "open" : ""}`}
                        inert={!isOpen}
                      >
                        <div>
                          <div className="pb-6 flex flex-col gap-5">
                            {entry.groups.map((group) => (
                              <div key={group.heading ?? "links"}>
                                {group.heading && (
                                  <span className="eyebrow text-[var(--color-text-muted)]">
                                    {group.heading}
                                  </span>
                                )}
                                <ul className={`mt-3 flex flex-col ${group.tight ? "gap-1.5" : "gap-3"}`}>
                                  {group.links.map((link) => (
                                    <li key={link.href}>
                                      <Link
                                        to={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        aria-current={link.href === location.pathname ? "page" : undefined}
                                        className={`text-body ${
                                          link.href === location.pathname ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)]"
                                        } hover:text-[var(--color-primary)] transition-colors`}
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </nav>

              <SolidCta to="/reserve" current={location.pathname === "/reserve"} className="mt-auto" showArrow={false}>
                Book a Stay
              </SolidCta>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
