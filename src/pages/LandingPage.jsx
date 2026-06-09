import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SeoStructuredData from "../seo/StructuredData";
import {
  CONTACT_NUMBER,
  PRODUCT_CATEGORIES,
  STATS,
  WHATSAPP_NUMBER
} from "../data/siteContent";
import { PRODUCTS } from "../constants/products";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Namaste%2C%20I%20want%20to%20know%20about%20your%20Ayurvedic%20products.`;

function ProductCard({ product, to, priority = false }) {
  const { title, name, alt, priceHint, benefits } = product;

  return (
    <Link to={to} className="product-card reveal">
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
    </Link>
  );
}

async function submitQuery(formData) {
  void formData;
  return { ok: true };
}

function QueryForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", category: "Herbs & Powders", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await submitQuery(formData);
    if (!result?.ok) return;
    setSubmitted(true);
    setFormData({ name: "", phone: "", category: "Herbs & Powders", message: "" });
  };

  return (
    <section className="panel reveal">
      <h2>Talk to an Ayurvedic Expert</h2>
      <p className="section-copy">Ask for product recommendations, dosage guidance, and custom wellness plans for your needs.</p>
      <form onSubmit={onSubmit} className="query-form">
        <label>Name<input type="text" name="name" value={formData.name} onChange={(e) => { setSubmitted(false); setFormData((p) => ({ ...p, name: e.target.value })); }} placeholder="Your full name" autoComplete="name" required /></label>
        <label>Phone Number<input type="tel" name="phone" value={formData.phone} onChange={(e) => { setSubmitted(false); setFormData((p) => ({ ...p, phone: e.target.value })); }} placeholder="Your contact number" autoComplete="tel" inputMode="tel" required /></label>
        <label>Product Category<select name="category" value={formData.category} onChange={(e) => { setSubmitted(false); setFormData((p) => ({ ...p, category: e.target.value })); }}>{PRODUCT_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
        <label>Your Query<textarea name="message" value={formData.message} onChange={(e) => { setSubmitted(false); setFormData((p) => ({ ...p, message: e.target.value })); }} rows={4} placeholder="Share your concern or requirement." required /></label>
        <button type="submit">Submit Query</button>
      </form>
      {submitted && <p className="success-message">Thank you. Your message was sent successfully.</p>}
    </section>
  );
}

export default function LandingPage() {
  useEffect(() => {
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
  }, []);

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
          <Link to="/feedback" className="secondary-link">Customer Feedback</Link>
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
                to={`/products/${product.slug}`}
              />
            ))}
          </div>
        </section>

        <QueryForm />
      </main>
    </div>
  );
}
