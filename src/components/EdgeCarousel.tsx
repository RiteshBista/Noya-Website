import { useEffect, useRef, type CSSProperties } from "react";
import { useInView } from "framer-motion";
import ResponsiveImage from "./ResponsiveImage";
import { variantsFor } from "./imageSources";

export type EdgeCarouselItem = {
  image: string;
  alt: string;
  title?: string;
  body?: string;
  /** object-position for a photo whose subject sits off-centre. */
  position?: string;
};

// Card shape. From md up each card takes its photo's own proportions,
// clamped so a very tall portrait or a wide landscape can't dominate the
// row, unless the caller sets one `aspect` for every card. Phones use one
// 4:5 card, sized so the next card peeks in at the right edge.
const PHONE_ASPECT = 0.8;
const photoAspect = (src: string) => Math.min(1.4, Math.max(0.75, variantsFor(src)?.ar ?? PHONE_ASPECT));

// Auto-scroll speed, and how long the strip waits after the visitor last
// scrolled or swiped it before moving on its own again.
const SPEED_PX_PER_S = 36;
const RESUME_AFTER_MS = 2000;

/**
 * A row of photographs that starts at the content margin and runs off the
 * right edge of the viewport, drifting slowly to the left on its own and
 * looping without end.
 *
 * It is a native horizontal scroller, so trackpads, touch swipes (with
 * their momentum) and the keyboard scroll it as usual, and vertical page
 * scrolling passes straight through. The photographs are rendered three
 * times and the scroll position is kept inside the middle copy, so the loop
 * has no seam in either direction; the two outer copies are hidden from
 * assistive tech.
 *
 * The drift is one requestAnimationFrame loop. It pauses while the pointer
 * is over the strip, while keyboard focus is inside it, while it's off
 * screen, and for a moment after the visitor scrolls it by hand; under
 * `prefers-reduced-motion: reduce` it never runs. Browsers may round
 * scrollLeft to whole pixels, so the sub-pixel remainder is applied as a
 * transform on the track, keeping slow movement smooth.
 *
 * Must sit inside a container whose content box is the site's content
 * column; the caller clips horizontal overflow at the viewport (see
 * `overflow-x-clip` on the wrapping section).
 */
export default function EdgeCarousel({
  id,
  label,
  items,
  onIndexChange,
  aspect,
}: {
  id: string;
  /** Accessible name of the carousel region. */
  label: string;
  items: readonly EdgeCarouselItem[];
  /** Called with the index of the photograph at the content margin. */
  onIndexChange?: (index: number) => void;
  /** One card shape (width ÷ height) for every card from md up, instead of
   * each photo's own proportions; photos are then cropped to it. */
  aspect?: number;
}) {
  const cardAspect = (src: string) => aspect ?? photoAspect(src);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const onIndexRef = useRef(onIndexChange);
  onIndexRef.current = onIndexChange;

  // Cards beyond the right edge are outside the viewport, so native lazy
  // loading would leave them blank until they drift in. Once the strip
  // nears the viewport, every card loads.
  const near = useInView(scrollerRef, { once: true, margin: "600px 0px" });

  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    const count = items.length;
    const cards = () => track.children as HTMLCollectionOf<HTMLElement>;

    // Geometry of one copy: where it starts, how wide it is (including the
    // gap to the next copy) and where each card sits within it.
    let setStart = 0;
    let setWidth = 0;
    let offsets: number[] = [];
    const measure = () => {
      const c = cards();
      setStart = c[count].offsetLeft;
      setWidth = c[2 * count].offsetLeft - setStart;
      offsets = Array.from({ length: count }, (_, i) => c[count + i].offsetLeft - setStart);
    };

    let pos = 0; // float scroll position the drift advances
    let written = 0; // scrollLeft as last set by the drift
    let lastIndex = -1;
    const setScroll = (x: number) => {
      pos = x;
      scroller.scrollLeft = x;
      written = scroller.scrollLeft;
      track.style.transform = `translate3d(${written - pos}px,0,0)`;
    };
    const clearRemainder = () => {
      track.style.transform = "";
    };
    // Keep the position inside the middle copy; a whole copy's width away
    // the strip looks identical, so the jump can't be seen.
    const wrap = (x: number) => {
      if (setWidth <= 0) return x;
      if (x < setStart) return x + setWidth;
      if (x >= setStart + setWidth) return x - setWidth;
      return x;
    };
    const reportIndex = (x: number) => {
      if (!setWidth) return;
      const rel = (((x - setStart) % setWidth) + setWidth) % setWidth;
      let best = 0;
      let bestDist = Infinity;
      offsets.forEach((o, i) => {
        const d = Math.min(Math.abs(o - rel), setWidth - Math.abs(o - rel));
        if (d < bestDist) { bestDist = d; best = i; }
      });
      if (best !== lastIndex) {
        lastIndex = best;
        onIndexRef.current?.(best);
      }
    };

    measure();
    setScroll(setStart);
    clearRemainder();
    reportIndex(pos);

    // Pause conditions.
    let hovering = false;
    let focused = false;
    let onScreen = false;
    let userUntil = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motion.matches;

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(now - last, 64) : 0; // no leap after a stall
      last = now;
      if (hovering || focused || now < userUntil) return;
      setScroll(wrap(pos + (SPEED_PX_PER_S * dt) / 1000));
      reportIndex(pos);
    };
    const start = () => {
      if (raf || reduced || !onScreen) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // A scroll the drift didn't make is the visitor's: hand over, wrap at
    // the copy boundaries, and hold the drift off for a moment.
    const onScroll = () => {
      const x = scroller.scrollLeft;
      if (Math.abs(x - written) < 1) return;
      userUntil = performance.now() + RESUME_AFTER_MS;
      clearRemainder();
      const w = wrap(x);
      if (w !== x) scroller.scrollLeft = w;
      pos = written = scroller.scrollLeft;
      reportIndex(pos);
    };
    // Touch can hold the strip without scrolling it yet.
    const onTouchStart = () => {
      userUntil = Number.POSITIVE_INFINITY;
      clearRemainder();
    };
    const onTouchEnd = () => {
      userUntil = performance.now() + RESUME_AFTER_MS;
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = false;
    };
    const onFocusIn = () => { focused = true; };
    const onFocusOut = (e: FocusEvent) => {
      if (!scroller.contains(e.relatedTarget as Node | null)) focused = false;
    };
    const onMotionChange = () => {
      reduced = motion.matches;
      if (reduced) { stop(); clearRemainder(); } else start();
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start(); else stop();
    });
    io.observe(scroller);
    // Card widths follow the viewport (and images settle after loading):
    // re-measure, keeping the same place within the copy.
    const ro = new ResizeObserver(() => {
      const rel = setWidth ? pos - setStart : 0;
      measure();
      setScroll(wrap(setStart + rel));
      if (!raf) clearRemainder();
    });
    ro.observe(track);

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchend", onTouchEnd, { passive: true });
    scroller.addEventListener("touchcancel", onTouchEnd, { passive: true });
    scroller.addEventListener("pointerenter", onEnter);
    scroller.addEventListener("pointerleave", onLeave);
    scroller.addEventListener("focusin", onFocusIn);
    scroller.addEventListener("focusout", onFocusOut);
    motion.addEventListener("change", onMotionChange);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchend", onTouchEnd);
      scroller.removeEventListener("touchcancel", onTouchEnd);
      scroller.removeEventListener("pointerenter", onEnter);
      scroller.removeEventListener("pointerleave", onLeave);
      scroller.removeEventListener("focusin", onFocusIn);
      scroller.removeEventListener("focusout", onFocusOut);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [items]);

  const hasCaptions = items.some((item) => item.title || item.body);
  // Three copies: the middle one is the real gallery, the outer two only
  // make the loop seamless.
  const copies = [0, 1, 2];

  return (
    <div
      ref={scrollerRef}
      id={id}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      // Runs from the content margin to the viewport's right edge (the
      // parent's content box is centred, so 50% − 50vw reaches it).
      // Card height: phones size the 4:5 card to leave ~3rem of the next
      // one showing; tablets and desktops take it from the viewport so the
      // section (heading, row and captions) fits on one screen.
      className="relative mr-[calc(50%-50vw)] overflow-x-auto overflow-y-hidden overscroll-x-contain scrollbar-hide [--gap:12px] md:[--gap:20px] lg:[--gap:24px] [--card-h:min(calc((100vw-5rem)*1.25),62svh)] md:[--card-h:clamp(340px,46svh,460px)] lg:[--card-h:clamp(420px,calc(100svh-var(--nav-height,80px)-284px),580px)]"
    >
      <div ref={trackRef} className="flex w-max gap-(--gap) will-change-transform">
        {copies.flatMap((copy) =>
          items.map((item, i) => {
            const ar = cardAspect(item.image);
            const real = copy === 1;
            return (
              <figure
                key={`${copy}-${item.image}`}
                role={real ? "group" : undefined}
                aria-roledescription={real ? "slide" : undefined}
                aria-label={real ? `${i + 1} of ${items.length}${item.title ? `: ${item.title}` : ""}` : undefined}
                aria-hidden={real ? undefined : true}
                style={{ "--ar": ar } as CSSProperties}
                className="m-0 shrink-0 w-[calc(var(--card-h)*0.8)] md:w-[calc(var(--card-h)*var(--ar))]"
              >
                <div className="relative h-(--card-h) overflow-hidden bg-[var(--color-surface)]">
                  <ResponsiveImage
                    src={item.image}
                    sizes={`(min-width: 1024px) ${Math.ceil(580 * ar)}px, (min-width: 768px) ${Math.ceil(460 * ar)}px, 80vw`}
                    coverAspect={ar}
                    alt={real ? item.alt : ""}
                    loading={near ? "eager" : "lazy"}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover select-none"
                    style={item.position ? { objectPosition: item.position } : undefined}
                  />
                </div>
                {hasCaptions && (
                  <figcaption className="pt-4 pr-4 min-h-[7.5rem]">
                    {item.title && <h3 className="font-display text-title text-[var(--color-text)]">{item.title}</h3>}
                    {item.body && <p className="mt-1 text-caption text-[var(--color-text-secondary)]">{item.body}</p>}
                  </figcaption>
                )}
              </figure>
            );
          }),
        )}
      </div>
    </div>
  );
}
