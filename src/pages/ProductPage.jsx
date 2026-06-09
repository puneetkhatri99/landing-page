import React from "react";

function Section({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function ProductPage({ product, onBack, onAddToInquiry }) {
  if (!product) {
    return (
      <main className="page product-page">
        <section className="panel detail-shell">
          <p className="eyebrow">Product Detail</p>
          <h1>Product not found</h1>
          <p className="section-copy">That product slug does not exist in the current catalog.</p>
          <button type="button" onClick={onBack}>
            Back to Products
          </button>
        </section>
      </main>
    );
  }

  const gallery = product.images?.length ? product.images : [{ src: product.images?.[0]?.src, alt: product.alt }];

  return (
    <main className="page product-page">
      <section className="panel detail-shell">
        <button type="button" className="link-button back-link" onClick={onBack}>
          Back to Products
        </button>

        <div className="detail-hero">
          <div className="detail-gallery">
            {gallery.map((image, index) => (
              <figure key={`${image.src}-${index}`} className="detail-image-frame">
                <img
                  src={image.src}
                  alt={image.alt || product.alt}
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
            <p className="eyebrow">Product Detail</p>
            <h1>{product.title || product.name}</h1>
            <p className="price-hint">{product.priceHint}</p>
            <p className="product-meta"><strong>Category:</strong> {product.category}</p>
            <p className="product-meta"><strong>SKU:</strong> {product.sku}</p>
            <p className="product-meta"><strong>Pack size:</strong> {product.packSize}</p>
            <ul className="benefit-list">
              {(product.benefits || []).map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <button type="button" onClick={() => onAddToInquiry(product.sku)}>
              Add to Inquiry
            </button>
          </div>
        </div>

        <div className="detail-grid">
          <Section title="Usage">
            <p>{product.usage}</p>
          </Section>
          <Section title="Ingredients">
            <p>{product.ingredients}</p>
          </Section>
          <Section title="How It Is Made">
            <p>{product.howMade}</p>
          </Section>
          <Section title="Side Effects">
            <ul className="detail-list">
              {(product.sideEffects || []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
          <Section title="Purity Test">
            <ul className="detail-list">
              {(product.purityTests || []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        </div>
      </section>
    </main>
  );
}
