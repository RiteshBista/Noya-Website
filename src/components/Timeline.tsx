export type TimelineStep = {
  mark: string;
  era: string;
  title: string;
  body: string;
};

/**
 * Shared editorial timeline, used for the History page's `valleyTimeline`
 * (the Kathmandu Valley from its first settlements to today). Every usage
 * sits on the site's light background, so `theme` defaults to "light"; the
 * "dark" branch is kept only in case a dark accent section needs it.
 */
export default function Timeline({
  steps,
  theme = "light",
}: {
  steps: readonly TimelineStep[];
  theme?: "light" | "dark";
}) {
  const isLight = theme === "light";
  return (
    // 80px between steps (gap + the rule's top padding); it was 120px, which
    // left each step floating apart from the next on a desktop.
    <div className="flex flex-col gap-10 md:gap-12">
      {steps.map((step) => (
        <div
          key={step.mark}
          className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start border-t pt-8 ${
            isLight ? "border-[var(--color-border)]" : "border-[var(--color-border-dark)]"
          }`}
        >
          <div className="md:col-span-3 lg:col-span-2">
            <span
              className={`font-display text-4xl ${
                isLight ? "text-[var(--color-primary)]" : "text-[var(--color-text-on-dark)]"
              }`}
            >
              {step.mark}
            </span>
            <p className={`mt-2 eyebrow ${isLight ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-on-dark-secondary)]"}`}>
              {step.era}
            </p>
          </div>
          <div className="md:col-span-9 lg:col-span-10">
            <h3 className={`font-display text-title ${isLight ? "text-[var(--color-text)]" : "text-[var(--color-text-on-dark)]"}`}>
              {step.title}
            </h3>
            <p
              className={`mt-3 max-w-2xl text-body ${
                isLight ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-on-dark-secondary)]"
              }`}
            >
              {step.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
