import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Timeline from "../components/Timeline";
import ChapterNav from "../components/ChapterNav";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import Motif from "../components/Motif";
import ResponsiveImage from "../components/ResponsiveImage";
import ArrowLink from "../components/ArrowLink";
import { archivalFeature, houseEras, valleyTimeline } from "../data/site";

export default function History() {
  return (
    <>
      <Seo
        title="The History of NOYA | Restoring a Heritage House in Kathmandu"
        description="Discover the story of NOYA's historic Kathmandu house, its mid-18th-century roots, later Neoclassical character, earthquake restoration, and rebirth under Santosh Bahadur Shah."
        path="/history"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "History: The Kathmandu Valley, and NOYA's Place in It",
          description:
            "From the valley's first settlements and its three Malla kingdoms to the Rana century and the house that became NOYA.",
        }}
      />

      <PageHero
        eyebrow="History"
        title="A House That Time Chose to Keep"
        subtitle="Kathmandu, Patan and Bhaktapur grew up within sight of one another. The rivalry of their kings built much of what visitors still come to see."
        image="/images/patan-durbar-square-morning.jpg"
        imagePosition="28% 0%"
        imageAlt="Patan Durbar Square in the morning: the stone Krishna Mandir and tiered pagoda temples, with pigeons in flight and people crossing the square"
        scrim="medium"
        credit={
          <>
            Patan Durbar Square. Photo:{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Life_at_Patan.jpg" target="_blank" rel="noopener noreferrer">
              Rohan Manandhar
            </a>
            ,{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">
              CC BY-SA 4.0
            </a>
          </>
        }
      />

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <section id="introduction" className="bg-[var(--color-background)] px-6 md:px-10 py-[calc(var(--spacing-section)*0.85)]">
        <div className="mx-auto max-w-reading">
          <span className="eyebrow text-[var(--color-text-secondary)]">Before NOYA</span>
          <h2 className="mt-3 font-display text-heading-lg text-balance text-[var(--color-text)]">
            The Valley That Shaped the House
          </h2>
          <p className="mt-5 max-w-column text-left text-body text-[var(--color-text-secondary)]">
            Most capitals bury their past under the present. In the Kathmandu Valley a great deal
            of it is still standing and still in use: palace squares, temples and courtyard houses,
            a few miles apart. Their story is easiest to follow in order, from the valley's first
            settlements to the Malla kings who built its great squares, the making of modern Nepal,
            and the earthquakes that have tested it all.
          </p>
          <p className="mt-4 max-w-column text-left text-body text-[var(--color-text-secondary)]">
            It begins closer to NOYA than most guests expect. Hadigaun, a short walk from
            Gairidhara, is one of the oldest settled places in the valley.
          </p>
        </div>
      </section>

      {/* =========================================================
          THE VALLEY'S STORY — the main narrative
      ========================================================= */}
      <section id="timeline" className="relative bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-editorial">
          <div className="mb-8 max-w-xl">
            <Motif className="mb-4" />
            <span className="eyebrow">The Valley's Story</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              Two thousand years, in seven chapters.
            </h2>
          </div>
          <div className="[&>div]:gap-0 [&>div>div]:gap-3 [&>div>div]:py-5 md:[&>div>div]:gap-7 md:[&>div>div]:py-6 [&_span]:text-3xl [&_p.text-body]:mt-2 [&_p.text-body]:text-left">
            <Timeline steps={valleyTimeline} />
          </div>
        </div>
      </section>

      {/* =========================================================
          NOYA IN THIS STORY — only what the sources and photographs show
      ========================================================= */}
      <section id="noya" className="bg-[var(--color-background)] px-6 md:px-10 py-section">
        <div className="mx-auto grid max-w-column items-start gap-7 lg:max-w-editorial lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:gap-10">
          <div className="max-w-column">
            <h2 className="font-display text-heading text-balance text-[var(--color-text)]">
              Before the Hotel, There Was a House
            </h2>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              NOYA's story begins long before the hotel, before its art collection, and before its doors opened to the public.
            </p>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              At its centre stands a house whose core traces to the mid-18th century, a time when Kathmandu's streets, courtyards, and neighbourhoods were shaped by centuries of local craftsmanship and changing architectural influences.
            </p>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              The building later acquired a Neoclassical character, expressed through its deep verandas, tall shuttered windows, and hand-finished walls. These additions became part of its identity without entirely displacing its older structure.
            </p>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              The house endured as the city around it changed. It witnessed the transformation of Kathmandu from a historic royal capital into a growing modern city, and it survived a devastating earthquake that left its own mark on the building.
            </p>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              Its present chapter began when Santosh Bahadur Shah recognised what the house could become. His own story is told on the{" "}
              <Link to="/about#founder" className="text-[var(--color-text)] underline underline-offset-4 hover:text-[var(--color-primary)] transition-colors">
                About
              </Link>{" "}
              page.
            </p>
          </div>
          <Reveal className="relative lg:self-stretch">
            <figure className="lg:absolute lg:inset-0 lg:grid lg:grid-rows-[minmax(0,1fr)_auto]">
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
                <ResponsiveImage
                  src="/images/restoration-facade-rubble.jpg"
                  sizes="(min-width: 1180px) 820px, (min-width: 1024px) 940px, (min-width: 768px) min(700px, calc(100vw - 80px)), calc(100vw - 48px)"
                  alt="NOYA during its restoration: the whitewashed house with tall windows, brick rubble piled in front and workers clearing it"
                  loading="lazy"
                  className="h-full w-full object-cover lg:object-[40%_center]"
                />
              </div>
              <figcaption className="mt-2 text-caption text-[var(--color-text-secondary)]">
                The house during its restoration.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          FOUR ERAS — the house itself, in the valley timeline's form
      ========================================================= */}
      <section id="eras" className="relative bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-editorial">
          <div className="mb-8 max-w-xl">
            <span className="eyebrow">The House Through Four Eras</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              The Story of One House, Told in Four Chapters
            </h2>
          </div>
          <div className="[&>div]:grid [&>div]:gap-x-10 [&>div]:gap-y-4 md:[&>div]:grid-cols-2 [&>div>div]:grid-cols-1! [&>div>div]:content-start [&>div>div]:gap-3 [&>div>div]:pt-5 [&>div>div>div]:col-span-1! [&>div>div>div:first-child]:flex [&>div>div>div:first-child]:items-baseline [&>div>div>div:first-child]:gap-3 [&_span]:text-2xl [&_p.eyebrow]:mt-0 [&_p.text-body]:mt-2 [&_p.text-body]:text-left">
            <Timeline steps={houseEras} />
          </div>
        </div>
      </section>

      {/* =========================================================
          FROM THE ARCHIVES — the house in print
      ========================================================= */}
      <section id="archives" className="bg-[var(--color-background)] px-6 py-[calc(var(--spacing-section)*0.85)] md:px-10">
        <div className="mx-auto grid max-w-lg items-center gap-7 md:max-w-editorial md:grid-cols-[minmax(0,47fr)_minmax(0,53fr)] md:gap-8 lg:gap-10 xl:gap-12">
          <Reveal className="relative lg:self-stretch">
            <div className="border border-[var(--color-border)] p-1 lg:absolute lg:inset-0">
              <ResponsiveImage
                src={archivalFeature.image}
                alt={archivalFeature.imageAlt}
                loading="lazy"
                width={478}
                height={334}
                className="block h-auto w-full brightness-110 contrast-105 lg:h-full lg:object-cover lg:object-[55%_center]"
              />
            </div>
          </Reveal>
          <div>
            <span className="eyebrow text-[var(--color-text-muted)]">{archivalFeature.eyebrow}</span>
            <h3 className="mt-2 max-w-[20ch] font-display text-heading-lg text-balance text-[var(--color-text)] lg:max-w-none lg:whitespace-nowrap lg:text-[clamp(2.25rem,3.05vw,2.75rem)]">{archivalFeature.title}</h3>
            <p className="mt-4 max-w-[58ch] text-left text-body leading-relaxed text-[var(--color-text-secondary)]">{archivalFeature.body}</p>
            <p className="mt-5 border-t border-[var(--color-border)] pt-4 text-label font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">
              {archivalFeature.source}
            </p>
            <a
              href={archivalFeature.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex min-h-10 items-center gap-2 text-button font-semibold uppercase text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-200"
            >
              <span className="underline decoration-current decoration-2 underline-offset-[5px] transition-colors duration-300 group-hover:decoration-[var(--color-primary-hover)]">
                Read the original article
              </span>
              <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
            <p className="mt-1 max-w-[60ch] text-caption text-[var(--color-text-muted)]">
              Magazine photograph reproduced as a small excerpt for historical context; copyright
              remains with the publication.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE MAKING OF A NEW LIFE, and THE ART OF RESTORATION
      ========================================================= */}
      <section id="restoration" className="bg-[var(--color-background)] px-6 md:px-10 pb-section">
        <div className="mx-auto max-w-editorial border-t border-[var(--color-border)] pt-section flex flex-col gap-10 lg:gap-14">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-5 md:gap-9 lg:gap-12">
            <div className="max-w-sm">
              <h2 className="font-display text-heading text-balance text-[var(--color-text)]">
                The Making of a New Life
              </h2>
            </div>
            <div className="max-w-column">
              <p className="text-left text-body text-[var(--color-text-secondary)]">
                The restoration of NOYA was not a standard conversion from an old property into a hotel. It was a deeply personal undertaking, shaped by Santosh's understanding of history, art, architecture, and the relationship between a building and the objects that inhabit it.
              </p>
              <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
                He conceived the project from the initial design plans and guided its execution through the details of each room and corner. His intention was to preserve the house's essential character while creating an environment capable of welcoming contemporary guests.
              </p>
              <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
                The original fabric of the building informed the decisions that followed. Surviving timber and panelling were retained where possible. The walls and floors were approached with an appreciation for their materials. Furniture, paintings, photographs, and lighting were selected from Santosh's personal collection and placed in relation to the architecture.
              </p>
              <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
                The process brought together two forms of preservation: the conservation of a historic building and the continuation of a personal collection.
              </p>
              <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
                The result was not a replica of an earlier period, but a house carrying its past into a new life.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-5 md:gap-9 lg:gap-12">
            <div className="max-w-sm">
              <span className="eyebrow">The Art of Restoration</span>
              <h2 className="mt-4 font-display text-heading text-balance text-[var(--color-text)]">
                Every Detail Has a Reason
              </h2>
            </div>
            <div className="max-w-column">
              <p className="text-left text-body text-[var(--color-text-secondary)]">
                The restoration of NOYA reflects a belief that beauty is not always found in making something new. Sometimes it is found in recognising the value of what is already there.
              </p>
              <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
                A surviving beam may carry more character than a replacement. An uneven plaster surface may reveal the passage of time. A recovered timber floor may possess a depth that cannot be manufactured.
              </p>
              <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
                Santosh's design vision brought these materials into conversation with his collection of antiques, paintings, furniture, and decorative objects. Each addition was considered in relation to the existing house, allowing the interior to develop as a coherent expression rather than a collection of disconnected styles.
              </p>
              <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
                This approach is central to NOYA's identity today. Its luxury comes from individuality, provenance, and attention to detail—not from erasing every trace of age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TODAY — NOYA's facade, closing the chapter
      ========================================================= */}
      <section id="today" className="relative bg-[var(--color-background)] pb-section px-6 md:px-10">
        <div className="mx-auto grid max-w-column items-start gap-6 lg:max-w-editorial lg:grid-cols-2 lg:gap-10">
          <Reveal className="relative lg:self-stretch">
            <div className="relative aspect-[3/2] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
              <ResponsiveImage
                src="/images/facade-dusk.jpg"
                sizes="(min-width: 1180px) 720px, (min-width: 1024px) 850px, (min-width: 768px) min(700px, calc(100vw - 80px)), calc(100vw - 48px)"
                alt="NOYA's two-storey facade lit up at night, seen across the paved courtyard"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <span className="eyebrow">Today</span>
            <h2 className="mt-2 font-display text-heading text-balance text-[var(--color-text)]">
              A Historic House, A Contemporary Welcome
            </h2>
            <p className="mt-2.5 max-w-[62ch] text-left text-body text-[var(--color-text-secondary)]">
              At the beginning of 2026, NOYA moved beyond its former private members-only identity and opened to the public.
            </p>
            <p className="mt-2.5 max-w-[62ch] text-left text-body text-[var(--color-text-secondary)]">
              The house now welcomes travellers seeking an intimate boutique hotel in Kathmandu, as well as visitors interested in its art, architecture, and collection.
            </p>
            <p className="mt-2.5 max-w-[62ch] text-left text-body text-[var(--color-text-secondary)]">
              Its history remains visible, but its purpose continues to evolve. A building that has survived centuries of change now has another future: one in which more people can experience its character firsthand.
            </p>
            <p className="mt-2.5 max-w-[62ch] text-left text-body text-[var(--color-text-secondary)]">
              The house has been restored. Its story remains in progress.
            </p>
            <div className="mt-3 flex flex-col items-start [&>a]:min-h-11 [&>a]:before:inset-y-0 lg:[&>a]:min-h-8">
              <ArrowLink to="/about#founder">Discover the Vision Behind NOYA</ArrowLink>
              <ArrowLink to="/heritage">Explore Kathmandu's Heritage</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <ChapterNav current="History" />
    </>
  );
}
