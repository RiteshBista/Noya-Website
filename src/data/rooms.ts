/* ------------------------------------------------------------------ */
/*  Rooms — the one source for the Rooms page cards and every room     */
/*  detail page (/rooms/:slug).                                        */
/*                                                                      */
/*  Client descriptions are retained except for names corroborated by  */
/*  the host's individual Airbnb listings. Additional specifications    */
/*  below are taken only from a matched listing; unknowns stay null.    */
/*  Only photos matched to the mapped Airbnb galleries are assigned.   */
/*  Prices are unchanged.                                              */
/* ------------------------------------------------------------------ */

/* Verified, owner-supplied room photographs. Originals remain untouched. */
export const roomPhotos = {
  alcove1: {
    src: "/images/alcove1.jpg",
    alt: "The Alcove Room with its sage-green enclosed wooden bed, writing desk, and adjacent shower screen",
  },
  alcove2: {
    src: "/images/alcove2.jpg",
    alt: "A curtained window and vintage writing desk seen through the Alcove Room bed enclosure",
  },
  alcove3: {
    src: "/images/alcove3.jpg",
    alt: "White pillows and linens inside the Alcove Room custom wooden bed",
  },
  alcove4: {
    src: "/images/alcove4.jpg",
    alt: "The Alcove Room wooden writing desk, green lamps, and upholstered chair beside a curtained window",
  },
  alcove5: {
    src: "/images/alcove5.jpg",
    alt: "A white swan textile artwork against a dark background in the Alcove Room",
  },
  attic1: {
    src: "/images/attic1.jpg",
    alt: "The Attic Room antique writing desk and green reading lamp beneath dark timber beams",
  },
  attic2: {
    src: "/images/attic2.jpg",
    alt: "The Attic Room bedroom and sitting area with patterned armchairs beneath exposed roof beams",
  },
  attic3: {
    src: "/images/attic3.jpg",
    alt: "An alternative view across the Attic Room bed toward the skylight, sitting area, and writing desk",
  },
  attic4: {
    src: "/images/attic4.jpg",
    alt: "The Attic Room skylight above exposed beams, a wooden bed frame, and patterned seating",
  },
  attic5: {
    src: "/images/attic5.jpg",
    alt: "A tall view of the Attic Room skylight, timber structure, and sitting area",
  },
  bay1: {
    src: "/images/bay1.jpg",
    alt: "The Bay Room bedroom with sage-green walls, a porcelain lamp, and an open doorway to the adjoining lounge",
  },
  bay2: {
    src: "/images/bay2.jpg",
    alt: "The Bay Room private lounge with teal seating, a piano, plants, and collected artwork",
  },
  bay3: {
    src: "/images/bay3.jpg",
    alt: "The Bay Room bed, porcelain lamp, curtained bay-window alcove, and vintage writing desk",
  },
  bay4: {
    src: "/images/bay4.jpg",
    alt: "An alternative Bay Room bedroom angle showing the curtained bay-window alcove and writing desk",
  },
  bay5: {
    src: "/images/bay5.jpg",
    alt: "The Bay Room wooden writing desk and green reading lamp beside a curtained window",
  },
  juliet1: {
    src: "/images/juliet1.jpg",
    alt: "The Juliet Room bedroom with dark walls, exposed ceiling timbers, a painted screen, and open balcony doors",
  },
  juliet2: {
    src: "/images/juliet2.jpg",
    alt: "The Juliet Room queen bed framed by dark curtains and antique bedside lamps",
  },
  juliet3: {
    src: "/images/juliet3.jpg",
    alt: "The Juliet Room porcelain lamp and patterned curtains beside the private balcony doors",
  },
  juliet4: {
    src: "/images/juliet4.jpg",
    alt: "An alternative Juliet Room bedroom angle with a painted screen, timber ceiling, and vintage writing desk",
  },
  juliet5: {
    src: "/images/juliet5.jpg",
    alt: "The Juliet Room wooden writing desk, mirror, and green reading lamp",
  },
  presidential1: {
    src: "/images/presidential1.jpg",
    alt: "The Presidential Suite bed and teal sofa with porcelain lamps and thangka artwork",
  },
  presidential2: {
    src: "/images/presidential2.jpg",
    alt: "An alternative Presidential Suite bedroom angle with teal seating and antique furnishings",
  },
  presidential3: {
    src: "/images/presidential3.jpg",
    alt: "The Presidential Suite bedroom with a teal sofa, thangka artwork, and open balcony doors",
  },
  presidential4: {
    src: "/images/presidential4.jpg",
    alt: "The Presidential Suite antique writing desk and seating beside open balcony doors",
  },
  presidential5: {
    src: "/images/presidential5.jpg",
    alt: "The Presidential Suite private sitting area with teal armchairs, a round table, and curtained balcony doors",
  },
} as const satisfies Record<string, { src: string; alt: string }>;

export type RoomPhotoKey = keyof typeof roomPhotos;

/** Bedroom overview, alternative angle, signature feature, then room details. */
export const roomPhotoOrder = {
  "juliet-room": [
    "juliet1",
    "juliet4",
    "juliet3",
    "juliet2",
    "juliet5"
  ],
  "attic-room": [
    "attic2",
    "attic3",
    "attic4",
    "attic1",
    "attic5"
  ],
  "bay-room": [
    "bay3",
    "bay1",
    "bay2",
    "bay5",
    "bay4"
  ],
  "alcove-room": [
    "alcove1",
    "alcove3",
    "alcove2",
    "alcove4",
    "alcove5"
  ],
  "presidential-room": [
    "presidential3",
    "presidential2",
    "presidential4",
    "presidential5",
    "presidential1"
  ]
} as const satisfies Record<string, readonly RoomPhotoKey[]>;

/** Shared cover for room cards, heroes, navigation and related previews. */
export function roomCover(slug: keyof typeof roomPhotoOrder) {
  return roomPhotos[roomPhotoOrder[slug][0]];
}

export type Room = {
  /** URL segment: /rooms/<slug>. Keep stable once published. */
  slug: string;
  name: string;
  /** Unpublished rooms are left out of the Rooms page and get no route. */
  published: boolean;
  /** Client copy with listing-verified corrections; the first paragraph is the card text. */
  paragraphs: readonly string[];
  /**
   * Only photographs visually matched to the mapped listing are assigned.
   * The first key is the cover (Rooms page card and detail hero); all of
   * them, in this order, make up the room's gallery.
   * Empty arrays mean approved, matching room photographs are unavailable.
   */
  photos: readonly RoomPhotoKey[];
  /** Nightly rate, only once confirmed by the client. `null` shows "Rates on request". */
  price: { amount: number; currency: "USD" | "NPR" } | null;
  bed: string | null;
  bathroom: string | null;
  /** e.g. "28 m²" */
  size: string | null;
  /** e.g. "2 adults" */
  occupancy: string | null;
  accessibility: string | null;
  /** Verified room features, shown as a details list. */
  features: readonly string[];
  /** Search description, written only from facts in the description above. */
  seoDescription: string;
};

/** Show unconfirmed fields as "To be confirmed" on the detail pages.
 * Set to false to leave them out entirely before launch. */
export const SHOW_UNCONFIRMED_FIELDS = false;
export const UNCONFIRMED_LABEL = "To be confirmed";

/** Supplied by the client on the Rooms page; applies to every room. */
export const breakfastNote = "Breakfast is included, served in the courtyard in fair weather.";

export const allRooms: readonly Room[] = [
  {
    // Listing: https://www.airbnb.com/rooms/1170886588411747651
    slug: "juliet-room",
    name: "Juliet Room",
    published: true,
    paragraphs: [
      "The Juliet Room takes its name from the charming Juliet balcony that extends from the room, beautifully wrapped in cascading purple wisteria. Inspired by European interiors, the room combines dramatic black walls, a reclaimed-wood queen bed and a comfortable memory-foam mattress with oriental artwork and antique lamps, creating a distinctive blend of old-world elegance and artistic character.",
      "The specially commissioned corn-husk carpet is handcrafted by elderly Indigenous women, celebrating traditional craftsmanship and preserving the beauty of handmade textiles. The ensuite bathroom features Himalayan slate stone on both the walls and floor, thoughtfully maintained in its natural state to create a serene, earthy atmosphere.",
      "A romantic and character-filled retreat, the Juliet Room is ideal for couples and travelers who appreciate heritage, craftsmanship, and timeless European-inspired design.",
    ],
    photos: roomPhotoOrder["juliet-room"],
    price: null,
    bed: "Reclaimed-wood queen bed with a memory-foam mattress",
    bathroom: "Himalayan slate ensuite with a walk-in shower",
    size: null,
    occupancy: null,
    accessibility: null,
    features: [
      "Private Juliet balcony overlooking the courtyard garden",
      "Plush lounge seating",
      "Vintage workspace",
      "Air conditioning",
      "High-speed Wi-Fi",
      "cascading purple wisteria",
      "dramatic black walls",
      "oriental artwork and antique lamps",
      "specially commissioned corn-husk carpet",
    ],
    seoDescription:
      "The Juliet Room at NOYA, Kathmandu: a Juliet balcony wrapped in purple wisteria, dramatic black walls, a handcrafted corn-husk carpet and a slate ensuite.",
  },
  {
    // Listing: https://www.airbnb.com/rooms/1170729473711278996
    slug: "attic-room",
    name: "Attic Room",
    published: true,
    paragraphs: [
      "The Attic Room draws its character from its original purpose as an attic, traditionally used for storage in Nepal. Exposed timber beams preserve a sense of authenticity and connection to the past.",
      "Set within an 18th-century boutique heritage home, the room blends European-inspired interiors with neoclassical details. Dramatic black walls, a reclaimed-wood bed, comfortable memory-foam mattress, exposed wooden beams, and a large skylight create a warm and inviting retreat above the city. Flower paintings and antique furnishings add artistic charm, while the ensuite bathroom features natural Himalayan slate stone on the walls and floor.",
      "Guests are welcome to unwind in the peaceful courtyard garden, enjoy the vibrant drawing room, and explore the hallways lined with historical portraits, antique paintings, and artifacts from a bygone era.",
      "A quiet hideaway for writers, couples, and thoughtful travelers seeking stillness, history, and distinctive design.",
    ],
    photos: roomPhotoOrder["attic-room"],
    price: null,
    // Listing summary says king; host description says queen. Do not publish a size.
    bed: "Reclaimed-wood bed",
    bathroom: "Himalayan slate ensuite with a walk-in shower",
    size: null,
    occupancy: null,
    accessibility: null,
    features: [
      "Shared balcony outside the room",
      "Vintage workspace",
      "Air conditioning",
      "High-speed Wi-Fi",
      "exposed wooden beams",
      "large skylight",
      "Dramatic black walls",
      "Flower paintings and antique furnishings",
    ],
    seoDescription:
      "The Attic Room at NOYA, Kathmandu: exposed wooden beams, a large skylight, a reclaimed-wood bed and a Himalayan slate ensuite.",
  },
  {
    slug: "bay-room",
    name: "Bay Room",
    published: true,
    paragraphs: [
      "The Bay Room is a serene and light-filled suite within a restored 18th-century heritage home, where historic character meets contemporary comfort. Thoughtfully designed with neoclassical touches and soothing hues, the room offers an inviting atmosphere for relaxation and inspiration.",
      "A beautiful bay-window alcove framed by vintage curtains creates a charming focal point, complemented by a classic writing desk and carefully selected furnishings. The ensuite bathroom features natural slate tiling, a rustic bathtub, and a wooden bench, adding an understated elegance and an earthy connection to the surrounding heritage architecture.",
      "Beyond the room, guests can enjoy the tranquil courtyard garden, relax in the vibrant drawing room, and discover the home's collection of historical portraits, antique paintings, and treasured artifacts.",
      "Ideal for solo writers seeking inspiration, couples looking for a peaceful escape, and travelers drawn to artistic spaces with a rich sense of history.",
    ],
    // Listing details: https://www.airbnb.com/rooms/1563741404096005438
    photos: roomPhotoOrder["bay-room"],
    price: null,
    bed: "King-size bed with premium linens",
    bathroom: "Natural slate ensuite with a rustic bathtub and wooden bench",
    size: null,
    occupancy: null,
    accessibility: null,
    features: [
      "bay-window alcove framed by vintage curtains",
      "classic writing desk",
      "neoclassical touches and soothing hues",
      "Attached lounge with vintage furnishings",
      "Air conditioning",
      "Wi-Fi",
    ],
    seoDescription:
      "The Bay Room at NOYA, Kathmandu: a light-filled room in a restored 18th-century home, with a bay-window alcove, a classic writing desk and a slate ensuite.",
  },
  {
    // Listing: https://www.airbnb.com/rooms/1563518768711193498
    slug: "alcove-room",
    name: "Alcove Room",
    published: true,
    paragraphs: [
      "The Alcove Room is a thoughtfully curated retreat in a restored 18th-century heritage home, blending bohemian warmth with European neoclassical elegance. Soft sage-green walls, carefully chosen vintage details, and a dedicated writing space create a calm and inspiring atmosphere.",
      "At the heart of the room is a custom-designed wooden queen bed with premium linens, crafted to offer enhanced privacy, comfort, and a sense of intimacy. The natural textures and understated furnishings complement the home's historic character, while the modern ensuite bathroom, finished with natural Himalayan slate tiling, brings a touch of contemporary refinement.",
      "Guests can spend quiet moments in the courtyard garden, enjoy the characterful drawing room, or wander through the heritage home's halls filled with antique paintings, historical portraits, and artifacts.",
      "A charming hideaway for solo creatives, history enthusiasts, and couples seeking a peaceful, romantic retreat with distinctive character.",
    ],
    photos: roomPhotoOrder["alcove-room"],
    price: null,
    bed: "Custom wooden queen bed with premium linens",
    bathroom: "Natural slate ensuite; walk-in shower adjacent to the bedroom",
    size: null,
    occupancy: null,
    accessibility: null,
    features: [
      "Soft sage-green walls",
      "carefully chosen vintage details",
      "dedicated writing space",
      "custom-designed wooden bed structure",
      "Private access via a corridor",
      "Air conditioning",
      "High-speed Wi-Fi",
    ],
    seoDescription:
      "The Alcove Room at NOYA, Kathmandu: sage-green walls, a dedicated writing space, a custom-designed wooden bed structure and a Himalayan slate ensuite.",
  },
  {
    slug: "presidential-room",
    // Listing details: https://www.airbnb.com/rooms/1170889283845868241
    name: "Presidential Suite",
    published: true,
    paragraphs: [
      "The Presidential Suite is a grand and elegant suite in an 18th-century boutique heritage home, celebrating the timeless beauty of European neoclassical design. Spacious and filled with soft natural light, the room combines historic furnishings, refined textures, and thoughtful details to create an atmosphere of understated luxury.",
      "A plush sofa invites guests to relax, while a 19th-century console table, handwoven rugs, and a classic French writing desk lend the space a sense of old-world sophistication. Every detail contributes to a warm and distinctive setting where heritage craftsmanship and contemporary comfort come together.",
      "Guests are invited to unwind in the peaceful courtyard garden, enjoy the vibrant drawing room, and explore the surrounding hallways adorned with historical portraits, antique paintings, and artifacts that tell stories of a bygone era.",
      "A spacious and characterful retreat for couples, solo travelers, and architecture enthusiasts seeking heritage charm, refined comfort, and the enduring elegance of neoclassical interiors.",
    ],
    photos: roomPhotoOrder["presidential-room"],
    price: null,
    bed: "King-size bed with premium linens",
    bathroom: "Private ensuite with natural stone flooring and a wooden bench",
    size: null,
    occupancy: null,
    accessibility: null,
    features: [
      "plush sofa",
      "19th-century console table",
      "handwoven rugs",
      "classic French writing desk",
      "soft natural light",
      "Handcrafted wooden ceiling",
      "Air conditioning",
      "Wi-Fi",
    ],
    seoDescription:
      "The Presidential Suite at NOYA, Kathmandu: a spacious, light-filled room with a plush sofa, a 19th-century console table and a classic French writing desk.",
  },

  /* The client's copy speaks of six rooms but describes five. To add the
     sixth once its details arrive, copy an entry above, give it a new
     slug, its name and paragraphs exactly as supplied, its photos, and
     set `published: true`. It then appears on the Rooms page, gets its
     own /rooms/<slug> page, and joins every "Explore Other Rooms" list. */
];

/** The rooms shown on the site, in page order. */
export const rooms = allRooms.filter((room) => room.published);

export function findRoom(slug: string | undefined) {
  return rooms.find((room) => room.slug === slug);
}

export function roomPath(room: Room) {
  return `/rooms/${room.slug}`;
}

export function roomReservePath(room: Room) {
  return `/reserve?room=${room.slug}`;
}

export function formatRoomPrice(price: NonNullable<Room["price"]>) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: price.currency,
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(price.amount);
}
