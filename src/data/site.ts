export const rooms = [
  {
    id: "facade",
    title: "The Façade",
    subtitle: "Restored elevation, 18th-century stonework",
    image: "/images/hero-exterior-night.jpg",
    span: "wide",
    featured: true,
  },
  {
    id: "courtyard",
    title: "The Courtyard",
    subtitle: "Stone paving, potted geranium, morning light",
    image: "/images/courtyard-alley.jpg",
    span: "normal",
  },
  {
    id: "drawing-room",
    title: "The Drawing Room",
    subtitle: "Original panelling, curated tapestries",
    image: "/images/drawing-room.jpg",
    span: "normal",
  },
  {
    id: "suite",
    title: "The Suite",
    subtitle: "Blackened timber floors, teal upholstery",
    image: "/images/suite.jpg",
    span: "normal",
  },
  {
    id: "juliet",
    title: "The Juliet Room",
    subtitle: "Thangka above the hearth chair",
    image: "/images/juliet-room.jpg",
    span: "normal",
  },
  {
    id: "bay",
    title: "The Bay Room",
    subtitle: "Porcelain lamp, garden-facing windows",
    image: "/images/bay-room.jpg",
    span: "normal",
  },
  {
    id: "corridor",
    title: "The Corridor",
    subtitle: "A telephone that no longer rings",
    image: "/images/artifact-telephone.jpg",
    span: "normal",
  },
  {
    id: "library",
    title: "The Library Bar",
    subtitle: "Glasshouse light, old bindings, house pours",
    image: "/images/library-bar.jpg",
    span: "wide",
  },
] as const;

export const restorationSteps = [
  {
    mark: "I",
    title: "What was found",
    body:
      "Behind later additions, the original stone and timber of the 1920s house remained largely intact — cracked by the 2015 earthquake, but standing. Restoration began with what the building had already decided to keep.",
    image: "/images/facade-day.jpg",
  },
  {
    mark: "II",
    title: "What was kept",
    body:
      "Floors were re-laid in the same dark timber. Walls were re-plastered by hand, in the same lime render. Where a beam could be saved, it was saved. Nothing was stripped for the sake of a clean surface.",
    image: "/images/courtyard-corridor.jpg",
  },
  {
    mark: "III",
    title: "What was added",
    body:
      "Furniture and artifacts were gathered slowly, over years — thangka paintings, porcelain lamps, a rotary telephone that no longer works. Additions sit alongside the original structure, not over it.",
    image: "/images/drawing-room-2.jpg",
  },
];

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
    a: "The core structure dates to the early 20th century, built in a Neoclassical style typical of Gairidhara at the time. It was restored after the 2015 earthquake, and again ahead of reopening as NOYA, in each case keeping as much of the original stone, timber, and plasterwork as could be kept.",
  },
  {
    q: "What time is check-in and check-out?",
    a: "Check-in is from 14:00, check-out by 11:00. If your flight lands early or leaves late, write ahead — we can often hold a room or offer a place to sit with your bags.",
  },
  {
    q: "Is breakfast included?",
    a: "Yes, for all rooms. Breakfast is served in the courtyard in fair weather, and in the drawing room otherwise.",
  },
  {
    q: "Do you host events?",
    a: "Occasionally — artist talks, poetry readings, book launches, curated film screenings, and slow dinners, kept small and kept quiet. These are announced separately from room availability; write to ask what's upcoming.",
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
    a: "Call the number below or write to us directly — we reply to every enquiry ourselves, usually within a day.",
  },
];

export const contact = {
  address: "327 Gairidhara Road, Kathmandu 44600, Nepal",
  phone: "+977 980-320-0076",
  phoneHref: "tel:+9779803200076",
  checkIn: "14:00",
  checkOut: "11:00",
};
