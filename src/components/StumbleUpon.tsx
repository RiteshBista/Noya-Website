import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { roomPhotos } from "../data/rooms";
import { stumbleUponItems } from "../data/site";
import ResponsiveImage from "./ResponsiveImage";

// object-position for photos cropped into the square frame (four of the six
// are portraits), so the subject stays in view.
const positions: Record<string, string> = {
  "/images/carved-wooden-guardian-mask.jpg": "50% 30%",
  "/images/heritage-fireplace.jpg": "50% 55%",
  "/images/afternoon-tea-silver-pour-fireplace.jpg": "50% 45%",
  [roomPhotos.bay1.src]: "50% 55%",
};

/**
 * "The Collection": object-level details as a horizontal strip of equal square
 * cards. The strip starts at the content margin and runs to the right edge
 * of the viewport, so the next card peeks in to show there is more: one
 * card per view on phones, two on tablets, three on small laptops and four
 * on desktops. There are no visible controls; it is a native scroller with
 * snap points, so trackpads, touch and shift + wheel move it, the Left/Right
 * arrow keys step it by a card while it has focus, and a mouse can drag it.
 * Vertical wheel scrolling is left to the page. No autoplay.
 */
export default function StumbleUpon() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // One card's width plus the gap: the distance between snap points.
  const step = () => {
    const track = trackRef.current;
    const [first, second] = track?.querySelectorAll("li") ?? [];
    return first && second ? second.offsetLeft - first.offsetLeft : 0;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    trackRef.current?.scrollBy({
      left: (e.key === "ArrowRight" ? 1 : -1) * step(),
      behavior: reduceMotion() ? "auto" : "smooth",
    });
  };

  // Mouse drag. Snapping is paused while dragging (it would fight each
  // scrollLeft write), then the row settles on the nearest card.
  const drag = useRef<{ x: number; left: number } | null>(null);
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !trackRef.current) return;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!drag.current || !track) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) < 4 && track.style.scrollSnapType !== "none") return;
    if (track.style.scrollSnapType !== "none") {
      track.setPointerCapture(e.pointerId);
      track.style.scrollSnapType = "none";
      track.style.cursor = "grabbing";
    }
    track.scrollLeft = drag.current.left - dx;
  };
  const endDrag = () => {
    const track = trackRef.current;
    drag.current = null;
    if (!track || track.style.scrollSnapType !== "none") return;
    const s = step();
    track.style.cursor = "";
    track.scrollTo({ left: s ? Math.round(track.scrollLeft / s) * s : track.scrollLeft, behavior: reduceMotion() ? "auto" : "smooth" });
    window.setTimeout(() => { track.style.scrollSnapType = ""; }, 400);
  };

  return (
    // Only used on Home, directly after the About preview, so it takes the
    // short follow-on top step (see --spacing-section-follow).
    <section id="stumble-upon" className="@container bleed-grid [--bleed-content-max:1280px] relative bg-[var(--color-surface)] pt-section-follow pb-16 md:pb-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-10">
        <div>
          <span className="eyebrow">The Collection</span>
          <h2 className="mt-3 font-display text-heading text-[var(--color-text)]">
            <span className="block">Objects With a Past.</span>
            <span className="block">Beauty With a Purpose.</span>
          </h2>
          <p className="mt-3 text-body text-[var(--color-text)] max-w-lg">
            A lifetime of collecting, brought together under one roof.
          </p>
        </div>
        <p className="max-w-xs text-body text-[var(--color-text-secondary)] md:text-right lg:w-full lg:max-w-[23rem] lg:text-left lg:text-balance">
          Small, unannounced details, found while moving from one room to the next.
        </p>
      </div>

      {/* Card width comes from the content column (--col, measured against
          the section via cqw), so N cards fill it exactly and the next one
          shows in the right-hand gutter. The -my/py pair keeps the focus
          ring inside the scroll box, which clips both axes. */}
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Things you stumble upon at NOYA. Use the left and right arrow keys to scroll."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="col-[content-start/full-end] mt-8 md:mt-10 -my-2 py-2 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-hide select-none cursor-grab pr-(--bleed-gutter) [--gap:16px] md:[--gap:20px] xl:[--gap:24px] [--col:min(100cqw-2*var(--bleed-gutter),var(--bleed-content-max))]"
      >
        <ul className="flex w-max gap-(--gap)">
          {stumbleUponItems.map((item, i) => (
            <li
              key={item.image}
              aria-label={`${i + 1} of ${stumbleUponItems.length}: ${item.title}`}
              className="group shrink-0 snap-start w-[calc(var(--col)*0.86)] md:w-[calc((var(--col)-var(--gap))/2)] lg:w-[calc((var(--col)-2*var(--gap))/3)] xl:w-[calc((var(--col)-3*var(--gap))/4)]"
            >
              <div className="relative aspect-square overflow-hidden bg-[var(--color-background-secondary)]">
                <ResponsiveImage
                  src={item.image}
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 31vw, (min-width: 768px) 46vw, 86vw"
                  coverAspect={1}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
                  style={positions[item.image] ? { objectPosition: positions[item.image] } : undefined}
                />
              </div>
              <h3 className="mt-4 font-display text-title text-[var(--color-text)]">{item.title}</h3>
              <p className="mt-1 text-caption text-[var(--color-text-secondary)]">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
