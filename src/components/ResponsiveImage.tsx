import type { ComponentPropsWithoutRef } from "react";
import { coverScaledSizes, webpSrcSet } from "./imageSources";

// Most content images sit in a 7-of-12 column (max ~720px) on desktop and
// span the width on phones.
const DEFAULT_SIZES = "(min-width: 1280px) 720px, (min-width: 768px) 58vw, 100vw";

/**
 * Drop-in <img> that adds the generated WebP width variants as a <source>,
 * so the browser downloads a file sized for the slot instead of the
 * full-size original. The original stays as the <img> fallback. The
 * <picture> wrapper is `display: contents`, so existing sizing classes on
 * the <img> (absolute / h-full / object-cover) behave exactly as before.
 *
 * `coverAspect` (the frame's width ÷ height) matters for object-cover
 * frames: a photo wider than its frame is cropped at the sides and has to
 * be drawn wider than the frame, so `sizes` is scaled up to match.
 */
export default function ResponsiveImage({
  src,
  sizes = DEFAULT_SIZES,
  coverAspect,
  ...img
}: ComponentPropsWithoutRef<"img"> & { src: string; coverAspect?: number }) {
  const srcSet = webpSrcSet(src);
  if (!srcSet) return <img src={src} {...img} />;
  return (
    <picture className="contents">
      <source
        type="image/webp"
        srcSet={srcSet}
        sizes={coverAspect ? coverScaledSizes(src, sizes, coverAspect) : sizes}
      />
      <img src={src} {...img} />
    </picture>
  );
}
