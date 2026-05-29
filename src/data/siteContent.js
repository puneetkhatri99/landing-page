export const CONTACT_NUMBER = "+91 6395675151";
export const WHATSAPP_NUMBER = "916395675151";

export const STATS = [
  { label: "Trusted Families", value: "8,000+" },
  { label: "Herbal Formulations", value: "120+" },
  { label: "Years of Practice", value: "18+" }
];

export const PRODUCT_CATEGORIES = [
  "Herbs & Powders",
  "Medicated Oils",
  "Digestive Support",
  "Immunity Care",
  "Joint Wellness",
  "Women's Wellness"
];

export const QUALITY_ASSURANCES = [
  "Ingredient sourcing from verified farms",
  "Small-batch processing for freshness",
  "Traditional formulation review",
  "Clear usage guidance on every product"
];

export const PRODUCTS = [
  {
    sku: "SC-MOR-250",
    imageKey: "herbs",
    category: "Immunity Care",
    title: "Sun-Charged Moringa Blend",
    alt: "Sun-charged herbs and moringa leaves",
    basePrice: 540,
    packSize: "250g",
    priceHint: "From ₹540 / 250g",
    benefits: ["Daily vitality", "Natural detox", "Plant protein support"],
    ingredients: "Moringa leaf, dry ginger, amla, tulsi",
    usage: "1 tsp with warm water after breakfast.",
    certifications: ["GMP", "Lab Tested"],
    doshaSupport: "Vata-Pitta balancing"
  },
  {
    sku: "CP-PR-100",
    imageKey: "oils",
    category: "Joint Wellness",
    title: "Cold-Pressed Pain Relief Oil",
    alt: "Ayurvedic therapeutic oils and extracts",
    basePrice: 780,
    packSize: "100ml",
    priceHint: "From ₹780 / 100ml",
    benefits: ["Joint comfort", "Muscle relaxation", "Night-time relief"],
    ingredients: "Mahanarayan taila base, sesame oil, wintergreen extract",
    usage: "Massage warm oil on affected area for 10 minutes.",
    certifications: ["Traditional Formula", "Small Batch"],
    doshaSupport: "Vata calming"
  },
  {
    sku: "DA-CH-150",
    imageKey: "herbs",
    category: "Digestive Support",
    title: "Digestive Agni Churna",
    alt: "Digestive churna made with Ayurvedic spices",
    basePrice: 390,
    packSize: "150g",
    priceHint: "From ₹390 / 150g",
    benefits: ["Improves digestion", "Reduces bloating", "Supports metabolism"],
    ingredients: "Ajwain, jeera, saunth, black salt, trikatu",
    usage: "Half tsp after meals with lukewarm water.",
    certifications: ["No Artificial Additives", "Sun-Dried Ingredients"],
    doshaSupport: "Kapha-Vata support"
  }
];

export const ARTICLES = [
  {
    id: "sun-charged-potency",
    title: "How Sun-Charged Herbs Preserve Potency",
    date: "May 2026",
    readTime: "6 min read",
    excerpt:
      "Understand the Ayurvedic logic behind sunlight drying, prana preservation, and ingredient stability.",
    tags: ["Herbal Processing", "Quality Assurance", "Ayurveda Basics"],
    points: [
      "Controlled sunlight drying helps maintain aroma and active plant compounds.",
      "Slow drying lowers moisture without harsh heat shock.",
      "Batch tracking improves consistency across seasonal harvests."
    ]
  },
  {
    id: "right-oil-joint-muscle",
    title: "Choosing the Right Oil for Joint and Muscle Support",
    date: "April 2026",
    readTime: "7 min read",
    excerpt:
      "A practical guide to selecting medicated oils based on body type, pain pattern, and daily routine.",
    tags: ["Pain Care", "Vata", "Lifestyle"],
    points: [
      "Dry, cracking discomfort usually responds better to warming Vata-calming oils.",
      "Post-exercise tightness often benefits from local warm massage before sleep.",
      "Consistency in daily application is more important than occasional heavy use."
    ]
  },
  {
    id: "seasonal-dinacharya",
    title: "Building a Seasonal Ayurvedic Daily Routine",
    date: "March 2026",
    readTime: "5 min read",
    excerpt:
      "Simple dinacharya steps for digestion, sleep quality, and immunity across changing weather.",
    tags: ["Dinacharya", "Immunity", "Seasonal Wellness"],
    points: [
      "Start mornings with warm water and gentle movement to activate digestion.",
      "Shift meals by season: lighter in spring, grounding in cooler months.",
      "Protect sleep with low-stimulus evenings and fixed bedtime windows."
    ]
  }
];

export const DEFAULT_REVIEWS = [
  {
    name: "Ritika Sharma",
    location: "Jaipur",
    quote:
      "Their digestive blend worked gently and effectively. I now reorder monthly for my family.",
    rating: 5
  },
  {
    name: "Amit Verma",
    location: "Delhi",
    quote:
      "The joint oil quality is premium. Visible relief within a week and excellent consultation support.",
    rating: 5
  },
  {
    name: "Neha Kulkarni",
    location: "Pune",
    quote:
      "I appreciated the transparent ingredient details and practical usage guidance.",
    rating: 4
  }
];
