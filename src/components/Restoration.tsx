import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { restorationSteps } from "../data/site";

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
      className="relative bg-[var(--color-panel)] py-24 md:py-36 px-6 md:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 md:mb-24">
          <span className="eyebrow">The Restoration</span>
          <h2 className="mt-4 font-display italic text-[clamp(28px,4vw,44px)] text-[var(--color-paper)] max-w-xl">
            Three decisions, made in order.
          </h2>
        </div>

        <div className="flex flex-col gap-20 md:gap-32">
          {restorationSteps.map((step, i) => (
            <div
              key={step.mark}
              className={`restoration-row grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center ${
                i % 2 === 1 ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className="restoration-media md:col-span-7 md:[direction:ltr]">
                <div className="relative aspect-[4/3] overflow-hidden border border-[var(--color-hairline)]">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="restoration-text md:col-span-5 md:[direction:ltr]">
                <span className="font-display italic text-5xl text-[var(--color-sage)]">
                  {step.mark}
                </span>
                <h3 className="mt-4 text-[clamp(20px,2.5vw,28px)] font-normal text-[var(--color-paper)]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-paper-dim)]">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
