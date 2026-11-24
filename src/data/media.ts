/* ------------------------------------------------------------------ */
/*  Media manifest — every media asset used by the new/updated         */
/*  editorial sections (heritage, art, stumble-upon, materials,        */
/*  neighbourhood, cultural Kathmandu), with rights status.            */
/*                                                                      */
/*  Rights classification, per project instructions:                   */
/*    A — existing project-owned asset (in /public or /src/assets)     */
/*    B — official NOYA asset, reuse authorized/appropriate            */
/*    C — publicly viewable, rights unclear                            */
/*    D — third-party content                                          */
/*    E — third-party editorial/archival source (a supplied scan of a  */
/*        magazine page), used only as a small, explicitly credited    */
/*        excerpt for historical/editorial context — not reproduced in */
/*        full, and not presented as NOYA's own photography. The       */
/*        underlying photograph's copyright belongs to its publication */
/*        or photographer, not to this project; flagged for the site   */
/*        owner's own legal/rights review before any wider reuse.      */
/*    F — third-party photograph under an open licence (Creative       */
/*        Commons), used under its terms: credited on the page with    */
/*        author, licence and source link. Resized web copies carry    */
/*        the same licence. Originals kept in media-originals/photos.  */
/*                                                                      */
/*  Only A/B assets are ordinarily wired into the live site. C/D assets */
/*  are listed in `externalMediaManifest` below for manual authorization*/
/*  and are never referenced in the app. The single E-rated exception   */
/*  (archivalNoyaCourtyard, below) was a project-supplied source asset  */
/*  the site owner explicitly asked to be integrated as a small,        */
/*  credited archival excerpt — see the History page and the final      */
/*  report for the reasoning.                                           */
/* ------------------------------------------------------------------ */

export type MediaItem = {
  id: string;
  title: string;
  type: "image" | "video";
  section: string;
  localPath: string;
  rights: "A" | "B" | "E" | "F";
  alt: string;
  caption?: string;
};

export const mediaManifest: MediaItem[] = [
  {
    id: "hero-loop",
    title: "NOYA hero loop (compressed)",
    type: "video",
    section: "Home / Hero",
    localPath: "/videos/noya-loop.mp4",
    rights: "A",
    alt: "NOYA courtyard and facade, looping video",
  },
  {
    id: "hero-loop-mobile",
    title: "NOYA hero loop (mobile derivative)",
    type: "video",
    section: "Home / Hero",
    localPath: "/videos/noya-loop-mobile.mp4",
    rights: "A",
    alt: "NOYA courtyard and facade, looping video (mobile)",
  },
  {
    id: "hero-poster",
    title: "NOYA hero poster frame",
    type: "image",
    section: "Home / Hero",
    localPath: "/images/noya-loop-poster.jpg",
    rights: "A",
    alt: "Candle-lit piano and sheet music — the first frame of the hero video",
  },
  {
    id: "facade-night",
    title: "Facade, night",
    type: "image",
    section: "Home (About preview) / default social-share image",
    localPath: "/images/hero-exterior-night.jpg",
    rights: "A",
    alt: "NOYA's Neoclassical facade, lit at night",
  },
  {
    id: "facade-dusk",
    title: "Facade, dusk",
    type: "image",
    section: "About / History",
    localPath: "/images/facade-dusk.jpg",
    rights: "A",
    alt: "NOYA's facade at dusk",
    caption: "Formerly facade-day.jpg (the exposure is dusk, not day); renamed in the 2026-10 media audit. Holds the Canon EOS 5DS R master's bytes (formerly src/assets/image38.jpeg), which replaced a lower-bitrate re-save at the same 2000×1333 size.",
  },
  {
    id: "restoration-facade-rubble",
    title: "Restoration — the facade behind the rubble (formerly restoration-kept.jpg)",
    type: "image",
    section: "History (hero) / Restoration I / Home (About preview)",
    localPath: "/images/restoration-facade-rubble.jpg",
    rights: "A",
    alt: "NOYA during restoration, brick rubble piled in front of the house",
  },
  {
    id: "heritage-fireplace",
    title: "Original fireplace",
    type: "image",
    section: "Home (Stumble Upon) / navigation menu",
    localPath: "/images/heritage-fireplace.jpg",
    rights: "A",
    alt: "An original fireplace, kept through restoration",
  },
  {
    id: "afternoon-tea-stand-bw",
    title: "Afternoon tea stand, black and white (formerly dining-gallery-2.jpg / library-bar-2.jpg)",
    type: "image",
    section: "unused (was the Art hero until the 2026-10 Art/History/Heritage rewrite; still named in commented-out code on About)",
    localPath: "/images/afternoon-tea-stand-black-and-white.jpg",
    rights: "A",
    alt: "A tiered afternoon tea stand in black and white",
    caption: "library-bar-2.jpg was a byte-identical copy of dining-gallery-2.jpg; the copy was removed and both are now this one file.",
  },
  {
    id: "bathtub-skylight-bw",
    title: "Bathtub under a skylight, black and white (formerly courtyard-corridor.jpg)",
    type: "image",
    section: "Rooms (room galleries, provisional mapping; see src/data/rooms.ts)",
    localPath: "/images/bathtub-skylight-black-and-white.jpg (copied from media-originals/unpublished/bathtub-skylight-black-and-white.jpg)",
    rights: "A",
    alt: "A deep bathtub lit from a skylight, in black and white",
  },
  {
    id: "room-thangka",
    title: "Room with thangka and balcony",
    type: "image",
    section: "Stumble Upon / Rooms / About (Restoration) / Home",
    localPath: "/images/room-thangka-reading-bench.jpg",
    rights: "A",
    alt: "A thangka painting above a bench, room opening onto the courtyard balcony",
    caption:
      "Formerly courtyard-alley.jpg — the photo is an interior room, not an exterior alley; renamed in the 2026-10 media audit.",
  },
  {
    id: "facade-night-2",
    title: "Facade, night (formerly mis-captioned 'porcelain lamp')",
    type: "image",
    section: "Home (About preview slideshow)",
    localPath: "/images/hero-exterior-night.jpg (src/assets/image35.jpeg was a higher-bitrate copy of this photo; its bytes now live at this path and the copy was removed)",
    rights: "A",
    alt: "NOYA's Neoclassical facade, lit at night",
    caption:
      "Audit finding: this file was previously captioned 'A porcelain lamp' / 'Thangka, above the hearth' in several places — it is neither; it's the same night facade as facade-night. Every mismatched pairing was corrected to use an image that actually matches its caption (see room-thangka and bay-room entries below for the real thangka/lamp photos).",
  },
  {
    id: "restoration-brick-rubble",
    title: "Brick rubble during restoration (formerly mis-captioned as 'kept'/'porcelain lamp')",
    type: "image",
    section: "Home (About preview slideshow)",
    localPath: "src/assets/restoration-brick-rubble.jpg (formerly image37.jpeg; bundled module import, not a static URL)",
    rights: "A",
    alt: "Rubble and construction debris outside the property during restoration",
    caption:
      "Audit finding: this file and /images/restoration-facade-rubble.jpg both show the same rubble/demolition scene. It was previously mis-captioned 'A porcelain lamp' (Stumble Upon), 'What was kept' (restorationSteps II), and used as the Art page hero — all corrected to images that actually match. Now used, captioned honestly as restoration documentation, in the Home 'About NOYA' slideshow.",
  },
  {
    id: "porcelain-lamp",
    title: "Porcelain lamp, Bay Room",
    type: "image",
    section: "Stumble Upon",
    localPath: "/images/bay-room.jpg",
    rights: "A",
    alt: "Twin porcelain table lamps flanking a bed at NOYA",
  },
  {
    id: "carved-mask",
    title: "Carved wooden guardian mask (formerly mis-captioned 'rotary telephone')",
    type: "image",
    section: "Art / Stumble Upon",
    localPath: "/images/carved-wooden-guardian-mask.jpg",
    rights: "A",
    alt: "A carved wooden guardian mask, kept above a doorway at NOYA",
    caption:
      "Audit finding: this file shows a carved wooden mask, not a rotary telephone — every caption referencing it as a telephone has been corrected, and the file (formerly artifact-telephone.jpg) renamed in the 2026-10 media audit. No photograph of an actual rotary telephone was found in the project to substitute in its place, so that detail was also removed from restorationSteps' body copy rather than left paired with the wrong image.",
  },
  {
    id: "corridor-glimpse",
    title: "Room glimpsed through an open doorway",
    type: "image",
    section: "About / Stumble Upon",
    localPath: "/images/room-through-open-doorway.jpg",
    rights: "A",
    alt: "A room glimpsed through an open doorway at NOYA",
    caption:
      "Previously captioned 'A corridor overlooking the courtyard' (About) and paired with 'The courtyard corridor' (Stumble Upon, which actually used a bathtub photo, now archived as media-originals/unpublished/bathtub-skylight-black-and-white.jpg, unrelated to any corridor) — both corrected to describe what this photo actually shows.",
  },
  {
    id: "dining-gallery-1",
    title: "Silverware, afternoon tea service",
    type: "image",
    section: "Hotel (Heritage)",
    localPath: "/images/afternoon-tea-silver-teapots.jpg",
    rights: "A",
    alt: "Engraved silver teapots and a tiered cake stand, laid for afternoon tea",
    caption: "Art (Art of the House) and Hotel (Heritage). library-bar.jpg was a byte-identical copy; removed.",
  },
  {
    id: "dining-gallery-4",
    title: "Room detail — rattan chair, lamp, dhurrie rug",
    type: "image",
    section: "Rooms (room galleries, provisional mapping; see src/data/rooms.ts)",
    localPath: "/images/room-rattan-chair-porcelain-lamp.jpg (copied from media-originals/unpublished/room-rattan-chair-porcelain-lamp.jpg)",
    rights: "A",
    alt: "A striped rattan chair and patterned rug beside a bed, lit by a porcelain lamp",
  },
  {
    id: "event-gallery-2",
    title: "Masked dance, courtyard",
    type: "image",
    section: "Events (gallery)",
    localPath: "/images/masked-dancer-blue-costume-garland.jpg",
    rights: "A",
    alt: "A masked dancer in ceremonial dress performing in NOYA's courtyard, accompanied by musicians",
    caption:
      "A masked ritual dance photographed during a private gathering at NOYA. Not identified as a specific named public jatra (e.g. Indra Jatra or Khat Jatra) — those are documented as taking place elsewhere in Kathmandu/Hadigaun, not at NOYA — so this is captioned only as what it verifiably shows: a masked performance hosted at the house.",
  },
  {
    id: "event-gallery-5",
    title: "Masked dance, courtyard (additional frame)",
    type: "image",
    section: "unused, archived (the Events gallery now shows a wider range of gatherings)",
    localPath: "media-originals/unpublished/masked-dance-red-scarves-courtyard.jpg",
    rights: "A",
    alt: "A masked dancer swinging red scarves in NOYA's courtyard, the house behind",
  },
  {
    id: "event-gallery-6",
    title: "Masked dance before a seated child, courtyard (additional frame)",
    type: "image",
    section: "Events (gallery)",
    localPath: "/images/masked-dance-before-seated-child-red-scarves.jpg",
    rights: "A",
    alt: "A masked dancer performing before a child seated in ceremonial dress in NOYA's courtyard",
  },
  {
    id: "event-courtyard-dance",
    title: "Masked dance, courtyard (Events hero still)",
    type: "image",
    section: "Heritage (hero), Discover menu card; see the heritage-hero-masked-dance entry below",
    localPath: "/images/masked-dance-before-seated-child-musicians.jpg (drawing-room-3.jpg, a smaller 954×1280 copy, was removed as a duplicate)",
    rights: "A",
    alt: "A masked dancer performing in NOYA's courtyard before a seated child in ceremonial dress, with musicians",
  },
  {
    id: "archival-noya-courtyard",
    title: "Archival courtyard photograph, cropped from a magazine feature",
    type: "image",
    section: "History (\"From the Archives\")",
    localPath: "src/assets/archival-noya-courtyard.jpg (cropped from media-originals/photos/yatra-magazine-palace-turned-hotels-p29-scan.jpg, a supplied scan)",
    rights: "E",
    alt: "Archival magazine photograph of the property's courtyard, before it operated as NOYA",
    caption: "Source: Yatra magazine, \"Palace Turned Hotels,\" p.29 (byline Ankita Jain). Photograph copyright belongs to the publication/photographer, not NOYA or this project — used here as a small, credited excerpt for historical context only, per the site owner's explicit request. The magazine's own \"11-room\" description of NOYA and its unrelated Royal Empire Boutique Hotel / Hotel Yak & Yeti profiles (same feature, other properties) are deliberately not reproduced anywhere on the site.",
  },

  /* ---- Added in the 2026-10 media audit (owner-supplied photos/video) ---- */
  {
    id: "afternoon-tea-pour",
    title: "Afternoon tea, silver poured by the courtyard fire",
    type: "image",
    section: "Home (Stumble Upon: 'Afternoon tea, in the courtyard')",
    localPath: "/images/afternoon-tea-silver-pour-fireplace.jpg",
    rights: "A",
    alt: "Afternoon tea, in the courtyard",
    caption: "Replaces a black-and-white tea-stand photo that didn't show the 'poured slowly' the card describes. Two near-identical burst frames are kept in media-originals/photos.",
  },
  {
    id: "afternoon-tea-fireplace",
    title: "Afternoon tea stand before an open fire",
    type: "image",
    section: "About (Founder)",
    localPath: "/images/afternoon-tea-stand-fireplace.jpg",
    rights: "A",
    alt: "A tiered afternoon tea stand laid before an open fire at NOYA, cups and napkins beside it",
  },
  {
    id: "turquoise-wall-window",
    title: "Shuttered window in the turquoise wall",
    type: "image",
    section: "About (Architecture)",
    localPath: "/images/turquoise-wall-shuttered-window.jpg",
    rights: "A",
    alt: "A tall white-shuttered window set in NOYA's turquoise wall, a flowering climber beside it",
  },
  {
    id: "restoration-plastered-walls",
    title: "Facade being repainted, during restoration",
    type: "image",
    section: "About (Restoration II)",
    localPath: "/images/restoration-facade-repainting.jpg",
    rights: "A",
    alt: "NOYA's facade during restoration, one section newly painted turquoise beside walls still unfinished",
  },
  {
    id: "courtyard-acoustic-concert",
    title: "Acoustic duo, courtyard audience",
    type: "image",
    section: "Events (gallery)",
    localPath: "/images/courtyard-acoustic-concert.jpg",
    rights: "A",
    alt: "Two guitarists performing for a seated audience in NOYA's courtyard in the evening",
    caption: "Performers and date not identified in the supplied files, so neither is named.",
  },
  {
    id: "courtyard-acoustic-set",
    title: "Acoustic set in the courtyard (phone video, 464×832, 21s)",
    type: "video",
    section: "Events (The Setting)",
    localPath: "/videos/courtyard-acoustic-set.mp4 (poster: /images/courtyard-acoustic-set-poster.jpg, frame 0)",
    rights: "A",
    alt: "A guitarist playing an acoustic set in NOYA's courtyard, filmed from above the audience",
    caption: "A second clip of the same evening (media-originals/videos/courtyard-acoustic-set-alternate-angles.mp4) is kept unused.",
  },
  {
    id: "dinner-fish-course",
    title: "Dinner course — seared fish, golden sauce, salad in an orange",
    type: "image",
    section: "Events (gallery)",
    localPath: "/images/dinner-course-fish-citrus-salad.jpg",
    rights: "A",
    alt: "A plated dinner course at NOYA: seared fish on a golden sauce, with a salad served in a hollowed orange",
    caption: "From a set of plated-dinner photos supplied with no event name or date; the rest of the set is in media-originals/photos (dinner-*, dumplings-*, creme-brulee-*).",
  },
  {
    id: "dinner-dessert-course",
    title: "Dessert course — lattice tart, berries, crème brûlée",
    type: "image",
    section: "Events (gallery)",
    localPath: "/images/dinner-dessert-tart-creme-brulee.jpg",
    rights: "A",
    alt: "A dessert course at NOYA: a lattice tart with fresh berries beside a crème brûlée",
  },
  {
    id: "room-double-bed-floral-rug",
    title: "Guest room — double bed, porcelain lamps, floral rug (formerly drawing-room-4.jpg)",
    type: "image",
    section: "Rooms (Inside the rooms)",
    localPath: "/images/room-double-bed-floral-rug.jpg (iPhone master: media-originals/photos/room-double-bed-floral-rug-original.heic)",
    rights: "A",
    alt: "A NOYA guest room: a double bed made up in white between porcelain lamps, a floral rug on painted floorboards",
    caption: "Replaces the framed-photographs wall in this grid, which still appears on the Art page.",
  },
  /* ---- Added in the 2026-10 Art / History / Heritage rewrite ---- */
  {
    id: "peacock-window-bhaktapur",
    title: "The Peacock Window, Bhaktapur (Art hero)",
    type: "image",
    section: "Art (hero)",
    localPath: "/images/peacock-window-bhaktapur.jpg (2400px web copy; original 4913×3264 at media-originals/photos/peacock-window-bhaktapur-original.jpg)",
    rights: "F",
    alt: "The Peacock Window in Bhaktapur: a carved wooden window set in a brick wall, its lattice formed by the fanned tail of a peacock",
    caption: "Photo: Ralf Frenken, CC BY-SA 2.0, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Peacock_window,_Bhaktapur_26482025170.jpg; originally Flickr 26482025170). Credited in the hero.",
  },
  {
    id: "patan-durbar-square-morning",
    title: "Patan Durbar Square in the morning (History hero)",
    type: "image",
    section: "History (hero)",
    localPath: "/images/patan-durbar-square-morning.jpg (2400px web copy; original 5064×3456 at media-originals/photos/patan-durbar-square-morning-original.jpg)",
    rights: "F",
    alt: "Patan Durbar Square in the morning: the stone Krishna Mandir and tiered pagoda temples, with pigeons in flight and people crossing the square",
    caption: "Photo: Rohan Manandhar, CC BY-SA 4.0, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Life_at_Patan.jpg; Wiki Loves Monuments 2016, Nepal). Credited in the hero.",
  },
  {
    id: "heritage-hero-masked-dance",
    title: "Masked dance before a seated child, NOYA courtyard (Heritage hero)",
    type: "image",
    section: "Heritage (hero)",
    localPath: "/images/masked-dance-before-seated-child-musicians.jpg (restored from media-originals/unpublished)",
    rights: "A",
    alt: "A masked dancer in red and gold performs in NOYA's courtyard before a child seated in ceremonial dress, with a drummer and onlookers",
    caption: "The dance and the seated child are not identified by name: the photograph alone doesn't establish which dance or festival role is shown.",
  },
  {
    id: "sculpted-face-turquoise-wall",
    title: "Sculpted face set into a turquoise wall (Art, At NOYA)",
    type: "image",
    section: "Art (At NOYA)",
    localPath: "/images/sculpted-face-turquoise-wall.jpg (formerly media-originals/photos/carved-face-plaque-white-climber.jpg)",
    rights: "A",
    alt: "A small crowned face, sculpted in pale relief, set into NOYA's turquoise wall, with the leaves of a climbing plant at the edge of the frame",
    caption: "Material and origin unknown; described only as what the photograph shows.",
  },
  {
    id: "hanging-ornament-leaf-pendants",
    title: "Hanging ornament with leaf-shaped pendants (Art, At NOYA)",
    type: "image",
    section: "Art (At NOYA)",
    localPath: "/images/hanging-ornament-leaf-pendants.jpg (formerly media-originals/photos/carved-wooden-hanging-ornament.jpg)",
    rights: "A",
    alt: "A dark hanging ornament with leaf-shaped pendants, suspended in front of NOYA's turquoise facade and white balcony",
    caption: "The earlier name called it carved wood; it looks more like dark metal. Material unverified, so neither is claimed.",
  },

  /* ---- Added in the 2026-10 Rooms redesign: room photographs published for
     the room galleries. Web copies are 2400px max with metadata stripped;
     HEIC masters were decoded with Windows Imaging. Which room each shows is
     NOT verified — the provisional mapping lives in src/data/rooms.ts. ---- */
  {
    id: "room-panorama-desk-and-bed",
    title: "Guest room panorama — desk, bed, porcelain lamps",
    type: "image",
    section: "Rooms (room galleries, provisional mapping; see src/data/rooms.ts)",
    localPath: "/images/room-panorama-desk-and-bed.jpg (from media-originals/photos/room-panorama-desk-and-bed.heic)",
    rights: "A",
    alt: "A wide view of a guest room: a writing desk, a double bed between porcelain lamps, and curtained French doors",
  },
  {
    id: "room-bed-rattan-chair-tiger-rug",
    title: "Guest room — bed, rattan armchair, tiger-pattern rug",
    type: "image",
    section: "Rooms (room galleries, provisional mapping; see src/data/rooms.ts)",
    localPath: "/images/room-bed-rattan-chair-tiger-rug.jpg (from media-originals/photos/room-bed-rattan-chair-tiger-rug.heic)",
    rights: "A",
    alt: "A guest room with a double bed, a rattan armchair, porcelain lamps and a tiger-pattern rug",
  },
  {
    id: "attic-room-bed-towel-art",
    title: "Attic room — folded towel on the bed, desk beyond",
    type: "image",
    section: "Rooms (room galleries, provisional mapping; see src/data/rooms.ts)",
    localPath: "/images/attic-room-bed-towel-art.jpg (from media-originals/photos/attic-room-bed-towel-art.heic)",
    rights: "A",
    alt: "A folded towel on a white bed, looking across a beamed attic room to a writing desk",
  },
  {
    id: "attic-room-four-poster-through-doors",
    title: "Attic room — four-poster bed seen through open doors",
    type: "image",
    section: "Rooms (room galleries, provisional mapping; see src/data/rooms.ts)",
    localPath: "/images/attic-room-four-poster-through-doors.jpg (from media-originals/photos/attic-room-four-poster-through-doors.heic)",
    rights: "A",
    alt: "A four-poster bed under a skylit, beamed ceiling, seen through open doors",
  },
  {
    id: "attic-room-writing-desk",
    title: "Attic room — writing desk",
    type: "image",
    section: "Rooms (room galleries, provisional mapping; see src/data/rooms.ts)",
    localPath: "/images/attic-room-writing-desk.jpg (from media-originals/photos/attic-room-writing-desk.heic)",
    rights: "A",
    alt: "A wooden writing desk with a green-shaded lamp under a sloping beamed ceiling",
  },
  {
    id: "attic-room-black-and-white",
    title: "Beamed room — bed and desk, black and white",
    type: "image",
    section: "Rooms (room galleries, provisional mapping; see src/data/rooms.ts)",
    localPath: "/images/attic-room-black-and-white.jpg (from media-originals/photos/attic-room-black-and-white.jpg)",
    rights: "A",
    alt: "A bed and a writing desk under exposed roof beams, in black and white",
  },
  {
    id: "towel-rail-black-and-white",
    title: "Towel rail, black and white",
    type: "image",
    section: "Rooms (room galleries, provisional mapping; see src/data/rooms.ts)",
    localPath: "/images/towel-rail-black-and-white.jpg (from media-originals/unpublished/towel-rail-black-and-white.jpg)",
    rights: "A",
    alt: "White towels on a wooden towel rail, in black and white",
  },

  /* ---- Added in the 2026-10 client-media integration. Web copies are
     byte-identical copies of the WhatsApp files in media-originals/noya
     images (which stay there untouched); nothing larger was supplied. ---- */
  {
    id: "courtyard-evening-gathering-from-balcony",
    title: "The courtyard at night, an audience seated before a performer, seen from a balcony (1600×938)",
    type: "image",
    section: "Events (Spaces)",
    localPath: "/images/courtyard-evening-gathering-from-balcony.jpg (from media-originals/noya images/WhatsApp Image 2026-10-27 at 10.52.38 AM (2).jpeg)",
    rights: "A",
    alt: "NOYA's courtyard at night, seen from a balcony: an audience seated on the ground facing a lit performer, the house's balconies on either side",
    caption: "Replaces masked-dance-gold-costume-courtyard.jpg in Spaces, whose copy describes the courtyard as a venue; that photo moved into the Events gallery. Performer and date not identified, so neither is named.",
  },
  {
    id: "evening-gathering-guests-by-the-bar",
    title: "Evening gathering — guests mingling, bar and balcony behind (Raz photography, 1334×889)",
    type: "image",
    section: "Events (Guests)",
    localPath: "/images/evening-gathering-guests-by-the-bar.jpg (from media-originals/noya images/WhatsApp Image 2026-10-27 at 10.52.38 AM (11).jpeg)",
    rights: "A",
    alt: "Guests mingling at an evening gathering in NOYA's courtyard, the lit bar and balcony behind them",
    caption: "Carries the photographer's 'Raz photography' watermark, kept as supplied and never cropped (shown whole at 3:2); credited on the page. Guests and the occasion are not identified, so neither is named.",
  },
  {
    id: "evening-gathering-guests-smiling",
    title: "Evening gathering — two guests smiling (Raz photography, 1334×889)",
    type: "image",
    section: "Events (Guests)",
    localPath: "/images/evening-gathering-guests-smiling.jpg (from media-originals/noya images/WhatsApp Image 2026-10-27 at 10.52.38 AM (12).jpeg)",
    rights: "A",
    alt: "Two guests smiling together at an evening gathering at NOYA",
    caption: "Same evening and watermark handling as evening-gathering-guests-by-the-bar.",
  },
  {
    id: "evening-gathering-guests-conversation",
    title: "Evening gathering — two guests in conversation by the turquoise wall (Raz photography, 1334×889)",
    type: "image",
    section: "Events (Guests)",
    localPath: "/images/evening-gathering-guests-conversation.jpg (from media-originals/noya images/WhatsApp Image 2026-10-27 at 10.52.38 AM (13).jpeg)",
    rights: "A",
    alt: "Two guests in conversation beside NOYA's turquoise courtyard wall, under a wall lamp",
    caption: "Same evening and watermark handling as evening-gathering-guests-by-the-bar. Seven more frames from the evening stay in media-originals/noya images, unused, so the section doesn't repeat one night.",
  },
  {
    id: "tea-tasting-leaves-and-cups",
    title: "Tea tasting — rows of loose leaf and cups of brewed tea (1200×1600)",
    type: "image",
    section: "About (Founder)",
    localPath: "/images/tea-tasting-leaves-and-cups.jpg (from media-originals/noya images/WhatsApp Image 2026-10-27 at 10.52.38 AM (19).jpeg)",
    rights: "A",
    alt: "Rows of loose-leaf tea on white papers along a wooden bench, beside small cups of brewed tea, set out for a tasting",
    caption: "Paired with afternoon-tea-stand-fireplace.jpg beside the founder's tea-trade story. A companion frame (18) shows papers labelled 'HIMCOOP NEPAL'; this one has no legible label, and where and when the tasting took place is unknown, so the caption claims neither origin nor place.",
  },

  /* ---- Added for the client audit's Events photo grid (Event Types). The
     section also reuses porcelain-lamp-archival-prints.jpg,
     attic-room-reading-chair.jpg and courtyard-acoustic-concert.jpg. Each
     tile shows the kind of setting its card describes; none is captioned
     as that event. ---- */
  {
    id: "evening-gathering-guests-in-courtyard",
    title: "Evening gathering — three guests in the courtyard (Raz photography, 1334×889)",
    type: "image",
    section: "Events (Event Types: Book Launches)",
    localPath: "/images/evening-gathering-guests-in-courtyard.jpg (from media-originals/noya images/WhatsApp Image 2026-10-27 at 10.52.38 AM (8).jpeg)",
    rights: "A",
    alt: "Guests at an evening gathering in NOYA's courtyard",
    caption: "Cropped to 4:3 from the right (object-position 0% 50%) so the photographer's watermark, bottom left, stays in frame.",
  },
  {
    id: "dumplings-syringe-tableside",
    title: "Dumplings served at the table (1200×1600)",
    type: "image",
    section: "Events (Event Types: Slow Dinners)",
    localPath: "/images/dumplings-syringe-tableside.jpg (copied from media-originals/photos/dumplings-syringe-tableside.jpg)",
    rights: "A",
    alt: "Dumplings served at the table at NOYA, sauce added beside the bowl",
  },

  /* ---- Added for the Home "Kathmandu, In Season" festival cards: openly
     licensed Wikimedia Commons photographs (the client chose these over
     AI-generated images), credited on each card. Web copies 2400px wide,
     metadata stripped; masters at media-originals/photos/*-original.jpg. ---- */
  {
    id: "indra-jatra-kathmandu",
    title: "Indra Jatra chariot procession, Kathmandu Durbar Square (Commons, 4128×3096, 2018)",
    type: "image",
    section: "Home (Kathmandu, In Season: Indra Jatra)",
    localPath: "/images/indra-jatra-kathmandu.jpg (2400px web copy; original at media-originals/photos/indra-jatra-kathmandu-original.jpg)",
    rights: "F",
    alt: "A festival chariot drawn through a dense crowd in Kathmandu Durbar Square during Indra Jatra, temples and onlookers on the rooftops around it",
    caption: "Photo: Shadow Ayush, CC BY-SA 4.0, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Chariot_procession,_Indra_Jatra,_Kathmandu_Durbar_Square.jpg). Credited on the card.",
  },
  {
    id: "khat-jatra-hadigaun",
    title: "Hadigaun jatra, a festival shrine carried through the lanes (Commons, 4928×3264, 2022)",
    type: "image",
    section: "Home (Kathmandu, In Season: Khat Jatra)",
    localPath: "/images/khat-jatra-hadigaun.jpg (2400px web copy; original at media-originals/photos/khat-jatra-hadigaun-original.jpg)",
    rights: "F",
    alt: "Young men carrying and turning a tall, red-canopied festival shrine through a lane of brick houses in Hadigaun",
    caption: "Photo: Prashim Maharjan, CC BY 4.0, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Kai_na_vako_jatra_hadigaun_ma.jpg). Commons describes it as 'the Hadigau Jatra, where youths are carrying and rotating the chariot', dated 2022-09-09: the date doesn't confirm it is the post-Dashain Khat Jatra itself, so the alt text describes only what it shows. The only Hadigaun festival photograph found on Commons.",
  },
];

/* ------------------------------------------------------------------ */
/*  External media requiring authorization before use.                 */
/*  None of these are referenced anywhere in the live site. Instagram  */
/*  and Facebook were not accessible for deep content in this session  */
/*  (login-gated beyond bio-level text) — see the final report for     */
/*  what could and couldn't be verified.                                */
/* ------------------------------------------------------------------ */

export const externalMediaManifest = [
  {
    need: "Photography of Kathmandu Durbar Square, Patan Durbar Square, Bhaktapur Durbar Square, Swayambhunath, Boudhanath, Pashupatinath, Kirtipur, or Changu Narayan",
    whereItWouldGo: "Art page (\"Art Around Kathmandu\") and Heritage page (site profiles)",
    status:
      "Two openly licensed photographs are now used, under their licences and credited on the page (see the F-rated entries in mediaManifest): Bhaktapur's Peacock Window (Art hero) and Patan Durbar Square (History hero). The monument-zone profiles on the Heritage page remain text-led.",
    rights: "D — unverified" as const,
  },
  {
    need: "Indra Jatra footage/photography actually taken by or for NOYA",
    whereItWouldGo: "CulturalKathmandu section (Home page) and/or a dedicated Heritage sub-section",
    status: "Not found in the project repo or accessible via Instagram/Facebook in this session (both gated beyond bio text). Do not use generic stock/AI festival imagery in its place. Since the 2026-10 festival-section update the Home 'Kathmandu, In Season' card uses an openly licensed Commons photograph instead (see indra-jatra-kathmandu, rights F); NOYA's own footage is still wanted.",
    rights: "D — unverified" as const,
  },
  {
    need: "Kumari footage/photography actually taken by or for NOYA",
    whereItWouldGo: "CulturalKathmandu section (Home page)",
    status: "Not found in the project repo or accessible via Instagram/Facebook in this session. Do not fabricate a claim that NOYA has hosted or filmed the Kumari.",
    rights: "D — unverified" as const,
  },
  {
    need: "A portrait or environmental photo of Santosh Bahadur Shah",
    whereItWouldGo: "About page, Founder section",
    status: "No project-owned photo found. The founder section on the About page is intentionally text-led rather than illustrated with a stock/AI photo of a real, named person.",
    rights: "D — unverified" as const,
  },
  {
    need: "Khat Jatra (Hadigaun) photography, if NOYA wants to illustrate its own neighbourhood section",
    whereItWouldGo: "Heritage page, Neighbourhood section",
    status: "Documented publicly (Nepali press, Wikipedia) but no NOYA-owned photo exists in the project. The Heritage Neighbourhood section still ships text-only; the Home 'Kathmandu, In Season' card uses an openly licensed Commons photograph of a Hadigaun jatra (see khat-jatra-hadigaun, rights F).",
    rights: "C — publicly viewable, rights unclear" as const,
  },
  {
    need: "Instagram/Facebook photography generally (@noya.hotel, 327restaurent)",
    whereItWouldGo: "Various — would strengthen Rooms, Art, and Restaurant pages",
    status: "Both platforms were reachable only at the bio/title level in this session (JS-rendered, login-gated). No post-level images or captions could be retrieved. Manual export by the owner (Meta's own \"Download Your Information\" tool, or direct file transfer) is the reliable path — do not hotlink IG/FB media into production.",
    rights: "C — publicly viewable, rights unclear" as const,
  },
];
