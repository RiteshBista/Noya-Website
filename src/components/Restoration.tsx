import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { restorationSteps } from "../data/site";

import ResponsiveImage from "./ResponsiveImage";
gsap.registerPlugin(ScrollTrigger);

export default function Restoration() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".restoration-row");
      rows.forEach((row) => {
        const media = row.querySelector(".restoration-media");
        const text = row.querySelector(".restoration-text");
        gsap.fromTo(
          media,
          { opacity: 0, scale: 1.06 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 78%" },
          }
        );
        gsap.fromTo(
          text,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 75%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="restoration"
      ref={sectionRef}
      className="relative bg-[var(--color-background-secondary)] pt-section lg:pt-section-follow pb-section lg:pb-0 px-6 md:px-10"
    >
      <div className="mx-auto max-w-page">
        <div className="mb-10 md:mb-4">
          <span className="eyebrow">The Restoration</span>
          <h2 className="mt-4 font-display text-heading text-[var(--color-text)] max-w-xl">
            Three decisions, made in order.
          </h2>
        </div>

        {/* Three chapters. From lg, II and III each fill the screen below the
            navbar (a minimum height, so nothing can clip), photo and text
            centred in it; I follows the heading closely instead, so heading
            and first chapter share the first screen (the section continues
            The House on the same ground, hence the short follow-on top step).
            Each chapter: photo 13 / text 12, alternating sides. The square photo is
            capped by the screen height so it always fits a chapter on short
            laptops, and sits against the outer margin. Tablet keeps the
            alternating columns at natural height; phones stack, photo first.
            Square shares the crop fairly between the two landscape photos and
            the portrait one; each photo's subject is kept in frame by its
            imagePosition. */}
        {restorationSteps.map((step, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={step.mark}
              className={`restoration-row grid grid-cols-1 items-center gap-8 border-[var(--color-divider)] py-10 md:gap-10 md:py-14 lg:gap-16 lg:py-16 xl:gap-20 ${
                i > 0 ? "border-t lg:min-h-[calc(100svh-var(--nav-height))]" : "pt-0 md:pt-10 lg:pt-8"
              } ${flip ? "md:grid-cols-[minmax(0,12fr)_minmax(0,13fr)]" : "md:grid-cols-[minmax(0,13fr)_minmax(0,12fr)]"}`}
            >
              <div className={`restoration-media ${flip ? "md:order-2" : ""}`}>
                <div
                  className={`aspect-square w-full lg:max-w-[calc(100svh-var(--nav-height)-8rem)] ${flip ? "lg:ml-auto" : ""}`}
                >
                  <ResponsiveImage
                    src={step.image}
                    sizes="(min-width: 1280px) 624px, (min-width: 768px) 50vw, 100vw"
                    alt={step.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: step.imagePosition }}
                  />
                </div>
              </div>
              <div className={`restoration-text ${flip ? "md:order-1" : ""}`}>
                <span className="block font-display text-5xl leading-none text-[var(--color-primary)] lg:text-6xl">
                  {step.mark}
                </span>
                <h3 className="mt-5 font-display text-heading text-[var(--color-text)]">
                  {step.title}
                </h3>
                {/* Fills its column (no max-width of its own): the grid gap is
                    then the only space between photo and text, whichever side
                    the photo is on. Capped narrower, a flipped row's spare
                    column width landed between text and photo instead. */}
                <p className="mt-5 text-lead text-[var(--color-text-secondary)]">
                  {step.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
