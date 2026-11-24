# NOYA — Website

A multi-page marketing site for NOYA, a restored early 20th-century heritage
home in Gairidhara, Kathmandu, and the small circle of independent
businesses that share its address: 327 Restaurant, Beirut (Lebanese
restaurant), AMEYA Studio (jewellery), and Ananya Holidays (travel agency).
Built with React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion, GSAP,
and hls.js.

## Tech Stack

| Technology | Used for |
| --- | --- |
| **React 19** + **TypeScript** | Component-based UI, typed props/data |
| **Vite** | Dev server and production bundling (`@vitejs/plugin-react`) |
| **React Router v7** | Client-side routing (`BrowserRouter`, lazy-loaded routes) |
| **Tailwind CSS v4** | Utility-first styling, configured CSS-first via `@theme` in `src/index.css` |
| **Framer Motion** | Viewport-triggered reveal animations, page/menu transitions |
| **GSAP** (+ ScrollTrigger) | The scroll-driven, alternating reveal in the "Restoration" story on the About page |
| **hls.js** | Optional HLS (`.m3u8`) video streaming for hero backgrounds — wired up but not currently used with a live stream (see [Assets](#images--video)) |
| **oxlint** | Linting (`npm run lint`) |

No CMS, backend, or database is present — all copy lives in a single
TypeScript data file, and the two interactive forms send email via
`mailto:` / Gmail compose links rather than an API.

## Project Structure

```text
noya-site/
├── index.html                # entry HTML — static <title>/meta, Google Fonts
├── public/
│   ├── favicon.svg
│   ├── icons.svg              # currently unreferenced (see Known Issues)
│   ├── images/                 # all photography actually used on the site
│   └── videos/                 # noya-loop(.mp4/-mobile.mp4), discover-loop.mp4, kumari.mp4
├── src/
│   ├── assets/                 # imported (bundled) media — partner logos/videos,
│   │                            # plus a large batch of unused source images (see Known Issues)
│   ├── components/             # shared, reusable UI
│   ├── data/
│   │   └── site.ts             # all page copy, nav structure, and per-page SEO
│   ├── pages/                  # one component per route
│   ├── index.css               # Tailwind v4 import + design tokens (@theme)
│   ├── App.tsx                 # route table
│   └── main.tsx                # React root, BrowserRouter
├── vite.config.ts
├── tsconfig*.json
└── package.json
```

## Pages & Routes

Routing is handled by `react-router-dom` in [App.tsx](src/App.tsx). `Home`
loads eagerly; every other route is `React.lazy`-loaded behind a
`Suspense` boundary.

| Route | Page component | Purpose |
| --- | --- | --- |
| `/` | `Home` | Landing page: video hero, then a preview strip for every other section of the site (About, Hotels, Rooms, Dining, Events, Shop), guest quotes, FAQ, final CTA, and a map |
| `/discover` | `Discover` | Full-screen video hero + a card grid linking to every top-level page — the site's "table of contents" |
| `/about` | `About` | The house's story, the three-step restoration narrative (via `Restoration`), architecture, Kathmandu/Gairidhara context, and a room photo gallery |
| `/hotels` | `Hotels` | The property itself: room grid, architecture, links out to Dining/Events, map, and a `Hotel` JSON-LD block |
| `/rooms` | `Rooms` | Explicitly states NOYA has no rooms offering today; placeholder for a future programme |
| `/dining` | `Dining` | 327 Restaurant (NOYA's own dining room): concept, atmosphere, photo gallery, `Restaurant` JSON-LD |
| `/events` | `Events` | Event types hosted at the house (artist talks, poetry readings, etc.), gallery, enquiry CTA |
| `/shop` | `Shop` | "ART Gallery" / NOYA Shop — explicitly marked **Coming Soon**, no products for sale |
| `/restaurant` | `Restaurant` | Profile page for **Beirut**, an independent Lebanese restaurant inside the NOYA building (not operated by NOYA) |
| `/local-artisan` | `LocalArtisan` | Profile page for **AMEYA Studio**, an independent jewellery maker NOYA points guests toward |
| `/travel-tour` | `TravelTour` | Profile page for **Ananya Holidays**, an independent travel agency NOYA recommends |
| `/reserve` | `Reserve` | Reservation enquiry form (see [Forms](#forms)) |
| `/privacy`, `/terms`, `/accessibility` | `Legal` (3 named exports) | Static legal copy, sharing one layout component |
| `*` | `NotFound` | 404 page with a link back home |

**Not routed:** `src/pages/Wellness.tsx` exists but its entire contents are
commented out, and its route/nav entry/`pageSeo` entry are commented out in
`App.tsx` and `src/data/site.ts`. NOYA currently has no spa/wellness
programme, so this page was disabled rather than deleted — treat it as
inactive code, not a working page.

**Navigation gap:** the header/footer nav (`primaryNav` in `site.ts`) links
to Discover, About, Hotels, Rooms, Events, Restaurant, Local Artisan,
and Travel & Tour — but **not** to Dining or Shop, even though both have
live routes. Those two are reachable only via in-page links (the homepage
preview sections, Hotels' "Discover Dining" link, etc.).

## Components

All in `src/components/`:

| Component | Responsibility |
| --- | --- |
| `Nav` | Fixed header — logo, desktop link row, "Reserve" button, and a full-screen mobile menu; background fades in on scroll |
| `Footer` | Site-wide footer — logo/blurb, nav links, contact/social links, legal links, agency credit |
| `Loader` | Full-screen splash animation shown for ~3.2s on load (logo + tagline) |
| `Hero` | Home page's full-viewport video hero with a multi-step intro text animation |
| `PageHero` | Shared hero banner for every interior page — static image or looping video background, eyebrow/title/subtitle, used by every non-home page |
| `HlsBackground` | Background video player behind `Hero`/`PageHero`/`Discover`. Prefers an HLS stream (`src`, via hls.js) if provided, falls back to a plain looped `.mp4` (`videoSrc`), falls back again to a static `poster` image; optional play/mute overlay controls |
| `SectionPreview` | Reusable alternating image/text block — used repeatedly on `Home` to preview About/Hotels/Rooms/Dining/Events/Shop |
| `RoomsGrid` | Bento-style photo grid of the house's rooms, reused on `Home` and `Hotels` |
| `Restoration` | The "three decisions" restoration story on `About`, animated with GSAP ScrollTrigger |
| `Guestbook` | Grid of guest testimonial quotes |
| `Faq` | Accordion of frequently asked questions |
| `FinalCta` | Closing call-to-action with an infinite CSS marquee |
| `Location` | Embedded Google Map + address/contact/check-in details, reused on `Home` and `Hotels` |
| `Seo` | Per-route `<head>` management — see [SEO Status](#seo-status) |
| `ScrollToTop` | Scrolls to top on route change, or to a target element when navigating to a link with a hash |

## Data Layer

Nearly all site copy lives in [src/data/site.ts](src/data/site.ts): room
descriptions, the restoration narrative, guest quotes, FAQ entries, contact
details, the nav structure, per-partner content (327/Beirut/AMEYA/Ananya),
and a `pageSeo` record used by the `Seo` component. Editing content
generally means editing this one file rather than the components that
render it.

Two exports are defined but currently unused by any page: `stayTiers`
(room pricing data — no `Rates`/pricing component exists) and
`discoverPartner`. Kept in the file but not rendered anywhere.

## Forms

- **Reserve page** (`/reserve`): a controlled React form (check-in/out
  dates, guests, room preference, name, email, phone, message). On submit
  it builds a `mailto:`/Gmail-compose URL from the field values and opens
  it in a new tab — there is no backend, booking engine, or email API. The
  same email link is offered directly on the page as an alternative.
- No other page has a form; the enquiry flow throughout the site is
  `tel:`/`mailto:` links pointing at the same contact details.

## Images & Video

- **`public/images/`** — the photography actually used across the site
  (facade, courtyard, rooms, dining/event galleries, restoration
  before/after shots). Referenced by absolute path (`/images/...`) from
  pages and `src/data/site.ts`, so Vite serves them unprocessed.
- **`public/videos/`** — `noya-loop.mp4` / `noya-loop-mobile.mp4` (Home
  hero), `discover-loop.mp4` (Discover hero) and `kumari.mp4` (Events hero,
  phones/tablet portrait), all looping background clips.
- **`src/assets/`** — imported (and therefore bundled/hashed) media:
  partner logos and video clips for the Restaurant, Local Artisan, and
  Travel & Tour pages (`beirut_logo.jpg`, `ameya_logo.jpg`,
  `ananya-holidays-logo.png`, `beirut-video.mp4`, `ameya-video.mp4`,
  `ananya-holidays-videos.mp4`) plus two AMEYA process photos
  (`designer.webp`, `crafted.webp`). This same directory also holds a
  large batch of unused files — see [Known Issues](#known-issues--improvements).
- **HLS streaming**: `HlsBackground` is built to play a live `.m3u8` stream
  via hls.js if a `src` prop is passed to it, but no page currently passes
  one — every hero video today is a local `.mp4`.

## Styling & Responsive Design

Tailwind v4 is configured CSS-first: all color, font, and radius tokens
are defined once in `src/index.css` under `@theme` (`--color-ink`,
`--color-sage`, `--font-display`, etc.), then consumed as Tailwind
utilities (`bg-[var(--color-ink)]`) or, in `Location.tsx`, as generated
utility classes (`bg-ink`, `text-paper-dim`). Layout is built with
Tailwind's grid/flex utilities and responsive breakpoints (`sm:`, `md:`,
`lg:`, `xl:`) — most sections switch from a single column to a 12-column
grid at `md:`, and the desktop nav collapses to a full-screen mobile menu
below `xl:`. `prefers-reduced-motion` is respected globally (CSS
transition/animation durations are collapsed) and specifically disables
the GSAP ScrollTrigger timeline and the background-video autoplay (falls
back to a static poster image).

## Current Features

- Client-side routing across 16 routes (including the 404 catch-all) with route-based code splitting
  (`React.lazy` + `Suspense`)
- Full-viewport looping video heroes with play/mute controls, HLS-ready
  but currently serving local `.mp4` files, and automatic image fallback
- Framer Motion scroll-reveal animations throughout (section previews,
  cards, testimonials) and a GSAP ScrollTrigger timeline on the About page
- Sticky header that changes background on scroll, plus a full-screen
  animated mobile nav menu
- Per-route document `<title>`, meta description, canonical URL, Open
  Graph tags, and Twitter card, applied client-side on every navigation
  (see [SEO Status](#seo-status))
- `Hotel`/`Restaurant` JSON-LD structured data on the Hotels, Dining, and
  Restaurant pages
- FAQ accordion, testimonial grid, embedded Google Map with directions
  link, infinite CSS marquee
- Reservation enquiry form that opens a pre-filled email compose window
- Reduced-motion support (disables/shortens animations and video
  autoplay for users who request it)
- Responsive layout from mobile through desktop via Tailwind breakpoints

## SEO Status

**Implemented**, via the custom `Seo` component (no external library —
direct `document.head` manipulation on every route change):

- Per-page `<title>` and meta description
- Canonical URL (`<link rel="canonical">`)
- Open Graph tags (`og:site_name`, `og:type`, `og:title`, `og:description`,
  `og:url`, `og:image`)
- `twitter:card` (`summary_large_image`)
- Optional JSON-LD structured data (used on Hotels, Dining, Restaurant)
- Static fallback `<title>`/description/theme-color in `index.html` for
  the first paint before React hydrates

**Not implemented:**

- No `robots.txt` or `sitemap.xml` in `public/`
- No `twitter:image` tag (only `og:image`, which most platforms fall back
  to, but it's not explicit)
- Structured data is limited to 3 of 16 routes
- All SEO tags are applied client-side after mount — there is no
  server-side rendering or prerendering, so crawlers that don't execute
  JavaScript would see only the static `index.html` values

## Development

```bash
npm install
npm run dev       # Vite dev server, http://localhost:5173
```

No `.env` file, environment variables, or third-party API keys are
required — the project has no backend integration. There is no `.env` or
`.env.example` in the repository.

## Production Build

```bash
npm run build     # tsc -b && vite build → dist/
npm run preview   # serve the built dist/ locally
npm run lint       # oxlint
```

`npm run build` type-checks the project (`tsc -b`) before bundling with
Vite. `dist/` is git-ignored.

## Project Status

- The site is a working, content-complete multi-page build: every route in
  `App.tsx` (except the disabled Wellness page) renders a full page with
  real copy, imagery, and navigation.
- NOYA's own offering (hotel rooms, 327 Restaurant, occasional events) is
  fully fleshed out; the Shop is explicitly presented as not yet open, and
  Rooms explicitly states that offering doesn't exist yet.
- Three partner businesses (Beirut, AMEYA Studio, Ananya Holidays) have
  complete dedicated profile pages, each linking out to the partner's own
  site/social channels.
- The Reserve form and every contact touchpoint route through `mailto:`/
  `tel:` links rather than a booking engine or backend — reservations are
  handled manually by the house.

## Known Issues / Improvements

- **Dining and Shop are unreachable from primary navigation.** Both pages
  are live at `/dining` and `/shop`, but `primaryNav` (used by both the
  header and footer) omits them; they're reachable only through in-page
  links.
- **Wellness page is fully disabled**, not deleted — `Wellness.tsx`'s
  contents, its route, and its nav/SEO entries are all commented out
  across three files. If it's meant to ship, it needs re-enabling; if not,
  the dead code could be removed.
- **Unused source assets:** camera originals and unplaced photos now live
  in `media-originals/` in the original source repository (see
  `docs/media-optimization.md`). `src/assets/`
  still has the unused Vite template files `hero.png`, `vite.svg` and
  `react.svg`, plus the gitignored masters `video1.mov` and `video2.mp4`.
- **`public/icons.svg`** is present but not referenced by any component.
- **Two data exports are unused**: `stayTiers` (room pricing) has no
  rendering component, and `discoverPartner` isn't imported anywhere.
- **No `robots.txt` / `sitemap.xml`**, and SEO tags are applied
  client-side only (no SSR/prerendering) — see [SEO Status](#seo-status).
- **No automated tests** and no CI configuration in the repository.
- Some `alt` text is generic (e.g. `alt="food"` on `Restaurant.tsx`)
  rather than descriptive.
