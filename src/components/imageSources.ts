import { imageVariants } from "../data/imageVariants";

/**
 * Lookups into the generated WebP width variants (/images/w/<stem>-<w>.webp,
 * see src/data/imageVariants.ts). Works for both public paths
 * (/images/suite.jpg) and Vite-built asset URLs, whose file names carry an
 * 8-character content hash (/assets/about-hero-facade-BRoQzc6H.jpg).
 */
function stemOf(src: string) {
  const file = decodeURIComponent(src.split(/[?#]/)[0].split("/").pop() ?? "");
  const stem = file.replace(/\.(jpe?g|png|webp)$/i, "");
  const isBuiltAsset = /(^|\/)assets\/[^/]+$/.test(src) && !src.includes("/src/assets/");
  return isBuiltAsset ? stem.replace(/-[A-Za-z0-9_-]{8}$/, "") : stem;
}

export function variantsFor(src: string) {
  const stem = stemOf(src);
  const v = imageVariants[stem];
  return v ? { stem, ...v } : null;
}

/** `srcset` of WebP variants, or undefined when the image has none. */
export function webpSrcSet(src: string) {
  const v = variantsFor(src);
  return v ? v.w.map((w) => `/images/w/${v.stem}-${w}.webp ${w}w`).join(", ") : undefined;
}

/** A single WebP variant at least `minWidth` wide (or the largest), for
 * places that can't take a srcset, such as a <video poster>. */
export function webpUrl(src: string, minWidth: number) {
  const v = variantsFor(src);
  if (!v) return src;
  const w = v.w.find((x) => x >= minWidth) ?? v.w[v.w.length - 1];
  return `/images/w/${v.stem}-${w}.webp`;
}

/**
 * Scales each slot length in a `sizes` list for an object-cover frame of
 * shape `frameAspect` (width ÷ height): when the photo is wider than the
 * frame it's height-limited and drawn wider than the slot, by the ratio of
 * the two shapes. Media conditions are left untouched.
 */
export function coverScaledSizes(src: string, sizes: string, frameAspect: number) {
  const v = variantsFor(src);
  if (!v || v.ar <= frameAspect) return sizes;
  const k = v.ar / frameAspect;
  return sizes
    .split(",")
    .map((entry) =>
      entry.replace(/(\d+(?:\.\d+)?)(px|vw)\s*$/, (_, n: string, unit: string) => `${Math.ceil(+n * k)}${unit}`),
    )
    .join(",");
}

/**
 * `sizes` for an image that `object-fit: cover`s a full-bleed hero about
 * `heightShare` of the viewport tall. On viewports narrower than the
 * image's own shape (e.g. a landscape photo on a phone) the image is
 * height-limited and must be wider than the screen, so a plain `100vw`
 * would pick a variant that's visibly too small.
 */
export function coverSizes(src: string, heightShare = 0.9) {
  const v = variantsFor(src);
  if (!v) return "100vw";
  const ratio = Math.round(heightShare * v.ar * 1000);
  return `(max-aspect-ratio: ${ratio}/1000) ${Math.ceil(heightShare * v.ar * 100)}vh, 100vw`;
}
