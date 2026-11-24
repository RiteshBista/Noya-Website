/**
 * Directional overlay for full-bleed hero media. Hero text sits in the
 * lower part of the frame, so instead of a flat dark wash over the whole
 * picture (which made every film read as night), this is a light base tint
 * plus a bottom-up gradient concentrated behind the text block — the upper
 * part of the frame keeps its real tones.
 *
 * The gradient is a fixed height from the bottom (capped at the hero's own
 * height), not a percentage of the hero: the text block is pinned to the
 * bottom with fixed padding, so it occupies roughly the same pixel band at
 * every viewport. A percentage gradient thinned out exactly where the
 * eyebrow sits on shorter heroes (e.g. 1280×800).
 *
 * Strength is chosen per hero from measured text-zone contrast on that
 * hero's actual footage (worst bright frame), not one global value:
 * - "light"  — footage that's already dark/mid-tone behind the text.
 * - "medium" — mixed footage with occasional bright highlights.
 * - "strong" — bright or soft footage where the text zone needs more help.
 * The film grain stays on top, as before.
 */
const strengths = {
  light: {
    base: "bg-[var(--color-background-dark)]/10",
    gradient:
      "from-[var(--color-background-dark)]/75 via-[var(--color-background-dark)]/35 via-65% to-transparent",
  },
  medium: {
    base: "bg-[var(--color-background-dark)]/20",
    gradient:
      "from-[var(--color-background-dark)]/80 via-[var(--color-background-dark)]/45 via-70% to-transparent",
  },
  strong: {
    base: "bg-[var(--color-background-dark)]/30",
    gradient:
      "from-[var(--color-background-dark)]/85 via-[var(--color-background-dark)]/55 via-70% to-transparent",
  },
} as const;

export type HeroScrimStrength = keyof typeof strengths;

export default function HeroScrim({ strength = "medium" }: { strength?: HeroScrimStrength }) {
  const s = strengths[strength];
  return (
    <>
      <div className={`absolute inset-0 ${s.base}`} aria-hidden="true" />
      <div
        // Full height on phones: narrow screens wrap hero text onto more
        // lines, so the text block reaches higher up the frame.
        className={`absolute inset-x-0 bottom-0 h-full sm:h-[min(100%,40rem)] bg-gradient-to-t ${s.gradient}`}
        aria-hidden="true"
      />
      <div className="grain absolute inset-0" aria-hidden="true" />
    </>
  );
}
