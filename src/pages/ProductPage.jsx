import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { PRODUCT_COPY, getLocalizedProduct } from "../data/localization";

function Section({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function ProductPage({ product, onBack }) {
  const { language } = useLanguage();
  const copy = PRODUCT_COPY[language];
  const localizedProduct = product ? getLocalizedProduct(product, language) : null;

  if (!product) {
    return (
      <main className="page product-page">
        <section className="panel detail-shell">
          <p className="eyebrow">{copy.detailLabel}</p>
          <h1>{copy.notFoundTitle}</h1>
          <p className="section-copy">{copy.notFoundCopy}</p>
          <button type="button" onClick={onBack}>
            {copy.backToProducts}
          </button>
        </section>
      </main>
    );
  }

  const gallery = localizedProduct.images?.length
    ? localizedProduct.images
    : [{ src: localizedProduct.images?.[0]?.src, alt: localizedProduct.alt }];

  return (
    <main className="page product-page">
      <section className="panel detail-shell">
        <button type="button" className="link-button back-link" onClick={onBack}>
          {copy.backToProducts}
        </button>

        <div className="detail-hero">
          <div className="detail-gallery">
            {gallery.map((image, index) => (
              <figure key={`${image.src}-${index}`} className="detail-image-frame">
                <img
                  src={image.src}
                  alt={image.alt || localizedProduct.alt}
                  className="detail-image"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  width="640"
                  height="640"
                />
              </figure>
            ))}
          </div>

          <div className="detail-summary">
            <p className="eyebrow">{copy.detailLabel}</p>
            <h1>{localizedProduct.title || localizedProduct.name}</h1>
            <p className="price-hint">{localizedProduct.priceHint}</p>
            <p className="product-meta">
              <strong>{copy.categoryLabel}:</strong> {localizedProduct.category}
            </p>
            <p className="product-meta">
              <strong>{copy.skuLabel}:</strong> {localizedProduct.sku}
            </p>
            <p className="product-meta">
              <strong>{copy.packSizeLabel}:</strong> {localizedProduct.packSize}
            </p>
            <ul className="benefit-list">
              {(localizedProduct.benefits || []).map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="detail-grid">
          <Section title={copy.usageTitle}>
            <p>{localizedProduct.usage}</p>
          </Section>
          <Section title={copy.ingredientsTitle}>
            <p>{localizedProduct.ingredients}</p>
          </Section>
          <Section title={copy.howMadeTitle}>
            <p>{localizedProduct.howMade}</p>
          </Section>
          <Section title={copy.sideEffectsTitle}>
            <ul className="detail-list">
              {(localizedProduct.sideEffects || []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
          <Section title={copy.purityTitle}>
            <ul className="detail-list">
              {(localizedProduct.purityTests || []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        </div>
      </section>
    </main>
  );
}
