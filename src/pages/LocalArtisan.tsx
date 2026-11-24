import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import EditorialIntro from "../components/EditorialIntro";
import PartnerCta from "../components/PartnerCta";
import { ameyaStudio, pageSeo } from "../data/site";
import ameyaLogo from "../assets/ameya_logo.jpg";
import ameyaVideo from "../assets/ameya-video.mp4";
import designerImage from "../assets/designer.webp";
import craftedImage from "../assets/crafted.webp";

import ResponsiveImage from "../components/ResponsiveImage";
export default function LocalArtisan() {
  return (
    <>
      <Seo {...pageSeo.localArtisan} />
      <PageHero
        eyebrow={ameyaStudio.name}
        title="The Hands, Stories, and Traditions of Nepal"
        subtitle={ameyaStudio.tagline}
        videoSrc={ameyaVideo}
        controls
        // Medium: late in the film the jewellery is shot on bright white
        // surfaces, behind the hero text (measured below 4.5:1 on "light").
        scrim="medium"
        // The film closes on a black AMEYA title card from ~59.2s; loop
        // before it so the card never competes with the page title.
        videoLoopEnd={58.6}
      />

      <EditorialIntro
        id="idea"
        eyebrow={ameyaStudio.category}
        title="Jewellery that remembers a place."
        className="py-[calc(var(--spacing-section)*0.8)]! [&>div]:max-w-editorial [&>div]:items-center [&>div]:gap-y-4 md:[&>div]:grid-cols-12 md:[&>div]:gap-x-8 md:[&>div>div:first-child]:col-span-5 md:[&>div>div:last-child]:col-span-7 lg:[&>div>div:last-child]:pt-0"
      >
        <p className="max-w-[48ch] text-left">{ameyaStudio.idea}</p>
      </EditorialIntro>

      <section
        id="maker"
        className="relative scroll-mt-[var(--nav-height)] bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section px-6 md:px-10"
      >
        <div className="mx-auto grid max-w-column gap-10 md:grid-cols-2 md:gap-8 lg:max-w-editorial lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-10 xl:gap-14">
          {[
            { image: designerImage, alt: "The AMEYA Studio designer at work", eyebrow: "The Maker", title: "A story before a sale.", body: ameyaStudio.maker },
            { image: craftedImage, alt: "AMEYA Studio jewellery being handcrafted", eyebrow: "Craft", title: "The Hands That Carry Tradition Forward", body: ameyaStudio.craft },
          ].map((item, index) => (
            <div key={item.eyebrow} className="grid content-start items-start gap-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8 md:max-lg:grid-cols-1 md:max-lg:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6 lg:last:grid-cols-[minmax(0,4fr)_minmax(0,5fr)]">
              <div className={`relative w-full max-w-[352px] overflow-hidden bg-[var(--color-surface)] md:max-lg:aspect-square ${index === 0 ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-square sm:aspect-[4/5]"}`}>
                <ResponsiveImage
                  src={item.image} sizes="(min-width: 1180px) 260px, (min-width: 1024px) 240px, (min-width: 768px) 334px, (min-width: 640px) 270px, min(352px, calc(100vw - 48px))"
                  alt={item.alt}
                  loading="lazy"
                  className={`h-full w-full object-cover ${index === 0 ? "object-[center_42%]" : "object-[center_40%]"}`}
                />
              </div>
              <div className="sm:pt-4 md:max-lg:pt-0 lg:pt-3">
                <span className="eyebrow">{item.eyebrow}</span>
                <h2 className="mt-3 font-display text-heading text-balance text-[var(--color-text)]">{item.title}</h2>
                <p className="mt-4 max-w-md text-left text-body text-[var(--color-text-secondary)]">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Place and Jewellery as one spread: where the collections come from,
          beside what they become, set as a typographic index rather than a
          grid of near-empty cells. */}
      <section className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        <div className="mx-auto grid max-w-editorial gap-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-x-14">
          <div id="place" className="scroll-mt-[calc(var(--nav-height)+2rem)]">
            <span className="eyebrow">Place</span>
            <h2 className="mt-3 max-w-[16ch] font-display text-heading-lg text-balance text-[var(--color-text)]">
              Every Craft Has a Story
            </h2>
            <p className="mt-4 max-w-[34ch] text-left text-lead text-[var(--color-text-secondary)]">
              Each AMEYA collection is drawn from a real place, among them{" "}
              {ameyaStudio.places.join(", ")}.
            </p>
          </div>
          <div id="jewellery" className="scroll-mt-[calc(var(--nav-height)+2rem)]">
            <span className="eyebrow">Jewellery</span>
            <h2 className="mt-3 font-display text-heading-lg text-[var(--color-text)]">
              Worn, not just kept.
            </h2>
            <ol
              className="mt-4 border-t border-[var(--color-border)] sm:grid sm:grid-flow-col sm:grid-cols-2 sm:gap-x-6 lg:gap-x-9"
              style={{ gridTemplateRows: `repeat(${Math.ceil(ameyaStudio.categories.length / 2)}, auto)` }}
            >
              {ameyaStudio.categories.map((category, i) => (
                <li
                  key={category}
                  className="grid grid-cols-[2ch_minmax(0,1fr)] items-baseline gap-3 border-b border-[var(--color-border)] py-2.5"
                >
                  <span aria-hidden="true" className="text-small tabular-nums text-[var(--color-text-secondary)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-title text-[var(--color-text)]">{category}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* AMEYA's philosophy as a single statement, then the house's own. */}
      <section
        id="philosophy"
        className="relative scroll-mt-[var(--nav-height)] bg-[var(--color-background-secondary)] px-6 py-[calc(var(--spacing-section)*0.72)] md:px-10"
      >
        <div className="mx-auto max-w-reading text-center">
          <span className="eyebrow">Philosophy</span>
          <h2 className="mt-3 font-display text-heading-lg text-balance text-[var(--color-text)]">
            Made to last, made to mend.
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-lead text-pretty text-[var(--color-text-secondary)]">
            {ameyaStudio.philosophy}
          </p>
        </div>
      </section>

      <section
        id="shared-philosophy"
        className="relative scroll-mt-[var(--nav-height)] bg-[var(--color-background)] px-6 pt-section pb-[calc(var(--spacing-section)*0.7)] md:px-10"
      >
        <div className="mx-auto grid max-w-editorial items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-x-7 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-x-10 lg:gap-y-7">
          <h2 className="max-w-[22ch] font-display text-heading-lg text-balance text-[var(--color-text)] md:col-span-2 md:max-w-none">
            A Philosophy Shared by the House
          </h2>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-surface)] md:aspect-[2/3] lg:aspect-square">
            <ResponsiveImage
              src="/images/hanging-ornament-leaf-pendants.jpg"
              sizes="(min-width: 1180px) 424px, (min-width: 1024px) 36vw, (min-width: 768px) 30vw, calc(100vw - 48px)"
              alt="A dark hanging ornament with leaf-shaped pendants, suspended in front of NOYA's turquoise facade and white balcony"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-3 lg:space-y-5">
            <p className="text-left text-body text-[var(--color-text-secondary)]">
              The relationship between craftsmanship and preservation is central to NOYA.
            </p>
            <p className="text-left text-body text-[var(--color-text-secondary)]">
              The house itself was restored with an appreciation for what already existed: its original materials, its architectural character, and the marks of time that gave it individuality. The objects within it were gathered with the same instinct.
            </p>
            <p className="text-left text-body text-[var(--color-text-secondary)]">
              Across Nepal, artisans continue this relationship between material and memory. Their work preserves skills while allowing traditions to evolve. A carved window, a cast bronze image, a handwoven rug, or a painted devotional scroll is more than an object; it is the outcome of knowledge carried forward through practice.
            </p>
            <p className="text-left text-body text-[var(--color-text-secondary)]">
              NOYA celebrates this continuity, recognising that heritage remains meaningful when it is understood, valued, and allowed to live beyond the past.
            </p>
          </div>
        </div>
      </section>

      <div className="[&>section>div]:max-w-editorial [&>section>div]:pt-[calc(var(--spacing-section)*0.7)] [&_h2]:mt-6 [&_p]:mt-4 [&_p]:max-w-[52ch] [&_p]:text-pretty [&_ul]:mt-6">
        <PartnerCta
          id="visit"
          logo={{ src: ameyaLogo, alt: "AMEYA Studio", sizes: "160px", frameClassName: "h-16 w-16" }}
          heading="Meet the Traditions Where They Still Live"
          headingClassName="max-w-[26ch] text-balance"
          description={ameyaStudio.idea}
          links={[{ label: "Visit AMEYA Studio", href: ameyaStudio.href }]}
        />
      </div>
    </>
  );
}
