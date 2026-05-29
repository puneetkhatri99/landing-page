import React, { useEffect, useMemo, useState } from "react";
import herbsImg from "./assets/herbs-640.jpg";
import oilsImg from "./assets/oils-640.jpg";
import {
  ARTICLES,
  CONTACT_NUMBER,
  DEFAULT_REVIEWS,
  PRODUCT_CATEGORIES,
  PRODUCTS,
  QUALITY_ASSURANCES,
  STATS,
  WHATSAPP_NUMBER
} from "./data/siteContent";
import { buildInquiryMessage, buildInquiryRecord, buildOrderDraft } from "./lib/commerce";

const REVIEW_STORAGE_KEY = "ayurveda_customer_reviews_v1";
const INQUIRY_STORAGE_KEY = "ayurveda_customer_inquiries_v1";
const INQUIRY_CART_KEY = "ayurveda_inquiry_cart_v1";
const ORDER_DRAFT_STORAGE_KEY = "ayurveda_order_drafts_v1";
const ARTICLE_STORAGE_KEY = "ayurveda_published_articles_v1";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Namaste%2C%20I%20want%20to%20know%20about%20your%20Ayurvedic%20products.`;
const PRODUCT_IMAGES = { herbs: herbsImg, oils: oilsImg };

function SeoStructuredData() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sun-Charged Ayurvedic Wellness",
    description: "Premium Ayurvedic herbs, oils, and wellness guidance.",
    telephone: CONTACT_NUMBER,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT_NUMBER,
      contactType: "customer support"
    }
  };

  const productJsonLd = PRODUCTS.map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    sku: product.sku,
    name: product.title,
    description: product.benefits.join(", "),
    category: product.category,
    brand: "Sun-Charged Ayurvedic Wellness",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.basePrice
    }
  }));

  const articleJsonLd = ARTICLES.map((article) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    description: article.excerpt,
    keywords: article.tags.join(", ")
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  );
}

function ProductCard({ product, onAddToInquiry }) {
  const { sku, title, imageKey, alt, category, priceHint, benefits, ingredients, usage, certifications, doshaSupport } = product;

  return (
    <article className="product-card reveal">
      <div className="img-wrapper">
        <img src={PRODUCT_IMAGES[imageKey]} alt={alt} className="product-img" loading="lazy" decoding="async" width="640" height="640" sizes="(max-width: 860px) 100vw, 320px" />
      </div>
      <p className="price-hint">{priceHint}</p>
      <h3>{title}</h3>
      <p className="product-meta"><strong>Category:</strong> {category}</p>
      <ul className="benefit-list">{benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
      <p><strong>Ingredients:</strong> {ingredients}</p>
      <p><strong>How to use:</strong> {usage}</p>
      <p><strong>Dosha support:</strong> {doshaSupport}</p>
      <p className="product-meta"><strong>Certifications:</strong> {certifications.join(" • ")}</p>
      <p className="product-meta"><strong>SKU:</strong> {sku}</p>
      <button type="button" className="secondary-button" onClick={() => onAddToInquiry(sku)}>Add to Inquiry</button>
    </article>
  );
}

function TrustPanel({ averageRating, reviewCount }) {
  return (
    <section className="panel reveal trust-panel">
      <h2>Quality & Trust Snapshot</h2>
      <p className="section-copy">Built to establish credibility through product clarity, customer proof, and responsible Ayurvedic guidance.</p>
      <div className="trust-metrics">
        <article className="metric-card"><p className="stat-label">Average Rating</p><p className="stat-value">{averageRating.toFixed(1)} / 5</p></article>
        <article className="metric-card"><p className="stat-label">Verified Reviews</p><p className="stat-value">{reviewCount}</p></article>
      </div>
      <ul className="assurance-list">{QUALITY_ASSURANCES.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

function CatalogControls({ searchTerm, category, sortBy, onSearchChange, onCategoryChange, onSortChange }) {
  return (
    <div className="catalog-controls">
      <label>
        Search
        <input type="search" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search by product or ingredient" />
      </label>
      <label>
        Category
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="All">All Categories</option>
          {PRODUCT_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <label>
        Sort
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
          <option value="name_az">Name: A to Z</option>
        </select>
      </label>
    </div>
  );
}

function InquiryCart({ items, onIncrease, onDecrease, onRemove, onClear }) {
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <section className="panel reveal">
      <h2>Inquiry Cart</h2>
      <p className="section-copy">Build your product interest list now; checkout can be added later without changing catalog structure.</p>
      {items.length === 0 && <p className="inquiry-summary">No products selected yet.</p>}
      {items.length > 0 && (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.sku} className="cart-item">
                <p><strong>{item.title}</strong><span className="cart-sku">{item.sku}</span></p>
                <div className="cart-actions">
                  <button type="button" className="qty-btn" onClick={() => onDecrease(item.sku)}>-</button>
                  <span>{item.qty}</span>
                  <button type="button" className="qty-btn" onClick={() => onIncrease(item.sku)}>+</button>
                  <button type="button" className="link-button" onClick={() => onRemove(item.sku)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <p className="inquiry-summary"><strong>Total Selected:</strong> {totalItems}</p>
          <button type="button" className="secondary-button" onClick={onClear}>Clear Cart</button>
        </>
      )}
    </section>
  );
}

function InquiryHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(INQUIRY_STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) {
        setHistory(saved.slice(0, 5));
      }
    } catch {
      setHistory([]);
    }
  }, []);

  return (
    <section className="panel reveal">
      <h2>Recent Inquiry Activity</h2>
      <p className="section-copy">Saved locally to validate lead capture flow before backend CRM integration.</p>
      {history.length === 0 && <p className="inquiry-summary">No inquiry records yet.</p>}
      {history.length > 0 && (
        <ul className="history-list">
          {history.map((item) => (
            <li key={item.id} className="history-item">
              <p><strong>{item.name}</strong> · {item.category}</p>
              <p>{item.products?.length ? `${item.products.length} product(s)` : "General consultation"}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function OrderDraft({ inquiryItems }) {
  const [customer, setCustomer] = useState({ name: "", phone: "", city: "" });
  const [saved, setSaved] = useState(false);
  const [recentDrafts, setRecentDrafts] = useState([]);

  useEffect(() => {
    try {
      const drafts = JSON.parse(localStorage.getItem(ORDER_DRAFT_STORAGE_KEY) || "[]");
      if (Array.isArray(drafts)) {
        setRecentDrafts(drafts.slice(0, 3));
      }
    } catch {
      setRecentDrafts([]);
    }
  }, []);

  const lineItems = inquiryItems
    .map((item) => {
      const product = PRODUCTS.find((entry) => entry.sku === item.sku);
      if (!product) return null;
      return {
        ...item,
        unitPrice: product.basePrice,
        lineTotal: product.basePrice * item.qty
      };
    })
    .filter(Boolean);

  const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const onSaveDraft = () => {
    if (!lineItems.length || !customer.name || !customer.phone) {
      return;
    }
    const draft = buildOrderDraft(customer, lineItems, subtotal);
    const existing = JSON.parse(localStorage.getItem(ORDER_DRAFT_STORAGE_KEY) || "[]");
    const nextDrafts = [draft, ...existing].slice(0, 10);
    localStorage.setItem(ORDER_DRAFT_STORAGE_KEY, JSON.stringify(nextDrafts));
    setRecentDrafts(nextDrafts.slice(0, 3));
    setSaved(true);
  };

  return (
    <section className="panel reveal">
      <h2>Order Draft (Ecommerce Ready)</h2>
      <p className="section-copy">
        Convert inquiry selections into structured order drafts for future online checkout integration.
      </p>
      {lineItems.length === 0 && <p className="inquiry-summary">Add products to inquiry cart to generate an order draft.</p>}
      {lineItems.length > 0 && (
        <>
          <ul className="history-list">
            {lineItems.map((item) => (
              <li key={item.sku} className="history-item">
                <p>
                  <strong>{item.title}</strong> x{item.qty}
                </p>
                <p>₹{item.unitPrice} each · Line Total ₹{item.lineTotal}</p>
              </li>
            ))}
          </ul>
          <p className="inquiry-summary">
            <strong>Estimated Subtotal:</strong> ₹{subtotal}
          </p>
          <div className="catalog-controls">
            <label>
              Customer Name
              <input
                type="text"
                value={customer.name}
                onChange={(event) => {
                  setSaved(false);
                  setCustomer((previous) => ({ ...previous, name: event.target.value }));
                }}
                placeholder="Full name"
              />
            </label>
            <label>
              Phone
              <input
                type="tel"
                value={customer.phone}
                onChange={(event) => {
                  setSaved(false);
                  setCustomer((previous) => ({ ...previous, phone: event.target.value }));
                }}
                placeholder="Contact number"
              />
            </label>
            <label>
              City
              <input
                type="text"
                value={customer.city}
                onChange={(event) => {
                  setSaved(false);
                  setCustomer((previous) => ({ ...previous, city: event.target.value }));
                }}
                placeholder="City"
              />
            </label>
          </div>
          <button type="button" onClick={onSaveDraft}>
            Save Order Draft
          </button>
          {saved && <p className="success-message">Order draft saved successfully.</p>}
        </>
      )}
      {recentDrafts.length > 0 && (
        <>
          <p className="inquiry-summary"><strong>Recent Drafts</strong></p>
          <ul className="history-list">
            {recentDrafts.map((draft) => (
              <li key={draft.id} className="history-item">
                <p>
                  <strong>{draft.customer.name}</strong> · ₹{draft.subtotal}
                </p>
                <p>{draft.items.length} item(s) · {draft.status}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

function QueryForm({ inquiryItems }) {
  const [formData, setFormData] = useState({ name: "", phone: "", category: "Herbs & Powders", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const inquirySummary = useMemo(() => (inquiryItems.length ? inquiryItems.map((item) => `${item.title} x${item.qty}`).join(", ") : "General consultation"), [inquiryItems]);

  const onSubmit = (event) => {
    event.preventDefault();
    const inquiryRecord = buildInquiryRecord(formData, inquiryItems);
    const history = JSON.parse(localStorage.getItem(INQUIRY_STORAGE_KEY) || "[]");
    localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify([inquiryRecord, ...history].slice(0, 20)));
    const composedMessage = buildInquiryMessage(formData, inquirySummary);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(composedMessage)}`, "_blank", "noreferrer");
    setSubmitted(true);
    setFormData({ name: "", phone: "", category: "Herbs & Powders", message: "" });
  };

  return (
    <section className="panel reveal">
      <h2>Talk to an Ayurvedic Expert</h2>
      <p className="section-copy">Ask for product recommendations, dosage guidance, and custom wellness plans for your needs.</p>
      <p className="inquiry-summary"><strong>Inquiry Basket:</strong> {inquirySummary}</p>
      <form onSubmit={onSubmit} className="query-form">
        <label>Name<input type="text" name="name" value={formData.name} onChange={(e) => { setSubmitted(false); setFormData((p) => ({ ...p, name: e.target.value })); }} placeholder="Your full name" autoComplete="name" required /></label>
        <label>Phone Number<input type="tel" name="phone" value={formData.phone} onChange={(e) => { setSubmitted(false); setFormData((p) => ({ ...p, phone: e.target.value })); }} placeholder="Your contact number" autoComplete="tel" inputMode="tel" required /></label>
        <label>Product Category<select name="category" value={formData.category} onChange={(e) => { setSubmitted(false); setFormData((p) => ({ ...p, category: e.target.value })); }}>{PRODUCT_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
        <label>Your Query<textarea name="message" value={formData.message} onChange={(e) => { setSubmitted(false); setFormData((p) => ({ ...p, message: e.target.value })); }} rows={4} placeholder="Share your concern or requirement." required /></label>
        <button type="submit">Submit Inquiry</button>
      </form>
      {submitted && <p className="success-message">Thank you. Your inquiry is saved and shared on WhatsApp.</p>}
    </section>
  );
}

function ArticlesSection() {
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [expandedId, setExpandedId] = useState(ARTICLES[0]?.id || "");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    tags: "",
    points: ""
  });
  const [published, setPublished] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ARTICLE_STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) {
        setPublishedArticles(saved);
      }
    } catch {
      setPublishedArticles([]);
    }
  }, []);

  const articles = [...publishedArticles, ...ARTICLES];

  const onPublish = (event) => {
    event.preventDefault();
    const article = {
      id: `custom-${Date.now()}`,
      title: formData.title.trim(),
      date: "May 2026",
      readTime: "4 min read",
      excerpt: formData.excerpt.trim(),
      tags: formData.tags.split(",").map((item) => item.trim()).filter(Boolean),
      points: formData.points.split("\n").map((item) => item.trim()).filter(Boolean)
    };
    const nextArticles = [article, ...publishedArticles].slice(0, 10);
    setPublishedArticles(nextArticles);
    localStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(nextArticles));
    setExpandedId(article.id);
    setPublished(true);
    setFormData({ title: "", excerpt: "", tags: "", points: "" });
  };

  return (
    <section className="panel reveal">
      <h2>Ayurvedic Articles & Blogs</h2>
      <p className="section-copy">Educational content designed to help users make informed wellness choices.</p>
      <form className="review-form" onSubmit={onPublish}>
        <h3>Publish New Blog</h3>
        <label>
          Title
          <input
            type="text"
            value={formData.title}
            onChange={(event) => {
              setPublished(false);
              setFormData((previous) => ({ ...previous, title: event.target.value }));
            }}
            placeholder="Article title"
            required
          />
        </label>
        <label>
          Excerpt
          <textarea
            value={formData.excerpt}
            onChange={(event) => {
              setPublished(false);
              setFormData((previous) => ({ ...previous, excerpt: event.target.value }));
            }}
            rows={2}
            placeholder="Short summary"
            required
          />
        </label>
        <label>
          Tags
          <input
            type="text"
            value={formData.tags}
            onChange={(event) => {
              setPublished(false);
              setFormData((previous) => ({ ...previous, tags: event.target.value }));
            }}
            placeholder="Ayurveda, Wellness, Digestion"
          />
        </label>
        <label>
          Key Points
          <textarea
            value={formData.points}
            onChange={(event) => {
              setPublished(false);
              setFormData((previous) => ({ ...previous, points: event.target.value }));
            }}
            rows={3}
            placeholder="One key point per line"
            required
          />
        </label>
        <button type="submit">Publish Blog</button>
        {published && <p className="success-message">Blog published successfully.</p>}
      </form>
      <div className="article-grid">
        {articles.map((article) => {
          const expanded = expandedId === article.id;
          return (
            <article className="article-card" key={article.id}>
              <p className="article-date">{article.date} · {article.readTime}</p>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <p className="article-tags">{article.tags.join(" • ")}</p>
              {expanded && <ul className="article-points">{article.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              <button type="button" className="link-button" onClick={() => setExpandedId(expanded ? "" : article.id)}>{expanded ? "Hide Details" : "Read Full Insights"}</button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ReviewsSection({ onReviewsChange }) {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [formData, setFormData] = useState({ name: "", location: "", quote: "", rating: "5" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(REVIEW_STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length) setReviews(parsed);
    } catch {
      setReviews(DEFAULT_REVIEWS);
    }
  }, []);

  useEffect(() => {
    onReviewsChange(reviews);
  }, [reviews, onReviewsChange]);

  const onSubmit = (event) => {
    event.preventDefault();
    const newReview = { name: formData.name.trim(), location: formData.location.trim(), quote: formData.quote.trim(), rating: Number(formData.rating) };
    const nextReviews = [newReview, ...reviews].slice(0, 9);
    setReviews(nextReviews);
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(nextReviews));
    setSaved(true);
    setFormData({ name: "", location: "", quote: "", rating: "5" });
  };

  return (
    <section className="panel reveal">
      <h2>Customer Reviews</h2>
      <p className="section-copy">Real customer experiences and outcomes that reflect product quality and support.</p>
      <div className="review-grid">
        {reviews.map((review, index) => (
          <article key={`${review.name}-${index}`} className="review-card">
            <p className="rating">{"★".repeat(review.rating || 5)}</p>
            <p className="quote">"{review.quote}"</p>
            <p className="reviewer">{review.name}, {review.location}</p>
          </article>
        ))}
      </div>
      <form className="review-form" onSubmit={onSubmit}>
        <h3>Share Your Feedback</h3>
        <label>Name<input type="text" value={formData.name} onChange={(e) => { setSaved(false); setFormData((p) => ({ ...p, name: e.target.value })); }} placeholder="Your name" required /></label>
        <label>City<input type="text" value={formData.location} onChange={(e) => { setSaved(false); setFormData((p) => ({ ...p, location: e.target.value })); }} placeholder="Your city" required /></label>
        <label>Rating<select value={formData.rating} onChange={(e) => { setSaved(false); setFormData((p) => ({ ...p, rating: e.target.value })); }}><option value="5">5 - Excellent</option><option value="4">4 - Very Good</option><option value="3">3 - Good</option></select></label>
        <label>Feedback<textarea value={formData.quote} onChange={(e) => { setSaved(false); setFormData((p) => ({ ...p, quote: e.target.value })); }} rows={3} placeholder="How was your experience?" required /></label>
        <button type="submit">Submit Review</button>
        {saved && <p className="success-message">Thank you for sharing your feedback.</p>}
      </form>
    </section>
  );
}

export default function App() {
  const [inquiryItems, setInquiryItems] = useState([]);
  const [reviewsSnapshot, setReviewsSnapshot] = useState(DEFAULT_REVIEWS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const stored = localStorage.getItem(INQUIRY_CART_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) setInquiryItems(parsed);
    } catch {
      setInquiryItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(INQUIRY_CART_KEY, JSON.stringify(inquiryItems));
  }, [inquiryItems]);

  const averageRating = useMemo(() => {
    if (!reviewsSnapshot.length) return 5;
    return reviewsSnapshot.reduce((sum, review) => sum + Number(review.rating || 5), 0) / reviewsSnapshot.length;
  }, [reviewsSnapshot]);

  const displayedProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (selectedCategory !== "All") {
      list = list.filter((item) => item.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      list = list.filter((item) =>
        item.title.toLowerCase().includes(query) || item.ingredients.toLowerCase().includes(query)
      );
    }

    if (sortBy === "price_low_high") {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "price_high_low") {
      list.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === "name_az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [searchTerm, selectedCategory, sortBy]);

  const addToInquiry = (sku) => {
    const product = PRODUCTS.find((item) => item.sku === sku);
    if (!product) return;
    setInquiryItems((previous) => {
      const existing = previous.find((item) => item.sku === sku);
      if (existing) return previous.map((item) => (item.sku === sku ? { ...item, qty: item.qty + 1 } : item));
      return [...previous, { sku: product.sku, title: product.title, qty: 1 }];
    });
  };

  return (
    <div className="page">
      <SeoStructuredData />
      <header className="hero">
        <p className="eyebrow">Authentic Ayurvedic Wellness</p>
        <h1>Premium Herbal Care Crafted by Nature and Tradition</h1>
        <p className="hero-copy">Explore clinically informed Ayurvedic products with transparent ingredients, clear usage guidance, and expert support for every order.</p>
        <div className="hero-actions">
          <a href={`tel:${CONTACT_NUMBER}`} className="button-like">Call {CONTACT_NUMBER}</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="secondary-link">WhatsApp Consultation</a>
        </div>
        <div className="hero-stats">{STATS.map((stat) => <article key={stat.label} className="stat-card"><p className="stat-label">{stat.label}</p><p className="stat-value">{stat.value}</p></article>)}</div>
      </header>

      <main className="content">
        <TrustPanel averageRating={averageRating} reviewCount={reviewsSnapshot.length} />

        <section className="panel reveal">
          <h2>Shop by Wellness Goals</h2>
          <p className="section-copy">Category-led architecture keeps the experience ready for future ecommerce expansion.</p>
          <div className="chip-grid">{PRODUCT_CATEGORIES.map((category) => <span key={category} className="category-chip">{category}</span>)}</div>
        </section>

        <section className="panel reveal">
          <h2>Featured Ayurvedic Products</h2>
          <p className="section-copy">Every product includes benefit highlights, ingredient transparency, and usage instructions to build trust before purchase.</p>
          <CatalogControls
            searchTerm={searchTerm}
            category={selectedCategory}
            sortBy={sortBy}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortBy}
          />
          <div className="product-grid">{displayedProducts.map((product) => <ProductCard key={product.sku} product={product} onAddToInquiry={addToInquiry} />)}</div>
        </section>

        <InquiryCart
          items={inquiryItems}
          onIncrease={(sku) => setInquiryItems((prev) => prev.map((item) => (item.sku === sku ? { ...item, qty: item.qty + 1 } : item)))}
          onDecrease={(sku) => setInquiryItems((prev) => prev.map((item) => (item.sku === sku ? { ...item, qty: item.qty - 1 } : item)).filter((item) => item.qty > 0))}
          onRemove={(sku) => setInquiryItems((prev) => prev.filter((item) => item.sku !== sku))}
          onClear={() => setInquiryItems([])}
        />

        <OrderDraft inquiryItems={inquiryItems} />
        <InquiryHistory />
        <ArticlesSection />
        <ReviewsSection onReviewsChange={setReviewsSnapshot} />
        <QueryForm inquiryItems={inquiryItems} />
      </main>
    </div>
  );
}
