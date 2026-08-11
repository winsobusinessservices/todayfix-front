import React from "react";
import AdvancedSearch from "../components/ui/AdvancedSearch";
import ServicesCards from "../features/home/ServiceCards";
import { servicesPageData } from "../data/ServicePageData";
import SEO from "../components/seo/SEO";

const Services = () => {
  return (
    <div className="w-full max-w-6xl mx-auto relative flex flex-col gap-4">
      <SEO 
        title="All Services | TodayFix"
        description="Browse all available services on TodayFix. Find the right professional for your plumbing, electrical, cleaning, and maintenance needs."
      />
      <AdvancedSearch />
      <div className="w-full bg-transparent py-14 font-sans flex justify-center relative">
        <div className="max-w-[1400px] w-full">
          {/* Section Header */}
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
              Popular Services
            </h2>
            <p className="text-text-muted mt-2 text-base">
              Find and compare the best professionals for your needs.
            </p>
          </div>
          {/* Cards Grid: Increased columns and reduced gap for smaller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {servicesPageData.map((service) => (
              <span key={service.id}>
                <ServicesCards service={service} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
