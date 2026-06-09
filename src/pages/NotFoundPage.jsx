import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="page not-found-page">
      <section className="panel not-found-shell">
        <p className="eyebrow">Page Not Found</p>
        <h1>We could not find that page</h1>
        <p className="section-copy">
          The page may have moved or the address may be incorrect. Return to the home page to browse the Ayurvedic catalog.
        </p>
        <Link to="/" className="button-like not-found-home-button">
          Home
        </Link>
      </section>
    </main>
  );
}
