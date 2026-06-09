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
    doshaSupport: "Vata-Kapha balancing",
    translations: {
      hi: {
        name: "शिलाजीत",
        title: "शिलाजीत",
        category: "इम्युनिटी केयर",
        priceHint: "₹1,250 से / 10g",
        benefits: ["दैनिक ऊर्जा समर्थन", "पुनर्जीवन देखभाल", "पारंपरिक खनिज राल"],
        usage: "नाश्ते के बाद रोज़ एक बार गर्म दूध या पानी के साथ मटर के दाने जितनी मात्रा लें, या विशेषज्ञ की सलाह अनुसार लें।",
        ingredients: "शुद्ध शिलाजीत, हर्बल शुद्धिकरण माध्यम, प्राकृतिक खनिज राल अर्क",
        howMade:
          "राल को धीरे-धीरे शुद्ध किया जाता है, दिखाई देने वाली अशुद्धियों को छाना जाता है, और फिर कम ताप पर संसाधित किया जाता है ताकि प्राकृतिक बनावट और सुगंध बनी रहे।",
        sideEffects: [
          "कुछ उपयोगकर्ताओं को यह गर्म लग सकता है।",
          "यदि पेट में असुविधा या बेचैनी हो तो उपयोग बंद करें।",
          "गर्भावस्था, स्तनपान, या नियमित दवा लेने की स्थिति में योग्य चिकित्सक से परामर्श लें।"
        ],
        purityTests: [
          "हेवी मेटल जांच",
          "फुल्विक एसिड सत्यापन",
          "नमी और राख विश्लेषण",
          "बैच ट्रेसबिलिटी जांच"
        ]
      }
    }
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
    doshaSupport: "Vata calming",
    translations: {
      hi: {
        name: "सन चार्ज्ड जॉइंट पेन ऑयल",
        title: "सन चार्ज्ड जॉइंट पेन ऑयल",
        category: "जॉइंट वेलनेस",
        priceHint: "₹780 से / 100ml",
        benefits: ["जोड़ों में आराम", "मांसपेशियों को शांति", "सूर्य-चार्ज्ड हर्बल इन्फ्यूजन"],
        usage: "प्रभावित हिस्से पर 10 से 15 मिनट तक गुनगुना तेल मालिश करें, दिन में एक या दो बार, या निर्देशानुसार।",
        ingredients: "तिल का तेल आधार, महानारायण तेल, विंटरग्रीन अर्क, हर्बल इन्फ्यूजन",
        howMade:
          "जड़ी-बूटियों को गर्म तेल आधार में धीरे-धीरे मिलाया जाता है, छाना जाता है, और बोतलबंदी से पहले आराम दिया जाता है ताकि फॉर्मूलेशन स्थिर और मालिश के लिए आसान रहे।",
        sideEffects: [
          "अगर त्वचा संवेदनशील है तो पहले पैच टेस्ट करें।",
          "खुले घाव या कटी हुई त्वचा पर न लगाएं।",
          "लालिमा, जलन, या खुजली दिखे तो उपयोग बंद करें।"
        ],
        purityTests: [
          "रैंसिडिटी जांच",
          "माइक्रोबियल स्क्रीनिंग",
          "विस्कोसिटी सत्यापन",
          "सील और बैच ऑडिट"
        ]
      }
    }
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
    doshaSupport: "Kapha balancing",
    translations: {
      hi: {
        name: "स्काई फ्रूट (शुगर बादाम)",
        title: "स्काई फ्रूट (शुगर बादाम)",
        category: "जड़ी-बूटियाँ और चूर्ण",
        priceHint: "₹460 से / 200g",
        benefits: ["त्वरित ऊर्जा समर्थन", "स्नैक-टाइम पोषण", "मीठा ड्राई फ्रूट मिश्रण"],
        usage: "अपने दैनिक आहार के अनुसार भोजन के बाद 1 से 2 टुकड़े खाएं या मध्य-सुबह स्नैक के रूप में लें।",
        ingredients: "बादाम, शुगर कोटिंग, इलायची की झलक, प्राकृतिक ड्राई फ्रूट मिश्रण",
        howMade:
          "चुने हुए बादाम साफ किए जाते हैं, हल्के से कोट किए जाते हैं, और ताज़गी व बनावट बचाने के लिए छोटे बैच में पैक किए जाते हैं।",
        sideEffects: [
          "इसमें चीनी है, इसलिए सख्त लो-सुगर डाइट के लिए उपयुक्त नहीं हो सकता।",
          "ज्यादा मात्रा में खाने पर भारी लग सकता है।",
          "यदि आप नट्स के प्रति संवेदनशील हैं तो एलर्जी की जांच करें।"
        ],
        purityTests: [
          "विदेशी कण निरीक्षण",
          "नमी नियंत्रण जांच",
          "पैकेजिंग स्वच्छता समीक्षा",
          "बैच लेबल सत्यापन"
        ]
      }
    }
  }
];
