import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import RoomsGrid from "../components/RoomsGrid";
import SectionPreview from "../components/SectionPreview";
import StumbleUpon from "../components/StumbleUpon";
import CulturalKathmandu from "../components/CulturalKathmandu";
import Faq from "../components/Faq";
import FinalCta from "../components/FinalCta";
import Location from "../components/Location";
import Seo from "../components/Seo";
import ArrowLink from "../components/ArrowLink";
import { roomCover } from "../data/rooms";
import { beirut, pageSeo } from "../data/site";
import restorationBrickRubble from "../assets/restoration-brick-rubble.jpg";

import ResponsiveImage from "../components/ResponsiveImage";
export default function Home() {
  return (
    <>
      <Seo {...pageSeo.home} />
      <Hero />

      <SectionPreview
        id="about-preview"
        eyebrow="About NOYA"
        // One block per line: the break is fixed, and each line balances on
        // its own if it wraps on narrow screens.
        title={<><span className="block">Welcome to NOYA.</span> <span className="block">A new life for an old soul.</span></>}
        body="There are houses that shelter us, and there are houses that stay with us. NOYA belongs to the latter."
        images={[
          "/images/restoration-facade-rubble.jpg",
          restorationBrickRubble,
          "/images/hero-exterior-night.jpg",
        ]}
        imageAlt="NOYA before and after its restoration"
        imageAlts={[
          "NOYA's facade during restoration, with rubble and workers in front of the house",
          "Brick rubble cleared from the grounds during NOYA's restoration",
          "NOYA's restored Neoclassical facade, lit at night",
        ]}
        cta={{ label: "About NOYA", href: "/about" }}
      >
        <p className="mt-4 text-body text-[var(--color-text-secondary)] max-w-md">
          Tucked away in Gairidhara, Kathmandu, NOYA is a historic home brought into a new chapter through the imagination, taste, and meticulous vision of Santosh Bahadur Shah. Rooted in the architectural character of an 18th-century house, it brings together heritage, art, antiques, and contemporary hospitality in a setting that feels deeply personal.
        </p>
        <p className="mt-4 text-body text-[var(--color-text-secondary)] max-w-md">
          NOYA is neither a conventional luxury hotel nor a gallery arranged for display.
        </p>
        <p className="mt-4 text-body text-[var(--color-text-secondary)] max-w-md">
          Once a private members-only institution, NOYA opened its doors to the public at the beginning of 2026, inviting a wider circle of travellers and admirers to experience its distinctive world.
        </p>
      </SectionPreview>

      <StumbleUpon />

      {/* <section className="relative bg-[var(--color-surface)] border-y border-[var(--color-border)] py-section px-6 md:px-10 text-center">
        <span className="eyebrow">Art &middot; History &middot; Heritage</span>
        <h2 className="mt-6 font-display text-heading text-[var(--color-text)] max-w-2xl mx-auto">
          Three chapters of the same house.
        </h2>
        <p className="mt-5 max-w-lg mx-auto text-body text-[var(--color-text-secondary)]">
          The objects, the timeline, and the architecture that make NOYA what it is, each with a page of its own.
        </p>

        <ul className="mt-12 md:mt-14 mx-auto max-w-[1180px] flex flex-wrap justify-center gap-6 xl:gap-8 text-left">
          {[
            {
              number: "01",
              label: "Art",
              note: "The objects",
              href: "/art",
              image: "/images/carved-wooden-guardian-mask.jpg",
              position: "50% 30%", // the guardian's face, in the shorter frame
              alt: "A carved wooden guardian figure fixed beside a doorway at NOYA",
            },
            {
              number: "02",
              label: "History",
              note: "The timeline",
              href: "/history",
              image: "/images/restoration-facade-rubble.jpg",
              alt: "NOYA during its restoration, the house standing behind piles of brick rubble",
            },
            {
              number: "03",
              label: "Heritage",
              note: "The architecture",
              href: "/heritage",
              image: "/images/turquoise-wall-shuttered-window.jpg",
              position: "50% 28%", // the carved arch above the shutters
              alt: "A tall white-shuttered window set in NOYA's turquoise wall, a flowering climber beside it",
            },
          ].map((c) => (
            <li key={c.href} className="w-full md:w-[calc((100%-1.5rem)/2)] xl:w-[calc((100%-4rem)/3)]">
              <Link
                to={c.href}
                aria-label={`Explore ${c.label}: ${c.note}`}
                className="group relative block aspect-square overflow-hidden bg-[var(--color-background-dark)]"
              >
                <ResponsiveImage
                  src={c.image}
                  sizes="(min-width: 1280px) 372px, (min-width: 768px) 47vw, 100vw"
                  coverAspect={1}
                  alt={c.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]"
                  style={"position" in c ? { objectPosition: c.position } : undefined}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-dark)]/80 from-0% via-[var(--color-background-dark)]/45 via-40% to-transparent to-75%" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-6">
                  <div>
                    <span className="block text-label tracking-[0.2em] font-medium text-[var(--color-text-on-dark-secondary)]">{c.number}</span>
                    <h3 className="mt-1 font-display text-title text-[var(--color-text-on-dark)]">{c.label}</h3>
                    <span className="mt-0.5 block text-small text-[var(--color-text-on-dark-secondary)]">{c.note}</span>
                    <span className="mt-3 inline-block border-b border-[var(--color-text-on-dark)]/60 pb-0.5 text-button uppercase text-[var(--color-text-on-dark)]">
                      Explore {c.label}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-text-on-dark)]/50 text-[var(--color-text-on-dark)] transition-[background-color,border-color,transform] duration-300 ease-out group-hover:border-[var(--color-text-on-dark)] motion-safe:group-hover:translate-x-1 group-focus-visible:border-[var(--color-text-on-dark)] motion-safe:group-focus-visible:translate-x-1"
                  >
                    &rarr;
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section> */}

      {/* The vision, in the client's copy: an editorial spread. The heading
          column holds its place while the text runs beside it on desktop. */}
      <section id="vision" className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-page grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)]">
              <span className="eyebrow">The Vision Behind the House</span>
              {/* One sentence per line: left to balance itself in 14ch, it
                  broke as "…Vision. A / World…". */}
              <h2 className="mt-5 font-display text-heading-lg text-[var(--color-text)]">
                <span className="block">One Man's Vision.</span>{" "}
                <span className="block">A World of His Own.</span>
              </h2>
              <p className="mt-6 max-w-sm font-display-italic text-title text-[var(--color-text-secondary)]">
                How do you retain the soul of an historic house when renovating? | House &amp; Garden
              </p>
              <ArrowLink to="/about#founder" className="mt-10 max-lg:hidden">
                Discover the Vision Behind NOYA
              </ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-7 lg:border-l lg:border-[var(--color-divider)] lg:pl-16 max-w-[44rem]">
            <p className="text-body text-pretty text-[var(--color-text-secondary)]">
              NOYA began with Santosh Bahadur Shah's belief that a historic house could become something more than a building restored to its former condition. It could become an experience, an expression of taste, and a meeting place for art, history, culture, and hospitality.
            </p>
            <p className="mt-4 text-body text-pretty text-[var(--color-text-secondary)]">
              London-educated and shaped by an international business career, Santosh brings to NOYA a sensibility informed by his understanding of art and history, his appreciation of heritage, and his enduring interest in the cultural traditions of Nepal.
            </p>
            <p className="mt-4 text-body text-pretty text-[var(--color-text-secondary)]">
              A discerning collector of antiques and paintings, he has spent years gathering objects that speak to him through their craftsmanship, provenance, beauty, or quiet individuality. At NOYA, these pieces have found a home together. The photographs on the walls, the paintings, the furniture, the chandeliers, the candelabras, and the smallest decorative details are drawn from his personal collection.
            </p>
            {/* The turn in the argument, given room as a pull line. It holds the
                same measure as the paragraphs around it: normal wrapping
                (text-pretty replaces display type's balanced split, which ended
                both lines ~200px short of the column) and, like them, justified
                from 640px, ragged on phones. */}
            <p className="my-10 py-8 font-display text-title text-pretty sm:text-justify text-[var(--color-text)]">
              Yet the defining feature of NOYA is not simply what it contains. It is how everything comes together.
            </p>
            <p className="text-body text-pretty text-[var(--color-text-secondary)]">
              Santosh conceived the restoration and design of the house from the earliest blueprints to the final details of its individual rooms. He personally shaped the design direction, considered the relationship between materials and light, and attended to the character of each corner. The result reflects a rare continuity between the original idea and its execution: one imagination guiding the house as a whole.
            </p>
            <p className="mt-4 text-body text-pretty text-[var(--color-text-secondary)]">
              His interest in philanthropy adds another dimension to this vision. For Santosh, the appreciation of culture is inseparable from the value of preserving it, sharing it, and ensuring that the things worth keeping remain part of a living world.
            </p>
            <p className="mt-4 text-body text-pretty text-[var(--color-text-secondary)]">
              NOYA is his interpretation of luxury: personal rather than prescribed, collected rather than manufactured, and rooted in the conviction that beauty becomes more meaningful when it carries a story.
            </p>
            <ArrowLink to="/about#founder" className="mt-8 lg:hidden">
              Discover the Vision Behind NOYA
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* The name, in the client's copy: its own short chapter, centred on
          the word itself. */}
      <section id="name" className="relative bg-[var(--color-background-secondary)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-[1040px]">
          <div className="text-center">
            <span className="eyebrow">The Name</span>
            <h2 className="mt-5 font-display text-heading-lg text-[var(--color-text)]">
              NOYA — An Idea of New Life
            </h2>
            <p className="mt-5 font-display-italic text-title text-[var(--color-text)]">
              A New Life, An Enduring Beauty
            </p>
            <p className="mt-2 text-body text-[var(--color-text)]">
              A name that speaks of renewal, grace, and possibility.
            </p>
            <span aria-hidden="true" className="mx-auto mt-10 block h-px w-16 bg-[var(--color-primary)]" />
          </div>
          {/* Client copy. The Hebrew origin is to be confirmed with the
              founder before publication (the document's editorial note). */}
          <div className="mt-10 md:columns-2 md:gap-14 [&>p]:text-pretty [&>p]:break-inside-avoid">
            <p className="text-body text-[var(--color-text-secondary)]">
              Some names describe a place. Others express an aspiration.
            </p>
            <p className="mt-4 text-body text-[var(--color-text-secondary)]">
              NOYA is a name imagined by Santosh Bahadur Shah, inspired by a Hebrew word that he associates with new life, renewal, and the promise of becoming. It speaks to the house's own journey: an old structure restored, reimagined, and given a new purpose without surrendering its history.
            </p>
            <p className="mt-4 text-body text-[var(--color-text-secondary)]">
              There is a further idea within the name—a sense of feminine beauty, grace, and the timeless allure of a goddess. It is a poetic expression of the balance NOYA seeks to embody: strength and delicacy, permanence and change, heritage and reinvention.
            </p>
            <p className="mt-4 text-body text-[var(--color-text-secondary)]">
              The name is also a reflection of the house itself. NOYA is not intended to remain static. It is a place that can continue to grow through its art, its collections, its gatherings, and the people who encounter it.
            </p>
            <p className="mt-4 text-body text-[var(--color-text-secondary)]">
              An old house can begin again. A collection can acquire new meaning. A place can remain faithful to its origins while becoming something unexpected.
            </p>
          </div>
          <p className="mt-12 text-center font-display text-heading text-[var(--color-text)] mx-auto max-w-[22ch]">
            NOYA is not merely a new name for an old house. It is the idea of new life made real.
          </p>
        </div>
      </section>

      <RoomsGrid
        id="hotel-preview"
        eyebrow="Hotel"
        title="NOYA, Kathmandu."
        description="A single restored property in Gairidhara: six rooms, a courtyard, and the original stone and timber of a house that predates the neighbourhood around it."
        linkTo="/hotel"
        cta={{ label: "Discover the Property", href: "/hotel" }}
      />

      <SectionPreview
        id="rooms-preview"
        eyebrow="Rooms"
        title="Six Rooms, Six Individual Expressions"
        body="Six individual rooms. A courtyard with its own quiet rhythm. A collection that rewards a second look. And a house that continues to evolve. Breakfast is included."
        image={roomCover("bay-room").src}
        imageAlt={roomCover("bay-room").alt}
        cta={{ label: "Discover the Rooms", href: "/rooms" }}
        reverse
        dense
      />

      {/* =========================================================
          BEYOND THE ROOM — a compact discovery strip, replacing three
          near-identical split sections (Restaurant/Events/Shop) with
          one varied container: the homepage otherwise never uses a
          card grid, so this stays a single deliberate beat rather
          than a repeated pattern.
      ========================================================= */}
      {/* Laid out as an editorial row: on desktop the heading holds a
          narrow column at the content margin and the three cards run from
          beside it to the right edge of the viewport. Below that the cards
          become a swipeable strip, also bleeding off the right edge with the
          next card in view. The bleed comes from the .bleed-grid lines, so
          only the strip scrolls sideways, never the page. */}
      <section id="beyond-the-room" className="bleed-grid [--bleed-content-max:1280px] relative bg-[var(--color-background)] border-t border-[var(--color-border)] py-section">
        <div className="col-[content-start/full-end] flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-14">
          <div className="pr-6 md:pr-10 lg:pr-0 lg:w-[300px] lg:shrink-0 lg:self-start xl:w-[340px]">
            <span className="eyebrow">The Hospitality</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)] max-w-xl">
              The Luxury of Feeling Somewhere Else
            </h2>
            <p className="mt-4 text-body text-[var(--color-text)] max-w-xl">
              A more personal way to experience Kathmandu.
            </p>
          </div>

          {/* The -m/p pair gives the cards' focus rings room inside the
              scroll box (which clips both axes) without moving them. */}
          <div className="flex min-w-0 flex-1 gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-2 scrollbar-hide -my-2 py-2 -ml-2 pl-2 pr-6 md:pr-10 lg:pr-0 lg:overflow-visible">
            {[
              {
                eyebrow: "Restaurant",
                title: beirut.name,
                image: "/images/food.jpg",
                href: "/restaurant",
              },
              {
                eyebrow: "Events",
                title: "Kept small, kept quiet.",
                image: "/images/masked-dance-red-scarves-evening.jpg",
                href: "/events",
              },
              {
                eyebrow: "Local Artisan",
                title: "AMEYA Studio",
                image: "/images/local-artisan.jpg",
                href: "/local-artisan",
              },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                // Portrait 4:5 cards (two of the three photos are
                // portraits): ~78% of the strip on phones and ~44% on
                // tablets so the next card shows; equal thirds on desktop.
                className="group relative block shrink-0 snap-start overflow-hidden aspect-[4/5] w-[78%] sm:w-[44%] lg:w-auto lg:flex-1"
              >
                <ResponsiveImage
                  src={item.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 80vw" coverAspect={4 / 5}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-dark)]/90 via-[var(--color-background-dark)]/15 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="eyebrow text-[var(--color-text-on-dark-secondary)]">{item.eyebrow}</span>
                  <h3 className="mt-2 font-display text-title text-[var(--color-text-on-dark)]">{item.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-button uppercase text-[var(--color-primary-on-dark)] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guestbook hidden: its four guest notes have no recorded source and
          read as placeholder testimonials. Restore once real, consented
          guest notes are supplied (data: guestNotes in data/site.ts). */}
      <Faq />
      <CulturalKathmandu />
      <Location />
      <FinalCta />
    </>
  );
}
