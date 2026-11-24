import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SolidCta from "./SolidCta";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The Reserve page's "Have you sent your email?" dialog, shown when the
 * visitor comes back from the pre-filled reservation email (mailto:).
 *
 * The website can't know whether that email was sent, so nothing here says
 * it was delivered or received: "ask" takes the visitor's word for it, and
 * "sent" only offers to clear the form, which happens solely on their
 * explicit choice. Every other way out (close, Escape, the backdrop, the
 * secondary buttons) is `onKeep`, which leaves the form untouched.
 *
 * Follows the lightbox in RoomGallery: portalled to <body>, scroll lock,
 * Escape, Tab kept inside. In addition the page itself (#root) is made
 * inert while open, so nothing behind the dim can be clicked, tabbed to or
 * read by a screen reader. Desktop: a centred ivory panel. Mobile: a
 * bottom sheet.
 */
export default function ReservationSentDialog({
  step,
  onConfirmSent,
  onClear,
  onKeep,
}: {
  /** null when closed. */
  step: "ask" | "sent" | null;
  onConfirmSent: () => void;
  onClear: () => void;
  onKeep: () => void;
}) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingId = useId();
  const descriptionId = useId();
  const isOpen = step !== null;

  // Scroll lock and an inert page behind the dialog while open.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.getElementById("root");
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root?.setAttribute("inert", "");
    return () => {
      document.body.style.overflow = previous;
      root?.removeAttribute("inert");
    };
  }, [isOpen]);

  // Focus starts on the heading (so it's read first, and Enter can't press
  // an action by accident), and moves to the new heading when "sent"
  // replaces "ask" under the button that was just pressed. Done as each
  // heading mounts: the cross-fade keeps the old one in place until it's
  // gone, so focusing on the step change would land on the leaving one.
  const focusHeading = useCallback((el: HTMLHeadingElement | null) => {
    headingRef.current = el;
    el?.focus();
  }, []);

  // Escape keeps the details; Tab and Shift+Tab stay inside the dialog.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onKeep();
      } else if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>("button");
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === headingRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onKeep]);

  const content =
    step === "sent"
      ? {
          eyebrow: "Your reservation",
          heading: "Thank you.",
          description:
            "You've confirmed that you sent your reservation email. You can now clear your details or keep them on this page.",
          primary: { label: "Clear reservation details", onClick: onClear },
          secondary: "Keep my details",
          note: null,
        }
      : {
          eyebrow: "Your reservation",
          heading: "Have you sent your email?",
          description:
            "Your reservation details were prepared in Gmail. Once you've sent your email, you can finish here.",
          primary: { label: "Yes, I've sent my email", onClick: onConfirmSent },
          secondary: "Not yet, keep my details",
          note: "Your reservation is not confirmed until NOYA receives your request.",
        };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-6 bg-[var(--color-background-dark)]/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease }}
          // A click on the dim itself (not the panel) keeps the details.
          onClick={(e) => {
            if (e.target === e.currentTarget) onKeep();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            aria-describedby={descriptionId}
            className="relative w-full sm:max-w-[30rem] max-h-[calc(100svh-2rem)] overflow-y-auto bg-[var(--color-background)] border-t sm:border border-[var(--color-border)] px-6 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-12 sm:pt-12 sm:pb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: reduced ? 0 : 0.45, ease }}
          >
            <button
              type="button"
              onClick={onKeep}
              aria-label="Close and keep my details"
              className="absolute right-2 top-2 sm:right-3 sm:top-3 flex h-11 w-11 items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>

            {/* Cross-fades between "ask" and "sent" inside the same panel. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
              >
                <span className="eyebrow">{content.eyebrow}</span>
                {/* A focus target for reading order only, never a control,
                    so it opts out of the site's (unlayered) focus ring; an
                    inline style is the one thing that outranks it. */}
                <h2
                  ref={focusHeading}
                  id={headingId}
                  tabIndex={-1}
                  style={{ outline: "none" }}
                  className="mt-4 font-display text-heading text-[var(--color-text)] text-balance"
                >
                  {content.heading}
                </h2>
                <p id={descriptionId} className="mt-4 text-small text-[var(--color-text-secondary)] text-pretty">
                  {content.description}
                </p>

                <div className="mt-8 flex flex-col items-stretch gap-5">
                  <SolidCta type="button" onClick={content.primary.onClick} className="w-full">
                    {content.primary.label}
                  </SolidCta>
                  {/* The site's quiet secondary-action style (as ArrowLink):
                      underline on hover, enlarged tap area. */}
                  <button
                    type="button"
                    onClick={onKeep}
                    className="group relative self-center inline-flex text-button uppercase text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200 before:absolute before:inset-x-0 before:-inset-y-2.5 before:content-['']"
                  >
                    <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-current">
                      {content.secondary}
                    </span>
                  </button>
                </div>

                {content.note && (
                  <p className="mt-8 border-t border-[var(--color-border)] pt-5 text-caption text-[var(--color-text-muted)]">
                    {content.note}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
