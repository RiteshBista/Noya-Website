import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-ink)]"
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
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src="/images/noya-logo.png"
                alt="Noya Logo"
                className="h-5 w-auto"
              />
            </motion.span>

            {/* Art · Heritage · History */}
            <motion.span
              className="font-display text-sm tracking-[0.18em] text-[var(--color-paper)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.9,
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
                delay: 1.8,
                duration: 0.8,
              }}
            >
              Gairidhara &middot; Est. Restoration
            </motion.span>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}