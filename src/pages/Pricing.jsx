import React from "react";
import PricingComponent from "../features/pricing/PricingComponent";
import SEO from "../components/seo/SEO";

const Pricing = () => {
  return (
    <div>
      <SEO 
        title="Pricing Plans | TodayFix"
        description="Transparent pricing for professionals listing their business on TodayFix."
      />
      <span>
        <PricingComponent />
      </span>
    </div>
  );
};

export default Pricing;
