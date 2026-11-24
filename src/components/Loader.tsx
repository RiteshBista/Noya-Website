import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { LOADER_MS, prefersReducedMotion } from "./loaderTiming";

import ResponsiveImage from "./ResponsiveImage";
export default function Loader() {
  // Skipped entirely for visitors who prefer reduced motion — it's a purely
  // decorative intro that would otherwise hide the page for over a second.
  const [visible, setVisible] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), LOADER_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-background)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-4">

            {/* Noya Logo */}
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.05em" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link to="/" aria-label="Noya Home">
                <ResponsiveImage
                  src="/images/noya_logo.png" sizes="80px"
                  alt="Noya Logo"
                  className="h-5 w-auto"
                />
              </Link>
            </motion.span>

            {/* Art · Heritage · History */}
            <motion.span
              className="font-display text-sm tracking-[0.18em] text-[var(--color-text)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              ART · HERITAGE · HISTORY
            </motion.span>

            {/* Location / Restoration */}
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.75,
                duration: 0.4,
              }}
            >
              Gairidhara &middot; Kathmandu
            </motion.span>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}