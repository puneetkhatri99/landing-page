import React from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import FeedbackPage from "./pages/FeedbackPage";
import NotFoundPage from "./pages/NotFoundPage";
import SeoStructuredData from "./seo/StructuredData";
import { PRODUCTS } from "./constants/products";

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:slug" element={<ProductRoute />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
