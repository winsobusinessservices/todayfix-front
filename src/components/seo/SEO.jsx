import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ 
  title = "TodayFix - Premium Home Services & Local Professionals", 
  description = "Book verified local professionals for plumbing, cleaning, interior design, and more. Fast, reliable, and premium services.",
  keywords = "home services, plumbing, interior design, electricians, packers and movers, verified professionals",
  ogImage = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ogUrl = window.location.href,
}) => {
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph (Facebook/LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content="TodayFix" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
