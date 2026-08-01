import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import CallToAction from "../components/CallToAction";
import FeatureMarquee from "../components/FeatureMarquee";
import FeaturedSection from "../components/FeaturedSection";
import HowItWorks from "../components/HowItWorks";
import TestimonialSection from "../components/TestimonialSection";
import BusinessCTA from "../components/BusinessCTA";
import PricingComponent from "../components/PricingComponent";
import FAQSection from "../components/FAQSection";

const Home = () => {
  return (
    <div className="">
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
    </div>
  );
};

export default Home;
