# Media optimization notes

## Responsive images

Every photo in `public/images/` (plus a few bundled images in `src/assets/` and the two NOYA logo PNGs) has WebP width variants in `public/images/w/<stem>-<width>.webp`. The originals are never modified.

- **Widths:** 480, 800, 1200, 1600 and 2400, never wider than the source. The source's own width is added as the top step when it's more than 120px beyond the last step.
  - Logos: 240, 480 and 960.
  - The Beirut and AMEYA marks: 240 and 480.
- **Encoding:** photos are WebP at quality 80, effort 5, with EXIF orientation applied. Logos and marks are WebP at quality 90 with full-quality alpha.
- **Manifest:** `src/data/imageVariants.ts` is generated. Each entry is keyed by file stem, so both `/images/foo.jpg` and Vite's hashed `/assets/foo-<hash>.jpg` resolve.
- **Delivery:**
  - Most images go through `ResponsiveImage`: a `<picture>` with a WebP `srcset` source, falling back to the original file.
  - `PageHero` stills and the `SectionPreview` slideshow write the same `<source>` directly.
  - Helpers live in `src/components/imageSources.ts`.
- **When adding a new photo:** add it to `public/images/`, then run these from the repo root:
  1. `npm i --no-save sharp@0.33` — this installs sharp temporarily and doesn't change `package.json`.
  2. `node scripts/gen-image-variants.mjs` — this rewrites `public/images/w/` and the manifest.

  An image without variants still works; it just isn't resized.

## Video

All videos already have `moov` at the front (faststart).

Re-encoding `noya-loop.mp4` (1920×1080, 12.8 MB, about 1.5 Mbit/s) was tested and rejected:

| x264 setting | Size | SSIM vs. current |
|---|---|---|
| CRF 23 | 16.1 MB | 0.995 |
| CRF 25 | 13.9 MB | 0.994 |
| CRF 28 | 10.9 MB | 0.992 |
| CRF 30 | 9.1 MB | 0.989 |

The current file is already efficient. Meaningful savings would cost visible quality on dark, candle-lit footage, where banding shows first.

`noya-loop-poster.jpg` is now frame 0 of `noya-loop.mp4`. The previous poster was the frame at about 2.0s, partway into the slow push-in, so the picture visibly zoomed out when playback started. The mobile file starts on the same frame.

### Home hero carousel clips

The Home hero (`src/components/Hero.tsx`) cycles five films, each cut from a page's own hero film. The source films are unchanged and still used by their pages. Every clip is H.264 High, yuv420p, faststart. Each poster is the clip's frame 0, shown only under reduced motion or if the clip fails to load.

| Slide | File | Source and cut | Length |
|---|---|---|---|
| Home | `home-hero-25s.mp4` (1920×1080), `home-hero-25s-mobile.mp4` (1280×720, phones) | `noya-loop.mp4` / `noya-loop-mobile.mp4`, frames 0–599 (0–25s). The desktop file is a stream copy, bit-identical to the source frames. The mobile file is re-encoded at CRF 21 (SSIM 0.995), because a stream-copy cut there left its last frame referencing a dropped frame. | 25.000s |
| Events | `events-hero-25s.mp4` (720×1280) | `kumari.mp4` 7.833–32.833s: one continuous run of the original edit (offering, procession, idol, drummers). CRF 23 (SSIM 0.984; CRF 20 was 8 MB for no visible gain on this grainy footage). | 25.000s |
| Restaurant | `restaurant-hero-22s.mp4` (720×1280) | `beirut-video.mp4` 0–22.208s, stream copy: all the food footage, ending at the cut to the white Beirut card. | 22.208s |
| Local Artisan | `local-artisan-hero-25s.mp4` (1276×720) | `ameya-video.mp4` 15.474–30.948s (torch, shaping), a 0.5s crossfade, then 35.327–45.353s (beading, the finished bangle). Converted from 23.976 to 24 fps so 600 frames are exactly 25s. CRF 23 (SSIM 0.994). | 25.000s |
| Travel & Tour | `src/assets/ananya-holidays-videos.mp4`, imported directly | The whole film: one continuous 24.1s time-lapse. | 24.133s |

Restaurant and Travel & Tour are shorter than 25s because those films have no more usable footage. They were not padded, slowed, or looped to reach 25s. Longer source footage would allow full 25s cuts. Events and Restaurant are portrait films, so wide screens show a band of each frame (Events at `object-[50%_30%]`, as on its page).

Re-encodes used `-c:v libx264 -preset slow -crf 23 -profile:v high -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart`, with a 0.3s fade in and 0.4s fade out on the audio at the loop seam.

## Source assets still needed

### 1. Landscape hero footage for Events and Restaurant

`kumari.mp4` and `beirut-video.mp4` are 720×1280 portrait. They play at every screen size, covering the full-height hero. On landscape desktop screens they are enlarged about 2× and only a band of each frame (about a third of its height) is visible. Events frames that band about 30% from the top (`object-[50%_30%]`); Restaurant uses the centre. Some shots read soft at that size. Landscape footage removes this limitation.

To restore motion on desktop, supply for each:
- **Format:** 16:9, at least 1920×1080 (2560×1440 preferred). H.264 High, yuv420p, 24 or 25 fps, faststart.
- **Length and size:** a 15–30s seamless loop, about 6–8 MB.
- **Framing:**
  - Keep the subject in the upper two-thirds and the central 75% of the width. Desktop heroes crop to about 2:1, and 1280×800 crops further at the sides.
  - Keep the bottom 35–40% calm and mid-to-dark: it carries the headline over a gradient.
  - No logo cards inside the loop. The current Beirut clip has one at about 15s.
- **Grade:** warm and mid-tone, with no clipped highlights behind the text area.

### 2. Heritage hero resolution

The Heritage hero, `masked-dance-before-seated-child-musicians.jpg`, is NOYA's own photograph of a masked dance in the courtyard, at 1192×1600 (portrait). On a 1440px desktop it is drawn about 1.2× and cropped to the top of the frame (`imagePosition="55% 8%"`).
- **Needed:** the camera original of this photograph, or another courtyard performance photograph, at least 2400px wide.

(The Art hero is now Bhaktapur's Peacock Window, an openly licensed 4913×3264 photograph, so the old Art-hero resolution note no longer applies.)

### 3. Events still

The courtyard masked-dance still the Events hero used to carry is now the Heritage hero; see note 2.

### 4. AMEYA photos

`crafted.webp` (352×627) and `designer.webp` (582×1035) are low resolution. `crafted` is 1.14× in its Local Artisan frame on desktop, and about 1.8–1.9× on phones and in the Discover card.
- **Needed:** originals at least 1200px wide, preferably 1600px.

### 5. Home hero, phone cut

`noya-loop-mobile.mp4` is 1280×720 (16:9). On a 390×767 phone hero only the central 29% of each frame's width is visible. Tablet portrait shows 59%.

A sweep of every fixed horizontal crop position across the whole loop (1 fps) found that centred (50%) is already the best. The interest moves shot to shot: the best per-frame crop centre ranges from about 19% to 85% of the width. No CSS `object-position` value improves the crop, and the site keeps the centred crop.

To fix this, supply:
- **Format:** a genuine 9:16 cut of the same edit, at least 1080×1920 (720×1280 is acceptable), H.264, faststart, under about 4 MB.
- **Length:** the same duration (60.8s), with the same first frame for a poster handoff. Otherwise also supply a matching frame-0 poster.
- **Framing:** subjects framed for portrait, rather than cropped from the 16:9 master.

`VideoBackground` already serves `srcMobile` through `<source media>`, so adopting it is a one-line change in `Hero.tsx`. Phones download only that one file.

## Integration points for replacement assets

None of these needs structural rework.

**After any image swap:**
1. Re-run `node scripts/gen-image-variants.mjs` (with `npm i --no-save sharp@0.33` installed). Width variants and `src/data/imageVariants.ts` are regenerated, and `ResponsiveImage`, `PageHero` and `SectionPreview` pick them up automatically.
2. Update the asset's entry in `src/data/media.ts`: `localPath`, `alt`, and the dimensions in its notes.
3. Re-measure hero text contrast if the image is a hero (the brightest region behind the text). If a stronger scrim is needed, change only that page's `scrim` prop.

### Home phone video (9:16)

- **Current:** `public/videos/noya-loop-mobile.mp4` (16:9).
- **Wired in:** `src/components/Hero.tsx` passes `srcMobile` to `VideoBackground`, which serves it through `<source media="(max-width: 767px)">`. The browser selects one source at load, so a device never downloads both files.
- **Swap:**
  - Point `srcMobile` at the new file, or replace the file at the same path.
  - The landscape poster (`noya-loop-poster.jpg`) would no longer match a portrait first frame on phones. Supply a 9:16 frame-0 poster, and add a `posterMobile` prop to `VideoBackground` that is selected with the same media query (the `poster` attribute can't take media queries).
  - Decide whether tablet portrait (768–1023px wide) should also get the portrait cut. Today it gets the landscape file, showing 59% of the width. Note that `VideoBackground` uses 767px while `HlsBackground` uses 768px; align them if both change.
- **Unchanged:** muted autoplay, the sound button, and reduced motion (which shows the poster only).

### Events and Restaurant landscape footage (16:9)

- **Current:** Events uses `public/videos/kumari.mp4`; Restaurant uses `src/assets/beirut-video.mp4` (imported). Both are portrait and play at every size. Neither hero passes an `image`, so there's no poster or reduced-motion still (client request).
- **Swap, keeping portrait on phones:**
  - Add a `videoSrcMobile` passthrough prop on `PageHero`. `HlsBackground` already supports `videoSrcMobile` via `<source media>`.
  - Pass the landscape file as `videoSrc` and the portrait file as `videoSrcMobile`, and drop Events' `videoClassName` object-position.
  - The `image` stays the poster and the reduced-motion still. Supply a landscape frame-0 poster if the still doesn't match the first frame.
- **Swap, landscape only:** replace `videoSrc`. Drop Events' `videoClassName` if the new footage is centred.

### Openly licensed hero photographs (Art, History)

- **Current:** `/images/peacock-window-bhaktapur.jpg` (Art) and `/images/patan-durbar-square-morning.jpg` (History): 2400px web copies of Creative Commons photographs from Wikimedia Commons. The full originals are in `media-originals/photos/*-original.jpg`.
- **Licence terms:** both are CC BY-SA. Each hero shows a `credit` line with the photographer, licence and source link (a `PageHero` prop). Keep that credit if the image stays, and remove it with the image.
- **Swap:** replace the file at the same path (or point `image=` elsewhere), update `imageAlt`, `credit` and `imagePosition`, and regenerate the variants.

### Heritage hero photo (2400px or wider)

- **Current:** `/images/masked-dance-before-seated-child-musicians.jpg` (1192×1600), set in `src/pages/Heritage.tsx` via `PageHero image=` with `imagePosition="55% 8%"`, and used as the Heritage card in the Discover menu.
- **Swap:** put a larger original at the same path and regenerate the variants; `coverSizes()` then selects the larger widths automatically. Re-check the crop on desktop and phone, since the dancer's mask and the seated child sit in the upper part of the frame.

### AMEYA photography (at least 1200px wide)

- **Current:**
  - `src/assets/designer.webp` (582px) — imported in `src/pages/LocalArtisan.tsx`.
  - `src/assets/crafted.webp` (352px) — imported in `LocalArtisan.tsx` and in `src/data/site.ts` (the Discover and Home "Local Artisan" cards).
- **Swap:**
  - Replace the files, keeping the names, or update the two imports.
  - Add both names to the bundled-asset list in `scripts/gen-image-variants.mjs` (the line listing `about-hero-facade.jpg`, `restoration-brick-rubble.jpg`), so they get width variants too.
  - The 3:4 frames and the `alt` text stay as they are.

### 6. Optional

These are drawn larger than their resolution in some slots:
- `local-artisan.jpg` (970px)
- `travel-tour.jpg` (667px)
- `archival-noya-courtyard.jpg` (478px; a magazine crop, so likely can't be improved)

## Media library layout (2026-10 audit)

- `public/images/` holds every photo the site serves, with descriptive, lowercase, hyphenated names that say what the photo shows (for example `carved-wooden-guardian-mask.jpg`, not `artifact-telephone.jpg`). Each has WebP variants in `public/images/w/`. Video posters (`*-poster.jpg`) are skipped by the variant script and used as-is.
- `public/videos/` holds the served MP4s.
- `src/assets/` holds only files imported by components (logos, partner videos, `about-hero-facade.jpg`, `restoration-brick-rubble.jpg`, `archival-noya-courtyard.jpg`, the AMEYA photos). The Vite template files `hero.png`, `react.svg` and `vite.svg` are unused leftovers. `video1.mov` and `video2.mp4` are gitignored camera masters.
- `media-originals/photos/` holds originals that aren't served:
  - camera masters that are larger than their web copy, named `<web-name>-original.<ext>` (iPhone HEIC files, and a few JPEGs that had a wrong `.HEIC` extension);
  - owner-supplied photos not currently placed on a page: more afternoon tea and plated-dinner shots, a chocolate log cake, geranium-lined passages, carved details, restoration-era photos and the Yatra magazine scans.

  These aren't bundled or deployed.
- `media-originals/videos/` holds a second acoustic-set clip and a 4s tableside-dumplings clip, both unused.
- `media-originals/noya images/` holds the client's 2026-10 WhatsApp batch, kept exactly as supplied: 20 photos and one video. Five are published as byte-identical copies under descriptive names (see the last block of `src/data/media.ts`):
  - the courtyard at night from a balcony (Events, Spaces);
  - three Raz photography guest photos (Events, Guests), shown whole so the watermark stays visible;
  - a tea tasting (About, Founder).

  The rest are unused for now: more frames of the same evening, a cricket team photo taken away from the house, styled afternoon-tea food shots, and a 7s balcony pan of the courtyard audience.
- `media-originals/unpublished/` holds web-ready photos taken off the site because no page uses them: a B&W bathtub and towel rail, a masked-dance frame that repeats a moment already in the Events gallery, the elephant passage at night, and (since the 2026-10 Art page rewrite) a low-key B&W tea stand and a guest room with a rattan chair. A second masked-dance frame was restored from here as the Heritage hero. Their old WebP variants are in `unpublished/w/`. To publish one, move the JPEG back to `public/images/` and regenerate.
- **Git LFS:** the original source repository retains the `media-originals/` archive in Git LFS. This release includes the hero loop as a regular Git asset and the Hotel photo under `src/assets/`. The build does not read `media-originals/`. The variant script reads only `media-originals/photos/<stem>-original.jpg` masters, and only when they match the served file's size; when a master is an un-pulled pointer or missing, it warns and falls back to the served JPEG (today only `about-hero-facade` and `facade-dusk` have such masters, so only their WebPs would change slightly).
- When the same photo existed twice at the same resolution, the higher-bitrate copy was kept at the served path and the other removed. Lower-resolution or recompressed copies (WhatsApp re-sends, 320px thumbnails) were removed.
