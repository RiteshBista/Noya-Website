import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import HeritageSite from "../components/HeritageSite";
import ChapterNav from "../components/ChapterNav";
import Seo from "../components/Seo";
import ArrowLink from "../components/ArrowLink";
import Reveal from "../components/Reveal";
import Motif from "../components/Motif";
import ResponsiveImage from "../components/ResponsiveImage";
import { founder, valleyFestivals, monumentZones } from "../data/site";

export default function Heritage() {
  return (
    <>
      <Seo
        title="Kathmandu Heritage, Culture & Historic Sites | NOYA"
        description="Explore Kathmandu Valley's historic temples, Newar architecture, traditional crafts, and cultural landmarks from NOYA, a restored heritage home in Gairidhara, Kathmandu."
        path="/heritage"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Heritage: Living Culture in the Kathmandu Valley",
          description:
            "Festivals, courtyards, food and the World Heritage monument zones of the Kathmandu Valley, and how guests at NOYA meet them.",
        }}
      />

      <PageHero
        eyebrow="Heritage"
        title="The Living Soul of Kathmandu"
        subtitle="Masked dances, festival processions and shared feasts: in the Kathmandu Valley, tradition is something people go on doing."
        image="/images/masked-dance-before-seated-child-musicians.jpg"
        // Portrait photo: keep the dancer's mask and the seated child in
        // the landscape band.
        imagePosition="55% 38%"
        imageAlt="A masked dancer in red and gold performs in NOYA's courtyard before a child seated in ceremonial dress, with a drummer and onlookers"
        scrim="medium"
        credit="A masked dance during a gathering in NOYA's courtyard."
      />

      {/* =========================================================
          MORE THAN MONUMENTS — what "living heritage" means here
      ========================================================= */}
      <section id="living-heritage" className="bg-[var(--color-background)] px-6 md:px-10 py-[calc(var(--spacing-section)*0.85)]">
        <div className="mx-auto max-w-reading">
          <span className="eyebrow text-[var(--color-text-secondary)]">Living Heritage</span>
          <h2 className="mt-3 font-display text-heading-lg text-balance text-[var(--color-text)]">
            A City Where the Past Still Breathes
          </h2>
          <p className="mt-5 max-w-column text-left text-body text-[var(--color-text-secondary)]">
            UNESCO lists the Kathmandu Valley for its palace squares, stupas and temples. What keeps
            those places alive is less visible: the Newar communities who still worship in them and
            carry their deities through the streets each year. Much of that work has long been
            organised through guthis, community trusts that look after temples, rest houses and
            festivals, and decide who carries what, and when.
          </p>
          <p className="mt-4 max-w-column text-left text-body text-[var(--color-text-secondary)]">
            The photograph above was taken in NOYA's own courtyard, during a gathering at which a
            masked dance was performed. It is a small glimpse of a much larger calendar that runs
            through the valley all year.
          </p>
        </div>
      </section>

      {/* =========================================================
          FESTIVALS — the two nearest NOYA
      ========================================================= */}
      <section id="festivals" className="relative bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-editorial">
          <div className="max-w-xl">
            <Motif className="mb-4" />
            <span className="eyebrow">The Festival Year</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              Tradition Is Not a Thing of the Past
            </h2>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              Dates follow the lunar calendar and change from year to year, so it's worth asking
              before you travel.
            </p>
          </div>
          <div className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2 lg:gap-x-14">
            {valleyFestivals.map((f) => (
              <div key={f.name} className="border-t border-[var(--color-border)] pt-5">
                <h3 className="font-display text-title text-[var(--color-text)]">{f.name}</h3>
                <p className="mt-1 eyebrow text-[var(--color-primary)]">{f.place}</p>
                <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          COURTYARDS — how the valley lives, and NOYA's own courtyard
      ========================================================= */}
      <section id="courtyards" className="bg-[var(--color-background)] px-6 py-section md:px-10">
        <div className="mx-auto grid max-w-editorial items-center gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-10">
          <Reveal>
            <figure>
              <ResponsiveImage
                src="/images/courtyard.jpg"
                sizes="(min-width: 1180px) 578px, (min-width: 1024px) calc(54.55vw - 66px), (min-width: 768px) calc(50vw - 56px), calc(100vw - 48px)"
                alt="NOYA's courtyard: a glass table and white chairs with striped cushions among climbing plants and flowers"
                loading="lazy"
                width={2000}
                height={1503}
                className="block h-auto w-full"
              />
              <figcaption className="mt-2 text-caption text-pretty text-[var(--color-text-secondary)]">
                NOYA's courtyard, where breakfast is served in fair weather.
              </figcaption>
            </figure>
          </Reveal>
          <div>
            <span className="eyebrow">Courtyards</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              Life arranged around an open square.
            </h2>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)] max-w-md">
              Newar towns are built as a weave of courtyards opening off narrow lanes. Some are
              Buddhist monastic courtyards, the bahal and bahi; many more are simply where
              neighbours dry grain, mend a roof, share a feast or watch a dance.
            </p>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)] max-w-md">
              NOYA's courtyard comes from a different building tradition, but it does the same job.
              It is the centre of the house: where guests take breakfast and afternoon tea, and
              where, on occasion, a performance takes place.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE SHARED TABLE — food culture, and NOYA's genuine link to it
      ========================================================= */}
      <section id="table" className="relative bg-[var(--color-background)] border-t border-[var(--color-border)] py-[calc(var(--spacing-section)*0.8)] px-6 md:px-10">
        <div className="mx-auto max-w-reading">
          <span className="eyebrow">The Shared Table</span>
          <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
            When Local Craft Finds Its Way to the Table
          </h2>
          <p className="mt-4 max-w-column text-left text-body text-[var(--color-text-secondary)]">
            In the valley, festivals and family rites end in a shared meal, and the sweet shops of
            the old towns supply both the offerings and the celebrations.
          </p>
          <p className="mt-4 max-w-column text-left text-body text-[var(--color-text-secondary)]">{founder.detail}</p>
        </div>
      </section>

      {/* =========================================================
          THE WORLD HERITAGE LISTING — compact, and its pressures
      ========================================================= */}
      <section id="world-heritage" className="relative bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-editorial">
          <span className="eyebrow">One Listing, Seven Zones</span>
          <h2 className="mt-4 font-display text-heading text-[var(--color-text)] max-w-xl">
            Three Cities. Centuries of Artistry. One Extraordinary Valley.
          </h2>
          <p className="mt-4 text-left text-body text-[var(--color-text-secondary)] max-w-2xl">
            UNESCO inscribed the Kathmandu Valley as a single World Heritage property in 1979, made
            up of seven monument zones. The listing has not stood still. Between 2003 and 2007 it was
            placed on the List of World Heritage in Danger, because uncontrolled building was eroding
            the historic fabric around the monuments, and came off only after Nepal adopted a new
            management plan. The 2015 earthquake tested that work again.
          </p>

          <h3 className="mt-9 font-display text-title text-[var(--color-text)]">
            Seven Places to Encounter Nepal's Artistic Heritage
          </h3>
          <div className="mt-5 [&>div]:grid [&>div]:gap-2 [&>div]:py-4 md:[&>div]:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:[&>div]:gap-7 md:[&>div]:py-5 [&>div>div]:gap-3 [&>div>div>span]:min-w-6 [&>div>div>span]:text-xl [&>div>p]:mt-0 [&>div>p]:text-left">
            {monumentZones.map((zone) => (
              <HeritageSite key={zone.name} mark={zone.mark} name={zone.name} location={zone.location} body={zone.body} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          THE NEIGHBOURHOOD — where the guest actually is
          (linked from the Location section and the Discover menu)
      ========================================================= */}
      <section id="neighbourhood" className="relative bg-[var(--color-background)] px-6 pt-section pb-[calc(var(--spacing-section)*0.85)] md:px-10">
        <div className="mx-auto max-w-editorial">
          <div className="max-w-xl lg:max-w-none">
            <span className="eyebrow">The Neighbourhood</span>
            <h2 className="mt-3 font-display text-heading-lg text-balance text-[var(--color-text)] lg:whitespace-nowrap">
              Look Closer. Stay Longer. Discover More.
            </h2>
          </div>
          <div className="mt-7 grid gap-y-5 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
            {[
              {
                name: "Gairidhara",
                body: "NOYA's own street: a residential pocket of central Kathmandu, close enough to the city centre to reach on foot.",
              },
              {
                name: "Hadigaun",
                body: "A short walk away, and one of the oldest settled places in the valley, with festivals of its own each autumn.",
              },
              {
                name: "Bishalnagar",
                body: "The quieter residential streets just beyond Gairidhara, part of the same walkable corner of the city.",
              },
            ].map((n) => (
              <div key={n.name} className="border-t border-[var(--color-border)] pt-4">
                <h3 className="font-display text-title text-[var(--color-text)]">{n.name}</h3>
                <p className="mt-2 max-w-[34ch] text-left text-body text-[var(--color-text-secondary)]">{n.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 grid items-start gap-y-4 border-t border-[var(--color-border)] pt-6 md:grid-cols-2 md:gap-x-8 lg:gap-x-12">
            <p className="max-w-[54ch] text-left text-body text-[var(--color-text-secondary)]">
              The valley's squares, stupas and temples can all be reached in a day. For guided days
              out, NOYA's travel partner plans journeys around each guest; the house itself is
              somewhere to return to in the evening, to the courtyard and a pot of tea.
            </p>
            <div className="max-w-[48ch]">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 [&>a]:min-h-10 [&>a]:before:inset-y-0">
                <ArrowLink to="/hotel#location" tone="primary" className="font-semibold">Find NOYA</ArrowLink>
                <ArrowLink to="/travel-tour" tone="primary" className="font-semibold">Travel &amp; tours</ArrowLink>
              </div>
              <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                How the valley's squares came to be built is told on the{" "}
                <Link to="/history" className="text-[var(--color-text)] underline underline-offset-4 hover:text-[var(--color-primary)] transition-colors">
                  History
                </Link>{" "}
                page; the crafts that decorate them, on the{" "}
                <Link to="/art" className="text-[var(--color-text)] underline underline-offset-4 hover:text-[var(--color-primary)] transition-colors">
                  Art
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChapterNav current="Heritage" />
    </>
  );
}
