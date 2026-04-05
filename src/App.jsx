import React, { useState } from "react";
import herbsImg from "./assets/herbs-640.jpg";
import oilsImg from "./assets/oils-640.jpg";

const CONTACT_NUMBER = "+91 6395675151";
const MEDICINES_SOLD = "8000";

const PRODUCTS = [
  {
    title: "Sun-Charged Herbs",
    description:
      "Hand-picked, naturally sun-dried herbs and vibrant spices for your daily wellbeing.",
    image: herbsImg,
    alt: "Sun-charged Herbs and Spices"
  },
  {
    title: "Pure Oils & Extracts",
    description:
      "Premium, freshly pressed plant extracts and essential oils offering maximum potency.",
    image: oilsImg,
    alt: "Pure Oils and Extracts"
  }
];

function ProductCard({ title, description, image, alt }) {
  return (
    <article className="product-item">
      <div className="img-wrapper">
        <img
          src={image}
          alt={alt}
          className="product-img"
          loading="lazy"
          decoding="async"
          width="640"
          height="640"
          sizes="(max-width: 860px) 100vw, 320px"
        />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

function QueryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    query: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;

    setSubmitted(false);
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({
      name: "",
      phone: "",
      query: ""
    });
  };

  return (
    <section className="form-card">
      <h2>Send Your Query</h2>
      <p className="form-copy">
        Tell us your need, and our team will guide you with the right herbs,
        spices, or medicine support.
      </p>
      <form onSubmit={onSubmit} className="query-form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Your full name"
            autoComplete="name"
            required
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="Your contact number"
            autoComplete="tel"
            inputMode="tel"
            required
          />
        </label>

        <label>
          Query
          <textarea
            name="query"
            value={formData.query}
            onChange={onChange}
            placeholder="What would you like to know?"
            rows={4}
            required
          />
        </label>

        <button type="submit">Submit Query</button>
      </form>
      {submitted && (
        <p className="success-message">Thank you. Your query has been received.</p>
      )}
    </section>
  );
}

export default function App() {
  return (
    <div className="page">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <header className="hero">
        <p className="eyebrow">Pure Ayurveda from Nature</p>
        <h1>Sun-Charged Herbs & Spices for Daily Healing</h1>
        <p className="hero-copy">
          We blend traditional Ayurvedic knowledge with naturally sun-charged
          herbs and spices to create trusted wellness products for families.
        </p>
        <div className="hero-stats">
          <article className="stat-card">
            <p className="stat-label">Medicines Sold</p>
            <p className="stat-value">{MEDICINES_SOLD}+</p>
          </article>
          <article className="stat-card">
            <p className="stat-label">Contact Number</p>
            <p className="stat-value">{CONTACT_NUMBER}</p>
          </article>
        </div>
      </header>

      <main className="content">
        <section className="feature-card">
          <h2>Why Sun-Charged?</h2>
          <p>
            Our herbs are carefully dried and energized in natural sunlight,
            preserving aroma, potency, and Ayurvedic balance in every batch.
          </p>
        </section>

        <section className="products-card">
          <h2>Our Premium Offerings</h2>
          <p className="form-copy">
            Explore our curated selection of deeply nourishing, sun-certified
            products.
          </p>
          <div className="product-grid">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
          <div className="call-to-action">
            <p>For full details, pricing, and orders, please call us.</p>
            <a href={`tel:${CONTACT_NUMBER}`} className="button-like">
              Contact Us: {CONTACT_NUMBER}
            </a>
          </div>
        </section>

        <QueryForm />
      </main>
    </div>
  );
}
