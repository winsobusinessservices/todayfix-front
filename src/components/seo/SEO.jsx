import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ 
  title = "TodayFix - Premium Home Services & Local Professionals in Bangalore", 
  description = "Book verified local professionals for plumbing, cleaning, interior design, and more in Bangalore. Fast, reliable, and premium home services.",
  keywords = "home services, plumbing, interior design, electricians, packers and movers, verified professionals, Bangalore",
  ogImage = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ogUrl = typeof window !== "undefined" ? window.location.href : "https://todayfix.in",
}) => {
  const finalTitle = title.toLowerCase().includes("bangalore") ? title : `${title} | Bangalore`;
  const finalDescription = description.toLowerCase().includes("bangalore") ? description : `${description} Serving all across Bangalore.`;
  const finalKeywords = keywords.toLowerCase().includes("bangalore") ? keywords : `${keywords}, Bangalore, services in Bangalore`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="TodayFix" />
      <meta name="publisher" content="TodayFix" />
      
      {/* Search Engine Directives */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* General Settings */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="application-name" content="TodayFix" />
      
      {/* Geo Meta Tags for Bangalore Local SEO */}
      <meta name="geo.region" content="IN-KA" />
      <meta name="geo.placename" content="Bangalore" />
      <meta name="geo.position" content="12.9716;77.5946" />
      <meta name="ICBM" content="12.9716, 77.5946" />

      {/* Open Graph (Facebook/LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content="TodayFix" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@todayfix" />
      <meta name="twitter:creator" content="@todayfix" />

      {/* Canonical Link */}
      <link rel="canonical" href={ogUrl} />
    </Helmet>
  );
};

export default SEO;
