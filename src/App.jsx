import React from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import FeedbackPage from "./pages/FeedbackPage";
import NotFoundPage from "./pages/NotFoundPage";
import SeoStructuredData from "./seo/StructuredData";
import { PRODUCTS } from "./constants/products";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { LANGUAGE_OPTIONS } from "./data/localization";

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="site-toolbar">
      <div className="language-toggle" role="group" aria-label="Language selector">
        {Object.entries(LANGUAGE_OPTIONS).map(([code, option]) => (
          <button
            key={code}
            type="button"
            className={code === language ? "language-toggle-button is-active" : "language-toggle-button"}
            aria-pressed={code === language}
            onClick={() => setLanguage(code)}
          >
            {option.shortLabel}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductRoute() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const product = PRODUCTS.find((item) => item.slug === slug) || null;

  return (
    <>
      <SeoStructuredData />
      <ProductPage
        product={product}
        onBack={() => navigate("/")}
      />
    </>
  );
}

function AppRoutes() {
  return (
    <>
      <LanguageToggle />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:slug" element={<ProductRoute />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  );
}
