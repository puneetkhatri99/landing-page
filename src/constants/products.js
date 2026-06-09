import shilajeetImg from "../assets/shilajit.webp";
import jointOilImg from "../assets/oil.webp";
import skyFruitImg from "../assets/sky_fruit.webp";

export const PRODUCTS = [
  {
    slug: "shilajeet",
    sku: "SC-SHIL-250",
    name: "Shilajeet",
    title: "Shilajeet",
    category: "Immunity Care",
    priceHint: "From ₹1,250 / 10g",
    basePrice: 1250,
    packSize: "10g",
    alt: "Ayurvedic shilajeet resin and herbal preparation",
    benefits: ["Daily vitality support", "Rejuvenation care", "Traditional mineral resin"],
    usage: "Take a pea-sized portion once daily with warm milk or water after breakfast, or as advised by an expert.",
    ingredients: "Purified shilajeet, herbal purification medium, natural mineral resin extracts",
    howMade:
      "The resin is gently purified, filtered for visible impurities, and then processed at low heat so the natural texture and aroma remain intact.",
    sideEffects: [
      "May feel warming for some users.",
      "Stop use if it causes stomach discomfort or restlessness.",
      "Consult a qualified practitioner during pregnancy, breastfeeding, or if you take ongoing medication."
    ],
    purityTests: [
      "Heavy-metal screening",
      "Fulvic acid verification",
      "Moisture and ash analysis",
      "Batch traceability check"
    ],
    images: [{ src: shilajeetImg, alt: "Shilajeet product image" }],
    certifications: ["Lab Tested", "Batch Tracked"],
    doshaSupport: "Vata-Kapha balancing"
  },
  {
    slug: "joint-pain-oil",
    sku: "SC-JOINT-100",
    name: "Sun Charged Joint Pain Oil",
    title: "Sun Charged Joint Pain Oil",
    category: "Joint Wellness",
    priceHint: "From ₹780 / 100ml",
    basePrice: 780,
    packSize: "100ml",
    alt: "Ayurvedic joint pain oil with herbs and oils",
    benefits: ["Joint comfort", "Muscle relaxation", "Sun-charged herbal infusion"],
    usage: "Massage warm oil onto the affected area for 10 to 15 minutes, once or twice daily, or as directed.",
    ingredients: "Sesame oil base, mahanarayan taila, wintergreen extract, herbal infusions",
    howMade:
      "Herbs are slowly infused into a warmed oil base, filtered, and rested before bottling so the formulation stays stable and easy to massage.",
    sideEffects: [
      "Patch test first if your skin is sensitive.",
      "Avoid applying to broken skin or open wounds.",
      "Discontinue use if you notice redness, burning, or itching."
    ],
    purityTests: [
      "Rancidity check",
      "Microbial screening",
      "Viscosity verification",
      "Seal and batch audit"
    ],
    images: [{ src: jointOilImg, alt: "Joint pain oil product image" }],
    certifications: ["Traditional Formula", "Small Batch"],
    doshaSupport: "Vata calming"
  },
  {
    slug: "sky-fruit-sugar-badam",
    sku: "SC-SKY-200",
    name: "Sky Fruit (Sugar Badam)",
    title: "Sky Fruit (Sugar Badam)",
    category: "Herbs & Powders",
    priceHint: "From ₹460 / 200g",
    basePrice: 460,
    packSize: "200g",
    alt: "Sugar badam dry fruit blend",
    benefits: ["Quick energy support", "Snack-time nourishment", "Sweet dry fruit blend"],
    usage: "Enjoy 1 to 2 pieces after meals or as a mid-morning snack, depending on your daily diet plan.",
    ingredients: "Badam, sugar coating, cardamom trace, natural dry fruit blend",
    howMade:
      "Selected almonds are cleaned, lightly coated, and packed in small batches to protect texture and freshness.",
    sideEffects: [
      "Contains sugar and may not suit strict low-sugar diets.",
      "May feel heavy if eaten in large quantities.",
      "Check allergens before use if you are sensitive to nuts."
    ],
    purityTests: [
      "Foreign-particle inspection",
      "Moisture control check",
      "Packaging hygiene review",
      "Batch label verification"
    ],
    images: [{ src: skyFruitImg, alt: "Sky fruit sugar badam product image" }],
    certifications: ["Fresh Packed", "Quality Checked"],
    doshaSupport: "Kapha balancing"
  }
];
