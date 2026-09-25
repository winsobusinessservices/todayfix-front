import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  type = 'website',
  url = 'https://todayfix.in',
  image = 'https://todayfix.in/og-image.jpg'
}) => {
  // Ensure "Bangalore" is included in default titles and descriptions if not provided
  const siteName = 'TodayFix';
  const defaultSuffix = '| TodayFix Bangalore';
  
  const finalTitle = title 
    ? (title.toLowerCase().includes('bangalore') ? `${title} | ${siteName}` : `${title} ${defaultSuffix}`)
    : `Expert Home Services & Cab Bookings in Bangalore | ${siteName}`;

  const finalDescription = description || `Book top-rated home services, repairs, and cab bookings in Bangalore. Fast, reliable, and affordable services delivered to your doorstep in Bangalore.`;

  const defaultKeywords = 'home services Bangalore, cab booking Bangalore, AC repair Bangalore, electricians Bangalore, plumbers Bangalore, home cleaning Bangalore, TodayFix';
  const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />
      
      {/* Additional SEO Tags */}
      <meta name="geo.region" content="IN-KA" />
      <meta name="geo.placename" content="Bangalore" />
      <meta name="geo.position" content="12.9716;77.5946" />
      <meta name="ICBM" content="12.9716, 77.5946" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    </Helmet>
  );
};

export default SEO;
