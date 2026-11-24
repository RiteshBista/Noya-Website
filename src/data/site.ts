import { roomCover, roomPhotos } from "./rooms";
import archivalNoyaCourtyard from "../assets/archival-noya-courtyard.jpg";
import ameyaCraftedImage from "../assets/crafted.webp";

export const rooms = [
  {
    id: "courtyard",
    title: "The Courtyard",
    subtitle: "Glasshouse light over cushioned seating and greenery",
    image: "/images/courtyard.jpg",
    span: "wide",
    featured: true,
  },
  {
    id: "room",
    title: "The Room",
    subtitle: "Collected art, a teal sofa, and open balcony doors",
    image: roomCover("presidential-room").src,
    span: "normal",
  },
  {
    id: "exterior",
    title: "The Exterior",
    subtitle: "Deep verandas, hand-plastered walls, lantern-lit stone",
    image: "/images/facade-blue-hour-garden.jpg",
    span: "normal",
  },
  {
    id: "restaurant",
    title: "Beirut",
    subtitle: "Lebanese cuisine, inside the NOYA building.",
    image: "/images/food.jpg",
    // A 4:5 portrait in a 4:3 tile on phones: biased a little below centre
    // so the hummus sits above the title rather than under it.
    position: "50% 60%",
    span: "normal",
  },
  {
    id: "shared-balcony",
    title: "The Shared Balcony",
    subtitle: "A balcony shared between rooms, looking out over the street",
    image: "/images/shared-balcony.jpg",
    span: "normal",
  },

  // Local Artisan
  {
    id: "local-artisan",
    title: "Local Artisan",
    subtitle: "Nepal's craft, tradition, and makers",
    image: "/images/local-artisan.jpg",
    span: "wide",
  },

  // Travel & Tour
  {
    id: "travel-tour",
    title: "Travel & Tour",
    subtitle: "Curated journeys beyond Kathmandu",
    image: "/images/travel-tour.jpg",
    span: "normal",
  },
] as const;

export const restorationSteps = [
  {
    mark: "I",
    title: "What was found",
    body: "Behind later additions, the original stone of a house tracing to the mid-18th century remained largely intact, cracked by the 2015 earthquake but standing. Restoration began by working out what could be kept.",
    image: "/images/restoration-facade-rubble.jpg",
    // Shown in a square frame (see Restoration.tsx): keeps both workers at the right in frame.
    imagePosition: "75% 50%",
    alt: "NOYA during restoration, brick rubble piled in front of the house",
  },
  {
    mark: "II",
    title: "What was kept",
    body: "Floors were re-laid in the same dark timber recovered during restoration. Walls were re-plastered by hand, in the same lime render. Where a beam could be saved, it was saved. Nothing was stripped for the sake of a clean surface.",
    image: "/images/attic-room-four-poster-through-doors.jpg",
    // Keep the overhead timber and the doorway in the square crop.
    imagePosition: "50% 25%",
    alt: "Exposed timber posts and roof beams seen through the open doors of NOYA's restored attic",
  },
  {
    mark: "III",
    title: "What was added",
    body: "Furniture and artifacts were gathered slowly, over years: thangka paintings, porcelain lamps, carved wooden pieces. Additions sit alongside the original structure, not over it.",
    image: "/images/porcelain-lamp-archival-prints.jpg",
    imagePosition: "50% 50%",
    alt: "A porcelain lamp on a wooden table beneath framed prints beside a doorway at NOYA",
  },
];


export const archivalFeature = {
  eyebrow: "From the Archives",
  title: "Before the Name, Before the New Life",
  body: "A feature in Yatra magazine on Kathmandu's palaces turned hotels gave this Gairidhara house a short entry. It noted that visiting Rana dignitaries had been hosted here in the 1980s, that Santosh Bahadur Shah came across the property “run-down,” and that over two years he renovated the original building and added extensions in the same Rana style.",
  source: "Yatra magazine, “Palace Turned Hotels,” p.29, by Ankita Jain",
  // The November 2019 issue of Yatra (Buddha Air's in-flight magazine) as
  // a PDF on Buddha Air's site; the article is on page 29.
  articleUrl: "https://admin.buddhaair.com/upload/mediacenter/pdf/1572843706_2njCD_november-2019-yatrapdf.pdf",
  image: archivalNoyaCourtyard,
  imageAlt: "Magazine photograph of NOYA's turquoise and white facade, with a climbing plant, potted flowers and a white arch beside it",
};

export const founder = {
  name: "Santosh Bahadur Shah",
  role: "Founder",
  intro:
    "Before NOYA, Santosh Bahadur Shah was a London-based commodities trader who founded a UK company trading in Nepali tea and coffee. He travelled Europe to promote it, sampling afternoon tea traditions from Fortnum & Mason to the Kensington Gardens Hotel along the way.",
  vision:
    "He returned to Nepal to open NOYA as a way of bringing that ritual home: a place to introduce afternoon tea culture to Kathmandu residents and visitors alike, inside a house already carrying centuries of its own history.",
  quote:
    "Tea growing was established in Nepal long before coffee was introduced. Every Nepali family drinks tea in the morning and afternoon.",
  detail:
    "NOYA's own kitchen sources its Nepali sweets (barfi, jeri-swari, gulmadi) from family-run sweet shops across Patan, Bhaktapur, and Kathmandu, in keeping with the same instinct that shaped the house's restoration: find what already exists, and give it a place at the table.",
  source: "The Annapurna Express, \"Time for (Noya) tea\"",
};


export const stumbleUponItems = [
  {
    title: "A carved guardian mask",
    body: "Wood, kept above a doorway, not displayed for effect.",
    image: "/images/carved-wooden-guardian-mask.jpg",
  },
  {
    title: "Thangka and collected furnishings",
    body: "Traditional painting, hung rather than displayed.",
    image: roomCover("presidential-room").src,
  },
  {
    title: "A porcelain lamp",
    body: "Gathered slowly, over years, and still in use.",
    image: "/images/porcelain-lamp-archival-prints.jpg",
  },
  {
    title: "An original fireplace",
    body: "Kept through restoration, not replaced by one.",
    image: "/images/heritage-fireplace.jpg",
  },
  {
    title: "Afternoon tea, in the courtyard",
    body: "Old silver, poured slowly, glasshouse light.",
    image: "/images/afternoon-tea-silver-pour-fireplace.jpg",
  },
  {
    title: "A room, glimpsed through an open door",
    body: "A bedroom glimpsed from its adjoining private lounge.",
    image: roomPhotos.bay1.src,
  },
];


export const culturalKathmandu = {
  eyebrow: "Kathmandu, In Season",
  title: "Festivals that still move through the city.",
  intro:
    "Kathmandu's festivals return every year, through the same streets and squares. Two of them are within easy reach of NOYA.",
  events: [
    {
      name: "Indra Jatra",
      body: "Kathmandu's largest street festival, centred on Kathmandu Durbar Square, honouring Indra and the Kumari, the city's living goddess, with a chariot procession watched by the whole valley.",
      // Openly licensed photographs from Wikimedia Commons (not NOYA's own,
      // not AI-generated), credited on the card as their licences require.
      // Masters in media-originals/photos/*-original.jpg.
      image: "/images/indra-jatra-kathmandu.jpg",
      imageAlt: "A festival chariot drawn through a dense crowd in Kathmandu Durbar Square during Indra Jatra, temples and onlookers on the rooftops around it",
      imagePosition: "50% 62%",
      credit: {
        author: "Shadow Ayush",
        source: "https://commons.wikimedia.org/wiki/File:Chariot_procession,_Indra_Jatra,_Kathmandu_Durbar_Square.jpg",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      },
    },
    {
      name: "Khat Jatra",
      body: "Hadigaun's own festival, a short walk from NOYA: in the weeks after Dashain, local deities are carried through its lanes on khats, portable shrines borne on the shoulders.",
      image: "/images/khat-jatra-hadigaun.jpg",
      imageAlt: "Young men carrying and turning a tall, red-canopied festival shrine through a lane of brick houses in Hadigaun",
      imagePosition: "50% 40%",
      credit: {
        author: "Prashim Maharjan",
        source: "https://commons.wikimedia.org/wiki/File:Kai_na_vako_jatra_hadigaun_ma.jpg",
        license: "CC BY 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      },
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Art, History and Heritage pages. Facts about Nepal were checked    */
/*  against UNESCO, the Department of Archaeology's published work     */
/*  and museum sources; NOYA-specific statements are limited to what   */
/*  the photographs show or what a named source says.                  */
/* ------------------------------------------------------------------ */

export const newarCrafts = [
  {
    material: "Wood",
    title: "Windows, struts and doorways",
    body: "Newar carpenters carved the parts of a building that did the work: latticed windows that let in air while keeping a room private, roof struts carved with deities, and the torana, the carved panel above a shrine's door. The finest pieces sit in ordinary lanes rather than behind glass.",
    where: "Bhaktapur's Woodcarving Museum, in the Pujari Math beside the Peacock Window",
  },
  {
    material: "Metal",
    title: "Cast and hammered images",
    body: "Patan has been the valley's centre for metal for centuries: images cast in bronze and copper by the lost-wax method, or raised from sheet copper by repoussé, then gilded. They were made to be worshipped in temples and household shrines, and Patan's workshops still make them.",
    where: "The Patan Museum, opened in 1997 in a restored courtyard of Patan's royal palace",
  },
  {
    material: "Paint",
    title: "Paubha",
    body: "Devotional paintings on cotton, made by Newar painters in Kathmandu, Patan and Bhaktapur, often arranged as a mandala around a central deity. The earliest dated paubhas survive from the fourteenth century. Tibetan thangka is a related tradition; Newar painters worked for Tibetan patrons for generations.",
    where: "Studios around Patan's and Bhaktapur's squares, and museum collections",
  },
  {
    material: "Clay",
    title: "Pottery and terracotta",
    body: "Clay supplies the everyday vessels of Newar households and festivals, along with the brick and terracotta that give the valley's towns their colour. In Bhaktapur, potters still throw and dry their work in the open, in the city's pottery squares.",
    where: "The pottery squares of Bhaktapur",
  },
] as const;

export const aranikoNote = {
  eyebrow: "Further Afield",
  title: "From the Kathmandu Valley to the World",
  body: "In 1261 a young artist from the Kathmandu Valley, Araniko, led some eighty craftsmen to Tibet to build a golden stupa at Sakya. He went on to the Yuan court in Beijing, where the White Stupa of Miaoying Temple, completed in 1279, is still his best-known work. Few places so small have exported so much skill.",
};

export const noyaArtDetails = [
  {
    image: "/images/carved-wooden-guardian-mask.jpg",
    alt: "A carved wooden figure fixed beside a doorway at NOYA, photographed in black and white",
    caption: "A carved wooden figure, fixed beside a doorway.",
  },
  {
    image: "/images/sculpted-face-turquoise-wall.jpg",
    position: "100% 30%",
    alt: "A small crowned face, sculpted in pale relief, set into NOYA's turquoise wall, with the leaves of a climbing plant at the edge of the frame",
    caption: "A sculpted face set into a turquoise wall.",
  },
  {
    image: "/images/hanging-ornament-leaf-pendants.jpg",
    alt: "A dark hanging ornament with leaf-shaped pendants, suspended in front of NOYA's turquoise facade and white balcony",
    caption: "A hanging ornament outside the house, its pendants shaped like leaves.",
  },
  {
    image: "/images/archival-photographs-wall.jpg",
    // The frames sit in the left two-thirds; centred, the 4:5 crop cut the
    // left-hand column of them in half.
    position: "15% 50%",
    alt: "Old black-and-white photographs in dark frames on a wall at NOYA, beside a window",
    caption: "Old photographs, framed and hung in the rooms.",
  },
] as const;

// The house itself, in four eras (History page). Dates and claims are only
// those the revised copy and existing sources give: the 1980s guests match
// the Yatra magazine note above.
export const houseEras = [
  {
    mark: "I",
    era: "The Mid-18th Century",
    title: "The Beginning of the House",
    body: "The core of the building traces to the mid-18th century, long before Gairidhara took its present form. Its surviving structure provides the foundation for everything that followed.",
  },
  {
    mark: "II",
    era: "The Rana Era",
    title: "A New Architectural Expression",
    body: "Later architectural influences brought the house its Neoclassical character. Deep verandas, shuttered windows, and plastered surfaces reflect the wider movement towards European-influenced design in Kathmandu's domestic architecture.",
  },
  {
    mark: "III",
    era: "The Later 20th Century",
    title: "A House That Welcomed Guests",
    body: "By at least the 1980s, the house was already receiving guests in a more private and informal setting. Its connection with hospitality predates the NOYA identity.",
  },
  {
    mark: "IV",
    era: "2015 and Beyond",
    title: "Preservation and Renewal",
    body: "The earthquake of 25 April 2015 cracked the structure, but the house endured. Restoration followed, with further work undertaken ahead of NOYA's reopening. Under Santosh's direction, the project brought the building into a new chapter while retaining as much of its original character as possible.",
  },
] as const;

export const valleyTimeline = [
  {
    mark: "I",
    era: "From the 1st century BCE",
    title: "Before the kingdoms",
    body: "Excavations at Hadigaun, a short walk from NOYA, carried out in the 1980s by Nepal's Department of Archaeology with Italian archaeologists, traced settlement there to around the 1st century BCE. Hadigaun is associated with the palaces of the valley's early kings.",
  },
  {
    mark: "II",
    era: "Licchavi period, c. 400–750 CE",
    title: "Inscriptions in stone",
    body: "The valley's first well-documented rulers left Sanskrit inscriptions, stone sculpture and temples. At Changu Narayan, on a ridge east of Bhaktapur, a pillar carries an inscription of King Manadeva dated 464 CE, among the oldest dated inscriptions in Nepal.",
  },
  {
    mark: "III",
    era: "Malla period, 1201–1769",
    title: "Three kingdoms, three squares",
    body: "Under the Malla kings the valley grew rich on trade between India and Tibet, and on the skill of its Newar artists. From the late 15th century it was divided into three rival kingdoms, Kathmandu, Patan and Bhaktapur, whose kings competed in palaces, temples and public squares. Patan's stone Krishna Mandir (1637) and Bhaktapur's five-tiered Nyatapola (1702) both come from that rivalry.",
  },
  {
    mark: "IV",
    era: "1767–1769",
    title: "The Making of a Kingdom",
    body: "Prithvi Narayan Shah, king of the hill state of Gorkha, took Kirtipur, then Kathmandu, Patan and finally Bhaktapur, ending Malla rule. Kathmandu became the capital of a unified kingdom.",
  },
  {
    mark: "V",
    era: "Rana era, 1846–1951",
    title: "When Kathmandu Discovered a New Architectural Language",
    body: "For a century, hereditary Rana prime ministers ruled in the king's name. They built palaces in a European Neoclassical style, all columns, stucco and tall shuttered windows, which still marks parts of the city.",
  },
  {
    mark: "VI",
    era: "1934 and 2015",
    title: "Two great earthquakes",
    body: "The valley was struck by major earthquakes in 1934 and again on 25 April 2015, when a magnitude 7.8 quake brought down Kathmandu's Kasthamandap pavilion and damaged temples and palaces across the valley.",
  },
  {
    mark: "VII",
    era: "Since 2015",
    title: "An Ancient City, Still Becoming",
    body: "Kasthamandap's reconstruction, completed in 2021, used traditional timber and building methods after residents campaigned against a steel-and-concrete design. The same question, old methods or new, comes up wherever the valley rebuilds.",
  },
] as const;

export const valleyFestivals = [
  {
    name: "Indra Jatra",
    place: "Kathmandu Durbar Square",
    body: "Kathmandu's great street festival, usually held in September. For eight days the old city fills with masked dances, music and processions, and the Kumari, the girl venerated as a living goddess, is drawn through the streets in her chariot.",
  },
  {
    name: "Hadigaun's jatras",
    place: "Hadigaun, a short walk from NOYA",
    body: "In the weeks after Dashain, Hadigaun holds festivals found nowhere else in the valley: a tall decorated pole is raised, and local deities are carried through the lanes on khats, portable shrines borne on the shoulders.",
  },
] as const;

export const monumentZones = [
  {
    mark: "01",
    name: "Kathmandu Durbar Square",
    location: "Hanuman Dhoka, central Kathmandu",
    body: "The old royal palace square, home to the Kumari's carved house and the heart of Indra Jatra. Kasthamandap, the pavilion said to have given Kathmandu its name, stands here again after 2015.",
  },
  {
    mark: "02",
    name: "Patan Durbar Square",
    location: "Lalitpur",
    body: "Malla palace courtyards facing a row of temples in stone, brick and timber. The palace's Keshav Narayan Chowk now holds the Patan Museum.",
  },
  {
    mark: "03",
    name: "Bhaktapur Durbar Square",
    location: "Bhaktapur",
    body: "The best preserved of the three royal cities, where brick lanes, courtyards and pottery squares still surround the palace and the Nyatapola temple.",
  },
  {
    mark: "04",
    name: "Swayambhunath",
    location: "Hilltop, west of Kathmandu",
    body: "A stupa on a wooded hill, sacred to Buddhists and Hindus alike, reached by a long flight of steps. Its origins go back to the Licchavi period.",
  },
  {
    mark: "05",
    name: "Boudhanath",
    location: "Northeast Kathmandu",
    body: "One of the largest stupas in the world, and since the 1960s the centre of a Tibetan Buddhist community that grew up around it after Tibetan refugees settled here.",
  },
  {
    mark: "06",
    name: "Pashupatinath",
    location: "Bagmati River, east Kathmandu",
    body: "Nepal's most important temple of Shiva, with cremation ghats on the riverbank where funeral rites are held every day. The main temple is open only to Hindus.",
  },
  {
    mark: "07",
    name: "Changu Narayan",
    location: "Ridge east of Bhaktapur",
    body: "A temple to Vishnu, rich in stone and wood carving, with a Licchavi inscription dated 464 CE among the oldest in Nepal.",
  },
] as const;









export const guestNotes = [
  {
    quote:
      "The kind of quiet you don't expect in the middle of a city. We sat in the courtyard until it got dark and nobody rushed us.",
    name: "R. Sharma",
    stay: "Bay Room, three nights",
  },
  {
    quote:
      "Every room has a different mood. Ours had a green wall and a lamp that must be a hundred years old.",
    name: "L. Fontaine",
    stay: "Juliet Room, one night",
  },
  {
    quote:
      "Not styled for photographs. It simply looks like this. That's rarer than it should be.",
    name: "A. Devkota",
    stay: "Suite, five nights",
  },
  {
    quote:
      "The drawing room in the morning, before anyone else is awake, is worth the trip on its own.",
    name: "T. Okafor",
    stay: "Corridor Room, two nights",
  },
];

export const stayTiers = [
  {
    name: "The Bay Room",
    eyebrow: "Garden-facing",
    price: "US $145",
    unit: "per night",
    features: [
      "Queen bed, garden-facing windows",
      "Original porcelain lamp fittings",
      "En-suite stone bathroom",
      "Breakfast in the courtyard",
    ],
    highlighted: false,
  },
  {
    name: "The Juliet Room",
    eyebrow: "Most requested",
    price: "US $210",
    unit: "per night",
    features: [
      "King bed, private sitting nook",
      "Thangka-hung reading corner",
      "En-suite stone bathroom",
      "Breakfast in the courtyard",
      "Late checkout, subject to availability",
    ],
    highlighted: true,
  },
  {
    name: "The Suite",
    eyebrow: "Full floor, largest room",
    price: "US $290",
    unit: "per night",
    features: [
      "King bed, separate sitting room",
      "Private balcony over the courtyard",
      "En-suite stone bathroom, deep tub",
      "Breakfast in the courtyard",
      "Priority reservations for dinners",
    ],
    highlighted: false,
  },
];

export const faqs = [
  {
    q: "How old is the house, exactly?",
    a: "The core of the house traces to the mid-18th century, with its Neoclassical character (verandas, shuttered windows, hand-plastered stone) added during the Rana era. It was restored after the 2015 earthquake, and again ahead of reopening as NOYA, in each case keeping as much of the original stone, timber, and plasterwork as could be kept.",
  },
  {
    q: "What time is check-in and check-out?",
    a: "Check-in is from 11:00, check-out by 10:00 PM. If your flight lands early or leaves late, write ahead. We can often hold a room or offer a place to sit with your bags.",
  },
  {
    q: "Is breakfast included?",
    a: "Yes, for all rooms. Breakfast is served in the courtyard in fair weather, and in the drawing room otherwise.",
  },
  {
    q: "Do you host events?",
    a: "Occasionally: artist talks, poetry readings, book launches, curated film screenings, and slow dinners, always at house scale. They are announced separately from room availability, so write to ask what's coming up.",
  },
  {
    q: "Is NOYA suitable for children?",
    a: "The house is a working restoration with stone stairs, low doorways, and antique furniture throughout, so it suits older children better than very young ones. Write to us with your family's ages and we'll tell you honestly whether it's a good fit.",
  },
  {
    q: "Do you allow pets?",
    a: "Small, well-behaved pets are welcome in the Bay Room and Suite by prior arrangement. Please mention this when you enquire.",
  },
  {
    q: "Is there parking?",
    a: "Limited street parking is available on Gairidhara Road. We're happy to arrange a driver or airport transfer if you'd rather not navigate Kathmandu traffic yourself.",
  },
  {
    q: "How do I make a reservation?",
    a: "Call the number below or write to us directly. We reply to every enquiry ourselves, usually within a day.",
  },
];

export const contact = {
  address: "327 Gairidhara Road, Kathmandu 44600, Nepal",
  phone: "+977 980-320-0076",
  email: "contact@noya.com.np",
  phoneHref: "tel:+9779803200076",
  emailHref:
  "https://mail.google.com/mail/?view=cm&fs=1&to=contact@noya.com.np&su=NOYA%20Enquiry",
  checkIn: "11:00",
  checkOut: "10:00 PM",
};

export const social = {
  instagram: "https://www.instagram.com/noya.hotel/?hl=en",
  instagramHandle: "@noya.hotel",
  facebook327: "https://www.facebook.com/327restaurent/",
};

export type NavChild = {
  label: string;
  href: string;
  /** Optional photograph for the desktop Discover panel's image rows (the
   * mobile menu lists the label only). */
  image?: string;
  imageAlt?: string;
  /** object-position for the row's wide crop, e.g. "50% 30%". */
  imagePosition?: string;
};

export type NavPanelFeature = {
  image: string;
  /** Describes the photograph (omitted only where it is purely decorative). */
  imageAlt?: string;
  /** object-position for the photograph's crop, e.g. "50% 60%". */
  imagePosition?: string;
  /** Small label over the intro column; defaults to the navbar label. */
  eyebrow?: string;
  /** Serif title for the panel's intro column. Panels without a group of
   * image rows (every one except Discover) lead with it. */
  title?: string;
  body: string;
  cta: { label: string; href: string };
};

export type NavEntry =
  | { type: "link"; label: string; href: string }
  | {
      type: "panel";
      label: string;
      href: string;
      /** Heading over the desktop panel's link list, when it differs from
       * the groups' own headings (which the mobile menu shows). */
      listHeading?: string;
      groups: {
        heading?: string;
        /** Tighter link spacing — for a group whose items are one continuous
         * sequence (e.g. Art/History/Heritage as "chapters" of one story)
         * rather than separate, unrelated destinations. */
        tight?: boolean;
        links: NavChild[];
      }[];
      feature: NavPanelFeature;
    };

export const navEntries: NavEntry[] = [
  {
    type: "panel",
    label: "Discover",
    href: "/discover",
    listHeading: "Explore",
    groups: [
      {
        heading: "The Story of NOYA",
        tight: true,
        links: [
          {
            label: "Art",
            href: "/art",
            image: "/images/carved-wooden-guardian-mask.jpg",
            imageAlt: "A carved wooden guardian figure fixed beside a doorway at NOYA",
            imagePosition: "50% 22%",
          },
          {
            label: "History",
            href: "/history",
            image: "/images/restoration-facade-rubble.jpg",
            imageAlt: "NOYA during its restoration, the house standing behind piles of brick rubble",
            imagePosition: "50% 55%",
          },
          {
            label: "Heritage",
            href: "/heritage",
            image: "/images/turquoise-wall-shuttered-window.jpg",
            imageAlt: "A tall white-shuttered window set in NOYA's turquoise wall, a flowering climber beside it",
            imagePosition: "50% 40%",
          },
        ],
      },
      {
        heading: "Inside",
        links: [{ label: "Things You Stumble Upon", href: "/#stumble-upon" }],
      },
      {
        heading: "Kathmandu",
        links: [
          { label: "Kathmandu, In Season", href: "/#culture" },
          { label: "Neighbourhood", href: "/heritage#neighbourhood" },
          { label: "Location", href: "/hotel#location" },
        ],
      },
    ],
    feature: {
      image: "/images/facade-dusk.jpg",
      imageAlt: "NOYA's facade on Gairidhara Road, lit at dusk",
      body: "A house shaped by art, history & heritage. Explore the stories, traditions, architecture, and experiences that give NOYA its sense of place.",
      cta: { label: "Discover NOYA", href: "/discover" },
    },
  },
  // Section menus: each lists its page's own sections (anchors and labels as
  // the page sets them), leads with the page's hero title or its first
  // section heading and subtitle, and shows one photograph from that page
  // that no other menu uses. Rooms has no sections or individual rooms of
  // its own (one gallery; "six rooms, no two alike"), so its list points to
  // the existing places that show them instead.
  //
  // navEntries is defined above beirut, ameyaStudio and ananyaHolidays, so
  // their names and taglines are copied here rather than referenced (a
  // reference would read them before they are initialised).
  {
    type: "panel",
    label: "About",
    href: "/about",
    groups: [
      {
        heading: "On this page",
        links: [
          { label: "Founder", href: "/about#founder" },
          { label: "Our Story", href: "/about#story" },
          { label: "The House", href: "/about#house" },
          { label: "The Restoration", href: "/about#restoration" },
          { label: "Architecture", href: "/about#architecture" },
          { label: "Kathmandu", href: "/about#kathmandu" },
        ],
      },
    ],
    feature: {
      image: roomPhotos.bay1.src,
      imageAlt: roomPhotos.bay1.alt,
      imagePosition: "50% 60%",
      title: "Not Designed to Follow. Imagined to Belong.",
      body: "A historic home, a personal vision, and a different understanding of luxury.",
      cta: { label: "About NOYA", href: "/about" },
    },
  },
  {
    type: "panel",
    label: "Hotel",
    href: "/hotel",
    groups: [
      {
        heading: "On this page",
        links: [
          { label: "The Property", href: "/hotel#property" },
          { label: "Around the House", href: "/hotel#rooms" },
          { label: "Architecture", href: "/hotel#architecture" },
          { label: "Heritage", href: "/hotel#heritage" },
          { label: "Dining", href: "/hotel#dining" },
          { label: "Experiences", href: "/hotel#experiences" },
          { label: "Location", href: "/hotel#location" },
        ],
      },
    ],
    feature: {
      image: "/images/courtyard.jpg",
      imageAlt: "The courtyard at NOYA",
      title: "An Intimate World Behind the City",
      body: "Kathmandu, Nepal. A single restored property in Gairidhara.",
      cta: { label: "Discover the Property", href: "/hotel" },
    },
  },
  {
    type: "panel",
    label: "Rooms",
    href: "/rooms",
    groups: [
      {
        heading: "Explore the Rooms",
        links: [
          // Each label is the heading its destination already carries.
          { label: "Inside the Rooms", href: "/rooms" },
          { label: "Around the House", href: "/hotel#rooms" },
          { label: "The House", href: "/about#house" },
        ],
      },
    ],
    feature: {
      image: roomCover("attic-room").src,
      imageAlt: roomCover("attic-room").alt,
      eyebrow: "The Rooms",
      title: "Six Rooms. One Story. Six Ways to Experience It.",
      body: "Original panelling, thangka-hung corners, and blackened timber floors, in a house that dates to the mid-18th century.",
      cta: { label: "Discover the Rooms", href: "/rooms" },
    },
  },
  {
    type: "panel",
    label: "Events",
    href: "/events",
    groups: [
      {
        heading: "On this page",
        links: [
          { label: "The Setting", href: "/events#setting" },
          { label: "Event Types", href: "/events#gatherings" },
          { label: "Spaces", href: "/events#celebrations" },
          { label: "Guests", href: "/events#guests" },
          { label: "Gallery", href: "/events#gallery" },
          { label: "Enquire", href: "/events#enquire" },
        ],
      },
    ],
    feature: {
      image: "/images/courtyard-acoustic-concert.jpg",
      imageAlt: "Two guitarists performing for a seated audience in NOYA's courtyard in the evening",
      title: "A House Alive With Ideas",
      body: "Occasional gatherings, hosted at house scale in Gairidhara, Kathmandu.",
      cta: { label: "Discover Events", href: "/events" },
    },
  },
  {
    type: "panel",
    label: "Restaurant",
    href: "/restaurant",
    groups: [
      {
        heading: "On this page",
        links: [
          { label: "Lebanese Cuisine", href: "/restaurant#about" },
          { label: "Dining Experience", href: "/restaurant#experience" },
          { label: "Place", href: "/restaurant#place" },
        ],
      },
    ],
    feature: {
      image: "/images/food.jpg",
      imageAlt: "A Beirut spread of mezze, dips and salads on a woven table runner",
      imagePosition: "50% 60%",
      title: "A Meeting of Cultures at the Table",
      body: "Lebanese cuisine, inside the NOYA building.",
      cta: { label: "Discover Dining", href: "/restaurant" },
    },
  },
  {
    type: "panel",
    label: "Local Artisan",
    href: "/local-artisan",
    groups: [
      {
        heading: "On this page",
        links: [
          { label: "The Maker", href: "/local-artisan#maker" },
          { label: "Place", href: "/local-artisan#place" },
          { label: "Jewellery", href: "/local-artisan#jewellery" },
          { label: "Philosophy", href: "/local-artisan#philosophy" },
        ],
      },
    ],
    feature: {
      image: "/images/local-artisan.jpg",
      imageAlt: "A ring being soldered at a jeweller's bench",
      title: "The Hands, Stories, and Traditions of Nepal",
      body: "Place-based jewellery, handmade in Nepal.",
      cta: { label: "Discover AMEYA Studio", href: "/local-artisan" },
    },
  },
  {
    type: "panel",
    label: "Travel & Tour",
    href: "/travel-tour",
    groups: [
      {
        heading: "On this page",
        links: [
          { label: "Ways to Travel", href: "/travel-tour#ways-to-travel" },
          { label: "Featured Journeys", href: "/travel-tour#featured-journeys" },
          { label: "Why Ananya", href: "/travel-tour#why-ananya" },
          { label: "Travel Philosophy", href: "/travel-tour#philosophy" },
        ],
      },
    ],
    feature: {
      image: "/images/travel-tour.jpg",
      imageAlt: "Snow-capped Himalayan peaks above forested hills",
      imagePosition: "50% 30%",
      title: "Let Nepal Unfold, One Discovery at a Time",
      body: "Tailor-made journeys across Nepal, Bhutan, and Tibet.",
      cta: { label: "Discover Ananya Holidays", href: "/travel-tour" },
    },
  },
];

export type NavGroup = {
  label: string;
  href: string;
  description: string;
  image: string;
  links: NavChild[];
};

export const navigationMenu: NavGroup[] = [
  {
    label: "About",
    href: "/about",
    description: "The story of the house, its restoration, and its place in Gairidhara.",
    image: "/images/facade-dusk.jpg",
    links: [
      { label: "Our Story", href: "/about#story" },
      { label: "The House", href: "/about#house" },
      { label: "Heritage", href: "/heritage" },
    ],
  },
  {
    label: "Hotel",
    href: "/hotel",
    description: "NOYA Kathmandu: the property, its rooms, and its architecture.",
    image: "/images/courtyard.jpg",
    links: [
      { label: "NOYA Kathmandu", href: "/hotel" },
      { label: "The Property", href: "/hotel#property" },
      { label: "Rooms", href: "/hotel#rooms" },
    ],
  },
  {
    label: "Rooms",
    href: "/rooms",
    description: "Six rooms, each restored on its own terms.",
    image: roomCover("presidential-room").src,
    links: [{ label: "Stay Information", href: "/rooms" }],
  },
  {
    label: "Art",
    href: "/art",
    description: "Newar wood, metal, paint and clay, and the details guests find at NOYA.",
    image: "/images/carved-wooden-guardian-mask.jpg",
    links: [{ label: "Art at NOYA", href: "/art" }],
  },
  {
    label: "History",
    href: "/history",
    description: "The Kathmandu Valley's story, from its first settlements to the Rana-style house that became NOYA.",
    image: "/images/restoration-facade-rubble.jpg",
    links: [{ label: "The Story", href: "/history" }],
  },
  {
    label: "Heritage",
    href: "/heritage",
    description: "Festivals, courtyards and the shared table: the valley's living culture, seen from NOYA.",
    image: "/images/masked-dance-before-seated-child-musicians.jpg",
    links: [{ label: "Living Heritage", href: "/heritage" }],
  },
  {
    label: "Restaurant",
    href: "/restaurant",
    description: "Beirut: Lebanese cuisine, mezze, and an open kitchen inside the NOYA building.",
    image: "/images/food.jpg",
    links: [
      { label: "Beirut", href: "/restaurant" },
      { label: "Dining Experience", href: "/restaurant#experience" },
      { label: "Place", href: "/restaurant#place" },
    ],
  },
  {
    label: "Local Artisan",
    href: "/local-artisan",
    description: "AMEYA Studio: place-based jewellery, handmade by Nepali artisans.",
    image: ameyaCraftedImage,
    links: [
      { label: "AMEYA Studio", href: "/local-artisan" },
      { label: "The Maker", href: "/local-artisan#maker" },
      { label: "Jewellery", href: "/local-artisan#jewellery" },
    ],
  },
  {
    label: "Travel & Tour",
    href: "/travel-tour",
    description: "Ananya Holidays: tailor-made journeys across Nepal, Bhutan, and Tibet.",
    image: "/images/travel-tour.jpg",
    links: [
      { label: "Ananya Holidays", href: "/travel-tour" },
      { label: "Ways to Travel", href: "/travel-tour#ways-to-travel" },
      { label: "Featured Journeys", href: "/travel-tour#featured-journeys" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    description: "Artist talks, readings, screenings, and slow dinners, kept to house scale.",
    image: "/images/masked-dance-red-scarves-evening.jpg",
    links: [
      { label: "Gatherings", href: "/events#gatherings" },
      { label: "Celebrations", href: "/events#celebrations" },
    ],
  },
];

export const eventTypes = [
  {
    title: "Artist Talks",
    body: "Small, seated conversations held in the drawing room, kept intimate by design.",
  },
  {
    title: "Poetry Readings",
    body: "Quiet evenings of readings, usually around the courtyard or library.",
  },
  {
    title: "Book Launches",
    body: "A house-scaled setting for launches that call for atmosphere over capacity.",
  },
  {
    title: "Film Screenings",
    body: "Curated screenings for a small, seated audience.",
  },
  {
    title: "Slow Dinners",
    body: "Seated dinners in the courtyard or drawing room, planned around the kitchen's pace rather than a set menu.",
  },
];

export type Partner = {
  eyebrow: string;
  name: string;
  description: string;
  href: string;
  linkLabel: string;
};

export const discoverPartner: Partner = {
  eyebrow: "Beyond the House",
  name: "Ananya Holidays",
  description:
    "Tailor-made journeys across Nepal, from treks and heritage journeys to private tours and day trips.",
  href: "https://www.ananyanepal.com/",
  linkLabel: "Visit Ananya Holidays",
};

export const beirut = {
  eyebrow: "Restaurant",
  name: "Beirut",
  category: "Lebanese Cuisine",
  tagline: "Lebanese cuisine, inside the NOYA building.",
  hours: "Open daily, 12–9pm",
  description:
    "Beirut brings Levantine cooking to Gairidhara: mezze built for sharing, dishes from an open kitchen, and a room that doesn't rush a meal.",
  experience:
    "Mezze and shared plates, grilled dishes, halal meat, and vegetarian-friendly choices. Seating extends into a garden, weather permitting.",
  place:
    "Beirut occupies its own space inside the NOYA building on Gairidhara Road, with its own kitchen and tables under the same roof.",
  instagram: "https://www.instagram.com/beirutnepal/",
  facebook: "https://www.facebook.com/profile.php?id=61589505304479",
  logo: "beirut_logo.jpg",
};

export const ameyaStudio = {
  eyebrow: "Local Artisan",
  name: "AMEYA Studio",
  category: "Jewellery, Local Artisan",
  tagline: "Place-based jewellery, handmade in Nepal.",
  idea:
    "Each AMEYA piece is designed around a real place rather than a passing trend: jewellery meant to carry a memory, not just to decorate.",
  maker:
    "Founded by Anusha, whose collections are drawn from places she has known firsthand.",
  craft:
    "Made by hand by Nepali artisans, using techniques passed down through generations. Slow craft, not production-line jewellery.",
  places: ["Kathmandu", "Langtang", "Janakpur", "Pachpokhari"],
  categories: [
    "Earrings",
    "Brooches",
    "Rings",
    "Neckpieces",
    "Bangles",
    "Foot Accessories",
    "Festive Collection",
  ],
  philosophy:
    "Pieces are made to last rather than be discarded: designed to be repaired and restored, not replaced, with lasting form chosen over trends.",
  href: "https://ameyastudio.com/",
  logo: "ameya_logo.jpg",
};

export const ananyaHolidays = {
  eyebrow: "Travel & Tour",
  name: "Ananya Holidays",
  category: "Travel & Tours",
  tagline: "Tailor-made journeys across Nepal, Bhutan, and Tibet.",
  introduction:
    "Ananya Holidays builds tailor-made journeys across Nepal, Bhutan, and Tibet, for families, couples, and small private groups. Each trip is planned around the traveller rather than a fixed itinerary.",
  waysToTravel: [
    { title: "Private & Tailor-Made", body: "Holidays built around a group's own pace and interests." },
    { title: "Walking & Trekking", body: "Guided routes through Nepal's hills and mountains." },
    { title: "Adventure & Wildlife", body: "Rafting, paragliding, mountain biking, and safari in Chitwan." },
    { title: "Spiritual Journeys", body: "Buddhist heritage sites and centuries-old sacred ground." },
    { title: "Day Trips & Short Breaks", body: "Shorter, city-adjacent ways to see more of Nepal." },
  ],
  featuredJourneys: [
    { mark: "I", title: "Everest Base Camp Trek", body: "One of the world's classic treks, on foot to the foot of Everest." },
    { mark: "II", title: "Classic Nepal", body: "City, jungle, and mountain, covered in comfort." },
    { mark: "III", title: "Chitwan Wildlife Safari", body: "Close encounters with Chitwan National Park's wildlife." },
    { mark: "IV", title: "Buddhist Heritage of Nepal", body: "A journey through sacred sites and living tradition." },
    { mark: "V", title: "Adventure Holiday", body: "Bungee, rafting, paragliding, and mountain biking in one trip." },
  ],
  whyAnanya:
    "A small, local team that builds each trip individually, with personalised service, first-hand local knowledge, and routes planned around the traveller rather than a catalogue.",
  philosophy:
    "Travel built on people, culture, and landscape, planned with the same care as a stay at the house it starts from.",
  href: "https://www.ananyanepal.com/",
  logo: "ananya-holidays-logo.png",
};

export type PageSeo = {
  title: string;
  description: string;
  path: string;
};

export const pageSeo: Record<string, PageSeo> = {
  home: {
    title: "NOYA | Luxury Heritage Boutique Hotel in Kathmandu, Nepal",
    description:
      "Discover NOYA, a restored heritage boutique hotel in Gairidhara, Kathmandu, conceived by Santosh Bahadur Shah. Experience art, antiques, intimate luxury, and the cultural soul of Nepal.",
    path: "/",
  },
  discover: {
    title: "Discover NOYA | Kathmandu",
    description:
      "An introduction to NOYA in Gairidhara, Kathmandu: the house and its art, history, and heritage, its rooms, dining, events, and the local partners it works with.",
    path: "/discover",
  },
  about: {
    title: "About NOYA | A Distinctive Heritage Hotel in Kathmandu",
    description:
      "Meet the vision behind NOYA, a historic Kathmandu home restored and individually designed by Santosh Bahadur Shah, bringing together personal art collections, antiques, and intimate hospitality.",
    path: "/about",
  },
  hotel: {
    title: "Luxury Heritage Hotel in Kathmandu | Stay at NOYA",
    description:
      "Experience NOYA, an intimate heritage boutique hotel in Gairidhara, Kathmandu, with six individually designed rooms, a tranquil courtyard, a personal art collection, and thoughtful hospitality.",
    path: "/hotel",
  },
  rooms: {
    title: "Luxury Boutique Hotel Rooms in Kathmandu | NOYA",
    description:
      "Discover six distinctive rooms at NOYA, a restored heritage boutique hotel in Kathmandu, where historic architecture, antique furnishings, original details, and personal touches create an intimate stay.",
    path: "/rooms",
  },
  events: {
    title: "Art, Literary & Cultural Events in Kathmandu | NOYA",
    description:
      "Discover intimate cultural gatherings at NOYA in Kathmandu, from artist talks and poetry readings to book launches and film screenings in a distinctive heritage setting.",
    path: "/events",
  },
  reserve: {
    title: "Reserve | NOYA, Kathmandu",
    description:
      "Request a reservation at NOYA, a restored 18th-century heritage home in Gairidhara, Kathmandu.",
    path: "/reserve",
  },
  restaurant: {
    title: "Beirut at NOYA | Lebanese Dining in Kathmandu",
    description:
      "Discover Beirut at NOYA, a Lebanese restaurant in Gairidhara, Kathmandu, offering a distinct dining experience within a restored heritage home.",
    path: "/restaurant",
  },
  localArtisan: {
    title: "Nepali Artisans, Traditional Crafts & Local Makers | NOYA",
    description:
      "Explore Nepal's traditional crafts, from Newar woodcarving and paubha painting to Patan metalwork, Bhaktapur pottery, and handwoven textiles, through NOYA's appreciation of art and heritage.",
    path: "/local-artisan",
  },
  travelTour: {
    title: "Kathmandu Cultural Tours & Nepal Travel Experiences | NOYA",
    description:
      "Discover Kathmandu Valley heritage, traditional Nepali crafts, historic temples, and journeys beyond the capital while staying at NOYA, a heritage boutique hotel in Kathmandu.",
    path: "/travel-tour",
  },
};
