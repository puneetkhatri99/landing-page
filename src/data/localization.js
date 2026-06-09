import { DEFAULT_REVIEWS, PRODUCT_CATEGORIES, STATS } from "./siteContent";

export const LANGUAGE_OPTIONS = {
  en: { shortLabel: "EN", name: "English" },
  hi: { shortLabel: "हिन्दी", name: "Hindi" }
};

export const LANDING_COPY = {
  en: {
    eyebrow: "SHREE RAM HERBS",
    title: "Crafted by Nature and Tradition",
    call: "Call",
    whatsapp: "WhatsApp Consultation",
    feedback: "Customer Feedback",
    goalsTitle: "Shop by Wellness Goals",
    goalsCopy: "Category-led architecture keeps the experience ready for future ecommerce expansion.",
    productsTitle: "Featured Ayurvedic Products",
    productsCopy: "Every product includes benefit highlights, ingredient transparency, and usage instructions to build trust before purchase.",
    expertTitle: "Talk to an Ayurvedic Expert",
    expertCopy: "Ask for product recommendations, dosage guidance, and custom wellness plans for your needs.",
    queryName: "Name",
    queryPhone: "Phone Number",
    queryCategory: "Product Category",
    queryMessage: "Your Query",
    queryNamePlaceholder: "Your full name",
    queryPhonePlaceholder: "Your contact number",
    queryMessagePlaceholder: "Share your concern or requirement.",
    submitQuery: "Submit Query",
    querySuccess: "Thank you. Your message was sent successfully."
  },
  hi: {
    eyebrow: "श्री राम घटक",
    title: "प्रकृति और परंपरा से निर्मित",
    call: "कॉल करें",
    whatsapp: "व्हाट्सऐप पर परामर्श",
    feedback: "ग्राहक प्रतिक्रिया",
    goalsTitle: "कल्याण लक्ष्यों के अनुसार खरीदें",
    goalsCopy: "श्रेणी-आधारित संरचना अनुभव को भविष्य के ई-कॉमर्स विस्तार के लिए तैयार रखती है।",
    productsTitle: "विशेष आयुर्वेदिक उत्पाद",
    productsCopy: "हर उत्पाद में लाभ, सामग्री की पारदर्शिता, और उपयोग निर्देश शामिल हैं ताकि खरीद से पहले भरोसा बने।",
    expertTitle: "आयुर्वेदिक विशेषज्ञ से बात करें",
    expertCopy: "अपनी ज़रूरतों के लिए उत्पाद सुझाव, मात्रा मार्गदर्शन, और कस्टम वेलनेस योजना लें।",
    queryName: "नाम",
    queryPhone: "फ़ोन नंबर",
    queryCategory: "उत्पाद श्रेणी",
    queryMessage: "आपकी पूछताछ",
    queryNamePlaceholder: "आपका पूरा नाम",
    queryPhonePlaceholder: "आपका संपर्क नंबर",
    queryMessagePlaceholder: "अपनी समस्या या आवश्यकता साझा करें।",
    submitQuery: "पूछताछ भेजें",
    querySuccess: "धन्यवाद। आपका संदेश सफलतापूर्वक भेज दिया गया।"
  }
};

export const PRODUCT_COPY = {
  en: {
    detailLabel: "Product Detail",
    notFoundTitle: "Product not found",
    notFoundCopy: "That product slug does not exist in the current catalog.",
    backToProducts: "Back to Products",
    categoryLabel: "Category",
    skuLabel: "SKU",
    packSizeLabel: "Pack size",
    usageTitle: "Usage",
    ingredientsTitle: "Ingredients",
    howMadeTitle: "How It Is Made",
    sideEffectsTitle: "Side Effects",
    purityTitle: "Purity Test"
  },
  hi: {
    detailLabel: "उत्पाद विवरण",
    notFoundTitle: "उत्पाद नहीं मिला",
    notFoundCopy: "यह उत्पाद स्लग वर्तमान कैटलॉग में मौजूद नहीं है।",
    backToProducts: "उत्पादों पर वापस जाएं",
    categoryLabel: "श्रेणी",
    skuLabel: "SKU",
    packSizeLabel: "पैक साइज़",
    usageTitle: "उपयोग",
    ingredientsTitle: "सामग्री",
    howMadeTitle: "कैसे बनाया गया",
    sideEffectsTitle: "संभावित दुष्प्रभाव",
    purityTitle: "शुद्धता परीक्षण"
  }
};

export const FEEDBACK_COPY = {
  en: {
    eyebrow: "Customer Feedback",
    title: "Reviews and Feedback",
    copy: "Read what customers say and leave your own feedback for the catalog.",
    backToHome: "Back to Home",
    formTitle: "Share Your Feedback",
    nameLabel: "Name",
    cityLabel: "City",
    ratingLabel: "Rating",
    feedbackLabel: "Feedback",
    namePlaceholder: "Your name",
    cityPlaceholder: "Your city",
    feedbackPlaceholder: "How was your experience?",
    submit: "Submit Review",
    success: "Thank you for sharing your feedback."
  },
  hi: {
    eyebrow: "ग्राहक प्रतिक्रिया",
    title: "समीक्षाएं और प्रतिक्रिया",
    copy: "देखें कि ग्राहक क्या कहते हैं और कैटलॉग के लिए अपनी प्रतिक्रिया दें।",
    backToHome: "होम पर वापस जाएं",
    formTitle: "अपनी प्रतिक्रिया साझा करें",
    nameLabel: "नाम",
    cityLabel: "शहर",
    ratingLabel: "रेटिंग",
    feedbackLabel: "प्रतिक्रिया",
    namePlaceholder: "आपका नाम",
    cityPlaceholder: "आपका शहर",
    feedbackPlaceholder: "आपका अनुभव कैसा रहा?",
    submit: "समीक्षा भेजें",
    success: "अपनी प्रतिक्रिया साझा करने के लिए धन्यवाद।"
  }
};

export const NOT_FOUND_COPY = {
  en: {
    eyebrow: "Page Not Found",
    title: "We could not find that page",
    copy: "The page may have moved or the address may be incorrect. Return to the home page to browse the Ayurvedic catalog.",
    home: "Home"
  },
  hi: {
    eyebrow: "पेज नहीं मिला",
    title: "हम वह पेज नहीं ढूंढ पाए",
    copy: "पेज स्थानांतरित हो गया होगा या पता गलत हो सकता है। आयुर्वेदिक कैटलॉग देखने के लिए होम पेज पर लौटें।",
    home: "होम"
  }
};

const CATEGORY_LABELS = {
  en: PRODUCT_CATEGORIES,
  hi: [
    "जड़ी-बूटियाँ और चूर्ण",
    "औषधीय तेल",
    "पाचन सहारा",
    "इम्युनिटी केयर",
    "जोड़ों का वेलनेस",
    "महिलाओं का वेलनेस"
  ]
};

const STAT_LABELS = {
  en: STATS,
  hi: [
    { label: "विश्वसनीय परिवार", value: "8,000+" },
    { label: "हर्बल फॉर्मुलेशन", value: "120+" },
    { label: "अनुभव के वर्ष", value: "18+" }
  ]
};

export function getLocalizedCategories(language) {
  return CATEGORY_LABELS[language] || CATEGORY_LABELS.en;
}

export function getLocalizedStats(language) {
  return STAT_LABELS[language] || STAT_LABELS.en;
}

export function getLocalizedProduct(product, language) {
  const localized = product?.translations?.[language] || {};
  return {
    ...product,
    ...localized,
    benefits: localized.benefits || product.benefits,
    sideEffects: localized.sideEffects || product.sideEffects,
    purityTests: localized.purityTests || product.purityTests
  };
}

export function getLocalizedDefaultReview(review, language) {
  if (review?.source !== "default") return review;
  const localized = review.translations?.[language];
  return localized ? { ...review, ...localized } : review;
}

export function getLocalizedReviews(reviews, language) {
  return reviews.map((review) => getLocalizedDefaultReview(review, language));
}
