import { useState } from "react";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import ReserveCta from "../components/ReserveCta";
import { roomCover } from "../data/rooms";
import { contact, eventTypes, pageSeo } from "../data/site";

import ResponsiveImage from "../components/ResponsiveImage";
import InlineVideo from "../components/InlineVideo";
import EdgeCarousel from "../components/EdgeCarousel";
// Descriptions say only what each photograph shows (no named festival —
// see the "event-gallery-2" note in data/media.ts). Performances and
// dinners are interleaved so the grid reads as the range of gatherings the
// house hosts, not one evening repeated. With four dance frames to two
// dinners, dances must meet somewhere round the loop; the two gold-costumed
// frames (dusk, courtyard) are kept apart. The acoustic set moved to the
// Event Types grid, so it isn't shown twice.
const eventGallery = [
  { src: "/images/masked-dance-courtyard-dusk.jpg", alt: "A masked dancer in a gold costume performing in NOYA's courtyard at dusk" },
  { src: "/images/dinner-course-fish-citrus-salad.jpg", alt: "A plated dinner course at NOYA: seared fish on a golden sauce, with a salad served in a hollowed orange" },
  { src: "/images/masked-dance-gold-costume-courtyard.jpg", alt: "A masked dance performed for guests in NOYA's courtyard" },
  { src: "/images/dinner-dessert-tart-creme-brulee.jpg", alt: "A dessert course at NOYA: a lattice tart with fresh berries beside a crème brûlée" },
  { src: "/images/masked-dancer-blue-costume-garland.jpg", alt: "A masked dancer in ceremonial dress performing in NOYA's courtyard, accompanied by musicians" },
  { src: "/images/masked-dance-before-seated-child-red-scarves.jpg", alt: "A masked dancer performing before a child seated in ceremonial dress in NOYA's courtyard" },
];

// One photograph per event type, for the Event Types grid. Each shows the
// kind of setting or moment its card describes; none is captioned as that
// event itself (no photographs of these specific events were supplied).
// Not repeated elsewhere on this page: the acoustic set left the gallery.
const eventTypePhotos: Record<string, { src: string; alt: string; position?: string; wide?: boolean }> = {
  "Artist Talks": { src: "/images/porcelain-lamp-archival-prints.jpg", alt: "A porcelain lamp and framed archival prints in a sitting room at NOYA" },
  "Poetry Readings": { src: roomCover("attic-room").src, alt: roomCover("attic-room").alt },
  // Raz photography's watermark sits bottom left: the crop trims the right.
  "Book Launches": { src: "/images/evening-gathering-guests-in-courtyard.jpg", alt: "Guests at an evening gathering in NOYA's courtyard", position: "0% 50%" },
  "Film Screenings": { src: "/images/courtyard-acoustic-concert.jpg", alt: "A small audience seated in NOYA's courtyard in the evening, facing two guitarists", position: "50% 30%", wide: true },
  "Slow Dinners": { src: "/images/dumplings-syringe-tableside.jpg", alt: "Dumplings served at the table at NOYA, sauce added beside the bowl", position: "50% 55%" },
};

// Raz photography's photographs of one evening gathering at the house. The
// event and the guests aren't identified in the supplied files, so neither
// is named. Shown whole, at their own 3:2, so the photographer's watermark
// (bottom left of each frame) is never cropped away.
const guestPhotos = [
  { src: "/images/evening-gathering-guests-by-the-bar.jpg", alt: "Guests mingling at an evening gathering in NOYA's courtyard, the lit bar and balcony behind them" },
  { src: "/images/evening-gathering-guests-smiling.jpg", alt: "Two guests smiling together at an evening gathering at NOYA" },
  { src: "/images/evening-gathering-guests-conversation.jpg", alt: "Two guests in conversation beside NOYA's turquoise courtyard wall, under a wall lamp" },
];

const galleryItems = eventGallery.map(({ src, alt }) => ({ image: src, alt }));

/**
 * The gallery as a strip that runs off the right edge and drifts slowly on
 * its own, looping (see EdgeCarousel); visitors can scroll or swipe it, and
 * the counter tracks the photograph at the content margin.
 */
function EventGallery() {
  const [index, setIndex] = useState(0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <section id="gallery" className="relative bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section overflow-x-clip">
      <div className="px-6 md:px-10 mx-auto max-w-wide">
        <div className="mb-10 md:mb-12 flex items-end justify-between gap-6">
          <span className="eyebrow">Gallery</span>
          <span className="text-label tabular-nums tracking-[0.12em] text-[var(--color-text-secondary)]" aria-hidden="true">
            {pad(index + 1)} / {pad(galleryItems.length)}
          </span>
        </div>
        {/* Six photographs from gatherings at the house — every one a real
            NOYA image, none repeating a photo elsewhere on the page. */}
        {/* Every card one width: 4:5, the phone card's shape and the
            closest to these mostly portrait photographs. */}
        <EdgeCarousel id="event-gallery-carousel" label="Photographs from gatherings at NOYA" items={galleryItems} onIndexChange={setIndex} aspect={4 / 5} />
      </div>
    </section>
  );
}

export default function Events() {
  return (
    <>
      <Seo {...pageSeo.events} />
      <PageHero
        eyebrow="Events at NOYA"
        title="A House Alive With Ideas"
        subtitle="Occasional gatherings, hosted at house scale in Gairidhara, Kathmandu."
        // Video only, no poster or still image (client request). Until the
        // first frame arrives the hero shows PageHero's dark background.
        videoSrc="/videos/kumari.mp4"
        // kumari.mp4 is 720×1280 portrait, so on landscape screens only a
        // band of each frame shows. Sampled across the loop, a band ~30%
        // from the top keeps faces and the procession in frame better than
        // dead centre (backs/torsos). Phones see nearly the whole frame.
        videoClassName="object-[50%_30%]"
        controls
        scrim="strong"
      />

      <section id="setting" className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-page grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-7">
            <span className="eyebrow">The Setting</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              Where Ideas Find a Place to Gather
            </h2>
            <p className="mt-6 text-body text-[var(--color-text-secondary)] max-w-2xl">
              A house becomes more than its walls when people gather within it.
            </p>
            <p className="mt-4 text-body text-[var(--color-text-secondary)] max-w-2xl">
              NOYA occasionally welcomes artist talks, poetry readings, book launches, film screenings, and other intimate cultural events. These gatherings reflect the interests that shaped the house itself: art, literature, heritage, and the exchange of ideas.
            </p>
            <p className="mt-4 text-body text-[var(--color-text-secondary)] max-w-2xl">
              The setting is personal by nature. Rather than hosting events simply to fill a calendar, NOYA creates space for occasions that bring people together around something worth sharing.
            </p>
            <p className="mt-4 text-body text-[var(--color-text-secondary)] max-w-2xl">
              NOYA hosts events occasionally, and never at a scale that would change how the house feels the rest of the time. These are announced separately from room availability; write to ask what's upcoming.
            </p>
          </div>
          {/* Phone footage (464×832, portrait), so it stays small, near its
              native width, in its own 9:16 frame: a 4:5 frame cut away the
              top and bottom 15% (the guitarist's head room and the floor
              where the audience sits). */}
          <figure className="md:col-span-5 w-full max-w-[320px] mx-auto md:mx-0 md:justify-self-end">
            <div className="relative aspect-[9/16] overflow-hidden bg-[var(--color-background-dark)]">
              <InlineVideo
                src="/videos/courtyard-acoustic-set.mp4"
                poster="/images/courtyard-acoustic-set-poster.jpg"
                label="A guitarist playing an acoustic set in NOYA's courtyard, filmed from above the audience"
                className="absolute inset-0 h-full w-full object-cover"
                // Has its original AAC stereo track (the performance itself).
                sound
              />
            </div>
            <figcaption className="mt-3 text-small text-[var(--color-text-secondary)]">
              An acoustic set in the courtyard.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="gatherings" className="relative bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-page">
          <div className="mb-14 text-center">
            <span className="eyebrow">Event Types</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              Small Gatherings. Lasting Impressions.
            </h2>
          </div>
          {/* A photo grid in the Home page's tile style (see RoomsGrid):
              4:3 tiles on 12 columns from lg, three to the first row, then a
              wide tile beside a normal one; title and text over a bottom
              shade. On tablets two columns (12 made the tiles too small for
              their text), the wide tile spanning both and dense flow
              filling the gap. The text keeps three lines from sm up so
              titles line up across a row. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-flow-row-dense lg:grid-cols-12 gap-3 md:gap-4">
            {eventTypes.map((event) => {
              const photo = eventTypePhotos[event.title];
              return (
                <div
                  key={event.title}
                  className={`relative overflow-hidden border border-[var(--color-border)] aspect-[4/3] ${
                    photo?.wide ? "sm:col-span-2 sm:aspect-[2/1] lg:col-span-8 lg:aspect-auto" : "lg:col-span-4"
                  }`}
                >
                  {photo && (
                    <ResponsiveImage
                      src={photo.src}
                      sizes={photo.wide ? "(min-width: 1280px) 850px, (min-width: 1024px) 62vw, 100vw" : "(min-width: 1280px) 420px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"}
                      coverAspect={photo.wide ? 2.7 : 4 / 3}
                      alt={photo.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={photo.position ? { objectPosition: photo.position } : undefined}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-dark)]/90 via-[var(--color-background-dark)]/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 md:p-6">
                    <h3 className="font-display text-title text-[var(--color-text-on-dark)]">{event.title}</h3>
                    <p className="mt-1 sm:min-h-[3lh] text-caption text-[var(--color-text-on-dark-secondary)] tracking-wide">
                      {event.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="celebrations" className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-page grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* The courtyard itself, by day: one of the spaces the text
              offers (its night photograph now opens the page as the hero).
              A wide frame in the wider column. */}
          <div className="md:col-span-7">
            <div className="relative aspect-[3/2] overflow-hidden bg-[var(--color-background-dark)]">
              <ResponsiveImage
                src="/images/courtyard.jpg"
                sizes="(min-width: 1280px) 720px, (min-width: 768px) 58vw, 100vw"
                coverAspect={3 / 2}
                alt="NOYA's courtyard by day: cushioned chairs and a glass table among plants under a glasshouse roof"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5">
            <span className="eyebrow">Spaces</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              The courtyard, the library, the drawing room.
            </h2>
            <p className="mt-6 text-body text-[var(--color-text-secondary)] max-w-md">
              Depending on the season and the size of the gathering, NOYA can offer the courtyard, the library bar, or the drawing room. Each keeps its own atmosphere rather than
              being converted for the occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Same background as "Spaces" above, so a hairline divides the two
          (as on the Heritage page) rather than a change of tone. */}
      <section id="guests" className="relative bg-[var(--color-background)] border-t border-[var(--color-border)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-page">
          <div className="max-w-xl">
            <span className="eyebrow">Guests</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              An evening in the courtyard.
            </h2>
            <p className="mt-6 text-body text-[var(--color-text-secondary)] max-w-md">
              Photographs from an evening gathering at the house.
            </p>
          </div>
          {/* Three across from lg; on tablets three across left each photo
              ~210px wide, so the first spans the row and the other two sit
              beneath it. Every frame stays 3:2, uncropped. */}
          <figure className="mt-12 md:mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {guestPhotos.map((photo, i) => (
                <div key={photo.src} className={`relative aspect-[3/2] overflow-hidden bg-[var(--color-background-dark)] ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                  <ResponsiveImage
                    src={photo.src}
                    sizes={
                      i === 0
                        ? "(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 100vw"
                        : "(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
                    }
                    alt={photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <figcaption className="mt-4 text-small text-[var(--color-text-secondary)]">
              Photographs: Raz photography.
            </figcaption>
          </figure>
        </div>
      </section>

      <EventGallery />

      {/* The gallery above already ends on its own border and tone. */}
      <ReserveCta
        id="enquire"
        eyebrow="Enquire"
        heading="Ask what's upcoming."
        action={{ label: "Send an Enquiry", to: "/reserve" }}
        divider={false}
      >
        Write to {" "}
        <a
          href={contact.emailHref}
          className="text-[var(--color-text)] underline decoration-1 underline-offset-4 decoration-[var(--color-border)] hover:text-[var(--color-primary)] hover:decoration-current transition-colors"
        >
          {contact.email}
        </a>
      </ReserveCta>
    </>
  );
}
