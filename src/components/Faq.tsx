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
    <div className="border-b border-[var(--color-border)]">
      {/* Every row has the same geometry, open or closed: the question fills
          the row from the left edge, the icon sits in a fixed 24px square at
          the far right, and the item's bottom border spans both. The open
          row's green rule is drawn just outside the column (a decorative
          ::before), so it never shifts the button, text or icon. */}
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={`relative flex w-full items-center justify-between gap-6 py-6 lg:py-4 text-left transition-colors ${
          open ? "before:absolute before:inset-y-0 before:-left-4 before:w-0.5 before:bg-[var(--color-primary)]" : ""
        }`}
      >
        <span className="min-w-0 flex-1 text-lead font-normal text-[var(--color-text)]">{q}</span>
        <span
          className={`flex size-6 shrink-0 items-center justify-center text-xl leading-none text-[var(--color-primary)] transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div className={`accordion-panel ${open ? "open" : ""}`}>
        <div>
          <p className="pb-6 max-w-2xl text-body text-[var(--color-text-secondary)]">
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
    <section id="faq" className="bleed-grid [--bleed-content-max:1280px] relative bg-[var(--color-background)]">
      {/* On the same content column as the bleed-grid section above it
          (left-aligned with that heading). The question rows span the full
          column, so every + sits on the content's right edge; each answer
          keeps its own readable measure (max-w-2xl). */}
      <div>
        {/* From lg the heading gap and each row's padding are tighter (32px;
            16px above and below a question), so the heading and all eight
            questions sit in one desktop screen, with the first answer open. */}
        <div className="mb-14 lg:mb-8">
          <span className="eyebrow">Questions</span>
          <h2 className="mt-4 font-display text-heading text-[var(--color-text)]">
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
