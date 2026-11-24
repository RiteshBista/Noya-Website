import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Seo from "../components/Seo";
import ArrowLink from "../components/ArrowLink";
import SolidCta from "../components/SolidCta";
import ReserveCta from "../components/ReserveCta";
import Reveal from "../components/Reveal";
import ResponsiveImage from "../components/ResponsiveImage";
import RoomGallery from "../components/RoomGallery";
import NotFound from "./NotFound";
import { contact } from "../data/site";
import {
  SHOW_UNCONFIRMED_FIELDS,
  UNCONFIRMED_LABEL,
  breakfastNote,
  findRoom,
  formatRoomPrice,
  roomPath,
  roomPhotos,
  roomReservePath,
  rooms,
  type Room,
} from "../data/rooms";

const ease = [0.16, 1, 0.3, 1] as const;

function RateLine({
  room,
  className = "",
}: {
  room: Room;
  className?: string;
}) {
  return (
    <p className={className}>
      {room.price ? (
        <>
          <span className="font-display text-title text-[var(--color-text)]">
            {formatRoomPrice(room.price)}
          </span>
          <span className="ml-2 text-small text-[var(--color-text-muted)]">
            per night ({room.price.currency})
          </span>
        </>
      ) : (
        <span className="text-[clamp(0.8rem,0.9vw,0.95rem)] text-[var(--color-text-secondary)]">
          Rates on request. Every enquiry is answered by the house.
        </span>
      )}
    </p>
  );
}

export default function RoomDetail() {
  const { slug } = useParams();
  const room = findRoom(slug);
  const reduced = useReducedMotion();

  const structuredData = useMemo(
    () =>
      room && {
        "@context": "https://schema.org",
        "@type": "HotelRoom",
        name: room.name,
        description: room.seoDescription,
        url: `https://www.noya.com.np${roomPath(room)}`,
        image: room.photos.map(
          (k) => `https://www.noya.com.np${roomPhotos[k].src}`
        ),
        containedInPlace: {
          "@type": "Hotel",
          name: "NOYA",
          address: contact.address,
          telephone: contact.phone,
        },
      },
    [room]
  );

  if (!room) return <NotFound />;

  const photos = room.photos.map((k) => roomPhotos[k]);
  const cover = photos[0];
  const position = rooms.indexOf(room);
  const others = rooms.filter((r) => r.slug !== room.slug);

  // =========================================================
  // ANIMATION
  // =========================================================

  const enter = (delay: number) =>
    reduced
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.7, ease },
        };

  // =========================================================
  // ROOM FACTS
  // =========================================================

  const facts: { label: string; value: string | null }[] = [
    { label: "Bed", value: room.bed },
    {
      label: room.bathroom ? "Ensuite bathroom" : "Bathroom",
      value: room.bathroom,
    },
    { label: "Room size", value: room.size },
    { label: "Maximum occupancy", value: room.occupancy },
    { label: "Accessibility", value: room.accessibility },
  ];

  const summaryFacts = facts.slice(0, 2).filter((fact) => fact.value);
  const summaryFeatures = room.features
    .filter((feature) => /balcony|skylight|attached lounge|sage-green|plush sofa/i.test(feature))
    .slice(0, 2);

  const shownFacts = SHOW_UNCONFIRMED_FIELDS
    ? facts
    : facts.filter((f) => f.value);

  return (
    <>
      <Seo
        title={`${room.name} | Heritage Boutique Hotel in Kathmandu | NOYA`}
        description={room.seoDescription}
        path={roomPath(room)}
        image={cover?.src}
        structuredData={structuredData || undefined}
      />

      {/* =========================================================
          ROOM HERO
      ========================================================= */}

      <section className="room-detail-hero relative bg-[var(--color-background)] px-5 sm:px-7 lg:px-10 pt-4 md:pt-5 pb-8 lg:pb-6">
        <div className="room-detail-hero__inner mx-auto max-w-page w-full">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 lg:mb-4"
          >
            <ol className="flex flex-wrap items-center gap-2 text-caption text-[var(--color-text-muted)]">
              <li>
                <Link
                  to="/rooms"
                  className="transition-colors hover:text-[var(--color-primary)]"
                >
                  Rooms
                </Link>
              </li>

              <li aria-hidden="true">/</li>

              <li
                aria-current="page"
                className="text-[var(--color-text-secondary)]"
              >
                {room.name}
              </li>
            </ol>
          </nav>

          {/* Main room content */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-6 lg:gap-8 xl:gap-10 items-center">

            {/* =====================================================
                ROOM DESCRIPTION
            ===================================================== */}

            <div
              className="contents lg:block lg:order-1 min-w-0"
            >
              <div className="order-1">
                <motion.span
                  className="eyebrow block"
                  {...enter(0)}
                >
                  Room {String(position + 1).padStart(2, "0")}
                </motion.span>

                <motion.h1
                  className="mt-2.5 font-display text-[clamp(2.2rem,3.5vw,4rem)] leading-[1.05] tracking-display text-[var(--color-text)]"
                  {...enter(0.05)}
                >
                  {room.name}
                </motion.h1>

                <div className="mt-4 border-t border-[var(--color-divider)] pt-3 lg:hidden">
                  <dl className="grid gap-2 text-small sm:grid-cols-2 sm:gap-x-6">
                    {summaryFacts.map((fact) => (
                      <div key={fact.label} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-3">
                        <dt className="text-[var(--color-text-muted)]">{fact.label === "Bed" ? "Bed" : "Ensuite"}</dt>
                        <dd className="text-[var(--color-text)]">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {summaryFeatures.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-small text-[var(--color-text-secondary)]">
                      {summaryFeatures.map((feature) => (
                        <li key={feature} className="first-letter:uppercase">{feature}</li>
                      ))}
                    </ul>
                  )}
                  <RateLine room={room} className="mt-3" />
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <SolidCta to={roomReservePath(room)} showArrow={false}>Book a Stay</SolidCta>
                    <ArrowLink href="#gallery">Photos</ArrowLink>
                  </div>
                </div>
              </div>

              {/* All paragraphs remain visible below the mobile cover. */}
              <motion.div
                className="order-3 text-base leading-[1.65] text-[var(--color-text-secondary)] space-y-3 lg:mt-4 lg:text-[clamp(0.9375rem,0.95vw,1.05rem)] lg:leading-[1.55] lg:space-y-2.5"
                {...enter(0.12)}
              >
                {room.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-left lg:text-justify [text-align-last:left]"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* =====================================================
                  ROOM PRICE AND BUTTONS
              ===================================================== */}

              <motion.div
                className="hidden lg:block mt-5 border-t border-[var(--color-divider)] pt-4"
                {...enter(0.2)}
              >
                <RateLine room={room} />

                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <SolidCta to={roomReservePath(room)} showArrow={false}>
                    Book a Stay
                  </SolidCta>

                  <ArrowLink href="#gallery">
                    {photos.length ? "View the photographs" : "Room photography"}
                  </ArrowLink>
                </div>
              </motion.div>
            </div>

            {/* =====================================================
                ROOM COVER IMAGE
                Shared proportions, independent of description length.
            ===================================================== */}

            <motion.div
              className="order-2 min-w-0 flex items-center justify-center lg:justify-end"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease }}
            >
              <div
                className="room-detail-hero__image relative w-full aspect-[4/3] overflow-hidden bg-[var(--color-background-secondary)]"
              >
                {cover ? (
                  <ResponsiveImage
                    src={cover.src}
                    alt={cover.alt}
                    sizes="(min-width: 1360px) 517px, (min-width: 1024px) 40vw, 100vw"
                    coverAspect={4 / 3}
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center p-6 text-center text-small text-[var(--color-text-muted)]">
                    Room photography coming soon
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          GALLERY
      ========================================================= */}

      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="relative scroll-mt-[calc(var(--nav-height)+1.5rem)] bg-[var(--color-background-secondary)] px-5 md:px-10 py-section"
      >
        <div className="mx-auto max-w-page">

          <div className="mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="eyebrow">Photographs</span>

              <h2
                id="gallery-heading"
                className="mt-3 font-display text-heading text-[var(--color-text)]"
              >
                Inside the {room.name}
              </h2>
            </div>

            <p className="text-caption text-[var(--color-text-muted)]">
              {photos.length ? `${photos.length} photograph${photos.length === 1 ? "" : "s"}. Select one to enlarge.` : "Room photographs are not yet available."}
            </p>
          </div>

          <Reveal>
            <RoomGallery
              photos={photos}
              title={room.name}
            />
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          ROOM DETAILS
      ========================================================= */}

      <section
        aria-labelledby="about-heading"
        className="relative bg-[var(--color-background)] px-5 md:px-10 py-section"
      >
        <div className="mx-auto max-w-5xl flex justify-center">

          <aside
            className="w-full max-w-4xl"
            aria-label="Room details"
          >
            <div className="border border-[var(--color-border)] p-5 sm:p-7 lg:p-8">

              <h2 id="about-heading" className="eyebrow">Room details</h2>

              <dl className="mt-5 text-small">
                {shownFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-1 sm:grid-cols-[9.5rem_1fr] gap-1 sm:gap-4 border-t border-[var(--color-divider)] py-3"
                  >
                    <dt className="text-[var(--color-text-muted)]">
                      {fact.label}
                    </dt>

                    <dd
                      className={
                        fact.value
                          ? "text-[var(--color-text)] first-letter:uppercase"
                          : "italic text-[var(--color-text-muted)]"
                      }
                    >
                      {fact.value ?? UNCONFIRMED_LABEL}
                    </dd>
                  </div>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-[9.5rem_1fr] gap-1 sm:gap-4 border-t border-b border-[var(--color-divider)] py-3">
                  <dt className="text-[var(--color-text-muted)]">
                    Rate
                  </dt>

                  <dd className="text-[var(--color-text)]">
                    {room.price
                      ? `${formatRoomPrice(room.price)} per night (${room.price.currency})`
                      : "On request"}
                  </dd>
                </div>
              </dl>

              {/* Room features */}
              {room.features.length > 0 && (
                <>
                  <span className="eyebrow mt-7 block">
                    In the room
                  </span>

                  <ul className="mt-3 flex flex-col gap-2 text-small text-[var(--color-text-secondary)]">
                    {room.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-px w-3 shrink-0 bg-[var(--color-primary)]"
                        />

                        <span className="block first-letter:uppercase">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Breakfast information */}
              <p className="mt-7 border-t border-[var(--color-divider)] pt-5 text-small text-[var(--color-text-secondary)]">
                {breakfastNote}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* =========================================================
          RESERVATION CTA
      ========================================================= */}

      <ReserveCta
        eyebrow={
          room.price
            ? `${formatRoomPrice(room.price)} per night`
            : "Rates on Request"
        }
        heading={`Stay in the ${room.name}`}
        action={{
          label: "Book a Stay",
          to: roomReservePath(room),
        }}
      >
        NOYA doesn't use an automated booking engine. Send a request
        with your dates, or call us on{" "}
        <a
          href={contact.phoneHref}
          className="underline underline-offset-4 hover:text-[var(--color-primary)] transition-colors"
        >
          {contact.phone}
        </a>
        .
      </ReserveCta>

      {/* =========================================================
          OTHER ROOMS
      ========================================================= */}

      {others.length > 0 && (
        <section
          aria-labelledby="others-heading"
          className="relative bg-[var(--color-background-secondary)] px-5 md:px-10 py-section"
        >
          <div className="mx-auto max-w-page">

            <div className="mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <div>
                <span className="eyebrow">Continue</span>

                <h2
                  id="others-heading"
                  className="mt-3 font-display text-heading text-[var(--color-text)]"
                >
                  Explore Other Rooms
                </h2>
              </div>

              <ArrowLink to="/rooms">
                All rooms
              </ArrowLink>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
              {others.map((other) => {
                const photo = other.photos.length ? roomPhotos[other.photos[0]] : undefined;

                return (
                  <li key={other.slug}>
                    <Link
                      to={roomPath(other)}
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-background)]">
                        {photo ? (
                          <ResponsiveImage
                            src={photo.src}
                            alt=""
                            sizes="(min-width: 1280px) 300px, (min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
                            coverAspect={4 / 3}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                          />
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center p-4 text-center text-caption text-[var(--color-text-muted)]">
                            Room photography coming soon
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 font-display text-title text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                        {other.name}
                      </h3>

                      <span className="mt-2 inline-flex items-center gap-2 text-button uppercase text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors">
                        Discover

                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                        >
                          &rarr;
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
