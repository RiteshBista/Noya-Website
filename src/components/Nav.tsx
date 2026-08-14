import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-10 py-5"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#top" >
        <img src="images/noya-logo.png" alt="Noya Logo" className="h-5 w-auto" />
      </a>
      <nav className="hidden md:flex items-center gap-8 eyebrow tracking-[0.28em]">
        <a href="#rooms" className="hover:text-[var(--color-paper)] transition-colors">Rooms</a>
        <a href="#restoration" className="hover:text-[var(--color-paper)] transition-colors">Restoration</a>
        <a href="#stay" className="hover:text-[var(--color-paper)] transition-colors">Rates</a>
        <a href="#faq" className="hover:text-[var(--color-paper)] transition-colors">FAQ</a>
      </nav>
      <a
        href="#stay"
        className="border border-[var(--color-hairline)] px-4 py-2 text-xs tracking-[0.2em] uppercase text-[var(--color-paper)] hover:border-[var(--color-sage)] hover:text-[var(--color-sage)] transition-colors"
      >
        Reserve
      </a>
    </motion.header>
  );
}
