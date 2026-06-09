import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_REVIEWS } from "../data/siteContent";
import { useLanguage } from "../context/LanguageContext";
import { FEEDBACK_COPY, getLocalizedReviews } from "../data/localization";

const REVIEW_STORAGE_KEY = "ayurveda_customer_reviews_v1";

export default function FeedbackPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const copy = FEEDBACK_COPY[language];
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [formData, setFormData] = useState({ name: "", location: "", quote: "", rating: "5" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(REVIEW_STORAGE_KEY) || "[]");
      if (Array.isArray(stored) && stored.length) {
        setReviews(stored);
        return;
      }
    } catch {
      // fall back to defaults below
    }
    setReviews(DEFAULT_REVIEWS);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      name: formData.name.trim(),
      location: formData.location.trim(),
      quote: formData.quote.trim(),
      rating: Number(formData.rating),
      source: "user"
    };
    const nextReviews = [newReview, ...reviews].slice(0, 9);
    setReviews(nextReviews);
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(nextReviews));
    setSaved(true);
    setFormData({ name: "", location: "", quote: "", rating: "5" });
  };

  return (
    <main className="page product-page">
      <section className="panel detail-shell feedback-shell">
        <button type="button" className="link-button back-link" onClick={() => navigate("/")}>
          {copy.backToHome}
        </button>

        <header className="feedback-header">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="section-copy">{copy.copy}</p>
        </header>

        <div className="review-grid">
          {getLocalizedReviews(reviews, language).map((review, index) => (
            <article key={`${review.name}-${index}`} className="review-card">
              <p className="rating">{"★".repeat(review.rating || 5)}</p>
              <p className="quote">"{review.quote}"</p>
              <p className="reviewer">{review.name}, {review.location}</p>
            </article>
          ))}
        </div>

        <form className="review-form" onSubmit={onSubmit}>
          <h3>{copy.formTitle}</h3>
          <label>
            {copy.nameLabel}
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setSaved(false);
                setFormData((p) => ({ ...p, name: e.target.value }));
              }}
              placeholder={copy.namePlaceholder}
              required
            />
          </label>
          <label>
            {copy.cityLabel}
            <input
              type="text"
              value={formData.location}
              onChange={(e) => {
                setSaved(false);
                setFormData((p) => ({ ...p, location: e.target.value }));
              }}
              placeholder={copy.cityPlaceholder}
              required
            />
          </label>
          <label>
            {copy.ratingLabel}
            <select
              value={formData.rating}
              onChange={(e) => {
                setSaved(false);
                setFormData((p) => ({ ...p, rating: e.target.value }));
              }}
            >
              <option value="5">{language === "hi" ? "5 - उत्कृष्ट" : "5 - Excellent"}</option>
              <option value="4">{language === "hi" ? "4 - बहुत अच्छा" : "4 - Very Good"}</option>
              <option value="3">{language === "hi" ? "3 - अच्छा" : "3 - Good"}</option>
            </select>
          </label>
          <label>
            {copy.feedbackLabel}
            <textarea
              value={formData.quote}
              onChange={(e) => {
                setSaved(false);
                setFormData((p) => ({ ...p, quote: e.target.value }));
              }}
              rows={3}
              placeholder={copy.feedbackPlaceholder}
              required
            />
          </label>
          <button type="submit">{copy.submit}</button>
          {saved && <p className="success-message">{copy.success}</p>}
        </form>
      </section>
    </main>
  );
}
