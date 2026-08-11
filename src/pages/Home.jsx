import React from "react";
import SEO from "../components/seo/SEO";
import Hero from "../features/home/Hero";
import Services from "../features/home/Services";
import CallToAction from "../features/home/CallToAction";
import FeatureMarquee from "../features/home/FeatureMarquee";
import FeaturedSection from "../features/home/FeaturedSection";
import HowItWorks from "../features/home/HowItWorks";
import TestimonialSection from "../features/home/TestimonialSection";
import BusinessCTA from "../features/home/BusinessCTA";
import PricingComponent from "../features/pricing/PricingComponent";
import FAQSection from "../features/home/FAQSection";

const Home = () => {
  return (
    <main>
      <SEO 
        title="TodayFix - Premium Home Services & Local Professionals"
        description="Book verified local professionals for plumbing, cleaning, interior design, and more. Fast, reliable, and premium services."
      />
      <Hero />
      <FeatureMarquee />
      <Services />
      <FeaturedSection />
      <HowItWorks />
      <TestimonialSection />
      <BusinessCTA />
      <PricingComponent />
      <FAQSection />
      <CallToAction />
    </main>
  );
};

export default Home;
