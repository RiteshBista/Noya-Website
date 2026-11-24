/** How long the first-load Loader stays fully opaque before fading. */
export const LOADER_MS = 1300;

// Evaluated once, as the app bundle starts — the Loader's own timer starts
// a few milliseconds later, when it mounts. (Not navigation start: the
// render-blocking font stylesheet can delay the app by a second or more.)
const appStart = performance.now();

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Seconds left before the first-load Loader starts fading — so the Home
 * hero can time its entrance to the loader's exit rather than a fixed
 * multi-second delay. Returns 0 on client-side navigations (the loader is
 * long gone) and under reduced motion (the loader is skipped).
 */
export function loaderRemainingSeconds() {
  if (prefersReducedMotion()) return 0;
  return Math.max(0, (appStart + LOADER_MS - performance.now()) / 1000);
}
