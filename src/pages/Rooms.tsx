import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import ArrowLink from "../components/ArrowLink";
import ReserveCta from "../components/ReserveCta";
import Reveal from "../components/Reveal";
import ResponsiveImage from "../components/ResponsiveImage";
import { pageSeo } from "../data/site";
import { breakfastNote, formatRoomPrice, roomPath, roomPhotos, roomCover, rooms, type Room } from "../data/rooms";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One room in the collection: a large photograph beside its name, the
 * first paragraph of the client's description, and what the copy confirms
 * about the bed and bathroom. Rows alternate sides on desktop.
 */
function RoomCard({ room, index }: { room: Room; index: number }) {
  const cover = room.photos.length ? roomPhotos[room.photos[0]] : undefined;
  const href = roomPath(room);
  const flip = index % 2 === 1;

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-16 items-center">
      <Reveal className={`md:col-span-6 lg:col-span-7 ${flip ? "md:order-2" : ""}`}>
        {/* The title link below is the keyboard stop; the photo is a
            second, pointer-only way into the same page. */}
        <Link
          to={href}
          tabIndex={-1}
          aria-hidden="true"
          className="group relative block aspect-[4/3] overflow-hidden bg-[var(--color-background-secondary)]"
        >
          {cover ? (
            <ResponsiveImage
              src={cover.src}
              alt=""
              sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
              coverAspect={4 / 3}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center p-6 text-center text-small text-[var(--color-text-muted)]">
              Room photography coming soon
            </span>
          )}
        </Link>
      </Reveal>

      <div className={`md:col-span-6 lg:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <span className="eyebrow">Room {pad(index + 1)}</span>
        <h3 className="mt-4 font-display text-heading text-[var(--color-text)]">
          <Link to={href} className="hover:text-[var(--color-primary)] transition-colors duration-300">
            {room.name}
          </Link>
        </h3>
        <p className="mt-5 text-body text-left lg:text-justify text-[var(--color-text-secondary)]">{room.paragraphs[0]}</p>

        {(room.bed || room.bathroom) && (
          <dl className="mt-7 border-t border-[var(--color-divider)] text-small">
            {room.bed && <Detail label="Bed" value={room.bed} />}
            {room.bathroom && <Detail label="Ensuite" value={room.bathroom} />}
          </dl>
        )}

        <p className="mt-6 text-small text-[var(--color-text-muted)]">
          {room.price ? (
            <>
              <span className="text-[var(--color-text)]">{formatRoomPrice(room.price)}</span> per night
            </>
          ) : (
            "Rates on request"
          )}
        </p>

        <ArrowLink to={href} className="mt-8">
          Discover the {room.name}
        </ArrowLink>
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] md:grid-cols-[3.5rem_minmax(0,1fr)] lg:grid-cols-[6.5rem_minmax(0,1fr)] gap-3 lg:gap-4 border-b border-[var(--color-divider)] py-3">
      <dt className="eyebrow text-[var(--color-text-muted)] pt-0.5">{label}</dt>
      <dd className="text-[var(--color-text-secondary)] first-letter:uppercase">{value}</dd>
    </div>
  );
}

export default function Rooms() {
  return (
    <>
      <Seo {...pageSeo.rooms} />

      <PageHero
        eyebrow="Rooms"
        title="Six Rooms. One Story. Six Ways to Experience It."
        subtitle="Original panelling, thangka-hung corners, and blackened timber floors, in a house that dates to the mid-18th century."
        image={roomCover("presidential-room").src}
        imageAlt={roomCover("presidential-room").alt}
        scrim="light"
      />

      {/* =========================================================
          ROOMS INTRO — client copy, as approved
      ========================================================= */}
      <section className="relative bg-[var(--color-background)] px-6 md:px-10 py-section">
        <div className="mx-auto max-w-page grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-5">
            <span className="eyebrow">Stay at NOYA</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)] max-w-md">
              Every room has a character. Every detail has a reason.
            </h2>
            <ArrowLink href="#collection" className="mt-6">View the rooms</ArrowLink>
            <nav aria-label="Rooms" className="mt-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-1 text-small">
                {rooms.map((room) => (
                  <li key={room.slug}>
                    <Link
                      to={roomPath(room)}
                      className="group relative inline-flex min-h-11 items-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors before:absolute before:inset-y-0 before:-inset-x-3 before:content-['']"
                    >
                      <span className="border-b border-transparent group-hover:border-current pb-0.5 transition-colors">
                        {room.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="md:col-span-7 max-w-2xl">
            <p className="text-body text-[var(--color-text-secondary)]">
              At NOYA, no two rooms are intended to feel alike. Each has been
              considered individually, with the house's architecture, collected
              furnishings, and original materials guiding its character.
            </p>
            <p className="mt-4 text-body text-[var(--color-text-secondary)]">
              Antique furniture, paintings, handwoven textiles, and the warm tones
              of old timber create spaces that feel intimate rather than uniform.
              These are rooms shaped by a personal eye for detail, designed to
              offer comfort without losing the individuality of the house.
            </p>
            <p className="mt-4 text-body text-[var(--color-text-secondary)]">
              Here, the luxury lies in the experience of inhabiting somewhere
              distinctive: a room with a past, a window with a view, and a quiet
              corner in which to let the day unfold.
            </p>
            <p className="mt-4 text-body text-[var(--color-text-secondary)]">{breakfastNote}</p>

            <ArrowLink to="/hotel" className="mt-10">
              Explore the hotel
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE ROOMS — one card per published room in data/rooms.ts
      ========================================================= */}
      <section
        id="collection"
        aria-labelledby="collection-heading"
        className="relative scroll-mt-[calc(var(--nav-height)+1.5rem)] bg-[var(--color-background)] px-6 md:px-10 pb-section"
      >
        <div className="mx-auto max-w-page border-t border-[var(--color-divider)] pt-16 md:pt-24">
          <div className="mb-14 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <span className="eyebrow">The Rooms</span>
              <h2 id="collection-heading" className="mt-4 font-display text-heading text-[var(--color-text)]">
                Find the Room That Feels Like Yours
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-20 md:gap-28">
            {rooms.map((room, i) => (
              <RoomCard key={room.slug} room={room} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* The Reserve form still offers The Bay Room, The Juliet Room and The
          Suite; it is left unchanged until the client confirms the names. */}
      <ReserveCta heading="A Quiet Return to the Heart of Kathmandu">
        Six rooms in all, no two alike. Write to us to ask about a particular room.
      </ReserveCta>
    </>
  );
}
