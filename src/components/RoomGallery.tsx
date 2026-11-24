import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ResponsiveImage from "./ResponsiveImage";

type Photo = { src: string; alt: string };

const ease = [0.16, 1, 0.3, 1] as const;

/** Every room photo is visible; the featured image anchors the first two rows. */
export default function RoomGallery({ photos, title }: { photos: readonly Photo[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const show = (i: number) => (e: React.MouseEvent<HTMLElement>) => {
    triggerRef.current = e.currentTarget;
    setOpen(i);
  };
  const close = useCallback(() => {
    setOpen(null);
    // Back to the tile that opened it, so keyboard users keep their place.
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  if (!photos.length) return null;
  const [featured, ...rest] = photos;
  const featuredSpan = rest.length ? "md:col-span-2" : "md:col-span-4";
  const featuredRows = rest.length > 1 ? "md:row-span-2" : "";

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Tile
          photo={featured}
          onClick={show(0)}
          label={`Open photograph 1 of ${photos.length}: ${featured.alt}`}
          className={`col-span-2 aspect-[4/3] ${featuredSpan} ${featuredRows} ${rest.length > 1 ? "md:aspect-auto" : ""}`}
          sizes={rest.length ? "(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1280px) 1280px, 100vw"}
        />
        {rest.map((photo, i) => {
          const index = i + 1;
          const mobileWide = rest.length % 2 === 1 && index === photos.length - 1;
          const desktopWide = rest.length <= 2 || (rest.length === 3 && i === 0);
          const desktopAspect = desktopWide && rest.length > 1 ? "md:aspect-[8/3]" : "md:aspect-[4/3]";
          return (
            <Tile
              key={photo.src}
              photo={photo}
              onClick={show(index)}
              label={`Open photograph ${index + 1} of ${photos.length}: ${photo.alt}`}
              className={`${mobileWide ? "col-span-2" : "col-span-1"} aspect-[4/3] ${desktopWide ? "md:col-span-2" : "md:col-span-1"} ${desktopAspect}`}
              sizes={desktopWide
                ? `(min-width: 1280px) 640px, (min-width: 768px) 50vw, ${mobileWide ? "100vw" : "50vw"}`
                : `(min-width: 1280px) 320px, (min-width: 768px) 25vw, ${mobileWide ? "100vw" : "50vw"}`}
            />
          );
        })}
      </div>

      <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={close} title={title} />
    </>
  );
}

function Tile({
  photo,
  onClick,
  label,
  className,
  sizes,
}: {
  photo: Photo;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  label: string;
  className: string;
  sizes: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group relative block w-full overflow-hidden bg-[var(--color-background-secondary)] cursor-zoom-in ${className}`}
    >
      <ResponsiveImage
        src={photo.src}
        alt={photo.alt}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-[var(--color-background-dark)]/0 transition-colors duration-500 group-hover:bg-[var(--color-background-dark)]/10" />
    </button>
  );
}

function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
  title,
}: {
  photos: readonly Photo[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
  title: string;
}) {
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeX = useRef<number | null>(null);
  const swiped = useRef(false);
  const isOpen = index !== null;
  const count = photos.length;

  const step = useCallback(
    (d: number) => {
      if (index === null) return;
      onIndex((index + d + count) % count);
    },
    [index, count, onIndex],
  );

  // Scroll lock and initial focus while open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Escape closes, arrows step, Tab stays inside the dialog.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, step]);

  const photo = index !== null ? photos[index] : null;
  const fade = reduced ? { duration: 0 } : { duration: 0.35, ease };

  return createPortal(
    <AnimatePresence>
      {photo && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}: photographs`}
          className="focus-on-dark fixed inset-0 z-[70] flex flex-col bg-[var(--color-background-dark)] text-[var(--color-text-on-dark)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
        >
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <p className="text-caption text-[var(--color-text-on-dark-secondary)]" aria-live="polite">
              {(index ?? 0) + 1} / {count}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center gap-2 px-2 text-button uppercase text-[var(--color-text-on-dark)] hover:text-[var(--color-primary-on-dark)] transition-colors"
            >
              Close
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>

          <div
            className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-24 pb-6 md:pb-10 touch-pan-y"
            onPointerDown={(e) => {
              swipeX.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (swipeX.current === null) return;
              const dx = e.clientX - swipeX.current;
              swipeX.current = null;
              swiped.current = Math.abs(dx) > 50;
              if (swiped.current) step(dx < 0 ? 1 : -1);
            }}
            onClick={(e) => {
              // A click on the backdrop (not the photo, and not the end of a swipe) closes.
              if (e.target === e.currentTarget && !swiped.current) onClose();
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={photo.src}
                className="h-full w-full flex items-center justify-center pointer-events-none"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ResponsiveImage
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(min-width: 768px) 85vw, 100vw"
                  decoding="async"
                  draggable={false}
                  className="pointer-events-auto max-h-full max-w-full object-contain select-none"
                />
              </motion.div>
            </AnimatePresence>

            {count > 1 && (
              <>
                <NavButton dir="prev" onClick={() => step(-1)} />
                <NavButton dir="next" onClick={() => step(1)} />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function NavButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous photograph" : "Next photograph"}
      className={`absolute top-1/2 -translate-y-1/2 ${
        dir === "prev" ? "left-2 md:left-6" : "right-2 md:right-6"
      } flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-background-dark)]/50 text-[var(--color-text-on-dark)] border border-[var(--color-border-dark)] hover:bg-[var(--color-background-dark)]/80 transition-colors`}
    >
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d={dir === "prev" ? "M11 3L5 9l6 6" : "M7 3l6 6-6 6"} />
      </svg>
    </button>
  );
}
