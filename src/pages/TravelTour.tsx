import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import EditorialIntro from "../components/EditorialIntro";
import PartnerCta from "../components/PartnerCta";
import Motif from "../components/Motif";
import ResponsiveImage from "../components/ResponsiveImage";
import { ananyaHolidays, pageSeo } from "../data/site";
import ananyaLogo from "../assets/ananya-holidays-logo.png";
import ananyaVideo from "../assets/ananya-holidays-videos.mp4";

export default function TravelTour() {
  return (
    <>
      <Seo {...pageSeo.travelTour} />
      <PageHero
        eyebrow={ananyaHolidays.name}
        title="Let Nepal Unfold, One Discovery at a Time"
        subtitle={ananyaHolidays.tagline}
        image="/images/travel-tour.jpg"
        videoSrc={ananyaVideo}
        controls
        // The supplied film has no audio track.
        videoSilent
        scrim="light"
        align="center"
      />

      {/* The introduction as one spread: eyebrow and heading over the left
          column, set as two fixed lines ("Beyond the Courtyard," / "Into
          Nepal") so it never falls into a ragged three; then one of the
          cultural landmarks the text describes, with the copy beside it
          starting on the photograph's top edge (text-box trim drops the
          half-leading above the first line, so its cap height meets the
          frame). A Creative Commons photograph (as the History hero), so it
          carries its credit. Below lg it stacks eyebrow, heading,
          photograph, copy. */}
      <section
        id="introduction"
        className="relative bg-[var(--color-background-secondary)] py-section px-6 md:px-10"
      >
        <div className="mx-auto max-w-page grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-12 xl:gap-x-16 gap-y-8 md:gap-y-10">
          <div className="lg:col-start-1 lg:row-start-1">
            <span className="eyebrow">{ananyaHolidays.category}</span>
            <h2 className="mt-5 font-display text-heading-lg leading-[1.04] text-[var(--color-text)]">
              <span className="block">Beyond the Courtyard,</span>
              <span className="block">Into Nepal</span>
            </h2>
          </div>
          <figure className="lg:col-start-1 lg:row-start-2">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface)]">
              <ResponsiveImage
                src="/images/patan-durbar-square-morning.jpg"
                sizes="(min-width: 1440px) 510px, (min-width: 1024px) 37vw, 100vw"
                coverAspect={4 / 3}
                alt="Patan Durbar Square in the morning: the stone Krishna Mandir and tiered pagoda temples, with pigeons in flight and people crossing the square"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ objectPosition: "28% 50%" }}
              />
            </div>
            <figcaption className="mt-3 text-caption text-[var(--color-text-secondary)]">
              Patan Durbar Square. Photo:{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Life_at_Patan.jpg" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--color-primary)]">
                Rohan Manandhar
              </a>
              ,{" "}
              <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--color-primary)]">
                CC BY-SA 4.0
              </a>
            </figcaption>
          </figure>
          <div className="lg:col-start-2 lg:row-start-2 max-w-[38rem] [&>p]:text-body [&>p]:text-[var(--color-text-secondary)] [&>p+p]:mt-5 lg:[&>p:first-child]:[text-box:trim-start_cap_alphabetic]">
            <p>
              Nepal reveals itself gradually. In the carved details of an ancient temple, the rhythm
              of a traditional neighbourhood, the work of an artisan, or the changing landscape beyond
              the valley, every journey offers another way to understand the country.
            </p>
            <p>
              NOYA provides a starting point for exploring Kathmandu's cultural landmarks and the wider
              landscapes of Nepal. Whether your interests lie in architecture, art, local traditions,
              or journeys beyond the capital, the experience begins with curiosity.
            </p>
            <p>
              {ananyaHolidays.introduction}
            </p>
          </div>
        </div>
      </section>

      {/* The heading holds the left columns; the five ways run beside it
          as a ruled list (title, then what it covers) rather than a grid
          of boxes. */}
      <section id="ways-to-travel" className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-page grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-10">
          <div className="lg:col-span-4">
            <span className="eyebrow">Ways to Travel</span>
            <h2 className="mt-5 font-display text-heading-lg text-[var(--color-text)] max-w-[10ch]">
              Every pace has a route.
            </h2>
          </div>
          <ul className="lg:col-span-8 border-t border-[var(--color-border)]">
            {ananyaHolidays.waysToTravel.map((way) => (
              <li
                key={way.title}
                className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-x-10 gap-y-2 border-b border-[var(--color-border)] py-7"
              >
                <h3 className="font-display text-title text-[var(--color-text)]">{way.title}</h3>
                <p className="text-body text-[var(--color-text-secondary)] sm:pt-1">{way.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="featured-journeys" className="relative bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-reading">
          <div className="mb-10 text-center">
            <span className="eyebrow">Featured Journeys</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              From Ancient Courtyards to Himalayan Horizons
            </h2>
          </div>
          {/* Five one-line journeys: a compact ruled list, so the whole
              section reads in one screen. */}
          <div className="flex flex-col gap-5">
            {ananyaHolidays.featuredJourneys.map((journey) => (
              <div key={journey.mark} className="flex items-start gap-6 border-b border-[var(--color-border)] pb-5 last:border-b-0 last:pb-0">
                <span className="w-12 font-display text-4xl leading-none text-[var(--color-primary)] shrink-0">
                  {journey.mark}
                </span>
                <div>
                  <h3 className="font-display text-title text-[var(--color-text)]">
                    {journey.title}
                  </h3>
                  <p className="mt-2 text-small text-[var(--color-text-secondary)] max-w-md">
                    {journey.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EditorialIntro id="why-ananya" eyebrow="Why Ananya" title="A small team, not a catalogue.">
        <p>{ananyaHolidays.whyAnanya}</p>
      </EditorialIntro>

      {/* Travel Philosophy — set as one large editorial statement rather
          than repeating the eyebrow/heading/paragraph formula "Why Ananya"
          just used, so the two centered sections don't read as the same
          block twice. */}
      <section id="philosophy" className="relative bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section-lg px-6 md:px-10 text-center">
        <Motif className="mx-auto" />
        <p className="mx-auto mt-8 max-w-2xl font-display text-heading-lg text-[var(--color-text)]">
          {ananyaHolidays.philosophy}
        </p>
        <span className="mt-8 inline-block eyebrow">Travel Philosophy</span>
      </section>

      {/* The philosophy band above already ends on its own border. */}
      <PartnerCta
        id="visit"
        logo={{ src: ananyaLogo, alt: "Ananya Holidays", frameClassName: "h-12 w-24" }}
        heading={<>Discover {ananyaHolidays.name} through NOYA.</>}
        description={ananyaHolidays.introduction}
        links={[{ label: "Visit Ananya Holidays", href: ananyaHolidays.href }]}
        divider={false}
      />
    </>
  );
}
