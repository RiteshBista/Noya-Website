import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import EditorialIntro from "../components/EditorialIntro";
import PartnerCta from "../components/PartnerCta";
import { beirut, pageSeo } from "../data/site";
import beirutLogo from "../assets/beirut_logo.jpg";
import beirutVideo from "../assets/beirut-video.mp4";

import ResponsiveImage from "../components/ResponsiveImage";
export default function Restaurant() {
  return (
    <>
      <Seo
        {...pageSeo.restaurant}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: beirut.name,
          servesCuisine: "Lebanese",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Gairidhara, Kathmandu",
            addressCountry: "NP",
          },
          sameAs: [beirut.instagram, beirut.facebook],
        }}
      />
      <PageHero
        eyebrow={beirut.name}
        title="A Meeting of Cultures at the Table"
        subtitle={beirut.tagline}
        // Video only, no poster or still image (client request). Until the
        // first frame arrives the hero shows PageHero's dark background.
        videoSrc={beirutVideo}
        controls
        // The supplied film ends on a white Beirut title card (22.1s to the
        // end): loop before it, so the hero stays on the food and white hero
        // text never sits over a white frame on phones.
        videoLoopEnd={21.5}
      />

      <EditorialIntro id="about" eyebrow={beirut.category} title="Levantine cooking, mid-city.">
        <p>
          Food has a way of bringing different cultures into the same room. At NOYA, Beirut
          introduces Lebanese cuisine into the setting of a historic Kathmandu home, creating a
          distinct dining experience beneath the same roof.
        </p>
        <p>
          The restaurant occupies its own space within the property, with an identity and
          atmosphere separate from the hotel's heritage interiors. Together, they create an
          experience shaped by the pleasure of discovering something unexpected.
        </p>
        <p>
          {beirut.description} {beirut.hours}.
        </p>
      </EditorialIntro>

      <section id="experience" className="relative bg-[var(--color-background-secondary)] border-y border-[var(--color-border)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-page grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* food.jpg is a 4:5 portrait; a 4:3 frame cut the spread to its
              middle 60%. A portrait frame in a narrower column shows it whole. */}
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <ResponsiveImage
                src="/images/food.jpg"
                sizes="(min-width: 1280px) 500px, (min-width: 768px) 40vw, 100vw"
                alt="A Beirut spread of mezze, dips and salads on a woven table runner"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <span className="eyebrow">Dining Experience</span>
            <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
              The Pleasure of Gathering Around a Table
            </h2>
            <p className="mt-6 text-body text-[var(--color-text-secondary)] max-w-md">
              {beirut.experience}
            </p>
          </div>
        </div>
      </section>

      <section id="place" className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-reading text-center">
          <span className="eyebrow">Place</span>
          <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
            Where Different Worlds Meet at the Table
          </h2>
          <p className="mt-6 text-body text-[var(--color-text-secondary)] max-w-xl mx-auto">
            {beirut.place}
          </p>
        </div>
      </section>

      <PartnerCta
        id="visit"
        logo={{ src: beirutLogo, alt: "Beirut", sizes: "160px", frameClassName: "h-16 w-16" }}
        heading="Discover Beirut through NOYA."
        // Short enough for one line: on desktop the default 20ch measure is
        // lifted; phones keep it and wrap naturally.
        headingClassName="max-w-[20ch] lg:max-w-none"
        description="Beirut is run as its own restaurant inside the NOYA building. Follow it for menus and news, or simply come by."
        links={[
          { label: "Instagram", href: beirut.instagram },
          { label: "Facebook", href: beirut.facebook },
        ]}
      />
    </>
  );
}
