import { Link } from "react-router-dom";
import RoomsGrid from "../components/RoomsGrid";
import Location from "../components/Location";
import Seo from "../components/Seo";
import ArrowLink from "../components/ArrowLink";
import ReserveCta from "../components/ReserveCta";
import Reveal from "../components/Reveal";
import { beirut, pageSeo } from "../data/site";
import architecturePhoto from "../assets/geraniums-passage-path.jpg";

import ResponsiveImage from "../components/ResponsiveImage";

export default function Hotel() {
  return (
    <>
      <Seo
        {...pageSeo.hotel}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Hotel",
          name: "NOYA",
          description: pageSeo.hotel.description,
          address: {
            "@type": "PostalAddress",
            streetAddress: "327 Gairidhara Road",
            addressLocality: "Kathmandu",
            postalCode: "44600",
            addressCountry: "NP",
          },
        }}
      />
      <section className="relative isolate grid overflow-hidden bg-[var(--color-background-secondary)] lg:h-[min(calc(100svh-var(--nav-height)),880px)] lg:min-h-[520px] lg:bg-[var(--color-background-dark)]">
        <div className="relative z-10 mx-auto flex w-full max-w-wide flex-col justify-center px-6 py-10 md:px-10 md:py-12 lg:justify-end lg:pb-20">
          <span className="eyebrow lg:text-[var(--color-text-on-dark)]">Hotel at NOYA</span>
          <h1 className="mt-4 max-w-[18ch] font-display text-display-lg tracking-display text-[var(--color-text)] lg:text-[var(--color-text-on-dark)]">
            <span className="block">An Intimate World</span>{" "}
            <span className="block">Behind the City</span>
          </h1>
        </div>
        <div className="min-w-0 lg:absolute lg:inset-0 lg:after:absolute lg:after:inset-0 lg:after:bg-linear-to-r lg:after:from-[var(--color-background-dark)]/65 lg:after:via-[var(--color-background-dark)]/20 lg:after:to-transparent">
          <ResponsiveImage
            src="/images/hotel_bi.jpg"
            sizes="(min-width: 1024px) max(100vw, 133svh), 100vw"
            alt="A NOYA guest room with a bed, timber ceiling beams, and sunlit balcony doors"
            width={1021} height={768} fetchPriority="high"
            decoding="async"
            className="block aspect-[2000/1333] w-full object-cover object-[42%_50%] lg:h-full lg:aspect-auto"
          />
        </div>
      </section>

      {/* Inside the page container and its margins. From lg the section is
          one screen tall below the navbar (a minimum height, so nothing can
          clip), content centred in it: the courtyard (kept 4:3) in seven
          columns, the text in five. Tablets keep the 5/7 split of
          Architecture below; phones stack. */}
      <section id="property" className="relative bg-[var(--color-background)] py-section px-6 md:px-10 lg:flex lg:items-center lg:min-h-[calc(100svh-var(--nav-height))]">
        <div className="mx-auto w-full max-w-page grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal className="md:col-span-5 lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden">
              <ResponsiveImage src="/images/courtyard.jpg" sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, (min-width: 768px) 40vw, 100vw" alt="The courtyard at NOYA" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div className="md:col-span-7 lg:col-span-5 md:pl-4">
            <span className="eyebrow">The Property</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              Luxury, With a Sense of Place
            </h2>
            <p className="mt-6 text-body text-[var(--color-text-secondary)] max-w-md">
              NOYA is a single property: a Neoclassical home restored around a central courtyard
              in Gairidhara, Kathmandu. Six rooms, breakfast included, and {beirut.name} occupying
              its own space inside the building.
            </p>
          </div>
        </div>
      </section>

      <RoomsGrid
        followOn
        id="rooms"
        eyebrow="Around the House"
        title="The Quiet Heart of the House"
        description="Six rooms, each restored on its own terms, set around a courtyard, with Beirut under the same roof and trusted local partners for craft and travel."
        linkTo="/reserve"
        cta={{ label: "Enquire about a room", href: "/reserve" }}
      />

      <section id="architecture" className="relative bg-[var(--color-background-secondary)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-page grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-square overflow-hidden">
              <ResponsiveImage
                src={architecturePhoto}
                sizes="(min-width: 1280px) 480px, (min-width: 768px) 40vw, 100vw"
                coverAspect={1}
                alt="NOYA's turquoise masonry and molded window surrounds lining a stone passage with geraniums"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </Reveal>
          <div className="md:col-span-7 md:pl-4">
            <span className="eyebrow">Architecture</span>
            <h2 className="mt-4 font-display text-heading-lg text-[var(--color-text)] max-w-[16ch] lg:max-w-none">
              A Heritage Preserved for a <span className="block">New Generation</span>
            </h2>
            <p className="mt-6 text-body text-[var(--color-text-secondary)] max-w-xl">
              The core structure traces to the mid-18th century. It survived the 2015 earthquake and
              was restored in the same stone and timber it was built with, then restored again ahead
              of reopening as NOYA. Read the full story on the <Link to="/history" className="underline decoration-[var(--color-border)] underline-offset-4 hover:text-[var(--color-primary)] hover:decoration-current transition-colors">History page</Link>.
            </p>
          </div>
        </div>
      </section>

      <section id="heritage" className="relative bg-[var(--color-background)] pt-section pb-16 md:pb-24 px-6 md:px-10">
        <div className="mx-auto max-w-page grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center md:@container">
          <div className="md:col-span-7 order-2 md:order-1">
            <span className="eyebrow">Heritage</span>
            <h2 className="mt-4 font-display text-heading-lg text-[var(--color-text)] max-w-[16ch] lg:max-w-none">
              What the restoration kept.
            </h2>
            <p className="mt-6 text-body text-[var(--color-text-secondary)] max-w-xl">
              Nothing was stripped for the sake of a clean surface. Where a beam could be saved, it was saved, and furniture and artifacts were gathered slowly, over years.
            </p>
            <ArrowLink to="/about#restoration" className="mt-8">
              The restoration story
            </ArrowLink>
          </div>
          {/* Inset by the unused part of Architecture's seven-column text track. */}
          <Reveal className="md:relative md:right-[max(0px,calc(58.333333cqw-38.666667rem))] md:col-span-5 order-1 md:order-2">
            <div className="relative aspect-square overflow-hidden">
              <ResponsiveImage src="/images/presidential4.jpg" sizes="(min-width: 1280px) 480px, (min-width: 768px) 40vw, 100vw" coverAspect={1} alt="Daylight across dark timber floorboards beside a wooden console, framed artwork, and a porcelain lamp at NOYA" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Dining and Experiences: two features side by side rather than two
          short text-only bands, each led by its own photograph. Kept
          compact so both photographs and their text read together on one
          desktop screen: landscape frames whose height follows the
          viewport (280–340px) instead of 4:5 portraits that grew with the
          column (~760px). Both start on the same line (no stagger). */}
      <section aria-label="Dining and experiences" className="relative bg-[var(--color-background)] pb-section px-6 md:px-10">
        <div className="mx-auto max-w-page grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-14 border-t border-[var(--color-divider)] pt-12 md:pt-16">
          {[
            {
              id: "dining",
              eyebrow: "Dining",
              title: "A Different Table, Under the Same Roof",
              body: beirut.place,
              image: "/images/food.jpg",
              alt: "A Beirut spread of mezze, dips and salads on a woven table runner",
              position: undefined as string | undefined,
              cta: { label: "Discover Dining", to: "/restaurant" },
            },
            {
              id: "experiences",
              eyebrow: "Experiences",
              title: "Where Art, Ideas, and People Meet",
              body: "Artist talks, poetry readings, book launches, and film screenings, kept small and announced separately from room availability.",
              image: "/images/courtyard-acoustic-concert.jpg",
              alt: "Two guitarists performing for a seated audience in NOYA's courtyard in the evening",
              // The duo sits in the upper middle of the frame; keep them,
              // and the front rows, in the wide desktop crop.
              position: "50% 40%",
              cta: { label: "Discover Events", to: "/events" },
            },
          ].map((f) => (
            <article key={f.id} id={f.id} className="scroll-mt-[calc(var(--nav-height)+2rem)]">
              <Reveal>
                {/* 4:3 on phones and tablets; from lg a fixed, viewport-led
                    height (wide columns made any aspect ratio too tall). */}
                <Link to={f.cta.to} tabIndex={-1} aria-hidden="true" className="group block relative aspect-[4/3] lg:aspect-auto lg:h-[clamp(280px,40svh,340px)] lg:w-[85%] overflow-hidden bg-[var(--color-background-secondary)]">
                  <ResponsiveImage
                    src={f.image}
                    sizes="(min-width: 1280px) 600px, (min-width: 768px) 46vw, 100vw"
                    coverAspect={4 / 3}
                    alt={f.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    style={f.position ? { objectPosition: f.position } : undefined}
                  />
                </Link>
              </Reveal>
              <span className="mt-6 block eyebrow">{f.eyebrow}</span>
              <h2 className="mt-3 font-display text-heading text-[var(--color-text)] max-w-[18ch]">{f.title}</h2>
              <p className="mt-4 text-body text-[var(--color-text-secondary)] max-w-md">{f.body}</p>
              <ArrowLink to={f.cta.to} className="mt-6">
                {f.cta.label}
              </ArrowLink>
            </article>
          ))}
        </div>
      </section>

      <div id="location">
        <Location title="Discover the City Beyond the Courtyard" />
      </div>

      <ReserveCta id="reserve" heading="Your Invitation to Stay" />
    </>
  );
}
