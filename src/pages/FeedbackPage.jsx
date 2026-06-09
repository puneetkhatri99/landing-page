import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_REVIEWS } from "../data/siteContent";

const REVIEW_STORAGE_KEY = "ayurveda_customer_reviews_v1";

export default function FeedbackPage() {
  const navigate = useNavigate();
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
      rating: Number(formData.rating)
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
          Back to Home
        </button>

        <header className="feedback-header">
          <p className="eyebrow">Customer Feedback</p>
          <h1>Reviews and Feedback</h1>
          <p className="section-copy">Read what customers say and leave your own feedback for the catalog.</p>
        </header>

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
          <label>
            Name
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setSaved(false);
                setFormData((p) => ({ ...p, name: e.target.value }));
              }}
              placeholder="Your name"
              required
            />
          </label>
          <label>
            City
            <input
              type="text"
              value={formData.location}
              onChange={(e) => {
                setSaved(false);
                setFormData((p) => ({ ...p, location: e.target.value }));
              }}
              placeholder="Your city"
              required
            />
          </label>
          <label>
            Rating
            <select
              value={formData.rating}
              onChange={(e) => {
                setSaved(false);
                setFormData((p) => ({ ...p, rating: e.target.value }));
              }}
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
            </select>
          </label>
          <label>
            Feedback
            <textarea
              value={formData.quote}
              onChange={(e) => {
                setSaved(false);
                setFormData((p) => ({ ...p, quote: e.target.value }));
              }}
              rows={3}
              placeholder="How was your experience?"
              required
            />
          </label>
          <button type="submit">Submit Review</button>
          {saved && <p className="success-message">Thank you for sharing your feedback.</p>}
        </form>
      </section>
    </main>
  );
}
