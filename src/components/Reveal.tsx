import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Shared scroll-reveal for editorial imagery — a slow, quiet opacity + small
 * upward drift, the same easing the rest of the site's motion already uses.
 * Deliberately not applied everywhere: RoomsGrid, StumbleUpon, and Discover
 * already have their own reveal treatment (see those components) and are
 * left alone; this exists for the image moments added/touched in this pass
 * that had none (About, Heritage, Hotel, History, Art).
 *
 * Content is never hidden while JS/animation is unavailable — `initial`
 * only takes effect once framer-motion has mounted and measured the
 * viewport, and `useReducedMotion` skips the animation state entirely
 * (renders already-settled) for visitors who've asked the OS for reduced
 * motion, rather than relying on the CSS-only `prefers-reduced-motion`
 * override in index.css, which can't reach framer-motion's own transforms.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
  margin = "-10% 0px",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  margin?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
