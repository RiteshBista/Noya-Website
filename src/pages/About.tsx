import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Restoration from "../components/Restoration";
import Seo from "../components/Seo";
import ArrowLink from "../components/ArrowLink";
import ReserveCta from "../components/ReserveCta";
import EditorialIntro from "../components/EditorialIntro";
import Motif from "../components/Motif";
import Reveal from "../components/Reveal";
import { roomPhotos } from "../data/rooms";
import { founder, pageSeo } from "../data/site";

import ResponsiveImage from "../components/ResponsiveImage";
// const galleryImages = [
//   { src: "/images/courtyard.jpg", alt: "The courtyard at NOYA" },
//   { src: "/images/facade-blue-hour-garden.jpg", alt: "The drawing room" },
//   { src: "/images/afternoon-tea-stand-black-and-white.jpg", alt: "The library bar" },
//   { src: "/images/suite.jpg", alt: "The suite" },
//   { src: "/images/juliet-room.jpg", alt: "The Juliet room" },
//   { src: "/images/bay-room.jpg", alt: "The Bay room" },
// ];

export default function About() {
  return (
    <>
      <Seo {...pageSeo.about} />

      <PageHero
        eyebrow="Outstanding Hotels and Valued Advice"
        title="Not Designed to Follow. Imagined to Belong."
        subtitle="A historic home, a personal vision, and a different understanding of luxury."
        image="/images/about_bi.jpg"
        imagePosition="52% 50%"
      />

      {/* The proprietor, first: the person who restored the house, directly
          under the hero, ahead of the house's own story. */}
      <section id="founder" className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-page grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* A title block standing in for the portrait this section has no
              rights-cleared photograph for — proprietor, role, and a
              hairline architectural mark, set apart the way a small
              engraved plaque would sit beside a house's own name. */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <span className="eyebrow">The Founder</span>
              <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
                The Man Behind the Imagination
              </h2>
              <p className="mt-4 text-body text-[var(--color-text)]">
                A personal vision, realised in every detail.
              </p>
              <p className="mt-6 font-display text-title text-[var(--color-text)]">{founder.name}</p>
              <Motif className="mt-6" />
            </div>
          </div>

          <div className="md:col-span-8 md:border-l md:border-[var(--color-border)] md:pl-16">
            <p className="text-body text-[var(--color-text-secondary)] max-w-2xl">
              {founder.intro}
            </p>
            <p className="mt-4 text-body text-[var(--color-text-secondary)] max-w-2xl">
              {founder.vision}
            </p>
            {/* The same measure as the paragraphs above and the photographs
                below (max-w-2xl, was max-w-xl), wrapped normally rather than
                display type's balanced split, and justified from 640px like
                the text around it. */}
            <blockquote className="mt-10 font-display text-title leading-snug text-pretty sm:text-justify text-[var(--color-text)] max-w-2xl">
              &ldquo;{founder.quote}&rdquo;
            </blockquote>
            {/* The founder's two lives in tea, in the order the text tells
                them: the trade (leaf laid out for tasting) and the ritual he
                brought home, as it's served at NOYA today. Square frames:
                the near-square tea stand shows whole, and the portrait
                tasting keeps its cups and the rows of leaf. Where and when
                the tasting took place isn't known, so it isn't said. */}
            <Reveal className="mt-12 max-w-2xl">
              <figure>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="relative aspect-square overflow-hidden">
                    <ResponsiveImage
                      src="/images/tea-tasting-leaves-and-cups.jpg"
                      sizes="(min-width: 1100px) 324px, (min-width: 640px) 30vw, 100vw"
                      coverAspect={1}
                      alt="Rows of loose-leaf tea on white papers along a wooden bench, beside small cups of brewed tea, set out for a tasting"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <ResponsiveImage
                      src="/images/afternoon-tea-stand-fireplace.jpg"
                      sizes="(min-width: 1100px) 324px, (min-width: 640px) 30vw, 100vw"
                      coverAspect={1}
                      alt="A tiered afternoon tea stand laid before an open fire at NOYA, cups and napkins beside it"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-small text-[var(--color-text-secondary)]">
                  Tea laid out for tasting, and afternoon tea at NOYA, laid by the fire.
                </figcaption>
              </figure>
            </Reveal>
            <p className="mt-10 text-body text-[var(--color-text-secondary)] max-w-2xl border-t border-[var(--color-border)] pt-8">
              {founder.detail}
            </p>
            <ArrowLink to="/hotel" className="mt-8">
              Stay at NOYA
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Continues the same-background proprietor section above: top padding
          is the short follow-on step (see --spacing-section-follow) so the
          two don't stack into one ~256px blank band. */}
      <EditorialIntro id="story" followOn columns="4/8" eyebrow="Our Story" title="The Art of Giving a House New Life">
        <p>
          NOYA is a restored heritage home in Gairidhara, Kathmandu, whose character emerges from the meeting of old architecture and an unusually personal design vision.
        </p>
        <p>
          Its foundations lie in history. Its present identity belongs to Santosh Bahadur Shah, the man who imagined its transformation and guided its restoration from the earliest plans to the finishing touches that give every room its individuality.
        </p>
        <p>
          The house was not conceived around a predetermined hotel aesthetic. Instead, its existing architecture became the starting point for a larger idea: a place where the history of the building, the beauty of collected objects, and the experience of hospitality could exist as one.
        </p>
        <p>
          The result is an intimate property of six rooms, a central courtyard, an art gallery, and interiors shaped by an eye for proportion, material, and detail.
        </p>
      </EditorialIntro>

      <section id="house" className="relative bg-[var(--color-background-secondary)] py-section xl:py-7 xl:[@media(max-height:800px)]:py-6 px-6 md:px-10">
        {/* Compact editorial spread, sized so the whole section fits one
            desktop screen (1440×900) below the navbar: eyebrow and heading
            across the full width, then photo (1/3) and text (2/3) side by side
            from lg, tops aligned. Below lg it stacks: heading, photo, text,
            and scrolls naturally. */}
        <div className="mx-auto max-w-page">
          <div className="mb-10 lg:mb-7">
            <span className="eyebrow">The House</span>
            {/* One line from xl. Narrower, one sentence per line: left to wrap
                and balance itself, it broke as "…Eye. An / Architect's…". */}
            <h2 className="mt-4 lg:mt-2 font-display text-heading-lg lg:text-heading text-[var(--color-text)]">
              <span className="block xl:inline">A Collector's Eye.</span>{" "}
              <span className="block xl:inline">An Architect's Attention to Detail.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-10 lg:gap-12">
            {/* Frame the lounge around the collected artwork and seating. */}
            <Reveal className="relative w-full max-w-[34rem] lg:max-w-none">
              <div className="aspect-[4/5] lg:absolute lg:inset-0 lg:aspect-auto">
                <ResponsiveImage
                  src={roomPhotos.bay2.src}
                  sizes="(min-width: 1280px) 410px, (min-width: 1024px) 30vw, (min-width: 640px) 544px, 100vw"
                  alt={roomPhotos.bay2.alt}
                  loading="lazy"
                  coverAspect={4 / 5}
                  className="h-full w-full object-cover object-[65%_50%]"
                />
              </div>
            </Reveal>
            {/* On desktop the image follows the height of this copy and link. */}
            <div className="max-w-[37.5rem] lg:max-w-[46rem] [&>p]:text-body lg:[&>p]:text-base lg:[&>p]:leading-[1.55] [&>p]:text-[var(--color-text-secondary)] [&>p+p]:mt-4 lg:[&>p+p]:mt-2">
              <p>
                Santosh Bahadur Shah approaches the house with the curiosity of a collector and the sensibility of someone who understands that the smallest detail can change the character of an entire room.
              </p>
              <p>
                London-educated and internationally experienced in business, he developed an appreciation for art, history, and cultural heritage that extends beyond the acquisition of beautiful things. His interest lies in their context: the stories objects carry, the craftsmanship they preserve, and the way they connect one period to another.
              </p>
              <p>
                That sensibility guided the restoration of NOYA.
              </p>
              <p>
                From the overall design concept and blueprints to the selection and placement of furniture, paintings, lighting, and decorative objects, Santosh personally directed the process. Every room was considered individually. Every material had to sit comfortably alongside what had survived. Every object needed a reason to be there.
              </p>
              <p>
                His personal collection forms the visual heart of the house. Paintings and photographs line its walls. Antique furniture establishes the character of its rooms. Chandeliers and candelabras contribute warmth and atmosphere. Collected objects appear throughout the property, sometimes immediately visible, sometimes discovered only after a closer look.
              </p>
              <p>
                Nothing is intended to feel like an anonymous display of luxury. The house carries the continuity of one person's imagination, expressed through objects gathered over time and architecture treated with care.
              </p>
              <ArrowLink to="/hotel" tone="primary" className="mt-7 lg:mt-4 lg:flex lg:w-fit">
                See the rooms
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <Restoration />

      <section id="architecture" className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-page grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-7">
            <span className="eyebrow">The Architecture</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              Old Stones. New Stories.
            </h2>
            <p className="mt-4 text-body text-[var(--color-text)]">
              A historic house, restored with an eye towards the future.
            </p>
            <p className="mt-6 text-body text-[var(--color-text-secondary)] max-w-xl">
              The house's core traces to the mid-18th century. Its Neoclassical character, with deep verandas, tall shuttered windows, and hand-plastered stone, was added later, during the
              Rana era, in the British-influenced style Kathmandu favoured at the time. Restoration
              kept that layered history intact rather than resolving it into one single period.
            </p>
            <Link
              to="/history"
              className="mt-6 inline-flex items-center gap-2 text-button uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Read the full history &rarr;
            </Link>
          </div>
          {/* Portrait photograph, so a portrait frame (see "The House"). */}
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <ResponsiveImage
                src="/images/turquoise-wall-shuttered-window.jpg"
                sizes="(min-width: 1280px) 500px, (min-width: 768px) 40vw, 100vw"
                alt="A tall white-shuttered window set in NOYA's turquoise wall, a flowering climber beside it"
                loading="lazy"
                coverAspect={4 / 5}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <EditorialIntro id="philosophy" tone="secondary" eyebrow="Philosophy" title="A Philosophy of Preservation, Not Perfection">
        <p>
          Restoring an old house requires a particular kind of restraint. It asks not only what can be improved, but what should remain untouched.
        </p>
        <p>
          At NOYA, the original structure was the beginning of the design rather than an obstacle to it. Stone, timber, panelling, and plasterwork were retained wherever possible. Later architectural layers were allowed to coexist with older elements, preserving the character of a building that had evolved over generations.
        </p>
        <p>
          The intention was never to make every surface appear new. It was to create a house in which age could remain visible without compromising the experience of staying there.
        </p>
        <p>
          This is where Santosh's interest in history meets his understanding of style. The past provides the substance; the present gives it renewed purpose.
        </p>
      </EditorialIntro>

      {/* A full-bleed chapter image, deliberately breaking from the
          boxed-and-bordered image/text split used for "house" and
          "architecture" above — the same photograph pairing (image, then
          caption) read as one editorial beat rather than a third repeat of
          the same grid geometry. */}
      <section id="kathmandu" className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        <Reveal>
          {/* facade-dusk.jpg is 3:2 and the building fills ~7–80% of its
              height, so any wider band crops the roof or the lanterns. The
              whole frame is shown instead, set in a centred plate sized so
              the photograph and its caption fit one screen together (a
              full-bleed 16:9 band alone was ~810px tall on a desktop). */}
          <div className="relative mx-auto aspect-[3/2] w-full max-w-[540px] overflow-hidden">
            <ResponsiveImage
              src="/images/facade-dusk.jpg" sizes="(min-width: 620px) 540px, 100vw"
              alt="NOYA's facade on Gairidhara Road"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <div className="mx-auto max-w-column mt-8 text-center">
          <span className="eyebrow">Kathmandu</span>
          <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
            Gairidhara, in the middle of the city.
          </h2>
          <p className="mt-6 text-body text-[var(--color-text-secondary)] max-w-md mx-auto">
            NOYA sits on Gairidhara Road, close enough to Kathmandu's centre to reach on foot,
            quiet enough that guests regularly remark on it. The house doesn't try to shut the city out. It simply sits a little apart from it.
          </p>
        </div>
      </section>

      {/* <section id="gallery" className="relative bg-[var(--color-ink)] pb-section px-6 md:px-10">
        <div className="mx-auto max-w-page">
          <div className="mb-10 text-center">
            <span className="eyebrow">Gallery</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-paper)]">
              The house, room by room.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img) => (
              <div key={img.src} className="relative aspect-square overflow-hidden border border-[var(--color-hairline)]">
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* The house today, before the Gallery and Public Opening chapters. */}
      <section
        id="open-doors"
        className="relative flex items-center bg-[var(--color-background-secondary)] border-t border-[var(--color-border)] py-section lg:py-12 lg:min-h-[calc(100svh-var(--nav-height))] px-6 md:px-10"
      >
        {/* min-height, never height: the text sets the floor, so a short
            screen scrolls instead of clipping a paragraph. The heading runs
            the full width so it holds one line; text and photograph share
            the row beneath it, top edges aligned. */}
        <div className="mx-auto w-full max-w-page">
          <h2 className="font-display text-heading text-[var(--color-text)]">
            A House That Continues to Become
          </h2>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="max-w-[36rem] [&>p]:text-body [&>p]:text-[var(--color-text-secondary)] [&>p]:text-pretty [&>p+p]:mt-4">
              <p>
                The meaning of NOYA is closely tied to renewal. Its restoration gave an old house a new purpose, but its story does not end with the completion of the building.
              </p>
              <p>
                Collections can grow. New works can find their place. Gatherings can introduce fresh perspectives. Travellers and local visitors can encounter the house in different ways, each bringing their own interpretation.
              </p>
              <p>
                Santosh's interest in philanthropy also informs the wider spirit of the property. The appreciation of art and heritage can create opportunities for cultural exchange, greater awareness, and meaningful connections with the community.
              </p>
              <p>
                NOYA's ambition is to remain a place of discovery: one where the past is respected, the present is thoughtfully lived, and the future remains open.
              </p>
            </div>
            {/* The 4:3 photograph in a 3:2 frame, anchored low: the trim comes
                off the empty sky, so the roofline, both wings, the lit
                entrance and the forecourt all stay in. */}
            <Reveal className="w-full max-w-[40rem] lg:max-w-none">
              <div className="relative aspect-[3/2] overflow-hidden">
                <ResponsiveImage
                  src="/images/facade-blue-hour-garden.jpg"
                  sizes="(min-width: 1280px) 568px, (min-width: 1024px) 45vw, (min-width: 720px) 640px, 100vw"
                  coverAspect={3 / 2}
                  alt="NOYA at blue hour, its ivy-covered facade lit from below behind the garden and stone forecourt"
                  loading="lazy"
                  className="h-full w-full object-cover object-[50%_90%]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="gallery-opening"
        aria-labelledby="gallery-heading"
        className="flex scroll-mt-[var(--nav-height)] items-center bg-[var(--color-background)] px-6 py-section md:px-10 lg:min-h-[calc(100svh-var(--nav-height))] lg:py-8"
      >
        <div className="mx-auto grid w-full max-w-page gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_auto] lg:gap-x-12 lg:gap-y-5 xl:gap-x-16">
          <header className="lg:col-start-1 lg:row-start-1">
            <span className="eyebrow">The Gallery</span>
            <h2 id="gallery-heading" className="mt-3 font-display text-heading-lg lg:text-heading text-balance text-[var(--color-text)]">
              A Collection With a Life of Its Own
            </h2>
          </header>
          <Reveal className="lg:relative lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <ResponsiveImage
              src="/images/archival-photographs-wall.jpg"
              sizes="(min-width: 1280px) 650px, (min-width: 1024px) 50vw, 100vw"
              alt="Framed archival photographs hung on a pale wall at NOYA, beside a window onto the balcony"
              width={1440}
              height={1063}
              loading="lazy"
              className="block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-cover"
            />
          </Reveal>
          <div className="max-w-[38rem] lg:col-start-1 lg:row-start-2">
            <p className="font-display text-subtitle italic lg:text-xl text-[var(--color-text)]">
              A Collection That Lives Beyond the Frame
            </p>
            <p className="mt-3 text-lead lg:text-base text-[var(--color-text)]">
              Art gathered over time, in a house shaped by imagination.
            </p>
            <div className="mt-5 [&>p]:text-body [&>p]:text-left lg:[&>p]:text-[0.9375rem] lg:[&>p]:leading-[1.55] [&>p]:text-[var(--color-text-secondary)] [&>p+p]:mt-3">
              <p>Art at NOYA extends beyond individual rooms. An art gallery within the hotel premises gives the house a dedicated space for the appreciation of visual culture and collected works.</p>
              <p>The gallery reflects the same instinct that shaped the restoration: to bring objects of interest into an environment where they can be encountered, considered, and understood in relation to one another.</p>
              <p>Throughout NOYA, the boundary between living space and collection remains deliberately gentle. A painting in the hallways, an antique in a room, a photograph telling stories of an earlier time.</p>
              <p>The gallery provides a glimpse of a world that the house embodies.</p>
            </div>
            <ArrowLink to="/art" tone="primary" className="mt-6 lg:flex lg:w-fit">
              Discover Art at NOYA
            </ArrowLink>
          </div>
        </div>
      </section>

      <section
        id="public-opening"
        aria-labelledby="public-opening-heading"
        className="flex scroll-mt-[var(--nav-height)] items-center border-y border-[var(--color-border)] bg-[var(--color-background-secondary)] px-6 py-section md:px-10 lg:min-h-[calc(100svh-var(--nav-height))] lg:py-8"
      >
        <div className="mx-auto grid w-full max-w-page gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_auto] lg:gap-x-12 lg:gap-y-5 xl:gap-x-16">
          <header className="lg:col-start-1 lg:row-start-1">
            <span className="eyebrow">The Public Opening</span>
            <h2 id="public-opening-heading" className="mt-3 font-display text-heading-lg lg:text-heading text-balance text-[var(--color-text)]">
              From Private World to Open Doors
            </h2>
          </header>
          <Reveal className="lg:relative lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <ResponsiveImage
              src="/images/courtyard-acoustic-concert.jpg"
              sizes="(min-width: 1280px) 650px, (min-width: 1024px) 50vw, 100vw"
              alt="Two acoustic guitarists playing for guests gathered in NOYA's courtyard"
              width={1600}
              height={1212}
              loading="lazy"
              className="block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-cover"
            />
          </Reveal>
          <div className="max-w-[38rem] lg:col-start-1 lg:row-start-2">
            <p className="font-display text-subtitle italic lg:text-xl text-[var(--color-text)]">
              Once Private. Now Yours to Discover.
            </p>
            <p className="mt-3 text-lead lg:text-base text-[var(--color-text)]">
              A new chapter of hospitality, beginning in 2026.
            </p>
            <div className="mt-5 [&>p]:text-body [&>p]:text-left lg:[&>p]:text-[0.9375rem] lg:[&>p]:leading-[1.55] [&>p]:text-[var(--color-text-secondary)] [&>p+p]:mt-3">
              <p>For years, NOYA operated as a private members-only institution, known within a more intimate circle.</p>
              <p>At the beginning of 2026, it entered a new chapter by opening its doors to the public. The transition marked an important evolution in the house's purpose: a personal vision that had once been experienced privately could now be shared with travellers, art enthusiasts, and visitors drawn to the cultural character of Kathmandu.</p>
              <p>The opening did not change the philosophy behind NOYA. It extended its reach.</p>
              <p>The house remains rooted in the same architecture, collection, and attention to detail. What has changed is the invitation—to stay, to explore, to encounter the collection, and to experience a more individual expression of hospitality.</p>
            </div>
            <ArrowLink to="/reserve" tone="primary" className="mt-6 lg:flex lg:w-fit">
              Enquire About a Stay
            </ArrowLink>
          </div>
        </div>
      </section>

      <section id="invitation" className="bg-[var(--color-background)] px-6 py-section text-center md:px-10">
        <p className="mx-auto max-w-[36ch] font-display text-heading text-balance text-[var(--color-text)]">
          NOYA welcomes you into a world first imagined by one man, and now ready to be discovered by many.
        </p>
        <ArrowLink to="/rooms" className="mt-7">
          Explore the Rooms
        </ArrowLink>
      </section>

      <ReserveCta heading="Come see it for yourself." />
    </>
  );
}
