import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SeoStructuredData from "../seo/StructuredData";
import {
  CONTACT_NUMBER,
  PRODUCT_CATEGORIES,
  WHATSAPP_NUMBER
} from "../data/siteContent";
import { PRODUCTS } from "../constants/products";
import { useLanguage } from "../context/LanguageContext";
import {
  LANDING_COPY,
  getLocalizedCategories,
  getLocalizedProduct,
  getLocalizedStats
} from "../data/localization";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Namaste%2C%20I%20want%20to%20know%20about%20your%20Ayurvedic%20products.`;

function ProductCard({ product, to, priority = false, language }) {
  const localizedProduct = getLocalizedProduct(product, language);
  const { title, name, alt, priceHint, benefits } = localizedProduct;

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

function QueryForm({ language }) {
  const copy = LANDING_COPY[language];
  const localizedCategories = getLocalizedCategories(language);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: PRODUCT_CATEGORIES[0],
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await submitQuery(formData);
    if (!result?.ok) return;
    setSubmitted(true);
    setFormData({ name: "", phone: "", category: PRODUCT_CATEGORIES[0], message: "" });
  };

  return (
    <section className="panel reveal">
      <h2>{copy.expertTitle}</h2>
      <p className="section-copy">{copy.expertCopy}</p>
      <form onSubmit={onSubmit} className="query-form">
        <label>
          {copy.queryName}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => {
              setSubmitted(false);
              setFormData((p) => ({ ...p, name: e.target.value }));
            }}
            placeholder={copy.queryNamePlaceholder}
            autoComplete="name"
            required
          />
        </label>
        <label>
          {copy.queryPhone}
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              setSubmitted(false);
              setFormData((p) => ({ ...p, phone: e.target.value }));
            }}
            placeholder={copy.queryPhonePlaceholder}
            autoComplete="tel"
            inputMode="tel"
            required
          />
        </label>
        <label>
          {copy.queryCategory}
          <select
            name="category"
            value={formData.category}
            onChange={(e) => {
              setSubmitted(false);
              setFormData((p) => ({ ...p, category: e.target.value }));
            }}
          >
            {PRODUCT_CATEGORIES.map((category, index) => (
              <option key={category} value={category}>
                {localizedCategories[index]}
              </option>
            ))}
          </select>
        </label>
        <label>
          {copy.queryMessage}
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => {
              setSubmitted(false);
              setFormData((p) => ({ ...p, message: e.target.value }));
            }}
            rows={4}
            placeholder={copy.queryMessagePlaceholder}
            required
          />
        </label>
        <button type="submit">{copy.submitQuery}</button>
      </form>
      {submitted && <p className="success-message">{copy.querySuccess}</p>}
    </section>
  );
}

export default function LandingPage() {
  const { language } = useLanguage();
  const copy = LANDING_COPY[language];
  const localizedStats = getLocalizedStats(language);
  const localizedCategories = getLocalizedCategories(language);

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
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <div className="hero-actions">
          <a href={`tel:${CONTACT_NUMBER}`} className="button-like">{copy.call} {CONTACT_NUMBER}</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="secondary-link">{copy.whatsapp}</a>
          <Link to="/feedback" className="secondary-link">{copy.feedback}</Link>
        </div>
        <div className="hero-stats">{localizedStats.map((stat) => <article key={stat.label} className="stat-card"><p className="stat-label">{stat.label}</p><p className="stat-value">{stat.value}</p></article>)}</div>
      </header>

      <main className="content">

        <section className="panel reveal">
          <h2>{copy.goalsTitle}</h2>
          <p className="section-copy">{copy.goalsCopy}</p>
          <div className="chip-grid">{PRODUCT_CATEGORIES.map((category, index) => <span key={category} className="category-chip">{localizedCategories[index]}</span>)}</div>
        </section>

        <section className="panel reveal">
          <h2>{copy.productsTitle}</h2>
          <p className="section-copy">{copy.productsCopy}</p>
          <div className="product-grid">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.sku}
                product={product}
                priority={product.sku === PRODUCTS[0]?.sku}
                to={`/products/${product.slug}`}
                language={language}
              />
            ))}
          </div>
        </section>

        <QueryForm language={language} />
      </main>
    </div>
  );
}
