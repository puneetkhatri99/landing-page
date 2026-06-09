import React, { useEffect, useMemo, useState } from "react";
import FeedbackPage from "./FeedbackPage";
import ProductPage from "./ProductPage";
import SeoStructuredData from "../seo/StructuredData";
import {
  CONTACT_NUMBER,
  DEFAULT_REVIEWS,
  PRODUCT_CATEGORIES,
  STATS,
  WHATSAPP_NUMBER
} from "../data/siteContent";
import { PRODUCTS } from "../constants/products";
import { buildInquiryMessage, buildInquiryRecord } from "../lib/commerce";

const INQUIRY_STORAGE_KEY = "ayurveda_customer_inquiries_v1";
const INQUIRY_CART_KEY = "ayurveda_inquiry_cart_v1";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Namaste%2C%20I%20want%20to%20know%20about%20your%20Ayurvedic%20products.`;
const REVIEW_STORAGE_KEY = "ayurveda_customer_reviews_v1";

function getRouteFromHash() {
  const rawHash = window.location.hash || "#/";
  const route = rawHash.replace(/^#/, "");
  return route || "/";
}

function getProductSlugFromRoute(route) {
  const match = route.match(/^\/products\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function ProductCard({ product, onOpen, priority = false }) {
  const { title, name, alt, priceHint, benefits } = product;

  return (
    <article
      className="product-card reveal"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="img-wrapper">
        <img
          src={product.images?.[0]?.src}
          alt={alt}
          className="product-img"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          width="640"
          height="640"
          sizes="(max-width: 860px) 100vw, 320px"
        />
      </div>
      <p className="price-hint">{priceHint}</p>
      <h3>{title || name}</h3>
      <ul className="benefit-list">{benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
    </article>
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

export default function LandingPage() {
  const [inquiryItems, setInquiryItems] = useState([]);
  const [, setReviewsSnapshot] = useState(DEFAULT_REVIEWS);
  const [route, setRoute] = useState(() => getRouteFromHash());

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
    const storedReviews = localStorage.getItem(REVIEW_STORAGE_KEY);
    if (!storedReviews) {
      setReviewsSnapshot(DEFAULT_REVIEWS);
      return;
    }
    try {
      const parsed = JSON.parse(storedReviews);
      if (Array.isArray(parsed) && parsed.length) {
        setReviewsSnapshot(parsed);
      } else {
        setReviewsSnapshot(DEFAULT_REVIEWS);
      }
    } catch {
      setReviewsSnapshot(DEFAULT_REVIEWS);
    }
  }, [route]);

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem(INQUIRY_CART_KEY, JSON.stringify(inquiryItems));
  }, [inquiryItems]);

  useEffect(() => {
    if (route !== "/") return undefined;

    const firstProductImage = PRODUCTS[0]?.images?.[0]?.src;
    if (!firstProductImage) return undefined;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = firstProductImage;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [route]);

  const addToInquiry = (sku) => {
    const product = PRODUCTS.find((item) => item.sku === sku);
    if (!product) return;
    setInquiryItems((previous) => {
      const existing = previous.find((item) => item.sku === sku);
      const productTitle = product.title || product.name;
      if (existing) return previous.map((item) => (item.sku === sku ? { ...item, qty: item.qty + 1 } : item));
      return [...previous, { sku: product.sku, title: productTitle, qty: 1 }];
    });
  };

  const openProduct = (slug) => {
    window.location.hash = `#/products/${slug}`;
  };

  const activeProductSlug = getProductSlugFromRoute(route);
  const activeProduct = activeProductSlug ? PRODUCTS.find((item) => item.slug === activeProductSlug) : null;

  if (route.startsWith("/feedback")) {
    return (
      <FeedbackPage
        onBackHome={() => {
          window.location.hash = "#/";
        }}
        onReviewsChange={setReviewsSnapshot}
      />
    );
  }

  if (route.startsWith("/products/")) {
    return (
      <>
        <SeoStructuredData />
        <ProductPage
          product={activeProduct}
          onBack={() => {
            window.location.hash = "#/";
          }}
          onAddToInquiry={addToInquiry}
        />
      </>
    );
  }

  return (
    <div className="page">
      <SeoStructuredData />
      <header className="hero">
        <p className="eyebrow">Authentic Ayurvedic Wellness</p>
        <h1>Crafted by Nature and Tradition</h1>
        <p className="hero-copy">Explore clinically informed Ayurvedic products with transparent ingredients, clear usage guidance, and expert support for every order.</p>
        <div className="hero-actions">
          <a href={`tel:${CONTACT_NUMBER}`} className="button-like">Call {CONTACT_NUMBER}</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="secondary-link">WhatsApp Consultation</a>
          <a href="#/feedback" className="secondary-link">Customer Feedback</a>
        </div>
        <div className="hero-stats">{STATS.map((stat) => <article key={stat.label} className="stat-card"><p className="stat-label">{stat.label}</p><p className="stat-value">{stat.value}</p></article>)}</div>
      </header>

      <main className="content">

        <section className="panel reveal">
          <h2>Shop by Wellness Goals</h2>
          <p className="section-copy">Category-led architecture keeps the experience ready for future ecommerce expansion.</p>
          <div className="chip-grid">{PRODUCT_CATEGORIES.map((category) => <span key={category} className="category-chip">{category}</span>)}</div>
        </section>

        <section className="panel reveal">
          <h2>Featured Ayurvedic Products</h2>
          <p className="section-copy">Every product includes benefit highlights, ingredient transparency, and usage instructions to build trust before purchase.</p>
          <div className="product-grid">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.sku}
                product={product}
                priority={product.sku === PRODUCTS[0]?.sku}
                onOpen={() => openProduct(product.slug)}
              />
            ))}
          </div>
        </section>

        <QueryForm inquiryItems={inquiryItems} />
      </main>
    </div>
  );
}
