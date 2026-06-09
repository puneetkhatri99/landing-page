import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { NOT_FOUND_COPY } from "../data/localization";

export default function NotFoundPage() {
  const { language } = useLanguage();
  const copy = NOT_FOUND_COPY[language];

  return (
    <main className="page not-found-page">
      <section className="panel not-found-shell">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="section-copy">{copy.copy}</p>
        <Link to="/" className="button-like not-found-home-button">
          {copy.home}
        </Link>
      </section>
    </main>
  );
}
