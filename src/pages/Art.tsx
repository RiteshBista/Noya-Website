import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import ChapterNav from "../components/ChapterNav";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ResponsiveImage from "../components/ResponsiveImage";
import { newarCrafts, aranikoNote, noyaArtDetails } from "../data/site";

const galleryLayout = [
  { width: 848, height: 1280, sizes: "(min-width: 1200px) 416px, (min-width: 768px) 38vw, calc(100vw - 48px)", placement: "md:col-start-1 md:row-start-1 md:row-span-2" },
  { width: 1600, height: 1200, sizes: "(min-width: 1200px) 624px, (min-width: 768px) 56vw, calc(100vw - 48px)", placement: "md:col-start-2 md:row-start-1 md:mt-6 lg:mt-12 xl:mt-14" },
  { width: 1278, height: 1600, sizes: "(min-width: 1200px) 291px, (min-width: 768px) 27vw, calc(100vw - 48px)", placement: "md:col-start-1 md:row-start-3 md:w-[70%] md:justify-self-end" },
  { width: 1440, height: 1063, sizes: "(min-width: 1200px) 593px, (min-width: 768px) 53vw, calc(100vw - 48px)", placement: "md:col-start-2 md:row-start-2 md:row-span-2 md:w-[95%]" },
];

export default function Art() {
  return (
    <>
      <Seo
        title="Art, Antiques & Nepali Craftsmanship at NOYA, Kathmandu"
        description="Discover the personal art collection, antique furniture, paintings, chandeliers, and Nepali artistic traditions that give NOYA its distinctive character in Kathmandu."
        path="/art"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Art: Newar Craft in the Kathmandu Valley, and at NOYA",
          description:
            "Newar wood, metal, painting and clay traditions of the Kathmandu Valley, and the art guests find at NOYA.",
        }}
      />

      <PageHero
        eyebrow="Art"
        title="A Life Collected in Art"
        subtitle="In the Kathmandu Valley, the finest Newar carving was never kept behind glass. It framed windows, held up roofs and watched over doorways."
        image="/images/peacock-window-bhaktapur.jpg"
        imageAlt="The Peacock Window in Bhaktapur: a carved wooden window set in a brick wall, its lattice formed by the fanned tail of a peacock"
        // The Peacock Window is symmetrical: the title sits on its axis.
        align="center"
        scrim="medium"
        credit={
          <>
            The Peacock Window, Bhaktapur. Photo:{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Peacock_window,_Bhaktapur_26482025170.jpg" target="_blank" rel="noopener noreferrer">
              Ralf Frenken
            </a>
            ,{" "}
            <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener noreferrer">
              CC BY-SA 2.0
            </a>
          </>
        }
      />

      {/* =========================================================
          AN ART OF USE — why the valley's art looks the way it does
      ========================================================= */}
      <section id="art-of-use" className="bg-[var(--color-background)] px-6 md:px-10 py-[calc(var(--spacing-section)*0.85)]">
        <div className="mx-auto max-w-reading">
          <span className="eyebrow text-[var(--color-text-secondary)]">The Valley's Makers</span>
          <h2 className="mt-3 font-display max-w-[24ch] text-heading-lg text-balance text-[var(--color-text)]">
            The Artistic Soul of the Kathmandu Valley
          </h2>
          <p className="mt-5 max-w-column text-left text-body text-[var(--color-text-secondary)]">
            For centuries the Newar artists of Kathmandu, Patan and Bhaktapur worked for temples,
            palaces and ordinary households alike. A carved window let in light and kept a room
            private. A cast figure was made to be worshipped, not admired from a distance. Beauty
            was expected of useful things, and that is still the best way to look at the valley's art.
          </p>
          <p className="mt-4 max-w-column text-left text-body text-[var(--color-text-secondary)]">
            The Peacock Window above is the most celebrated example. Carved in the 15th century for
            a priests' house in Bhaktapur, it turns a single window into a peacock whose tail
            feathers become the lattice, and it still looks out over a narrow lane.
          </p>
        </div>
      </section>

      {/* =========================================================
          FOUR MATERIALS — each tradition, and where to see it
      ========================================================= */}
      <section id="crafts" className="relative bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-editorial">
          <div className="max-w-xl">
            <span className="eyebrow">Newar Craft</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              The Hands That Keep Tradition Alive
            </h2>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              Four materials carry most of the valley's art. Each is still worked today, and each
              has a place where it can be seen at its best.
            </p>
          </div>

          <div className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2 lg:gap-x-14">
            {newarCrafts.map((craft) => (
              <div key={craft.material} className="border-t border-[var(--color-border)] pt-5">
                <span className="eyebrow text-[var(--color-primary)]">{craft.material}</span>
                <h3 className="mt-2 font-display text-title text-[var(--color-text)]">{craft.title}</h3>
                <p className="mt-3 text-left text-body text-[var(--color-text-secondary)]">{craft.body}</p>
                <p className="mt-4 text-small text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-text)]">Where to see it: </span>
                  {craft.where}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FURTHER AFIELD — Araniko
      ========================================================= */}
      <section id="araniko" className="bg-[var(--color-background)] px-6 md:px-10 py-[calc(var(--spacing-section)*0.75)]">
        <div className="mx-auto max-w-reading">
          <span className="eyebrow">{aranikoNote.eyebrow}</span>
          <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">{aranikoNote.title}</h2>
          <p className="mt-4 max-w-column text-left text-body text-[var(--color-text-secondary)]">{aranikoNote.body}</p>
        </div>
      </section>

      {/* =========================================================
          THE COLLECTOR'S HOUSE — the founder's collection (client copy)
      ========================================================= */}
      <section id="collection" className="relative bg-[var(--color-background)] border-t border-[var(--color-border)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-editorial grid gap-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="max-w-[29rem]">
            <span className="eyebrow">The Collection</span>
            <h2 className="mt-3 font-display text-heading-lg text-balance text-[var(--color-text)]">
              The Collector's House: Art With a Personal History
            </h2>
          </div>
          <div className="max-w-column">
            <p className="text-lead text-left text-[var(--color-text)]">
              The art at NOYA begins with the eye of its founder.
            </p>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              Santosh Bahadur Shah has spent years developing a personal collection of paintings, photographs, antiques, furniture, and decorative objects. Each piece reflects an interest in beauty, craftsmanship, history, or the quiet distinction that makes an object worth keeping.
            </p>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              At NOYA, the collection is not separated from the experience of the house. It is woven into it.
            </p>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              A painting may hold a wall. A chandelier may transform the atmosphere of a room. An antique piece of furniture may introduce a sense of time that no newly manufactured object can quite replicate. Photographs preserve fragments of memory, while carefully chosen decorative details bring warmth and personality to the spaces between them.
            </p>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              Santosh personally directed the restoration and design of the house, from the initial blueprints to the smallest finishing details. The placement of the collection forms part of that larger vision, allowing art, architecture, and furnishings to exist in conversation.
            </p>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              An art gallery within the hotel premises extends this experience, giving the collection a dedicated setting while the rest of the house allows individual pieces to be encountered in everyday surroundings.
            </p>
            <p className="mt-4 text-left text-body text-[var(--color-text-secondary)]">
              What emerges is a distinctive expression of luxury: a place where the objects are personal, the design is considered, and beauty is inseparable from the story behind it.
            </p>
            <p className="mt-6 font-display text-title leading-snug text-[var(--color-text)]">
              At NOYA, art is not simply displayed. It is lived with.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          ART AT NOYA — what guests actually find in the house
      ========================================================= */}
      <section id="at-noya" className="relative bg-[var(--color-background)] border-t border-[var(--color-border)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-editorial">
          <div className="max-w-column">
            <span className="eyebrow">At NOYA</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              A House That Became a Work of Art
            </h2>
            <p className="mt-6 text-left text-body text-[var(--color-text-secondary)]">
              Around the house, nothing carries a label. The pieces below are things guests come
              across on their own: fixed beside a doorway, set into a wall,
              hanging outside the house or framed in a room. They are part of the furnishing of the
              place rather than a collection.
            </p>
          </div>

          {/* Spanning the middle row lets each column advance at its own pace while keeping the figures in reading order. */}
          <Reveal className="mt-8 grid items-start gap-y-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-x-8 lg:gap-x-12 lg:gap-y-10 xl:gap-x-16">
            {noyaArtDetails.map((detail, index) => {
              const { width, height, sizes, placement } = galleryLayout[index];
              return (
                <figure key={detail.image} className={placement}>
                  <ResponsiveImage
                    src={detail.image}
                    sizes={sizes}
                    width={width}
                    height={height}
                    alt={detail.alt}
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                  <figcaption className="mt-2 max-w-[55ch] text-caption text-pretty text-[var(--color-text-secondary)]">
                    {detail.caption}
                  </figcaption>
                </figure>
              );
            })}
          </Reveal>

          <p className="mt-9 max-w-column text-left text-body text-[var(--color-text-secondary)]">
            To see the traditions at their source, the three royal squares of Kathmandu, Patan and
            Bhaktapur can all be reached from Gairidhara in a day. How they came to be built is the
            subject of the{" "}
            <Link to="/history" className="text-[var(--color-text)] underline underline-offset-4 hover:text-[var(--color-primary)] transition-colors">
              History
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      <ChapterNav current="Art" />
    </>
  );
}
