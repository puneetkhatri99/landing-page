import React from "react";
import { ARTICLES, CONTACT_NUMBER } from "../data/siteContent";
import { PRODUCTS } from "../constants/products";

// Organization schema helps search engines identify the business, contact details, and brand entity.
function buildOrganizationJsonLd(contactNumber) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sun-Charged Ayurvedic Wellness",
    description: "Premium Ayurvedic herbs, oils, and wellness guidance.",
    telephone: contactNumber,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactNumber,
      contactType: "customer support"
    }
  };
}

// Product schema gives search engines structured catalog data for richer product discovery and results.
function buildProductJsonLd(products) {
  return products.map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    sku: product.sku,
    name: product.title || product.name,
    description: product.benefits.join(", "),
    category: product.category,
    brand: "Sun-Charged Ayurvedic Wellness",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.basePrice
    }
  }));
}

// Article schema helps search engines index editorial content with headline, publish date, and topic context.
function buildArticleJsonLd(articles) {
  return articles.map((article) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    description: article.excerpt,
    keywords: article.tags.join(", ")
  }));
}

export default function SeoStructuredData() {
  const organizationJsonLd = buildOrganizationJsonLd(CONTACT_NUMBER);
  const productJsonLd = buildProductJsonLd(PRODUCTS);
  const articleJsonLd = buildArticleJsonLd(ARTICLES);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  );
}
