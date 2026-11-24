import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores expected scroll behaviour across route changes: jump to top on
 * a fresh navigation, or scroll to the matching element when a link points
 * at a hash (used by the Discover mega menu's in-page sub-links).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // On a direct load (a shared or bookmarked /about#founder), the page's
      // lazily loaded code hasn't rendered yet, so the target doesn't exist
      // on the first pass. Start at the top, then scroll to the target as
      // soon as it appears, for up to a few seconds.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      const observer = new MutationObserver(() => {
        const target = document.getElementById(id);
        if (target) {
          stop();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      const timer = window.setTimeout(() => observer.disconnect(), 4000);
      const stop = () => {
        observer.disconnect();
        window.clearTimeout(timer);
      };
      observer.observe(document.body, { childList: true, subtree: true });
      return stop;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
