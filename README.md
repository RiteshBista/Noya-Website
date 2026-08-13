# NOYA — Landing Page

A single-page site for NOYA, an 18th-century heritage home in Gairidhara,
Kathmandu. Built with React + Vite + TypeScript + Tailwind CSS v4 + GSAP
(ScrollTrigger) + Framer Motion + hls.js, following the section structure
of the HYLIOX reference brief, reskinned entirely in NOYA's own brand —
sage/moss greens, warm charcoal, Instrument Serif italic display type,
and the property's own photography.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Structure

- `src/App.tsx` — assembles the page
- `src/components/` — Loader, Nav, Hero, RoomsGrid (bento), Restoration
  (three-step story), Guestbook (testimonials), Rates (room pricing),
  Faq (accordion), FinalCta (marquee), Footer
- `src/data/site.ts` — all copy: rooms, restoration steps, guest notes,
  rates, FAQ, contact details. Edit this file to update content without
  touching components.
- `public/images/` — property photography, already re-compressed for web.

## Notes on the tech choices

- **hls.js**: `src/components/HlsBackground.tsx` plays an HLS stream in
  the hero if you set a `src` prop pointing at an `.m3u8` URL; NOYA
  doesn't currently host one, so it falls back to the still exterior
  photo. Wire up a real stream by passing `src` in `Hero.tsx`.
- **GSAP ScrollTrigger** drives the alternating reveal in the
  "Restoration" section; everything else uses Framer Motion for
  simpler viewport-triggered reveals.
- **Tailwind v4** is configured CSS-first in `src/index.css` under
  `@theme` — that's where every color, font, and radius token lives.
- `prefers-reduced-motion` disables the scroll-triggered GSAP timeline
  and shortens Framer Motion/CSS transitions.

## Before going live

- Add a real reservations email in `src/data/site.ts` (`contact` is
  missing one, per the brief).
- Swap in real, current room rates.
- Optional: replace the still hero image with an HLS stream via
  `HlsBackground`.
