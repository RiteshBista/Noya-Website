import { useState } from "react";
import { faqs } from "../data/site";

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--color-hairline)]">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-6 py-6 text-left transition-colors ${
          open ? "border-l-2 pl-4 -ml-4" : ""
        }`}
        style={open ? { borderColor: "var(--color-sage)" } : undefined}
      >
        <span className="text-[17px] md:text-lg font-normal text-[var(--color-paper)]">{q}</span>
        <span
          className={`shrink-0 text-xl text-[var(--color-sage)] transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div className={`accordion-panel ${open ? "open" : ""}`}>
        <div>
          <p className="pb-6 max-w-2xl text-[15px] leading-relaxed text-[var(--color-paper-dim)]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-[var(--color-ink)] py-24 md:py-36 px-6 md:px-10">
      <div className="mx-auto max-w-[860px]">
        <div className="mb-14 text-center">
          <span className="eyebrow">Questions</span>
          <h2 className="mt-4 font-display text-[clamp(28px,4vw,44px)] text-[var(--color-paper)]">
            Before you write to us.
          </h2>
        </div>

        <div>
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              q={item.q}
              a={item.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
